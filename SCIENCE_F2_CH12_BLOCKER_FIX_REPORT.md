# Science Form 2 — Chapter 12 (Sistem Suria) — FINAL BLOCKER FIX

**Scope:** the remaining gravity misconception only.
**Date:** 2026-09-01
**Authority:** `audit-sources/Science/Form-2/Textbook.pdf` (ms. 259, Jadual 12.3), DSKP SP 12.1.3.

---

## 1. The defect

The chapter taught that Saturn's, Uranus's and Neptune's gravity is **lower than Earth's**
because they are gas giants. For Uranus that is true. For Saturn and Neptune it is false, and
the chapter contradicted its own comparison table on the same screen.

| Planet | Gravity (m s⁻², textbook Jadual 12.3) | vs Earth 9.8 | Old wording |
|---|---|---|---|
| Zuhal / Saturn | **10.44** | **higher** | "tidak setinggi Bumi" — WRONG |
| Neptun / Neptune | **11.15** | **higher** | "tidak setinggi Bumi" — WRONG |
| Uranus | 8.69 | lower | "lower than Earth" — correct |
| Musytari / Jupiter | 24.79 | higher | — |
| Utarid / Mercury | 3.7 | lower | correct |
| Marikh / Mars | 3.71 | lower | correct |

The textbook's own sentence for the gas giants (ms. 259) is
*"tarikan graviti planet-planet ini **tidak terlalu tinggi** berbanding dengan Bumi"* —
*not much higher*, not *lower*. The phrase "lebih lemah" appears **0 times** in the chapter.

### Occurrence count correction

The release gate reported **9** occurrences. The true count was **10**. The gate's regex
(`not as high as Earth`) missed DLP `f27`, phrased *"Why **isn't** the gravity of Saturn …
**as high as** Earth's"*. That miss is what motivated replacing the phrase-only guard.

---

## 2. What was changed

Four content files. No component, route, schema, or shared-block code was touched.

| File | Change |
|---|---|
| `mindmap-bm.ts` | 4 nodes rewritten (`c1-3-6-5`, `c1-3-7-6`, `c1-3-8-4`, `c1-4-2-6`) |
| `mindmap-dlp.ts` | 4 nodes rewritten (same ids) |
| `flashcards-bm.ts` | `f27` front + back rewritten |
| `flashcards-dlp.ts` | `f27` front + back rewritten |

Per-planet, not blanket: Saturn and Neptune now use the source's *"tidak terlalu tinggi
berbanding Bumi"* / *"not much higher than Earth's"*; **Uranus keeps its plain
lower-than-Earth statement**, because 8.69 < 9.8 is what the source says.

`f27` previously asked a question that presupposed the falsehood ("Why isn't Saturn's gravity
as high as Earth's?"). Rewriting the answer alone would have left the false premise in the
prompt, so the question itself was reframed as a comparison.

**No cards were added or removed.** Both decks remain 65 cards; both quiz banks remain 30 items.

---

## 3. The regression guard

`chapter-12-remediation.test.tsx` — the old guard banned two literal phrases and was defeated
by a synonym. It is replaced with a semantic guard that judges the **claim**, scoped to the
**planet it is false about**, and reads the chapter's own **data** for the numbers.

Three properties the old guard lacked:

1. **Planet-specific, never a blanket ban.** A lower-than-Earth claim is a violation only when
   the subject is Saturn or Neptune. The same phrasing about Uranus, Mercury or Mars passes —
   there is a dedicated test asserting those true statements still exist.
2. **Claims are judged in context, not as loose strings.**
   - Flashcards and quizzes are evaluated as **front + back** units, so a misconception-check
     card that asks *"Adakah graviti Zuhal lebih rendah daripada Bumi?"* and answers *"Tidak.
     … 10.44 m s⁻² berbanding 9.8 m s⁻²"* is correctly read as teaching the right thing.
   - Mind maps and interactive content are walked as **trees carrying the nearest ancestor that
     names a planet**, because a child node reads *"Graviti 10.44 m s⁻² — …"* with the planet
     only on its parent. Nearest naming wins, so a node that names its own planet overrides
     whatever it is nested under.
3. **A numeric guard reading the shipped table**, not the prose: it pulls the `gravity` row out
   of the `planetComparison` block actually rendered to learners and asserts
   Saturn > Earth, Neptune > Earth, Jupiter > Earth, Uranus < Earth, Mercury < Earth,
   Mars < Earth, with Earth = 9.8. Wording and data can no longer drift apart silently.

### Guard proven to fail on the defect

Three regressions were injected and the guard caught all three, then the files were restored
and the suite re-verified green:

| Injected | Caught |
|---|---|
| BM mind-map child node → "lebih lemah daripada Bumi" (planet on parent only) | yes — `mindmap bm: c1-3-6-5` |
| DLP mind-map Neptune node → "weaker than Earth's" | yes — `mindmap dlp: c1-3-8-4` |
| DLP `f27` restored to the presupposing question | yes — `flashcards dlp sci-f2-c12-dlp-f27` |

An earlier iteration of the guard caught only the flashcard and missed both mind-map nodes;
that is why the tree walk carries ancestor scope. The mutation test is what exposed it.

---

## 4. Semantic sweep — all active learner surfaces

Surfaces swept: `interactive-bm/dlp`, `quizzes-bm/dlp`, `flashcards-bm/dlp`, `mindmap-bm/dlp`.
Comments stripped; `notes-bm.ts` / `notes-dlp.ts` excluded as dead (shadowed by the interactive
branch in `routes/notes.tsx`) and reported separately.

```
FALSE SATURN LOWER-THAN-EARTH CLAIMS:  0
FALSE NEPTUNE LOWER-THAN-EARTH CLAIMS: 0
misconception cards that correctly refute: 2   (bm f65, dlp f65)
TRUE lower-than-Earth statements preserved:  5 (Uranus / Mercury / Mars — all source-backed)
legacy wording ("setinggi Bumi", "as high as Earth", "graviti lebih lemah", "weaker gravity")
  in active surfaces: 0
```

The legacy wording still exists in `notes-bm.ts` / `notes-dlp.ts`. Those files are unreachable
and were not revived or edited, per standing instruction.

---

## 5. Verification

| Check | Result |
|---|---|
| Chapter 12 dedicated tests | **40 / 40 pass** |
| Science Form 2 + notes suites | **1091 / 1091 pass** (39 files) |
| Source-leakage tests (`learner-facing-leakage.test.ts`) | **88 / 88 pass** |
| `npx tsc --noEmit` | **clean, exit 0** |
| `npm run build` | **succeeds** (nitro / Cloudflare Pages output written) |
| Chapter 8 changed | **NO** |
| Chapter 11 changed | **NO** |

### Pre-existing unrelated failures — not hidden, not caused here

The full suite is **2634 passed / 8 failed** across 225 files. The 8 failures are in billing,
invoice PDF, onboarding UI, four BM mind-map registrations, and Math Form 2 Chapter 1:

```
src/lib/billing-core.test.ts
src/lib/invoice-pdf.server.test.ts
src/routes/-onboarding-ui.test.ts
src/content/bm/analisis-kehendak-soalan-form3-mindmap.test.ts
src/content/bm/asas-penulisan-form1-mindmap.test.ts
src/content/bm/strategi-menjawab-uasa-form3-mindmap.test.ts
src/content/bm/teknik-menjana-idea-kbat-form3-mindmap.test.ts
src/content/form2/math/chapter-1/quizzes-dlp.test.ts
```

These were re-run **at HEAD in a detached worktree**, before any Chapter 12 work: all 8 fail
identically there. Pre-existing, unrelated, untouched. The worktree was removed.

---

## 6. Preserve list — confirmed intact

| Item | Status |
|---|---|
| 1 SK, 5 SP, 5 sections | intact (test-asserted) |
| Fake section "12.2" count = 0 | intact (test-asserted) |
| 10/10 planet characteristics | intact (test-asserted) |
| Planet comparison table | untouched |
| AU / light-year calculator + BM localisation | untouched |
| 4/4 hypotheticals · 6/6 habitability · 6/6 ecological areas | untouched |
| Planet Nine uncertainty · Pluto status | untouched |
| Quizzes (30 + 30), SP and option distribution | **file untouched by this fix** |
| 46 controls, 0 inert, 0 misleading, responsive | unaffected — no component or interaction code changed |
| Source leakage = 0 | re-verified, 88 tests pass |

---

## 7. Out of scope — found, reported, NOT fixed

**Ecological-footprint terminology contradicts itself across three cards in each deck.**

Textbook ms. 263 names six areas: *jejak karbon, kawasan binaan, hutan, kawasan pertanian,
kawasan penternakan, kawasan perikanan*.

| Card | Wording | Verdict |
|---|---|---|
| `f19` (bm & dlp) | "rawatan sisa karbon dioksida, pembinaan, hutan, pertanian, ladang dan perikanan" | **not the source's terms** |
| `f52` (bm & dlp) | same as f19 | **not the source's terms** |
| `f61` (bm & dlp) | "jejak karbon, kawasan binaan, hutan, kawasan pertanian, kawasan penternakan, kawasan perikanan" | correct |

The count is six everywhere, so the preserve-list item holds, but a learner drilling the deck
meets two different answers to the same question and one of them is invented. This is a
non-gravity academic defect and was left untouched under the fix-only-the-gravity-misconception
scope. It should be decided in the rerun, not silently absorbed here.

---

## 8. Verdict

The gravity misconception is corrected on every active learner surface, per-planet and
source-faithful, and is now protected by a guard that has been demonstrated to fail on the
original defect — including the parent-scoped mind-map form the previous guard could not see.

**FINAL: READY FOR RELEASE-GATE RERUN**

with one named non-gravity item (§7, `f19` / `f52` ecological terminology) carried forward for
the rerun to rule on.
