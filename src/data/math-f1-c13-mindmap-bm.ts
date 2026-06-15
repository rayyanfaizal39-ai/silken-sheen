import type { MindNode } from "@/components/MindMap";

export const mathF1C13MindMapBM: MindNode = {
  id: "math-c13-bm-root",
  label: "Teorem Pythagoras",
  children: [
    {
      id: "math-c13-bm-1",
      label: "Teorem Pythagoras",
      children: [
        { id: "math-c13-bm-1-1", label: "Berlaku pada segitiga bersudut tepat sahaja" },
        { id: "math-c13-bm-1-2", label: "Formula: c² = a² + b²" },
        { id: "math-c13-bm-1-3", label: "c = hipotenusa (sisi terpanjang, bertentangan sudut tepat)" },
        { id: "math-c13-bm-1-4", label: "a, b = dua sisi yang lain (kaki)" },
      ],
    },
    {
      id: "math-c13-bm-2",
      label: "Mencari Sisi Tidak Diketahui",
      children: [
        {
          id: "math-c13-bm-2-1",
          label: "Cari Hipotenusa",
          children: [
            { id: "math-c13-bm-2-1-1", label: "c = √(a² + b²)" },
            { id: "math-c13-bm-2-1-2", label: "Contoh: a=3, b=4 → c=√(9+16)=√25=5" },
          ],
        },
        {
          id: "math-c13-bm-2-2",
          label: "Cari Sisi Lain",
          children: [
            { id: "math-c13-bm-2-2-1", label: "a = √(c² − b²)" },
            { id: "math-c13-bm-2-2-2", label: "Contoh: c=13, b=12 → a=√(169−144)=√25=5" },
          ],
        },
      ],
    },
    {
      id: "math-c13-bm-3",
      label: "Triplet Pythagoras",
      children: [
        { id: "math-c13-bm-3-1", label: "Set integer: a² + b² = c²" },
        { id: "math-c13-bm-3-2", label: "Contoh biasa: 3-4-5, 5-12-13, 8-15-17" },
        { id: "math-c13-bm-3-3", label: "Gandaan juga sah: 6-8-10, 9-12-15" },
      ],
    },
    {
      id: "math-c13-bm-4",
      label: "Menentukan Jenis Segitiga",
      children: [
        { id: "math-c13-bm-4-1", label: "Jika c² = a² + b²: sudut tepat" },
        { id: "math-c13-bm-4-2", label: "Jika c² < a² + b²: sudut tirus" },
        { id: "math-c13-bm-4-3", label: "Jika c² > a² + b²: sudut cakah" },
      ],
    },
    {
      id: "math-c13-bm-5",
      label: "Aplikasi",
      children: [
        { id: "math-c13-bm-5-1", label: "Jarak antara dua titik" },
        { id: "math-c13-bm-5-2", label: "Masalah praktis: tangga, tiang, pepenjuru" },
        { id: "math-c13-bm-5-3", label: "Diagonals dalam segi empat sama & segi empat tepat" },
      ],
    },
    {
      id: "math-c13-bm-6",
      label: "Tips Peperiksaan",
      children: [
        { id: "math-c13-bm-6-1", label: "Kenal pasti hipotenusa dahulu (bertentangan ∟)" },
        { id: "math-c13-bm-6-2", label: "Buat kiraan: tambah untuk cari c, tolak untuk cari kaki" },
        { id: "math-c13-bm-6-3", label: "Hafal triplet biasa 3-4-5, 5-12-13" },
      ],
    },
  ],
};
