import type { MenuLevel } from "./levelScreenTypes";
import { levelThemesById } from "./levelThemes";
import { sharedLevelLayout, SharedLevelSvg } from "./sharedLevelLayout";

export const levelIds = [
  "level_001",
  "level_002",
  "level_003",
  "level_004",
  "level_005",
  "level_006",
  "level_007",
  "level_008",
  "level_009",
  "level_010",
  "level_011",
  "level_012",
  "level_013",
  "level_014",
  "level_015",
] as const;

export type LevelId = (typeof levelIds)[number];

const defaultTheme = {
  bgImageSource: require(""),
  platformImageSource: require("../../assets/game/level_001_platform_01.png"),
  palette: {
    sky: "#eef8ff",
    water: "#7fc9ff",
    path: "#ffe7ba",
    platform: "#d8efbf",
    accent: "#ffb14a",
  },
  objects: {},
};

export const levelsById: Record<LevelId, MenuLevel> = {
  level_001: {
    id: "level_001",
    chapterId: "sjokortet",
    label: "Kartunderlag & koordinater",
    iconName: "map",
    menuAnchorId: "anchor_001",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_001 ?? defaultTheme,
  },
  level_002: {
    id: "level_002",
    chapterId: "sjokortet_sjomarken",
    label: "Sjövägsmärken & markeringar",
    iconName: "map",
    menuAnchorId: "anchor_002",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_002 ?? defaultTheme,
  },
  level_003: {
    id: "level_003",
    chapterId: "sjokortsarbete",
    label: "Praktiskt arbete i sjökort",
    iconName: "map",
    menuAnchorId: "anchor_003",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_003 ?? defaultTheme,
  },
  level_004: {
    id: "level_004",
    chapterId: "navigationsteori",
    label: "Navigationsprinciper",
    iconName: "map",
    menuAnchorId: "anchor_004",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_004 ?? defaultTheme,
  },
  level_005: {
    id: "level_005",
    chapterId: "praktisk_navigation",
    label: "Navigering i praktiken",
    iconName: "map",
    menuAnchorId: "anchor_005",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_005 ?? defaultTheme,
  },
  level_006: {
    id: "level_006",
    chapterId: "vajningsregler",
    label: "Trafikregler till sjöss",
    iconName: "map",
    menuAnchorId: "anchor_006",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_006 ?? defaultTheme,
  },
  level_007: {
    id: "level_007",
    chapterId: "lanternor",
    label: "Navigationsljus",
    iconName: "map",
    menuAnchorId: "anchor_007",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_007 ?? defaultTheme,
  },
  level_008: {
    id: "level_008",
    chapterId: "manovrering",
    label: "Båtens rörelser & kontroll",
    iconName: "map",
    menuAnchorId: "anchor_008",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_008 ?? defaultTheme,
  },
  level_009: {
    id: "level_009",
    chapterId: "navigationsinstrument",
    label: "Instrument & utrustning",
    iconName: "map",
    menuAnchorId: "anchor_009",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_009 ?? defaultTheme,
  },
  level_010: {
    id: "level_010",
    chapterId: "sjomanskap",
    label: "Båtvett & ombordkunskap",
    iconName: "map",
    menuAnchorId: "anchor_010",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_010 ?? defaultTheme,
  },
  level_011: {
    id: "level_011",
    chapterId: "signalering",
    label: "Kommunikation till sjöss",
    iconName: "map",
    menuAnchorId: "anchor_011",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_011 ?? defaultTheme,
  },
  level_012: {
    id: "level_012",
    chapterId: "sakerhet",
    label: "Säkerhet & beredskap",
    iconName: "map",
    menuAnchorId: "anchor_012",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_012 ?? defaultTheme,
  },
  level_013: {
    id: "level_013",
    chapterId: "sjukvard",
    label: "Första hjälpen ombord",
    iconName: "map",
    menuAnchorId: "anchor_013",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_013 ?? defaultTheme,
  },
  level_014: {
    id: "level_014",
    chapterId: "vader",
    label: "Meteorologi för båtfolk",
    iconName: "map",
    menuAnchorId: "anchor_014",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_014 ?? defaultTheme,
  },
  level_015: {
    id: "level_015",
    chapterId: "miljo",
    label: "Natur och ansvar",
    iconName: "map",
    menuAnchorId: "anchor_015",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_015 ?? defaultTheme,
  },
};

export function isLevelId(value: string): value is LevelId {
  return value in levelsById;
}

export function getLevelId(value?: string): LevelId {
  if (value && isLevelId(value)) return value;
  return levelIds[0];
}