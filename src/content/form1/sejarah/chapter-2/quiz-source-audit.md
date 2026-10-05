# Sejarah Form 1 Bab 2 quiz audit and selective repair

## Scope and source

Audited all 30 **live** questions against `prompts/T1 BT SEJ - SEJARAH.pdf`, printed pp. 24–39 (PDF pp. 34–49). Extracted the chapter text and visually inspected printed pp. 30, 31, 37 and 38 to check the epoch dates, terminology, radiation explanation and Sunda geography. No external geology dates or speculative extinction mechanism was substituted for the course textbook.

Baseline: `0002a5dd`. No Notes, flashcards, mind maps, shared shuffle engine, routing, XP or progress code is changed.

### Actual source ownership

The route reads the registry, which imports `quizzes` from `src/data/content.ts`. That live Chapter 2 bank differed substantially from the older `src/data/quizzes.ts` importer bank described in the request. For example, live q9 already identified Holosen but omitted its start date; only the importer copy said 11,700. Live q27 listed four oceans without asking explicitly for five; the importer actually asked for four.

The repair uses the stronger live bank as the audit baseline, preserves its eight Easy / sixteen Medium / six Hard IDs, and places the selectively repaired records in `quizzes.ts`. The live barrel now spreads `sejarahF1Chapter2Quizzes` from that same owner. There is no second Chapter 2 bank. Raw records continue to omit an explicit `chapter` field; the existing ID resolver and registry select Chapter 2 correctly. All 30 IDs, subject and form remain unchanged.

## Q1–Q30 decisions

KEEP means the entire live record is unchanged. CORRECT means a factual, source-scope or terminology correction within the existing concept. REWRITE retains the conceptual focus while improving its question/choices. REPLACE reallocates a weak, repeated or enrichment slot to a missing textbook concept. Classification is against the live baseline, not the obsolete importer.

| Q | Decision | Finding and selective action | Printed source |
|---|---|---|---|
| 1 | REWRITE | General research question had weak unsupported/guesswork alternatives. Focus its research context on geology; choices are four disciplines. | 26 |
| 2 | KEEP | Paleontology, fossils, answer and comparable disciplinary distractors are sound. | 26 |
| 3 | REPLACE | Generic value-of-timeline item overlaps q4; recover the missing Earth-age concept with **melebihi 4.6 bilion tahun**. | 27 |
| 4 | KEEP | Correct four-stage chronology; parallel permutations and no invented mnemonic. | 30–32 |
| 5 | KEEP | Miosen mountain formation and 23–5 million-year explanation match source. | 30 |
| 6 | KEEP | Low sea level connects land; valid concise choices. | 34 |
| 7 | CORRECT | Keep stem/options; replace forced animal-migration explanation with the actual cooling/drying → grassland/savanna explanation. | 30 |
| 8 | REWRITE | Retain submerged-land-route reasoning, explicitly situate it in Pentas Sunda; use four parallel route outcomes and omit unsupported sea-travel extension. | 38–39 |
| 9 | CORRECT | Keep the sound live Holosen identification; add **10,000 tahun dahulu hingga kini**. Eliminate obsolete importer's 11,700. | 31 |
| 10 | REPLACE | Melting/lake item repeated q19; add the missing Pliosen period. | 30 |
| 11 | REPLACE | Replace biological heat-loss enrichment with source Pleistosen dates; explanation also retains eleven glacial occurrences and making fire. | 31 |
| 12 | REPLACE | Repeated extinction/food mechanism lacked direct source support. Recover Holosen's kuneiform development without the obsolete “Hieroglif Rom” distractor. | 31 |
| 13 | CORRECT | Preserve nomadic hunting choices; tie stem to cold lowlands and explanation to the source, avoiding generalising to agricultural Holosen. | 34 |
| 14 | CORRECT | Remove extra tundra classification; use source **rumput dan tumbuhan renek yang menjalar** with parallel plant choices. | 35 |
| 15 | KEEP | Self-contained inference from extensive past ice to colder climate; no unseen figure required. | 30, 35 |
| 16 | KEEP | Valid land-ice/sea-level reasoning and four comparable paired outcomes. Does not claim floating sea ice alone lowered sea level. | 34; inference in stated scenario |
| 17 | REPLACE | Move the good live definition to q26; explicitly test **pengglasieran** as used in Bab 2, with the user's requested source-qualified stem. | 30, 34 |
| 18 | REWRITE | Retain sea-level-change focus; specify the general **100 m** statement, and distinguish regional **100–120 m** in the explanation. | 36, 38 |
| 19 | KEEP | Meltwater filling low areas and forming freshwater lakes is sound; alternatives remain comparable physical processes. | 35–36 |
| 20 | REPLACE | Remove speculative food/adaptation mechanism; identify the source's extinct mamot, sloth and harimau bertaring with comparable animal lists. | 36 |
| 21 | REPLACE | Temperature/ice/sea sequence repeated q18; restore Africa → Europe/Asia migration and its less-extreme-cold relationship. | 37 |
| 22 | KEEP | Correct concise Pentas Sunda definition and answer. | 38 |
| 23 | REWRITE | Replace distant regional distractors with comparable three-island sets; only **Sumatera, Jawa, Borneo** is fully supported. Explanation names precise mainland regions, without overlapping modern-country labels. | 38 |
| 24 | REPLACE | Generic map-comparison item gave little specific coverage. Test the submerged-lowland outcomes **Selat Melaka, Teluk Siam, Laut Jawa**, without claiming every island has one origin. | 39 |
| 25 | REPLACE | Live Panama inference was valid but an extra land-bridge item; reallocate to missing Sunda cultural relationships, keeping the inference format. Do not imply all Southeast Asian cultures are identical. | 38 |
| 26 | REPLACE | Broad end-of-Ice-Age dating was less secure across the textbook's overlapping terminology. Preserve the existing sound live q17 definition here verbatim (stem, options, answer and explanation), retaining q26 difficulty. | 30 |
| 27 | CORRECT | Teach **five** oceans. Every option has five comparable names; correct includes Pasifik, Atlantik, Hindi, Selatan, Artik. | 29 |
| 28 | CORRECT | Keep seven-continent question/answer; use **Oceania** exactly as mapped, removing the added Australia synonym. | 29 |
| 29 | REPLACE | Generic habitat/settlement inference repeated migration. Recover **kegiatan radiasi bumi**; do not make modern open burning the historical cause. | 37 |
| 30 | REWRITE | Preserve civic/environment focus and explanation. Replace repeated “tanpa penilaian” cues with comparable real land-use choices. | 29, 35, 37, 39 |

Totals: **8 KEEP, 5 REWRITE, 6 CORRECT, 11 REPLACE**. The eight KEEP records are q2, q4, q5, q6, q15, q16, q19 and q22. The source-aligned live q17 question is also retained as q26 rather than discarded.

## Coverage

Primary assignment (no double counting):

| Section | Questions | Count |
|---|---|---:|
| 2.1 Dunia Kita | 1, 2, 3, 27, 28 | 5 |
| 2.2 Zaman Air Batu | 5, 7, 12, 17, 26 | 5 |
| 2.3 Garis Masa Zaman Air Batu | 4, 9, 10, 11 | 4 |
| 2.4 Ciri-ciri Zaman Air Batu Akhir | 6, 13, 14, 15, 16 | 5 |
| 2.5 Perubahan Zaman Air Batu Akhir | 18, 19, 20, 21, 29 | 5 |
| 2.6 Kesan Perubahan Zaman Air Batu di Asia Tenggara | 8, 22, 23, 24, 25, 30 | 6 |

Q30 is a cross-chapter civic outcome assigned to 2.6 for this blueprint. Dates in 2.3 also draw on the detailed 2.2 epoch descriptions. No artificial quota required duplicate questions.

## Source qualifications

- The overview timeline on p. 32 uses rounded Pliosen labels (5–2 million); p. 30's detailed description says 5.3–2.6 million. The user explicitly requested the detailed textbook values. Q10 names the **penerangan tahap** context; no silent modern-date substitution.
- The textbook uses **pengglasieran** for melting. Q17 explicitly says “Menurut penerangan Bab 2”; this records the edition's terminology, not a universal geology definition.
- General p. 36 wording is “perubahan paras air laut dengan kedalaman 100 meter”; regional p. 38 describes a rise of 100–120 metres. Q18 preserves that distinction rather than inventing precision or conflating scales.
- The textbook names extinct animals but does not establish the former quiz's single-cause or food-supply mechanism. That mechanism is removed.
- The retained q16 is a scenario-based inference with land ice explicitly stated, not a quotation of a textbook mechanism. It avoids the stale importer's misleading floating-sea-ice explanation.
- The rewritten stems, distractors and application wording are authored quiz assessment text, not presented as verbatim textbook quotations. No new historical/geological fact is asserted as a textbook fact. Notes remain untouched even where the audit exposes terminology needing care.

## Option quality

All 30 option sets reviewed. **18 sets changed** (q1, 3, 8, 10, 11, 12, 14, 17, 18, 20, 21, 23, 24, 25, 26, 27, 29, 30); q26 reuses the already sound q17 set.

**12 sets deliberately rebalanced into comparable lengths/structures** while repairing their content: q3, 8, 10, 11, 14, 17, 20, 23, 24, 25, 27, 30. This is an editorial intervention count, not a claim that all twelve previously failed a numerical threshold. **17 sets received revised parallel/plausible distractors**; q26 is excluded because its choices were simply retained from another live slot.

No meaningless padding or “all of the above.” Every five-ocean choice contains five names; region lists have equal item counts; date alternatives are all date ranges. Correct-choice length divided by the other choices' median ranges from approximately **0.78 to 1.42**. This supports, but does not replace, the manual review: no routine correct-answer length cue remains. Tests use a generous 0.5–1.75 guard to avoid brittle equal-length requirements.

## Shuffle and regression protection

No shuffle-engine change. The current Sejarah contract shuffles within Easy → Medium → Hard blocks, not uniformly across all thirty. Preserve that existing behavior and combined completion identity. Questions/options vary with a new permutation; option shuffling preserves the correct answer text after answerIndex remapping. Saved attempt order restores unchanged. Existing route lifecycle tests cover state-held order, explicit restart/reshuffle and no reshuffle on answering; this is automated coverage, not a claim of a new manual browser session.

The former Chapter 1 test locked deferred Chapters 2–8. Release only the now-authorized Chapter 2 from that lock; baseline hashes for Chapters **3–8** were computed before edits. A new stronger test locks **every other inline record** in both data files, including Chapter 1 and other subjects, against pre-edit hashes. No other chapter data was rebaselined or changed.

## Validation results

- Nine targeted suites: **163 tests passed**, including 41 new Bab 2 tests, 42 Bab 1 tests, Sejarah routing/category/count checks, Form 3 integrity, shuffle and route-state interaction tests.
- Production build: **passed**.
- TypeScript: reports only the two pre-existing TS2345 errors in unchanged Form 2 Science tests: `chapter-7-9-10-visual-integration.test.tsx:305` and `chapter-9/chapter-9-heat-visuals.test.tsx:523` (`string | undefined` passed to `string`). No Chapter 2 errors; unrelated failures left untouched.
- Targeted ESLint: new test, existing Bab 1 test and `content.ts` clean. `quizzes.ts` has 159 pre-existing formatting findings before and after; zero new findings, comparing rule/message multisets against HEAD.
- `git diff --check`: passed.
- Direct baseline comparison confirms all eight KEEP records and every per-ID difficulty unchanged. Removing only the authorized Chapter 2 record blocks and owner wiring leaves all remaining source text identical in both data files (ignoring empty lines).
- Existing React `act(...)` environment warnings remain in the passing route-state interaction suite. No manual browser attempt was performed for this audit.
- No commit or push performed.

