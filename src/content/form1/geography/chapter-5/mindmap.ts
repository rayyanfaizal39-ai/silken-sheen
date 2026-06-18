import type { MindNode } from "@/components/MindMap";

export const geoF1C5MindMap: MindNode = {
  id: "root",
  label: "Bumi",
  children: [
    {
      id: "c1",
      label: "Bentuk dan Saiz Bumi",
      children: [
        { id: "c1-1", label: "Sfera yang dimampatkan di kutub (oblate spheroid)" },
        { id: "c1-2", label: "Jejari equator: ±6,378 km" },
        { id: "c1-3", label: "Jejari kutub: ±6,357 km" },
        { id: "c1-4", label: "Luas permukaan: ±510 juta km²" },
      ],
    },
    {
      id: "c2",
      label: "Pergerakan Bumi",
      children: [
        {
          id: "c2-1",
          label: "Putaran (Rotation)",
          children: [
            { id: "c2-1-1", label: "Paksi Bumi — condong 23½°" },
            { id: "c2-1-2", label: "Tempoh: 24 jam (1 hari)" },
            { id: "c2-1-3", label: "Arah: barat → timur (lawan arah jam dari Kutub Utara)" },
            {
              id: "c2-1-4",
              label: "Akibat",
              children: [
                { id: "c2-1-4-1", label: "Siang dan malam" },
                { id: "c2-1-4-2", label: "Perbezaan masa" },
                { id: "c2-1-4-3", label: "Arah angin bengkok (Kesan Coriolis)" },
              ],
            },
          ],
        },
        {
          id: "c2-2",
          label: "Peredaran (Revolution)",
          children: [
            { id: "c2-2-1", label: "Mengelilingi Matahari" },
            { id: "c2-2-2", label: "Tempoh: 365¼ hari (1 tahun)" },
            { id: "c2-2-3", label: "Orbit elips" },
            {
              id: "c2-2-4",
              label: "Akibat",
              children: [
                { id: "c2-2-4-1", label: "4 musim (negara iklim sederhana)" },
                { id: "c2-2-4-2", label: "Panjang siang & malam berubah" },
                { id: "c2-2-4-3", label: "Solstis & Equinoks" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "Lapisan Bumi",
      children: [
        { id: "c3-1", label: "Kerak (Crust) — 0–70 km" },
        { id: "c3-2", label: "Mantel (Mantle) — 70–2,900 km" },
        { id: "c3-3", label: "Teras Luar (Outer Core) — cecair nikel-besi" },
        { id: "c3-4", label: "Teras Dalam (Inner Core) — pepejal, terpanas" },
      ],
    },
    {
      id: "c4",
      label: "Zon Masa",
      children: [
        { id: "c4-1", label: "360° ÷ 24 jam = 15° setiap zon" },
        { id: "c4-2", label: "Timur GMP → tambah masa" },
        { id: "c4-3", label: "Barat GMP → tolak masa" },
        { id: "c4-4", label: "Malaysia: GMT +8" },
      ],
    },
  ],
};
