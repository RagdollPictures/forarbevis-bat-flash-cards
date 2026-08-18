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
  decoCount?: number;
  layerColors?: Partial<Record<string, string>>;
};

function isVisible(
  id: string,
  visibleLayerIds?: string[],
  decoCount?: number
) {
  if (id.startsWith("deco_")) {
    const numberMatch = id.match(/^deco_(\\d+)/);

    if (numberMatch) {
      const index = Number(numberMatch[1]);

      if (typeof decoCount === "number") {
        return index <= decoCount;
      }
    }

    return true;
  }

  if (visibleLayerIds && visibleLayerIds.length > 0) {
    return visibleLayerIds.some(
      (visibleId) => id === visibleId || id.startsWith(\`\${visibleId}_\`)
    );
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
  return code.replace(/<G\b([\s\S]*?)>/g, (full, attrs) => {
    const idMatch = attrs.match(/\bid="([^"]+)"/);
    if (!idMatch) return full;

    const id = idMatch[1];

    const shouldControl =
      id.startsWith("level_") || id.startsWith("deco_");

    if (!shouldControl) {
      return full;
    }

    if (/\bdisplay=\{/.test(full)) {
      return full;
    }

    return `<G${attrs} display={isVisible("${id}", props.visibleLayerIds, props.decoCount) ? "flex" : "none"}>`;
  });
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

    return pairs.length ? pairs.join(" ") : "";
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

    return Object.entries(styles)
      .map(([key, value]) => ` ${key}="${value}"`)
      .join("");
  });
}

function removeClassName(code) {
  return code.replace(/\sclassName="[^"]*"/g, "");
}

function shouldTintFill(fillValue) {
  if (!fillValue) return false;
  if (fillValue === "none") return false;
  if (fillValue.includes("url(")) return false;
  return true;
}

function addLayerColorSupport(code) {
  const tokenRegex = /<G\b[\s\S]*?>|<\/G>|fill="([^"]+)"/g;
  const groupStack = [];

  let result = "";
  let lastIndex = 0;
  let match;

  function getCurrentGroupId() {
    for (let i = groupStack.length - 1; i >= 0; i -= 1) {
      const id = groupStack[i];
      if (id) return id;
    }
    return null;
  }

  while ((match = tokenRegex.exec(code)) !== null) {
    const token = match[0];

    result += code.slice(lastIndex, match.index);
    lastIndex = tokenRegex.lastIndex;

    if (token.startsWith("<G")) {
      const idMatch = token.match(/\bid="([^"]+)"/);
      const groupId = idMatch ? idMatch[1] : null;
      groupStack.push(groupId);
      result += token;
      continue;
    }

    if (token === "</G>") {
      groupStack.pop();
      result += token;
      continue;
    }

    if (token.startsWith('fill="')) {
      const originalColor = match[1];
      const groupId = getCurrentGroupId();

      if (!groupId || !shouldTintFill(originalColor)) {
        result += token;
        continue;
      }

      result += `fill={props.layerColors?.["${groupId}"] ?? "${originalColor}"}`;
      continue;
    }

    result += token;
  }

  result += code.slice(lastIndex);
  return result;
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
  componentCode = replaceStyleFill(componentCode);
  componentCode = replaceStyleObject(componentCode);
  componentCode = applyClassStyles(componentCode, classMap);
  componentCode = removeClassName(componentCode);
  componentCode = addLayerColorSupport(componentCode);
  componentCode = await formatCode(componentCode);

  fs.writeFileSync(OUTPUT, componentCode, "utf8");
  console.log(`Built ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});