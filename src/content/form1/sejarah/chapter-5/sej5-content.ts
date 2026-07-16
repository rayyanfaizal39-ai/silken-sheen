// sej5-content.ts
// Source-verified content for Sejarah Form 1, Bab 5 — Tamadun Awal Dunia
// Sourced from T1_BT_SEJ_-_SEJARAH.pdf (pages 90-107)
// Content data only — no presentation markup.

export interface Kingdom {
  name: string;
  duration: string;
  facts: string[];
}

export interface CivilizationProfile {
  name: string;
  river: string;
  location: string;
  startDate: string;
  kingdoms: Kingdom[];
  cityHighlights: { name: string; facts: string[] }[];
  keyFacts: string[];
}

export interface ComparisonRow {
  aspect: string;
  mesopotamia: string[];
  egypt: string[];
  indus: string[];
  huangHe: string[];
}

export interface Sej5Content {
  hook: { title: string; body: string };
  overview: {
    intro: string;
    riverImportance: string[];
  };
  civilizations: CivilizationProfile[];
  comparisonTable: ComparisonRow[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej5Content: Sej5Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Empat tamadun, empat sungai, satu corak yang sama: setiap satu bermula sebagai petempatan petani di tepi sungai dan berkembang menjadi empayar yang mencipta undang-undang, tulisan, dan senibina yang kita kagumi sehingga hari ini — daripada zigurat Mesopotamia kepada piramid Mesir.",
  },
  overview: {
    intro: "Terdapat empat tamadun awal manusia di dunia: Tamadun Mesopotamia, Tamadun Mesir Purba, Tamadun Indus dan Tamadun Huang He. Keempat-empatnya bermula dan berkembang di lembah sungai.",
    riverImportance: ["Membekalkan air bagi tanaman", "Membuat kawasan petempatan", "Menjadi alat perhubungan"],
  },
  civilizations: [
    {
      name: "Tamadun Mesopotamia",
      river: "Sungai Tigris dan Sungai Euphrates",
      location: "Barat daya Asia; 'Mesopotamia' bermaksud tanah di antara dua sungai, mengalir dari pergunungan Turki ke tanah pamah Iraq",
      startDate: "Berkembang dari petempatan Zaman Neolitik antara 5,000 SM hingga 700 SM; menjadi pusat tamadun awal sekitar 3,500 SM",
      kingdoms: [
        { name: "Sumeria", duration: "Bermula 3,500 SM", facts: ["Kerajaan terawal dalam tamadun ini"] },
        { name: "Babylon, Akkad, Chaldea, Asyria", duration: "Pelbagai zaman", facts: ["Chaldea runtuh pada tahun 539 SM (kerajaan terakhir)"] },
      ],
      cityHighlights: [
        { name: "Bulan Sabit Subur", facts: ["Kawasan subur luas dalam oasis, antara Laut Mediterranean dan Teluk Parsi", "Struktur bandar dibina daripada bata tanah liat", "Tempat ibadat berbentuk piramid dipanggil zigurat"] },
      ],
      keyFacts: ["Ciri utama Kerajaan Sumer: bandar maju, peningkatan teknologi, pengkhususan pekerjaan, pengurusan simpan kira, institusi kompleks"],
    },
    {
      name: "Tamadun Mesir Purba",
      river: "Sungai Nil",
      location: "Lembah Sungai Nil; sungai terpanjang di dunia (6,650 km)",
      startDate: "Petempatan petani bermula 5,000 SM",
      kingdoms: [
        { name: "Kerajaan Purba", duration: "Disatukan ~3,100 SM oleh Raja Mennes", facts: ["Raja Mennes menawan kerajaan utara, membuka bandar Memphis sebagai ibu kota", "Kemuncak perkembangan pada 2,650 SM"] },
        { name: "Kerajaan Pertengahan", duration: "2,100 – 1,650 SM", facts: ["Perkembangan kesusasteraan dan ukiran", "Ibu kota Thebes", "Hubungan perdagangan dengan Nubia"] },
        { name: "Kerajaan Baru", duration: "Termasuk Ramses II, 1,279 – 1,213 SM", facts: ["Pemerintah digelar Firaun", "Ramses membina banyak monumen berupa berhala"] },
      ],
      cityHighlights: [
        { name: "Hadiah Sungai Nil", facts: ["Julukan oleh Herodotus (484-432M) — banjir tahunan membawa lumpur hitam subur untuk pertanian", "Sumber makanan (ikan), perhubungan dan pengangkutan"] },
      ],
      keyFacts: ["3 tahap pemerintahan: Kerajaan Purba, Pertengahan, Baru", "Piramid dan Firaun adalah tinggalan paling terkenal"],
    },
    {
      name: "Tamadun Indus",
      river: "Sungai Indus",
      location: "Barat laut dan utara India; dikelilingi Banjaran Makran, Baluchistan, Punjab, Rajasthan, Kathiawar dan Gujerat",
      startDate: "Bermula 2,500 SM",
      kingdoms: [],
      cityHighlights: [
        { name: "Mohenjo-Daro dan Harappa", facts: ["Dua bandar terancang terkenal", "Sistem paip dan pembentungan canggih", "Dinding bata tebal sepanjang 4.8 kilometer mengelilingi Harappa", "Jalan raya selebar 30 kaki", "Rumah pelbagai saiz, ada setinggi 3 tingkat"] },
      ],
      keyFacts: [
        "Dua musim ekstrem (banjir dan kemarau) sering memusnahkan tanaman",
        "Tanaman utama: gandum, barli, kapas",
        "Perdagangan dengan selatan Mesopotamia",
        "Mula merosot menjelang 1,750 SM — punca ditemui pada 1970-an: pergerakan plat bumi (gempa bumi, banjir) dan serangan orang Aryan",
      ],
    },
    {
      name: "Tamadun Huang He",
      river: "Sungai Huang He (Sungai Kuning) dan Sungai Yangtze",
      location: "Utara China (Huang He) dan tengah China mengalir ke timur (Yangtze); 'Huang He' bermaksud Sungai Kuning kerana lumpur kekuningan yang subur",
      startDate: "Bermula kira-kira 4,000 SM",
      kingdoms: [
        { name: "Dinasti Xia", duration: "2,205 – 1,766 SM", facts: [] },
        { name: "Dinasti Shang", duration: "1,766 – 1,050 SM", facts: ["Bandar Anyang menjadi pusat kerajaan Dinasti Shang"] },
        { name: "Dinasti Zhou", duration: "1,050 – 256 SM", facts: ["Tamadun tersebar hingga selatan Sungai Yangtze"] },
      ],
      cityHighlights: [],
      keyFacts: ["Kedudukan geografi terpencil — penduduk awal hanya menghasilkan makanan sendiri, tidak berdagang dengan luar", "Aktiviti: pertanian, tembikar, pembinaan kapal, varnis, sutera, sulaman, ukiran"],
    },
  ],
  comparisonTable: [
    {
      aspect: "Pemerintahan dan Pentadbiran",
      mesopotamia: ["Negara-kota diperintah raja", "Negara-kota bersatu membentuk empayar pertama", "Kod Hammurabi (undang-undang)"],
      egypt: ["Firaun memerintah seperti kuasa tuhan", "Raja berkuasa mutlak", "Kepercayaan kehidupan selepas mati; mayat dihormati"],
      indus: ["Teraju pemerintahan dipegang golongan pendeta", "Pendeta berpengaruh dalam keagamaan dan pentadbiran"],
      huangHe: ["Sistem politik berasaskan negara-kota", "Keluarga unsur penting; pembahagian kelas sosial", "Kuasa raja datang dari syurga"],
    },
    {
      aspect: "Kegiatan Ekonomi",
      mesopotamia: ["Ekonomi ditadbir berpusat oleh golongan agama dan raja", "Kerajaan menentukan tanaman dan bilangan petani", "Pekerjaan: pegawai, petani, jurukira, hamba"],
      egypt: ["Pertanian kegiatan utama; majoriti petani", "Petani membayar sewa tanah kepada raja", "Kegiatan perdagangan wujud"],
      indus: ["Sistem ekonomi bersepadu berasaskan pertanian", "Tanaman: gandum, barli; ternakan lembu, kambing", "Tenunan kain dan kerja logam; perdagangan berkembang"],
      huangHe: ["Tumpuan pertanian sekoi dan padi", "Tanaman: gandum, barli; ternakan lembu, kambing, ayam, babi"],
    },
    {
      aspect: "Teknologi",
      mesopotamia: ["Sistem tali air", "Reka cipta gangsa, roda, sauh, bajak", "Sistem nombor berasaskan 60", "Kalendar 12 bulan", "Kertas daripada papirus"],
      egypt: ["Kemajuan matematik dan geometri", "Kemahiran perubatan", "Terusan dan pengairan", "365 hari dalam kalendar", "Penciptaan kertas"],
      indus: ["Kota dibina mengikut grid tepat", "Sistem perparitan dan pembetungan", "365 hari dalam kalendar", "Penciptaan kertas"],
      huangHe: ["Hasil cipta sutera", "Peralatan besi", "Wang syiling", "Pengangkutan jalan dan terusan", "Kompas magnetik"],
    },
    {
      aspect: "Kesenian dan Kesusasteraan",
      mesopotamia: ["Tulisan kuneiform", "Puisi", "Patung untuk mengingati pemimpin"],
      egypt: ["Tulisan hieroglif", "Lukisan dinding di tembok batu dan kawasan perkuburan"],
      indus: ["Tulisan piktograf", "Balang berukir geometri dan motif alam"],
      huangHe: ["Penulisan berasal piktograf", "Puisi romantik", "Kesenian dilukis pada tembikar"],
    },
    {
      aspect: "Binaan Bangunan dan Kemudahan",
      mesopotamia: ["Zigurat (rumah ibadat)", "Taman Tergantung Babylon"],
      egypt: ["Piramid", "Sfinks", "Tempat ibadat"],
      indus: ["Kolam mandi besar", "Kota grid tepat", "Jelapang", "Sistem paip dan pembetungan", "Dewan perhimpunan"],
      huangHe: ["Kekurangan seni bina monumen", "Bandar pertama pada zaman Dinasti Shang", "Istana dan tempat ibadat di tengah bandar"],
    },
  ],
  keyExamFacts: [
    "4 tamadun awal dunia: Mesopotamia (Tigris-Euphrates), Mesir Purba (Nil), Indus (Indus), Huang He (Huang He/Yangtze)",
    "Mesopotamia bermaksud 'tanah di antara dua sungai'; kawasan suburnya dipanggil Bulan Sabit Subur",
    "Kod Hammurabi ialah undang-undang terkenal Tamadun Mesopotamia",
    "Sungai Nil ialah sungai terpanjang di dunia (6,650 km); Mesir digelar 'Hadiah Sungai Nil' oleh Herodotus",
    "Mesir Purba mempunyai 3 tahap kerajaan: Purba, Pertengahan, Baru",
    "Mohenjo-Daro dan Harappa ialah dua bandar terancang utama Tamadun Indus",
    "Tamadun Indus merosot menjelang 1,750 SM akibat gempa bumi/banjir dan serangan Aryan",
    "3 dinasti awal China: Xia (2,205-1,766 SM), Shang (1,766-1,050 SM), Zhou (1,050-256 SM)",
    "Setiap tamadun mempunyai tulisan tersendiri: kuneiform (Mesopotamia), hieroglif (Mesir), piktograf (Indus dan Huang He)",
  ],
  keyTerms: [
    "Mesopotamia",
    "Bulan Sabit Subur",
    "Zigurat",
    "Kod Hammurabi",
    "Firaun",
    "Hieroglif",
    "Hadiah Sungai Nil",
    "Mohenjo-Daro",
    "Harappa",
    "Piktograf",
    "Kuneiform",
    "Dinasti Xia",
    "Dinasti Shang",
    "Dinasti Zhou",
    "Negara-kota",
  ],
  chapterSummary:
    "Bab 5 mengkaji empat tamadun awal dunia — Mesopotamia, Mesir Purba, Indus dan Huang He — merangkumi lokasi, kerajaan/dinasti, bandar-bandar utama, dan perbandingan sumbangan merentas 5 aspek: pemerintahan, ekonomi, teknologi, kesenian/kesusasteraan, dan binaan bangunan.",
};
