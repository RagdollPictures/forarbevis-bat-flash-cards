import type { LevelTheme } from "./levelScreenTypes";



const basePalette = {
  sky: "#eef8ff",
  water: "#7fc9ff",
  path: "#ffe7ba",
  platform: "#d8efbf",
  accent: "#ffb14a",
};

const level001Theme: LevelTheme = {
  palette: { ...basePalette },
  levelLayerId: "level_001",
  decoCount: 5,
  layerColors: {
  anchor_bg: "#000000",
  deco_01: "#dff4ff",
  deco_bottom_01: "ff0000",
  deco_02: "#ffe7ba",
  deco_03: "#d8efbf",
  deco_04: "#ffd5c4",
  deco_05: "#cfe8ff",
},
  objects: {
    anchor_object_01: {
      assetKey: "tree_01",
      width: 120,
      height: 140,
      anchor: "bottom",
    },
    anchor_object_02: {
      assetKey: "tree_02",
      width: 110,
      height: 130,
      anchor: "bottom",
    },
  },
  objectAssets: {
    tree_01: require("../../assets/game/level_001/tree_01.png"),
    tree_02: require("../../assets/game/level_001/tree_02.png"),
  },
};

const defaultTheme: LevelTheme = {
  palette: { ...basePalette },
  levelLayerId: "level_001",
  decoCount: 3,
  objects: {
    anchor_object_01: {
      assetKey: "tree_01",
      width: 120,
      height: 140,
      anchor: "bottom",
    },
  },
  objectAssets: {
    tree_01: require("../../assets/game/level_001/tree_01.png"),
  },
};

export const levelThemesById: Record<string, LevelTheme> = {
  level_001: level001Theme,
  level_002: {
    ...defaultTheme,
    levelLayerId: "level_002",
    decoCount: 3,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_003: {
    ...defaultTheme,
    levelLayerId: "level_003",
    decoCount: 7,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_004: {
    ...defaultTheme,
    levelLayerId: "level_004",
    decoCount: 9,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_005: {
    ...defaultTheme,
    levelLayerId: "level_005",
    decoCount: 5,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_006: {
    ...defaultTheme,
    levelLayerId: "level_006",
    decoCount: 5,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_007: {
    ...defaultTheme,
    levelLayerId: "level_007",
    decoCount: 6,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_008: {
    ...defaultTheme,
    levelLayerId: "level_008",
    decoCount: 7,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_009: {
    ...defaultTheme,
    levelLayerId: "level_009",
    decoCount: 6,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_010: {
    ...defaultTheme,
    levelLayerId: "level_010",
    decoCount: 9,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_011: {
    ...defaultTheme,
    levelLayerId: "level_011",
    decoCount: 4,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_012: {
    ...defaultTheme,
    levelLayerId: "level_012",
    decoCount: 8,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_013: {
    ...defaultTheme,
    levelLayerId: "level_013",
    decoCount: 4,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_014: {
    ...defaultTheme,
    levelLayerId: "level_014",
    decoCount: 4,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_015: {
    ...defaultTheme,
    levelLayerId: "level_015",
    decoCount: 6,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
};