import { describe, expect, it } from "vitest";
import { sanitizeRemovedGeographyF3Progress } from "./removed-content-progress";

describe("removed Geography Form 3 content progress", () => {
  it("removes only unambiguous retired chapter references", () => {
    const progress = sanitizeRemovedGeographyF3Progress({
      favorites: ["geo-f3-c12-f4", "geo-f1-c12-f4", "geo-f3-c11-f4"],
      cardMastery: {
        "geo-f3-c12-f9": { reps: 2 },
        "geo-f1-c12-f9": { reps: 3 },
      },
      lastVisited: {
        subjectId: "geography",
        form: "Form 3",
        chapterKey: "Chapter 12",
      },
      recentActivity: [
        { subjectId: "geography", form: "Form 3", chapterKey: "Chapter 12" },
        { subjectId: "geography", form: "Form 1", chapterKey: "Chapter 12" },
      ],
    });

    expect(progress.favorites).toEqual(["geo-f1-c12-f4", "geo-f3-c11-f4"]);
    expect(progress.cardMastery).toEqual({ "geo-f1-c12-f9": { reps: 3 } });
    expect(progress.lastVisited).toBeUndefined();
    expect(progress.recentActivity).toEqual([
      { subjectId: "geography", form: "Form 1", chapterKey: "Chapter 12" },
    ]);
  });
});
