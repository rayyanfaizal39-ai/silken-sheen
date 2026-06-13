import type { MindNode } from "@/components/MindMap";

export const mathF1C9MindMapBM: MindNode = {
  id: "math-c9-bm-root",
  label: "Poligon Asas",
  children: [
    {
      id: "math-c9-bm-1",
      label: "Pengenalan Poligon",
      children: [
        { id: "math-c9-bm-1-1", label: "Poligon: rajah rata bersisi lurus" },
        { id: "math-c9-bm-1-2", label: "Poligon sekata: semua sisi dan sudut sama" },
        { id: "math-c9-bm-1-3", label: "Poligon tak sekata: sisi/sudut tidak seragam" },
      ],
    },
    {
      id: "math-c9-bm-2",
      label: "Jenis Poligon",
      children: [
        { id: "math-c9-bm-2-1", label: "Segitiga (3 sisi)" },
        { id: "math-c9-bm-2-2", label: "Segi empat (4 sisi)" },
        { id: "math-c9-bm-2-3", label: "Pentagon (5 sisi)" },
        { id: "math-c9-bm-2-4", label: "Heksagon (6 sisi)" },
        { id: "math-c9-bm-2-5", label: "Heptagon (7 sisi)" },
        { id: "math-c9-bm-2-6", label: "Oktagon (8 sisi)" },
      ],
    },
    {
      id: "math-c9-bm-3",
      label: "Sudut Poligon",
      children: [
        {
          id: "math-c9-bm-3-1",
          label: "Jumlah Sudut Dalam",
          children: [
            { id: "math-c9-bm-3-1-1", label: "Formula: (n − 2) × 180°" },
            { id: "math-c9-bm-3-1-2", label: "Segitiga: (3−2)×180° = 180°" },
            { id: "math-c9-bm-3-1-3", label: "Segi empat: (4−2)×180° = 360°" },
          ],
        },
        {
          id: "math-c9-bm-3-2",
          label: "Sudut Luar",
          children: [
            { id: "math-c9-bm-3-2-1", label: "Jumlah sudut luar mana-mana poligon = 360°" },
            { id: "math-c9-bm-3-2-2", label: "Setiap sudut luar poligon sekata = 360°/n" },
          ],
        },
      ],
    },
    {
      id: "math-c9-bm-4",
      label: "Simetri Paksi",
      children: [
        { id: "math-c9-bm-4-1", label: "Paksi simetri: lipatan menghasilkan dua bahagian sama" },
        { id: "math-c9-bm-4-2", label: "Poligon sekata n sisi mempunyai n paksi simetri" },
        { id: "math-c9-bm-4-3", label: "Segitiga sama sisi: 3 paksi simetri" },
      ],
    },
    {
      id: "math-c9-bm-5",
      label: "Tips Peperiksaan",
      children: [
        { id: "math-c9-bm-5-1", label: "Hafal formula sudut dalam: (n−2)×180°" },
        { id: "math-c9-bm-5-2", label: "Jumlah sudut luar sentiasa 360°" },
        { id: "math-c9-bm-5-3", label: "Kira bilangan sisi terlebih dahulu" },
      ],
    },
  ],
};
