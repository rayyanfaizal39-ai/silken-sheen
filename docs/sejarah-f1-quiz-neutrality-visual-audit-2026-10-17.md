# Sejarah Form 1 — option neutrality and visual audit (17 October 2026)

## Scope and source-of-truth

- **240 live MCQs**, Chapters 1–8, 30 per chapter, BM quiz bank.
- Chapters 1–3: canonical exports from `src/data/quizzes.ts` used by `src/data/content.ts`.
- Chapters 4–6 and 8: inline live quiz records in `src/data/content.ts`.
- Chapter 7: the shared `sej7Quizzes` bank in `src/content/form1/sejarah/chapter-7/sej7-revision.ts`.
- The live registry `getChapterQuizQuestions` is the audit entry point; stale parallel content was not edited.
- Reference content: source-verified chapter notes and existing chapter-level Sejarah quiz tests. The KSSM textbook is the intended content authority; this pass focused on question-option quality and teaching diagrams, not a new exhaustive historical re-verification.

## Answer-option changes

**Nine targeted items repaired**, with the correct historical concept, question ID, original answerIndex and difficulty retained:
- Bab 1 q19: length-balanced historian-name distractors; q22: less conspicuously short distractor.
- Bab 5 q3: comparable place/function names; q10: clarify correct answer as `Raja Mesir` (same entity); q22/q26: shorter historically distinct civilization distractor labels (`Mesir`, `Sumer`, `Huang He`).
- Bab 6 q18: shorten `Tembok pertahanan` to `Tembok kota`.
- Bab 7 q3: four plausible expansion-factor labels of closer lengths; q20: shorten a nonofficial exam-stage distractor to `Ujian desa`.

Avoid mechanically forcing exact character equality: it produces awkward Malay or dubious historical alternatives. The guardrail uses **0.65–1.50** for correct-option length against the mean of three distractor lengths; exact slot order is still shuffled at runtime. The source audit on main identified **9 severe outliers** under that rule: 2 Bab 1, 4 Bab 5, 1 Bab 6, 2 Bab 7.

## Visual design — seven separate SVG diagrams

| Live question | Supplementary diagram | Why it helps |
| --- | --- | --- |
| Bab 1 q21 | Original document and magnifier | Historical-source review |
| Bab 2 q16 | Glacial landscape | Sea level / land reasoning |
| Bab 3 q10 | Four archaeological finds | Classification of materials |
| Bab 4 q9 | Canal and farm | Irrigation and agricultural yield |
| Bab 5 q14 | Indus drains | Interpreting urban design |
| Bab 6 q15 | Roman amphitheatre plan | Reasoning from architectural layout |
| Bab 8 q15 | Unlabelled mosque interior | Identifying functional architectural features |

Diagrams provide optional context, never the only source of facts. SVGs are inert local files, viewBox 640 × 320, without scripts or foreign objects. Alt descriptions deliberately describe the **stimulus, not the answer**. The mosque drawing does not portray the Prophet or other human figures.

Images resolve **in the quiz view only**, not the quiz bank or registry: IDs, stored options, XP, progress and answer shuffling remain canonical. Both fullscreen and alternative quiz layouts use the same mapping. Chapter 7 was not given a diagram: a labelled examination timeline would reveal the correct answer on its sequence MCQs.

## QA follow-up

- Live GitHub Actions were added to run all Sejarah Form 1 regression tests and the production build; initial checks identified stale historical regression assertions, which were updated to the current quiz route contract. Full results depend on the latest run.
- Re-rendered three SVG illustrations with CairoSVG for direct visual inspection. The archaeology illustration was refined from an ambiguous leaf/cluster shape to a recognisable seashell and pollen grains, matching its accessible description and the textbook context. This is **SVG render QA**, not a signed-in desktop or mobile browser session.
- Cloudflare Pages is the actual deployment target; a separate Vercel check may still report failure and requires Vercel-specific logs to diagnose.

## Release gates — not yet signed off

- Added focused Vitest coverage for all 240 live records, length-ratio guard, distinct options, chapter identity, image file presence and accessibility descriptions.
- **No actual npm test, lint, TypeScript, production build or rendered-browser QA was executed in this connector session.** These remain required before merge/deploy.
- Check mobile at 320px and 360px, desktop, alt text, diagrams' factual ambiguity and colour contrast. Evaluate option wording against the printed textbook, especially the shorter civilization distractor labels.
- Leave this as a separate **draft PR**, independent of Science PR #74; **no merge or production deployment**.
