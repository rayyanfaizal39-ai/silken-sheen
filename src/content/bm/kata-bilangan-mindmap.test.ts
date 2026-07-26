import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import {
  getChapter,
  getChaptersForSubject,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import { bahasaMelayuKataBilanganMindMap } from "./kata-bilangan-mindmap";

const forms = ["Form 1", "Form 3"] as const;
const description =
  "Perkataan yang digunakan untuk menyatakan jumlah, bilangan, pecahan, himpunan atau urutan sesuatu kata nama.";

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

describe("Bahasa Melayu Kata Bilangan mind map", () => {
  it.each(forms)("registers one shared Kata Bilangan source for %s", (form) => {
    const chapter = getChapter("bm", "Kata Bilangan", undefined, form);

    expect(chapter).toMatchObject({
      title: "Kata Bilangan",
      description,
      categoryLabel: "Tatabahasa",
    });
    expect(chapter?.mindMap).toEqual({
      data: bahasaMelayuKataBilanganMindMap,
      title: "Kata Bilangan",
    });
    expect(hasFormResourceContent("bm", form, "mindMap")).toBe(true);
  });

  it.each(forms)("appears seventh before Penjodoh Bilangan for %s", (form) => {
    const topics = getRegisteredSubjectChapters("bm", undefined, form)
      .filter((chapter) => getChapter("bm", chapter.key, undefined, form)?.mindMap)
      .slice(0, 8);

    expect(topics.map((topic) => topic.key)).toEqual([
      "Kata Nama",
      "Kata Ganti Nama",
      "Kata Kerja",
      "Kata Adjektif",
      "Kata Sendi Nama",
      "Kata Hubung",
      "Kata Bilangan",
      "Penjodoh Bilangan",
    ]);
    expect(topics[6]).toMatchObject({
      label: "Kata Bilangan",
      description,
      categoryLabel: "Tatabahasa",
      available: true,
      selectable: true,
    });
  });

  it("uses stable registry IDs for the two applicable forms", () => {
    expect(
      getChaptersForSubject("bm")
        .filter((chapter) => chapter.chapterKey === "Kata Bilangan")
        .map((chapter) => chapter.id),
    ).toEqual(["bm-f1-kata-bilangan-mindmap", "bm-f3-kata-bilangan-mindmap"]);
  });

  it("contains the required central summary and twelve title-only branches", () => {
    expect(bahasaMelayuKataBilanganMindMap.summary).toBe(
      "Perkataan yang digunakan untuk membilang atau menyatakan jumlah sesuatu kata nama.",
    );
    expect(bahasaMelayuKataBilanganMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Kata Bilangan Tentu",
      "Kata Bilangan Tak Tentu",
      "Kata Bilangan Himpunan",
      "Kata Bilangan Pisahan",
      "Kata Bilangan Tingkat",
      "Kata Bilangan Pecahan",
      "Ejaan",
      "Hubungan dengan Penjodoh Bilangan",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuKataBilanganMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("represents all six categories with accurate examples", () => {
    const content = flattenContent(bahasaMelayuKataBilanganMindMap).join("\n");

    expect(content).toContain("tiga = tentu");
    expect(content).toContain("beberapa = tak tentu");
    expect(content).toContain("kedua-dua = himpunan");
    expect(content).toContain("setiap = pisahan");
    expect(content).toContain("kelima = tingkat");
    expect(content).toContain("separuh = pecahan");
    expect(content).toContain("berpuluh-puluh • beratus-ratus • beribu-ribu • berjuta-juta");
    expect(content).toContain("setiap • tiap-tiap • masing-masing");
  });

  it("distinguishes definite and indefinite quantities without overgeneralising", () => {
    const content = flattenContent(bahasaMelayuKataBilanganMindMap).join("\n");

    expect(content).toContain("Menunjukkan jumlah yang tepat dan pasti.");
    expect(content).toContain(
      "Menunjukkan jumlah yang tidak tepat, tidak pasti atau tidak dinyatakan khusus.",
    );
    expect(content).toContain(
      "Tidak semua binaan angka memerlukan penjodoh bilangan: lima juta penduduk • dua kilogram gula • tiga hari",
    );
    expect(content).toContain(
      "Setiap kata bilangan tak tentu mempunyai fungsi dan konteks tersendiri",
    );
    expect(content).not.toContain("setiap kata bilangan tentu mesti");
    expect(content).not.toContain("semua kata bilangan tak tentu boleh saling menggantikan");
  });

  it("teaches quantity, order and the required hyphen rules", () => {
    const content = flattenContent(bahasaMelayuKataBilanganMindMap).join("\n");

    expect(content).toContain(
      "Jika maksudnya jumlah, gunakan empat orang murid. Jika maksudnya urutan, gunakan murid keempat. empat = jumlah; keempat = urutan.",
    );
    expect(content).toContain("ke-5 • ke-21 • ke-100");
    expect(content).toContain("tahun 1980-an • generasi 90-an • usia 20-an");
    expect(content).toContain("5 orang murid • 3 buah buku");
    expect(content).toContain("5-orang murid • 3-buah buku");
    expect(content).not.toContain(
      "setiap gabungan angka dengan perkataan memerlukan tanda sempang",
    );
  });

  it("keeps fraction guidance contextual and student-friendly", () => {
    const content = flattenContent(bahasaMelayuKataBilanganMindMap).join("\n");

    expect(content).toContain("separuh • setengah • suku • dua pertiga • tiga perempat");
    expect(content).toContain("separuh kek • setengah jam");
    expect(content).toContain("1/2 • 2/3 • 3/4");
    expect(content).toContain('"Dia menunggu selama suku jam."');
    expect(content).not.toContain("separuh dan setengah boleh saling menggantikan");
  });

  it("limits the Penjodoh Bilangan branch to a comparison overview without a dead link", () => {
    const relationship = bahasaMelayuKataBilanganMindMap.children?.find(
      (branch) => branch.label === "Hubungan dengan Penjodoh Bilangan",
    );
    const relatedTopic = relationship?.children?.find((node) => node.label === "Penjodoh Bilangan");
    const content = flattenContent(relationship!).join("\n");

    expect(relationship?.children?.map((node) => node.label)).toEqual([
      "Struktur Umum",
      "Tanpa Penjodoh Bilangan",
      "Bezakan",
      "Nota",
      "Penjodoh Bilangan",
    ]);
    expect(content).toContain("Kata Bilangan");
    expect(content).toContain("Penjodoh Bilangan");
    expect(relatedTopic?.summary).toBeUndefined();
    expect(relatedTopic?.children).toBeUndefined();
  });

  it("shows plural-marker errors and their corrected forms", () => {
    const content = flattenContent(bahasaMelayuKataBilanganMindMap).join("\n");

    expect(content).toContain('"Semua pelajar-pelajar hadir."');
    expect(content).toContain('"Semua pelajar hadir."');
    expect(content).toContain('"Para guru-guru berkumpul di dewan."');
    expect(content).toContain('"Para guru berkumpul di dewan."');
    expect(content).toContain('"Setiap murid-murid menerima buku."');
    expect(content).toContain('"Setiap murid menerima buku."');
    expect(content).toContain("Perkataan semua sudah menunjukkan jamak");
  });

  it("gives every node a unique ID", () => {
    const nodes = collectNodes(bahasaMelayuKataBilanganMindMap);

    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
  });

  it("does not repeat a parent's content in any direct child", () => {
    collectNodes(bahasaMelayuKataBilanganMindMap).forEach((parent) => {
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
