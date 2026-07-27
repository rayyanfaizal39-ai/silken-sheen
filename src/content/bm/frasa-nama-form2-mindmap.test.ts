import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import {
  getChapter,
  getChaptersForSubject,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import { bahasaMelayuForm2FrasaNamaMindMap } from "./frasa-nama-form2-mindmap";

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

const form2Topics = ["Frasa Nama", "Frasa Kerja", "Frasa Adjektif"] as const;

const removedForm2Topics = [
  "Frasa Sendi Nama",
  "Klausa",
  "Pola Ayat Dasar",
  "Ayat Tunggal",
  "Ayat Majmuk",
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

function flattenContent(node: MindNode): string[] {
  return [
    node.label,
    ...(node.summary ? [node.summary] : []),
    ...(node.children?.flatMap(flattenContent) ?? []),
  ];
}

describe("Bahasa Melayu Form 2 Frasa Nama mind map", () => {
  it("replaces only the Form 2 Tatabahasa topic list", () => {
    expect(tatabahasaTopics("Form 1").map((topic) => topic.key)).toEqual(form1And3Topics);
    expect(tatabahasaTopics("Form 2").map((topic) => topic.key)).toEqual(form2Topics);
    expect(tatabahasaTopics("Form 3").map((topic) => topic.key)).toEqual(form1And3Topics);
  });

  it("keeps Frasa Nama active and unchanged in the Form 2 syntax library", () => {
    const topics = tatabahasaTopics("Form 2");
    const frasaNama = getChapter("bm", "Frasa Nama", undefined, "Form 2");

    expect(frasaNama).toMatchObject({
      id: "bm-f2-frasa-nama-mindmap",
      title: "Frasa Nama",
      description:
        "Binaan yang mempunyai kata nama sebagai inti dan berfungsi membentuk subjek atau predikat dalam ayat.",
      categoryLabel: "Tatabahasa",
      mindMap: {
        data: bahasaMelayuForm2FrasaNamaMindMap,
        title: "Frasa Nama",
      },
    });
    expect(topics[0]).toMatchObject({
      key: "Frasa Nama",
      available: true,
      selectable: true,
    });
    expect(hasFormResourceContent("bm", "Form 2", "mindMap")).toBe(true);
  });

  it("does not register future Form 2 topic cards before their lessons are added", () => {
    removedForm2Topics.forEach((key) => {
      expect(getChapter("bm", key, undefined, "Form 2")).toBeUndefined();
    });
  });

  it("removes inherited Form 2 mind maps while preserving its Penanda Wacana flashcards", () => {
    form1And3Topics.slice(0, 9).forEach((key) => {
      expect(getChapter("bm", key, undefined, "Form 2")).toBeUndefined();
    });

    const penandaWacana = getChapter("bm", "Penanda Wacana", undefined, "Form 2");
    expect(penandaWacana).toHaveProperty("flashcards");
    expect(penandaWacana).not.toHaveProperty("mindMap");
    expect(penandaWacana).not.toHaveProperty("categoryLabel");
  });

  it("keeps all ten original topics active for Form 1 and Form 3", () => {
    (["Form 1", "Form 3"] as const).forEach((form) => {
      form1And3Topics.forEach((key) => {
        expect(getChapter("bm", key, undefined, form)?.mindMap).toBeDefined();
      });
    });
  });

  it("uses stable IDs for the current three-card Form 2 syntax library", () => {
    expect(
      getChaptersForSubject("bm", undefined, "Form 2")
        .filter((chapter) => chapter.categoryLabel === "Tatabahasa")
        .map((chapter) => chapter.id),
    ).toEqual([
      "bm-f2-frasa-nama-mindmap",
      "bm-f2-frasa-kerja-mindmap",
      "bm-f2-frasa-adjektif-mindmap",
    ]);
  });

  it("contains the required central summary and nine title-only branches", () => {
    expect(bahasaMelayuForm2FrasaNamaMindMap.summary).toBe(
      "Frasa nama ialah binaan yang terdiri daripada satu atau beberapa perkataan dengan kata nama sebagai intinya.",
    );
    expect(bahasaMelayuForm2FrasaNamaMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Fungsi",
      "Struktur",
      "Pola Ayat Dasar",
      "Sebagai Subjek",
      "Sebagai Predikat",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuForm2FrasaNamaMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches phrase structure rather than reusing the Kata Nama word-class lesson", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaNamaMindMap).join("\n");

    expect(content).toContain("kata nama sebagai intinya");
    expect(content).toContain("murid itu • rumah besar itu • tiga orang pelajar");
    expect(content).toContain("rumah besar • kereta baharu • buku matematik");
    expect(content).not.toContain("Kata Nama Am");
    expect(content).not.toContain("Kata Nama Khas");
    expect(bahasaMelayuForm2FrasaNamaMindMap.label).not.toBe("KATA NAMA");
  });

  it("covers all four basic sentence patterns with exact identification", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaNamaMindMap).join("\n");

    expect(content).toContain('"Ameer dan Nazeem menziarahi Ganesan."');
    expect(content).toContain("FN: Ameer dan Nazeem • FK: menziarahi Ganesan");
    expect(content).toContain('"Cuaca hari ini sangat indah."');
    expect(content).toContain("FN: Cuaca hari ini • FA: sangat indah");
    expect(content).toContain('"Mereka ke hospital."');
    expect(content).toContain("FN: Mereka • FS: ke hospital");
    expect(content).toContain("FN: Abang saya • FN: seorang doktor");
  });

  it("identifies complete noun phrases as subjects and noun-phrase predicates", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaNamaMindMap).join("\n");

    expect(content).toContain('"Tiga orang pelajar sedang berbincang."');
    expect(content).toContain("Subjek: Tiga orang pelajar");
    expect(content).toContain('"Rumah besar itu milik datuk saya."');
    expect(content).toContain("Subjek: Rumah besar itu");
    expect(content).toContain('"Wanita itu guru kelas kami."');
    expect(content).toContain("Predikat: guru kelas kami");
    expect(content).toContain("Dalam pola FN + FN, frasa nama kedua berfungsi sebagai predikat.");
  });

  it("includes required errors, UASA checks, and the memory formula", () => {
    const content = flattenContent(bahasaMelayuForm2FrasaNamaMindMap).join("\n");

    expect(content).toContain('"Rumah besar itu" ialah satu frasa nama yang lengkap');
    expect(content).toContain("Jangan kenal pasti satu perkataan sahaja");
    expect(content).toContain('FN + FK: "Murid itu membaca buku."');
    expect(content).toContain('FN + FN: "Murid itu ketua kelas."');
    expect(content).toContain("FN + FK, FN + FA, FN + FS atau FN + FN");
    expect(content).toContain("Frasa Nama → Inti → Kata Nama");
    expect(content).toContain("Subjek biasanya bermula dengan Frasa Nama.");
  });

  it("gives every node a unique ID", () => {
    const nodes = collectNodes(bahasaMelayuForm2FrasaNamaMindMap);

    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
  });

  it("does not duplicate direct parent content in child nodes", () => {
    collectNodes(bahasaMelayuForm2FrasaNamaMindMap).forEach((parent) => {
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
