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
import { bahasaMelayuForm3KesalahanLazimDalamPenulisanMindMap } from "./kesalahan-lazim-dalam-penulisan-form3-mindmap";

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => true,
}));

const expectedTopics = [
  "Strategi Menjawab UASA",
  "Analisis Kehendak Soalan",
  "Teknik Menjana Idea KBAT",
  "Kesalahan Lazim dalam Penulisan",
];

const expectedBranches = [
  "Apa Itu?",
  "Kesalahan Memahami Soalan",
  "Kesalahan Isi",
  "Kesalahan Huraian",
  "Kesalahan Contoh",
  "Kesalahan Organisasi",
  "Kesalahan Tatabahasa",
  "Kesalahan Kosa Kata",
  "Kesalahan Penanda Wacana",
  "Kesalahan Peribahasa",
  "Kesalahan Ejaan & Tanda Baca",
  "Kesalahan Menyemak Jawapan",
  "Cara Mengelakkan Kesalahan",
  "Senarai Semak",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const branch = bahasaMelayuForm3KesalahanLazimDalamPenulisanMindMap.children?.find(
    (node) => node.label === label,
  );
  if (!branch) throw new Error(`Missing branch: ${label}`);
  return collectNodes(branch)
    .map((node) => `${node.label} ${node.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 3 Kesalahan Lazim dalam Penulisan mind map", () => {
  it("registers as the fourth active Form 3 Penulisan topic", () => {
    const chapter = getChapter("bm", "Kesalahan Lazim dalam Penulisan", undefined, "Form 3");

    expect(chapter).toMatchObject({
      id: "bm-f3-kesalahan-lazim-dalam-penulisan-mindmap",
      subjectId: "bm",
      form: "Form 3",
      chapterKey: "Kesalahan Lazim dalam Penulisan",
      title: "Kesalahan Lazim dalam Penulisan",
      description:
        "Kenal pasti kesalahan yang sering dilakukan dalam penulisan dan pelajari cara membetulkannya untuk menghasilkan karangan yang lebih berkualiti.",
      categoryLabel: "Penulisan",
      mindMap: {
        data: bahasaMelayuForm3KesalahanLazimDalamPenulisanMindMap,
        title: "Kesalahan Lazim dalam Penulisan",
      },
    });
    expect(hasResourceContent("bm", "Form 3", "Kesalahan Lazim dalam Penulisan", "mindMap")).toBe(
      true,
    );
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
    expect(
      getRegisteredSubjectChapters("bm", undefined, "Form 3")
        .filter((topic) => topic.categoryLabel === "Penulisan")
        .map((topic) => topic.key),
    ).toEqual(expectedTopics);
  });

  it("uses the required identity and title-only first-level hierarchy", () => {
    expect(bahasaMelayuForm3KesalahanLazimDalamPenulisanMindMap).toMatchObject({
      id: "bm-f3-kesalahan-lazim-dalam-penulisan-root",
      label: "KESALAHAN LAZIM",
      summary:
        "Mengenal pasti kesalahan lebih awal membantu menghasilkan penulisan yang tepat, gramatis, tersusun dan menepati kehendak soalan.",
    });
    expect(
      bahasaMelayuForm3KesalahanLazimDalamPenulisanMindMap.children?.map((branch) => branch.label),
    ).toEqual(expectedBranches);
    bahasaMelayuForm3KesalahanLazimDalamPenulisanMindMap.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.map((child) => child.label)).toEqual([
        "Penerangan",
        "Punca Kesalahan",
        "Contoh Salah",
        "Contoh Betul",
        "Tip Mengelakkan",
      ]);
    });
  });

  it("includes the required corrections, checklist and safe UASA guidance", () => {
    const allText = collectNodes(bahasaMelayuForm3KesalahanLazimDalamPenulisanMindMap)
      .map((node) => `${node.label} ${node.summary ?? ""}`)
      .join(" ");

    expect(branchText("Kesalahan Memahami Soalan")).toContain(
      "Huraikan langkah mengatasi pencemaran.",
    );
    expect(branchText("Kesalahan Isi")).toContain(
      "Masyarakat boleh menyertai gotong-royong bagi memastikan kawasan perumahan sentiasa bersih.",
    );
    expect(branchText("Kesalahan Huraian")).toContain("Mengapa? Bagaimana? Apakah kesannya?");
    expect(branchText("Kesalahan Tatabahasa")).toContain("Buku itu saya baca.");
    expect(branchText("Kesalahan Tatabahasa")).toContain("memperuntukkan");
    expect(branchText("Kesalahan Peribahasa")).toContain("Bagai aur dengan tebing.");
    expect(branchText("Kesalahan Ejaan & Tanda Baca")).toContain("ke-21");
    expect(branchText("Kesalahan Ejaan & Tanda Baca")).toContain("di sekolah");

    [
      "✓ Menjawab kehendak soalan",
      "✓ Isi relevan",
      "✓ Huraian lengkap",
      "✓ Contoh sesuai",
      "✓ Ayat gramatis",
      "✓ Penanda wacana sesuai",
      "✓ Kosa kata tepat",
      "✓ Ejaan betul",
      "✓ Tanda baca betul",
      "✓ Penutup lengkap",
    ].forEach((item) => expect(branchText("Senarai Semak")).toContain(item));

    expect(branchText("Tip UASA")).toContain(
      "Ikuti semua arahan yang diberikan dalam kertas peperiksaan.",
    );
    expect(allText.toLowerCase()).not.toMatch(/\b\d+\s+(?:patah perkataan|perenggan|minit)\b/);
    expect(allText.toLowerCase()).not.toContain("dijamin");
  });

  it("keeps ids unique and supports progressive expansion and desktop layout", () => {
    const nodes = collectNodes(bahasaMelayuForm3KesalahanLazimDalamPenulisanMindMap);
    expect(new Set(nodes.map((node) => node.id)).size).toBe(nodes.length);
    expect(
      getVisibleMindNodes(bahasaMelayuForm3KesalahanLazimDalamPenulisanMindMap, new Set()),
    ).toHaveLength(1);

    const expanded = getExpandableMindNodeIds(bahasaMelayuForm3KesalahanLazimDalamPenulisanMindMap);
    expect(
      getVisibleMindNodes(bahasaMelayuForm3KesalahanLazimDalamPenulisanMindMap, expanded),
    ).toHaveLength(nodes.length);
    expect(() =>
      calculateMindMapLayout(bahasaMelayuForm3KesalahanLazimDalamPenulisanMindMap, expanded),
    ).not.toThrow();
  });

  it("renders a collapsed mobile learning path without overflow or child leakage", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuForm3KesalahanLazimDalamPenulisanMindMap,
        mobileLayout: "learning-path",
      }),
    );

    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("KESALAHAN LAZIM");
    expect(markup).toContain("Kesalahan Ejaan &amp; Tanda Baca");
    expect(markup).not.toContain("Buku itu saya baca");
  });
});

