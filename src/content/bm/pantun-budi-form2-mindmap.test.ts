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
import { bahasaMelayuTingkatan2PantunBudiMindMap } from "./pantun-budi-form2-mindmap";
import { bahasaMelayuTingkatan2KomsasRegistry } from "./tingkatan2-komsas-registry";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const title = "Pantun Budi";
const expectedBranches = [
  "Maksud Rangkap",
  "Tema",
  "Persoalan",
  "Bentuk",
  "Ciri Pantun",
  "Gaya Bahasa",
  "Konsep Budi",
  "Nilai",
  "Pengajaran",
  "Kata Kunci",
  "Teknik Menjawab",
  "Kesalahan Lazim",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan2PantunBudiMindMap.children?.find(
    (item) => item.label === label,
  );
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 2 Pantun Budi mind map", () => {
  it("preserves earlier topics and registers Pantun Budi exactly once", () => {
    expect(bahasaMelayuTingkatan2KomsasRegistry.map((topic) => topic.chapterKey)).toEqual([
      "Pantun Alam Remaja",
      "Pantun Kiasan",
      title,
      "Pantun Nasihat",
      "Pantun Kasih Sayang",
      "Syair Nasihat (Penghujung Thamarat al-Muhimmah)",
      "Dalam Persekitaran Kata-kata",
    ]);
    expect(
      bahasaMelayuTingkatan2KomsasRegistry.filter((topic) => topic.chapterKey === title),
    ).toHaveLength(1);
    expect(getChapter("bm", title, undefined, "Form 2")).toMatchObject({
      id: "bm-f2-pantun-budi-mindmap",
      subjectId: "bm",
      form: "Form 2",
      chapterKey: title,
      title,
      description:
        "Pantun yang menekankan kepentingan budi bahasa, mengenang jasa, menjaga tutur kata dan memelihara kemuliaan diri serta bangsa.",
      categoryLabel: "KOMSAS",
      mindMap: { data: bahasaMelayuTingkatan2PantunBudiMindMap, title },
    });
    expect(hasResourceContent("bm", "Form 2", title, "mindMap")).toBe(true);
    expect(getChapter("bm", title, undefined, "Form 1")).toBeUndefined();
    expect(getChapter("bm", title, undefined, "Form 3")).toBeUndefined();
  });

  it("uses registry-driven previous and next navigation", () => {
    const topics = getRegisteredSubjectChapters("bm", undefined, "Form 2").filter(
      (topic) => topic.categoryLabel === "KOMSAS",
    );
    const index = topics.findIndex((topic) => topic.key === title);
    expect(topics.map((topic) => topic.key)).toEqual([
      "Pantun Alam Remaja",
      "Pantun Kiasan",
      title,
      "Pantun Nasihat",
      "Pantun Kasih Sayang",
      "Syair Nasihat (Penghujung Thamarat al-Muhimmah)",
      "Dalam Persekitaran Kata-kata",
    ]);
    expect(topics[index - 1]?.key).toBe("Pantun Kiasan");
    expect(topics[index + 1]?.key).toBe("Pantun Nasihat");
  });

  it("uses the prescribed identity and twelve title-only first-level branches", () => {
    expect(bahasaMelayuTingkatan2PantunBudiMindMap).toMatchObject({
      id: "bm-f2-pantun-budi-root",
      label: "PANTUN BUDI",
      summary:
        "Pantun Budi menekankan bahawa budi bahasa dan jasa yang baik amat bernilai dalam kehidupan. Seseorang yang berbudi akan dihormati, manakala martabat masyarakat dan bangsa turut dinilai melalui bahasa serta tingkah lakunya.",
    });
    expect(bahasaMelayuTingkatan2PantunBudiMindMap.children?.map((item) => item.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan2PantunBudiMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("teaches exactly seven verified rangkap meanings and memory cues", () => {
    const branch = bahasaMelayuTingkatan2PantunBudiMindMap.children?.find(
      (item) => item.label === "Maksud Rangkap",
    );
    expect(branch?.children?.map((item) => item.label)).toEqual([
      "Rangkap 1 — Jasa Dikenang",
      "Rangkap 2 — Budi dan Bahasa",
      "Rangkap 3 — Manusia Tanpa Budi",
      "Rangkap 4 — Kekayaan Mengatasi Budi",
      "Rangkap 5 — Budi Lebih Utama daripada Kemewahan",
      "Rangkap 6 — Budi Memuliakan Diri dan Bangsa",
      "Rangkap 7 — Kebijaksanaan yang Sepadan",
    ]);
    branch?.children?.forEach((rangkap) => {
      expect(rangkap.children?.map((item) => item.label)).toEqual(["Maksud", "Kata Kunci"]);
    });
    const text = branchText("Maksud Rangkap");
    expect(text).toContain("JASA → DIKENANG");
    expect(text).toContain("TIADA BUDI → DIPANDANG HINA");
    expect(text).toContain("KEKAYAAN vs BUDI");
    expect(text).toContain("bukan teladan yang wajar diikuti");
    expect(text).toContain("SEDERHANA + BERBUDI");
    expect(text).toContain("BAHASA → MARTABAT BANGSA");
    expect(text).toContain("BIJAK + BIJAK → SEPADAN");
    expect(text).not.toContain("Rangkap 8");
  });

  it("uses the accepted theme, supported issues and verified formal structure", () => {
    expect(branchText("Tema")).toContain("KEPENTINGAN BUDI BAHASA DALAM KEHIDUPAN");
    const persoalan = branchText("Persoalan");
    for (const idea of [
      "Jasa yang Baik Sentiasa Dikenang",
      "Kepentingan Budi dalam Kehidupan",
      "Kehinaan Manusia yang Tidak Berbudi",
      "Kekayaan Diutamakan sehingga Budi Terpinggir",
      "Kemiskinan Bukan Penghalang untuk Berbudi",
      "Bahasa Mencerminkan Martabat Bangsa",
      "Kebijaksanaan Menyerlah apabila Bertemu yang Sepadan",
    ]) {
      expect(persoalan).toContain(idea);
    }

    const bentuk = branchText("Bentuk");
    expect(bentuk).toContain("Baik Budi, Indah Bahasa");
    expect(bentuk).toContain("Tujuh Rangkap");
    expect(bentuk).toContain("Pantun Empat Kerat");
    expect(bentuk).toContain("Tiga hingga Enam Patah Kata");
    expect(bentuk).toContain("Lima hingga Sebelas Suku Kata");
    expect(bentuk).toContain("Rima Dominan abab; Rangkap 5 aaaa");
    expect(bentuk).toContain("Bentuk Terikat");
  });

  it("uses only verified devices and teaches the full concept of budi", () => {
    const gaya = branchText("Gaya Bahasa");
    for (const technique of [
      "Imej Alam",
      "Simile",
      "Repetisi",
      "Asonansi",
      "Aliterasi",
      "Kata Ganda",
      "Sinkope",
    ]) {
      expect(gaya).toContain(technique);
    }
    expect(gaya).not.toContain("Inversi");
    const konsep = branchText("Konsep Budi");
    for (const aspect of ["Perbuatan", "Jasa", "Bahasa", "Tingkah Laku", "Sikap"]) {
      expect(konsep).toContain(aspect);
    }
    expect(konsep).toContain("BUDI BAIK → DIHORMATI → DIKENANG");
  });

  it("contains the required values, lessons, memory path and error guards", () => {
    for (const value of [
      "Berbudi Bahasa",
      "Mengenang Jasa",
      "Kebijaksanaan",
      "Kesopanan",
      "Rendah Hati dan Kesederhanaan",
      "Menghargai Kebaikan",
    ]) {
      expect(branchText("Nilai")).toContain(value);
    }
    expect(branchText("Pengajaran")).toContain(
      "Kita Janganlah Mengutamakan Kekayaan daripada Budi",
    );
    expect(branchText("Kata Kunci")).toContain("JASA ↓ BUDI ↓ BAHASA ↓ MULIA ↓ BANGSA");
    expect(branchText("Kata Kunci")).toContain("BUDI > HARTA");
    const errors = branchText("Kesalahan Lazim");
    expect(errors).toContain("Budi = Wang");
    expect(errors).toContain("Tema = Kekayaan");
    expect(errors).toContain("Rangkap 4 Dianggap Galakan");
    expect(errors).toContain("Kemiskinan = Kehinaan");
    expect(errors).toContain("Semua Rima Dianggap abab");
    expect(errors).toContain("Menyalin Rangkap sebagai Maksud");
  });

  it("supports full expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan2PantunBudiMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2PantunBudiMindMap, new Set())).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan2PantunBudiMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan2PantunBudiMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(bahasaMelayuTingkatan2PantunBudiMindMap, expanded).positions.values(),
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
        data: bahasaMelayuTingkatan2PantunBudiMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("<button");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("PANTUN BUDI");
    expect(markup).toContain("Konsep Budi");
    expect(markup).not.toContain("Tujuh Rangkap");
  });
});
