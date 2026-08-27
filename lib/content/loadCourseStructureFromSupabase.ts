import { supabase } from "../supabase";

export type CourseLevel = {
  id: string;
  chapterId: string;
  titleShort: string;
  label: string;
  sortOrder: number;

  chapterQuizId?: string;
  chapterQuizTitle: string;

  iconPath?: string;
  iconOffPath?: string;
  levelIconPath?: string;

  iconSvg?: string;
  iconOffSvg?: string;
  levelIconSvg?: string;
};

export type CourseUnit = {
  id: string;
  levelId: string;
  title: string;
  deckId: string;
  sortOrder: number;
};

export type CourseBonusLevel = {
  id: string;
  title: string;
  deckId: string;
  unlockWhenClearedQuizId?: string;
  sortOrder: number;

  iconPath?: string;
  iconOffPath?: string;

  iconSvg?: string;
  iconOffSvg?: string;
};

export type CourseStructure = {
  levels: CourseLevel[];
  units: CourseUnit[];
  bonusLevels: CourseBonusLevel[];
};

export async function loadCourseStructureFromSupabase(
  courseId: string
): Promise<CourseStructure> {
  const [
    levelsResult,
    unitsResult,
    bonusResult,
  ] = await Promise.all([
    supabase
      .from("levels")
      .select("*")
      .eq("course_id", courseId)
      .eq("active", true)
      .order("sort_order"),

    supabase
      .from("units")
      .select("*")
      .eq("course_id", courseId)
      .eq("active", true)
      .order("sort_order"),

    supabase
      .from("bonus_levels")
      .select("*")
      .eq("course_id", courseId)
      .eq("active", true)
      .order("sort_order"),
  ]);

  if (levelsResult.error) {
    throw levelsResult.error;
  }

  if (unitsResult.error) {
    throw unitsResult.error;
  }

  if (bonusResult.error) {
    throw bonusResult.error;
  }

  const levels: CourseLevel[] =
    levelsResult.data.map((row) => ({
      id: row.id,

      chapterId:
        row.chapter_id,

      titleShort:
        row.title_short,

      label:
        row.label,

      sortOrder:
        row.sort_order,

      chapterQuizId:
        row.chapter_quiz_id ??
        undefined,

      chapterQuizTitle:
        row.chapter_quiz_title,

      iconPath:
        row.icon_path ??
        undefined,

      iconOffPath:
        row.icon_off_path ??
        undefined,

      levelIconPath:
        row.level_icon_path ??
        undefined,
    }));

  const units: CourseUnit[] =
    unitsResult.data.map((row) => ({
      id: row.id,

      levelId:
        row.level_id,

      title:
        row.title,

      deckId:
        row.deck_id,

      sortOrder:
        row.sort_order,
    }));

  const bonusLevels: CourseBonusLevel[] =
    bonusResult.data.map((row) => ({
      id: row.id,

      title:
        row.title,

      deckId:
        row.deck_id,

      unlockWhenClearedQuizId:
        row.unlock_when_cleared_quiz_id ??
        undefined,

      sortOrder:
        row.sort_order,

      iconPath:
        row.icon_path ??
        undefined,

      iconOffPath:
        row.icon_off_path ??
        undefined,
    }));

  return {
    levels,
    units,
    bonusLevels,
  };
}