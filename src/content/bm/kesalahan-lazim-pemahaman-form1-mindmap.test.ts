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
import { bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap } from "./kesalahan-lazim-pemahaman-form1-mindmap";
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
  "Apa Itu?",
  "Salah Faham Soalan",
  "Jawapan Tidak Lengkap",
  "Tiada Bukti",
  "Salin Bulat-bulat",
  "Isi Tidak Berkaitan",
  "Kesalahan Bahasa",
  "Pengurusan Masa",
  "Cara Mengelakkan",
  "Contoh Pembetulan",
  "Teknik Mengingat",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap.children?.find(
    (node) => node.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Kesalahan Lazim dalam Pemahaman mind map", () => {
  it("is the eighth and final registered Form 1 Pemahaman topic", () => {
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan1PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual(
      expectedTopics,
    );

    const chapter = getChapter("bm", "Kesalahan Lazim dalam Pemahaman", undefined, "Form 1");
    expect(chapter).toMatchObject({
      id: "bm-f1-kesalahan-lazim-pemahaman-mindmap",
      subjectId: "bm",
      form: "Form 1",
      chapterKey: "Kesalahan Lazim dalam Pemahaman",
      title: "Kesalahan Lazim dalam Pemahaman",
      description:
        "Kenal pasti kesilapan yang sering dilakukan murid dan cara mengelakkannya semasa menjawab soalan pemahaman.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap,
        title: "Kesalahan Lazim dalam Pemahaman",
      },
    });
    expect(hasResourceContent("bm", "Form 1", "Kesalahan Lazim dalam Pemahaman", "mindMap")).toBe(
      true,
    );
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");

    const formTopics = getRegisteredSubjectChapters("bm", undefined, "Form 1");
    const pemahamanTopics = formTopics.filter((topic) => topic.categoryLabel === "Pemahaman");
    const activeIndex = pemahamanTopics.findIndex(
      (topic) => topic.key === "Kesalahan Lazim dalam Pemahaman",
    );
    expect(pemahamanTopics[activeIndex - 1]?.key).toBe("Teknik Menggunakan Bukti daripada Petikan");
    expect(pemahamanTopics[activeIndex + 1]).toBeUndefined();

    const formActiveIndex = formTopics.findIndex(
      (topic) => topic.key === "Kesalahan Lazim dalam Pemahaman",
    );
    expect(formTopics[formActiveIndex - 1]?.key).toBe("Teknik Menggunakan Bukti daripada Petikan");
    expect(formTopics[formActiveIndex + 1]?.categoryLabel).not.toBe("Pemahaman");
  });

  it("uses the exact identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap).toMatchObject({
      id: "bm-f1-kesalahan-lazim-pemahaman-root",
      label: "KESALAHAN PEMAHAMAN",
      summary:
        "Ramai murid kehilangan markah bukan kerana tidak tahu jawapan, tetapi kerana melakukan kesalahan teknik menjawab dan tidak memahami kehendak soalan.",
    });
    expect(
      bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap.children?.map((branch) => branch.label),
    ).toEqual(expectedBranches);
    bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });
  });

  it("distinguishes common question misunderstandings", () => {
    expect(branchText("Salah Faham Soalan")).toContain("Tidak Membaca Arahan");
    expect(branchText("Salah Faham Soalan")).toContain("Faktor vs Langkah");
    expect(branchText("Salah Faham Soalan")).toContain("Sebab vs Kesan");
    expect(branchText("Salah Faham Soalan")).toContain("Tersurat vs Tersirat");
    expect(branchText("Salah Faham Soalan")).toContain("Bulatkan kata tugas");
  });

  it("repairs incomplete and unsupported answers", () => {
    expect(branchText("Jawapan Tidak Lengkap")).toContain("Hanya Satu Perkataan");
    expect(branchText("Jawapan Tidak Lengkap")).toContain("Tiada Subjek");
    expect(branchText("Jawapan Tidak Lengkap")).toContain("Tiada Alasan");
    expect(branchText("Jawapan Tidak Lengkap")).toContain("Tiada Huraian");
    expect(branchText("Tiada Bukti")).toContain("Cari Ayat Sokongan");
    expect(branchText("Tiada Bukti")).toContain("Sara seorang yang jujur kerana");
  });

  it("prevents copying, irrelevant additions and factual changes", () => {
    expect(branchText("Salin Bulat-bulat")).toContain("Menyalin Seluruh Perenggan");
    expect(branchText("Salin Bulat-bulat")).toContain("Olah Bahasa Sendiri");
    expect(branchText("Salin Bulat-bulat")).toContain("Jangan Ubah Fakta");
    expect(branchText("Isi Tidak Berkaitan")).toContain("Pengalaman Tidak Diminta");
    expect(branchText("Isi Tidak Berkaitan")).toContain("Fakta Luar");
    expect(branchText("Isi Tidak Berkaitan")).toContain("Lari daripada Tema");
  });

  it("covers language and time-management errors", () => {
    expect(branchText("Kesalahan Bahasa")).toContain("Ayat Tidak Gramatis");
    expect(branchText("Kesalahan Bahasa")).toContain("Ejaan Salah");
    expect(branchText("Kesalahan Bahasa")).toContain("Tanda Baca");
    expect(branchText("Kesalahan Bahasa")).toContain("Kata Tidak Tepat");
    expect(branchText("Pengurusan Masa")).toContain("Baca Dahulu");
    expect(branchText("Pengurusan Masa")).toContain("Jawab yang Mudah");
    expect(branchText("Pengurusan Masa")).toContain("Jangan Terlalu Lama");
  });

  it("teaches the five-step prevention routine", () => {
    const text = branchText("Cara Mengelakkan");
    expect(text).toContain("1. Fahami Soalan");
    expect(text).toContain("2. Cari Kata Kunci");
    expect(text).toContain("3. Cari Bukti");
    expect(text).toContain("4. Jawab dengan Ayat Gramatis");
    expect(text).toContain("5. Semak Semula");
  });

  it("provides several complete wrong-to-improved corrections", () => {
    const corrections = bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap.children?.find(
      (node) => node.label === "Contoh Pembetulan",
    );
    expect(corrections?.children?.length).toBeGreaterThanOrEqual(3);
    corrections?.children?.forEach((example) => {
      expect(example.children?.map((node) => node.label)).toEqual([
        "Jawapan Salah",
        "Mengapa Salah?",
        "Jawapan Dibaiki",
        "Mengapa Lebih Baik?",
      ]);
    });
  });

  it("includes SEMAK and avoids unsafe scoring claims", () => {
    const allText = collectNodes(bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");
    expect(branchText("Teknik Mengingat")).toContain("Rumus SEMAK");
    expect(branchText("Teknik Mengingat")).toContain("S — Soalan");
    expect(branchText("Teknik Mengingat")).toContain("E — Evidence");
    expect(branchText("Teknik Mengingat")).toContain("K — Kesemakan Akhir");
    expect(branchText("Tip UASA")).toContain("Baca Soalan Dua Kali");
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:markah|minit|ayat|perkataan)\b/);
    expect(allText.toLowerCase()).not.toContain("dijamin");
  });

  it("supports progressive expansion and a non-overlapping desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap, new Set()),
    ).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap, expanded),
    ).toHaveLength(nodes.length);
    const layout = calculateMindMapLayout(
      bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap,
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
        data: bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("<button");
    expect(markup).toContain("KESALAHAN PEMAHAMAN");
    expect(markup).toContain("Contoh Pembetulan");
    expect(markup).not.toContain("Sara seorang yang jujur kerana");
  });
});
