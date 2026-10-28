# Bab 1: Skala dan Jarak — Audit Report

**Date:** 2026-10-25
**Repo + branch:** silken-sheen-main, `feature/cosmic-companion-dashboard-design` (unrelated WIP on this branch — cosmic companion dashboard; this audit touches none of it)
**Textbook edition + SHA256:** Geografi Tingkatan 2, IMS Books Trading Sdn. Bhd. / KPM 2017, ISBN 978-967-0463-47-6, No. Siri Buku 0061 — `audit-sources/Geography/Form-2/Textbook.pdf`, SHA256 `6962bde2d70ed27f99aa369896f4e2111bd6e0ad4a6c717e2c8210d5c6447c63`
**DSKP version + SHA256:** KSSM Geografi Tingkatan 2, Bahagian Pembangunan Kurikulum KPM — `audit-sources/Geography/Form-2/DSKP.pdf`, SHA256 `03db2a6b1f6f4104766d36cc635193532f282e9898937188e3043f736996698c`
**Existing note paths:** `src/content/form2/geography/chapter-1/notes.ts`, `mindmap.ts`, `interactive.ts`
**Source-read status:** Both PDFs opened, text-extracted (PyMuPDF) and rendered to page images for visual inspection (text alone is insufficient for the diagrams/maps). Textbook: 176 PDF pages. DSKP: 62 PDF pages. Bab 1 spans printed pages 2–15 = PDF pages 10–23 (offset +8). DSKP SK 1.1 is on printed pages 22–23 = PDF pages 34–35 (offset +12).

## 1. Scope and blockers

No blockers. Both source PDFs are readable, including diagrams, maps, legends and tables (verified by rendering all 14 Bab 1 pages to images and visually inspecting each one). Audited **only** Bab 1 (Skala dan Jarak), which maps 1:1 onto DSKP Standard Kandungan 1.1 under "1.0 Kemahiran Geografi". No application files, tests, database or deployments were touched — this is a read-only comparison.

## 2. Textbook inventory

| Subtopic | Core definition/fact | Printed page | PDF page | Existing AcadeMY section | Status |
|---|---|---|---|---|---|
| 1.1 Skala — maksud | Skala = nisbah jarak di peta : jarak sebenar di permukaan bumi | 4 | 12 | "Maksud Skala" | Verified — matches |
| 1.1 Skala lurus | Garis lurus dibahagi kepada bahagian sama jarak; dua jenis: **skala lurus mudah** (garis nombor mudah dari 0) dan **skala lurus penuh** (ada bahagian berlorek/bersubbahagi di sebelah kiri 0 untuk bacaan lebih tepat) | 4 | 12 | "Skala Lurus" | **Critical — definitions swapped, see F1** |
| 1.1 Skala penyata | Dinyatakan dalam ayat, cth "1 cm mewakili 1 km" | 4 | 12 | "Skala Penyata" | Verified — matches |
| 1.1 Pecahan wakilan | Nisbah tanpa unit, cth 1:100 000 = 1 cm peta mewakili 100 000 cm (1 km) sebenar | 4 | 12 | "Pecahan Wakilan (PW)" | Verified — matches |
| 1.1 Penukaran unit | 1 km=100 000 cm, 1 km=1 000 m, 1 m=100 cm, 1 cm=10 mm | 4 | 12 | "Penukaran Unit" / "Wajib Hafal" | Verified — matches |
| 1.2 Jarak — maksud | Jarak = ukuran jauh antara dua tempat | 5 | 13 | "Maksud Jarak" | Verified — matches |
| 1.2 Jarak mutlak | Diukur dlm unit (m/km), tetap; cth Ipoh–Bidor = 66 km | 5 | 13 | "Jarak Mutlak" | Verified — matches |
| 1.2 Jarak relatif | Diukur ikut kos/masa, berubah; cth tambang bas Ipoh–Bidor=RM6.60, kereta=1j10m | 5 | 13 | "Jarak Relatif" | Verified — matches |
| 1.2 Rajah 1.1 / Jadual 1.1 | Yusrita 2.5km (teksi 5min/RM5, bas 10min/RM1.50, basikal **20min**/RM0); Adeline 5.0km; Kavitha 8.0km (teksi 16min/RM16) | 6 | 14 | "Jarak Relatif" worked example | **Critical — wrong figure, see F2** |
| 1.3.1 Skala penyata, jarak lurus | 11 cm × 1 km/cm = 11 km (sekolah–rumah Faiz) | 8 | 16 | "Contoh Pengiraan 1" | Verified — matches |
| 1.3.2 Skala lurus, jangka tolok | 6 cm (jangka tolok) × 2 km/cm = 12 km (sekolah–pejabat pos) | 10 | 18 | "Contoh Pengiraan 2" | Verified numerically; method description imprecise, see F4 |
| 1.3.3 Pecahan wakilan, jarak melengkung | 8 cm (benang) × 1 km/cm = 8 km (Sungai Jernih C→D), skala 1:100 000 | 11 | 19 | "Contoh Pengiraan 3" | Verified — matches |
| 1.4 Jarak sebenar berpandukan skala pd peta | 9 cm × 1 km/cm = 9 km (rumah Khairul–balai polis), Peta 1.2 | 12 | 20 | "Contoh Pengiraan" (1.4) | Verified — matches |
| Alat ukur (pembaris, jangka tolok, jalur kertas, benang) | Jarak lurus: pembaris/jangka tolok/jalur kertas. Jarak melengkung: benang/jalur kertas/pembaris | 9 | 17 | "Kemahiran Geografi" section | Verified — matches |
| Imbas Kembali (ringkasan bab) | Full mind-map recap of skala + jarak | 13 | 21 | `mindmap.ts` | Verified, with one imprecision — see F6 |

## 3. DSKP coverage

| SK | SP | Required outcome | Evidence in existing notes | Coverage | Evidence reference |
|---|---|---|---|---|---|
| 1.1 | 1.1.1 | Menyatakan jarak mutlak, jarak relatif, skala penyata, skala lurus, pecahan wakilan | `notes.ts` "Maksud Skala/Jarak" subsections + `keyTerms` | Full | DSKP p.22 (PDF p.34) |
| 1.1 | 1.1.2 | Menerangkan jarak mutlak, jarak relatif, skala penyata, skala lurus, pecahan wakilan | `notes.ts` definitions + examples | Full (but skala lurus explanation is factually swapped — F1) | DSKP p.22 (PDF p.34) |
| 1.1 | 1.1.3 | Menggunakan skala penyata, skala lurus, pecahan wakilan untuk menentukan jarak sebenar | `notes.ts` §1.3 worked examples; `interactive.ts` calculator | Partial — formula-level only, no hands-on map-measurement practice (F3) | DSKP p.22 (PDF p.34) |
| 1.1 | 1.1.4 | Menentukan jarak sebenar berpandukan skala pada peta | `notes.ts` §1.4 worked example; `interactive.ts` calculator | Partial — same gap as above (F3) | DSKP p.23 (PDF p.35) |

Topic-level DSKP coverage is complete (all 4 SPs addressed); the gap is in the depth of practice for the two "menggunakan"/"menentukan" (applied skill) standards — see Finding F3.

## 4. Findings

| ID | Severity | Issue | Existing evidence | Source page / standard | Corrective action | Verification status |
|---|---|---|---|---|---|---|
| F1 | **Critical** | "Skala lurus mudah" and "skala lurus penuh" definitions are **swapped**, and "mudah" is misspelled "muduh" throughout | `notes.ts:37` — *"skala lurus muduh (separuh skala bernombor negatif di sebelah kiri 0, untuk bacaan lebih tepat) dan skala lurus penuh (bermula dari 0 sehingga nombor maksimum)"*; same swap in `mindmap.ts:16` ("Skala lurus muduh vs skala lurus penuh") | Textbook p.4 (PDF p.12): the **mudah** diagram is a plain line "0 1 2 3 4 km" with no sub-division; the **penuh** diagram has the extra graduated "1 000 m" segment left of 0 for finer reading | Rewrite: *skala lurus mudah* = simple numbered line from 0, no sub-division. *skala lurus penuh* = has an extra graduated segment left of 0 for more precise sub-unit reading. Fix spelling "muduh"→"mudah" in both files | Verified (visual page render) |
| F2 | **Critical** | Yusrita's cited basikal travel time is wrong (16 min instead of 20 min), and her name is misspelled "Yusrate" | `notes.ts:110` — *"rumah Yusrate terletak 2.5 km dari sekolah... 5 minit menaiki teksi, 10 minit menaiki bas dan **16 minit** menaiki basikal"* | Textbook Jadual 1.1, p.6 (PDF p.14): Yusrita (2.5km) — teksi 5min, bas 10min, **basikal 20min**. 16min is actually Kavitha's teksi time (8.0km row) | Fix "Yusrate"→"Yusrita"; fix basikal time to 20 minit | Verified (table cross-check, page render) |
| F3 | Major | No hands-on map-measurement exercise (actual × marks, petunjuk/legend, scale bar) mirroring Rajah 1.1 / Peta 1.2 — notes only give pre-digested formula examples | `notes.ts` §1.3–1.4, `interactive.ts` calculator | Textbook pp.6, 8–12 (PDF 14, 16–20); DSKP SP 1.1.3/1.1.4 explicitly require "menggunakan... untuk menentukan" and exam items (Uji Diri 1.3, Cabaran Minda Q2–Q3) test this as a visual/manual skill, not just arithmetic | Add an interactive/visual map-reading component (e.g. an SVG map with legend + ruler/divider simulation) so students practise the actual measuring step, not just the multiplication | Verified (gap identified against source, not a factual error) |
| F4 | Minor | "Contoh Pengiraan 2: Skala Lurus" describes the jangka tolok result as "6 bahagian... setiap bahagian mewakili 2 km" rather than "diukur 6 cm, skala 1 cm mewakili 2 km" — final answer is correct but the mechanic described is imprecise and could confuse students about how a bar-scale reading actually works | `notes.ts:193` | Textbook p.10 (PDF p.18), steps 1–3 | Reword to match the textbook's measured-length framing (6 cm via jangka tolok, matched to the bar scale, not "6 segments") | Verified |
| F5 | Minor | "Kegunaan" (use-case) claims for each scale type (skala lurus → peta yang difotokopi; skala penyata → peta lakar/pelancongan; PW → peta topografi/rasmi) are not present in this textbook's Bab 1 text | `notes.ts` "Skala Lurus"/"Skala Penyata"/"Pecahan Wakilan (PW)" subsections, "Kegunaan:" lines | Not found in Bab 1, pp.2–15 (PDF 10–23) | Keep if pedagogically useful, but mark as supplementary enrichment rather than textbook-sourced fact, or source it from elsewhere in the KSSM syllabus (e.g. Bab 2 Peta Topografi) before citing it as textbook content | Needs source check |
| F6 | Minor | `mindmap.ts` node for Skala Lurus says "Diukur terus dengan pembaris" — the chapter's actual method for skala lurus (1.3.2) is jangka tolok transferred to the bar scale, not direct ruler measurement | `mindmap.ts:17` | Textbook p.10 (PDF p.18), 1.3.2 | Change to reflect jangka tolok as the primary tool for skala lurus readings | Verified |

## 5. Diagram and calculation verification

- All 14 Bab 1 pages were rendered to images (not just text-extracted) and visually inspected: induction map (p.3), skala-type diagram box (p.4), Rajah 1.1 + Jadual 1.1 map/table (p.6), step-by-step measuring diagrams for skala penyata/lurus/pecahan wakilan (pp.8–11), Peta 1.2 (p.12), Imbas Kembali mind-map (p.13), and the two Cabaran Minda practice maps (pp.14–15).
- Every worked calculation in the textbook was independently recomputed:
  - 11 cm × 1 km/cm = 11 km ✓
  - 6 cm × 2 km/cm = 12 km ✓
  - 8 cm × 1 km/cm = 8 km ✓ (skala 1:100 000 correctly reduces to 1 cm = 1 km)
  - 9 cm × 1 km/cm = 9 km ✓
  - All four match both the textbook and `notes.ts`.
- Jadual 1.1 (p.6) was independently cross-checked cell-by-cell against `notes.ts`' retelling — this is where F2 (Yusrita's basikal time) was found; all other cells (teksi/bas costs and times for Adeline and Kavitha) are not reproduced in `notes.ts` and were not a source of error.
- Unit-conversion facts (1 km = 1 000 m = 100 000 cm, 1 m = 100 cm, 1 cm = 10 mm) match the textbook's "Info" box exactly.

## 6. Proposed revised Visual Notes outline (not implemented)

1. **1.1 Skala** — keep current structure, but fix F1 and add the two scale-bar diagrams (mudah vs penuh) as actual visuals (SVG) rather than text description only, since the distinction is inherently visual.
2. **1.2 Jarak** — keep current structure; fix F2; optionally add the actual Rajah 1.1 neighbourhood map as a visual so "jarak mutlak" reads directly off a diagram rather than prose.
3. **1.3 Menentukan Jarak Sebenar Menggunakan Skala** — restructure to mirror the textbook's three worked sub-methods (1.3.1 skala penyata, 1.3.2 skala lurus/jangka tolok, 1.3.3 pecahan wakilan/benang) 1:1, each paired with a small interactive map (click two points → measure → multiply), addressing F3.
4. **1.4 Menentukan Jarak Sebenar Berpandukan Skala pada Peta** — keep the existing calculator, but precede it with a mini version of Peta 1.2 so students practise identifying the two points and measuring before being handed the "9 cm" figure.
5. Retain the "Kesilapan Lazim Murid" / "Formula Bank" sections — these are solid instructor-style enrichment and don't contradict the source.

## 7. Acceptance tests and remaining questions

- [ ] Confirm with content owner whether the "Kegunaan" (F5) claims should be kept as general enrichment, cited to another source, or removed.
- [ ] Decide whether to invest in an interactive map-measuring component (F3) now or track it as a separate enhancement ticket — it's the biggest gap but also the largest scope of new work.
- [ ] After F1/F2 are corrected in `notes.ts` and `mindmap.ts`, add a regression test (matching this repo's existing pattern, e.g. `geography-f1-reaudit.test.ts`) asserting the corrected values so they can't silently regress.
- No other textbook facts, diagrams, tables or DSKP standards in Bab 1 were found to be missing or incorrect beyond F1–F6 above.

**Do not represent unverified entries as complete.** (F3, F5 remain partially open pending owner decisions above.)
