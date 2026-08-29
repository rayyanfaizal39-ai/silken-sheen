# REMEDIATION CHANGELOG — Sains / Science Tingkatan 2, Bab 7: Keelektrikan dan Kemagnetan (BM + DLP)

**Date:** 2026-08-28
**Scope:** `science-f2-c7-bm` and `science-f2-c7-dlp`.

---

## Source baseline

**Deep audit used:** `SCIENCE_F2_CH07_DEEP_AUDIT_REPORT.md` — 1 CRITICAL, 4 HIGH, 4 MEDIUM, 3 LOW; SP coverage 4/10 COVERED, 6/10 PARTIAL.

**Every academic claim was re-verified directly against the PDFs before implementation.** Two verifications changed what was implemented:

1. **H-04 became source-resolved.** The audit could not adjudicate the fire-alarm answer because the supplied extract lacked the key. The textbook **does** carry an answer section (printed pp. 279–283). Bab 7 Latihan Sumatif 7 Q5 answer, printed p. 281, verbatim: *"**Litar selari.** Supaya penggera boleh dihidupkan oleh suis pengesan haba dari lokasi yang berlainan dalam satu bangunan."* AcadeMY's "series" answer was **wrong**, not merely contested.
2. **The leak count was 10, not 9.** `mindmap-dlp.ts` carried *"Activit**ies** 7.7 & 7.8"*, which the audit's `Activity \d\.\d` pattern did not match. Recorded and fixed; the shared leakage pattern was widened to the plural.

**NotebookLM corrections respected:**
- **Not acted on:** the fabricated *Daya tindakan / Daya tindak balas* cross-reference (0 occurrences in textbook Chapter 7).
- **Scope kept honest:** DSKP 7.3.3 names only *kompas* and *loceng elektrik*; card strips and magnetic locks are textbook enrichment (Gambar foto 7.18) and are presented as uses, split into permanent-magnet and electromagnet groups.
- **Restored:** DSKP 7.3.2's *"kekuatan daya magnet dengan jarak"*, which NotebookLM omitted.
- **Errata:** the p. 151 *"sel sering"* typo is **not** reproduced (0 occurrences, verified before and after).

---

## Sections

**Before:** 3 sections for 10 SPs (~8,250 rendered characters).
**After:** **10 sections** (~22,570 rendered characters), verified at runtime in both languages.

| # | BM | DLP | SP |
|---|---|---|---|
| 1 | Tenaga | Energy | 7.1.1 |
| 2 | Cas Elektrostatik | Electrostatic Charges | 7.1.2 |
| 3 | Elektrostatik dalam Kehidupan Harian | Electrostatics in Daily Life | 7.1.3 |
| 4 | Arus Elektrik | Electric Current | 7.1.4 |
| 5 | Arus, Voltan dan Rintangan | Current, Voltage and Resistance | 7.1.5 |
| 6 | Hukum Ohm | Ohm's Law | 7.1.6 |
| 7 | Litar Bersiri dan Litar Selari | Series and Parallel Circuits | 7.2.1 |
| 8 | Sifat Magnet dan Medan Magnet | Properties of Magnets and Magnetic Fields | 7.3.1 |
| 9 | Elektromagnet dan Corak Medan Magnet | Electromagnets and Field Patterns | 7.3.2 |
| 10 | Kekuatan Elektromagnet dan Kegunaannya | Electromagnet Strength and Its Uses | 7.3.3 |

**Live files changed:** `interactive-bm.ts` (10.5 → 28.8 KB), `interactive-dlp.ts` (9.9 → 27.6 KB), `quizzes-bm/-dlp.ts`, `flashcards-bm/-dlp.ts`, `mindmap-bm/-dlp.ts`.
**Legacy `notes-bm.ts` / `notes-dlp.ts`: untouched, not revived, not deleted** — git shows 0 modifications. The interactive branch at `routes/notes.tsx:2055` remains the single learner-facing notes surface.

---

## SP remediation

| SP | Before | After | What changed |
|---|---|---|---|
| **7.1.1** | PARTIAL | **COVERED** | 9 energy forms preserved; **8 energy sources added**; explicit form-vs-source distinction card |
| **7.1.2** | COVERED | **COVERED** | Preserved unchanged — electron transfer, protons do not move, like/unlike, electroscope, gold-leaf divergence |
| **7.1.3** | PARTIAL | **COVERED** | Lightning + conductor preserved; **dry-weather/clothing, petrol refuelling and Faraday's cage added** |
| **7.1.4** | COVERED | **COVERED** | Definition preserved; **conventional current vs electron direction added** as an explicit opposed pair; galvanometer named |
| **7.1.5** | PARTIAL | **COVERED** | Three quantity cards preserved and extended with connection; **circuit meter diagram added** |
| **7.1.6** | COVERED | **COVERED** | V = IR preserved with rearrangements; calculator preserved and given the interactive badge |
| **7.2.1** | COVERED | **COVERED** | All six formulas preserved; **series/parallel schematic added**; comparator preserved; **fire-alarm answer corrected** |
| **7.3.1** | PARTIAL | **COVERED** | 4 properties preserved; **field-line diagram, neutral point, and bar/horseshoe/magnadur patterns added** |
| **7.3.2** | PARTIAL | **COVERED** | **Grip rule corrected**; **straight/loop/solenoid patterns added**; distance detached from the turns factor |
| **7.3.3** | PARTIAL | **COVERED** | **Mandatory experiment staged in full**; apparatus diagram added; applications split by magnet type |

**Coverage: 10/10 COVERED** (was 4/10).

---

## Critical

**C-01 — SP 7.3.3 mandatory DSKP experiment taught only as conclusions — FIXED.**

Now staged in the shared `MiniExperiment` block with two parts, each carrying aim, problem statement, hypothesis, all three variables, materials, apparatus, a five-step method, observation and conclusion. Jadual 9 status was independently re-verified (Form 2 list: 3.4.1, 5.1.2, 5.2.2, **7.3.3**, 8.2.5). Detail in the *Mandatory experiment* section below.

---

## High

**H-01 — ammeter/voltmeter connection rule absent — FIXED.**
Now taught in three places: the quantity cards carry `Sambungan: bersiri` / `Sambungan: selari`; a new `CircuitMeterDiagram` draws it; and two check-yourself items plus two quiz items assess it. The diagram's topology was verified at geometry level — the ammeter circle sits at (212, 34) on the top wire (in the main loop), the bulb at (173, 138) on the bottom wire, and the voltmeter at (173, 186) on a branch whose two junction dots land exactly on the bulb's nodes (150, 138) and (196, 138).

**H-02 — three electrostatic applications absent — FIXED.**
Added as accordions in section 3: dry weather and clothing (with the source's nylon-carpet and rubber-soled-shoe detail), petrol refuelling, and the Faraday cage. The Faraday explanation explicitly states the protection comes from the metal body *"bukan daripada tayar getah"* / *"not from the rubber tyres"*, and a test guards that wording.

**H-03 — grip rule inverted; field patterns absent — FIXED.**
The rule is now rendered as ordered steps with **current as the input**:
> 1. Tuding ibu jari tangan KANAN mengikut arah arus konvensional.
> 2. Jari-jari yang melengkung menunjukkan arah medan magnet.

This matches the source (*"Petua genggaman tangan kanan dapat menentukan arah medan magnet"*; Rajah 7.19 labels thumb = *Arah arus*, fingers = *Arah medan magnet*) and now agrees with the mini-quiz and quiz q19, which were already correct. A test asserts the old inverted phrasing cannot return.

Straight-wire, loop and solenoid patterns are added via a new `CurrentFieldPatterns` block, including the source point that **reversing the current changes the field direction but not the pattern** — demonstrated by a toggle that flips the arrowheads while the circles stay put. The distance relationship was **detached from the turns factor** and given its own card.

**H-04 — fire-alarm answer — SOURCE-RESOLVED.**
Not reframed: resolved. The textbook answer key (printed p. 281) gives **parallel**. The check-yourself item was rewritten to ask which circuit suits heat detectors in several locations, keyed to a parallel circuit with the source's own reasoning. A test asserts the notes answer says *parallel*, and that any fire-alarm quiz item keys to parallel.

---

## Mandatory experiment

Reconstructed directly from textbook pp. 161–162 (Eksperimen 7.2, tagged 7.3.3). **No exposure of "Experiment 7.2", "SP 7.3.3" or "Jadual 9" to learners** — the block is titled *"🔬 Penyiasatan: faktor yang mempengaruhi kekuatan medan magnet"*.

| | Part A — Current | Part B — Number of turns |
|---|---|---|
| **Aim** | Mengkaji faktor-faktor yang mempengaruhi kekuatan medan magnet sesuatu elektromagnet | (shared) |
| **Problem** | Adakah arus yang mengalir mempengaruhi kekuatan medan magnet? | Adakah bilangan lilitan gegelung mempengaruhi kekuatan medan magnet? |
| **Hypothesis** | Semakin besar arus…, semakin tinggi kekuatan medan magnet | Semakin banyak bilangan lilitan…, semakin tinggi kekuatan medan magnet |
| **Manipulated** | Arus | Bilangan lilitan gegelung |
| **Responding** | Bilangan jarum peniti yang ditarik | Bilangan jarum peniti yang ditarik |
| **Controlled** | Bilangan lilitan gegelung (10 lilitan) | Arus (0.5 A) |
| **Range** | 0.5, 1.0, 1.5, 2.0, 2.5 A | 10, 20, 30, 40, 50 lilitan |
| **Observation** | more current → more pins attracted | more turns → more pins attracted |
| **Conclusion** | greater current → stronger field; hypothesis accepted | more turns → stronger field; hypothesis accepted |

**Apparatus / materials** (source terms verified): jarum peniti, rod besi, dawai kuprum; bekalan kuasa a.t., suis, ammeter, reostat, piring Petri, dawai penyambung, kaki retort dan pengapit.

**Procedure** reconstructed faithfully from the source's five steps — no invented steps.

**No pin counts were fabricated.** The source publishes no pin dataset, so observations stay qualitative (*"semakin banyak jarum peniti yang ditarik"*). A test asserts no numeric pin count appears.

**Visual:** a new `ApparatusDiagram` draws the set-up as the series loop it actually is — supply → switch → ammeter → rheostat → coil-on-iron-rod → back — with the Petri dish and retort stand, and eight clickable parts.

---

## Visuals

| Visual | Component | Status |
|---|---|---|
| Circuit meter placement | `CircuitMeterDiagram` | **New** — ammeter in the loop, voltmeter on a branch across the bulb; topology verified at geometry level |
| Series vs parallel | `SeriesParallelSchematic` | **New** — one loop vs two branches with explicit junction dots; formulas on each card |
| Magnetic field / neutral point | `MagnetFieldDiagram` | **New** — bar, horseshoe, magnadur and like-poles views; N→S arrows generated from one rule; neutral point X |
| Electromagnetic field patterns | `CurrentFieldPatterns` | **New** — straight/loop/solenoid, with a reverse-current toggle and the grip rule as ordered steps |
| Experiment apparatus | `ApparatusDiagram` | **New** — matches the experimental circuit |

All five are flat SVG/HTML, dark-navy compatible, direct-labelled, and responsive. **No decorative artwork was added**; no AI image is used for the circuit.

---

## Quiz

**BM: 30 · DLP: 30** — count, difficulty balance (10 Easy / 10 Medium / 10 Hard) and parity all preserved.

Five lower-value items per language were **replaced**, not added to:

| Retired | Why | Replaced with |
|---|---|---|
| q2 (what rubbing produces) | duplicated q3 | **Ammeter connection** — in series with the bulb |
| q9 (like poles repel) | covered by flip cards and the new neutral-point item | **Voltmeter connection** — in parallel with the bulb |
| q11 (cloud-top charge sign) | detail beyond the source's statement | **Faraday's cage** — keyed against the rubber-tyre misconception |
| q26 (broken magnet halves) | enrichment beyond DSKP | **Neutral point** between two like poles |
| q29 (TV screen dust) | enrichment beyond DSKP | **Experiment variables** — controlled vs responding |

**Answer key validation:** 0 out-of-range indices, 0 duplicate option sets, 0 duplicate ids, both languages. All previously correct keys were left untouched — including q17 (current vs electron direction), q18 (both strength factors), q19 (grip rule), q21 (480 Ω), q22 (1.5 A), q23 (6 A).

---

## Flashcards

**60 → 74 per language**, exact parity. Fourteen added covering the previously untested areas: ammeter series, voltmeter parallel, Faraday cage, dry-weather charge build-up, refuelling safety, neutral point, the grip rule, straight-wire pattern, reverse-current effect, the experiment's responding variable, both hypotheses, the eight energy sources, and form-vs-source. No existing card was rewritten.

---

## Mind map

**189 → 195 nodes per language**, all ids unique, exact parity. Added: neutral point (under the magnetic-field branch), ammeter-in-series and voltmeter-in-parallel (under the current and voltage nodes), and the three electrostatic applications (under the lightning branch). All experiment/activity numbering removed.

> **A mistake made and corrected during this work.** A first pass inserted the meter and Faraday nodes using id-pattern guesses; `c1-10-1` and `c1-1-4-1` turned out to be *energy* nodes, so three insertions landed in the wrong branch. Caught by inspecting the rendered context rather than trusting the node counts, which were correct either way. The misplaced nodes were removed and re-inserted against verified anchors (`c1-5-3` ammeter, `c1-6-2` voltmeter, `c1-4-4` lightning conductor). Final placement verified by reading the neighbouring labels.

---

## Leakage

**Before: 10** (audit reported 9; a tenth — *"Activities 7.7 & 7.8"* in `mindmap-dlp.ts` — was found during remediation because the audit's singular-only pattern missed it).

**After: 0** across all eight live surfaces, verified with a widened pattern covering `Eksperimen | Aktiviti | Experiment(s) | Activity/Activities | Rajah | Jadual` plus DSKP/SP metadata.

Every affected question was **de-referenced, not weakened** — for example *"Dalam Eksperimen 7.1, semakin panjang wayar nikrom…"* became *"Semakin panjang wayar nikrom…"*, with the option set and answer index unchanged. Mind-map nodes were relabelled conceptually (*"Eksperimen 7.1"* → *"Menyiasat Hukum Ohm"*; *"Eksperimen 7.2 — Faktor Kekuatan Medan Magnet"* → *"Faktor Kekuatan Medan Magnet"*).

The shared `learner-facing-leakage.test.ts` pattern was widened to `\bActivit(y|ies) \d\.\d` so the plural cannot slip past again.

---

## BM / DLP parity

Enforced by test: 10/10 sections, same `number` sequence, same block types per section, 42 interactive controls each, 30/30 quizzes, 74/74 flashcards, 195/195 mind-map nodes. Runtime walk confirmed matching section titles in order and **0 inert controls in both languages**.

Technical terminology is semantically equivalent throughout: arus/current, voltan/voltage, rintangan/resistance, litar bersiri/series circuit, litar selari/parallel circuit, medan magnet/magnetic field, titik neutral/neutral point, petua genggaman tangan kanan/right-hand grip rule, reostat/rheostat, solenoid/solenoid.

---

## Interaction discoverability

All five new blocks use the shared `InteractiveBadge` and `conceptButtonClass` (44 px minimum touch target, clear hover/focus, unmistakable active state). Runtime confirms **5 interactive badges** rendering per walk at every width tested. Chapter 7's flip cards, tabs, accordions and both calculators are otherwise unchanged and were already working.

---

## Tests

`chapter-7/chapter-7-remediation.test.tsx` — **86 tests**, covering all six required areas:

- **A. Coverage** — 9–11 sections, every section has a block, energy sources, the three electrostatic applications, conventional-vs-electron direction, Faraday-not-tyres.
- **B. Correctness** — ammeter series / voltmeter parallel (asserted positively *and* negatively), V = IR with rearrangements, all six circuit formulas, household wiring, magnet shapes, field-line properties, grip rule thumb-current / fingers-field with the inverted phrasing banned, straight/loop/solenoid, reverse-current key point, distance detached from turns.
- **C. Experiment** — both parts, both hypotheses, all three variables each, source ranges, pins as the response indicator, source apparatus terms, apparatus diagram parts, and **no fabricated pin counts**.
- **D. Leakage** — all 8 surfaces, singular and plural forms, plus DSKP/SP metadata.
- **E. Parity** — section count and order, block shape, quiz count and difficulty, flashcard and mind-map counts, mind-map id uniqueness.
- **F. Interactions** — verified at runtime rather than by assertion (see below).

`learner-facing-leakage.test.ts` extended to Chapter 7: 48 → **56 tests**.

### Results

| Check | Result |
|---|---|
| `tsc --noEmit` | **PASS** (exit 0) |
| `npm run build` | **PASS** (exit 0) |
| Chapter 7 remediation tests | **PASS** — 86/86 |
| Leakage suite (Ch1–7) | **PASS** — 56/56 |
| Science F2 suites | **PASS** — 455/455 (8 files) |
| Full `vitest run` | 1952 passed, **8 failed** |
| **Chapter 7-attributable failures** | **0** |

**Pre-existing failures, unrelated to Chapter 7 — reported, not hidden.** Unchanged from the audit baseline:

1. `src/lib/billing-core.test.ts` — ToyyibPay sandbox plans
2. `src/lib/invoice-pdf.server.test.ts` — invoice PDF generation
3. `src/routes/-onboarding-ui.test.ts` — Explorer onboarding UI contract
4. `src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts`
5. `src/content/bm/asas-penulisan-form1-mindmap.test.ts`
6. `src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts`
7. `src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts`
8. `src/content/form2/math/chapter-1/quizzes-dlp.test.ts`

Total test count rose 1858 → 1952 (**+94**). `npm run lint` still fails repo-wide on CRLF-vs-LF; pre-existing.

### Runtime and mobile QA

```
BM  (lang="bm") : 10 sections, 42 controls, 0 inert, 22,566 chars
DLP (lang="en") : 10 sections, 42 controls, 0 inert, 21,604 chars
Desktop         : page overflow 0px, max SVG 561px, 5 interactive badges, 0 targets < 40px
430px           : page overflow 0px, max SVG 359px, 5 badges, 0 targets < 40px
375px           : page overflow 0px, max SVG 304px, 5 badges, 0 targets < 40px
Circuit topology: ammeter (212,34) on the top wire; bulb (173,138) on the bottom wire;
                  voltmeter (173,186) on a branch tapping the bulb's nodes (150,138) & (196,138)
```

No SVG clipped outside a scroll rail at any width; no horizontal page scroll.

---

## Verdict

```
CHAPTER 7 REMEDIATION STATUS: READY FOR RELEASE GATE

CRITICAL OPEN: 0
HIGH OPEN:     0
MEDIUM OPEN:   0
LOW OPEN:      1  (no enlarge affordance on SVG schematics — consistent with
                   Chapters 1-6, where no SVG diagram has one)

SP COVERAGE:
  COVERED:      10 / 10
  PARTIAL:       0
  MISSING:       0
  INCORRECT:     0
  NOT_RENDERED:  0
  CONFUSING:     0

MANDATORY DSKP EXPERIMENT: PASS
AMMETER / VOLTMETER:       PASS
CIRCUITS:                  PASS
MAGNETIC FIELD:            PASS
RIGHT-HAND GRIP RULE:      PASS
QUIZ ANSWER KEYS:          PASS   (60/60, 0 out-of-range, 0 duplicates)
INTERACTIONS:              PASS   (42 controls per language, 0 inert, 5 badges)
BM/DLP PARITY:             PASS
LEARNER-FACING LEAKAGE:    0      (was 10 — one more than the audit found)

TYPECHECK: PASS
BUILD:     PASS
TESTS:     PASS  (8 pre-existing failures, 0 from Chapter 7)
```

---

## Not frozen

**Chapter 7 is NOT frozen.** This changelog records what was implemented; it is not an independent verification of it. The next step is an independent **FINAL RELEASE GATE**.

Items that gate should probe hardest:

1. **The circuit meter diagram's topology** — the release-critical claim. Verify independently that the voltmeter branch taps the same two nodes the bulb sits between, and that the ammeter is genuinely in the loop.
2. **The magnetic field arrow directions** in all four magnet views — generated from one rule, but worth checking each rendered view for N→S correctness, and that lines do not cross.
3. **The solenoid polarity claim** (anticlockwise = north) against the source.
4. **The mind-map re-insertion** described above — confirm all six added nodes sit in semantically correct branches and no pre-existing node was disturbed.
5. **H-04's answer** — confirm the parallel keying against textbook printed p. 281 independently.
6. Whether **10 sections** reads well in sequence, particularly the 4 → 5 → 6 run (current → quantities → Ohm's Law).
