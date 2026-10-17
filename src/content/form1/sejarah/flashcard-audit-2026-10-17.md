# Form 1 Sejarah flashcard audit — 17 October 2026

## Scope and actual learner route

- `src/data/flashcards.ts` owns the inline Bab 1–6 and Bab 8 records. Bab 7 is generated in `src/content/form1/sejarah/chapter-7/sej7-revision.ts` and spread into the common legacy array. Do not audit only a stale `silken-sheen-main/` copy.
- The student loader is `getFlashcardDeckCards` in `src/lib/flashcard-availability.ts`. It calls `standardizeFlashcardDeck(..., 20, 60)` for Sejarah Form 1. Decks of **55 or 40** cards are rejected as unavailable; tests that merely count records will not catch that.
- Before this fix, Bab 1 had **55** original flashcards, Bab 7 had **40** source-derived cards and the other six chapters had 60 each: **455 records total**. Both incomplete decks could resolve to **empty** student-facing decks. This is a functional availability defect, not just an editorial preference.
- After fixes: **8 × 60 = 480** original, unique IDs, covering Foundation/Practice/Challenge sets of 20 cards each. All existing IDs remain unchanged; 25 new IDs were appended.

## Content repairs

| Bab | Scope | Finding and action |
| --- | --- | --- |
| 1 — Mengenali Sejarah | New cards 56–60 | Added source-grounded recall for stages of oral research, written-source corroboration, excavation grid, critical interpretation and historical empathy. |
| 2 — Zaman Air Batu | Cards 15, 17, 20, 22, 24, 25, 48 | Removed duplicate Sunda / extinction questions and overconfident single-cause mammoth extinction claims; distinguished **modern human-caused warming** from warming at the end of the Ice Age. Preserved the KSSM textbook's `pengglasieran` phrasing where currently used in other cards. |
| 3 — Zaman Prasejarah | 60 unchanged | Unique front text and usable answer sizes in the inline bank; remains a candidate for deeper textbook line-by-line fact checking. |
| 4 — Mengenali Tamadun | Cards 2, 3, 9, 15, 33 | Replaced `civis` with textbook `civitas`; fixed the textbook's **hadharah** (values) versus **madaniyyah** (material) distinction; replaced unrelated `syajaratun` example with `hadari`; removed the overgeneralized absolute-king claim. |
| 5 — Tamadun Awal Dunia | Cards 21, 29, 30, 44, 45 | Removed unverified mummification/anatomy detail and `every home` sewerage superlative; avoided specifying a religious ritual as fact for the Indus Great Bath; changed the alleged "oldest" Gilgamesh claim to the textbook-mentioned `Enuma Elish`. |
| 6 — Peningkatan Tamadun Yunani dan Rom | Cards 14, 18, 21 | Corrected Athens from **representative** to **direct** democracy; corrected textbook Majlis membership (500, appointed by the Assembly, **two-year** term) and Jury size (**101–1001**, depending on case). |
| 7 — Peningkatan Tamadun India dan China | New source-derived cards 41–60 | Added dynasty chronology, direct vs religious expansion, governmental factors, Qin/Han founders and capitals, Silk Road, education and paper. Values are reused from the existing canonical `sej7Content` rather than copied into a second content source. |
| 8 — Tamadun Islam dan Sumbangannya | Cards 11, 12, 42 | Removed unsupported `kasta` and speculative `perniagaan berhala` explanations for the Quraysh opposition, and refocused on sourced social and economic principles. |

## Historical reference pages

Source comparisons were selective, not an exhaustive independent verification of all 480 cards:

- KSSM Sejarah Tingkatan 1, Bab 1: `https://online.anyflip.com/tfnwp/agqs/files/basic-html/page28.html` — research methods / interpretation.
- Bab 2: `https://online.anyflip.com/tfnwp/agqs/files/basic-html/page38.html` — Ice Age and `pengglasieran`.
- Bab 4: `https://online.anyflip.com/tfnwp/agqs/files/basic-html/page84.html` — `civitas` and Arabic terminology; `page86.html` — `hadharah` and `madaniyyah`.
- Bab 5: `https://online.anyflip.com/tfnwp/agqs/files/basic-html/page108.html` — Indus location, environment and trade. Further details are aligned to the source-reviewed Form 1 quiz bank.
- Bab 6: `https://online.anyflip.com/tfnwp/agqs/files/basic-html/page130.html`, `page132.html` and `page133.html` — Athens Assembly, Council and Jury.
- Bab 7: `src/content/form1/sejarah/chapter-7/source-audit.md` — canonical notes source comparison.

## Boundaries and release checks

- Does **not** alter quizzes, XP, leaderboard, student history, payment records, form-routing logic, or production deployment.
- Includes a new `sejarah-f1-flashcards-audit.test.ts` that uses the **actual learner loader**, validates 60 consecutive IDs and three sets of 20 in each chapter, and protects corrected factual examples.
- Static review of inline content confirms 60 records and no duplicate fronts in Bab 1–6 and 8; Bab 7 now has 60 source-derived entries (was 40). Actual Vitest / build / visual QA remain **unrun here**.
- Before merging, test the new branch in VS Code:

```powershell
git fetch origin
git switch --track origin/audit/sejarah-f1-flashcards-oct2026
npm test -- src/content/form1/sejarah/sejarah-f1-flashcards-audit.test.ts src/lib/flashcard-content-audit.test.ts src/lib/flashcard-form-isolation.test.ts --reporter=dot
npm run build
```

- Browser smoke tests: open Form 1 Sejarah flashcards Bab 1 and Bab 7; ensure all three sets have 20 visible cards, flip, next/previous, favourites, reshuffle and completion work on mobile and desktop.
- Do not assume the earlier Sejarah quiz PR #72 was merged; this flashcard branch is an independent change based on `main`.
