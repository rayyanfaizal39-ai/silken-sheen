import type { MindNode } from "@/components/MindMap";

export const geoF1C13MindMap: MindNode = {
  id: "root",
  label: "Sisa Domestik",
  children: [
    {
      id: "c1",
      label: "Jenis Bahan",
      children: [
        {
          id: "c1-1",
          label: "Organik — boleh diuraikan",
          children: [
            { id: "c1-1-1", label: "Sumber haiwan dan tumbuhan" },
            { id: "c1-1-2", label: "Makanan, kebun, kertas" },
          ],
        },
        {
          id: "c1-2",
          label: "Bukan organik — sukar diuraikan",
          children: [
            { id: "c1-2-1", label: "Sumber mineral" },
            { id: "c1-2-2", label: "Besi, plastik, tin, kaca" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "Keadaan Fizikal",
      children: [
        {
          id: "c2-1",
          label: "Sisa pepejal",
          children: [
            { id: "c2-1-1", label: "Makanan, kertas, plastik" },
            { id: "c2-1-2", label: "Logam, perabot, lampin" },
          ],
        },
        {
          id: "c2-2",
          label: "Sisa cecair",
          children: [
            { id: "c2-2-1", label: "Kumbahan" },
            { id: "c2-2-2", label: "Minyak masak" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "Empat Kesan",
      children: [
        { id: "c3-1", label: "Pencemaran air, udara dan bau" },
        { id: "c3-2", label: "Wabak penyakit" },
        { id: "c3-3", label: "Banjir kilat" },
        { id: "c3-4", label: "Kos penyelenggaraan meningkat" },
      ],
    },
    {
      id: "c4",
      label: "Lima Langkah",
      children: [
        { id: "c4-1", label: "3R — Reduce, Reuse, Recycle" },
        { id: "c4-2", label: "Teknologi — WtE dan biodegradasi" },
        { id: "c4-3", label: "Undang-undang — Akta 672 dan 673" },
        { id: "c4-4", label: "Kempen kesedaran" },
        { id: "c4-5", label: "Pendidikan alam sekitar" },
      ],
    },
  ],
};
