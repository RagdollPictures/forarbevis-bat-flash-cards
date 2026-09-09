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

function getKey(
  mode: StudyMode,
  courseId: string
) {
  return mode === "free"
    ? `${courseId}_quiz_progress_free_v1`
    : `${courseId}_quiz_progress_v1`;
}

export async function saveQuizProgress(
  payload: SavedQuizProgress,
  mode: StudyMode = "guided",
  courseId: string = course.id
) {
  const key = getKey(
    mode,
    courseId
  );

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
  mode: StudyMode = "guided",
  courseId: string = course.id
) {
  const raw =
    await AsyncStorage.getItem(
      getKey(
        mode,
        courseId
      )
    );

  const map: ProgressMap =
    raw ? JSON.parse(raw) : {};

  return map[quizId] ?? null;
}

export async function getAllQuizProgress(
  mode: StudyMode = "guided",
  courseId: string = course.id
) {
  const raw =
    await AsyncStorage.getItem(
      getKey(
        mode,
        courseId
      )
    );

  const map: ProgressMap =
    raw ? JSON.parse(raw) : {};

  return map;
}

export async function clearAllQuizProgress(
  mode: StudyMode = "guided",
  courseId: string = course.id
) {
  await AsyncStorage.removeItem(
    getKey(
      mode,
      courseId
    )
  );
}

export async function initializeFreeProgressFromGuided(
  courseId: string = course.id
) {
  const freeKey =
    getKey(
      "free",
      courseId
    );

  const guidedKey =
    getKey(
      "guided",
      courseId
    );

  const existingFree =
    await AsyncStorage.getItem(
      freeKey
    );

  if (existingFree !== null) {
    return;
  }

  const guided =
    await AsyncStorage.getItem(
      guidedKey
    );

  await AsyncStorage.setItem(
    freeKey,
    guided ?? "{}"
  );
}