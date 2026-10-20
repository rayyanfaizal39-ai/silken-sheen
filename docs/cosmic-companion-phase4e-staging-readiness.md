# Cosmic Companion Phase 4E — staging readiness

Status date: 2026-10-20 (Asia/Singapore). Branch checkpoint audited: `4ffe959a` on
`feature/companion-gateway-fable`.

This report distinguishes read-only hosted evidence, local tests and staging tests that remain
blocked. No hosted database was changed, no project or branch was provisioned, no deployment was
made and no AI provider was called.

## 1. Read-only Supabase evidence

### Linked production project

- Local `.supabase/config.toml` links to the active healthy Supabase project `AcadeMy`
  (`aojrbxoqbgyxmfljqpqj`, Singapore).
- The hosted migration history has 46 entries. Its newest entry is
  `20261016120000_partner_referral_commissions`.
- The repository and hosted histories are not currently identical:
  - hosted but absent from this feature branch:
    `20261016120000_partner_referral_commissions`;
  - local but unapplied remotely:
    `20261010010000_sync_form3_math_quiz_sets` and all seven Nova/Cosmic migrations from
    `20261018160000` through `20261020130000`.
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
3. maps legacy stored values exactly as the application does (`pro` → `explorer`, `premium` and
   `paid` → `captain`, `free` → `basic`);
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

## 3. Review-only migration chain

The exact review chain, in order, is:

1. `20261018160000_nova_companion_cards.sql`
2. `20261018160100_nova_studio_batch.sql`
3. `20261018160200_nova_creature_variety.sql`
4. `20261019120000_cosmic_companion_candidates.sql`
5. `20261019130000_cosmic_companion_sharing.sql`
6. `20261020120000_cosmic_companion_artwork.sql`
7. `20261020130000_cosmic_companion_entitlement_parity.sql`

Before this chain can be applied anywhere hosted, the target must have a reviewed production
baseline that includes `20261016120000_partner_referral_commissions`, and the team must decide how
to reconcile the unapplied older local migration `20261010010000_sync_form3_math_quiz_sets`.

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

Required credentials should be injected as `STAGING_SUPABASE_URL`, a staging publishable key, a
staging secret/service key, and the staging database password/access token through the chosen
secret manager. Test account passwords belong there as well. None is required in chat.

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

## 8. Local verification result

- Companion/business-card tests: **295 passed across 29 files**.
- New entitlement/worker database tests: **5 passed**, included in the total above.
- Edge Function worker TypeScript check: passed.
- Scoped ESLint and Prettier checks for the Phase 4E change set: passed.
- Cloudflare Pages production build, including the existing worker packaging script: passed.
- Repository-wide TypeScript reached only the two pre-existing Science test errors at
  `chapter-7-9-10-visual-integration.test.tsx:305` and
  `chapter-9-heat-visuals.test.tsx:523` (`string | undefined` passed to `string`). No Phase 4E
  TypeScript error was reported.
- The four unrelated generated files had identical SHA-256 hashes before and after the build.

## 9. Current blockers

1. No approved Cosmic Companion staging target.
2. Provisioning a branch/project may be billable and requires explicit approval.
3. Hosted/local migration histories diverge at `20261010010000` and `20261016120000`.
4. Hosted concurrency, Auth, Storage, two-session lock and clock-bound tests require a mutable,
   isolated target.
5. Nova worker deployment, required secrets, `pg_cron`/`pg_net` installation and schedule are absent.
6. The paid artwork pilot remains intentionally unauthorised.

Supabase references used for this plan: [Branching](https://supabase.com/docs/guides/deployment/branching),
[Managing environments](https://supabase.com/docs/guides/deployment/managing-environments),
[Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security),
[Storage access control](https://supabase.com/docs/guides/storage/security/access-control), and
[Scheduling Edge Functions](https://supabase.com/docs/guides/functions/schedule-functions).
