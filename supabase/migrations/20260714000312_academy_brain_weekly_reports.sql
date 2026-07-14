-- AcadeMY Brain weekly parent reports: Phase 1 database foundation.
--
-- Parent and student identities both reuse public.profiles(id). There is no
-- separate parent_student_links table in the deployed schema. A preference
-- row is therefore provisioned only by trusted server/admin workflows and is
-- also the verified authorization record for that parent/student pair.

create table public.parent_report_preferences (
  id uuid primary key default gen_random_uuid(),
  parent_user_id uuid not null references public.profiles(id) on delete cascade,
  student_id uuid not null references public.profiles(id) on delete cascade,
  parent_name text,
  parent_email text not null,
  enabled boolean not null default true,
  frequency text not null default 'weekly'
    check (frequency in ('weekly', 'monthly')),
  preferred_language text not null default 'en'
    check (preferred_language in ('en', 'ms')),
  timezone text not null default 'Asia/Kuala_Lumpur',
  last_sent_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint parent_report_preferences_distinct_users
    check (parent_user_id <> student_id),
  constraint parent_report_preferences_parent_student_key
    unique (parent_user_id, student_id)
);

create index parent_report_preferences_student_idx
  on public.parent_report_preferences (student_id);
create index parent_report_preferences_enabled_schedule_idx
  on public.parent_report_preferences (frequency, timezone)
  where enabled;

create table public.weekly_reports (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  parent_user_id uuid references public.profiles(id) on delete cascade,
  week_start date not null,
  week_end date not null,
  data_snapshot_json jsonb not null default '{}'::jsonb,
  analytics_json jsonb not null default '{}'::jsonb,
  ai_content_json jsonb not null default '{}'::jsonb,
  prompt_version text,
  schema_version text not null default '1.0',
  model_used text,
  status text not null default 'draft'
    check (status in (
      'draft', 'queued', 'generating', 'generated', 'sending', 'sent',
      'delivered', 'opened', 'failed', 'cancelled'
    )),
  is_demo boolean not null default false,
  generated_at timestamptz,
  sent_at timestamptz,
  delivered_at timestamptz,
  opened_at timestamptz,
  failed_at timestamptz,
  failure_reason text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint weekly_reports_valid_period check (week_end >= week_start),
  constraint weekly_reports_distinct_users
    check (parent_user_id is null or parent_user_id <> student_id)
);

-- NULLS NOT DISTINCT closes the normal nullable-unique loophole. Including
-- is_demo permits one isolated demo and one production report for the same
-- student/parent/week without allowing duplicates inside either mode.
create unique index weekly_reports_student_parent_week_mode_key
  on public.weekly_reports (student_id, parent_user_id, week_start, is_demo)
  nulls not distinct;
create index weekly_reports_parent_created_idx
  on public.weekly_reports (parent_user_id, created_at desc);
create index weekly_reports_student_week_idx
  on public.weekly_reports (student_id, week_start desc);
create index weekly_reports_status_idx
  on public.weekly_reports (status, created_at)
  where status in ('queued', 'generating', 'sending', 'failed');

create table public.report_jobs (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  weekly_report_id uuid references public.weekly_reports(id) on delete set null,
  week_start date not null,
  week_end date not null,
  job_type text not null default 'weekly_parent_report',
  status text not null default 'pending'
    check (status in ('pending', 'processing', 'completed', 'retry', 'failed', 'cancelled')),
  attempt_count integer not null default 0,
  max_attempts integer not null default 3,
  next_attempt_at timestamptz not null default now(),
  locked_at timestamptz,
  locked_by text,
  completed_at timestamptz,
  error_message text,
  is_demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint report_jobs_valid_period check (week_end >= week_start),
  constraint report_jobs_attempt_count_nonnegative check (attempt_count >= 0),
  constraint report_jobs_max_attempts_positive check (max_attempts > 0),
  constraint report_jobs_attempts_within_max check (attempt_count <= max_attempts)
);

-- Separate partial indexes keep both worker queues small and ordered for
-- SELECT ... FOR UPDATE SKIP LOCKED claiming in a future Edge Function.
create index report_jobs_pending_claim_idx
  on public.report_jobs (next_attempt_at, created_at)
  where status = 'pending';
create index report_jobs_retry_claim_idx
  on public.report_jobs (next_attempt_at, created_at)
  where status = 'retry';
create index report_jobs_student_week_idx
  on public.report_jobs (student_id, week_start desc);
create index report_jobs_weekly_report_idx
  on public.report_jobs (weekly_report_id)
  where weekly_report_id is not null;

create table public.brain_usage_logs (
  id uuid primary key default gen_random_uuid(),
  feature text not null,
  student_id uuid references public.profiles(id) on delete set null,
  weekly_report_id uuid references public.weekly_reports(id) on delete set null,
  provider text not null default 'openai',
  model text,
  input_tokens integer,
  output_tokens integer,
  estimated_cost numeric,
  latency_ms integer,
  success boolean not null default false,
  error_code text,
  error_message text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint brain_usage_logs_input_tokens_nonnegative
    check (input_tokens is null or input_tokens >= 0),
  constraint brain_usage_logs_output_tokens_nonnegative
    check (output_tokens is null or output_tokens >= 0),
  constraint brain_usage_logs_estimated_cost_nonnegative
    check (estimated_cost is null or estimated_cost >= 0),
  constraint brain_usage_logs_latency_nonnegative
    check (latency_ms is null or latency_ms >= 0)
);

create index brain_usage_logs_created_idx
  on public.brain_usage_logs (created_at desc);
create index brain_usage_logs_feature_success_idx
  on public.brain_usage_logs (feature, success, created_at desc);
create index brain_usage_logs_report_idx
  on public.brain_usage_logs (weekly_report_id)
  where weekly_report_id is not null;

create table public.demo_scenarios (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  description text,
  category text not null
    check (category in (
      'excellent', 'improving', 'consistent', 'inconsistent',
      'needs_revision', 'inactive', 'comeback', 'at_risk', 'exam_ready'
    )),
  student_profile_json jsonb not null default '{}'::jsonb,
  activity_data_json jsonb not null default '{}'::jsonb,
  is_active boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index demo_scenarios_active_category_idx
  on public.demo_scenarios (category, name)
  where is_active;

-- Reuse the shared timestamp trigger function already used by profiles and
-- user_progress; do not add another function with identical behaviour.
create trigger parent_report_preferences_updated_at
  before update on public.parent_report_preferences
  for each row execute function public.handle_updated_at();
create trigger weekly_reports_updated_at
  before update on public.weekly_reports
  for each row execute function public.handle_updated_at();
create trigger report_jobs_updated_at
  before update on public.report_jobs
  for each row execute function public.handle_updated_at();
create trigger demo_scenarios_updated_at
  before update on public.demo_scenarios
  for each row execute function public.handle_updated_at();

alter table public.parent_report_preferences enable row level security;
alter table public.weekly_reports enable row level security;
alter table public.report_jobs enable row level security;
alter table public.brain_usage_logs enable row level security;
alter table public.demo_scenarios enable row level security;

-- A parent can see and change contact/delivery preferences only for rows
-- provisioned for their own auth identity. Column grants below prevent
-- reassignment of parent_user_id/student_id and writes to server timestamps.
create policy "Parents can read own report preferences"
  on public.parent_report_preferences for select
  to authenticated
  using ((select auth.uid()) = parent_user_id);
create policy "Parents can update own report preferences"
  on public.parent_report_preferences for update
  to authenticated
  using ((select auth.uid()) = parent_user_id)
  with check ((select auth.uid()) = parent_user_id);

-- Parent access requires both direct report ownership and the trusted pair
-- in preferences. Disabling delivery does not hide historical reports.
create policy "Parents can read authorized weekly reports"
  on public.weekly_reports for select
  to authenticated
  using (
    (select auth.uid()) = parent_user_id
    and exists (
      select 1
      from public.parent_report_preferences pref
      where pref.parent_user_id = (select auth.uid())
        and pref.student_id = weekly_reports.student_id
    )
  );
create policy "Students can read own weekly reports"
  on public.weekly_reports for select
  to authenticated
  using ((select auth.uid()) = student_id);
create policy "Admins can read all weekly reports"
  on public.weekly_reports for select
  to authenticated
  using (public.is_admin());

create policy "Admins can read report jobs"
  on public.report_jobs for select
  to authenticated
  using (public.is_admin());
create policy "Admins can read brain usage logs"
  on public.brain_usage_logs for select
  to authenticated
  using (public.is_admin());

create policy "Admins can read demo scenarios"
  on public.demo_scenarios for select
  to authenticated
  using (public.is_admin());
create policy "Admins can insert demo scenarios"
  on public.demo_scenarios for insert
  to authenticated
  with check (public.is_admin());
create policy "Admins can update demo scenarios"
  on public.demo_scenarios for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());
create policy "Admins can delete demo scenarios"
  on public.demo_scenarios for delete
  to authenticated
  using (public.is_admin());

-- Explicit Data API privileges complement RLS. Newer Supabase projects do
-- not automatically expose SQL-created tables. service_role remains the
-- only writer for reports, jobs, logs, and preference provisioning.
revoke all on table public.parent_report_preferences from anon, authenticated;
revoke all on table public.weekly_reports from anon, authenticated;
revoke all on table public.report_jobs from anon, authenticated;
revoke all on table public.brain_usage_logs from anon, authenticated;
revoke all on table public.demo_scenarios from anon, authenticated;

grant select on table public.parent_report_preferences to authenticated;
grant update (
  parent_name, parent_email, enabled, frequency, preferred_language, timezone
) on table public.parent_report_preferences to authenticated;
grant select on table public.weekly_reports to authenticated;
grant select on table public.report_jobs to authenticated;
grant select on table public.brain_usage_logs to authenticated;
grant select, insert, update, delete on table public.demo_scenarios to authenticated;

grant all on table public.parent_report_preferences to service_role;
grant all on table public.weekly_reports to service_role;
grant all on table public.report_jobs to service_role;
grant all on table public.brain_usage_logs to service_role;
grant all on table public.demo_scenarios to service_role;

-- Fictional, non-identifying Malaysian demo data. These rows deliberately
-- live only in demo_scenarios and do not create auth/profile/payment records.
insert into public.demo_scenarios
  (name, slug, description, category, student_profile_json, activity_data_json)
values
(
  'Top Performer',
  'top-performer',
  'A highly engaged student achieving excellent results across the curriculum.',
  'excellent',
  '{"student_name":"Alya Sofea","form":2,"preferred_language":"en","learning_style":"balanced","report_tone":"celebratory"}',
  '{"week":{"study_minutes":420,"completed_quizzes":18,"notes_read":12,"flashcards_reviewed":164,"xp_earned":1280,"streak_days":21},"subjects":{"Bahasa Melayu":{"score":91,"trend":3},"English":{"score":94,"trend":2},"Mathematics":{"score":96,"trend":4},"Science":{"score":93,"trend":1},"Sejarah":{"score":89,"trend":5},"Geography":{"score":92,"trend":3}},"strengths":["Algebraic expressions","Scientific investigation","English comprehension"],"weak_topics":["Sejarah essay evidence"],"trend":"consistently excellent","parent_prompt":"Celebrate sustained effort and suggest one enrichment challenge."}'
),
(
  'Steady Improvement',
  'steady-improvement',
  'A consistent learner whose scores and study habits are improving week by week.',
  'improving',
  '{"student_name":"Hakim Danish","form":1,"preferred_language":"ms","learning_style":"practice-led","report_tone":"encouraging"}',
  '{"week":{"study_minutes":285,"completed_quizzes":12,"notes_read":9,"flashcards_reviewed":96,"xp_earned":760,"streak_days":9},"subjects":{"Bahasa Melayu":{"score":76,"trend":8},"English":{"score":72,"trend":5},"Mathematics":{"score":81,"trend":7},"Science":{"score":79,"trend":6},"Sejarah":{"score":70,"trend":4},"Geography":{"score":74,"trend":6}},"strengths":["Fractions","Lab safety","Regular study routine"],"weak_topics":["English grammar: tenses","Sejarah chronology"],"trend":"upward for four weeks","parent_prompt":"Praise consistency and recommend two short revision sessions."}'
),
(
  'Needs Bahasa Melayu Revision',
  'needs-bahasa-melayu-revision',
  'A capable student who needs focused support in Bahasa Melayu.',
  'needs_revision',
  '{"student_name":"Mei Xin Tan","form":2,"preferred_language":"en","learning_style":"visual","report_tone":"supportive"}',
  '{"week":{"study_minutes":250,"completed_quizzes":10,"notes_read":11,"flashcards_reviewed":82,"xp_earned":610,"streak_days":6},"subjects":{"Bahasa Melayu":{"score":48,"trend":-4},"English":{"score":88,"trend":2},"Mathematics":{"score":84,"trend":1},"Science":{"score":82,"trend":3},"Sejarah":{"score":68,"trend":0},"Geography":{"score":75,"trend":2}},"strengths":["English writing","Geometry","Science terminology"],"weak_topics":["Bahasa Melayu peribahasa","Karangan response structure","KOMSAS themes"],"trend":"strong overall with a persistent BM gap","parent_prompt":"Recommend a gentle BM revision plan without alarmist language."}'
),
(
  'Science Specialist',
  'science-specialist',
  'A curious science-focused learner with uneven humanities performance.',
  'consistent',
  '{"student_name":"Arjun Raj Kumar","form":3,"preferred_language":"en","learning_style":"inquiry-led","report_tone":"curious"}',
  '{"week":{"study_minutes":360,"completed_quizzes":15,"notes_read":14,"flashcards_reviewed":118,"xp_earned":990,"streak_days":14},"subjects":{"Bahasa Melayu":{"score":69,"trend":1},"English":{"score":86,"trend":3},"Mathematics":{"score":90,"trend":2},"Science":{"score":98,"trend":1},"Sejarah":{"score":62,"trend":-2},"Geography":{"score":73,"trend":0}},"strengths":["Electricity and magnetism","Experimental variables","Data interpretation"],"weak_topics":["Sejarah source analysis","Bahasa Melayu tatabahasa"],"trend":"exceptional science mastery and stable engagement","parent_prompt":"Celebrate scientific curiosity and balance it with a humanities goal."}'
),
(
  'Low Engagement',
  'low-engagement',
  'A previously active learner with very limited activity this week.',
  'inactive',
  '{"student_name":"Nur Imani","form":1,"preferred_language":"ms","learning_style":"short-sessions","report_tone":"gentle"}',
  '{"week":{"study_minutes":38,"completed_quizzes":2,"notes_read":1,"flashcards_reviewed":9,"xp_earned":80,"streak_days":0},"subjects":{"Bahasa Melayu":{"score":61,"trend":-8},"English":{"score":65,"trend":-5},"Mathematics":{"score":58,"trend":-10},"Science":{"score":64,"trend":-6},"Sejarah":{"score":null,"trend":null},"Geography":{"score":null,"trend":null}},"strengths":["English vocabulary when active"],"weak_topics":["Basic fractions","Scientific measurement","Study consistency"],"trend":"activity down sharply from the prior three-week average","parent_prompt":"Suggest one achievable ten-minute restart and avoid blame."}'
),
(
  'Strong Comeback',
  'strong-comeback',
  'A returning learner rebuilding momentum after two quiet weeks.',
  'comeback',
  '{"student_name":"Jason Lee Wei Jian","form":2,"preferred_language":"en","learning_style":"goal-led","report_tone":"motivational"}',
  '{"week":{"study_minutes":315,"completed_quizzes":13,"notes_read":8,"flashcards_reviewed":104,"xp_earned":870,"streak_days":7},"subjects":{"Bahasa Melayu":{"score":72,"trend":12},"English":{"score":83,"trend":10},"Mathematics":{"score":86,"trend":15},"Science":{"score":80,"trend":11},"Sejarah":{"score":71,"trend":9},"Geography":{"score":78,"trend":13}},"strengths":["Renewed consistency","Linear equations","Map skills"],"weak_topics":["KOMSAS character analysis","Scientific explanations"],"trend":"major rebound after fourteen inactive days","parent_prompt":"Recognize the comeback and protect the new routine with realistic goals."}'
),
(
  'Exam Ready',
  'exam-ready',
  'A Form 3 student demonstrating broad mastery and disciplined exam preparation.',
  'exam_ready',
  '{"student_name":"Siti Aisyah Zahra","form":3,"preferred_language":"ms","learning_style":"exam-practice","report_tone":"confident"}',
  '{"week":{"study_minutes":510,"completed_quizzes":22,"notes_read":16,"flashcards_reviewed":210,"xp_earned":1460,"streak_days":28},"subjects":{"Bahasa Melayu":{"score":88,"trend":4},"English":{"score":90,"trend":3},"Mathematics":{"score":92,"trend":5},"Science":{"score":91,"trend":4},"Sejarah":{"score":87,"trend":6},"Geography":{"score":89,"trend":3}},"strengths":["Timed quiz accuracy","Cross-topic recall","Revision planning"],"weak_topics":["Bahasa Melayu ringkasan timing","Geography structured responses"],"trend":"exam-ready with improving speed and stable accuracy","parent_prompt":"Confirm readiness, highlight rest, and name two final polish areas."}'
),
(
  'Parent Attention Recommended',
  'parent-attention-recommended',
  'An inconsistent learner whose falling scores and missed study days merit supportive parent attention.',
  'at_risk',
  '{"student_name":"Kavin Prakash","form":2,"preferred_language":"en","learning_style":"guided","report_tone":"clear-and-caring"}',
  '{"week":{"study_minutes":92,"completed_quizzes":5,"notes_read":2,"flashcards_reviewed":21,"xp_earned":190,"streak_days":1},"subjects":{"Bahasa Melayu":{"score":55,"trend":-9},"English":{"score":68,"trend":-5},"Mathematics":{"score":43,"trend":-14},"Science":{"score":51,"trend":-11},"Sejarah":{"score":47,"trend":-8},"Geography":{"score":59,"trend":-6}},"strengths":["English comprehension","Responds well to guided practice"],"weak_topics":["Algebra fundamentals","Cell structure","Sejarah key events","Weekly study routine"],"trend":"declining scores alongside irregular activity","parent_prompt":"Recommend a calm check-in, a small schedule, and teacher support if the pattern continues."}'
);
