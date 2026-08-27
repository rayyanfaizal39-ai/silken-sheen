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
import { bahasaMelayuTingkatan1OrenMindMap } from "./oren-form1-mindmap";

vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));

const expectedBranches = [
  "Sinopsis",
  "Tema",
  "Persoalan",
  "Watak",
  "Perwatakan",
  "Plot",
  "Teknik Plot",
  "Latar Masa",
  "Latar Tempat",
  "Latar Masyarakat",
  "Nilai",
  "Pengajaran",
  "Peristiwa Penting",
  "Bukti KOMSAS",
  "Teknik Menjawab",
  "Kesalahan Lazim",
];

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function branchText(label: string): string {
  const selected = bahasaMelayuTingkatan1OrenMindMap.children?.find((item) => item.label === label);
  if (!selected) throw new Error(`Missing branch: ${label}`);
  return collectNodes(selected)
    .map((item) => `${item.label} ${item.summary ?? ""}`)
    .join(" ");
}

describe("Bahasa Melayu Form 1 Oren mind map", () => {
  it("uses the exact root and title-only first-level hierarchy", () => {
    expect(bahasaMelayuTingkatan1OrenMindMap).toMatchObject({
      id: "bm-f1-oren-root",
      label: "OREN",
      summary:
        "Cerpen tentang kehilangan Oren, seekor kucing peliharaan yang menyebabkan Ayah menyedari perubahan layanan dan perhatiannya terhadap Oren selepas kehadiran Kelabu.",
    });
    expect(bahasaMelayuTingkatan1OrenMindMap.children?.map((item) => item.label)).toEqual(
      expectedBranches,
    );
    bahasaMelayuTingkatan1OrenMindMap.children?.forEach((item) => {
      expect(item.summary).toBeUndefined();
      expect(item.children?.length).toBeGreaterThan(0);
    });
  });

  it("keeps the prescribed identity, characters and ending accurate", () => {
    expect(branchText("Sinopsis")).toContain("Saifullizan Yahaya");
    expect(branchText("Sinopsis")).toContain("Kuingin Berterima Kasih");
    expect(branchText("Watak")).toContain("Kucing jantan berbulu jingga");
    expect(branchText("Watak")).toContain("Kucing jantan berbulu kelabu");
    expect(branchText("Sinopsis")).toContain("secara tidak sengaja");
    expect(branchText("Sinopsis")).toContain("ditemukan mati");
    expect(branchText("Sinopsis")).toContain("tafsiran pencerita");
  });

  it("provides evidence for analysis without invented quotations", () => {
    expect(branchText("Tema")).toContain("Kasih Sayang terhadap Haiwan Peliharaan");
    expect(branchText("Persoalan")).toContain("Bukti Peristiwa");
    expect(branchText("Perwatakan")).toContain("Bukti Peristiwa");
    expect(branchText("Teknik Plot")).toContain("Imbas Kembali");
    expect(branchText("Bukti KOMSAS")).toContain("Dakwaan + Peristiwa");
    expect(branchText("Teknik Menjawab")).toContain("OREN DALAM 6 LANGKAH");
    expect(branchText("Kesalahan Lazim")).toContain("Oren “Pasti Cemburu”");
    const allText = collectNodes(bahasaMelayuTingkatan1OrenMindMap)
      .map((item) => `${item.label} ${item.summary ?? ""}`)
      .join(" ");
    expect(allText).not.toContain("Oren akhirnya pulang");
    expect(allText).not.toContain("Ayah sengaja");
  });

  it("supports complete expansion with unique, non-overlapping desktop nodes", () => {
    const nodes = collectNodes(bahasaMelayuTingkatan1OrenMindMap);
    expect(new Set(nodes.map((item) => item.id)).size).toBe(nodes.length);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1OrenMindMap, new Set())).toHaveLength(1);
    const expanded = getExpandableMindNodeIds(bahasaMelayuTingkatan1OrenMindMap);
    expect(getVisibleMindNodes(bahasaMelayuTingkatan1OrenMindMap, expanded)).toHaveLength(
      nodes.length,
    );

    const positions = Array.from(
      calculateMindMapLayout(bahasaMelayuTingkatan1OrenMindMap, expanded).positions.values(),
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
        data: bahasaMelayuTingkatan1OrenMindMap,
        mobileLayout: "learning-path",
      }),
    );
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).toContain("OREN");
    expect(markup).toContain("Peristiwa Penting");
    expect(markup).not.toContain("Saifullizan Yahaya");
  });
});
