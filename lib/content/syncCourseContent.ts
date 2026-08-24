import { cacheCourseImages } from "./cacheCourseImages";
import { saveCourseCache } from "./courseCache";
import type { CourseDecks } from "./loadCourseFromSupabase";
import { loadCourseFromSupabase } from "./loadCourseFromSupabase";

export async function syncCourseContent(
  courseId: string
): Promise<CourseDecks> {
  const remoteDecks =
    await loadCourseFromSupabase(courseId);

  const localDecks =
    await cacheCourseImages(
      courseId,
      remoteDecks
    );

  await saveCourseCache(
    courseId,
    localDecks
  );

  return localDecks;
}