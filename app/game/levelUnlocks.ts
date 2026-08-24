import type { CourseStructure } from "../../lib/content/loadCourseStructureFromSupabase";

import type {
  BonusLevelItem,
  QuizItem
} from "./levelScreenTypes";

export function getUnlockedQuizIds(
  quizzes: QuizItem[],
  clearedIds: Set<string>
) {
  const s = new Set<string>();

  if (quizzes.length === 0) return s;

  s.add(quizzes[0].id);

  for (let i = 0; i < quizzes.length - 1; i++) {
    const currentId = quizzes[i].id;
    const nextId = quizzes[i + 1].id;

    if (!clearedIds.has(currentId)) break;
    s.add(nextId);
  }

  return s;
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
  clearedIds: Set<string>
) {
  const s = new Set<string>();

  for (const bonus of safeBonusLevels) {
   if (clearedIds.has(bonus.unlockWhenClearedQuizId)) {
  s.add(bonus.id);
}
  }

  return s;
}