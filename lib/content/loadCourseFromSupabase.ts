import type { FlashCard } from "../../constants/flashcards/types";
import { supabase } from "../supabase";
import {
    type QuestionRow,
    rowToFlashCard,
} from "./loadDeckFromSupabase";

type CourseQuestionRow = QuestionRow & {
  deck_id: string;
};

export type CourseDecks = Record<string, FlashCard[]>;

export async function loadCourseFromSupabase(
  courseId: string
): Promise<CourseDecks> {
  const { data, error } = await supabase
    .from("questions")
    .select("*")
    .eq("course_id", courseId)
    .eq("active", true)
    .order("deck_id", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    throw error;
  }

  const decks: CourseDecks = {};

  for (const row of data as CourseQuestionRow[]) {
    if (!decks[row.deck_id]) {
      decks[row.deck_id] = [];
    }

    decks[row.deck_id].push(rowToFlashCard(row));
  }

  return decks;
}