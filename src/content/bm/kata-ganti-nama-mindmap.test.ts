import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import {
  getChapter,
  getChaptersForSubject,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import { bahasaMelayuKataGantiNamaMindMap } from "./kata-ganti-nama-mindmap";

const forms = ["Form 1", "Form 2", "Form 3"] as const;
const description =
  "Perkataan yang digunakan untuk menggantikan kata nama supaya ayat tidak berulang.";

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

describe("Bahasa Melayu Kata Ganti Nama mind map", () => {
  it.each(forms)("registers one shared Kata Ganti Nama source for %s", (form) => {
    const chapter = getChapter("bm", "Kata Ganti Nama", undefined, form);

    expect(chapter).toMatchObject({
      title: "Kata Ganti Nama",
      description,
      categoryLabel: "Tatabahasa",
    });
    expect(chapter?.mindMap).toEqual({
      data: bahasaMelayuKataGantiNamaMindMap,
      title: "Kata Ganti Nama",
    });
    expect(hasFormResourceContent("bm", form, "mindMap")).toBe(true);
  });

  it.each(forms)("appears second in the five-topic Tatabahasa library for %s", (form) => {
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
    expect(topics[1]).toMatchObject({
      label: "Kata Ganti Nama",
      description,
      categoryLabel: "Tatabahasa",
      available: true,
      selectable: true,
    });
  });

  it("uses stable registry IDs for the three applicable forms", () => {
    expect(
      getChaptersForSubject("bm")
        .filter((chapter) => chapter.chapterKey === "Kata Ganti Nama")
        .map((chapter) => chapter.id),
    ).toEqual([
      "bm-f1-kata-ganti-nama-mindmap",
      "bm-f2-kata-ganti-nama-mindmap",
      "bm-f3-kata-ganti-nama-mindmap",
    ]);
  });

  it("contains the required central summary and eight title-only branches", () => {
    expect(bahasaMelayuKataGantiNamaMindMap.summary).toBe(
      "Perkataan yang digunakan untuk menggantikan kata nama dalam ayat.",
    );
    expect(bahasaMelayuKataGantiNamaMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Kata Ganti Nama Diri",
      "Kata Ganti Nama Tunjuk",
      "Pemilihan Mengikut Konteks",
      "Bahasa Melayu Standard",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuKataGantiNamaMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("includes contextual, respectful and unambiguous pronoun guidance", () => {
    const content = flattenContent(bahasaMelayuKataGantiNamaMindMap).join("\n");

    expect(content).toContain(
      "Dalam topik asas ini, fokus diberikan kepada Kata Ganti Nama Diri dan Kata Ganti Nama Tunjuk.",
    );
    expect(content).toContain("kami: pendengar tidak termasuk");
    expect(content).toContain("kita: pendengar termasuk");
    expect(content).toContain(
      "Bentuk aku dan engkau bersifat tidak formal; kesesuaiannya bergantung pada hubungan dan konteks.",
    );
    expect(content).toContain(
      'Digunakan dengan hormat untuk seseorang, bukan untuk haiwan atau benda. Contoh: "Beliau ialah guru besar sekolah itu."',
    );
    expect(content).toContain(
      'Dalam ayat "Ali memberitahu Abu bahawa dia akan pergi", kata dia boleh merujuk kepada Ali atau Abu.',
    );
    expect(content).toContain("Topik ini diperkenalkan secara ringkas sebagai persediaan awal.");
    expect(content).not.toContain("Kata Ganti Nama hanya mempunyai dua jenis");
    expect(content).not.toContain("kami dan kita boleh saling menggantikan");
    expect(content).not.toContain("aku sesuai untuk semua keadaan");
  });

  it("includes the required demonstratives and memory comparisons", () => {
    const content = flattenContent(bahasaMelayuKataGantiNamaMindMap).join("\n");

    expect(content).toContain(
      'Menunjukkan sesuatu yang dekat. Contoh: "Hadiah ini daripada siapa?"',
    );
    expect(content).toContain(
      'Menunjukkan sesuatu yang lebih jauh atau telah disebut. Contoh: "Buku itu milik kakak."',
    );
    expect(content).toContain('Tempat yang dekat dengan penutur. Contoh: "Duduklah di sini."');
    expect(content).toContain("yang bercakap");
    expect(content).toContain("yang diajak bercakap");
    expect(content).toContain("yang diperkatakan");
  });

  it("keeps every node ID unique and avoids direct parent-child duplication", () => {
    const nodes = collectNodes(bahasaMelayuKataGantiNamaMindMap);

    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    nodes.forEach((parent) => {
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
