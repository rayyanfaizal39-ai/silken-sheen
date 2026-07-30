import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm3TeknikMenjanaIdeaKbatMindMap } from "./teknik-menjana-idea-kbat-form3-mindmap";

const penulisanTopics = [
  "Strategi Menjawab UASA",
  "Analisis Kehendak Soalan",
  "Teknik Menjana Idea KBAT",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 3 Teknik Menjana Idea KBAT mind map", () => {
  it("registers as the third Form 3 Penulisan topic", () => {
    const chapter = getChapter("bm", "Teknik Menjana Idea KBAT", undefined, "Form 3");

    expect(chapter).toMatchObject({
      id: "bm-f3-teknik-menjana-idea-kbat-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: "Teknik Menjana Idea KBAT",
      title: "Teknik Menjana Idea KBAT",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm3TeknikMenjanaIdeaKbatMindMap,
        title: "Teknik Menjana Idea KBAT",
      },
    });
    expect(hasResourceContent("bm", "Form 3", "Teknik Menjana Idea KBAT", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 3")
        .filter((topic) => topic.categoryLabel === "Penulisan")
        .map((topic) => topic.key),
    ).toEqual(penulisanTopics);
  });

  it("contains all eleven requested expandable sections", () => {
    expect(bahasaMelayuForm3TeknikMenjanaIdeaKbatMindMap).toMatchObject({
      id: "bm-f3-teknik-menjana-idea-kbat-root",
      label: "TEKNIK MENJANA IDEA KBAT",
    });
    expect(
      bahasaMelayuForm3TeknikMenjanaIdeaKbatMindMap.children?.map((item) => item.label),
    ).toEqual([
      "Apa Itu KBAT?",
      "Kepentingan KBAT dalam Penulisan",
      "Mengenal Pasti Kehendak KBAT",
      "Teknik Menjana Idea",
      "Teknik Mengembangkan Idea KBAT",
      "Menghubungkan Sebab, Kesan dan Cadangan",
      "Menyokong Idea dengan Contoh yang Relevan",
      "Membina Hujah yang Mantap",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides all required learning fields without quizzes or flashcards", () => {
    bahasaMelayuForm3TeknikMenjanaIdeaKbatMindMap.children?.forEach((section) => {
      const labels = section.children?.map((item) => item.label) ?? [];

      expect(labels).toContain("Penerangan");
      expect(labels).toContain("Langkah-langkah");
      expect(labels).toContain("Contoh");
      expect(labels).toContain("Tip Peperiksaan");
      expect(section.children).toHaveLength(5);
      section.children?.forEach((detail) => {
        expect(detail.summary?.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("keeps every node unique and supports progressive expansion", () => {
    const nodes = collectNodes(bahasaMelayuForm3TeknikMenjanaIdeaKbatMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(
      getVisibleMindNodes(bahasaMelayuForm3TeknikMenjanaIdeaKbatMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm3TeknikMenjanaIdeaKbatMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuForm3TeknikMenjanaIdeaKbatMindMap, expanded),
    ).toHaveLength(nodes.length);
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm3TeknikMenjanaIdeaKbatMindMap, expanded),
    ).not.toThrow();
  });
});
