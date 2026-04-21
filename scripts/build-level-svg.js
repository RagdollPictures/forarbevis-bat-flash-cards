const fs = require("fs");
const path = require("path");
const { transform } = require("@svgr/core");
const prettier = require("prettier");

const INPUT = path.join(__dirname, "../assets/game/level_001.svg");
const OUTPUT = path.join(__dirname, "../app/game/SharedLevelSvg.tsx");

function extractViewBox(svgCode) {
  const match = svgCode.match(/viewBox="([^"]+)"/i);
  if (match) return match[1];

  const widthMatch = svgCode.match(/width="([^"]+)"/i);
  const heightMatch = svgCode.match(/height="([^"]+)"/i);

  if (widthMatch && heightMatch) {
    const width = String(widthMatch[1]).replace(/[^\d.]/g, "");
    const height = String(heightMatch[1]).replace(/[^\d.]/g, "");
    if (width && height) {
      return `0 0 ${width} ${height}`;
    }
  }

  return "0 0 100 100";
}

function ensureSvgTagHasProps(code, viewBox) {
  return code.replace(/<Svg([^>]*)>/, (full, attrs) => {
    let cleaned = attrs;

    cleaned = cleaned.replace(/\swidth=\{[^}]+\}/g, "");
    cleaned = cleaned.replace(/\sheight=\{[^}]+\}/g, "");
    cleaned = cleaned.replace(/\sxmlns="[^"]*"/g, "");
    cleaned = cleaned.replace(/\sviewBox="[^"]*"/g, "");
    cleaned = cleaned.replace(/\spreserveAspectRatio="[^"]*"/g, "");
    cleaned = cleaned.replace(/\s\{\.\.\.props\}/g, "");

    return `<Svg${cleaned} viewBox="${viewBox}" {...props}>`;
  });
}

function addVisibleLayerHelper(code) {
  const helper = `
type SharedLevelSvgProps = SvgProps & {
  visibleLayerIds?: string[];
  layerColors?: Partial<Record<string, string>>;
};

function isVisible(id: string, visibleLayerIds?: string[]) {
  if (!visibleLayerIds || visibleLayerIds.length === 0) return true;

  if (id.startsWith("deco_") || /^level_\\d{3}$/.test(id)) {
    return visibleLayerIds.includes(id);
  }

  return true;
}

`;

  return code.replace(
    /import type \{ SvgProps \} from "react-native-svg";\n/,
    `import type { SvgProps } from "react-native-svg";\n${helper}`
  );
}

function addTypedProps(code) {
  return code.replace(
    /const\s+(\w+)\s*=\s*\(props:\s*SvgProps\)\s*=>/,
    "const $1 = (props: SharedLevelSvgProps) =>"
  );
}

function addVisibilityToTargetElements(code) {
  return code.replace(
    /<([A-Z][A-Za-z0-9]*)([\s\S]*?)\/?>/g,
    (full, tagName, attrs) => {
      const idMatch = attrs.match(/\bid="([^"]+)"/);
      if (!idMatch) return full;

      const id = idMatch[1];
      if (!(id.startsWith("deco_") || /^level_\d{3}$/.test(id))) {
        return full;
      }

      if (/\bdisplay=\{/.test(full) || /\bopacity=\{/.test(full)) {
        return full;
      }

      const selfClosing = full.endsWith("/>");
      if (selfClosing) {
        return `<${tagName}${attrs} display={isVisible("${id}", props.visibleLayerIds) ? "flex" : "none"} />`;
      }

      return `<${tagName}${attrs} display={isVisible("${id}", props.visibleLayerIds) ? "flex" : "none"}>`;
    }
  );
}

function addLayerColorSupport(code) {
  return code.replace(
    /<([A-Z][A-Za-z0-9]*)([^>]*\bid="([^"]+)"[^>]*)>([\s\S]*?)<\/\1>/g,
    (full, tagName, attrs, id, inner) => {
      const updatedInner = inner.replace(/fill="([^"]+)"/g, (fillFull, originalColor) => {
        return `fill={props.layerColors?.["${id}"] ?? "${originalColor}"}`;
      });

      return `<${tagName}${attrs}>${updatedInner}</${tagName}>`;
    }
  );
}

function replaceStyleFill(code) {
  return code.replace(/style=\{\{\s*fill:\s*"([^"]+)"\s*\}\}/g, 'fill="$1"');
}

function replaceStyleObject(code) {
  return code.replace(/style=\{\{([\s\S]*?)\}\}/g, (full, styleContent) => {
    const pairs = [];

    const regex = /([a-zA-Z][a-zA-Z0-9]*)\s*:\s*"([^"]+)"/g;
    let match;

    while ((match = regex.exec(styleContent)) !== null) {
      const jsKey = match[1];
      const value = match[2];

      let propName = jsKey;

      if (jsKey === "strokeWidth") propName = "strokeWidth";
      if (jsKey === "fillOpacity") propName = "fillOpacity";
      if (jsKey === "strokeOpacity") propName = "strokeOpacity";
      if (jsKey === "strokeLinecap") propName = "strokeLinecap";
      if (jsKey === "strokeLinejoin") propName = "strokeLinejoin";
      if (jsKey === "fillRule") propName = "fillRule";
      if (jsKey === "clipRule") propName = "clipRule";
      if (jsKey === "opacity") propName = "opacity";
      if (jsKey === "fill") propName = "fill";
      if (jsKey === "stroke") propName = "stroke";

      pairs.push(`${propName}="${value}"`);
    }

    if (pairs.length === 0) {
      return "";
    }

    return pairs.join(" ");
  });
}

function extractClassStyles(svgCode) {
  const styleMatch = svgCode.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
  if (!styleMatch) return {};

  const css = styleMatch[1];
  const classMap = {};

  const classRegex = /\.([a-zA-Z0-9_-]+)\s*\{([^}]+)\}/g;
  let match;

  while ((match = classRegex.exec(css)) !== null) {
    const className = match[1];
    const rules = match[2];
    const props = {};

    rules.split(";").forEach((rule) => {
      const [rawKey, rawValue] = rule.split(":");
      if (!rawKey || !rawValue) return;

      const key = rawKey.trim();
      const value = rawValue.trim().replace(/^['"]|['"]$/g, "");

      if (key === "fill") props.fill = value;
      if (key === "stroke") props.stroke = value;
      if (key === "stroke-width") props.strokeWidth = value.replace("px", "");
      if (key === "opacity") props.opacity = value;
      if (key === "fill-opacity") props.fillOpacity = value;
      if (key === "stroke-opacity") props.strokeOpacity = value;
      if (key === "stroke-linecap") props.strokeLinecap = value;
      if (key === "stroke-linejoin") props.strokeLinejoin = value;
      if (key === "fill-rule") props.fillRule = value;
      if (key === "clip-rule") props.clipRule = value;
    });

    classMap[className] = props;
  }

  return classMap;
}

function applyClassStyles(code, classMap) {
  return code.replace(/\sclassName="([^"]+)"/g, (full, className) => {
    const styles = classMap[className];
    if (!styles) return "";

    const propsString = Object.entries(styles)
      .map(([key, value]) => ` ${key}="${value}"`)
      .join("");

    return propsString;
  });
}

function removeClassName(code) {
  return code.replace(/\sclassName="[^"]*"/g, "");
}

async function formatCode(code) {
  return prettier.format(code, {
    parser: "typescript",
    singleQuote: false,
    trailingComma: "es5",
    printWidth: 100,
    semi: true,
  });
}

async function main() {
  const svgCode = fs.readFileSync(INPUT, "utf8");
  const viewBox = extractViewBox(svgCode);
  const classMap = extractClassStyles(svgCode);

  let componentCode = await transform(
    svgCode,
    {
      native: true,
      typescript: true,
      plugins: ["@svgr/plugin-svgo", "@svgr/plugin-jsx"],
      jsxRuntime: "classic",
      prettier: false,
      svgo: true,
      svgoConfig: {
        plugins: [
          {
            name: "preset-default",
            params: {
              overrides: {
                removeViewBox: false,
                cleanupIds: false,
                collapseGroups: false,
                mergePaths: false,
              },
            },
          },
        ],
      },
    },
    { componentName: "SharedLevelSvg" }
  );

  componentCode = ensureSvgTagHasProps(componentCode, viewBox);
  componentCode = addVisibleLayerHelper(componentCode);
  componentCode = addTypedProps(componentCode);
  componentCode = addVisibilityToTargetElements(componentCode);
  componentCode = addLayerColorSupport(componentCode);
  componentCode = replaceStyleFill(componentCode);
  componentCode = replaceStyleObject(componentCode);
  componentCode = applyClassStyles(componentCode, classMap);
  componentCode = removeClassName(componentCode);
  componentCode = await formatCode(componentCode);

  fs.writeFileSync(OUTPUT, componentCode, "utf8");
  console.log(`Built ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});