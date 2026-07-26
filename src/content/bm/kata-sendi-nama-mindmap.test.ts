import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import {
  getChapter,
  getChaptersForSubject,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import { bahasaMelayuKataSendiNamaMindMap } from "./kata-sendi-nama-mindmap";

const forms = ["Form 1", "Form 3"] as const;
const description =
  "Perkataan yang hadir di hadapan kata nama atau frasa nama untuk menunjukkan tempat, arah, masa atau hubungan.";

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function flattenContent(node: MindNode): string[] {
  return [
    node.label,
    ...(node.summary ? [node.summary] : []),
    ...(node.children?.flatMap(flattenContent) ?? []),
  ];
}

describe("Bahasa Melayu Kata Sendi Nama mind map", () => {
  it.each(forms)("registers one shared Kata Sendi Nama source for %s", (form) => {
    const chapter = getChapter("bm", "Kata Sendi Nama", undefined, form);

    expect(chapter).toMatchObject({
      title: "Kata Sendi Nama",
      description,
      categoryLabel: "Tatabahasa",
    });
    expect(chapter?.mindMap).toEqual({
      data: bahasaMelayuKataSendiNamaMindMap,
      title: "Kata Sendi Nama",
    });
    expect(hasFormResourceContent("bm", form, "mindMap")).toBe(true);
  });

  it.each(forms)("appears fifth in the active Tatabahasa library for %s", (form) => {
    const topics = getRegisteredSubjectChapters("bm", undefined, form)
      .filter((chapter) => getChapter("bm", chapter.key, undefined, form)?.mindMap)
      .slice(0, 5);

    expect(topics.map((topic) => topic.key)).toEqual([
      "Kata Nama",
      "Kata Ganti Nama",
      "Kata Kerja",
      "Kata Adjektif",
      "Kata Sendi Nama",
    ]);
    expect(topics[4]).toMatchObject({
      label: "Kata Sendi Nama",
      description,
      categoryLabel: "Tatabahasa",
      available: true,
      selectable: true,
    });
  });

  it("uses stable registry IDs for the two applicable forms", () => {
    expect(
      getChaptersForSubject("bm")
        .filter((chapter) => chapter.chapterKey === "Kata Sendi Nama")
        .map((chapter) => chapter.id),
    ).toEqual(["bm-f1-kata-sendi-nama-mindmap", "bm-f3-kata-sendi-nama-mindmap"]);
  });

  it("contains the required central summary and ten title-only branches", () => {
    expect(bahasaMelayuKataSendiNamaMindMap.summary).toBe(
      "Perkataan yang hadir di hadapan kata nama atau frasa nama untuk membentuk Frasa Sendi Nama.",
    );
    expect(bahasaMelayuKataSendiNamaMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Golongan Kata",
      "di",
      "dari / daripada",
      "ke / kepada",
      "hingga",
      "Frasa Sendi Nama",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuKataSendiNamaMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("includes exam-safe comparisons, formulae and sentence analysis", () => {
    const content = flattenContent(bahasaMelayuKataSendiNamaMindMap).join("\n");

    expect(content).toContain("Gunakan rumus ATM: Arah, Tempat, Masa.");
    expect(content).toContain(
      "Digunakan untuk hubungan yang melibatkan manusia, haiwan, benda, sumber atau asal, perbandingan, dan sebahagian daripada keseluruhan.",
    );
    expect(content).toContain(
      "Menunjukkan penerima, sasaran yang melibatkan orang atau pihak, rujukan, hubungan, atau sasaran abstrak tertentu mengikut penggunaan baku.",
    );
    expect(content).toContain(
      "Frasa Nama + Frasa Sendi Nama (FN + FS). Dalam pola ayat dasar ini, Frasa Sendi Nama boleh berfungsi sebagai predikat.",
    );
    expect(content).toContain("Frasa Nama / Subjek: Mereka");
    expect(content).toContain("Frasa Sendi Nama / Predikat: ke hospital");
    expect(content).toContain(
      "di + tempat biasanya ditulis terpisah; di- + kata kerja pasif ditulis bersama.",
    );
    expect(content).not.toContain("daripada hanya untuk orang");
    expect(content).not.toContain("kepada hanya untuk orang");
    expect(content).not.toContain("sentiasa berfungsi sebagai predikat");
  });

  it("keeps related topics as labels and every node ID unique", () => {
    const nodes = collectNodes(bahasaMelayuKataSendiNamaMindMap);
    const relatedTopics = nodes.find((node) => node.label === "Topik Berkaitan");

    expect(relatedTopics?.summary).toBe("Kata Tugas • Frasa Sendi Nama • Imbuhan • Ejaan");
    expect(relatedTopics?.children).toBeUndefined();
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
  });

  it("does not repeat a parent's content in any direct child", () => {
    collectNodes(bahasaMelayuKataSendiNamaMindMap).forEach((parent) => {
      const parentContent = [parent.label, parent.summary].filter(Boolean);
      parent.children?.forEach((child) => {
        expect(parentContent).not.toContain(child.label);
        if (child.summary) {
          expect(parentContent).not.toContain(child.summary);
        }
      });
    });
  });
});
