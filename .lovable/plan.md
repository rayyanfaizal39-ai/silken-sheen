# AcadeMY UX & Polish Sprint

Scope: product UX, visual polish, navigation, and guidance only. **Notes, quizzes, flashcards, mind map data, and chapter content are not touched.** No DB schema changes.

Work is grouped into 4 shippable phases so you can review progress between each.

---

## Phase 1 — Guidance & Onboarding

**1. First-time onboarding flow** (`src/components/onboarding/OnboardingWizard.tsx`)
- 3 steps: Pick Form (1/2/3) → Pick subject → Start first mission.
- Triggered on first visit (localStorage flag `academy-onboarded-v1`). Skippable.
- Writes choice into existing `use-progress` preferences (no schema change).
- Animated cosmic intro reusing existing `AstronautScene` assets.

**2. Global "Next Mission" card** (`src/components/NextMissionCard.tsx`)
- Derives next action from `useProgress` chapter activity: unread chapter → Read Notes; read but no quiz → Take Quiz; etc.
- Mounted in Home hero, Notes sidebar, Flashcards top bar, Quizzes top bar, Mind Map header.
- One-tap CTA, shows subject planet color + XP reward preview.

**6. Recurring Companion guide**
- Extend existing `CompanionWidget` to surface contextual tips per route (notes/quiz/flashcard/mindmap) using existing `companion/banks/*` messages.
- Add a small "Companion says…" speech bubble that appears once per session per route.

---

## Phase 2 — Mind Map & Mobile

**3. Mind map navigation upgrade** (`src/components/MindMap.tsx`)
- Floating control cluster: Zoom In / Out / Reset / Center on root.
- Smooth camera follow when a node is selected (animated transform with cubic easing).
- Keyboard shortcuts (+/- / 0). Pinch-zoom retained.
- No data changes.

**4. Mobile responsiveness pass**
- Audit & fix overflow on `HomeDashboard`, subject cards, `notes.tsx`, quiz/flashcard headers.
- Polish `MobileNav` bottom bar: larger touch targets, active glow, safe-area insets.
- Apply the grid+min-w-0+shrink-0 pattern to header rows that currently wrap badly.

---

## Phase 3 — Identity, Search, Rewards

**5. Subject "worlds" visual identity**
- Lean on existing `PlanetEnvironment` + `world-scene-*` CSS. Extend to ALL study routes (notes/quiz/flashcard/mindmap) so the subject's atmosphere persists.
- Add subject-tinted accent on buttons, progress bars, and chapter chips via CSS variable from `PLANET_THEMES`.

**7. Reward micro-celebrations**
- Lightweight toast + confetti burst on: finishing a chapter section, completing a flashcard deck, finishing a quiz, unlocking a badge.
- Reuse existing `Confetti.tsx` and `UnlockCelebration` (smaller variant for micro-events).

**8. Global search upgrade** (`src/components/GalaxySearch.tsx` + `src/lib/study-search.ts`)
- Unified index across notes titles, quiz topics, flashcard decks, mind map nodes.
- Grouped results with type badges, keyboard nav, recent searches.
- ⌘K / Ctrl+K shortcut.

---

## Phase 4 — Parent Dashboard & Landing

**9. Parent preview dashboard** (`src/routes/parent.tsx`)
- Read-only view of the current student's progress derived from `useProgress` (XP, streak, per-subject completion, recent activity).
- Print-friendly layout. No new auth, no schema change — just a dedicated route + share link.

**10. Landing page conversion polish** (`src/components/HomeDashboard.tsx` hero region only when signed-out)
- Tighter value proposition headline, social proof strip (subject count, chapters covered — computed from existing registry, not fabricated), clearer primary CTA, secondary "See a sample chapter" link.
- Sticky sign-in CTA on scroll for signed-out visitors.

---

## Out of scope (explicit)
- No edits to chapter notes, quiz questions, flashcard pairs, or mind map data files.
- No DB / Supabase schema changes.
- No new dependencies unless a control absolutely requires one (will flag before adding).

## Suggested review checkpoints
After Phase 1, Phase 2, Phase 3, Phase 4 — so you can redirect before the next batch.

Shall I start with **Phase 1**?
