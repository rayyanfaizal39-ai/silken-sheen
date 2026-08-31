# SCIENCE FORM 2 — CHAPTER 9 (HABA / HEAT)
# FINAL INDEPENDENT READ-ONLY RELEASE GATE

**Mode:** READ-ONLY. No project file was created, modified, deleted, renamed, formatted, or committed.
**Date:** 2026-08-30
**Scope:** `science-f2-c9-bm` and `science-f2-c9-dlp`, the live learner-facing product only.
**Stance:** The remediation changelog was treated **as a claim only**. Every statement below was
re-derived from the authoritative PDFs, the source files, or the rendered React output. Nothing was
accepted because the changelog asserted it.

---

## 0. AUTHORITY AND METHOD

| Source | Identity | Role |
|---|---|---|
| `059 DSKP KSSM Tingkatan 2 Sains v2 10 Nov.pdf` | KPM/BPK, DSKP KSSM Sains Tingkatan 2 | Authoritative — curriculum scope |
| `Sains_Tingkatan_2.pdf` | KPM, Sains Tingkatan 2 (BM) | Authoritative — subject matter |
| `SCIENCE_F2_CH09_NOTEBOOKLM_SOURCE_MAP.md` | LLM-generated summary | **Checklist only, never evidence** |
| `SCIENCE_F2_CH09_REMEDIATION_CHANGELOG.md` | Prior session's own report | **Claim under test** |

Textbook page offset independently re-confirmed: **printed page + 7 = PDF page**.

Verification was performed by mounting the **real** `ScienceF2InteractiveNotesBlock` from the running
Vite dev ESM graph with the **real** registry content object, then driving it with full pointer event
sequences and reading back the resulting DOM and SVG geometry. No mock, no fixture, no snapshot of a
previous run.

---

## 1. READ-ONLY PROOF

A baseline MD5 manifest of 20 Chapter-9-relevant files was captured **before** any gate action and
re-verified **after** all gate actions:

```
files in manifest : 20
mismatches        : 0
```

`git status --porcelain` after the gate is byte-identical to its state before the gate. The only new
path in the working tree is this report itself.

**ACADEMY CONTENT MODIFIED: NO**

---

## 2. LIVE-PATH TRACE (does the learner actually reach this content?)

| Check | Result |
|---|---|
| Registry entries | `registry.ts:3596` (bm), `:3610` (dlp) |
| `sciF2InteractiveData` present | Yes, both — 9 sections each |
| `notes:` key also present | Yes, `:3604` / `:3618` — **dead** |
| Route branch order | `notes.tsx:1999` renders `sciF2InteractiveData` **before** `:2141` reaches `notes` |
| Consequence | `notes-bm.ts` / `notes-dlp.ts` are **unreachable** |

The interactive branch strictly precedes the notes branch, so the legacy `notes-*.ts` files cannot
render. **No credit was given to any content found only in the dead notes**, and no finding was
raised against them. (This matters below: two stale `kasar` strings live in `notes-bm.ts` and were
correctly excluded from the verdict because no learner can reach them.)

---

## 3. DSKP COVERAGE — INDEPENDENTLY RE-DERIVED

Standards were re-extracted directly from the DSKP PDF, not copied from the audit or changelog.
Chapter 9 has exactly **9 Standard Pembelajaran** (DSKP PDF pp. 90–92):

| SP | Requirement (abridged from the PDF) | BM | DLP |
|---|---|---|---|
| 9.1.1 | Membanding beza antara haba dengan suhu | COVERED §1 | COVERED §1 |
| 9.2.1 | Haba mengalir panas → sejuk; konduksi, perolakan, sinaran | COVERED §2–3 | COVERED §2–3 |
| 9.2.2 | Pengaliran haba dalam fenomena alam (bayu darat/laut) | COVERED §4 | COVERED §4 |
| 9.2.3 | Konduktor dan penebat haba + kegunaan harian | COVERED §5 | COVERED §5 |
| 9.3.1 | Pengembangan/pengecutan pepejal, cecair, gas | COVERED §6 | COVERED §6 |
| 9.3.2 | Kegunaan pengembangan dan pengecutan | COVERED §7 | COVERED §7 |
| 9.4.1 | Objek gelap dan **kusam** menyerap haba lebih baik | COVERED §8 | COVERED §8 |
| 9.4.2 | Objek gelap dan **kusam** membebaskan haba lebih baik | COVERED §8 | COVERED §8 |
| 9.4.3 | Mengkonsepsikan/mereka bentuk — Konsep Bangunan Hijau | COVERED §9 | COVERED §9 |

**Coverage: 9/9 (100%) in both streams.**

One apparent DLP gap surfaced during automated matching (`9.2.3`) and was run down by hand rather
than reported: the DLP text renders *"A material that lets heat flow through it easily is known as a
heat conductor"*, which is the exact semantic equivalent of the BM *"mengalirkan haba"*. **The gap
was in the matcher, not the product.** Reported here for transparency.

### Mandatory-experiment obligation — re-verified from the primary source

`Jadual 9` was re-extracted from the DSKP PDF and parsed for experiment codes:

```
Jadual 9 (PDF p.45) -> ['3.4.1', '5.1.2', '5.2.2', '7.3.3', '8.2.5']
```

**Chapter 9 has NO entry in Jadual 9.** There is no mandatory DSKP experiment for this chapter, and
none was invented. Any "compulsory experiment" framing for Chapter 9 would have been fabrication.

---

## 4. RENDERED PRODUCT — STRUCTURAL WALK

Both streams mounted and every section visited through the real section stepper:

| Metric | BM | DLP | Parity |
|---|---|---|---|
| Sections reachable | 9 / 9 | 9 / 9 | ✓ |
| Section titles | Haba dan Suhu → Konsep Bangunan Hijau | Heat and Temperature → The Green Building Concept | ✓ |
| SVG figures (`svg[role=img]`) | 6 | 6 | ✓ |
| Interactive badges | 6 | 6 | ✓ |
| Interactive controls | 70 | 70 | ✓ |
| Back enabled | all 9 | all 9 | ✓ |
| Next enabled | 1–8, disabled on 9 (`YYYYYYYYN`) | same | ✓ |
| Rendered characters | 190,782 | 178,439 | — |

Nineteen controls initially flagged as possibly inert were each re-driven individually and **all 19
resolved as live**: 7 were already in the selected state, 5 were matcher-responsive toggles, 3 were
quiz options returning correct feedback, and the Green Building category tabs switch cleanly
(`true,false,false,false` → `false,false,false,true`).

Per the standing instruction, **no control was declared dead on the basis of a bare `.click()`**.
Every interactive element was driven with the full `pointerdown → mousedown → pointerup → mouseup →
click` sequence required by Radix primitives.

---

## 5. SCIENTIFIC VERIFICATION OF ALL SIX FIGURES

Each figure was measured from live SVG geometry, not inspected by eye and not trusted from the
changelog.

| Figure | What was measured | Result |
|---|---|---|
| **Conduction** | Particle `cx` across all 3 heat stages | Identical (`66, 89.5, … 254`, n=9) while the energy front advances 100 → 170 → 260. Particles vibrate in place; **energy travels, matter does not** ✓ |
| **Convection** | Loop path + arrow rotations | One continuous loop; `rotate(-90)` at the warm side (rising), `rotate(90)` at the cool side (sinking); labels *Panas* / *Sejuk* ✓ |
| **Radiation** | Circle count inside the vacuum band | **0 circles** in the band; 3 wave paths; 1 dashed boundary. **No medium is drawn**, and transfer is depicted as waves ✓ |
| **Breeze (sea)** | Rising column x, wind vector | Rises at x=88 (**land**); surface wind 232 → 88 = **sea → land** ✓ |
| **Breeze (land)** | Rising column x, wind vector | Rises at x=232 (**sea**); surface wind 88 → 232 = **land → sea** ✓ — correctly opposite |
| **Expansion** | Particle radius + span, all states | Radius `"5"` constant in every state and temperature; solid span 87 hot vs 68 cold; count 15/15 unchanged. **Particles separate, they do not grow** ✓ |
| **Bimetallic** | Strip endpoints, metal order | Flat at room temp (endY 58, 65) → bends to the contact screw when heated (endY 92, 99); faster-expanding **Kuprum** on the outside of the bend; labels *Kuprum / Besi / Skru sentuhan / Penggera* ✓ |
| **Surface** | Arrow rotations per mode | Absorbing `rotate(0)` = **into** the can; emitting `rotate(180)` = **away**; dark can carries 3 arrows to the shiny can's 1 ✓ |

The bimetallic metals were cross-checked against the textbook: printed **p.215** labels the strip
**Kuprum** and **Besi** and states it *"membengkok ke arah skru sentuhan"*. The product matches the
source — it is copper and **iron**, not steel.

Particle counting was scoped to `svg[role=img]` throughout, because the `InteractiveBadge` lucide
icon also emits `<circle>` elements and would otherwise inflate every count.

---

## 6. CURRICULUM-LEAKAGE SCAN (rendered text, both streams)

Scanned the full rendered learner text for DSKP/SP/SK codes, `Jadual 9`, `Eksperimen 9.x`,
`Aktiviti 9.x`, `Rajah 9.x`, `Figure/Table 9.x`, "buku teks"/"textbook", "mandatory", "binding",
"audit", "remediation", raw URLs, and bare `9.n.n` codes:

```
BM  leaks: []
DLP leaks: []
```

**Zero hits in both streams.** The same scan across all six deck files (`quizzes`, `flashcards`,
`mindmap` × bm/dlp) also returns zero textbook references and zero DSKP/SP/SK leakage.

The `Semak diri — 9.1 … 9.4` headings were re-adjudicated, not grandfathered: these are **textbook
subtopic numbers**, verified against the textbook table of contents, and are the same numbering a
student sees in their own book. They are not SK/SP codes and are not leakage.

The automated leakage test suite (`learner-facing-leakage.test.ts`, now 72 tests covering Ch7–Ch9)
passes in full.

---

## 7. QUIZ VERIFICATION

Decks were parsed directly from source and compared against the **pre-reorder snapshots** captured
before the rebalance — the strongest available check that the rebalance moved positions without
altering meaning.

| Check | BM | DLP |
|---|---|---|
| Question count | 30 | 30 |
| Options per item | 4 / 4 everywhere | 4 / 4 everywhere |
| Answer index in range | all | all |
| Duplicate options | none | none |
| Answer-index histogram | 8 / 8 / 7 / 7 | 8 / 8 / 7 / 7 |
| **Answer TEXT preserved vs snapshot** | **30 / 30** | **30 / 30** |

One BM item (`sci-f2-c9-bm-q24`) was flagged by the text comparison and inspected in full rather than
waved through. The only difference is `kasar` → `kusam` inside the correct option; the correct answer
is still *"Tin K menunjukkan peningkatan suhu lebih besar"*, and the distractors are unchanged in
meaning. This is the deliberate terminology correction, **not** an answer change.

**No quiz was weakened and no scientific meaning was altered to achieve balance.**

---

## 8. DECK / MIND-MAP AGREEMENT

| Check | Result |
|---|---|
| Item parity | quizzes 30/30, flashcards 60/60, mind-map 154/154 nodes |
| "mengukur haba" / "measures heat" | **0 occurrences** — thermometer now measures *temperature* everywhere |
| Roast-chicken aluminium-foil claim | **absent** — correctly never introduced |
| `keluli` / `steel` | 6 occurrences, **all legitimate**: *jambatan keluli* (steel bridges + expansion joints), an unrelated correct context |
| `kasar` on live surfaces | **1 occurrence** — see Finding G-01 |

The `keluli`/`steel` hits were individually inspected rather than pattern-matched away; every one is
a steel **bridge** in the thermal-expansion application, never the bimetallic strip.

---

## 9. TEXTBOOK INVESTIGATIONS — EXPLICIT ADJUDICATION

This was **not** auto-passed from the changelog.

The two textbook investigations (heat insulators; dark vs light surfaces) appear in the **decks** as
de-referenced question items, and in the **notes** as qualitative demonstrations — not as staged
procedures with apparatus lists and variable tables.

Adjudication: **acceptable, not a defect.**

1. Chapter 9 has **no Jadual 9 entry**, independently confirmed above, so there is no mandatory
   experiment to stage. Requiring one would mean inventing scope.
2. The DSKP catatan wording (*"Menjalankan aktiviti untuk menunjukkan…"*) sits in the
   **Cadangan aktiviti PdP** stream, which is non-binding under the DSKP p.39 authority rule applied
   consistently across this chapter series.
3. The demonstration content that the SPs actually require **is present**. Section 8 states the fair
   test explicitly — two identical cans of different colour *"pada jarak yang sama dari sumber
   haba"* — and reports the outcome qualitatively.

**Critically: no fabricated experimental values appear anywhere.** A scan for temperature-value
claims across the entire rendered product returns an empty set. The textbook's own results table is
blank, and the product does not invent numbers to fill it.

---

## 10. BUILD, TYPES, AND TESTS

| Gate | Result |
|---|---|
| `tsc --noEmit` | **PASS** — 0 errors |
| `npm run build` (Vite + nitro + Cloudflare Pages) | **PASS** — worker, sitemap (37 URLs), PWA all generated |
| `chapter-9-remediation.test.tsx` | **PASS** — 83/83 |
| `learner-facing-leakage.test.ts` | **PASS** — 72/72 |
| Full suite | 2209 passed, **8 failed** (see below) |

### Pre-existing unrelated failures — disclosed, not hidden

The same 8 test files fail on this branch independently of Chapter 9:

| File | Failing assertion |
|---|---|
| `src/routes/-onboarding-ui.test.ts` | Profile in desktop + mobile More sheet |
| `src/lib/billing-core.test.ts` | ToyyibPay sandbox plans |
| `src/lib/invoice-pdf.server.test.ts` | invoice reference PDF |
| `src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts` | Form 3 Penulisan registration |
| `src/content/bm/asas-penulisan-form1-mindmap.test.ts` | Form 1 Penulisan registration |
| `src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts` | Form 3 Penulisan registration |
| `src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts` | Form 3 Penulisan registration |
| `src/content/form2/math/chapter-1/quizzes-dlp.test.ts` | Form 2 **Math** DLP objective routing |

**None of these touch Science Form 2 Chapter 9.** They are onboarding, billing, invoicing, Bahasa
Melayu mind-map registration, and Form 2 Mathematics. They are reported here rather than suppressed,
and they are not attributable to this chapter's work.

`npm run lint` remains repo-wide red for CRLF-vs-LF reasons predating this chapter; it was not used
as a gate signal, consistent with prior chapters.

---

## 11. MOBILE / RESPONSIVE QA

All 9 sections were visited at each width and every descendant box measured against its container.

| Width | Sections reached | Figures | Horizontal overflow | Overflowing elements |
|---|---|---|---|---|
| 1280 | 9 / 9 | 6 | No | 0 |
| 430 | 9 / 9 | 6 | No | 0 |
| 390 | 9 / 9 | 6 | No | 0 |
| 375 | 9 / 9 | 6 | No | 0 |

A first pass appeared to show "0 figures" on mobile. Rather than report that, it was run down: at
narrow widths the section stepper hides the numeric badge on **inactive** tabs, so a number-based
matcher silently failed to navigate. Re-driven with title-based matching, all 9 sections render with
all 6 figures at every width. **This was a harness artefact, not a product defect** — recorded here
because a less careful pass would have filed it as a blocker.

Visual confirmation at 390 px shows the sea-breeze figure rendering correctly: warm air rising over
*Darat*, the surface wind arrow running *Laut → Darat*, and the return flow aloft — matching the
geometry measured in §5.

**Advisory (not patched, per instruction):** the section-stepper buttons measure **28 px** high,
below the 44 px touch-target guideline. This is pre-existing chrome shared across chapters, it was
explicitly excluded from this gate's remit, and **no patch was applied**.

---

## 12. FINDINGS

### G-01 · LOW · BM flashcard front uses a term found in neither the DSKP nor the textbook

- **Location:** `src/content/form2/science/chapter-9/flashcards-bm.ts:301`
- **Current:** front reads *"Bandingkan permukaan gelap/**kasar** dengan permukaan putih/berkilat."*
- **Its own back reads:** *"Permukaan gelap dan **kusam**: penyerap dan pembebas haba yang lebih baik…"*
- **DLP twin (`f33`):** *"Compare dark/**dull** surfaces with white/shiny surfaces."* — correct
- **Evidence:** DSKP **9.4.1** and **9.4.2** both read *"objek yang gelap dan **kusam**"*. Textbook
  printed **p.219** frames the design task as *"objek yang **kusam** atau **berkilat**"*. Neither
  authority uses *kasar* (rough) for this property anywhere in Chapter 9.
- **Impact:** the card contradicts its own answer, its DLP counterpart, the interactive notes (which
  say *kusam* throughout), and both authoritative sources. It is BM-only and affects 1 of 60 cards.
- **Why LOW, not HIGH:** no incorrect physics is asserted — the back of the same card immediately
  supplies the correct term, and surface roughness is a genuinely correlated (if imprecise)
  property. Nothing a learner could mark wrong in an exam follows from it.
- **Recommended correction (NOT applied — this is a read-only gate):** change the single word
  `kasar` → `kusam` on line 301.

Two further `kasar` strings exist at `notes-bm.ts:195` and `:225`. They are **excluded from this
finding** because that file is on the dead path proven unreachable in §2, and dead notes are neither
revived nor credited.

### No other findings

No CRITICAL, HIGH, or MEDIUM defect was found in the live Chapter 9 learner product.

---

## 13. WHAT THIS GATE DOES NOT CLAIM

- **No 100% correctness claim.** Verification covered the 9 SPs, 6 figures, 70 controls per stream,
  60 quiz items, 120 flashcards, and 308 mind-map nodes actually rendered. It did not re-derive every
  sentence of prose against the textbook line by line.
- **The DLP textbook was not supplied.** English strings were validated against the BM textbook by
  semantic equivalence, as in every prior chapter of this series. DLP-specific wording divergences
  cannot be ruled out.
- **NotebookLM was used only as a checklist** and contributed no evidence to any conclusion here.
  Its Chapter 9 roast-chicken aluminium-foil claim was **not** independently verifiable in the
  textbook and is correctly absent from the product.

---

## 14. VERDICT RATIONALE

Every blocking dimension passes on independently re-derived evidence: 9/9 curriculum coverage in both
streams, all six figures scientifically correct under direct geometric measurement, zero curriculum
leakage, 60/60 quiz answers preserved through the rebalance, exact BM/DLP parity, no fabricated
experimental data, no invented mandatory-experiment obligation, clean types and a clean production
build, and no responsive regressions at four widths.

The single finding is one imprecise word on the prompt side of one BM flashcard, immediately
corrected by that card's own answer text. It does not teach incorrect science and does not put a
learner at risk of a wrong exam answer. It is recorded so it can be swept in a routine content pass;
it does not warrant blocking release or re-running this gate.

---

# CHAPTER 9 FINAL VERDICT: PASS — FREEZE CHAPTER

**ACADEMY CONTENT MODIFIED: NO**

*One LOW finding (G-01) is documented above and remains open. It is non-blocking. If the team prefers
to freeze with zero open findings, apply the single-word `kasar` → `kusam` change at
`flashcards-bm.ts:301` first; that edit is too small to require re-gating.*
