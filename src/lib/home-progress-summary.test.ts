import { describe, expect, it } from "vitest";
import type { Progress } from "@/hooks/use-progress";
import {
  getHomeJourneySummary,
  resolveHomeRecommendation,
  type HomeChapterCandidate,
  type HomeLearningCatalog,
  type HomeStudyActivity,
} from "./home-progress-summary";

function progress(overrides: Partial<Progress> = {}): Progress {
  return {
    xp: 0,
    streak: 0,
    lastActive: "",
    quizzesTaken: 0,
    badges: [],
    favorites: [],
    subjectXp: {},
    chapterActivity: {},
    tokens: 0,
    avatar: {
      helmet: "helmet-classic",
      suit: "suit-molly",
      visor: "visor-aqua",
      pet: "pet-none",
      owned: [],
    },
    quizHistory: [],
    ...overrides,
  };
}

function catalog(
  available: Array<HomeChapterCandidate & { activities: HomeStudyActivity[] }>,
): HomeLearningCatalog {
  return {
    hasResource(candidate, activity) {
      return available.some(
        (item) =>
          item.subjectId === candidate.subjectId &&
          item.form === candidate.form &&
          item.chapterKey === candidate.chapterKey &&
          item.activities.includes(activity),
      );
    },
    getLabel(candidate) {
      return available.find(
        (item) =>
          item.subjectId === candidate.subjectId &&
          item.form === candidate.form &&
          item.chapterKey === candidate.chapterKey,
      )?.label;
    },
    findAvailable(subjectId, chapterKey, activity) {
      return (
        available.find(
          (item) =>
            item.subjectId === subjectId &&
            item.chapterKey === chapterKey &&
            item.activities.includes(activity),
        ) ?? null
      );
    },
    firstAvailable(activity) {
      return available.find((item) => item.activities.includes(activity)) ?? null;
    },
  };
}

const scienceChapter = {
  subjectId: "science",
  form: "Form 2" as const,
  chapterKey: "Chapter 10",
  label: "Chapter 10: Sound Waves",
  activities: ["notes", "quiz", "flashcards"] as HomeStudyActivity[],
};

describe("home journey summary", () => {
  it("uses the existing rank and level thresholds at zero XP", () => {
    expect(getHomeJourneySummary(0)).toMatchObject({
      rank: { name: "Space Cadet" },
      nextRank: { name: "Moon Explorer" },
      level: 1,
      xp: 0,
      xpGoal: 1500,
      progressPercentage: 0,
    });
  });

  it("switches ranks exactly at the shared threshold", () => {
    expect(getHomeJourneySummary(1500)).toMatchObject({
      rank: { name: "Moon Explorer" },
      nextRank: { name: "Planet Voyager" },
      progressPercentage: 0,
    });
  });

  it("handles the maximum rank without inventing a next rank", () => {
    expect(getHomeJourneySummary(30_000)).toMatchObject({
      rank: { name: "Cosmic Legend" },
      nextRank: null,
      progressPercentage: 100,
      xpRemaining: 0,
    });
  });
});

describe("home recommendation", () => {
  it("continues the latest incomplete activity on a valid route", () => {
    const recommendation = resolveHomeRecommendation(
      progress({
        lastVisited: {
          subjectId: "science",
          form: "Form 2",
          chapterKey: "Chapter 10",
          type: "quiz",
          label: "Sound Waves",
          timestamp: 10,
        },
      }),
      catalog([scienceChapter]),
    );

    expect(recommendation).toMatchObject({
      activity: "quiz",
      to: "/quizzes",
      search: { subject: "science", form: 2, chapter: "Chapter 10" },
    });
  });

  it("moves to the next incomplete activity after progress changes", () => {
    const base = {
      lastVisited: {
        subjectId: "science",
        form: "Form 2" as const,
        chapterKey: "Chapter 10",
        type: "notes" as const,
        label: "Sound Waves",
        timestamp: 10,
      },
    };
    const first = resolveHomeRecommendation(progress(base), catalog([scienceChapter]));
    const next = resolveHomeRecommendation(
      progress({
        ...base,
        chapterActivity: { "science:Chapter 10": { read: true } },
      }),
      catalog([scienceChapter]),
    );

    expect(first.activity).toBe("notes");
    expect(next.activity).toBe("quiz");
  });

  it("uses a weak-topic claim only when analytics evidence is supplied", () => {
    const recommendation = resolveHomeRecommendation(progress(), catalog([scienceChapter]), [
      { subjectId: "science", chapterKey: "Chapter 10", avgScore: 54 },
    ]);

    expect(recommendation.category).toBe("Focus Area");
    expect(recommendation.reason).toContain("54%");
  });

  it("does not recommend unavailable or locked chapter resources", () => {
    const recommendation = resolveHomeRecommendation(
      progress({
        lastVisited: {
          subjectId: "science",
          form: "Form 2",
          chapterKey: "Chapter 99",
          type: "quiz",
          label: "Unavailable",
          timestamp: 10,
        },
      }),
      catalog([scienceChapter]),
    );

    expect(recommendation.search).toEqual({
      subject: "science",
      form: 2,
      chapter: "Chapter 10",
    });
    expect(recommendation.to).toBe("/notes");
  });

  it("falls back safely when the content registry cannot resolve a chapter", () => {
    const recommendation = resolveHomeRecommendation(progress(), catalog([]));
    expect(recommendation.to).toBe("/notes");
    expect(recommendation.search).toBeUndefined();
  });
});
