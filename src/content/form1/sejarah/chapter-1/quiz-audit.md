# Bab 1 — quiz audit and selective repair

Baseline: `76774a9d`. No commit, push, database operation or changes to other chapters.

## Actual live source

`routes/quizzes.tsx` → `useContentRegistryStatus` → `content/registry.ts` → `data/content.ts`. The registry's `sejarahQuizzesFor(1)` derives chapter membership from `sej-f1-c1-qN`. The separate `data/quizzes.ts` copy is older and differs substantially. The request describes that older copy, including two tambo questions and all-Medium metadata.

The live bank has **8 Easy, 16 Medium, 6 Hard**. Preserve each ID's live difficulty, options/answer where kept, and effective identity. Consolidate only Bab 1 into the requested `data/quizzes.ts` owner and let the existing live barrel reuse those same objects. Do not create another bank. The legacy objects omit `chapter`; retain this existing metadata shape, with the same derived Chapter 1 identity.

## Source inspection

Inspected the local `prompts/T1 BT SEJ - SEJARAH.pdf`, relevant printed pp. 4–19 (PDF pages 14–29), including rendered pp. 5 and 10. Checked against the source-backed `sej1-content.ts` and the user's supplied corrections. No changes to notes are necessary.

- p.4: general definition, syajaratun, historia, Kamus Dewan and tambo (riwayat dahulu kala).
- p.5: Herodotus, Carr, Ibn Khaldun, Muhd Yusof Ibrahim; Khoo Kay Kim is also explicitly present. Add the missing core Muhd Yusof Ibrahim view instead of another excavation vocabulary item.
- pp.6–7: chronology, time units, SM/M and political/economic/social themes.
- pp.8–9: source classes, bronze bell and candi examples. Replace the unverified rubbish-pit example with the textbook's candi example; no need for extra archaeology detail.
- p.10: written method's five steps in their printed order.
- p.12: Persediaan → Rakaman temu bual → Memproses rakaman; processing includes checking facts against written sources.
- pp.13–15: scientific archaeological investigation, excavation, terrestrial/underwater methods and laboratory work. The live q18 already has no carbon-dating claim; retain it.
- p.16: Tok Janggut local interpretation concerns burdensome British land/forest-product tax rules; Western interpretation calls the uprising a rebellion. Causes of differing interpretations include source selection, viewpoints, ideology and writing purpose.
- pp.18–19: history's importance, heritage, patriotism, empathy and continuity of harmonious relations, customs and traditions. Source p.19 verified separately before final validation.

New assessment scenarios are applications of these supplied concepts, not claimed as verbatim textbook questions. No unrelated historical facts are introduced.

## Audit of every live pair/record before editing

All thirty live answer indices identify the intended correct choice. All have four options and an explanation, no duplicate stems, no required image and no tambo duplicate. Ratings below reflect the actual live bank, not the stale copy. No difficulty values are recalibrated.

| ID | Decision | Reason | Final area |
|---|---|---|---|
| q1 | KEEP | Clear general meaning, one best answer. | 1.1 |
| q2 | KEEP | Live question assesses the purpose of evidence, not tambo. | 1.4 |
| q3 | KEEP | Useful comparison of conflicting sources; avoids automatically privileging one. | 1.6 |
| q4 | CORRECT | Retain sound Herodotus recognition; align explanation with complete source definition. | 1.2 |
| q5 | KEEP | Correct Carr/facts relationship and answer mapping. | 1.2 |
| q6 | KEEP | Correct Ibn Khaldun view with plausible historian distractors. | 1.2 |
| q7 | REWRITE | Preserve chronology while also assessing the missing distinction between chronological order and themes. | 1.3 |
| q8 | KEEP | Clear alaf/dekad/abad distinction; concise explanation. | 1.3 |
| q9 | KEEP | Correct source framing of Masihi. | 1.3 |
| q10 | KEEP | Correct primary-source characteristics. | 1.4 |
| q11 | KEEP | Bronze bell is the textbook artefact example; contrasting choices useful. | 1.4 |
| q12 | CORRECT | Use verified candi example and textbook non-artefact description instead of unverified rubbish-pit enrichment. | 1.4 |
| q13 | KEEP | Clear secondary-source classification. | 1.4 |
| q14 | REPLACE | Repeats secondary-source recognition; restore one tambo item grounded in p.4. | 1.1 |
| q15 | CORRECT | Keep live written-method scenario; add the accurate five-step sequence to explanation. | 1.5 |
| q16 | KEEP | Appropriate oral-method application and orang sumber concept. | 1.5 |
| q17 | REPLACE | Live conflict-checking item overlaps q3; assess the oral method's three stages through a procedural-error scenario. | 1.5 |
| q18 | KEEP | Live terrestrial archaeology application already concise; no carbon dating. | 1.5 |
| q19 | REPLACE | Excavation vocabulary already covered in q18 explanation; add missing Muhd Yusof Ibrahim view. | 1.2 |
| q20 | KEEP | Accurate meaning of interpretation. | 1.6 |
| q21 | KEEP | Useful written-source verification/order reasoning, consistent with q15. | 1.5 |
| q22 | REPLACE | Live oral preparation repeats q16/q17 coverage; restore accurate Tok Janggut interpretation comparison. | 1.6 |
| q23 | KEEP | Application of lessons from the past. | 1.7 |
| q24 | KEEP | Correct patriotism concept; no misleading equivalence with chauvinism. | 1.7 |
| q25 | CORRECT | Keep question/options; explain continuity of harmonious relations, customs and traditions. | 1.7 |
| q26 | KEEP | Tests objective reassessment when evidence changes, distinct from q3's source choice. | 1.6 |
| q27 | KEEP | Self-contained primary-source scenario. | 1.4 |
| q28 | KEEP | Live heritage-preservation question is strong and is not a tambo duplicate. | 1.7 |
| q29 | KEEP | Syajaratun links to ancestry rather than duplicating general definition. | 1.1 |
| q30 | KEEP | Live historical-empathy scenario is specific and source-aligned; old vague KPS question is not live. | 1.7 |

**21 kept, 1 rewritten, 4 corrected, 4 replaced.** Coverage: **1.1: 3; 1.2: 4; 1.3: 3; 1.4: 6; 1.5: 5; 1.6: 4; 1.7: 5.** The final area slightly exceeds the guide to preserve useful heritage and empathy questions rather than rewriting merely for a quota.

## Known-item resolution

Old q2/q28 duplicate: neither is live. Preserve both stronger live items; there is exactly one final tambo question, q14. Old q15's incorrect order is eliminated by removing the stale copy; live q15 keeps its application stem and gains the complete correct sequence. q17 tests the three oral stages. q18 keeps the already-clean live version. q22 restores the accurate tax-rules/rebellion comparison and asks why interpretations differ. q25 explanation is source-aligned. q30 retains the stronger live empathy question.

## Runtime, XP and shuffling

Sejarah ignores the difficulty picker and submits one `difficulty-all` completion key. It nevertheless retains real per-question difficulty values for XP. Changing to thirty Medium would change XP, so neither metadata nor the economy/catalog/migrations are modified.

Before and after: the existing helper shuffles every question **within Easy/Medium/Hard groups**, then shuffles options with a remapped answer index. Because the live bank has mixed difficulties, this is not a uniform whole-pool permutation. No shuffle code change is made under the instruction to preserve existing Sejarah behavior. Attempt order lives in state; a new attempt/explicit shuffle regenerates it. Snapshot helpers remain unchanged.

## Validation

- 122 tests passed across the dedicated audit (42), routing integrity (13), quiz counts (4), difficulty/shuffle (29), Sejarah registry categories (6), Form 3 Sejarah regressions (17), route loading/error states (9) and interactive Retry (2).
- Production build passed.
- Typecheck reports only the existing `string | undefined` argument errors in Form 2 Science's `chapter-7-9-10-visual-integration.test.tsx:305` and `chapter-9/chapter-9-heat-visuals.test.tsx:523`; neither file changed.
- New test and `content.ts` pass targeted ESLint. `quizzes.ts` has exactly the same 159 pre-existing lint errors as HEAD, with no new diagnostics; unrelated formatting was not changed.
- Compared all non-Bab-1 inline records before/after: 3,045 in `content.ts` and 750 in `quizzes.ts` unchanged. Dedicated SHA-256 checks lock both files' Chapters 2–8 records.
- Lifecycle tests guard the actual route's state/start/reset dependencies and exercise saved-order restoration; no browser-based full-attempt claim is made.
- No commits, pushes, database updates or migration edits.
