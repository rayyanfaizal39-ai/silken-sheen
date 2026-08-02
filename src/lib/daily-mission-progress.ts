export type DailyMissionCounters = {
  dailyDate: string;
  readChapters: number;
  quizzesDone: number;
  flashcardsDone: number;
  flashcardReviews?: number;
};

export function recordDailyFlashcardReview(
  missions: DailyMissionCounters | undefined,
  dateKey: string,
): DailyMissionCounters {
  const current =
    missions?.dailyDate === dateKey
      ? missions
      : {
          dailyDate: dateKey,
          readChapters: 0,
          quizzesDone: 0,
          flashcardsDone: 0,
          flashcardReviews: 0,
        };

  return {
    ...current,
    flashcardReviews: (current.flashcardReviews ?? 0) + 1,
  };
}
