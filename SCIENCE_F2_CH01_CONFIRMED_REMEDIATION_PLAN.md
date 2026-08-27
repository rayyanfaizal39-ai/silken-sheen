# Sains Tingkatan 2 Bab 1 — Confirmed Remediation Plan (Stage A Reconciliation)

**Date:** 2026-08-22
**Inputs:** `SCIENCE_F2_CH01_DEEP_AUDIT_REPORT.md` (Claude), `SCIENCE_F2_CH01_CODEX_INDEPENDENT_AUDIT.md` (Codex)
**Authorities:** `audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf`
**Status at time of writing:** No production file modified. Stage A only.

---

## 0. The authority rule that adjudicates every disputed item

Both audits argued about which DSKP **Catatan** entries are binding. The DSKP answers this itself, on
printed p. 39 (PDF p. 51), and neither audit quoted it:

> "Terdapat juga lajur **Catatan** yang memperincikan antara lain:
> • **Skop SK & SP**
> • **Cadangan aktiviti PdP**"
>
> "**Senarai aktiviti yang dicadangkan bukanlah sesuatu yang mutlak.**"

So the Catatan column carries **two different kinds of content**, and they have different force:

| Catatan content type | Force | How this plan treats it |
|---|---|---|
| **Skop SK & SP** — scope statements, `Nota:` blocks, bulleted content lists | **Binding.** It defines what the SP covers. | Counts as a mandatory curriculum requirement |
| **Cadangan aktiviti PdP** — "Menjalankan aktiviti…", "Membuat persembahan…", "Contoh:" | **Not absolute**, by the DSKP's own words | Enrichment; never a release blocker on its own |

Applied to Bab 1:

- SP 1.2.1 **`Nota:`** listing the animal and plant groups → **Skop → binding.** (Supports the invertebrate-hierarchy fix.)
- SP 1.2.1 "Menjalankan aktiviti **membina** kekunci dikotomi" → **Cadangan aktiviti → not absolute.** (Supports deferring key construction.)
- SP 1.1.1 bulleted list under "Membuat persembahan multimedia bagi membincangkan:" → the *presentation* is a suggestion, but the **bulleted content list is Skop → binding.**
- SP 1.1.2 "Kesan aktiviti manusia…" / "…termasuk spesis endemik **dan terancam**" → **Skop → binding.**
- SP 1.2.2 "**Contoh:** Ciri yang membezakan antara tumbuhan, haiwan dan fungi **atau** perbezaan antara mamalia, reptilia, ikan, burung dan amfibia" → an **example**, inside a **suggested activity**, joined by **atau** → **not mandatory.**

---

## 1. Reconciliation of every CRITICAL and HIGH finding

| # | Finding | Claude | Codex | **Final status** | Basis |
|---|---|---|---|---|---|
| R-01 | `notes-bm.ts` / `notes-dlp.ts` registered but unreachable | C-01 CRITICAL | H-01 HIGH | **CONFIRMED** | `registry.ts:3362,3376` set `notes`; `notes.tsx:1956` tests `sciF2C1Data` first and wins; `notes.tsx:2109` is the final `else` of the same ternary. Verified by direct code read. Treated at **CRITICAL** severity because it is the root cause of R-04, R-06, R-08 and several MEDIUMs. |
| R-02 | Mini quiz — dichotomous key / non-living things keyed `false` | C-02 CRITICAL | C-01 CRITICAL | **CONFIRMED** | Textbook Latihan Sumatif 1 Q2(c) (printed p. 18); **official Jawapan printed p. 279 keys it ✓ BETUL**. Glyph mapping cross-checked against Q2(a), which is keyed ✗ and is indeed false. No textbook-vs-reality conflict — both say TRUE. |
| R-03 | Mini quiz — "breathes through gills **as an adult**" keyed *frog* | C-03 CRITICAL | C-02 CRITICAL | **CONFIRMED** | Textbook p. 10: young use gills, adults use lungs + moist skin. The item's own explanation says so. No listed option satisfies the stem as written. |
| R-04 | Live invertebrate tree omits segmented/unsegmented split | H-01 HIGH | M-05 MEDIUM | **CONFIRMED — HIGH** | Textbook Rajah 1.1 (p. 7) is a four-way hierarchy. DSKP SP 1.2.1 `Nota:` is **Skop → binding** (§0). Official Jawapan p. 279 makes segmentation the *first* split in Q6's model key and the answer to Q3(a)(v). Codex's MEDIUM under-rates it: this is examined content, not presentation depth. |
| R-05 | BM key uses `Berbulu` / `Tidak berbulu` | H-02 HIGH | — (confirmed on comparison) | **CONFIRMED — BM only** | Textbook Rajah 1.6 p. 14 reads "**berbulu pelepah**" precisely because textbook p. 11 states mammals are "dilitupi **bulu dan rambut**". `interactive-bm.ts:265` lists the mammal trait as "Berbulu", so the key contradicts the notes on the same screen. DLP ("Feathered") is unaffected. |
| R-06 | Human impact on biodiversity inadequately taught | H-03 HIGH | 1.1.2 PARTIAL | **PARTIALLY_CONFIRMED — remediate** | Codex is right that it is not absent: one COPY sentence plus main-quiz q20 exist. But DSKP "Kesan aktiviti manusia terhadap biodiversiti" is **Skop → binding**, there is no `humanImpact` field in `SciF2C1Content`, and both mind maps omit the branch that textbook Rumusan p. 16 carries. "Inadequate", not "missing". |
| R-07 | All 10 `keywords[].definition` dropped by the renderer | H-04 HIGH | M-02 MEDIUM | **CONFIRMED** | `ScienceF2Chapter1NotesBlock.tsx:243` maps `k.term`; `ChipRow.tsx:4` accepts `items: string[]` only. Five of the ten definitions carry vertebrate group characteristics, so this is curriculum loss, not cosmetic — HIGH is the better call. |
| R-08 | Endemic vs threatened species | H-05 HIGH | PARTIALLY_CONFIRMED | **PARTIALLY_CONFIRMED — remediate** | Teaching gap **confirmed**: no definition of either concept in the rendered notes body; `spesies terancam` never taught; DSKP "termasuk spesis endemik **dan terancam**" is **Skop → binding**. Codex correctly narrows the *conflation* claim — Harimau Malaya and Gajah pygmy genuinely are both endemic and threatened, and flashcard f54 states the concepts differ. So: gap confirmed, "conflation" downgraded to "not distinguished". |
| R-09 | **Fungi** — SP 1.2.2 requires plant/animal/fungi comparison | not raised (read as satisfied via *atau*) | H-02 HIGH | **HUMAN_REVIEW_REQUIRED — not implemented** | DSKP verbatim: "**Contoh:** Ciri yang membezakan antara tumbuhan, haiwan dan fungi **atau** perbezaan antara mamalia, reptilia, ikan, burung dan amfibia." Three independent reasons it is not mandatory: prefixed **Contoh**, **disjunctive (atau)**, and inside a **Cadangan aktiviti** (§0). The SP itself says only "Mencirikan kumpulan taksonomi utama." AcadeMY covers the second disjunct thoroughly. **The DSKP does not clearly make fungi mandatory, so per instruction it is not implemented.** |
| R-10 | Construct-your-own dichotomous key | M-07 MEDIUM | H-03 HIGH | **PARTIALLY_CONFIRMED — split** | (a) *Missing construction feature*: **P2, deferred** — the mandatory SP verb is "Membezakan… **dengan** kekunci dikotomi" (use); "membina" is Cadangan aktiviti (§0). (b) *The heading promises it anyway*: **CONFIRMED and fixed now** — `starMapHead` reads "⭐ Bina kekunci dikotomi / Build a dichotomous key" while the interaction only traverses. Correcting a false label is not building a feature. |

### Codex-only findings, independently verified in code

| # | Finding | Verified? | Final status |
|---|---|---|---|
| R-11 | BM `starMapIntro` calls the key "satu siri **soalan ya/tidak**"; EN correctly says "either/or questions" | **Yes** — `ScienceF2Chapter1NotesBlock.tsx:118` vs `:83` | **CONFIRMED (LOW)** — fixed now: a factual mischaracterisation of the key concept, sitting in the same COPY object as the R-10(b) fix |
| R-12 | Chapter header hard-codes `modules: 12, experiments: 2` | **Yes** — `notes.tsx:840` | **CONFIRMED (MEDIUM)** — **deferred**: different file, not curriculum content, outside the agreed P0/P1 scope |
| R-13 | Insect-success rationale not grounded in the sources | **Yes** — textbook p. 8 gives only "kumpulan haiwan yang paling besar" + 950,000 species; the exoskeleton/size/reproduction causation is AcadeMY's | **PARTIALLY_CONFIRMED — minimal action** (see below) |
| R-14 | English-only chrome in BM Star Map + Mind Map wrapper | **Yes** — `DichotomousStarMap.tsx:25,87`; `MindMapBlock.tsx` | **CONFIRMED (LOW/MEDIUM)** — **deferred**: pure localisation, no curriculum impact |

**R-13 determination** (required by instruction item C): the claim is **scientifically sound but not
textbook-derived**. It is *already* labelled `[KBAT]` on flashcard f42 (`flashcards-bm.ts:384`) but
**not** labelled on main-quiz q23, whose explanation asserts it as plain fact. **Retain, do not
delete** — it is legitimate higher-order reasoning of exactly the kind KBAT items exercise.
**Minimal action:** add an enrichment marker to the q23 explanation in BM and DLP so it cannot be
mistaken for a textbook statement. No stem, option or answer-key change.

---

## 2. Architecture decision

**Rejected:** rendering `notes-*.ts` and the interactive block one after another. That would duplicate
the biodiversity definition, importance, conservation, vertebrate traits and both dichotomous keys on a
single page and bloat the learner surface.

**Adopted:** keep `ScienceF2Chapter1NotesBlock` as the single learner experience. Treat `notes-bm.ts` /
`notes-dlp.ts` as **source material**, and port across only content that reconciliation proves is
(a) required by binding DSKP Skop or the textbook, and (b) genuinely absent from the live surface —
namely R-04, R-04b, R-05, R-06, R-07 and R-08.

**Not ported** (already adequately live, or non-binding): quick-revision restatements, exam-tip and
common-mistake blocks, the transcribed worked keys (the Star Map is the live equivalent), `keyExamFacts`
and `keyTerms`.

`notes-bm.ts` and `notes-dlp.ts` are **retained, not deleted**. They may be retired only after the
repaired live version passes final QA.

---

## 3. Schema impact and blast radius

Verified by grep: `ClassificationTree`, `DichotomousStarMap`, `ClassificationBranch` and `CompareColumn`
are consumed **only** by Chapter 1 and their own component files. `MiniQuizItem` and `FlipCardItem` are
shared with `ScienceF2InteractiveNotesBlock`, `ScienceF3InteractiveNotesBlock` and
`form3/science/interactive-types.ts` — **those two types will not be changed.**

Planned additions to `src/content/form2/science/chapter-1/interactive-types.ts` (chapter-scoped):

- `ClassificationSubGroup` + optional `ClassificationBranch.subGroups` — enables the binding two-level invertebrate hierarchy (R-04) and carries the legged-invertebrate traits (R-04b)
- `HumanImpactItem` + `SciF2C1Content.humanImpact` (R-06)
- `SpeciesConcept` + `SciF2C1Content.speciesConcepts` (R-08)
- **Remove** `SciF2C1Content.endemicSpecies`, folding its five entries into `speciesConcepts[0].examples` — leaving it in place would orphan it and recreate the exact NOT_RENDERED defect being fixed.

---

## 4. Stage B work list (CONFIRMED items only)

### P0 — factual / assessment errors
1. **R-02** — mini quiz #1 → `answer: true`, explanation rewritten. BM + DLP.
2. **R-03** — mini quiz #2 → stem re-scoped to young-vs-adult amphibian respiration; explanation aligned. BM + DLP.
3. **R-05** — BM Star Map key → `Berbulu pelepah` / `Tidak berbulu pelepah`; BM mammal trait → `Berbulu dan rambut` (textbook p. 11); BM main-quiz **q21** wording aligned. DLP already correct — untouched.

### P1 — live curriculum coverage
4. **R-04** — restore the binding four-way invertebrate hierarchy to the live tree (BM + DLP).
5. **R-04b** — legged-invertebrate defining traits (`badan bersegmen`, `kulit keras / rangka luar`; textbook p. 8).
6. **R-06** — `humanImpact` cause → effect chains, minimum `penyahhutanan → kehilangan habitat → kehilangan sumber makanan → ancaman kepupusan`.
7. **R-07** — render keyword definitions via a compact tap-to-reveal glossary (not ten paragraphs).
8. **R-08** — teach endemik and terancam as distinct concepts with an explicit "endemik ≠ automatically terancam" caution; update `checkYourself11` Q4 accordingly.
9. **R-10b / R-11** — correct the Star Map heading ("Bina/Build" → "Guna/Use") and the BM "soalan ya/tidak" mischaracterisation.
10. **R-13** — enrichment marker on main-quiz q23 explanation (BM + DLP). Explanation text only.

### Deferred
- **R-09 fungi** — HUMAN_REVIEW_REQUIRED, not implemented.
- **R-10a key construction** — P2 optional enrichment, not built.
- **R-12 header metadata**, **R-14 BM UI localisation** — confirmed but outside the agreed scope.
- All remaining MEDIUM/LOW findings from both audits.

### Explicitly not doing
No fungi content; no key-construction feature; no quiz-bank or flashcard regeneration; no chapter
redesign; no changes to other chapters; no deletion of `notes-*.ts`; no notes-architecture refactor.
