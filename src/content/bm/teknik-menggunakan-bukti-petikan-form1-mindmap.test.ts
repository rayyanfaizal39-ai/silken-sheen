import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  MindMap,
  type MindNode,
} from "@/components/MindMap";
import { getChapter, getRegisteredSubjectChapters, hasResourceContent } from "@/content/registry";
import { bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap } from "./teknik-menggunakan-bukti-petikan-form1-mindmap";
import { bahasaMelayuTingkatan1PemahamanRegistry } from "./tingkatan1-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const expectedTopics = [
  "Strategi Menjawab Soalan Pemahaman",
  "Mengenal Pasti Isi Tersurat",
  "Mengenal Pasti Isi Tersirat",
  "Maksud Frasa dan Ungkapan",
  "Menjawab Soalan KBAT",
  "Membuat Rumusan Ringkas",
  "Teknik Menggunakan Bukti daripada Petikan",
  "Kesalahan Lazim dalam Pemahaman",
];

const expectedBranches = [
  "Apa Itu Bukti?",
  "Mengapa Perlu Bukti?",
  "Cara Mencari Bukti",
  "Pilih Bukti Tepat",
  "Mengolah Bukti",
  "Bukti untuk Isi Tersurat",
  "Bukti untuk Isi Tersirat",
  "Contoh Soalan",
  "Kesalahan Lazim",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap.children?.find(
    (node) => node.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Teknik Menggunakan Bukti daripada Petikan mind map", () => {
  it("remains the seventh of exactly eight registered Form 1 Pemahaman topics", () => {
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan1PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );

    const chapter = getChapter(
      "bm",
      "Teknik Menggunakan Bukti daripada Petikan",
      undefined,
      "Form 1",
    );
    expect(chapter).toMatchObject({
      id: "bm-f1-teknik-menggunakan-bukti-petikan-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Teknik Menggunakan Bukti daripada Petikan",
      title: "Teknik Menggunakan Bukti daripada Petikan",
      description:
        "Belajar memilih bukti yang tepat daripada petikan untuk menyokong jawapan secara logik.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap,
        title: "Teknik Menggunakan Bukti daripada Petikan",
      },
    });
    expect(
      hasResourceContent("bm", "Form 1", "Teknik Menggunakan Bukti daripada Petikan", "mindMap"),
    ).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    const formTopics = getRegisteredSubjectChapters("bm", undefined, "Form 1");
    const pemahamanTopics = formTopics.filter((topic) => topic.categoryLabel === "Pemahaman");
    const activeIndex = pemahamanTopics.findIndex(
      (topic) => topic.key === "Teknik Menggunakan Bukti daripada Petikan",
    );
    expect(pemahamanTopics[activeIndex - 1]?.key).toBe("Membuat Rumusan Ringkas");
    expect(pemahamanTopics[activeIndex + 1]?.key).toBe("Kesalahan Lazim dalam Pemahaman");

    const formActiveIndex = formTopics.findIndex(
      (topic) => topic.key === "Teknik Menggunakan Bukti daripada Petikan",
    );
    expect(formTopics[formActiveIndex - 1]?.key).toBe("Membuat Rumusan Ringkas");
    expect(formTopics[formActiveIndex + 1]?.key).toBe("Kesalahan Lazim dalam Pemahaman");
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap).toMatchObject({
      id: "bm-f1-teknik-menggunakan-bukti-petikan-root",
      label: "BUKTI PETIKAN",
      summary:
        "Jawapan yang baik disokong oleh bukti daripada petikan. Bukti mesti relevan, tepat dan tidak mengubah maksud asal.",
    });
    expect(
      bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap.children?.map(
        (branch) => branch.label,
      ),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("defines evidence and explains why it strengthens answers", () => {
    expect(branchText("Apa Itu Bukti?")).toContain("maklumat daripada petikan");
    expect(branchText("Apa Itu Bukti?")).toContain("Bukan Pendapat Sendiri");
    expect(branchText("Mengapa Perlu Bukti?")).toContain("Lebih Tepat");
    expect(branchText("Mengapa Perlu Bukti?")).toContain("Lebih Meyakinkan");
    expect(branchText("Mengapa Perlu Bukti?")).toContain("Selaras dengan Kehendak Soalan");
  });

  it("teaches the complete evidence-search workflow", () => {
    const text = branchText("Cara Mencari Bukti");
    expect(text).toContain("1. Baca Soalan");
    expect(text).toContain("2. Kenal Pasti Kata Kunci");
    expect(text).toContain("3. Cari Ayat Berkaitan");
    expect(text).toContain("4. Gariskan Bukti");
    expect(text).toContain("5. Semak Semula Konteks");
    expect(branchText("Pilih Bukti Tepat")).toContain("Jangan Salin Seluruh Perenggan");
  });

  it("supports accurate paraphrasing without changing facts", () => {
    expect(branchText("Mengolah Bukti")).toContain("Parafrasa");
    expect(branchText("Mengolah Bukti")).toContain("Kekalkan Fakta");
    expect(branchText("Mengolah Bukti")).toContain(
      "Ravi menolong jirannya mengangkat barang berat",
    );
    expect(branchText("Mengolah Bukti")).toContain("pelaku, tindakan dan maksud asal kekal");
  });

  it("distinguishes direct evidence from evidence supporting an inference", () => {
    expect(branchText("Bukti untuk Isi Tersurat")).toContain("diambil terus");
    expect(branchText("Bukti untuk Isi Tersurat")).toContain("Untuk meminjam buku");
    expect(branchText("Bukti untuk Isi Tersirat")).toContain("Menyokong Inferens");
    expect(branchText("Bukti untuk Isi Tersirat")).toContain("Inferens");
    expect(branchText("Bukti untuk Isi Tersirat")).toContain("+");
    expect(branchText("Bukti untuk Isi Tersirat")).toContain("Siti seorang yang bertanggungjawab");
  });

  it("provides several complete question-evidence-answer explanations", () => {
    const examples = bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap.children?.find(
      (node) => node.label === "Contoh Soalan",
    );
    expect(examples?.children?.map((node) => node.label)).toEqual([
      "Tindakan",
      "Perasaan",
      "Sebab",
    ]);
    examples?.children?.forEach((example) => {
      expect(example.children?.map((node) => node.label)).toEqual([
        "Soalan",
        "Bukti",
        "Jawapan Contoh",
        "Penjelasan",
      ]);
    });
  });

  it("covers errors, the BUKTI mnemonic and safe UASA advice", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");
    expect(branchText("Kesalahan Lazim")).toContain("Tiada Bukti");
    expect(branchText("Kesalahan Lazim")).toContain("Bukti Salah");
    expect(branchText("Kesalahan Lazim")).toContain("Bukti Tidak Berkaitan");
    expect(branchText("Teknik Mengingat")).toContain("Rumus BUKTI");
    expect(branchText("Teknik Mengingat")).toContain("B — Baca Soalan");
    expect(branchText("Teknik Mengingat")).toContain("I — Isi Jawapan");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|minit|ayat|perkataan)\b/);
    expect(allText.toLowerCase()).not.toContain("dijamin");
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(
      bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap,
    );
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap, expanded),
    ).toHaveLength(nodes.length);
    const layout = calculateMindMapLayout(
      bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap,
      expanded,
    );
    expect(layout.positions.size).toBe(nodes.length);

    const positions = Array.from(layout.positions.entries());
    for (let firstIndex = 0; firstIndex < positions.length; firstIndex += 1) {
      const [firstId, first] = positions[firstIndex];
      for (let secondIndex = firstIndex + 1; secondIndex < positions.length; secondIndex += 1) {
        const [secondId, second] = positions[secondIndex];
        const overlaps =
          first.x < second.x + second.w &&
          first.x + first.w > second.x &&
          first.y - first.h / 2 < second.y + second.h / 2 &&
          first.y + first.h / 2 > second.y - second.h / 2;
        expect(overlaps, `${firstId} overlaps ${secondId}`).toBe(false);
      }
    }
  });

  it("renders a collapsed mobile path without overflow or child leakage", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("<button");
    expect(markup).toContain("BUKTI PETIKAN");
    expect(markup).toContain("Bukti untuk Isi Tersirat");
    expect(markup).not.toContain("Siti seorang yang bertanggungjawab");
  });
});
