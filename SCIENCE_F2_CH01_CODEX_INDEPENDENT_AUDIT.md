# Independent Codex Audit

**Product:** AcadeMY  
**Subject:** Sains / Science  
**Form:** Tingkatan 2 / Form 2  
**Chapter:** Bab 1 - Biodiversiti / Chapter 1 - Biodiversity  
**Audit mode:** Independent, blind, read-only  
**Audit date:** 22 August 2026  
**Independent verdict:** **FAIL - HUMAN REVIEW REQUIRED**

## Source Verification

The audit used the repository copies below in the requested authority order. SHA-256 hashes matched the external source attachments when the audit-source pack was added.

| Authority | Source | SHA-256 | Relevant evidence |
|---|---|---|---|
| 1 | `audit-sources/Science/Form-2/DSKP.pdf` | `D3E0F2B07DCDA4842BED60D20C9573590E956C9E5CC5F1D95D0011599A996156` | PDF pp. 53-54 (printed pp. 41-42): SP 1.1.1, 1.1.2, 1.2.1 and 1.2.2. |
| 2 | `audit-sources/Science/Form-2/Textbook.pdf` | `60FBAA1C0918F4EE6B6FF3CBE760F867009F9038D5DB51E3EF098DE2D97471B3` | PDF pp. 9-27 (printed pp. 1-19): Bab 1; PDF p. 287 (printed p. 279): official selected answers for Latihan Sumatif 1. |
| 3 | `audit-sources/Science/Form-2/Errata.pdf` | `586BBB9F2514C0FAFB51E35B3ED7DB8524DCB4D0B430F67BAEC86F8381AB1B0F` | PDF pp. 1-2: mirrored publisher-correction record; no core Bab 1 correction, only an obsolete QR resource on textbook p. 6. |

All three PDFs opened successfully and the cited pages were text-extracted and visually rendered. The errata records its own provenance limitation: no surviving KPM-, BBT- or Karangkraf-hosted original was located. It therefore does not override the DSKP or textbook. No Bab 1 finding below depends on the obsolete QR resource.

Authoritative curriculum decomposition:

- **SP 1.1.1:** define biodiversity; explain how it arises; communicate its importance as food, natural balance, economic generation (including recreation, tourism, biotechnology, medicine and industrial raw materials), ecological resources and education; recognise and preserve Malaysia's megabiodiversity position.
- **SP 1.1.2:** justify effective biodiversity management; discuss effects of human activities; preservation and conservation methods; include endemic and endangered species.
- **SP 1.2.1:** differentiate organisms through shared characteristics using a dichotomous key; construct a key and classify organisms with it; include the prescribed animal and plant groupings.
- **SP 1.2.2:** characterise major taxonomic groups and identify differentiating traits, including plant/animal/fungi comparison and the five vertebrate classes.

## Production Rendering Path

### Shared resolution and language path

1. Each route obtains the selected BM/DLP value from session storage through `useScienceLang()` (`src/hooks/use-science-lang.ts:5-28`). With no value, Science shows the language picker rather than silently falling back (`src/routes/notes.tsx:300-304`, `src/routes/mindmaps.tsx:486-489`, `src/routes/quizzes.tsx:16043-16060`, `src/routes/flashcards.tsx:5396-5403`).
2. Content is loaded client-side through the dynamic registry hook (`src/hooks/use-content-registry.ts:3-26`).
3. `getChapter()` requires subject, form, chapter and, when supplied, exact language identity (`src/content/registry.ts:3743-3765`). BM and DLP are distinct Chapter 1 rows (`src/content/registry.ts:3352-3379`).

### Notes and embedded interactions

`registry BM/DLP row` -> `notes` route lookup (`src/routes/notes.tsx:316-325`) -> earlier `sciF2C1Data` render branch (`src/routes/notes.tsx:1956-1966`) -> `ScienceF2Chapter1NotesBlock` -> `ChipRow`, `FlipCardGrid`, `IconCardGrid`, `ClassificationTree`, `DichotomousStarMap`, `SelfReflectionChecklist`, and embedded `MiniQuizCard` (`src/components/notes/ScienceF2Chapter1NotesBlock.tsx:226-388`). A generic `MiniInvestigation` is then appended to Science discovery notes (`src/routes/notes.tsx:2120`; `src/components/science/ScienceDiscoveryChrome.tsx:244-273`).

Status:

| Dataset / element | BM | DLP | Status and learner result |
|---|---:|---:|---|
| `notes-bm.ts` / `notes-dlp.ts` structured notes | Authored | Authored | **DEAD / UNREACHABLE on this route.** The earlier `sciF2C1Data` branch wins; the generic `activeChapter.notes` renderer is only the final fallback (`src/routes/notes.tsx:2101-2117`). |
| `interactive-bm.ts` / `interactive-dlp.ts` | Authored | Authored | **LIVE**, selected by the registry and bespoke branch. |
| `keywords[].term` | 10 | 10 | **LIVE.** Rendered as chips. |
| `keywords[].definition` | 10 | 10 | **NOT_RENDERED.** The component maps each keyword to `k.term` only (`src/components/notes/ScienceF2Chapter1NotesBlock.tsx:243`; schema at `src/content/form2/science/chapter-1/interactive-types.ts:89-105`). |
| Habitat cards, importance cards, conservation tabs, classification trees, fixed dichotomous-key traversal, self-reflection | Authored | Authored | **LIVE** by static trace. |
| Two embedded mini quizzes | Authored | Authored | **LIVE** by static trace; both contain critical defects described below. |

The full structured notes are not merely duplicate markup. They contain authored quick revision, tables, examination tips, common mistakes, explicit animal and plant key examples, and curriculum-alignment material (`src/content/form2/science/chapter-1/notes-bm.ts:3-333`; equivalent DLP file). Much of that material is absent or compressed in the live interactive representation.

### Mind maps

`registry mindMap` -> language/form-aware route lookup (`src/routes/mindmaps.tsx:486-503`) -> resource guard -> `MindMapBlock` (`src/routes/mindmaps.tsx:703-746`) -> interactive `MindMap` (`src/components/notes/MindMapBlock.tsx:80-99`; `src/components/MindMap.tsx:449-517`).

Both `mindmap-bm.ts` and `mindmap-dlp.ts` are **LIVE**. They provide equivalent trees (`src/content/form2/science/chapter-1/mindmap-bm.ts:3-113`; `mindmap-dlp.ts:3-113`). Their curriculum gaps are described below.

### Main quizzes

`registry quiz` -> `getChapterQuizQuestions()` -> registered questions preferred over the legacy flat fallback (`src/content/registry.ts:3767-3815`) -> route pool (`src/routes/quizzes.tsx:16053-16074`) -> question/options/correct answer/explanation renderer (`src/routes/quizzes.tsx:17836-17945`).

Both 30-question banks are **LIVE** by static trace: 10 Easy, 10 Medium and 10 Hard questions per language. The same arrays are also spread into the legacy `src/data/content.ts` barrel, but the registered non-empty bank wins. This is duplicate aggregation, not a second learner-visible bank.

### Flashcards

`registry flashcards` -> `getFlashcardDeckCards()` -> registered/legacy selection and ID deduplication (`src/lib/flashcard-availability.ts:32-65`) -> three 20-card sets (`src/lib/flashcard-availability.ts:68-79`; `src/routes/flashcards.tsx:5412-5473`) -> front/back flip renderer (`src/routes/flashcards.tsx:6362-6477`).

Both 60-card banks are **LIVE** by static trace and reachable as three sets. As with quizzes, the legacy barrel contains the same imported arrays; the routing helper selects one source and deduplicates by ID.

## Critical Findings

### C-01 - Both embedded mini quizzes reverse the official answer on non-living things

**Severity:** CRITICAL  
**Runtime status:** STATIC_ONLY

The BM and DLP mini quizzes state that a dichotomous key cannot classify non-living things and mark the statement false (`src/content/form2/science/chapter-1/interactive-bm.ts:334-340`; `interactive-dlp.ts:334-340`). The official textbook asks the equivalent statement in Latihan Sumatif 1, item 2(c), and the official answer page marks it correct/true (textbook PDF p. 26; answer key PDF p. 287).

This is a direct question/answer/explanation contradiction against the authoritative textbook answer key. The renderer awards XP for the incorrect keyed response (`src/components/notes/ScienceF2Chapter1NotesBlock.tsx:127-190`).

### C-02 - Both embedded amphibian questions have no scientifically valid keyed option

**Severity:** CRITICAL  
**Runtime status:** STATIC_ONLY

Both versions ask which animal “breathes through gills as an adult” and lays jelly-like unshelled eggs, then key **frog** (`src/content/form2/science/chapter-1/interactive-bm.ts:342-349`; `interactive-dlp.ts:342-349`). The immediately following explanations correctly state that young amphibians use gills while adults use lungs and moist skin. The textbook says the same on PDF p. 18 (printed p. 10).

No listed option satisfies both stem conditions: the frog matches the egg description but not adult respiration; grouper matches adult gill respiration but not jelly-like unshelled amphibian eggs. The question, answer and explanation contradict one another.

## High Findings

### H-01 - The registered structured notes are unreachable and important authored material is dropped

**Severity:** HIGH  
**Runtime status:** STATIC_ONLY

The registry attaches both `notes` and `sciF2C1Data` to each Chapter 1 language row (`src/content/registry.ts:3352-3379`). In the notes route, `sciF2C1Data` is tested before the generic `activeChapter.notes` fallback (`src/routes/notes.tsx:1956-1966`, `2101-2117`). Therefore the entire structured BM/DLP notes datasets are dead on the production Chapter 1 notes path.

Learners receive the shorter bespoke component, not the extensive structured notes. Lost or reduced material includes full invertebrate segmentation hierarchy, full example dichotomous keys, examination tips, common-mistake cautions, detailed tables and explicit authored formative material. Some concepts reappear in quizzes or flashcards, but that does not make the notes themselves reachable.

### H-02 - SP 1.2.2 is substantially incomplete: fungi and top-level taxonomic differentiation are absent

**Severity:** HIGH  
**Runtime status:** STATIC_ONLY

DSKP SP 1.2.2 calls for characterising major taxonomic groups and explicitly gives differentiation among plants, animals and fungi as an example (DSKP PDF p. 54). The live notes component covers animal and plant branches only (`src/components/notes/ScienceF2Chapter1NotesBlock.tsx:314-343`). The BM/DLP interactive datasets, mind maps, main quizzes and flashcards contain no fungi content. Yet self-reflection tells learners they can describe the major taxonomic groups (`interactive-bm.ts:328-332`; `interactive-dlp.ts:328-332`).

The five vertebrate groups are covered well, but the major-group requirement is only partial.

### H-03 - “Build a dichotomous key” is actually a fixed-key traversal

**Severity:** HIGH  
**Runtime status:** STATIC_ONLY

The learner-visible heading promises “Bina kekunci dikotomi / Build a dichotomous key” (`src/components/notes/ScienceF2Chapter1NotesBlock.tsx:81-83`, `116-118`), but `DichotomousStarMap` only lets the learner select one of two pre-authored branches until a leaf is reached (`src/components/notes/blocks/DichotomousStarMap.tsx:32-46`, `82-105`). There is no facility to choose distinguishing traits, create couplets, order branches or validate a newly constructed key.

This supports using/following a key but not the DSKP instructional requirement to construct one. The authored structured notes describe a construction activity, but H-01 makes that content unreachable on the notes route.

## Medium Findings

### M-01 - SP 1.1.1 breadth is incomplete in the live learning experience

**Severity:** MEDIUM  
**Runtime status:** STATIC_ONLY

Food, medicine, natural balance, recreation/eco-tourism, industrial raw materials, education, genetic diversity and Malaysia's megabiodiversity position are present. However, the DSKP's explicit biotechnology and ecological-resource dimensions are absent as distinct learning content. The economic dimension is only indirectly prompted through a “check yourself” hint. This makes SP 1.1.1 partial rather than fully covered.

### M-02 - Ten authored keyword definitions per language are discarded by the renderer

**Severity:** MEDIUM  
**Runtime status:** STATIC_ONLY

The data model authors both `term` and `definition` (`src/content/form2/science/chapter-1/interactive-types.ts:89-92`), and both interactive files populate ten definitions. The component renders only `content.keywords.map((k) => k.term)` (`src/components/notes/ScienceF2Chapter1NotesBlock.tsx:243`). Definitions are therefore authored but **NOT_RENDERED**.

### M-03 - Chapter header metadata claims content that the component does not provide

**Severity:** MEDIUM  
**Runtime status:** STATIC_ONLY

Chapter 1 hard-codes `modules: 12` and `experiments: 2` (`src/routes/notes.tsx:839-845`). The bespoke Chapter 1 component does not render 12 research modules or two practical instructions. It renders two curriculum sections and a generic appended “Mini Investigation” prompt (`src/components/science/ScienceDiscoveryChrome.tsx:244-273`). The learner-facing header can therefore overstate available module/practical content.

### M-04 - A main-quiz/flashcard “insect success” explanation is not grounded in the audit sources

**Severity:** MEDIUM  
**Runtime status:** STATIC_ONLY

BM main quiz Q23 states that insects' success despite poikilothermy is caused by a hard exoskeleton, small size and high reproductive rate (`src/content/form2/science/chapter-1/quizzes-bm.ts:317-331`); flashcard F42 repeats it (`flashcards-bm.ts:379-385`), with DLP equivalents. The textbook states only that insects are the largest animal group and gives the 950,000-species figure; the DSKP and textbook do not supply this causal answer. The explanation may be a plausible generalisation, but it is presented as a uniquely keyed curriculum fact without source support.

### M-05 - The live invertebrate tree collapses textbook distinctions

**Severity:** MEDIUM  
**Runtime status:** STATIC_ONLY

The textbook distinguishes legless invertebrates by segmented/unsegmented bodies and legged invertebrates by three versus more than three pairs of legs (textbook PDF pp. 15-17). The live data collapses all legless examples into one chip group and encodes leg counts only inside example labels (`src/content/form2/science/chapter-1/interactive-bm.ts:195-211`; DLP equivalent). The structured notes contain the fuller hierarchy, but are unreachable under H-01.

## Low Findings

### L-01 - BM describes a paired-choice key as a yes/no sequence

**Severity:** LOW  
**Runtime status:** STATIC_ONLY

The BM introduction says a dichotomous key uses a series of “soalan ya/tidak” (`src/components/notes/ScienceF2Chapter1NotesBlock.tsx:116-118`), while the actual and textbook key uses paired alternative characteristics. This is a small but meaningful description mismatch.

### L-02 - BM interactions retain English-only chrome

**Severity:** LOW  
**Runtime status:** STATIC_ONLY

The shared star-map component hard-codes “Identified” and defaults to “restart the key” (`src/components/notes/blocks/DichotomousStarMap.tsx:25-30`, `82-113`), and the BM call does not override the restart label (`src/components/notes/ScienceF2Chapter1NotesBlock.tsx:338-342`). The shared mind-map wrapper also uses English-only “Visual learning”, “Interactive Mind Map”, “Open Mind Map” and instructions (`src/components/notes/MindMapBlock.tsx:45-98`). Academic data is bilingual, but parts of the BM learner interface are not.

## DSKP Coverage Matrix

Coverage is judged against learner-visible output, not mere repository presence.

| SP | Meaningful requirement | BM | DLP | Evidence / reason |
|---|---|---|---|---|
| 1.1.1 | Define biodiversity; explain habitat/climate and genetic diversity | COVERED | COVERED | Live intro, habitat cards and keyword terms cover these elements. |
| 1.1.1 | Food, natural balance, medicine, raw materials, recreation/tourism, education | COVERED | COVERED | Six live importance cards; eco-tourism appears in the recreation/economy prompt. |
| 1.1.1 | Biotechnology and ecological resources | MISSING | MISSING | No live notes, map, quiz or flashcard treatment. |
| 1.1.1 | Malaysia as one of 12 megabiodiversity countries and need to preserve it | COVERED | COVERED | Live intro and assessment banks. |
| **1.1.1 overall** | Communicate the full DSKP breadth | **PARTIAL** | **PARTIAL** | M-01. |
| 1.1.2 | Effects of human activity | PARTIAL | PARTIAL | Deforestation/habitat and food loss is covered; wider human impacts are not developed. |
| 1.1.2 | Justify effective management | COVERED | COVERED | Live conservation rationale, methods, self-check and quiz treatment. |
| 1.1.2 | Preservation/conservation, endemic and endangered species | COVERED | COVERED | Law, protected habitats, breeding, in situ/ex situ and examples are live. |
| **1.1.2 overall** | Effective management | **PARTIAL** | **PARTIAL** | Strong methods coverage, narrow human-impact coverage. |
| 1.2.1 | Distinguish organisms using a dichotomous key | COVERED | COVERED | Fixed key interaction and main quiz paths. |
| 1.2.1 | Construct a dichotomous key | NOT_RENDERED | NOT_RENDERED | Authored activity exists in dead structured notes; live interaction only traverses a fixed key (H-03). |
| 1.2.1 | Prescribed animal and plant groupings | PARTIAL | PARTIAL | Core groups are present, but invertebrate distinctions are collapsed (M-05). |
| **1.2.1 overall** | Use and build a key based on shared traits | **PARTIAL** | **PARTIAL** | H-03. |
| 1.2.2 | Characterise five vertebrate groups | COVERED | COVERED | Detailed live tabs, quizzes and flashcards. |
| 1.2.2 | Differentiate plants, animals and fungi / major taxonomic groups | MISSING | MISSING | No fungi or top-level three-group comparison (H-02). |
| **1.2.2 overall** | Characterise major taxonomic groups | **PARTIAL** | **PARTIAL** | H-02. |

## Quiz / Mini Quiz Findings

- **Embedded mini quizzes:** two per language; both items in both languages have CRITICAL defects (C-01 and C-02).
- **Main quizzes:** 30 BM and 30 DLP questions, with matched difficulty distribution and broadly parallel content. Answer indices and explanations are internally consistent in the reviewed banks, except that Q23/F42's causal insect claim is not grounded in the authoritative sources (M-04).
- **Coverage imbalance:** no main-quiz item assesses fungi or plant/animal/fungi differentiation, biotechnology, ecological resources, or actual construction of a new dichotomous key.
- **Renderer:** after selection, the main quiz reveals the correct option and explanation (`src/routes/quizzes.tsx:17852-17945`). The embedded mini-quiz renderer shows the explanation but only styles the chosen option, so a wrong choice does not also visually identify the correct choice (`src/components/notes/ScienceF2Chapter1NotesBlock.tsx:140-190`).

## Flashcard Findings

- 60 cards per language are available and split into three reachable 20-card sets.
- BM/DLP decks are structurally parallel and cover definitions, comparisons and examination prompts.
- No fungi or plant/animal/fungi comparison appears, reinforcing H-02.
- F42 repeats the unsourced insect-success causal claim (M-04).
- The registry and legacy barrel both contain the same imported cards, but the selection helper chooses one source and deduplicates IDs; no duplicate card is expected in the learner deck (`src/lib/flashcard-availability.ts:46-65`).

## Mind Map Findings

- Both BM and DLP maps are registered and reachable through the language-aware mind-map route.
- The maps accurately summarise the principal textbook animal and plant branches and biodiversity-management topics.
- They omit fungi, biotechnology, ecological resources and a constructible or complete worked dichotomous key. The key nodes are summary labels ending in arrows rather than a usable key (`src/content/form2/science/chapter-1/mindmap-bm.ts:103-110`; DLP equivalent).
- The wrapper UI remains English on the BM route (L-02).

## BM / DLP Findings

- Registry separation is correct: distinct BM and DLP rows, notes, interactive data, maps, quizzes and flashcards.
- Counts match: 30 main quizzes and 60 flashcards in each language; the interactive shapes and mind-map trees are parallel.
- No incorrect automatic fallback was found. If language is unset, the route presents a picker; with language set, `getChapter()` requires a matching `lang` row.
- Critical mini-quiz defects are duplicated in both languages, so DLP is not a safe alternative.
- BM has additional English-only interaction chrome in the star map and mind-map wrapper (L-02).

## Runtime Verification

The existing development server started successfully at `http://127.0.0.1:8080/` using the repository's `npm run dev` script.

- Direct navigation to `/notes?subject=science&form=2&chapter=Chapter%201` redirected to `/login` in the available in-app browser because there was no authenticated user. This is **RUNTIME_CONFIRMED** and agrees with the authenticated-shell redirect at `src/components/AppShell.tsx:309-337`.
- No authenticated browser session was available, so the Chapter 1 BM/DLP content itself could not be exercised without signing into the user's account. C-01, C-02, H-01, H-02, H-03 and the implementation findings remain **STATIC_ONLY**, not `NOT_REPRODUCED`.
- Existing read-only integrity tests passed: `src/lib/flashcard-content-audit.test.ts`, `src/lib/flashcards-routing.test.ts`, and `src/lib/quiz-routing-integrity.test.ts` - **38/38 tests passed**. These tests validate routing/deck structure, not the authoritative factual contradictions found here.

## Audit Limitations

- Runtime content verification was blocked by authentication in the only available browser session. No credentials, account state or protected storage were inspected or changed.
- The authoritative textbook is BM. DLP judgments therefore assess translation and implementation parity against the same science requirements rather than a separate official English textbook file.
- The errata is a provenance-preserving mirrored correction record, not an official-hosted original. It reports no Bab 1 core factual correction.
- The audit did not test every responsive breakpoint or assistive-technology mode.
- No prior Claude audit report was opened or used before this independent report and verdict were written.

## Independent Verdict

**FAIL - HUMAN REVIEW REQUIRED**

Rationale: the learner-facing embedded assessment contains two duplicated BM/DLP critical defects, including a direct reversal of the official textbook answer key and a second question whose stem, keyed answer and explanation cannot all be true. In addition, the production renderer makes the extensive structured notes unreachable, does not provide the promised key-construction activity, and leaves SP 1.2.2 materially incomplete by omitting fungi/top-level taxonomic differentiation.

**REPOSITORY LEARNER CONTENT MODIFIED: NO**  
**AUDIT ONLY: YES**

## Comparison With Claude Deep Audit

This section was written only after the independent Codex findings and verdict above were complete and frozen. The comparison source was `SCIENCE_F2_CH01_DEEP_AUDIT_REPORT.md`; it did not influence the preceding audit.

### Claude CRITICAL / HIGH findings

| Claude ID | Classification | Codex comparison |
|---|---|---|
| C-01 — registered `notes-*.ts` datasets are unreachable | **CONFIRMED** | Same underlying defect as Codex H-01. Both audits traced the single notes-route ternary and found that the earlier `sciF2C1Data` branch prevents the registered structured notes from rendering. Claude assigns CRITICAL; Codex assigns HIGH. |
| C-02 — non-living-things mini-quiz answer is reversed | **CONFIRMED** | Same defect as Codex C-01. Both audits independently used textbook Latihan Sumatif 1 Q2(c) and the official answer page to establish that `true`, not `false`, is authoritative. |
| C-03 — adult-amphibian mini-quiz has no valid keyed option | **CONFIRMED** | Same defect as Codex C-02. Both audits found that the keyed frog answer contradicts the stem and its own explanation. |
| H-01 — segmented/unsegmented invertebrate split missing from live notes | **CONFIRMED** | Same underlying omission as Codex M-05. The textbook hierarchy is flattened on the live notes surface even though other AcadeMY surfaces retain segmentation. Claude assigns HIGH; Codex assigns MEDIUM. |
| H-02 — BM `Berbulu` discriminator is ambiguous/contradictory | **CONFIRMED** | Claude found an additional BM-only defect not recorded in the frozen Codex findings: the visible choice labels omit textbook `pelepah`, while AcadeMY also describes mammals as `berbulu`. Source inspection supports Claude's finding; DLP's `Feathered` wording does not have the same ambiguity. |
| H-03 — human-activity effects are inadequately taught | **PARTIALLY CONFIRMED** | Codex independently rated SP 1.1.2 human-impact coverage PARTIAL. The live treatment is too narrow, but the wider learner experience does contain some deforestation/habitat/food-loss material, so “missing” is stronger than the evidence supports when all live surfaces are considered. |
| H-04 — all ten authored keyword definitions are dropped | **CONFIRMED** | Same defect as Codex M-02. `ScienceF2Chapter1NotesBlock` maps each keyword to `term` and discards `definition`. Claude assigns HIGH; Codex assigns MEDIUM. |
| H-05 — threatened species are not taught and are conflated with endemic species | **PARTIALLY CONFIRMED** | The live notes do not provide a distinct, adequate treatment of `spesies terancam`, so the teaching gap is confirmed. The stronger claim of outright conflation is not fully established: the named examples can be both endemic and threatened, and flashcard F54 explicitly says the concepts are not equivalent. Human curriculum review should select clearer examples and wording. |

### Codex-only findings and material differences

- **Top-level fungi coverage (Codex H-02): NEEDS HUMAN REVIEW.** Codex read DSKP SP 1.2.2 as requiring differentiation among plants, animals and fungi. Claude reads the DSKP note's `atau` as allowing the five vertebrate groups to satisfy the requirement instead. The frozen Codex finding remains above, but this authority-language disagreement should be resolved by a curriculum owner before remediation is required.
- **Constructing a new dichotomous key (Codex H-03): PARTIALLY CONFIRMED, severity reduced by comparison.** Both audits agree that the live Star Map only traverses a pre-authored key and that authored construction material is unreachable. Claude reasonably distinguishes the SP verb from the suggested Catatan activity, so this is a product-promise/learning-depth gap rather than a proven mandatory-SP failure.
- **Header metadata mismatch (Codex M-03): CODEX-ONLY.** The live chapter header claims 12 modules and two experiments although this chapter component exposes two principal sections and a generic investigation block. Claude did not report this mismatch.
- **Insect-success rationale (Codex M-04): DIFFERING JUDGMENT.** Both audits agree that the exoskeleton/small-size/high-reproduction rationale goes beyond the supplied chapter text. Codex flags the lack of audit-source grounding; Claude considers it scientifically sound KBAT enrichment. It should remain labelled as enrichment or be source-backed, rather than presented as directly textbook-derived.
- **BM localisation scope (Codex L-02): CODEX-ONLY EXPANSION.** Both audits found the English-only Star Map chrome. Codex additionally found English-only strings in the shared Mind Map wrapper on the BM route.
- **BM paired-choice description (Codex L-01): CODEX-ONLY.** The BM prose calls the key a `ya/tidak` sequence although the visible branches are paired alternatives; Claude did not record this wording issue.

### Comparison conclusion

The audits independently converge on the release-significant core: unreachable authored notes plus two factually invalid embedded mini-quiz items, in both BM and DLP. Claude adds a valid BM-only dichotomous-key wording defect. Differences do not change the Codex verdict of **FAIL - HUMAN REVIEW REQUIRED**, but they do narrow two curriculum claims: fungi coverage and construction of a new key require authority/scope adjudication rather than automatic treatment as mandatory omissions.
