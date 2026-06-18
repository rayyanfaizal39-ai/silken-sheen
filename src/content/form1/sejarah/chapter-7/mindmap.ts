import type { MindNode } from "@/components/MindMap";

export const tamadunIndiaChinaMindMap: MindNode = {
  id: "c7-root",
  label: "Tamadun India dan China (Bab 7)",
  children: [
    {
      id: "c7-a",
      label: "Tamadun India",
      children: [
        {
          id: "c7-a-1",
          label: "Perluasan Kuasa Fizikal",
          children: [
            { id: "c7-a-1-1", label: "Faktor: Kekuatan Tentera" },
            { id: "c7-a-1-2", label: "Faktor: Kepimpinan dan Disiplin" },
            { id: "c7-a-1-3", label: "Dinasti Nanda (200k Infanteri)" },
            { id: "c7-a-1-4", label: "Dinasti Maurya (Chandragupta)" },
            { id: "c7-a-1-5", label: "Dinasti Gupta (Chandragupta I)" },
          ],
        },
        {
          id: "c7-a-2",
          label: "Perluasan Kuasa Keagamaan",
          children: [
            { id: "c7-a-2-1", label: "Zaman Asoka (Buddhisme)" },
            { id: "c7-a-2-2", label: "Misi Dakwah (Tiang Asoka)" },
            { id: "c7-a-2-3", label: "Pasca Perang Kalinga" },
            { id: "c7-a-2-4", label: "Zaman Gupta (Hinduisme)" },
          ],
        },
      ],
    },
    {
      id: "c7-b",
      label: "Tamadun China",
      children: [
        {
          id: "c7-b-1",
          label: "Sistem Pendidikan",
          children: [
            { id: "c7-b-1-1", label: "Matlamat: Berkhidmat kepada Kerajaan" },
            { id: "c7-b-1-2", label: "Dinasti Qin: Legalisme dan Pentadbiran" },
            { id: "c7-b-1-3", label: "Dinasti Han: Konfusianisme" },
            { id: "c7-b-1-4", label: "Peringkat: Rendah, Menengah, Tinggi" },
          ],
        },
        {
          id: "c7-b-2",
          label: "Peperiksaan Awam",
          children: [
            {
              id: "c7-b-2-1",
              label: "Tahap Peperiksaan",
              children: [
                { id: "c7-b-2-1-1", label: "Tahap Pertama: Hsiu-ts'ai (Daerah)" },
                { id: "c7-b-2-1-2", label: "Tahap Kedua: Chu-jen (Wilayah)" },
                { id: "c7-b-2-1-3", label: "Tahap Ketiga: Chin-shih (Metropolitan)" },
              ],
            },
            {
              id: "c7-b-2-2",
              label: "Ciri-ciri dan Peraturan",
              children: [
                { id: "c7-b-2-2-1", label: "Kawalan Ketat dan Integriti" },
                { id: "c7-b-2-2-2", label: "Dikurung dalam Bilik" },
                { id: "c7-b-2-2-3", label: "Menghafal 9 Buku Suci" },
                { id: "c7-b-2-2-4", label: "Hanya Calon Lelaki" },
              ],
            },
          ],
        },
      ],
    },
  ],
};
