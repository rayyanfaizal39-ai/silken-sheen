# Science Form 2 — Chapter 7 (Electricity and Magnetism)
# TARGETED POST-GATE FIX

**Scope:** surgical correction of the two findings raised by
`SCIENCE_F2_CH07_FINAL_RELEASE_GATE.md` (verdict: FAIL — HUMAN REVIEW REQUIRED).
No academic content was rewritten. No section structure, quiz, flashcard,
mind-map node, or experiment text was touched.

**Files changed — 3, complete list:**

| File | Change |
|---|---|
| `src/components/notes/blocks/MagnetFieldDiagram.tsx` | N-01 — field direction derived from pole geometry |
| `src/components/notes/blocks/OhmsLawCalculator.tsx` | N-02 — zero/non-finite denominator interception |
| `src/content/form2/science/chapter-7/chapter-7-remediation.test.tsx` | +15 regression guards |

No content file (`interactive-*`, `quizzes-*`, `flashcards-*`, `mindmap-*`) was
modified. No other component was modified.

> **Note:** this file also carries an **N-04 addendum** at the end, covering a
> later pre-gate localization pass with its own separate file list. The list
> above describes the N-01 / N-02 pass only.

---

## N-01 — BAR MAGNET FIELD ARROWS

### Before

The bar magnet draws N on the left (red rect, x 124–160) and S on the right
(blue rect, x 160–196). Four external field arcs carried a hand-typed rotation:

```
{ d: "M196,64 C236,20 84,20 124,64", a: [160, 30],  deg: 0   }   // top    N -> S  correct
{ d: "M196,64 C256,4  64,4  124,64", a: [160, 14],  deg: 0   }   // top    N -> S  correct
{ d: "M196,86 C236,130 84,130 124,86", a: [160, 120], deg: 180 } // bottom S -> N  WRONG
{ d: "M196,86 C256,146 64,146 124,86", a: [160, 136], deg: 180 } // bottom S -> N  WRONG
```

The two lower arrowheads pointed −x, i.e. from the south pole back to the north
pole. The diagram contradicted its own on-screen caption, which reads
*"Di luar magnet, garisan medan magnet mengarah dari kutub utara ke kutub selatan."*
/ *"Outside the magnet, the field lines point from the north pole to the south pole."*

The bar magnet is the diagram's default view, so this was the first thing a
learner saw, in both streams.

**Root cause.** The file's own header comment claimed every arrow was "generated
from one rule — lines leave N and enter S outside the magnet". It was not:
`deg` was typed in per arc. Whoever wrote the lower two treated the bottom loop
as a mirror image of the top loop. It is not — reflection reverses the drawing
order but not the physics. Both loops still run N → S.

### After

Direction is now computed from the pole rectangles rather than typed, so an
arrow cannot disagree with the poles it is drawn between:

```ts
export const BAR_MAGNET_RECT = { x: 124, y: 64, w: 72, h: 22 } as const;

export const BAR_MAGNET_POLES = {
  north: { x1: BAR_MAGNET_RECT.x,          x2: BAR_MAGNET_RECT.x + BAR_MAGNET_RECT.w / 2 },
  south: { x1: BAR_MAGNET_RECT.x + BAR_MAGNET_RECT.w / 2, x2: BAR_MAGNET_RECT.x + BAR_MAGNET_RECT.w },
} as const;

export const EXTERNAL_FIELD_DEG =
  poleCentre(BAR_MAGNET_POLES.south) > poleCentre(BAR_MAGNET_POLES.north) ? 0 : 180;
```

All four arcs now carry `deg: EXTERNAL_FIELD_DEG`. `<BarMagnet>` is rendered from
the same `BAR_MAGNET_RECT`, so moving the magnet moves the rule with it.

**Result: TOP N → S, BOTTOM N → S.** Arrows were not removed. Magnet
orientation was not changed. Arc paths and arrowhead positions are byte-identical
to before.

### Not changed

`horseshoe`, `magnadur` and `like-poles` were re-measured and are correct;
none was modified.

| View | Poles (rendered screen x/y) | Arrows | Direction | Verdict |
|---|---|---|---|---|
| Bar | N 613 → S 661 | 4 | all right | N → S ✓ |
| Horseshoe | N 581 → S 693 | 3 | all right | N → S across the gap ✓ |
| Magnadur | N y 166 → S y 263 | 5 | all down | N → S ✓ |
| Like poles | inner poles S 549 / S 726 | 0 by design | — | neutral point X between the two S poles ✓ |

---

## N-02 — OHM'S LAW CALCULATOR, ZERO DENOMINATOR

### Before

```ts
if (isNaN(v))      result = `V = ${(i * r).toFixed(2)} V`;
else if (isNaN(i)) result = `I = ${(v / r).toFixed(3)} A`;
else if (isNaN(r)) result = `R = ${(v / i).toFixed(2)} Ω`;
```

`I = 0` when solving for R produced **`R = Infinity Ω`**. `R = 0` when solving
for I produced **`I = Infinity A`**. `I = -0` produced `-Infinity`.

### After

Which quantity is solved is decided by which box the learner leaves empty, so
each division branch is guarded on its own denominator — zero is **not** banned
globally, because `V = I × R` accepts it legitimately.

```ts
// V = I x R -- no denominator, so zero inputs are legitimate here.
if (isNaN(v)) { const out = show(i * r, 2, "V"); return out ? `V = ${out}` : copy.outOfRange; }

// I = V / R
if (isNaN(i)) { if (!(r > 0)) return copy.zeroResistance; ... }

// R = V / I
if (isNaN(r)) { if (!(i > 0)) return copy.zeroCurrent; ... }
```

`!(x > 0)` rather than `x === 0` — this rejects `-0` (which yields `-Infinity`)
and negative denominators (which would print a negative resistance) in the same
condition, and it matches the wording of the message shown.

Validation strings:

| Case | EN | BM |
|---|---|---|
| R = V/I, I ≤ 0 | Current must be greater than 0 A to calculate resistance. | Arus mesti lebih besar daripada 0 A untuk mengira rintangan. |
| I = V/R, R ≤ 0 | Resistance must be greater than 0 Ω to calculate current. | Rintangan mesti lebih besar daripada 0 Ω untuk mengira arus. |
| overflow | Those values are too large to calculate here. | Nilai itu terlalu besar untuk dikira di sini. |

The calculator never states that resistance is "infinite" — it says the input
cannot be used for this calculation, which is what a Form 2 learner needs.

**One additional path found during the fix (same defect class).** A
`<input type="number">` accepts `1e400`, which `parseFloat` returns as
`Infinity`; and `I = 1e200` with `R = 1e200` overflows `I × R` to `Infinity`
without any division at all. Both printed learner-facing `Infinity`. Non-finite
inputs are now treated as not entered, and every formatted result passes a
`Number.isFinite` check before display.

**Refactor for testability:** the calculation is now the exported pure function
`ohmsLawResult(values, lang)`. The component renders `ohmsLawResult(values, lang)`
and nothing else changed — the inputs, labels, layout classes and result-box
styling are untouched.

### Preserved calculations — verified live in the browser, both languages

| Input | Output | |
|---|---|---|
| V = 12, I = 0.025 | `R = 480.00 Ω` | ✓ |
| V = 6, R = 3 | `I = 2.000 A` | ✓ |
| I = 2, R = 4 | `V = 8.00 V` | ✓ |
| I = 0, R = 5 | `V = 0.00 V` | ✓ zero still valid for multiplication |
| I = 3, R = 0 | `V = 0.00 V` | ✓ zero still valid for multiplication |

Existing number formatting was kept exactly (`R`/`V` 2 dp, `I` 3 dp), so
`I = 2 A` still displays as `I = 2.000 A` as it did before this fix.

---

## TESTS ADDED

`src/content/form2/science/chapter-7/chapter-7-remediation.test.tsx`
— **86 → 101 tests (+15).**

The gate's finding was that Chapter 7 passed 86/86 while carrying a reversed
arrow, because no test looked at a drawing. These guards assert the drawn
direction **against the drawn poles**, so they fail if either moves alone.

**N-01 (9 tests)**
- poles are horizontally separated, N left of S
- every arrowhead's unit vector points from the north pole toward the south pole,
  derived from `BAR_MAGNET_POLES` — not compared to a hardcoded `0`
- arcs below the magnet point the same way as arcs above it *(this is the test
  that fails if a lower arrow regresses to 180°)*
- the arrowhead glyph itself points along its own +x axis — guards the other
  half of the pair, since flipping the path would reverse every arrow on the
  diagram without any rotation value changing
- per language: bar magnet is the default view, exactly 4 arrowheads render,
  none is `rotate(180)`, and all four agree with each other
- per language: the "direction" caption prose and the drawing agree

**N-02 (6 tests)**
- known-good values unchanged (480.00 Ω / 2.000 A / 8.00 V), both languages
- `R = V/I` with `I = 0` returns the localized message, and `I = -0` is not `-Infinity`
- `I = V/R` with `R = 0` returns the localized message
- zero still permitted where multiplication makes it valid
- **sweep:** 11 sample inputs × 3 fields × 2 languages = 726 results, none
  matching `/Infinity|NaN|undefined/`
- BM/EN parity: numeric answers identical across languages, messages differ, and
  no English phrasing appears in a BM message

### Mutation check — the guard actually bites

One lower arrow was temporarily reverted to `deg: 180` and the suite re-run:

```
× arc M196,86 C256,146 64,146 124,86 points away from the south pole (deg=180)
× a lower arc regressed to the reversed direction: expected 180 to be +0
× bm rendered an arrow pointing back toward the north pole
× dlp rendered an arrow pointing back toward the north pole
Tests  4 failed | 97 passed (101)
```

**4 independent assertions fire, including both rendered ones.** The mutation
was reverted; the file is back to `EXTERNAL_FIELD_DEG`.

---

## BROWSER QA — real components mounted from the live Vite dev graph

Both `MagnetFieldDiagram` and `OhmsLawCalculator` were mounted with the actual
shipped Chapter 7 block data, in both languages, and measured in **rendered
screen coordinates** via `getScreenCTM()` — not by reading source values.

**Bar magnet, desktop, both languages identical:**

| Measurement | BM | DLP |
|---|---|---|
| N pole (red `#d4544a`) screen cx | 613.0 | 613.0 |
| S pole (blue `#4a7fd4`) screen cx | 661.4 | 661.4 |
| N left of S | ✓ | ✓ |
| Arrowheads rendered | 4 | 4 |
| Arrow apex x / base x | 642.6 / 631.8 | 642.6 / 631.8 |
| All apex > base → all point N → S | ✓ | ✓ |
| All horizontal at the arc midpoint | ✓ | ✓ |
| **Reversed arrows** | **0** | **0** |
| Transforms | `rotate(0)` ×4 | `rotate(0)` ×4 |

Top arrows sit at svg y 14 and 30 (above the magnet, y 64–86); bottom arrows at
y 120 and 136 (below it). **TOP N → S and BOTTOM N → S, confirmed on the
rendered page, not in source.**

**Calculator, driven through the real React inputs, both languages:**

| State | BM readout | DLP readout | box h |
|---|---|---|---|
| empty | Isikan mana-mana dua nilai | Fill in any two values | 42 |
| V 12, I 0.025 | R = 480.00 Ω | R = 480.00 Ω | 42 |
| **V 12, I 0** | **Arus mesti lebih besar daripada 0 A untuk mengira rintangan.** | **Current must be greater than 0 A to calculate resistance.** | 42 |
| **V 12, R 0** | **Rintangan mesti lebih besar daripada 0 Ω untuk mengira arus.** | **Resistance must be greater than 0 Ω to calculate current.** | 42 |
| V 6, R 3 | I = 2.000 A | I = 2.000 A | 42 |
| I 2, R 4 | V = 8.00 V | V = 8.00 V | 42 |
| I 0, R 5 | V = 0.00 V | V = 0.00 V | 42 |
| restore V 12, I 0.025 | R = 480.00 Ω | R = 480.00 Ω | 42 |

Readout height is constant at 42 px across all nine states — **layout is stable**
when the message appears. Restoring normal values resumes calculation normally.
No `Infinity`, `NaN` or `undefined` appeared in any state.

**Responsive:**

| Width | Page overflow | Arrows visible / N→S | Validation message | Buttons < 40 px |
|---|---|---|---|---|
| Desktop | 0 px | 4 / 4 ✓ | fits | 0 |
| 430 px | 0 px | 4 / 4 ✓ (9.4×7.1 px each) | wraps to 62 px, right edge 418 ≤ 430 | 0 |
| 390 px | 0 px | 4 / 4 ✓ | wraps, right edge 378 ≤ 390 | 0 |
| 375 px | 0 px | 4 / 4 ✓ | wraps, right edge 363 ≤ 375 | 0 |

Arrowheads stay visible and correctly oriented at every width; the SVG scrolls
inside its own `overflow-x-auto` container rather than the page.

---

## REGRESSION — FORMER GATE SUCCESSES

Re-verified via the Science F2 suite (470/470) and the browser walk. None was
modified by this pass.

| Former gate item | Status |
|---|---|
| Mandatory experiment (Jadual 9, 7.3.3) | PASS — unchanged |
| Ammeter in series | PASS — `CircuitMeterDiagram.tsx` not modified |
| Voltmeter in parallel | PASS — not modified |
| H-04 fire alarm | SOURCE-RESOLVED — content untouched |
| Grip rule | PASS — 0 inverted, content untouched |
| Straight-wire / loop / solenoid patterns | PASS — `CurrentFieldPatterns.tsx` not modified |
| Leakage | 0 — 56/56 |
| BM/DLP parity | PASS — 10/10 sections, 30/30 quizzes, 74/74 flashcards, 195/195 nodes |
| Mobile | PASS — 0 px overflow at all four widths |

---

## NEW OBSERVATION — NOT FIXED, OUT OF SURGICAL SCOPE

**N-04 · MEDIUM · pole letters are not localized for the DLP stream.**

`BarMagnet` renders its pole labels as literals — `{flip ? "S" : "U"}` — and the
horseshoe and magnadur views hardcode `U` and `S` the same way. `U` is *Utara*.
A DLP (English-stream) learner therefore sees a bar magnet labelled **U** and
**S**, where the English convention is **N** and **S**.

- **Pre-existing.** Confirmed unchanged by this pass; the labels were never
  touched by the remediation or by this fix.
- **Not caught by the leakage test**, which scans content data files — these
  strings are hardcoded inside the component.
- **Not fixed here**, deliberately: correcting it means localizing pole labels
  across all four magnet views, which is the broad remediation this pass was
  told not to perform. It is also not a regression, so it does not meet the
  "unless a regression is discovered" condition for touching the other views.

Flagged for the release gate to adjudicate.

**Also noted, not changed:** the three calculator `<input>` elements measure
37.6 px tall (`px-3 py-2 text-sm`), below a 40 px tap target. Pre-existing
styling, unmodified by this pass — the class list is byte-identical. All
*buttons* remain ≥ 40 px.

---

## VALIDATION

```
TYPECHECK                 PASS   (tsc --noEmit, exit 0)
BUILD                     PASS   (npm run build, exit 0 — nitro + Cloudflare Pages worker)
CHAPTER 7 TESTS           PASS   101/101   (was 86/86, +15)
SCIENCE F2 TESTS          PASS   470/470   (was 455/455, +15)
LEAKAGE TESTS             PASS   56/56, 0 leaks
NOTES COMPONENT TESTS     PASS   87/87
FULL SUITE                1967 passed | 8 failed (191 files)
```

The 8 full-suite failures are **pre-existing and unrelated** — unchanged in
identity and count from the release gate's own run:

- `src/routes/-onboarding-ui.test.ts` — Explorer onboarding UI contract
- `src/lib/billing-core.test.ts` — ToyyibPay sandbox plans
- `src/lib/invoice-pdf.server.test.ts` — invoice PDF
- `src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts`
- `src/content/bm/asas-penulisan-form1-mindmap.test.ts`
- `src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts`
- `src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts`
- `src/content/form2/math/chapter-1/quizzes-dlp.test.ts`

**0 are Science Form 2. 0 are Chapter 7. 0 are attributable to this fix.**

---

## SUMMARY

```
N-01 BAR MAGNET ARROWS:            FIXED
N-01 VISUAL REGRESSION GUARD:      PASS  (9 tests; mutation-verified — 4 assertions fire on regression)

N-02 ZERO-DENOMINATOR HANDLING:    FIXED
LEARNER-FACING INFINITY/NaN:       0     (726-case sweep + 18 live browser states)

FORMER CRITICAL REGRESSIONS:       0
FORMER HIGH REGRESSIONS:           0

TYPECHECK:                         PASS
BUILD:                             PASS
CHAPTER 7 TESTS:                   PASS  101/101
SCIENCE F2 TESTS:                  PASS  470/470
BM/DLP PARITY:                     PASS
LEAKAGE:                           PASS  0 leaks, 56/56
MOBILE QA:                         PASS  desktop / 430 / 390 / 375 — 0 px overflow, arrows correct at all widths

NEW ISSUE RAISED, NOT FIXED:       N-04 MEDIUM — pole letters "U"/"S" not localized for DLP (pre-existing)
```

**Chapter 7 is NOT declared frozen.**

The independent final release gate must be re-run against this state. N-04 is
raised for that gate to adjudicate; it was deliberately left unfixed to keep
this pass surgical.

---
---

# ADDENDUM — N-04 PRE-GATE LOCALIZATION FIX

Surgical localization only. No academic teaching, quiz, flashcard, mind-map
node, section, geometry, arrow direction, experiment, or calculator was changed.
The 37.6 px calculator input height was deliberately left alone as instructed.

## N-04 — Magnet Pole Localization

**Before:** BM and DLP both rendered `U` / `S`.
**After:** BM renders `U` / `S`. DLP renders `N` / `S`.

### Scope correction — the defect was wider than my own report said

My N-04 note named only `MagnetFieldDiagram.tsx`. A sweep for hardcoded pole
letters across every notes block found a **second** affected component:

| Component | Pole letters | Status |
|---|---|---|
| `MagnetFieldDiagram.tsx` | bar, horseshoe, magnadur, like-poles (×2 magnets) | fixed |
| `CurrentFieldPatterns.tsx` | **solenoid** — `{reversed ? "U" : "S"}` | **fixed — missed by the original N-04 report** |

`BearingDiagram.tsx` also carries a literal `"U"`, but it is a compass bearing
(Utara) consumed only by `GeoChapter1NotesBlock` — Geography Form 1, not a
magnet pole. Correctly out of scope; unmodified.

No electromagnet visual other than the solenoid renders pole letters.

### Approach

Pole letters now come from the existing localized-copy architecture rather than
being typed per view. `figureCopy()` — already imported by both components —
gained four fields:

```ts
poleNorth: "U" | "N";        // south is "S" in both languages
poleSouth: string;
poleNorthName: string;       // "Kutub utara" / "North pole"
poleSouthName: string;       // "Kutub selatan" / "South pole"
```

A single shared `PoleLabel` primitive was added to `InteractiveFigureCard.tsx`
(alongside the existing `InteractiveBadge` / `conceptButtonClass` figure
primitives) and is used by every pole in both components. **No SVG was
duplicated for BM and DLP** — one drawing, one label source.

**Files changed — 5:**

| File | Change |
|---|---|
| `src/components/notes/blocks/figure-copy.ts` | +4 localized copy fields |
| `src/components/notes/blocks/InteractiveFigureCard.tsx` | + shared `PoleLabel` primitive |
| `src/components/notes/blocks/MagnetFieldDiagram.tsx` | 6 pole letters routed through `PoleLabel` |
| `src/components/notes/blocks/CurrentFieldPatterns.tsx` | 2 solenoid pole letters routed through `PoleLabel` |
| `src/content/form2/science/chapter-7/chapter-7-remediation.test.tsx` | +15 guards |

No content data file was touched.

### Views verified

| View | BM | DLP |
|---|---|---|
| Bar magnet | `U` `S` | `N` `S` |
| Horseshoe | `U` `S` | `N` `S` |
| Magnadur | `U` `S` | `N` `S` |
| Like poles / neutral point | `U` `S` `S` `U` | `N` `S` `S` `N` |
| Solenoid (`CurrentFieldPatterns`) | `S` `U` | `S` `N` |

The like-poles view faces **two south poles** (inner poles `S` … `S`), which is
valid unchanged in both languages per the brief; the outer poles are north and
did require localizing. The neutral point remains between the two like poles.

**Geometry changed: NO.** **Arrow directions changed: NO.**

Pole rectangles measured in the live DOM are byte-identical between languages:

```
bar          N@124,64  S@160,64
horseshoe    N@110,116 S@193,116
magnadur     N@96,40   S@96,112
like-poles   N@40,64 S@76,64 S@208,64 N@244,64
```

Arrowheads unchanged in every view: bar 4 @ `rotate(0)`, horseshoe 3 @ `rotate(0)`,
magnadur 5 @ `rotate(90)`, like-poles 0 by design, solenoid 1 @ `rotate(0)`.

**Accessibility localized: YES.** Each drawn letter now carries
`role="img"` + `aria-label` with the spoken pole name — *Kutub utara* /
*Kutub selatan* on BM, *North pole* / *South pole* on DLP — so a screen reader
never reads out a bare letter, and no `U` is embedded in English accessibility
text. The SVG-level `aria-label` was already localized from content data
("Magnet bar" / "Bar magnet") and was not changed.

### Tests added — 15 (101 → 116)

- every view × both streams draws the correct letters, with the correct pole
  counts (like-poles asserts 2 north + 2 south)
- the solenoid in `CurrentFieldPatterns`, rendered by forcing it to be the
  initial conductor
- **the DLP stream never renders `U`** — the explicit anti-regression guard
- the BM stream never renders `N`
- no English a11y text carries a BM pole name, and vice versa
- like-poles still faces two south poles, so the neutral point stands
- **N-01 intact:** pole rects still at `BAR_MAGNET_POLES` x-positions, N left of
  S, 4 arrowheads, none `rotate(180)`

Views other than the default are exercised by reordering `shapes` / `conductors`
so the target view becomes the component's initial state — every view is really
rendered, not just the first.

**Mutation check.** `poleNorth` for DLP was temporarily reverted to `"U"`:

```
× DLP bar north letter:        expected 'U' to be 'N'
× DLP horseshoe north letter:  expected 'U' to be 'N'
× DLP magnadur north letter:   expected 'U' to be 'N'
× DLP like-poles north letter: expected 'U' to be 'N'
× (solenoid)                   expected 'U' to be 'N'
× DLP bar regressed to a BM pole letter: expected 'U' not to be 'U'
Tests  6 failed | 110 passed (116)
```

All five views plus the explicit guard fire. Mutation reverted.

### Browser QA

All 10 view × language combinations rendered from the live Vite graph and
measured in the DOM, at **desktop, 430 px, 390 px and 375 px**:

| Check | Result |
|---|---|
| BM letters | `U`/`S` in all 5 views, all widths |
| DLP letters | `N`/`S` in all 5 views, all widths |
| Accessible names | localized per stream, all views |
| Label clipping | **none** — every letter inside its own SVG box |
| Label visibility | all visible (6–8 px glyphs) |
| SVG geometry | identical between languages |
| Arrow regression | none — counts and rotations unchanged |
| Page overflow | **0 px** at every width |

*Note: one probe run initially failed with a stale Vite HMR chunk that predated
the `export` keyword on `PoleLabel`. It was a dev-server module-cache artefact,
not a source defect — typecheck, tests and build were all green at that moment.
A forced reload with cache-busted imports resolved it, and all results above are
from the clean graph.*

---

## VALIDATION (after N-04)

```
TYPECHECK                 PASS   (tsc --noEmit, exit 0)
BUILD                     PASS   (npm run build, exit 0)
CHAPTER 7 TESTS           PASS   116/116   (86 -> 101 -> 116)
SCIENCE F2 TESTS          PASS   485/485   (455 -> 470 -> 485)
LEAKAGE                   PASS   56/56, 0 leaks
FULL SUITE                1982 passed | 8 failed
```

The 8 failures are the same pre-existing, unrelated ones listed earlier
(onboarding UI, billing, invoice PDF, 4 BM mind-map registry, Math F2 Ch1 DLP).
**0 Science Form 2. 0 Chapter 7. 0 attributable to this fix.**

---

## SUMMARY — N-04 PRE-GATE FIX

```
N-01 FIELD ARROWS:                 PASS   (re-verified: 4 arrows, all N -> S, 0 at rotate(180))
N-02 OHM CALCULATOR:               PASS   (re-verified: 0 Infinity/NaN, localized validation)
N-04 BM POLE LABELS U/S:           PASS   (bar, horseshoe, magnadur, like-poles, solenoid)
N-04 DLP POLE LABELS N/S:          PASS   (bar, horseshoe, magnadur, like-poles, solenoid)

MAGNET GEOMETRY REGRESSION:        0
FIELD-DIRECTION REGRESSION:        0

CHAPTER 7 TESTS:                   PASS  116/116
SCIENCE F2 TESTS:                  PASS  485/485
BM/DLP PARITY:                     PASS  (10/10 sections, 30/30 quizzes, 74/74 flashcards, 195/195 nodes)
LEAKAGE:                           PASS  0 leaks, 56/56
TYPECHECK:                         PASS
BUILD:                             PASS
MOBILE QA:                         PASS  desktop / 430 / 390 / 375 — 0 px overflow, no clipping
```

**Chapter 7 is NOT declared frozen.**

The independent final release gate must now be re-run against this state.
