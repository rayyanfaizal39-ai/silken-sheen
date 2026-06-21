import type { MindNode } from "@/components/MindMap";

export const geoF2C3MindMap: MindNode = {
  id: "root",
  label: "Pengaruh Pergerakan Bumi terhadap Cuaca dan Iklim",
  children: [
    {
      id: "c1",
      label: "3.1 Pergerakan Bumi",
      children: [
        { id: "c1-1", label: "Sistem suria: matahari + 8 planet" },
        { id: "c1-2", label: "Setiap planet beredar mengikut orbit masing-masing" },
        { id: "c1-3", label: "Dua cara pergerakan bumi: Putaran & Peredaran" },
      ],
    },
    {
      id: "c2",
      label: "3.2 Putaran Bumi",
      children: [
        { id: "c2-1", label: "Berputar pada paksi condong 23½°" },
        { id: "c2-2", label: "Arah: Barat ke Timur (lawan jam)" },
        { id: "c2-3", label: "Tempoh: 24 jam (sehari)" },
        {
          id: "c2-4",
          label: "Kesan-kesan",
          children: [
            { id: "c2-4-1", label: "Kejadian siang & malam" },
            { id: "c2-4-2", label: "Perbezaan waktu tempatan (15° = 1 jam)" },
            { id: "c2-4-3", label: "Pembiasan angin lazim (Daya Koriolis)" },
            { id: "c2-4-4", label: "Kejadian pasang surut" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "3.3 Peredaran Bumi",
      children: [
        { id: "c3-1", label: "Beredar mengelilingi matahari (lawan jam)" },
        { id: "c3-2", label: "Tempoh: 365¼ hari (setahun)" },
        { id: "c3-3", label: "Perihelion (Januari) & Aphelion (Julai)" },
        {
          id: "c3-4",
          label: "Kesan: Empat Musim",
          children: [
            { id: "c3-4-1", label: "Ekuinoks Musim Bunga (21 Mac)" },
            { id: "c3-4-2", label: "Solstis Musim Panas (21 Jun)" },
            { id: "c3-4-3", label: "Ekuinoks Musim Luruh (23 Sept)" },
            { id: "c3-4-4", label: "Solstis Musim Sejuk (22 Dis)" },
          ],
        },
        {
          id: "c3-5",
          label: "Kesan: Fenomena Gerhana",
          children: [
            { id: "c3-5-1", label: "Gerhana Bulan (bumi halang cahaya ke bulan)" },
            { id: "c3-5-2", label: "Gerhana Matahari (bulan halang cahaya ke bumi)" },
          ],
        },
      ],
    },
  ],
};
