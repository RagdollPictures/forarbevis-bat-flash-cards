import type { LevelTheme } from "./levelScreenTypes";



const basePalette = {
  sky: "#eef8ff",
  water: "#7fc9ff",
  path: "#ffe7ba",
  platform: "#d8efbf",
  accent: "#fcfcd8",
  text: "#ffffff",
};

const level001Theme: LevelTheme = {
  palette: {
    ...basePalette,
    accent: "#fcfcd8",
    text: "#233f56",
  },
  levelLayerId: "level_001",
  decoCount: 5,
  layerColors: {
   
    deco_01: "#9f9615",
    deco_02: "#487a55",
    deco_03: "#265253",
    deco_04: "#2f6c7e",
    deco_05: "#265253",
    deco_01_shadow: "rgba(0, 0, 0, 0.1)",
    deco_02_shadow: "rgba(0, 0, 0, 0.1)",
    deco_03_shadow: "rgba(0, 0, 0, 0.1)",
    deco_04_shadow: "rgba(0, 0, 0, 0.1)",
    deco_05_shadow: "rgba(0, 0, 0, 0.1)",
     deco_01_highlight: "rgba(255, 255, 255, 0.1)",
  },
};

const defaultTheme: LevelTheme = {
  palette: {
    ...basePalette,
    accent: "#4ba3ff",
    text:  "#233f56",
  },
  levelLayerId: "level_001",
  decoCount: 3,
  layerColors:{
        deco_01_shadow: "rgba(0, 0, 0, 0.1)",
    deco_02_shadow: "rgba(0, 0, 0, 0.1)",
    deco_03_shadow: "rgba(0, 0, 0, 0.1)",
    deco_04_shadow: "rgba(0, 0, 0, 0.1)",
    deco_05_shadow: "rgba(0, 0, 0, 0.1)",
    deco_01_highlight: "rgba(0, 0, 0, 0.1)",
  }
};

export const levelThemesById: Record<string, LevelTheme> = {
  level_001: level001Theme,
  level_002: {
    ...defaultTheme,
    levelLayerId: "level_002",
    decoCount: 3,
  },
  level_003: {
    ...defaultTheme,
    levelLayerId: "level_003",
    decoCount: 7,
  },
  level_004: {
    ...defaultTheme,
    levelLayerId: "level_004",
    decoCount: 9,
  },
  level_005: {
    ...defaultTheme,
    levelLayerId: "level_005",
    decoCount: 5,
  },
  level_006: {
    ...defaultTheme,
    levelLayerId: "level_006",
    decoCount: 5,
  },
  level_007: {
    ...defaultTheme,
    levelLayerId: "level_007",
    decoCount: 6,
  },
  level_008: {
    ...defaultTheme,
    levelLayerId: "level_008",
    decoCount: 7,
  },
  level_009: {
    ...defaultTheme,
    levelLayerId: "level_009",
    decoCount: 6,
  },
  level_010: {
    ...defaultTheme,
    levelLayerId: "level_010",
    decoCount: 9,
  },
  level_011: {
    ...defaultTheme,
    levelLayerId: "level_011",
    decoCount: 4,
  },
  level_012: {
    ...defaultTheme,
    levelLayerId: "level_012",
    decoCount: 8,
  },
  level_013: {
    ...defaultTheme,
    levelLayerId: "level_013",
    decoCount: 4,
  },
  level_014: {
    ...defaultTheme,
    levelLayerId: "level_014",
    decoCount: 4,
  },
  level_015: {
    ...defaultTheme,
    levelLayerId: "level_015",
    decoCount: 6,
  },
};