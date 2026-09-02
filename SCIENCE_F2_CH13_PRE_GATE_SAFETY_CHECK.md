# Science Form 2 — Chapter 13 — Pre-Final-Gate Product Safety Check

**Date:** 2026-09-02
**Part 1 (quiz history):** read-only investigation, no code changed.
**Part 2 (dead notes):** one value corrected in two unreachable files.

---

## 1. Quiz history — how a completed attempt is actually stored

Traced end to end: submit → local state → Supabase → read back → render.

### The write path

`recordQuizResult` ([use-progress.ts:1327](src/hooks/use-progress.ts:1327)) accepts **counts only**:

```ts
(input: {
  subjectId: string; chapterKey: string;
  correct: number; total: number;
  xpEarned?; timerMode?; baseXp?; speedBonusXp?; streakBonusXp?;
  passBonusXp?; bestCorrectStreak?;
}): number
```

No question id. No option index. No answer text.

`insertQuizHistoryRow` ([use-progress.ts:771](src/hooks/use-progress.ts:771)) writes the same shape:

```ts
supabase.from("quiz_history").insert({
  user_id, subject_id, chapter_key,
  score_pct, correct, total,
  xp_earned?, timer_mode?, base_xp?, speed_bonus_xp?,
  streak_bonus_xp?, pass_bonus_xp?, best_correct_streak?,
})
```

The local mirror is `QuizResult` ([use-progress.ts:58](src/hooks/use-progress.ts:58)):

```ts
{ id, subjectId, chapterKey, scorePct, correct, total, date }
```

### The read path

`use-tracker-history.ts:77` selects exactly:

```
id, subject_id, chapter_key, score_pct, correct, total, created_at
```

`parent-dashboard.tsx:115-119` uses only `scorePct` and `date`.
`HomeDashboard.tsx:507` passes the same `QuizResult[]` to `analyzeProgress`.

### What does not exist

| Thing | Status |
|---|---|
| `question_attempts` table | **no `.from("question_attempts")` call anywhere in `src`** |
| `question_bank` table | not implemented — documented as planned |
| persisted selected-answer index | none — no `insert`/`upsert`/`localStorage` write of any selected index |
| in-progress quiz resume state | `src/routes/quizzes.tsx` contains **no `localStorage` usage at all** |
| `knowledge_engine` per-answer rows | read-only `SELECT` of published content cards ([CikguAIPanel.tsx:580](src/companion/CikguAIPanel.tsx:580)) |

[analytics.ts:263-273](src/lib/analytics.ts:263) states this outright: per-question attempt logging
is *"Planned future architecture… Nothing below is implemented yet — this stays a straight
chapter-level mapping until question_bank/question_attempts exist."*

### Verdict on the five questions asked

```
QUIZ HISTORY STORAGE MODEL:   E — aggregate score summary per completed quiz.
                              (subject_id, chapter_key, score_pct, correct, total,
                              timestamp, XP breakdown). NOT option index, NOT answer
                              text, NOT a question snapshot, NOT question-id + answer.
                              No per-question data is stored at any layer.
```

| Could reordering options cause an existing attempt to… | Answer | Evidence |
|---|---|---|
| show a different selected answer? | **NO** | no selected answer is stored anywhere |
| change correct/incorrect status? | **NO** | `correct` and `total` are integers frozen at submit time (`use-progress.ts:1341-1343`); nothing recomputes them |
| display the wrong option text? | **NO** | option text is never persisted, and no past-attempt view renders per-question detail — the read query has no such column |
| corrupt analytics? | **NO** | analytics consume `score_pct` / `correct` / `total`, all order-independent |

**OPTION REORDER BREAKS OLD HISTORY: NO**
**PRODUCT FIX REQUIRED: NO**
**Classification: NON-BLOCKING.**

### Correction to my own remediation report

`SCIENCE_F2_CH13_REMEDIATION_REPORT.md` §FINAL flagged, as an item for the gate, that
*"existing Chapter 13 quiz-history rows recorded against the old key order are now misaligned;
whether they need invalidating is a product decision."*

**That was wrong.** There is no per-question history to misalign — rows hold only a score summary.
Nothing needs invalidating, and no product decision is pending. The point is withdrawn; the
evidence above supersedes it.

---

## 2. Dead Chapter 13 notes

### Unreachability confirmed

- `registry.ts:3724` / `:3738` supply **both** `notes: scienceF2C13Notes*` **and**
  `sciF2InteractiveData: scienceF2C13Interactive*`.
- `notes.tsx:2010` branches on `activeChapter?.sciF2InteractiveData` first; the
  `activeChapter?.notes` branch is at `notes.tsx:2152`, inside the later `else`.
- Chapter 13's `sciF2InteractiveData` is present and truthy (`chapter: 13` in both files), so the
  interactive branch always wins and the notes branch is never reached.
- No other importer: `scienceF2C13NotesBM/DLP` appear only in their own files and in `registry.ts`.

### Change made

The stale meteoroid range only — 2 occurrences per file, 4 total:

```
notes-bm.ts   "…from 10 m hingga 1 m."   →   "…from 10 μm hingga 1 m."   ×2
notes-dlp.ts  "…from 10 m to 1 m."       →   "…from 10 μm to 1 m."       ×2
```

`git diff` is 4 changed lines across the two files, and the only textual difference on each is
`10 m` → `10 μm`. Nothing else was touched, and the files remain unreachable — this removes latent
incorrect academic data in case the render path ever changes, exactly as scoped.

```
DEAD CH13 WRONG RANGE REMAINING: 0
```

Across **every** Chapter 13 file — active and dead — the wrong range now appears 0 times.

---

## 3. Verification

```
QUIZ HISTORY STORAGE MODEL:      E — aggregate score summary, no per-question data
OPTION REORDER BREAKS OLD HISTORY: NO
PRODUCT FIX REQUIRED:            NO
DEAD CH13 WRONG RANGE REMAINING: 0

CH13 TESTS:                      PASS   (29/29)
SCIENCE F2:                      PASS   (1133/1133, 44 files)
SOURCE LEAKAGE:                  PASS   (88/88)
TYPECHECK:                       PASS   (exit 0)
BUILD:                           PASS   (exit 0)

CHAPTER 8 CHANGED:               NO
CHAPTER 11 CHANGED:              NO
CHAPTER 12 CHANGED:              NO
```

Pre-existing unrelated failures elsewhere in the repo (billing, invoice PDF, onboarding UI, four BM
mind-map registrations, Math Form 2 Chapter 1) are unchanged and untouched.

---

## FINAL

**READY FOR FINAL RELEASE GATE**

No product fix is required. The one open item I had carried forward from the remediation report —
possible quiz-history misalignment — is withdrawn on evidence: history stores a score summary, not
answers, so option order cannot reach it.

The remaining known-and-accepted item is unchanged and non-blocking: `.claude/launch.json` declares
port 5173 while `npm run dev` serves on 8080 (out of scope, not changed), and the live `/notes`
route stayed unverified in-browser because it is auth-gated.
