import type { MindNode } from "@/components/MindMap";

export const mathF2C9MindMapBM: MindNode = {
  id: "math-c9-bm-root",
  label: "Laju dan Pecutan",
  children: [
    {
      id: "math-c9-bm-1",
      label: "9.1 Laju",
      children: [
        {
          id: "math-c9-bm-1-1",
          label: "Definisi",
          children: [
            { id: "math-c9-bm-1-1-1", label: "Kadar perubahan jarak terhadap masa" },
            { id: "math-c9-bm-1-1-2", label: "Kuantiti skalar (tanpa arah)" },
          ],
        },
        {
          id: "math-c9-bm-1-2",
          label: "Formula",
          children: [
            { id: "math-c9-bm-1-2-1", label: "Laju = Jarak / Masa" },
            { id: "math-c9-bm-1-2-2", label: "Jarak = Laju x Masa" },
            { id: "math-c9-bm-1-2-3", label: "Masa = Jarak / Laju" },
          ],
        },
        {
          id: "math-c9-bm-1-3",
          label: "Unit",
          children: [
            { id: "math-c9-bm-1-3-1", label: "m/s (meter, saat)" },
            { id: "math-c9-bm-1-3-2", label: "km/h (kilometer, jam)" },
          ],
        },
        {
          id: "math-c9-bm-1-4",
          label: "Penukaran Unit",
          children: [
            { id: "math-c9-bm-1-4-1", label: "km/h ke m/s: x (1000/3600) = x (5/18)" },
            { id: "math-c9-bm-1-4-2", label: "m/s ke km/h: x (3600/1000) = x (18/5)" },
            { id: "math-c9-bm-1-4-3", label: "Contoh: 72 km/h = 20 m/s" },
          ],
        },
        {
          id: "math-c9-bm-1-5",
          label: "Jenis Laju",
          children: [
            { id: "math-c9-bm-1-5-1", label: "Laju seragam (tetap)" },
            { id: "math-c9-bm-1-5-2", label: "Laju seketika (pada satu masa tertentu)" },
          ],
        },
      ],
    },
    {
      id: "math-c9-bm-2",
      label: "9.2 Laju Purata",
      children: [
        {
          id: "math-c9-bm-2-1",
          label: "Definisi",
          children: [
            { id: "math-c9-bm-2-1-1", label: "Jumlah jarak dibahagi jumlah masa" },
            { id: "math-c9-bm-2-1-2", label: "BUKAN purata aritmetik nilai laju" },
          ],
        },
        {
          id: "math-c9-bm-2-2",
          label: "Formula",
          children: [
            { id: "math-c9-bm-2-2-1", label: "Laju Purata = Jumlah Jarak / Jumlah Masa" },
          ],
        },
        {
          id: "math-c9-bm-2-3",
          label: "Perkara Penting",
          children: [
            { id: "math-c9-bm-2-3-1", label: "Jumlahkan semua jarak dahulu" },
            { id: "math-c9-bm-2-3-2", label: "Jumlahkan semua masa (termasuk masa rehat jika berkaitan)" },
            { id: "math-c9-bm-2-3-3", label: "Contoh: 140 km dalam 3 jam = 46.67 km/h" },
          ],
        },
      ],
    },
    {
      id: "math-c9-bm-3",
      label: "9.3 Pecutan dan Nyahpecutan",
      children: [
        {
          id: "math-c9-bm-3-1",
          label: "Definisi",
          children: [
            { id: "math-c9-bm-3-1-1", label: "Kadar perubahan laju terhadap masa" },
            { id: "math-c9-bm-3-1-2", label: "Pecutan positif: laju bertambah" },
            { id: "math-c9-bm-3-1-3", label: "Nyahpecutan: laju berkurang (pecutan negatif)" },
          ],
        },
        {
          id: "math-c9-bm-3-2",
          label: "Formula",
          children: [
            { id: "math-c9-bm-3-2-1", label: "a = (v - u) / t" },
            { id: "math-c9-bm-3-2-2", label: "u = laju awal, v = laju akhir, t = masa" },
          ],
        },
        {
          id: "math-c9-bm-3-3",
          label: "Unit",
          children: [{ id: "math-c9-bm-3-3-1", label: "m/s² (meter per saat kuasa dua)" }],
        },
        {
          id: "math-c9-bm-3-4",
          label: "Kes Khas",
          children: [
            { id: "math-c9-bm-3-4-1", label: "Pecutan sifar = laju malar (tetap)" },
            { id: "math-c9-bm-3-4-2", label: "Bermula dari rehat: u = 0" },
          ],
        },
      ],
    },
    {
      id: "math-c9-bm-4",
      label: "Kesilapan Lazim",
      children: [
        { id: "math-c9-bm-4-1", label: "Lupa tukar unit km/h ke m/s atau sebaliknya" },
        { id: "math-c9-bm-4-2", label: "Mengira purata dua laju terus tanpa kira jumlah jarak/masa" },
        { id: "math-c9-bm-4-3", label: "Tersilap tanda bagi nyahpecutan" },
        { id: "math-c9-bm-4-4", label: "Tersilap formula (u - v) bukan (v - u)" },
      ],
    },
    {
      id: "math-c9-bm-5",
      label: "Ringkasan",
      children: [
        { id: "math-c9-bm-5-1", label: "Laju = Jarak / Masa" },
        { id: "math-c9-bm-5-2", label: "Laju Purata = Jumlah Jarak / Jumlah Masa" },
        { id: "math-c9-bm-5-3", label: "Pecutan = (v - u) / t" },
        { id: "math-c9-bm-5-4", label: "1 km/h = 5/18 m/s" },
      ],
    },
  ],
};
