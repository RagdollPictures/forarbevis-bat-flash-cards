import { getQuizzesForChapter } from "../../constants/flashcards";
import { isBonusUnlocked } from "../../constants/flashcards/bonusLevels";
import type {
    BonusLevelItem,
    MenuLevel,
    QuizItem,
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
  levelIds: string[],
  levelMap: Record<string, MenuLevel>,
  clearedIds: Set<string>
) {
  const s = new Set<string>();

  if (levelIds.length === 0) return s;

  s.add(levelIds[0]);

  for (let i = 1; i < levelIds.length; i++) {
    const prevLevelId = levelIds[i - 1];
    const prevLevel = levelMap[prevLevelId];

    if (!prevLevel) break;

    const prevQuizzes = getQuizzesForChapter(
      "forarintyg",
      prevLevel.chapterId
    ) as QuizItem[];

    const finalQuiz = prevQuizzes[prevQuizzes.length - 1];

    if (!finalQuiz) break;
    if (!clearedIds.has(finalQuiz.id)) break;

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
    if (isBonusUnlocked(bonus.unlockWhenClearedQuizId, clearedIds)) {
      s.add(bonus.id);
    }
  }

  return s;
}