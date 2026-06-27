/** Future hook into the Curiosity Bank database. Phase 1 returns mock data only. */
export interface CuriosityFact {
  id: string;
  emoji: string;
  title: string;
  body: string;
}

export function getCuriosityFact(): CuriosityFact | null {
  return null;
}
