import type { CourseDecks } from "./loadCourseFromSupabase";
import type { CourseStructure } from "./loadCourseStructureFromSupabase";
import type { SharedUiText } from "./loadSharedUiTextFromSupabase";

export type CourseContent = {
  decks: CourseDecks;
  structure: CourseStructure;
  sharedUiText: SharedUiText;
};