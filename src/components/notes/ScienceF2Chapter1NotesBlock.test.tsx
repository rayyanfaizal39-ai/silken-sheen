import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceF2Chapter1NotesBlock } from "./ScienceF2Chapter1NotesBlock";
import { scienceF2C1InteractiveBM } from "@/content/form2/science/chapter-1/interactive-bm";
import { scienceF2C1InteractiveDLP } from "@/content/form2/science/chapter-1/interactive-dlp";

describe("ScienceF2Chapter1NotesBlock — learner-facing curriculum-code leakage", () => {
  it("never renders the internal SP-code eyebrow labels (1.1 / 1.2) to students", () => {
    const bmMarkup = renderToStaticMarkup(
      <ScienceF2Chapter1NotesBlock content={scienceF2C1InteractiveBM} lang="bm" />,
    );
    const dlpMarkup = renderToStaticMarkup(
      <ScienceF2Chapter1NotesBlock content={scienceF2C1InteractiveDLP} lang="en" />,
    );
    for (const markup of [bmMarkup, dlpMarkup]) {
      expect(markup).not.toMatch(/>\s*1\.1\s*</);
      expect(markup).not.toMatch(/>\s*1\.2\s*</);
    }
  });
});
