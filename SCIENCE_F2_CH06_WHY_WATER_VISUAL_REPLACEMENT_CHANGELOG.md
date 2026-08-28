# VISUAL REPLACEMENT CHANGELOG — Science Form 2, Chapter 6: Why Water Matters

**Date:** 2026-08-28
**Scope:** Visual replacement and asset placement only. No academic content was rewritten, no chapter
structure changed, no quiz / flashcard / mind-map touched, no learning objective altered. Chapter 6's
academic freeze/release status is unchanged.

---

## Source asset

The image was supplied as a **paste in the Claude Code message**, not as a file on disk. It was
recovered from the session transcript, where the client had stored it — **already transcoded to
WebP**. There is no PNG anywhere in the chain.

| | |
|---|---|
| Source | pasted attachment, session transcript `aa00bf6c-…jsonl` line 1262 |
| Source encoding | `image/webp`, 1536 × 1024, exactly 3 : 2 |
| Source size | **195,190 bytes (191 KB)** |
| Production path | `src/assets/notes/form2-science/chapter-6/why-water-matters-acids-alkalis.webp` |
| Production size | **195,190 bytes (191 KB)** — byte-identical to the source |
| Conversion | **none applied, deliberately** |

### Why no PNG → WebP conversion step was run

The brief asked for `why-water-matters.png` to be saved and then converted. That step is not
applicable and was skipped on purpose, for two measured reasons:

1. **No PNG exists.** The attachment arrived WebP-encoded. Writing a PNG would mean *decoding* the
   supplied WebP and re-encoding it — inventing a lossless-looking intermediate from already-lossy
   data. It would be deleted at step 6 anyway, so it would add nothing but a false provenance trail.
2. **Re-encoding would make the asset strictly worse.** Measured on the actual file:

   | Option | Size | Generations |
   |---|---|---|
   | **As supplied (shipped)** | **191 KB** | 1 |
   | Re-encode WebP q94 | 221 KB | 2 (second lossy pass) |
   | Re-encode WebP lossless | 793 KB | 2 (locks in gen-1 artefacts at 4× the size) |

   A q94 re-encode is **16 % larger** *and* a second lossy generation. Shipping the file as supplied
   is the only option that is both smaller and higher fidelity.

This satisfies the brief's actual requirement — "lossless or near-lossless, no visible quality
degradation" — by the strongest available route: zero further processing.

### Visual verification

Crops of the two smallest-text regions (the litmus caption boxes and the footer key-message strip)
were extracted at 1 : 1 and inspected. Text edges are sharp, the blue/red litmus colours are clean,
the green *WITH WATER* and purple *WITHOUT WATER* chips stay distinct, water-droplet glyphs, leader
arrows and panel borders are all intact. No banding, no smearing. The file is production-ready as
delivered.

**Asset location note:** the brief suggested `public/images/science/form-2/chapter-6/`. The asset is
instead in `src/assets/notes/form2-science/chapter-6/`, the bundled-import convention every other
Form 2 Science asset uses (`import … from "@/assets/…"` → hashed Vite URL). Using `public/` would
have created a second, unhashed convention. Build output confirms it bundles and hashes:
`dist/client/assets/why-water-matters-acids-alkalis-kvUv5lY_.webp`.

---

## Old visual removed

**Component:** `src/components/notes/blocks/DryVsAqueous.tsx`
**Removed from the DLP render:** the hand-drawn four-panel schematic — its `<Panel>` SVG
(`viewBox="0 0 92 66"`: beaker outline, dry/wet fill level, water-droplet glyph and litmus strip),
drawn once per case, plus the two-column grid that laid the four out.

The component now follows the same replace-not-stack pattern the other seven Chapter 4–6 concept
blocks use: `DryVsAqueousBlock` takes an optional `image`, and when it has one the schematic is not
rendered at all. **Runtime-verified:** `viewBox="0 0 92 66"` is absent from the DLP DOM, and the
approved asset appears exactly **once**.

---

## New visual placement

| | |
|---|---|
| Chapter / section | 6.1 · **Why Water Matters** → *Without water versus with water* |
| Data | `src/content/form2/science/chapter-6/interactive-dlp.ts` → `dryVsAqueous.image` |
| Renderer | `ScienceF2InteractiveNotesBlock` → `DryVsAqueous` → `InteractiveFigureCard` → `AnnotatedImage` |
| Asset | `why-water-matters-acids-alkalis.webp` (bundled import) |
| Size variant | `wide`, aspect `3 / 2` |
| Rendered | **741 × 493** at 1440 × 900 (55 vh — the height budget binds before the 780 px width cap) |
| Mobile | 324 × 215 at 430 px · 284 × 189 at 390 px · 269 × 179 at 375 px |
| `object-fit` | `contain`, width 100 % of card, height auto, aspect ratio preserved |
| Loading | `loading="lazy"`, `decoding="async"` |
| Enlarge | shared `LearningImageLightbox` — opens at 1230 × 820, closes on Escape and on Close |

No new modal system was created; no new figure component was created. Rendered order is the shared
card's: **badge → image + Enlarge → buttons → explanation panel → Check yourself**.

### Alt text

DLP: *"Four-panel comparison showing that acids and alkalis show their characteristic properties only
in the presence of water."* — asserted by test.
BM: not applicable — BM does not render this asset (see below).

---

## Interaction preserved

All four cases survive, driven by the block's **existing verified data**. Nothing was retyped.

| Button (DLP) | Button (BM) | Explanation source |
|---|---|---|
| Acid: without water | Asid: tanpa air | `panels[0].note` |
| Acid: with water | Asid: dengan air | `panels[1].note` |
| Alkali: without water | Alkali: tanpa air | `panels[2].note` |
| Alkali: with water | Alkali: dengan air | `panels[3].note` |

**Labels are composed, not authored.** `"Acid"` / `"Asid"` is taken from the block's existing
`acidColumnLabel` (`"Acid — tested with blue litmus paper"`) by trimming at the em-dash, and joined
to the existing `withoutWaterLabel` / `withWaterLabel`. **Zero new content strings** were added to
either language file, so the frozen chapter data is untouched — a test asserts both languages
compose to the expected four labels.

The four explanations already matched the brief's required wording, so they carry over verbatim, e.g.
*"Solid sodium hydroxide is an alkali, but without water it does not show its alkaline properties —
the red litmus paper stays red."* No ionisation equations were introduced.

**Selected-state behaviour:** clicking a button sets `aria-pressed="true"`, fills it solid primary
with a shadow, **and** rings the matching quadrant of the artwork — verified: selecting
*Alkali: without water* returned `aria-pressed` true on exactly that one region and false on the
other three. Selecting again clears both. The explanation panel reserves its height, so nothing
shifts.

**Four overlay regions** map to the four sub-panels of the artwork. Placement was verified by
rendering the region rectangles back onto the image and inspecting the composite — each lands
squarely on its own panel, inside the panel border, covering neither the *ACID* / *ALKALI* headers
nor the footer strip.

**Affordance:** ✨ Interactive / ✨ Interaktif badge, the chapter's own instruction line, 44 px
minimum buttons with `border-2`, hover lift, offset focus ring and pointer cursor. All verified at
44 px at every width tested, wrapping 2 × 2 on phones with nothing off-screen.

---

## BM / DLP

**DLP:** renders the approved WebP as the primary visual; the schematic is gone.

**BM:** keeps its existing fully localised four-panel interactive SVG. The approved artwork carries
heavy baked-in English — the banner, *WITHOUT WATER* / *WITH WATER*, *Blue litmus remains blue*,
*No acidic behaviour shown* — so putting it on a Malay page would teach in the wrong language, and no
BM text was overlaid on top of it. Runtime-verified: the BM page references
`why-water-matters` **zero** times, still renders its schematic, shows the badge in Malay, and leaks
no English chrome (`Interactive`, `Tap a concept`, `Enlarge` all absent).

BM also gained the shared affordance in this pass: the badge and 44 px controls now apply to its
schematic too, so the two surfaces feel identical even though the visual differs.

Academic parity is intact — same section, same four cases, same explanations, same key message.

```
BM LOCALIZED ASSET REQUIRED: YES
```

Needed for parity, matching the DLP artwork:
`Tanpa air` · `Dengan air` · `Asid etanoik tanpa air` · `Asid etanoik + air` ·
`Pepejal natrium hidroksida tanpa air` · `Natrium hidroksida + air` ·
`Litmus biru kekal biru` · `Litmus biru bertukar merah` · `Litmus merah kekal merah` ·
`Litmus merah bertukar biru` · `Tiada sifat berasid ditunjukkan` · `Sifat berasid ditunjukkan` ·
`Tiada sifat beralkali ditunjukkan` · `Sifat beralkali ditunjukkan` ·
banner: `Asid dan alkali hanya menunjukkan sifat cirinya dengan kehadiran air.`

BM alt text is ready for when that asset lands:
*"Perbandingan empat keadaan yang menunjukkan bahawa asid dan alkali hanya menunjukkan sifat cirinya
dengan kehadiran air."*

---

## QA

```
TYPECHECK:        PASS  (tsc --noEmit, clean)
BUILD:            PASS  (npm run build, exit 0; asset bundled + hashed)
CHAPTER 6 TESTS:  PASS  (chapter-6-remediation.test.tsx, 81 tests)
SCIENCE F2:       PASS  (13 files, 392 tests — 384 previous + 8 new)
LEAKAGE:          PASS  (learner-facing-leakage.test.ts, 48 tests)
BM/DLP PARITY:    PASS  (section count and numbers unchanged)
DESKTOP 1440×900: PASS  (741 × 493, 55 vh, no overflow)
430px:            PASS  (image 324 × 215, buttons 44 px, 2 × 2 wrap, none off-screen)
390px:            PASS  (image 284 × 189, buttons 44 px)
375px:            PASS  (image 269 × 179, buttons 44 px, panel visible after tap, Check yourself below)
```

### Regression guards added

Extended `src/content/form2/science/interactive-figure-ux.test.tsx` (+8 tests, 64 total):

- the approved WebP path resolves to a real file, ends in `.webp`, and no runtime PNG reference exists
- the required DLP alt text is exact
- all four cases still exist, in order, each with an explanation and a matching region point
- the four button labels compose correctly from existing localised strings, in **both** languages
- DLP renders the artwork and **not** `viewBox="0 0 92 66"`; the asset appears exactly once
- BM carries no `image` on this block, still renders the schematic, and never references the asset
- the block joined the shared no-dead-button / unique-id / region-maps-to-a-concept sweep
- `why water matters` joined the seven-concept replaced-visual list, which asserts both halves
  (artwork on DLP, schematic on BM) for every replacement

### Browser QA method

Verified against the live DOM in a running browser: asset URL, natural dimensions (1536 × 1024),
rendered box, `object-fit`, `loading`/`decoding`, absence of the old SVG, asset occurrence count,
button labels and heights, `aria-pressed` sync between button and region, explanation text, lightbox
open/close, and document scroll width at each viewport.

**Limitation, stated plainly:** screenshots are unavailable in this session — the browser pane does
not composite frames, so `computer{action:"screenshot"}` times out. Visual judgement of the artwork
itself was made by inspecting the source file directly at full resolution and at 1 : 1 text crops;
layout judgement was made by measuring the live DOM. No claim here rests on an unverified screenshot.

### Pre-existing failures, unrelated — reported, not hidden

The full suite still shows the same **8 failures** as before this task, in Bahasa Melayu mind maps,
Math Form 2 Chapter 1 quizzes, billing, invoice PDF and onboarding UI. None touches Science Form 2 or
any figure component. No new failure was introduced.

---

## Files changed

```
A  src/assets/notes/form2-science/chapter-6/why-water-matters-acids-alkalis.webp
M  src/content/form2/science/chapter-6/interactive-dlp.ts     dryVsAqueous.image + 4 region points
M  src/content/form2/science/interactive-types.ts             optional `image` on DryVsAqueousBlock
M  src/components/notes/blocks/DryVsAqueous.tsx               artwork path, badge, shared 44px controls
M  src/components/notes/ScienceF2InteractiveNotesBlock.tsx    passes `lang` to DryVsAqueous
M  src/content/form2/science/interactive-figure-ux.test.tsx   +8 guards
A  SCIENCE_F2_CH06_WHY_WATER_VISUAL_REPLACEMENT_CHANGELOG.md
```

`interactive-bm.ts` was **not modified**. No PNG was added to production assets, so none needed
removing.

---

## Final

```
OLD DIAGRAM REMOVED:    YES   (viewBox="0 0 92 66" absent from the DLP DOM)
NEW WEBP RENDERING:     PASS  (1536 × 1024 decoded, 741 × 493 rendered, lazy + async)
INTERACTION PRESERVED:  PASS  (4 buttons, 4 regions, 4 verified explanations, both languages)
DUPLICATE VISUALS:      0 / 1 asset  (exactly one occurrence in the rendered DOM)
BROKEN IMAGE PATHS:     0
MOBILE OVERFLOW:        0 / 3 widths
BM ENGLISH-ASSET LEAKS: 0
```

Chapter 6 academic status unchanged. Visual replacement and asset placement only.
