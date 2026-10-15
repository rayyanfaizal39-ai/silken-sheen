# AcadeMY Junior: Mathematics Form 2 quiz audit and targeted visual integration

**Date:** 15 October 2026  
**Scope:** Form 2 Mathematics, Chapters 1–13, BM and DLP.  
**Branch:** `audit/math-f2-quiz-visuals-2026-10-15`  
**Base:** `main` (independent of Science Form 1 PR #65).

## Source structure and actual assessed scope

The project uses **90 questions per chapter per language**, organised as Foundation 30, Practice 30 and Challenge 30. There are **13 chapters × 90 × 2 languages = 2,340 question instances**. This pass surveyed all chapter source modules and the existing math audit/validation scripts; it is **not** a claim that all 2,340 displayed options were independently re-solved or checked line-by-line against official KSSM textbook pages.

- Chapters **1–2** own their quizzes directly in `src/content/form2/math/chapter-N/quizzes-{bm,dlp}.ts`.
- Chapters **3–13** use bilingual `quiz-bank.ts` seeds, instantiated by `src/content/form2/math/paired-quiz-bank.ts`.
- The existing student quiz route already renders declarative `MathQuestionVisual` objects in SVG/table form; no new image loader or dependencies are necessary.
- Source answer-position shuffling for paired banks is deliberately distributed using a 30-position rotation. Its indices and scoring have not been changed.
- The Challenge objective already contains both Medium and Hard items by design (first fifteen are Medium, final fifteen are Hard in the paired builder). Do not recategorise them without checking pedagogy and existing tests.

## High-confidence corrections delivered

**Chapter 5 (Circle), one BM/DLP question pair:** A line from the circle centre perpendicular to a chord was incorrectly named a *radius OP*, although P is the foot **on the chord**, not a circumference point. Reworded to **line OP from centre O** with the original true conclusion `AP = PB` preserved. Explanation and diagram now describe the correct geometry.

**Chapter 11 (Isometric Transformations), five BM/DLP pairs:** The congruence challenge items previously included a distractor partly affirming `Congruent` even when `Congruent` was correct. The alternatives now use verdict-consistent plausible misconceptions about listed side order, orientation, a single matching side, proportionality and missing angles. The actual congruence keys and numeric givens are unchanged.

In total, **6 question numbers** had content changes, mirrored in **12 BM/DLP instances**. This is targeted remediation, not a complete revision of every question bank.

## New visual coverage

Created **33 answer-neutral declarative visual question pairs**, rendered in both languages: **66 quiz instances**, using one typed reusable map in `src/content/form2/math/quiz-visuals.ts`. No decorative stock photos and no additional network-image dependencies. Every graphic shows the original givens and leaves the answer unsolved.

| Chapter | Visual pairs | Topic and rationale |
|---|---:|---|
| 1: Patterns | 0 | Existing questions are primarily symbolic sequence/pattern calculations; avoid decorative figures. |
| 2: Algebraic Expansion and Factorisation | 0 | Source has direct-owned banks; visual mapping reserved for substantive follow-up. |
| 3: Algebraic Formulae | 0 | Algebraic relationships are sufficiently represented in text; a two-triangle sketch risked suggesting a misleading scale, so it was omitted. |
| 4: Polygons | 2 | Quadrilateral and pentagon with supplied interior angles; unknown `x` remains unsolved. |
| 5: Circles | 3 | Centre-to-chord perpendicular, 90° arc and 90° sector; geometry includes only given radius and angle. |
| 6: Three-Dimensional Geometrical Shapes | 2 | Cuboid edge measurements for volume and surface-area problems. |
| 7: Coordinates | 2 | Robot's two-segment path and a coordinate right triangle, to equal coordinate-axis scales. |
| 8: Graphs of Functions | 2 | Two linear functions and gradient through two given points; graph title never names the answer. |
| 9: Speed and Acceleration | 0 | Existing questions are mostly numeric; no artificial illustrations added. |
| 10: Gradient | 2 | Schematic distance–time slope and the region beneath a speed–time graph. |
| 11: Isometric Transformations | 5 | Five reflected points; show only original position, **not** the solution point. |
| 12: Measures of Central Tendencies | 10 | Five exact frequency tables for mean and five for mode. |
| 13: Simple Probability | 5 | Marble groups from stated red/blue counts, with no selected outcome. |
| **Total** | **33** | **66 bilingual rendered instances** |

The visuals use the existing `MathQuestionVisual` SVG/table renderer. Charts use bilingual labels, geometry descriptions state when diagrams are not to scale, coordinate planes use equal axis-unit scaling, and BM/DLP refer to equivalent diagram content.

## Outstanding, recommended deeper audit

1. **Full answer recomputation:** Manually or programmatically solve each question and independently verify each plausible alternative. Existing validation scripts check structural correctness; structure alone is not proof of mathematics.
2. **Chapter 1 DLP existing routing test:** Previous repository reports identify a pre-existing failure in `chapter-1/quizzes-dlp.test.ts`; verify its present status against `main`. Do not attribute it to this branch without a baseline comparison.
3. **Chapter 2 direct-owned algebra bank:** Audit longer algebraic questions separately and add algebra-tile or area models only when they genuinely test representation rather than give away factorisation.
4. **Hardness and pedagogy:** Inspect Foundation vs Practice vs Challenge balance, repeated templates, unrealistic distractors and answer-length biases. Distinguish DSKP scope from supplementary extension exercises.
5. **Dynamic seed generation:** Re-solve generated coordinate, area, speed, probability, and statistics variants; protect their numerical invariants with tests.
6. **Manual responsive preview:** Check rendering of each figure/table at 320px and tablet widths for clipping, overlapping points or labels, and accessibility description quality. Don't force diagrams on every question.
7. **Formal curriculum cross-reference:** A page-level KSSM textbook/DSKP verification of all questions remains outstanding.

## Regression coverage

Added `src/content/form2/math/math-f2-visual-reaudit.test.ts` to check 90 unique question IDs and 4 distinct options in every paired BM/DLP bank (Chapters 3–13), language alignment, correct indices, Foundation/Practice/Challenge difficulty metadata, exact 33 visual mappings, the chord terminology correction, the congruence distractors, and marble counts matching premises.

Suggested local commands:

```bash
npm test -- src/content/form2/math/math-f2-visual-reaudit.test.ts
npm run validate:math-f2-batch-a
npm run validate:math-f2-batch-b
npm run validate:math-f2-batch-c
npx tsc --noEmit
npm run build
```

**No local test execution, typecheck or production build is claimed from the GitHub connector.** Merge only after Codex or CI runs these checks and manual visual QA is complete.
