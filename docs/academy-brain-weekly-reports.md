# AcadeMY Brain weekly parent reports

## Phase 1 scope

Phase 1 adds the secure database foundation for report preferences, immutable report history, background job state, internal AI-provider usage monitoring, and rich demo inputs. It does not add a scheduler, Edge Function worker, OpenAI, Resend, or any frontend report-generation logic.

Supabase remains the source of truth. Future generation and delivery will run server-side with a service-role Supabase client. Service-role, OpenAI, and Resend credentials must never be exposed to the browser.

## Existing schema reused

| Existing object              | Reuse in weekly reports                                                                                                                                                     |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `profiles`                   | Canonical identity for both `student_id` and `parent_user_id`; `profiles.role` is the admin source of truth and `profiles.plan` is the current persisted subscription tier. |
| `user_progress`              | Future aggregator input for XP, streak, quiz totals, subject XP, chapter activity, card mastery, and language preference.                                                   |
| `quiz_history`               | Future aggregator input for timestamped attempts, subject/chapter scores, correct answers, totals, and earned XP.                                                           |
| `payments`                   | Existing transaction history; it upgrades `profiles.plan` but is not duplicated in report tables.                                                                           |
| `public.is_admin()`          | Existing normalized `profiles.role = 'admin'` security helper used by all admin RLS policies.                                                                               |
| `public.handle_updated_at()` | Existing shared trigger function used for every new table that has `updated_at`.                                                                                            |
| `src/config/features.ts`     | Existing feature/plan matrix. `parent_dashboard` and `weekly_parent_reports` are already parent-visibility features; the database does not introduce a second plan model.   |

The deployed schema has no `parent_student_links` table. `docs/PARENT_CHILD_SCHEMA_PROPOSAL.md` is a proposal, not a migration. For Phase 1, a trusted `parent_report_preferences` row is therefore also the narrow authorization record for one parent/student pair. Only the service role can provision or reassign that relationship; a parent can update only contact and delivery-preference columns. If AcadeMY later introduces a verified general-purpose parent–student link table, access policies should migrate to that canonical relationship and avoid maintaining two independent link systems.

## New tables

### `parent_report_preferences`

One row per parent/student pair. It stores delivery opt-in, cadence (`weekly` or `monthly`), report language (`en` or `ms`), time zone, parent contact details, and the last successful send time. Email syntax is deliberately left to application validation. The pair is unique and cannot link a profile to itself.

### `weekly_reports`

Durable report history with the source snapshot, deterministic analytics, future AI content, prompt/schema/model provenance, lifecycle timestamps, failure details, and demo isolation. A `NULLS NOT DISTINCT` unique index permits at most one row for a student/parent/week/mode combination. Including `is_demo` allows one demo report and one production report for the same logical week without collisions.

`data_snapshot_json` should hold the immutable source facts collected for the period. `analytics_json` should hold deterministic rules-engine output. `ai_content_json` is reserved for validated generated copy and starts empty.

### `report_jobs`

Server-owned background work queue state. Separate partial indexes order `pending` and `retry` jobs by `next_attempt_at`, which supports a future `FOR UPDATE SKIP LOCKED` claim transaction. A student/week index supports audit and deduplication logic. Phase 1 does not implement the worker.

### `brain_usage_logs`

Internal operational telemetry for provider/model usage, token counts, estimated cost, latency, success, errors, and non-sensitive metadata. Students and parents receive no policy for this table. The default provider value is future-facing only; Phase 1 makes no provider calls.

### `demo_scenarios`

Admin-managed scenario inputs for marketing, development, renderer QA, and future prompt evaluation. Each row contains a fictional learner profile and rich activity JSON; it is not an authenticated learner and has no subscription or payment record.

## Data ownership and RLS

RLS is enabled on every new table. Explicit Data API grants are paired with row policies because current Supabase projects may not expose SQL-created tables automatically.

- Parents can select their own `parent_report_preferences` rows and update only `parent_name`, `parent_email`, `enabled`, `frequency`, `preferred_language`, and `timezone`. They cannot insert a relationship, change either identity key, or write server timestamps.
- Parents can select a `weekly_reports` row only when `parent_user_id = auth.uid()` and a trusted preference row exists for the same student.
- Students can select reports where `student_id = auth.uid()`. Reports contain no parent email field. Students have no report write policy.
- Verified admins, checked through `public.is_admin()`, can read all weekly reports, report jobs, and usage logs, and can fully manage demo scenarios.
- Normal authenticated users have no policy to read jobs, usage logs, or demo scenarios. There are no broad authenticated `using (true)` or `with check (true)` policies.
- The service role has table privileges and bypasses RLS for future server-side provisioning, aggregation, generation, job processing, and delivery.

Generated content and delivery lifecycle fields have no authenticated write grant. Report, job, usage-log, and relationship provisioning writes remain server-only.

## Demo-mode strategy

The migration seeds these eight fictional scenarios:

1. Top Performer — Alya Sofea, Form 2
2. Steady Improvement — Hakim Danish, Form 1
3. Needs Bahasa Melayu Revision — Mei Xin Tan, Form 2
4. Science Specialist — Arjun Raj Kumar, Form 3
5. Low Engagement — Nur Imani, Form 1
6. Strong Comeback — Jason Lee Wei Jian, Form 2
7. Exam Ready — Siti Aisyah Zahra, Form 3
8. Parent Attention Recommended — Kavin Prakash, Form 2

The JSON includes subject scores and trends, XP, streak, study minutes, completed quizzes, notes, flashcards, strengths, weak topics, and a future report-writing prompt. It includes no addresses, schools, contact details, birth dates, or other sensitive personal data.

Demo scenarios never create rows in `auth.users`, `profiles`, `user_progress`, `payments`, or any subscription system. This avoids fake identities affecting authentication, billing, analytics, RLS, or production learner counts. Future demo reports must set `is_demo = true`; the uniqueness key keeps them isolated from production report history.

## Future server-side processing flow

1. **Scheduler** determines due preferences in each configured time zone.
2. **Jobs** creates idempotent `report_jobs` work items and future workers claim due pending/retry rows safely.
3. **Aggregator** reads `profiles`, `user_progress`, `quiz_history`, and future timestamped learning-event tables into `data_snapshot_json`.
4. **Rules engine** calculates trends, strengths, weak topics, engagement flags, and recommendations into `analytics_json`.
5. **OpenAI gateway** will make a server-side model call, record `brain_usage_logs`, and never expose a provider key to the frontend.
6. **Validator** will enforce the report JSON schema, allowed claims, tone, and safety requirements before persistence.
7. **HTML renderer** will transform validated structured content into a versioned email/report document.
8. **Resend** will send server-side and update sent/delivered/opened/failed lifecycle timestamps from trusted callbacks.

n8n is not part of the production weekly-report flow. Scheduling, generation, validation, rendering, sending, and telemetry will be owned by Supabase Edge Functions and database state.

## TypeScript types

The repository had no generated Supabase `Database` type before Phase 1; database-facing UI/server shapes are maintained in focused type modules. `src/lib/academy-brain.types.ts` follows that convention for the five new tables. Once this migration is applied to a linked or local Supabase database, the recommended follow-up is to introduce a complete CLI-generated `Database` type and type both browser and server clients in one coordinated change.
