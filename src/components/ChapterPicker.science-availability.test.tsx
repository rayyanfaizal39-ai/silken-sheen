import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { FormGrid } from "./ChapterPicker";

// Reproduce the original first render, before the client-only registry loads.
vi.mock("@/hooks/use-content-registry", () => ({
  useContentRegistry: () => null,
  useContentDataModule: () => null,
}));

const noop = () => undefined;

describe("Science notes form availability before registry hydration", () => {
  it("renders Forms 1, 2 and 3 as learner-facing links", () => {
    const markup = renderToStaticMarkup(
      <FormGrid subjectId="science" mode="notes" onSelect={noop} onBack={noop} />,
    );

    expect(markup.match(/>Ready</g)).toHaveLength(3);
    expect(markup).toContain('aria-label="Open Form 1 notes"');
    expect(markup).toContain('aria-label="Open Form 2 notes"');
    expect(markup).toContain('aria-label="Open Form 3 notes"');
    expect(markup).not.toContain("Coming Soon");
    expect(markup).not.toContain("Content is currently being prepared.");
    expect(markup).not.toContain("disabled");
  });
});
