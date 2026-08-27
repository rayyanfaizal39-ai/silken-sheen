# REMEDIATION CHANGELOG — Sains / Science Tingkatan 2, Bab 5: Air dan Larutan (BM + DLP)

**Spec:** `SCIENCE_F2_CH05_DEEP_AUDIT_REPORT.md`, with every claim re-verified against `DSKP.pdf`, `Textbook.pdf` and `Errata.pdf` before implementation.
**Date:** 2026-08-27
**Scope:** `science-f2-c5-bm` and `science-f2-c5-dlp`.

---

## 1. Architecture

### Sections: 3 → 12 (both languages)

| # | BM | DLP |
|---|---|---|
| 1 | Sifat Fizik Air | Physical Characteristics of Water |
| 2 | Tegangan Permukaan dan Tindakan Kapilari | Surface Tension and Capillary Action |
| 3 | Bendasing dan Elektrolisis Air | Impurities and Electrolysis of Water |
| 4 | Penyejatan Air | Evaporation of Water |
| 5 | Zat Terlarut, Pelarut dan Larutan | Solute, Solvent and Solution |
| 6 | Larutan Cair, Pekat dan Tepu | Dilute, Concentrated and Saturated Solutions |
| 7 | Larutan, Ampaian dan Koloid | Solution, Suspension and Colloid |
| 8 | Kadar Keterlarutan | Rate of Solubility |
| 9 | Pelarut Semesta dan Pelarut Bukan Air | Universal Solvent and Non-Water Solvents |
| 10 | Kaedah Pembersihan Air | Water Purification Methods |
| 11 | Sistem Pembekalan Air | Water Supply System |
| 12 | Bekalan Air Alternatif dan Kelestarian Air | Alternative Water Supplies and Water Sustainability |

Section titles confirmed by mounting the real components at runtime, both languages.

### Files changed

**Live learner-facing content**
- `src/content/form2/science/chapter-5/interactive-bm.ts` — 11.9 KB → 45.1 KB
- `src/content/form2/science/chapter-5/interactive-dlp.ts` — 11.4 KB → 44.5 KB
- `quizzes-bm.ts` / `quizzes-dlp.ts` — 30 → 36 items each
- `flashcards-bm.ts` / `flashcards-dlp.ts` — 60 → 78 cards each
- `mindmap-bm.ts` / `mindmap-dlp.ts` — stage names corrected, branches added

**Shared infrastructure**
- `src/content/form2/science/interactive-types.ts` — 8 new block types
- `src/components/notes/ScienceF2InteractiveNotesBlock.tsx` — 8 new renderers wired in

**New components** (4 generic, reusable by later chapters; 4 Chapter 5-specific)
- `MiniExperiment.tsx` — generic compulsory-experiment scaffold
- `ComparisonMatrix.tsx` — generic capability grid
- `MethodCards.tsx` — generic "same three facets per option" cards
- `ConceptContrast.tsx` — generic two-concepts-side-by-side
- `CapillaryDiagram.tsx`, `ElectrolysisDiagram.tsx`, `MixtureComparison.tsx`, `WaterTreatmentFlow.tsx`

**Tests**
- `chapter-5/chapter-5-remediation.test.tsx` — new, 68 tests
- `learner-facing-leakage.test.ts` — extended to Chapter 5 (32 → 40 tests)

### Legacy files: unchanged and still shadowed

`notes-bm.ts` (31,005 bytes) and `notes-dlp.ts` (30,460 bytes) are **untouched, not deleted, and not revived**. The `sciF2InteractiveData` branch in `routes/notes.tsx` still wins over the `notes` fallback, so the interactive pipeline remains the single learner-facing notes surface. Verified content was read out of them and re-authored into the live files; nothing renders in parallel.

---

## 2. P0 fixes

### SP 5.3.2 — alternative water supply (was entirely absent)

New section 12 carries a `MethodCards` block. All three DSKP-named options are present, and each answers the same three questions in the same order so they can be read across:

| | Osmosis berbalik / Reverse osmosis | Kitar semula air / Water recycling | Air dari kabus / Water from fog |
|---|---|---|---|
| **What** | Drinking water from seawater by removing dissolved salt | Treating sewage water so it is safe to reuse | Collecting water droplets from fog |
| **How** | Pushed under pressure through a fine membrane that holds salt back | Multi-stage cleaning until drinkable or industrial-grade; Singapore's NEWater | Nets catch fine droplets, which join and drip into a container |
| **When** | Coastal countries short of fresh water | Cities with limited natural sources but plenty of sewage | Highland or coastal areas that are often foggy |

Engineering detail was deliberately held at Form 2 level — membrane pressure, net mesh and treatment chemistry are named but not quantified. This also lands the previously orphaned quiz item **q28 (NEWater)**.

### Both compulsory experiments — now staged

Sections 4 and 8 each carry a `MiniExperiment` block. Every part has Aim, Hypothesis, Manipulated / Responding / Controlled variables, Materials, Apparatus, Method, Observation and Conclusion. Apparatus is the source's own (cobalt chloride paper, anhydrous calcium chloride, filament bulb, retort stands, fan; beakers, glass rod, thermometer, Bunsen burner) — no modern substitutions were invented.

**Evaporation — 4 parts.** Hypotheses follow the source exactly, including the inverse one: *"Semakin tinggi kelembapan udara, semakin **rendah** kadar penyejatan air."* The manipulated variable for the temperature part is **suhu persekitaran** (surrounding temperature), as the source has it — not solvent temperature.

**Rate of dissolving — 3 parts.** The responding variable is **Kadar keterlarutan** in all three, matching the source. A regression test asserts this exactly (`/^Kadar keterlarutan$/i`), so the field cannot silently drift to plain "keterlarutan".

Neither block is a worksheet page: each renders one factor at a time behind a tab row, with the examinable variable triad pinned at the top in fixed colours.

### Solubility as a quantity, and the distinction

Section 5 now defines it in the source's own words:

> **BM:** Keterlarutan suatu bahan ialah kuantiti maksimum zat terlarut yang dapat larut di dalam 100 ml pelarut pada suhu yang tertentu.
> **DLP:** The solubility of a substance is the maximum amount of solute that can dissolve in 100 ml of solvent at a specified temperature.

A `ConceptContrast` block then sets the two terms side by side, with the distinguishing question stated **above** each definition rather than below it:

| Keterlarutan / Solubility | Kadar keterlarutan / Rate |
|---|---|
| **Berapa BANYAK boleh larut? / HOW MUCH can dissolve?** | **Berapa CEPAT ia larut? / HOW FAST does it dissolve?** |
| Maximum quantity per 100 ml at a stated temperature | How quickly it dissolves — the time taken, not the final amount |
| Once reached, the solution is saturated | Affected by temperature, stirring rate and solute size |

Key point under both columns states plainly that stirring and particle size **do not** change the maximum.

**The q23 gap is closed** in section 6, with cautious source-faithful wording — the textbook's own *"pada suhu yang tertentu"* is used as the hook:

> Perhatikan bahawa keterlarutan sentiasa dinyatakan pada suhu yang tertentu… **Bagi kebanyakan zat terlarut pepejal** seperti garam dan gula, lebih banyak dapat larut pada suhu yang lebih tinggi… ia tidak lagi tepu pada suhu yang baharu itu.

"Bagi kebanyakan zat terlarut pepejal" / "For most solid solutes" is deliberate: the source does not support a claim that all solutes behave identically, so none is made. **q23 is untouched.**

---

## 3. Coverage — all 11 SPs

Judged against the live rendered surface only. Nothing is credited to the dead notes files.

| SP | Before | After | Where it now lives |
|---|---|---|---|
| 5.1.1 | COVERED | **COVERED** | Sections 1–3; capillary + electrolysis diagrams added |
| 5.1.2 | PARTIAL | **COVERED** | Section 4 — 4-part experiment with full variable sets |
| 5.2.1 | PARTIAL | **COVERED** | Section 5 — definition + ConceptContrast |
| 5.2.2 | PARTIAL | **COVERED** | Section 8 — 3-part experiment, responding variable locked |
| 5.2.3 | COVERED | **COVERED** | Section 7 — MixtureComparison, both source features kept |
| 5.2.4 | COVERED | **COVERED** | Section 9 |
| 5.2.5 | PARTIAL | **COVERED** | Section 9 — all five solvents, ether added |
| 5.3.1 | PARTIAL | **COVERED** | Section 10 — 4-method matrix + penulenan explained |
| 5.3.2 | **MISSING** | **COVERED** | Section 12 — MethodCards |
| 5.3.3 | PARTIAL | **COVERED** | Section 11 — source stage names, click-to-function |
| 5.3.4 | PARTIAL | **COVERED** | Section 12 — safe water, Minamata, water audit |

| Status | Before | After |
|---|---|---|
| COVERED | 3 / 11 | **11 / 11** |
| PARTIAL | 7 / 11 | 0 |
| MISSING | 1 / 11 | 0 |
| INCORRECT | 0 / 11 | 0 |
| NOT_RENDERED | 0 / 11 | 0 |
| CONFUSING | 0 / 11 | 0 |

### Penulenan — how it was resolved

The audit flagged it as missing; direct source checking changed the answer. **"Penulenan" appears zero times in the textbook's Chapter 5**, while DSKP 5.3.1 lists it among five methods and the textbook implements only four (Rajah 5.22, and the prose at printed p. 113). Rather than invent a fifth procedure, it is taught as what the source actually supports — the **outcome**:

> Penulenan bermaksud menghasilkan air tulen… Ia adalah matlamat akhir, bukan satu langkah yang berasingan. …daripada empat kaedah itu, hanya penyulingan mencapai penulenan.

This is backed by the textbook's own Aktiviti 5.7 question 1 — *"Kaedah manakah yang menghasilkan air tulen?"* — whose answer is distillation. The comparison matrix's fourth column ("Menghasilkan air tulen?" / "Produces pure water?") makes the point structurally: distillation is the only all-yes row, and a test asserts that.

### Water purification comparison

`ComparisonMatrix`, four methods × four criteria, marks backed by visually-hidden words for screen readers:

| | Suspended | Dissolved | Microbes | Pure water |
|---|---|---|---|---|
| Pendidihan / Boiling | ✗ | ✗ | ✓ | ✗ |
| Penurasan / Filtration | ✓ | ✗ | ✗ | ✗ |
| Pengklorinan / Chlorination | ✗ | ✗ | ✓ | ✗ |
| Penyulingan / Distillation | ✓ | ✓ | ✓ | ✓ |

---

## 4. Visuals and interactions

Chapter 5 had **zero** instructional visuals. It now renders **19 SVG elements** across the chapter in both languages.

| Visual | Section | What it teaches |
|---|---|---|
| `CapillaryDiagram` | 2 | Xylem tube; cohesion arrows (water↔water), adhesion arrows (water→wall), rise arrows. Selecting a force dims the other two so the pair never has to be separated by reading labels alone. |
| `ElectrolysisDiagram` | 3 | Battery, electrodes, two gas columns. **Hydrogen column is exactly twice the oxygen column** — measured at runtime as 60 vs 30 units — so the picture proves the caption instead of merely repeating it. |
| `MixtureComparison` | 7 | Three beakers with torch beams. Beam reaches the far wall in a solution (96), stops short in a suspension (48), intermediate for a colloid (68). Particles drawn settling only in the suspension. |
| `ComparisonMatrix` | 10 | Purification capability grid. |
| `WaterTreatmentFlow` | 11 | 8 stages in a single wrapping reading order with arrows drawn between chips, so a wrapped row never leaves a dangling arrow. |
| `ConceptContrast` | 5 | Solubility vs rate, side by side. |
| `MethodCards` | 12 | Three supply options across three fixed facets. |
| `MiniExperiment` | 4, 8 | Compulsory experiments. |

**Label behaviour.** Every label is a real `<button>` with `aria-pressed`. Selecting one writes into a persistent `aria-live="polite"` panel below the diagram. **No dead labels** — runtime sweep of all 12 sections found 36 interactive controls in each language and **0 inert** in DLP; the 2 flagged in BM were each MiniExperiment's already-selected first tab, which correctly stays pressed.

**Compact default.** Every SVG is capped (`max-w-[420px]` to `max-w-[440px]`) with `h-auto w-full`, and wide content scrolls inside its own `overflow-x-auto` container. No diagram dominates the viewport; none exceeded its container at runtime.

**Colloid — a deliberate non-claim.** The type's light value for a colloid is `"between"`, not `"scattered"`. The source places a colloid between a solution and a suspension but states **no** light-path behaviour for it, so the beam is drawn as intermediate and no Tyndall claim is made. A test asserts `lightPasses === "between"`.

**Mobile (375 px).** Page horizontal overflow **0 px**. The section stepper rail is `overflow-x: auto` (1030 px of chips in a 375 px viewport) and scrolls rather than clipping. No tap target under 32 px.

---

## 5. Quiz, flashcard and mind-map changes

### Quizzes — 30 → 36 per language, nothing weakened

Six added per language, weighted to the previously untested experiment skills without over-weighting bookkeeping:

- **q31** — identify the responding variable (evaporation)
- **q32** — predict the effect of surface area
- **q33** — identify controlled variables (rate of dissolving)
- **q34 (Hard)** — a peer claims stirring "increased the solubility"; the correct answer rejects it and names the rate. This is the conflation tested head-on.
- **q35** — choose the right alternative supply for a foggy highland country
- **q36** — Minamata

**q22, q23 and q28 are untouched**, and a regression test asserts each is still present, that q23 is still `Hard`, and that its keyed option still reads *"keterlarutan secara umum meningkat"*. Every answer index in both files was verified in range; all ids unique.

### Flashcards — 60 → 78 per language

18 added covering SP 5.3.2 (3), ether (2), Minamata (2), water audit (1), experiment variables and hypotheses (5), solubility-vs-rate and the temperature effect (2), penulenan (1), and treatment stages and chemicals (2). **No existing card was rewritten** — f18, which already carried the solubility definition correctly in both languages, is preserved verbatim and guarded by a test.

### Mind maps

- Solubility branch split into **"Keterlarutan: BERAPA BANYAK"** / **"Kadar keterlarutan: BERAPA CEPAT"** (and the DLP equivalents), with the responding variable named.
- Treatment stage names corrected: `Penurasan → Oksidasi → Kogulasi / Pemendapan` became `Penapisan → Pengoksidaan → Penggumpalan / Pengenapan`; alum and slaked lime added.
- New branch: **Bekalan Air Alternatif** (reverse osmosis, NEWater, fog).
- Sustainability branch gained safe drinking water, Minamata and water audit.
- Penulenan added as the umbrella outcome.

The mind maps stay conceptual — no procedure or variable list was moved into them.

---

## 6. BM / DLP parity

Enforced by test, not by inspection:

- **Section count and `number` sequence** — asserted equal.
- **Block-type shape per section** — asserted equal across 12 block keys.
- **Quiz and flashcard lengths** — asserted equal (36 / 78).
- **Same experiments** — both languages assert the same part ids (`humidity/temperature/surface-area/air-movement`, `temp/stir/size`).
- **Same visuals** — 19 SVGs each; runtime control counts identical at 36.
- Runtime walk confirmed 12 sections in each language with matching titles.

Parity is semantic, not literal. The DLP stream is independently phrased (for example the treatment stage names are proper English terms, not transliterations) while teaching the same content at the same depth.

---

## 7. Held issue

### M-03 — DLP "rate of solubility" — **HOLD, SOURCE REQUIRED**

Not changed. The official DLP textbook is not in the source pack, so switching to "rate of dissolving" would be speculative and could pull the notes out of line with the paper students actually sit.

It is now **isolated behind a single constant** at the top of `interactive-dlp.ts`:

```ts
const RATE_TERM = "rate of solubility";
const RATE_TERM_TITLE = "Rate of Solubility";
```

Every learner-facing use — section title, intro, experiment aim, hypotheses, responding variables, conclusions, checks, reflection items and two mini-quiz items — interpolates these. Once the DLP source is available, one edit changes the whole chapter.

The concept is taught correctly either way; this is about the phrase, not the claim. The regression test that bans "stirring increases solubility" is written with a negative lookahead so it does **not** fire on the held term.

---

## 8. Regression tests

`src/content/form2/science/chapter-5/chapter-5-remediation.test.tsx` — **68 tests**. All 15 requested guards are covered:

| # | Guard | Covered by |
|---|---|---|
| 1 | SP 5.3.2 missing | methodCards present with all three ids, each facet non-empty |
| 2 | Evaporation experiment missing hypothesis/variables | 4 part ids asserted; hypothesis + 3 variables + method + conclusion non-empty |
| 3 | Rate experiment missing hypothesis/variables | 3 part ids asserted; same field checks |
| 4 | Solubility definition missing | "kuantiti maksimum" / "maximum amount" + "100 ml" |
| 5 | Solubility vs rate conflation | ConceptContrast asserts both HOW MUCH and HOW FAST framings |
| 6 | "stirring increases solubility" appearing | 4 negative patterns, BM and English |
| 7 | Cohesion/adhesion reversal | notes asserted water-to-water vs water-to-surface; capillary asserted as the combined effect |
| 8 | Ether missing | asserted in the solvent tab list, all five names |
| 9 | Minamata missing | term + mercury asserted |
| 10 | Water audit missing | asserted both languages |
| 11 | Penulenan missing | asserted both languages |
| 12 | Source-aligned treatment names missing | 5 BM source terms asserted present; "Kogulasi" and "kapur terhidrat" asserted absent; full 8-stage order asserted |
| 13 | "kekeasidan" typo | asserted absent, "keasidan" asserted present |
| 14 | BM/DLP section drift | count, number sequence and block shape asserted equal |
| 15 | Learner-facing source leakage | leakage suite extended to Chapter 5 |

Plus: electrolysis correctness (anode/oxygen/positive, cathode/hydrogen/negative, 2:1), impurities (lowers melting, raises boiling), colloid features and the `"between"` non-claim, quiz answer-index range and id uniqueness, protection of q22/q23/q28, flashcard f18 preservation, and mind-map anchors.

**One leakage pattern was deliberately narrowed.** `/\baudit\b/i` was written to catch audit metadata, but *audit air* / *water audit* is the syllabus's own term for the household water-use project this remediation was asked to add. The pattern is now `/(?<!water )\baudit\b(?! air\b)/i` — the domain term passes, while "audit report", "deep audit" and "audited against" still trip. The change is commented in place.

---

## 9. Build and test results

| Check | Result |
|---|---|
| `tsc --noEmit` | **PASS** |
| `npm run build` | **PASS** — full Cloudflare Pages worker build |
| Chapter 5 remediation tests | **PASS** — 68/68 |
| Science F2 suites | **PASS** — 147/147 (4 files) |
| Leakage suite (Ch1–5) | **PASS** — 40/40 |
| Full `vitest run` | 1529 passed, **7 failed** |
| **Chapter 5-attributable failures** | **0** |

### Pre-existing failures — reported, not hidden

The same 7 that failed before this work, unrelated to Chapter 5 and previously proven pre-existing on a clean tree:

1. `src/lib/billing-core.test.ts` — ToyyibPay sandbox plans
2. `src/lib/invoice-pdf.server.test.ts` — invoice PDF generation
3. `src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts`
4. `src/content/bm/asas-penulisan-form1-mindmap.test.ts`
5. `src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts`
6. `src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts`
7. `src/content/form2/math/chapter-1/quizzes-dlp.test.ts`

Total test count rose 1453 → 1529 (+76). `npm run lint` still fails repo-wide on CRLF-vs-LF and is not a Chapter 5 signal.

### Runtime verification

Real components mounted from the Vite dev ESM graph and walked end to end in both languages:

```
BM  (lang="bm") : 12 sections, 36 interactive controls, 19 SVG, 0 page overflow
DLP (lang="en") : 12 sections, 36 interactive controls, 19 SVG, 0 inert controls
Mobile 375px    : page horizontal overflow 0px; stepper rail scrolls (1030px / 375px)
Electrolysis    : hydrogen column 60 units, oxygen 30 — measured ratio exactly 2:1
Mixture beams   : solution 96 > colloid 68 > suspension 48
```

**One probe correction worth recording:** an initial DLP walk reported a render crash. The control case showed Chapter 4's already-shipped DLP data failing identically — the probe was passing `lang="dlp"`, while the route passes `lang={scienceLang === "dlp" ? "en" : "bm"}`. Re-run with `lang="en"`, DLP renders cleanly. No defect existed; the probe was wrong.

---

## Verdict

```
CHAPTER 5 REMEDIATION: COMPLETE

CRITICAL REMAINING: 0
HIGH REMAINING:     0
MEDIUM REMAINING:   1  (M-03 DLP "rate of solubility" — HELD, SOURCE REQUIRED,
                        isolated behind RATE_TERM so one edit resolves it)
LOW REMAINING:      0

SP COVERAGE:
  COVERED:      11 / 11
  PARTIAL:       0
  MISSING:       0
  INCORRECT:     0
  NOT_RENDERED:  0
  CONFUSING:     0

SOLUBILITY VS RATE REGRESSION: PASS
MANDATORY EXPERIMENTS:         PASS
BM/DLP PARITY:                 PASS
LEARNER-FACING LEAKAGE:        PASS
TYPECHECK:                     PASS
BUILD:                         PASS
TESTS:                         PASS  (7 pre-existing failures, 0 from Chapter 5)
```

### Regression protection confirmed

All ten protected areas re-verified after the rewrite:

1. **Solubility vs rate of dissolving** — all three factors still framed as rate; 4 negative patterns guard the banned claim.
2. **Cohesion vs adhesion** — not reversed; asserted in both languages.
3. **Electrolysis** — oxygen at anode, hydrogen at cathode, H:O = 2:1, now also true of the drawing's geometry.
4. **Impurities** — salt lowers melting point, raises boiling point.
5. **Colloid features** — both source features kept; no invented light claim.
6. **Dilute / concentrated / saturated** — preserved verbatim, extended with the temperature effect.
7. **Water-treatment order and functions** — order unchanged, functions unchanged, only BM names corrected to source.
8. **Quiz answer keys** — all in range; q22/q23/q28 untouched and test-guarded.
9. **Learner-facing leakage** — still zero, now enforced for Chapter 5.
10. **Existing interactions** — still functional; 0 inert controls.

---

## DO NOT FREEZE

**Chapter 5 is NOT frozen.** This changelog records what was implemented; it is not an independent verification of it. Chapter 5 must undergo a **fresh independent release-gate audit** — one that does not trust this document — before any freeze decision.

Specific items that audit should probe hardest:

1. The **temperature-affects-solubility** wording in section 6, which is the one place this remediation extended beyond a direct source sentence (justified from *"pada suhu yang tertentu"*, deliberately hedged to "kebanyakan zat terlarut pepejal").
2. **Penulenan as an outcome rather than a procedure** — a judgement call made because DSKP and the textbook disagree.
3. **M-03**, which remains open and needs the DLP textbook.
4. The **narrowed leakage pattern**, to confirm it still catches genuine metadata.
5. Whether **section 12** carries too much (alternative supplies + safe water + Minamata + water audit + pollutant matcher) and should split into 13 sections.
