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
import { bahasaMelayuForm2ImbuhanLanjutanMindMap } from "./imbuhan-lanjutan-form2-mindmap";

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
  return bahasaMelayuForm2ImbuhanLanjutanMindMap.children?.find(
    (candidate) => candidate.label === label,
  );
}

describe("Bahasa Melayu Form 2 Imbuhan Lanjutan mind map", () => {
  it("registers exactly ten active Form 2 cards while preserving Forms 1 and 3", () => {
    expect(tatabahasaTopics("Form 1").map((topic) => topic.key)).toEqual(form1And3Topics);
    expect(tatabahasaTopics("Form 3").map((topic) => topic.key)).toEqual(form1And3Topics);

    const topics = tatabahasaTopics("Form 2");
    expect(topics.map((topic) => topic.key)).toEqual(form2Topics);
    expect(topics).toHaveLength(10);
    expect(topics.every((topic) => topic.available && topic.selectable)).toBe(true);
    removedForm2Topics.forEach((key) => {
      expect(getChapter("bm", key, undefined, "Form 2")).toBeUndefined();
    });
  });

  it("registers only the required Imbuhan Lanjutan mind-map resource", () => {
    const chapter = getChapter("bm", "Imbuhan Lanjutan", undefined, "Form 2");

    expect(chapter).toMatchObject({
      id: "bm-f2-imbuhan-lanjutan-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: "Imbuhan Lanjutan",
      title: "Imbuhan Lanjutan",
      description:
        "Penggunaan imbuhan yang lebih kompleks, termasuk imbuhan pinjaman, sisipan, perubahan bentuk kata dan peraturan ejaan dalam pembentukan kata terbitan.",
      categoryLabel: "Tatabahasa",
      mindMap: {
        data: bahasaMelayuForm2ImbuhanLanjutanMindMap,
        title: "Imbuhan Lanjutan",
      },
    });
    expect(hasResourceContent("bm", "Form 2", "Imbuhan Lanjutan", "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(chapter).not.toHaveProperty("video");
    expect(getChapter("bm", "Imbuhan Lanjutan", undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", "Imbuhan Lanjutan", undefined, "Form 3")).toBeUndefined();
  });

  it("places Imbuhan Lanjutan immediately before Kata Pemeri", () => {
    const ids = getChaptersForSubject("bm", undefined, "Form 2")
      .filter((chapter) => chapter.categoryLabel === "Tatabahasa")
      .map((chapter) => chapter.id);

    const imbuhanIndex = ids.indexOf("bm-f2-imbuhan-lanjutan-mindmap");
    expect(ids.slice(imbuhanIndex, imbuhanIndex + 2)).toEqual([
      "bm-f2-imbuhan-lanjutan-mindmap",
      "bm-f2-kata-pemeri-mindmap",
    ]);
  });

  it("uses the required identity and fourteen title-only first-level branches", () => {
    expect(bahasaMelayuForm2ImbuhanLanjutanMindMap).toMatchObject({
      id: "bm-f2-imbuhan-lanjutan-root",
      label: "IMBUHAN LANJUTAN",
      summary:
        "Imbuhan lanjutan melibatkan penggunaan imbuhan yang lebih kompleks untuk membentuk kata terbitan yang tepat mengikut makna, bentuk dan konteks.",
    });
    expect(bahasaMelayuForm2ImbuhanLanjutanMindMap.children?.map((item) => item.label)).toEqual([
      "Definisi",
      "Imbuhan Pinjaman",
      "Awalan Pinjaman",
      "Akhiran Pinjaman",
      "Imbuhan Sisipan",
      "Peluluhan Huruf",
      "Perubahan Bentuk meN-",
      "Perubahan Bentuk peN-",
      "Dua Huruf k",
      "Tanda Sempang",
      "Pemilihan Imbuhan",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuForm2ImbuhanLanjutanMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("presents Imbuhan Lanjutan as a learning grouping rather than a formal affix type", () => {
    const content = flattenContent(findBranch("Definisi")!);

    expect(content).toContain("Imbuhan termasuk dalam bidang morfologi.");
    expect(content).toContain(
      "Tajuk ini bukan kategori imbuhan formal yang setara dengan awalan, akhiran, apitan dan sisipan.",
    );
  });

  it("distinguishes loan affixes from established, non-productive insertions", () => {
    const loanAffixes = flattenContent(findBranch("Imbuhan Pinjaman")!);
    const insertions = flattenContent(findBranch("Imbuhan Sisipan")!);

    expect(loanAffixes).toContain(
      "unsur imbuhan yang berasal daripada bahasa lain dan digunakan dalam bahasa Melayu",
    );
    expect(loanAffixes).toContain(
      "antirasuah • prasekolah • subtopik • multimedia • mahasiswa • profesionalisme",
    );
    expect(insertions).toContain("tapak → telapak");
    expect(insertions).toContain("guruh → gemuruh");
    expect(insertions).toContain("gigi → gerigi");
    expect(insertions).toContain("Sisipan tidak begitu produktif dalam bahasa Melayu moden.");
    expect(insertions).toContain(
      "tidak boleh dimasukkan secara bebas ke dalam sebarang kata dasar",
    );
  });

  it("uses established loan-prefix and loan-suffix examples with productivity cautions", () => {
    const prefixes = flattenContent(findBranch("Awalan Pinjaman")!);
    const suffixes = flattenContent(findBranch("Akhiran Pinjaman")!);

    expect(prefixes).toContain("antirasuah • antidadah • antioksidan");
    expect(prefixes).toContain("prasekolah • prasejarah • prabayar • prasyarat");
    expect(prefixes).toContain("subtopik • subkategori • subseksyen");
    expect(prefixes).toContain('Jangan menganalisis "subjek" secara mekanikal sebagai sub- + jek');
    expect(suffixes).toContain("ilmuwan • usahawan • sukarelawan");
    expect(suffixes).toContain("nasionalisme • patriotisme • profesionalisme");
    expect(suffixes).toContain("globalisasi • digitalisasi • modenisasi");
    expect(suffixes).toContain(
      "Jangan anggap setiap akhiran pinjaman produktif atau boleh digabungkan dengan sebarang kata dasar.",
    );
  });

  it("explains meN-, peN- and peluluhan without an infallible letter table", () => {
    const men = flattenContent(findBranch("Perubahan Bentuk meN-")!);
    const pen = flattenContent(findBranch("Perubahan Bentuk peN-")!);
    const peluluhan = flattenContent(findBranch("Peluluhan Huruf")!);

    expect(men).toContain("me-, mem-, men-, meng-, meny- atau menge-");
    expect(men).toContain("membaca • membawa • memfitnah • memproses");
    expect(men).toContain("cat → mengecat");
    expect(men).toContain(
      "Jangan menganggap jadual huruf sebagai rumus yang tidak pernah berubah.",
    );
    expect(pen).toContain("orang, pelaku, alat, proses atau hasil");
    expect(pen).toContain("proses → pemprosesan");
    expect(pen).toContain("pemproses\nOrang atau alat yang memproses.");
    expect(peluluhan).toContain("kaji → mengkaji");
    expect(peluluhan).toContain("karang → mengarang");
    expect(peluluhan).toContain("memproses • mempraktikkan • menstrukturkan • mengkritik");
    expect(peluluhan).toContain(
      "Peluluhan bukan peraturan yang bergantung pada huruf pertama semata-mata.",
    );
  });

  it("limits the two-k rule to a base ending in k plus -kan", () => {
    const content = flattenContent(findBranch("Dua Huruf k")!);

    expect(content).toContain("gerak");
    expect(content).toContain("-kan");
    expect(content).toContain("gerakkan");
    expect(content).toContain("menggerakkan");
    expect(content).toContain("masuk + -kan → masukkan");
    expect(content).toContain("menggerakan");
    expect(content).toContain("khusus pada sempadan kata dasar berakhir k dengan akhiran -kan");
  });

  it("applies hyphens only to appropriate proper-name combinations", () => {
    const content = flattenContent(findBranch("Tanda Sempang")!);

    expect(content).toContain("anti-Amerika • pro-Malaysia");
    expect(content).toContain("antidadah • antirasuah • prasekolah • multibahasa");
    expect(content).toContain("pro-Asia");
    expect(content).toContain("anti Amerika");
    expect(content).toContain("antiamerika");
    expect(content).toContain(
      "Jangan menggunakan tanda sempang secara automatik selepas setiap awalan pinjaman.",
    );
  });

  it("preserves the supplied derived form and checks meaning, class and syntax", () => {
    const selection = flattenContent(findBranch("Pemilihan Imbuhan")!);
    const errors = flattenContent(findBranch("Kesalahan Lazim")!);

    expect(selection).toContain("urus → mengurus → menguruskan → pengurus → pengurusan");
    expect(selection).toContain('"Pihak sekolah menguruskan program itu."');
    expect(selection).toContain('"Pengurusan program itu sangat teratur."');
    expect(selection).toContain("Kata Diberi\nmenguruskan");
    expect(selection).toContain("Jangan Tukar kepada\npengurusan");
    expect(errors).toContain("mempukul");
    expect(errors).toContain("memukul");
    expect(errors).toContain("mengkarang");
    expect(errors).toContain("mengarang");
    expect(errors).toContain("memroses");
    expect(errors).toContain("memproses");
  });

  it("uses UASA framing and includes the required spelling checks", () => {
    const content = flattenContent(bahasaMelayuForm2ImbuhanLanjutanMindMap);

    expect(content).toContain("Tip UASA");
    expect(content).not.toContain("Tip SPM");
    expect(content).toContain("didominassi");
    expect(content).toContain("didominasi");
    expect(content).toContain("memperuntukan");
    expect(content).toContain("memperuntukkan");
    expect(content).toContain("dua huruf k sebelum -kan");
    expect(content).toContain("awalan di- yang dirapatkan dengan kata kerja");
  });

  it("keeps IDs unique, collapsed children hidden and expanded desktop layout non-overlapping", () => {
    const nodes = collectNodes(bahasaMelayuForm2ImbuhanLanjutanMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);

    expect(getVisibleMindNodes(bahasaMelayuForm2ImbuhanLanjutanMindMap, new Set())).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm2ImbuhanLanjutanMindMap);
    expect(getVisibleMindNodes(bahasaMelayuForm2ImbuhanLanjutanMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(bahasaMelayuForm2ImbuhanLanjutanMindMap, expanded).positions.entries(),
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
    collectNodes(bahasaMelayuForm2ImbuhanLanjutanMindMap).forEach((parent) => {
      const parentContent = [parent.label, parent.summary].filter(Boolean);
      parent.children?.forEach((child) => {
        expect(parentContent).not.toContain(child.label);
        if (child.summary) expect(parentContent).not.toContain(child.summary);
      });
    });
  });
});
