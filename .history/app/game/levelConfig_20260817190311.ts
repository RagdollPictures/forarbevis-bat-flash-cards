import { course, type CourseLevelId } from "../../content/course";

import type { MenuLevel } from "./levelScreenTypes";
import { levelThemesById } from "./levelThemes";
import { sharedLevelLayout, SharedLevelSvg } from "./sharedLevelLayout";


export const levelIds = Object.keys(course.levels) as CourseLevelId[];


export type LevelId = CourseLevelId;


const defaultTheme = {
  palette: {
    sky: "#eef8ff",
    water: "#7fc9ff",
    path: "#ffe7ba",
    platform: "#d8efbf",
    accent: "#ffb14a",
  },
  objects: {},
};


export const levelsById = Object.fromEntries(
  levelIds.map((levelId) => {
    const level = course.levels[levelId];

    const levelNumber = levelId.replace("level_", "");

    return [
      levelId,
      {
        ...level,

        menuAnchorId: `anchor_${levelNumber}`,

        layout: sharedLevelLayout,

        Svg: SharedLevelSvg,

        theme:
          levelThemesById[levelId] ??
          defaultTheme,
      },
    ];
  })
) as Record<LevelId, MenuLevel>;


export function isLevelId(value: string): value is LevelId {
  return value in levelsById;
}


export function getLevelId(value?: string): LevelId {
  if (value && isLevelId(value)) return value;

  return levelIds[0];
}