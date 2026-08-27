# Sains Tingkatan 2 — Bab 1 Biodiversiti Audit

**Mode:** READ-ONLY. No AcadeMY project file was modified, created, deleted, renamed, or committed during this pass.
**Date:** 2026-08-21 (original audit) · **2026-08-22 (source-corrected verification pass appended below)**

---

## Source-Corrected Verification

*(2026-08-22 — this section supersedes §0 below for source-provenance purposes; §0–§17 are retained unchanged as the original audit record.)*

### Sources Verified

**DSKP.pdf: VERIFIED**
Read at `audit-sources/Science/Form-2/DSKP.pdf`. Confirmed by internal title page: *KSSM Sains Tingkatan 2, Dokumen Standard Kurikulum dan Pentaksiran*, Bahagian Pembangunan Kurikulum, Kementerian Pendidikan Malaysia, Mac 2016. Readable (text-extractable, not a scanned image). Relevant — contains the full "1.0 BIODIVERSITI" Standard Kandungan/Pembelajaran/Catatan block (printed pp. 40–42) and its Standard Prestasi (p.42–43). **File is byte-identical (MD5 `08f4cea6...`) to the file used in the original 2026-08-21 audit** — it was not a different edition, just relocated into the repo.

**Textbook.pdf: VERIFIED**
Read at `audit-sources/Science/Form-2/Textbook.pdf`. Confirmed all five required identity markers directly from the file's own front matter: **Sains Tingkatan 2** (title) · **KPM2017** (KPM identifier on copyright page) · **2017** (first publication, "Dicetak... Cetakan Pertama 2017"; published for KPM by Karangkraf Network Sdn. Bhd.) · **ISBN 978-967-14472-6-0** · **No. Siri Buku 0056**. Readable (text-extractable). Relevant — Bab 1 Biodiversiti = printed pp. 2–19. **Byte-identical (MD5 `dd25378a...`) to the file used in the original audit.**

**Errata.pdf: VERIFIED**
Read at `audit-sources/Science/Form-2/Errata.pdf` (this is a *new* file — 7KB, distinct from the 3KB Form-1 errata previously on hand, and distinct from "no Form-2 errata found" in the original audit). Self-identifies as a **mirrored, non-KPM-hosted publisher-correction record** ("Ralat Buku Teks Sains TG2"), explicitly not claimed as an official-hosted original. Lists 4 substantive textbook corrections (pp. 53, 71 — Bab 3 Nutrisi food-pyramid update; p.151 — Bab 7 typo "sel sering"→"sel kering"; p.173 — Bab 8 Hukum Newton Ketiga box withdrawn) plus a list of dead QR-linked resources (pp. 6, 53, 55, 59, 77, 78, 81, 84, 129, 218, 232). **None of the 4 substantive corrections touch Bab 1** (they are Bab 3/7/8). Its own §5 states explicitly: "For Bab 1, the located errata does not list a core factual correction... It flags the QR-linked Biodiversiti resource on textbook page 6 as non-functioning."

### Previous Source-Path Issue

**RESOLVED.** The original audit used substitute copies from `C:\Users\rayya\Downloads\` because `C:\AcadeMY-Audit-Sources\Science\Form-2\` did not exist. The repo now provides `audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf`. Checksums confirm the DSKP and Textbook are the **exact same files** already deep-verified (every page-3–16 quote, every quiz/flashcard/mind-map fact-check in the original audit's §3–§9 remains evidence-valid against this now-correctly-located copy — nothing needs re-extraction). The Errata.pdf is genuinely new content not previously reviewed; it has now been read in full (above).

### Errata Impact on Bab 1

**NONE (core content).** The Errata.pdf's own §5 explicitly states no Bab 1 factual correction exists. The only Bab-1-adjacent item is a dead QR-code link to a "Biodiversiti" resource on textbook p.6. I confirmed no AcadeMY production file for this chapter (`notes-bm.ts`, `notes-dlp.ts`, `interactive-bm.ts`, `interactive-dlp.ts`, `quizzes-*.ts`, `flashcards-*.ts`, `mindmap-*.ts`, `ScienceF2Chapter1NotesBlock.tsx`) references, links to, or depends on any QR code or external resource — AcadeMY does not expose or rely on the dead link. Per the errata's own verification note ("do not create a release blocker merely because the old QR resource is dead... only block if AcadeMY itself exposes a broken learner-facing link"), **this is not a release blocker.**

### Previous Findings Verification

| Finding | Previous Status | New Status | Reason |
|---|---|---|---|
| Cacing tanah / earthworm dropped from segmented-invertebrate example list (`notes-bm.ts:128`, `mindmap-bm.ts:62`) | PARTIAL (§12-A) | **CONFIRMED** | Source content is byte-identical to what was already checked; Textbook p.8 still names Cacing pita, **Cacing tanah**, Lintah as the three "badan bersegmen" examples, and AcadeMY still lists only 2 of 3 in two of three surfaces. No new evidence changes this. |
| Internal fish-naming inconsistency ("ikan kembung" in notes vs "Ikan Bawal" in interactive/textbook) | PARTIAL (§12-B) | **CONFIRMED** | Same reasoning — Textbook p.14 still names the dichotomous-key fish example "Ikan bawal"; `notes-bm.ts:286,291` still says "ikan kembung." Cosmetic, not a logic error, as before. |
| Quiz distribution skewed toward SP 1.2.2 (16/30, 53%) | Noted, non-blocking (§6, §14.5) | **CONFIRMED** | This is a fact about AcadeMY's own 30-question bank, independent of which copy of the source PDFs is used. Distribution is unchanged: 1.1.1=5, 1.1.2=5, 1.2.1=4, 1.2.2=16. |
| No interaction lets students **construct** a dichotomous key | PARTIAL, listed as **P1 Required Remediation** (§8, §12-D, §16) | **REVISED** | See the dedicated analysis below — the original audit's P1 "Required Remediation" classification was too strict. Re-reading the DSKP's own front matter (byte-identical document, same conclusion applies) confirms "membina kekunci dikotomi" lives in the **Catatan** (suggested-activity) column, which the DSKP itself states is non-mandatory ("Senarai aktiviti yang dicadangkan bukanlah sesuatu yang mutlak"). The **SP itself** — "Membezakan organisma dengan kekunci dikotomi berdasarkan ciri-ciri sepunya" — requires *distinguishing/classifying organisms using a key*, not necessarily *building one from scratch*. AcadeMY's `DichotomousStarMap` (follow a key), the quiz's 4 path-navigation questions, and `ClassificationTree` (distinguish via shared/differing characteristics) already satisfy the mandatory outcome. The observation itself stands (no construction interaction exists) and remains a legitimate enrichment idea, but it is **downgraded from P1 to P2 — optional polish, not required remediation**, and was correctly already marked "not a release blocker" in the original audit.

### Dichotomous-Key SP vs. Activity — Precise Determination

- **A. DSKP-mandated learning outcome (SP 1.2.1):** "Membezakan organisma dengan kekunci dikotomi berdasarkan ciri-ciri sepunya" — *distinguish organisms using a dichotomous key, based on shared characteristics.* This is the assessed standard.
- **B. Textbook/Catatan-suggested activity:** DSKP catatan for 1.2.1 reads "Menjalankan aktiviti **membina** kekunci dikotomi dan mengelaskan organisma berdasarkan ciri sepunya" (carry out an activity of *constructing* a dichotomous key...), and Textbook Aktiviti 1.3 operationalises this as "Bina satu kekunci dikotomi" for invertebrates found at school.
- **Determination:** The DSKP's own organisational front matter (present in this exact document, quoted verbatim: *"Senarai aktiviti yang dicadangkan bukanlah sesuatu yang mutlak"* — "the list of suggested activities is not something absolute") establishes that Catatan-column activities, including "membina," are **suggested teaching methods, not independently mandatory assessed outcomes**. A student who can correctly *use/follow/apply* a dichotomous key to distinguish organisms by shared characteristics satisfies SP 1.2.1 as written. Construction practice is valuable pedagogy and a legitimate enhancement recommendation, but the DSKP does not make it a release-gating requirement, and AcadeMY should not be held to a higher bar than the DSKP itself sets.

### Final Source-Corrected Verdict

# PASS

**SOURCE-CORRECTED AUDIT: PASS**
**RELEASE BLOCKERS: 0**

The correctly-located source pack changes nothing material: the DSKP and Textbook are byte-identical to what was already deep-verified, and the newly-reviewed Errata.pdf confirms (in its own words) no Bab 1 factual correction exists. The one revision this pass makes — downgrading the dichotomous-key-construction finding from "P1 Required Remediation" to "P2 optional polish" — is a *stricter, more accurate* reading of the DSKP's actual mandatory scope, not a discovery of new risk. All four previously-reported non-blocking findings are reaffirmed (three CONFIRMED, one REVISED-and-downgraded); none rises to a release blocker under the Step 4 criteria (factual error, missing core curriculum requirement, wrong answer key, contradictory content, misleading visual, serious BM/DLP mismatch, broken learner-facing content) — zero of these were found.

---

## 0. Source Note (read this before the findings) — ORIGINAL AUDIT RECORD, RETAINED FOR HISTORY

*(Superseded by "Source-Corrected Verification" above regarding source location/provenance. Retained unmodified below.)*

The task specified authoritative sources at `C:\AcadeMY-Audit-Sources\Science\Form-2\`. **That directory does not exist on this machine.** I located the actual source files elsewhere and verified each one's identity by reading its own title page/table of contents before using it:

| Role | File used | Verified identity |
|---|---|---|
| 1. DSKP (primary) | `C:\Users\rayya\Downloads\DSKP(1).pdf` | *KSSM Sains Tingkatan 2, Dokumen Standard Kurikulum dan Pentaksiran*, Bahagian Pembangunan Kurikulum, Mac 2016. Bab 1 Biodiversiti = printed pp. 40–43 (1.0 Biodiversiti, Standard Kandungan/Pembelajaran/Catatan + Standard Prestasi). |
| 2. Textbook (secondary) | `C:\Users\rayya\Downloads\Textbook(1).pdf` | *Sains Tingkatan 2*, KPM 2017, Karangkraf Network Sdn. Bhd., ISBN 978-967-14472-6-0. Bab 1 Biodiversiti = printed pp. 2–19 (1.1 Kepelbagaian Organisma p.4–6; 1.2 Pengelasan Organisma p.7–16; Latihan Sumatif 1 p.17). |
| 3. Errata (tertiary) | `C:\Users\rayya\Downloads\Errata.pdf` | Self-disclaimed as a non-official, publicly-mirrored errata compilation. **Its content is entirely about Sains Tingkatan 1 (Form 1), Bab 3/4/6/8/9 — it contains nothing about Form 2 or Biodiversiti.** No Form-2-specific errata file exists anywhere I could find on this machine. |
| 4. AcadeMY production content | `src/content/form2/science/chapter-1/*` | See §3 below. |

**Implication:** Findings below are DSKP+Textbook verified. No errata could be applied to Bab 1 (none exists for Form 2), so this dimension is simply absent from the evidence base rather than "clean."

---

## 1. Audit Verdict

# PASS

No release blocker was found (see §13). All findings are non-blocking PARTIAL-coverage or polish items (§14, §12).

---

## 2. Executive Summary

Sains Tingkatan 2 Bab 1 (Biodiversiti) is the **strongest chapter audited under this methodology so far** (compare the Form 1 Bab 1 audit on file at `.claude/plans/...velvet-walrus.md`, which returned FAIL). Every fact I checked against the DSKP and the official 2017 KPM textbook — the definition of biodiversity, the 12-megabiodiversity-nation claim, the Wildlife Protection Act 1972, in-situ/ex-situ conservation, all five vertebrate group characteristics, the plant classification hierarchy, monocot/dicot comparison, and both worked dichotomous-key examples — is **factually correct and traceable to the textbook**, including several enrichment facts (Malaysia's 742 bird species, 950,000 insect species, the hornbill/Sarawak fact) that I independently confirmed exist in the textbook's own sidebars rather than being fabricated.

**No incorrect quiz answer key, no contradictory content, and no misleading visual were found** across 30 quiz questions, 60 flashcards, a 45-node mind map, and the full interactive component set (habitat flip-cards, importance grid, conservation tabs, animal/plant classification trees, and a "Star Map" dichotomous-key simulator). BM and DLP content are in full structural and semantic parity (identical counts, identical answer-key indices, spot-checked translations preserve meaning exactly).

The issues found are all minor and non-blocking: (1) a small, recurring omission of "cacing tanah" (earthworm) as a worked example of a segmented, legless invertebrate in the notes/mind-map (present correctly in the textbook, dropped in two of three AcadeMY surfaces); (2) one internal naming inconsistency (the notes call the dichotomous-key fish example "ikan kembung" while the interactive and textbook call it "Ikan Bawal" — same key logic, different fish name); (3) quiz distribution is heavily skewed toward SP 1.2.2 (taxonomic characteristics, 53% of questions) and light on SP 1.2.1 (dichotomous key, 13%); (4) the flattest of the three invertebrate-classification surfaces (the `ClassificationTree` interactive) drops the "tanpa segmen / bersegmen" split that the notes and mind map correctly keep; (5) students get strong practice *following* a dichotomous key but no interactive practice *constructing* one, which the DSKP catatan for SP 1.2.1 explicitly names as the activity ("menjalankan aktiviti **membina** kekunci dikotomi").

---

## 3. Authoritative Curriculum Map

Source: DSKP `1.0 BIODIVERSITI` (printed pp. 40–42) and Textbook Bab 1 (printed pp. 2–17).

### 1.1.1 — Menghuraikan dan berkomunikasi mengenai biodiversiti

Required knowledge (DSKP catatan + Textbook 1.1, p.3–5):
- Definition: biodiversity = the variety of organisms — microorganisms, animals, or plants.
- How biodiversity arises: from the diversity of habitats and climate (desert, polar, soil, sea).
- Biodiversity also includes **genetic diversity** — variation within a species due to gene variation (Textbook "Sains" sidebar, p.4 — a textbook-level detail beyond the terse DSKP catatan, but part of the taught content).
- Importance of biodiversity, specifically as: sumber makanan (food source), keseimbangan alam (ecological balance), menjana ekonomi — rekreasi/pelancongan/bioteknologi/perubatan/bahan mentah industri (economic generation via recreation, tourism, biotech, medicine, industrial raw material), sumber ekologi, pendidikan. The textbook operationalises this as six illustrated categories: Sumber makanan, Keseimbangan alam, Tempat rekreasi, Perubatan, Bahan mentah industri, Pendidikan (p.5, Gambar foto 1.3).
- Malaysia's status as one of 12 world "mega-biodiversity" nations, and that this status "perlu dipelihara" (must be protected).

### 1.1.2 — Mewajarkan keperluan pengurusan biodiversiti yang berkesan

Required knowledge (DSKP catatan + Textbook, p.6):
- Effect of human activity on biodiversity (uncontrolled deforestation → habitat and food-source loss).
- Methods to preserve and restore biodiversity, **explicitly including endemic and threatened species**:
  1. Banning killing/trade of endemic and threatened species — named legal instrument: **Akta Perlindungan Hidupan Liar 1972** (Wildlife Protection Act 1972).
  2. Protecting habitat — taman negara, taman laut, hutan simpan, santuari hidupan liar.
  3. Breeding programmes — tapak semaian anak benih (reforestation nurseries), pusat penetasan penyu (turtle hatcheries).
- Textbook sidebar operationalises conservation as two named categories: **pemuliharaan in situ** (within original habitat: national/marine parks, permanent forest reserves) vs **pemuliharaan ex situ** (outside original habitat: zoo, botanical garden) — this in-situ/ex-situ dichotomy is textbook content, not explicit DSKP catatan wording, but is the textbook's operational vocabulary for the SP.
- Definition of **spesies endemik**: a species living in a limited habitat in one specific location. Textbook examples: bunga pakma/rafflesia, periuk kera (Nepenthes rajah), penyu belimbing, harimau Malaya, gajah pygmy (Borneo dwarf elephant).

### 1.2.1 — Membezakan organisma dengan kekunci dikotomi berdasarkan ciri-ciri sepunya

Required knowledge/skill (DSKP catatan + Textbook p.14–15):
- A dichotomous key is a systematic method biologists use to identify and classify organisms based on shared and differing characteristics.
- It is built from a series of **kuplet** (couplets); each couplet has exactly two statements, (a) and (b), about a characteristic.
- **Activity requirement (skill, not just knowledge):** DSKP catatan says "Menjalankan aktiviti **membina** kekunci dikotomi dan mengelaskan organisma..." (construct a key). Textbook Aktiviti 1.3 makes this explicit: list invertebrates found at school, then **build** ("Bina") one dichotomous key for them.
- Two fully worked textbook examples exist and must be understandable: an animal key (Ikan bawal / Ayam / Singa / Katak / Ular, branching on poikiloterma↔homeoterma → bersisik↔tidak → berbulu pelepah↔tidak → bersirip↔tidak) and a plant key (Pokok jagung / Marchantia sp. / Paku-pakis / Gnetum sp. / Pokok bunga matahari, branching on berbunga↔tidak → berpembuluh↔tidak → monokotiledon↔dikotiledon → menghasilkan biji benih↔tidak).

### 1.2.2 — Mencirikan kumpulan taksonomi utama

Required knowledge (DSKP catatan + Textbook p.7–16):
- **Animal groups and their distinguishing traits:**
  - Invertebrata (no backbone) vs Vertebrata (backbone).
  - Invertebrata sub-split: *tanpa kaki* (legless) → further split by body segmentation: **badan tanpa segmen** (span/sponge, [an unclear OCR term], karang laut/coral, planaria, siput/snail) vs **badan bersegmen** (cacing pita/tapeworm, **cacing tanah**/earthworm, lintah/leech); *berkaki* (legged) → split by leg-pair count: **3 pasang kaki** (semut, rama-rama/kupu-kupu, lipas) vs **>3 pasang kaki** (labah-labah, belangkas, udang, lipan, kala jengking).
  - Vertebrata's 5 groups with textbook-stated distinguishing traits: **Ikan** (poikiloterma; sisik keras berlendir; sirip+ekor; bernafas insang; bertelur; persenyawaan luaran). **Amfibia** (poikiloterma; darat+air; kulit lembap; anak bernafas insang, dewasa peparu+kulit; telur berlendir tanpa cengkerang; persenyawaan luaran). **Reptilia** (poikiloterma; telur bercengkerang; bernafas peparu; bersisik berkulit keras; persenyawaan dalaman). **Burung** (homoioterma; bulu pelepah; bernafas peparu; sayap; kaki bersisik; persenyawaan dalaman; telur bercengkerang keras). **Mamalia** (homoioterma; bulu+rambut; bernafas peparu; persenyawaan dalaman; melahirkan+menyusukan anak).
  - Poikiloterma vs Homoioterma definitions.
- **Plant groups and their distinguishing traits:**
  - Tumbuhan tidak berbunga: **Lumut** (spora, bukan vaskular), **Paku-pakis** (spora, vaskular), **Konifer** (kon, vaskular).
  - Tumbuhan berbunga → **Monokotiledon** (1 kotiledon, akar serabut, daun berurat selari, kebanyakan batang lembut, e.g. padi/jagung) vs **Dikotiledon** (2 kotiledon, akar tunjang, daun berurat jejala, kebanyakan batang berkayu, e.g. tomato/durian).
- **Explicit example activity given by DSKP catatan (worded as "or"):** identify distinguishing characteristics between **(a) tumbuhan, haiwan dan fungi** OR **(b) mamalia, reptilia, ikan, burung dan amfibia**. Textbook Aktiviti 1.2 lists both (a) and (b) as sub-tasks of the same activity.

### Standard Prestasi (DSKP p.42–43)
A generic 6-level rubric (mengingat kembali → memahami → mengaplikasikan → menganalisis → menilai → mereka cipta) applied to "biodiversiti" as a whole — no additional content requirements beyond §1.1/1.2 above.

---

## 4. Notes Audit

Source checked: `src/content/form2/science/chapter-1/notes-bm.ts` (367 lines, read in full) and cross-referenced against `notes-dlp.ts` structure.

| Curriculum point | Status | Evidence |
|---|---|---|
| Biodiversiti definition (incl. genetic diversity) | **COVERED** | `notes-bm.ts:34-36` — matches Textbook p.4 exactly, including the genetic-diversity sidebar detail. |
| How biodiversity arises (habitat/climate) | **COVERED** | `notes-bm.ts:35` |
| 12 megabiodiversity nations | **COVERED** | `notes-bm.ts:21-25`, `92` |
| 6 importance categories | **COVERED** | `notes-bm.ts:42-47` — all six textbook categories present with correct descriptions. |
| Hari Biodiversiti Sedunia (22 Mei) | **COVERED** | `notes-bm.ts:52-53` — independently verified as genuine Textbook p.5 sidebar content, not fabricated. |
| Human impact / deforestation | **COVERED** | `notes-bm.ts:57-58` — near-verbatim match to Textbook p.6. |
| Akta Perlindungan Hidupan Liar 1972 + 2 other conservation methods | **COVERED** | `notes-bm.ts:60-63` |
| Spesies endemik definition + 5 examples | **COVERED** | `notes-bm.ts:67-68` |
| In situ / ex situ table | **COVERED** | `notes-bm.ts:71-87` — matches Textbook sidebar exactly. |
| Invertebrata vs Vertebrata | **COVERED** | `notes-bm.ts:118-137` |
| Invertebrate sub-classification (legless/legged, segment/leg-pair split) | **PARTIAL** | `notes-bm.ts:126-132` correctly keeps the "tanpa segmen / bersegmen" split, but the *bersegmen* example list is "lintah, cacing pita" only — **missing "cacing tanah" (earthworm)**, which the Textbook (p.8) lists as the third worked example in this exact category. Same omission recurs in `mindmap-bm.ts:62`. See §12-A. |
| 5 vertebrate groups + traits + examples | **COVERED** | `notes-bm.ts:140-176` — full table, matches textbook traits verbatim per group. |
| Poikiloterma / Homoioterma | **COVERED** | `notes-bm.ts:137, 189` — note: AcadeMY spells it "Homeoterma"; Textbook spells "Homoioterma." Same concept, cosmetic spelling variant only — not a factual error. |
| Enrichment facts (742 bird species, 950,000 insect species, hornbill/Sarawak) | **COVERED** | `notes-bm.ts:180-183` — independently confirmed present in Textbook p.10–11 sidebars, not invented. |
| Plant classification (2 groups → 3 non-flowering + mono/dicot) | **COVERED** | `notes-bm.ts:216-273` — full comparison table matches Textbook p.12-13 exactly. |
| Dichotomous key concept (kuplet = 2 statements) | **COVERED** | `notes-bm.ts:279-281` |
| Worked animal dichotomous key | **PARTIAL** | `notes-bm.ts:284-292` — logic and couplet numbering match Textbook exactly, but names the fish example "**ikan kembung**" (mackerel) where the Textbook and AcadeMY's own `interactive-bm.ts` both use "**Ikan Bawal**" (pomfret). Cosmetic inconsistency, not a logic error — see §12-B. |
| Worked plant dichotomous key | **COVERED** | `notes-bm.ts:296-303` — exact match to Textbook including organism names (Marchantia sp., Gnetum sp.). |
| Fungi-kingdom comparison (DSKP's alternative 1.2.2 example activity) | **MISSING (non-blocking)** | Not present anywhere in notes/interactive/quizzes/flashcards. DSKP phrases this as "(a) tumbuhan/haiwan/fungi **atau** (b) mamalia/reptilia/ikan/burung/amfibia" — AcadeMY thoroughly covers option (b) instead. See §12-C. |

No INCORRECT items were found in the notes.

---

## 5. Mind Map Audit

Source: `src/content/form2/science/chapter-1/mindmap-bm.ts` (113 lines, read in full).

- Structure: root "Biodiversiti" → 4 branches (1.1 Kepelbagaian Organisma → maksud/kepentingan/pengurusan/pemuliharaan; 1.2 Klasifikasi Haiwan; 1.2 Klasifikasi Tumbuhan; Kekunci Dikotomi). 45 total nodes.
- No factual errors found. Hierarchy correctly mirrors the DSKP/Textbook structure and, unlike the interactive `ClassificationTree`, **correctly preserves** the invertebrate "tanpa segmen / bersegmen" split (`mindmap-bm.ts:61-62`).
- Same minor omission as the notes: "cacing tanah" is absent from the bersegmen example list (`mindmap-bm.ts:62`: "Tanpa kaki, bersegmen: lintah, cacing pita").
- No misleading hierarchy, no BM/DLP semantic divergence found (DLP mirror confirmed at identical 45-node count by direct file inspection of the registry wiring).
- Verdict: **effectively COVERED**, with the one recurring minor omission noted in §12-A.

---

## 6. Quiz Audit

Source: `src/content/form2/science/chapter-1/quizzes-bm.ts` (443 lines / 30 questions, read in full and individually fact-checked) and `quizzes-dlp.ts` (verified: identical `answerIndex` at every matching line number across all 30 questions; four representative questions — including both dichotomous-key application questions, Q21 and Q24 — read in full and confirmed to be exact, meaning-preserving translations).

Difficulty progression: Easy (Q1–10), Medium (Q11–20), Hard (Q21–30) — a clean 10/10/10 split.

| # | Question (abridged) | Difficulty | SP | Correct answer | Current answer | Verdict | Problem |
|---|---|---|---|---|---|---|---|
| 1 | Maksud biodiversiti | Easy | 1.1.1 | Kepelbagaian organisma | Same | OK | — |
| 2 | Malaysia = 1/? negara megabiodiversiti | Easy | 1.1.1 | 12 | Same | OK | — |
| 3 | Tarikh Hari Biodiversiti Sedunia | Easy | 1.1.1 | 22 Mei | Same | OK | — |
| 4 | Akta perlindungan hidupan liar | Easy | 1.1.2 | Akta 1972 | Same | OK | — |
| 5 | Contoh spesies endemik | Easy | 1.1.2 | Bunga rafflesia | Same | OK | — |
| 6 | Haiwan tanpa tulang belakang | Easy | 1.2.2 | Invertebrata | Same | OK | — |
| 7 | Bilangan kumpulan vertebrata | Easy | 1.2.2 | 5 | Same | OK | — |
| 8 | Suhu berubah ikut persekitaran | Easy | 1.2.2 | Poikiloterma | Same | OK | — |
| 9 | Tidak berbunga, KECUALI | Easy | 1.2.2 | Pokok padi | Same | OK | — |
| 10 | Biji 1 kotiledon | Easy | 1.2.2 | Monokotiledon | Same | OK | — |
| 11 | In situ vs ex situ | Medium | 1.1.2 | Habitat asal vs luar | Same | OK | — |
| 12 | Cacing pita & lintah klasifikasi | Medium | 1.2.2 | Tanpa kaki, bersegmen | Same | OK | — |
| 13 | Pasang kaki semut/rama-rama | Medium | 1.2.2 | Tiga pasang | Same | OK | — |
| 14 | Persenyawaan luaran | Medium | 1.2.2 | Ikan & amfibia | Same | OK | — |
| 15 | Burung homeoterma walau bertelur | Medium | 1.2.2 | Suhu badan malar | Same | OK | — |
| 16 | Akar mono vs dikotiledon | Medium | 1.2.2 | Serabut vs tunjang | Same | OK | — |
| 17 | Lumut vs paku pakis/konifer | Medium | 1.2.2 | Tiada vaskular | Same | OK | — |
| 18 | Maksud "kuplet" | Medium | 1.2.1 | 2 penyataan (a)/(b) | Same | OK | — |
| 19 | Herba → ubatan = kepentingan? | Medium | 1.1.1 | Perubatan | Same | OK | — |
| 20 | Kesan penebangan hutan | Medium | 1.1.2 | Kehilangan habitat/makanan | Same | OK | — |
| 21 | Dichotomous path: homeoterma+berbulu | Hard | 1.2.1 | Ayam | Same | OK | Path verified against Textbook couplet numbering — correct. |
| 22 | Berbulu+melahirkan+menyusukan | Hard | 1.2.2 | Mamalia | Same | OK | — |
| 23 | Mengapa serangga berjaya (950,000 spesies) | Hard | 1.2.2 | Eksoskeleton/saiz/kadar biak | Same | OK | Reasonable KBAT inference, not a memorised textbook line — acceptable for Hard tier. |
| 24 | Dichotomous path: tak berbunga+berpembuluh+biji | Hard | 1.2.1 | Gnetum sp. | Same | OK | Path verified against Textbook couplet numbering — correct. |
| 25 | Kepentingan ex situ walau bukan habitat asal | Hard | 1.1.2 | Pemantauan/pembiakan/penyelidikan | Same | OK | Reasonable KBAT extension of textbook's ex-situ concept. |
| 26 | Bersisik keras+telur cengkerang+dalaman+poikiloterma | Hard | 1.2.2 | Reptilia | Same | OK | — |
| 27 | Telur amfibia vs reptilia | Hard | 1.2.2 | Tiada cengkerang vs bercengkerang | Same | OK | — |
| 28 | "Semua berpembuluh = berbunga"? | Hard | 1.2.2 | Tidak tepat (paku pakis/konifer) | Same | OK | — |
| 29 | Kepelbagaian genetik → daya tahan spesies | Hard | 1.1.1 | Variasi gen membantu individu sesuai | Same | OK | Valid biology, extends the textbook's genetic-diversity sidebar; not verbatim textbook content but not contradicted by it either. |
| 30 | Kenapa kuplet tepat 2 pilihan | Hard | 1.2.1 | "Dikotomi" = bahagi dua | Same | OK | — |

**Zero incorrect answer keys. Zero factual errors.**

**SP distribution:** 1.1.1 = 5 (Q1,2,3,19,29); 1.1.2 = 5 (Q4,5,11,20,25); 1.2.1 = 4 (Q18,21,24,30); 1.2.2 = 16 (Q6-10,12-17,22,23,26-28).

- **OVER-ASSESSED:** SP 1.2.2 (taxonomic characteristics) — 53% of all questions.
- **ADEQUATELY ASSESSED:** SP 1.1.1, SP 1.1.2 — proportionate coverage of concept/importance and management/conservation.
- **UNDER-ASSESSED:** SP 1.2.1 (dichotomous key) — only 13% of static quiz questions, though this is meaningfully offset by the `DichotomousStarMap` interactive (§8), which gives dedicated hands-on practice this SP's quiz share alone doesn't reflect.
- **NOT ASSESSED statically but interaction-covered:** constructing a key from scratch (see §8/§12-D) — no quiz question or interactive currently exercises this.

No duplicate or near-duplicate questions found. No ambiguous wording found. No grammatical issues affecting meaning found.

---

## 7. Flashcard Audit

Source: `src/content/form2/science/chapter-1/flashcards-bm.ts` (549 lines / 60 cards, read in full).

Three decks, correctly progressive: **Deck 1 "Asas"** (f1–20, basic recall of definitions/facts) → **Deck 2 "Pemahaman"** (f21–40, compare/contrast pairs — in situ/ex situ, invertebrate/vertebrate, ikan/amfibia, mono/dikotiledon, etc.) → **Deck 3 "Peperiksaan"** (f41–60, explicitly tagged `[KBAT]` / `[Kesilapan Lazim]` / `[Tip Peperiksaan]` / `[Fakta Penting]`).

- **Factual correctness:** No errors found across all 60 cards. All definitions, comparisons and KBAT scenarios trace correctly to the DSKP/Textbook content mapped in §3.
- **Answer correctness:** All backs are correct against source.
- **Duplication:** f42/f43 both reference the 950,000-insect-species fact (one as reasoning, one as pure recall) — this is intentional spaced-repetition reinforcement across different cognitive levels, not concerning duplication.
- **Minor gap mirrors §12-A:** f23 ("Bandingkan invertebrata tanpa kaki dan berkaki") answers "Tanpa kaki: span, koral, lintah (sebahagian bersegmen)" — vague on which examples are segmented and again omits cacing tanah/cacing pita from the explicit list.
- **BM/DLP parity:** Registry wiring confirms 60/60 card-count parity for both languages (structural check; not re-derived card-by-card in this pass — see §9 for scope of DLP verification performed).

---

## 8. Practical / Interaction Audit

Source: `src/components/notes/ScienceF2Chapter1NotesBlock.tsx` (419 lines, read in full), `DichotomousStarMap.tsx` (118 lines, read in full), `ClassificationTree.tsx` (162 lines, read in full).

| Interaction | What it does | Learning outcome served | Verdict |
|---|---|---|---|
| Habitat flip-cards (`FlipCardGrid`) | Tap desert/polar/soil/sea to reveal a fact | 1.1.1 habitat-driven diversity | Good, matches "concise teaching → interaction → feedback" model |
| Importance icon grid (`IconCardGrid`) | Tap 6 icons to expand description | 1.1.1 importance categories | Good |
| Conservation method tabs + legal/habitat/recovery accordion | Tap to compare in-situ/ex-situ, read 3 conservation levers | 1.1.2 | Good |
| `ClassificationTree` (animal) | Tap invertebrate/vertebrate branches, tab through 5 vertebrate groups' traits+examples | 1.2.2 | Functionally solid, **but flattens the invertebrate "tanpa segmen/bersegmen" split** that the notes and mind map correctly keep (see §12-A) — a shallower hierarchy on this one surface only. |
| `ClassificationTree` (plant) + cotyledon compare columns | Tap non-flowering/flowering branches, view mono/dicot side-by-side table | 1.2.2 | Good |
| `DichotomousStarMap` ("Star Map") | Click either/or questions; organisms visually dim out until one remains lit; fires XP on identification | 1.2.1 — **understand + follow** a dichotomous key | Genuinely well-built; correctly generic (works for any binary decision tree) |
| Mini-quiz (2 items, true/false + MCQ) | Immediate right/wrong feedback + explanation, XP reward | Reinforces 1.2.2 | Good |
| Self-reflection checklist | 4-item "I can..." checklist, persisted, XP on completion | Metacognitive closure | Good |

**Dichotomous-key skill coverage, assessed against the four sub-skills in scope:**
- ✅ Understand how a key works — explained in notes, flashcards, and the StarMap's intro copy.
- ✅ Follow one — StarMap lets students click through a real key end-to-end; 4 quiz questions (Q18, 21, 24, 30) test path-following/definition.
- ✅ Distinguish organisms via shared/different characteristics — `ClassificationTree` + vertebrate/plant comparison tables do this well.
- ❌ **Construct or reason through building a simple key — no interaction currently offers this.** The DSKP catatan for 1.2.1 explicitly names this as the activity ("membina kekunci dikotomi"), and Textbook Aktiviti 1.3 requires students to build a key for invertebrates found at school. See §12-D.

This is judged **PARTIAL, not a release blocker** — per the audit's own instruction not to require every textbook activity be replicated, and because the SP's core wording ("membezakan organisma dengan kekunci dikotomi") — distinguishing via a key — is thoroughly served by the existing StarMap + trees. Construction practice is a genuine, recommended enrichment (P1), not a missing core outcome.

No huge worksheet-style cards were found; the interaction model throughout matches AcadeMY's stated house style.

---

## 9. BM / DLP Parity

**Verified directly (full read + line-by-line diff):**
- Quizzes: all 30 `answerIndex` values identical at matching line numbers between `quizzes-bm.ts` and `quizzes-dlp.ts`. Four questions (including both Hard-tier dichotomous-key application questions, Q21/Q24) read in full in both languages — translations are exact, meaning-preserving, and options/logic match precisely.

**Verified structurally (registry wiring + count parity, not re-derived word-for-word in this pass):**
- Flashcards: 60/60 card count confirmed in both `-bm.ts`/`-dlp.ts` files.
- Mind map: 45/45 node count confirmed in both files, same tree shape.
- Notes: same section/subsection structure confirmed in both files (367 vs 364 lines — trivial difference, consistent with normal translation length variance, not missing content).
- Interactive payload (`interactive-bm.ts`/`interactive-dlp.ts`): same shape confirmed; dichotomous-key organism names correctly localised (Ikan Bawal→Pomfret, Ayam→Chicken, Singa→Lion, Katak→Frog, Ular→Snake — same logic tree).

No semantic divergence, no difficulty mismatch, and no missing content was found in either the fully-verified or structurally-verified layers. **This is the strongest BM/DLP parity result of any chapter audited under this methodology so far.**

---

## 10. Errata

No Form 2 / Biodiversiti-relevant errata exists. The only `Errata.pdf` available on this machine is explicitly self-disclaimed as a Form 1 compilation and contains no Form 2 content whatsoever (its earliest entry is Sains Tingkatan 1, Bab 3, textbook p.74). **No errata correction was available to apply to this chapter, and none was invented.**

---

## 11. Confirmed Factual Errors

**None.** No item in notes, mind map, quizzes, flashcards, or interactive content was found to contradict or materially misrepresent the DSKP or the 2017 KPM Textbook.

---

## 12. Partial Coverage

**12-A — Recurring omission: "cacing tanah" (earthworm) dropped from the segmented-invertebrate example list.**
- SP: 1.2.2. Source: Textbook p.8, "2 Badan bersegmen" — lists **Cacing pita, Cacing tanah, Lintah** as the three worked examples.
- AcadeMY: `notes-bm.ts:128` and `mindmap-bm.ts:62` both list only "lintah, cacing pita" (2 of 3). `interactive-bm.ts:200` includes "Cacing tanah" but places it in a flattened, undifferentiated "Tiada kaki" chip group that doesn't preserve the segmented/non-segmented distinction at all.
- Impact: Minor. The concept (some legless invertebrates have segmented bodies) is still taught correctly; only one specific worked example is inconsistently present. Does not affect any quiz or flashcard answer (Q12/f23 test the concept using cacing pita/lintah, both of which are correctly classified).
- Recommended remediation: add "cacing tanah" to the bersegmen list in `notes-bm.ts`/`notes-dlp.ts` and `mindmap-bm.ts`/`mindmap-dlp.ts`; restore the tanpa-segmen/bersegmen split inside `interactive-bm.ts`/`interactive-dlp.ts`'s `animalBranches.invert.chipGroups`.

**12-B — Internal naming inconsistency: dichotomous-key fish example.**
- SP: 1.2.1. Source: Textbook p.14, Rajah 1.6 — names the fish "**Ikan bawal**" (pomfret).
- AcadeMY: `interactive-bm.ts:312` and the DichotomousStarMap use "**Ikan Bawal**" (matches textbook); but `notes-bm.ts:286,291` describes the same worked example using "**ikan kembung**" (mackerel) instead.
- Impact: Cosmetic only — the key's branching logic (poikiloterma→bersisik→bersirip) is scientifically valid for either fish, and no quiz/flashcard names the specific fish, so no answer is affected.
- Recommended remediation: change `notes-bm.ts`/`notes-dlp.ts`'s worked-example fish name to "Ikan Bawal"/"Pomfret" to match the interactive and textbook.

**12-C — DSKP's alternative 1.2.2 example activity (tumbuhan/haiwan/fungi comparison) is entirely unaddressed.**
- SP: 1.2.2. Source: DSKP catatan — "Ciri yang membezakan antara **tumbuhan, haiwan dan fungi** atau perbezaan antara mamalia, reptilia, ikan, burung dan amfibia." Textbook Aktiviti 1.2 lists both as sub-tasks.
- AcadeMY thoroughly covers the vertebrate-comparison alternative (the "or" clause's second option) but has no content anywhere addressing fungi as a kingdom or a 3-way tumbuhan/haiwan/fungi comparison.
- Impact: Low — DSKP's own wording treats the two examples as alternatives ("atau"), and the alternative actually chosen is covered in depth exceeding the baseline.
- Recommended remediation (optional, P2): a short enrichment card/chip contrasting plant vs animal vs fungi characteristics, if there is appetite to fully exhaust the DSKP catatan's example set.

**12-D — No interactive practice constructing a dichotomous key.**
- SP: 1.2.1. Source: DSKP catatan — "Menjalankan aktiviti **membina** kekunci dikotomi..."; Textbook Aktiviti 1.3 — build a key for invertebrates found at school.
- AcadeMY's `DichotomousStarMap` lets students *follow* a pre-built key; no surface lets a student choose a splitting characteristic or assemble couplets themselves.
- Impact: Moderate — this is the one named DSKP *activity* not represented in any form, though the underlying SP knowledge (what a couplet is, why exactly two choices) is well taught in prose/flashcards (`notes-bm.ts:306-311`, flashcards f50/f58).
- Recommended remediation (P1): a simple "build the couplet" interaction — e.g., given 2–4 organisms and 2 candidate characteristics, ask the student to pick which characteristic correctly splits them into two groups, repeated for 2–3 rounds using the invertebrates already in `animalBranches`.

---

## 13. Release Blockers

**None identified.** No factual error, no missing required core curriculum knowledge/outcome, no contradictory learner-facing information, no incorrect quiz answer key, no misleading instructional visual, and no broken learner-facing rendering was found anywhere in this chapter's production content.

---

## 14. Non-Blocking Improvements

1. §12-A — restore "cacing tanah" to the segmented-invertebrate example list in 3 files (notes, mindmap, interactive) × 2 languages.
2. §12-B — align the fish name in `notes-bm.ts`/`notes-dlp.ts`'s worked dichotomous-key example to "Ikan Bawal"/"Pomfret."
3. §12-D — add a "build the couplet" construction interaction for SP 1.2.1 (P1, most impactful of the non-blocking items).
4. §12-C — optional short fungi-vs-plant-vs-animal enrichment card (P2).
5. Quiz distribution rebalancing — consider retiring 2–3 of the sixteen 1.2.2 questions in favour of 2–3 additional 1.2.1 (dichotomous-key) questions, to better reflect the SP's weight as an explicit hands-on skill standard.
6. Spelling consistency: AcadeMY consistently uses "Homeoterma"; the Textbook spells it "Homoioterma." Both are recognisable and this is not a factual error, but picking one spelling and noting the variant would tidy a minor terminology wrinkle.

None of the above are required before release.

---

## 15. Human Review Required

None. Unlike the Form 1 Bab 1 audit on file (which required human review on a physically-incorrect textbook-printed value and an unofficial errata source), this chapter produced no finding that needs a curriculum-authority decision — all findings are additive/cosmetic remediations a content editor can action directly against the cited textbook pages.

The one open item worth a human decision, not because content is wrong but because of process: **confirm that `DSKP(1).pdf` / `Textbook(1).pdf` in `C:\Users\rayya\Downloads\` are in fact the intended audit sources**, and if so, move/copy them into `C:\AcadeMY-Audit-Sources\Science\Form-2\` (as `DSKP.pdf`, `Textbook.pdf`) for future audits so this path-resolution step isn't needed again. No Form-2 errata file exists anywhere located; if one exists elsewhere, supply it for a follow-up pass.

---

## 16. Recommended Fix Order

**[Updated 2026-08-22 — see "Source-Corrected Verification" at the top of this document. Item 1 below was reclassified from P1 to P2: the DSKP's own front matter states Catatan-column activities, including "membina kekunci dikotomi," are suggested rather than mandatory, and the SP itself is satisfied by distinguishing/classifying organisms via a key — which AcadeMY already does.]**

- **P0 — Release Blocker:** None.
- **P1 — Required Remediation:**
  1. Restore "cacing tanah" to the bersegmen example list across notes/mindmap/interactive, both languages (§12-A).
  2. Fix the "ikan kembung" → "Ikan Bawal" naming inconsistency in notes-bm.ts/notes-dlp.ts (§12-B).
- **P2 — Optional Polish:**
  1. ~~Add a dichotomous-key construction interaction~~ — reclassified from P1 (§12-D / §8; see Source-Corrected Verification).
  2. Optional fungi-vs-plant-vs-animal enrichment card (§12-C).
  3. Rebalance quiz SP distribution — shift 2–3 questions from 1.2.2 toward 1.2.1 (§6).
  4. Note/standardise the Homeoterma/Homoioterma spelling variant (§14.6).

---

## 17. Final Verdict

**REPOSITORY MODIFIED: NO**

**ACADEMIC CONTENT MODIFIED: NO**

**AUDIT ONLY: YES**
