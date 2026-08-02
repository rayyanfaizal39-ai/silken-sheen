import { describe, expect, it } from "vitest";
import { recordDailyFlashcardReview } from "@/lib/daily-mission-progress";

describe("daily flashcard review tracking", () => {
  it("counts each valid rating in the existing daily mission record", () => {
    let missions = recordDailyFlashcardReview(undefined, "2026-08-02");
    for (let review = 1; review < 5; review += 1) {
      missions = recordDailyFlashcardReview(missions, "2026-08-02");
    }
    expect(missions).toMatchObject({ dailyDate: "2026-08-02", flashcardReviews: 5 });
  });

  it("resets the counter on a new local calendar day", () => {
    const missions = recordDailyFlashcardReview(
      {
        dailyDate: "2026-08-01",
        readChapters: 1,
        quizzesDone: 1,
        flashcardsDone: 1,
        flashcardReviews: 5,
      },
      "2026-08-02",
    );
    expect(missions).toEqual({
      dailyDate: "2026-08-02",
      readChapters: 0,
      quizzesDone: 0,
      flashcardsDone: 0,
      flashcardReviews: 1,
    });
  });
});
