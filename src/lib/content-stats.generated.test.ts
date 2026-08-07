import { describe, expect, it } from "vitest";
import { subjects } from "@/data/subjects-meta";
import { CONTENT_STATS, SUBJECT_FORM_SUMMARY } from "@/lib/content-stats.generated";

describe("SUBJECT_FORM_SUMMARY", () => {
  it("has an entry for every known subject", () => {
    for (const subject of subjects) {
      expect(SUBJECT_FORM_SUMMARY[subject.id]).toBeDefined();
    }
  });

  it("always lists exactly Form 1, Form 2 and Form 3 in a stable order", () => {
    for (const subject of subjects) {
      const forms = SUBJECT_FORM_SUMMARY[subject.id].map((s) => s.form);
      expect(forms).toEqual(["Form 1", "Form 2", "Form 3"]);
    }
  });

  it("reports a non-zero chapter count for at least one form of every subject with content", () => {
    for (const subject of subjects) {
      const totalChapters = SUBJECT_FORM_SUMMARY[subject.id].reduce(
        (sum, s) => sum + s.chapterCount,
        0,
      );
      expect(totalChapters).toBeGreaterThan(0);
    }
  });

  it("chapter counts are non-negative integers", () => {
    for (const subject of subjects) {
      for (const stat of SUBJECT_FORM_SUMMARY[subject.id]) {
        expect(Number.isInteger(stat.chapterCount)).toBe(true);
        expect(stat.chapterCount).toBeGreaterThanOrEqual(0);
      }
    }
  });
});

describe("CONTENT_STATS", () => {
  it("has a positive chapter/subject count", () => {
    expect(CONTENT_STATS.totalSubjects).toBeGreaterThan(0);
    expect(CONTENT_STATS.totalChapters).toBeGreaterThan(0);
  });
});
