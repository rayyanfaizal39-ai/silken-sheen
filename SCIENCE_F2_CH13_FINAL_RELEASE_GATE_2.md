# Science Form 2 — Chapter 13 — Final Release Gate (round 2)

**Mode:** READ-ONLY. This gate created only this report; no source file was modified.
**Date:** 2026-09-02
**Sources:** `audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf` only.

Source truth was re-derived from the PDFs before any implementation file was opened, and the two
previous blockers were re-checked by recomputing the geometry and re-reading every quiz key —
not by trusting the fix report.

---

## 1. SOURCE TRUTH — re-derived

| Item | Expected | Found | |
|---|---|---|---|
| Standard Kandungan | 1 | **13.1**, single | PASS |
| Standard Pembelajaran | 3 | **13.1.1, 13.1.2, 13.1.3** | PASS |
| Suggested activities | 3 | **3** (`Tujuan:` blocks) | PASS |
| Experiments | 0 | **0** occurrences of "Eksperimen" in printed 268–278 | PASS |
| Jadual 9 | NONE | `3.4.1, 5.1.2, 5.2.2, 7.3.3, 8.2.5` — no 13.x | PASS |
| Errata | NONE | cites 53, 71, 151, 173 — none in 268–278 | PASS |

DSKP Catatan *"Meteorit diperkenalkan"* confirmed present.

---

## 2. ACADEMIC CHECK

| Check | Result |
|---|---|
| meteoroid size = 10 μm – 1 m everywhere | **PASS** — `10 m – 1 m` occurs **0 times** across all 8 active files *and* both dead notes files; `10 μm` present on 8/8 |
| q4 correct | **PASS** — both languages key `10 μm hingga 1 m` / `10 μm to 1 m`, explanations match |
| meteoroid moves freely in space | **PASS** — 0 un-negated "orbits the Sun" claims; free movement taught in both languages |
| meteor / meteorite distinction | **PASS** — four named stages, correct order, `pancuran meteor` is the source's term |
| burn-up wording hedged | **PASS** — 0 unqualified "burns up completely" |
| asteroid belt between Mars and Jupiter | **PASS** — text and geometry |
| Apollo / Amor / Aten source-backed | **PASS** — all three printed on p. 273, none invented |
| comet orbit / speed source-backed | **PASS** — elliptical, 10–70 km s⁻¹ |
| comet tail always away from the Sun | **PASS** — text and geometry |
| Kuiper / Oort / solar wind source-backed | **PASS** — all printed on p. 274 |
| collision prevention source-backed | **PASS** — p. 275 monitor → warn → deflect or destroy |
| no outside astronomy as textbook fact | **PASS** — Kepler 0, localized-destruction threshold 0, mass-extinction threshold 0 |

Learner path: **0** dead textbook-diagram pointers, **0** source leakage, **0** stale wrong facts in
the dead notes.

---

## 3. PREVIOUS BLOCKERS — re-checked

### M-01 · q21 — **PASS**

Source, p. 271: *"Suhu meteoroid di angkasa lepas adalah dalam lingkungan **0°C**"* and, for the
asteroid, *"Suhu permukaan yang sejuk, iaitu sekitar **−73°C**"*. The chapter explains neither.

```
BM  Q: "Manakah perbandingan suhu berikut yang betul bagi meteoroid dan asteroid?"
    >> [1] Meteoroid: dalam lingkungan 0°C; Asteroid: sekitar −73°C
DLP Q: "Which of the following temperature comparisons for a meteoroid and an asteroid is correct?"
    >> [1] Meteoroid: around 0°C; Asteroid: about −73°C
```

| Criterion | Result |
|---|---|
| asks a source-backed temperature comparison | PASS |
| meteoroid ≈ 0°C | PASS |
| asteroid ≈ −73°C | PASS |
| no unsupported causal explanation | PASS — 0 matches |
| no "meteoroids commonly near Earth / inner orbit" premise | PASS — 0 matches |
| BM / DLP equivalent | PASS — same key index, same difficulty, same structure |
| correct key | PASS — keyed option carries both printed values |

The index-0 distractor swaps the two values, which is the mistake worth testing. Difficulty stays
Hard and `answerIndex` stays 1, so neither balance moved.

### M-02 · comet figure — **PASS**

Constants re-parsed from `CometOrbitFigure.tsx` and **all geometry recomputed in this gate**; the
component's own `cometGeometry` / `COMET_VIEWBOX` exports were deliberately *not* imported, so a
wrong constant could not pass by agreeing with itself. The tail-length formula was also read back
out of the file (`26 + near * 54`) rather than assumed.

```
viewBox 0 0 430 280 | ellipse c=(222,140) rx=132 ry=78 | focus x=115.51

stop  head              tail tip           tail   cos        clipped  margin
0     ( 90.0, 140.0)    ( 15.8, 140.0)     74.2   1.000000   no        15.8
1     (156.0,  72.5)    (188.0,  19.1)     62.2   1.000000   no        19.1
2     (288.0,  72.5)    (323.4,  58.6)     38.1   1.000000   no        58.6
3     (354.0, 140.0)    (380.0, 140.0)     26.0   1.000000   no        50.0
4     (288.0, 207.5)    (323.4, 221.4)     38.1   1.000000   no        58.6
5     (156.0, 207.5)    (188.0, 260.9)     62.2   1.000000   no        19.1
```

| Criterion | Result |
|---|---|
| full tail visible at all 6 positions | **PASS** — 0 of 6 clipped, worst margin 15.8 px |
| no clipping | **PASS** |
| tail not artificially shortened | **PASS** — lengths `[74.2, 62.2, 38.1, 26.0, 38.1, 62.2]`; longest is 74.2, **identical to the pre-fix value** |
| anti-sunward at all 6 | **PASS** — cosine 1.000000 at every stop |
| Sun remains at focus | **PASS** — 106.5 px off centre; orbit genuinely elliptical (rx ≠ ry) |
| labels / text inside viewBox | **PASS** — Sun label (115.5, 175.0), top label (11, 21), bottom label (11, 269), Sun circle r=16, orbit extent x 90–354 / y 62–218, all inside |
| geometry independently recomputed | **PASS** — see method note above |

Readability after the widening: font 11.5 px in a 430-unit box renders at **8.4 CSS px** on a
375 px phone — the same as the 8.5 px/320-unit box it replaced. `min-w-[300px]` fits a 315 px card.

---

## 4. COVERAGE

| SP | Verdict |
|---|---|
| **13.1.1** Berkomunikasi tentang meteoroid, asteroid dan komet | **COVERED** |
| **13.1.2** Pergerakan dan kesannya terhadap Bumi berdasarkan data | **COVERED** |
| **13.1.3** Menjana idea mengurangkan/mengelakkan perlanggaran | **COVERED** |

**DSKP COVERAGE: 100 % (3/3 COVERED, 0 PARTIAL, 0 MISSING)**

---

## 5. VISUALS

| Learner-critical figure | Result |
|---|---|
| meteoroid → meteor → meteorite | **PASS** — meteoroid in space (y 38 < 74), meteor streak in atmosphere (80–126), shower streaks in atmosphere (78–117), meteorite on the ground line, all four stage x-positions inside the canvas |
| asteroid belt | **PASS** — band strictly outside Mars (88 > 72) and inside Jupiter (108 < 128); all 18 drawn asteroids inside the band |
| Earth-crossing asteroid paths | **PASS** — sampling each parametric ellipse: Apollo 41.2–126.0, Amor 48.1–108.0, Aten 25.6–58.0; **all three bracket Earth's orbit (r=52)**, so the "crossing orbits" label is honest |
| comet orbit | **PASS** — elliptical with the Sun at a focus |
| comet speed | **PASS** — longer tail near the Sun (74.2 vs 26.0), matching *"mencair dan kelihatan seperti berekor panjang"*; the 10–70 km s⁻¹ range is stated in the body text, not invented per-position |
| comet-tail direction | **PASS** — anti-sunward at all six positions |

Wrong labels: none. Misleading geometry: none. Clipping: none. Duplicated/dead textbook
references: none. Both orbit diagrams carry *"Rajah tidak mengikut skala sebenar."*

*Method note:* a crude bounding-box estimate suggests Apollo and Amor merely graze Earth's orbit.
That estimate is wrong for an off-centre ellipse; sampling the parametric curve is the correct
method and shows all three cross. Recorded so the wrong method is not repeated.

---

## 6. QUIZ

```
count:                30 BM / 30 DLP
options per question: 4 on all 60
out-of-range keys:    0
duplicate options:    0
difficulty:           Easy 10 / Medium 10 / Hard 10   (both decks)
answer positions:     A=8  B=8  C=7  D=7              (both decks)
BM/DLP parity:        0 answerIndex mismatches, 0 difficulty mismatches
q4:                   correct        q21: correct
```

**All 30 keyed answers were read individually against the source**, not sampled. q1–q20 are direct
printed facts (definitions, 10 μm, iron/nickel, 0 °C, 1 m–1 000 km, Marikh–Musytari, planet kecil,
head/tail, 25 and 42 km s⁻¹, Ceres/Pallas/Juno/Vesta, 150 000 000 km, 250 000 km, elips,
10–70 km s⁻¹). q21 is the rebuilt comparison. q22–q30 trace to pp. 269–275 (monitoring, the 10 km
dinosaur claim, Shoemaker-Levy 9 1994, Halley 2061, Hoba, the Arizona crater, Apollo/Amor/Aten
crossing, ANGKASA, and the three-object distinction). q27 and q30 are interpretive KBAT items built
on printed facts, which is within the source rather than outside it.

---

## 7. TESTS

```
Chapter 13 dedicated tests:     PASS   32 / 32
Science Form 2 + notes suites:  PASS   1136 / 1136   (44 files)
Source-leakage tests:           PASS   88 / 88
npx tsc --noEmit:               PASS   exit 0
npm run build:                  PASS   exit 0
```

Pre-existing unrelated failures elsewhere in the repo (billing, invoice PDF, onboarding UI, four BM
mind-map registrations, Math Form 2 Chapter 1) are unchanged and outside this chapter.

---

## 8. BROWSER QA — **UNMEASURED**

Attempted, and pursued further than last round. The dev server was started, `/notes` was opened,
and the sign-in page offered *"Continue as guest"* — a credential-free path, so it was taken. Guest
mode reaches the home page, but navigating to `/notes` still redirects to Sign In.

Cause found in the code rather than guessed: `/notes` is a member of `STUDENT_PROTECTED_ROUTES`, and
[onboarding-routing.ts:60](src/lib/onboarding-routing.ts:60) redirects whenever there is no
authenticated user —

```ts
return !authLoading && !hasUser && STUDENT_PROTECTED_ROUTES.has(pathname);
```

Guest mode does not create a user, so no credential-free route into the page exists. Entering
credentials is out of the question, and faking auth state would be observing something no real user
sees.

**Therefore: desktop, 430 px, 390 px and 375 px were NOT inspected. No visual or browser pass is
claimed** for the comet figure, SVG clipping, horizontal overflow, text readability or
button/interaction usability.

What is known instead, by computation and server-side rendering — **not** a substitute:

- all three figures server-render without throwing and contain their expected labels;
- every SVG element, tail tip, label and the orbit extent are inside their viewBox (§3, §5);
- in-figure text renders at 8.4 CSS px on a 375 px phone, unchanged by the viewBox widening;
- declared minimum widths (280 / 260 / 300 px) fit inside a 375 px viewport's 315 px card, so
  horizontal page scroll is not expected;
- controls use `conceptButtonClass`, which carries `min-h-11` (44 px touch target).

This is the single open risk and it is unchanged from the previous round.

---

## 9. INTEGRITY

```
CHAPTER 8 CHANGED:   NO
CHAPTER 11 CHANGED:  NO
CHAPTER 12 CHANGED:  NO
```

The working tree is identical to its state before this gate.

---

## FINDINGS

### CRITICAL
**None.**

### HIGH
**None.**

### MEDIUM
**None.** Both previous MEDIUM findings are resolved and independently re-verified:
M-01 (unsourced causal quiz key) and M-02 (comet tail clipping).

### LOW

**L-01 · Browser / responsive QA is UNMEASURED** — `/notes` requires an authenticated user and
guest mode does not satisfy it. Layout and theming on a real device are computed, not observed.
Carried as a known non-blocking limitation, per instruction.

**L-02 · In-figure SVG text renders at ~8.4 CSS px on a 375 px phone.** Small, but unchanged from
the previously-accepted state and mitigated because every stage name is repeated in the 12.5 px
control buttons above each figure.

**L-03 · Three source photographs are not reconstructed** (Gambar foto 13.2 Arizona crater, 13.3
dinosaurs, 13.4 near-Earth asteroid). Their facts are carried in the quizzes, flashcards and mind
map. Accepted — photographs, not teaching diagrams.

**L-04 · `notes-bm.ts` / `notes-dlp.ts` remain in the tree** though unreachable. Now factually
correct, so this is drift risk only.

**L-05 · `.claude/launch.json` declares port 5173 while `npm run dev` serves on 8080.** Explicitly
excluded from the verdict, per instruction.

---

## SUMMARY

```
CRITICAL:  0
HIGH:      0
MEDIUM:    0
LOW:       5   (all previously known and accepted as non-blocking)

DSKP COVERAGE:  100 %   (3/3 COVERED)

q21:            PASS
COMET FIGURE:   PASS

TEST RESULTS:   Chapter 13    32/32 PASS
                Science F2    1136/1136 PASS (44 files)
                Leakage       88/88 PASS
                Typecheck     PASS (exit 0)
                Build         PASS (exit 0)

BROWSER QA:     UNMEASURED
```

---

## FINAL VERDICT

# PASS — FREEZE CHAPTER

Every academic fact traces to the printed source, all three Standard Pembelajaran are covered, all
30 quiz keys in both languages were read against the textbook, the two prior blockers are fixed and
independently re-verified by recomputation rather than by trusting the fix report, and the full test
suite, typecheck and production build are green.

**One qualification on the freeze, stated plainly rather than buried:** browser and responsive QA
remain **UNMEASURED** because `/notes` is auth-gated and no credential-free path exists. Nothing in
this gate claims a visual pass. If the chapter is frozen now, it is frozen with its layout verified
by computation only — which is the same standard the previous round accepted, and the reason the
figures' geometry is guarded by tests rather than by eye.
