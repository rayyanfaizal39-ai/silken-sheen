import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import * as registryModule from "@/content/registry";
import * as dataModule from "@/data/content";
import { FormGrid } from "./ChapterPicker";

// FormGrid loads @/content/registry lazily (client-only dynamic import) to
// keep the multi-MB curriculum registry out of the SSR bundle — see
// src/hooks/use-content-registry.ts. renderToStaticMarkup never runs effects,
// so without this mock the hook would stay null and every card would render
// as unavailable. Substituting a synchronous resolution here lets this test
// keep asserting on real chapter/readiness data through a single render pass.
vi.mock("@/hooks/use-content-registry", () => ({
  useContentRegistry: () => registryModule,
  useContentDataModule: () => dataModule,
}));

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
