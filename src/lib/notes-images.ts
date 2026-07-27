/**
 * Public Supabase Storage bucket that holds decorative/reference images used
 * inside interactive notes chapters (e.g. habitat photos, species photos).
 * Created by supabase/migrations/20260727120000_academy_notes_images_bucket.sql.
 */
export const ACADEMY_NOTES_IMAGES_BUCKET = "academy-notes-images";

/**
 * Builds a public URL for an image stored in the academy-notes-images bucket.
 * `path` is the object path inside the bucket, e.g.
 * "form2-science/chapter-1/habitat-sea.jpg".
 */
export function getNotesImageUrl(path: string): string {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  if (!supabaseUrl) return "";
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${ACADEMY_NOTES_IMAGES_BUCKET}/${path}`;
}
