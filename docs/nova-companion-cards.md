# Nova Companion Cards — review and preview

This is an additive feature on `feature/nova-companion-cards`, based on main commit
`d266d9f483c9f61ea097ebfb6026074a819d18d4`. Do not merge or deploy without review.
No production database changes, deployment, or paid AI generation were performed.

## Phase 1 status: independent of AcadeMY XP

Phase 1 launches personal companion cards without any dependency on the AcadeMY XP
system. Saved cards are permanent **Origin Master Cards** (stage 1). The Cards
migrations never read or write `user_progress`, `quiz_xp_awards`,
`mission_reward_claims` or any other XP table, and card payloads contain no XP.
`request_nova_evolution` fails closed, and no stage 2-5 job or artwork is created or
released. `STAGES` and `evolution()` remain in `model.ts` only for the fictional demo
and evolution design previews. A future XP-backed evolution phase is proposed in
`docs/cards-xp-ledger-design.md` and requires approval. Sections below that describe
XP thresholds, verified XP, baselines or snapshots record the earlier preview and are
superseded by this section.

## Local preview

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5180
```

Open `http://localhost:5180/nova/demo` for both fictional Stage 1 cards:

- Rayyan: `http://localhost:5180/card/c/demo-rayyan`, serial `000000000001`.
  Phoenix, Fire, Explorer, Obsidian Black / Violet, Cosmic Galaxy Eyes.
- Mia: `http://localhost:5180/card/c/demo-mia`, serial `000000000002`.
  Magical Fox, Water, Explorer, Sapphire Blue / Gold.
- Creation and owner settings: `http://localhost:5180/nova`.
  All twelve questions and both sample design choices work without Supabase.
  Saving a real permanent identity requires a registered account and the reviewed migration.

Demo records are code-defined, explicitly fictional, and never inserted into student tables.
Their low serials are reserved separately from the live sequence, which starts at 1000000.
QRs use the origin being previewed, so a local demo points back to the local demo;
opening it from a different device requires an accessible preview host.

## Features and files

- `src/features/nova-cards/model.ts`: twelve questions, typed traits, fixed demo identities,
  five stage names (XP thresholds are used only by fictional previews) and permanent URL helpers.
- `artwork.ts`: original vector sample creatures with two distinct design silhouettes,
  persistent species/palette/eye identity and five earned visual transformations.
- `NovaCard.tsx`, `nova-cards.css`: portrait fantasy card, official purple/yellow AcadeMY
  icon, navy/gold styling, holographic sheen, keyboard/touch flip, reduced motion,
  Origin Master Card status, QR, serial, Code 128 barcode, sharing and image export controls.
- `codes.ts`: high-error-correction QR with a four-module quiet zone; standards-based
  Code 128 C with start, checksum, stop and ten-module barcode quiet zones.
- `download.ts`: self-contained 1200 × 1800 PNG export with embedded brand/art/QR/barcode.
- `server.ts`: owner loading, opt-in sharing and public allowlist RPCs. Creation uses the
  Studio draft → submit → select flow in `studio.server.ts`.
- `head.ts`, `public/nova-cards/preview.png`: canonical, noindex, OG and Twitter metadata
  with a generic 1200 × 630 branded sample preview. Private cards contribute no personal metadata.
- `src/routes/nova.tsx`, `nova_.demo.tsx`, `card_.c.$publicId.tsx`: independent studio,
  gallery and public viewer. The trailing underscore avoids nesting below the existing `/card`.
- `src/routes/companion.tsx`: adds a link to the new studio; legacy progression stays intact.
- `src/components/AppShell.tsx`, `src/routes/__root.tsx`, `src/lib/onboarding-routing.ts`:
  minimal public layout and onboarding exemptions for the new routes.
- `src/server.ts`, `vite.config.ts`: no-store responses and exclusion from offline document
  caching; public card state rechecks on tab focus/visibility return.
- `src/routeTree.gen.ts`: generated registrations for the three new routes.
- `scripts/generate-nova-preview.ts`: reproducible local vector-to-PNG sample preview.
- `scripts/verify-nova-download.mjs`: independently decodes codes from a real exported card.
- Two new test files in the feature module cover model, code scanning, SQL and RLS behavior.
- `package.json`, `package-lock.json`: move existing `qrcode` into runtime dependencies;
  add ZXing and Sharp as development-only decoding/rendering dependencies.

The existing `src/routes/card.tsx`, `card.css`, `src/features/business-card/`,
`src/hooks/use-progress.ts`, `src/companion/`, and `supabase/schema.sql` are unchanged.
No curriculum content changes are included. Build-generated curriculum drift is excluded.

## Supabase migration requiring review

`supabase/migrations/20261018160000_nova_companion_cards.sql` is **not applied** to a remote database.
It is exercised only against an isolated PostgreSQL-compatible PGlite test database.

Review it before staging. It does not depend on AcadeMY progress or XP tables:

1. `nova_cards` gives each owner one immutable identity, separate server-generated UUIDs
   for internal and public IDs, and a unique twelve-digit Code 128 serial. No auth UUID is
   placed into a public URL. Retrying creation returns the original chosen identity.
2. RLS allows only owner SELECT on base card rows. API roles cannot directly insert,
   update or delete cards, alter rarity, replace a design, or generate identities.
   Personal RPCs derive ownership from `auth.uid()` and require an active, non-anonymous
   student profile.
3. `get_public_nova_card` looks up the opaque public UUID only (the sequential-serial
   lookup is dropped) and returns an explicit safe payload only when sharing is enabled. Missing and private cards both return null. No owner UUID, email,
   school, real name, private answers, internal card ID or future artwork is returned.
4. There is no XP baseline, verified-XP function or XP snapshot column. Every saved card
   is shown at the permanent Origin stage (`nova_visible_stage` returns 1).
5. Rarity is a separately controlled field and never changes because a stage changes.
6. `nova_generation_jobs`, `nova_artwork`, and private `nova-artwork` Storage support
   future generation jobs, versioned prompts, identity snapshots, two candidate slots,
   exactly one selected artwork per stage and explicit release flags. Only service-role
   processes write them. Storage access requires selected, released **Origin** art plus
   ownership or current public sharing permission. Future/unselected art is denied.

To verify the live integration after migration approval: sign in on staging, finish all
twelve questions, choose a design, save, retry creation, then toggle public sharing.
Use an anonymous second browser to check public visibility before/after revocation.
Confirm the card shows as a permanent Origin Master Card, that earning XP elsewhere in
AcadeMY does not change it, and that the URL, serial and rarity stay the same.

## Validation

Targeted regression suite: **216 tests passed across 18 files**.

```sh
npx vitest run src/features/nova-cards src/features/business-card src/companion \
  src/hooks/use-progress.test.ts src/lib/onboarding-routing.test.ts \
  src/lib/daily-missions.test.ts src/lib/daily-mission-progress.test.ts \
  src/lib/mission-system.test.ts src/lib/mission-claim-contract.test.ts \
  src/lib/progression-events.test.ts src/lib/home-progress-summary.test.ts src/features/quiz/xp
npm run build
```

Tests decode both generated QR PNGs using jsQR, independently decode Code 128 via
ZXing, rasterize barcodes at mobile/export sizes, verify five-stage threshold parity,
immutable design/identity, unique public IDs/serials, RLS, direct-write rejection,
public/private/serial access, sharing revocation, XP preservation and future-art restrictions.
The existing business-card QR decoding test passes as part of the regression suite.

Browser checks: desktop gallery; mobile layout and flip; all twelve creation questions;
both design choices; all artwork/code images loaded; no horizontal overflow at 320 px and 390 px;
real 1200 × 1800 browser PNG download independently decoded with:

```sh
node scripts/verify-nova-download.mjs <downloaded-png> demo-mia 000000000002
```

Production build passes. Scoped ESLint/formatting passes.
The broad TypeScript check reports two pre-existing errors in untouched science tests:

- `src/content/form2/science/chapter-7-9-10-visual-integration.test.tsx:305`
- `src/content/form2/science/chapter-9/chapter-9-heat-visuals.test.tsx:523`

Both pass `string | undefined` to a string parameter. No Nova type errors remain.

## Known limitations and intentional boundaries

- The implementation uses original sample vector artwork. A paid AI provider,
  generation worker and student selection of future AI-produced candidates are not wired;
  their storage/job seams are present. No AI generation calls were made.
- QR logos are not overlaid: the official icon is on both card faces and in the export.
  The verified, unobstructed QR configuration retains its quiet zone.
- Open Graph uses a generic collection preview, not a per-student raster endpoint;
  social-network preview caches cannot guarantee immediate removal of a previously shared preview.
- Signed future-art URLs expire after 60 seconds. Revoking sharing immediately blocks new
  card/storage requests but cannot revoke a previously issued URL before expiry or erase
  an image someone already downloaded. An already open card refreshes on focus/visibility.
- Real-account end-to-end creation and live Supabase Storage still need a staging check
  after migration review; no production credentials or database were used here.
- Legacy companion UI remains compatible and still follows its existing five-stage model.
  Nova cards have five stages and contain no egg or hatching features or future-stage art gallery.
- Card refresh is explicit on the owner page; there is no realtime progress subscription.
- Stage and rarity labels are feature copy, not curriculum content.

UNSOURCED LEARNER-FACING CURRICULUM CONTENT ADDED: NONE.

## Follow-up: five-stage evolution and billing reactivation

- Stages: Origin 0 XP, Awakened 1,600, Ascended 9,000, Mythic 32,000, Legendary 80,000. Rarity is independent.
- Only active Pro/Premium subscribers with a paid period ending in the future can create a Nova or request a future evolution job. SQL and server both enforce this; no payment provider was added.
- A cancelled/expired student sees a premium locked teaser at `/nova`, not their active companion. A pending payment shows verification messaging. Outages are not mislabeled as expiry.
- Previously approved art, personal public ID, serial, QR and barcode persist. Public sharing remains opt-in; public XP and artwork stay on the last paid snapshot when inactive. XP earned without visiting Nova while paid may not appear in the frozen snapshot, but is preserved in the original verified XP ledger.
- `nova_generation_jobs` uses `(card_id,stage)` uniqueness. The guarded queue checks the verified XP threshold and preceding approved stage; it does not call a paid generator. Stage 1 still uses temporary SVG demo art, not a live AI generator. Real AI stage-1 candidate selection remains future work.
- `/companion` redirects to `/nova` so the legacy egg/hatching screen cannot remain an alternative paid/anonymous companion experience. XP award paths and user progress remain untouched.
- On successful ToyyibPay verification, the payment return page offers a Nova link only for a same-browser checkout initiated from the Nova teaser. Existing payments otherwise keep their dashboard return.
- Branch-only development: no production database migration, production deployment, live paid AI calls or real payment tests performed.

## Existing preview failures

Cloudflare Pages is the only supported hosting service for AcadeMY. GitHub reported a failed Pages check on initial commit `68961c0`; that historical failure needs authenticated Cloudflare logs before attributing a cause. The Cloudflare config in `vite.config.ts` depends on `scripts/build-pages-worker.js` and root `wrangler.jsonc`; confirm the deployment root and generated output against those logs. The current Nova validation workflow compiles and tests without deploying.

## Stage 2 — Awakened visual experiment

`/nova/demo` now opens an Origin / Awakened comparison for each fictional companion.
Each character has independent **Compare both**, **Stage 1 — Origin**, and
**Stage 2 — Awakened** buttons. Both artworks appear side by side on desktop and
stack below 600 px. The original interactive cards remain in an expandable section.

The Phoenix gains layered wings, three flowing plume feathers, a fuller crest,
gentle violet flames, cheek markings and a small pendant. The Fox gains three
fuller tails, a neck ruff, longer detailed ears, celestial markings, a water pendant
and water ribbons. Both retain the original face, eye shapes and main colours.

This uses an explicit `companionPreviewSvg` path in the existing SVG engine.
`companionSvg` output for all five existing earned stages is protected
by before/after hash tests. Student progression, thresholds, stage names, fixtures,
public URLs, serials, database schema and persistence behavior are unchanged.
The preview uses the existing Origin and Awakened names without changing the five-stage model.

New files: `EvolutionPreview.tsx`, `awakened-artwork.ts`, and two preview test files.
No AI provider or paid generation is involved. SVG supports clear silhouettes,
layered feathers, gradients and controlled magical detail here; this prototype
remains a stylized vector illustration rather than painted fur or cinematic fire/water.
Browser automation was blocked by the local-page URL policy during this experiment;
SVG rendering and independent switching behavior are covered by local tests.
The current Nova and business-card test suites pass 35 tests across six files.
The broad TypeScript check still reports upstream errors in the two science tests
listed above and `nova-cards.db.test.ts:293` (an untyped query result). These files
are unchanged by the visual experiment; the new preview files have no type errors.

The approved cinematic art direction in `docs/nova-master-art-direction.md` remains
the production target. This SVG anatomy study does not claim the painted surface
detail and cinematic finish specified in that brief.
