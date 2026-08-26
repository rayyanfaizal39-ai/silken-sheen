# DEEP AUDIT — Sains / Science Tingkatan 2, Bab 4: Kesihatan Manusia (BM + DLP)

**Mode:** READ-ONLY. No learner-facing content modified. Only this report was created.
**Date:** 2026-08-26
**Scope:** `science-f2-c4-bm` and `science-f2-c4-dlp`.
**Independence:** `SCIENCE_F2_CH04_NOTEBOOKLM_SOURCE_MAP.md` was used **only as a checklist**. Every SP,
definition, example, table and errata claim was re-derived from the PDFs. Where the source map is
wrong, §3 records the correction.

---

## 1. VERDICT

# FAIL — HUMAN REVIEW REQUIRED

Chapter 4 is in the **pre-remediation state that Chapters 1–3 have already been through**, and it is
worse than any of them were: the live notes are 7.2 KB against a 27.7 KB registered-but-unreachable
file, they contain **factual divergences from the textbook**, and **three of ten Standard Pembelajaran
have no student-facing teaching at all**.

The unusual and decisive feature of this chapter is that **AcadeMY's own quizzes, flashcards and mind
map are accurate and textbook-faithful, while the live notes are not** — so the chapter actively
contradicts itself, and a student who studies the notes will answer the chapter's own questions wrong.

```
CRITICAL: 4
HIGH:     6
MEDIUM:   7
LOW:      4

SP COVERAGE (live notes surface, 10 SPs)
COVERED:       1
PARTIAL:       5
MISSING:       3
INCORRECT:     1
NOT_RENDERED:  0 (the whole 27.7 KB notes asset is unreachable — counted under HIGH-02, not per-SP)

ACADEMY CONTENT MODIFIED: NO
AUDIT ONLY: YES
```

---

## 2. SOURCE PROVENANCE

| Source | Identity verified from the file | Standing |
|---|---|---|
| `audit-sources/Science/Form-2/DSKP.pdf` | KPM/BPK *KSSM Sains Tingkatan 2 DSKP*. Bab 4 = printed **pp. 54–57** (PDF pp. 66–69). Jadual 9 (mandatory experiments) = printed p. 33. | **Binding** |
| `audit-sources/Science/Form-2/Textbook.pdf` | KPM *Sains Tingkatan 2* (BM), ISBN 978-967-14472-6-0. Bab 4 = printed **pp. 74–92** (PDF pp. 82–100). Answer key printed **p. 280**. | **Binding** |
| `audit-sources/Science/Form-2/Errata.pdf` | Header: *"Status: VERIFIED MIRRORED PUBLISHER-CORRECTION RECORD"*. Its own §2 states: *"No surviving copy hosted directly on an official KPM/Bahagian Buku Teks or Karangkraf domain was located… this file **must not be described as an official-hosted original**."* | **Advisory only** |

### Reconstructed chapter (independent of AcadeMY and of the source map)

**SK 4.1 Penyakit berjangkit dan penyakit tidak berjangkit** — SP 4.1.1, 4.1.2, 4.1.3, 4.1.4
**SK 4.2 Pertahanan badan** — SP 4.2.1, 4.2.2, 4.2.3, 4.2.4, 4.2.5, 4.2.6
**Total: 10 SPs** — confirmed directly from DSKP pp. 54–56.

**Binding DSKP Catatan (verbatim scope), by SP:**

- **4.1.1** — Penyakit berjangkit: *Air* — taun/kolera; *Udara* — Tibi, H1N1, SARS, Selesema;
  *Sentuhan* — kurap, panau; *Vektor* — kencing tikus, denggi, malaria, Zika.
  Penyakit tidak berjangkit: Kanser, Hipertensi, Diabetes, Penyakit kardiovaskular.
  Plus a *Pembelajaran berasaskan projek* (MOH statistics case study).
- **4.1.2, 4.1.3, 4.1.4** — **no Catatan at all.** Scope comes from the SP verb plus the textbook.
- **4.2.1** — multimedia presentation on how the defence system fights infection; refers to HEBAT
  Sains Modul 25. **The DSKP does not itself enumerate the three lines** — that is textbook content.
- **4.2.2** — collect childhood immunisation types; from the schedule, assess the antigen–antibody
  relationship and the effect of repeat immunisation, *"(perkenalkan **graf respon imunisasi primer
  dan sekunder**)"* — the graph is explicitly DSKP-scoped.
- **4.2.3, 4.2.4** — no Catatan.
- **4.2.5** — list practices that promote **or weaken** immunity across: *Pemakanan* (local fruit,
  cooking, vegetables), *Aktiviti fizikal*, *Gaya hidup*.
- **4.2.6** — brainstorm across six aspects: controlled recurrence of disease (kusta, batuk kokol,
  tibi); rising healthcare cost; impaired work quality; insurance purchase; quality of life;
  workforce (migration).

**Mandatory experiments:** DSKP **Jadual 9** (printed p. 33) lists, for the whole theme
*Penyenggaraan dan Kesinambungan Hidup*, only **3.4.1**. **Chapter 4 has no mandatory investigation.**
Aktiviti 4.1, 4.2 and 4.3 are suggested activities, not WAJIB.

**Textbook order:** p. 74 chapter opener · p. 75 Blog Sains (Zika) + Kata Kunci · **4.1** p. 76
(disease definition, pathogen definition, Rajah 4.1) · p. 77 airborne (Rajah 4.2: droplet + dust) ·
p. 78 waterborne · p. 79 contact + **Jadual 4.1 vector→pathogen** · p. 80 Rajah 4.3 + **Jadual 4.2
disease/symptom/pathogen/vector/transmission** · p. 81 **Jadual 4.3 three prevention stages** +
Aktiviti 4.1 + Latihan Formatif 4.1 · **4.2** p. 82 **Rajah 4.4** (three lines; specific vs
non-specific) · p. 83 definitions · p. 84 Aktiviti 4.2 + immunisation · p. 85 **Jadual 4.4**
vaccination schedule · p. 86 active/passive with **Rajah 4.5–4.8** · p. 87 strong immunity (Gambar
foto 4.4) · p. 88 Aktiviti 4.3 + Latihan Formatif 4.2 · p. 89 Rumusan · pp. 90–92 Latihan Sumatif 4.

### Errata — Chapter 4

- **Factual corrections: NONE.** The correction table lists only pp. 53, 71 (Bab 3), 151 (Bab 7),
  173 (Bab 8).
- **QR/resource-link flags:** the broken-resource page list is *6, 53, 55, 59, **77, 78, 81, 84**,
  129, 218, 232* — four of those (77, 78, 81, 84) fall inside Chapter 4.
- **No Chapter 4 item in this audit is described as errata-verified**, and the flags must not be
  called "officially flagged" (see §3-J).

---

## 3. NOTEBOOKLM CORRECTIONS

The source map is broadly usable but **six claims fail verification**, two of them materially.

| # | Source-map claim | Verified position |
|---|---|---|
| **1** | *"Patogen: not formally defined in the textbook glossary"* | **Wrong.** Textbook **p. 76** defines it inline: *"patogen, iaitu organisma yang menyebabkan penyakit… semua virus, sesetengah bakteria, protozoa, kulat dan cacing."* |
| **2** | ⚠️ *Critical QA Warning*: *"the provided excerpts do not contain explicit, formal textbook definitions for **Antigen** and **Keimunan**"* | **Wrong, and it is the source map's headline warning.** Textbook **p. 83** defines all three verbatim — *Keimunan*: "keupayaan sistem badan melawan sesuatu patogen sebelum badan dijangkiti"; *Antibodi*: "protein yang dihasilkan oleh sel darah putih ke dalam aliran darah sebagai gerak balas terhadap antigen"; *Antigen*: "jasad asing atau bahan yang bukan daripada badan sendiri yang merangsang penghasilan antibodi." AcadeMY must **not** treat these as unsourced. |
| **3** | Vector–pathogen pairs = **three** (lipas, lalat, Aedes→dengue) | **Incomplete.** **Jadual 4.1 (p. 79) has six**: Lipas→*Salmonella typhi*; Lalat→*Salmonella typhi*; Nyamuk Aedes→Virus Denggi; Nyamuk Aedes→Virus Zika; Nyamuk Anopheles→*Plasmodium malariae*; Tikus→Bakteria *Leptospira* sp. The table is **vector → pathogen** (answering the audit question directly). A **separate** Jadual 4.2 (p. 80) maps disease · symptom · pathogen · vector · transmission. The source map conflates the two. |
| **4** | SP 4.1.4 = vector control + host protection | **Materially incomplete.** That is only the **tertiary** stage. **Jadual 4.3 (p. 81)** defines **three** stages — *primer* (raise health/hygiene/sanitation; raise resistance via vaccination of babies, children, pregnant women, food handlers, haj pilgrims, travellers), *sekunder* (periodic health checks, healthy lifestyle, break transmission by active/passive case detection, early treatment, isolate patients), *tertier* (control vector population incl. legal fines; protect host with nets, repellent, thick clothing). |
| **5** | First line of defence = *"skin, sweat, sebum"* | **Incomplete.** Textbook p. 83 gives **Kulit *and* Membran mukus** — mucous membrane lining the digestive and respiratory tracts, nose hairs filtering, mucus trapping, plus **ear wax, tears and vaginal secretions acting as antiseptic.** The source map omits the entire mucous-membrane half. It also omits the textbook's **specific vs non-specific** classification (lines 1+2 = *tidak spesifik*; line 3 = *spesifik*), which Latihan Sumatif 4 Q5(a) tests directly. |
| **6** | Contact transmission = *"kurap, panau"* only | **Incomplete.** p. 79 also covers **sifilis and gonorea** (sexual contact) and **HIV/AIDS** (sex, blood, shared needles). |

**Claims that verified as CORRECT** (recorded so they are not re-litigated): the 10-SP structure and
numbering; no mandatory WAJIB investigation for Ch4; kepialu and disentri ameba as waterborne
examples (textbook p. 78, though **not** in the DSKP Catatan, which lists only taun/kolera);
Chikungunya as a vector disease (textbook **Rumusan p. 89**, not the DSKP Catatan); and — contrary to
this audit's own prior suspicion — **"ketidakseimbangan dalam badan atau terlalu banyak toksin" IS
source-supported** (textbook p. 87 verbatim), so the source map's SP 4.2.5 wording stands.

**Two overstatements to correct:**
- **(G)** The source map says immunisation achieves *"disease eradication"*. **No source supports
  eradication.** DSKP says *"pengulangan penyakit yang **terkawal**"* (controlled recurrence) and the
  textbook p. 84 says immunisation *"memberikan daya tahan secara aktif"*. Do not upgrade to eradication.
- **(J)** The source map calls the QR flags *"officially flagged"*. The errata file **self-disclaims**
  official hosting. They are flagged in a **mirrored publisher-correction record**, nothing stronger.

---

## 4. LIVE PRODUCTION PATH

```
registry.ts:3443-3470   science-f2-c4-bm / -dlp
                        ├── mindMap     scienceF2C4MindMap{BM,DLP}
                        ├── notes       scienceF2C4Notes{BM,DLP}          ← registered
                        ├── sciF2InteractiveData  scienceF2C4Interactive{BM,DLP}
                        ├── flashcards  scienceF2C4Flashcards{BM,DLP}
                        └── quiz        scienceF2C4Quizzes{BM,DLP}

notes.tsx:1999          } : activeChapter?.sciF2InteractiveData ? (   ← wins
notes.tsx:2110          } : ( activeChapter?.notes && <NotesBlock …/> ) ← never reached
```

Chapter 4 falls through the `chapter === 2 … 12` ladder to the final `<ScienceF2Chapter13NotesBlock>`
branch (`notes.tsx:2098`), which is the same shared `ScienceF2InteractiveNotesBlock`.

| Asset | Size | Status |
|---|---|---|
| `chapter-4/interactive-bm.ts` / `-dlp.ts` | **7.2 KB / 7.1 KB** | **LIVE** — what students read |
| `chapter-4/notes-bm.ts` / `-dlp.ts` | **27.7 KB / 26.9 KB** | **DEAD / REGISTERED-BUT-NOT-RENDERED** |
| `chapter-4/quizzes-{bm,dlp}.ts` | 21.4 / 20.9 KB | LIVE (30 items each) |
| `chapter-4/flashcards-{bm,dlp}.ts` | 16.1 / 15.8 KB | LIVE (60 each) |
| `chapter-4/mindmap-{bm,dlp}.ts` | 4.0 / 4.0 KB | LIVE |

**Yes — Chapter 4 has exactly the Form 2 shadowing problem seen in Chapters 1–3, and unlike them it
has not been remediated.** For comparison, Chapter 3's live file is now 37.7 KB across 13 SP-aligned
sections; Chapter 4's is 7.2 KB across 2 SK-level sections.

**RUNTIME_CONFIRMED** (mounted from the live dev ESM graph, both languages): 2 sections walked,
**0 instructional figures**, only the decorative `ch4-kesihatan-manusia.png` hero. The four immunity
tabs render and their panels are genuinely distinct in both BM and DLP.

---

## 5. DSKP COVERAGE MATRIX

Judged against the **live notes surface only**. Mind-map, quiz and flashcard presence is noted but does
not earn COVERED — those are retrieval surfaces, not teaching surfaces.

| SP | Requirement | Source | Live AcadeMY | Status | Finding |
|---|---|---|---|---|---|
| **4.1.1** | Membezakan penyakit berjangkit vs tidak berjangkit | DSKP p.54; TB p.76, Rumusan p.89 | §4.1 intro + `comparison`; accordions per medium | **PARTIAL** | Distinction taught well. But **kurap/panau (sentuhan) and SARS/H1N1 (udara) — all DSKP-Catatan-required — are absent**; contact accordion names no disease at all. M-01 |
| **4.1.2** | Menerangkan cara penyakit disebarkan | TB pp.77–80 | 4 accordions (udara/air/sentuhan/vektor) | **COVERED** | All four media taught with prevention cues. The only SP fully met. |
| **4.1.3** | Mencerakinkan penyebab dan penularan | TB p.79 Jadual 4.1, p.80 Jadual 4.2 | 4 vector cards + matcher | **PARTIAL** | All 6 vector→pathogen pairs present ✓. But **"patogen" is never defined** despite TB p.76 defining it and quiz q4 testing it; matcher instruction conflates pathogen with disease. M-02, M-03 |
| **4.1.4** | Menjana idea mekanisme menghalang penularan | TB p.81 Jadual 4.3 | `sequence` "Tiga peringkat pencegahan" | **INCORRECT** | The three stages are populated with a generic public-health model, not the textbook's. **C-01** |
| **4.2.1** | Menghuraikan fungsi sistem pertahanan badan | TB pp.82–83, Rajah 4.4 | `sequence` "Tiga barisan pertahanan" | **INCORRECT/PARTIAL** | Lines 2 and 3 name mechanisms the Form 2 source does not teach; **fagositosis, sel darah putih and membran mukus all appear 0 times**; specific vs non-specific absent. **C-02** |
| **4.2.2** | Mendefinisikan antigen, antibodi dan keimunan | TB p.83 (all three verbatim) | one check-yourself *hint* | **MISSING** | No definition of any of the three on the notes surface. DSKP-scoped primary/secondary graph also absent. **C-03** |
| **4.2.3** | Mewajarkan kepentingan imunisasi | TB pp.84–85, Jadual 4.4 | — | **MISSING** | `imunisasi` = **0 occurrences** in the live file. **C-04** |
| **4.2.4** | Membezakan keimunan pasif dan aktif | TB p.86, Rajah 4.5–4.8 | 4 tabs, distinct, both languages | **PARTIAL** | Best-taught part of 4.2 ✓. But **none of the four graphs** is present, and *antiserum* is never defined. H-04 |
| **4.2.5** | Mewajarkan amalan ke arah keimunan mantap | DSKP p.56; TB p.87 | `comparison` weaken/strengthen | **PARTIAL** | Structure right, factors substituted: AcadeMY uses alcohol/chronic stress/sleep; source uses air pollution, pesticides, emotional stress, excess sugar / rest, non-smoking, recreation, periodic checks. DSKP's three named aspects (pemakanan/aktiviti fizikal/gaya hidup) not used as the frame. M-04 |
| **4.2.6** | Kepentingan imunisasi & kesihatan individu terhadap keluarga, sosial, ekonomi dan negara | DSKP p.56; TB p.88 Aktiviti 4.3 | — | **MISSING** | `keluarga`, `ekonomi`, `insurans`, `migrasi`, `kusta` = **0 occurrences**. **C-05**\* |

\* Counted within CRITICAL C-03/C-04/C-05 grouping below; the headline count treats 4.2.2, 4.2.3 and
4.2.6 as the three MISSING SPs and 4.1.4 as the INCORRECT one.

**Totals — live notes:** COVERED **1/10** · PARTIAL **5/10** · MISSING **3/10** · INCORRECT **1/10**.

---

## 6. CRITICAL FINDINGS

### C-01 · INCORRECT · The three prevention stages teach a different model from the source — and contradict AcadeMY's own quiz

- **Location:** `interactive-bm.ts` §4.1 `sequence`; `interactive-dlp.ts` mirror.
- **Current (BM):** Primer — *"…sanitasi, tabiat sihat, vaksinasi **dan kawalan vektor**"*;
  Tertier — *"**Kurangkan komplikasi dan pulihkan fungsi** melalui penjagaan jangka panjang serta
  **rehabilitasi**."*
- **Source — Jadual 4.3, textbook p. 81:** *tertier* = **mengawal populasi vektor** (destroy breeding
  sites, spraying, enforce law with fines on dirty food premises) **+ melindungi hos** (nets,
  repellent, thick clothing). Rehabilitation appears nowhere in the chapter. Vector control belongs to
  **tertier**, not *primer*.
- **Why CRITICAL:** AcadeMY's own quiz `sci-f2-c4-bm-q16` marks *"Mengawal populasi vektor dan
  melindungi perumah"* correct for tertiary, and flashcard `f48` says the same. **A student who learns
  the notes will fail the chapter's own question.** Latihan Sumatif-style prevention questions follow
  the textbook model.

### C-02 · INCORRECT + MISSING · The three lines of defence invent mechanisms and omit the required ones

- **Location:** `interactive-{bm,dlp}.ts` §4.2 `sequence`.
- **Current (BM):** 1st — *"Kulit, mukus, **silia**, air mata dan **asid perut**"*; 2nd —
  *"**Keradangan, demam** dan fagosit"*; 3rd — *"**Limfosit** … membentuk **sel memori**"*.
- **Source — textbook pp. 82–83:** 1st = **Kulit** (tough layer; sweat and sebum contain
  microorganism-destroying chemicals) **+ Membran mukus** (lines digestive and respiratory tracts;
  nose hairs filter; mucus traps; ear wax, tears, vaginal secretions act as antiseptic). 2nd =
  **fagositosis only** — white blood cells engulf and digest pathogens using enzymes. 3rd = the immune
  system producing **antibodies**, which attach to pathogens (blocking host-cell entry) and cause
  agglutination.
- **Measured:** in the live BM file `fagositosis` = **0**, `sel darah putih` = **0**,
  `membran mukus` = **0**, `spesifik` = **0**.
- **Why CRITICAL:** the defining mechanism of the second line is absent while cilia, stomach acid,
  inflammation, fever, lymphocytes and memory cells — none of them Form 2 scope here — are presented
  instead. The **specific vs non-specific** classification (Rajah 4.4) is absent although Latihan
  Sumatif 4 Q5(a) asks students to compare exactly that. Quiz q7, q8 and q17 and flashcards f15, f16,
  f42 all teach the correct version, so the notes are again the outlier.

### C-03 · MISSING · SP 4.2.2 has no definitions at all

- **Location:** `interactive-{bm,dlp}.ts` §4.2.
- **Current:** the only trace is a check-yourself hint — *"Antigen mencetuskan gerak balas; antibodi
  mengikat khusus pada antigen itu."* No definition of **antigen**, **antibodi** or **keimunan**.
- **Source:** textbook **p. 83** defines all three verbatim (quoted in §3-2 above). The SP verb is
  literally *"**Mendefinisikan** antigen, antibodi dan keimunan badan."*
- **Also missing:** the DSKP-scoped *"graf respon imunisasi primer dan sekunder"* (p. 55 Catatan).
  `graf` = 0 in the live file. Quiz `q22` tests exactly this graph.

### C-04 · MISSING · SP 4.2.3 (importance of immunisation) is entirely absent

- **Measured:** `imunisasi` = **0** occurrences in `interactive-bm.ts`. No vaccination schedule, no
  rationale for infant/child scheduling, no statement of what a vaccine is for.
- **Source:** textbook **p. 84** (*"Imunisasi merupakan suatu usaha untuk memberikan daya tahan secara
  aktif… dengan memasukkan vaksin"*; vaccine contains antigen from weakened or killed virus/bacteria)
  and **Jadual 4.4, p. 85** (the Malaysian schedule: BCG, Hepatitis B, DTaP, Hib, Polio IPV, MMR, MR,
  DT, HPV, Tetanus, JE).
- Quiz `q10`, `q19`, `q20` and `q29` all test this untaught material.

### C-05 · MISSING · SP 4.2.6 (family / society / economy / country) is entirely absent

- **Measured:** `keluarga` = 0, `ekonomi` = 0, `insurans` = 0, `migrasi` = 0, `kusta` = 0,
  `batuk kokol` = 0 in the live file.
- **Source:** DSKP p. 56 names six aspects; textbook **Aktiviti 4.3, p. 88** repeats them exactly —
  controlled recurrence (kusta, batuk kokol, tuberkulosis), rising healthcare cost, impaired work
  quality, insurance purchase, quality of life, workforce migration.
- One of ten SPs with **zero** representation on any live surface (the mind map does not carry it either).

---

## 7. HIGH FINDINGS

- **H-01 · Learning-loop break.** The quiz and flashcard layers are accurate and the notes are not, so
  the two disagree. At least **10 of 30 quiz items** test material the live notes never teach:
  membran mukus (q17), fagositosis (q8), imunisasi (q10), vaccine contents (q19), HPV schedule (q20),
  primary/secondary graph (q22), prevention stages per textbook (q15, q16), haj pilgrims (q29),
  kurap (q14). In an AcadeMY Brain architecture this mis-attributes a content gap to student weakness
  in `quiz_history`.
- **H-02 · NOT_RENDERED.** `notes-bm.ts` (27.7 KB) / `notes-dlp.ts` (26.9 KB) are registered but
  unreachable. They contain `imunisasi` ×11, `fagositosis` ×7, `sel darah putih` ×9,
  `membran mukus` ×6, `spesifik` ×5, `kurap` ×5, `antibodi` ×27 — i.e. most of what C-02, C-03 and
  C-04 report as missing is **already authored, in both languages**, in a file no student can reach.
- **H-03 · No instructional visuals whatsoever.** RUNTIME_CONFIRMED: 0 figures in both languages. The
  chapter's teaching leans on **Rajah 4.4** (three lines), **Jadual 4.1/4.2** (vector–pathogen),
  **Jadual 4.3** (prevention stages), **Jadual 4.4** (schedule) and **Rajah 4.5–4.8** (four immunity
  graphs). None is represented. Chapters 1–3 each carry five annotated diagrams; Chapter 4 has only a
  decorative hero image.
- **H-04 · SP 4.2.4 taught without a single graph.** The four tabs are the strongest part of §4.2 and
  are properly distinct — but the textbook teaches this SP *through* Rajah 4.5–4.8, Latihan Formatif
  4.2 Q3 is a graph-comparison question, and quiz q22 assumes graph literacy. Students are asked to
  interpret curves they have never been shown.
- **H-05 · `antiserum` used but never defined.** Appears twice in the live file as a mechanism; the
  textbook defines it on p. 86 (*"darah cecair jernih yang mengandungi antibodi untuk mencegah
  penyakit"*). Flashcard f33 carries the definition; the notes do not.
- **H-06 · Only 2 sections for 10 SPs.** SK-level rather than SP-level structure means five SPs share
  one §4.2 block with no headings of their own, so 4.2.2/4.2.3/4.2.6 have nowhere to live. This is the
  structural cause of C-03/C-04/C-05, and it is the same defect Chapters 2 and 3 were restructured to
  fix (Ch3 now has 13 sections).

---

## 8. MEDIUM FINDINGS

- **M-01 · DSKP-required disease examples missing.** `kurap`, `panau` (sentuhan) and `SARS`, `H1N1`
  (udara) = 0 in the live file — all four are named in the DSKP 4.1.1 Catatan. The *Sentuhan*
  accordion names **no disease at all**. `Chikungunya` and `disentri ameba` (textbook Rumusan p. 89 /
  p. 78) also absent.
- **M-02 · "Patogen" never defined** although it is a chapter keyword, is defined at textbook p. 76,
  and is tested by quiz q4 and Latihan Formatif 4.1 Q1.
- **M-03 · Pathogen/disease conflation in the matcher.** Instruction reads *"Pilih vektor, kemudian
  **penyakit atau patogen**…"* and the four matches mix registers — *"Virus denggi dan Zika"*
  (pathogens) beside *"Salmonella typhi penyebab kepialu"* (pathogen + disease). The textbook keeps
  these strictly separate across two tables. Exactly the confusion this audit was asked to watch for.
- **M-04 · SP 4.2.5 factors substituted.** AcadeMY: smoking, alcohol abuse, chronic stress, poor
  sleep, unbalanced diet / balanced diet, sleep, exercise, hygiene, vaccination. Source (Gambar foto
  4.4, p. 87): air pollution, pesticides, emotional stress, excess sugar / adequate rest and sleep,
  not smoking, recreation and fresh air, periodic health checks. Overlap is partial and the DSKP's
  three framing aspects (pemakanan / aktiviti fizikal / gaya hidup) are not used.
- **M-05 · Second `sequence` block reused for two different concepts.** §4.1 and §4.2 both render a
  three-step Journey (prevention stages; defence lines). Because `Journey` shows one step at a time,
  a student sees two visually identical steppers for unrelated ideas — the pattern flagged in the
  Chapter 3 enzyme review.
- **M-06 · No `Chapter 4` test coverage.** No `chapter-4/*.test.*` exists, and
  `learner-facing-leakage.test.ts` does not reference Chapter 4. Chapter 3 has an 20-test guard file;
  Chapter 4 has none, so nothing prevents regression.
- **M-07 · Textbook answer-key slip not mirrored but worth knowing.** Textbook p. 280 answer 4(a) says
  the body secretes antibodies *"untuk membunuh **bakteria**"* in a question about **virus A**. AcadeMY
  does not reproduce this error — recorded so a future remediation does not import it.

---

## 9. LOW FINDINGS

- **L-01 ·** `"tertier"` (source, Jadual 4.3) vs `"tertiari"` (AcadeMY quiz/flashcards/mind map) vs
  `"Tertier"` (live notes). Internally inconsistent across surfaces.
- **L-02 ·** Live notes call the second line *"fagosit"*; the textbook consistently says
  *"sel darah putih"* performing *"fagositosis"*.
- **L-03 ·** Mini-quiz item on antibiotics curing influenza is scientifically correct and matches the
  p. 85 sidebar, but antibiotics are not a Chapter 4 SP — enrichment presented at core weight.
- **L-04 ·** `keimunan` appears 7× in the live notes but 0× in the dead notes (which use a different
  term), so a future merge of the two files needs a terminology pass.

---

## 10. NOTES / UX AUDIT (learner comprehension)

Read as a Form 2 student would:

| Issue | Severity | Detail |
|---|---|---|
| Notes contradict quizzes on prevention stages and defence lines | **HIGH** | A diligent student is actively penalised for reading the notes (C-01, C-02) |
| Two identical-looking three-step steppers for unrelated concepts | **MEDIUM** | M-05 |
| Immunity types listed in tabs but never *compared* side by side | **MEDIUM** | The four tabs are distinct and correct, but a student must hold four panels in memory; the source teaches this as a 2×2 (active/passive × natural/artificial) with graphs |
| Graphs referenced by assessment but never taught | **HIGH** | H-04 |
| Pathogen vs vector vs disease terminology drifts between blocks | **MEDIUM** | M-03 |
| Whole chapter reads as two long text sections | **MEDIUM** | H-06; no visual anchor anywhere |

**No dead interactive labels were found — because Chapter 4 has no interactive labels at all.** The
`AnnotatedImage` interaction standard now used in Chapters 1–3 (compact default, enlarge on demand,
direct labels/callouts, click-label→explanation) is **not applied to Chapter 4 in any form.**

---

## 11. VISUAL / INTERACTION AUDIT

| Check | Result |
|---|---|
| Instructional visuals present | **None** (RUNTIME_CONFIRMED, BM + DLP) |
| Scientifically accurate | n/a |
| Appropriately sized | Hero image only, within the shared sizing system |
| Labels positioned / clickable / explained | n/a — no annotated visuals |
| Enlarge behaviour | n/a |
| Immunity tabs work | ✅ four tabs, panels genuinely distinct, both languages |
| Mobile | Text-only chapter; no overflow observed |
| BM/DLP equivalent | ✅ identical structure and tab set |

---

## 12. QUIZ AUDIT

**30 items per language, ids 1:1 matched.** Spot-verified against source: q7 (first line = skin +
mucous membrane ✓ p.83), q8 (second = phagocytosis by white blood cells ✓), q9 (antigen ✓ p.83),
q10 (immunisation ✓ p.84), q15/q16 (prevention stages ✓ Jadual 4.3), q19/q20 (vaccine contents,
HPV girls-only age 13 ✓ Jadual 4.4), q22 (primary/secondary graph → active natural immunity ✓
Rajah 4.7), q29 (haj pilgrims ✓ Jadual 4.3).

- **Scientific accuracy: PASS.** No wrong answer key found.
- **Curriculum-meta leakage: PASS.** Zero occurrences of "DSKP", "SP 4.x", "according to the
  textbook", "buku teks", "Rajah 4.x", "Jadual 4.x" across all live surfaces (§16).
- **Coverage balance:** good across 4.1.1–4.2.5; **4.2.6 is untested** — consistent with it being
  untaught.
- **Principal defect:** ~10 items test material absent from the notes (H-01). The fix is to teach the
  content, not to weaken the questions — the questions are the better-sourced layer.

---

## 13. FLASHCARD AUDIT

60 per language, 1:1. Spot-verified f15 (first line ✓), f16 (phagocytosis ✓), f32/f33 (passive
artificial + antiserum definition ✓ p.86), f42 (mucous membrane traps microorganisms ✓ p.83),
f45/f48 (three stages, tertiary = vector control + host protection ✓ Jadual 4.3).

**Accurate and textbook-faithful.** Carries `kusta` ×1 and `batuk kokol` ×2 — the only live surface
that touches SP 4.2.6 at all, and only in passing. No source leakage.

---

## 14. MIND-MAP AUDIT

**The most accurate live surface in the chapter.** It correctly carries: the four transmission media
with textbook examples (including kurap, kepialu, disentri amoeba, sifilis, HIV); the **three
prevention stages with the correct tertiary** (*"Tertiari: kawal vektor, lindungi perumah"*); the
first line as **Kulit & Membran mukus** with nose hairs, mucus, tears and ear wax; **fagositosis by
white blood cells**; the antigen definition; vaccine composition; and all four immunity types.

It therefore **agrees with the quizzes and flashcards and disagrees with the live notes** — reinforcing
that the notes are the single defective layer. Missing: SP 4.2.6, and the specific/non-specific
classification.

---

## 15. BM / DLP PARITY

| Layer | Parity |
|---|---|
| Live notes | **Full structural parity** — identical section count, block types and counts (verified programmatically); faithful mirror translations. RUNTIME_CONFIRMED in both. |
| Immunity tabs | ✅ 4/4, distinct panels, correctly localised |
| Quizzes | ✅ 30/30, ids 1:1 |
| Flashcards | ✅ 60/60 |
| Mind map | ✅ parallel |

**Every CRITICAL and HIGH finding is present in both languages.** There is no stream where Chapter 4
is correct — the defects are in shared authoring, not in one translation.

---

## 16. LEARNER-FACING SOURCE LEAKAGE

Searched all live surfaces (interactive, quizzes, flashcards, mind map, both languages) for: `DSKP`,
`SP 4`, `SK 4`, `Standard Pembelajaran`, `Standard Kandungan`, `buku teks`, `textbook`, `Rajah 4`,
`Jadual 4`, `Aktiviti 4`, `audit`, `mandatory`, `binding`, `remediation`, `reviewer`.

**Result: 0 occurrences of every term. PASS.**

---

## 17. TESTS / RUNTIME

```
TYPECHECK (npx tsc --noEmit)                      PASS
BUILD (npm run build)                             PASS
Science F2 + notes tests (8 files / 75 tests)     PASS
Chapter 4 targeted tests                          NONE EXIST  (see M-06)
Quiz id / BM-DLP parity checks                    PASS (30/30, 60/60, identical block shape)
Runtime render, BM + DLP                          CONFIRMED — 2 sections, 0 figures, 4 tabs
```

No project file was modified. The build and tests were run as read-only diagnostics.

---

## 18. LIMITATIONS

1. **Errata provenance.** `Errata.pdf` self-disclaims official hosting. **No Chapter 4 finding here is
   described as errata-verified.** Chapter 4 has no factual correction in it either way, so this does
   not gate the chapter — unlike the Bab 3 food-pyramid question.
2. **DLP textbook not supplied.** Only the **BM** Form 2 textbook exists in the source pack. Every
   English string was checked against the BM textbook by translation equivalence, not against its own
   DLP source.
3. **PDF figure recovery.** Sources were read via `pypdf` text extraction (no poppler available), so
   figure *geometry* cannot be recovered. Rajah 4.2, 4.3, 4.4 and the four immunity graphs 4.5–4.8
   were reconstructed from their extracted captions and labels; the curve shapes themselves were not
   inspected. This does not affect any finding above, all of which rest on extracted text.
4. **Coverage judgements are surface-scoped.** "MISSING" means *missing from the live notes*. Much of
   it exists in `notes-{bm,dlp}.ts`, the mind map, the quizzes or the flashcards — that is precisely
   finding H-02/H-01, and it is recorded rather than credited.
5. **Latihan Sumatif 4 answer key is partial** — the textbook prints selected answers only, so not
   every summative item could be checked against an official answer.

---

## 19. RECOMMENDED REMEDIATION PRIORITY

**P0 — release blockers**
1. **C-01** Rewrite the three prevention stages to Jadual 4.3 (vector control belongs to *tertier*).
   Smallest fix with the largest correctness gain; the quiz and flashcards already encode the target.
2. **C-02** Rewrite the three lines of defence to pp. 82–83: skin **+ mucous membrane**;
   **phagocytosis by white blood cells** as the whole of line 2; antibodies in line 3. Remove cilia,
   stomach acid, inflammation, fever, lymphocytes, memory cells. Add **specific vs non-specific**.
3. **C-03** Add the three verbatim definitions (antigen, antibodi, keimunan) and the primary/secondary
   response graph.
4. **C-04** Add an immunisation section (definition, what a vaccine contains, why infants/children are
   scheduled) — this is a whole SP at zero.
5. **C-05** Add an SP 4.2.6 section across the six DSKP aspects.

**P1 — structural**
6. **H-06/H-02** Restructure to SP-aligned sections (as Chapters 2 and 3 were), sourcing the material
   from the dead `notes-{bm,dlp}.ts` rather than writing fresh. Keep the interactive notes as the
   single primary surface; do not render both; do not delete the legacy file.
7. **H-03/H-04** Add the chapter's visuals under the current `AnnotatedImage` standard — three lines
   of defence, vector→pathogen table, prevention stages, and at minimum the primary/secondary
   response graph.
8. **M-01/M-02** Restore the DSKP-required disease examples and define *patogen*.

**P2 — polish**
9. **M-03** Separate pathogen from disease in the matcher, following the textbook's two-table split.
10. **M-04** Re-anchor SP 4.2.5 on the DSKP's three aspects and the p. 87 factors.
11. **M-06** Add a `chapter-4` guard test mirroring Chapter 3's, and extend the leakage test to Ch4.
12. **L-01/L-02** Settle *tertier/tertiari* and *fagosit/sel darah putih* across all surfaces.

**Human review required on:** nothing in this chapter is a curriculum-authority judgement call — the
errata carries no Chapter 4 factual correction, so unlike Bab 3 there is no unresolved
DSKP-vs-errata tension. Every finding above is actionable against the binding sources directly.

---

## CHAPTER 4 VERDICT

# FAIL — HUMAN REVIEW REQUIRED

```
CRITICAL: 5   (C-01 prevention stages wrong · C-02 defence lines wrong+incomplete ·
               C-03 SP 4.2.2 definitions absent · C-04 SP 4.2.3 absent · C-05 SP 4.2.6 absent)
HIGH:     6
MEDIUM:   7
LOW:      4

SP COVERAGE (live notes, 10 SPs)
COVERED:       1    (4.1.2)
PARTIAL:       5    (4.1.1, 4.1.3, 4.2.1, 4.2.4, 4.2.5)
MISSING:       3    (4.2.2, 4.2.3, 4.2.6)
INCORRECT:     1    (4.1.4)
NOT_RENDERED:  0 per-SP — but the entire 27.7 KB / 26.9 KB notes asset is unreachable (H-02)

ACADEMY CONTENT MODIFIED: NO
AUDIT ONLY: YES
```

*"HUMAN REVIEW REQUIRED" here means sign-off on the remediation scope, not an unresolved source
question: Chapter 4 needs the same SP-aligned restructure Chapters 2 and 3 received, and that is a
larger change than a bug fix.*
