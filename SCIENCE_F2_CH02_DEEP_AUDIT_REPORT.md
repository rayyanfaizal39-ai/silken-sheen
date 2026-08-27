# Sains Tingkatan 2 Bab 2 — Ekosistem · Deep Academic + Implementation Audit

**Date:** 2026-08-22
**Mode:** READ-ONLY. No learner-facing content was modified.
**Independence:** No prior Chapter 2 audit report exists in the repository (verified before starting), so this audit had nothing to compare against and none of the Chapter 1 conclusions were assumed. Chapter 2's architecture was traced from scratch and turns out to differ materially from Chapter 1's.

---

## Source Verification

All three supplied files are **byte-identical (SHA-256)** to the repo copies under `audit-sources/Science/Form-2/`.

| Authority | Title / issuer | Edition | Bab 2 location |
|---|---|---|---|
| 1 · DSKP | *Sains Tingkatan 2 — Dokumen Standard Kurikulum dan Pentaksiran*, Bahagian Pembangunan Kurikulum, Kementerian Pendidikan Malaysia | **MAC 2016** | `2.0 EKOSISTEM` printed **pp. 44–47** (PDF pp. 56–59); Standard Prestasi Ekosistem printed **p. 48** (PDF p. 60) |
| 2 · Textbook | *Sains Tingkatan 2*, KPM, published for KPM by Karangkraf Network Sdn. Bhd. · **ISBN 978-967-14472-6-0** · KPM2017 · No. Siri Buku 0056 | **2017** (Cetakan Pertama) | Bab 2 printed **pp. 20–43** (PDF pp. 28–51). 2.1 p. 22 · 2.2 p. 25 · 2.3 p. 28 · 2.4 p. 39 · Rumusan p. 41 · Refleksi + Latihan Sumatif 2 pp. 42–43. **Official answer key: printed p. 279** (PDF p. 287) |
| 3 · Errata | "AcadeMY Audit Source Pack — Sains Tingkatan 2 (BM)", mirroring *Ralat Buku Teks Sains TG2* | Not stated | — |

`d3e0f2b0…` (DSKP) · `60fbaa1c…` (Textbook) · `586bbb9f…` (Errata)

### Errata — provenance and Bab 2 impact

The document **self-declares** that "No surviving copy hosted directly on an official KPM/Bahagian Buku Teks or Karangkraf domain was located" and carries **no date**. It is therefore treated as a **mirrored publisher-correction record, not an official-hosted KPM original**, and is used only to check whether any Bab 2 item is superseded.

**Result: no Bab 2 correction exists.** Its substantive corrections are textbook pp. 53, 71 (Bab 3), p. 151 (Bab 7) and p. 173 (Bab 8). Its dead-QR list includes p. 6 (Bab 1) but no Bab 2 page. **No finding in this report is described as errata-verified.**

### Key authoritative facts re-extracted for this audit

| Fact | Location | Verbatim |
|---|---|---|
| Carnivore terms are **binding scope** | DSKP printed p. 44, SP 2.1.1 **Nota** | "Perkenalkan istilah seperti **karnivor primer dan karnivor sekunder**." |
| Cycle disturbances | DSKP printed p. 44, SP 2.2.3 Catatan | "Penebangan hutan yang tidak terkawal, Pembakaran bahan api fosil, **Penggunaan sumber air yang berlebihan untuk pertanian dan domestik**." |
| Five ecology terms | DSKP printed p. 45, SP 2.3.1 Catatan | "Spesis, populasi, komuniti, **habitat** dan ekosistem" |
| Interaction types | DSKP printed p. 45, SP 2.3.3 Catatan | "1) Mangsa-pemangsa, 2) Simbiosis: komensalisme, mutualisme, parasitisme, 3) Persaingan" |
| Population factors | DSKP printed p. 46, SP 2.3.4 Catatan | "Penyakit, Pemangsa, Sumber makanan, **Kemarau**" |
| Ecosystem changes | DSKP printed p. 46, SP 2.3.5 Catatan | "**Bekalan air**, **Migrasi**, **Perubahan populasi**" |
| Carnivore labels in textbook | Textbook p. 23 and Rumusan p. 41 | "Pengguna sekunder (**karnivor primer**)" · "Pengguna tertier (**karnivor sekunder**)" |
| Textbook food chain | Textbook Rajah 2.2, p. 24 | Kubis → Siput → Burung → **Musang** |
| Energy pyramid | Textbook Bab 2 **and** DSKP Bab 2 | **Term absent from both.** "piramid" occurs in the DSKP only on printed p. 49 (Bab 3 Nutrisi, food pyramid) |

---

## Authoritative Bab 2 Map — mandatory vs suggested

The DSKP states on printed p. 39 that the **Catatan** column carries both **Skop SK & SP** (binding) and **Cadangan aktiviti PdP**, and that "*Senarai aktiviti yang dicadangkan bukanlah sesuatu yang mutlak*". That distinction is applied throughout.

| SK / SP | Mandatory SP outcome | Binding Skop / Nota | Cadangan aktiviti (non-binding) |
|---|---|---|---|
| **2.1.1** | Menerangkan dengan contoh pengeluar, pengguna, pengurai | **karnivor primer & karnivor sekunder** | HEBAT Sains Modul 1 |
| **2.1.2** | Menginterpretasi **rantai makanan dan siratan makanan** | energy transfer producer → consumer | activity showing the relationship |
| **2.2.1** | Peranan benda hidup dalam **kitar oksigen dan kitar karbon** | — | multimedia presentation |
| **2.2.2** | Mewajarkan peranan organisma dalam **kitar air** | — | (same presentation) |
| **2.2.3** | Menyelesaikan masalah gangguan kitaran oleh aktiviti manusia | **3 named disturbances** (deforestation, fossil-fuel burning, **excessive water use**) | — |
| **2.3.1** | Saling bersandaran untuk keseimbangan ekosistem | **Spesis, populasi, komuniti, habitat, ekosistem**; keseimbangan alam | field study; discussion |
| **2.3.2** | Mewajarkan kepentingan **penyesuaian hidupan** | — | Eksperimen (suhu/cahaya/kelembapan); multimedia on gurun/tundra/tropika |
| **2.3.3** | Interaksi antara organisma + aplikasi harian | **5 types**: mangsa-pemangsa; mutualisme/komensalisme/parasitisme; persaingan | biological control multimedia; **compare biological vs chemical control incl. long-term impact** |
| **2.3.4** | Mencerakinkan **faktor saiz populasi** | **Penyakit, Pemangsa, Sumber makanan, Kemarau** | — |
| **2.3.5** | Meramalkan **perubahan dalam ekosistem** | **Bekalan air, Migrasi, Perubahan populasi** | HEBAT Sains interactive |
| **2.4.1** | Mewajarkan keperluan ekosistem stabil & produktif | punca / kesan / cadangan penyelesaian | role play; identify agencies |

---

## Current Production Rendering Path

**Chapter 2 does not use Chapter 1's bespoke component.** It uses the *shared, sectioned* Form 2 pipeline.

```
src/content/registry.ts:3384-3410
  ├── science-f2-c2-bm   (lang "bm")   ├── science-f2-c2-dlp  (lang "dlp")
        video            → getEducationalVideo("science-f2-c2")   ── LIVE (BM C8xkNNYVNbU · DLP Wqs-aexxWhU)
        mindMap          → scienceF2C2MindMap{BM,DLP}             ── LIVE
        notes            → scienceF2C2Notes{BM,DLP}  (33.9/32.1 KB) ── ❌ DEAD / UNREACHABLE
        sciF2Interactive → scienceF2C2Interactive{BM,DLP} (10.7/10.5 KB) ── LIVE
        flashcards       → 60 / 60                                ── LIVE
        quiz             → 30 / 30                                ── LIVE

src/routes/notes.tsx:1967   activeChapter?.sciF2InteractiveData ?
src/routes/notes.tsx:1968     .chapter === 2 → <ScienceF2Chapter2NotesBlock lang={scienceLang==="dlp"?"en":"bm"} />
src/routes/notes.tsx:2109   ⛔ activeChapter?.notes → final else of the same ternary — UNREACHABLE

src/components/notes/ScienceF2Chapter2NotesBlock.tsx:1   (115 bytes — pure re-export)
  └── ScienceF2InteractiveNotesBlock.tsx:94-422
        └── ScienceSectionedNotesShell.tsx:16-135   ← sectioned navigation
```

| Dataset / element | BM | DLP | Status |
|---|---|---|---|
| `interactive-*.ts` (4 sections) | ✔ | ✔ | **LIVE** |
| `notes-*.ts` structured notes | ✔ | ✔ | **DEAD / UNREACHABLE** — `sciF2InteractiveData` wins at :1967 |
| Mind map | 4 branches | 4 branches | **LIVE** (separate route) |
| Main quiz | 30 | 30 | **LIVE** |
| Flashcards | 60 | 60 | **LIVE** |
| Embedded mini quiz | 2 | 2 | **LIVE** (last section only) |
| Educational video | ✔ | ✔ | **LIVE**, rendered *below* notes (`NotesContentWithVideo.tsx:42`) |
| Mini Investigation | — | — | **NEVER RENDERS** for this chapter (see M-07) |
| Science-discovery chapter header | — | — | **NOT APPLIED** to this chapter (see L-07) |

**Duplication:** one duplicate dataset pair (`notes-*.ts` vs `interactive-*.ts`), diverging materially in coverage. No cross-chapter leakage; no stale barrel imports; the registry entry, language mapping and chapter routing are all correct.

### Sectioned-notes verification (12 required checks)

| # | Check | Result |
|---|---|---|
| 1 | What sections exist | 4 — 2.1, 2.2, 2.3, 2.4 (identical numbering both languages) |
| 2 | Every section reachable | ✅ 4 stepper buttons + Next/Back; all four reached |
| 3 | Next Section logical | ✅ forward walk hit all 4 in order; hidden on the last |
| 4 | Back logical | ✅ enabled on last, returns to 2.3; disabled on section 1 |
| 5 | Final section reachable | ✅ by both Next-walk and direct stepper jump |
| 6 | Content lost while splitting | ✅ none — every authored card/tab/accordion/flip-card/matcher/sequence title renders (`authoredTitlesNotRendered: []`); 9/9 keywords render |
| 7 | Content duplicated between sections | ✅ none — section bodies are distinct (BM 1001/606/2600/2091 chars) |
| 8 | BM/DLP section ordering | ✅ identical (2.1→2.4) |
| 9 | Mini Investigation in intended place | ❌ **absent** — `isScienceDiscovery` (`notes.tsx:373-376`) excludes F2 C2 → M-07 |
| 10 | Videos below notes | ✅ `NotesContentWithVideo.tsx:42` renders `VideoBlock` after the content div |
| 11 | Section in data but never rendered | ✅ none — 4 authored, 4 rendered |
| 12 | Content hidden by section/render state | ✅ none; shell clamps restored index (`:37`), returns null only when `total === 0` |

**The sectioned-notes migration itself is sound.** The defects below are curriculum-content gaps, not navigation defects.

---

## HIGH Findings

### H-01 · MISSING · SP 2.3.5 has no teaching content on the live learner surface
**Type:** MISSING · **Severity:** HIGH · **SP:** 2.3.5
`src/content/form2/science/chapter-2/interactive-bm.ts:39-64` (section 2.3) · `interactive-dlp.ts` same section

**Authoritative evidence.** DSKP printed p. 46 makes SP 2.3.5 a mandatory outcome — "Meramalkan bagaimana perubahan dalam ekosistem mempengaruhi sumber yang ada dan keseimbangan antara populasi" — with three named Skop items: **Bekalan air, Migrasi, Perubahan populasi**. Textbook p. 38 devotes a full page to all three (padi/drought, burung bangau kendi migration to Kuala Gula, beetle population surge).

**Current learner behaviour.** Section 2.3 contains no card, tab, accordion or check on ecosystem change. Precise term counts in the live data: `migrasi|penghijrahan|migration` → **1 occurrence in each language, and it is not this SP** — it is the tundra flip-card fact ("Penebatan, **penghijrahan** dan aktiviti bermusim membantu organisma menghadapi musim sejuk panjang"), which teaches *adaptation* (SP 2.3.2). `bekalan air` → **0**. `kemarau` → **0**.

Meanwhile the learner is assessed on it four times: quiz **q18** (migration months), **q21** (trophic cascade), **q23** (drought → food web), **q26** (2015 locust outbreak), plus flashcards f36, f44, f45, f50 and mind-map branch `c3-7`.

**Why it matters.** A whole mandatory SP with binding Skop is examined but never taught on the only teaching surface. q18 in particular is pure recall of a month range ("September hingga April") that appears nowhere in the notes.

**Targeted fix.** Add a "Perubahan dalam ekosistem" block to section 2.3 covering the three DSKP-named changes with the textbook p. 38 examples. All of this already exists in the dead `notes-bm.ts` (`bekalan air` ×2, `penghijrahan` ×3).

---

### H-02 · MISSING · Siratan makanan is named and heavily assessed but never taught or visualised
**Type:** MISSING · **Severity:** HIGH · **SP:** 2.1.2
`src/content/form2/science/chapter-2/interactive-bm.ts:14-24` (section 2.1) · `interactive-dlp.ts:` same

**Authoritative evidence.** SP 2.1.2 is "Menginterpretasi **rantai makanan dan siratan makanan**" — the food web is half the mandatory outcome. Textbook p. 24 gives Rajah 2.3 (a worked food web) and Rajah 2.4 (energy transfer through it); Latihan Sumatif 2 Q1(a) requires building **all** food chains from a given web, and the official answer (printed p. 279) lists three.

**Current learner behaviour.** Section 2.1 provides a linear `Journey` stepper only (Kubis → Siput → Burung → Rubah). Total live occurrences of `siratan makanan` / `food web`: **3** — one keyword chip, and one check-yourself question plus its hint. There is **no food-web content block and no food-web visual**. Assessment coverage by contrast: 10 occurrences across the quiz bank, 8 across the flashcards, 2 in the mind map.

**Why it matters.** The chapter's single most examined skill — interpreting a web and extracting chains from it — has no worked example a learner can study. The textbook's summative question cannot be answered from the live notes.

**Targeted fix.** Add a food-web block to section 2.1 (a `matcher` or a second `sequence` would fit the existing schema), using textbook Rajah 2.3.

---

### H-03 · MISSING · DSKP-mandated "karnivor primer / karnivor sekunder" absent from the live notes
**Type:** MISSING · **Severity:** HIGH · **SP:** 2.1.1
`src/content/form2/science/chapter-2/interactive-bm.ts:15-19` · `interactive-dlp.ts:` same

**Authoritative evidence.** DSKP printed p. 44, SP 2.1.1 **Nota** (binding Skop, not an activity): "Perkenalkan istilah seperti **karnivor primer dan karnivor sekunder**." Textbook p. 23 applies them ("burung raja udang … merupakan **karnivor primer**"; "Pengguna tertier ialah haiwan **karnivor sekunder**") and the Rumusan p. 41 prints them as the labels for the two consumer levels.

**Current learner behaviour.** `karnivor|carnivor` → **0 occurrences** in the live data in **both** languages; RUNTIME_CONFIRMED absent from the rendered output. The Pengguna card says only "pengguna primer / sekunder / tertier". The terms *are* present in flashcard f22 and mind-map node `c1-1-4`, and 3–4 times in the dead `notes-bm.ts`.

**Why it matters.** This is an explicitly enumerated binding term the DSKP instructs teachers to introduce, and it is the vocabulary the textbook's own chapter summary uses. Its absence from the notes leaves the flashcard and mind-map uses unexplained.

**Targeted fix.** Add the parenthetical labels to the Pengguna card in section 2.1, mirroring Rumusan p. 41.

---

### H-04 · MISSING · One of the three DSKP-named cycle disturbances is absent and replaced by an unlisted item
**Type:** MISSING · **Severity:** HIGH · **SP:** 2.2.3
`src/content/form2/science/chapter-2/interactive-bm.ts:32-36` · `interactive-dlp.ts:` equivalent accordions

**Authoritative evidence.** DSKP printed p. 44, SP 2.2.3 Catatan names exactly three disturbances as Skop: "Penebangan hutan yang tidak terkawal, Pembakaran bahan api fosil, **Penggunaan sumber air yang berlebihan untuk pertanian dan domestik**." Textbook p. 27 illustrates the same three.

**Current learner behaviour.** The three accordions are *Penyahhutanan*, *Pembakaran bahan api fosil* and **"Baja berlebihan"** / "Overuse of fertiliser". Excessive **water** use appears nowhere: a regex sweep for `sumber air…berlebihan|excessive water|overuse of water` returns **0 genuine hits** in both languages (the single BM match is a false positive inside section 2.4 — "pertanian intensif mencemarkan **sumber air** dengan racun perosak dan baja **berlebihan**", which is water *pollution*, not water *consumption*).

The substituted item is not scientifically wrong — fertiliser runoff and algal blooms are real — but it is not the authority's item, and the **mind map has it right** (`mindmap-bm.ts:40`: "Gangguan kitar nutrien: pembalakan, bahan api fosil, **air berlebihan**"), showing the correct item was known.

**Why it matters.** A named binding Skop item on a mandatory SP is missing from the only teaching surface, and the water cycle is precisely the cycle SP 2.2.2 asks learners to justify.

**Targeted fix.** Restore the third accordion to excessive water use for agriculture and domestic purposes; retain the fertiliser item as a fourth if desired.

---

## MEDIUM Findings

| ID | Type | SP | File / evidence | Issue |
|---|---|---|---|---|
| **M-01** | MISSING | 2.3.1 | `interactive-bm.ts:40` intro | **Habitat is never defined.** DSKP Skop names five terms (spesis, populasi, komuniti, **habitat**, ekosistem); the intro chains species→population→community→ecosystem and omits habitat. `Habitat ialah` → 0 live occurrences. Flashcard f2 defines it; the notes do not. Quiz uses "habitat" 8 times |
| **M-02** | OUT_OF_SCOPE / INCORRECT grouping | — | `mindmap-bm.ts:39`, `quizzes-bm.ts` q29, `flashcards-bm.ts` f40 | **"Piramid tenaga" is not in the Form 2 Bab 2 syllabus.** Verified absent from textbook Bab 2 entirely, and present in the DSKP only on printed p. 49 (Bab 3 Nutrisi — food pyramid). It is nonetheless taught in the mind map, assessed as quiz q29 and carried by flashcard f40. Additionally the mind-map node is filed under **2.2 Kitar Nutrien**, though an energy pyramid is an energy-flow (2.1) concept — an incorrect grouping |
| **M-03** | PARTIAL | 2.2.2 | `interactive-bm.ts:28` | Role of organisms in the water cycle reduced to transpiration. Textbook p. 25 gives three roles (transpiration/respiration/excretion; roots gripping soil and slowing flow; fallen leaves reducing evaporation). Quiz q13 and flashcard f25 assess the root role the notes omit |
| **M-04** | PARTIAL | 2.2.3 | `interactive-bm.ts:32-36` | SP 2.2.3's verb is "**Menyelesaikan masalah**". The accordions describe problems only; textbook p. 27's five named solutions (replanting, stricter law, public transport, rainwater storage, planned agriculture) appear only as generic text in section 2.4 |
| **M-05** | PARTIAL | 2.3.3 | `interactive-bm.ts:63` check hint | DSKP Catatan asks learners to compare biological vs chemical control **and its long-term impact**. The live notes carry only a hint ("spesies yang diperkenalkan masih perlu diurus dengan teliti"); the textbook p. 36 drawbacks (slow to act; ecosystem imbalance from an introduced species) are taught only in quiz q20 and flashcards f31/f58 |
| **M-06** | PARTIAL | 2.3.4 | `interactive-bm.ts:48` | Population-factor card says "cuaca"; DSKP Skop names **Kemarau** and textbook p. 37 explains drought → dry soil → forest fire. `kemarau|drought` → 0 live occurrences, yet quiz q23 and flashcards f35/f50 assess it |
| **M-07** | NOT_RENDERED | 2.3.2 | `src/routes/notes.tsx:373-376`, `:2120` | **Mini Investigation never renders for this chapter.** `isScienceDiscovery` = Form 1 science ∨ `isScienceF2C1` ∨ `isScienceF3Interactive` — F2 C2 is excluded, so the `<MiniInvestigation>` at `:2120` is unreachable here even though Chapter 1 and Form 3 receive it |
| **M-08** | INCORRECT | 2.1.2 | `interactive-bm.ts:21` / `-dlp.ts` | Food-chain sequence ends **"Rubah" / "Fox"**; textbook Rajah 2.2 (p. 24) uses **"Musang"** (civet). Foxes are neither the textbook example nor native to the Malaysian ecosystems the chapter uses |
| **M-09** | PARTIAL | 2.3.2 | live section 2.3 | Textbook **Eksperimen 2.1** (effect of temperature, light and humidity on woodlice distribution — the DSKP's named investigation for this SP) has no live representation beyond one flip-card sentence. Flashcard f59 assesses its hypothesis |

---

## LOW Findings

- **L-01** · `Journey.tsx:41,44` hard-codes English **"Start"** and **"Complete"** on the navigation buttons; the component takes no `lang` prop, so BM learners see English chrome inside the food-chain interaction.
- **L-02** · `MatchingPairs.tsx:16-18` names its right-hand column `shuffledMatches` but computes `[...pairs].sort((a,b) => a.match.localeCompare(b.match))` — an **alphabetical sort, not a shuffle**. The order is deterministic across sessions. (Verified non-trivial for the BM pair set, so the task still works.)
- **L-03** · Quiz q18 and flashcard f44 call *Bubulcus ibis* "**burung kuntul kerbau**"; textbook p. 38 uses "**burung bangau kendi**". The scientific name and the answer (September–April) are correct.
- **L-04** · Flashcard f29 uses "**mynah**" where textbook p. 33 uses "**burung tiung**"; f30 uses "**paku pakis sarang burung**" where textbook p. 34 uses "**paku-pakis langsuir**".
- **L-05** · Flashcard f43 calls the *Bacillus thuringiensis* target "**kumbang badak**"; textbook p. 36 says "**kumbang tanduk**".
- **L-06** · The mutualism example uses "**anemon laut**"; textbook p. 33 uses "**buran**". Both are valid BM for sea anemone.
- **L-07** · Chapter 2 does not receive the `ScienceDiscoveryChapterHeader` chrome (`notes.tsx:829-847`) that Form 1, F2 C1 and F3 chapters get, because of the same `isScienceDiscovery` gate as M-07 — a visual inconsistency across the Form 2 science set.
- **L-08** · `notes-bm.ts` (33.9 KB) and `notes-dlp.ts` (32.1 KB) remain registered but unreachable. This matches the architecture accepted for Chapter 1 — but unlike Chapter 1, **the porting step was never performed**: every item in H-01…H-04 and M-01/M-06 exists in these dead files (`karnivor primer` ×3, `karnivor sekunder` ×4, `siratan makanan` ×14, `penghijrahan` ×3, `bekalan air` ×2, `kemarau` ×2, `saprofitisme` ×4).

---

## Scientific Visual / Interaction Audit

| Interaction | File | Implementation verdict |
|---|---|---|
| **Journey** (food chain, §2.1) | `blocks/Journey.tsx` | Logic sound — linear stepper, correct ordering, no arrow-direction defect. Data-correct/render-wrong: **none**. Defects: English chrome (L-01); "Rubah" example (M-08); teaches a chain only, never a web (H-02) |
| **MatchingPairs** (interactions, §2.3) | `blocks/MatchingPairs.tsx` | Matching logic correct (`selected === pair.id`); `onComplete` fires once when all pairs matched → XP awarded once. Right column deterministic-sorted (L-02) |
| **FlipCardGrid** (habitats, §2.3) | `blocks/FlipCard.tsx` | Correct; four habitat cards with adaptation facts. `icon` fields are empty strings and images are supplied, so no icon fallback is used |
| **Tabs / Accordions** (§2.2, §2.4) | shell component | Render authored bodies faithfully; verified no title dropped |
| **Comparison columns** (§2.4) | shell component | Two-column render correct |
| **MiniQuiz** (§2.4) | `ScienceF2InteractiveNotesBlock.tsx:32-92` | Option→value mapping verified correct for true/false (`index === 0 → true`, `:64`); XP fires only on the correct answer (`:49-51`) |

**No case was found where correct data is rendered in a scientifically wrong way.** This is the main structural difference from Chapter 1.

---

## Quiz Audit (30 BM + 30 DLP)

All 30 BM questions were individually checked against the DSKP, textbook and official answer key. **BM/DLP `answerIndex` parity: 30/30 identical.** Difficulty split: 10 Easy / 10 Medium / 10 Hard in both languages.

**Wrong answer keys found: 0.** **Stem/explanation contradictions: 0.** **Duplicates/near-duplicates: 0.**

Verified against source: q3 (E. coli/cendawan, p. 23) · q12 (energy lost as heat and faeces, p. 24) · q13 (roots grip soil, p. 25) · q14 (respiration + decomposition use O₂, p. 26) · q17 (panda/bamboo, p. 37) · q18 (Sept–April, p. 38) · q19 (Jadual 2.1, p. 39) · q20 (biocontrol drawbacks, p. 36) · q22 (owls, p. 36 + Sumatif Q4) · q23 (padi drought, p. 38) · q26 (800 ha, 2015 Russia, p. 38) · q27 (avian flu, p. 37) · q30 (competition includes intraspecific, p. 35).

**One scope problem:** **q29** asks why an "energy pyramid" models trophic structure. The reasoning is scientifically sound, but the term is in neither the textbook's Bab 2 nor the DSKP's Bab 2 (M-02).

### SP distribution

| SP | Questions | n | % | Classification |
|---|---|---|---|---|
| 2.1.1 | q2, q3, q11 | 3 | 10 % | Adequately assessed |
| 2.1.2 | q4, q12 (+q29 out-of-scope) | 2 | 7 % | **Under-assessed** — and the food-web half is untaught (H-02) |
| 2.2.1 | q5, q14 | 2 | 7 % | Adequately assessed |
| 2.2.2 | q13 | 1 | 3 % | **Under-assessed** |
| 2.2.3 | q25 | 1 | 3 % | **Under-assessed** |
| 2.3.1 | q1, q6 | 2 | 7 % | Adequately assessed |
| **2.3.2** | — | **0** | **0 %** | **NOT ASSESSED** — penyesuaian hidupan has no quiz item in either language |
| 2.3.3 | q7, q8, q9, q15, q16, q20, q22, q24, q30 | 9 | 30 % | **Over-assessed** |
| 2.3.4 | q17, q27 | 2 | 7 % | Adequately assessed |
| 2.3.5 | q18, q21, q23, q26 | 4 | 13 % | Adequately assessed **by count**, but nothing is taught (H-01) |
| 2.4.1 | q10, q19, q28 | 3 | 10 % | Adequately assessed |

---

## Embedded Mini Quiz Audit

Audited separately from the main bank, because Chapter 1's two CRITICALs lived here. **Chapter 2's embedded quizzes are clean.**

| # | Stem (BM / DLP) | Key | Verdict |
|---|---|---|---|
| 1 | "Tenaga dikitar semula tanpa henti dalam ekosistem" / "Energy is recycled endlessly in an ecosystem" | `false` | ✅ **Correct.** Energy flows one way and is lost as heat; only nutrients cycle (textbook p. 24). Explanation agrees with the stem |
| 2 | "Mengapakah bilangan tikus meningkat selepas helang disingkirkan?" / "Why did rat numbers rise after eagles were removed?" | index 1 — "Tekanan pemangsaan berkurang" | ✅ **Correct**, and matches textbook Latihan Sumatif 2 Q4 and the official answer (p. 279) |

**XP logic verified.** `ScienceF2InteractiveNotesBlock.tsx:46-52` computes `isCorrect` from `item.answer` / `item.answerIndex` and calls `onCorrect()` only when true; `awardOnce` (`:112-116`) guarantees a single 15-XP award per item. `:64` maps true/false option index 0 → `true`, so the option order cannot desync from the key. RUNTIME_CONFIRMED in both languages: clicking the wrong option styles **red**, the correct option styles **green**, and the explanation appears.

---

## Flashcard Audit (60 BM + 60 DLP)

All 60 BM cards were read. Factual accuracy against source is **high** — f43 (five Malaysian biological controls), f45 (800 ha), f44 (Kuala Gula), f46 (PERHILITAN 2010), f52 (crow population), f55 (Jabatan Perhutanan enforcement) and f59 (Eksperimen 2.1) all trace correctly.

**No internal contradictions were found** between cards (each of f14/f15/f16 and f23/f48 agrees on the symbiosis definitions; f24 and f49 agree that competition can be intraspecific).

Issues:
- **Cards assessing content the live notes never teach:** f2 (habitat definition), f22 (karnivor primer/sekunder), f35/f50 (kemarau), f36/f44 (migration, water supply), f59 (Eksperimen 2.1). These are correct cards — the gap is in the notes (H-01, H-03, M-01, M-06, M-09).
- **f40** carries the out-of-syllabus energy pyramid (M-02).
- Terminology drift: f29, f30, f43, f44 (L-03…L-05).

---

## Mind Map Audit

`mindmap-bm.ts` / `mindmap-dlp.ts` — both **LIVE**, 4 top-level branches matching 2.1–2.4, structurally parallel.

**The mind map is more curriculum-complete than the live notes.** It correctly carries `karnivor sekunder` (`c1-1-4`), `siratan makanan` (`c1-2-2`), the ecosystem-change branch with migration and water supply (`c3-7`), and — critically — the correct third cycle disturbance, "**air berlebihan**" (`c2-4`), which the notes replaced with fertiliser (H-04).

Defects:
- **`c2-3` "Konsep piramid tenaga"** is both out-of-syllabus (M-02) and **mis-grouped**: it sits under *2.2 Kitar Nutrien* although an energy pyramid describes energy flow (2.1).
- `c1-1-3` labels pengguna sekunder "omnivor/karnivor" without the textbook's "(karnivor primer)" tag, so the map has the secondary carnivore term but not the primary.
- No branch for SP 2.3.2 (penyesuaian hidupan) or for the 2.2.3 solutions.

---

## Practical / Investigation Content

| Item | DSKP status | AcadeMY provision |
|---|---|---|
| Eksperimen 2.1 — suhu/cahaya/kelembapan vs woodlice distribution | **Cadangan aktiviti** (SP 2.3.2) — *not* mandatory | One flip-card sentence; flashcard f59. **No investigation surface** (M-09) |
| Aktiviti 2.3 — field study of habitat/population/community | **Cadangan aktiviti** (SP 2.3.1) | None |
| Aktiviti 2.4 — multimedia on gurun/tundra/tropika adaptation | **Cadangan aktiviti** (SP 2.3.2) | 3 habitat flip cards ✔ |
| Aktiviti 2.5 — role play on environmental issues | **Cadangan aktiviti** (SP 2.4.1) | None |
| Generic Mini Investigation block | Product feature | **Never renders for this chapter** (M-07) |

**None of these is treated as a release blocker** — all four textbook activities are Cadangan aktiviti, which the DSKP itself declares non-absolute. The item worth attention is M-07, because the *product* provides a Mini Investigation for Chapter 1 and Form 3 but silently omits it here.

---

## BM / DLP Parity

| Dimension | Result |
|---|---|
| Section count and order | ✅ 4 / 4, identical numbering (2.1→2.4) |
| Section titles | ✅ Semantically equivalent |
| Notes meaning | ✅ Equivalent throughout — the DLP is a faithful translation |
| Interactions | ✅ Same blocks in the same sections |
| Examples | ✅ Same (both use Fox/Rubah — M-08 affects both equally) |
| Quiz answers | ✅ 30/30 `answerIndex` identical |
| Quiz difficulty | ✅ 10/10/10 both |
| Explanations | ✅ Equivalent |
| Flashcards | ✅ 60 / 60 |
| Mind maps | ✅ Parallel trees |
| Mini quizzes | ✅ Identical semantics and keys |
| Keywords | ✅ 9 / 9, all rendered |
| Terminology | ✅ No BM-specific ambiguity found |
| UI labels affecting understanding | ⚠️ `Journey` "Start"/"Complete" are English in the BM experience (L-01) |

**Every defect in this report is language-symmetric.** Both languages share the same gaps (H-01…H-04, M-01…M-09), so **DLP is not a safe alternative** to BM, and there is no semantic drift between them. Parity is genuinely good; the content is equally incomplete on both sides.

---

## Implementation Defects

| Defect | Location | Impact |
|---|---|---|
| Dead duplicate dataset | `registry.ts:3392,3406` → `notes.tsx:2109` | 66 KB of authored notes unreachable; the content the live notes lack is sitting in them (L-08) |
| Feature gate excludes this chapter | `notes.tsx:373-376` | Mini Investigation (`:2120`) and the science-discovery header (`:829-847`) never render for F2 C2 (M-07, L-07) |
| Component receives no `lang` | `blocks/Journey.tsx:41,44` | English chrome in the BM experience (L-01) |
| Misleading identifier / non-random order | `blocks/MatchingPairs.tsx:16-18` | `shuffledMatches` is an alphabetical sort (L-02) |

**Checked and clear:** no unreachable section branch; no `.map()` data loss (all authored titles render); component reads the correct field; no default overriding authored values; no stale barrel import; no wrong language mapping; correct chapter routing; no cross-chapter leakage; **no console errors**.

---

## DSKP Coverage Matrix

Judged against the **live learner surface** (interactive notes as rendered). Content reachable only in the mind map, quiz, flashcards or the dead notes does **not** count as COVERED.

| # | SP | Requirement | Status | Live evidence / issue |
|---|---|---|---|---|
| 1 | 2.1.1 | Pengeluar — definition + example | COVERED | §2.1 card |
| 2 | 2.1.1 | Pengguna primer | COVERED | §2.1 card |
| 3 | 2.1.1 | Pengguna sekunder | COVERED | §2.1 card |
| 4 | 2.1.1 | Pengguna tertier | COVERED | §2.1 card |
| 5 | 2.1.1 | Pengurai — definition + example | COVERED | §2.1 card |
| 6 | 2.1.1 | **Karnivor primer / karnivor sekunder** (binding Nota) | **MISSING** | H-03 |
| 7 | 2.1.1 | Saprofitisme (textbook p. 22 term) | PARTIAL | Absent live; in mind map + f10 |
| 8 | 2.1.2 | Rantai makanan | COVERED | §2.1 Journey |
| 9 | 2.1.2 | **Siratan makanan** | **MISSING** | H-02 |
| 10 | 2.1.2 | One-way energy flow + loss | COVERED | Card detail + mini quiz 1 + q12 |
| 11 | 2.2.1 | Kitar karbon | COVERED | §2.2 tab |
| 12 | 2.2.1 | Kitar oksigen | COVERED | §2.2 tab |
| 13 | 2.2.1 | Role of living things (respirasi/fotosintesis/penguraian) | COVERED | §2.2 tabs |
| 14 | 2.2.2 | Kitar air — processes | COVERED | §2.2 tab |
| 15 | 2.2.2 | Role of organisms in the water cycle | PARTIAL | M-03 — transpiration only |
| 16 | 2.2.3 | Penebangan hutan tidak terkawal | COVERED | §2.2 accordion |
| 17 | 2.2.3 | Pembakaran bahan api fosil | COVERED | §2.2 accordion |
| 18 | 2.2.3 | **Penggunaan sumber air berlebihan** | **MISSING** | H-04 |
| 19 | 2.2.3 | Solutions ("menyelesaikan masalah") | PARTIAL | M-04 |
| 20 | 2.3.1 | Spesies | COVERED | §2.3 intro |
| 21 | 2.3.1 | Populasi | COVERED | §2.3 intro |
| 22 | 2.3.1 | Komuniti | COVERED | §2.3 intro |
| 23 | 2.3.1 | **Habitat** | **MISSING** | M-01 |
| 24 | 2.3.1 | Ekosistem | COVERED | §2.3 intro |
| 25 | 2.3.1 | Keseimbangan alam / non-living components | COVERED | §2.3 intro |
| 26 | 2.3.2 | Adaptation — gurun / tundra / tropika | COVERED | 3 flip cards |
| 27 | 2.3.2 | Effect of suhu/cahaya/kelembapan on distribution | PARTIAL | M-09 |
| 28 | 2.3.3 | Mutualisme | COVERED | Card + matcher |
| 29 | 2.3.3 | Komensalisme | COVERED | Card + matcher |
| 30 | 2.3.3 | Parasitisme | COVERED | Card + matcher |
| 31 | 2.3.3 | Mangsa-pemangsa | COVERED | Card + matcher |
| 32 | 2.3.3 | Persaingan | COVERED | Card + matcher |
| 33 | 2.3.3 | Kawalan biologi (application) | COVERED | Card |
| 34 | 2.3.3 | Biological vs chemical + long-term impact | PARTIAL | M-05 |
| 35 | 2.3.4 | Penyakit | COVERED | §2.3 card |
| 36 | 2.3.4 | Pemangsa | COVERED | §2.3 card |
| 37 | 2.3.4 | Sumber makanan | COVERED | §2.3 card |
| 38 | 2.3.4 | **Kemarau** | PARTIAL | M-06 — card says "cuaca" only |
| 39 | 2.3.5 | **Bekalan air** | **MISSING** | H-01 |
| 40 | 2.3.5 | **Migrasi** | **MISSING** | H-01 |
| 41 | 2.3.5 | **Perubahan populasi** | PARTIAL | H-01 — mini quiz 2 only |
| 42 | 2.4.1 | Kesan aktiviti manusia (4 activities) | COVERED | §2.4 intro + comparison |
| 43 | 2.4.1 | Penguatkuasaan undang-undang | COVERED | §2.4 comparison |
| 44 | 2.4.1 | Kesedaran awam | COVERED | §2.4 comparison |
| 45 | 2.4.1 | 5R | COVERED | 5 cards |
| 46 | 2.4.1 | Kawalan biologi as a measure | COVERED | §2.4 comparison |
| 47 | 2.4.1 | Justify need for a stable/productive ecosystem | COVERED | §2.4 intro |
| 48 | 2.4.1 | Agensi/pemegang taruh; punca–kesan–cadangan *(Cadangan aktiviti — non-binding)* | PARTIAL | No role-play or stakeholder surface |

### Totals — live learner surface

| Status | Count | Share |
|---|---|---|
| **COVERED** | **34 / 48** | **70.8 %** |
| **PARTIAL** | **8 / 48** | **16.7 %** |
| **MISSING** | **6 / 48** | **12.5 %** |
| **INCORRECT / NOT_RENDERED** | **0 / 48** | **0 %** |

Nothing is INCORRECT or dropped by the renderer — the sectioned migration is technically clean. The deficit is entirely **content that was never carried across** from the dead notes.

---

## Assessment Coverage Matrix

| Requirement | Notes | Mind Map | Quiz | Cards | Interaction | Overall |
|---|---|---|---|---|---|---|
| Pengeluar / pengguna / pengurai | ✅ | ✅ | ✅ | ✅ | ✅ Journey | **STRONG** |
| Karnivor primer / sekunder | ❌ | ⚠️ partial | ❌ | ✅ | ❌ | **WEAK** |
| Rantai makanan | ✅ | ✅ | ✅ | ✅ | ✅ | **STRONG** |
| Siratan makanan | ❌ | ✅ | ✅ ×10 | ✅ | ❌ | **WEAK** — assessed, not taught |
| Energy one-way + loss | ✅ | ✅ | ✅ | ✅ | ✅ mini quiz | **STRONG** |
| Kitar karbon / oksigen | ✅ | ✅ | ✅ | ✅ | ✅ tabs | **STRONG** |
| Kitar air — organism roles | ⚠️ | ✅ | ✅ | ✅ | ⚠️ | **PARTIAL** |
| Cycle disturbances (3 named) | ⚠️ 2 of 3 | ✅ 3 of 3 | ✅ | ✅ | ⚠️ | **PARTIAL** |
| Solutions to disturbance | ⚠️ | ❌ | ✅ | ✅ | ❌ | **PARTIAL** |
| Spesies/populasi/komuniti/ekosistem | ✅ | ✅ | ✅ | ✅ | ❌ | **SUPPORTED** |
| Habitat | ❌ | ❌ | ✅ | ✅ | ❌ | **WEAK** |
| Penyesuaian (gurun/tundra/tropika) | ✅ | ❌ | ❌ | ⚠️ | ✅ flip cards | **PARTIAL** — no quiz item at all |
| 5 interaction types | ✅ | ✅ | ✅ ×9 | ✅ | ✅ matcher | **STRONG** |
| Kawalan biologi | ✅ | ✅ | ✅ | ✅ | ❌ | **STRONG** |
| Biocontrol drawbacks | ⚠️ | ✅ | ✅ | ✅ | ❌ | **PARTIAL** |
| Faktor saiz populasi | ✅ | ✅ | ✅ | ✅ | ❌ | **SUPPORTED** |
| Perubahan ekosistem (2.3.5) | ❌ | ✅ | ✅ ×4 | ✅ | ⚠️ mini quiz | **WEAK** — assessed, not taught |
| Kesan aktiviti manusia + langkah | ✅ | ✅ | ✅ | ✅ | ✅ comparison | **STRONG** |
| 5R | ✅ | ✅ | ✅ | ✅ | ✅ cards | **STRONG** |

---

## Audit Limitations

1. **Authenticated route not exercised.** `/notes?subject=science&form=2&chapter=Chapter%202` redirects to `/login`; no credentials were available and none were entered. Component behaviour was verified by mounting the **real served modules** from the Vite dev graph. Results are labelled **RUNTIME_CONFIRMED at component level**; the authenticated shell (chapter header, XP persistence, reading-progress tracking) is **STATIC_ONLY**.
2. **No DLP-stream English textbook exists in the source pack.** All DLP strings were validated by translation equivalence against the BM textbook, not against an English-stream authority. **No claim of DLP textbook verification is made.**
3. **Errata provenance.** Self-disclaimed mirror, undated, not KPM-hosted. No Bab 2 correction exists, so no finding depends on it — but nothing here is errata-verified.
4. **PDF figure uncertainty.** Textbook Bab 2 diagrams (Rajah 2.2–2.4 food chain/web, Rajah 2.5 water cycle, Rajah 2.6 carbon/oxygen cycle, Rajah 2.7 pond ecosystem) were read as extracted text plus labels; the figures themselves were not rendered as images. Layout-dependent detail in those figures could not be fully verified. One organism token in Gambar foto 1.6 of Bab 1 is known not to extract cleanly, indicating this extraction has limits.
5. **Image assets not inspected.** `ch2-ekosistem.png`, `tropical.png`, `desert.jpg`, `tundra.jpg`, `soil.jpg` were confirmed imported and wired; their visual content was not viewed.
6. **One runtime probe timed out** when programmatically expanding every accordion and tab across all sections. The affected terminology checks were re-verified deterministically against the authored data instead, which is the stricter test.
7. **Scope.** Bab 2 only. Chapter 1 and other chapters were not re-audited.

---

## Final Verdict

# FAIL — HUMAN REVIEW REQUIRED

**Why FAIL.** Two mandatory Standard Pembelajaran are materially untaught on the only learner-facing surface:

- **SP 2.3.5** has no teaching content at all (H-01) while being assessed by four quiz questions and four flashcards.
- **SP 2.1.2**'s food-web half is named in a keyword chip and one check question, with no worked example or visual (H-02), while the quiz references it ten times and the textbook's own summative question requires extracting chains from a web.

Two further binding Skop items are absent from the notes: the DSKP-mandated carnivore terminology (H-03) and one of the three named nutrient-cycle disturbances, which was replaced by an item the authority does not list (H-04).

**Why HUMAN REVIEW REQUIRED.** Three questions need an authority decision rather than an engineering one:

1. **"Piramid tenaga" (M-02)** — taught in the mind map, assessed as quiz q29 and carried by flashcard f40, but absent from both the Form 2 textbook's Bab 2 and the DSKP's Bab 2. Retain as labelled enrichment, or remove?
2. **DLP textbook absence** — DLP correctness rests on translation equivalence alone.
3. **Errata provenance** — undated, non-KPM-hosted mirror.

**What is genuinely healthy here.** The sectioned-notes migration is technically clean: all four sections reachable, navigation correct in both directions, nothing lost or duplicated in the split, no authored field dropped by the renderer, and no console errors. **Both embedded mini quizzes are scientifically correct with sound XP logic**, and the 30+30 main quiz bank contains **zero wrong answer keys** — the failure mode that made Chapter 1 fail does not recur here. The mind map, flashcards and quiz bank are all more curriculum-complete than the notes.

**The single structural cause of this FAIL** is that Chapter 2 was migrated to the interactive sectioned UX and its 66 KB of legacy notes was left registered-but-dead **without the content ever being ported across**. Every missing item identified above already exists, correct, in `notes-bm.ts` / `notes-dlp.ts`.

---

REPOSITORY LEARNER CONTENT MODIFIED: NO
AUDIT ONLY: YES

TOTAL CRITICAL: **0**
TOTAL HIGH: **4**
TOTAL MEDIUM: **9**
TOTAL LOW: **8**

COVERED CURRICULUM REQUIREMENTS: **34 / 48 (70.8 %)**
PARTIAL: **8 / 48 (16.7 %)**
MISSING: **6 / 48 (12.5 %)**
INCORRECT / NOT_RENDERED: **0 / 48 (0 %)**

FINAL VERDICT: **FAIL — HUMAN REVIEW REQUIRED**
