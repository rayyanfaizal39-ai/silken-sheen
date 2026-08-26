# FINAL RELEASE GATE — Sains / Science Tingkatan 2, Bab 4: Kesihatan Manusia (BM + DLP)

**Date:** 2026-08-26
**Mode:** READ-ONLY verification. No project file was modified by this audit.
**Method:** Every claim re-derived from `DSKP.pdf`, `Textbook.pdf` and `Errata.pdf`, then checked
against the *rendered* learner output. The deep-audit report and remediation changelog were read but
**not treated as evidence** — each of the five former blockers was re-verified from source.

---

## CHAPTER 4 RELEASE GATE

# PASS — FREEZE CHAPTER

```
CRITICAL: 0
HIGH:     0
MEDIUM:   2
LOW:      2

SP COVERAGE
COVERED:       10
PARTIAL:        0
MISSING:        0
INCORRECT:      0
NOT_RENDERED:   0
CONFUSING:      0

QUIZ ↔ NOTES ALIGNMENT:   PASS
VISUAL/INTERACTION QA:    PASS
BM/DLP PARITY:            PASS
LEARNER-FACING LEAKAGE:   PASS
TYPECHECK:                PASS
BUILD:                    PASS
TESTS:                    PASS
```

---

## 1. LIVE PRODUCTION PATH — VERIFIED

```
registry.ts:3443-3470   science-f2-c4-bm / -dlp
                        ├── notes                 scienceF2C4Notes{BM,DLP}      ← registered
                        └── sciF2InteractiveData  scienceF2C4Interactive{BM,DLP}

notes.tsx:1999   } : activeChapter?.sciF2InteractiveData ? (        ← taken
notes.tsx:2022        ...chapter === 4 ? <ScienceF2Chapter4NotesBlock content={sciF2InteractiveData} …/>
notes.tsx:2141   } : ( activeChapter?.notes && <NotesBlock …/> )    ← unreachable, final else branch

ScienceF2Chapter4NotesBlock.tsx  (1 line)
    export { ScienceF2InteractiveNotesBlock as ScienceF2Chapter4NotesBlock } …
```

- **Chapter 4 now has its own explicit branch** at `notes.tsx:2022` (previously it fell through to the
  `Chapter13` default). It renders the **remediated** interactive data.
- **Legacy notes are NOT rendered in parallel.** `activeChapter?.notes` sits in the final `else` of the
  ternary opened at line 1999; with `sciF2InteractiveData` present it can never be reached.
  `notes-{bm,dlp}.ts` remain on disk, untouched and unrendered — the intended architecture.
- **Both languages use the remediated content**, runtime-confirmed.

| File | Size | Sections | Status |
|---|---|---|---|
| `interactive-bm.ts` | 32 KB | **11** | LIVE |
| `interactive-dlp.ts` | 31 KB | **11** | LIVE |
| `notes-{bm,dlp}.ts` | 27.7 / 26.9 KB | — | LEGACY, not rendered |
| `quizzes-{bm,dlp}.ts` | 30 items each | — | LIVE |
| `flashcards-{bm,dlp}.ts` | 60 each | — | LIVE |
| `mindmap-{bm,dlp}.ts` | — | — | LIVE |

---

## 2. SP COVERAGE — ALL 10 RE-CHECKED

Rendered and walked in both languages; nothing credited on file presence alone.

| SP | Requirement | Live teaching home | Verification | Status |
|---|---|---|---|---|
| 4.1.1 | Distinguish infectious / non-infectious | §1 | Comparison matches TB p.76 Rajah 4.1 exactly (incl. *asma*); *patogen* defined verbatim | **COVERED** |
| 4.1.2 | Explain how infectious disease spreads | §2 | Four routes, each with source examples + prevention; droplet/dust; mosquito and housefly mechanisms | **COVERED** |
| 4.1.3 | Analyse cause and transmission | §3 | Pathogen / vector / disease separated; **all 6** Jadual 4.1 pairs present; pathogen→disease and symptoms | **COVERED** |
| 4.1.4 | Generate ideas to block transmission | §4 | Three stages verified against Jadual 4.3 — see C-01 | **COVERED** |
| 4.2.1 | Function of the body's defence system | §5 | Three lines verified against TB pp.82–83; non-specific/specific grouping present | **COVERED** |
| 4.2.2 | Define antigen, antibody, immunity | §6 + §9 | All three verbatim from TB p.83; DSKP-scoped response graph present | **COVERED** |
| 4.2.3 | Justify importance of immunisation | §7 | Definition, vaccine contents, mechanism, schedule rationale, boosters, safety | **COVERED** |
| 4.2.4 | Distinguish passive and active immunity | §8 | 2×2 verified against TB p.86; antiserum defined verbatim | **COVERED** |
| 4.2.5 | Justify practices for strong immunity | §10 | Nutrition / physical activity / lifestyle framing; weaken/strengthen factors match Gambar foto 4.4 | **COVERED** |
| 4.2.6 | Impact on family, society, economy, country | §11 | All six DSKP p.56 aspects present | **COVERED** |

---

## 3. REGRESSION CHECK — FORMER BLOCKERS

### C-01 Prevention stages — **FIXED**

Re-derived Jadual 4.3 from the PDF, then measured the live steps:

| Stage | vector control | immunisation | isolate patient | rehabilitation |
|---|---|---|---|---|
| Primer (BM + DLP) | **no** | yes | no | no |
| Sekunder | no | no | **yes** | no |
| Tertier | **yes** | no | no | **no** |

Vector control appears **only** in tertier, matching the source. `rehabilit*` and `pulihkan fungsi`
occur **0 times** in the entire chapter, both languages.

### C-02 Three lines of defence — **FIXED**

Every source element present, every out-of-scope mechanism absent:

| Line | Required elements found | Group |
|---|---|---|
| First | kulit · membran mukus · peluh · sebum · bulu hidung · mukus · lilin telinga · air mata | non-specific |
| Second | fagositosis · sel darah putih · menelan · mencerna · enzim | non-specific |
| Third | antibodi · melekat pada patogen · sel perumah · menggumpal | specific |

**Out-of-scope terms in the defence lines: NONE** — `silia`, `cilia`, `asid perut`, `stomach acid`,
`sel memori`, `memory cell`, `keradangan`, `inflammation` all absent. Grouping labels render as
*Pertahanan tidak spesifik* / *Pertahanan spesifik* and *Non-specific defence* / *Specific defence*.

### C-03 Definitions and response graph — **FIXED**

All three TB p.83 definitions present **verbatim** in BM, and accurately rendered in DLP, including
the antigen locations (*patogen, molekul toksin, sel darah daripada kumpulan darah yang lain*).

The graph was measured, not assumed — curves sampled at 200 points in viewBox space:

| | peak Y | height above baseline | rises above immunity line (y=74) | time to peak |
|---|---|---|---|---|
| Primary | 91.5 | 48.5 | **no** (correct) | 41.1 |
| Secondary | 25.4 | 114.6 | **yes** (correct) | 39.0 |

Amplitude ratio **2.36×**. Direction is scientifically correct on every axis. See MEDIUM-01 for the
one caveat.

### C-04 Immunisation — **FIXED**

Definition (*daya tahan secara aktif*), vaccine contents (*dilemahkan atau dimatikan*), mechanism
(*merangsang sistem imun*), multiple-vaccine rationale, booster rationale and safety
(*piawaian antarabangsa*) — all present. Named vaccines: BCG, Hepatitis B, DTaP, Polio, MMR, HPV,
kept as supporting context with an explicit "you need not memorise the whole schedule".

### C-05 Family / social / economic / country — **FIXED**

All eight probed aspects present: kusta · batuk kokol · tuberkulosis · kos rawatan · kualiti kerja ·
insurans · kualiti kehidupan · migrasi.

**Overclaim guard:** `menghapuskan penyakit` / `eradicat*` occur **0 times**; control wording
(*terkawal* / *control*) is used instead.

---

## 4. NEW-REGRESSION SWEEP

| Risk | Result |
|---|---|
| Wrong vector→pathogen pairing | All 6 pairs match Jadual 4.1; **no match names a disease instead of a pathogen** |
| Wrong prevention-stage classification | Verified above |
| Wrong active/passive classification | All four cells match TB p.86: active-natural *berpanjangan*, active-artificial *berpanjangan*, passive-natural *sementara dan singkat*, passive-artificial *segera tetapi sementara* |
| Antiserum misuse | **NONE** — never described as long-lasting, active, or producing memory cells |
| Vaccine overclaims | **NONE** |
| Incorrect response graph | Geometry measured and correct |
| Generic wellness replacing SP 4.2.5 | Source factors restored (air pollution, pesticides, emotional stress, excess sugar / rest, non-smoking, recreation, periodic checks) under the DSKP's nutrition–activity–lifestyle framing |

---

## 5. QUIZ ↔ NOTES LEARNING LOOP — **PASS**

Every assessed topic traced against the live notes in both languages:

first line · phagocytosis · antigen · immunisation · airborne prevention · flood · **kurap/contact** ·
primary stage · tertiary stage · mucous-membrane function · vaccine contents · **HPV schedule** ·
antiserum · **primary/secondary graph** · passive temporariness · immunity weakeners · fogging ·
mother-to-baby · skin wound · **haj pilgrims** · chickenpox.

**Quiz topics not taught by the notes: 0.** (Was ~10 before remediation.)

Quizzes and flashcards are **byte-identical to pre-remediation** — 30 + 30, 60 + 60 — so no correct
question was weakened to manufacture alignment. The loop was closed from the notes side only.

---

## 6. FLASHCARDS + MIND MAP

- **Flashcards:** unchanged, source-faithful, no contradictions with the remediated notes.
- **Mind map:** now carries the **specific / non-specific** classification and a new
  **Health, Immunisation & Society** branch (controlled recurrence · healthcare costs · work quality
  and migration · insurance and quality of life), closing its former SP 4.2.6 gap in both languages.
- **Cross-surface contradiction check:** the tertiary stage was extracted from all four surfaces in
  both languages — notes, flashcards, mind map, quizzes — and every one describes vector control +
  host protection, with rehabilitation absent everywhere. **No contradictions.**

---

## 7. VISUAL / INTERACTION GATE — **PASS**

Measured on the rendered output, desktop 1280×720 and mobile 375×812, both languages.

| Check | Desktop | Mobile |
|---|---|---|
| Sections rendered | 11 | 11 |
| Interactive controls exercised | 11 | 11 |
| **Dead controls** | **0** | **0** |
| Label → panel mapping correct | **11/11** | — |
| Control overlaps | 0 | **0** |
| Tap targets < 32 px | — | **0** |
| Tallest visual | 244 px (**34 %** of viewport) | 162 px (**20 %**) |
| Horizontal overflow | none | none |
| Back / Next navigation | present and working | present |

**Mapping verified against authored data, not appearance:** for all 11 controls the explanation panel
*starts with the authored name* and *contains the authored note*. Two apparent "mismatches" and ten
"duplicate sections" in a first pass were **probe artefacts** — the former from concatenating a
button's badge digit and sub-label, the latter from sampling the persistent chapter header. Re-measured
against section bodies only: **11 sections, 11 distinct bodies.**

Per the gate's specific list:

- **A. Disease transmission** — four routes as accordions (air / water / contact / vector), each with
  correct source examples and prevention. Explanations verified against TB pp.77–80.
- **B. Three lines of defence** — labels map to correct functions; phagocytosis explanation correct
  and attributed to white blood cells using enzymes.
- **C. Vector → pathogen** — matcher is strictly vector→pathogen, with a separate pathogen→disease
  comparison. **Not conflated.**
- **D. Primary vs secondary graph** — axes correct (*Masa (minggu)* / *Kepekatan antibodi dalam darah
  (%)*, and English equivalents); primary lower and below the immunity threshold; secondary higher and
  above it; all four labels interactive and correctly mapped.
- **E. Active vs passive** — 2×2 logic correct, four cells distinct, selected content matches the
  selected type.

---

## 8. SECTION UX

11 sections for 10 SPs — neither coarse (was 2) nor over-fragmented. Teaching order runs disease →
spread → cause → prevention → defence → definitions → immunisation → immunity types → response graph
→ strong immunity → society, which builds prerequisites before they are used. One active section at a
time; Back/Next present; **no duplicate content**; no repeated generic diagram standing in for
different concepts (the three interactive blocks are each used once, for their own idea).

---

## 9. LEARNER-FACING LEAKAGE — **PASS**

Swept all **8 live surfaces** (interactive, quizzes, flashcards, mind map × BM/DLP) for: DSKP,
Standard Pembelajaran, Standard Kandungan, "according to the textbook", buku teks, Rajah 4.x,
Jadual 4.x, Aktiviti 4.x, audit, source-supported, binding, mandatory, reviewer, remediation.

**Total occurrences: 0.** Standalone `SP 4.x` / `SK 4.x` codes: **0**. (`sp.` survives only inside the
species name *Leptospira* sp., which is genuine science content.)

Section eyebrows use the textbook's own topic numbers **4.1 / 4.2** — the numbers a student sees in
their own book — never SP codes.

---

## 10. BM / DLP PARITY — **PASS**

| Check | Result |
|---|---|
| Section count and order | 11 / 11, identical `number` sequence |
| Block shape per section | **Identical** (computed per section, no mismatches) |
| Keywords · reflection items · mini-quiz | 10 / 10 · 10 / 10 · 3 / 3, same types and answers |
| Quizzes · flashcards | 30 / 30 · 60 / 60 |
| Visuals and interactions | All three blocks present in both, same ids, 11 controls each |
| Runtime | 11 sections, 11 controls, 0 dead — both languages, desktop and mobile |

DLP is a natural-English rendering rather than a literal translation, carrying the same concepts,
examples and depth.

---

## 11. TESTS

```
TYPECHECK (npx tsc --noEmit)                      PASS
BUILD (npm run build)                             PASS
Chapter 4 regression tests                        PASS  (19/19)
Science F2 + notes tests                          PASS  (9 files / 102 tests)
Learner-facing leakage (incl. Ch4)                PASS  (32/32)
BM/DLP parity checks                              PASS
```

Full suite: **1453 passed, 7 failed.** The 7 are **pre-existing and unrelated** —
`src/content/bm/*-mindmap` (×4), Math F2 C1 `quizzes-dlp`, `billing-core`, `invoice-pdf.server` —
unchanged in count and identity from before the Chapter 4 work.

**No project file was modified during this audit.** The uncommitted changes visible in `git status`
are the remediation's, not this gate's.

---

## 12. FINDINGS — NON-BLOCKING

### MEDIUM

**M-01 · The response graph's "faster" claim outruns its curve.**
The label text says the secondary response is *"jauh lebih cepat dan lebih tinggi"* / *"far faster and
much higher"*. Measured, the secondary curve is **2.36× higher** — clearly correct — but reaches its
peak in **39.0 units versus 41.1**, only about **5 % faster**, which is not visually perceptible. The
science stated is right and the dominant visual signal (amplitude) is right, so this does not mislead;
but a student told "far faster" will not see it. Steepening the secondary curve's rise would align the
picture with the words. *Not a blocker: no incorrect statement, and the assessed distinction —
magnitude — is correctly drawn.*

**M-02 · SP 4.2.6 is taught but not assessed.**
The chapter now teaches the family/society/economy/country content, but no quiz item tests it — the
quiz bank was deliberately left untouched. The gate's requirement runs the other way ("no correct quiz
should depend on material absent from notes"), and that is satisfied. Worth adding items in a separate
quiz-bank pass.

### LOW

**L-01 · BM terminology split on the prevention stage.**
Learner-facing notes use the source form **tertier** (×5, matching Jadual 4.3), while BM flashcards
(×2), mind map (×1) and quizzes (×5) use **tertiari**. Meaning is unambiguous and the *content* agrees
across all four surfaces; only the spelling differs. DLP is uniformly *tertiary*. Fixing it means
editing the quiz bank.

**L-02 · Jadual 4.2 presented as comparison columns rather than a table.**
Disease · pathogen · vector · symptom information is complete and correct but split across two columns
instead of a row-per-disease table. Readability polish, not a coverage gap.

---

## VERDICT

# PASS — FREEZE CHAPTER

All five former CRITICAL blockers are independently verified fixed against the PDFs. All 10 Standard
Pembelajaran are genuinely taught and confirmed rendered in both languages. No new regressions were
introduced by the remediation. The quiz–notes learning loop is closed without weakening a single
question. Visuals are compact, scientifically sound and fully interactive with zero dead controls.
Parity, leakage, typecheck, build and tests all pass.

Two MEDIUM and two LOW items remain, none of them blocking: M-01 is a visual-emphasis refinement to a
correct graph, M-02 is additive quiz coverage, and both LOW items are polish.

**Chapter 4 is cleared to freeze.**
