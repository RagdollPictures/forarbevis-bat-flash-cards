import AsyncStorage from "@react-native-async-storage/async-storage";

import type { CourseContent } from "./courseContent";

function getCacheKey(courseId: string) {
  return `course-content-v2:${courseId}`;
}

export async function saveCourseContentCache(
  courseId: string,
  content: CourseContent
): Promise<void> {
  await AsyncStorage.setItem(
    getCacheKey(courseId),
    JSON.stringify(content)
  );
}

export async function loadCourseContentCache(
  courseId: string
): Promise<CourseContent | null> {
  const cached = await AsyncStorage.getItem(
    getCacheKey(courseId)
  );

  if (!cached) return null;

  try {
    return JSON.parse(cached) as CourseContent;
  } catch {
    return null;
  }
}

export async function clearCourseContentCache(
  courseId: string
): Promise<void> {
  await AsyncStorage.removeItem(getCacheKey(courseId));
}