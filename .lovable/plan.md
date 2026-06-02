## Goal

Make every chapter render through one consistent layout, and make adding a new chapter a single-file operation.

## What's wrong today

- `src/routes/notes.tsx` (1,175 lines) hardcodes per-chapter blocks: Sejarah Ch1/Ch2 videos + mind maps, Science Ch2 BM/DLP tabs, sejarah subtopics — each as its own JSX branch.
- Mind maps, flashcards, quizzes, and notes live in different files with different shapes and are wired up by ad-hoc imports.
- Indicators for what a chapter has (Notes / Flashcards / Quiz / MindMap / AI Video) are inconsistent across subjects.
- Adding a new chapter currently touches 4–5 files plus a route branch.

## New shape

### 1. Chapter schema (`src/content/types.ts`)

```ts
type ChapterContent = {
  id: string;                  // "sejarah-f1-c1"
  subjectId: string;
  form: "Form 1" | "Form 2" | "Form 3";
  chapterKey: string;          // "Chapter 1"
  title: string;
  lang?: "bm" | "dlp";         // optional, for Science
  video?: { youtubeId: string; title: string; captionLang?: string };
  mindMap?: MindNode;          // existing MindNode type
  notes?: StructuredNotes;     // reused ScienceChapter2Notes shape, renamed
  flashcards?: Flashcard[];    // existing
  quiz?: QuizQuestion[];       // existing
  subtopics?: Subtopic[];      // existing
};
```

`StructuredNotes` reuses the existing `ScienceChapter2Notes` shape (quickRevision / sections / keyExamFacts) — already general-purpose.

### 2. Registry (`src/content/registry.ts`)

```ts
export const chapters: ChapterContent[] = [
  sejarahF1C1, sejarahF1C2, ..., scienceF1C2BM, scienceF1C2DLP, ...
];
export function getChapter(subjectId, chapterKey, lang?): ChapterContent | undefined;
export function getChapterFeatures(c): { notes; flashcards; quiz; mindMap; video };
```

Each chapter lives in its own file under `src/content/<subject>/<id>.ts`. Existing mindmap/notes/flashcard/quiz data is re-exported from there — no data rewrites, just wrapping.

### 3. Unified notes page

Replace the giant branch tree in `notes.tsx` with one renderer:

```
<ChapterHeader />
<ChapterFeatureBar />     // pill indicators: Notes • Flashcards • Quiz • MindMap • AI Video (greyed when missing)
<VideoBlock />            // if chapter.video
<MindMapBlock />          // if chapter.mindMap
<NotesBlock />            // if chapter.notes (with search + accordion)
<ComingSoon />            // fallback if nothing present
```

Sejarah subtopic flow stays (it's already generic), but driven off `chapter.subtopics`.

### 4. Wire-up

- `flashcards.tsx` and `quizzes.tsx` already look up by subject+chapter — point them at `getChapter().flashcards / .quiz` so the indicator on notes and the actual deck stay in sync.
- ChapterPicker continues to use existing `getSubjectChapters` but the `available` flag is computed from the registry (any feature present → available).

## Out of scope (this pass)

- P1 content audit, P3 fake stats, P4 broad QA — separate passes.
- No data migrations: existing `src/data/*` files stay; the registry imports them.

## Files

- New: `src/content/types.ts`, `src/content/registry.ts`, `src/content/<subject>/*.ts` (thin wrappers)
- New: `src/components/notes/ChapterFeatureBar.tsx`, `VideoBlock.tsx`, `MindMapBlock.tsx`, `NotesBlock.tsx`
- Edit: `src/routes/notes.tsx` (collapse to ~250 lines using registry)
- Edit: `src/routes/flashcards.tsx`, `src/routes/quizzes.tsx` (registry lookup)
- Edit: `src/components/ChapterPicker.tsx` (`available` from registry)

## Verification

- Build passes.
- Visit each currently-working chapter (Sejarah 1–8, Science F1 C2 BM/DLP) and confirm video + mind map + notes still render.
- Confirm feature-bar indicators match what's defined.
- New chapter test: drop a stub file into `src/content/`, add to registry, confirm it appears in the chapter picker and renders without further edits.
