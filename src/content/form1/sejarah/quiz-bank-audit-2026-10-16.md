# AcadeMY — Sejarah Form 1 quiz audit (16 October 2026)

## Scope and decision

Inspected the **current GitHub `main`** Sejarah Form 1 question definitions for all **8 chapters × 30 questions = 240**. Read the actual live sources, not just the duplicated/older `src/data/quizzes.ts` copy. Reviewed the existing chapter-specific tests and the prior documented selective repairs (Bab 1–3, 6–8).

**Disposition: no verified critical factual or structural defect in the reviewed live bank; do not replace sound questions just to produce a diff.** This PR adds cross-chapter regression coverage and records editorial follow-ups. It does **not** change any question, XP values, submission identity, payments, student records or deployment configuration.

## Where the student-facing questions actually come from

Quiz route → content registry → `@/data/content`:
- **Bab 1–3:** imported shared owners `sejarahF1Chapter1Quizzes`, `sejarahF1Chapter2Quizzes`, `sejarahF1Chapter3Quizzes` from `src/data/quizzes.ts`.
- **Bab 4–6 and Bab 8:** inline questions in `src/data/content.ts`; copies in `src/data/quizzes.ts` are older and must **not** be edited as if they were live.
- **Bab 7:** `sej7Quizzes` from `src/content/form1/sejarah/chapter-7/sej7-revision.ts`, with explanations referencing `sej7-content.ts`.

This split ownership is an **important maintenance risk**. A future single-source consolidation should be a separate, behavior-preserving refactor with full bank identity and XP regression tests.

## Automated source-level review

| Bab | Live records | Easy / Medium / Hard | Stored answer is a longest option* | Initial blocking structural findings |
| --- | ---: | --- | ---: | --- |
| 1 — Mengenali Sejarah | 30 | 8 / 16 / 6 | 7/30 | 0 |
| 2 — Zaman Air Batu | 30 | 8 / 16 / 6 | 12/30 | 0 |
| 3 — Zaman Prasejarah | 30 | 8 / 15 / 7 | 7/30 | 0 |
| 4 — Mengenali Tamadun | 30 | 8 / 15 / 7 | 9/30 | 0 |
| 5 — Tamadun Awal Dunia | 30 | 8 / 15 / 7 | 10/30 | 0 |
| 6 — Peningkatan Tamadun Yunani dan Rom | 30 | 8 / 15 / 7 | 8/30 | 0 |
| 7 — Peningkatan Tamadun India dan China | 30 | 8 / 15 / 7 | 12/30 | 0 |
| 8 — Tamadun Islam dan Sumbangannya | 30 | 8 / 15 / 7 | 6/30 | 0 |
| **Total** | **240** | **64 / 122 / 54** | **71/240 (29.6%)** | **0** |

*Includes equal-length ties; length is only a weak proxy for cueing, not a verdict on an item. Several choices are dates, civilisation names or equivalent lists, where this metric is less informative. Runtime shuffles the order of answers, so a fixed answer position is not exposed. Correct-answer length should still be considered in future item writing.

Checks on the source definitions found four nonempty options and valid answer indices for every question, no exact duplicate stems within a chapter, no missing question IDs and no prompts that explicitly require an unseen numbered diagram. The Bab 7 records are assembled from `questions` and `difficulties` arrays rather than object literals, so these were inspected separately.

## Human editorial review / watch items

- **Bab 1:** documented selective repairs cover source verification, oral/written methods, interpretations of Tok Janggut, and preservation. The longer q17/q22 answer choices follow from the scenario; avoid mechanical trimming that damages correctness.
- **Bab 2:** retain the original textbook's clearly scoped dates and its stated use of `pengglasieran` rather than silently substituting a modern geology definition. The chapter's known-edition qualifications are already in `chapter-2/quiz-source-audit.md`.
- **Bab 3:** pre-edit decisions are documented; the file `chapter-3/quiz-source-audit.md` still says final validation was pending. Confirm the final historical evidence against the school textbook during the next dedicated content pass.
- **Bab 4:** the textbook groups `civitas` under *bahasa Yunani*; do not automatically “fix” this based only on the classical etymology (which is a separate question). Watch the distinction between syllabus terminology and historical linguistics.
- **Bab 5:** q12/q14/q22 all revisit Indus planned cities / uniform bricks / drainage. They are not exact duplicates, but q22 could be swapped for another **5.1** location/environment application if future student item-analysis data shows repetition or poor discrimination. q26 on priestly administration is explicitly backed by the Form 1 textbook.
- **Bab 6:** q8/q23 both ask about Athenian institutions, but Council and Jury are different bodies. Do not collapse them as semantic duplicates. Distinguish governance and civic participation.
- **Bab 7:** staged examinations, Kalinga casualties versus property losses, Asoka's postwar policy and Gupta chronology already have targeted source-derived checks. Option-length balancing can be revisited after student answer-distribution data.
- **Bab 8:** maintain separation between questions on economic leadership, military leadership and the Madinah charter. The chapter-specific tests already cover many likely factual confusions.

Reference for syllabus coverage: Jabatan Muzium Malaysia / DSKP versus KSSM Form 1 textbook, `https://ipim.jmm.gov.my/sites/default/files/dockokurikulum/T1%20_DSKP%20VS%20BUKU%20TEKS_ZAR.pdf`. Source text examples also checked against publicly accessible KSSM textbook pages (especially printed p. 108 for Indus, and Bab 4 on civitas). **This was not a new page-by-page textbook proofread of all 240 answers.** An item should only be marked “factually verified” after that separate source check.

## Regression coverage added

`sejarah-f1-quiz-bank-audit.test.ts` exercises the **actual runtime-facing registry** for all eight chapters:
1. Exactly 240 unique IDs, 30 per chapter, plus one-to-one parity with the exported live collection.
2. Expected per-chapter difficulty counts, chapter identity, distinct answer choices, valid answer index, substantive explanation and no stem requiring a missing graphic.
3. Two seeded attempt permutations to catch accidental reversion to block-ordered difficulty shuffling.
4. Preserved correct-answer text and four-choice membership after seeded choice shuffling.

This new test complements — **does not replace** — the detailed chapter-level source-specific tests. The existing `orderRegularQuizQuestions` code explicitly mixes tiers for Sejarah Form 1. Older Bab 1/Bab 2 audit documents describing block-level shuffling are out of date.

## Validation status and pull workflow

- **Performed:** source inspection / question enumeration / checks above, from the GitHub-connected repository.
- **Not performed in this environment:** `vitest`, TypeScript, lint, production build or interactive browser quiz session. Therefore CI is **not** claimed green.
- From the branch in VS Code, run `npx vitest run src/content/form1/sejarah/sejarah-f1-quiz-bank-audit.test.ts src/content/form1/sejarah/chapter-{1,2,3,4,5,6,7,8}/*quiz.test.ts` (glob support differs on Windows); alternatively use the repository's `npm test` script as configured.
- Do not merge or deploy without green checks and a sampled UI attempt on mobile. No database operation required.

## Follow-up priorities

**P1:** Verify source ownership is made unambiguous to editors, then consolidate old duplicate banks separately.

**P2:** Run item-response analysis once enough attempts exist (incorrect-answer frequency, question discrimination, questions rushed or skipped, time to answer). Target genuinely weak items rather than mass rewriting.

**P3:** Finish the pending Bab 3 documentation/source-signoff and spot-check Bab 2's edition-specific terms before curriculum changes.
