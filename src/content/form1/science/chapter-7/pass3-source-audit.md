# Chapter 7 Pass 3 — source audit

Scope: 7.3 Air Pollution / Pencemaran Udara and final chapter review only. Chapters 1–6 and the approved 7.1/7.2 implementation are locked.

## Evidence

- BM: supplied `T1 BT SN- SAINS.pdf`, printed pp. 195, 208–212; Figure 7.12 on p. 209 was checked as a rendered page, not inferred from extraction order. Printed p. 217 was checked for the legacy cave question.
- DLP: [Science Form 1 textbook facsimile](https://fliphtml5.com/bjsfz/tpck/Science_Form_1/), printed pp. 195, 208–212, 213 and 217. [Actual Figure 7.12 page image](https://online.fliphtml5.com/bjsfz/tpck/files/large/220.webp) was visually inspected to verify the connections. It is the same facsimile used in prior passes; no new curriculum reference was substituted.
- API boundaries were checked against the actual BM opening-page image. The final band is **>300**, not 300 alone.
- No current API readings, legislation, health guidance or modern environmental-policy claims were fetched or added.

## Canonical corrections

| Area | Previous implementation | Source finding and implementation |
| --- | --- | --- |
| Definition | Broad independent supplement definition about chemicals, particles and biological contaminants | Replaced with each edition's p. 208 definition. BM retains its longer wording about harm/discomfort to humans/other organisms and environmental damage. DLP retains its own shorter definition. No invented standalone pollutant definition. |
| Vehicles / factories | Missing dust; chemical abbreviations substituted for names | Restored all seven Figure 7.12 pollutants: smoke, soot, dust, carbon monoxide, sulphur dioxide, nitrogen dioxide and plumbum, with edition terminology. The DLP figure itself uses **plumbum**; its health panel uses **lead particles**. Both usages are preserved. |
| Burning / cigarettes / forest fires | Same three pollutants in both languages | DLP has dust, soot, smoke. BM additionally has **zarah logam**. Do not insert metal particles into the DLP figure. |
| Construction / asbestos / limestone quarries | BM copied soot from English | BM actual label is **habuk dan debu**. DLP actual label is **dust, soot**. Source names are restored in full. |
| Agriculture / plantations | BM aerosol wording | BM is **bahan semburan pestisid**, **baja kimia**. DLP is **aerosol spray**, **chemical fertilisers**. These are genuine edition differences. |
| Nuclear plants | Radioactive materials | Confirmed; retained. No invented health-effect connection added. |
| Appliances / electronics | Abbreviated source names and CFC | Restored air-conditioners, refrigerators, aerosol sprays and electronic factories, and full pollutant name from Figure 7.12. BM uses **alat pendingin udara**. |
| Health | Compressed phrases; BM smoke/dust | Restored all five Figure 7.13(a) statements. BM uses **asap dan jelaga**; DLP uses **smoke and dust**. Source language for carbon-monoxide, asbestos and lead effects is retained without modernisation or extra medical mechanisms. |
| Buildings / plants | Compressed fragments | Restored all three statements in each group. Acid rain affects concrete/limestone, iron, soil and aquatic water. Smoke/haze reduces sunlight and photosynthesis. No pH, equations or additional mechanisms. |
| Climate | Abbreviations and compressed arrows | Restored four separate source relationships: smoke → haze; excessive carbon dioxide → greenhouse effect; excessive CFC → ozone thinning; sulphur dioxide and nitrogen dioxide → acid rain. |
| Controls | Shortened generic checklist labels | Restored Figure 7.13(b)'s three headings and all 4 law, 4 education and 5 science/technology measures. HCFC replacing CFC remains the textbook treatment. No modern policy substitution or invented fine amounts. |
| Activity 7.5 | Missing from live 7.3 | Added discussion and class presentation. Kuala Lumpur **2015** is explicitly identified as textbook context. No apparatus or current conditions implied. |
| Activity 7.6 | Missing from live 7.3 | Added group selection of a Malaysian area, research on health/animals/plants/buildings/infrastructure and authority actions (Jabatan Alam Sekitar), followed by presentation. No area or current data is supplied on the students' behalf. |
| API/IPU | Array of bands only | All five verified bands retained with range and label, plus the user-requested textbook-level guide statement. Responsive scale; no live dashboard language. |
| Formative Practice 7.3 | Missing | All six p. 212 tasks restored. Questions 1–4 remain discussion questions, without invented model answers. Question 5 uses the three source matches. Question 6 has correct choices a, b, d; c and e are incorrect. |
| Practice edition difference | Risk of forced literal parity | DLP choice (e) says petrol and diesel containing lead; BM says **minyak dan petrol berplumbum**. Each edition is preserved. |
| Cave recall | Standalone answer asserted unsafe oxygen levels, flickering and early warning | The question **does exist** in Summative Practice 7, question 6, printed p. 217. That question also asks whether carrying a torch is a good idea and requests a safer alternative. The legacy answer is not established by the checked source and omits that critical context. Removed the standalone item from live 7.3 rather than representing it as core pollution teaching or inventing an answer. This audit does not claim the original question is absent from the textbook. |
| Review | Blood-oxygen mechanism, promotional headings and generated summary prose | Removed unsupported blood-oxygen explanation and invented slogans. Review facts reference canonical Figure 7.13(a) climate statements; keywords follow the textbook chapter-opening list; summary uses the three official chapter headings. |

## Data ownership and visual interpretation

`bab7-content.ts` owns `pollution.definition`, `sources`, `activity75`, `effects`, `pathways`, `photosynthesis`, `controls`, `activity76`, `api` and `practice`. Visual components contain geometry, state and presentation mappings only. Top-level legacy arrays are references to these records, not independent copies. `bab7Supplement` remains a compatibility adapter to the canonical definition and an empty recall array; it contains no independent factual text.

The worked source → pollutant → effect → control strip uses the factory / smoke / haze relationship and the source's factory-chimney filter measure. It does not imply a filter removes every pollutant or invent direct effects for nuclear/agricultural examples. Other effects and controls remain in their textbook groupings.

Diagrams are schematic: no radiation behaviour, chemical equations, medical mechanisms, infrared/UV physics or measured air readings are encoded. Labels alongside diagrams are extracted words/phrases from the canonical statements. Source headings are retained. Activity numbering and question numbering remain visible.

Presentation-only additions explicitly authorised by the brief: the historical “Textbook context: Kuala Lumpur, 2015” qualifier, the API guide statement, and equivalent BM copy. Generic interface controls (“Check answers”, “Choose an effect”, “Correct”, “Try again”, and BM counterparts) are not textbook quotations. Diagram labels split existing source relationships into stages; they add no scientific claims.

UNSOURCED LEARNER-FACING SCIENTIFIC CONTENT ADDED: NONE.

## Locked baseline (SHA-256)

Component hashes normalize CRLF to LF. Data hashes serialize the existing canonical records without changing their property order. They were captured **before** Pass 3 edits.

| Protected record | Hash |
| --- | --- |
| Chapter7AirComposition.tsx | `1fae01ab2ba68bd943122bde98c33590a93c080ab99e76d27caf160d43b5f24c` |
| Chapter7Combustion.tsx | `5d04f9eca0b4222190e6221275fba5b25b944cb4fdb0a11cdb6e3c32425d9cc0` |
| DLP 7.1 (airLesson, hook, composition, experiment, uses, cycles) | `fccd4fe42abca059ec47002e2441eef562d2a5e31c4cdda98a564dab9bc04845` |
| BM 7.1 (same keys) | `d5c75650d83564ed67ae45b26ee927eeb095a8b819085963053a52a304f98631` |
| DLP combustion | `5498a3f0332402f9d247f3f2f591449872bc906ea46cf471d70b4f62e87fb002` |
| BM combustion | `e6bd38e1315b86aec0f4a18be8252576b93a3ba576ec49cf6dcc9a54e5b77ffd` |

Earlier Pass 1/2 tests formerly froze deferred 7.3 content. Those assertions now freeze approved 7.1 data; Pass 3 additionally freezes 7.2 data and both visual files. Their scientific/interaction checks remain intact.

## Remaining limitations

No unresolved core 7.3 source conflict: edition differences are deliberately preserved. The cave question's complete model answer was not verified, so no answer is presented. Open-response Practice 7.3 questions are not automatically marked. This is textbook alignment, not a contemporary environmental-policy update.

## Final validation

- Chapter 7 Pass 1: **43/43** tests passed.
- Chapter 7 Pass 2: **37/37** tests passed.
- Chapter 7 Pass 3: **42/42** tests passed, including source selection, matching, checkbox feedback, all six protected hashes, canonical ownership, and BM/DLP SVG parity for every source-selection state.
- Chapter 7 integration: **2/2** tests passed. Total: **124/124**.
- Targeted ESLint: passed for all seven changed/new TypeScript files.
- Production build: passed after the final SVG changes; final Chapter 7 output chunk contains the iron/soil/water geometry.
- `tsc --noEmit`: blocked by the same two pre-existing, unrelated Form 2 errors (`string | undefined` passed to `string`): `chapter-7-9-10-visual-integration.test.tsx:305` and `chapter-9-heat-visuals.test.tsx:523`. No Chapter 7 errors; those files were not edited.
- All source/effect/control SVGs were rendered and visually inspected. The browser connector reported no available browsers, so full desktop/mobile browser inspection was unavailable. Text stays in HTML; source rows and all API bands remain readable through responsive layouts rather than shrinking SVG text.
- Chapters 1–6 and the two approved Chapter 7 visual files have no edits. The pre-existing `src/routeTree.gen.ts` change was left alone. Nothing was committed, pushed or deployed.
