# VISUAL IMPLEMENTATION CHANGELOG — Science Form 2, Chapters 1–3 (BM + DLP)

**Date:** 2026-08-25
**Scope:** Targeted visual implementation pass. No chapter content was rewritten, no images were
regenerated, no other subject or chapter was touched.
**Status:** Chapters 1–3 are **not frozen** — a final browser-level visual QA pass is still pending.

---

## Asset placement

All 15 approved WebP files were extracted and placed in the **existing** notes asset structure, using
the existing bundled-import convention (`src/assets/...` import → Vite URL → `getNotesImageUrl`).
No parallel asset system was introduced and no file was renamed.

```
src/assets/notes/form2-science/chapter-1/  chapter1_animal_classification_overview.webp
                                           chapter1_five_vertebrate_groups.webp
                                           chapter1_invertebrate_classification.webp
                                           chapter1_plant_classification.webp
                                           chapter1_dichotomous_key_organism_set.webp
src/assets/notes/form2-science/chapter-2/  chapter2_carbon_oxygen_cycle.webp
                                           chapter2_water_cycle.webp
                                           chapter2_tropical_adaptation.webp
                                           chapter2_desert_adaptation.webp
                                           chapter2_tundra_adaptation.webp
src/assets/notes/form2-science/chapter-3/  chapter3_digestive_system.webp   (new directory)
                                           chapter3_food_tests.webp
                                           chapter3_villus_absorption.webp
                                           chapter3_visking_tubing.webp
                                           chapter3_digestion_pathways.webp
```

Build output confirms all 15 are bundled and hashed.

## The one shared visual component

[`AnnotatedImage.tsx`](src/components/notes/blocks/AnnotatedImage.tsx) is the single wrapper used by
every image in all three chapters — no second implementation pattern was created.

It supports: `src`, `alt`, percentage-positioned overlay labels, `chip` or `hotspot` presentation,
`aspect`, `caption`, `legendLabel`, and a numbered-marker + legend fallback. **No text is baked into
any artwork** — every label, alt string and caption comes from chapter content, so BM and DLP share
one image file each.

Three behaviours were added during QA in response to measured defects (see *Visual QA* below):

- **Edge-aware anchoring.** A label near a frame border anchors by its nearest edge instead of its
  centre, so a wrapped BM label can never spill outside the image.
- **CSS-driven mobile fallback.** Chip figures with more than five labels render chips from the `sm`
  breakpoint up and numbered markers + legend below it. This is done in CSS rather than by measuring
  the box, because `ResizeObserver` proved unreliable in the embedded preview — the CSS route also
  works before hydration.
- **Smaller markers on phones** (20 px, 24 px from `sm` up).

Existing components were reused rather than replaced: `ClassificationTree`, `DichotomousStarMap`,
`Journey`, `Tabs`, `PyramidDiagram` and the sectioned-notes shell are all untouched in behaviour.

---

## Chapter 1 — Biodiversity

### Images added

| Image | Section | Mode | Labels |
|---|---|---|---|
| `chapter1_animal_classification_overview.webp` | Animal classification, above the classification tree | chip (4) | Vertebrata / Invertebrata / Ada tulang belakang / Tiada tulang belakang |
| `chapter1_five_vertebrate_groups.webp` | Animal classification, below the tree | chip (5) | Ikan · Amfibia · Reptilia · Burung · Mamalia |
| `chapter1_invertebrate_classification.webp` | Animal classification, below the tree | hotspot (4) | Tiada kaki + badan tidak bersegmen / Tiada kaki + badan bersegmen / 3 pasang kaki / Lebih daripada 3 pasang kaki |
| `chapter1_plant_classification.webp` | Plant classification, above the tree | chip (4) | Lumut · Paku pakis · Konifer · Tumbuhan berbunga |
| `chapter1_dichotomous_key_organism_set.webp` | Dichotomous-key section, above the interactive key | chip (8) | Ikan · Katak · Cicak · Burung · Kucing · Rama-rama · Labah-labah · Siput |

DLP carries the exact mirror set (Vertebrates / Backbone present / Fish / Amphibians / Moss / Fern /
Conifer / Flowering plant, etc.).

The invertebrate image uses hotspot mode because its four classification rules are long phrases; badges
sit at the top of each panel so no organism is covered. Detailed facts stay in the existing cards — the
images carry group names only.

### Dichotomous-key integration — deviation from the brief, please review

The brief preferred making the organism set **selectable and highlight/dim-linked to the interactive
key**. That is not implementable with this asset without teaching something false, so it was not done:

- The key's five leaves are **Ikan Bawal, Ayam, Singa, Katak, Ular**
  ([interactive-bm.ts:367](src/content/form2/science/chapter-1/interactive-bm.ts:367)).
- The supplied sprite sheet contains **fish, frog, lizard, bird, cat, butterfly, spider, snail**.
- Only *frog* matches outright. Mapping **Singa → the domestic cat** and **Ayam → the songbird** would
  label the artwork with organisms it does not depict, and **Ular has no cell at all**.

What was implemented instead — explicitly permitted by the brief's *"use the organism set as the visual
reference inside the existing interactive dichotomous-key activity"*: the set renders as a labelled
**feature reference** directly above the key, captioned *"Rujukan ciri: bandingkan tulang belakang,
litupan badan dan bilangan kaki sebelum menjawab…"*. Each organism is labelled with what it actually is.

**The key's logic was not touched.** It remains name/trait-based, contains no positional wording, and
was verified end-to-end at runtime (Poikiloterma → Kulit bersisik → Ada sirip → identifies *Ikan Bawal*;
restart still present).

To get the preferred selectable behaviour, the organism set needs to be re-cut to the key's five
organisms (pomfret, chicken, lion, frog, snake). `DichotomousStarMap` would then need one new optional
prop — the wiring is small once the artwork matches.

### Mobile status

Clean at 375 px in both languages. The 8-label organism set auto-falls back to numbered markers +
legend; the other four keep chips. No label outside its image, no overlaps, no horizontal page overflow.

---

## Chapter 2 — Ecosystem

### Carbon and oxygen cycle

`chapter2_carbon_oxygen_cycle.webp` added to section 2.2.1, hotspot mode, 8 labels:
Cahaya matahari · Karbon dioksida · Oksigen · Fotosintesis · Respirasi · Pemakanan · **Penguraian** ·
**Pembakaran** (Sunlight · Carbon dioxide · Oxygen · Photosynthesis · Respiration · Feeding ·
Decomposition · Combustion).

Decomposition and combustion are kept as **separate** processes with separate markers and notes.
**No arrows were drawn in code** — every overlay explains a flow the artwork already shows.

### Water cycle

`chapter2_water_cycle.webp` added to section 2.2.2, hotspot mode, 8 labels:
Penyejatan · Kondensasi · Hujan · Larian permukaan · Resapan · Air bawah tanah · Penyerapan oleh akar ·
Transpirasi (Evaporation · Condensation · Precipitation · Surface runoff · Infiltration · Groundwater ·
Root uptake · Transpiration). **The deer carries no label** — it is supporting context only.

### Adaptation images replaced

The three old rasters were **replaced, not duplicated**. The `challenge → adaptation → function →
advantage` teaching structure and the existing Tropika / Gurun / Tundra tabs are unchanged; the images
support that text rather than replacing it.

| Tab | Was | Now | Labels |
|---|---|---|---|
| Tropika / Tropical | `tropical.png` (1.8 MB) | `chapter2_tropical_adaptation.webp` | Tangan mencengkam · Kaki mencengkam · Anggota panjang · Daun lebar · Hujung titis |
| Gurun / Desert | `desert.jpg` | `chapter2_desert_adaptation.webp` | Bonggol · Bulu mata panjang · Kaki panjang · Tapak kaki lebar · Duri · Batang tebal · Akar cetek yang meluas |
| Tundra | `tundra-land.svg` | `chapter2_tundra_adaptation.webp` | Bulu tebal · Telinga kecil · Badan padat · Tumbuhan rendah · Lumut dan liken |

The monkey's tail is **not** labelled prehensile. The ptarmigan in the tundra artwork is **not**
labelled — the lesson stays on the Arctic fox and tundra vegetation.

Also fixed here: adaptation images previously rendered with `aspect-video … object-cover`, which
cropped any image that was not 16:9. They now preserve their intrinsic aspect ratio.

### Ecological terms diagram (HTML/React, no generated image)

[`EcologicalTermsDiagram.tsx`](src/components/notes/blocks/EcologicalTermsDiagram.tsx) added to section
2.3.1. Fully data-driven, BM and DLP from content. It renders three separate relationships:

```
Aras organisasi hidupan:   SPESIES → POPULASI → KOMUNITI
Tempat tinggal:            HABITAT (tempat tinggal semula jadi sesuatu organisma)
Pembentukan ekosistem:     KOMUNITI + PERSEKITARAN BUKAN HIDUP → EKOSISTEM
```

### ⚠️ Consistency fix this required — please review

Section 2.3.1 was teaching the very hierarchy the brief forbids. Its cards were titled
**"1 · Spesies", "2 · Populasi", "3 · Komuniti", "4 · Habitat", "5 · Ekosistem"** and the intro read
*"Setiap satu merangkumi yang sebelumnya…"* ("each one contains the one before it") — i.e.
species → population → community → habitat → ecosystem as a single ladder.

Shipping the new diagram next to that ladder would have put two contradictory statements on one screen.
Two minimal edits were therefore made, in both languages:

1. **Removed the `1 · … 5 ·` numbering** from the five card titles. The numbers were what asserted the
   ladder.
2. **Replaced the one intro clause** that stated each term contains the previous one.

**Every card definition is untouched** — they were individually correct. This is a consistency
correction demanded by the diagram spec, not a content rewrite, but it is a content-visible change and
is flagged here for sign-off.

### Mobile status

Clean at 375 px in both languages. All three adaptation tabs verified to swap to their own image with
their own labels. Cycle diagrams use hotspot mode at every width — the legend is the primary reading
surface on a phone.

---

## Chapter 3 — Nutrition

Chapter 3 already had hand-built, academically verified **schematic** SVG diagrams for the digestive
system, villus and Visking experiment. Rather than adding a second visual beside each one, the three
diagram components now render the illustration **in place of** their schematic when an image is
supplied. **No teaching text was moved or lost** — every organ note, pathway, tube label, test label and
result line stays exactly as authored and still renders below the image. Runtime check confirms exactly
one visual per concept, with no schematic left underneath.

| Image | Section | Mode | Labels |
|---|---|---|---|
| `chapter3_digestive_system.webp` | 3.3.1 Sistem Pencernaan Manusia | hotspot (11) | Mulut · Esofagus · Perut · Hati · Pundi hempedu · Pankreas · Duodenum · Usus kecil · Usus besar · Rektum · Anus |
| `chapter3_food_tests.webp` | 3.1.2 Ujian Makanan | hotspot (4) | Kanji · Glukosa · Protein · Lemak |
| `chapter3_villus_absorption.webp` | 3.4.1 Penyerapan Hasil Pencernaan | hotspot (5) | Vilus · Dinding nipis · Kapilari darah · Lakteal · Lumen usus |
| `chapter3_visking_tubing.webp` | 3.4.1 Eksperimen Tiub Visking | hotspot (4) | Tiub Visking · Air suling · Kanji · Glukosa |
| `chapter3_digestion_pathways.webp` | 3.3.1 Enzim dan Pencernaan Kimia | hotspot (3) | Karbohidrat · Protein · Lemak |

All labels sit **outside the structures they name**, as numbered markers with the full label in the
legend beneath — the leader-line approach was replaced by this because it is the same pattern the brief
specifies as the mobile fallback, and it stays readable at 320 px without a second layout.

**Organ-note text was reused verbatim from existing content**, so the gall bladder is described as it
already was — a storage organ, never as a gland.

Detail overlays, all reusing strings already in the chapter:

- **Food tests** — Kanji: *Iodin → biru kehitaman*; Glukosa: *Benedict + tab mandi air panas → mendakan
  merah bata*; Protein: *Reagen Millon + pemanasan → merah bata*; Lemak: *Etanol + air → emulsi putih
  susu*. Procedural detail stays in the existing accordions.
- **Villus** — transport cue: *Glukosa + asid amino → kapilari darah*, *Asid lemak + gliserol → lakteal*.
- **Visking** — caption: *Kanji kekal di dalam tiub Visking. Glukosa meresap keluar melalui membran ke
  dalam air suling di sekelilingnya.* The artwork shows glucose crossing the membrane into the
  surrounding distilled water only; nothing implies glucose leaves the outer boiling tube.
- **Digestion pathways** — row notes: *Kanji → Glukosa*; *Protein → Polipeptida → Dipeptida → Asid
  amino*; *Lemak → Asid lemak + Gliserol*. The artwork's own organ mapping (mouth for carbohydrate,
  stomach for protein, liver/gall bladder/pancreas → small intestine for fat) is left as drawn.

### Mobile status

Clean at 375 px in both languages after two coordinate retunes (see QA below). The 11-marker portrait
diagram is the tightest case and now clears with no collisions.

---

## VISUAL QA

Verified by mounting the real components from the live dev ESM graph and measuring rendered geometry —
for every figure, in both languages, at desktop (1280 px) and mobile (375 px): image actually loaded,
rendered box ratio equal to the artwork's intrinsic ratio (no crop, no stretch), every marker inside the
image bounds, no marker-to-marker collisions, and no horizontal page overflow.

**Defects found and fixed during this pass** (all were real, all are now clean):

| Defect | Where | Fix |
|---|---|---|
| BM labels "Ada tulang belakang" / "Tiada tulang belakang" spilled below the image at 360 px | Ch1 animal overview | Edge-aware anchoring in `AnnotatedImage` |
| "Tumbuhan berbunga" spilled below the image at 360 px | Ch1 plant classification | Same |
| 8 chips collided at 360 px and 430 px | Ch1 organism set | CSS mobile fallback to markers + legend |
| 3 marker collisions at 375 px | Ch3 digestive system (11 markers) | Smaller mobile markers + retuned organ coordinates |
| Rektum/Dubur markers touching at 375 px | Ch3 digestive system | Separated to y 81 / y 90 |
| 1 marker collision at 375 px | Ch2 tundra adaptation | Retuned the five marker positions |
| Adaptation images cropped by `object-cover` | Ch2 all three tabs | Aspect-ratio-preserving container |

Interaction regressions checked: dichotomous key completes and identifies correctly; adaptation tab
switching swaps to the right image and labels; section navigation (Back / Next section) works across all
13 Chapter 3 sections; no layout shift (every figure reserves its box via `aspect-ratio`).

**CH1 VISUAL QA: PASS**
**CH2 VISUAL QA: PASS**
**CH3 VISUAL QA: PASS**

---

## ACADEMIC REGRESSION

Prior corrections re-verified present in both languages after the change:

- **CH1** — amphibian moist skin (`lembap` ×5) and lungs (`peparu` ×9); four-way invertebrate
  `subGroups`; endemic-vs-threatened `speciesCaution`; `humanImpact`; the BM key's `bulu pelepah`
  wording (×6). Key logic byte-identical.
- **CH2** — primary/secondary carnivore (×6 each), excessive water use, Musang/Civet, migration,
  decomposition and combustion as separate processes, `foodWeb` block intact.
- **CH3** — Polipeptida (×9) → Dipeptida (×8) → asid amino chain; Food Pyramid 2020 / Piramid Makanan
  Malaysia 2020 (×4); pundi hempedu (×7); pankreas (×14); duodenum (×19); Millon (×6); Visking (×25);
  villus; assimilation (×5); defecation (×8).

The 24 learner-facing leakage tests still pass — none of the new labels introduce DSKP, SP/SK codes,
textbook-meta or audit language.

---

## NO DUPLICATES

Old Chapter 2 illustrations were deleted, not left underneath. All five had zero remaining references:

```
src/assets/notes/form2-science/chapter-2/tropical.png      (1.8 MB)  removed
src/assets/notes/form2-science/chapter-2/desert.jpg                  removed
src/assets/notes/form2-science/chapter-2/tundra.jpg                  removed
src/assets/notes/form2-science/chapter-2/tundra-land.svg             removed
src/assets/notes/form2-science/chapter-2/soil.jpg                    removed (already unreferenced)
```

Chapter 1's own `desert.jpg` / `polar.jpg` / `soil.jpg` / `sea.jpg` / `rafflesia.jpg` are still in use by
the habitat flip-cards and were left alone. Chapter 3 had no prior illustrations; its three schematics
are superseded in place, never shown alongside the new images. Build output contains the 15 new WebPs
and none of the removed files.

**DUPLICATE OLD IMAGES REMOVED: YES**

---

## RESULTS

```
CH1 VISUAL QA:            PASS
CH2 VISUAL QA:            PASS
CH3 VISUAL QA:            PASS
DUPLICATE OLD IMAGES REMOVED: YES
BM/DLP PARITY:            PASS
TYPECHECK:                PASS
BUILD:                    PASS
TARGETED TESTS:           PASS   (8 files / 73 tests — Science F2 Ch1–3 + notes components)
```

Full suite: **1424 passed, 7 failed**. All 7 failures are **pre-existing and unrelated** — confirmed by
stashing this change and reproducing them on a clean tree. They are in `src/content/bm/*-mindmap`
(×4), `src/content/form2/math/chapter-1/quizzes-dlp`, `src/lib/billing-core` and
`src/lib/invoice-pdf.server`. **No existing failure was suppressed and no test was weakened.**

`npm run lint` was not used as a gate: the repo is CRLF while Prettier is configured for LF, so it fails
repo-wide independently of this change.

---

## OPEN ITEMS FOR YOUR REVIEW

1. **Ch1 dichotomous-key organism set** — the sprite sheet does not depict the key's five organisms, so
   the selectable/highlight integration was not built. Re-cut artwork (pomfret, chicken, lion, frog,
   snake) would make it a small wiring job.
2. **Ch2 section 2.3.1 numbering removal** — a content-visible edit, made because the existing 1–5
   ladder directly contradicted the diagram you specified.
3. **Pre-existing, not fixed (out of scope):** `DichotomousStarMap` renders the hardcoded English string
   `"🌟 Identified:"` to BM students. Worth a follow-up localisation pass.

Chapters 1–3 are **not frozen**. Ready for the final browser-level visual QA pass.
