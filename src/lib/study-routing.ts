export const subjectSlugToId: Record<string, string> = {
  mathematics: "math",
  matematik: "math",
  math: "math",
  maths: "math",
  science: "science",
  sains: "science",
  history: "sejarah",
  sejarah: "sejarah",
  geografi: "geography",
  geography: "geography",
  "bahasa-melayu": "bm",
  bahasa_melayu: "bm",
  bm: "bm",
  english: "english",
  bahasa_inggeris: "english",
};

export const subjectIdToSlug: Record<string, string> = {
  math: "mathematics",
  science: "science",
  sejarah: "sejarah",
  geography: "geografi",
  bm: "bahasa-melayu",
  english: "english",
};

export function normalizeSubjectParam(value: unknown) {
  if (!value) return null;
  const subject = String(value).trim().toLowerCase();
  return subjectSlugToId[subject] ?? null;
}

 export type StudyForm = "Form 1" | "Form 2" | "Form 3";

/**
 * Recognises 1 / 2 / 3, "Form 1" / "Form 2" / "Form 3" and "form1" / "form2" /
 * "form3". Anything else — including a missing value — is unknown and returns
 * null. Never guess Form 1: an unknown Form must send the student to the Form
 * chooser instead of silently loading Form 1 content.
 */
export function normalizeFormParam(value: unknown): StudyForm | null {
  if (value == null) return null;
  const cleaned = String(value)
    .trim()
    .toLowerCase()
    .replaceAll('"', "")
    .trim()
    .replace(/^(?:form[\s-]*|f)/, "");
  if (cleaned === "1" || cleaned === "2" || cleaned === "3") return `Form ${cleaned}`;
  return null;
}

/**
 * Search params that resume a learning entry (a history record, a "Continue
 * Learning" item). The chapter only travels with a known form: "Chapter 3"
 * is a different chapter in every form, so without the form the student
 * lands on the subject's Form chooser rather than in a guessed Form 1.
 */
export function buildResumeSearch(
  entry: { subjectId: string; chapterKey?: string | null; form?: unknown },
  { withChapter = true }: { withChapter?: boolean } = {},
): { subject: string; form?: number; chapter?: string } {
  const form = parseKnownForm(entry.form);
  if (!form) return { subject: entry.subjectId };
  return {
    subject: entry.subjectId,
    form: Number(form.slice(-1)),
    ...(withChapter && entry.chapterKey ? { chapter: entry.chapterKey } : {}),
  };
}

export function normalizeChapterParam(value: unknown) {
  if (!value) return null;

  const cleaned = String(value).trim().replaceAll('"', "").replace(/\s+/g, " ");

  const explicitMatch = cleaned.match(/^(?:bab|chapter)\s*(\d+)(?::.*)?$/i);
  if (explicitMatch) return `Chapter ${explicitMatch[1]}`;

  const numberMatch = cleaned.match(/\b(\d+)\b/);
  if (numberMatch) return `Chapter ${numberMatch[1]}`;

  return cleaned;
}

export function normalizeFlashcardSetParam(value: unknown): 0 | 1 | 2 | null {
  const setNumber = Number(value);
  return Number.isInteger(setNumber) && setNumber >= 1 && setNumber <= 3
    ? ((setNumber - 1) as 0 | 1 | 2)
    : null;
}

export function studyHref(
  kind: "notes" | "mindmaps" | "quizzes" | "flashcards",
  subjectId: string,
  form?: string,
) {
  const subject = subjectIdToSlug[subjectId] ?? subjectId;
  const formNumber = formSearchValue(form);
  const formParam = formNumber ? `&form=${formNumber}` : "";
  return `/${kind}?subject=${subject}${formParam}`;
}

export type StudyRouteMode = "notes" | "mindmaps" | "quizzes" | "flashcards";

export function getStudyRouteMode(pathname: string): StudyRouteMode | null {
  const mode = pathname.split("/").filter(Boolean)[0];
  return mode === "notes" || mode === "mindmaps" || mode === "quizzes" || mode === "flashcards"
    ? mode
    : null;
}

export function isRouteActive(pathname: string, target: string) {
  if (target === "/") return pathname === "/";
  return pathname === target || pathname.startsWith(`${target}/`);
}
