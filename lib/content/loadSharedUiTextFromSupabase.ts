import { supabase } from "../supabase";

export type SharedUiText = Record<
  string,
  string
>;

type SharedUiTextRow = {
  key: string;
  sv: string;
};

export async function loadSharedUiTextFromSupabase(): Promise<SharedUiText> {
  const { data, error } =
    await supabase
      .from("shared_ui_text")
      .select("key, sv");

  if (error) {
    throw error;
  }

  const text: SharedUiText = {};

  for (
    const row of
    (data ?? []) as SharedUiTextRow[]
  ) {
    text[row.key] = row.sv;
  }

  return text;
}