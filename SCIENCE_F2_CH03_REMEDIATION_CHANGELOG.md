# REMEDIATION — Sains / Science Tingkatan 2, Bab 3: Nutrisi (BM + DLP)

**Mode:** Targeted remediation of the live interactive notes surface, driven by
`SCIENCE_F2_CH03_DEEP_AUDIT_REPORT.md` and re-verified directly against
`audit-sources/Science/Form-2/DSKP.pdf`, `Textbook.pdf` and `Errata.pdf`.
**Scope:** `science-f2-c3-bm` and `science-f2-c3-dlp`. The sectioned-notes architecture was
kept; the legacy `notes-bm.ts` / `notes-dlp.ts` pair was **not** rendered and **not** deleted.
**Date:** 2026-08-23.

---

## 1. Reconciliation

Before writing any fix, every audit finding was re-checked against the primary sources
(`pypdf` text extraction of the DSKP and textbook PDFs, since poppler is unavailable in this
environment — the same limitation the audit itself recorded). One correction to the audit
itself came out of that re-check, and is called out explicitly in §6 rather than silently
applied: **M-07 (Kwashiorkor) is retracted.** The audit reported zero occurrences of
"Kwashiorkor" in the textbook. Direct extraction of textbook printed p. 47 (PDF p. 55) found
the disease *is* in the book, spelled **"Kwasyiorkor"** — a BM transliteration variant the
audit's search missed. It sits in a "Sains" sidebar box next to the Protein section, exactly
the kind of textbook-sourced enrichment AcadeMY already treats as legitimate (the same
standing given to BMI and the NHMS 2016 statistics). Quiz `q3` / `q3` (BM/DLP) and flashcard
`f47` were therefore **kept as-is**, not replaced, and the Protein card in the new §3.1.1 now
carries a `detail` line citing the textbook spelling.

Every other CRITICAL, HIGH and MEDIUM finding in the audit was independently re-verified
against the extracted PDF text (Textbook pp. 44–74, DSKP pp. 49–52) before being fixed —
none of them were search artifacts; all were real.

---

## 2. Critical fixes (all five closed)

| ID | Fix |
|---|---|
| **C-01** | Protein digestion rewritten as the true three-stage chain — protease **PERUT**: protein→polipeptida; protease **PANKREAS** (acts in duodenum): polipeptida→dipeptida; protease **USUS KECIL**: dipeptida→asid amino. Applied to the §3.3.1 Journey steps and the §3.3.3 enzyme tabs, matching Rajah 3.14 and the existing (already-correct) mind map/flashcard/quiz-q27 chain. |
| **C-02** | Pankreas, hati and pundi hempedu added as first-class content: a new digestive-system diagram (accessory-organ nodes wired to the duodenum), a Duodenum step in the Journey naming all three organs' outputs, and the accessory-organ tabs/notes in §3.3.1/§3.3.3. |
| **C-03** | New §3.2.3 "Gaya Hidup Sihat" section: a cause→effect chain per DSKP-named disease group (jantung/tekanan darah/kencing manis/kanser kulit/kanser peparu), the obesity↔makanan-diproses/rapu link, and NHMS 2016 stats demoted to supporting context (an accordion), not core memorisation. |
| **C-04** | New §3.4.2 "Eksperimen Tiub Visking": aim, hypothesis, three variable types, brief method, observations/inference and conclusion, re-derived from Eksperimen 3.1 (textbook printed p. 67) — not from the flawed NotebookLM description. See §6. |
| **C-05** | New §3.4.3 "Asimilasi & Kerjasama Sistem": three-system cause→effect chain (pencernaan → peredaran darah → respirasi) plus an explicit asimilasi definition and the three end-product uses (glucose→energy, amino acids→cell components, fatty acids+glycerol→fat). |

---

## 3. High fixes (all seven closed)

- **H-01** Food pyramid — see §5 (dedicated section, this was the "human review required" item).
- **H-02** Legacy notes (`notes-bm.ts` / `notes-dlp.ts`) remain unregistered/unrendered, per architecture decision. Not deleted. See §8 for what was ported out of them.
- **H-03** Every concept the quiz/flashcard layer already assessed but the notes never taught (pancreatic function, duodenum, maltase/maltose→glucose, BMI, assimilation, HCl, three-system cooperation, serving counts) is now taught somewhere in the 13 sections.
- **H-04** New §3.2.2 "Nilai Kalori & Perancangan Diet": the 890-kcal worked breakfast example (Aktiviti 3.2, textbook p. 55), the 1 cal = 4.2 J conversion, and a diet-planning activity description (Aktiviti 3.4 pattern).
- **H-05** Duodenum inserted into the digestion Journey between Perut and Usus kecil (BM and DLP), matching Rajah 3.12 and the textbook's own answer key (Latihan Sumatif 3 Q3).
- **H-06** `isScienceDiscovery` generalised in `notes.tsx` from a hardcoded `chapter === 2` check to `!!activeChapter?.sciF2InteractiveData`, so Bab 3 (and Bab 4–13) now get the Science Discovery header + Mini Investigation chrome through the *same* mechanism as Bab 2, not a new Bab-3-only flag. See §12 for the side effect on Chapters 4–13.
- **H-07** New §3.3.2 "Pencernaan Fizikal & Kimia": a two-column comparison built from Rajah 3.10 (location, mechanism, enzyme involvement).

---

## 4. Medium fixes included

- **M-01** §3.1.2 now names all six DSKP vitamins (A,B,C,D,E,K) and all six minerals (kalsium, natrium, besi, iodin, fosforus, kalium), each with source/importance/deficiency, plus a water-soluble/fat-soluble comparison.
- **M-02** Enzyme secretion sources corrected: amilase = kelenjar air liur + pankreas; protease = perut / pankreas / usus kecil (three separate secretions); lipase = pankreas + usus kecil. Source organ and site of action are now stated separately for each.
- **M-03** The carbohydrate pathway is closed end-to-end: kanji→maltosa (§3.3.1/§3.3.3) →glukosa (§3.3.3 maltase accordion, cargo-labelled again in the §3.4.1 villus diagram). Maltase is explicitly labelled "Butiran Buku Teks" / "Textbook Detail," not a core DSKP enzyme, and quiz `q19` is left in place since the concept is now actually taught.
- **M-04** Two new diagrams replace the flat prose: `PyramidDiagram` (tiered, proportional bars — not a stepper) and `DigestiveSystemDiagram` (a whole-system, tap-to-inspect schematic, not a one-organ-at-a-time card).
- **M-05** Hydrochloric acid named explicitly with both functions (activates protease; kills bacteria) in the Perut Journey step and a dedicated §3.3.3 accordion.
- **M-06** New §3.4.4 "Penyahtinjaan" cause→effect chain covers the two DSKP-binding discussion points: low-fibre/low-water → constipation, and the water/fibre remedy — not just the one clause it had before.
- **M-07** Retracted — see §1 and §6.

---

## 5. Food Pyramid 2020 decision

**Decision (per remediation instructions, treated as the human-review resolution the original
audit flagged as pending):** the pyramid now follows the **Malaysia Food Pyramid 2020**
arrangement — vegetables and fruit at the base, the rice/grains/staples group repositioned to
the tier above, protein and dairy above that, fat/oil/sugar/salt at the apex.

- **Independently verified in this pass:** `Errata.pdf` (self-disclaimed as a mirrored,
  non-official record, per the audit's standing rule) confirms only the *direction* of the
  change — "repositioning of the grain/staple group relative to vegetables and fruit" — with
  no printed replacement figure or serving table. **No official KPM-hosted textbook erratum
  was available in the audit pack.** The tier order implemented here therefore follows the
  explicit remediation instruction (current official KKM guidance), not a page image in the
  source pack.
- **Serving counts:** kept from the textbook's own Rajah 3.7 table (sayur 3, buah 2, bijirin
  4–8, protein ½–2/1/½–1, tenusu 1–3) and re-attached to the repositioned tiers, since no
  2020-specific serving table was in the source pack. This is flagged so a future pass can
  swap in an official 2020 serving table if one becomes available.
- **Added:** a base note repeating the textbook's 2-litre/day water guidance, and an apex
  note added per the errata's second instruction — limit ultra-processed foods (makanan
  rapu) alongside gula/garam/minyak.
- **Updated consistently:** BM interactive notes (§3.2.1), DLP interactive notes (§3.2.1),
  quiz `q14` (BM + DLP, rewritten — correct answer is now "Sayur-sayuran dan buah-buahan"),
  flashcards `f34` (BM + DLP, rewritten), and mind map node `c2-1` (BM + DLP — previously
  claimed the base was "nasi/bijirin," now reads "sayur/buah" — this node was missed in the
  audit's H-01 finding, which listed the notes/quiz/flashcards/mind-map surfaces affected but
  only quoted `c2-1`'s general trend wording, not its base-group claim; caught during this
  pass's own consistency check).
- **Not touched:** the shared hero image `ch3-nutrisi.png` (decorative, not diagrammatic —
  out of scope) and the legacy `notes-bm/dlp.ts` pyramid table (dead surface, ported-from
  only, see §8).

---

## 6. NotebookLM corrections respected

The Visking-tubing section was authored directly from Eksperimen 3.1 (textbook printed p. 67),
**not** from the supplied `SCIENCE_F2_CH03_NOTEBOOKLM_SOURCE_MAP.md`, per the explicit
instruction not to copy that procedure. Specifically corrected relative to the source map's
described method:

- Food tests (iodine, Benedict's) are carried out on the **distilled water outside** the
  Visking tubing, in the surrounding boiling tube — not on anything "inside tube P and Q."
  Both the §3.4.2 accordions and the `ViskingExperimentDiagram` component state this
  explicitly (`testLabel`, `resultCorrect`/`resultIncorrect` fields) so the outside-vs-inside
  distinction is visually unambiguous, not just a sentence to parse.
- The two tubes hold different contents (P = 1% starch suspension, Q = glucose solution),
  matching the textbook's P/Q labelling — not a single generic "kanji vs glukosa" pairing.
- The three variable types (dimalarkan/dimanipulasikan/bergerak balas) are stated exactly as
  printed, not paraphrased from the source map.

As found separately in the audit's own §7: the source map's "eight Standard Pembelajaran"
count and its listing of BMI as a "Mandatory Outcome" were both already known to be wrong and
were not relied on here either — BMI stays labelled enrichment (§3.2.2 card, explicitly
captioned "Pengayaan Buku Teks" / "Textbook Enrichment").

---

## 7. Section mapping — before → after

| Before (4 sections) | After (13 sections) |
|---|---|
| 3.1 Kelas Makanan | 3.1.1 Kelas Makanan · 3.1.2 Vitamin dan Mineral · 3.1.3 Ujian Makanan |
| 3.2 Kepentingan Gizi Seimbang | 3.2.1 Gizi Seimbang & Piramid Makanan · 3.2.2 Nilai Kalori & Perancangan Diet · 3.2.3 Gaya Hidup Sihat |
| 3.3 Sistem Pencernaan Manusia | 3.3.1 Sistem Pencernaan Manusia · 3.3.2 Pencernaan Fizikal & Kimia · 3.3.3 Enzim dan Pencernaan Kimia |
| 3.4 Penyerapan, Pengangkutan dan Penyahtinjaan | 3.4.1 Penyerapan Hasil Pencernaan · 3.4.2 Eksperimen Tiub Visking · 3.4.3 Asimilasi & Kerjasama Sistem · 3.4.4 Penyahtinjaan |

Same shell (`ScienceSectionedNotesShell`), same Back/Next chrome, same one-active-section-at-
a-time model as Form 1 and the rest of Form 2 — no new notes architecture was built. BM and
DLP have identical section counts, order and numbering (`3.1.1`…`3.4.4`).

---

## 8. Legacy content ported

Confirmed pulled from `notes-bm.ts`/`notes-dlp.ts` (previously authored, never reachable)
into the new interactive sections:

pankreas · hati · pundi hempedu · duodenum (tract position + role) · maltase (as textbook
detail) · asimilasi · obesiti / diabetes / NHMS 2016 figures · kalori worked example numbers ·
serving counts (sajian) · BMI formula · the six-factor "pekerjaan" wording (was "aktiviti" in
the live notes) · asid hidroklorik · pencernaan fizikal vs kimia comparison.

Left in the legacy file, not ported (judged out of DSKP-binding scope or redundant with
already-covered material): the "Pinggan Sihat" callout (DSKP treats piramid/pinggan as
alternatives — "atau" — so the pyramid alone satisfies SP 3.2.1), and the Aktiviti 3.7
salivary-amylase-in-water-bath investigation (a *Cadangan aktiviti PdP*, non-binding per the
DSKP Catatan rule; the binding SP 3.4.1 experiment is the Visking tubing one, which is
covered).

---

## 9. Assessment changes

Targeted only — the 30-item banks were **not** regenerated.

| Item | Change |
|---|---|
| `q14` (BM + DLP) | Rewritten: correct answer is now "Sayur-sayuran dan buah-buahan" (2020 pyramid base), replacing the pre-errata "Nasi, mi, roti, bijirin dan ubi-ubian." |
| `q17` explanation (BM) | `Rektum → Anus` → `Rektum → Dubur` (L-02 term fix). |
| `q18` (BM) | Option/answer/explanation `Kimus` → `Kim` (L-01 term fix, matches textbook p. 62–63). |
| `q24` explanation (BM) | `asid kimus` → `asid dalam kim`. |
| `q3` (BM + DLP) | **Kept, not replaced** — see §1/§6 (Kwashiorkor retraction). |
| `q19` (BM + DLP) | **Kept** — maltase is now genuinely taught in §3.3.3 as textbook detail, so this no longer assesses untaught material. |
| `q22`, `q26`, `q27`, `q29`, `q30` | Reviewed against the corrected teaching; all already match (pancreas failure, NHMS stats, three-stage protease chain, penyerapan-vs-penyerapan-semula, three-system cooperation) — no change needed. |
| `f34` (BM + DLP) | Rewritten to the 2020 base group. |
| `f230`, `f302` (BM) | `kimus` → `kim`. |
| `f47` (BM + DLP) | **Kept** — Kwashiorkor, see §1. |

Answer keys (`answerIndex` values) were **not** touched by any of the above — only question
text, option text and explanation text were corrected, so no key needed re-derivation. BM/DLP
answer semantics were checked side by side after every edit and remain 1:1.

---

## 10. Visual changes

Four new reusable, data-driven components were added (SVG/HTML — no AI-generated artwork, no
text baked into images; every label comes from the BM/DLP content file, following the same
pattern as the existing `FoodWebDiagram`):

- **`PyramidDiagram`** — stacked, proportionally-widening tiers (base widest, apex narrowest)
  so the whole pyramid's proportions are visible at once, not a `Journey` stepper. Tap a tier
  to expand its serving guidance.
- **`DigestiveSystemDiagram`** — the alimentary canal as one vertical chain, with hati/pundi
  hempedu/pankreas branching off the duodenum node. Tap any organ for its one-line function.
- **`ViskingExperimentDiagram`** — two boiling tubes, each with a Visking-tubing bag, both in
  distilled water, with the outside-the-tube test location marked explicitly (§6).
- **`VillusDiagram`** — a compact villus cross-section with the two separate absorption
  routes (capillary→blood→liver; lacteal→lymph) drawn as distinct arrows.

All four are wired into `ScienceF2InteractiveNotesBlock.tsx` via four new optional fields on
`ScienceInteractiveSection` (`pyramid`, `digestiveSystem`, `viskingExperiment`,
`villusDiagram`) in `interactive-types.ts` — additive only, no existing block type was
changed.

---

## 11. BM/DLP parity

Structural parity (section count, section numbers, and which block types each section
carries) is asserted by an automated test (§13) rather than only reviewed by eye. Both
streams: 13 sections, same numbering `3.1.1`…`3.4.4`, same block-type shape per section, same
corrected facts (protein chain, enzyme sources, pyramid tiers, Visking outside-tube testing,
three-system cooperation). DLP uses standard English terminology throughout (e.g. "chyme,"
not a BM-specific term) — the L-01 "kim" fix is BM-only by nature, since English never used
"chymus."

---

## 12. Runtime QA

The notes route requires an authenticated session in this environment, matching the
constraint the original audit recorded. Per the remediation brief, the same real
served-module verification method was used instead: `ScienceF2InteractiveNotesBlock` was
rendered directly from its live source module (the same component the production route
mounts, not a stub) with the actual `scienceF2C3InteractiveBM` / `...DLP` content objects via
`renderToStaticMarkup`, once per section (26 renders total across both languages), asserting:

- no render throws for any of the 13 sections × 2 languages, across every block type used
  (cards, accordions, tabs, matcher, sequence, comparison, causeEffect, pyramid,
  digestiveSystem, viskingExperiment, villusDiagram, checks, miniQuiz, reflection),
- the corrected facts are actually present in the rendered/data output (§13 test names list
  which finding each assertion covers),
- BM/DLP structural parity holds.

**Not covered by this pass** (honesty note, not a defect): a live-browser click-through of
Back/Next, direct section-pill navigation, the pyramid tier tap-to-expand, and the digestive
diagram tap-to-inspect. These use the same `useState` toggle pattern as `Journey`,
`MatchingPairs` and `FoodWebDiagram` — all pre-existing, already-shipped components reused
unchanged elsewhere in Bab 1/2 — so the interaction mechanism itself is not new, but no
video/screenshot session confirms Chapter 3 specifically in an actual browser tab. Recommend
a follow-up visual QA pass before this chapter is declared release-ready.

---

## 13. Automated tests

- **Typecheck:** `tsc --noEmit -p tsconfig.json` — clean, no errors.
- **Build:** `vite build` — succeeds.
- **Lint:** `eslint` on every touched/added file — clean (pre-existing CRLF line-ending
  `prettier/prettier` errors exist repo-wide, confirmed present even in untouched files like
  `src/content/registry.ts`; not introduced by this change, not fixed here — see §14).
- **Quiz integrity:** `npm run audit:quizzes` — `science:form-2:chapter-3:bm/dlp` both report
  `count=30`, no critical or new issues; the 18 pre-existing CRITICAL issues in the run are
  all `math:form-1:chapter-3/4/5` metadata mismatches, unrelated to this chapter.
- **New regression test:** `src/content/form2/science/chapter-3/chapter-3-remediation.test.tsx`
  — 12 tests, all passing, covering: both languages render all 13 sections without throwing;
  C-01 (protein chain) and C-02 (accessory organs) at the data and DOM level; M-02 (enzyme
  secretion precision); the Visking outside-tube fix; C-05 (assimilation/three-system); C-03
  (named diseases + obesity link); H-01 (pyramid base tiers); the `kimus`→`kim` term fix; and
  BM/DLP structural parity.
- **Existing suites re-run:** `ScienceSectionedNotesShell.test.tsx`,
  `ScienceDiscoveryChrome.test.tsx`, `NotesContentWithVideo.test.tsx`,
  `NotesSummaryHeroGate.test.tsx`, `SejarahChapterHero.test.tsx`,
  `Chapter2LearningVisuals.test.tsx` — 44/44 passing, none rewritten.

---

## 14. Remaining non-blocking issues

- **Food Pyramid 2020 serving counts** are carried over from the textbook's pre-2020 table
  (no official 2020 serving table was in the audit pack) — direction of the tier reorder is
  per instruction, exact serving numbers should be swapped in if an official 2020 table
  surfaces later.
- **`F2_SCIENCE_INTERACTIVE_META`** (added to `notes.tsx` for the generalised
  `isScienceDiscovery` flag) has audited values for Chapters 2 and 3 only; Chapters 4–13 now
  also receive the Science Discovery header/Mini Investigation chrome (a strict improvement —
  they previously got none) but use a conservative shared default (`10 modules / 20 min / 1
  experiment / Core`) rather than per-chapter audited stats. Cosmetic only (affects header
  numbers, not content correctness); worth a follow-up once those chapters are audited.
- **Full browser click-through QA** for Chapter 3 specifically was not performed — see §12.
- **`notes-bm.ts` / `notes-dlp.ts`** (legacy, unrendered) still contain the old, uncorrected
  pyramid table and pre-2020 wording. Left as-is per instruction (do not delete yet); flagged
  so a future cleanup pass doesn't treat that file as authoritative if it's ever revisited.
- **Repo-wide CRLF `prettier/prettier` lint noise** — pre-existing, confirmed present in files
  never touched by this remediation (e.g. `src/content/registry.ts`); not fixed here to avoid
  an unrelated repo-wide reformat.

---

CONFIRMED CRITICAL REMAINING: NONE
CONFIRMED HIGH REMAINING: NONE

FORM 1 BEHAVIOUR CHANGED: NO
FORM 2 CHAPTER 1 BEHAVIOUR CHANGED: NO
FORM 2 CHAPTER 2 BEHAVIOUR CHANGED: NO

BM/DLP PARITY VERIFIED: YES (13/13 sections, automated test)
BUILD: PASS
TYPECHECK: PASS

This remediation pass closes every CRITICAL and HIGH finding from the deep audit and the
majority of MEDIUM findings, restores the DSKP-binding scope the live notes were missing, and
resolves the one HUMAN REVIEW REQUIRED item (H-01) per explicit instruction. It does **not**
constitute a release-gate sign-off — a separate post-remediation audit is still required
before this chapter is declared frozen, per the standing instruction not to self-certify.

---

## Post-Video Content Correction Pass

Targeted corrections only — no redesign, no notes regeneration, no new images. Scope: the nine
issues below, in both BM and DLP, on the same live surfaces touched by the original pass
(`interactive-{bm,dlp}.ts`, `quizzes-{bm,dlp}.ts`, `flashcards-{bm,dlp}.ts`,
`mindmap-{bm,dlp}.ts`, plus `ScienceF2InteractiveNotesBlock.tsx` for one structural fix). The
legacy `notes-bm.ts`/`notes-dlp.ts` pair remains untouched, unregistered, and out of scope, as
before.

### 1. SP numbering corrected

The 13 UX sections no longer invent SP sub-numbers. They now map onto the real Bab 3 SP
structure (`3.1.1`, `3.1.2`, `3.2.1`, `3.2.2`, `3.2.3`, `3.3.1`, `3.4.1`, `3.4.2`, `3.4.3`),
exactly per the mapping supplied, applied identically to BM and DLP:

| # | UX section | SP (before → after) |
|---|---|---|
| 1 | Kelas Makanan | 3.1.1 (unchanged) |
| 2 | Vitamin dan Mineral | 3.1.2 → **3.1.1** |
| 3 | Ujian Makanan | 3.1.3 → **3.1.2** |
| 4 | Gizi Seimbang | 3.2.1 (unchanged) |
| 5 | Nilai Kalori & Perancangan Diet | 3.2.2 (unchanged) |
| 6 | Gaya Hidup Sihat | 3.2.3 (unchanged) |
| 7 | Sistem Pencernaan | 3.3.1 (unchanged) |
| 8 | Pencernaan Fizikal & Kimia | 3.3.2 → **3.3.1** |
| 9 | Enzim & Pencernaan Kimia | 3.3.3 → **3.3.1** |
| 10 | Penyerapan Hasil Pencernaan | 3.4.1 (unchanged) |
| 11 | Eksperimen Tiub Visking | 3.4.2 → **3.4.1** |
| 12 | Asimilasi & Kerjasama Sistem | 3.4.3 → **3.4.2** |
| 13 | Penyahtinjaan | 3.4.4 → **3.4.3** |

**Structural side-fix required:** `ScienceF2InteractiveNotesBlock.tsx` previously used
`section.number` as the React/navigation key for each UX section. Since several sections now
legitimately share one SP number, that key would have collided. Changed to an index-based key
(`sec-${index}`) while `section.number` continues to drive the visible SP badge — this is a
shared component used by every Form 2 chapter, and the change is a no-op for every other
chapter (their section numbers were already unique, so index-based and number-based keys are
behaviourally identical there).

### 2 & 3. Malaysia Food Pyramid 2020 corrected — old serving values removed

The pyramid was rebuilt to the official KKM 4-tier / 5-group structure, replacing the previous
5-tier version (which had mixed 2020 tier *positions* with the pre-2020 textbook's serving
*numbers* — exactly the inconsistency flagged):

| Tier | Groups | Servings |
|---|---|---|
| Base | Sayur-sayuran / Buah-buahan | ≥3 sajian sehari / 2 sajian sehari |
| 2 | Nasi, bijirin lain, produk bijirin penuh dan ubi-ubian | 3–5 sajian sehari |
| 3 (protein + dairy, one tier) | Ikan · Ayam/telur/daging · Kekacang (legum) · Susu dan produk tenusu | 1 / 1–2 / 1 / 2 sajian sehari |
| Apex | Lemak, minyak, gula dan garam | Hadkan pengambilan |

Plus: **Air kosong 6–8 gelas sehari (1 gelas = 250 ml)** as the pyramid's base note (was
"2 litres/day" phrased generically before). Dairy was deliberately kept inside the same tier as
the protein groups (`id: "protein-dairy"`), not rendered as a separate fifth tier, per instruction.

### 3 (continued). Textbook Rajah 3.7 vs 2020 guidance — no longer conflated

The pyramid's `sourceLabel` previously read *"Susunan mengikut Piramid Makanan Malaysia 2020…
Sajian berpandukan Jadual Kementerian Kesihatan Malaysia (**Rajah 3.7**)"* — attributing the
new 2020 serving numbers to the textbook's old figure. Rewritten to a single short line with no
Rajah reference: **"Panduan semasa: Piramid Makanan Malaysia 2020 (KKM)."** /
**"Current guidance: Malaysia Food Pyramid 2020 (KKM)."** No textbook-edition explanation was
added, per instruction to keep this simple for learners.

**Consistency check across surfaces:** quiz `q14` (BM+DLP), flashcards `f34`/`f35` (BM+DLP), and
mind-map node `c2-1` (BM+DLP, already corrected in the prior pass to "tapak = sayur/buah") were
all checked; `f34`/`f35` and the `q14` explanation still carried the old "4-8 sajian"/"3 sajian"
(without "sekurang-kurangnya") wording and were updated to match.

### 4. Four-level pyramid verified

Codified as an automated assertion (`pyramid.tiers` has length 4) rather than only reviewed by
eye — see §13 of this addendum.

### 5. Gall bladder classification corrected

The digestive-system diagram's instruction text and `accessoryLabel` field called the whole
accessory group "kelenjar bantuan" (BM) / "accessory glands" (DLP) — wrong, since the gall
bladder stores bile rather than secreting it. Fixed in both languages:

- BM: `accessoryLabel` → **"Organ Aksesori Pencernaan"**; instruction text
  "kelenjar bantuan" → "**organ aksesori pencernaan**".
- DLP: `accessoryLabel` → **"Accessory Digestive Organs"**; instruction text
  "accessory glands" → "**accessory digestive organs**".
- `DigestiveSystemDiagram.tsx`'s doc comment corrected to match (code comment only, not
  learner-facing, fixed for consistency).

Organ functions were re-checked and are unchanged/correct: Hati/Liver → produces bile; Pundi
hempedu/Gall bladder → stores and concentrates bile; Pankreas/Pancreas → produces pancreatic
juice containing digestive enzymes.

### 6. Calorific-value wording corrected

§3.2.2's opening definition previously read *"…apabila 1 g makanan **dibakar** dengan lengkap
di dalam badan"* / *"…when 1 g of food is completely **burnt** in the body"* — implying literal
combustion. Rewritten to the scientifically precise wording exactly as specified:

- BM: "Nilai kalori ialah jumlah tenaga yang dibebaskan apabila 1 g makanan **dioksidakan**
  dengan lengkap, diukur dalam kalori (kal) atau joule (J)."
- DLP: "Calorific value is the amount of energy released when 1 g of food is completely
  **oxidised**, measured in calories (cal) or joules (J)."

(The colloquial "tenaga tidak dibakar" / "energy not burned off" line inside the §3.2.3
healthy-lifestyle cause→effect chain — about exercise and energy expenditure, not the
definition of calorific value — was left as ordinary idiomatic phrasing; it makes no claim
about the combustion mechanism.)

### 7. Kwashiorkor removed from core / scored content

- **Quiz `q3` (BM + DLP), replaced.** New question: *"Penyakit kekurangan Vitamin B
  dipanggil…"* / *"The disease caused by Vitamin B deficiency is called…"*, correct answer
  **Beri-beri** — a deficiency disease already in the DSKP-bound Jadual 3.1 vitamin table and
  not previously asked by name anywhere in the 30-item bank.
- **Flashcard, replaced (this is `f5`, not `f47` — the audit's line-number references from the
  first pass were line numbers in the source file, not card ids; the actual Kwashiorkor card
  was `sci-f2-c3-{bm,dlp}-f5`).** Rewritten to test the underlying science without naming the
  disease: *"Apakah kesan kekurangan teruk protein pada kanak-kanak yang membesar?"* → "Growth
  stunting and poorly developed muscles."
- **Mind map `c1-2-3` (BM + DLP), relabelled, not removed.** Now reads "Kekurangan teruk:
  pertumbuhan terbantut (**Pengetahuan Tambahan**: Kwasyiorkor)" / "…(**Additional Knowledge**:
  Kwashiorkor)" — kept because it is genuinely textbook-sourced (see the first pass's §1: the
  textbook does carry it, spelled "Kwasyiorkor," on printed p. 47), but now explicitly
  out-of-core, matching the instruction's fallback clause exactly.
- **Interactive notes Protein card `detail` line (BM + DLP), relabelled, not removed.** Now
  opens with "Pengetahuan Tambahan:" / "Additional Knowledge:" and states plainly that it is
  "bukan skop teras DSKP Bab 3" / "not core DSKP Chapter 3 scope."
- **Judgement call, left as-is:** `q9`'s wrong-answer options (BM+DLP, the iodine/goitre
  question) still list "Kwashiorkor" as one of four distractors. This is not the disease being
  taught or scored as correct anywhere — it is a standard wrong-choice testing whether a
  student can tell it apart from goitre — so it was not treated as "core scored content" and
  left in place.

This resolves a direct tension with the first pass, which (after independently re-verifying the
textbook PDF) had deliberately *kept* Kwashiorkor unlabelled, on the same reasoning already
applied to BMI. That finding still stands as factually correct — the disease is genuinely in
the book — but this pass brings it into compliance with the new instruction by fully removing
it from every scored/assessment surface and explicitly labelling every remaining mention as
non-core, rather than re-litigating whether it belongs in the textbook.

### 8. Previous digestion fixes verified, not touched

No edits were made in this pass to the protein-digestion chain, the duodenum, the pancreas, the
liver, the gall bladder's function text, the Visking experiment, assimilation, or the
digestive/circulatory/respiratory cooperation content. Re-verified present and correct via the
existing and newly-added automated assertions (§13): protease PERUT→polipeptida,
PANKREAS(duodenum)→dipeptida, USUS KECIL→asid amino; Duodenum/Pankreas/Hati/Pundi hempedu all
present in the digestive diagram; the Visking "DI LUAR"/"OUTSIDE" fix intact; assimilation and
three-system cooperation intact.

### 9. BM/DLP parity

Every correction above was applied to both language files in the same edit pass and checked
side by side. The automated test now also asserts the SP-number sequence is byte-identical
between `scienceF2C3InteractiveBM` and `scienceF2C3InteractiveDLP` (not just "both have 13
sections"), closing a gap the first pass's parity check didn't specifically cover.

### 10. No new images

Confirmed — this pass only edited text/data fields (`number`, `pyramid`, `accessoryLabel`,
`instruction`, quiz/flashcard/mind-map strings) and one React-key line. No new diagram, icon,
or image asset was added or modified.

### 13. Automated tests (this pass)

`chapter-3-remediation.test.tsx` was extended from 12 to **18 tests**, all passing. New
assertions added this pass: the SP-number sequence matches the real mapping exactly (and
explicitly rejects `"3.1.3"`, `"3.3.2"`, `"3.3.3"`, `"3.4.4"` ever reappearing); the pyramid has
exactly 4 tiers; base/grains/protein-dairy/apex servings match the specified values verbatim;
dairy is confirmed to share the protein tier rather than forming a fifth tier; the pyramid
`sourceLabel` never contains "Rajah 3.7"; the digestive-system `accessoryLabel`/instruction
never match `/kelenjar/i` or `/accessory glands?/i`; the calorific-value intro contains
"dioksidakan"/"oxidised" and not the old burning phrasing; and any surviving
Kwashiorkor/Kwasyiorkor mention must co-occur with "Pengetahuan Tambahan"/"Additional
Knowledge". The manual grep sweep specified in the QA section (all 11 regression markers) was
also run directly against the live surfaces and returned zero matches in incorrect/core
contexts — see the report line below.

---

### Report

- SP numbering corrected: **YES**
- Food Pyramid 2020 corrected: **YES**
- Old serving values removed: **YES**
- Four-level pyramid verified: **YES**
- Gall bladder classification corrected: **YES**
- Calorific-value wording corrected: **YES**
- Kwashiorkor removed from core assessment: **YES** (quiz + flashcard replaced; mind map /
  notes retained but explicitly relabelled "Pengetahuan Tambahan"/"Additional Knowledge" per
  the instruction's fallback clause, not silently dropped — see §7 above for why)
- BM/DLP parity verified: **YES**
- Previous digestion fixes preserved: **YES** (not touched this pass; re-verified by test)
- Build: **PASS**
- Typecheck: **PASS**

Chapter 3 is **not** declared frozen. This remains a content-correction pass on top of an
architecture that has not yet had its dedicated visual-implementation or full-browser QA pass
(see §12/§14 above, both still open).
