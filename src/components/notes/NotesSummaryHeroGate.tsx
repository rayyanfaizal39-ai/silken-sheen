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
  const hasDedicatedChapterHero =
    (subjectId === "science" || subjectId === "sejarah") && Boolean(chapterKey);

  return hasDedicatedChapterHero ? null : children;
}
