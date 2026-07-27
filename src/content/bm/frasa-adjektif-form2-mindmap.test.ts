import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm2FrasaAdjektifMindMap } from "./frasa-adjektif-form2-mindmap";

const form1And3Topics = [
  "Kata Nama",
  "Kata Ganti Nama",
  "Kata Kerja",
  "Kata Adjektif",
  "Kata Sendi Nama",
  "Kata Hubung",
  "Kata Bilangan",
  "Penjodoh Bilangan",
  "Imbuhan",
  "Penanda Wacana",
] as const;

const form2Topics = [
  "Frasa Nama",
  "Frasa Kerja",
  "Frasa Adjektif",
  "Ayat Aktif",
  "Ayat Pasif",
  "Ayat Tunggal",
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

describe("Bahasa Melayu Form 2 Frasa Adjektif mind map", () => {
  it("activates exactly the third Form 2 Tatabahasa card without changing Forms 1 and 3", () => {
    expect(tatabahasaTopics("Form 1").map((topic) => topic.key)).toEqual(form1And3Topics);
    expect(tatabahasaTopics("Form 3").map((topic) => topic.key)).toEqual(form1And3Topics);

    const topics = tatabahasaTopics("Form 2");
    expect(topics.map((topic) => topic.key)).toEqual(form2Topics);
    expect(topics.map((topic) => topic.available)).toEqual([true, true, true, true, true, true]);
    expect(topics.map((topic) => topic.selectable)).toEqual([true, true, true, true, true, true]);
  });

  it("registers the exact Frasa Adjektif card and only its mind-map resource", () => {
    const chapter = getChapter("bm", "Frasa Adjektif", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-frasa-adjektif-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Frasa Adjektif",
      title: "Frasa Adjektif",
      description:
        "Binaan yang mempunyai kata adjektif sebagai inti dan lazimnya berfungsi sebagai predikat dalam ayat.",
      categoryLabel: "Tatabahasa",
      mindMap: {
        data: bahasaMelayuForm2FrasaAdjektifMindMap,
        title: "Frasa Adjektif",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Frasa Adjektif", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
  });

  it("keeps Frasa Adjektif exclusive to Form 2", () => {
    expect(getChapter("bm", "Frasa Adjektif", undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", "Frasa Adjektif", undefined, "Form 3")).toBeUndefined();
  });

  it("contains the exact identity and ten title-only first-level branches", () => {
    expect(bahasaMelayuForm2FrasaAdjektifMindMap).toMatchObject({
      id: "bm-f2-frasa-adjektif-root",
      label: "FRASA ADJEKTIF",
      summary:
        "Frasa adjektif ialah binaan yang terdiri daripada satu atau beberapa perkataan dengan kata adjektif sebagai intinya.",
    });
    expect(bahasaMelayuForm2FrasaAdjektifMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Fungsi",
      "Struktur",
      "Kata Adjektif Inti",
      "Pola FN + FA",
      "Penguat",
      "Bezakan Jenis Frasa",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuForm2FrasaAdjektifMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches adjective-phrase structure rather than repeating word classification", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaAdjektifMindMap);

    expect(content).toContain("kata adjektif sebagai intinya");
    expect(content).toContain("Kata Adjektif Sahaja");
    expect(content).toContain("Penguat + Kata Adjektif");
    expect(content).toContain("Kata Adjektif + Pelengkap");
    expect(content).toContain("Frasa Adjektif = Kata Adjektif Inti + Unsur Tambahan");
    expect(content).not.toContain("Kata Adjektif Pancaindera");
    expect(content).not.toContain("Kata Adjektif Warna");
    expect(bahasaMelayuForm2FrasaAdjektifMindMap.label).not.toBe("KATA ADJEKTIF");
  });

  it("explains the adjective core and optional intensifier accurately", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaAdjektifMindMap);

    expect(content).toContain('"Cuaca hari ini sangat indah."');
    expect(content).toContain("Frasa Adjektif");
    expect(content).toContain("sangat indah");
    expect(content).toContain("Kata Adjektif Inti");
    expect(content).toContain(
      "Kata adjektif kekal sebagai inti frasa walaupun kata penguat hadir.",
    );
    expect(content).toContain("bukan setiap frasa adjektif mesti mempunyai kata penguat");
    expect(content).toContain("sangat • amat • terlalu • agak");
  });

  it("covers FN + FA while preserving the contextual analysis of the sugul example", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaAdjektifMindMap);

    expect(content).toContain("Frasa Nama + Frasa Adjektif");
    expect(content).toContain('"Keadaannya kritikal."');
    expect(content).toContain('"Rakan-rakan dalam keadaan sugul."');
    expect(content).toContain("dalam keadaan sugul");
    expect(content).toContain(
      '"Sugul" ialah kata adjektif yang menyatakan keadaan, manakala keseluruhan predikat',
    );
    expect(content).toContain("berdasarkan struktur ayat yang digunakan dalam sintaksis KSSM");
  });

  it("distinguishes phrase types by their core word", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaAdjektifMindMap);

    expect(content).toContain('"Rumah itu sangat besar."');
    expect(content).toContain('"Rumah itu sedang dibina."');
    expect(content).toContain('"Rumah itu bangunan warisan."');
    expect(content).toContain('"Rumah itu di atas bukit."');
    expect(content).toContain("Kenal pasti kata inti sebelum menentukan jenis frasa.");
  });

  it("includes the required common errors, UASA workflow, and contextual warning", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaAdjektifMindMap);

    expect(content).toContain('"sedang belajar" ialah Frasa Kerja.');
    expect(content).toContain('"seorang doktor" ialah Frasa Nama, bukan Frasa Adjektif.');
    expect(content).toContain("Inti: sangat");
    expect(content).toContain("Inti: indah");
    expect(content).toContain(
      'Jangan kenal pasti "indah" sahaja apabila soalan meminta frasa adjektif yang lengkap.',
    );
    expect(content).toContain("Adakah perkataan itu menerangkan sifat atau tindakan?");
    expect(content).toContain("Gunakan FN + FA apabila inti predikat ialah kata adjektif.");
    expect(content).toContain("berdasarkan keseluruhan struktur dan konteks ayat");
    expect(content).not.toContain("Tip SPM");
  });

  it("gives every node a unique ID", () => {
    const nodes = collectNodes(bahasaMelayuForm2FrasaAdjektifMindMap);

    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
  });

  it("does not duplicate direct parent content in child nodes", () => {
    collectNodes(bahasaMelayuForm2FrasaAdjektifMindMap).forEach((parent) => {
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
