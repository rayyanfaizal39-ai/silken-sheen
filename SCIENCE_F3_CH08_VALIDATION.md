# Form 3 Science Chapter 8 — final textbook patch

Validated locally on 10 September 2026, BM and DLP. This report supersedes the earlier Chapter 8 report, including its obsolete UV classification. No deployment, commit or push.

## A. Exact live Chapter 8 render path

All paths are relative to `C:/Users/pcgam/silken-sheen`.

`src/content/registry.ts` → `src/content/form3/science/registration.ts` → `src/routes/notes.tsx` → `src/components/notes/ScienceF3InteractiveNotesBlock.tsx` (Chapter 8 branch) → **`src/components/notes/ScienceF3Chapter8VisualNotesBlock.tsx`**.

The registered interactive data comes from `src/content/form3/science/chapter-8/interactive.ts`, projected into BM/DLP by `src/content/form3/science/project-bilingual.ts`. The actual renderer combines its local presentation copy with `chapter-8/chapter8-content.ts`, the projected content, and `src/components/notes/ScienceF3Chapter8LearningVisuals.tsx`.

The `chapter-8/notes-bm.ts` / `notes-dlp.ts` and `flashcards-bm.ts` / `flashcards-dlp.ts` wrappers call `resource-builders.ts`. Those builders resolve Chapter 8 through `chapter-data.ts`, whose Chapter 8 entry points to `chapter-8/chapter8-content.ts`. The mind map also reads that source through `mindmap-builder.ts`. The custom interactive renderer takes precedence over the generated Notes on the learner page.

The live quiz path is `registration.ts` → `master-quizzes.generated.ts` → `getScienceF3MasterQuizzes(8, language)`. Its Chapter 8 authoring source is `outputs/science-form3-ch7-10-quizzes/science-f3-ch7-10-normalized.json`, processed by `scripts/generate-science-f3-runtime-quizzes.mjs`. The Chapter 8 quiz wrappers are not the registered live quiz bank.

## B. Files changed in this final patch

- `src/content/form3/science/chapter-8/chapter8-content.ts`
- `src/content/form3/science/chapter-8/interactive.ts`
- `src/components/notes/ScienceF3Chapter8VisualNotesBlock.tsx`
- `src/components/notes/ScienceF3Chapter8VisualNotesBlock.test.tsx`
- `src/content/form3/science/chapter-8/chapter8-remediation.test.ts`
- `outputs/science-form3-ch7-10-quizzes/science-f3-ch7-10-normalized.json` — Chapter 8 A16/B13 classification and A21 BM terminology only in this pass
- `src/content/form3/science/master-quizzes.generated.ts` — regenerated
- `outputs/science-f3-chapter8-validation/browser-check.mjs`
- This report, the refreshed `browser-results.json`, screenshots in `outputs/science-f3-chapter8-validation/`, and the local ignored `chapter8-typecheck.log`.

Existing diagrams, calculator implementation, routing and resource builders were reused. Chapter 8 was patched rather than rewritten. Pre-existing Chapter 4 work remains untouched. All other chapters' quiz source rows and generated banks were compared with their original versions and are unchanged.

## C. UV classification corrected: YES

The visible spectrum, definition cards, projected interactive content, Notes, Flashcards, Mind Map and live quiz bank now follow the supplied Figure 8.9 classification:

- **Sinaran tidak mengion / Non-ionising:** very low frequency waves, radio waves, microwaves, infrared and visible light.
- **Sinaran mengion / Ionising:** ultraviolet, X-rays and gamma rays.
- Alpha and beta remain explicitly taught as ionising radioactive radiations.

Live quiz A16/B13 now select “Ultraungu, sinar-X dan sinar gama” / “Ultraviolet, X-rays and gamma rays,” with matching explanations. The previous assertions that excluded UV from the ionising list have been replaced by regression assertions for the final classification.

## D. BM textbook terminology: PASS

Primary title: **Sinaran Mengion dan Sinaran Tidak Mengion**. Chapter 8 wording now uses **sinar gama**, **lencana sinaran**, **dos sinaran**, **bekuan darah**, and **sinaran latar belakang**. BM element names precede isotope codes in the expanded examples and uses. Replacements were confined to Chapter 8 data and its renderer.

## E. Atomic structure visual: PASS

The existing chapter-local SVG visibly shows the nucleus, protons, neutrons and surrounding electrons, with charge labels and accurate counts for each selected state. The neutral Na-23 example states **bilangan proton = bilangan elektron: 11 = 11**, identifies the atom as neutral and its nucleus as stable. It retains the scientifically useful distinction between charge neutrality and nuclear stability.

Na⁺ and Cl⁻ examples and their interactive electron counts remain intact: 11 electrons for neutral Na, 10 for Na⁺, 18 for Cl⁻. No external image was generated.

## F. Alpha-beta-gamma comparison: PASS

One selectable learner-facing block communicates nature, charge, relative size, ionising power, penetration, electric-field deflection and magnetic-field deflection. Its CSS/SVG diagrams were retained.

The electric diagram labels the negative plate above and positive plate below: alpha bends towards the negative plate, beta more strongly towards the positive plate, and gamma travels straight. The magnetic diagram states the field orientation. Reversing that orientation reverses alpha and beta paths; gamma remains straight.

## G. Risk management: PASS

Both languages now teach actual exposure-to-action guidance:

- Background radiation → suitable protective equipment, including anti-ultraviolet protection.
- X-ray photographs → doctor's prescription/instructions.
- Television → viewing distance **at least 2 m**.
- Food contaminated with radioactive materials → do not eat food from contaminated areas.
- Cosmic radiation → limit aviation personnel's working hours.

The dose–risk relationship and altitude explanation remain visible. These controls are rendered separately from handling/storage/waste safety.

## H. 8.4 textbook uses: PASS

The actual selectable agriculture and medicine cards now render the expanded shared facts; this was checked after selecting each card in both languages.

**Agriculture:** Fosforus-32 / Phosphorus-32 determines phosphate fertiliser uptake and helps choose the best phosphate fertiliser. The card includes killing beetles, sterilising insect pests to control populations, and changing plant characteristics.

**Medicine:** The card explicitly labels these as textbook medical uses: Sesium-137 / Caesium-137 and Kobalt-60 / Cobalt-60 kill cancer cells; Natrium-24 / Sodium-24 locates blood clots; Teknetium-99 / Technetium-99 (Tc-99) treats brain tumours; Co-60 destroys germs; Iodin-131 / Iodine-131 treats the thyroid gland.

**Safety:** Existing lead containers, shielding, clothing, robotic handling, radiation badges and proper waste disposal remain. New visible cards explain the radioactive warning symbol and example locations (hospital, atomic research centre, X-ray room), plus the lead/aluminium clothing tradeoff: lead shields effectively, including gamma, but is heavy; aluminium is lighter but less effective against penetrating gamma.

The primary radioactive examples remain Karbon-14, Radon-222, Torium-234 and Uranium-238, with full names and codes. A short note adds Torium-232 and Uranium-235 without replacing them.

The corrected carbon-14 ancient-organic-remains question, approximately 5,700-year half-life, Pa-234 calculator, Marie Curie question, Sun/Fermi enrichment, Bq/Ci, <0.2 μSv/h threshold and Na⁺/Cl⁻ examples were preserved.

## I. BM/DLP parity: PASS

Shared facts and projected interactive data carry both languages. Rendered and browser checks verify the same classification, examples, controls, medical/agricultural uses and safety comparisons in both.

The following were verified in the rendered Chapter 8 experience, not merely located in source data:

| Required learner-visible content | Result |
| --- | --- |
| Becquerel (Bq), Curie (Ci), 1 Bq = 1 pereputan sesaat, 1 Ci = 3.7 × 10¹⁰ Bq | PASS |
| Half-life progression with mass/fraction/time labels and editable Pa-234 calculator | PASS |
| Proton, neutron, electron, nucleus and neutral atom visual | PASS |
| Electric and magnetic comparisons | PASS |
| Radiation dose, <0.2 μSv/h and exposure controls | PASS |
| Tc-99 and all other medical uses after card selection | PASS |
| Expanded agriculture and protective-clothing teaching | PASS |

## J. Tests

- **18 focused Vitest tests passed**: 12 renderer/visual tests and 6 resource/quiz tests.
- Regression assertions cover UV absent from the non-ionising list, UV present in the ionising list, very low frequency waves, BM terminology/title, Tc-99, TV distance 2 m, learner-facing magnetic teaching and the atom visual.
- **Six browser scenarios passed:** BM/DLP at 320, 390 and 1280 px. Tests use the actual Chapter 8 renderer and repository styles in an isolated local harness. They exercise ion toggles, all half-life steps, keyboard slider input, calculator edits, radiation selection, magnetic reversal, all six uses, Curie feedback and the completion callback.
- Browser content assertions include the new medical/agricultural uses after selection, full element names, UV classification regions and warning/clothing teaching. No horizontal overflow, console errors or runtime exceptions.
- Screenshots refreshed; narrow-screen medical text and desktop medical content were visually inspected. Examples: [BM mobile medical card](outputs/science-f3-chapter8-validation/bm-320-medical.png), [DLP desktop medical card](outputs/science-f3-chapter8-validation/en-1280-medical.png), [browser results](outputs/science-f3-chapter8-validation/browser-results.json).
- Quiz generation passed: 1,000 localized questions from 500 source rows. Other chapters' source rows and generated banks are unchanged.
- `git diff --check`: PASS.
- Full `tsc --noEmit`: only the existing Form 2 test errors at `chapter-7-9-10-visual-integration.test.tsx:291` and `chapter-9/chapter-9-heat-visuals.test.tsx:480`, both involving `string | undefined`. **No Chapter 8 TypeScript errors.**

Focused test command:

```powershell
node node_modules/vitest/vitest.mjs run src/components/notes/ScienceF3Chapter8VisualNotesBlock.test.tsx src/content/form3/science/chapter-8/chapter8-remediation.test.ts --exclude 'silken-sheen/**' --exclude 'silken-sheen-main/**'
```

Authenticated route navigation was not exercised. The actual renderer and its registered data wiring were tested independently; routes/authentication were not modified. No deployment or production build was performed.

## K. Remaining blockers

**None for the requested Chapter 8 patch.** The two pre-existing Form 2 test type errors still prevent calling the entire repository type check clean; they remain untouched. No commit, push or deployment was performed.
