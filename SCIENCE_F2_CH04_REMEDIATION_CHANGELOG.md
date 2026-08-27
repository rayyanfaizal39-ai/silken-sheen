# REMEDIATION CHANGELOG — Sains / Science Tingkatan 2, Bab 4: Kesihatan Manusia (BM + DLP)

**Date:** 2026-08-26
**Specification:** `SCIENCE_F2_CH04_DEEP_AUDIT_REPORT.md`, re-checked against
`audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf`.
**Status:** Chapter 4 is **NOT frozen.** A fresh independent release-gate audit is required.

---

## 1. ARCHITECTURE

| File | Before | After | Status |
|---|---|---|---|
| `chapter-4/interactive-bm.ts` | 7.2 KB · **2 sections** | **32 KB · 11 sections** | LIVE — rewritten |
| `chapter-4/interactive-dlp.ts` | 7.1 KB · **2 sections** | **31 KB · 11 sections** | LIVE — rewritten |
| `chapter-4/mindmap-{bm,dlp}.ts` | accurate but incomplete | + social-impact branch, + specific/non-specific labels | LIVE — extended |
| `chapter-4/quizzes-{bm,dlp}.ts` | 30 items each, source-accurate | **untouched** | LIVE |
| `chapter-4/flashcards-{bm,dlp}.ts` | 60 each, source-accurate | **untouched** | LIVE |
| `chapter-4/notes-{bm,dlp}.ts` | 27.7 / 26.9 KB | **unchanged, still not rendered** | LEGACY — retained as source material, never rendered in parallel |

The interactive-notes pipeline remains the single learner-facing surface; the legacy notes were
mined for verified wording and left in place, exactly as in Chapters 1–3.

**New shared components** (reusable by later chapters, registered as optional section blocks):

- [`ImmuneResponseGraph.tsx`](src/components/notes/blocks/ImmuneResponseGraph.tsx) — SVG, not an image
- [`DefenceLinesDiagram.tsx`](src/components/notes/blocks/DefenceLinesDiagram.tsx)
- [`ImmunityMatrix.tsx`](src/components/notes/blocks/ImmunityMatrix.tsx)

**Section flow (11, identical order in both languages):**

1. Penyakit Berjangkit dan Penyakit Tidak Berjangkit · 2. Cara Penyakit Berjangkit Disebarkan ·
3. Patogen, Vektor dan Penyakit · 4. Menghalang Penularan Penyakit · 5. Tiga Barisan Pertahanan Badan ·
6. Antigen, Antibodi dan Keimunan · 7. Imunisasi · 8. Keimunan Aktif dan Keimunan Pasif ·
9. Respon Imun Primer dan Sekunder · 10. Sistem Keimunan yang Mantap · 11. Kesihatan, Imunisasi dan
Masyarakat

Section eyebrows use the **textbook's own two topic numbers (4.1 / 4.2)** — the numbers a student
sees in their own book — never SP codes.

---

## 2. CRITICAL FIXES

### C-01 — Three prevention stages corrected to Jadual 4.3

The previous notes taught a generic public-health model: vector control under *primer*, and
*"kurangkan komplikasi… rehabilitasi"* as *tertier*. Both are now replaced with the textbook's model.

| Stage | Now teaches |
|---|---|
| **Primer** | Raises health through personal, family, household cleanliness and sanitation; raises resistance through vaccination of babies, children, pregnant women, food-premises handlers, haj pilgrims and travellers |
| **Sekunder** | Periodic health checks, healthy lifestyle; breaks transmission through active and passive case detection — early treatment, isolating patients |
| **Tertier** | **Vector population control** (destroy breeding and sheltering sites, spraying, legal fines on unclean food premises) **and host protection** (mosquito nets, repellent, thick clothing) |

The word *rehabilitasi / rehabilitation* now appears **nowhere** in the chapter, and a "⚠️ Jangan
keliru" card names the trap explicitly. **Notes, quiz q16, flashcard f48 and the mind map now agree.**

### C-02 — Three lines of defence rewritten to Form 2 scope

| Line | Now teaches | Removed |
|---|---|---|
| **First** — non-specific | Skin (tough layer; sweat and sebum contain microorganism-destroying chemicals) **and mucous membrane** (lines digestive and respiratory tracts; nose hairs filter, mucus traps; ear wax, tears and vaginal secretions act as antiseptic) | — |
| **Second** — non-specific | **Phagocytosis** — white blood cells engulf and digest pathogens using enzymes | *keradangan* (inflammation), *demam* (fever) |
| **Third** — specific | Immune system; white blood cells produce antibodies specific to the antigen; antibodies attach to the pathogen so it cannot enter host cells, and cause agglutination | *limfosit*, *sel memori* |

Also removed from the defence lines: **silia** and **asid perut**, neither of which the Form 2 source
places there. The **non-specific / specific** classification is now drawn explicitly as the diagram's
own grouping — the piece Latihan Sumatif Q5(a) tests and which was previously absent.

Measured in the live files: `fagositosis` 5 · `sel darah putih` 8 · `membran mukus` 3 ·
`spesifik` 7 (BM) / 12 (DLP) — every one of them previously **0**.

### C-03 — Antigen, antibody and immunity now defined

A dedicated section carries the three definitions, source-faithful to textbook p. 83:

- **Antigen** — *"Jasad asing atau bahan yang bukan daripada badan sendiri yang merangsang penghasilan
  antibodi. Antigen terdapat pada patogen, molekul toksin dan sel darah daripada kumpulan darah yang lain."*
- **Antibodi** — *"Protein yang dihasilkan oleh sel darah putih ke dalam aliran darah sebagai gerak
  balas terhadap antigen."*
- **Keimunan** — *"Keupayaan sistem badan melawan sesuatu patogen sebelum badan dijangkiti patogen tersebut."*

A cause-and-effect block then shows the relationship: antigen detected → white blood cells stimulated
→ specific antibodies produced → antibodies attach and agglutinate → immunity.

**Note on the source map.** It warned that antigen and immunity have no formal textbook definitions.
That warning is wrong — p. 83 defines all three verbatim — so the definitions here are quoted from the
textbook rather than invented, as the deep audit established.

### C-04 — Immunisation section added (was entirely absent)

`imunisasi` went from **0** to **17** occurrences. The section teaches: what immunisation is (*"usaha
untuk memberikan daya tahan secara aktif… dengan memasukkan vaksin"*); what a vaccine contains
(*"antigen… daripada… virus atau bakteria yang telah dilemahkan atau dimatikan"*); how it stimulates
active immunity without causing the disease; why several different vaccines are needed; and vaccine
safety.

Per the brief, the schedule is **compact and supporting, not a memorisation table** — an accordion
names BCG, Hepatitis B, DTaP, Polio (IPV), MMR and HPV with what each protects against, and says
plainly *"anda tidak perlu menghafal seluruh jadual."* A second accordion explains booster doses and
links forward to the response graph.

### C-05 — Social and economic impact added (was entirely absent)

`kusta` 1 · `insurans` 2 · `migrasi` 1 — all previously **0**. Four cause-and-effect chains cover the
six source aspects: controlled recurrence (kusta, batuk kokol, tibi); healthcare costs; work quality
and workforce migration; insurance and quality of life.

**Wording guard:** the chapter says immunisation *helps CONTROL recurrence and reduce risk of spread*.
The words *menghapuskan penyakit / eradicate* appear nowhere, and a regression test enforces this.

---

## 3. COVERAGE — ALL 10 SPs

Judged against the **rendered** learner surface, runtime-confirmed in both languages.

| SP | Requirement | Where it now lives | Status |
|---|---|---|---|
| 4.1.1 | Distinguish infectious / non-infectious | §1 — comparison + pathogen definition; DSKP-required examples restored across §2 | **COVERED** |
| 4.1.2 | Explain how infectious disease spreads | §2 — four routes, each with examples and prevention; plus how mosquitoes and houseflies transmit | **COVERED** |
| 4.1.3 | Analyse cause and transmission | §3 — pathogen / vector / disease separated; all 6 Jadual 4.1 pairs; pathogen→disease and symptom columns | **COVERED** |
| 4.1.4 | Generate ideas to block transmission | §4 — the corrected three stages | **COVERED** |
| 4.2.1 | Function of the body's defence system | §5 — interactive three-line diagram with non-specific/specific grouping | **COVERED** |
| 4.2.2 | Define antigen, antibody, immunity | §6 definitions + §9 primary/secondary response graph | **COVERED** |
| 4.2.3 | Justify the importance of immunisation | §7 | **COVERED** |
| 4.2.4 | Distinguish passive and active immunity | §8 — 2×2 matrix, antiserum defined | **COVERED** |
| 4.2.5 | Justify practices for strong immunity | §10 — re-anchored on nutrition / physical activity / lifestyle with the p. 87 factors | **COVERED** |
| 4.2.6 | Immunisation and individual health for family, society, economy, country | §11 | **COVERED** |

```
COVERED: 10   PARTIAL: 0   MISSING: 0   INCORRECT: 0   NOT_RENDERED: 0   CONFUSING: 0
```

Every section was rendered and walked at runtime; nothing is credited on file presence alone.

### Disease examples restored

| Route | Now taught |
|---|---|
| Udara | tuberkulosis, selesema, **SARS**, **Influenza A (H1N1)**, cacar air; droplet and dust infection |
| Air | taun (kolera), demam kepialu, **disentri ameba** |
| Sentuhan | **kurap**, **panau** (both fungal); sifilis, gonorea; HIV/AIDS |
| Vektor | kencing tikus, denggi, malaria, Zika, **Chikungunya** |

All previously **0** occurrences. Taught by transmission mode, not as one memorisation list.

---

## 4. VISUALS / INTERACTIONS

Chapter 4 had **zero** instructional visuals. It now has three, all HTML/SVG — no generated images,
no decorative filler.

| Visual | Section | Interaction | Labels |
|---|---|---|---|
| **Three lines of defence** | §5 | Click any line → its function appears in a fixed panel; active line highlighted | Direct labels: *Kulit dan membran mukus* · *Sel darah putih — fagositosis* · *Sistem keimunan — penghasilan antibodi*, grouped under *Pertahanan tidak spesifik* / *Pertahanan spesifik* |
| **Immunity 2×2 matrix** | §8 | Click any cell → how acquired, speed, duration | Rows *Aktif / Pasif*, columns *Semula jadi / Buatan*; each cell shows source + duration at a glance |
| **Primary/secondary response graph** | §9 | Click any of four labels → explanation; the matching curve or exposure marker highlights | *Pendedahan pertama · Respon primer · Pendedahan kedua · Respon sekunder*, with *Aras keimunan* drawn as a dashed threshold, axes labelled *Masa (minggu)* and *Kepekatan antibodi dalam darah (%)* |

**Interaction standard met:** every control is a real `<button>` with `aria-pressed`, hover, focus and
active states; each figure has **one** explanation panel in a fixed position that reserves its height,
so selecting a label never shifts the page.

**Runtime verification — 11 interactive controls clicked per language, 0 dead**, desktop and mobile.

**Mobile (375 px):** 11 sections, 0 dead controls, no horizontal overflow, graph fits the viewport,
**0 tap targets under 32 px** (one round of QA raised the graph label chips to a 36 px minimum).

---

## 5. QUIZ / FLASHCARD / MIND-MAP CHANGES

- **Quizzes — untouched.** 30 BM + 30 DLP, answer indices, difficulty and coverage unchanged. They
  were the more source-faithful layer and were not weakened. The learning loop is now closed from the
  other side: the notes teach first line of defence, phagocytosis, mucous membrane, immunisation,
  vaccine contents, schedule examples, the primary/secondary graph, the three prevention stages, the
  haj-pilgrim example and contact transmission (kurap) — all of which the quizzes already tested.
- **Flashcards — untouched.** 60 + 60, already accurate.
- **Mind map — extended only:**
  - new *Kesihatan, Imunisasi & Masyarakat* branch (controlled recurrence · healthcare costs · work
    quality and migration · insurance and quality of life), so SP 4.2.6 now appears there too;
  - defence-line labels now carry the **non-specific / specific** classification.

---

## 6. BM / DLP PARITY

| Check | Result |
|---|---|
| Section count and order | 11 / 11, identical `number` sequence |
| Block shape per section | Identical (asserted programmatically in the regression test) |
| Reflection items | 10 / 10 |
| Mini-quiz | 3 / 3, same types, same answers |
| New interactive blocks | All three present in both, same cell/line/item ids |
| Runtime | 11 sections walked, 11 controls clicked, 0 dead — in **both** languages, desktop and mobile |

DLP is a natural-English rendering, not a word-for-word translation, but carries the same concepts,
examples and depth.

---

## 7. REGRESSION TESTS

New: [`chapter-4-remediation.test.tsx`](src/content/form2/science/chapter-4/chapter-4-remediation.test.tsx)
— **19 tests**, each guarding a defect the audit actually found. All 15 required guards are covered:

| # | Guard |
|---|---|
| 1 | Vector control is in tertiary prevention, never primary |
| 2 | Rehabilitation never returns as the tertiary model |
| 3 | Phagocytosis present in the second line |
| 4 | White blood cells present |
| 5 | Mucous membrane present in the first line |
| 6–8 | Antigen, antibody and immunity all defined, with source-faithful wording |
| 9 | Immunisation section exists and explains weakened/killed antigen |
| 10 | Social/economic content present (leprosy, whooping cough, costs, insurance, migration, work quality) |
| 11 | Non-specific / specific classification, 2 lines vs 1 |
| 12 | Response graph present, four labels, none without an explanation |
| 13 | Pathogen defined |
| 14 | BM/DLP section-count and block-shape parity |
| 15 | No DSKP / SP / SK / textbook / Rajah / Jadual / audit leakage |

Plus: out-of-scope mechanisms stay out (silia, asid perut, sel memori, keradangan); no eradication
claim; the vector matcher stays strictly **vector → pathogen**; the four immunity types form a
complete 2×2 with antiserum defined; all 11 sections render non-empty in both languages; and the three
new blocks actually render.

**Extended:** `learner-facing-leakage.test.ts` now covers Chapter 4's eight live surfaces —
**32 tests** (was 24).

*One test assertion was corrected during development, not the content: an early check rejected any
match containing a disease word, which wrongly flagged "Virus denggi" — the pathogen. It now asserts
positively that each match names a pathogen (virus / bakteria / Plasmodium / Salmonella / Leptospira).*

---

## 8. BUILD / TEST RESULTS

```
TYPECHECK (npx tsc --noEmit)                       PASS
BUILD (npm run build)                              PASS
Chapter 4 regression tests                         PASS  (19/19, new)
Science F2 + notes tests                           PASS  (9 files / 102 tests)
Learner-facing leakage (now incl. Ch4)             PASS  (32/32)
BM/DLP parity checks                               PASS
Runtime render, BM + DLP, desktop + mobile         CONFIRMED
```

Full suite: **1453 passed, 7 failed.** The 7 are **pre-existing and unrelated** —
`src/content/bm/*-mindmap` (×4), Math F2 C1 `quizzes-dlp`, `billing-core`, `invoice-pdf.server` —
present before this work and unchanged by it. Passing count rose from 1426 to 1453 (+27: 19 new
Chapter 4 tests, 8 new leakage surfaces). Nothing was hidden or suppressed.

---

## CHAPTER 4 REMEDIATION: **COMPLETE**

```
CRITICAL REMAINING: 0
HIGH REMAINING:     0
MEDIUM REMAINING:   2   (see below)
LOW REMAINING:      1

SP COVERAGE
COVERED:       10
PARTIAL:        0
MISSING:        0
INCORRECT:      0
NOT_RENDERED:   0

BM/DLP PARITY:            PASS
LEARNER-FACING LEAKAGE:   PASS
TYPECHECK:                PASS
BUILD:                    PASS
TESTS:                    PASS  (7 pre-existing unrelated failures unchanged)
```

### Remaining, disclosed rather than hidden

- **MEDIUM — no assessment for SP 4.2.6.** The brief allowed adding quiz coverage "if appropriate";
  the chapter now *teaches* the social/economic content but no quiz item tests it. Adding items means
  touching the quiz bank, which the brief told me to leave alone, so I did not. Worth a follow-up.
- **MEDIUM — Jadual 4.2 (disease · symptom · pathogen · vector · transmission) is taught as a
  two-column comparison** rather than a table. It is complete and correct, but a sortable table would
  read better; deferred as UX polish rather than a coverage gap.
- **LOW — terminology.** Learner-facing text now standardises on the source's **tertier**; the
  untouched quizzes and flashcards still say *tertiari* internally. Same concept, and the meaning is
  unambiguous, but the two forms coexist across surfaces. Fixing it means editing the quiz bank.

### Not frozen

Chapter 4 must undergo a **fresh independent release-gate audit** before freeze. In particular an
independent reviewer should re-derive the three prevention stages, the defence-line scope and the four
immunity types from the PDFs rather than from this changelog.
