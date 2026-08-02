import { describe, expect, it } from "vitest";
import { QUICK_ACCESS_ITEMS } from "./quick-access-data";

const expectedItems = [
  ["notes", "Notes", "Continue reading", "/notes", "#38bdf8"],
  ["quizzes", "Quizzes", "Test yourself", "/quizzes", "#a78bfa"],
  ["mind-maps", "Mind Maps", "Review visually", "/mindmaps", "#f59e0b"],
  ["videos", "Videos", "Watch lessons", "/subjects", "#f43f5e"],
  ["flashcards", "Flashcards", "Practise memory", "/flashcards", "#34d399"],
  ["ace", "Ace", "Ask your AI teacher", undefined, "#c084fc"],
] as const;

describe("Quick Access data", () => {
  it("defines the six recognisable learning tools once", () => {
    expect(QUICK_ACCESS_ITEMS).toHaveLength(6);
    expect(new Set(QUICK_ACCESS_ITEMS.map((item) => item.id)).size).toBe(6);
  });

  it.each(expectedItems)(
    "keeps %s content, destination, and accent stable",
    (id, label, actionLabel, to, accent) => {
      const item = QUICK_ACCESS_ITEMS.find((candidate) => candidate.id === id);

      expect(item).toMatchObject({ label, actionLabel, accent });
      expect(item?.action === "route" ? item.to : undefined).toBe(to);
    },
  );

  it("keeps Ace as the existing panel action instead of inventing a route", () => {
    expect(QUICK_ACCESS_ITEMS.find((item) => item.id === "ace")).toMatchObject({
      action: "ace",
    });
  });
});
