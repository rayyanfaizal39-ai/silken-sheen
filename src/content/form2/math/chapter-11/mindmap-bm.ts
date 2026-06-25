import type { MindNode } from "@/components/MindMap";

export const mathF2C11MindMapBM: MindNode = {
  id: "math-c11-bm-root",
  label: "Kebarangkalian",
  children: [
    {
      id: "math-c11-bm-1",
      label: "11.1 Kebarangkalian Eksperimen",
      children: [
        { id: "math-c11-bm-1-1", label: "Definisi: berdasarkan keputusan sebenar eksperimen berulang" },
        { id: "math-c11-bm-1-2", label: "Formula: Bilangan kali peristiwa berlaku / Jumlah percubaan" },
        { id: "math-c11-bm-1-3", label: "Contoh: syiling 28/50 = 14/25" },
        { id: "math-c11-bm-1-4", label: "Ramalan = Kebarangkalian eksperimen x Jumlah percubaan baharu" },
        { id: "math-c11-bm-1-5", label: "Kesilapan: terbalik pengangka/penyebut" },
      ],
    },
    {
      id: "math-c11-bm-2",
      label: "11.2 Kebarangkalian Teori (Keputusan Sama Mungkin)",
      children: [
        { id: "math-c11-bm-2-1", label: "Ruang sampel S, peristiwa A, n(S), n(A)" },
        { id: "math-c11-bm-2-2", label: "Formula: P(A) = n(A) / n(S)" },
        { id: "math-c11-bm-2-3", label: "Contoh: dadu genap → P(A) = 3/6 = 1/2" },
        { id: "math-c11-bm-2-4", label: "Contoh: 2 syiling, sekurang-kurangnya 1 gambar → P(C) = 3/4" },
        { id: "math-c11-bm-2-5", label: "Guna jadual/gambar rajah pohon untuk dua objek" },
        { id: "math-c11-bm-2-6", label: "Kesilapan: tidak senaraikan ruang sampel lengkap" },
      ],
    },
    {
      id: "math-c11-bm-3",
      label: "11.3 Peristiwa Pelengkap",
      children: [
        { id: "math-c11-bm-3-1", label: "A' = bukan ahli peristiwa A" },
        { id: "math-c11-bm-3-2", label: "Formula: P(A') = 1 - P(A)" },
        { id: "math-c11-bm-3-3", label: "Contoh: dadu nombor 5 → P(A') = 5/6" },
        { id: "math-c11-bm-3-4", label: "A dan A' tidak bertindih, meliputi S sepenuhnya" },
        { id: "math-c11-bm-3-5", label: "Kesilapan: tambah 1 bukan tolak" },
      ],
    },
    {
      id: "math-c11-bm-4",
      label: "11.4 Kebarangkalian Peristiwa Mudah",
      children: [
        { id: "math-c11-bm-4-1", label: "Aplikasi harian: guli, cabutan bertuah, stok" },
        { id: "math-c11-bm-4-2", label: "Contoh: guli biru 3/10 daripada 10 guli" },
        { id: "math-c11-bm-4-3", label: "Contoh: tiket cabutan tidak menang = 4/5" },
        { id: "math-c11-bm-4-4", label: "Permudahkan pecahan jawapan" },
        { id: "math-c11-bm-4-5", label: "Kesilapan: tersilap kira n(S) sebenar" },
      ],
    },
    {
      id: "math-c11-bm-5",
      label: "Ringkasan",
      children: [
        { id: "math-c11-bm-5-1", label: "0 ≤ P(A) ≤ 1" },
        { id: "math-c11-bm-5-2", label: "P(A) + P(A') = 1" },
        { id: "math-c11-bm-5-3", label: "P(A) = 0 mustahil; P(A) = 1 pasti" },
        { id: "math-c11-bm-5-4", label: "Senaraikan ruang sampel secara sistematik" },
      ],
    },
  ],
};
