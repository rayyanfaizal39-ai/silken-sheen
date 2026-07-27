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
import { bahasaMelayuForm2AyatMajmukMindMap } from "./ayat-majmuk-form2-mindmap";

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
  "Ayat Majmuk",
  "Imbuhan Lanjutan",
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
  return bahasaMelayuForm2AyatMajmukMindMap.children?.find(
    (candidate) => candidate.label === label,
  );
}

describe("Bahasa Melayu Form 2 Ayat Majmuk mind map", () => {
  it("registers exactly eight active Form 2 cards while preserving Forms 1 and 3", () => {
    expect(tatabahasaTopics("Form 1").map((topic) => topic.key)).toEqual(form1And3Topics);
    expect(tatabahasaTopics("Form 3").map((topic) => topic.key)).toEqual(form1And3Topics);

    const topics = tatabahasaTopics("Form 2");
    expect(topics.map((topic) => topic.key)).toEqual(form2Topics);
    expect(topics).toHaveLength(8);
    expect(topics.every((topic) => topic.available && topic.selectable)).toBe(true);
    removedForm2Topics.forEach((key) => {
      expect(getChapter("bm", key, undefined, "Form 2")).toBeUndefined();
    });
  });

  it("registers only the required Ayat Majmuk mind-map resource", () => {
    const chapter = getChapter("bm", "Ayat Majmuk", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-ayat-majmuk-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Ayat Majmuk",
      title: "Ayat Majmuk",
      description:
        "Ayat yang dibina dengan menggabungkan dua atau lebih ayat tunggal atau klausa untuk menyampaikan maklumat yang lebih lengkap.",
      categoryLabel: "Tatabahasa",
      mindMap: {
        data: bahasaMelayuForm2AyatMajmukMindMap,
        title: "Ayat Majmuk",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Ayat Majmuk", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
    expect(getChapter("bm", "Ayat Majmuk", undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", "Ayat Majmuk", undefined, "Form 3")).toBeUndefined();
  });

  it("places Ayat Majmuk immediately before Imbuhan Lanjutan", () => {
    const ids = getChaptersForSubject("bm", undefined, "Form 2")
      .filter((chapter) => chapter.categoryLabel === "Tatabahasa")
      .map((chapter) => chapter.id);

    expect(ids.slice(-2)).toEqual(["bm-f2-ayat-majmuk-mindmap", "bm-f2-imbuhan-lanjutan-mindmap"]);
  });

  it("uses the required identity and thirteen title-only first-level branches", () => {
    expect(bahasaMelayuForm2AyatMajmukMindMap).toMatchObject({
      id: "bm-f2-ayat-majmuk-root",
      label: "AYAT MAJMUK",
      summary:
        "Ayat majmuk ialah ayat yang terbentuk daripada gabungan dua atau lebih ayat tunggal atau klausa.",
    });
    expect(bahasaMelayuForm2AyatMajmukMindMap.children?.map((item) => item.label)).toEqual([
      "Definisi",
      "Cara Terbentuk",
      "Majmuk Gabungan",
      "Majmuk Pancangan",
      "Majmuk Campuran",
      "Kata Hubung",
      "Penggabungan Ayat",
      "Pencerakinan",
      "Dengan Ayat Tunggal",
      "Dengan Kata Majmuk",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuForm2AyatMajmukMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("distinguishes gabungan, pancangan and campuran at Tingkatan 2 level", () => {
    const gabungan = flattenContent(findBranch("Majmuk Gabungan")!);
    const pancangan = flattenContent(findBranch("Majmuk Pancangan")!);
    const campuran = flattenContent(findBranch("Majmuk Campuran")!);

    expect(gabungan).toContain("dua atau lebih klausa yang setara");
    expect(gabungan).toContain('"Ali membaca buku dan Siti menulis karangan."');
    expect(gabungan).toContain('"Ali dan Abu pergi ke sekolah."');
    expect(pancangan).toContain("satu klausa utama");
    expect(pancangan).toContain('"Murid yang memakai baju biru itu ketua kelas."');
    expect(pancangan).toContain('"Guru itu menjelaskan bahawa peperiksaan akan bermula esok."');
    expect(pancangan).toContain('"Mereka berteduh kerana hujan turun dengan lebat."');
    expect(campuran).toContain(
      '"Ali membaca buku dan Siti menulis karangan kerana mereka perlu menyiapkan tugasan."',
    );
    expect(campuran).toContain("lebih daripada satu proses penggabungan ayat");
  });

  it("matches conjunctions to meaning without treating every conjunction as two clauses", () => {
    const content = flattenContent(bahasaMelayuForm2AyatMajmukMindMap);

    expect(content).toContain(
      "dan: penambahan • tetapi: pertentangan • atau: pilihan • kerana: sebab • supaya: tujuan • apabila: masa • jika: syarat",
    );
    expect(content).toContain("Kata hubung menghubungkan perkataan, frasa atau klausa.");
    expect(content).toContain('Bukan setiap ayat yang mengandungi "dan" ialah ayat majmuk.');
    expect(content).toContain('"Ali dan Abu bermain bola."');
    expect(content).toContain('"Ali dan Abu" boleh menjadi subjek majmuk dalam satu klausa');
  });

  it("teaches meaning-preserving combination and complete pencerakinan", () => {
    const combination = flattenContent(findBranch("Penggabungan Ayat")!);
    const separation = flattenContent(findBranch("Pencerakinan")!);

    expect(combination).toContain('"Lina membuka buku lalu mula membaca."');
    expect(combination).toContain('"Amir tidak hadir ke sekolah kerana dia demam."');
    expect(combination).toContain(
      '"Hakim sudah belajar dengan tekun tetapi masih berasa bimbang."',
    );
    expect(combination).toContain(
      "tidak boleh menambah maklumat baharu, membuang maklumat penting, menyongsangkan sebab dan akibat",
    );
    expect(separation).toContain('"Amir membeli buku itu."');
    expect(separation).toContain('"Amir membaca buku itu."');
    expect(separation).toContain('"Mereka berteduh."');
    expect(separation).toContain('"Hujan turun dengan lebat."');
    expect(separation).toContain(
      "subjek lengkap, predikat lengkap, struktur yang gramatis dan fakta asal yang dikekalkan",
    );
  });

  it("separates Ayat Majmuk from Ayat Tunggal and Kata Majmuk accurately", () => {
    const singleSentence = flattenContent(findBranch("Dengan Ayat Tunggal")!);
    const compoundWord = flattenContent(findBranch("Dengan Kata Majmuk")!);

    expect(singleSentence).toContain(
      '"Pelajar Tingkatan Dua itu sedang membaca buku sejarah baharu di perpustakaan sekolah."',
    );
    expect(singleSentence).toContain(
      "pengelasan mesti berdasarkan struktur klausa dan bukan kehadiran satu perkataan sahaja",
    );
    expect(compoundWord).toContain(
      "Ayat majmuk menggabungkan klausa atau struktur ayat, manakala kata majmuk menggabungkan perkataan.",
    );
    expect(compoundWord).toContain(
      "kereta api • urus niaga • tanggungjawab • warganegara • alat tulis",
    );
  });

  it("uses UASA framing and includes every required correction safeguard", () => {
    const content = flattenContent(bahasaMelayuForm2AyatMajmukMindMap);

    expect(content).toContain("Tip UASA");
    expect(content).not.toContain("Tip SPM");
    expect(content).toContain('"Kerana hujan turun dengan lebat."');
    expect(content).toContain('"Mereka berteduh kerana hujan turun dengan lebat."');
    expect(content).toContain('"Membaca buku."');
    expect(content).toContain('"Siti menulis karangan."');
    expect(content).toContain('"Dia belajar bersungguh-sungguh supaya dia lulus."');
    expect(content).toContain(
      "Ayat baharu mengubah hubungan tujuan kepada hubungan sebab atau hasil.",
    );
  });

  it("keeps IDs unique, children hidden when collapsed and expanded layout non-overlapping", () => {
    const nodes = collectNodes(bahasaMelayuForm2AyatMajmukMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);

    expect(getVisibleMindNodes(bahasaMelayuForm2AyatMajmukMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm2AyatMajmukMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm2AyatMajmukMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(bahasaMelayuForm2AyatMajmukMindMap, expanded).positions.entries(),
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
    collectNodes(bahasaMelayuForm2AyatMajmukMindMap).forEach((parent) => {
      const parentContent = [parent.label, parent.summary].filter(Boolean);
      parent.children?.forEach((child) => {
        expect(parentContent).not.toContain(child.label);
        if (child.summary) expect(parentContent).not.toContain(child.summary);
      });
    });
  });
});
