import { describe, expect, it } from "vitest";
import { bahasaMelayuKataAdjektifMindMap } from "@/content/bm/kata-adjektif-mindmap";
import { bahasaMelayuKataGantiNamaMindMap } from "@/content/bm/kata-ganti-nama-mindmap";
import { bahasaMelayuKataHubungMindMap } from "@/content/bm/kata-hubung-mindmap";
import { bahasaMelayuKataKerjaMindMap } from "@/content/bm/kata-kerja-mindmap";
import { bahasaMelayuKataNamaMindMap } from "@/content/bm/kata-nama-mindmap";
import { bahasaMelayuKataSendiNamaMindMap } from "@/content/bm/kata-sendi-nama-mindmap";
import { bahasaMelayuPenjodohBilanganMindMap } from "@/content/bm/penjodoh-bilangan-mindmap";
import {
  calculateMindMapLayout,
  getExpandableMindNodeIds,
  getVisibleMindNodes,
  type MindMapPosition,
  type MindNode,
} from "./MindMap";

const tatabahasaMindMaps = [
  ["Kata Nama", bahasaMelayuKataNamaMindMap],
  ["Kata Ganti Nama", bahasaMelayuKataGantiNamaMindMap],
  ["Kata Kerja", bahasaMelayuKataKerjaMindMap],
  ["Kata Adjektif", bahasaMelayuKataAdjektifMindMap],
  ["Kata Sendi Nama", bahasaMelayuKataSendiNamaMindMap],
  ["Kata Hubung", bahasaMelayuKataHubungMindMap],
  ["Penjodoh Bilangan", bahasaMelayuPenjodohBilanganMindMap],
] as const;

function collectNodes(node: MindNode): MindNode[] {
  return [node, ...(node.children?.flatMap(collectNodes) ?? [])];
}

function visibleLabels(data: MindNode, expanded: ReadonlySet<string>) {
  return getVisibleMindNodes(data, expanded).map(({ node }) => node.label);
}

function rectangle(position: MindMapPosition) {
  return {
    left: position.x,
    right: position.x + position.w,
    top: position.y - position.h / 2,
    bottom: position.y + position.h / 2,
  };
}

function overlaps(a: MindMapPosition, b: MindMapPosition) {
  const first = rectangle(a);
  const second = rectangle(b);
  return !(
    first.right <= second.left ||
    second.right <= first.left ||
    first.bottom <= second.top ||
    second.bottom <= first.top
  );
}

describe("MindMap reusable hierarchy", () => {
  it.each(tatabahasaMindMaps)("%s keeps every first-level branch title-only", (_, data) => {
    expect(data.children?.length).toBeGreaterThan(0);
    data.children?.forEach((branch) => {
      expect(branch.summary).toBeUndefined();
      expect(branch.children?.length).toBeGreaterThan(0);
    });

    const overview = visibleLabels(data, new Set([data.id]));
    expect(overview).toEqual([data.label, ...(data.children?.map((branch) => branch.label) ?? [])]);
  });

  it("reveals Kata Adjektif detail nodes only when their parent branch is expanded", () => {
    const data = bahasaMelayuKataAdjektifMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Maksud");
    expect(overview).not.toContain("Sifat");
    expect(overview).not.toContain("Pengelasan");

    const definition = data.children?.find((branch) => branch.label === "Definisi");
    const definitionOpen = getVisibleMindNodes(data, new Set([data.id, definition?.id ?? ""]));
    const meaning = definitionOpen.find(({ node }) => node.label === "Maksud")?.node;
    expect(meaning?.summary).toBe(
      "Kata adjektif menerangkan sifat, keadaan atau kualiti bagi sesuatu kata nama atau frasa nama.",
    );

    const functionBranch = data.children?.find((branch) => branch.label === "Fungsi");
    expect(visibleLabels(data, new Set([data.id, functionBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Sifat", "Keadaan", "Rupa", "Warna", "Ukuran", "Perasaan"]),
    );

    const examples = data.children?.find((branch) => branch.label === "Contoh Kata Adjektif");
    const exampleNodes = getVisibleMindNodes(data, new Set([data.id, examples?.id ?? ""]));
    expect(exampleNodes.find(({ node }) => node.label === "Warna")?.node.summary).toBe(
      "merah • hijau • biru",
    );
  });

  it("supports expand-all and collapse-all visibility without duplicated branch summaries", () => {
    const data = bahasaMelayuKataAdjektifMindMap;
    const allNodes = collectNodes(data);
    const expanded = getExpandableMindNodeIds(data);
    const expandedNodes = getVisibleMindNodes(data, expanded);

    expect(expandedNodes).toHaveLength(allNodes.length);
    expect(visibleLabels(data, new Set([data.id]))).toHaveLength((data.children?.length ?? 0) + 1);

    const content = allNodes.flatMap((node) => [node.label, node.summary].filter(Boolean));
    [
      "Kata adjektif menjadi inti kepada Frasa Adjektif.",
      "Kata adjektif yang lebih deskriptif dapat meningkatkan mutu penulisan.",
      "Gunakan kata adjektif yang diberi dengan bentuk dan maksud yang tepat.",
      "Kata Adjektif = menerangkan sifat atau keadaan",
    ].forEach((detail) => {
      expect(content.filter((entry) => entry === detail)).toHaveLength(1);
    });
  });

  it("reveals Kata Sendi Nama rules only through their matching branches", () => {
    const data = bahasaMelayuKataSendiNamaMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Kegunaan");
    expect(overview).not.toContain("dari");
    expect(overview).not.toContain("Formula");

    const diBranch = data.children?.find((branch) => branch.label === "di");
    const diOpen = getVisibleMindNodes(data, new Set([data.id, diBranch?.id ?? ""]));
    expect(diOpen.find(({ node }) => node.label === "Kegunaan")?.node.summary).toBe(
      "Digunakan untuk menunjukkan tempat atau lokasi.",
    );
    expect(diOpen.map(({ node }) => node.label)).toEqual(
      expect.arrayContaining(["Contoh", "Nota Ejaan", "Bezakan dengan Imbuhan di-"]),
    );

    const dariBranch = data.children?.find((branch) => branch.label === "dari / daripada");
    const dariOpen = getVisibleMindNodes(data, new Set([data.id, dariBranch?.id ?? ""]));
    expect(dariOpen.find(({ node }) => node.label === "dari")?.node.summary).toBe(
      "Gunakan rumus ATM: Arah, Tempat, Masa.",
    );
    expect(dariOpen.map(({ node }) => node.label)).toEqual(
      expect.arrayContaining(["daripada", "Perbandingan Ringkas"]),
    );

    const frasaBranch = data.children?.find((branch) => branch.label === "Frasa Sendi Nama");
    expect(visibleLabels(data, new Set([data.id, frasaBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Maksud", "Formula", "Pola Ayat", "Contoh"]),
    );
  });

  it("reveals Kata Hubung explanations only through their matching branches", () => {
    const data = bahasaMelayuKataHubungMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Maksud");
    expect(overview).not.toContain("Gabungan");
    expect(overview).not.toContain("Peranan");

    const typesBranch = data.children?.find((branch) => branch.label === "Jenis Kata Hubung");
    expect(visibleLabels(data, new Set([data.id, typesBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Gabungan",
        "Pilihan",
        "Sebab",
        "Tujuan",
        "Pertentangan",
        "Perbandingan",
      ]),
    );

    const compoundBranch = data.children?.find((branch) => branch.label === "Dalam Ayat Majmuk");
    expect(visibleLabels(data, new Set([data.id, compoundBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Peranan", "Formula", "Contoh", "Contoh 2"]),
    );

    const discourseBranch = data.children?.find((branch) => branch.label === "Penanda Wacana");
    expect(visibleLabels(data, new Set([data.id, discourseBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Pengenalan", "Contoh", "Nota"]),
    );
  });

  it("reveals Penjodoh Bilangan classifiers only through their matching branches", () => {
    const data = bahasaMelayuPenjodohBilanganMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Maksud");
    expect(overview).not.toContain("orang");
    expect(overview).not.toContain("helai");

    const definitionBranch = data.children?.find((branch) => branch.label === "Definisi");
    expect(visibleLabels(data, new Set([data.id, definitionBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Maksud", "Fungsi", "Struktur"]),
    );

    const shapeBranch = data.children?.find((branch) => branch.label === "Benda Mengikut Bentuk");
    expect(visibleLabels(data, new Set([data.id, shapeBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "helai",
        "batang",
        "bilah",
        "utas",
        "keping",
        "butir",
        "biji",
        "Nota Perbandingan",
      ]),
    );

    const errorBranch = data.children?.find((branch) => branch.label === "Kesalahan Lazim");
    expect(visibleLabels(data, new Set([data.id, errorBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining([
        "Salah Penjodoh Bilangan",
        "Tidak Sesuai dengan Bentuk",
        "Penggunaan pada Kata Abstrak",
        "Menggandakan Bilangan",
        "Menghafal Tanpa Memahami",
      ]),
    );
  });

  it("reveals Kata Ganti Nama person categories only through their matching branch", () => {
    const data = bahasaMelayuKataGantiNamaMindMap;
    const overview = visibleLabels(data, new Set([data.id]));

    expect(overview).not.toContain("Orang Pertama");
    expect(overview).not.toContain("ini");
    expect(overview).not.toContain("Situasi Rasmi");

    const diriBranch = data.children?.find((branch) => branch.label === "Kata Ganti Nama Diri");
    const diriOpen = getVisibleMindNodes(data, new Set([data.id, diriBranch?.id ?? ""]));
    expect(diriOpen.map(({ node }) => node.label)).toEqual(
      expect.arrayContaining(["Maksud", "Orang Pertama", "Orang Kedua", "Orang Ketiga"]),
    );
    expect(diriOpen.find(({ node }) => node.label === "Orang Pertama")?.node.summary).toBe(
      "Merujuk kepada orang yang bercakap: saya, aku, kami dan kita.",
    );

    const tunjukBranch = data.children?.find((branch) => branch.label === "Kata Ganti Nama Tunjuk");
    expect(visibleLabels(data, new Set([data.id, tunjukBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["ini", "itu", "sini, situ dan sana"]),
    );

    const contextBranch = data.children?.find(
      (branch) => branch.label === "Pemilihan Mengikut Konteks",
    );
    expect(visibleLabels(data, new Set([data.id, contextBranch?.id ?? ""]))).toEqual(
      expect.arrayContaining(["Situasi Rasmi", "Situasi Tidak Formal", "Bilangan", "Kesantunan"]),
    );
  });
});

describe("MindMap balanced desktop layout", () => {
  it.each(tatabahasaMindMaps)(
    "%s distributes collapsed first-level branches on both sides",
    (_, data) => {
      const layout = calculateMindMapLayout(data, new Set([data.id]));
      const root = layout.positions.get(data.id);
      expect(root).toBeDefined();

      const branches = (data.children ?? []).map((branch) => {
        const position = layout.positions.get(branch.id);
        expect(position).toBeDefined();
        return position!;
      });
      const left = branches.filter((position) => position.x + position.w <= root!.x);
      const right = branches.filter((position) => position.x >= root!.x + root!.w);

      expect(left.length).toBeGreaterThan(0);
      expect(right.length).toBeGreaterThan(0);
      expect(Math.abs(left.length - right.length)).toBeLessThanOrEqual(1);
      expect(branches.every((position) => position.w >= 188)).toBe(true);
      expect(layout.edges).toHaveLength(data.children?.length ?? 0);
    },
  );

  it.each(tatabahasaMindMaps)(
    "%s keeps fully expanded nodes separate and growing outward",
    (_, data) => {
      const layout = calculateMindMapLayout(data, getExpandableMindNodeIds(data));
      const positions = [...layout.positions.entries()];

      positions.forEach(([firstId, firstPosition], firstIndex) => {
        positions.slice(firstIndex + 1).forEach(([secondId, secondPosition]) => {
          expect(overlaps(firstPosition, secondPosition), `${firstId} overlaps ${secondId}`).toBe(
            false,
          );
        });
      });

      layout.edges.forEach(({ from, to }) => {
        const parent = layout.positions.get(from)!;
        const child = layout.positions.get(to)!;
        expect(
          child.x + child.w <= parent.x || child.x >= parent.x + parent.w,
          `${to} must grow outward from ${from}`,
        ).toBe(true);
      });
    },
  );
});
