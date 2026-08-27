import type { MindNode } from "@/components/MindMap";

export const scienceF2C5MindMapBM: MindNode = {
  id: "root",
  label: "Air dan Larutan",
  children: [
    {
      id: "c1",
      label: "5.1 Sifat Fizik Air",
      children: [
        {
          id: "c1-1",
          label: "Ciri Air Tulen",
          children: [
            { id: "c1-1-1", label: "Tidak berwarna, tidak berbau, tidak berasa" },
            { id: "c1-1-2", label: "Takat didih 100°C; Takat beku 0°C; Ketumpatan 1 g/cm³" },
            { id: "c1-1-3", label: "Tegangan permukaan: daya lekitan sahaja" },
            { id: "c1-1-4", label: "Tindakan kapilari: daya lekitan + daya lekatan" },
          ],
        },
        {
          id: "c1-2",
          label: "Komposisi Air",
          children: [
            { id: "c1-2-1", label: "H₂O: 2 atom hidrogen + 1 atom oksigen" },
            { id: "c1-2-2", label: "Elektrolisis: O₂ di anod, H₂ di katod, nisbah 2:1" },
          ],
        },
        { id: "c1-3", label: "Bendasing: turunkan takat lebur, naikkan takat didih" },
        {
          id: "c1-4",
          label: "Penyejatan",
          children: [
            { id: "c1-4-1", label: "Berlaku di permukaan, pada sebarang suhu" },
            {
              id: "c1-4-2",
              label: "Faktor Penyejatan",
              children: [
                { id: "c1-4-2-1", label: "Kelembapan: rendah → lebih cepat" },
                { id: "c1-4-2-2", label: "Suhu persekitaran: tinggi → lebih cepat" },
                { id: "c1-4-2-3", label: "Luas permukaan terdedah: besar → lebih cepat" },
                { id: "c1-4-2-4", label: "Pergerakan udara: cepat → lebih cepat" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "5.2 Larutan dan Kadar Keterlarutan",
      children: [
        { id: "c2-1", label: "Zat Terlarut + Pelarut = Larutan" },
        {
          id: "c2-2",
          label: "Jenis Larutan",
          children: [
            { id: "c2-2-1", label: "Cair: sedikit zat terlarut, larutkan lebih" },
            { id: "c2-2-2", label: "Pekat: lebih banyak zat terlarut, larutkan kurang" },
            { id: "c2-2-3", label: "Tepu: zat terlarut berlebihan, bentuk mendakan" },
          ],
        },
        { id: "c2-3", label: "Ampaian: berkabus, halang cahaya, ada baki, mengenap" },
        { id: "c2-4", label: "Koloid: pertengahan larutan & ampaian (buih, emulsi)" },
        {
          id: "c2-5",
          label: "Keterlarutan: BERAPA BANYAK",
          children: [
            { id: "c2-5-1", label: "Kuantiti maksimum zat terlarut dalam 100 ml pelarut" },
            { id: "c2-5-2", label: "Dinyatakan pada suhu tertentu" },
            { id: "c2-5-3", label: "Suhu lebih tinggi → kebanyakan pepejal larut lebih banyak" },
          ],
        },
        {
          id: "c2-8",
          label: "Kadar keterlarutan: BERAPA CEPAT",
          children: [
            { id: "c2-8-1", label: "Suhu pelarut: tinggi → larut lebih cepat" },
            { id: "c2-8-2", label: "Kadar kacauan: cepat → larut lebih cepat" },
            { id: "c2-8-3", label: "Saiz zat terlarut: kecil → larut lebih cepat" },
            { id: "c2-8-4", label: "Pemboleh ubah bergerak balas: kadar keterlarutan" },
          ],
        },
        { id: "c2-6", label: "Air sebagai Pelarut Semesta: larutkan hampir semua bahan" },
        { id: "c2-7", label: "Pelarut Organik: alkohol, kerosin, aseton, turpentin, eter" },
      ],
    },
    {
      id: "c3",
      label: "5.3 Pembersihan dan Bekalan Air",
      children: [
        {
          id: "c3-1",
          label: "Kaedah Pembersihan",
          children: [
            { id: "c3-1-1", label: "Penurasan: buang zarah terampai" },
            { id: "c3-1-2", label: "Pendidihan: bunuh mikroorganisma" },
            { id: "c3-1-3", label: "Pengklorinan: bunuh mikroorganisma" },
            { id: "c3-1-4", label: "Penyulingan: buang semuanya (paling tulen)" },
            { id: "c3-1-5", label: "Penulenan = hasilkan air tulen; hanya penyulingan capai" },
          ],
        },
        {
          id: "c3-2",
          label: "Sistem Bekalan Air",
          children: [
            { id: "c3-2-1", label: "Penapisan → Pengoksidaan → Penggumpalan" },
            { id: "c3-2-2", label: "Pengenapan → Penurasan → Pengklorinan/Pemfluoridaan" },
            { id: "c3-2-3", label: "Alum: gumpalkan lumpur; Kapur mati: kurangkan keasidan" },
          ],
        },
        {
          id: "c3-3",
          label: "Kelestarian Air",
          children: [
            { id: "c3-3-1", label: "Pencemar: domestik, perindustrian, pertanian, tumpahan minyak" },
            { id: "c3-3-2", label: "Air selamat diminum: bebas mikroorganisma & bahan beracun" },
            { id: "c3-3-3", label: "Teluk Minamata: keracunan merkuri melalui rantai makanan" },
            { id: "c3-3-4", label: "Audit air: rekod penggunaan → kenal pasti pembaziran" },
          ],
        },
        {
          id: "c3-4",
          label: "Bekalan Air Alternatif",
          children: [
            { id: "c3-4-1", label: "Osmosis berbalik: air laut ditekan melalui membran halus" },
            { id: "c3-4-2", label: "Kitar semula air: NEWater (Singapura)" },
            { id: "c3-4-3", label: "Air dari kabus: jaring kumpul titisan halus" },
          ],
        },
      ],
    },
  ],
};
