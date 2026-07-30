import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import {
  getChapter,
  getChaptersForSubject,
  getRegisteredSubjectChapters,
  hasResourceContent,
} from "@/content/registry";
import { bahasaMelayuForm2AyatTunggalMindMap } from "./ayat-tunggal-form2-mindmap";

const form1Topics = [
  "Kata Nama",
  "Kata Ganti Nama",
  "Kata Kerja",
  "Kata Adjektif",
  "Kata Sendi Nama",
  "Kata Hubung",
  "Kata Bilangan",
  "Penjodoh Bilangan",
  "Imbuhan",
] as const;

const form2Topics = [
  "Frasa Nama",
  "Frasa Kerja",
  "Frasa Adjektif",
  "Ayat Aktif",
  "Ayat Pasif",
  "Ayat Tunggal",
  "Ayat Majmuk",
  "Imbuhan Lanjutan",
  "Kata Pemeri",
  "Kesalahan Tatabahasa Lazim",
] as const;

const removedForm2Topics = [
  "Frasa Sendi Nama",
  "Klausa",
  "Pola Ayat Dasar",
  "Subjek dan Predikat",
  "Ragam Ayat",
] as const;

function tatabahasaTopics(form: "Form 1" | "Form 2" | "Form 3") {
  return getRegisteredSubjectChapters("bm", undefined, form).filter(
    (chapter) => chapter.categoryLabel === "Tatabahasa",
  );
}

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function flattenContent(node: MindNode) {
  return collectNodes(node)
    .flatMap((item) => [item.label, item.summary].filter(Boolean))
    .join("\n");
}

function branch(label: string) {
  return bahasaMelayuForm2AyatTunggalMindMap.children?.find(
    (candidate) => candidate.label === label,
  );
}

describe("Bahasa Melayu Form 2 Ayat Tunggal mind map", () => {
  it("registers ten active Form 2 cards alongside the dedicated Forms 1 and 3 registries", () => {
    expect(tatabahasaTopics("Form 1").map((topic) => topic.key)).toEqual(form1Topics);
    expect(tatabahasaTopics("Form 3").map((topic) => topic.key)).toEqual([
      "Jenis Ayat",
      "Ragam Ayat",
      "Cakap Ajuk dan Cakap Pindah",
    ]);

    const topics = tatabahasaTopics("Form 2");
    expect(topics.map((topic) => topic.key)).toEqual(form2Topics);
    expect(topics.every((topic) => topic.available && topic.selectable)).toBe(true);
    removedForm2Topics.forEach((key) => {
      expect(getChapter("bm", key, undefined, "Form 2")).toBeUndefined();
    });
  });

  it("registers the exact Ayat Tunggal card and only its mind-map resource", () => {
    const chapter = getChapter("bm", "Ayat Tunggal", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-ayat-tunggal-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Ayat Tunggal",
      title: "Ayat Tunggal",
      description:
        "Ayat yang mempunyai satu subjek dan satu predikat serta menyampaikan satu maksud yang lengkap.",
      categoryLabel: "Tatabahasa",
      mindMap: {
        data: bahasaMelayuForm2AyatTunggalMindMap,
        title: "Ayat Tunggal",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Ayat Tunggal", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
  });

  it("keeps Ayat Tunggal exclusive to Form 2 and directly before Ayat Majmuk", () => {
    expect(getChapter("bm", "Ayat Tunggal", undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", "Ayat Tunggal", undefined, "Form 3")).toBeUndefined();

    const ids = getChaptersForSubject("bm", undefined, "Form 2")
      .filter((chapter) => chapter.categoryLabel === "Tatabahasa")
      .map((chapter) => chapter.id);
    expect(ids.slice(-5)).toEqual([
      "bm-f2-ayat-tunggal-mindmap",
      "bm-f2-ayat-majmuk-mindmap",
      "bm-f2-imbuhan-lanjutan-mindmap",
      "bm-f2-kata-pemeri-mindmap",
      "bm-f2-kesalahan-tatabahasa-lazim-mindmap",
    ]);
  });

  it("contains the exact identity and eleven title-only first-level branches", () => {
    expect(bahasaMelayuForm2AyatTunggalMindMap).toMatchObject({
      id: "bm-f2-ayat-tunggal-root",
      label: "AYAT TUNGGAL",
      summary:
        "Ayat tunggal ialah ayat yang mempunyai satu subjek dan satu predikat serta membawa satu maksud yang lengkap.",
    });
    expect(bahasaMelayuForm2AyatTunggalMindMap.children?.map((item) => item.label)).toEqual([
      "Definisi",
      "Subjek dan Predikat",
      "Pola Ayat Dasar",
      "Susunan Biasa",
      "Susunan Songsang",
      "Jenis Ayat Tunggal",
      "Pencerakinan",
      "Bezakan dengan Ayat Majmuk",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuForm2AyatTunggalMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches complete subject and predicate boundaries without a one-word simplification", () => {
    const content = flattenContent(bahasaMelayuForm2AyatTunggalMindMap);

    expect(content).toContain('"Murid itu membaca buku."');
    expect(content).toContain('"Rumah besar di hujung jalan itu telah dijual."');
    expect(content).toContain("Rumah besar di hujung jalan itu");
    expect(content).toContain("telah dijual");
    expect(content).toContain(
      "Subjek boleh terdiri daripada satu perkataan atau seluruh frasa nama, bukan semestinya satu perkataan sahaja.",
    );
  });

  it("includes all four basic patterns, including FN + FN", () => {
    const labels = branch("Pola Ayat Dasar")?.children?.map((item) => item.label);
    const content = flattenContent(branch("Pola Ayat Dasar")!);

    expect(labels).toEqual(["FN + FN", "FN + FK", "FN + FA", "FN + FS", "Nota"]);
    expect(content).toContain('"Abang saya seorang doktor."');
    expect(content).toContain('"Ameer dan Nazeem menziarahi Ganesan di hospital."');
    expect(content).toContain('"Cuaca hari ini sangat indah."');
    expect(content).toContain('"Mereka ke hospital."');
  });

  it("distinguishes ordinary and inverted order without permitting random reversal", () => {
    const content = flattenContent(bahasaMelayuForm2AyatTunggalMindMap);

    expect(content).toContain('"Pelajar itu sangat rajin."');
    expect(content).toContain('"Sangat rajin pelajar itu."');
    expect(content).toContain('"Di dalam kelas mereka belajar."');
    expect(content).toContain(
      "Pembalikan kata secara rawak tidak menghasilkan ayat songsang yang gramatis. Maksud dan tatabahasa ayat mesti kekal jelas.",
    );
    expect(content).toContain('"Buku membaca Ali."');
  });

  it("keeps sentence structure, purpose and predicate pattern as separate classifications", () => {
    const content = flattenContent(branch("Jenis Ayat Tunggal")!);

    expect(content).toContain('"Ali membaca buku."');
    expect(content).toContain('"Adakah Ali membaca buku?"');
    expect(content).toContain('"Bacalah buku itu."');
    expect(content).toContain('"Wah, cantiknya pemandangan itu!"');
    expect(content).toContain(
      "Sesuatu ayat boleh kekal sebagai ayat tunggal dan pada masa yang sama dikelaskan mengikut tujuan sebagai ayat penyata, tanya, perintah atau seruan.",
    );
  });

  it("teaches complete, meaning-preserving pencerakinan", () => {
    const content = flattenContent(branch("Pencerakinan")!);

    expect(content).toContain('"Ali membaca buku dan Siti menulis karangan."');
    expect(content).toContain('"Ali membaca buku."');
    expect(content).toContain('"Siti menulis karangan."');
    expect(content).toContain('"Amir membaca buku itu di rumah."');
    expect(content).toContain(
      "Subjek yang digugurkan dalam klausa kedua mungkin perlu dinyatakan semula supaya hasil pencerakinan menjadi ayat yang lengkap.",
    );
    expect(content).toContain(
      "Jangan memotong ayat secara mekanikal pada setiap kata hubung. Pastikan setiap hasil ialah ayat yang lengkap, gramatis dan mengekalkan maksud.",
    );
  });

  it("does not classify sentences by length or conjunction alone", () => {
    const content = flattenContent(branch("Bezakan dengan Ayat Majmuk")!);

    expect(content).toContain(
      "Panjang ayat sahaja bukan penentu sama ada sesuatu ayat ialah ayat tunggal atau ayat majmuk.",
    );
    expect(content).toContain(
      '"Murid yang rajin itu sedang membaca buku sejarah di perpustakaan sekolah."',
    );
    expect(content).toContain(
      "Kehadiran kata hubung tidak bermaksud setiap ayat mesti dianalisis dengan cara yang sama; semak fungsi dan struktur dalam konteks.",
    );
  });

  it("uses UASA terminology and includes the required correction checks", () => {
    const content = flattenContent(bahasaMelayuForm2AyatTunggalMindMap);

    expect(content).toContain("Tip UASA");
    expect(content).not.toContain("Tip SPM");
    expect(content).toContain('"Sedang membaca buku."');
    expect(content).toContain('"Farah sedang membaca buku."');
    expect(content).toContain("FN + FS");
    expect(content).toContain("FN + FK");
    expect(content).toContain('"Ali membeli buku itu."');
    expect(content).toContain('"Ali membaca buku itu."');
  });

  it("gives every node a unique ID without direct parent-child duplication", () => {
    const nodes = collectNodes(bahasaMelayuForm2AyatTunggalMindMap);

    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    nodes.forEach((parent) => {
      const parentContent = [parent.label, parent.summary].filter(Boolean);
      parent.children?.forEach((child) => {
        expect(parentContent).not.toContain(child.label);
        if (child.summary) expect(parentContent).not.toContain(child.summary);
      });
    });
  });
});
