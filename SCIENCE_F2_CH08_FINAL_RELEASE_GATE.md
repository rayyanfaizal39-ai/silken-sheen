# Science Form 2 — Chapter 8 (Daya dan Gerakan / Force and Motion)
# FINAL INDEPENDENT RELEASE GATE

**Mode:** READ-ONLY. No project file was modified, created, deleted, or formatted.
This report is the only file written.

**Read-only proof.** MD5 hashes of all 23 Chapter 8 content, component and test files
were captured before this pass and re-verified after it: **0 changed**.

**Method.** The remediation changelog was not treated as evidence. Every claim below
was re-derived from the live registry-mounted chapter rendered in a browser, geometry
measured from the rendered SVGs, modules loaded from the dev server, `git show HEAD`
diffs, or the authoritative PDFs. Where a probe disagreed with the product, the probe
was re-examined before the product was blamed.

---

## 1. Live path and structure

| Step | Evidence |
|---|---|
| Registry | `registry.ts:3566` `science-f2-c8-bm`, `:3580` `science-f2-c8-dlp` |
| Data | both carry `sciF2InteractiveData` (chapter `8`, 11 sections) |
| Route | `notes.tsx:1999` interactive branch → `:2066` `chapter === 8` |
| Component | `ScienceF2Chapter8NotesBlock.tsx` re-exports `ScienceF2InteractiveNotesBlock` |
| Language | `:2070` `lang={scienceLang === "dlp" ? "en" : "bm"}` — DLP receives `"en"` |

**Dead notes remain non-rendered and untouched.** Both entries still register
`notes: scienceF2C8NotesBM / DLP` (`registry.ts:3574`, `:3588`), but that branch sits at
`notes.tsx:2141`, after the interactive branch in the same `? :` chain. `git status`
shows `notes-bm.ts` and `notes-dlp.ts` **absent from the modified list** — 0 changes.
No credit is given to them anywhere in this gate.

**Structure**, walked live in both streams:

| | BM | DLP |
|---|---|---|
| Sections | 11 | 11 |
| Subtopic order | `8.1 ×3, 8.2 ×8` | identical |
| Rendered chars, one section | ~1,826 | ~1,740 |
| Back button | all 11 sections | all 11 |
| Next button | sections 1–10 | 1–10 |

Section 11 has no "Next" because it is the last — correct, not a defect. One section
renders at a time; **no content wall**. Titles map 1:1 across languages (Jenis-jenis
Daya / Types of Forces … Tekanan Cecair / Liquid Pressure). No duplicated teaching was
found across sections.

---

## 2. SP coverage

Each SP was checked element-by-element against the captured learner text of both
streams (49 sub-elements per language), not by keyword presence alone.

| SP | Elements verified | Status |
|---|---|---|
| 8.1.1 | graviti · berat · normal · geseran · kenyal · apungan | **COVERED** |
| 8.1.2 | magnitud · arah · **titik aplikasi** + force-arrow figure | **COVERED** |
| 8.1.3 | **neraca spring** · newton · 100 g → 1 N · 1 kg → 10 N | **COVERED** |
| 8.1.4 | table · floating · trolley-on-trolley | **COVERED** |
| 8.2.1 | all five effects named | **COVERED** |
| 8.2.2 | berat sebenar · berat ketara · ketumpatan · Plimsoll | **COVERED** |
| 8.2.3 | fulkrum · 3 classes · `Beban × jarak = Daya × jarak` | **COVERED** |
| 8.2.4 | momen daya · **jarak tegak** · N m · pintu · sepana | **COVERED** |
| 8.2.5 | tekanan · Pa · N m⁻² · plastisin · HIPOTESIS · KAEDAH | **COVERED** |
| 8.2.6 | teori kinetik · isi padu · suhu · berlanggar | **COVERED** |
| 8.2.7 | tekanan atmosfera · tekanan udara · altitud · Magdeburg · sifon | **COVERED** |
| 8.2.8 | kedalaman · empangan · kapal selam | **COVERED** |

```
COVERED 12 | PARTIAL 0 | MISSING 0 | INCORRECT 0 | NOT_RENDERED 0 | CONFUSING 0
```

---

## 3. Page-173 errata

Re-read directly from `Errata.pdf`:

> "173 | Bab 8 - Daya dan Gerakan | The errata explicitly states that the box concerning
> **Hukum Newton Ketiga** is cancelled/removed. Treat that boxed material as withdrawn;
> **do not generalise this instruction beyond the item explicitly identified**."

| Check | Result |
|---|---|
| Cancelled box absent — interactive BM/DLP | **0 occurrences** |
| Cancelled box absent — quizzes, flashcards, mind map (6 decks) | **0 occurrences each** |
| Situation 1, book on table | present, both languages |
| Situation 2, body floating on water | present, both languages |
| Situation 3, two trolleys | present, both languages |

**No over-removal.** SP 8.1.4 is taught in full. The trolley situation now reads
*"Troli pertama mengenakan daya kenyal pada troli kedua… troli kedua mengenakan daya
yang sama magnitud tetapi bertentangan arah"* — trolley-on-trolley, matching textbook
p.174, not the earlier spring-pushes-both framing.

**PAGE 173 ERRATA: PASS.**

---

## 4. Force diagram

Measured from the rendered SVG, screen coordinates.

| | Box example | Nail example |
|---|---|---|
| Transform | `translate(96 96) rotate(0)` | `translate(214 104) rotate(-90)` |
| Direction vector | dx **+47.1**, dy 0 → points right | dx 0, dy **−70.7** → points up |
| Arrow length (user units) | 52 | **78** |
| Stated magnitude | 10 N | 15 N |
| Tail sits on the point-of-application dot | ✔ | ✔ |

The nail is pulled **upward** out of the wood and the box is pushed **right** — both
directions correct. **Arrow length tracks magnitude**: 15 N draws longer than 10 N, so
a larger force is never drawn shorter.

BM uses **titik aplikasi** and **neraca spring** throughout (§15).

**FORCE DIAGRAM: PASS.**

---

## 5. Buoyancy

**Cross-surface consistency**, checked on all six decks plus both interactive files:

| Check | Result |
|---|---|
| Unqualified "floating means F > W" | **0 occurrences on any surface** |
| `F = W` for floating at rest | present, both languages |
| `F = W₁ − W₂` (berat sebenar − berat ketara) | present in the **notes**, both languages |
| Real weight / apparent weight named | ✔ |
| Spring-balance method | ✔ schematic with 10 N / 6 N / 4 N readings |
| Density relationship | ✔ cork 0.24, iron 7.9, gold 19.3 — match textbook Jadual 8.1 |
| Plimsoll Line | ✔ both languages, with TF/F/T/S/W/WNA |

**Visual measured from the rendered SVG:**

```
floating : arrows [46 up, 46 down]   -> EQUAL
sinking  : arrows [26 up, 52 down]   -> weight exceeds buoyant force
```

The floating view draws the two arrows at identical length; only sinking draws them
unequal. The former contradiction between notes (F = W) and flashcards/quiz (F > W) is
resolved in favour of the equilibrium statement, which matches textbook p.177.

**BUOYANCY: PASS.**

---

## 6. Levers

Rendered label order, left to right along the bar:

| Class | Rendered order | Middle component |
|---|---|---|
| Kelas pertama | Beban < **Fulkrum** < Daya | fulcrum ✔ |
| Kelas kedua | Fulkrum < **Beban** < Daya | load ✔ |
| Kelas ketiga | Fulkrum < **Daya** < Beban | effort ✔ |

All three match textbook p.182. Examples match the source sets (gunting/playar/pembuka
tin · kereta sorong/pemecah kekeras · penyepit ais/joran/forseps).

**Formula is taught in the notes, before any assessment:**

```
Beban (N) × Jarak beban dari fulkrum (m) = Daya (N) × Jarak daya dari fulkrum (m)
```

Word-for-word the source's wording (textbook p.186). The worked example computes
`400 N × 0.5 m = Daya × 2 m → Daya = 100 N`; the arithmetic was independently
recomputed and is correct. It uses fresh numbers rather than reusing the textbook's two
examples, which the quiz already carries — so the worked example does not give the quiz
away.

**LEVERS: PASS.**

---

## 7. Moment of force

| View | Force transform | Perpendicular distance drawn | Handle drawn |
|---|---|---|---|
| Membuka pintu | `rotate(90)` (straight down) | 150 | — |
| Melonggarkan nat | `rotate(90)` | 150 | — |
| **Daya serong** | `rotate(45)` | **106.1** | **150** |

In the angled case the perpendicular distance is drawn **shorter than the handle**, and
150 × cos 45° = 106.07 — the drawn value is exact. The figure therefore does **not**
use full handle length where perpendicular distance is required, which is the specific
failure §7 rules out.

Formula: `Momen daya = Daya (N) × Jarak tegak dari pangsi ke daya (m)`, matching
textbook p.184. Unit `N m` carried on the calculator result. Both the door and spanner
applications named by the DSKP are present.

**MOMENT: PASS.**

---

## 8. Mandatory investigation (SP 8.2.5)

Rendered learner output, both streams:

| Element | BM | DLP |
|---|---|---|
| Aim | TUJUAN ✔ | AIM ✔ |
| Problem statement | ✔ | ✔ |
| Hypothesis | HIPOTESIS ✔ | HYPOTHESIS ✔ |
| Manipulated | **Luas permukaan** | **Surface area** |
| Responding | **Kedalaman lekuk pada plastisin** | **Depth of the indentation** |
| Controlled | **Blok logam berjisim sama, daya sama** | **Same mass, same force** |
| Materials | Blok logam, plastisin | Metal blocks, plasticine |
| Apparatus | Kaki retort dan pengapit, pembaris meter, tali | Retort stand and clamp, metre rule, string |
| Procedure | 5 steps | 5 steps |
| Observation | ✔ | ✔ |
| Conclusion | ✔ | ✔ |

All ten elements present in both languages, and the variables match textbook p.188
exactly.

**Relationship taught:** smaller area → greater pressure → **deeper** indentation;
larger area → lower pressure → **shallower**. The apparatus figure draws this too —
block widths `[21.7, 62]` against indentation depths `[16.0, 5.6]`, so the smaller
contact area leaves the deeper mark.

| Prohibition | Result |
|---|---|
| Invented numerical indentation results | **none** — no cm/mm figure appears |
| Invented "fixed height" | **absent** — no *ketinggian tetap* / *fixed height* |
| "Experiment 8.2" / "SP 8.2.5" / "Jadual 9" learner-facing | **0 occurrences** |

**MANDATORY EXPERIMENT 8.2.5: PASS.**

---

## 9. Pressure

`P = F / A` present, with **both** units — pascal (Pa) and **N m⁻²** — in both
languages. Applications cover the source set: thin axe blade, ice-skate blade, football
studs (high pressure); broad tractor tyres, elephant foot (low pressure).

Calculator behaviour is covered in §13.

**PRESSURE: PASS.**

---

## 10. Gas pressure

Kinetic account present: molecules move randomly, collide with the container walls, and
that force per unit area is the pressure. Both DSKP factors taught — smaller volume →
more frequent collisions → higher pressure; higher temperature → faster, more forceful
collisions → higher pressure.

**Particle count measured in the rendered figure:**

```
Keadaan asal      : 14 particles
Isi padu dikurangkan : 14 particles
Suhu dinaikkan    : 14 particles
```

The number is **unchanged** across all three states — only the container width or the
motion streaks change. The figure cannot teach that compressing a gas creates
molecules.

**GAS PRESSURE: PASS.**

---

## 11. Atmospheric pressure — source adjudication

**The source is internally inconsistent, and this gate confirms it independently.**

Textbook printed p.196 (PDF 203), prose:

> "Tekanan atmosfera menurun apabila altitud semakin meningkat. **Hal ini disebabkan
> oleh tarikan graviti.** … Pada altitud yang tinggi, molekul-molekul udara **kurang
> dipengaruhi oleh tarikan graviti**…"

The **same page**, Rajah 8.46 caption:

> "**Kurang molekul udara** memberi tekanan ke atas orang ini apabila berada di atas
> gunung. **Lebih banyak molekul udara** … apabila berada di bawah gunung."

The prose is physically loose: gravity is essentially unchanged over the height of the
atmosphere (about 0.3 % weaker at 10 km), so "less influenced by gravity at altitude"
is not the mechanism. The caption is correct: what changes is how much air lies above
you. The remediation's report of this inconsistency is **accurate** — I verified both
passages directly rather than accepting the claim.

**What the learner is now taught**, verified in both streams:

| Check | Result |
|---|---|
| Any "weaker gravity" explanation | **0 occurrences**, both languages |
| Less-air-above / weight-of-air-column framing | present, both languages |
| Reinforced by a figure | ✔ altitude figure: 48 molecules, **12 above** the midline vs **36 below** — air visibly thinner with height |
| *tekanan udara* vs *tekanan atmosfera* distinction | taught explicitly |

The chapter follows the correct half of its own source. This is the right call: a
gate should not pass a misleading explanation merely because one textbook sentence
states it, and here the correction is itself source-backed by the figure caption on the
same page. **Documented for the curriculum lead**, since the defect originates upstream
in the textbook and will recur in any other product built from that page.

**All six required applications present, both languages:**
Magdeburg hemispheres · pam sedut / sink plunger · drinking straw · siphon · syringe ·
vacuum cleaner.

**Straw explanation is correct** — outside atmospheric pressure pushes the drink up;
the "the straw sucks the liquid up" misconception is **absent**, and the BM text states
explicitly *"Bukan penyedut itu yang 'menyedut' air naik."*

**ATMOSPHERIC PRESSURE: PASS.**

---

## 12. Liquid pressure

Depth → pressure relationship present, with both DSKP applications (dam wall thicker at
the base, submarine hull).

**Jets measured in the rendered figure:**

```
hole y =  56  -> jet reach 23.0
hole y =  88  -> jet reach 59.8
hole y = 120  -> jet reach 96.6
```

Monotonic: the deeper the hole, the farther the jet. The relationship cannot be drawn
backwards because reach is computed from depth.

**LIQUID PRESSURE: PASS.**

---

## 13. Calculators

Driven through the real inputs in the live chapter, both streams.

| Input | BM | DLP |
|---|---|---|
| Moment 50 N × 0.2 m | `Momen daya = 10.00 N m` | `Moment of force = 10.00 N m` |
| Moment 0 N × 0.2 m | `Momen daya = 0.00 N m` | `Moment of force = 0.00 N m` |
| Moment 1e200 × 1e200 | `Nilai itu terlalu besar untuk dikira di sini.` | `Those values are too large to calculate here.` |
| Moment 1e400 (non-finite) | `— N m` | `— N m` |
| Pressure 10 N ÷ 0.01 m² | `Tekanan = 1000.00 Pa` | `Pressure = 1000.00 Pa` |
| Pressure area = 0 | `Luas permukaan mesti lebih besar daripada 0 m².` | `Surface area must be greater than 0 m².` |
| Pressure area = −0 | same message | same message |
| Pressure area = 1e400 | `— Pa` | `— Pa` |
| Pressure 20 N ÷ 0.5 m² | `Tekanan = 40.00 Pa` | `Pressure = 40.00 Pa` |
| Restore | `Tekanan = 1000.00 Pa` | `Pressure = 1000.00 Pa` |

Zero is correctly still **valid for multiplication** (`0 N × 0.2 m = 0.00 N m`) and
rejected only where it is a denominator.

**CALCULATORS: PASS. LEARNER-FACING Infinity/NaN: 0.**

---

## 14. Quizzes

| | BM | DLP |
|---|---|---|
| Questions | 30 | 30 |
| Easy / Medium / Hard | 10 / 10 / 10 | 10 / 10 / 10 |
| Options each | 4 | 4 |
| Out-of-range `answerIndex` | **0** | **0** |
| Duplicate ids | 0 | 0 |
| Missing explanations | 0 | 0 |
| **Answer positions A/B/C/D** | **8 / 8 / 7 / 7** | **8 / 8 / 7 / 7** |
| answerIndex parity | exact | |
| difficulty parity | exact | |
| id alignment | exact | |

**Did the reorder preserve the science?** Compared against `git show HEAD` question by
question:

```
BM : answer text preserved 25/30 | key moved to a different statement: 0 | option text edited: 5
DLP: answer text preserved 29/30 | key moved to a different statement: 0 | option text edited: 1
```

**0 keys point to a different statement** in either language. All six text edits were
inspected and are the intended fixes, not meaning changes:

| Q | Edit |
|---|---|
| BM Q3 | option + explanation "Penimbang spring" → **"Neraca spring"** |
| BM Q18 | option + explanation "Jarak berserenjang…" → **"Jarak tegak dari pangsi ke daya"** |
| BM Q19 | *distractor* "Magnitud, arah, titik tindakan" → **"titik aplikasi"**; key unchanged, moved index 0 → 2 |
| BM Q20 | same class of distractor terminology fix; key unchanged |
| BM/DLP Q28 | altitude option + explanation replaced (§11) |

Calculation keys re-verified arithmetically: 1 kg → 10 N; 50 × 0.2 = 10 N m;
200 d = 300 × 2 → d = 3 m; 1000 × 0.5 = E × 2 → E = 250 N; elephant large area → low
pressure.

**QUIZ ANSWER KEYS: PASS. QUIZ POSITION BALANCE: PASS.**

---

## 15. Terminology

| Obsolete term | Occurrences on live BM surfaces |
|---|---|
| titik tindakan | **0** |
| penimbang spring | **0** |
| tukul kebawa | **0** |
| bola Magdeburg | **0** |
| jarak berserenjang (as a noun phrase) | **0** |

All five required source terms present: **titik aplikasi · neraca spring · pam sedut ·
hemisfera Magdeburg · jarak tegak**.

The adjective *berserenjang* ("perpendicular **to**") survives where the source uses it
— e.g. "arah daya berserenjang dengan permukaan", matching textbook p.187. That is
correct usage, not a leftover.

---

## 16. Learner-facing leakage

All 11 sections walked in both streams with every control clicked, yielding **280,243
chars (BM)** and **271,974 chars (DLP)** of learner-visible text. All 20 patterns run
against that text, and separately against the six assessment decks.

```
DSKP · SK n · SP n · Jadual 9 · Eksperimen 8.x · Experiment 8.x · Aktiviti 8.x ·
Activity 8.x · Rajah 8.x · Figure 8.x · Jadual 8.x · Table 8.x · buku teks ·
according to textbook · audit · binding · mandatory · reviewer · remediation · 8.n.n

interactive BM: 0    interactive DLP: 0
quizzes: 0   flashcards: 0   mind map: 0   (both languages)
```

The former `Aktiviti 8.1` / `Activity 8.1` mind-map node is gone; its four child
concepts were kept.

*Adjudicated, not counted:* the headings "Semak diri — 8.1 / 8.2". As established for
Chapter 7, these are the textbook's own learner-facing subtopic numbers — **8.1 Daya**
and **8.2 Kesan Daya** are printed section headings in the student's book. No
three-part SP code appears anywhere.

**LEAKAGE: 0.**

---

## 17. Visuals

Eight instructional figures, 8 per stream, each measured rather than eyeballed.

| # | Figure | Verified property |
|---|---|---|
| 1 | Force diagram | arrow length ∝ magnitude (78 vs 52); directions right / up; tails on the application dots |
| 2 | Buoyancy | floating arrows equal (46/46); sinking unequal (26/52) |
| 3 | Lever classes | middle component correct for all three classes |
| 4 | Moment | angled perpendicular distance 106.1 < handle 150, exactly 150·cos45° |
| 5 | Pressure apparatus | smaller block (21.7) → deeper mark (16.0); larger (62) → shallower (5.6) |
| 6 | Gas particles | 14 / 14 / 14 — count constant across states |
| 7 | Altitude | 12 molecules above the midline vs 36 below — air thinner with height |
| 8 | Depth | jet reach 23.0 / 59.8 / 96.6 — monotonic with depth |

No figure contradicts its own prose; each caption was read against the measured
geometry. All 8 carry the shared "✨ Interaktif / Tekan konsep untuk meneroka" badge
(DLP: "Interactive / Tap a concept to explore"). Static content — flip cards,
accordions, cards — correctly carries no badge.

---

## 18. Interactions

97 controls per stream, **exact parity** section by section
(`8,4,5,7,9,12,5,8,5,10,24`), as are the per-section SVG counts.

A sequential probe flagged 16 controls. Each was re-tested in isolation on a fresh
mount, and **all 16 are probe artefacts**:

| Count | Controls | Verified |
|---|---|---|
| 6 | "Menolak kotak", "Mengukur daya apungan", "Tuas kelas pertama", "Membuka pintu", "Luas permukaan", "Keadaan asal" | all `aria-pressed="true"` — clicking the already-selected option is a no-op **by design** |
| 3 | matcher options (Kelas kedua, Kelas ketiga, Kereta sorong) | each responds on a fresh mount; the matcher locks once a pair is made |
| 7 | mini-quiz options | each produces feedback on first click — e.g. the buoyancy option returns *"Objek yang terapung berada dalam keseimbangan, jadi daya apungan ke atas sama magnitud den…"* — then the quiz correctly locks |

**0 genuinely inert controls.** Calculators, matcher, experiment tabs and every diagram
control respond.

**INTERACTIONS: PASS.**

---

## 19. BM/DLP parity

| Dimension | Result |
|---|---|
| Sections | 11 / 11, same order and subtopic numbers |
| Controls per section | identical |
| SVG figures per section | identical |
| Formulas, values, units | identical (`P = F/A`, moment, lever rule, 10 N m, 1000 Pa, 40 Pa) |
| Experiment | identical structure, variables, procedure length |
| Diagram geometry | identical measurements in both streams |
| Quizzes | 30 / 30, answerIndex + difficulty + id parity exact |
| Flashcards | 60 / 60 |
| Mind map | 126 / 126, ids unique and **byte-identical** across languages |

**BM/DLP PARITY: PASS.**

---

## 20. Tests and mobile

```
TYPECHECK              PASS   tsc --noEmit, exit 0
BUILD                  PASS   npm run build, exit 0
CHAPTER 8 TESTS        PASS   109 / 109
SCIENCE F2 TESTS       PASS   602 / 602
LEAKAGE SUITE          PASS    64 / 64   (Chapter 8 now in scope)
FULL SUITE             2118 passed | 8 failed (194 files)
```

**Unrelated pre-existing failures**, unchanged in identity and count from every prior
run: onboarding UI contract · billing ToyyibPay plans · invoice PDF · four BM mind-map
registry tests · Math F2 Chapter 1 DLP routing.
**0 are Chapter 8. 0 are Science Form 2.**

**Mobile**, full 11-section walk of both streams with every control revealed:

| Width | Page overflow | Figures | Clipped | Scroll in own container | Arrowheads hidden | SVG labels hidden | Buttons < 40 px |
|---|---|---|---|---|---|---|---|
| Desktop 1280 | **0 px** | 8 | 0 | 0 | 0 | 0 | 0 |
| 430 | **0 px** | 8 | 0 | 0 | 0 | 0 | 0 |
| 390 | **0 px** | 8 | 0 | 0 | 0 | 0 | 0 |
| 375 | **0 px** | 8 | **0** | 8 | 0 | 0 | 0 |

At 375 px the figures scroll inside their own `overflow-x-auto` wrapper rather than
clipping or pushing the page — the same pattern Chapter 7's gate accepted, and no
instructional element (arrowhead or label) is hidden at any width.

**MOBILE QA: PASS.**

---

## 21. New findings

**NEW CRITICAL: 0 · NEW HIGH: 0 · NEW MEDIUM: 0 · NEW LOW: 1**

### L-G1 · LOW · "Daya" vs "Daya kuasa" for *effort* across surfaces

The remediated notes label the lever effort **"Daya"**, matching textbook p.181
("Daya : Tolakan dan tarikan yang dikenakan pada palang"). The quiz retains
**"Daya kuasa"** (e.g. Q19's key "Daya kuasa, beban, fulkrum", Q23's explanation).

Both are understood in Malaysian science teaching and neither is wrong, but the two
live surfaces now use different words for the same quantity. Non-blocking: no answer
key depends on the distinction and no statement is incorrect. Worth aligning in a
future pass.

### Carried-over LOW items, re-verified as genuinely non-blocking

All three sit in the DSKP *Catatan* as **Cadangan aktiviti PdP** (suggested teaching
activities), which the p.39 authority rule makes non-binding; the binding scope each
supports is covered by other means.

| Item | Status | Why non-blocking |
|---|---|---|
| Density-cube investigation (8.2.2) | absent | density/flotation taught via the buoyancy widget and schematic |
| Glass-and-card "air exerts pressure" demo (8.2.6) | absent | air pressure taught via kinetic theory and the particle figure |
| "syphon" spelling (DLP) | present | British variant; not incorrect |

The bubble-with-depth idea is **present** as a check question in both languages, so
only the staged activity is absent.

---

## 22. Freeze decision

Every blocking criterion is met. The former CRITICAL and all six HIGH findings are
closed and independently re-verified in the live rendered product. All 12 SPs are
covered. The mandatory investigation is complete and honest about its results. All
eight figures were measured and are scientifically correct — including the two cases
most likely to be drawn wrong, the angled moment arm and the depth-jet ordering.
Calculators are finite-safe, quiz keys survived the reorder intact, leakage is zero,
parity is exact, and mobile is clean.

One new LOW finding and three carried-over LOW omissions remain, all documented above
and none blocking.

---

CHAPTER 8 FINAL VERDICT:
PASS — FREEZE CHAPTER

FORMER CRITICAL OPEN:
0

FORMER HIGH OPEN:
0

NEW CRITICAL:
0

NEW HIGH:
0

NEW MEDIUM:
0

NEW LOW:
1

SP COVERAGE:
COVERED: 12
PARTIAL: 0
MISSING: 0
INCORRECT: 0
NOT_RENDERED: 0
CONFUSING: 0

PAGE 173 ERRATA:
PASS

MANDATORY EXPERIMENT 8.2.5:
PASS

FORCE DIAGRAM:
PASS

BUOYANCY:
PASS

LEVERS:
PASS

MOMENT:
PASS

PRESSURE:
PASS

GAS PRESSURE:
PASS

ATMOSPHERIC PRESSURE:
PASS

LIQUID PRESSURE:
PASS

CALCULATORS:
PASS

LEARNER-FACING Infinity/NaN:
0

QUIZ ANSWER KEYS:
PASS

QUIZ POSITION BALANCE:
PASS

INTERACTIONS:
PASS

BM/DLP PARITY:
PASS

LEAKAGE:
0

MOBILE QA:
PASS

TYPECHECK:
PASS

BUILD:
PASS

CHAPTER 8 TESTS:
PASS — 109 / 109

SCIENCE F2 TESTS:
PASS — 602 / 602

ACADEMY CONTENT MODIFIED:
NO

RELEASE GATE ONLY:
YES
