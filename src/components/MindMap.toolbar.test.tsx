import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MindMap, type MindNode } from "./MindMap";

const mindMap: MindNode = {
  id: "main",
  label: "Main topic",
  children: [
    {
      id: "first",
      label: "First node",
    },
  ],
};

describe("MindMap toolbar layout", () => {
  it("keeps navigation and view controls in one wrapping normal-flow toolbar", () => {
    const markup = renderToStaticMarkup(<MindMap data={mindMap} height={700} />);
    const toolbar = markup.match(
      /<div class="([^"]*)" role="toolbar" aria-label="Mind map navigation and view controls">/,
    );

    expect(toolbar?.[1]).toContain("flex-wrap");
    expect(toolbar?.[1]).toContain("items-center");
    expect(toolbar?.[1]).toContain("gap-2");
    expect(toolbar?.[1]).not.toContain("absolute");
    expect(markup).toContain("Go to previous node");
    expect(markup).toContain("Go to next node");
    expect(markup).toContain("Main topic");
    expect(markup).toContain("Expand all");
    expect(markup).toContain("Collapse all");
    expect(markup).toContain("Reset");
    expect(markup).toContain("Map");
  });

  it("keeps the interactive canvas in a separate clipped flex region", () => {
    const markup = renderToStaticMarkup(<MindMap data={mindMap} height={700} />);

    expect(markup).toContain("relative min-h-0 flex-1 overflow-hidden");
  });
});
