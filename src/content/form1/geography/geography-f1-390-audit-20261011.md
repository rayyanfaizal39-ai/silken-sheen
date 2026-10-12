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

## Follow-up audit and corrections — 12 October 2026

A second, manual pass targeted five question-level flaws flagged after the 13 initial repairs. Four additional live records were changed plus a second revision to C13 Q30, for **17 distinct changed questions compared with the base `main` bank**.

| Live question | Verified flaw | Final revision |
|---|---|---|
| `geo-f1-c2-q28` | The correct position of the post office could not be deduced without the omitted Pekan Indah diagram. | Makes the mosque's position *between* school and post office explicit, and places the school to its left, so the post office on its right follows logically. |
| `geo-f1-c7-q17` | The KSSM textbook names Pelagus, but this is unsuitable as an unqualified **operating** hydropower example. | Uses verified operating Bakun (Sarawak) and Kenering (Perak) while retaining the syllabus concept of hydroelectric generation. |
| `geo-f1-c10-q4` | Alps/Andes/Rocky were conspicuously out of the regional knowledge domain. | All four options now name real ranges referenced in the Southeast Asian highlands lesson: Annam, Bilauktaung, Himalaya, Crocker. |
| `geo-f1-c10-q19` | "Bilauktaung terletak di Thailand" describes the textbook country-pairing without acknowledging a cross-border range. | Stem expressly asks for **the textbook pairing** and explanation notes the Myanmar–Thailand border geography. |
| `geo-f1-c13-q30` | The question stem virtually spelled out the complete three-part correct plan; other options had shorter, incomplete plans. | The stem now describes a realistic multi-cause residential scenario; four similarly structured, plausible response plans require evaluating coverage of the underlying causes. |

### Textbook and independent source checkpoints
- KSSM Geografi Tingkatan 1, textbook page **15**, diagram *Pekan Indah*, is the source of the original Q28 position, but no accompanying diagram was displayed in the quiz: https://fliphtml5.com/faksy/vlbd/Buku_Teks_Geografi_Tingkatan_1_KSSM/26/
- KSSM textbook page **80**, 7.3 *Kepentingan Sungai dan Tasik*, explicitly calls out **Empangan Pelagus** and **Empangan Kenering**: https://fliphtml5.com/kitdt/pmya/BUKU_TEKS_GEOGRAFI_TINGKATAN_1/90/ . The revised quiz deliberately substitutes a verified operational project instead of claiming the original example was absent from the textbook.
- Sarawak Energy, 28 Aug 2026, identifies **Bakun** as an operating hydropower plant: https://www.sarawakenergy.com/media-info/media-releases/2026/reliable-electricity-supply-maintained-as-dry-weather-continues
- Tenaga Nasional confirms **Kenering** among its Sungai Perak hydropower stations: https://www.tnb.com.my/sustainability/esg-stories-tnb-sungai-perak-hydropower-cascade
- KSSM textbook page **113**, 10.2 *Bentuk Muka Bumi*, pairs Banjaran Annam with Vietnam and Bilauktaung with Thailand: https://fliphtml5.com/faksy/vlbd/Buku_Teks_Geografi_Tingkatan_1_KSSM/124/ . Myanmar's official geography description confirms Bilauktaung extends along the Myanmar–Thailand boundary: https://myanmar.gov.mm/en/geography .

### Revised static safety check after both passes
Compared by extracting all **390 live source records** from `src/data/content.ts` on original `main` vs this PR:
- 390/390 IDs, chapter counts, answer texts, answer indices and difficulty tiers **unchanged**; no duplicate options/IDs.
- **17 distinct live questions changed**; no other questions altered.
- Correct answers strictly longest **93 → 89 / 390**; disproportionate longest (>1.25×) remained at three proper-name/category cases; sweeping-word wrong choices **20 → 9**.
- Existing per-chapter tests and global regression assertions were updated to pin the five fixes.
- **Vitest, build and actual mobile rendering have not been run from this GitHub-only editing session.** Re-run `npx vitest run src/content/form1/geography` and `npm run build` before approval or merge. Do not claim automated tests passed.

### Visual policy
**Yes, selective visuals are appropriate for Geography.** Prioritize legible vector maps and diagrams where the geography skill itself is visual (bearings, coordinates, peta lakar, river landforms, population density). The five corrections above are complete without adding images. Prefer embedded crisp SVG with readable Malay labels, mobile zoom and accessible text alternatives. Never require a missing diagram, never make a conventional memorization question harder by adding a decorative visual, and never change an answer key only to accommodate a picture. Introduce visuals in a separate reviewed PR after these textual fixes pass.
