import type { MindNode } from "@/components/MindMap";

export const mathF2C1MindMapBM: MindNode = {
  id: "c1",
  label: "Corak dan Jujukan",
  children: [
    {
      id: "c1-1",
      label: "1.1 Corak",
      children: [
        {
          id: "c1-1-1",
          label: "Definisi",
          children: [
            { id: "c1-1-1-1", label: "Susunan nombor/objek/bentuk yang berulang mengikut peraturan tetap" },
          ],
        },
        {
          id: "c1-1-2",
          label: "Jenis Corak",
          children: [
            { id: "c1-1-2-1", label: "Penambahan: 2, 4, 6, 8, ..." },
            { id: "c1-1-2-2", label: "Penolakan: 20, 17, 14, 11, ..." },
            { id: "c1-1-2-3", label: "Pendaraban: 2, 4, 8, 16, ..." },
            { id: "c1-1-2-4", label: "Nombor segi tiga: 1, 3, 6, 10, ..." },
            { id: "c1-1-2-5", label: "Nombor kuasa dua: 1, 4, 9, 16, ..." },
          ],
        },
        {
          id: "c1-1-3",
          label: "Contoh",
          children: [
            { id: "c1-1-3-1", label: "Contoh 1: 1,3,5,7,... → +2 setiap kali (nombor ganjil)" },
            { id: "c1-1-3-2", label: "Contoh 2: 1,3,6,10,... → beza meningkat 1 (nombor segi tiga)" },
          ],
        },
        {
          id: "c1-1-4",
          label: "Nota Penting",
          children: [
            { id: "c1-1-4-1", label: "Bandingkan sekurang-kurangnya 3 pasangan nombor sebelum membuat kesimpulan" },
            { id: "c1-1-4-2", label: "Boleh dinyatakan dalam perkataan atau algebra" },
          ],
        },
        {
          id: "c1-1-5",
          label: "Kesilapan Lazim",
          children: [
            { id: "c1-1-5-1", label: "Membuat kesimpulan hanya dengan 2 nombor" },
            { id: "c1-1-5-2", label: "Mengelirukan penambahan dengan pendaraban" },
          ],
        },
      ],
    },
    {
      id: "c1-2",
      label: "1.2 Jujukan",
      children: [
        {
          id: "c1-2-1",
          label: "Definisi",
          children: [
            { id: "c1-2-1-1", label: "Set nombor (istilah) tersusun mengikut peraturan; T1, T2, ..., Tn" },
          ],
        },
        {
          id: "c1-2-2",
          label: "Jujukan Menaik / Menurun",
          children: [
            { id: "c1-2-2-1", label: "Menaik: setiap istilah > istilah sebelum (cth 3,6,9,12)" },
            { id: "c1-2-2-2", label: "Menurun: setiap istilah < istilah sebelum (cth 50,45,40,35)" },
          ],
        },
        {
          id: "c1-2-3",
          label: "Formula",
          children: [
            { id: "c1-2-3-1", label: "Aritmetik: Tn = a + (n-1)d" },
            { id: "c1-2-3-2", label: "Geometri: Tn = a x r^(n-1)" },
            { id: "c1-2-3-3", label: "d = Tn - T(n-1); r = Tn / T(n-1)" },
          ],
        },
        {
          id: "c1-2-4",
          label: "Contoh",
          children: [
            { id: "c1-2-4-1", label: "Contoh 1: 7,11,15,19,... d=4, T6=27" },
            { id: "c1-2-4-2", label: "Contoh 2: 81,27,9,3,... r=1/3, istilah seterusnya=1" },
            { id: "c1-2-4-3", label: "Contoh 3: a=5, d=3 → T10 = 32" },
          ],
        },
        {
          id: "c1-2-5",
          label: "Nota Penting",
          children: [
            { id: "c1-2-5-1", label: "d positif → menaik; d negatif → menurun" },
            { id: "c1-2-5-2", label: "r > 1 → menaik; 0 < r < 1 → menurun" },
          ],
        },
        {
          id: "c1-2-6",
          label: "Kesilapan Lazim",
          children: [
            { id: "c1-2-6-1", label: "Tertinggal kurungan (n-1) dalam formula" },
            { id: "c1-2-6-2", label: "Mengelirukan d dengan r" },
          ],
        },
      ],
    },
    {
      id: "c1-3",
      label: "1.3 Corak & Jujukan sebagai Fungsi",
      children: [
        {
          id: "c1-3-1",
          label: "Definisi",
          children: [
            { id: "c1-3-1-1", label: "n (kedudukan) = input; Tn (nilai istilah) = output" },
            { id: "c1-3-1-2", label: "Diwakilkan melalui jadual, formula, graf" },
          ],
        },
        {
          id: "c1-3-2",
          label: "Formula",
          children: [
            { id: "c1-3-2-1", label: "Fungsi linear (aritmetik): Tn = dn + (a-d)" },
            { id: "c1-3-2-2", label: "Fungsi bukan linear: melibatkan n^2, n^3" },
          ],
        },
        {
          id: "c1-3-3",
          label: "Contoh",
          children: [
            { id: "c1-3-3-1", label: "Contoh 1: 2,5,8,11,... → Tn = 3n - 1" },
            { id: "c1-3-3-2", label: "Contoh 2: Tn = 2n^2 → 2, 8, 18 (bukan linear)" },
          ],
        },
        {
          id: "c1-3-4",
          label: "Graf",
          children: [
            { id: "c1-3-4-1", label: "Paksi-x = n; paksi-y = Tn" },
            { id: "c1-3-4-2", label: "Garis lurus = aritmetik (linear)" },
            { id: "c1-3-4-3", label: "Lengkung = bukan linear (geometri/kuasa dua)" },
          ],
        },
        {
          id: "c1-3-5",
          label: "Kesilapan Lazim",
          children: [
            { id: "c1-3-5-1", label: "Lupa memudahkan formula umum" },
            { id: "c1-3-5-2", label: "Menggantikan nilai n yang salah (n=0 bukan n=1)" },
          ],
        },
      ],
    },
    {
      id: "c1-4",
      label: "Ringkasan",
      children: [
        { id: "c1-4-1", label: "Tn = a + (n-1)d (aritmetik)" },
        { id: "c1-4-2", label: "Tn = a x r^(n-1) (geometri)" },
        { id: "c1-4-3", label: "Sentiasa semak formula dengan menggantikan semula n" },
        { id: "c1-4-4", label: "Garis lurus = linear; lengkung = bukan linear" },
      ],
    },
  ],
};
