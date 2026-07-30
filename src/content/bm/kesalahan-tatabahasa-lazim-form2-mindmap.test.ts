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
import { bahasaMelayuForm2KesalahanTatabahasaLazimMindMap } from "./kesalahan-tatabahasa-lazim-form2-mindmap";

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

function findBranch(label: string) {
  return bahasaMelayuForm2KesalahanTatabahasaLazimMindMap.children?.find(
    (candidate) => candidate.label === label,
  );
}

describe("Bahasa Melayu Form 2 Kesalahan Tatabahasa Lazim mind map", () => {
  it("registers ten active Form 2 cards alongside the dedicated Forms 1 and 3 registries", () => {
    expect(tatabahasaTopics("Form 1").map((topic) => topic.key)).toEqual(form1Topics);
    expect(tatabahasaTopics("Form 3").map((topic) => topic.key)).toEqual([
      "Jenis Ayat",
      "Ragam Ayat",
      "Cakap Ajuk dan Cakap Pindah",
    ]);

    const topics = tatabahasaTopics("Form 2");
    expect(topics.map((topic) => topic.key)).toEqual(form2Topics);
    expect(topics).toHaveLength(10);
    expect(topics.every((topic) => topic.available && topic.selectable)).toBe(true);
    removedForm2Topics.forEach((key) => {
      expect(getChapter("bm", key, undefined, "Form 2")).toBeUndefined();
    });
  });

  it("registers only the required Kesalahan Tatabahasa Lazim mind-map resource", () => {
    const chapter = getChapter("bm", "Kesalahan Tatabahasa Lazim", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-kesalahan-tatabahasa-lazim-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Kesalahan Tatabahasa Lazim",
      title: "Kesalahan Tatabahasa Lazim",
      description:
        "Kesalahan umum dalam ejaan, imbuhan, kata tugas, binaan ayat dan penggunaan bahasa yang perlu dikenal pasti serta dibetulkan.",
      categoryLabel: "Tatabahasa",
      mindMap: {
        data: bahasaMelayuForm2KesalahanTatabahasaLazimMindMap,
        title: "Kesalahan Tatabahasa Lazim",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Kesalahan Tatabahasa Lazim", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
    expect(getChapter("bm", "Kesalahan Tatabahasa Lazim", undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", "Kesalahan Tatabahasa Lazim", undefined, "Form 3")).toBeUndefined();
  });

  it("places the new topic after Kata Pemeri as the final Form 2 topic", () => {
    const ids = getChaptersForSubject("bm", undefined, "Form 2")
      .filter((chapter) => chapter.categoryLabel === "Tatabahasa")
      .map((chapter) => chapter.id);

    expect(ids.slice(-2)).toEqual([
      "bm-f2-kata-pemeri-mindmap",
      "bm-f2-kesalahan-tatabahasa-lazim-mindmap",
    ]);
  });

  it("uses the required identity and fifteen title-only first-level branches", () => {
    expect(bahasaMelayuForm2KesalahanTatabahasaLazimMindMap).toMatchObject({
      id: "bm-f2-kesalahan-tatabahasa-lazim-root",
      label: "KESALAHAN TATABAHASA",
      summary:
        "Kesalahan tatabahasa lazim ialah kesalahan yang kerap berlaku dalam ejaan, pembentukan kata, penggunaan kata tugas dan pembinaan ayat.",
    });
    expect(
      bahasaMelayuForm2KesalahanTatabahasaLazimMindMap.children?.map((item) => item.label),
    ).toEqual([
      "Ejaan",
      "Huruf Besar",
      "Jarak dan Cantum",
      "Tanda Sempang",
      "Imbuhan",
      "Ayat Aktif dan Pasif",
      "Kata Sendi Nama",
      "Kata Pemeri",
      "Binaan Ayat",
      "Pencerakinan",
      "Kesalahan Makna",
      "Penyuntingan",
      "Strategi Semakan",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuForm2KesalahanTatabahasaLazimMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("covers standard spelling, capitalisation, spacing and hyphens", () => {
    const content = flattenContent(bahasaMelayuForm2KesalahanTatabahasaLazimMindMap);

    expect(content).toContain("didominassi → didominasi");
    expect(content).toContain('"murid itu membaca buku."');
    expect(content).toContain('"Negara Malaysia terletak di Asia Tenggara."');
    expect(content).toContain("di sekolah → kata sendi nama");
    expect(content).toContain("ditulis → imbuhan pasif");
    expect(content).toContain("di tulis → ditulis");
    expect(content).toContain("disekolah → di sekolah");
    expect(content).toContain("ke-21");
    expect(content).toContain("anti-Malaysia");
    expect(content).toContain("antirasuah • antidadah • prasekolah");
  });

  it("revises affixes without overgeneralising the two-k or loanword rules", () => {
    const content = flattenContent(findBranch("Imbuhan")!);

    expect(content).toContain("gerak + -kan = gerakkan");
    expect(content).toContain("menggerakan → menggerakkan");
    expect(content).toContain("pukul → memukul");
    expect(content).toContain("karang → mengarang");
    expect(content).toContain("memproses • mempraktikkan • mengkritik");
    expect(content).toContain("Jika soalan memberikan menguruskan, jangan ubah kepada pengurusan");
    expect(content).toContain("bukan pengulangan seluruh pelajaran Imbuhan Lanjutan");
  });

  it("distinguishes first-, second- and third-person passive structures", () => {
    const content = flattenContent(findBranch("Ayat Aktif dan Pasif")!);

    expect(content).toContain('"Buku itu saya baca."');
    expect(content).toContain('"Buku itu dibaca oleh saya."');
    expect(content).toContain(
      "Tatabahasa sekolah lazimnya menggunakan binaan pasif pendek bagi kata ganti nama diri pertama.",
    );
    expect(content).toContain('"Tugasan itu kamu siapkan."');
    expect(content).toContain('"Buku itu dibaca oleh Ali."');
    expect(content).toContain('"Buku itu saya dibaca." → "Buku itu saya baca."');
    expect(content).toContain("Jangan gugurkan kata bantu, subjek, objek, masa atau tempat");
  });

  it("distinguishes dari and daripada with a bounded ATM memory aid", () => {
    const content = flattenContent(findBranch("Kata Sendi Nama")!);

    expect(content).toContain("ATM — arah, tempat dan masa");
    expect(content).toContain("hadiah daripada ibu");
    expect(content).toContain("meja daripada kayu");
    expect(content).toContain("lebih tinggi daripada Ali");
    expect(content).toContain('"Hadiah itu diterima dari ibu."');
    expect(content).toContain('"Hadiah itu diterima daripada ibu."');
    expect(content).toContain("Gunakan ATM sebagai alat ingatan sahaja, bukan penerangan lengkap");
  });

  it("distinguishes ialah, adalah and merupakan without an absolute verb-looking rule", () => {
    const content = flattenContent(findBranch("Kata Pemeri")!);

    expect(content).toContain("Digunakan sebelum Frasa Nama.");
    expect(content).toContain("Digunakan sebelum Frasa Adjektif atau Frasa Sendi Nama.");
    expect(content).toContain('"Nama saya adalah Amir." → "Nama saya ialah Amir."');
    expect(content).toContain(
      '"Program itu ialah untuk semua murid." → "Program itu adalah untuk semua murid."',
    );
    expect(content).toContain('"Langkah utama adalah untuk memupuk perpaduan."');
    expect(content).toContain('"Langkah utama ialah pemupukan perpaduan."');
    expect(content).toContain(
      "jangan anggap setiap bentuk yang menyerupai kata kerja selepas ialah semestinya salah",
    );
    expect(content).toContain("Merupakan ialah kata kerja, bukan kata pemeri");
  });

  it("requires complete, grammatical sentences and meaning-preserving pencerakinan", () => {
    const structure = flattenContent(findBranch("Binaan Ayat")!);
    const pencerakinan = flattenContent(findBranch("Pencerakinan")!);

    expect(structure).toContain('"Sedang membaca buku."');
    expect(structure).toContain('"Farah sedang membaca buku."');
    expect(structure).toContain("Rumah besar di hujung jalan itu");
    expect(structure).toContain("telah dijual");
    expect(structure).toContain('"Amir tidak hadir ke sekolah kerana dia demam."');
    expect(pencerakinan).toContain('"Ali membaca buku."');
    expect(pencerakinan).toContain('"Siti menulis karangan."');
    expect(pencerakinan).toContain('"Amir membeli buku itu."');
    expect(pencerakinan).toContain('"Amir membaca buku itu."');
    expect(pencerakinan).toContain(
      "Jangan tambah maklumat baharu, buang fakta penting, tukar sebab kepada tujuan atau ubah rujukan asal.",
    );
  });

  it("separates semantic suitability from form and follows the question format", () => {
    const meaning = flattenContent(findBranch("Kesalahan Makna")!);
    const editing = flattenContent(findBranch("Penyuntingan")!);

    expect(meaning).toContain("Kerana menyatakan sebab, manakala supaya menyatakan tujuan.");
    expect(meaning).toContain("urus • mengurus • menguruskan • pengurus • pengurusan");
    expect(meaning).toContain("Ayat boleh kelihatan lengkap dari segi struktur tetapi masih salah");
    expect(editing).toContain(
      "Jangan anggap setiap soalan menggunakan format jawapan yang sama; ikuti arahan tepat.",
    );
    expect(editing).toContain(
      "Jangan berikan lebih banyak pembetulan daripada jumlah yang diminta",
    );
  });

  it("uses UASA framing, a five-pass review and excludes unrelated BM skill areas", () => {
    const content = flattenContent(bahasaMelayuForm2KesalahanTatabahasaLazimMindMap);

    expect(content).toContain("Semakan 1: Ejaan");
    expect(content).toContain("Semakan 5: Makna");
    expect(content).toContain("Tip UASA");
    expect(content).not.toContain("Tip SPM");
    expect(content).toContain("FN → ialah • FA / FS → adalah");
    expect(content).toContain("bentuk yang tepat dan konteks yang sesuai");
    expect(content).not.toContain("Bahasa Melayu Standard");
    expect(content).not.toContain("Peribahasa");
    expect(content).not.toContain("Pemahaman");
    expect(content).not.toContain("Ujian Mendengar");
  });

  it("keeps IDs unique, collapsed children hidden and expanded desktop layout non-overlapping", () => {
    const nodes = collectNodes(bahasaMelayuForm2KesalahanTatabahasaLazimMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);

    expect(
      getVisibleMindNodes(bahasaMelayuForm2KesalahanTatabahasaLazimMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm2KesalahanTatabahasaLazimMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuForm2KesalahanTatabahasaLazimMindMap, expanded),
    ).toHaveLength(nodes.length);

    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuForm2KesalahanTatabahasaLazimMindMap,
        expanded,
      ).positions.entries(),
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
    collectNodes(bahasaMelayuForm2KesalahanTatabahasaLazimMindMap).forEach((parent) => {
      const parentContent = [parent.label, parent.summary].filter(Boolean);
      parent.children?.forEach((child) => {
        expect(parentContent).not.toContain(child.label);
        if (child.summary) expect(parentContent).not.toContain(child.summary);
      });
    });
  });
});
