# FINAL RELEASE GATE — Sains / Science Tingkatan 2, Bab 6: Asid dan Alkali (BM + DLP)

**Mode:** READ-ONLY post-remediation verification. No file was modified, created, or deleted. Working tree unchanged apart from this report; Chapter 6 dead notes show **0 modifications**.
**Date:** 2026-08-27
**Method:** The changelog was read but **not trusted**. Every claim was re-verified by mounting the real components from the Vite dev ESM graph and reading the actual rendered learner output — **39,779 characters across both languages** — then checking that output against the PDFs. Where a claim concerned a drawing, the SVG geometry and fill attributes were read directly rather than inferred from the code.

---

## 1. VERDICT

# PASS — FREEZE CHAPTER

The former CRITICAL is genuinely fixed, all three HIGH findings are closed, and every MEDIUM is resolved. All 6 SPs are now genuinely taught and rendered, with no incorrect science in either language. Two LOW items remain; neither blocks release.

---

## 2. LIVE PRODUCTION PATH — TRACED, NOT ASSUMED

| Layer | Exact artefact |
|---|---|
| Registry | `src/content/registry.ts:3504` (`science-f2-c6-bm`), `:3518` (`science-f2-c6-dlp`) |
| Live notes data | `chapter-6/interactive-bm.ts` (28.4 KB) / `interactive-dlp.ts` (27.1 KB) |
| Route branch | `src/routes/notes.tsx:2044` → `ScienceF2Chapter6NotesBlock` |
| Component | `ScienceF2Chapter6NotesBlock.tsx` → re-export of `ScienceF2InteractiveNotesBlock.tsx` |
| Lang prop | `lang={scienceLang === "dlp" ? "en" : "bm"}` — the English stream receives **`"en"`** |

**Branch precedence verified.** `activeChapter?.sciF2InteractiveData` (notes.tsx:**1999**) is evaluated before the `activeChapter?.notes` fallback (notes.tsx:**2141**), so the interactive branch always wins.

**Dead legacy notes:** `notes-bm.ts` (12,655 B) and `notes-dlp.ts` (12,380 B) remain registered at `registry.ts:3512` / `:3523` but **unreachable**. Git shows **0 modifications** — preserved, not deleted, **not rendered in parallel**. They still carry 8 `Aktiviti 6.x` references between them, correctly left alone because they are not learner-facing. Nothing in this report credits them as coverage.

**Runtime confirmation** — both languages, all sections walked, every control exercised:

```
BM  (lang="bm") : 9 sections — Asid dan Alkali · Peranan Air · Sifat Asid dan Alkali ·
                  Penunjuk dan Cara Mengukur pH · Skala pH · Kekuatan Asid dan Alkali ·
                  Kegunaan Asid dan Alkali · Peneutralan dan Pentitratan ·
                  Peneutralan dalam Kehidupan Harian
DLP (lang="en") : 9 sections — matching titles in the same order
Total rendered learner text: 39,779 characters (both languages)
```

**No authored content is silently dropped.** Every block declared in the two data files was found rendered: 2 `dryVsAqueous` panels sets, 2 `conceptContrast`, 2 `indicatorTable`, 2 `methodCards`, 2 `phSlider`, 2 `strengthComparison`, 2 `titrationSchematic`, plus all cards and accordions.

---

## 3. SP COVERAGE MATRIX — all 6

Judged on rendered output. COVERED requires the concept to be scientifically correct **and** actually rendered **and** intelligible at Form 2 level.

| SP | Requirement | Live location | Status | Evidence |
|---|---|---|---|---|
| **6.1.1** | Definisi operasi asid & alkali | Sections 1–3 | **COVERED** | Water requirement rendered as a four-panel schematic with litmus fills verified at pixel level; `ConceptContrast` carries pH, taste, corrosiveness, litmus and the metals contrast; hydrogen-gas test card present |
| **6.1.2** | Bahan berasid/beralkali, 5 tools | Section 4 | **COVERED** | Indicator table — **all 15 cells match Jadual 6.3 in both languages**; `methodCards` ids are exactly `litmus / universal / ph-meter`; `kertas pH` and `Meter pH` both render |
| **6.1.3** | Kekuatan from pH | Sections 5 + 6 | **COVERED** | Slider is pure position language at all 15 points; strength taught separately with the equal-concentration banner rendered first. Was **INCORRECT** |
| **6.1.4** | Kegunaan incl. pertanian & industri | Section 7 | **COVERED** | Three cards with explained functions, every example traced to source (§10). Was PARTIAL |
| **6.2.1** | Proses peneutralan | Section 8 | **COVERED** | `Asid + Alkali → Garam + Air` verbatim; all three source salt pairs; titration schematic with 5 working labels |
| **6.2.2** | Aplikasi peneutralan | Section 9 | **COVERED** | 6 accordions including **fabric softener**; DSKP's full four-item list now complete. Was PARTIAL |

| Status | Before | After |
|---|---|---|
| **COVERED** | 2 / 6 | **6 / 6** |
| PARTIAL | 3 / 6 | **0** |
| **INCORRECT** | **1 / 6** | **0** |
| MISSING | 0 | **0** |
| NOT_RENDERED | 0 | **0** |
| CONFUSING | 0 | **0** |

---

## 4. FORMER CRITICAL — pH vs STRENGTH — **PASS**

This was the single most important check. Verified against the rendered data, not the source file.

**(a) The slider no longer assigns strength identity to any substance.** All 15 points read as position:

```
0  Asid bateri              Sangat berasid — amat mengakis.
1  Asid gastrik             Sangat berasid — cukup untuk mencerna makanan.
2  Cuka / jus limau         Berasid — rasa masam yang anda kenali.       <- was "Asid kuat"
3  Jus oren                 Berasid.
4  Jus nanas / tomato       Sedikit berasid.
5  Kopi hitam               Sedikit berasid.
6  Susu                     Hampir neutral, sedikit berasid.
7  Air tulen                Neutral sepenuhnya.
8  Air laut                 Hampir neutral, sedikit beralkali.
9  Soda penaik              Sedikit beralkali.
10 Antasid / susu magnesia  Beralkali.
11 Larutan ammonia          Beralkali.                                    <- was "Alkali kuat"
12 Air sabun                Beralkali.
13 Peluntur (bleach)        Sangat beralkali.
14 Pencuci saluran paip     Sangat beralkali — amat mengakis.
```

Pattern scan across the whole slider in both languages: `asid kuat` / `strong acid` / `alkali kuat` / `strong alkali` → **0 occurrences**.

**(b) Strength is taught separately and correctly.** Section 6 renders, in this order:

> **SYARAT PERBANDINGAN** — Semua larutan di bawah dibandingkan pada kepekatan yang sama. Tanpa syarat ini, perbezaan nilai pH mungkin datang daripada kepekatan, bukan daripada kekuatan bahan itu sendiri.
>
> **ASID** — Asid hidroklorik **KUAT** pH ~1 · Asid etanoik **LEMAH** pH ~3
> **ALKALI** — Larutan natrium hidroksida **KUAT** pH ~13 · Larutan ammonia **LEMAH** pH ~11
>
> Kekuatan ialah sifat bahan itu sendiri, bukan berapa banyak air yang ditambah. Cuka mengandungi asid etanoik — satu asid lemah — walaupun rasanya masam dan nilai pHnya rendah.

This matches textbook Aktiviti 6.3 exactly, including its own equal-concentration note, and delivers the answers its Soalan 2 expects. **The equal-concentration condition is visible, first, and in its own banner** — not buried in prose.

**(c) No new misconception was created.** The specific risk — *"low pH automatically means the substance is chemically a strong acid regardless of concentration"* — is explicitly defeated:

- Section 5 says *"Semakin rendah nilai pH, semakin **berasid** larutan itu"* — a claim about acidity (position), not identity.
- Section 6 opens *"Nilai pH memberitahu sejauh mana sesuatu larutan itu berasid — **tetapi** untuk membandingkan kekuatan bahan itu sendiri, kita perlu membandingkannya secara adil, iaitu pada kepekatan yang sama."*
- Quiz **q32 (Hard)** asks directly why the condition matters, keyed to *"tanpa syarat itu, perbezaan nilai pH mungkin datang daripada kepekatan dan bukan daripada kekuatan asid"*.

**On the changelog's own flagged risk (does section 5 → 6 read naturally?):** read in sequence as a learner would, yes. Section 6's first sentence explicitly names what section 5 established and states why it is insufficient. The two sections are a set-up and a correction, not a contradiction.

**Deliberately-posed misconceptions verified as such.** The chapter now asks *"Cuka berasa sangat masam. Adakah ini bermakna cuka mengandungi asid kuat?"* and carries a true/false item *"Cuka berasa masam, jadi cuka mengandungi asid kuat"* keyed **false**. Both are refutations with the correct answer attached ("Tidak. Cuka mengandungi asid etanoik, iaitu asid lemah"), not assertions. A scan restricted to *asserted prose* — intros, cards, accordions, tabs, slider descriptions, strength-block text, excluding question stems and answers — returns **0 banned hits** in both languages.

---

## 5. ACTIVITY-NUMBER LEAKAGE — **PASS**

| Surface | Before | Now |
|---|---|---|
| interactive-bm / -dlp | 0 | **0** |
| quizzes-bm / -dlp | 6 + 6 | **0** |
| flashcards-bm / -dlp | 7 + 7 | **0** |
| mindmap-bm / -dlp | 2 + 2 | **0** |
| **Total live** | **30** | **0** |

Also scanned on the rendered output (39,779 chars): `Aktiviti \d\.\d` and `Activity \d\.\d` → **0**.

**q20 and q27 inspected specifically — neither was weakened.**

| Item | Now reads | Key |
|---|---|---|
| **q20** BM | *"Dalam pentitratan asid-alkali menggunakan fenolftalein, bagaimanakah takat akhir dikenal pasti?"* | "Larutan bertukar daripada merah jambu kepada tidak berwarna" ✓ |
| **q20** DLP | *"In an acid-alkali titration using phenolphthalein, how is the end point identified?"* | "The solution changes from pink to colourless" ✓ |
| **q27** BM | *"Dalam satu pentitratan asid-alkali menggunakan fenolftalein, larutan dalam kelalang kon kekal…"* | "Jumlah asid yang ditambah masih belum cukup untuk meneutralkan kesemua alkali…" ✓ |
| **q27** DLP | *"In an acid-alkali titration using phenolphthalein, the solution in the conical flask remains…"* | "The amount of acid added is still insufficient to neutralise all the alkali…" ✓ |

Both are now self-contained — a learner needs no textbook to answer them — and the assessed concept, option set and answer index are unchanged.

---

## 6. FABRIC SOFTENER — **PASS**

Rendered in section 9 of the **notes** (not merely flashcards or mind map):

> **🧺 Pelembut fabrik** — Serbuk pencuci menjadikan fabrik beralkali selepas dibasuh. Pelembut fabrik bersifat asid, jadi ia menurunkan nilai pH fabrik dengan meneutralkan baki beralkali itu — menjadikan fabrik lembut.

Both required elements present and verified in rendered text: detergent leaves fabric alkaline ✓, acidic softener reduces the pH by neutralising the alkaline residue ✓. Matches textbook printed p. 135.

**q22 now has a proper learning home.** The item is unchanged (still Hard, still keyed *"Untuk meneutralkan fabrik yang menjadi beralkali selepas dibasuh dengan detergen"*), and the notes now teach exactly what it assesses. DSKP 6.2.2's full list — ubat gigi, pelembut fabrik dan perapi rambut, mengawal pH tanah, meneutralkan bahan buangan industri — is complete, with the textbook's face-care example retained as a sixth.

---

## 7. JELLYFISH QUESTION — **PASS**

Rendered answer, verbatim:

> **BM:** *"Sabun dan ubat gigi bersifat alkali. Dalam model yang digunakan di sini, sengatan ubur-ubur juga dianggap beralkali — jadi menambah lagi bahan beralkali tidak meneutralkannya dan menyebabkan kesakitan bertambah. Bahan berasid seperti cuka digunakan untuk meneutralkan keadaan itu. (Nota: rawatan sengatan sebenar bergantung pada spesies — ikut panduan pertolongan cemas semasa.)"*

Checked against the gate's four requirements:

| Requirement | Verdict |
|---|---|
| Soap and toothpaste are alkaline | ✓ stated first |
| Adding alkali does not neutralise the sting in the question's model | ✓ stated explicitly |
| Pain worsens | ✓ stated |
| Acidic substance such as vinegar is the expected answer | ✓ stated |
| Caveat comes **after** the curriculum answer | ✓ — parenthetical, last sentence |
| Caveat does not undermine the exam answer | ✓ — it scopes real-world treatment by species; it does not question the model |

The question now also asks part (b) of the source question (*"apakah yang sepatutnya dilakukan?"*). **`tebuan` / `wasp` = 0 occurrences** across every live surface — NotebookLM's fabricated example was never introduced. No unsupported generalisation about all stings appears.

---

## 8. INDICATOR + pH TOOL COVERAGE — **PASS**

**All 15 cells verified against textbook Jadual 6.3, in both languages, read from the rendered table.**

| Indicator | Acid | Neutral | Alkali | Source match |
|---|---|---|---|---|
| Fenolftalein / Phenolphthalein | Tidak berwarna / Colourless | Tidak berwarna / Colourless | Merah jambu / Pink | ✓ |
| Penunjuk semesta / Universal indicator | Merah / Red | Hijau / Green | Biru / Blue | ✓ |
| Metil jingga / Methyl orange | Merah / Red | **Kuning / Yellow** | **Kuning / Yellow** | ✓ |
| Kertas litmus biru / Blue litmus | Merah / Red | Biru / Blue | Biru / Blue | ✓ |
| Kertas litmus merah / Red litmus | Merah / Red | Merah / Red | Biru / Blue | ✓ |

**Zero wrong colours.** Methyl orange correctly gives the same colour in neutral and alkali — the cell most often got wrong. Table header reads **PENUNJUK** (source term).

Every row's explanation panel correctly names its own row — no label→panel mismatch. The panels also teach *why* each indicator matters (e.g. phenolphthalein "tidak dapat membezakan asid daripada neutral", which is why it suits titration).

**All seven tools present:** blue litmus ✓, red litmus ✓, universal indicator ✓, methyl orange ✓, phenolphthalein ✓, **pH paper (`kertas pH`)** ✓, **pH meter (`Meter pH`)** ✓. `methodCards` ids are exactly `litmus / universal / ph-meter`, teaching the distinction the gate asks for: litmus → acid or alkali; universal indicator / pH paper → approximate pH; pH meter → numerical reading.

---

## 9. WATER REQUIREMENT — **PASS**

Verified at pixel level: the litmus rectangle's `fill` attribute was read in each panel, so the drawing is confirmed to match the claim rather than merely being captioned.

| Panel | Litmus drawn | Expected | Result text |
|---|---|---|---|
| Asid etanoik glasial (dry) | `#4a7fd4` **blue** | unchanged blue | "Litmus biru tidak berubah warna" ✓ |
| Asid etanoik + air | `#d4544a` **red** | turned red | "Litmus biru menjadi merah" ✓ |
| Pepejal natrium hidroksida (dry) | `#d4544a` **red** | unchanged red | "Litmus merah tidak berubah warna" ✓ |
| Natrium hidroksida + air | `#4a7fd4` **blue** | turned blue | "Litmus merah menjadi biru" ✓ |

**No reversed litmus. No misleading mechanism** — the panels show the water droplet and a fuller beaker for the aqueous cases, and assert no mechanism beyond the source's own claim. Core message renders under the grid: *"Asid dan alkali hanya menunjukkan sifatnya dengan kehadiran air."* All four click explanations verified correct and distinct.

---

## 10. ACID vs ALKALI PROPERTIES — **PASS**, and SP 6.1.4 — **PASS**

**Properties.** `ConceptContrast` renders acid (pH < 7, berasa masam, mengakis, litmus biru → merah, bertindak balas dengan logam → hidrogen) against alkali (pH > 7, berasa pahit, mengakis, litmus merah → biru, tidak bertindak balas dengan logam). All five pairs match Jadual 6.2. The hydrogen-gas 'pop' test is carried in a companion card.

**Safety wording verified — it does not encourage tasting.** The key point renders as:

> ⚠️ Rasa masam dan rasa pahit ialah huraian sifat sahaja. Jangan sekali-kali merasa bahan kimia di dalam makmal atau bahan yang tidak dikenali.

Taste is taught as a source-supported property while explicitly forbidding the act. Section 1's check-yourself reinforces it (*"anda tidak boleh merasanya, kerana bahan yang tidak dikenali mungkin berbahaya"*).

**Agriculture and industry — traced to source, not merely named.** Every example was checked against the textbook:

| AcadeMY claim | Source |
|---|---|
| "Larutan ammonia digunakan untuk menghasilkan baja" | Gambar foto 6.2, verbatim |
| "Kapur mati yang beralkali… tanah yang terlalu berasid" | printed p. 135 |
| "Keasidan tanah yang meningkat menjejaskan pertumbuhan tanaman" | p. 130 sidebar question |
| "Asid sulfurik… bateri kereta" | Gambar foto 6.3 |
| "Natrium hidroksida… menghasilkan detergen" | Gambar foto 6.3 |
| "Sisa kilang yang berasid dirawat dengan alkali" | Gambar foto 6.5 |
| "Pembakaran bahan api… menurunkan nilai pH air hujan" | Latihan Formatif 6.1 Q3 |

Functions are explained, not just sectors listed. **No example was imported from outside the chapter.** DLP is semantically equivalent.

---

## 11. NEUTRALISATION — **PASS**

`Asid + Alkali → Garam + Air` / `Acid + Alkali → Salt + Water` renders verbatim in both languages.

| Reaction | Salt taught | Source |
|---|---|---|
| Asid hidroklorik + Natrium hidroksida | Natrium klorida ✓ | p. 133 |
| **Asid sulfurik + Kalium hidroksida** | **Kalium sulfat** ✓ | p. 133 |
| Asid nitrik + Natrium hidroksida | Natrium nitrat ✓ | p. 133 |

No reactant/product mix-up; no salt-name regression. The sulphuric-acid pairing correctly follows the textbook (**potassium** hydroxide), not NotebookLM's erroneous sodium pairing. DLP: sodium chloride / potassium sulphate / sodium nitrate — parity confirmed.

---

## 12. TITRATION — **PASS**

Schematic renders burette, acid, conical flask, indicator and end point, each with a working label and a correct explanation. Apparatus matches the source set-up (HCl in burette, NaOH measured by pipette into the conical flask, phenolphthalein, white tile).

**The end-point colour change is demonstrated, not just captioned.** The flask path carries `fill-pink-400/55` while burette / acid / flask / indicator are selected, and flips to `fill-slate-200/35` (colourless) only when "Takat akhir" is selected. Caption: *"Takat akhir: merah jambu → tidak berwarna"* ✓.

**No false mandatory-experiment framing.** Verified across both languages:
- `miniExperiment` blocks → **0**
- `pemboleh ubah dimanipulasikan` / `manipulated variable` → **0**
- `pemboleh ubah bergerak balas` / `responding variable` → **0**

Chapter 6 has zero Jadual 9 experiments (Form 2's list is 3.4.1, 5.1.2, 5.2.2, 7.3.3, 8.2.5), and no Chapter 5-style scaffold was introduced. Correct.

---

## 13. DAILY-LIFE NEUTRALISATION — **PASS**

Six accordions render in section 9, covering the source-required set with correct acid/alkali logic in each:

| Application | Logic | Verdict |
|---|---|---|
| 🦷 Ubat gigi | Bacteria produce acid → alkaline toothpaste neutralises | ✓ |
| 🧺 Pelembut fabrik | Detergent leaves fabric alkaline → acidic softener lowers pH | ✓ |
| 💇 Syampu + perapi rambut | Alkaline shampoo → mildly acidic conditioner neutralises residue | ✓ |
| 🧴 Penjagaan muka | Alkaline cleanser dries skin → acidic toner neutralises | ✓ |
| 🌾 Mengawal pH tanah | Acidic soil → alkaline kapur mati | ✓ |
| 🏭 Sisa industri | Acidic factory waste → treated with alkali before release | ✓ |

No contradictory treatment and no unsupported embellishment was found.

---

## 14. BM TERMINOLOGY — **PASS**

| Term | Live occurrences now |
|---|---|
| `petunjuk sejagat` | **0** |
| `petunjuk` (any form) | **0** across interactive, quizzes, flashcards and mind map |
| `kapur terhidrat` | **0** across all four surfaces |
| `penunjuk semesta` (source term) | present ✓ |
| `kapur mati` (source term) | present ✓ |

Also confirmed on the rendered output: `petunjuk` and `kapur terhidrat` → 0. DSKP's own *penunjuk universal* variant and its *"kertas litmius"* typo are not surfaced to learners; the textbook spelling is used throughout. The DLP stream retains its already-correct "universal indicator" and "slaked lime".

---

## 15. SECTION ARCHITECTURE — **PASS**

Nine sections in a defensible teaching order: identity → why water matters → properties → how to measure → the scale → strength → uses → neutralisation and titration → applications. Every SP has a clear home (§3). No missing section, no duplicate section, no orphaned block.

Back / Next, one-active-section, and progress all verified working across all 9 sections in both languages. No section is a text wall — rendered teaching content rose 4,054 → ~16,800 characters spread across nine sections rather than two.

**Section 5 → 6 transition** — the changelog's own flagged risk — reads naturally; see §4 for the analysis. Neutralisation (8) follows the acid/alkali foundation coherently, arriving only after indicators, the scale and strength are established.

---

## 16. MIND-MAP INTEGRITY — **PASS**

The remediation hit an id collision mid-implementation, so this was inspected semantically, not just by uniqueness test. Both files were diffed against `HEAD`:

| Check | BM | DLP |
|---|---|---|
| Nodes | 96 → **103** | 96 → **103** |
| Duplicate ids | **NONE** | **NONE** |
| Pre-existing ids removed | **none** | **none** |
| Ids added | 7 (`c1-tool-meter`, `c1-strength`, `c1-strength-1…5`) | same 7 |
| Pre-existing labels changed | 9 | 2 |

**Every one of the 11 label changes is an intended edit** — no legitimate node was accidentally renamed or lost:

- **BM (9):** 2 activity de-references (`c1-6`, `c2-3`) + 7 terminology corrections (`petunjuk`→`penunjuk` ×6, `kapur terhidrat`→`kapur mati` ×1).
- **DLP (2):** the same 2 activity de-references.

The earlier collision damage was fully repaired by the revert-and-reapply: **zero duplicate ids, zero lost nodes**. Hierarchy is intact — the pre-existing eleven `c1-*` branches and the `c2-*` neutralisation branch all survive in place, with the new strength branch added as a sibling after the pH-scale branch. No orphan node, no duplicate branch. Activity-number labels are gone. BM/DLP parity holds at 103/103.

**One cosmetic artefact found — see L-01.**

---

## 17. QUIZ AUDIT — **PASS**

| Check | BM | DLP |
|---|---|---|
| Items | **34** | **34** |
| Out-of-range answer indices | **0** | **0** |
| Duplicate option sets | **0** | **0** |
| Duplicate ids | **0** | **0** |
| Activity-number leakage | **0** | **0** |
| Bad BM terminology | **0** | — |
| Difficulty | Easy 10 / Medium 13 / Hard 11 | identical |

> **Note on item count.** This gate's brief specifies "all 30 BM + 30 DLP" and "30/30" parity. The actual banks hold **34 each**: the remediation added four items (q31–q34) covering strong-vs-weak acids and alkalis and the equal-concentration condition — the gap the CRITICAL finding exposed. This is documented in the changelog, is an increase in coverage rather than a change to existing items, and parity is intact at 34/34. Flagged so the discrepancy against the brief is not mistaken for drift.

**q20, q22, q27** — all present, self-contained, keys and option sets unchanged (§5, §6). Strength and equal-concentration are now assessed by q31–q34 in both languages. Fabric softener is assessed by q22 and taught by the notes.

**No correct quiz item now depends on content absent from the notes.** The three gaps identified in the deep audit are all closed: fabric softener (q22) is taught; the titration items (q20, q27) no longer reference an activity that does not exist in AcadeMY; pH-paper-versus-litmus is taught in `methodCards`.

---

## 18. FLASHCARDS + MIND MAP — **PASS**

**Flashcards: 60 / 60**, unchanged in count as the spec required.

- Leakage **0**, `petunjuk` **0**, `kapur terhidrat` **0**, `wasp` **0** in both languages.
- Indicator content intact and correct — e.g. *"Fenolftalein: tidak berwarna. Penunjuk semesta: hijau. Metil jingga: kuning. Litmus biru: biru. Litmus merah: merah."* and *"Asid: tidak berwarna. Neutral: tidak berwarna. Alkali: merah jambu."*
- Fabric softener present; no card asserts vinegar is a strong acid.
- **No contradiction** found between any flashcard and the live notes.

**Mind map** carries the strength branch (equal concentration, ethanoic = weak, ammonia = weak), pH meter, and correct terminology — consistent with, and no longer ahead of, the notes.

> *Audit-method note:* an initial cross-surface check reported the flashcard indicator colours as FAILING. That was a case-sensitivity error in the check string ("Merah jambu" versus the lowercase mid-sentence "merah jambu"). Re-verified: colours are fully intact — 5 occurrences of "merah jambu", 2 of "hijau", 2 of "kuning". Recorded so the false alarm is not mistaken for a finding.

---

## 19. VISUAL / INTERACTION QA — **PASS**

| Visual | Verdict | Evidence |
|---|---|---|
| A. Dry-vs-aqueous schematic | **PASS** | 4 panels, litmus fills verified at pixel level, no reversed litmus, 4 correct explanations |
| B. Indicator colour table | **PASS** | 15/15 cells correct; each cell writes the colour **name** as well as tinting, so meaning never depends on colour alone; row→panel mapping correct |
| C. pH slider | **PASS** | Mechanics unchanged and working (keyboard 7 → 11, label updates); labels now position-only |
| D. Strength comparison | **PASS** | Condition banner first; 4 entries with correct strength/kind; each click yields the right explanation |
| E. Titration schematic | **PASS** | 5 labels correct; flask flips pink → colourless only at the end point |

- **No dead controls.** Runtime sweep of all 9 sections: **18 interactive controls per language, 0 inert** in both.
- **No label mismatch** — every label's panel names its own subject.
- **No wrong colour**, **no misleading arrow** (the schematics use no directional arrows that could mislead), **no duplicated generic diagram** — each of the five visuals is purpose-built for its concept.
- **No giant diagram.** Max rendered SVG width 330 px on desktop, 303 px at 375 px.
- **No decorative imagery added** — the chapter relies on tables, a slider and small schematics, as the spec required.

**Enlarge-on-demand:** these are native SVG/HTML, not raster images, so they carry no lightbox — consistent with Chapters 1–5, where no SVG diagram has one. SVG text is real, selectable text that scales with the viewport. Chapter 6 has no raster `images:` blocks. Recorded as L-02, not a defect.

---

## 20. MOBILE QA — **PASS**

Tested at **430, 390 and 375 px** with true viewport emulation.

| Width | Page overflow | Indicator table | Slider | SVG clipped outside scroll rails | Tap targets < 32 px |
|---|---|---|---|---|---|
| 430 | **0 px** | 440 px in 358 px, `overflow-x: auto` — scrolls | 388 px, inside viewport | **0** | **0** |
| 390 | **0 px** | 440 px in 318 px — scrolls | 348 px, inside viewport | **0** | **0** |
| 375 | **0 px** | 440 px in 303 px — scrolls | 333 px, inside viewport | **0** | **0** |

- The page itself never scrolls horizontally at any width.
- The indicator table scrolls **inside its own container**, with all five rows and their colour words readable.
- The slider remains usable — verified operable at 375 px (value 7 → 11, label updated to *"pH 11 — Larutan ammonia"*).
- No teaching content is clipped. The only elements extending past the viewport are 16 px stepper completion icons inside the shared `overflow-x: auto` rail — the established behaviour across Chapters 1–5, and reachable by scrolling.

---

## 21. LEARNER-FACING SOURCE LEAKAGE — **PASS**

**19 patterns scanned against 39,779 characters of rendered output across both languages. 0 hits.**

Covered: DSKP, Standard Pembelajaran, Standard Kandungan, `Aktiviti 6.x`, `Activity 6.x`, `Rajah n`, `Jadual n`, "according to textbook", "buku teks", audit, binding, mandatory, source-supported, reviewer, remediation, SP codes `6.x.x`, plus `petunjuk`, `kapur terhidrat` and `wasp/tebuan`.

**Observation (not a finding):** the shared shell renders `Semak diri — 6.1` / `6.2`. These are SK-level topic numbers generated by `ScienceF2InteractiveNotesBlock.tsx`, identical across Chapters 1–5, which are release-gated. No SP code is exposed anywhere.

---

## 22. BM / DLP PARITY — **PASS**

| Dimension | BM | DLP | Verdict |
|---|---|---|---|
| Sections | 9 | 9 | **PASS** |
| Section order / `number` sequence | matching | matching | **PASS** |
| Block types per section | identical | identical | **PASS** |
| Interactive controls | 18, 0 inert | 18, 0 inert | **PASS** |
| pH slider points | 15 | 15 | **PASS** |
| Indicator colours | 15/15 correct | 15/15 correct | **PASS** |
| Neutralisation salts | 3 correct | 3 correct | **PASS** |
| Quizzes | 34 | 34 | **PASS** (see §17 note) |
| Flashcards | 60 | 60 | **PASS** |
| Mind-map nodes | 103 | 103 | **PASS** |

Parity is semantic. One single-node label asymmetry is recorded as L-01.

---

## 23. TESTS

| Check | Result |
|---|---|
| `tsc --noEmit` | **PASS** (exit 0) |
| `npm run build` | **PASS** (exit 0, full Cloudflare Pages worker build) |
| Chapter 6 regression suite | **PASS** — 81/81 |
| Leakage suite (Ch1–6) | **PASS** — 48/48 |
| Science F2 suites | **PASS** — 236/236 (5 files) |
| Full `vitest run` | 1653 passed, **8 failed** |
| **Chapter 6-attributable failures** | **0** |

**Pre-existing failures, unrelated to Chapter 6 — reported, not hidden.** All 8 are unchanged from the pre-remediation baseline recorded in the deep audit:

1. `src/lib/billing-core.test.ts` — ToyyibPay sandbox plans
2. `src/lib/invoice-pdf.server.test.ts` — invoice PDF generation
3. `src/routes/-onboarding-ui.test.ts` — Explorer onboarding UI contract
4. `src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts`
5. `src/content/bm/asas-penulisan-form1-mindmap.test.ts`
6. `src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts`
7. `src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts`
8. `src/content/form2/math/chapter-1/quizzes-dlp.test.ts`

None touches Science Form 2 content. `npm run lint` still fails repo-wide on CRLF-vs-LF; pre-existing and not a Chapter 6 signal.

---

## 24. REMAINING NON-BLOCKING ISSUES

**L-01 · LOW · one DLP mind-map node reads redundantly**
`mindmap-dlp.ts` node `c1-6` now reads *"Testing Acid and Alkali Properties: Studying Properties of Acids & Alkalis"*. Replacing "Activity 6.1" left the original trailing clause in place, producing a doubled phrase. The BM equivalent is clean (*"Menguji Sifat Asid dan Alkali"*), so this also breaks label parity for that single node. It is factually correct and readable; it is the only such artefact in either file (checked across all labels ≥ 60 characters). Cosmetic.

**L-02 · LOW · SVG diagrams carry no enlarge affordance**
Consistent with Chapters 1–5, where no SVG diagram has one; enlarge belongs to `AnnotatedImage`, which wraps raster photos, and Chapter 6 has none. No action recommended unless the standard changes chapter-wide.

---

## 25. RELEASE DECISION

```
CHAPTER 6 RELEASE GATE: PASS — FREEZE CHAPTER

CRITICAL: 0
HIGH:     0
MEDIUM:   0
LOW:      2   (L-01 one DLP mind-map node label reads redundantly;
               L-02 no enlarge on SVG diagrams, consistent with Ch1-5)

SP COVERAGE:
  COVERED:      6 / 6
  PARTIAL:      0
  MISSING:      0
  INCORRECT:    0
  NOT_RENDERED: 0
  CONFUSING:    0

pH / STRENGTH DISTINCTION: PASS
ACTIVITY-NUMBER LEAKAGE:   PASS   (30 -> 0 on live surfaces)
INDICATOR COLOURS:         PASS   (15/15 cells, both languages)
WATER-REQUIREMENT VISUAL:  PASS   (litmus fills verified at pixel level)
NEUTRALISATION:            PASS
TITRATION:                 PASS   (no false mandatory-experiment framing)
JELLYFISH MODEL:           PASS
MIND-MAP INTEGRITY:        PASS   (103 nodes, 0 duplicate ids, 0 lost nodes)
VISUAL / INTERACTION QA:   PASS   (18 controls per language, 0 inert)
MOBILE QA:                 PASS   (430 / 390 / 375 px, page overflow 0)
BM/DLP PARITY:             PASS
LEARNER-FACING LEAKAGE:    PASS   (0 hits in 39,779 rendered characters)
TYPECHECK:                 PASS
BUILD:                     PASS
TESTS:                     PASS   (8 pre-existing failures, 0 from Chapter 6)
```

---

## 26. AUDIT LIMITATIONS

1. **The DLP/English textbook was not supplied.** English strings were validated by translation equivalence against the BM textbook.
2. **`Errata.pdf` is self-disclaimed** as a mirrored, non-official record. Chapter 6 has no factual correction; printed p. 129 appears on its broken-QR list, which has no effect on AcadeMY (no textbook QR codes are reproduced).
3. **Screenshots were unavailable** — the Browser pane was not compositing. Visual claims rest on measured DOM geometry and SVG fill attributes, which is stronger evidence for the litmus-colour and end-point claims than a screenshot would be, but is not a substitute for a human eyeballing the layout once before freeze.
4. **Quiz distractor quality was spot-checked, not exhaustively modelled** — all 68 keys were verified in range and correct, but not every distractor was traced to a specific misconception.
5. **This gate's brief specifies 30 quiz items per language; the banks hold 34** (§17). Verified as intentional added coverage, not drift.

---

## Action taken

**None.** This audit modified no project file. No fixes were implemented, no content was rewritten, and no quiz, flashcard, mind map, component or test was changed. `git status` shows only this report added; the Chapter 6 dead notes report **0 modifications**.

# PASS — FREEZE CHAPTER
