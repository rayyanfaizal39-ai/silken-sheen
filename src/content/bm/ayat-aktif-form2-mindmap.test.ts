import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuForm2AyatAktifMindMap } from "./ayat-aktif-form2-mindmap";

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
  "Penanda Wacana",
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

describe("Bahasa Melayu Form 2 Ayat Aktif mind map", () => {
  it("keeps exactly ten Form 2 cards active alongside the dedicated Forms 1 and 3 registries", () => {
    expect(tatabahasaTopics("Form 1").map((topic) => topic.key)).toEqual(form1Topics);
    expect(tatabahasaTopics("Form 3").map((topic) => topic.key)).toEqual(["Jenis Ayat"]);

    const topics = tatabahasaTopics("Form 2");
    expect(topics.map((topic) => topic.key)).toEqual(form2Topics);
    expect(topics.every((topic) => topic.available && topic.selectable)).toBe(true);
    removedForm2Topics.forEach((key) => {
      expect(getChapter("bm", key, undefined, "Form 2")).toBeUndefined();
    });
  });

  it("registers the exact Ayat Aktif card and only its mind-map resource", () => {
    const chapter = getChapter("bm", "Ayat Aktif", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-ayat-aktif-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Ayat Aktif",
      title: "Ayat Aktif",
      description:
        "Ayat yang mengutamakan pelaku sebagai subjek yang melakukan sesuatu perbuatan atau tindakan.",
      categoryLabel: "Tatabahasa",
      mindMap: {
        data: bahasaMelayuForm2AyatAktifMindMap,
        title: "Ayat Aktif",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Ayat Aktif", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
  });

  it("keeps Ayat Aktif exclusive to Form 2", () => {
    expect(getChapter("bm", "Ayat Aktif", undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", "Ayat Aktif", undefined, "Form 3")).toBeUndefined();
  });

  it("contains the exact identity and twelve title-only first-level branches", () => {
    expect(bahasaMelayuForm2AyatAktifMindMap).toMatchObject({
      id: "bm-f2-ayat-aktif-root",
      label: "AYAT AKTIF",
      summary:
        "Ayat aktif ialah ayat yang menekankan pelaku sebagai subjek yang melakukan sesuatu perbuatan.",
    });
    expect(bahasaMelayuForm2AyatAktifMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Struktur Ayat",
      "Ayat Aktif Transitif",
      "Ayat Aktif Tak Transitif",
      "Imbuhan meN-",
      "Imbuhan ber-",
      "Objek dan Pelengkap",
      "Hubungan dengan Ayat Pasif",
      "Penukaran Ayat",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuForm2AyatAktifMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("distinguishes active transitive and intransitive structures", () => {
    const content = flattenContent(bahasaMelayuForm2AyatAktifMindMap);

    expect(content).toContain("Pelaku + Kata Kerja Transitif + Objek");
    expect(content).toContain('"Farah menulis surat."');
    expect(content).toContain(
      "Ayat aktif tak transitif menggunakan kata kerja yang tidak memerlukan objek.",
    );
    expect(content).toContain("Adik tidur. • Burung itu terbang. • Mereka tersenyum.");
    expect(content).toContain('"Di bilik ditidur oleh adik."');
    expect(content).toContain(
      "Ayat tanpa objek langsung biasanya tidak boleh ditukar menjadi ayat pasif berawalan di-.",
    );
  });

  it("explains meN- and ber- without overgeneralising", () => {
    const content = flattenContent(bahasaMelayuForm2AyatAktifMindMap);

    expect(content).toContain("Awalan meN- lazimnya membentuk kata kerja aktif.");
    expect(content).toContain(
      "Bukan setiap kata kerja aktif mesti berawalan meN-. Ayat aktif juga boleh menggunakan kata kerja berawalan ber-, ter-, tanpa imbuhan atau bentuk lain yang sesuai.",
    );
    expect(content).toContain(
      "Jangan anggap setiap kata kerja berawalan meN- sentiasa transitif tanpa meneliti penggunaan dan konteks.",
    );
    expect(content).toContain(
      "Banyak kata kerja berawalan ber- bersifat tak transitif, tetapi bukan semuanya berkelakuan sama.",
    );
  });

  it("distinguishes objects, complements and adverbial information carefully", () => {
    const content = flattenContent(bahasaMelayuForm2AyatAktifMindMap);

    expect(content).toContain("Objek hadir selepas kata kerja transitif dan menerima perbuatan.");
    expect(content).toContain(
      "Pelengkap menyempurnakan maksud bagi kata kerja tak transitif tertentu.",
    );
    expect(content).toContain(
      "Keterangan memberikan maklumat tambahan tentang tempat, masa, cara atau tujuan.",
    );
    expect(content).toContain('"Mereka menziarahi Ganesan di hospital."');
    expect(content).toContain("Jangan labelkan setiap frasa selepas kata kerja sebagai objek.");
    expect(content).toContain(
      "Gunakan ujian ini sebagai panduan asas, bukan sebagai peraturan mutlak bagi setiap binaan lanjutan.",
    );
  });

  it("uses only suitable transitives for conversion and preserves kata bantu", () => {
    const content = flattenContent(bahasaMelayuForm2AyatAktifMindMap);

    expect(content).toContain(
      "Ayat mesti mempunyai objek untuk penukaran aktif kepada pasif secara langsung.",
    );
    expect(content).toContain('"Saya akan membaiki basikal itu."');
    expect(content).toContain('"Basikal itu akan saya baiki."');
    expect(content).toContain('"Kamu perlu menyiapkan latihan itu."');
    expect(content).toContain('"Latihan itu perlu kamu siapkan."');
    expect(content).toContain('"Guru itu telah memeriksa buku latihan kami."');
    expect(content).toContain('"Buku latihan kami telah diperiksa oleh guru itu."');
  });

  it("uses cautious standard-language guidance and UASA terminology", () => {
    const content = flattenContent(bahasaMelayuForm2AyatAktifMindMap);

    expect(content).toContain('"Ali baca buku itu."');
    expect(content).toContain('"Ali membaca buku itu."');
    expect(content).toContain("Ayat ini boleh diterima jika objek telah difahami melalui konteks");
    expect(content).toContain("Tip UASA");
    expect(content).not.toContain("Tip SPM");
  });

  it("gives every node a unique ID", () => {
    const nodes = collectNodes(bahasaMelayuForm2AyatAktifMindMap);

    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
  });

  it("does not duplicate direct parent content in child nodes", () => {
    collectNodes(bahasaMelayuForm2AyatAktifMindMap).forEach((parent) => {
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
