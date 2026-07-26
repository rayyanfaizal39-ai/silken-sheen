import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { MindMap, type MindNode } from "./MindMap";

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => true,
}));

const mobileMindMap: MindNode = {
  id: "kata-kerja",
  label: "KATA KERJA",
  summary: "Perkataan yang menerangkan perbuatan, keadaan atau proses.",
  children: [
    {
      id: "definisi",
      label: "Definisi",
      summary: "Menerangkan perbuatan, keadaan atau proses.",
      children: [{ id: "contoh", label: "Contoh: membaca" }],
    },
  ],
};

describe("MindMap mobile learning path", () => {
  it("renders a connected, expandable vertical path without a scaled canvas", () => {
    const markup = renderToStaticMarkup(
      <MindMap data={mobileMindMap} mobileLayout="learning-path" />,
    );

    expect(markup).toContain('aria-label="Peta minda KATA KERJA"');
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("KATA KERJA");
    expect(markup).toContain("Definisi");
    expect(markup).toContain("Menerangkan perbuatan, keadaan atau proses.");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).not.toContain("touch-none");
  });
});
