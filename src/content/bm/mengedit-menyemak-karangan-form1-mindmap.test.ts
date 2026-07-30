import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm1MengeditMenyemakKaranganMindMap } from "./mengedit-menyemak-karangan-form1-mindmap";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Form 1 Mengedit dan Menyemak Karangan mind map", () => {
  it("registers under Penulisan after Karangan Respons Terbuka", () => {
    const chapter = getChapter("bm", "Mengedit dan Menyemak Karangan", undefined, "Form 1");

    expect(chapter).toMatchObject({
      id: "bm-f1-mengedit-menyemak-karangan-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Mengedit dan Menyemak Karangan",
      title: "Mengedit dan Menyemak Karangan",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm1MengeditMenyemakKaranganMindMap,
        title: "Mengedit dan Menyemak Karangan",
      },
    });
    expect(hasResourceContent("bm", "Form 1", "Mengedit dan Menyemak Karangan", "mindMap")).toBe(
      true,
    );
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

  it("contains all twelve requested expandable sections", () => {
    expect(bahasaMelayuForm1MengeditMenyemakKaranganMindMap).toMatchObject({
      id: "bm-f1-mengedit-menyemak-karangan-root",
      label: "MENGEDIT DAN MENYEMAK KARANGAN",
    });
    expect(
      bahasaMelayuForm1MengeditMenyemakKaranganMindMap.children?.map((item) => item.label),
    ).toEqual([
      "Apa Itu Mengedit dan Menyemak?",
      "Kepentingan Mengedit Karangan",
      "Menyemak Tatabahasa",
      "Menyemak Ejaan",
      "Menyemak Tanda Baca",
      "Menyemak Struktur Ayat",
      "Menyemak Perenggan",
      "Menyemak Keseluruhan Isi",
      "Senarai Semak Sebelum Menghantar",
      "Kesalahan Lazim",
      "Teknik Mengingat",
      "Teknik Menjawab UASA",
    ]);
  });

  it("provides every required learning field for each section", () => {
    bahasaMelayuForm1MengeditMenyemakKaranganMindMap.children?.forEach((section) => {
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
    const nodes = collectNodes(bahasaMelayuForm1MengeditMenyemakKaranganMindMap);
    const ids = nodes.map((node) => node.id);

    expect(new Set(ids).size).toBe(ids.length);
    expect(
      getVisibleMindNodes(bahasaMelayuForm1MengeditMenyemakKaranganMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm1MengeditMenyemakKaranganMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuForm1MengeditMenyemakKaranganMindMap, expanded),
    ).toHaveLength(nodes.length);
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm1MengeditMenyemakKaranganMindMap, expanded),
    ).not.toThrow();
  });
});
