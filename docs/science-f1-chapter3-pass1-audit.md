# Science Form 1 Chapter 3 — Pass 1

Scope: Koordinasi dan Gerak Balas / Coordination and Response, BM and DLP together. Stopped after human homeostasis and Experiments 3.1–3.2. No animal/plant/transpiration/stomata/appreciation redesign, commit, push or deployment.

## Files changed

- `src/content/form1/science/chapter-3/chapter3-content.ts`: official structure metadata, source-grounded Experiment 3.1, corrected Experiment 3.2, audited water hormone wording, canonical BM hair/vessel terminology and missing hot-condition urine response.
- `src/content/form1/science/chapter-3/notes-dlp.ts`: first section title corrected to `3.1 Homeostasis in Living Things`; no other changes.
- `src/components/notes/ScienceF1Chapter3VisualNotesBlock.tsx`: official chapter title/path; one official 3.1 subtopic; internal section hierarchy; integrates shared human-homeostasis/practical visuals.
- `src/components/notes/blocks/Chapter3HomeostasisVisuals.tsx`: feedback, water, skin, fan, activity and wrist/pulse diagrams; blank student-result tables.
- `src/components/notes/Chapter3NotesBlock.tsx`: numbering/title correction only in the unused legacy renderer.
- `src/components/notes/ScienceF1Chapter3VisualNotesBlock.test.tsx`: removes expectation of invented pulse ranges and updates the corrected source headings.
- `src/components/notes/ScienceF1Chapter3Pass1.test.tsx`: 19 new renderer/source/parity tests.
- This report.

## Numbering and diagrams

`3.1 Homeostasis dalam Benda Hidup / Homeostasis in Living Things` is the sole official curriculum subtopic and the sole h2 below the chapter h1. Water, temperature, animals and plants are internal headings without false 3.2–3.4 curriculum labels. Experiments retain their explicitly named 3.1 and 3.2 identifiers. Animal/plant content and visual treatment are otherwise preserved.

The homeostasis definition and its temperature/water/pH/blood-pressure examples are unchanged. The Greek-origin note stays compact; its disputed wording remains frozen as described below.

- Feedback: both increase → detection → correction → decrease → normal and decrease → detection → correction → increase → normal pathways form visible loops.
- Water: two shared diagrams show high/low water level, brain, hormone-mediated correction, kidneys, more/less urine, thirst and return to normal. A small process strip preserves hot/activity → more sweat → less body water → less urine.
- Temperature: both conditions remain visible. Normal temperature is 37°C. Side-by-side skin sections show leaning/erect hairs, active/reduced sweat glands, surface sweat, superficial dilated/deeper constricted vessels, trapped air in cold conditions and increased/reduced heat loss. Existing source mechanisms include skeletal muscles and certain hormones; the hot response now also includes less urine.
- Experiment 3.1: problem, hypothesis, purpose, all three variables, stopwatch/student apparatus, four source procedure steps and fan OFF/ON diagrams. Each condition lasts ten minutes. Sweat observation cells are blank editable fields; no outcome is fabricated. The conclusion remains the source question asking whether the hypothesis is accepted, with reasons.
- Experiment 3.2: resting → walking → jogging visuals. Walking and jogging each last ten minutes; no fixed rest duration is invented. A wrist diagram shows two fingers at the pulse position. Pulse counting lasts one minute. The source procedure, variables and stopwatch/student apparatus render. Four group/student rows provide blank rest/walk/jog measurements. The existing approved general conclusion is preserved.

## Source verification and removed unsupported content

Read and visually inspected `C:/Users/rayya/Downloads/T1 BT SN- SAINS.pdf`, printed pages 72–78 (PDF pages 82–88). Relevant locations:

- p.72: official 3.1 title, homeostasis meaning and Greek-origin sidebar.
- p.73, Figure 3.1: two-direction control process.
- p.74, Figure 3.2: water control and hormone-mediated kidney responses.
- pp.75–76, Figures 3.3–3.4: temperature control and skin mechanisms.
- pp.76–77: Experiment 3.1.
- pp.77–78: Experiment 3.2 and its blank result table.

Water hormone audit: high-water correction explicitly reduces secretion of a hormone. Low-water correction stimulates secretion of a hormone; the textbook does not add the current implementation's comparative `more` qualifier. BM correction text now follows that source, with DLP counterparts. No hormone name or ADH explanation was added.

Removed:

- Invented `70–80`, `90–110`, `130–160 bpm` result ranges, range cards, arbitrary range bars and their expanded physiology explanations. Range data are removed from the canonical Chapter 3 dataset.
- False official 3.2–3.4 labels in the visual path/headings and legacy numbering chrome.
- `Rambut menegak rata` / `Rambut tegak berdiri` in human thermoregulation, replaced with source-backed `Bulu roma condong` / `Bulu roma menegak`.
- Advanced enzyme/denaturation explanation from the live human-temperature section, and the added chapter introduction from the live header. No new introductory filler was added under the redesigned headings.

Deferred animal/plant/exam-fact/key-term/summary data were compared with the pre-pass source and are unchanged. Appreciation/importance text is preserved. Only deferred heading numbering/hierarchy was corrected.

## Source conflict and uncertainty

SOURCE CONFLICT FOUND — Greek-origin note:

- Statement A: `homeo` = `serupa`, `stasis` = `stabil`, in `chapter3-content.ts`, BM `definition.etymology`; the existing DLP counterpart uses `similar/stable`.
- Statement B: `homeo` = `sama`, `stasis` = `tidak bergerak`, in the BM textbook, printed p.72, Greek-origin sidebar.
- Action: left the existing etymology wording unchanged, pending instruction. No choice or general-knowledge correction was made for this specific fact.

The source file cites an official DLP textbook, but that file was not available locally for independent verification. Existing approved DLP terminology is reused; new experiment sentences and presentation labels are semantic counterparts of the inspected BM textbook and the supplied English brief. They are not claimed as verified verbatim DLP textbook quotations.

## New wording audit

UNSOURCED SCIENTIFIC FACTS ADDED: NONE.

New presentation wording that is not verbatim pre-existing notes is reported here rather than claiming no new wording:

- All new DLP Experiment 3.1 problem/hypothesis/purpose/variables/apparatus/procedure/result-condition/conclusion fields, and the revised DLP Experiment 3.2 method/variables/apparatus fields, are explicitly identified semantic counterparts of the verified BM source and supplied brief. Their complete text is in `chapter3-content.ts`.
- Teacher-guided practical notices: `Teacher/lab-guided physical practical. Record your own observations and measured results.` / `Amali fizikal dengan bimbingan guru/makmal. Rekodkan pemerhatian dan bacaan sebenar anda.` These implement the user's physical-practical/own-results instruction.
- Compact feedback labels: `Internal condition increases/decreases`, `Control centre detects change`, `Condition increases/decreases`, `Normal range restored`; BM counterparts `Keadaan dalaman meningkat/menurun`, `Pusat kawalan mengesan perubahan`, `Keadaan meningkat/menurun`, `Julat normal dipulihkan`. They label the source feedback relationships requested in the brief.
- Compact water/material labels: `High body water`, `Low body water`, `Less urine + thirst`; BM counterparts `Kandungan air tinggi`, `Kandungan air rendah`, `Kurang air kencing + dahaga`. They label existing source relationships rather than add mechanisms.
- Process-strip captions: `Hot / exercise`, `Sweating increases`, `Water content decreases`, `Urine amount decreases`; BM `Panas / aktiviti fizikal`, `Peluh bertambah`, `Kandungan air menurun`, `Air kencing berkurang`.
- Short skin labels: `Trapped air layer`, `Increased heat loss`, `Reduced heat loss`; BM `Lapisan udara terperangkap`, `Haba mudah dibebaskan`, `Pembebasan haba berkurang`.
- Practical/control translations: `Problem statement`, `Materials and apparatus`, `Student name`, `Group number`, `Fan OFF/ON`; BM uses textbook experiment vocabulary and `Kipas tidak dipasang` / `Kipas dipasang`. These are presentation/table labels for source procedures and student measurements.

Other diagram labels are existing source terminology or source phrases. Generated accessible labels concatenate those same terms. No student observations or pulse measurements are prefilled.

## Verification

- Chapter 3 plus notes-shell/navigation tests: 4 files, **29 tests passed**, including 19 new Pass 1 tests. Chapter 3 alone accounts for 21 of those tests.
- Targeted lint: passed for the changed active renderer, diagrams, Chapter 3 data and tests.
- Production build: passed, including client/server, static shell, sitemap and Pages worker packaging.
- SVG visual QA: all 24 new BM/DLP SVGs rasterized and inspected. Fixed text slots preserve identical language geometry, including label positions; no source words are dropped.
- Renderer tests verify all requested relationships, source fields, durations, blank result tables, canonical BM hair terminology, missing-range removal and BM/DLP geometry.
- No browser-click/mobile layout QA is claimed. The computer-use session has no available browser; verification uses actual React server rendering and SVG raster inspection.

Stopped after Pass 1. No further animal or plant work started.
