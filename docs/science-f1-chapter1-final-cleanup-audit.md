# Science Form 1 Chapter 1 — final cleanup audit

11 September 2026. Scope: Chapter 1 BM + DLP only. This report supersedes the completion-pass report for the changes described below. No commit or deployment.

## 1. Factual corrections

- DLP measurement terminology is **Accuracy, Consistency, Sensitivity and Errors**. BM remains **Kejituan, Kepersisan, Kepekaan dan Ralat**. The canonical label now supplies Consistency to the notes and derived mind map. The internal `precision` property name remains for compatibility, with a source comment; it is not learner-facing terminology.
- Updated affected Chapter 1 notes, quiz question/options/explanation and flashcards, including matching legacy data records. No IDs, answer indices or other chapters changed.
- Preserved the textbook-specific conclusion difference, as explicitly chosen by the user: BM refers to one complete oscillation; DLP refers to ten. Both measured responding variables, results and graph axes remain ten oscillations.

## 2. Missing content added

- 1.1: selected science field → existing career `subject` → existing possible careers, inside the current selector.
- 1.2: compact fire-prevention summary, using existing safety/emergency content and the approved brief. No detailed firefighting procedure.
- 1.3: mass, length and time conversion ladders; standard-unit illustration comparing different hand spans on the same table.
- 1.4: source-backed vernier and micrometer worked readings, zero-error states and correction principle.
- 1.5: four equal-volume cubes (copper, iron, cork, wood), investigation flow and mass–density–volume triangle with all three rearrangements. No invented cube masses or densities.
- 1.6: all three source readings plus printed average; compact report structure and passive-procedure example.
- 1.7: unchanged.

The optional product-label example was omitted: no specific source-backed product label was established. `dm` was not added to the conversion ladder.

## 3. Repetition removed

- Reduced generic science-importance bullets to one; retained specific daily-life examples and canonical source data.
- Classification contains category → apparatus names, without repeating all gallery function sentences.
- Removed five large water-displacement text cards from the live component. Kept the proper V₁/V₂ diagram, canonical steps in data and practical activity.
- Removed the repeated pendulum-variable card; the same variables remain attached to the apparatus diagram.
- Retained concept/diagram/practical combinations where they serve different teaching purposes. No additional values cards were added.

## 4. Visual improvements

All additions are code-authored SVG lines/shapes and compact HTML; no image-generation assets, dependencies or global style changes.

- Vernier example: main scale 3.20 cm, second vernier line coincident, vernier contribution 0.02 cm, total 3.22 cm. Scale spacings encode 10 vernier divisions across 9 main-scale divisions.
- Vernier zero-error diagrams: 0.00 cm, +0.03 cm, −0.06 cm; negative reading counted back from the tenth mark.
- Micrometer: last visible sleeve half-millimetre mark gives 3.50 mm; thimble line 38 gives 0.38 mm; total 3.88 mm. Textbook zero-error values +0.01 mm and −0.02 mm and subtraction correction are included. The textbook calls the secondary micrometer scale a vernier scale; the display identifies the thimble while noting that source terminology.
- Shared bilingual diagrams for conversion context, equal-volume cubes and formula relationships.
- Results table uses row/column headers, units in its caption, and three trial columns. Original graph averages are unchanged.

The UI/UX skill informed label readability, compact grouping, non-colour-only indicators and retention of accessible table/text alternatives. It did not introduce a new design system.

## 5. DLP terminology source

Authority: original KPM curriculum/textbook content accessed through public reproductions, not a translation preference or an existing test expectation:

- [KSSM Science Form 1 DSKP reproduction](https://studylib.net/doc/25321481/dskp-science-form-1), printed p.42, standards 1.4.1–1.4.3.
- [KPM Science Form 1 textbook reproduction](https://fliphtml5.com/ffzny/jcjo/SCIENCE_FORM_1_TEXT_BOOK_DLP_KSSM/), §1.4 and printed pp.22–25.
- [School-library reproduction of the textbook](https://fliphtml5.com/bjsfz/tpck/Science_Form_1/), contents and instrument examples, corroborates the wording and numerical examples.
- [BM vernier example, printed p.22](https://online.anyflip.com/tfnwp/gvli/files/basic-html/page32.html) and [BM textbook reproduction, printed p.23](https://anyflip.com/ejbrb/vudj/basic), corroborate the worked values.

## 6. Pendulum conclusion decision

DLP printed p.37 states the ten-oscillation relationship. The BM reproduction's printed p.37 conclusion uses one oscillation, while its p.36 graph discussion uses ten. This source difference was raised with the user, who selected **“Preserve each textbook’s conclusion wording.”** The implementation and live tests explicitly preserve that exception to text parity.

Sources: [DLP textbook](https://fliphtml5.com/ffzny/jcjo/SCIENCE_FORM_1_TEXT_BOOK_DLP_KSSM/) pp.36–37; [BM Chapter 1 reproduction](https://anyflip.com/xqiek/xqzh/basic) pp.36–37.

The supplementary divide-by-ten explanation is visibly labelled **AcadeMY Tip / Tip AcadeMY**. It is not substituted for either conclusion or for the measured results.

## 7. Full results source

Experiment 1.1, printed p.36: [DLP page reproduction](https://fliphtml5.com/oihfo/rivs/Science_Form_1/47/), corroborated by the [BM chapter reproduction](https://fliphtml5.com/ycfyp/pejx/1_Sains_Tingkatan_1Sains_Tingkatan_1-12-53/).

| Length (cm) | Reading 1 (s) | Reading 2 (s) | Reading 3 (s) | Printed average (s) |
| --- | --- | --- | --- | --- |
| 20 | 9.1 | 9.2 | 9.0 | 9.1 |
| 30 | 11.3 | 11.4 | 11.4 | 11.4 |
| 40 | 13.1 | 13.0 | 13.1 | 13.1 |
| 50 | 14.4 | 14.3 | 14.3 | 14.3 |
| 60 | 15.2 | 15.1 | 15.3 | 15.2 |

Every time value is for ten oscillations. No trial was fabricated from an average. Printed averages, including their rounding, are retained. Report headings are from printed p.35; the passive-procedure instruction appears on p.36.

## 8. Files changed

- `src/components/notes/ScienceF1Chapter1VisualNotesBlock.tsx`
- `src/components/notes/ScienceF1Chapter1VisualNotesBlock.test.tsx`
- `src/components/notes/blocks/Chapter1Completion.tsx`
- `src/components/notes/blocks/Chapter1FinalCleanup.tsx` (new)
- `src/content/form1/science/chapter-1/chapter1-canonical.ts`
- `src/content/form1/science/chapter-1/chapter1-cleanup.ts` (new, sourced numerical examples/results/report headings)
- `src/content/form1/science/chapter-1/chapter1-coverage.test.ts`
- `src/data/content.ts`, `src/data/notes.ts`, `src/data/quizzes.ts`, `src/data/flashcards.ts` — only affected Science Form 1 Chapter 1 DLP terminology records.
- This report.

Existing apparatus SVGs, four comparisons, classification membership, ten rules, hazards, density explorer, displacement, pendulum setup and graph remain. No old components were deleted.

## 9. QA results

- **57 tests passed across 13 files**: all nine Form 1 visual-note test files, Chapter 1 canonical/assessment tests, science notes navigation, chapter availability and science discovery checks. Chapter 2+ tests were run read-only as regression checks; their implementations were not changed.
- Chapter 1 live renderer: **19 tests**, including both languages, all readings, conclusion exception, terminology, diagram presence, report headings, repetition removal and parity. These render `ScienceF1Chapter1VisualNotesBlock`, not the legacy notes component.
- Canonical tests now explicitly identify curriculum-data/legacy-interaction metadata coverage; their learning-standard assertions remain intact.
- Production build: passed.
- TypeScript: still blocked by the same two untouched Form 2 `string | undefined` errors at `chapter-7-9-10-visual-integration.test.tsx:291` and `chapter-9/chapter-9-heat-visuals.test.tsx:480`. No Chapter 1 TypeScript errors reported.
- New BM/DLP SVG figures rasterized and visually inspected. The temporary QA harness passed and was removed.
- Full desktop/mobile browser interaction QA was not performed; no browser-based sign-off is claimed.

## 10. Human-review items

- Confirm the BM/DLP edition difference in the institution's approved textbook copies; the implementation follows the user's explicit decision above.
- Browser review at actual mobile/desktop widths remains advisable for the new scales and five-column table.
- The previous pass's existing pure-water `40°C` label remains unchanged and still needs textbook-image verification; this cleanup did not silently amend it.
- Public reproductions, rather than directly hosted KPM files, were used to inspect the original textbook/DSKP content. Source URLs and printed page numbers are recorded above for verification.

UNSOURCED LEARNER-FACING ACADEMIC CONTENT ADDED: NONE

Numerical examples come from the cited textbooks; illustrative hand-span graphics, formula rearrangement and instructional labels follow the user's approved brief. This is not a claim that every pre-existing sentence in the chapter has been independently re-audited.

Stopped after Chapter 1. No Chapter 2+ changes, route rebuild, global redesign, commit or deployment.
