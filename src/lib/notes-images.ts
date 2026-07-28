/**
 * Public Supabase Storage bucket that holds decorative/reference images used
 * inside interactive notes chapters (e.g. habitat photos, species photos).
 * Created by supabase/migrations/20260727120000_academy_notes_images_bucket.sql.
 */
export const ACADEMY_NOTES_IMAGES_BUCKET = "academy-notes-images";

/**
 * Resolves an image reference used by notes content to a renderable URL.
 * `path` is either:
 *  - an object path inside the academy-notes-images bucket, e.g.
 *    "form2-science/chapter-1/habitat-sea.jpg" (resolved against
 *    VITE_SUPABASE_URL), or
 *  - an already-resolved URL (a bundled `src/assets` import, which Vite
 *    turns into a URL string at build time) — returned as-is.
 */
export function getNotesImageUrl(path: string): string {
  if (!path) return "";
  if (path.startsWith("/") || path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
    return path;
  }
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
  if (!supabaseUrl) return "";
  return `${supabaseUrl.replace(/\/$/, "")}/storage/v1/object/public/${ACADEMY_NOTES_IMAGES_BUCKET}/${path}`;
}
