# DEEP AUDIT — Sains / Science Tingkatan 2, Bab 5: Air dan Larutan (BM + DLP)

**Mode:** READ-ONLY. No AcadeMY content, component, quiz, flashcard, mind map, or image was modified, created, deleted, or renamed. The only code executed was diagnostic (dev-server mount probes, grep, build, tests).
**Date:** 2026-08-26
**Scope:** `science-f2-c5-bm` and `science-f2-c5-dlp` — notes, quizzes, flashcards, mind maps, embedded interactions, rendering path.

---

## 1. VERDICT

# FAIL — HUMAN REVIEW REQUIRED

Chapter 5 is **scientifically sound** — materially more so than Chapter 4 was at the equivalent stage. No factual error was found in any live learner-facing statement. **The chapter fails on coverage and structure, not on correctness.**

Driving the FAIL:

- **3 CRITICAL** — SP 5.3.2 entirely absent; both DSKP-mandatory experiments (5.1.2, 5.2.2) present as facts but with no experiment structure; 11 SPs compressed into 3 sections with **zero instructional visuals**.
- **4 HIGH** — solubility-as-a-quantity is never taught in the notes yet a Hard quiz item requires it; *keterlarutan* undefined in notes; ether missing from the DSKP solvent list; SP 5.3.4 missing its two named DSKP anchors.
- 11 SPs across 3 sections, versus the 9–12 sections Chapter 4 was restructured to.

**The user's designated highest-risk item — SOLUBILITY vs RATE OF DISSOLVING — is handled CORRECTLY by AcadeMY**, in both languages, across notes, flashcards, and quizzes. It is **NotebookLM that is wrong** on this point (§3). The real risk sits one step away and is documented as H-01.

---

## 2. SOURCE PROVENANCE

| Source | Identity verified from the file itself | Status | Ch5 location |
|---|---|---|---|
| DSKP.pdf | KPM / BPK, *KSSM Sains Tingkatan 2 DSKP* | Authoritative | Bidang 5, printed pp. 30–33; Jadual 9 p. 33; authority rule p. 39 |
| Textbook.pdf | KPM, *Sains Tingkatan 2* (BM) | Authoritative | Bab 5 = printed pp. 94–121 |
| Errata.pdf | Self-disclaimed compilation, "must not be presented as an official KPM PDF" | **Advisory only** | No Ch5 entry |

**Authority rule applied (DSKP printed p. 39):** the *Catatan* column carries binding *Skop SK & SP* and non-binding *Cadangan aktiviti PdP*. Only the binding portion is used to judge COVERED/MISSING below.

**Errata status for Bab 5 — verified, not assumed.** Correction pages are 53, 71, 151, 173; QR-code corrections are on pages 6, 53, 55, 59, 77, 78, 81, 84, 129, 218, 232. **None falls inside Ch5's printed range 94–121.** NotebookLM's §7 claim of "no Chapter 5 errata" is therefore **CONFIRMED**.

**Audit limitation:** the DLP/English textbook was **not supplied**. Every English string was checked by translation equivalence against the BM textbook, not against its stated DLP source. See §21.

---

## 3. NOTEBOOKLM CORRECTIONS

The source map was used as a checklist only. Independent verification found **three errors in NotebookLM**, one of them on the chapter's highest-risk concept.

**NL-01 · WRONG · NotebookLM conflates solubility with rate of dissolving — AcadeMY does not.**
NotebookLM §4 states: *"Solubility Factors: Increasing temperature and stirring rate **increases solubility**… Decreasing solute size… **increases solubility**."*
This is incorrect. Verified against DSKP 5.2.2 Catatan: *"Faktor yang mempengaruhi **kadar keterlarutan** seperti suhu pelarut, kadar kacauan, saiz zat terlarut"* and against Eksperimen 5.2, where all three parts declare the responding variable as **"Kadar keterlarutan"**. Stirring and particle size change **how fast** a solute dissolves; they do not change **how much** can dissolve.
**Had AcadeMY followed NotebookLM here, it would have shipped a wrong explanation.** It did not — see §4.

**NL-02 · WRONG · the "page 183" recap claim is a hallucination.**
NotebookLM §9.3 asserts the Chapter 5 *Refleksi Kendiri* on **page 183** omits SP 5.3.3 and 5.3.4. Verified: printed **p. 183 is Bab 8 "Momen Daya"**, an unrelated chapter. The Ch5 *Refleksi Kendiri* is on printed **p. 121** and **lists all 11 SPs, including 5.3.3 and 5.3.4**. Both the page number and the omission are fabricated. No educator action is required.

**NL-03 · IMPRECISE · the purification-method count.**
NotebookLM §4 lists 3 methods. DSKP 5.3.1 Catatan lists **5** (Pendidihan, Penurasan, **Penulenan**, Pengklorinan, Penyulingan); textbook Rajah 5.22 shows **4** (no *penulenan*). The DSKP list is binding. Recorded against AcadeMY as M-02.

**Confirmed correct in NotebookLM:** the DSKP header typo *"kertelarutan"*; the *pelarut universal* / *pelarut semesta* terminology shift; cohesion = *daya lekitan*, adhesion = *daya lekatan*; Jadual 9 status of both experiments; the 7-stage sequence and chemical functions; Ch5 errata status.

---

## 4. HIGHEST-RISK ITEM — SOLUBILITY vs RATE OF DISSOLVING

This was the user's designated highest-risk area and was audited first and hardest, against the source rather than against existing wording.

**Source position (binding):**
- Textbook p. 109, verbatim: *"Keterlarutan suatu bahan ialah kuantiti maksimum zat terlarut yang dapat larut di dalam 100 ml pelarut pada suhu yang tertentu."* → solubility is a **quantity**.
- DSKP 5.2.2 + Eksperimen 5.2 responding variable → the three factors act on **kadar keterlarutan** (rate).

**AcadeMY's position — verified string by string:**

| Surface | Framing of temperature / stirring / particle size | Verdict |
|---|---|---|
| `interactive-bm.ts` flipCards (5.2) | *"zat terlarut larut **lebih cepat**"*, *"**lebih pantas**"*, *"larut **lebih cepat**"* | **RATE — correct** |
| `interactive-dlp.ts` | 12 × *"rate of solubility"*, 0 × bare "solubility increases" | **RATE — correct** |
| `flashcards-bm.ts` f30–f32 | *"faktor yang mempengaruhi **kadar keterlarutan**"* | **RATE — correct** |
| `flashcards-dlp.ts` f31–f32 | *"increases the **rate of solubility**"* | **RATE — correct** |
| `quizzes-bm.ts` q18 | *"Mengapakah gula halus larut **lebih cepat** daripada kiub gula?"* | **RATE — correct** |

**Finding: AcadeMY gets this right, in both languages, on every surface.** No learner-facing string was found that claims stirring or particle size changes solubility. This is the single strongest result in the audit and it should be protected in any future remediation — §23 records it as a regression risk.

**Where the real risk actually sits (H-01):** temperature *does* change solubility-as-a-quantity, and `quizzes-bm.ts` **q23 / `quizzes-dlp.ts` q23 (Hard)** test exactly that:

> *"Aliya mendapati tiga sudu garam menghasilkan larutan tepu dalam 50 ml air. Jika dia memanaskan larutan itu…"* → key: *"Lebih banyak garam mungkin larut, kerana **keterlarutan** secara umum meningkat dengan peningkatan suhu."*

The **answer key is scientifically correct** (`answerIndex: 1`, both languages). But the notes teach only rate. A student who studies the live notes and then meets q23 has never been taught that solubility itself is temperature-dependent — the notes and this item do not meet. Per the user's rule, **q23 is not to be weakened**; the notes are the side that is short.

The q23 explanation hedges — *"kadar (dan secara umumnya tahap) keterlarutan meningkat dengan suhu"* — which is the one place in the chapter where the two senses are distinguished, and it does so parenthetically inside an explanation most students see only after answering.

---

## 5. LIVE PRODUCTION PATH

Traced, not assumed.

`src/content/registry.ts` sets **both** `notes:` and `sciF2InteractiveData:` on `science-f2-c5-bm` / `-dlp`. In `src/routes/notes.tsx`, the `sciF2InteractiveData` ternary branch (line 2033 → `ScienceF2Chapter5NotesBlock`) is evaluated **before** the `activeChapter?.notes` fallback (line 2141). The interactive branch therefore always wins.

**Consequence: `notes-bm.ts` (31,005 bytes) and `notes-dlp.ts` (30,460 bytes) are registered but unreachable.** This is the same shadowing pattern found in Chapters 3 and 4.

This matters for scoring: the dead files contain content the live notes lack — 4 occurrences of *"100 ml"*, the full 5-method purification set, and richer treatment-stage naming. **None of it is credited as learner coverage anywhere in this report.**

Runtime confirmation (real components mounted from the Vite ESM graph, both languages, all sections walked):

```
BM : 3 sections — "Sifat Fizik Air" · "Larutan dan Kadar Keterlarutan" · "Kuiz Pantas"
DLP: 3 sections — "Physical Characteristics of Water" · "Solution and Rate of Solubility" · "Quick Quiz"
figures: 0   svg: 0   (all sections, both languages)
```

---

## 6. DSKP COVERAGE MATRIX — all 11 SPs

Judged against the **live** notes surface only. Mind-map or flashcard-only presence is noted but never earns COVERED.

| SP | Requirement | Status | Evidence |
|---|---|---|---|
| **5.1.1** | Menghuraikan dan berkomunikasi mengenai air | **COVERED** | Fixed values (100 °C / 0 °C / 1 g cm⁻³), *daya lekitan* & *daya lekatan* correctly assigned, surface tension, capillarity, impurities, electrolysis — all present and correct |
| **5.1.2** | **Eksperimen** penyejatan *(Jadual 9 — mandatory)* | **PARTIAL** | 4 factors present as flip cards; **no hypothesis, no variables, no procedure** — `hipotesis` / `pemboleh ubah` = 0 in live *and* dead. C-02 |
| **5.2.1** | Maksud larutan, **keterlarutan** | **PARTIAL** | *larutan* / *zat terlarut* / *pelarut* / cair–pekat–tepu all defined correctly. **`keterlarutan` is never defined in the notes** — H-02 |
| **5.2.2** | **Eksperimen** faktor kadar keterlarutan *(Jadual 9 — mandatory)* | **PARTIAL** | All 3 factors present and correctly framed as rate (§4); no experiment structure. C-02 |
| **5.2.3** | Maksud koloid | **COVERED** | Tab carries both source features from p. 111 — not clear, and no precipitate; intermediate between solution and suspension |
| **5.2.4** | Air sebagai pelarut semesta | **COVERED** | Present; uses the textbook term *pelarut semesta*, no terminology conflict exposed to learners |
| **5.2.5** | Pelarut bukan air dan kegunaannya | **PARTIAL** | 4 of DSKP's 5 present. **Eter absent** from both live streams — H-03 |
| **5.3.1** | Kaedah pembersihan air | **PARTIAL** | Pendidihan, Penurasan, Pengklorinan, Penyulingan present with correct discriminating properties. **Penulenan absent** — M-02 |
| **5.3.2** | Menyelesaikan masalah mendapatkan bekalan air | **MISSING** | osmosis berbalik / kitar semula air / air dari kabus = **0 in live notes, both languages**. C-01 |
| **5.3.3** | Model & komunikasi sistem pembekalan air | **PARTIAL** | 8-stage sequence, correct order, **functions all correct**; three stage *names* diverge from source — M-01 |
| **5.3.4** | Mewajarkan kelestarian air | **PARTIAL** | General sustainability prose; **Minamata = 0, audit air = 0** across every surface — H-04 |

| Status | Count | Share |
|---|---|---|
| COVERED | 3 / 11 | 27 % |
| PARTIAL | 7 / 11 | 64 % |
| MISSING | 1 / 11 | 9 % |
| INCORRECT | **0 / 11** | **0 %** |

---

## 7. CRITICAL FINDINGS

**C-01 · MISSING · SP 5.3.2 has no representation in the live notes**
- Location: `src/content/form2/science/chapter-5/interactive-bm.ts`, `interactive-dlp.ts` — no section, no block.
- Evidence: DSKP 5.3.2 Catatan requires *kitar semula air*, **mendapatkan air dari kabus**, and *osmosis berbalik*. Textbook Aktiviti 5.8 / 5.10.
- Verified: `osmosis|kitar semula|kabus|newater` → **0 genuine hits** in both live files. (One BM hit was the substring *"berkabus"* = cloudy, in the suspension tab — a false positive, not fog harvesting.)
- Aggravating: `mindmap-bm.ts` **does** carry NEWater and *osmosis berbalik*, and `quizzes-bm.ts` **q28 tests NEWater**. A student is quizzed on content the notes never present.
- Severity: an entire Standard Pembelajaran, examinable, with a live quiz item pointing at it.

**C-02 · MISSING · both DSKP-mandatory experiments lack experiment structure**
- Location: `interactive-bm.ts` / `-dlp.ts`, sections 5.1 and 5.2.
- Evidence: **DSKP Jadual 9 (printed p. 33)** — the authoritative list of mandatory experiments — names exactly two for this chapter: **5.1.2** (penyejatan) and **5.2.2** (kadar keterlarutan). Both SPs open with *"Menjalankan eksperimen"*.
- Verified: `hipotesis` / `pemboleh ubah` / `hypothesis` / `variable` = **0 occurrences in the live notes and 0 in the dead notes**, both languages. The factors are delivered as flip cards — correct content, but as facts to memorise rather than as an investigation.
- Severity: the two experiments the syllabus makes compulsory are the two the notes do not stage. Manipulated/responding/fixed variables are directly examinable.

**C-03 · STRUCTURE · 11 SPs in 3 sections, with zero instructional visuals**
- Location: both live interactive files; confirmed at runtime.
- Evidence: 3 sections, section bodies ~2,400–3,000 characters each; `figures: 0, svg: 0` measured in every section in both languages.
- Comparison: this is the **same shape Chapter 4 had before remediation** (2 sections, 0 visuals) and which was restructured to 11 sections with 3 purpose-built diagrams.
- Why it matters here specifically: Ch5's hardest ideas are **spatial and sequential** — cohesion vs adhesion in a xylem tube, the light-path test that separates solution from suspension, the 2:1 electrolysis ratio, and an 8-stage treatment plant. All four are currently text-only. Textbook Rajah 5.1, 5.2, 5.15 and 5.24 exist precisely because these do not survive as prose.

---

## 8. HIGH FINDINGS

**H-01 · PARTIAL · solubility-as-a-quantity is never taught, but is tested at Hard**
- Location: notes (absent) vs `quizzes-bm.ts` / `quizzes-dlp.ts` **q23**.
- Detail: full analysis in §4. The notes teach rate only; q23 requires knowing that heating a saturated solution lets more solute dissolve.
- **Do not weaken q23** — it is correct and well-constructed. The gap is on the notes side.
- This is the true residue of the chapter's highest-risk concept: not a wrong statement, but a missing half.

**H-02 · MISSING · *keterlarutan* is never defined in the notes**
- Location: `interactive-bm.ts`, `interactive-dlp.ts`.
- Evidence: SP 5.2.1 explicitly requires *"maksud larutan, **keterlarutan**"*. Textbook p. 109 gives the definition verbatim.
- Verified: `kuantiti maksimum` / `maximum quantity|amount` and `100 ml` → **0 occurrences in both live files**.
- **Important qualification, verified:** the definition **is** present and **correct** on the flashcard surface — `flashcards-bm.ts` **f18** (*"Jumlah maksimum zat terlarut yang boleh larut dalam 100 ml pelarut pada suhu tertentu"*) and `flashcards-dlp.ts` **f18**. So the product is not silent on it; the **notes** are. Severity is HIGH rather than CRITICAL for exactly this reason.
- Interaction with H-01: because the notes define *kadar keterlarutan* but never *keterlarutan*, the learner meets the compound term before the root term.

**H-03 · MISSING · ether absent from the non-aqueous solvent list**
- Location: `interactive-bm.ts`, `interactive-dlp.ts`, section 5.2.
- Evidence: DSKP 5.2.5 Catatan names **five** — Alkohol, Kerosin, Aseton, Turpentin, **Eter**. The live notes carry four; ether is the omission in both languages.
- Verification note: an initial `eter\b` grep reported a BM hit. On inspection this was the tail of *"meter"*. Re-verified with context: **ether is genuinely absent from both streams.**
- `mindmap-bm.ts` does list it — mind-map presence does not earn coverage.

**H-04 · PARTIAL · SP 5.3.4 is missing both of its named DSKP anchors**
- Location: `interactive-bm.ts`, `interactive-dlp.ts`, section 5.3.
- Evidence: DSKP 5.3.4 Catatan names the **Minamata** mercury-poisoning case and a domestic **water audit** project. Textbook carries both.
- Verified: `Minamata` = **0** and `audit air` / `water audit` = **0** across **every** Chapter 5 surface — notes, quizzes, flashcards, mind maps, live and dead.
- The chapter carries generic conservation prose instead. The two concrete, examinable anchors are absent.

---

## 9. MEDIUM FINDINGS

**M-01 · BM ONLY · three water-treatment stage names diverge from the source**
- Location: `interactive-bm.ts`, section 5.3 sequence.

| AcadeMY BM | DSKP 5.3.3 / Textbook Rajah 5.24 | AcadeMY DLP |
|---|---|---|
| Penurasan (kasar) | **Penapisan** | Filtration (coarse) |
| Oksidasi | **Pengoksidaan** | Oxidation |
| **Kogulasi** | **Penggumpalan** | Coagulation ✓ |
| Pemendapan | **Pengenapan** | Sedimentation ✓ |
| kapur terhidrat | **kapur mati** | slaked lime ✓ |

- Verified: `penapisan`, `penggumpalan`, `pengenapan` → **0 occurrences across all Chapter 5 surfaces**.
- *"Kogulasi"* is not standard BM scientific register; it reads as an unlocalised borrowing of *coagulation*.
- **The DLP stream is closer to source than the BM stream** on this block — *Coagulation*, *Sedimentation*, and *slaked lime* are all correct. The defect is BM-specific.
- **All stage functions are scientifically correct** and match Rajah 5.24 (alum clumps mud; lime reduces acidity; sand filter; chlorine kills microbes; sodium fluoride prevents tooth decay). The sequence order is correct. Only the names diverge — but they are the names that appear in exam questions such as Masteri KBAT 5 Q6, which is pure stage sequencing by name.
- Not upgraded to HIGH because the science is right and the DLP stream is clean.

**M-02 · MISSING · *Penulenan* absent from the purification methods**
- Location: both live files, section 5.3.
- Evidence: DSKP 5.3.1 Catatan lists 5 methods; textbook Rajah 5.22 shows 4. The DSKP list binds. AcadeMY carries the textbook's 4.
- The four present are correct, with the right discriminating properties (only distillation removes both microbes and dissolved solids).

**M-03 · HUMAN REVIEW · DLP renders *kadar keterlarutan* as "rate of solubility"**
- Location: `interactive-dlp.ts` (section title *"Solution and Rate of Solubility"*, 12 in-body uses), `flashcards-dlp.ts`, `quizzes-dlp.ts`.
- Issue: in English, solubility is a **quantity**, so it has no rate; the standard rendering is *rate of dissolving* / *rate of dissolution*. *"Rate of solubility"* is a literal calque of *kadar keterlarutan*.
- **Mitigating and important:** the usage is **internally consistent and conceptually correct** — DLP never claims bare solubility increases with stirring or particle size. The concept survives; only the English phrase is non-standard.
- **Why this is HUMAN REVIEW and not a defect call:** the DLP textbook was not supplied (§21). Official KSSM DLP materials may well print *"rate of solubility"*, in which case AcadeMY is exam-aligned and must not be "corrected". **Do not change this string without the DLP source in hand.**

**M-04 · BM ONLY · typo *"kekeasidan"***
- Location: `interactive-bm.ts`, coagulation stage — *"mengurangkan **kekeasidan** air"*. Correct form: **keasidan**. DLP reads *"reduces the acidity"*, correct.

---

## 10. LOW FINDINGS

**L-01 · `mendidih` / `Pendidihan` casing and form vary within the BM section** (4 × `mendidih`, 3 × `Pendidihan`, 1 × `pendidihan`) where the source consistently uses the noun *Pendidihan* in the method list. Cosmetic.

**L-02 · Quiz q22 (electrolysis) tests a detail the notes do not carry.** The item — dilute hydrochloric acid added to raise ion concentration so current flows — is **scientifically correct** and stays. The live notes cover electrolysis and the correct 2:1 hydrogen:oxygen ratio, but not the conductivity aid. Lower severity than C-01/H-01 because it is a supporting detail, not an SP.

**L-03 · The `pelarut universal` / `pelarut semesta` divergence is never exposed to learners.** AcadeMY uses the textbook's *pelarut semesta* throughout. Recorded as verified-clean, not as a defect.

---

## 11. NOTES / UX AUDIT (learner comprehension)

- **Section granularity is the dominant UX problem.** Three sections for 11 SPs means each stepper page is a long text wall (~2,400–3,000 characters). There is no checkpoint between *sifat fizik air* and *tindakan kapilari*, or between *koloid* and *pelarut organik*.
- **Reading order is sound.** Within each section the progression follows the textbook and is pedagogically coherent.
- **Prose quality is good** — explanatory rather than list-dumping, and the cohesion/adhesion passage in particular is clearer than the textbook's own.
- **The stepper, Back/Next, and Mark-as-Read behave correctly** in both languages.
- No section exposes SP codes, DSKP references, or page numbers (§17).

---

## 12. VISUAL / INTERACTION AUDIT

**Visuals: none.** `figures: 0, svg: 0` measured in all 3 sections in both languages. See C-03.

**Interactions — all live and functioning.** 7 flip cards + 3 tabs + 1 sequence + quick-quiz checks.

A first automated pass flagged **7 flip cards as "dead controls"**. **This was a probe artefact, not a defect** — flip cards render both faces into the DOM and flip via CSS transform, so `innerText` does not change on click. Re-verified against actual state: `aria-pressed` toggles `false → true` and the inner transform changes `none → matrix(1,0,0,1,0,0)`. **All controls work.** No dead-label defect of the kind found in Chapter 3 exists here.

- The three tabs (Larutan / Ampaian / Koloid) are **meaningfully distinct** — each carries its own discriminating properties, and the colloid tab correctly states both source features.
- The 8-step sequence renders in the correct order.
- Mobile (375 px): sections reflow correctly; no horizontal overflow; tab row wraps.

---

## 13. QUIZ AUDIT

30 items per language, 60 total.

- **Answer-key integrity: clean.** Every `answerIndex` is within range for its `options` array in both files.
- **Scientific correctness: clean.** No item was found with a wrong key or a scientifically indefensible distractor.
- **q23 (Hard) is the strongest item in the chapter** — it is the only place the solubility-vs-rate distinction is tested properly, and it is correct. **Protect it.**
- **Distractors are plausible and non-giveaway**; the KBAT items (q23, q24, q29) require reasoning rather than recall.
- **Two items outrun the notes:** q28 (NEWater → C-01) and q22 (electrolysis conductivity → L-02). Per the user's instruction, **neither is to be weakened**; both are correct.
- **SP balance skews to 5.1 and 5.2.** SP 5.3.2 has one item (q28) against notes that carry nothing; SP 5.1.2 and 5.2.2 have no items testing experimental design, consistent with C-02.

---

## 14. FLASHCARD AUDIT

60 per language, 120 total. IDs sequential and unique; BM/DLP one-to-one.

- **Semantic parity: clean.** Spot-checked across the full range; f18–f20 and f30–f32 verified verbatim in both languages.
- **f18 carries the SP 5.2.1 definition of solubility correctly** — the textbook p. 109 wording in substance, in both languages. This is the finding that keeps H-02 at HIGH rather than CRITICAL.
- **f30–f32 are correctly framed as rate** (§4).
- **Gap mirrors the notes:** no card covers SP 5.3.2, Minamata, water audit, or ether.

---

## 15. MIND-MAP AUDIT

- BM and DLP mind maps are structurally parallel.
- **The mind maps are ahead of the notes** — `mindmap-bm.ts` carries **NEWater**, **osmosis berbalik**, and **eter**, all of which the live notes lack (C-01, H-03).
- Per the audit rule, mind-map presence is **not** credited as learner coverage. It is recorded because it shows the content was already researched and is available for a future remediation to draw on.

---

## 16. BM / DLP PARITY

- **Block shape is identical** — same section count, same block types in the same order, same interaction counts. Verified at runtime.
- **Content parity is high**, with these asymmetries, all documented above:
  - M-01 — DLP stage names are **closer to source** than BM (*Coagulation*, *Sedimentation*, *slaked lime*).
  - M-04 — the *kekeasidan* typo is BM-only.
  - M-03 — *"rate of solubility"* is a DLP-only phrasing question, pending the DLP source.
- **No case was found where the two languages teach different science.**

---

## 17. LEARNER-FACING SOURCE LEAKAGE

**Clean — 0 occurrences.** No SP codes, DSKP references, *Jadual* numbers, textbook page numbers, *Eksperimen 5.x* / *Aktiviti 5.x* labels, or NotebookLM artefacts appear in any live Chapter 5 surface, in either language.

**Gap in enforcement, not in content:** `src/content/form2/science/learner-facing-leakage.test.ts` currently covers Chapters 1–4 only. **Chapter 5 is clean but unguarded** — nothing prevents a future edit from reintroducing leakage. Recorded in §23.

---

## 18. TESTS / RUNTIME

| Check | Result |
|---|---|
| `tsc` typecheck | **PASS** |
| `npm run build` | **PASS** — full Cloudflare Pages worker build completed |
| Science + notes suites | **PASS** — 9 files, 102 tests |
| Full `vitest run` | 1453 passed, **7 failed** |
| Chapter 5-attributable failures | **0** |

The 7 failures are the **known pre-existing set**, unrelated to Chapter 5 and previously proven pre-existing on a clean tree: 4 × BM mind-map registration, Math F2 C1 `quizzes-dlp`, `billing-core`, `invoice-pdf.server`.

**No Chapter 5 test file exists.** Unlike Chapter 4 (`chapter-4-remediation.test.tsx`, 19 tests), Chapter 5 has no regression guard of any kind.

`npm run lint` fails repo-wide on CRLF-vs-LF and is not a Chapter 5 signal.

---

## 19. WHAT CHAPTER 5 GETS RIGHT

Recorded deliberately, because a remediation pass must not regress any of it:

1. **Solubility vs rate of dissolving — correct on every surface, both languages** (§4). This is the chapter's headline result.
2. **Cohesion and adhesion are correctly assigned** — *daya lekitan* between like molecules, *daya lekatan* to the xylem wall. Not reversed, which is the classic error.
3. **Electrolysis is correct** — oxygen at the anode, hydrogen at the cathode, hydrogen twice the volume, H:O = 2:1.
4. **Impurities are correct** — salt lowers the melting point and raises the boiling point.
5. **Colloid carries both source features** from p. 111 — not clear, no precipitate, intermediate.
6. **Dilute / concentrated / saturated are correctly distinguished.**
7. **All water-treatment stage functions and the stage order are correct.**
8. **Every quiz answer key is correct and in range.**
9. **Zero source leakage.**
10. **No dead interactive controls.**

---

## 20. SEVERITY MODEL

| Severity | Definition | Count |
|---|---|---|
| CRITICAL | An SP with no learner-facing representation, a mandatory experiment unstaged, or a structural defect that blocks comprehension chapter-wide | 3 |
| HIGH | A required definition or named DSKP anchor missing, or a notes/assessment mismatch that disadvantages a student who studied | 4 |
| MEDIUM | Terminology divergence from source, a single missing list item, or a phrasing issue pending source confirmation | 4 |
| LOW | Cosmetic, or a supporting detail tested but not taught | 3 |
| **INCORRECT science** | **A learner-facing statement that is factually wrong** | **0** |

---

## 21. LIMITATIONS

1. **The DLP/English textbook was not supplied.** All English strings were validated by translation equivalence against the BM textbook. **M-03 cannot be resolved without it** and must not be actioned blind.
2. **`Errata.pdf` is self-disclaimed** as an unofficial compilation. Its "no Ch5 corrections" status was cross-checked against its own page list and is consistent, but no Ch5 item can be described as *errata-verified*.
3. **Dead-notes content was read but never credited.** If the shadowing at `notes.tsx:2033` were ever reversed, several findings here would change status.
4. **Quiz distractor quality was spot-checked, not exhaustively modelled** — all 60 keys were verified, but not every distractor was traced to a specific misconception.
5. **No claim of 100 % verification is made.** All 11 SPs are explicitly mapped in §6; the three gaps above remain open.

---

## 22. RECOMMENDED REMEDIATION PRIORITY

Proposals only. **Nothing in this section has been implemented.**

| # | Finding | Action | Priority |
|---|---|---|---|
| 1 | C-01 | Add an SP 5.3.2 section — reverse osmosis, water recycling/NEWater, fog harvesting. Mind map and q28 already carry the material | **P0** |
| 2 | C-02 | Stage both Jadual 9 experiments with hypothesis and manipulated/responding/fixed variables | **P0** |
| 3 | H-01 + H-02 | Define *keterlarutan* (p. 109 wording, already correct in flashcard f18) **and** teach that solubility rises with temperature — closing both halves at once, and landing q23 | **P0** |
| 4 | C-03 | Restructure 3 → 9–12 sections | **P1** |
| 5 | C-03 | Add 3–4 diagrams: cohesion/adhesion in xylem, the light-path solution-vs-suspension test, electrolysis 2:1, the 8-stage plant | **P1** |
| 6 | H-03, H-04, M-02 | Add ether; add Minamata and the water audit; add *penulenan* | **P1** |
| 7 | M-01, M-04 | Align BM stage names to *Penapisan / Pengoksidaan / Penggumpalan / Pengenapan / kapur mati*; fix *kekeasidan* | **P2** |
| 8 | §17 | Extend `learner-facing-leakage.test.ts` to Chapter 5 | **P2** |
| 9 | §18 | Add `chapter-5-remediation.test.tsx` | **P2** |
| 10 | M-03 | **Hold** pending the DLP textbook | **BLOCKED** |

**Constraints for whoever implements this:**
- **Do not weaken q22, q23, or q28.** All three are correct; the notes are the deficient side.
- **Do not regress §19**, especially the rate framing in §4.
- **Do not revive the dead notes in parallel**, and do not delete them.

---

## 23. CHAPTER 5 VERDICT

```
CHAPTER 5 VERDICT: FAIL — HUMAN REVIEW REQUIRED

CRITICAL: 3   (C-01 SP 5.3.2 absent; C-02 both mandatory experiments unstaged;
               C-03 11 SPs in 3 sections, zero visuals)
HIGH:     4   (H-01 solubility-as-quantity untaught but tested; H-02 keterlarutan
               undefined in notes; H-03 ether missing; H-04 Minamata + water audit missing)
MEDIUM:   4   (M-01 BM stage names; M-02 penulenan missing;
               M-03 "rate of solubility" — DLP source required; M-04 kekeasidan typo)
LOW:      3   (L-01 casing; L-02 q22 detail untaught; L-03 recorded clean)

SP COVERAGE:
  COVERED:      3 / 11   (5.1.1, 5.2.3, 5.2.4)
  PARTIAL:      7 / 11   (5.1.2, 5.2.1, 5.2.2, 5.2.5, 5.3.1, 5.3.3, 5.3.4)
  MISSING:      1 / 11   (5.3.2)
  INCORRECT:    0 / 11
  NOT_RENDERED: 0 / 11   (notes-bm.ts / notes-dlp.ts are dead but never credited)
  CONFUSING:    0 / 11

HIGHEST-RISK ITEM (solubility vs rate of dissolving): AcadeMY CORRECT — NotebookLM WRONG
NOTEBOOKLM ERRORS FOUND: 3   (NL-01 solubility conflation; NL-02 "page 183" hallucination;
                              NL-03 purification method count)

ACADEMY CONTENT MODIFIED: NO
AUDIT ONLY: YES
```

**HUMAN REVIEW REQUIRED specifically for:**
1. **M-03** — the DLP *"rate of solubility"* phrasing. Requires the DLP textbook. A curriculum-authority decision, not an engineering one.
2. **Errata provenance** — `Errata.pdf` is self-disclaimed as unofficial.
3. **The §21.1 DLP source gap**, which leaves every English string validated only by translation equivalence.

## Action taken

**None.** This audit modified no project file. No fixes were implemented, no content was rewritten, no quiz, flashcard, mind map, image, or component was changed. Every "Action" in §22 is a proposal for a future, separately approved change.
