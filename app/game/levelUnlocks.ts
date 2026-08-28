import type { CourseStructure } from "../../lib/content/loadCourseStructureFromSupabase";

import type {
  BonusLevelItem,
  QuizItem
} from "./levelScreenTypes";

export function getUnlockedQuizIds(
  quizzes: QuizItem[],
  clearedIds: Set<string>
) {
  const unlocked =
    new Set<string>();

  if (quizzes.length === 0) {
    return unlocked;
  }

  // Första banan är alltid upplåst.
  unlocked.add(quizzes[0].id);

  for (
    let i = 0;
    i < quizzes.length;
    i++
  ) {
    const currentId =
      quizzes[i].id;

    if (
      !clearedIds.has(
        currentId
      )
    ) {
      continue;
    }

    // En redan klarad bana
    // ska aldrig låsas igen.
    unlocked.add(currentId);

    // Om denna bana är klar
    // ska nästa vara upplåst.
    const next =
      quizzes[i + 1];

    if (next) {
      unlocked.add(next.id);
    }
  }

  return unlocked;
}

export function getUnlockedLevelIds(
  levelIds: readonly string[],
  clearedIds: Set<string>,
  structure: CourseStructure
) {
  const s = new Set<string>();

  if (levelIds.length === 0) return s;

  s.add(levelIds[0]);

  for (let i = 1; i < levelIds.length; i++) {
    const prevLevelId = levelIds[i - 1];

    const prevLevel = structure.levels.find(
      (level) => level.id === prevLevelId
    );

    if (!prevLevel?.chapterQuizId) break;
    if (!clearedIds.has(prevLevel.chapterQuizId)) break;

    s.add(levelIds[i]);
  }

  return s;
}

export function getUnlockedBonusIds(
  safeBonusLevels: BonusLevelItem[],
  clearedIds: Set<string>,
  structure: CourseStructure
) {
  const unlocked =
    new Set<string>();

  const completedLevelCount =
    structure.levels.filter(
      (level) =>
        level.chapterQuizId &&
        clearedIds.has(
          level.chapterQuizId
        )
    ).length;

  for (
    let i = 0;
    i < completedLevelCount;
    i++
  ) {
    const bonus =
      safeBonusLevels[i];

    if (!bonus) {
      break;
    }

    unlocked.add(
      bonus.id
    );
  }

  return unlocked;
}