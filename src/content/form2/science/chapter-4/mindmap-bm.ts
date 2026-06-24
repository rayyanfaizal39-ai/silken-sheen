import type { MindNode } from "@/components/MindMap";

export const scienceF2C4MindMapBM: MindNode = {
  id: "root",
  label: "Kesihatan Manusia",
  children: [
    {
      id: "c1",
      label: "4.1 Penyakit",
      children: [
        {
          id: "c1-1",
          label: "Penyakit Berjangkit",
          children: [
            { id: "c1-1-1", label: "Disebabkan patogen melalui medium/vektor; BOLEH merebak" },
            { id: "c1-1-2", label: "Contoh: tibi, selesema, kurap, kurap kaki, leptospirosis, denggi, malaria, Zika" },
          ],
        },
        {
          id: "c1-2",
          label: "Penyakit Tidak Berjangkit",
          children: [
            { id: "c1-2-1", label: "Disebabkan genetik/gaya hidup; TIDAK BOLEH merebak" },
            { id: "c1-2-2", label: "Contoh: kanser, darah tinggi, diabetes, asma, kardiovaskular" },
          ],
        },
        {
          id: "c1-3",
          label: "Cara Penyebaran",
          children: [
            { id: "c1-3-1", label: "Udara: titisan & debu (tibi, selesema, SARS, H1N1, cacar air)" },
            { id: "c1-3-2", label: "Air: makanan/air tercemar (kolera, kepialu, disentri amoeba)" },
            { id: "c1-3-3", label: "Sentuhan: kulit/seks/darah (kurap, kurap kaki, sifilis, HIV)" },
            { id: "c1-3-4", label: "Vektor: Aedes→denggi/Zika; Anopheles→malaria; Tikus→leptospirosis; Lipas/Lalat→kepialu" },
          ],
        },
        {
          id: "c1-4",
          label: "3 Peringkat Pencegahan",
          children: [
            { id: "c1-4-1", label: "Primer: tingkatkan kesihatan & pertahanan badan" },
            { id: "c1-4-2", label: "Sekunder: kesan & rawat awal, asingkan pesakit" },
            { id: "c1-4-3", label: "Tertiari: kawal vektor, lindungi perumah" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "4.2 Pertahanan Badan",
      children: [
        {
          id: "c2-1",
          label: "Pertahanan 1: Kulit & Membran Mukus",
          children: [
            { id: "c2-1-1", label: "Kulit: lapisan tebal, peluh & sebum bunuh mikroorganisma" },
            { id: "c2-1-2", label: "Membran mukus: bulu hidung, mukus, air mata, tahi telinga" },
          ],
        },
        { id: "c2-2", label: "Pertahanan 2: Fagositosis (sel darah putih telan patogen)" },
        {
          id: "c2-3",
          label: "Pertahanan 3: Sistem Imun",
          children: [
            { id: "c2-3-1", label: "Antigen: bahan asing yang merangsang penghasilan antibodi" },
            { id: "c2-3-2", label: "Antibodi: protein dihasilkan sel darah putih sebagai tindak balas" },
          ],
        },
        {
          id: "c2-4",
          label: "Imunisasi",
          children: [
            { id: "c2-4-1", label: "Vaksin: antigen lemah/mati, bentuk imuniti tanpa penyakit" },
            { id: "c2-4-2", label: "Jadual Malaysia: BCG, DTaP, MMR, IPV, HPV (perempuan 13 tahun), JE (Sarawak)" },
          ],
        },
        {
          id: "c2-5",
          label: "Jenis Imuniti",
          children: [
            { id: "c2-5-1", label: "Pasif Semula Jadi: ibu→bayi, jangka pendek" },
            { id: "c2-5-2", label: "Pasif Buatan: antiserum, cepat & sementara" },
            { id: "c2-5-3", label: "Aktif Semula Jadi: sembuh daripada jangkitan, kekal lama" },
            { id: "c2-5-4", label: "Aktif Buatan: vaksinasi, kekal lama" },
          ],
        },
        {
          id: "c2-6",
          label: "Sistem Imun yang Kukuh",
          children: [
            { id: "c2-6-1", label: "Lemahkan: udara tercemar, racun perosak, stres, gula berlebihan, merokok" },
            { id: "c2-6-2", label: "Kukuhkan: tidur cukup, bersenam, udara segar, tidak merokok, pemeriksaan kesihatan" },
            { id: "c2-6-3", label: "Alahan: tindak balas imun terhadap alergen (debu, debunga, makanan, ubat)" },
          ],
        },
      ],
    },
  ],
};
