# Sains Tingkatan 2 Bab 1 — Deep Academic QA Audit

**Mode:** READ-ONLY. No learner-facing file was modified, created, deleted, renamed, refactored, or committed. The only file created is this report.
**Date:** 2026-08-22
**Method:** Conducted independently from source. The previous report (`SCIENCE_F2_CH01_AUDIT_REPORT.md`) was deliberately not opened until after all findings below were fixed, to avoid confirmation bias. A comparison appears at the end.

---

## Source Provenance

All three supplied files were confirmed **byte-identical (SHA-256)** to the copies already committed under `audit-sources/Science/Form-2/`, so the repo pack and the supplied pack are the same evidence.

### DSKP

| Field | Value (read from the document itself) |
|---|---|
| Exact title | *Sains Tingkatan 2 — Dokumen Standard Kurikulum dan Pentaksiran, Kurikulum Standard Sekolah Menengah* |
| Issuer | Bahagian Pembangunan Kurikulum, Kementerian Pendidikan Malaysia |
| Edition / date | **MAC 2016** (© Terbitan 2016) |
| Extractability | Text-extractable (not a scan) — 112 PDF pages |
| Bab 1 pages | Tema 1 intro: printed p. **40** (PDF p. 52). `1.0 BIODIVERSITI` Standard Kandungan / Standard Pembelajaran / Catatan: printed pp. **41–42** (PDF pp. 53–54). Standard Prestasi Biodiversiti: printed p. **43** (PDF p. 55). |

### Textbook

| Field | Value (read from the document itself) |
|---|---|
| Exact title | *Sains Tingkatan 2* (Kurikulum Standard Sekolah Menengah) |
| Issuer | Kementerian Pendidikan Malaysia |
| Published for KPM by | Karangkraf Network Sdn. Bhd., Shah Alam |
| Publication year | **2017** (Cetakan Pertama 2017; KPM2017) |
| ISBN | **978-967-14472-6-0** |
| No. Siri Buku | **0056** |
| Authors | Jariah binti Khalib, Maznah binti Omar, Badariah binti Hamzah, Shamsulikram bin Abdul Hamid |
| Extractability | Text-extractable — 296 PDF pages |
| Bab 1 pages | Printed pp. **2–19** (PDF pp. 10–27). 1.1 Kepelbagaian Organisma p. 4; 1.2 Pengelasan Organisma p. 7; Rumusan p. 16; Refleksi Kendiri + Latihan Sumatif 1 pp. 17–19. **Official answer key (Jawapan) for Latihan Sumatif 1: printed p. 279 (PDF p. 287)** — this page proved decisive (see C-02). |

### Errata — provenance and limits

| Field | Value |
|---|---|
| What it claims to be | "AcadeMY Audit Source Pack — Sains Tingkatan 2 (BM)", status line "VERIFIED MIRRORED PUBLISHER-CORRECTION RECORD" |
| Underlying document | *Ralat Buku Teks Sains TG2*, an 8-page correction document |
| Errata date | **Not stated** in the mirrored document |
| Hosting | **Not KPM-hosted.** The file states: "No surviving copy hosted directly on an official KPM/Bahagian Buku Teks or Karangkraf domain was located during verification on 21 August 2026. Therefore this file must not be described as an official-hosted original." |
| Corrections listed | 4 substantive items, all outside Bab 1: pp. 53 & 71 (Bab 3, Malaysia Food Pyramid 2020), p. 151 (Bab 7, "sel sering" → "sel kering"), p. 173 (Bab 8, Newton's Third Law box withdrawn). Plus dead QR-linked resources on pp. 6, 53, 55, 59, 77, 78, 81, 84, 129, 218, 232. |
| **Bab 1 impact** | **No core factual correction for Bab 1.** The only Bab-1 item is the dead QR resource on textbook p. 6 (the `http://www.nre.gov.my` "Biodiversiti" Info link). |

**Authority limits applied in this audit.** The errata is a *self-disclaimed mirror*, not an official-hosted KPM document, and carries no date. It is therefore treated as tertiary/advisory only: it was used to check whether any Bab 1 item was superseded (none was), and was **not** used to override the DSKP or the textbook anywhere. Its own instruction — "Do not treat this PDF as a substitute for the DSKP or textbook… The audit must not extrapolate additional 'errata'" — was followed. **No Bab 1 finding in this report is described as "errata-verified."**

**Dead QR resource:** I grepped every production file for this chapter (`notes-*`, `interactive-*`, `quizzes-*`, `flashcards-*`, `mindmap-*`, `ScienceF2Chapter1NotesBlock.tsx`) for `nre.gov.my`, `QR`, and external `http` references. AcadeMY neither exposes nor depends on the dead link. **Not a learner-facing defect.**

---

## Production Rendering Path

```
src/content/registry.ts:3352-3380
  ├── id: "science-f2-c1-bm"   (lang: "bm",  title: "Bab 1: Biodiversiti")
  └── id: "science-f2-c1-dlp"  (lang: "dlp", title: "Chapter 1: Biodiversity")
        video          → getEducationalVideo("science-f2-c1"[, "dlp"])
        mindMap        → scienceF2C1MindMap{BM,DLP}        ── LIVE
        notes          → scienceF2C1Notes{BM,DLP}          ── ❌ DEAD (see C-01)
        sciF2C1Data    → scienceF2C1Interactive{BM,DLP}    ── LIVE
        flashcards     → scienceF2C1Flashcards{BM,DLP}     ── LIVE
        quiz           → scienceF2C1Quizzes{BM,DLP}        ── LIVE

src/content/types.ts:300        sciF2C1Data?: SciF2C1Content
src/content/types.ts:406        hasChapterContent() counts sciF2C1Data

src/routes/notes.tsx:366-376    isScienceF2C1 = subject==="science" && form==="Form 2"
                                  && activeChapterKey==="Chapter 1" && !!sciF2C1Data
                                → isScienceDiscovery = true (adds MiniInvestigation, line 2120)

src/routes/notes.tsx:826-2121   ONE <NotesContentWithVideo> block containing ONE ternary chain
src/routes/notes.tsx:1956-1966  ✅ MATCHES HERE → <ScienceF2Chapter1NotesBlock
                                     content={activeChapter.sciF2C1Data}
                                     lang={scienceLang === "dlp" ? "en" : "bm"} />
src/routes/notes.tsx:2109-2117  ❌ final else: activeChapter?.notes && <NotesBlock/>  — UNREACHABLE

src/components/notes/ScienceF2Chapter1NotesBlock.tsx:196-390
  ├── COPY[lang]  (lines 22-125)  ← ALL substantive prose is HARD-CODED HERE, not in content files
  ├── :228-241  blogHighlight (img + title + body)
  ├── :243      ChipRow(keywords.map(k => k.term))   ← .definition DROPPED (see H-04)
  ├── :253      FlipCardGrid(habitats)               → blocks/FlipCard.tsx
  ├── :258-268  IconCardGrid(importance) + historyFact
  ├── :273-286  Accordion (legal / habitat / recovery — all COPY strings)
  ├── :288-301  Tabs(conservationMethods)  in situ / ex situ
  ├── :304      ChipRow(endemicSpecies, tone="green")
  ├── :307-311  CheckYourself(checkYourself11)
  ├── :326      ClassificationTree(rootLabel="🐾", animalBranches)   → blocks/ClassificationTree.tsx
  ├── :332      ClassificationTree(plantBranches, cotyledonCompare)  ← no rootLabel
  ├── :338-342  DichotomousStarMap(dichotomousOrganisms, dichotomousKey) → blocks/DichotomousStarMap.tsx
  ├── :345-349  CheckYourself(checkYourself12)
  ├── :355-359  SelfReflectionChecklist(reflectionItems)
  ├── :366-368  MiniQuizCard × miniQuiz   (awards addXp(15) on correct — line 134)
  └── :372-387  Mark-as-read button

Quiz  → src/routes/quizzes.tsx:16055  registry.getChapterQuizQuestions(...)   ── LIVE
Cards → src/lib/flashcard-availability.ts:46  registry.getChapter(...).flashcards ── LIVE
```

### Determinations required by Step 1

| Question | Answer |
|---|---|
| Which content files are LIVE? | `interactive-bm.ts`, `interactive-dlp.ts`, `mindmap-bm.ts`, `mindmap-dlp.ts`, `quizzes-bm.ts`, `quizzes-dlp.ts`, `flashcards-bm.ts`, `flashcards-dlp.ts` |
| Which are legacy / unused? | **`notes-bm.ts` (367 lines) and `notes-dlp.ts` (364 lines) are imported, bundled, and never rendered.** See C-01. |
| Duplicate datasets? | **Yes.** The chapter carries two parallel notes datasets — the dead `notes-*.ts` (rich, textbook-faithful) and the live `interactive-*.ts` (structured, thinner). They diverge materially in curriculum coverage. |
| Is authored content dropped by rendering? | **Yes, twice.** (a) the entire `notes-*.ts` dataset (C-01); (b) all 10 `keywords[].definition` strings (H-04). Also `FlipCardItem.icon` is never displayed because every habitat supplies an image (L-06). |
| Do components transform/truncate content? | Yes — `ScienceF2Chapter1NotesBlock.tsx:243` truncates `keywords` to `.term`. `ClassificationTree` renders branches collapsed by default, so `vertebrateGroups` traits sit two clicks deep. |
| Do BM and DLP use the same or different data sources? | **Different data, same component.** The registry selects the language-specific content object; the component separately selects `COPY[lang]` from `lang={scienceLang === "dlp" ? "en" : "bm"}`. Both derive from `scienceLang`, so they stay consistent — but **all narrative prose lives in the component, not the content files**, which is why some UI strings are hard-coded English for BM learners (M-08). |
| Is a chapter component unreachable? | Yes — the legacy notes surface (C-01). |

---

## CRITICAL

**C-01 · NOT_RENDERED · The complete, textbook-faithful notes dataset for both languages is unreachable by learners**
`src/routes/notes.tsx:1956-1966` vs `:2109-2117` · `src/content/registry.ts:3362, 3376` · `src/content/form2/science/chapter-1/notes-bm.ts:1-367` · `notes-dlp.ts:1-364`
**SP:** 1.1.1, 1.1.2, 1.2.1, 1.2.2 (all four)

Evidence:
- DSKP p. 41–42 defines the full Bab 1 scope; Textbook pp. 2–19 is the content the notes faithfully transcribe.
- `registry.ts:3362` sets `notes: scienceF2C1NotesBM`; `:3363` sets `sciF2C1Data: scienceF2C1InteractiveBM`. Both are truthy.
- `notes.tsx` lines 826–2121 are a **single** `<NotesContentWithVideo>` containing **one** ternary chain. `activeChapter?.sciF2C1Data` is tested at line **1956** and matches. `activeChapter?.notes` is the chain's **final else at line 2109** and is therefore never evaluated. There is no tab, route, or alternate surface that renders `activeChapter.notes` for this chapter.

Current behaviour: learners see only `ScienceF2Chapter1NotesBlock`. The following authored, correct, textbook-traceable content never reaches a student:

| Dead content | Location | Textbook source |
|---|---|---|
| Full invertebrate classification **including the segmented/unsegmented split** | `notes-bm.ts:123-133`, `notes-dlp.ts:125-129` | Rajah 1.1, pp. 7–8 |
| Invertebrata berkaki defining traits (badan bersegmen + eksoskeleton) | `notes-bm.ts:129` | p. 8 |
| 5-group vertebrate comparison table **with amphibian external and bird internal fertilisation** | `notes-bm.ts:140-176` | pp. 9–11 |
| Poikiloterma / Homeoterma definitions | `notes-bm.ts:137` | Sains box, p. 9 |
| Spesies endemik definition (verbatim) | `notes-bm.ts:67-68` | Sains box, p. 6 |
| Human impact on biodiversity (deforestation → habitat + food loss) | `notes-bm.ts:57-58` | p. 6 + Gambar foto 1.4 |
| Both worked dichotomous keys transcribed in full | `notes-bm.ts:284-303` | Rajah 1.6 p. 14, Rajah 1.7 p. 15 |
| Bulu (fur) vs rambut (hair) explanation | `notes-bm.ts:182` | answers the textbook's own question, p. 11 |
| ⭐ Wajib Hafal / 🎯 Tip Peperiksaan / ⚠️ Kesilapan Lazim blocks (×4 sections) | throughout | — |
| `keyExamFacts` (12) and `keyTerms` (12) | `notes-bm.ts:339-366` | — |

Why it matters: this one defect is the **proximate cause of the majority of curriculum gaps in this report**. The content is not missing from the repository — it is written, accurate, and invisible. Every finding H-01, H-03, H-05, M-01, M-02 and M-09 below exists *only* on the live surface and is *already solved* in the dead one.

Targeted fix: decide the intended architecture, then act on it — either (a) restore the legacy notes to the render path alongside the interactive block (e.g. surface `activeChapter.notes` before the `isScienceDiscovery` chain or in a sibling section), or (b) port the missing fields into `SciF2C1Content` + `ScienceF2Chapter1NotesBlock` and delete the dead files. Do not leave two divergent datasets with one silently dead.

---

**C-02 · INCORRECT · Mini-quiz answer key contradicts the official KPM answer key (dichotomous keys and non-living things)**
`src/content/form2/science/chapter-1/interactive-bm.ts:335-341` · `interactive-dlp.ts:335-341`
**SP:** 1.2.1

Evidence:
- Textbook **Latihan Sumatif 1, Q2(c)** (printed p. 18): *"Selain bagi tujuan pengelasan benda hidup, kekunci dikotomi juga boleh digunakan untuk mengelaskan benda bukan hidup."* — students tick ✓ if true, ✗ if false.
- Textbook **official Jawapan, printed p. 279** (PDF p. 287): `2. (a) ✗ (b) ✓ (c) ✓`. **Q2(c) is officially marked BETUL (TRUE).** (The glyph mapping is confirmed by Q2(a), *"Biodiversiti ialah kepelbagaian organisma hidup dan bukan hidup"*, which is keyed ✗ — correctly false.)

Current behaviour: AcadeMY asks the same statement and keys it **false**:
```
BM  : "Kekunci dikotomi boleh digunakan untuk mengelaskan bahan bukan hidup juga."  answer: false
DLP : "A dichotomous key can be used to classify non-living things too."            answer: false
explanation (both): "…mengelaskan organisma hidup… — bukan objek bukan hidup."
```
Because `MiniQuizCard` awards `addXp(15, "science")` on the keyed answer (`ScienceF2Chapter1NotesBlock.tsx:131-135`), AcadeMY **rewards the wrong answer and marks the officially correct answer wrong**.

Why it matters: this is a direct contradiction of the official KPM answer key on a question lifted near-verbatim from the summative exercise, delivered inside the notes with XP reinforcement. A student who learns it here will lose the mark in an exam. Note this is **not** a textbook-versus-reality conflict needing adjudication: the official key and general scientific practice agree — dichotomous keys are an identification technique routinely applied to non-living objects (rocks, minerals, artefacts). AcadeMY is simply wrong.

Targeted fix: set `answer: true` in both files and rewrite the explanation to state that a dichotomous key is a general either/or identification method, so it can also sort non-living things, while the chapter applies it to organisms.

---

**C-03 · INCORRECT/CONTRADICTORY · Mini-quiz stem contradicts its own explanation and the textbook (adult amphibian respiration)**
`src/content/form2/science/chapter-1/interactive-bm.ts:342-350` · `interactive-dlp.ts:342-350`
**SP:** 1.2.2

Evidence: Textbook p. 10, Amfibia ciri-ciri sepunya — *"anak amfibia bernafas melalui **insang**; amfibia **dewasa** bernafas menggunakan **peparu dan kulit yang lembap**."*

Current behaviour (identical in both languages):
```
Q  : "Which animal breathes through gills AS AN ADULT and lays jelly-like eggs with no shell?"
     options: [Crocodile, Frog, Eagle, Grouper]   answerIndex: 1  → Frog
expl: "Frogs are amphibians — young breathe through gills, ADULTS breathe through lungs and
       moist skin, and eggs (spawn) have no shell."
```
The explanation refutes the stem's own premise for the keyed answer. Worse, of the four options **Grouper/Kerapu satisfies the stem as written** — a fish breathes through gills as an adult and lays unshelled eggs — so the keyed answer is defensibly wrong, not merely awkward.

Why it matters: the question teaches that adult frogs breathe through gills, directly contradicting AcadeMY's own live notes on the same screen (`interactive-bm.ts:234`: *"Anak bernafas melalui insang, dewasa melalui peparu + kulit"*), the dead notes, the flashcards (f16), and the textbook. It also carries XP.

Targeted fix: remove "as an adult / semasa dewasa" from the stem, or re-key. The cleanest repair is to ask which animal's *young* breathe through gills while the adult uses lungs and moist skin — which uniquely identifies the frog and matches the textbook wording.

---

## HIGH

**H-01 · MISSING · Invertebrate segmented/unsegmented classification is absent from the live notes**
`src/content/form2/science/chapter-1/interactive-bm.ts:196-212` · `interactive-dlp.ts:196-212` · rendered at `ScienceF2Chapter1NotesBlock.tsx:326` via `ClassificationTree.tsx:66-80`
**SP:** 1.2.1, 1.2.2

Evidence:
- DSKP p. 42, SP 1.2.1 **Nota** (a scope note, not a suggested activity): "Haiwan: Haiwan bertulang belakang, haiwan tidak bertulang belakang…"
- Textbook **Rajah 1.1, p. 7** — the invertebrate hierarchy is a **four-way** split: Tanpa kaki → {Badan tanpa segmen | Badan bersegmen}; Berkaki → {Tiga pasang kaki | Lebih daripada tiga pasang kaki}. Pages 7–8 give worked examples for each.
- Official Jawapan, p. 279: **Q3(a)(v) = "Badan bersegmen banyak"**, and **Q6** answers "Perbezaan: (i) badan bersegmen, badan tanpa segmen (ii) berkaki, tanpa kaki" and builds a key whose *first* split is `Badan tanpa segmen | Badan bersegmen`. Segmentation is the primary official discriminator, examined twice in one summative exercise.

Current behaviour: the live tree collapses this to **two** flat chip groups:
```
"Tiada kaki":  Span, Anemon laut, Siput, Cacing tanah, Lintah
"Ada kaki":    Semut (3 pasang), Rama-rama (3 pasang), Labah-labah (4+ pasang), Udang (4+ pasang), Lipan (4+ pasang)
```
The "Tiada kaki" group silently mixes unsegmented (Span, Siput) with segmented (Cacing tanah, Lintah) under one unlabelled heading, and the segmentation concept appears nowhere in the live experience.

Why it matters: three independent AcadeMY surfaces **do** teach this correctly — the mind map (`mindmap-bm.ts:61-62`, `mindmap-dlp.ts:61-62`), the dead notes (`notes-bm.ts:126-132`), and the flashcards (f23). AcadeMY's **own live quiz q12** ("Cacing pita dan lintah diklasifikasikan sebagai invertebrata yang…" → *tanpa kaki dan badan bersegmen*) assesses a distinction the live notes never teach — and names "cacing pita", which is not even in the live chip list. Learners are examined on content the live notes withhold.

Targeted fix: restore the four-way `chipGroups` in `animalBranches[0]` in both interactive files, mirroring Rajah 1.1 and the already-correct mind map.

---

**H-02 · INCORRECT/CONTRADICTORY · The BM dichotomous key separates bird from mammal using "Berbulu", which AcadeMY's own notes state is a mammal trait**
`src/content/form2/science/chapter-1/interactive-bm.ts:33-43` (Star Map) · `src/content/form2/science/chapter-1/quizzes-bm.ts:291-302` (q21) · contradicted by `interactive-bm.ts:262-271` (Mamalia traits)
**SP:** 1.2.1 — **BM only; DLP is correct**

Evidence: Textbook **Rajah 1.6, p. 14** deliberately uses **"berbulu pelepah"** (contour/flight feathers), not bare "berbulu":
```
3. (a) Tidak berbulu pelepah ........ Singa
   (b) Berbulu pelepah .............. Ayam
```
This precision is required because Textbook p. 11 states mammals are *"badan dilitupi **bulu dan rambut**"* — mammals **are** berbulu in Malay.

Current behaviour:
```
interactive-bm.ts:37  question: "Adakah ia berbulu (bulu ayam) atau tidak berbulu?"
interactive-bm.ts:39  { label: "Berbulu",       next: leaf "Ayam"  }
interactive-bm.ts:40  { label: "Tidak berbulu", next: leaf "Singa" }
```
The buttons rendered by `DichotomousStarMap.tsx:101` show only `choice.label` — i.e. bare **"Berbulu" / "Tidak berbulu"**. Meanwhile `interactive-bm.ts:265` lists the Mamalia trait as **"Berbulu"**, and flashcard f27 says *"Mamalia: ditutupi bulu tebal/rambut"*. A learner who applies AcadeMY's own mammal trait to AcadeMY's own key routes the lion to **Ayam**. Quiz q21 propagates the same ambiguity into assessment ("Tidak berbulu → Singa, Berbulu → Ayam"), and q22 then keys *"berbulu + melahirkan + menyusukan"* → **Mamalia** — so **q21 and q22 teach opposite things about the word "berbulu"**.

DLP has no such defect: `interactive-dlp.ts:37-41` uses "Feathered / Non-feathered" and `quizzes-dlp.ts:298` matches.

Why it matters: the Star Map is the single interaction carrying SP 1.2.1. A key whose discriminator is ambiguous for one of its own five organisms does not teach the skill — it teaches a wrong inference, and only to BM learners.

Targeted fix: change the BM question and both labels to the textbook's **"Berbulu pelepah" / "Tidak berbulu pelepah"**, and align `quizzes-bm.ts` q21. Optionally restore "bulu dan rambut" to the Mamalia trait so the contrast is explicit.

---

**H-03 · MISSING · Effects of human activities on biodiversity — the first mandated discussion point of SP 1.1.2**
No field exists in `src/content/form2/science/chapter-1/interactive-types.ts:89-106`; only one hard-coded sentence at `src/components/notes/ScienceF2Chapter1NotesBlock.tsx:62-63` (en) / `:97-98` (bm). Also absent from `mindmap-bm.ts:33-42` and `mindmap-dlp.ts:33-42`.
**SP:** 1.1.2

Evidence:
- DSKP p. 41, SP 1.1.2 Catatan, **first bullet**: *"Kesan aktiviti manusia terhadap biodiversiti"*.
- Textbook p. 6 + Gambar foto 1.4 caption: *"Aktiviti penyahhutanan menyebabkan haiwan-haiwan kehilangan habitat dan sumber makanan."* Aktiviti 1.1 requires students to research *"faktor-faktor haiwan dan tumbuhan yang diancam kepupusan"*.
- Textbook **Rumusan p. 16** carries "Kesan aktiviti manusia terhadap biodiversiti" as a named branch under Pengurusan.

Current behaviour: the entire treatment is one COPY sentence — *"Penebangan hutan untuk balak dan pembangunan meletakkan biodiversiti dalam risiko."* — naming one activity and no effects. `SciF2C1Content` has `conservationMethods` and `endemicSpecies` but no `threats` / `humanImpact` field. The mind maps jump straight from "Pengurusan Biodiversiti" to the three preservation levers.

Why it matters: SP 1.1.2's verb is *mewajarkan* (justify). A learner cannot justify why management is needed without the threat side of the argument. The dead notes (`notes-bm.ts:57-58`) and textbook Rumusan both carry it; the live surface does not.

Targeted fix: add a `humanImpact: { activity, effect }[]` field to `SciF2C1Content`, populate from textbook p. 6 (penyahhutanan → habitat loss, food-source loss, kepupusan; plus pemburuan/pemerdagangan implied by the Act), render it above the conservation accordion, and add the branch to both mind maps.

---

**H-04 · NOT_RENDERED · All 10 keyword definitions are authored and never displayed**
`src/components/notes/ScienceF2Chapter1NotesBlock.tsx:243` · `src/components/notes/blocks/ChipRow.tsx:1-27` · data at `interactive-bm.ts:53-92`, `interactive-dlp.ts:53-92`
**SP:** 1.2.2 (the definitions carry vertebrate group characteristics)

Evidence: Textbook p. 3 lists the chapter's Kata Kunci (Biodiversiti, Vertebrata, Invertebrata, Mamalia, Burung, Reptilia, Ikan, Amfibia, Monokotiledon, Dikotiledon) — the exact ten AcadeMY authored, each with a written definition.

Current behaviour:
```tsx
<ChipRow items={content.keywords.map((k) => k.term)} />
```
`ChipRow` accepts `items: string[]` only and has no slot for a definition. Every `keywords[i].definition` — including *"Mamalia: Berdarah panas, berbulu, bernafas menggunakan peparu, melahirkan dan menyusukan anak"* and the four other vertebrate group definitions — is dropped at the render boundary. The learner sees ten bare word-chips.

Why it matters: this is the same defect class as C-01 at smaller scale, and it removes a second independent statement of the vertebrate characteristics that SP 1.2.2 requires. It is also the exact defect found in the Form 1 Bab 1 audit (`AccuracyTargets`), suggesting a systemic pattern worth a codebase-wide sweep.

Targeted fix: render keywords through a definition-capable block (a glossary accordion or the existing `IconCardGrid` with `detail`), or extend `ChipRow` with an optional tooltip/expand.

---

**H-05 · MISSING · "Spesies terancam" is assessed but never taught, and is conflated with "endemik"**
`src/content/form2/science/chapter-1/interactive-bm.ts:170-176` (endemicSpecies) and `:190-193` (checkYourself11 Q4) · `interactive-dlp.ts` same lines · `ScienceF2Chapter1NotesBlock.tsx:105` (endemicIntro COPY)
**SP:** 1.1.2

Evidence:
- DSKP p. 41, SP 1.1.2 Catatan: *"Kaedah memelihara dan memulihara biodiversiti termasuk spesis **endemik dan terancam**."* — two distinct categories.
- Textbook p. 6 Sains box defines endemic precisely: *"spesies yang hidup berkelompok di habitat yang terbatas di sesebuah lokasi tertentu"*. Latihan Formatif 1.1 Q3 asks for the meaning of endemic; **Q4 separately asks for examples of threatened species in Malaysia.**

Current behaviour: the live notes contain one endemic chip row and the COPY gloss *"Spesies endemik Malaysia — tiada di tempat lain di dunia"*. There is no definition of endemic in the notes body (the textbook definition appears only buried inside a `CheckYourself` accordion hint, `interactive-bm.ts:188`) and **no content at all on threatened species**. `checkYourself11` Q4 then asks *"Namakan satu spesies terancam yang terdapat di Malaysia"* and answers it with **Harimau Malaya and Gajah pygmy Borneo — two entries from AcadeMY's own endemic list**, teaching by implication that endemic = threatened.

Why it matters: the textbook and DSKP treat these as different concepts, and AcadeMY's own flashcard f54 (*"[Kesilapan Lazim] Adakah spesies endemik sama dengan spesies terancam? Tidak semestinya…"*) explicitly flags the conflation as a common student error — which the live notes then commit.

Targeted fix: promote the endemic definition into the rendered notes body, add a short `threatenedSpecies` treatment (definition + Malaysian examples + why they are threatened), and rewrite the Q4 hint so it does not reuse the endemic list as the answer.

---

## MEDIUM

| ID | Type | File / lines | SP | Evidence | Current behaviour | Why it matters | Targeted fix |
|---|---|---|---|---|---|---|---|
| **M-01** | PARTIAL | `interactive-bm.ts:229-238` & `:250-260`; `interactive-dlp.ts` same | 1.2.2 | Textbook p. 10 lists *"melakukan persenyawaan luar"* as an Amfibia trait; p. 11 lists *"melakukan persenyawaan dalam"* for Burung | Amphibian and bird trait lists omit fertilisation, while Fish, Reptile and Mammal lists include it | Fertilisation type is a discriminator in textbook Aktiviti 1.2, and AcadeMY's **own quiz q14** ("kumpulan vertebrata yang mengalami persenyawaan luaran" → Ikan dan amfibia) assesses it. The dead notes carry it correctly. | Add the missing trait to both groups in both languages |
| **M-02** | MISSING | live notes have no definition; only the gloss at `interactive-bm.ts:10` / `-dlp.ts:10` | 1.2.2 | Textbook p. 9 Sains box defines both terms precisely | The terms appear as trait chips and as a key question glossed *"(berdarah sejuk)/(berdarah panas)"*; neither is defined in the live notes | Quiz q8 and q15 both turn on the definition; the textbook deliberately avoids "berdarah panas/sejuk" as imprecise. Dead notes and flashcards f13/f14 define them correctly | Add a definitions block to the vertebrate section |
| **M-03** | CONFUSING | `interactive-*.ts`, `quizzes-*.ts`, `flashcards-*.ts`, `mindmap-*.ts`, `notes-*.ts` (all surfaces) | 1.2.2 | Textbook p. 9 spells it **"Homoioterma"** | AcadeMY uses **"Homeoterma"** everywhere | Both forms circulate in Malaysian usage, but exam wording follows the textbook. Consistency with the authority is the low-risk choice | Standardise on the textbook spelling, or gloss the variant once |
| **M-04** | CONFUSING | `interactive-bm.ts:279`; `quizzes-bm.ts:234-243, 341, 399-407`; `mindmap-bm.ts:88-90`; `flashcards-bm.ts` — **BM only** | 1.2.1, 1.2.2 | Textbook p. 12 Sains box and Rajah 1.7 use **"vaskular" / "tanpa vaskular"** | BM surfaces use **"berpembuluh" / "tidak berpembuluh"** | The textbook's own plant dichotomous key (Rajah 1.7, the exact key `quizzes-bm.ts` q24 reproduces) reads *"Tanpa vaskular"*. DLP correctly uses "vascular/non-vascular", so BM learners are the only ones facing unfamiliar exam wording | Adopt "vaskular" as primary with "(berpembuluh)" as gloss |
| **M-05** | MISSING | `interactive-bm.ts:123-154`; `interactive-dlp.ts:123-154`; `mindmap-*.ts:21-32` | 1.1.1 | DSKP p. 41: importance includes *"Menjana ekonomi seperti tempat rekreasi, pelancongan, **bioteknologi**, perubatan, bahan mentah industri"* and a separate *"**Sumber ekologi**"* | Six items present (matching the textbook's six illustrated categories). **Bioteknologi absent entirely**; *sumber ekologi* is only implicit inside "Imbangan alam"; the "menjana ekonomi" umbrella framing is absent | DSKP is the higher authority and is broader than the textbook here. `checkYourself11` Q2 asks how biodiversity supports the economy, so the framing is expected but not taught | Add a biotechnology item and group the economic sub-items under a "menjana ekonomi" heading |
| **M-06** | CONTRADICTORY | `flashcards-bm.ts:513-521` (f57) vs `:359-366` (f40); same in `flashcards-dlp.ts` | 1.2.1 | Textbook Rajah 1.6 (p. 14) starts the animal key at *poikiloterma / homoioterma*; the legs split belongs to Rajah 1.1 (invertebrate chart), not the key | f57 asks "…perbezaan utama yang membahagikan invertebrata pada langkah pertama **kekunci dikotomi haiwan**?" → "Ada kaki atau tanpa kaki". f40 correctly answers "Haiwan: bermula dengan poikiloterma/homeoterma" | Two cards in the same live deck give opposite answers about the same key's first couplet, conflating the classification chart with the dichotomous key | Reword f57 to reference Rajah 1.1's invertebrate classification, not the dichotomous key |
| **M-07** | PARTIAL | `DichotomousStarMap.tsx` (traversal only); no construction surface anywhere | 1.2.1 | **Mandatory SP verb is "Membezakan… dengan kekunci dikotomi"** — using a key. *Constructing* appears only in the DSKP **Catatan** column ("Menjalankan aktiviti membina kekunci dikotomi"), which the DSKP front matter states is suggested, not absolute | Star Map lets learners follow a key end-to-end; no surface asks them to choose a splitting characteristic or complete a couplet | Correctly **not** a mandatory-outcome gap. But the textbook assesses construction twice summatively (Latihan Sumatif 1 Q3 completes a key, Q6 builds one) and Aktiviti 1.3 requires it, so the evidence base for exam readiness is thinner than it looks | Optional: a "pick the characteristic that splits these two groups" round using organisms already in `animalBranches` |
| **M-08** | CONFUSING | `DichotomousStarMap.tsx:25` (default `restartLabel`) and `:87` (hard-coded "🌟 Identified:"); caller `ScienceF2Chapter1NotesBlock.tsx:338-342` never passes `restartLabel` | — | — | BM learners see English UI inside the BM interaction: **"🌟 Identified: …"** and **"↺ restart the key"** | The Star Map is the SP 1.2.1 interaction; its result line and reset control are untranslated for half the audience | Pass a localised `restartLabel` and lift the "Identified" string into `COPY[lang]` |
| **M-09** | MISSING | `interactive-bm.ts:201-210`; `interactive-dlp.ts:201-210` | 1.2.2 | Textbook p. 8: *"Ciri-ciri invertebrata berkaki adalah: mempunyai badan bersegmen; mempunyai kulit keras (rangka luar)"* | The "Ada kaki" group lists organisms with leg counts but states no defining characteristics | Quiz q23 and flashcard f42 both reason from "eksoskeleton keras", a trait the live notes never state. The dead notes state it (`notes-bm.ts:129`) | Add the two defining traits to the legged-invertebrate group |

---

## LOW

- **L-01** · INCONSISTENT · `interactive-bm.ts:200` uses "**Anemon laut**" where the textbook (p. 7, Gambar foto 1.6) uses "**Karang laut**"; `mindmap-bm.ts:61` and `flashcards-bm.ts:212` both use "**koral**" — three different words across three AcadeMY surfaces for the same textbook example.
- **L-02** · INCONSISTENT · Reptile example "Kura-kura" / "Turtle" (`interactive-bm.ts:248`, `interactive-dlp.ts:248`) where the textbook (p. 10) uses "**Penyu**"; in BM these are different animals. The dead notes use "penyu" correctly.
- **L-03** · PARTIAL · Dicot stem stated absolutely as "Berkayu" / "Woody" (`interactive-bm.ts:307`, `interactive-dlp.ts:307`); textbook Rajah 1.5 says "**Kebanyakan** pokok batang berkayu". The monocot row correctly keeps "Kebanyakan".
- **L-04** · CONFUSING · Star Map node 4 discriminates on **sirip/fins** (`interactive-bm.ts:22-26`); textbook Rajah 1.6 node 4 uses **insang/gills**. Both are valid for Ular vs Ikan bawal, but the divergence means the app's key and the book's key are not the same key.
- **L-05** · CONFUSING · The animal classification tree's root renders as a bare **"🐾"** with no text (`ScienceF2Chapter1NotesBlock.tsx:326`), and the plant tree is passed **no `rootLabel` at all** (`:332`), so it has no root node — textbook Rajah 1.3 labels it "Tumbuhan".
- **L-06** · NOT_RENDERED · `FlipCardItem.icon` (`interactive-types.ts:11`) never displays, because `FlipCard.tsx:37-46` shows the icon only when `imagePath` is absent and all four habitats supply images.
- **L-07** · CONFUSING · Flashcard prompt/answer count mismatches: f15 asks for "3 ciri ikan" and gives 5; f16 asks for "2 ciri unik amfibia" and gives 3 (`flashcards-bm.ts:137-138, 146-147`, mirrored in DLP).
- **L-08** · CONFUSING · Terminology drift from the textbook: "skorpion" for **kala jengking** (`flashcards-bm.ts:347`); "Burung kenyalang (rhinoceros hornbill)" for the textbook's **burung enggang** (`flashcards-bm.ts:412`, `notes-bm.ts:181`) — and the species-level "rhinoceros hornbill" is not stated by the textbook.
- **L-09** · CONFUSING · `quizzes-dlp.ts:234-240` stem/option grammar disagreement: *"Moss differs from fern and conifer because moss is… 'Reproduces by bearing cones'"*. DLP only.
- **L-10** · CONFUSING · Both mind maps carry two sibling top-level branches labelled "**1.2**" (`mindmap-bm.ts:55, 82`), where the textbook Rumusan (p. 16) nests Haiwan and Tumbuhan under one Pengelasan node.
- **L-11** · UNSUPPORTED · `interactive-types.ts:14-15` documents `imagePath` as *"Object path inside the academy-notes-images bucket"*, but every call site passes a bundled Vite asset URL. `getNotesImageUrl` handles both (`notes-images.ts:19-21`), so nothing breaks — the doc comment is stale.
- **L-12** · CONFUSING · `ScienceF2Chapter1NotesBlock.tsx:59` renders textbook *"bermandiri"* as *"survive and thrive there **independently**"* / *"terus hidup secara **berdikari**"*, and adds *"have evolved"* framing the Form 2 textbook does not use.

---

## DSKP Coverage Matrix

DSKP `1.0 BIODIVERSITI`, printed pp. 41–42. Each of the four SPs is expanded into its substantive curriculum requirements, drawn from the DSKP Standard Pembelajaran + Catatan/Nota and the textbook's operationalisation. **Status is judged against the LIVE learner surface.** Where the dead `notes-*.ts` already solves a row, that is noted — it does not change the status, because a learner cannot reach it (C-01).

Requirements marked *(activity)* come from the Catatan column and are, per the DSKP's own front matter, suggested rather than absolute — they are graded but not counted as mandatory-outcome failures.

### SP 1.1.1 — Menghuraikan dan berkomunikasi mengenai biodiversiti

| # | Requirement | Status | Evidence / issue |
|---|---|---|---|
| 1 | Definisi biodiversiti | COVERED | `ScienceF2Chapter1NotesBlock.tsx:59/94`; quiz q1; flashcard f1; mind map c1-1-1 — matches Textbook p. 4 |
| 2 | Bagaimana wujudnya biodiversiti (kepelbagaian habitat & cuaca) | COVERED | Same COPY paragraph + four habitat FlipCards (gurun/kutub/tanah/laut) matching Gambar foto 1.2; mind map c1-1-2 |
| 3 | Kepelbagaian genetik | COVERED | COPY paragraph; quiz q29; flashcard f3 — matches Sains box p. 4 |
| 4 | Kepentingan: sumber makanan | COVERED | `interactive-*.ts:124-128` |
| 5 | Kepentingan: keseimbangan alam / sumber ekologi | PARTIAL | "Imbangan alam" present; DSKP lists *sumber ekologi* as a **separate** bullet — not distinguished (M-05) |
| 6 | Kepentingan: menjana ekonomi — tempat rekreasi | COVERED | `interactive-*.ts:134-138` |
| 7 | Kepentingan: menjana ekonomi — pelancongan | COVERED | Named inside the recreation description ("destinasi eko-pelancongan") |
| 8 | Kepentingan: menjana ekonomi — **bioteknologi** | MISSING | Absent from every surface (M-05). DSKP p. 41 names it explicitly; the textbook does not |
| 9 | Kepentingan: menjana ekonomi — perubatan | COVERED | `interactive-*.ts:139-143`; quiz q19 |
| 10 | Kepentingan: menjana ekonomi — bahan mentah industri | COVERED | `interactive-*.ts:144-148` |
| 11 | Kepentingan: pendidikan | COVERED | `interactive-*.ts:149-153` |
| 12 | Malaysia sebagai 1 daripada 12 negara Mega Biodiversiti | COVERED | COPY paragraph; quiz q2; flashcard f2; mind map c1-1-4 |
| 13 | …dan bahawa status ini **perlu dipelihara** | PARTIAL | The fact is stated; the DSKP's obligation clause is not carried anywhere |
| 14 | *(activity)* Persembahan multimedia membincangkan yang di atas | PARTIAL | `checkYourself11` prompts discussion-style recall; no presentation task |

### SP 1.1.2 — Mewajarkan keperluan pengurusan biodiversiti yang berkesan

| # | Requirement | Status | Evidence / issue |
|---|---|---|---|
| 15 | Kesan aktiviti manusia terhadap biodiversiti | PARTIAL | One COPY sentence + quiz q20 only; no structured content, no mind-map branch (**H-03**). Solved in dead notes |
| 16 | Kaedah memelihara — instrumen perundangan (Akta Perlindungan Hidupan Liar 1972) | COVERED | Accordion `legalBody`; quiz q4; flashcard f6; mind map c1-3-1 |
| 17 | Kaedah memelihara — perlindungan habitat (taman negara, taman laut, hutan simpan, santuari) | COVERED | Accordion `habitatBody`; mind map c1-3-2 |
| 18 | Kaedah memulihara — program pembiakan (tapak semaian, penetasan penyu) | COVERED | Accordion `recoveryBody`; flashcard f55; mind map c1-3-3 |
| 19 | Pemuliharaan in situ | COVERED | `conservationMethods[0]`; quiz q11; flashcards f9/f21 — matches Sains box p. 6 |
| 20 | Pemuliharaan ex situ | COVERED | `conservationMethods[1]`; quiz q11/q25; flashcards f10/f56 |
| 21 | Spesies endemik — definisi | PARTIAL | Textbook definition appears only inside a `CheckYourself` **hint** (`interactive-*.ts:188`), not in the rendered notes body (**H-05**) |
| 22 | Spesies endemik — contoh Malaysia | COVERED | `endemicSpecies` chip row — all five textbook examples; quiz q5 |
| 23 | Spesies **terancam** | MISSING | Never defined or taught; the only prompt about it is answered with the endemic list (**H-05**) |
| 24 | *Mewajarkan* (justify, not merely list) | COVERED | Quiz q25 (justify ex situ), `checkYourself11` Q2, reflection item 2 |

### SP 1.2.1 — Membezakan organisma dengan kekunci dikotomi berdasarkan ciri-ciri sepunya

| # | Requirement | Status | Evidence / issue |
|---|---|---|---|
| 25 | Purpose of a dichotomous key (systematic identification by similarity/difference) | COVERED | `starMapIntro` COPY; flashcard f20; mind map c4; quiz q30 — matches Textbook p. 14 |
| 26 | Kuplet = exactly two paired statements | COVERED | Quiz q18; q30; flashcards f50/f58; mind map c4-1 |
| 27 | **Using/following a key to distinguish organisms** (the mandatory SP verb) | INCORRECT (BM) / COVERED (DLP) | Star Map traverses a real key end-to-end with the textbook's five organisms — but the BM bird/mammal couplet is ambiguous and contradicts AcadeMY's own mammal trait (**H-02**) |
| 28 | Animal key organism set + logic (Textbook Rajah 1.6) | PARTIAL | Correct organism set; node 4 discriminates on *sirip* where the textbook uses *insang* (L-04); node 3 defective in BM (H-02) |
| 29 | Plant key (Textbook Rajah 1.7) | PARTIAL | Reproduced faithfully in quiz q24 (both languages) and in the dead notes; **no interactive plant key** — the Star Map is animal-only |
| 30 | Classification by ciri sepunya / ciri berbeza | COVERED | `ClassificationTree` + `cotyledonCompare` + vertebrate trait tabs |
| 31 | Invertebrate segmentation as a classification criterion | MISSING | Absent from the live notes; official answer key p. 279 makes it the primary discriminator in Q6 (**H-01**) |
| 32 | *(activity)* Membina kekunci dikotomi | PARTIAL | Not a mandatory SP outcome (Catatan column only). Explained in prose/flashcards; no construction interaction (**M-07**) |

### SP 1.2.2 — Mencirikan kumpulan taksonomi utama

| # | Requirement | Status | Evidence / issue |
|---|---|---|---|
| 33 | Invertebrata vs Vertebrata | COVERED | `animalBranches` labels; quiz q6; flashcards f11/f22; mind map c2 |
| 34 | Invertebrate sub-groups — all four (tanpa kaki ×2 by segmentation, berkaki ×2 by leg pairs) | PARTIAL | Only two of four in the live notes (**H-01**); all four correct in both mind maps and the dead notes |
| 35 | Invertebrata berkaki defining traits (badan bersegmen + rangka luar) | MISSING | Absent from live notes (**M-09**); present in dead notes |
| 36 | Ikan — ciri sepunya | COVERED | `vertebrateGroups[0]` — all six textbook traits present |
| 37 | Amfibia — ciri sepunya | PARTIAL | Five of seven; **persenyawaan luar omitted** (**M-01**) though quiz q14 assesses it |
| 38 | Reptilia — ciri sepunya | COVERED | `vertebrateGroups[2]` — all five textbook traits |
| 39 | Burung — ciri sepunya | PARTIAL | Five of seven; **persenyawaan dalam omitted** (**M-01**) |
| 40 | Mamalia — ciri sepunya | COVERED | `vertebrateGroups[4]` — all five textbook traits (BM drops "rambut", feeding H-02) |
| 41 | Poikiloterma / Homoioterma — temperature regulation, defined | PARTIAL | Terms used as chips and glossed "berdarah sejuk/panas"; **no definition in live notes** (**M-02**); spelling variant (**M-03**) |
| 42 | Tumbuhan berbunga vs tidak berbunga | COVERED | `plantBranches`; quiz q9; flashcard f17; mind map c3 — matches Rajah 1.3 |
| 43 | Lumut / paku pakis / konifer — spora vs kon | COVERED | `plantBranches[0].chips` — exact match to Rajah 1.4; quiz q17; flashcards f18/f30 |
| 44 | Vaskular vs bukan vaskular | COVERED | Same chips + quiz q17/q28; terminology drift in BM (**M-04**) |
| 45 | Monokotiledon vs Dikotiledon — kotiledon, akar, daun, batang, contoh | COVERED | `cotyledonCompare` — all five textbook rows, both columns; quiz q10/q16; flashcards f31–f34 |
| 46 | Kotiledon as stored food for germination | COVERED | `plantBranches[1].detail`; flashcard f19 — matches Textbook p. 13 |
| 47 | Ciri membezakan kumpulan taksonomi utama *(DSKP Catatan offers "tumbuhan/haiwan/fungi" **atau** the five vertebrate groups)* | COVERED | AcadeMY covers the vertebrate-group route thoroughly. The DSKP wording is disjunctive, so this satisfies the requirement; fungi is not a gap |

### Totals

| Status | Count | Share |
|---|---|---|
| COVERED | 30 / 47 | **63.8 %** |
| PARTIAL | 13 / 47 | **27.7 %** |
| MISSING | 3 / 47 | **6.4 %** |
| INCORRECT / NOT_RENDERED | 1 / 47 | **2.1 %** |

MISSING: #8 (bioteknologi), #23 (spesies terancam), #31/#35 (invertebrate segmentation criterion & legged traits — counted once at #35, with #31 counted under SP 1.2.1).
INCORRECT/NOT_RENDERED: #27 (BM dichotomous key logic).

**These percentages describe the live surface only.** C-01 is a systemic defect sitting behind rows 15, 21, 23, 31, 34, 35, 37, 39 and 41 — nine of the seventeen non-COVERED rows are already authored correctly in the unreachable `notes-*.ts`. Restoring that surface alone would move coverage to roughly 83 % COVERED.

---

## Assessment Coverage Matrix

| SP | Required skill/knowledge | Notes (live) | Mind Map | Quiz | Flashcards | Interaction | Overall |
|---|---|---|---|---|---|---|---|
| 1.1.1 | Define biodiversity | ✅ | ✅ | ✅ q1 | ✅ f1 | — | **Supported** |
| 1.1.1 | How biodiversity arises (habitat/climate) | ✅ | ✅ | ❌ none | ❌ none | ✅ habitat FlipCards | **Supported (untested)** |
| 1.1.1 | Genetic diversity | ✅ | ✅ | ✅ q29 | ✅ f3 | — | **Supported** |
| 1.1.1 | Six importance categories | ✅ | ✅ | ✅ q19 (1 of 6) | ✅ f4/f37 | ✅ IconCardGrid | **Supported** |
| 1.1.1 | Economic framing incl. bioteknologi | ⚠️ partial | ⚠️ partial | ❌ | ❌ | ❌ | **Weak** |
| 1.1.1 | Malaysia = 12 mega-biodiversity nations | ✅ | ✅ | ✅ q2 | ✅ f2 | — | **Supported** |
| 1.1.2 | Human activities & their effects | ⚠️ 1 sentence | ❌ | ✅ q20 | ❌ | ❌ | **Weak — H-03** |
| 1.1.2 | Preservation methods (law, habitat, breeding) | ✅ | ✅ | ✅ q4 | ✅ f6/f55 | ✅ accordion | **Supported** |
| 1.1.2 | In situ / ex situ | ✅ | ✅ | ✅ q11/q25 | ✅ f9/f10/f21/f52 | ✅ tabs | **Strong** |
| 1.1.2 | Endemic species — definition | ⚠️ hint only | ❌ | ❌ | ✅ f7 | — | **Weak — H-05** |
| 1.1.2 | Threatened species | ❌ | ❌ | ❌ | ⚠️ f54 only | ❌ | **Not supported — H-05** |
| 1.1.2 | Justify the need for management | ✅ | — | ✅ q25 | ✅ f56 | ✅ reflection | **Supported** |
| 1.2.1 | Purpose of a dichotomous key | ✅ | ✅ | ✅ q30 | ✅ f20 | ✅ Star Map intro | **Supported** |
| 1.2.1 | Couplet structure | ✅ | ✅ | ✅ q18/q30 | ✅ f50/f58 | — | **Strong** |
| 1.2.1 | **Follow a key to distinguish organisms** | ⚠️ BM defective | ✅ | ✅ q21/q24 | ✅ f41/f49 | ⚠️ Star Map (BM defective) | **Compromised in BM — H-02** |
| 1.2.1 | Plant key | ❌ live notes | ✅ | ✅ q24 | ✅ f49 | ❌ no interaction | **Partial** |
| 1.2.1 | Construct/complete a key | ❌ | ❌ | ❌ | ⚠️ f57 (wrong) | ❌ | **Not supported (non-mandatory) — M-07** |
| 1.2.2 | Vertebrate/invertebrate distinction | ✅ | ✅ | ✅ q6 | ✅ f11/f22 | ✅ tree | **Strong** |
| 1.2.2 | Invertebrate 4-way sub-classification | ❌ 2 of 4 | ✅ | ✅ q12/q13 | ⚠️ f23/f38 | ❌ flattened | **Compromised — H-01** |
| 1.2.2 | Five vertebrate groups' traits | ⚠️ 3 of 5 complete | ✅ | ✅ q22/q26/q27 | ✅ f15/f16/f25/f39 | ✅ trait tabs | **Mostly supported — M-01** |
| 1.2.2 | Poikiloterma / Homoioterma | ⚠️ undefined | ✅ | ✅ q8/q15 | ✅ f13/f14/f47 | — | **Partial — M-02** |
| 1.2.2 | Plant classification (non-flowering trio) | ✅ | ✅ | ✅ q9/q17/q28 | ✅ f18/f29/f30/f46 | ✅ tree | **Strong** |
| 1.2.2 | Monocot vs dicot | ✅ | ✅ | ✅ q10/q16 | ✅ f31–f34 | ✅ compare columns | **Strong** |

### Quiz SP distribution (30 questions per language)

| SP | Questions | Count | Share | Classification |
|---|---|---|---|---|
| 1.1.1 | q1, q2, q3, q19, q29 | 5 | 16.7 % | **ADEQUATELY ASSESSED** — but cognitively shallow: q2 and q3 are single-fact recall (a number, a date), and q3 tests a "Sejarah" sidebar rather than a curriculum requirement. Only q29 reaches analysis. Requirement #2 (how biodiversity arises) is **NOT ASSESSED**. |
| 1.1.2 | q4, q5, q11, q20, q25 | 5 | 16.7 % | **ADEQUATELY ASSESSED** on management; q25 provides genuine justification-level demand matching the SP verb. **Threatened species NOT ASSESSED.** |
| 1.2.1 | q18, q21, q24, q30 | 4 | 13.3 % | **UNDER-ASSESSED.** Two of the four (q18, q30) test the *definition* of a couplet rather than key use. Only q21 and q24 exercise traversal — and q21 carries the H-02 ambiguity in BM. No question asks the learner to complete or build a key, which the textbook does twice summatively. |
| 1.2.2 | q6, q7, q8, q9, q10, q12, q13, q14, q15, q16, q17, q22, q23, q26, q27, q28 | 16 | 53.3 % | **OVER-ASSESSED** by volume — but the excess is not merely padding: q15, q23, q26, q27 and q28 are strong reasoning items, and q28 is an excellent misconception-breaker. The redundancy sits in the Easy tier (q6, q7, q10 are near-tautological recall; q7 asks a count). |

Cognitive-demand note: the 10/10/10 Easy/Medium/Hard split is well constructed, and the Hard tier genuinely reasons rather than restating vocabulary. The imbalance to correct is not "add more 1.2.1 questions" but "replace three Easy 1.2.2 recall items with 1.2.1 key-application items", since key *application* is the one SP whose evidence is thinnest and whose sole interaction is defective in BM.

---

## Quiz Question-by-Question Audit

30 BM + 30 DLP, all read in full and individually checked against DSKP pp. 41–42 and Textbook pp. 2–19. `answerIndex` values are identical between languages at every matching question.

| # | Question (abridged) | Diff. | SP | Keyed answer | Verdict | Note |
|---|---|---|---|---|---|---|
| 1 | Maksud biodiversiti / meaning of biodiversity | E | 1.1.1 | Kepelbagaian organisma | ✅ OK | Textbook p. 4 |
| 2 | Malaysia = 1 of ? mega-biodiversity nations | E | 1.1.1 | 12 | ✅ OK | Textbook p. 4 |
| 3 | Hari Biodiversiti Sedunia date | E | 1.1.1 | 22 Mei | ✅ OK | Textbook p. 5 Sejarah box — sidebar trivia, not a DSKP requirement |
| 4 | Which Act bans killing/trade | E | 1.1.2 | Akta Perlindungan Hidupan Liar 1972 | ✅ OK | Textbook p. 6 |
| 5 | Example of endemic species | E | 1.1.2 | Bunga rafflesia | ✅ OK | Textbook p. 6 |
| 6 | Animal without backbone | E | 1.2.2 | Invertebrata | ✅ OK | Low demand |
| 7 | How many vertebrate groups | E | 1.2.2 | 5 | ✅ OK | Counting question; minimal evidence value |
| 8 | Body temp changes with surroundings | E | 1.2.2 | Poikiloterma | ✅ OK | Textbook p. 9 |
| 9 | Non-flowering EXCEPT | E | 1.2.1/1.2.2 | Pokok padi | ✅ OK | Textbook pp. 12–13 |
| 10 | Seed with one cotyledon | E | 1.2.2 | Monokotiledon | ✅ OK | Textbook p. 13 |
| 11 | In situ vs ex situ | M | 1.1.2 | Habitat asal vs luar | ✅ OK | Textbook p. 6 Sains box |
| 12 | Cacing pita & lintah classification | M | 1.2.2 | Tanpa kaki, badan bersegmen | ✅ OK | Textbook p. 8 — **but assesses a split the live notes never teach, and names an organism absent from the live chip list (H-01)** |
| 13 | Leg pairs of ants/butterflies | M | 1.2.1 | Tiga pasang | ✅ OK | Textbook p. 8 |
| 14 | Which groups have external fertilisation | M | 1.2.2 | Ikan dan amfibia | ✅ OK | Textbook pp. 9–10 — **but the live amphibian trait list omits fertilisation (M-01)** |
| 15 | Why birds are homeothermic despite laying eggs | M | 1.2.2 | Suhu badan malar | ✅ OK | Strong reasoning item |
| 16 | Monocot vs dicot roots | M | 1.2.2 | Serabut vs tunjang | ✅ OK | Rajah 1.5 |
| 17 | Moss vs fern/conifer | M | 1.2.2 | Tidak berpembuluh | ✅ OK | Textbook p. 12; BM terminology drift (M-04) |
| 18 | Meaning of "kuplet" | M | 1.2.1 | Dua penyataan (a)/(b) | ✅ OK | Textbook p. 14 |
| 19 | Herbs → medicine = which importance | M | 1.1.1 | Perubatan | ✅ OK | Textbook p. 5 |
| 20 | Effect of excessive deforestation | M | 1.1.2 | Kehilangan habitat & sumber makanan | ✅ OK | Gambar foto 1.4 caption — the only threat-side assessment |
| 21 | Key path: homeoterma + berbulu | H | 1.2.1 | Ayam | ⚠️ **BM defective** | Textbook Rajah 1.6 node 3 reads "**berbulu pelepah**"; BM drops "pelepah", making the couplet ambiguous for Singa and contradicting q22 (**H-02**). DLP ("Feathered/Non-feathered") is correct |
| 22 | Furred + live birth + nurses young | H | 1.2.2 | Mamalia | ✅ OK | But its "berbulu → mammal" premise is the mirror image of q21's "berbulu → Ayam" (H-02) |
| 23 | Why insects succeed despite being poikilothermic | H | 1.2.2 | Exoskeleton / size / reproduction | ✅ OK | 950,000 figure ✓ Textbook p. 8. Reasoning is beyond the chapter text but sound and KBAT-appropriate; relies on "eksoskeleton", a trait the live notes omit (M-09) |
| 24 | Plant key path → seed-bearing | H | 1.2.1 | Gnetum sp. | ✅ OK | Exact reproduction of Textbook Rajah 1.7 — the strongest 1.2.1 item in the bank |
| 25 | Why ex situ still matters | H | 1.1.2 | Monitoring / breeding / research | ✅ OK | Valid extension of Textbook p. 6 |
| 26 | Scaly + shelled eggs + internal fert. + poikilothermic | H | 1.2.2 | Reptilia | ✅ OK | Textbook p. 10 |
| 27 | Amphibian vs reptile eggs | H | 1.2.2 | No shell vs shelled | ✅ OK | Textbook pp. 10 |
| 28 | "All vascular plants are flowering" — true? | H | 1.2.2 | Incorrect; ferns & conifers | ✅ OK | Excellent misconception-breaker |
| 29 | Genetic diversity → survival of sudden change | H | 1.1.1 | Gene variation → some individuals fit | ✅ OK | Extends Sains box p. 4; not contradicted |
| 30 | Why exactly two choices per couplet | H | 1.2.1 | "Dikotomi" = divided into two | ✅ OK | Textbook p. 14 |

**Wrong answer keys in the graded quiz bank: 0.** Duplicates/near-duplicates: none. Ambiguity: q21 (BM only). The two wrong answer keys in this chapter (C-02, C-03) are in the **notes-embedded mini quiz**, a separate dataset from `quizzes-*.ts`.

BM/DLP: 30/30 `answerIndex` parity confirmed; all 30 pairs read in both languages; options and distractor logic match. The only divergences are q21 (BM ambiguous / DLP correct), q17 DLP grammar (L-09), and q24 terminology (BM "berpembuluh" / DLP "vascular", M-04).

---

## Flashcard Audit

`flashcards-bm.ts` (60 cards) and `flashcards-dlp.ts` (60 cards), both read in full. **Live** — reached via `registry.getChapter(...).flashcards` (`src/lib/flashcard-availability.ts:46`). Three decks: Asas (f1–20), Pemahaman (f21–40), Peperiksaan (f41–60, tagged `[KBAT]` / `[Kesilapan Lazim]` / `[Tip Peperiksaan]` / `[Fakta Penting]`).

This is the strongest dataset in the chapter. Every enrichment fact I spot-checked is genuine textbook content, not invented: 950,000 insect species (f43 ✓ p. 8), 742 Malaysian bird species with the 522/192/52 breakdown (f44 ✓ p. 11, exact), Sarawak's hornbill (f45 ✓ p. 11), rafflesia's parasitic traits (f51 ✓ p. 3).

| ID | Card | Issue | Severity |
|---|---|---|---|
| f57 | "Perbezaan utama yang membahagikan invertebrata pada langkah pertama **kekunci dikotomi haiwan**?" → "Ada kaki atau tanpa kaki" | **Contradicts f40**, which correctly says the animal key starts at poikiloterma/homeoterma. Conflates Rajah 1.1 (invertebrate classification chart) with Rajah 1.6 (the dichotomous key) | **M-06** |
| f15 | "Berikan **3** ciri ikan" → back lists **5** | Prompt/answer count mismatch | L-07 |
| f16 | "Berikan **2** ciri unik amfibia" → back lists **3**; omits persenyawaan luar | Count mismatch + same gap as M-01 | L-07 / M-01 |
| f23 | "Tanpa kaki: span, **koral**, lintah (sebahagian bersegmen)" | Uses "koral" where the live notes use "Anemon laut" and the textbook uses "Karang laut"; "sebahagian bersegmen" is vaguer than the textbook's clean two-way split | L-01 |
| f38 | ">3 pasang: labah-labah, lipan, udang, **skorpion**" | Anglicism for the textbook's "kala jengking"; also omits belangkas (Textbook p. 9) | L-08 |
| f45 | "Burung **kenyalang** (rhinoceros hornbill)" | Textbook p. 11 says "burung **enggang**"; the species-level identification is AcadeMY's addition | L-08 |
| f14, f36, f47 | "Homeoterma" | Textbook spells "Homoioterma" | M-03 |
| f29, f35, f46 | "berpembuluh / tidak berpembuluh" | Textbook uses "vaskular / tanpa vaskular" | M-04 |

**Correctly handled and worth noting:** f54 (`[Kesilapan Lazim]` — endemik ≠ terancam) and f27 (burung = bulu/feathers vs mamalia = bulu tebal/rambut) both state precisely the distinctions that the live notes get wrong (H-05, H-02). The flashcards are more curriculum-accurate than the notes they accompany.

**No flashcard content exists that is disconnected from the live chapter** — both decks are registry-wired and reachable.

**BM/DLP:** 60/60 count parity; identical `id` sequence and deck structure; spot-checked translations preserve meaning. No MISSING_BM / MISSING_DLP / ANSWER_MISMATCH found in this dataset.

---

## Mind Map Audit

`mindmap-bm.ts` (113 lines) and `mindmap-dlp.ts` (113 lines) — both **live** via `registry.ts:3361, 3375`. Structure: root → four branches (1.1 Kepelbagaian Organisma; 1.2 Klasifikasi Haiwan; 1.2 Klasifikasi Tumbuhan; Kekunci Dikotomi), 45 nodes each.

**Scientific correctness: no errors found.** Hierarchy mirrors Textbook Rumusan (p. 16) closely.

**Notable strength — the mind map is more curriculum-complete than the live notes.** `mindmap-bm.ts:61-64` / `mindmap-dlp.ts:61-64` correctly preserves the full four-way invertebrate split that `ClassificationTree` flattens:
```
"Tanpa kaki, tanpa segmen: span, koral, siput"     ← matches Textbook Rajah 1.1
"Tanpa kaki, bersegmen: lintah, cacing pita"
"3 pasang kaki: semut, rama-rama, lipas"
">3 pasang kaki: labah-labah, lipan, udang"
```
This is direct internal evidence for H-01: two AcadeMY surfaces disagree about the shape of the same taxonomy, and the *live notes* surface is the wrong one.

| ID | Issue | File / lines | Severity |
|---|---|---|---|
| — | **Missing major curriculum branch: "Kesan aktiviti manusia terhadap biodiversiti."** Textbook Rumusan p. 16 carries it as a named node under Pengurusan; both mind maps jump straight to the three preservation levers | `mindmap-bm.ts:33-42`, `mindmap-dlp.ts:33-42` | **H-03** |
| — | "koral" here vs "Anemon laut" in the live notes vs "Karang laut" in the textbook | `mindmap-bm.ts:61` | L-01 |
| — | "berpembuluh" (BM) where the textbook uses "vaskular"; DLP correctly uses "non-vascular/vascular" | `mindmap-bm.ts:88-90` | M-04 |
| — | Two sibling top-level branches both labelled "1.2"; textbook Rumusan nests both under one Pengelasan node | `mindmap-bm.ts:55, 82` (and DLP) | L-10 |
| — | c4-3 states the plant key starts "berbunga/tidak berbunga"; Rajah 1.7 orders it 1(a) Tidak berbunga, 1(b) Berbunga | `mindmap-bm.ts:109` | Trivial |
| — | DLP c1-3-3 "Reproductive programmes" is an awkward rendering of "program pembiakan" (breeding programmes) | `mindmap-dlp.ts:39` | L-08 |

**No out-of-syllabus material was introduced** in either mind map, and no node contradicts the notes on scientific content — the divergences are completeness (invertebrates: mind map richer) and terminology.

**BM/DLP semantic parity:** node-for-node identical structure; no MISSING_BM/MISSING_DLP; no classification differences.

---

## Interaction / Practical Audit

`ScienceF2Chapter1NotesBlock.tsx` (390 lines), `FlipCard.tsx`, `IconCardGrid.tsx`, `ChipRow.tsx`, `ClassificationTree.tsx` (162), `DichotomousStarMap.tsx` (118), `SelfReflectionChecklist`, all read in full.

| Interaction | Implementation | Teaches or merely displays? | Verdict |
|---|---|---|---|
| Habitat flip-cards | `FlipCard.tsx:20-61` — 4 cards, image front / `fact` back | **Teaches.** The four habitats match Gambar foto 1.2 exactly, and each `fact` describes an *adaptation* (thick fur, fat layers, huddling), which is precisely the mechanism Textbook p. 4 gives for how biodiversity arises | ✅ Good |
| Importance grid | `IconCardGrid.tsx` — 6 cards with `detail` | Displays. Adequate for a list-type requirement | ✅ Good |
| Conservation accordion + in/ex situ tabs | `ScienceF2Chapter1NotesBlock.tsx:273-301` | Displays, correctly. Matches Textbook p. 6 Sains box | ✅ Good |
| Endemic species chips | `ChipRow` tone="green" | Displays names only — no definition, no threat status | ⚠️ **H-05** |
| Animal `ClassificationTree` | `ClassificationTree.tsx:86-132`; branches collapsed by default (`selectedId` starts `null`); `VertebrateGroupTabs` defaults to index 0 | **Teaches the vertebrate half** (five tabbed groups with traits + examples — good). **Fails the invertebrate half**: `chipGroups` renders exactly what the data provides, and the data is a flattened two-way split | ⚠️ **H-01** |
| Plant `ClassificationTree` + `cotyledonCompare` | Same component; `compareColumns` renders a 5-row side-by-side | **Teaches.** The comparison table reproduces Rajah 1.5 completely | ✅ Good (root unlabelled, L-05) |
| **`DichotomousStarMap`** | `DichotomousStarMap.tsx:21-118`. `leavesOf()` computes surviving organisms per node; non-surviving stars dim to `opacity-15 grayscale`; progress dots from `maxDepth`; `onIdentify` fires XP | **Genuinely teaches the SP 1.2.1 skill.** The dimming makes elimination visible, which is exactly what a dichotomous key does conceptually. The tree is generic and correctly implemented — I traced all five paths and each terminates at the right organism *given its own labels* | ⚠️ **H-02 in BM** |
| Mini-quiz | `MiniQuizCard`, `ScienceF2Chapter1NotesBlock.tsx:127-194`; `addXp(15)` on keyed answer | **Actively teaches two incorrect things** | ❌ **C-02, C-03** |
| Self-reflection checklist | 4 "I can…" items mirroring Textbook Refleksi Kendiri p. 17 | Metacognitive closure | ✅ Good |
| `MiniInvestigation` | `notes.tsx:2120`, added because `isScienceDiscovery` is true | Generic across science chapters, not Bab-1-specific | — |

### SP 1.2.1 verdict — can the learner actually distinguish organisms USING a key?

- ✅ **Understand what a key is** — `starMapIntro` COPY, flashcards f20/f50/f58, quiz q18/q30.
- ✅ **Follow a key end-to-end** — the Star Map is a real traversal with the textbook's own five organisms, not a slideshow. **DLP: fully works.**
- ❌ **BM: the traversal is unsound at node 3.** "Berbulu / Tidak berbulu" does not separate Ayam from Singa given AcadeMY's own mammal trait "Berbulu". A BM learner reasoning from the notes reaches the wrong leaf.
- ⚠️ **Plant keys have no interaction** — only quiz q24. Given the textbook devotes Rajah 1.7 and a full page to it, one-sided coverage.
- **Construction is not required by the SP verb** (Catatan-column activity only) and is correctly *not* treated as a mandatory failure — recorded as M-07.

---

## BM / DLP Parity

Structural parity is exact: `interactive` 352/352 lines, `quizzes` 443/443 (30/30 questions, identical `answerIndex`), `flashcards` 549/549 (60/60 cards), `mindmap` 113/113 (45/45 nodes), `notes` 367/364. No count divergence anywhere.

Systematic comparison across all twelve required dimensions:

| Dimension | Result | Detail |
|---|---|---|
| Notes prose | ⚠️ Equivalent but duplicated | All narrative lives in `COPY` (`ScienceF2Chapter1NotesBlock.tsx:22-125`), not in content files — BM and DLP prose are independently maintained strings, a drift risk |
| Headings | ✅ Parity | `section11`/`section12` etc. mirror |
| Definitions | ✅ Parity (both dropped) | The 10 keyword definitions match in meaning — and are equally unrendered in both (**H-04**) |
| Examples | ⚠️ Minor divergence | BM "Kura-kura" / DLP "Turtle"; BM "Anemon laut" / DLP "Sea anemone" — both diverge from the textbook equally |
| Classification labels | ❌ **SEMANTIC MISMATCH** | BM "Berbulu / Tidak berbulu" (ambiguous) vs DLP "Feathered / Non-feathered" (correct) — **H-02, BM only** |
| | ❌ **SEMANTIC MISMATCH** | BM "berpembuluh / tidak berpembuluh" vs DLP "vascular / non-vascular"; **DLP matches the textbook, BM does not** — M-04 |
| Visuals | ✅ Parity | Same components, same image assets (`rafflesia`, `desert`, `polar`, `soil`, `sea`) shared by both |
| Quiz questions | ✅ Parity | 30/30, faithful translations |
| Answers | ✅ Parity | All 30 `answerIndex` identical; both mini-quiz items share the same two errors (C-02, C-03) — the defects are language-symmetric |
| Explanations | ✅ Parity | Meaning-preserving throughout |
| Flashcards | ✅ Parity | 60/60, same deck structure and tags |
| Mind map | ✅ Parity | 45/45, identical shape; same missing human-impact branch |
| Interactions | ❌ **MISSING_BM localisation** | `DichotomousStarMap.tsx:87` hard-codes "🌟 Identified:" and `:25` defaults `restartLabel` to "↺ restart the key"; `ScienceF2Chapter1NotesBlock.tsx:338-342` never passes a BM label. **BM learners see English UI inside the BM interaction** — M-08 |
| Difficulty | ✅ Parity | Identical Easy/Medium/Hard tagging |

Classified defect types found: **SEMANTIC MISMATCH ×2** (H-02, M-04 — both BM-disadvantaging), **MISSING_BM ×1** (M-08, UI localisation), **TRANSLATION ERROR ×1** (L-09, DLP q17 grammar). No ANSWER_MISMATCH, no DIFFICULTY_MISMATCH, no MISSING_DLP.

**Net assessment: parity is structurally excellent but not semantically equal.** On the two points where the languages diverge in meaning, **DLP is the correct one and BM is the defective one** — the reverse of the usual pattern, and material because BM is the majority-stream language.

**Limitation:** see Audit Limitations — no DLP-stream English textbook was supplied, so DLP strings were verified by translation equivalence against the BM textbook only.

---

## Rendering / Implementation Defects

Academic defects caused by implementation rather than authored text:

| # | Defect | Location | Consequence |
|---|---|---|---|
| 1 | **Legacy dataset served nowhere** — `activeChapter.notes` sits in the final `else` of a ternary chain that resolves 153 lines earlier at `sciF2C1Data` | `notes.tsx:1956` vs `:2109`; `registry.ts:3362, 3376` | 731 lines of correct, textbook-faithful notes across two languages are unreachable — **C-01** |
| 2 | **Renderer discards authored body text** — component maps `keywords` to `.term`, and the receiving component has no definition slot | `ScienceF2Chapter1NotesBlock.tsx:243`; `ChipRow.tsx:4` | 10 definitions per language never displayed — **H-04**. Same defect class as Form 1's `AccuracyTargets`; worth a codebase sweep |
| 3 | **Hard-coded prose in the component rather than the content layer** — every substantive paragraph lives in `COPY`, not in `SciF2C1Content` | `ScienceF2Chapter1NotesBlock.tsx:22-125` | Content edits require a component change; BM and DLP prose drift independently; and it is why C-01's data has no path back into the UI without a schema change |
| 4 | **Language fallback shows the wrong language** — `restartLabel` defaults to English and is never overridden; "Identified:" is hard-coded | `DichotomousStarMap.tsx:25, 87`; caller `:338-342` | English UI inside the BM experience — **M-08** |
| 5 | **Component hard-codes a contradictory label path** — the BM key's choice labels ("Berbulu"/"Tidak berbulu") are rendered verbatim by `DichotomousStarMap.tsx:101` and contradict the mammal trait rendered by `ClassificationTree` on the same page | `interactive-bm.ts:36-42` + `DichotomousStarMap.tsx:101` | The SP 1.2.1 interaction produces a false inference in BM — **H-02** |
| 6 | **Data-shape flattening loses a taxonomy level** — `ClassificationBranch.chipGroups` supports arbitrary nesting depth of 1 only; the invertebrate hierarchy needs 2 | `interactive-types.ts:41-48`; `ClassificationTree.tsx:66-80` | Even with correct data, the current type cannot express Rajah 1.1's four-way split as a hierarchy — a schema change is needed for **H-01**, not just a data edit |
| 7 | **Chapter-specific type silo** — chapter 1 uses `sciF2C1Data`/`interactive-types.ts` while chapters 2–13 use `sciF2InteractiveData`/`form2/science/interactive-types.ts` | `types.ts:300, 302`; `registry.ts:3363` vs `:3633` | Chapter 1 is the only Form 2 science chapter outside the shared interactive contract; fixes here do not propagate, and it is why the `notes` fallback ordering differs |
| 8 | **Authored field never displayed** — `FlipCardItem.icon` renders only when `imagePath` is absent; all four habitats have images | `FlipCard.tsx:37-46`; `interactive-*.ts:93-122` | Cosmetic dead data — L-06 |
| 9 | **Stale type documentation** — `imagePath` documented as a Supabase bucket object path; all call sites pass bundled Vite URLs | `interactive-types.ts:14-15` | No runtime effect (`notes-images.ts:19-21` handles both); misleads future authors — L-11 |

**Not defects (checked and cleared):** no broken route; `notes.tsx:366-376` correctly gates the chapter; both registry entries are reachable; quiz (`quizzes.tsx:16055`) and flashcards (`flashcard-availability.ts:46`) are correctly wired for both languages; no array index errors in `MiniQuizCard`, `VertebrateGroupTabs`, or `DichotomousStarMap` path handling; `getNotesImageUrl` resolves both path forms; no external/QR dependency anywhere.

---

## Human Review Required

1. **Architectural decision on the duplicate notes datasets (C-01).** Restoring `notes-*.ts` to the render path versus porting its content into `SciF2C1Content` is a product decision with different costs — the former is a small routing change that immediately closes nine coverage gaps; the latter preserves the interactive house style but needs schema work (defect #6 above) and a fresh authoring pass. This report does not choose; it establishes that the current state — two divergent datasets, one silently dead — is not tenable.

2. **Errata authority (provenance).** `Errata.pdf` self-declares that no KPM- or Karangkraf-hosted original could be located, and carries no date. It reports no Bab 1 factual correction, so nothing in this audit turns on it — but **no Bab 1 finding here should be described as "errata-verified"**, and if an officially hosted erratum surfaces, the affected items should be re-run. The dead QR resource on textbook p. 6 is confirmed not to affect AcadeMY (no learner-facing broken link).

3. **DLP textbook absent.** See Audit Limitations. A curriculum owner should confirm whether a DLP-stream *Science Form 2* textbook exists as an authority for the English strings, or whether translation-equivalence against the BM textbook is the accepted standard.

4. **Terminology policy — two open decisions.** (a) "Homeoterma" (AcadeMY, all surfaces) vs "**Homoioterma**" (Textbook p. 9). (b) "berpembuluh/tidak berpembuluh" (AcadeMY BM) vs "**vaskular/tanpa vaskular**" (Textbook p. 12 and Rajah 1.7). Both AcadeMY forms are recognisable Malay, but exam wording follows the textbook, and DLP already uses the textbook form for (b). This is an exam-alignment call, not an engineering one.

**Explicitly NOT requiring human review:** C-02. There is no textbook-versus-reality conflict there — the official KPM answer key (p. 279) and general scientific practice both hold that a dichotomous key can classify non-living things. AcadeMY contradicts both. It is a straightforward correction.

---

## Audit Limitations

1. **No DLP-stream English textbook was supplied.** Only the BM *Sains Tingkatan 2* (KPM2017) was provided. Every English string in `interactive-dlp.ts`, `quizzes-dlp.ts`, `flashcards-dlp.ts`, `mindmap-dlp.ts`, `notes-dlp.ts` and the `COPY.en` block was checked by **translation equivalence against the BM textbook**, not against its own authority. DLP-specific wording divergences cannot be ruled out. **No claim of 100 % DLP textbook verification is made.**

2. **Errata provenance is limited** (see Human Review §2). The errata dimension of this audit is *advisory*, not verified-authoritative.

3. **No browser or runtime was used.** All rendering conclusions are from static code analysis of the component tree, the ternary chain in `notes.tsx`, and the sub-component props. C-01 in particular is established by reading the control flow (`sciF2C1Data` at line 1956 precedes `notes` at line 2109 in one chain, both truthy) rather than by observing the running app. This is a strong structural argument but was not confirmed by execution.

4. **Dynamic/stateful UI was not exercised.** `ClassificationTree` collapse state, `VertebrateGroupTabs` selection, `FlipCard` flip state, Star Map traversal, `SelfReflectionChecklist` persistence and XP awards were reasoned from source, not clicked.

5. **Image assets were not opened.** `rafflesia.jpg`, `desert.jpg`, `polar.jpg`, `soil.jpg`, `sea.jpg` were confirmed to be imported and wired, but their visual content was not inspected — I cannot confirm the polar image shows a polar habitat, etc.

6. **Mobile readability was not measured.** Assessed only from Tailwind classes (`grid-cols-2 sm:grid-cols-4`, `h-[150px]`, `text-[10px]` star labels, `overflow-x` behaviour). The Star Map's 16×16 organism circles with `text-[10px]` labels are a plausible small-screen legibility risk that code inspection cannot settle.

7. **Textbook figure content was read as extracted text.** Rajah/Gambar foto labels came through PDF text extraction; a small number of caption tokens in Gambar foto 1.6 (p. 7) did not extract cleanly (one organism name is ambiguous — likely "ubur-ubur"). This does not affect any finding.

8. **Scope.** Only Bab 1 was audited. Errata items for pp. 53, 71, 151, 173 (Bab 3, 7, 8) were read but not applied to any chapter.

---

## Comparison with the previous report

Read only after the findings above were finalised, per instruction.

The previous report returned **PASS / 0 release blockers**. That verdict does not survive this pass, and the reason is a single methodological gap: **it never traced the render path.** Its §4 states *"Source checked: `notes-bm.ts` (367 lines, read in full)"* and grades the chapter's curriculum coverage almost entirely against that file — marking Human impact, Spesies endemik definition, Poikiloterma/Homoioterma, the 5-group vertebrate table and both dichotomous keys as **COVERED**. Every one of those rows is COVERED *in a file learners cannot reach*.

| Item | Previous report | This report | Why the difference |
|---|---|---|---|
| Legacy `notes-*.ts` render status | Treated as the learner-facing notes (§4) | **C-01 — dead code, unreachable** | Previous pass audited data files without tracing `notes.tsx`'s ternary chain |
| Mini-quiz "dichotomous key / non-living things" | Listed as "Good" (§8) | **C-02 — contradicts official KPM answer key, p. 279** | Previous pass did not consult the textbook's Jawapan section |
| Mini-quiz "gills as an adult" | Not examined | **C-03 — stem contradicts its own explanation** | Not audited item-by-item |
| Invertebrate segmentation | §12-A: minor, "one surface only", non-blocking | **H-01 — missing from the only live surface; officially examined twice (p. 279 Q3, Q6)** | Severity was assessed on the assumption that notes + mind map were both live |
| BM key "Berbulu" ambiguity | §6: q21 "Path verified… correct" | **H-02 — BM contradicts AcadeMY's own mammal trait; DLP correct** | The previous report quoted "berbulu **pelepah**" from the textbook at its own §3 line 122, then did not check that AcadeMY dropped "pelepah" |
| Keyword definitions | Not examined | **H-04 — all 10 dropped at the render boundary** | Render-boundary defects were out of scope |
| Human impact on biodiversity | "COVERED" (§4, citing `notes-bm.ts:57-58`) | **H-03 — one sentence live; absent from mind maps** | Same dead-file issue |
| Flashcards | "No errors found across all 60 cards" | **M-06 — f57 contradicts f40** | Cards not cross-checked against each other |
| BM/DLP parity | "strongest parity result of any chapter" | **Two semantic mismatches, both BM-disadvantaging** | Parity was assessed structurally (counts, `answerIndex`) rather than semantically |
| Dichotomous-key **construction** | Escalated to P1, then downgraded to P2 | **M-07 — agreed: Catatan-column activity, not a mandatory SP outcome** | **This one conclusion I confirm.** The SP verb is *membezakan… dengan* (use), not *membina* (construct) |

The previous report's factual spot-checks were sound where it looked — the megabiodiversity figure, the 1972 Act, in situ/ex situ, monocot/dicot, the 742-bird and 950,000-insect enrichment facts are all genuine textbook content, and I reached the same conclusion independently. Its error was scope, not accuracy: it audited the repository's content rather than the learner's experience, and one dead `else` branch separated the two.

---

## Final Verdict

# FAIL — HUMAN REVIEW REQUIRED

The chapter fails on the criteria set out for this audit:

- **3 CRITICAL issues**, comprising one systemic rendering defect that makes a complete authored chapter dataset unreachable (C-01), and **two wrong answer keys inside the notes-embedded mini quiz that award XP for incorrect answers** — one of which (C-02) directly contradicts the official KPM answer key printed on textbook p. 279.
- **5 HIGH issues**, including a mandatory DSKP discussion point reduced to a single sentence (H-03), a taxonomy level missing from the only live surface while being officially examined twice (H-01), and an SP 1.2.1 interaction whose key logic is unsound in BM (H-02).
- **3 mandatory curriculum requirements outright MISSING** and 13 PARTIAL, against 30 COVERED.

**HUMAN REVIEW REQUIRED** attaches to four items that are decisions rather than defects: the architectural resolution of the duplicate notes datasets, the errata's self-disclaimed provenance, the absent DLP textbook, and two terminology-alignment calls. It does **not** attach to C-02 — that item is unambiguous and should simply be corrected.

The underlying content quality here is genuinely high. The quiz bank contains zero wrong answer keys across 60 graded questions in two languages, the flashcards are accurate and well-tiered, the mind maps are curriculum-faithful, and the dead `notes-*.ts` files are the best-written notes dataset in this audit. **This chapter fails on delivery, not on scholarship** — most of what is missing from the learner's screen already exists, correct, in the repository.

---

**REPOSITORY LEARNER CONTENT MODIFIED: NO**
**AUDIT ONLY: YES**

**TOTAL CRITICAL: 3**
**TOTAL HIGH: 5**
**TOTAL MEDIUM: 9**
**TOTAL LOW: 12**

**COVERED CURRICULUM REQUIREMENTS: 30 / 47 (63.8 %)**
**PARTIAL: 13 / 47 (27.7 %)**
**MISSING: 3 / 47 (6.4 %)**
**INCORRECT / NOT RENDERED: 1 / 47 (2.1 %)**

*(Coverage is measured against the live learner surface. Nine of the seventeen non-COVERED requirements are already authored correctly in the unreachable `notes-*.ts`; resolving C-01 alone would raise COVERED to approximately 83 %.)*

**No claim of 100 % verification is made.** All 47 curriculum requirements are explicitly mapped, but three evidence gaps remain open: the absent DLP textbook, the errata's unofficial provenance, and the absence of runtime/browser verification for the rendering conclusions.
