import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import {
  getChapter,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import { bahasaMelayuKataAdjektifMindMap } from "./kata-adjektif-mindmap";

const forms = ["Form 1", "Form 2", "Form 3"] as const;

function flattenLabels(node: MindNode): string[] {
  return [node.label, ...(node.children?.flatMap(flattenLabels) ?? [])];
}

describe("Bahasa Melayu Kata Adjektif mind map", () => {
  it.each(forms)("registers the same Kata Adjektif content for %s", (form) => {
    const chapter = getChapter("bm", "Kata Adjektif", undefined, form);

    expect(chapter).toMatchObject({
      title: "Kata Adjektif",
      description: "Perkataan yang menerangkan sifat, keadaan atau kualiti sesuatu kata nama.",
      categoryLabel: "Tatabahasa",
    });
    expect(chapter?.mindMap?.data).toBe(bahasaMelayuKataAdjektifMindMap);
    expect(hasFormResourceContent("bm", form, "mindMap")).toBe(true);
  });

  it.each(forms)("appears third after Kata Nama and Kata Kerja for %s", (form) => {
    const topics = getRegisteredSubjectChapters("bm", undefined, form)
      .filter((chapter) => getChapter("bm", chapter.key, undefined, form)?.mindMap)
      .slice(0, 3);

    expect(topics).toEqual([
      expect.objectContaining({ key: "Kata Nama", categoryLabel: "Tatabahasa" }),
      expect.objectContaining({ key: "Kata Kerja", categoryLabel: "Tatabahasa" }),
      expect.objectContaining({
        key: "Kata Adjektif",
        description: "Perkataan yang menerangkan sifat, keadaan atau kualiti sesuatu kata nama.",
        categoryLabel: "Tatabahasa",
      }),
    ]);
  });

  it("contains the eight requested branches and central summary", () => {
    expect(bahasaMelayuKataAdjektifMindMap.summary).toBe(
      "Perkataan yang menerangkan sifat, keadaan atau kualiti sesuatu kata nama.",
    );
    expect(bahasaMelayuKataAdjektifMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Fungsi",
      "Frasa Adjektif",
      "Contoh Kata Adjektif",
      "Kosa Kata Aras Tinggi",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
  });

  it("includes the required sentence analysis, vocabulary and usage cautions", () => {
    const labels = flattenLabels(bahasaMelayuKataAdjektifMindMap).join("\n");

    expect(labels).toContain("Frasa Nama: Cuaca hari ini");
    expect(labels).toContain("Frasa Adjektif: sangat indah");
    expect(labels).toContain('Contoh lain: "Adik sangat rajin."');
    expect(labels).toContain("Murid itu mengamalkan akhlak mahmudah.");
    expect(labels).toContain("Pastikan ayat menunjukkan maksud sebenar kata adjektif.");
    expect(labels).toContain("Bagaimana sifatnya? → Kata Adjektif");
    expect(labels).not.toContain("setiap perkataan deskriptif ialah kata adjektif");
  });
});
