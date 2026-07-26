import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import {
  getChapter,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import { bahasaMelayuKataNamaMindMap } from "./kata-nama-mindmap";
import { bahasaMelayuKataKerjaMindMap } from "./kata-kerja-mindmap";

const forms = ["Form 1", "Form 2", "Form 3"] as const;

function flattenLabels(node: MindNode): string[] {
  return [node.label, ...(node.children?.flatMap(flattenLabels) ?? [])];
}

describe("Bahasa Melayu Kata Kerja mind map", () => {
  it.each(forms)("registers shared Kata Kerja content for %s", (form) => {
    const chapter = getChapter("bm", "Kata Kerja", undefined, form);

    expect(chapter).toMatchObject({
      title: "Kata Kerja",
      description: "Perkataan yang menerangkan perbuatan, keadaan atau proses.",
      categoryLabel: "Tatabahasa",
    });
    expect(chapter?.mindMap?.data).toBe(bahasaMelayuKataKerjaMindMap);
    expect(hasFormResourceContent("bm", form, "mindMap")).toBe(true);
  });

  it.each(forms)("places Kata Kerja third after the two noun topics for %s", (form) => {
    const topics = getRegisteredSubjectChapters("bm", undefined, form)
      .filter((chapter) => getChapter("bm", chapter.key, undefined, form)?.mindMap)
      .slice(0, 3);

    expect(topics).toEqual([
      expect.objectContaining({
        key: "Kata Nama",
        categoryLabel: "Tatabahasa",
      }),
      expect.objectContaining({
        key: "Kata Ganti Nama",
        categoryLabel: "Tatabahasa",
      }),
      expect.objectContaining({
        key: "Kata Kerja",
        description: "Perkataan yang menerangkan perbuatan, keadaan atau proses.",
        categoryLabel: "Tatabahasa",
      }),
    ]);
    expect(getChapter("bm", "Kata Nama", undefined, form)?.mindMap?.data).toBe(
      bahasaMelayuKataNamaMindMap,
    );
  });

  it("contains the nine required learning branches", () => {
    expect(bahasaMelayuKataKerjaMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Kata Kerja Transitif",
      "Kata Kerja Tak Transitif",
      "Bentuk Kata Kerja",
      "Kata Kerja dalam Ayat",
      "Ayat Aktif dan Ayat Pasif",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
  });

  it("includes accurate contextual cautions and sentence analysis", () => {
    const labels = flattenLabels(bahasaMelayuKataKerjaMindMap).join("\n");

    expect(labels).toContain("Subjek → Kata Kerja Transitif → Objek");
    expect(labels).toContain("Kata kerja transitif: membaca");
    expect(labels).toContain("Kata kerja tak transitif: tidur");
    expect(labels).toContain("di bilik = keterangan tempat, bukan objek");
    expect(labels).toContain("tidak wajib hadir dalam setiap ayat pasif");
    expect(labels).toContain(
      "Ayat ini boleh dianggap tidak lengkap apabila maksud yang dikehendaki memerlukan objek.",
    );
    expect(labels).not.toContain("setiap perkataan selepas kata kerja ialah objek");
  });
});
