import { levelThemesById } from "./levelThemes";
import { sharedLevelLayout, SharedLevelSvg } from "./sharedLevelLayout";

export const levelIds = ["level_001", "level_002", "level_003"];

export const levelsById = {
  level_001: {
    id: "level_001",
    chapterId: "chapter_001",
    label: "Grundkurs",
    iconName: "book",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_001,
  },
  level_002: {
    id: "level_002",
    chapterId: "chapter_002",
    label: "Sjömärken",
    iconName: "buoy",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: levelThemesById.level_002,
  },
  level_003: {
    id: "level_003",
    chapterId: "chapter_003",
    label: "Navigation",
    iconName: "compass",
    layout: sharedLevelLayout,
    Svg: SharedLevelSvg,
    theme: {
      bgImageSource: require("../../assets/game/bg.jpg"),
      platformImageSource: imgPlatformWaterLily_01,
      palette: {
        sky: "#eef8ff",
        water: "#7fc9ff",
        path: "#ffe7ba",
        platform: "#d8efbf",
        accent: "#ffb14a",
      },
      objects: {
        anchor_object_01: "compass",
        anchor_object_02: "map",
        anchor_object_03: "boat",
        anchor_object_04: "island",
      },
    },
  },
};

export function getLevelId(input?: string) {
  if (input && input in levelsById) return input;
  return levelIds[0];
}