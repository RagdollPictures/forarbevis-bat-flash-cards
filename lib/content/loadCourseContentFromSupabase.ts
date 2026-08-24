import type { CourseContent } from "./courseContent";
import { loadCourseFromSupabase } from "./loadCourseFromSupabase";
import { loadCourseStructureFromSupabase } from "./loadCourseStructureFromSupabase";

export async function loadCourseContentFromSupabase(
  courseId: string
): Promise<CourseContent> {
  const [decks, structure] = await Promise.all([
    loadCourseFromSupabase(courseId),
    loadCourseStructureFromSupabase(courseId),
  ]);

  return {
    decks,
    structure,
  };
}