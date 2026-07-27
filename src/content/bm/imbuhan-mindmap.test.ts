import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import {
  getChapter,
  getChaptersForSubject,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import { bahasaMelayuImbuhanMindMap } from "./imbuhan-mindmap";

const forms = ["Form 1"] as const;
const description =
  "Unsur yang ditambahkan pada kata dasar untuk membentuk kata terbitan yang membawa makna tertentu.";

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

describe("Bahasa Melayu Imbuhan mind map", () => {
  it.each(forms)("registers one shared Imbuhan source for %s", (form) => {
    const chapter = getChapter("bm", "Imbuhan", undefined, form);

    expect(chapter).toMatchObject({
      title: "Imbuhan",
      description,
      categoryLabel: "Tatabahasa",
    });
    expect(chapter?.mindMap).toEqual({
      data: bahasaMelayuImbuhanMindMap,
      title: "Imbuhan",
    });
    expect(hasFormResourceContent("bm", form, "mindMap")).toBe(true);
  });

  it.each(forms)("appears ninth in the active Tatabahasa library for %s", (form) => {
    const topics = getRegisteredSubjectChapters("bm", undefined, form)
      .filter((chapter) => getChapter("bm", chapter.key, undefined, form)?.mindMap)
      .slice(0, 9);

    expect(topics.map((topic) => topic.key)).toEqual([
      "Kata Nama",
      "Kata Ganti Nama",
      "Kata Kerja",
      "Kata Adjektif",
      "Kata Sendi Nama",
      "Kata Hubung",
      "Kata Bilangan",
      "Penjodoh Bilangan",
      "Imbuhan",
    ]);
    expect(topics[8]).toMatchObject({
      label: "Imbuhan",
      description,
      categoryLabel: "Tatabahasa",
      available: true,
      selectable: true,
    });
  });

  it("uses the stable Form 1 registry ID", () => {
    expect(
      getChaptersForSubject("bm")
        .filter((chapter) => chapter.chapterKey === "Imbuhan")
        .map((chapter) => chapter.id),
    ).toEqual(["bm-f1-imbuhan-mindmap"]);
  });

  it("contains the required central summary and ten title-only branches", () => {
    expect(bahasaMelayuImbuhanMindMap.summary).toBe(
      "Imbuhan ialah unsur yang ditambahkan pada kata dasar untuk menghasilkan kata terbitan yang mempunyai makna baharu atau fungsi tatabahasa tertentu.",
    );
    expect(bahasaMelayuImbuhanMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Imbuhan Awalan",
      "Imbuhan Akhiran",
      "Imbuhan Apitan",
      "Imbuhan Sisipan",
      "Imbuhan Pinjaman",
      "Fungsi Imbuhan",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuImbuhanMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("represents all five affix categories with required examples", () => {
    const content = flattenContent(bahasaMelayuImbuhanMindMap).join("\n");

    expect(content).toContain("meN- • ber- • di- • ter- • peN- • se-");
    expect(content).toContain("-an • -kan • -i");
    expect(content).toContain(
      "meN-...-kan • di-...-kan • peN-...-an • ke-...-an • ber-...-an • per-...-an",
    );
    expect(content).toContain("-el- • -em- • -er- • -in-");
    expect(content).toContain("anti- • pro- • pasca- • pra- • eka- • dwi- • multi-");
    expect(content).toContain("telunjuk • gemuruh • gerigi • sinambung");
    expect(content).toContain(
      "antidadah • prokerajaan • pascamerdeka • prasekolah • dwibahasa • multimedia",
    );
  });

  it("explains common prefix functions without reducing ter- to one meaning", () => {
    const functions = bahasaMelayuImbuhanMindMap.children
      ?.find((branch) => branch.label === "Imbuhan Awalan")
      ?.children?.find((node) => node.label === "Fungsi Ringkas");
    const content = flattenContent(functions!).join("\n");

    expect(content).toContain("Lazimnya membentuk kata kerja aktif: mengajar • menulis");
    expect(content).toContain("Menunjukkan perbuatan atau keadaan mengikut konteks");
    expect(content).toContain("Membentuk kata kerja pasif: ditulis • dibaca");
    expect(content).toContain(
      "Boleh menunjukkan keadaan, keupayaan, darjah paling tinggi atau perbuatan tidak sengaja mengikut kata dan konteks.",
    );
    expect(content).toContain("Lazimnya membentuk kata nama pelaku: pendidik • penulis");
    expect(content).not.toContain("ter- sentiasa menunjukkan perbuatan tidak sengaja");
  });

  it("explains gerakkan and menggerakkan with the correct double-k rule", () => {
    const content = flattenContent(bahasaMelayuImbuhanMindMap).join("\n");

    expect(content).toContain("gerak + -kan");
    expect(content).toContain("gerakkan");
    expect(content).toContain(
      "Ejaan mempunyai kk kerana kata dasar gerak sudah berakhir dengan k dan akhiran -kan bermula dengan k.",
    );
    expect(content).toContain("Salah: mengerakan. Betul: menggerakkan.");
    expect(content).not.toContain("isii");
  });

  it("limits the borrowed-prefix hyphen rule to proper nouns", () => {
    const content = flattenContent(bahasaMelayuImbuhanMindMap).join("\n");

    expect(content).toContain("anti-Amerika • pro-Malaysia");
    expect(content).toContain("Jangan perluaskan peraturan ini kepada semua kata umum.");
    expect(content).toContain("antidadah • prokerajaan");
    expect(content).not.toContain("setiap imbuhan pinjaman mesti menggunakan tanda sempang");
  });

  it("shows accurate active and passive forms with an exam-safe caveat", () => {
    const content = flattenContent(bahasaMelayuImbuhanMindMap).join("\n");

    expect(content).toContain('"Ali menulis surat."');
    expect(content).toContain('"Surat itu ditulis oleh Ali."');
    expect(content).toContain(
      "pembentukan pasif bergantung pada struktur ayat dan jenis subjek; bukan sekadar membuang meN-.",
    );
    expect(content).toContain('Salah: "Ali ditulis surat."');
    expect(content).not.toContain("setiap kata kerja pasif hanya membuang meN-");
  });

  it("keeps sisipan and apitan guidance contextual", () => {
    const content = flattenContent(bahasaMelayuImbuhanMindMap).join("\n");

    expect(content).toContain(
      "Imbuhan sisipan jarang produktif dalam bahasa Melayu moden, tetapi masih menjadi sebahagian daripada sistem tatabahasa dan perlu dikenal pasti.",
    );
    expect(content).toContain(
      "Boleh menunjukkan perbuatan berulang, saling berlaku atau melibatkan banyak pelaku mengikut konteks",
    );
    expect(content).not.toContain("sisipan tidak lagi digunakan");
    expect(content).not.toContain("setiap apitan mempunyai satu fungsi sahaja");
  });

  it("gives every node a unique ID", () => {
    const nodes = collectNodes(bahasaMelayuImbuhanMindMap);

    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
  });

  it("does not repeat a parent's content in any direct child", () => {
    collectNodes(bahasaMelayuImbuhanMindMap).forEach((parent) => {
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
