ALTER TABLE public.user_progress
  ADD COLUMN IF NOT EXISTS avatar_preferences JSONB;

COMMENT ON COLUMN public.user_progress.avatar_preferences IS
  'Selected profile avatar source, Academy avatar preset, and last-updated timestamp.';
