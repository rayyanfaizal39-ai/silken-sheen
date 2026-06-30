# Rebuild landing page to match Figma

I read the Figma frame from the screenshot you attached. Rebuilding the homepage as a true marketing landing page that mirrors the Figma section order, while keeping the existing dashboard available for signed-in users.

## Section order (matches Figma top→bottom)

1. **Sticky nav** — logo, links (Subjects, Cikgu AI, Parents, Pricing), Sign in pill.
2. **Hero** — split layout. Left: eyebrow chip, "Malaysia's Interstellar Learning Platform" (large display), subline, primary + secondary CTA. Right: astronaut card with purple glow halo (reuse `AstronautScene`).
3. **Why AcadeMY?** — 4 dark feature cards in a single row (KSSM-aligned, BM + DLP, AI Companion, Gamified XP).
4. **Powerful Learning Tools** — starfield band with 5 glowing planet icons (Notes, Flashcards, Quizzes, Mind Maps, Mock Tests) floating in an arc.
5. **Cikgu AI** — split: orbiting astronaut orb left, checklist of capabilities + "Try Cikgu" CTA right.
6. **Track Your Progress** — dashboard preview card (XP, streak, mastery, recent missions) — static styled mock, not the real dashboard.
7. **Parents** — gold serif "Parents" heading, cinematic image right, checklist left, then a wider parent analytics preview band underneath.
8. **Choose Your Mission Plan** — 3 pricing cards: Free, RM28 (highlighted/Popular), RM68. Feature lists + CTA per card.
9. **Ready to Launch Your Mission?** — centered final CTA with glow.
10. **Footer** — keep existing `SiteFooter`.

## Implementation

- Rewrite `src/components/HomeDashboard.tsx` into a marketing composition. Split into section components under `src/components/landing/`:
  - `LandingHero.tsx`, `WhyAcademy.tsx`, `LearningTools.tsx`, `CikguAISection.tsx`, `ProgressPreview.tsx`, `ParentsSection.tsx`, `PricingSection.tsx`, `FinalCta.tsx`.
- `src/routes/index.tsx` renders these in order, then `SiteFooter`, then `CompanionWidget`.
- The current "logged-in dashboard" view is preserved as `src/routes/dashboard.tsx` (already exists); the home route becomes marketing-only regardless of auth state to match the Figma intent.
- Reuse existing tokens in `src/styles/theme.css` (deep navy bg, purple primary, gold accent). Add a `--accent-gold` token if missing for the "Parents" serif heading. No new fonts — use existing display/serif/sans pairing.
- Reuse `AstronautScene`, `ParticleBg`, `PlanetEnvironment` for hero + tools band. Planets in section 4 use existing planet sprites/illustrations already in `src/assets`.
- Pricing values: Free / RM28 / RM68 with placeholder feature bullets I'll write to match the Figma intent (you can edit copy after).
- Responsive: stacks to single column on mobile; hero astronaut moves above text on <md.
- No backend/business-logic changes. No new packages.

## What I'm NOT changing

- Notes / quizzes / flashcards / mind map content.
- `/dashboard`, `/subjects`, `/auth/callback`, admin routes.
- Auth flow, Supabase wiring, sign-in modal.

## Open question

The Figma shows pricing at RM28 and RM68 — confirm these are the real prices to ship, or should I render them as placeholder "From RMxx" until you finalize? Default if you don't reply: render RM28 / RM68 exactly as shown.

Approve and I'll build it.