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
  if (anchorId === "anchor_bg") {
    return {
      mode: "bg",
    };
  }

  const levelMatch = anchorId.match(
    /^anchor_(read|quiz|chapter_test|title)_(\d+)$/
  );
  if (levelMatch) {
    return {
      mode: "level",
      type: levelMatch[1],
      index: Number(levelMatch[2]),
    };
  }

  const objectMatch = anchorId.match(/^anchor_object_(\d+)$/);
  if (objectMatch) {
    return {
      mode: "object",
      index: Number(objectMatch[1]),
    };
  }

  const singleMatch = anchorId.match(/^anchor_(\d+)$/);
  if (singleMatch) {
    return {
      mode: "menu",
      index: Number(singleMatch[1]),
    };
  }

  return null;
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

    if (
      anchorId !== "anchor_bg" &&
      !/^anchor_(read|quiz|chapter_test|title)_\d+$/.test(anchorId) &&
      !/^anchor_object_\d+$/.test(anchorId) &&
      !/^anchor_\d+$/.test(anchorId)
    ) {
      continue;
    }

    const meta = parseAnchorMeta(anchorId);
    if (!meta) continue;

    const groupContent = groupMatch[2];

    const circleMatch = groupContent.match(/<circle\b([^>]*)\/?>/i);
    const ellipseMatch = groupContent.match(/<ellipse\b([^>]*)\/?>/i);

    let shapeAttrs = null;

    if (circleMatch) {
      shapeAttrs = parseAttributes(circleMatch[1]);
    } else if (ellipseMatch) {
      shapeAttrs = parseAttributes(ellipseMatch[1]);
    } else if (anchorId === "anchor_bg") {
      shapeAttrs = null;
    } else {
      throw new Error(
        `Ingen circle/ellipse hittades i gruppen ${rawId || anchorId}`
      );
    }

    let x;
    let y;

    if (shapeAttrs) {
      x = Number(shapeAttrs.cx);
      y = Number(shapeAttrs.cy);

      if (Number.isNaN(x) || Number.isNaN(y)) {
        throw new Error(`Ogiltiga cx/cy i ${rawId || anchorId}`);
      }
    } else {
      x = null;
      y = null;
    }

    const anchor = {
      id: anchorId,
    };

    if (meta.mode === "level") {
      anchor.type = meta.type;
      anchor.index = meta.index;
    }

    if (meta.mode === "object") {
      anchor.type = "object";
      anchor.index = meta.index;
    }

    if (meta.mode === "menu") {
      anchor.index = meta.index;
    }

    if (x !== null && y !== null) {
      anchor.x = x;
      anchor.y = y;
    }

    anchors.push(anchor);
  }

  const seen = new Set();
  for (const anchor of anchors) {
    if (seen.has(anchor.id)) {
      throw new Error(`Dublett efter normalisering: ${anchor.id}`);
    }
    seen.add(anchor.id);
  }

  const typeOrder = {
    title: 0,
    object: 1,
    read: 2,
    quiz: 3,
    chapter_test: 4,
  };

  anchors.sort((a, b) => {
    if (a.id === "anchor_bg") return -1;
    if (b.id === "anchor_bg") return 1;

    const aIndex =
      typeof a.index === "number" ? a.index : Number.MAX_SAFE_INTEGER;
    const bIndex =
      typeof b.index === "number" ? b.index : Number.MAX_SAFE_INTEGER;

    if (aIndex !== bIndex) return aIndex - bIndex;

    const aTypeOrder =
      a.type in typeOrder ? typeOrder[a.type] : Number.MAX_SAFE_INTEGER;
    const bTypeOrder =
      b.type in typeOrder ? typeOrder[b.type] : Number.MAX_SAFE_INTEGER;

    if (aTypeOrder !== bTypeOrder) return aTypeOrder - bTypeOrder;

    return a.id.localeCompare(b.id, undefined, { numeric: true });
  });

  return anchors;
}

function convertSvgFile(svgPath) {
  const svgText = fs.readFileSync(svgPath, "utf8");
  const viewBox = extractViewBox(svgText);
  const anchors = extractAnchors(svgText);

  const bgAnchor = anchors.find((a) => a.id === "anchor_bg");
  if (
    bgAnchor &&
    (typeof bgAnchor.x !== "number" || typeof bgAnchor.y !== "number")
  ) {
    bgAnchor.x = viewBox.width / 2;
    bgAnchor.y = viewBox.height / 2;
  }

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
    pairCount: anchors.filter(
      (a) => a.type === "read" || a.type === "quiz"
    ).length / 2,
    chapterTestCount: anchors.filter((a) => a.type === "chapter_test").length,
    titleCount: anchors.filter((a) => a.type === "title").length,
    objectCount: anchors.filter((a) => a.type === "object").length,
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
        `OK: ${path.basename(result.svgPath)} -> ${path.basename(
          result.outPath
        )} | viewBox ${result.viewBox.width}x${result.viewBox.height} | ${
          result.anchorCount
        } anchors (${result.pairCount} par, ${result.chapterTestCount} chapter test, ${result.titleCount} title, ${result.objectCount} object)`
      );
    } catch (err) {
      console.error(`FEL i ${file}: ${err.message}`);
    }
  }
}

run();