# Chapter 3 Pass 2 — animal homeostasis

Scope: Form 1 Science, 3.1 Homeostasis in Living Things, BM and DLP. Animal presentation only.

## Files

- `src/components/notes/blocks/Chapter3AnimalHomeostasis.tsx`: shared animal SVGs, five buttons, environmental challenge, original source adaptation, outcomes and two-category summary.
- `src/components/notes/ScienceF1Chapter3VisualNotesBlock.tsx`: replaces only the old animal panel and its local animal selection state with the new component.
- `src/components/notes/ScienceF1Chapter3Animals.test.tsx`: 14 live-render/source/parity checks.
- `src/components/notes/ScienceF1Chapter3AnimalsInteraction.test.tsx`: two tests exercising all five real button handlers and rendering resulting selections, using a mocked state hook without a browser.
- This audit.

## Visuals and adaptations

- Cats/dogs: cat licking wet fur, dog with extended tongue, evaporation cues; cold dog with erect hairs and a larger visible air layer, reduced heat-loss outcome. No skin sweating.
- Lizards: exactly one shared animal outline; cold/hot diagrams differ in movement arrows, temperature indicators and the source-supported hot-state heartbeat cue. Selected condition is highlighted. No basking or shade-seeking.
- Snail: moist surface/fluid, water vapour above exposed skin, a humid location with a reduced vapour cue. No shell sealing or aestivation.
- Bee: waxy body-surface detail, simplified spiracle positions, open aperture with gas/water-vapour arrows, closed aperture between breaths with reduced water-loss outcome. No detailed respiratory anatomy.
- Summary: temperature control (cats/dogs, lizards) versus water-loss control (snail, bee). Names are taken from the source; parenthetical condition qualifiers are omitted only in the summary.

Names and complete adaptation explanations are read directly from the existing `animalHomeostasis` array. No second factual animal dataset is introduced. The original data file, completed human homeostasis components, experiments and plant section are unchanged.

## Source limits and wording

The existing cold-lizard entry states slower body activity, muscle function and movement, with reduced metabolism/body temperature. It does not explicitly state slower heartbeat. The cold visual therefore uses an activity cue; only the hot visual shows a heartbeat cue. No new factual source was substituted, and the official DLP textbook was not independently verified for this pass.

Short bilingual presentation labels were added for the user-requested challenge/response/benefit structure, hot/cold and dry/humid conditions, evaporation, trapped air, temperature and water-loss outcomes, wax, gas exchange, water vapour and the comparison categories. These are diagram labels and semantic counterparts of the brief/source concepts, not purported verbatim textbook quotations. Full adaptation wording is unchanged.

UNSOURCED ANIMAL ADAPTATIONS ADDED: NONE.

## Verification

- 37 Chapter 3 tests pass (including 16 new animal tests).
- Targeted ESLint passes.
- BM/DLP SVG element geometry matches for all five selections.
- Twenty rendered SVG instances inspected, followed by a final detail render confirming snail vapour is above exposed skin rather than the shell.
- Responsive layout uses stacked state cards on narrow screens, two columns above the small breakpoint, 44px minimum buttons, visible focus rings, pressed states and a polite live region. No hover-only learning. No browser/mobile screenshot measurements are claimed.
- Production build passed; final presentation-only changes were also included in the final build run.

Stopped after animals. No plant redesign, commit, push or deployment.
