# Nova Studio — implementation and activation review

PR #68 extends the existing five-stage Nova system. No production migration,
deployment, scheduler installation or paid generation is part of this change.

## Preview

- `/nova/studio` — authenticated, durable Studio; existing sessions are reused.
- `/nova/studio?preview=rayyan` and `?preview=mia` — public, explicitly fictional
  UI walkthroughs. Scene buttons show welcome, quiz, identity, waiting, reveal
  and selection. State lives only in memory and resets when the scene changes.
- `/nova` — existing collectible/settings page, now links creation to Studio.
- `/nova/demo` — preserved Origin/Awakened SVG evolution study.
- `/card/c/:publicId` — preserved permanent QR destination and sharing controls.

Fictional previews use existing SVGs. These are functional placeholders, **not
approved cinematic AI artwork**. No production-quality generated candidates
are claimed. Two real candidates require approval and a staging trial. SVG
cannot reproduce the brief's painted textures, nuanced cinematic lighting or
fine organic anatomy at the requested quality.

## Identity, queue and release

`20261018160000_nova_companion_cards.sql` remains the base migration. The additive
`20261018160100_nova_studio_batch.sql` extends its cards, jobs, artwork and
private Storage bucket. It also creates owner-only draft RPCs, a service-only
candidate queue, batches, request ledger, budget settings and audit events.

The additional review-only `20261018160200_nova_creature_variety.sql` expands
creatures to Phoenix, Magical Fox, Dragon, Lion and Unicorn, and adds one fourth
option to each other question. Code 2 remains legacy Phoenix; new species use
3/4/5. Validation widens by question position, with matching shared app/worker
validation. Existing rows and immutable identities are unchanged. This migration
is tested only in local PGlite and must precede any future expanded-choice rollout.

All twelve answers are saved after each choice with an optimistic revision.
Concurrent edits from another device fail visibly rather than overwrite a newer
draft. Failed saves do not advance the quiz. Submission uses the saved draft;
existing cards keep their original answers, UUID, serial, rarity and sharing.
The versioned identity contains all mapped traits. A trigger prevents identity
replacement. No username, email, age, school identifier or account identifier
is sent to OpenAI; random opaque custom IDs associate requests.

Origin has exactly two candidate slots and one unique job per permanent card.
Each later stage has one candidate. Retries reuse those slots, with at most two
paid attempts per candidate. A transaction locks settings while reserving a
conservative amount for each attempt, then claims compatible rows with
`FOR UPDATE SKIP LOCKED`. Concurrent workers cannot exceed the database's
budget reservation or active-batch limits. Default: at most two active batches,
two requests per batch; low/medium portrait PNG only. Grouping is by configured
model and endpoint. Single claims, unique attempts and durable provider IDs
prevent double-click/refresh/restart from submitting additional paid work.

Origin release requires **both** distinct SHA-256 digests, complete validated
1024×1536 PNGs, an active subscription, and midnight on the following calendar
day in Asia/Kuala_Lumpur. Finishing early does not reveal early. Batch may take
24 hours; pending UI makes no promise about tomorrow morning. PNG validation
checks chunks, CRC, dimensions, colour format and complete bounded zlib data.
This validates file integrity, **not** semantic art quality or identity fidelity.
Visual acceptance of live results remains a staging gate.

Only the owner can view the two candidates after that gate. After permanent
selection, the unselected image loses read access for owner and public APIs.
Sharing continues to expose only the selected current approved stage. Signed
URLs last 60 seconds; previously issued URLs may remain usable until expiry.
Card exports re-authorize the card and refresh its signed artwork URL at click time.
Earlier selected stages remain immutable and accessible to the eligible owner.
Account deletion can still cascade through the artwork and request tables.

Evolution uses the same identity specification plus private copies of both the
previous approved image and chosen Origin anchor, sent as inline PNG data URLs
to avoid signed URL expiry during Batch processing. References are capped at
14 MiB each. The supported JSON edit contract uses `images: [{image_url:…}]`.
**Phase 1: evolution is disabled and independent of XP.** `request_nova_evolution`
fails closed, the queue and request finisher accept stage 1 (Origin) jobs only, and
release never selects stage 2-5 artwork. No Cards function reads AcadeMY XP. The
evolution worker contract above is retained for a future phase whose XP authority
is proposed in `docs/cards-xp-ledger-design.md`. Payments and ToyyibPay are untouched.

## Models and cost accounting

Official documentation reviewed 17 October 2026:

- [Batch API](https://developers.openai.com/api/docs/guides/batch): supports
  `/v1/images/generations` and `/v1/images/edits`, unique custom IDs, one model
  per file, and a 24-hour completion window.
- [Flare](https://developers.openai.com/api/docs/models/gpt-image-2.5-flare):
  chosen for initial generation speed; default pinned `2026-09-08` snapshot.
- [Sunburst](https://developers.openai.com/api/docs/models/gpt-image-2.5-sunburst):
  chosen for precise editing; default pinned `2026-09-08` snapshot.
- [Image edits JSON contract](https://developers.openai.com/api/reference/resources/images/methods/edit).
- [Supabase scheduled functions](https://supabase.com/docs/guides/functions/schedule-functions):
  pg_cron + pg_net with secrets stored in Vault.

Both model families document $30 per million image output tokens for Standard,
$15 for Batch. The implementation records raw usage and an explicit estimate
using conservative uncached Standard input rates ($5 text / $8 image input per
million) and the $15 Batch output rate. Missing usage remains unknown, never
zero. This estimate is not an invoice; actual provider billing is authoritative.

Default monthly cap is **zero** and both database flags are **false**. Each
attempt reserves at least **$5 USD** of the cap, deliberately much higher than
the expected cost of bounded low/medium portrait requests. Reservations are
never refunded within their Malaysian calendar month, including failed,
expired or uncertain attempts. Retries require a fresh reservation. The cap
therefore controls conservative reserved exposure, not an OpenAI billing hard
limit. Revalidate the reservation against current pricing and live token usage
before launch; additionally set an OpenAI project billing limit. If a logged
estimate exceeds its reservation, database generation is automatically disabled.
Increasing quality, size or changing model families requires code/schema review.

Service-only monitoring queries:

```sql
select budget_month, count(*) as attempts,
  sum(reserved_microusd)/1000000.0 as reserved_usd,
  sum(estimated_cost_microusd)/1000000.0 as estimated_usd,
  count(*) filter (where usage is null) as unknown_usage
from public.nova_batch_requests group by budget_month;
select status, count(*) from public.nova_generation_batches group by status;
select * from public.nova_generation_audit order by created_at desc limit 100;
```

## Safe recovery

Provider POSTs have no automatic network retry. A timeout or acknowledgement
failure moves the batch to `review`; a crashed `submitting` batch is quarantined
after 15 minutes. Its reservation remains charged against the cap. It must
**never** be reset to `prepared`. An operator must find the original OpenAI
batch using `metadata.nova_batch_id`, verify the matching input/custom IDs,
then call service-only `nova_attach_batch(local_id, provider_id, input_file_id)`.
This resumes collection without another image request. Provider dashboard/list
inspection is intentionally manual; no uncertain submission is auto-resubmitted.

Output is mapped by custom ID, not line order. Unexpected/duplicate IDs quarantine
the batch. Transient result download or Storage failures retry collection of
the same batch; deterministic hash paths and immutable uploads allow restart.
Confirmed unexecuted expired rows or explicit 429s retry after 15 minutes, up to
two attempts. Successful rows in a partly expired batch are retained. Invalid,
duplicate or rejected images fail visibly and do not automatically regenerate.
An administrator may use `nova_admin_retry(candidate_id, audit_reason)` only
for terminal failed candidates with an attempt remaining. Review candidates
must first reconcile the provider, never use that retry RPC. For reviewed
collection problems with a known batch ID, use
`nova_admin_resume_collection(batch_id, audit_reason)`. These RPCs are unavailable
to authenticated students and anonymous callers. Use a backend administrator
session; never expose service-role credentials in a browser or admin UI.

## Staging and production approval checklist

0. **Release blocker — migration order.** The Cards migrations are versioned
   `20261018160000`, `20261018160100` and `20261018160200` so they sort after
   `20261016120000_partner_referral_commissions.sql`, the latest migration on
   `origin/main`. Production's applied migration history has not been confirmed.
   Before staging, list the applied versions (read-only) and confirm none is
   later than `20261018160000`; if one is, re-version the Cards migrations and
   update `src/features/nova-cards/migration-order.test.ts`.
1. Review all three unapplied migrations against the existing subscription and profiles schema.
   Apply only to a disposable/staging database first. Run RLS tests and Supabase
   security/performance advisors there. Local PGlite tests do not replace a real
   Storage, Auth, cron and Edge runtime integration test.
2. Configure server-only `SUPABASE_URL`, anon key/session settings for the app.
   App server flags `NOVA_AI_ENABLED=false`, `NOVA_AI_BATCH_ENABLED=false` initially.
3. Deploy `nova-batch-worker` to staging only after approval. Configure
   `SUPABASE_SERVICE_ROLE_KEY`, `OPENAI_API_KEY`, dedicated random
   `NOVA_WORKER_SECRET` (minimum 32 characters), and the two flags initially false.
   Never use `VITE_` prefixes for these secrets. The handler accepts POST only
   with the scheduler secret; a student JWT alone is insufficient.
4. Review `supabase/nova-scheduler.review.sql`, store matching Vault secrets and
   install its ten-minute schedule in staging after approval. Overlapping ticks
   are protected by database claims and collection leases. No schedule is created
   by these migrations. Inspect local worker logs without logging secrets/prompts.
5. Set an approved small cap, retain $5+ per-attempt reservation, then enable
   database and server flags **only after explicit paid-test approval**. Run the
   fictional Phoenix/Fox profiles through the actual provider in staging, inspect
   both artworks for identity, quality, safety and distinctness, test edits with
   approved image references and inspect billed usage. Tune art direction only
   after that evidence. No live provider output is part of this implementation.
6. Exercise cross-device drafts, expired subscriptions, cancellation/reactivation,
   midnight boundary, partial expiration, server restart after provider acceptance,
   collection crash, budget exhaustion, choice race and public/private signed URLs.
   Check dashboard bundle boundaries, real mobile/desktop layout, keyboard focus,
   screen reader status and reduced motion in a browser.
7. Review readiness with the user before any production migration, deployment,
   cron activation, merge or charge. Keep PR #68 unmerged. Roll back by disabling
   server and database flags and unscheduling cron; preserve existing identities,
   approved artwork, usage records and outstanding provider batch IDs.

## Automated verification

Mock provider fixtures use the fictional Phoenix and Fox. No test reads an
OpenAI key or sends a real provider request. Coverage includes twelve-question
durability, optimistic conflicts, isolated UI imports, JSONL contracts, shuffled
result mapping, PNG integrity, duplicate submission claims, uncertain POST
quarantine, monthly reservation cap, next-day dual-image gate, permanent
selection, Storage RLS, subscription and active-student guards, fail-closed evolution
and evolution identity anchors.

Commands:

```text
node node_modules/vitest/vitest.mjs run src/features/nova-cards src/features/business-card
node scripts/check-nova-worker-types.mjs
node node_modules/typescript/bin/tsc --noEmit --pretty false
npm run build
```

The repository-wide TypeScript baseline has two unrelated existing science test
errors (`string | undefined` passed to a string parameter). Actual browser visual
verification and live Supabase advisors/runtime validation must be reported
separately from the mocked and local SQL checks; they are not implied by passing CI.

Local result for this change: **60 focused tests passed across 10 files**, including
24 PostgreSQL/RLS tests and both complete fictional UI journeys in JSDOM.
The Edge Function TypeScript check, scoped ESLint and full production build
(including Cloudflare Pages artifact packaging) pass. Broad TypeScript still
reports only the two pre-existing science test errors described above. The
previous Nova DB query typing error was corrected without changing its behavior.

Desktop/mobile CSS and reduced-motion behavior are implemented; actual browser
visual verification was not performed because local-page automation was refused
by the browser URL policy earlier in this task. No bypass was attempted. Real
Supabase advisors, Edge/Storage/cron integration and paid provider quality/usage
validation remain staging gates. **Ready for code review; not activated for production.**
