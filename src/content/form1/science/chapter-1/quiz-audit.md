# Chapter 1 quiz audit

## Runtime and scope

The quiz route calls `useContentRegistryStatus` → `getChapterQuizQuestions`. The registry uses `data/content.ts`, which contains a partially remediated Chapter 1 bank (22 Easy, 7 Medium, 1 Hard per language). `data/quizzes.ts`, used by the importer, contains an older all-Easy copy. This audit evaluates the live pairs, and separately checks the stale copy. Chapter 1 will have one owner in `data/quizzes.ts`, reused by `content.ts`; other chapter records stay unchanged.

The route does not persist question-ID answer history; its proposed question_attempts integration is an unimplemented TODO. Existing completion keys and XP accounting remain untouched. IDs and identity metadata are preserved.

## Source basis

Repository-approved `chapter1-canonical.ts`, `chapter1-content.ts`, `chapter1-activities.ts` and `chapter1-cleanup.ts`: textbook pp. 4–38 and DSKP pp. 39–45, plus process skills pp. 10–11. No new textbook-page inspection is claimed. New assessment scenarios/data are authored applications of these supplied concepts, as requested, not verbatim textbook questions or measured experimental results.

The canonical six hazards do not include oxidising; examples are alcohol/petrol, mercury/chlorine. Bell jar is not among the fourteen apparatus. Burette measures volume accurately; pipette measures a fixed volume. The source does not support a blanket 0.1 cm³ accuracy claim for both. DLP uses **Consistency**, BM **Kepersisan**. Floating depends on density relative to the surrounding fluid, not a universal threshold of 1.

## Pair-by-pair decision (before edits)

Each decision includes the BM/DLP pair. Correct options and explanations were checked in both copies; live answer indices identify the intended correct option. The older q28 has the invalid universal floating rule. New pairs retain equivalent option order, answer position and reasoning across languages.

| Pair | Decision | Finding and repair | Final area | Difficulty |
|---|---|---|---|---|
| q1 | KEEP | Sound science definition; preserve live pair. | 1.1 | Easy |
| q2 | KEEP | Clear biology recognition with plausible science-field distractors. | 1.1 | Easy |
| q3 | REWRITE | Extend repeated field recall to career/innovation matching. | 1.1 | Medium |
| q4 | REPLACE | Repeated science-field recall; add displacement plus density reasoning. | 1.5 | Hard |
| q5 | REPLACE | Repeated science-field recall; compare densities and floating. | 1.5 | Hard |
| q6 | REWRITE | Keep explosive hazard concept, use supplied examples/instructions instead of extending hazard mechanism wording. | 1.2 | Easy |
| q7 | REWRITE | Apply flammability knowledge to safe placement, replacing recall and stale acetone. | 1.2 | Medium |
| q8 | REPLACE | Live radioactive-label tautology / stale unsupported oxidising question; assess evidence and honesty. | 1.7 | Hard |
| q9 | REWRITE | Apply corrosive warning to source-backed safety response. | 1.2 | Medium |
| q10 | REPLACE | Repeated hazard recall / stale cyanide; assess responsibility when evidence conflicts with unsafe haste. | 1.7 | Hard |
| q11 | KEEP | Keep live corrected apparatus/function question, removing stale unsupported numerical accuracy claim. | 1.2 | Easy |
| q12 | REPLACE | Live evaporation recall mislabelled Medium / stale Bell Jar; select a suitable fine measuring instrument. | 1.4 | Medium |
| q13 | KEEP | Clear SI length unit. | 1.3 | Easy |
| q14 | REWRITE | Repetitive mass-unit recall becomes SI standardisation application. | 1.3 | Medium |
| q15 | REPLACE | Repeated SI recall and poor Celsius/Fahrenheit symbols; test hypothesis and variables. | 1.6 | Medium |
| q16 | REPLACE | Repeated SI recall with incorrect ohm symbol; evaluate controlled experiment design. | 1.6 | Hard |
| q17 | REWRITE | Apply kilo/milli conversion rather than more prefix recall. | 1.3 | Medium |
| q18 | REPLACE | Mega recall wrongly Medium; displacement calculation fills density coverage. | 1.5 | Medium |
| q19 | REPLACE | Repeated prefix recall; analyse experimental data and conclusion. | 1.6 | Hard |
| q20 | KEEP | Retain one micro-prefix recall, using live corrected µ symbol. | 1.3 | Easy |
| q21 | REWRITE | Replace definition-only comparison and weak distractors with accuracy/consistency data analysis. | 1.4 | Hard |
| q22 | REWRITE | Preserve zero-error concept with four meaningful error descriptions. | 1.4 | Easy |
| q23 | REWRITE | Apply signed zero correction numerically instead of repeating q22. | 1.4 | Medium |
| q24 | REWRITE | Preserve parallax recognition with plausible error causes. | 1.4 | Easy |
| q25 | REPLACE | Duplicate parallax; assess estimation method and instrument sensitivity together. | 1.4 | Hard |
| q26 | KEEP | Correct density definition and explanation. | 1.5 | Easy |
| q27 | CORRECT | Keep live investigation sequence; recall is Easy, not Medium. | 1.6 | Easy |
| q28 | REWRITE | Apply live interpreting-data concept to observation and inference; remove stale floating threshold. | 1.6 | Medium |
| q29 | REWRITE | Replace obvious value recognition with evidence-based group decision. | 1.7 | Hard |
| q30 | KEEP | Keep live source-backed tare-mass/density problem and calculation. | 1.5 | Hard |

Totals: **7 KEEP, 12 REWRITE, 10 REPLACE, 1 CORRECT**. Coverage: **3 / 4 / 4 / 6 / 5 / 5 / 3**. Difficulty: **10 Easy / 10 Medium / 10 Hard** in each language. No notes or flashcards are changed.

## Shuffle contract

Only Science Form 1 regular attempts use a full-pool Fisher–Yates shuffle. Filtering precedes shuffling. Every option set is independently shuffled with its original correct-option index mapped to the new index. Other subjects retain difficulty-tier ordering. The shuffled array stays in existing attempt state; answer, timer, feedback and XP renders do not rebuild it. Existing restart/reset, explicit shuffle, snapshots, quiz keys and completion/XP code retain their responsibilities.
