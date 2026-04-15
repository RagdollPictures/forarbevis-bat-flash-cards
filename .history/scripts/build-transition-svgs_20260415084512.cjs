const fs = require("fs");
const path = require("path");
const { transform } = require("@svgr/core");

const DIR = __dirname;

const files = fs
  .readdirSync(DIR)
  .filter((file) => file.endsWith(".svg") && file.startsWith("transition_"));

function toPascalCase(name) {
  return name
    .replace(/\.svg$/i, "")
    .split(/[^a-zA-Z0-9]/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

function pickDefaultColor(filename) {
  const lower = filename.toLowerCase();
  if (lower.includes("back")) return "#1E5A85";
  if (lower.includes("front")) return "#0A2E4D";
  return "#0A2E4D";
}

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

function ensureSvgTagHasPropsAndAspectRatio(code, viewBox) {
  return code.replace(/<Svg([^>]*)>/, (full, attrs) => {
    let cleaned = attrs;

    cleaned = cleaned.replace(/\swidth=\{[^}]+\}/g, "");
    cleaned = cleaned.replace(/\sheight=\{[^}]+\}/g, "");
    cleaned = cleaned.replace(/\sxmlns="[^"]*"/g, "");
    cleaned = cleaned.replace(/\sviewBox="[^"]*"/g, "");
    cleaned = cleaned.replace(/\spreserveAspectRatio="[^"]*"/g, "");
    cleaned = cleaned.replace(/\s\{\.\.\.props\}/g, "");

    return `<Svg${cleaned} viewBox="${viewBox}" preserveAspectRatio="none" {...props}>`;
  });
}

function replaceFillAttributes(code, defaultColor) {
  return code.replace(/fill="([^"]+)"/g, `fill={props.color ?? "${defaultColor}"}`);
}

async function buildOne(filename) {
  const svgPath = path.join(DIR, filename);
  const svgCode = fs.readFileSync(svgPath, "utf8");
  const componentName = toPascalCase(filename);
  const defaultColor = pickDefaultColor(filename);
  const viewBox = extractViewBox(svgCode);

  let jsCode = await transform(
    svgCode,
    {
      native: true,
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
              },
            },
          },
        ],
      },
    },
    { componentName }
  );

  jsCode = ensureSvgTagHasPropsAndAspectRatio(jsCode, viewBox);
  jsCode = replaceFillAttributes(jsCode, defaultColor);

  const outPath = path.join(DIR, `${componentName}.js`);
  fs.writeFileSync(outPath, jsCode, "utf8");
  console.log(`Built ${path.basename(outPath)}`);
}

async function main() {
  if (files.length === 0) {
    console.log('No matching SVG files found. Expected files like "transition_water_front.svg".');
    return;
  }

  for (const file of files) {
    await buildOne(file);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});