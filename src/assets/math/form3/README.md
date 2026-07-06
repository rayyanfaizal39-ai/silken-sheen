# Mathematics Form 3 — chapter card backgrounds

Unlike `geography/form{1,2,3}` and `science/form{1,2,3}` (which use a
`ch{N}-slug.ext` filename prefix), these keep their original generated
filenames — `math_f3_chapter{N}.png` — per an explicit "do not rename"
requirement. The code matches on `chapter(\d+)` instead of `ch(\d+)-`.

| File | Chapter |
|---|---|
| `math_f3_chapter1.png`  | Chapter 1 — Indeks / Index |
| `math_f3_chapter2.png`  | Chapter 2 — Bentuk Piawai / Standard Form |
| `math_f3_chapter3.png`  | Chapter 3 — Matematik Pengguna (Consumer Mathematics) |
| `math_f3_chapter4.png`  | Chapter 4 — Lukisan Berskala / Scale Drawings |
| `math_f3_chapter5.png`  | Chapter 5 — Nisbah Trigonometri / Trigonometric Ratios |
| `math_f3_chapter6.png`  | Chapter 6 — Sudut dan Tangen bagi Bulatan / Angles and Tangents of Circles |
| `math_f3_chapter7.png`  | Chapter 7 — Pelan dan Dongakan / Plans and Elevations |
| `math_f3_chapter8.png`  | Chapter 8 — Lokus dalam Dua Dimensi / Locus |
| `math_f3_chapter9.png`  | Chapter 9 — Garis Lurus / Straight Lines |

**`math_f3_chapter10.png` through `math_f3_chapter13.png` exist as files
but have NO corresponding registered chapter** — Mathematics Form 3 only
has 9 chapters in `src/content/registry.ts` (`math-f3-c1` .. `math-f3-c9`).
These four images are copied here for completeness but will never render
anywhere until (if ever) chapters 10–13 are added to the registry — do not
delete them, but do not expect them to appear on the site either.

No further code changes are needed after adding/updating files here —
`SubjectWorldPage.tsx` picks them up automatically via `import.meta.glob`
and uses them as the chapter card background (with a dark gradient overlay
for text legibility) on the Mathematics Form 3 expedition map.
