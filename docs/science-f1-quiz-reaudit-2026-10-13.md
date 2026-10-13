# AcadeMY Junior — Science Form 1 quiz re-audit (2026-10-13)

## Source and safe rollout
Repository: `rayyanfaizal39-ai/silken-sheen`. Work occurs on `audit/science-f1-quizzes-visuals-2026-10-13`; `main` was not modified. This is a source-code review and targeted remediation, **not** a claim that every question has been independently checked against the original textbook page or DSKP wording. A separate textbook-line comparison should be done before describing the entire bank as fully curriculum-verified.

The regular quiz route already renders `current.image` for ordinary quizzes and shuffles the answer choices while retaining the correct index. Rather than maintaining two copies of every SVG, the registry uses a single BM/DLP-safe map `scienceF1QuizVisualById` on lookup; the source question IDs and quiz state/XP logic remain unchanged.

## Baseline
Nine chapters, **30 quiz items in each BM and DLP bank**: 270 BM + 270 DLP. The legacy Chapter 1 quiz source lives in `src/data/quizzes.ts` (with a prior Chapter 1 audit); the revised Chapter 2 live bank is in `src/content/form1/science/chapter-2/quizzes.ts`. Chapters 3–9 have live sources under `src/content/form1/science/chapter-N/quizzes-{bm,dlp}.ts`. The flat legacy copies are not an acceptable substitute for the Chapter 2 canonical bank.

## Changes

| Chapter | Paired questions revised | Specific work |
|---|---|---|
| 1 | — | Two cylinder/displacement stimulus diagrams attached to existing Q4 and Q18; preserve earlier Chapter 1 remediation. |
| 2 | — | Leaf light-exclusion stimulus attached to canonical Q18; preserve its 10/10/10 SP-tested bank. |
| 3 | Q25, Q28 | Qualify stomatal opening by daytime/water availability; replace off-topic lizard distractors with a temperature/metabolism case. Add guard-cell diagrams to Q15 and Q25. |
| 4 | Q13, Q22, Q30 | Make Fallopian-tube mechanism explicit; make premenstrual changes precise; use six ovules / four fertilisations to assess seed/fruit inference. Add a longitudinal flower diagram. |
| 5 | Q29, Q30 | Replace obvious 'flammability is a chemical property' and density recall with magnesium-versus-melting evidence and numerical float/sink reasoning. Add particle and heating-curve diagrams. |
| 6 | Q28, Q29 | Make wire material choice depend on conductivity **and** ductility; make conservation of mass a two-product calculation. Provide a chromatography apparatus diagram. |
| 7 | Q26, Q30 | Replace basic oxygen and acid-rain definitions with controlled comparison of candles and acid reaction with limestone. Attach a three-factor fire stimulus. |
| 8 | Q26, Q30 | Keep lightning/thunder comparison within Form 1 scope without requiring a Form 2 speed-of-sound calculation; replace the imprecise claim that black objects absorb *all* colours with relative absorption. Add plane-mirror, reflection, refraction, and periscope diagrams. |
| 9 | Q28, Q30 | Explain earthquake as sudden fault slip/released elastic energy; use upstream/downstream turbidity evidence for a mining mitigation decision. Add Earth cross-section and plate-boundary diagrams. |

The revised variants retain their original question IDs and correct-option meaning in both languages. Difficulty flags have been adjusted where warranted. DLP/BM pairs use identical graphics, avoiding inconsistent diagrams.

## Visual inventory
**15** original, lightweight educational SVG files in `public/quiz-visuals/science-f1/`, reused at **21 question numbers**, i.e. 42 bilingual question instances. Each is a supporting stimulus rather than a solution picture: reflection/refraction figures omit the outgoing ray, the mirror diagram omits the image, and the fire triangle labels its factors generically. Existing question wording remains sufficient without access to the picture.

The mapping is in `src/content/form1/science/quiz-visuals.ts`. The registry adds `image` only for Form 1 Science. No changes are made to other subjects' quiz screen, XP, streaks, history or answer randomisation.

## Identified remaining work
1. Many pre-existing easy/medium distractors remain weak, particularly Chapter 3 plant-versus-human distractors and some Chapter 9 geosphere definition questions.
2. Correct options are still the uniquely longest in a sizeable fraction of Chapters 3 and 9. Runtime option shuffling fixes positional clues, not length clues.
3. Chapter 4 still has comparatively few genuinely high-cognitive-demand items; the revision only moves it from one to two Hard questions.
4. Verify every quiz premise and explanation against official KSSM textbook and DSKP pages; a source-by-source verification is not included in this change.
5. Complete a manual responsive QA pass in quiz arena to ensure the new diagrams render clearly on a real narrow mobile viewport.

## Regression coverage and release gate
`src/content/form1/science/science-f1-quiz-reaudit.test.ts` checks that all 18 banks have 30 distinct questions with four unique options, valid answer indices, explanations, matching BM/DLP numbering and difficulty, that mapped images resolve consistently, and that the two key scientific corrections stay present.

Review the source and run the test, typecheck and production build before merging the PR. A GitHub PR being open does **not** mean the branch is already live. Do not merge until these checks and mobile visual QA have passed.
