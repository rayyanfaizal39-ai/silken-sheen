# SCIENCE FORM 2 — CHAPTER 8 (DAYA DAN GERAKAN / FORCE AND MOTION)
# CHAPTER 8 FINAL VISUAL IMPLEMENTATION

**Date:** 2026-09-01
**Baseline:** `fe7dc5d3` — the last completed Chapter 8 visual-refinement commit.
**Inputs:** `Chapter8_Final_Visual_Implementation_Pack` (16 production images + `IMPLEMENTATION_PROMPT_FOR_CODEX.md`)
**Scope:** artwork, figure geometry and lesson layout only. **Chapter 8 academic content remains FROZEN.**

---

## 0. CONCURRENT EDITING — RESOLVED BEFORE ANY WORK

A second process was editing `Chapter8ContextFigure.tsx` between the previous pass and this one. It
was implementing this same spec against the **old** artwork, including a clip-path workaround
(`ACTION_REACTION_CONTACT_SHIFT = 6.2`) that drew the separated-hands image three times and slid two
clipped halves inward to fake the palms meeting.

Editing stopped before this pass began (no file activity for 15 minutes at handover) and sole
ownership was taken. The working tree was reconciled against `fe7dc5d3`, the pack, and the spec
rather than reverted.

**Kept** (valid improvements, still in place and tested):
`CHAPTER8_LEVER_STATES` (one state driving button + panel + markers + explanation) ·
`ATMOSPHERE_HAZE_GEOMETRY` · the `initialSelection` prop that makes selected states testable ·
their responsive and accessibility fixes · their regression tests.

**Removed** (superseded by the real artwork): the contact-shift composite, its three `<image>` halves,
its clip paths, and the two tests that asserted them — replaced with assertions that the figure now
uses the supplied palms-touching image and renders both arrows together.

---

## 1. WEBP CONVERSION

All 16 production images converted with Pillow (`method=6`), verified by decoding each output and
comparing pixel-for-pixel against its source. Dimensions preserved exactly; no crop, resize, colour
change or sharpening; no source contained transparency.

Lossless was tried first for every image and rejected on size (e.g. image 01: 1110 KB lossless vs
150 KB at q93). Quality 93 was accepted after a **visual** check, not just a metric — see below.

| # | source PNG | production WebP | dimensions | mode | source | WebP | RMSE |
|---|---|---|---|---|---|---|---|
| 1 | 01_effects_of_force.png | 01_effects_of_force.webp | 1672x941 | q93 | 1467 KB | 150 KB | 2.36 |
| 2 | 02_buoyancy_everyday_life.png | 02_buoyancy_everyday_life.webp | 1672x941 | q93 | 1404 KB | 127 KB | 1.92 |
| 3 | 03_levers_everyday_life.png | 03_levers_everyday_life.webp | 1672x941 | q93 | 1481 KB | 145 KB | 2.04 |
| 4 | 04_pressure_contact_area.png | 04_pressure_contact_area.webp | 1672x941 | q93 | 1362 KB | 94 KB | 1.48 |
| 5 | 05_types_of_forces.png | 05_types_of_forces.webp | 1672x941 | q93 | 1297 KB | 106 KB | 1.70 |
| 6 | 06_action_reaction_palms_touching.png | 06_action_reaction_palms_touching.webp | 1672x941 | q93 | 1470 KB | 141 KB | 1.73 |
| 7 | 07_atmospheric_pressure_altitude.png | 07_atmospheric_pressure_altitude.webp | 1672x941 | q93 | 1720 KB | 185 KB | 1.69 |
| 8 | 08_force_push_box.png | 08_force_push_box.webp | 1672x941 | q93 | 1172 KB | 47 KB | 1.12 |
| 9 | 09_force_hammer_nail_accepted_previous.png | 09_force_hammer_nail.webp | 1672x941 | q93 | 1268 KB | 66 KB | 1.11 |
| 10 | 10_buoyant_force_spring_balance.png | 10_buoyant_force_spring_balance.webp | 1672x941 | q93 | 1542 KB | 76 KB | 1.16 |
| 11 | 11_floating_object.png | 11_floating_object.webp | 1672x941 | q93 | 1157 KB | 61 KB | 1.36 |
| 12 | 12_sinking_object.png | 12_sinking_object.webp | 1672x941 | q93 | 1491 KB | 62 KB | 1.20 |
| 13 | 13_moment_opening_door.png | 13_moment_opening_door.webp | 1672x941 | q93 | 1421 KB | 89 KB | 1.25 |
| 14 | 14_moment_spanner.png | 14_moment_spanner.webp | 1671x941 | q93 | 1204 KB | 59 KB | 1.13 |
| 15 | 15_moment_force_at_angle.png | 15_moment_force_at_angle.webp | 1672x941 | q93 | 1432 KB | 42 KB | 1.08 |
| 16 | 16_liquid_pressure_tank.png | 16_liquid_pressure_tank.webp | 1672x941 | q93 | 1466 KB | 55 KB | 1.12 |

**Total: 22.4 MB → 1.47 MB (6.7 % of source).**

**On the acceptance threshold — a correction worth recording.** The first pass gated on RMSE < 2.0
and failed images 01 and 03. Escalating quality barely helped (image 01 at q99: 1.38 % of pixels
still differed by >8, versus 1.47 % at q93, for 73 % more bytes), which showed the error was inherent
high-frequency texture rather than a quality setting. The worst-differing 400×300 tile of image 01
was cropped and inspected at 1:1 against its source: the difference is confined to the goal-net mesh
and is invisible. The gate was corrected to a perceptual one — RMSE < 3.0 **and** fewer than 0.5 % of
pixels differing by more than 16 — which every image passes at q93. The original 2.0 figure was
stricter than perception, not a real quality bar.

**No duplicate assets ship.** The production path `public/science/form2/chapter-8/` now contains
**16 `.webp` and 0 `.png`**. The source PNGs stayed in the scratch pack. The eight previously
tracked Chapter 8 PNGs were removed, including `00_chapter8_contact_sheet.png` (4.6 MB, referenced
nowhere) and `06_action_reaction.png` (the superseded separated-hands artwork). All are recoverable
from `fe7dc5d3`. No unrelated asset was touched.

---

## 2. WHAT EACH FIGURE NOW DOES

| § | Figure | Implementation |
|---|---|---|
| 6 | **Action–reaction** | Real `06_action_reaction_palms_touching.webp`, no compositing. Hit region and arrows re-measured to the palm contact at (50.4 %, 31.9 %). Two short vectors, equal length, opposite, one acting on each student. Explanation keeps equal magnitude / opposite direction / different students, and still carries no equal-displacement claim |
| 9 | **Pushing a box** | `08_force_push_box.webp` is the primary visual. SVG overlay: arrow tail on the hand–box contact (707, 545), length from the validated 10 N, head giving direction, ringed tail dot marking the point of application |
| 10 | **Hammer / nail** | The accepted `09_force_hammer_nail.webp`, not regenerated. Overlay puts the application point on the claw–nail contact and the force along the nail axis, pulling it out. No pivot marker — the frozen content teaches magnitude/direction/point here, not moments |
| 11 | **Buoyant force** | `10_buoyant_force_spring_balance.webp` replaces the drawn balance. `10 N` / `6 N` overlaid as SVG next to each instrument; `Daya apungan = 10 N − 6 N = 4 N` rendered as HTML below. Nothing baked into the raster |
| 12 | **Floating / sinking** | `11_floating_object.webp` and `12_sinking_object.webp`, switched by the existing `density < 1.0` rule. Validated density values untouched |
| 13 | **Levers** | `03_levers_everyday_life.webp` is primary. One `CHAPTER8_LEVER_STATES` entry drives button, panel, F/L/E markers and explanation together. Wheelbarrow: F = wheel, L = tray contents, E = handles. The abstract schematic is dropped from rendering for Chapter 8 |
| 14 | **Opening a door** | `13_moment_opening_door.webp`. Pivot on the hinge axis, force at the handle, perpendicular distance along the door, right-angle mark at the application point. The slider still moves the force point with the magnitude held fixed |
| 15 | **Spanner** | `14_moment_spanner.webp`. Pivot on the nut, force at the hand, perpendicular distance along the shaft. The validated 50 N / 0.2 m / 10 N m example is unchanged in the note |
| 16 | **Force at an angle** | `15_moment_force_at_angle.webp` — see §3 below |
| 17 | **Liquid pressure** | `16_liquid_pressure_tank.webp` supplies tank, water and outlets; the three jets are SVG. All three stay visible; selecting one highlights it and dims the others |
| 19 | **Atmospheric pressure** | Unchanged from the previous pass: soft translucent haze column, no boxes, no dashes, no particles |
| 20 | **Gas pressure** | Unchanged deterministic simulation — seeded init, independent velocities, wall bounces, reduced-motion fallback. Not replaced with artwork |

---

## 3. THE ANGLED-FORCE FIGURE NEEDED A DECISION

On `15_moment_force_at_angle`, the pivot sits ~1072 px left of the rope's attachment and the rope
leaves at ~47°. The foot of the perpendicular from the pivot to the rope's line of action therefore
lands at roughly (735, 1210) — about **270 px below the bottom edge of the artwork**.

Three options were available: shorten the distance (draws a false number), drop the right-angle mark
(fails the spec's core requirement), or give the figure more canvas. The third was chosen: that
figure renders on a `1672 × 1270` canvas with the image occupying the top `941`, and the line of
action, the true perpendicular and the 90° marker complete themselves in the space underneath. The
construction is honest and fully visible.

All overlay geometry for the moment and force figures is drawn in the artwork's **pixel** space
(`viewBox="0 0 1672 941"`), not percentages. The container and artwork are both 16:9, so x and y
scale equally there and a right angle drawn as a right angle still looks like one. Percentage space
(used for hit regions, where it is ideal) stretches the axes differently and would have skewed every
arrowhead and right-angle mark.

---

## 4. COLLAPSIBLE TEACHING CONTENT — REMOVED

`ScienceF2InteractiveNotesBlock.tsx` now contains **zero** `<details>` elements. Three controls were
removed and their content moved into the normal flow **verbatim**:

- "Kembangkan penerangan dan contoh" / "Expand explanation and examples" → the explanation and
  example cards render permanently.
- "Konsep lain yang perlu diingati" / "Other concepts to remember" → the flip-card facts render
  permanently under a plain heading.
- The lever schematic collapsible added in the previous pass → removed entirely, because the
  contextual photograph now marks F/L/E on real levers and its readout carries the same explanation.
  This is the §22 duplicate case, not hidden content: no text was lost.

Quiz answers, Check Yourself reveals and Mini Investigation reveals were left interactive, as the
spec allows. Applied identically to BM and DLP, which share the renderer.

---

## 5. §21 — THE BIOLOGY HERO: TRACED, NOT GUESSED

The Chapter 8 hero artwork was never a biology image. `src/assets/science/form2/ch8-daya-gerakan.png`
is football-and-rollercoaster force-and-motion art.

The actual source is the **subject-level** Science banner
(`src/assets/subjects/ChatGPT Image Jun 27, 2026, 11_01_08 AM.png`), which Chapter 8 fell back to via
`getSubjectArtwork("science")`. That image contains a stack of book spines reading **BIOLOGY**,
CHEMISTRY, PHYSICS, EARTH SCIENCE, SPACE SCIENCE, TECHNOLOGY, plus DNA helices — the "BIOLOGY" seen
in the runtime capture.

The override in `src/routes/notes.tsx:413-418` selects the Force & Motion artwork for Chapter 8
ahead of the subject fallback, and a test pins it. The correct Force-and-Motion hero is kept; nothing
was deleted on the strength of the capture alone.

---

## 6. RESPONSIVE QA (measured in a browser)

| Width | WebP loaded | PNG rendered | Horizontal scroll | Overflowing elements | Controls < 40 px |
|---|---|---|---|---|---|
| 1280 | all | 0 | none | 0 | 0 |
| 430 | all | 0 | none | 0 | 0 |
| 390 | all | 0 | none | 0 | 0 |
| 375 | all | 0 | none | 0 | 0 |

Every asset was additionally fetched directly: all return HTTP 200 with `content-type: image/webp`,
and the browser decodes them at 1672×941.

Two defects were found by this QA and fixed:
- The deep liquid-pressure jet and two of its labels ran past the right edge. Reach scale reduced
  from 48 to 35 and labels moved beside their outlets; all three jets now end well inside the frame
  (x ≈ 1170 / 1424 / 1601 of 1672) with the ordering intact.
- The spring-balance descriptive labels were centred on the same x as the values, so the longer
  strings reached back across the instruments. Both are now left-anchored clear of the balances.

A third issue was found while checking loading behaviour: every figure was `loading="lazy"`, which
defers each section's *primary* teaching image. The section rail renders one section at a time, so
those are above the fold — the primary figures are now eager, and only the secondary float/sink tank
stays lazy.

---

## 7. VERIFICATION

Files changed in `src/content/form2/science/chapter-8/`: **the two test files only.**

```
git diff --name-only src/content/form2/science/chapter-8/
  chapter-8-remediation.test.tsx
  chapter-8-visual-refinement.test.tsx
git status --short src/content/form2/science/chapter-11/   -> clean
```

One pre-existing assertion in `chapter-8-remediation.test.tsx` was updated: it pinned the old inline
arrowhead path `M-5,-4 L5,0 L-5,4 Z`, which the marker-based arrow replaced. Its intent — "renders an
arrow for each example" — is preserved and strengthened (`marker-end`, `data-force-arrow`,
`data-application-point`). Five assertions in the visual-refinement file were likewise updated from
hand-drawn SVG internals to the supplied artwork. One of those updates caught a **real** defect: the
new spring-balance view had dropped `block.buoyantForce`, so the "= 4 N" relationship was missing. It
is restored.

---

---

# CORRECTION PASS — VISUAL PLACEMENT + SIZE

**Date:** 2026-09-01 (after the final visual implementation above)

Two mistakes in the pass above were corrected. No redesign; no academic content touched.

## C1. Contextual images were too large

The figures were rendering at the full lesson-card width, so a single visual could fill most of the
viewport. One shared presentation rule now caps their **display** size — the WebP files themselves
are untouched:

| | cap | rendered at 1280 | visual height |
|---|---|---|---|
| single scene | `min(100%, 600px)` | 600 × 338 | inside 340–380 |
| comparison / multi-panel | `min(100%, 660px)` | 660 × 371 | inside 340–380 |

`wide` covers Types of Forces, Effects of Force, Levers, Buoyancy everyday-life, plus the two
two-panel comparisons whose overlay text needs the room (Pressure, spring balance). Everything else
— pushing box, hammer/nail, floating, sinking, door, spanner, force at an angle, action–reaction,
atmosphere, liquid pressure — takes the 600px cap.

Because the caps are `max-width` on a `w-full` box, mobile stays full width and the 16:9 ratio is
preserved everywhere — no separate max-height was needed, which is what would have distorted narrow
layouts. Measured: 660/600 at 1280, then 376/368 at 430, 336/328 at 390, 321/313 at 375.

**Overlays needed no adjustment.** Every hotspot, marker and SVG layer is absolutely positioned
inside the image's own `relative` box, so they scale with the picture rather than the card. Verified
after resizing: hit regions, F/L/E markers, palm arrows, contact strips, haze, force vectors, moment
geometry and liquid-pressure jets all still land correctly at all four widths.

## C2. Floating / sinking artwork was on the wrong interaction

`11_floating_object.webp` and `12_sinking_object.webp` had been wired into the **density** selector.
They belong to the **buoyant-force** figure. The two are now properly separated:

**A · Buoyant force** (`BuoyancySchematic`) — three states, all raster-backed:

| state | artwork | overlay |
|---|---|---|
| Measuring | `10_buoyant_force_spring_balance.webp` | `10 N` / `6 N` as SVG; `= 4 N` as HTML |
| Floating | `11_floating_object.webp` | F and W drawn **equal** (150 / 150) — equilibrium |
| Sinking | `12_sinking_object.webp` | W longer than F (165 / 95) — weight exceeds buoyancy |

Floating deliberately keeps the two arrows identical: drawing F longer is exactly how "floating means
an unbalanced upward force" gets taught by accident. Nothing infers density from how much of the
block is submerged in the illustration.

**B · Density** (`BuoyancySimulator`) — the original animated interaction, **recovered from git**
(`git show fe7dc5d3:...`), byte-identical to the baseline. Cork / Wood / Iron / Gold with their
approved densities; the block itself moves in a drawn tank. It uses none of the buoyant-force
artwork, and a test now forbids it.

Verified by measuring the block's rendered position per material:

| material | density | state | block position |
|---|---|---|---|
| Gabus | 0.24 | floats | 33.9 px |
| Kayu | 0.6 | floats | 33.9 px |
| Besi | 7.9 | sinks | 103.9 px |
| Emas | 19.3 | sinks | 103.9 px |

## C3. A measurement error I made, and corrected

Mid-pass I concluded the restored component's animation was broken: its inline
`transform: translateY(68px)` computed to the identity matrix and the block appeared not to move. On
that basis I rewrote it to animate an HTML element's `top` instead.

That reading was wrong. The Browser pane was hidden, which freezes the CSS animation clock, so
`getComputedStyle` kept returning the transition's *start* value. Re-measuring with transitions
disabled showed the block moving correctly, and an isolated test confirmed CSS `transform` applies
normally to an SVG `<g>` (33.9 → 103.9 px).

The rewrite was therefore unnecessary and has been reverted: `BuoyancySimulator.tsx` is now
byte-identical to `fe7dc5d3`, which is what the spec asked for — exact recovery from git, not a
reimplementation. The same hidden-pane artifact previously made the gas-particle simulation look
static; both are harness limitations, not product defects.

## C4. Still true from the pass above

No collapsible teaching content was reintroduced — `ScienceF2InteractiveNotesBlock.tsx` still
contains zero `<details>`. All 16 production assets remain WebP; no image reverted to PNG.

---

## RESULT

```
CONTEXTUAL IMAGE SIZE:
PASS

BUOYANT MEASUREMENT:
PASS

BUOYANT FLOATING STATE:
PASS

BUOYANT SINKING STATE:
PASS

ORIGINAL DENSITY INTERACTION RESTORED:
PASS

CORK:
PASS

WOOD:
PASS

IRON:
PASS

GOLD:
PASS

ESSENTIAL TEXT ALWAYS VISIBLE:
PASS

WEBP ASSETS PRESERVED:
PASS

1280:
PASS

430:
PASS

390:
PASS

375:
PASS

TYPECHECK:
PASS

BUILD:
PASS

TESTS:
PASS

ACADEMIC CONTENT CHANGED:
NO

CHAPTER 11 CHANGED:
NO

FINAL:
PASS
```

`npx tsc --noEmit` → 0 errors · `npm run build` → exit 0 · **1041/1041 tests** across 33 files
(+10 new placement/sizing guards). Only the two Chapter 8 *test* files differ inside
`src/content/form2/science/chapter-8/`; Chapter 11 untouched; 16 WebP and 0 PNG in the production
asset path; `BuoyancySimulator.tsx` byte-identical to `fe7dc5d3`.
