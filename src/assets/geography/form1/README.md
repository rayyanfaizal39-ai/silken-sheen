# Geography Form 1 — chapter card backgrounds

Drop the 13 cropped chapter-icon images from the concept sheet here, named so the
chapter number prefix matches the chapter they belong to. The filename after the
number is free-form (just for your own reference) — only the leading `ch{N}-`
prefix is read by the code.

| File (any name starting with this prefix) | Chapter |
|---|---|
| `ch1-*.png`  | Chapter 1 — Arah (compass) |
| `ch2-*.png`  | Chapter 2 — Kedudukan (world map + coordinates) |
| `ch3-*.png`  | Chapter 3 — Peta Lakar (hand-drawn sketch map) |
| `ch4-*.png`  | Chapter 4 — Lakaran Peta Malaysia |
| `ch5-*.png`  | Chapter 5 — Bumi (Earth cross-section) |
| `ch6-*.png`  | Chapter 6 — Bentuk Muka Bumi (mountain/landform) |
| `ch7-*.png`  | Chapter 7 — Saliran (river) |
| `ch8-*.png`  | Chapter 8 — Penduduk di Malaysia (population density map) |
| `ch9-*.png`  | Chapter 9 — Petempatan di Malaysia (settlements/city) |
| `ch10-*.png` | Chapter 10 — Bentuk Muka Bumi dan Saliran di Asia Tenggara |
| `ch11-*.png` | Chapter 11 — Penduduk dan Petempatan di Asia Tenggara |
| `ch12-*.png` | Chapter 12 — Sumber Air (dam/reservoir) |
| `ch13-*.png` | Chapter 13 — Sisa Domestik (recycling) |

Accepted extensions: `.png`, `.jpg`, `.jpeg`, `.webp`.

No code changes are needed after adding files here — `SubjectWorldPage.tsx` picks
them up automatically via `import.meta.glob` and uses them as the chapter card
background (with a dark gradient overlay for text legibility) on the Geography
Form 1 expedition map.
