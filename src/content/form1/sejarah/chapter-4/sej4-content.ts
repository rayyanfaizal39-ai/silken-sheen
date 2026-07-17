// sej4-content.ts
// Source-verified content for Sejarah Form 1, Bab 4 — Mengenali Tamadun (Understanding Civilization)
// Sourced from T1_BT_SEJ_-_SEJARAH.pdf (pages 74-89)
// Content data only — no presentation markup.

export interface EtymologyEntry {
  language: string;
  originalTerm: string;
  meaning: string;
}

export interface PerspectiveView {
  scholar: string;
  view: string;
  work?: string;
}

export interface CharacteristicItem {
  num: number;
  name: string;
  description: string;
  examples: string[];
}

export interface Sej4Content {
  hook: { title: string; body: string };
  meaningIntro: string;
  etymology: EtymologyEntry[];
  commonGround: string;
  concept: {
    islamicView: {
      framework: string;
      ibnKhaldun: { terms: { term: string; meaning: string }[]; work: string; note: string };
      alAttas: { view: string; works: string[] };
    };
    westernView: {
      framework: string;
      toynbee: string;
    };
    summary: string;
  };
  characteristics: CharacteristicItem[];
  riverValleys: string[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

export const sej4Content: Sej4Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Sebelum mengkaji tamadun Mesopotamia, Mesir, Indus dan Huang He secara individu, kita perlu faham apa sebenarnya yang menjadikan sesuatu masyarakat 'bertamadun'. Bab ini memberikan kerangka — 9 ciri yang sama akan kita cari dalam setiap tamadun awal dunia yang dikaji seterusnya.",
  },
  meaningIntro:
    "Tamadun ditakrifkan sebagai pencapaian tertinggi oleh sesuatu masyarakat dalam pelbagai bidang — pertanian dan perdagangan, sistem pemerintahan, pembentukan bandar, pengkhususan pekerjaan, teknologi, organisasi sosial, agama dan kepercayaan, tulisan dan penyimpanan rekod, serta kesenian dan kesusasteraan.",
  etymology: [
    { language: "Bahasa Yunani", originalTerm: "Civitas", meaning: "Bandar atau kota; tahap kemajuan dalam kebudayaan, sains, industri dan sistem kerajaan" },
    { language: "Bahasa Inggeris", originalTerm: "Civilisation", meaning: "Tahap pembangunan manusia dan organisasi yang dianggap paling maju — pengetahuan, kepercayaan, seni, moral, undang-undang, adat" },
    { language: "Bahasa Arab", originalTerm: "Mudun, madain, madana (hadharah, hadari)", meaning: "Tinggi budi bahasa dan pembukaan bandar; hadharah = kawasan/bandar/kampung untuk bercucuk tanam; hadari = tanah/rumah yang didiami, tahap kemajuan" },
    { language: "Bahasa Melayu", originalTerm: "Tamadun (peradaban)", meaning: "Pencapaian kemajuan masyarakat dari segi kebendaan dan perkembangan pemikiran — sosial, budaya, politik yang tinggi" },
  ],
  commonGround: "Walaupun terdapat perbezaan maksud tamadun menurut bahasa Yunani, Inggeris, Arab dan Melayu, terdapat persamaan yang jelas — kemajuan yang dicapai oleh masyarakat untuk membina kehidupan yang lebih baik dan kompleks.",
  concept: {
    islamicView: {
      framework: "Konsep tamadun dalam Islam dibina atas kerangka Islam sebagai al-Din (cara hidup) — merangkumi pembangunan lahiriah dan rohaniah berasaskan nilai dalam al-Quran, hadis dan ajaran Nabi Muhammad SAW.",
      ibnKhaldun: {
        terms: [
          { term: "Umran", meaning: "Konsep tamadun yang diperkenalkan Ibn Khaldun" },
          { term: "Hadharah", meaning: "Prinsip-prinsip nilai meliputi akidah, syarak, akhlak, falsafah, kebudayaan dan peradaban" },
          { term: "Madaniyyah", meaning: "Menjurus kepada aspek kebendaan dalam kehidupan, bersifat umum kepada semua manusia" },
        ],
        work: "Muqaddimah",
        note: "Ibn Khaldun merupakan sarjana sejarah pertama yang membincangkan peraturan pemerintahan berkaitan kebangkitan dan kejatuhan sesebuah tamadun. Beliau pernah menjadi hakim dan ahli akademik di Universiti Al-Azhar, Mesir.",
      },
      alAttas: {
        view: "Tamadun ialah keadaan kehidupan insan bermasyarakat yang telah mencapai taraf kehalusan tatasusila dan kebudayaan yang luhur bagi seluruh masyarakatnya.",
        works: ["Islam dalam Sejarah dan Kebudayaan Melayu", "Historical Fact and Fiction"],
      },
    },
    westernView: {
      framework: "Dalam tradisi Barat, 'civilisation' menggambarkan tahap masyarakat atau budaya yang kompleks — diukur melalui pencapaian ilmu dan teknologi, ekonomi, struktur politik, kemasyarakatan dan petempatan di kawasan perbandaran.",
      toynbee: "Arnold J. Toynbee menjelaskan tamadun sebagai suatu sistem masyarakat yang memperkasakan sistem politik, ekonomi, sosial serta kesenian dan kebudayaan.",
    },
    summary: "Konsep tamadun meliputi semua pencapaian kehidupan masyarakat dalam bidang sosial dan budaya serta pemikiran.",
  },
  characteristics: [
    { num: 1, name: "Pertanian dan Perdagangan", description: "Kehidupan berkembang apabila terdapat kegiatan pertanian — peralatan, saliran, kincir angin, teres di tanah tinggi. Ini mewujudkan perdagangan tempatan dan perdagangan jarak jauh.", examples: ["Perdagangan antara Sumer dan Mesir", "Perdagangan antara Sumer dan Mohenjo-Daro"] },
    { num: 2, name: "Sistem Pemerintahan", description: "Kerajaan dibentuk untuk mengurus pemerintahan kota. Peringkat awal diketuai pendeta, kemudian raja mengambil alih, dibantu pegawai bangsawan dan pendeta. Undang-undang dibentuk untuk melicinkan pentadbiran.", examples: [] },
    { num: 3, name: "Pembentukan Bandar", description: "Petempatan kekal bermula dengan kampung, berkembang menjadi bandar apabila penduduk bertambah. Bandar pertama dibina 4,000 SM.", examples: ["Ur dan Uruk (Sungai Tigris-Euphrates)", "Memphis (Sungai Nil)", "Mohenjo-Daro (Sungai Indus)", "Anyang (Sungai Huang He)"] },
    { num: 4, name: "Pengkhususan Pekerjaan", description: "Perkembangan bandar mewujudkan peluang pekerjaan baharu — pengutip cukai, jurutera pengairan, tentera, petani, pentadbir. Golongan artisan mengukir, menempa besi dan tembikar.", examples: [] },
    { num: 5, name: "Teknologi", description: "Kemahiran teknologi menghasilkan barangan, monumen dan pertukangan. Penggunaan logam tembaga, gangsa, besi menghasilkan bajak; penciptaan roda membantu pengangkutan.", examples: ["Taman Tergantung Babylon (Mesopotamia)", "Piramid dan sfinks (Mesir Purba)", "Negara-kota Mohenjo-Daro (Indus)"] },
    { num: 6, name: "Organisasi Sosial", description: "Kemunculan institusi dan golongan pekerja mewujudkan kelas sosial berasaskan pekerjaan, kekayaan dan pengaruh.", examples: ["Firaun tertinggi → Wazir/pegawai kanan/golongan agama/bangsawan → Golongan penyalin/penulis → Artisan berkemahiran/karyawan → Petani dan buruh → Pembantu rumah dan hamba (paling rendah)"] },
    { num: 7, name: "Agama dan Kepercayaan", description: "Masyarakat mempercayai banyak tuhan (bulan, matahari, ibu, sungai). Institusi agama mengurus upacara keagamaan. Tempat ibadat besar dibina untuk menghormati tuhan.", examples: ["Kepercayaan kehidupan selepas kematian di Mesir"] },
    { num: 8, name: "Tulisan dan Penyimpanan Rekod", description: "Sistem tulisan lahir kira-kira 5,000 tahun lalu — membezakan Zaman Prasejarah dan sejarah. Tulisan pertama menggunakan sistem piktograf (simbol gambar).", examples: ["Tulisan kuneiform (Mesopotamia)", "Tulisan Dinasti Shang pada tulang haiwan"] },
    { num: 9, name: "Kesenian dan Kesusasteraan", description: "Hasil sastera dan seni bina yang mengagumkan, menggambarkan budaya tamadun masing-masing — patung dan lukisan tuhan, pahlawan, pemerintah.", examples: ["Patung tembaga", "Ukiran halus pada gelas"] },
  ],
  riverValleys: ["Lembah Sungai Tigris dan Euphrates", "Sungai Nil", "Sungai Indus", "Sungai Huang He"],
  keyExamFacts: [
    "Tamadun ditakrifkan sebagai pencapaian tertinggi oleh masyarakat dalam pelbagai bidang",
    "Perkataan tamadun berasal daripada bahasa Yunani 'civitas' (bandar/kota)",
    "Ibn Khaldun memperkenalkan konsep 'umran' dan 'hadharah' dalam bukunya Muqaddimah",
    "Arnold J. Toynbee (pandangan Barat) menjelaskan tamadun sebagai sistem politik, ekonomi, sosial, kesenian dan kebudayaan",
    "Tamadun awal dunia lahir di lembah sungai: Tigris-Euphrates, Nil, Indus, Huang He",
    "9 ciri tamadun awal dunia: pertanian/perdagangan, sistem pemerintahan, pembentukan bandar, pengkhususan pekerjaan, teknologi, organisasi sosial, agama/kepercayaan, tulisan/rekod, kesenian/kesusasteraan",
    "Bandar pertama dibina pada tahun 4,000 SM",
    "Sistem tulisan lahir kira-kira 5,000 tahun lalu, menggunakan sistem piktograf",
  ],
  keyTerms: [
    "Tamadun",
    "Civitas",
    "Civilisation",
    "Hadharah",
    "Hadari",
    "Umran",
    "Madaniyyah",
    "Al-Din",
    "Negara-kota",
    "Artisan",
    "Piktograf",
    "Kuneiform",
    "Pengkhususan pekerjaan",
  ],
  chapterSummary:
    "Bab 4 menerangkan maksud tamadun mengikut bahasa Yunani, Inggeris, Arab dan Melayu, konsep tamadun daripada pandangan Islam (Ibn Khaldun, Al-Attas) dan Barat (Toynbee), serta 9 ciri tamadun awal dunia yang lahir di lembah sungai utama — pertanian/perdagangan, pemerintahan, pembentukan bandar, pengkhususan pekerjaan, teknologi, organisasi sosial, agama, tulisan, dan kesenian.",
};
