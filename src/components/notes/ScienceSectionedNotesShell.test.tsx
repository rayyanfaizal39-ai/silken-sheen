import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ScienceSectionedNotesShell, type ScienceNotesSection } from "./ScienceSectionedNotesShell";

const sections: ScienceNotesSection[] = [
  {
    key: "first",
    eyebrow: "2.1",
    label: "First topic",
    title: "First section",
    description: "First description",
    content: <p>First body</p>,
  },
  {
    key: "second",
    eyebrow: "2.2",
    label: "Second topic",
    title: "Second section",
    content: <p>Second body</p>,
  },
];

describe("ScienceSectionedNotesShell", () => {
  it("matches the Form 1 first-section navigation state", () => {
    const markup = renderToStaticMarkup(
      <ScienceSectionedNotesShell lang="en" intro={<p>Chapter intro</p>} sections={sections} />,
    );

    expect(markup).toContain("Chapter intro");
    expect(markup).toContain("First body");
    expect(markup).not.toContain("Second body");
    expect(markup).toContain('aria-current="step"');
    expect(markup).toMatch(/<button[^>]*disabled=""[^>]*>.*Back/s);
    expect(markup).toContain("Next section");
    expect(markup).toContain("overflow-x-auto");
  });

  it("uses Form 1 BM controls and hides Next on the final section", () => {
    const markup = renderToStaticMarkup(
      <ScienceSectionedNotesShell lang="bm" intro={<p>Pengenalan</p>} sections={[sections[0]]} />,
    );

    expect(markup).toContain("Kembali");
    expect(markup).not.toContain("Seksyen seterusnya");
    expect(markup).toContain("Objektif: First section");
  });
});
