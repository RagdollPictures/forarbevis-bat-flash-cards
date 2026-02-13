import AsyncStorage from "@react-native-async-storage/async-storage";

export type QuizProgressState = "correct" | "wrong" | null;

export type SavedQuizProgress = {
  quizId: string;
  progress: QuizProgressState[];
  score: number;
  total: number;
  updatedAt: number;
};

const KEY = "quiz_progress_v1";

type ProgressMap = Record<string, SavedQuizProgress>;

export async function saveQuizProgress(payload: SavedQuizProgress) {
  const raw = await AsyncStorage.getItem(KEY);
  const map: ProgressMap = raw ? JSON.parse(raw) : {};
  map[payload.quizId] = payload;
  await AsyncStorage.setItem(KEY, JSON.stringify(map));
}

export async function getQuizProgress(quizId: string) {
  const raw = await AsyncStorage.getItem(KEY);
  const map: ProgressMap = raw ? JSON.parse(raw) : {};
  return map[quizId] ?? null;
}

export async function getAllQuizProgress() {
  const raw = await AsyncStorage.getItem(KEY);
  const map: ProgressMap = raw ? JSON.parse(raw) : {};
  return map;
}
