export const subjectSlugToId: Record<string, string> = {
  mathematics: "math",
  math: "math",
  science: "science",
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

export function normalizeSubjectParam(value: string | null | undefined) {
  if (!value) return null;
  return subjectSlugToId[value.toLowerCase()] ?? null;
}

export function normalizeFormParam(value: string | null | undefined) {
  if (!value) return "All";
  const cleaned = value.toLowerCase().replace(/^form\s*/, "");
  if (cleaned === "1" || cleaned === "2" || cleaned === "3") return `Form ${cleaned}`;
  return "All";
}

export function studyHref(kind: "notes" | "quizzes" | "flashcards", subjectId: string, form?: string) {
  const subject = subjectIdToSlug[subjectId] ?? subjectId;
  const formParam = form ? `&form=${form}` : "";
  return `/${kind}?subject=${subject}${formParam}`;
}
