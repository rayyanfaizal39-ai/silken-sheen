import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import {
  getChapter,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import { bahasaMelayuForm2PerumpamaanMindMap } from "./perumpamaan-form2-mindmap";

const firstLevelLabels = [
  "Apa Itu Perumpamaan?",
  "Ciri-ciri",
  "Cara Mengenal Pasti",
  "Ibarat abu di atas tunggul",
  "Seperti ayam berak kapur",
  "Duduk sama rendah, berdiri sama tinggi",
  "Bak aur dengan tebing",
  "Bagai cendawan tumbuh selepas hujan",
  "Umpama minyak setitik, di laut sekalipun timbul juga",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Teknik Menjawab UASA",
] as const;

const perumpamaanLabels = firstLevelLabels.slice(3, 9);
const detailLabels = [
  "Maksud",
  "Huraian",
  "Contoh Ayat",
  "Situasi Penggunaan",
  "Kesalahan Lazim",
  "Berkaitan",
] as const;

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

describe("Bahasa Melayu Tingkatan 2 Perumpamaan mind map", () => {
  it("registers under the Form 2 Peribahasa category", () => {
    const chapter = getChapter("bm", "Perumpamaan", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-perumpamaan-mindmap",
      title: "Perumpamaan",
      categoryLabel: "Peribahasa",
      mindMap: {
        data: bahasaMelayuForm2PerumpamaanMindMap,
        title: "Perumpamaan",
      },
    });
    expect(hasFormResourceContent("bm", "Form 2", "mindMap")).toBe(true);
    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 2").find(
        (topic) => topic.key === "Perumpamaan",
      ),
    ).toMatchObject({
      label: "Perumpamaan",
      categoryLabel: "Peribahasa",
      available: true,
      selectable: true,
    });
  });

  it("uses the requested root and exact title-only first-level branches", () => {
    expect(bahasaMelayuForm2PerumpamaanMindMap.label).toBe("PERUMPAMAAN");
    expect(bahasaMelayuForm2PerumpamaanMindMap.children?.map((branch) => branch.label)).toEqual(
      firstLevelLabels,
    );
    bahasaMelayuForm2PerumpamaanMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it.each(perumpamaanLabels)("%s contains the complete six-part lesson", (label) => {
    const branch = bahasaMelayuForm2PerumpamaanMindMap.children?.find(
      (candidate) => candidate.label === label,
    );

    expect(branch?.children?.map((child) => child.label)).toEqual(detailLabels);
    branch?.children?.forEach((child) => {
      expect(child.summary?.trim().length).toBeGreaterThan(0);
    });
  });

  it("gives every node a unique ID", () => {
    const nodes = collectNodes(bahasaMelayuForm2PerumpamaanMindMap);

    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
  });

  it("does not alter the Form 1 Simpulan Bahasa registration", () => {
    expect(getChapter("bm", "Simpulan Bahasa", undefined, "Form 1")).toMatchObject({
      id: "bm-f1-simpulan-bahasa-mindmap",
      categoryLabel: "Peribahasa",
      mindMap: { title: "Simpulan Bahasa" },
    });
  });
});
