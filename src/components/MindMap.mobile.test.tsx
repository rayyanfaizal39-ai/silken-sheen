import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { bahasaMelayuForm2FrasaAdjektifMindMap } from "@/content/bm/frasa-adjektif-form2-mindmap";
import { bahasaMelayuForm2FrasaKerjaMindMap } from "@/content/bm/frasa-kerja-form2-mindmap";
import { bahasaMelayuForm2FrasaNamaMindMap } from "@/content/bm/frasa-nama-form2-mindmap";
import { bahasaMelayuImbuhanMindMap } from "@/content/bm/imbuhan-mindmap";
import { bahasaMelayuKataAdjektifMindMap } from "@/content/bm/kata-adjektif-mindmap";
import { bahasaMelayuKataGantiNamaMindMap } from "@/content/bm/kata-ganti-nama-mindmap";
import { bahasaMelayuKataBilanganMindMap } from "@/content/bm/kata-bilangan-mindmap";
import { bahasaMelayuKataHubungMindMap } from "@/content/bm/kata-hubung-mindmap";
import { bahasaMelayuKataSendiNamaMindMap } from "@/content/bm/kata-sendi-nama-mindmap";
import { bahasaMelayuPenandaWacanaMindMap } from "@/content/bm/penanda-wacana-mindmap";
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

  it("renders the collapsed Imbuhan path in order without child details", () => {
    const markup = renderToStaticMarkup(
      <MindMap data={bahasaMelayuImbuhanMindMap} mobileLayout="learning-path" />,
    );
    const branchPositions = (bahasaMelayuImbuhanMindMap.children ?? []).map((branch) =>
      markup.indexOf(`data-node-id="${branch.id}"`),
    );

    expect(markup).toContain('aria-label="Peta minda IMBUHAN"');
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain(
      "Imbuhan ialah unsur yang ditambahkan pada kata dasar untuk menghasilkan kata terbitan",
    );
    expect(markup).not.toContain(
      "Imbuhan ialah unsur yang ditambahkan pada kata dasar untuk membentuk kata terbitan.",
    );
    expect(markup).not.toContain("meN- • ber- • di-");
    expect(branchPositions.every((position) => position >= 0)).toBe(true);
    expect(branchPositions).toEqual([...branchPositions].sort((a, b) => a - b));
    expect(markup.match(/aria-expanded="false"/g)).toHaveLength(10);
    expect(markup).not.toContain("touch-none");
  });

  it("renders the collapsed Penanda Wacana path in order without child details", () => {
    const markup = renderToStaticMarkup(
      <MindMap data={bahasaMelayuPenandaWacanaMindMap} mobileLayout="learning-path" />,
    );
    const branchPositions = (bahasaMelayuPenandaWacanaMindMap.children ?? []).map((branch) =>
      markup.indexOf(`data-node-id="${branch.id}"`),
    );

    expect(markup).toContain('aria-label="Peta minda PENANDA WACANA"');
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain(
      "Perkataan atau rangkaian perkataan yang menghubungkan ayat dan perenggan",
    );
    expect(markup).not.toContain(
      "Penanda wacana ialah perkataan atau rangkaian perkataan yang digunakan untuk menghubungkan",
    );
    expect(markup).not.toContain("Selain itu • Di samping itu • Seterusnya");
    expect(branchPositions.every((position) => position >= 0)).toBe(true);
    expect(branchPositions).toEqual([...branchPositions].sort((a, b) => a - b));
    expect(markup.match(/aria-expanded="false"/g)).toHaveLength(11);
    expect(markup).not.toContain("touch-none");
  });

  it("renders the collapsed Form 2 Frasa Nama path without leaking lesson details", () => {
    const markup = renderToStaticMarkup(
      <MindMap data={bahasaMelayuForm2FrasaNamaMindMap} mobileLayout="learning-path" />,
    );
    const branchPositions = (bahasaMelayuForm2FrasaNamaMindMap.children ?? []).map((branch) =>
      markup.indexOf(`data-node-id="${branch.id}"`),
    );

    expect(markup).toContain('aria-label="Peta minda FRASA NAMA"');
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain(
      "Frasa nama ialah binaan yang terdiri daripada satu atau beberapa perkataan dengan kata nama sebagai intinya.",
    );
    expect(markup).not.toContain(
      "Kata nama yang menjadi unsur utama dan tidak boleh digugurkan tanpa menjejaskan maksud frasa.",
    );
    expect(markup).not.toContain("FN + FK");
    expect(markup).not.toContain("Murid itu membaca buku.");
    expect(branchPositions.every((position) => position >= 0)).toBe(true);
    expect(branchPositions).toEqual([...branchPositions].sort((a, b) => a - b));
    expect(markup.match(/aria-expanded="false"/g)).toHaveLength(9);
    expect(markup).not.toContain("touch-none");
  });

  it("renders the collapsed Form 2 Frasa Kerja path without horizontal overflow or child leakage", () => {
    const markup = renderToStaticMarkup(
      <MindMap data={bahasaMelayuForm2FrasaKerjaMindMap} mobileLayout="learning-path" />,
    );
    const branchPositions = (bahasaMelayuForm2FrasaKerjaMindMap.children ?? []).map((branch) =>
      markup.indexOf(`data-node-id="${branch.id}"`),
    );

    expect(markup).toContain('aria-label="Peta minda FRASA KERJA"');
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain(
      "Frasa kerja ialah binaan yang terdiri daripada satu atau beberapa perkataan dengan kata kerja sebagai intinya.",
    );
    expect(markup).not.toContain("Kata kerja ialah unsur utama dalam frasa kerja.");
    expect(markup).not.toContain("Kata Bantu Aspek");
    expect(markup).not.toContain("Mereka pergi ke hospital.");
    expect(branchPositions.every((position) => position >= 0)).toBe(true);
    expect(branchPositions).toEqual([...branchPositions].sort((a, b) => a - b));
    expect(markup.match(/aria-expanded="false"/g)).toHaveLength(12);
    expect(markup).not.toContain("touch-none");
  });

  it("renders the collapsed Form 2 Frasa Adjektif path without horizontal overflow or child leakage", () => {
    const markup = renderToStaticMarkup(
      <MindMap data={bahasaMelayuForm2FrasaAdjektifMindMap} mobileLayout="learning-path" />,
    );
    const branchPositions = (bahasaMelayuForm2FrasaAdjektifMindMap.children ?? []).map((branch) =>
      markup.indexOf(`data-node-id="${branch.id}"`),
    );

    expect(markup).toContain('aria-label="Peta minda FRASA ADJEKTIF"');
    expect(markup).toContain("overflow-x-hidden");
    expect(markup).toContain("env(safe-area-inset-bottom)");
    expect(markup).toContain(
      "Frasa adjektif ialah binaan yang terdiri daripada satu atau beberapa perkataan dengan kata adjektif sebagai intinya.",
    );
    expect(markup).not.toContain("Kata adjektif menjadi unsur utama frasa adjektif.");
    expect(markup).not.toContain("sangat • amat • terlalu • agak");
    expect(markup).not.toContain("Rakan-rakan dalam keadaan sugul.");
    expect(branchPositions.every((position) => position >= 0)).toBe(true);
    expect(branchPositions).toEqual([...branchPositions].sort((a, b) => a - b));
    expect(markup.match(/aria-expanded="false"/g)).toHaveLength(10);
    expect(markup).not.toContain("touch-none");
  });
});
