# Bab 2: Peta Topografi — Audit Report (PHASE 1 — AUDIT ONLY)

**Date:** 2026-10-28
**Repo + branch:** silken-sheen-main, `audit/geography-f2-chapter2-peta-topografi` (branched from `feature/geography-f2-chapter1-improvements` @ 2f8ddb59, which already includes the merged `main`)
**Textbook edition + SHA256:** Geografi Tingkatan 2, IMS Books Trading Sdn. Bhd. / KPM 2017, ISBN 978-967-0463-47-6 — `audit-sources/Geography/Form-2/Textbook.pdf`, SHA256 `6962bde2d70ed27f99aa369896f4e2111bd6e0ad4a6c717e2c8210d5c6447c63`
**DSKP version + SHA256:** KSSM Geografi Tingkatan 2, Bahagian Pembangunan Kurikulum KPM — `audit-sources/Geography/Form-2/DSKP.pdf`, SHA256 `03db2a6b1f6f4104766d36cc635193532f282e9898937188e3043f736996698c`
**Files audited:** `src/content/form2/geography/chapter-2/{notes,mindmap,interactive}.ts`, `src/data/content.ts` (geo-f2-c2-q1…q30 quizzes), `src/data/flashcards.ts` (geography Form 2 scope), and the live `/notes?subject=geography&form=2&chapter=Chapter+2` and `/mindmaps…` routes (desktop + mobile).
**Source-read status:** Bab 2 = printed pages 16–30 = PDF pages 24–38 (offset +8, consistent with Bab 1). DSKP SK 1.2 = printed page 23 = PDF page 35 (offset +12). All 15 Bab 2 textbook pages were rendered to images and visually inspected (text extraction alone misses the symbol tables and worked grid-reference diagrams that are this chapter's core content).

**PHASE 1 — AUDIT ONLY. No Bab 2 code was modified. No merge, deploy, or production-data change occurred.**

## 1. Scope

Audited `2.1`–`2.5` (DSKP SK 1.2, SPs 1.2.1–1.2.7) against the textbook, plus the quiz bank, flashcard bank, and live rendering (desktop + mobile, guest mode) per your requested categories.

## 2. DSKP coverage

| SP | Required outcome | Evidence | Coverage |
|---|---|---|---|
| 1.2.1 | Menyatakan maksud peta topografi | `notes.ts`/`interactive.ts` §2.1 | Full |
| 1.2.2 | Garisan timuran/utaraan | §2.2 | Full |
| 1.2.3 | Menyatakan rujukan grid | §2.3 | Full |
| 1.2.4 | Perbezaan kegunaan RG 4 vs 6 angka | §2.3 | Full |
| 1.2.5 | Membaca RG 4 & 6 angka untuk kedudukan | §2.3 + `GridReferenceReader` exercise | Full, verified working live |
| 1.2.6 | Menganalisis hubung kait fizikal–budaya | §2.4 | Full, but see F7/F8 below |
| 1.2.7 | Mentafsir peta topografi secara keseluruhan | §2.5 "Contoh Tafsiran" | **Present but factually corrupted — see F1/F2/F3** |

Topic-level coverage is complete; the problem is accuracy within §2.4/§2.5, not missing structure.

## 3. Findings

### Critical

| ID | Category | Issue | Evidence | Textbook reference |
|---|---|---|---|---|
| **F1** | Incorrect fact / Grid reference | `notes.ts` §2.5 "Contoh Tafsiran" states settlement/road info "membentuk kawasan grid **6105**" — the textbook's actual grid reference is **6605**. This is a chapter about reading grid references accurately — stating a wrong one in the worked example is the worst possible error for this specific chapter. | `notes.ts:274` | Textbook p.27 (PDF p.35): "Petempatan berjajar pula terdapat di segi empat grid 6605." |
| **F2** | Missing content / Misleading | The same "Contoh Tafsiran" paragraph replaces the textbook's real content (tanah pamah → petempatan/pengangkutan/pertanian; tanah beralun → getah; "Saliran utama ialah Sungai Nering") with a grammatically broken sentence: *"Manakala kawasan pengangkutan kawasan tinggi disediakan dengan jalan raya, jambatan, petempatan, sekolah, balai polis, pejabat pos dan pejabat daerah."* This sentence doesn't parse in Malay and states nothing the textbook actually says. | `notes.ts:274` | Textbook p.27 (PDF p.35), paragraph 2 |
| **F3** | Missing content / Incorrect fact | The ciri pandang darat **fizikal** list for the Jerteh example is wrong: `notes.ts` says "sungai, tanah pamah dan tanah tinggi" — but "tanah pamah"/"tanah tinggi" are landform descriptions, not the textbook's actual fizikal-feature list for this map, which is **"sungai, hutan dan paya nipah"**. Both "hutan" and "paya nipah" (shown in the map's own legend) are dropped entirely; "Pekan Jabir … pola petempatan berpusat" and the getah/Ladang Bukit Oh details are also missing. | `notes.ts:274` | Textbook p.27 (PDF p.35), paragraph 1 and 3 |
| **F4** | Incorrect fact | Place name misspelled throughout: `notes.ts` and the live quiz bank both say **"Jertih"** — the textbook consistently spells it **"Jerteh"** (map title "Peta Jerteh", p.26/PDF34). | `notes.ts:274`, `src/data/content.ts:14487` (quiz `geo-f2-c2-q28`) | Textbook p.26–27 (PDF 34–35) |
| **F5** | Incorrect fact | "Ladang Bauharu" in `notes.ts` is misspelled — textbook says **"Ladang Baharu"**. | `notes.ts:274` | Textbook p.27 (PDF p.35) |
| **F6** | Incorrect fact | `notes.ts` §2.4's comparison table says Tanah Tinggi's cultural feature is **"Pengangkutan: Kemudahan pengangkutan terhad"** — the textbook says **"Pelancongan: Kemudahan penginapan"** (tourism/accommodation, not transport). Note: `interactive.ts` §2.4 has this correct ("pelancongan") — only `notes.ts` is wrong, so the two files now contradict each other. | `notes.ts:224-226` vs `interactive.ts:138` | Textbook p.24 (PDF p.32), Rajah 2.4 |

### Major

| ID | Category | Issue | Evidence | Textbook reference |
|---|---|---|---|---|
| **F7** | Missing map symbols | `notes.ts` §2.4 "Contoh Simbol Ciri Pandang Darat Fizikal" lists **"Bukit (kontur), Bukit (kontur)"** — the same value duplicated instead of two distinct symbols — and omits **Belukar** and **Tanjung (Tg.)** entirely, both shown in the textbook's Rajah 2.3. | `notes.ts:193` | Textbook p.23 (PDF p.31), Rajah 2.3 |
| **F8** | Missing map symbols | `notes.ts` §2.4 "Contoh Simbol Ciri Pandang Darat Budaya" omits **Jalan kereta api** and **Getah** — both in Rajah 2.3 and used repeatedly across every map in the chapter — and instead lists "Kawasan kediaman, Bangunan" which aren't symbol names used anywhere in this textbook chapter. | `notes.ts:200-206` | Textbook p.23 (PDF p.31), Rajah 2.3 |
| **F9** | Misleading explanation | `notes.ts` §2.4 categorises **"Kelapa sawit"** (oil palm, an economic crop/land-use symbol) under **"Kemudahan sosial"** (social amenities) — a miscategorisation; the textbook's own 5-way split (guna tanah / kegiatan ekonomi / petempatan / kemudahan sosial / pengangkutan) puts crops under land use or economic activity, not social amenities. | `notes.ts:204` | Textbook p.17 (PDF p.25) definition; Rajah 2.3 |
| **F10** | Quiz/flashcard inconsistency | **Zero flashcards exist for Geography Form 2, for any chapter** (confirmed by filtering `src/data/flashcards.ts` for `subjectId: "geography"` + `form: "Form 2"` — 0 of 711 geography entries match; all 711 are Form 1). `geographyF2FlashcardsFor(2)` in the registry therefore always returns an empty array. This isn't unique to Bab 2 — it affects the whole Form 2 Geography subject — but it means the Flashcards tab for this chapter currently shows nothing. | `src/data/flashcards.ts` (0 matches), `src/content/registry.ts:1200` | — |

### Minor

| ID | Category | Issue | Evidence | Textbook reference |
|---|---|---|---|---|
| **F11** | Unnecessary/confusing text | `notes.ts` §2.3 "Rujukan Grid 4 Angka" has a garbled sentence: *"...diikuti dua digit nilai garisan utaraan hendaklah dibaca dahulu, diikuti nilai garisan utaraan."* — repeats "nilai garisan utaraan" twice and is missing "Nilai garisan timuran" before "hendaklah dibaca dahulu", making the sentence confusing to read. | `notes.ts:118` | — (clarity issue, not a textbook mismatch) |
| **F12** | Incorrect fact (minor) | `notes.ts` §2.4 table: "Tanah pamah" cultural feature says **"Petempatan: Bandar"**; textbook says **"Petempatan: Rumah"**. | `notes.ts:219-221` | Textbook p.24 (PDF p.32), Rajah 2.4 |
| **F13** | Incorrect fact (minor) | `notes.ts` §2.4 table: "Pinggir laut" says **"Perikanan: Penangkapan nelayan, pelabuhan"**; textbook says **"Perikanan: Petempatan nelayan, pelabuhan"** (fishing settlements, not "catching of fishermen" — the AcadeMY phrase doesn't quite make sense in Malay). `interactive.ts` has this correct ("petempatan nelayan"); only `notes.ts` is wrong. | `notes.ts:228-230` vs `interactive.ts:142` | Textbook p.24 (PDF p.32), Rajah 2.4 |
| **F14** | Incomplete fact | `notes.ts` §2.4 "Fakta Penting" on JUPEM drops most of its stated functions (perancangan, pembangunan, pemantauan, keselamatan) and has a typo "pemulihardan" (should be "pemuliharaan"). | `notes.ts:242` | Textbook p.24 (PDF p.32) |

### No issues found

- **Grid-reference teaching content** (§2.3 steps, worked examples RG 3153 / RG 314533, the `GridReferenceReader` interactive exercise, and quiz Q13–18) — all verified correct against the textbook and independently re-derived by hand.
- **Quiz bank Q1–Q27, Q29–Q30** — accurate, well-distractored, match the textbook. Only Q28 carries the "Jertih" typo (F4).
- **`mindmap.ts`** — clean, no factual errors found.
- **`interactive.ts`** — accurate throughout (and in two places — F6, F13 — is the version that's actually *correct*, while `notes.ts` is wrong; the two files have drifted apart).
- **Mobile and desktop usability** — the `GridReferenceReader` component (SVG grid + 4-option buttons, progressive reveal of the 6-figure step) was tested live in guest mode on both desktop and ~375px mobile width: renders correctly, no overlap, correct/incorrect feedback works, buttons are comfortably sized. No usability defects found specific to this chapter.

## 4. Root-cause note

`notes.ts` (the longer `StructuredNotes` prose) and `interactive.ts` (what actually renders on `/notes`) have **diverged**: in at least two cases (F6, F13) `interactive.ts` already has the correct textbook fact while `notes.ts` has drifted to something else. This suggests `notes.ts` was edited or generated independently at some point without being re-checked against the textbook or against its sibling `interactive.ts`. Worth keeping in mind for Bab 2 remediation: treat `interactive.ts` as more trustworthy where the two disagree, but still verify each against source rather than assuming.

## 5. Recommended corrections (for Phase 2, pending your approval)

1. Fix F1–F5: rewrite the "Contoh Tafsiran" paragraph in `notes.ts` §2.5 to match the textbook's actual Jerteh example (correct grid 6605, correct fizikal features sungai/hutan/paya nipah, correct place-name spellings, the missing tanah-pamah/tanah-beralun/Sungai Nering sentence, and the Pekan Jabir/pola petempatan berpusat sentence). Fix the same "Jertih" typo in quiz `geo-f2-c2-q28`.
2. Fix F6, F12, F13: correct the three comparison-table cells in `notes.ts` §2.4 to match `interactive.ts`/the textbook (Pelancongan for tanah tinggi, Rumah for tanah pamah, Petempatan nelayan for pinggir laut).
3. Fix F7, F8: replace the duplicated "Bukit (kontur), Bukit (kontur)" bullet and add the missing Belukar/Tanjung/Jalan kereta api/Getah symbols.
4. Fix F9: recategorise Kelapa sawit out of "Kemudahan sosial".
5. Fix F11, F14: reword the garbled RG-4-angka sentence; restore the full JUPEM function list and fix the typo.
6. F10 (flashcards): this is a subject-wide gap, not Bab-2-specific. Recommend scoping it as its own follow-up (likely needs a `geographyF2C{n}Flashcards` file per chapter, following the `geographyF3C3Flashcards` precedent already in the registry) rather than folding it into the Bab 2 content fix — flag it to the content owner for a decision on priority.

## 6. Acceptance checklist (for Phase 2)

- [ ] F1–F9, F11–F14 corrected in `notes.ts` (and `content.ts` for F4's quiz instance)
- [ ] Regression test added locking the corrected facts, matching the Bab 1 pattern (`geography-f2-chapter1-audit.test.ts`)
- [ ] Decision recorded on F10 (flashcards) — fix now or track separately
- [ ] Live re-verification (desktop + mobile) after fixes, before requesting approval

**Do not represent unverified entries as complete.** This document is Phase 1 (audit) only — no code changes have been made.
