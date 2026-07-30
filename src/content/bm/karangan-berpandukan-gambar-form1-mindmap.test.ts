import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm1KaranganBerpandukanGambarMindMap } from "./karangan-berpandukan-gambar-form1-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 1 Karangan Berpandukan Gambar mind map", () => {
  it("registers under Penulisan after Penanda Wacana", () => {
    const chapter = getChapter("bm", "Karangan Berpandukan Gambar", undefined, "Form 1");

    expect(chapter).toMatchObject({
      id: "bm-f1-karangan-berpandukan-gambar-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Karangan Berpandukan Gambar",
      title: "Karangan Berpandukan Gambar",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm1KaranganBerpandukanGambarMindMap,
        title: "Karangan Berpandukan Gambar",
      },
    });
    expect(hasResourceContent("bm", "Form 1", "Karangan Berpandukan Gambar", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 1")
        .filter((topic) => topic.categoryLabel === "Penulisan")
        .map((topic) => topic.key),
    ).toEqual([
      "Asas Penulisan",
      "Membina Perenggan",
      "Pendahuluan",
      "Penutup",
      "Penanda Wacana",
      "Karangan Berpandukan Gambar",
      "Karangan Respons Terbuka",
      "Mengedit dan Menyemak Karangan",
    ]);
  });

  it("contains all ten requested expandable sections", () => {
    expect(bahasaMelayuForm1KaranganBerpandukanGambarMindMap).toMatchObject({
      id: "bm-f1-karangan-berpandukan-gambar-root",
      label: "KARANGAN BERPANDUKAN GAMBAR",
    });
    expect(
      bahasaMelayuForm1KaranganBerpandukanGambarMindMap.children?.map((item) => item.label),
    ).toEqual([
      "Apa Itu Karangan Berpandukan Gambar?",
      "Cara Mentafsir Gambar",
      "Mengenal Pasti Isi Penting",
      "Menyusun Idea Mengikut Urutan",
      "Membina Pendahuluan",
      "Mengembangkan Isi",
      "Menulis Penutup",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides every required learning field for each section", () => {
    bahasaMelayuForm1KaranganBerpandukanGambarMindMap.children?.forEach((section) => {
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
    const nodes = collectNodes(bahasaMelayuForm1KaranganBerpandukanGambarMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(
      getVisibleMindNodes(bahasaMelayuForm1KaranganBerpandukanGambarMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm1KaranganBerpandukanGambarMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuForm1KaranganBerpandukanGambarMindMap, expanded),
    ).toHaveLength(nodes.length);
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm1KaranganBerpandukanGambarMindMap, expanded),
    ).not.toThrow();
  });
});
