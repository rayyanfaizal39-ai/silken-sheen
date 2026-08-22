# Sains Tingkatan 2 Bab 2 — Confirmed Remediation Plan (Stage A)

**Date:** 2026-08-22
**Inputs:** `SCIENCE_F2_CH02_DEEP_AUDIT_REPORT.md` (Claude) · `SCIENCE_F2_CH02_CODEX_INDEPENDENT_AUDIT.md` (Codex)
**Authorities:** `audit-sources/Science/Form-2/{DSKP,Textbook,Errata}.pdf` (hashes unchanged)
**Status:** Stage A only. No learner-facing file modified at the time of writing.

---

## 0. Authority rule applied throughout

DSKP printed p. 39 states the **Catatan** column carries both **Skop SK & SP** (binding) and **Cadangan aktiviti PdP**, and that "*Senarai aktiviti yang dicadangkan bukanlah sesuatu yang mutlak*". Scope statements and `Nota:` blocks are binding; "Menjalankan aktiviti…" and "Contoh:" entries are not.

### Facts re-verified from source for this plan

| Fact | Source | Verbatim / result |
|---|---|---|
| Three cycle disturbances | DSKP printed p. 44, SP 2.2.3 | "Penebangan hutan yang tidak terkawal, Pembakaran bahan api fosil, **Penggunaan sumber air yang berlebihan untuk pertanian dan domestik**" |
| Carnivore terms are binding | DSKP printed p. 44, SP 2.1.1 **Nota** | "Perkenalkan istilah seperti **karnivor primer dan karnivor sekunder**" |
| Adaptation verb | DSKP printed p. 45, SP 2.3.2 | "**Mewajarkan** kepentingan penyesuaian hidupan terhadap alam sekitar" — gurun, tundra, tropika |
| Ecosystem changes | DSKP printed p. 46, SP 2.3.5 | "**Bekalan air**, **Migrasi**, **Perubahan populasi**" |
| Textbook food chain | Textbook Rajah 2.2, p. 24 | Kubis → Siput → Burung → **Musang** (not Fox) |
| Food web scope | Textbook Rajah 2.3, p. 24 | Organisms Kubis, Belalang, Beluncas, Siput, Burung, Ular (+ Katak in Rajah 2.4); asks learners to write "**empat rantai makanan**" |
| Energy loss wording | Textbook p. 24 | "hilang kerana digunakan… untuk **bergerak** dan menjalankan proses hidup… seperti **respirasi**. Selain itu… **tenaga haba** atau tenaga kimia dalam **makanan yang tidak tercerna, iaitu tinja**" — **no claim that faeces occurs at every trophic level** |
| Tundra image | Direct inspection of `tundra.jpg` | Seal on floating sea ice, icebergs, open ocean, aurora. **md5 identical to Chapter 1's `polar.jpg`** — a reused polar-marine asset |
| Energy pyramid | Textbook Bab 2 + DSKP Bab 2 | Term **absent from both**; "piramid" occurs in the DSKP only on printed p. 49 (Bab 3 Nutrisi) |
| Errata | Errata.pdf | **No Bab 2 correction.** Self-disclaimed mirror, undated, not KPM-hosted — not used as authority |

---

## 1. Reconciliation

| Finding | Claude | Codex | **Final status** | Reason |
|---|---|---|---|---|
| Excessive water use replaced by fertiliser | H-04 | C2-H01 | **CONFIRMED** | DSKP SP 2.2.3 names three disturbances as Skop; the live accordions teach deforestation, fossil fuels and *Baja berlebihan*. A regex sweep for genuine excessive-**consumption** wording returns 0 hits in both languages (the one BM match is water *pollution* in §2.4). Mind map has it right, so the correct item was known. |
| SP 2.3.5 ecosystem changes absent | H-01 | C2-H03 | **CONFIRMED** | `bekalan air` → 0, `kemarau` → 0; the single `penghijrahan` hit is the tundra flip-card teaching *adaptation*, not migration-as-change. Assessed by q18, q21, q23, q26 + flashcards f36/f44/f45/f50. Classic assessed-but-not-taught. |
| Food web insufficient | H-02 | C2-M05 | **CONFIRMED — HIGH** | 3 live occurrences: one keyword chip + one check Q&A. No worked web, no visual. Quiz references it 10×; textbook Latihan Sumatif 2 Q1(a) requires extracting chains from a web. Codex rated MEDIUM; the mandatory-SP half being untaught justifies HIGH. |
| Carnivore terminology absent | H-03 | C2-M04 | **CONFIRMED — HIGH** | `karnivor|carnivor` → **0** in live data, both languages, runtime-confirmed. Binding DSKP Nota; textbook Rumusan p. 41 uses the terms as the consumer-level labels. Codex rated MEDIUM; binding Skop justifies HIGH. |
| Adaptation materially untaught | — (M-09 PARTIAL) | **C2-H02** | **CONFIRMED — HIGH** | **Codex is right and my audit under-rated this.** SP 2.3.2's verb is *mewajarkan* (justify). Four flip cards give one generic climate sentence each, no plant adaptation, no feature→function→survival chain. I recorded it as PARTIAL (M-09); on re-reading the SP verb, Codex's HIGH is the correct call. |
| Tundra visual is polar-marine | — | **C2-H04** | **CONFIRMED — HIGH** | **Codex-only; verified by direct image inspection.** Seal on sea ice with icebergs and aurora; md5-identical to Ch1's `polar.jpg`. Tundra is a treeless *land* biome. Misleading visual on a mandatory adaptation context. |
| Dead legacy notes duplicate source | L-08 | C2-M01 | **CONFIRMED** | Same architecture accepted for Ch1, but the porting step was never performed here. Every missing item exists in `notes-*.ts`. |
| Section granularity too coarse | — | C2-M02 | **CONFIRMED** | 4 SK-sized sections; §2.3 alone carries hierarchy, adaptation, 5 interaction types, biological control, population factors, 4 flip cards and a matcher. |
| Mini Investigation / discovery gate excludes F2 C2 | M-07 | C2-M03 | **CONFIRMED** | `notes.tsx:373-376`. |
| Habitat undefined; water-cycle roles; biocontrol limits; 2.4.1 justification | M-01, M-03, M-05 | C2-M06, C2-M07 | **CONFIRMED** | Both audits agree. |
| Drought not under population factors | M-06 | (in C2-M07 list) | **CONFIRMED** | Live card says "cuaca"; DSKP Skop says *Kemarau*; assessed by q23/f35/f50. |
| Cycle-disturbance solutions only generic | M-04 | C2-M06 | **CONFIRMED** | SP 2.2.3's verb is *menyelesaikan masalah*. |
| Fox vs Musang in food chain | M-08 | — | **CONFIRMED** | Textbook Rajah 2.2 p. 24 ends with **Musang**. Claude-only; verified this pass. |
| Energy pyramid out of scope + misgrouped | M-02 | C2-M08 | **CONFIRMED** | Absent from textbook Bab 2 and DSKP Bab 2; mind-map node sits under *2.2 Kitar Nutrien*. |
| **q12 / f47 say faeces at EVERY trophic level** | — | **C2-M09** | **CONFIRMED** | **Codex-only; I missed it.** Verified: BM keyed option and explanation both read "najis pada **setiap peringkat trofik**"; DLP identical. Producers do not produce faeces. Textbook p. 24 separates movement/respiration/heat from undigested food. Keyed answer is still the only defensible option of four, so **not** a wrong-answer-key CRITICAL — but the wording overgeneralises. |
| Assessment imbalance | (SP table) | C2-M10 | **CONFIRMED** | 2.3.3 = 9/30 (30%); **2.3.2 = 0**; 2.2.2 and 2.2.3 = 1 each. |
| BM chrome leaks English (Journey/Matcher/Video) | L-01 | C2-L01, C2-L02 | **CONFIRMED** | `Journey.tsx:15,41,44`; `MatchingPairs.tsx:9` default `"Reset"` never overridden; `VideoBlock.tsx:77-81`. |
| `shuffledMatches` is a sort, not a shuffle | L-02 | — | **CONFIRMED — non-blocking** | Deterministic order; task still non-trivial. Claude-only. |
| DLP "a few communities" | — | C2-L03 | **PARTIALLY_CONFIRMED** | Live occurrence is `quizzes-dlp.ts:20` (+ flashcards); the other hits are in the dead notes. Wording is awkward, not wrong. |
| `burung kuntul kerbau` vs `bangau kendi` | L-03 | C2-L04 | **CONFIRMED — LOW** | Scientific name correct; common name diverges from the textbook. |
| Any wrong answer key in the 30+30 bank | none found | none found | **REJECTED (no defect)** | Both audits independently found zero. Re-verified: all keys defensible. |
| Any CRITICAL finding | 0 | 0 | **REJECTED (no defect)** | Both audits agree there is no CRITICAL. |

**Severity reconciliation note.** Two of my MEDIUMs are promoted to HIGH on Codex's reasoning (adaptation C2-H02; and I adopt C2-H04 which I missed entirely), and two of Codex's MEDIUMs are promoted to HIGH on mine (food web, carnivore terminology). Net agreed HIGH set: **6**.

---

## 2. Architecture decision

**Keep the interactive sectioned notes as the sole learner-facing architecture.** The legacy `notes-bm.ts` / `notes-dlp.ts` are **not** rendered underneath — that would duplicate and bloat the surface. They are used **only as source material** to port missing curriculum into the live system, and are **retained on disk, not deleted**, pending final QA.

This mirrors the decision already accepted for Chapter 1; the difference is that for Chapter 2 the porting step was never carried out, which is the root cause of every HIGH finding above.

---

## 3. Section restructure

Current: **4** SK-sized sections. Target: **11** sections, one per DSKP Standard Pembelajaran.

Using the SP code as the section `number` gives unique React keys (the current scheme would collide if two sections were both numbered "2.1"), makes the eyebrow exam-aligned, and matches the requested split exactly:

| # | Section `number` | Title (BM) | SP |
|---|---|---|---|
| 1 | `2.1.1` | Pengeluar, Pengguna dan Pengurai | 2.1.1 |
| 2 | `2.1.2` | Rantai Makanan dan Siratan Makanan | 2.1.2 |
| 3 | `2.2.1` | Kitar Karbon dan Kitar Oksigen | 2.2.1 |
| 4 | `2.2.2` | Kitar Air | 2.2.2 |
| 5 | `2.2.3` | Gangguan Kitar Nutrien | 2.2.3 |
| 6 | `2.3.1` | Saling Bersandaran dan Istilah Ekologi | 2.3.1 |
| 7 | `2.3.2` | Penyesuaian Hidupan | 2.3.2 |
| 8 | `2.3.3` | Interaksi antara Organisma | 2.3.3 |
| 9 | `2.3.4` | Faktor yang Mempengaruhi Saiz Populasi | 2.3.4 |
| 10 | `2.3.5` | Perubahan dalam Ekosistem | 2.3.5 |
| 11 | `2.4.1` | Peranan Manusia dalam Mengekalkan Keseimbangan Alam | 2.4.1 |

BM and DLP order identical. 11 sections is already proven on this navigation pattern (Form 1 Bab 1 uses 11). No academic content is rewritten merely to create sections — existing blocks are redistributed and the new required content is added.

---

## 4. Confirmed work list

### P0
| Ref | Fix |
|---|---|
| **A** | SP 2.3.5 block — bekalan air / migrasi / perubahan populasi as cause→effect chains |
| **B** | SP 2.2.3 — add *penggunaan sumber air berlebihan (pertanian & domestik)* with a solution; demote fertiliser/eutrophication to clearly-labelled enrichment |
| **C** | Food web — new compact interactive visual, not a paragraph |
| **D** | Carnivore terminology on the consumer teaching |
| **E** | Adaptation — challenge → adaptation → function → survival benefit for tropika/gurun/tundra, animal **and** plant |
| **F** | Replace the tundra image with a tundra land-biome visual |

**Food-web design (C).** Built from the textbook's own organism set (Rajah 2.3/2.4: Kubis, Beluncas, Siput, Belalang, Burung, Katak, Ular) with an edge set that yields **exactly four chains**, matching the textbook's own question "*Bolehkah anda tulis **empat rantai makanan**…*":

```
Kubis → Beluncas → Burung → Ular
Kubis → Siput    → Burung → Ular
Kubis → Belalang → Burung → Ular
Kubis → Belalang → Katak  → Ular
```

The exact arrow geometry of Rajah 2.3 cannot be recovered from PDF text extraction, so the edges are **authored to be scientifically correct using the textbook's organisms and chain count** rather than presented as a pixel-copy of the figure. This is stated so the choice is auditable.

### P1
Habitat definition · water-cycle organism roles (transpiration, animal respiration/excretion, roots slowing runoff, leaf litter reducing evaporation) · drought explicitly under population factors · biological-control long-term limitations · 2.4.1 stable/productive justification · disturbance solutions paired to each problem.

### Assessment (targeted — banks stay at 30+30)
Four substitutions, no regeneration: two over-weighted SP 2.3.3 items and one duplicate → SP 2.3.2 ×2 and SP 2.2.3 ×1; the out-of-scope energy-pyramid item **q29 → a food-web interpretation item (SP 2.1.2)**. Plus precision edits to q12 / f47 (C2-M09).

### Energy pyramid — **Option A**
Retain as **clearly labelled optional enrichment**, **moved under energy flow** in the mind map (currently misfiled under 2.2 Kitar Nutrien), and **removed from the scored quiz bank** (q29 repurposed). Flashcard f40 kept with an explicit enrichment tag.

### Mini Investigation
Add F2 C2 to the **existing reusable** `isScienceDiscovery` gate — no separate feature. The investigation surfaced is generic; the DSKP's Eksperimen 2.1 remains a *Cadangan aktiviti* and will **not** be presented as mandatory.

### Localisation
Optional `lang` props with **English defaults** so no existing caller changes behaviour: `Journey` (Start/Complete/progress), `MatchingPairs` (`resetLabel` passed), `VideoBlock` + `NotesContentWithVideo` (Educational Videos / Watch and Learn). Shared support, not Chapter-2 patches.

### Not doing
No fungi-style scope additions; no quiz/flashcard regeneration; no chapter redesign beyond the agreed section split; no changes to other chapters' content files; no deletion of legacy notes; no notes-architecture refactor.

---

## 5. Human review items

1. **Energy pyramid** — Option A adopted (enrichment, regrouped, unscored). Reversible to Option B if a curriculum owner prefers removal.
2. **DLP textbook absent** — DLP validated by translation equivalence only; no English-stream authority exists in the pack.
3. **Errata provenance** — undated, non-KPM-hosted mirror; no Bab 2 correction, so nothing here depends on it.
4. **Food-web edge set** — authored from the textbook organism set and chain count, not a verified copy of Rajah 2.3's arrows (see §4).
