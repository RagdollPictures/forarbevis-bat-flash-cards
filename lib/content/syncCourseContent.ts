import { cacheCourseImages } from "./cacheCourseImages";
import { saveCourseCache } from "./courseCache";
import type { CourseContent } from "./courseContent";
import { saveCourseContentCache } from "./courseContentCache";
import { loadCourseContentFromSupabase } from "./loadCourseContentFromSupabase";
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

export async function syncFullCourseContent(
  courseId: string
): Promise<CourseContent> {
  const remoteContent =
    await loadCourseContentFromSupabase(courseId);

  const localDecks =
    await cacheCourseImages(
      courseId,
      remoteContent.decks
    );

  const localContent: CourseContent = {
    ...remoteContent,
    decks: localDecks,
  };

  await saveCourseContentCache(
    courseId,
    localContent
  );

  return localContent;
}