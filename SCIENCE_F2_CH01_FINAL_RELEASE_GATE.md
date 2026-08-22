# Sains Tingkatan 2 Bab 1 — Final Post-Remediation Release-Gate Audit

**Date:** 2026-08-22
**Mode:** READ-ONLY. No learner-facing content was modified during this gate.
**Method:** Every former finding was re-verified against the **current code and the source PDFs**. The changelog was read as a historical claim only — nothing was accepted because it said so.

---

## Source Verification

| Authority | File | SHA-256 | Status |
|---|---|---|---|
| 1 | `audit-sources/Science/Form-2/DSKP.pdf` | `d3e0f2b07dcda4842bed60d20c9573590e956c9e5cc5f1d95d0011599a996156` | Unchanged; matches the hash recorded in the Codex audit |
| 2 | `audit-sources/Science/Form-2/Textbook.pdf` | `60fbaa1c0918f4ee6b6ff3cbe760f867009f9038d5db51e3ef098de2d97471b3` | Unchanged |
| 3 | `audit-sources/Science/Form-2/Errata.pdf` | `586bbb9f2514c0fafb51e35b3ed7db8524dcb4d0b430f67baec86f8381ab1b0f` | Unchanged; self-disclaimed mirror, no Bab 1 correction |

**Authoritative facts re-extracted from the PDFs for this gate** (not carried over from earlier reports):

| Fact | Location | Verbatim |
|---|---|---|
| Animal key node 3 | Textbook Rajah 1.6, printed p. 14 | `3. (a) Tidak berbulu pelepah … Singa (b) Berbulu pelepah … Ayam` |
| Amphibian respiration | Textbook printed p. 10 | `anak amfibia bernafas melalui insang` / `amfibia dewasa bernafas menggunakan peparu dan kulit yang lembap` |
| Mammal body covering | Textbook printed p. 11 | `homoioterma` · `badan dilitupi bulu dan rambut` |
| Invertebrate hierarchy | Textbook Rajah 1.1, printed p. 7 | `Invertebrata` → `Berkaki {Tiga pasang kaki, Lebih daripada tiga pasang kaki}` · `Tanpa kaki {Badan bersegmen, Badan tanpa segmen}` |
| Legged-invertebrate traits | Textbook printed p. 8 | `mempunyai badan bersegmen` · `mempunyai kulit keras (rangka luar)` |
| **Official answer key** | Textbook Jawapan, printed p. 279 | `2. (a) ✗ (b) ✓ (c) ✓` — **Q2(c) = BETUL** |

The ✓/✗ glyph mapping was independently validated: Q2(a) (*"Biodiversiti ialah kepelbagaian organisma hidup dan bukan hidup"*) is keyed ✗ and is genuinely false, confirming the reading of Q2(c) as **TRUE**.

---

## Current Production Rendering Path

Re-traced from scratch; unchanged in shape from the pre-remediation trace.

```
src/content/registry.ts:3352-3380
  ├── science-f2-c1-bm   (lang "bm")   notes: scienceF2C1NotesBM   sciF2C1Data: scienceF2C1InteractiveBM
  └── science-f2-c1-dlp  (lang "dlp")  notes: scienceF2C1NotesDLP  sciF2C1Data: scienceF2C1InteractiveDLP

src/routes/notes.tsx:1956  ✅ activeChapter?.sciF2C1Data  → <ScienceF2Chapter1NotesBlock lang={scienceLang==="dlp"?"en":"bm"} />
src/routes/notes.tsx:2109  ⛔ activeChapter?.notes        → final else of the same ternary — STILL UNREACHABLE

grep confirms no other render site for activeChapter.notes (only :2170 / :2211 negation guards in the
non-science-discovery branch).
```

**This is now the intended architecture, not a defect.** The agreed decision was to keep the interactive
block as the single learner experience and port the mandatory content out of the dead notes. The gate
question is therefore not "does `notes-*.ts` render" but "is the mandatory content live" — answered under
C-01 below.

`notes-bm.ts` / `notes-dlp.ts` verified **byte-identical to HEAD** (`git diff --quiet` clean). Not deleted,
not modified, not rendered.

**Component composition (current):** `KeywordGlossary` → `FlipCardGrid` → `IconCardGrid` → human-impact
chains → conservation accordion → in-situ/ex-situ tabs → **species-concept tabs + caution** →
CheckYourself 1.1 → `ClassificationTree`(animal, with `subGroups`) → `ClassificationTree`(plant) →
`DichotomousStarMap` → CheckYourself 1.2 → `SelfReflectionChecklist` → `MiniQuizCard` ×2 → mark-read.

---

## Former Critical Recheck

### C-01 — unreachable structured notes / live coverage
**Status: RESOLVED (as scoped).**

Only one notes experience renders — RUNTIME_CONFIRMED: exactly one `section[data-lang]` mounts, and the
render contains none of the legacy-only markers (`Wajib Hafal`, `Tip Peperiksaan`, `Kesilapan Lazim`,
`Quick Revision`). No duplicate legacy notes appear.

Mandatory content formerly trapped in the dead notes, verified **live** in the current interactive surface:

| Formerly dead-only | Now live | Evidence |
|---|---|---|
| Invertebrate segmentation hierarchy | ✅ | `interactive-*.ts` `subGroups`; rendered by `ClassificationTree.tsx:81` |
| Legged-invertebrate defining traits | ✅ | `subGroups[1].detail` — "badan bersegmen, dan kulit keras (rangka luar)" |
| Human impact on biodiversity | ✅ | `humanImpact[]` — 3 cause→effect chains, rendered at `ScienceF2Chapter1NotesBlock.tsx:333-336` |
| Endemic-species definition | ✅ | `speciesConcepts[0].definition` in a rendered tab |
| Threatened-species treatment | ✅ | `speciesConcepts[1]` + `speciesCaution` |
| Keyword definitions | ✅ | `KeywordGlossary` at `:301` |

Not ported, and correctly so — non-binding or already live elsewhere: quick-revision restatements,
exam-tip/common-mistake blocks, transcribed worked keys (the Star Map is the live equivalent),
`keyExamFacts`, `keyTerms`.

### C-02 — dichotomous key / non-living objects
**Status: RESOLVED.**

| Check | BM | DLP |
|---|---|---|
| `answer` | `true` ✅ | `true` ✅ |
| Matches official key (p. 279 Q2(c) = BETUL) | ✅ | ✅ |
| Explanation correct | ✅ teaches *why* — an either/or method works on anything separable by paired characteristics | ✅ |
| Explanation contradicts stem? | No | No |
| XP follows the **correct** answer | ✅ | ✅ |

XP path verified in code: `MiniQuizCard.answer(value, correct)` → `if (correct) addXp(15, "science")`, where
`correct` is `option === item.answer`. RUNTIME_CONFIRMED: clicking **Betul / True** applies the emerald
(correct) styling in both languages.

### C-03 — amphibian respiration
**Status: RESOLVED.**

Current stem — BM: *"Haiwan manakah yang **ANAKNYA** bernafas melalui insang, tetapi apabila **DEWASA** bernafas menggunakan peparu dan kulit yang lembap?"* · DLP: *"Which animal's **YOUNG** breathe through gills, while the **ADULT** breathes through lungs and moist skin?"*

- Stem now matches textbook p. 10 exactly.
- Options unchanged; `answerIndex: 1` → Katak / Frog.
- **Answer is now unique:** crocodile (lungs at both stages), eagle (lungs), grouper (gills at both stages, no lung phase) all fail the stem; only the frog satisfies it.
- Explanation agrees with the stem instead of refuting it.
- RUNTIME_CONFIRMED: the old phrasing (`insang semasa dewasa` / `gills as an adult`) is absent from the render; selecting Katak/Frog styles as correct.

---

## Former High Recheck

### H-01 — full invertebrate hierarchy live
**Status: RESOLVED.** RUNTIME_CONFIRMED in both languages — 4 nested blocks render, both levels open and readable.

```
Invertebrata
├── Tanpa kaki                    / Without legs
│   ├── Badan tanpa segmen        : Span, Karang laut, Planaria, Siput
│   └── Badan bersegmen           : Cacing tanah, Lintah, Cacing pita
└── Berkaki                       / With legs
    │   detail: "Ciri sepunya invertebrata berkaki: badan bersegmen, dan kulit keras (rangka luar)."
    ├── Tiga pasang kaki          : Semut, Rama-rama, Lipas
    └── Lebih daripada tiga pasang kaki : Labah-labah, Kala jengking, Lipan, Udang, Belangkas
```

Matches Textbook Rajah 1.1 (p. 7) and pp. 7–9. Legged traits match p. 8 verbatim in substance. Chip counts
are at exact BM/DLP parity `[[4,3],[3,5]]`. One organism token in Gambar foto 1.6 does not extract cleanly
from the PDF and was correctly **omitted rather than guessed**.

### H-02 — BM dichotomous key wording
**Status: RESOLVED, with a MEDIUM residual (see NEW-01).**

- BM node 3 now reads `Berbulu pelepah` / `Tidak berbulu pelepah` — matches Textbook Rajah 1.6 exactly.
- BM mammal trait corrected to `"Badan dilitupi bulu dan rambut (bukan bulu pelepah)"` (textbook p. 11), removing the contradiction that made the old key unusable.
- BM main-quiz **q21** aligned; its explanation now teaches the distinction explicitly.
- **Lion and chicken route correctly — RUNTIME_CONFIRMED exhaustively.** All 5 BM and all 5 DLP root-to-leaf paths were traversed by clicking the real buttons; every path ended with **exactly one lit star** matching the expected organism:

| BM path | → | DLP path | → |
|---|---|---|---|
| Poikiloterma > Kulit bersisik > Ada sirip | Ikan Bawal ✅ | Poikilothermic > Scaly > Has fins | Pomfret ✅ |
| Poikiloterma > Kulit bersisik > Tiada sirip | Ular ✅ | … > Does not have fins | Snake ✅ |
| Poikiloterma > Kulit tidak bersisik | Katak ✅ | Poikilothermic > Non-scaly | Frog ✅ |
| **Homeoterma > Berbulu pelepah** | **Ayam ✅** | Homeothermic > Feathered | Chicken ✅ |
| **Homeoterma > Tidak berbulu pelepah** | **Singa ✅** | Homeothermic > Non-feathered | Lion ✅ |

### H-03 — human-impact sufficiency for SP 1.1.2 reasoning
**Status: RESOLVED.**

Three cause→effect chains render as arrow sequences, positioned **before** the conservation response so the
learner meets the threat before the answer — matching the textbook p. 6 narrative order:

1. 🪓 Penyahhutanan → Hutan ditebang → Haiwan kehilangan habitat → Haiwan kehilangan sumber makanan → Spesies terancam kepupusan
2. 🎯 Pemburuan/pemerdagangan → bilangan menurun dengan cepat → endemik & terancam paling terjejas → Akta Perlindungan Hidupan Liar 1972 mengharamkannya
3. ⚖️ Manusia memerlukan bahan mentah → penyahhutanan perlu **DIKAWAL** → biodiversiti terpelihara

All three trace to textbook p. 6 / Gambar foto 1.4. Chain #3 supplies the *mewajarkan* (justify) reasoning
SP 1.1.2's verb demands — a learner can now argue *why* management is needed, not just list methods.
RUNTIME_CONFIRMED: heading renders; 8 arrow glyphs = chains of 4+4+3.

### H-04 — keyword definitions genuinely learner-accessible
**Status: RESOLVED.**

`ChipRow` (no definition slot) replaced by a local `KeywordGlossary`: the ten terms remain a compact chip
row, each chip a button revealing **one** definition in a panel below. RUNTIME_CONFIRMED: 10 chip buttons
in both languages; opening chip 1 and chip 4 each displayed the matching authored definition. Nothing
authored is discarded, and no wall of paragraphs is dumped on screen.

### H-05 — endemic vs threatened distinguished
**Status: RESOLVED.**

Two tabbed concepts, each with its own definition and examples, plus a caution callout. Endemic states it
is about **LOCATION**; threatened about **RISIKO KEPUPUSAN / RISK OF EXTINCTION**. The caution reads:

> "Endemik dan terancam **BUKAN** perkara yang sama. Sesuatu spesies boleh endemik sahaja, terancam sahaja, atau kedua-duanya sekali — contohnya harimau Malaya."

The learner-facing content therefore explicitly denies `endemik = terancam`. `checkYourself11` Q4 was
rewritten from *"Name a threatened species"* (previously answered from the endemic list) to *"What is the
difference…? Give one example of each."* — verified `asksDifference: true` in both languages.

`endemicSpecies` was removed from the schema, not orphaned — grep confirms zero remaining references, so
the remediation did not create a new NOT_RENDERED field.

RUNTIME_CONFIRMED: tabs `Spesies endemik` / `Spesies terancam` present; the threatened tab transitions
`inactive → active` and reveals its definition and examples; caution renders in both languages.

---

## Verify Adjacent Changes

**1 · Star Map heading changed away from "Build / Bina".**
**Verdict: appropriate, both academically and for UX.** The interaction traverses a pre-authored key; it
provides no facility to choose traits, create couplets or validate a key. The former heading
("⭐ Bina kekunci dikotomi / Build a dichotomous key") promised an activity the component does not deliver
— a product-promise mismatch Codex correctly raised. Current: `"⭐ Guna kekunci dikotomi — Peta Bintang"` /
`"⭐ Use a dichotomous key — Star Map"`. This is honest labelling and it aligns the heading with the
mandatory SP verb, *"Membezakan organisma **dengan** kekunci dikotomi"* (use), rather than the non-binding
Catatan activity *"membina"*. No capability was removed.

**2 · BM description moved from "ya/tidak" to paired/either-or framing.**
**Verdict: academically correct and an improvement.** Textbook p. 14 defines the key as built from
*kuplet*, each comprising **dua pernyataan** about characteristics — paired alternatives, not yes/no
questions. The former BM string ("satu siri soalan ya/tidak") mischaracterised the concept the chapter
teaches, while EN already said "either/or". Current BM: *"satu siri **kuplet** — setiap kuplet menawarkan
dua ciri berpasangan."* This now matches the textbook and closes a BM/DLP semantic gap.

**However — see NEW-02:** this correction was not carried through to one of the key's own question strings.

---

## New Findings

Two new items, both introduced or surfaced by the remediation itself. Neither meets the release-blocker
criteria; both are recorded for follow-up.

### NEW-01 · MEDIUM · BM glossary and bird trait still use bare "berbulu", surfaced by the H-04 fix
`src/content/form2/science/chapter-1/interactive-bm.ts:69`, `:71`, and the Burung trait in `animalBranches`

Fixing H-04 made the keyword definitions visible **for the first time**. Those definitions were never
audited as part of H-02, and two of them still use the ambiguous term:

| Surface | BM (current) | DLP (current) |
|---|---|---|
| Glossary — Mamalia / Mammal | "Berdarah panas, **berbulu**, …" | "Warm-blooded, **fur or hair**, …" ✅ |
| Glossary — Burung / Bird | "Berdarah panas, **berbulu (feather)**, …" | "Warm-blooded, **feathers**, …" ✅ |
| Trait card — Burung / Birds | "**Bulu** untuk kehangatan" | "Feathers for warmth" ✅ |
| Trait card — Mamalia / Mammals | "Badan dilitupi bulu dan rambut (bukan bulu pelepah)" ✅ | "…fur and hair (not feathers)" ✅ |

So the **mammal side was fixed and the bird side was not**, and the BM glossary now presents both mammals
and birds as "berbulu" with only a parenthetical English "(feather)" separating them. Textbook p. 11 says
birds are covered in *bulu **pelepah***.

**Why this is not a release blocker.** It is imprecision, not contradiction or falsehood — mammals *are*
berbulu per the textbook. No learner decision point depends on it: the Star Map labels are explicitly
"bulu **pelepah**" on both branches, the mammal trait card explicitly says "(bukan bulu pelepah)", and quiz
q21's explanation teaches the distinction directly. All 5 BM paths were runtime-verified to route
correctly. A reviewer who weights the newly-visible glossary more heavily could reasonably argue for HIGH;
the reasoning is set out here so that judgment can be made deliberately.

**Recommended fix (small):** BM glossary Mamalia → "bulu dan rambut"; Burung → "bulu pelepah"; Burung trait
card → "Bulu pelepah untuk kehangatan".

### NEW-02 · LOW · BM key node 3 is phrased as yes/no while its three siblings use paired alternatives
`src/content/form2/science/chapter-1/interactive-bm.ts:37`

| Node | BM question | Form |
|---|---|---|
| 1 | "Adakah ia poikiloterma … **atau** homeoterma …?" | paired ✅ |
| 2 | "Adakah ia mempunyai kulit bersisik, **atau** kulit tidak bersisik yang lembap?" | paired ✅ |
| **3** | **"Adakah badannya dilitupi bulu pelepah?"** | **yes/no ✗** |
| 4 | "Adakah ia mempunyai sirip, **atau** tiada sirip?" | paired ✅ |

The H-02 rewrite of node 3 changed its grammatical form. This sits in tension with the adjacent-change #2
correction made in the *same* edit, which now tells the learner a key offers "dua ciri berpasangan". DLP
node 3 ("Is it feathered or non-feathered?") remains paired, so this is also a small BM/DLP phrasing drift.

**Impact is presentational only:** the two rendered choice buttons are `Berbulu pelepah` /
`Tidak berbulu pelepah` — correctly paired — so the learner's actual interaction is unaffected, as the
exhaustive traversal confirmed.

**Recommended fix (one string):** "Adakah badannya dilitupi bulu pelepah, atau tidak berbulu pelepah?"

### Regression sweep — nothing else broke
- Main quiz banks: 30 questions / 30 answer keys per language, unchanged apart from the two authorised edits (BM q21 wording, BM+DLP q23 KBAT marker). Diff is `+7 / -4` lines total.
- Flashcards and mind maps: `git diff --quiet` clean — untouched.
- No surface still cites the removed `Anemon laut` / `Sea anemone`; the notes now use the textbook's `Karang laut` / `Coral`, which also brings them into line with flashcard f23 ("koral") and mind-map c2-1-1.
- Quiz q12 ("Cacing pita dan lintah… tanpa kaki dan badan bersegmen") previously assessed content the live notes never taught; that gap is now closed — a knock-on improvement.
- `endemicSpecies` removal left no dangling references.
- `tsc --noEmit` exit **0** on the frozen tree.

---

## Updated DSKP Coverage Matrix

Recalculated from current code against the live learner surface. The same 47-requirement decomposition as
the deep audit is used so the two are comparable. Previous percentages were **not** reused.

**Authority note carried forward:** DSKP printed p. 39 states the Catatan column contains both **Skop SK & SP**
(binding) and **Cadangan aktiviti PdP** ("*Senarai aktiviti yang dicadangkan bukanlah sesuatu yang mutlak*").
Items introduced by *"seperti"* (such as) inside a Skop bullet are illustrative examples, not discrete
mandatory outcomes.

### SP 1.1.1 — Menghuraikan dan berkomunikasi mengenai biodiversiti

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 1 | Definisi biodiversiti | COVERED | `biodiversityIntro` COPY; glossary; quiz q1; flashcard f1 |
| 2 | Bagaimana wujudnya (habitat & cuaca) | COVERED | Same paragraph + 4 habitat FlipCards (Gambar foto 1.2) |
| 3 | Kepelbagaian genetik | COVERED | COPY; quiz q29; flashcard f3 |
| 4 | Kepentingan: sumber makanan | COVERED | `importance[0]` |
| 5 | Kepentingan: keseimbangan alam / **sumber ekologi** | PARTIAL | "Imbangan alam" live; DSKP lists *Sumber ekologi* as its own bullet — still not named |
| 6 | Menjana ekonomi: tempat rekreasi | COVERED | `importance[2]` |
| 7 | Menjana ekonomi: pelancongan | COVERED | Named in the recreation description |
| 8 | Menjana ekonomi: bioteknologi | MISSING | Absent everywhere. Sits inside a *"seperti"* example list — **not a discrete mandatory outcome** |
| 9 | Menjana ekonomi: perubatan | COVERED | `importance[3]`; quiz q19 |
| 10 | Menjana ekonomi: bahan mentah industri | COVERED | `importance[4]` |
| 11 | Kepentingan: pendidikan | COVERED | `importance[5]` |
| 12 | Malaysia = 1 daripada 12 negara Mega Biodiversiti | COVERED | COPY; quiz q2; flashcard f2 |
| 13 | …dan bahawa status ini **perlu dipelihara** | PARTIAL | Obligation now strongly implied by human-impact chain #3 + conservation content, but not stated as Malaysia-specific |
| 14 | *(activity)* Persembahan multimedia | PARTIAL | `checkYourself11` prompts discussion-style recall; no presentation task. Non-binding |

### SP 1.1.2 — Mewajarkan keperluan pengurusan biodiversiti yang berkesan

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 15 | **Kesan aktiviti manusia** | **COVERED** *(was PARTIAL)* | 3 rendered cause→effect chains |
| 16 | Instrumen perundangan (Akta 1972) | COVERED | Accordion `legalBody`; quiz q4; chain #2 |
| 17 | Perlindungan habitat | COVERED | Accordion `habitatBody` |
| 18 | Program pembiakan | COVERED | Accordion `recoveryBody`; flashcard f55 |
| 19 | Pemuliharaan in situ | COVERED | `conservationMethods[0]`; quiz q11 |
| 20 | Pemuliharaan ex situ | COVERED | `conservationMethods[1]`; quiz q25 |
| 21 | **Spesies endemik — definisi** | **COVERED** *(was PARTIAL)* | `speciesConcepts[0].definition`, rendered in-body |
| 22 | Spesies endemik — contoh | COVERED | 5 textbook examples |
| 23 | **Spesies terancam** | **COVERED** *(was MISSING)* | `speciesConcepts[1]` + `speciesCaution` |
| 24 | *Mewajarkan* (justify, not list) | COVERED | Chain #3; quiz q25; checkYourself; reflection item |

### SP 1.2.1 — Membezakan organisma dengan kekunci dikotomi

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 25 | Purpose of a key | COVERED | `starMapIntro`; flashcard f20; quiz q30 |
| 26 | Kuplet = two paired statements | COVERED | Quiz q18/q30; BM intro now correctly says *kuplet / dua ciri berpasangan* |
| 27 | **Using a key to distinguish organisms** | **COVERED** *(was INCORRECT in BM)* | All 10 paths runtime-traversed; exactly one lit star each |
| 28 | Animal key organism set + logic | COVERED *(was PARTIAL)* | Node 3 matches Rajah 1.6; organism set matches. Node 4 uses *sirip* where the textbook uses *insang* — a valid authoring variant, not an error |
| 29 | Plant key | PARTIAL | Reproduced in quiz q24 and the dead notes; still no interactive plant key |
| 30 | Classification by ciri sepunya | COVERED | `ClassificationTree` + compare columns |
| 31 | **Invertebrate segmentation as a criterion** | **COVERED** *(was MISSING)* | `subGroups`; matches official Jawapan p. 279 Q6 |
| 32 | *(activity)* Membina kekunci dikotomi | PARTIAL | Explained in prose/flashcards; no construction interaction. **Cadangan aktiviti — non-binding** |

### SP 1.2.2 — Mencirikan kumpulan taksonomi utama

| # | Requirement | Status | Evidence |
|---|---|---|---|
| 33 | Vertebrata vs Invertebrata | COVERED | Branch labels; quiz q6 |
| 34 | **Invertebrate 4-way sub-groups** | **COVERED** *(was PARTIAL)* | All four groups render |
| 35 | **Invertebrata berkaki traits** | **COVERED** *(was MISSING)* | `subGroups[1].detail` |
| 36 | Ikan — ciri sepunya | COVERED | 5 traits |
| 37 | Amfibia — ciri sepunya | PARTIAL | *persenyawaan luar* still omitted (5 of 7 textbook traits) — out of remediation scope |
| 38 | Reptilia — ciri sepunya | COVERED | 5 traits |
| 39 | Burung — ciri sepunya | PARTIAL | *persenyawaan dalam* omitted; body covering says "Bulu" not "Bulu pelepah" (NEW-01) |
| 40 | Mamalia — ciri sepunya | COVERED | Improved: "bulu dan rambut (bukan bulu pelepah)" |
| 41 | Poikiloterma / Homoioterma defined | PARTIAL | Used as trait chips and glossed "berdarah sejuk/panas"; still no definition, and no glossary entry |
| 42 | Tumbuhan berbunga vs tidak berbunga | COVERED | `plantBranches`; quiz q9 |
| 43 | Lumut / paku pakis / konifer | COVERED | Matches Rajah 1.4 |
| 44 | Vaskular vs bukan vaskular | COVERED | Terminology drift only (BM "berpembuluh") |
| 45 | Monokotiledon vs Dikotiledon | COVERED | All 5 compare rows |
| 46 | Kotiledon as stored food | COVERED | `plantBranches[1].detail` |
| 47 | Ciri membezakan kumpulan taksonomi utama | COVERED | Vertebrate route — the DSKP's *atau* disjunct AcadeMY takes |

### Totals (recalculated from current code)

| Status | Count | Share | Was (deep audit) |
|---|---|---|---|
| **COVERED** | **38 / 47** | **80.9 %** | 30 / 47 (63.8 %) |
| **PARTIAL** | **8 / 47** | **17.0 %** | 13 / 47 (27.7 %) |
| **MISSING** | **1 / 47** | **2.1 %** | 3 / 47 (6.4 %) |
| **INCORRECT / NOT_RENDERED** | **0 / 47** | **0 %** | 1 / 47 (2.1 %) |

The single MISSING item (#8 bioteknologi) sits inside a *"seperti"* example list; its parent requirement
(*menjana ekonomi*) is covered by four live sub-items.

---

## BM / DLP Parity

Structural parity machine-compared across every remediated structure. **10 of 10 dimensions: PARITY.**

| Dimension | Result |
|---|---|
| Invertebrate hierarchy — level 1, level 2, chip counts `[[4,3],[3,5]]` | ✅ PARITY |
| Legged-invertebrate detail present | ✅ PARITY |
| Human impacts — count 3, chain lengths `[4,4,3]` | ✅ PARITY |
| Glossary — 10 terms, all defined | ✅ PARITY |
| Species concepts — ids `[endemic, threatened]`, examples `[5,4]` | ✅ PARITY |
| Species caution present | ✅ PARITY (184 vs 176 chars — normal translation variance) |
| Amphibian mini quiz — type + keyed option | ✅ PARITY (Katak / Frog) |
| Non-living mini quiz — keyed answer | ✅ PARITY (`true` / `true`) |
| Dichotomous key — 5 leaves, all paths resolve | ✅ PARITY |
| Vertebrate trait counts `[5,5,5,5,5]`; checkYourself Q4 asks the difference | ✅ PARITY |

**Semantic drift introduced by remediation:** two items, both BM-side and both recorded above —
**NEW-01** (BM glossary/bird trait less precise than DLP) and **NEW-02** (BM key node 3 phrasing).
Neither affects the learner's routing or answers.

**Deliberate non-parity, justified:** the BM key uses "Berbulu pelepah" while DLP retains
"Feathered / Non-feathered". English "feathered" already excludes mammals, so DLP never had the ambiguity;
adding a qualifier there would have forced an unnecessary DLP q21 edit. Verified correct in both.

---

## Runtime Verification

**Authentication limitation, stated plainly:** the real learner route
`/notes?subject=science&form=2&chapter=Chapter%201` redirects to `/login` (`AppShell` auth gate). No
credentials were available and none were entered. The authenticated end-to-end page — chapter header, XP
persistence, progress tracking — was therefore **not** exercised.

Instead, the component was mounted and driven from the **live Vite dev module graph** (`npm run dev`,
serving on port 8080), which executes the exact code the app serves. Results below are
**RUNTIME_CONFIRMED at component level**; items depending on the authenticated shell are **STATIC_ONLY**.

| # | Check | BM | DLP | Status |
|---|---|---|---|---|
| 1 | ONE notes experience only | ✅ 1 `section[data-lang]`, no legacy markers | ✅ | RUNTIME_CONFIRMED |
| 2 | New sections render (glossary, human impact, species, caution) | ✅ 4/4 | ✅ 4/4 | RUNTIME_CONFIRMED |
| 3 | Nested invertebrate groups open and read | ✅ 2 level-1, 4 level-2, traits, 4 nested blocks | ✅ | RUNTIME_CONFIRMED |
| 4 | Glossary definitions open and read | ✅ 10 chips; chips 1 & 4 reveal their definitions | ✅ | RUNTIME_CONFIRMED |
| 5 | Threatened/endemic UI functions | ✅ tab `inactive → active`, definition + examples + caution | ✅ | RUNTIME_CONFIRMED |
| 6 | Star Map traverses **all five** organisms | ✅ 5/5 paths, exactly one lit star each | ✅ 5/5 | RUNTIME_CONFIRMED |
| 7 | Correct mini-quiz answers behave correctly | ✅ Betul → emerald; Katak → emerald | ✅ True / Frog | RUNTIME_CONFIRMED |
| 8 | No new console errors | ✅ none | ✅ none | RUNTIME_CONFIRMED |
| 9 | BM and DLP both render | ✅ 8,354 chars | ✅ 7,439 chars | RUNTIME_CONFIRMED |
| — | Authenticated page, XP persistence, progress tracking | — | — | **STATIC_ONLY** (auth) |

Supporting gate check: `npx tsc --noEmit` on the frozen tree → **exit 0**.

---

## Remaining Non-Blocking Items

Recorded, not blocking under the stated policy:

1. **NEW-01 (MEDIUM)** — BM glossary Mamalia/Burung and the Burung trait card still say "berbulu" / "Bulu" rather than "bulu dan rambut" / "bulu pelepah". DLP is already correct.
2. **NEW-02 (LOW)** — BM key node 3 phrased as yes/no while its siblings and DLP use paired alternatives.
3. Amfibia missing *persenyawaan luar*; Burung missing *persenyawaan dalam* (matrix #37, #39) — assessed by quiz q14.
4. Poikiloterma / Homoioterma still not defined on the live surface (#41); no glossary entry.
5. *Sumber ekologi* not named as its own importance category (#5); *bioteknologi* absent (#8).
6. No interactive plant dichotomous key (#29).
7. Mind maps still omit a human-impact branch, which the live notes now carry.
8. Mini-quiz renderer styles only the chosen option, so a wrong pick does not also highlight the correct one.
9. Flashcard f57 contradicts f40 on which characteristic opens the animal key (pre-existing).
10. Chapter header hard-codes `modules: 12, experiments: 2` (`notes.tsx:840`).
11. BM UI chrome: "🌟 Identified:", default `restartLabel`, `MindMapBlock` strings remain English.
12. `.claude/launch.json` declares port 5173; the dev server actually serves on 8080.
13. `notes-bm.ts` / `notes-dlp.ts` remain on disk, unreferenced. When retired, the registry `notes:` entries on both Chapter 1 rows should be removed too.

Explicitly **not** counted against this gate, per policy: repo-wide CRLF-vs-prettier lint debt, the 7
pre-existing unrelated test failures (BM mind maps, Math F2 C1, billing, invoice PDF), the 18 pre-existing
Math Form 1 quiz-audit criticals, and the retained-but-unused legacy notes files.

---

## Human Review Items

Kept separate from release blockers; unresolved by authority.

1. **Fungi interpretation.** DSKP SP 1.2.2 Catatan reads: *"**Contoh:** Ciri yang membezakan antara tumbuhan, haiwan dan fungi **atau** perbezaan antara mamalia, reptilia, ikan, burung dan amfibia."* It is an **example**, **disjunctive**, and inside a **Cadangan aktiviti**; the SP itself names no groups. AcadeMY covers the second disjunct thoroughly. **This gate does not treat fungi as mandatory.** A curriculum owner should confirm whether house policy requires exhausting both disjuncts.
2. **Construct-your-own dichotomous key.** Mandatory verb is *"Membezakan… **dengan**"* (use). *"Membina"* appears only as Cadangan aktiviti. Noted: the textbook nonetheless assesses construction twice summatively (Latihan Sumatif 1 Q3 completes a key, Q6 builds one), so exam-readiness evidence is thinner than the SP alone implies. **P2 enrichment.**
3. **DLP textbook absence.** Only the BM textbook exists in the source pack. All DLP strings were validated by translation equivalence, not against an English-stream authority. **No claim of DLP textbook verification is made.**
4. **Errata provenance.** `Errata.pdf` self-declares that no KPM-/BBT-/Karangkraf-hosted original was located and carries no date. It reports no Bab 1 correction, so nothing in this gate depends on it — but **no finding here is described as "errata-verified".**
5. **Terminology policy.** "Homeoterma" (AcadeMY) vs "**Homoioterma**" (textbook p. 11, re-confirmed this pass); BM "berpembuluh" vs textbook "**vaskular**" (DLP already uses "vascular"). Left untouched to avoid rippling into the quiz and flashcard banks.

---

## Final Verdict

# PASS — FREEZE CHAPTER

**FORMER CRITICAL REMAINING: 0**
**FORMER HIGH REMAINING: 0**
**NEW RELEASE BLOCKERS: 0**

All three former CRITICALs are resolved and independently re-verified against the source PDFs — including
the reversed answer key, which was re-confirmed from textbook Jawapan p. 279 with the ✓/✗ glyph mapping
validated against a control statement. All five former HIGHs are resolved, with the SP 1.2.1 interaction
exhaustively runtime-traversed across all ten root-to-leaf paths in both languages.

Live-surface DSKP coverage improved from **63.8 % to 80.9 % COVERED**, with **NOT_RENDERED and INCORRECT
now at zero** — the defect classes that drove the original FAIL are eliminated.

Two new findings were identified, both created or surfaced by the remediation itself and both reported
against my own changes: **NEW-01** (MEDIUM — BM glossary/bird-trait precision, surfaced because the H-04
fix made previously-dead text visible) and **NEW-02** (LOW — BM key node 3 phrasing). Neither is a factual
error against authority, a wrong answer key, a missing mandatory outcome, a contradiction, a misleading
interaction, or broken rendering. Under the stated policy neither blocks release. NEW-01 is the one item a
reviewer could reasonably re-weight upward, and the reasoning for holding it at MEDIUM is set out in full
so that call can be made deliberately rather than by default.

The single MISSING requirement (bioteknologi) is an illustrative *"seperti"* example whose parent
requirement is covered four times over.

---

REPOSITORY LEARNER CONTENT MODIFIED: NO
FINAL RELEASE-GATE AUDIT ONLY: YES
