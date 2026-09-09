import { supabase } from "../supabase";

export type AppCourse = {
  id: string;
  appId: string;
  title: string;
  subtitle: string | null;
  imagePath: string | null;
  sortOrder: number;
};

type CourseRow = {
  id: string;
  app_id: string;
  title: string;
  subtitle: string | null;
  image_path: string | null;
  sort_order: number;
};

export async function loadCoursesFromSupabase(
  appId: string
): Promise<AppCourse[]> {
  const { data, error } =
    await supabase
      .from("courses")
      .select(
        `
          id,
          app_id,
          title,
          subtitle,
          image_path,
          sort_order
        `
      )
      .eq("app_id", appId)
      .eq("active", true)
      .order("sort_order", {
        ascending: true,
      });

  if (error) {
    throw new Error(
      `Kunde inte läsa kurser: ${error.message}`
    );
  }

  return (
    (data ?? []) as CourseRow[]
  ).map((row) => ({
    id: row.id,
    appId: row.app_id,
    title: row.title,
    subtitle: row.subtitle,
    imagePath: row.image_path,
    sortOrder: row.sort_order,
  }));
}