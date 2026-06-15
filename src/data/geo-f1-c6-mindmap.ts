import type { MindNode } from "@/components/MindMap";

export const geoF1C6MindMap: MindNode = {
  id: "root",
  label: "Bentuk Muka Bumi",
  children: [
    {
      id: "c1",
      label: "Jenis Bentuk Muka Bumi",
      children: [
        {
          id: "c1-1",
          label: "Gunung / Tanah Tinggi",
          children: [
            { id: "c1-1-1", label: "Ketinggian >600 m dari aras laut" },
            { id: "c1-1-2", label: "Contoh: Gunung Kinabalu (4,095 m)" },
            { id: "c1-1-3", label: "Lereng curam, puncak tajam" },
          ],
        },
        {
          id: "c1-2",
          label: "Bukit",
          children: [
            { id: "c1-2-1", label: "Ketinggian 200–600 m" },
            { id: "c1-2-2", label: "Lereng lebih landai dari gunung" },
            { id: "c1-2-3", label: "Contoh: Bukit Fraser" },
          ],
        },
        {
          id: "c1-3",
          label: "Tanah Pamah",
          children: [
            { id: "c1-3-1", label: "Ketinggian <200 m dari aras laut" },
            { id: "c1-3-2", label: "Tanah rata, sesuai pertanian" },
            { id: "c1-3-3", label: "Contoh: Lembah Klang, pantai barat" },
          ],
        },
        {
          id: "c1-4",
          label: "Lembah",
          children: [
            { id: "c1-4-1", label: "Kawasan rendah antara dua tanah tinggi" },
            { id: "c1-4-2", label: "Berbentuk U (glasier) atau V (sungai)" },
          ],
        },
        {
          id: "c1-5",
          label: "Banjaran Gunung",
          children: [
            { id: "c1-5-1", label: "Siri gunung berjajar" },
            { id: "c1-5-2", label: "Contoh: Banjaran Titiwangsa (tulang belakang Semenanjung)" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "Proses Pembentukan",
      children: [
        {
          id: "c2-1",
          label: "Proses Dalalman (Endogenik)",
          children: [
            { id: "c2-1-1", label: "Tektonik plat — lipatan & sesar" },
            { id: "c2-1-2", label: "Gempa bumi & gunung berapi" },
          ],
        },
        {
          id: "c2-2",
          label: "Proses Luaran (Eksogenik)",
          children: [
            { id: "c2-2-1", label: "Luluhawa — hancurkan batuan" },
            { id: "c2-2-2", label: "Hakisan — angkutan bahan" },
            { id: "c2-2-3", label: "Pemendapan — deposition" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "Kepentingan Bentuk Muka Bumi",
      children: [
        { id: "c3-1", label: "Pertanian — tanah pamah & lembah subur" },
        { id: "c3-2", label: "Pelancongan — gunung & pantai" },
        { id: "c3-3", label: "Sumber air — pergunungan tangkap hujan" },
        { id: "c3-4", label: "Hutan simpan — tanah tinggi" },
        { id: "c3-5", label: "Petempatan — tanah pamah utama" },
      ],
    },
    {
      id: "c4",
      label: "Kontur",
      children: [
        { id: "c4-1", label: "Garisan menghubung titik sama ketinggian" },
        { id: "c4-2", label: "Kontur rapat → cerun curam" },
        { id: "c4-3", label: "Kontur jarang → cerun landai" },
        { id: "c4-4", label: "Selang kontur: perbezaan ketinggian antara dua kontur" },
      ],
    },
  ],
};
