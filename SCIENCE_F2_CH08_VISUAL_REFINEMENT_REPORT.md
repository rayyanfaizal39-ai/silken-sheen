# SCIENCE FORM 2 — CHAPTER 8 (DAYA DAN GERAKAN / FORCE AND MOTION)
# VISUAL REFINEMENT — TARGETED FIX PASS

**Date:** 2026-08-31
**Scope:** figure geometry, diagram construction and figure chrome only, on the live Chapter 8
learner path (BM + DLP), plus the shared blocks it renders and one regression test file.
**Nature:** targeted defect repair. **Not** a redesign, and not a content pass.

**Chapter 8 academic content was FROZEN throughout and is byte-identical after this pass.**
`git diff src/content/form2/science/chapter-8/` returns **no changes** apart from the new test file.
No curriculum coverage, quiz key, flashcard fact, mind-map fact, formula or validated conclusion was
touched. **Chapter 11 was not modified** (`git status src/content/form2/science/chapter-11/` clean).
The seven approved raster images are unchanged and **no AI image was generated** — every diagram
added here is deterministic hand-authored SVG.

---

## 1. ROOT CAUSES

Three defects explained most of what the screen recording caught. Each was a single mechanism, not a
styling accident.

**A · Hit regions were drawn, and were bigger than the artwork they covered.**
`Chapter8ContextFigure.tsx` gave every hotspot `border-2`, a `hover:border-white/70`, and — when
selected — `bg-amber-300/10` plus an inset white ring. The geometry was also oversized: the `types`
boxes ran `y: 50, h: 88`, i.e. 6 %–94 % of the frame, over artwork whose panels only occupy
12.5 %–85.9 %. A visible box, sized wrong, is exactly the "translucent empty rounded rectangle
extending past the image" that was reported.

**B · The lever overlay was letterboxed.**
The F/L/E overlay used `viewBox="0 0 100 100"` **without** `preserveAspectRatio="none"`, unlike every
sibling overlay in the same file. Under the default `xMidYMid meet`, a square viewBox inside a 16:9
box is letterboxed, so the coordinates could not land on their objects no matter what values were
authored. Recalibrating numbers alone would never have fixed it.

**C · The gas particles were mathematically collinear.**
`particlePositions` derived both coordinates from `i`:

```
a = ((i * 9301 + 49297) % 233280) / 233280
b = ((i * 4517 + 12345) % 199017) / 199017
```

With `particleCount: 14`, neither modulus ever wraps — `i * 9301 + 49297` first exceeds 233280 at
i ≈ 19.8. So `a` and `b` were both *linear in `i`*, placing every particle on one straight diagonal.
The figure was not animating badly; it was drawing a line.

---

## 2. WHAT CHANGED, BY SPEC SECTION

| § | Item | Outcome |
|---|---|---|
| 0 | Typecheck baseline | PASS before any edit |
| 1 | Shared hotspot visuals | Hit region now paints **nothing** — `border-0 bg-transparent`, no hover box, no inset ring. `focus-visible:ring-2` kept for keyboard users. Selection is a soft glow pinned to the subject, plus a hairline edge only on figures whose target really is a drawn panel |
| 2 | Types of forces | Geometry recut to the measured panels (`y 49.2, h 73.4` from `y 50, h 88`) |
| 3 | Magnitude / direction / point of application | Hammer-and-nail rebuilt as deterministic SVG: wood, nail with head partly out, hammer head + handle, two claw prongs reaching under the head. Arrow tail moved to the claw contact (`tailY 104 → 96`). Hammer offset left so the upward arrow stays clear. **No AI image** |
| 4 | Action–reaction | Stopped borrowing `accordions[2]` (the **trolley**) as label and note for the **skater** photo. Now uses the section's own validated `intro` plus a line describing the picture. The trolley example keeps its own place in the accordions below, untouched. Two arrows, equal length (13 units each), opposite, leaving each palm, appearing together |
| 5 | Effects of force | Styling inherited; geometry aligned to the 2×2 grid. **Not rebuilt** |
| 6 | Buoyancy contextual | Styling inherited only |
| 7 | Buoyant force | Redrawn as a recognisable spring balance: hanging ring, graduated body with ticks, pointer, hook, suspended object. Pointer position derived from the content's own readings. **10 N / 6 N / 4 N preserved** (asserted in tests) |
| 8 | Float/sink selector | Replaced the 36 px gradient div with a water tank — walls, water, surface line — where floating straddles the surface and sinking rests on the bottom. **Density values untouched** |
| 9 | Levers F/L/E (**critical**) | Overlay converted from a letterboxed SVG to percentage-positioned HTML markers, then every coordinate re-measured against the real artwork. Verified in-browser at 375/390/430/1280 |
| 10 | Lever duplication | Contextual image is primary; the schematic is demoted to a collapsible follow-up **for Chapter 8 only**. Content preserved and still reachable |
| 11 | Moment of force | Door view now has a movable force point (range input, 30→150) with **fixed force magnitude**; only the distance changes, and a turning-effect arc at the pivot scales with it |
| 12 | Force at an angle | Was drawing the perpendicular as a *horizontal* bar that merely had the right length. Now constructs the real geometry: line of action extended through the application point, perpendicular dropped from the pivot onto it, and a 90° marker at the foot |
| 13 | Pressure | Hotspot border removed; contact strips moved onto the actual ground contact (stiletto tip at 18.4–20.6 %, sole at 59.4–88.4 %). Explanation now describes **this** image |
| 14 | Gas pressure (**critical**) | Rewritten: seeded mulberry32 init, per-particle x/y **and** velocity, elastic wall bounces, `dt` clamped so a backgrounded tab cannot tunnel a particle through a wall, `prefers-reduced-motion` fallback. Compressing keeps particle speed (temperature unchanged) and shrinks the box; heating raises speed. Particle count fixed across all three states |
| 15 | Atmospheric pressure | Ghost boxes, U-columns and dotted lines removed; replaced with a soft translucent "air above" column that simply runs out of height at the summit |
| 16 | Liquid pressure | **Kept. Not rebuilt** |
| 17 | Hero / progress counters | Investigated, not guessed — see §3 below |
| 19 | Responsive QA | 375 / 390 / 430 / 1280 — see §4 |
| 18 | Do not touch what already works | Liquid pressure, quizzes, flashcards, mind map and Chapter 11 untouched; guarded by tests. Effects/buoyancy/pressure artwork unchanged — only their oversized hit regions were recut, which §1 required |
| 20 | Regression tests | 26 new assertions, covering all 14 items §20 lists |
| 21 | Verification | tsc / build / tests / academic hash — see §5 |
| 22 | This report | — |

---

## 3. §17 — THE COUNTER MISMATCH WAS NOT A RENDERING BUG

The nav rail and the hero read from **different sources**. `ScienceSectionedNotesShell` derives the
rail from `sections.length` — the truth, 11. The hero reads `F2_SCIENCE_INTERACTIVE_META` in
`src/routes/notes.tsx`, which had explicit entries only for Chapters 2 and 3; Chapter 8 fell through
to `F2_INTERACTIVE_DEFAULT_META`, a placeholder the file's own comment describes as *"a conservative
shared default until each is audited individually."* That default declares `modules: 10`.

So the hero was showing a placeholder, not a wrong calculation. The convention was confirmed before
changing anything: Chapter 2 has 11 sections and declares `modules: 11`; Chapter 3 has 13 and
declares 13. Chapter 8 has 11 sections and one investigation (DSKP Jadual 9 → `8.2.5`), so it now
carries its own audited entry mirroring Chapter 2's:

```
8: { modules: 11, minutes: 26, experiments: 1, difficulty: "Core" },
```

A test asserts this entry equals `sections.length`, so the two surfaces cannot drift apart again.

---

## 4. §19 — RESPONSIVE QA (measured in a browser, not asserted)

Driven through a throwaway Vite harness mounting the real blocks; the harness files were deleted
afterwards.

| Width | Horizontal page scroll | Overflowing elements | Lever marker | F–L clearance |
|---|---|---|---|---|
| 375 | none | 0 | 22 px | 9 px |
| 390 | none | 0 | 22 px | 9 px |
| 430 | none | 0 | 22 px | 12 px |
| 1280 | none | 0 | 28 px | 16 px |

At 375 the markers resolved to **exactly** their authored percentages (58.8/70.8, 54.5/56.5,
41.8/48.5) with no drift — the payoff from replacing the letterboxed SVG with percentage-positioned
HTML. The selection highlight stayed inside the image bounds at every width.

**One defect was found by this QA and fixed:** at 390 the wheelbarrow's fulcrum and load markers are
only ~31 px apart, so the original 26 px badge left ~5 px of clearance. Markers are now 22 px below
`sm`, restoring 9 px.

---

## 5. §21 — VERIFICATION

```
TYPECHECK (tsc --noEmit):        PASS  (0 errors)
BUILD (npm run build):           PASS  (exit 0, Pages worker packaged)
CHAPTER 8 VISUAL TESTS:          PASS  (22/22, new)
CHAPTER 8 REMEDIATION TESTS:     PASS  (109/109, pre-existing, unchanged)
SCIENCE F2 + NOTES SUITE:        PASS  (1011/1011 across 33 files)
CHAPTER 11 FROZEN GUARDS:        PASS  (98/98, untouched)
LEARNER-FACING LEAKAGE:          PASS  (88/88)

ACADEMIC CONTENT HASH:           UNCHANGED
  git diff src/content/form2/science/chapter-8/  -> no changes (excluding the new test file)
  git status src/content/form2/science/chapter-11/ -> clean
```

### Files changed

| File | Why |
|---|---|
| `src/components/notes/chapter8/Chapter8ContextFigure.tsx` | §1, §2, §4, §5, §6, §9, §13, §15 |
| `src/components/notes/blocks/GasParticles.tsx` | §14 |
| `src/components/notes/blocks/MomentDiagram.tsx` | §11, §12 |
| `src/components/notes/blocks/ForceDiagram.tsx` | §3 |
| `src/components/notes/blocks/BuoyancySchematic.tsx` | §7 |
| `src/components/notes/blocks/BuoyancySimulator.tsx` | §8 |
| `src/components/notes/ScienceF2InteractiveNotesBlock.tsx` | §10 |
| `src/routes/notes.tsx` | §17 (one entry added) |
| `src/content/form2/science/chapter-8/chapter-8-visual-refinement.test.tsx` | §20 (new) |

`GasParticles`, `MomentDiagram` and `BuoyancySchematic` are shared blocks. `GasParticles`,
`ForceDiagram`, `BuoyancySchematic` and `MomentDiagram` are used only by Chapter 8;
`BuoyancySimulator` is reached through the Chapter 8 branch. The `LeverClasses` demotion is gated on
`isChapter8`, matching the `!isChapter8` gating already used throughout that renderer.

---

## 6. NOTES AND LIMITATIONS

- **Animation was not observed running in-browser.** The Browser pane was hidden for part of the
  pass, and `requestAnimationFrame` does not fire in a hidden tab, so the particles measured as
  stationary. That is a harness artifact, not a component defect. The simulation is instead verified
  deterministically: `seedParticles` / `stepParticles` are exported and tested for scatter,
  determinism, per-particle velocity, and wall containment over 400 steps in both box widths.
- **Pre-existing, not from this pass:** `src/routeTree.gen.ts` and `src/routes/notes.tsx` were
  already modified in the working tree when this pass began. The `notes.tsx` diff attributable to
  this pass is the single five-line Chapter 8 meta entry shown in §3.
- **Deleted scratch files:** `qa8.html`, `qa8.tsx`, `qa8.vite.config.ts` and `public/__qa_ch8.html`
  were untracked QA-harness leftovers present at the start of this session. They were reused for
  this pass and then removed. None was a project file.
- **MCP servers unavailable:** the `figma` connector needs authorization and `supabase` did not
  finish connecting. Neither was needed here.
- **A hairline edge remains on the selected panel** for panel-based figures (types, effects,
  buoyancy, levers, pressure). This is the spec's permitted "clean border following the actual
  panel", now that the geometry actually follows the panel. Non-panel figures (action–reaction,
  atmosphere) get glow only, with no rectangle.

---

## RESULT

```
TYPECHECK:
PASS

BUILD:
PASS

ACADEMIC CONTENT CHANGED:
NO

QUIZ KEYS CHANGED:
NO

FLASHCARDS CHANGED:
NO

MIND MAP CHANGED:
NO

CHAPTER 11 CHANGED:
NO

HOTSPOT GHOST BOXES:
FIXED

FORCE-ARROW EXAMPLE MATCHING:
PASS

ACTION–REACTION:
PASS

BUOYANCY SPRING BALANCE:
PASS

DENSITY VISUAL:
PASS

LEVER F/L/E OVERLAYS:
PASS

MOMENT PERPENDICULAR GEOMETRY:
PASS

PRESSURE:
PASS

GAS PARTICLE MOTION:
PASS

ATMOSPHERIC PRESSURE:
PASS

LIQUID PRESSURE REGRESSION:
PASS

1280:
PASS

430:
PASS

390:
PASS

375:
PASS

FINAL:
PASS
```

### Evidence behind each line

| Line | How it was established |
|---|---|
| TYPECHECK | `npx tsc --noEmit` → exit 0, 0 errors |
| BUILD | `npm run build` → exit 0, Pages worker packaged |
| ACADEMIC CONTENT / QUIZ KEYS / FLASHCARDS / MIND MAP | `git diff src/content/form2/science/chapter-8/` → no changes (excluding the new test file). Quiz keys additionally pinned in-test against the pre-pass baseline for both streams |
| CHAPTER 11 | `git status src/content/form2/science/chapter-11/` → clean; its 98 guards still pass |
| HOTSPOT GHOST BOXES | Hit regions render `border-0 bg-transparent`, asserted per button; geometry recut to measured panels; confirmed visually at 375 |
| FORCE-ARROW EXAMPLE MATCHING | Nail view draws nail + claw + hammer; arrow tail at the claw contact (`tailY 96`), direction `-90` |
| ACTION–REACTION | Label/note no longer borrow the trolley accordion; no equal-distance claim; both arrows drawn from one list, equal length, opposite, shared line |
| BUOYANCY SPRING BALANCE | Ring/scale/pointer/hook rendered; 10 N / 6 N / 4 N asserted in both streams |
| DENSITY VISUAL | Tank with water and surface line; float straddles the surface, sink rests on the bottom; density values untouched |
| LEVER F/L/E OVERLAYS | Ordering asserted per class (wheelbarrow: effort → load → fulcrum, i.e. load between wheel and handles); all markers inside their own panel; measured in-browser at 4 widths with zero drift |
| MOMENT PERPENDICULAR GEOMETRY | `perpendicularFoot` asserted to land on the line of action, meet the pivot at 90°, and equal `150·cos45°` — shorter than the handle |
| PRESSURE | Contact strips on the stiletto tip and the sole; explanation describes this image |
| GAS PARTICLE MOTION | Seeded layout scatter (deviation > 15 vs 0 before), determinism, distinct per-particle velocities, containment over 400 steps in both box widths, count fixed across states |
| ATMOSPHERIC PRESSURE | No hit-region box, no dashed stroke anywhere; one soft gradient column, taller at the foot than at the summit |
| LIQUID PRESSURE REGRESSION | `DepthPressure` untouched (not in the changed-file list); still renders every declared depth level and its controls in both streams |
| 1280 / 430 / 390 / 375 | Measured in a browser: no horizontal page scroll, zero overflowing elements at every width |

**FINAL: PASS.** This was a visual/implementation pass only. Chapter 8's academic freeze is intact,
and this pass does not itself constitute a release gate.
