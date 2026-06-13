import type { MindNode } from "@/components/MindMap";

export const mathF1C10MindMapBM: MindNode = {
  id: "math-c10-bm-root",
  label: "Perimeter dan Luas",
  children: [
    {
      id: "math-c10-bm-1",
      label: "Perimeter",
      children: [
        { id: "math-c10-bm-1-1", label: "Jumlah panjang semua sisi rajah" },
        {
          id: "math-c10-bm-1-2",
          label: "Formula Perimeter",
          children: [
            { id: "math-c10-bm-1-2-1", label: "Segi empat sama: P = 4s" },
            { id: "math-c10-bm-1-2-2", label: "Segi empat tepat: P = 2(p + l)" },
            { id: "math-c10-bm-1-2-3", label: "Segitiga: P = a + b + c" },
            { id: "math-c10-bm-1-2-4", label: "Bulatan: C = 2πr = πd" },
          ],
        },
      ],
    },
    {
      id: "math-c10-bm-2",
      label: "Luas",
      children: [
        { id: "math-c10-bm-2-1", label: "Saiz permukaan dalam sesuatu rajah (unit²)" },
        {
          id: "math-c10-bm-2-2",
          label: "Formula Luas",
          children: [
            { id: "math-c10-bm-2-2-1", label: "Segi empat sama: L = s²" },
            { id: "math-c10-bm-2-2-2", label: "Segi empat tepat: L = p × l" },
            { id: "math-c10-bm-2-2-3", label: "Segitiga: L = ½ × tapak × tinggi" },
            { id: "math-c10-bm-2-2-4", label: "Bulatan: L = πr²" },
            { id: "math-c10-bm-2-2-5", label: "Trapezium: L = ½(a+b) × tinggi" },
            { id: "math-c10-bm-2-2-6", label: "Jajang genjang: L = tapak × tinggi" },
          ],
        },
      ],
    },
    {
      id: "math-c10-bm-3",
      label: "Rajah Gabungan",
      children: [
        { id: "math-c10-bm-3-1", label: "Bahagi rajah kepada bentuk asas" },
        { id: "math-c10-bm-3-2", label: "Tambah atau tolak luas" },
        { id: "math-c10-bm-3-3", label: "Contoh: rajah L, rajah berlubang" },
      ],
    },
    {
      id: "math-c10-bm-4",
      label: "Tips Peperiksaan",
      children: [
        { id: "math-c10-bm-4-1", label: "Tulis unit² untuk luas, unit untuk perimeter" },
        { id: "math-c10-bm-4-2", label: "π ≈ 3.142 atau 22/7 (ikut soalan)" },
        { id: "math-c10-bm-4-3", label: "Kenal pasti ketinggian tegak (perpendicular height)" },
      ],
    },
  ],
};
