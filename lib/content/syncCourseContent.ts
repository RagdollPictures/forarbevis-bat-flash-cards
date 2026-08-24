import { cacheCourseImages } from "./cacheCourseImages";

import type { CourseContent } from "./courseContent";
import { saveCourseContentCache } from "./courseContentCache";
import { loadCourseContentFromSupabase } from "./loadCourseContentFromSupabase";




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