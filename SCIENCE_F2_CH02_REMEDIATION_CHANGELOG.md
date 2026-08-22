# Sains Tingkatan 2 Bab 2 — Ekosistem · Remediation Changelog

**Date:** 2026-08-22
**Stage A plan:** `SCIENCE_F2_CH02_CONFIRMED_REMEDIATION_PLAN.md`
**Authorities:** `audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf` (hashes unchanged)

---

## Reconciliation

The DSKP settles which Catatan entries bind: printed p. 39 states the column carries both **Skop SK & SP** and **Cadangan aktiviti PdP**, and that "*Senarai aktiviti yang dicadangkan bukanlah sesuatu yang mutlak*". Scope statements and `Nota:` blocks are binding; suggested activities are not.

| Finding | Claude | Codex | Final Status | Reason |
|---|---|---|---|---|
| Excessive water use replaced by fertiliser | H-04 | C2-H01 | **CONFIRMED** | DSKP SP 2.2.3 names three disturbances as Skop. A regex sweep found **0** genuine excessive-consumption hits in either language; the one BM match was water *pollution* in §2.4. The mind map had it right, so the correct item was known. |
| SP 2.3.5 ecosystem changes absent | H-01 | C2-H03 | **CONFIRMED** | `bekalan air` → 0, `kemarau` → 0; the single `penghijrahan` hit was the tundra flip card teaching *adaptation*. Assessed by q18/q21/q23/q26 + 4 flashcards. |
| SP 2.3.2 adaptation materially untaught | M-09 (PARTIAL) | **C2-H02** | **CONFIRMED — HIGH** | **Codex is right; my audit under-rated this.** The SP verb is *mewajarkan* (justify). Four flip cards gave one generic climate sentence each, no plant adaptation, no feature→function→survival chain. |
| Tundra visual is polar-marine | — | **C2-H04** | **CONFIRMED — HIGH** | **Codex-only; I missed it.** Verified by opening the image: seal on sea ice, icebergs, aurora. Also **md5-identical to Chapter 1's `polar.jpg`** — a reused polar asset. |
| Food web insufficient | H-02 | C2-M05 | **CONFIRMED — HIGH** | 3 live occurrences: one keyword chip + one check Q&A. No worked web. Quiz referenced it 10×; textbook Latihan Sumatif 2 Q1(a) requires extracting chains from a web. |
| Carnivore terminology absent | H-03 | C2-M04 | **CONFIRMED — HIGH** | `karnivor|carnivor` → **0** in live data, both languages. Binding DSKP Nota; textbook Rumusan p. 41 uses the terms as consumer-level labels. |
| Section granularity too coarse | — | C2-M02 | **CONFIRMED** | §2.3 alone carried hierarchy, adaptation, 5 interaction types, biological control, population factors, 4 flip cards and a matcher. |
| Dead legacy notes duplicate source | L-08 | C2-M01 | **CONFIRMED** | Every missing item existed in `notes-*.ts`; the porting step was never performed. |
| Discovery gate excludes F2 C2 | M-07 | C2-M03 | **CONFIRMED** | `notes.tsx:373-376`. |
| Habitat undefined; water-cycle roles; biocontrol limits; 2.4.1 justification | M-01, M-03, M-05 | C2-M06, C2-M07 | **CONFIRMED** | Both audits agree. |
| Drought not under population factors | M-06 | (in C2-M07) | **CONFIRMED** | Live card said "cuaca"; DSKP Skop says *Kemarau*. |
| Disturbance solutions only generic | M-04 | C2-M06 | **CONFIRMED** | SP 2.2.3's verb is *menyelesaikan masalah*. |
| Fox vs Musang in food chain | M-08 | — | **CONFIRMED** | Textbook Rajah 2.2 p. 24 ends with **Musang**. Claude-only. |
| Energy pyramid out of scope + misgrouped | M-02 | C2-M08 | **CONFIRMED** | Absent from textbook Bab 2 and DSKP Bab 2; "piramid" appears in the DSKP only on printed p. 49 (Bab 3 Nutrisi). |
| **q12/f47: faeces at EVERY trophic level** | — | **C2-M09** | **CONFIRMED** | **Codex-only; I missed it.** Producers do not produce faeces. Textbook p. 24 separates movement/respiration/heat from undigested food. Keyed answer was still the only defensible option, so not a wrong-key CRITICAL. |
| Assessment imbalance | (SP table) | C2-M10 | **CONFIRMED** | 2.3.3 = 9/30; **2.3.2 = 0**; 2.2.2 and 2.2.3 = 1 each. |
| BM chrome leaks English | L-01 | C2-L01, C2-L02 | **CONFIRMED** | Journey, matcher `resetLabel`, VideoBlock. |
| `shuffledMatches` is a sort | L-02 | — | **CONFIRMED — deferred** | Deterministic order; task still non-trivial. |
| DLP "a few communities" | — | C2-L03 | **PARTIALLY_CONFIRMED — deferred** | Awkward, not wrong; live hit is `quizzes-dlp.ts:20`. |
| `burung kuntul kerbau` vs `bangau kendi` | L-03 | C2-L04 | **CONFIRMED — deferred** | Scientific name correct; common name diverges. |
| Any wrong answer key | none | none | **REJECTED (no defect)** | Both audits independently found zero; re-verified. |
| Any CRITICAL | 0 | 0 | **REJECTED (no defect)** | Both audits agree. |

Two of my MEDIUMs were promoted to HIGH on Codex's reasoning (adaptation; plus C2-H04, which I missed entirely), and two of Codex's MEDIUMs were promoted to HIGH on mine (food web, carnivore terminology). **Agreed HIGH set: 6.**

---

## Architecture Decision

The interactive sectioned notes remain the **sole** learner-facing architecture. `notes-bm.ts` / `notes-dlp.ts` were **not** rendered underneath — that would duplicate and bloat the surface. They were used **only as source material**, and are **retained on disk, byte-identical** (`git diff --quiet` clean), pending final QA.

---

## Section Mapping

**4 → 11 sections**, one per DSKP Standard Pembelajaran. Using the SP code as the section `number` gives unique React keys (two sections both numbered "2.1" would have collided) and makes the eyebrow exam-aligned.

| # | `number` | BM title | DLP title |
|---|---|---|---|
| 1 | `2.1.1` | Pengeluar, Pengguna dan Pengurai | Producers, Consumers and Decomposers |
| 2 | `2.1.2` | Rantai Makanan dan Siratan Makanan | Food Chains and Food Webs |
| 3 | `2.2.1` | Kitar Karbon dan Kitar Oksigen | The Carbon and Oxygen Cycles |
| 4 | `2.2.2` | Kitar Air | The Water Cycle |
| 5 | `2.2.3` | Gangguan Kitar Nutrien | Disruptions to the Nutrient Cycle |
| 6 | `2.3.1` | Saling Bersandaran dan Istilah Ekologi | Interdependence and Ecological Terms |
| 7 | `2.3.2` | Penyesuaian Hidupan | Adaptation of Living Things |
| 8 | `2.3.3` | Interaksi antara Organisma | Interactions Between Organisms |
| 9 | `2.3.4` | Faktor yang Mempengaruhi Saiz Populasi | Factors Affecting Population Size |
| 10 | `2.3.5` | Perubahan dalam Ekosistem | Changes in an Ecosystem |
| 11 | `2.4.1` | Peranan Manusia dalam Mengekalkan Keseimbangan Alam | The Role of Humans in Maintaining a Balanced Nature |

Order identical in both languages. No academic content was rewritten merely to create sections — existing blocks were redistributed and the missing required content added.

---

## Critical / High Fixes

**No CRITICALs existed.** All six agreed HIGHs are closed.

### A · SP 2.3.5 — ecosystem changes now taught (new section 2.3.5)
Three `causeEffect` chains, textbook p. 38:
- 💧 **Kekurangan bekalan air** — drought → paddy (producer) declines → consumers lose food → whole web affected
- 🕊️ **Migrasi** — seasonal movement → cattle egrets reach Kuala Gula Sept–Apr → they eat insects → grasshopper/cricket/spider/fly/earthworm populations fall
- 📈 **Perubahan saiz populasi** — one population shifts → linked populations shift → beetles/caterpillars rise → plant population falls

### B · SP 2.2.3 — excessive water use restored (new section 2.2.3)
The three DSKP-scoped disturbances now each carry a cause→effect chain **and a paired solution**:
- 🪓 Uncontrolled deforestation → *solution: replant, tighten forestry law*
- 🏭 Fossil-fuel burning → *solution: public transport, cleaner energy*
- 💧 **Excessive water use (agricultural + domestic)** → over-extraction → groundwater/river stores fall → less water for plants and animals → water cycle disrupted → *solution: conserve water, harvest rainwater, planned agriculture*

Fertiliser/eutrophication **retained but demoted** to an accordion explicitly headed *"⭐ Pengayaan (di luar skop DSKP Bab 2)"* / *"⭐ Enrichment (beyond DSKP Chapter 2 scope)"*, stating it is not one of the three listed disruptions.

### C · SP 2.1.2 — real food-web interaction
New `FoodWebDiagram` component (`src/components/notes/blocks/FoodWebDiagram.tsx`) — an SVG web, not a paragraph. Producers on the bottom row, arrows pointing **towards the eater** with an explicit note that this is the direction energy flows. Tapping an organism lights every chain through it; tapping a chain highlights it in the diagram. Chains are **computed from the edge set**, not hard-coded.

Organism set from textbook Rajah 2.3/2.4 (Kubis, Beluncas, Siput, Belalang, Burung, Katak, Ular), with edges authored to yield **exactly four chains** — matching the textbook's own question "*Bolehkah anda tulis **empat rantai makanan**…*":

```
Kubis → Beluncas → Burung → Ular      Kubis → Belalang → Burung → Ular
Kubis → Siput    → Burung → Ular      Kubis → Belalang → Katak  → Ular
```

The arrow geometry of Rajah 2.3 cannot be recovered from PDF text extraction, so the edges are **authored to be scientifically correct using the textbook's organisms and chain count**, not presented as a pixel-copy. Stated so the choice is auditable.

### D · SP 2.1.1 — carnivore terminology
Consumer cards now read **"Pengguna sekunder (karnivor primer)"** and **"Pengguna tertier (karnivor sekunder)"** / "Secondary consumer (primary carnivore)", "Tertiary consumer (secondary carnivore)", each explaining *why* it carries that name, matching textbook p. 23 and Rumusan p. 41. Added to `keywords` and to a check question.

Also fixed here: the food-chain Journey now ends with **Musang / Civet** (textbook Rajah 2.2), replacing the non-native "Rubah / Fox".

### E · SP 2.3.2 — adaptation now justified, not just described
New `AdaptationBlock` type and renderer. Three tabbed habitats, each with **challenge → adaptation → function → survival advantage**, and **both an animal and a plant**:

| Habitat | Challenge | Animal | Plant |
|---|---|---|---|
| Tropika | Heavy rain, abundant light, competition for light, waterlogged soil | Monkey — long limbs/strong tail → canopy movement → reaches food away from ground predators | Rainforest tree — broad leaves with drip tip → max light + fast drainage → photosynthesis without leaf rot |
| Gurun | Extreme heat, cold nights, very little rain; water loss is the threat | Camel — fat-storing hump, water-loss tolerance → energy store without whole-body insulation → survives long crossings | Cactus — leaves reduced to spines, thick stem → tiny surface area, very low transpiration → stored water lasts the dry season |
| Tundra | Long winter, extreme cold, short summer, frozen ground, strong wind, treeless | Arctic fox — thick fur, subcutaneous fat, **small ears**, white winter coat → insulation, reduced heat loss, camouflage → steady body temperature, hunts unseen | Mosses & lichens — low, ground-hugging, no tall woody stem → avoids wind, traps warmth near ground → lives on shallow frozen ground where trees cannot root |

A card also carries the environmental-factor/distribution point (temperature, light, humidity) from the woodlice investigation, labelled as a textbook **suggested activity** rather than a mandatory outcome.

### F · Tundra image replaced
`tundra.jpg` (seal on sea ice, byte-identical to Ch1's `polar.jpg`) → new **`tundra-land.svg`**: treeless plain, low hills with lingering snow patches, patterned permafrost ground, moss cushions, lichen crusts on rock, dwarf shrubs, cotton grass, an **arctic fox** and a **ptarmigan**. No sea ice, ocean, icebergs or seal. Visually verified after authoring.

The asset is **language-neutral** — an initial BM caption was removed, since BM and DLP share the file and the FlipCard/tab supplies the localised label.

---

## Medium Fixes Included

| P1 item | What was added |
|---|---|
| Habitat definition | Section 2.3.1 now teaches all **five** DSKP terms — Spesies, Populasi, Komuniti, **Habitat**, Ekosistem — numbered 1–5 |
| Water-cycle organism roles | Section 2.2.2 adds a "Role of living things" tab (transpiration; animal respiration, sweating, excretion) plus three cause→effect chains: transpiration, **roots gripping soil / slowing runoff**, **leaf litter reducing evaporation** |
| Drought under population factors | Section 2.3.4 names **Kemarau (perubahan cuaca)** explicitly, with the dry-soil → forest-fire → population-fall chain |
| Biological-control long-term limits | Section 2.3.3 promotes this from a check hint to its own accordion: slow to act, and ecosystem balance may be disturbed because a new species is introduced |
| Stable/productive ecosystem justification | Section 2.4.1's intro now *justifies* rather than asserts — naming food, clean water, safe air, raw materials and medicines as what a stable ecosystem supplies |
| Disturbance solutions tied to each problem | Each of the three chains in 2.2.3 carries its own `note` solution line |
| Saprofitisme | Named in the decomposer card (textbook p. 22) |
| Ecosystem balance / natural vs man-made | Section 2.3.1 comparison block |

---

## Energy Pyramid Decision

**Option A adopted** — retained as clearly labelled optional enrichment, regrouped, and removed from the scored bank.

| Surface | Before | After |
|---|---|---|
| Mind map | Node under **2.2 Kitar Nutrien** (misgrouped) | Removed from 2.2; re-added under **2.1 energy flow** as `[Pengayaan]` / `[Enrichment]` |
| Main quiz q29 | Scored energy-pyramid question | **Repurposed** into a food-web interpretation item (SP 2.1.2) |
| Flashcard f40 | Unlabelled | Front prefixed `[Pengayaan — di luar skop Bab 2]` / `[Enrichment — beyond Chapter 2 scope]`; back notes the term appears in neither the DSKP nor the Chapter 2 textbook |

Net effect: the concept survives as enrichment, is correctly grouped under energy flow, and no longer appears in the mandatory scored Chapter 2 quiz bank.

---

## Assessment Rebalance

Banks stay at **30 BM + 30 DLP** — no regeneration. Four targeted substitutions plus two precision edits.

| Item | Was | Now | SP move |
|---|---|---|---|
| q9 | "What is biological control?" (definition, duplicated q20/q22) | Cactus spines — why leaves are reduced | 2.3.3 → **2.3.2** |
| q16 | Predator-prey vs competition | Arctic fox small ears — *justify* why the adaptation matters | 2.3.3 → **2.3.2** |
| q24 | Commensalism vs mutualism (duplicated q7/q15) | Excessive river extraction for irrigation → water-cycle disruption | 2.3.3 → **2.2.3** |
| q29 | Energy pyramid (out of scope) | Food-web interpretation — count the chains | out-of-scope → **2.1.2** |
| q12 | "…heat and **faeces at every trophic level**" | "…heat through respiration and movement at every level, **and through faeces in consumers**" | precision (C2-M09) |
| f47 | Same overgeneralisation | Same correction, adding "Producers have no faecal loss" | precision (C2-M09) |

### SP distribution before → after

| SP | Before | After | Status |
|---|---:|---:|---|
| 2.1.1 | 3 (10%) | 3 (10%) | Adequate |
| 2.1.2 | 2 (7%) | **3 (10%)** | Improved — now includes web interpretation |
| 2.2.1 | 2 (7%) | 2 (7%) | Adequate |
| 2.2.2 | 1 (3%) | 1 (3%) | Still light *(see Remaining)* |
| 2.2.3 | 1 (3%) | **2 (7%)** | Improved |
| 2.3.1 | 2 (7%) | 2 (7%) | Adequate |
| **2.3.2** | **0 (0%)** | **2 (7%)** | **NOT ASSESSED → assessed** |
| 2.3.3 | 9 (30%) | **6 (20%)** | Over-weighting reduced |
| 2.3.4 | 2 (7%) | 2 (7%) | Adequate |
| 2.3.5 | 4 (13%) | 4 (13%) | Now **taught** as well as assessed |
| 2.4.1 | 3 (10%) | 3 (10%) | Adequate |
| out-of-scope | 1 | **0** | Energy pyramid removed |

BM/DLP `answerIndex` parity re-verified: **30/30 identical, 0 mismatches.**

---

## Image Replacement

| | Before | After |
|---|---|---|
| File | `tundra.jpg` (31.9 KB) | `tundra-land.svg` (6.4 KB) |
| Depicts | Seal on floating sea ice, icebergs, open ocean, aurora | Treeless plain, low hills with snow patches, permafrost polygon ground, moss, lichen on rock, dwarf shrubs, cotton grass, arctic fox, ptarmigan |
| Provenance | md5-identical to Chapter 1's `polar.jpg` — a reused polar-marine asset | Purpose-authored, language-neutral, scalable |
| Runtime | — | Confirmed rendering as `tundra-land.svg` in the live Tundra tab, both languages |

`tundra.jpg` was **left on disk** (still correctly used by Chapter 1 as "Kawasan Kutub / Polar regions"); only Chapter 2's reference changed.

---

## BM/DLP Verification

| Dimension | Result |
|---|---|
| Section count / numbers / order | ✅ 11 / 11, identical `2.1.1 … 2.4.1` |
| Block counts (foodWeb / adaptations / causeEffect) | ✅ 1 / 1 / 4 in both |
| Food-web chains | ✅ 4 in both, same topology |
| Adaptation tabs | ✅ Tropika·Gurun·Tundra / Tropical·Desert·Tundra |
| Quiz bank size + answer keys | ✅ 30/30, 0 `answerIndex` mismatches |
| Flashcards | ✅ 60 / 60 |
| Mini quizzes | ✅ Identical semantics and keys (both were already correct; unchanged) |
| Journey final step | ✅ Musang / Civet |
| Matcher reset label | ✅ "Set semula" / "Reset" |
| Journey chrome | ✅ "Kemajuan perjalanan"/"Selesai" · "Journey progress"/"Complete" |
| Tundra asset | ✅ Same `tundra-land.svg`, language-neutral |

Every remediated structure is at parity; no semantic drift introduced.

---

## Runtime QA

Dev server started with the repo's own `npm run dev` (serves on **port 8080**; `.claude/launch.json` says 5173 — a pre-existing mismatch, left alone).

**Authentication limitation, stated plainly:** `/notes?subject=science&form=2&chapter=Chapter%202` redirects to `/login`. No credentials were available and none were entered, so the **authenticated route** (chapter header, XP persistence, reading-progress) is **STATIC_ONLY**. Everything below is **RUNTIME_CONFIRMED at component level**, driven against the real modules served by Vite.

| # | Check | BM | DLP |
|---|---|---|---|
| 1 | Every section reachable | ✅ 11 steppers, all 11 walked | ✅ |
| 2 | No content lost | ✅ every section 1,025–2,533 chars, all carry checks | ✅ |
| 3 | No duplicate legacy notes | ✅ legacy markers absent | ✅ |
| 4 | Food web visible and understandable | ✅ 4 chains listed, clickable; **screenshot verified**: producer at bottom, arrows pointing to the eater, tiers stacked correctly | ✅ 4 chains |
| 5 | Carnivore terms visible | ✅ primer + sekunder | ✅ |
| 6 | Excessive-water-use content visible | ✅ with paired solution | ✅ |
| 7 | Adaptation teaching visible | ✅ challenge/adaptation/function/benefit all render, animal + plant | ✅ |
| 8 | Tundra image is a land habitat | ✅ `tundra-land.svg` in the live tab | ✅ |
| 9 | Ecosystem-change block visible | ✅ section 2.3.5 | ✅ |
| 10 | Migration / water / population taught | ✅ all three chains | ✅ |
| 11 | BM/DLP parity | ✅ see table above | ✅ |
| 12 | Quizzes remain valid | ✅ 30/30, keys parity, no out-of-scope item | ✅ |
| 13 | Mini quizzes remain correct | ✅ both keys unchanged and correct | ✅ |
| 14 | No console errors | ✅ none | ✅ |
| 15 | Videos remain below notes | ✅ `NotesContentWithVideo.tsx:42` renders `VideoBlock` after the content div | ✅ |
| 16 | Responsive section navigation | ✅ 11 steppers in `overflow-x-auto`; food-web SVG capped at `max-w-[420px]` inside `overflow-x-auto`; verified at a 460 px-wide viewport | ✅ |

Two probe results initially looked like failures and were **investigated rather than accepted**: the "Musang" miss was the Journey rendering only its current step, and the missing adaptation labels were a CSS `text-transform: uppercase` artifact in `innerText`. Both re-verified and confirmed correct.

---

## Automated Tests

| Command | Result | Notes |
|---|---|---|
| `npx tsc --noEmit -p tsconfig.json` | **exit 0** | Clean. (Repo has no `typecheck` script; `vite build` does not typecheck.) |
| `npm run build` | **exit 0** | Full pipeline through pages-worker. |
| `npm test` (`vitest run`) | **1374 passed, 7 failed (165 files)** | **All 7 pre-existing and unrelated** — BM mind-map registration ×4, Math F2 C1 objective routing, `billing-core`, `invoice-pdf.server`. Same seven proven pre-existing during the Chapter 1 remediation by stashing and re-running against a clean tree. None touch Science F2 C2. |
| `npm run audit:quizzes` | 18 criticals | **All Math Form 1 ch. 3/4/5, pre-existing.** No critical for `science:form-2:chapter-2`. |
| `npx eslint` on changed files | **0 non-formatting errors** | The repo-wide CRLF-vs-prettier mismatch remains pre-existing and unrelated. |

Build side-effect `src/lib/content-stats.generated.ts` was regenerated with LF only (empty content diff) and restored.

---

## Files Modified

| File | Change |
|---|---|
| `src/content/form2/science/interactive-types.ts` | +`FoodWebNode`, `FoodWebBlock`, `CauseEffectItem/Block`, `AdaptationOrganism/Case/Block`; +3 optional section fields |
| `src/components/notes/blocks/FoodWebDiagram.tsx` | **NEW** — food-web SVG with computed chains |
| `src/assets/notes/form2-science/chapter-2/tundra-land.svg` | **NEW** — tundra land-biome visual |
| `src/components/notes/ScienceF2InteractiveNotesBlock.tsx` | Renders `foodWeb`, `adaptations`, `causeEffect`; passes `lang` to Journey and `resetLabel` to MatchingPairs |
| `src/components/notes/blocks/Journey.tsx` | Optional `lang` prop (English default) |
| `src/components/notes/VideoBlock.tsx` | Optional `lang` prop (English default) |
| `src/components/notes/NotesContentWithVideo.tsx` | Optional `videoLang` pass-through |
| `src/routes/notes.tsx` | `isScienceF2C2` added to `isScienceDiscovery`; honest header meta (11 modules, 1 investigation); `videoLang` on the science route |
| `src/content/form2/science/chapter-2/interactive-bm.ts` | Rebuilt: 11 sections, all P0/P1 content |
| `src/content/form2/science/chapter-2/interactive-dlp.ts` | Same, mirrored |
| `src/content/form2/science/chapter-2/quizzes-bm.ts` | q9/q16/q24/q29 substitutions; q12 precision |
| `src/content/form2/science/chapter-2/quizzes-dlp.ts` | Same |
| `src/content/form2/science/chapter-2/flashcards-bm.ts` | f47 precision; f40 enrichment label |
| `src/content/form2/science/chapter-2/flashcards-dlp.ts` | Same |
| `src/content/form2/science/chapter-2/mindmap-bm.ts` | Energy pyramid moved 2.2 → 2.1 as enrichment; energy-loss precision |
| `src/content/form2/science/chapter-2/mindmap-dlp.ts` | Same |

**Blast radius.** All new types are optional, so chapters 3–13 and Geography F2/F3 are unaffected structurally. `Journey`, `VideoBlock` and `MatchingPairs` gained optional props defaulting to current behaviour — **no existing caller changes**. The one deliberate cross-chapter effect: `ScienceF2InteractiveNotesBlock` now passes `lang` to Journey/MatchingPairs, so **BM chrome improves for all Form 2 science chapters** — an improvement, not a regression, disclosed here because it is visible beyond Chapter 2. The discovery gate was scoped to Chapter 2 only, deliberately **not** widened to every `sciF2InteractiveData` chapter.

---

## Remaining Non-Blocking Items

1. **SP 2.2.2 still has only 1 quiz item** — improving it would have required a fifth substitution beyond the agreed targeted scope.
2. `shuffledMatches` in `MatchingPairs.tsx:16-18` is an alphabetical sort, not a shuffle (deterministic order).
3. DLP "a few communities" (`quizzes-dlp.ts:20` + flashcards) — "several communities" reads better.
4. `burung kuntul kerbau` vs textbook `burung bangau kendi` for *Bubulcus ibis* (quiz q18, flashcard f44).
5. Mini-quiz renderer styles only the chosen option, so a wrong pick does not also highlight the correct one.
6. `.claude/launch.json` declares port 5173; the dev server serves on 8080.
7. Video chrome is localised only on the science route; BM-language subjects (Sejarah, BM, Geografi) still show English headings.
8. `notes-bm.ts` / `notes-dlp.ts` remain on disk, unreferenced. When retired, the registry `notes:` entries on both Chapter 2 rows should be removed too.
9. Textbook Aktiviti 2.3 (field study) and 2.5 (role play) have no product surface — both are *Cadangan aktiviti*, so neither is a blocker.
10. Repo-wide CRLF-vs-prettier lint debt and the 7 pre-existing unrelated test failures.

**Human review still open:** the energy-pyramid decision (Option A applied, reversible to Option B); the absent DLP textbook (DLP validated by translation equivalence only); the errata's undated non-KPM provenance; and the food-web edge set, which is authored from the textbook's organism set and chain count rather than a verified copy of Rajah 2.3's arrows.

---

CONFIRMED CRITICAL REMAINING: **0**
CONFIRMED HIGH REMAINING: **0**

UNRELATED CHAPTERS MODIFIED: NO
LEGACY NOTES FILES DELETED: NO
GLOBAL REWRITE PERFORMED: NO
