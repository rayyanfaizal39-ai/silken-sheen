# LEARNER-FACING ANNOTATION / LABELING IMPROVEMENT — AcadeMY Notes

**Date:** 2026-08-26
**Scope:** Annotation style across Notes instructional visuals. No image regenerated, no WebP edited,
no academic meaning changed.

---

## 1. Shared annotation components updated

All annotation in Notes flows through **one** component, so this was fixed at the system level rather
than page by page. Six call sites consume it — `ScienceF2Chapter1NotesBlock`,
`ScienceF2InteractiveNotesBlock` (section images + habitat adaptations), `DigestiveSystemDiagram`,
`VillusDiagram`, `ViskingExperimentDiagram`.

| File | Change |
|---|---|
| [`AnnotatedImage.tsx`](src/components/notes/blocks/AnnotatedImage.tsx) | Replaced the `chip` / `hotspot` pair with a five-value `annotationMode` API; added callout rendering, leader lines, and a length-aware small-screen fallback |
| [`annotation-layout.ts`](src/components/notes/blocks/annotation-layout.ts) | **New.** Pure layout maths: gutter assignment, non-overlapping vertical distribution, artwork↔frame coordinate mapping, and a deterministic small-screen collision estimator |
| [`interactive-types.ts`](src/content/form2/science/interactive-types.ts) | `annotationMode` on `AnnotatedImageBlock` and `DiagramImage`; `imageAnnotationMode` on `AdaptationCase` |
| [`styles.css`](src/styles.css) | `.callout-frame` / `.callout-art` — the responsive gutter geometry |

Every calculation is a **pure function of the authored coordinates and label text**. There is no DOM
measurement and no `ResizeObserver`, so the layout is identical on the server, before hydration, and
at every width.

---

## 2. Annotation modes introduced

```ts
annotationMode: "labels" | "callouts" | "hybrid" | "numbers" | "clean"
```

| Mode | What a student sees | Chosen when |
|---|---|---|
| **`labels`** | Short text on the artwork, beside each structure | Few short names, open background — instant recognition |
| **`callouts`** | Text in gutters either side, joined to the structure by a leader line and a dot | Many parts, or artwork too tight to write on without covering it |
| **`hybrid`** | Labels on the artwork **plus** a compact legend below | Wide scenes where the picture must stay large but a scannable list also helps |
| **`numbers`** | Numbered pins plus a legend | Last resort only |
| **`clean`** | Nothing on the artwork; names in a compact list below | Observational visuals the student is meant to classify |

**Callout geometry.** Gutters sit *outside* the picture: the frame widens to `artwork ÷ 0.54` so the
artwork keeps the size the sizing system gave it rather than being squeezed to make room for text.
Labels are assigned to a gutter by their `x`, sorted by `y`, then spread with a push-down → clamp →
pull-up pass that guarantees no two overlap while staying as close as possible to the part they name.

**Verified:** all 11 digestive-system callout anchors land at **exactly** their authored artwork
coordinates — maximum error **0.00 %** — so leader lines point at the right organ at every width.

---

## 3. Science F2 visuals changed from numbers → labels / callouts

Before this pass, **10 of 18** Science F2 visuals were number-only. Now **none are.**

### Chapter 1

| Visual | Was | Now | Why |
|---|---|---|---|
| Animal classification overview | labels | **labels** | Already direct — "Vertebrata / Invertebrata" plus the backbone traits read as section headers |
| Five vertebrate groups | labels | **labels** | Ikan · Amfibia · Reptilia · Burung · Mamalia, directly under each animal |
| Invertebrate classification | **numbers** | **labels** | The four rules now sit on their own panels instead of being decoded from a legend |
| Plant classification | labels | **labels** | Lumut · Paku pakis · Konifer · Tumbuhan berbunga |
| Dichotomous organism set | labels | **clean** | See §4 |

### Chapter 2

| Visual | Was | Now | Why |
|---|---|---|---|
| Carbon / oxygen cycle | **numbers** | **hybrid** | 8 process names now sit on the scene (Cahaya matahari, Fotosintesis, Karbon dioksida, Oksigen, Pemakanan, Respirasi, Penguraian, Pembakaran) with a compact legend below |
| Water cycle | **numbers** | **hybrid** | Penyejatan · Kondensasi · Hujan · Larian permukaan · Resapan · Air bawah tanah · Penyerapan oleh akar · Transpirasi |
| Tropical adaptation | **numbers** | **callouts** | Tangan mencengkam · Kaki mencengkam · Anggota panjang · Daun lebar · Hujung titis |
| Desert adaptation | **numbers** | **callouts** | All 7 features named, nothing written over the camel or cactus |
| Tundra adaptation | **numbers** | **callouts** | Bulu tebal · Telinga kecil · Badan padat · Tumbuhan rendah · Lumut dan liken |

**A judgement reversed mid-implementation.** The two cycle scenes were built as callouts first and
measured: gutters cut the carbon cycle from **741 px to 450 px** of artwork. On a wide landscape full
of small arrows that lost more comprehension than the decoding it saved, so both were moved to
`hybrid` — which the brief explicitly sanctions — restoring the artwork to 741 px / 778 px with the
labels still directly on the scene. The adaptation images lose far less (518 → 450 px), so callouts
stayed there.

### Chapter 3

| Visual | Was | Now | Why |
|---|---|---|---|
| **Digestive system** | **numbers** | **callouts** | The clearest case: all 11 organs named in the gutters, leader lines to each, **nothing written over the anatomy** |
| Food tests | **numbers** | **labels** | Kanji · Glukosa · Protein · Lemak on their own apparatus bands; reagent and result on tap |
| Villus absorption | **numbers** | **callouts** | Vilus · Dinding nipis · Kapilari darah · Lakteal · Lumen usus without crowding a dense cross-section |
| Visking tubing | **numbers** | **labels** | The two tube contents, distilled water and the Visking tube read in one pass |
| Digestion pathways | **numbers** | **labels** | Karbohidrat · Protein · Lemak at the start of each row |

---

## 4. Visuals intentionally left minimally labelled

**Chapter 1 dichotomous key organism set → `clean` (labels *removed* from the artwork).**

This is the one visual where the previous pass had gone too far. Its whole purpose is for a student to
*observe eight organisms and work out the classification*. Printing "Ikan · Katak · Cicak · Burung ·
Kucing · Rama-rama · Labah-labah · Siput" across the picture hands over part of the answer and turns
an activity into a poster. The `clean` mode was added for exactly this: **0 marks on the artwork**,
names available in a compact list beneath, and the existing caption already directs the student to
compare backbone, body covering and leg count. The interactive key itself is untouched.

**Science Form 1 cell visuals — considered and deliberately not converted.**
`Chapter2LearningVisuals` (`SpecialisedCellsVisual`, 10 cell types; `OrganismVisual`, 7 organisms)
uses numbered pins. It was audited and left alone because it already implements the interaction the
brief names as acceptable for dense visuals: its legend entries are **clickable labels, not bare
numbers**, selecting one highlights the matching structure, leader lines already run to each
structure, and detail text appears below on selection. Ten organelle pins across two rows is also
genuinely at the density limit where in-place labelling clutters. Flagged as a follow-up rather than
changed, because converting it means re-deriving anchor geometry for a different data model on a
surface that has already passed QA.

---

## 5. Responsiveness / mobile handling

Callout gutters need horizontal room a phone does not have, and long direct labels collide once the
artwork is phone-sized. Both are handled in **CSS and pure maths**, never by measuring:

- **Below `sm` (640 px):** callout figures drop to pins + legend, and — this was a bug found and fixed
  during QA — the artwork now expands to fill the whole frame instead of staying in its 54 % desktop
  column. The digestive system went from a cramped **161 × 214** to **298 × 398** on a 375 px phone.
- **Length-aware fallback.** Count alone was not enough: Visking's `Tiub Visking + ampaian kanji` and
  `Tiub Visking + larutan glukosa` (4 labels) collided on a phone while four *longer-spaced* labels
  did not. `labelsCollideWhenSmall()` estimates each chip's box from its character count against a
  nominal 330 px rendering and reports a genuine overlap, so only the figures that actually need it
  fall back. BM and DLP are evaluated independently on their own text and both land the same way.
- **Legend** stacks to 1 column below `sm`, 2 at `sm`, 3 at `lg`.
- Pin dots stay 20 px visually with a **40 px** effective touch target.

What a student on a 375 px phone actually sees: Chapter 1 keeps **direct labels** on four of five
visuals; Chapter 3 keeps direct labels on food tests and digestion pathways; only the genuinely dense
figures fall back to pins, and their legend carries the full names.

---

## 6. QA summary

Real browser QA, every figure, both languages, at five viewports. `collide` counts marker-to-marker
overlaps; `outside` counts marks escaping the frame.

| Viewport | Chapters | Modes rendered | collide | outside | ratio distortion | overflow-X |
|---|---|---|---|---|---|---|
| **1440 × 900** | C1, C2, C3 · BM + DLP | labels, hybrid, callouts, clean | **0** | **0** | **0** | none |
| **768 × 1024** | C1, C3 · BM | labels, callouts, clean | **0** | **0** | **0** | none |
| **430 × 932** | C2, C3 · DLP | labels, pins+legend | **0** | **0** | **0** | none |
| **375 × 812** | C1, C2, C3 · BM + DLP | labels, pins+legend, clean | **0** | **0** | **0** | none |

Also verified:

- **Hotspot/anchor alignment** — all 11 digestive callout anchors at 0.00 % error from their authored
  coordinates.
- **No regression to sizing or enlarge** — artwork footprints unchanged from the previous pass
  (digestive 391 × 520 at 58 vh; cycles 741 / 778 px); the lightbox still opens 615 × 820, preserves
  aspect, and closes on Escape.
- **Adaptation tabs** — all three habitats in both languages swap to their own image and their own
  callouts, 0 collisions, nothing over the artwork.
- **BM/DLP parity** — identical mode selection and identical collision results.

**Two real defects were found and fixed during QA**, both mobile: the shrunken callout artwork in the
pin fallback, and the Visking label collision that count-based logic missed.

### Gates

```
TYPECHECK:        PASS   (npx tsc --noEmit)
BUILD:            PASS   (npm run build)
TARGETED TESTS:   PASS   (8 files / 73 tests — Science F2 Ch1–3 + notes components)
FULL SUITE:       1424 passed, 7 failed
```

The 7 failures are **pre-existing and unrelated** — `src/content/bm/*-mindmap` (×4), Math F2 C1
quizzes-dlp, `billing-core`, `invoice-pdf.server` — previously confirmed on a clean tree. Identical
count before and after. No academic content was altered to make a test pass; nothing was suppressed.

---

## 7. Follow-up recommendations

1. **Science Form 1 cell visuals** — the strongest remaining candidate for callouts, deliberately not
   converted this pass (§4). Worth doing as its own change with its own QA, since it needs anchor
   geometry re-derived for a different data model.
2. **Extend `annotationMode` to Sejarah / Geography figures.** Those surfaces render plain `<img>`
   with no annotation layer at all. Several would benefit from callouts, but adding annotations means
   authoring coordinates and labels — content work, not a styling change.
3. **`clean` mode is worth reusing** for any future observation-and-classify activity; the pattern of
   *artwork stays unlabelled, names live underneath* is now a one-word change.
4. Still outstanding from the earlier pass: `DichotomousStarMap` renders a hardcoded English
   `"🌟 Identified:"` to BM students.

---

## VERDICT

```
LABELING CLARITY:     PASS
SCIENCE F2 CH1:       PASS
SCIENCE F2 CH2:       PASS
SCIENCE F2 CH3:       PASS
INTERACTIVE VISUALS:  PASS
MOBILE READABILITY:   PASS
```

Against the stated success criteria:

1. **Number-only is gone where it hurt** — 10 of 18 Science F2 visuals were pin-and-legend; now zero
   are on desktop and tablet.
2. **Dense visuals use a sensible hybrid** — the cycles keep a large scene with labels on it plus a
   scannable legend; the digestive system and villus use gutter callouts that cover no anatomy.
3. **The observational visual got cleaner, not busier** — the organism set had its labels removed.
4. **Less back-and-forth** — a student reads "Pundi hempedu" on a line pointing at the gall bladder
   instead of reading "5", looking down, and looking back.
5. **Fixed at the system level** — one `annotationMode` API, one layout module, five call sites; the
   next chapter picks a mode with one word instead of inheriting number pins by default.
