import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm2FrasaAdjektifMindMap } from "./frasa-adjektif-form2-mindmap";
import { bahasaMelayuForm2FrasaKerjaMindMap } from "./frasa-kerja-form2-mindmap";
import { bahasaMelayuForm2FrasaNamaMindMap } from "./frasa-nama-form2-mindmap";

const form2Topics = [
  "Frasa Nama",
  "Frasa Kerja",
  "Frasa Adjektif",
  "Ayat Aktif",
  "Ayat Pasif",
  "Ayat Tunggal",
] as const;

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

describe("Bahasa Melayu Form 2 Frasa Kerja mind map", () => {
  it("registers exactly six Form 2 topic cards with the required active states", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (chapter) => chapter.categoryLabel === "Tatabahasa",
    );

    expect(topics.map((topic) => topic.key)).toEqual(form2Topics);
    expect(topics.map((topic) => topic.available)).toEqual([true, true, true, true, true, true]);
    expect(topics.map((topic) => topic.selectable)).toEqual([true, true, true, true, true, true]);
  });

  it("registers the exact Frasa Kerja card and typed mind-map source", () => {
    const chapter = getChapter("bm", "Frasa Kerja", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-frasa-kerja-mindmap",
      subjectId: "bm",
      form: "Form 2",
      title: "Frasa Kerja",
      description:
        "Binaan yang mempunyai kata kerja sebagai inti dan lazimnya berfungsi sebagai predikat dalam ayat.",
      categoryLabel: "Tatabahasa",
      mindMap: {
        data: bahasaMelayuForm2FrasaKerjaMindMap,
        title: "Frasa Kerja",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Frasa Kerja", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("video");
  });

  it("keeps Frasa Kerja exclusive to Form 2", () => {
    expect(getChapter("bm", "Frasa Kerja", undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", "Frasa Kerja", undefined, "Form 3")).toBeUndefined();
  });

  it("keeps Frasa Nama and Frasa Adjektif active without adding unrelated resources", () => {
    const frasaNama = getChapter("bm", "Frasa Nama", undefined, "Form 2");
    const frasaAdjektif = getChapter("bm", "Frasa Adjektif", undefined, "Form 2");

    expect(frasaNama?.mindMap?.data).toBe(bahasaMelayuForm2FrasaNamaMindMap);
    expect(frasaAdjektif).toMatchObject({
      id: "bm-f2-frasa-adjektif-mindmap",
      title: "Frasa Adjektif",
      description:
        "Binaan yang mempunyai kata adjektif sebagai inti dan lazimnya berfungsi sebagai predikat dalam ayat.",
      categoryLabel: "Tatabahasa",
      mindMap: {
        data: bahasaMelayuForm2FrasaAdjektifMindMap,
        title: "Frasa Adjektif",
      },
    });
    expect(frasaAdjektif).not.toHaveProperty("notes");
    expect(frasaAdjektif).not.toHaveProperty("quiz");
    expect(frasaAdjektif).not.toHaveProperty("flashcards");
    expect(frasaAdjektif).not.toHaveProperty("video");
  });

  it("contains the exact identity and twelve title-only first-level branches", () => {
    expect(bahasaMelayuForm2FrasaKerjaMindMap).toMatchObject({
      id: "bm-f2-frasa-kerja-root",
      label: "FRASA KERJA",
      summary:
        "Frasa kerja ialah binaan yang terdiri daripada satu atau beberapa perkataan dengan kata kerja sebagai intinya.",
    });
    expect(bahasaMelayuForm2FrasaKerjaMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Fungsi",
      "Struktur",
      "Kata Kerja Inti",
      "Dengan Kata Bantu",
      "Dengan Objek",
      "Dengan Pelengkap",
      "Pola FN + FK",
      "Bezakan Jenis Frasa",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuForm2FrasaKerjaMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches phrase structure instead of duplicating the Form 1 Kata Kerja word-class lesson", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaKerjaMindMap).join("\n");

    expect(content).toContain("kata kerja sebagai intinya");
    expect(content).toContain(
      "Frasa kerja ialah salah satu binaan utama yang digunakan untuk membentuk ayat tunggal",
    );
    expect(content).toContain("Frasa Kerja = Kata Kerja Inti + Unsur Tambahan");
    expect(content).not.toContain("Kata Kerja Transitif Aktif");
    expect(content).not.toContain("Kata Kerja Transitif Pasif");
    expect(bahasaMelayuForm2FrasaKerjaMindMap.label).not.toBe("KATA KERJA");
  });

  it("explains the verb core without mistaking an auxiliary for the core", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaKerjaMindMap).join("\n");

    expect(content).toContain('"Mereka sedang bermain bola di padang."');
    expect(content).toContain("sedang bermain bola di padang");
    expect(content).toContain("bermain");
    expect(content).toContain("sudah merancang untuk berjoging di taman rekreasi");
    expect(content).toContain("Bukan Kata Kerja Inti");
    expect(content).toContain("merancang");
    expect(content).toContain(
      "Kata bantu menambah makna pada kata kerja tetapi bukan kata kerja inti",
    );
  });

  it("covers single verbs, auxiliaries, objects, complements, and contextual structure", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaKerjaMindMap).join("\n");

    expect(content).toContain("duduk • tidur • tersenyum");
    expect(content).toContain("sedang belajar • sudah pulang • akan bertolak • pernah melawat");
    expect(content).toContain("membaca buku • menendang bola • menulis karangan");
    expect(content).toContain("menjadi guru • tinggal di kampung • beransur pulih");
    expect(content).toContain(
      "Struktur tepat sesuatu frasa kerja bergantung pada jenis kata kerja dan konteks ayat.",
    );
  });

  it("distinguishes aspect and modal auxiliaries while keeping the lesson focused", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaKerjaMindMap).join("\n");

    expect(content).toContain("sudah • telah • sedang • masih • akan • belum • pernah");
    expect(content).toContain("mahu belajar • boleh berenang • mesti hadir • harus mematuhi");
    expect(content).toContain(
      '"Ameer dan Nazeem sudah merancang untuk berjoging di taman rekreasi."',
    );
    expect(content).toContain("Predikat / FK");
  });

  it("distinguishes objects, complements, and place-related information accurately", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaKerjaMindMap).join("\n");

    expect(content).toContain("Kata kerja transitif memerlukan objek");
    expect(content).toContain('"Siti membaca sebuah novel."');
    expect(content).toContain("sebuah novel");
    expect(content).toContain('"Ameer dan Nazeem menziarahi Ganesan di hospital."');
    expect(content).toContain("Ganesan");
    expect(content).toContain("di hospital");
    expect(content).toContain("Bukan setiap frasa yang hadir selepas kata kerja ialah objek");
    expect(content).toContain("Sesetengah kata kerja tak transitif memerlukan pelengkap");
    expect(content).toContain('"Abangnya menjadi doktor."');
    expect(content).toContain(
      "Jangan anggap setiap frasa sendi nama selepas kata kerja sebagai pelengkap.",
    );
  });

  it("explains FN + FK through three complete and accurately identified examples", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaKerjaMindMap).join("\n");

    expect(content).toContain("Ayat mempunyai frasa nama sebagai subjek");
    expect(content).toContain("menziarahi Ganesan di hospital");
    expect(content).toContain("sudah merancang untuk berjoging di taman rekreasi");
    expect(content).toContain('"Adik sedang tidur."');
    expect(content).toContain("Frasa Nama + Frasa Kerja • Subjek + Predikat");
  });

  it("clearly distinguishes verb, prepositional, adjective, and noun phrases", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaKerjaMindMap).join("\n");

    expect(content).toContain('"Mereka pergi ke hospital."');
    expect(content).toContain('Intinya ialah kata kerja "pergi".');
    expect(content).toContain('"Mereka ke hospital."');
    expect(content).toContain('Tiada kata kerja; frasa ini bermula dengan kata sendi nama "ke".');
    expect(content).toContain('"Mereka sangat letih."');
    expect(content).toContain('Intinya ialah kata adjektif "letih".');
    expect(content).toContain('"Mereka pelajar Tingkatan Dua."');
    expect(content).toContain('Intinya ialah kata nama "pelajar".');
  });

  it("includes the required common errors and UASA workflow", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaKerjaMindMap).join("\n");

    expect(content).toContain("sedang membaca buku di perpustakaan");
    expect(content).toContain("Salah: sedang • Betul, kata kerja inti: membaca");
    expect(content).toContain('"Dia tidur di bilik."');
    expect(content).toContain('"Farah sedang membaca buku."');
    expect(content).toContain("Cari Subjek");
    expect(content).toContain("Ambil Keseluruhan Predikat");
    expect(content).toContain('"Mereka ke hospital."');
    expect(content).toContain('"Mereka pergi ke hospital."');
    expect(content).not.toContain("Tip SPM");
  });

  it("gives every node a unique ID", () => {
    const nodes = collectNodes(bahasaMelayuForm2FrasaKerjaMindMap);

    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
  });

  it("does not duplicate direct parent content in child nodes", () => {
    collectNodes(bahasaMelayuForm2FrasaKerjaMindMap).forEach((parent) => {
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
