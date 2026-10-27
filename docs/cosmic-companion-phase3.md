# Cosmic Companion Phase 3: real student journey integration (review)

Status: local integration only. **Nothing has run against a real Supabase account.** Migrations
are unapplied, the submission flag is off and AI generation is disabled. Every UI result below
comes from mocked server responses or the connected preview.

## Real-data connection points

| Stage                                                  | Source of truth                                                                | Change                                                                                                                  |
| ------------------------------------------------------ | ------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| New, in progress, waiting, ready, selected (dashboard) | `getNovaDashboardStatus` → `journeyStage`                                      | Adds `unfinished` (draft answers, no card). `ready` no longer needs an active subscription.                             |
| Cosmic Identity personality                            | `companion-profile.ts` (shared with the matcher)                               | New journeys show the dominant personality and cite its supporting answers. Legacy cards keep their stored personality. |
| Submission                                             | `submitStudioOrigin` → `nova_submit_companions` (Phase 2A)                     | Adds a `cosmic_companion` entitlement pre-check. The server, flag and database rules are unchanged.                     |
| Waiting Sanctuary                                      | `origin` (`revealAfter`, `status`, `ready`)                                    | Already real-data driven; copy no longer says "next-day". No companion identity is sent or shown before the reveal.     |
| Two-companion reveal                                   | `state.companions` (stored specifications) plus each slot's own signed artwork | `companionsFromState`. Never rebuilt from the shared identity. The reveal opens only when the server has sent both.     |
| Permanent profile                                      | `state.companion` plus `companionArtworkUrl` (signed selected artwork)         | `CandidateProfile`: chosen companion only, its own story and reasons, plus a "Collection, sharing & QR" link            |
| Legacy cards (`kind: "legacy"`)                        | Unchanged                                                                      | Legacy reveal (`candidatesFromStudio`) and saved-card presentation (`StudioCompletedCard`)                              |
| Sharing, QR, export                                    | `nova_card_payload` (migration `20261019130000`) and `cardFace`                | Matched cards share the chosen companion only (`traits: null`). Legacy cards are unchanged.                             |

### Subscription gating (approved policy)

Only **starting** a journey needs an active entitlement. A submitted journey can wait, reveal
and choose, and a chosen companion stays viewable, with or without a subscription. This applies
in the Studio, on the dashboard and on the collection page. The database enforces the same rule
(Phase 2A).

## Database (review-only) `20261019130000_cosmic_companion_sharing.sql`

1. **`nova_card_payload`**: matched cards return `traits: null`, so the 12 answers are never
   shared, plus the chosen companion's public summary. The legacy payload is identical to before.
2. **`get_public_nova_card`**: a matched card is publicly visible only after a companion is
   chosen.
3. **`get_my_nova_studio`**: after the choice, `companion` omits the one reason that names the
   other candidate ("a different kind of companion from …"). Stored specifications are
   unchanged. The UI applies the same filter as defence in depth.

## Entitlement status

> Phase 4E update (2026-10-20): the mismatch described below is historical context. Read-only
> production inspection confirmed the stored values, and review-only migration
> `20261020130000_cosmic_companion_entitlement_parity.sql` now supplies a private, CI-checked
> feature matrix and alias map. It remains unapplied. See
> `docs/cosmic-companion-phase4e-staging-readiness.md` for the current blockers.

> **MANDATORY RELEASE BLOCKER: entitlement is not production-ready.** The TypeScript feature
> check (`cosmic_companion`) and the SQL plan-name check (`nova_subscription_active`) disagree
> for some stored plan values (below). Cosmic Companion must not be enabled for any student
> until they are reconciled from one source and tested against the real stored plan values.
> The feature is **not enabled**, and the submission flag stays off.

- **Feature added.** `cosmic_companion` is in `FEATURES` and `STUDENT_LEARNING_CORE`, so it
  covers Explorer, Captain, Teacher, School and Enterprise. Basic is excluded.
- **TypeScript uses the feature system.** `resolveNovaEntitlement` → `novaEntitlement()` uses
  `hasFeature(resolveStoredPlan(plan), "cosmic_companion")`. **The TypeScript plan-name check
  (`plan === "pro" || "premium"`) is removed.**
- **Not enabled in production.** Nothing here changes billing or policies, and the submission
  flag stays off.

### Remaining SQL plan-name checks (not changed; release blocker)

`nova_subscription_active(owner)` still checks `plan in ('pro','premium')`. It is used by:

- `nova_submit_companions` (submission);
- `get_my_nova_studio.active`;
- `nova_prepare_batch` and `nova_begin_submission` (paid worker).

**Conflict.** `resolveStoredPlan` maps `paid` (legacy `profiles.plan`) to Captain, and treats
stored plan names such as `explorer` as themselves. The SQL denies both. Effect: the server
pre-check would allow such a student and the database would refuse with a clear error. That is
safe (fails closed) but inconsistent.

**Proposed fix** (needs product approval and the read-only plan-value check): a
`plan_features` table generated from `src/config/features.ts`, with a CI parity test.
`nova_subscription_active` becomes "has `cosmic_companion`". No hand-copied plan names. Not
prepared as a migration yet, because the stored plan values are unverified.

## Remaining fictional-preview dependencies

- **`?preview=rayyan` and `?preview=mia`** still use the hand-written `FICTIONAL_CANDIDATES`
  (Lumi and Sol). They are kept as the design and testing facility.
- **`?preview=connected`** runs the real account rendering path with
  `connected-preview-fixture.ts`. That is the real matcher's output for the preview student's
  answers, guarded by a drift test. It ships those two fictional companions only: no matcher,
  catalogue or weights, which a build scan confirms.
- **Preview tags remain in previews.** Real accounts never show them.

## Tests

**Mocked integration (jsdom, realistic `get_my_nova_studio` responses):**

- `real-journey.interaction.test.tsx`: 15 tests covering:
  - Cosmic Identity consistency;
  - the 24-hour wait;
  - waiting after 24 hours without artwork;
  - failure;
  - "ready" without specifications;
  - Check arrival;
  - two independent companions with their own artwork;
  - explore;
  - choose B, so only B appears;
  - choice failure;
  - returning student;
  - an expired subscription finishing a journey;
  - an expired subscription viewing;
  - legacy reveal and legacy saved card.
- `studio.interaction.test.tsx` is updated to the approved policies. It covers lapsed viewing,
  lapsed waiting, and a plan being required only to begin.
- `companion-data.test.ts`: entitlement by feature, data mapping, card faces and fixture drift.
- `journey.test.ts`: the dashboard `unfinished` stage.

**Database (PGlite, full five-migration chain):** `cosmic-companion.db.test.ts`, including:

- matched cards sharing no answers;
- matched cards private until chosen;
- the chosen view not naming the other candidate;
- the grant allowlist (unchanged).

**Not covered here:** a real authenticated Supabase account, real Storage signed URLs, real
subscriptions. Those are staging tests (below).

## Phase 4 artwork dependencies

- **No reveal is possible without two ready, approved artworks.** Matched cards are excluded
  from the paid worker.
- **Library-first assets:** human-reviewed masters per archetype, automatic validation for
  reuse, and reveal readiness that accepts library assets.
- **Per-candidate artwork** in the card frame; until then the UI shows mystery silhouettes.
- **Bespoke AI** behind a future separate entitlement, with review before release.

## Mandatory release blockers

1. **Entitlement:** reconcile the TypeScript `cosmic_companion` check with SQL
   `nova_subscription_active` from one source. Verify against the real stored plan values.
2. **Artwork:** no reveal is possible until Phase 4 provides two approved artworks per card.
3. **Migrations:** `20261018160000` through `20261019130000` are review-only and unapplied, and
   production history is unverified.
4. **Concurrency:** true parallel submission has been verified only in serialised form
   (PGlite). The staging multi-connection tests are mandatory.
5. **No real-account test yet:** every UI result is from mocked responses or the connected
   preview.

## Staging and production prerequisites

1. **Run the Phase 2A read-only production checks** (`docs/cosmic-companion-phase2a.md`), plus:
   `select distinct plan from public.subscriptions;` and, if the column exists,
   `select distinct plan from public.profiles;`
2. **Staging:** apply the Nova chain through `20261019130000`; deploy with
   `COSMIC_COMPANION_SUBMISSIONS_ENABLED` unset; run the Phase 2A concurrency tests.
3. **Staging, with a real test student** (flag on in staging only):
   - draft, then submit, then wait;
   - simulate artwork readiness with service-role test data;
   - reveal, choose and return;
   - lapse the subscription at each stage;
   - share, open the QR link, export;
   - confirm a legacy card is unchanged.
4. **Production:** migrations, then app deploy, then the flag (after Phase 4 artwork and product
   approval). Rollback is to unset the flag.
