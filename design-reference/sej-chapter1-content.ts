// sej-chapter1-content.ts
// Source-verified content for Sejarah Form 1, Bab 1 — Mengenali Sejarah
// Sourced from T1_BT_SEJ_-_SEJARAH.pdf (pages 2-20)
// Content data only — no presentation markup.

export interface EtymologyEntry {
  language: string;
  origin: string;
  meaning: string;
}

export interface HistorianDefinition {
  name: string;
  quote: string;
  work: string;
}

export interface SourceCategory {
  type: 'primer' | 'sekunder';
  definition: string;
  characteristics: string[];
  examples: string[];
}

export interface ResearchMethod {
  name: string;
  description: string;
  steps: string[];
}

export interface ImportanceReason {
  reason: string;
  description: string;
}

export interface Sej1Content {
  hook: { title: string; body: string };
  definition: {
    general: string;
    etymology: EtymologyEntry[];
  };
  historianViews: HistorianDefinition[];
  timeAndSpace: {
    chronologyDefinition: string;
    timeUnits: { unit: string; duration: string }[];
    eraSystem: string;
    spaceThemes: string[];
  };
  sources: {
    intro: string;
    categories: SourceCategory[];
    realExamples: { name: string; location: string; significance: string }[];
  };
  researchMethods: ResearchMethod[];
  interpretation: {
    definition: string;
    reasonsForDifference: string[];
    importance: string[];
    example: { event: string; localView: string; westernView: string };
  };
  importanceOfHistory: ImportanceReason[];
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const sej1Content: Sej1Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Sebelum mengkaji tamadun purba atau peristiwa besar dunia, kita perlu faham asas sejarah itu sendiri — apa itu sejarah, bagaimana sejarawan mengetahui apa yang berlaku, dan kenapa dua orang boleh mentafsir peristiwa yang sama secara berbeza. Bab ini meletakkan asas untuk kesemua bab seterusnya."
  },
  definition: {
    general: "Secara umumnya, sejarah ialah peristiwa yang berlaku pada masa lalu. Peristiwa masa lalu yang berlaku dalam kehidupan sesebuah masyarakat atau negara akan dikaji oleh sejarawan.",
    etymology: [
      { language: "Bahasa Melayu", origin: "Perkataan Arab 'syajaratun'", meaning: "Bermaksud pokok; turut dikaitkan dengan salasilah, riwayat, keturunan dan asal usul" },
      { language: "Kamus Dewan", origin: "Definisi rasmi", meaning: "Asal usul (keturunan), salasilah; peristiwa yang benar-benar berlaku pada waktu lampau; kajian tentang peristiwa yang telah lalu" },
      { language: "Bahasa Inggeris", origin: "'History', daripada bahasa Yunani 'historia'", meaning: "Bermaksud cerita tentang seseorang; 'historia' bermaksud penyelidikan" }
    ]
  },
  historianViews: [
    { name: "Herodotus", quote: "Penceritaan tentang tindakan manusia yang penting dan mengagumkan serta sebab berlakunya sesuatu peristiwa.", work: "Histories (Sejarah Perang Parsi)" },
    { name: "E.H. Carr", quote: "Suatu proses interaksi berterusan antara ahli sejarah dengan fakta-faktanya, suatu dialog yang tidak berkesudahan antara masa kini dengan masa lampau.", work: "What is History?" },
    { name: "Ibn Khaldun", quote: "Sejarah membicarakan perkara tentang masyarakat manusia, peradaban dunia dan perubahan-perubahan yang berlaku pada sifat-sifat masyarakat itu.", work: "Muqaddimah" },
    { name: "Khoo Kay Kim", quote: "Sejarah merujuk kepada apa-apa yang pernah atau sudah berlaku. Sejarah mendorong kita lebih memahami apa-apa yang berlaku pada masa kini... Sejarah ialah ibu kepada semua bidang.", work: "Sejarawan tempatan tersohor Malaysia" }
  ],
  timeAndSpace: {
    chronologyDefinition: "Masa silam dikaji berdasarkan urutan masa yang dinamakan kronologi — rentetan peristiwa yang berlaku secara teratur mengikut urutan masa dari awal hingga terakhir, bergerak mengikut satu garis lurus.",
    timeUnits: [
      { unit: "Dekad", duration: "10 tahun" },
      { unit: "Abad", duration: "100 tahun" },
      { unit: "Alaf", duration: "1000 tahun" }
    ],
    eraSystem: "Konsep masa turut diukur mengikut zaman: Sebelum Masihi (SM) dan Masihi (M). Zaman Masihi bermula dengan kelahiran Nabi Isa AS.",
    spaceThemes: ["Politik", "Ekonomi", "Sosial"]
  },
  sources: {
    intro: "Sumber sejarah terbahagi kepada dua, iaitu sumber primer dan sumber sekunder.",
    categories: [
      {
        type: "primer",
        definition: "Sumber yang belum diolah atau diterbitkan, bersifat asli dan belum ditafsir",
        characteristics: ["Belum diolah atau diterbitkan", "Bersifat asli", "Belum ditafsir"],
        examples: ["Fosil", "Artifak", "Bukan artifak", "Batu bersurat", "Keterangan lisan", "Dokumen rasmi", "Manuskrip", "Fail rasmi jabatan", "Surat peribadi", "Diari"]
      },
      {
        type: "sekunder",
        definition: "Bahan yang telah diolah dan diterbitkan, tersebar kepada umum",
        characteristics: ["Telah diolah dan diterbitkan", "Bahan tersebar kepada umum"],
        examples: ["Buku", "Akhbar", "Majalah", "Jurnal", "Ensiklopedia", "Risalah"]
      }
    ],
    realExamples: [
      { name: "Loceng Gangsa", location: "Kampung Pencu, Muar, Johor", significance: "Dihasilkan sekitar 150 Masihi — sumber untuk melihat hubungan perdagangan dengan kerajaan Funan" },
      { name: "Candi Lembah Bujang", location: "Kedah", significance: "Menunjukkan pengaruh Hindu dan Buddha serta hubungan perdagangan antara India dengan Kedah" },
      { name: "Batu Bersurat Terengganu", location: "Terengganu", significance: "Bertarikh 702 Hijrah (1303 Masihi) — bukti agama Islam sudah bertapak di negara kita lebih awal dari tarikh ini" }
    ]
  },
  researchMethods: [
    {
      name: "Kaedah Bertulis",
      description: "Kajian terhadap sesuatu peristiwa daripada maklumat pada sumber yang dipahat atau ditulis",
      steps: [
        "Mengenal pasti sumber bagi sesuatu peristiwa, tokoh atau institusi",
        "Mendapat dan mengesahkan sumber bertulis tersebut (di muzium, arkib atau perpustakaan)",
        "Mengumpul dan menyimpan sumber yang diperoleh",
        "Menggunakan peralatan yang sesuai (teknologi maklumat dan komunikasi)",
        "Menganalisis dan memberikan perspektif baharu terhadap peristiwa sejarah"
      ]
    },
    {
      name: "Kaedah Lisan",
      description: "Proses mendapatkan maklumat melalui temu bual dengan orang sumber",
      steps: [
        "Tahap Pertama (Persediaan): menentukan tokoh, skop, dan soalan",
        "Tahap Kedua (Rakaman temu bual): membuat persediaan lengkap dan meyakinkan tokoh untuk bekerjasama",
        "Tahap Ketiga (Memproses rakaman): menyalin, menilai fakta dengan sumber bertulis, dan menyimpan rakaman"
      ]
    },
    {
      name: "Kaedah Arkeologi",
      description: "Kaedah saintifik untuk mencari maklumat sejarah daripada bahan tinggalan sejarah melalui ekskavasi",
      steps: [
        "Perancangan grid sebelum kerja ekskavasi — setiap petak diberi nombor rujukan",
        "Menandakan kawasan berdasarkan pelan",
        "Ekskavasi dengan mencatatkan semua penemuan",
        "Pemunggahan dan pengisihan artifak di makmal",
        "Pembersihan sebelum dikaji",
        "Pengkatalogan setiap artifak dengan nombor pengenalan",
        "Penganalisisan untuk mendapatkan maklumat tentang artifak"
      ]
    }
  ],
  interpretation: {
    definition: "Tafsiran dalam sejarah bererti menerangkan atau mengulas sesuatu fakta sejarah berdasarkan sumber-sumber yang berkaitan dengannya.",
    reasonsForDifference: ["Pemilihan sumber yang pelbagai", "Perbezaan pandangan", "Perbezaan ideologi", "Tujuan penulisan"],
    importance: [
      "Menggalakkan kita menggunakan pelbagai sumber dalam penulisan bagi menghasilkan kajian yang mempunyai bukti kukuh",
      "Mengajak kita menilai peristiwa yang sama dari sudut yang berbeza",
      "Mendorong kita berfikiran terbuka dan kritis dalam mengkaji peristiwa"
    ],
    example: {
      event: "Penentangan Haji Mat Hasan bin Munas (Tok Janggut) di Pasir Puteh, Kelantan",
      localView: "Pengkaji tempatan melihat faktor kebangkitan beliau disebabkan penentangan peraturan cukai tanah dan hasil hutan yang diperkenalkan British",
      westernView: "Bagi pengkaji Barat, kebangkitan Tok Janggut dianggap sebagai pemberontakan"
    }
  },
  importanceOfHistory: [
    { reason: "Mengenal Asal Usul", description: "Dapat mengenal asal usul keluarga dan negara, memahami adat istiadat, tradisi dan budaya bangsa" },
    { reason: "Mengambil Iktibar", description: "Membawa pengajaran daripada peristiwa lalu agar tidak mengulangi kesilapan yang sama (contoh: Peristiwa Darurat 1948-1960)" },
    { reason: "Memupuk Patriotisme", description: "Mengajar kita menghargai warisan negara, menyemai rasa cinta akan negara dan semangat patriotik" },
    { reason: "Mengukuhkan Perpaduan", description: "Meneruskan kesinambungan hubungan harmoni antara kaum, menjaga adat resam dan tradisi" },
    { reason: "Membangunkan Negara dan Bangsa", description: "Mengekalkan kegemilangan yang dicapai negara, membandingkan budaya dahulu dan kini untuk pembangunan masa depan" },
    { reason: "Mengaplikasikan Kemahiran Pemikiran Sejarah", description: "Meningkatkan pemikiran kritis dan analitis, membuat tafsiran, dan memahami peristiwa secara lebih empati" }
  ],
  keyExamFacts: [
    "Sejarah berasal daripada perkataan Arab 'syajaratun' (pokok); dalam bahasa Inggeris berasal daripada bahasa Yunani 'historia' (penyelidikan)",
    "Herodotus, E.H. Carr, Ibn Khaldun dan Khoo Kay Kim masing-masing mempunyai definisi sejarah tersendiri",
    "Kronologi ialah urutan masa; unit masa termasuk dekad (10 tahun), abad (100 tahun), alaf (1000 tahun)",
    "Sumber sejarah terbahagi kepada primer (asli, belum ditafsir) dan sekunder (telah diolah dan diterbitkan)",
    "3 kaedah penyelidikan sejarah: kaedah bertulis, kaedah lisan, kaedah arkeologi",
    "Tafsiran sejarah boleh berbeza kerana pemilihan sumber, pandangan, ideologi, dan tujuan penulisan yang berbeza",
    "6 kepentingan mempelajari sejarah: mengenal asal usul, mengambil iktibar, memupuk patriotisme, mengukuhkan perpaduan, membangunkan negara dan bangsa, mengaplikasikan kemahiran pemikiran sejarah"
  ],
  keyTerms: [
    "Sejarah", "Sejarawan", "Kronologi", "Dekad", "Abad", "Alaf", "Sebelum Masihi (SM)", "Masihi (M)",
    "Sumber primer", "Sumber sekunder", "Artifak", "Ekskavasi", "Paleografi", "Epigrafi",
    "Kaedah bertulis", "Kaedah lisan", "Kaedah arkeologi", "Tafsiran", "Empati", "Patriotisme"
  ],
  chapterSummary: "Bab 1 memperkenalkan pengertian sejarah dari pelbagai bahasa dan pandangan sejarawan (Herodotus, E.H. Carr, Ibn Khaldun, Khoo Kay Kim), konsep masa silam dan ruang (kronologi, dekad/abad/alaf, SM/Masihi), sumber sejarah primer dan sekunder, tiga kaedah penyelidikan sejarah (bertulis, lisan, arkeologi), tafsiran dalam sejarah dan sebab kewujudan perbezaan tafsiran, serta enam kepentingan mempelajari sejarah."
};

export default sej1Content;
