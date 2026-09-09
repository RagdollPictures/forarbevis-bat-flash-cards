import { supabase } from "../supabase";

export type FinalExam = {
  id: string;
  courseId: string;
  title: string;
  subtitle: string | null;
  deckId: string;
  sortOrder: number;
  timeLimitMinutes: number | null;
};

type FinalExamRow = {
  id: string;
  course_id: string;
  title: string;
  subtitle: string | null;
  deck_id: string;
  sort_order: number;
  time_limit_minutes: number | null;
};

export async function loadFinalExamsFromSupabase(
  courseId: string
): Promise<FinalExam[]> {
  const { data, error } =
    await supabase
      .from("final_exams")
      .select(
        `
          id,
          course_id,
          title,
          subtitle,
          deck_id,
          sort_order,
          time_limit_minutes
        `
      )
      .eq("course_id", courseId)
      .eq("active", true)
      .order("sort_order", {
        ascending: true,
      });

  if (error) {
    throw new Error(
      `Kunde inte läsa slutprov: ${error.message}`
    );
  }

  return (
    (data ?? []) as FinalExamRow[]
  ).map((row) => ({
    id: row.id,
    courseId: row.course_id,
    title: row.title,
    subtitle: row.subtitle,
    deckId: row.deck_id,
    sortOrder: row.sort_order,
    timeLimitMinutes:
  row.time_limit_minutes,
    
  }));
}