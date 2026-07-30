import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm2TeknikMengolahIdeaMindMap } from "./teknik-mengolah-idea-form2-mindmap";

const penulisanTopics = [
  "Mengembangkan Isi Karangan",
  "Perbendaharaan Kata",
  "Ayat Gramatis",
  "Teknik Mengolah Idea",
  "Karangan Berpandukan Bahan",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 2 Teknik Mengolah Idea mind map", () => {
  it("registers under Penulisan after Ayat Gramatis", () => {
    const chapter = getChapter("bm", "Teknik Mengolah Idea", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-teknik-mengolah-idea-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Teknik Mengolah Idea",
      title: "Teknik Mengolah Idea",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm2TeknikMengolahIdeaMindMap,
        title: "Teknik Mengolah Idea",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Teknik Mengolah Idea", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 2")
        .filter((topic) => topic.categoryLabel === "Penulisan")
        .map((topic) => topic.key),
    ).toEqual(penulisanTopics);
  });

  it("contains all ten requested expandable sections", () => {
    expect(bahasaMelayuForm2TeknikMengolahIdeaMindMap).toMatchObject({
      id: "bm-f2-teknik-mengolah-idea-root",
      label: "TEKNIK MENGOLAH IDEA",
    });
    expect(bahasaMelayuForm2TeknikMengolahIdeaMindMap.children?.map((item) => item.label)).toEqual([
      "Apa Itu Mengolah Idea?",
      "Kepentingan Mengolah Idea",
      "Mengenal Pasti Idea Utama",
      "Mengembangkan Idea",
      "Menyusun Idea Secara Logik",
      "Menghubungkan Idea dengan Penanda Wacana",
      "Menyokong Idea dengan Contoh",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides every required learning field for each section", () => {
    bahasaMelayuForm2TeknikMengolahIdeaMindMap.children?.forEach((section) => {
      const labels = section.children?.map((item) => item.label) ?? [];

      expect(labels).toContain("Penerangan");
      expect(labels).toContain("Langkah-langkah");
      expect(labels).toContain("Contoh");
      expect(labels).toContain("Tip Penulisan");
      expect(section.children).toHaveLength(5);
      section.children?.forEach((detail) => {
        expect(detail.summary?.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("has unique node IDs and supports progressive expansion", () => {
    const nodes = collectNodes(bahasaMelayuForm2TeknikMengolahIdeaMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(getVisibleMindNodes(bahasaMelayuForm2TeknikMengolahIdeaMindMap, new Set())).toHaveLength(
      1,
    );

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm2TeknikMengolahIdeaMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm2TeknikMengolahIdeaMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm2TeknikMengolahIdeaMindMap, expanded),
    ).not.toThrow();
  });
});
