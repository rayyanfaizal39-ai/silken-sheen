# Content Layout

Learning resources are organized by form, subject, chapter, and resource type.

Current pattern:

```txt
src/content/
  metadata/
    forms.ts
    subjects.ts
    chapters.ts
  form1/
    english/
      chapter-1/
        notes.ts
        mindmap.ts
      flashcards/
      quizzes/
    math/
      chapter-1/
        notes-bm.ts
        notes-dlp.ts
        mindmap-bm.ts
        mindmap-dlp.ts
    science/
      chapter-3/
        notes-bm.ts
        notes-dlp.ts
        quizzes-bm.ts
        quizzes-dlp.ts
        flashcards-bm.ts
        flashcards-dlp.ts
        mindmap-bm.ts
        mindmap-dlp.ts
```

Existing `src/data/*` imports remain as compatibility wrappers so current routes and UI behavior stay unchanged.

