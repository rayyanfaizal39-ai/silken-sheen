import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm2AyatPasifMindMap } from "./ayat-pasif-form2-mindmap";

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

function flattenContent(node: MindNode): string {
  return collectNodes(node)
    .flatMap((item) => [item.label, item.summary].filter(Boolean))
    .join("\n");
}

describe("Bahasa Melayu Form 2 Ayat Pasif mind map", () => {
  it("keeps all ten Form 2 cards active alongside the dedicated Forms 1 and 3 registries", () => {
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

  it("registers the exact Ayat Pasif card and only its mind-map resource", () => {
    const chapter = getChapter("bm", "Ayat Pasif", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-ayat-pasif-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Ayat Pasif",
      title: "Ayat Pasif",
      description:
        "Ayat yang mengutamakan benda atau pihak yang menerima perbuatan, manakala pelaku dinyatakan kemudian atau difahami melalui konteks.",
      categoryLabel: "Tatabahasa",
      mindMap: {
        data: bahasaMelayuForm2AyatPasifMindMap,
        title: "Ayat Pasif",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Ayat Pasif", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
  });

  it("keeps Ayat Pasif exclusive to Form 2", () => {
    expect(getChapter("bm", "Ayat Pasif", undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", "Ayat Pasif", undefined, "Form 3")).toBeUndefined();
  });

  it("contains the exact identity and eleven title-only first-level branches", () => {
    expect(bahasaMelayuForm2AyatPasifMindMap).toMatchObject({
      id: "bm-f2-ayat-pasif-root",
      label: "AYAT PASIF",
      summary:
        "Ayat pasif ialah ayat yang memberikan penekanan kepada objek atau pihak yang menerima sesuatu perbuatan.",
    });
    expect(bahasaMelayuForm2AyatPasifMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Ayat Aktif dan Pasif",
      "Pasif Diri Pertama",
      "Pasif Diri Kedua",
      "Pasif Diri Ketiga",
      "Pasif Berimbuhan ter-",
      "Pasif Berimbuhan ke-...-an",
      "Penukaran Ayat",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuForm2AyatPasifMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches distinct standard patterns for first, second and third person", () => {
    const content = flattenContent(bahasaMelayuForm2AyatPasifMindMap);

    expect(content).toContain('"Buku itu saya baca."');
    expect(content).toContain('"Buku itu awak baca."');
    expect(content).toContain('"Buku itu dibaca oleh Ali."');
    expect(content).toContain(
      "Dalam pola pasif diri pertama atau kedua yang standard, jangan letakkan awalan di- pada kata kerja.",
    );
    expect(content).toContain(
      "Pasif diri pertama dan kedua menggunakan pola standard yang berbeza daripada pasif diri ketiga.",
    );
  });

  it('explains third-person "oleh", di- spelling and the preposition di accurately', () => {
    const content = flattenContent(bahasaMelayuForm2AyatPasifMindMap);

    expect(content).toContain('"Pintu itu telah dikunci."');
    expect(content).toContain('Perkataan "oleh" bukan unsur wajib dalam setiap ayat pasif.');
    expect(content).toContain("dibaca • ditulis • dihantar");
    expect(content).toContain("di baca • di tulis • di hantar");
    expect(content).toContain("Awalan di- ditulis serangkai dengan kata kerja.");
    expect(content).toContain("Kata sendi nama di ditulis terpisah: di sekolah • di rumah");
  });

  it("preserves kata bantu and uses only object-bearing transitives for direct conversions", () => {
    const content = flattenContent(bahasaMelayuForm2AyatPasifMindMap);

    expect(content).toContain('"Saya telah menyiapkan tugasan itu."');
    expect(content).toContain('"Tugasan itu telah saya siapkan."');
    expect(content).toContain('"Mereka telah menyiapkan projek itu."');
    expect(content).toContain('"Projek itu telah disiapkan oleh mereka."');
    expect(content).toContain(
      "Gunakan ayat aktif transitif yang mempunyai objek untuk latihan penukaran aktif kepada pasif secara langsung.",
    );
  });

  it("treats ter- and ke-...-an as contextual constructions without overgeneralising", () => {
    const content = flattenContent(bahasaMelayuForm2AyatPasifMindMap);

    expect(content).toContain(
      "Bukan setiap kata kerja berawalan ter- ialah bentuk pasif biasa atau hasil penukaran terus daripada ayat aktif.",
    );
    expect(content).toContain(
      "Bukan setiap perkataan berimbuhan ke-...-an ialah kata kerja pasif biasa.",
    );
    expect(content).toContain(
      "Binaan ini tidak semestinya boleh ditukar menggunakan rumus pasif berawalan di-.",
    );
  });

  it("includes the required corrections and UASA terminology", () => {
    const content = flattenContent(bahasaMelayuForm2AyatPasifMindMap);

    expect(content).toContain('"Buku itu saya membaca."');
    expect(content).toContain('"Buku itu saya baca."');
    expect(content).toContain('"Buku itu di baca oleh Ali."');
    expect(content).toContain('"Buku itu dibaca oleh Ali."');
    expect(content).toContain("Tip UASA");
    expect(content).not.toContain("Tip SPM");
  });

  it("gives every node a unique ID", () => {
    const nodes = collectNodes(bahasaMelayuForm2AyatPasifMindMap);

    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
  });

  it("does not duplicate direct parent content in child nodes", () => {
    collectNodes(bahasaMelayuForm2AyatPasifMindMap).forEach((parent) => {
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
