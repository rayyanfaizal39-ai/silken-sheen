# Science Form 2 — Chapter 9 (Haba / Heat)
# DEEP READ-ONLY AUDIT

**Mode:** AUDIT ONLY. No project file was modified, created, deleted, or formatted.
This report is the only file written. MD5 hashes of all 10 Chapter 9 content files
were captured before the audit and re-verified after: **0 changed**.

---

## Verdict

# FAIL — HUMAN REVIEW REQUIRED

**CRITICAL 0 · HIGH 5 · MEDIUM 7 · LOW 4**

Chapter 9 has no Jadual 9 mandatory experiment, so it carries no blocker of the class
that stopped Chapters 5–8. Its science is also, in the main, **accurate**: both breezes
are correct, absorption and emission are not reversed, the bimetallic bend direction is
right, and every quiz key I checked is scientifically sound.

What fails it is a combination of one real scientific error, one entirely absent
standard, and the largest learner-facing leakage found in any chapter audited so far:

- a thermometer is taught as **measuring heat**, contradicting this chapter's own
  heat-vs-temperature teaching
- **SP 9.4.3 (Green Building) is absent from the interactive notes** altogether
- **44 occurrences** of textbook activity/experiment numbering reach learners
- **zero instructional visuals** — all eight high-risk diagrams are missing
- 4 sections carrying 9 SPs

---

## Source provenance

| Source | Identity verified from the file | Status |
|---|---|---|
| `DSKP.pdf` | KSSM Sains Tingkatan 2. Bab 9.0 = PDF pp. 89–91 (printed pp. 78–80). Jadual 9 = PDF p. 44. | Authoritative |
| `Textbook.pdf` | KPM2017, *Sains Tingkatan 2*, Karangkraf. Bab 9 printed pp. 204–219 (PDF offset **+7**). | Authoritative |
| `Errata.pdf` | Self-disclaimed mirrored publisher-correction record; "DSKP remains the highest authority". | Advisory only |

**Independently reconstructed from DSKP:**

- Title: **9.0 HABA**
- **4 SKs**: 9.1 Hubungkait suhu dengan haba · 9.2 Pengaliran haba dan keseimbangan haba ·
  9.3 Prinsip pengembangan dan pengecutan jirim · 9.4 Hubungkait jenis permukaan objek
  dengan penyerapan dan pembebasan haba
- **9 SPs**: 9.1.1 · 9.2.1–9.2.3 · 9.3.1–9.3.2 · 9.4.1–9.4.3 — count confirmed

Textbook anchors read page by page: Jadual 9.1 heat vs temperature (printed 206),
three transfer modes (208), Sun→Earth radiation (209), both breezes (210), conductor/
insulator definitions and applications (211), Eksperimen 9.1 + thermal equilibrium (212),
bimetallic fire alarm Rajah 9.14 (215), tanker + Eksperimen 9.2 (216–218), Konsep
Bangunan Hijau (218).

---

## NotebookLM corrections

The source map was accurate on structure and required six corrections.

| # | NotebookLM claim | Verified position |
|---|---|---|
| 1 | Jadual 9 for Chapter 9: **NONE FOUND** | **Correct** — independently confirmed (below). |
| 2 | Jadual 9 lists "**legally mandatory** experiments" | **Overstated.** DSKP says those investigations "**WAJIB** dilaksanakan menggunakan pendekatan inkuiri" — a curriculum requirement. Correct wording is "mandatory DSKP experiment". Moot for Chapter 9, which has none. |
| 3 | Bimetallic strip: "**Copper expands faster than iron**" | **Correct** — textbook p.215 labels the strip *Kuprum* / *Besi* and says "kuprum akan mengembang lebih cepat berbanding dengan besi". AcadeMY says *keluli* (steel) — see M-04. |
| 4 | Insulator applications include "**aluminium foil** wrapped around roasting chicken to retain heat" | **Not in the source.** Textbook p.211 shows iron soleplate, pan base, mercury thermometer, wooden utensils, oven gloves, ice box. Foil appears only as a *test material* in Eksperimen 9.1, where it is the **poorest** of the three insulators. Presenting foil as a heat-retainer inverts what the experiment shows. |
| 5 | Insulator applications include "**thick blankets** trap air" | **Not on the source pages** for 9.2.3. Plausible science, but not a source-required example. |
| 6 | Green Building criteria = DSKP's five (energy, water, sustainable site, materials, innovation) | **Incomplete.** The **textbook p.218** lists a different, more concrete set: high energy efficiency via solar/renewable energy · good water flow, air circulation and lighting systems · use of recycled materials. Both are source; a remediation should teach the textbook's list. |

---

## Jadual 9 verification

Read directly from DSKP PDF p. 44 (printed p. 33). The complete Form 2 list:

```
PENYENGGARAAN DAN KESINAMBUNGAN HIDUP : 3.4.1
PENEROKAAN UNSUR DALAM ALAM          : 5.1.2, 5.2.2
TENAGA DAN KELESTARIAN HIDUP         : 7.3.3, 8.2.5
```

A regex sweep for `9.x.x` inside the Jadual 9 block returns **`[]`**.

**JADUAL 9 CHAPTER 9: NONE.**

Eksperimen 9.1 (insulators) and Eksperimen 9.2 (dark vs white surfaces) are genuine
**textbook experiments** — both reconstructed below — but neither is a Jadual 9
requirement. NotebookLM's classification is correct.

---

## Errata verification

The errata's correction table lists **only** textbook pages 53, 71, 151 and 173. A
search for `Bab 9` or `Haba` across the whole errata returns **`[]`** — **no factual
correction for Chapter 9**.

Page 218 **is** listed, but only under *"Broken / obsolete QR-linked resources"*:

> "The mirrored errata also flags multiple QR-linked resources as non-functioning… These
> are **resource-link issues, not automatic corrections** to the textbook's core
> scientific content. The listed textbook pages include 6, 53, 55, 59, 77, 78, 81, 84,
> 129, **218** and 232."

**AcadeMY check:** a sweep of every Chapter 9 live surface for `http`, `QR`, `imbas`,
`scan` returns **0 hits**. No broken link is exposed to a learner.

**PAGE 218 ERRATA: PASS.**

---

## Live path

| Step | Evidence |
|---|---|
| Registry | `registry.ts` `science-f2-c9-bm` / `science-f2-c9-dlp` |
| Data | both carry `sciF2InteractiveData` (chapter `9`, 4 sections) |
| Route | `notes.tsx:1999` interactive branch → `:2077` `chapter === 9` |
| Component | `ScienceF2Chapter9NotesBlock.tsx` re-exports `ScienceF2InteractiveNotesBlock` |
| Language | `:2081` `lang={scienceLang === "dlp" ? "en" : "bm"}` — DLP receives `"en"` |

**Same shadowing pattern as Chapters 3–8.** Both entries also register
`notes: scienceF2C9NotesBM / DLP`, but that branch sits at `notes.tsx:2141`, after the
interactive branch in the same `? :` chain.

| Artefact | Status |
|---|---|
| `interactive-{bm,dlp}.ts` (9.2 / 8.4 KB) | **LIVE** |
| `quizzes-*`, `flashcards-*`, `mindmap-*` | **LIVE** |
| `notes-bm.ts` (22.4 KB) / `notes-dlp.ts` (21.3 KB) | **REGISTERED-BUT-NOT-RENDERED — DEAD/LEGACY** |

**No credit is given to `notes-*.ts`.** Note they are more than twice the size of the
live interactive files, so the dead surface likely holds material the live one lacks —
that is not a mitigation.

---

## Section architecture

Rendered walk of both streams, from the real registry entry:

| # | BM | DLP | SK | chars | controls |
|---|---|---|---|---|---|
| 1 | Hubungan antara Suhu dan Haba | Relationship between Temperature and Heat | 9.1 | 1,566 | 1 |
| 2 | Aliran Haba dan Keseimbangan Terma | Heat Flow and Thermal Equilibrium | 9.2 | 2,534 | 15 |
| 3 | Prinsip Pengembangan dan Pengecutan Jirim | Principle of Expansion and Contraction | 9.3 | 2,100 | 5 |
| 4 | Jenis Permukaan dan Penyerapan/Pembebasan Haba | Surface Type and Heat Absorption/Emission | 9.4 | 2,343 | 13 |

Four sections mapping to the four SKs — a cleaner start than Chapter 8's two, but
**section 2 alone carries three SPs** (9.2.1 transfer modes, 9.2.2 breezes, 9.2.3
conductors/insulators) and section 4 carries three more (9.4.1, 9.4.2, and nominally
9.4.3). 34 controls per stream, exact parity. Section 1 has a single control.

---

## SP coverage matrix

| SP | Source requirement | Live evidence | Status | Severity |
|---|---|---|---|---|
| **9.1.1** | Compare heat and temperature; J vs °C/K; heat depends on type/quantity/temperature, temperature on particle motion (Jadual 9.1, p.206) | §1 two cards reproduce Jadual 9.1 **exactly** | **COVERED** | — |
| **9.2.1** | Conduction (solid medium, particles **vibrate and collide**), convection (fluid expands, **less dense**, rises; denser sinks; **arus perolakan**), radiation (no medium, vacuum) — p.208 | 3 flip cards. Radiation correct. **Conduction card omits vibration/collision.** **Convection card omits density**; density and "arus perolakan" appear only inside a check hint | **PARTIAL** | MEDIUM |
| **9.2.2** | Sea breeze (day), land breeze (night), Sun→Earth by radiation — pp.209–210 | §2 tabs; both breezes correct and complete; Sun radiation in the radiation card | **COVERED** | — |
| **9.2.3** | **Maksud** konduktor haba, **maksud** penebat haba, applications — p.211 | Matcher with 4 correct applications. **Neither definition is stated anywhere** | **PARTIAL** | MEDIUM |
| **9.3.1** | Heating → particles move/vibrate faster → expansion; cooling → contraction, for solids, liquids, gases | §3 intro covers all three states; correctly says particles move further apart, **not** that particles expand | **COVERED** | — |
| **9.3.2** | Mercury thermometer · bimetallic fire alarm · railway gaps · bridge rollers | All four present. But the thermometer card says mercury is "berguna untuk **mengukur haba**" / "useful for **measuring heat**" | **INCORRECT** | HIGH |
| **9.4.1** | Dark, dull absorbs better than white, shiny | §4 tab + intro describing the two-tin experiment | **COVERED** | — |
| **9.4.2** | Dark, dull emits better than white, shiny | Same tab; emission correctly distinguished from absorption | **COVERED** | — |
| **9.4.3** | Project: Konsep Bangunan Hijau; design a green home reducing cooling/heating energy | **Nothing in the interactive notes.** Present only on quizzes, flashcards, mind map | **MISSING** | HIGH |

```
COVERED 5 | PARTIAL 2 | MISSING 1 | INCORRECT 1 | NOT_RENDERED 0 | CONFUSING 0
```

---

## CRITICAL

**None.** Chapter 9 has no Jadual 9 mandatory experiment, so the blocker class that
stopped Chapters 5–8 does not arise here.

---

## HIGH

### H-01 · INCORRECT · a thermometer is taught as measuring *heat*

- **Location:** `interactive-bm.ts` §9.3 accordion · `interactive-dlp.ts:83`
- **Current (BM):** "Merkuri ialah konduktor haba yang mengembang dan mengecut secara
  boleh diramal mengikut suhu, itulah yang menjadikannya berguna untuk **mengukur haba**."
- **Current (DLP):** "…which is exactly what makes it useful for **measuring heat**."
- **Source:** textbook p.211 — "Merkuri di dalam termometer ialah sejenis konduktor haba
  yang baik. Merkuri dapat **mengesan perubahan suhu** dengan cepat." The *"heat
  conductor"* framing is therefore source-backed; **"measuring heat" is not** — the
  source says it detects **temperature** change.
- **Problem:** A thermometer measures temperature, not heat. This contradicts the
  chapter's **own section 9.1**, which teaches that heat and temperature are different
  and gives their separate units — the single distinction SP 9.1.1 exists to establish.
  A learner meets both claims two sections apart, in both languages.
- **Severity:** HIGH.

### H-02 · MISSING · SP 9.4.3 (Green Building) absent from the notes

The interactive notes contain no *Bangunan Hijau* / *Green Building* content at all —
verified against 84,312 chars (BM) and 75,520 (DLP) of fully-revealed rendered text.
It exists only on secondary surfaces (quizzes `:479`, flashcards `:182` and `:492`,
mind map `c4-4-3` / `c4-7-3`).

The source is concrete and short (textbook p.218): reduce environmental and health
impact of rapid development, via **high energy efficiency through solar/renewable
energy**, **good water flow, air circulation and lighting systems**, and **use of
recycled materials**. DSKP adds the project brief — design a green home that reduces
the energy needed to cool or heat it.

A learner who studies only the notes never meets a standard the syllabus lists.

### H-03 · LEAKAGE · 44 learner-facing textbook activity/experiment references

| Surface | Occurrences |
|---|---|
| `interactive-bm` / `interactive-dlp` | **0** |
| `quizzes-bm` / `quizzes-dlp` | 7 + 7 |
| `flashcards-bm` / `flashcards-dlp` | 11 + 11 |
| `mindmap-bm` / `mindmap-dlp` | 4 + 4 |

Breakdown: `Aktiviti 9.1` / `Activity 9.1` ×14 · `Eksperimen 9.2` / `Experiment 9.2` ×12 ·
`Aktiviti 9.4` / `Activity 9.4` ×10 · `Eksperimen 9.1` / `Experiment 9.1` ×8.

Quiz stems read e.g. *"Dalam **Eksperimen 9.2**, dua tin susu…"* and *"Bagaimanakah
**Aktiviti 9.1** menunjukkan sinaran…"* — internal textbook numbering a learner has no
way to resolve. This is the same defect class remediated as M-02 in Chapter 7 and M-01
in Chapter 8, at **more than twenty times** Chapter 8's volume.

The interactive notes are clean, so this is entirely a deck problem.

### H-04 · MISSING · no instructional visuals anywhere

Runtime measurement: **0 `svg[role=img]` figures** and **0 interactive badges** in both
streams. The block types in use are only `cards`, `flipCards`, `accordions`, `tabs`,
`matcher`, `checks`.

Every high-risk visual named in the audit brief is absent:

| Required visual | Present |
|---|---|
| Conduction (particle-to-particle) | ✘ |
| Convection current loop | ✘ |
| Radiation through vacuum | ✘ |
| Sea breeze | ✘ |
| Land breeze | ✘ |
| Thermal expansion | ✘ |
| Bimetallic strip | ✘ |
| Dark vs shiny absorption/emission | ✘ |

Because nothing is drawn, **no arrow can be reversed** — but the two directional
processes this chapter turns on (convection circulation and the day/night breeze
reversal) are exactly the kind that learners understand from a diagram and struggle with
from prose. Chapter 7 ships 5 figures and Chapter 8 now ships 8; Chapter 9 ships none.

### H-05 · PARTIAL · compressed section architecture

Four sections for nine SPs, with section 2 carrying three SPs (transfer modes, breezes,
conductors/insulators) and section 4 carrying three more. This is the structural driver
of M-01, M-02 and M-03 below: the concept cards have no room for the mechanisms, so the
density explanation ends up in a check hint and the conductor/insulator definitions
disappear entirely.

---

## MEDIUM

| ID | Finding |
|---|---|
| **M-01** | **Conductor/insulator definitions absent.** DSKP 9.2.3 Catatan is explicit — "maksud konduktor haba, maksud penebat haba" — and the textbook states both plainly on p.211 ("Bahan yang boleh mengalirkan haba dikenali sebagai konduktor haba"; "Bahan yang boleh menghalang pengaliran haba dikenali sebagai penebat haba"). Neither appears on any live surface of the notes; the matcher jumps straight to applications. |
| **M-02** | **Conduction particle mechanism missing.** The card says only "Haba dipindahkan zarah demi zarah melalui pepejal". The source (p.208) specifies that particles receiving heat "**bergetar dan berlanggar** antara satu sama lain dengan lebih kerap". "Bergetar" appears in this chapter **only in section 9.3**, never in the conduction card. The brief's "no bulk particle movement" point is also unstated. |
| **M-03** | **Convection density mechanism buried.** The card says warm fluid "naik dan beredar" with no mention of density. The source's mechanism — expands → **kurang tumpat** → rises; cooler **lebih tumpat** sinks → **arus perolakan** — appears only inside the section-2 check *hint* about a kettle. The mechanism a learner is assessed on is not in the teaching card. |
| **M-04** | **Bimetallic metals deviate from source.** AcadeMY: "jalur kuprum mengembang lebih cepat daripada jalur **keluli**" (steel). Textbook p.215 Rajah 9.14 labels the strip **Kuprum / Besi** and the prose says "kuprum akan mengembang lebih cepat berbanding dengan **besi**". Bend direction and mechanism are correct; only the metal pair is wrong. |
| **M-05** | **Quiz answer-position skew.** `answerIndex` histogram, identical in both languages: **{A: 4, B: 25, C: 1, D: 0}**. Twenty-five of thirty answers are option B; option D is never correct. A learner who always picks B scores **83%** — a passing grade by guessing. Worse than Chapter 8's pre-remediation 7/20/3/0. |
| **M-06** | **No test coverage.** There is no `chapter-9/*.test.*` file, and `learner-facing-leakage.test.ts` contains **0 references to chapter-9** — which is why 44 leaks went undetected. |
| **M-07** | **Surface terminology.** AcadeMY uses "Permukaan gelap, **kasar**" (rough). DSKP 9.4.1/9.4.2 and textbook p.218 both use "gelap dan **kusam**" (dull). Roughness and dullness are not the same property. |

---

## LOW

- **L-01** — The roast-chicken aluminium-foil example (flashcards `:510`, mind map
  `c2-11-3`) is not in the source, and sits awkwardly beside AcadeMY's own correct
  statement that foil is a **conductor**: in Eksperimen 9.1 foil is the poorest of the
  three insulators tested. NotebookLM supplied this example; it should not be treated as
  source-required.
- **L-02** — The bimetallic account omits the source's setup detail that the circuit is
  **incomplete at room temperature**, which is what makes the closing action meaningful.
- **L-03** — Only **4 check questions** in the whole chapter (one per section) for nine SPs.
- **L-04** — Neither textbook experiment (9.1 insulators, 9.2 dark vs white) is staged as
  a structured investigation in the notes; Eksperimen 9.2's outcome is narrated in the
  §9.4 intro, and Eksperimen 9.1 appears only on the decks. Neither is mandatory, so this
  is a depth observation rather than a coverage gap.

---

## Heat vs temperature audit

Textbook Jadual 9.1 (printed p.206) against the live cards:

| Source | AcadeMY |
|---|---|
| Haba: suatu bentuk tenaga | "Satu bentuk tenaga" ✔ |
| Diukur dalam joule (J) | "Unit: joule (J)" ✔ |
| Kuantiti haba bergantung pada **jenis bahan, kuantiti bahan dan suhu** | "bergantung kepada jenis bahan, kuantiti bahan, dan suhu" ✔ exact |
| Suhu: darjah kepanasan atau kesejukan objek | "Tahap kepanasan atau kesejukan" ✔ |
| Diukur dalam °C atau kelvin (K) | "Unit: °C atau kelvin (K)" ✔ |
| Suhu bergantung pada **darjah pergerakan zarah-zarah** | "bergantung kepada sepantas mana zarah dalam jirim itu bergerak" ✔ |

The two are never conflated in section 9.1, and the mini-quiz explicitly tests the
distinction ("Haba dan suhu bermaksud perkara yang sama persis" → false). The intro also
makes the right point that two beakers at the same temperature can hold very different
amounts of heat.

**HEAT vs TEMPERATURE: PASS** in section 9.1 — but see **H-01**, where section 9.3
undoes it.

---

## Heat-transfer audit

| Mode | Source (p.208) | AcadeMY | Verdict |
|---|---|---|---|
| **Conduction** | through a **solid medium**; particles **vibrate and collide** more often, transferring heat through the medium | "Haba dipindahkan zarah demi zarah melalui pepejal — seperti sudu logam yang menjadi panas dalam sup panas" | solid ✔, mechanism ✘ (M-02) |
| **Convection** | fluid receiving heat **expands, becomes less dense, rises**; cooler **denser** part sinks; the circulation is the **arus perolakan** | "Bendalir yang dipanaskan (cecair atau gas) naik dan beredar, membawa haba bersamanya" | fluids ✔, density ✘ in card (M-03) |
| **Radiation** | transfer **without any medium**; travels through **empty space or vacuum** | "Haba merebak tanpa memerlukan sebarang medium — seperti cahaya matahari merentasi ruang kosong untuk sampai ke Bumi" | ✔ complete |

Nothing stated is wrong; conduction and convection are incomplete rather than incorrect.

**CONDUCTION: PASS** (with M-02) · **CONVECTION: PASS** (with M-03) · **RADIATION: PASS**

---

## Sea / land breeze audit

Source, textbook p.210, against the live tabs — checked clause by clause.

| | Source | AcadeMY |
|---|---|---|
| **Sea breeze** | Day. Sun heats land faster. Warm air on land expands, becomes less dense, rises. Cooler, **denser** sea air moves in → bayu laut | "Matahari memanaskan daratan lebih cepat berbanding laut. Udara panas di daratan naik, dan udara sejuk **yang lebih tumpat** daripada laut bergerak masuk menggantikannya — menghasilkan bayu yang bertiup **dari laut ke darat**" ✔ |
| **Land breeze** | Night. Land cools faster. Warmer air over the sea becomes less dense and rises. Cooler, denser land air moves seaward → bayu darat | "daratan menyejuk lebih cepat berbanding laut pada waktu malam. Udara yang lebih panas di atas laut naik, dan udara sejuk daripada daratan bergerak keluar menggantikannya — menghasilkan bayu yang bertiup **dari darat ke laut**" ✔ |
| **Sun → Earth** | Radiation only; the sole mode that crosses empty space | radiation flip card ✔ |

Both directions correct, both time-of-day contexts correct, and the quiz explanations in
both languages match. The land-breeze panel is genuinely reachable — see the interaction
audit.

**SEA/LAND BREEZE: PASS.**

---

## Conductors / insulators audit

| Requirement | Status |
|---|---|
| Definition of *konduktor haba* | ✘ absent (M-01) |
| Definition of *penebat haba* | ✘ absent (M-01) |
| Metal pan base | ✔ matcher |
| Iron soleplate | ✔ matcher |
| Oven gloves | ✔ matcher |
| Ice box (fibreglass / polystyrene) | ✔ matcher |
| Heating coil at the bottom of a kettle | ✔ section-2 check, correctly explained by convection |
| Trapped air as a poor conductor | ✘ — not a source-required example for 9.2.3 |
| Aluminium foil | correctly called a **conductor** on the decks ✔; the roast-chicken framing is unsourced (L-01) |

Applications are well chosen and match the textbook's own photographs. The gap is the
definitions the DSKP explicitly requires.

**CONDUCTORS/INSULATORS: PASS** with M-01 open.

---

## Expansion / contraction audit

Section 9.3 intro: *"Dalam pepejal, zarah bergetar pada kedudukan tetap — pemanasan
menyebabkannya bergetar lebih cepat dan **bergerak lebih jauh**, jadi **objek itu**
mengembang."*

- Particles move **further apart**; the **object** expands — the wording never says the
  particles themselves expand ✔
- Cooling correctly reversed ✔
- Liquids and gases covered, noting their particles are already free to move ✔

**EXPANSION/CONTRACTION: PASS.**

---

## Bimetallic strip audit

Source, textbook p.215 (Rajah 9.14):

> Strip labelled **Kuprum** / **Besi**. Circuit designed to be **incomplete at room
> temperature**. "Apabila litar terdedah kepada haba yang disebabkan oleh kebakaran,
> **kuprum akan mengembang lebih cepat** berbanding dengan besi dan menyebabkan jalur
> **membengkok ke arah skru sentuhan**. Keadaan ini akan melengkapkan litar sistem dan
> membunyikan penggera."

AcadeMY: *"jalur kuprum mengembang lebih cepat daripada jalur **keluli**, melenturkan
jalur **ke arah titik sentuhan**, melengkapkan litar dan membunyikan penggera."*

| Check | Result |
|---|---|
| Which metal expands more | copper ✔ |
| **Bending direction** | **toward the contact ✔ — correct** |
| Contact mechanism / circuit completion | ✔ |
| Alarm behaviour | ✔ |
| Metal pair | ✘ steel instead of iron (M-04) |
| Circuit open at room temperature | ✘ omitted (L-02) |
| Rendered diagram | none exists (H-04) |

The high-risk failure mode — a reversed bend — **does not occur**.

**BIMETALLIC STRIP: PASS** with M-04 open.

---

## Surface absorption / emission audit

Source conclusion, textbook p.218: *"Apabila suatu objek menyerap haba, suhunya
meningkat. Manakala, apabila suatu objek membebaskan haba, suhunya menurun. Permukaan
yang gelap dan kusam merupakan penyerap dan pembebas haba yang lebih baik daripada
permukaan yang cerah dan berkilat."*

| | AcadeMY |
|---|---|
| Dark/dull absorbs better | ✔ |
| Dark/dull **emits** better | ✔ — kept distinct from absorption |
| White/shiny poorer at both, reflects more | ✔ |
| Absorption ⇄ emission reversed anywhere | **no** — swept across all six decks and both interactive files |
| Tanker application | ✔ "trak tangki bahan api dicat putih atau perak, untuk mengelakkan bahan api daripada menyejat" — matches p.216 |
| Two-tin experiment outcome | ✔ black tin hotter (absorption) **and** cools faster (emission) |

The intro correctly narrates both halves of Eksperimen 9.2, which is the part learners
most often collapse into one idea. Only the "kasar" vs "kusam" wording deviates (M-07).

**ABSORPTION/EMISSION: PASS.**

---

## Green Building audit

**SP 9.4.3 is not taught on the primary learner surface.** See H-02.

What the source requires:

- **Textbook p.218:** the concept reduces environmental and health impact of rapid
  development; features are high energy efficiency via solar or renewable energy, good
  water-flow, air-circulation and lighting systems, and use of recycled materials.
- **DSKP 9.4.3 Catatan:** project-based — criteria include energy efficiency, water
  efficiency, sustainable construction site, building materials and innovation; students
  design a **Rumah Kediaman Hijau** that reduces the energy needed to cool or heat it.

The decks carry a serviceable summary, so the concept is not wholly absent from the
product — but the notes, the reflection list and the checks never mention it.

**No broken QR or URL is exposed** (see errata verification).

**GREEN BUILDING: FAIL.**

---

## Activities / experiments audit

Both textbook experiments reconstructed from source and compared with NotebookLM:

**Eksperimen 9.1 — insulators (printed p.212).** Problem: which of cotton, felt, or
aluminium foil is a good insulator? Hypothesis: cotton and felt are good. MV jenis bahan
penebat · RV suhu akhir · CV isi padu air. Four flat-bottomed flasks: **K** unwrapped
(control), **L** cotton, **M** felt, **N** aluminium foil. Record initial and final
temperature after 10 minutes. NotebookLM's account is **accurate**.

**Eksperimen 9.2 — dark vs white (printed pp.216–218).** Part A absorption: MV warna
permukaan · RV kenaikan suhu · CV jarak dari sumber haba. Part B emission: MV warna ·
RV penurunan suhu · CV isi padu air panas. Two milk tins **J** white, **K** black.
NotebookLM's account is **accurate**.

Neither is a Jadual 9 requirement, so no mandatory-experiment blocker applies. The
concepts they teach **are** reflected in AcadeMY — Eksperimen 9.2's outcome is narrated
in the §9.4 intro and both are assessed on the decks — so the substance survives even
though neither is staged as a structured investigation (L-04).

---

## Quiz audit

| | BM | DLP |
|---|---|---|
| Questions | 30 | 30 |
| Easy / Medium / Hard | 10 / 10 / 10 | 10 / 10 / 10 |
| Options each | 4 | 4 |
| Out-of-range `answerIndex` | **0** | **0** |
| Duplicate ids | 0 | 0 |
| Missing explanations | 0 | 0 |
| answerIndex / difficulty / id parity | **exact** | |
| **Answer positions A/B/C/D** | **4 / 25 / 1 / 0** | **4 / 25 / 1 / 0** |

**Keys are scientifically correct** on every high-risk topic I checked:

| Topic | Key |
|---|---|
| Sea breeze | warm land air expands and rises, cooler sea air drawn in ✔ |
| Land breeze | land cools faster, warm sea air rises ✔ |
| Absorption | tin K (black) greater temperature rise ✔ |
| Emission | tin K (black) greater temperature fall ✔ |
| Tanker | light colour absorbs less heat, reducing evaporation ✔ |
| Conduction | transfer through a solid medium ✔ |
| Convection | transfer by movement of fluids ✔ |
| Radiation | no medium needed, travels through vacuum ✔ |
| Bimetallic | copper expands faster ✔ |

Notably the quiz supplies the conductor/insulator and transfer-mode **definitions the
notes omit** — a learner meets them first in assessment.

Two defects: the positional skew (M-05) and the 14 leaked experiment/activity references
in stems and explanations (H-03).

**QUIZ KEYS: PASS. Position balance: FAIL.**

---

## Flashcard audit

60 / 60, ids aligned. Coverage is broader than the notes: Green Building, Eksperimen 9.1
and 9.2 outcomes, thermal equilibrium, the four expansion applications, absorption and
emission — all correct, with dark/dull consistently the better absorber **and** emitter.

Defects: **22 leaked references** (H-03) and the unsourced roast-chicken foil card
(L-01).

---

## Mind-map audit

154 / 154 nodes, **ids byte-identical** across languages, hierarchy following the four
SKs. Covers heat vs temperature, the three transfer modes, breezes, conductors and
insulators, expansion applications, absorption/emission and Green Building.

Defects: **8 leaked references** (H-03) and the same roast-chicken node (L-01).

---

## Interaction audit

34 controls per stream, **exact parity** per section (`1, 15, 5, 13`).

A sequential probe using `element.click()` flagged 13–14 controls as inert — **including
both breeze tabs**, which would have meant the land-breeze content was unreachable. That
reading was **wrong**: the tabs are Radix `role="tab"` triggers that respond to a pointer
sequence, not a bare synthetic click. Re-driven with `pointerdown → mousedown → pointerup
→ mouseup → click`, the second tab switches correctly (`aria-selected` `false,true`, panel
`data-state="active"`, *"Bayu darat…"* rendered).

Re-run with proper events, **all four tab panels are reachable in both languages**:

```
bm_seaBreeze true · bm_landBreeze true · bm_dark true · bm_light true · dlp_landBreeze true
```

The 19 controls still flagged are the matcher options and mini-quiz options, which lock
once used. Representatives of each class were re-tested in isolation on fresh mounts and
all respond — e.g. the matcher conductor label and its matching tool both change state,
and the mini-quiz "Sinaran" option returns *"Sinaran adalah cara haba daripada Matahari
merentasi ruang kosong untuk sampai k…"*.

**0 genuinely dead controls.**

**Discoverability is the weakness**: **0 interactive badges** render anywhere in the
chapter, so the tabs, matcher and flip cards present as passive tags. Chapters 7 and 8
carry the shared "✨ Interaktif / Tekan konsep untuk meneroka" affordance; Chapter 9 does
not.

**INTERACTIONS: PASS** (0 dead) — with the discoverability gap recorded under H-04.

---

## Visual audit

**There is nothing to audit.** 0 rendered figures in both streams (H-04). No arrow can be
reversed, no particle count can be wrong, no day/night context can be mislabelled —
because none is drawn.

Visuals whose absence materially hurts understanding, in priority order:

1. **Convection current loop** — the circulation is the concept; prose alone leaves it abstract
2. **Sea and land breeze** — a day/night pair is the standard way this is taught and examined
3. **Bimetallic strip** — bend direction and contact closure are inherently spatial
4. **Conduction particle chain** — would carry the vibrate-and-collide mechanism now missing
5. **Dark vs shiny two-tin comparison** — makes the absorption/emission pair concrete
6. **Radiation through vacuum** — the vacuum-jar setup explains why radiation is different
7. Thermal expansion particle spacing

---

## BM/DLP parity

| Dimension | Result |
|---|---|
| Sections | 4 / 4, same order and SK numbers |
| Controls per section | identical (`1, 15, 5, 13`) |
| Definitions, units, mechanisms | semantically equivalent |
| Breezes | both correct in both languages |
| Absorption/emission | both correct in both languages |
| Quizzes | 30 / 30, answerIndex + difficulty + id parity exact |
| Flashcards | 60 / 60 |
| Mind map | 154 / 154, ids byte-identical |
| Defects | H-01, H-02, H-03, M-04, M-07 all present **in both** languages |

No language-specific defect was found; the two streams fail and pass together.

**BM/DLP PARITY: PASS.**

---

## Learner-facing leakage

Swept across 84,312 chars (BM) and 75,520 (DLP) of fully-revealed interactive text, plus
all six assessment decks.

```
interactive-bm : 0        interactive-dlp : 0
quizzes-bm     : 7        quizzes-dlp     : 7
flashcards-bm  : 11       flashcards-dlp  : 11
mindmap-bm     : 4        mindmap-dlp     : 4
                                    TOTAL : 44
```

No `DSKP`, `SK n`, `SP n`, `Jadual 9`, `Rajah 9.x`, `Figure 9.x`, `buku teks`, `audit`,
`mandatory` or `reviewer` hits anywhere.

*Adjudicated, not counted:* the headings "Semak diri — 9.1 … 9.4". As established for
Chapters 7 and 8, these are the textbook's own learner-facing subtopic numbers (9.1
Hubung Kait Suhu dengan Haba, etc.). No three-part SP code appears.

**LEAKAGE: 44.**

---

## Tests

```
TYPECHECK              PASS   tsc --noEmit, exit 0
BUILD                  PASS   npm run build, exit 0
CHAPTER 9 TESTS        NONE   no chapter-9 test file exists
SCIENCE F2 TESTS       PASS   602 / 602
LEAKAGE SUITE          PASS    64 / 64 — but Chapter 9 is NOT in its scope
QUIZ INTEGRITY         PASS   0 out-of-range keys, 0 duplicate ids, parity exact
BM/DLP PARITY          PASS
FULL SUITE             2118 passed | 8 failed (194 files)
```

**Unrelated pre-existing failures**, unchanged in identity and count from prior runs:
onboarding UI contract · billing ToyyibPay plans · invoice PDF · four BM mind-map
registry tests · Math F2 Chapter 1 DLP routing.
**0 are Chapter 9. 0 are Science Form 2.**

---

## Recommended remediation

Nothing below was implemented.

**P1 — correctness and coverage**

1. **H-01** — Rewrite the thermometer card in both languages. Mercury expands and
   contracts predictably, letting a thermometer **detect and measure temperature**
   (source: "mengesan perubahan suhu"). Do not say it measures heat.
2. **H-02** — Add Green Building to the notes, using the textbook p.218 feature list, and
   add the DSKP design brief as a project prompt.
3. **H-03** — Strip all 44 `Aktiviti 9.x` / `Eksperimen 9.x` references from quizzes,
   flashcards and mind map. Keep the science; describe the setup ("dua tin susu, satu
   putih dan satu hitam…") instead of numbering it.
4. **M-01** — Add the two definitions from textbook p.211 to section 2.

**P2 — structure and visuals**

5. **H-05** — Split into roughly 9–10 learner-sized sections so each SP has its own home.
6. **H-04** — Add the instructional figures, in the priority order listed in the visual
   audit. Convection, the breeze pair and the bimetallic strip carry the most weight.
7. **M-02 / M-03** — Move the vibrate-and-collide mechanism into the conduction card and
   the density mechanism into the convection card, rather than a check hint.
8. Apply the shared "✨ Interaktif" affordance to the tabs, matcher and any new figures.

**P3 — hygiene**

9. **M-04** — Change the bimetallic pair to copper and **iron**, matching Rajah 9.14.
10. **M-05** — Rebalance quiz answer positions across A/B/C/D, updating `answerIndex`
    correctly and preserving every answer's text.
11. **M-06** — Add a `chapter-9` test file and extend `learner-facing-leakage.test.ts` to
    Chapter 9.
12. **M-07** — Use "kusam" (dull) rather than "kasar" (rough) for surfaces.
13. **L-01/L-02/L-03** — Drop or source the roast-chicken example; add the
    circuit-open-at-room-temperature detail; add more check questions.

**Protect during remediation** (verified correct, do not weaken): Jadual 9.1 heat/
temperature comparison; both breeze explanations including density; the radiation
no-medium statement; thermal equilibrium; particle behaviour in expansion; the bimetallic
bend direction; absorption **and** emission both favouring dark/dull; the tanker
application; all 30 quiz keys; the matcher applications; the kettle convection hint.

---

CHAPTER 9 VERDICT:
FAIL — HUMAN REVIEW REQUIRED

CRITICAL:
0

HIGH:
5

MEDIUM:
7

LOW:
4

SP COVERAGE:
COVERED: 5
PARTIAL: 2
MISSING: 1
INCORRECT: 1
NOT_RENDERED: 0
CONFUSING: 0

JADUAL 9 CHAPTER 9:
NONE

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
FAIL

PAGE 218 ERRATA:
PASS

QUIZ KEYS:
PASS

INTERACTIONS:
PASS

BM/DLP PARITY:
PASS

LEAKAGE:
44

TYPECHECK:
PASS

BUILD:
PASS

TESTS:
PASS — Science F2 602/602; no Chapter 9 suite exists

ACADEMY CONTENT MODIFIED:
NO

AUDIT ONLY:
YES
