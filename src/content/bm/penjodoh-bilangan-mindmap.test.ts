import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import {
  getChapter,
  getChaptersForSubject,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import { bahasaMelayuPenjodohBilanganMindMap } from "./penjodoh-bilangan-mindmap";

const forms = ["Form 1", "Form 2", "Form 3"] as const;
const description =
  "Perkataan yang digunakan bersama kata bilangan untuk membilang manusia, haiwan atau benda mengikut bentuk dan sifatnya.";

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

describe("Bahasa Melayu Penjodoh Bilangan mind map", () => {
  it.each(forms)("registers one shared Penjodoh Bilangan source for %s", (form) => {
    const chapter = getChapter("bm", "Penjodoh Bilangan", undefined, form);

    expect(chapter).toMatchObject({
      title: "Penjodoh Bilangan",
      description,
      categoryLabel: "Tatabahasa",
    });
    expect(chapter?.mindMap).toEqual({
      data: bahasaMelayuPenjodohBilanganMindMap,
      title: "Penjodoh Bilangan",
    });
    expect(hasFormResourceContent("bm", form, "mindMap")).toBe(true);
  });

  it.each(forms)("appears seventh in the active Tatabahasa library for %s", (form) => {
    const topics = getRegisteredSubjectChapters("bm", undefined, form)
      .filter((chapter) => getChapter("bm", chapter.key, undefined, form)?.mindMap)
      .slice(0, 7);

    expect(topics.map((topic) => topic.key)).toEqual([
      "Kata Nama",
      "Kata Ganti Nama",
      "Kata Kerja",
      "Kata Adjektif",
      "Kata Sendi Nama",
      "Kata Hubung",
      "Penjodoh Bilangan",
    ]);
    expect(topics[6]).toMatchObject({
      label: "Penjodoh Bilangan",
      description,
      categoryLabel: "Tatabahasa",
      available: true,
      selectable: true,
    });
  });

  it("uses stable registry IDs for the three applicable forms", () => {
    expect(
      getChaptersForSubject("bm")
        .filter((chapter) => chapter.chapterKey === "Penjodoh Bilangan")
        .map((chapter) => chapter.id),
    ).toEqual([
      "bm-f1-penjodoh-bilangan-mindmap",
      "bm-f2-penjodoh-bilangan-mindmap",
      "bm-f3-penjodoh-bilangan-mindmap",
    ]);
  });

  it("contains the required central summary and eleven title-only branches", () => {
    expect(bahasaMelayuPenjodohBilanganMindMap.summary).toBe(
      "Perkataan yang digunakan bersama kata bilangan untuk membilang kata nama konkrit.",
    );
    expect(bahasaMelayuPenjodohBilanganMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Cara Penggunaan",
      "Manusia",
      "Haiwan",
      "Benda Berpasangan",
      "Benda Mengikut Bentuk",
      "Kumpulan",
      "Benda Umum dan Tempat",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuPenjodohBilanganMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("contains the structural formula and identifies every part of sebuah rumah", () => {
    const content = flattenContent(bahasaMelayuPenjodohBilanganMindMap).join("\n");

    expect(content).toContain("Kata Bilangan + Penjodoh Bilangan + Kata Nama");
    expect(content).toContain("Contoh: sebuah rumah");
    expect(content).toContain("Kata bilangan: se-");
    expect(content).toContain("Penjodoh bilangan: buah");
    expect(content).toContain("Kata nama: rumah");
  });

  it("includes every required classifier with familiar examples", () => {
    const content = flattenContent(bahasaMelayuPenjodohBilanganMindMap).join("\n");

    [
      "seorang guru",
      "seekor kucing",
      "sepasang kasut",
      "sehelai kertas",
      "sebatang pensel",
      "sebatang jalan",
      "sebilah pisau",
      "seutas tali",
      "sekeping gambar",
      "sebutir mutiara",
      "sebiji epal",
      "sekumpulan murid",
      "sekawanan lembu",
      "segerombolan penjahat",
      "sebuah negara",
      "sebuah karangan",
    ].forEach((example) => expect(content.toLowerCase()).toContain(example));
  });

  it("explains classifier distinctions and cautious context rules", () => {
    const content = flattenContent(bahasaMelayuPenjodohBilanganMindMap).join("\n");

    expect(content).toContain(
      "sepasang kasut bermaksud dua kasut yang sepadan dan membentuk satu pasangan; dua kasut hanya membilang dua kasut dan tidak semestinya sepadan.",
    );
    expect(content).toContain(
      "Sesetengah kata nama boleh menerima lebih daripada satu penjodoh bilangan dalam penggunaan sebenar.",
    );
    expect(content).toContain(
      "ekor ialah penjodoh bilangan yang paling lazim untuk haiwan, tetapi konteks sastera atau khusus boleh menggunakan bentuk lain.",
    );
    expect(content).toContain(
      "buah ialah penjodoh bilangan yang luas dan lazim, tetapi gunakan penjodoh bilangan yang lebih khusus apabila penggunaan baku memerlukannya.",
    );
    expect(content).not.toContain("setiap kata nama mesti");
    expect(content).not.toContain("buah betul untuk setiap benda");
    expect(content).not.toContain("setiap kata nama hanya mempunyai satu penjodoh bilangan");
  });

  it("renders incorrect and corrected forms with exam-safe explanations", () => {
    const content = flattenContent(bahasaMelayuPenjodohBilanganMindMap).join("\n");

    expect(content).toContain(
      "Salah: seekor murid, seorang kucing. Betul: seorang murid, seekor kucing.",
    );
    expect(content).toContain("Salah: sehelai pensel. Betul: sebatang pensel.");
    expect(content).toContain("Elakkan: dua orang murid-murid. Gunakan: dua orang murid.");
    expect(content).toContain(
      "Kata bilangan dan penjodoh bilangan biasanya sudah menunjukkan jamak",
    );
    expect(content).not.toContain("NotebookLM");
    expect(content).not.toContain("Tahun 5");
    expect(content).not.toContain("Tahun 6");
  });

  it("gives every node a unique ID", () => {
    const nodes = collectNodes(bahasaMelayuPenjodohBilanganMindMap);

    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
  });

  it("does not repeat a parent's content in any direct child", () => {
    collectNodes(bahasaMelayuPenjodohBilanganMindMap).forEach((parent) => {
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
