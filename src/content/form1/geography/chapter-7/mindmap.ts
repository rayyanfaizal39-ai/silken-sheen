import type { MindNode } from "@/components/MindMap";

export const geoF1C7MindMap: MindNode = {
  id: "root",
  label: "Saliran",
  children: [
    {
      id: "c1",
      label: "Sistem Saliran",
      children: [
        { id: "c1-1", label: "Sungai utama + anak sungai = lembangan saliran" },
        { id: "c1-2", label: "Lembangan saliran — kawasan tadahan sesuatu sungai" },
        { id: "c1-3", label: "Sempadan lembangan — banjaran / tanah tinggi" },
      ],
    },
    {
      id: "c2",
      label: "Sungai",
      children: [
        {
          id: "c2-1",
          label: "Bahagian Sungai",
          children: [
            { id: "c2-1-1", label: "Hulu — pergunungan, arus deras, lembah V" },
            { id: "c2-1-2", label: "Pertengahan — lencongan (meander), hakisan tebing" },
            { id: "c2-1-3", label: "Hilir — delta, pemendapan, muara" },
          ],
        },
        {
          id: "c2-2",
          label: "Corak Saliran",
          children: [
            { id: "c2-2-1", label: "Dendritik — seperti pokok (tanah rata)" },
            { id: "c2-2-2", label: "Trellis — bersilang (batuan berlapis)" },
            { id: "c2-2-3", label: "Radial — menjauhi pusat (gunung berapi/bukit)" },
          ],
        },
        {
          id: "c2-3",
          label: "Sungai Utama Malaysia",
          children: [
            { id: "c2-3-1", label: "Sungai Rajang (Sarawak) — terpanjang" },
            { id: "c2-3-2", label: "Sungai Kinabatangan (Sabah)" },
            { id: "c2-3-3", label: "Sungai Pahang — terpanjang di Semenanjung" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "Tasik",
      children: [
        { id: "c3-1", label: "Tasik semula jadi — Tasik Bera, Tasik Chini" },
        { id: "c3-2", label: "Tasik buatan (empangan) — Tasik Kenyir, Temenggor" },
        { id: "c3-3", label: "Fungsi: bekalan air, kawalan banjir, pelancongan" },
      ],
    },
    {
      id: "c4",
      label: "Kepentingan Saliran",
      children: [
        { id: "c4-1", label: "Bekalan air bersih" },
        { id: "c4-2", label: "Pengangkutan & perdagangan (hulu Sarawak)" },
        { id: "c4-3", label: "Pertanian — pengairan sawah" },
        { id: "c4-4", label: "Janakuasa hidroelektrik" },
        { id: "c4-5", label: "Perikanan air tawar" },
        { id: "c4-6", label: "Pelancongan & rekreasi" },
      ],
    },
    {
      id: "c5",
      label: "Masalah Saliran",
      children: [
        { id: "c5-1", label: "Banjir — sungai melimpah" },
        { id: "c5-2", label: "Pencemaran air — sisa kilang, pertanian" },
        { id: "c5-3", label: "Pemendapan berlebihan — penebangan hutan" },
      ],
    },
  ],
};
