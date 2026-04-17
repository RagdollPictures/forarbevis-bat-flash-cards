import type { LevelTheme } from "./levelScreenTypes";

const level001Theme: LevelTheme = {
  bgImageSource: require("../../assets/game/bg.jpg"),
  platformImageSource: require("../../assets/game/level_001_platform_01.png"),
  palette: {
    sky: "#eef8ff",
    water: "#7fc9ff",
    path: "#ffe7ba",
    platform: "#d8efbf",
    accent: "#ffb14a",
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
    tree_01: require("../../assets/game/level_001/tree_01.svg"),
    tree_02: require("../../assets/game/level_001/tree_02.svg"),
  },
};

const defaultTheme: LevelTheme = {
  bgImageSource: require("../../assets/game/bg.jpg"),
  platformImageSource: require("../../assets/game/level_001_platform_01.png"),
  palette: {
    sky: "#eef8ff",
    water: "#7fc9ff",
    path: "#ffe7ba",
    platform: "#d8efbf",
    accent: "#ffb14a",
  },
  objects: {
    anchor_object_01: {
      assetKey: "tree_01",
      width: 120,
      height: 140,
      anchor: "bottom",
    },
  },
  objectAssets: {
    tree_01: require("../../assets/game/level_001/tree_01.svg"),
  },
};

export const levelThemesById: Record<string, LevelTheme> = {
  level_001: level001Theme,
  level_002: {
    ...defaultTheme,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_003: {
    ...defaultTheme,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_004: {
    ...defaultTheme,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_005: {
    ...defaultTheme,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_006: {
    ...defaultTheme,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_007: {
    ...defaultTheme,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_008: {
    ...defaultTheme,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_009: {
    ...defaultTheme,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_010: {
    ...defaultTheme,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_011: {
    ...defaultTheme,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_012: {
    ...defaultTheme,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_013: {
    ...defaultTheme,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_014: {
    ...defaultTheme,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
  level_015: {
    ...defaultTheme,
    objects: { ...defaultTheme.objects },
    objectAssets: { ...defaultTheme.objectAssets },
  },
};