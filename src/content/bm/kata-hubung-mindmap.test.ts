import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import {
  getChapter,
  getChaptersForSubject,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import { bahasaMelayuKataHubungMindMap } from "./kata-hubung-mindmap";

const forms = ["Form 1"] as const;
const description =
  "Perkataan yang menghubungkan kata, frasa atau klausa untuk membentuk ayat yang gramatis.";

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

describe("Bahasa Melayu Kata Hubung mind map", () => {
  it.each(forms)("registers one shared Kata Hubung source for %s", (form) => {
    const chapter = getChapter("bm", "Kata Hubung", undefined, form);

    expect(chapter).toMatchObject({
      title: "Kata Hubung",
      description,
      categoryLabel: "Tatabahasa",
    });
    expect(chapter?.mindMap).toEqual({
      data: bahasaMelayuKataHubungMindMap,
      title: "Kata Hubung",
    });
    expect(hasFormResourceContent("bm", form, "mindMap")).toBe(true);
  });

  it.each(forms)("appears sixth in the active Tatabahasa library for %s", (form) => {
    const topics = getRegisteredSubjectChapters("bm", undefined, form)
      .filter((chapter) => getChapter("bm", chapter.key, undefined, form)?.mindMap)
      .slice(0, 6);

    expect(topics.map((topic) => topic.key)).toEqual([
      "Kata Nama",
      "Kata Ganti Nama",
      "Kata Kerja",
      "Kata Adjektif",
      "Kata Sendi Nama",
      "Kata Hubung",
    ]);
    expect(topics[5]).toMatchObject({
      label: "Kata Hubung",
      description,
      categoryLabel: "Tatabahasa",
      available: true,
      selectable: true,
    });
  });

  it("uses the stable Form 1 registry ID", () => {
    expect(
      getChaptersForSubject("bm")
        .filter((chapter) => chapter.chapterKey === "Kata Hubung")
        .map((chapter) => chapter.id),
    ).toEqual(["bm-f1-kata-hubung-mindmap"]);
  });

  it("contains the required central summary and eight title-only branches", () => {
    expect(bahasaMelayuKataHubungMindMap.summary).toBe(
      "Perkataan yang menghubungkan kata, frasa atau klausa dalam sesuatu ayat.",
    );
    expect(bahasaMelayuKataHubungMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Fungsi",
      "Jenis Kata Hubung",
      "Dalam Ayat Majmuk",
      "Penanda Wacana",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuKataHubungMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("groups conjunctions by function with the required examples", () => {
    const types = bahasaMelayuKataHubungMindMap.children?.find(
      (branch) => branch.label === "Jenis Kata Hubung",
    );
    const categories = types?.children ?? [];

    expect(categories.map((category) => category.label)).toEqual([
      "Gabungan",
      "Pilihan",
      "Sebab",
      "Tujuan",
      "Pertentangan",
      "Perbandingan",
    ]);
    expect(categories.map((category) => category.summary)).toEqual([
      "dan • serta",
      "atau",
      "kerana",
      "agar • supaya",
      "tetapi • namun",
      "manakala",
    ]);

    const content = flattenContent(types!).join("\n");
    expect(content).toContain('"Siti dan Amin bermain bola."');
    expect(content).toContain('"Ali memilih teh atau kopi."');
    expect(content).toContain('"Aina belajar bersungguh-sungguh kerana ingin berjaya."');
    expect(content).toContain('"Dia belajar supaya lulus peperiksaan."');
    expect(content).toContain('"Dia rajin tetapi masih rendah keyakinan."');
    expect(content).toContain('"Ali bermain bola manakala Abu membaca buku."');
  });

  it("keeps the ayat majmuk and penanda wacana guidance exam-safe", () => {
    const content = flattenContent(bahasaMelayuKataHubungMindMap).join("\n");

    expect(content).toContain(
      "Kata hubung membantu membentuk Ayat Majmuk, tetapi tidak semua ayat majmuk mesti mempunyai kata hubung yang dinyatakan.",
    );
    expect(content).toContain("Ayat Tunggal + Ayat Tunggal → Ayat Majmuk");
    expect(content).toContain("Ali belajar kerana ingin berjaya.");
    expect(content).toContain("Siti membaca buku manakala Aisyah menulis nota.");
    expect(content).toContain(
      "Penanda wacana dan kata hubung mempunyai fungsi yang berbeza, tetapi kedua-duanya membantu menghasilkan penulisan yang lebih lancar.",
    );
    expect(content).toContain("Topik Penanda Wacana akan dipelajari secara berasingan.");
    expect(content).not.toContain("semua penanda wacana ialah kata hubung");
    expect(content).not.toContain("semua kata hubung boleh saling menggantikan");
  });

  it("contains no dead-link node and gives every node a unique ID", () => {
    const nodes = collectNodes(bahasaMelayuKataHubungMindMap);
    const separateTopic = nodes.find(
      (node) => node.summary === "Topik Penanda Wacana akan dipelajari secara berasingan.",
    );

    expect(separateTopic?.children).toBeUndefined();
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
  });

  it("does not repeat a parent's content in any direct child", () => {
    collectNodes(bahasaMelayuKataHubungMindMap).forEach((parent) => {
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
