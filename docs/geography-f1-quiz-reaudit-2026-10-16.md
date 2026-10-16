# AcadeMY Junior — Geography Form 1 quiz re-audit

**Date:** 16 October 2026  
**Branch:** `audit/geography-f1-recheck-visuals-2026-10-16` (based on `main`; separate from Science F1 PR #65 and Mathematics F2 PR #69).

## What was actually checked

- Inspected the **live bank** in `src/data/content.ts`, not the stale duplicate in `src/data/quizzes.ts`.
- All **13 chapters × 30 questions = 390 live BM Form 1 Geography MCQ items** were indexed and checked for unique IDs, 4 answer options, in-range answer indexes, nonempty explanations, difficulty distribution and existing image references.
- Each chapter contains 30 unique question IDs, a unique stem per chapter and no duplicate answer texts within any of the 390 four-option questions.
- Every question originally had **zero attached images/visuals**; existing geography tests deliberately avoid dependency on unseen pictures.
- Form 1 Geography question **order and answer options are shuffled at runtime** in `src/features/quiz/difficulty/quizDifficulty.ts`; source-position patterns should not be mistaken for the student's presented order.
- Inspected chapter topics, stems and keyed answers across all 13 chapters, with targeted review of content validity and map/diagram suitability.
- **Not** a claim that all 390 facts were independently checked page-by-page against a current official textbook or that all exams/course outcomes are certified. Historical textbook-specific wording (particularly Chapter 11 cities/statistics) remains scoped to the textbook.

## High-confidence content improvements

1. `geo-f1-c2-q28` (**definite answerability defect**). The question asked where a post office was after naming three *other* building positions. With no post-office position given, the keyed answer 'right' did not follow; three occupied positions do not exclude multiple buildings from sharing a direction. The revised stem explicitly puts the post office opposite the school across the mosque. The unchanged keyed answer 'Sebelah kanan masjid' is now derivable. Explanation corrected.
2. `geo-f1-c7-q30` (**overgeneralisation**). The original correct option claimed *only* rivers form natural boundaries. Changed it to the defensible Malaysian example of Sungai Bernam between Perak and Selangor; corresponding chapter test updated. Other options, keyed position and item ID preserved.
3. `geo-f1-c13-q25` (**weak distractors**). Original alternatives only named obvious noninfectious conditions (hypertension, stroke, short-sightedness), allowing guessing without content knowledge. Replaced three distractors with plausible mixed disease lists containing a noncommunicable condition each. Correct option and answer index unchanged.

## Eight selected SVG visuals

All SVGs are local `public/geography/form1/quiz-visuals/` assets, and mapped at the **live chapter registry** via `src/content/form1/geography/quiz-visuals.ts`. This avoids copying/rewriting legacy banks, changing question IDs, or forcing images on other subjects. Every quiz remains answerable from its text alone.

| Question | Visual stimulus | Why |
|---|---|---|
| `geo-f1-c1-q26` | 225° bearing on a compass rose; U/T/S/B cardinals, no answer text | Makes clockwise bearings spatial rather than rote. |
| `geo-f1-c2-q23` | Two labelled 10° U and 12° U parallels with unlabeled midpoint Q | Tests finding latitude between two parallels; computed value omitted. |
| `geo-f1-c3-q30` | Peta lakar showing river, mosque point and oil-palm area | Learner matches real features to point/line/area symbols. |
| `geo-f1-c5-q8` | Three major Earth-structure layers, not to scale, without scientific layer names | Helps relate surface/mantle/core while preserving recall task. |
| `geo-f1-c7-q24` | Meandering river after a neck cutoff but before abandoned channel is sealed | Helps sequence oxbow-lake formation without drawing final result. |
| `geo-f1-c9-q24` | Three housing distributions X/Y/Z, matching the described patterns | Tests settlement layout recognition rather than just prose memorisation. |
| `geo-f1-c12-q18` | Rain reaching soil and downward groundwater recharge arrows | Helps visualise a process without writing the process name. |
| `geo-f1-c13-q9` | Blocked drainage culvert and accumulated domestic waste | Shows causal mechanism behind blocked water flow. |

Each static SVG includes a `<title>` and `<desc>`, has a responsive `viewBox`, loads without JavaScript and does not introduce a third-party image/AI dependency. No political-border maps were improvised.

### Further visual opportunities requiring careful source verification

- **Chapter 4:** Actual Malaysian states and federal territories on a verified outline, not a rough invented map.
- **Chapters 6–7:** Peninsula/Borneo relief and river locations with accurate reference cartography.
- **Chapters 10–11:** A high-fidelity labelled/blank Southeast Asia base map for country recognition, rivers, lakes and population distribution. Recheck geographical boundaries and historical textbook framing before publication.
- **Chapters 8–9:** Optional density classification legends and more settlement-pattern tasks if they require genuine visual interpretation. Avoid repetitive decorative infographics.

Visual numbers are deliberately modest: **8 mapped questions out of 390**. The aim is to add useful stimuli rather than decorate factual recall questions.

## Regression/test status

- New `src/content/form1/geography/geography-f1-reaudit.test.ts` checks all 390 source IDs, correctness of the new Q28 premise, updated Q25 distractors and every SVG-to-live-bank mapping, while verifying no question IDs or answer keys are modified.
- Chapter 7's existing test was updated to guard the corrected river/lake example.
- **Not executed in this connector environment:** Vitest, TypeScript typecheck, full build, responsive browser screenshot QA. Do not merge without running these checks on a clean worktree.
- Note the SVG assets are question illustrations; the regular quiz UI currently renders supplied question images with `alt=""`. The written stems are self-contained, but a follow-up accessibility review should decide whether to add meaningful accessible text for informative image stimuli.

### Commands for clean Codex/Claude worktree

```bash
git fetch origin
git worktree add ../silken-sheen-geo-f1 -b review/geo-f1-visuals origin/audit/geography-f1-recheck-visuals-2026-10-16
cd ../silken-sheen-geo-f1
npm test -- src/content/form1/geography
npx tsc --noEmit
npm run build
```

Also inspect the eight assets at 320px width and verify there is no crop/overlap and the stem still makes sense. Recheck both `src/data/content.ts` and the registry in the browser. **Do not change the existing uncommitted Science Form 1 local worktree**, and do not merge into main before all checks pass.

## Visual repair and validation — 16 October 2026

- Increased all eight SVG label sizes to 32–36 SVG units, removed redundant tiny instruction footers, and repositioned labels. Preserved the navy palette and 720 × 360 viewBox. Reviewed the exact assets in a temporary browser gallery at desktop, 320px and 360px widths: no clipping, overlaps or horizontal overflow.
- Compass: unchanged 225° arrow geometry; separated the bearing explanation from clearly visible U/T/S/B labels.
- Earth: exactly three major layers remain. The outer pointer now ends at (240,96), radius approximately 145 from centre (358,180), within the outer annulus (139–151).
- River: the old loop meets the shortcut at (280,115) and (440,115); the shortcut now rejoins the downstream channel. Both old-loop mouths remain open. Neither deposition nor the next-step answer is depicted or labelled.
- Geometry cross-check: USGS describes meander cutoff as an upstream/downstream connection that shortens the river, leaving the old bend: https://pubs.usgs.gov/ha/ha730/ch_f/F-text2.html . This is verification of the diagram, not new question content.
- Drain: removed “Sisa menyekat laluan air” and causal wording from its title/description. The illustration shows objects and differing water levels without spelling out the answer.
- Added descriptive BM alternative text for the eight exact Geography asset URLs. Both existing image-render sites use the scoped helper; every other image retains its previous empty alternative. SVG descriptions match the accessible alternatives. No correct option names or next-step answers were added.
- Preserved all 390 questions, IDs, options, answer indices and explanations. No question-bank, XP or scoring changes. New presentation text consists solely of the requested accessible descriptions of visible features.
- Geography validation: 325 tests passed across 14 files, including bank preservation, all eight mappings, outer-pointer geometry, connected river junctions, unchanged bearing and accessibility scoping.

### Unrelated TypeScript failures (not repaired)

`npx tsc --noEmit` still reports only these two existing TS2345 errors (`string | undefined` passed to a string parameter):

- `src/content/form2/science/chapter-7-9-10-visual-integration.test.tsx:305:65`
- `src/content/form2/science/chapter-9/chapter-9-heat-visuals.test.tsx:523:65`

Neither file was edited. The original Science workspace and Mathematics worktree were not accessed or modified during this repair.

Production build: passed. Targeted ESLint for the Geography helper and regression tests: passed. No merge performed.
