import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm1KaranganResponsTerbukaMindMap } from "./karangan-respons-terbuka-form1-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 1 Karangan Respons Terbuka mind map", () => {
  it("registers under Penulisan after Karangan Berpandukan Gambar", () => {
    const chapter = getChapter("bm", "Karangan Respons Terbuka", undefined, "Form 1");

    expect(chapter).toMatchObject({
      id: "bm-f1-karangan-respons-terbuka-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Karangan Respons Terbuka",
      title: "Karangan Respons Terbuka",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm1KaranganResponsTerbukaMindMap,
        title: "Karangan Respons Terbuka",
      },
    });
    expect(hasResourceContent("bm", "Form 1", "Karangan Respons Terbuka", "mindMap")).toBe(true);
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
    ]);
  });

  it("contains all eleven requested expandable sections", () => {
    expect(bahasaMelayuForm1KaranganResponsTerbukaMindMap).toMatchObject({
      id: "bm-f1-karangan-respons-terbuka-root",
      label: "KARANGAN RESPONS TERBUKA",
    });
    expect(
      bahasaMelayuForm1KaranganResponsTerbukaMindMap.children?.map((item) => item.label),
    ).toEqual([
      "Apa Itu Karangan Respons Terbuka?",
      "Cara Memahami Kehendak Soalan",
      "Mengenal Pasti Kata Kunci",
      "Merancang Isi Karangan",
      "Membina Pendahuluan",
      "Mengembangkan Isi",
      "Menulis Penutup",
      "Menyemak Semula Karangan",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides every required learning field for each section", () => {
    bahasaMelayuForm1KaranganResponsTerbukaMindMap.children?.forEach((section) => {
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
    const nodes = collectNodes(bahasaMelayuForm1KaranganResponsTerbukaMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(
      getVisibleMindNodes(bahasaMelayuForm1KaranganResponsTerbukaMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm1KaranganResponsTerbukaMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuForm1KaranganResponsTerbukaMindMap, expanded),
    ).toHaveLength(nodes.length);
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm1KaranganResponsTerbukaMindMap, expanded),
    ).not.toThrow();
  });
});
