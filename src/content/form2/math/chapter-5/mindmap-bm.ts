import type { MindNode } from "@/components/MindMap";

export const mathF2C5MindMapBM: MindNode = {
  id: "math-c5-bm-root",
  label: "Bulatan",
  children: [
    {
      id: "math-c5-bm-1",
      label: "5.1 Sifat Bulatan",
      children: [
        {
          id: "math-c5-bm-1-1",
          label: "Bahagian Bulatan",
          children: [
            { id: "math-c5-bm-1-1-1", label: "Pusat (O): titik tetap di tengah" },
            { id: "math-c5-bm-1-1-2", label: "Jejari (r): pusat ke lilitan" },
            { id: "math-c5-bm-1-1-3", label: "Diameter (d): perentas terpanjang, d = 2r" },
            { id: "math-c5-bm-1-1-4", label: "Perentas: sambung dua titik pada lilitan" },
            { id: "math-c5-bm-1-1-5", label: "Lengkok: sebahagian lilitan" },
            { id: "math-c5-bm-1-1-6", label: "Sektor: dibatasi dua jejari dan satu lengkok" },
            { id: "math-c5-bm-1-1-7", label: "Tembereng: dibatasi satu perentas dan satu lengkok" },
          ],
        },
        {
          id: "math-c5-bm-1-2",
          label: "Hubungan Asas",
          children: [
            { id: "math-c5-bm-1-2-1", label: "d = 2r" },
            { id: "math-c5-bm-1-2-2", label: "Semua jejari dalam satu bulatan sama panjang" },
          ],
        },
      ],
    },
    {
      id: "math-c5-bm-2",
      label: "5.2 Sifat Simetri Perentas",
      children: [
        {
          id: "math-c5-bm-2-1",
          label: "Sifat Utama",
          children: [
            { id: "math-c5-bm-2-1-1", label: "Garis dari pusat berserenjang dengan perentas → membahagi dua sama" },
            { id: "math-c5-bm-2-1-2", label: "Garis dari pusat membahagi dua perentas → berserenjang dengannya" },
            { id: "math-c5-bm-2-1-3", label: "Perentas sama panjang → jarak sama dari pusat" },
            { id: "math-c5-bm-2-1-4", label: "Jarak sama dari pusat → perentas sama panjang" },
          ],
        },
        {
          id: "math-c5-bm-2-2",
          label: "Pengiraan",
          children: [
            { id: "math-c5-bm-2-2-1", label: "Gunakan Teorem Pythagoras: AM² = OA² - OM²" },
            { id: "math-c5-bm-2-2-2", label: "Jejari = hipotenus segitiga bersudut tegak" },
            { id: "math-c5-bm-2-2-3", label: "Panjang perentas penuh = 2 x separuh perentas" },
          ],
        },
      ],
    },
    {
      id: "math-c5-bm-3",
      label: "5.3 Lilitan dan Luas Bulatan",
      children: [
        {
          id: "math-c5-bm-3-1",
          label: "Lilitan",
          children: [
            { id: "math-c5-bm-3-1-1", label: "Lilitan = 2πr atau πd" },
            { id: "math-c5-bm-3-1-2", label: "Contoh: r = 7 cm, π = 22/7 → Lilitan = 44 cm" },
          ],
        },
        {
          id: "math-c5-bm-3-2",
          label: "Luas",
          children: [
            { id: "math-c5-bm-3-2-1", label: "Luas = πr²" },
            { id: "math-c5-bm-3-2-2", label: "Contoh: r = 10 cm, π = 3.142 → Luas = 314.2 cm²" },
          ],
        },
        {
          id: "math-c5-bm-3-3",
          label: "Nilai π",
          children: [
            { id: "math-c5-bm-3-3-1", label: "Gunakan 22/7 untuk gandaan 7" },
            { id: "math-c5-bm-3-3-2", label: "Gunakan 3.142 untuk nombor perpuluhan" },
          ],
        },
      ],
    },
    {
      id: "math-c5-bm-4",
      label: "Ringkasan",
      children: [
        { id: "math-c5-bm-4-1", label: "Kenal pasti jejari vs diameter dahulu" },
        { id: "math-c5-bm-4-2", label: "Lukis gambar rajah untuk perentas dan sudut tegak" },
        { id: "math-c5-bm-4-3", label: "Sentiasa kuasa duakan r dahulu untuk luas" },
        { id: "math-c5-bm-4-4", label: "Semak unit: panjang untuk lilitan, persegi untuk luas" },
      ],
    },
  ],
};
