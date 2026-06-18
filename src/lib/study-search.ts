import {
  flashcards,
  forms,
  getItemChapterKey,
  getSubjectChapters,
  notes,
  quizzes,
  subjects,
  type Form,
} from "@/data/content";
import { getChaptersForSubject } from "@/content/registry";

export type StudyResourceType =
  | "Subject"
  | "Form"
  | "Chapter"
  | "Subtopic"
  | "Notes"
  | "Quiz"
  | "Flashcards"
  | "Mindmap"
  | "Video";

export interface StudySearchResult {
  id: string;
  type: StudyResourceType;
  subjectId: string;
  subject: string;
  form: Form;
  chapterKey?: string;
  chapter?: string;
  title: string;
  preview?: string;
  href: string;
  searchText: string;
}

const MAX_FIELD_LENGTH = 420;

const SUBJECT_ALIASES: Record<string, string[]> = {
  bm: ["bm", "bahasa", "malay", "karangan", "komsas", "peribahasa"],
  english: ["english", "grammar", "writing", "reading"],
  math: ["math", "mathematics", "matematik", "algebra", "geometry"],
  science: ["science", "sains", "fotosintesis", "photosynthesis", "experiment"],
  sejarah: ["sejarah", "history", "tamadun", "warisan"],
  geography: ["geography", "geografi", "peta", "arah", "bumi"],
};

const TYPE_ROUTE: Record<StudyResourceType, "/notes" | "/quizzes" | "/flashcards" | "/subjects"> = {
  Subject: "/subjects",
  Form: "/subjects",
  Chapter: "/notes",
  Subtopic: "/notes",
  Notes: "/notes",
  Quiz: "/quizzes",
  Flashcards: "/flashcards",
  Mindmap: "/notes",
  Video: "/notes",
};

export const STUDY_SEARCH_SUGGESTIONS = ["Algebra", "Fotosintesis", "KOMSAS", "Karangan", "Peta"];

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{Letter}\p{Number}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanText(value: unknown): string {
  if (value == null) return "";
  return String(value)
    .replaceAll("\u00E2\u20AC\u201D", "—")
    .replaceAll("\u00E2\u20AC\u201C", "–")
    .replaceAll("\u00E2\u20AC\u02DC", "'")
    .replaceAll("\u00E2\u20AC\u2122", "'")
    .replaceAll("\u00E2\u20AC\u0153", '"')
    .replace(/\u00E2\u20AC[\u009D\u201D]/g, '"')
    .replaceAll("\u00C2\u00B7", "•")
    .replaceAll("\u00C2", "")
    .replace(/[\u00F0\uFFFD][^\s]*/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function preview(value: unknown, max = 145) {
  const text = cleanText(value);
  if (text.length <= max) return text;
  return `${text.slice(0, max).trim()}...`;
}

function compactFields(fields: unknown[]) {
  return fields
    .flatMap((field) => {
      if (Array.isArray(field)) return field;
      return [field];
    })
    .map((field) => cleanText(field).slice(0, MAX_FIELD_LENGTH))
    .filter(Boolean)
    .join(" ");
}

function subjectName(subjectId: string) {
  return subjects.find((subject) => subject.id === subjectId)?.name ?? subjectId;
}

function hrefFor(type: StudyResourceType, subjectId: string, form: Form, chapterKey?: string) {
  if (type === "Subject") return `${TYPE_ROUTE[type]}?subject=${encodeURIComponent(subjectId)}`;
  if (type === "Form")
    return `${TYPE_ROUTE[type]}?form=${encodeURIComponent(form.replace("Form ", ""))}`;
  const params = new URLSearchParams();
  params.set("subject", subjectId);
  params.set("form", form.replace("Form ", ""));
  if (chapterKey) params.set("chapter", chapterKey);
  return `${TYPE_ROUTE[type]}?${params.toString()}`;
}

function makeResult(input: Omit<StudySearchResult, "searchText" | "href">): StudySearchResult {
  const href = hrefFor(input.type, input.subjectId, input.form, input.chapterKey);
  const searchText = normalize(
    compactFields([
      input.type,
      input.subject,
      input.subjectId,
      SUBJECT_ALIASES[input.subjectId],
      input.form,
      input.chapterKey,
      input.chapter,
      input.title,
      input.preview,
    ]),
  );

  return { ...input, href, searchText };
}

function addUnique(results: StudySearchResult[], seen: Set<string>, result: StudySearchResult) {
  if (seen.has(result.id)) return;
  seen.add(result.id);
  results.push(result);
}

export function buildStudySearchIndex(): StudySearchResult[] {
  const results: StudySearchResult[] = [];
  const seen = new Set<string>();

  for (const subject of subjects) {
    addUnique(
      results,
      seen,
      makeResult({
        id: `subject:${subject.id}`,
        type: "Subject",
        subjectId: subject.id,
        subject: subject.name,
        form: "Form 1",
        title: subject.name,
        preview: subject.description,
      }),
    );

    for (const form of ["Form 1", "Form 2"] as const) {
      const chapterRows = new Map<string, string>();
      for (const lang of [undefined, "bm", "dlp"] as const) {
        for (const chapter of getSubjectChapters(subject.id, lang, form)) {
          chapterRows.set(chapter.key, chapter.label);
        }
      }

      if (form === "Form 1") {
        for (const chapter of getChaptersForSubject(subject.id)) {
          chapterRows.set(chapter.chapterKey, chapter.title);
        }
      }

      for (const [chapterKey, chapterLabel] of chapterRows) {
        addUnique(
          results,
          seen,
          makeResult({
            id: `chapter:${subject.id}:${form}:${chapterKey}`,
            type: "Chapter",
            subjectId: subject.id,
            subject: subject.name,
            form,
            chapterKey,
            chapter: chapterLabel,
            title: chapterLabel,
            preview: `Open ${subject.name} ${chapterLabel}.`,
          }),
        );
      }
    }
  }

  for (const chapter of getChaptersForSubject("sejarah")
    .concat(getChaptersForSubject("geography"))
    .concat(getChaptersForSubject("english"))
    .concat(getChaptersForSubject("math"))
    .concat(getChaptersForSubject("science"))
    .concat(getChaptersForSubject("bm"))) {
    const subject = subjectName(chapter.subjectId);
    for (const subtopic of chapter.subtopics ?? []) {
      addUnique(
        results,
        seen,
        makeResult({
          id: `subtopic:${chapter.id}:${subtopic.key}`,
          type: "Subtopic",
          subjectId: chapter.subjectId,
          subject,
          form: chapter.form,
          chapterKey: chapter.chapterKey,
          chapter: chapter.title,
          title: subtopic.title,
          preview: preview([subtopic.summary, subtopic.keywords?.join(" ")].join(" ")),
        }),
      );
    }

    if (chapter.mindMap) {
      addUnique(
        results,
        seen,
        makeResult({
          id: `mindmap:${chapter.id}`,
          type: "Mindmap",
          subjectId: chapter.subjectId,
          subject,
          form: chapter.form,
          chapterKey: chapter.chapterKey,
          chapter: chapter.title,
          title: chapter.mindMap.title,
          preview: `Interactive mind map for ${chapter.title}.`,
        }),
      );
    }

    if (chapter.video) {
      addUnique(
        results,
        seen,
        makeResult({
          id: `video:${chapter.id}`,
          type: "Video",
          subjectId: chapter.subjectId,
          subject,
          form: chapter.form,
          chapterKey: chapter.chapterKey,
          chapter: chapter.title,
          title: chapter.video.title,
          preview: preview(chapter.video.hint ?? `AI video for ${chapter.title}.`),
        }),
      );
    }
  }

  for (const note of notes) {
    const chapterKey = getItemChapterKey(note) ?? note.chapter;
    addUnique(
      results,
      seen,
      makeResult({
        id: `note:${note.id}`,
        type: "Notes",
        subjectId: note.subjectId,
        subject: subjectName(note.subjectId),
        form: note.form,
        chapterKey,
        chapter: note.chapter,
        title: note.title,
        preview: preview([note.summary, note.keywords.join(" ")].join(" ")),
      }),
    );
  }

  for (const quiz of quizzes) {
    const chapterKey = getItemChapterKey(quiz) ?? quiz.chapter;
    addUnique(
      results,
      seen,
      makeResult({
        id: `quiz:${quiz.id}`,
        type: "Quiz",
        subjectId: quiz.subjectId,
        subject: subjectName(quiz.subjectId),
        form: quiz.form,
        chapterKey,
        chapter: chapterKey,
        title: `${quiz.difficulty} Quiz`,
        preview: preview([quiz.question, quiz.explanation].join(" ")),
      }),
    );
  }

  for (const card of flashcards) {
    const chapterKey = getItemChapterKey(card) ?? card.chapter;
    addUnique(
      results,
      seen,
      makeResult({
        id: `flashcard:${card.id}`,
        type: "Flashcards",
        subjectId: card.subjectId,
        subject: subjectName(card.subjectId),
        form: card.form,
        chapterKey,
        chapter: chapterKey,
        title: "Flashcard",
        preview: preview([card.front, card.back].join(" ")),
      }),
    );
  }

  for (const form of forms) {
    addUnique(
      results,
      seen,
      makeResult({
        id: `form:${form}`,
        type: "Form",
        subjectId: "all",
        subject: "All Subjects",
        form,
        title: form,
        preview: `Browse learning resources for ${form}.`,
      }),
    );
  }

  return results;
}

function scoreResult(result: StudySearchResult, query: string, terms: string[]) {
  const title = normalize(result.title);
  const subject = normalize(result.subject);
  const chapter = normalize(result.chapter ?? "");
  let score = 0;

  if (title === query) score += 80;
  if (title.includes(query)) score += 40;
  if (subject.includes(query)) score += 28;
  if (chapter.includes(query)) score += 22;
  if (result.searchText.includes(query)) score += 14;

  for (const term of terms) {
    if (title.includes(term)) score += 12;
    if (subject.includes(term)) score += 8;
    if (chapter.includes(term)) score += 7;
    if (result.searchText.includes(term)) score += 3;
  }

  if (result.type === "Subject") score += 5;
  if (result.type === "Chapter") score += 4;
  return score;
}

export function searchStudyIndex(
  index: StudySearchResult[],
  rawQuery: string,
  limit = 12,
): StudySearchResult[] {
  const query = normalize(rawQuery);
  if (!query) return [];
  const terms = query.split(" ").filter((term) => term.length > 1);

  return index
    .map((result) => ({ result, score: scoreResult(result, query, terms) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.result.title.localeCompare(b.result.title))
    .slice(0, limit)
    .map((item) => item.result);
}

export function highlightParts(
  text: string,
  rawQuery: string,
): Array<{ text: string; match: boolean }> {
  const cleaned = cleanText(text);
  const term = cleanText(rawQuery).trim();
  if (!term) return [{ text: cleaned, match: false }];

  const index = cleaned.toLowerCase().indexOf(term.toLowerCase());
  if (index === -1) return [{ text: cleaned, match: false }];

  return [
    { text: cleaned.slice(0, index), match: false },
    { text: cleaned.slice(index, index + term.length), match: true },
    { text: cleaned.slice(index + term.length), match: false },
  ].filter((part) => part.text);
}
