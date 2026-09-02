# Science Form 2 — Chapter 13 — Targeted Remediation

**Date:** 2026-09-02
**Authority:** `audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf` only.
**Scope:** the confirmed findings of `SCIENCE_F2_CH13_DEEP_AUDIT_REPORT.md`. Chapters 8, 11 and 12
untouched.

---

## 1. CRITICAL — meteoroid size

Source, textbook printed p. 271: *"Mempunyai saiz yang berbeza-beza, iaitu antara **10 μm** hingga 1 m."*

Corrected on **14 active learner-facing occurrences across 6 files** — not 12.

**Correction to the audit:** the audit reported 12. Re-counting the same grep gives 14
(quizzes-bm 3, quizzes-dlp 3, flashcards-bm 3, flashcards-dlp 3, mindmap-bm 1, mindmap-dlp 1).
The audit's figure was an arithmetic slip; the file list was right.

| File | Occurrences fixed |
|---|---|
| `quizzes-bm.ts` | 3 (q4 option + q4 explanation + q7 distractor) |
| `quizzes-dlp.ts` | 3 |
| `flashcards-bm.ts` | 3 |
| `flashcards-dlp.ts` | 3 |
| `mindmap-bm.ts` | 1 |
| `mindmap-dlp.ts` | 1 |

`notes-bm.ts` / `notes-dlp.ts` hold 2 more each. They are shadowed by the interactive branch at
[notes.tsx:2010](src/routes/notes.tsx:2010) and unreachable, so under the "active learner-facing"
scope they were **left untouched and are reported here instead**.

### q4 — the wrong key

```
before   options: ["10 m hingga 1 m", "1 m hingga 1,000 km", "250,000 km", "150,000,000 km"]
         answerIndex: 0        ← keyed the impossible range as correct
after    options: ["1 m hingga 1,000 km", "10 μm hingga 1 m", "250,000 km", "150,000,000 km"]
         answerIndex: 1        ← keys the textbook value
```

Explanation updated to match. Distractors are unchanged and stay plausible — they are the asteroid
range, the comet head and the comet tail, all real values from p. 271. DLP is the exact equivalent.

---

## 2. Meteoroid movement

Source p. 272: *"Asteroid dan komet bergerak melalui orbitnya sendiri mengelilingi Matahari.
**Meteoroid pula bergerak secara bebas di angkasa** serta dipengaruhi oleh daya tarikan graviti
planet, bulan dan objek lain di sekelilingnya."*

The claim that a meteoroid orbits the Sun is removed. The replacement states the free movement
**and** the contrast, because the contrast is the discrimination SP 13.1.1 tests:

> "Meteoroid bergerak secara bebas di angkasa — bukan mengikut orbitnya sendiri mengelilingi
> Matahari seperti asteroid dan komet — serta dipengaruhi oleh daya tarikan graviti planet, bulan
> dan objek lain di sekelilingnya."

---

## 3. Meteor → meteorite

Source p. 272: *"**Kebiasaannya**, meteor akan habis terbakar sebelum sampai ke Bumi. **Akan tetapi,
ada juga meteor yang dapat sampai ke Bumi.** Meteor ini disebut sebagai meteorit."*

The unqualified "meteor terbakar sepenuhnya" / "meteors burn up completely" in the comprehension
check is replaced with the source's hedge plus the exception, and it now names the meteorite the
way the textbook does. The stage text carries the same qualifier, so notes and check agree.

The four-stage naming is intact and now identical on the figure and in the text:
**meteoroid → meteor → pancuran meteor → meteorit.**

---

## 4. Quiz answer positions

```
before   A=19  B=8  C=3  D=0     (both decks — D never correct; always-A scored 63%)
after    A=8   B=8  C=7  D=7     (both decks)
```

**Options were reordered, nothing was rewritten.** The correct option was swapped with whichever
option sat at its target index, so every question, option text, explanation and correct answer is
byte-identical to before.

Proven, not asserted: each question was parsed before and after and compared. With the separate
size correction normalised out, **the keyed option text is identical on all 60 questions**, the
option *sets* are identical, and question order is unchanged. Target positions come from a fixed
seed with no three consecutive identical positions, and BM and DLP receive the same sequence, so
their keys stay aligned (0 mismatches).

---

## 5. Source figures

### Independent re-inventory — 8 figures

| # | Source figure | Page | Status |
|---|---|---|---|
| 1 | Rajah 13.1 — three definitions | 270 | covered by the three cards (text is adequate) |
| 2 | Gambar foto 13.1 — asteroid belt | 271 | **implemented** (`AsteroidBeltFigure`) |
| 3 | **Rajah 13.2 — meteoroid → meteorit** | 272 | **implemented** (`MeteoroidEntryFigure`) |
| 4 | **Rajah 13.3 — asteroid movement / Earth-crossing** | 273 | **implemented** (`AsteroidBeltFigure`, crossing view) |
| 5 | **Rajah 13.4 — comet movement / orbit / tail** | 274 | **implemented** (`CometOrbitFigure`) |
| 6 | Gambar foto 13.2 — Arizona crater | 273 | photograph — not reconstructed |
| 7 | Gambar foto 13.3 — dinosaurs | 273 | photograph — not reconstructed |
| 8 | Gambar foto 13.4 — near-Earth asteroid | 275 | photograph — not reconstructed |

**Learner-critical visuals implemented: 5 / 5.** The three not reconstructed are photographs, not
teaching diagrams; their content is already carried in text, and inventing a drawing for them would
be decoration, not clarity.

### What each figure does

**`MeteoroidEntryFigure`** — one scene with space, the atmosphere band and the ground, and the four
stages placed across it. The naming is positional in the source (the same rock changes name by
*where it is*), so the altitude bands stay visible instead of the sequence collapsing into a word
list. Stage 3 is labelled **pancuran meteor**, the source's term.

**`AsteroidBeltFigure`** — the belt drawn as a band between the Mars and Jupiter orbits, toggling to
the Apollo, Amor and Aten orbits reaching Earth's. The two source images teach one idea between
them — most asteroids are held in the ring, but these orbits are what make a collision possible —
so they are one figure rather than two.

**`CometOrbitFigure`** — the comet moves to six positions on its elliptical orbit and the tail is
recomputed each time as the direction Sun → comet. This is the chapter's classic misconception:
"points away from the Sun" sounds like "behind the comet", and on the outbound leg the tail *leads*.
A static drawing cannot settle that; moving the comet does.

### Geometry is guarded, not eyeballed

Two exported pure functions let the scientific claims be asserted:

- `cometGeometry(stop)` — the tail direction is checked at **every** one of the six positions; the
  cosine between the tail and the Sun → comet direction is 1 at all of them. The tail is also longer
  nearer the Sun, matching *"semakin laju, mencair dan kelihatan seperti berekor panjang"*.
- `ORBIT_R` — the belt band is asserted to lie strictly outside the Mars orbit and strictly inside
  Jupiter's. The label is not the claim; the geometry is.

Both orbit diagrams are marked *"Rajah tidak mengikut skala sebenar."*

### Dead pointers

All **6** `"(rujuk gambar rajah dalam buku teks)"` / `"(see diagram in textbook)"` nodes are gone,
replaced by the movement content those source diagrams actually carry (pp. 272–274) — free movement
and gravitational influence for the meteoroid; average speed, belt residence and the collision point
for the asteroid; speed-up near the Sun, the tail rule, outer-planet perturbation and the collision
risk for the comet. Nothing duplicates the neighbouring branches, which already list Apollo/Amor/Aten,
Kuiper/Oort and the comet examples.

**Dead textbook-diagram pointers: 0 / 6.**

---

## 6. Chapter 13 tests

New: [chapter-13-remediation.test.tsx](src/content/form2/science/chapter-13/chapter-13-remediation.test.tsx) — **29 tests**.

Covers every item requested: 1 SK / 3 SP structure, the 10 μm – 1 m range on all eight surfaces,
the q4 key and explanation, meteoroid free movement, the meteor/meteorite qualifier, the belt
between Mars and Jupiter (label *and* geometry), the comet tail rule (text *and* geometry at all six
positions), BM/DLP parity, 30 quiz items, answer-position balance, no source leakage, and no
"refer to textbook diagram" placeholders. It also guards against re-importing the astronomy the
textbook never prints (Kepler, localized-destruction thresholds).

### Mutation-proven

Four regressions were injected and all were caught, then reverted:

| Injected | Caught by |
|---|---|
| original `10 m hingga 1 m` restored to quizzes | 3 assertions, incl. the q4 key guard |
| mind-map pointer restored | "never tells a learner to look at the textbook instead" |
| meteoroid made to orbit the Sun | free-movement guard |
| burn-up qualifier removed | hedge guard |

One guard was too weak on first writing and was tightened. "Never says a meteoroid orbits the Sun"
skipped any string containing "bukan" anywhere — so *"Meteoroid mengorbit Matahari — bukan mengikut
orbitnya sendiri"* escaped while asserting exactly the wrong thing. A negation now only counts when
it sits immediately before the orbit phrase, and the subject is checked so an asteroid or comet
clause cannot be mistaken for the meteoroid. Re-mutated afterwards: it fires.

---

## 7. Coverage after remediation

| SP | Before | After | Basis |
|---|---|---|---|
| **13.1.1** Berkomunikasi tentang meteoroid, asteroid dan komet | COVERED | **COVERED** | characteristics correct at last (10 μm), and the meteoroid/asteroid/comet movement distinction is now stated rather than inverted |
| **13.1.2** Pergerakan dan kesannya terhadap Bumi berdasarkan data | PARTIAL | **COVERED** | all three source movement diagrams reconstructed and interactive; the mind map now teaches movement instead of pointing at the printed book; speeds (42 / 25 / 10–70 km s⁻¹) and the collision mechanism present |
| **13.1.3** Menjana idea mengurangkan/mengelakkan perlanggaran | COVERED | **COVERED** | unchanged — p. 275 monitor → warn → deflect or destroy |

**3 / 3 COVERED (100 %), 0 PARTIAL, 0 MISSING.**

Nothing was added to inflate coverage: every new string is from printed pages 271–275.

---

## 8. Not over-fixed

Deliberately **not** added, and now guarded against: "Keplerian velocity", the "<10 km localized
destruction / larger = mass extinction" threshold, and any mass-extinction threshold wording. None
is printed in the textbook.

Kept because each is verified directly from source: Kuiper belt and Oort cloud (p. 274), solar wind
(p. 274), Apollo/Amor/Aten (p. 273), the 10 km dinosaur-impact claim (p. 273). Careers were **not**
expanded into a lesson; the missing "Ahli petrologi" remains a LOW audit item, untouched.

---

## 9. Verification

```
METEOROID RANGE:                 PASS   (14/14 active occurrences → 10 μm – 1 m; 0 remaining)
q4:                              PASS   (both languages key "10 μm hingga 1 m" / "10 μm to 1 m")
METEOROID MOVEMENT:              PASS   (free movement stated; 0 "orbits the Sun" claims)
METEOR / METEORITE:              PASS   (qualifier restored; 4 stages consistent)

SOURCE FIGURES:                  5 / 5  learner-critical implemented  (8 inventoried; 3 are photographs)
DEAD TEXTBOOK-DIAGRAM POINTERS:  0 / 6

QUIZ POSITION DISTRIBUTION:      A=8  B=8  C=7  D=7   (both decks)
BM/DLP PARITY:                   PASS   (30/30 keys and difficulty aligned; 60/60 flashcard ids)

SP 13.1.1:                       COVERED
SP 13.1.2:                       COVERED   (was PARTIAL)
SP 13.1.3:                       COVERED

CH13 TESTS:                      PASS   (29/29 — new file)
SCIENCE F2 TESTS:                PASS   (1133/1133, 44 files)
SOURCE LEAKAGE TESTS:            PASS   (88/88)
TYPECHECK:                       PASS   (exit 0)
BUILD:                           PASS   (exit 0)

CHAPTER 8 CHANGED:               NO
CHAPTER 11 CHANGED:              NO
CHAPTER 12 CHANGED:              NO
```

### Pre-existing unrelated failures

The 8 failures elsewhere in the repo (billing, invoice PDF, onboarding UI, four BM mind-map
registrations, Math Form 2 Chapter 1) are unchanged and untouched; they were confirmed earlier to
fail identically at HEAD before any of this work.

### Browser verification — attempted, blocked

The new figures were **not** verified in a live browser. `/notes` redirects to Sign In, and entering
credentials is not something I will do. Two things were done instead, and neither is a substitute
for a visual pass:

- all three components are server-rendered in the test suite and asserted to contain their labels;
- the two scientific geometry claims are computed and asserted (tail anti-sunward at all six
  positions, belt strictly between Mars and Jupiter).

Layout and theming on a real device remain **unmeasured** and are not claimed. The figures follow
the established block pattern (`overflow-x-auto` wrapper, `w-full h-auto` SVG, `min-h-11` controls
via `conceptButtonClass`) already exercised by Chapters 3–12.

*Incidental:* `.claude/launch.json` declares port 5173 but `npm run dev` serves on **8080**. Out of
scope, not changed — flagged so the next browser session does not lose time on it.

---

## FINAL

**READY FOR FINAL RELEASE GATE**

Two things a gate should look at specifically:

1. **Answer positions changed on all 30 questions in both decks.** Existing Chapter 13 quiz-history
   rows recorded against the old key order are now misaligned; whether they need invalidating in the
   AcadeMY Brain is a product decision, not a code one.
2. **`notes-bm.ts` / `notes-dlp.ts` still contain the wrong 10 m range** (2 occurrences each). They
   are unreachable, so no learner sees it, but the value will drift further from the live content
   the longer the dead files stay in the tree.
