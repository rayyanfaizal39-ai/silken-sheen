# SCIENCE FORM 2 — CHAPTER 12 (SISTEM SURIA / SOLAR SYSTEM)
# FINAL INDEPENDENT RELEASE GATE

```
CHAPTER 12 FINAL RELEASE GATE:
FAIL — HUMAN REVIEW REQUIRED
```

**Date:** 2026-09-01
**Mode:** READ-ONLY. Nothing was fixed, and no production file was modified.
**Baseline:** HEAD `589ebf15`; 16 Chapter 12 / shared files checksummed before inspection.
**Authorities:** `audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf`, re-derived independently.
The remediation report was **not** used as authority; every claim in it was re-tested from source.

```
ACADEMY CONTENT MODIFIED:
NO
```

All 16 baseline checksums re-verified `OK` after the gate. The working tree did not move underneath
this gate.

---

## SOURCE RECONSTRUCTION (independent, before opening any AcadeMY file)

```
TOTAL SK:
1                (12.1 Sistem Suria — DSKP printed pp. 88-90)

TOTAL SP:
5                (12.1.1 – 12.1.5)

JADUAL 9:
NONE             (lists only 3.4.1, 5.1.2, 5.2.2, 7.3.3, 8.2.5 — no 12.x)

TEXTBOOK EXPERIMENTS:
0                ("Eksperimen" occurs 0 times in printed pp. 250-268)

SUGGESTED ACTIVITIES:
4                (Tujuan: markers on printed pp. 253, 258, 263, 264)

ERRATA:
NONE for Chapter 12   (corrections listed only for pp. 53, 71, 151, 173)
```

Every expected claim was verified, not assumed. High-risk facts re-derived:

| # | Source fact | Verified |
|---|---|---|
| A | Gas-giant gravity: *"tarikan graviti planet-planet ini **tidak terlalu tinggi** berbanding dengan Bumi"* (ms. 259). The phrase "lebih lemah" occurs **0 times** in the whole chapter. Bumi 9.8, Zuhal 10.44, Uranus 8.69, Neptun 11.15 | ✓ |
| B | SP 12.1.2 Catatan lists **10** characteristics: saiz, jarak, suhu, ketumpatan, tarikan graviti relatif kepada Bumi, lapisan atmosfera, keadaan permukaan, arah dan kelajuan putaran, peredaran pada orbit, satelit semulajadi | ✓ 10 |
| C | SP 12.1.3 Catatan reads **"Ketumpatan dan tarikan graviti"**. *"Jisim dan graviti"* does **not** appear — the substitution is incorrect | ✓ |
| D | Four prompts. Only the stop-rotating case has printed conclusions (Rajah 12.4). The other three are posed as questions | ✓ |
| E | Rajah 12.7 lists **six** characteristics. *habitable zone* and *magnetic field* occur **0 times** in Chapter 12 | ✓ 6 |
| F | *"nisbah sumber bagi **enam** kawasan, iaitu jejak karbon, kawasan binaan, hutan, kawasan pertanian, **kawasan penternakan** dan kawasan perikanan"* (ms. 263) | ✓ 6 |
| G | Planet Nine: *"Walau bagaimanapun, penemuan ini **masih lagi dalam peringkat kajian**"* (ms. 251) | ✓ |
| H | Pluto: *"Pada tahun 2006, Pluto tidak lagi dikenali sebagai sebuah planet … sebaliknya dikenali sebagai **planet kerdil**"* (ms. 252) | ✓ |
| I | 1 A.U. = 1.5 × 10⁸ km; 1 tahun cahaya = 9.5 × 10¹² km; light 300 000 km setiap saat; light year defined as *"jarak yang ditempuh cahaya"*; **no** memorisation demand anywhere | ✓ |

**Internal source conflicts — both independently confirmed:**

| Quantity | Jadual 12.2 | Jadual 12.3 / 12.5 | Prose |
|---|---|---|---|
| Zuhal / Neptun distance | 1 429 / 4 504 | 1 427 / 4 497 | — |
| Zuhrah temperature | 457 °C | 462 °C | "sekitar 460 °C" (ms. 254) |

---

## FINDINGS

```
CRITICAL: 1
HIGH:     0
MEDIUM:   1
LOW:      2
```

### CRITICAL — C-01 · "not as high as Earth's" survives in the mind map and one flashcard

The remediation removed *"graviti lebih lemah"* / *"weaker gravity"*, and those are genuinely gone.
But the **same misconception is still present in different words**, on learner-facing surfaces, in
**both streams** — **9 occurrences**:

| File | Node / card | Text |
|---|---|---|
| `mindmap-bm.ts` | `c1-4-2-6` | "Zuhal, Uranus, Neptun: graviti **tak setinggi Bumi** (ketumpatan rendah walau jisim tinggi)" |
| `mindmap-bm.ts` | ×3 per-planet | "Graviti **tidak setinggi Bumi** walaupun jisim tinggi (ketumpatan rendah)" |
| `mindmap-dlp.ts` | `c1-4-2-6` | "Saturn, Uranus, Neptune: gravity **not as high as Earth's** (low density despite high mass)" |
| `mindmap-dlp.ts` | `c1-3-6-5`, `c1-3-7-6`, `c1-3-8-4` | "Gravity **not as high as Earth's** despite high mass (low density)" |
| `flashcards-bm.ts` | 1 card | front: "Mengapakah graviti Zuhal, Uranus dan Neptun **tidak setinggi Bumi** walaupun berjisim tinggi?" · back: "Kerana planet 'gas gergasi' ini mempunyai ketumpatan yang rendah." |

**Why this is wrong.** *"tidak setinggi Bumi"* / *"not as high as Earth's"* asserts the gravity is
**lower than** Earth's. The source says *"tidak terlalu tinggi"* — not *excessively* high. These are
different claims, and the stronger one is false for two of the three planets named:

| Planet | Value | vs Earth 9.8 |
|---|---|---|
| Zuhal | 10.44 m s⁻² | **higher** ✗ |
| Uranus | 8.69 m s⁻² | lower ✓ |
| Neptun | 11.15 m s⁻² | **higher** ✗ |

**It also contradicts Chapter 12's own comparison table**, which correctly renders Zuhal as
`10.44 (1.07 × Bumi)` and Neptun as `11.15 (1.14 × Bumi)`. A learner moving between the comparison
table and the mind map is shown two incompatible statements about the same planets.

The BM flashcard is worse than neutral: its question presupposes the false premise and its answer
*reinforces* it ("because gas giants have low density") rather than correcting it. It has **no DLP
counterpart**, so it is also a BM/DLP mismatch.

Under §27 this is CRITICAL: wrong science, and contradictory learner-facing content.

### MEDIUM — M-01 · the shipped Saturn guard is narrower than the defect class it claims to lock

`chapter-12-remediation.test.tsx:217-218` asserts against
`(graviti lebih lemah|graviti lebih rendah|weaker gravity|lower gravity)`. The alternation does not
include `tidak setinggi` or `not as high as`, so the guard passes while nine instances of the same
misconception ship. The test suite is green and the defect is live — the guard should key on the
claim, not on one phrasing of it.

### LOW

**L-01 · Shared Radix tab triggers measure 28 px.** Three triggers in section 3, at every width.
Per §17 they were evaluated functionally: `aria-selected` moves correctly, the Venus panel switches
("Berputar dari timur ke barat"), keyboard focus moves, nothing overlaps or clips, and they are
operable on mobile. Recorded as **shared accessibility debt**, not a Chapter 12 blocker. The
primitive is used by Chapters 5–11 and was correctly left untouched.

**L-02 · Dead `notes-bm.ts` / `notes-dlp.ts`.** Registered but unreachable — the interactive branch
at `routes/notes.tsx:2010` precedes the notes branch at `:2152`. Cannot influence learner output.
Architectural cleanup only; not a blocker, and not deleted during this read-only gate.

---

## VERIFIED RESULTS

```
SATURN GRAVITY:
FAIL

SATURN WEAKER-GRAVITY CLAIMS:
9        (0 of the old phrasing; 9 of "tidak setinggi Bumi" / "not as high as Earth's")

PLANET COMPARISON:
PASS

COMPARISON CHARACTERISTICS:
10/10

12.1.3 RELATIONSHIPS:
PASS     (in the interactive; the mind map's density-gravity node carries C-01)

HYPOTHETICAL SITUATIONS:
4/4

EARTH HABITABILITY:
6/6

ECOLOGICAL FOOTPRINT:
6/6

PLANET NINE:
PASS

PLUTO:
PASS

AU / LIGHT YEAR:
PASS

CALCULATOR:
PASS

BM CALCULATOR LOCALISATION:
PASS

DLP CALCULATOR:
PASS

SOURCE CONFLICT HANDLING:
PASS

TOTAL LEARNER SECTIONS:
5

FAKE 12.2:
0

QUIZ SP DISTRIBUTION:
12.1.1: 4
12.1.2: 9
12.1.3: 9
12.1.4: 4
12.1.5: 4

QUIZ OPTION DISTRIBUTION:
A: 8
B: 8
C: 7
D: 7

FLASHCARDS:
FAIL     (65/65, parity in count, but one BM card carries C-01 and has no DLP counterpart)

MIND MAP:
FAIL     (carries 8 of the 9 C-01 occurrences)

SOURCE LEAKAGE:
0

INTERACTIONS:
TOTAL: 46
INERT: 0
MISLEADING: 0

1280:
PASS

430:
PASS

390:
PASS

375:
PASS

CH12 TESTS:
PASS (38/38) — but see M-01: the Saturn guard does not cover the live defect

SCIENCE F2 TESTS:
PASS (1089/1089 across 39 files)

TYPECHECK:
PASS (0 errors)

BUILD:
PASS (exit 0)

CHAPTER 8 CHANGED:
NO       (0 files)

CHAPTER 11 CHANGED:
NO       (0 files)
```

### What was independently confirmed as correct

- **Structure** — 5 sections, every one numbered `12.1`, both streams; titles map 1:1 to the five
  SPs; `reflectionItems` = 5; self-check heading renders "Semak diri — 12.1". Zero fabricated 12.2.
- **Live path** — `registry.ts:3686-3712` → `sciF2InteractiveData` → `notes.tsx:2010` → `:2121`
  (`chapter === 12`) → `ScienceF2Chapter12NotesBlock` (alias of the shared renderer). The dead
  `notes-*.ts` are shadowed and do not reach a learner.
- **Comparison data** — every row re-checked against Jadual 12.2 re-extracted here: size, distance,
  temperature, density, satellites and orbital period all match exactly. Gravity is given both
  absolute and `× Bumi`, as the Catatan requires.
- **The Venus/Mars surface trap** — independently re-extracted positionally by text-matrix
  x-coordinate. Utarid = "Tidak berwarna…", **Zuhrah = jingga (orange)**, **Marikh = kemerahan
  (reddish)**, gas giants = "Tidak mempunyai permukaan yang keras". The shipped mapping is correct.
- **Source conflicts** — the comparison table reproduces Jadual 12.2 (457 °C, 1 429, 4 504); the
  12.1.3 discussion reproduces Jadual 12.3 (462 °C) and does not repeat 457. `1 427` / `4 497` never
  appear in the comparison table. No contradictory pair is shown to a learner, and no conflict note
  is exposed (the only mentions are file-header code comments, which do not render).
- **Calculator** — recomputed independently in-browser: 1.43 × 10⁹ km → **9.53 A.U. · 1.51e-4 ly**,
  matching the textbook's worked Example 2 (9.5 A.U., 1.51 × 10⁻⁴ ly). Reverse direction works
  (1 ly → 9.50e+12 km). Zero input produces no NaN/Infinity. BM renders "Jarak (km)"; DLP renders
  "Distance (km)".
- **Quiz** — reclassified item-by-item without trusting the reported counts; the distribution and
  the 8/8/7/7 option spread both reproduce exactly. 30/30 four-option items, indices in range, no
  duplicate options, BM/DLP id and answerIndex parity.
- **Interactions** — 46 controls exercised in-browser with full pointer sequences for Radix. Tabs,
  accordions, planet spheres, the characteristic selector, self-check reveals and the mini quiz all
  change state correctly. **0 inert, 0 misleading.**
- **Responsive** — all five sections at 1280/430/390/375: no page-level horizontal scroll, no
  clipping, and zero overflow outside the section rail, which is `overflow-x: auto` by design and
  was verified scrollable with section 5 reachable.

---

## MINIMUM BLOCKER REMEDIATION

Only C-01 blocks the freeze. The minimum required before re-running this gate:

1. **Replace the 9 occurrences** of *"tidak setinggi Bumi"* / *"not as high as Earth's"* with the
   source's own claim, *"tidak terlalu tinggi berbanding Bumi"* / *"not much higher than Earth's"* —
   8 mind-map nodes (4 BM, 4 DLP) and 1 BM flashcard.
   **Take care with the per-planet nodes:** the collective statement is safe, but stated of a single
   planet it must match that planet's value — Uranus (8.69) genuinely *is* below Earth's 9.8, while
   Zuhal (10.44) and Neptun (11.15) are above.
2. **Fix the BM flashcard** so its question does not presuppose the false premise and its answer
   corrects rather than reinforces it, and restore a DLP counterpart so the decks stay in parity.
3. **Widen the guard** at `chapter-12-remediation.test.tsx:217-218` to cover `tidak setinggi` and
   `not as high as`, so the test locks the claim rather than one phrasing of it.

Nothing else needs to change. The rest of the chapter — structure, comparison data, relationships,
hypotheticals, habitability, ecological footprint, Planet Nine, Pluto, the calculator, the quiz, the
conflict handling and the responsive behaviour — passed independent verification.

---

```
FINAL VERDICT:
FAIL — HUMAN REVIEW REQUIRED
```

Chapter 12 **may not be frozen** in its current state. Re-run this gate after the three items above.
