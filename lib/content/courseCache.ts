import AsyncStorage from "@react-native-async-storage/async-storage";

import type { CourseDecks } from "./loadCourseFromSupabase";

function getCacheKey(courseId: string) {
  return `course-content:${courseId}`;
}

export async function saveCourseCache(
  courseId: string,
  decks: CourseDecks
): Promise<void> {
  await AsyncStorage.setItem(
    getCacheKey(courseId),
    JSON.stringify(decks)
  );
}

export async function loadCourseCache(
  courseId: string
): Promise<CourseDecks | null> {
  const cached = await AsyncStorage.getItem(
    getCacheKey(courseId)
  );

  if (!cached) {
    return null;
  }

  try {
    return JSON.parse(cached) as CourseDecks;
  } catch {
    return null;
  }
}

export async function clearCourseCache(
  courseId: string
): Promise<void> {
  await AsyncStorage.removeItem(
    getCacheKey(courseId)
  );
}