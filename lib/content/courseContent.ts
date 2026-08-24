import type { CourseDecks } from "./loadCourseFromSupabase";
import type { CourseStructure } from "./loadCourseStructureFromSupabase";

export type CourseContent = {
  decks: CourseDecks;
  structure: CourseStructure;
};