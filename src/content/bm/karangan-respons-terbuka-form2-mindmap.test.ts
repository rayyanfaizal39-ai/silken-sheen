import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm2KaranganResponsTerbukaMindMap } from "./karangan-respons-terbuka-form2-mindmap";

const penulisanTopics = [
  "Mengembangkan Isi Karangan",
  "Perbendaharaan Kata",
  "Ayat Gramatis",
  "Teknik Mengolah Idea",
  "Karangan Berpandukan Bahan",
  "Karangan Respons Terbuka",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 2 Karangan Respons Terbuka mind map", () => {
  it("registers under Penulisan after Karangan Berpandukan Bahan", () => {
    const chapter = getChapter("bm", "Karangan Respons Terbuka", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-karangan-respons-terbuka-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Karangan Respons Terbuka",
      title: "Karangan Respons Terbuka",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm2KaranganResponsTerbukaMindMap,
        title: "Karangan Respons Terbuka",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Karangan Respons Terbuka", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 2")
        .filter((topic) => topic.categoryLabel === "Penulisan")
        .map((topic) => topic.key),
    ).toEqual(penulisanTopics);
  });

  it("contains all eleven requested expandable sections", () => {
    expect(bahasaMelayuForm2KaranganResponsTerbukaMindMap).toMatchObject({
      id: "bm-f2-karangan-respons-terbuka-root",
      label: "KARANGAN RESPONS TERBUKA",
    });
    expect(
      bahasaMelayuForm2KaranganResponsTerbukaMindMap.children?.map((item) => item.label),
    ).toEqual([
      "Apa Itu Karangan Respons Terbuka?",
      "Memahami Kehendak Soalan",
      "Mengenal Pasti Kata Tugas",
      "Merancang Isi Karangan",
      "Menulis Pendahuluan yang Berkesan",
      "Mengembangkan Isi Secara Matang",
      "Menulis Penutup yang Mantap",
      "Menyemak dan Menambah Baik Karangan",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides every required learning field for each section", () => {
    bahasaMelayuForm2KaranganResponsTerbukaMindMap.children?.forEach((section) => {
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
    const nodes = collectNodes(bahasaMelayuForm2KaranganResponsTerbukaMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(
      getVisibleMindNodes(bahasaMelayuForm2KaranganResponsTerbukaMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm2KaranganResponsTerbukaMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuForm2KaranganResponsTerbukaMindMap, expanded),
    ).toHaveLength(nodes.length);
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm2KaranganResponsTerbukaMindMap, expanded),
    ).not.toThrow();
  });
});
