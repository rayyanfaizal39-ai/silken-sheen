import type { MindNode } from "@/components/MindMap";

export const geoF1C12MindMap: MindNode = {
  id: "root",
  label: "Bab 12 · Sumber Air",
  children: [
    {
      id: "c1",
      label: "Jenis Sumber Air",
      children: [
        {
          id: "c1-1",
          label: "Air Permukaan · 97%",
          children: [
            { id: "c1-1-1", label: "Sungai, tasik dan empangan" },
            { id: "c1-1-2", label: "150+ lembangan sungai utama" },
          ],
        },
        {
          id: "c1-2",
          label: "Air Bawah Tanah · 3%",
          children: [
            { id: "c1-2-1", label: "Disimpan dalam akuifer" },
            { id: "c1-2-2", label: "5,000 bilion m³ simpanan" },
          ],
        },
        {
          id: "c1-3",
          label: "Proses Hidrologi",
          children: [
            { id: "c1-3-1", label: "Intersepsi · pintasan tumbuhan" },
            { id: "c1-3-2", label: "Infiltrasi · resapan ke dalam tanah" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "6 Punca Krisis Air",
      children: [
        { id: "c2-1", label: "Penebangan hutan tadahan" },
        { id: "c2-2", label: "Kemarau dan El Nino" },
        { id: "c2-3", label: "Pencemaran air" },
        { id: "c2-4", label: "Permintaan perindustrian" },
        { id: "c2-5", label: "Baja dan racun pertanian" },
        { id: "c2-6", label: "Peningkatan populasi" },
      ],
    },
    {
      id: "c3",
      label: "4 Kesan Krisis Air",
      children: [
        { id: "c3-1", label: "Kekurangan air bersih" },
        { id: "c3-2", label: "Tanih dan pertanian terjejas" },
        { id: "c3-3", label: "Kepupusan flora dan fauna" },
        { id: "c3-4", label: "Penyakit bawaan air" },
      ],
    },
    {
      id: "c4",
      label: "6 Langkah Mengatasi",
      children: [
        { id: "c4-1", label: "Pelihara kawasan tadahan" },
        { id: "c4-2", label: "Kuat kuasa undang-undang" },
        { id: "c4-3", label: "Rawat air kumbahan" },
        { id: "c4-4", label: "Teroka air bawah tanah" },
        { id: "c4-5", label: "Kempen kesedaran" },
        { id: "c4-6", label: "Penyelidikan dan pembangunan" },
      ],
    },
  ],
};
