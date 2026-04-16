import type { LevelTheme } from "./levelScreenTypes";

const sharedThemeBase: LevelTheme = {
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
    anchor_object_01: "tree",
  },
};

export const levelThemesById: Record<string, LevelTheme> = {
  level_001: sharedThemeBase,
  level_002: sharedThemeBase,
  level_003: sharedThemeBase,
  level_004: sharedThemeBase,
  level_005: sharedThemeBase,
  level_006: sharedThemeBase,
  level_007: sharedThemeBase,
  level_008: sharedThemeBase,
  level_009: sharedThemeBase,
  level_010: sharedThemeBase,
  level_011: sharedThemeBase,
  level_012: sharedThemeBase,
  level_013: sharedThemeBase,
  level_014: sharedThemeBase,
  level_015: sharedThemeBase,
};