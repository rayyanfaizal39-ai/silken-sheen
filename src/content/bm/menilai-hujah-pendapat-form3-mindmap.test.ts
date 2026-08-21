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
import { bahasaMelayuTingkatan1PemahamanRegistry } from "./tingkatan1-pemahaman-registry";
import { bahasaMelayuTingkatan2PemahamanRegistry } from "./tingkatan2-pemahaman-registry";
import { bahasaMelayuTingkatan3MenilaiHujahMindMap } from "./menilai-hujah-pendapat-form3-mindmap";
import { bahasaMelayuTingkatan3PemahamanRegistry } from "./tingkatan3-pemahaman-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const expectedBranches = [
  "Apa Itu Hujah?",
  "Fakta dan Pendapat",
  "Kenal Pasti Dakwaan",
  "Kenal Pasti Alasan",
  "Cari Bukti",
  "Relevan atau Tidak?",
  "Kuat atau Lemah?",
  "Logik atau Tidak?",
  "Banding Dua Pendapat",
  "Setuju atau Tidak?",
  "Bina Justifikasi",
  "Buat Kesimpulan",
  "Contoh Analisis",
  "Kesalahan Lazim",
  "Tip UASA",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan3MenilaiHujahMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 3 Menilai Hujah dan Pendapat mind map", () => {
  it("registers fourth with the exact card and page identity", () => {
    expect(bahasaMelayuTingkatan3PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan3PemahamanRegistry.map((topic) => topic.chapterKey)).toEqual([
      "Strategi Menjawab Soalan Pemahaman",
      "Analisis Isi Tersurat dan Tersirat",
      "Analisis Petikan Pelbagai Bahan",
      "Menilai Hujah dan Pendapat",
      "Maksud Frasa, Ungkapan dan Bahasa Kiasan",
      "Menjawab Soalan KBAT dan Penyelesaian Masalah",
      "Teknik Membuat Rumusan dan Sintesis Maklumat",
      "Kesalahan Lazim dan Strategi Semakan Pemahaman",
    ]);
    const chapter = getChapter("bm", "Menilai Hujah dan Pendapat", undefined, "Form 3");
    expect(chapter).toMatchObject({
      id: "bm-f3-menilai-hujah-pendapat-mindmap",
      subjectId: "bm",
      form: "Form 3",
      title: "Menilai Hujah dan Pendapat",
      description:
        "Menilai kekuatan sesuatu pendapat dengan mengenal pasti dakwaan, alasan, bukti dan hubungan logik sebelum membuat pertimbangan yang munasabah.",
      categoryLabel: "Pemahaman",
      mindMap: {
        data: bahasaMelayuTingkatan3MenilaiHujahMindMap,
        title: "Menilai Hujah dan Pendapat",
      },
    });
    expect(hasResourceContent("bm", "Form 3", chapter!.chapterKey, "mindMap")).toBe(true);
    expect(chapter).not.toHaveProperty("notes");
    expect(chapter).not.toHaveProperty("flashcards");
    expect(chapter).not.toHaveProperty("quiz");
  });

  it("uses the exact root and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan3MenilaiHujahMindMap).toMatchObject({
      id: "bm-f3-menilai-hujah-pendapat-root",
      label: "NILAI HUJAH",
      summary:
        "Hujah yang baik mempunyai pendirian yang jelas, alasan yang relevan, bukti yang sesuai dan hubungan logik antara idea.",
    });
    expect(bahasaMelayuTingkatan3MenilaiHujahMindMap.children?.map((item) => item.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan3MenilaiHujahMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches evidence-based argument evaluation without unsafe shortcuts", () => {
    expect(branchText("Apa Itu Hujah?")).toContain("HUJAH = DAKWAAN + ALASAN + BUKTI");
    expect(branchText("Fakta dan Pendapat")).toContain("satu kata kunci sahaja");
    expect(branchText("Kenal Pasti Dakwaan")).toContain("Dakwaan Bukan Alasan");
    expect(branchText("Kenal Pasti Alasan")).toContain("Mengapa Lemah?");
    expect(branchText("Cari Bukti")).toContain("Jangan Cipta Bukti");
    expect(branchText("Relevan atau Tidak?")).toContain("Benar Belum Tentu Relevan");
    expect(branchText("Kuat atau Lemah?")).toContain("Panjang Bukan Ukuran");
    expect(branchText("Logik atau Tidak?")).toContain("Kesimpulan Melampau");
    expect(branchText("Banding Dua Pendapat")).toContain("Tidak Semestinya Pilih Satu");
    expect(branchText("Setuju atau Tidak?")).toContain("tidak wajib bersetuju");
    expect(branchText("Buat Kesimpulan")).toContain("Ikut Kekuatan Bukti");
    expect(branchText("Tip UASA")).toContain("DAB + LOGIK = HUJAH LEBIH KUAT");
  });

  it("includes the complete balanced worked example", () => {
    const example = branchText("Contoh Analisis");
    expect(example).toContain("Contoh Latihan");
    expect(example).toContain("aktiviti luar bilik darjah");
    expect(example).toContain("Soalan 1 — Dakwaan");
    expect(example).toContain("Soalan 2 — Alasan");
    expect(example).toContain("Soalan 3 — Batasan");
    expect(example).toContain("Soalan 4 — Penilaian");
    expect(example).toContain("mempertimbangkan manfaat dan batasan");
  });

  it("derives previous and fifth-topic next navigation without touching T1 or T2", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 3").filter(
      (topic) => topic.categoryLabel === "Pemahaman",
    );
    const index = topics.findIndex((topic) => topic.key === "Menilai Hujah dan Pendapat");
    expect(topics[index - 1]?.key).toBe("Analisis Petikan Pelbagai Bahan");
    expect(topics[index + 1]?.key).toBe("Maksud Frasa, Ungkapan dan Bahasa Kiasan");
    expect(bahasaMelayuTingkatan1PemahamanRegistry).toHaveLength(8);
    expect(bahasaMelayuTingkatan2PemahamanRegistry).toHaveLength(8);
  });

  it("supports complete expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan3MenilaiHujahMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan3MenilaiHujahMindMap, new Set())).toHaveLength(
      1,
    );
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan3MenilaiHujahMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan3MenilaiHujahMindMap, expanded)).toHaveLength(
      nodes.length,
    );
    const positions = Array.from(
      calculateMindMapLayout(
        bahasaMelayuTingkatan3MenilaiHujahMindMap,
        expanded,
      ).positions.values(),
    );
    for (let first = 0; first < positions.length; first += 1) {
      for (let second = first + 1; second < positions.length; second += 1) {
        const a = positions[first];
        const b = positions[second];
        expect(
          a.x < b.x + b.w &&
            a.x + a.w > b.x &&
            a.y - a.h / 2 < b.y + b.h / 2 &&
            a.y + a.h / 2 > b.y - b.h / 2,
        ).toBe(false);
      }
    }
  });

  it("renders an accessible collapsed mobile path without horizontal overflow", () => {
    const markup = renderToStaticMarkup(
      createElement(MindMap, {
        data: bahasaMelayuTingkatan3MenilaiHujahMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("NILAI HUJAH");
    expect(markup).toContain("Apa Itu Hujah?");
    expect(markup).not.toContain("Hujah ialah pendapat atau pendirian");
  });
});
