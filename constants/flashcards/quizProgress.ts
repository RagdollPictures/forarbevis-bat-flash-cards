import AsyncStorage from "@react-native-async-storage/async-storage";

import { course } from "../../content/course";
import type { StudyMode } from "../../lib/studyMode";

export type QuizProgressState =
  | "correct"
  | "wrong"
  | null;

export type SavedQuizProgress = {
  quizId: string;
  progress: QuizProgressState[];
  score: number;
  total: number;
  updatedAt: number;
  firstTryCorrect?: number;
  firstTryTotal?: number;
};

type ProgressMap = Record<
  string,
  SavedQuizProgress
>;

const GUIDED_KEY =
  `${course.id}_quiz_progress_v1`;

const FREE_KEY =
  `${course.id}_quiz_progress_free_v1`;

function getKey(
  mode: StudyMode
) {
  return mode === "free"
    ? FREE_KEY
    : GUIDED_KEY;
}

export async function saveQuizProgress(
  payload: SavedQuizProgress,
  mode: StudyMode = "guided"
) {
  const key = getKey(mode);

  const raw =
    await AsyncStorage.getItem(key);

  const map: ProgressMap =
    raw ? JSON.parse(raw) : {};

  map[payload.quizId] =
    payload;

  await AsyncStorage.setItem(
    key,
    JSON.stringify(map)
  );
}

export async function getQuizProgress(
  quizId: string,
  mode: StudyMode = "guided"
) {
  const raw =
    await AsyncStorage.getItem(
      getKey(mode)
    );

  const map: ProgressMap =
    raw ? JSON.parse(raw) : {};

  return map[quizId] ?? null;
}

export async function getAllQuizProgress(
  mode: StudyMode = "guided"
) {
  const raw =
    await AsyncStorage.getItem(
      getKey(mode)
    );

  const map: ProgressMap =
    raw ? JSON.parse(raw) : {};

  return map;
}

export async function clearAllQuizProgress(
  mode: StudyMode = "guided"
) {
  await AsyncStorage.removeItem(
    getKey(mode)
  );
}

export async function initializeFreeProgressFromGuided() {
  const existingFree =
    await AsyncStorage.getItem(
      FREE_KEY
    );

  if (existingFree !== null) {
    return;
  }

  const guided =
    await AsyncStorage.getItem(
      GUIDED_KEY
    );

  await AsyncStorage.setItem(
    FREE_KEY,
    guided ?? "{}"
  );
}