// Subject display names + keyword sets for dynamic per-subject metadata on
// /notes, /quizzes, /flashcards and /mindmaps (these pages take a `subject`
// search param rather than having their own URL per subject).
export const SUBJECT_SEO: Record<string, { name: string; keywords: string[] }> = {
  science: { name: "Science", keywords: ["Science Form 1", "Science Form 2", "Science Form 3", "KSSM Science"] },
  math: { name: "Mathematics", keywords: ["Math Form 1", "Math Form 2", "Math Form 3", "KSSM Mathematics"] },
  english: { name: "English", keywords: ["English Form 1", "English Form 2", "English Form 3", "KSSM English"] },
  geography: { name: "Geografi", keywords: ["Geografi Form 1", "Geografi Form 2", "Geografi Form 3", "KSSM Geografi"] },
  sejarah: { name: "Sejarah", keywords: ["Sejarah Form 1", "Sejarah Form 2", "Sejarah Form 3", "KSSM Sejarah"] },
  bm: { name: "Bahasa Melayu", keywords: ["Bahasa Melayu Form 1", "Bahasa Melayu Form 2", "Bahasa Melayu Form 3", "KSSM Bahasa Melayu"] },
};

export function subjectSeoName(subjectId: string | undefined): string | null {
  if (!subjectId) return null;
  return SUBJECT_SEO[subjectId]?.name ?? null;
}

export function subjectSeoKeywords(subjectId: string | undefined): string[] {
  if (!subjectId) return [];
  return SUBJECT_SEO[subjectId]?.keywords ?? [];
}
