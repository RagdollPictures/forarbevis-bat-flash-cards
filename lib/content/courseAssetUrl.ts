import { supabase } from "../supabase";

const COURSE_ASSET_BUCKET =
  "course-assets";

export function getCourseAssetUrl(
  path: string | undefined
): string | undefined {
  if (!path) {
    return undefined;
  }

  const { data } =
    supabase.storage
      .from(COURSE_ASSET_BUCKET)
      .getPublicUrl(path);

  return data.publicUrl;
}