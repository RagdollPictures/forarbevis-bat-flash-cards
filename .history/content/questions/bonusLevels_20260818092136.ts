export type BonusLevel = {
  id: string;
  title: string;
  unlockWhenClearedQuizId: string;
};

export const bonusLevels: BonusLevel[] = [
  {
    id: "bonus_flaggor",
    title: "Flaggor",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
  {
    id: "bonus_dagersignaler",
    title: "Dagersignaler",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
   {
    id: "bonus_sjomarken",
    title: "Sjömärken",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
  {
    id: "bonus_symboler",
    title: "Symboler",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
  {
    id: "bonus_lanternor",
    title: "Lanternor",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
  {
    id: "bonus_fart_distans_tid",
    title: "Fart, Distans & Tid",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
  {
    id: "bonus_ljudsignaler",
    title: "Ljudsignaler",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
  {
    id: "bonus_fortojningslinor",
    title: "Förtöjningslinor",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
  {
    id: "bonus_kursberakning",
    title: "Kursberäkning",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
  {
    id: "bonus_navigator",
    title: "Navigator",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
  {
    id: "bonus_kardinal",
    title: "Navigator",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
];

export function isBonusUnlocked(
  unlockWhenClearedQuizId: string,
  clearedIds: Set<string>
) {
  return clearedIds.has(unlockWhenClearedQuizId);
}