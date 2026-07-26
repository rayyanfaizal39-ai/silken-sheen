import { describe, expect, it } from "vitest";
import type { MindNode } from "@/components/MindMap";
import {
  getChapter,
  getChaptersForSubject,
  getRegisteredSubjectChapters,
  hasFormResourceContent,
} from "@/content/registry";
import { bahasaMelayuPenandaWacanaMindMap } from "./penanda-wacana-mindmap";

const forms = ["Form 1", "Form 3"] as const;
const description =
  "Perkataan atau frasa yang menghubungkan idea supaya penulisan menjadi tersusun, lancar dan mudah difahami.";

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

describe("Bahasa Melayu Penanda Wacana mind map", () => {
  it.each(forms)("registers one shared Penanda Wacana source for %s", (form) => {
    const chapter = getChapter("bm", "Penanda Wacana", undefined, form);

    expect(chapter).toMatchObject({
      title: "Penanda Wacana",
      description,
      categoryLabel: "Tatabahasa",
    });
    expect(chapter?.mindMap).toEqual({
      data: bahasaMelayuPenandaWacanaMindMap,
      title: "Penanda Wacana",
    });
    expect(hasFormResourceContent("bm", form, "mindMap")).toBe(true);
  });

  it.each(forms)("appears tenth in the active Tatabahasa library for %s", (form) => {
    const topics = getRegisteredSubjectChapters("bm", undefined, form)
      .filter((chapter) => getChapter("bm", chapter.key, undefined, form)?.mindMap)
      .slice(0, 10);

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
      "Penanda Wacana",
    ]);
    expect(topics[9]).toMatchObject({
      label: "Penanda Wacana",
      description,
      categoryLabel: "Tatabahasa",
      available: true,
      selectable: true,
    });
  });

  it("enhances the existing chapter rows without duplicating them or losing flashcards", () => {
    const chapters = getChaptersForSubject("bm").filter(
      (chapter) => chapter.chapterKey === "Penanda Wacana",
    );
    const flashcardOrder = (form: "Form 1" | "Form 2" | "Form 3") => {
      const keys = getRegisteredSubjectChapters("bm", undefined, form).map(
        (chapter) => chapter.key,
      );
      return ["Karangan Pendek", "Karangan Panjang", "Penanda Wacana"].map((key) =>
        keys.indexOf(key),
      );
    };

    expect(chapters.map((chapter) => chapter.id)).toEqual([
      "bm-f1-penanda-wacana",
      "bm-f2-penanda-wacana",
      "bm-f3-penanda-wacana",
    ]);
    expect(chapters).toHaveLength(3);
    expect(chapters[0]).toHaveProperty("flashcards");
    expect(chapters[0].flashcards?.length).toBeGreaterThan(0);
    expect(chapters[1]).toHaveProperty("flashcards");
    expect(chapters[1]).not.toHaveProperty("mindMap");
    expect(chapters[1]).not.toHaveProperty("categoryLabel");
    expect(flashcardOrder("Form 1")).toEqual([...flashcardOrder("Form 1")].sort((a, b) => a - b));
    expect(flashcardOrder("Form 2")).toEqual([...flashcardOrder("Form 2")].sort((a, b) => a - b));
  });

  it("contains the required central summary and eleven title-only branches", () => {
    expect(bahasaMelayuPenandaWacanaMindMap.summary).toBe(
      "Perkataan atau rangkaian perkataan yang menghubungkan ayat dan perenggan supaya penulisan menjadi lebih koheren.",
    );
    expect(bahasaMelayuPenandaWacanaMindMap.children?.map((branch) => branch.label)).toEqual([
      "Definisi",
      "Memulakan Idea",
      "Penambahan",
      "Sebab dan Akibat",
      "Memberi Contoh",
      "Kesimpulan",
      "Kosa Kata Aras Tinggi",
      "Hubungan dengan Kata Hubung",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ]);
    bahasaMelayuPenandaWacanaMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("covers every major discourse-marker function with examples", () => {
    const content = flattenContent(bahasaMelayuPenandaWacanaMindMap).join("\n");

    expect(content).toContain("Selain itu • Di samping itu • Seterusnya");
    expect(content).toContain("Tambahan pula • Malahan • Bahkan • Di samping itu • Sementelahan");
    expect(content).toContain("Hal ini dikatakan demikian kerana • Disebabkan itu");
    expect(content).toContain("Oleh itu • Sehubungan dengan itu • Rentetan itu • Justeru");
    expect(content).toContain("Sebagai contohnya • Misalnya • Antaranya ialah");
    expect(content).toContain(
      "Kesimpulannya • Konklusinya • Tuntasnya • Sebagai pengitlakan • Akhir kata",
    );
  });

  it("explains the advanced vocabulary before encouraging its use", () => {
    const content = flattenContent(bahasaMelayuPenandaWacanaMindMap).join("\n");

    expect(content).toContain("Marcapada");
    expect(content).toContain("Bermaksud dunia hari ini.");
    expect(content).toContain("Sementelahan");
    expect(content).toContain("Bermaksud tambahan pula.");
    expect(content).toContain("Izharnya");
    expect(content).toContain("Bermaksud jelasnya.");
    expect(content).toContain("Seyogia");
    expect(content).toContain("Bermaksud sepatutnya.");
    expect(content).toContain("Kendatipun");
    expect(content).toContain("Bermaksud meskipun.");
    expect(content).toContain("Kosa Kata Lanjutan");
    expect(content).toContain("memahami maksud dan konteksnya sebelum menggunakannya");
  });

  it("distinguishes Penanda Wacana from Kata Hubung accurately", () => {
    const relationship = bahasaMelayuPenandaWacanaMindMap.children?.find(
      (branch) => branch.label === "Hubungan dengan Kata Hubung",
    );
    const content = flattenContent(relationship!).join("\n");

    expect(content).toContain("Kedua-duanya membantu menghubungkan idea.");
    expect(content).toContain("Menghubungkan kata, frasa atau klausa.");
    expect(content).toContain("Menghubungkan idea, ayat atau perenggan.");
    expect(content).toContain('"Ali belajar kerana ingin berjaya."');
    expect(content).toContain('"Oleh itu, Ali berjaya dalam peperiksaan."');
    expect(content).toContain("ialah unsur bahasa yang berbeza");
  });

  it("teaches context-based use instead of absolute rules", () => {
    const content = flattenContent(bahasaMelayuPenandaWacanaMindMap).join("\n");

    expect(content).toContain("Pilih penanda wacana yang sepadan dengan maksud dan konteks.");
    expect(content).toContain(
      "Penggunaan terlalu banyak penanda wacana menyebabkan penulisan kedengaran tidak semula jadi.",
    );
    expect(content).not.toContain("semua penanda wacana ialah kata hubung");
    expect(content).not.toContain("semua kata hubung ialah penanda wacana");
    expect(content).not.toContain("setiap ayat mesti dimulakan dengan penanda wacana");
    expect(content).not.toContain("boleh digunakan dalam semua situasi");
    expect(content).not.toContain("meningkatkan markah secara automatik");
  });

  it("includes the required common errors and UASA guidance", () => {
    const content = flattenContent(bahasaMelayuPenandaWacanaMindMap).join("\n");

    expect(content).toContain('Elakkan "Selain itu, tambahan pula...".');
    expect(content).toContain(
      'Jangan gunakan "Sebaliknya" apabila tiada perbandingan atau pertentangan.',
    );
    expect(content).toContain("Fahami fungsi penanda wacana sebelum menggunakannya.");
    expect(content).toContain("idea baharu, tambahan, sebab, akibat, contoh atau kesimpulan");
    expect(content).toContain("Elakkan mengulang penanda wacana yang sama sepanjang karangan.");
    expect(content).toContain("Tip UASA");
    expect(content).not.toContain("Tip SPM");
  });

  it("gives every node a unique ID", () => {
    const nodes = collectNodes(bahasaMelayuPenandaWacanaMindMap);

    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
  });

  it("does not repeat a parent's content in any direct child", () => {
    collectNodes(bahasaMelayuPenandaWacanaMindMap).forEach((parent) => {
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
