# Chapter 3 final structural and visual pass

Scope: Science Form 1, 3.1 Homeostasis in Living Things, BM and DLP. No Chapter 4 work.

## Files changed

- `src/content/form1/science/chapter-3/chapter3-content.ts`: source-specific DLP corrections, textbook section headings, existing banana wording moved from UI configuration, source-backed importance content.
- `src/components/notes/ScienceF1Chapter3VisualNotesBlock.tsx`: six-card conceptual path, deep navy Science shell, textbook headings, visible learning-standard coverage, plants and importance integration, removal of stale UI configuration.
- `src/components/notes/blocks/Chapter3PlantHomeostasis.tsx`: shared plant transport, leaf cross-section, stoma and banana-leaf diagrams, plus importance flows/reflections.
- `src/components/notes/ScienceF1Chapter3FinalPass.test.tsx`: 16 canonical live-render tests covering the final brief.
- `src/components/notes/ScienceF1Chapter3Pass1.test.tsx`: expectations now allow intentional language-specific facts.
- `src/components/notes/ScienceF1Chapter3VisualNotesBlock.test.tsx`: textbook plant headings.
- This audit.

## Language-specific source corrections

The user's final-pass brief supplies the official DLP wording and explicitly resolves earlier differences. DLP now uses homeo = similar / stasis = stable; walking and jogging are five minutes; high-water correction uses the supplied sentence about stimulating hormone secretion so kidneys increase urine production. BM retains sama / tidak bergerak, ten-minute activities and its existing reduction-in-secretion wording. Pulse counting remains one minute in both. No pulse values are fabricated.

The complete official DLP PDF was not independently available; these corrections are attributed to the excerpts supplied by the user, rather than a new independent PDF verification.

## Structure and visuals

Only 3.1 is marked as an official curriculum subtopic. Visible 3.1.1–3.1.4 markers identify learning-standard coverage, not additional curriculum subtopics. Experiments remain within the human homeostasis flow. The header has six conceptual cards and no empty numbering spans.

The shell uses #061923. Existing human/experiment SVGs and animal SVGs remain unchanged. Their complete source component files were checked against HEAD; animal source data is also unchanged.

The main plant visual traces soil water through root hairs/uptake and the stem to the leaf, then shows a leaf cross-section, stoma and escaping water vapour. Numbered markers match the seven-step visible route. Existing transpiration functions and the approximately 90% fact remain. No xylem detail is introduced.

Open/closed stoma diagrams use the same guard-cell rendering function and outer outlines; state controls the inner edge, spacing, pore width and escaping vapour/gas arrows. Day/open and too-hot/closed source explanations are displayed together. The banana comparison shows broad versus inward-rolled leaf area alongside the original explanation.

The dedicated importance section appears before Chapter Check and links homeostasis, stable internal conditions, optimum conditions and efficient cell metabolism. The enzyme relationship is confined to this section, with two short reflection prompts and no worksheet inputs.

## Source and wording audit

BM plant concepts were checked against `C:/Users/rayya/Downloads/T1 BT SN- SAINS.pdf`, printed p. 80 (PDF p. 90). Importance explanation, enzyme explanation and reflection questions were checked against printed p. 83 (PDF p. 93).

New section headings come from the user-supplied textbook headings. Banana explanation is moved verbatim from existing UI data. Existing plant definition, functions, water-loss fact and stoma explanations are preserved.

Added presentation wording includes short plant-route labels, transpiration-pull/cooling labels, open/closed and banana comparison labels, and compact importance flow steps. Their concepts come from the supplied brief and BM source. New English importance explanations/reflections and BM compact labels are semantic presentations of those approved concepts, not claims of verbatim official DLP quotations.

UNSUPPORTED SCIENTIFIC CONCEPTS ADDED: NONE. Newly arranged/condensed learner-facing wording is disclosed above; this audit does not claim every new label is a verbatim textbook excerpt.

## Verification

- 61 relevant tests passed across Chapter 3 and notes navigation/shell checks; all 53 Chapter 3 tests passed again after the final stoma refinement.
- Targeted ESLint and diff whitespace checks passed.
- Shared BM/DLP SVG geometry is verified, while language-specific text/durations are explicitly allowed.
- Twelve plant SVG instances were rasterized and inspected, followed by final close-ups of the closed stoma and banana leaves.
- Production build passed, including a final run after diagram refinements.
- Responsive layouts stack diagrams on narrow screens; labels and source explanations remain HTML text. No browser/mobile screenshot measurements are claimed.

Stopped after Chapter 3. No commit, push or deployment.
