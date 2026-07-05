-- Additive column: the real per-question difficulty-based XP (10/20/30) a
-- student earned on a given quiz attempt, summed for the whole quiz. Nullable
-- because historical rows never captured this — NULL means "not tracked",
-- never fabricated as 0. Powers the Galaxy Hall of Fame's Monthly XP ranking
-- (see src/routes/-leaderboard.server.ts).
alter table public.quiz_history
  add column if not exists xp_earned integer;
