# Science Form 2 — Chapter 12 — Flashcard Duplicate Cleanup (f52)

**Scope:** `f52` in the BM and DLP decks only.
**Date:** 2026-09-01
**Authority:** `audit-sources/Science/Form-2/Textbook.pdf`, printed p. 263.

---

## 1. What was changed

`f52` and `f61` asked the same question and, after the ecological-footprint correction, gave
byte-identical answers. `f52` is repurposed onto the distinction the *previous* defect had
destroyed — the textbook lists **kawasan pertanian** and **kawasan penternakan** as two
separate areas, which the old wording had collapsed into "pertanian … ladang".

| | Before | After |
|---|---|---|
| **BM f52 Q** | "Namakan enam kawasan yang digunakan untuk mengukur jejak ekologi." | "Apakah dua kawasan berkaitan pengeluaran makanan yang disenaraikan secara berasingan dalam Jejak Ekologi?" |
| **BM f52 A** | "Jejak karbon, kawasan binaan, hutan, kawasan pertanian, kawasan penternakan dan kawasan perikanan." | "Kawasan pertanian dan kawasan penternakan." |
| **DLP f52 Q** | "Name the six areas used to measure ecological footprint." | "Which two food-production areas are listed separately in the Ecological Footprint?" |
| **DLP f52 A** | "Carbon footprint, built-up land, forest, cropland, grazing land and fishing grounds." | "Cropland and grazing land." |

### DLP terms not invented

`Cropland` and `Grazing land` are copied verbatim from the already-verified Chapter 12 content —
`interactive-dlp.ts:507-508` and `mindmap-dlp.ts:266-267` (`c1-8-3-4`, `c1-8-3-5`). No new
translation was produced.

**Files changed: 2** (`flashcards-bm.ts`, `flashcards-dlp.ts`) plus the test file.
`f61` untouched. `f19` untouched. Six terms unchanged everywhere.

---

## 2. One guard needed a correction, and why

The six-concept guard classified a card as owing all six areas by **counting areas in its
answer** (≥ 2 ⇒ must list all 6). Under that rule the new `f52` — which names exactly two,
because it asks for two — was flagged as missing four:

```
sci-f2-c12-bm-f52  is missing areas: carbon, builtUp, forest, fishing
sci-f2-c12-dlp-f52 is missing areas: carbon, builtUp, forest, fishing
```

Counting the answer cannot tell *"listed 2 because 2 were asked for"* apart from *"listed 2
because 4 are wrong"*. **The question is what settles it**, so the classifier now keys on the
question:

```
ASKS_FOR_ALL_SIX = /enam kawasan|berapa kawasan|six areas|how many areas/i
```

The original defective cards both asked *"Berapa kawasan…"* / *"Namakan enam kawasan…"* /
*"How many areas…"* / *"Name the six areas…"*, so every card that carried the original defect
is still inside the guard. Nothing was weakened to accommodate the new card — verified by
mutation below. The full-list card count assertion moved from `≥ 3` to `≥ 2`, matching the two
cards per deck that now ask for the whole list.

**No guard was removed.** Three were added:

| New test | Purpose |
|---|---|
| answers subset questions from the same six areas | a card asking for a subset must still answer from the real six — closes the hole the relaxation could have opened |
| `f52` and `f61` have different questions **and** different answers | the thing this task asked to verify, made durable |
| no two cards share an answer in either deck | catches this class of duplication anywhere in the deck, not just at `f52` |

### Mutation-proven

| Injected | Caught by |
|---|---|
| original invented terms restored to BM `f19` | 5 assertions (missing areas + invented terminology) |
| `f52` BM answer set back to `f61`'s | `f52 != f61` test **and** duplicate-answer test |
| invented term (`ladang`) on the new subset card `f52` | invented-terminology test **and** the new subset test |

The third mutation is the important one: it proves the subset relaxation did not create a gap.
Files were restored and the suite re-verified green after each.

---

## 3. Verification

```
f52 != f61 (BM):                              PASS  (different question, different answer)
f52 != f61 (DLP):                             PASS  (different question, different answer)
DECK COUNT BM:                                65/65
DECK COUNT DLP:                               65/65
DUPLICATE ANSWERS IN EITHER DECK:             0
ECOLOGICAL-FOOTPRINT SIX-CONCEPT GUARD:       PASS  (f19 6/6, f61 6/6, both languages)
INVENTED ECOLOGICAL-FOOTPRINT TERMINOLOGY:    0
GRAVITY GUARD:                                PASS  (Saturn 0, Neptune 0, 5 true statements kept)

CHAPTER 12 TESTS:                             PASS  (49/49, was 46 — 3 guards added)
SCIENCE F2 TESTS:                             PASS  (1100/1100, 39 files)
SOURCE LEAKAGE TESTS:                         PASS  (88/88)
TYPECHECK:                                    PASS  (exit 0)
BUILD:                                        PASS  (exit 0)

CHAPTER 8 CHANGED:                            NO
CHAPTER 11 CHANGED:                           NO
f61 CHANGED:                                  NO
f19 CHANGED:                                  NO
SIX ECOLOGICAL-FOOTPRINT TERMS CHANGED:       NO
CH12 NOTES / SECTIONS / QUIZZES / CALCULATOR /
PLANET COMPARISON / HYPOTHETICALS CHANGED:    NO
SHARED COMPONENTS CHANGED:                    NO
```

The 8 pre-existing unrelated failures elsewhere in the repo (billing, invoice PDF, onboarding
UI, four BM mind-map registrations, Math Form 2 Chapter 1) are unchanged and untouched;
they were confirmed two turns ago to fail identically at HEAD.

---

## 4. Observation — reported, not fixed

The duplicate sweep that cleared `f52`/`f61` surfaced one more, in the **BM deck only**:

- `sci-f2-c12-bm-f34` and `sci-f2-c12-bm-f62` have the **identical question**
  *"Mengapakah permukaan Bulan yang sama sentiasa menghadap Bumi?"* with two differently-worded
  but equivalent answers (rotation period ≈ revolution period, ~27 days). Both are correct, so
  this is redundancy rather than a contradiction.
- The DLP deck has **no** duplicate questions, so this is also a BM/DLP parity asymmetry.

Out of scope here (only `f52` was in scope), and the new duplicate-answer guard does not catch
it because the answers differ. Flagged for the release gate to decide.

---

## 5. Verdict

`f52` is now a distinct, source-backed recall card testing the cropland/grazing-land distinction
the textbook draws on p. 263. Both decks hold at 65, `f61` and the six terms are untouched, and
the duplication is now guarded against deck-wide rather than at one card.

**FINAL: READY FOR FINAL RELEASE GATE**
