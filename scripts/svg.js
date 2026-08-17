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

  const titleBoxMatch = anchorId.match(/^title_box_(\d+)$/);
  if (titleBoxMatch) {
    return {
      mode: "title_box",
      type: "title_box",
      index: Number(titleBoxMatch[1]),
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
      !/^title_box_\d+$/.test(anchorId) &&
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
    const rectMatch = groupContent.match(/<rect\b([^>]*)\/?>/i);

    let shapeAttrs = null;
    let shapeType = null;

    if (circleMatch) {
      shapeAttrs = parseAttributes(circleMatch[1]);
      shapeType = "circle";
    } else if (ellipseMatch) {
      shapeAttrs = parseAttributes(ellipseMatch[1]);
      shapeType = "ellipse";
    } else if (rectMatch) {
      shapeAttrs = parseAttributes(rectMatch[1]);
      shapeType = "rect";
    } else if (anchorId === "anchor_bg") {
      shapeAttrs = null;
      shapeType = null;
    } else {
      throw new Error(
        `Ingen circle/ellipse/rect hittades i gruppen ${rawId || anchorId}`
      );
    }

    const anchor = {
      id: anchorId,
    };

    if (meta.mode === "level") {
      anchor.type = meta.type;
      anchor.index = meta.index;
    }

    if (meta.mode === "title_box") {
      anchor.type = "title_box";
      anchor.index = meta.index;
    }

    if (meta.mode === "object") {
      anchor.type = "object";
      anchor.index = meta.index;
    }

    if (meta.mode === "menu") {
      anchor.index = meta.index;
    }

    if (shapeAttrs && (shapeType === "circle" || shapeType === "ellipse")) {
      const x = Number(shapeAttrs.cx);
      const y = Number(shapeAttrs.cy);

      if (Number.isNaN(x) || Number.isNaN(y)) {
        throw new Error(`Ogiltiga cx/cy i ${rawId || anchorId}`);
      }

      anchor.x = x;
      anchor.y = y;
    }

    if (shapeAttrs && shapeType === "rect") {
      const x = Number(shapeAttrs.x);
      const y = Number(shapeAttrs.y);
      const width = Number(shapeAttrs.width);
      const height = Number(shapeAttrs.height);

      if (
        Number.isNaN(x) ||
        Number.isNaN(y) ||
        Number.isNaN(width) ||
        Number.isNaN(height)
      ) {
        throw new Error(`Ogiltiga rect-attribut i ${rawId || anchorId}`);
      }

      anchor.x = x;
      anchor.y = y;
      anchor.width = width;
      anchor.height = height;
      anchor.cx = x + width / 2;
      anchor.cy = y + height / 2;
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
    title_box: 0,
    title: 1,
    object: 2,
    read: 3,
    quiz: 4,
    chapter_test: 5,
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
    titleBoxCount: anchors.filter((a) => a.type === "title_box").length,
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
        } anchors (${result.pairCount} par, ${result.chapterTestCount} chapter test, ${result.titleCount} title, ${result.titleBoxCount} title box, ${result.objectCount} object)`
      );
    } catch (err) {
      console.error(`FEL i ${file}: ${err.message}`);
    }
  }
}

run();