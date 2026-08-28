# INTERACTIVE VISUAL UX CHANGELOG — Science Form 2, Chapters 1–6

**Date:** 2026-08-28
**Scope:** UI/UX integration cleanup only. No academic content was rewritten, no chapter status was
changed, no parallel notes architecture was created. Every explanation string on screen is the one
the chapter already had.

---

## Duplicate visual cleanup

The audit found duplication in exactly one place: **six concepts on the DLP surface** where the
approved locked artwork had been added *beside* the schematic that already taught the same thing.

The fix reuses the pattern Chapter 3 already established — a concept block takes an optional
`image`, and when it has one it renders the artwork **instead of** its own drawing, with its own
verified labels becoming the figure's controls. Nothing is stacked, and no explanation data was
retyped or lost.

### Chapter 1
No duplication. Its five classification figures were already the only visual for their concept.
Changed: they now carry the interactive badge and the shared explanation panel.

### Chapter 2
No duplication. The carbon/oxygen and water cycle figures were already single visuals.
Changed: both are now full interactive figure cards.

### Chapter 3
No duplication — Chapter 3 invented the replace-not-stack pattern, and its digestive system, villus
and Visking figures already swap their schematic for the illustration.
Changed: badge added to those three; food tests and digestion pathways became figure cards.

### Chapter 4
**Removed:** the drawn three-lines-of-defence card row (`DefenceLinesDiagram`'s own layout) on DLP,
which was rendering directly above `chapter4_three_lines_body_defence.webp`.
The specific / non-specific grouping those cards taught is preserved as a labelled fact on each
concept, so nothing about the comparison was lost.
Untouched: the primary vs secondary immune response graph, which has no second visual beside it.

### Chapter 5 — four removals
| Concept | Old visual removed (DLP) | Now primary | Controls |
|---|---|---|---|
| Capillary action | `CapillaryDiagram` xylem SVG | `chapter5_capillary_action.webp` | Cohesive force · Adhesive force · Capillary action |
| Electrolysis of water | `ElectrolysisDiagram` cell SVG | `chapter5_electrolysis_of_water.webp` | Anode · Cathode · Hydrogen gas · Oxygen gas · Gas volume ratio 2 : 1 |
| Solution / suspension / colloid | `MixtureComparison` three drawn beakers | `chapter5_solution_suspension_colloid.webp` | Solution · Suspension · Colloid |
| Water treatment | `WaterTreatmentFlow` chip flow | `chapter5_water_treatment_system.webp` | Reservoir · Screening · Oxidation · Coagulation · Sedimentation · Filtration · Chlorination and fluoridation · To homes |

### Chapter 6 — one removal
**Removed:** the `TitrationSchematic` apparatus SVG on DLP.
**Now primary:** `chapter6_acid_alkali_titration.webp`, with the block's own five labels plus the
stopcock the artwork names, in procedure order: Burette · Acid · Stopcock · Conical flask ·
Indicator · End point.
Untouched: pH slider, indicator colour table, dry-vs-aqueous, strong-vs-weak — all verified still
rendering and still interactive.

### Two things deliberately not removed

**The BM schematics stay.** BM carries none of the locked artwork (every image has baked-in English
labels — see the previous pass's changelog), so on BM the schematic *is* the single primary visual.
Deleting it would have left BM with no figure at all. There is no duplication on BM: it renders one
visual per concept, as it always did. A test asserts both halves of this.

**The mixture comparison table.** Its per-mixture appearance / filtration / example fields were not
part of the artwork, so they are not dropped — they render as labelled facts inside the figure's
explanation panel, using the chapter's own localised field labels. Same for the water treatment
"substance added" line.

**Runtime verification:** every approved WebP now appears exactly **once** in each chapter's rendered
markup, and every removed schematic's marker is absent from DLP and present on BM.

---

## Shared interaction UX

### Component

**`src/components/notes/blocks/InteractiveFigureCard.tsx`** — the single card that composes an
instructional figure into one learning unit. It does not render artwork itself: `AnnotatedImage`
remains the only thing that does, and the card drives it in a new controlled mode so a button and
its region on the picture are always the same selection.

It also exports two pieces the schematics reuse, so nothing is duplicated:
- `InteractiveBadge` — the "this is interactive" marker
- `conceptButtonClass(isActive)` — the one concept-control style

Rendered order matches the brief exactly, confirmed against the live DOM:

```
[ ✨ INTERACTIVE  ·  Tap a concept to explore. ]
[ figure — artwork + Enlarge ]
[ concept buttons ]
[ explanation panel ]
```

### Files

```
A  src/components/notes/blocks/InteractiveFigureCard.tsx   the card, badge, button style, merge helper
A  src/components/notes/blocks/figure-copy.ts              BM/EN chrome copy, one source of truth
M  src/components/notes/blocks/AnnotatedImage.tsx          controlled mode, optional x/y, live legend
M  src/components/notes/blocks/annotation-layout.ts        PlacedAnnotation type
M  src/styles.css                                          one-shot cue keyframes + reduced motion
M  src/components/notes/blocks/CapillaryDiagram.tsx        image path + badge + shared buttons
M  src/components/notes/blocks/ElectrolysisDiagram.tsx     "
M  src/components/notes/blocks/TitrationSchematic.tsx      "
M  src/components/notes/blocks/MixtureComparison.tsx       "
M  src/components/notes/blocks/WaterTreatmentFlow.tsx      "
M  src/components/notes/blocks/DefenceLinesDiagram.tsx     "
M  src/components/notes/blocks/DigestiveSystemDiagram.tsx  badge
M  src/components/notes/blocks/VillusDiagram.tsx           badge
M  src/components/notes/blocks/ViskingExperimentDiagram.tsx badge
M  src/components/notes/blocks/ImmuneResponseGraph.tsx     44px controls
M  src/components/notes/blocks/MiniExperiment.tsx          44px controls
M  src/components/notes/ScienceF2InteractiveNotesBlock.tsx routes figures through the card
M  src/components/notes/ScienceF2Chapter1NotesBlock.tsx    routes figures through the card
M  src/content/form2/science/interactive-types.ts          optional `image` on six blocks
M  src/content/form2/science/chapter-{4,5,6}/interactive-dlp.ts  artwork moved into its concept block
A  src/content/form2/science/interactive-figure-ux.test.tsx
M  src/content/form2/science/locked-image-integration.test.tsx  reads both figure slots
```

### Changes

**Badge (§C).** `✨ INTERACTIVE` / `✨ INTERAKTIF` as a filled primary pill with a sparkle icon, and
the instruction line beside it — the chapter's own instruction where it has one, otherwise the
shared *"Tap a concept to explore." / "Tekan konsep untuk meneroka."*. Copy lives in `figure-copy.ts`,
so a frozen chapter gained the affordance without a single edit to its data file.

**First-view cue (§D).** An `IntersectionObserver` fires once, the first time a card scrolls into
view: the badge swells (1000 ms) and the first button gets a soft glow (1100 ms), then the classes
are removed and a ref flag prevents any replay. Both animations are `iteration-count: 1` and are
disabled under `prefers-reduced-motion: reduce`.

**Buttons (§E).** `min-h-11` (44 px), `border-2`, filled card background, `-translate-y-px` +
shadow on hover, offset focus ring, `cursor-pointer`, `aria-pressed`, and a solid primary fill when
selected. The same class now styles the schematic label rows too, so BM gets the identical
affordance. Measured 44 px at 375/390/430 px across every figure in every chapter.

**Explanation panel (§F).** Concept title (with its emoji where the data has one), then the note,
then any labelled facts. It reserves its height so selecting never shifts the page, is
`aria-live="polite"`, and shows the neutral prompt *"Tap a concept above to see what it does." /
"Tekan konsep di atas untuk melihat penerangannya."* before anything is picked.

**Two behaviour fixes found in QA:**
1. Region hotspots cleared the selection on `mouseleave`, so simply moving the pointer across the
   artwork wiped the explanation a student had just opened. Regions are now click/focus only.
2. Legend rows in `numbers`, `hybrid` and `clean` modes looked like a list but produced nothing.
   Any row with an explanation is now a real button.

---

## Interaction inventory

**25 figures across Chapters 1–6: 13 full cards with a button row, 8 badge + labels-on-artwork,
4 static.**

| Ch | Section | Figure | Controls | Badge | Cue | Enlarge | Mobile |
|---|---|---|---|---|---|---|---|
| 1 | Animal classification | animal overview | 4 labels on artwork | ✓ | ✓ | ✓ | ✓ |
| 1 | Animal classification | five vertebrate groups | 5 labels on artwork | ✓ | ✓ | ✓ | ✓ |
| 1 | Animal classification | four invertebrate groups | 4 labels on artwork | ✓ | ✓ | ✓ | ✓ |
| 1 | Plant classification | plant groups | 4 labels on artwork | ✓ | ✓ | ✓ | ✓ |
| 1 | Dichotomous key | organism set | 8 labels on artwork | ✓ | ✓ | ✓ | ✓ |
| 2 | The Carbon and Oxygen Cycles | carbon/oxygen cycle | 8 buttons | ✓ | ✓ | ✓ | ✓ |
| 2 | The Water Cycle | water cycle | 8 buttons | ✓ | ✓ | ✓ | ✓ |
| 3 | Human Digestive System | digestive system | 11 callout labels | ✓ | — | ✓ | ✓ |
| 3 | Absorption | villus | 5 callout labels | ✓ | — | ✓ | ✓ |
| 3 | Visking tubing experiment | Visking tubing | 4 callout labels | ✓ | — | ✓ | ✓ |
| 3 | Food Tests | food tests | 4 buttons | ✓ | ✓ | ✓ | ✓ |
| 3 | Enzymes and Chemical Digestion | digestion pathways | 3 buttons | ✓ | ✓ | ✓ | ✓ |
| 4 | How Infectious Diseases Spread | transmission routes | 4 buttons + 4 regions | ✓ | ✓ | ✓ | ✓ |
| 4 | Pathogens, Vectors and Diseases | vector → pathogen → disease | 3 buttons + 3 regions | ✓ | ✓ | ✓ | ✓ |
| 4 | The Three Lines of Body Defence | three lines of defence | 3 buttons + 3 regions | ✓ | ✓ | ✓ | ✓ |
| 5 | Surface Tension and Capillary Action | capillary action | 3 buttons + 3 regions | ✓ | ✓ | ✓ | ✓ |
| 5 | Impurities and Electrolysis of Water | electrolysis | 5 buttons + 4 regions | ✓ | ✓ | ✓ | ✓ |
| 5 | Solution, Suspension and Colloid | three mixtures | 3 buttons + 3 regions | ✓ | ✓ | ✓ | ✓ |
| 5 | Water Supply System | water treatment | 8 buttons + 7 regions | ✓ | ✓ | ✓ | ✓ |
| 6 | Uses of Acids and Alkalis | uses at home/farm/industry | 3 buttons + 3 regions | ✓ | ✓ | ✓ | ✓ |
| 6 | Neutralisation and Titration | titration | 6 buttons + 5 regions | ✓ | ✓ | ✓ | ✓ |
| 5 | Evaporation of Water | evaporation factors | static | — | — | ✓ | ✓ |
| 5 | Dilute, Concentrated and Saturated | three concentrations | static | — | — | ✓ | ✓ |
| 6 | Properties of Acids and Alkalis | acid + metal, pop test | static | — | — | ✓ | ✓ |
| 6 | Indicators and Measuring pH | three pH methods | static | — | — | ✓ | ✓ |

### Explanation data

Every control's explanation is the chapter's own existing string — `CapillaryLabel.note`,
`ElectrolysisLabel.note`, `MixtureKind.note` + appearance/filtration/example, `TreatmentStage.fn` +
`chemical`, `TitrationLabel.note`, `DefenceLine.note` + `parts`, and the annotation notes authored
in the previous visual pass. **Nothing was rewritten.** The only new strings anywhere in this pass
are the shared chrome (badge, instruction, prompt, controls label) in `figure-copy.ts`.

Two concepts are control-only: **Reservoir** (Chapter 5, the artwork starts at screening) and the
counts reflect that — they keep their button and explanation but draw no region. Two concepts came
from the artwork rather than the block data: the **2 : 1 gas ratio** and the **stopcock**, both
carrying explanations written and reviewed in the previous pass.

### Where hotspots were and were not used (§H)

Buttons below the image are the primary control everywhere. Overlay regions were added only where
the artwork's own printed labels give the button something spatial to point at — Chapters 4, 5 and 6
approved artwork. Chapter 1's chip labels and Chapter 3's callout labels are already drawn on the
picture with leader lines, so those figures get the badge and panel but **no second row of buttons
repeating labels the student can already see**.

---

## Static figures

| Figure | Why it stays static |
|---|---|
| `chapter5_evaporation_factors.webp` | The artwork states all four factors and their shared result. Hotspots would repeat the surrounding cards and the existing investigation a third time. |
| `chapter5_dilute_concentrated_saturated.webp` | Three labelled beakers with their definitions printed. The adjacent cards already carry *saturated = maximum at that temperature*. |
| `chapter6_acid_metal_hydrogen_test.webp` | Magnesium ribbon, hydrogen, lit splint and the pop are all directly labelled; the caption carries the "suitable metal" qualifier. |
| `chapter6_ph_testing_methods.webp` | The three methods and what each answers are printed on the artwork, and the existing indicator table and method cards teach the same ground interactively. |

All four keep the enlarge control. None shows a badge — a static figure claiming to be interactive
would be the same dead affordance this pass removed.

---

## QA

```
TYPECHECK:        PASS  (tsc --noEmit, clean)
BUILD:            PASS  (npm run build, exit 0)
SCIENCE F2 TESTS: PASS  (13 files, 384 tests — 328 pre-existing + 56 new)
LEAKAGE:          PASS  (learner-facing-leakage.test.ts, 48 tests)
BM/DLP:           PASS  (section parity held; BM chrome fully localised)
375px:            PASS
390px:            PASS
430px:            PASS
```

### New test — `interactive-figure-ux.test.tsx` (56 tests)

Guards, per §N:
- each of the six replaced concepts renders the approved artwork and **not** its schematic marker
- each of the six keeps its schematic on BM, and BM carries no approved artwork
- no concept's artwork appears in two slots at once
- every approved asset appears **exactly once** in each chapter's markup
- every interactive figure carries a badge, an instruction and an explanation panel
- BM figures use BM chrome and leak no English (`Interactive`, `Tap a concept`, `Enlarge`)
- every concept button has an explanation, ids are unique per figure, and every region point maps to
  a concept that exists (no dead buttons, no orphan hotspots)
- buttons render as pressable `min-h-11` controls
- water treatment keeps the stages the artwork does not depict
- the mixture comparison keeps every field of the table it replaced
- the immune response graph still renders with no second visual beside it
- Chapter 6's pH slider, indicator table, dry-vs-aqueous and strong-vs-weak all survive

### Browser QA

Chapters 1–6, both languages, measured against the live DOM at 1440/430/390/375 px.

- **Can a student tell it is interactive?** Yes — badge, instruction line, and 44 px filled buttons
  directly under the artwork, in that order, verified as the card's actual child order.
- **Are buttons actionable?** 44 px minimum at every width tested, pointer cursor, hover lift +
  shadow, solid primary fill when selected, offset focus ring.
- **Is any image duplicated?** No — every asset counted exactly once per chapter.
- **Does every button say something?** Every one tested returns title + note (+ facts where the data
  has them). Control-only concepts (Reservoir) explain correctly with no region.
- **Is the selected state obvious?** Solid primary button *and* a primary ring on the matching region
  of the artwork; both verified via `aria-pressed` and computed styles.
- **Mobile?** No horizontal page overflow at 375/390/430; no button off-screen; the explanation
  stays visible after a tap.
- **Would a student scroll past?** Not now — the badge sits above the artwork rather than a small
  legend sitting below it.
- Enlarge opens, traps focus, closes on Escape and on Close, and releases the scroll lock.
- Zero console errors.

### Two QA limitations, stated plainly

1. **Screenshots were unavailable** — the browser pane does not composite frames in this session, so
   `computer{action:"screenshot"}` times out. Visual QA was done by measuring the live DOM and
   computed CSS instead.
2. **The first-view cue could not be observed firing.** In the same pane, `IntersectionObserver`
   delivers no callbacks at all — confirmed by attaching an independent observer to a card and
   receiving zero entries, including the initial one. The cue's CSS half *was* verified directly:
   applying the classes yields `animation-name: figure-cue-badge` / `figure-cue-glow`,
   `duration 1s / 1.1s`, `iteration-count: 1`, with a live `prefers-reduced-motion` rule disabling
   both. The one-shot JS half is verified by construction (a `spent` ref that disconnects the
   observer and blocks any replay) and by test, not by observation. **Worth one look on a real
   device before sign-off.**

### Pre-existing failures, unrelated — reported, not hidden

The full suite still has the same **8 failures** as before this pass, in Bahasa Melayu mind maps,
Math Form 2 Chapter 1 quizzes, billing, invoice PDF and onboarding UI. None touches Science Form 2,
the notes shell, or any figure component. No new failure was introduced.

---

## Final

```
DUPLICATE VISUALS:                     0 / 6 removed
DEAD INTERACTION BUTTONS:              0 / 106 controls
INTERACTIVE FIGURES WITH CLEAR AFFORDANCE:  21 / 21
STATIC FIGURES (correctly no badge):        4 / 4
MOBILE OVERFLOW:                       0 / 3 widths
BROKEN IMAGE PATHS:                    0
BM ENGLISH-CHROME LEAKS:               0
```

Academic chapter status unchanged. This was UI/UX integration cleanup only.
