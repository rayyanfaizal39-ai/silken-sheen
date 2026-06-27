/** Future hook into the Challenge Bank database. Phase 1 returns mock data only. */
export interface ChallengeQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
}

export function getChallengeQuestion(): ChallengeQuestion | null {
  return null;
}
