# SCIENCE FORM 2 — CHAPTER 10 (GELOMBANG BUNYI / SOUND WAVES)
# FINAL INDEPENDENT READ-ONLY RELEASE GATE

**Mode:** READ-ONLY. No project file was created, modified, deleted, renamed, formatted, or committed.
**Date:** 2026-08-31
**Scope:** `science-f2-c10-bm` and `science-f2-c10-dlp`, the live learner-facing product only.
**Stance:** `SCIENCE_F2_CH10_REMEDIATION_CHANGELOG.md` was treated **as a claim only**. Every figure,
count and relationship below was re-derived from the PDFs, the source files, or the rendered DOM/SVG.
Nothing passed because the changelog said it was fixed — and two of its statements did not survive
the check (§14).

---

## 1. READ-ONLY PROOF

A 23-file MD5 manifest and `git status --porcelain` were captured **before** any gate action and
re-verified **after** all gate actions.

```
manifest files changed : 0 of 23
git status             : byte-identical to pre-gate
```

`notes-bm.ts` and `notes-dlp.ts` were not touched. The only new path in the working tree is this
report.

**ACADEMY CONTENT MODIFIED: NO**

---

## 2. SOURCE RECONSTRUCTION — RE-DERIVED

| File | md5 (first 12) | Bytes |
|---|---|---|
| `DSKP.pdf` | `08f4cea69f87` | 4,863,437 |
| `Textbook.pdf` | `dd25378a02de` | 75,708,049 |
| `Errata.pdf` | `d039fbd42f74` | 7,182 |

- **Chapter title:** `10.0 GELOMBANG BUNYI` (DSKP PDF p.94); textbook `Bab 10: Gelombang Bunyi`
- **3 Standard Kandungan:** 10.1 Ciri gelombang bunyi · 10.2 Kenyaringan dan kelangsingan bunyi ·
  10.3 Fenomena dan aplikasi pantulan gelombang bunyi
- **9 Standard Pembelajaran**, re-extracted as distinct codes:
  `10.1.1, 10.2.1, 10.2.2, 10.2.3, 10.2.4, 10.3.1, 10.3.2, 10.3.3, 10.3.4`
- **Textbook pages:** printed 222–236 (offset re-derived as printed + 8 = PDF page)

### Required verifications

```
JADUAL 9 CHAPTER 10: NONE
TEXTBOOK EXPERIMENTS: 0
```

`Jadual 9` (DSKP PDF p.45) parsed directly lists exactly `3.4.1, 5.1.2, 5.2.2, 7.3.3, 8.2.5` —
**no 10.x entry**. The string "Eksperimen" appears **zero times** across printed pp. 222–236; all
five items are *Aktiviti* (10.1–10.5) and remain suggested activities. No mandatory experiment or
formal experiment obligation is asserted anywhere in the product.

**Errata:** no factual correction for Chapter 10; the p.232 QR resource is among the broken links.
A scan of all eight live files for `https?://` returns **zero** — no broken QR or dead URL is
exposed to learners.

---

## 3. NOTEBOOKLM CORRECTIONS — STILL CORRECT

Measured across the full rendered learner text of both streams:

| Disproved claim | Occurrences now |
|---|---|
| A. Speed inferred from the loudness activity | **0** (`louder → faster` pattern) |
| B/C. `∝` proportionality for pitch or loudness | **0** |
| C. Angle of incidence = angle of reflection | **0** |
| D. Industrial crack detection / jewellery cleaning | **0** |
| E. Megaphone as a textbook device | **0** |
| F. Hearing aid extending the biological range | **0** affirmative (see §25) |

**A is explicitly handled, not merely absent.** Both streams carry a note inside the speed section
stating the container demonstration *"membandingkan kekuatan bunyi, bukan mengukur kelajuan bunyi"* /
*"compares loudness — it does not measure the speed of sound"*, while the solid > liquid > gas
ordering is taught separately from particle spacing (textbook printed p.227). The two ideas are kept
apart by construction.

---

## 4. LIVE PATH

| Layer | Evidence |
|---|---|
| Registry BM / DLP | `src/content/registry.ts:3626` / `:3640` |
| Interactive data | `sciF2InteractiveData: scienceF2C10Interactive{BM,DLP}` |
| Legacy notes | `notes: scienceF2C10Notes{BM,DLP}` — registry lines `:3634` / `:3648` |
| Branch order | `src/routes/notes.tsx:1999` (interactive) **precedes** `:2141` (notes) |
| Chapter dispatch | `src/routes/notes.tsx:2088` → `ScienceF2Chapter10NotesBlock` |
| Component | `ScienceF2Chapter10NotesBlock.tsx:1` re-exports `ScienceF2InteractiveNotesBlock` |

**LIVE:** `interactive-{bm,dlp}.ts`, `quizzes-*`, `flashcards-*`, `mindmap-*`
**DEAD:** `notes-bm.ts`, `notes-dlp.ts` — registered but unreachable. No credit was given to them,
and no finding was raised against them.

---

## 5. STRUCTURE

Both streams mounted from the running dev server against the real registry object and walked
section by section.

| Metric | BM | DLP |
|---|---|---|
| Sections | **9** | **9** |
| Rendered characters | 18,657 | 17,366 |
| Per-section range | 1,472–3,020 | 1,444–2,666 |
| SVG figures | **6** | **6** |
| Back button state, §1→§9 | `D E E E E E E E E` | identical |
| Next button state, §1→§9 | `E E E E E E E E –` | identical |

Section order matches the expected conceptual structure exactly:

1 Penghasilan dan Perambatan Bunyi · 2 Pantulan, Penyerapan dan Kelajuan Bunyi · 3 Frekuensi,
Amplitud dan O.S.K. · 4 Kenyaringan dan Kelangsingan Bunyi · 5 Bunyi daripada Alat Muzik · 6 Gema
dan Kesan Doppler · 7 Sonar, Sonogram dan Ekolokasi · 8 Had Pendengaran Manusia dan Haiwan ·
9 Mengatasi Had Pendengaran Manusia — with the DLP titles in the same order.

Back is correctly disabled on §1 and Next absent on §9. No duplicate section, no missing section,
and no section exceeds ~3,000 rendered characters — no content wall.

---

## 6. SP COVERAGE

| SP | Where it is taught | Evidence verified in the rendered product | Status |
|---|---|---|---|
| 10.1.1 | §1 + §2 | vibration as origin; needs a medium; no sound in vacuum; reflect/absorb; solid>liquid>gas | **COVERED** |
| 10.2.1 | §3 | frequency = *bilangan getaran lengkap dalam masa satu saat* + `hertz (Hz)`; amplitude = *sesaran maksimum … kedudukan keseimbangan*; O.S.K. named 20× | **COVERED** |
| 10.2.2 | §4 | kelangsingan ↔ frekuensi, cow/rat examples | **COVERED** |
| 10.2.3 | §4 | kenyaringan ↔ amplitud | **COVERED** |
| 10.2.4 | §5 | all five source instruments; pluck-harder and tension taught separately | **COVERED** |
| 10.3.1 | §6 (`number: "10.3"`) | gema mechanism + Doppler | **COVERED** |
| 10.3.2 | §7 | sonar, sonogram, bat echolocation | **COVERED** |
| 10.3.3 | §8 | 20 Hz–20 000 Hz + five animal ranges | **COVERED** |
| 10.3.4 | §9 | stetoskop, alat bantu pendengaran, pembesar suara | **COVERED** |

```
COVERED: 9   PARTIAL: 0   MISSING: 0   INCORRECT: 0   NOT_RENDERED: 0   CONFUSING: 0
```

Four SP checks initially read as absent from the captured DOM. Rather than record them as gaps, each
was run down: the texts live inside **collapsed accordions and inactive tabs**, which render no body
until opened. Re-driven with every accordion expanded and every tab clicked, all four resolve
present in both streams — the speed/loudness separation note, the no-widen statement, the guitar
tension relationship, and the hearing-aid/ultrasound denial.

---

## 7. BM TERMINOLOGY — THE CRITICAL GATE

Measured on all four live BM surfaces (source) and on the rendered BM text.

| Term | Required | Rendered count | `interactive` | `quizzes` | `flashcards` | `mindmap` |
|---|---|---|---|---|---|---|
| **gema** | present | 26 | 9 | 7 | 11 | 7 |
| **kelangsingan** | present | 36 | 27 | 7 | 16 | 10 |
| **kenyaringan** | present | 27 | 9 | 3 | 7 | 5 |
| **merambat / perambatan** | present | 24 | 15 | 12 | 8 | 3 |
| *kelaraban* | **0** | **0** | 0 | 0 | 0 | 0 |
| *kelantangan* | **0** | **0** | 0 | 0 | 0 | 0 |
| *gegaran* (as echo) | **0** | **0** | 0 | 0 | 0 | 0 |
| *merebak* (as propagation) | **0** | **0** | 0 | 0 | 0 | 0 |
| `C.R.O` in BM | **0** | **0** | 0 | 0 | 0 | 0 |

`getaran` (vibration) is untouched and legitimately present (22 rendered; 29/7/5/8 by file).

Section 4 title reads **"Kenyaringan dan Kelangsingan Bunyi"** — the DSKP SK 10.2 wording, not the
old invented phrasing.

**The former CRITICAL finding is resolved.**

---

## 8–12. CORE SCIENCE

| Check | BM | DLP |
|---|---|---|
| Sound produced by vibration | ✓ | ✓ |
| Requires a medium | ✓ | ✓ |
| No propagation through vacuum | ✓ | ✓ |
| Speed solid > liquid > gas, by particle spacing | ✓ | ✓ |
| Speed **not** derived from loudness | ✓ explicit note | ✓ explicit note |
| Hard+smooth reflect / soft+rough absorb | ✓ | ✓ |
| No angle-of-incidence law | ✓ 0 hits | ✓ 0 hits |
| Frequency definition + `hertz (Hz)` | ✓ | ✓ |
| Amplitude = maximum displacement from equilibrium | ✓ | ✓ |
| No proportionality symbol | ✓ 0 | ✓ 0 |
| O.S.K. / Osiloskop Sinar Katod (BM) | ✓ 20 occurrences | — |
| cathode-ray oscilloscope (DLP) | — | ✓ |
| BM slider wording `peluncur`, not `penebat` | ✓ | — |
| Invented dB / grid / experimental values | **0** | **0** |

Reflection and absorption are not reversed: marble tiles and bare walls are the reflectors, carpet
and cork board the absorbers, with the cinema-wall example from Latihan Formatif 10.1.

---

## 13. WAVE VISUALIZER — DRIVEN AND MEASURED

Sliders driven directly; the rendered path re-measured at each setting.

**Amplitude test** (frequency held at 5):

| amplitude | 5 | 15 | 25 | 35 | 50 |
|---|---|---|---|---|---|
| peak-to-peak | 10 | 30 | 50 | 70 | 100 |
| cycle count | 5 | 5 | 5 | 5 | 5 |

**Frequency test** (amplitude held at 25):

| frequency | 1 | 2 | 4 | 7 | 10 |
|---|---|---|---|---|---|
| cycle count | 1 | 2 | 4 | 7 | 10 |
| peak-to-peak | 50 | 50 | 50 | 50 | 50 |

Peak-to-peak varies only with amplitude; cycle count varies only with frequency. **No coupling.**

`role="img"` present; `aria-label` reads *"Paparan O.S.K.: amplitud sederhana, kelangsingan sederhana
dengan 4 gelombang lengkap dalam satu saat"*; both sliders carry `aria-label` and `aria-valuetext`;
labels read **Amplitud (kenyaringan)** and **Frekuensi (kelangsingan)**.

**Clipping:** at maximum amplitude the trace spans y 16.1–115.9 inside a viewBox height of 132 —
fully within bounds.

---

## 14. TWO CHANGELOG STATEMENTS THAT DID NOT SURVIVE VERIFICATION

Neither changes the verdict, but both are recorded because the changelog was under test.

1. **"75 controls per stream."** Independently counted: **75 button interactions plus 2 range
   sliders = 77 controls** per stream. The changelog's figure omits the sliders it elsewhere claims
   to have upgraded. An undercount, not a defect.

2. **"28 px section-stepper touch target"** (carried from the audit as the standing LOW). Measured by
   control class at 375 px, the **section stepper is 63–88 px** and passes the 44 px guideline. So do
   navigation and figure controls (44 px), reflection checkboxes (69–112 px) and quiz options
   (44–57 px). The control that actually measures **28 px** is the shared Radix **tab trigger**
   (e.g. *"Permukaan keras & licin"*, *"Membaca amplitud pada O.S.K."*), range 28–93 px. The
   sub-44px issue is real but was **misattributed** in both the audit and the changelog.

---

## 15. FIGURES — ALL SIX MEASURED

The six rendered figures were identified from the DOM, not from the changelog's names.

| § | Figure (`aria-label`) | Verification |
|---|---|---|
| 2 | *Pepejal — Paling cepat* | Particle radius constant at **5** across all three states; spacing **20 → 30 → 46**; speed bar **284 → 176.1 → 79.5**. Speed is labelled *Paling cepat/Lebih perlahan/Paling perlahan* — never a loudness label. |
| 3 | *Paparan O.S.K. …* | See §13. |
| 6 | *Pendengar → Permukaan keras → Pendengar* | Outgoing arrow **68→262**, returning arrow **262→68**; labels Pendengar / Permukaan keras / Bunyi asal / **Gema**. |
| 6 | *Pemerhati di hadapan …* | See §18 below. |
| 7 | *Kapal → Objek / ikan → Kapal* | Send **80→238**, return **238→80**, both inside a water-class band (`fill-primary/15`), `insideBand: true`. |
| 8 | *Manusia: 20–20000 Hz; …* | See §24 below. |

Toggling §7 to the bat mode yields *Kelawar → Objek → Kelawar*, send **80→238**, return **238→80**,
inside an air-class band (`fill-muted/25`) — **not a vacuum**, and both legs present.

### §18 Doppler figure — geometric check

Measured from the live SVG, not taken from the changelog:

| Wavefront | centre `cx` | radius `r` | front edge | back edge |
|---|---|---|---|---|
| newest | 139 | 26 | 165 | 113 |
| middle | 128 | 52 | 180 | 76 |
| oldest | 117 | 78 | 195 | 39 |

- **Front gaps: 15, 15** — **back gaps: 37, 37**
- Source motion arrow runs **x1 = 161 → x2 = 184**, i.e. **rightward**
- The compressed side (right) **matches the direction of motion** → `compressedSideMatchesMotion: true`
- Observer markers `↑` (ahead) and `↓` (behind) both render
- Toggling to the rear observer yields *"Muka gelombang di belakang sumber menjadi lebih renggang"*

The wavefronts are compressed ahead and spread behind, on the correct sides. **Not reversed.**

### §24 Hearing-range chart

Tooltips carry the exact source values, and bar geometry is derived from them:

| Entry | Source Hz | Bar start x | Bar end x |
|---|---|---|---|
| Manusia / Human | 20–20 000 | 90.2 | 252.0 |
| Kelawar / Bat | 2 000–110 000 | 198.1 | **292.0** |
| Lumba-lumba / Dolphin | 40–100 000 | 106.5 | 289.8 |
| Anjing / Dog | 67–45 000 | 118.6 | 271.1 |
| Kuda / Horse | 55–33 500 | 113.9 | 264.1 |
| Gajah / Elephant | 16–12 000 | **85.0** | 240.1 |

- Elephant's 16 Hz starts at x = 85, **left of** the human 20 Hz at x = 90.2 ✓
- Bat's 110 kHz ends at x = 292, **right of** the human 20 kHz at x = 252 ✓
- Upper-limit ordering 292 > 289.8 > 271.1 > 264.1 > 252 > 240.1 matches
  110k > 100k > 45k > 33.5k > 20k > 12k exactly ✓
- No invented values; BM and DLP carry identical numbers.

---

## 17. DOPPLER TEXT

| Check | BM | DLP |
|---|---|---|
| Filed under SK 10.3 | ✓ section `number: "10.3"`, *Gema dan Kesan Doppler* | ✓ |
| Apparent-change wording | *perubahan frekuensi ketara* | *apparent change in frequency* |
| Emitted frequency stated steady | *frekuensi yang tetap* | *steady frequency* |
| Approaching → higher, receding → lower | ✓ | ✓ |

The source's own frequency is never said to change; the driver case is explained by the absence of
relative motion.

---

## 25. OVERCOMING HEARING LIMITS

| Check | BM | DLP |
|---|---|---|
| Three textbook devices present | stetoskop, alat bantu pendengaran, pembesar suara | stethoscope, hearing aid, loudspeaker |
| Explicit "does not widen the range" | ✓ | ✓ |
| Limitation framed as too weak / too far | ✓ | ✓ |
| `megafon` / `megaphone` anywhere live | **0** | **0** |

The one sentence pairing a device with ultrasound is a **denial** — *"alat bantu pendengaran tidak
membolehkan manusia mendengar ultrabunyi"* — and the one check question posing the misconception is
answered "Tidak." Both were read as sentences rather than pattern-matched, so neither is mistaken
for an assertion.

---

## 26–27. MIND MAP AND FLASHCARDS

- Flashcards **60 BM / 60 DLP**; mind-map **126 BM / 126 DLP** nodes — parity exact.
- The former conflated node is genuinely split in both streams:
  - `c3-8-3` — human range 20 Hz–20 000 Hz; some animals hear far higher frequencies.
  - `c3-8-4` — stethoscope / hearing aid / loudspeaker amplify or channel sound that is too weak or
    too far away, **and do not widen the human hearing frequency range**.
- `c3-8-1` now reads *"Pantulan bunyi daripada permukaan keras menghasilkan **gema**"* — the correct
  term. No node implies devices extend frequency range.

---

## 28. LEAKAGE

All eight live files scanned for `DSKP`, `SK 10.`, `SP 10.`, `Jadual 9`, `Aktiviti/Activity 10.x`,
`Eksperimen/Experiment 10.x`, `Rajah/Figure/Jadual/Table 10.x`, `buku teks`, `textbook`, `mandatory`,
`binding`, `audit`, `remediation`, raw URLs:

```
interactive-bm  clean     quizzes-bm   clean     flashcards-bm  clean     mindmap-bm   clean
interactive-dlp clean     quizzes-dlp  clean     flashcards-dlp clean     mindmap-dlp  clean
TOTAL: 0
```

The same scan over the rendered learner text of both streams also returns **0**. The shared
`learner-facing-leakage.test.ts` now imports all eight Chapter 10 surfaces and runs **80 tests**.

The `Semak diri — 10.1 / 10.2 / 10.3` headings are the textbook's own subtopic numbers (printed
pp. 224, 229, 232) and are not counted as leakage, consistent with Chapters 7–9.

---

## 29. QUIZZES

| Check | BM | DLP |
|---|---|---|
| Questions | 30 | 30 |
| Difficulty | Easy 10 / Medium 10 / Hard 10 | identical |
| Four options everywhere | ✓ | ✓ |
| `answerIndex` in range | ✓ | ✓ |
| Duplicate options | none | none |
| Answer-position histogram | **8 / 8 / 7 / 7** | **8 / 8 / 7 / 7** |
| `answerIndex` parity BM == DLP | ✓ exact | ✓ exact |

### Answer-text preservation — adjudicated, not assumed

A raw comparison against the pre-rebalance snapshots reported only 16/30 for BM, which required
running down rather than reporting. Matching by **question ID** and normalising the two *intended*
edits (the BM terminology map and the activity de-referencing) gives:

- **BM: 29/30 identical**, the single delta being `alat bantu dengar` → `alat bantu pendengaran`
  inside the correct answer of `q30` — the textbook-terminology rename, not an answer change.
- **DLP: 30/30 identical**, zero answers changed.

Counting that rename as the intended edit it is: **answer text preserved 30/30 BM, 30/30 DLP.**

Option sets changed on exactly the three items the megaphone removal required (`bm-q22`, `bm-q30`,
`dlp-q22`). On `q22` in both streams the question is unchanged and the **correct answer is byte-identical**
(the stethoscope option, still at index 1); only distractors were swapped — megaphone out,
the textbook's loudspeaker in. No distractor was weakened: three plausible alternatives remain.

---

## 30. TEMPERATURE / SOUND-SPEED CLAIM

Independently classified every temperature occurrence in both quiz decks:

| Item | Role |
|---|---|
| `bm-q8`, `dlp-q8` | distractor[3] |
| `bm-q12`, `dlp-q12` | distractor[3] |
| `bm-q19`, `dlp-q19` | distractor[2] |

None is a correct answer, none appears in a question stem, and none appears in an explanation. The
relationship is never assessed, so there is no tested-but-not-taught gap. **The remediation claim is
confirmed.**

---

## 32. INTERACTIONS

| Stream | Section tabs | Sliders | Button interactions | Total | Responsive | Flagged |
|---|---|---|---|---|---|---|
| BM | 9 | 2 | 75 | **77** | 63 | 12 |
| DLP | 9 | 2 | 75 | **77** | 64 | 11 |

Every flagged control was driven individually rather than reported:

- `Kembali` on §1 — `disabled = true`, correctly disabled.
- `Pepejal` / `Pemerhati di hadapan` / `Sonar` — already selected (`aria-pressed = true`). Choosing
  the alternative and returning toggles `true→false→true` in every case.
- `Frekuensi tinggi` — already-active tab. Clicking it from the other tab switches
  `inactive → active` and the panel body swaps.
- Nine §9 mini-quiz options — all report `disabled = false` on a **fresh** mount and respond with
  feedback when clicked first; they lock only after an answer is given.
- Reflection checkboxes (9) toggle a check icon `0 → 1 → 0`.

**0 genuinely inert learner controls.**

---

## 33. BM / DLP PARITY

| Dimension | Result |
|---|---|
| Sections | 9 / 9, identical order |
| SP coverage | 9 / 9 both |
| Figures | 6 / 6, same six concepts |
| Interaction functionality | 77 / 77, all live |
| Quiz count, indices, ids, difficulty | exact |
| Flashcards / mind-map | 60 / 60, 126 / 126 |
| Correct-answer semantics | equivalent |
| **Scientific terminology** | **equivalent** — BM now in the DSKP register, DLP in English |

---

## 34. MOBILE / RESPONSIVE QA

All nine sections visited at each width, every descendant box measured against its container.

| Width | Sections | Figures | Page overflow | Overflowing elements | Slider readout overflow |
|---|---|---|---|---|---|
| 1280 | 9 / 9 | 6 | No | 0 | 0 px |
| 430 | 9 / 9 | 6 | No | 0 | 0 px |
| 390 | 9 / 9 | 6 | No | 0 | 0 px |
| 375 | 9 / 9 | 6 | No | 0 | 0 px |

The previously-fixed BM wave-slider row was rechecked specifically: both readouts, including the long
**"Kelangsingan sederhana"**, overflow by **0 px** at 390 and 375. No figure is clipped, no label is
hidden, and no arrowhead is cut off at any width.

*(A first pass reported 437 offenders and `vw: 0` — the Browser pane was hidden so no layout was
computed. Re-measured with real viewports, the count is 0 at every width.)*

---

## 35. SHARED TOUCH TARGET

Measured by control class at 375 px:

| Control class | Height | Verdict |
|---|---|---|
| Section stepper | 63–88 px | passes 44 px |
| Back / Next | 44 px | passes |
| Figure controls | 44 px | passes |
| Quiz options | 44–57 px | passes |
| Reflection checkboxes | 69–112 px | passes |
| **Radix tab triggers** | **28–93 px** | **min below 44 px — LOW** |

Recorded for the global AcadeMY UI backlog. Not patched during this gate. This does not fail the
academic release, and it corrects the attribution carried in the audit and changelog (§14).

---

## 36. TESTS

| Gate | Result |
|---|---|
| `tsc --noEmit` | **PASS** — 0 errors |
| `npm run build` | **PASS** — worker, sitemap (37 URLs), PWA generated |
| Chapter 10 tests | **PASS — 123 / 123** |
| Science Form 2 tests | **PASS — 824 / 824** across 11 files |
| Leakage suite | **PASS — 80 / 80**, Chapter 10 confirmed included |
| Quiz integrity / parity | **PASS** (within the Chapter 10 suite, re-verified independently in §29) |
| Full suite | 2340 passed, **8 failed** |

All three claimed figures (123 / 824 / 80) were reproduced exactly.

### Pre-existing unrelated failures — reported, not repaired

`src/routes/-onboarding-ui.test.ts` · `src/lib/billing-core.test.ts` ·
`src/lib/invoice-pdf.server.test.ts` · `src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts` ·
`src/content/bm/asas-penulisan-form1-mindmap.test.ts` ·
`src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts` ·
`src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts` ·
`src/content/form2/math/chapter-1/quizzes-dlp.test.ts`

**None touches Science Form 2 Chapter 10.** Same eight as the Chapter 8 and Chapter 9 gates.
`npm run lint` remains repo-wide red for CRLF/LF reasons predating this chapter and was not used as a
gate signal.

---

## 37. FINDINGS

### Former findings

| Ref | Was | Now |
|---|---|---|
| C-01 | CRITICAL — BM invented vocabulary on all four core terms | **RESOLVED** — 0 wrong terms, correct terms present on every BM surface |
| H-01 | HIGH — SP 10.3.4 missing | **RESOLVED** — §9 |
| H-02 | HIGH — SP 10.2.4 missing | **RESOLVED** — §5 |
| H-03 | HIGH — 18 leakage instances | **RESOLVED** — 0 |
| H-04 | HIGH — quiz histogram 12/13/4/1 | **RESOLVED** — 8/8/7/7 |
| H-05 | HIGH — zero instructional diagrams | **RESOLVED** — 6 verified figures |
| H-06 | HIGH — oscilloscope tested but not taught | **RESOLVED** — §3 |
| H-07 | HIGH — no tests, leakage guard excluded Ch10 | **RESOLVED** — 123 tests, guard extended |
| LOW | "28 px section-stepper" | **Superseded** — see §14/§35; stepper is 63 px, tab triggers are 28 px |

### New findings introduced by remediation

**NEW CRITICAL: 0 · NEW HIGH: 0 · NEW MEDIUM: 0**

**NEW LOW: 1** — shared Radix tab triggers measure 28 px minimum, below the 44 px touch guideline.
Pre-existing shared chrome now correctly attributed; global UI backlog, not an academic blocker.

Two changelog inaccuracies are recorded in §14 (control count; touch-target attribution). Both are
reporting errors, not product defects, and neither affects the learner experience.

---

## 38. WHAT THIS GATE DOES NOT CLAIM

- **No 100 % verification claim.** All 9 SPs, 18 rendered sections, 12 figures across both streams,
  154 controls, 60 quiz items, 120 flashcards and 252 mind-map nodes were examined. Prose was not
  re-derived sentence-by-sentence against the textbook.
- **The DLP textbook was not supplied.** English strings were validated against the BM textbook by
  semantic equivalence, as in every prior chapter of this series.
- **The errata is self-disclaimed** as an unofficial mirror; its p.232 QR flag is consistent with the
  textbook, which does print two links on that page.
- **The dead `notes-*.ts` files still carry pre-remediation text.** They are unreachable and were
  correctly excluded. If ever un-shadowed they must be remediated or deleted first.

---

# CHAPTER 10 FINAL VERDICT:
# PASS — FREEZE CHAPTER

```
FORMER CRITICAL OPEN: 0
FORMER HIGH OPEN:     0

NEW CRITICAL: 0
NEW HIGH:     0
NEW MEDIUM:   0
NEW LOW:      1   (shared Radix tab triggers 28px; attribution corrected)

SP COVERAGE:
COVERED:       9
PARTIAL:       0
MISSING:       0
INCORRECT:     0
NOT_RENDERED:  0
CONFUSING:     0

JADUAL 9 CHAPTER 10:          NONE
TEXTBOOK EXPERIMENTS:         0

BM TERMINOLOGY:               PASS
SOUND PRODUCTION:             PASS
SOUND REQUIRES MEDIUM:        PASS
SOUND SPEED:                  PASS
SPEED vs LOUDNESS:            PASS
REFLECTION/ABSORPTION:        PASS
FREQUENCY:                    PASS
AMPLITUDE:                    PASS
OSCILLOSCOPE:                 PASS
LOUDNESS/PITCH:               PASS
MUSICAL INSTRUMENTS:          PASS
ECHO:                         PASS
DOPPLER:                      PASS
DOPPLER FIGURE:               PASS
SONAR:                        PASS
SONOGRAM:                     PASS
BAT ECHOLOCATION:             PASS
HUMAN HEARING RANGE:          PASS
ANIMAL HEARING RANGES:        PASS
HEARING-LIMIT SOLUTIONS:      PASS

UNSUPPORTED APPLICATIONS:     0
MEGAPHONE AS TEXTBOOK DEVICE: 0

TEMPERATURE QUIZ CHECK:       PASS
QUIZ ANSWER KEYS:             PASS
QUIZ POSITION BALANCE:        PASS
ANSWER TEXT PRESERVED:
  BM  30/30
  DLP 30/30

INTERACTIONS:                 PASS
BM/DLP PARITY:                PASS

LEAKAGE: 0

MOBILE QA:                    PASS
SHARED TOUCH TARGET:          LOW

TYPECHECK:                    PASS
BUILD:                        PASS
CHAPTER 10 TESTS:             PASS
SCIENCE F2 TESTS:             PASS
LEAKAGE SUITE:                PASS

ACADEMY CONTENT MODIFIED:     NO
RELEASE GATE ONLY:            YES
```
