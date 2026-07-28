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
import { bahasaMelayuForm2KataPemeriMindMap } from "./kata-pemeri-form2-mindmap";

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

function flattenContent(node: MindNode) {
  return collectNodes(node)
    .flatMap((item) => [item.label, item.summary].filter(Boolean))
    .join("\n");
}

function findBranch(label: string) {
  return bahasaMelayuForm2KataPemeriMindMap.children?.find(
    (candidate) => candidate.label === label,
  );
}

describe("Bahasa Melayu Form 2 Kata Pemeri mind map", () => {
  it("registers ten active Form 2 cards alongside the dedicated Forms 1 and 3 registries", () => {
    expect(tatabahasaTopics("Form 1").map((topic) => topic.key)).toEqual(form1Topics);
    expect(tatabahasaTopics("Form 3").map((topic) => topic.key)).toEqual([
      "Jenis Ayat",
      "Ragam Ayat",
    ]);

    const topics = tatabahasaTopics("Form 2");
    expect(topics.map((topic) => topic.key)).toEqual(form2Topics);
    expect(topics).toHaveLength(10);
    expect(topics.every((topic) => topic.available && topic.selectable)).toBe(true);
    removedForm2Topics.forEach((key) => {
      expect(getChapter("bm", key, undefined, "Form 2")).toBeUndefined();
    });
  });

  it("registers only the required Kata Pemeri mind-map resource", () => {
    const chapter = getChapter("bm", "Kata Pemeri", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-kata-pemeri-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Kata Pemeri",
      title: "Kata Pemeri",
      description: 'Penggunaan "ialah" dan "adalah" mengikut jenis frasa yang betul.',
      categoryLabel: "Tatabahasa",
      mindMap: {
        data: bahasaMelayuForm2KataPemeriMindMap,
        title: "Kata Pemeri",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Kata Pemeri", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
    expect(getChapter("bm", "Kata Pemeri", undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", "Kata Pemeri", undefined, "Form 3")).toBeUndefined();
  });

  it("places Kata Pemeri between Imbuhan Lanjutan and Kesalahan Tatabahasa Lazim", () => {
    const ids = getChaptersForSubject("bm", undefined, "Form 2")
      .filter((chapter) => chapter.categoryLabel === "Tatabahasa")
      .map((chapter) => chapter.id);

    expect(ids.slice(-3)).toEqual([
      "bm-f2-imbuhan-lanjutan-mindmap",
      "bm-f2-kata-pemeri-mindmap",
      "bm-f2-kesalahan-tatabahasa-lazim-mindmap",
    ]);
  });

  it("uses the required identity and nine title-only first-level branches", () => {
    expect(bahasaMelayuForm2KataPemeriMindMap).toMatchObject({
      id: "bm-f2-kata-pemeri-root",
      label: "KATA PEMERI",
      summary:
        "Kata pemeri menghubungkan subjek dengan predikat dan digunakan mengikut jenis frasa yang hadir selepasnya.",
    });
    expect(bahasaMelayuForm2KataPemeriMindMap.children?.map((item) => item.label)).toEqual([
      "Definisi",
      "ialah",
      "adalah",
      "Perbezaan ialah & adalah",
      "Bukan Kata Pemeri",
      "Kesalahan Lazim",
      "Penyuntingan",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuForm2KataPemeriMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("uses ialah before a noun phrase without rejecting every verb-looking form", () => {
    const content = flattenContent(findBranch("ialah")!);

    expect(content).toContain("Subjek + ialah + Frasa Nama");
    expect(content).toContain("Nama sekolah saya ialah SMK Seri Puteri.");
    expect(content).toContain("Jawatan beliau ialah pengetua sekolah.");
    expect(content).toContain("Hobi Amir ialah bermain badminton.");
    expect(content).toContain(
      'frasa "bermain badminton" diterima dalam tatabahasa sekolah kerana berfungsi secara nominal',
    );
    expect(content).toContain(
      'Bukan setiap perkataan selepas "ialah" yang kelihatan seperti kata kerja semestinya salah.',
    );
    expect(content).toContain("Nama saya ialah Ali.");
  });

  it("uses adalah before adjective and prepositional phrases", () => {
    const content = flattenContent(findBranch("adalah")!);

    expect(content).toContain("Frasa Adjektif (FA) atau Frasa Sendi Nama (FS)");
    expect(content).toContain("Subjek + adalah + Frasa Adjektif");
    expect(content).toContain("Cuaca hari ini adalah sangat baik.");
    expect(content).toContain("Keputusan itu adalah memuaskan.");
    expect(content).toContain("Subjek + adalah + Frasa Sendi Nama");
    expect(content).toContain("Mesyuarat itu adalah pada hari Isnin.");
    expect(content).toContain("Program tersebut adalah untuk semua murid.");
    expect(content).toContain("Buku itu adalah di atas meja.");
  });

  it("compares ialah and adalah by the phrase that follows", () => {
    const content = flattenContent(findBranch("Perbezaan ialah & adalah")!);

    expect(content).toContain("ialah → Frasa Nama");
    expect(content).toContain("Ali ialah ketua kelas.");
    expect(content).toContain("adalah → Frasa Adjektif");
    expect(content).toContain("Keadaan itu adalah baik.");
    expect(content).toContain("adalah → Frasa Sendi Nama");
    expect(content).toContain("Majlis itu adalah pada pukul 8 malam.");
  });

  it("identifies merupakan as a verb rather than a third kata pemeri", () => {
    const content = flattenContent(findBranch("Bukan Kata Pemeri")!);

    expect(content).toContain("ialah dan adalah");
    expect(content).toContain("Merupakan ialah kata kerja, bukannya kata pemeri.");
    expect(content).toContain("Malaysia merupakan sebuah negara.");
    expect(content).toContain(
      "Jangan anggap ialah dan merupakan mempunyai fungsi yang sama atau boleh saling menggantikan dalam setiap ayat.",
    );
  });

  it("contains the required error corrections for FN, FA and FS predicates", () => {
    const content = flattenContent(findBranch("Kesalahan Lazim")!);

    expect(content).toContain("Cuaca hari ini ialah sangat panas.");
    expect(content).toContain("Cuaca hari ini adalah sangat panas.");
    expect(content).toContain("Nama saya adalah Ali.");
    expect(content).toContain("Nama saya ialah Ali.");
    expect(content).toContain("Program ini ialah untuk murid Tingkatan 2.");
    expect(content).toContain("Program ini adalah untuk murid Tingkatan 2.");
    expect(content).toContain("Majlis itu ialah di dewan sekolah.");
    expect(content).toContain("Majlis itu adalah di dewan sekolah.");
  });

  it("teaches phrase-first editing and the UASA memory aid", () => {
    const editing = flattenContent(findBranch("Penyuntingan")!);
    const uasa = flattenContent(findBranch("Tip UASA")!);

    expect(editing).toContain("Cari penggunaan ialah atau adalah dalam ayat.");
    expect(editing).toContain("Tentukan sama ada frasa selepasnya ialah FN, FA atau FS.");
    expect(editing).toContain("Gunakan ialah sebelum FN dan gunakan adalah sebelum FA atau FS.");
    expect(uasa).toContain("FN → ialah • FA → adalah • FS → adalah");
    expect(uasa).toContain(
      "Jangan memilih kata pemeri berdasarkan hafalan sahaja. Tentukan jenis frasa predikat terlebih dahulu.",
    );
  });

  it("keeps IDs unique, collapsed children hidden and expanded desktop layout non-overlapping", () => {
    const nodes = collectNodes(bahasaMelayuForm2KataPemeriMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);

    expect(getVisibleMindNodes(bahasaMelayuForm2KataPemeriMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm2KataPemeriMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm2KataPemeriMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(bahasaMelayuForm2KataPemeriMindMap, expanded).positions.entries(),
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
    collectNodes(bahasaMelayuForm2KataPemeriMindMap).forEach((parent) => {
      const parentContent = [parent.label, parent.summary].filter(Boolean);
      parent.children?.forEach((child) => {
        expect(parentContent).not.toContain(child.label);
        if (child.summary) expect(parentContent).not.toContain(child.summary);
      });
    });
  });
});
