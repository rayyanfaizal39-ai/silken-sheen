# Geography Form 2 — chapter card backgrounds

Same convention as `src/assets/geography/form1/` — filename prefix `ch{N}-`
is all that's read by the code; the rest is free-form.

| File (any name starting with this prefix) | Chapter |
|---|---|
| `ch1-*.png`  | Chapter 1 — Skala dan Jarak |
| `ch2-*.png`  | Chapter 2 — Peta Topografi |
| `ch3-*.png`  | Chapter 3 — Pengaruh Pergerakan Bumi terhadap Cuaca dan Iklim |
| `ch4-*.png`  | Chapter 4 — Cuaca dan Iklim di Malaysia |
| `ch5-*.png`  | Chapter 5 — Pengangkutan di Malaysia |
| `ch6-*.png`  | Chapter 6 — Telekomunikasi di Malaysia |
| `ch7-*.png`  | Chapter 7 — Kepelbagaian Iklim di Asia |
| `ch8-*.png`  | Chapter 8 — Jenis dan Kemajuan Pengangkutan di Asia |
| `ch9-*.png`  | Chapter 9 — Pemanasan Global |
| `ch10-*.png` | Chapter 10 — Teknologi Hijau |

Accepted extensions: `.png`, `.jpg`, `.jpeg`, `.webp`.

No further code changes are needed after adding files here — `SubjectWorldPage.tsx`
picks them up automatically via `import.meta.glob` and uses them as the chapter
card background (with a dark gradient overlay for text legibility) on the
Geography Form 2 expedition map.
