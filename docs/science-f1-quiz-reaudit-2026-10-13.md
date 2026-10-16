# Science Form 1 quiz re-audit — PR #65

This report supersedes the initial 2026-10-13 review. Audit branch: `audit/science-f1-quizzes-visuals-2026-10-13`. Baseline head: `1e7a94cd6a0a304e82a6554fa713f0c8156d3113`; original base: `d266d9f483c9f61ea097ebfb6026074a819d18d4`.

## Scope and decision accounting

All **270 numbered pairs / 540 BM+DLP records** were read, including stems, four options, marked answers and explanations. Retained 30 records per chapter per language and every ID. Decisions below describe **this re-audit relative to the original PR head**, excluding presentation-only changes from question revision counts. KEEP means no additional repair was identified; it is not an independent textbook-verification stamp. CORRECT includes difficulty changes and answer-position corrections. These are editorial judgements, not measured item-discrimination statistics.

- This re-audit changes **106 pairs / 212 records**.
- Classification totals: **{'KEEP': 328, 'CORRECT': 180, 'REPLACE': 4, 'REWRITE': 28}** (540 records).
- The entire PR now differs from its original base at **112 pairs / 224 records**.
- Original PR count verified by executing the TypeScript exports at both Git revisions: **15 pairs / 30 records**, not 14. Original pairs: C3 Q25/Q28; C4 Q13/Q22/Q30; C5 Q29/Q30; C6 Q28/Q29; C7 Q26/Q30; C8 Q26/Q30; C9 Q28/Q30.

| Chapter | KEEP records | CORRECT records | REWRITE records | REPLACE records | Revised pairs | Final Easy/Medium/Hard per language |
|---|---:|---:|---:|---:|---:|---|
| 1 | 54 | 6 | 0 | 0 | 3 | 10/10/10 |
| 2 | 58 | 2 | 0 | 0 | 1 | 10/10/10 |
| 3 | 18 | 40 | 0 | 2 | 21 | 12/17/1 |
| 4 | 44 | 10 | 6 | 0 | 8 | 13/14/3 |
| 5 | 38 | 18 | 2 | 2 | 11 | 16/12/2 |
| 6 | 42 | 16 | 2 | 0 | 9 | 18/12/0 |
| 7 | 36 | 16 | 8 | 0 | 12 | 15/12/3 |
| 8 | 28 | 26 | 6 | 0 | 16 | 19/10/1 |
| 9 | 10 | 46 | 4 | 0 | 25 | 23/6/1 |

## Sources and verification boundaries

Primary local sources inspected: `T1 BT SN- SAINS.pdf` (BM Form 1 textbook, Downloads) and `DSKP.pdf` (Science Form 1 curriculum, Downloads). Printed BM page p corresponds to zero-based PDF index p + 9. DSKP mapping was read from its learning-standard tables (PDF pp. 51–57, 60–67, 70–75, 78–82, 85–88).

BM pages inspected for this audit include 12–13; 72–83; 89–95, 100, 103–106, 108, 110, 112, 114, 116–118, 120, 124–127, 129–130; 141–142, 147, 149–150, 152–156; 164–167, 169–170, 178, 182, 184–186; 204–205, 207–211; 228–234, 237, 239–240, 242, 244, 246–247; 256–257, 260, 262–273. This is a documented source sample supporting corrections, **not a claim of a page-by-page source check for every retained question**. Chapter 1's established canonical audit and Chapter 2's paired bank remain authoritative in the repository.

DLP cross-check: [school-library facsimile of Science Form 1](https://fliphtml5.com/bjsfz/tpck/Science_Form_1/), specifically the Chapter 3 cold response/snail passage, Chapter 7 extinguishing methods and Chapter 9 mantle-convection explanation. Both language banks were compared semantically throughout; full independent DLP textbook verification for every retained sentence remains a limitation. No scientific source conflict was resolved by inventing a new factual rule.

The row-level DSKP/SP column is an editorial assessment alignment, not metadata inserted into the learner question. Chapter 2 uses its existing canonical `sp`. Where an item combines skills, both standards are shown. Thirty questions sample each chapter; they do **not** certify every DSKP standard. Practical performance, presentations, attitudes, some health topics, ocean stratification/hydrothermal processes and detailed filter tasks are not exhaustively assessed by this MCQ bank.

## Scientific and pedagogical corrections

- C3 Q18's previous explanation grouped shivering with heat-loss reduction. Shivering generates heat; constriction/erect hairs reduce loss. Corrected the explanation and related response alternatives. Snail wording now follows source fluid rather than introducing a narrower secretion claim. Related human/plant response distractors replace irrelevant alternatives.
- C2 Q24 explanation no longer depends on the original option position; its answer, SP, canonical pair and blueprint are unchanged.
- C4 adds a controlled seed-germination comparison and improves spore identification and embryo/implantation sequence. Existing blocked-tube and ovule-to-seed problems remain. Hypothetical assessment setups are not represented as measured textbook data.
- C5 separates container shape/volume, diffusion comparison, heat during a plateau and physical/chemical change. Removes the unsupported surface-only addition from the evaporation explanation; the verified chapter statement is used. Avoids gas/vapour as competing synonymous answers.
- C6 chromatography asks what separated spots imply, rather than merely naming the apparatus. Electron wording does not add shell structure. Difficulty reflects the actual demand.
- C7 combustion includes heating, oxygen, heat and light. CO₂ cooling is explicitly framed as the textbook technique rather than claiming a universal extinguisher mechanism. Carbon-monoxide effect follows the chapter. Candle, forest-clearing and acid-rain questions require controlled comparison or linked reasoning. Removes unsupported carbonate-reaction detail.
- C8 reflection now distinguishes angles measured from the normal versus the surface; refraction explanations omit unsourced speed rules. Periscope tests repeated reflection. Spectrum alternatives all contain the seven colours. Scattering assesses blue-sky/sunset contrast without introducing wavelength theory.
- C9 removes advanced elastic-rebound/seismic-energy teaching and unexplained NTU values. Uses mantle convection and a qualitative mining/runoff scenario. Balances stored correct positions **8/8/7/7**, with matching BM/DLP meaning. Related alternatives and more balanced wording reduce length cues. Runtime shuffling is unchanged.

No existing numeric correct-answer index was found to select a different scientifically correct answer after option remapping. The main scientific error corrected was the C3 heat-generation/heat-loss explanation; other repairs concern scope, precision, ambiguity, distractors and reasoning. This is not a claim that author judgement replaces classroom item analysis.

Difficulty changes: C3 Q28: Hard → Medium; C3 Q29: Hard → Medium; C4 Q15: Easy → Hard; C5 Q19: Medium → Easy; C5 Q27: Hard → Medium; C5 Q28: Hard → Medium; C5 Q29: Hard → Medium; C6 Q18: Medium → Easy; C6 Q19: Medium → Easy; C6 Q26: Hard → Easy; C6 Q27: Hard → Medium; C6 Q28: Hard → Medium; C6 Q30: Hard → Medium; C7 Q27: Hard → Medium; C7 Q29: Hard → Medium; C8 Q22: Medium → Easy; C8 Q23: Medium → Easy; C8 Q24: Medium → Easy; C8 Q27: Hard → Medium; C8 Q28: Hard → Easy; C8 Q30: Hard → Medium; C9 Q16: Medium → Easy; C9 Q18: Medium → Easy; C9 Q19: Medium → Easy; C9 Q20: Medium → Easy; C9 Q21: Medium → Easy; C9 Q22: Medium → Easy; C9 Q24: Medium → Easy; C9 Q25: Medium → Easy; C9 Q26: Hard → Medium; C9 Q27: Hard → Medium; C9 Q28: Hard → Medium; C9 Q29: Hard → Medium.

Revised option wording (not merely C9 permutation): C1 Q3, C1 Q5, C1 Q14, C3 Q1, C3 Q3, C3 Q4, C3 Q7, C3 Q8, C3 Q9, C3 Q10, C3 Q13, C3 Q14, C3 Q15, C3 Q16, C3 Q18, C3 Q19, C3 Q20, C3 Q21, C3 Q23, C3 Q24, C3 Q25, C3 Q28, C3 Q29, C3 Q30, C4 Q8, C4 Q11, C4 Q15, C4 Q16, C4 Q17, C4 Q18, C4 Q23, C4 Q24, C5 Q5, C5 Q8, C5 Q10, C5 Q13, C5 Q17, C5 Q26, C5 Q27, C5 Q28, C6 Q5, C6 Q6, C6 Q18, C6 Q19, C6 Q24, C7 Q5, C7 Q8, C7 Q11, C7 Q17, C7 Q19, C7 Q21, C7 Q23, C7 Q26, C7 Q28, C7 Q30, C8 Q2, C8 Q4, C8 Q9, C8 Q13, C8 Q16, C8 Q18, C8 Q22, C8 Q25, C8 Q27, C8 Q29, C9 Q10, C9 Q13, C9 Q19, C9 Q20, C9 Q25, C9 Q27, C9 Q28, C9 Q29, C9 Q30.

Repeated foundational concepts are retained when demand differs: C1 displacement vs density; C3 individual temperature mechanisms vs combined response; C4 fertilisation vs implantation/development; C8 law recall vs angle-reference error. Replaced C5 diffusion repetition with a controlled-condition interpretation. Some recall remains intentionally Easy; no quota is used to relabel it Hard.

## Registry, rendering and shuffle contract

Removed image-decoration cloning from `getChapterQuizQuestions`; canonical object identity is preserved and the original C1 `toBe()` assertion remains intact. The route resolves the same shared visual map through `ScienceF1QuizVisual` at presentation time. It handles questions without IDs, leaves existing images and other subject visual paths intact, and supplies localised stimulus descriptions. No factual bank is duplicated.

The actual route tests render BM and DLP measurement questions, including the quiz portal. Their assertion searches the rendered document, not the detached root container. Existing timer, Shuffle, Redo, difficulty-filter, completion and progress mocks remain covered. All 540 records are checked through option permutations for correct-answer/explanation preservation and source immutability. Runtime question/option shuffle, XP, timer, scores, history and authentication code were not changed.

## Visual inventory and pairing decisions

**14 retained SVGs, 19 question pairs / 38 language mappings**. Removed the unused A/B/C fire triangle asset and its C7 Q12 pairing; removed the decorative flower from C4 Q14 but retained its ovule stimulus for Q30. No photos were added.

| Asset | Paired questions | Review and correction |
|---|---|---|
| measurement | C1 Q4, Q18 | Equal-width cylinders; water heights proportional to 50/65; distinct before/after captions; density vs displacement demand differs. |
| leaf-light | C2 Q18 | Clearly opaque covered patch and light, bilingual labels; no starch-result answer shown. |
| stoma | C3 Q15, Q25 | Guard-cell/pore geometry; removed chloroplast-like marks outside guard cells; supports structure/function, not answer text. |
| flower | C4 Q30 | Section with six ovules, no four-seed answer; removed face-on radial petals. |
| particles | C5 Q9, Q11 | Same 12 equal particles in all states, ordered/irregular/spaced arrangement; no false quantity/type change. |
| heating-curve | C5 Q22 | Conceptual unnumbered plateau; larger labels, no invented temperatures or answer explanation. |
| chromatography | C6 Q24 | Baseline above solvent, four spots; question requires interpretation of dyes, not naming image. |
| mirror | C8 Q8 | Correct facing reflective surface and 2 m object distance; image position omitted. |
| reflection | C8 Q17, Q18 | Normal perpendicular to mirror; incident ray and true 35° arc measured from normal; outgoing answer omitted. |
| refraction-glass | C8 Q19 | Incoming air-to-glass ray, labelled media and normal; outgoing answer omitted. |
| refraction-water | C8 Q20 | Water correctly below surface; ray travels upward to air; non-extreme incidence; outgoing answer omitted. |
| periscope | C8 Q25 | Two parallel 45° mirrors, two reflections and directed A-to-B path. |
| earth-layers | C9 Q9, Q12 | Four concentric regions, not five; thin crust and consistent A–D leaders; explicitly not to scale. |
| plates | C9 Q28 | Converging arrows match revised tectonic question; larger bilingual label. |

All retained SVGs were rasterised and inspected together at desktop and 320-pixel diagram widths. Captions touching apparatus were moved down with a taller viewBox; scientific geometry is shared by BM/DLP. A raster contact sheet is not a browser screenshot. Browser access became available on 2026-10-16: the isolated localhost app was inspected as a guest in DLP (C1 displacement) and BM (C8 plane mirror and reflection), including 390×844 mobile and 1280×900 desktop views. Labels were readable and the images loaded. Desktop images initially expanded excessively, so the Science-only image component now has a centred 36rem width cap, retaining full available mobile width. Actual language selection, chapter selection, Shuffle and exit confirmation were exercised; no quiz was completed or student score submitted. These are representative browser checks, not an exhaustive browser walkthrough of all 38 mappings. All mappings have live component tests.

## Validation and deployment investigation

- Isolated PR checkout: **181 tests passed in ten files**, including 153 Science/identity/visual/shuffle/live-route tests and 28 routing/counts/loading tests.
- Additional routing/counts/loading/error-state tests: **28 passed in four files** (React act-environment warnings in existing interactive tests).
- `npm run build`: **passed**, including client/server builds and Cloudflare Pages packaging.
- `npx tsc --noEmit`: **not green**. Remaining diagnostics are in untouched files: Form 2 Science `chapter-7-9-10-visual-integration.test.tsx:305` and `chapter-9/chapter-9-heat-visuals.test.tsx:523` (`string | undefined`), plus missing `jsqr`/`pngjs` declarations in `features/business-card/qr-code.test.ts`. The optional-ID errors introduced during this audit were fixed.
- Full targeted ESLint also reports repository formatting/line-ending errors. A separate semantic lint run with only `prettier/prettier` disabled reports **zero errors, three existing route hook/fast-refresh warnings**. This is not described as an unqualified lint pass; no shared files were reformatted wholesale.
- Final image-width change: all **47 visual/live-route tests passed again**; production build passed again. Full ESLint passes for the new renderer, its test, visual map, re-audit test and live-route test after line-ending normalization.
- `git diff --check`: passed.

These checks support code/content review, **not merge/release approval**. Remaining gates: outstanding TypeScript/formatting checks and deployment-log verification. Exhaustive browser review of every mapping is not claimed. Full independent textbook verification of every retained sentence is not claimed.

An unrelated Math Form 2 merge appeared in the shared local branch during this task. The Science changes were transferred to an isolated checkout of the original PR head before committing, so that unrelated history is excluded from the pushed audit. The 181-test suite, typecheck and production build were rerun there with the same results.

The original PR's Vercel bot metadata reports `rootDirectory: silken-sheen-main`. That nested folder exists but contains a separate old package (`build: vite build`), while the audited source and current build scripts are at repository root. This is a concrete configuration mismatch with the code being reviewed. The original PR also had successful Cloudflare Pages previews. Vercel build logs were not accessible through the available browser session, so **the exact failing build step is not proven**; do not blame quiz data or call the deployment fixed. No speculative deployment setting change was made. Confirm the intended Vercel project root/build adapter in the deployment dashboard before release.

## Complete question-by-question decisions

Each BM and DLP record has its own row. Visual-only edits are recorded in the final column; they do not inflate revised-question totals.

| Chapter | Question ID | BM/DLP | Classification | Problem | Action | DSKP/SP | Visual needed? |
|---|---|---|---|---|---|---|---|
| 1 | sci-f1-c1-bm-q1 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah definisi Sains? | 1.1.2 | No; text sufficient |
| 1 | sci-f1-c1-bm-q2 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Bidang Sains manakah yang mengkaji benda hidup? | 1.1.4 | No; text sufficient |
| 1 | sci-f1-c1-bm-q3 | BM | CORRECT | Replace deliberately mismatched field/example pairs with related field alternatives. | Updated options. | 1.1.4/1.1.7 | No; text sufficient |
| 1 | sci-f1-c1-bm-q4 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Sebiji batu berjisim 45 g. Apabila ditenggelamkan sepenuhnya, bacaan air meningkat daripada 50 cm³ k… | 1.5.4 | measurement.svg |
| 1 | sci-f1-c1-bm-q5 | BM | CORRECT | Balance option lengths while retaining the independently tested correct answer. | Updated options. | 1.5.2/1.5.4 | No; text sufficient |
| 1 | sci-f1-c1-bm-q6 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Kategori bahan berbahaya manakah merangkumi gas hidrogen dan gas butana? | 1.2.2 | No; text sufficient |
| 1 | sci-f1-c1-bm-q7 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Seorang murid meletakkan alkohol di sebelah penunu yang menyala. Perubahan manakah menangani bahaya … | 1.2.4 | No; text sufficient |
| 1 | sci-f1-c1-bm-q8 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Bacaan ulangan sebuah kumpulan tidak menyokong hipotesisnya. Kumpulan lain memperoleh pola yang dija… | 1.7.3 | No; text sufficient |
| 1 | sci-f1-c1-bm-q9 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Bahan kimia berlabel mengakis terpercik pada kulit seorang murid. Tindakan manakah mematuhi arahan k… | 1.2.4 | No; text sufficient |
| 1 | sci-f1-c1-bm-q10 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Sebuah kumpulan hampir selesai apabila bahan kimia tertumpah. Seorang ahli mencadangkan agar penguku… | 1.2.4/1.7.3 | No; text sufficient |
| 1 | sci-f1-c1-bm-q11 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Padanan radas dengan fungsi yang manakah betul? | 1.2.1 | No; text sufficient |
| 1 | sci-f1-c1-bm-q12 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Seorang murid perlu mengukur diameter dawai halus. Alat manakah paling sesuai untuk mengesan perbeza… | 1.4.1/1.4.2 | No; text sufficient |
| 1 | sci-f1-c1-bm-q13 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah unit SI untuk Panjang? | 1.3.1 | No; text sufficient |
| 1 | sci-f1-c1-bm-q14 | BM | CORRECT | Replace brand-name distraction with plausible but invalid unit comparisons. | Updated options. | 1.3.4 | No; text sufficient |
| 1 | sci-f1-c1-bm-q15 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Seorang murid menyiasat kesan panjang bandul terhadap masa untuk sepuluh ayunan. Hipotesis manakah b… | 1.6.1 | No; text sufficient |
| 1 | sci-f1-c1-bm-q16 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Untuk menguji kesan panjang bandul terhadap masa bagi sepuluh ayunan, seorang murid mengubah panjang… | 1.6.3 | No; text sufficient |
| 1 | sci-f1-c1-bm-q17 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Pasangan manakah menukarkan 2.5 km kepada meter dan 2500 mg kepada gram dengan betul? | 1.3.3 | No; text sufficient |
| 1 | sci-f1-c1-bm-q18 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Sebiji batu ditenggelamkan sepenuhnya di dalam silinder penyukat. Bacaan air meningkat daripada 50 c… | 1.5.4 | measurement.svg |
| 1 | sci-f1-c1-bm-q19 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Bagi sepuluh ayunan bandul, panjang 20 cm, 30 cm dan 40 cm memberikan purata masa 9.1 s, 11.4 s dan … | 1.6.3 | No; text sufficient |
| 1 | sci-f1-c1-bm-q20 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah yang diwakili oleh imbuhan Mikro (µ)? | 1.3.2 | No; text sufficient |
| 1 | sci-f1-c1-bm-q21 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Panjang sebenar ialah 10.0 cm. Set P memberikan 12.0, 12.0, 12.0 cm; set Q memberikan 9.9, 10.0, 10.… | 1.4.2 | No; text sufficient |
| 1 | sci-f1-c1-bm-q22 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Huraian manakah mengenal pasti ralat sifar? | 1.4.3 | No; text sufficient |
| 1 | sci-f1-c1-bm-q23 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Suatu alat pengukur mempunyai ralat sifar +0.02 cm dan memberikan bacaan skala 3.22 cm. Berapakah ba… | 1.4.3 | No; text sufficient |
| 1 | sci-f1-c1-bm-q24 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah yang menyebabkan ralat paralaks semasa membaca skala? | 1.4.3 | No; text sufficient |
| 1 | sci-f1-c1-bm-q25 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Sehelai kertas terlalu nipis untuk dibaca terus dengan pembaris bersenggat 1 mm. Pelan manakah palin… | 1.4.4 | No; text sufficient |
| 1 | sci-f1-c1-bm-q26 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah definisi Ketumpatan? | 1.5.4 | No; text sufficient |
| 1 | sci-f1-c1-bm-q27 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Urutan manakah betul pada permulaan penyiasatan saintifik? | 1.6.2 | No; text sufficient |
| 1 | sci-f1-c1-bm-q28 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Seorang murid merekod bahawa objek terapung di dalam air, kemudian menerangkan bahawa objek itu kura… | 1.6.1 | No; text sufficient |
| 1 | sci-f1-c1-bm-q29 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Dua orang murid tidak bersetuju tentang suatu keputusan. Seorang mencadangkan agar keputusan diubah … | 1.7.3 | No; text sufficient |
| 1 | sci-f1-c1-bm-q30 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Sebuah silinder penyukat berjisim 230 g. Selepas 50 cm3 cecair X ditambah, jumlah jisim menjadi 320 … | 1.5.4 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q1 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is the definition of Science? | 1.1.2 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q2 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which branch of Science studies living things? | 1.1.4 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q3 | DLP | CORRECT | Replace deliberately mismatched field/example pairs with related field alternatives. | Updated options. | 1.1.4/1.1.7 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q4 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: A stone has a mass of 45 g. Fully submerging it raises the water reading from 50 cm³ to 65 cm³. What… | 1.5.4 | measurement.svg |
| 1 | sci-f1-c1-dlp-q5 | DLP | CORRECT | Balance option lengths while retaining the independently tested correct answer. | Updated options. | 1.5.2/1.5.4 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q6 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which hazardous-material category includes hydrogen gas and butane gas? | 1.2.2 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q7 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A pupil places alcohol beside a lit burner. Which change addresses the main hazard? | 1.2.4 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q8 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: A group's repeated readings do not support its hypothesis. Another group obtained the expected patte… | 1.7.3 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q9 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A chemical labelled corrosive splashes onto a pupil's skin. Which action follows laboratory safety i… | 1.2.4 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q10 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: A group is nearly finished when a chemical spill occurs. A member suggests finishing the measurement… | 1.2.4/1.7.3 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q11 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which pairing of apparatus and function is correct? | 1.2.1 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q12 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A pupil needs to measure the diameter of a thin wire. Which instrument is most suitable for detectin… | 1.4.1/1.4.2 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q13 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is the SI unit for Length? | 1.3.1 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q14 | DLP | CORRECT | Replace brand-name distraction with plausible but invalid unit comparisons. | Updated options. | 1.3.4 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q15 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A pupil investigates how pendulum length affects the time for ten oscillations. Which hypothesis can… | 1.6.1 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q16 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: To test how pendulum length affects the time for ten oscillations, a pupil changes both the length a… | 1.6.3 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q17 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Which pair correctly converts 2.5 km to metres and 2500 mg to grams? | 1.3.3 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q18 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A stone is fully submerged in a measuring cylinder. The water reading rises from 50 cm³ to 65 cm³. W… | 1.5.4 | measurement.svg |
| 1 | sci-f1-c1-dlp-q19 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: For ten pendulum oscillations, lengths of 20 cm, 30 cm and 40 cm give average times of 9.1 s, 11.4 s… | 1.6.3 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q20 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What does the prefix Micro (µ) represent? | 1.3.2 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q21 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: The actual length is 10.0 cm. Set P gives 12.0, 12.0, 12.0 cm; set Q gives 9.9, 10.0, 10.1 cm. Which… | 1.4.2 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q22 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which description identifies zero error? | 1.4.3 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q23 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A measuring instrument has a zero error of +0.02 cm and gives a scale reading of 3.22 cm. What is th… | 1.4.3 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q24 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What causes parallax error when reading a scale? | 1.4.3 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q25 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: A sheet is too thin to read directly with a ruler marked every 1 mm. Which plan best estimates one s… | 1.4.4 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q26 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is the definition of Density? | 1.5.4 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q27 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which sequence correctly follows the start of a scientific investigation? | 1.6.2 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q28 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A pupil records that an object floats in water, then explains that it is less dense than water. Whic… | 1.6.1 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q29 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: Two pupils disagree about a result. One proposes changing it to match the prediction; the other prop… | 1.7.3 | No; text sufficient |
| 1 | sci-f1-c1-dlp-q30 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: A measuring cylinder has a mass of 230 g. After 50 cm3 of liquid X is added, the total mass is 320 g… | 1.5.4 | No; text sufficient |
| 2 | sci-f1-c2-bm-q1 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Mengapakah sel dianggap sebagai unit asas bagi semua hidupan? | 2.1.1 | No; text sufficient |
| 2 | sci-f1-c2-bm-q2 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Struktur manakah terdapat dalam sel haiwan dan sel tumbuhan? | 2.1.3 | No; text sufficient |
| 2 | sci-f1-c2-bm-q3 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah fungsi kloroplas? | 2.1.3 | No; text sufficient |
| 2 | sci-f1-c2-bm-q4 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Pasangan manakah dikelaskan dengan betul? | 2.1.4 | No; text sufficient |
| 2 | sci-f1-c2-bm-q5 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Sel tumbuhan manakah mempunyai unjuran yang meningkatkan luas permukaan untuk menyerap air dan garam… | 2.1.5 | No; text sufficient |
| 2 | sci-f1-c2-bm-q6 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah urutan organisasi yang betul? | 2.1.6 | No; text sufficient |
| 2 | sci-f1-c2-bm-q7 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Mengapakah spesimen yang hendak diperhatikan di bawah mikroskop perlu dibuat nipis? | 2.1.2 | No; text sufficient |
| 2 | sci-f1-c2-bm-q8 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Mengapakah respirasi sel penting kepada organisma hidup? | 2.2.1 | No; text sufficient |
| 2 | sci-f1-c2-bm-q9 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Set lengkap manakah diperlukan untuk fotosintesis? | 2.2.2 | No; text sufficient |
| 2 | sci-f1-c2-bm-q10 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah perubahan warna positif apabila larutan iodin menguji kanji? | 2.2.2 | No; text sufficient |
| 2 | sci-f1-c2-bm-q11 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Kulit yang luka membentuk sel baharu untuk menggantikan sel rosak. Proses apakah yang terlibat? | 2.1.1 | No; text sufficient |
| 2 | sci-f1-c2-bm-q12 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Seorang murid memerhati sel epidermis bawang dan sel pipi manusia di bawah mikroskop. Struktur manak… | 2.1.3 | No; text sufficient |
| 2 | sci-f1-c2-bm-q13 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Amoeba hanya terdiri daripada satu sel. Bagaimanakah Amoeba dapat terus hidup walaupun hanya mempuny… | 2.1.4 | No; text sufficient |
| 2 | sci-f1-c2-bm-q14 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Gabungan struktur dan fungsi manakah betul bagi sel darah merah? | 2.1.5 | No; text sufficient |
| 2 | sci-f1-c2-bm-q15 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Perut dan usus kecil bekerjasama untuk mencerna makanan. Apakah aras organisasi yang diwakili oleh g… | 2.1.6 | No; text sufficient |
| 2 | sci-f1-c2-bm-q16 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Apakah perbezaan utama antara pernafasan dengan respirasi sel? | 2.2.1 | No; text sufficient |
| 2 | sci-f1-c2-bm-q17 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Seorang murid memerhati tisu epidermis bawang dan melihat banyak sel yang tersusun rapat. Apakah yan… | 2.1.2 | No; text sufficient |
| 2 | sci-f1-c2-bm-q18 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Sebahagian daun ditutup dengan kertas hitam dan sebahagian lagi menerima cahaya. Pokok telah dinyahk… | 2.2.2 | leaf-light.svg |
| 2 | sci-f1-c2-bm-q19 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Pernyataan manakah membandingkan sel yang menjalankan respirasi sel dan fotosintesis dengan betul? | 2.2.3 | No; text sufficient |
| 2 | sci-f1-c2-bm-q20 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Bagaimanakah respirasi sel dan fotosintesis saling melengkapi? | 2.2.4 | No; text sufficient |
| 2 | sci-f1-c2-bm-q21 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Satu kumpulan sel terus membahagi walaupun sel baharu tidak diperlukan lalu membentuk suatu jisim. A… | 2.1.1 | No; text sufficient |
| 2 | sci-f1-c2-bm-q22 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Satu sel masih mempunyai dinding sel yang utuh, tetapi tidak lagi dapat mengawal pergerakan bahan ma… | 2.1.3 | No; text sufficient |
| 2 | sci-f1-c2-bm-q23 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Sel X mempunyai gentian panjang untuk membawa impuls, manakala sel Y mempunyai unjuran panjang yang … | 2.1.5 | No; text sufficient |
| 2 | sci-f1-c2-bm-q24 | BM | CORRECT | Explanation depended on original option position. | Updated explanation. | 2.1.6 | No; text sufficient |
| 2 | sci-f1-c2-bm-q25 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Selepas ujian kanji pada daun bervariegasi, hanya bahagian yang asalnya hijau bertukar biru tua. Apa… | 2.2.2 | No; text sufficient |
| 2 | sci-f1-c2-bm-q26 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Dua pokok yang telah dinyahkan kanji diletakkan dalam serkup kaca A dan B dengan cahaya dan bekalan … | 2.2.2 | No; text sufficient |
| 2 | sci-f1-c2-bm-q27 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Proses P berlaku dalam mitokondria dan sentiasa berlaku. Proses Q berlaku dalam kloroplas ketika ada… | 2.2.3 | No; text sufficient |
| 2 | sci-f1-c2-bm-q28 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Tumbuhan diletakkan dalam gelap selama sehari tetapi masih hidup. Penjelasan manakah paling tepat? | 2.2.3 | No; text sufficient |
| 2 | sci-f1-c2-bm-q29 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Seekor belalang memakan daun tumbuhan hijau. Bagaimanakah fotosintesis tumbuhan menyumbang kepada be… | 2.2.4 | No; text sufficient |
| 2 | sci-f1-c2-bm-q30 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Dalam satu kawasan, bilangan tumbuhan hijau berkurang dengan banyak sementara respirasi organisma te… | 2.2.4 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q1 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Why is the cell considered the basic unit of life? | 2.1.1 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q2 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which structure occurs in both animal and plant cells? | 2.1.3 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q3 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is the function of a chloroplast? | 2.1.3 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q4 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which pair is classified correctly? | 2.1.4 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q5 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which plant cell has a projection that increases its surface area for absorbing water and mineral sa… | 2.1.5 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q6 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is the correct order of organisation? | 2.1.6 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q7 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Why should a specimen placed on a microscope slide be thin? | 2.1.2 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q8 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Why is cellular respiration important to cells? | 2.2.1 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q9 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which complete set is required for photosynthesis? | 2.2.2 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q10 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What positive colour change occurs when iodine solution tests for starch? | 2.2.2 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q11 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Damaged skin forms new cells to replace injured cells. Which process is involved? | 2.1.1 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q12 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A student observes onion epidermal cells and human cheek cells under a microscope. Which structure i… | 2.1.3 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q13 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: How can a unicellular organism such as Amoeba survive with only one cell? | 2.1.4 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q14 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Which structure-function link is correct for a red blood cell? | 2.1.5 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q15 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: The stomach and small intestine work together to digest food. Which level of organisation does this … | 2.1.6 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q16 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: What is the main difference between breathing and cell respiration? | 2.2.1 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q17 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A student observes onion epidermal tissue and sees many closely packed cells. Which statement explai… | 2.1.2 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q18 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Part of a leaf is covered with black paper while the rest receives light. The plant was destarched b… | 2.2.2 | leaf-light.svg |
| 2 | sci-f1-c2-dlp-q19 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Which statement correctly compares the cells that carry out cell respiration and photosynthesis? | 2.2.3 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q20 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: How do cell respiration and photosynthesis complement each other? | 2.2.4 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q21 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: A group of cells keeps dividing when new cells are not needed and forms a mass. What is the best inf… | 2.1.1 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q22 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: A cell still has an intact cell wall but can no longer control the movement of substances into and o… | 2.1.3 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q23 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: Cell X has long fibres for carrying impulses, while cell Y has a long projection that increases its … | 2.1.5 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q24 | DLP | CORRECT | Explanation depended on original option position. | Updated explanation. | 2.1.6 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q25 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: After a starch test on a variegated leaf, only the originally green areas turn dark blue. What is th… | 2.2.2 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q26 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: Two destarched plants are placed in bell jars A and B with the same light conditions and water suppl… | 2.2.2 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q27 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: Process P occurs in mitochondria at all times. Process Q occurs in chloroplasts when light is presen… | 2.2.3 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q28 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: A plant is kept in darkness for one day but remains alive. Which explanation is most accurate? | 2.2.3 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q29 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: A grasshopper eats the leaves of a green plant. How does photosynthesis in the plant contribute to t… | 2.2.4 | No; text sufficient |
| 2 | sci-f1-c2-dlp-q30 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: The number of green plants in an area decreases greatly while organisms continue to respire. If othe… | 2.2.4 | No; text sufficient |
| 3 | sci-f1-c3-bm-q1 | BM | CORRECT | Distractors test unrelated life processes rather than internal regulation. | Updated options. | 3.1.1 | No; text sufficient |
| 3 | sci-f1-c3-bm-q2 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Mengapakah homeostasis penting kepada organisma hidup? | 3.1.4 | No; text sufficient |
| 3 | sci-f1-c3-bm-q3 | BM | CORRECT | BM/DLP distractor mismatch; unrelated clothing and shoe cues. | Updated options. | 3.1.1 | No; text sufficient |
| 3 | sci-f1-c3-bm-q4 | BM | CORRECT | Weak distractors; distinguish a regulated range from an absolutely fixed value. | Updated options. | 3.1.1 | No; text sufficient |
| 3 | sci-f1-c3-bm-q5 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Organ manakah bertindak sebagai pusat kawalan dalam homeostasis manusia? | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q6 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah suhu badan normal manusia? | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q7 | BM | CORRECT | Use competing blood-vessel responses rather than impossible hardening. | Updated options. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q8 | BM | CORRECT | Replace unrelated excretion and plant distractors with heat-transfer alternatives. | Updated options, answerIndex. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q9 | BM | CORRECT | Hair position and air trapping must be compared within one mechanism. | Updated options, answerIndex. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q10 | BM | CORRECT | Replace impossible vessel responses with calibre/heat-loss combinations. | Updated options, answerIndex. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q11 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Mengapakah seseorang menggigil apabila berada dalam persekitaran yang sangat sejuk? | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q12 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Organ manakah mengawal kandungan air dengan menghasilkan air kencing? | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q13 | BM | CORRECT | Keep alternatives about urine production and water retention. | Updated options, answerIndex. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q14 | BM | CORRECT | Remove unrelated animal mechanisms from plant-process definition. | Updated options. | 3.1.3 | No; text sufficient |
| 3 | sci-f1-c3-bm-q15 | BM | CORRECT | Replace animal organs with plausible plant-cell functions. | Updated options. | 3.1.3 | stoma.svg |
| 3 | sci-f1-c3-bm-q16 | BM | CORRECT | Corrective mechanism distractors must remain within regulation. | Updated options. | 3.1.1/3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q17 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Seorang murid berada di padang pada tengah hari yang panas. Apakah gerak balas badan yang membantu m… | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q18 | BM | CORRECT | Shivering produces heat; it is not a mechanism that reduces heat loss. | Updated options, answerIndex, explanation. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q19 | BM | CORRECT | Remove plant and impossible metabolism distractors. | Updated options. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q20 | BM | CORRECT | Use urine/thirst alternatives within the human water-control system. | Updated options, answerIndex. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q21 | BM | CORRECT | Use plausible temperature responses of the same animal. | Updated options. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q22 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Seekor anjing menjelirkan lidah dan tercungap-cungap pada hari yang panas. Apakah tujuan gerak balas… | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q23 | BM | CORRECT | Use source term fluid/bendalir; remove mechanisms belonging to other animals. | Updated question, options, explanation. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q24 | BM | CORRECT | Keep alternatives about the bee surface and spiracle water-loss mechanism. | Updated options. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q25 | BM | CORRECT | Remove xylem and direct-glucose distractors; compare gas exchange and water loss. | Updated options. | 3.1.3 | stoma.svg |
| 3 | sci-f1-c3-bm-q26 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Kadar denyutan nadi seorang murid meningkat selepas berjoging. Apakah sebab yang paling tepat? | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q27 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Pada cuaca yang sangat panas, stoma pada daun boleh tertutup. Mengapakah gerak balas ini penting? | 3.1.3 | No; text sufficient |
| 3 | sci-f1-c3-bm-q28 | BM | CORRECT | Remove advanced ectotherm label and implausible distractors; one-step application is Medium. | Updated options, explanation, difficulty. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q29 | BM | CORRECT | Unrelated kidney/plant options replaced with consequences of failed heat loss. | Updated options, difficulty. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-bm-q30 | BM | REPLACE | Original animal-response match could be guessed from unrelated organs. Replace with a controlled plant investigation. | Updated question, options, answerIndex, explanation. | 3.1.3 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q1 | DLP | CORRECT | Distractors test unrelated life processes rather than internal regulation. | Updated options. | 3.1.1 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q2 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Why is homeostasis important to living organisms? | 3.1.4 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q3 | DLP | CORRECT | BM/DLP distractor mismatch; unrelated clothing and shoe cues. | Updated options. | 3.1.1 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q4 | DLP | CORRECT | Weak distractors; distinguish a regulated range from an absolutely fixed value. | Updated options. | 3.1.1 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q5 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which organ acts as the control centre in human homeostasis? | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q6 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is the normal human body temperature? | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q7 | DLP | CORRECT | Use competing blood-vessel responses rather than impossible hardening. | Updated options. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q8 | DLP | CORRECT | Replace unrelated excretion and plant distractors with heat-transfer alternatives. | Updated options, answerIndex. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q9 | DLP | CORRECT | Hair position and air trapping must be compared within one mechanism. | Updated options, answerIndex. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q10 | DLP | CORRECT | Replace impossible vessel responses with calibre/heat-loss combinations. | Updated options, answerIndex. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q11 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Why does a person shiver when exposed to a very cold environment? | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q12 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which organ regulates water content by producing urine? | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q13 | DLP | CORRECT | Keep alternatives about urine production and water retention. | Updated options, answerIndex. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q14 | DLP | CORRECT | Remove unrelated animal mechanisms from plant-process definition. | Updated options. | 3.1.3 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q15 | DLP | CORRECT | Replace animal organs with plausible plant-cell functions. | Updated options. | 3.1.3 | stoma.svg |
| 3 | sci-f1-c3-dlp-q16 | DLP | CORRECT | Corrective mechanism distractors must remain within regulation. | Updated options. | 3.1.1/3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q17 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A student is standing on a field during a hot afternoon. Which body response helps to lower the stud… | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q18 | DLP | CORRECT | Shivering produces heat; it is not a mechanism that reduces heat loss. | Updated options, answerIndex, explanation. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q19 | DLP | CORRECT | Remove plant and impossible metabolism distractors. | Updated options. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q20 | DLP | CORRECT | Use urine/thirst alternatives within the human water-control system. | Updated options, answerIndex. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q21 | DLP | CORRECT | Use plausible temperature responses of the same animal. | Updated options. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q22 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A dog pants and sticks out its tongue on a hot day. What is the purpose of this response? | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q23 | DLP | CORRECT | Use source term fluid/bendalir; remove mechanisms belonging to other animals. | Updated question, options, explanation. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q24 | DLP | CORRECT | Keep alternatives about the bee surface and spiracle water-loss mechanism. | Updated options. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q25 | DLP | CORRECT | Remove xylem and direct-glucose distractors; compare gas exchange and water loss. | Updated options. | 3.1.3 | stoma.svg |
| 3 | sci-f1-c3-dlp-q26 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A student's pulse rate increases after jogging. What is the best explanation for this change? | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q27 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: During very hot weather, the stomata of a plant may close. Why is this response important? | 3.1.3 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q28 | DLP | CORRECT | Remove advanced ectotherm label and implausible distractors; one-step application is Medium. | Updated options, explanation, difficulty. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q29 | DLP | CORRECT | Unrelated kidney/plant options replaced with consequences of failed heat loss. | Updated options, difficulty. | 3.1.2 | No; text sufficient |
| 3 | sci-f1-c3-dlp-q30 | DLP | REPLACE | Original animal-response match could be guessed from unrelated organs. Replace with a controlled plant investigation. | Updated question, options, answerIndex, explanation. | 3.1.3 | No; text sufficient |
| 4 | sci-f1-c4-bm-q1 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah maksud pembiakan? | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q2 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Pernyataan manakah yang betul tentang perbandingan antara pembiakan seks dan pembiakan aseks? | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q3 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah gamet? | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q4 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Mengapakah pembiakan penting kepada sesuatu spesies? | 4.1.2 | No; text sufficient |
| 4 | sci-f1-c4-bm-q5 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Persenyawaan manakah berlaku di dalam badan induk betina? | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q6 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Persenyawaan manakah biasanya berlaku di luar badan, selalunya di dalam air? | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q7 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Kaedah pembiakan aseks manakah digunakan oleh Amoeba? | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q8 | BM | CORRECT | Compare asexual mechanisms rather than unrelated sexual events. | Updated options. | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q9 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Organ pembiakan lelaki manakah menghasilkan sperma? | 4.2.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q10 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Organ pembiakan perempuan manakah menghasilkan ovum? | 4.2.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q11 | BM | CORRECT | Remove unrelated contraception and asexual-reproduction distractors. | Updated options. | 4.2.2 | No; text sufficient |
| 4 | sci-f1-c4-bm-q12 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Pernyataan manakah yang betul tentang perbandingan antara sperma dan ovum? | 4.2.3 | No; text sufficient |
| 4 | sci-f1-c4-bm-q13 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Kedua-dua tiub Falopio seorang wanita tersumbat, tetapi ovarinya masih menghasilkan ovum dan uterusn… | 4.4.1/4.6.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q14 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah yang dimaksudkan dengan pendebungaan? | 4.7.2 | Removed decorative pairing |
| 4 | sci-f1-c4-bm-q15 | BM | REWRITE | Replace unrelated germination distractors with interpreting controlled seed conditions. | Updated question, options, explanation, difficulty. | 4.7.4/4.7.5 | No; text sufficient |
| 4 | sci-f1-c4-bm-q16 | BM | CORRECT | All alternatives now describe asexual mechanisms. | Updated options. | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q17 | BM | REWRITE | Original spore question had unrelated blood/fetus/semen options. Assess observation and mechanism. | Updated question, options, explanation. | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q18 | BM | CORRECT | Compare plant reproduction pathways, not human puberty and pregnancy. | Updated options. | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q19 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Apakah yang berlaku kepada lapisan dinding uterus jika persenyawaan tidak berlaku? | 4.3.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q20 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah salah satu kelebihan penting susu ibu kepada bayi? | 4.5.3 | No; text sufficient |
| 4 | sci-f1-c4-bm-q21 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Mengapakah persenyawaan lebih berkemungkinan berlaku semasa waktu subur dalam kitar haid? | 4.3.2 | No; text sufficient |
| 4 | sci-f1-c4-bm-q22 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Apakah perubahan pada lapisan dinding uterus semasa fasa prahaid jika persenyawaan mungkin berlaku? | 4.3.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q23 | BM | CORRECT | Keep human reproductive events as alternatives. | Updated options. | 4.4.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q24 | BM | REWRITE | Definition duplicates earlier recall; test the two distinct locations in a development sequence. | Updated question, options, explanation. | 4.4.1 | No; text sufficient |
| 4 | sci-f1-c4-bm-q25 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Urutan manakah yang betul bagi perkembangan selepas persenyawaan? | 4.4.3 | No; text sufficient |
| 4 | sci-f1-c4-bm-q26 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Sepasang suami isteri sukar mendapatkan anak kerana bilangan sperma suami terlalu rendah. Apakah tin… | 4.6.1/4.6.3 | No; text sufficient |
| 4 | sci-f1-c4-bm-q27 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Apakah fungsi utama plasenta dan tali pusat semasa kehamilan? | 4.4.2 | No; text sufficient |
| 4 | sci-f1-c4-bm-q28 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Mengapakah wanita hamil perlu mengelakkan rokok, alkohol dan dadah yang berbahaya? | 4.5.2 | No; text sufficient |
| 4 | sci-f1-c4-bm-q29 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Mengapakah pendebungaan kacuk boleh memberikan manfaat dalam bidang pertanian? | 4.7.2 | No; text sufficient |
| 4 | sci-f1-c4-bm-q30 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Satu ovari bunga mengandungi enam ovul. Hanya empat ovul berjaya disenyawakan dan berkembang dengan … | 4.7.3 | flower.svg |
| 4 | sci-f1-c4-dlp-q1 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is reproduction? | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q2 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Which statement correctly compares sexual and asexual reproduction? | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q3 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What are gametes? | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q4 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Why is reproduction important to a species? | 4.1.2 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q5 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which type of fertilisation occurs inside the female body? | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q6 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which type of fertilisation usually occurs outside the body, often in water? | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q7 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which method of asexual reproduction is used by Amoeba? | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q8 | DLP | CORRECT | Compare asexual mechanisms rather than unrelated sexual events. | Updated options. | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q9 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which male reproductive organ produces sperm? | 4.2.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q10 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which female reproductive organ produces ova? | 4.2.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q11 | DLP | CORRECT | Remove unrelated contraception and asexual-reproduction distractors. | Updated options. | 4.2.2 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q12 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Which comparison between sperm and ovum is correct? | 4.2.3 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q13 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: Both Fallopian tubes are blocked, but the ovaries still release ova and the uterus is normal. What i… | 4.4.1/4.6.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q14 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is pollination? | 4.7.2 | Removed decorative pairing |
| 4 | sci-f1-c4-dlp-q15 | DLP | REWRITE | Replace unrelated germination distractors with interpreting controlled seed conditions. | Updated question, options, explanation, difficulty. | 4.7.4/4.7.5 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q16 | DLP | CORRECT | All alternatives now describe asexual mechanisms. | Updated options. | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q17 | DLP | REWRITE | Original spore question had unrelated blood/fetus/semen options. Assess observation and mechanism. | Updated question, options, explanation. | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q18 | DLP | CORRECT | Compare plant reproduction pathways, not human puberty and pregnancy. | Updated options. | 4.1.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q19 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: What happens to the lining of the uterus if fertilisation does not occur? | 4.3.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q20 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which is an important advantage of breast milk for a baby? | 4.5.3 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q21 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Why is fertilisation more likely to occur around the fertile period of the menstrual cycle? | 4.3.2 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q22 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: How does the uterine lining change during the premenstrual phase when fertilisation may occur? | 4.3.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q23 | DLP | CORRECT | Keep human reproductive events as alternatives. | Updated options. | 4.4.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q24 | DLP | REWRITE | Definition duplicates earlier recall; test the two distinct locations in a development sequence. | Updated question, options, explanation. | 4.4.1 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q25 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which sequence correctly shows development after fertilisation? | 4.4.3 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q26 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A married couple has difficulty having a child because the man's sperm count is very low. What is th… | 4.6.1/4.6.3 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q27 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: What is the main role of the placenta and umbilical cord during pregnancy? | 4.4.2 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q28 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Why should a pregnant woman avoid smoking, alcohol and harmful drugs? | 4.5.2 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q29 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Why can cross-pollination be useful in agriculture? | 4.7.2 | No; text sufficient |
| 4 | sci-f1-c4-dlp-q30 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: A flower's ovary contains six ovules. Only four ovules are successfully fertilised and develop norma… | 4.7.3 | flower.svg |
| 5 | sci-f1-c5-bm-q1 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah maksud jirim? | 5.1.1 | No; text sufficient |
| 5 | sci-f1-c5-bm-q2 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Mengapakah udara di dalam belon dikategorikan sebagai jirim? | 5.1.2 | No; text sufficient |
| 5 | sci-f1-c5-bm-q3 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Antara berikut, yang manakah bukan jirim? | 5.1.1 | No; text sufficient |
| 5 | sci-f1-c5-bm-q4 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah maksud jisim? | 5.1.2 | No; text sufficient |
| 5 | sci-f1-c5-bm-q5 | BM | CORRECT | Replace unrelated visibility/light alternatives with physical quantities. | Updated options. | 5.1.2 | No; text sufficient |
| 5 | sci-f1-c5-bm-q6 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Antara berikut, yang manakah sifat fizik jirim? | 5.1.3 | No; text sufficient |
| 5 | sci-f1-c5-bm-q7 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Antara berikut, yang manakah sifat kimia jirim? | 5.1.3 | No; text sufficient |
| 5 | sci-f1-c5-bm-q8 | BM | CORRECT | Gas and vapour are overlapping answer categories; assess properties instead. | Updated question, options. | 5.2.2 | No; text sufficient |
| 5 | sci-f1-c5-bm-q9 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Pernyataan manakah paling tepat menerangkan zarah dalam pepejal? | 5.2.1/5.2.2 | particles.svg |
| 5 | sci-f1-c5-bm-q10 | BM | CORRECT | Light is not a state of matter; use a properties question. | Updated question, options. | 5.2.2 | No; text sufficient |
| 5 | sci-f1-c5-bm-q11 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Mengapakah gas lebih mudah dimampatkan berbanding pepejal dan cecair? | 5.2.2 | particles.svg |
| 5 | sci-f1-c5-bm-q12 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah maksud resapan? | 5.2.3 | No; text sufficient |
| 5 | sci-f1-c5-bm-q13 | BM | CORRECT | Ice duplicates solid as an option; compare rate orders using distinct alternatives. | Updated question, options. | 5.2.3 | No; text sufficient |
| 5 | sci-f1-c5-bm-q14 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah proses perubahan pepejal kepada cecair? | 5.2.4 | No; text sufficient |
| 5 | sci-f1-c5-bm-q15 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah rumus ketumpatan? | 5.1.4 | No; text sufficient |
| 5 | sci-f1-c5-bm-q16 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Dua bahan mempunyai warna yang sama tetapi takat didih yang berbeza. Sifat manakah paling sesuai dig… | 5.1.4 | No; text sufficient |
| 5 | sci-f1-c5-bm-q17 | BM | CORRECT | Replace particle disappearance and spontaneous solidification distractors. | Updated options. | 5.2.2 | No; text sufficient |
| 5 | sci-f1-c5-bm-q18 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Apakah yang berlaku kepada zarah pepejal apabila pepejal dipanaskan sehingga melebur? | 5.2.4 | No; text sufficient |
| 5 | sci-f1-c5-bm-q19 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 5.2.4 | No; text sufficient |
| 5 | sci-f1-c5-bm-q20 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Wap air membentuk titisan air pada permukaan luar gelas yang sejuk. Apakah yang berlaku kepada zarah… | 5.2.4 | No; text sufficient |
| 5 | sci-f1-c5-bm-q21 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Antara proses berikut, yang manakah menyerap haba? | 5.2.4 | No; text sufficient |
| 5 | sci-f1-c5-bm-q22 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Ais sedang melebur pada takat leburnya. Walaupun haba terus dibekalkan, suhu ais dan air kekal sama … | 5.2.5 | heating-curve.svg |
| 5 | sci-f1-c5-bm-q23 | BM | KEEP | No repair identified in semantic review. | Retained medium item: 100 g air dibekukan sepenuhnya menjadi ais tanpa kehilangan bahan daripada bekas. Apakah jisim ais y… | 5.2.6 | No; text sufficient |
| 5 | sci-f1-c5-bm-q24 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Sebuah objek berjisim 20 g mempunyai isi padu 10 cm3. Berapakah ketumpatannya? | 5.1.4 | No; text sufficient |
| 5 | sci-f1-c5-bm-q25 | BM | CORRECT | Use inspected textbook evaporation wording rather than adding a surface-only rule. | Updated explanation. | 5.2.7 | No; text sufficient |
| 5 | sci-f1-c5-bm-q26 | BM | REPLACE | Duplicates diffusion recall; replace with an interpretation and control question. | Updated question, options, explanation. | 5.2.3 | No; text sufficient |
| 5 | sci-f1-c5-bm-q27 | BM | CORRECT | Remove claims that ice has no mass or water is not matter. | Updated options, difficulty. | 5.1.4 | No; text sufficient |
| 5 | sci-f1-c5-bm-q28 | BM | REWRITE | Replace nonsense options and distinguish a boiling plateau from continued warming. | Updated question, options, explanation, difficulty. | 5.2.5 | No; text sufficient |
| 5 | sci-f1-c5-bm-q29 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 5.1.3 | No; text sufficient |
| 5 | sci-f1-c5-bm-q30 | BM | KEEP | No repair identified in semantic review. | Retained hard item: Objek X berjisim 24 g dan berisi padu 30 cm³, manakala objek Y berjisim 42 g dan berisi padu 30 cm³.… | 5.1.4 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q1 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is matter? | 5.1.1 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q2 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Why is the air inside a balloon classified as matter? | 5.1.2 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q3 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which of the following is non-matter? | 5.1.1 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q4 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is mass? | 5.1.2 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q5 | DLP | CORRECT | Replace unrelated visibility/light alternatives with physical quantities. | Updated options. | 5.1.2 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q6 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which of the following is a physical property of matter? | 5.1.3 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q7 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which of the following is a chemical property of matter? | 5.1.3 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q8 | DLP | CORRECT | Gas and vapour are overlapping answer categories; assess properties instead. | Updated question, options. | 5.2.2 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q9 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which statement best describes the particles in a solid? | 5.2.1/5.2.2 | particles.svg |
| 5 | sci-f1-c5-dlp-q10 | DLP | CORRECT | Light is not a state of matter; use a properties question. | Updated question, options. | 5.2.2 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q11 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Why can gases be compressed more easily than solids and liquids? | 5.2.2 | particles.svg |
| 5 | sci-f1-c5-dlp-q12 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is diffusion? | 5.2.3 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q13 | DLP | CORRECT | Ice duplicates solid as an option; compare rate orders using distinct alternatives. | Updated question, options. | 5.2.3 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q14 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is the process of changing solid into liquid? | 5.2.4 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q15 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is the formula for density? | 5.1.4 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q16 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Two substances have the same colour but different boiling points. Which property is most suitable fo… | 5.1.4 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q17 | DLP | CORRECT | Replace particle disappearance and spontaneous solidification distractors. | Updated options. | 5.2.2 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q18 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: What happens to the particles of a solid when it is heated until it melts? | 5.2.4 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q19 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 5.2.4 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q20 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Water vapour forms water droplets on the outside of a cold glass. What happens to the water vapour p… | 5.2.4 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q21 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Which process absorbs heat? | 5.2.4 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q22 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Ice is melting at its melting point. Although heat continues to be supplied, its temperature remains… | 5.2.5 | heating-curve.svg |
| 5 | sci-f1-c5-dlp-q23 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: 100 g of water is completely frozen into ice without any substance entering or leaving the container… | 5.2.6 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q24 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: An object has a mass of 20 g and a volume of 10 cm3. What is its density? | 5.1.4 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q25 | DLP | CORRECT | Use inspected textbook evaporation wording rather than adding a surface-only rule. | Updated explanation. | 5.2.7 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q26 | DLP | REPLACE | Duplicates diffusion recall; replace with an interpretation and control question. | Updated question, options, explanation. | 5.2.3 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q27 | DLP | CORRECT | Remove claims that ice has no mass or water is not matter. | Updated options, difficulty. | 5.1.4 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q28 | DLP | REWRITE | Replace nonsense options and distinguish a boiling plateau from continued warming. | Updated question, options, explanation, difficulty. | 5.2.5 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q29 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 5.1.3 | No; text sufficient |
| 5 | sci-f1-c5-dlp-q30 | DLP | KEEP | No repair identified in semantic review. | Retained hard item: Object X has a mass of 24 g and volume of 30 cm³, while Y has a mass of 42 g and volume of 30 cm³. B… | 5.1.4 | No; text sufficient |
| 6 | sci-f1-c6-bm-q1 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah maksud atom? | 6.1.1 | No; text sufficient |
| 6 | sci-f1-c6-bm-q2 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Zarah subatom manakah bercas positif? | 6.1.1 | No; text sufficient |
| 6 | sci-f1-c6-bm-q3 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Zarah subatom manakah tidak mempunyai cas? | 6.1.1 | No; text sufficient |
| 6 | sci-f1-c6-bm-q4 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Zarah subatom manakah bercas negatif? | 6.1.1 | No; text sufficient |
| 6 | sci-f1-c6-bm-q5 | BM | CORRECT | Remove outside-atom and molecule-only distractors. | Updated options. | 6.1.1 | No; text sufficient |
| 6 | sci-f1-c6-bm-q6 | BM | CORRECT | Use textbook electron location without adding shell detail; distinguish subatomic locations. | Updated question, options, explanation. | 6.1.1 | No; text sufficient |
| 6 | sci-f1-c6-bm-q7 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Bilakah atom dikatakan neutral? | 6.1.1 | No; text sufficient |
| 6 | sci-f1-c6-bm-q8 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah maksud molekul? | 6.1.2 | No; text sufficient |
| 6 | sci-f1-c6-bm-q9 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah maksud unsur? | 6.1.2 | No; text sufficient |
| 6 | sci-f1-c6-bm-q10 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah maksud sebatian? | 6.1.2 | No; text sufficient |
| 6 | sci-f1-c6-bm-q11 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Antara pernyataan berikut, yang manakah paling tepat tentang pengelasan unsur dalam Jadual Berkala? | 6.1.3 | No; text sufficient |
| 6 | sci-f1-c6-bm-q12 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Di manakah logam biasanya terletak dalam Jadual Berkala? | 6.1.3 | No; text sufficient |
| 6 | sci-f1-c6-bm-q13 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Di manakah bukan logam biasanya terletak dalam Jadual Berkala? | 6.1.3 | No; text sufficient |
| 6 | sci-f1-c6-bm-q14 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Gas nadir terletak dalam kumpulan manakah? | 6.1.3 | No; text sufficient |
| 6 | sci-f1-c6-bm-q15 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Satu bahan mempunyai permukaan berkilat, boleh ditempa dan mengkonduksikan elektrik dengan baik. Bag… | 6.1.4 | No; text sufficient |
| 6 | sci-f1-c6-bm-q16 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Campuran serbuk besi dan sulfur masih boleh diasingkan menggunakan magnet sebelum dipanaskan. Apakah… | 6.2.2/6.3.6 | No; text sufficient |
| 6 | sci-f1-c6-bm-q17 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Apakah perbezaan utama antara unsur dengan sebatian? | 6.1.2 | No; text sufficient |
| 6 | sci-f1-c6-bm-q18 | BM | CORRECT | Use competing material properties rather than impossible noble-gas conversion. | Updated options, difficulty. | 6.1.4 | No; text sufficient |
| 6 | sci-f1-c6-bm-q19 | BM | CORRECT | Use ductility/conductivity/lustre as related property distractors. | Updated options, difficulty. | 6.1.4 | No; text sufficient |
| 6 | sci-f1-c6-bm-q20 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Apakah maksud campuran? | 6.2.1 | No; text sufficient |
| 6 | sci-f1-c6-bm-q21 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Kaedah manakah sesuai untuk mengasingkan pasir daripada air? | 6.2.2 | No; text sufficient |
| 6 | sci-f1-c6-bm-q22 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Satu campuran mengandungi serbuk besi dan pasir. Apakah kaedah paling mudah untuk mengasingkan kedua… | 6.2.2 | No; text sufficient |
| 6 | sci-f1-c6-bm-q23 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Mengapakah penyulingan sesuai digunakan untuk mendapatkan air tulen daripada air garam? | 6.2.2 | No; text sufficient |
| 6 | sci-f1-c6-bm-q24 | BM | REWRITE | Existing picture reveals the separation method; assess interpretation of its four separated spots instead. | Updated question, options, answerIndex, explanation. | 6.2.2 | chromatography.svg |
| 6 | sci-f1-c6-bm-q25 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Apakah perbezaan utama komposisi campuran dan sebatian? | 6.3.6 | No; text sufficient |
| 6 | sci-f1-c6-bm-q26 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 6.3.5 | No; text sufficient |
| 6 | sci-f1-c6-bm-q27 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 6.3.4 | No; text sufficient |
| 6 | sci-f1-c6-bm-q28 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 6.1.4 | No; text sufficient |
| 6 | sci-f1-c6-bm-q29 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Dalam bekas tertutup, 10 g bahan X bertindak balas sepenuhnya dengan 6 g bahan Y. Jika 12 g pepejal … | 6.3.3 | No; text sufficient |
| 6 | sci-f1-c6-bm-q30 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 6.3.2/6.3.6 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q1 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is an atom? | 6.1.1 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q2 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which subatomic particle is positively charged? | 6.1.1 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q3 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which subatomic particle has no charge? | 6.1.1 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q4 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which subatomic particle is negatively charged? | 6.1.1 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q5 | DLP | CORRECT | Remove outside-atom and molecule-only distractors. | Updated options. | 6.1.1 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q6 | DLP | CORRECT | Use textbook electron location without adding shell detail; distinguish subatomic locations. | Updated question, options, explanation. | 6.1.1 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q7 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: When is an atom neutral? | 6.1.1 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q8 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is a molecule? | 6.1.2 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q9 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is an element? | 6.1.2 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q10 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is a compound? | 6.1.2 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q11 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which statement is most accurate about the classification of elements in the Periodic Table? | 6.1.3 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q12 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Where are metals usually located in the Periodic Table? | 6.1.3 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q13 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Where are non-metals usually located in the Periodic Table? | 6.1.3 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q14 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Inert gases are located in which group? | 6.1.3 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q15 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: A substance has a shiny surface, can be hammered into shape and conducts electricity well. How shoul… | 6.1.4 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q16 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A mixture of iron filings and sulfur can still be separated using a magnet before it is heated. What… | 6.2.2/6.3.6 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q17 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: What is the main difference between an element and a compound? | 6.1.2 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q18 | DLP | CORRECT | Use competing material properties rather than impossible noble-gas conversion. | Updated options, difficulty. | 6.1.4 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q19 | DLP | CORRECT | Use ductility/conductivity/lustre as related property distractors. | Updated options, difficulty. | 6.1.4 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q20 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: What is a mixture? | 6.2.1 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q21 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Which method is suitable for separating sand from water? | 6.2.2 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q22 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A mixture contains iron filings and sand. What is the simplest method for separating them? | 6.2.2 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q23 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Why is distillation suitable for obtaining pure water from salt water? | 6.2.2 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q24 | DLP | REWRITE | Existing picture reveals the separation method; assess interpretation of its four separated spots instead. | Updated question, options, answerIndex, explanation. | 6.2.2 | chromatography.svg |
| 6 | sci-f1-c6-dlp-q25 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: What is the main difference in composition between mixtures and compounds? | 6.3.6 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q26 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 6.3.5 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q27 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 6.3.4 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q28 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 6.1.4 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q29 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: In a closed container, 10 g of substance X reacts completely with 6 g of Y. If 12 g of solid forms a… | 6.3.3 | No; text sufficient |
| 6 | sci-f1-c6-dlp-q30 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 6.3.2/6.3.6 | No; text sufficient |
| 7 | sci-f1-c7-bm-q1 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Gas manakah terdapat dalam kuantiti paling banyak dalam udara? | 7.1.1 | No; text sufficient |
| 7 | sci-f1-c7-bm-q2 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah peratus oksigen dalam udara? | 7.1.1 | No; text sufficient |
| 7 | sci-f1-c7-bm-q3 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Mengapakah udara dikategorikan sebagai campuran? | 7.1.1 | No; text sufficient |
| 7 | sci-f1-c7-bm-q4 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah atmosfera? | 7.1.1 | No; text sufficient |
| 7 | sci-f1-c7-bm-q5 | BM | CORRECT | Replace one-gas distractors with competing gas mixtures. | Updated options. | 7.1.1 | No; text sufficient |
| 7 | sci-f1-c7-bm-q6 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Jika salah satu daripada tiga syarat pembakaran disingkirkan, apakah yang akan berlaku? | 7.2.1 | No; text sufficient |
| 7 | sci-f1-c7-bm-q7 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Mengapakah oksigen penting kepada kebanyakan organisma hidup? | 7.1.3 | No; text sufficient |
| 7 | sci-f1-c7-bm-q8 | BM | CORRECT | Keep alternatives about plant processes. | Updated options. | 7.1.3 | No; text sufficient |
| 7 | sci-f1-c7-bm-q9 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Gas nadir manakah digunakan dalam belon udara kerana ringan? | 7.1.3 | No; text sufficient |
| 7 | sci-f1-c7-bm-q10 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Gas nadir manakah digunakan dalam lampu papan tanda berwarna? | 7.1.3 | No; text sufficient |
| 7 | sci-f1-c7-bm-q11 | BM | CORRECT | Align combustion definition with inspected p.204; all options describe heating in gases. | Updated options, explanation. | 7.2.1 | No; text sufficient |
| 7 | sci-f1-c7-bm-q12 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah tiga syarat yang diperlukan supaya pembakaran dapat berlaku? | 7.2.1 | Removed decorative pairing |
| 7 | sci-f1-c7-bm-q13 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah yang dimaksudkan dengan pencemaran udara? | 7.3.1 | No; text sufficient |
| 7 | sci-f1-c7-bm-q14 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Antara berikut, yang manakah bahan pencemar udara? | 7.3.2 | No; text sufficient |
| 7 | sci-f1-c7-bm-q15 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Aktiviti manakah paling berkemungkinan menyumbang kepada pembentukan jerebu? | 7.3.2 | No; text sufficient |
| 7 | sci-f1-c7-bm-q16 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Bagaimanakah tumbuhan hijau membantu mengekalkan kandungan oksigen dalam atmosfera? | 7.1.4 | No; text sufficient |
| 7 | sci-f1-c7-bm-q17 | BM | CORRECT | Compare combinations of actual carbon-cycle processes. | Updated options. | 7.1.4 | No; text sufficient |
| 7 | sci-f1-c7-bm-q18 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Apakah cara mengekalkan keseimbangan oksigen dan karbon dioksida? | 7.1.5 | No; text sufficient |
| 7 | sci-f1-c7-bm-q19 | BM | CORRECT | Compare the three extinction principles rather than adding fuel/smoke. | Updated options. | 7.2.2 | No; text sufficient |
| 7 | sci-f1-c7-bm-q20 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Mengapakah menutup api kecil dengan selimut api boleh memadamkannya? | 7.2.2 | No; text sufficient |
| 7 | sci-f1-c7-bm-q21 | BM | REWRITE | Use source cooling principle for CO2 and replace drinking-water/fuel distractors. | Updated question, options, explanation. | 7.2.2 | No; text sufficient |
| 7 | sci-f1-c7-bm-q22 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Pencemar manakah boleh menyebabkan hujan asid? | 7.3.2/7.3.4 | No; text sufficient |
| 7 | sci-f1-c7-bm-q23 | BM | CORRECT | Use source-backed health effects instead of additional blood-transport mechanism. | Updated question, options, explanation. | 7.3.4 | No; text sufficient |
| 7 | sci-f1-c7-bm-q24 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Apakah kesan yang boleh berlaku jika kandungan karbon dioksida dalam atmosfera meningkat secara berl… | 7.1.5/7.3.4 | No; text sufficient |
| 7 | sci-f1-c7-bm-q25 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Langkah manakah paling sesuai untuk membantu mengurangkan pencemaran udara daripada kenderaan? | 7.3.3 | No; text sufficient |
| 7 | sci-f1-c7-bm-q26 | BM | REWRITE | Replace weak jar-volume alternatives with experiment-design reasoning. | Updated question, options, explanation. | 7.2.1 | No; text sufficient |
| 7 | sci-f1-c7-bm-q27 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 7.3.4 | No; text sufficient |
| 7 | sci-f1-c7-bm-q28 | BM | REWRITE | Require two connected carbon/oxygen-cycle predictions rather than one-step recall. | Updated question, options, explanation. | 7.1.5 | No; text sufficient |
| 7 | sci-f1-c7-bm-q29 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 7.3.3 | No; text sufficient |
| 7 | sci-f1-c7-bm-q30 | BM | REWRITE | Remove out-of-level reaction chemistry and absurd distractors; infer effects from controlled evidence. | Updated question, options, explanation. | 7.3.4 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q1 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which gas is present in the largest proportion in air? | 7.1.1 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q2 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What percentage of air is oxygen? | 7.1.1 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q3 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Why is air classified as a mixture? | 7.1.1 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q4 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is the atmosphere? | 7.1.1 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q5 | DLP | CORRECT | Replace one-gas distractors with competing gas mixtures. | Updated options. | 7.1.1 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q6 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What happens if one of the three conditions required for combustion is removed? | 7.2.1 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q7 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Why is oxygen important to most living organisms? | 7.1.3 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q8 | DLP | CORRECT | Keep alternatives about plant processes. | Updated options. | 7.1.3 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q9 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which noble gas is used in balloons because it is light? | 7.1.3 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q10 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which noble gas is used in colourful signboard lights? | 7.1.3 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q11 | DLP | CORRECT | Align combustion definition with inspected p.204; all options describe heating in gases. | Updated options, explanation. | 7.2.1 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q12 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which three conditions are required for combustion to occur? | 7.2.1 | Removed decorative pairing |
| 7 | sci-f1-c7-dlp-q13 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is meant by air pollution? | 7.3.1 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q14 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which of the following is an air pollutant? | 7.3.2 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q15 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which activity is most likely to contribute to the formation of haze? | 7.3.2 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q16 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: How do green plants help maintain the oxygen content of the atmosphere? | 7.1.4 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q17 | DLP | CORRECT | Compare combinations of actual carbon-cycle processes. | Updated options. | 7.1.4 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q18 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Which action helps maintain the balance of oxygen and carbon dioxide? | 7.1.5 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q19 | DLP | CORRECT | Compare the three extinction principles rather than adding fuel/smoke. | Updated options. | 7.2.2 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q20 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Why can covering a small fire with a fire blanket put out the fire? | 7.2.2 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q21 | DLP | REWRITE | Use source cooling principle for CO2 and replace drinking-water/fuel distractors. | Updated question, options, explanation. | 7.2.2 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q22 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Which pollutant can cause acid rain? | 7.3.2/7.3.4 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q23 | DLP | CORRECT | Use source-backed health effects instead of additional blood-transport mechanism. | Updated question, options, explanation. | 7.3.4 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q24 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: What may happen if the amount of carbon dioxide in the atmosphere increases excessively? | 7.1.5/7.3.4 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q25 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: Which action would best help reduce air pollution from vehicles? | 7.3.3 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q26 | DLP | REWRITE | Replace weak jar-volume alternatives with experiment-design reasoning. | Updated question, options, explanation. | 7.2.1 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q27 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 7.3.4 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q28 | DLP | REWRITE | Require two connected carbon/oxygen-cycle predictions rather than one-step recall. | Updated question, options, explanation. | 7.1.5 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q29 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 7.3.3 | No; text sufficient |
| 7 | sci-f1-c7-dlp-q30 | DLP | REWRITE | Remove out-of-level reaction chemistry and absurd distractors; infer effects from controlled evidence. | Updated question, options, explanation. | 7.3.4 | No; text sufficient |
| 8 | sci-f1-c8-bm-q1 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah maksud cahaya? | 8.2.1 | No; text sufficient |
| 8 | sci-f1-c8-bm-q2 | BM | CORRECT | Replace wind and slow-wave nonsense with alternative paths. | Updated options. | 8.2.1 | No; text sufficient |
| 8 | sci-f1-c8-bm-q3 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Berapakah kelajuan cahaya? | 8.2.1 | No; text sufficient |
| 8 | sci-f1-c8-bm-q4 | BM | CORRECT | Compare light interactions rather than sound and boiling. | Updated options. | 8.2.1 | No; text sufficient |
| 8 | sci-f1-c8-bm-q5 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Pada waktu bilakah bayang-bayang biasanya paling pendek? | 8.2.1 | No; text sufficient |
| 8 | sci-f1-c8-bm-q6 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah perbezaan utama antara imej sahih dengan imej maya? | 8.1.1 | No; text sufficient |
| 8 | sci-f1-c8-bm-q7 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah yang terhasil apabila cahaya merah, hijau dan biru dengan keamatan yang sesuai ditambahkan be… | 8.7.2 | No; text sufficient |
| 8 | sci-f1-c8-bm-q8 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Seorang murid berdiri 2 m di hadapan sebuah cermin satah. Berapakah jarak imej murid itu di belakang… | 8.1.3 | mirror.svg |
| 8 | sci-f1-c8-bm-q9 | BM | CORRECT | Use competing image properties rather than red-colour distractor. | Updated options. | 8.1.2 | No; text sufficient |
| 8 | sci-f1-c8-bm-q10 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Mengapakah cermin cekung sesuai digunakan sebagai cermin solek apabila muka berada dekat dengan cerm… | 8.1.5 | No; text sufficient |
| 8 | sci-f1-c8-bm-q11 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Mengapakah cermin cembung digunakan sebagai cermin sisi kenderaan? | 8.1.5 | No; text sufficient |
| 8 | sci-f1-c8-bm-q12 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Mengapakah jalur pemantul cahaya dipasang pada jaket keselamatan pekerja jalan raya? | 8.3.4 | No; text sufficient |
| 8 | sci-f1-c8-bm-q13 | BM | CORRECT | Use relationships between reflection angles, not unrelated physics formulae. | Updated options. | 8.3.2 | No; text sufficient |
| 8 | sci-f1-c8-bm-q14 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Mengapakah penyedut minuman kelihatan bengkok apabila sebahagiannya berada di dalam air? | 8.4.4 | No; text sufficient |
| 8 | sci-f1-c8-bm-q15 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah yang berlaku apabila cahaya putih melalui sebuah prisma? | 8.5.1 | No; text sufficient |
| 8 | sci-f1-c8-bm-q16 | BM | CORRECT | Use image-orientation alternatives instead of mass/temperature distractors. | Updated options. | 8.3.1 | No; text sufficient |
| 8 | sci-f1-c8-bm-q17 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Jika sudut tuju ialah 35°, berapakah sudut pantulan? | 8.3.2 | reflection.svg |
| 8 | sci-f1-c8-bm-q18 | BM | REWRITE | Replace non-scientific normal-line functions with angle-reading interpretation. | Updated question, options, explanation. | 8.3.3 | reflection.svg |
| 8 | sci-f1-c8-bm-q19 | BM | CORRECT | Remove speed explanation not explicit in inspected Form 1 refraction source. | Updated explanation. | 8.4.2 | refraction-glass.svg |
| 8 | sci-f1-c8-bm-q20 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Apabila sinar cahaya melalui air ke udara secara serong dan keluar ke udara, bagaimanakah arah sinar… | 8.4.2 | refraction-water.svg |
| 8 | sci-f1-c8-bm-q21 | BM | CORRECT | Remove extra speed rule and keep the source normal-incidence concept. | Updated question, explanation. | 8.4.2 | No; text sufficient |
| 8 | sci-f1-c8-bm-q22 | BM | CORRECT | Black and white gave away invalid spectrum sequences; specify red-to-violet direction. | Updated question, options, difficulty. | 8.5.1 | No; text sufficient |
| 8 | sci-f1-c8-bm-q23 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 8.5.1 | No; text sufficient |
| 8 | sci-f1-c8-bm-q24 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 8.7.2 | No; text sufficient |
| 8 | sci-f1-c8-bm-q25 | BM | REWRITE | Use two-reflection reasoning rather than unrelated heat/dispersion distractors. | Updated question, options, explanation. | 8.1.6/8.3.4 | periscope.svg |
| 8 | sci-f1-c8-bm-q26 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Seorang murid melihat kilat dahulu dan mendengar guruh beberapa saat kemudian walaupun kedua-duanya … | 8.2.1 | No; text sufficient |
| 8 | sci-f1-c8-bm-q27 | BM | CORRECT | Replace sound, rising floor and complete absorption distractors with optical alternatives. | Updated options, difficulty. | 8.4.4 | No; text sufficient |
| 8 | sci-f1-c8-bm-q28 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 8.5.2 | No; text sufficient |
| 8 | sci-f1-c8-bm-q29 | BM | REWRITE | Replace recall-level Hard with comparing blue-sky and sunset observations without wavelength theory. | Updated question, options, explanation. | 8.6.2 | No; text sufficient |
| 8 | sci-f1-c8-bm-q30 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 8.7.6 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q1 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is light? | 8.2.1 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q2 | DLP | CORRECT | Replace wind and slow-wave nonsense with alternative paths. | Updated options. | 8.2.1 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q3 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is the speed of light? | 8.2.1 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q4 | DLP | CORRECT | Compare light interactions rather than sound and boiling. | Updated options. | 8.2.1 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q5 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: When is a shadow usually the shortest? | 8.2.1 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q6 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is the main difference between a real image and a virtual image? | 8.1.1 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q7 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What is produced when red, green and blue light of suitable intensities are added together? | 8.7.2 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q8 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: A student stands 2 m in front of a plane mirror. How far behind the mirror does the image appear? | 8.1.3 | mirror.svg |
| 8 | sci-f1-c8-dlp-q9 | DLP | CORRECT | Use competing image properties rather than red-colour distractor. | Updated options. | 8.1.2 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q10 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Why is a concave mirror useful as a make-up mirror when the face is positioned close to it? | 8.1.5 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q11 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Why are convex mirrors commonly used as vehicle side mirrors? | 8.1.5 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q12 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Why are reflective strips placed on the safety jackets of road workers? | 8.3.4 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q13 | DLP | CORRECT | Use relationships between reflection angles, not unrelated physics formulae. | Updated options. | 8.3.2 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q14 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Why does a drinking straw appear bent when part of it is placed in water? | 8.4.4 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q15 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: What happens when white light passes through a prism? | 8.5.1 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q16 | DLP | CORRECT | Use image-orientation alternatives instead of mass/temperature distractors. | Updated options. | 8.3.1 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q17 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: If the angle of incidence is 35°, what is the angle of reflection? | 8.3.2 | reflection.svg |
| 8 | sci-f1-c8-dlp-q18 | DLP | REWRITE | Replace non-scientific normal-line functions with angle-reading interpretation. | Updated question, options, explanation. | 8.3.3 | reflection.svg |
| 8 | sci-f1-c8-dlp-q19 | DLP | CORRECT | Remove speed explanation not explicit in inspected Form 1 refraction source. | Updated explanation. | 8.4.2 | refraction-glass.svg |
| 8 | sci-f1-c8-dlp-q20 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: When a light ray passes obliquely from water into air and emerges into the air, how does its directi… | 8.4.2 | refraction-water.svg |
| 8 | sci-f1-c8-dlp-q21 | DLP | CORRECT | Remove extra speed rule and keep the source normal-incidence concept. | Updated question, explanation. | 8.4.2 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q22 | DLP | CORRECT | Black and white gave away invalid spectrum sequences; specify red-to-violet direction. | Updated question, options, difficulty. | 8.5.1 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q23 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 8.5.1 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q24 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 8.7.2 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q25 | DLP | REWRITE | Use two-reflection reasoning rather than unrelated heat/dispersion distractors. | Updated question, options, explanation. | 8.1.6/8.3.4 | periscope.svg |
| 8 | sci-f1-c8-dlp-q26 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A student sees lightning first and hears thunder several seconds later although both originate from … | 8.2.1 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q27 | DLP | CORRECT | Replace sound, rising floor and complete absorption distractors with optical alternatives. | Updated options, difficulty. | 8.4.4 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q28 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 8.5.2 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q29 | DLP | REWRITE | Replace recall-level Hard with comparing blue-sky and sunset observations without wavelength theory. | Updated question, options, explanation. | 8.6.2 | No; text sufficient |
| 8 | sci-f1-c8-dlp-q30 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 8.7.6 | No; text sufficient |
| 9 | sci-f1-c9-bm-q1 | BM | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q2 | BM | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q3 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Sistem Bumi manakah merangkumi sungai, tasik, laut dan air bawah tanah? | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q4 | BM | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q5 | BM | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q6 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Di lapisan manakah lapisan ozon terdapat? | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q7 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Apakah bahan yang boleh merosakkan lapisan ozon? | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q8 | BM | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q9 | BM | KEEP | No repair identified in semantic review. | Retained easy item: Lapisan manakah terletak di antara kerak Bumi dengan teras? | 9.1.2 | earth-layers.svg |
| 9 | sci-f1-c9-bm-q10 | BM | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. Balance option phrasing and use related alternatives. | Updated options, answerIndex. | 9.6.4 | No; text sufficient |
| 9 | sci-f1-c9-bm-q11 | BM | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.6.1/9.6.2 | No; text sufficient |
| 9 | sci-f1-c9-bm-q12 | BM | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.1.2 | earth-layers.svg |
| 9 | sci-f1-c9-bm-q13 | BM | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. Balance option phrasing and use related alternatives. | Updated options, answerIndex. | 9.6.3 | No; text sufficient |
| 9 | sci-f1-c9-bm-q14 | BM | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.2.2 | No; text sufficient |
| 9 | sci-f1-c9-bm-q15 | BM | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.2.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q16 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated options, answerIndex, difficulty. | 9.1.2 | No; text sufficient |
| 9 | sci-f1-c9-bm-q17 | BM | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.3.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q18 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated options, answerIndex, difficulty. | 9.1.2 | No; text sufficient |
| 9 | sci-f1-c9-bm-q19 | BM | CORRECT | Difficulty overstated for the reasoning required. Balance option phrasing and use related alternatives. | Updated options, answerIndex, difficulty. | 9.5.3 | No; text sufficient |
| 9 | sci-f1-c9-bm-q20 | BM | CORRECT | Difficulty overstated for the reasoning required. Balance option phrasing and use related alternatives. | Updated options, answerIndex, difficulty. | 9.3.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q21 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 9.3.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q22 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated options, answerIndex, difficulty. | 9.3.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q23 | BM | KEEP | No repair identified in semantic review. | Retained medium item: Gempa bumi kuat berlaku di dasar laut dan menggerakkan sejumlah besar air secara tiba-tiba. Geobenca… | 9.4.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q24 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated options, answerIndex, difficulty. | 9.5.1 | No; text sufficient |
| 9 | sci-f1-c9-bm-q25 | BM | CORRECT | Difficulty overstated for the reasoning required. Balance option phrasing and use related alternatives. | Updated options, answerIndex, difficulty. | 9.6.2 | No; text sufficient |
| 9 | sci-f1-c9-bm-q26 | BM | CORRECT | Difficulty overstated for the reasoning required. | Updated options, answerIndex, difficulty. | 9.6.2 | No; text sufficient |
| 9 | sci-f1-c9-bm-q27 | BM | REWRITE | Replace implausible future-earthquake claims with limits of fossil evidence. | Updated question, options, answerIndex, explanation, difficulty. | 9.5.3/9.5.4 | No; text sufficient |
| 9 | sci-f1-c9-bm-q28 | BM | REWRITE | Elastic rebound/seismic-wave detail exceeds the inspected chapter; interpret plate motion and cause instead. Balance option phrasing and use related alternatives. | Updated question, options, answerIndex, explanation, difficulty. | 9.3.1 | plates.svg |
| 9 | sci-f1-c9-bm-q29 | BM | CORRECT | Difficulty overstated for the reasoning required. Balance option phrasing and use related alternatives. | Updated options, difficulty. | 9.4.2 | No; text sufficient |
| 9 | sci-f1-c9-bm-q30 | BM | CORRECT | Remove unexplained NTU units; keep evidence-based upstream/downstream reasoning. Balance option phrasing and use related alternatives. | Updated question, options. | 9.6.6 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q1 | DLP | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q2 | DLP | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q3 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which Earth system includes rivers, lakes, seas and groundwater? | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q4 | DLP | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q5 | DLP | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q6 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: In which layer is the ozone layer found? | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q7 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which substance can damage the ozone layer? | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q8 | DLP | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.1.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q9 | DLP | KEEP | No repair identified in semantic review. | Retained easy item: Which layer lies between the Earth's crust and core? | 9.1.2 | earth-layers.svg |
| 9 | sci-f1-c9-dlp-q10 | DLP | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. Balance option phrasing and use related alternatives. | Updated options, answerIndex. | 9.6.4 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q11 | DLP | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.6.1/9.6.2 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q12 | DLP | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.1.2 | earth-layers.svg |
| 9 | sci-f1-c9-dlp-q13 | DLP | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. Balance option phrasing and use related alternatives. | Updated options, answerIndex. | 9.6.3 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q14 | DLP | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.2.2 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q15 | DLP | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.2.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q16 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated options, answerIndex, difficulty. | 9.1.2 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q17 | DLP | CORRECT | All original Chapter 9 keys occupied A; rebalance stored positions. | Updated options, answerIndex. | 9.3.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q18 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated options, answerIndex, difficulty. | 9.1.2 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q19 | DLP | CORRECT | Difficulty overstated for the reasoning required. Balance option phrasing and use related alternatives. | Updated options, answerIndex, difficulty. | 9.5.3 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q20 | DLP | CORRECT | Difficulty overstated for the reasoning required. Balance option phrasing and use related alternatives. | Updated options, answerIndex, difficulty. | 9.3.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q21 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated difficulty. | 9.3.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q22 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated options, answerIndex, difficulty. | 9.3.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q23 | DLP | KEEP | No repair identified in semantic review. | Retained medium item: A strong earthquake occurs beneath the ocean floor and suddenly displaces a large volume of water. W… | 9.4.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q24 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated options, answerIndex, difficulty. | 9.5.1 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q25 | DLP | CORRECT | Difficulty overstated for the reasoning required. Balance option phrasing and use related alternatives. | Updated options, answerIndex, difficulty. | 9.6.2 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q26 | DLP | CORRECT | Difficulty overstated for the reasoning required. | Updated options, answerIndex, difficulty. | 9.6.2 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q27 | DLP | REWRITE | Replace implausible future-earthquake claims with limits of fossil evidence. | Updated question, options, answerIndex, explanation, difficulty. | 9.5.3/9.5.4 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q28 | DLP | REWRITE | Elastic rebound/seismic-wave detail exceeds the inspected chapter; interpret plate motion and cause instead. Balance option phrasing and use related alternatives. | Updated question, options, answerIndex, explanation, difficulty. | 9.3.1 | plates.svg |
| 9 | sci-f1-c9-dlp-q29 | DLP | CORRECT | Difficulty overstated for the reasoning required. Balance option phrasing and use related alternatives. | Updated options, difficulty. | 9.4.2 | No; text sufficient |
| 9 | sci-f1-c9-dlp-q30 | DLP | CORRECT | Remove unexplained NTU units; keep evidence-based upstream/downstream reasoning. Balance option phrasing and use related alternatives. | Updated question, options. | 9.6.6 | No; text sufficient |

## Final verification on cleaned PR head 2f5333e4 — 16 October 2026

Performed in a new isolated `silken-sheen-science-f1-final` worktree. Original Science, Mathematics and Geography workspaces were not modified.

- **952 tests passed across 55 files**: complete Science F1 content/notes/interaction suite, all Science quiz visuals, actual quiz-route lifecycle, shuffle/difficulty and XP calculation tests.
- Expanded the actual route test from two measurement examples to **all 38 BM/DLP mappings covering all 14 assets**, using each canonical chapter/language bank. Each asserts the displayed question, asset path, language-specific alternative, responsive image classes, source immutability and canonical object identity. Existing timer, shuffle, scoring-by-difficulty, result recording, chapter-progress and redo tests remain green. These are jsdom route tests, not browser layout tests.
- Chapter 5 hash failure was solely CRLF conversion (`core.autocrlf=true`). Normalizing CRLF to LF produces all three original expected hashes. The test now normalizes only CRLF before hashing; no expected hashes, curriculum text, geometry or other whitespace validation was changed.
- **Targeted ESLint passed** for the Chapter 5 test, Science quiz renderer/test, visual metadata, quiz re-audit test and actual route test. Checkout-only CRLF normalization was needed for otherwise unchanged files; no formatting policy was disabled.
- **Production build passed** (client/server and Pages packaging). Final changes after that build affect tests/report only, not runtime output.
- **TypeScript remains blocked** by the same two untouched Form 2 Science TS2345 diagnostics: `chapter-7-9-10-visual-integration.test.tsx:305:65` and `chapter-9/chapter-9-heat-visuals.test.tsx:523:65`, both `string | undefined` passed to a string parameter. No Science F1 diagnostics remain.
- All 14 SVGs inspected as raster contact sheets at 576px desktop and 288/328px image widths (320/360px minus 32px assumed padding). No clipping or overlap observed. Measurement volumes, six ovules, equal particle counts, chromatography baseline, 35-degree normal, media orientation, four Earth layers and converging plates retain their approved meaning. Shared SVGs and paired localized alternatives preserve BM/DLP consistency. Small mobile labels still require confirmation in the real layout.
- **Live browser gate NOT completed:** browser inventory was empty and native Computer Use failed because its pipe was unavailable. Do not describe the raster sheets or jsdom tests as browser screenshots or full responsive UI approval.
- Cloudflare bot confirmed successful deployment of `2f5333e4` at `https://9f11be07.academymy.pages.dev`. Direct quiz-page HTTP inspection returned 403; browser access was unavailable, so deployed interaction could not be independently verified. Vercel still reported a separate failed deployment.
- No scoring, XP, shuffling, progress-tracking implementation, question bank, diagram or other-subject content was changed during this verification. No unsourced learner-facing content added.

**Merge recommendation: hold final sign-off until actual desktop/320px/360px quiz inspection is completed and the repository-level TypeScript/deployment checks are explicitly dispositioned. Automated Science checks are green; this is not an unconditional merge approval.**
