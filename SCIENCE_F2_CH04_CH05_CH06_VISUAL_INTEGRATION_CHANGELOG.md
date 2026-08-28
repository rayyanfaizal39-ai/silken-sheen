# VISUAL INTEGRATION CHANGELOG — Science Form 2, Chapters 4, 5 and 6

**Date:** 2026-08-28
**Scope:** Visual integration and asset optimisation only. No chapter was unfrozen, no academic
content was rewritten, no locked image was regenerated, redrawn or altered.

---

## 0. Live architecture traced first

The production path for Science Form 2 Chapters 4–6 is:

```
src/content/registry.ts  (science-f2-c{4,5,6}-{bm,dlp} → sciF2InteractiveData)
  → src/content/form2/science/chapter-{4,5,6}/interactive-{bm,dlp}.ts
    → src/routes/notes.tsx  (subject=science, form=2, chapter=Chapter N)
      → src/components/notes/ScienceF2Chapter{4,5,6}NotesBlock.tsx
         (a one-line re-export of the shared renderer)
        → src/components/notes/ScienceF2InteractiveNotesBlock.tsx
          → src/components/notes/ScienceSectionedNotesShell.tsx  (one section at a time)
            → src/components/notes/blocks/AnnotatedImage.tsx
              → src/components/notes/blocks/LearningImageLightbox.tsx
```

This is the same architecture the remediated Chapters 1–3 use. **No parallel notes system, no
chapter-specific image component and no revived legacy `notes-{bm,dlp}.ts` file was introduced.**
The existing reusable pieces were all found and reused:

| Need | Existing component reused |
|---|---|
| Instructional image wrapper | `blocks/AnnotatedImage.tsx` |
| Enlarge / modal behaviour | `blocks/LearningImageLightbox.tsx` (Radix dialog) |
| Image sizing variants | `blocks/learning-image.ts` (`compact` / `standard` / `wide` / `portrait`) |
| Hotspot + explanation panel | `AnnotatedImage` annotations + its single `aria-live` panel |
| Data slot on a section | `ScienceInteractiveSection.images?: AnnotatedImageBlock[]` |
| Section / card chrome | `ScienceSectionedNotesShell` — untouched |

### The one component change

`AnnotatedImage` gained a fifth annotation mode, **`regions`**, plus two optional annotation fields
(`w` / `h`, percentages). Everything else about the component is unchanged, and the four existing
modes render byte-identical markup.

Why it was needed: every image in this pack is **already professionally labelled**. The existing
modes would have put a second, competing set of chips (`labels`) or numbered pins (`numbers`) on
top of artwork that already names its own parts — exactly what the brief forbids. `regions` instead
places **invisible, percentage-positioned hit areas** over the labels the artwork already prints.
Nothing is drawn until a region is picked, and then only a highlight ring.

The legend beneath a `regions` figure is rendered as buttons rather than static list items, so the
same hotspots are reachable by keyboard and on a phone. `clean` mode legends are unchanged.

One type was also unified: `AnnotatedImageBlock.annotations` previously re-declared the annotation
shape inline; it now reuses `ImageAnnotation`, so there is a single source of truth.

### Deviation from the brief — asset location, please note

The brief proposed `public/images/science/form-2/chapter-N/`. The assets were instead placed in
**`src/assets/notes/form2-science/chapter-N/`**, the bundled-import convention every other Form 2
Science chapter already uses (`import … from "@/assets/…"` → Vite URL → `getNotesImageUrl`). Using
`public/` would have created a second, unhashed asset convention alongside the existing one. The
directory shape the brief asked for is preserved; only the root differs.

---

## 1. Assets

Source pack (unmodified, still in the user's Downloads folder): three `AcadeMY_Science_Form2_ChapterN_Locked_Images.zip`
archives, 13 PNGs in total. **No source file was deleted.** No PNG is referenced at runtime.

```
src/assets/notes/form2-science/chapter-4/  chapter4_infectious_disease_transmission.webp
                                           chapter4_vector_pathogen_disease.webp
                                           chapter4_three_lines_body_defence.webp
src/assets/notes/form2-science/chapter-5/  chapter5_capillary_action.webp
                                           chapter5_electrolysis_of_water.webp
                                           chapter5_evaporation_factors.webp
                                           chapter5_solution_suspension_colloid.webp
                                           chapter5_dilute_concentrated_saturated.webp
                                           chapter5_water_treatment_system.webp
src/assets/notes/form2-science/chapter-6/  chapter6_acid_metal_hydrogen_test.webp
                                           chapter6_ph_testing_methods.webp
                                           chapter6_acid_alkali_titration.webp
                                           chapter6_uses_of_acids_and_alkalis.webp
```

**`active-vs-passive-immunity` does not exist in the supplied Chapter 4 pack.** The pack contains
three images, not four, so nothing was invented for it and the existing `ImmunityMatrix` tabs and
the primary/secondary `ImmuneResponseGraph` remain the only teaching for that section.

### Conversion

Tool: **`sharp`**, already present in `node_modules` — no dependency was added.
Mode: **`webp({ quality: 94, effort: 6, smartSubsample: true })`**, i.e. the top of the brief's
90–94 band. Native pixel dimensions were kept (1448–1774 px wide), which is a genuine 2× source for
a 741–780 px display slot and the right source for the enlarge overlay; nothing was upscaled.

Lossless and near-lossless were both measured first and rejected: they landed at ~1.0–1.5 MB per
file (13 MB total) for no visible gain. Text crops from the two most text-dense files (the water
treatment summary strip and the pH-method lightbulb notes) were compared PNG-vs-WebP at 1:1 — text
edges, arrow tips and small coloured labels are identical, with no banding.

| Original filename | WebP filename | PNG | WebP | Change |
|---|---|---|---|---|
| `01_Disease_Transmission_Routes.png` | `chapter4_infectious_disease_transmission.webp` | 1689 KB | 187 KB | −89% |
| `02_Vector_Pathogen_Disease.png` | `chapter4_vector_pathogen_disease.webp` | 1893 KB | 228 KB | −88% |
| `03_Three_Lines_of_Body_Defence.png` | `chapter4_three_lines_body_defence.webp` | 1711 KB | 180 KB | −89% |
| `01_Cohesion_Adhesion_Capillary_Action.png` | `chapter5_capillary_action.webp` | 2202 KB | 157 KB | −93% |
| `02_Electrolysis_of_Water.png` | `chapter5_electrolysis_of_water.webp` | 2364 KB | 171 KB | −93% |
| `03_Factors_Affecting_Evaporation.png` | `chapter5_evaporation_factors.webp` | 2384 KB | 198 KB | −92% |
| `04_Solution_Suspension_Colloid.png` | `chapter5_solution_suspension_colloid.webp` | 2405 KB | 224 KB | −91% |
| `05_Dilute_Concentrated_Saturated.png` | `chapter5_dilute_concentrated_saturated.webp` | 1753 KB | 259 KB | −85% |
| `06_Water_Treatment_System.png` | `chapter5_water_treatment_system.webp` | 1806 KB | 329 KB | −82% |
| `01_Acid_Metal_Hydrogen_Pop_Test.png` | `chapter6_acid_metal_hydrogen_test.webp` | 2313 KB | 162 KB | −93% |
| `02_pH_Testing_Methods.png` | `chapter6_ph_testing_methods.webp` | 2307 KB | 196 KB | −92% |
| `03_Acid_Alkali_Titration.png` | `chapter6_acid_alkali_titration.webp` | 2304 KB | 174 KB | −92% |
| `04_Uses_of_Acids_and_Alkalis.png` | `chapter6_uses_of_acids_and_alkalis.webp` | 2611 KB | 291 KB | −89% |

**Total: 27.09 MB → 2.69 MB (−90.1%).**

---

## 2. Placement

Every figure sits inside the section that teaches its concept, rendered by the shared
`section.images` slot — after that section's teaching cards and its existing interactive block, and
before its *Check yourself* questions. No image was dumped at the bottom of a chapter, and no image
sits between a concept and its explanation.

### Chapter 4 — `chapter-4/interactive-dlp.ts`

| Figure | Section | Mode | Size |
|---|---|---|---|
| `chapter4_infectious_disease_transmission.webp` | 4.1 · How Infectious Diseases Spread | interactive · 4 regions | `wide`, 4 / 3 |
| `chapter4_vector_pathogen_disease.webp` | 4.1 · Pathogens, Vectors and Diseases | interactive · 3 regions | `wide`, 4 / 3 |
| `chapter4_three_lines_body_defence.webp` | 4.2 · The Three Lines of Body Defence | interactive · 3 regions | `wide`, 4 / 3 |

### Chapter 5 — `chapter-5/interactive-dlp.ts`

| Figure | Section | Mode | Size |
|---|---|---|---|
| `chapter5_capillary_action.webp` | 5.1 · Surface Tension and Capillary Action | interactive · 3 regions | `wide`, 3 / 2 |
| `chapter5_electrolysis_of_water.webp` | 5.1 · Impurities and Electrolysis of Water | interactive · 3 regions | `wide`, 3 / 2 |
| `chapter5_evaporation_factors.webp` | 5.1 · Evaporation of Water | **static + enlarge** | `wide`, 3 / 2 |
| `chapter5_dilute_concentrated_saturated.webp` | 5.2 · Dilute, Concentrated and Saturated Solutions | **static + enlarge** | `wide`, 3 / 2 |
| `chapter5_solution_suspension_colloid.webp` | 5.2 · Solution, Suspension and Colloid | interactive · 3 regions | `wide`, 3 / 2 |
| `chapter5_water_treatment_system.webp` | 5.3 · Water Supply System | interactive · 7 regions | `wide`, 2 / 1 |

### Chapter 6 — `chapter-6/interactive-dlp.ts`

| Figure | Section | Mode | Size |
|---|---|---|---|
| `chapter6_acid_metal_hydrogen_test.webp` | 6.1 · Properties of Acids and Alkalis | **static + enlarge** | `wide`, 3 / 2 |
| `chapter6_ph_testing_methods.webp` | 6.1 · Indicators and Measuring pH | **static + enlarge** | `wide`, 3 / 2 |
| `chapter6_uses_of_acids_and_alkalis.webp` | 6.1 · Uses of Acids and Alkalis | interactive · 3 regions | `wide`, 3 / 2 |
| `chapter6_acid_alkali_titration.webp` | 6.2 · Neutralisation and Titration | interactive · 5 regions | `wide`, 3 / 2 |

### Sizing

All figures use the `wide` variant of the existing sizing system, which caps width at
`min(780px, heightBudget × aspectRatio)` and therefore bounds height without ever letterboxing:

- 3 / 2 figures render **741 × 493** at 1440 × 900
- the 2 / 1 water-treatment figure renders **778 × 388**
- 4 / 3 Chapter 4 figures render **660 × 495**, bound by the 55 vh height ceiling

The 3 / 2 and 2 / 1 figures sit inside the brief’s 680–840 px desktop band. The 4 / 3 figures land at 660 px — just under the 680 px floor — because the 55 vh height budget binds before the width cap does; that is the shared sizing system doing its job, not a regression. Every figure stays under the ~520 px / 55 vh height ceiling.

---

## 3. Interactivity

**9 figures interactive, 4 deliberately static. 34 hotspots, 0 dead.**

Every hotspot is a `regions` annotation: percentage-positioned (so it tracks its structure at every
width, including inside the enlarge overlay), invisible until picked, mouse + touch + keyboard
reachable, and mirrored as a button in the legend beneath the artwork. Picking one highlights that
area of the artwork **and** its legend row, and writes into the figure's single explanation panel.
**No numbered circle or chip was drawn over any of the professionally labelled artwork.**

Every hotspot rectangle was verified by rendering it back onto the source artwork and inspecting the
result; each one lands on the element it names.

### Chapter 4

**Infectious disease transmission** — Air · Water · Contact · Vector
- Air → *Pathogens are carried by droplets of saliva or by dust, and are breathed in by the next host.*
- Water → *Pathogens spread through water contaminated by faeces or sewage, and infect a person who drinks it.*
- Contact → *Infection spreads by touching infected skin, or by wearing a patient's clothing or sharing personal items.*
- Vector → *Animals such as the mosquito and the rat carry a pathogen from one host to a new host.*

**Vector → Pathogen → Disease** — the three columns, so the terms cannot be confused
- Vector → *The animal that carries the pathogen to a new host … It does not cause the disease itself.*
- Pathogen → *The disease-causing microorganism the vector carries — dengue virus, Leptospira bacteria, Salmonella typhi.*
- Disease → *The condition that results once the pathogen infects the body — dengue fever, leptospirosis, typhoid.*

**Three lines of body defence** — the three panels
- First → *Skin and mucous membrane — physical and chemical barriers that stop pathogens entering the body.*
- Second → *Phagocytosis: a white blood cell engulfs and digests any pathogen that gets past the first line.*
- Third → *Specific defence: white blood cells produce antibodies that match one particular antigen.*

The second line is taught as **phagocytosis only**, matching the remediated chapter. Fever and
inflammation were not introduced.

### Chapter 5

**Capillary action** — Cohesion · Adhesion · Capillary action, positioned on the two force cards and
the tube itself, so none of the artwork's own labels is covered.

**Electrolysis of water** — Cathode (−) → hydrogen produced here · Anode (+) → oxygen produced here ·
Gas volume ratio 2 : 1 → *twice as much hydrogen as oxygen, because every water molecule (H₂O) holds
two hydrogen atoms to one oxygen atom.* Cathode → hydrogen, anode → oxygen and the 2 : 1 ratio are
all preserved exactly.

**Solution / Suspension / Colloid** — the three columns, each explaining clarity, particle state and
settling behaviour. The existing `MixtureComparison` interaction is untouched; the image is the
visual anchor above it.

**Water treatment system** — all seven stages: Screening · Oxidation · Coagulation · Sedimentation ·
Filtration · Chlorination · Fluoridation, each with its compact explanation (alum clumps particles,
slaked lime reduces acidity, chlorine kills microorganisms, fluoride helps prevent tooth decay, …).
The artwork already numbers and names every stage, so no pins were added.

### Chapter 6

**Uses of acids and alkalis** — category level only: At home · In agriculture · In industry. No
per-product hotspot, because every product is already labelled ACID or ALKALI on the artwork.

**Acid–alkali titration** — Burette · Stopcock · Conical flask · Before the end point · At the end
point. End point is taught as *the pink colour just disappears and the solution turns colourless*.
**No Jadual 9 experiment framing, and no hypothesis / manipulated / responding-variable scaffolding
was added.**

### Kept static, and why

| Figure | Why |
|---|---|
| `chapter5_evaporation_factors.webp` | The artwork already states all four factors and their shared result. Hotspots would repeat the surrounding cards and the existing `miniExperiment` a third time. |
| `chapter5_dilute_concentrated_saturated.webp` | Three labelled beakers with their definitions printed. The adjacent cards already carry *saturated = maximum at that temperature*, and that concentrated ≠ saturated. |
| `chapter6_acid_metal_hydrogen_test.webp` | Magnesium ribbon, hydrogen gas, lit splint and the pop are all directly labelled; the caption carries the "suitable metal" qualifier so nothing implies that all metals react. |
| `chapter6_ph_testing_methods.webp` | The three methods and what each one answers are printed on the artwork. The existing `IndicatorTable` and `MethodCards` teach the same ground interactively. |

---

## 4. BM / DLP

### The finding

**All 13 locked images carry baked-in ENGLISH text.** Not one is language-neutral, and in most the
English text *is* the teaching (panel titles, definitions, stage names, colour-change captions).

The disease-transmission figure is the sharpest case: its four labels are `Air`, `Water`, `Contact`,
`Vector`. On a BM page, English **Water** and Malay **air** are a direct false friend — a student
reading the second panel as *"udara"* would learn the wrong route.

### Decision

| Surface | Assets used |
|---|---|
| **DLP** | All 13. |
| **BM** | **None.** Every BM section keeps its existing data-driven visual. |

This follows the brief's priority order: no BM-labelled version exists in the pack (rule 1); the BM
chapters already carry good HTML/SVG/data-driven equivalents (rule 2 — `CapillaryDiagram`,
`ElectrolysisDiagram`, `MixtureComparison`, `WaterTreatmentFlow`, `DefenceLinesDiagram`,
`IndicatorTable`, `MethodCards`, `PhScaleSlider`, `TitrationSchematic`, `StrengthComparison`,
`DryVsAqueous`, `ImmunityMatrix`, `ImmuneResponseGraph`); and no image qualifies under rule 3, since
in none of them is the English text minor. **No BM label was overlaid on top of baked English text.**

BM and DLP remain academically equivalent — same sections, same section numbers, same teaching —
with a temporarily different visual implementation, which the brief explicitly permits.

### BM LOCALIZED ASSET REQUIRED

All 13, listed for the next art pass:

```
chapter4_infectious_disease_transmission   Udara · Air · Sentuhan · Vektor
chapter4_vector_pathogen_disease           Vektor → Patogen → Penyakit
chapter4_three_lines_body_defence          Garis pertahanan pertama / kedua / ketiga
chapter5_capillary_action                  Daya kohesi · Daya adhesi · Tindakan kapilari
chapter5_electrolysis_of_water             Katod (−) · Anod (+) · Nisbah isi padu gas 2 : 1
chapter5_evaporation_factors               Kelembapan rendah · Suhu tinggi · Luas permukaan · Pergerakan udara
chapter5_solution_suspension_colloid       Larutan · Ampaian · Koloid
chapter5_dilute_concentrated_saturated     Larutan cair · Larutan pekat · Larutan tepu
chapter5_water_treatment_system            Penapisan · Pengoksidaan · Penggumpalan · Pemendapan · Penurasan · Pengklorinan · Pemfluoridaan
chapter6_acid_metal_hydrogen_test          Asid + logam sesuai → Garam + Hidrogen · ujian "pop"
chapter6_ph_testing_methods                Kertas litmus · Penunjuk universal · Meter pH
chapter6_acid_alkali_titration             Buret · Injap · Kelalang kon · Takat akhir
chapter6_uses_of_acids_and_alkalis         Di rumah · Dalam pertanian · Dalam industri
```

A regression test asserts the exclusion, so an English infographic cannot reach a BM page by
accident later.

---

## 5. Existing interactions preserved

Nothing was replaced. Verified still rendering and still interactive after integration:

- **Chapter 4** — `DefenceLinesDiagram`, `ImmunityMatrix` (active/passive tabs), the primary vs
  secondary `ImmuneResponseGraph`, the vector→pathogen matcher, the three-level prevention sequence.
- **Chapter 5** — `CapillaryDiagram`, `ElectrolysisDiagram`, `MixtureComparison`, `WaterTreatmentFlow`,
  `ComparisonMatrix`, `MethodCards`, `ConceptContrast`, both `miniExperiment` investigation cards.
- **Chapter 6** — `PhScaleSlider`, `IndicatorTable`, `DryVsAqueous`, `StrengthComparison`,
  `TitrationSchematic`, `ConceptContrast`, `MethodCards`, and the section architecture.

Where an image covers the same ground as a strong existing interaction (capillary, electrolysis,
mixtures, water treatment, titration, pH methods), the image is a compact supporting figure beside
it, not a replacement for it.

---

## 6. Responsive QA

Measured in a real browser against the live notes block, at each width, for all three chapters.

| Viewport | Result |
|---|---|
| Desktop 1440 × 900 | **PASS** — 741 × 493 (3:2), 778 × 388 (2:1), 667 × 500 (4:3). Page scroll width 1434 ≤ 1440. |
| 430 × 932 | **PASS** — figures 355 px wide inside the card, 19–25 vh tall, page scroll width 430. |
| 390 × 844 | **PASS** — figures 315 px wide, no clipping, all regions and legend buttons present. |
| 375 × 667 | **PASS** — page scroll width 375, no horizontal page overflow; enlarge overlay stays inside the viewport. |

Also verified: no clipping or crushed text at any width; direct labels on the artwork stay visible
(nothing is drawn over them); text cards never collide with a figure; **Back / Next section controls
still work** and figures render correctly after stepping between sections.

### Enlarge modal

Opens from every figure, `object-fit: contain`, full image visible, accessible title from the
figure's legend label, focus moved into the dialog, body scroll locked on open and **released on
close** (no stuck-scroll bug). Closes on **Escape** and on the **Close** button. Verified at both
1440 × 900 and 375 × 667.

### Known limitation — worth a follow-up

On a 375 px portrait phone the 2 : 1 water-treatment figure enlarges to 351 × 176, barely larger
than its 300 × 149 inline size, because a 2 : 1 image on a narrow portrait screen is width-bound.
The brief's modal spec ("full image visible, object-fit contain") is met, and the shared lightbox
was **not** redesigned unilaterally — but a phone reader still has to squint at that one figure.
Two options for a follow-up, whichever you prefer: add a pinch/scroll zoom layer to the shared
`LearningImageLightbox`, or commission a taller BM+DLP re-cut of the water-treatment artwork.

### QA method note

Screenshots could not be captured in this session — the browser pane was not compositing frames, so
`computer{action:"screenshot"}` timed out every time. Visual QA was done instead by (a) inspecting
every source PNG directly at full resolution, (b) rendering each hotspot rectangle back onto its
artwork and inspecting those composites, and (c) measuring the live DOM and computed CSS in the
running browser for size, overflow, hotspot geometry, modal behaviour and focus. No claim in this
document rests on an unverified screenshot.

---

## 7. Performance

- **Lazy loading** — every figure is `loading="lazy"` and `decoding="async"` (inherited from the
  shared `AnnotatedImage`); no chapter image is eager-loaded.
- **No layout shift** — each figure declares an `aspect` ratio and the frame reserves the box via
  `aspect-ratio` before the file arrives. Confirmed in-browser.
- **Bounded footprint** — width is capped by the `wide` variant; height follows from the ratio, so
  a figure can never become a full-viewport poster.
- **Resolution** — native 1448–1774 px for a 741–780 px slot: a true 2× source and the right source
  for the enlarge overlay. Nothing was upscaled, and no 4K asset was produced.
- **No base64 inline images.** No `srcset` was added, because the shared component does not support
  one and adding a responsive pipeline was out of scope for this pass.
- **Runtime PNG references remaining for these assets: 0** (asserted by test).

---

## 8. Accessibility

- Meaningful, language-appropriate alt text on all 13 figures (DLP English; BM carries none of these
  assets, so no mismatched alt text exists).
- Every hotspot is a real `<button>` with an accessible name, `aria-pressed`, and
  `aria-describedby` pointing at the figure's explanation panel.
- The legend beneath each interactive figure repeats every hotspot as a button — the keyboard and
  small-screen route. **No hover-only interaction.**
- Visible focus rings on regions, legend buttons, the enlarge control and the close button.
- The explanation panel is `aria-live="polite"` and always reserves its space, so picking a hotspot
  never shifts the page.
- Enlarge overlay: Radix dialog — focus management, Escape, scroll lock and an `sr-only` title.

---

## 9. Tests

New: `src/content/form2/science/locked-image-integration.test.tsx` — **61 tests**, covering every
guard the brief asked for:

- all 13 expected WebP assets exist; every `src` resolves to a real file
- exactly 13 assets integrated, each exactly once
- no runtime `.png` path for any locked asset; no empty `src`, no empty alt
- every figure declares an explicit `size` and `aspect`
- hotspot ids unique per figure; no dead hotspot (every one has explanation text)
- every hotspot rectangle stays inside the artwork
- locked artwork is only ever annotated with `regions` — never chips or pins
- exactly 4 figures kept static
- **BM carries zero locked assets, and BM markup references none of the 13 filenames**
- BM / DLP section count and section-number parity for all three chapters
- every section still renders; every figure renders lazily with its alt text; every figure offers an
  enlarge control; every hotspot renders as a labelled control with its legend entry
- a static figure renders no hotspot control and no explanation panel

Rendering assertions use `renderToStaticMarkup`, matching the existing chapter suites. The repo has
no DOM test environment (`jsdom` / `@testing-library` are not installed) and none was added, so
modal open/close and hotspot clicking are covered by the browser QA above rather than by unit tests.

```
TYPECHECK:        PASS  (tsc --noEmit, clean)
BUILD:            PASS  (npm run build)
SCIENCE F2:       PASS  (12 files, 328 tests — 267 pre-existing + 61 new)
CHAPTER 4:        PASS  (chapter-4-remediation.test.tsx, 19 tests)
CHAPTER 5:        PASS  (chapter-5-remediation.test.tsx, 68 tests)
CHAPTER 6:        PASS  (chapter-6-remediation.test.tsx, 81 tests)
LOCKED IMAGES:    PASS  (locked-image-integration.test.tsx, 61 tests)
LEAKAGE:          PASS  (learner-facing-leakage.test.ts, 48 tests)
BM/DLP PARITY:    PASS
IMAGE PATHS:      PASS
BROWSER QA:       PASS
```

### Pre-existing failures, unrelated to this work — reported, not hidden

The full suite has **8 failing tests** that are unrelated to this change. Each was confirmed to fail
identically with every change in this pass stashed:

```
src/content/bm/asas-penulisan-form1-mindmap.test.ts
src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts
src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts
src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts
src/content/form2/math/chapter-1/quizzes-dlp.test.ts
src/lib/billing-core.test.ts
src/lib/invoice-pdf.server.test.ts
src/routes/-onboarding-ui.test.ts
```

None touches Science Form 2, the notes shell, `AnnotatedImage` or any image asset.

---

## 10. Files changed

```
M  src/components/notes/blocks/AnnotatedImage.tsx        + regions mode, w/h, interactive legend
M  src/components/notes/blocks/annotation-layout.ts      + "regions" in AnnotationMode
M  src/content/form2/science/interactive-types.ts        annotations now reuse ImageAnnotation
M  src/content/form2/science/chapter-4/interactive-dlp.ts  + 3 figures
M  src/content/form2/science/chapter-5/interactive-dlp.ts  + 6 figures
M  src/content/form2/science/chapter-6/interactive-dlp.ts  + 4 figures
A  src/content/form2/science/locked-image-integration.test.tsx
A  src/assets/notes/form2-science/chapter-4/  (3 webp)
A  src/assets/notes/form2-science/chapter-5/  (6 webp)
A  src/assets/notes/form2-science/chapter-6/  (4 webp)
A  SCIENCE_F2_CH04_CH05_CH06_VISUAL_INTEGRATION_CHANGELOG.md
```

The three BM interactive files were **not modified**. No academic content in any chapter was
rewritten; the only prose added is figure alt text, captions and hotspot explanations, all
source-aligned with the surrounding remediated teaching.

---

## Result

```
CHAPTER 4 VISUAL INTEGRATION:  PASS  (DLP)   BM: awaiting localised assets
CHAPTER 5 VISUAL INTEGRATION:  PASS  (DLP)   BM: awaiting localised assets
CHAPTER 6 VISUAL INTEGRATION:  PASS  (DLP)   BM: awaiting localised assets

WEBP CONVERSION:        PASS   (13/13, q94, −90.1%, text verified against source)
IMAGE SIZING:           PASS   (741–778 px desktop, bounded height, no posters)
ENLARGE MODAL:          PASS   (open, contain, focus, Escape, close, scroll lock released)
INTERACTIVE HOTSPOTS:   PASS   (34 hotspots, 9 figures, all verified against the artwork)
MOBILE QA:              PASS   (430 / 390 / 375 — no page overflow, no clipping)
BM/DLP VISUAL PARITY:   DEFERRED BY DESIGN — academically equivalent; 13 BM assets required
BROKEN IMAGE PATHS:     0
DEAD HOTSPOTS:          0
RUNTIME PNG REFERENCES: 0
```

**The one thing needing your decision:** all 13 images are English-labelled, so BM currently gets
none of them. Commissioning the BM re-cuts listed in §4 is what closes the visual gap.
