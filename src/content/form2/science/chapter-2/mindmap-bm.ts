import type { MindNode } from "@/components/MindMap";

export const scienceF2C2MindMapBM: MindNode = {
  id: "root",
  label: "Ekosistem",
  children: [
    {
      id: "c1",
      label: "2.1 Aliran Tenaga dalam Ekosistem",
      children: [
        {
          id: "c1-1",
          label: "Pengeluar, Pengguna, Pengurai",
          children: [
            { id: "c1-1-1", label: "Pengeluar: fotosintesis (tumbuhan)" },
            { id: "c1-1-2", label: "Pengguna primer: herbivor/omnivor" },
            { id: "c1-1-3", label: "Pengguna sekunder: omnivor/karnivor" },
            { id: "c1-1-4", label: "Pengguna tertier: karnivor sekunder" },
            { id: "c1-1-5", label: "Pengurai: saprofitisme (cendawan, bakteria)" },
          ],
        },
        {
          id: "c1-2",
          label: "Rantai & Siratan Makanan",
          children: [
            { id: "c1-2-1", label: "Rantai makanan: laluan linear" },
            { id: "c1-2-2", label: "Siratan makanan: gabungan rantai makanan" },
            { id: "c1-2-3", label: "Tenaga hilang setiap peringkat trofik (respirasi, najis)" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "2.2 Kitar Nutrien dalam Ekosistem",
      children: [
        { id: "c2-1", label: "Kitar air: transpirasi, penyejatan, kondensasi, hujan" },
        { id: "c2-2", label: "Kitar karbon & oksigen: fotosintesis, respirasi, penguraian" },
        { id: "c2-3", label: "Konsep piramid tenaga: tenaga berkurang ke atas" },
        { id: "c2-4", label: "Gangguan kitar nutrien: pembalakan, bahan api fosil, air berlebihan" },
      ],
    },
    {
      id: "c3",
      label: "2.3 Kebergantungan & Interaksi",
      children: [
        {
          id: "c3-1",
          label: "Spesies → Populasi → Komuniti → Ekosistem",
        },
        {
          id: "c3-2",
          label: "Simbiosis",
          children: [
            { id: "c3-2-1", label: "Mutualisme: kedua-dua untung (anemon & ikan badut)" },
            { id: "c3-2-2", label: "Komensalisme: satu untung (remora & jerung)" },
            { id: "c3-2-3", label: "Parasitisme: parasit untung, perumah rugi (cacing pita)" },
          ],
        },
        { id: "c3-3", label: "Mangsa-pemangsa" },
        { id: "c3-4", label: "Persaingan: cahaya, ruang, air, makanan, pasangan" },
        {
          id: "c3-5",
          label: "Kawalan Biologi",
          children: [
            { id: "c3-5-1", label: "Burung hantu (tikus), guppy (larva nyamuk)" },
            { id: "c3-5-2", label: "Kebaikan: mesra alam, murah" },
            { id: "c3-5-3", label: "Kelemahan: lambat berkesan, ganggu ekosistem" },
          ],
        },
        {
          id: "c3-6",
          label: "Faktor Saiz Populasi",
          children: [
            { id: "c3-6-1", label: "Penyakit, pemangsa, sumber makanan, cuaca" },
          ],
        },
        {
          id: "c3-7",
          label: "Perubahan Ekosistem",
          children: [
            { id: "c3-7-1", label: "Penghijrahan: burung kuntul kerbau (Kuala Gula)" },
            { id: "c3-7-2", label: "Bekalan air terhad: sawah padi" },
          ],
        },
      ],
    },
    {
      id: "c4",
      label: "2.4 Peranan Manusia",
      children: [
        { id: "c4-1", label: "Kesan: pembalakan, perindustrian, pertanian, pelupusan sisa" },
        { id: "c4-2", label: "Penguatkuasaan undang-undang" },
        { id: "c4-3", label: "Kesedaran awam" },
        { id: "c4-4", label: "5R: Tolak, Kurangkan, Guna Semula, Kitar Semula, Guna Lain" },
        { id: "c4-5", label: "Kawalan biologi dalam pertanian" },
      ],
    },
  ],
};
