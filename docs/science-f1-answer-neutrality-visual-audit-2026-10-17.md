# Science Form 1 — option-neutrality and visual follow-up (17 October 2026)

## Scope and provenance

This follow-up audits **all nine Science Form 1 chapters**, in **BM and DLP**, using the canonical live quiz banks (30 questions per chapter per language; **540 total records**). The starting point is the already-merged Science content/visual re-audit PR #65, merged as `66bd8b5da07668d79d49ffd277a308791940ef97`. No changes are made to Sejarah, to student progress, or to the scoring, XP, timer and runtime-shuffle implementations.

The goal is not to make every option precisely the same number of characters: that would create unnatural or misleading science. Instead, comparable options should have plausible structure, be roughly balanced in length and remain scientifically distinguishable only through what the student knows.

## Measured editorial audit

The measurement is `correct option character length / mean character length of the three distractors`, applied separately to BM and DLP. Counts are from static inspection of the repository content; the new automated regression asserts this rule on the **live resolved quiz bank**.

| Check | Previous merged `main` | This audit branch |
| --- | ---: | ---: |
| Questions inspected | 540 | 540 |
| Distinct IDs | 540 | 540 |
| Correct option > 1.5× distractor mean | 37 | **0** |
| Correct option < 0.65× distractor mean | 39 | **0** |
| Severe length-ratio outliers | **76** | **0** |
| Correct option strictly longest | Not remeasured in this pass | **131/540 (24.3%)** |

**88 unique question records** have at least one answer-option text changed relative to the merged baseline; a few went through more than one editorial revision. Their stored `answerIndex`, numbering and question counts are unchanged. Answers are still not guaranteed to be statistically non-predictive until student response data can be analysed. Grammar, specific scientific precision and alternative-option plausibility also matter, not just length. The quiz already shuffles options at runtime.

Chapter-by-chapter static scans found 60 unique valid question IDs in every chapter (30 BM and 30 DLP), four nonblank choices per question, all indices inside 0–3, and no flagged length-ratio outliers under the 0.65–1.50 policy.

## Added answer-neutral educational visuals

Added seven self-contained static SVG stimuli, reused by BM and DLP, with accessible language-specific descriptions. These visuals illustrate the **given conditions** without drawing the correct response or substituting for essential information in the question stem.

| Chapter/question | File | Diagram |
| --- | --- | --- |
| C1 Q15 | `pendulum-setup.svg` | Two pendulum lengths; no measured timings |
| C3 Q30 | `plant-variables.svg` | Two plants with temperature/watering conditions; no stomatal results |
| C4 Q15 | `seed-conditions.svg` | Three germination setups with water and oxygen conditions; no outcomes |
| C5 Q30 | `density-comparison.svg` | X/Y masses and volumes without float/sink outcome |
| C6 Q29 | `mass-conservation.svg` | Reactants and 12 g solid, with unknown gas mass |
| C7 Q26 | `candle-jars.svg` | Identical candles enclosed in different air volumes; no durations |
| C9 Q30 | `mining-runoff.svg` | River, mining area and upstream/downstream runoff condition |

These join the 14 prior SVG assets (21 unique assets total) and increase mapped visual question pairs from **19 to 26** (**52 BM/DLP placements**). The `ScienceF1QuizVisual` presenter still resolves images from the canonical ID mapping, retaining original quiz object identity. The new diagrams need real browser review at narrow/mobile and desktop sizes to confirm legibility, scientific fidelity and no clipping.

## Verification and remaining gates

Static repository-content scan completed for all 540 records; IDs, option counts, answer indices and length ratios were checked. All 16 relevant source files were compared with the merged baseline: no question ID or answer index drift was found. A Vitest regression check was added for the new **0.65–1.50** relative-length requirement; map-count checks now expect **52 bilingual question IDs** and **21 unique assets**.

**Not claimed here:** execution of `npm test`, `npm run build`, TypeScript or ESLint; live-browser/mobile QA; rendered SVG inspection; independent source verification of every replacement option; or actual student item-discrimination data. The GitHub connector supported source inspection and commits, not executing this repository's JavaScript test suite. CI and real UI checks are required before merge.

## Next sequence

1. Run focused Science content, canonical identity, quiz renderer, and other existing repository tests; run build/type-check and investigate unrelated failures separately.
2. Inspect all seven SVGs in the real quiz at desktop and 320–390 px, in BM and DLP; check that each diagram remains answer-neutral and labels do not clip.
3. Review answer-option semantics and the diff for all 88 modified question records, then merge/deploy only after sign-off.
4. After Science acceptance, proceed to **Sejarah Form 1**: live-bank inventory, longest-answer and distractor-cue audit, visuals where pedagogically useful, and tests. Keep it in a separate PR.
