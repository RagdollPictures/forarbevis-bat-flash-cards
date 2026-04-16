export type LevelTheme = {
  bgImageSource: any;
  platformImageSource: any;
  palette: {
    sky: string;
    water: string;
    path: string;
    platform: string;
    accent: string;
  };
  objects: Record<string, string>;
};

const imgPlatformWaterLily_01 = require("../../assets/game/level_001_platform_01.png");
const level_001_bg = require("../../assets/game/bg.jpg");

export const levelThemesById: Record<string, LevelTheme> = {
  level_001: {
    bgImageSource: level_001_bg,
    platformImageSource: imgPlatformWaterLily_01,
    palette: {
      sky: "#dff3ff",
      water: "#8fd3ff",
      path: "#f8e8b5",
      platform: "#d7f0c8",
      accent: "#f26d6d",
    },
    objects: {
      anchor_object_01: "tree",
      anchor_object_02: "red_house",
      anchor_object_03: "dock",
      anchor_object_04: "boat",
    },
  },
  level_002: {
    bgImageSource: level_001_bg,
    platformImageSource: imgPlatformWaterLily_01,
    palette: {
      sky: "#e8f7ff",
      water: "#75c7f0",
      path: "#ffe1a8",
      platform: "#cde6a8",
      accent: "#ff9c5b",
    },
    objects: {
      anchor_object_01: "lighthouse",
      anchor_object_02: "rock",
      anchor_object_03: "buoy",
      anchor_object_04: "sailboat",
    },
  },
};