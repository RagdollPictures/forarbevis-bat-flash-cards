import { course, type CourseLevelId } from "../../content/course";
import { levelThemesById } from "../../content/levels/levelThemes";

import type { CourseStructure } from "../../lib/content/loadCourseStructureFromSupabase";
import type { LevelTheme, MenuLevel } from "./levelScreenTypes";
import { sharedLevelLayout, SharedLevelSvg } from "./sharedLevelLayout";

export const levelIds = Object.keys(course.levels) as CourseLevelId[];

export type LevelId = CourseLevelId;

const defaultTheme: LevelTheme = {
  palette: {
    accent: "#ffb14a",
  },
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
        theme: levelThemesById[levelId] ?? defaultTheme,
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

export function buildLevelConfigFromStructure(
  structure: CourseStructure
) {
  const sortedLevels = [...structure.levels].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  const dynamicLevelIds = sortedLevels.map(
    (level) => level.id
  );

  const dynamicLevelsById = Object.fromEntries(
    sortedLevels.map((level) => {
      const levelNumber =
        level.id.replace("level_", "");

      const menuLevel: MenuLevel = {
        id: level.id,
        chapterId: level.chapterId,
        titleShort: level.titleShort,
        label: level.label,
        menuAnchorId: `anchor_${levelNumber}`,
        layout: sharedLevelLayout,
        Svg: SharedLevelSvg,
        theme:
          levelThemesById[level.id] ??
          defaultTheme,
      };

      return [level.id, menuLevel];
    })
  ) as Record<string, MenuLevel>;

  return {
    levelIds: dynamicLevelIds,
    levelsById: dynamicLevelsById,
  };
}