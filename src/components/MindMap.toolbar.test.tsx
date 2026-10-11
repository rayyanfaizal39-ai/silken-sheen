import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { MindMap, type MindNode } from "./MindMap";
import { MindMapNodeCard } from "./mindmap/MindMapNodeCard";
import { getMindMapMetrics } from "./mindmap/layout";
import { MIND_MAP_STRINGS } from "./mindmap/theme";

const mindMap: MindNode = {
  id: "main",
  label: "Main topic",
  summary: "A concise central summary",
  children: [
    {
      id: "first",
      label: "First node",
      children: [{ id: "detail", label: "Hidden detail" }],
    },
  ],
};

const header = {
  chapter: "Chapter 5: Kesultanan Melayu Melaka",
  subject: "Sejarah",
  form: "Form 2",
  onBack: () => {},
};

describe("MindMap explorer controls", () => {
  it("renders the compact top bar when used as a fullscreen screen", () => {
    const markup = renderToStaticMarkup(<MindMap data={mindMap} height="100%" header={header} />);

    expect(markup).toContain('aria-label="Back to chapters"');
    expect(markup).toContain("Chapter 5: Kesultanan Melayu Melaka");
    expect(markup).toContain("Sejarah");
    expect(markup).toContain("Form 2");
    expect(markup).toContain("Explore");
    expect(markup).toContain("Focus");
    expect(markup).toContain("Fit map");
    expect(markup).toContain("Reset view");
  });

  it("provides floating view controls and sequential navigation", () => {
    const markup = renderToStaticMarkup(<MindMap data={mindMap} height={700} />);

    ["Zoom in", "Zoom out", "Fit map", "Expand all", "Collapse all", "Minimap"].forEach((label) =>
      expect(markup).toContain(`aria-label="${label}"`),
    );
    expect(markup).toContain('aria-label="Go to previous topic"');
    expect(markup).toContain('aria-label="Go to next topic"');
    expect(markup).toContain('aria-label="Open reading view"');
    expect(markup).toContain("1 of 3");
  });

  it("opens on the main topic and its primary branches", () => {
    const markup = renderToStaticMarkup(<MindMap data={mindMap} height={700} />);

    expect(markup).toContain("A concise central summary");
    expect(markup).toContain("First node");
    expect(markup).not.toContain("Hidden detail");
    expect(markup).toContain('data-node-id="main"');
    expect(markup).toMatch(/data-node-id="main"[^>]*aria-expanded="true"/);
    expect(markup).toMatch(/data-node-id="first"[^>]*aria-expanded="false"/);
    expect(markup).toContain("touch-none");
  });

  it("uses Malay labels for Bahasa Melayu", () => {
    const markup = renderToStaticMarkup(<MindMap data={mindMap} height={700} locale="ms" />);

    expect(markup).toContain('aria-label="Buka semua"');
    expect(markup).toContain('aria-label="Pergi ke topik seterusnya"');
  });
});

describe("MindMap node card", () => {
  it("shows long labels and summaries in full", () => {
    const label =
      "Pendedahan → tindakan: Sinaran latar belakang → gunakan alat perlindungan yang sesuai, contohnya perlindungan anti-ultraungu. Gambar foto sinar-X → mengikut preskripsi atau arahan doktor.";
    const summary =
      "Televisyen → pastikan jarak penonton sekurang-kurangnya 2 m. Makanan tercemar bahan radioaktif → jangan makan makanan daripada kawasan tercemar.";
    const markup = renderToStaticMarkup(
      <MindMapNodeCard
        node={{ id: "long", label, summary }}
        depth={3}
        width={380}
        metrics={getMindMapMetrics(false)}
        accent="#5B8DEF"
        expanded={false}
        selected
        onPath={false}
        dimmed={false}
        tabbable
        strings={MIND_MAP_STRINGS.en}
        onActivate={() => {}}
        onOpenReader={() => {}}
      />,
    );

    expect(markup).toContain(label);
    expect(markup).toContain(summary);
    expect(markup).not.toContain("text-overflow");
    expect(markup).not.toContain("line-clamp");
    expect(markup).toContain('aria-current="true"');
  });
});
