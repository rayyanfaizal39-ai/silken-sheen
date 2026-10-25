-- REVIEW ONLY. Do not apply to production or any remote project.
-- Apply AFTER 20261018160000_nova_companion_cards.sql, which creates the bucket.
--
-- Staging already limits the private nova-artwork bucket to 10 MB and to PNG,
-- JPEG and WebP. This records those limits so a new project matches staging.
-- It does not enable image generation.
begin;

update storage.buckets
set file_size_limit = 10485760,
    allowed_mime_types = array['image/png', 'image/jpeg', 'image/webp']
where id = 'nova-artwork';

commit;
