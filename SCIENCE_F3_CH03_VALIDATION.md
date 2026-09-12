# Form 3 Science Chapter 3 — validation report

## A. Live Chapter 3 path

`chapter-3/interactive-bm.ts` / `interactive-dlp.ts` → `science/registration.ts` → `content/registry.ts` → `routes/notes.tsx` → `ScienceF3InteractiveNotesBlock.tsx` → `ScienceF3Chapter3VisualNotesBlock.tsx`.

The live Chapter 3 renderer now imports `chapter-3/approved-notes.ts`. Shared legacy builders and chapter-data were not rebuilt; the chapter renders once, through the existing Chapter 3 branch. Routing, registration and global architecture were not changed.

## B. Files changed in this task

- `src/content/form3/science/chapter-3/approved-notes.ts` — new bilingual source-based teaching content, 18 lessons under five official sections.
- `src/components/notes/ScienceF3Chapter3VisualNotesBlock.tsx` — integrate that content with existing controls and source-based headings; responsive adjustments.
- `src/components/notes/ScienceF3Chapter3LearningVisuals.tsx` — instructional heart, water-pathway, vascular-bundle and evidence diagrams.
- `src/content/form3/science/chapter-3/interactive-bm.ts` — approved diastolic-pressure correction.
- `src/content/form3/science/chapter-3/interactive-dlp.ts` — equivalent diastolic-pressure correction.
- `src/components/notes/ScienceF3Chapter3VisualNotesBlock.test.tsx` — focused registered-render, coverage and parity tests.
- `outputs/science-f3-chapter3-validation/` — local preview, browser-validation script, JSON results and screenshots.
- `SCIENCE_F3_CH03_VALIDATION.md` — this report.

Pre-existing changes elsewhere in the dirty worktree were preserved. No assessment banks, other chapters, backend services or unrelated routes were edited in this task.

## C. Source fidelity

Source: `C:/Users/pcgam/Downloads/bab-3-sains-t3-notes (1).md`, with the user's explicit terminology and pressure corrections.

Qualitative estimate: nearly all substantive, non-disputed teaching coverage is preserved, rather than compressed into generic facts. This is a topic-level assessment, not a measured word-retention percentage. Exceptions and source gaps are listed below. Source citations remain internal and the audit checklist is not learner content.

## D. Coverage

| Section | Status | Coverage |
| --- | --- | --- |
| 3.1 | PASS | Cell requirements and wastes; Amoeba, Euglena and Paramecium; diffusion; surface-area-to-volume reasoning; complex organisms; plant and animal transport importance. |
| 3.2 | PASS | Vertebrate chambers/circuits and crocodile exception; 13 heart structures/functions; vessel comparison and pulmonary exceptions; both complete circulation pathways; pressure and ventricular relaxation; pulse measurement, physical-activity investigation and factors. |
| 3.3 | PASS | Centrifugation, 55/45 proportions, plasma composition; blood-cell structures/functions; ABO antigens/antibodies, agglutination and compatibility; donation importance, supplied eligibility and sodium citrate. |
| 3.4 | PASS within supplied detail | Full water pathway and osmosis; leaf/stomatal structures and guard-cell mechanisms; Pelembakan (Gutasi) and comparison; four factors with experimental reasoning; xylem/phloem structure/functions; leaf/stem/root arrangements; eosin and ringing procedures, observations and conclusions. |
| 3.5 | PARTIAL pending source clarification | Similarities and differences in medium, tubes, pumping, gases and flow retained. Disputed classification/generalisation not presented as a settled fact. |

## E. BM/DLP parity

PASS. Both languages contain the same 18 lessons, matched paragraph counts, five official sections and equivalent instructional controls. DLP prose is a source-faithful adaptation using supplied English terminology; the attachment was not a separate complete DLP manuscript.

## F. Instructional visuals and interactions

- Simple/complex organism comparison and vertebrate circulation selector.
- Labelled four-chamber heart schematic and structure legend; pulmonary/systemic flow selector.
- Artery/vein/capillary comparison and pulse-activity investigation controls.
- Blood separation/components visual and ABO donor/recipient interaction.
- Nine-stage plant water-pathway interaction, including osmosis.
- Stomatal opening/closing and four transpiration-factor controls.
- Xylem/phloem comparison and leaf/stem/root vascular diagrams.
- Eosin and ringing evidence diagrams with investigation text.
- Animal/plant comparison, section answer reveals, optional Science Gallery and completion control.

Existing instructional controls and application shell were retained. The UI/UX skill informed narrow-screen stacking, legibility and keyboard checks; it did not supply academic content or a new visual theme.

## G. Source conflicts and gaps

1. Source 3.5 labels plant vascular transport an “open system.” As requested, that classification is withheld pending human/textbook confirmation rather than taught or replaced with another classification.
2. Source 3.5 generalises complete double circulation to animals, while source 3.2 explicitly distinguishes fish single circulation, amphibian/reptile incomplete double circulation and bird/mammal complete double circulation. The universal claim is withheld; the explicit 3.2 distinctions remain, and the comparison scopes complete double circulation to birds/mammals.
3. The broad 3.5 passive-mechanism wording is not extended to all plant transport. The notes retain the supplied water-transport mechanisms without adding an explanation of phloem energetics.
4. The source gives transpiration factors, trends, reasons and potometer context, but not full individual laboratory procedures or measured datasets for all four factors. The notes provide source-backed variable/trend/conclusion coverage; no experimental data were fabricated.
5. The audit checklist references cardiac-health history material [94] without corresponding teaching detail in the supplied body. The supplied IJN artificial-aorta example is retained as optional enrichment; missing history was not invented.

User-approved corrections implemented: `Pelembaban` → `Pelembakan (Gutasi)` in Notes; diastolic pressure describes ventricular relaxation, not blood flowing into the heart.

## H. Quiz/flashcard/mind-map review

Read-only review of the live generated Chapter 3 quizzes and the shared fact-based flashcard/mind-map inputs. These resources were not rewritten.

Direct terminology/content issues requiring a separate assessment task:

- `sci-f3-c3-set-a-bm-q21` and `sci-f3-c3-set-b-bm-q20` still use `Pelembaban`.
- `sci-f3-c3-set-b-dlp-q4` says mixing occurs in an “atrioventricular chamber”; the source describes the single ventricle.
- `sci-f3-c3-set-b-dlp-q2` uses “absorption” where the source teaches diffusion.
- `sci-f3-c3-set-a-dlp-q15` uses “double-curved disc” rather than biconcave.

Additional quality issues: BM content remains in some DLP explanations; A6 has missing/ambiguous comparison presentation, A16 uses placeholder option labels, DLP A7 contains “compared to adjectives,” and DLP B25 contains raw table/bilingual formatting fragments. These are not silently corrected here.

Coverage checks: existing questions address pulmonary circulation, blood pressure, pulse, guttation, xylem, phloem, ringing and sodium citrate. No dedicated donor-eligibility/donation-importance, full rest/slow-walk/run investigation or eosin-investigation question was identified. Some assessment facts extend beyond this supplied source (for example red-cell lifespan); they were not used to invent additional Notes content. No direct contradiction was identified in the reviewed flashcard/mind-map source facts, although those resources remain more compressed than the rebuilt Notes.

## I. Tests

- Focused Chapter 3 Vitest suite: **4/4 PASS**. Includes actual registered content through the parent renderer, all lesson paragraphs, official headings, parity and source-reference/checklist leakage checks.
- Browser harness: **6/6 PASS**, no detected overflow or browser errors. BM and DLP at **320, 390 and 1280 px**, with reduced motion. Checks cover sections, lessons, selectors, all 16 ABO pairs per scenario, nine water stages, keyboard answer reveals, enrichment and completion. Results and screenshots are in `outputs/science-f3-chapter3-validation/`.
- Browser validation uses the actual chapter component in a local harness, not an authenticated production-route session. Registration/parent routing is covered by the focused rendering tests; unchanged application-level Next/Back and language-switch UI were not independently exercised end-to-end.
- Representative narrow/wide screenshots were visually inspected for heart, donation, vascular and ringing content.
- `git diff --check`: **PASS**, with Git line-ending warnings only.
- TypeScript check: **not globally clean**. It reports the two existing `string | undefined` argument errors in `src/content/form2/science/chapter-7-9-10-visual-integration.test.tsx:291` and `src/content/form2/science/chapter-9/chapter-9-heat-visuals.test.tsx:480`. No Chapter 3 errors were reported. Unrelated failures were not repaired.

## J. Unsourced learner-facing academic content added

**NONE.** New teaching text, DLP adaptations and instructional diagrams derive from the supplied source and explicit task corrections. Interface controls are presentation text, not added scientific claims.

## K. Remaining limitations

The supported Chapter 3 teaching content is implemented and tested. An unqualified declaration of complete source coverage still needs human resolution of the 3.5 classification/generalisation issues and any desired missing laboratory/history detail. Assessment contradictions remain intentionally unchanged pending separate authorization. Production-route authentication/navigation validation has not been performed.

No commit, push or deployment was performed.
