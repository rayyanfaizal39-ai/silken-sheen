import type { ReactNode } from "react";

interface NotesSummaryHeroGateProps {
  subjectId: string;
  chapterKey: string | null;
  children: ReactNode;
}

export function NotesSummaryHeroGate({
  subjectId,
  chapterKey,
  children,
}: NotesSummaryHeroGateProps) {
  const isScienceChapterView = subjectId === "science" && Boolean(chapterKey);

  return isScienceChapterView ? null : children;
}
