import type { MindNode } from "@/components/MindMap";

export const geoF2C1MindMap: MindNode = {
  id: "root",
  label: "Skala dan Jarak",
  children: [
    {
      id: "c1",
      label: "1.1 Skala",
      children: [
        {
          id: "c1-1",
          label: "Skala Lurus",
          children: [
            { id: "c1-1-1", label: "Bentuk graf berskala (bar)" },
            { id: "c1-1-2", label: "Skala lurus muduh vs skala lurus penuh" },
            { id: "c1-1-3", label: "Diukur terus dengan pembaris" },
          ],
        },
        {
          id: "c1-2",
          label: "Skala Penyata",
          children: [
            { id: "c1-2-1", label: "Cth: 1 cm mewakili 1 km" },
            { id: "c1-2-2", label: "Mudah difahami & dikira" },
          ],
        },
        {
          id: "c1-3",
          label: "Pecahan Wakilan (PW)",
          children: [
            { id: "c1-3-1", label: "Cth: 1:100 000" },
            { id: "c1-3-2", label: "Nisbah tanpa unit" },
            { id: "c1-3-3", label: "1 km = 100 000 cm = 1 000 m" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "1.2 Jarak",
      children: [
        {
          id: "c2-1",
          label: "Jarak Mutlak",
          children: [
            { id: "c2-1-1", label: "Diukur dalam unit (m / km)" },
            { id: "c2-1-2", label: "Tetap, tidak berubah" },
          ],
        },
        {
          id: "c2-2",
          label: "Jarak Relatif",
          children: [
            { id: "c2-2-1", label: "Berdasarkan masa, kos, pengangkutan" },
            { id: "c2-2-2", label: "Berubah ikut situasi" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "1.3 Mengukur Jarak Sebenar",
      children: [
        {
          id: "c3-1",
          label: "Jarak Lurus",
          children: [
            { id: "c3-1-1", label: "Alat: pembaris, jangka tolok, jalur kertas" },
          ],
        },
        {
          id: "c3-2",
          label: "Jarak Melengkung",
          children: [
            { id: "c3-2-1", label: "Alat: benang, jalur kertas, pembaris" },
          ],
        },
        {
          id: "c3-3",
          label: "Formula",
          children: [
            { id: "c3-3-1", label: "Jarak Sebenar = Jarak Peta × Skala" },
          ],
        },
      ],
    },
    {
      id: "c4",
      label: "1.4 Jarak Sebenar pada Peta",
      children: [
        { id: "c4-1", label: "Langkah: ukur jarak peta → kenal pasti skala → darab" },
        { id: "c4-2", label: "Tukar unit kepada km jika perlu" },
      ],
    },
  ],
};
