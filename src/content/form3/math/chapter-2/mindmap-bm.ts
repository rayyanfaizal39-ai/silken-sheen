import type { MindNode } from "@/components/MindMap";

export const mathF3C2MindMapBM: MindNode = {
  id: "f3c2",
  label: "Bentuk Piawai",
  children: [
    {
      id: "f3c2-1",
      label: "2.1 Angka Bererti",
      children: [
        {
          id: "f3c2-1-1",
          label: "Mengenal Angka Bererti",
          children: [
            { id: "f3c2-1-1-1", label: "Semua digit bukan sifar = angka bererti" },
            { id: "f3c2-1-1-2", label: "Sifar antara digit bukan sifar = angka bererti" },
            { id: "f3c2-1-1-3", label: "Sifar sebelum digit bererti pertama (perpuluhan) bukan angka bererti" },
            { id: "f3c2-1-1-4", label: "Sifar di hujung integer bukan angka bererti melainkan dinyatakan" },
          ],
        },
        {
          id: "f3c2-1-2",
          label: "Pembundaran kepada Angka Bererti",
          children: [
            { id: "f3c2-1-2-1", label: "63 479 -> 63 000 (2 a.b.)" },
            { id: "f3c2-1-2-2", label: "2 476 -> 2 500 (2 a.b.)" },
            { id: "f3c2-1-2-3", label: "0.008025 -> 0.00803 (3 a.b.)" },
          ],
        },
      ],
    },
    {
      id: "f3c2-2",
      label: "2.2 Bentuk Piawai",
      children: [
        {
          id: "f3c2-2-1",
          label: "Penulisan Bentuk Piawai",
          children: [
            { id: "f3c2-2-1-1", label: "A x 10^n, dengan 1 ≤ A < 10, n integer" },
            { id: "f3c2-2-1-2", label: "280 = 2.8 x 10^2" },
            { id: "f3c2-2-1-3", label: "0.03025 = 3.025 x 10^-2" },
            { id: "f3c2-2-1-4", label: "n positif jika nombor ≥10; n negatif jika nombor <1" },
          ],
        },
        {
          id: "f3c2-2-2",
          label: "Operasi Asas",
          children: [
            { id: "f3c2-2-2-1", label: "Tambah/tolak: samakan kuasa 10 dahulu" },
            { id: "f3c2-2-2-2", label: "Darab: (SxT) x10^(m+n)" },
            { id: "f3c2-2-2-3", label: "Bahagi: (S÷T) x10^(m-n)" },
          ],
        },
        {
          id: "f3c2-2-3",
          label: "Menyelesaikan Masalah",
          children: [
            { id: "f3c2-2-3-1", label: "Jarak planet, ketebalan bahan, kapasiti data" },
            { id: "f3c2-2-3-2", label: "PQR Pythagoras: PQ=2.8x10^2 m" },
            { id: "f3c2-2-3-3", label: "3050 terabait = 3.05x10^15 bait" },
          ],
        },
      ],
    },
    {
      id: "f3c2-3",
      label: "Ringkasan Bab",
      children: [
        { id: "f3c2-3-1", label: "Angka bererti tunjuk kejituan ukuran" },
        { id: "f3c2-3-2", label: "Bentuk piawai memudahkan nombor besar/kecil" },
        { id: "f3c2-3-3", label: "Operasi guna hukum indeks untuk kuasa 10" },
      ],
    },
  ],
};
