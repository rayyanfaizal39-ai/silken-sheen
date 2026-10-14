# AcadeMY Companion Card System — Phase 1 Design Guidelines

Status: **prototype review only**. No student cards, ownership, real QR links, rarity awards, subscription changes, Supabase tables, or deployment are created by this branch.

## Context from the existing Junior application

- Founder business card: src/routes/card.tsx — must remain unchanged.
- Student's real XP companion: src/routes/companion.tsx, src/companion/CompanionImage.tsx and src/companion/species.ts.
- Existing Nova artwork: public/companions/nova/ (stage-specific assets). Reuse these visual references; do not replace existing hatching/evolution logic.
- Preview-only route: /companion-cards-preview (not linked from student navigation). One renderer, twenty illustration/layout combinations; NOT a permanent card route.

## Product philosophy

**The student is the astronaut. Nova is the companion.**
One enduring companion identity per student initially, with personality-driven cosmetics and learning-earned growth. No student portrait on the companion card. The two earlier fox/owl concept mockups establish premium visual ambition but do **not** establish a final species or master asset; they need art-direction approval first.

## Layer rules

- Core shape: One approved Nova silhouette/face and evolution stage assets. No fresh text-to-image generation for each student.
- Personality: Explorer (#69d9e7), Strategist (#8ba8ff), Challenger (#ff9b63), Creator (#eab2fc).
- Look slots: controlled palette, marking, accessory, scene and border pattern from a versioned approved library.
- Personalization inputs: ten balanced scenario questions; optional Western/Chinese zodiac as **symbolic art inspiration only**; optional favorite animal, element, companion temperament and scene preference.
- Zodiac never determines personality, academic ability, difficulty, entitlements, rarity or self-worth. Don't request or infer date of birth.
- No personality diagnosis or claims such as "Pisces students are independent." Every person can express independence, regardless of sign.
- Profile score: one answer per question; each maps to exactly one archetype. Highest score wins; ties use earliest answer belonging to tied archetypes; store quiz version.
- Artwork generation: AI may help curate reviewed asset packs and write moderated character names/lore. Production card configuration and approval must use controlled code and database constraints, not an image model's memory.

## Physical/digital design

- Portrait ratio 2:3; eventual export target 900x1350.
- Obsidian/navy backdrop with gold frame and a personality accent; readable at mobile width.
- Front: brand, archetype emblem, dominant recognizable Nova artwork, approved cosmetic markings, companion alias, element, rarity (only if genuinely earned), level.
- Back: public alias, traits, approved achievements, *real* QR when Phase 2 has issued a stable public URL, short visible ID. Never print a dummy QR that pretends to work.
- Static by default: no 3D runtime/render service; optional CSS tilt/hologram later must respect reduced motion.
- Maintain distinct visual hierarchy: artwork > name > archetype > progression > decorative details.
- Evolution: character identity and URL stay fixed; versions store changing visuals and unlocks.

## What "unique" means

1. **Guaranteed:** a unique owner-card record and random, unguessable stable public token (Phase 2 DB schema/RLS).
2. **Guaranteed:** no duplicate normalized *configuration* among reserved primary designs via DB-level unique fingerprint and atomic issuance (Phase 2).
3. **Quality objective:** prominent visual slots differ in at least 3 positions from nearby issued designs. Preview demonstrates this among 20; a production allocator must implement scalable neighborhood checks, capacity exhaustion policy and concurrency tests.
4. **Not guaranteed:** perceptual originality of every AI-produced image. AI prompts alone cannot enforce global uniqueness.
5. Profile name or zodiac can repeat; permanent card identity is independent from names.

## Sharing and safeguarding students

- Default private/unlisted until permitted user sharing; public mode is explicit and reversible.
- Public cards show alias/companion data only, no full name, school, age, location, email, rank or payment status by default.
- Public token is not an authentication credential and cannot be used to mutate a card.
- QR must link to /card/c/:publicToken only after private/public behavior and token issuance are implemented and verified.
- Avoid exposing personal data in OG metadata or generated preview thumbnails.
- The card remains owned across plan changes; feature gating only controls future customization, not deleting identity.

## Rarity rules (not yet implemented)

- Personality and zodiac do NOT award rarity.
- Common is the neutral initial status.
- Rare, Epic and Legendary have future published, verified achievement criteria and server-side unlock checks. No arbitrary AI- or client-awarded Legendary cards.
- XP stages already exist in Junior: any new rarity mechanic needs explicit mapping to verified XP/progression without retroactive breakage.

## Phase 1 acceptance checklist

- [x] Existing business card and /companion are left untouched.
- [x] Ten balanced scenario questions plus optional zodiac taxonomy.
- [x] Four personality token sets and controlled variant catalog.
- [x] 20 deterministic sample design configs, each with a unique key.
- [x] Automated tests for question coverage, tie-breaking, duplication, minimum three visible differences, and collision fallback.
- [x] Preview-only front/back UI uses actual existing Nova image and no fake QR.
- [ ] Owner approves master Nova character art and acceptable cosmetic masks.
- [ ] Owner approves exact question wording, zodiac/animal options, palette/accessory taxonomy and visual design.
- [ ] Local Vitest/TypeScript/build checks and visual QA on mobile/desktop (must be run before merge).
- [ ] Operational plan for Phase 2 DB issuance, anti-retry, privacy and stable URL tested against real schema.

Phase 1 preview is **not a production generator**. No API calls, charge, payment flows or DB writes. The current illustrative design config key is not a cryptographic fingerprint. Phase 2 requires server-side SHA-256 fingerprint, unique indexes, secure random tokens, idempotency, controlled job queue and end-to-end tests.

## Proposed Phase 2 URL shape

www.myacademy.my/card/c/<random-public-token>

**One page template, many records.** The permanent URL belongs to a card, not to an image version. Existing /card must remain the founder business card.

## Repo integration notes

- src/features/companion-cards/phase1.ts — pure scoring/preview prototype.
- src/features/companion-cards/phase1.test.ts — Vitest contract tests.
- src/routes/companion-cards-preview.tsx and .css — review-only design lab.
- No links added to real navigation and no new database migrations.
