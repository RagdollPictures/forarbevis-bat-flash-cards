const fs = require("fs");
const path = require("path");
const { transform } = require("@svgr/core");

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
  const marker = 'const ';
  const insert = `
type SharedLevelSvgProps = {
  width?: number;
  height?: number;
  visibleLayerIds?: string[];
};

function isVisible(id, visibleLayerIds) {
  if (!visibleLayerIds || visibleLayerIds.length === 0) return true;
  if (id.startsWith("deco_") || id.startsWith("level_")) {
    return visibleLayerIds.includes(id);
  }
  return true;
}

`;
  return code.replace(/const\s+\w+\s*=\s*\(props\)\s*=>\s*\(/, (match) => {
    return insert + match;
  });
}

function addOpacityToTargetGroups(code) {
  return code.replace(
    /<G([^>]*?)id="([^"]+)"([^>]*)>/g,
    (full, before, id, after) => {
      if (!(id.startsWith("deco_") || id.startsWith("level_"))) {
        return full;
      }

      if (full.includes("opacity={")) return full;

      return `<G${before}id="${id}"${after} opacity={isVisible("${id}", props.visibleLayerIds) ? 1 : 0}>`;
    }
  );
}

function addTsTypesAndExport(code) {
  code = code.replace(
    /const (\w+) = \(props\) => \(/,
    "const $1 = (props: SharedLevelSvgProps) => ("
  );

  code = code.replace(/export default (\w+);/, "export default $1;");
  return code;
}

async function main() {
  const svgCode = fs.readFileSync(INPUT, "utf8");
  const viewBox = extractViewBox(svgCode);

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
  componentCode = addOpacityToTargetGroups(componentCode);
  componentCode = addTsTypesAndExport(componentCode);

  fs.writeFileSync(OUTPUT, componentCode, "utf8");
  console.log(`Built ${OUTPUT}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});