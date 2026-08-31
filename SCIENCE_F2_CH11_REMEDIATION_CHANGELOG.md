# SCIENCE FORM 2 — CHAPTER 11 (BINTANG DAN GALAKSI DALAM ALAM SEMESTA / STARS AND GALAXIES IN THE UNIVERSE)
# TARGETED REMEDIATION CHANGELOG

**Date:** 2026-08-31
**Scope:** the live Chapter 11 learner path (BM + DLP), plus the shared components and tests it needs.
**Inputs:** `SCIENCE_F2_CH11_DEEP_AUDIT_REPORT.md`
**Authorities:** `audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf`

`notes-bm.ts` / `notes-dlp.ts` were **not touched**. They remain shadowed by the interactive branch
at `src/routes/notes.tsx:1999`, which precedes the notes branch at `:2141`.

Chapter 11 has **1 SK, 2 SPs, no Jadual 9 mandatory experiment and no textbook experiment**
(re-verified: Jadual 9 = `3.4.1, 5.1.2, 5.2.2, 7.3.3, 8.2.5`; "Eksperimen" appears zero times in
printed pp. 238–249). Aktiviti 11.1 and 11.2 remain suggested activities; no procedure or result was
invented, and no external link or QR is exposed.

---

## 1. ARCHITECTURE — BEFORE / AFTER

| | Before | After |
|---|---|---|
| Live sections (BM / DLP) | 2 / 2 | **4 / 4** |
| Rendered characters (BM / DLP) | 4,964 / 4,432 | **9,549 / 8,522** |
| Per-section (BM) | 1,755 / 3,209 | 1,709 / 2,201 / 2,410 / 3,229 |
| SVG figures per stream | **0** | **4** |
| Raster images | 4 | 4 (unchanged) |
| Controls per stream | 30 | **44** |
| Learner-facing section numbers | 11.1 and **11.2** | **11.1 only** |

Four sections with descriptive titles, identical in count and order across streams:

| # | BM | DLP |
|---|---|---|
| 1 | Galaksi dan Alam Semesta | Galaxies and the Universe |
| 2 | Bima Sakti, Kedudukan Sistem Suria dan Skala Relatif | The Milky Way, the Solar System's Location and Relative Scale |
| 3 | Kitar Hidup Bintang | The Life Cycle of Stars |
| 4 | Ciri-ciri Bintang | Characteristics of Stars |

Back is disabled on §1 and Next absent on §4 (`DEEE` / `EEE-`), verified live in both streams.

---

## 2. THE CRITICAL FIX — A BRANCHING LIFE CYCLE

**Removed:** the linear `sequence` stepper that walked every star down one route
(Nebula → Protobintang → Bintang jujukan utama → Gergasi merah → Peringkat akhir) and bundled all
three outcomes into the last card's prose.

**Rajah 11.1 was reconstructed from the PDF by text position**, not read off a summary. Extracting
the figure's labels with coordinates gives three x-columns flowing upward from a single Nebula:

| Column | Source pathway |
|---|---|
| left (x≈252) | Nebula → **Bintang bersaiz sederhana** → Raksasa merah → **Kerdil putih** |
| middle (x≈345) | Nebula → **Bintang besar** → Raksasa merah → Super raksasa → Supernova → **Bintang neutron** |
| right (x≈430) | Nebula → **Bintang super besar** → Raksasa merah → Super raksasa → Supernova → **Lohong hitam** |

**Implemented** as `StellarLifecycle.tsx`, a deterministic SVG whose geometry is derived from the
branch list — each branch owns its column and its own terminal stage, so one branch cannot borrow
another's endpoint and no arrow ever crosses between columns. Verified in the rendered DOM:

- three columns carrying exactly the stages above
- **three distinct endpoints** (Kerdil putih / Bintang neutron / Lohong hitam)
- **3 fork paths + 10 stage arrows, every one pointing downward**, none crossing
- the accessible label spells out all three pathways in full
- the medium branch **does not pass through a supernova**

The prose beneath the figure lists each complete pathway, so nothing depends on the truncated SVG
labels.

**A defect in my own first draft was caught and fixed during visual QA:** the fork rail sat at y=57
while the target was y=55, so the final leg ran *upward* and `orient="auto"` flipped the three
arrowheads to point back at the nebula. The rail now sits strictly between the origin and the first
stage row (57 → 76), and a test asserts the final leg descends.

**Outcome is attributed to size, not mass.** The source says *bintang bersaiz sederhana / besar /
super besar* and *raksasa merah tidak begitu besar / sangat besar*; the word *jisim* appears nowhere
in it. `jisim` / `mass` is now absent from both streams' notes.

---

## 3. UNSUPPORTED STAGES REMOVED

Verified against printed p.243 before removal: the textbook names the newly born star **bintang
muda** and never mentions a main sequence.

| Term | Before (live surfaces) | After |
|---|---|---|
| `protobintang` / `protostar` | **32** | **0** |
| `bintang jujukan utama` / `main-sequence star` | 2 | **0** |

`bintang muda` / `young star` is used where the source uses it. Removing these was not a rename —
four quiz and flashcard items were built around them and were rewritten (§6).

---

## 4. BM TERMINOLOGY

Phrase-level, not word-level: `berpilin` contains `pilin`, so a bare word swap would have corrupted
the term being restored.

| Source term | Before | After | Replacements |
|---|---|---|---|
| **raksasa merah** | 0 | present | `gergasi merah` → 13 |
| **super raksasa** | 0 | present | `supergergasi` → 17 |
| **raksasa** (size class) | 0 | present | `gergasi` → 3 |
| **berpilin** | 0 | present | `galaksi/bentuk/lengan pilin` → 28 |
| **tidak seragam** | 0 | present | `tidak sekata` → 20 |
| **Ursa Mayor** | 0 | present | `Ursa Major` → 6 |

80 replacements across `quizzes-bm.ts`, `flashcards-bm.ts`, `mindmap-bm.ts`, plus the rewritten
`interactive-bm.ts`. A residual check confirms `gergasi`, `tidak sekata`, `Ursa Major` and any
non-`ber` `pilin` are now **zero** on every BM surface.

---

## 5. THE INVENTED "11.2" REMOVED

Chapter 11 has one Standard Kandungan. All four sections now carry `number: "11.1"`, which is the
subtopic they genuinely sit under and matches the textbook's own §11.1 heading. The learner sees
**"Semak diri — 11.1"** only; `11.2` appears nowhere on any live surface, and a test asserts it.

---

## 6. SP COVERAGE AFTER REMEDIATION

| SP | Requirement | Where it lives now | Status |
|---|---|---|---|
| **11.1.1** | space objects, galaxies incl. Milky Way, nebula, star life cycle, galaxy types, solar-system position, relative scale | §1 (galaxies + 3 types), §2 (Milky Way, position, scale), §3 (nebula, life cycle) | **COVERED** |
| **11.1.2** | compare stars incl. the Sun by temperature, size, distance, colour, brightness, related to observation from Earth | §4 (all five characteristics, colour–temperature scale, size comparison, brightness factors, Sirius and Rigel) | **COVERED** |

All five characteristics are taught **in the notes**, named together as the classification criteria,
not only in the decks.

---

## 7. RELATIVE SCALE

Rajah 11.2's labels were re-extracted by position: **Bumi, Sistem suria, Galaksi Bima Sakti,
Kumpulan galaksi, Gugusan galaksi, Alam semesta**. The new `CosmicScale.tsx` renders exactly those
six tiers as concentric containment rings.

- **No "planet" tier.** The DSKP catatan merely *enumerates* five objects to compare; treating that
  as an ascending size chain is incoherent because Earth is itself a planet. A test asserts no tier
  is labelled "planet".
- The previous version's five tiers gained the missing **Gugusan galaksi**.
- Rings are evenly spaced presentation geometry and the figure says so: **"Gambar tidak mengikut
  skala"** is drawn into the SVG, matching the source figure's own note.

---

## 8. MILKY WAY AND SOLAR SYSTEM LOCATION

`MilkyWayLocator.tsx` draws three spiral arms, a labelled **Pusat galaksi**, and the **Sistem suria**
marker out on an arm. Measured in the rendered SVG: the marker sits **108 units from the centre**
against a core radius of 26 — **72 % of the disc radius**, unambiguously out at the edge. The two
marks carry different labels, so they cannot be confused.

The three source facts render verbatim: a medium-sized spiral galaxy, the solar system at the edge
of one spiral arm, roughly 200 billion stars with the Sun among them.

---

## 9. NEBULA

The definition now carries the composition the source gives: *"awan besar yang terdiri daripada debu
dan gas-gas seperti hidrogen dan helium"*. The birth process is taught from printed p.243 —
gravitational attraction, a clump contracting into a core, very high core temperature and pressure,
hydrogen converted to helium, the core shining. Nothing about rotation is claimed, because the source
does not say it.

The nebula is the single origin node of the life-cycle figure, visually distinct from the galaxy
cards two sections earlier. The old nebula banner image was retired along with the stepper it
decorated, and its now-unused import was removed.

---

## 10. COLOUR–TEMPERATURE, AND THE SHARED SLIDER

The scale was already scientifically correct and its **science is unchanged**. All seven Jadual 11.1
bands were re-verified and now use the table's own names:

| Band | Range | Band | Range |
|---|---|---|---|
| Merah | <3 500 K | Putih | 7 500 – 11 000 K |
| Jingga | 3 500 – 5 000 K | **Biru-putih** | 11 000 – 25 000 K |
| Kuning | 5 000 – 6 000 K | Biru | >25 000 K |
| **Kuning-putih** | 6 000 – 7 500 K | | |

(`Kuning-keputihan` → **Kuning-putih** and `Putih-kebiruan` → **Biru-putih**, matching Jadual 11.1.)
Red remains coolest and blue hottest; the CSS gradient runs in the same order.

**Two shared-component defects fixed without touching the chemistry chapters.** `PhScaleSlider` now
accepts `ariaLabel` and `tickLabels`, both defaulting to the previous pH behaviour:

- **`aria-label`** is now *"Skala warna dan suhu bintang"* / *"Star colour and temperature scale"*
  instead of the hardcoded "pH scale", and `aria-valuetext` announces the current band.
- **Tick labels** are the seven colour names instead of the raw indices `0 1 2 3 4 5 6`, which were
  meaningless under a temperature gradient and invited misreading as temperatures.

**Regression checked live:** Chapter 6's pH slider still reports `aria-label="pH scale"` with numeric
ticks `0…7`. A test locks that default in place.

---

## 11. STAR SIZE, BRIGHTNESS AND DISTANCE

`StarSizeCompare.tsx` draws the source's three categories at relative sizes derived from the data
(**Super raksasa > Raksasa > Kerdil**), captioned "Gambar tidak mengikut skala" since the source
gives ordering only, no figures.

The **kerdil / kerdil putih ambiguity is now resolved for learners**: the figure's hint states that
*kerdil* here is a size category while *kerdil putih* is the final stage of a medium-sized star's
life cycle.

Brightness keeps all three source factors together — *"bergantung pada saiz, jarak dari Bumi dan suhu
permukaan"* — with the source's *"yang dicerap"* (as observed) qualifier restored, and names Sirius
and Rigel as the brightest in the sky. **No light-years, parsecs, parallax, magnitudes or spectral
classes** appear anywhere; a test asserts it.

---

## 12. QUIZZES

| | Before | After |
|---|---|---|
| Answer-position histogram | **9 / 17 / 3 / 1** | **8 / 8 / 7 / 7** |
| Guess-B score | 17/30 (57 %) | 8/30 (27 %) |
| Questions | 30 / 30 | 30 / 30 |
| Difficulty | 10 / 10 / 10 | 10 / 10 / 10 |
| BM/DLP answerIndex parity | exact | exact |

Nine of thirty moved, and the only edit was the **order of options** — the correct option swapped
with whichever sat at the target slot. **Answer text preserved 27/27 on untouched items in both
streams**, with option sets unchanged (no distractor weakened).

The remaining three per stream were **deliberately rewritten**, because they encoded the defective
model rather than merely sitting in the wrong slot:

| Id | Was | Now |
|---|---|---|
| `q18` | "What is a protostar?" | which pathway does **not** pass through a supernova |
| `q22` | endpoint "neutron star **or** black hole, depending on **mass**" | a very large star's supernova forms a **black hole** |
| `q29` | ordering ending "white dwarf/neutron star/black hole" | ordering of the **medium-sized** star pathway |

### Life-cycle assessment (§24 of the brief)

`supernova` appeared **0 times** in either deck before; it now appears **8 times per stream**, and
every branch endpoint is assessed:

| Concept | BM | DLP |
|---|---|---|
| supernova | 8 | 8 |
| kerdil putih / white dwarf | 6 | 6 |
| bintang neutron / neutron star | 5 | 5 |
| lohong hitam / black hole | 8 | 8 |

No question count was added; weaker items were replaced.

---

## 13. FLASHCARDS AND MIND MAP

- Flashcards **60 BM / 60 DLP**; mind map **84 BM / 84 DLP** nodes — parity exact, counts unchanged.
- Four flashcards per stream rewritten (the protostar definition, the nebula-vs-protostar comparison,
  and two ordering cards that ended in merged endpoints).
- **Mind map branches corrected.** It previously separated small/medium but merged the other two into
  *"supernova → bintang neutron **atau** lohong hitam"*. Now four explicit nodes:
  - birth: nebula → gravity compresses a core → nuclear reaction (hydrogen → helium) → young star
  - medium pathway: raksasa merah → kerdil putih (no supernova)
  - large pathway: raksasa merah → super raksasa → supernova → bintang neutron
  - very large pathway: raksasa merah → super raksasa → supernova → lohong hitam
- The **summary node** that also hid the mapping (*"berakhir sebagai kerdil putih, bintang neutron,
  atau lohong hitam"*) was rewritten to state which star ends as which. A test forbids any node
  offering both endpoints as alternatives.
- Relative-scale and colour rows aligned to source terms (`Kumpulan/Gugusan Galaksi`, `Kuning-putih`,
  `Biru-putih`).

---

## 14. LEAKAGE

```
interactive-bm  clean   quizzes-bm   clean   flashcards-bm  clean   mindmap-bm   clean
interactive-dlp clean   quizzes-dlp  clean   flashcards-dlp clean   mindmap-dlp  clean
TOTAL: 0   (unchanged — it was already 0, and the invented 11.2 is now gone too)
```

`Semak diri — 11.1` is genuine textbook structure (the textbook's own §11.1) and is not leakage. The
shared `learner-facing-leakage.test.ts` now imports all eight Chapter 11 surfaces and runs **88
tests**.

---

## 15. VISUALS AND INTERACTION

Four SVG figures per stream, all with `role="img"` and a meaningful `aria-label`; the three existing
galaxy images were **kept unchanged**, having been verified correct in the audit.

| Figure | Component | What makes it correct |
|---|---|---|
| Branching life cycle | `StellarLifecycle.tsx` | geometry derived from the branch list; endpoints cannot be shared; arrows verified all-downward |
| Cosmic nesting | `CosmicScale.tsx` | six source tiers in containment order; no planet tier; "not to scale" drawn in |
| Milky Way locator | `MilkyWayLocator.tsx` | solar-system marker at 72 % of disc radius, 108 units from a 26-unit core |
| Star sizes | `StarSizeCompare.tsx` | radii derived from `relative`, so the ordering cannot be drawn wrong |

The `✨ Interaktif` badge appears only on the three figures that genuinely have controls (life cycle,
cosmic scale, colour slider). The galaxy cards and the Milky Way locator are static and carry **no**
badge — no false affordance.

**Interactions: 0 genuinely inert controls.** 44 per stream (43 buttons + 1 slider). Eight were
flagged by the automated sweep and each was run down: `Kembali`/`Back` on §1 is genuinely
`disabled`, and the seven §4 mini-quiz options all report `disabled=false` on a fresh mount and
respond when clicked first — they lock only after an answer. Life-cycle branch buttons and cosmic
tier buttons toggle on and off; the slider steps correctly through all seven bands by keyboard.

---

## 16. BM / DLP PARITY

| Dimension | Result |
|---|---|
| Sections | 4 / 4, same order |
| Concepts and life-cycle branches | identical three pathways |
| Figures | 4 / 4, same components |
| Values (Kelvin, 200 billion, dates) | identical |
| Quiz count, indices, difficulty | exact |
| Flashcards / mind map | 60/60, 84/84 |
| Terminology | BM now in the DSKP register; DLP already correct English |

---

## 17. MOBILE QA

All four sections visited at each width, every descendant box measured against its container.

| Width | Page overflow | Overflowing elements | Figures | Images |
|---|---|---|---|---|
| 1280 | No | 0 | 4 | 7 |
| 430 | No | 0 | 4 | 7 |
| 390 | No | 0 | 4 | 7 |
| 375 | No | 0 | 4 | 7 |

No figure or galaxy image is clipped, the life-cycle branches remain legible with no crossing or
hidden arrows, no endpoint is cut off, and the colour slider stays inside its container.

*(A first pass reported 142 offenders with `vw: 0` — the Browser pane was hidden so no layout was
computed. Re-measured with real viewports, the count is 0 at every width.)*

---

## 18. TESTS

**Created:** `src/content/form2/science/chapter-11/chapter-11-remediation.test.tsx` — **98 tests**
covering source scope (1 SK / 2 SP, no 11.2), both SPs' concepts, the three life-cycle branches and
their distinct endpoints, the supergiant stage, supernova only on the large branches, the Sun's
pathway, BM terminology, the absence of protostar/main-sequence, the six scale tiers with no planet
tier, the Milky Way marker's distance from the core, all seven colour bands with exact ranges, the
slider's aria label and tick labels, the pH default, star sizes, brightness, no imported astronomy,
quiz integrity and balance, and mind-map branch separation.

**Extended:** `learner-facing-leakage.test.ts` from 80 → **88 tests**.

| Gate | Result |
|---|---|
| `tsc --noEmit` | **PASS** — 0 errors |
| `npm run build` | **PASS** — worker, sitemap (37 URLs), PWA generated |
| Chapter 11 tests | **PASS — 98 / 98** |
| Science Form 2 tests | **PASS — 930 / 930** across 12 files |
| Leakage suite | **PASS — 88 / 88** |
| Quiz integrity / parity | **PASS** |
| Full suite | 2446 passed, **8 failed** |

Three of my own test assertions were wrong and were fixed rather than the content: one treated the
check question *"Adakah Matahari akan menjadi lohong hitam?"* (answered "Tidak") as an assertion;
one grabbed the controls group's `aria-label` instead of the figure's. The third failure was a real
content issue — the mind-map summary node — and the content was fixed.

### Pre-existing unrelated failures — reported, not repaired

`src/routes/-onboarding-ui.test.ts` · `src/lib/billing-core.test.ts` ·
`src/lib/invoice-pdf.server.test.ts` · four `src/content/bm/*-mindmap.test.ts` files ·
`src/content/form2/math/chapter-1/quizzes-dlp.test.ts`

**None touches Science Form 2 Chapter 11.** Same eight as the Chapter 8–10 gates. `npm run lint`
remains repo-wide red for CRLF/LF reasons predating this chapter.

---

## 19. FILES CHANGED

**New components (4)**
- `src/components/notes/blocks/StellarLifecycle.tsx`
- `src/components/notes/blocks/CosmicScale.tsx`
- `src/components/notes/blocks/MilkyWayLocator.tsx`
- `src/components/notes/blocks/StarSizeCompare.tsx`

**New test**
- `src/content/form2/science/chapter-11/chapter-11-remediation.test.tsx`

**Modified**
- `src/content/form2/science/chapter-11/interactive-bm.ts` · `interactive-dlp.ts` (rewritten, 4 sections)
- `src/content/form2/science/chapter-11/quizzes-bm.ts` · `quizzes-dlp.ts`
- `src/content/form2/science/chapter-11/flashcards-bm.ts` · `flashcards-dlp.ts`
- `src/content/form2/science/chapter-11/mindmap-bm.ts` · `mindmap-dlp.ts`
- `src/content/form2/science/interactive-types.ts` (4 new block types; `ariaLabel`/`tickLabels` on `PhSliderBlock`)
- `src/components/notes/ScienceF2InteractiveNotesBlock.tsx` (4 new render branches; slider props)
- `src/components/notes/blocks/PhScaleSlider.tsx` (configurable label and ticks, pH defaults kept)
- `src/content/form2/science/learner-facing-leakage.test.ts` (extended to Chapter 11)

**Deliberately untouched:** `chapter-11/notes-bm.ts`, `notes-dlp.ts` (dead path); the three galaxy
images (verified correct in the audit).

---

## 20. OPEN FINDINGS

1. **LOW — Kelvin numeral formatting is inconsistent between surfaces.** The notes use the
   textbook's spaced form (`3 500 K`, matching Jadual 11.1) while the decks use commas (`3,500 K`).
   Both are legible and the values are identical; worth normalising in a routine pass.
2. **Observation, not a defect — the dead notes still carry the pre-remediation text.**
   `notes-bm.ts` / `notes-dlp.ts` retain the old vocabulary and the linear life cycle. They are
   unreachable and were excluded by instruction. If ever un-shadowed they must be remediated or
   deleted first.
3. **Audit limitation carried forward — the DLP textbook was not supplied.** English strings were
   validated against the BM textbook by semantic equivalence.
4. **The NotebookLM source map was never available** to either the audit or this remediation. Its
   claims were adjudicated from the PDFs; the relative-scale claim in particular was rejected.

No CRITICAL, HIGH or MEDIUM finding from the audit remains open.

---

# CHAPTER 11 REMEDIATION STATUS:
# READY FOR RELEASE GATE

```
CRITICAL OPEN: 0
HIGH OPEN:     0
MEDIUM OPEN:   0
LOW OPEN:      1   (Kelvin numeral formatting differs between notes and decks)

SP COVERAGE:
COVERED:       2
PARTIAL:       0
MISSING:       0
INCORRECT:     0
NOT_RENDERED:  0
CONFUSING:     0

JADUAL 9 CHAPTER 11:      NONE
TEXTBOOK EXPERIMENTS:     0

GALAXY TYPES:             PASS
MILKY WAY:                PASS
SOLAR SYSTEM LOCATION:    PASS
RELATIVE SCALE:           PASS
NEBULA:                   PASS
STELLAR LIFECYCLE:        PASS
SUN PATHWAY:              PASS
COLOUR-TEMPERATURE:       PASS
STAR SIZE:                PASS
DISTANCE:                 PASS
BRIGHTNESS:               PASS
ACTIVITY CLASSIFICATION:  PASS
BM TERMINOLOGY:           PASS
QUIZ KEYS:                PASS
QUIZ POSITION BALANCE:    PASS
LIFECYCLE QUIZ COVERAGE:  PASS
INTERACTIONS:             PASS
BM/DLP PARITY:            PASS

LEAKAGE: 0

TYPECHECK:         PASS
BUILD:             PASS
CHAPTER 11 TESTS:  PASS  (98/98)
SCIENCE F2 TESTS:  PASS  (930/930)
```

**Chapter 11 is NOT frozen.** An independent read-only release gate must run before any freeze.
