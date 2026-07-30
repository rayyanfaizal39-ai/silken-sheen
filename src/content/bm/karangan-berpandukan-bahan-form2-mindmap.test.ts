import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm2KaranganBerpandukanBahanMindMap } from "./karangan-berpandukan-bahan-form2-mindmap";

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

describe("Bahasa Melayu Form 2 Karangan Berpandukan Bahan mind map", () => {
  it("registers under Penulisan after Teknik Mengolah Idea", () => {
    const chapter = getChapter("bm", "Karangan Berpandukan Bahan", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-karangan-berpandukan-bahan-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Karangan Berpandukan Bahan",
      title: "Karangan Berpandukan Bahan",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm2KaranganBerpandukanBahanMindMap,
        title: "Karangan Berpandukan Bahan",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Karangan Berpandukan Bahan", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 2")
        .filter((topic) => topic.categoryLabel === "Penulisan")
        .map((topic) => topic.key),
    ).toEqual(penulisanTopics);
  });

  it("contains all twelve requested expandable sections", () => {
    expect(bahasaMelayuForm2KaranganBerpandukanBahanMindMap).toMatchObject({
      id: "bm-f2-karangan-berpandukan-bahan-root",
      label: "KARANGAN BERPANDUKAN BAHAN",
    });
    expect(
      bahasaMelayuForm2KaranganBerpandukanBahanMindMap.children?.map((item) => item.label),
    ).toEqual([
      "Apa Itu Karangan Berpandukan Bahan?",
      "Jenis-jenis Bahan Rangsangan",
      "Cara Memahami Arahan Soalan",
      "Mengenal Pasti Maklumat Penting",
      "Menghubungkan Maklumat daripada Bahan",
      "Merancang Isi Karangan",
      "Membina Pendahuluan",
      "Mengembangkan Isi",
      "Menulis Penutup",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides every required learning field for each section", () => {
    bahasaMelayuForm2KaranganBerpandukanBahanMindMap.children?.forEach((section) => {
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
    const nodes = collectNodes(bahasaMelayuForm2KaranganBerpandukanBahanMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(
      getVisibleMindNodes(bahasaMelayuForm2KaranganBerpandukanBahanMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm2KaranganBerpandukanBahanMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuForm2KaranganBerpandukanBahanMindMap, expanded),
    ).toHaveLength(nodes.length);
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm2KaranganBerpandukanBahanMindMap, expanded),
    ).not.toThrow();
  });
});
