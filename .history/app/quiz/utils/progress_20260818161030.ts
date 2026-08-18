// app/(tabs)/quiz-menu/utils/progress.ts
import { colorSchemeQuiz } from "@/constants/colors";
import type { SavedQuizProgress } from "../../../constants/flashcards/quizProgress";

export function getProgressColor(percent: number) {
  if (percent <= 30) return colorSchemeQuiz.green;
  if (percent >= 100) return colorSchemeQuiz.green;
  return colorSchemeQuiz.green;
}

export function calcPercent(saved: SavedQuizProgress | null) {
  if (!saved) return 0;
  const total = Math.max(1, saved.progress.length);
  const correct = saved.progress.filter((p) => p === "correct").length;
  return Math.round((correct / total) * 100);
}
