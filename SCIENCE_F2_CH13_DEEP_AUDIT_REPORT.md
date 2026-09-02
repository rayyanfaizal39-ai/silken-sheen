# Science Form 2 — Chapter 13 (Meteoroid, Asteroid, Komet) — Deep Read-Only Audit

**Mode:** READ-ONLY. No project file was created, modified, deleted or committed.
**Date:** 2026-09-02
**Sources used:** `audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf` only.
No NotebookLM map, no outside astronomy, no web sources.

---

## 1. SOURCE TRUTH — reconstructed independently

### DSKP (printed p. 91, PDF p. 103)

**1 Standard Kandungan · 3 Standard Pembelajaran.**

| | Wording (verbatim) |
|---|---|
| **SK 13.1** | "Jasad lain dalam Sistem Suria iaitu meteoroid, asteroid dan komet" |
| **SP 13.1.1** | "Berkomunikasi tentang jasad lain dalam sistem suria iaitu meteoroid, asteroid dan komet." |
| **SP 13.1.2** | "Membincangkan pergerakan meteoroid, asteroid dan komet dan kesannya terhadap bumi berdasarkan data." |
| **SP 13.1.3** | "Menjana idea bagaimana mengurangkan atau mengelakkan kemungkinan berlakunya perlanggaran asteroid dengan Bumi." |

Catatan: 13.1.1 — multimedia presentation to "(a) Membandingkan dan membezakan antara
meteorid, asteroid dan komet, (b) Meramalkan keadaan Bumi jika berlaku perlanggaran…".
13.1.2 — observe meteors at night or visit a Planetarium. 13.1.3 — **"Meteorit diperkenalkan."**
Standard Prestasi (printed p. 92) is the generic 6-level scale.

### Textbook — printed pp. 268–278 (PDF 276–286)

| Printed | Content |
|---|---|
| 268 | Chapter opener, "Mari memahami" |
| 269 | BLOG SAINS — Hoba meteorite; Kata Kunci (Meteoroid, Meteor, Meteorit, Asteroid, Komet) |
| 270 | 13.1 opener; **Rajah 13.1** three definitions |
| 271 | Ciri-ciri of all three; **Gambar foto 13.1** asteroid belt; Sains boxes (Shoemaker-Levy 9 / 1994; Halley 1986 & 2061) |
| 272 | **Rajah 13.2** meteoroid movement (4 stages); **Aktiviti 13.1**; career box (Ahli petrologi) |
| 273 | **Rajah 13.3** asteroid movement (4 callouts); **Gambar foto 13.2** Arizona crater; **Gambar foto 13.3** dinosaurs; Sains boxes (Arizona 1.2 km / 50 000 yrs; Ahli paleontologi / 10 km) |
| 274 | **Rajah 13.4** comet movement (5 callouts); **Aktiviti 13.2** |
| 275 | Melindungi Bumi daripada Hentaman Asteroid; **Gambar foto 13.4**; **Aktiviti 13.3**; Latihan Formatif 13.1; Malaysiaku (ANGKASA) |
| 276 | Rumusan concept map |
| 277–278 | Refleksi Kendiri; Latihan Sumatif 13 (crossword + 5 questions) |

**Activities: 3** (13.1, 13.2, 13.3) — all multimedia/observation, none an experiment.
**Jadual 9 (DSKP printed p. 33): 3.4.1, 5.1.2, 5.2.2, 7.3.3, 8.2.5 — no Chapter 13 entry.
Mandatory experiments for this chapter: 0.**
**Errata: correction pages 53, 71, 151, 173; broken-QR pages 6, 53, 55, 59, 77, 78, 81, 84, 129,
218, 232. Nothing in 268–278 — no erratum applies to Chapter 13.**

### Key source values

meteoroid **10 μm – 1 m**, iron/nickel, from asteroid & comet fragments, ~0 °C, fastest **42 km s⁻¹** ·
asteroid **1 m – 1 000 km**, ~ **−73 °C**, avg **25 km s⁻¹**, belt **between Mars and Jupiter**, Ceres/Pallas/Juno/Vesta, "planet kecil" ·
comet head + tail, tail to **150 000 000 km**, head to **250 000 km**, elliptical orbit, **10–70 km s⁻¹**.

---

## 2. HIGH-RISK SCIENCE — each claim ruled on

| Claim | Verdict | Source |
|---|---|---|
| meteoroid → meteor → **pancuran meteor** → meteorit | **4 named stages**, not 3 | Rajah 13.2, p. 272 |
| asteroid belt between Mars and Jupiter | source-backed | p. 271, Gambar foto 13.1 |
| Apollo / Amor / Aten | **printed** | Rajah 13.3, p. 273 |
| asteroid impact & dinosaurs | source-backed, **hedged** — "Ahli paleontologi *mempercayai*… asteroid bersaiz 10 km" | p. 273; and p. 278 Q4(c)(ii) teaches the counter-evidence |
| comet structure (head + tail) | source-backed | p. 271 |
| comet orbit elliptical | source-backed | p. 271 |
| comet speed 10–70 km s⁻¹ | source-backed | pp. 271, 274 |
| comet tail points away from Sun | source-backed | p. 274 |
| solar wind ("tiupan **angin suria**") | **source-backed** | p. 274 |
| Kuiper belt / Oort cloud origin | source-backed — "**Kebanyakan** komet berasal dari lingkaran Kuiper dan awan Oort" | p. 274; assessed p. 277 crossword (d) |
| giant planets pull comets out of orbit | source-backed — source says "**planet luar**" (outer), not "gergasi" | p. 274 |
| asteroid collision prevention | source-backed — monitor, warn, destroy or deflect | p. 275 |
| **"meteors burn up entirely"** | **NOT source-backed.** Source: "*Kebiasaannya*, meteor akan habis terbakar… **Akan tetapi, ada juga meteor yang dapat sampai ke Bumi**" | p. 272 |
| **"<10 km localized destruction / larger = mass extinction"** | **NOT in the source.** Source has only "asteroid yang bersaiz besar boleh menyebabkan kemusnahan hidupan" and the 10 km dinosaur figure. **Correctly absent from the build.** | p. 273 |
| **"Keplerian velocity"** | **NOT in the source anywhere. Correctly absent from the build.** | — |
| career roles | **2 printed**: Ahli petrologi (p. 272), Ahli paleontologi (p. 273). Only paleontologi is shipped. | pp. 272–273 |

*Method note:* my first automated pass reported "angin suria" as absent from the textbook. That
was a false negative — the phrase is broken across a line as `angin \nsuria`. Re-checked directly;
**solar wind is source-backed** and the implementation explains it correctly.

---

## 3. VISUAL AUDIT

**Source figures: 8** — Rajah 13.1–13.4, Gambar foto 13.1–13.4, plus the Rumusan concept map
and the Latihan Sumatif crossword.

**Reconstructed in the product: 0.** Chapter 13 ships one decorative PNG
(`src/assets/science/form2/ch13-meteoroid-asteroid-komet.png`), used only as the
`blogHighlight` image. There is no chapter figure component —
[ScienceF2Chapter13NotesBlock.tsx:1](src/components/notes/ScienceF2Chapter13NotesBlock.tsx:1)
is a one-line re-export of the shared renderer, and `figure-copy.ts` has no Chapter 13 entries.

| Source figure | Product | Assessment |
|---|---|---|
| Rajah 13.1 three definitions | 3 `cards` | acceptable as text |
| Rajah 13.2 meteoroid → meteorit (4 stages) | `sequence`, 4 steps | structure preserved; **stage 1 and stage 3 are wrong — see H-01, M-01** |
| **Rajah 13.3 asteroid orbits crossing Earth's** | prose in one accordion | **no visual** |
| **Rajah 13.4 comet movement / tail vs Sun** | prose in one accordion | **no visual — this is the figure most needed**, since tail direction is the chapter's classic misconception and the mini-quiz tests it |
| Gambar foto 13.1 asteroid belt | none | absent |
| Gambar foto 13.2 Arizona crater | text only (quizzes/flashcards/mind map) | absent from notes |
| Gambar foto 13.3 dinosaurs | none | absent |
| Gambar foto 13.4 near-Earth asteroid | none | absent |

**Scientifically misleading:** the mind map replaces all three movement diagrams with a pointer —
`"Pergerakan Meteoroid (rujuk gambar rajah dalam buku teks)"` and two siblings
([mindmap-bm.ts:35](src/content/form2/science/chapter-13/mindmap-bm.ts:35),
[:56](src/content/form2/science/chapter-13/mindmap-bm.ts:56), and the comet node; same three in
`mindmap-dlp.ts`). For a learner inside the app that is a dead reference, and it is the surface
carrying SP 13.1.2.

---

## 4. IMPLEMENTATION AUDIT — render path

Registry: [registry.ts:3716](src/content/registry.ts:3716) (`science-f2-c13-bm`) and
[:3730](src/content/registry.ts:3730) (`science-f2-c13-dlp`). Both supply **`sciF2InteractiveData`
and `notes`**.

Render: [notes.tsx:2010](src/routes/notes.tsx:2010) tests `sciF2InteractiveData` first; Chapter 13
falls to the terminal `else` at [notes.tsx:2133](src/routes/notes.tsx:2133) →
`ScienceF2Chapter13NotesBlock` → the shared `ScienceF2InteractiveNotesBlock`. The
`activeChapter?.notes` branch at [notes.tsx:2150](src/routes/notes.tsx:2150) is **unreachable** for
this chapter.

**→ `notes-bm.ts` and `notes-dlp.ts` are dead/shadowed and were excluded from all counts.**

| Surface | BM | DLP | Parity |
|---|---|---|---|
| interactive sections | 1 | 1 | identical block keys |
| mind map | present | present | parallel |
| flashcards | 60 | 60 | **identical ids** |
| quizzes | 30 | 30 | **identical answerIndex and difficulty on all 30** |
| notes-*.ts | dead | dead | — |

**Source leakage: 0.** No `DSKP`, `Standard Pembelajaran/Kandungan`, `SP 13.x`, `SK 13.x`,
`Jadual 9`, `Aktiviti 13.x`, `Latihan Formatif/Sumatif`, or page citations in any active file.
No textbook or external URLs exposed (`bukutekskssm.my`, `neo.jpl.nasa.gov` both absent).
Video mapping `science-f2-c13` → `F5yEfVJvGCo` exists and is covered by
[educationalVideos.test.ts:64](src/data/educationalVideos.test.ts:64).

**Mobile/responsive: not browser-verified this pass.** `/notes` is auth-gated and the dev server
does not serve scratch harness pages, so no honest in-browser measurement was available in a
read-only run. Chapter 13 adds no chapter-specific layout — it uses the shared shell already
exercised by Chapters 3–12 — so the residual risk is low but **unmeasured**, and is not claimed
as a pass.

---

## 5. ASSESSMENT

```
Questions:            30 BM / 30 DLP
Options per question: 4 on all 30 (both decks)
Out-of-range keys:    0
Duplicate options:    0
Difficulty:           Easy 10 / Medium 10 / Hard 10  (both decks) — balanced
Answer positions:     A=19  B=8  C=3  D=0            (both decks) — see H-03
BM/DLP parity:        30/30 identical answerIndex and difficulty
Flashcards:           60/60, identical ids across languages
```

**Correct keys:** an automated key-vs-explanation check flagged `q30` in both decks; on
inspection the key (index 0) is **correct** — the flag was a false positive caused by the
distractor sharing the phrase "sistem suria" with the explanation. **Wrong keys from that
check: 0.** However `q4` is separately wrong on its *content* — see **C-01**.

**SP coverage of the quiz bank:** all 30 items sit under the single SK 13.1. Content spread is
weighted to 13.1.1 characteristics; movement (13.1.2) and prevention (13.1.3) are thinner, which
mirrors the notes.

---

## 6. TESTS

**There is no Chapter 13 regression test file.** Chapter 13 is the only Form 2 Science chapter
from 3 to 13 without one:

```
chapter-3, 4, 5, 6, 7, 8 (+ visual-refinement), 9, 10, 11, 12   ← have *-remediation.test.tsx
chapter-13                                                      ← none
```

Missing guards this chapter specifically needs:
1. **meteoroid size unit** — that the lower bound is micrometres, on every surface (would have caught C-01)
2. **cross-surface numeric agreement** — notes, quizzes, flashcards and mind map must not disagree on a shipped value
3. **meteoroid does not orbit the Sun** — the meteoroid/asteroid/comet movement distinction (H-01)
4. **hedged burn-up claim** — no unqualified "burns up completely" (H-02)
5. **answer-position distribution** — no option position unused across the bank (H-03)
6. **source terminology** — "pancuran meteor" not "hujan meteor" (M-01)
7. structural: 1 SK ⇒ every section numbered 13.1; 3 reflection items; BM/DLP id parity
8. source-leakage guard for `chapter-13/*` (the shared Form 2 leakage test already passes, but has no Ch13-specific case)

---

## FINDINGS

### CRITICAL

**C-01 · Meteoroid size shipped as "10 m – 1 m" instead of 10 μm – 1 m, and it is the keyed quiz answer**
Source (p. 271): "Mempunyai saiz yang berbeza-beza, iaitu antara **10 μm** hingga 1 m."

Wrong in **12 learner-facing places across 6 files**:
- [quizzes-bm.ts:63](src/content/form2/science/chapter-13/quizzes-bm.ts:63) — `q4` option A **and** [:65](src/content/form2/science/chapter-13/quizzes-bm.ts:65) its explanation; [:99](src/content/form2/science/chapter-13/quizzes-bm.ts:99) `q7` distractor
- `quizzes-dlp.ts` — same three
- [flashcards-bm.ts](src/content/form2/science/chapter-13/flashcards-bm.ts) — 3 cards; `flashcards-dlp.ts` — 3 cards
- [mindmap-bm.ts:28](src/content/form2/science/chapter-13/mindmap-bm.ts:28) and `mindmap-dlp.ts` — 1 node each

Only `interactive-bm.ts` / `interactive-dlp.ts` carry the correct `10 μm`.

Three separate problems compound here:
1. **The value is wrong by a factor of 10⁷.**
2. **The range is nonsensical** — "from 10 m to 1 m" descends; a learner cannot read it as a range at all.
3. **`q4` keys it as the correct answer** ("Berapakah julat saiz meteoroid?" → `answerIndex: 0` → "10 m hingga 1 m"), with the explanation repeating it. A student who learned 10 μm from the chapter's own notes is **marked wrong by the chapter's own quiz.**

### HIGH

**H-01 · The notes say a meteoroid orbits the Sun — the opposite of the chapter's core distinction**
[interactive-bm.ts:51](src/content/form2/science/chapter-13/interactive-bm.ts:51) /
[interactive-dlp.ts:51](src/content/form2/science/chapter-13/interactive-dlp.ts:51), sequence step 1:
"…terapung bebas di angkasa lepas, **mengorbit Matahari**" / "floats freely in space, **orbiting the Sun**".
Rajah 13.1 (p. 270) defines meteoroid as "terapung dan bergerak di angkasa" with **no orbit**, and
reserves "beredar/bergerak mengelilingi Matahari mengikut orbitnya sendiri" for asteroid and comet.
Page 272 is explicit: "Asteroid dan komet bergerak melalui orbitnya sendiri mengelilingi Matahari.
**Meteoroid pula bergerak secara bebas di angkasa**". This is the exact discrimination SP 13.1.1
exists to teach, and it also contradicts the chapter's own meteoroid card two blocks above.

**H-02 · "Meteors burn up completely" stated without the source's qualifier, contradicting the same section**
[interactive-bm.ts:59](src/content/form2/science/chapter-13/interactive-bm.ts:59) /
[interactive-dlp.ts:59](src/content/form2/science/chapter-13/interactive-dlp.ts:59), `checks` hint:
"meteor terbakar **sepenuhnya** di atmosfera" / "meteors burn up **completely** in the atmosphere".
Source p. 272 hedges: "*Kebiasaannya*… **Akan tetapi, ada juga meteor yang dapat sampai ke Bumi**."
Step 4 of the same sequence gets this right ("Kebanyakan…" / "Most…"), so the chapter contradicts
itself, and the unhedged version is the one attached to the answer of a comprehension check whose
whole point is that meteorites *do* reach the ground.

**H-03 · Quiz answer key never uses option D, and uses A in 19 of 30**
Distribution **A=19, B=8, C=3, D=0**, identical in both decks. Always guessing A scores **63%**.
For comparison, the audited Chapter 12 bank is 8/8/7/7. This invalidates the bank as a measure of
knowledge and will corrupt the quiz-history signal feeding the AcadeMY Brain.

**H-04 · No figure reconstruction; the mind map defers the movement standard to the printed book**
Zero of the 8 source figures are reconstructed (§3). Rajah 13.3 and Rajah 13.4 exist only as prose.
The mind map carries `"(rujuk gambar rajah dalam buku teks)"` / `"(see diagram in textbook)"` on
three nodes per language — six dead pointers. SP 13.1.2 ("pergerakan… berdasarkan data") is the
standard most weakened. The renderer already supports blocks that would fit
(`comparisonMatrix`, `conceptContrast`, `sequence`) and none are used beyond the one sequence.

**H-05 · No Chapter 13 regression tests at all**
The only F2 Science chapter 3–13 with no test file (§6). Every defect in this report is currently
unguarded, including C-01.

### MEDIUM

**M-01 · "Hujan meteor" is not the source's term; "pancuran meteor" appears nowhere**
[interactive-bm.ts:53](src/content/form2/science/chapter-13/interactive-bm.ts:53) uses "Hujan meteor".
The textbook labels the stage **PANCURAN METEOR** in Rajah 13.2 and titles its video
"Video Pancuran Meteor" (p. 274). "pancuran meteor" occurs **0 times** in the product; "hujan meteor"
occurs once. DLP is fine ("Meteor shower").

**M-02 · The meteor-shower stage exists on only one surface**
It appears solely in the interactive sequence — **absent from quizzes, flashcards and the mind map**
in both languages — despite being one of the four named stages of Rajah 13.2.

**M-03 · The dinosaur claim is stated more confidently than the source, with added evidence**
[interactive-bm.ts:44](src/content/form2/science/chapter-13/interactive-bm.ts:44) /
[interactive-dlp.ts:44](src/content/form2/science/chapter-13/interactive-dlp.ts:44) add
"bukti dijumpai dalam lapisan batuan di seluruh dunia" / "evidence found in rock layers worldwide
points to a massive collision" — **not in the source**. The textbook attributes the belief to
paleontologists ("mempercayai") and then, in Latihan Sumatif 13 Q4(c)(ii) (p. 278), explicitly asks
students to justify scientists who *disagree*, citing species that died out 20 million years earlier.
The product removes the contest the source deliberately sets up.

**M-04 · Kuiper belt and Oort cloud are advertised but never taught in the notes**
Both are `keywords` chips in `interactive-bm/dlp.ts:11`, and both appear in quizzes, flashcards and
the mind map — but neither is explained anywhere in the notes body. Source p. 274 states the origin
and the textbook assesses it (crossword clue (d), p. 277).

**M-05 · Comet head size missing from the notes**
250 000 km (p. 271) is in quizzes, flashcards and the mind map but not in the comet card, which
gives only the tail length.

**M-06 · One section for three SPs, against the pattern of every sibling chapter**
Chapter 13 ships **1** interactive section; Chapter 8 has 11, Chapter 12 has 5, Chapter 11 has 4.
Numbering "13.1" is correct (there is only one SK), but three SPs share one scroll with no
structural separation, and DSKP 13.1.1's Catatan explicitly calls for "**Membandingkan dan
membezakan**" — for which the renderer's `comparisonMatrix` block exists and is unused.

**M-07 · "planet gergasi" where the source says "planet luar"**
[interactive-bm.ts:44](src/content/form2/science/chapter-13/interactive-bm.ts:44) — source p. 274 is
"Tarikan graviti **planet luar** yang kuat". Outer and giant coincide here, so the science is not
wrong, but the term a student will meet in an exam is the source's.

### LOW

**L-01 · "Ahli petrologi" (p. 272) is shipped nowhere.** The chapter's other career, paleontologi, is present.

**L-02 · `notes-bm.ts` / `notes-dlp.ts` are dead.** The registry supplies both `notes` and
`sciF2InteractiveData`; the interactive branch wins. ~8 KB per language of unreachable content that
will drift.

**L-03 · Meteoroid temperature labelled "suhu permukaan"** in the notes and mind map; source p. 271
says "Suhu meteoroid **di angkasa lepas**" without "permukaan". (For asteroid, "suhu permukaan" *is*
the source's wording.)

**L-04 · Source colour absent from the notes** — Halley (1986/2061) and Shoemaker-Levy 9 (1994) are
in quizzes/flashcards only; the Arizona crater is not in the notes; the p. 273 prompt about why the
Moon is cratered more than Earth is unrepresented.

---

## DSKP COVERAGE

| SP | Status | Basis |
|---|---|---|
| **13.1.1** Berkomunikasi tentang meteoroid, asteroid dan komet | **COVERED** | 3 cards with full characteristics + flashcards + quizzes. *But* the size value is wrong (C-01), the meteoroid movement claim is wrong (H-01), and the Catatan's structured "membandingkan dan membezakan" has no dedicated surface (M-06). |
| **13.1.2** Pergerakan dan kesannya terhadap Bumi berdasarkan data | **PARTIAL** | Asteroid orbit-crossing and comet behaviour are covered in accordions and the speed data is present, but the meteoroid movement statement is wrong (H-01), all three movement figures are unreconstructed, and the mind map defers to the printed book (H-04). |
| **13.1.3** Menjana idea mengurangkan/mengelakkan perlanggaran | **COVERED** | "Memerhati langit" accordion matches p. 275 (monitor → warn → deflect or destroy). "Meteorit diperkenalkan" satisfied by the sequence. |

**COVERED 2/3 = 67 % · PARTIAL 1/3 = 33 % · MISSING 0/3 = 0 %**

Partial/missing items: **SP 13.1.2** (movement — figures absent, meteoroid movement misstated,
mind map points outside the product). Content in the source but on no learner surface:
**pancuran meteor as a named stage** (concept present once under a non-source name),
**Ahli petrologi**, and all 8 figures.

---

## VERIFIED CLEAN

- Source leakage: **0** across all active files; no textbook or external URLs exposed
- Quiz keys in range: **30/30**; 4 options each; no duplicate options; **0 wrong keys** from the key-vs-explanation check
- Difficulty balance: **10 / 10 / 10**
- BM ↔ DLP parity: 30/30 quizzes with identical keys and difficulty; 60/60 flashcards with identical ids
- Mandatory experiments: **0 required, 0 shipped** — correct against Jadual 9
- Errata: no Chapter 13 item — correctly not applied
- **"Keplerian velocity": not in the source and not in the build** — NotebookLM fabrication, correctly absent
- **"<10 km localized destruction / larger mass extinction": not in the source and not in the build** — correctly absent
- Apollo / Amor / Aten: printed on p. 273 and correctly shipped
- Solar wind, comet tail direction, Kuiper/Oort origin, outer-planet perturbation, dinosaur 10 km: all source-backed and shipped
- Video mapping present and test-covered

---

## FINAL

# FAIL — HUMAN REVIEW REQUIRED

**C-01 alone is a release blocker:** the chapter ships a meteoroid size that is wrong by seven
orders of magnitude, expressed as an impossible descending range, in 12 learner-facing places —
and keys it as the correct answer in `q4` of both quiz banks, so the assessment marks a correct
student wrong and the chapter contradicts itself between notes and quiz.

Compounding: two further science errors that invert or overstate what the source says (H-01, H-02),
an assessment bank where one option is never the answer and A is the answer 19 times in 30 (H-03),
no reconstruction of any of the 8 source figures with the mind map pointing learners at the printed
book instead (H-04), and no regression tests to hold any of it (H-05).

**Human review is specifically required on:**
1. **C-01** — confirm the corrected range is 10 μm – 1 m on all six files, and re-key `q4`.
2. **H-03** — rebalancing answer positions changes 30 stored keys; decide whether existing
   quiz-history rows for Chapter 13 need invalidating in the AcadeMY Brain.
3. **M-03** — decide whether the chapter should reproduce the source's hedge *and* the counter-argument
   the textbook raises in Latihan Sumatif 13 Q4(c)(ii), or simply drop the unsourced evidence claim.
4. **Mobile/responsive** was not browser-verified (auth-gated route, no harness in a read-only run)
   and is not claimed as passing.

**No 100 % verification claim is made.** All 3 Standard Pembelajaran are mapped explicitly above,
and no project file was modified.
