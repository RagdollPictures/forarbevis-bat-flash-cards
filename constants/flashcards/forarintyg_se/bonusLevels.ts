export type BonusLevel = {
  id: string;
  title: string;
  route: string;
  unlockWhenClearedQuizId: string;
  iconName?: string;
};

export const bonusLevels: BonusLevel[] = [
  {
    id: "flaggor",
    title: "Flaggor",
    route: "/bonus/flaggor",
    unlockWhenClearedQuizId: "sjokortet",
    iconName: "flag",
  },
];

export function isBonusUnlocked(
  unlockWhenClearedQuizId: string,
  clearedIds: Set<string>
) {
  return clearedIds.has(unlockWhenClearedQuizId);
}