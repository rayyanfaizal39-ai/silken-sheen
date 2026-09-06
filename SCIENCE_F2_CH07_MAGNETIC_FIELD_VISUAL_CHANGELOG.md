# Science Form 2 · Chapter 7 — Magnetic-field visual & interaction pass

Visual/interaction only. No academic text, quiz, flashcard, answer key, DSKP
mapping or chapter structure was changed, and no chapter other than 7 was
touched.

---

## 1. Live render path (traced before any edit)

```
src/routes/notes.tsx
  → src/content/registry.ts            "science-f2-c7-bm" / "science-f2-c7-dlp"
      sciF2InteractiveData: scienceF2C7InteractiveBM | scienceF2C7InteractiveDLP
  → src/components/notes/ScienceF2Chapter7NotesBlock.tsx
      (a re-export of ScienceF2InteractiveNotesBlock)
  → src/components/notes/ScienceF2InteractiveNotesBlock.tsx
      section.magnetFieldDiagram   → blocks/MagnetFieldDiagram.tsx
      section.currentFieldPatterns → blocks/CurrentFieldPatterns.tsx
```

What each of the six named concepts was rendered by, before this pass:

| Concept | Was |
|---|---|
| Straight current-carrying wire | `CurrentFieldPatterns`, hand-drawn SVG: 3 circles + a vertical line |
| Current-carrying circular loop | `CurrentFieldPatterns`, hand-drawn SVG: **two separate rings of concentric circles**, one round each side of an ellipse |
| Solenoid | `CurrentFieldPatterns`, hand-drawn SVG: 6 ellipses, one axial line, two outer arcs |
| Neutral point | `MagnetFieldDiagram`, `features[id="neutral"]` — its note rendered **for every magnet**, including the horseshoe |
| Like-pole field | `MagnetFieldDiagram`, `shape="like-poles"` — hand-placed arcs converging **into** the neutral point |
| Permanent-magnet field strength | `MagnetFieldDiagram`, `shape="bar"`, 4 hand-placed arcs; "density" only thickened the stroke |

---

## 2. Assets — PNG → WebP

All three approved source PNGs were converted before integration. Production
references `.webp` only; the source PNGs were **not** copied into `public/`.

| Source PNG (1672 × 941) | Production WebP | Size | Quality |
|---|---|---|---|
| `ch7_straight_current_carrying_wire_apparatus.png` (1350.3 KB) | `public/science/form2/chapter-7/07_05_straight_current_carrying_wire_apparatus.webp` | **36.6 KB** | 84 |
| `ch7_current_carrying_circular_loop_apparatus.png` (1581.9 KB) | `public/science/form2/chapter-7/07_06_current_carrying_circular_loop_apparatus.webp` | **39.3 KB** | 84 |
| `ch7_current_carrying_solenoid_apparatus.png` (1327.5 KB) | `public/science/form2/chapter-7/07_07_current_carrying_solenoid_apparatus.webp` | **57.1 KB** | 84 |

- Every file stays **1672 × 941** — the exact source resolution, so aspect ratio
  is preserved exactly, nothing is cropped and nothing is upscaled. That is
  ~2.8× the 600 px display width, which covers 2× and 3× displays.
- File names follow the numbering convention Chapters 7–10 already use
  (`07_01_…` … `07_04_…`), continuing it rather than introducing a second style.
- Registered in `src/content/form2/science/visual-assets.ts` as
  `straightWireApparatus`, `circularLoopApparatus`, `solenoidApparatus`.

---

## 3. Display size

Rendered through the shared `learning-image` sizing at variant `scene`
(`maxWidth: 600`, `heightBudget: min(40vh, 350px)`), measured live:

| Viewport | Figure box |
|---|---|
| 1280 px | 598 × 336 |
| 430 px | 366 × 205 |
| 390 px | 327 × 184 |
| 375 px | 313 × 175 |

Within the 560–600 px wide / 340–380 px tall band on desktop, full width and
uncropped on a phone, `object-fit: contain`, `margin-inline: auto`.

---

## 4. New/changed code

| File | Change |
|---|---|
| `src/components/notes/blocks/ch7-field-geometry.ts` | **new** — all overlay geometry, in the artwork's own 1672 × 941 pixel space, plus an RK4 field-line tracer |
| `src/components/notes/blocks/ApparatusOverlayFigure.tsx` | **new** — raster + SVG in one aspect-locked box |
| `src/components/notes/blocks/CurrentFieldPatterns.tsx` | rewritten around the three apparatus photographs |
| `src/components/notes/blocks/MagnetFieldDiagram.tsx` | traced bar-magnet and like-pole fields; neutral-point gating |
| `src/components/notes/blocks/figure-copy.ts` | four shared BM/DLP strings for the field key and ⊙/⊗ symbols |
| `src/content/form2/science/interactive-types.ts` | `ConductorPattern.image`, `MagnetFieldFeature.requiresShape` |
| `src/content/form2/science/visual-assets.ts` | the three new files |
| `src/content/form2/science/chapter-7/interactive-{bm,dlp}.ts` | per-conductor `image` (src/alt/caption) + `requiresShape: "like-poles"` |
| `src/content/form2/science/chapter-7/chapter-7-field-overlays.test.tsx` | **new** — 75 regression tests |
| `src/content/form2/science/chapter-7/chapter-7-remediation.test.tsx` | updated to the new geometry API; every assertion's intent preserved |

### How raster and overlay stay together

The frame reserves the artwork's 16:9 ratio; the `<img>` fills it; the `<svg>`
is stretched over the same rectangle with `viewBox="0 0 1672 941"`. An overlay
coordinate is therefore a position *on the picture*, identical at 375 px and
1280 px. No pixel position in the codebase is desktop-specific.

---

## 5. The three overlays

**Straight wire.** Three concentric field circles centred on the wire's foot at
(836, 528) — the wire's own centre line is x = 838 — foreshortened by 0.447 so
they lie in the plane of the board, the outermost landing on the ring of
compasses. Four arrowheads per circle, each with the ellipse's exact tangent;
the far-side arrow sits at 250° rather than at the top, because the top of every
circle is where the wire is. A current arrow rides the wire. Reversing the
current rotates every arrowhead by 180° and moves nothing.

**Circular loop.** The old two-rings-of-circles drawing is gone. The loop is
seen face-on, so the resultant field through it is perpendicular to the page:
the aperture is filled with one cluster of ⊙ symbols all pointing the same way,
and four sparse ⊗ symbols outside carry the return field. One field, every part
of the loop contributing to it in the same direction — and the interior is drawn
more than twice as densely as the return, because it is the stronger field. Four
current arrows sit exactly on the copper. Reversing swaps ⊙ ↔ ⊗ everywhere.

**Solenoid.** Four straight, parallel, closely spaced interior lines running the
full length of the coil; four broad exterior arcs sweeping well clear of it and
back. Interior spacing is smaller than exterior spacing by construction. N and S
are SVG text from `figureCopy` (so DLP shows "N" and BM shows "U"), never baked
into the raster, and they swap with the current along with every arrowhead.

---

## 6. Neutral-point fix

`MagnetFieldFeature` gained `requiresShape`, and the chapter sets
`requiresShape: "like-poles"` on the neutral-point feature in both languages.
Selection is resolved by one pure function, `magnetSelection`:

- picking a shape-bound property switches the diagram to that arrangement;
- picking a different arrangement drops such a property.

So the explanation and the picture are always the same claim. Verified live:
Horseshoe → "Neutral point (X)" now switches to *Two like poles* and draws the
marker; switching to *Bar magnet* clears both the note and the marker. A test
walks every reachable (shape, feature) state and asserts the invariant holds on
each — the old bug was one tap away.

---

## 7. Like-pole field fix

Both magnet views are now **traced** rather than drawn: field lines are
integrated (RK4) through the field of the poles the figure shows. That makes the
properties true rather than intended — distinct streamlines cannot cross, and
none can reach a point where the field is zero.

- like-pole lines crossing each other: **0 pairs** (was: hand-placed arcs meeting in the gap)
- closest approach of any line to the neutral point: **36.8 units** in a 320 × 150 frame, across a 96-unit gap
- lines visibly turn away from the midline and dive into their own pole

---

## 8. Permanent-magnet field strength

Same tracer, six lines. Spacing now *is* the field strength:

- separation at the pole faces: 2.5 → 4.5 units
- separation out in the far field: 16.0 → 57.0 units — a **3.6×** spread
- crossings: **0 pairs**

Selecting "Spacing" additionally rings the two pole regions where the lines
crowd.

---

## 9. Preserved / not duplicated

Electrostatics in daily life, ammeter vs voltmeter placement, electromagnet
applications and electrostatic charge transfer are untouched and still render. A
test asserts each of the three new photographs appears exactly once per language
and that Chapter 7 still carries exactly one `currentFieldPatterns` and one
`magnetFieldDiagram` block — one primary visual per concept, no old weak visual
left beside the new one.

---

## 10. BM / DLP parity

Same three files, same order (`straight`, `loop`, `solenoid`), same component,
same geometry, same responsive behaviour. The rasters carry no language, so both
streams reference identical `src` values; only `alt` and `caption` differ, and
tests assert both facts. Overlay chrome (field key, ⊙/⊗ names, pole letters)
comes from `figureCopy`, so it cannot drift between the two.

---

## 11. Interaction / accessibility

Contextual photograph → SVG interaction → visible explanation, with nothing
essential behind a disclosure control. Every control is ≥ 44 px tall
(measured: 44 px at every breakpoint), carries `aria-pressed`, and has a visible
`focus-visible` ring. The explanation panel is `aria-live="polite"`. ⊙/⊗ symbols
and pole letters carry accessible names. No animation was added.

---

## 12. Responsive QA (live, in-browser)

| Width | Overflow | Figure box | Overlay aligned to raster | Min control |
|---|---|---|---|---|
| 1280 | none (scrollW = clientW) | 598 × 336 | yes | 44 px |
| 430 | none | 366 × 205 | yes | 44 px |
| 390 | none | 327 × 184 | yes | 44 px |
| 375 | none | 313 × 175 | yes | 44 px |

Alignment was checked by comparing the `<img>` and `<svg>` bounding rectangles
at each width — identical to sub-pixel. The magnet SVG stayed inside the
viewport at every width (430 px desktop → 314 px at 375 px).

---

## 13. Results

- `tsc --noEmit` — clean
- Chapter 7 tests — **191 passed** (116 existing + 75 new)
- Science Form 2 + notes components — **1316 passed, 0 failed**
- Full suite — 2861 passed, 8 failed; all 8 pre-exist on a clean tree
  (`-onboarding-ui`, `billing-core`, `invoice-pdf.server`, four BM mind-map
  files, `math/chapter-1/quizzes-dlp`) and are unrelated to this pass
- `npm run build` — succeeded; `dist/client/science/form2/chapter-7/` ships all
  three WebP files, the bundle references them, and `dist` contains **no** PNG
  reference for any of the three
