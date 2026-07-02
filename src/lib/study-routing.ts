export const subjectSlugToId: Record<string, string> = {
  mathematics: "math",
  math: "math",
  science: "science",
  sains: "science",
  sejarah: "sejarah",
  geografi: "geography",
  geography: "geography",
  "bahasa-melayu": "bm",
  bm: "bm",
  english: "english",
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
  const subject = String(value).toLowerCase();
  return subjectSlugToId[subject] ?? null;
}

export function normalizeFormParam(value: unknown) {
  if (!value) return "Form 1";
  const cleaned = String(value)
    .toLowerCase()
    .replaceAll('"', "")
    .replace(/^form\s*/, "");
  if (cleaned === "1" || cleaned === "2" || cleaned === "3") return `Form ${cleaned}`;
  return "Form 1";
}

export function normalizeChapterParam(value: unknown) {
  if (!value) return null;

  const cleaned = String(value)
    .trim()
    .replaceAll('"', "")
    .replace(/\s+/g, " ");

  const explicitMatch = cleaned.match(/^(?:bab|chapter)\s*(\d+)(?::.*)?$/i);
  if (explicitMatch) return `Chapter ${explicitMatch[1]}`;

  const numberMatch = cleaned.match(/\b(\d+)\b/);
  if (numberMatch) return `Chapter ${numberMatch[1]}`;

  return cleaned;
}

export function studyHref(
  kind: "notes" | "mindmaps" | "quizzes" | "flashcards",
  subjectId: string,
  form?: string,
) {
  const subject = subjectIdToSlug[subjectId] ?? subjectId;
  const formNumber = form?.match(/\d/)?.[0];
  const formParam = formNumber ? `&form=${formNumber}` : "";
  return `/${kind}?subject=${subject}${formParam}`;
}
