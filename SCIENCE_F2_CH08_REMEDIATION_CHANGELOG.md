# Science Form 2 — Chapter 8 (Daya dan Gerakan / Force and Motion)
# TARGETED REMEDIATION CHANGELOG

Addresses `SCIENCE_F2_CH08_DEEP_AUDIT_REPORT.md` (verdict: FAIL — 1 CRITICAL,
6 HIGH, 8 MEDIUM, 5 LOW). Every fix was re-verified against
`audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf` rather than taken from
the audit's wording — which surfaced one place where the audit itself was wrong
(see *Correction to the audit* below).

**Live interactive files only.** `notes-bm.ts` / `notes-dlp.ts` remain shadowed and
show **0 modifications** — confirmed by `git diff`. No dead notes were revived.

---

## Correction to the audit

The audit recorded H-01 as a misconception AcadeMY had introduced. Checking the
textbook's altitude page first showed that is not the whole story:

> **Textbook, printed p.196:** "Tekanan atmosfera menurun apabila altitud semakin
> meningkat. **Hal ini disebabkan oleh tarikan graviti.** … Pada altitud yang tinggi,
> molekul-molekul udara **kurang dipengaruhi oleh tarikan graviti**…"

AcadeMY was echoing its own textbook, not inventing the claim. The same page's
figure caption, however, gives the correct account:

> **Rajah 8.46 caption:** "**Kurang molekul udara** memberi tekanan ke atas orang ini
> apabila berada di atas gunung. **Lebih banyak molekul udara** … apabila berada di
> bawah gunung."

Gravity is essentially unchanged over the height of the atmosphere, so the prose is
physically loose while the caption is right. The remediation follows the caption — and
the §13 instruction — teaching that there is **less air above you** at altitude. This
is source-aligned *and* correct, and it is now reinforced by a new figure. Flagged
here because it means the defect originates in the textbook, which a curriculum lead
may want to know.

---

## Sections before / after

| | Before | After |
|---|---|---|
| Interactive sections | **2** | **11** |
| BM file size | 10.4 KB | 30.6 KB |
| SVG instructional figures | **0** | **8** |
| Interactive affordance badges | **0** | **8** |
| Interactive controls (per stream) | 40 | **97** |
| Chapter 8 tests | **0** | **109** |

| # | BM | DLP | Subtopic |
|---|---|---|---|
| 1 | Jenis-jenis Daya | Types of Forces | 8.1 |
| 2 | Magnitud, Arah dan Titik Aplikasi | Magnitude, Direction and Point of Application | 8.1 |
| 3 | Daya Tindakan dan Daya Tindak Balas | Action and Reaction Forces | 8.1 |
| 4 | Kesan Daya | Effects of Force | 8.2 |
| 5 | Keapungan dan Ketumpatan | Buoyancy and Density | 8.2 |
| 6 | Tuas | Levers | 8.2 |
| 7 | Momen Daya | Moment of Force | 8.2 |
| 8 | Tekanan | Pressure | 8.2 |
| 9 | Tekanan Gas | Gas Pressure | 8.2 |
| 10 | Tekanan Atmosfera | Atmospheric Pressure | 8.2 |
| 11 | Tekanan Cecair | Liquid Pressure | 8.2 |

Same count, same order, same concepts. Back / Next / progress architecture untouched —
it is the shared `ScienceF2InteractiveNotesBlock`.

---

## Findings

### C-01 — mandatory DSKP experiment (SP 8.2.5) · **FIXED**

Staged in section 8 using the existing shared `MiniExperiment` block, reconstructed
from **textbook printed p.188**:

| Element | Content |
|---|---|
| Aim | Study the relationship between surface area and the pressure produced by the same force |
| Problem | What is the effect of surface area on the pressure produced by the same force? |
| Hypothesis | As surface area increases, the pressure produced decreases |
| Manipulated | Surface area over which the force acts |
| Responding | Depth of the indentation in the plasticine |
| Controlled | Metal blocks of the same mass, so the force acting is the same |
| Materials | Metal blocks and plasticine |
| Apparatus | Retort stand and clamp, metre rule, string |
| Method | 5 steps, faithful to the source |
| Observation | Smaller area → deeper indentation; larger area → shallower |
| Conclusion | Smaller area → higher pressure for the same force; hypothesis accepted |

- **No fabricated measurements.** The source prints its results table blank, so the
  observation is stated as a relationship. A test asserts no `cm`/`mm` figure appears
  in the observation or conclusion.
- **NotebookLM's invented "fixed height" is not present** — a test asserts the method
  never says *ketinggian tetap* / *fixed height*.
- No "Experiment 8.2", "SP 8.2.5" or "Jadual 9" is exposed to learners.

### H-01 — altitude explanation · **FIXED**

Replaced on all five surfaces that carried it (interactive ×2, flashcards ×2 each
language, mind map ×2, quiz option + explanation ×2). The quiz item's *correct option*
itself stated the misconception, so the option text was rewritten too — the three
distractors were left alone and `answerIndex` is unchanged.

Now taught as: at higher altitude there is less air above you, so the weight of the air
column pressing down is smaller. A guard asserts no live surface matches
`weaker gravity` / `graviti … lemah`.

### H-02 — buoyancy contradiction · **FIXED**

| Surface | Before | After |
|---|---|---|
| Notes | F = W | F = W (kept) |
| Flashcards (both languages) | "Terapung … (F > W)" | floating stated as equilibrium, F = W |
| Quiz explanation (both) | "daya keapungan F > berat W" | "daya apungan sama magnitud dengan beratnya (F = W)" |

The new buoyancy schematic keeps the measurement view and the two force states
**separate**, which is what allowed the two claims to blur before. A guard rejects any
unqualified `floating … F > W` on every live surface.

### H-03 — compressed structure · **FIXED** — 2 → 11 sections (table above).

### H-04 — no diagrams · **FIXED** — 8 figures added (see *Visuals*).

### H-05 — SP 8.2.2 binding elements missing from notes · **FIXED**

`F = W₁ − W₂`, real weight, apparent weight and the Plimsoll line (TF/F/T/S/W/WNA)
now all appear in the **notes**, not only on flashcards.

### H-06 — SP 8.2.3 numerical requirement · **FIXED**

The lever formula is in the notes, in the source's own wording, with a worked example
that a learner meets **before** the quiz asks Q22/Q23:

```
Beban (N) × Jarak beban dari fulkrum (m) = Daya (N) × Jarak daya dari fulkrum (m)
400 N × 0.5 m = Daya × 2 m  →  Daya = 200 ÷ 2 = 100 N
```

Fresh numbers deliberately — reusing the textbook's own two examples would have given
away the quiz items that already use them. A test recomputes the arithmetic.

### MEDIUM / LOW

| ID | Status | Note |
|---|---|---|
| M-01 leakage | **FIXED** | mind-map node relabelled, its four children kept |
| M-02 BM terminology | **FIXED** | 20 corrections (see below) |
| M-03 calculator Infinity | **FIXED** | see *Calculator validation* |
| M-04 no tests | **FIXED** | 109 tests + leakage suite extended |
| M-05 atmospheric applications | **FIXED** | all six now in the notes; air vs atmospheric distinction taught |
| M-06 trolley pair | **FIXED** | now trolley-on-trolley, not spring-on-both |
| M-07 pressure applications | **FIXED** | axe, ice-skate blade, studs, tractor tyres, elephant |
| M-08 quiz skew | **FIXED** | see *Quiz changes* |
| L-01 door example | **FIXED** | door is now a moment situation |
| L-02 air-exerts-pressure demo | **OPEN** | non-binding suggested activity; low value without apparatus |
| L-03 bubble-with-depth activity | **PARTIAL** | depth figure added; the 1 m tube activity itself not staged |
| L-04 "syphon" spelling | **OPEN** | cosmetic; British variant is not wrong |
| L-05 few checks | **FIXED** | 3 → 22 check questions (2 per section) |

---

## SP coverage after remediation

| SP | Before | After | Where |
|---|---|---|---|
| 8.1.1 | COVERED | **COVERED** | §1, six force flip cards |
| 8.1.2 | PARTIAL | **COVERED** | §2 force-arrow figure + both source examples |
| 8.1.3 | COVERED | **COVERED** | §2, neraca spring, N, 100 g → 1 N |
| 8.1.4 | COVERED | **COVERED** | §3, three situations, pair corrected |
| 8.2.1 | COVERED | **COVERED** | §4, five effects |
| 8.2.2 | PARTIAL | **COVERED** | §5, F = W₁ − W₂, real/apparent weight, Plimsoll, schematic |
| 8.2.3 | PARTIAL | **COVERED** | §6, three classes + formula + worked example + diagram |
| 8.2.4 | PARTIAL | **COVERED** | §7, door + spanner + angled case, perpendicular distance drawn |
| 8.2.5 | **MISSING** | **COVERED** | §8, investigation + apparatus figure + P = F/A |
| 8.2.6 | COVERED | **COVERED** | §9, kinetic theory + particle figure |
| 8.2.7 | **INCORRECT** | **COVERED** | §10, corrected altitude + 6 applications + term distinction |
| 8.2.8 | COVERED | **COVERED** | §11, depth figure + dam + submarine |

```
COVERED 12 | PARTIAL 0 | MISSING 0 | INCORRECT 0 | NOT_RENDERED 0 | CONFUSING 0
```

---

## Visuals added

Eight compact instructional SVGs, no decorative artwork. Each derives its geometry
from its own data so a drawing cannot contradict the concept it illustrates.

| # | Component | Section | What stops it going wrong |
|---|---|---|---|
| 1 | `ForceDiagram` | 2 | Arrow length derived from the magnitude, so a bigger force is never drawn shorter; tail dot marks the point of application |
| 2 | `BuoyancySchematic` | 5 | Floating draws **equal** arrows (46/46); sinking draws W longer than F (52/26) |
| 3 | `LeverClasses` | 6 | Positions generated from which role is `middle`, so the picture always matches the class label |
| 4 | `MomentDiagram` | 7 | Third view draws the perpendicular distance **shorter** than the handle when the force is angled |
| 5 | `PressureApparatus` | 8 | Block widths and indentation depths derived from contact area, so "smaller area → deeper mark" holds in the drawing |
| 6 | `GasParticles` | 9 | Particle count is one value used by every state — compressing or heating cannot change how many are drawn |
| 7 | `AltitudePressure` | 10 | Molecule density from a height curve; teaches the corrected H-01 explanation visually |
| 8 | `DepthPressure` | 11 | Jet length computed from depth, so a deeper hole can never draw a shorter jet |

Verified live: lever middles render as Beban < **Fulkrum** < Daya (class 1),
Fulkrum < **Beban** < Daya (class 2), Fulkrum < **Daya** < Beban (class 3).

---

## Quiz changes

| | Before | After |
|---|---|---|
| Questions | 30 / 30 | 30 / 30 (unchanged) |
| Easy / Medium / Hard | 10 / 10 / 10 | 10 / 10 / 10 (unchanged) |
| Answer positions A/B/C/D | **7 / 20 / 3 / 0** | **8 / 8 / 7 / 7** |

Rebalanced by swapping the key option with whichever option sat at the target slot —
only the **order** changed. Verified mechanically against a pre-change snapshot:

```
BM : answers preserved 30/30 | option sets intact 30/30 | histogram {0:8, 1:8, 2:7, 3:7}
DLP: answers preserved 30/30 | option sets intact 30/30 | histogram {0:8, 1:8, 2:7, 3:7}
BM/DLP answerIndex parity: PASS
```

Two content edits beyond the reshuffle: the buoyancy explanation (H-02) and the
altitude option + explanation (H-01). No other question text or explanation changed,
and no correct question was weakened.

---

## Terminology fixes

20 corrections across `quizzes-bm` (7), `flashcards-bm` (6), `mindmap-bm` (7), plus
the rewritten interactive file:

| Was | Now | Source |
|---|---|---|
| titik tindakan | **titik aplikasi** | DSKP 8.1.2; textbook p.171 |
| penimbang spring | **neraca spring** | DSKP 8.1.3; textbook p.172 |
| Tukul kebawa | **pam sedut** | textbook p.192 |
| bola Magdeburg | **hemisfera Magdeburg** | DSKP 8.2.7; textbook p.192 |
| Jarak berserenjang (noun) | **jarak tegak** | textbook p.184 |

The adjective *berserenjang* ("perpendicular **to**") is correct and was kept where the
source uses it — e.g. "arah daya berserenjang dengan permukaan". Only the noun phrase
was realigned.

---

## Leakage before / after

| | Before | After |
|---|---|---|
| Live-surface hits | **2** (`Aktiviti 8.1` / `Activity 8.1`) | **0** |
| Covered by the shared suite | **No** — chapters 1–7 only | **Yes** |

`learner-facing-leakage.test.ts` extended to Chapter 8: 56 → **64 tests**.

---

## Calculator validation

`TwoFieldCalculator` now screens non-finite inputs on the way in and checks the result
on the way out. Only the divide mode guards its denominator — banning zero outright
would reject a legitimate moment of `0 N × 0.2 m`.

Verified live in the rendered chapter:

| Input | Output |
|---|---|
| Moment 50 N × 0.2 m | `Momen daya = 10.00 N m` |
| Moment 1e200 × 1e200 | `Nilai itu terlalu besar untuk dikira di sini.` |
| Pressure 10 N ÷ 0.01 m² | `Tekanan = 1000.00 Pa` |
| Pressure area = 0 | `Luas permukaan mesti lebih besar daripada 0 m².` |
| restore | `Tekanan = 1000.00 Pa` |

**Learner-facing Infinity / NaN: 0**, over a 400-combination sweep in the tests plus the
live states above.

*Other subjects protected:* the empty-state placeholder was left exactly as it was
(`— <unit>`, language-neutral) so Geography Form 2/3, which also use this calculator and
pass no `lang`, are unaffected. Their tests pass unchanged.

---

## Tests

New: `src/content/form2/science/chapter-8/chapter-8-remediation.test.tsx` — **109 tests**.

Guards, matching §19: 12 SP teaching homes · cancelled Newton box absent on every
surface · the three action/reaction situations preserved · trolley-on-trolley wording ·
force diagram exists with both examples · BM terminology · `F = W₁ − W₂` · floating
equilibrium · no unqualified `F > W` · Plimsoll · lever formula + worked arithmetic ·
moment perpendicular distance + door/spanner/angled · full experiment structure · no
fabricated indentation values · no invented fixed height · `P = F/A` and both units ·
altitude never blames gravity · air vs atmospheric distinction · six atmospheric
applications · fixed particle count · deepest jet longest · calculator never returns
Infinity/NaN · balanced answer spread · BM/DLP parity · interactive controls real.

*Three of my own test assertions were wrong on first run and were corrected, not the
content:* a `[\d.]+` class matched bare sentence periods and produced `NaN`; the moment
formula legitimately carries per-term units rather than the composite `N m` (asserted on
the calculator instead); and the interactive badge's icon draws a `<circle>`, so
particles are now counted by radius.

```
TYPECHECK              PASS   tsc --noEmit, exit 0
BUILD                  PASS   npm run build, exit 0
CHAPTER 8 TESTS        PASS   109 / 109
SCIENCE F2 TESTS       PASS   602 / 602   (was 485)
LEAKAGE SUITE          PASS    64 / 64    (was 56)
NOTES + GEOGRAPHY      PASS    31 / 31    (shared-calculator consumers)
FULL SUITE             2118 passed | 8 failed (194 files)
```

The 8 failures are pre-existing and unrelated, unchanged in identity and count:
onboarding UI, billing, invoice PDF, four BM mind-map registry tests, Math F2 C1 DLP.
**0 are Chapter 8. 0 are Science Form 2.**

---

## Browser QA

Mounted from the real registry entry, both streams, every control clicked.

| Width | Page overflow | Figures | Clipped | Scroll in own container | Arrowheads hidden | Buttons < 40 px |
|---|---|---|---|---|---|---|
| Desktop 1280 | **0 px** | 8 | 0 | 0 | 0 | 0 |
| 430 | **0 px** | 8 | 0 | 0 | 0 | 0 |
| 390 | **0 px** | 8 | 0 | 0 | 0 | 0 |
| 375 | **0 px** | 8 | **0** | 8 | 0 | 0 |

At 375 px the figures scroll inside their own `overflow-x-auto` wrapper rather than
clipping or pushing the page — the same pattern Chapter 7's release gate accepted.

**Interactions:** 97 controls per stream, exact parity. 16 flagged by a sequential
probe were re-tested and are all artefacts of that probe: 6 are already-selected
toggles (`aria-pressed="true"`, a no-op by design), 3 are matcher options after the
pair is made, and 7 are mini-quiz options after the question is answered — the quiz
correctly locks. **0 genuinely dead controls.**

**Affordance:** 8 figures now carry the shared "✨ Interaktif / Tekan konsep untuk
meneroka" badge (DLP: "Interactive / Tap a concept to explore"). Static content —
flip cards, accordions, cards — was left without a badge, as instructed.

---

## Files changed

**New components (7):** `ForceDiagram`, `BuoyancySchematic`, `LeverClasses`,
`MomentDiagram`, `GasParticles`, `DepthPressure`, `PressureApparatus`,
`AltitudePressure` *(8 files)*.

**Modified:** `interactive-types.ts` (7 new block types),
`ScienceF2InteractiveNotesBlock.tsx` (wiring + passes `lang` to the calculator),
`TwoFieldCalculator.tsx` (guards), `chapter-8/interactive-{bm,dlp}.ts` (rewritten),
`chapter-8/{quizzes,flashcards,mindmap}-{bm,dlp}.ts` (targeted edits),
`learner-facing-leakage.test.ts` (extended).

**New test:** `chapter-8/chapter-8-remediation.test.tsx`.

**Untouched:** `chapter-8/notes-{bm,dlp}.ts` (dead), every other chapter's content.

---

CHAPTER 8 REMEDIATION STATUS:
READY FOR RELEASE GATE

CRITICAL OPEN:
0

HIGH OPEN:
0

MEDIUM OPEN:
0

LOW OPEN:
3

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

CHAPTER 8 TESTS:
PASS — 109 / 109

SCIENCE F2 TESTS:
PASS — 602 / 602

Chapter 8 is **not** frozen. The independent final release gate is the next step.
