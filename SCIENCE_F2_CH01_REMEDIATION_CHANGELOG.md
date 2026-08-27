# Sains Tingkatan 2 Bab 1 — Remediation Changelog

**Date:** 2026-08-22
**Stage A plan:** `SCIENCE_F2_CH01_CONFIRMED_REMEDIATION_PLAN.md`
**Authorities:** `audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf`

---

## Reconciliation

The DSKP settles the two authority disputes itself, on printed p. 39 (PDF p. 51) — a passage neither
audit quoted:

> "Terdapat juga lajur **Catatan** yang memperincikan antara lain: • **Skop SK & SP** • **Cadangan aktiviti PdP**"
> "**Senarai aktiviti yang dicadangkan bukanlah sesuatu yang mutlak.**"

So Catatan carries **binding scope** *and* **non-binding suggested activities**. Scope statements and
`Nota:` blocks are mandatory; "Menjalankan aktiviti…" and "Contoh:" entries are not. Every disputed
classification below follows that rule.

| Finding | Claude | Codex | Final Status | Reason |
|---|---|---|---|---|
| Registered `notes-*.ts` unreachable | C-01 CRITICAL | H-01 HIGH | **CONFIRMED** | `notes.tsx:1956` tests `sciF2C1Data` and wins; `notes.tsx:2109` is the final `else` of the same ternary. Root cause of several other findings, so carried at CRITICAL. |
| Mini quiz — non-living things keyed `false` | C-02 CRITICAL | C-01 CRITICAL | **CONFIRMED** | Textbook Latihan Sumatif 1 Q2(c) (p. 18); official Jawapan p. 279 keys it ✓ BETUL. Glyph mapping cross-checked against Q2(a), keyed ✗ and genuinely false. |
| Mini quiz — "gills as an adult" keyed *frog* | C-03 CRITICAL | C-02 CRITICAL | **CONFIRMED** | Textbook p. 10; the item's own explanation contradicts its stem. No option satisfies the stem as written. |
| Invertebrate segmentation missing from live notes | H-01 HIGH | M-05 MEDIUM | **CONFIRMED — HIGH** | Textbook Rajah 1.1 (p. 7) is four-way. DSKP SP 1.2.1 `Nota:` is **Skop → binding**. Official Jawapan p. 279 makes segmentation the first split in Q6 and the answer to Q3(a)(v) — examined content, so Codex's MEDIUM under-rates it. |
| BM key uses `Berbulu` / `Tidak berbulu` | H-02 HIGH | not in frozen findings | **CONFIRMED — BM only** | Textbook Rajah 1.6 (p. 14) says "berbulu **pelepah**" precisely because p. 11 states mammals are "dilitupi bulu **dan rambut**". DLP "Feathered" is unambiguous in English and needed no change. |
| Human impact inadequately taught | H-03 HIGH | 1.1.2 PARTIAL | **PARTIALLY_CONFIRMED → remediated** | Codex is right it is not absent (one COPY sentence + quiz q20). But DSKP "Kesan aktiviti manusia" is **Skop → binding**, there was no `humanImpact` field, and both mind maps omit the branch textbook Rumusan p. 16 carries. |
| 10 keyword definitions dropped | H-04 HIGH | M-02 MEDIUM | **CONFIRMED** | `ScienceF2Chapter1NotesBlock.tsx:243` mapped `k.term`; `ChipRow` has no definition slot. Five definitions carry vertebrate characteristics — curriculum loss, so HIGH. |
| Endemic vs threatened | H-05 HIGH | PARTIALLY_CONFIRMED | **PARTIALLY_CONFIRMED → remediated** | Teaching gap confirmed (neither concept defined in the rendered body; DSKP "endemik **dan terancam**" is Skop). Codex correctly narrows *conflation*: the named species genuinely are both, and flashcard f54 already distinguishes them. Reframed as "not distinguished". |
| **Fungi** / SP 1.2.2 | not raised | H-02 HIGH | **HUMAN_REVIEW_REQUIRED — not implemented** | DSKP verbatim: "**Contoh:** … tumbuhan, haiwan dan fungi **atau** perbezaan antara mamalia, reptilia, ikan, burung dan amfibia." Prefixed *Contoh*, **disjunctive**, and inside a *Cadangan aktiviti*. The SP itself says only "Mencirikan kumpulan taksonomi utama." Not clearly mandatory → deferred per instruction. |
| Construct-your-own key | M-07 MEDIUM | H-03 HIGH | **PARTIALLY_CONFIRMED — split** | (a) Feature: **P2 deferred** — SP verb is "Membezakan… **dengan**" (use); "membina" is Cadangan aktiviti. (b) The heading promised it anyway: **CONFIRMED, fixed** — correcting a false label is not building a feature. |
| BM "soalan ya/tidak" | not raised | L-01 LOW | **CONFIRMED — fixed** | Verified at `:118` vs EN `:83`. A factual mischaracterisation of the key concept, in the same COPY object as the heading fix. |
| Header `modules: 12, experiments: 2` | not raised | M-03 MEDIUM | **CONFIRMED — deferred** | Verified at `notes.tsx:840`. Different file, not curriculum content, outside agreed scope. |
| Insect-success rationale ungrounded | judged sound KBAT | M-04 MEDIUM | **PARTIALLY_CONFIRMED — labelled, retained** | Textbook p. 8 gives only "kumpulan haiwan terbesar" + 950,000 species. Flashcard f42 was already `[KBAT]`-tagged; main-quiz q23 was not. Retained as legitimate higher-order reasoning; marker added so it cannot read as a textbook statement. |
| English-only chrome in BM Star Map / Mind Map | M-08 MEDIUM | L-02 LOW | **CONFIRMED — deferred** | Pure localisation, no curriculum impact. |

---

## P0 Fixes

**1 · Non-living-things mini quiz now matches the official KPM answer key** — `interactive-bm.ts`, `interactive-dlp.ts`

- `answer: false` → `answer: true`; stem reworded to mirror Latihan Sumatif 1 Q2(c); explanation rewritten to teach *why* (a key is an either/or identification method, so it also works on rocks or manufactured objects, while this chapter applies it to organisms).
- Verified at runtime: clicking **Betul / True** now styles green (correct) and awards XP.

**2 · Amphibian mini quiz no longer teaches that adults use gills** — `interactive-bm.ts`, `interactive-dlp.ts`

- Stem re-scoped to the textbook's actual distinction (p. 10): *"Haiwan manakah yang **ANAKNYA** bernafas melalui insang, tetapi apabila **DEWASA** bernafas menggunakan peparu dan kulit yang lembap?"* / *"Which animal's **YOUNG** breathe through gills, while the **ADULT** breathes through lungs and moist skin?"*
- This now uniquely identifies the frog, and the explanation agrees with the stem instead of refuting it.

**3 · BM dichotomous key uses the textbook discriminator** — `interactive-bm.ts`, `quizzes-bm.ts`

- Star Map node 3 → question *"Adakah badannya dilitupi bulu pelepah?"*, choices **"Berbulu pelepah" / "Tidak berbulu pelepah"** (textbook Rajah 1.6, p. 14).
- BM mammal trait `"Berbulu"` → `"Badan dilitupi bulu dan rambut (bukan bulu pelepah)"` (textbook p. 11) — this removes the contradiction that made the old key unusable.
- BM main-quiz **q21** aligned to the same wording, with the explanation now teaching the distinction explicitly.
- **DLP deliberately untouched**: "Feathered / Non-feathered" already excludes mammals in English, and changing it would have forced an unnecessary DLP q21 edit.

---

## P1 Fixes

**4 + 5 · Binding four-way invertebrate hierarchy restored, with legged traits** — `interactive-types.ts`, `interactive-bm.ts`, `interactive-dlp.ts`, `ClassificationTree.tsx`

New optional `ClassificationSubGroup` type plus `ClassificationBranch.subGroups`, rendered as a genuine two-level nest:

```
Invertebrata
├── Tanpa kaki
│   ├── Badan tanpa segmen : Span, Karang laut, Planaria, Siput
│   └── Badan bersegmen    : Cacing tanah, Lintah, Cacing pita
└── Berkaki  — "Ciri sepunya: badan bersegmen, dan kulit keras (rangka luar)."
    ├── Tiga pasang kaki               : Semut, Rama-rama, Lipas
    └── Lebih daripada tiga pasang kaki: Labah-labah, Kala jengking, Lipan, Udang, Belangkas
```

Examples are textbook-confirmed (pp. 7–9). One ambiguous organism token in Gambar foto 1.6 did not
extract cleanly and was **omitted rather than guessed**. `Anemon laut` / `Sea anemone` was replaced with
the textbook's `Karang laut` / `Coral`.

**6 · Human-impact cause → effect teaching** — `interactive-types.ts`, `interactive-bm.ts`, `interactive-dlp.ts`, `ScienceF2Chapter1NotesBlock.tsx`

New `humanImpact` field, rendered as arrow chains **before** the conservation response (threat first,
then answer — the textbook p. 6 narrative order):

- 🪓 Penyahhutanan → Hutan ditebang → Haiwan kehilangan habitat → Haiwan kehilangan sumber makanan → Spesies terancam kepupusan
- 🎯 Pemburuan/pemerdagangan → bilangan menurun → endemik & terancam paling terjejas → Akta Perlindungan Hidupan Liar 1972 mengharamkannya
- ⚖️ Keperluan pembangunan lwn. pemeliharaan → penyahhutanan perlu DIKAWAL → biodiversiti terpelihara

All three trace to textbook p. 6 and Gambar foto 1.4. The third supplies the *mewajarkan* (justify)
angle SP 1.1.2 asks for.

**7 · Keyword definitions now reachable** — `ScienceF2Chapter1NotesBlock.tsx`

New local `KeywordGlossary`: the ten terms stay a compact chip row, but each chip is a button that
reveals **one** definition in a panel below. No wall of paragraphs; nothing authored is discarded.

**8 · Endemic and threatened taught as distinct concepts** — `interactive-types.ts`, both interactive files, component

New `speciesConcepts` (tabbed, mirroring the in situ / ex situ pattern) plus a `speciesCaution` callout:

> "Endemik dan terancam **BUKAN** perkara yang sama. Sesuatu spesies boleh endemik sahaja, terancam sahaja, atau kedua-duanya sekali — contohnya harimau Malaya."

Each concept carries its own definition and examples; endemic states it is about **LOCATION**, threatened
about **RISK OF EXTINCTION**. Threatened examples are textbook-grounded (p. 6 Act coverage; p. 11
"burung enggang… dilindungi"). `endemicSpecies` was **removed** rather than orphaned — leaving it would
have recreated the exact NOT_RENDERED defect being fixed.

`checkYourself11` Q4 rewritten from *"Name a threatened species"* (previously answered from the endemic
list) to *"What is the difference between endemic and threatened? Give one example of each."*

**9 · Ported from the dead `notes-*.ts`**

Reconciliation proved these were required on the live surface and they are now there: the invertebrate
segmentation hierarchy, the legged-invertebrate defining traits, the human-impact chain, and the endemic
definition. Not ported (already live, or non-binding): quick-revision restatements, exam-tip and
common-mistake blocks, the transcribed worked keys (the Star Map is the live equivalent), `keyExamFacts`
and `keyTerms`.

**Scope note — two adjacent corrections made deliberately, disclosed for review**

Both are single-string curriculum corrections inside the COPY object already being edited for P0 #3, not
a MEDIUM/LOW sweep:

- `starMapHead`: "⭐ **Bina** kekunci dikotomi / **Build** a dichotomous key" → "⭐ **Guna** / **Use**". The interaction only traverses a key; the heading promised construction. Label corrected — **no feature was built.**
- BM `starMapIntro`: "satu siri **soalan ya/tidak**" → "satu siri **kuplet** — setiap kuplet menawarkan dua ciri berpasangan". EN already said "either/or".

**10 · Insect-success rationale labelled, not deleted** — `quizzes-bm.ts` q23, `quizzes-dlp.ts` q23

Explanation only; stem, options and answer key untouched. Added: *"[Nota KBAT — penaakulan lanjutan: buku
teks hanya menyatakan bahawa serangga ialah kumpulan haiwan terbesar dengan 950,000 spesies; sebab-sebab
di atas ialah huraian tambahan, bukan petikan buku teks.]"* and the DLP equivalent.

---

## Deferred Human Review

| Item | Status | What a curriculum owner needs to decide |
|---|---|---|
| **Fungi / plant-animal-fungi comparison** | **HUMAN_REVIEW_REQUIRED — not implemented** | DSKP SP 1.2.2 Catatan reads "**Contoh:** Ciri yang membezakan antara tumbuhan, haiwan dan fungi **atau** perbezaan antara mamalia, reptilia, ikan, burung dan amfibia." It is an example, disjunctive, and inside a suggested activity; the SP itself names no groups. AcadeMY covers the second disjunct in depth. **Decision needed:** does house policy require exhausting both disjuncts? If yes, this becomes a content task across notes, mind map, quiz and flashcards. |
| **Construct-your-own dichotomous key** | **P2 optional enrichment — not built** | The mandatory verb is "Membezakan… **dengan** kekunci dikotomi". "Membina" appears only as Cadangan aktiviti, which the DSKP itself calls non-absolute. However the textbook assesses construction twice summatively (Latihan Sumatif 1 Q3 completes a key, Q6 builds one), so exam-readiness evidence is thinner than the SP alone implies. |
| **Errata provenance** | **Unresolved authority issue** | `Errata.pdf` self-declares that no KPM-/BBT-/Karangkraf-hosted original was found, and carries no date. It reports no Bab 1 correction, so nothing here turns on it — but **no fix in this changelog should be described as "errata-verified"**. |
| **DLP textbook absent** | **Unresolved authority issue** | Only the BM textbook exists in the source pack. All DLP strings were validated by translation equivalence against it, not against an English-stream authority. |
| **Terminology policy** | **Deferred** | "Homeoterma" (AcadeMY) vs "**Homoioterma**" (textbook p. 9); BM "berpembuluh" vs textbook "**vaskular**" (DLP already uses "vascular"). Exam-alignment call, left untouched to avoid rippling into the quiz and flashcard banks. |
| **Header metadata** (`modules: 12, experiments: 2`) | **Confirmed, deferred** | `notes.tsx:840` overstates what the chapter renders. Outside the agreed scope. |
| **BM UI localisation** | **Confirmed, deferred** | `DichotomousStarMap` hard-codes "🌟 Identified:" and defaults `restartLabel` to English; `MindMapBlock` chrome is English on the BM route. |

---

## Files Modified

| File | Change |
|---|---|
| `src/content/form2/science/chapter-1/interactive-types.ts` | +`ClassificationSubGroup`, +`ClassificationBranch.subGroups`, +`HumanImpactItem`, +`SpeciesConcept`, +`humanImpact`, +`speciesConcepts`, +`speciesCaution`, −`endemicSpecies` |
| `src/content/form2/science/chapter-1/interactive-bm.ts` | Both mini quizzes; key node 3; mammal trait; invertebrate hierarchy; human impact; species concepts; checkYourself Q4 |
| `src/content/form2/science/chapter-1/interactive-dlp.ts` | Both mini quizzes; mammal trait; invertebrate hierarchy; human impact; species concepts; checkYourself Q4 |
| `src/components/notes/ScienceF2Chapter1NotesBlock.tsx` | +`KeywordGlossary`; human-impact block; species-concept tabs + caution; COPY keys; Star Map heading and BM intro corrections |
| `src/components/notes/blocks/ClassificationTree.tsx` | Renders `branch.subGroups` as a two-level nest (additive; optional field, no other consumer affected) |
| `src/content/form2/science/chapter-1/quizzes-bm.ts` | q21 "bulu pelepah" wording; q23 KBAT marker |
| `src/content/form2/science/chapter-1/quizzes-dlp.ts` | q23 KBAT marker only |

**Blast radius checked:** `ClassificationTree`, `DichotomousStarMap`, `ClassificationBranch` and
`CompareColumn` are consumed only by Chapter 1. `MiniQuizItem` and `FlipCardItem` are shared with
`ScienceF2InteractiveNotesBlock`, `ScienceF3InteractiveNotesBlock` and `form3/science/interactive-types.ts`
— **neither type was changed.**

`notes-bm.ts` and `notes-dlp.ts` are byte-identical to before (`git diff` empty) and remain on disk.

---

## Runtime QA

Dev server started with the repo's own `npm run dev`. It serves on **port 8080** (`.claude/launch.json`
says 5173 — a pre-existing config mismatch, left alone).

The authenticated learner route redirects to `/login`, and I did not enter credentials. Instead the
component was mounted and driven directly from the **live Vite dev module graph**, so every result below
comes from the code the app actually serves, in both languages.

| # | Check | BM | DLP | Evidence |
|---|---|---|---|---|
| 1 | Notes route loads | ✅ | ✅ | Server 200s; modules resolve; component mounts (7,448 / 6,558 chars rendered) |
| 2 | ONE coherent notes experience | ✅ | ✅ | Single `ScienceF2Chapter1NotesBlock`; route ternary can only reach one branch |
| 3 | No duplicate legacy notes | ✅ | ✅ | Legacy markers ("Wajib Hafal", "Tip Peperiksaan", "Kesilapan Lazim") absent from render |
| 4 | Invertebrate hierarchy renders | ✅ | ✅ | Level 1 (Tanpa kaki / Berkaki) + leg-pair split both true; 4 nested blocks |
| 5 | Segmented/unsegmented visible | ✅ | ✅ | "Badan tanpa segmen" & "Badan bersegmen" true; "Cacing pita"/"Tapeworm" now visible |
| 6 | Keyword definitions open | ✅ | ✅ | 10 chip buttons; tapping "Biodiversiti"/"Biodiversity" reveals its definition |
| 7 | Human-impact content visible | ✅ | ✅ | Heading present; 8 arrow glyphs = chains of 4+4+3 |
| 8 | Endemic vs threatened distinguished | ✅ | ✅ | Tabs `Spesies endemik` / `Spesies terancam`; threatened tab `inactive → active` reveals "RISIKO KEPUPUSAN"/"RISK OF EXTINCTION"; caution callout renders |
| 9 | BM Star Map uses "berbulu pelepah" | ✅ | n/a | Node 3 question and both choice labels confirmed |
| 10 | Lion and chicken route correctly | ✅ | ✅ | All 5 paths walked: `Homeoterma > Berbulu pelepah => Ayam`; `Homeoterma > Tidak berbulu pelepah => Singa`. Leaf set == declared star set |
| 11 | Non-living mini quiz accepts TRUE | ✅ | ✅ | `answer: true` in served module |
| 12 | Correct answer receives XP | ✅ | ✅ | Clicking Betul/True styles emerald (the `addXp(15)` branch) |
| 13 | Amphibian item no longer says adults use gills | ✅ | ✅ | Stem matches `ANAKNYA`/`YOUNG`; old phrasing absent from render |
| 14 | BM and DLP semantically aligned | ✅ | ✅ | Field-by-field parity dump matched across every changed structure |
| 15 | No console/runtime errors | ✅ | ✅ | `read_console_messages(onlyErrors)` — none |

**Limitation:** the authenticated end-to-end page (header, XP persistence, progress tracking) was not
exercised, because doing so would have required signing in. Component-level behaviour was verified
directly instead.

---

## Automated Tests

| Command | Result | Notes |
|---|---|---|
| `npx tsc --noEmit -p tsconfig.json` | **exit 0** | Clean. (Direct compiler invocation — the repo has no `typecheck` script, and `vite build` does not typecheck.) |
| `npm run build` | **exit 0** | Full pipeline: content stats → vite build → static shell → sitemap → wrangler patch → pages worker. Built in 10.61 s. |
| `npm test` (`vitest run`) | **1372 passed, 7 failed (164 files)** | **All 7 failures pre-existing.** Verified by stashing the change set and re-running the same 7 files on a clean tree: identical 7 failures. They are BM mind-map registration ×4, Math F2 C1 objective routing, `billing-core`, `invoice-pdf.server` — none touch Science F2 C1. |
| `npm run lint` (`eslint .`) | Fails repo-wide | **Pre-existing, environmental.** Every file is CRLF while prettier is configured for LF; an **untouched** sibling (`chapter-2/quizzes-dlp.ts`) alone produces 481 errors. Filtering formatting rules out of my 7 changed files gives **0 non-formatting errors**. |
| `npm run audit:quizzes` | 18 criticals | **All Math Form 1 ch. 3/4/5 metadata mismatches — pre-existing and unrelated.** Science F2 C1 reports clean: 30 BM + 30 DLP registered and routed. |

Build side-effect `src/lib/content-stats.generated.ts` was regenerated with LF only (empty content diff)
and has been restored.

---

## Remaining Issues

**Confirmed but deliberately out of scope** (agreed deferrals, not oversights):

- Fungi coverage — awaiting curriculum-owner adjudication (evidence supplied above)
- Construct-your-own key interaction — P2 enrichment
- Header metadata overstatement (`notes.tsx:840`)
- BM UI localisation: "🌟 Identified:", `restartLabel`, `MindMapBlock` chrome
- Terminology: Homeoterma/Homoioterma, berpembuluh/vaskular
- Mind maps still omit a human-impact branch (the live notes now carry it)
- Mini-quiz renderer styles only the chosen option, so a wrong pick does not also highlight the right one
- DSKP economic sub-items *bioteknologi* and *sumber ekologi* still absent
- Repo-wide CRLF vs prettier LF mismatch making `npm run lint` unusable as a gate
- 7 pre-existing test failures and 18 pre-existing quiz-audit criticals in Math/BM/billing

**`notes-bm.ts` / `notes-dlp.ts` remain in place and unreferenced by the notes route.** They are retained
as source material and should be retired only after this repaired version passes final QA — at which
point the registry `notes:` entries for both Chapter 1 rows should be removed too.

---

CONFIRMED CRITICAL ISSUES REMAINING: **0**
CONFIRMED HIGH ISSUES REMAINING: **0** *(all HIGH items either remediated or formally deferred with the authority evidence recorded above; the fungi item is HUMAN_REVIEW_REQUIRED, not an accepted HIGH defect)*

UNRELATED CHAPTERS MODIFIED: NO
LEGACY NOTES FILES DELETED: NO
GLOBAL REWRITE PERFORMED: NO

---

## Learner-Facing Cleanup Pass (2026-08-24)

Follow-up to `SCIENCE_F2_CH01_03_LEARNER_FACING_QA_AUDIT.md`. No academic content changed — this
pass only removed internal curriculum/audit language that had leaked into what students see.

**Fixed:**
- `quizzes-{bm,dlp}.ts` `q23` explanation: deleted a bracketed reviewer note
  ("[Nota KBAT — ...buku teks hanya menyatakan..." / "[KBAT note — ...the textbook states
  only...") that explained internal answer-sourcing to a content reviewer rather than teaching
  the student. The scientific explanation sentence itself, the question, options and
  `answerIndex` are all unchanged.
- `ScienceF2Chapter1NotesBlock.tsx`'s hardcoded section `eyebrow` values (`"1.1"`, `"1.2"`) are
  no longer rendered — fixed at the shared `ScienceSectionedNotesShell.tsx` rendering layer
  (see the Chapter 3 changelog for the full mechanism writeup), not by deleting the values from
  this component. Section navigation is index-driven and unaffected.

**New regression coverage:** `ScienceF2Chapter1NotesBlock.test.tsx` (asserts "1.1"/"1.2" never
render) and `src/content/form2/science/learner-facing-leakage.test.ts` (asserts no
DSKP/textbook/audit-language patterns across all three chapters' live BM+DLP content).

**Verified:** typecheck PASS, build PASS, quiz integrity unchanged (30/30 both languages), all
previously-frozen Chapter 1 corrections (dichotomous key, amphibian breathing, invertebrate
hierarchy, endemic vs threatened, human impact, "bulu pelepah") re-checked and untouched by this
pass. Full findings and counts: `SCIENCE_F2_CH01_03_LEARNER_FACING_QA_AUDIT.md` §"Post-Cleanup
Verification".
