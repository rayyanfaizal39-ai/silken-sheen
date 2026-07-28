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
  return bahasaMelayuForm3JenisAyatMindMap.children?.find((candidate) => candidate.label === label);
}

describe("Bahasa Melayu Form 3 Jenis Ayat mind map", () => {
  it("keeps the inherited registries isolated and exposes exactly two Form 3 topics", () => {
    expect(tatabahasaTopics("Form 1").map((topic) => topic.key)).toEqual(form1Topics);
    expect(tatabahasaTopics("Form 2").map((topic) => topic.key)).toEqual(form2Topics);

    const topics = tatabahasaTopics("Form 3");
    expect(topics.map((topic) => topic.key)).toEqual(["Jenis Ayat", "Ragam Ayat"]);
    expect(topics).toHaveLength(2);
    expect(topics[0]).toMatchObject({
      key: "Jenis Ayat",
      label: "Jenis Ayat",
      description: "Empat jenis ayat utama mengikut fungsi komunikasi dalam Bahasa Melayu.",
      categoryLabel: "Tatabahasa",
      available: true,
      selectable: true,
    });
  });

  it("removes every duplicated Form 1 Tatabahasa registration from Form 3 only", () => {
    form1Topics.forEach((key) => {
      expect(getChapter("bm", key, undefined, "Form 1")?.mindMap).toBeDefined();
      expect(getChapter("bm", key, undefined, "Form 3")).toBeUndefined();
    });

    expect(
      getChaptersForSubject("bm")
        .filter((chapter) => chapter.form === "Form 3" && chapter.categoryLabel === "Tatabahasa")
        .map((chapter) => chapter.id),
    ).toEqual(["bm-f3-jenis-ayat-mindmap", "bm-f3-ragam-ayat-mindmap"]);
  });

  it("registers only the required Form 3 Jenis Ayat mind-map resource", () => {
    const chapter = getChapter("bm", "Jenis Ayat", undefined, "Form 3");

    expect(chapter).toMatchObject({
      id: "bm-f3-jenis-ayat-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: "Jenis Ayat",
      title: "Jenis Ayat",
      description: "Empat jenis ayat utama mengikut fungsi komunikasi dalam Bahasa Melayu.",
      categoryLabel: "Tatabahasa",
      mindMap: {
        data: bahasaMelayuForm3JenisAyatMindMap,
        title: "Jenis Ayat",
      },
    });
    expect(hasResourceContent("bm", "Form 3", "Jenis Ayat", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
    expect(getChapter("bm", "Jenis Ayat", undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", "Jenis Ayat", undefined, "Form 2")).toBeUndefined();
  });

  it("uses the required identity and ten title-only first-level branches", () => {
    expect(bahasaMelayuForm3JenisAyatMindMap).toMatchObject({
      id: "bm-f3-jenis-ayat-root",
      label: "JENIS AYAT",
      summary:
        "Jenis ayat ialah pengelasan ayat berdasarkan tujuan atau fungsi sesuatu ayat digunakan dalam komunikasi.",
    });
    expect(bahasaMelayuForm3JenisAyatMindMap.children?.map((item) => item.label)).toEqual([
      "Definisi",
      "Ayat Penyata",
      "Ayat Tanya",
      "Ayat Perintah",
      "Ayat Seruan",
      "Perbezaan Jenis Ayat",
      "Penukaran Jenis Ayat",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuForm3JenisAyatMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("classifies sentence type by communicative purpose rather than complexity", () => {
    const content = flattenContent(findBranch("Definisi")!);

    expect(content).toContain("Ayat Penyata • Ayat Tanya • Ayat Perintah • Ayat Seruan");
    expect(content).toContain(
      "Pengelasan ini berdasarkan tujuan komunikasi, bukannya kerumitan atau panjang ayat.",
    );
    expect(content).toContain("Jenis Ayat ≠ Ayat Tunggal ≠ Ayat Majmuk");
    expect(content).toContain(
      "fungsi komunikasi dan pada masa yang sama dianalisis secara berasingan mengikut strukturnya",
    );
  });

  it("teaches Ayat Penyata as information, news, fact or opinion", () => {
    const content = flattenContent(findBranch("Ayat Penyata")!);

    expect(content).toContain("maklumat, berita, fakta atau pendapat");
    expect(content).toContain("Subjek + Predikat");
    expect(content).toContain("Malaysia merupakan sebuah negara yang merdeka.");
    expect(content).toContain("Ali sedang membaca buku.");
    expect(content).toContain("Sekolah akan dibuka minggu hadapan.");
    expect(content).toContain("tidak terhad kepada pernyataan fakta sahaja");
  });

  it("covers questions with and without question words, intonation and -kah", () => {
    const content = flattenContent(findBranch("Ayat Tanya")!);

    expect(content).toContain("Siapa datang tadi?");
    expect(content).toContain("Apakah nama sekolah itu?");
    expect(content).toContain("Mengapakah Ali tidak hadir?");
    expect(content).toContain("Bagaimanakah cara membuat eksperimen itu?");
    expect(content).toContain("Ali sudah siap?");
    expect(content).toContain("Kamu faham?");
    expect(content).toContain("Sudah makan?");
    expect(content).toContain("Intonasi memainkan peranan penting dalam ayat tanya lisan");
    expect(content).toContain("Sudahkah kamu makan?");
    expect(content).toContain(
      "tanda soal membantu dalam tulisan tetapi bukan satu-satunya asas pengelasan",
    );
  });

  it("distinguishes all four forms of Ayat Perintah", () => {
    const content = flattenContent(findBranch("Ayat Perintah")!);

    expect(content).toContain("Ayat Suruhan");
    expect(content).toContain("Baca buku itu.");
    expect(content).toContain("Ayat Larangan");
    expect(content).toContain("jangan • usah");
    expect(content).toContain("Jangan bermain di jalan raya.");
    expect(content).toContain("Ayat Silaan");
    expect(content).toContain("sila • jemput");
    expect(content).toContain("Jemput masuk.");
    expect(content).toContain("Ayat Permintaan");
    expect(content).toContain("minta • mohon");
    expect(content).toContain("Mohon beri perhatian.");
    expect(content).toContain("Ayat perintah tidak semestinya bermula dengan sila");
  });

  it("uses emotion and context, not an exclamation mark alone, for Ayat Seruan", () => {
    const content = flattenContent(findBranch("Ayat Seruan")!);

    expect(content).toContain("Wah! • Amboi! • Aduh! • Syabas!");
    expect(content).toContain("Wah, cantiknya pemandangan ini!");
    expect(content).toContain("Aduh, sakitnya kaki saya!");
    expect(content).toContain("Syabas, kamu berjaya!");
    expect(content).toContain("fungsi dan perasaan yang disampaikan tetap menjadi asas pengelasan");
  });

  it("compares and converts sentence types while preserving meaning", () => {
    const comparison = flattenContent(findBranch("Perbezaan Jenis Ayat")!);
    const conversion = flattenContent(findBranch("Penukaran Jenis Ayat")!);

    expect(comparison).toContain("Memberi maklumat.");
    expect(comparison).toContain("Bertanya atau mendapatkan maklumat.");
    expect(comparison).toContain("Meminta sesuatu tindakan.");
    expect(comparison).toContain("Melahirkan perasaan.");
    expect(conversion).toContain("Ali sudah hadir.");
    expect(conversion).toContain("Adakah Ali sudah hadir?");
    expect(conversion).toContain("Guru meminta murid duduk.");
    expect(conversion).toContain("Ayah menasihati kami supaya belajar bersungguh-sungguh.");
    expect(conversion).toContain("maklumat, tujuan dan maksud asal mesti dikekalkan");
  });

  it("corrects punctuation only when it matches the intended function", () => {
    const content = flattenContent(findBranch("Kesalahan Lazim")!);

    expect(content).toContain("Wah. Cantiknya bunga itu.");
    expect(content).toContain("Wah, cantiknya bunga itu!");
    expect(content).toContain("Jangan kamu bermain?");
    expect(content).toContain("Jangan bermain.");
    expect(content).toContain("Ali sudah datang!");
    expect(content).toContain("Ali sudah datang.");
    expect(content).toContain("Malaysia merupakan sebuah negara?");
    expect(content).toContain("Malaysia merupakan sebuah negara.");
    expect(content).toContain("berdasarkan maksud dan tujuan komunikasi, bukan tanda baca sahaja");
  });

  it("uses UASA framing and a purpose-first memory aid", () => {
    const content = flattenContent(bahasaMelayuForm3JenisAyatMindMap);

    expect(content).toContain("Tip UASA");
    expect(content).not.toContain("Tip SPM");
    expect(content).toContain("Apakah yang cuba dilakukan oleh penutur?");
    expect(content).toContain(
      "Penyata → Maklumat • Tanya → Soalan • Perintah → Arahan • Seruan → Perasaan",
    );
    expect(content).toContain(
      "Tujuan komunikasi menentukan jenis ayat; tanda baca ialah petunjuk, bukan satu-satunya penentu.",
    );
  });

  it("keeps IDs unique, collapsed children hidden and expanded desktop layout non-overlapping", () => {
    const nodes = collectNodes(bahasaMelayuForm3JenisAyatMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);

    expect(getVisibleMindNodes(bahasaMelayuForm3JenisAyatMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm3JenisAyatMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm3JenisAyatMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(bahasaMelayuForm3JenisAyatMindMap, expanded).positions.entries(),
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
    collectNodes(bahasaMelayuForm3JenisAyatMindMap).forEach((parent) => {
      const parentContent = [parent.label, parent.summary].filter(Boolean);
      parent.children?.forEach((child) => {
        expect(parentContent).not.toContain(child.label);
        if (child.summary) expect(parentContent).not.toContain(child.summary);
      });
    });
  });
});
