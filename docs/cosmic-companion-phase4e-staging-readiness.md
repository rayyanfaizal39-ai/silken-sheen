# Cosmic Companion Phase 4E/4F — staging readiness and local release runbook

Status date: 2026-10-20 (Asia/Singapore). Phase 4F base checkpoint: `2e10dfd1` on
`feature/companion-gateway-fable`.

This report distinguishes read-only hosted evidence, local tests and staging tests that remain
blocked. No hosted database was changed, no project or branch was provisioned, no deployment was
made and no AI provider was called. Phase 4F is local-only and authorises no additional spending.

## 1. Read-only Supabase evidence

### Linked production project

- Local `.supabase/config.toml` links to the active healthy Supabase project `AcadeMy`
  (`aojrbxoqbgyxmfljqpqj`, Singapore).
- The hosted migration history has 46 entries. Its newest entry is
  `20261016120000_partner_referral_commissions`.
- The exact `20261016120000_partner_referral_commissions.sql` file has now been restored locally
  from `origin/main` commit `17a77a19`. Its Git blob is
  `f09532916f544f2b733348883014b81fa4ea2a7e`, matching the expected source exactly. The hosted
  migration record already exists, so this file must never be reapplied or repaired in production.
- Local but unapplied remotely are the unrelated
  `20261010010000_sync_form3_math_quiz_sets.sql` migration and the seven Nova/Cosmic migrations
  from `20261018160000` through `20261020130000`.
- There are no hosted Nova or Cosmic Companion tables, RPCs, policies or records. The private
  `nova-artwork` bucket also does not exist. This confirms that repository migrations must not be
  treated as applied.
- Existing private buckets are `academy-content`, `content-library`, `invoices` and
  `partner_resources`. None is suitable for companion artwork.
- The six deployed Edge Functions are `send-auth-email`, `send-invoice-email`,
  `create-toyyibpay-bill`, `toyyibpay-callback`, `get-invoice-download-url` and
  `send-weekly-parent-report`. `nova-batch-worker` is not deployed.
- `pg_cron`, `pg_net` and `http` are not installed. There is therefore no hosted Nova schedule or
  HTTP cron prerequisite yet.
- Production has 386 profiles: 377 `free` and 9 `paid`. It has 9 active subscriptions: 1 `pro`
  and 8 `premium`. `subscriptions.user_id` is unique; its plan constraint currently permits only
  `basic`, `pro` and `premium`. There is no plan-feature or entitlement table/function.
- Read-only security and performance advisors completed, but they cannot assess Nova objects that
  are not installed. They reported pre-existing non-Nova findings; those findings are outside this
  phase and must not be represented as Nova migration results.

### Existing separate project

`academy-partners-staging` (`zaslkccnwdadsqoixjul`) is active and isolated, but it is a synthetic
partner-system environment, not an AcadeMY application staging baseline:

- it has 11 staging-specific migrations rather than the production history;
- `profiles` contains only `id` and `role`, and `subscriptions` contains only `id`, `user_id` and
  `status`;
- it has no Nova objects, no companion records, no artwork bucket, and no cron/HTTP extensions;
- its only Edge Function is `partner-application`, and its only bucket is `partner_resources`.

It must not be repurposed for Cosmic Companion without explicit ownership approval and a deliberate
baseline plan. Doing so would also risk disturbing partner-system staging tests.

## 2. Entitlement parity fixed locally

Review-only migration `20261020130000_cosmic_companion_entitlement_parity.sql`:

1. creates private, non-Data-API tables for canonical plans, plan features and stored-plan aliases;
2. seeds the full matrix from the same values as `src/config/features.ts`;
3. maps legacy stored values exactly as the application does (`pro` and `paid` → `explorer`,
   `premium` → `captain`, `free` → `basic`);
4. changes `nova_subscription_active` to ask whether the active, unexpired subscription has the
   `cosmic_companion` feature;
5. keeps entitlement mandatory inside the atomic submission transaction;
6. lets an already accepted job continue after subscription expiry while retaining active student,
   role, prompt/DNA, attempt, switch and spending validations; and
7. leaves permanent chosen companions viewable after subscription expiry.

The JSON used by the SQL seed is checked against `PLAN_FEATURES`, and the SQL alias map is checked
against `STORED_PLAN_ALIASES`. Unknown, inactive and expired plans fail closed. The private tables
are inaccessible to authenticated students.

No production subscription constraint is broadened in this phase. The currently stored billing
values remain `basic`/`pro`/`premium`; the alias layer supplies parity without changing billing.

Launch policy remains unchanged: an active, unexpired eligible subscription may start Cosmic
Companion; `basic`/`free` and a profile-only legacy `paid` value do not grant access. A validly
submitted journey may finish after expiry, and a permanently chosen companion remains viewable.
Whether free-tier students should become eligible is an open product decision for launch, not a
Phase 4F engineering change.

## 3. Review-only migration chain

The exact review chain, in order, is:

1. `20261018160000_nova_companion_cards.sql`
2. `20261018160100_nova_studio_batch.sql`
3. `20261018160200_nova_creature_variety.sql`
4. `20261019120000_cosmic_companion_candidates.sql`
5. `20261019130000_cosmic_companion_sharing.sql`
6. `20261020120000_cosmic_companion_artwork.sql`
7. `20261020130000_cosmic_companion_entitlement_parity.sql`

Verified ordering is: the production baseline ends at
`20261016120000_partner_referral_commissions`; the seven approved migrations then start at
`20261018160000` and end at `20261020130000`. The unrelated Maths migration has an older version
(`20261010010000`) and is deliberately not part of the Cosmic Companion release.

Supabase CLI 2.121.0 has no per-file include/exclude selector. Both `db push --include-all` and
`migration up --include-all` would include every migration missing from the target history,
including Maths. Therefore neither command may be run from the normal repository migration
directory for this release.

The safe alternative, requiring explicit staging-application approval, is a temporary allowlisted
migration workdir. It contains the exact production migration files already represented in the
staging history, including the restored partner file, plus only the seven filenames above. It must
not contain `20261010010000_sync_form3_math_quiz_sets.sql`. Run `migration list` and `db push
--dry-run --skip-vault` against the explicit staging project reference without `--linked` or
`--include-all`. Proceed only if the dry run lists exactly the seven Nova/Cosmic files in the order
above. The tracked Maths migration remains unchanged in this repository; no migration-history row
is inserted, removed, renamed or repaired.

## 4. Required isolated staging setup

No suitable, authorised Cosmic Companion staging target is currently available. The safe options
are a dedicated persistent Supabase branch from production or a new dedicated staging project.
Supabase documents that branches have separate database, Auth, Storage, Functions and credentials,
and do not copy production data. Either option can incur cost, so provisioning stops here pending
explicit approval.

The approved target must have:

- a project/branch identity that is explicitly marked non-production;
- a production-compatible migration baseline, followed by the seven review-only migrations;
- separate URL, publishable key, secret/service key and database credential stored only in the
  deployment secret manager—not pasted into chat or committed;
- two fictional student Auth accounts and one active fictional admin account;
- one legacy-card fixture, no copied production learner data and no real recipient email;
- its own private `nova-artwork` bucket and Storage objects;
- `COSMIC_COMPANION_SUBMISSIONS_ENABLED=false`, `NOVA_AI_ENABLED=false` and
  `NOVA_AI_BATCH_ENABLED=false` on first deploy;
- database `enabled=false`, `batch_enabled=false`, `companion_enabled=false`,
  `monthly_cap_microusd=0` and `daily_cap_microusd=0`; and
- no cron schedule until the authenticated, RLS and concurrency gates pass.

Use these names only; values belong in the approved staging secret manager and must never be pasted
into chat or committed:

- target/CLI: `STAGING_SUPABASE_PROJECT_REF`, `SUPABASE_ACCESS_TOKEN`,
  `STAGING_SUPABASE_DB_PASSWORD`;
- application: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
  `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `COSMIC_COMPANION_DNA_SECRET`,
  `COSMIC_COMPANION_SUBMISSIONS_ENABLED`;
- worker: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `NOVA_WORKER_SECRET`,
  `NOVA_AI_ENABLED`, `NOVA_AI_BATCH_ENABLED`; and
- fixtures: `STAGING_STUDENT_A_EMAIL`, `STAGING_STUDENT_A_PASSWORD`,
  `STAGING_STUDENT_B_EMAIL`, `STAGING_STUDENT_B_PASSWORD`, `STAGING_ADMIN_EMAIL`,
  `STAGING_ADMIN_PASSWORD`.

`OPENAI_API_KEY` must remain absent for the zero-cost staging-security run.

## 5. Security verification status

| Gate                       | Local evidence actually executed                                                                                              | Hosted staging result                                                                          |
| -------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| 20 submission requests     | A burst of 20 promises against the full PGlite migration chain produced exactly one card and 19 idempotent `existing` results | **Blocked.** PGlite is single-engine and is not evidence of 20 simultaneous hosted connections |
| Two-session locking        | Row locks, unique ownership and idempotency are covered locally                                                               | **Blocked.** No suitable mutable staging target or two independent Postgres sessions           |
| Draft-change races         | Optimistic revisions, stale-answer rejection and cross-device preservation pass locally                                       | **Blocked** for real sessions                                                                  |
| Authenticated students     | JWT claims/roles are simulated through real PostgreSQL roles locally                                                          | **Blocked** for Supabase Auth sessions                                                         |
| Cross-account privacy      | Other students and anonymous roles cannot see candidate identity or private artwork locally                                   | **Blocked** for hosted Auth + Storage                                                          |
| Artwork/review permissions | Students cannot write/review; active admins alone can approve/reject; unapproved work cannot reveal                           | **Blocked** for hosted Storage/Functions                                                       |
| 24-hour reveal             | Server timestamp plus two distinct approved images is enforced locally                                                        | **Blocked** for real clock/runtime boundary                                                    |
| Permanent choice           | Same choice is idempotent; switching is rejected; unchosen art becomes unreadable                                             | **Blocked** for hosted concurrency                                                             |
| Expired subscription       | New submission is denied; accepted work continues; chosen companion remains viewable                                          | **Blocked** for real subscription rows/sessions                                                |
| Legacy cards               | Legacy payload, sharing, QR/export shape and single-identity worker behavior pass locally                                     | **Blocked** for hosted legacy fixture                                                          |

The hosted run must use a barrier so all 20 requests leave clients before any response is awaited,
and must record request IDs/timestamps. It passes only if there is one card, one Origin job, exactly
two candidates, two DNA rows and no partial/error residue. Two separate database connections must
then hold and contend on the same draft/card row to prove lock behavior rather than client-side
serialization. None of these writes may be run against production.

## 6. Controlled two-image artwork pilot

Current safeguards are fail-closed:

- application AI flags default false;
- all three database generation switches default false;
- daily and monthly authorised spending default to $0;
- reservation is $5.00 per candidate attempt (`5,000,000` micro-USD);
- each candidate is limited to two attempts;
- a batch defaults to two requests and two concurrent unfinished batches;
- failed/rejected or technically invalid artwork cannot reveal;
- both distinct images must pass validation and receive human admin approval; and
- retry requires an active admin, a failed/rejected candidate, remaining attempt capacity and an
  audited reason.

Phase 4F does not authorise this pilot. `OPENAI_API_KEY` remains absent, all AI/worker/database
switches remain false, both caps remain zero, and authorised AI spending remains **$0**.

For one fictional student with two unique companions:

- first attempts reserve at most **$10.00**;
- one bounded retry for each image makes the enforced worst-case reservation **$20.00**;
- actual provider billing may be lower, but no pilot should be authorised on that assumption.

Recommended pilot-only settings are `max_batch_requests=2`, `max_batches=1`,
`reserve_microusd=5000000`, `daily_cap_microusd=20000000` and
`monthly_cap_microusd=20000000`. Keep the staging dataset limited to the one pilot journey so the
worker cannot reserve unrelated jobs.

## 7. Exact authorisation sequence

1. Approve the cost and ownership of a dedicated persistent Supabase branch/project. Do not use
   `academy-partners-staging` or production by default.
2. Reconcile the feature branch with the production migration baseline and review all seven Nova
   migrations.
3. Approve applying them to that staging target only; run security/performance advisors afterward.
4. Approve a Cloudflare Pages preview/staging deployment with staging-only credentials and all
   submission/AI flags false.
5. Create the fictional student/admin fixtures in staging and execute every hosted security gate.
6. Review the evidence. Only then explicitly authorise a maximum **$20** provider budget for the
   named two-image pilot.
7. Set both database caps to exactly $20, keep batch size at two, enable the database and worker
   switches only for the pilot window, and do not add automatic retries.
8. Run one batch, stop the worker, inspect provider usage and both files, then require the fictional
   admin to approve or reject each image.
9. Return all switches and caps to false/$0 immediately after the pilot and archive the audit rows.

No step above authorises production migration, production deployment, merge, push or provider use.

### Staging execution checklist

Every gate is fail-closed. Stop immediately if any asserted identity, history or dry-run output is
unexpected.

1. **Target prerequisite:** obtain explicit approval for a newly isolated staging target. It must
   have a production-compatible schema and migration history but no copied learner data. Record the
   approved placeholder as `<STAGING_PROJECT_REF>`.
2. **Production guard:** assert `<STAGING_PROJECT_REF>` is non-empty and is not production
   `aojrbxoqbgyxmfljqpqj` or partner staging `zaslkccnwdadsqoixjul`. Confirm the resolved project
   name, API URL and database host all say staging. Do not use `--linked`; the repository's linked
   project is production.
3. **History guard:** save read-only migration lists for production and staging. Staging must match
   production through `20261016120000_partner_referral_commissions`. Verify the restored partner
   file's Git blob again. Do not continue if any production version is absent or any unexpected
   later version exists.
4. **Bundle guard:** in a disposable local workdir, copy `supabase/config.toml`, every exact
   production migration represented in the staging history, and only the seven approved files in
   section 3. Generate and review a filename/hash manifest. Assert that
   `20261010010000_sync_form3_math_quiz_sets.sql` is absent. This workdir is the only permitted CLI
   migration source for this release.
5. **Dry-run guard:** run `supabase migration list --project-ref <STAGING_PROJECT_REF>` and
   `supabase db push --project-ref <STAGING_PROJECT_REF> --dry-run --skip-vault` from the allowlisted
   workdir. Do not add `--include-all`. The only pending output may be the seven files in section 3.
6. **Apply gate:** after separate approval, run the same staging-only push without `--dry-run`.
   Re-read migration history, inspect tables/functions/policies/grants and the private
   `nova-artwork` bucket, then run security and performance advisors. Any mismatch ends the run.
7. **Disabled deployment gate:** deploy only to a Cloudflare Pages preview and the staging Edge
   Function project. Initially set `COSMIC_COMPANION_SUBMISSIONS_ENABLED=false`,
   `NOVA_AI_ENABLED=false` and `NOVA_AI_BATCH_ENABLED=false`; omit `OPENAI_API_KEY`; keep database
   `enabled=false`, `batch_enabled=false`, `companion_enabled=false`, `daily_cap_microusd=0` and
   `monthly_cap_microusd=0`. Install no cron schedule.
8. **Authentication/privacy gate:** create two fictional students and one active fictional admin.
   Use real Supabase Auth sessions to prove anonymous and cross-account denial, ownership-scoped
   draft/card reads, hidden candidates before reveal, student denial of upload/review operations,
   and admin-only approval/rejection.
9. **Concurrency gate:** use two independent direct database connections for lock contention and
   stale draft revisions. Separately release 20 authenticated submission requests through a
   barrier before awaiting any response. Require one card, one Origin job, two candidates, two DNA
   rows, 19 idempotent existing results and no partial/error residue.
10. **Artwork/reveal gate:** use non-provider fixture images. Confirm failed, rejected, invalid,
    duplicate and unapproved artwork cannot reveal; both distinct candidates require human admin
    approval; the server-enforced 24-hour boundary cannot be bypassed; the first permanent choice
    cannot be switched; accepted journeys finish after expiry; chosen companions stay viewable;
    and the legacy-card fixture remains compatible.

### Safe rollback

- Before application, rollback is simply deletion of the disposable local bundle; production is
  untouched.
- On migration failure, disable the preview and all feature switches, preserve logs, and stop. Do
  not edit or repair migration-history rows and do not run hand-written down migrations.
- Reset or recreate only the disposable staging branch/project from its clean production baseline,
  and only after explicit approval. Never target production for rollback.
- On application/worker failure, restore the prior Cloudflare preview version, keep AI and cron off,
  and leave both spending caps at zero.

### Post-test cleanup

- Restore submission and all three database switches to false; confirm both caps are zero.
- Confirm no cron schedule, provider key, provider request, generation batch or spend reservation
  remains active.
- Revoke fixture sessions; remove only the named fictional users, rows and Storage objects from the
  isolated staging target.
- Archive migration manifests, request IDs, timestamps, advisor output and pass/fail evidence.
- Delete the temporary allowlisted workdir and any local secret files.
- Re-read production migration history and Nova-object counts using read-only access to prove that
  production remained unchanged.
- Deleting/resetting the staging target requires its own approval; otherwise leave it disabled.

## 8. Local verification result

- Focused Companion, Nova, business-card, portal, matching, Visual DNA, Studio journey, database
  security and artwork-worker mock tests: **334 passed across 37 files**.
- Cards application tests: **8 passed across 2 files**.
- Migration-order coverage confirms the restored partner file exists and the seven approved
  Nova/Cosmic migrations remain ordered after the production baseline.
- Edge Function worker TypeScript check: passed.
- Scoped ESLint and Prettier checks for the Phase 4F files: passed. A broader directory lint remains
  noisy because untouched Windows working-tree files have pre-existing CRLF/Prettier findings; no
  such finding exists in the changed test file.
- Cloudflare Pages production build, including the existing worker packaging script: passed.
- Repository-wide TypeScript reached only the two pre-existing Science test errors at
  `chapter-7-9-10-visual-integration.test.tsx:305` and
  `chapter-9-heat-visuals.test.tsx:523` (`string | undefined` passed to `string`). This is the same
  two-error baseline; no Phase 4F TypeScript error was reported.
- The four unrelated generated files had identical SHA-256 hashes before and after the build.

## 9. Current blockers

1. No approved Cosmic Companion staging target.
2. Provisioning a branch/project may be billable and requires explicit approval.
3. The partner migration file is reconciled, but the unrelated older Maths migration remains
   intentionally tracked and unapplied; the approved staging run must use the allowlisted workdir.
4. Hosted concurrency, Auth, Storage, two-session lock and clock-bound tests require a mutable,
   isolated target.
5. Nova worker deployment, required secrets, `pg_cron`/`pg_net` installation and schedule are absent.
6. The paid artwork pilot remains intentionally unauthorised.

Supabase references used for this plan: [Branching](https://supabase.com/docs/guides/deployment/branching),
[Managing environments](https://supabase.com/docs/guides/deployment/managing-environments),
[Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security),
[Storage access control](https://supabase.com/docs/guides/storage/security/access-control), and
[Scheduling Edge Functions](https://supabase.com/docs/guides/functions/schedule-functions).
