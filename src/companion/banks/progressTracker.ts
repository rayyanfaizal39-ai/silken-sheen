/** Future hook into the Progress Tracker database. Phase 1 returns mock data only. */
export interface MissionStatus {
  subject: string;
  form: string;
  chapter: string;
  notesDone: boolean;
  quizDone: boolean;
  flashcardsDone: boolean;
}

export function getMissionStatus(): MissionStatus | null {
  return null;
}
