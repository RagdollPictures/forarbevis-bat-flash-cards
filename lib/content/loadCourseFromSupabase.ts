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

async function loadQuestionRows(
  tableName:
    | "questions"
    | "exam_questions",
  courseId: string
): Promise<CourseQuestionRow[]> {
  const rows: CourseQuestionRow[] =
    [];

  let from = 0;

  while (true) {
    const to =
      from + PAGE_SIZE - 1;

    const { data, error } =
      await supabase
        .from(tableName)
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

  return rows;
}

export async function loadCourseFromSupabase(
  courseId: string
): Promise<CourseDecks> {
  const [
    questions,
    examQuestions,
  ] = await Promise.all([
    loadQuestionRows(
      "questions",
      courseId
    ),
    loadQuestionRows(
      "exam_questions",
      courseId
    ),
  ]);

  const rows = [
    ...questions,
    ...examQuestions,
  ];

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