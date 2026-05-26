import type { MindNode } from "@/components/MindMap";

export const zamanPrasejarahMindMap: MindNode = {
  id: "root",
  label: "Zaman Prasejarah",
  children: [
    {
      id: "p1",
      label: "Tahap Zaman",
      children: [
        { id: "p1-1", label: "Zaman Paleolitik" },
        { id: "p1-2", label: "Zaman Mesolitik" },
        { id: "p1-3", label: "Zaman Neolitik" },
        { id: "p1-4", label: "Zaman Logam" },
      ],
    },
    {
      id: "p2",
      label: "Lokasi Penemuan Dunia",
      children: [
        { id: "p2-1", label: "Gua Altamira (Sepanyol)" },
        { id: "p2-2", label: "Gua Lascaux (Perancis)" },
        { id: "p2-3", label: "Catal Huyuk (Turki)" },
        { id: "p2-4", label: "Stonehenge (Britain)" },
        { id: "p2-5", label: "Bhimbetka (India)" },
        { id: "p2-6", label: "Zhoukoudian (China)" },
        { id: "p2-7", label: "Gobekli Tepe (Turki)" },
      ],
    },
    {
      id: "p3",
      label: "Lokasi Asia Tenggara",
      children: [
        { id: "p3-1", label: "Ban Chiang (Thailand)" },
        { id: "p3-2", label: "Lembah Lenggong (Malaysia)" },
        { id: "p3-3", label: "Gua Liang Bua (Indonesia)" },
        { id: "p3-4", label: "Grotto (Vietnam)" },
        { id: "p3-5", label: "Gua Tabon (Filipina)" },
      ],
    },
    {
      id: "p4",
      label: "Ciri-ciri Kehidupan",
      children: [
        {
          id: "p4-1",
          label: "Tempat Kediaman",
          children: [
            { id: "p4-1-1", label: "Gua dan lubang pokok (Paleolitik)" },
            { id: "p4-1-2", label: "Pinggir sungai dan laut (Mesolitik)" },
            { id: "p4-1-3", label: "Rumah menetap (Neolitik/Logam)" },
          ],
        },
        {
          id: "p4-2",
          label: "Peralatan",
          children: [
            { id: "p4-2-1", label: "Batu kasar (Paleolitik)" },
            { id: "p4-2-2", label: "Mikrolit (Mesolitik)" },
            { id: "p4-2-3", label: "Batu halus dan licin (Neolitik)" },
            { id: "p4-2-4", label: "Gangsa dan Besi (Logam)" },
          ],
        },
        {
          id: "p4-3",
          label: "Kegiatan Ekonomi",
          children: [
            { id: "p4-3-1", label: "Memburu dan mengumpul (Paleo/Meso)" },
            { id: "p4-3-2", label: "Bercocok tanam dan ternakan (Neo)" },
            { id: "p4-3-3", label: "Sistem barter (Logam)" },
          ],
        },
        {
          id: "p4-4",
          label: "Organisasi Sosial",
          children: [
            { id: "p4-4-1", label: "Nomad dan kelompok kecil" },
            { id: "p4-4-2", label: "Kehidupan menetap" },
            { id: "p4-4-3", label: "Sistem ketua dan kelas sosial" },
          ],
        },
        {
          id: "p4-5",
          label: "Kepercayaan",
          children: [
            { id: "p4-5-1", label: "Animisme" },
            { id: "p4-5-2", label: "Ritual dan upacara" },
            { id: "p4-5-3", label: "Pengebumian mayat" },
          ],
        },
        {
          id: "p4-6",
          label: "Kesenian",
          children: [
            { id: "p4-6-1", label: "Lukisan gua" },
            { id: "p4-6-2", label: "Pola geometri tembikar" },
          ],
        },
      ],
    },
    {
      id: "p5",
      label: "Kesinambungan Masa Kini",
      children: [
        { id: "p5-1", label: "Pertanian sara diri ke komersial" },
        { id: "p5-2", label: "Penternakan untuk bekalan makanan" },
        { id: "p5-3", label: "Evolusi peralatan dari batu ke mesin" },
        { id: "p5-4", label: "Pembuatan tembikar dan seramik" },
        { id: "p5-5", label: "Ideofak (Penghormatan si mati)" },
      ],
    },
  ],
};
