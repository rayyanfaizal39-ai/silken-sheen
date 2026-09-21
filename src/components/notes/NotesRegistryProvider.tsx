import { useEffect, useState, type ReactNode } from "react";
import { ContentRegistryContext } from "@/hooks/use-content-registry";
import { NotesChapterLoadingContext } from "@/hooks/use-notes-chapter-loading";
import {
  createNotesRegistry,
  findNotesChapter,
  isNotesChapterLoaded,
  loadNotesChapter,
} from "@/content/notes-registry";
import type { Form } from "@/data/subjects-meta";
export function NotesRegistryProvider({
  subject,
  chapter,
  form,
  lang,
  children,
}: {
  subject: string | null;
  chapter: string | null;
  form: Form;
  lang?: "bm" | "dlp";
  children: ReactNode;
}) {
  const selected = subject && chapter ? findNotesChapter(subject, chapter, lang, form) : undefined;
  const id = selected?.id;
  const [revision, setRevision] = useState(0);
  const [registry, setRegistry] = useState(createNotesRegistry);
  const [errorId, setErrorId] = useState<string>();
  useEffect(() => {
    if (!id || isNotesChapterLoaded(id)) return;
    let cancelled = false;
    loadNotesChapter(id).then(
      () => {
        if (!cancelled) setRegistry(createNotesRegistry());
      },
      () => {
        if (!cancelled) setErrorId(id);
      },
    );
    return () => {
      cancelled = true;
    };
  }, [id, revision]);
  const status = {
    loading: !!id && !isNotesChapterLoaded(id),
    error: !!id && errorId === id,
    retry: () => {
      setErrorId(undefined);
      setRevision((v) => v + 1);
    },
  };
  return (
    <ContentRegistryContext.Provider value={registry}>
      <NotesChapterLoadingContext.Provider value={status}>
        {children}
      </NotesChapterLoadingContext.Provider>
    </ContentRegistryContext.Provider>
  );
}
export function NotesChapterLoading() {
  return (
    <div
      data-notes-loading
      role="status"
      className="py-8 text-center text-sm text-muted-foreground"
    >
      Loading chapter notes…
    </div>
  );
}
