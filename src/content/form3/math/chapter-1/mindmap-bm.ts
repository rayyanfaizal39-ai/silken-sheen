import type { MindNode } from "@/components/MindMap";

export const mathF3C1MindMapBM: MindNode = {
  id: "f3c1",
  label: "Indeks",
  children: [
    {
      id: "f3c1-1",
      label: "1.1 Tatatanda Indeks",
      children: [
        {
          id: "f3c1-1-1",
          label: "Bentuk Indeks",
          children: [
            { id: "f3c1-1-1-1", label: "an = a x a x ... x a (n faktor)" },
            { id: "f3c1-1-1-2", label: "a = asas, n = indeks/kuasa" },
            { id: "f3c1-1-1-3", label: "Contoh: 5^6 = 5x5x5x5x5x5" },
            { id: "f3c1-1-1-4", label: "Kaedah pembahagian berulang: 64 = 2^6 = 4^3" },
          ],
        },
      ],
    },
    {
      id: "f3c1-2",
      label: "1.2 Hukum Indeks",
      children: [
        {
          id: "f3c1-2-1",
          label: "Pendaraban",
          children: [
            { id: "f3c1-2-1-1", label: "am x an = a^(m+n)" },
            { id: "f3c1-2-1-2", label: "Asas mesti sama" },
            { id: "f3c1-2-1-3", label: "2k^2 x 4k^3 = 8k^5" },
          ],
        },
        {
          id: "f3c1-2-2",
          label: "Pembahagian",
          children: [
            { id: "f3c1-2-2-1", label: "am ÷ an = a^(m-n)" },
            { id: "f3c1-2-2-2", label: "25x^2y^3 ÷ 5xy = 5xy^2" },
          ],
        },
        {
          id: "f3c1-2-3",
          label: "Kuasa bagi Kuasa",
          children: [
            { id: "f3c1-2-3-1", label: "(am)n = a^(mn)" },
            { id: "f3c1-2-3-2", label: "(p^2q^3r)^4 = p^8q^12r^4" },
          ],
        },
        {
          id: "f3c1-2-4",
          label: "Indeks Sifar dan Negatif",
          children: [
            { id: "f3c1-2-4-1", label: "a^0 = 1 (a≠0)" },
            { id: "f3c1-2-4-2", label: "a^(-n) = 1/a^n" },
            { id: "f3c1-2-4-3", label: "(a/b)^(-n) = (b/a)^n" },
          ],
        },
        {
          id: "f3c1-2-5",
          label: "Indeks Pecahan",
          children: [
            { id: "f3c1-2-5-1", label: "a^(1/n) = punca kuasa ke-n bagi a" },
            { id: "f3c1-2-5-2", label: "a^(m/n) = punca kuasa ke-n bagi a^m" },
            { id: "f3c1-2-5-3", label: "81^(3/4) = (punca kuasa empat 81)^3 = 27" },
          ],
        },
        {
          id: "f3c1-2-6",
          label: "Persamaan dan Masalah Indeks",
          children: [
            { id: "f3c1-2-6-1", label: "Samakan asas, kemudian samakan indeks" },
            { id: "f3c1-2-6-2", label: "3^x x 9^(x+5) ÷ 3^4 = 1 -> x = -2" },
            { id: "f3c1-2-6-3", label: "Aplikasi: pertumbuhan, faedah majmuk, sains" },
          ],
        },
      ],
    },
    {
      id: "f3c1-3",
      label: "Ringkasan Bab",
      children: [
        { id: "f3c1-3-1", label: "an = pendaraban berulang; a=asas, n=indeks" },
        { id: "f3c1-3-2", label: "Hukum: tambah/tolak/darab indeks mengikut operasi" },
        { id: "f3c1-3-3", label: "a^0=1; a^(-n)=1/a^n" },
        { id: "f3c1-3-4", label: "Indeks pecahan menghubungkan kuasa dan punca kuasa" },
      ],
    },
  ],
};
