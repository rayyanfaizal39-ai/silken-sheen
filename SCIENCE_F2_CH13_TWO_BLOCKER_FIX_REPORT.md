# Science Form 2 — Chapter 13 — Final Two-Blocker Remediation

**Date:** 2026-09-02
**Scope:** M-01 and M-02 from `SCIENCE_F2_CH13_FINAL_RELEASE_GATE.md`. Nothing else reopened.
**Files touched this turn:** `quizzes-bm.ts`, `quizzes-dlp.ts` (q21 only), `CometOrbitFigure.tsx`,
`chapter-13-remediation.test.tsx`.

---

## M-01 — q21 rebuilt from printed facts only

The textbook prints both temperatures on p. 271 and **explains neither**:

> "Suhu meteoroid di angkasa lepas adalah dalam lingkungan **0°C**."
> "Suhu permukaan yang sejuk, iaitu sekitar **−73°C**."  (asteroid)

The old item asked *why* an asteroid is colder and keyed a distance-from-the-Sun explanation, plus
the premise that meteoroids are "found near Earth / the inner orbits" — neither statement appears
anywhere in the chapter. Both are gone.

### Before → after

| | Before | After |
|---|---|---|
| **BM Q** | "Mengapakah asteroid mempunyai suhu permukaan yang lebih sejuk (−73°C) berbanding meteoroid (0°C)?" | "Manakah perbandingan suhu berikut yang betul bagi meteoroid dan asteroid?" |
| **BM key** | "Kerana asteroid lebih jauh daripada Matahari berbanding kebanyakan meteoroid yang dijumpai berhampiran Bumi" | "Meteoroid: dalam lingkungan 0°C; Asteroid: sekitar −73°C" |
| **DLP Q** | "Why does an asteroid have a colder surface temperature…?" | "Which of the following temperature comparisons for a meteoroid and an asteroid is correct?" |
| **DLP key** | "Because asteroids are generally farther from the Sun than most meteoroids found near Earth" | "Meteoroid: around 0°C; Asteroid: about −73°C" |

Explanations now restate only the two printed values. The distractor at index 0 **swaps** the two
temperatures — the mistake actually worth testing — and the remaining distractors use an
out-of-range value and an "identical temperatures" claim.

**Preserved deliberately:** `answerIndex` stays **1** (so the 8/8/7/7 position balance is
untouched) and `difficulty` stays **Hard** (so the 10/10/10 balance is untouched). The item is
still a two-value comparison with a swap trap, which carries that difficulty honestly.

```
q21 unsourced causal phrases, BM:   0
q21 unsourced causal phrases, DLP:  0
```

---

## M-02 — comet tail no longer clipped

### The cause

The canvas had been sized around the **orbit**. At perihelion the tail is longest *and* points
straight out from the Sun, reaching ~206 px left of the ellipse centre — well past the orbit — so
the box clipped exactly there. Full content extent is **364 × 242**; the box was **320 × 210**.

### The fix

The canvas is now sized around the **tail**: `viewBox 0 0 430 280`, ellipse centre moved to
(222, 140).

**`RX`, `RY`, the stop angles and the tail-length formula are byte-identical.** The tail was not
shortened, the direction rule was not touched, and the tail still leads the comet on the outbound
leg. Aspect ratio went 1.524 → 1.536, so with `w-full h-auto` the rendered height is unchanged.

Text and symbols were scaled by 430/320 = 1.344 (font 8.5 → 11.5 px, Sun r 12 → 16, comet head
r 6 → 8, stop dots 2.5 → 3.4, strokes and the solar-wind rays to match), because a wider viewBox
renders everything proportionally smaller otherwise.

### Measured, before and after

```
BEFORE (320x210)                          AFTER (430x280)
stop 0  tail 74.2  LOST 37.7  (50.8%)     stop 0  tail 74.2  LOST 0.0  (0.0%)
stop 1  tail 62.2  LOST 18.2  (29.2%)     stop 1  tail 62.2  LOST 0.0  (0.0%)
stop 2  tail 38.1  LOST  0.0              stop 2  tail 38.1  LOST 0.0
stop 3  tail 26.0  LOST  5.5  (21.2%)     stop 3  tail 26.0  LOST 0.0  (0.0%)
stop 4  tail 38.1  LOST  0.0              stop 4  tail 38.1  LOST 0.0
stop 5  tail 62.2  LOST 18.2  (29.2%)     stop 5  tail 62.2  LOST 0.0  (0.0%)
clipped: 4 of 6                           clipped: 0 of 6   worst margin 15.8 px
```

Tail lengths are identical column to column — the clipping was removed by enlarging the canvas,
not by trimming the tail.

### Scientific relationship intact

```
anti-sunward cosine, all six stops:  1.000000
Sun at a focus, 106.5 px off centre: yes   (orbit reads as elliptical, not circular)
tail longer near the Sun:            74.2 px near vs 26.0 px far
```

### Readability after the change

| | viewBox | scale on a 375 px phone | in-figure text | min-width fits |
|---|---|---|---|---|
| before | 320 | 0.984 | **8.4 CSS px** | 280 ≤ 315 ✓ |
| after | 430 | 0.733 | **8.4 CSS px** | 300 ≤ 315 ✓ |

The font scaling compensates exactly — text renders at the same size it did before. The Sun, the
whole orbit and both label rows are asserted inside the viewBox by a new test.

---

## Regression tests

`chapter-13-remediation.test.tsx` — **32 tests** (was 29). Three added:

1. **whole comet and whole tail inside the viewBox at every position**, with an 8 px margin, checking
   the *tail tip* rather than just the head;
2. **Sun, orbit extent and label rows inside the viewBox**, so widening the box cannot push the rest
   of the composition out;
3. **q21 compares the two printed temperatures**, keying both values, and rejects the specific
   unsourced phrases the old item used.

### Mutation-proven

| Injected | Caught |
|---|---|
| viewBox reverted to 320 × 210 / CX 168 | `stop 0 tail tip x=-38.2 outside 0..320` |
| old unsourced q21 key restored | `bm q21 key: expected 'Kerana asteroid lebih jauh daripada M…' to match /0°C/` |

Both reverted afterwards; suite green.

---

## VERIFY

```
q21 SOURCE-BACKED:                PASS
q21 UNSOURCED CAUSAL CLAIMS:      0
QUIZ COUNT:                       30 / 30
QUIZ POSITION DISTRIBUTION:       8 / 8 / 7 / 7   (both decks)
BM/DLP PARITY:                    PASS  (0 answerIndex mismatches, 0 difficulty mismatches,
                                         difficulty 10/10/10 both decks)
COMET TAIL FULLY VISIBLE:         6 / 6 positions
COMET TAIL ANTI-SUNWARD:          6 / 6 positions  (cosine 1.000000)

CH13 TESTS:                       PASS   32 / 32
SCIENCE F2:                       PASS   1136 / 1136  (44 files)
SOURCE LEAKAGE:                   PASS   88 / 88
TYPECHECK:                        PASS   exit 0
BUILD:                            PASS   exit 0

CHAPTER 8 CHANGED:                NO
CHAPTER 11 CHANGED:               NO
CHAPTER 12 CHANGED:               NO
```

Already-passed Chapter 13 content was not reopened: the meteoroid size, q4, movement wording,
burn-up qualifier, figures other than the comet, mind map, flashcards and dead notes are all
untouched this turn.

Pre-existing unrelated failures elsewhere in the repo (billing, invoice PDF, onboarding UI, four BM
mind-map registrations, Math Form 2 Chapter 1) remain unchanged and outside this chapter.

---

## Still unmeasured

**Browser / responsive QA remains UNMEASURED.** `/notes` is auth-gated and entering credentials is
out of the question, so 430 px / 390 px / 375 px were not visually tested. The readability figures
above are computed, not observed, and the layout guarantees rest on the shared block pattern
(`overflow-x-auto`, `w-full h-auto`, `min-h-11` controls). This is the one open risk carried into
the gate, and it is unchanged from the previous round.

The known non-blocking items are also unchanged: `.claude/launch.json` declares port 5173 while
`npm run dev` serves on 8080, and the unreachable `notes-bm.ts` / `notes-dlp.ts` remain in the tree
(now factually correct).

---

## FINAL

**READY FOR FINAL RELEASE GATE**
