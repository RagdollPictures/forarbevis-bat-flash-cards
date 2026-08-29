import type { FlashCard } from "../../constants/flashcards/types";
import { supabase } from "../supabase";

export type QuestionRow = {
  id: string;

  question: string | null;
  question_quiz: string | null;
  answer: string | null;

  option_1: string | null;
  option_2: string | null;
  option_3: string | null;
  option_4: string | null;
  option_5: string | null;
  option_6: string | null;

  correct_option_index: number | null;

  image_path: string | null;
  answer_image_path: string | null;

  option_image_1_path: string | null;
  option_image_2_path: string | null;
  option_image_3_path: string | null;
  option_image_4_path: string | null;
  option_image_5_path: string | null;
  option_image_6_path: string | null;

  text_title: string | null;
  text_info: string | null;
  content_variant: string | null;
  content_variant_prompt: string | null;
};

function getImageUrl(
  path: string | null
): string | undefined {
  if (!path) {
    return undefined;
  }

  const { data } = supabase.storage
    .from("question-images")
    .getPublicUrl(path);

  return data.publicUrl;
}

export function rowToFlashCard(
  row: QuestionRow
): FlashCard {
  const optionSlots = [
    {
      text: row.option_1,
      imagePath: row.option_image_1_path,
    },
    {
      text: row.option_2,
      imagePath: row.option_image_2_path,
    },
    {
      text: row.option_3,
      imagePath: row.option_image_3_path,
    },
    {
      text: row.option_4,
      imagePath: row.option_image_4_path,
    },
    {
      text: row.option_5,
      imagePath: row.option_image_5_path,
    },
    {
      text: row.option_6,
      imagePath: row.option_image_6_path,
    },
  ];

  // Ett alternativ är giltigt om det har
  // antingen text ELLER en bild.
  //
  // Detta behövs t.ex. för bonus_dagersignaler,
  // där options är tomma strängar men varje
  // alternativ har en bild.
  const activeOptionSlots =
    optionSlots.filter(
      ({ text, imagePath }) =>
        text !== null ||
        imagePath !== null
    );

  const options =
    activeOptionSlots.map(
      ({ text }) => text ?? ""
    );

  const optionImageUrls =
    activeOptionSlots.map(
      ({ imagePath }) =>
        getImageUrl(imagePath)
    );

  return {
    id: row.id,

    question:
      row.question ?? undefined,

    questionQuiz:
      row.question_quiz ?? undefined,

    answer:
      row.answer ?? undefined,

    options:
      options.length > 0
        ? options
        : undefined,

    correctOptionIndex:
      row.correct_option_index ??
      undefined,

    imageUrl:
      getImageUrl(row.image_path),

    answerImageUrl:
      getImageUrl(
        row.answer_image_path
      ),

    optionImageUrls:
      optionImageUrls.some(Boolean)
        ? optionImageUrls
        : undefined,

    textTitle:
      row.text_title ?? undefined,

    textInfo:
      row.text_info ?? undefined,

      contentVariant:
  row.content_variant ?? undefined,

  contentVariantPrompt:
  row.content_variant_prompt ?? undefined,
  };
}

export async function loadDeckFromSupabase(
  courseId: string,
  deckId: string
): Promise<FlashCard[]> {
  const { data, error } =
    await supabase
      .from("questions")
      .select("*")
      .eq("course_id", courseId)
      .eq("deck_id", deckId)
      .eq("active", true)
      .order("sort_order", {
        ascending: true,
      });

  if (error) {
    throw error;
  }

  return (
    data as QuestionRow[]
  ).map(rowToFlashCard);
}