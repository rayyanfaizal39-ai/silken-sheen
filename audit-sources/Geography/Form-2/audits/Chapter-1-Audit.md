# Bab 1: Skala dan Jarak — Audit Report

**Date:** 2026-10-25 (re-verified 2026-10-27)
**Repo + branch:** silken-sheen-main, `feature/geography-f2-chapter1-improvements` (branched from `feature/cosmic-companion-dashboard-design` after merging `main`)
**Textbook edition + SHA256:** Geografi Tingkatan 2, IMS Books Trading Sdn. Bhd. / KPM 2017, ISBN 978-967-0463-47-6, No. Siri Buku 0061 — `audit-sources/Geography/Form-2/Textbook.pdf`, SHA256 `6962bde2d70ed27f99aa369896f4e2111bd6e0ad4a6c717e2c8210d5c6447c63`
**DSKP version + SHA256:** KSSM Geografi Tingkatan 2, Bahagian Pembangunan Kurikulum KPM — `audit-sources/Geography/Form-2/DSKP.pdf`, SHA256 `03db2a6b1f6f4104766d36cc635193532f282e9898937188e3043f736996698c`
**Existing note paths:** `src/content/form2/geography/chapter-1/notes.ts`, `mindmap.ts`, `interactive.ts`
**Source-read status:** Both PDFs present and confirmed readable (text-extracted with PyMuPDF and rendered to page images for visual/diagram inspection). Textbook: 176 PDF pages. DSKP: 62 PDF pages. Bab 1 = printed pages 2-15 = PDF pages 10-23 (offset +8). DSKP SK 1.1 = printed pages 22-23 = PDF pages 34-35 (offset +12).

This is a **re-audit**. An earlier pass on this repo already identified and corrected two Critical errors (F1/F2 below). This report re-verifies those corrections against source and does a full fresh comparison to confirm nothing else was missed. **Audit-only content below is unchanged from the prior pass; F3-F6 are being implemented separately on this branch.**

## 1. Scope and blockers

No blockers. Both reference PDFs exist and are readable, including diagrams, maps, legends and tables. Audited **only** Bab 1 (Skala dan Jarak), DSKP Standard Kandungan 1.1 under "1.0 Kemahiran Geografi".

## 2. Textbook inventory

| Subtopic | Core definition/fact | Printed page | PDF page | Existing AcadeMY section | Status |
|---|---|---|---|---|---|
| 1.1 Skala - maksud | Skala = nisbah jarak di peta : jarak sebenar di permukaan bumi | 4 | 12 | "Maksud Skala" | Verified - matches |
| 1.1 Skala lurus - mudah vs penuh | Dua jenis: skala lurus mudah (garis nombor mudah dari 0, tiada bahagian tambahan) dan skala lurus penuh (ada bahagian berlorek/bersubbahagi di sebelah kiri 0 untuk bacaan lebih tepat) | 4 | 12 | "Skala Lurus" | Verified - matches (previously swapped, now corrected; see section 4 F1) |
| 1.1 Skala penyata | Dinyatakan dalam ayat, cth "1 cm mewakili 1 km" | 4 | 12 | "Skala Penyata" | Verified - matches |
| 1.1 Pecahan wakilan | Nisbah tanpa unit, cth 1:100 000 = 1 cm peta mewakili 100 000 cm (1 km) sebenar | 4 | 12 | "Pecahan Wakilan (PW)" | Verified - matches |
| 1.1 Penukaran unit | 1 km=100 000 cm, 1 km=1 000 m, 1 m=100 cm, 1 cm=10 mm | 4 | 12 | "Penukaran Unit" / "Wajib Hafal" | Verified - matches |
| 1.2 Jarak - maksud | Jarak = ukuran jauh antara dua tempat | 5 | 13 | "Maksud Jarak" | Verified - matches |
| 1.2 Jarak mutlak | Diukur dlm unit (m/km), tetap; cth Ipoh-Bidor = 66 km | 5 | 13 | "Jarak Mutlak" | Verified - matches |
| 1.2 Jarak relatif | Diukur ikut kos/masa, berubah; cth tambang bas Ipoh-Bidor=RM6.60, kereta=1j10m | 5 | 13 | "Jarak Relatif" | Verified - matches |
| 1.2 Rajah 1.1 / Jadual 1.1 | Yusrita 2.5km (teksi 5min/RM5, bas 10min/RM1.50, basikal 20min/RM0); Adeline 5.0km; Kavitha 8.0km (teksi 16min/RM16) | 6 | 14 | "Jarak Relatif" worked example | Verified - matches (previously wrong basikal figure, now corrected; see section 4 F2) |
| 1.3.1 Skala penyata, jarak lurus | 11 cm x 1 km/cm = 11 km (sekolah-rumah Faiz) | 8 | 16 | "Contoh Pengiraan 1" | Verified - matches |
| 1.3.2 Skala lurus, jangka tolok | 6 cm (jangka tolok) x 2 km/cm = 12 km (sekolah-pejabat pos) | 10 | 18 | "Contoh Pengiraan 2" | Verified numerically; method phrasing imprecise - see section 4 F4 |
| 1.3.3 Pecahan wakilan, jarak melengkung | 8 cm (benang) x 1 km/cm = 8 km (Sungai Jernih C to D), skala 1:100 000 | 11 | 19 | "Contoh Pengiraan 3" | Verified - matches |
| 1.4 Jarak sebenar berpandukan skala pd peta | 9 cm x 1 km/cm = 9 km (rumah Khairul-balai polis), Peta 1.2 | 12 | 20 | "Contoh Pengiraan" (1.4) | Verified - matches |
| Alat ukur (pembaris, jangka tolok, jalur kertas, benang) | Jarak lurus: pembaris/jangka tolok/jalur kertas. Jarak melengkung: benang/jalur kertas/pembaris | 9 | 17 | "Kemahiran Geografi" section | Verified - matches |
| Imbas Kembali (ringkasan bab) | Full mind-map recap of skala + jarak | 13 | 21 | mindmap.ts | Verified, one phrasing imprecision - see section 4 F6 |

## 3. DSKP coverage

| SK | SP | Required outcome | Evidence in existing notes | Coverage | Evidence reference |
|---|---|---|---|---|---|
| 1.1 | 1.1.1 | Menyatakan jarak mutlak, jarak relatif, skala penyata, skala lurus, pecahan wakilan | notes.ts "Maksud Skala/Jarak" subsections + keyTerms | Full | DSKP p.22 (PDF p.34) |
| 1.1 | 1.1.2 | Menerangkan jarak mutlak, jarak relatif, skala penyata, skala lurus, pecahan wakilan | notes.ts definitions + examples | Full (mudah/penuh swap corrected) | DSKP p.22 (PDF p.34) |
| 1.1 | 1.1.3 | Menggunakan skala penyata, skala lurus, pecahan wakilan untuk menentukan jarak sebenar | notes.ts section 1.3 worked examples; interactive.ts calculator | Partial pre-fix: formula-level only, no hands-on map-measurement practice (see F3) | DSKP p.22 (PDF p.34) |
| 1.1 | 1.1.4 | Menentukan jarak sebenar berpandukan skala pada peta | notes.ts section 1.4 worked example; interactive.ts calculator | Partial pre-fix: same gap as above (F3) | DSKP p.23 (PDF p.35) |

## 4. Findings

| ID | Severity | Issue | Source page / standard | Status |
|---|---|---|---|---|
| F1 | Critical | "Skala lurus mudah" / "skala lurus penuh" were defined swapped, and "mudah" misspelled "muduh" | Textbook p.4 (PDF p.12) | **Resolved** (notes.ts, mindmap.ts) |
| F2 | Critical | Yusrita's basikal time was wrong (16 min, actually Kavitha's teksi time); name misspelled "Yusrate" | Textbook Jadual 1.1, p.6 (PDF p.14) | **Resolved** (notes.ts; matching quiz typo in content.ts also fixed) |
| F3 | Major | No hands-on map-measurement exercise (actual x marks, legend, scale bar) mirroring Rajah 1.1 / Peta 1.2 - notes only give pre-digested formula examples | Textbook pp.6, 8-12 (PDF 14, 16-20); DSKP SP 1.1.3/1.1.4 | Being implemented this branch |
| F4 | Minor | "Contoh Pengiraan 2: Skala Lurus" frames the jangka tolok result as "6 bahagian" rather than "diukur 6 cm" - final answer correct, mechanic imprecise | Textbook p.10 (PDF p.18), steps 1-3 | Being implemented this branch |
| F5 | Minor | "Kegunaan" (use-case) claims for each scale type are not present in this textbook's Bab 1 text | Not found in Bab 1, pp.2-15 (PDF 10-23) | Being implemented this branch |
| F6 | Minor | mindmap.ts node for Skala Lurus says "Diukur terus dengan pembaris" - actual method (1.3.2) is jangka tolok transferred to the bar scale | Textbook p.10 (PDF p.18), 1.3.2 | Being implemented this branch |

## 5. Diagram and calculation verification

All 14 Bab 1 pages were rendered to images and visually inspected (not just text-extracted). Every worked calculation (11x1=11km, 6x2=12km, 8x1=8km, 9x1=9km) was independently recomputed and matches `notes.ts`. Jadual 1.1 was re-checked cell-by-cell; the Yusrita basikal figure now matches exactly. Unit-conversion facts match the textbook's "Info" box exactly.

## 6. F3-F6 implementation notes

See the branch's commit history and the companion summary for exactly what changed for F3 (new interactive map-measurement exercise), F4 (reworded jangka tolok example), F5 (relabelled "Kegunaan" lines as general usage notes, not textbook-cited facts), and F6 (corrected mindmap wording).
