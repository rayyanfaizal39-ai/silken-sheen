import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { bahasaMelayuKataAdjektifMindMap } from "@/content/bm/kata-adjektif-mindmap";
import { bahasaMelayuKataGantiNamaMindMap } from "@/content/bm/kata-ganti-nama-mindmap";
import { bahasaMelayuKataBilanganMindMap } from "@/content/bm/kata-bilangan-mindmap";
import { bahasaMelayuKataHubungMindMap } from "@/content/bm/kata-hubung-mindmap";
import { bahasaMelayuKataSendiNamaMindMap } from "@/content/bm/kata-sendi-nama-mindmap";
import { bahasaMelayuPenjodohBilanganMindMap } from "@/content/bm/penjodoh-bilangan-mindmap";
import { MindMap, type MindNode } from "./MindMap";

vi.mock("@/hooks/use-mobile", () => ({
  useIsMobile: () => true,
}));

const mobileMindMap: MindNode = {
  id: "kata-kerja",
  label: "KATA KERJA",
  summary: "Central summary stays visible.",
  children: [
    {
      id: "definisi",
      label: "Definisi",
      summary: "This first-level summary must stay hidden.",
      children: [{ id: "contoh", label: "Contoh: membaca" }],
    },
  ],
};

describe("MindMap mobile learning path", () => {
  it("renders a connected, expandable vertical path without a scaled canvas", () => {
    const markup = renderToStaticMarkup(
      <MindMap data={mobileMindMap} mobileLayout="learning-path" />,
    );

    expect(markup).toContain('aria-label="Peta minda KATA KERJA"');
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("KATA KERJA");
    expect(markup).toContain("Definisi");
    expect(markup).toContain("Central summary stays visible.");
    expect(markup).not.toContain("This first-level summary must stay hidden.");
    expect(markup).not.toContain("Contoh: membaca");
    expect(markup).toContain('data-mindmap-depth="1"');
    expect(markup).toContain('aria-expanded="false"');
    expect(markup).not.toContain("touch-none");
  });

  it("renders Kata Adjektif in branch order with mobile overflow and safe-area protection", () => {
    const markup = renderToStaticMarkup(
      <MindMap data={bahasaMelayuKataAdjektifMindMap} mobileLayout="learning-path" />,
    );
    const branchPositions = [
      "Definisi",
      "Fungsi",
      "Frasa Adjektif",
      "Contoh Kata Adjektif",
      "Kosa Kata Aras Tinggi",
      "Kesalahan Lazim",
      "Tip UASA",
      "Ingat!",
    ].map((label) => markup.indexOf(label));

    expect(markup).toContain('aria-label="Peta minda KATA ADJEKTIF"');
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain(
      "Perkataan yang menerangkan sifat, keadaan atau kualiti sesuatu kata nama.",
    );
    expect(markup).not.toContain(
      "Kata adjektif menerangkan sifat, keadaan atau kualiti bagi sesuatu kata nama atau frasa nama.",
    );
    expect(branchPositions.every((position) => position >= 0)).toBe(true);
    expect(branchPositions).toEqual([...branchPositions].sort((a, b) => a - b));
    expect(markup.match(/aria-expanded="false"/g)).toHaveLength(8);
    expect(markup).not.toContain("touch-none");
  });

  it("renders the collapsed Kata Sendi Nama learning path without leaking child content", () => {
    const markup = renderToStaticMarkup(
      <MindMap data={bahasaMelayuKataSendiNamaMindMap} mobileLayout="learning-path" />,
    );
    const branchPositions = (bahasaMelayuKataSendiNamaMindMap.children ?? []).map((branch) =>
      markup.indexOf(`data-node-id="${branch.id}"`),
    );

    expect(markup).toContain('aria-label="Peta minda KATA SENDI NAMA"');
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain(
      "Perkataan yang hadir di hadapan kata nama atau frasa nama untuk membentuk Frasa Sendi Nama.",
    );
    expect(markup).not.toContain("Digunakan untuk menunjukkan tempat atau lokasi.");
    expect(markup).not.toContain("Gunakan rumus ATM: Arah, Tempat, Masa.");
    expect(branchPositions.every((position) => position >= 0)).toBe(true);
    expect(branchPositions).toEqual([...branchPositions].sort((a, b) => a - b));
    expect(markup.match(/aria-expanded="false"/g)).toHaveLength(10);
    expect(markup).not.toContain("touch-none");
  });

  it("renders the collapsed Kata Ganti Nama path in order without child details", () => {
    const markup = renderToStaticMarkup(
      <MindMap data={bahasaMelayuKataGantiNamaMindMap} mobileLayout="learning-path" />,
    );
    const branchPositions = (bahasaMelayuKataGantiNamaMindMap.children ?? []).map((branch) =>
      markup.indexOf(`data-node-id="${branch.id}"`),
    );

    expect(markup).toContain('aria-label="Peta minda KATA GANTI NAMA"');
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain("Perkataan yang digunakan untuk menggantikan kata nama dalam ayat.");
    expect(markup).not.toContain("Merujuk kepada orang yang bercakap:");
    expect(markup).not.toContain("Menunjukkan sesuatu yang dekat.");
    expect(branchPositions.every((position) => position >= 0)).toBe(true);
    expect(branchPositions).toEqual([...branchPositions].sort((a, b) => a - b));
    expect(markup.match(/aria-expanded="false"/g)).toHaveLength(8);
    expect(markup).not.toContain("touch-none");
  });

  it("renders the collapsed Kata Hubung path in order without child details", () => {
    const markup = renderToStaticMarkup(
      <MindMap data={bahasaMelayuKataHubungMindMap} mobileLayout="learning-path" />,
    );
    const branchPositions = (bahasaMelayuKataHubungMindMap.children ?? []).map((branch) =>
      markup.indexOf(`data-node-id="${branch.id}"`),
    );

    expect(markup).toContain('aria-label="Peta minda KATA HUBUNG"');
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain(
      "Perkataan yang menghubungkan kata, frasa atau klausa dalam sesuatu ayat.",
    );
    expect(markup).not.toContain(
      "Kata hubung ialah perkataan yang menghubungkan kata, frasa atau klausa",
    );
    expect(markup).not.toContain("dan • serta");
    expect(branchPositions.every((position) => position >= 0)).toBe(true);
    expect(branchPositions).toEqual([...branchPositions].sort((a, b) => a - b));
    expect(markup.match(/aria-expanded="false"/g)).toHaveLength(8);
    expect(markup).not.toContain("touch-none");
  });

  it("renders the collapsed Penjodoh Bilangan path in order without child details", () => {
    const markup = renderToStaticMarkup(
      <MindMap data={bahasaMelayuPenjodohBilanganMindMap} mobileLayout="learning-path" />,
    );
    const branchPositions = (bahasaMelayuPenjodohBilanganMindMap.children ?? []).map((branch) =>
      markup.indexOf(`data-node-id="${branch.id}"`),
    );

    expect(markup).toContain('aria-label="Peta minda PENJODOH BILANGAN"');
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain(
      "Perkataan yang digunakan bersama kata bilangan untuk membilang kata nama konkrit.",
    );
    expect(markup).not.toContain(
      "Penjodoh bilangan ialah perkataan yang digunakan bersama kata bilangan",
    );
    expect(markup).not.toContain("seorang guru");
    expect(branchPositions.every((position) => position >= 0)).toBe(true);
    expect(branchPositions).toEqual([...branchPositions].sort((a, b) => a - b));
    expect(markup.match(/aria-expanded="false"/g)).toHaveLength(11);
    expect(markup).not.toContain("touch-none");
  });

  it("renders the collapsed Kata Bilangan path in order without child details", () => {
    const markup = renderToStaticMarkup(
      <MindMap data={bahasaMelayuKataBilanganMindMap} mobileLayout="learning-path" />,
    );
    const branchPositions = (bahasaMelayuKataBilanganMindMap.children ?? []).map((branch) =>
      markup.indexOf(`data-node-id="${branch.id}"`),
    );

    expect(markup).toContain('aria-label="Peta minda KATA BILANGAN"');
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain(
      "Perkataan yang digunakan untuk membilang atau menyatakan jumlah sesuatu kata nama.",
    );
    expect(markup).not.toContain(
      "Kata bilangan ialah perkataan yang digunakan untuk membilang atau menyatakan jumlah",
    );
    expect(markup).not.toContain("satu • dua • tiga");
    expect(branchPositions.every((position) => position >= 0)).toBe(true);
    expect(branchPositions).toEqual([...branchPositions].sort((a, b) => a - b));
    expect(markup.match(/aria-expanded="false"/g)).toHaveLength(12);
    expect(markup).not.toContain("touch-none");
  });
});
