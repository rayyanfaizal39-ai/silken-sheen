import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import {
  getChapter,
  getChaptersForSubject,
  getRegisteredSubjectChapters,
  hasResourceContent,
} from "@/content/registry";
import { bahasaMelayuPenandaWacanaMindMap } from "./penanda-wacana-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function flattenContent(node: MindNode): string {
  return [node.label, node.summary, ...(node.children?.map(flattenContent) ?? [])]
    .filter(Boolean)
    .join("\n");
}

describe("Bahasa Melayu Form 1 Penanda Wacana mind map", () => {
  it("registers Penanda Wacana under Penulisan without generating new resources", () => {
    const chapter = getChapter("bm", "Penanda Wacana", undefined, "Form 1");

    expect(chapter).toMatchObject({
      id: "bm-f1-penanda-wacana",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Penanda Wacana",
      title: "Penanda Wacana",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuPenandaWacanaMindMap,
        title: "Penanda Wacana",
      },
    });
    expect(hasResourceContent("bm", "Form 1", "Penanda Wacana", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
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

  it("keeps one Form 1 chapter row and does not alter the existing Form 2 resource", () => {
    const chapters = getChaptersForSubject("bm").filter(
      (chapter) => chapter.chapterKey === "Penanda Wacana",
    );

    expect(chapters.map((chapter) => chapter.id)).toEqual([
      "bm-f1-penanda-wacana",
      "bm-f2-penanda-wacana",
    ]);
    expect(chapters).toHaveLength(2);
    expect(chapters[1]).not.toHaveProperty("mindMap");
    expect(chapters[1]).not.toHaveProperty("categoryLabel");
  });

  it("contains all eleven requested expandable sections", () => {
    expect(bahasaMelayuPenandaWacanaMindMap).toMatchObject({
      id: "bm-f1-penanda-wacana-root",
      label: "PENANDA WACANA",
    });
    expect(bahasaMelayuPenandaWacanaMindMap.children?.map((branch) => branch.label)).toEqual([
      "Apa Itu Penanda Wacana?",
      "Kepentingan Penanda Wacana",
      "Penanda Wacana untuk Memulakan Idea",
      "Penanda Wacana untuk Menambah Idea",
      "Penanda Wacana untuk Membandingkan Idea",
      "Penanda Wacana untuk Menunjukkan Sebab dan Akibat",
      "Penanda Wacana untuk Memberi Contoh",
      "Penanda Wacana untuk Membuat Kesimpulan",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides practical learning fields for every section", () => {
    bahasaMelayuPenandaWacanaMindMap.children?.forEach((section) => {
      const labels = section.children?.map((item) => item.label) ?? [];

      expect(labels).toContain("Penerangan");
      expect(labels).toContain("Contoh Ayat");
      expect(labels).toContain("Situasi Penggunaan");
      expect(labels).toContain("Kesalahan Lazim");
      expect(section.children).toHaveLength(5);
      section.children?.forEach((detail) => {
        expect(detail.summary?.trim().length).toBeGreaterThan(0);
      });
    });
  });

  it("covers every requested discourse relationship with contextual examples", () => {
    const content = flattenContent(bahasaMelayuPenandaWacanaMindMap);

    expect(content).toContain("Pada masa kini • Dewasa ini");
    expect(content).toContain("Selain itu • Di samping itu • Tambahan pula");
    expect(content).toContain("Sebaliknya • Namun begitu • Walau bagaimanapun");
    expect(content).toContain("Hal ini demikian kerana");
    expect(content).toContain("Oleh itu • Dengan itu • Akibatnya");
    expect(content).toContain("Sebagai contoh • Contohnya • Misalnya");
    expect(content).toContain("Kesimpulannya • Tegasnya • Jelaslah bahawa");
    expect(content).toContain("M-T-B-S-A-C-K");
    expect(content).not.toContain("Tip SPM");
  });

  it("has unique node IDs and supports progressive expansion", () => {
    const nodes = collectNodes(bahasaMelayuPenandaWacanaMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(getVisibleMindNodes(bahasaMelayuPenandaWacanaMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuPenandaWacanaMindMap);
    expect(getVisibleMindNodes(bahasaMelayuPenandaWacanaMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    expect(() => calculateMindMapLayout(bahasaMelayuPenandaWacanaMindMap, expanded)).not.toThrow();
  });
});
