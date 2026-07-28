import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { FormGrid } from "./ChapterPicker";

const noop = () => undefined;

describe("FormGrid Bahasa Melayu mind-map cards", () => {
  it("renders only the icon, Ready badge and unchanged title on each Form card", () => {
    const markup = renderToStaticMarkup(
      <FormGrid subjectId="bm" mode="mindmaps" onSelect={noop} onBack={noop} />,
    );

    expect(markup.match(/>Ready</g)).toHaveLength(3);
    expect(markup.match(/<h3[^>]*>Form [123]<\/h3>/g)).toHaveLength(3);
    expect(markup.match(/<svg[^>]*class="[^"]*lucide-book-open/g)).toHaveLength(3);
    expect(markup).not.toContain("Chapters");
    expect(markup).not.toContain("Complete");
    expect(markup).not.toMatch(/>[^<]*\d+%[^<]*</);
    expect(markup).not.toContain('class="mt-2 text-sm leading-relaxed text-white/55"');
  });

  it("preserves the existing progress text on other subject Form cards", () => {
    const markup = renderToStaticMarkup(
      <FormGrid subjectId="science" mode="mindmaps" onSelect={noop} onBack={noop} />,
    );

    expect(markup).toContain("Complete");
    expect(markup).toContain('class="mt-2 text-sm leading-relaxed text-white/55"');
  });
});
