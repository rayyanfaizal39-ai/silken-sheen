import type { MindNode } from "@/components/MindMap";

export const geoF1C9MindMap: MindNode = {
  id: "root",
  label: "Petempatan di Malaysia",
  children: [
    {
      id: "c1",
      label: "Jenis Petempatan",
      children: [
        {
          id: "c1-1",
          label: "Petempatan Luar Bandar",
          children: [
            { id: "c1-1-1", label: "Kampung tradisional" },
            { id: "c1-1-2", label: "Kampung nelayan" },
            { id: "c1-1-3", label: "Kampung orang asli" },
            { id: "c1-1-4", label: "Ladang / estet" },
            { id: "c1-1-5", label: "Perkampungan baru" },
          ],
        },
        {
          id: "c1-2",
          label: "Petempatan Bandar",
          children: [
            { id: "c1-2-1", label: "Bandar kecil (<100k)" },
            { id: "c1-2-2", label: "Bandar sederhana (100k–500k)" },
            { id: "c1-2-3", label: "Bandar besar (>500k)" },
            { id: "c1-2-4", label: "Bandar raya (>1 juta)" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "Pola Petempatan",
      children: [
        { id: "c2-1", label: "Linear — sepanjang sungai / jalan raya" },
        { id: "c2-2", label: "Berkelompok — berhampiran sumber air / tanah subur" },
        { id: "c2-3", label: "Berselerak — jauh antara satu sama lain (tanah tinggi)" },
      ],
    },
    {
      id: "c3",
      label: "Faktor Pemilihan Tapak Petempatan",
      children: [
        { id: "c3-1", label: "Sumber air — berhampiran sungai / perigi" },
        { id: "c3-2", label: "Tanah rata — mudah dibina" },
        { id: "c3-3", label: "Tanah subur — pertanian" },
        { id: "c3-4", label: "Pertahanan — di atas bukit zaman dahulu" },
        { id: "c3-5", label: "Pengangkutan — jalan raya, pelabuhan, lapangan terbang" },
        { id: "c3-6", label: "Keselamatan — jauh dari kawasan banjir / tanah runtuh" },
      ],
    },
    {
      id: "c4",
      label: "Perbandaran (Urbanisasi)",
      children: [
        { id: "c4-1", label: "Pertambahan penduduk bandar" },
        {
          id: "c4-2",
          label: "Faktor Penolak (Desa)",
          children: [
            { id: "c4-2-1", label: "Kurang peluang kerja" },
            { id: "c4-2-2", label: "Kemudahan asas terhad" },
          ],
        },
        {
          id: "c4-3",
          label: "Faktor Penarik (Bandar)",
          children: [
            { id: "c4-3-1", label: "Peluang pekerjaan" },
            { id: "c4-3-2", label: "Kemudahan pendidikan & kesihatan" },
            { id: "c4-3-3", label: "Taraf hidup lebih tinggi" },
          ],
        },
      ],
    },
    {
      id: "c5",
      label: "Masalah Perbandaran",
      children: [
        { id: "c5-1", label: "Kesesakan lalu lintas" },
        { id: "c5-2", label: "Pencemaran udara & bunyi" },
        { id: "c5-3", label: "Setinggan" },
        { id: "c5-4", label: "Kemiskinan bandar" },
      ],
    },
  ],
};
