import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import {
  getChapter,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import { bahasaMelayuSimpulanBahasaMindMap } from "./simpulan-bahasa-mindmap";

const firstLevelLabels = [
  "Apa Itu Simpulan Bahasa?",
  "Ciri-ciri",
  "Cara Mengenal Pasti",
  "Katak di bawah tempurung",
  "Mendabik dada",
  "Membuka mata",
  "Ambil berat",
  "Membawang",
  "Panas baran",
  "Darah daging",
  "Selok-belok",
  "Jalan mudah",
  "Modal insan",
  "Anak watan",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Teknik Menjawab UASA",
] as const;

const simpulanBahasaLabels = firstLevelLabels.slice(3, 14);

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Tingkatan 1 Simpulan Bahasa mind map", () => {
  it("registers under the Peribahasa category through the shared chapter pipeline", () => {
    const chapter = getChapter("bm", "Simpulan Bahasa", undefined, "Form 1");

    expect(chapter).toMatchObject({
      title: "Simpulan Bahasa",
      categoryLabel: "Peribahasa",
      mindMap: {
        data: bahasaMelayuSimpulanBahasaMindMap,
        title: "Simpulan Bahasa",
      },
    });
    expect(hasFormResourceContent("bm", "Form 1", "mindMap")).toBe(true);
    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 1").find(
        (topic) => topic.key === "Simpulan Bahasa",
      ),
    ).toMatchObject({
      label: "Simpulan Bahasa",
      categoryLabel: "Peribahasa",
      available: true,
      selectable: true,
    });
  });

  it("contains the exact required title-only first-level branches", () => {
    expect(bahasaMelayuSimpulanBahasaMindMap.children?.map((branch) => branch.label)).toEqual(
      firstLevelLabels,
    );
    bahasaMelayuSimpulanBahasaMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it.each(simpulanBahasaLabels)("%s contains the required learning details", (label) => {
    const branch = bahasaMelayuSimpulanBahasaMindMap.children?.find(
      (candidate) => candidate.label === label,
    );
    const childLabels = branch?.children?.map((child) => child.label) ?? [];

    expect(childLabels).toEqual(
      expect.arrayContaining([
        "Maksud",
        "Huraian",
        "Contoh Ayat",
        "Situasi Penggunaan",
        "Berkaitan",
      ]),
    );
  });

  it("gives every node a unique ID", () => {
    const nodes = collectNodes(bahasaMelayuSimpulanBahasaMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
  });
});
