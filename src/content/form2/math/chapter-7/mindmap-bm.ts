import type { MindNode } from "@/components/MindMap";

export const mathF2C7MindMapBM: MindNode = {
  id: "math-f2-c7-bm-root",
  label: "Koordinat",
  children: [
    {
      id: "math-f2-c7-bm-1",
      label: "7.1 Jarak Antara Dua Titik",
      children: [
        { id: "math-f2-c7-bm-1-1", label: "Formula: AB = √((x2-x1)² + (y2-y1)²)" },
        {
          id: "math-f2-c7-bm-1-2",
          label: "Konsep",
          children: [
            { id: "math-f2-c7-bm-1-2-1", label: "Berdasarkan Teorem Pythagoras" },
            { id: "math-f2-c7-bm-1-2-2", label: "Jarak sentiasa positif" },
            { id: "math-f2-c7-bm-1-2-3", label: "Garis mengufuk: beza koordinat-x sahaja" },
            { id: "math-f2-c7-bm-1-2-4", label: "Garis mencancang: beza koordinat-y sahaja" },
          ],
        },
        {
          id: "math-f2-c7-bm-1-3",
          label: "Contoh",
          children: [
            { id: "math-f2-c7-bm-1-3-1", label: "A(2,3), B(6,6) → AB = 5 unit" },
            { id: "math-f2-c7-bm-1-3-2", label: "P(-1,2), Q(3,-1) → PQ = 5 unit" },
          ],
        },
        {
          id: "math-f2-c7-bm-1-4",
          label: "Kesilapan Lazim",
          children: [
            { id: "math-f2-c7-bm-1-4-1", label: "Susunan penolakan x dan y tidak konsisten" },
            { id: "math-f2-c7-bm-1-4-2", label: "Tersilap kuasa dua nombor negatif" },
            { id: "math-f2-c7-bm-1-4-3", label: "Terlupa ambil punca kuasa dua" },
          ],
        },
      ],
    },
    {
      id: "math-f2-c7-bm-2",
      label: "7.2 Titik Tengah Antara Dua Titik",
      children: [
        { id: "math-f2-c7-bm-2-1", label: "Formula: M = ((x1+x2)/2, (y1+y2)/2)" },
        {
          id: "math-f2-c7-bm-2-2",
          label: "Konsep",
          children: [
            { id: "math-f2-c7-bm-2-2-1", label: "Purata koordinat-x dan koordinat-y" },
            { id: "math-f2-c7-bm-2-2-2", label: "Jarak sama dari kedua-dua titik" },
            { id: "math-f2-c7-bm-2-2-3", label: "Cari titik tidak diketahui: B = (2xm-x1, 2ym-y1)" },
          ],
        },
        {
          id: "math-f2-c7-bm-2-3",
          label: "Contoh",
          children: [
            { id: "math-f2-c7-bm-2-3-1", label: "A(2,3), B(6,7) → M(4,5)" },
            { id: "math-f2-c7-bm-2-3-2", label: "P(-3,4), Q(5,-2) → M(1,1)" },
          ],
        },
        {
          id: "math-f2-c7-bm-2-4",
          label: "Kesilapan Lazim",
          children: [
            { id: "math-f2-c7-bm-2-4-1", label: "Terlupa bahagi dengan 2" },
            { id: "math-f2-c7-bm-2-4-2", label: "Campur koordinat-x dengan koordinat-y" },
            { id: "math-f2-c7-bm-2-4-3", label: "Tersilap tanda nombor negatif" },
          ],
        },
      ],
    },
    {
      id: "math-f2-c7-bm-3",
      label: "7.3 Luas Poligon",
      children: [
        { id: "math-f2-c7-bm-3-1", label: "Formula Segi Tiga: 1/2|x1(y2-y3)+x2(y3-y1)+x3(y1-y2)|" },
        { id: "math-f2-c7-bm-3-2", label: "Kaedah Senarai (Shoelace) untuk poligon umum" },
        {
          id: "math-f2-c7-bm-3-3",
          label: "Langkah",
          children: [
            { id: "math-f2-c7-bm-3-3-1", label: "Senaraikan bucu mengikut turutan (ikut jam/lawan jam)" },
            { id: "math-f2-c7-bm-3-3-2", label: "Darab bersilang dan tolak" },
            { id: "math-f2-c7-bm-3-3-3", label: "Ambil nilai mutlak" },
            { id: "math-f2-c7-bm-3-3-4", label: "Bahagi dengan 2" },
          ],
        },
        {
          id: "math-f2-c7-bm-3-4",
          label: "Contoh",
          children: [
            { id: "math-f2-c7-bm-3-4-1", label: "A(1,1), B(5,1), C(3,4) → Luas = 6 unit²" },
            { id: "math-f2-c7-bm-3-4-2", label: "P(0,0), Q(4,0), R(4,3), S(0,3) → Luas = 12 unit²" },
          ],
        },
        {
          id: "math-f2-c7-bm-3-5",
          label: "Kesilapan Lazim",
          children: [
            { id: "math-f2-c7-bm-3-5-1", label: "Bucu tidak disenaraikan mengikut turutan betul" },
            { id: "math-f2-c7-bm-3-5-2", label: "Terlupa nilai mutlak (luas jadi negatif)" },
            { id: "math-f2-c7-bm-3-5-3", label: "Terlupa bahagi dengan 2" },
            { id: "math-f2-c7-bm-3-5-4", label: "Tidak sambung bucu terakhir ke bucu pertama" },
          ],
        },
      ],
    },
    {
      id: "math-f2-c7-bm-4",
      label: "Ringkasan",
      children: [
        { id: "math-f2-c7-bm-4-1", label: "Jarak: Pythagoras, sentiasa positif" },
        { id: "math-f2-c7-bm-4-2", label: "Titik Tengah: purata koordinat" },
        { id: "math-f2-c7-bm-4-3", label: "Luas: kaedah senarai, nilai mutlak, bahagi 2" },
        { id: "math-f2-c7-bm-4-4", label: "Lukis gambar rajah satah Cartes untuk membantu" },
      ],
    },
  ],
};
