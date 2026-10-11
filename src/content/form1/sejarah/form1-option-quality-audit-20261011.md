# Sejarah Tingkatan 1 — objective quiz quality review (11 October 2026)

## Scope and source of truth

Review covers all eight KSSM textbook chapters, 30 questions per chapter (240 live questions). Sejarah objective quizzes are in Bahasa Melayu and use a single mixed-difficulty attempt. Live sources: Chapters 1–3 in `src/data/quizzes.ts` (reused by `src/data/content.ts`); Chapters 4–6 and 8 in `src/data/content.ts`; Chapter 7 in `src/content/form1/sejarah/chapter-7/sej7-revision.ts`. The older copies of Chapters 4–6 and 8 in `src/data/quizzes.ts` are not the live bank. Do not edit only those older copies.

The repository contains textbook-specific review and regression coverage for Chapters 1–8. The KSSM Form 1 textbook has eight chapters. This pass checks the present live answer-option wording and length; it does not claim to have independently rechecked every historical fact against every printed textbook page.

## Observed answer-length pattern — live questions only

The correct answer is *strictly* the longest in approximately 44 of 240 questions (18%, below the random 25% baseline). This is much better than the old, stale duplicated banks. The measured number of strictly-longest answers by chapter is: C1 6, C2 6, C3 4, C4 6, C5 7, C6 5, C7 7, C8 3. Counting strictly longest by itself is not sufficient: a disproportionately verbose correct choice in an individual question is still an answer cue.

Priority review items:

- **C1 Q17**: correct oral-method sequence is materially more verbose than distractors. Make every choice a complete three-stage sequence; retain fact checking against written sources as the distinguishing historical skill.
- **C1 Q22**: correct interpretation conclusion is verbose. Shorten the correct conclusion without deleting the source-selection perspective or making an incorrect choice obviously absurd.
- **C1 Q13**: correct `Buku teks sejarah` is the only long source label. Use consistent descriptions of sources where useful.
- **C1 Q19**: `Muhd Yusof Ibrahim` is longer because it is a proper name. Do not distort names to force equal character counts.
- **C5 Q10**: `Raja` is uniquely very short beside `Pendeta`, `Bangsawan`, `Pedagang`. Parallel titles such as `Golongan raja`, etc., would reduce the cue while preserving the underlying answer.
- **C6 Q7**: `Aristokrasi` is longer than other valid government system names. Do not invent padded terms just to match their lengths.
- **C7 Q3**: `Kewangan` is much shorter than other factors. Use a parallel, textbook-accurate expression of the financial factor.
- **C7 Q20**: an unrelated, long `Ujian peringkat kampung` distractor looks different from the three genuine examination stages. Use four comparably structured stage-and-location pairings without introducing an invented examination.
- **C7 Q30**: one scholar-contribution pair is conspicuously shorter. Keep all four combinations similarly formatted.

## Editorial rules for the repair

1. Do **not** impose exact character-count equality. Match the type of answer, grammar, specificity and approximately the same amount of detail. Historical names and dates naturally vary.
2. All four distractors must be plausible *within the same subject domain*, but only one may be fully correct. Avoid absurd anachronisms and sweeping `semua/tiada/sahaja/sentiasa` clues unless the textbook explicitly requires them.
3. The stem and answer key must agree; proofread every incorrect choice so it remains historically wrong. Do not swap answers without remapping `answerIndex`.
4. Keep 30 questions/chapter, existing IDs, per-item difficulty, XP, existing shuffle behavior, and all source-backed explanations. Update any exact-answer regression assertions deliberately.
5. Base knowledge on the KSSM **Buku Teks Sejarah Tingkatan 1**, not internet trivia. Maintain coverage: C1 Mengenali Sejarah; C2 Zaman Air Batu; C3 Zaman Prasejarah; C4 Mengenali Tamadun; C5 Tamadun Awal Dunia; C6 Peningkatan Tamadun Yunani dan Rom; C7 Peningkatan Tamadun India dan China; C8 Tamadun Islam dan Sumbangannya.
6. **No mandatory visuals** for Sejarah objective quizzes. Prefer short, self-contained text. If a source-analysis question truly requires a stimulus, supply the short excerpt within the question text rather than relying on an unseen image.
7. Run chapter-specific tests and production build. Be aware that the older `SejarahF1Chapter7Audit.test.tsx` hash locks may need a careful new baseline when editing other chapters; do not weaken audit assertions to make tests pass.
8. Never publish an untested change directly to `main`; use a reviewable branch/PR.

## Status

Read-only live-bank audit and repair plan. The source content edits must be tested and committed separately. Existing textbook-specific chapter tests provide a useful starting point but are not a substitute for checking the printed text question by question.
