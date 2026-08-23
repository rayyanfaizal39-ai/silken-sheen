# DEEP AUDIT — Sains / Science Tingkatan 2, Bab 3: Nutrisi (BM + DLP)

**Mode:** READ-ONLY. No learner-facing content was modified. The only file created is this report.
**Date:** 2026-08-23
**Scope:** Both language streams — `science-f2-c3-bm` and `science-f2-c3-dlp`.
**Independence:** The supplied `SCIENCE_F2_CH03_NOTEBOOKLM_SOURCE_MAP.md` was used **only as a checklist**.
Every claim below is re-derived from the official DSKP, the official textbook, and the supplied errata.
Where the source map disagrees with those authorities, the authorities win — see §7.

---

## 1. Authoritative sources and their standing

| Source | Identity verified from the file itself | Standing |
|---|---|---|
| `audit-sources/Science/Form-2/DSKP.pdf` | KPM / BPK, *KSSM Sains Tingkatan 2 DSKP*. Bab 3 = printed **pp. 49–52** (PDF pp. 61–64). | **Binding** |
| `audit-sources/Science/Form-2/Textbook.pdf` | KPM, *Sains Tingkatan 2* (BM). Bab 3 = printed **pp. 44–74** (PDF pp. 52–82). Official answer key for Bab 3 at printed **p. 279**. | **Binding** |
| `audit-sources/Science/Form-2/Errata.pdf` | **Self-disclaimed.** Its own text states: *"No surviving copy hosted directly on an official KPM/Bahagian Buku Teks or Karangkraf domain was located… must not be described as an official-hosted original."* | **Advisory only** |

### DSKP authority rule (carried forward from the Bab 1 and Bab 2 audits)

DSKP printed p. 39 establishes that the **Catatan** column contains two different kinds of material:
**Skop SK & SP** (binding scope) and **Cadangan aktiviti PdP** (suggested activities — *"Senarai aktiviti
yang dicadangkan bukanlah sesuatu yang mutlak"*). Throughout this audit, scope statements such as
*"Enzim yang diperkenalkan hanya amilase, protease dan lipase"* and *"Perlu diterangkan fungsi pankreas,
hati dan pundi hempedu"* are treated as **binding**; multimedia-presentation and poster activities are
treated as **suggested**.

### Errata entries touching Bab 3 (verbatim)

| TB page | Area | Correction recorded |
|---|---|---|
| **53** | Bab 3 — Nutrisi | *"Food-pyramid content is updated to the Malaysia Food Pyramid 2020 presentation. The errata notes a repositioning of the grain/staple group relative to vegetables and fruit, and adds guidance to limit ultra-processed foods."* |
| **71** | Bab 3 — Nutrisi | *"The corresponding summative/reflection food-pyramid material is updated consistently with the Malaysia Food Pyramid 2020 arrangement."* |

The errata additionally flags QR-linked resources on pp. **53, 55, 59** as non-functioning — a resource-link
issue, not a content correction.

---

## 2. Production path — what actually reaches a student

Traced end-to-end, not assumed.

```
registry.ts:3413-3441   science-f2-c3-bm / -dlp
                        ├── video          getEducationalVideo("science-f2-c3")
                        ├── mindMap        scienceF2C3MindMap{BM,DLP}
                        ├── notes          scienceF2C3Notes{BM,DLP}      ← registered
                        ├── sciF2InteractiveData  scienceF2C3Interactive{BM,DLP}
                        ├── flashcards     scienceF2C3Flashcards{BM,DLP}
                        └── quiz           scienceF2C3Quizzes{BM,DLP}

notes.tsx:1976          } : activeChapter?.sciF2InteractiveData ? (
notes.tsx:1988               ...chapter === 3 ? <ScienceF2Chapter3NotesBlock content={sciF2InteractiveData} …/>
notes.tsx:2110          } : ( activeChapter?.notes && <NotesBlock …/> )      ← final fallback, never reached

ScienceF2Chapter3NotesBlock.tsx  (1 line)
    export { ScienceF2InteractiveNotesBlock as ScienceF2Chapter3NotesBlock } …
        └── ScienceSectionedNotesShell  (stepper + Back / Next section)
```

**Result:** the students' Notes surface is `interactive-bm.ts` / `interactive-dlp.ts` (**8.9 KB / 9.2 KB**).
`notes-bm.ts` / `notes-dlp.ts` (**32.9 KB / 31.5 KB**) are registered but **unreachable** — the
`sciF2InteractiveData` branch at line 1976 shadows the `activeChapter.notes` fallback at line 2110.
This is the same dead-legacy-notes pattern confirmed in Bab 1 and Bab 2.

### Runtime verification

Both language variants were mounted from the live Vite dev ESM graph and stepped through all four
sections. Findings marked **RUNTIME_CONFIRMED** below were observed in rendered DOM text, not inferred
from source.

- BM: 4-section stepper renders; BM chrome correct (`Semak diri`, `Set semula`, `Kembali`,
  `Seksyen seterusnya`, `Refleksi Kendiri`, `Kuiz Pantas`, `Tandakan Bab 3 Selesai`).
- DLP: identical structure; EN chrome correct (`Check yourself`, `Back`, `Next section`,
  `Self-Reflection`, `Quick Quiz`, `Mark Chapter 3 as Read`).
- Section badges auto-assign as Pemerhatian/Penemuan/Konsep Utama/Hubungan Dunia Sebenar
  (Observation/Discovery/Key Concept/Real Life Connection). Each section is labelled "6 min".

---

## 3. FINDINGS

Severity: **CRITICAL** = wrong science taught to students, or an entire DSKP Standard Pembelajaran with
zero coverage on the live notes surface. **HIGH** = binding DSKP scope materially unmet, or a
structural defect that breaks the learning loop. **MEDIUM** = partial or imprecise against an authority.
**LOW** = terminology and polish.

---

### CRITICAL

#### C-01 · INCORRECT · Live notes teach the wrong products of protein digestion

- **Location:** [interactive-bm.ts](src/content/form2/science/chapter-3/interactive-bm.ts) §3.3 `tabs[1]`;
  [interactive-dlp.ts](src/content/form2/science/chapter-3/interactive-dlp.ts) §3.3 `tabs[1]`
- **Current (BM):** `"Protease", body: "Memecahkan protein kepada asid amino di perut dan usus kecil."`
- **Current (DLP):** `"Protease", body: "Breaks protein into amino acids in the stomach and small intestine."`
- **Evidence:** Textbook printed **p. 62** — *"Perut … protease … protein → **polipeptida**"*. Textbook
  printed **p. 63** — *"Duodenum … Protease mencernakan polipeptida menjadi **dipeptida**"*; *"Usus kecil …
  Protease mencernakan dipeptida menjadi **asid amino**"*. Textbook **Rajah 3.14** (printed p. 64) draws the
  three protease steps as three separate reactions with three separate secreting organs.
- **Problem:** Stomach protease does **not** produce amino acids. The notes collapse a three-stage
  pathway into one wrong statement, and in doing so delete the pancreatic stage entirely. This is the
  only surface a student reads as "notes", and it **contradicts three other AcadeMY surfaces in the same
  chapter**: `mindmap-bm.ts` (`Protease perut: protein → polipeptida` / `Protease pankreas: polipeptida →
  dipeptida` / `Protease usus: dipeptida → asid amino`), flashcard `…-f?` at
  [flashcards-bm.ts:457](src/content/form2/science/chapter-3/flashcards-bm.ts:457), and quiz `sci-f2-c3-bm-q27`
  whose whole task is ordering that chain. A student who studies the notes will fail the chapter's own
  Hard question.
- **RUNTIME_CONFIRMED** — rendered tab text observed in both languages.
- **Recommended correction:** replace the single Protease tab body with the three-stage chain, naming the
  secreting organ at each stage, matching Rajah 3.14.

#### C-02 · MISSING · Pankreas, hati and pundi hempedu are absent from the live notes

- **Location:** `interactive-bm.ts` / `interactive-dlp.ts` §3.3 — no occurrence
- **Measured:** `pankreas`/`pancreas` = **0**, `pundi hempedu`/`gall bladder` = **0** in both live files.
  `hati` appears once, in §3.4, only as a *destination* ("bergerak dahulu ke hati") — never as a digestive gland.
- **Evidence:** DSKP printed **p. 51**, SP 3.3.1 Catatan, binding scope: *"Aliran makanan dalam salur
  pencernaan yang melibatkan organ mulut, esofagus, perut, usus kecil, usus besar, dubur. **Perlu
  diterangkan fungsi pankreas, hati dan pundi hempedu.**"* Textbook printed p. 63 gives all three
  (liver produces bile; gall bladder stores it; pancreas secretes amylase, protease and lipase).
- **Problem:** A named, mandatory DSKP requirement with **zero** representation. The notes say
  *"Hempedu mengemulsi lemak"* without ever saying where bile comes from, and never mention the pancreas
  at all — yet quiz `sci-f2-c3-bm-q22` asks what happens when the pancreas fails, and five further quiz
  items and six flashcards depend on pancreatic function.
- **Recommended correction:** add a duodenum/accessory-gland card set to §3.3 covering hati → jus hempedu,
  pundi hempedu → storage, pankreas → jus pankreas (amilase, protease, lipase).

#### C-03 · MISSING · SP 3.2.3 (health, disease and lifestyle) has zero coverage on the live notes

- **Location:** `interactive-bm.ts` / `interactive-dlp.ts` §3.2
- **Measured:** `obesiti`/`obesity` = 0, `diabet` = 0, `kanser` = 0, `jantung`/`heart disease` = 0,
  `tekanan darah` = 0, `diproses`/`processed` = 0, `rapu` = 0.
- **Evidence:** DSKP printed **p. 50**, SP 3.2.3 — *"Membuat kajian dan mewajarkan kepentingan gizi
  seimbang, senaman dan gaya hidup yang sihat dalam mengekalkan kesihatan badan"*, Catatan naming
  *"penyakit jantung, tekanan darah tinggi, kencing manis, kanser kulit dan kanser peparu"* and a
  project-based task on obesity linked to *"makanan diproses dan juga makanan rapu"*. Textbook printed
  **pp. 57–59** carries the whole of it, including the *Tinjauan Kesihatan dan Morbiditi Kebangsaan (2016)*
  statistics on p. 58.
- **Problem:** One of nine Standard Pembelajaran is entirely unrepresented in the notes. AcadeMY *does*
  hold this content — quiz `sci-f2-c3-bm-q26` reproduces the 2016 statistics correctly — but it is only ever
  tested, never taught.
- **Recommended correction:** add a §3.2 health block covering the five named diseases, the obesity/
  processed-food link, and exercise, seeded from textbook pp. 57–59.

#### C-04 · MISSING · SP 3.4.1 (Visking tubing experiment) has no surface anywhere in the chapter

- **Location:** whole chapter
- **Measured:** `Visking` = **0** in `interactive-bm/dlp`, `notes-bm`, `quizzes-bm/dlp`, `flashcards-bm/dlp`
  and `mindmap-bm/dlp`.
- **Evidence:** DSKP printed **p. 51**, SP 3.4.1 — *"Menjalankan eksperimen bagi menerangkan proses
  penyerapan hasil pencernaan"*, Catatan: *"Mengkaji proses penyerapan makanan tercerna dengan
  menggunakan **tiub Visking**"*. Textbook **Eksperimen 3.1**, printed p. 67, is a full experiment with
  hypothesis, three variable types, procedure and four questions.
- **Problem:** The SP *is* the experiment; there is no other way to satisfy it. Compounding this, Bab 3 is
  excluded from `isScienceDiscovery` (see H-06), so the shared `<MiniInvestigation>` surface that carries
  practical work for Bab 1 and Bab 2 **does not render for Bab 3 either**.
- **Recommended correction:** author a Visking-tubing investigation block for §3.4, and bring Bab 3 into the
  discovery path so `MiniInvestigation` renders.

#### C-05 · MISSING · SP 3.4.2 (three-system cooperation and assimilation) has zero coverage on the live notes

- **Location:** `interactive-bm.ts` / `interactive-dlp.ts` §3.4
- **Measured:** `asimilasi`/`assimilation` = **0**; `respirasi`/`respiration` appears once, in a §3.2 check
  *hint* about athletes — never in §3.4, never linked to the digestive or circulatory systems.
- **Evidence:** DSKP printed **p. 52**, SP 3.4.2 — *"Menghubungkaitkan fungsi sistem pencernaan, sistem
  peredaran darah dan sistem respirasi"*, Catatan: *"Penekanan kepada bagaimana sistem tersebut bekerjasama."*
  Textbook printed **p. 68** defines assimilation (*"proses pengagihan hasil akhir pencernaan bagi kegunaan
  sel-sel badan kita"*) and lists the three end-product uses (glucose → energy via respiration; amino acids →
  cell components; fatty acids + glycerol → fat for insulation and organ protection).
- **Problem:** §3.4 stops at "where nutrients go" (blood vs lymph). The respiratory system is never named
  and assimilation is never defined, yet quiz `sci-f2-c3-bm-q30` asks precisely how the three systems
  cooperate.
- **RUNTIME_CONFIRMED** — full §3.4 rendered text captured in both languages; no assimilation, no respiration.
- **Recommended correction:** add a three-system cooperation block plus an assimilation definition to §3.4,
  seeded from textbook p. 68.

---

### HIGH

#### H-01 · HUMAN REVIEW REQUIRED · Food pyramid is the pre-errata arrangement, and it is now assessed

- **Location:** `interactive-bm.ts` §3.2 `sequence.steps` (and DLP mirror);
  `quizzes-bm.ts` `sci-f2-c3-bm-q14`; `quizzes-dlp.ts` `sci-f2-c3-dlp-q14`;
  `flashcards-bm.ts:310`; `mindmap-bm.ts` node `c2-1`
- **Current (notes, BM):** `Dasar → "Bijirin penuh dan karbohidrat — sumber tenaga utama."`,
  `Aras 2 → "Buah-buahan dan sayur-sayuran"`, `Aras 3 → protein`, `Puncak → lemak, minyak, gula dan garam`.
- **Current (quiz q14):** correct answer *"Nasi, mi, roti, bijirin dan ubi-ubian"*, explanation
  *"…terletak di tapak piramid dengan cadangan 4-8 sajian sehari — kumpulan terbesar."*
- **Evidence — textbook (binding):** printed **p. 53, Rajah 3.7** prints exactly this arrangement:
  base `NASI, MI, ROTI, BIJIRIN DAN UBI-UBIAN 4–8 sajian sehari`; then `SAYUR-SAYURAN 3 sajian`;
  then `BUAH-BUAHAN 2 sajian`; then `SUSU DAN PRODUK TENUSU 1–3 sajian`; apex `LEMAK, MINYAK, GULA DAN
  GARAM — makan sedikit`. **AcadeMY matches the printed textbook.**
- **Evidence — errata (advisory):** p. 53 entry mandates the **Malaysia Food Pyramid 2020** presentation with
  *"a repositioning of the grain/staple group relative to vegetables and fruit"* and added guidance to
  *"limit ultra-processed foods"*. p. 71 extends the same change to the summative material.
- **Problem:** AcadeMY is faithful to the binding source and divergent from the advisory one. This is
  exactly the Bab 1 / M-02 situation and is a **curriculum-authority decision, not an engineering one**:
  the errata is self-disclaimed as unofficial, so it cannot by itself justify overriding the printed
  textbook — but if the 2020 pyramid is the arrangement students will be examined against, four AcadeMY
  surfaces are wrong simultaneously. Note also that `2020` = 0 and processed-food guidance = 0 across every
  Ch3 file, so the second half of the errata instruction is unmet under either reading.
- **Secondary defect, independent of the errata question:** AcadeMY drops **all serving counts** and merges
  `SAYUR-SAYURAN` and `BUAH-BUAHAN` into one level. The serving numbers (4–8 / 3 / 2 / 1–3) are the
  examinable part of Rajah 3.7 and appear in the official answer key region for Latihan Sumatif 3 Q1.
- **Recommended action:** escalate to a subject lead with an official KPM erratum before changing the
  arrangement. Restoring the serving counts and separating vegetables from fruit is safe under either
  reading and should not wait on that decision.

#### H-02 · NOT_RENDERED · The chapter's richest content asset is dead code

- **Location:** [notes-bm.ts](src/content/form2/science/chapter-3/notes-bm.ts) (32.9 KB),
  [notes-dlp.ts](src/content/form2/science/chapter-3/notes-dlp.ts) (31.5 KB); shadowed at
  [notes.tsx:1976](src/routes/notes.tsx:1976) vs [notes.tsx:2110](src/routes/notes.tsx:2110)
- **Evidence — what is in the dead file but not the live one** (occurrence counts, `notes-bm.ts` vs `interactive-bm.ts`):

  | Concept | dead `notes-bm` | live `interactive-bm` |
  |---|---|---|
  | pankreas | 8 | **0** |
  | duodenum | 11 | **0** |
  | pundi hempedu | 4 | **0** |
  | maltase | 4 | **0** |
  | asimilasi | 7 | **0** |
  | obesiti | 6 | **0** |
  | diabetes | 5 | **0** |
  | BMI | 9 | **0** |
  | kalori | 12 | **0** |
  | sajian (servings) | 10 | **0** |
  | Pinggan Sihat / plate portion | 1 | **0** |

- **Problem:** Every CRITICAL gap above (C-02, C-03, C-05) and several MEDIUM ones are already authored,
  in both languages, in a file no student can reach. The chapter is not under-written — it is mis-wired.
- **Recommended correction:** per the architecture decision taken for Bab 1 and Bab 2 — keep the interactive
  notes as the single primary surface, do **not** render both, do **not** delete the legacy file, and use it
  as source material to fill the interactive sections.

#### H-03 · Learning-loop break · Assessment tests what the notes never teach

- **Location:** `quizzes-{bm,dlp}.ts` (30 items each), `flashcards-{bm,dlp}.ts` (60 items each) vs
  `interactive-{bm,dlp}.ts`
- **Evidence:** the following are assessed but absent from the live notes —

  | Concept | Assessed at | In live notes? |
  |---|---|---|
  | Pancreatic function | `q22`, 6 flashcards | No |
  | Duodenum in the tract | `q17` explanation, 2 flashcards | No |
  | Maltase, maltose → glucose | `q19`, 1 flashcard | No |
  | Three-stage protease chain | `q27`, flashcards:283/457 | No — and contradicted (C-01) |
  | BMI formula | `q16`, 2 flashcards | No |
  | Assimilation | 2 flashcards | No |
  | Hydrochloric acid | `q?`, 2 flashcards | No |
  | Three-system cooperation | `q30` | No |
  | NHMS 2016 statistics | `q26` | No |
  | Serving counts at pyramid base | `q14`, flashcards:310/328 | No |

- **Problem:** Of 30 quiz items, at least ten cannot be answered from the notes a student is given. In an
  AcadeMY Brain architecture this pollutes `quiz_history` and the Knowledge Engine: repeated wrong answers
  will be attributed to student weakness rather than to a content gap.
- **Recommended correction:** close the notes gaps (C-02, C-05, M-03) rather than weaken the assessments —
  the assessments are the better-sourced layer. See §5.

#### H-04 · PARTIAL · SP 3.2.2 (calorie estimation and diet planning) is only one-third met

- **Location:** `interactive-{bm,dlp}.ts` §3.2 `comparison`
- **Current:** energy value per gram only — Fat 37 kJ/g (9 kcal/g), protein & carbohydrate 17 kJ/g (4 kcal/g).
- **Evidence:** DSKP printed **p. 50**, SP 3.2.2 — *"Menganggar kalori makanan yang diambil dalam setiap
  hidangan **dan merancang satu gizi seimbang**"*, Catatan: identify energy per gram ✓ *and* run an
  activity estimating the calorie value of a meal *and* plan a day's balanced diet (breakfast, lunch,
  dinner) for different factor profiles. Textbook printed **pp. 55–56** works a full breakfast total
  (890 kcal, itemised — e.g. *"Susu 1 gelas (250 ml) 130"*) and gives the conversion *"1 kalori (cal) =
  4.2 joule (J)"*.
- **Problem:** `kalori`/`calorie` = **0** in the live notes. The energy values are present but the skill
  the SP names — estimating and planning — has no surface, and the joule↔calorie conversion (which the
  mind map carries at node `c2-3-3`) never reaches the notes.
- **Recommended correction:** add a worked meal-calorie estimation and a one-day planning task to §3.2.

#### H-05 · MISSING · Duodenum is absent from the digestion journey

- **Location:** `interactive-{bm,dlp}.ts` §3.3 `sequence.steps` — 6 steps:
  Mulut → Esofagus → Perut → Usus kecil → Usus besar → Rektum dan dubur
- **Evidence:** Textbook **Rajah 3.12** (printed p. 61) gives the flow as Mulut → Esofagus → Perut →
  **Duodenum** → Usus kecil → Usus besar → Rektum → Dubur. The **official answer key**, textbook printed
  **p. 279**, Latihan Sumatif 3 Q3(a), labels `U: Duodenum`; Q3(b)(iii) answers that fat digestion begins
  in the **Duodenum**.
- **Problem:** A student working from these notes cannot answer the textbook's own summative question about
  where fat digestion starts. The duodenum is also where bile and pancreatic juice act (C-02), so its
  absence is what makes that gap possible.
- **Note on authority:** the DSKP organ list for 3.3.1 does *not* include duodenum or rektum, so this
  finding rests on the textbook and its answer key, not on the DSKP.
- **RUNTIME_CONFIRMED** — journey renders exactly 6 numbered steps in both languages.
- **Recommended correction:** insert a Duodenum step between Perut and Usus kecil.

#### H-06 · NOT_RENDERED · Bab 3 is excluded from the Science Discovery notes path

- **Location:** [notes.tsx:365-382](src/routes/notes.tsx:365)
- **Current:**
  ```ts
  const isScienceF2C2 = subject === "science" && form === "Form 2" &&
    activeChapterKey === "Chapter 2" && activeChapter?.sciF2InteractiveData?.chapter === 2;
  const isScienceDiscovery = (subject === "science" && form === "Form 1" && !!activeChapterKey)
    || isScienceF2C1 || isScienceF2C2 || isScienceF3Interactive;
  ```
- **Problem:** `isScienceF2C1` and `isScienceF2C2` are each hard-scoped to their own chapter, so Bab 3
  (and Bab 4–13) evaluate `isScienceDiscovery === false`. Three things therefore do not render for Bab 3:
  the `<ScienceDiscoveryChapterHeader>` with its module/minutes/experiments/difficulty meta
  ([notes.tsx:837-857](src/routes/notes.tsx:837)); the `science-discovery-notes` styling class
  ([notes.tsx:859](src/routes/notes.tsx:859)); and `<MiniInvestigation>`
  ([notes.tsx:2129](src/routes/notes.tsx:2129)) — the surface that would otherwise carry SP 3.4.1's
  experiment (C-04).
- **Scope note:** this is not a Bab 3 regression specifically — it is the current state for Form 2
  Chapters 3–13. It is reported here because it is load-bearing for C-04 and because Bab 3 presents as a
  visibly lesser chapter than Bab 1 and Bab 2 to the same student.
- **Recommended correction:** generalise the flag to `form === "Form 2" && !!activeChapter?.sciF2InteractiveData`
  once each chapter has meta values, or add a per-chapter meta table as was done for Form 3.

#### H-07 · MISSING · Physical vs chemical digestion comparison is absent

- **Location:** `interactive-{bm,dlp}.ts` §3.3
- **Measured:** `kimia`/`chemical` (in the digestion sense) = **0** in both live files. `fizikal` appears
  once, in the unrelated §3.2 "Aktiviti fizikal" card.
- **Evidence:** DSKP printed **p. 51**, SP 3.3.1 Catatan, binding: *"**Bandingkan** proses pencernaan
  fizikal dan proses pencernaan kimia."* Textbook **Rajah 3.10** (printed p. 60) draws the comparison and
  states physical digestion occurs *"di dalam mulut sahaja"* while chemical digestion occurs *"di dalam
  mulut, perut, duodenum dan usus"*.
- **Problem:** An explicit "compare" verb in the binding Catatan with no student-facing surface. The
  §3.3 intro defines digestion generically but never distinguishes the two types.
- **Recommended correction:** add a two-column comparison block to §3.3 using Rajah 3.10.

---

### MEDIUM

#### M-01 · PARTIAL · Vitamins and minerals fall short of the DSKP's mandated lists

- **Location:** `interactive-{bm,dlp}.ts` §3.1 `cards` (Vitamin, Mineral) and `comparison`
- **Current:** vitamins named — **C, D** only. Minerals named — **kalsium, ferum, iodin** only.
- **Evidence:** DSKP printed **p. 49**, SP 3.1.1 Catatan, binding scope: *"Hanya vitamin utama (**A, B, C,
  D, E dan K**) dan mineral (**kalsium, natrium, besi, iodin, fosforus dan kalium**) perlu diperkenalkan."*
  Textbook Jadual 3.1/3.2 (printed pp. 46–48) covers all of them with sources, importance and deficiency effects.
- **Problem:** Four of six mandated vitamins (A, B, E, K) and three of six mandated minerals (natrium,
  fosforus, kalium) are never named in the notes. `mindmap-bm.ts` carries the full lists, so the content
  exists — it just is not on the notes surface. Quiz `q5` assesses the fat-soluble group A/D/E/K.
- **Recommended correction:** expand §3.1 to a vitamins table and a minerals table covering the DSKP lists.

#### M-02 · PARTIAL · Enzyme secretion sites are imprecise

- **Location:** `interactive-{bm,dlp}.ts` §3.3 `tabs[0]` and `tabs[2]`
- **Current:** Amilase — *"di mulut dan usus kecil"*; Lipase — *"di usus kecil"*.
- **Evidence:** Textbook **Rajah 3.14** (printed p. 64) labels amylase *"Dirembeskan oleh kelenjar liur
  **dan pankreas**"* and lipase *"Dirembeskan oleh **pankreas** dan usus kecil"*. Printed p. 63 places
  pancreatic amylase and lipase acting in the **duodenum**; the small intestine itself secretes maltase,
  protease and lipase.
- **Problem:** Amylase is attributed to the small intestine rather than the salivary glands and pancreas;
  lipase's pancreatic origin is dropped. Both errors follow from the missing pancreas (C-02) and missing
  duodenum (H-05).
- **Recommended correction:** state the secreting gland and the site of action separately for each enzyme.

#### M-03 · MISSING · Maltase and the maltose → glucose step never appear, so glucose is never derived

- **Location:** `interactive-{bm,dlp}.ts` §3.3 and §3.4
- **Current:** §3.3 says starch → maltose and stops. §3.4 then asserts *"Kapilari darah — Mengangkut
  glukosa dan asid amino dengan cepat."*
- **Evidence:** Textbook printed **p. 63** — *"Usus kecil merembeskan enzim maltase… Maltase mencernakan
  maltosa menjadi glukosa"*; **Rajah 3.14** draws it as reaction 2 of 6.
- **Authority tension (disclosed):** DSKP printed p. 51 restricts scope to *"Enzim yang diperkenalkan
  **hanya** amilase, protease dan lipase"*, and textbook Latihan Formatif 3.3 Q3 asks for *three* enzymes.
  So omitting the *name* "maltase" is DSKP-defensible. Omitting the *product* is not: the notes leave the
  carbohydrate pathway ending at maltose while §3.4 transports glucose, with nothing connecting them.
- **Recommended correction:** at minimum, close the carbohydrate pathway to glucose in §3.3. Whether to
  name maltase is a scope decision — the textbook names it and quiz `q19` assesses it.

#### M-04 · CONFUSING · The food pyramid renders as a linear stepper, not a pyramid

- **Location:** `interactive-{bm,dlp}.ts` §3.2 `sequence` →
  [ScienceF2InteractiveNotesBlock.tsx:396-415](src/components/notes/ScienceF2InteractiveNotesBlock.tsx:396) → `<Journey>`
- **RUNTIME_CONFIRMED (BM):** the rendered output is `1 2 3 4 / Dasar / "Bijirin penuh dan karbohidrat —
  sumber tenaga utama." / Mula / Aras 2` — one step visible at a time, with numbered progress buttons.
- **Problem:** `Journey` renders `steps[current]` only. A food pyramid's entire pedagogical content is the
  *simultaneous* proportional comparison of tiers; presented as four sequential text cards it conveys
  neither shape nor proportion nor serving counts. The same applies to the §3.3 digestion journey, which
  shows one organ at a time with no anatomical diagram — while the textbook's Rajah 3.13 is a labelled
  whole-system figure and the official answer key (Q3(a)) asks students to identify eight labelled parts.
- **Recommended correction:** render the pyramid as a tiered diagram (the pattern established by
  `FoodWebDiagram` in Bab 2 shows this is within the component vocabulary), and add a labelled digestive-
  system figure to §3.3.

#### M-05 · MISSING · Hydrochloric acid is not named in the live notes

- **Location:** `interactive-{bm,dlp}.ts` §3.3, `sequence.steps[2]` (Perut)
- **Current (BM):** *"Pengocakan dan protease memulakan pencernaan protein dalam keadaan berasid."*
- **Evidence:** Textbook printed **p. 62** — the stomach secretes protease **and asid hidroklorik**; HCl
  activates protease and kills bacteria. Flashcards [flashcards-bm.ts:230](src/content/form2/science/chapter-3/flashcards-bm.ts:230)
  and :547 carry this correctly; the notes do not.
- **Problem:** "Acidic conditions" without naming the acid or its two functions removes the causal
  mechanism, and flashcard 547 assesses exactly that mechanism.

#### M-06 · PARTIAL · SP 3.4.3 (defaecation, constipation and fibre) is thin

- **Location:** `interactive-{bm,dlp}.ts` §3.1 `cards[5]`, §3.4 `checks[1]`
- **Current:** one clause in §3.1 (*"Merangsang peristalsis dan mencegah sembelit"*) and a §3.4 check hint
  distinguishing defaecation from excretion. `penyahtinjaan` = 3 occurrences, all in §3.4 headings/hints.
- **Evidence:** DSKP printed **p. 52**, SP 3.4.3 Catatan, binding discussion points: *"Kepentingan amalan
  pemakanan yang betul untuk mengelakkan sembelit"* and *"Implikasi kepada kesihatan sekiranya
  mengamalkan pemakanan yang tidak seimbang terutama tiada atau kurang serat."* Textbook printed **p. 69**
  covers water and mineral-salt reabsorption, faeces formation, storage in the rectum and removal via the anus.
- **Problem:** Water reabsorption is covered (§3.3 last steps); the two named discussion points are not.
  Note the constipation content is also asymmetric across surfaces: `sembelit` appears 3× in `quizzes-bm.ts`
  and `constipation` 3× in `quizzes-dlp.ts` (correct parity), but only once each in the notes.

#### M-07 · Out of syllabus · Kwashiorkor is assessed but appears in neither authority

- **Location:** `quizzes-bm.ts` `sci-f2-c3-bm-q3` / `quizzes-dlp.ts` `sci-f2-c3-dlp-q3`;
  `flashcards-bm.ts:47` / `flashcards-dlp.ts:47`; `mindmap-bm.ts` node `c1-2-3`
- **Evidence:** `Kwashiorkor` occurs **0 times** in the entire Form 2 textbook PDF (all pages searched) and
  **0 times** in the DSKP. By contrast, `skurvi`, `riket`, `goiter`, `anemia` and `beri-beri` *are* in the
  textbook (Jadual 3.1/3.2), so the other deficiency-disease items are properly sourced.
- **Problem:** An Easy-difficulty quiz item testing a term the student's own textbook never prints.
- **Recommended action:** decide deliberately — either replace it with a textbook-sourced deficiency
  (kwashiorkor is real science, but it is not in this syllabus), or retain it and label it enrichment.

---

### LOW

| ID | Type | Finding |
|---|---|---|
| **L-01** | CONFUSING | AcadeMY uses **"kimus"** for chyme (`interactive-bm` miniQuiz explanation, `quizzes-bm` q18, `flashcards-bm:230,302`). The textbook uses **"kim"** (printed pp. 62, 63). AcadeMY is internally consistent but divergent from the exam-facing term. |
| **L-02** | CONFUSING | `quizzes-bm.ts` `q17` explanation ends the BM tract with *"…Rektum → **Anus**"*. The BM term is **Dubur** (DSKP p. 51; textbook p. 63). |
| **L-03** | PARTIAL | DSKP p. 49 names the six balanced-diet factors as *umur, saiz, jantina, **pekerjaan**, iklim, keadaan kesihatan*. AcadeMY §3.2 uses *Umur, Jantina, Saiz badan, **Aktiviti**, Iklim, Kesihatan* (DLP: *Activity*). The concept maps across, but the DSKP's word is *occupation*, and textbook Latihan Sumatif 3 Q6 is built on an occupational comparison (fisherman vs teacher). |
| **L-04** | INCORRECT | `mindmap-bm.ts` node `c1-5-2` writes **"Potasium"**; DSKP p. 49 and standard BM use **"Kalium"**. |
| **L-05** | PARTIAL | The chapter's only image is the shared hero `ch3-nutrisi.png`. There is no food-pyramid figure, no digestive-system diagram and no villus diagram — the three figures the textbook and its answer key lean on hardest (Rajah 3.7, 3.13, 3.16). |
| **L-06** | — | Source-map defects — see §7. |

---

## 4. DSKP COVERAGE MATRIX — KSSM Sains Tingkatan 2, Bidang Pembelajaran 3 (DSKP pp. 49–52)

All **nine** Standard Pembelajaran are mapped. Status is judged against the **live student-facing notes**
(`interactive-bm.ts` / `interactive-dlp.ts`). Presence on the mind map, quiz or flashcard layer is noted but
does not by itself earn COVERED, because those are retrieval surfaces, not teaching surfaces.

| SP | Requirement (DSKP wording) | Notes status | Where / why |
|---|---|---|---|
| **3.1.1** | Menghuraikan dan berkomunikasi mengenai kelas makanan | **PARTIAL** | All 7 classes present in DSKP order with functions and sources ✓. But only vitamins C, D and minerals kalsium/ferum/iodin are named against the mandated A,B,C,D,E,K and kalsium/natrium/besi/iodin/fosforus/kalium — **M-01** |
| **3.1.2** | Menguji kehadiran kanji, glukosa, protein dan lemak | **COVERED** | All four reagent/result pairs correct and complete: iodin → biru kehitaman; Benedict + haba → merah bata; **Millon** + haba → merah bata; etanol-emulsi → putih susu. Matches DSKP Catatan verbatim, incl. the Millon requirement. Delivered as accordions + a 4-pair matcher, plus a safety note on ethanol. **RUNTIME_CONFIRMED** |
| **3.2.1** | Menghuraikan dan berkomunikasi mengenai gizi seimbang | **PARTIAL** | Definition ✓, six factors ✓ (terminology drift, **L-03**). Pyramid present but pre-errata, serving-count-free, and rendered as a stepper — **H-01**, **M-04**. DSKP's alternative *"plate portion"* (Model Pinggan Sihat, textbook p. 53 Info) = **0 occurrences** |
| **3.2.2** | Menganggar kalori… **dan merancang satu gizi seimbang** | **PARTIAL** | Energy per gram correct (37/17 kJ/g; 9/4 kcal/g) ✓. No calorie estimation, no meal planning, no 1 cal = 4.2 J — **H-04** |
| **3.2.3** | Membuat kajian dan mewajarkan kepentingan gizi seimbang, senaman dan gaya hidup sihat | **MISSING** | Zero coverage — **C-03** |
| **3.3.1** | Menghuraikan dan berkomunikasi mengenai pencernaan | **PARTIAL** | Definition ✓; tract order ✓ but missing duodenum (**H-05**); peristalsis and bolus ✓. Physical vs chemical comparison **missing** (**H-07**); pankreas/hati/pundi hempedu **missing** (**C-02**); protease products **wrong** (**C-01**); enzyme sites imprecise (**M-02**); salivary-enzyme investigation (Aktiviti 3.7) absent |
| **3.4.1** | Menjalankan eksperimen… (tiub Visking) | **MISSING** | Zero coverage anywhere in the chapter — **C-04** |
| **3.4.2** | Menghubungkaitkan sistem pencernaan, peredaran darah dan respirasi | **MISSING** | Zero coverage — **C-05**. §3.4 covers villus adaptation and blood-vs-lymph destination only |
| **3.4.3** | Menghuraikan dan berkomunikasi mengenai penyahtinjaan | **PARTIAL** | Water and mineral-salt reabsorption ✓; defaecation vs excretion distinction ✓. The two binding discussion points (constipation prevention; low-fibre health implications) are one clause — **M-06** |

### Coverage totals — live notes surface

| Status | Count | Share |
|---|---|---|
| COVERED | **1 / 9** | 11 % |
| PARTIAL | **5 / 9** | 56 % |
| MISSING | **3 / 9** | 33 % |

Only SP 3.1.2 (food tests) is fully met.

---

## 5. ASSESSMENT COVERAGE MATRIX

30 quiz items and 60 flashcards per language. BM ↔ DLP parity is **1:1 by id and by order** — verified
across all 30 quiz ids and spot-verified on flashcards 47, 230, 239, 248, 283, 302, 310, 328, 457, 547.

| SP | Quiz items | Flashcard support | Verdict |
|---|---|---|---|
| 3.1.1 | q1, q3\*, q4, q5, q6, q7, q8, q9, q10 | strong | **Over-assessed relative to notes** (vitamins A/B/E/K, minerals) |
| 3.1.2 | q11, q12, q13 | strong | **Aligned** — notes teach it, assessments test it |
| 3.2.1 | q14, q21, q28 | 310, 328 | Aligned, but carries the H-01 pyramid claim |
| 3.2.2 | q15, q16 (BMI), q23 | strong | q16 tests BMI, which the notes never teach |
| 3.2.3 | q26 (NHMS 2016) | — | **Assessed, never taught** — C-03 |
| 3.3.1 | q2, q17, q18, q19, q22, q24, q27 | 230, 239, 248, 283, 457, 547 | **q27 contradicts the notes** — C-01. q19/q22 test maltase and pancreas, untaught |
| 3.4.1 | q20, q25 | 4 villus cards | Absorption concepts assessed; the mandated **experiment** is absent — C-04 |
| 3.4.2 | q30 | 2 assimilation cards | **Assessed, never taught** — C-05 |
| 3.4.3 | q29 | 1 card | Aligned |

\* q3 (Kwashiorkor) maps to no SP and to no page of the Form 2 textbook — **M-07**.

**Source-verification spot checks passed:**
- `q26` NHMS statistics — exact match to textbook printed **p. 58**: kencing manis 17.5 %, tekanan darah
  tinggi 30 %, kolesterol tinggi 47 %, obesiti 17 %, berat berlebihan 40 %. ✓
- `q10` two litres of water daily — textbook printed **p. 50**: *"Kita perlu minum sekurang-kurangnya
  2 liter air sehari."* ✓
- `q15`/`q23` energy values — textbook **Jadual 3.3**: Lemak 37 kJ/g (9 kcal/g); Protein 17 (4);
  Karbohidrat 17 (4). ✓
- `q16` BMI formula — textbook printed **p. 59**. Textbook-sourced enrichment; **BMI is not a DSKP
  requirement** (0 occurrences in DSKP Bab 3), contrary to the source map. ✓ as enrichment.
- `q27` protease chain — textbook **Rajah 3.14**. ✓ (and it is the notes that are wrong, not the quiz.)

---

## 6. BM / DLP PARITY

| Layer | Parity | Notes |
|---|---|---|
| Interactive notes | **Full structural parity** | Identical section count, block types, card counts, step counts, matcher pairs, checks and miniQuiz. Faithful mirror translations. **RUNTIME_CONFIRMED in both languages.** |
| Chrome / UI strings | **Correct** | BM: `Semak diri`, `Set semula`, `Kembali`, `Seksyen seterusnya`, `Refleksi Kendiri`, `Kuiz Pantas`, `Tandakan Bab 3 Selesai`. DLP: `Check yourself`, `Reset`, `Back`, `Next section`, `Self-Reflection`, `Quick Quiz`, `Mark Chapter 3 as Read`. No leakage observed in either direction. |
| Quizzes | **1:1 by id and order**, 30/30 | |
| Flashcards | **1:1**, 60/60 | |
| Mind map | Parallel | BM carries the L-04 "Potasium" slip |

**Every CRITICAL and HIGH finding above is present in both languages.** There is no stream where the
chapter is correct — the defects are in the shared authoring, not in one translation.

---

## 7. NOTEBOOKLM SOURCE MAP — verification result

The supplied `SCIENCE_F2_CH03_NOTEBOOKLM_SOURCE_MAP.md` was checked item by item against the DSKP,
textbook and errata. It is broadly usable as a checklist, but **four of its claims do not survive
verification** and should not be relied on:

| # | Source-map claim | Verified position |
|---|---|---|
| 1 | *"eight Standard Pembelajaran"* | **Wrong count.** It then lists **nine** (3.1.1, 3.1.2, 3.2.1, 3.2.2, 3.2.3, 3.3.1, 3.4.1, 3.4.2, 3.4.3). Nine is correct — DSKP pp. 49–52. |
| 2 | **BMI** listed as a *"Mandatory Outcome"* | **Not DSKP-scoped.** `BMI` and `Indeks Jisim Badan` occur **0 times** in DSKP Bab 3. BMI is textbook-only (printed p. 59, with a QR link the errata flags as possibly broken). Treat as enrichment, not a requirement. |
| 3 | Enzyme list includes **maltase** and intestinal protease as taught enzymes | **In tension with the DSKP.** DSKP p. 51 binds scope to *"hanya amilase, protease dan lipase"*; the textbook does teach maltase (Rajah 3.14, p. 63) and Latihan Formatif 3.3 Q3 asks for three enzymes. Disclosed as an authority tension in **M-03**, not treated as a settled requirement. |
| 4 | Visking experiment described as testing *"inside"* tube P and Q | **Not the textbook procedure.** Eksperimen 3.1 step 7 tests *"air suling **di dalam tabung didih** P dan Q"* — i.e. the water **outside** the Visking tubing, in both tubes. The source map's stated conclusion (glucose diffuses out, starch does not) is correct; its description of the method is not. |

Additionally, the source map's list of SP 3.2.3 diseases omits **kanser kulit** and **kanser peparu**, both
named in the DSKP p. 50 Catatan. Its tract sequence includes duodenum and rektum — correct against the
textbook (Rajah 3.12) but not against the DSKP organ list; that distinction matters for H-05 and is drawn
explicitly there.

---

## 8. AUDIT LIMITATIONS

Stated so that no finding is over-claimed.

1. **Errata provenance.** `Errata.pdf` self-disclaims as a mirrored, non-official compilation. **No Bab 3
   finding in this report is described as "errata-verified."** H-01 is deliberately left as HUMAN REVIEW
   rather than resolved, because resolving it requires an official KPM erratum that was not supplied.
2. **DLP textbook not supplied.** Only the **BM** Form 2 textbook was available. Every English string was
   checked against the BM textbook by translation equivalence, not against its own DLP source. DLP-specific
   wording divergences cannot be ruled out.
3. **PDF figure recovery.** Sources were read via `pypdf` text extraction (no poppler in this environment,
   so page rasterisation was unavailable). Figure *geometry* therefore cannot be recovered — in particular,
   the tier ordering of **Rajah 3.7** was reconstructed from its extracted label/serving text, and the
   protein tier (ikan/ayam/daging/kekacang) did not survive extraction cleanly. The base group
   (`NASI, MI, ROTI, BIJIRIN DAN UBI-UBIAN 4–8 sajian`) and apex (`LEMAK, MINYAK, GULA DAN GARAM`) are
   unambiguous; the exact middle-tier order is stated with that caveat.
4. **Official answer key is partial.** Textbook p. 279 states *"HANYA JAWAPAN TERPILIH DISEDIAKAN DI SINI"* —
   selected answers only. Q5–Q7 of Latihan Sumatif 3 have no printed answer, so no AcadeMY item was checked
   against them.
5. **Coverage judgements are surface-scoped.** "MISSING" in §4 means *missing from the live notes*. Several
   such items exist in `notes-{bm,dlp}.ts`, the mind map, the quizzes or the flashcards — that is exactly
   finding H-02/H-03, and it is recorded rather than credited.

---

## 9. VERDICT

# FAIL — with HUMAN REVIEW REQUIRED on H-01 and M-07

**FAIL** is driven by:

- **One factual error taught to students in both languages** (C-01), which AcadeMY's own mind map,
  flashcards and quiz `q27` all contradict.
- **A binding DSKP requirement with zero coverage** — pankreas, hati and pundi hempedu (C-02).
- **Three of nine Standard Pembelajaran entirely unrepresented** on the notes surface (3.2.3, 3.4.1, 3.4.2).
- **Only 1 of 9 SPs fully covered** (11 %).
- **A structural mis-wiring** (H-02) in which a 32.9 KB / 31.5 KB pair of notes files — containing most of
  the missing material, already authored in both languages — is registered but unreachable, while the
  8.9 KB / 9.2 KB file that does render is the thinnest surface in the chapter.
- **A broken learning loop** (H-03): at least ten of thirty quiz items test material the notes never teach.

**HUMAN REVIEW REQUIRED** specifically for:

1. **H-01 — the food pyramid.** AcadeMY faithfully reproduces the binding textbook (grain/staple at the
   base, printed p. 53). The supplied errata mandates the Malaysia Food Pyramid 2020 arrangement, but that
   errata is self-disclaimed as unofficial. This is a curriculum-authority decision, not an engineering
   one, and it currently affects four surfaces at once (notes, quiz q14, flashcards 310/328, mind map
   `c2-1`). **Do not change the arrangement on the strength of the supplied errata alone.** The
   sub-defects — missing serving counts, merged vegetable/fruit tiers, and the absent ultra-processed-food
   guidance — are safe to fix under either reading.
2. **M-07 — Kwashiorkor.** Assessed at Easy difficulty in both languages, present in neither the DSKP nor
   any page of the Form 2 textbook. Keep-as-enrichment or replace is a curriculum call.

**No 100 % verification claim is made.** All nine Standard Pembelajaran have been explicitly mapped, both
language streams have been runtime-verified, and 30/30 quiz ids have been parity-checked — but the five
limitations in §8 remain open, in particular the unofficial errata and the unsupplied DLP textbook.

---

## 10. ACTION TAKEN

**None.** This audit modified no learner-facing content and no project file. The only file created is this
report. Every "Recommended correction" above is a proposal for a separately approved remediation pass.
