import { describe, expect, it } from "vitest";
import { mathF1C8InteractiveContent } from "./chapter-8/interactive-content";
import { mathF1C9InteractiveContent } from "./chapter-9/interactive-content";
import { mathF1C10InteractiveContent } from "./chapter-10/interactive-content";
import { mathF1C12InteractiveContent } from "./chapter-12/interactive-content";

describe("Form 1 Mathematics bilingual interactive challenge repairs", () => {
  it("C8 provides all three adjacent angle measurements without an unseen figure", () => {
    for (const lang of ["en", "bm"] as const) {
      const { question, answer } = mathF1C8InteractiveContent[lang].challenge;
      expect(question).toContain("5y");
      expect(question).toContain("2y");
      expect(question).not.toMatch(/as shown|seperti dalam rajah|marked at O/i);
      for (const n of ["180", "15", "75", "30"]) expect(answer).toContain(n);
    }
    expect(5 * 15 + 2 * 15 + 5 * 15).toBe(180);
  });

  it("C9 gives a fully specified parallelogram and the computed four angles", () => {
    for (const lang of ["en", "bm"] as const) {
      const { question, answer } = mathF1C9InteractiveContent[lang].challenge;
      for (const term of ["(3x + 2)", "(5x − 14)", "∠A", "∠B"]) {
        expect(question).toContain(term);
      }
      for (const n of ["24", "74°", "106°"]) expect(answer).toContain(n);
    }
    expect(3 * 24 + 2 + 5 * 24 - 14).toBe(180);
  });

  it("C10 has both complete diagonals and a numerical kite area", () => {
    for (const lang of ["en", "bm"] as const) {
      const { question, answer } = mathF1C10InteractiveContent[lang].challenge;
      for (const length of ["28", "12", "18"]) expect(question).toContain(length);
      for (const term of ["30", "420", "cm²"]) expect(answer).toContain(term);
    }
    expect((28 * (12 + 18)) / 2).toBe(420);
  });

  it("C12 acknowledges both fully labelled plot types preserve exact values", () => {
    for (const lang of ["en", "bm"] as const) {
      const challenge = mathF1C12InteractiveContent[lang].challenge;
      expect(challenge.question).toContain("24");
      expect(challenge.answer).toMatch(/ALSO|JUGA/);
      expect(challenge.answer).not.toMatch(/not exact recoverable|bukan nilai tepat boleh dipulihkan/i);
      expect(challenge.widget.kind).toBe("representationCompare");
      if (challenge.widget.kind !== "representationCompare") {
        throw new Error("Expected data-representation comparison");
      }
      expect(challenge.widget.positionOnlyLabel).toBeTruthy();
      expect(challenge.widget.exactValuesLabel).toBeTruthy();
    }
  });
});
