# Geografi Tingkatan 1 — 390-question quiz quality audit (11 October 2026)

## Scope and live ownership
AcadeMY has **13 regular Geografi Tingkatan 1 quiz chapters**, each containing **30 live questions** (390 in total). The live source is `src/data/content.ts`, consumed by the content registry and student quiz route. `src/data/quizzes.ts` has older duplicated records and must **not** be edited in place of the live bank.

The KSSM textbook's chapter outline was cross-checked against a digital reproduction of the 2016 KPM edition (ISBN 978-967-0483-48-1): https://fliphtml5.com/fjqjq/oxwq/Buku_Teks_Geografi-Tingkatan-1/ . It has 13 content chapters followed by **Bab 14: Panduan Kerja Lapangan**. The absence of a conventional 30-question Bab 14 is not automatically an omission: fieldwork should be judged as an assignment/project workflow.

**Scope honesty:** This is a live-bank integrity and question-quality screen with selective manual repairs. It does **not** claim that every sentence of all 390 answers has been verified against every printed textbook page. Existing chapter-by-chapter tests in `src/content/form1/geography/chapter-{1..13}/chapter-*-quiz.test.ts` contain more detailed textbook-specific pins and mapping; those tests should be rerun before merging.

## Existing chapter bank inventory
| Bab | Topic | Live questions | Correct choice strictly longest (after repair) | Absolute-word wrong choices (after) |
|---:|---|---:|---:|---:|
| 1 | Arah | 30 | 1 | 0 |
| 2 | Kedudukan | 30 | 10 | 0 |
| 3 | Peta Lakar | 30 | 7 | 0 |
| 4 | Lakaran Peta Malaysia | 30 | 8 | 1 |
| 5 | Bumi | 30 | 5 | 0 |
| 6 | Bentuk Muka Bumi | 30 | 5 | 0 |
| 7 | Saliran | 30 | 9 | 4 |
| 8 | Penduduk di Malaysia | 30 | 6 | 0 |
| 9 | Petempatan di Malaysia | 30 | 7 | 0 |
| 10 | Bentuk Muka Bumi dan Saliran di Asia Tenggara | 30 | 7 | 0 |
| 11 | Penduduk dan Petempatan di Asia Tenggara | 30 | 7 | 4 |
| 12 | Sumber Air | 30 | 10 | 0 |
| 13 | Sisa Domestik | 30 | 8 | 0 |
| **Total** | | **390** | **90** | **9** |

### Quantified answer-pattern results
Source-based option-length screening is a *warning*, not proof of answer quality.

| Metric | Before | After |
|---|---:|---:|
| Correct choice strictly longest | 93/390 (23.8%) | 90/390 (23.1%) |
| Correct choice >1.25× every other option | 3 | 3 |
| Correct choice conspicuously shortest (>1.6× gap) | 4 | 4 |
| Wrong options containing `semua/tiada/sahaja/sentiasa/hanya` | 20 | 9 |
| Changed questions | – | 13 |

The seven remaining *extreme length gap* cases are mostly **intrinsically different proper names or curriculum category labels**, not prose verbosity: C2 q7 Khatulistiwa, C3 q17 saliran, C4 q2 Laut China Selatan, C5 q29 tsunami, C6 q15 pelabuhan, C8 q18 faktor dasar kerajaan and C10 q3 Laos. Do not invent padding or falsify place names to make them identical length. The wrong options that retain `sahaja/hanya` in C4/C7/C11 often compare which labels are incorrect or which service is exclusive; review them semantically before any replacement.

## 13 selective question repairs — exact IDs
- **C1 q23:** Replace a blanket `sentiasa` claim about a compass needle.
- **C2 q21:** Replace nonsensical one-word distractors with parallel location methods and repair the dangling `...?` stem; preserve the correct latitud–longitud intersection.
- **C3 q11:** Remove `sahaja` from a physical-landscape symbol distractor.
- **C3 q29:** Remove the misleading `sahaja` from the incorrect point-symbol/petunjuk choice without changing the correct area-symbol-and-legend answer.
- **C5 q7:** Make the hydrosphere distractor more plausible and in-domain.
- **C6 q24:** Rebalance freshwater utility distractors around the correct domestic-and-industrial supply answer.
- **C8 q2:** Replace the `semua negeri` shortcut with a concise, plausible but incorrect uniform-distribution distractor.
- **C8 q24:** Remove unsupported `sahaja` absolutes in one factor-comparison distractor.
- **C9 q4:** Replace an `sahaja` urban/rural option with a meaningful competing description.
- **C11 q1:** Replace sweeping uniform-population language.
- **C11 q17:** Compare regional locations in parallel without changing textbook-based density categories.
- **C11 q25:** Remove `sahaja` from the Bangkok/Singapore function comparison.
- **C13 q30:** Replace three obvious/bad solid-waste 'solutions' with partial but real-world-plausible alternatives; the updated stem asks for the **most complete combined** reduction, awareness and enforcement plan.

Only the live `src/data/content.ts` question blocks above were edited. An independent before/after check verified:
- 390 identical IDs and chapter assignments, no duplicate IDs/options.
- 390 identical correct-answer texts and `answerIndex` values.
- 390 identical per-question difficulties and explanations.
- Question content elsewhere, XP/shuffle code, student records and outdated source copies unchanged.

## Visual recommendation — different from Sejarah
Do **not** make every quiz visual-heavy, but Geography requires spatial understanding. Existing live banks are intentionally self-contained and do not require unseen images; keep that protection. Proposed follow-up (separate PR after answer-quality release):

1. **Bab 1–2:** clearly labelled compass and latitud/longitud examples for selected bearing/coordinate items.
2. **Bab 3–4:** textbook-consistent peta lakar symbols and outline maps for map-reading tasks.
3. **Bab 6–7:** river-stage cross-sections or landform diagrams only where understanding shape matters.
4. **Bab 8–11:** clean population-distribution maps or small density tables only when the visual adds assessment value.
5. **Bab 12–13:** diagrams optional; most items work well as text-based cause → effect → mitigation reasoning.

Never write `berdasarkan rajah di atas` without actually rendering the referenced visual; no unlabeled or low-resolution image should be a prerequisite to answer correctly.

## Release gates and outstanding work
A cross-chapter regression test `geography-f1-390-bank-quality.test.ts` has been added to guard the student-facing 390-question registry, four distinct options, unique IDs, answer text, and answer-cue quality. The source was statically checked for consistency, **but Vitest and the Vite production build have not been executed in this GitHub-only session**. Merge only after running the thirteen existing chapter suites plus the new global suite, and inspect the edited C2 q21 and C13 q30 on a small mobile viewport.

No Supabase migration or XP adjustment is needed. This PR is unrelated to the still-unmerged Sejarah Form 1 PR #59.
