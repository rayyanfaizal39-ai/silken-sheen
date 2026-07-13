// ─── BM Form 1 — Full Subject Structure ──────────────────────────────────────
// All content is placeholder. Replace with real content topic-by-topic.

export type BMTopicType =
  | "tatabahasa"
  | "komsas"
  | "novel"
  | "ringkasan"
  | "ringkasan-premium"
  | "rangka-ringkasan"
  | "karangan-pendek"
  | "respons-terbuka"
  | "workshop"
  | "model-karangan"
  | "peribahasa-bank"
  | "essay-improvement"
  | "penanda-wacana-lengkap";

export interface BMSubtype {
  name: string;
  description: string;
  examples: string[];
}

export interface BMWatak {
  nama: string;
  peranan: string;
  perwatakan: string[];
}

export interface BMFormula {
  part: string;
  formula: string;
  example: string;
}

export interface BMPeribahasa {
  text: string;
  maksud: string;
  contohAyat: string;
  topikSesuai: string[];
}

export interface BMBeforeAfter {
  lemah: string;
  cemerlang: string;
  tip: string;
}

export interface BMKosaKata {
  biasa: string;
  menarik: string;
}

export interface BMTopic {
  id: string;
  label: string;
  topicType: BMTopicType;
  badge?: string;
  // Tatabahasa
  definition?: string;
  subtypes?: BMSubtype[];
  exampleRows?: { category: string; examples: string[] }[];
  commonMistakes?: string[];
  uasaTips?: string[];
  description?: string;
  steps?: string[];
  keyPoints?: string[];
  // KOMSAS
  genre?: string;
  sinopsis?: string;
  tema?: string;
  persoalan?: string[];
  nilai?: string[];
  pengajaran?: string[];
  gayaBahasa?: string[];
  // Novel
  zon?: string;
  penulis?: string;
  watak?: BMWatak[];
  // Ringkasan
  formula?: string[];
  // Karangan
  formulae?: BMFormula[];
  ideaBank?: string[];
  pendahuluan?: string;
  isi?: string[];
  penutup?: string;
  peribahasa?: string[];
  // Model karangan
  keyFeatures?: string[];
  // Peribahasa bank
  peribuhasaItems?: BMPeribahasa[];
  // Essay improvement
  beforeAfter?: BMBeforeAfter[];
  kosaKata?: BMKosaKata[];
  mistakes?: string[];
}

export interface BMHub {
  id: string;
  label: string;
  shortLabel: string;
  icon: string;
  color: string;
  bgGradient: string;
  borderColor: string;
  description: string;
  topics: BMTopic[];
}

export interface BMKertas {
  id: "k1" | "k2";
  label: string;
  shortLabel: string;
  icon: string;
  description: string;
  examDetails: string;
  color: string;
  gradient: string;
  hubs: BMHub[];
}

// ─── KERTAS 1 ─────────────────────────────────────────────────────────────────

const SISTEM_BAHASA_TOPICS: BMTopic[] = [
  {
    id: "kata-nama",
    label: "Kata Nama",
    topicType: "tatabahasa",
    badge: "Tatabahasa",
    definition:
      "Kata nama ialah perkataan yang merujuk kepada nama orang, haiwan, benda, tempat, atau konsep abstrak.",
    subtypes: [
      {
        name: "Kata Nama Am",
        description: "Nama umum yang tidak perlu huruf besar.",
        examples: ["meja", "buku", "sekolah", "murid", "pokok"],
      },
      {
        name: "Kata Nama Khas",
        description: "Nama khusus — huruf pertama mesti besar.",
        examples: ["Ali", "Kuala Lumpur", "Sungai Pahang", "Hari Raya"],
      },
      {
        name: "Kata Ganti Nama",
        description: "Menggantikan kata nama seseorang atau benda.",
        examples: ["saya", "kami", "mereka", "dia", "ini", "itu"],
      },
    ],
    commonMistakes: [
      "Menulis kata nama khas dengan huruf kecil (contoh: 'ali' bukan 'Ali')",
      "Keliru antara 'kami' (tidak termasuk pendengar) dan 'kita' (termasuk pendengar)",
      "Menggunakan kata ganti nama tanya sebagai kata ganti nama diri",
    ],
    uasaTips: [
      "Cari perkataan selepas artikel 'seorang', 'sebuah', 'seekor' — itulah kata nama",
      "Kata nama khas boleh dikenal pasti dengan huruf besar di tengah ayat",
      "Soalan lazim: Kenal pasti jenis kata nama dan beri contoh ayat",
    ],
  },
  {
    id: "kata-adjektif",
    label: "Kata Adjektif",
    topicType: "tatabahasa",
    badge: "Tatabahasa",
    definition:
      "Kata adjektif ialah perkataan yang menerangkan sifat, keadaan, atau ciri-ciri sesuatu kata nama.",
    subtypes: [
      {
        name: "Sifatan",
        description: "Menerangkan sifat fizikal atau perasaan.",
        examples: ["cantik", "tinggi", "marah", "sedih"],
      },
      {
        name: "Ukuran",
        description: "Menerangkan saiz atau jarak.",
        examples: ["besar", "kecil", "panjang", "pendek"],
      },
      {
        name: "Warna",
        description: "Menerangkan warna sesuatu benda.",
        examples: ["merah", "biru", "hijau", "hitam"],
      },
      {
        name: "Cara",
        description: "Menerangkan cara atau gaya.",
        examples: ["laju", "perlahan", "cermat", "berhati-hati"],
      },
    ],
    commonMistakes: [
      "Meletakkan kata adjektif sebelum kata nama (BM: 'budak pandai' bukan 'pandai budak')",
      "Keliru antara kata adjektif dan kata kerja (contoh: 'berlari' vs 'laju')",
    ],
    uasaTips: [
      "Kata adjektif biasanya muncul selepas kata nama: 'budak itu rajin'",
      "Boleh diuji dengan menambah 'sangat' atau 'amat' di hadapannya",
      "Soalan lazim: Garis bawahi kata adjektif dalam petikan",
    ],
  },
  {
    id: "kata-tugas",
    label: "Kata Tugas",
    topicType: "tatabahasa",
    badge: "Tatabahasa",
    definition:
      "Kata tugas ialah kata yang tidak berfungsi sebagai inti frasa tetapi menjalankan tugas nahu tertentu dalam ayat.",
    subtypes: [
      {
        name: "Kata Penyambung Ayat",
        description: "Menyambung dua klausa.",
        examples: ["dan", "atau", "tetapi", "kerana", "supaya"],
      },
      {
        name: "Kata Sendi Nama",
        description: "Mendahului frasa nama.",
        examples: ["di", "ke", "dari", "daripada", "kepada"],
      },
      {
        name: "Kata Bantu",
        description: "Membantu predikat.",
        examples: ["akan", "telah", "sedang", "boleh", "mesti"],
      },
      {
        name: "Kata Tanya",
        description: "Membentuk soalan.",
        examples: ["apa", "siapa", "bila", "di mana", "mengapa"],
      },
    ],
    commonMistakes: [
      "Keliru antara 'di' (kata sendi) dan 'di-' (imbuhan): 'di sekolah' vs 'diambil'",
      "Salah guna 'daripada' (membandingkan orang/abstrak) vs 'dari' (asal tempat)",
    ],
    uasaTips: [
      "Hafal perbezaan 'di' kata sendi (tulis berasingan) vs 'di-' imbuhan (tulis serangkai)",
      "'Daripada' = dari + sumber/abstrak; 'Dari' = dari + tempat",
    ],
  },
  {
    id: "kata-kerja-tak-transitif",
    label: "Kata Kerja Tak Transitif",
    topicType: "tatabahasa",
    badge: "Tatabahasa",
    definition:
      "Kata kerja tak transitif ialah kata kerja yang tidak memerlukan objek untuk melengkapkan maknanya.",
    subtypes: [
      {
        name: "Tanpa Pelengkap",
        description: "Bermakna dengan sendiri.",
        examples: ["tidur", "berlari", "menangis", "terbang"],
      },
      {
        name: "Dengan Pelengkap",
        description: "Memerlukan unsur penerang.",
        examples: ["berjalan ke sekolah", "tinggal di sini"],
      },
    ],
    commonMistakes: [
      "Menambah objek selepas kata kerja tak transitif (contoh: 'tidur katil' adalah salah)",
      "Keliru antara kata kerja transitif dan tak transitif",
    ],
    uasaTips: [
      "Tanya: 'Siapa/apa yang di-kerja?' Jika tiada jawapan, kata kerja itu tak transitif",
      "Kebanyakan kata kerja dengan awalan 'ber-' adalah tak transitif",
    ],
  },
  {
    id: "kata-ganda",
    label: "Kata Ganda",
    topicType: "tatabahasa",
    badge: "Tatabahasa",
    definition:
      "Kata ganda ialah proses menggandakan kata dasar untuk menghasilkan makna tertentu.",
    subtypes: [
      {
        name: "Kata Ganda Penuh",
        description: "Ulang kata dasar sepenuhnya.",
        examples: ["kanak-kanak", "sayur-sayuran", "buah-buahan"],
      },
      {
        name: "Kata Ganda Separa",
        description: "Gandakan suku pertama sahaja.",
        examples: ["lelaki", "tetamu", "pepohon", "sesisir"],
      },
      {
        name: "Kata Ganda Berentak",
        description: "Gandakan dengan perubahan bunyi.",
        examples: ["selok-belok", "ramah-tamah", "lauk-pauk"],
      },
    ],
    commonMistakes: [
      "Menggunakan kata ganda untuk bermaksud banyak (dalam BM formal, 'buku-buku' ≠ sekadar banyak buku)",
      "Salah ejaan tanda sempang: 'kanak kanak' (salah), 'kanak-kanak' (betul)",
    ],
    uasaTips: [
      "Kata ganda dalam ayat rasmi perlu tanda sempang (-)",
      "Kata ganda penuh lazimnya bermaksud jamak atau berbagai jenis",
    ],
  },
  {
    id: "pola-ayat-inti",
    label: "Pola Ayat Inti",
    topicType: "tatabahasa",
    badge: "Tatabahasa",
    definition:
      "Pola ayat inti ialah ayat mudah yang terdiri daripada subjek dan predikat tanpa unsur keterangan.",
    subtypes: [
      {
        name: "FN + FN",
        description: "Frasa nama + frasa nama.",
        examples: ["Ali murid", "Dia doktor"],
      },
      {
        name: "FN + FK",
        description: "Frasa nama + frasa kerja.",
        examples: ["Ali berlari", "Mereka membaca buku"],
      },
      {
        name: "FN + FA",
        description: "Frasa nama + frasa adjektif.",
        examples: ["Bunga itu cantik", "Budak ini pandai"],
      },
      {
        name: "FN + FS",
        description: "Frasa nama + frasa sendi.",
        examples: ["Buku itu di meja", "Mereka dari Johor"],
      },
    ],
    commonMistakes: [
      "Mengelirukan subjek dan predikat dalam ayat",
      "Menambah keterangan dan mendakwa itu masih pola ayat inti",
    ],
    uasaTips: [
      "Ayat inti tidak ada keterangan — hapus semua keterangan untuk mendapat pola inti",
      "Soalan lazim: 'Tulis semula ayat berikut dalam pola ayat inti'",
    ],
  },
  {
    id: "kesalahan-ayat",
    label: "Kesalahan Ayat",
    topicType: "tatabahasa",
    badge: "Tatabahasa",
    definition:
      "Kesalahan ayat merujuk kepada penggunaan bahasa yang menyimpang daripada tatabahasa Bahasa Melayu baku.",
    subtypes: [
      {
        name: "Kesalahan Ejaan",
        description: "Perkataan ditulis dengan cara yang salah.",
        examples: ["'saye' (salah) → 'saya' (betul)", "'perlu' vs 'perlu'"],
      },
      {
        name: "Kesalahan Tanda Baca",
        description: "Penggunaan tanda baca yang tidak tepat.",
        examples: ["Tiada koma sebelum 'tetapi'", "Tiada titik di hujung ayat"],
      },
      {
        name: "Pengaruh Bahasa Lain",
        description: "Ayat yang dipengaruhi struktur bahasa asing.",
        examples: ["'Dia ada pergi' (bahasa pasar) → 'Dia telah pergi'"],
      },
    ],
    commonMistakes: [
      "Menggunakan kata 'sangat' dua kali: 'sangat cantik sekali'",
      "Ayat tidak lengkap — tiada subjek atau predikat",
      "Pengulangan makna: 'naik ke atas', 'turun ke bawah'",
    ],
    uasaTips: [
      "Semak setiap ayat: ada subjek? ada predikat? tanda baca betul?",
      "Soalan lazim: 'Betulkan ayat-ayat berikut'",
    ],
  },
  {
    id: "peribahasa-asas",
    label: "Peribahasa Asas",
    topicType: "tatabahasa",
    badge: "Tatabahasa",
    definition:
      "Peribahasa ialah ungkapan kata-kata yang mempunyai makna kiasan atau tersirat, biasanya dalam bentuk simpulan bahasa, pepatah, atau perumpamaan.",
    subtypes: [
      {
        name: "Simpulan Bahasa",
        description: "Gabungan dua perkataan atau lebih dengan makna kiasan.",
        examples: [
          "naik angin (marah)",
          "buah tangan (hadiah)",
          "kaki bangku (tidak pandai bersukan)",
        ],
      },
      {
        name: "Pepatah",
        description: "Ayat pendek yang mengandungi pengajaran.",
        examples: ["Sediakan payung sebelum hujan", "Bersatu teguh, bercerai roboh"],
      },
      {
        name: "Perumpamaan",
        description: "Membandingkan sesuatu menggunakan kata 'seperti' atau 'bagai'.",
        examples: ["Seperti aur dengan tebing", "Bagai pungguk rindukan bulan"],
      },
    ],
    commonMistakes: [
      "Menyalah tafsir makna peribahasa secara literal",
      "Menggunakan peribahasa yang tidak sesuai dengan konteks",
    ],
    uasaTips: [
      "Hafal sekurang-kurangnya 10 peribahasa beserta maksudnya",
      "Untuk karangan, gunakan peribahasa sebagai penutup atau sokong hujah",
    ],
  },
];

const KOMSAS_TOPICS: BMTopic[] = [
  {
    id: "pantun-dua-kerat",
    label: "Pantun Dua Kerat (Nasihat)",
    topicType: "komsas",
    badge: "Pantun",
    genre: "Pantun",
    sinopsis:
      "Pantun dua kerat mengandungi dua baris — satu baris pembayang dan satu baris maksud.",
    tema: "Kecekalan hati dan semangat dalam kehidupan seharian.",
    persoalan: ["Persoalan kegigihan dalam mencapai kejayaan", "Persoalan kepentingan akal budi"],
    nilai: ["Ketekunan", "Kesabaran", "Semangat juang"],
    pengajaran: [
      "Kita perlu berusaha gigih untuk mencapai matlamat",
      "Akal dan budi perlu digunakan dengan bijak",
    ],
    gayaBahasa: ["Personifikasi", "Metafora", "Simile"],
  },
  {
    id: "syair-pohon-buluh",
    label: "Syair Pohon Buluh",
    topicType: "komsas",
    badge: "Syair",
    genre: "Syair",
    sinopsis:
      "Syair ini menggunakan pohon buluh sebagai simbolisme untuk menyampaikan mesej tentang kehidupan dan ketabahan.",
    tema: "Ketabahan dalam menghadapi cabaran hidup.",
    persoalan: ["Persoalan ketabahan menghadapi dugaan", "Persoalan kekuatan dalaman manusia"],
    nilai: ["Ketabahan", "Keberanian", "Keyakinan diri"],
    pengajaran: [
      "Seperti buluh yang lentur tapi tidak patah, manusia perlu tabah menghadapi cabaran",
      "Kekuatan bukan pada bentuk fizikal tetapi pada hati",
    ],
    gayaBahasa: ["Alegori", "Personifikasi", "Hiperbola"],
  },
  {
    id: "sajak-kita-umpama",
    label: "Sajak: Kita Umpama Sehelai Daun",
    topicType: "komsas",
    badge: "Sajak",
    genre: "Sajak",
    sinopsis:
      "Sajak ini mengumpamakan manusia seperti sehelai daun yang bergantung pada alam dan kodrat.",
    tema: "Kehidupan manusia yang terikat dengan alam dan ketentuan Ilahi.",
    persoalan: ["Persoalan hubungan manusia dengan alam", "Persoalan ketentuan hidup dan mati"],
    nilai: ["Kesyukuran", "Kerendahan hati", "Rasa hormat terhadap alam"],
    pengajaran: [
      "Manusia perlu mensyukuri nikmat hidup yang dikurniakan",
      "Alam perlu dijaga dan dihargai sebagai amanah",
    ],
    gayaBahasa: ["Simile (umpama sehelai daun)", "Personifikasi", "Lambang"],
  },
  {
    id: "sajak-kuingin",
    label: "Sajak: Kuingin Berterima Kasih",
    topicType: "komsas",
    badge: "Sajak",
    genre: "Sajak",
    sinopsis:
      "Sajak ungkapan rasa syukur dan terima kasih kepada mereka yang berjasa dalam kehidupan.",
    tema: "Rasa syukur dan penghargaan terhadap jasa orang lain.",
    persoalan: ["Persoalan penghargaan terhadap ibu bapa dan guru", "Persoalan hutang budi"],
    nilai: ["Rasa syukur", "Mengenang jasa", "Taat kepada ibu bapa"],
    pengajaran: [
      "Kita wajib berterima kasih kepada mereka yang berjasa",
      "Jangan lupa membalas budi orang yang telah membantu kita",
    ],
    gayaBahasa: ["Enjambmen", "Anafora", "Aliterasi"],
  },
  {
    id: "sajak-aku",
    label: "Sajak: Aku",
    topicType: "komsas",
    badge: "Sajak",
    genre: "Sajak",
    sinopsis:
      "Sajak 'Aku' karya Chairil Anwar — ekspresi jiwa yang bebas, berani, dan penuh semangat.",
    tema: "Kebebasan jiwa dan semangat hidup yang membara.",
    persoalan: ["Persoalan kebebasan berfikir", "Persoalan semangat untuk terus berjuang"],
    nilai: ["Keberanian", "Kebebasan", "Semangat hidup"],
    pengajaran: [
      "Manusia perlu berani menghadapi cabaran dengan penuh semangat",
      "Jiwa yang bebas adalah jiwa yang tidak tunduk pada tekanan",
    ],
    gayaBahasa: ["Bahasa bertenaga", "Diksi yang kuat", "Ayat-ayat pendek dan padat"],
  },
  {
    id: "sajak-kunci-bahasa",
    label: "Sajak: Kunci Bahasa",
    topicType: "komsas",
    badge: "Sajak",
    genre: "Sajak",
    sinopsis:
      "Sajak ini memuliakan bahasa sebagai kunci kepada ilmu, identiti, dan peradaban bangsa.",
    tema: "Kepentingan bahasa dalam membentuk jati diri dan peradaban bangsa.",
    persoalan: [
      "Persoalan tanggungjawab menjaga bahasa",
      "Persoalan bahasa sebagai warisan bangsa",
    ],
    nilai: ["Cinta bahasa", "Semangat kebangsaan", "Menghargai warisan"],
    pengajaran: [
      "Bahasa adalah khazanah bangsa yang wajib dijaga dan dipelihara",
      "Generasi muda bertanggungjawab meneruskan kecemerlangan bahasa kebangsaan",
    ],
    gayaBahasa: ["Metafora (kunci)", "Perulangan", "Nada nasihat"],
  },
  {
    id: "prosa-asal-padi",
    label: "Prosa Tradisional: Asal Padi",
    topicType: "komsas",
    badge: "Prosa Tradisional",
    genre: "Prosa Tradisional",
    sinopsis:
      "Kisah asal usul padi yang menjelaskan bagaimana padi menjadi makanan asasi manusia melalui pengorbanan.",
    tema: "Pengorbanan untuk kebaikan bersama.",
    persoalan: [
      "Persoalan pengorbanan demi kesejahteraan manusia",
      "Persoalan asal usul sesuatu perkara",
    ],
    nilai: ["Pengorbanan", "Kasih sayang", "Bersyukur dengan rezeki"],
    pengajaran: [
      "Kita perlu bersyukur dengan nikmat makanan yang ada",
      "Pengorbanan seseorang perlu dihargai dan dikenang",
    ],
    gayaBahasa: ["Bahasa istana (arkais)", "Penceritaan mitos", "Perulangan"],
  },
  {
    id: "cerpen-oren",
    label: "Cerpen: Oren",
    topicType: "komsas",
    badge: "Cerpen",
    genre: "Cerpen",
    sinopsis:
      "Cerpen tentang seorang kanak-kanak dan buah oren yang menjadi simbol kasih sayang ibu bapa.",
    tema: "Kasih sayang ibu bapa yang tidak ternilai.",
    persoalan: ["Persoalan pengorbanan ibu bapa", "Persoalan menghargai kasih sayang keluarga"],
    nilai: ["Kasih sayang", "Berterima kasih", "Menghargai keluarga"],
    pengajaran: [
      "Kasih sayang ibu bapa tidak boleh dinilai dengan wang atau harta",
      "Anak-anak perlu menghargai setiap pengorbanan yang dilakukan ibu bapa",
    ],
    gayaBahasa: ["Simbol (oren)", "Dialog", "Penceritaan orang pertama"],
  },
  {
    id: "cerpen-hadiah",
    label: "Cerpen: Hadiah",
    topicType: "komsas",
    badge: "Cerpen",
    genre: "Cerpen",
    sinopsis:
      "Cerpen tentang makna sebuah hadiah yang melebihi nilai material — menjadi lambang persahabatan dan keikhlasan.",
    tema: "Keikhlasan dalam memberi dan nilai persahabatan sejati.",
    persoalan: ["Persoalan keikhlasan dalam persahabatan", "Persoalan nilai sebuah hadiah"],
    nilai: ["Keikhlasan", "Persahabatan", "Kerendahan hati"],
    pengajaran: [
      "Hadiah paling berharga adalah yang diberikan dengan hati yang ikhlas",
      "Persahabatan tidak diukur dengan nilai material",
    ],
    gayaBahasa: ["Ironi", "Flashback", "Dialog realistik"],
  },
  {
    id: "cerpen-kuih-bakul",
    label: "Cerpen: Kuih Bakul Limau Mandarin",
    topicType: "komsas",
    badge: "Cerpen",
    genre: "Cerpen",
    sinopsis:
      "Cerpen bertema perpaduan kaum melalui tradisi perayaan bersama kejiranan berbilang kaum.",
    tema: "Perpaduan kaum dan semangat kejiranan yang harmoni.",
    persoalan: ["Persoalan kepentingan perpaduan kaum", "Persoalan menghormati budaya lain"],
    nilai: ["Perpaduan", "Toleransi", "Menghormati budaya lain"],
    pengajaran: [
      "Perpaduan antara kaum perlu dipupuk melalui interaksi positif",
      "Menghormati budaya lain adalah tanda masyarakat yang matang",
    ],
    gayaBahasa: ["Latar tempat dan masa", "Bahasa percakapan sehari-hari", "Tema perpaduan"],
  },
  {
    id: "drama-hadiah",
    label: "Drama: Hadiah",
    topicType: "komsas",
    badge: "Drama",
    genre: "Drama",
    sinopsis:
      "Drama satu babak tentang konflik dalam keluarga yang diselesaikan melalui dialog dan kefahaman.",
    tema: "Kepentingan komunikasi dan kefahaman dalam keluarga.",
    persoalan: ["Persoalan kerapuhan hubungan keluarga", "Persoalan penyelesaian konflik"],
    nilai: ["Komunikasi terbuka", "Kasih sayang keluarga", "Pemaafan"],
    pengajaran: [
      "Komunikasi terbuka dapat menyelesaikan salah faham dalam keluarga",
      "Cinta dan kasih sayang keluarga melebihi apa-apa konflik",
    ],
    gayaBahasa: ["Dialog", "Konflik dalaman", "Babak dan peringkat"],
  },
];

const NOVEL_TOPICS: BMTopic[] = [
  {
    id: "pelari-muda",
    label: "Pelari Muda",
    topicType: "komsas",
    badge: "Novel",
    zon: "Zon Utara (Kedah, Perlis, Pulau Pinang, Perak)",
    penulis: "Novel KSSM Tingkatan 1",
    sinopsis:
      "Kamarul seorang atlet lari berbakat yang menjadi terkenal dan mula bersikap sombong serta mengabaikan latihan. Beliau bersikap kasar terhadap Saridah dan bertengkar dengan jurulatihnya Encik Kadir. Sebuah kemalangan jalan raya mengubah segala-galanya — Kamarul insaf, kembali berlatih dengan disiplin, dan akhirnya menjadi juara Sukan SEA sambil memecahkan rekod.",
    tema: "Keinsafan membawa kejayaan.",
    persoalan: [
      "Kepentingan disiplin",
      "Kesan kesombongan",
      "Persahabatan sejati",
      "Tanggungjawab jurulatih",
      "Keberanian berubah",
    ],
    nilai: ["Disiplin", "Keinsafan", "Bertanggungjawab", "Kasih sayang", "Ketabahan"],
    pengajaran: [
      "Kita hendaklah sentiasa berdisiplin dalam apa jua bidang yang diceburi",
      "Kita hendaklah menjauhi sifat sombong dan angkuh",
      "Kita hendaklah menghargai sahabat yang setia dalam susah dan senang",
      "Kita hendaklah berani mengakui kesilapan dan berubah menjadi lebih baik",
      "Kita hendaklah menghormati dan mendengar nasihat jurulatih",
      "Kita hendaklah bersyukur dengan bakat yang dikurniakan",
    ],
    watak: [
      {
        nama: "Kamarul",
        peranan: "Watak utama",
        perwatakan: ["Berbakat", "Sombong", "Angkuh", "Berani mengakui kesilapan", "Gigih"],
      },
      {
        nama: "Encik Kadir",
        peranan: "Jurulatih",
        perwatakan: ["Penyabar", "Bertanggungjawab", "Berdedikasi"],
      },
      {
        nama: "Saridah",
        peranan: "Watak sampingan",
        perwatakan: ["Prihatin", "Setia berkawan", "Pemaaf"],
      },
      {
        nama: "De Wega",
        peranan: "Atlet berpengalaman",
        perwatakan: ["Berdisiplin", "Merendah diri", "Memberi nasihat"],
      },
    ],
  },
  {
    id: "destinasi-impian",
    label: "Destinasi Impian",
    topicType: "komsas",
    badge: "Novel",
    zon: "Zon Timur (Pahang, Terengganu, Kelantan)",
    penulis: "Novel KSSM Tingkatan 1",
    sinopsis:
      "Datuk mencabar Firdaus dan rakan-rakannya menjalankan ekspedisi berbasikal ke Pantai Morib. Firdaus yang manja dan mudah berputus asa terpaksa menghadapi pelbagai cabaran sepanjang perjalanan bersama Azlina dan Johari. Firdaus terjatuh, meminta berhenti, dan kemudian berbohong kepada Mazlinda tentang pencapaiannya. Apabila Firdaus hampir lemas di laut, beliau diselamatkan dan akhirnya insaf — berjanji untuk berubah menjadi lebih jujur dan berani.",
    tema: "Cabaran dan konflik remaja dalam membentuk jati diri.",
    persoalan: [
      "Kepentingan kejujuran",
      "Semangat tidak berputus asa",
      "Persahabatan",
      "Cabaran remaja",
      "Kepentingan berfikir sebelum bertindak",
    ],
    nilai: ["Keberanian", "Kesabaran", "Kejujuran", "Bertanggungjawab", "Ketabahan"],
    pengajaran: [
      "Kita hendaklah jujur dalam setiap keadaan walaupun kebenaran itu pahit",
      "Kita hendaklah tabah menghadapi cabaran dan tidak mudah berputus asa",
      "Kita hendaklah berfikir sebelum bertindak supaya tidak menyesal kemudian",
      "Kita hendaklah menghargai persahabatan yang sejati",
      "Kita hendaklah menerima teguran dengan hati terbuka",
      "Kita hendaklah berani mengakui kesilapan dan berubah menjadi lebih baik",
    ],
    watak: [
      {
        nama: "Firdaus",
        peranan: "Watak utama",
        perwatakan: ["Manja", "Mudah berputus asa", "Tidak jujur", "Berani berubah"],
      },
      { nama: "Azlina", peranan: "Watak sampingan", perwatakan: ["Cergas", "Berani", "Tegas"] },
      {
        nama: "Johari",
        peranan: "Watak sampingan",
        perwatakan: ["Matang", "Bertanggungjawab", "Penyabar"],
      },
      { nama: "Datuk", peranan: "Pemberi cabaran", perwatakan: ["Tegas", "Prihatin"] },
      { nama: "Mazlinda", peranan: "Penguji kejujuran", perwatakan: ["Bijak", "Berani"] },
    ],
  },
  {
    id: "sejambak-bakti",
    label: "Sejambak Bakti",
    topicType: "komsas",
    badge: "Novel",
    zon: "Zon Selatan (Johor, Melaka, Negeri Sembilan)",
    penulis: "Novel KSSM Tingkatan 1",
    sinopsis:
      "Razali dilantik menjadi penolong setiausaha koperasi sekolah. Beliau bersama Cikgu Zulkifli dan rakan-rakan membawa koperasi ke tahap kejayaan. Namun Munir yang berasa cemburu melancarkan pelbagai gangguan sehingga menyebabkan Razali dipukul, koperasi diceroboh, dan Razali difitnah. Setelah kebenaran terungkap, Munir insaf, koperasi menjadi johan, dan Razali menemui Pak Ramli — bapanya yang dicari.",
    tema: "Kegigihan murid dan guru memajukan koperasi sekolah.",
    persoalan: [
      "Kesan iri hati",
      "Kepentingan amanah",
      "Semangat kerjasama",
      "Kepentingan memaafkan",
      "Ketabahan menghadapi dugaan",
      "Peranan guru membimbing murid",
    ],
    nilai: ["Amanah", "Kerajinan", "Kerjasama", "Ketabahan", "Kejujuran", "Kemaafan"],
    pengajaran: [
      "Kita hendaklah bersikap amanah dalam melaksanakan tanggungjawab yang diberikan",
      "Kita hendaklah menjauhi sifat iri hati kerana ia membawa kemudaratan",
      "Kita hendaklah bekerjasama untuk mencapai matlamat bersama",
      "Kita hendaklah tabah menghadapi fitnah dan tohmahan",
      "Kita hendaklah sentiasa bersedia memaafkan orang yang telah bersalah",
      "Kita hendaklah menghormati guru yang membimbing kita",
    ],
    watak: [
      {
        nama: "Razali",
        peranan: "Watak utama",
        perwatakan: ["Rajin", "Amanah", "Tabah", "Bertanggungjawab", "Pemaaf"],
      },
      {
        nama: "Munir",
        peranan: "Antagonis",
        perwatakan: ["Iri hati", "Pendendam", "Tidak amanah", "Insaf akan kesilapan"],
      },
      {
        nama: "Ramlah",
        peranan: "Watak sampingan",
        perwatakan: ["Rajin", "Setia kawan", "Prihatin"],
      },
      {
        nama: "Cikgu Zulkifli",
        peranan: "Penasihat koperasi",
        perwatakan: ["Bijak", "Bertanggungjawab", "Berdedikasi"],
      },
    ],
  },
  {
    id: "formula-termodinamik",
    label: "Formula Termodinamik",
    topicType: "komsas",
    badge: "Novel",
    zon: "Zon Sabah & Sarawak",
    penulis: "Novel KSSM Tingkatan 1",
    sinopsis:
      "Amir dan Usamah pulang ke kampung lalu membina mesin 2 dalam 1 menggunakan Formula Termodinamik. Aswan berasa iri hati, mencuri pen drive, dan melancarkan jenayah siber. Banjir melanda kampung — Amir menyelamatkan Aswan, Aswan insaf, dan Amir akhirnya memenangi Anugerah Saintis Muda serta biasiswa.",
    tema: "Kegigihan remaja melakukan inovasi demi manfaat masyarakat.",
    persoalan: [
      "Kepentingan inovasi dalam kehidupan masyarakat",
      "Kesan buruk hasad dengki",
      "Semangat kerjasama dalam mencapai matlamat",
      "Kepentingan sikap memaafkan",
      "Penggunaan teknologi secara beretika",
      "Ketabahan menghadapi cabaran dan dugaan",
    ],
    nilai: [
      "Kerjasama",
      "Keberanian",
      "Keinsafan",
      "Kegigihan",
      "Kasih sayang",
      "Pemaaf",
      "Bertanggungjawab",
    ],
    pengajaran: [
      "Kita hendaklah menggunakan ilmu untuk memberi manfaat kepada masyarakat",
      "Kita hendaklah bekerjasama untuk mencapai matlamat yang lebih besar",
      "Kita hendaklah menjauhi sifat hasad dengki kerana ia membawa padah",
      "Kita hendaklah tabah menghadapi cabaran dan tidak berputus asa",
      "Kita hendaklah menggunakan teknologi secara beretika dan bertanggungjawab",
      "Kita hendaklah sentiasa bersedia untuk memaafkan walaupun pernah disakiti",
    ],
    watak: [
      {
        nama: "Amir",
        peranan: "Watak utama / Protagonis",
        perwatakan: ["Kreatif", "Bijaksana", "Gigih", "Pemaaf", "Bertanggungjawab"],
      },
      {
        nama: "Usamah",
        peranan: "Rakan setia Amir",
        perwatakan: ["Mahir teknologi", "Rajin", "Setia kawan"],
      },
      {
        nama: "Aswan",
        peranan: "Antagonis yang insaf",
        perwatakan: ["Iri hati", "Sombong", "Tidak berfikir panjang", "Insaf"],
      },
      {
        nama: "Asma",
        peranan: "Watak sampingan emosi",
        perwatakan: ["Lemah lembut", "Tegas", "Prihatin"],
      },
    ],
  },
];

const RINGKASAN_TOPICS: BMTopic[] = [
  {
    id: "rangka-rumusan-markah-tinggi",
    label: "Rangka Ringkasan Markah Tinggi",
    topicType: "rangka-ringkasan",
    badge: "Premium",
    description:
      "Formula langkah demi langkah untuk menulis ringkasan markah tinggi — kata kunci, rangka isi, contoh jawapan lengkap dan senarai semakan.",
  },
  {
    id: "teknik-rumusan-bahagian-c",
    label: "Teknik Menjawab Ringkasan",
    topicType: "ringkasan-premium",
    badge: "Premium",
    description:
      "Panduan lengkap menjawab soalan Ringkasan Bahagian C — fakta penting, formula emas, penanda wacana, contoh jawapan dan cabaran interaktif.",
  },
  {
    id: "rumusan-mastery",
    label: "Penguasaan Ringkasan",
    topicType: "ringkasan",
    badge: "Ringkasan",
    description: "Cara menulis ringkasan yang tepat dan padat berdasarkan teks yang diberikan.",
    formula: [
      "Baca teks sekali lalu untuk faham idea umum",
      "Baca kali kedua — kenal pasti dan gariskan isi penting sahaja",
      "Tulis semula isi dalam ayat sendiri (bukan salin)",
      "Pastikan tidak melebihi had perkataan (100 patah perkataan)",
      "Semak: ejaan, tatabahasa, dan kejelasan",
    ],
    steps: [
      "Kenal pasti kata kunci soalan dahulu",
      "Senaraikan 5–6 isi penting dalam ayat sendiri",
      "Jangan masukkan pendapat peribadi, contoh, atau statistik — ISI sahaja",
      "Tulis dalam satu perenggan menggunakan penanda wacana",
    ],
    commonMistakes: [
      "Memasukkan pendapat peribadi dalam ringkasan",
      "Menyalin ayat terus dari teks asal tanpa olahan",
      "Melebihi 100 patah perkataan",
      "Menulis pendahuluan atau penutup",
    ],
    uasaTips: [
      "Kira perkataan selepas menulis — jangan melebihi 100 patah perkataan",
      "Markah dibahagi: isi (content marks) + bahasa (language marks)",
      "Gunakan penanda wacana: Antara, Selain itu, Seterusnya, Di samping itu, Tambahan pula, Akhir sekali",
    ],
  },
];

// ─── KERTAS 2 ─────────────────────────────────────────────────────────────────

const KARANGAN_PENDEK_TOPIC: BMTopic = {
  id: "karangan-pendek",
  label: "Karangan Pendek (50–80 Patah Perkataan)",
  topicType: "karangan-pendek",
  badge: "Kertas 2",
  description:
    "Karangan pendek berdasarkan bahan grafik (jadual, gambar rajah, carta, atau gambar).",
  formula: [
    "Baca arahan dengan teliti — berapa patah perkataan? Apa yang perlu ditulis?",
    "Perhatikan bahan grafik — kenal pasti maklumat penting sahaja",
    "Pilih 3-4 isi penting dari grafik (jangan tulis semua)",
    "Tulis dalam ayat penuh, bukan poin",
    "Kira perkataan — pastikan 50-80 patah perkataan",
  ],
  steps: [
    "Cara baca jadual: semak tajuk, baca lajur kiri (kategori) dan lajur nilai, bandingkan",
    "Cara baca carta pai: kenal pasti bahagian terbesar dan terkecil",
    "Cara baca gambar: jelaskan apa yang dilihat dengan teratur (kiri ke kanan, atas ke bawah)",
    "Cara cari isi: fokus pada perubahan yang ketara, nilai tertinggi/terendah, trend",
  ],
  commonMistakes: [
    "Menulis kurang dari 50 atau melebihi 80 patah perkataan",
    "Menulis dalam bentuk poin bukan ayat penuh",
    "Huraikan semua data tanpa pilih isi yang penting",
    "Tidak merujuk data spesifik dari grafik",
  ],
  uasaTips: [
    "Mulakan dengan ayat topik: 'Jadual di atas menunjukkan...' / 'Berdasarkan carta...'",
    "Gunakan bahasa perbandingan: lebih tinggi, meningkat, menurun, mencapai tahap tertinggi",
    "Latih dalam masa 15 minit — ini adalah soalan cepat",
  ],
};

const RESPONS_TERBUKA_TOPIC: BMTopic = {
  id: "respons-terbuka",
  label: "Karangan Respons Terbuka",
  topicType: "respons-terbuka",
  badge: "Kertas 2",
  description:
    "Karangan panjang berstruktur — formula tetap untuk pendahuluan, isi, huraian, contoh, dan penutup.",
  formulae: [
    {
      part: "Pendahuluan",
      formula: "Kenyataan umum (2 ayat) + Kenyataan khusus (1 ayat)",
      example:
        "Pada masa kini, teknologi telah menjadi sebahagian daripada kehidupan seharian manusia. Hampir setiap aspek kehidupan melibatkan penggunaan teknologi canggih. Oleh itu, adalah penting kita menguasai penggunaan teknologi dalam pendidikan.",
    },
    {
      part: "Isi Pertama",
      formula: "Ayat isi (1 ayat) + Huraian (1-2 ayat) + Contoh (1 ayat)",
      example:
        "Pertama, penggunaan teknologi dapat meningkatkan minat pelajar terhadap pembelajaran. Dengan adanya aplikasi interaktif dan video pembelajaran, pelajar dapat belajar dengan cara yang lebih menyeronokkan. Contohnya, aplikasi matematik interaktif terbukti meningkatkan pencapaian pelajar.",
    },
    {
      part: "Isi Kedua",
      formula: "Ayat isi + Huraian + Contoh",
      example:
        "Selain itu, teknologi membolehkan pembelajaran berlaku tanpa had masa dan tempat. Pelajar boleh mengakses bahan pembelajaran pada bila-bila masa dan di mana sahaja. Misalnya, platform e-pembelajaran membenarkan pelajar mengulang kaji pelajaran dari rumah.",
    },
    {
      part: "Isi Ketiga",
      formula: "Ayat isi + Huraian + Contoh",
      example:
        "Tambahan pula, teknologi membantu guru menyampaikan pengajaran dengan lebih berkesan. Penggunaan tayangan slaid dan video menjadikan konsep yang kompleks mudah difahami. Hal ini terbukti apabila pencapaian pelajar meningkat selepas guru menggunakan teknologi dalam pengajaran.",
    },
    {
      part: "Penutup",
      formula: "Rumusan (1 ayat) + Saranan (1 ayat) + Harapan (1 ayat)",
      example:
        "Kesimpulannya, teknologi amat penting dalam sistem pendidikan masa kini. Semua pihak perlu bekerjasama untuk memastikan penggunaan teknologi yang bermanfaat dan bertanggungjawab. Adalah diharapkan generasi muda dapat memanfaatkan teknologi demi masa depan yang lebih cerah.",
    },
  ],
  steps: [
    "Baca soalan — kenal pasti topik dan jenis karangan",
    "Tulis rangka: 3 isi utama dengan contoh",
    "Tulis pendahuluan (2-3 ayat)",
    "Kembangkan setiap isi: Isi → Huraian → Contoh",
    "Tulis penutup (2-3 ayat)",
    "Semak: tanda baca, ejaan, konjungsi",
  ],
  commonMistakes: [
    "Isi tidak relevan dengan topik soalan",
    "Tiada huraian — hanya tulis isi sahaja",
    "Pendahuluan terlalu panjang (> 1 perenggan)",
    "Penutup tidak ada atau terlalu pendek",
    "Tidak menggunakan kata hubung antara isi",
  ],
  uasaTips: [
    "Gunakan kata hubung: 'selain itu', 'tambahan pula', 'di samping itu', 'sehubungan itu'",
    "Setiap isi perlu ada contoh spesifik — jangan terlalu umum",
    "Panjang ideal: 250-300 patah perkataan",
  ],
};

const PENANDA_WACANA_LENGKAP_TOPIC: BMTopic = {
  id: "penanda-wacana-lengkap",
  label: "Penanda Wacana Lengkap (Nota Ultimate)",
  topicType: "penanda-wacana-lengkap",
  badge: "Nota Lengkap",
  description:
    "Rujukan lengkap semua penanda wacana mengikut 9 kategori — Pendahuluan, Isi, Huraian (Mengapa), Huraian (Bagaimana), Contoh, Kesan, Ungkapan, Penegas, dan Kesimpulan. Setiap frasa disertai penggunaan, contoh ayat, dan kosa kata sukar — lengkap dengan senarai paling selamat untuk UASA dan penanda aras tinggi.",
};

const WORKSHOP_TOPICS: BMTopic[] = [
  {
    id: "workshop-keluarga",
    label: "Kekeluargaan",
    topicType: "workshop",
    badge: "Bengkel",
    ideaBank: [
      "Kasih sayang ibu bapa",
      "Komunikasi terbuka",
      "Tanggungjawab ahli keluarga",
      "Masa bersama keluarga",
      "Menghormati orang tua",
    ],
    pendahuluan:
      "Keluarga merupakan institusi terpenting dalam masyarakat. Ia menjadi asas pembentukan peribadi seseorang. Oleh itu, perlu ada usaha untuk memastikan keharmonian keluarga terpelihara.",
    isi: [
      "Komunikasi terbuka mengeratkan hubungan keluarga",
      "Ibu bapa perlu meluangkan masa bersama anak-anak",
      "Setiap ahli keluarga perlu menunaikan tanggungjawab masing-masing",
    ],
    penutup:
      "Kesimpulannya, keluarga bahagia adalah asas masyarakat yang sejahtera. Semua pihak perlu berusaha memupuk nilai-nilai kekeluargaan. Adalah diharapkan institusi keluarga akan terus kukuh dan harmoni.",
    peribahasa: [
      "Seperti aur dengan tebing (kerjasama)",
      "Bersatu teguh bercerai roboh (perpaduan)",
    ],
  },

  {
    id: "workshop-sekolah",
    label: "Sekolah",
    topicType: "workshop",
    badge: "Bengkel",
    ideaBank: [
      "Kepentingan hadir sekolah",
      "Persahabatan di sekolah",
      "Peranan guru",
      "Aktiviti kokurikulum",
      "Disiplin pelajar",
    ],
    pendahuluan:
      "Sekolah merupakan tempat menimba ilmu dan membentuk sahsiah pelajar. Di sinilah generasi muda dipersiapkan untuk menghadapi cabaran masa hadapan. Justeru, suasana sekolah yang kondusif amat penting.",
    isi: [
      "Guru memainkan peranan penting dalam membentuk sahsiah pelajar",
      "Aktiviti kokurikulum membantu perkembangan bakat pelajar",
      "Disiplin di sekolah membentuk karakter yang kuat",
    ],
    penutup:
      "Kesimpulannya, sekolah bukan hanya tempat belajar tetapi juga tempat membentuk diri. Semua pihak perlu bekerjasama mewujudkan suasana sekolah yang terbaik. Diharapkan setiap pelajar dapat memanfaatkan masa di sekolah sepenuhnya.",
    peribahasa: [
      "Guru ibarat lilin (pengorbanan guru)",
      "Melentur buluh biarlah dari rebungnya (didikan awal)",
    ],
  },

  {
    id: "workshop-kebersihan",
    label: "Kebersihan",
    topicType: "workshop",
    badge: "Bengkel",
    ideaBank: [
      "Kebersihan diri",
      "Kebersihan alam sekitar",
      "Amalan buang sampah",
      "Penyelenggaraan tandas awam",
      "Gotong-royong",
    ],
    pendahuluan:
      "Kebersihan adalah amalan murni yang mencerminkan peribadi seseorang dan tahap ketamadunan sesebuah masyarakat. Sekolah dan rumah yang bersih menciptakan persekitaran yang sihat dan selesa. Justeru, budaya kebersihan perlu dipupuk sejak awal lagi.",
    isi: [
      "Kebersihan diri menjamin kesihatan fizikal dan mental",
      "Menjaga kebersihan alam sekitar adalah tanggungjawab bersama",
      "Gotong-royong memupuk semangat kerjasama dalam menjaga kebersihan",
    ],
    penutup:
      "Kebersihan bukan hanya tanggungjawab individu tetapi juga tanggungjawab bersama. Setiap orang perlu memainkan peranan masing-masing demi alam sekitar yang bersih. Marilah kita jadikan kebersihan sebagai gaya hidup yang berterusan.",
    peribahasa: ["Kebersihan itu separuh daripada iman", "Bersih pangkal sihat"],
  },

  {
    id: "workshop-kesihatan",
    label: "Kesihatan",
    topicType: "workshop",
    badge: "Bengkel",
    ideaBank: [
      "Pemakanan sihat",
      "Senaman berkala",
      "Tidur yang cukup",
      "Mengelak tekanan",
      "Pemeriksaan kesihatan",
    ],
    pendahuluan:
      "Kesihatan adalah aset paling berharga dalam kehidupan manusia. Tanpa kesihatan yang baik, semua pencapaian lain tidak bererti. Oleh itu, setiap individu perlu mengambil langkah proaktif untuk menjaga kesihatan mereka.",
    isi: [
      "Pemakanan seimbang adalah asas kesihatan yang baik",
      "Senaman berkala meningkatkan kecergasan fizikal dan mental",
      "Pemeriksaan kesihatan berkala membantu mengesan penyakit awal",
    ],
    penutup:
      "Kesihatan yang baik bukan berlaku secara kebetulan tetapi hasil daripada gaya hidup yang sihat. Setiap individu bertanggungjawab menjaga kesihatan diri. Marilah kita mulakan langkah kecil hari ini untuk kesihatan yang lebih baik.",
    peribahasa: ["Mencegah lebih baik daripada mengubati", "Badan sihat jiwa kuat"],
  },

  {
    id: "workshop-alam-sekitar",
    label: "Alam Sekitar",
    topicType: "workshop",
    badge: "Bengkel",
    ideaBank: [
      "Pencemaran alam",
      "Pemanasan global",
      "Pemeliharaan hutan",
      "Kitar semula",
      "Tanggungjawab terhadap alam",
    ],
    pendahuluan:
      "Alam sekitar adalah warisan yang perlu dijaga untuk generasi akan datang. Namun, pembangunan pesat telah memberi impak negatif kepada alam semula jadi. Kesedaran dan tindakan segera amat diperlukan untuk memelihara alam sekitar.",
    isi: [
      "Pencemaran alam memberi kesan buruk kepada kesihatan manusia",
      "Pemeliharaan hutan penting untuk mengekalkan biodiversiti",
      "Amalan kitar semula dapat mengurangkan sisa buangan",
    ],
    penutup:
      "Alam sekitar yang sihat adalah tanggungjawab bersama kita semua. Setiap tindakan kecil seperti mengurangkan penggunaan plastik boleh memberi impak besar. Jadilah agen perubahan untuk alam sekitar yang lebih baik.",
    peribahasa: ["Jaga alam, alam jaga kita", "Bumi dipinjam, bukan diwarisi"],
  },

  {
    id: "workshop-sukan",
    label: "Sukan",
    topicType: "workshop",
    badge: "Bengkel",
    ideaBank: [
      "Faedah sukan",
      "Semangat kesukanan",
      "Perpaduan melalui sukan",
      "Disiplin atlet",
      "Sukan untuk kesihatan",
    ],
    pendahuluan:
      "Sukan bukan sekadar aktiviti fizikal tetapi juga wadah membina sahsiah dan memupuk perpaduan. Malaysia telah melahirkan ramai atlet cemerlang di peringkat antarabangsa. Sokongan semua pihak amat penting untuk melestarikan kecemerlangan sukan negara.",
    isi: [
      "Sukan membina disiplin dan semangat juang yang tinggi",
      "Sukan memupuk perpaduan antara kaum dan peringkat umur",
      "Penglibatan aktif dalam sukan meningkatkan kesihatan fizikal dan mental",
    ],
    penutup:
      "Sukan adalah medium yang berkesan untuk membentuk individu yang seimbang dari segi jasmani, emosi, rohani, dan intelek. Semua pihak perlu menyokong budaya sukan di peringkat akar umbi. Jadilah rakyat yang aktif dan cergas melalui penglibatan dalam sukan.",
    peribahasa: ["Melentur buluh biarlah dari rebungnya", "Sihat fizikal, sihat minda"],
  },

  {
    id: "workshop-amalan-baik",
    label: "Amalan Baik",
    topicType: "workshop",
    badge: "Bengkel",
    ideaBank: [
      "Hormat orang tua",
      "Tolong-menolong",
      "Bersikap jujur",
      "Menepati masa",
      "Bersyukur",
    ],
    pendahuluan:
      "Amalan baik adalah teras pembentukan masyarakat yang beradab dan bertamadun. Individu yang mengamalkan nilai-nilai murni akan disanjungi oleh masyarakat. Justeru, penanaman amalan baik perlu bermula dari peringkat awal kehidupan.",
    isi: [
      "Menghormati orang tua mencerminkan budi pekerti yang mulia",
      "Sikap tolong-menolong memupuk semangat perpaduan dalam masyarakat",
      "Kejujuran adalah asas kepercayaan dalam hubungan sesama manusia",
    ],
    penutup:
      "Amalan baik bukan hanya memberi manfaat kepada diri sendiri tetapi juga kepada masyarakat. Marilah kita tanamkan nilai-nilai murni dalam diri sejak hari ini. Dengan budaya amalan baik yang kuat, masyarakat kita akan lebih harmoni dan sejahtera.",
    peribahasa: ["Budi bahasa cermin jiwa", "Seperti padi, makin berisi makin tunduk"],
  },

  {
    id: "workshop-teknologi",
    label: "Teknologi",
    topicType: "workshop",
    badge: "Bengkel",
    ideaBank: [
      "Manfaat teknologi",
      "Risiko media sosial",
      "Keselamatan siber",
      "Teknologi dalam pendidikan",
      "Teknologi hijau",
    ],
    pendahuluan:
      "Teknologi telah mengubah cara manusia hidup, bekerja, dan berkomunikasi. Di era revolusi industri 4.0, penguasaan teknologi adalah kemestian. Walau bagaimanapun, penggunaan teknologi perlu bijaksana dan bertanggungjawab.",
    isi: [
      "Teknologi mempercepatkan proses kerja dan meningkatkan produktiviti",
      "Media sosial membolehkan komunikasi tanpa batasan geografi",
      "Teknologi hijau membantu mengurangkan kerosakan alam sekitar",
    ],
    penutup:
      "Teknologi adalah alat yang hebat jika digunakan dengan bijaksana. Setiap individu bertanggungjawab menggunakan teknologi secara positif dan beretika. Marilah kita jadikan teknologi sebagai rakan kongsi dalam membina masa depan yang lebih cerah.",
    peribahasa: [
      "Berakit-rakit ke hulu (usaha untuk mahir teknologi)",
      "Ilmu tidak ada penghujungnya",
    ],
  },
];

const MODEL_KARANGAN_TOPICS: BMTopic[] = [
  {
    id: "model-fakta",
    label: "Karangan Fakta",
    topicType: "model-karangan",
    badge: "Model",
    description:
      "Karangan yang menyampaikan maklumat, fakta, dan penjelasan tentang sesuatu topik secara objektif.",
    keyFeatures: [
      "Bahasa formal dan objektif",
      "Menggunakan fakta dan data",
      "Tiada pendapat peribadi yang emosional",
      "Struktur: Pendahuluan → Isi berfakta → Penutup",
    ],
  },
  {
    id: "model-perbincangan",
    label: "Karangan Perbincangan",
    topicType: "model-karangan",
    badge: "Model",
    description:
      "Karangan yang membincangkan sesuatu isu dari pelbagai sudut pandang sebelum membuat kesimpulan.",
    keyFeatures: [
      "Bincang pro dan kontra",
      "Bahasa neutral tapi akhirnya berpihak",
      "Gunakan frasa: 'sebaliknya', 'di satu pihak', 'namun begitu'",
      "Penutup: cadangan atau pendirian akhir",
    ],
  },
  {
    id: "model-pengalaman",
    label: "Karangan Pengalaman",
    topicType: "model-karangan",
    badge: "Model",
    description:
      "Karangan berdasarkan pengalaman peribadi — ditulis dalam gaya naratif orang pertama.",
    keyFeatures: [
      "Guna kata ganti nama 'saya/aku'",
      "Bahasa naratif dan deskriptif",
      "Aliran masa: latar → konflik → penyelesaian",
      "Akhiri dengan pengajaran/refleksi",
    ],
  },
  {
    id: "model-surat",
    label: "Karangan Surat Tidak Rasmi",
    topicType: "model-karangan",
    badge: "Model",
    description: "Surat kepada rakan, saudara, atau kenalan — format tidak formal.",
    keyFeatures: [
      "Format: Tarikh, Salam, Isi (3 perenggan), Penutup, Nama",
      "Bahasa mesra tapi masih baku",
      "Menyentuh perasaan dan hubungan peribadi",
      "Jangan gunakan format surat rasmi",
    ],
  },
  {
    id: "model-laporan",
    label: "Karangan Laporan",
    topicType: "model-karangan",
    badge: "Model",
    description:
      "Laporan tentang sesuatu aktiviti atau kejadian — format berita atau laporan rasmi.",
    keyFeatures: [
      "Format: Tajuk, Tarikh/Masa/Tempat, Kronologi, Penutup",
      "Bahasa formal dan ringkas",
      "Fakta sahaja — tiada pendapat",
      "Ditulis seperti wartawan melaporkan berita",
    ],
  },
  {
    id: "model-ucapan",
    label: "Karangan Ucapan",
    topicType: "model-karangan",
    badge: "Model",
    description: "Teks ucapan untuk pelbagai majlis — format formal dengan sapaan khas.",
    keyFeatures: [
      "Mulakan dengan sapaan: 'Yang Berbahagia...', 'Hadirin sekalian...'",
      "Isi: 3 isi utama dengan huraian",
      "Gunakan perkataan motivasi dan inspirasi",
      "Akhiri dengan terima kasih dan harapan",
    ],
  },
];

const PERIBAHASA_BANK_LENGKAP_TOPIC: BMTopic = {
  id: "peribahasa-bank-lengkap",
  label: "Peribahasa Bank Lengkap (Nota Ultimate)",
  topicType: "peribahasa-bank",
  badge: "Nota Lengkap",
  description:
    "Rujukan peribahasa paling lengkap merentas 7 kategori — Usaha & Semangat, Keluarga & Kasih Sayang, Pendidikan & Ilmu, Kerjasama & Perpaduan, Kebersihan & Kesihatan, Alam Sekitar, dan Kesihatan. Setiap peribahasa disertai maksud, contoh ayat, tema karangan sesuai, dan tahap kesukaran — lengkap dengan 50 Peribahasa Wajib Hafal, jadual ikut tema karangan, Peribahasa Aras Tinggi, dan panduan penggunaan dalam karangan.",
};

const PERIBAHASA_BANK_TOPICS: BMTopic[] = [PERIBAHASA_BANK_LENGKAP_TOPIC];

const ESSAY_IMPROVEMENT_TOPIC: BMTopic = {
  id: "essay-improvement",
  label: "Kemahiran Tingkatkan Karangan",
  topicType: "essay-improvement",
  badge: "Teknik",
  description: "Kemahiran menukar ayat biasa menjadi ayat yang lebih menarik, kaya, dan bernas.",
  beforeAfter: [
    {
      lemah: "Budak itu rajin belajar.",
      cemerlang:
        "Anak muda berjiwa waja itu menekuni pelajarannya dengan penuh dedikasi dan ketekunan.",
      tip: "Guna kata adjektif kaya dan frasa yang lebih deskriptif",
    },
    {
      lemah: "Alam sekitar kita kotor.",
      cemerlang:
        "Alam sekitar yang pernah menghijau kini semakin tercemar akibat sikap tidak bertanggungjawab segelintir pihak.",
      tip: "Tambah konteks perbandingan dan punca",
    },
    {
      lemah: "Sukan itu bagus.",
      cemerlang:
        "Penglibatan aktif dalam sukan bukan sahaja meningkatkan kesihatan fizikal, malah turut menggilap disiplin dan semangat juang.",
      tip: "Tambah 'bukan sahaja... malah' untuk huraian dua dimensi",
    },
  ],
  kosaKata: [
    { biasa: "bagus", menarik: "cemerlang / berprestasi tinggi / unggul" },
    { biasa: "baik hati", menarik: "berjiwa mulia / berhati lembut / penyayang" },
    { biasa: "belajar", menarik: "menimba ilmu / memperkaya minda / menekuni pelajaran" },
    { biasa: "kawan", menarik: "teman seperjuangan / rakan setia / sahabat karib" },
    { biasa: "sekolah", menarik: "institusi pendidikan / gedung ilmu / menara gading" },
    { biasa: "duduk", menarik: "berteduh / bermukim / menetap" },
    { biasa: "pergi", menarik: "bertolak / berangkat / menuju" },
  ],
  mistakes: [
    "Pengulangan perkataan yang sama dalam satu perenggan",
    "Ayat terlalu pendek — kurang huraian",
    "Penggunaan kata 'dan' berulang kali sebagai penyambung",
    "Tiada variasi panjang ayat — semua ayat panjang atau semua pendek",
    "Tidak menggunakan peribahasa atau ungkapan menarik",
    "Pendahuluan yang terlalu umum dan tidak menarik minat",
  ],
};

// ─── FINAL EXPORTS ────────────────────────────────────────────────────────────

export const BM_KERTAS: BMKertas[] = [
  {
    id: "k1",
    label: "Kertas 1",
    shortLabel: "K1",
    icon: "📝",
    description: "Sistem Bahasa, KOMSAS, Novel, Ringkasan",
    examDetails: "Masa: 1 jam 45 minit · Soalan berstruktur · Teks + KOMSAS",
    color: "#818CF8",
    gradient: "from-indigo-500/20 to-violet-500/20",
    hubs: [
      {
        id: "sistem-bahasa",
        label: "Sistem Bahasa",
        shortLabel: "Tatabahasa",
        icon: "📚",
        color: "#60A5FA",
        bgGradient: "from-blue-500/15 to-sky-500/10",
        borderColor: "rgba(96,165,250,0.25)",
        description: "Kata nama, adjektif, kerja, tatabahasa, pola ayat dan peribahasa asas.",
        topics: SISTEM_BAHASA_TOPICS,
      },
      {
        id: "komsas",
        label: "KOMSAS",
        shortLabel: "KOMSAS",
        icon: "📜",
        color: "#C084FC",
        bgGradient: "from-purple-500/15 to-violet-500/10",
        borderColor: "rgba(192,132,252,0.25)",
        description: "Pantun, syair, sajak, prosa tradisional, cerpen dan drama Tingkatan 1.",
        topics: KOMSAS_TOPICS,
      },
      {
        id: "novel",
        label: "Novel",
        shortLabel: "Novel",
        icon: "📖",
        color: "#FB923C",
        bgGradient: "from-orange-500/15 to-amber-500/10",
        borderColor: "rgba(251,146,60,0.25)",
        description: "Empat novel KOMSAS — sinopsis, watak, tema, persoalan, nilai dan pengajaran.",
        topics: NOVEL_TOPICS,
      },
      {
        id: "rumusan",
        label: "Ringkasan",
        shortLabel: "Ringkasan",
        icon: "📝",
        color: "#FBBF24",
        bgGradient: "from-yellow-500/15 to-amber-500/10",
        borderColor: "rgba(251,191,36,0.25)",
        description:
          "Bahagian C: Ringkasan — isi penting, penanda wacana dan teknik menulis mengikut format UASA.",
        topics: RINGKASAN_TOPICS,
      },
    ],
  },
  {
    id: "k2",
    label: "Kertas 2",
    shortLabel: "K2",
    icon: "✍️",
    description: "Karangan Pendek, Respons Terbuka, Bengkel Topik, Model & Bank Peribahasa",
    examDetails: "Masa: 1 jam 30 minit · Karangan wajib + pilihan · Min. 200 patah perkataan",
    color: "#FB923C",
    gradient: "from-orange-500/20 to-amber-500/20",
    hubs: [
      {
        id: "karangan-pendek",
        label: "Karangan Pendek",
        shortLabel: "Kgn. Pendek",
        icon: "📊",
        color: "#38BDF8",
        bgGradient: "from-sky-500/15 to-cyan-500/10",
        borderColor: "rgba(56,189,248,0.25)",
        description: "50–80 patah perkataan berdasarkan bahan grafik — cara baca dan tulis.",
        topics: [KARANGAN_PENDEK_TOPIC],
      },
      {
        id: "respons-terbuka",
        label: "Karangan Respons Terbuka",
        shortLabel: "Respons",
        icon: "📋",
        color: "#A78BFA",
        bgGradient: "from-violet-500/15 to-purple-500/10",
        borderColor: "rgba(167,139,250,0.25)",
        description: "Formula 5 bahagian — pendahuluan, isi, huraian, contoh, penutup.",
        topics: [RESPONS_TERBUKA_TOPIC, PENANDA_WACANA_LENGKAP_TOPIC],
      },
      {
        id: "workshop",
        label: "Bengkel Karangan",
        shortLabel: "Bengkel",
        icon: "🔧",
        color: "#34D399",
        bgGradient: "from-emerald-500/15 to-green-500/10",
        borderColor: "rgba(52,211,153,0.25)",
        description: "Struktur 12 bahagian ikut Form 1, tetapi kandungan dan contoh dikembangkan ke tahap Tingkatan 2.",
        topics: WORKSHOP_TOPICS,
      },
      {
        id: "model-karangan",
        label: "Model Karangan Bank",
        shortLabel: "Model",
        icon: "🏆",
        color: "#FBBF24",
        bgGradient: "from-yellow-500/15 to-amber-500/10",
        borderColor: "rgba(251,191,36,0.25)",
        description: "6 jenis karangan — struktur, ciri utama, dan contoh model.",
        topics: MODEL_KARANGAN_TOPICS,
      },
      {
        id: "peribahasa-bank",
        label: "Peribahasa Bank",
        shortLabel: "Peribahasa",
        icon: "💎",
        color: "#F472B6",
        bgGradient: "from-pink-500/15 to-rose-500/10",
        borderColor: "rgba(244,114,182,0.25)",
        description: "Koleksi peribahasa mengikut tema — maksud, contoh ayat, dan topik sesuai.",
        topics: PERIBAHASA_BANK_TOPICS,
      },
      {
        id: "essay-improvement",
        label: "Tingkatkan Karangan",
        shortLabel: "Improve",
        icon: "⚡",
        color: "#818CF8",
        bgGradient: "from-indigo-500/15 to-blue-500/10",
        borderColor: "rgba(129,140,248,0.25)",
        description:
          "Ubah ayat biasa jadi ayat cemerlang — kosa kata menarik dan teknik penulisan.",
        topics: [ESSAY_IMPROVEMENT_TOPIC],
      },
    ],
  },
];

export function getBMKertas(id: "k1" | "k2"): BMKertas | undefined {
  return BM_KERTAS.find((k) => k.id === id);
}

export function getBMHub(kertasId: "k1" | "k2", hubId: string): BMHub | undefined {
  const normalizedHubId = kertasId === "k1" && hubId === "ringkasan" ? "rumusan" : hubId;
  return getBMKertas(kertasId)?.hubs.find((h) => h.id === normalizedHubId);
}

export function getBMTopic(
  kertasId: "k1" | "k2",
  hubId: string,
  topicId: string,
): BMTopic | undefined {
  const legacyTopicIds: Record<string, string> = {
    "rangka-ringkasan-markah-tinggi": "rangka-rumusan-markah-tinggi",
    "teknik-ringkasan-bahagian-c": "teknik-rumusan-bahagian-c",
    "ringkasan-mastery": "rumusan-mastery",
  };
  return getBMHub(kertasId, hubId)?.topics.find(
    (t) => t.id === (legacyTopicIds[topicId] ?? topicId),
  );
}

export const BM_TOTAL_TOPICS = BM_KERTAS.reduce(
  (sum, k) => sum + k.hubs.reduce((s2, h) => s2 + h.topics.length, 0),
  0,
);
