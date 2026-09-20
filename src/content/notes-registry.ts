import { notesChapterMetadata, notesCatalogs, notesFormStats } from "./notes-catalog.generated";
import { notesChapterLoaders } from "./notes-loaders.generated";
import type { ContentRegistryModule } from "@/hooks/use-content-registry";
import type { ChapterContent } from "./types";
import { cleanLearningTitle } from "@/lib/clean-learning-title";
import { organizeSejarahF2Notes } from "@/content/form2/sejarah/notes-structure";

const loaded = new Map<string, ChapterContent>();
const pending = new Map<string, Promise<ChapterContent>>();
export function findNotesChapter(
  subject: string,
  chapter: string,
  lang?: "bm" | "dlp",
  form: ChapterContent["form"] = "Form 1",
) {
  return notesChapterMetadata.find(
    (c) =>
      c.subjectId === subject &&
      c.form === form &&
      c.chapterKey === chapter &&
      (lang ? c.lang === lang : !c.lang),
  );
}
export function isNotesChapterLoaded(id: string) {
  return loaded.has(id);
}
export function loadNotesChapter(id: string): Promise<ChapterContent> {
  if (loaded.has(id)) return Promise.resolve(loaded.get(id)!);
  if (pending.has(id)) return pending.get(id)!;
  const meta = notesChapterMetadata.find((c) => c.id === id);
  const loader = notesChapterLoaders[id];
  if (!meta || !loader) return Promise.reject(new Error("Unknown Notes chapter"));
  const promise = loader()
    .then((payload) => {
      const chapter = { ...meta, ...payload };
      if (chapter.subjectId === "sejarah" && chapter.form === "Form 2" && chapter.notes)
        chapter.notes = organizeSejarahF2Notes(chapter.notes);
      loaded.set(id, chapter);
      return chapter;
    })
    .finally(() => pending.delete(id));
  pending.set(id, promise);
  return promise;
}
const getChaptersForSubject: ContentRegistryModule["getChaptersForSubject"] = (
  subject,
  lang,
  form,
) =>
  notesChapterMetadata.filter(
    (c) =>
      c.subjectId === subject &&
      (!form || form === "All" || c.form === form) &&
      (!lang || !c.lang || c.lang === lang),
  );
export function createNotesRegistry(): ContentRegistryModule {
  const hasResourceContent: ContentRegistryModule["hasResourceContent"] = (
    subject,
    form,
    chapter,
    resource,
    lang,
  ) =>
    getChaptersForSubject(subject, lang, form).some(
      (c) =>
        c.chapterKey === chapter &&
        notesChapterMetadata.find((m) => m.id === c.id)!.resources[resource],
    );
  return {
    chapters: notesChapterMetadata,
    getChapter: (subject, chapter, lang, form = "Form 1") => {
      const meta = findNotesChapter(subject, chapter, lang, form);
      return meta ? (loaded.get(meta.id) ?? meta) : undefined;
    },
    getChaptersForSubject,
    getRegisteredSubjectChapters: (subject, lang, form = "Form 1") =>
      notesCatalogs[`${subject}|${form}|${lang ?? ""}`] ?? [],
    hasResourceContent,
    hasFormResourceContent: (subject, form, resource, lang) =>
      getChaptersForSubject(subject, lang, form).some((c) =>
        hasResourceContent(subject, form, c.chapterKey, resource, lang),
      ),
    getSubjectFormStats: (subject) => notesFormStats[subject] ?? [],
    getFormChapterCount: (subject, form) =>
      notesFormStats[subject]?.find((s) => s.form === form)?.chapterCount ?? 0,
    formatChapterLabel: (key, title, lang) => {
      const n = Number(key.replace("Chapter ", ""));
      return Number.isFinite(n)
        ? `${lang === "bm" ? "Bab" : "Chapter"} ${n}: ${cleanLearningTitle(title)}`
        : title;
    },
    // This provider is scoped to /notes. Quiz banks belong to the quiz route.
    getChapterQuizQuestions: () => {
      throw new Error("Quiz questions must be loaded through the quiz route registry");
    },
  };
}
