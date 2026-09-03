import { describe, expect, it } from "vitest";
import { mathF1C1InteractiveContent } from "./interactive-content";
import { mathF1C1NotesBM } from "./notes-bm";
import { mathF1C1NotesDLP } from "./notes-dlp";

const expectedSubtopics = ["1.1", "1.2", "1.3", "1.4", "1.5", "1.6"];
const brokenEncoding = /Ã|â|Â|ðŸ/;

describe("Mathematics Form 1 Chapter 1 bilingual notes", () => {
  it("covers the same six subtopics in Malay and DLP", () => {
    expect(mathF1C1InteractiveContent.bm.subtopics.map(({ num }) => num)).toEqual(
      expectedSubtopics,
    );
    expect(mathF1C1InteractiveContent.en.subtopics.map(({ num }) => num)).toEqual(
      expectedSubtopics,
    );
  });

  it("includes the supplied rational-number concepts and applications", () => {
    const bm = JSON.stringify(mathF1C1InteractiveContent.bm);
    const en = JSON.stringify(mathF1C1InteractiveContent.en);

    for (const content of [bm, en]) {
      expect(content).toContain("p/q");
      expect(content).toContain("−0.6");
      expect(content).toContain("−11°C");
      expect(content).toContain("20");
    }
  });

  it("keeps the structured BM and DLP notes aligned with the interactive notes", () => {
    const bm = JSON.stringify(mathF1C1NotesBM);
    const dlp = JSON.stringify(mathF1C1NotesDLP);

    expect(bm).toContain("1.6");
    expect(dlp).toContain("1.6");
    expect(bm).toContain("−11°C");
    expect(dlp).toContain("−11°C");
    expect(bm).toContain("20 markah");
    expect(dlp).toContain("20 marks");
  });

  it("contains no mojibake in learner-facing chapter content", () => {
    expect(JSON.stringify(mathF1C1InteractiveContent)).not.toMatch(brokenEncoding);
    expect(JSON.stringify(mathF1C1NotesBM)).not.toMatch(brokenEncoding);
    expect(JSON.stringify(mathF1C1NotesDLP)).not.toMatch(brokenEncoding);
  });
});
