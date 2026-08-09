-- Public, read-only bucket for images embedded in interactive notes chapters
-- (habitat photos, species photos, etc.). Uploaded out-of-band by
-- scripts/upload-notes-images.mjs using the service role key; students only
-- ever read via the public CDN URL (public = true), so no anon SELECT
-- policy on storage.objects is required.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'academy-notes-images',
  'academy-notes-images',
  true,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];
