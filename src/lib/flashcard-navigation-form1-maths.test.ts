import { describe, expect, it } from "vitest";
import { isStructuredMathF1Chapter } from "./flashcard-navigation";

describe("Form 1 Maths structured flashcard routing", () => {
  it("recognizes all 13 chapters for language and review-mode URL state", () => {
    for (let chapter = 1; chapter <= 13; chapter++) {
      expect(isStructuredMathF1Chapter("math", "Form 1", "Chapter " + chapter)).toBe(true);
    }
  });
  it("does not enable Form 1 routing for other subjects, forms, or unknown chapters", () => {
    expect(isStructuredMathF1Chapter("math", "Form 2", "Chapter 11")).toBe(false);
    expect(isStructuredMathF1Chapter("science", "Form 1", "Chapter 11")).toBe(false);
    expect(isStructuredMathF1Chapter("math", "Form 1", "Chapter 14")).toBe(false);
    expect(isStructuredMathF1Chapter("math", "Form 1", null)).toBe(false);
  });
});
