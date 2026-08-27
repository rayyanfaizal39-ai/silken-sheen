# Science Form 2 Chapter 2 - Codex Independent Blind QA Audit

**Product:** AcadeMY  
**Chapter:** Sains Tingkatan 2, Bab 2 - Ekosistem / Science Form 2, Chapter 2 - Ecosystem  
**Audit mode:** Read-only, independent blind audit  
**Audit date:** 22 August 2026  
**Independent verdict frozen before comparison:** **FAIL**

## Executive conclusion

The live Chapter 2 implementation is functional, bilingual, sectioned, and broadly accurate for basic ecosystem vocabulary, organism interactions, nutrient cycles, and human impacts. The 30-question BM and 30-question DLP main banks have valid indices, four options per item, explanations, unique IDs, and close semantic parity. The food-chain Journey, tabs, accordions, matching activity, section controls, reflection checklist, and embedded mini quizzes mount and operate.

The chapter nevertheless fails release QA. Four HIGH issues remain on the live teaching surface:

1. DSKP SP 2.2.3's specified excessive use of water is replaced by fertiliser overuse and is not taught in the live notes.
2. DSKP SP 2.3.2's mandatory adaptation outcome is reduced to generic one-sentence biome cards and is not substantively taught or justified.
3. DSKP SP 2.3.5's required water-supply, migration, and population-change effects are absent from the live notes, even though they survive in dead notes, mind maps, quizzes, and flashcards.
4. The Tundra flip card uses a seal on sea ice, a polar-marine scene rather than a tundra habitat, creating a misleading scientific association inside the already weak adaptation treatment.

There are no CRITICAL findings. No main-quiz answer index was found to point to an indefensible option. The release failure is caused by mandatory SP coverage materially absent from the live notes and a misleading required-topic visual.

## Independence and evidence controls

- `SCIENCE_F2_CH02_DEEP_AUDIT_REPORT.md` was not opened, read, or searched before this report, its findings, counts, and verdict were frozen.
- Repository searches before freeze were restricted to source PDFs, Chapter 2 source files, production routing/components, tests, and supporting assets.
- Dead or legacy data was not credited as learner teaching.
- Suggested PdP activities were not automatically treated as mandatory outcomes.
- No external tuition material, AI notes, NotebookLM material, or YouTube content was used as academic authority.

## Authoritative source scope

### Source integrity

| Source | Size | SHA-256 | Chapter 2 scope used |
|---|---:|---|---|
| `audit-sources/Science/Form-2/DSKP.pdf` | 4,863,437 bytes | `D3E0F2B07DCDA4842BED60D20C9573590E956C9E5CC5F1D95D0011599A996156` | PDF pp. 56-60, printed pp. 44-48 |
| `audit-sources/Science/Form-2/Textbook.pdf` | 75,708,049 bytes | `60FBAA1C0918F4EE6B6FF3CBE760F867009F9038D5DB51E3EF098DE2D97471B3` | PDF pp. 28-51, printed pp. 20-43; selected answers at PDF p. 287, printed p. 279 |
| `audit-sources/Science/Form-2/Errata.pdf` | 7,182 bytes | `586BBB9F2514C0FAFB51E35B3ED7DB8524DCB4D0B430F67BAEC86F8381AB1B0F` | No Chapter 2 correction identified |

All relevant DSKP and textbook pages were text-extracted and visually rendered. The textbook's worked diagrams, activities, formative exercises, reflection list, summative exercise, and selected answer page were inspected.

### Complete SK/SP baseline

| SK | SP | Mandatory learning outcome | Binding scope / examples in Catatan | Suggested PdP support (not automatically mandatory) |
|---|---|---|---|---|
| 2.1 Energy flow | 2.1.1 | Explain producers, consumers, and decomposers with examples. | Introduce primary and secondary carnivore terminology. | HEBAT Module 1 reference. |
| 2.1 | 2.1.2 | Interpret food chains and food webs. | Energy transfer from producer to consumers is the intended relationship. | Activity showing organism relationships in chains/webs. |
| 2.2 Nutrient cycles | 2.2.1 | Describe and communicate roles of living things in oxygen and carbon cycles. | Living-organism roles are substantive, not just names of processes. | Multimedia linking water, oxygen, and carbon cycles. |
| 2.2 | 2.2.2 | Justify roles of organisms in an ecosystem's water cycle. | Roots, transpiration, animal processes, litter/soil effects are textbook exemplars. | Multimedia presentation. |
| 2.2 | 2.2.3 | Solve problems when human activity disrupts cycles. | Deforestation, fossil-fuel burning, and excessive water use for agriculture/domestic use are explicitly listed. | Problem-solving/presentation format is flexible. |
| 2.3 Interdependence/interactions | 2.3.1 | Explain with examples how living things and environment are interdependent for ecosystem balance. | Species, population, community, habitat, ecosystem, and balance are the scoped terms. | Field study and discussion. |
| 2.3 | 2.3.2 | Justify the importance of adaptation to the environment. | Desert, tundra, and tropical animal/plant adaptations are the source examples. | Investigation of temperature, light, and humidity; multimedia presentation. |
| 2.3 | 2.3.3 | Communicate organism-interaction examples and apply them in daily life. | Predator-prey; mutualism, commensalism, parasitism; competition; biological-control application, benefits versus chemicals, and long-term impact. | Information search and multimedia presentation. |
| 2.3 | 2.3.4 | Analyse factors affecting population size. | Disease, predators, food source, and drought. | Examples may vary. |
| 2.3 | 2.3.5 | Predict how ecosystem changes affect resources and population balance. | Water supply, migration, and increases/decreases in populations. | Interactive problem solving in HEBAT Module 1. |
| 2.4 Human role | 2.4.1 | Justify and communicate why humans need stable, productive ecosystems for sustainability. | Environmental issue source, community effect, stakeholders/public, and solution proposals support communication. | Role play/forum; local or global issue. |

### Textbook teaching and assessment scope

- **Worked teaching/examples:** producer-consumer-decomposer forest example; cabbage-snail-bird-civet chain; vegetable-garden food web and energy loss; water, carbon, and oxygen cycle diagrams; species-population-community-ecosystem pond hierarchy; balanced ecosystem; tropical/desert/tundra adaptation prompt; mutualism/commensalism/parasitism/predator-prey/competition; five biological-control examples; population-factor examples; drought, migration, and population-change cases; human-impact table and 5R/law/awareness/biological-control responses.
- **Formative exercises:** 2.1 food-chain levels and drought prediction; 2.2 cycles, organism roles, and water-saving; 2.3 ecological hierarchy and interactions; 2.4 human activities, impacts, biological control, haze, and ecosystem need.
- **Summative exercise:** printed pp. 42-43, six questions covering food webs/interactions/population effects, urban rats, decomposers, predator removal, urban forest justification, and trap design.
- **Official selected answers:** printed p. 279 gives Chapter 2 answers for summative questions 1-4 only. Questions 5-6 are not included; the page explicitly says only selected answers are provided.
- **Errata:** the mirrored verification record lists corrections for textbook Chapters 3, 7, and 8 and obsolete QR resources. It lists no Chapter 2 factual correction or Chapter 2 broken QR item.

## Production path and dataset classification

### Real route trace

`registry.ts` registers separate BM/DLP Chapter 2 rows -> `getChapter(subject, chapterKey, lang, form)` resolves the matching row -> `notes.tsx` resolves `activeScienceLang` and `activeChapter` -> the `sciF2InteractiveData` branch selects `ScienceF2Chapter2NotesBlock` -> that alias exports `ScienceF2InteractiveNotesBlock` -> it maps the interactive sections into `ScienceSectionedNotesShell` -> the shell displays only the current section and the renderer mounts its cards/tabs/accordions/Journey/matcher/checks/final-section content.

The generic `notes` field is registered on the same row, but the route reaches `sciF2InteractiveData` first. Therefore `notes-bm.ts` and `notes-dlp.ts` are not the live learner notes for this chapter.

### Dataset inventory

| Dataset / feature | Classification | Learner result |
|---|---|---|
| `interactive-bm.ts` | **LIVE** | Sole BM teaching dataset passed to the Chapter 2 component. |
| `interactive-dlp.ts` | **LIVE** | Sole DLP teaching dataset passed to the Chapter 2 component. |
| `notes-bm.ts` | **DEAD / UNREACHABLE + DUPLICATE / LEGACY** | Registered but bypassed by the earlier interactive render branch. Contains important material not credited as taught. |
| `notes-dlp.ts` | **DEAD / UNREACHABLE + DUPLICATE / LEGACY** | Same as BM. |
| `quizzes-bm.ts` | **LIVE** | Actual 30-item BM main bank resolved from registry. |
| `quizzes-dlp.ts` | **LIVE** | Actual 30-item DLP main bank resolved from registry. |
| `interactive-*.ts` `miniQuiz` arrays | **LIVE** | Two embedded items per language, displayed only in final section 2.4. |
| `flashcards-bm.ts` | **LIVE** | 60 cards, split by route into Basics/Understanding/Exam sets. |
| `flashcards-dlp.ts` | **LIVE** | 60 cards with one-to-one BM semantic structure. |
| `mindmap-bm.ts` / `mindmap-dlp.ts` | **LIVE** | Registry mind-map data. |
| Chapter 2 flip-card assets | **LIVE** | Tropical, desert, tundra, and soil images displayed in section 2.3. |
| `MiniInvestigation` | **DEAD / UNREACHABLE for F2 C2** | Route guard does not classify F2 C2 as `isScienceDiscovery`; component is not mounted. |
| BM/DLP educational videos | **LIVE by static route trace** | `NotesContentWithVideo` places the selected video after the notes container. Full route was auth-blocked at runtime. |
| Form-1-style discovery header/progress console | **DEAD / UNREACHABLE for F2 C2** | Same guard omission; shell remains functional but scoped discovery wrapper/header is not applied. |

## Sectioned-notes audit

| Check | Result | Evidence / conclusion |
|---|---|---|
| 1. Section count | **4** | 2.1, 2.2, 2.3, 2.4 in both languages. This mirrors SK numbering but is materially coarser than the Form 1 Chapter 2 ten-section implementation. |
| 2. Section order | **PASS** | Official order 2.1 -> 2.2 -> 2.3 -> 2.4. |
| 3. All sections reachable | **RUNTIME_CONFIRMED** | All four sections mounted in the served component harness. |
| 4. Direct stepper navigation | **RUNTIME_CONFIRMED** | Direct 2.2 and 2.4 selection worked. |
| 5. Next Section | **RUNTIME_CONFIRMED** | 2.2 -> 2.3 advanced correctly. |
| 6. Back | **PASS (static + rendered control)** | Bounds-clamped decrement; rendered on non-first sections. |
| 7. First Back | **RUNTIME_CONFIRMED** | Disabled on 2.1. |
| 8. Final state | **RUNTIME_CONFIRMED** | Next is absent on 2.4; Back remains. Reflection, quick quiz, and mark-as-read are placed in 2.4. |
| 9. Restored/clamped state | **STATIC_ONLY PASS** | Session-storage value is parsed and clamped to `0..total-1`; writes use the same key. Not exercised through the authenticated route. |
| 10. Content lost in split | **FAIL** | Excessive water use, substantive adaptation, water-supply/migration/population-change teaching, and other detail remain in legacy notes but not in the live four-section dataset. |
| 11. Duplicated between sections | **PASS with minor repetition** | No contradictory duplicate block; introductions and checks repeat some summary statements. |
| 12. BM/DLP section parity | **PASS** | Same section count/order/block types and semantically parallel content. |
| 13. Mini Investigation placement | **FAIL** | It does not render at all for F2 C2 because of the route guard. |
| 14. Educational Video placement | **STATIC_ONLY PASS** | Selected BM/DLP video is outside and after the notes container, matching the intended bottom placement. Auth prevented full-route observation. |

## Findings

### C2-H01 - Excessive water use is replaced and not taught live

- **ID:** C2-H01
- **TYPE:** Curriculum omission / section-migration content loss
- **SEVERITY:** HIGH
- **SP:** 2.2.3
- **Exact files/lines:** `src/content/form2/science/chapter-2/interactive-bm.ts:26-37`; `interactive-dlp.ts:42-58`. Dead evidence exists at `notes-bm.ts:125-138` and `notes-dlp.ts:124-143` but is bypassed by `src/routes/notes.tsx:1967-1978`.
- **Authoritative source evidence:** DSKP PDF p. 56 (printed p. 44) explicitly lists unrestricted deforestation, fossil-fuel burning, and excessive use of water for agricultural and domestic purposes under SP 2.2.3. Textbook printed p. 27 shows the same three disruptions and solution examples.
- **Current learner behaviour:** The live accordions teach deforestation, fossil fuels, and **excess fertiliser/eutrophication**. They do not teach excessive water use or a corresponding solution. The required concept appears only in dead notes and the mind map.
- **Why it matters:** This substitutes scientifically valid enrichment for an explicitly scoped DSKP case. A learner can be assessed on a mandated disturbance that the live notes never explain.
- **Targeted fix:** Add the excessive-water-use cause/effect/solution chain to the live 2.2 section in both languages. Keep fertiliser/eutrophication only if clearly labelled enrichment and not as a replacement.

### C2-H02 - SP 2.3.2 adaptation is materially untaught

- **ID:** C2-H02
- **TYPE:** Mandatory SP materially untaught
- **SEVERITY:** HIGH
- **SP:** 2.3.2
- **Exact files/lines:** `src/content/form2/science/chapter-2/interactive-bm.ts:50-54`; `interactive-dlp.ts:73-77`.
- **Authoritative source evidence:** DSKP PDF p. 57 (printed p. 45) requires learners to **justify the importance of adaptation** and identifies animal/plant adaptation to desert, tundra, and tropical climates as the teaching context. Textbook printed p. 32 frames the same adaptation comparison.
- **Current learner behaviour:** Four flip cards provide only generic climate/behaviour statements. No concrete plant adaptation is taught; no named adaptation is linked structure/behaviour -> environmental challenge -> survival; and no explanation justifies why adaptation is important. The soil card concerns distribution factors, not adaptation.
- **Why it matters:** The mandatory verb is not met. Recognising that deserts are hot or tundra winters are long is not equivalent to justifying adaptation.
- **Targeted fix:** Give at least representative animal and plant adaptations for tropical, desert, and tundra contexts, each with an explicit feature/behaviour -> function -> survival explanation and an appropriate check.

### C2-H03 - Required ecosystem-change cases are absent from live notes

- **ID:** C2-H03
- **TYPE:** Mandatory SP inaccessible / assessed but not taught
- **SEVERITY:** HIGH
- **SP:** 2.3.5
- **Exact files/lines:** The live 2.3 section ends without these cases at `interactive-bm.ts:40-64` and `interactive-dlp.ts:61-94`. The bypassed full content is at `notes-bm.ts:286-295` and `notes-dlp.ts:286-294`; mind-map remnants are at `mindmap-bm.ts:77-84` and `mindmap-dlp.ts:77-84`.
- **Authoritative source evidence:** DSKP PDF p. 58 (printed p. 46) binds predictions about available resources and population balance to changes in water supply, migration, and population increases/decreases. Textbook printed p. 38 works all three cases.
- **Current learner behaviour:** Live notes contain one sentence listing generic population factors and a predator-removal mini-quiz. They do not teach migration, limited water supply, or the linked cause/effect chains. Main quiz questions 18, 21, 23, and 26 and multiple flashcards nevertheless assess those cases.
- **Why it matters:** This is a direct **ASSESSED BUT NOT TAUGHT** failure across an entire mandatory SP.
- **Targeted fix:** Restore a live ecosystem-change block covering water supply/drought, migration, and population increase/decrease, with predictions about resources and cascading population balance.

### C2-H04 - Tundra visual depicts a polar-marine habitat

- **ID:** C2-H04
- **TYPE:** Misleading scientific visual
- **SEVERITY:** HIGH
- **SP:** 2.3.2
- **Exact files/lines:** Tundra card wiring at `interactive-bm.ts:53` and `interactive-dlp.ts:76`; asset import at `interactive-bm.ts:5` / `interactive-dlp.ts:5`; learner-facing asset `src/assets/notes/form2-science/chapter-2/tundra.jpg`.
- **Authoritative source evidence:** DSKP p. 57 / textbook printed p. 32 specify **tundra**, a treeless land biome, as the adaptation context.
- **Current learner behaviour:** Selecting/seeing the Tundra card presents a seal on floating sea ice with open ocean and icebergs. That is a polar-marine/sea-ice scene, not tundra vegetation/land habitat.
- **Why it matters:** The only visual anchor for a mandatory adaptation context associates the wrong habitat and compounds the weak teaching in C2-H02.
- **Targeted fix:** Replace with a tundra land-biome visual showing appropriate ground/vegetation and representative tundra organisms; ensure the paired text names accurate adaptations.

### MEDIUM findings

| ID | SP / area | Finding | Evidence | Targeted fix |
|---|---|---|---|---|
| C2-M01 | Architecture / multiple SPs | The larger `notes-*.ts` datasets are registered but unreachable. Important material survives there, creating a duplicate legacy source and hiding migration loss. | Registry rows `src/content/registry.ts:3382-3408`; route `notes.tsx:1967-1978`; legacy headings/content in `notes-bm.ts` / `notes-dlp.ts`. | Establish one canonical live teaching source and regression-test every SP before retiring or migrating legacy data. |
| C2-M02 | Section UX | Four SK-sized sections are too coarse relative to Form 1 granularity; section 2.3 combines hierarchy, balance, adaptation, environmental distribution, five interaction types, biological control, population factors, four flip cards, and a matcher. | `interactive-bm.ts:40-64`; `interactive-dlp.ts:61-94`. | Split coherent major concepts into more navigable sections without rewriting content. |
| C2-M03 | Product feature / route | F2 C2 is excluded from `isScienceDiscovery`, so it lacks the scoped Form-1 discovery wrapper/header/progress console and Mini Investigation even though it uses discovery-shell classes. | `src/routes/notes.tsx:366-376`, `826-855`, `2120`; scoped CSS begins `src/styles.css:3113`. | Include live F2 interactive chapters in the discovery guard and supply appropriate metadata. |
| C2-M04 | 2.1.1 | Secondary/tertiary consumer levels are present, but DSKP-noted primary and secondary carnivore terminology is absent from live notes. It appears in dead notes/flashcards/mind map. | `interactive-bm.ts:15-18`; `interactive-dlp.ts:18-24`. | Add the scoped terminology alongside consumer levels with examples. |
| C2-M05 | 2.1.2 | Food web is defined only through a check/hint; no live worked web or interpretive example is shown. Energy loss through movement, respiration, heat, and undigested food is also not substantively taught in section 2.1. | `interactive-bm.ts:20-23`; `interactive-dlp.ts:26-39`. | Add a small worked food web and explicit arrow/energy-loss interpretation. |
| C2-M06 | 2.2.2 / 2.3.1 | Water-cycle organism roles and ecological hierarchy are compressed: roots/animals/litter roles are absent; species and habitat are not defined; interdependence with non-living factors lacks worked examples. | `interactive-bm.ts:28,40`; `interactive-dlp.ts:46,63`. | Restore concise definitions and organism-role cause/effect examples. |
| C2-M07 | 2.3.3 / 2.3.4 / 2.4.1 | Biological-control long-term risk is relegated to a check hint; population factors are only listed; stable/productive ecosystem need is asserted rather than justified with services/resources and sustainability. | `interactive-bm.ts:47-48,63,66-72`; DLP `70-71,92,98-115`. | Add short analytical cause/effect explanations and direct justification. |
| C2-M08 | Out-of-scope / assessment | Energy pyramid is scientifically valid enrichment but absent from DSKP/textbook Chapter 2, is not taught live, is assessed in main quiz q29 and flashcard f40, and is misgrouped under nutrient cycles in the mind map. | `quizzes-bm.ts:446-463`, `quizzes-dlp.ts:446-463`; `flashcards-*.ts:359-366`; `mindmap-*.ts:33-40`. | Label as enrichment, teach it before assessment if retained, and group it under energy flow rather than nutrient cycles. |
| C2-M09 | Scientific precision | Main quiz q12 and flashcard f47 say energy is lost through faeces at **every** trophic level; producers do not produce faeces. The source says some energy is in undigested food/faeces, not that this pathway occurs at every level. | `quizzes-bm.ts:164-179`, `quizzes-dlp.ts:164-179`; `flashcards-bm.ts:424-431`, `flashcards-dlp.ts:424-431`. | Separate universal heat/respiration losses from consumer-specific undigested-food/faeces loss. |
| C2-M10 | Assessment balance | 2.3.3 has 9/30 primary-mapped questions while 2.3.2 has none; 2.2.2 and 2.2.3 have one each; 2.4.1's three items do not directly test why a stable/productive ecosystem is needed. | Both 30-item quiz banks; distribution below. | Rebalance toward adaptation, water-cycle roles, excessive water use, and the 2.4.1 justification verb. |

### LOW findings

| ID | Finding | Evidence | Targeted fix |
|---|---|---|---|
| C2-L01 | BM interaction chrome leaks English: `Journey progress`, `Start`, `Complete`, and matcher `Reset`. | `Journey.tsx:15,41-44`; `MatchingPairs.tsx:5-14`; renderer does not pass a BM reset label. | Localise these strings by `lang`. |
| C2-L02 | Video heading/chip are hard-coded English in BM (`Educational Videos`, `Watch and Learn`). | `src/components/notes/VideoBlock.tsx:77-81`. | Accept a language prop or localised labels. |
| C2-L03 | DLP repeatedly translates `beberapa komuniti` as “a few communities,” which sounds numerically restrictive; “several communities” is clearer. | `quizzes-dlp.ts:20`; `flashcards-dlp.ts` card 1; dead `notes-dlp.ts`. | Use “several communities” consistently. |
| C2-L04 | Source terminology uses `burung bangau kendi`; live assessments/flashcards use `burung kuntul kerbau` / cattle egret for *Bubulcus ibis*. The scientific identity is defensible, but exam-source wording diverges. | `quizzes-*.ts` q18; `flashcards-*.ts` f36/f44; textbook printed p. 38. | Preserve the source term alongside the common-name clarification. |

## DSKP coverage matrix - live teaching surface

The denominator below includes 29 substantive or source-scoped teaching requirements, including the environmental-factor investigation row as **suggested PdP support** so its weaker status is visible. Dead notes, quiz-only, flashcard-only, and mind-map-only appearances do not earn `COVERED`.

| # | SP | Requirement | Status | Live evidence | Issue ID |
|---:|---|---|---|---|---|
| 1 | 2.1.1 | Producer definition/example | COVERED | 2.1 producer card and Journey | - |
| 2 | 2.1.1 | Primary consumer | COVERED | Consumer card/Journey snail | - |
| 3 | 2.1.1 | Secondary/tertiary consumers plus primary/secondary carnivore terms | PARTIAL | Consumer levels present; carnivore terminology absent | C2-M04 |
| 4 | 2.1.1 | Decomposer definition/example | COVERED | Bacteria/fungi card | - |
| 5 | 2.1.2 | Interpret a food chain | COVERED | Four-step Journey | - |
| 6 | 2.1.2 | Interpret a food web | PARTIAL | Definition only in check hint; no web | C2-M05 |
| 7 | 2.1.2 | Explain direction and loss of energy transfer | PARTIAL | One-way/smallest-share labels; full loss routes not taught | C2-M05 |
| 8 | 2.2.1 | Living things in oxygen cycle | COVERED | Oxygen tab | - |
| 9 | 2.2.1 | Living things in carbon cycle | COVERED | Carbon tab | - |
| 10 | 2.2.2 | Justify organism roles in water cycle | PARTIAL | Transpiration named; roots/animals/litter roles absent | C2-M06 |
| 11 | 2.2.3 | Deforestation disruption and solution | PARTIAL | Disruption taught; solution disconnected in 2.4 | C2-M07 |
| 12 | 2.2.3 | Fossil-fuel disruption and solution | PARTIAL | Disruption taught; no direct problem-solving response | C2-M07 |
| 13 | 2.2.3 | Excessive water-use disruption and solution | NOT_RENDERED | Only dead notes/mind map; live substitutes fertiliser | C2-H01 |
| 14 | 2.3.1 | Species/population/community/habitat/ecosystem terms | PARTIAL | Compressed hierarchy; species/habitat undefined | C2-M06 |
| 15 | 2.3.1 | Interdependence with environment for balance | PARTIAL | Asserted without worked dependency example | C2-M06 |
| 16 | 2.3.2 | Justify animal/plant adaptation in tropical/desert/tundra contexts | PARTIAL | Generic flip-card statements only; tundra visual misleading | C2-H02, C2-H04 |
| 17 | 2.3.2 | Temperature/light/humidity distribution investigation (suggested PdP) | PARTIAL | Soil card names factors; no investigation or result analysis | C2-H02 |
| 18 | 2.3.3 | Predator-prey | COVERED | Definition/example and matcher | - |
| 19 | 2.3.3 | Mutualism | COVERED | Definition/example and matcher | - |
| 20 | 2.3.3 | Commensalism | COVERED | Definition/example and matcher | - |
| 21 | 2.3.3 | Parasitism | COVERED | Definition/example and matcher | - |
| 22 | 2.3.3 | Competition | COVERED | Definition/basic-needs list and matcher | - |
| 23 | 2.3.3 | Apply biological control; benefits and long-term impact | PARTIAL | Examples live; limitation only in hint | C2-M07 |
| 24 | 2.3.4 | Analyse disease, predator, food, drought population factors | PARTIAL | Factors only listed; drought not taught as a population case | C2-M07 |
| 25 | 2.3.5 | Predict limited-water-supply effects | NOT_RENDERED | Dead notes/mind map/quiz only | C2-H03 |
| 26 | 2.3.5 | Predict migration effects | NOT_RENDERED | Dead notes/mind map/quiz/flashcards only | C2-H03 |
| 27 | 2.3.5 | Predict population increase/decrease/resource cascades | PARTIAL | Predator-removal mini quiz only | C2-H03 |
| 28 | 2.4.1 | Justify need for stable/productive ecosystem and sustainability | PARTIAL | Need asserted, not substantively justified | C2-M07 |
| 29 | 2.4.1 | Communicate issue source/effect/solutions and relevant stakeholders | PARTIAL | Source/effect/action summary; stakeholders/local-global communication absent | C2-M07 |

**COVERED 11/29**  
**PARTIAL 15/29**  
**MISSING 0/29**  
**INCORRECT / NOT_RENDERED 3/29** (`INCORRECT 0`; `NOT_RENDERED 3`)

The three `NOT_RENDERED` requirements are not treated as absent from the repository; they are present outside the live teaching surface. That is precisely why they are classified as migration/render failures rather than credited coverage.

## Assessment coverage matrix

| Requirement | Notes | Mind Map | Quiz | Flashcards | Interaction / Practical | Overall |
|---|---|---|---|---|---|---|
| Producer/consumer/decomposer | STRONG | STRONG | 3 primary-mapped items | STRONG | Journey | STRONG |
| Food chain/web and energy transfer | PARTIAL | STRONG | 3 items, one enrichment-dependent | STRONG | Chain Journey only | SUPPORTED |
| Oxygen/carbon cycles | SUPPORTED | SUPPORTED | 2 combined items | STRONG | Tabs | SUPPORTED |
| Organism roles in water cycle | WEAK | WEAK | 1 item | SUPPORTED | No practical | PARTIAL |
| Human cycle disruptions incl. excessive water | WEAK | SUPPORTED | 1 primary-mapped item (deforestation) | SUPPORTED | No problem-solving activity | PARTIAL |
| Ecological hierarchy/interdependence | PARTIAL | SUPPORTED | 2 items | STRONG | No field study | SUPPORTED |
| Adaptation | WEAK | NOT SUPPORTED | 0 items | WEAK/indirect | Misleading/weak flip cards | NOT SUPPORTED |
| Organism interactions | STRONG | STRONG | 9 items | STRONG | Matching activity | STRONG / OVER-ASSESSED |
| Biological control | SUPPORTED | SUPPORTED | Multiple items within the 9 interaction items | STRONG | Matcher examples indirect | STRONG |
| Population-size factors | WEAK | SUPPORTED | 2 items | STRONG | None | SUPPORTED |
| Water supply, migration, population changes | NOT SUPPORTED | SUPPORTED | 4 items | STRONG | None | ASSESSED BUT NOT TAUGHT |
| Stable/productive ecosystems and human role | PARTIAL | SUPPORTED | 3 human-role items but no direct justification item | STRONG | No role play / product activity | PARTIAL |

### Main quiz question-by-question audit summary

- **Actual live banks:** 30 BM + 30 DLP from the registry, not a legacy flat fallback.
- **Structure/integrity:** 10 Easy, 10 Medium, 10 Hard in each language; 4 options each; all 60 `answerIndex` values in range; no duplicate IDs, exact duplicate questions, duplicate options within an item, or missing explanations.
- **Semantic parity:** all 30 pairs cover the same stem, keyed concept, explanation, and difficulty. No BM/DLP key mismatch found.
- **Key validity:** all keys point to a defensible best answer. No CRITICAL key defect found.
- **Item exceptions:** q12 overgeneralises faecal energy loss to every trophic level (C2-M09); q29 assesses untaught/unlabelled energy-pyramid enrichment (C2-M08); q18 uses a common name different from the source wording (C2-L04). Q11 calls the answer “trophic level” but keys the consumer category; it remains uniquely defensible from the options.
- **Official answer comparison:** source answers directly support the food-web/population cascade, parasitism, producer, urban-rat, decomposer, and biological-control reasoning used in the bank. The official source supplies only selected summative answers, so not every generated item has a one-to-one official key.

### Quiz distribution by primary SP mapping

The BM and DLP distributions are identical.

| SP | Questions | Count | Assessment judgment |
|---|---|---:|---|
| 2.1.1 | q2, q3, q11 | 3 | ADEQUATELY ASSESSED |
| 2.1.2 | q4, q12, q29 | 3 | ADEQUATELY ASSESSED, but q29 is enrichment-dependent |
| 2.2.1 | q5, q14 | 2 | ADEQUATELY ASSESSED |
| 2.2.2 | q13 | 1 | UNDER-ASSESSED |
| 2.2.3 | q25 | 1 | UNDER-ASSESSED; excessive water use not assessed |
| 2.3.1 | q1, q6 | 2 | ADEQUATELY ASSESSED |
| 2.3.2 | - | 0 | NOT ASSESSED |
| 2.3.3 | q7, q8, q9, q15, q16, q20, q22, q24, q30 | 9 | OVER-ASSESSED |
| 2.3.4 | q17, q27 | 2 | ADEQUATELY ASSESSED |
| 2.3.5 | q18, q21, q23, q26 | 4 | ADEQUATELY ASSESSED, but ASSESSED BUT NOT TAUGHT |
| 2.4.1 | q10, q19, q28 | 3 | UNDER-ASSESSED by outcome: no direct stable/productive-ecosystem justification |

## Embedded mini-quiz audit

| Item | BM/DLP key | Accuracy | XP/render logic |
|---|---|---|---|
| Energy recycled forever - true/false | False | Correct: energy flows one way; nutrients cycle. | Correct answer calls `awardOnce(mini-quiz-0, 15)`. Wrong answer receives no XP. |
| Rats after eagle removal - MCQ | Predation pressure decreased | Correct predator-removal reasoning, consistent with textbook summative reasoning. | Correct answer calls `awardOnce(mini-quiz-1, 15)`. Wrong answer receives no XP. |

Both items render only in final section 2.4. Runtime clicking returned the expected explanations and disabled the answered controls. `awardOnce` prevents duplicate XP for each item during a component mount. A wrong first attempt permanently locks that item for the mount; this is a UX choice, not a wrong-key defect.

## Flashcard audit

- **Live count:** 60 BM + 60 DLP: 20 Basics, 20 Understanding, 20 Exam.
- **Integrity:** no duplicate IDs, exact duplicate fronts, empty fronts, or empty backs. BM/DLP card order and concepts are one-to-one.
- **Accuracy:** most definitions, interactions, cycles, biological control, population factors, and human-impact cards align with the textbook.
- **Internal consistency:** no BM/DLP key contradiction found. The deck intentionally revisits concepts across definition/comparison/exam sets; repetition is pedagogical rather than exact duplication.
- **Assessed but not taught:** migration/water-supply/population-change cards (notably f36/f44/f50), detailed woodlouse experiment f59, excessive-water-use content embedded in later cards, and energy-pyramid f40 exceed what live notes teach.
- **Issues:** f47 repeats the every-trophic-level faeces overgeneralisation (C2-M09). F40 assesses unlabeled enrichment (C2-M08). F53 presents replanting trees as a direct full-mark “save water” answer; the textbook shows replanting within wider nutrient-cycle remediation, making the exam-tip framing weaker than its confidence suggests.

## Mind-map audit

- **Live parity:** BM and DLP have the same node IDs, hierarchy, and concepts.
- **Strengths:** strong summary of consumer levels, decomposers, food chain/web, cycles, interactions, biological control, population factors, ecosystem changes, and human actions.
- **Curriculum gaps:** adaptation and environmental distribution are entirely absent. Water-cycle organism roles and stable/productive-ecosystem justification are too compressed.
- **Correct grouping defect:** energy pyramid is placed under `2.2 Nutrient Cycle`, though it is an energy-flow concept and outside the core source scope (C2-M08).
- **Mind map versus notes:** excessive water use, migration, and limited water supply appear in the map but not in live notes; this does not cure the teaching omission.
- **BM wording:** `Guna Lain` is a shortened rendering of `Guna untuk tujuan lain`; understandable but less source-aligned.

## Visual and interaction audit

| Feature | Scientific data | Rendering / logic | Result |
|---|---|---|---|
| Food-chain Journey | Correct producer -> primary -> secondary -> tertiary sequence. BM `Rubah` / DLP `Fox` differs from textbook `Musang` but does not reverse the concept. | Index bounds and disabled Start/Complete states are correct. BM chrome leaks English. | PASS with LOW localisation issue |
| Nutrient tabs | Carbon/oxygen statements are accurate; water is too process-centric for SP 2.2.2. | Tab selection runtime-confirmed. | PARTIAL |
| Disturbance accordions | Deforestation/fossil-fuel science correct; fertiliser/eutrophication valid. Required water-overuse case omitted. | Accordion expansion runtime-confirmed. | FAIL (C2-H01) |
| Biome flip cards | Tropical/desert generic statements defensible; tundra visual wrong habitat; adaptation content insufficient. | Flip state is button-accessible; front/back both available in accessibility tree. | FAIL (C2-H02/H04) |
| MatchingPairs | All five pairs are scientifically correct. | Correct-pair completion reached 5/5. Wrong matches do not complete; completion callback fires only at all pairs; `awardOnce` prevents repeat XP. | PASS |
| Human-impact comparison | Source/effect/action summary broadly correct. | Both columns render. | PARTIAL by SP depth |
| Check Yourself | Hints are scientifically defensible. | Accordions are reachable; hints are hidden until opened. | PASS |
| Mini quizzes | Both keys/explanations correct. | Correct-only XP and one-award guard are correct. | PASS |

## Out-of-scope and enrichment classification

| Material | Classification | Reason |
|---|---|---|
| Fertiliser runoff/eutrophication | **VALID ENRICHMENT** | Scientifically valid ecosystem content, but not one of DSKP 2.2.3's three listed disturbance cases. It becomes release-impacting because it replaces excessive water use. |
| Energy pyramid | **VALID ENRICHMENT + MISGROUPED** | Valid science but not found in Chapter 2 DSKP/textbook scope reviewed; placed under nutrient cycles and assessed without live teaching/enrichment label. |
| PERHILITAN monkey sterilisation blog | **IN SCOPE textbook context** | Derived from the textbook chapter opening. |
| 5R | **IN SCOPE textbook support for 2.4.1** | Explicitly taught by the textbook as a human response. |

## Practicals, activities, and product features

| Item | Classification | Live Chapter 2 status |
|---|---|---|
| Build food web / discuss energy flow (Textbook Activity 2.1) | SUGGESTED ACTIVITY supporting mandatory 2.1.2 | Journey covers a chain only; no learner-built web. Not independently release-blocking, but contributes to partial interpretation coverage. |
| Multimedia nutrient-cycle links (Activity 2.2) | SUGGESTED ACTIVITY | Not present. Mandatory cycle outcomes can be met another way. |
| Ecosystem habitat/population/community field study (Activity 2.3) | SUGGESTED ACTIVITY | Not present. |
| Woodlouse temperature/light/humidity experiment (Experiment 2.1) | SUGGESTED ACTIVITY supporting adaptation/distribution | Only a one-sentence soil flip card in live notes; detailed content is in flashcard/dead notes. |
| Desert/tundra/tropical adaptation multimedia (Activity 2.4) | SUGGESTED ACTIVITY supporting mandatory 2.3.2 | Four flip cards are the product substitute, but do not meet the mandatory justification outcome. |
| Environmental stakeholder role play/forum (Activity 2.5) | SUGGESTED ACTIVITY supporting 2.4.1 communication | Not present. Source/effect/action notes provide partial alternative teaching. |
| AcadeMY Mini Investigation | PRODUCT FEATURE | Does not render for F2 C2 because of `isScienceDiscovery` guard. C2-M03. |
| Educational video | PRODUCT FEATURE | BM/DLP video metadata resolves and static placement is after notes. Content was not used as authority. |

## BM/DLP parity

| Surface | Result |
|---|---|
| Sections/order/block types | Exact parity |
| Notes meaning/examples | Strong semantic parity, including the same omissions and tundra visual |
| Journey/matcher/tabs/checks | Exact structural and semantic parity |
| Main quiz | 30 paired items, matching keys/difficulties/explanations |
| Mini quiz | 2 paired items, matching keys/explanations |
| Flashcards | 60 paired cards in identical set structure |
| Mind map | Matching node structure and content |
| UI labels | DLP coherent; BM leaks English in Journey/matcher and shared VideoBlock |

## Runtime verification

| Surface/check | Status | Evidence |
|---|---|---|
| Authenticated `/notes?subject=science&form=2&chapter=Chapter%202` | **NOT_REPRODUCED** | Direct route waited then redirected to `/login`. “Continue as guest” followed by reopening the route also redirected to `/login`. No credentials were used or bypassed. |
| Real served Chapter 2 component, BM | **RUNTIME_CONFIRMED** | Mounted via a temporary Vite-served harness using the real production component and data. Harness removed after inspection. |
| Real served Chapter 2 component, DLP | **RUNTIME_CONFIRMED** | Language switched to DLP; four matching sections and DLP content rendered. |
| All sections / direct stepper / Next / first Back / final state | **RUNTIME_CONFIRMED** | All four sections rendered; direct 2.2/2.4 navigation; Next 2.2->2.3; first Back disabled; final Next absent. |
| Journey | **RUNTIME_CONFIRMED for mount and controls; STATIC_ONLY for full step traversal** | Correct initial step/order and enabled/disabled navigation rendered; full traversal was not clicked. |
| Tabs / accordions | **RUNTIME_CONFIRMED** | Oxygen tab selected and deforestation accordion expanded with correct content. |
| MatchingPairs | **RUNTIME_CONFIRMED** | All five correct pairs completed to 5/5. |
| Flip cards | **RUNTIME_CONFIRMED for mount; STATIC_ONLY for all flip transitions** | All four cards and assets rendered; asset content visually inspected separately. |
| Embedded mini quizzes | **RUNTIME_CONFIRMED** | Both correct choices returned expected explanations and locked answered buttons. XP award conditions verified statically. |
| Mini Investigation | **STATIC_ONLY confirmed absent** | Route guard proof; authenticated route prevented visual observation. |
| Educational video | **STATIC_ONLY** | Registry and placement traced; authenticated route prevented iframe observation. |
| Mobile layout | **STATIC_ONLY** | Responsive grids, horizontal stepper overflow, and 44px controls are present; browser viewport could not be changed in the available runtime surface. |
| Console errors | **RUNTIME_CONFIRMED within component harness** | No uncaught component error appeared after successful mount. This does not certify the auth-blocked full route. |

Focused test result: `ScienceSectionedNotesShell`, `NotesContentWithVideo`, and `ScienceDiscoveryChrome` tests passed **8/8**. `npx tsc --noEmit` and `git diff --check` passed.

## Audit limitations

- **DLP textbook availability:** the source pack contains the official BM textbook only. DLP was judged by BM-authority alignment and BM/DLP semantic parity; official English textbook phrasing was not available.
- **Errata provenance:** `Errata.pdf` is a provenance-preserving verification record of a mirrored publisher-correction document, not an official-hosted original. It has no applicable Chapter 2 correction.
- **Authenticated route:** the live notes route redirected to login even after the guest link. Full shell/header/video runtime and production-auth state were not bypassed.
- **Runtime limits:** component-level served-module verification covered core interactions, but not session-state restoration, mobile viewport rendering, the full Journey traversal, all flip animations, or the video iframe.
- **Visual assets:** all four live Chapter 2 flip-card images and the chapter banner were inspected. The authenticated page composition itself was not available.
- **PDF extraction:** text extraction was checked against rendered pages. Poppler reported missing display-font substitutions for some fonts, but the relevant rendered content remained legible. Diagram semantics were manually inspected; OCR/extraction order may differ from visual reading order.
- **Official answers:** the textbook publishes selected Chapter 2 summative answers only (questions 1-4), not a complete answer key for every source exercise or any AcadeMY-generated item.

## Independent final verdict - frozen before comparison

**FAIL**

The chapter is not release-ready because mandatory DSKP content is materially untaught on the live notes surface and the sole tundra visual is scientifically misleading. The quiz banks are structurally sound and mostly accurate, but assessments and flashcards cannot compensate for missing live teaching.

---

## Comparison With Claude Deep Audit

The independent audit above was frozen before `SCIENCE_F2_CH02_DEEP_AUDIT_REPORT.md` was opened. Its pre-comparison SHA-256 was `94898CC18F3A86E214A590E7A84AABF256FD4D61C5EC366A4A04D5C5E31F6075`. The comparison below does not revise the independent findings, severities, counts, or verdict.

Claude reported **0 CRITICAL** and **4 HIGH** findings. Every Claude CRITICAL/HIGH finding is classified below.

| Claude ID | Claude finding | Classification | Independent evidence / difference |
|---|---|---|---|
| H-01 | SP 2.3.5 water supply, migration, and population-change teaching is absent from the live surface | **CONFIRMED** | Independently found as **C2-H03**. Both audits identify the entire mandatory SP as assessed in quizzes/flashcards but not taught live, while the missing material remains in bypassed notes. |
| H-02 | Food webs are named and assessed but have no worked live teaching or visual | **CONFIRMED** | Independently found as **C2-M05**. The factual diagnosis agrees; Codex rated it MEDIUM because the live check/hint at least defines the concept, while Claude rated the lack of a worked interpretive example HIGH. |
| H-03 | `karnivor primer` / `karnivor sekunder` terminology is absent from live notes | **CONFIRMED** | Independently found as **C2-M04**. The evidence and remedy agree; Codex rated the missing scoped terminology MEDIUM, while Claude rated it HIGH. |
| H-04 | Excessive water use is replaced by fertiliser runoff in the live SP 2.2.3 teaching | **CONFIRMED** | Independently found as **C2-H01**. Both audits agree that valid enrichment displaced an explicitly named DSKP case and that the correct case survives only outside the live teaching surface. |

No Claude CRITICAL/HIGH finding was classified **PARTIALLY CONFIRMED**, **NOT CONFIRMED**, or **NEEDS HUMAN REVIEW**.

### Codex-only findings

The following independently recorded issues were not substantively reported as Claude CRITICAL/HIGH findings. Where Claude discussed a neighbouring topic at a lower severity or in a coverage table, that distinction is noted.

| Codex ID | Severity | Codex-only contribution |
|---|---:|---|
| C2-H02 | HIGH | The live cards do not meet mandatory SP 2.3.2's **justify adaptation** verb: no representative plant adaptation and no feature/behaviour -> function -> survival reasoning. Claude flagged the missing woodlouse investigation at MEDIUM but did not identify this broader mandatory-outcome failure. |
| C2-H04 | HIGH | The Tundra card's seal-on-floating-sea-ice image depicts a polar-marine habitat rather than a tundra land biome. This materially conflicts with Claude's conclusion that the flip-card visuals were correct and that no scientifically wrong rendering was found. |
| C2-M02 | MEDIUM | The four-section migration is materially coarser than the Form 1 source-of-truth granularity, especially the overloaded 2.3 section. Claude called the sectioned-notes migration sound. |
| C2-M09 | MEDIUM | Quiz q12 and flashcard f47 incorrectly generalise faecal energy loss to **every** trophic level; producers do not produce faeces. Claude marked q12 verified without recording this overgeneralisation. |
| C2-L02 | LOW | The shared video block exposes English-only `Educational Videos` / `Watch and Learn` chrome in BM. |
| C2-L03 | LOW | DLP's repeated “a few communities” translation is unnecessarily restrictive compared with “several communities.” |

Other independent findings overlap Claude's MEDIUM/LOW findings or its assessment/coverage analysis and are therefore not claimed as Codex-only: the dead duplicate dataset, discovery/Mini Investigation gate, water-cycle and hierarchy compression, biological-control/population-factor partial coverage, energy-pyramid scope/grouping, quiz imbalance, English interaction chrome, and source bird-name divergence.

---

REPOSITORY LEARNER CONTENT MODIFIED: NO  
AUDIT ONLY: YES

TOTAL CRITICAL: 0  
TOTAL HIGH: 4  
TOTAL MEDIUM: 10  
TOTAL LOW: 4

FINAL VERDICT: FAIL
