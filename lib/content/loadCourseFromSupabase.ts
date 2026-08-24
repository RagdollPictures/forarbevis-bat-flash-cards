import type { FlashCard } from "../../constants/flashcards/types";
import { supabase } from "../supabase";
import {
    type QuestionRow,
    rowToFlashCard,
} from "./loadDeckFromSupabase";

type CourseQuestionRow = QuestionRow & {
  deck_id: string;
};

export type CourseDecks = Record<
  string,
  FlashCard[]
>;

const PAGE_SIZE = 500;

export async function loadCourseFromSupabase(
  courseId: string
): Promise<CourseDecks> {
  const rows: CourseQuestionRow[] =
    [];

  let from = 0;

  while (true) {
    const to =
      from + PAGE_SIZE - 1;

    const { data, error } =
      await supabase
        .from("questions")
        .select("*")
        .eq(
          "course_id",
          courseId
        )
        .eq("active", true)
        .order("deck_id", {
          ascending: true,
        })
        .order("sort_order", {
          ascending: true,
        })
        .order("id", {
        ascending: true,
        })
        .range(from, to);

    if (error) {
      throw error;
    }

    const page =
      (data ??
        []) as CourseQuestionRow[];

    rows.push(...page);

    if (
      page.length <
      PAGE_SIZE
    ) {
      break;
    }

    from += PAGE_SIZE;
  }

  const decks: CourseDecks =
    {};

  for (const row of rows) {
    if (!decks[row.deck_id]) {
      decks[row.deck_id] =
        [];
    }

    decks[row.deck_id].push(
      rowToFlashCard(row)
    );
  }

  return decks;
}