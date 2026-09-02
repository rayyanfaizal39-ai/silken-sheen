# Science Form 2 — Chapter 13 — Final Independent Release Gate

**Mode:** READ-ONLY. No project file was created, modified, deleted or committed by this gate.
**Date:** 2026-09-02
**Sources:** `audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf` only.

Chapter 13 was re-derived from the PDFs before any implementation file was opened. Prior audit,
remediation and safety-check reports were **not** used as authority; where this gate disagrees with
them it says so.

---

## 1. SOURCE — re-derived independently

| Item | Required | Found | |
|---|---|---|---|
| Standard Kandungan | 1 | **1** — `13.1 Jasad lain dalam Sistem Suria iaitu meteoroid, asteroid dan komet` (DSKP printed p. 91 / pdf 103) | PASS |
| Standard Pembelajaran | 3 | **3** — 13.1.1, 13.1.2, 13.1.3 | PASS |
| Suggested activities | 3 | **3** — three `Tujuan:` blocks (Aktiviti 13.1, 13.2, 13.3) | PASS |
| Experiments | 0 | **0** — zero occurrences of "Eksperimen" in printed 268–278 | PASS |
| Jadual 9 | NONE for Ch13 | codes are `3.4.1, 5.1.2, 5.2.2, 7.3.3, 8.2.5` — **no 13.x** | PASS |
| Errata | NONE for Ch13 | cites pages **53, 71, 151, 173** — none in 268–278 | PASS |

Textbook extent independently located: **printed 268–278** (pdf 276–286).

*Note:* an initial automated locator matched DSKP printed p. 85 (the Tema 4 overview) and reported
0 SPs. That was a locator artifact, corrected by inspecting both candidate pages; the chapter table
is printed p. 91 and carries all three SPs.

---

## 2. ACADEMIC FACTS — all verified against verbatim source

Every fact below was re-extracted from the textbook and then checked across all eight active
learner files (`interactive`, `quizzes`, `flashcards`, `mindmap` × BM/DLP).

| Check | Source | Result |
|---|---|---|
| meteoroid size = 10 μm – 1 m everywhere | p. 271 *"iaitu antara 10 μm hingga 1 m"* | **PASS** — `10 m – 1 m` occurs **0 times**, including in the dead notes files; `10 μm` present on 8/8 files |
| q4 uses the correct range | — | **PASS** — BM and DLP both key `10 μm hingga 1 m` / `10 μm to 1 m`, explanation matches |
| meteoroid moves freely, does not orbit the Sun | p. 272 *"Meteoroid pula bergerak secara bebas di angkasa…"* | **PASS** — 0 un-negated "orbits the Sun" claims; free movement taught in both languages |
| meteoroid → meteor → meteorite distinction | p. 272 | **PASS** — four named stages, correct order |
| no unqualified "burns up completely" | p. 272 *"Kebiasaannya… **Akan tetapi**, ada juga meteor yang dapat sampai ke Bumi"* | **PASS** — 0 unhedged occurrences |
| asteroid belt between Mars and Jupiter | p. 271 | **PASS** — text and geometry (see §4) |
| Apollo / Amor / Aten source-backed | p. 273, printed | **PASS** — all three present, none invented |
| comet orbit and speed source-faithful | p. 271 — elliptical, 10–70 km s⁻¹ | **PASS** |
| comet tail always away from the Sun | p. 274 *"Ekor komet sentiasa… menjauhi Matahari disebabkan tiupan angin suria"* | **PASS** — text and geometry |
| Kuiper / Oort / solar wind only where source-backed | p. 274 | **PASS** — all three printed; used, not invented |
| collision prevention source-faithful | p. 275 — monitor, warn, destroy or deflect | **PASS** |
| **not** in source and **not** shipped | — | **PASS** — "Keplerian velocity" 0, localized-destruction threshold 0, mass-extinction threshold 0 |

### One finding — see **M-01**

`q21` (both languages) keys a **causal explanation the textbook never gives**. Detail in FINDINGS.

---

## 3. COVERAGE

| SP | Verdict | Basis |
|---|---|---|
| **13.1.1** Berkomunikasi tentang meteoroid, asteroid dan komet | **COVERED** | three characteristic cards with correct source values; definitions match Rajah 13.1; reinforced by 60 flashcards and 30 quiz items |
| **13.1.2** Pergerakan dan kesannya terhadap Bumi berdasarkan data | **COVERED** | all three source movement diagrams reconstructed and interactive; speeds 42 / 25 / 10–70 km s⁻¹ present; collision mechanism taught; mind map teaches movement rather than pointing outside the product |
| **13.1.3** Menjana idea mengurangkan/mengelakkan perlanggaran | **COVERED** | matches p. 275 monitor → warn → deflect or destroy |

**DSKP COVERAGE: 3 / 3 = 100 % COVERED · 0 PARTIAL · 0 MISSING**

---

## 4. VISUALS — independent inventory and geometry recomputation

### Source inventory (8)

Rajah 13.1 (p. 270) · Gambar foto 13.1 (271) · Rajah 13.2 (272) · Rajah 13.3 (273) ·
Gambar foto 13.2 (273) · Gambar foto 13.3 (273) · Rajah 13.4 (274) · Gambar foto 13.4 (275).
Plus the Rumusan concept map (276) and the Latihan Sumatif crossword (277).

### Implementation

| Source figure | Implemented as | Verdict |
|---|---|---|
| Rajah 13.1 | three cards (text) | adequate |
| **Rajah 13.2** | `MeteoroidEntryFigure` | **PASS** |
| Gambar foto 13.1 + **Rajah 13.3** | `AsteroidBeltFigure` (two views) | **PASS** |
| **Rajah 13.4** | `CometOrbitFigure` | **PASS with M-02** |
| Gambar foto 13.2 / 13.3 / 13.4 | text only | photographs, not teaching diagrams — accepted |

### Geometry recomputed from the component constants (not from the components' own helpers)

**Meteoroid entry** — bands space 0–74 / atmosphere 74–164 / ground 164–200.
Meteoroid drawn at y=38 (space) ✓ · meteor streak y=80–126 (atmosphere) ✓ · shower streaks
y=78–117 (atmosphere) ✓ · meteorite at y=160 with crater on the ground line ✓ · all four stage
x-positions inside the canvas ✓. **The naming-by-location logic the figure exists to teach is
drawn correctly.**

**Asteroid belt** — radii venus 34 < earth 52 < mars 72 < belt 88–108 < jupiter 128.
Belt is **strictly outside Mars (88 > 72) and strictly inside Jupiter (108 < 128)** ✓.
All 18 drawn asteroids fall inside the band (radii 88–108) ✓. Outermost orbit fits the canvas ✓.
Crossing orbits, distance-from-Sun ranges computed by sampling the parametric ellipse:

```
Apollo  41.2 .. 126.0    crosses Earth orbit (r=52): YES
Amor    48.1 .. 108.0    crosses Earth orbit (r=52): YES
Aten    25.6 ..  58.0    crosses Earth orbit (r=52): YES
```

*(An intermediate bounding-box estimate in this gate suggested Apollo and Amor only grazed Earth's
orbit. That was wrong — a bounding box is not the distance range of an off-centre ellipse. Sampled
properly, all three cross. The concern is withdrawn.)*

**Comet** — ellipse rx=132 ry=78, Sun placed at a **focus** (x=61.5), 106.5 px off centre, so the
orbit reads as genuinely elliptical rather than circular ✓. Tail direction recomputed at all six
stops: **cosine against the Sun → comet direction = 1.000000 at every stop** — the tail is
anti-sunward everywhere, including on the outbound leg where it leads the comet ✓. Tail is longer
near the Sun (74.2 px vs 26.0 px) ✓, matching *"mencair dan kelihatan seperti berekor panjang"*.

**But the tail is clipped by the viewBox — see M-02.**

No misleading labels found: every stage label sits adjacent to its own drawn element, band labels
are correct, and both orbit diagrams carry *"Rajah tidak mengikut skala sebenar."*

---

## 5. LEARNER PATH

Render path traced: `registry.ts:3716/3730` → both entries carry `sciF2InteractiveData` →
`notes.tsx:2010` tests it first → Chapter 13 falls to the terminal branch at `notes.tsx:2133` →
`ScienceF2Chapter13NotesBlock` (a one-line re-export of the shared renderer). The
`activeChapter?.notes` branch at `notes.tsx:2152` is unreachable.

```
dead textbook-diagram pointers:        0
learner-facing source leakage:         0   (no DSKP / SP / SK / Jadual 9 / Aktiviti / page refs)
dead notes carrying stale wrong facts: 0   (notes-bm.ts 0, notes-dlp.ts 0)
figure blocks wired into the renderer: 3   (meteoroidEntry, asteroidBelt, cometOrbit)
BM / DLP parity — flashcards:          60 / 60, identical ids
BM / DLP parity — quizzes:             30 / 30, identical ids
BM / DLP parity — mind map:            85 / 85 nodes
```

---

## 6. QUIZ

```
count:                30 BM / 30 DLP
options per question: 4 on all 60
out-of-range keys:    0
duplicate options:    0
difficulty:           Easy 10 / Medium 10 / Hard 10 in both decks
answer positions:     A=8  B=8  C=7  D=7   in both decks
BM/DLP parity:        0 answerIndex mismatches, 0 difficulty mismatches
q4:                   academically correct in both languages
```

**All 30 keys were read individually against the source**, not sampled. q1–q20 and q22–q30 trace
to printed pp. 269–275. `q30` was flagged by a token-overlap heuristic and inspected: its key is
**correct** — the flag is a false positive caused by a distractor sharing the phrase "sistem suria"
with the explanation. **`q21` does not trace to the source — see M-01.**

Quiz-history note accepted and independently spot-confirmed: `use-tracker-history.ts:77` selects
only `id, subject_id, chapter_key, score_pct, correct, total, created_at`, so option reordering
cannot reach stored history. **NON-BLOCKING.**

---

## 7. TESTS

```
Chapter 13 dedicated tests:      PASS   29 / 29
Science Form 2 + notes suites:   PASS   1133 / 1133   (44 files)
Source-leakage tests:            PASS   88 / 88
npx tsc --noEmit:                PASS   exit 0
npm run build:                   PASS   exit 0
```

Pre-existing unrelated failures elsewhere in the repo (billing, invoice PDF, onboarding UI, four BM
mind-map registrations, Math Form 2 Chapter 1) are unchanged and outside this chapter.

---

## 8. BROWSER / RESPONSIVE QA

**UNMEASURED.**

`/notes` is authentication-gated: loading it on the dev server redirects to *"Sign In — AcadeMY"*.
Entering credentials is not something this gate will do, so desktop / 430 px / 390 px / 375 px were
**not** tested and no visual pass is claimed for overflow, clipping, SVG readability, interaction
usability or mobile layout.

What was established analytically, and is **not** a substitute:

- all three figures server-render without throwing and contain their expected labels;
- each SVG sits in an `overflow-x-auto` wrapper with `w-full h-auto`, and the declared minimum
  widths (280 px, 260 px, 280 px) fit inside a 375 px viewport's content box, so horizontal page
  scroll is not expected;
- controls use the shared `conceptButtonClass`, which carries `min-h-11` (44 px touch target).

**M-02 is a clipping defect found analytically — exactly the class of issue this QA would have
caught, and evidence that skipping it leaves real risk.**

---

## 9. INTEGRITY

```
CHAPTER 8 CHANGED:   NO
CHAPTER 11 CHANGED:  NO
CHAPTER 12 CHANGED:  NO
```

Working tree is byte-identical to its state before this gate; the gate wrote only this report.

---

## FINDINGS

### CRITICAL
**None.**

### HIGH
**None.**

### MEDIUM

**M-01 · `q21` keys a causal explanation, and a premise, that the textbook never states**
[quizzes-bm.ts:251-254](src/content/form2/science/chapter-13/quizzes-bm.ts:251) and the DLP twin.

> Q: *"Mengapakah asteroid mempunyai suhu permukaan yang lebih sejuk (kira-kira −73°C) berbanding
> meteoroid (kira-kira 0°C)?"*
> KEY: *"Kerana asteroid lebih jauh daripada Matahari berbanding kebanyakan meteoroid yang dijumpai
> berhampiran…"*
> Explanation: *"…lebih jauh daripada Matahari berbanding meteoroid yang sering ditemui berhampiran
> [orbit dalam], mengakibatkan suhu permukaan yang lebih sejuk."*

The textbook prints both temperatures as bare facts — p. 271, *"Suhu permukaan yang sejuk, iaitu
sekitar –73°C"* and *"Suhu meteoroid di angkasa lepas adalah dalam lingkungan 0°C"* — and **gives no
explanation for the difference anywhere in the chapter.** Two things in the keyed answer are
therefore outside the source: the causal link (distance from the Sun → surface temperature), and the
premise that meteoroids are typically found nearer the Sun / near Earth. A student reasoning only
from the textbook cannot derive this answer, yet it is the graded key on a Hard item.

It is scientifically defensible in general astronomy, which is precisely the category this project's
standard excludes — *"do not introduce outside astronomy merely because it is scientifically true."*

**Pre-existing:** present at HEAD (`git show HEAD` matches the wording), so it was not introduced by
the remediation. The audit missed it because its key-checking was a token-overlap heuristic rather
than a source read of all 30 keys; this gate read all 30.

**M-02 · The comet tail is clipped by the viewBox at 4 of 6 positions, worst at perihelion**
[CometOrbitFigure.tsx](src/components/notes/blocks/CometOrbitFigure.tsx) — `viewBox="0 0 320 210"`.

Tail extent recomputed and walked against the canvas bounds:

```
stop 0  ang 180  head=( 36.0,105.0)  tail 74.2  visible 36.5  LOST 37.7  (50.8%)   <-- perihelion
stop 1  ang 240  head=(102.0, 37.5)  tail 62.2  visible 44.0  LOST 18.2  (29.2%)
stop 2  ang 300                       tail 38.1  visible 38.1  LOST  0.0
stop 3  ang   0  head=(300.0,105.0)  tail 26.0  visible 20.5  LOST  5.5  (21.2%)
stop 4  ang  60                       tail 38.1  visible 38.1  LOST  0.0
stop 5  ang 120  head=(102.0,172.5)  tail 62.2  visible 44.0  LOST 18.2  (29.2%)
```

An SVG root clips to its viewBox, so this is real, not theoretical. The direction rule — the
chapter's actual misconception target — stays readable at every stop, so nothing false is taught.
But at **stop 0, the position whose entire teaching point is that the comet "mencair dan kelihatan
seperti berekor panjang" near the Sun, 51 % of the tail is invisible.** The figure visually
contradicts its own accompanying sentence exactly where that sentence applies.

Minimum fix: widen the viewBox (or inset the orbit) so the longest tail at perihelion fits — the
tail reaches x ≈ −38, so roughly 45 px of left margin, with matching room top and bottom.

### LOW

**L-01 · In-figure text is 8.5 px in a 320-unit viewBox** — about 9 CSS px on a 375 px phone. Legible
but small. Mitigated because every stage name is repeated in the 12.5 px control buttons above the
figure, so the SVG text is reinforcement rather than the sole carrier. Unverified on a real device
(see §8).

**L-02 · Three source photographs are not represented visually** (Gambar foto 13.2 Arizona crater,
13.3 dinosaurs, 13.4 near-Earth asteroid). Their factual content is present in quizzes, flashcards
and the mind map. Accepted — they are photographs, not teaching diagrams.

**L-03 · `notes-bm.ts` / `notes-dlp.ts` remain in the tree** though unreachable. Now factually
correct, so this is drift risk only, not a content defect.

**L-04 · `.claude/launch.json` declares port 5173 while `npm run dev` serves on 8080.** Declared
non-blocking.

**L-05 · `/notes` is auth-gated**, so browser QA is UNMEASURED. Declared non-blocking, but see the
note in §8: M-02 is exactly what that QA would have caught.

---

## SUMMARY

```
CRITICAL:  0
HIGH:      0
MEDIUM:    2   (M-01 unsourced causal quiz key · M-02 comet tail clipped at 4/6 positions)
LOW:       5

DSKP COVERAGE:  100 %  (3/3 COVERED, 0 PARTIAL, 0 MISSING)

TEST RESULTS:   Chapter 13    29/29 PASS
                Science F2    1133/1133 PASS (44 files)
                Leakage       88/88 PASS
                Typecheck     PASS (exit 0)
                Build         PASS (exit 0)
```

Everything the gate was asked to verify in §1, §2 (except M-01), §3, §5, §6, §7 and §9 passes, and
the two blocker classes from the audit — the meteoroid size and the wrongly-keyed q4 — are fully
resolved and now guarded.

---

## FINAL VERDICT

# FAIL — HUMAN REVIEW REQUIRED

**This is not a repeat of the Chapter 12 situation: there are 0 CRITICAL and 0 HIGH findings, and
nothing in the chapter teaches a misconception.** The verdict is FAIL only because "freeze" means
locking the chapter, and two MEDIUM items should not be frozen in:

1. **M-01** — a graded Hard-difficulty answer whose reasoning and premise are absent from the
   textbook. Freezing it makes an unsourced inference permanently correct in the assessment bank.
   This needs a curriculum decision: re-key it to something the source supports, or drop the
   question. It is pre-existing, so the decision is not urgent — but it is a decision, not an
   engineering fix.
2. **M-02** — the flagship comet figure loses half its tail at perihelion. A viewBox change fixes
   it; it is small, but it is on the one figure built to correct the chapter's classic
   misconception.

Resolve those two and Chapter 13 is ready to freeze. Additionally, **browser/responsive QA remains
UNMEASURED** and no visual pass is claimed — M-02 was found analytically and demonstrates that the
gap is not cosmetic.
