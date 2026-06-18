import type { MindNode } from "@/components/MindMap";

export const mathF1C1MindMapBM: MindNode = {
  id: "math-c1-bm-root",
  label: "Nombor Nisbah",
  children: [
    {
      id: "math-c1-bm-1",
      label: "Integer",
      children: [
        {
          id: "math-c1-bm-1-1",
          label: "Jenis Integer",
          children: [
            { id: "math-c1-bm-1-1-1", label: "Integer positif: 1, 2, 3, ..." },
            { id: "math-c1-bm-1-1-2", label: "Sifar: 0" },
            { id: "math-c1-bm-1-1-3", label: "Integer negatif: -1, -2, -3, ..." },
          ],
        },
        {
          id: "math-c1-bm-1-2",
          label: "Garis Nombor",
          children: [
            { id: "math-c1-bm-1-2-1", label: "Kanan sifar → nilai lebih besar" },
            { id: "math-c1-bm-1-2-2", label: "Kiri sifar → nilai lebih kecil" },
          ],
        },
        {
          id: "math-c1-bm-1-3",
          label: "Operasi Integer",
          children: [
            { id: "math-c1-bm-1-3-1", label: "Tambah: (+)+(+) = positif" },
            { id: "math-c1-bm-1-3-2", label: "Tolak: (+)+(−) = beza nilai mutlak" },
            { id: "math-c1-bm-1-3-3", label: "Darab/Bahagi: tanda sama = positif, tanda beza = negatif" },
          ],
        },
      ],
    },
    {
      id: "math-c1-bm-2",
      label: "Pecahan Positif dan Negatif",
      children: [
        { id: "math-c1-bm-2-1", label: "Pecahan positif > 0 (contoh: 3/4)" },
        { id: "math-c1-bm-2-2", label: "Pecahan negatif < 0 (contoh: -2/5)" },
        {
          id: "math-c1-bm-2-3",
          label: "Operasi Pecahan",
          children: [
            { id: "math-c1-bm-2-3-1", label: "Tambah/Tolak: samakan penyebut" },
            { id: "math-c1-bm-2-3-2", label: "Darab: pembilang × pembilang, penyebut × penyebut" },
            { id: "math-c1-bm-2-3-3", label: "Bahagi: darab dengan salingan" },
          ],
        },
      ],
    },
    {
      id: "math-c1-bm-3",
      label: "Perpuluhan Positif dan Negatif",
      children: [
        { id: "math-c1-bm-3-1", label: "Perpuluhan positif: 0.5, 1.25, ..." },
        { id: "math-c1-bm-3-2", label: "Perpuluhan negatif: -0.3, -2.7, ..." },
        { id: "math-c1-bm-3-3", label: "Operasi sama seperti integer" },
      ],
    },
    {
      id: "math-c1-bm-4",
      label: "Nombor Nisbah",
      children: [
        { id: "math-c1-bm-4-1", label: "Bentuk a/b, di mana a & b integer, b ≠ 0" },
        { id: "math-c1-bm-4-2", label: "Semua integer adalah nombor nisbah" },
        { id: "math-c1-bm-4-3", label: "Semua pecahan termatan adalah nombor nisbah" },
        { id: "math-c1-bm-4-4", label: "Contoh: 0.75 = 3/4 → nombor nisbah" },
      ],
    },
    {
      id: "math-c1-bm-5",
      label: "Tips Peperiksaan",
      children: [
        { id: "math-c1-bm-5-1", label: "Semak tanda (+/−) dalam setiap langkah" },
        { id: "math-c1-bm-5-2", label: "Garis nombor membantu perbandingan" },
        { id: "math-c1-bm-5-3", label: "Tukar perpuluhan ke pecahan untuk ketepatan" },
      ],
    },
  ],
};
