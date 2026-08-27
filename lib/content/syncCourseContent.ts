import { cacheCourseImages } from "./cacheCourseImages";
import { cacheCourseStructureAssets } from "./cacheCourseStructureAssets";

import type { CourseContent } from "./courseContent";
import { saveCourseContentCache } from "./courseContentCache";
import { loadCourseContentFromSupabase } from "./loadCourseContentFromSupabase";

export async function syncFullCourseContent(
  courseId: string
): Promise<CourseContent> {
  const remoteContent =
    await loadCourseContentFromSupabase(
      courseId
    );

  const [
    localDecks,
    localStructure,
  ] = await Promise.all([
    cacheCourseImages(
      courseId,
      remoteContent.decks
    ),

    cacheCourseStructureAssets(
      remoteContent.structure
    ),
  ]);

  const localContent: CourseContent = {
    ...remoteContent,
    decks: localDecks,
    structure: localStructure,
  };

  await saveCourseContentCache(
    courseId,
    localContent
  );

  return localContent;
}