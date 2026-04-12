export type BonusLevel = {
  id: string;
  title: string;
  quizId: string;
  unlockWhenClearedQuizId: string;
};

export const bonusLevels: BonusLevel[] = [
  {
    id: "flaggor",
    title: "Flaggor",
    quizId: "flaggor_quiz",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
];
export function isBonusUnlocked(
  unlockWhenClearedQuizId: string,
  clearedIds: Set<string>
) {
  return clearedIds.has(unlockWhenClearedQuizId);
}