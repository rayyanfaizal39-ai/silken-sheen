import type { MindNode } from "@/components/MindMap";

export const geoF1C13MindMap: MindNode = {
  id: "root",
  label: "Sisa Domestik",
  children: [
    {
      id: "c1",
      label: "Jenis Sisa Domestik",
      children: [
        {
          id: "c1-1",
          label: "Sisa Pepejal",
          children: [
            { id: "c1-1-1", label: "Plastik — bungkusan, botol" },
            { id: "c1-1-2", label: "Kertas & kadbod" },
            { id: "c1-1-3", label: "Kaca" },
            { id: "c1-1-4", label: "Logam — tin, aluminium" },
            { id: "c1-1-5", label: "Sisa makanan / organik" },
          ],
        },
        {
          id: "c1-2",
          label: "Sisa Cecair",
          children: [
            { id: "c1-2-1", label: "Air kumbahan rumah tangga" },
            { id: "c1-2-2", label: "Minyak masak terpakai" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "Kaedah Pelupusan Sisa",
      children: [
        {
          id: "c2-1",
          label: "Tapak Pelupusan Sanitari",
          children: [
            { id: "c2-1-1", label: "Sisa ditanam berlapis" },
            { id: "c2-1-2", label: "Risiko: gas metana & larut lesap" },
          ],
        },
        {
          id: "c2-2",
          label: "Insinerator",
          children: [
            { id: "c2-2-1", label: "Sisa dibakar pada suhu tinggi" },
            { id: "c2-2-2", label: "Mengurang isipadu 90%" },
            { id: "c2-2-3", label: "Risiko: pencemaran udara" },
          ],
        },
        {
          id: "c2-3",
          label: "Kitar Semula",
          children: [
            { id: "c2-3-1", label: "3R: Reduce, Reuse, Recycle" },
            { id: "c2-3-2", label: "Plastik, kertas, kaca, logam" },
          ],
        },
        {
          id: "c2-4",
          label: "Pengkomposan",
          children: [
            { id: "c2-4-1", label: "Sisa organik → baja kompos" },
            { id: "c2-4-2", label: "Mesra alam" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "Kesan Pelupusan Tidak Teratur",
      children: [
        { id: "c3-1", label: "Pencemaran air — sisa masuk sungai" },
        { id: "c3-2", label: "Pencemaran tanah — bahan toksik meresap" },
        { id: "c3-3", label: "Pencemaran udara — pembakaran terbuka" },
        { id: "c3-4", label: "Penyebaran penyakit — sarang nyamuk & lalat" },
        { id: "c3-5", label: "Kerosakan estetik — kawasan kotor" },
      ],
    },
    {
      id: "c4",
      label: "Pengurusan Sisa Lestari",
      children: [
        { id: "c4-1", label: "Pengasingan sisa di sumber (3 tong warna)" },
        { id: "c4-2", label: "Kempen kesedaran awam" },
        { id: "c4-3", label: "Perundangan — Akta Kualiti Alam Sekeliling 1974" },
        { id: "c4-4", label: "Teknologi pelupusan moden" },
        { id: "c4-5", label: "Penglibatan komuniti & NGO" },
      ],
    },
  ],
};
