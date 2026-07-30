import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm2PerbendaharaanKataMindMap } from "./perbendaharaan-kata-form2-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 2 Perbendaharaan Kata mind map", () => {
  it("registers under Penulisan after Mengembangkan Isi Karangan", () => {
    const chapter = getChapter("bm", "Perbendaharaan Kata", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-perbendaharaan-kata-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Perbendaharaan Kata",
      title: "Perbendaharaan Kata",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm2PerbendaharaanKataMindMap,
        title: "Perbendaharaan Kata",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Perbendaharaan Kata", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 2")
        .filter((topic) => topic.categoryLabel === "Penulisan")
        .map((topic) => topic.key),
    ).toEqual(["Mengembangkan Isi Karangan", "Perbendaharaan Kata"]);
  });

  it("contains all ten requested expandable sections", () => {
    expect(bahasaMelayuForm2PerbendaharaanKataMindMap).toMatchObject({
      id: "bm-f2-perbendaharaan-kata-root",
      label: "PERBENDAHARAAN KATA",
    });
    expect(bahasaMelayuForm2PerbendaharaanKataMindMap.children?.map((item) => item.label)).toEqual([
      "Apa Itu Perbendaharaan Kata?",
      "Kepentingan Perbendaharaan Kata",
      "Sinonim",
      "Antonim",
      "Kata Menarik",
      "Ungkapan Menarik",
      "Perkataan Formal dan Tidak Formal",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides every required learning field for each section", () => {
    bahasaMelayuForm2PerbendaharaanKataMindMap.children?.forEach((section) => {
      const labels = section.children?.map((item) => item.label) ?? [];

      expect(labels).toContain("Penerangan");
      expect(labels).toContain("Contoh");
      expect(labels).toContain("Cara Penggunaan");
      expect(labels).toContain("Tip Penulisan");
      expect(section.children).toHaveLength(5);
      section.children?.forEach((detail) => {
        expect(detail.summary?.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("has unique node IDs and supports progressive expansion", () => {
    const nodes = collectNodes(bahasaMelayuForm2PerbendaharaanKataMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(getVisibleMindNodes(bahasaMelayuForm2PerbendaharaanKataMindMap, new Set())).toHaveLength(
      1,
    );

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm2PerbendaharaanKataMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm2PerbendaharaanKataMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm2PerbendaharaanKataMindMap, expanded),
    ).not.toThrow();
  });
});
