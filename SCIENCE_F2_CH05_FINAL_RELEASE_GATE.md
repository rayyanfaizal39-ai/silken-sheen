# FINAL RELEASE GATE — Sains / Science Tingkatan 2, Bab 5: Air dan Larutan (BM + DLP)

**Mode:** READ-ONLY post-remediation verification. No file was modified, created, or deleted. Working tree unchanged from the remediation state (23 entries, identical set; dead notes show 0 modifications).
**Date:** 2026-08-27
**Method:** The changelog was read but **not trusted**. Every claim was re-verified by mounting the real components from the Vite dev ESM graph and reading the actual rendered learner output — 62,191 characters across both languages — then checking that output against the PDFs.

---

## 1. VERDICT

# PASS — FREEZE CHAPTER

No CRITICAL or HIGH finding. All 11 SPs are genuinely taught and rendered. No incorrect science was found in either language. Both compulsory experiments are properly staged. The solubility/rate distinction is intact and now stronger than before remediation. Three LOW items and one MEDIUM UX item remain; none blocks release.

---

## 2. LIVE PRODUCTION PATH — TRACED, NOT ASSUMED

| Layer | Exact artefact |
|---|---|
| Registry | `src/content/registry.ts:3474` (`science-f2-c5-bm`), `:3488` (`science-f2-c5-dlp`) |
| Live notes data | `chapter-5/interactive-bm.ts`, `chapter-5/interactive-dlp.ts` (45.1 KB / 44.5 KB) |
| Route branch | `src/routes/notes.tsx:2033` → `ScienceF2Chapter5NotesBlock` |
| Component | `ScienceF2Chapter5NotesBlock.tsx` → re-export of `ScienceF2InteractiveNotesBlock.tsx` |
| Lang prop | `lang={scienceLang === "dlp" ? "en" : "bm"}` — note the English stream receives **`"en"`**, not `"dlp"` |

**Branch precedence verified.** `activeChapter?.sciF2InteractiveData` (notes.tsx:1999) is evaluated before the `activeChapter?.notes` fallback (notes.tsx:2141). The interactive branch always wins.

**Dead legacy notes:** `notes-bm.ts` (31,005 B) and `notes-dlp.ts` (30,460 B) are still registered (`grep -c 'notes: scienceF2C5Notes'` = 2) but **unreachable**. Git shows **0 modifications** to both — preserved, not deleted, **not rendered in parallel**. Nothing in this audit credits them as coverage.

**Nothing silently dropped.** Runtime walk found **12 sections in each language**, matching titles in order, and every authored block reachable.

---

## 3. SP COVERAGE MATRIX — all 11

Judged on rendered output. COVERED requires: scientifically correct **and** actually rendered **and** intelligible at Form 2 level.

| SP | Requirement | Live location | Status | Evidence |
|---|---|---|---|---|
| **5.1.1** | Menghuraikan mengenai air | Sections 1–3 | **COVERED** | Fixed values rendered; capillary diagram label→panel verified cohesion = water↔water, adhesion = water↔xylem wall; electrolysis anode/cathode correct |
| **5.1.2** | **Eksperimen** penyejatan | Section 4 | **COVERED** | 4 parts; humidity hypothesis rendered as *"Semakin tinggi kelembapan udara, semakin **rendah** kadar penyejatan"* — matches source inverse form; manipulated = *Kelembapan udara*, responding = *Kadar penyejatan air* |
| **5.2.1** | Maksud larutan, keterlarutan | Section 5 | **COVERED** | Definition rendered verbatim to textbook p. 109; own card **plus** contrast block |
| **5.2.2** | **Eksperimen** kadar keterlarutan | Section 8 | **COVERED** | 3 parts; responding variable renders as *Kadar keterlarutan* in all three; controlled list matches source verbatim |
| **5.2.3** | Koloid | Section 7 | **COVERED** | Both source features rendered (not clear; no precipitate) before the positional statement |
| **5.2.4** | Pelarut semesta | Section 9 | **COVERED** | Domestic + manufacturing/agriculture/medicine uses rendered |
| **5.2.5** | Pelarut bukan air | Section 9 | **COVERED** | All five tabs render: Alkohol, Kerosin, Aseton, Turpentin, **Eter** |
| **5.3.1** | Kaedah pembersihan air | Section 10 | **COVERED** | 4×4 matrix renders with screen-reader words; distillation the only all-yes row; penulenan explained |
| **5.3.2** | Bekalan air alternatif | Section 12 | **COVERED** | Three MethodCards render, each with What/How/When — was MISSING |
| **5.3.3** | Sistem pembekalan air | Section 11 | **COVERED** | 8 stages, click→function verified for all 8; order matches Rajah 5.23/5.24 |
| **5.3.4** | Kelestarian air | Section 12 | **COVERED** | Safe drinking water, Minamata, water audit all render as taught content |

| Status | Count |
|---|---|
| **COVERED** | **11 / 11** |
| PARTIAL | 0 |
| MISSING | **0** |
| INCORRECT | **0** |
| NOT_RENDERED | **0** |
| CONFUSING | 0 |

Before remediation: 3 COVERED / 7 PARTIAL / 1 MISSING.

---

## 4. FORMER RELEASE BLOCKERS — ALL CLEARED

**A · SP 5.3.2 — CLEARED.** Rendered learner text in section 12 contains all three methods, each answering the same three questions. Verified as **notes content**, not mind-map or quiz-only: `hasRO`, `hasNEWater`, `hasFog` all true in the rendered DLP walk, and the BM walk shows the `🌍 Tiga cara mendapatkan bekalan air` block with `APAKAH IA? / BAGAIMANA IA BERFUNGSI? / BILA IA BERGUNA?` headers repeated per card. Engineering detail stays at Form 2 level.

**B · Evaporation experiment — CLEARED.** All nine required fields render (Tujuan, Hipotesis, three variables, Bahan, Radas, Kaedah, Pemerhatian, Kesimpulan) across all four factors. Conclusions verified correct and in the required direction: lower humidity → faster; higher temperature → faster; larger surface area → faster; greater air movement → faster. Apparatus is the source's own (cobalt chloride paper, anhydrous calcium chloride, filament bulb, retort stands, fan) — nothing modern invented. The temperature part correctly manipulates **suhu persekitaran**, as the source does.

**C · Rate-of-dissolving experiment — CLEARED, no regression.** All three factors staged. Hypotheses match the source verbatim (*"Semakin tinggi suhu pelarut, semakin tinggi kadar keterlarutan"*). Responding variable is **Kadar keterlarutan** in all three parts. Observations read *"larut dengan lebih cepat"*.

> **Regression scan over the full rendered learner text, both languages — 0 hits** on: `kacauan…meningkatkan keterlarutan`, `saiz…meningkatkan keterlarutan`, bare `meningkatkan keterlarutan`, `stirring…increases solubility`, `smaller/particle size…increases solubility`.

The section intro strengthens it further: *"kesemuanya mempercepatkan proses melarut, **bukan menambah kuantiti maksimum yang boleh larut**."*

**D · Solubility definition — CLEARED, and prominent.** Renders as its own card *and* as the left column of the contrast block. Matches textbook p. 109 word for word. The distinction is rendered as uppercase headers — **BERAPA BANYAK BOLEH LARUT?** vs **BERAPA CEPAT IA LARUT?** (HOW MUCH / HOW FAST in DLP) — placed above each definition, not buried. Closing key point: *"Kacauan dan saiz zarah tidak mengubah kuantiti maksimum yang boleh larut."*

**E · Temperature and solubility — CLEARED, appropriately hedged.** Section 6 renders: *"Bagi **kebanyakan zat terlarut pepejal** seperti garam dan gula, lebih banyak dapat larut pada suhu yang lebih tinggi… ia tidak lagi tepu pada suhu yang baharu itu."* The qualifier prevents the "all solutes behave identically" implication the source does not support, and the reasoning is anchored to the textbook's own *"pada suhu yang tertentu"*. **q23 untouched** — still present, still `Hard`, key unchanged.

**F · Ether — CLEARED.** Renders as the fifth solvent tab. Use is *"pengekstrak minyak"* / *"oil extractant"*, which matches Rajah 5.20. No unsupported stain/use pairing was invented.

**G · Minamata + water audit — CLEARED, taught not name-dropped.** Minamata renders as a full card covering the pollution route (mercury waste → seawater → fish and shellfish → people), the health effect (nervous-system damage, permanent disability), and the lesson (*"Mencegah pencemaran jauh lebih mudah daripada membersihkannya kemudian"*). The water audit card covers recording use activity-by-activity, identifying wastage, and concrete conservation measures. Both are applications, not labels.

**H · Penulenan — CLEARED, correctly handled.** Re-verified independently: *"penulenan"* appears **0 times** in the textbook's Chapter 5; p. 113 names only four methods; DSKP 5.3.1 lists five. AcadeMY did **not** invent a duplicate procedure — it teaches penulenan as the **outcome** (*"matlamat akhir, bukan satu langkah yang berasingan"*) and shows structurally, via the matrix's fourth column, that only distillation achieves it. This is directly supported by the textbook's own Aktiviti 5.7 question 1, *"Kaedah manakah yang menghasilkan air tulen?"*. Sound reconciliation of a genuine source conflict.

**I · BM treatment terminology — CLEARED.** Rendered stage names, in order: **Takungan air → Penapisan → Pengoksidaan → Penggumpalan → Pengenapan → Penurasan → Pengklorinan dan pemfluoridaan → Ke rumah**. Matches Rajah 5.23/5.24. Non-source terms **absent**: `Kogulasi`, `kapur terhidrat`, `Oksidasi`, `Pemendapan` — all 0. **`kekeasidan` = 0; `keasidan` present** in the rendered coagulation function. See L-01 on the fluoridation grouping.

**J · DLP "rate of solubility" — HOLD, SOURCE REQUIRED. Not made worse.** Usage is internally consistent across notes, quizzes, flashcards and mind map, and the concept is scientifically clear. It is now isolated behind `RATE_TERM` / `RATE_TERM_TITLE` in `interactive-dlp.ts`, so one edit resolves the whole chapter when the DLP textbook arrives. **Per the gate rules, this does not block release.**

---

## 5. REGRESSION PROTECTION — ALL 10 HOLD

| # | Area | Verified by | Result |
|---|---|---|---|
| 1 | Cohesion vs adhesion | Label→panel probe, both languages | **HOLD** — not reversed; capillary correctly framed as the *combined* effect |
| 2 | Electrolysis | Label→panel probe + SVG geometry | **HOLD** — anode/positive/oxygen, cathode/negative/hydrogen, ratio 2:1; hydrogen column measured 60 units vs oxygen 30 |
| 3 | Impurities | Rendered text | **HOLD** — *"garam menurunkan takat lebur ais tetapi meningkatkan takat didih air"* |
| 4 | Colloid features | Card + panel probe | **HOLD** — both source features rendered; no invented light claim |
| 5 | Dilute/concentrated/saturated | Rendered text | **HOLD** — preserved verbatim, extended with the temperature effect |
| 6 | Treatment order & functions | 8-stage click probe | **HOLD** — order and every function correct |
| 7 | Purification-method logic | Matrix cell read-out | **HOLD** — boiling ✗✗✓✗, filtration ✓✗✗✗, chlorination ✗✗✓✗, distillation ✓✓✓✓ |
| 8 | Quiz answer keys | Programmatic scan, 72 items | **HOLD** — 0 out-of-range, 0 duplicate option sets |
| 9 | Learner-facing leakage | 21-pattern scan on 62,191 rendered chars | **HOLD** — 0 hits |
| 10 | Interaction functionality | Full walk, both languages | **HOLD** — 36 controls each, **0 inert** |

---

## 6. QUIZ ↔ NOTES ALIGNMENT — PASS

36 items per language. **0 answer-key problems.** No item was weakened.

| Item | Assesses | Now taught? | Evidence |
|---|---|---|---|
| **q22** | Dilute acid aids conductivity in electrolysis | **YES** | Section 3 detail renders *"Air suling sendiri konduktor elektrik yang lemah, jadi sedikit asid cair ditambah…"* — verified visible, not behind a toggle |
| **q23** (Hard) | Heating a saturated solution → more dissolves | **YES** | Section 6; both marker phrases present in rendered text |
| **q28** | NEWater / alternative supply | **YES** | Section 12 renders NEWater within the recycling card |

**Experiment assessment now present** (was absent): responding variable (q31), controlled variables (q33), prediction (q32, and q23), and a direct conflation probe (**q34**, Hard) whose correct answer rejects *"stirring increased the solubility"* and names the rate. Weighting is proportionate — 6 of 36 items — so experiment bookkeeping is not over-represented.

No wrong answer key remains.

---

## 7. FLASHCARD / MIND-MAP REGRESSION — PASS

Flashcards 78/78, mind-map nodes 57/57 — equal across languages.

- f18 solubility definition **intact and correct** in both languages (maximum amount + 100 ml).
- Rate cards still say *kadar keterlarutan*; no conflation introduced.
- Ether, Minamata, water audit, alternative supplies all present in both.
- Mind maps: `Kogulasi` gone; source stage names present; solubility branch split into BERAPA BANYAK / HOW MUCH vs the rate branch.
- **No contradiction found** between any flashcard/mind-map claim and the notes.

---

## 8. VISUAL / INTERACTION QA — PASS

| Visual | Verdict | Evidence |
|---|---|---|
| Capillary | **PASS** | 3 labels, correct explanations, selecting one dims the others; caption correct |
| Solution/suspension/colloid | **PASS** | Three visually distinct beakers; beam length solution 96 > colloid 68 > suspension 48; particles drawn settling only in the suspension; each card maps to the right panel |
| Electrolysis | **PASS** | 4 labels correct; 2:1 measurable off the drawing; max width 440 px — not oversized |
| Treatment sequence | **PASS** | 8 stages, correct order, no duplicate or missing stage, click→correct function |
| Experiment blocks | **PASS** | Variable triad pinned in fixed colours (manipulated amber / responding sky / controlled violet), distinct from Observation and Conclusion; one factor shown at a time behind tabs, so no worksheet wall |

**Colloid specifically** — the gate asks whether it is misleadingly presented as "just halfway". It is not: the card leads with concrete features (*"Tidak jernih, tetapi tidak mengenap"*, *"Tidak menghasilkan mendakan"*, milk/mayonnaise) and states the position **after** them, mirroring textbook p. 111.

**No dead labels.** Every one of the 36 controls per language responds. The 2 BM controls flagged by a naive probe are each MiniExperiment's already-selected first tab, which correctly remains pressed.

**Enlarge-on-demand:** the new blocks are native SVG/HTML, not raster images, so they carry no lightbox. This matches the established, already-release-gated precedent — **no SVG diagram in Chapters 1–4 has enlarge either** (`ImmuneResponseGraph`, `DefenceLinesDiagram`, `ImmunityMatrix`, `EcologicalTermsDiagram`, `EnzymeExplorer` all scored 0). Enlarge belongs to `AnnotatedImage`, which wraps raster WebP where detail is baked into pixels; Chapter 5 has **0** raster `images:` blocks. SVG text is real text and scales with the viewport. Recorded as an observation, not a defect.

---

## 9. SECTION UX — PASS (with one MEDIUM)

12 sections is a sensible granularity for 11 SPs — neither the pre-remediation 3-section compression nor over-fragmentation. Order is logical (properties → forces → composition → evaporation → solutions → mixtures → rate → solvents → purification → supply → sustainability). One active section at a time; Back/Next verified working across all 12 in both languages; progress chips update. No duplicate sections. Both compulsory experiments have a clear, dedicated home.

**Teaching-content weight per section** (rendered chars, chapter-end furniture excluded):

```
S1  969   S2 1085   S3 1252   S4 2165   S5 1471   S6 1117
S7  750   S8 1827   S9 1021   S10 1211  S11  647  S12 3280  ← 1.5× the next largest
```

See **M-01**. No other section is a text wall; the median is ~1,180 characters.

---

## 10. MOBILE / RESPONSIVE QA — PASS

Tested at **1280, 768, 430, 390, 375 px** with true viewport emulation.

| Width | Page overflow | Max SVG | Tables unscrollable | Tap targets < 32 px |
|---|---|---|---|---|
| 1280 | 0 px | 440 px | 0 | 0 |
| 768 | 0 px | 440 px | 0 | 0 |
| 430 | 0 px | 334 px | 0 | 0 |
| 390 | 0 px | 294 px | 0 | 0 |
| 375 | **0 px** | 303 px | 0 | 5 (see L-03) |

Diagrams stay compact and never exceed the viewport. Labels remain readable. Experiment blocks remain usable — the variable grid collapses from 3 columns to 1. The purification table sits inside an `overflow-x: auto` container at every width. The section stepper rail scrolls horizontally (1030 px of chips at 375 px) rather than clipping. No hotspot misalignment — the diagrams use no absolute-positioned hotspots.

> **Method note.** An initial pass that constrained a `div` to 375 px reported overflow in 11 of 12 sections. That was a harness artefact, not a product defect: Tailwind's `sm:`/`lg:` breakpoints key off the **viewport**, not the container, so a 3-column grid was being forced into a 309 px box. Re-run with true viewport emulation, page overflow is **0 px at every width**. Similarly, 7 "clipped" SVGs at 375 px proved to be 16 px completion checkmarks inside the scrollable stepper rail — all reachable.

---

## 11. LEARNER-FACING SOURCE LEAKAGE — PASS

**21 patterns scanned against 62,191 characters of rendered output across both languages. 0 hits.**

Covered: DSKP, Standard Pembelajaran, Standard Kandungan, Jadual 9, Rajah *n*, Jadual *n*, Aktiviti *n.n*, Eksperimen *n.n*, Experiment *n.n*, Activity *n.n*, "according to textbook", "buku teks menyatakan", audit-as-metadata, mandatory, binding, source-supported, reviewer, remediation, release gate, errata, and SP codes `5.x.x`.

**Observation (not a finding):** the shared shell renders `Semak diri — 5.1/5.2/5.3` and `Check yourself — 5.1/5.2/5.3`. These are SK-level topic numbers generated by `ScienceF2InteractiveNotesBlock.tsx:576-577`, identical in Chapters 1–4, which are already release-gated. No SP code is exposed anywhere.

---

## 12. BM / DLP PARITY — PASS

- 12 sections each, same `number` sequence, same order, matching titles.
- Same block types in the same sections; same two experiments with the same part ids.
- 19 SVGs each; **36 interactive controls each**; 0 inert in both.
- Quizzes 36/36, flashcards 78/78, mind-map nodes 57/57.

Terminology pairs all present on both sides:

| BM | DLP | | BM | DLP |
|---|---|---|---|---|
| keterlarutan | solubility | | penapisan | screening |
| kadar keterlarutan | rate of solubility | | penurasan | filtration |
| daya lekitan | cohesive force | | penggumpalan | coagulation |
| daya lekatan | adhesive force | | pengenapan | sedimentation |
| ampaian | suspension | | keasidan | acidity |
| koloid | colloid | | | |

Parity is semantic, not literal — the DLP stream uses proper English stage names rather than transliterations, at the same depth.

---

## 13. TESTS

| Check | Result |
|---|---|
| `tsc --noEmit` | **PASS** |
| `npm run build` | **PASS** — full Cloudflare Pages worker build |
| Chapter 5 regression suite | **PASS** — 68/68 |
| Science F2 suites | **PASS** — 147/147 (4 files) |
| Leakage suite (Ch1–5) | **PASS** — 40/40 |
| Full `vitest run` | 1529 passed, 7 failed |
| **Chapter 5 failures** | **0** |

**Pre-existing failures, unrelated to Chapter 5** — reported, not hidden:

1. `src/lib/billing-core.test.ts` — ToyyibPay sandbox plans
2. `src/lib/invoice-pdf.server.test.ts` — invoice PDF generation
3. `src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts`
4. `src/content/bm/asas-penulisan-form1-mindmap.test.ts`
5. `src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts`
6. `src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts`
7. `src/content/form2/math/chapter-1/quizzes-dlp.test.ts`

`npm run lint` still fails repo-wide on CRLF-vs-LF; pre-existing and not a Chapter 5 signal.

---

## 14. REMAINING NON-BLOCKING ISSUES

**M-01 · MEDIUM · Section 12 carries roughly 1.5× the teaching load of any other section**
Section 12 renders 3,280 characters of teaching content against a 1,180-character median, because it hosts two SPs (5.3.2 and 5.3.4) plus four block types (MethodCards, three cards, the pollutant matcher). It is not a prose wall — most of the weight is in structured, scannable cards — and it renders and scrolls correctly at every width. Splitting it into "Bekalan Air Alternatif" and "Kelestarian Air" would give 13 sections and even out the curve. Recommended as a future polish, not a release blocker.

**L-01 · LOW · Fluoridation is taught but not as a separately-numbered stage**
DSKP 5.3.3 lists seven stages with **Pengflourinan** separate. AcadeMY follows textbook Rajah 5.24, which combines them as *"Pengklorinan dan pemfluoridaan"*. Both functions are taught and were verified in the click probe (chlorine kills microorganisms; sodium fluoride prevents tooth decay), so no content is missing — only the grouping and the spelling (*pemfluoridaan* vs *Pengflourinan*) differ, and AcadeMY follows the book the learner actually holds. A curriculum lead may wish to decide which term the exam favours.

**L-02 · LOW · SVG diagrams carry no enlarge affordance**
Consistent with all of Chapters 1–4. See §8 for why this is appropriate for native SVG. No action recommended unless the standard changes chapter-wide.

**L-03 · LOW · Solvent tabs are 28 px tall at 375 px**
The five non-water solvent tabs in section 9 render at 28 px, below the 36 px used by every purpose-built Chapter 5 block. The height comes from the shared `src/components/ui/tabs.tsx` `TabsTrigger` (`px-3 py-1`, no min-height) — the same component Chapter 2 uses, which is already release-gated. 28 px clears the WCAG 2.5.8 (AA) 24×24 minimum and the controls work. Any fix belongs in the shared UI component and would affect Chapter 2 too.

---

## 15. RELEASE DECISION

```
CHAPTER 5 RELEASE GATE: PASS — FREEZE CHAPTER

CRITICAL: 0
HIGH:     0
MEDIUM:   1   (M-01 section 12 carries ~1.5x the teaching load of any other section)
LOW:      3   (L-01 fluoridation grouped with chlorination per textbook;
               L-02 no enlarge on SVG diagrams, consistent with Ch1-4;
               L-03 shared TabsTrigger renders 28px at 375px)

SP COVERAGE:
  COVERED:      11 / 11
  PARTIAL:       0
  MISSING:       0
  INCORRECT:     0
  NOT_RENDERED:  0
  CONFUSING:     0

MANDATORY EXPERIMENT 5.1.2: PASS
MANDATORY EXPERIMENT 5.2.2: PASS
SOLUBILITY VS RATE:         PASS
QUIZ ↔ NOTES ALIGNMENT:     PASS
VISUAL / INTERACTION QA:    PASS
MOBILE QA:                  PASS
BM/DLP PARITY:              PASS
LEARNER-FACING LEAKAGE:     PASS
TYPECHECK:                  PASS
BUILD:                      PASS
TESTS:                      PASS  (7 pre-existing failures, 0 from Chapter 5)

DLP TERMINOLOGY HOLD:
- "rate of solubility" — SOURCE REQUIRED
  (isolated behind RATE_TERM in interactive-dlp.ts; internally consistent;
   concept scientifically clear; does not block release)
```

---

## 16. AUDIT LIMITATIONS

1. **The DLP/English textbook was not supplied.** English strings were validated by translation equivalence against the BM textbook. M-03 cannot be closed without it.
2. **`Errata.pdf` is self-disclaimed** as an unofficial compilation. Its "no Chapter 5 corrections" status was cross-checked against its own page list (corrections on 53, 71, 151, 173; QR pages 6–232, none inside Chapter 5's printed 94–121) and is consistent, but no item here is *errata-verified*.
3. **Screenshots were unavailable** — the Browser pane was not compositing. Visual claims rest on measured DOM/SVG geometry and rendered text, which is stronger for the ratio and ordering claims but does not substitute for a human eyeballing the layout.
4. **Two source conflicts were resolved by judgement**, both documented with evidence and both open to a curriculum lead's override: penulenan-as-outcome (§4H) and the fluoridation grouping (L-01).

---

## Action taken

**None.** This audit modified no project file. `git status` is byte-for-byte the remediation state: 23 entries, the dead notes at 0 modifications, no content, quiz, flashcard, mind-map, component, or test file touched.

# PASS — FREEZE CHAPTER
