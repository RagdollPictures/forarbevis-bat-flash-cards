import type { CourseStructure } from "./loadCourseStructureFromSupabase";

export type CourseQuiz = {
  id: string;
  title: string;
  subtitle?: string;
  sourceId: string;
  courseId: string;
  deckId?: string;
  chapterId?: string;
};

export function getQuizzesForChapterFromStructure({
  structure,
  chapterId,
  sourceId,
  courseId,
}: {
  structure: CourseStructure;
  chapterId: string;
  sourceId: string;
  courseId: string;
}): CourseQuiz[] {
  if (chapterId === "bonus") {
    return structure.bonusLevels.map((bonus) => ({
      id: bonus.id,
      title: bonus.title,
      sourceId,
      courseId,
      deckId: bonus.deckId,
    }));
  }

  const level = structure.levels.find(
    (item) => item.chapterId === chapterId
  );

  if (!level) return [];

  const units = structure.units
    .filter((unit) => unit.levelId === level.id)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  const quizzes: CourseQuiz[] = units.map((unit) => ({
    id: unit.id,
    title: unit.title,
    subtitle: level.label,
    sourceId,
    courseId,
    deckId: unit.deckId,
  }));

  if (level.chapterQuizId) {
    quizzes.push({
      id: level.chapterQuizId,
      title: level.chapterQuizTitle,
      subtitle: level.label,
      sourceId,
      courseId,
      chapterId: level.chapterId,
    });
  }

  return quizzes;
}

export function getDeckIdsForChapterFromStructure({
  structure,
  chapterId,
}: {
  structure: CourseStructure;
  chapterId: string;
}): string[] {
  const level = structure.levels.find(
    (item) => item.chapterId === chapterId
  );

  if (!level) return [];

  return structure.units
    .filter((unit) => unit.levelId === level.id)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((unit) => unit.deckId);
}

export function getQuizByIdFromStructure({
  structure,
  quizId,
  sourceId,
  courseId,
}: {
  structure: CourseStructure;
  quizId: string;
  sourceId: string;
  courseId: string;
}): CourseQuiz | null {
  const chapterLevel = structure.levels.find(
    (level) => level.chapterQuizId === quizId
  );

  if (chapterLevel?.chapterQuizId) {
    return {
      id: chapterLevel.chapterQuizId,
      title: chapterLevel.chapterQuizTitle,
      subtitle: chapterLevel.label,
      sourceId,
      courseId,
      chapterId: chapterLevel.chapterId,
    };
  }

  const unit = structure.units.find(
    (item) => item.id === quizId
  );

  if (unit) {
    const level = structure.levels.find(
      (item) => item.id === unit.levelId
    );

    return {
      id: unit.id,
      title: unit.title,
      subtitle: level?.label,
      sourceId,
      courseId,
      deckId: unit.deckId,
    };
  }

  const bonus = structure.bonusLevels.find(
    (item) => item.id === quizId
  );

  if (bonus) {
    return {
      id: bonus.id,
      title: bonus.title,
      sourceId,
      courseId,
      deckId: bonus.deckId,
    };
  }

  return null;
}