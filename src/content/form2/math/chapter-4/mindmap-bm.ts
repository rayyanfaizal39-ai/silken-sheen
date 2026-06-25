import type { MindNode } from "@/components/MindMap";

export const mathF2C4MindMapBM: MindNode = {
  id: "math-c4-bm-root",
  label: "Poligon",
  children: [
    {
      id: "math-c4-bm-1",
      label: "4.1 Poligon Sekata",
      children: [
        {
          id: "math-c4-bm-1-1",
          label: "Definisi",
          children: [
            { id: "math-c4-bm-1-1-1", label: "Semua sisi sama panjang" },
            { id: "math-c4-bm-1-1-2", label: "Semua sudut sama besar" },
            { id: "math-c4-bm-1-1-3", label: "Kedua-dua syarat mesti dipenuhi serentak" },
          ],
        },
        {
          id: "math-c4-bm-1-2",
          label: "Poligon Tidak Sekata",
          children: [
            { id: "math-c4-bm-1-2-1", label: "Sisi atau sudut tidak sama" },
            { id: "math-c4-bm-1-2-2", label: "Contoh: segiempat tepat, rombus" },
          ],
        },
        {
          id: "math-c4-bm-1-3",
          label: "Nama Poligon",
          children: [
            { id: "math-c4-bm-1-3-1", label: "3 sisi: Segitiga" },
            { id: "math-c4-bm-1-3-2", label: "4 sisi: Sisi Empat" },
            { id: "math-c4-bm-1-3-3", label: "5 sisi: Pentagon" },
            { id: "math-c4-bm-1-3-4", label: "6 sisi: Heksagon" },
            { id: "math-c4-bm-1-3-5", label: "7 sisi: Heptagon" },
            { id: "math-c4-bm-1-3-6", label: "8 sisi: Oktagon" },
            { id: "math-c4-bm-1-3-7", label: "9 sisi: Nonagon" },
            { id: "math-c4-bm-1-3-8", label: "10 sisi: Dekagon" },
          ],
        },
      ],
    },
    {
      id: "math-c4-bm-2",
      label: "4.2 Sudut Pedalaman dan Sudut Peluaran",
      children: [
        {
          id: "math-c4-bm-2-1",
          label: "Sudut Pedalaman",
          children: [
            { id: "math-c4-bm-2-1-1", label: "Jumlah = (n - 2) x 180°" },
            { id: "math-c4-bm-2-1-2", label: "Setiap sudut poligon sekata = [(n - 2) x 180°] ÷ n" },
          ],
        },
        {
          id: "math-c4-bm-2-2",
          label: "Sudut Peluaran",
          children: [
            { id: "math-c4-bm-2-2-1", label: "Jumlah sudut peluaran cembung = 360°" },
            { id: "math-c4-bm-2-2-2", label: "Setiap sudut poligon sekata = 360° ÷ n" },
          ],
        },
        {
          id: "math-c4-bm-2-3",
          label: "Hubungan",
          children: [
            { id: "math-c4-bm-2-3-1", label: "Sudut pedalaman + sudut peluaran bersebelahan = 180°" },
            { id: "math-c4-bm-2-3-2", label: "n = 360° ÷ sudut peluaran" },
          ],
        },
        {
          id: "math-c4-bm-2-4",
          label: "Contoh Pengiraan",
          children: [
            { id: "math-c4-bm-2-4-1", label: "Heksagon: jumlah sudut pedalaman = 720°" },
            { id: "math-c4-bm-2-4-2", label: "Nonagon sekata: sudut pedalaman 140°, sudut peluaran 40°" },
            { id: "math-c4-bm-2-4-3", label: "Sudut peluaran 24° → n = 15 sisi" },
          ],
        },
      ],
    },
    {
      id: "math-c4-bm-3",
      label: "Ringkasan",
      children: [
        { id: "math-c4-bm-3-1", label: "Formula: (n-2) x 180° untuk sudut pedalaman" },
        { id: "math-c4-bm-3-2", label: "Formula: 360° untuk jumlah sudut peluaran" },
        { id: "math-c4-bm-3-3", label: "Sentiasa semak: sudut pedalaman + sudut peluaran = 180°" },
        { id: "math-c4-bm-3-4", label: "Lukis gambar rajah untuk elak kekeliruan" },
      ],
    },
  ],
};
