import AsyncStorage from "@react-native-async-storage/async-storage";

import { course } from "../../../content/course";

export const UNLOCK_PERCENT = 100;

function getClearedKey(
  courseId: string
) {
  return `${courseId}_cleared_quiz_ids_v1`;
}

export async function loadClearedSet(
  courseId: string = course.id
): Promise<Set<string>> {
  const raw =
    await AsyncStorage.getItem(
      getClearedKey(courseId)
    );

  if (!raw) {
    return new Set();
  }

  try {
    const arr = JSON.parse(raw);

    if (!Array.isArray(arr)) {
      return new Set();
    }

    return new Set(
      arr.filter(
        (x) =>
          typeof x === "string"
      )
    );
  } catch {
    return new Set();
  }
}

export async function saveClearedSet(
  set: Set<string>,
  courseId: string = course.id
) {
  await AsyncStorage.setItem(
    getClearedKey(courseId),
    JSON.stringify(
      Array.from(set)
    )
  );
}

export async function addClearedQuizId(
  quizId: string,
  courseId: string = course.id
) {
  const current =
    await loadClearedSet(
      courseId
    );

  current.add(quizId);

  await saveClearedSet(
    current,
    courseId
  );
}

export async function clearClearedSet(
  courseId: string = course.id
) {
  await AsyncStorage.removeItem(
    getClearedKey(courseId)
  );
}