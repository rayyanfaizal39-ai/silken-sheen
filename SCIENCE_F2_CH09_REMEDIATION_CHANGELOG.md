# Science Form 2 — Chapter 9 (Haba / Heat)
# TARGETED REMEDIATION CHANGELOG

Addresses `SCIENCE_F2_CH09_DEEP_AUDIT_REPORT.md` (verdict: FAIL — 0 CRITICAL,
5 HIGH, 7 MEDIUM, 4 LOW). Every fix was re-verified against the DSKP, textbook and
errata rather than taken from the audit's wording.

**Live path only.** `notes-bm.ts` / `notes-dlp.ts` show **0 modifications** —
confirmed by `git status`. No dead notes were revived.

**No Jadual 9 requirement was invented.** Chapter 9 has none; the two textbook
experiments are taught as investigations without being framed as compulsory.

---

## Sections before / after

| | Before | After |
|---|---|---|
| Interactive sections | **4** | **9** |
| SVG instructional figures | **0** | **6** |
| Interactive affordance badges | **0** | **6** |
| Interactive controls (per stream) | 34 | **70** |
| Chapter 9 tests | **0** | **83** |
| Learner-facing leakage | **44** | **0** |

| # | BM | DLP | SK |
|---|---|---|---|
| 1 | Haba dan Suhu | Heat and Temperature | 9.1 |
| 2 | Konduksi | Conduction | 9.2 |
| 3 | Perolakan dan Sinaran | Convection and Radiation | 9.2 |
| 4 | Bayu Laut dan Bayu Darat | Sea Breeze and Land Breeze | 9.2 |
| 5 | Konduktor dan Penebat Haba | Heat Conductors and Heat Insulators | 9.2 |
| 6 | Pengembangan dan Pengecutan Jirim | Expansion and Contraction of Matter | 9.3 |
| 7 | Kegunaan Pengembangan dan Pengecutan | Uses of Expansion and Contraction | 9.3 |
| 8 | Penyerapan dan Pembebasan Haba | Heat Absorption and Emission | 9.4 |
| 9 | Konsep Bangunan Hijau | The Green Building Concept | 9.4 |

Same count, same order, same concepts. Back / Next / progress architecture untouched.

---

## Findings

### H-01 — thermometer said to measure *heat* · **FIXED**

| | Before | After |
|---|---|---|
| BM | "berguna untuk **mengukur haba**" | "Ketinggian turus merkuri… digunakan untuk **mengukur suhu**" |
| DLP | "useful for **measuring heat**" | "used to **measure temperature**" |

The textbook's *"konduktor haba"* framing is source-backed (p.211), so it was kept;
only the false claim about what a thermometer measures was replaced. Textbook p.211
says mercury *"dapat mengesan perubahan suhu"* — detects **temperature** change.

Both language cards now carry an explicit line — *"Ingat: termometer mengukur suhu,
bukan haba"* / *"Remember: a thermometer measures temperature, not heat"* — and a new
mini-quiz item tests the distinction directly. A guard rejects
`mengukur haba | measures heat | measuring heat` on **all eight live surfaces**.

### H-02 — SP 9.4.3 Green Building missing from the notes · **FIXED**

Section 9 is new, built from **textbook p.218** (reduce the impact of rapid development
on environment and health; high energy efficiency via solar/renewable energy; good
water-flow, air-circulation and lighting systems; recycled materials) and the **DSKP
9.4.3 Catatan** (energy efficiency, water efficiency, sustainable site, building
materials, innovation; design a home that needs less energy to cool or heat).

Four tabs plus two checks, and each criterion is tied back to a heat concept from the
chapter — insulation reducing heat flow, light surfaces absorbing less, convection
carrying warm air out. **No QR link or URL is exposed** (the p.218 QR is dead per the
errata); a guard asserts no `https?://` reaches a learner.

### H-03 — 44 learner-facing textbook references · **FIXED (0 remaining)**

| Surface | Before | After |
|---|---|---|
| interactive bm / dlp | 0 / 0 | 0 / 0 |
| quizzes bm / dlp | 7 / 7 | **0 / 0** |
| flashcards bm / dlp | 11 / 11 | **0 / 0** |
| mindmap bm / dlp | 4 / 4 | **0 / 0** |

Every reference was **reworded, not deleted** — the science is intact and the activity
is now named by what it is:

| Was | Now |
|---|---|
| "Dalam Eksperimen 9.2, dua tin susu…" | "Dalam penyiasatan permukaan gelap dan cerah, dua tin susu…" |
| "Bagaimanakah Aktiviti 9.1 menunjukkan sinaran?" | "Bagaimanakah demonstrasi balang vakum menunjukkan sinaran?" |
| "In Experiment 9.1, which material…" | "In the heat-insulator investigation, which material…" |
| "How does Activity 9.4 show…" | "How does the expansion demonstration show…" |

54 replacements across the six decks.

### H-04 — no instructional visuals · **FIXED (6 added)**

### H-05 — compressed structure · **FIXED** — 4 → 9 sections.

### MEDIUM / LOW

| ID | Status | Note |
|---|---|---|
| M-01 conductor/insulator definitions | **FIXED** | Both now stated in §5, from textbook p.211 |
| M-02 conduction particle mechanism | **FIXED** | Vibration + collision now in the conduction card and figure |
| M-03 convection density buried in a hint | **FIXED** | Density chain now in the concept card itself |
| M-04 bimetallic copper + steel | **FIXED** | Now copper + **iron**, matching Rajah 9.14 |
| M-05 quiz skew 4/25/1/0 | **FIXED** | Now **8/8/7/7** |
| M-06 no tests / leakage suite gap | **FIXED** | 83 tests + suite extended to Chapter 9 |
| M-07 "kasar" for surfaces | **FIXED** | Now "kusam" (dull), matching DSKP 9.4.1 |
| L-01 roast-chicken foil claim | **FIXED** | Replaced with the source-supported thermos-flask question (textbook p.218) |
| L-02 bimetallic room-temperature state | **FIXED** | The open-circuit state is now taught and drawn |
| L-03 only 4 check questions | **FIXED** | 4 → **18** (two per section) |
| L-04 experiments not staged | **PARTIAL** | Both investigations are described in the notes and assessed; neither is staged as a full structured experiment — correctly, since neither is a Jadual 9 requirement |

---

## SP coverage after remediation

| SP | Before | After | Where |
|---|---|---|---|
| 9.1.1 | COVERED | **COVERED** | §1, Jadual 9.1 comparison + thermal equilibrium |
| 9.2.1 conduction | PARTIAL | **COVERED** | §2, vibration/collision + figure |
| 9.2.1 convection | PARTIAL | **COVERED** | §3, density chain + convection current |
| 9.2.1 radiation | COVERED | **COVERED** | §3, no medium, vacuum |
| 9.2.2 | COVERED | **COVERED** | §4, both breezes + figure |
| 9.2.3 | PARTIAL | **COVERED** | §5, both definitions + matcher |
| 9.3.1 | COVERED | **COVERED** | §6, three states + particle figure |
| 9.3.2 | **INCORRECT** | **COVERED** | §7, thermometer corrected, copper + iron, rails, rollers |
| 9.4.1 / 9.4.2 | COVERED | **COVERED** | §8, absorption and emission kept separate |
| 9.4.3 | **MISSING** | **COVERED** | §9, Green Building |

```
COVERED 9 | PARTIAL 0 | MISSING 0 | INCORRECT 0 | NOT_RENDERED 0 | CONFUSING 0
```

---

## Visuals added

Six compact instructional SVGs, no decorative art. Each derives its geometry from its
own data, so the drawing cannot contradict the concept — the discipline that caught
Chapter 7's reversed arrows.

| # | Component | § | What stops it going wrong | Measured live |
|---|---|---|---|---|
| 1 | `ConductionDiagram` | 2 | Particle x-positions are fixed; only vibration marks and the energy front change | positions identical across stages: `66, 89.5, …, 254` |
| 2 | `ConvectionRadiation` | 3 | Convection is one closed loop; radiation draws **no medium** between source and receiver | loop + labelled empty space |
| 3 | `BreezeDiagram` | 4 | All four arrows derived from `warmerSide`, so day and night cannot point the same way | sea: wind→land `rotate(180)`; land: wind→sea `rotate(0)` — opposite ✔ |
| 4 | `ExpansionParticles` | 6 | One shared particle radius for every state and temperature | radius `5` in both; span 87 heated vs 68 cooled ✔ |
| 5 | `BimetallicStrip` | 7 | Faster metal drawn on the outside of the bend; both layers share one curve | room `Q142.5,58` flat → heated `Q142.5,69.9 … 92` bends to the contact ✔ |
| 6 | `SurfaceComparison` | 8 | Dark can always gets more arrows; only direction flips between absorb and emit | arrow rotations differ between modes ✔ |

All six carry the shared "✨ Interaktif / Tekan konsep untuk meneroka" badge
(DLP: "Interactive / Tap a concept to explore").

---

## Quiz changes

| | Before | After |
|---|---|---|
| Questions | 30 / 30 | 30 / 30 |
| Easy / Medium / Hard | 10 / 10 / 10 | 10 / 10 / 10 |
| Answer positions A/B/C/D | **4 / 25 / 1 / 0** | **8 / 8 / 7 / 7** |

Rebalanced by swapping the key with whichever option occupied the target slot — only
the **order** changed. Verified against a pre-change snapshot:

```
BM : answers preserved 30/30 | option sets intact 30/30 | histogram {0:8, 1:8, 2:7, 3:7}
DLP: answers preserved 30/30 | option sets intact 30/30 | histogram {0:8, 1:8, 2:7, 3:7}
BM/DLP answerIndex parity: PASS
```

Guessing option B now scores 27%, not 83%. Beyond the reshuffle, only the leakage
rewording and the terminology fixes touched question text.

---

## Flashcards and mind map

Aligned with the remediated notes: thermometer wording, copper + iron, "kusam" not
"kasar", zero source numbering. Counts unchanged at 60 / 60 flashcards and 154 / 154
mind-map nodes with ids byte-identical across languages.

One card and one mind-map node were **replaced rather than reworded**: the
roast-chicken aluminium-foil example, which is not in the source and sat awkwardly
beside AcadeMY's own correct statement that foil is a **conductor** (in the insulation
investigation it is the poorest of the three materials). Both now ask about the
**thermos flask wall**, which the textbook does cover (p.218 Latihan Formatif 9.4).

---

## Tests

New: `src/content/form2/science/chapter-9/chapter-9-remediation.test.tsx` — **83 tests**.

Guards: 9 SP teaching homes · thermometer never measures heat, on all eight surfaces ·
heat/temperature units kept separate · conduction vibration + collision + no migration ·
convection density in the concept card · radiation no medium and not described as
particle movement · sea/land breeze warmer-side derivation and opposite arrows ·
conductor and insulator definitions · aluminium kept on the conductor side · no
roasting claim · three states of expansion · particles do not grow · copper + iron ·
bend toward the contact · absorption and emission separate and not reversed · Green
Building present with source criteria and no URL · leakage 0 · balanced quiz spread ·
BM/DLP parity · every figure offers more than one choice.

`learner-facing-leakage.test.ts` extended to Chapter 9: 64 → **72 tests**.

*Three of my own assertions failed on first run and were corrected, not the content:*
the interactive badge's lucide icon also draws `<circle>` elements, which inflated two
particle counts (now scoped to the figure's own SVG); the third correctly caught the
real roast-chicken card, which was then fixed.

```
TYPECHECK              PASS   tsc --noEmit, exit 0
BUILD                  PASS   npm run build, exit 0
CHAPTER 9 TESTS        PASS    83 / 83
SCIENCE F2 TESTS       PASS   693 / 693   (was 602)
LEAKAGE SUITE          PASS    72 / 72    (was 64)
NOTES + GEOGRAPHY      PASS    31 / 31
FULL SUITE             2209 passed | 8 failed (195 files)
```

The 8 failures are pre-existing and unrelated, unchanged in identity and count:
onboarding UI, billing, invoice PDF, four BM mind-map registry tests, Math F2 C1 DLP.
**0 are Chapter 9. 0 are Science Form 2.**

---

## Browser QA

Mounted from the real registry entry, both streams, every control exercised. Radix tab
triggers were driven with a full pointer sequence — a bare synthetic `click()` does not
switch them, which is what made the audit's first probe mis-read the tabs as dead.

| Width | Page overflow | Figures | Clipped | Scroll in own container | Arrowheads hidden | SVG labels hidden |
|---|---|---|---|---|---|---|
| Desktop 1280 | **0 px** | 6 | 0 | 0 | 0 | 0 |
| 430 | **0 px** | 6 | 0 | 0 | 0 | 0 |
| 390 | **0 px** | 6 | 0 | 0 | 0 | 0 |
| 375 | **0 px** | 6 | **0** | 6 | 0 | 0 |

At 375 px the figures scroll inside their own `overflow-x-auto` wrapper rather than
clipping — the pattern Chapter 7 and 8 gates both accepted.

**Interactions:** 70 controls per stream, exact parity, and identical SVG counts per
section. 19 flagged by a sequential probe were re-tested in isolation and are all
artefacts: 8 already-selected toggles (`aria-pressed="true"`, a no-op by design), 5
matcher options after a pair is made, and 6 mini-quiz options after the question is
answered. Representatives of each class respond on a fresh mount — the matcher pairs,
and the thermometer quiz item returns *"Termometer mengukur suhu — darjah kepanasan
atau kesejukan — dan bukan kuantiti…"*. **0 genuinely dead controls.**

---

## Open item

**L-G1 · LOW · shared tab triggers are 28 px tall.** The four Green Building tabs use
the shared Radix `TabsTrigger`, which renders at 28 px — below a 40 px touch target.
This is pre-existing shared-component styling (the chapter's original breeze and
surface tabs had the same height) and affects every chapter using the `tabs` block, so
it is recorded rather than patched locally. All other controls are ≥ 40 px.

---

## Files changed

**New components (6):** `ConductionDiagram`, `ConvectionRadiation`, `BreezeDiagram`,
`ExpansionParticles`, `BimetallicStrip`, `SurfaceComparison`.

**Modified:** `interactive-types.ts` (6 new block types),
`ScienceF2InteractiveNotesBlock.tsx` (wiring),
`chapter-9/interactive-{bm,dlp}.ts` (rewritten),
`chapter-9/{quizzes,flashcards,mindmap}-{bm,dlp}.ts` (targeted edits),
`learner-facing-leakage.test.ts` (extended).

**New test:** `chapter-9/chapter-9-remediation.test.tsx`.

**Untouched:** `chapter-9/notes-{bm,dlp}.ts` (dead), every other chapter's content.

---

CHAPTER 9 REMEDIATION STATUS:
READY FOR RELEASE GATE

CRITICAL OPEN:
0

HIGH OPEN:
0

MEDIUM OPEN:
0

LOW OPEN:
2

SP COVERAGE:
COVERED: 9
PARTIAL: 0
MISSING: 0
INCORRECT: 0
NOT_RENDERED: 0
CONFUSING: 0

THERMOMETER:
PASS

HEAT vs TEMPERATURE:
PASS

CONDUCTION:
PASS

CONVECTION:
PASS

RADIATION:
PASS

SEA/LAND BREEZE:
PASS

CONDUCTORS/INSULATORS:
PASS

EXPANSION/CONTRACTION:
PASS

BIMETALLIC STRIP:
PASS

ABSORPTION/EMISSION:
PASS

GREEN BUILDING:
PASS

QUIZ KEYS:
PASS

QUIZ POSITION BALANCE:
PASS

INTERACTIONS:
PASS

BM/DLP PARITY:
PASS

LEAKAGE:
0

TYPECHECK:
PASS

BUILD:
PASS

CHAPTER 9 TESTS:
PASS — 83 / 83

SCIENCE F2 TESTS:
PASS — 693 / 693

Chapter 9 is **not** frozen. The independent final release gate is the next step.
