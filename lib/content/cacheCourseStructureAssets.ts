import type {
    CourseBonusLevel,
    CourseLevel,
    CourseStructure,
} from "./loadCourseStructureFromSupabase";

import { getCourseAssetUrl } from "./courseAssetUrl";

async function loadSvg(
  path: string | undefined
): Promise<string | undefined> {
  const url = getCourseAssetUrl(path);

  if (!url) {
    return undefined;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.warn(
        `Kunde inte hämta SVG: ${path}`
      );

      return undefined;
    }

    return await response.text();
  } catch (error) {
    console.warn(
      `Kunde inte hämta SVG: ${path}`,
      error
    );

    return undefined;
  }
}

async function cacheLevelAssets(
  level: CourseLevel
): Promise<CourseLevel> {
  const [
    iconSvg,
    iconOffSvg,
    levelIconSvg,
  ] = await Promise.all([
    loadSvg(level.iconPath),
    loadSvg(level.iconOffPath),
    loadSvg(level.levelIconPath),
  ]);

  return {
    ...level,
    iconSvg,
    iconOffSvg,
    levelIconSvg,
  };
}

async function cacheBonusAssets(
  bonus: CourseBonusLevel
): Promise<CourseBonusLevel> {
  const [
    iconSvg,
    iconOffSvg,
  ] = await Promise.all([
    loadSvg(bonus.iconPath),
    loadSvg(bonus.iconOffPath),
  ]);

  return {
    ...bonus,
    iconSvg,
    iconOffSvg,
  };
}

export async function cacheCourseStructureAssets(
  structure: CourseStructure
): Promise<CourseStructure> {
  const [
    levels,
    bonusLevels,
  ] = await Promise.all([
    Promise.all(
      structure.levels.map(
        cacheLevelAssets
      )
    ),

    Promise.all(
      structure.bonusLevels.map(
        cacheBonusAssets
      )
    ),
  ]);

  return {
    ...structure,
    levels,
    bonusLevels,
  };
}