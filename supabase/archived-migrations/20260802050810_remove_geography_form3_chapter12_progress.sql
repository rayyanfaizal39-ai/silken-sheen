-- Remove only progress that can be unambiguously attributed to
-- Geography Form 3 Chapter 12. Generic chapter activity and quiz history do
-- not store the form, so they are intentionally left untouched to protect
-- Geography Form 1 Chapter 12 data.

DELETE FROM public.notes_reading_progress
WHERE subject = 'geography'
  AND form = 'Form 3'
  AND chapter = 'Chapter 12';

UPDATE public.user_progress
SET
  favorites = ARRAY(
    SELECT favorite_id
    FROM unnest(favorites) AS favorite(favorite_id)
    WHERE favorite_id !~ '^geo-f3-c12-f[0-9]+$'
  ),
  card_mastery = COALESCE(
    (
      SELECT jsonb_object_agg(entry.key, entry.value)
      FROM jsonb_each(card_mastery) AS entry
      WHERE entry.key !~ '^geo-f3-c12-f[0-9]+$'
    ),
    '{}'::jsonb
  ),
  last_visited = CASE
    WHEN last_visited ->> 'subjectId' = 'geography'
      AND last_visited ->> 'form' = 'Form 3'
      AND last_visited ->> 'chapterKey' = 'Chapter 12'
    THEN NULL
    ELSE last_visited
  END
WHERE
  EXISTS (
    SELECT 1
    FROM unnest(favorites) AS favorite(favorite_id)
    WHERE favorite_id ~ '^geo-f3-c12-f[0-9]+$'
  )
  OR EXISTS (
    SELECT 1
    FROM jsonb_object_keys(card_mastery) AS mastery(mastery_id)
    WHERE mastery_id ~ '^geo-f3-c12-f[0-9]+$'
  )
  OR (
    last_visited ->> 'subjectId' = 'geography'
    AND last_visited ->> 'form' = 'Form 3'
    AND last_visited ->> 'chapterKey' = 'Chapter 12'
  );
