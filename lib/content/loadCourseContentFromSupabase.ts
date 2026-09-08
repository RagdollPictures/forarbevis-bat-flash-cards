import type { CourseContent } from "./courseContent";
import { loadCourseFromSupabase } from "./loadCourseFromSupabase";
import { loadCourseStructureFromSupabase } from "./loadCourseStructureFromSupabase";
import { loadSharedUiTextFromSupabase } from "./loadSharedUiTextFromSupabase";

export async function loadCourseContentFromSupabase(
  courseId: string
): Promise<CourseContent> {
  const [
    decks,
    structure,
    sharedUiText,
  ] = await Promise.all([
    loadCourseFromSupabase(courseId),
    loadCourseStructureFromSupabase(courseId),
    loadSharedUiTextFromSupabase(),
  ]);

  return {
    decks,
    structure,
    sharedUiText,
  };
}