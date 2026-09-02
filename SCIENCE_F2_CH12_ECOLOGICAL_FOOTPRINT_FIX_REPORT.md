# Science Form 2 — Chapter 12 — Ecological Footprint Flashcard Consistency Fix

**Scope:** the conflicting ecological-footprint flashcards only.
**Date:** 2026-09-01
**Authority:** `audit-sources/Science/Form-2/Textbook.pdf`, printed p. 263 (PDF p. 271).

---

## 1. Source re-read, independently

Printed page 263 was re-extracted from the textbook PDF positionally (text-matrix
x/y ordering, because the page is a mixed art/column layout that a linear read scrambles).
The relevant bullet, verbatim:

> "Jejak Ekologi merupakan ukuran nisbah sumber bagi **enam kawasan**, iaitu **jejak karbon,
> kawasan binaan, hutan, kawasan pertanian, kawasan penternakan dan kawasan perikanan**
> dalam bentuk tapak kaki manusia."

**DSKP cross-check:** SP 12.1.5 (DSKP printed p. 89) names *"pentingnya mengurangkan jejak
ekologi"* but does **not** enumerate the areas. The textbook is therefore the sole authority
for the six categories. `Errata.pdf` lists no correction for p. 263.

### The six source areas — 6/6

| # | BM (textbook p. 263, verbatim) | DLP (as already used by the verified Ch12 notes + mind map) |
|---|---|---|
| 1 | jejak karbon | Carbon footprint |
| 2 | kawasan binaan | Built-up land |
| 3 | hutan | Forest |
| 4 | kawasan pertanian | Cropland |
| 5 | kawasan penternakan | Grazing land |
| 6 | kawasan perikanan | Fishing grounds |

No DLP textbook is present in `audit-sources/`, so the DLP column was **not** invented here: it
was taken from the Chapter 12 interactive notes (`interactive-dlp.ts`) and mind map
(`mindmap-dlp.ts`), which the release gate already passed, and each term was checked to be a
faithful rendering of the BM category rather than a looser synonym.

---

## 2. What was wrong

Three cards in each deck ask the same concept. Two of the three answered it with categories
that appear nowhere in the source.

| Card | Old BM answer | Old DLP answer | Verdict |
|---|---|---|---|
| `f19` | rawatan sisa karbon dioksida, pembinaan, hutan, pertanian, **ladang**, perikanan | carbon dioxide waste treatment, construction, forests, agriculture, farming, fishing | invented |
| `f52` | identical to f19 | identical to f19 | invented |
| `f61` | jejak karbon, kawasan binaan, hutan, kawasan pertanian, kawasan penternakan, kawasan perikanan | Carbon footprint, built-up land, forest, cropland, grazing land, fishing grounds | source-faithful |

Four of the six categories were wrong, not one: *rawatan sisa karbon dioksida* ≠ *jejak karbon*
(a waste-treatment process, not a footprint measure), *pembinaan* ≠ *kawasan binaan* (the
activity, not the land area), *pertanian* and *ladang* collapse the source's two distinct areas
— *kawasan pertanian* (cropland) and *kawasan penternakan* (grazing land) — and lose one of
them. The DLP wording repeated the same four errors.

---

## 3. What was changed

Two files. `f19` and `f52` in both decks, front and back.

```
bm  f19  → "Enam kawasan: jejak karbon, kawasan binaan, hutan, kawasan pertanian,
            kawasan penternakan dan kawasan perikanan."
bm  f52  → "Jejak karbon, kawasan binaan, hutan, kawasan pertanian, kawasan penternakan
            dan kawasan perikanan."
dlp f19  → "Six areas: carbon footprint, built-up land, forest, cropland, grazing land
            and fishing grounds."
dlp f52  → "Carbon footprint, built-up land, forest, cropland, grazing land and
            fishing grounds."
```

Question wording was checked as well as the answers: `f19` asks *how many* and its answer
still leads with "Enam kawasan" / "Six areas"; `f52` asks the learner to *name* them. Both
questions were already correct in meaning and were left semantically intact.

**No cards added or removed.** Both decks remain **65** cards; both quiz banks remain **30**.

### f61 verified independently — not assumed correct

`f61` was re-checked term by term against p. 263 rather than accepted because it looked better.
Its BM answer matches the source's six categories exactly, in the source's order. Its DLP answer
matches the notes and mind map. **No change made.**

---

## 4. Deck consistency sweep

Every Chapter 12 flashcard mentioning *jejak ekologi* / *ecological footprint* was swept by
concept, not by id, so a card nobody had looked at would still surface.

| Card | BM | DLP | Note |
|---|---|---|---|
| `f18` | n/a | n/a | defines the term (p. 263 bullet 1) — does not enumerate, correct |
| `f19` | **6/6** | **6/6** | fixed |
| `f50` | n/a | n/a | misconception card (footprint ≠ population) — correct |
| `f51` | n/a | n/a | KBAT consequence card (p. 263 bullet 3) — correct |
| `f52` | **6/6** | **6/6** | fixed |
| `f61` | **6/6** | **6/6** | already correct, unchanged |

```
Distinct six-area answer sets among enumerating BM cards:  1
Distinct six-area answer sets among enumerating DLP cards: 1
CONTRADICTORY ECOLOGICAL-FOOTPRINT FLASHCARDS: 0
INVENTED ECOLOGICAL-FOOTPRINT TERMINOLOGY:     0
```

BM and DLP now enumerate the same six concepts on the same three card ids.

---

## 5. Regression guard

Added to `chapter-12-remediation.test.tsx` — six new tests, guarding the **six concepts**, not
one sentence, so the three cards may still be phrased differently from each other:

1. **Every enumerating BM card carries all six areas** — and asserts at least three such cards
   exist, so the guard cannot pass by the deck quietly losing the topic.
2. **Same for DLP.**
3. **Invented categories are rejected by name in BM** — `rawatan sisa karbon dioksida`,
   `ladang`, `pembinaan`.
4. **Same for DLP** — `carbon dioxide waste treatment`, `construction`, `agriculture`,
   `farming`, and bare `fishing` not followed by `grounds`.
5. **The notes and mind map must carry the same six concepts**, so the decks cannot drift away
   from the surfaces the release gate already passed.
6. **BM and DLP must enumerate on the same card ids**, so one language cannot be fixed alone.

A card counts as "enumerating" if its answer names ≥ 2 of the areas **or any invented one** —
so a card that regresses still falls inside the guard rather than filtering itself out.

### Guard proven to fail on the defect

The original wording was re-injected into BM `f19` and DLP `f52`, and the guard failed on both,
on both axes:

```
sci-f2-c12-bm-f19  is missing areas: carbon, builtUp, cropland, grazing, fishing
sci-f2-c12-bm-f19  uses a category that is not in the textbook: rawatan sisa karbon dioksida
sci-f2-c12-dlp-f52 is missing areas: carbon, builtUp, cropland, grazing, fishing
sci-f2-c12-dlp-f52 uses a category that is not in the textbook: Carbon dioxide waste treatment
```

Files were then restored and the suite re-verified green.

---

## 6. Gravity fixes undisturbed

The gravity semantic guards were re-run against the edited decks:

```
FALSE SATURN LOWER-GRAVITY CLAIMS:   0
FALSE NEPTUNE LOWER-GRAVITY CLAIMS:  0
Correct Uranus / Mercury / Mars lower-gravity statements: 5 — preserved
Misconception cards that correctly refute (bm f65, dlp f65):  2 — preserved
```

---

## 7. Report

```
ECOLOGICAL FOOTPRINT SOURCE AREAS:            6/6

f19 BM:                                       PASS
f19 DLP:                                      PASS
f52 BM:                                       PASS
f52 DLP:                                      PASS
f61 BM:                                       PASS  (verified independently, unchanged)
f61 DLP:                                      PASS  (verified independently, unchanged)

CONTRADICTORY ECOLOGICAL-FOOTPRINT FLASHCARDS: 0 / 6 topic cards per deck
INVENTED ECOLOGICAL-FOOTPRINT TERMINOLOGY:     0 / 4 previously affected cards

GRAVITY REGRESSION:                           PASS
CH12 TESTS:                                   PASS  (46/46, was 40 — 6 guards added)
SCIENCE F2 TESTS:                             PASS  (1097/1097, 39 files)
SOURCE LEAKAGE TESTS:                         PASS  (88/88)
TYPECHECK:                                    PASS  (exit 0)
BUILD:                                        PASS

CHAPTER 8 CHANGED:                            NO
CHAPTER 11 CHANGED:                           NO
CH12 NOTES / SECTIONS / QUIZZES / CALCULATOR /
PLANET COMPARISON / HYPOTHETICALS CHANGED:    NO
SHARED COMPONENTS CHANGED:                    NO
```

### Pre-existing unrelated failures — unchanged, not hidden

The full suite is **2640 passed / 8 failed** across 225 files. The same 8 failures (billing,
invoice PDF, onboarding UI, four BM mind-map registrations, Math Form 2 Chapter 1) were
confirmed in the previous turn to fail identically at HEAD, before any Chapter 12 work. None
are touched by this fix.

---

## 8. Observation — reported, not fixed

After the fix, `f52` and `f61` in each deck have **identical answers** and near-identical
questions (BM: *"Namakan enam kawasan yang digunakan untuk mengukur jejak ekologi."* vs
*"Apakah enam kawasan yang diukur dalam jejak ekologi?"*). They were three variants of one
question before; correcting two of them made the redundancy exact.

This is redundancy, not an error — a learner now gets the same correct answer whichever card
comes up. Removing one would change the deck count from 65, which is outside this fix's scope,
so both were kept. Worth a decision in the rerun.

---

## 9. Verdict

The six ecological-footprint areas now come from the textbook in every place Chapter 12 teaches
them — notes, mind map, and all three flashcards in both languages — and are protected by a
concept-level guard demonstrated to fail on the original wording.

**FINAL: READY FOR RELEASE-GATE RERUN**
