import { levelThemesById } from "../../content/levels/levelThemes";
import type { CourseStructure } from "../../lib/content/loadCourseStructureFromSupabase";

import type {
  LevelTheme,
  MenuLevel,
} from "./levelScreenTypes";
import {
  sharedLevelLayout,
  SharedLevelSvg,
} from "./sharedLevelLayout";

const defaultTheme: LevelTheme = {
  palette: {
    accent: "#ffb14a",
  },
};

export function buildLevelConfigFromStructure(
  structure: CourseStructure
) {
  const sortedLevels = [
    ...structure.levels,
  ].sort(
    (a, b) =>
      a.sortOrder - b.sortOrder
  );

  const levelIds =
    sortedLevels.map(
      (level) => level.id
    );

  const levelsById =
    Object.fromEntries(
      sortedLevels.map(
        (level) => {
          const levelNumber =
            level.id.replace(
              "level_",
              ""
            );

          const menuLevel: MenuLevel =
            {
              id: level.id,
              chapterId:
                level.chapterId,
              titleShort:
                level.titleShort,
              label:
                level.label,
              menuAnchorId:
                `anchor_${levelNumber}`,
              layout:
                sharedLevelLayout,
              Svg: SharedLevelSvg,
              theme:
                levelThemesById[
                  level.id
                ] ??
                defaultTheme,
            };

          return [
            level.id,
            menuLevel,
          ];
        }
      )
    ) as Record<
      string,
      MenuLevel
    >;

  return {
    levelIds,
    levelsById,
  };
}