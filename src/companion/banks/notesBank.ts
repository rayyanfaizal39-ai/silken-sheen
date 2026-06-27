/** Future hook into the Notes Bank database. Phase 1 returns mock data only. */
export interface NoteSummary {
  id: string;
  subject: string;
  chapter: string;
}

export function getNoteSummary(_subjectId: string): NoteSummary | null {
  return null;
}
