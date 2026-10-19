# Cosmic Companion Phase 2A: secure database foundation (review)

Status: local implementation and tests only. **No migration has been applied anywhere.** The
production database could not be inspected from this environment, so every production fact
below marked _unverified_ must be confirmed with the read-only checks before staging.

## Files

| File                                                                 | Change                                                  |
| -------------------------------------------------------------------- | ------------------------------------------------------- |
| `supabase/migrations/20261019120000_cosmic_companion_candidates.sql` | New, additive, review-only migration                    |
| `src/features/nova-cards/studio.server.ts`                           | Trusted submission path; launch flag independent of AI  |
| `src/features/nova-cards/studio-model.ts`                            | Optional `kind`, `companions`, `companion` state fields |
| `src/features/nova-cards/cosmic-companion.db.test.ts`                | 25 PGlite security tests on the full migration chain    |
| `src/features/nova-cards/migration-order.test.ts`                    | Includes the new migration in the order check           |
| `docs/nova-env.example`                                              | Documents `COSMIC_COMPANION_SUBMISSIONS_ENABLED`        |

## Database changes (`20261019120000`)

1. **`nova_card_candidates`**: exactly two permanent rows (`a`, `b`) per matched card.
   - **Storage:** the full `cc-matcher-v1` specification is held in `spec`. Generated columns
     expose its key fields: candidate and archetype ID, name, species, element, personality,
     versions, fingerprint and input fingerprint.
   - **Primary key** is `(card_id, slot)`. `candidate_id` is unique per card; content IDs
     repeat across students with identical answers.
   - **Check constraints:** schema, slot and kind agreement, an allowlist of v1 versions,
     fingerprint format, `candidate_id = cc1-<slot>-<fingerprint prefix>`, known
     species/element/personality, name and archetype formats, and a size cap.
   - **Pair rule:** a deferred constraint trigger requires exactly two candidates from one
     match, with different archetypes, species and elements.
   - **Immutability:** updates and deletes are rejected while the card exists. Rows go only
     with their card, through account-deletion cascade.
   - **Access:** RLS is on. No grants to `public`, `anon` or `authenticated`; `service_role`
     only.
2. **`nova_match_input_fingerprint` and `nova_validate_match`** bind a match to the answers it
   was computed from: the SHA-256 of the matcher's canonical input, identical to the
   TypeScript. They also check structure and versions. **No scoring is duplicated in SQL.**
3. **`nova_submit_companions(student, questionnaire, match)`**: service-role only, the only
   writer of candidates. It:
   - locks the account row (`auth.users … for update`), so devices and servers are serialised;
   - re-checks that the student is active;
   - returns an existing card untouched (idempotent, never re-matched);
   - checks the subscription;
   - locks the draft and requires it to equal the answers the server matched;
   - validates the match;
   - creates the card, both candidates and a job with `reveal_after = now() + 24 hours`, plus
     an audit row, all in one transaction.
4. **`submit_nova_origin()` fails closed** (see Rollout). It was callable by students and
   would create a card without candidates.
5. **`get_my_nova_studio()`** adds three fields:
   - `kind`: `cosmic-companion` or `legacy`;
   - `companions`: both specifications, only when the reveal is ready and nothing is chosen;
   - `companion`: the chosen specification, after the choice, regardless of subscription.

   All existing fields are unchanged.

6. **`nova_card_payload()`** (sharing, QR, export) adds `companion`, a public summary of the
   chosen companion only. It never includes match reasons, which quote answers. The legacy
   shape is otherwise identical.
7. **`nova_origin_reveal_ready()` no longer requires an active subscription** (approved
   decision). A validly submitted journey can finish; submission still requires entitlement.
   Readiness itself is unchanged.
8. **`nova_admin_repair_legacy_job(card, reason)`**: service-role only, audited and
   idempotent. It queues a legacy card's **own** identity when it has no Origin job. It refuses
   companion cards and cards with a permanent artwork, and never re-matches or deletes.
9. **`nova_prepare_batch()` and `nova_begin_submission()`** skip companion cards. Until Phase 4
   per-candidate artwork exists, the worker would otherwise draw one legacy identity twice.

Unchanged: `select_nova_origin` (readiness, one permanent choice, idempotent same choice,
rejection of a different choice), artwork storage access, drafts and existing RLS.

## Submission flow

```
Browser ──submitStudioOrigin() (no input)──▶ App server
  1. owner(): verify session user (rejects anonymous)          [user JWT client]
  2. get_my_nova_studio(): read SAVED draft answers            [user JWT client]
  3. existing card? → return state (never re-match)
  4. matchCompanions(saved answers) + verifyCandidateFingerprint  [shared TS, cc-matcher-v1]
  5. nova_submit_companions(student, answers, match)           [service-role client]
  6. get_my_nova_studio() → state                              [user JWT client]
```

The browser never supplies answers, candidates or identities. Submissions are gated by the
server-only `COSMIC_COMPANION_SUBMISSIONS_ENABLED` (off unless set, independent of the AI
flags). `state.enabled` now means "submissions open".

## Rollout

### What happens in each situation

| Situation                                           | Result                                                                                                                                                                                                                        | Safe?                       |
| --------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| Migration applied, submission flag **off**, new app | "Summon" stays disabled (`enabled=false`). A server submit is refused before any database call. Drafts, legacy cards, selection and sharing work.                                                                             | ✓                           |
| Migration applied, **old app** still running        | Old server only submits when the AI env flags are on. With AI off (default) it refuses as today. With AI on, it calls `submit_nova_origin`, which fails closed: no card, draft intact. Old code ignores the new state fields. | ✓ no bypass, no data change |
| New app, migration **not** applied, flag **off**    | No submission attempted; everything else as before                                                                                                                                                                            | ✓                           |
| New app, migration **not** applied, flag **on**     | Submit fails (missing function); nothing stored. **Never do this.**                                                                                                                                                           | ✗ ordering rule             |
| Unfinished draft at any point                       | Unaffected; matched with `cc-matcher-v1` once the flag opens                                                                                                                                                                  | ✓                           |
| Legacy card at any point                            | Unaffected; continues on its own reveal time and artwork                                                                                                                                                                      | ✓                           |
| Student calls `submit_nova_origin` directly         | Rejected ("Submit through the Cosmic Companion server"); tested                                                                                                                                                               | ✓                           |

The old RPC is **not** reopened. No legitimate flow depends on it: it only ever ran when AI
generation was enabled, which it is not. Every legitimate submission moves to the server path.

### Coordinated sequence

1. **Read-only production checks** (below). If production already has `20261018160100`
   applied, the old learner RPC is live today; this migration closes it.
2. **Staging:** apply the full Nova chain, deploy the app with the flag off, then run the
   mandatory staging tests (below).
3. **Production database:** apply the remaining Nova migrations through `20261019120000` in one
   release. AI settings stay off and the monthly cap stays zero.
4. **Production app:** deploy with `COSMIC_COMPANION_SUBMISSIONS_ENABLED` unset. Verify drafts,
   legacy cards and sharing.
5. **Launch** (after Phase 3 UI approval): set the flag. **Rollback** is to unset it: instant,
   and no data changes.

Rule: **the flag must never be on before the migration.** Do not roll the migration back once
companion cards exist; roll forward instead.

## Approved decisions applied

| Decision                                                            | Phase 2A                                                               | Later phase                                                                                                                                                          |
| ------------------------------------------------------------------- | ---------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lapsed subscription while waiting may still reveal and choose       | ✓ reveal readiness no longer checks subscription; tested               | —                                                                                                                                                                    |
| Viewing a chosen companion after lapse                              | ✓ unchanged and tested                                                 | —                                                                                                                                                                    |
| Legacy cards preserved; explicit repair for cards missing a job     | ✓ audited service-role repair function; tested                         | Artwork for repaired legacy cards (Phase 4)                                                                                                                          |
| `cosmic_companion` is a learning feature including Explorer         | SQL gate unchanged (`pro`/`premium` = Explorer and Captain)            | Phase 3: add `cosmic_companion` to `STUDENT_LEARNING_CORE` and check `hasFeature` on the server; later replace the SQL plan list with a synced `plan_features` table |
| Paid AI personalisation is a separate entitlement                   | —                                                                      | Future `cosmic_companion_ai` feature                                                                                                                                 |
| Library-first artwork; human review of masters; bespoke AI reviewed | Paid generation untouched and companion cards excluded from the worker | Phase 4 (below)                                                                                                                                                      |

### Phase 4 artwork (library-first)

1. **Library tables.** Add tables for master assets per archetype, with a human review status
   and reviewer audit. Only approved masters are usable.
2. **Assignment.** Assign approved assets to a card's two candidates at submission or later,
   with automatic validation (format, size, checksum, archetype match).
3. **Readiness.** Extend reveal readiness so "two approved assets" can come from the library as
   well as from job artwork.
4. **Bespoke AI artwork.** Per-candidate prompts from stored specifications, plus a review
   state before release, behind the future paid entitlement.
5. **Legacy cards.** Decide their artwork source.

## Security verification

| Requirement                                  | Evidence                                                                                                                                                                                                                                                           |
| -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Service-role credentials are server-only     | Admin client is used only in a server function. The build scan found no submit RPC, key name, matcher or catalogue in browser assets.                                                                                                                              |
| No forged candidates                         | No learner or anonymous grant on the table or writer; the browser sends nothing. Nine forged payloads are rejected even through the service path.                                                                                                                  |
| No bypass of the 24-hour wait                | `reveal_after` is set by the database clock. Students cannot update jobs, candidates or artwork (tested).                                                                                                                                                          |
| No early reveal through another endpoint     | Function allowlist test: students and visitors can execute exactly 11 reviewed function grants. Each was checked; none returns candidates before readiness. Table grants test: only `SELECT` on `nova_cards`, which is owner-filtered and holds no candidate data. |
| Unselected candidate hidden after the choice | Specification and artwork both hidden (tested)                                                                                                                                                                                                                     |
| Artwork does not leak across students        | `can_read_nova_artwork` returns false for another student's and the public's unshared or unselected paths (tested)                                                                                                                                                 |
| Permanent selection immutable                | A different choice is rejected and the same choice is idempotent (tested)                                                                                                                                                                                          |
| Retries and duplicates idempotent            | Repeated, rival and parallel-promise submissions give one card (tested; see the concurrency note)                                                                                                                                                                  |
| Finishing after subscription expiry          | Reveal and choice succeed after a lapse while waiting; a new submission still requires entitlement (tested)                                                                                                                                                        |
| Legacy sharing, QR and export                | Legacy public payload keeps its exact keys plus `companion: null` (tested)                                                                                                                                                                                         |

Fingerprints are integrity checks only. Authorisation always comes from the session and role,
grants, RLS and the service-only writer.

## Test results

`cosmic-companion.db.test.ts` on the full four-migration chain: **25 of 25 pass**.

**Concurrency limitation.** PGlite is in-process with one connection, so parallel calls are
serialised. The test proves idempotency and the unique-owner backstop, **not** true parallel
locking. No Docker or local PostgreSQL is available, and PGlite's socket server still runs one
backend. This is a **mandatory staging test**:

1. As `service_role`, fire 20 simultaneous `nova_submit_companions` calls for one prepared
   student from separate connections (for example, 20 parallel supabase-js clients).
   - **Expect:** exactly one `created`, the rest `existing`; one card and two candidates.
2. In `psql` session 1, run `begin; select 1 from auth.users where id='<student>' for update;`.
   In session 2, call `nova_submit_companions` for that student.
   - **Expect:** session 2 blocks until session 1 commits, then returns `existing` or
     `created`, never a second card.
3. Run the same parallel test with a changed draft between the calls.
   - **Expect:** the "another device" rejection, and no stale match stored.

## Read-only production checks (before staging)

Run as a read-only role. None of these write.

```sql
-- 1. Applied migration history and the latest version.
select version, name from supabase_migrations.schema_migrations order by version desc limit 15;
-- 2. Which Nova objects exist (null = absent).
select to_regclass('public.nova_cards') cards, to_regclass('public.nova_studio_drafts') drafts,
       to_regclass('public.nova_generation_jobs') jobs, to_regclass('public.nova_card_candidates') candidates,
       to_regprocedure('public.submit_nova_origin()') old_submit;
-- 3. Who can execute the old learner submit RPC today (if it exists).
select has_function_privilege('authenticated', 'public.submit_nova_origin()', 'EXECUTE');
-- 4. Shapes relied on by the migrations.
select table_name, column_name, data_type from information_schema.columns
 where table_schema = 'public' and table_name in ('profiles', 'subscriptions')
   and column_name in ('id', 'role', 'status', 'user_id', 'plan', 'current_period_end');
select plan, status, count(*) from public.subscriptions group by 1, 2;
select role, status, count(*) from public.profiles group by 1, 2;
-- 5. Existing Nova data (only if the tables exist).
select count(*) from public.nova_cards;
select c.id, c.created_at from public.nova_cards c
 where not exists (select 1 from public.nova_generation_jobs j where j.card_id = c.id and j.stage = 1);
select enabled, batch_enabled, monthly_cap_microusd from public.nova_generation_settings;
-- 6. Storage and scheduler.
select id, public from storage.buckets where id = 'nova-artwork';
select jobname, schedule, active from cron.job where jobname like 'nova%';
```

Also confirm, outside SQL:

- the app server's `SUPABASE_SERVICE_ROLE_KEY` exists only in server secrets (never `VITE_*`);
- `COSMIC_COMPANION_SUBMISSIONS_ENABLED` is unset;
- the `NOVA_AI_*` flags are off.

## Legacy cards missing an Origin job: repair procedure

1. **Find them** with read-only check 5. Expect none: only early previews could create them.
2. **For each card,** with a support or product ticket, call as `service_role`:
   `select public.nova_admin_repair_legacy_job('<card id>', '<ticket and reason, 12+ chars>');`
3. **Result:**
   - one Origin job with two slots for the card's existing identity, revealing 24 hours later;
   - an audit row;
   - repeating the call returns the same job.

   It never re-matches, never touches companion cards and never deletes data.

4. **Artwork** for repaired legacy cards follows the Phase 4 decision. Until then the student
   waits, as every card does.

## Production prerequisites

| Item                                                                  | Status                                            |
| --------------------------------------------------------------------- | ------------------------------------------------- |
| Supabase project `aojrbxoqbgyxmfljqpqj` (from `supabase/config.toml`) | Confirmed in repository only                      |
| Nova migrations `20261018160000`, `…160100`, `…160200` applied?       | **Unverified.** Docs say not applied (check 1–2). |
| Latest production migration (`20261016120000` per order test)         | **Unverified** (check 1)                          |
| `profiles` and `subscriptions` shapes and plan values                 | **Unverified** (check 4)                          |
| `nova-artwork` bucket, scheduler                                      | **Unverified** (check 6)                          |
| Service-role key in app server secrets only                           | **Unverified**                                    |
| Existing `nova_cards`, legacy cards without a job                     | **Unverified** (check 5)                          |

## Remaining risks

- **True parallel locking** is unproven until the staging tests run.
- **Production migration history** is unverified.
- **No reveal is possible** until Phase 4 provides approved artwork. Students wait in the
  sanctuary by design, but the copy must say so (Phase 3).
- **The UI does not read `companions` or `companion` yet** (Phase 3).
- **The SQL subscription gate uses plan names** until the `plan_features` sync exists.
