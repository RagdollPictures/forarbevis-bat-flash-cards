export type BonusLevel = {
  id: string;
  title: string;
  quizId: string;
  unlockWhenClearedQuizId: string;
};

export const bonusLevels: BonusLevel[] = [
  {
    id: "bonus_flaggor",
    title: "Flaggor",
    quizId: "bonus_flaggor",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
   {
    id: "bonus_dagersignaler",
    title: "Dagersignaler",
    quizId: "bonus_dagersignaler",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
   {
    id: "bonus_symboler",
    title: "Symboler",
    quizId: "bonus_symboler",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
   {
    id: "bonus_lanternor",
    title: "Lanternor",
    quizId: "bonus_lanternor",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
   {
    id: "bonus_fart_distans_tid",
    title: "Fart Distans Tid",
    quizId: "bonus_fart_distans_tid",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
  {
    id: "bonus_ljudsignaler",
    title: "Fart Distans Tid",
    quizId: "bonus_ljudsignaler",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
  {
    id: "bonus_fortojningslinor",
    title: "Förtöjningslinor",
    quizId: "bonus_fortojningslinor",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
  {
    id: "bonus_strom_avdrift",
    title: "Ström & Avdrift",
    quizId: "bonus_strom_avdrift",
    unlockWhenClearedQuizId: "sjokortet_quiz",
  },
];

export function isBonusUnlocked(
  unlockWhenClearedQuizId: string,
  clearedIds: Set<string>
) {
  return clearedIds.has(unlockWhenClearedQuizId);
}