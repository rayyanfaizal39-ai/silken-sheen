import { describe, expect, it } from "vitest";
import {
  getChapter,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import { bahasaMelayuKataNamaMindMap } from "./kata-nama-mindmap";

const forms = ["Form 1"] as const;

describe("Bahasa Melayu Kata Nama mind map", () => {
  it.each(forms)("registers Kata Nama through the shared %s chapter pipeline", (form) => {
    const chapter = getChapter("bm", "Kata Nama", undefined, form);

    expect(chapter?.mindMap?.data).toBe(bahasaMelayuKataNamaMindMap);
    expect(hasFormResourceContent("bm", form, "mindMap")).toBe(true);
    expect(getRegisteredSubjectChapters("bm", undefined, form)[0]).toMatchObject({
      key: "Kata Nama",
      label: "Kata Nama",
    });
  });

  it("contains the required learning branches in the shared MindNode format", () => {
    expect(bahasaMelayuKataNamaMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Kata Nama Am",
      "Kata Nama Khas",
      "Kata Ganti Nama",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
      "Nota Ejaan",
    ]);
  });
});
