# REMEDIATION CHANGELOG — Sains / Science Tingkatan 2, Bab 6: Asid dan Alkali (BM + DLP)

**Spec:** `SCIENCE_F2_CH06_DEEP_AUDIT_REPORT.md`, with every claim re-verified against `DSKP.pdf`, `Textbook.pdf` and `Errata.pdf` before implementation.
**Date:** 2026-08-27
**Scope:** `science-f2-c6-bm` and `science-f2-c6-dlp`.

---

## 1. Architecture

### Sections: 2 → 9 (both languages)

| # | BM | DLP | SPs served |
|---|---|---|---|
| 1 | Asid dan Alkali | Acids and Alkalis | 6.1.1 |
| 2 | Peranan Air | Why Water Matters | 6.1.1 |
| 3 | Sifat Asid dan Alkali | Properties of Acids and Alkalis | 6.1.1 |
| 4 | Penunjuk dan Cara Mengukur pH | Indicators and Measuring pH | 6.1.2 |
| 5 | Skala pH | The pH Scale | 6.1.3 |
| 6 | Kekuatan Asid dan Alkali | Strength of Acids and Alkalis | 6.1.3 |
| 7 | Kegunaan Asid dan Alkali | Uses of Acids and Alkalis | 6.1.4 |
| 8 | Peneutralan dan Pentitratan | Neutralisation and Titration | 6.2.1 |
| 9 | Peneutralan dalam Kehidupan Harian | Neutralisation in Daily Life | 6.2.2 |

Section titles and order confirmed by mounting the real components at runtime in both languages.

**Rendered teaching content: 4,054 → 16,820 characters** (BM, measured across the walk).

### Files changed

**Live learner-facing content**
- `chapter-6/interactive-bm.ts` — 8.1 KB → 28.4 KB
- `chapter-6/interactive-dlp.ts` — 7.7 KB → 27.1 KB
- `quizzes-bm.ts` / `quizzes-dlp.ts` — 30 → 34 items each
- `flashcards-bm.ts` / `flashcards-dlp.ts` — 60 / 60 kept; leakage and BM terminology fixed only
- `mindmap-bm.ts` / `mindmap-dlp.ts` — 96 → 103 nodes each

**Shared infrastructure**
- `interactive-types.ts` — 4 new block types
- `ScienceF2InteractiveNotesBlock.tsx` — 4 new renderers wired in

**New components**
- `IndicatorTable.tsx` — colour-swatch reference table (reusable by any chemistry chapter)
- `StrengthComparison.tsx` — strong/weak pairs with a mandatory equal-concentration banner
- `DryVsAqueous.tsx` — Chapter 6-specific four-panel schematic
- `TitrationSchematic.tsx` — Chapter 6-specific apparatus diagram

**Reused from Chapter 5 without modification:** `ConceptContrast` (acid vs alkali), `MethodCards` (three pH-measuring tools). The existing `phSlider` was kept and relabelled.

**Tests**
- `chapter-6/chapter-6-remediation.test.tsx` — new, **81 tests**
- `learner-facing-leakage.test.ts` — extended to Chapter 6 (40 → 48 tests)

### Dead notes: unchanged and still shadowed

`notes-bm.ts` (12,655 B) and `notes-dlp.ts` (12,380 B) are **untouched (git shows 0 modifications), not deleted, and not revived**. The `sciF2InteractiveData` branch at `routes/notes.tsx:2044` still wins over the `notes` fallback, so the interactive pipeline remains the single learner-facing notes surface. They still contain the four `Aktiviti 6.x` references that seeded the leakage — correctly left alone, since they are not learner-facing.

---

## 2. P0 fixes

### pH / acid-alkali strength — the CRITICAL finding

**Two changes, deliberately separated.**

**(a) The pH slider now uses position language only.** No everyday substance carries an absolute strong/weak identity label any more:

| pH | Substance | Before | After (BM / DLP) |
|---|---|---|---|
| 2 | Cuka / Vinegar | **"Asid kuat" / "Strong acid"** | "Berasid" / "Acidic" |
| 11 | Larutan ammonia | **"Alkali kuat" / "Strong alkali"** | "Beralkali" / "Alkaline" |
| 0 | Asid bateri | "Asid amat kuat" | "Sangat berasid" / "Extremely acidic" |
| 14 | Pencuci saluran paip | "Alkali amat kuat" | "Sangat beralkali" / "Extremely alkaline" |

All 15 points (pH 0–14) were relabelled to the *sangat berasid → berasid → sedikit berasid → neutral → sedikit beralkali → beralkali → sangat beralkali* ladder.

**(b) Strength is now taught separately, using the textbook's own comparison.** New section 6 carries a `StrengthComparison` block in which the equal-concentration condition is a required field rendered **first**, in its own banner:

> **SYARAT PERBANDINGAN** — Semua larutan di bawah dibandingkan pada kepekatan yang sama. Tanpa syarat ini, perbezaan nilai pH mungkin datang daripada kepekatan, bukan daripada kekuatan bahan itu sendiri.

| | Kuat / Strong | Lemah / Weak |
|---|---|---|
| **Asid** | Asid hidroklorik (pH ~1) | **Asid etanoik (pH ~3)** |
| **Alkali** | Larutan natrium hidroksida (pH ~13) | **Larutan ammonia (pH ~11)** |

Key point rendered under the pairs: *"Kekuatan ialah sifat bahan itu sendiri, bukan berapa banyak air yang ditambah. Cuka mengandungi asid etanoik — satu asid lemah — walaupun rasanya masam dan nilai pHnya rendah."*

This matches textbook Aktiviti 6.3 exactly, including its own note *"Pastikan semua larutan yang digunakan mempunyai kepekatan yang sama"*, and lands the answers its Soalan 2 expects.

**Deliberate teaching device kept:** the chapter now *poses* the misconception in order to refute it — a check-yourself item (*"Cuka berasa sangat masam. Adakah ini bermakna cuka mengandungi asid kuat?"* → "Tidak…") and a true/false mini-quiz item keyed **false**. The regression test distinguishes asserted prose from refuted question stems so these do not trip it (see §8).

### Learner-facing activity numbers — all 30 removed

| Surface | Before | After |
|---|---|---|
| quizzes-bm / -dlp | 6 + 6 | **0** |
| flashcards-bm / -dlp | 7 + 7 | **0** |
| mindmap-bm / -dlp | 2 + 2 | **0** |
| interactive-bm / -dlp | 0 | **0** |

Questions were **de-referenced, not weakened** — each was rewritten to be self-contained:

| Before | After |
|---|---|
| *"Bagaimanakah seseorang mengetahui bahawa peneutralan telah selesai dalam **Aktiviti 6.5**?"* | *"Dalam pentitratan asid-alkali menggunakan fenolftalein, bagaimanakah takat akhir dikenal pasti?"* |
| *"Dalam satu eksperimen pentitratan menggunakan kaedah **Aktiviti 6.5**…"* | *"Dalam satu pentitratan asid-alkali menggunakan fenolftalein…"* |
| *"…dalam **Aktiviti 6.1**…"* | *"…dalam ujian sifat asid dan alkali…"* |
| Mind-map node *"**Aktiviti 6.5**: Pentitratan"* | *"Pentitratan Asid-Alkali"* |

Every answer key, option set and assessed concept is unchanged.

### Fabric softener added

New accordion in section 9, both languages:

> **🧺 Pelembut fabrik** — Serbuk pencuci menjadikan fabrik beralkali selepas dibasuh. Pelembut fabrik bersifat asid, jadi ia menurunkan nilai pH fabrik dengan meneutralkan baki beralkali itu — menjadikan fabrik lembut.

Matches textbook printed p. 135. This closes the notes↔quiz gap: **q22 is unchanged** and the notes now teach what it assesses. SP 6.2.2's full DSKP list (ubat gigi, pelembut fabrik dan perapi rambut, mengawal pH tanah, meneutralkan bahan buangan industri) is now complete, with the textbook's face-care example retained as a sixth.

### Jellyfish check rewritten

**Before** (evasive — never gave the answer):
> *"Jika kimia sengatan itu bukan asid mudah, penambahan alkali tidak semestinya membantu… Rawatan yang betul bergantung kepada mengetahui kimia sebenar sengatan itu."*

**After** (the KSSM model first, nuance after):
> *"Sabun dan ubat gigi bersifat alkali. Dalam model yang digunakan di sini, sengatan ubur-ubur juga dianggap beralkali — jadi menambah lagi bahan beralkali tidak meneutralkannya dan menyebabkan kesakitan bertambah. Bahan berasid seperti cuka digunakan untuk meneutralkan keadaan itu. (Nota: rawatan sengatan sebenar bergantung pada spesies — ikut panduan pertolongan cemas semasa.)"*

The question now also asks part (b) of the source question (*"apakah yang sepatutnya dilakukan?"*). **No wasp/tebuan example was introduced** — a test asserts its absence permanently.

---

## 3. SP coverage — all 6

Judged on rendered output only. Nothing is credited to the dead notes.

| SP | Requirement | Before | After | Where it now lives |
|---|---|---|---|---|
| **6.1.1** | Definisi operasi asid & alkali | COVERED | **COVERED** | Sections 1–3; water requirement now has its own four-panel schematic |
| **6.1.2** | Bahan berasid/beralkali, 5 tools | PARTIAL | **COVERED** | Section 4 — indicator table (5 rows) + **meter pH** added via MethodCards |
| **6.1.3** | Kekuatan from pH | **INCORRECT** | **COVERED** | Sections 5 + 6 — slider relabelled, strength taught with equal-concentration control |
| **6.1.4** | Kegunaan incl. pertanian & industri | PARTIAL | **COVERED** | Section 7 — home / agriculture / industry cards |
| **6.2.1** | Proses peneutralan | COVERED | **COVERED** | Section 8 — equation, 3 salt pairs, titration schematic |
| **6.2.2** | Aplikasi peneutralan | PARTIAL | **COVERED** | Section 9 — 6 applications incl. fabric softener |

| Status | Before | After |
|---|---|---|
| COVERED | 2 / 6 | **6 / 6** |
| PARTIAL | 3 / 6 | 0 |
| **INCORRECT** | **1 / 6** | **0** |
| MISSING | 0 | 0 |
| NOT_RENDERED | 0 | 0 |
| CONFUSING | 0 | 0 |

### SP 6.1.4 — sources for the added examples

Every agriculture/industry example was verified in the textbook before use: ammonia solution → fertiliser (Gambar foto 6.2); sulphuric acid → car battery and sodium hydroxide → detergent (Gambar foto 6.3); slaked lime → acidic soil and alkali → industrial waste (Gambar foto 6.5, p. 135); acid rain in industrial areas (Latihan Formatif 6.1 Q3). Nothing was imported from outside the chapter.

---

## 4. Visuals and interactions

Chapter 6 had **one** visual device (the pH slider) and zero diagrams. It now has five.

| Visual | Section | What it does |
|---|---|---|
| `DryVsAqueous` | 2 | Four panels — glacial ethanoic acid / + water / solid NaOH / + water. Each draws the litmus paper in the colour it actually ends up, so "unchanged" is visibly identical to the starting colour. Key message rendered under the grid. |
| `ConceptContrast` (reused) | 3 | Acid vs alkali on five parallel properties, with the safety note as the key point. |
| `IndicatorTable` | 4 | 5 × 4 colour table. **Each cell is tinted with the colour it names AND writes the colour name out**, so it never depends on colour alone. |
| `MethodCards` (reused) | 4 | Litmus / universal indicator + pH paper / pH meter across three fixed facets. |
| `phSlider` (kept) | 5 | Mechanics unchanged — only the labels were corrected. |
| `StrengthComparison` | 6 | Strong/weak pairs with the equal-concentration banner rendered first. |
| `TitrationSchematic` | 8 | Burette, acid, conical flask, indicator, end point. Selecting "takat akhir" **flips the flask from pink to colourless**, so the colour change is watched rather than only read. |

**Label behaviour:** every label is a real `<button>` with `aria-pressed`, writing into a persistent `aria-live="polite"` panel. Runtime sweep of all 9 sections found **18 interactive controls per language and 0 inert**.

**Enlarge behaviour:** these are native SVG/HTML, not raster images, so they carry no lightbox — consistent with Chapters 1–5, where no SVG diagram has one. SVG text is real text and scales with the viewport. Chapter 6 has no raster `images:` blocks.

**No decorative imagery was added.** The chapter's content is tabular and schematic, and it is rendered as tables and small SVGs, per the spec.

**Mobile (375 px):** page horizontal overflow **0 px**; no tap target under 32 px; max SVG width 303 px. The indicator table sits in an `overflow-x: auto` container — 440 px of content in a 303 px box — so it **scrolls rather than clips**, with all five rows and their colour words readable. Six SVGs measured as extending past the viewport proved to be 16 px completion checkmarks inside the scrollable stepper rail, reachable by scrolling.

---

## 5. Quiz / flashcard / mind-map changes

### Quizzes — 30 → 34 per language

Four added per language, targeting the concept the CRITICAL finding exposed:

- **q31** — HCl pH 1 vs ethanoic acid pH 3 at equal concentration: which conclusion?
- **q32 (Hard)** — why the equal-concentration condition matters at all
- **q33** — vinegar tastes sour: does it contain a strong acid? (keyed *weak acid*)
- **q34** — NaOH pH 13 vs ammonia pH 11: which is the weak alkali?

Acid + metal → hydrogen was already assessed (two existing items) and was left alone.

**q20, q22 and q27 are unchanged in substance** — only de-referenced. A regression test asserts all three still exist, that q20 still keys on the pink→colourless end point, and that q22 still tests fabric softener. Integrity re-verified: **0 out-of-range answer indices, 0 duplicate option sets**, difficulty Easy 10 / Medium 13 / Hard 11 in both languages.

### Flashcards — 60 / 60 kept

Per the spec, no cards were added or removed. Fixed only: activity-number leakage (7 per language), BM *petunjuk* → *penunjuk*, BM *kapur terhidrat* → *kapur mati*. All indicator, pH, equation and terminology content preserved.

### Mind maps — 96 → 103 nodes each

- Activity-number nodes relabelled conceptually: *"Aktiviti 6.1: Menguji Sifat Asid & Alkali"* → *"Menguji Sifat Asid dan Alkali"*; *"Aktiviti 6.5: Pentitratan"* → *"Pentitratan Asid-Alkali"*.
- New **Kekuatan Asid dan Alkali** branch (6 nodes) carrying the equal-concentration condition and the four canonical substances.
- **Meter pH** added to the indicator branch.
- BM terminology corrected throughout.

Existing hierarchy was otherwise preserved, and the mind map was not turned into a procedural worksheet.

> **Note on a mistake made and corrected during this work.** An early pass at the mind maps renumbered a new branch into `c1-9` and then `c1-11`, both of which were already in use, and in doing so renamed a legitimate pre-existing node. Rather than patch further, both mind-map files were reverted to HEAD and all changes re-applied in a single clean pass using collision-proof `c1-strength*` / `c1-tool-meter` ids. Final state verified: **103 nodes, 103 ids, 103 unique, zero duplicates** in both languages, with a regression test now asserting node-id uniqueness.

---

## 6. Terminology cleanup

| Term | Before (BM) | After (BM) | Source | DLP |
|---|---|---|---|---|
| universal indicator | **petunjuk sejagat** (16 uses of *petunjuk* across surfaces) | **penunjuk semesta** | Textbook: *penunjuk semesta* | "universal indicator" — already correct, unchanged |
| slaked lime | **kapur terhidrat** (5 uses) | **kapur mati** | Textbook p. 135: *kapur mati* | "slaked lime" — already correct, unchanged |

Verified after the change: `petunjuk` = **0** and `kapur terhidrat` = **0** across all four BM live surfaces, with tests guarding each surface individually.

DSKP's own variant (*penunjuk universal*) and its *"kertas litmius"* typo are **not** surfaced to learners; the textbook spelling is used throughout.

---

## 7. BM / DLP parity

Enforced by test, not inspection:

- **Section count and `number` sequence** — asserted equal (9 / 9).
- **Block-type shape per section** — asserted equal across 10 block keys.
- **Quiz and flashcard lengths** — asserted equal (34 / 60).
- **Mind-map node counts** — asserted equal by recursive count (103 / 103).
- **Indicator colours** — asserted against the source table in both languages, with the BM colour words mapped explicitly.
- Runtime walk confirmed 9 sections and **18 controls in each language, 0 inert in both**.

Parity is semantic. The DLP stream was already correct on terminology and needed no terminology change.

---

## 8. Regression tests

`chapter-6/chapter-6-remediation.test.tsx` — **81 tests**. All 16 requested guards are covered:

| # | Guard | Covered by |
|---|---|---|
| 1 | Vinegar labelled strong acid | Negative assertion over *asserted prose only* |
| 2 | Ammonia labelled strong alkali | Negative assertion over asserted prose; plus a direct slider-label check |
| 3 | Ethanoic acid weak example missing | `entries.ethanoic.strength === "weak"` |
| 4 | Ammonia weak example missing | `entries.ammonia.strength === "weak"` |
| 5 | Equal-concentration comparison missing | `condition` matched in both languages |
| 6 | Learner-facing `Aktiviti 6.x` leakage | All 8 live surfaces asserted clean |
| 7 | Fabric softener missing | Asserted in prose, both languages |
| 8 | Jellyfish answer becoming evasive again | Must name alkali AND vinegar; must not open with the old hedge |
| 9 | pH meter missing | MethodCards ids asserted to be exactly litmus / universal / ph-meter |
| 10 | Agriculture / industry missing | Asserted in prose, both languages |
| 11 | BM "petunjuk sejagat" | Per-surface negative assertion (4 surfaces) |
| 12 | BM "kapur terhidrat" | Per-surface negative assertion (4 surfaces) |
| 13 | BM/DLP section-count drift | Count, number sequence and block shape asserted equal |
| 14 | Wrong indicator colour | All 5 indicators × 3 states asserted against the source table |
| 15 | Wrong neutralisation salt | All three pairs asserted, including sulphuric + **potassium** hydroxide |
| 16 | False mandatory-experiment wording | `miniExperiment` asserted absent; variable vocabulary asserted absent |

Plus: SP-code leakage, water requirement, acid-reacts-with-metals / alkali-does-not, the taste safety note, no wasp example, quiz answer-index range and id uniqueness, protection of q20/q22/q27, and mind-map node-id uniqueness.

**The subtlety worth recording:** guards 1 and 2 cannot be plain substring checks, because the remediated chapter deliberately asks *"does vinegar contain a strong acid?"* in order to answer no. The test therefore builds an `assertedProse()` view — intros, cards, accordions, tabs, flip cards, slider descriptions and strength-block prose — and excludes question stems and their answers. A naive check would have failed on the very content that fixes the defect.

`learner-facing-leakage.test.ts` extended to Chapter 6: 40 → **48 tests**, all 8 Chapter 6 surfaces registered. This suite alone would have caught the original 30 leaks.

---

## 9. Build and test results

| Check | Result |
|---|---|
| `tsc --noEmit` | **PASS** |
| `npm run build` | **PASS** — exit code 0, `✓ built in 10.40s`, full Cloudflare Pages worker build |
| Chapter 6 remediation tests | **PASS** — 81/81 |
| Science F2 suites | **PASS** — 236/236 (5 files) |
| Leakage suite (Ch1–6) | **PASS** — 48/48 |
| Full `vitest run` | 1653 passed, **8 failed** |
| **Chapter 6-attributable failures** | **0** |

### Pre-existing failures — reported, not hidden

The same 8 that failed before this work, all unrelated to Chapter 6:

1. `src/lib/billing-core.test.ts` — ToyyibPay sandbox plans
2. `src/lib/invoice-pdf.server.test.ts` — invoice PDF generation
3. `src/routes/-onboarding-ui.test.ts` — Explorer onboarding UI contract
4. `src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts`
5. `src/content/bm/asas-penulisan-form1-mindmap.test.ts`
6. `src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts`
7. `src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts`
8. `src/content/form2/math/chapter-1/quizzes-dlp.test.ts`

Total test count rose 1564 → 1653 (**+89**). `npm run lint` still fails repo-wide on CRLF-vs-LF; pre-existing and not a Chapter 6 signal.

### Runtime verification

Real components mounted from the Vite dev ESM graph and walked end to end:

```
BM  (lang="bm") : 9 sections, 18 interactive controls, 0 inert, 1 indicator table
DLP (lang="en") : 9 sections, 18 interactive controls, 0 inert, 1 indicator table
Rendered teaching content: 4,054 -> 16,820 chars (BM)
Mobile 375px    : page overflow 0px; indicator table scrolls (440px in 303px); no tap target < 32px
Strength block  : "SYARAT PERBANDINGAN" renders first; HCl KUAT pH~1 / etanoik LEMAH pH~3;
                  NaOH KUAT pH~13 / ammonia LEMAH pH~11
```

---

## Verdict

```
CHAPTER 6 REMEDIATION: COMPLETE

CRITICAL REMAINING: 0
HIGH REMAINING:     0
MEDIUM REMAINING:   0
LOW REMAINING:      1  (SVG diagrams carry no enlarge affordance — consistent with
                        Chapters 1-5, where no SVG diagram has one; no action proposed)

SP COVERAGE:
  COVERED:      6 / 6
  PARTIAL:      0
  MISSING:      0
  INCORRECT:    0
  NOT_RENDERED: 0
  CONFUSING:    0

pH / STRENGTH DISTINCTION: PASS
ACTIVITY-NUMBER LEAKAGE:   PASS  (30 -> 0 on live surfaces)
INDICATOR COLOURS:         PASS  (5 indicators x 3 states, both languages)
NEUTRALISATION:            PASS  (equation + 3 source salt pairs)
BM/DLP PARITY:             PASS
LEARNER-FACING LEAKAGE:    PASS
TYPECHECK:                 PASS
BUILD:                     PASS
TESTS:                     PASS  (8 pre-existing failures, 0 from Chapter 6)
```

### Regression protection confirmed

All 14 protected areas re-verified after the rewrite:

1. Acid vs alkali properties — preserved and now side by side.
2. Water requirement — preserved, now with a four-panel schematic.
3–6. Litmus, universal indicator, methyl orange, phenolphthalein colours — all asserted against Jadual 6.3; methyl orange still yellow in **both** neutral and alkali.
7. pH range 0–14 — slider asserted to have exactly 15 points.
8. `Asid + Alkali → Garam + Air` — preserved verbatim.
9. All three salt pairs — preserved, including sulphuric + **potassium** hydroxide.
10. Titration end point — preserved, now also animated in the schematic.
11. Quiz answer keys — 0 out-of-range, 0 duplicates, protected items intact.
12. BM/DLP structural parity — asserted on five dimensions.
13. No mandatory-experiment claim — `miniExperiment` and variable vocabulary asserted absent.
14. No NotebookLM wasp-sting example — asserted absent.

---

## DO NOT FREEZE

**Chapter 6 is NOT frozen.** This changelog records what was implemented; it is not an independent verification of it. Chapter 6 must undergo a **fresh independent release-gate audit** — one that does not trust this document — before any freeze decision.

Items that audit should probe hardest:

1. **The strength teaching in sections 5 and 6 together.** The slider now says "berasid" while section 6 says "asid lemah" for the same substance at the same pH. That separation is deliberate and is the fix, but it should be read as a learner would, in sequence, to confirm it clarifies rather than confuses.
2. **The deliberately-posed misconceptions** (the vinegar check and mini-quiz item keyed `false`). Confirm they read as questions to be refuted, not as claims.
3. **The jellyfish nuance note** — whether the parenthetical caveat after the KSSM answer is the right balance, or should be dropped entirely.
4. **The mind-map id repair** described in §5 — confirm no legitimate node was left renamed.
5. Whether **9 sections** is the right granularity, or sections 1–3 should merge.
