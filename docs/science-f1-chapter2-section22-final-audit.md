# Science Form 1 Chapter 2 — final Section 2.2 pass

Scope: Section 2.2 in the live `ScienceF1Chapter2VisualNotesBlock`, BM and DLP together. No Chapter 3 work, commit, push or deployment.

## Files changed

- `src/components/notes/ScienceF1Chapter2VisualNotesBlock.tsx`: integrates the process diagrams and investigation hub; preserves the comparison table. Section 2.1 markup and components are unchanged.
- `src/components/notes/blocks/Chapter2ProcessVisuals.tsx`: shared educational SVG geometry, five-state investigation selector and complementary material cycle.
- `src/content/form1/science/chapter-2/chapter2-activities.ts`: expands the existing starch visual procedure from five combined stages to the seven requested stages. No second investigation dataset.
- `src/components/notes/ScienceF1Chapter2Section22.test.tsx`: 22 renderer tests covering the requested Section 2.2 behavior.
- This audit report.

## Implemented visuals

- Breathing: human/lungs, incoming oxygen and outgoing carbon dioxide; distinguished from energy release. Cell respiration: enlarged body cell, mitochondrion, glucose/oxygen inputs and carbon dioxide/water/energy outputs. Existing definition and word equation preserved.
- Photosynthesis: simplified plant, sunlight, carbon dioxide entering a leaf, water entering through roots and moving upward, chlorophyll/chloroplast context, glucose and oxygen outputs. Word equation parsed without changing its wording; light energy and chlorophyll appear separately above the equation arrow.
- Starch: seven visual stages; ethanol container visibly inside the hot-water bath; no flame or burner depicted. White tile, iodine and brown-to-dark-blue outcome shown. Source safety note prominent.
- Light: two similar destarched plants, light/dark setups and blue/brown leaf outcomes.
- Chlorophyll: the same variegated leaf before/after iodine, with green/non-green regions becoming blue/brown.
- Carbon dioxide: two plants under sealed bell jars in sunlight; potassium hydroxide in one jar; source absorption setup and teacher/lab supervision note; blue/brown outcomes.
- Water: two plants in sunlight, daily watering/no watering, blue/brown leaf outcomes.
- Complementary cycle: photosynthesis → glucose/oxygen → cell respiration → carbon dioxide/water → photosynthesis. Energy is absent from the returned materials; it remains a product in the respiration equation.

Every investigation renders its source question, setup, variables, observation and inference. The source `observeInfer` text is separated at its final sentence boundary, or the existing comma for starch; joining the displayed pieces reproduces the original text exactly.

BM/DLP use the same React components and SVG geometry. Diagram geometry tests pass for all processes and all five investigations. Controls use native buttons, pressed state, a controlled panel, visible focus and a polite live region. Layouts stack on small screens; information does not require hover.

## Source audit

Definitions, equations, experiment questions, setups, variables, observations, inferences and safety statements originate from the existing Chapter 2 source. No scientific facts were added from general knowledge. The section heading follows the supplied request and existing chapter terminology.

The following new presentation wording is **not verbatim text from the pre-existing notes**. It implements the supplied request's teaching points, diagram states and question/setup/variables structure; the BM equivalents are presentation labels. These are explicitly reported rather than claiming no new wording:

| DLP | BM |
| --- | --- |
| Breathing ≠ cell respiration | Pernafasan ≠ respirasi sel |
| Gas exchange ≠ energy release | Pertukaran gas ≠ pembebasan tenaga |
| Body cell (already present in the DLP source) | Sel badan |
| Question (already present in the DLP source) | Soalan |
| Visual setup | Susunan radas |
| Variables (already present in the DLP source) | Pemboleh ubah |
| Before starch test | Sebelum ujian kanji |
| After iodine | Selepas larutan iodin |
| Carbon dioxide available | Karbon dioksida tersedia |
| Carbon dioxide removed | Karbon dioksida disingkirkan |

The seven-stage expansion adds `Place the leaf in ethanol` / `Letakkan daun dalam etanol`, expressly requested in the supplied brief. `Add iodine solution` and `Observe the colour`, with their existing BM equivalents, split the original combined source step.

Other diagram labels are existing Chapter 2 terminology or source phrases, with initial capitalization for standalone labels.

Source uncertainty:

- `chapter2-content.ts` documents that an official DLP textbook was not supplied and existing English content is a semantic translation. This pass reuses that existing DLP source.
- The starch source's `variables` field is an evidence-test note, not a manipulated/responding/constant-variable list. It is rendered unchanged. The other four investigations render their complete existing variable lists.
- No new source conflict was found in the facts implemented during this pass.

## Verification

- All relevant Chapter 2 tests: **8 files, 107 tests passed**, including 22 new Section 2.2 tests.
- Production build: passed, including static shell, sitemap and Pages worker packaging.
- SVG visual QA: 38 source-rendered SVGs rasterized with Sharp and inspected in a contact sheet; adjusted a KOH label/arrow overlap.
- Browser/mobile click QA: unavailable because the computer-use tool reports **No browser is available**. Renderer tests exercise all selected states; they do not claim browser clicks or measured mobile layout verification.

Stopped after this Chapter 2 pass.
