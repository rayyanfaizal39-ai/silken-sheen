# Science Form 2 — Visual Audit — Chapters 9, 10, 11, 12, 13

**Mode:** READ-ONLY. Nothing was modified.
**Date:** 2026-09-02
**Basis:** current repo implementation, the rendered learner path, existing assets, and the
KSSM Sains Tingkatan 2 textbook / DSKP.

---

## How the learner path actually renders

All five chapters go through the same route: `registry.ts` supplies `sciF2InteractiveData` →
[notes.tsx:2010](src/routes/notes.tsx:2010) → a per-chapter alias of the shared
`ScienceF2InteractiveNotesBlock`. Every visual below is a block key on a section, rendered by a
component in `src/components/notes/blocks/`. BM and DLP use **identical block keys in all five
chapters** — no language sees a different set of visuals.

### Source vs build, at a glance

| Chapter | Printed pages | Source figures | Visual blocks shipped | Real images shipped |
|---|---|---|---|---|
| 9 Heat | 205–221 | 16 Rajah · 6 foto · 1 Jadual | **7** | 1 (decorative) |
| 10 Sound | 223–235 | 10 Rajah · 7 foto | **6** | 1 (decorative) |
| 11 Stars & Galaxies | 239–249 | 5 Rajah · 5 foto · 1 Jadual | **6** | 3 galaxy + 1 decorative |
| 12 Solar System | 251–267 | 7 Rajah · 2 foto · 5 Jadual | **4** | 1 (decorative) |
| 13 Meteoroid/Asteroid/Comet | 269–277 | 4 Rajah · 4 foto | **3** | 1 (decorative) |

**The headline finding: the visual layer is in good shape and is almost entirely deterministic
SVG, which is the right choice.** Of ~26 visual blocks across five chapters, I found **zero
scientifically misleading ones**. The gaps are absences, not errors — and most of those absences
should be filled with SVG, not AI images.

---

# CHAPTER 9 — HEAT

## Current visuals

| Visual | File | Where | Type | Verdict |
|---|---|---|---|---|
| `ConductionDiagram` | [ConductionDiagram.tsx](src/components/notes/blocks/ConductionDiagram.tsx) | §9.2 Konduksi | SVG | **KEEP** |
| `ConvectionRadiation` | [ConvectionRadiation.tsx](src/components/notes/blocks/ConvectionRadiation.tsx) | §9.2 Perolakan dan Sinaran | SVG | **KEEP** |
| `BreezeDiagram` | [BreezeDiagram.tsx](src/components/notes/blocks/BreezeDiagram.tsx) | §9.2 Bayu Laut dan Bayu Darat | SVG + INTERACTIVE | **KEEP** |
| `MatchingPairs` | [MatchingPairs.tsx](src/components/notes/blocks/MatchingPairs.tsx) | §9.2 Konduktor dan Penebat | INTERACTIVE | **KEEP** |
| `ExpansionParticles` | [ExpansionParticles.tsx](src/components/notes/blocks/ExpansionParticles.tsx) | §9.3 Pengembangan dan Pengecutan | SVG | **KEEP** |
| `BimetallicStrip` | [BimetallicStrip.tsx](src/components/notes/blocks/BimetallicStrip.tsx) | §9.3 Kegunaan | SVG | **KEEP** |
| `SurfaceComparison` | [SurfaceComparison.tsx](src/components/notes/blocks/SurfaceComparison.tsx) | §9.4 Penyerapan dan Pembebasan | SVG | **KEEP** |
| `ch9-haba.png` | `src/assets/science/form2/` | chapter `blogHighlight` | DECORATIVE IMAGE | **KEEP** |

**`BreezeDiagram` deserves specific praise and must not be replaced.** Land/sea breeze direction is
the single most-failed item in this topic, and the implementation gets both cases right *and*
resolves the naming confusion explicitly: *"Bayu dinamakan mengikut arah ia bertiup datang: bayu
laut datang dari laut."* An AI image would almost certainly draw the arrows backwards.

## Gaps

**§9.1 "Haba dan Suhu" has no visual at all.** This is the chapter's conceptual foundation and the
classic confusion (heat = energy in transit vs temperature = degree of hotness). Currently four
text cards. A diagram is warranted — but a *diagram*, not an illustration.

**§9.4 "Konsep Bangunan Hijau" has no visual.** This is an applied, real-architecture concept with
its own place in the standard. It is the one place in Chapter 9 where a contextual illustration
genuinely beats a diagram, because the learning is recognition of real building features, not a
mechanism with geometry to get wrong.

---

# CHAPTER 10 — SOUND WAVES

## Current visuals

| Visual | File | Where | Type | Verdict |
|---|---|---|---|---|
| `SoundMediaDiagram` | [SoundMediaDiagram.tsx](src/components/notes/blocks/SoundMediaDiagram.tsx) | §10.1 Pantulan, Penyerapan, Kelajuan | SVG | **KEEP** |
| `WaveVisualizer` | [WaveVisualizer.tsx](src/components/notes/blocks/WaveVisualizer.tsx) | §10.2 Frekuensi, Amplitud, O.S.K. | SVG + INTERACTIVE | **KEEP** |
| `DopplerWavefronts` | [DopplerWavefronts.tsx](src/components/notes/blocks/DopplerWavefronts.tsx) | §10.3 Gema dan Kesan Doppler | SVG | **KEEP** |
| `EchoDiagram` | [EchoDiagram.tsx](src/components/notes/blocks/EchoDiagram.tsx) | §10.3 Gema | SVG | **KEEP** |
| `EcholocationDiagram` | [EcholocationDiagram.tsx](src/components/notes/blocks/EcholocationDiagram.tsx) | §10.3 Sonar, Sonogram, Ekolokasi | SVG | **KEEP** |
| `HearingRangeChart` | [HearingRangeChart.tsx](src/components/notes/blocks/HearingRangeChart.tsx) | §10.3 Had Pendengaran | SVG | **KEEP** |
| `ch10-gelombang-bunyi.png` | `src/assets/science/form2/` | chapter `blogHighlight` | DECORATIVE IMAGE | **KEEP** |

Pitch and loudness (§10.2 "Kenyaringan dan Kelangsingan") has no block of its own, but
`WaveVisualizer` sits in the section immediately before it and is what teaches amplitude and
frequency. **No new visual needed there.**

## Gaps

**§10.1 "Penghasilan dan Perambatan Bunyi" has no visual — this is the most significant gap in all
five chapters.** The section carries the chapter's core mechanism in prose only:

> "Apabila sesuatu objek bergetar, zarah-zarah di sekelilingnya turut bergetar dan berlanggar
> dengan zarah bersebelahan… bunyi memerlukan medium untuk merambat dan tidak dapat merambat
> melalui vakum."

Four text cards (voice box, guitar string, drum membrane, bell) illustrate *sources*, but nothing
shows the **propagation** — compression and rarefaction travelling through particles. That is
exactly the idea students cannot form from words.

**The vacuum-jar demonstration** is currently a text accordion. It is a real apparatus students
meet in exams, and recognition of the apparatus is part of the learning.

---

# CHAPTER 11 — STARS AND GALAXIES

## Current visuals

| Visual | File | Where | Type | Verdict |
|---|---|---|---|---|
| `GalaxyCardGrid` + `spiral.png`, `elliptical.png`, `irregular.png` | [GalaxyCardGrid.tsx](src/components/notes/blocks/GalaxyCardGrid.tsx), `src/assets/notes/form2-science/chapter-11/` | §11.1 Galaksi dan Alam Semesta | **IMAGE** | **KEEP** |
| `CosmicScale` | [CosmicScale.tsx](src/components/notes/blocks/CosmicScale.tsx) | §11.1 Bima Sakti dan Skala | INTERACTIVE | **KEEP** |
| `MilkyWayLocator` | [MilkyWayLocator.tsx](src/components/notes/blocks/MilkyWayLocator.tsx) | §11.1 Kedudukan Sistem Suria | SVG | **KEEP** |
| `StellarLifecycle` | [StellarLifecycle.tsx](src/components/notes/blocks/StellarLifecycle.tsx) | §11.1 Kitar Hidup Bintang | SVG + INTERACTIVE | **KEEP** |
| `PhScaleSlider` (reused) | [PhScaleSlider.tsx](src/components/notes/blocks/PhScaleSlider.tsx) | §11.1 Ciri-ciri Bintang — star colour/temperature | INTERACTIVE | **KEEP** |
| `StarSizeCompare` | [StarSizeCompare.tsx](src/components/notes/blocks/StarSizeCompare.tsx) | §11.1 Ciri-ciri Bintang | SVG | **KEEP** |
| `ch11-bintang-galaksi.png` | `src/assets/science/form2/` | chapter `blogHighlight` | DECORATIVE IMAGE | **KEEP** |

**Chapter 11 is the best-covered chapter and needs no new images.**

Two things worth naming:

- **The galaxy images are the correct use of photography in this whole audit.** Galaxy morphology
  *is* visual appearance — there is no mechanism to draw. Replacing spiral/elliptical/irregular
  photographs with SVG would make them worse.
- **`StellarLifecycle` is scientifically correct**, including the branch students most often get
  wrong, and its hint says so outright: *"hanya bintang besar dan bintang super besar melalui
  supernova. Bintang bersaiz sederhana tidak meletup."* Do not touch it.

The `PhScaleSlider` name is internal reuse of a generic gradient-slider component; the learner sees
a star colour–temperature scale with correct ranges (< 3 500 K red → > 25 000 K blue). No issue.

---

# CHAPTER 12 — SOLAR SYSTEM

## Current visuals

| Visual | File | Where | Type | Verdict |
|---|---|---|---|---|
| `PlanetComparisonTable` | [PlanetComparisonTable.tsx](src/components/notes/blocks/PlanetComparisonTable.tsx) | §12.1 Jarak; §12.1 Membandingkan Planet | INTERACTIVE table | **KEEP** |
| `AuLightYearCalculator` | [AuLightYearCalculator.tsx](src/components/notes/blocks/AuLightYearCalculator.tsx) | §12.1 Jarak dalam Sistem Suria | INTERACTIVE | **KEEP** |
| `PlanetSphereList` | [PlanetSphereList.tsx](src/components/notes/blocks/PlanetSphereList.tsx) | §12.1 Membandingkan Planet | Coloured spheres, **not to scale** | **IMPROVE** |
| `FlipCardGrid` | [FlipCardGrid.tsx](src/components/notes/blocks/FlipCardGrid.tsx) | §12.1 Bumi sebagai Planet untuk Kehidupan | INTERACTIVE | **KEEP** |
| `ch12-sistem-suria.png` | `src/assets/science/form2/` | chapter `blogHighlight` | DECORATIVE IMAGE | **KEEP** |

### Why `PlanetSphereList` is IMPROVE, not KEEP or REPLACE

It renders eight coloured circles at arbitrary sizes, and its instruction is honest about it:
*"Saiz sfera di bawah adalah gambaran konsep sahaja dan tidak mengikut skala sebenar."* The
disclosure is correct and it works well as a tappable index into each planet's profile.

The problem is what follows from it: **Chapter 12 currently has no true-scale visual of any kind.**
Both "planet comparison" and "Solar System scale" are high-risk concepts, and the only size cue a
learner gets is a set of circles explicitly labelled as not-to-scale. The numbers live in a table;
nothing turns them into a picture.

Keep the component and its tap-to-profile behaviour. Add a scale visual alongside it (below).

## Gaps

- **Solar System distance scale** — no visual. The chapter teaches A.U. and light-years and offers a
  calculator, but never *shows* the spacing. This is the classic misconception the textbook's own
  "tidak mengikut skala" note exists to manage.
- **§12.1 "Hubungan antara Ciri Planet"** — no visual, but the section is relational reasoning
  served by tabs and accordions. **No new visual needed.**
- **§12.1 "Situasi Hipotetikal"** — no visual, and deliberately so; it is a thinking exercise.
  **No new visual needed.**
- **Earth suitability** — already served by `FlipCardGrid`. **No new visual needed.**

---

# CHAPTER 13 — METEOROIDS, ASTEROIDS AND COMETS

## Current visuals

| Visual | File | Where | Type | Verdict |
|---|---|---|---|---|
| `MeteoroidEntryFigure` | [MeteoroidEntryFigure.tsx](src/components/notes/blocks/MeteoroidEntryFigure.tsx) | §13.1 | SVG + INTERACTIVE | **KEEP** |
| `AsteroidBeltFigure` | [AsteroidBeltFigure.tsx](src/components/notes/blocks/AsteroidBeltFigure.tsx) | §13.1 | SVG + INTERACTIVE | **KEEP** |
| `CometOrbitFigure` | [CometOrbitFigure.tsx](src/components/notes/blocks/CometOrbitFigure.tsx) | §13.1 | SVG + INTERACTIVE | **KEEP** |
| `ch13-meteoroid-asteroid-komet.png` | `src/assets/science/form2/` | chapter `blogHighlight` | DECORATIVE IMAGE | **KEEP** |

All three were built and gate-verified in this session: the naming-by-altitude sequence, the belt
strictly between Mars and Jupiter with all three Earth-crossing orbits, and the comet tail
anti-sunward at all six orbital positions with nothing clipped. **None should be replaced by an AI
image** — each encodes exact geometry that generation cannot be trusted to reproduce.

## Gaps

The three source photographs (Gambar foto 13.2 Arizona crater, 13.3 dinosaur extinction, 13.4
near-Earth asteroid) are carried in text only. Of the three, **the Arizona crater is the one with
real teaching value** — it makes "a small object leaves a permanent 1.2 km scar" concrete in a way
a number cannot.

---

# NEW IMAGE SPECIFICATIONS

## 1. Green building — heat management in a Malaysian home (Ch9 §9.4) — **A, Priority 1**

- **Concept:** applied heat transfer in building design.
- **Purpose:** connect conduction, convection and radiation to a real structure students can see.
- **Students must understand:** a building can be designed to *reduce* heat gain and *encourage*
  heat loss, using the same three transfer modes taught in the chapter.
- **Scene:** cutaway or three-quarter view of a modern Malaysian house — pitched roof with
  reflective/light-coloured surface, wide eaves shading windows, open louvred windows on opposite
  walls with visible cross-ventilation, insulated ceiling cavity, mature trees on the sun-facing
  side, solar panels optional. Daylight, tropical setting.
- **Scientific details:** light roof colour (reflects radiation); overhangs shading glass; openings
  on *opposite* walls for cross-flow; ceiling insulation between roof and living space.
- **Must NOT show:** arrows or heat-flow annotations baked in; snow, temperate architecture, or
  closed sealed windows with air-conditioning as the "green" solution.
- **Labels:** HTML/SVG overlay, not baked in — the chapter ships BM and DLP from one asset.
- **Orientation:** **landscape**.

## 2. Vacuum jar (bell jar) demonstration (Ch10 §10.1) — **A, Priority 1**

- **Concept:** sound requires a medium.
- **Purpose:** apparatus recognition plus the result of the classic demonstration.
- **Students must understand:** as air is removed, the sound fades although the bell is still
  visibly ringing — so sound cannot travel through a vacuum.
- **Scene:** glass bell jar on a vacuum plate, an electric bell suspended inside on a stand, a
  vacuum pump connected by tubing at the base, laboratory bench.
- **Scientific details:** the bell must be visibly *suspended* (not touching the glass), the seal
  at the base must read as airtight, the pump must be connected.
- **Must NOT show:** the bell resting against the jar wall (that would conduct sound through the
  glass and contradict the demonstration); visible sound waves in the evacuated space.
- **Labels:** HTML/SVG overlay.
- **Orientation:** **portrait** or square — the apparatus is tall.

## 3. Arizona meteorite crater (Ch13) — **A, Priority 2**

- **Concept:** consequence of a meteorite impact.
- **Purpose:** make the printed figures (1.2 km diameter, ~50 000 years) tangible.
- **Students must understand:** even a comparatively small body leaves a large, permanent surface
  scar.
- **Scene:** aerial or high-oblique view of a large circular impact crater in arid terrain, raised
  rim, flat floor, desert scrub, clear sky. Something in frame for scale (road, vehicle track).
- **Must NOT show:** a volcanic caldera profile, a fresh fireball, or dinosaurs.
- **Labels:** HTML/SVG overlay for the diameter and age.
- **Orientation:** **landscape**.

## 4. Everyday scene containing all three heat transfers (Ch9) — **A, Priority 2**

- **Concept:** identifying conduction, convection and radiation in one real situation.
- **Purpose:** transfer. The chapter teaches the three separately; exam items ask students to spot
  which is which in a single scene.
- **Students must understand:** all three occur together in ordinary situations.
- **Scene:** a Malaysian kitchen — a metal pot on a lit gas stove, steam and air rising above it, a
  wooden spoon resting in the pot, a person's hand near (not touching) the flame.
- **Scientific details:** metal handle/spoon contact for conduction; rising steam/air for
  convection; the flame's glow reaching the nearby hand for radiation.
- **Must NOT show:** labelled arrows baked in — identifying the three is the *task*, so the image
  must stay unlabelled and let the interaction reveal them.
- **Labels:** **HTML/SVG overlay, revealed on tap** — this one specifically must not have answers
  printed on it.
- **Orientation:** **landscape**.

## 5. Musical instruments and their vibrating parts (Ch10 §10.2) — **A, Priority 2**

- **Concept:** different instruments produce sound by vibrating different parts.
- **Purpose:** ground the abstract "vibration produces sound" in familiar objects.
- **Scene:** three or four Malaysian/common instruments together — gendang (membrane), seruling
  (air column), gitar (string), gong (metal plate).
- **Must NOT show:** motion lines implying a specific frequency or waveform.
- **Labels:** HTML/SVG overlay naming the vibrating part.
- **Orientation:** **landscape**.

*This is the weakest of the five. Skip it if the budget is tight — the concept is already carried
by four text cards and the wave visualizer.*

---

# NEW SVG / INTERACTIVE SPECIFICATIONS (do NOT generate as images)

## 6. Sound propagation — compression and rarefaction (Ch10 §10.1) — **B/C, Priority 1**

The most valuable single addition in this audit, and it must be deterministic. A row of particles
with a vibrating source at one end; compressions and rarefactions travel along it; a toggle removes
the particles to show that nothing propagates through a vacuum. Particle spacing carries the whole
meaning — an AI image cannot be trusted to space them correctly, and a wrong spacing teaches the
wrong thing.

## 7. Heat vs temperature (Ch9 §9.1) — **B, Priority 2**

Two containers of water at the *same* temperature but different volumes, with thermometers reading
identically and an energy indicator showing different totals. Precise and comparative — SVG.

## 8. Solar System distance scale (Ch12) — **B, Priority 1**

A horizontal strip of the eight orbits with a true-scale / log-scale toggle, so the learner sees
directly why textbook diagrams are never to scale. Every AI-generated solar system image gets
planet spacing wrong; this must be computed from the shipped distance data, which the chapter
already holds in `PlanetComparisonTable`.

---

# FINAL OUTPUT

## CHAPTER 9
- **KEEP:** ConductionDiagram · ConvectionRadiation · BreezeDiagram · MatchingPairs ·
  ExpansionParticles · BimetallicStrip · SurfaceComparison · ch9-haba.png
- **REPLACE:** none
- **NEW IMAGES:** Green building (P1) · Everyday three-transfer scene (P2)
- **SVG/INTERACTIVE ONLY:** heat vs temperature (§9.1); conduction; convection; radiation; thermal
  expansion; bimetallic strip; land/sea breeze

## CHAPTER 10
- **KEEP:** SoundMediaDiagram · WaveVisualizer · DopplerWavefronts · EchoDiagram ·
  EcholocationDiagram · HearingRangeChart · ch10-gelombang-bunyi.png
- **REPLACE:** none
- **NEW IMAGES:** Vacuum jar demonstration (P1) · Musical instruments (P2, optional)
- **SVG/INTERACTIVE ONLY:** sound propagation particles (§10.1 — highest value); pitch/loudness;
  echo; Doppler; echolocation; hearing range

## CHAPTER 11
- **KEEP:** GalaxyCardGrid + 3 galaxy photographs · CosmicScale · MilkyWayLocator ·
  StellarLifecycle · star colour/temperature slider · StarSizeCompare · ch11 png
- **REPLACE:** none
- **NEW IMAGES:** **none**
- **SVG/INTERACTIVE ONLY:** star colour/temperature; relative star sizes; stellar life-cycle
  branches; Milky Way position; cosmic scale

## CHAPTER 12
- **KEEP:** PlanetComparisonTable · AuLightYearCalculator · FlipCardGrid · ch12 png
- **IMPROVE:** PlanetSphereList — keep it, but it must stop being the chapter's only size cue
- **REPLACE:** none
- **NEW IMAGES:** **none**
- **SVG/INTERACTIVE ONLY:** Solar System distance scale (P1); planet comparison; Earth suitability;
  planet motion

## CHAPTER 13
- **KEEP:** MeteoroidEntryFigure · AsteroidBeltFigure · CometOrbitFigure · ch13 png
- **REPLACE:** none
- **NEW IMAGES:** Arizona crater (P2)
- **SVG/INTERACTIVE ONLY:** meteoroid → meteor → meteorite; asteroid belt; Earth-crossing paths;
  comet orbit; comet tail direction

---

## TOTAL NEW AI IMAGES RECOMMENDED: **5**

### PRIORITY 1 — MUST GENERATE
1. **Green building, Malaysian home** — Ch9 §9.4 (landscape) — a whole standard with no visual
2. **Vacuum jar demonstration** — Ch10 §10.1 (portrait/square) — exam apparatus, currently text only

### PRIORITY 2 — NICE TO HAVE
3. **Arizona meteorite crater** — Ch13 (landscape)
4. **Kitchen scene with all three heat transfers, unlabelled** — Ch9 (landscape)
5. **Musical instruments and vibrating parts** — Ch10 §10.2 (landscape) — lowest value, skippable

### DO NOT GENERATE — keep as SVG / interactive
- **Ch9:** conduction, convection, radiation mechanisms; thermal expansion; bimetallic strip;
  land/sea breeze *(BreezeDiagram in particular — AI would reverse the arrows)*
- **Ch10:** sound propagation through particles; wave amplitude/frequency; echo path; Doppler
  wavefronts; echolocation; hearing-range chart
- **Ch11:** star colour/temperature; relative star sizes; stellar life-cycle branches; Milky Way
  position; cosmic scale *(galaxy morphology already correctly uses real photographs)*
- **Ch12:** planet comparison table; A.U./light-year conversion; **Solar System distance scale**
- **Ch13:** all three figures — meteoroid entry sequence, asteroid belt with Earth-crossing orbits,
  comet orbit and tail direction

---

## Two things worth acting on before any image work

Both are higher value than any image on the list:

1. **Ch10 §10.1 sound propagation (SVG)** — the chapter's core mechanism is currently prose only.
2. **Ch12 Solar System distance scale (SVG)** — the chapter has no true-scale visual at all, and
   its only size cue is explicitly labelled not-to-scale.

Neither should be an AI image. Both are cheap to build from data the chapters already hold.
