import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { NotesSummaryHeroGate } from "./NotesSummaryHeroGate";

function renderView(subjectId: string, chapterKey: string | null) {
  return renderToStaticMarkup(
    <>
      <NotesSummaryHeroGate subjectId={subjectId} chapterKey={chapterKey}>
        <section>Summary Notes</section>
      </NotesSummaryHeroGate>
      {chapterKey && <h1>Chapter 1: Introduction to Scientific Investigation</h1>}
      <div>Reading Progress</div>
    </>,
  );
}

describe("NotesSummaryHeroGate", () => {
  it("keeps the generic hero on the Science overview", () => {
    expect(renderView("science", null)).toContain("Summary Notes");
  });

  it.each(["Chapter 1", "Bab 1"])(
    "removes the generic hero from a Science chapter selected as %s",
    (chapterKey) => {
      const markup = renderView("science", chapterKey);

      expect(markup).not.toContain("Summary Notes");
      expect(markup).toContain("Chapter 1: Introduction to Scientific Investigation");
      expect(markup).toContain("Reading Progress");
    },
  );

  it("keeps the existing generic hero for a non-Science chapter", () => {
    expect(renderView("sejarah", "Bab 1")).toContain("Summary Notes");
  });
});
