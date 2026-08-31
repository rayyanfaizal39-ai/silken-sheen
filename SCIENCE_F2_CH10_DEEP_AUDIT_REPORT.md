# SCIENCE FORM 2 — CHAPTER 10 (GELOMBANG BUNYI / SOUND WAVES)
# DEEP READ-ONLY AUDIT

**Mode:** AUDIT ONLY. No project file was created, modified, deleted, renamed, formatted, or committed.
**Date:** 2026-08-30
**Scope:** `science-f2-c10-bm` and `science-f2-c10-dlp`, live learner-facing surfaces.
**Stance:** `SCIENCE_F2_CH10_NOTEBOOKLM_SOURCE_MAP.md` was used strictly as a checklist. Every
material claim below was re-derived from the supplied PDFs. Several NotebookLM claims did not
survive that check and are corrected in §2.

---

## 1. SOURCE PROVENANCE

| File | Verified identity | Pages | Role |
|---|---|---|---|
| `audit-sources/Science/Form-2/DSKP.pdf` | KSSM Sains Tingkatan 2, DSKP, BPK/KPM | 112 | Authoritative — scope |
| `audit-sources/Science/Form-2/Textbook.pdf` | Sains Tingkatan 2, KPM 2017, Karangkraf, ISBN 978-967-14472-6-0 | 296 | Authoritative — subject matter |
| `audit-sources/Science/Form-2/Errata.pdf` | **Self-disclaimed** mirrored publisher-correction record | 2 | Advisory only |

**Page offset independently established for this file: printed page + 8 = PDF page**
(printed 222 → PDF 230). This differs from the offset used in the Chapter 9 audit, which used a
different textbook file; it was re-derived rather than assumed.

The errata states in its own text that no official KPM-hosted copy was located and that it "must not
be described as an official-hosted original." It is treated as advisory.

### Chapter title, structure, and numbering — verified

- **DSKP:** `10.0 GELOMBANG BUNYI` (DSKP PDF p.94)
- **Textbook:** `Bab 10: Gelombang Bunyi`, printed pp. 222–236
- **Textbook sections:** 10.1 Ciri-ciri Gelombang Bunyi (p.224), 10.2 Kenyaringan dan Kelangsingan
  Bunyi (p.229), 10.3 Fenomena dan Aplikasi Pantulan Gelombang Bunyi (p.232), Latihan Sumatif 10 (p.235)
- **3 Standard Kandungan / 9 Standard Pembelajaran**, confirmed on DSKP PDF pp. 94–95

| SK | SP |
|---|---|
| 10.1 Ciri gelombang bunyi | 10.1.1 |
| 10.2 Kenyaringan dan kelangsingan bunyi | 10.2.1, 10.2.2, 10.2.3, 10.2.4 |
| 10.3 Fenomena dan aplikasi pantulan gelombang bunyi | 10.3.1, 10.3.2, 10.3.3, 10.3.4 |

### Binding Catatan (verbatim scope, abridged)

- **10.1.1** — activity showing sound waves: require a medium, can be reflected, absorbed by different
  surfaces, have different speeds in different media. (Refers to Modul 28 HEBAT Sains.)
- **10.2.1** — scientific investigation using audio generator, **osiloskop**, loudspeaker; wave-pattern
  differences on the oscilloscope display (amplitude and frequency) and loudness (amplitude).
- **10.2.4** — activity showing loudness and pitch using musical instruments **piano, rekorder,
  gendang, drum, gitar**.
- **10.3.1** — echo with examples/video; activity comparing the pitch of an ambulance siren / air horn /
  motorcycle engine passing an observer. *"Frekuensi bunyi meningkat apabila menghampiri pemerhati dan
  berkurangan apabila melepasinya dikenali sebagai kesan Doppler."*
- **10.3.2** — video simulation of sonar in shipping and fisheries, sonogram in medicine, and how bats
  estimate distance in flight.
- **10.3.3 / 10.3.4** — multimedia presentation on human and animal hearing limits, and ways to
  overcome the human hearing limit.

### Required verification outputs

```
JADUAL 9 CHAPTER 10: NONE
TEXTBOOK EXPERIMENTS: 0
```

**Jadual 9** (DSKP PDF p.45) was parsed directly. It lists exactly five experiments:
`3.4.1, 5.1.2, 5.2.2, 7.3.3, 8.2.5`. **No Chapter 10 entry exists.**

**Textbook experiments = 0.** The string "Eksperimen" appears **zero times** in printed pp. 222–236.
All five numbered items (Aktiviti 10.1–10.5) are labelled *Aktiviti*. Chapter 10 therefore has no
mandatory DSKP experiment and no textbook experiment; all five are suggested activities.

---

## 2. NOTEBOOKLM CLAIM AUDIT — ADJUDICATED

| # | NotebookLM claim | Verdict | Evidence |
|---|---|---|---|
| A | Air/water/flour activity proves **speed** solid > liquid > gas | **OVERREACH** | Printed p.225: the procedure says *"Bandingkan **kekuatan bunyi**"* and Q2 asks students to rank containers *"mengikut **kekuatan bunyi**"* — loudness only, answer left blank. The activity measures loudness, not speed. |
| A′ | (corollary) Is solid > liquid > gas still teachable? | **YES — independently** | Printed p.227 teaches it directly in prose via particle spacing: *"dipindahkan dengan **cepat** melalui pepejal"*, slower in liquids, *"sangat perlahan"* in gases; Rajah 10.5 caption states different speeds in different media. |
| B | Frequency ∝ pitch (strict proportionality) | **OVERSTATED** | Printed p.229: *"Kelangsingan bunyi pula **bergantung pada** frekuensi"* — depends on, not proportional. No mathematical relation is given. |
| C | Amplitude ∝ loudness (strict proportionality) | **OVERSTATED** | Printed p.229: *"kenyaringan bunyi ... **bergantung pada** amplitud"*. Same finding. |
| D | Doppler: apparent change; driver hears no shift | **PARTLY SOURCED** | Printed p.231 defines it as *"perubahan frekuensi **ketara**"* (apparent) and Rajah 10.8 is explicitly observer-referenced. But the driver claim is **not printed** — Aktiviti 10.4 Q3 *asks* it (*"Adakah pembawa sumber bunyi turut merasakan perubahan…?"*). It is the expected answer to a textbook question, not a textbook statement. |
| E | Chapter 10 teaches angle of incidence = angle of reflection | **FALSE — imported** | The word "sudut" appears **zero times** in pp. 222–236. Printed p.228 only says reflection resembles the behaviour of light studied in Form 1. The angle law is not Chapter 10 content. |
| F | Ultrasound applications incl. **industrial crack detection** and **jewellery cleaning** | **NOT IN SOURCE** | Printed p.232 and Aktiviti 10.5 list only: sektor perkapalan, perikanan, perubatan, penganggaran jarak oleh kelawar. The summary map (p.234) repeats the same four. Crack detection and jewellery cleaning are NotebookLM additions. |
| G | Devices "overcome hearing limits" incl. **megaphone** | **PARTLY FALSE** | Printed p.233 names exactly three: **stetoskop**, **alat bantu pendengaran**, **pembesar suara**. *Megafon is not in the textbook.* Critically, p.233 frames the limitation as *"tidak dapat mendengar bunyi yang **terlalu lemah atau jauh**"* — too faint or too far. It is a **loudness/distance** limit, never a frequency-range limit. |
| — | DSKP misspells 10.2.2 as "Menhubungkaitkan" | **FALSE** | DSKP PDF p.94 reads **"Menghubungkaitkan"** correctly. The genuine typos are **"ampltud"** in 10.2.3 and the run-on **"aktivitiuntuk"** in 10.1.1. |
| — | Warmer air → faster sound (p.235) | **EXERCISE, NOT PROSE** | Printed p.235 Q3 *asks* for the speed–air-temperature relationship. The chapter body never states it. |
| — | Jadual 9 Chapter 10: none | **CONFIRMED** | See §1. |
| — | Textbook experiments: 0 | **CONFIRMED** | See §1. |
| — | Human hearing 20 Hz – 20 000 Hz | **CONFIRMED** | Printed p.233 verbatim. |
| — | p.232 QR resource obsolete; no Ch10 factual correction | **CONFIRMED** | Errata §4 lists broken QR pages including **232**; §3 lists factual corrections only for pp. 53, 71, 151, 173. |

---

## 3. LIVE PRODUCT PATH

| Layer | Evidence |
|---|---|
| Registry BM | `src/content/registry.ts:3626` — `science-f2-c10-bm`, title *"Bab 10: Gelombang Bunyi"* |
| Registry DLP | `src/content/registry.ts:3640` — `science-f2-c10-dlp`, title *"Chapter 10: Sound Waves"* |
| Interactive data | `sciF2InteractiveData: scienceF2C10Interactive{BM,DLP}` |
| Legacy notes | `notes: scienceF2C10Notes{BM,DLP}` — also registered |
| Route dispatch | `src/routes/notes.tsx:1999` tests `sciF2InteractiveData` **before** `:2141` reaches `notes` |
| Chapter 10 branch | `src/routes/notes.tsx:2088` → `<ScienceF2Chapter10NotesBlock>` |
| Component | `src/components/notes/ScienceF2Chapter10NotesBlock.tsx:1` re-exports `ScienceF2InteractiveNotesBlock` |
| Language prop | `lang={scienceLang === "dlp" ? "en" : "bm"}` — DLP receives `"en"` |

**Classification**

- **LIVE:** `interactive-bm.ts`, `interactive-dlp.ts`, `quizzes-*.ts`, `flashcards-*.ts`, `mindmap-*.ts`
- **DEAD / LEGACY:** `src/content/form2/science/chapter-10/notes-bm.ts`, `notes-dlp.ts` —
  registered but unreachable, because the interactive branch strictly precedes the notes branch.
  **No credit is given to any content found only in these files, and no finding is raised against them.**
- **REGISTERED-BUT-NOT-RENDERED:** the two `notes-*.ts` files above.

---

## 4. SECTION ARCHITECTURE

Measured by mounting the real component with the real registry object and walking every section.

| Metric | Ch10 BM | Ch10 DLP | Ch9 (remediated reference) |
|---|---|---|---|
| Live sections | **3** | **3** | 9 |
| Section titles | 10.1 Ciri-Ciri Gelombang Bunyi · 10.2 Kelantangan dan Kelaraban Bunyi · 10.3 Fenomena dan Aplikasi Pantulan | 10.1 Characteristics of Sound Waves · 10.2 Loudness and Pitch of Sound · 10.3 Phenomenon and Application of Reflection | 9 titled sections |
| Rendered characters | 5,104 | 4,593 | ~16,900 |
| Per-section chars | 1,458 / 1,607 / 2,039 | 1,367 / 1,409 / 1,817 | 1,517–2,645 |
| **SVG figures** (`svg[role=img]`) | **0** | **0** | **6** |
| **Interaction badges** | **0** | **0** | **6** |
| Interactive blocks | 1 (`waveVisualizer`) + 1 `tabs` | same | 6 diagrams + matcher + accordions + tabs |
| Controls | 14 | 14 | 70 |
| `checks` per section | 1 | 1 | 2 |
| miniQuiz items | 2 | 2 | 3 |

**Assessment: yes, Chapter 10 is compressed into a content wall.** Nine SPs are folded into three
sections carrying about **30 % of the content volume** of the remediated Chapter 9, with **zero
instructional diagrams**. This is not an argument that Ch10 must have exactly nine sections — it is
that three sections cannot carry 10.2.1–10.2.4 and 10.3.1–10.3.4 without dropping SPs, and §5 shows
two SPs are in fact entirely absent.

---

## 5. SP COVERAGE MATRIX

Judged against the **live interactive notes** (the rendered learner surface). Deck-only coverage is
noted but does not earn COVERED, because a learner meets the quiz after the notes.

| SP | Source requirement | Live evidence | Status | Severity |
|---|---|---|---|---|
| **10.1.1** | Medium required; reflect; absorb; different speeds | §1 teaches vibration sources, medium/vacuum, solid>liquid>gas with particle spacing, and reflect/absorb tabs (`interactive-{bm,dlp}.ts:26–35`) | **COVERED** | — (BM wording, see C-01) |
| **10.2.1** | Frequency + unit + **amplitude of vibration**; oscilloscope interpretation | Frequency and Hz present (`:44`). Amplitude given only as *"how big the vibration is"* — never as maximum displacement from the equilibrium line. **O.S.K./oscilloscope never named**; the `waveVisualizer` is generic | **PARTIAL** | HIGH |
| **10.2.2** | Relate frequency to **kelangsingan** | Relationship correct and cow/rat examples present, but BM names it *"kelaraban"* — a non-word | **CONFUSING** (BM) / COVERED (DLP) | CRITICAL |
| **10.2.3** | Relate amplitude to **kenyaringan** | Relationship correct, but BM names it *"kelantangan"* | **CONFUSING** (BM) / COVERED (DLP) | CRITICAL |
| **10.2.4** | Loudness & pitch using **piano, rekorder, gendang, drum, gitar** | **Nothing in the notes.** Only *"tali gitar"* appears, as a vibration source in §1. No plucking-harder, no tension→pitch | **MISSING** | HIGH |
| **10.3.1** | Echo **and** Doppler | Doppler correct — but filed inside **section 10.2**, not 10.3. Echo taught in §3 but BM calls it *"gegaran"*; no echo diagram | **PARTIAL** | HIGH |
| **10.3.2** | Sonar (shipping, fisheries), sonogram (medical), bat distance estimation | All four present as cards (`:64–69`) | **COVERED** | — |
| **10.3.3** | Human **and animal** hearing limits | Human 20–20 000 Hz present; bats mentioned. **No animal ranges at all** in notes (present and correct in decks) | **PARTIAL** | MEDIUM |
| **10.3.4** | Ways to overcome the human hearing limit | **Nothing in the notes, either stream.** (The single BM hit for "pembesar suara" is *"kon pembesar suara"* — a speaker cone listed as a vibration source, not the device) | **MISSING** | HIGH |

```
SP COVERAGE
COVERED:       2   (10.1.1, 10.3.2)
PARTIAL:       3   (10.2.1, 10.3.1, 10.3.3)
MISSING:       2   (10.2.4, 10.3.4)
INCORRECT:     0
NOT_RENDERED:  0
CONFUSING:     2   (10.2.2, 10.2.3 — BM stream)
```

---

## 6. FINDINGS

### CRITICAL

**C-01 · BM stream invents non-standard vocabulary for all four core terms of the chapter**

- **Locations:** every live BM surface — `interactive-bm.ts`, `quizzes-bm.ts`, `flashcards-bm.ts`,
  `mindmap-bm.ts`
- **Measured counts of wrong terms, and of the correct DSKP/textbook terms:**

| Concept | DSKP / textbook term | Occurrences of correct term | AcadeMY BM term | Occurrences |
|---|---|---|---|---|
| Echo | **gema** | **0** | *gegaran* (= tremor) | 29 |
| Pitch | **kelangsingan** | **0** | *kelaraban* (not a word) | 43 |
| Loudness | **kenyaringan** | **0** | *kelantangan* | 19 |
| Propagate | **merambat** | **0** | *merebak* (= to spread, as disease) | 28 |

- **119 wrong-term instances; the four correct terms appear zero times anywhere in the BM stream.**
- **Evidence:** DSKP p.94 SK 10.2 is titled *"Kenyaringan dan kelangsingan bunyi"*; textbook p.229
  uses *kenyaringan*/*kelangsingan*; p.232 uses *gema*; p.226 uses *merambat*. The textbook keyword
  list (p.223) carries **Gema** and **Kelangsingan** explicitly.
- **Root cause:** the DLP file is correct English (*Echo, Pitch, Loudness, propagate*). The BM file
  reads as a machine translation of it in which the four technical terms were rendered literally
  rather than mapped to the Malaysian scientific register.
- **Impact:** a BM learner revising from AcadeMY never encounters the words that appear on their exam
  paper, and *gegaran* actively collides with the vibration vocabulary of this same chapter.
- **Targeted fix:** global term mapping across the four BM files — `gegaran→gema`,
  `kelaraban→kelangsingan`, `kelantangan→kenyaringan`, `merebak→merambat`; then re-check the section
  title `"Kelantangan dan Kelaraban Bunyi"` → `"Kenyaringan dan Kelangsingan Bunyi"` and the keyword
  list. Do **not** apply blind replace to `merebak` without reading each sentence — one instance
  describes a bell's vibration spreading and needs *merambat* too, but wording must stay natural.

### HIGH

**H-01 · SP 10.3.4 entirely missing from the notes, both streams**
`interactive-bm.ts` / `interactive-dlp.ts` contain no stethoscope, hearing aid, or loudspeaker. The
decks carry 12 items on it. Textbook p.233 + Gambar foto 10.7. **Fix:** add a section (or cards)
covering the three textbook devices, framed as amplifying/channelling faint or distant sound.

**H-02 · SP 10.2.4 entirely missing from the notes, both streams**
DSKP catatan names five instruments; the notes teach none. Textbook Latihan Sumatif Q6 asks
specifically about tightening and plucking a guitar string. **Fix:** add a musical-instrument block
covering pluck-harder → larger amplitude → louder, and higher tension → higher frequency → higher
pitch, explicitly keeping those two as separate causes.

**H-03 · 18 learner-facing leakage instances (expected 0)**
Textbook activity numbers are exposed directly to learners:

| File | Lines | Instances |
|---|---|---|
| `quizzes-bm.ts` | 154, 197, 214 | 3 |
| `quizzes-dlp.ts` | 154, 197, 214 | 3 |
| `flashcards-bm.ts` | 101, 337, 346 | 3 |
| `flashcards-dlp.ts` | 101, 337, 346 | 3 |
| `mindmap-bm.ts` | 27, 146, 162 | 3 |
| `mindmap-dlp.ts` | 27, 146, 162 | 3 |

Examples: *"Apakah Aktiviti 10.1 buktikan?"*, *"Dalam Aktiviti 10.2 menggunakan C.R.O. …"*,
`label: "Activity 10.4 — Air Horn"`. **Fix:** de-reference exactly as Ch7–Ch9 were — name the
apparatus, not the number (e.g. *"demonstrasi balang vakum"*, *"penyiasatan hon udara"*).

**H-04 · Quiz answer-position histogram is severely skewed**
`{0: 12, 1: 13, 2: 4, 3: 1}` identically in both streams. 25 of 30 correct answers sit in positions
A–B; position D holds one. A learner who always picks B scores **13/30 (43 %)** without reading.
**Fix:** rebalance toward ~8/8/7/7 by swapping the key with the option at the target slot, exactly as
Ch8/Ch9 were rebalanced, then verify answer *text* is preserved.

**H-05 · Zero instructional diagrams for a chapter whose concepts are inherently spatial**
Both streams render **0 `svg[role=img]` figures and 0 interaction badges**. Nine high-risk concepts
have no visual at all: vibration/medium, solid–liquid–gas transfer, reflection vs absorption,
oscilloscope traces, Doppler wavefronts, echo path, sonar send/return, bat echolocation, and the
hearing-frequency range. Chapter 9 ships 6 verified figures for comparable material.
**Fix:** the highest-value additions are an echo path diagram (source → hard surface → listener), a
sonar/echolocation send-and-return pair, and a hearing-range scale. See §11 for the visual rules any
new figure must satisfy.

**H-06 · Oscilloscope tested but never taught**
`C.R.O.` appears 5 times across the decks (`quizzes-*.ts:197, 214`; `flashcards-*.ts:101`;
`mindmap-*.ts:146`) and **0 times in the notes**. SP 10.2.1's catatan makes oscilloscope
interpretation part of the standard. **Fix:** name the existing `waveVisualizer` as the O.S.K.
display and teach the two readings (wave height → amplitude → loudness; cycles per second →
frequency → pitch).

**H-07 · Chapter 10 has no test coverage and is excluded from the leakage guard**
`src/content/form2/science/chapter-10/` contains **no `.test.*` file**, and
`learner-facing-leakage.test.ts` covers `chapter-1` … `chapter-9` only. This is precisely why H-03
went undetected. **Fix:** extend the leakage test to chapter-10 and add a `chapter-10` remediation
test in the established style.

### MEDIUM

**M-01 · Doppler is filed under the wrong Standard Kandungan**
`interactive-bm.ts:46–49` / `interactive-dlp.ts:46–49` place the Doppler card inside **section 10.2**.
Doppler is **SP 10.3.1**, under SK 10.3. The science is correct; the placement contradicts the
chapter's own structure and the section's own `number: "10.2"`.

**M-02 · Mind-map node conflates amplification with extending the frequency range**
`mindmap-bm.ts:281` (`c3-8-3`): *"Manusia: had pendengaran 20 Hz–20,000 Hz, **lebih rendah daripada
sesetengah haiwan**; peranti seperti stetoskop, megafon dan alat bantu dengar **mengatasi had ini**."*
Placing the animal-range comparison and the devices in one sentence tells a learner the devices
overcome the *frequency* limit. Textbook p.233 is explicit that the limit being overcome is sound
that is *"terlalu lemah atau jauh"*. **Fix:** split the node.

**M-03 · Megaphone taught as a textbook device; loudspeaker omitted**
`quizzes-bm.ts:315`, `flashcards-bm.ts:165, 310`, `mindmap-bm.ts:260` (and DLP twins) teach
*megafon/megaphone*, which does **not** appear in textbook Chapter 10. The textbook's third device,
**pembesar suara** (loudspeaker), is absent from the decks. Note the individual device descriptions
are otherwise correct — they say *memperkuatkan* / *menyalurkan* (amplify / channel) and make no
range-extension claim.

**M-04 · Animal hearing ranges absent from the notes**
SP 10.3.3 names animals explicitly. The notes carry none. The **decks are exactly correct** and were
verified value-by-value against textbook p.233 — Kelawar 2 000–110 000, Anjing 67–45 000,
Lumba-lumba 40–100 000, Gajah 16–12 000, Kuda 55–33 500. **No invented values anywhere.** The gap is
placement, not accuracy.

**M-05 · Amplitude never defined**
Textbook p.229 / DSKP 10.2.1 require *amplitud getaran*; the source definition is maximum
displacement from the equilibrium line. The notes say only *"sebesar mana getaran itu"* / *"how big
the vibration is"*. Nothing taught is wrong, but the definable quantity is never defined.

**M-06 · BM decks use the English abbreviation**
`quizzes-bm.ts:197, 214`, `mindmap-bm.ts:146` say **C.R.O.**; the BM textbook (p.229) uses
**O.S.K.** (Osiloskop Sinar Katod). C.R.O. is correct for the DLP stream only.

**M-07 · Content volume**
See §4 — 5,104 / 4,593 rendered characters across 3 sections against Chapter 9's ~16,900 across 9,
for the same nine-SP load.

**M-08 · The one figure that exists is not exposed as a figure**
The waveform SVG (`viewBox="0 0 400 120"`) carries no `role="img"` and no `aria-label`. It is
invisible to assistive technology and is why the figure count reads 0.

### LOW

- **L-01** `interactive-bm.ts:11–20` keyword list carries both *"Getaran"* and the erroneous
  *"Gegaran"*, and omits *Gelombang* and *Had pendengaran*, which the textbook keyword list (p.223) carries.
- **L-02** `interactive-bm.ts:53` — *"Seret **penebat** amplitud"*. *Penebat* means insulator; a slider
  is *peluncur*. Rendered live in the wave-visualizer instruction.
- **L-03** `quizzes-bm.ts:317` — hearing aid described as amplifying sound entering *"telinga orang
  awam"* (the general public's ear); the textbook frames it for the hearing-impaired.
- **L-04** `interactive-*.ts:65` — the Sonar card lists medicine among sonar's sectors while a separate
  card covers medical ultrasound. Textbook-defensible (p.232 does say the technology is also used in
  medicine and fisheries) but duplicative.
- **L-05** At amplitude 50 the waveform spans y 10–110 inside a 120-tall viewBox — close to clipping.
- **L-06** `mindmap-bm.ts` uses *gaung* for reverberation, while the textbook uses *gaung* to mean a
  gorge (a place where echoes occur).

---

## 7. TOPIC AUDITS

### Sound production (§7)
Both streams open with vibration as the origin of sound and name vocal cords, a guitar string, a
speaker cone and a ringing bell (`:26`). Matches textbook p.224 (*peti suara*, *peralatan muzik*).
Nothing implies sound without a vibrating source. **Sound-production teaching is correct.**

### Medium, vacuum, and speed (§6)
Correct in both streams: sound needs a medium; there is no sound in the vacuum of space; the
astronaut check (`:37`) reinforces it. Speed cards give solid → fastest, liquid → slower, gas →
slowest, each attributed to particle spacing — matching textbook p.227 rather than being inferred
from loudness.

**The loudness/speed trap was avoided.** `mindmap-bm.ts:76–79` labels the plastic-container activity
*"Aktiviti **Kekuatan Bunyi** pada Bekas Plastik"* and records the observation as
*"kekuatan/kelantangan bunyi berbeza mengikut medium"* — loudness, with **no speed inference**. This
is the one place NotebookLM overreached and AcadeMY did not.

Temperature is not taught anywhere in the notes; it appears only in `quizzes-bm.ts` (3 hits). Since
the textbook raises it only as Latihan Sumatif Q3 and never in prose, this is a deck-only topic — see
the §22 note below rather than a scope error.

### Reflection and absorption
`tabs` in §1 give hard & smooth → good reflectors (marble tiles, bare walls) and soft & rough → good
absorbers (carpet, softboard), plus the cinema-wall example from Latihan Formatif 10.1 Q3. Matches
textbook p.228. **No angle-of-incidence claim is made anywhere** — correctly, since Chapter 10 does
not teach it (§2E).

### Frequency (§8) and Amplitude (§9) — the wave visualizer
The single interactive figure was driven directly and measured from its SVG path.

| Test | Result |
|---|---|
| Amplitude 5 → 20 → 50 at fixed frequency | peak-to-peak **10 → 40 → 100** ✓ |
| Cycle count while amplitude varies | **5, 5, 5** — unchanged ✓ |
| Frequency 2 / 3 / 5 / 8 / 10 at fixed amplitude | peaks **2 / 3 / 5 / 8 / 10** ✓ |
| Peak-to-peak while frequency varies | **40, 40, 40, 40, 40** — unchanged ✓ |

**Both critical visual rules hold:** frequency stays visually constant when amplitude is demonstrated,
and amplitude stays constant when frequency is demonstrated. Frequency is correctly defined as
vibrations per second and measured in **Hz**. This block is the strongest asset in the chapter.
Its only defects are the BM slider labels (C-01, L-02) and the missing `role="img"` (M-08).

### Pitch and loudness (§10)
Relationships are stated correctly in both streams (greater amplitude → louder; higher frequency →
higher pitch) and the cow-moo / rat-squeak examples match textbook p.229. Neither stream asserts
mathematical proportionality — both use *"bergantung kepada"* / *"depends on"*, which is exactly
right and better than the source map's ∝. **The concepts are sound; only the BM names are not.**

### Oscilloscope / O.S.K. (§11)
**Not taught.** See H-06. No axis or trace contradiction exists to audit, because no oscilloscope
trace is presented as such. No decibel values or grid measurements are invented anywhere — correct,
since the textbook's p.230 observation table is printed blank.

### Musical instruments (§12)
**Not taught in the notes** (H-02). Deck coverage is one piano item in each stream
(`flashcards-bm.ts:510`, `mindmap-bm.ts:132`), both correctly tying how hard a key is pressed to
loudness. **No wording anywhere implies that plucking harder raises pitch** — the trap was avoided.
Guitar tension → pitch is absent entirely.

### Echo (§13)
Taught in §3 of both streams with the correct mechanism (reflection from a hard surface, slight
delay) and the textbook's locations (empty halls, caves, tunnels, gorges). **BM calls it
*gegaran* throughout — see C-01.** No echo diagram exists, so there are no arrow directions to audit.
No numerical echo-distance formula is invented — correct for Form 2.

### Doppler (§14)
**Scientifically correct in both streams.** `interactive-*.ts:48` defines it as *"perubahan **ketara**
dalam frekuensi"* / *"the **apparent** change in frequency"* caused by relative motion — matching
textbook p.231. `quizzes-bm.ts:251` is observer-referenced (*"didengar oleh pemerhati … mendekati
pemerhati yang pegun"*), and pitch rises approaching, falls receding.

On NotebookLM's driver claim: `quizzes-bm.ts:389` explains that the person carrying the source
*"tidak mengalami pergerakan relatif terhadap sumber itu sendiri"*. This is correct physics and is
the expected answer to textbook Aktiviti 10.4 Q3, so it is legitimately in scope — but it should not
be presented as a printed textbook statement, because it is not one.

**No wavefront diagram exists**, so the compressed-in-front / stretched-behind rule cannot be
violated here. If one is added during remediation, that rule becomes binding.

The only Doppler defect is placement (M-01).

### Reflection applications (§15) and their visuals (§16)
All four textbook applications are present as cards: sonar for underwater detection in shipping,
medical ultrasound including foetal scanning, fisheries, and bat echolocation. **No unsupported
application appears in the notes** — crack detection and jewellery cleaning were correctly not
imported (§2F). Bat echolocation is described as emit-and-listen-for-return, which is the correct
two-way framing.

**No sonar or echolocation diagram exists**, so there are no one-way arrows to fault and no medium
error to find. This is a gap (H-05), not an error.

### Human hearing range (§17) and animal hearing (§18)
Notes give *"kira-kira 20 Hz hingga 20,000 Hz"* / *"roughly 20 Hz to 20,000 Hz"*. The textbook states
it definitely (*"terhad kepada julat"*); AcadeMY's softening errs toward caution and is acceptable.
Ultrasound is correctly defined as above 20 000 Hz.

Animal ranges are absent from the notes (M-04) but **exactly correct in the decks** — every value was
checked against textbook p.233 and none is invented. Units are consistently Hz. `quizzes-bm.ts:302–304`
orders bat > dolphin > dog > horse by upper limit, which is correct.

### Overcoming hearing limits (§19)
Individual device descriptions are **correct**: they use *memperkuatkan* (amplify) and *menyalurkan*
(channel), and none claims to extend the biological frequency range. The failures are that the topic
is **absent from the notes entirely** (H-01), that **megafon is unsupported while pembesar suara is
omitted** (M-03), and that one mind-map node conflates amplification with the animal-range comparison
(M-02).

### Errata / page 232 (§20)
Confirmed: the errata lists **no factual correction for Chapter 10**, and flags the p.232 QR resource
among broken links. A direct scan of all eight live Chapter 10 files for `https?://`, `dosits`,
`bukutekskssm`, and `QR` returns **zero hits**. **AcadeMY exposes no broken QR code or dead URL to
learners.**

### Activities classification (§21)
All five are **suggested activities** — there is no Jadual 9 entry for Chapter 10 and no item labelled
*Eksperimen* in the chapter. Nothing in this audit describes any Chapter 10 activity as legally
compulsory, and no formal experiment card is demanded for them. The only reason activity content
matters here is H-06 and H-02, where a suggested activity carries an SP that is otherwise untaught.

---

## 8. QUIZ AUDIT (§22)

| Check | BM | DLP |
|---|---|---|
| Questions | 30 | 30 |
| Options per item | 4 everywhere | 4 everywhere |
| `answerIndex` in range | all valid | all valid |
| Duplicate options | none | none |
| Difficulty split | 10 Easy / 10 Medium / 10 Hard | identical |
| Answer-position histogram | **{0:12, 1:13, 2:4, 3:1}** | **{0:12, 1:13, 2:4, 3:1}** |
| Answer-index sequence | `032201012010001001012111111100` | identical |
| Id parity (positional) | exact | exact |

Keys themselves are valid and the two streams are in exact correspondence. The **distribution** is
the defect (H-04).

High-risk topics were checked individually: vacuum, speed-vs-loudness, amplitude-vs-frequency,
loudness-vs-pitch, Doppler approach/recede, echo, sonar, and hearing range are all present and
correctly keyed.

**Taught only in the quiz, not in the notes** (flagged as required):

| Topic | Notes | Decks |
|---|---|---|
| O.S.K. / C.R.O. interpretation | 0 | 5 |
| Animal hearing ranges | 0 | 9 |
| Hearing-limit devices | 0 | 12 |
| Speed vs air temperature | 0 | 3 |

---

## 9. FLASHCARD AND MIND-MAP AUDIT (§23)

- **Counts:** 60 flashcards and 154 mind-map nodes per stream — exact BM/DLP parity.
- **Scientific accuracy:** no invented animal values, no fabricated decibel or grid readings, no
  unsupported ultrasound application, correct amplification framing for the devices.
- **Contradiction with the live notes:** the decks are in places *more* complete than the notes
  (O.S.K., animal ranges, devices, piano). This is the inverse of the usual risk — the secondary
  surfaces carry curriculum the primary surface omits.
- **Terminology:** the BM decks inherit C-01 in full (`gegaran` 22, `kelaraban` 33, `kelantangan` 15,
  `merebak` 23 across the three deck files).
- **Source-number leakage:** 12 of the 18 H-03 instances live in the decks.
- **`gaung`** is used for reverberation in the mind map where the textbook uses it as a place (L-06).

The `Semak diri — 10.1 / 10.2 / 10.3` headings were adjudicated, not grandfathered: these are the
**textbook's own section numbers** (10.1, 10.2, 10.3 head printed pp. 224, 229, 232), the same
numbering a student sees in their book. They are not SK/SP codes and are **not** counted as leakage —
consistent with the ruling applied in Chapters 7–9.

---

## 10. INTERACTION AUDIT (§26)

Every control was driven with the full Radix pointer sequence
(`pointerdown → mousedown → pointerup → mouseup → click`).

| Control | Result |
|---|---|
| 3 section tabs | switch correctly |
| Reflection/absorption tabs (§1) | `active ↔ inactive` verified both directions |
| Amplitude slider | drives peak-to-peak 10→40→100 |
| Frequency slider | drives cycle count 2→3→5→8→10 |
| `checks` accordions ×3 | expand/collapse |
| Mini-quiz true/false | answer registers, feedback text appears |
| Mini-quiz MCQ (4 options) | answer registers, explanation appears |
| Reflection checkboxes ×3 | toggle a check icon on **and** back off |
| Back / Next | navigate; Back inert on §1 as expected |

A first automated pass flagged 9 controls as unchanged. Each was re-driven individually rather than
reported: one was an already-active tab, one was Back on the first section, three were reflection
checkboxes whose state lives in an injected `lucide-check` icon my first probe did not sample, and
four were mini-quiz options that lock after answering.

**0 genuinely inert learner controls.**

---

## 11. VISUAL AUDIT (§25)

There is exactly **one** instructional visual in the entire chapter — the wave visualizer — and it is
correct (§7, Frequency/Amplitude). No unrelated or reused visuals were found: the only other image is
the chapter hero (`ch10-gelombang-bunyi.png`) attached to the lightning-and-thunder blog highlight,
which matches textbook p.223's BLOG SAINS on exactly that topic.

The remaining eleven high-risk concepts have **no visual to audit**. That is finding H-05, and it
means the usual failure modes (reversed arrows, inverted wavefront spacing, wrong medium, missing
return path) are *absent by omission rather than by correctness*. Any remediation that adds these
figures must satisfy:

- **Doppler:** wavefronts compressed **in front of** the moving source, wider **behind**. Never inverted.
- **Echo:** source → hard surface → listener, with a distinct outgoing and returning arrow.
- **Sonar:** send **and** return; underwater, never through air or vacuum.
- **Bat echolocation:** sound must leave the bat and return after reflection.
- **Amplitude comparison:** frequency held visually constant.
- **Frequency comparison:** amplitude held visually constant.

---

## 12. BM / DLP PARITY (§27)

| Dimension | Result |
|---|---|
| Section count and order | 3 / 3, identical order — **PASS** |
| Section subject matter | identical — **PASS** |
| Visuals | identical (both zero) — **PASS** |
| Interaction functionality | identical, all live — **PASS** |
| Quiz count, indices, ids, difficulty | exact — **PASS** |
| Correct-answer semantics | equivalent — **PASS** |
| **Scientific terminology** | **FAIL** — DLP uses Echo / Pitch / Loudness / propagate correctly; BM uses *gegaran / kelaraban / kelantangan / merebak*. The correct BM terms appear **zero** times |

Structural parity is exact. **Semantic parity fails**, and it fails in one direction: the DLP stream
is materially more usable than the BM stream for the students who sit the BM paper.

---

## 13. LEAKAGE (§24)

Scanned all eight live Chapter 10 files for: `DSKP`, `SK 10.`, `SP 10.`, `Jadual 9`, `Aktiviti 10.`,
`Activity 10.`, `Eksperimen 10.`, `Experiment 10.`, `Rajah 10.`, `Figure 10.`, `Jadual 10.`,
`Table 10.`, `buku teks`, `textbook`, `mandatory`, `binding`, `audit`, `remediation`, raw URLs.

```
interactive-bm.ts    clean
interactive-dlp.ts   clean
quizzes-bm.ts        Aktiviti 10. x3
quizzes-dlp.ts       Activity 10. x3
flashcards-bm.ts     Aktiviti 10. x3
flashcards-dlp.ts    Activity 10. x3
mindmap-bm.ts        Aktiviti 10. x3
mindmap-dlp.ts       Activity 10. x3

LEAKAGE: 18   (expected 0)
```

The live interactive notes are clean. All 18 instances are in the three deck surfaces.

---

## 14. TESTS (§28)

| Gate | Result |
|---|---|
| `tsc --noEmit` | **PASS** — 0 errors |
| `npm run build` | **PASS** — worker, sitemap (37 URLs), PWA generated |
| Chapter 10 dedicated tests | **NONE EXIST** |
| Science Form 2 tests | **PASS** — 693/693 across 10 files |
| Leakage test | **PASS — but does not cover Chapter 10** (chapters 1–9 only) |
| Quiz integrity / parity | verified manually in this audit (no automated guard exists for Ch10) |
| Full suite | 2209 passed, **8 failed** |

### Pre-existing unrelated failures — disclosed separately

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
Chapter 8 and Chapter 9 gates. `npm run lint` remains repo-wide red for CRLF/LF reasons predating
this chapter and was not used as an audit signal.

---

## 15. RECOMMENDED REMEDIATION (priority order)

1. **C-01 — BM terminology remap** across `interactive-bm.ts`, `quizzes-bm.ts`, `flashcards-bm.ts`,
   `mindmap-bm.ts`: `gegaran→gema`, `kelaraban→kelangsingan`, `kelantangan→kenyaringan`,
   `merebak→merambat`, plus the section title and keyword list. Read each sentence; do not blind-replace.
2. **H-01 / H-02** — author the two missing SPs into the notes: hearing-limit devices (stetoskop,
   alat bantu pendengaran, pembesar suara — framed as faint/distant sound, never frequency range), and
   musical instruments (pluck harder → amplitude → loudness; tension → frequency → pitch, kept distinct).
3. **H-03** — de-reference all 18 activity numbers in the decks.
4. **H-06** — name the wave visualizer as the O.S.K. display and teach its two readings.
5. **H-04** — rebalance the quiz answer histogram toward 8/8/7/7, preserving answer text.
6. **H-05** — add the echo, sonar/echolocation, and hearing-range visuals under the §11 rules.
7. **H-07** — extend `learner-facing-leakage.test.ts` to chapter-10 and add a chapter-10 test file.
8. **M-01 / M-03 / M-02** — move Doppler into section 10.3; replace megafon with pembesar suara;
   split the conflated mind-map node.
9. **M-05 / M-04 / M-06 / M-08** — define amplitude from the equilibrium line; bring animal ranges into
   the notes; use O.S.K. in BM; add `role="img"` + `aria-label` to the waveform.
10. **Section architecture** — splitting three sections into roughly seven to nine would carry the two
    new SPs without producing a wall. The exact count is a design decision, not a requirement.

**Scope guardrails for whoever remediates:** Chapter 10 has **no** Jadual 9 entry and **no** textbook
experiment — do not manufacture either. Do not add crack detection, jewellery cleaning, or the angle
of incidence = angle of reflection law; none is Chapter 10 content. Do not state loudness ∝ amplitude
or pitch ∝ frequency as mathematical proportionality. Do not infer propagation speed from the
loudness activity. Do not revive `notes-bm.ts` / `notes-dlp.ts`.

---

# CHAPTER 10 VERDICT:
# FAIL — HUMAN REVIEW REQUIRED

```
CRITICAL: 1
HIGH:     7
MEDIUM:   8
LOW:      6

SP COVERAGE:
COVERED:       2
PARTIAL:       3
MISSING:       2
INCORRECT:     0
NOT_RENDERED:  0
CONFUSING:     2

JADUAL 9 CHAPTER 10:      NONE
TEXTBOOK EXPERIMENTS:     0

SOUND REQUIRES MEDIUM:        PASS
SOUND SPEED:                  PASS
REFLECTION/ABSORPTION:        PASS
FREQUENCY:                    PASS
AMPLITUDE:                    PASS  (definition missing — M-05)
PITCH:                        FAIL  (BM term invented — C-01; DLP passes)
LOUDNESS:                     FAIL  (BM term invented — C-01; DLP passes)
OSCILLOSCOPE:                 FAIL  (not taught — H-06)
MUSICAL INSTRUMENTS:          FAIL  (SP 10.2.4 missing — H-02)
ECHO:                         FAIL  (BM term invented; no diagram — C-01, H-05)
DOPPLER:                      PASS  (misplaced under SK 10.2 — M-01)
SONAR/SONOGRAM/ECHOLOCATION:  PASS
HUMAN HEARING RANGE:          PASS
HEARING-LIMIT SOLUTIONS:      FAIL  (SP 10.3.4 missing — H-01)
PAGE 232 ERRATA:              PASS  (no QR or URL exposed)
QUIZ KEYS:                    PASS  (valid and parity-exact; distribution fails — H-04)
INTERACTIONS:                 PASS  (0 inert)
BM/DLP PARITY:                FAIL  (structural PASS; semantic FAIL — C-01)

LEAKAGE: 18

TYPECHECK: PASS
BUILD:     PASS
TESTS:     Science F2 693/693 PASS; no Chapter 10 tests exist;
           8 pre-existing unrelated failures reported separately

ACADEMY CONTENT MODIFIED: NO
AUDIT ONLY: YES
```

---

## 16. WHAT THIS AUDIT DOES NOT CLAIM

- **No 100 % verification claim.** All 9 SPs, all 3 live sections per stream, 60 quiz items, 120
  flashcards, 308 mind-map nodes, and every rendered control were examined. Prose was not re-derived
  sentence-by-sentence against the textbook.
- **The DLP textbook was not supplied.** English strings were validated against the BM textbook by
  semantic equivalence, as in every prior chapter of this series.
- **The errata is self-disclaimed** as an unofficial mirror. Its p.232 QR flag is consistent with the
  textbook (which does print two links on that page), but no official KPM erratum was available.
- **NotebookLM contributed no evidence** to any conclusion here; nine of its claims were corrected
  in §2.
