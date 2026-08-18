import type { LevelTheme } from "../../app/game/levelScreenTypes";


const level001Theme: LevelTheme = {
  palette: {
    accent: "#00b3fd",
    text: "#ffffff",
  },
  levelLayerId: "level_001",
  decoCount: 5
};

const defaultTheme: LevelTheme = {
  palette: {
    accent: "#00b3fd",
    text: "#ffffff",
  },
  levelLayerId: "level_001",
  decoCount: 3,
  backgroundSvg: Level001Bg
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