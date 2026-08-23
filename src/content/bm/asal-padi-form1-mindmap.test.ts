import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  MindMap,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuTingkatan1AsalPadiMindMap } from "./asal-padi-form1-mindmap";
import { bahasaMelayuTingkatan1KomsasRegistry } from "./tingkatan1-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Asal Padi";
const expectedBranches = [
  "Sinopsis",
  "Tema",
  "Persoalan",
  "Watak",
  "Perwatakan",
  "Plot",
  "Teknik Plot",
  "Latar Tempat",
  "Latar Masa",
  "Latar Masyarakat",
  "Gaya Bahasa",
  "Nilai",
  "Pengajaran",
  "Peristiwa Penting",
  "Teknik Menjawab",
  "Kesalahan Lazim",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan1AsalPadiMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Asal Padi KOMSAS mind map", () => {
  it("registers exactly the two requested interactive KOMSAS topics in order", () => {
    expect(bahasaMelayuTingkatan1KomsasRegistry.map((topic) => topic.chapterKey)).toEqual([
      "Strategi Memahami dan Menjawab KOMSAS",
      title,
    ]);

    const chapter = getChapter("bm", title, undefined, "Form 1");
    expect(chapter).toMatchObject({
      id: "bm-f1-asal-padi-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: title,
      title,
      description:
        "Kisah Si Bongsu yang berusaha membawa padi dari kayangan ke bumi melalui keberanian, kebijaksanaan dan kegigihannya.",
      categoryLabel: "KOMSAS",
      mindMap: {
        data: bahasaMelayuTingkatan1AsalPadiMindMap,
        title,
      },
    });
    expect(hasResourceContent("bm", "Form 1", title, "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
  });

  it("keeps the topic isolated to Form 1 KOMSAS with the requested navigation", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 1").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = topics.findIndex((topic) => topic.key === title);
    expect(topics).toHaveLength(2);
    expect(topics[index - 1]?.key).toBe("Strategi Memahami dan Menjawab KOMSAS");
    expect(topics[index + 1]).toBeUndefined();
    expect(getChapter("bm", title, undefined, "Form 2")).toBeUndefined();
    expect(getChapter("bm", title, undefined, "Form 3")).toBeUndefined();
  });

  it("uses the exact root identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan1AsalPadiMindMap).toMatchObject({
      id: "bm-f1-asal-padi-root",
      label: "ASAL PADI",
      summary:
        "Prosa tradisional yang mengisahkan usaha Si Bongsu mendapatkan padi dari kayangan dan membawanya ke bumi sehingga tanaman padi akhirnya dapat berkembang di bumi.",
    });
    expect(bahasaMelayuTingkatan1AsalPadiMindMap.children?.map((item) => item.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan1AsalPadiMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("contains the prescribed identity, story sequence, analysis and memory map", () => {
    expect(branchText("Sinopsis")).toContain("Antologi Kuingin Berterima Kasih");
    expect(branchText("Sinopsis")).toContain("tujuh orang wanita");
    expect(branchText("Sinopsis")).toContain("luka pada tumitnya");
    expect(branchText("Sinopsis")).toContain("Burung Pipit");
    expect(branchText("Sinopsis")).toContain("Burung Tekuri");
    expect(branchText("Tema")).toContain("Kebijaksanaan dalam Menyelesaikan Masalah");
    expect(branchText("Watak")).toContain("Si Bongsu — Watak Utama");
    expect(branchText("Perwatakan")).toContain("Bukti Peristiwa");
    expect(branchText("Plot")).toContain("Klimaks");
    expect(branchText("Gaya Bahasa")).toContain("kaki itik");
    expect(branchText("Peristiwa Penting")).toContain("ASAL PADI DALAM 6 LANGKAH");
    expect(branchText("Peristiwa Penting")).toContain("BIJAK + GIGIH + BERANI + RAJIN");
    expect(branchText("Kesalahan Lazim")).toContain("Campur Versi Cerita");
  });

  it("does not add an author, future KOMSAS works or unsupported plot techniques", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1AsalPadiMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(allText).not.toMatch(/Oren|Hadiah|imbas kembali|imbas muka/i);
    expect(allText).not.toMatch(/karya (?:oleh|karangan)\s+[A-Z]/i);
    expect(bahasaMelayuTingkatan1KomsasRegistry.map((topic) => topic.chapterKey)).not.toContain(
      "Oren",
    );
  });

  it("supports full expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1AsalPadiMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1AsalPadiMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1AsalPadiMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1AsalPadiMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    const positions = Array.from(
      calculateMindMapLayout(bahasaMelayuTingkatan1AsalPadiMindMap, expanded).positions.values(),
    );
    for (let first = 0; first < positions.length; first += 1) {
      for (let second = first + 1; second < positions.length; second += 1) {
        const a = positions[first];
        const b = positions[second];
        expect(
          a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y - a.h / 2 < b.y + b.h / 2 &&
            a.y + a.h / 2 > b.y - b.h / 2,
        ).toBe(false);
      }
    }
  });

  it("renders an accessible collapsed mobile learning path without horizontal overflow", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan1AsalPadiMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("ASAL PADI");
    expect(markup).toContain("Peristiwa Penting");
    expect(markup).not.toContain("Dua Beradik Hidup Susah");
  });
});
