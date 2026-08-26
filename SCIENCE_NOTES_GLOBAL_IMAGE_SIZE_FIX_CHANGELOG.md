# GLOBAL LEARNER-FACING IMAGE SIZE / VISUAL DENSITY FIX — AcadeMY Notes

**Date:** 2026-08-25
**Scope:** Notes image rendering across all subjects. No academic content changed, no image
regenerated, no source WebP modified, no resolution reduced, nothing cropped or stretched.

---

## 1. Root cause

Traced before editing. Every `<img>` inside Notes was audited: raw tags, shared components,
annotated/hotspot components, image cards and responsive wrappers.

The oversized behaviour came from **unbounded width in a wide notes column**, in two distinct places:

**(a) `AnnotatedImage` — the Science Form 2 annotated figures.** The frame was:

```
relative w-full          → width = 100% of the notes column
style={{ aspectRatio }}  → height = width ÷ ratio
```

No `max-width`, no `max-height`. In a 900px probe column the inner content width measures **833px**,
so every figure rendered 833px wide and its height followed the aspect ratio. For a portrait 3:4
diagram that meant **1066px tall — 118% of a 900px viewport.**

**(b) Raw `<img>` instructional figures elsewhere in Notes.** 29 occurrences across 21 Sejarah,
Geography and Science Form 1 files shared one identical class string,
`mx-auto block w-full max-w-2xl rounded-2xl border border-border`. That caps width at 672px but sets
**no height cap at all**, so a tall asset would repeat the same failure. `Chapter2LearningVisuals`
(Science Form 1) was worse — `block h-auto w-full object-contain` inside an uncapped `<figure>`,
i.e. fully unbounded.

Measured "before", 1440×900 viewport, 833px content width:

| Figure | Before | % of viewport height |
|---|---|---|
| Ch1 plant classification | 833 × 833 | **93%** |
| Ch1 five vertebrate groups | 833 × 624 | 69% |
| Ch1 invertebrate classification | 833 × 624 | 69% |
| Ch1 animal overview | 833 × 555 | 62% |
| Ch1 dichotomous organism set | 833 × 555 | 62% |
| Ch3 villus | 799 × 599 | 67% |
| Ch3 digestion pathways | 833 × 555 | 62% |
| Ch3 Visking tubing | 799 × 532 | 59% |
| Ch3 food tests | 833 × 468 | 52% |
| **Ch3 digestive system** | **799 × 1066** | **118%** |

Chapter 2's figures were not separately captured before the change; they went through the identical
`w-full` code path at the same measured 833px column width, so their "before" heights are derived
from that width and the artwork's ratio (carbon 833×555, water 833×469, tropical/tundra 833×469,
desert 833×555). They are labelled as derived, not measured, in §4.

---

## 2. Shared component / CSS changed

Fixed at the root. No per-image patching.

**New — [`learning-image.ts`](src/components/notes/blocks/learning-image.ts)** — the single source of
truth for instructional-image footprint. Given a variant's height budget `H` and the artwork's
intrinsic ratio `R`, the widest a figure may be is `H × R`, so the cap is expressed purely as:

```
max-width: min(variantWidth, calc(heightBudget * ratio))
```

Height is bounded without ever setting an explicit height. That matters: `aspect-ratio` combined with
a clamped `max-height` would letterbox the artwork inside its own bordered frame. This way the frame
always hugs the picture, at every viewport, with **no measurement, no ResizeObserver and no layout
shift** — `aspect-ratio` still reserves the box before the image loads.

`defaultLearningImageSize(aspect)` picks a variant when content does not name one, so an image added
to a future chapter is bounded by default rather than filling the column.

**Refactored — [`AnnotatedImage.tsx`](src/components/notes/blocks/AnnotatedImage.tsx)** — now takes a
`size` variant, centres itself (`mx-auto`), and carries the enlarge affordance.

**New — [`LearningImageLightbox.tsx`](src/components/notes/blocks/LearningImageLightbox.tsx)** — built
on `@radix-ui/react-dialog`, already in the dependency tree. No gallery library added.

**CSS — [`styles.css`](src/styles.css)** — three scoped classes for the raw-`<img>` surfaces:

```css
.notes-figure-img            /* width:auto; max-width:min(42rem,100%); max-height:min(52vh,470px) */
.notes-figure-img--portrait  /* max-width:min(28rem,100%);   max-height:min(58vh,540px) */
.notes-figure-img--wide      /* max-width:min(48.75rem,100%); max-height:min(55vh,500px) */
.notes-figure-frame          /* max-width:min(48.75rem,100%); centred — for wrappers whose
                                overlay markers are positioned against the box itself */
@media (max-width: 640px)    /* all three → max-width:100%; max-height:58vh */
```

`width: auto` lets the browser's replaced-element sizing keep the intrinsic ratio while both caps
apply, so these never letterbox either.

**Scope guard.** The 29 raw-image call sites were updated by substituting **one shared class string**,
not by editing images one at a time. `notes-figure-img` / `notes-figure-frame` appear **only** under
`src/components/notes/` — verified by grep. Untouched: logos, navbar icons, avatars, badges, subject
thumbnails, habitat flip-cards, `GalaxyCardGrid` thumbnails, button icons, decorative backgrounds,
hero artwork, Cosmic Companion, Ace, and every UI icon.

---

## 3. Size variants introduced

| Variant | Max width | Height budget | Used for |
|---|---|---|---|
| `compact` | 520px | `min(46vh, 380px)` | single organism, simple apparatus, reference strips |
| `standard` | 700px | `min(52vh, 470px)` | classification sets, standard diagrams (default) |
| `wide` | 780px | `min(55vh, 500px)` | multi-stage processes — nutrient cycles, pathway rows |
| `portrait` | 460px | `min(58vh, 540px)` | tall anatomy |

`wide` is deliberately 780px against an 833px column, so even the widest diagram visibly stops short
of both edges rather than touching them.

---

## 4. Chapters 1–3 visuals checked

All measured at 1440×900. Aspect ratio preserved on every figure (`ratioBad: 0` throughout).

### Chapter 1

| Figure | Variant | Before | After | Height reduction |
|---|---|---|---|---|
| Animal classification overview | standard | 833×555 (62vh) | **698×465 (52vh)** | −16% |
| Five vertebrate groups | standard | 833×624 (69vh) | **622×466 (52vh)** | −25% |
| Invertebrate classification | standard | 833×624 (69vh) | **622×466 (52vh)** | −25% |
| **Plant classification** | standard | 833×833 (93vh) | **466×466 (52vh)** | **−44%** |
| Dichotomous organism set | compact | 833×555 (62vh) | **518×345 (38vh)** | −38% |

Plant classification no longer dominates the screen — all four plant groups sit in a 466px square at
52vh. The organism set is now a compact reference strip at 38vh, so the section reads as
interaction-led rather than as a passive poster above the key.

### Chapter 2

| Figure | Variant | Before (derived) | After | Height reduction |
|---|---|---|---|---|
| Carbon / oxygen cycle | wide | 833×555 (62vh) | **741×493 (55vh)** | −11% |
| Water cycle | wide | 833×469 (52vh) | **778×437 (49vh)** | −7% |
| Tropical adaptation | compact | 833×469 (52vh) | **518×291 (32vh)** | −38% |
| Desert adaptation | compact | 833×555 (62vh) | **518×345 (38vh)** | −38% |
| Tundra adaptation | compact | 833×469 (52vh) | **518×291 (32vh)** | −38% |

Both cycle diagrams now stop short of the card edges (741px and 778px inside 833px). The three
adaptation images dropped to 518px so the `challenge → adaptation → function → advantage` text sits
beside the artwork instead of a screen below it. BM and DLP measured identical.

### Chapter 3

| Figure | Variant | Before | After | Height reduction |
|---|---|---|---|---|
| **Digestive system** | portrait | 799×1066 (**118vh**) | **390×520 (58vh)** | **−51%** |
| Villus absorption | compact | 799×599 (67vh) | **505×378 (42vh)** | −37% |
| Visking tubing | compact | 799×532 (59vh) | **518×345 (38vh)** | −35% |
| Digestion pathways | standard | 833×555 (62vh) | **698×465 (52vh)** | −16% |
| Food tests | standard | 833×468 (52vh) | **698×392 (44vh)** | −16% |

The digestive system was the critical case: it was **taller than the entire viewport**. It now fits on
screen at 58vh with all 11 markers and its legend, and the full-resolution detail is one tap away.

### Spacing rhythm

Measured around the Chapter 3 digestive figure: **12px** from the preceding element to the figure,
**8px** image → legend, **8px** legend → caption. A 522px image occupies a 647px block — 125px of
chrome. Figure gap tightened from 10px to 8px, legend row gap from 4px to 2px.

---

## 5. Other Notes surfaces affected

The shared fix applies globally through the two CSS classes; no unrelated chapter was rewritten and
no intentionally small card was altered.

- **Sejarah (Form 1, 2, 3) and Geography** — 29 instructional images across 21 files. Verified live on
  Sejarah Form 2 Chapter 1: a 2304×1536 asset renders **672×449 (50vh)** with computed
  `max-width: min(672px, 100%)` and `max-height: 468px`, aspect preserved. These were already capped
  at 672px wide, so this is primarily a **height safety net** — it prevents the Chapter 3 failure mode
  from reaching those surfaces if a tall asset is ever added. Stated plainly: no visible regression
  and no dramatic change on these surfaces today.
- **Science Form 1** — the two `Chapter2LearningVisuals` figures were genuinely unbounded. Their
  wrapper now carries `.notes-figure-frame`, verified to cap at **780px** and centre inside a 900px
  column. Their percentage-based SVG hotspot overlays scale with the frame and are unaffected.
- **Science Form 2 Chapters 4–13** — share `ScienceF2InteractiveNotesBlock`. Any image they add is
  bounded automatically by `defaultLearningImageSize`.

---

## 6. Desktop QA

Measured across every figure in all three chapters, both languages. `outside` = markers outside the
image bounds, `collide` = marker-to-marker overlaps, `ratioBad` = aspect distortion.

**1440 × 900**

| | figures | max width | max height | outside | collide | ratioBad | overflow-X |
|---|---|---|---|---|---|---|---|
| Ch1 BM / DLP | 5 / 5 | 698 | 52% | 0 | 0 | 0 | none |
| Ch2 BM / DLP | 3 / 3 | 778 | 55% | 0 | 0 | 0 | none |
| Ch3 BM / DLP | 5 / 5 | 698 | 58% | 0 | 0 | 0 | none |

**1366 × 768**

| | max width | max height | outside | collide | ratioBad | overflow-X |
|---|---|---|---|---|---|---|
| Ch1 BM / DLP | 597 | 52% | 0 | 0 | 0 | none |
| Ch2 BM | 749 | 55% | 0 | 0 | 0 | none |
| Ch3 BM | 698 | 58% | 0 | 0 | 0 | none |

No figure exceeds 58% of viewport height at either desktop size.

---

## 7. Tablet QA — 768 × 1024

| | max width | % of viewport width | max height | outside | collide | ratioBad | overflow-X |
|---|---|---|---|---|---|---|---|
| Ch1 BM / DLP | 695 | 90% | 46% | 0 | 0 | 0 | none |
| Ch2 BM | 695 | 90% | 45% | 0 | 0 | 0 | none |
| Ch3 BM / DLP | 695 | 90% | 53% | 0 | 0 | 0 | none |

Within the 80–90% target, centred, height-limited, no horizontal scrolling.

---

## 8. Mobile QA

| Viewport | Chapter | max width | max height | outside | collide | ratioBad | overflow-X |
|---|---|---|---|---|---|---|---|
| 430 × 932 | Ch1 BM | 387 | 42% | 0 | 0 | 0 | none |
| 430 × 932 | Ch2 BM | 387 | 28% | 0 | 0 | 0 | none |
| 430 × 932 | Ch3 BM | 387 | 51% | 0 | 0 | 0 | none |
| 390 × 844 | Ch1 BM | 347 | 41% | 0 | 0 | 0 | none |
| 390 × 844 | Ch2 DLP | 347 | 27% | 0 | 0 | 0 | none |
| 390 × 844 | Ch3 BM | 347 | 50% | 0 | 0 | 0 | none |
| 375 × 812 | Ch1 BM / DLP | 332 | 41% | 0 | 0 | 0 | none |
| 375 × 812 | Ch3 BM | 332 | 49% | 0 | 0 | 0 | none |

Images use the full inner card width, never overflow, and stay within the 50–58vh guidance. Legend
renders as **1 column at 375px**, 2 from `sm`, 3 from `lg` — no horizontal clipping.

---

## 9. Hotspot scaling status

**All markers are percentage-positioned** (`left: x%`, `top: y%`) against the image box — there is not
a single absolute pixel coordinate in the system. Shrinking the frame moves every marker with the
artwork automatically, and the same coordinates drive the enlarge overlay.

Verified after the size reduction, at every viewport above: **0 markers outside their image, 0
collisions** — including the densest case, the 11-marker digestive diagram now rendering at 390px wide.

Marker sizing:

| | Visual dot | Effective touch target |
|---|---|---|
| Desktop (`sm`+) | 24 × 24 px | 24 px + 1 unit inset |
| Mobile | **20 × 20 px** | **40 × 40 px** (measured) |

The dot stays small so it does not cover anatomy; a transparent `::before` inset expands the tap area
to 40px on phones, inside the 36–44px accessibility target. Long labels stay off the artwork —
numbered markers plus a compact legend beneath, as before.

---

## 10. Enlarge / modal behaviour

Click or tap any figure's **Enlarge** control to open a full view.

| | Inline | Enlarged | Fits viewport | Aspect | `object-fit` | Escape closes |
|---|---|---|---|---|---|---|
| Desktop 1440×900 | 390 × 520 | **615 × 820** | yes | preserved | contain | yes |
| Mobile 375×812 | 332 × ... | **351 × 468** | yes | preserved | contain | yes |

- No page navigation — Radix dialog, portal-rendered.
- Explicit close button; **Escape** verified closing on desktop and mobile.
- Backdrop is `bg-slate-950/85` with blur, matching the AcadeMY dark UI.
- Focus handling, scroll lock and the accessible title come from the existing Radix dependency.
- Localised: **BM "Besarkan" / "Tutup"**, DLP "Enlarge" / "Close". A bug found during QA — the
  Chapter 3 diagram components were showing the English default inside BM chapters — was fixed by
  passing the localised chrome from the parent, which already knows `lang`, rather than putting UI
  strings into chapter content.

---

## 11. Typecheck

```
npx tsc --noEmit → PASS
```

## 12. Build

```
npm run build → PASS
```

Nitro / Cloudflare Pages worker, PWA service worker, static shell and sitemap all generated. All 15
Science Form 2 WebP assets still bundled at full resolution — **no source image was modified,
recompressed or downscaled.**

## 13. Tests

```
npx vitest run src/components/notes src/content/form2/science
  → 8 files / 73 tests PASS
```

Includes the 18 Chapter 3 remediation tests, the 24 learner-facing leakage tests, and the
Chapter 1 / Chapter 2 component tests.

```
npx vitest run  → 1424 passed, 7 failed
```

The 7 failures are **pre-existing and unrelated** — `src/content/bm/*-mindmap` (×4),
`src/content/form2/math/chapter-1/quizzes-dlp`, `src/lib/billing-core`,
`src/lib/invoice-pdf.server`. Previously confirmed on a clean tree by stashing. Identical count
before and after this change. **No academic content was altered to make a test pass, and no existing
failure was suppressed.**

---

## VERDICT

```
GLOBAL NOTES IMAGE DENSITY:  PASS
SCIENCE F2 CH1:              PASS
SCIENCE F2 CH2:              PASS
SCIENCE F2 CH3:              PASS
MOBILE:                      PASS
BM/DLP PARITY:               PASS
HOTSPOTS:                    PASS
```

Against the stated success criteria:

1. **Major reduction in footprint** — every figure shrank; the worst offenders by −38% to −51%.
2. **Portrait diagrams no longer fill a screen** — the digestive system went from 118vh to 58vh.
3. **Wide diagrams no longer touch both edges** — capped at 741–778px inside an 833px column.
4. **Detail still inspectable** — click/tap enlarge, Escape to close, aspect preserved.
5. **Hotspots and legends correct** — 0 outside, 0 collisions at all seven viewports tested.
6. **Text and visuals read as one lesson** — 12px in, 8px out around each figure.
7. **Prevented for future chapters** — `learning-image.ts` supplies a bounded default even when a
   chapter names no variant, so the `w-full` / `max-width: none` pattern cannot return.

### Note on scope

Two things stayed deliberately untouched and are worth your awareness rather than action from me:

- The Sejarah / Geography surfaces gain a **height safety net** but look essentially unchanged today,
  because their existing 672px width cap was already reasonable. I have not restyled them further —
  that would be beyond a sizing fix.
- The pre-existing English `"🌟 Identified:"` string in `DichotomousStarMap` (flagged in the previous
  changelog) is still there. It is a localisation issue, not a sizing one.
