# VISUAL IMPLEMENTATION CHANGELOG — Science Form 2, Chapters 7, 9 and 10

**Date:** 2026-09-02
**Input:** `AcadeMY_Science_F2_Visual_Implementation_Ch7_Ch9_Ch10.zip` — 16 source PNGs plus
`IMAGE_MANIFEST.md` and `CLAUDE_IMPLEMENTATION_PROMPT.md`
**Scope:** visual implementation only. Chapters 7, 9 and 10 stay academically frozen — no teaching
text, definition, quiz, flashcard, mind map, answer key or SP/SK line was rewritten.

---

## 0. Live render path traced first

```
src/content/registry.ts  (science-f2-c{7,9,10}-{bm,dlp} → sciF2InteractiveData)
  → src/content/form2/science/chapter-{7,9,10}/interactive-{bm,dlp}.ts
    → src/routes/notes.tsx  (lang = scienceLang === "dlp" ? "en" : "bm")
      → src/components/notes/ScienceF2Chapter{7,9,10}NotesBlock.tsx  (one-line re-exports)
        → src/components/notes/ScienceF2InteractiveNotesBlock.tsx
          → src/components/notes/ScienceSectionedNotesShell.tsx  (one section at a time)
            → src/components/notes/blocks/AnnotatedImage.tsx
              → src/components/notes/blocks/LearningImageLightbox.tsx
```

`chapter-{7,9,10}/notes-{bm,dlp}.ts` are registered as `notes` but are **not** what a learner sees:
`notes.tsx` renders `sciF2InteractiveData` whenever a chapter ships it. They were not edited.

**Nothing in these three chapters previously rendered a raster image** other than the chapter hero.
Every existing visual is a data-driven SVG/interactive. So there was no weak learner-facing duplicate
to delete, and no old-plus-new stacking was created: **0 visuals removed, 0 duplicate concept pairs.**

---

## 1. WebP conversion

Tool: **`sharp`**, already in `node_modules` — no dependency added.
Mode: `webp({ quality: 86, effort: 6, smartSubsample: true })` — inside the brief's 84–88 band.
Native pixel dimensions preserved exactly; nothing resized, cropped or resampled (the longest edge is
1672 px, well under the 1800 px trigger). Each output was decoded back and compared pixel-for-pixel
against its source.

| Source PNG | Production WebP | Dimensions | PNG | WebP | RMSE | px Δ>16 |
|---|---|---|---|---|---|---|
| 07_01_electrostatic_charge_transfer | `chapter-7/07_01_electrostatic_charge_transfer.webp` | 1672×941 | 1187 KB | 55 KB | 2.19 | 0.361% |
| 07_02_electrostatics_daily_life | `chapter-7/07_02_electrostatics_daily_life.webp` | 1672×941 | 1477 KB | 100 KB | 2.50 | 0.342% |
| 07_03_ammeter_voltmeter_placement | `chapter-7/07_03_ammeter_voltmeter_placement.webp` | 1672×941 | 1957 KB | 43 KB | 1.64 | 0.076% |
| 07_04_electromagnet_applications | `chapter-7/07_04_electromagnet_applications.webp` | 1672×941 | 2603 KB | 131 KB | 2.76 | 0.414% |
| 09_01_green_building | `chapter-9/09_01_green_building.webp` | 1672×941 | 1903 KB | 203 KB | 3.61 | 0.841% |
| 09_02_sea_breeze | `chapter-9/09_02_sea_breeze.webp` | 1672×941 | 1180 KB | 40 KB | 1.40 | 0.050% |
| 09_03_land_breeze | `chapter-9/09_03_land_breeze.webp` | 1672×941 | 1271 KB | 41 KB | 1.32 | 0.006% |
| 09_04_bimetallic_fire_alarm | `chapter-9/09_04_bimetallic_fire_alarm.webp` | 1672×941 | 1396 KB | 41 KB | 1.86 | 0.166% |
| 09_05_conductor_vs_insulator | `chapter-9/09_05_conductor_vs_insulator.webp` | 1672×941 | 1603 KB | 44 KB | 1.53 | 0.016% |
| 09_06_conduction_convection_radiation_kitchen | `chapter-9/09_06_…_kitchen.webp` | 1672×941 | 1430 KB | 66 KB | 1.56 | 0.008% |
| 10_01_vacuum_bell_jar | `chapter-10/10_01_vacuum_bell_jar.webp` | **1448×1086** | 1242 KB | 42 KB | 1.39 | 0.017% |
| 10_02_tuning_fork_water_ripples | `chapter-10/10_02_tuning_fork_water_ripples.webp` | 1672×941 | 1290 KB | 35 KB | 1.32 | 0.014% |
| 10_03_reflection_vs_absorption | `chapter-10/10_03_reflection_vs_absorption.webp` | 1672×941 | 1711 KB | 92 KB | 1.86 | 0.001% |
| 10_04_sonar_and_bat_echolocation | `chapter-10/10_04_sonar_and_bat_echolocation.webp` | 1672×941 | 1539 KB | 88 KB | 1.80 | 0.029% |
| 10_05_echo_cave | `chapter-10/10_05_echo_cave.webp` | 1672×941 | 1741 KB | 119 KB | 1.89 | 0.007% |
| 10_06_musical_instruments_vibrating_parts | `chapter-10/10_06_…_vibrating_parts.webp` | 1672×941 | 1761 KB | 98 KB | 2.18 | 0.158% |

**Total: 22.5 MB → 1.21 MB (5.4% of source).**

**One image needs its acceptance recorded, not hidden.** `09_01_green_building` is the only file
above the Chapter 8 perceptual gate (RMSE < 3.0 **and** < 0.5% of pixels differing by more than 16):
it lands at 3.61 / 0.841%. Raising quality barely moves it — q88 gives 3.49 / 0.788% for 10% more
bytes, q92 gives 3.26 / 0.706% for 35% more — which is the signature of inherent high-frequency
texture rather than a quality setting. The worst-differing region (the tree canopy) was cropped from
both files and compared at 1:1: the difference is confined to leaf edges and is invisible. Accepted
at q86, on that inspection rather than on the metric.

### Asset location — a deviation from the brief's literal path

The brief proposed `public/images/science/form2/chapter-N/`. The files were placed in
**`public/science/form2/chapter-N/`** instead, which is the path Chapter 8's contextual-image pack
already established (`src/components/notes/chapter8/chapter8-assets.ts`). Same root, same shape, one
directory level fewer — using the brief's literal path would have created a second public-asset
convention beside the existing one.

Production asset directories now hold **16 `.webp` and 0 `.png`**; a test asserts no PNG duplicate
sits beside any of them. The source PNGs stayed in the supplied pack and were not deleted.

---

## 2. The finding that shaped everything else: this pack carries no text

All 16 images were opened and inspected at full resolution. **Not one contains a single baked-in
word, label or number.** That is the opposite of the Chapters 4–6 locked pack, which is
English-labelled and therefore ships on DLP only.

So this pack ships to **both BM and DLP**, referencing the *same* files, with every alt string and
caption written separately per language in chapter content. `src/content/form2/science/visual-assets.ts`
is the single source of truth for the paths, imported by both language files, so a path cannot drift
between them. Tests assert that BM and DLP reference identical files in identical sections, and that
the words differ.

No label was overlaid on any artwork, and no hotspot was added: these are recognition visuals sitting
beside a precise diagram, not labelled figures. Where teaching labels are needed the existing
data-driven SVG below the image already provides them.

---

## 3. Placement

Order per section is **contextual image → precise SVG/interactive → teaching text / check yourself**.

The shared renderer previously had one figure slot (`section.images`), rendered *after* every
diagram. Two optional slots were added so the contextual-first order is expressible without moving
any existing chapter's figures:

| Slot | Renders | Used for |
|---|---|---|
| `contextImages` | at the top of the section, before its cards | the everyday scene a concept lives in |
| `contextImagePair` | same position, two-up from `sm`, stacked below | a comparison that only teaches as a pair |
| `images` (existing) | after the diagrams, before *Check yourself* | a reference figure that needs the section explained first |

### Chapter 7 — Electricity and Magnetism

| Figure | Section | Slot | Size | What sits below it |
|---|---|---|---|---|
| `07_01_electrostatic_charge_transfer` | 7.1 · Electrostatic Charges | context | `panel` | attraction/repulsion + electroscope cards |
| `07_02_electrostatics_daily_life` | 7.1 · Electrostatics in Daily Life | context | `panel` | the five accordions — lightning, conductor, dry weather, refuelling, Faraday cage |
| `07_03_ammeter_voltmeter_placement` | 7.1 · Current, Voltage and Resistance | context | `panel` | **`CircuitMeterDiagram` kept** — it is the precise A-in-series / V-in-parallel interactive |
| `07_04_electromagnet_applications` | 7.3 · Electromagnet Strength and Its Uses | context | `panel` | the uses cards, then the investigation and `ApparatusDiagram` |

Electrons are visually understood as moving cloth → balloon; the caption says so in words rather than
relying on the reader to decode the arrows. The four daily-life contexts are preserved intact.

### Chapter 9 — Heat

| Figure | Section | Slot | Size | What sits below it |
|---|---|---|---|---|
| `09_06_…_kitchen` | 9.2 · Convection and Radiation | context | `scene` | **`ConvectionRadiation` kept** |
| `09_02_sea_breeze` + `09_03_land_breeze` | 9.2 · Sea Breeze and Land Breeze | **pair** | `pair` | **`BreezeDiagram` kept** |
| `09_05_conductor_vs_insulator` | 9.2 · Heat Conductors and Heat Insulators | context | `scene` | conductor/insulator cards + matcher |
| `09_04_bimetallic_fire_alarm` | 9.3 · Uses of Expansion and Contraction | context | `scene` | **`BimetallicStrip` kept** |
| `09_01_green_building` | 9.4 · The Green Building Concept | context | `scene` | the four green-building tabs |

**The kitchen scene is in *Convection and Radiation*, not *Conduction*.** The brief asks for it as
the everyday context for all three modes; placing it in the first heat-transfer section would have
had its caption name convection and radiation a section before they are taught. In its actual
position all three have been introduced, so the caption can name all three honestly.

**The breeze rasters carry no arrows** — they are a bare sunny coastline and the same coastline at
night. That is deliberate and correct: the mechanism is taught by the existing `BreezeDiagram`
interactive directly beneath them, which is where the air-movement arrows belong. The captions state
only the temperature asymmetry the section intro already teaches ("the land heats up and cools down
faster than the sea"); neither caption claims a wind direction.

**The bimetallic strip is drawn straight and clear of the contact screw.** The caption says so
explicitly, so the figure cannot be read as an alarm already sounding: *"the circuit is still open
and the bell is silent."*

### Chapter 10 — Sound Waves

| Figure | Section | Slot | Size | What sits below it |
|---|---|---|---|---|
| `10_02_tuning_fork_water_ripples` | 10.1 · Sound Production and Propagation | context | `scene` | the four vibration-source cards |
| `10_01_vacuum_bell_jar` | 10.1 · same section | **`images`** | `sceneTall` | placed *after* the "vacuum jar demonstration" accordion it illustrates |
| `10_03_reflection_vs_absorption` | 10.1 · Reflection, Absorption and Speed of Sound | context | `panel` | hard/soft surface tabs, then **`SoundMedia` kept** |
| `10_06_musical_instruments_vibrating_parts` | 10.2 · Sound from Musical Instruments | context | `panel` | the four loudness/pitch tabs |
| `10_05_echo_cave` | 10.3 · Echo and the Doppler Effect | context | `scene` | **`EchoDiagram` and `DopplerWavefronts` kept** |
| `10_04_sonar_and_bat_echolocation` | 10.3 · Sonar, Sonogram and Echolocation | context | `panel` | **`Echolocation` kept** — the sent/returned path interactive |

Section 10.1 is the one section carrying two figures, because it teaches two distinct things
(production, then propagation). They are deliberately not stacked at the top: the tuning fork leads
the section, and the bell jar sits down beside the vacuum-jar accordion it belongs to. **Nothing was
drawn inside the evacuated jar** — the raster shows apparatus only, and the caption carries the
mechanism.

The musical-instruments artwork is the cleaned version: no glow, highlight or other baked answer
marking the vibrating parts. The caption names them in text instead, so BM and DLP each say it in
their own words.

**Existing interactives kept and verified still rendering:** `CircuitMeterDiagram`, `SeriesParallel`,
`MagnetFieldDiagram`, `CurrentFieldPatterns`, `ApparatusDiagram`, `ConductionDiagram`,
`ConvectionRadiation`, `BreezeDiagram`, `ExpansionParticles`, `BimetallicStrip`, `SurfaceComparison`,
`SoundMedia`, `EchoDiagram`, `DopplerWavefronts`, `Echolocation`, `HearingRange`, `WaveVisualizer`,
the Ohm's-Law calculators and the Chapter 7 mini-investigation. **None was replaced.**

---

## 4. Sizing

The shared sizing system (`blocks/learning-image.ts`) already bounded figures, but its four variants
top out at 700–780 px — the diagram band, not the 600/660 band this brief asks for. Four variants
were **added**; the existing four are untouched, so Chapters 1–6 render byte-identically.

| New variant | Width cap | Height budget | Renders at 1440×900 |
|---|---|---|---|
| `scene` | 600 px | `min(40vh, 350px)` | **600 × 338** |
| `sceneTall` | 560 px | `min(46vh, 380px)` | **507 × 380** |
| `panel` | 660 px | `min(44vh, 380px)` | **660 × 371** |
| `pair` | 460 px | `min(34vh, 300px)` | **460 × 259** each |

These are the Chapter 8 display caps generalised into the shared system rather than re-implemented:
600 px lands a 16:9 scene at ~338 px tall, 660 px at ~371 px, inside the intended 340–380 px band.
The cap is expressed as `max-width: min(variantWidth, heightBudget × ratio)`, so height is bounded
without an explicit `max-height` that would letterbox the artwork inside its own frame.

**The bell jar, and why it renders at 507 px rather than 540–560 px.** It is the one 4:3 image in the
pack. The brief asks for a 540–560 px width cap; the manifest asks for a 380 px height ceiling. At
4:3 those two cannot both bind — 560 px wide is 420 px tall. The height rule was treated as the real
constraint, because the whole point of this pass is keeping figures visually balanced: the declared
cap is 560 px and the height budget binds first, giving **507 × 380**. Under the plain `scene`
variant it would have rendered 467 × 350 and read as an afterthought, which is why it has its own
variant rather than sharing one.

---

## 5. UX and performance

- **Loading.** `AnnotatedImage` gained an optional `priority` flag. The sectioned shell renders one
  section at a time, so a section's *leading* figure is always above the fold — deferring it just
  shows the reader an empty reserved box. The 15 leading figures are `loading="eager"`; the bell jar,
  which sits below its accordion, stays `loading="lazy"`. Every figure is `decoding="async"`.
  Default is unchanged (`lazy`), so no existing chapter's loading behaviour moved.
- **No layout shift.** Each figure declares its intrinsic aspect ratio (`16 / 9`, or `4 / 3` for the
  bell jar) and the frame reserves the box via `aspect-ratio` before the file arrives.
- **Alt text and captions** are written per language, in BM and in English, for all 16 — 32 alt
  strings and 32 captions in total. They describe what is in the picture; no source, DSKP or audit
  metadata appears in any of them.
- **Tap-to-enlarge preserved.** Every figure keeps the shared `LearningImageLightbox`. Verified live:
  opens at 1386 × 780 with `object-fit: contain`, takes its accessible title from the figure's alt
  text, and closes on Escape.
- **Nothing covers anything.** The figures render in their own block in the section flow; caption sits
  8 px below the frame. No label was baked into any raster.

---

## 6. Responsive QA — measured in a real browser

Dev server on `localhost:8081`, guest mode, both languages, every section stepped through, geometry
read from the live DOM.

| Viewport | Ch7 | Ch9 | Ch10 | Page overflow-X |
|---|---|---|---|---|
| 1440 × 900 | 4 figures @ 660 × 371 | 600 × 338, pair 460 × 259 ea. | 600 × 338 / 507 × 380 / 660 × 371 | none (scrollWidth 1434) |
| 768 × 1024 | — | **pair side by side**, 300 px each, same top | — | none (762) |
| 430 × 932 | 344 × 194 | 344 × 194, pair **stacked** | 344 × 194, jar 344 × 258 | none (430) |
| 390 × 844 | 304 × 171 | 304 × 171, pair stacked | 304 × 171, jar 304 × 228 | none (390) |
| 375 × 812 | 289 × 163 | 289 × 163, pair stacked | 289 × 163, jar 289 × 217 | none (375) |

Every figure stays inside its lesson card at every width, aspect ratio preserved everywhere, no
cropping, no clipping. The breeze pair is genuinely two columns from `sm` up (measured: identical
`top`, different `left`) and genuinely stacked below it. All 16 assets return **HTTP 200
`image/webp`**; zero console errors; the section Back/Next controls and every interactive still work
after stepping between sections.

BM and DLP were both measured and produce identical geometry.

### One harness limitation, stated rather than papered over

The Browser pane would not composite frames in this session, so **`computer{action:"screenshot"}`
returns black** and the lazy-loaded bell jar does not fire its intersection observer while the pane
is not painting. Both are harness artifacts, not product defects, and the second was proved so: the
same image loads to its full 1448 × 1086 the moment its `loading` attribute is flipped to `eager` at
runtime, and `fetch` on its URL returns 200 / `image/webp` / 42 744 bytes. **No claim in this
document rests on a screenshot** — every number above came from measuring the live DOM.

---

## 7. Tests

New: `src/content/form2/science/chapter-7-9-10-visual-integration.test.tsx` — **97 tests**:

- all 16 WebP files exist on disk and are non-empty; every reference is `.webp`; no PNG duplicate
- each chapter integrates exactly its own images, exactly once, in **both** languages
- no chapter carries another chapter's image
- BM and DLP place every image in the same section index, section number and slot
- BM and DLP write **different** alt text and captions for the same file
- every figure declares an explicit contextual size and aspect, and the computed cap stays inside the
  agreed width/height ceilings for its variant
- no figure carries an annotation (no competing label set over the artwork)
- the sea-breeze / land-breeze figures stay authored as one ordered pair
- Chapters 8, 11, 12 and 13 carry none of this pack
- rendering: every figure renders with its alt text and caption, offers its localised enlarge control,
  loads eagerly iff it leads its section, and every section title still renders
- the pair renders inside a `sm:grid-cols-2` container

```
TYPECHECK:            PASS   (npx tsc --noEmit, clean)
BUILD:                PASS   (npm run build, exit 0; all 16 WebP in dist/client)
CHAPTER 7 TESTS:      PASS
CHAPTER 9 TESTS:      PASS
CHAPTER 10 TESTS:     PASS
SCIENCE F2 + NOTES:   PASS   (51 files, 1239 tests)
LEAKAGE:              PASS   (learner-facing-leakage.test.ts)
NEW VISUAL SUITE:     PASS   (97 tests)
FULL SUITE:           2783 passed, 8 failed
```

### The 8 failures are pre-existing — verified, not assumed

Confirmed by stashing every change in this pass and re-running the same eight files on a clean tree:
identical 8 failures. They are the same set the Chapters 4–6 pass recorded.

```
src/routes/-onboarding-ui.test.ts
src/lib/billing-core.test.ts
src/lib/invoice-pdf.server.test.ts
src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts
src/content/bm/asas-penulisan-form1-mindmap.test.ts
src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts
src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts
src/content/form2/math/chapter-1/quizzes-dlp.test.ts
```

None touches Science Form 2, the notes shell, `AnnotatedImage` or any image asset.

---

## 8. Files changed

```
A  public/science/form2/chapter-7/    (4 webp)
A  public/science/form2/chapter-9/    (6 webp)
A  public/science/form2/chapter-10/   (6 webp)
A  src/content/form2/science/visual-assets.ts                    single source of truth for the paths
A  src/content/form2/science/chapter-7-9-10-visual-integration.test.tsx
M  src/components/notes/blocks/learning-image.ts                 + scene / sceneTall / panel / pair
M  src/components/notes/blocks/AnnotatedImage.tsx                + priority (eager) flag
M  src/components/notes/ScienceF2InteractiveNotesBlock.tsx       + contextImages / contextImagePair,
                                                                   figure rendering factored into one helper
M  src/content/form2/science/interactive-types.ts                + the two slots, + priority
M  src/content/form2/science/chapter-7/interactive-{bm,dlp}.ts   + 4 figures each
M  src/content/form2/science/chapter-9/interactive-{bm,dlp}.ts   + 6 figures each
M  src/content/form2/science/chapter-10/interactive-{bm,dlp}.ts  + 6 figures each
```

The six chapter content files are **purely additive — 398 insertions, 0 deletions.** Every existing
line of teaching text, every quiz, every hint and every interactive block is byte-identical. The only
new prose is alt text and captions.

Chapters 8, 11, 12 and 13: **untouched** (`git status` clean for all four). Supabase, Cloudflare,
auth and billing: untouched.

---

## FINAL REPORT

```
files converted to WebP:            16 / 16
production PNG duplicates:          0 / 16
Ch7 images implemented:             4 / 4
Ch9 images implemented:             6 / 6
Ch10 images implemented:            6 / 6
broken refs:                        0
duplicate old/new concept visuals:  0
BM/DLP parity:                      PASS  (same 16 files, same sections, per-language wording)
desktop sizing QA:                  PASS  (660×371 / 600×338 / 507×380 / 460×259)
430px:                              PASS
390px:                              PASS
375px:                              PASS
Ch7 tests:                          PASS
Ch9 tests:                          PASS
Ch10 tests:                         PASS
Science F2 suite:                   PASS  (1239 tests)
leakage:                            PASS
typecheck:                          PASS
build:                              PASS
Chapters 8/11/12/13 changed:        NO / NO / NO / NO
final:                              READY FOR VISUAL REVIEW
```

**Two things worth your eye at review, neither of them blocking:**

1. **The breeze pair is two empty landscapes.** That is what the pack supplies and what the brief
   asks for — arrows belong in the SVG overlay, not baked into the raster. As shipped they set the
   day/night scene and `BreezeDiagram` teaches the mechanism below them. If you want the raster to do
   more of the teaching, the natural follow-up is to render the existing breeze arrows as an SVG
   overlay *on* these two images rather than as a separate diagram beneath them.
2. **Screenshots could not be captured** (the Browser pane was not compositing). Every geometry
   number above is a live DOM measurement, but nobody has yet looked at these pages with human eyes
   at desktop and phone width. That is the one check this pass could not perform.
