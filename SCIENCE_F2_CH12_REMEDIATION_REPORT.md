# SCIENCE FORM 2 — CHAPTER 12 (SISTEM SURIA / SOLAR SYSTEM)
# TARGETED REMEDIATION REPORT

**Date:** 2026-09-01
**Follows:** `SCIENCE_F2_CH12_DEEP_AUDIT_REPORT.md` (FAIL — 1 CRITICAL / 5 HIGH / 7 MEDIUM / 5 LOW)
**Sources:** `audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf` only
**Scope:** the live Chapter 12 learner path (BM + DLP) plus the shared components it needs.
Chapter 8 and Chapter 11 were not touched.

---

## 1. THE CRITICAL FIX

Both streams taught that Saturn has weaker gravity than Earth on a card that displayed
**Saturn 10.44 m s⁻²** beside **Earth 9.8 m s⁻²**. The textbook (ms. 259) says the gas giants'
gravity is *"tidak terlalu tinggi berbanding dengan Bumi"* — **not too high**, never *weaker*. Of the
four gas giants only Uranus (8.69) is actually below Earth.

All four occurrences are gone, replaced with the source's own framing:

> **BM** — "Walaupun Zuhal, Uranus dan Neptun mempunyai jisim yang sangat tinggi, tarikan graviti
> planet-planet ini **tidak terlalu tinggi berbanding Bumi** kerana planet gergasi bergas mempunyai
> ketumpatan yang rendah."
>
> **DLP** — "Although Saturn, Uranus and Neptune have very high masses, the gravitational attraction
> of these planets is **not much higher than Earth's** because gas giants have low density."

A guard now scans **all eight** Chapter 12 data files for any "Saturn … weaker/lower gravity than
Earth" phrasing in either language, so it cannot come back through a deck either.

---

## 2. STRUCTURE — FIVE SECTIONS, ALL UNDER 12.1

The chapter had two sections for five Standard Pembelajaran, the second numbered **12.2** — a
Standard Kandungan that does not exist. The DSKP has one SK, and the textbook uses "12.2" only for
*Rajah 12.2*, *Jadual 12.2*, *Gambar foto 12.2* and *Aktiviti 12.2*.

| # | Section (BM / DLP) | SP |
|---|---|---|
| 1 | Jarak dalam Sistem Suria / Distance in the Solar System | 12.1.1 |
| 2 | Membandingkan Planet / Comparing the Planets | 12.1.2 |
| 3 | Hubungan antara Ciri Planet / Relationships between Planetary Characteristics | 12.1.3 |
| 4 | Situasi Hipotetikal Sistem Suria / Hypothetical Solar System Situations | 12.1.4 |
| 5 | Bumi sebagai Planet untuk Kehidupan / Earth as a Planet for Life | 12.1.5 |

Every section is numbered **12.1**, so the self-check headings now read "Semak diri — 12.1"
throughout. `reflectionItems` went from 4 to **5**, one per SP, matching the source's Refleksi
Kendiri (ms. 266).

---

## 3. SP 12.1.2 — ALL TEN COMPARISON CHARACTERISTICS

Previously 5 of 10, with no table. A new shared block (`planetComparison` +
`PlanetComparisonTable`) shows **one characteristic at a time across all eight planets, with Earth
marked as the reference** — the source's Jadual 12.2 is ten rows by eight columns and is unusable
reproduced whole on a phone. The tap-to-open planet profiles remain as the detail view.

| DSKP characteristic | Before | Now |
|---|---|---|
| Saiz | ✓ | ✓ |
| Jarak | ✓ | ✓ |
| Suhu | ✗ | ✓ 167 / 457 / 14 / −55 / −153 / −185 / −214 / −225 °C |
| Ketumpatan | ✗ | ✓ 5.4 / 5.2 / 5.5 / 3.9 / 1.3 / 0.7 / 1.27 / 1.6 g cm⁻³ |
| Tarikan graviti **relatif kepada Bumi** | partial (absolute only) | ✓ absolute **and** × Bumi |
| Lapisan atmosfera | ✗ | ✓ full compositions |
| Keadaan permukaan | ✗ | ✓ |
| Arah **dan kelajuan** putaran | direction only | ✓ direction · km/j · axial period |
| Peredaran pada orbit | ✓ | ✓ |
| Satelit semula jadi | ✓ | ✓ |

**A transcription trap worth recording.** Read linearly, the PDF returns the surface-condition row as
five fragments for four planets, which would have mis-assigned Venus and Mars. The row was
re-extracted **positionally** by text-matrix x-coordinate (Utarid x123, Zuhrah x206, Bumi x305,
Marikh x397) to fix the column mapping before any value was authored.

---

## 4. SP 12.1.3 — THE CORRECT RELATIONSHIP

NotebookLM's substitution of *"Jisim dan graviti"* for the DSKP's *"Ketumpatan dan tarikan graviti"*
was rejected. The card states the textbook's actual sentence — gravity depends on **mass and
density** — and works through all four of the book's cases. All four Catatan relationships are
present: temperature ↔ distance (four accordions), density ↔ gravitational attraction,
distance/time/speed, and direction of rotation (three tabs, Venus **and** Uranus as the exceptions).

**Venus / Mercury.** Taught as the qualitative relationship the source supports — Venus is hotter
than Mercury despite being farther out, because its thick CO₂ atmosphere traps heat. "Closest planet
= hottest" is never stated as a rule, and a guard asserts it cannot be.

---

## 5. THE TWO INTERNAL SOURCE CONFLICTS

The textbook disagrees with itself, so each figure is taken from the table being reproduced and the
disputed numbers are not repeated in prose.

| Quantity | Jadual 12.2 (ms. 256) | Jadual 12.3 / 12.5 (ms. 258–259) | Prose | Used where |
|---|---|---|---|---|
| Zuhal distance | **1 429** juta km | 1 427 juta km | — | 1 429 in the comparison table (reproducing Jadual 12.2) |
| Neptun distance | **4 504** juta km | 4 497 juta km | — | 4 504 in the comparison table |
| Zuhrah temperature | **457 °C** | 462 °C | "sekitar 460 °C" (ms. 254) | 457 in the comparison table; **462** in the §12.1.3 greenhouse discussion, which reproduces Jadual 12.3 |

Section 1's distance table reproduces **Jadual 12.1** (Aktiviti 12.1), whose own km values differ
again (Neptun 4.5 × 10⁹). Its A.U. column carries the five printed values (0.39, 0.72, 1.0, 9.5, 30)
plus three derived with the textbook's own printed formula from the textbook's own km values —
the derivation reproduces all five printed values exactly, which is how it was validated.

No learner is ever shown two contradictory values for the same quantity, and the conflict is not
surfaced to learners.

---

## 6. SP 12.1.4 — ALL FOUR PROMPTS

Only the stop-rotating case was covered. All four are now present, and the distinction between
printed conclusions and open questions is preserved:

| Prompt | Treatment |
|---|---|
| Bumi berhenti / berputar perlahan | **Printed conclusions** — the four effects from Rajah 12.4 (deserts, long day/night, tides, extreme cold) |
| Mengapa 2 bulan atau lebih? | **Guided reasoning** — the satellite counts are supplied; learners look for the relationship with size, mass and gravity and state their reasoning. The textbook gives no mechanism, so none is invented |
| Rupa bentuk Bumi dari Bulan | **Guided reasoning** on the printed facts: the Moon's 27-day tidal locking, and Earth being four times the Moon's size |
| Adakah Bumi mempunyai fasa? | **Left as a question to discuss**, as the textbook leaves it. A guard asserts the "to discuss" framing survives |

---

## 7. SP 12.1.5 — HABITABILITY AND THE SIX AREAS

The six habitability flip cards already matched **Rajah 12.7** one-for-one and were preserved
unchanged. Neither *habitable zone* nor *magnetic field* appears anywhere in the source, and a guard
now forbids both.

The six ecological-footprint areas (ms. 263) were the real gap. NotebookLM listed five, dropping
*kawasan penternakan*. All six now ship as tap-to-open segments:

**BM** — Jejak karbon · Kawasan binaan · Hutan · Kawasan pertanian · **Kawasan penternakan** · Kawasan perikanan
**DLP** — Carbon footprint · Built-up land · Forest · Cropland · **Grazing land** · Fishing grounds

Also added: the definition, the consequence of exceeding Earth's capacity, and *"jejak ekologi
berbeza daripada sebuah negara dengan negara yang lain"*.

**An audit correction.** The audit reported the six areas "missing from every surface". That was
right for the interactive but **wrong for the mind map**, which already had six — under invented
terms (*"Kawasan rawatan sisa karbon dioksida"*, *"Kawasan pembinaan"*, *"Kawasan ladang"*). The
audit's grep for *penternakan* missed them. They now use the exact source terms in both streams.
Two other audit greps were similarly too narrow: the mind map's hypothetical branch exists under
*"Hipotesis"* (not *hipotet*), and the mind map already stated the gravity relationship correctly.

---

## 8. THE CALCULATOR

`AuLightYearCalculator` hardcoded `Distance (km)` and `Enter a distance` and took no `lang`, so the
BM stream rendered English. It now draws its chrome from `figure-copy.ts` — the established single
source of truth for shared figure copy — and the renderer passes `lang`. One shared component; no
duplicated logic.

Also addressed: a **km / A.U. / ly unit selector**, so the conversion runs in both directions as the
DSKP Catatan requires (previously km-only, while Sumatif Q3 asks ly → km); input height raised from
38 px to `min-h-11`; and `defaultKm` changed to `150000000` so the default now renders as **1.0
A.U.**, agreeing with its own instruction.

Verified numerically in-browser: 1.43 × 10⁹ km → **9.53 A.U. · 1.51e-4 ly**, matching the textbook's
worked Example 2 (9.5 A.U., 1.51 × 10⁻⁴ ly).

---

## 9. WHAT WAS DELIBERATELY LEFT ALONE

- **Planet Nine** — already correctly hedged in both streams; preserved verbatim and guarded.
- **Pluto** — already correct (2006, dwarf planet); preserved.
- **Aktiviti 12.3** — no terraforming or Mars enrichment existed to remove (0 occurrences); nothing
  was added. Europa remains where the source puts it, in a KBAT question, not in the activity.
- **Working interactions** — the audit found 0 inert controls. Tabs, accordions, planet spheres,
  self-checks and the mini quiz were not rebuilt.
- **The 26 correct quiz items** — answer text preserved exactly (verified 30/30 through the
  reordering).

---

## 10. VERIFICATION

```
CRITICAL FIXED:
1/1

HIGH FIXED:
5/5

MEDIUM FIXED:
6/7

LOW FIXED:
4/5

TOTAL SECTIONS:
5

TOTAL SK:
1

TOTAL SP:
5

JADUAL 9:
NONE

TEXTBOOK EXPERIMENTS:
0

SATURN GRAVITY:
PASS

PLANET COMPARISON:
PASS

10 COMPARISON CHARACTERISTICS:
PASS

12.1.3 RELATIONSHIPS:
PASS

4 HYPOTHETICAL SITUATIONS:
PASS

EARTH HABITABILITY:
PASS

6 ECOLOGICAL FOOTPRINT AREAS:
PASS

PLANET NINE:
PASS

PLUTO:
PASS

AU / LIGHT YEAR:
PASS

BM CALCULATOR:
PASS

DLP CALCULATOR:
PASS

QUIZ COVERAGE:
12.1.1 = 4   12.1.2 = 9   12.1.3 = 9   12.1.4 = 4   12.1.5 = 4   (30 items)
answer positions {0:8, 1:8, 2:7, 3:7} — was {0:3, 1:18, 2:9, 3:0}
difficulty 10 Easy / 10 Medium / 10 Hard

FLASHCARD COVERAGE:
65 per stream (was 60). Five added: the six ecological areas, the Moon's tidal
locking, Earth-to-Moon size ratio, the four stop-rotating effects, and an explicit
Saturn-gravity correction card. Two accuracy fixes: "Demos" -> "Deimos", and the
speed-of-light wording.

MIND MAP:
PASS — 148 nodes per stream (was 144). Six areas retermed to the source, the
anomaly node added, and the three missing hypothetical prompts added.

CH12 TESTS:
PASS (38/38, new file)

SCIENCE F2 TESTS:
PASS (1089/1089 across 39 files)

TYPECHECK:
PASS

BUILD:
PASS

ACADEMIC SOURCE LEAKAGE:
0 / 0

CHAPTER 11 CHANGED:
NO

CHAPTER 8 CHANGED:
NO
```

### Not fixed, and why

**M-05 (partial) — Radix tab triggers are 28 px tall.** Measured at all four widths in section 3.
These come from the shared `components/ui/tabs` primitive used by Chapters 5–11 as well; raising the
height there is a cross-chapter visual change and outside a Chapter 12 targeted remediation. Flagged
for a separate shared-component pass.

**L-04 — the dead `notes-bm.ts` / `notes-dlp.ts` remain.** They are shadowed by the interactive
branch at `routes/notes.tsx:2010` and reach no learner. Removing a registry entry is a structural
change beyond this remediation's scope.

### Notes

- **Responsive QA** at 1280 / 430 / 390 / 375, all five sections each: no page-level horizontal
  scroll, no clipping, no content overflow. The section rail overflows its own box at ≤430 and is
  `overflow-x: auto` — verified scrollable with step 5 fully reachable, which is the shell's
  designed behaviour for multi-section chapters (Chapter 8 has 11).
- **`src/routeTree.gen.ts`** differs only because `npm run build` regenerated it for a pre-existing
  unrelated route (`command-center-preview`). Not a Chapter 12 academic modification.
- **Shared files touched** (all additive): `interactive-types.ts` (new `PlanetComparisonBlock`),
  `ScienceF2InteractiveNotesBlock.tsx` (renders it; passes `lang` to the calculator),
  `AuLightYearCalculator.tsx`, `figure-copy.ts`, and the new `PlanetComparisonTable.tsx`.

---

```
CHAPTER 12 REMEDIATION:
PASS
```

**Chapter 12 is NOT frozen.** An independent final release gate must run before any freeze.
