import { describe, expect, it } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindNode,
} from "@/components/MindMap";
import {
  getChapter,
  getChaptersForSubject,
  getRegisteredSubjectChapters,
  hasResourceContent,
} from "@/content/registry";
import { bahasaMelayuForm3JenisAyatMindMap } from "./jenis-ayat-form3-mindmap";
import { bahasaMelayuForm3RagamAyatMindMap } from "./ragam-ayat-form3-mindmap";

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

function findBranch(label: string) {
  return bahasaMelayuForm3RagamAyatMindMap.children?.find((candidate) => candidate.label === label);
}

describe("Bahasa Melayu Form 3 Ragam Ayat mind map", () => {
  it("updates only the Form 3 Tatabahasa registry with the required topic order", () => {
    expect(tatabahasaTopics("Form 1").map((topic) => topic.key)).toEqual(form1Topics);
    expect(tatabahasaTopics("Form 2").map((topic) => topic.key)).toEqual(form2Topics);

    const topics = tatabahasaTopics("Form 3");
    expect(topics.map((topic) => topic.key)).toEqual([
      "Jenis Ayat",
      "Ragam Ayat",
      "Cakap Ajuk dan Cakap Pindah",
    ]);
    expect(topics).toHaveLength(3);
    expect(topics[1]).toMatchObject({
      key: "Ragam Ayat",
      label: "Ragam Ayat",
      description:
        "Memahami penggunaan ayat aktif dan ayat pasif mengikut konteks serta melakukan penukaran ragam ayat secara gramatis.",
      categoryLabel: "Tatabahasa",
      available: true,
      selectable: true,
    });
  });

  it("registers Ragam Ayat as a mind-map-only Form 3 resource", () => {
    const chapter = getChapter("bm", "Ragam Ayat", undefined, "Form 3");

    expect(chapter).toMatchObject({
      id: "bm-f3-ragam-ayat-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: "Ragam Ayat",
      title: "Ragam Ayat",
      categoryLabel: "Tatabahasa",
      mindMap: {
        data: bahasaMelayuForm3RagamAyatMindMap,
        title: "Ragam Ayat",
      },
    });
    expect(hasResourceContent("bm", "Form 3", "Ragam Ayat", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
    expect(getChapter("bm", "Ragam Ayat", undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", "Ragam Ayat", undefined, "Form 2")).toBeUndefined();
  });

  it("preserves Jenis Ayat as the previous topic", () => {
    expect(getChapter("bm", "Jenis Ayat", undefined, "Form 3")?.mindMap?.data).toBe(
      bahasaMelayuForm3JenisAyatMindMap,
    );
    expect(
      getChaptersForSubject("bm")
        .filter((chapter) => chapter.form === "Form 3" && chapter.categoryLabel === "Tatabahasa")
        .map((chapter) => chapter.id),
    ).toEqual([
      "bm-f3-jenis-ayat-mindmap",
      "bm-f3-ragam-ayat-mindmap",
      "bm-f3-cakap-ajuk-cakap-pindah-mindmap",
    ]);
  });

  it("uses the required identity and ten title-only first-level branches", () => {
    expect(bahasaMelayuForm3RagamAyatMindMap).toMatchObject({
      id: "bm-f3-ragam-ayat-root",
      label: "RAGAM AYAT",
      summary:
        "Ragam ayat mengelaskan ayat berdasarkan unsur yang diberikan penekanan sama ada pelaku atau objek.",
    });
    expect(bahasaMelayuForm3RagamAyatMindMap.children?.map((item) => item.label)).toEqual([
      "Definisi",
      "Ayat Aktif",
      "Ayat Pasif",
      "Penukaran Ragam Ayat",
      "Kata Ganti Nama",
      "Mengekalkan Maksud",
      "Analisis Ragam Ayat",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuForm3RagamAyatMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("distinguishes sentence voice from sentence function", () => {
    const content = flattenContent(findBranch("Definisi")!);

    expect(content).toContain("Ayat Aktif • Ayat Pasif");
    expect(content).toContain("bukan tentang fungsi ayat");
    expect(content).toContain("Jenis Ayat mengelaskan ayat mengikut fungsi komunikasi");
    expect(content).toContain(
      "Ragam Ayat mengelaskan ayat mengikut unsur yang diberikan penekanan",
    );
  });

  it("teaches active and passive focus without relying on prefix shortcuts", () => {
    const active = flattenContent(findBranch("Ayat Aktif")!);
    const passive = flattenContent(findBranch("Ayat Pasif")!);

    expect(active).toContain("Pelaku → Kata Kerja → Objek");
    expect(active).toContain("Ayat aktif tak transitif tidak semestinya mempunyai objek");
    expect(active).toContain("Ali membaca buku.");
    expect(active).toContain("Guru menerangkan pelajaran.");
    expect(active).toContain("Doktor memeriksa pesakit.");
    expect(active).toContain("tidak setiap ayat aktif mesti mengandungi awalan tersebut");
    expect(passive).toContain("objek yang menerima perbuatan");
    expect(passive).toContain("Buku itu dibaca oleh Ali.");
    expect(passive).toContain("Rumah itu dibina oleh pekerja.");
    expect(passive).toContain("Surat itu telah dihantar oleh guru.");
    expect(passive).toContain("Bukan setiap ayat pasif memerlukan oleh");
  });

  it("preserves meaning, aspect and helper verbs during transformation", () => {
    const conversion = flattenContent(findBranch("Penukaran Ragam Ayat")!);
    const meaning = flattenContent(findBranch("Mengekalkan Maksud")!);

    expect(conversion).toContain(
      "Maksud • masa • aspek • kata bantu • penafian • kata keterangan • objek • pelaku",
    );
    expect(conversion).toContain("Ali sedang membaca buku itu.");
    expect(conversion).toContain("Buku itu sedang dibaca oleh Ali.");
    expect(conversion).toContain("Mereka telah menyiapkan tugasan.");
    expect(conversion).toContain("Tugasan telah disiapkan oleh mereka.");
    expect(conversion).toContain("Hadiah akan disampaikan oleh guru.");
    expect(conversion).toContain("sedang, telah, akan, masih dan belum");
    expect(meaning).toContain("Ali membaca buku di perpustakaan semalam.");
    expect(meaning).toContain("Buku dibaca oleh Ali di perpustakaan semalam.");
    expect(meaning).toContain("semua maklumat asal dikekalkan");
  });

  it("applies the correct passive structure for each pronoun person", () => {
    const content = flattenContent(findBranch("Kata Ganti Nama")!);

    expect(content).toContain("saya • aku • kami • kita");
    expect(content).toContain("Buku itu saya baca.");
    expect(content).toContain("Buku itu dibaca oleh saya.");
    expect(content).toContain("awak • anda • kamu • engkau");
    expect(content).toContain("Kerja itu kamu siapkan.");
    expect(content).toContain("Ali • mereka • beliau • dia");
    expect(content).toContain("Kerja itu disiapkan oleh Ali.");
    expect(content).toContain("antara peraturan tatabahasa yang paling kerap diuji");
  });

  it("uses complete structural analysis and corrects all required common errors", () => {
    const analysis = flattenContent(findBranch("Analisis Ragam Ayat")!);
    const errors = flattenContent(findBranch("Kesalahan Lazim")!);

    expect(analysis).toContain("Siapa Melakukan?");
    expect(analysis).toContain("Siapa Menerima?");
    expect(analysis).toContain("Unsur yang Ditekankan");
    expect(analysis).toContain("Jangan bergantung pada di- atau meN- sahaja");
    expect(analysis).toContain("Konteks dan struktur lengkap ayat");
    expect(errors).toContain("Buku itu dibaca oleh saya.");
    expect(errors).toContain("Buku itu saya baca.");
    expect(errors).toContain("Kerja itu di kamu siapkan.");
    expect(errors).toContain("Kerja itu kamu siapkan.");
    expect(errors).toContain("Ali dibaca buku itu.");
    expect(errors).toContain("Ali membaca buku itu.");
    expect(errors).toContain("Hadiah itu guru memberi.");
    expect(errors).toContain("Hadiah itu diberikan oleh guru.");
  });

  it("emphasises Form 3 analysis and examination checks", () => {
    const tips = flattenContent(findBranch("Tip UASA")!);
    const memory = flattenContent(findBranch("Ingat!")!);

    expect(tips).toContain("Siapa yang melakukan perbuatan?");
    expect(tips).toContain("Siapa yang menerima perbuatan?");
    expect(tips).toContain("Adakah maksud asal berubah?");
    expect(tips).toContain("Adakah kata bantu seperti sedang, telah atau akan dikekalkan?");
    expect(tips).toContain("mengikut kata ganti nama pelaku");
    expect(memory).toContain("Fokus pada pelaku.");
    expect(memory).toContain("Fokus pada penerima perbuatan.");
    expect(memory).toContain("tanpa di-");
    expect(memory).toContain("kata kerja pasif berawalan di-");
    expect(memory).toContain("Maksud asal mesti dikekalkan.");
  });

  it("keeps IDs unique and the shared desktop layout non-overlapping", () => {
    const nodes = collectNodes(bahasaMelayuForm3RagamAyatMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuForm3RagamAyatMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm3RagamAyatMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm3RagamAyatMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(bahasaMelayuForm3RagamAyatMindMap, expanded).positions.entries(),
    );
    positions.forEach(([id, position], index) => {
      positions.slice(index + 1).forEach(([otherId, other]) => {
        const separated =
          position.x + position.w <= other.x ||
          other.x + other.w <= position.x ||
          position.y + position.h / 2 <= other.y - other.h / 2 ||
          other.y + other.h / 2 <= position.y - position.h / 2;
        expect(separated, `${id} overlaps ${otherId}`).toBe(true);
      });
    });
  });

  it("does not duplicate direct parent content in child nodes", () => {
    collectNodes(bahasaMelayuForm3RagamAyatMindMap).forEach((parent) => {
      const parentContent = [parent.label, parent.summary].filter(Boolean);
      parent.children?.forEach((child) => {
        expect(parentContent).not.toContain(child.label);
        if (child.summary) expect(parentContent).not.toContain(child.summary);
      });
    });
  });
});
