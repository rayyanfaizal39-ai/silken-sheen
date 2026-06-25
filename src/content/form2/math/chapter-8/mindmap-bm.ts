import type { MindNode } from "@/components/MindMap";

export const mathF2C8MindMapBM: MindNode = {
  id: "math-c8-bm-root",
  label: "Graf Fungsi",
  children: [
    {
      id: "math-c8-bm-1",
      label: "8.1 Fungsi",
      children: [
        {
          id: "math-c8-bm-1-1",
          label: "Definisi Fungsi",
          children: [
            { id: "math-c8-bm-1-1-1", label: "Setiap nilai domain → SATU nilai rangka" },
            { id: "math-c8-bm-1-1-2", label: "Boleh diwakilkan: pemetaan, jadual, pasangan tertib, persamaan" },
          ],
        },
        {
          id: "math-c8-bm-1-2",
          label: "Tatatanda Fungsi f(x)",
          children: [
            { id: "math-c8-bm-1-2-1", label: "f(x) = nilai y bagi nilai x yang digantikan" },
            { id: "math-c8-bm-1-2-2", label: "Contoh: f(x) = 2x + 1, f(3) = 7" },
          ],
        },
        {
          id: "math-c8-bm-1-3",
          label: "Domain dan Rangka",
          children: [
            { id: "math-c8-bm-1-3-1", label: "Domain: set nilai x (input)" },
            { id: "math-c8-bm-1-3-2", label: "Rangka (julat): set nilai y (output)" },
          ],
        },
        {
          id: "math-c8-bm-1-4",
          label: "Kesilapan Lazim",
          children: [
            { id: "math-c8-bm-1-4-1", label: "Tersilap gantikan x negatif" },
            { id: "math-c8-bm-1-4-2", label: "Tersilap tertib operasi" },
            { id: "math-c8-bm-1-4-3", label: "Mengelirukan f(x) dengan f × x" },
          ],
        },
      ],
    },
    {
      id: "math-c8-bm-2",
      label: "8.2 Graf Fungsi",
      children: [
        {
          id: "math-c8-bm-2-1",
          label: "Langkah Melukis Graf",
          children: [
            { id: "math-c8-bm-2-1-1", label: "1. Bina jadual nilai" },
            { id: "math-c8-bm-2-1-2", label: "2. Pilih skala paksi yang sesuai" },
            { id: "math-c8-bm-2-1-3", label: "3. Plot titik (x, y)" },
            { id: "math-c8-bm-2-1-4", label: "4. Sambung titik (garis lurus / lengkung licin)" },
            { id: "math-c8-bm-2-1-5", label: "5. Labelkan graf dan paksi" },
          ],
        },
        {
          id: "math-c8-bm-2-2",
          label: "Graf Fungsi Linear",
          children: [
            { id: "math-c8-bm-2-2-1", label: "Bentuk: y = mx + c" },
            { id: "math-c8-bm-2-2-2", label: "Bentuk graf: garis lurus" },
            { id: "math-c8-bm-2-2-3", label: "Contoh: y = 2x + 1 → (-2,-3), (-1,-1), (0,1), (1,3), (2,5)" },
          ],
        },
        {
          id: "math-c8-bm-2-3",
          label: "Graf Fungsi Kuadratik",
          children: [
            { id: "math-c8-bm-2-3-1", label: "Bentuk: y = ax^2 + bx + c (a != 0)" },
            { id: "math-c8-bm-2-3-2", label: "Bentuk graf: parabola (lengkung licin)" },
            { id: "math-c8-bm-2-3-3", label: "a > 0 → terbuka ke atas; a < 0 → terbuka ke bawah" },
            { id: "math-c8-bm-2-3-4", label: "Contoh: y = x^2 - 2 → (-2,2), (-1,-1), (0,-2), (1,-1), (2,2)" },
          ],
        },
        {
          id: "math-c8-bm-2-4",
          label: "Kesilapan Lazim",
          children: [
            { id: "math-c8-bm-2-4-1", label: "Sambung graf kuadratik dengan garis lurus (salah)" },
            { id: "math-c8-bm-2-4-2", label: "Skala paksi tidak seragam" },
            { id: "math-c8-bm-2-4-3", label: "Plot titik salah akibat tersilap baca skala" },
            { id: "math-c8-bm-2-4-4", label: "Lupa label paksi/graf" },
          ],
        },
      ],
    },
    {
      id: "math-c8-bm-3",
      label: "Ringkasan",
      children: [
        { id: "math-c8-bm-3-1", label: "Fungsi: satu domain → satu rangka" },
        { id: "math-c8-bm-3-2", label: "Linear → garis lurus" },
        { id: "math-c8-bm-3-3", label: "Kuadratik → parabola licin" },
        { id: "math-c8-bm-3-4", label: "Jadual nilai mesti tepat sebelum melukis graf" },
      ],
    },
  ],
};
