# SCIENCE FORM 2 — CHAPTER 10 (GELOMBANG BUNYI / SOUND WAVES)
# TARGETED REMEDIATION CHANGELOG

**Date:** 2026-08-30
**Scope:** live Chapter 10 learner path (BM + DLP) plus the shared components and tests it needs.
**Inputs:** `SCIENCE_F2_CH10_DEEP_AUDIT_REPORT.md`, `SCIENCE_F2_CH10_NOTEBOOKLM_SOURCE_MAP.md`
**Authorities:** `audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf` (textbook offset: printed + 8 = PDF page)

`notes-bm.ts` / `notes-dlp.ts` were **not touched**. They remain shadowed by the interactive branch
at `src/routes/notes.tsx:1999`, which precedes the notes branch at `:2141`. No dead content was
revived and none was credited.

---

## 1. SECTION ARCHITECTURE

| | Before | After |
|---|---|---|
| Live sections (BM / DLP) | 3 / 3 | **9 / 9** |
| Rendered characters (BM / DLP) | 5,104 / 4,593 | **18,657 / 17,366** |
| Per-section range (BM) | 1,458–2,039 | 1,472–3,020 |
| SVG figures per stream | 0 | **6** |
| Interactive controls per stream | 14 | **75** |

Nine sections, identical in count and subtopic order across both streams:

| # | Subtopic | BM | DLP | SP |
|---|---|---|---|---|
| 1 | 10.1 | Penghasilan dan Perambatan Bunyi | Sound Production and Propagation | 10.1.1 |
| 2 | 10.1 | Pantulan, Penyerapan dan Kelajuan Bunyi | Reflection, Absorption and Speed of Sound | 10.1.1 |
| 3 | 10.2 | Frekuensi, Amplitud dan O.S.K. | Frequency, Amplitude and the Oscilloscope | 10.2.1 |
| 4 | 10.2 | Kenyaringan dan Kelangsingan Bunyi | Loudness and Pitch of Sound | 10.2.2, 10.2.3 |
| 5 | 10.2 | Bunyi daripada Alat Muzik | Sound from Musical Instruments | 10.2.4 |
| 6 | 10.3 | Gema dan Kesan Doppler | Echo and the Doppler Effect | 10.3.1 |
| 7 | 10.3 | Sonar, Sonogram dan Ekolokasi | Sonar, Sonogram and Echolocation | 10.3.2 |
| 8 | 10.3 | Had Pendengaran Manusia dan Haiwan | Human and Animal Hearing Limits | 10.3.3 |
| 9 | 10.3 | Mengatasi Had Pendengaran Manusia | Overcoming Human Hearing Limitations | 10.3.4 |

Correct existing science was moved rather than rewritten: the vibration sources, the vacuum
argument, the solid/liquid/gas ordering, the reflect/absorb contrast, the cow/rat pitch examples and
the four ultrasound applications all survive from the previous version, re-homed into the sections
that own their standards. Shared progress navigation, Back/Next and the section stepper are
unchanged.

---

## 2. BM TERMINOLOGY — THE CRITICAL FIX

Each occurrence was read in its sentence before replacement; none was a blind swap, and `getaran`
(vibration) was left untouched throughout.

| Concept | Wrong term (before) | DSKP/textbook term (after) | Before → After |
|---|---|---|---|
| Echo | *gegaran* (a tremor) | **gema** | 29 → **0** |
| Pitch | *kelaraban* (not a word) | **kelangsingan** | 43 → **0** |
| Loudness | *kelantangan* | **kenyaringan** | 19 → **0** |
| Propagation | *merebak* (to spread) | **merambat / perambatan** | 28 → **0** |
| Oscilloscope (BM) | *C.R.O.* | **O.S.K.** | 2 → **0** |

Correct terms now present across the four live BM surfaces:

| Surface | gema | kelangsingan | kenyaringan | merambat |
|---|---|---|---|---|
| `interactive-bm.ts` | 9 | 27 | 9 | 15 |
| `quizzes-bm.ts` | 7 | 7 | 3 | 12 |
| `flashcards-bm.ts` | 11 | 16 | 7 | 8 |
| `mindmap-bm.ts` | 7 | 10 | 5 | 3 |

Section title corrected: *"Kelantangan dan Kelaraban Bunyi"* → **"Kenyaringan dan Kelangsingan Bunyi"**
(DSKP SK 10.2, PDF p.94).

Keyword list rebuilt to the textbook's own list (printed p.223) plus the SK term:
`Getaran, Medium, Gelombang bunyi, Amplitud, Frekuensi, Kenyaringan, Kelangsingan, Gema, Kesan
Doppler, Ultrabunyi, Had pendengaran, Sonar`. The erroneous *Gegaran* and *Kelaraban* are gone.

Two further BM wording fixes: *"Seret **penebat** amplitud"* (an insulator) → *"Seret **peluncur**
amplitud"*, and *gaung* used for reverberation → *gema* (the textbook uses *gaung* only as a gorge,
and it is retained in that sense in the echo figure's list of places).

---

## 3. SP COVERAGE AFTER REMEDIATION

| SP | Requirement | Where it now lives | Status |
|---|---|---|---|
| 10.1.1 | Medium, reflection, absorption, different speeds | §1 + §2 | **COVERED** |
| 10.2.1 | Frequency + unit, amplitude of vibration, oscilloscope | §3 | **COVERED** |
| 10.2.2 | Frequency ↔ kelangsingan | §4 | **COVERED** |
| 10.2.3 | Amplitude ↔ kenyaringan | §4 | **COVERED** |
| 10.2.4 | Loudness and pitch using musical instruments | §5 | **COVERED** |
| 10.3.1 | Echo and the Doppler effect | §6 | **COVERED** |
| 10.3.2 | Applications of sound reflection | §7 | **COVERED** |
| 10.3.3 | Human and animal hearing limits | §8 | **COVERED** |
| 10.3.4 | Overcoming the human hearing limit | §9 | **COVERED** |

Newly authored content closing the two audit gaps:

- **SP 10.2.4** (§5) — piano, rekorder, gendang, drum and gitar, with the two guitar relationships
  kept deliberately separate: plucking harder → greater amplitude → louder, with the notes stating
  in as many words that *"Kelangsingan bunyi tidak berubah"*; tightening the string → higher
  frequency → higher pitch. No wording anywhere implies harder plucking raises pitch.
- **SP 10.3.4** (§9) — stetoskop, alat bantu pendengaran, pembesar suara, each described as
  amplifying or channelling, plus an explicit statement that they **do not** widen the biological
  20 Hz–20 000 Hz range and that a hearing aid does not let a human hear ultrasound.

Also newly taught, having previously been assessed in the decks but absent from the notes:
**O.S.K. interpretation** (§3), the **amplitude definition** — *sesaran maksimum daripada kedudukan
keseimbangan* (§3), and the **animal hearing ranges** (§8).

---

## 4. SCIENCE PRESERVED, AND THE TRAPS AVOIDED

- **Speed is never inferred from loudness.** §2 carries an explicit note that the plastic-container
  demonstration *"membandingkan kekuatan bunyi, bukan mengukur kelajuan bunyi"* / *"compares loudness
  — it does not measure the speed of sound"*, and the speed ordering is taught separately from
  particle spacing (textbook printed p.227). A test asserts no surface says louder therefore faster.
- **No mathematical proportionality.** Both streams use *bergantung pada* / *depends on*; a test
  asserts the `∝` symbol appears nowhere.
- **No angle of incidence = angle of reflection.** The chapter never teaches it (the word *sudut*
  appears zero times in printed pp. 222–236), and a test asserts it is not imported.
- **No unsupported applications.** Industrial crack detection and jewellery cleaning were not added;
  a test asserts they appear on no surface.
- **No fabricated data.** No decibel values and no oscilloscope grid readings were invented — the
  textbook's observation table on printed p.230 is blank.
- **No manufactured experiment.** Chapter 10 has no Jadual 9 entry and no textbook experiment; all
  five source items are suggested activities and are referred to by apparatus, never as procedures
  with fabricated results.
- **Doppler moved to SK 10.3.** Previously filed inside section 10.2. The emitted frequency is
  explicitly stated to be steady, with the change described as *perubahan frekuensi ketara* /
  *apparent change in frequency*. The driver case is explained by the absence of relative motion —
  which is the answer to the textbook's own question, not a claim the textbook prints.

**Temperature and speed:** left out of the notes deliberately. The textbook raises it only as
Latihan Sumatif Q3 and never in chapter prose. A re-check of the decks found the three `suhu`
occurrences in `quizzes-bm.ts` are all **distractors** (wrong options), so the relationship is never
assessed as a correct answer and there is no tested-but-not-taught gap to close. This corrects the
audit's raw-count reading of that item.

---

## 5. VISUALS ADDED

Six figures per stream, all deterministic HTML/SVG, all with `role="img"` and a meaningful
`aria-label`. No decorative art was added.

| Figure | Component | What makes it correct by construction |
|---|---|---|
| Sound through solid/liquid/gas | `SoundMediaDiagram.tsx` | Particle spacing and the speed bar are both derived from one `speedRank` field, so a state cannot be drawn loosely packed while labelled fastest. Verified: particle radius constant at **5** across all three states while spacing goes **20 → 30 → 46** and the speed bar fills **100% → 62% → 28%**. |
| Oscilloscope trace | `WaveVisualizer.tsx` (upgraded) | Amplitude and frequency are independent inputs. Verified: peaks **2/3/5/8/10** at constant peak-to-peak **40**; peak-to-peak **10/40/100** at constant **5** peaks. |
| Echo path | `EchoDiagram.tsx` | Draws both legs. Verified: outgoing 68→262 to the hard surface, reflected 262→68 back to the listener. No angled ray pair, because the chapter teaches no angle law. |
| Doppler wavefronts | `DopplerWavefronts.tsx` | Each front is the circle a pulse of age *a* would have grown into, centred where the source was: `cx = SRC_X − SOURCE_SPEED·a`, `r = WAVE_SPEED·a`. Verified: front gaps **15, 15** vs back gaps **37, 37** — compressed ahead, spread behind, and impossible to invert without changing the physics constants. |
| Sonar + bat echolocation | `EcholocationDiagram.tsx` | Both modes draw a send **and** a return, and the medium band is drawn from the mode's own `medium`. Verified: sonar send 80→238 / return 238→80 inside the water band; bat the same inside the air band; both `pulsesInsideBand: true`. |
| Hearing frequency range | `HearingRangeChart.tsx` | Every bar's ends come from the entry's own Hz values through `xForHz` on a log axis. Verified: elephant's 16 Hz starts left of the human 20 Hz, bat's 110 kHz ends right of the human 20 kHz, and each decade is equal width. |

The `✨ Interaktif / ✨ Interactive` badge is applied only to the four figures that genuinely have
controls (sound media, oscilloscope, Doppler, echolocation). The echo path and hearing chart are
static and carry no badge.

**Wave visualizer upgrades:** `role="img"` with a language-correct label naming the O.S.K.; slider
labels corrected to *Amplitud (kenyaringan)* / *Frekuensi (kelangsingan)*; `aria-label` and
`aria-valuetext` on both sliders; viewBox height raised 120 → 132 so the trace stays inside its box
at maximum amplitude (now y 16–116); and the slider rows now wrap on narrow screens.

---

## 6. LEAKAGE

| | Before | After |
|---|---|---|
| Live-surface leakage instances | **18** | **0** |

All eighteen were textbook activity numbers on deck surfaces. De-referenced by apparatus, e.g.:

- *"Apakah Aktiviti 10.1 buktikan?"* → *"Apakah yang ditunjukkan oleh demonstrasi balang vakum?"*
- *"Dalam Aktiviti 10.2 menggunakan C.R.O. …"* → *"Dalam penyiasatan menggunakan O.S.K. …"*
- `label: "Activity 10.4 — Air Horn"` → `label: "Moving air-horn demonstration"`

Final scan of all eight live files for `DSKP`, `SK 10.`, `SP 10.`, `Jadual 9`, `Aktiviti/Activity
10.x`, `Eksperimen/Experiment 10.x`, `Rajah/Figure/Jadual/Table 10.x`, `buku teks`, `textbook`,
`mandatory`, `binding`, `audit`, `remediation` and raw URLs returns **clean on every file**.

The `Semak diri — 10.1 / 10.2 / 10.3` headings are the textbook's own subtopic numbers (printed
pp. 224, 229, 232) and are not counted as leakage, consistent with Chapters 7–9.

---

## 7. QUIZZES

| | Before | After |
|---|---|---|
| Answer-position histogram (A/B/C/D) | **12 / 13 / 4 / 1** | **8 / 8 / 7 / 7** |
| Questions per stream | 30 / 30 | 30 / 30 |
| Difficulty split | 10 / 10 / 10 | 10 / 10 / 10 |
| BM/DLP answerIndex parity | exact | exact |
| Guess-B score | 13/30 (43%) | 8/30 (27%) |

Only nine of thirty questions moved, and the only edit was the **order of the options**: the correct
option was swapped with whichever option sat at the target slot, and `answerIndex` followed it.

**Correct answer TEXT preserved: 30/30 BM, 30/30 DLP.** Verified mechanically against pre-change
snapshots, with the option *set* of every question also confirmed unchanged — no distractor was
weakened, reworded or removed.

---

## 8. FLASHCARDS AND MIND MAP

- Flashcards: **60 BM / 60 DLP** (unchanged, parity exact).
- Mind map: **126 BM / 126 DLP** nodes, parity exact after the split below.
- All four BM technical terms corrected; activity numbers de-referenced; BM `C.R.O.` → `O.S.K.`
- **Megaphone removed.** `megafon` / `megaphone` appear on **no** live surface. The textbook's third
  device, **pembesar suara / loudspeaker**, replaces it (printed p.233 names exactly stetoskop, alat
  bantu pendengaran, pembesar suara). `alat bantu dengar` normalised to the textbook's `alat bantu
  pendengaran`.
- **Conflated hearing-limit node split** in both streams. Previously one node paired the animal-range
  comparison with the devices, implying they extend the frequency range. Now two:
  - `c3-8-3` — the human range, and that some animals hear far higher frequencies.
  - `c3-8-4` — the devices amplify or channel sound that is too weak or too far, **and do not widen
    the human hearing frequency range**.

---

## 9. INTERACTIONS

Every control re-tested after the restructure, driven with the full Radix pointer sequence
(`pointerdown → mousedown → pointerup → mouseup → click`).

| Stream | Controls | Responsive | Genuinely inert |
|---|---|---|---|
| BM | 75 | 75 | **0** |
| DLP | 75 | 75 | **0** |

An automated pass flagged 12 BM / 11 DLP as unchanged. Each was run down individually rather than
reported: one was `Kembali` on §1 (confirmed `disabled: true`), four were already-selected figure
controls (confirmed to toggle both ways when the other option is chosen), and the rest were
mini-quiz options that lock after answering — clicking each one *first* on a fresh mount confirmed
it responds and renders feedback.

---

## 10. BM / DLP PARITY

| Dimension | Result |
|---|---|
| Section count and order | 9 / 9, identical subtopic sequence |
| Section subject matter | equivalent |
| Visuals | 6 / 6, same figures |
| Interaction functionality | 75 / 75 controls, all live |
| Quiz count, indices, ids, difficulty | exact |
| Flashcards / mind-map counts | 60 / 60, 126 / 126 |
| Scientific terminology | **now equivalent** — BM uses the DSKP register, DLP the English one |

---

## 11. BROWSER QA

Live component mounted from the running dev server against the real registry object.

| Width | Sections reached | Figures | Horizontal overflow | Overflowing elements |
|---|---|---|---|---|
| 1280 | 9 / 9 | 6 | No | 0 |
| 430 | 9 / 9 | 6 | No | 0 |
| 390 | 9 / 9 | 6 | No | 0 |
| 375 | 9 / 9 | 6 | No | 0 |

**One real mobile defect was found and fixed during this pass.** At 390 px and 375 px the wave
visualizer's value readout overflowed its row by 9 px and 24 px respectively — the BM label
*"Kelangsingan sederhana"* could not fit beside a label and a usable slider track. The slider rows
now wrap, putting the label on its own line below the `sm` breakpoint. Re-measured at all four
widths: **0 overflowing elements**.

No figure is clipped at any width, and every figure sits inside its own `overflow-x` container.

**Advisory, not patched:** the section-stepper buttons remain **28 px** high, below the 44 px touch
target guideline. This is pre-existing chrome shared across all Form 2 chapters and outside this
chapter's remit.

---

## 12. TESTS

**Created:** `src/content/form2/science/chapter-10/chapter-10-remediation.test.tsx` — **123 tests**
covering section architecture, the four BM terms (absent and present), all nine SPs, medium/vacuum,
speed-not-from-loudness, no proportionality, no angle law, the musical-instrument separation,
Doppler placement and wavefront direction, echo send/return, sonar/bat send/return and medium,
exact hearing values and log-axis derivation, hearing-limit device framing, no megaphone, figure
accessibility, quiz integrity and balance, and BM/DLP parity.

**Extended:** `learner-facing-leakage.test.ts` from 72 → **80 tests**, now covering Chapter 10's
eight live surfaces.

| Gate | Result |
|---|---|
| `tsc --noEmit` | **PASS** — 0 errors |
| `npm run build` | **PASS** — worker, sitemap (37 URLs), PWA generated |
| Chapter 10 tests | **PASS** — 123 / 123 |
| Science Form 2 tests | **PASS** — 824 / 824 across 11 files |
| Leakage tests | **PASS** — 80 / 80 |
| Quiz integrity / parity | **PASS** (in the Chapter 10 suite) |
| Full suite | 2340 passed, **8 failed** |

One test defect was found and fixed in my own suite rather than in the content: an
extends-the-frequency-range guard initially flagged the deliberately correct sentence *"alat bantu
pendengaran **tidak** membolehkan manusia mendengar ultrabunyi"* and the check question that poses
the misconception. The assertion now requires a negation or an interrogative, so it catches
affirmative claims only.

### Pre-existing unrelated failures — reported, not fixed

| File | Failing assertion |
|---|---|
| `src/routes/-onboarding-ui.test.ts` | Profile in desktop + mobile More sheet |
| `src/lib/billing-core.test.ts` | ToyyibPay sandbox plans |
| `src/lib/invoice-pdf.server.test.ts` | invoice reference PDF |
| `src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts` | Form 3 Penulisan registration |
| `src/content/bm/asas-penulisan-form1-mindmap.test.ts` | Form 1 Penulisan registration |
| `src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts` | Form 3 Penulisan registration |
| `src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts` | Form 3 Penulisan registration |
| `src/content/form2/math/chapter-1/quizzes-dlp.test.ts` | Form 2 Math DLP objective routing |

**None touch Science Form 2 Chapter 10.** They are the same eight failures observed during the
Chapter 8 and Chapter 9 gates and were not modified. `npm run lint` remains repo-wide red for
CRLF/LF reasons predating this chapter.

---

## 13. FILES CHANGED

**New components (5)**
- `src/components/notes/blocks/SoundMediaDiagram.tsx`
- `src/components/notes/blocks/EchoDiagram.tsx`
- `src/components/notes/blocks/DopplerWavefronts.tsx`
- `src/components/notes/blocks/EcholocationDiagram.tsx`
- `src/components/notes/blocks/HearingRangeChart.tsx`

**New test**
- `src/content/form2/science/chapter-10/chapter-10-remediation.test.tsx`

**Modified**
- `src/content/form2/science/chapter-10/interactive-bm.ts` (rewritten, 9 sections)
- `src/content/form2/science/chapter-10/interactive-dlp.ts` (rewritten, 9 sections)
- `src/content/form2/science/chapter-10/quizzes-bm.ts` · `quizzes-dlp.ts`
- `src/content/form2/science/chapter-10/flashcards-bm.ts` · `flashcards-dlp.ts`
- `src/content/form2/science/chapter-10/mindmap-bm.ts` · `mindmap-dlp.ts`
- `src/content/form2/science/interactive-types.ts` (5 new block types + section fields)
- `src/components/notes/ScienceF2InteractiveNotesBlock.tsx` (5 new render branches)
- `src/components/notes/blocks/WaveVisualizer.tsx` (a11y, BM terms, bounds, mobile wrap)
- `src/content/form2/science/learner-facing-leakage.test.ts` (extended to Chapter 10)

**Deliberately untouched:** `chapter-10/notes-bm.ts`, `chapter-10/notes-dlp.ts` (dead path).

---

## 14. OPEN FINDINGS

1. **LOW — section-stepper touch target.** 28 px against a 44 px guideline. Pre-existing shared
   chrome across all Form 2 chapters; out of scope for this chapter and not patched.
2. **Observation, not a defect — dead notes still carry the old text.** `notes-bm.ts` / `notes-dlp.ts`
   retain the pre-remediation vocabulary and activity numbers. They are unreachable, were excluded by
   instruction, and are excluded from the leakage guard for the same reason. If those files are ever
   un-shadowed they must be remediated or deleted first.
3. **Audit limitation carried forward — the DLP textbook was not supplied.** English strings were
   validated against the BM textbook by semantic equivalence, as in every prior chapter.

No CRITICAL, HIGH or MEDIUM finding from the audit remains open.

---

# CHAPTER 10 REMEDIATION STATUS:
# READY FOR RELEASE GATE

```
CRITICAL OPEN: 0
HIGH OPEN:     0
MEDIUM OPEN:   0
LOW OPEN:      1   (28px section-stepper touch target, pre-existing shared chrome)

SP COVERAGE:
COVERED:       9
PARTIAL:       0
MISSING:       0
INCORRECT:     0
NOT_RENDERED:  0
CONFUSING:     0

BM TERMINOLOGY:               PASS
SOUND REQUIRES MEDIUM:        PASS
SOUND SPEED:                  PASS
FREQUENCY:                    PASS
AMPLITUDE:                    PASS
OSCILLOSCOPE:                 PASS
LOUDNESS/PITCH:               PASS
MUSICAL INSTRUMENTS:          PASS
ECHO:                         PASS
DOPPLER:                      PASS
SONAR/SONOGRAM/ECHOLOCATION:  PASS
HUMAN/ANIMAL HEARING:         PASS
HEARING-LIMIT SOLUTIONS:      PASS
QUIZ KEYS:                    PASS
QUIZ POSITION BALANCE:        PASS
INTERACTIONS:                 PASS
BM/DLP PARITY:                PASS

LEAKAGE: 0

TYPECHECK:         PASS
BUILD:             PASS
CHAPTER 10 TESTS:  PASS  (123/123)
SCIENCE F2 TESTS:  PASS  (824/824)
```

**Chapter 10 is NOT frozen.** An independent read-only release gate must run before any freeze.
