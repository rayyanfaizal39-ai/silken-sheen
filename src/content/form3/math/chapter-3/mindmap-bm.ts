import type { MindNode } from "@/components/MindMap";

export const mathF3C3MindMapBM: MindNode = {
  id: "f3c3",
  label: "Matematik Pengguna: Simpanan, Pelaburan, Kredit dan Hutang",
  children: [
    {
      id: "f3c3-1",
      label: "3.1 Simpanan dan Pelaburan",
      children: [
        {
          id: "f3c3-1-1",
          label: "Jenis Simpanan dan Pelaburan",
          children: [
            { id: "f3c3-1-1-1", label: "Akaun simpanan biasa, akaun simpanan tetap" },
            { id: "f3c3-1-1-2", label: "Saham, amanah saham, hartanah" },
          ],
        },
        {
          id: "f3c3-1-2",
          label: "Faedah",
          children: [
            { id: "f3c3-1-2-1", label: "Faedah mudah: I = Prt" },
            { id: "f3c3-1-2-2", label: "Faedah kompaun: MV = P(1+r/n)^(nt)" },
            { id: "f3c3-1-2-3", label: "Lebih kerap pengkompaunan = nilai matang lebih tinggi" },
          ],
        },
        {
          id: "f3c3-1-3",
          label: "ROI dan Risiko",
          children: [
            { id: "f3c3-1-3-1", label: "ROI = (jumlah pulangan/kos) x100%" },
            { id: "f3c3-1-3-2", label: "Risiko, pulangan, kecairan - 3 faktor pelaburan" },
            { id: "f3c3-1-3-3", label: "Diversifikasi portfolio kurangkan risiko" },
          ],
        },
        {
          id: "f3c3-1-4",
          label: "Strategi Pemurataan Kos",
          children: [
            { id: "f3c3-1-4-1", label: "Unit = jumlah pelaburan / harga seunit" },
            { id: "f3c3-1-4-2", label: "Kos purata seunit lebih rendah berbanding sekali gus" },
          ],
        },
      ],
    },
    {
      id: "f3c3-2",
      label: "3.2 Pengurusan Kredit dan Hutang",
      children: [
        {
          id: "f3c3-2-1",
          label: "Kad Kredit",
          children: [
            { id: "f3c3-2-1-1", label: "Tempoh tanpa faedah ~20 hari" },
            { id: "f3c3-2-1-2", label: "Bayaran minimum 5% atau RM50" },
            { id: "f3c3-2-1-3", label: "Kelebihan: rebat, mata ganjaran; Kekurangan: caj, risiko hutang" },
          ],
        },
        {
          id: "f3c3-2-2",
          label: "Pinjaman dan Ansuran",
          children: [
            { id: "f3c3-2-2-1", label: "Faedah sama rata: A = P + Prt" },
            { id: "f3c3-2-2-2", label: "Ansuran = A / bilangan bulan" },
            { id: "f3c3-2-2-3", label: "Faedah atas baki: dikira semula setiap bulan" },
          ],
        },
      ],
    },
    {
      id: "f3c3-3",
      label: "Ringkasan Bab",
      children: [
        { id: "f3c3-3-1", label: "Simpanan vs pelaburan: faedah vs pulangan/risiko" },
        { id: "f3c3-3-2", label: "Kompaun > faedah mudah untuk P,r,t sama" },
        { id: "f3c3-3-3", label: "Urus kredit bijak: bayar penuh dalam tempoh tanpa faedah" },
      ],
    },
  ],
};
