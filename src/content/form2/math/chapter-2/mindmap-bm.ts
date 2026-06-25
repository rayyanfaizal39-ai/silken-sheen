import type { MindNode } from "@/components/MindMap";

export const mathF2C2MindMapBM: MindNode = {
  id: "root",
  label: "Pemfaktoran dan Pecahan Algebra",
  children: [
    {
      id: "c1",
      label: "2.1 Pengembangan",
      children: [
        {
          id: "c1-1",
          label: "Satu Kurungan",
          children: [{ id: "c1-1-1", label: "a(b + c) = ab + ac" }],
        },
        {
          id: "c1-2",
          label: "Dua Kurungan",
          children: [
            { id: "c1-2-1", label: "(a + b)(c + d) = ac + ad + bc + bd" },
            { id: "c1-2-2", label: "Contoh: (x + 3)(x - 4) = x^2 - x - 12" },
          ],
        },
        {
          id: "c1-3",
          label: "Kuasa Dua Sempurna",
          children: [{ id: "c1-3-1", label: "(2x - 1)^2 = 4x^2 - 4x + 1" }],
        },
        {
          id: "c1-4",
          label: "Kesilapan Lazim",
          children: [
            { id: "c1-4-1", label: "Terlupa darab tanda negatif" },
            { id: "c1-4-2", label: "Tidak darab semua sebutan" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "2.2 Pemfaktoran",
      children: [
        {
          id: "c2-1",
          label: "Faktor Sepunya Tertinggi (FST)",
          children: [
            { id: "c2-1-1", label: "ab + ac = a(b + c)" },
            { id: "c2-1-2", label: "Contoh: 6x^2 + 9x = 3x(2x + 3)" },
          ],
        },
        {
          id: "c2-2",
          label: "Beza Dua Kuasa Dua",
          children: [
            { id: "c2-2-1", label: "a^2 - b^2 = (a + b)(a - b)" },
            { id: "c2-2-2", label: "Contoh: 4x^2 - 25 = (2x + 5)(2x - 5)" },
            { id: "c2-2-3", label: "Hanya untuk tolak, bukan tambah" },
          ],
        },
        {
          id: "c2-3",
          label: "Sebutan Kuadratik (Kaedah Silang)",
          children: [
            { id: "c2-3-1", label: "ax^2 + bx + c, cari pr=a, qs=c, ps+qr=b" },
            { id: "c2-3-2", label: "Contoh a=1: x^2 + 5x + 6 = (x + 2)(x + 3)" },
            { id: "c2-3-3", label: "Contoh a≠1: 2x^2 + 7x + 3 = (2x + 1)(x + 3)" },
          ],
        },
        {
          id: "c2-4",
          label: "Gabungan Kaedah",
          children: [{ id: "c2-4-1", label: "Contoh: 2x^2 - 18 = 2(x + 3)(x - 3)" }],
        },
        {
          id: "c2-5",
          label: "Kesilapan Lazim",
          children: [
            { id: "c2-5-1", label: "Cuba faktorkan a^2 + b^2 dengan beza dua kuasa dua" },
            { id: "c2-5-2", label: "Terlupa keluarkan FST dahulu" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "2.3 Pecahan Algebra: Darab & Bahagi",
      children: [
        {
          id: "c3-1",
          label: "Pendaraban",
          children: [
            { id: "c3-1-1", label: "a/b x c/d = (a x c)/(b x d)" },
            { id: "c3-1-2", label: "Faktorkan dahulu sebelum batal" },
          ],
        },
        {
          id: "c3-2",
          label: "Pembahagian",
          children: [
            { id: "c3-2-1", label: "a/b ÷ c/d = a/b x d/c" },
            { id: "c3-2-2", label: "Tukar bahagi kepada darab dengan salingan" },
          ],
        },
        {
          id: "c3-3",
          label: "Kesilapan Lazim",
          children: [{ id: "c3-3-1", label: "Membatalkan sebutan tanpa memfaktorkan" }],
        },
      ],
    },
    {
      id: "c4",
      label: "2.4 Pecahan Algebra: Tambah & Tolak",
      children: [
        {
          id: "c4-1",
          label: "Penyebut Sama",
          children: [{ id: "c4-1-1", label: "a/c + b/c = (a + b)/c" }],
        },
        {
          id: "c4-2",
          label: "Penyebut Berbeza",
          children: [
            { id: "c4-2-1", label: "Cari GSPT penyebut dahulu" },
            { id: "c4-2-2", label: "Contoh: x/3 + x/4 = 7x/12" },
            { id: "c4-2-3", label: "Contoh algebra: 2/x - 3/(x+1) = (2-x)/(x(x+1))" },
          ],
        },
        {
          id: "c4-3",
          label: "Kesilapan Lazim",
          children: [
            { id: "c4-3-1", label: "Tambah/tolak penyebut secara terus" },
            { id: "c4-3-2", label: "Tersilap tanda semasa menolak" },
          ],
        },
      ],
    },
    {
      id: "c5",
      label: "Ringkasan",
      children: [
        { id: "c5-1", label: "Pengembangan vs Pemfaktoran (proses berlawanan)" },
        { id: "c5-2", label: "Sentiasa cari FST dahulu" },
        { id: "c5-3", label: "Faktorkan sebelum operasi pecahan algebra" },
        { id: "c5-4", label: "Samakan penyebut dengan GSPT untuk tambah/tolak" },
      ],
    },
  ],
};
