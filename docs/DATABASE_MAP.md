# AcadeMY Database Map

Live snapshot of the Supabase `public` schema, queried directly from the project (not from memory). Last verified: 2026-07-05.

## Existing tables

### `profiles`
One row per authenticated user. Source of truth for role and plan.

| column | purpose |
|---|---|
| `id` | = `auth.users.id` |
| `full_name`, `email` | display identity |
| `role` | `student` \| `teacher` \| `admin` — drives admin route guard (`beforeLoad` in `src/routes/admin.tsx`) |
| `plan` | `free` \| `paid` — feature-flag input, see `src/lib/feature-access.ts` |

**Used by:** every admin page (via `getAdminProfile`), `hasFeature()` feature-flag checks, Parent Dashboard.
**RLS:** users read/update their own row; `is_admin()` helper grants admins read-all + update-all.

### `user_progress`
One row per user. The gamification/XP layer — streaks, badges, per-subject XP, per-chapter activity, card mastery, last-visited state.

**Used by:** Home dashboard, Parent Dashboard analytics (`src/lib/analytics.ts`), AI Tracker.
**Future:** input to the Recommendation Engine (AcadeMY Brain) once it exists.

### `payments`
One row per transaction. `amount`, `currency`, `plan` (`monthly`/`annual`), `method`, `status` (`paid`/`pending`/`failed`/`refunded`).

**Used by:** Admin → Payments tab.
**RLS:** users see their own payments; `is_admin()` grants admin read-all. Insert is restricted to `status = 'pending'` (a client can request a payment but can't mark itself paid).

### `quiz_history`
One row per completed quiz attempt: `user_id`, `subject_id`, `chapter_key`, `score_pct`, `correct`, `total`, `created_at`.

**Used by:** Admin → Quiz activity tab (`getQuizActivity` in `-admin.server.ts`), Parent Dashboard weekly report, `user_progress` XP updates on quiz completion.
**Known issue:** `getQuizActivity` in `src/routes/-admin.server.ts` currently queries a table named `quiz_attempts`, which does not exist — only `quiz_history` does. This predates this session's changes; flagging it here rather than silently fixing it, since fixing admin tabs wasn't in scope for this task.
**RLS:** users insert/read only their own rows. No admin-read policy exists yet (the admin tab is reading through this broken path, so the gap hasn't surfaced yet).

### `knowledge_engine`
213 rows today. Bite-sized "discoveries" — `title`, `category`, `content`, `reflection`, `subject`/`form`/`chapter` tags, `reading_time`, `difficulty`, `published` flag.

**Used by:** Admin → "Cikgu AI Intel" tab (`src/routes/admin.cikgu-intel.tsx`), public-facing Cikgu AI feature (`published = true` rows only, via the `myacademy` RLS policy).
**This is the AcadeMY Brain's current "Knowledge Engine" pillar** — the only piece of the Brain that's real today; Analytics/Recommendation Engine pillars are still ad-hoc code in `src/lib/analytics.ts`, not dedicated tables.

## How they connect

```
auth.users
   │
   ├── profiles (1:1)             — identity, role, plan
   ├── user_progress (1:1)        — XP/streaks/mastery
   ├── payments (1:many)          — billing history
   └── quiz_history (1:many)      — quiz attempt log
                                      │
                                      └─→ feeds user_progress.subject_xp / chapter_activity
                                          (application-level write, not a DB trigger)

knowledge_engine                  — standalone, tagged by subject/form/chapter
                                     (soft-links to the content registry by
                                     string match, not a foreign key)
```

There are currently **no foreign keys between `quiz_history`/`knowledge_engine` and the static chapter registry** (`src/content/registry.ts`) — the link is by matching `subject`/`form`/`chapter` string values at the application layer, since registry chapters aren't database rows.

## Which admin pages use which tables

| Admin page | Route | Tables |
|---|---|---|
| Dashboard | `/admin` | `profiles`, `payments`, `quiz_history` (via `getDashboardStats`) |
| Users | `/admin` (tab) | `profiles` |
| Payments | `/admin` (tab) | `payments`, `profiles` (join) |
| Quiz activity | `/admin` (tab) | `quiz_history` *(currently broken — see note above)* |
| Cikgu AI Intel | `/admin/cikgu-intel` | `knowledge_engine` |
| **Content Library** *(new, this task)* | `/admin/content-library` | `content_library` (new table, proposed below) + Storage bucket `content-library` |

## Which future features these support

- **`user_progress`** → Recommendation Engine (AcadeMY Brain pillar): per-student weak-topic detection, adaptive next-mission suggestions.
- **`quiz_history`** → Quiz History pillar (already named in `CLAUDE.md`); once fixed, also feeds a real Learning History view for Parent Dashboard.
- **`knowledge_engine`** → Question Bank pillar precursor — same shape (subject/form/chapter-tagged, admin-curated) could extend to house generated quiz questions.
- **`content_library`** (proposed) → the intake pipeline for all of the above: raw teacher-uploaded source material → text extraction → AI-assisted Notes/Quiz/Flashcard/Mindmap generation → publish into `knowledge_engine`-style tables. This is the seam where "Rule-based intelligence today" becomes "Local/Cloud/Agentic AI tomorrow" per `CLAUDE.md`'s AI Philosophy, without the platform depending on AI to function (uploads + manual metadata still work with the pipeline buttons disabled).
