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
      key: "tree_01",
      width: 120,
      height: 140,
      anchor: "bottom",
    },
    anchor_object_02: {
      key: "tree_02",
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
      key: "tree_01",
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
  level_002: defaultTheme,
  level_003: defaultTheme,
  level_004: defaultTheme,
  level_005: defaultTheme,
  level_006: defaultTheme,
  level_007: defaultTheme,
  level_008: defaultTheme,
  level_009: defaultTheme,
  level_010: defaultTheme,
  level_011: defaultTheme,
  level_012: defaultTheme,
  level_013: defaultTheme,
  level_014: defaultTheme,
  level_015: defaultTheme,
};