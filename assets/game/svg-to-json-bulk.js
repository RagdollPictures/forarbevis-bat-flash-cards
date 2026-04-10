const fs = require("fs");
const path = require("path");

const inputDir = process.argv[2] || process.cwd();

function parseAttributes(tag) {
  const attrs = {};
  const attrRegex = /([:@\w-]+)\s*=\s*"([^"]*)"/g;
  let match;
  while ((match = attrRegex.exec(tag))) {
    attrs[match[1]] = match[2];
  }
  return attrs;
}

function normalizeAnchorId(rawId, dataName) {
  const base = dataName || rawId || "";
  return base.replace(/-\d+$/, "");
}

function parseAnchorMeta(anchorId) {
  const match = anchorId.match(/^anchor_(read|quiz)_(\d+)$/);
  if (!match) return null;
  return {
    type: match[1],
    index: Number(match[2]),
  };
}

function extractViewBox(svgText) {
  const svgTagMatch = svgText.match(/<svg\b[^>]*viewBox="([^"]+)"/i);
  if (!svgTagMatch) {
    throw new Error("Kunde inte hitta viewBox i SVG.");
  }

  const parts = svgTagMatch[1].trim().split(/\s+/).map(Number);
  if (parts.length !== 4 || parts.some(Number.isNaN)) {
    throw new Error(`Ogiltig viewBox: ${svgTagMatch[1]}`);
  }

  const [, , width, height] = parts;
  return { width, height };
}

function extractAnchors(svgText) {
  const anchors = [];

  const groupRegex = /<g\b([^>]*)>([\s\S]*?)<\/g>/gi;
  let groupMatch;

  while ((groupMatch = groupRegex.exec(svgText))) {
    const groupAttrs = parseAttributes(groupMatch[1]);
    const rawId = groupAttrs.id || "";
    const dataName = groupAttrs["data-name"] || "";
    const anchorId = normalizeAnchorId(rawId, dataName);

    if (!/^anchor_(read|quiz)_\d+$/.test(anchorId)) {
      continue;
    }

    const meta = parseAnchorMeta(anchorId);
    if (!meta) continue;

    const groupContent = groupMatch[2];
    const circleMatch = groupContent.match(/<circle\b([^>]*)\/?>/i);
    if (!circleMatch) {
      throw new Error(`Ingen circle hittades i gruppen ${rawId || anchorId}`);
    }

    const circleAttrs = parseAttributes(circleMatch[1]);
    const x = Number(circleAttrs.cx);
    const y = Number(circleAttrs.cy);

    if (Number.isNaN(x) || Number.isNaN(y)) {
      throw new Error(`Ogiltiga cx/cy i ${rawId || anchorId}`);
    }

    anchors.push({
      id: anchorId,
      type: meta.type,
      index: meta.index,
      x,
      y,
    });
  }

  const seen = new Set();
  for (const anchor of anchors) {
    if (seen.has(anchor.id)) {
      throw new Error(`Dublett efter normalisering: ${anchor.id}`);
    }
    seen.add(anchor.id);
  }

  anchors.sort((a, b) => {
    if (a.index !== b.index) return a.index - b.index;
    if (a.type === b.type) return 0;
    return a.type === "read" ? -1 : 1;
  });

  return anchors;
}

function convertSvgFile(svgPath) {
  const svgText = fs.readFileSync(svgPath, "utf8");
  const viewBox = extractViewBox(svgText);
  const anchors = extractAnchors(svgText);

  const jsonData = {
    viewBox,
    anchors,
  };

  const outPath = svgPath.replace(/\.svg$/i, ".json");
  fs.writeFileSync(outPath, JSON.stringify(jsonData, null, 2) + "\n", "utf8");

  return {
    svgPath,
    outPath,
    anchorCount: anchors.length,
    pairCount: anchors.length / 2,
    viewBox,
  };
}

function run() {
  const files = fs
    .readdirSync(inputDir)
    .filter((file) => /\.svg$/i.test(file))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (files.length === 0) {
    console.log("Inga SVG-filer hittades.");
    return;
  }

  for (const file of files) {
    const fullPath = path.join(inputDir, file);

    try {
      const result = convertSvgFile(fullPath);
      console.log(
        `OK: ${path.basename(result.svgPath)} -> ${path.basename(result.outPath)} | viewBox ${result.viewBox.width}x${result.viewBox.height} | ${result.anchorCount} anchors (${result.pairCount} par)`
      );
    } catch (err) {
      console.error(`FEL i ${file}: ${err.message}`);
    }
  }
}

run();