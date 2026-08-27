# DEEP AUDIT — Sains / Science Tingkatan 2, Bab 6: Asid dan Alkali (BM + DLP)

**Mode:** READ-ONLY. No learner-facing content, component, quiz, flashcard, mind map, or image was modified, created, or deleted. Only diagnostics were run (PDF extraction, grep, dev-server mount probes, typecheck, build, tests).
**Date:** 2026-08-27
**Scope:** `science-f2-c6-bm` and `science-f2-c6-dlp`.

---

## 1. VERDICT

# FAIL — HUMAN REVIEW REQUIRED

Chapter 6 is **narrow but largely accurate**. Its indicator colours, salt products, neutralisation equation, water-requirement teaching and every one of its 60 quiz answer keys are correct against source. It fails on one scientific mis-classification, a systematic learner-facing leakage the other chapters do not have, and coverage gaps against DSKP.

- **1 CRITICAL** — the pH slider classifies vinegar as a *strong acid* and ammonia solution as a *strong alkali*, directly contradicting the textbook's own canonical weak-acid and weak-alkali examples, on the exact concept SP 6.1.3 targets.
- **3 HIGH** — 30 instances of textbook activity numbers exposed to learners; a DSKP-named application (fabric softener) absent from the notes but tested by the quiz; the jellyfish-sting question answered evasively.
- Structurally, Chapter 6 is where Chapter 5 was before remediation: **2 sections for 6 SPs, 4,054 rendered characters, zero instructional diagrams**.

---

## 2. SOURCE PROVENANCE

| Source | Identity verified from the file | Status | Chapter 6 location |
|---|---|---|---|
| DSKP.pdf | KPM / BPK, *KSSM Sains Tingkatan 2 DSKP* | Authoritative | 6.0 on PDF pp. 76–78 (printed 65–67); Jadual 9 on PDF p. 44 (printed 33) |
| Textbook.pdf | KPM 2017, *Sains Tingkatan 2*, Karangkraf, ISBN 978-967-14472-6-0 | Authoritative | Bab 6 = printed pp. 124–138 (PDF idx 131–145) |
| Errata.pdf | **Self-disclaimed** mirrored publisher-correction record; "must not be described as an official-hosted original" | **Advisory only** | See §5 |

**Authority rule applied (DSKP printed p. 39):** the *Catatan* column carries binding *Skop SK & SP* and non-binding *Cadangan aktiviti PdP*. Jadual 9 is the sole authority on which investigations are **WAJIB**.

**Audit limitation:** the DLP/English textbook was **not supplied**. English strings were checked by translation equivalence against the BM textbook.

---

## 3. NOTEBOOKLM CORRECTIONS

The source map was used as a checklist only. Independent verification found **three errors and one incomplete claim**.

**NL-01 · WRONG · the wasp-sting claim. This was the flagged high-risk item and NotebookLM is wrong on the animal.**
NotebookLM reports "Latihan Sumatif 6 includes an application involving a **wasp** sting", with the model wasp = alkaline → soap worsens → use vinegar.
Verified: **the word *tebuan* (wasp) does not appear anywhere in textbook Chapter 6.** The actual Latihan Sumatif 6 Q4 (printed p. 138) reads:

> *"Badan Amran telah disengat **ubur-ubur** semasa sedang mandi di laut… Kesakitan Amran bertambah apabila kawannya menyapu bahagian yang sakit itu dengan **sabun dan ubat gigi**. (a) Terangkan sebab kesakitan Amran bertambah… (b) Cadangkan satu cara untuk mengurangkan kesakitan Amran."*

The organism is a **jellyfish**. The only other sting references in the chapter are the opener *"Adakah sengat **lebah** berasid?"* (bee) and *"semut merah"* (red ant, = formic acid) in Latihan Sumatif Q1.

**Why the distinction matters.** The KSSM school model here is inferential, not stated: soap and toothpaste are alkaline, pain increased, therefore the sting is treated as alkaline, therefore the remedy is something acidic. That reasoning is defensible for a jellyfish (vinegar is genuine first aid for several species). Transplanted to a wasp it would be weak — wasp venom is near-neutral (≈ pH 6.8–6.9), so "wasp sting = alkaline" is a claim the source never makes and outside science does not support. **Had AcadeMY followed NotebookLM here it would have taught a fabricated example.** It did not — see H-03 for what AcadeMY does instead.

**NL-02 · IMPRECISE · the neutralisation example pairing.**
NotebookLM points to "sulfuric acid + sodium hydroxide" as the concrete example. The textbook's worked salt table (printed p. 133) actually pairs:

| Acid | Alkali | Salt |
|---|---|---|
| Asid hidroklorik | Natrium hidroksida | Natrium klorida |
| **Asid sulfurik** | **Kalium hidroksida** | **Kalium sulfat** |
| Asid nitrik | Natrium hidroksida | Natrium nitrat |

Sulfuric acid **+ sodium** hydroxide appears only as *Latihan Formatif 6.2 Q1(b)*, an unworked exercise. Following NotebookLM's pairing as the taught example would yield the wrong salt (sodium sulfate for potassium sulfate). **AcadeMY uses the textbook's pairing correctly.**

**NL-03 · INCOMPLETE · activity list.**
NotebookLM identifies "Activities 6.1, 6.2, 6.3 and 6.4". Verified: Chapter 6 has **five** activities, and NotebookLM missed the most important one — **Aktiviti 6.5, the neutralisation titration**, which is the activity tied to SP 6.2.1.

**NL-04 · CONFIRMED · Jadual 9.**
Inspected directly (DSKP PDF p. 44). The complete Form 2 mandatory list is **3.4.1, 5.1.2, 5.2.2, 7.3.3, 8.2.5**. **Chapter 6 has zero entries.** NotebookLM's "0 mandatory experiments" is correct.

> **Important nuance for remediation.** SP 6.2.1's *Catatan* does say *"Menjalankan **eksperimen** penitratan asid dan alkali untuk menentukan takat akhir menggunakan penunjuk."* The word "eksperimen" appears — but Jadual 9, which the DSKP states is the list of investigations that are **WAJIB**, does not include 6.2.1. Titration is therefore **binding in content scope but not a mandatory staged experiment**. Chapter 6 must **not** be held to the Chapter 5 standard of a fully staged variable-controlled investigation.

**NL-05 · CONFIRMED · terminology and the DSKP typo.**
DSKP 6.1.1 does print *"kesan ke atas kertas **litmius**"* in the alkali line (correct *litmus* in the acid line). DSKP uses **"Penunjuk universal"**; textbook uses **"Penunjuk semesta"**. Both denote the same reagent; the disagreement is cosmetic and must not be surfaced to learners. See M-03 for what AcadeMY actually does.

**NL-06 · PARTIALLY WRONG · errata status.** See §5.

---

## 4. SOURCE RECONSTRUCTION

**Chapter title:** Bab 6 — Asid dan Alkali (printed pp. 124–138).

**Textbook section order:** Blog Sains (pH kulit manusia) → 6.1 Sifat Asid dan Alkali (p. 126) → Peranan Air (p. 128) → Bahan Berasid dan Beralkali → Penunjuk (p. 129) → Kekuatan Asid dan Alkali / Skala pH (p. 130) → Kegunaan dalam Kehidupan Harian (p. 131) → 6.2 Peneutralan (p. 133) → Aplikasi Peneutralan (pp. 134–135) → Rumusan (p. 136) → Latihan Sumatif 6 (pp. 137–138).

**DSKP structure — 6 SPs, exact wording:**

| SK | SP | Binding Catatan |
|---|---|---|
| **6.1 Sifat asid dan alkali** | 6.1.1 Mendefinisikan secara operasi asid dan alkali | Acid: nilai pH, rasa, sifat mengkakis, kesan ke atas kertas litmus, **tindakan terhadap logam seperti magnesium dan zink**. Alkali: nilai pH, rasa, sifat mengkakis, kesan ke atas kertas litmius. **"Asid dan alkali hanya menunjukkan sifat dengan kehadiran air."** |
| | 6.1.2 Menerangkan dengan contoh bahan berasid dan beralkali | Aktiviti using **Kertas litmus, Penunjuk universal, Metil jingga, Fenolftalein, Meter pH** |
| | 6.1.3 Menunjuk cara menentukan **kekuatan** asid dan alkali berdasarkan nilai pH | Aktiviti mengkaji hubungan nilai pH dengan kekuatan asid dan alkali |
| | 6.1.4 Mengenal pasti kegunaan asid dan alkali dalam kehidupan harian | Data penggunaan **termasuk sektor pertanian dan industri** |
| **6.2 Peneutralan** | 6.2.1 Menerangkan proses peneutralan | Eksperimen penitratan untuk menentukan **takat akhir** menggunakan penunjuk; **menulis persamaan perkataan** |
| | 6.2.2 Menerangkan dengan contoh penggunaan peneutralan dalam kehidupan harian | **Ubat gigi, pelembut fabrik dan perapi rambut, mengawal pH tanah, meneutralkan bahan buangan industri** |

**Mandatory experiments:** **NONE** (Jadual 9 verified).

**Key source tables:**

*Jadual 6.2 — Sifat-sifat asid dan alkali (printed p. 128):*

| Asid | Alkali |
|---|---|
| Nilai pH kurang daripada 7 | Nilai pH lebih daripada 7 |
| Berasa masam | Berasa pahit |
| Mengakis | Mengakis |
| Menukarkan kertas litmus biru kepada merah | Menukarkan kertas litmus merah kepada biru |
| Bertindak balas dengan logam untuk menghasilkan gas hidrogen | **Tidak bertindak balas dengan logam** |

*Jadual 6.3 — Perubahan warna penunjuk (printed p. 129) — THE authoritative indicator table:*

| Penunjuk | Asid | Neutral | Alkali |
|---|---|---|---|
| Fenolftalein | Tidak berwarna | Tidak berwarna | Merah jambu |
| Penunjuk semesta | Merah | Hijau | Biru |
| Metil jingga | Merah | Kuning | **Kuning** |
| Kertas litmus biru | Merah | Biru | Biru |
| Kertas litmus merah | Merah | Merah | Biru |

*Water requirement (Rajah 6.4, printed p. 128):* glacial ethanoic acid leaves blue litmus unchanged; in water it turns blue litmus red. Solid sodium hydroxide leaves red litmus unchanged; in water it turns red litmus blue. Stated outright: *"Harus diingat bahawa asid dan alkali hanya boleh menunjukkan sifatnya dengan kehadiran air."*

*pH scale (printed p. 130):* *"Julat nilai pH adalah antara **0 hingga 14**."* Rajah 6.6 shows Semakin berasid ← Neutral (7) → Semakin beralkali. Conclusion after Aktiviti 6.3: *"semakin rendah nilai pH, semakin tinggi kekuatan asid. Semakin tinggi nilai pH, semakin tinggi kekuatan alkali."*

**Assessment focus:** Jadual 10 Rubrik Pengetahuan TP1–TP6 for Asid dan Alkali (DSKP printed p. 67).

---

## 5. ERRATA MATRIX

| Item | Finding |
|---|---|
| Factual corrections for Bab 6 | **NONE.** Correction pages are 53, 71 (Bab 3), 151 (Bab 7), 173 (Bab 8) |
| Terminology corrections for Bab 6 | **NONE** |
| Broken / obsolete QR resources | Pages 6, 53, 55, 59, 77, 78, 81, 84, **129**, 218, 232 |
| **Chapter 6 impact** | **Printed p. 129 falls inside Chapter 6 (pp. 124–138)** — the page carrying Aktiviti 6.2 and Jadual 6.3, which also holds an external Info link. This is a resource-link issue, not a content correction |

**Correction to NL-06.** NotebookLM reports "no Chapter 6 corrections". That is right for *factual* corrections but omits the p. 129 broken-resource flag. **No impact on AcadeMY**, which reproduces no textbook QR codes — recorded for completeness.

**Provenance limitation preserved:** Errata.pdf states of itself that no copy on an official KPM/Karangkraf domain was located, and that it "must not be described as an official-hosted original". No Chapter 6 item in this audit may be called *errata-verified*.

---

## 6. LIVE PRODUCTION PATH

| Layer | Artefact | Status |
|---|---|---|
| Registry | `src/content/registry.ts:3504` (`science-f2-c6-bm`), `:3518` (`-dlp`) | — |
| `sciF2InteractiveData` | `chapter-6/interactive-bm.ts` (8,124 B) / `interactive-dlp.ts` (7,703 B) | **LIVE** |
| `notes` | `chapter-6/notes-bm.ts` (12,655 B) / `notes-dlp.ts` (12,380 B) | **REGISTERED-BUT-NOT-RENDERED (dead legacy)** |
| Route branch | `src/routes/notes.tsx:2044` → `ScienceF2Chapter6NotesBlock` | — |
| Component | `ScienceF2Chapter6NotesBlock.tsx` → `ScienceF2InteractiveNotesBlock.tsx` | — |
| Lang prop | `lang={scienceLang === "dlp" ? "en" : "bm"}` | — |

**The Chapters 3–5 shadowing pattern is present.** `registry.ts:3512` sets `notes: scienceF2C6NotesBM` and `:3513` sets `sciF2InteractiveData`. In `notes.tsx` the `sciF2InteractiveData` branch (line 1999) is evaluated **before** the `activeChapter?.notes` fallback (line 2141), so the interactive branch always wins.

**Consequence:** `notes-bm.ts` / `notes-dlp.ts` are **larger than the live files** (12.7 KB vs 8.1 KB) and unreachable. Nothing in them is credited as learner coverage in this report. They are the only place some content survives — for instance they carry the same activity-number references, showing the leakage in H-01 originated there.

**Runtime confirmation** (real components mounted from the Vite dev ESM graph, both languages, all sections walked):

```
BM  (lang="bm") : 2 sections — "Sifat-Sifat Asid dan Alkali" (2,245 chars) · "Peneutralan" (1,808 chars)
DLP (lang="en") : 2 sections — same structure, 2,038 / 1,729 chars
figures: 0    instructional diagrams: 0    chapter image: 1 (blog highlight only)
Total rendered teaching content: 4,054 characters (BM)
```

---

## 7. SP COVERAGE MATRIX

Judged on rendered output. COVERED requires the concept to be scientifically correct **and** actually rendered **and** intelligible at Form 2 level.

| SP | Requirement | Source page | Live location | Status | Severity | Finding |
|---|---|---|---|---|---|---|
| **6.1.1** | Definisi operasi asid & alkali | DSKP p. 65; TB p. 128 | Section 1 intro + cards "Asid"/"Alkali" | **COVERED** | — | pH, rasa (masam/pahit), mengakis, litmus, metals (acid → H₂, alkali → no reaction) and the water requirement all render correctly. Glacial ethanoic acid and solid NaOH used exactly as the source does |
| **6.1.2** | Bahan berasid/beralkali using 5 tools | DSKP p. 65; TB p. 129 | Section 1 accordions (4) + examples card | **PARTIAL** | MEDIUM | All four indicator colour sets match Jadual 6.3 exactly. **Meter pH absent** (0 occurrences on every live surface) — 4 of DSKP's 5 tools. See M-02 |
| **6.1.3** | Kekuatan asid/alkali from pH | DSKP p. 66; TB p. 130 | Section 1 `phSlider` + miniQuiz Q1 | **INCORRECT** | **CRITICAL** | The pH↔strength *rule* is stated correctly, but the worked examples contradict the source: vinegar labelled "Asid kuat", ammonia "Alkali kuat". See C-01 |
| **6.1.4** | Kegunaan, incl. pertanian & industri | DSKP p. 66; TB p. 131 | Section 1 card "Asid dan alkali dalam kehidupan harian" | **PARTIAL** | MEDIUM | Household examples only. **"pertanian"/"agriculture" = 0** on both live files; no sector treatment. See M-05 |
| **6.2.1** | Proses peneutralan | DSKP p. 66; TB p. 133 | Section 2 intro + 3 salt cards | **COVERED** | — | Definition, `Asid + Alkali → Garam + Air`, all three salt pairs matching the textbook table, titration named, apparatus (buret/pipet), indicator (fenolftalein) and endpoint (merah jambu → tidak berwarna) all correct. Prose-only is acceptable — not a Jadual 9 experiment |
| **6.2.2** | Aplikasi peneutralan harian | DSKP p. 66; TB pp. 134–135 | Section 2 accordions (5) | **PARTIAL** | HIGH | Ubat gigi, perapi rambut, penjagaan muka, tanah, sisa industri present. **Pelembut fabrik — named explicitly by DSKP — absent from the notes** yet tested by quiz q22. See H-02 |

| Status | Count |
|---|---|
| COVERED | **2 / 6** |
| PARTIAL | **3 / 6** |
| **INCORRECT** | **1 / 6** |
| MISSING | 0 / 6 |
| NOT_RENDERED | 0 / 6 |
| CONFUSING | 0 / 6 |

---

## 8. CRITICAL FINDINGS

**C-01 · INCORRECT · the pH slider mis-classifies acid and alkali strength, on the exact concept SP 6.1.3 targets**

- **Location:** `chapter-6/interactive-bm.ts` `phSlider.scale` (values 2 and 11); `interactive-dlp.ts` same entries. Verified rendering at runtime — the slider works and the label updates (probe moved 7 → 12, showing *"pH 12 — Air sabun | Alkali kuat"*).
- **Current, verbatim:**
  - BM pH 2 — *"Cuka / jus limau"* → *"**Asid kuat** — rasa masam yang anda kenali."*
  - BM pH 11 — *"Larutan ammonia"* → *"**Alkali kuat**."*
  - DLP pH 2 — *"Vinegar / lemon juice"* → *"**Strong acid** — the sour taste you recognise."*
  - DLP pH 11 — *"Ammonia solution"* → *"**Strong alkali**."*
- **Evidence.** Textbook Aktiviti 6.3 (printed p. 130) uses **asid hidroklorik 0.1 M, larutan natrium hidroksida, asid etanoik 0.1 M, larutan ammonia** and **larutan garam biasa**, with the explicit note *"Pastikan semua larutan yang digunakan mempunyai **kepekatan yang sama**"* — equal concentration, so pH differences express strength. Soalan 2 then asks the student to identify **(a) asid kuat (b) alkali kuat (c) asid lemah (d) alkali lemah (e) larutan neutral** from exactly those materials. The intended answers are HCl = strong acid, NaOH = strong alkali, **asid etanoik = asid lemah**, **larutan ammonia = alkali lemah**, salt solution = neutral.
  Ethanoic acid *is* the acid in vinegar. The textbook therefore makes vinegar's acid the canonical **weak acid** and ammonia solution the canonical **weak alkali** — the two substances AcadeMY labels "kuat".
- **Aggravating:** *"asid etanoik" / "ethanoic acid" = 0 occurrences* across every live BM surface. The canonical weak-acid example is absent while its everyday form is mislabelled strong.
- **Problem:** A student who studies the slider and then meets Aktiviti 6.3 Soalan 2 — or any exam item asking them to identify a weak acid or weak alkali — answers wrongly. This is the confusion between *pH position* and *acid strength* that SP 6.1.3 exists to resolve.
- **The fairer reading, stated for the record.** The textbook's own rule is *"semakin rendah nilai pH, semakin tinggi kekuatan asid"*, so on a bare reading of that sentence a pH-2 substance is "more strongly acidic" than a pH-3 one, and AcadeMY's labels could be defended as relative descriptors along the scale. Two things defeat that defence: AcadeMY's labels are **absolute** ("Asid kuat", not "more acidic than"), and the textbook's own worked identification places these two exact substances in the *lemah* column. **Flagged for curriculum-lead review** rather than treated as beyond argument — but on balance it is a wrong classification of an examinable concept, and under-grading it would be the worse error.
- **Not a defect:** the pH *values* are reasonable and the miniQuiz statement *"Semakin rendah nilai pH, semakin kuat asid"* is correct per source.

---

## 9. HIGH FINDINGS

**H-01 · LEAKAGE · 30 instances of textbook activity numbers exposed to learners**

- **Location and counts** (verified by pattern scan over every live surface):

| Surface | Hits | Examples |
|---|---|---|
| `quizzes-bm.ts` | 6 | `Aktiviti 6.1` ×2, `Aktiviti 6.5` ×4 |
| `quizzes-dlp.ts` | 6 | `Activity 6.1` ×2, `Activity 6.5` ×4 |
| `flashcards-bm.ts` | 7 | `Aktiviti 6.1` ×3, `Aktiviti 6.5` ×4 |
| `flashcards-dlp.ts` | 7 | `Activity 6.1` ×3, `Activity 6.5` ×4 |
| `mindmap-bm.ts` | 2 | `Aktiviti 6.1`, `Aktiviti 6.5` |
| `mindmap-dlp.ts` | 2 | `Activity 6.1`, `Activity 6.5` |
| `interactive-bm/dlp.ts` | **0** | notes themselves are clean |

- **Verbatim learner-facing examples:**
  - q20: *"Bagaimanakah seseorang mengetahui bahawa peneutralan telah selesai dalam **Aktiviti 6.5**?"*
  - q27: *"Dalam satu eksperimen pentitratan menggunakan kaedah **Aktiviti 6.5**…"*
  - flashcard: *"Apakah petunjuk yang digunakan dalam **Aktiviti 6.5**…"*
- **Problem:** this is not merely cosmetic bureaucracy. A student working inside AcadeMY has **never seen an "Aktiviti 6.5"** — the notes never present one and never use the label. The question is literally unanswerable in context unless the student happens to have the printed textbook open. It also breaks the project's own leakage contract (`Aktiviti \d\.\d` / `Activity \d\.\d` are banned patterns).
- **Comparison:** Chapters 1–5 have **zero** such leaks; Chapter 5's release gate scanned 62,191 rendered characters and found none. Chapter 6 is the outlier.
- The activity numbers are themselves **factually correct** (6.1 = properties, 6.5 = titration), which is why this reads as an unconverted lift from the textbook rather than an invention. `notes-bm.ts` / `notes-dlp.ts` carry the same references, suggesting the origin.

**H-02 · PARTIAL · fabric softener is DSKP-required, taught nowhere in the notes, and tested by the quiz**

- **Location:** `interactive-bm.ts` / `interactive-dlp.ts`, section 2 accordions.
- **Evidence:** DSKP 6.2.2 Catatan names four applications; **"Pelembut fabrik dan perapi rambut"** is one of them. Textbook printed p. 135: *"Pelembut fabrik mempunyai sifat asid. Oleh itu ia mengurangkan nilai pH fabrik yang menjadi beralkali disebabkan oleh penggunaan serbuk pencuci."*
- **Verified counts:** `pelembut fabrik` / `fabric softener` → **interactive-bm 0, interactive-dlp 0**, quizzes-bm 2, flashcards-bm 4, mindmap-bm 1.
- **The notes↔quiz gap:** quiz **q22** asks *"Mengapakah pelembut fabrik yang bersifat berasid digunakan selepas fabrik dibasuh dengan detergen?"* — correct question, correct key, testing something the notes never teach. The flashcards and mind map teach it; the notes do not.
- **q22 is correct and must not be weakened.** The notes are the deficient side.

**H-03 · CONFUSING · the jellyfish-sting question is answered evasively and does not teach the expected model**

- **Location:** `interactive-bm.ts` section 2 `checks[0]`; DLP equivalent.
- **Current, verbatim (BM):**
  > Q: *"Amran disengat oleh ubur-ubur. Kesakitannya bertambah teruk apabila sabun (beralkali) disapukan. Mengapa?"*
  > Hint: *"Jika kimia sengatan itu bukan asid mudah, penambahan alkali tidak semestinya membantu — peneutralan yang tidak lengkap atau tidak sepadan boleh mengiritasi luka lebih teruk. Rawatan yang betul bergantung kepada mengetahui kimia sebenar sengatan itu."*
- **Problem:** the question is lifted from Latihan Sumatif 6 Q4, but the answer never states the expected reasoning. The KSSM model is: soap and toothpaste are **alkaline**; applying more alkali to an already-alkaline sting cannot neutralise it and worsens the irritation; the remedy is therefore something **acidic** (e.g. vinegar). AcadeMY instead offers a hedge — *"if the chemistry isn't a simple acid…"*, *"the right treatment depends on knowing the actual chemistry"* — which asserts nothing a student can carry into the exam and does not answer part (b) of the source question at all.
- **Credit where due:** AcadeMY correctly uses **ubur-ubur (jellyfish)**, matching the textbook, and did **not** import NotebookLM's fabricated wasp. The caution about not over-generalising sting chemistry is scientifically respectable. But a *check-yourself* answer that declines to give the answer leaves the learner worse off than silence, and the hedging appears to substitute for the curriculum position rather than supplement it.
- **Recommended framing for remediation:** teach the KSSM model plainly, and if a caveat is wanted, add it *after* the expected answer rather than in place of it.

---

## 10. MEDIUM FINDINGS

**M-01 · STRUCTURE · 2 sections for 6 SPs, 4,054 rendered characters, zero instructional diagrams**
Runtime-verified: section 1 (2,245 chars) carries SPs 6.1.1–6.1.4; section 2 (1,808 chars) carries 6.2.1–6.2.2. For comparison, remediated Chapter 5 renders ~16,000 characters across 12 sections. This is the same over-compression Chapters 4 and 5 were remediated out of. Section titles are sensible and Back/Next, progress and one-active-section all work correctly — the issue is granularity and depth, not mechanics.

**M-02 · MISSING · Meter pH absent**
DSKP 6.1.2 names five tools: Kertas litmus, Penunjuk universal, Metil jingga, Fenolftalein, **Meter pH**. AcadeMY's accordions carry four. Verified: `meter pH` / `pH meter` = **0 on every live surface**. (`kertas pH` appears once each in flashcards and mind map.) The textbook also uses kertas pH and meter pH in Aktiviti 6.2 and 6.3, and Latihan Sumatif 6 Q2(b) asks for an advantage of pH paper over litmus — assessable content with no home in the notes.

**M-03 · TERMINOLOGY (BM only) · "petunjuk sejagat" is neither source term**
DSKP says **penunjuk universal**; the textbook says **penunjuk semesta**. AcadeMY BM says **"petunjuk sejagat"** — a third term. Verified across live BM surfaces: **`penunjuk` = 0, `petunjuk` = 16** (interactive 2, quizzes 6, flashcards 6, mindmap 2). In Malaysian scientific register the indicator is *penunjuk*; *petunjuk* means a clue or guide. **The DLP stream is correct** — it uses "universal indicator" throughout. The BM stream is the deficient one, and the correct BM term is recoverable directly from the DLP.

**M-04 · TERMINOLOGY (BM only) · "kapur terhidrat" for the soil treatment**
Textbook printed p. 135: *"Tanah yang berasid dapat dirawat dengan menabur **kapur mati** yang bersifat alkali supaya tanaman dapat tumbuh dengan subur."* AcadeMY BM uses **"kapur terhidrat"** (5 occurrences: interactive 1, quizzes 1, flashcards 2, mindmap 1); `kapur mati` = **0**. The DLP correctly says **"slaked lime"**. Identical to the defect found and fixed in Chapter 5.

**M-05 · PARTIAL · SP 6.1.4's agriculture and industry sectors are not covered**
DSKP 6.1.4 Catatan requires data on uses *"termasuk sektor **pertanian dan industri**"*, and textbook Aktiviti 6.4 is explicitly a group task on exactly that. AcadeMY has one card of household examples (cuka, minuman bergas, asid bateri; sabun, baja, antasid, detergen). Verified: `pertanian` / `agriculture` = **0** in both live files. Only *"baja (ammonia)"* gestures at agriculture. The textbook's own agricultural and industrial photo spread (Gambar foto 6.2, 6.5) has no counterpart.

---

## 11. LOW FINDINGS

**L-01 · No instructional visuals.** Runtime: `figures: 0`, one `img` (the blog-highlight chapter picture). The only visual teaching device is the `phSlider`, which works well. Four concepts in this chapter are strongly visual and currently text-only: dry-vs-aqueous behaviour (textbook Rajah 6.4 is a four-panel comparison), the indicator colour table (Jadual 6.3 — a table would serve better than prose accordions), the titration set-up (Rajah 6.7), and the acid/alkali property comparison (Jadual 6.2). Per the AcadeMY standard, an HTML table and small SVG schematics would serve here — **not** decorative images.

**L-02 · No test coverage.** There is no `chapter-6/*.test.*` file, and `learner-facing-leakage.test.ts` covers Chapters 1–5 only (`C6` references = 0). Had it covered Chapter 6, H-01's 30 leaks would have failed the build.

**L-03 · Cosmetic terminology.** AcadeMY uses *"Kekakisan"* where the source uses *"sifat mengakis"* (textbook) / *"sifat mengkakis"* (DSKP). Acceptable nominalisation; noted only for consistency. The DSKP's own *"litmius"* typo is correctly not reproduced by AcadeMY.

---

## 12. NOTES / LEARNER-COMPREHENSION AUDIT

Read as a Form 2 student, against the specific confusions the brief asks about:

| Risk | Verdict |
|---|---|
| acid vs alkali | **Clear.** The two cards are parallel and contrast cleanly on all five properties |
| alkali vs base | **Not applicable** — "base"/"bes" never appears, matching the source, which stays with *alkali* |
| indicator vs pH | **Adequate.** The litmus accordion notes litmus is *"mudah tetapi tidak menunjukkan kekuatan"*, which is the right distinction |
| **acid strength vs pH position** | **CONFUSED — see C-01.** This is the chapter's weakest point |
| strength vs concentration | **Not addressed at all.** The textbook's equal-concentration control in Aktiviti 6.3 is the mechanism that separates the two ideas, and AcadeMY does not carry it |
| neutralisation vs dilution | **Clear.** Neutralisation is framed as mutual cancellation producing salt + water |
| reactants vs products | **Clear.** `Asid + Alkali → Garam + Air` renders literally, with three worked pairs |
| acid + alkali vs other reactions | **Clear.** The acid + metal → hydrogen reaction is kept distinct from neutralisation |

**Prose quality is good** — the etymology opener (*acidus* / *al-qali*) is a genuinely nice hook, and the water-requirement explanation is clearer than the textbook's. The chapter's problem is not writing quality but scope and one wrong classification.

---

## 13. ACTIVITY / PRACTICAL AUDIT

| Textbook activity | Tied SP | Classification | AcadeMY treatment |
|---|---|---|---|
| **Aktiviti 6.1** — properties of acids/alkalis (pH paper, taste of lime/bitter gourd, litmus, magnesium ribbon) | 6.1.1 | **Suggested activity** (not in Jadual 9) | Content taught; activity not staged. **Number leaked** (H-01) |
| **Aktiviti 6.2** — testing everyday substances with 5 indicators | 6.1.2 | **Suggested activity** | Content partly taught (4 of 5 tools) |
| **Aktiviti 6.3** — pH vs strength, equal concentrations | 6.1.3 | **Suggested activity** | pH scale present; **the equal-concentration control and the weak/strong identification are absent** — the root of C-01 |
| **Aktiviti 6.4** — collecting uses incl. agriculture/industry | 6.1.4 | **Suggested activity / group project** | Not represented (M-05) |
| **Aktiviti 6.5** — neutralisation titration (buret, pipet, fenolftalein, endpoint) | 6.2.1 | **Suggested activity** (not in Jadual 9) | Apparatus, indicator and endpoint correctly taught in prose. **Number leaked** (H-01) |

**No Chapter 6 activity is a mandatory experiment.** AcadeMY is therefore **correct not to stage them** as full variable-controlled investigations — this is a genuine difference from Chapter 5 and must not be "fixed" by importing the Chapter 5 experiment scaffold.

**Safety:** the source's own cautions (small quantities, safety goggles) are not reproduced, but AcadeMY also stages no practical, so no unsafe instruction exists. **Taste is taught as a property** (*berasa masam* / *berasa pahit*), which is source-supported, and AcadeMY correctly adds *"jangan sekali-kali dirasa terus"* on the alkali card. **No unsafe tasting instruction was found.**

---

## 14. QUIZ AUDIT

**30 items per language, 60 total.**

| Check | Result |
|---|---|
| `answerIndex` in range | **0 problems** (both banks) |
| Duplicate option sets | **0** |
| Difficulty spread | Easy 10 / Medium 10 / Hard 10 — both languages |
| BM/DLP parity | 30 / 30, same order, same meaning |

**Scientific accuracy — every indicator, pH and salt item verified against Jadual 6.3 and the p. 133 salt table:**

| Item | Key | Verdict |
|---|---|---|
| q3 pH range | "0 hingga 14" | ✓ |
| q5 blue litmus + acid | "Bertukar kepada merah" | ✓ |
| q6 red litmus + alkali | "Bertukar kepada biru" | ✓ |
| q12 phenolphthalein in alkali | "Tidak berwarna kepada merah jambu" | ✓ |
| q13 universal indicator neutral | "Hijau" | ✓ |
| q14 methyl orange neutral & alkali | "Kuning" | ✓ |
| q17 HCl + NaOH | "Natrium klorida" | ✓ |
| q18 H₂SO₄ + KOH | "Kalium sulfat" | ✓ matches textbook pairing, not NotebookLM's |
| q10 neutralisation products | "Garam dan air" | ✓ |
| q11 / q28 water requirement | "…hanya menunjukkan sifatnya dengan kehadiran air" | ✓ |
| q20 titration endpoint | "merah jambu kepada tidak berwarna" | ✓ |
| q21 acidic soil | "Kapur terhidrat…" | ✓ chemistry; ✗ term (M-04) |
| q30 pond-water classification | "Neutral" | ✓ |

**No wrong answer key was found. No item should be weakened.**

**Items testing material the live notes never teach:**

| Item | Tests | Taught in notes? |
|---|---|---|
| **q22** | Fabric softener neutralising alkaline fabric | **NO** — H-02 |
| **q20, q27** | Titration procedure "in Aktiviti 6.5" | Endpoint yes; the referenced activity **does not exist in AcadeMY** — H-01 |
| q2 (implied) | pH paper vs litmus advantage | **NO** — M-02 |

**Not assessed at all:** acid + metal → hydrogen (taught in the notes, and a Latihan Sumatif Q1(c) topic), and the weak/strong identification of ethanoic acid and ammonia.

---

## 15. EMBEDDED INTERACTION AUDIT

Verified by mounting the real components and driving them.

| Interaction | Count | Result |
|---|---|---|
| Indicator accordions (section 1) | 4 | **All work** — `aria-expanded` flips to `true`, body text appears |
| Check-yourself accordions | 3 | **All work** |
| `phSlider` | 1 | **Works** — keyboard ArrowRight moved value 7 → 12 and the label updated to *"pH 12 — Air sabun | Alkali kuat"*; `aria-valuemin=0`, `aria-valuemax=14` correct |
| miniQuiz | 2 items | Render and score correctly |
| Matcher / sequence / flip cards / interactive diagrams | **0** | None present in this chapter |

- **No dead labels.** Every interactive control responds and shows the correct content for its label.
- **No confusingly reused diagrams** — there is only one visual device.
- **BM/DLP equivalence:** identical interaction inventory and behaviour in both streams.
- **The only interaction defect is the *content* of the slider's labels (C-01), not its mechanics.**

**Probe note:** `End`/`Home` keys did not move the slider in my synthetic-event probe while arrow keys did. This is most likely a limitation of dispatched `KeyboardEvent`s against Radix's handler rather than a product defect, and the primary interaction is verified working — recorded as an observation, not a finding.

---

## 16. FLASHCARD AUDIT

**60 per language, 120 total. BM/DLP parity: 60 / 60.**

- **Scientific correctness: clean.** Indicator colours, litmus behaviour, pH range, the acid/alkali property contrast, the metals contrast (*"Asid bertindak balas dengan logam untuk menghasilkan gas hidrogen. Alkali tidak bertindak balas dengan logam."*), the water requirement, the titration indicator and endpoint, and the pH↔strength rule are all correct against source.
- The five-indicator neutral-colour comparison card matches Jadual 6.3's five rows exactly.
- **Flashcards are ahead of the notes** — they carry fabric softener (4 cards) and the slaked-lime treatment, which the notes lack.
- **Defects inherited, not new:** `Aktiviti 6.1` / `Aktiviti 6.5` leakage (7 per language, H-01); *"petunjuk"* (6, M-03); *"kapur terhidrat"* (2, M-04). The DLP card correctly reads *"Slaked lime"*.
- **No contradiction** was found between any flashcard and the notes or quizzes.

---

## 17. MIND-MAP AUDIT

**96 nodes per language, exact parity.**

Structure: root → 6.1 Sifat-Sifat Asid dan Alkali (Pengenalan / Sifat Hanya Hadir dengan Air / Bahan Berasid & Beralkali / Petunjuk / Skala pH / Aktiviti 6.1 / Jadual Sifat / Jadual Perubahan Warna Petunjuk / Kata Kunci) → 6.2 Peneutralan.

- **Hierarchy is sound** and mirrors the textbook's own Rumusan (p. 136) closely, including *Peranan air* as a named property.
- **Scientifically accurate**, including the full indicator colour table, the dry-vs-aqueous contrast, the pH scale, and *"Magnesium TIDAK bertindak balas dengan alkali"*.
- **The mind map is the richest Chapter 6 surface** — richer than the live notes. It carries content the notes omit (the property table, the metals detail, the taste examples *jus limau / jus peria*).
- **Defects:** `Aktiviti 6.1` and `Aktiviti 6.5` exposed as node labels (H-01); *"Petunjuk (Indikator)"* and *"Petunjuk sejagat"* (M-03); *"kapur terhidrat"* (M-04).
- **No missing major concept** and **no incorrect hierarchy** was found.

---

## 18. VISUAL AUDIT

Against the AcadeMY standard (compact default + enlarge on demand + direct labels + click → definition):

| Element | Assessment |
|---|---|
| `phSlider` | **Good.** Compact, works, correct 0–14 range, label and description update on move. Fits at 375 px (container 333 px). Its *labels* are wrong (C-01), not its design |
| Chapter image | Blog-highlight decoration only; not instructional |
| Instructional diagrams | **None.** `figures: 0` |
| Dead hotspots | **None** — there are no hotspot-annotated images |

**Concepts currently text-only that the source presents visually:** dry-vs-aqueous behaviour (Rajah 6.4, a four-panel comparison), indicator colours (Jadual 6.3, a 5×4 table), the titration set-up (Rajah 6.7), and the acid/alkali property contrast (Jadual 6.2).

**Recommendation direction:** an HTML comparison table for Jadual 6.3 and a small SVG for the dry/aqueous contrast and the titration set-up. **No decorative imagery is warranted** — this chapter's content is tabular and schematic.

**Mobile (375 px):** page horizontal overflow **0 px**; no tap target under 32 px; slider fits and remains usable.

---

## 19. BM / DLP PARITY

| Dimension | BM | DLP | Verdict |
|---|---|---|---|
| Sections | 2 | 2 | **PASS** |
| Section order/titles | Sifat-Sifat → Peneutralan | Properties → Neutralisation | **PASS** |
| Quiz items | 30 | 30 | **PASS** |
| Flashcards | 60 | 60 | **PASS** |
| Mind-map nodes | 96 | 96 | **PASS** |
| Interactions | 4 accordions + slider + miniQuiz | identical | **PASS** |
| pH values / indicator colours / equations | identical and correct | identical and correct | **PASS** |

**Terminology — the one asymmetry, and it favours DLP:**

| Concept | BM (AcadeMY) | Source BM | DLP (AcadeMY) | Verdict |
|---|---|---|---|---|
| universal indicator | **petunjuk sejagat** | penunjuk semesta / penunjuk universal | **universal indicator** ✓ | **BM wrong** |
| slaked lime | **kapur terhidrat** | kapur mati | **slaked lime** ✓ | **BM wrong** |
| asid / alkali / neutral | correct | — | correct | PASS |
| litmus / peneutralan / pentitratan | correct | — | litmus / neutralisation / titration | PASS |
| salt names | natrium klorida, kalium sulfat, natrium nitrat | identical | sodium chloride, potassium sulphate, sodium nitrate | PASS |

**Both streams share C-01 identically** (BM "Asid kuat"/"Alkali kuat"; DLP "Strong acid"/"Strong alkali"), so it is a content defect, not a translation defect.

---

## 20. LEARNER-FACING SOURCE LEAKAGE

**Scanned:** all eight live surfaces against 19 patterns.

| Result | Detail |
|---|---|
| `interactive-bm.ts` | **CLEAN** |
| `interactive-dlp.ts` | **CLEAN** |
| quizzes / flashcards / mind maps | **30 HITS** — all `Aktiviti \d\.\d` / `Activity \d\.\d` (H-01) |
| DSKP / SK / SP / Standard Pembelajaran / Jadual 9 | **0** |
| Rajah 6.x / Jadual 6.x | **0** |
| audit / binding / mandatory / source-supported / reviewer / remediation | **0** |
| SP codes `6.x.x` | **0** |

SK-level numbers (`Semak diri — 6.1`) render from the shared shell, identical to Chapters 1–5 which are release-gated. Not a Chapter 6 defect.

**Verdict: FAIL** — the notes are clean, but the assessment and revision surfaces are not.

---

## 21. TESTS / RUNTIME

| Check | Result |
|---|---|
| `tsc --noEmit` | **PASS** |
| `npm run build` | **PASS** — full Cloudflare Pages worker build |
| Science F2 suites | **PASS** — 147/147 (4 files) |
| Chapter 6 tests | **NONE EXIST** |
| Leakage suite coverage of Ch6 | **NONE** (`C6` references = 0) |
| Full `vitest run` | 1564 passed, **8 failed** |
| **Chapter 6-attributable failures** | **0** |

**Pre-existing failures, unrelated to Chapter 6 — reported, not hidden:**

1. `src/routes/-onboarding-ui.test.ts` — Explorer onboarding UI contract *(new since the Chapter 5 gate; unrelated to Science content)*
2. `src/lib/billing-core.test.ts` — ToyyibPay sandbox plans
3. `src/lib/invoice-pdf.server.test.ts` — invoice PDF generation
4. `src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts`
5. `src/content/bm/asas-penulisan-form1-mindmap.test.ts`
6. `src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts`
7. `src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts`
8. `src/content/form2/math/chapter-1/quizzes-dlp.test.ts`

`npm run lint` fails repo-wide on CRLF-vs-LF; pre-existing, not a Chapter 6 signal.

**Working tree:** only `content-stats.generated.ts` and `routeTree.gen.ts` are modified — both build-generated, neither touched by this audit.

---

## 22. LIMITATIONS

1. **The DLP/English textbook was not supplied.** English strings were validated by translation equivalence against the BM textbook only.
2. **`Errata.pdf` is self-disclaimed** as a mirrored, non-official record. Its Chapter 6 status was cross-checked against its own page list and is internally consistent, but no item here is *errata-verified*.
3. **Dead-notes content was read but never credited.** `notes-bm.ts` / `notes-dlp.ts` are larger than the live files; if the shadowing at `notes.tsx:1999` were ever reversed, several findings would change status.
4. **Screenshots were unavailable** — the Browser pane was not compositing. Visual claims rest on measured DOM geometry and rendered text.
5. **C-01 carries a defensible counter-reading**, stated in full in §8. It is flagged for curriculum-lead adjudication rather than presented as beyond argument.
6. **Quiz distractor quality was spot-checked, not exhaustively modelled** — all 60 keys were verified in range and correct, but not every distractor was traced to a specific misconception.

---

## 23. RECOMMENDED REMEDIATION PRIORITY

Proposals only. **Nothing in this section has been implemented.**

### P0 — release blockers

| # | Finding | Action |
|---|---|---|
| 1 | **C-01** | Correct the strength labels on the pH slider. Vinegar/ethanoic acid must not be called a strong acid, nor ammonia a strong alkali. Introduce the source's own weak/strong pairs (HCl vs asid etanoik; NaOH vs larutan ammonia) and the equal-concentration control that makes the comparison meaningful |
| 2 | **H-01** | Remove all 30 `Aktiviti 6.x` / `Activity 6.x` references from quizzes, flashcards and mind maps. Rewrite the affected questions to be self-contained (e.g. q20 → "in a titration using phenolphthalein…"). **Do not weaken the questions** — only de-reference them |
| 3 | **H-02** | Teach fabric softener in the notes, closing the q22 gap. Content already exists correctly in the flashcards |
| 4 | **H-03** | Replace the evasive jellyfish answer with the KSSM expected model (soap and toothpaste are alkaline → adding alkali to an alkaline sting worsens it → apply something acidic), keeping any nuance as a follow-on rather than a substitute |

### P1 — coverage and structure

| # | Finding | Action |
|---|---|---|
| 5 | M-01 | Restructure 2 → 7–9 sections, giving each SP a clear home. **Do not import the Chapter 5 experiment scaffold** — Chapter 6 has no Jadual 9 experiment |
| 6 | M-02 | Add meter pH / kertas pH as the fifth indicator tool, including the pH-paper-vs-litmus advantage |
| 7 | M-05 | Add the agriculture and industry uses required by SP 6.1.4 |
| 8 | L-01 | Add an indicator comparison **table** (Jadual 6.3), a dry-vs-aqueous SVG, and a compact titration schematic |

### P2 — terminology and guards

| # | Finding | Action |
|---|---|---|
| 9 | M-03 | Replace BM *"petunjuk sejagat"* / *"petunjuk"* with **penunjuk semesta** / **penunjuk** (16 occurrences). The DLP is already correct |
| 10 | M-04 | Replace BM *"kapur terhidrat"* with **kapur mati** (5 occurrences). The DLP is already correct |
| 11 | L-02 | Add `chapter-6-remediation.test.tsx` and extend `learner-facing-leakage.test.ts` to Chapter 6 — this alone would have caught H-01 |

**Constraints for whoever implements this:**
- **Do not weaken q20, q22 or q27** — all are correct; the notes are the deficient side.
- **Do not stage Chapter 6 activities as mandatory experiments** — Jadual 9 lists none.
- **Do not import NotebookLM's wasp-sting example** — it does not exist in the source.
- **Do not revive the dead notes in parallel**, and do not delete them.

---

## CHAPTER 6 VERDICT

```
CHAPTER 6 VERDICT: FAIL — HUMAN REVIEW REQUIRED

CRITICAL: 1   (C-01 vinegar labelled a strong acid and ammonia a strong alkali,
               contradicting the textbook's canonical weak examples, on SP 6.1.3's
               core concept)
HIGH:     3   (H-01 30 learner-facing "Aktiviti 6.x" leaks across quizzes,
               flashcards and mind maps;
               H-02 fabric softener DSKP-required, absent from notes, tested by q22;
               H-03 jellyfish-sting check answered evasively, does not teach the
               expected model)
MEDIUM:   5   (M-01 2 sections / 4,054 chars / 0 diagrams for 6 SPs;
               M-02 meter pH absent;
               M-03 BM "petunjuk sejagat" is neither source term;
               M-04 BM "kapur terhidrat" for source "kapur mati";
               M-05 SP 6.1.4 agriculture/industry sectors uncovered)
LOW:      3   (L-01 no instructional visuals; L-02 no Ch6 tests or leakage coverage;
               L-03 "Kekakisan" vs source "sifat mengakis")

SP COVERAGE:
  COVERED:      2 / 6   (6.1.1, 6.2.1)
  PARTIAL:      3 / 6   (6.1.2, 6.1.4, 6.2.2)
  MISSING:      0 / 6
  INCORRECT:    1 / 6   (6.1.3)
  NOT_RENDERED: 0 / 6
  CONFUSING:    0 / 6

MANDATORY EXPERIMENTS: 0 in Jadual 9 — CONFIRMED by direct inspection
                       (Form 2 list is 3.4.1, 5.1.2, 5.2.2, 7.3.3, 8.2.5)
NOTEBOOKLM ERRORS FOUND: 3 + 1 incomplete
  NL-01 "wasp sting"  -> textbook says UBUR-UBUR (jellyfish); no wasp in Chapter 6
  NL-02 "sulfuric acid + sodium hydroxide" -> worked example is + POTASSIUM hydroxide
  NL-03 activity list -> missed Aktiviti 6.5, the titration activity
  NL-06 "no Ch6 errata" -> true for factual corrections; omits the p.129 broken-QR flag

ACADEMY CONTENT MODIFIED: NO
AUDIT ONLY: YES
```

**HUMAN REVIEW REQUIRED specifically for:**
1. **C-01** — whether AcadeMY's absolute "kuat/lemah" slider labels can stand against the textbook's own identification of ethanoic acid and ammonia as the weak pair. Both readings are set out in §8; this is a curriculum-authority decision.
2. **H-03** — how far AcadeMY should hedge the KSSM sting model. The caution is scientifically respectable but currently displaces the answer the exam expects.
3. **DLP source gap** — every English string was validated only by translation equivalence (§22.1).

## Action taken

**None.** This audit modified no project file. No fixes were implemented, no content was rewritten, and no quiz, flashcard, mind map, image, or component was changed. Every action in §23 is a proposal for a future, separately approved change.
