# Mathematics Form 2: final quiz audit, corrections and visuals

**Date:** 15 October 2026 · **Branch:** `audit/math-f2-quiz-visuals-2026-10-15` (PR #69) · **Scope:** Chapters 1–13, BM and DLP (2,340 question instances)

This follows `docs/math-f2-quiz-visual-reaudit-2026-10-15.md` and replaces its "outstanding" list.

## 1. Method

- Read every seed bank (Chapters 3–13) and both direct banks (Chapters 1–2) in full, and recalculated each answer by hand.
- Added `math-f2-answer-resolver.test.ts`. It parses every **generated** stem (about 450 items in 100+ families) and re-solves it from first principles, without calling the generator. It then checks the stored answer, and checks that no distractor has the same value.
- Added automated scans for: Malay options in DLP, generic fallback options, clustered repeat answers, floating-point output, and right-verdict-wrong-reason distractors.
- Did browser QA of all 171 visuals in BM and DLP at 1280, 375 and 320 px. Text-overlap and overflow were measured with `getBBox`, plus a manual screenshot review. A real-route smoke test in guest mode loaded the Chapter 10 quiz with graphs and no page errors.

## 2. Mathematical errors and defects corrected

All IDs, answer indices, 30/30/30 objectives, shuffling, XP and progress logic are unchanged. Where questions were rewritten, they keep their ID and position.

| Ch | Defect | Fix |
|---|---|---|
| 3 | Distractor `24/3` equals the answer `8` (two correct options) | Replaced with `24` (forgot to divide) |
| 3, 4, 5, 8, 10, 12, 13 | About 40 DLP options shown in Malay (`2 sahaja`, `Tiada mod`, `7.5 jam`, `{A sahaja}`, `Tidak ditentukan`…) | Every option is now a BM/DLP pair |
| 5 | "AB = 18 cm, find AP": O never stated as centre; explanation says "perpendicular radius" | Stem states O is the centre; explanation corrected |
| 5 | "Verify radius difference" gave the answer (3 cm) in the stem | Rewritten so the difference is derived from 6π |
| 5 | Answer `3√10 cm`: surds are outside KSSM Form 2 | 40° sector of 16π → 12 cm |
| 6 | Five identical cone-vs-cylinder items, all 33.33% | Replaced with cone total surface area, sphere volume, hemisphere surface area, cone-on-cylinder volume and open-cylinder surface area |
| 6 | Painting-cost answers had no currency | `RM…` |
| 6 | "One curved surface, no vertices" was also true of a cylinder | Stem now asks for the only-one-surface solid |
| 6 | Missing heights 6, 6, 6, 6, 5; cube answers 7, 7, 7; `23.999999999999993` in an explanation | Data varied; formatting fixed |
| 7 | Shoelace method (Form 4 Additional Mathematics) in 8 items | 3 Foundation items replaced with Form 2 distance/midpoint items; 5 Challenge items reworded to use the enclosing rectangle minus triangles |
| 7 | Perimeters were 16, 18, 18, 18, 18; all five midpoint claims "Correct"; endpoints A and B offered as "midpoint" distractors | Varied data; verdict options; misconception-based distractors |
| 8 | `y = 3x + 0` and `y = 3x − 0` both offered; `1x`, `-1x`, `+ -3` throughout; domain `{2, 2, 2, 2}` | A single linear formatter; corrected data |
| 8 | Repeated answers ("Yes" ×5; 7, 7, 7; 4/5 alternating); cost answers without RM | Varied data and verdicts; RM added |
| 9 | Four km/h → m/s acceleration items had answer **0** (start speed = final speed) | New start speeds (answers 0.2, 0.5, 1, 0.4, 0.7) |
| 9 | Repeated averages (60 ×4, 48 ×3, 240 min ×3) | Varied data; distractors include the mean of the speeds and ignoring the stop |
| 10 | Speed changes to v and then "remains" at a different speed (3 items); "from 0 to 0 in 5 s"; two degenerate "trapezia" | Consistent data |
| 10 | All 5 collinearity answers "Yes"; absurd classification distractors ("Always one"); repeated answers | Verdict options; the other gradient classes as distractors; reciprocal/sign distractors |
| 11 | Mirror line always `x = 0`; rotation always 90° anticlockwise; "Yes" plus "Yes because both are rectangles" | Five different lines and rotations; opposite-verdict distractors |
| 11 | Off-by-one coordinate distractors | Named transformation mistakes (wrong axis, wrong direction, wrong order) |
| 12 | Mode distractors collided with the answer (generic fallback options) or printed `5.8333…`; "Which mean is higher" filter broken | Explicit misconception options; fixed options |
| 13 | **All five "red, blue and green" bags had 0 green marbles** | Corrected counts |
| 13 | BM "L/P" children question answered with B/G letters | BM `{LL, LP, PL, PP}`, DLP `{BB, BG, GB, GG}` |
| 13 | Mutually exclusive P(A or B) (Form 4) | Reframed as one bag with red/blue outcomes |
| 1 | DLP C25 "greatest complete stage that uses exactly 121 tiles" | "Which stage uses exactly 121 tiles?" |

Deliberately unchanged: Chapters 1–2 mathematics (every item re-checked and correct), all of Chapter 4's working, and every correct item in other chapters. Stored answer-position skew in Chapters 1–2 is harmless, because options are shuffled at runtime.

## 3. Visuals

**Total: 171 visual question pairs (342 BM/DLP instances)**, up from 54. That is **117 new** pairs, and **9 existing diagrams were rebuilt to scale**.

| Ch | New | Notes |
|---|---:|---|
| 4 | 5 | Polygons are built from the true interior angles, including the unknown (tests check within 0.5°). The existing quadrilateral (105° drawn as 86°) and pentagon (drawn regular) are rebuilt. ABCDE exterior angles are shown on extended sides. |
| 5 | 15 | Chord/perpendicular/radius figures are to scale (r : d : half-chord tested), e.g. r = 13, 5 cm, AB = ?. Also: parallel chords, inscribed circle, rectangle + semicircle, capsule, annulus, four quarter-circles, sector + triangle, sector removed. The sector-perimeter figure now shows the sector only. |
| 6 | 7 | Half-cylinder (silhouette at 135°), triangular and trapezium prisms, cone (slant), hemisphere, cone on cylinder, open cylinder. Hidden edges are dashed from the projection. The two existing cuboids now have true proportions. |
| 7 | 10 | Coordinate triangles (perimeter) and quadrilaterals (area). |
| 10 | 30 | New `motion-graph` kind: linear time and value axes from 0, labelled only with given readings, shaded area-under-graph regions, and never the gradient or area. |
| 11 | 50 | Fixed ±10 grid: object point, mirror line or centre O. Images are plotted only when the stem gives them, and never when they are the answer. |
| 2 | – | The side label no longer overflows the rectangle panel. |

New code: `src/features/quiz/visuals/mathMotionGraphVisual.ts`, `src/components/quiz/MathMotionGraphVisual.tsx`, `src/content/form2/math/visuals/*`. Circles and arcs gained optional `fill: false` / `dashed` (backward-compatible). No new dependencies.

## 4. Tests

- `math-f2-answer-resolver.test.ts`: independent re-solution of every generated family (Chapters 6–13).
- `math-f2-final-audit.test.tsx` checks:
  - no Malay options in DLP and no fallback options
  - no answer clusters
  - no float or `1x` artefacts
  - opposite-verdict distractors
  - no visual prints or plots its answer
  - polygon angles and chord scales are accurate
  - graphs use the stem's numbers
  - every visual renders with an accessible description
- `math-f2-visual-reaudit.test.ts` expected counts updated (165 paired-bank pairs plus 6 in Chapter 2).

Results: all Math F2 tests pass (10 files, 113 tests). The required `npm test -- …reaudit… chapter-2/quiz-visuals…` command passes (20/20). Validators batch A, B and C pass. `npx tsc --noEmit` reports no errors in changed files; the only errors are pre-existing ones in untouched Science and business-card test files (missing `jsqr`/`pngjs`, two `string | undefined`). `npm run build` succeeds.

## 5. Remaining issues (not fixed here)

1. **Quiz breadcrumb shows Form 1 chapter titles for Form 2 Mathematics** (e.g. "Perimeter and Area" on Form 2 Chapter 10). This is pre-existing in `src/routes/quizzes.tsx`'s chapter-name lookup, out of scope for a content PR, and that file is also being edited on the Science branch.
2. The geometry renderer always prints "Diagram not to scale", even though the new figures are to scale.
3. The shared coordinate renderer's "−2" and "0" tick labels graze at the origin at 320 px (pre-existing, under 2 px).
4. A page-by-page check against the official KSSM textbook/DSKP was not possible offline. Curriculum judgements (surds, shoelace, combined events) are based on the KSSM Form 2 learning standards.
