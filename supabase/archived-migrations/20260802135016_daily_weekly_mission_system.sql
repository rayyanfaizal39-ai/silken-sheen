-- Daily + weekly missions use immutable, retry-safe activity events and a
-- separate reward ledger. The unique keys are the final guard against two
-- tabs/devices awarding the same period more than once.

CREATE TABLE public.mission_activity_events (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_key TEXT NOT NULL CHECK (char_length(event_key) BETWEEN 1 AND 240),
  activity_type TEXT NOT NULL CHECK (activity_type IN ('lesson', 'quiz', 'flashcard')),
  local_date_key DATE NOT NULL,
  week_key DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, event_key)
);

CREATE INDEX mission_activity_events_daily_idx
  ON public.mission_activity_events (user_id, local_date_key, activity_type);
CREATE INDEX mission_activity_events_weekly_idx
  ON public.mission_activity_events (user_id, week_key, activity_type);

ALTER TABLE public.mission_activity_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own mission activity"
  ON public.mission_activity_events FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

REVOKE ALL ON TABLE public.mission_activity_events FROM anon;
REVOKE INSERT, UPDATE, DELETE ON TABLE public.mission_activity_events FROM authenticated;
GRANT SELECT ON TABLE public.mission_activity_events TO authenticated;

CREATE TABLE public.mission_reward_claims (
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  period_type TEXT NOT NULL CHECK (period_type IN ('daily', 'weekly')),
  period_key DATE NOT NULL,
  reward_xp INTEGER NOT NULL CHECK (reward_xp IN (500, 1500)),
  awarded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  PRIMARY KEY (user_id, period_type, period_key)
);

ALTER TABLE public.mission_reward_claims ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own mission rewards"
  ON public.mission_reward_claims FOR SELECT TO authenticated
  USING ((SELECT auth.uid()) = user_id);

REVOKE ALL ON TABLE public.mission_reward_claims FROM anon;
REVOKE INSERT, UPDATE, DELETE ON TABLE public.mission_reward_claims FROM authenticated;
GRANT SELECT ON TABLE public.mission_reward_claims TO authenticated;

-- Mirrored by missionSeed() in src/lib/mission-system.ts. Keeping the
-- algorithm intentionally small makes the selected set identical in SSR,
-- browsers, retries, and PostgreSQL without relying on Math.random().
CREATE OR REPLACE FUNCTION public.mission_seed(
  p_user_id UUID,
  p_period_key DATE,
  p_salt TEXT
)
RETURNS BIGINT
LANGUAGE sql
IMMUTABLE
SET search_path = ''
AS $$
  SELECT COALESCE(SUM(ascii(substr(seed.value, chars.idx, 1)) * chars.idx), 0)::BIGINT
  FROM (
    SELECT p_user_id::TEXT || ':' || p_period_key::TEXT || ':1:' || p_salt AS value
  ) seed,
  LATERAL generate_series(1, char_length(seed.value)) AS chars(idx);
$$;

REVOKE ALL ON FUNCTION public.mission_seed(UUID, DATE, TEXT) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.get_mission_state(p_local_date_key DATE)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_user_id UUID := (SELECT auth.uid());
  current_week_key DATE;
  lesson_id TEXT;
  quiz_id TEXT;
  flashcard_id TEXT;
  daily_ids TEXT[];
  weekly_id TEXT;
  daily_lessons INTEGER;
  daily_quizzes INTEGER;
  daily_flashcards INTEGER;
  weekly_lessons INTEGER;
  weekly_quizzes INTEGER;
  weekly_flashcards INTEGER;
  daily_complete BOOLEAN;
  weekly_complete BOOLEAN;
  daily_claimed BOOLEAN;
  weekly_claimed BOOLEAN;
  daily_award INTEGER;
  weekly_award INTEGER;
  awarded_xp INTEGER := 0;
  authoritative_xp INTEGER;
  order_variant INTEGER;
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  IF p_local_date_key IS NULL OR abs(p_local_date_key - CURRENT_DATE) > 1 THEN
    RAISE EXCEPTION 'Invalid local mission date';
  END IF;

  current_week_key := p_local_date_key - (extract(isodow FROM p_local_date_key)::INTEGER - 1);
  lesson_id := CASE WHEN public.mission_seed(current_user_id, p_local_date_key, 'lesson') % 2 = 0
    THEN 'lesson_1' ELSE 'lesson_2' END;
  quiz_id := CASE WHEN public.mission_seed(current_user_id, p_local_date_key, 'quiz') % 2 = 0
    THEN 'quiz_1' ELSE 'quiz_2' END;
  flashcard_id := CASE WHEN public.mission_seed(current_user_id, p_local_date_key, 'flashcard') % 2 = 0
    THEN 'flashcard_5' ELSE 'flashcard_8' END;
  order_variant := public.mission_seed(current_user_id, p_local_date_key, 'order') % 6;
  daily_ids := CASE order_variant
    WHEN 0 THEN ARRAY[lesson_id, quiz_id, flashcard_id]
    WHEN 1 THEN ARRAY[lesson_id, flashcard_id, quiz_id]
    WHEN 2 THEN ARRAY[quiz_id, lesson_id, flashcard_id]
    WHEN 3 THEN ARRAY[quiz_id, flashcard_id, lesson_id]
    WHEN 4 THEN ARRAY[flashcard_id, lesson_id, quiz_id]
    ELSE ARRAY[flashcard_id, quiz_id, lesson_id]
  END;
  weekly_id := (ARRAY['weekly_balanced', 'weekly_scholar', 'weekly_challenger'])[
    (public.mission_seed(current_user_id, current_week_key, 'weekly') % 3) + 1
  ];

  SELECT
    count(*) FILTER (WHERE activity_type = 'lesson'),
    count(*) FILTER (WHERE activity_type = 'quiz'),
    count(*) FILTER (WHERE activity_type = 'flashcard')
  INTO daily_lessons, daily_quizzes, daily_flashcards
  FROM public.mission_activity_events
  WHERE user_id = current_user_id AND local_date_key = p_local_date_key;

  SELECT
    count(*) FILTER (WHERE activity_type = 'lesson'),
    count(*) FILTER (WHERE activity_type = 'quiz'),
    count(*) FILTER (WHERE activity_type = 'flashcard')
  INTO weekly_lessons, weekly_quizzes, weekly_flashcards
  FROM public.mission_activity_events
  WHERE user_id = current_user_id AND week_key = current_week_key;

  daily_complete :=
    daily_lessons >= CASE lesson_id WHEN 'lesson_1' THEN 1 ELSE 2 END AND
    daily_quizzes >= CASE quiz_id WHEN 'quiz_1' THEN 1 ELSE 2 END AND
    daily_flashcards >= CASE flashcard_id WHEN 'flashcard_5' THEN 5 ELSE 8 END;

  weekly_complete := CASE weekly_id
    WHEN 'weekly_balanced' THEN weekly_lessons >= 5 AND weekly_quizzes >= 3 AND weekly_flashcards >= 20
    WHEN 'weekly_scholar' THEN weekly_lessons >= 7 AND weekly_quizzes >= 2 AND weekly_flashcards >= 15
    ELSE weekly_lessons >= 3 AND weekly_quizzes >= 5 AND weekly_flashcards >= 15
  END;

  IF daily_complete THEN
    INSERT INTO public.mission_reward_claims (user_id, period_type, period_key, reward_xp)
    VALUES (current_user_id, 'daily', p_local_date_key, 500)
    ON CONFLICT (user_id, period_type, period_key) DO NOTHING
    RETURNING reward_xp INTO daily_award;
  END IF;

  IF weekly_complete THEN
    INSERT INTO public.mission_reward_claims (user_id, period_type, period_key, reward_xp)
    VALUES (current_user_id, 'weekly', current_week_key, 1500)
    ON CONFLICT (user_id, period_type, period_key) DO NOTHING
    RETURNING reward_xp INTO weekly_award;
  END IF;

  awarded_xp := COALESCE(daily_award, 0) + COALESCE(weekly_award, 0);
  IF awarded_xp > 0 THEN
    INSERT INTO public.user_progress (user_id, xp)
    VALUES (current_user_id, awarded_xp)
    ON CONFLICT (user_id) DO UPDATE
      SET xp = public.user_progress.xp + EXCLUDED.xp
    RETURNING xp INTO authoritative_xp;
  ELSE
    SELECT xp INTO authoritative_xp
    FROM public.user_progress
    WHERE user_id = current_user_id;
  END IF;

  SELECT EXISTS (
    SELECT 1 FROM public.mission_reward_claims
    WHERE user_id = current_user_id AND period_type = 'daily' AND period_key = p_local_date_key
  ) INTO daily_claimed;
  SELECT EXISTS (
    SELECT 1 FROM public.mission_reward_claims
    WHERE user_id = current_user_id AND period_type = 'weekly' AND period_key = current_week_key
  ) INTO weekly_claimed;

  RETURN jsonb_build_object(
    'date_key', p_local_date_key::TEXT,
    'week_key', current_week_key::TEXT,
    'daily_mission_ids', to_jsonb(daily_ids),
    'weekly_mission_id', weekly_id,
    'counters', jsonb_build_object(
      'daily', jsonb_build_object('lesson', daily_lessons, 'quiz', daily_quizzes, 'flashcard', daily_flashcards),
      'weekly', jsonb_build_object('lesson', weekly_lessons, 'quiz', weekly_quizzes, 'flashcard', weekly_flashcards)
    ),
    'daily_reward_claimed', daily_claimed,
    'weekly_reward_claimed', weekly_claimed,
    'awarded_xp', awarded_xp,
    'total_xp', authoritative_xp
  );
END;
$$;

REVOKE ALL ON FUNCTION public.get_mission_state(DATE) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_mission_state(DATE) TO authenticated;

CREATE OR REPLACE FUNCTION public.record_mission_activity(
  p_activity_type TEXT,
  p_event_key TEXT,
  p_local_date_key DATE
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  current_user_id UUID := (SELECT auth.uid());
  current_week_key DATE;
BEGIN
  IF current_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required';
  END IF;
  IF p_activity_type NOT IN ('lesson', 'quiz', 'flashcard') THEN
    RAISE EXCEPTION 'Invalid mission activity';
  END IF;
  IF p_event_key IS NULL OR char_length(p_event_key) NOT BETWEEN 1 AND 240 THEN
    RAISE EXCEPTION 'Invalid mission event key';
  END IF;
  IF p_local_date_key IS NULL OR abs(p_local_date_key - CURRENT_DATE) > 1 THEN
    RAISE EXCEPTION 'Invalid local mission date';
  END IF;

  current_week_key := p_local_date_key - (extract(isodow FROM p_local_date_key)::INTEGER - 1);
  INSERT INTO public.mission_activity_events (
    user_id, event_key, activity_type, local_date_key, week_key
  ) VALUES (
    current_user_id, p_event_key, p_activity_type, p_local_date_key, current_week_key
  ) ON CONFLICT (user_id, event_key) DO NOTHING;

  RETURN public.get_mission_state(p_local_date_key);
END;
$$;

REVOKE ALL ON FUNCTION public.record_mission_activity(TEXT, TEXT, DATE) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.record_mission_activity(TEXT, TEXT, DATE) TO authenticated;

-- A delayed write from another tab must never erase XP already granted by an
-- idempotent reward claim.
CREATE OR REPLACE FUNCTION public.keep_user_progress_xp_monotonic()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = ''
AS $$
BEGIN
  NEW.xp := GREATEST(OLD.xp, NEW.xp);
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS keep_user_progress_xp_monotonic ON public.user_progress;
CREATE TRIGGER keep_user_progress_xp_monotonic
  BEFORE UPDATE ON public.user_progress
  FOR EACH ROW EXECUTE FUNCTION public.keep_user_progress_xp_monotonic();

REVOKE ALL ON FUNCTION public.keep_user_progress_xp_monotonic() FROM PUBLIC, anon, authenticated;
