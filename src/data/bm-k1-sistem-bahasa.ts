// Premium Sistem Bahasa content for BM Form 1 — all 8 topics, 12 sections each

export interface QuizQuestion {
  q: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
  explanation: string;
}

export interface JenisItem {
  nama: string;
  definisi: string;
  formula?: string;
  contoh: string[];
  contohAyat: string[];
}

export interface KesalahanItem {
  salah: string;
  sebabSalah: string;
  betul: string;
  sebabBetul: string;
}

export interface KBATQuestion {
  situasi: string;
  soalan: string;
  jawapanModel: string;
  penjelasan: string;
}

export interface SistemBahasaTopic {
  id: string;
  tajuk: string;
  subtitle: string;
  difficulty: "Asas" | "Sederhana" | "Tinggi";
  masaBelajar: string;
  warna: string;

  pengenalan: string;
  definisi: {
    teks: string;
    ciri: string[];
    ringkasan: string;
  };
  cikguTerang: {
    intro: string;
    langkah: { tajuk: string; teks: string; contoh: string }[];
    petua: string;
  };
  jenis: JenisItem[];
  contohHarian: {
    harian: string[];
    sekolah: string[];
    peperiksaan: string[];
  };
  tipsUASA: {
    kerap: string[];
    pemeriksa: string[];
    format: string[];
  };
  kesalahan: KesalahanItem[];
  caraMudahIngat: {
    akronim?: { kata: string; makna: string };
    visualMemory: string[];
    petua: string[];
  };
  kbat: KBATQuestion[];
  kuiz: QuizQuestion[];
  examBooster: {
    rumusan: string[];
    lastMinuteTips: string[];
  };
}

// ─────────────────────────────────────────────────────────────
// 1. KATA NAMA
// ─────────────────────────────────────────────────────────────
const kataNama: SistemBahasaTopic = {
  id: "kata-nama",
  tajuk: "Kata Nama",
  subtitle: "Asas tatabahasa — nama bagi semua benda, tempat, dan orang",
  difficulty: "Asas",
  masaBelajar: "25 minit",
  warna: "#60A5FA",

  pengenalan:
    "Bayangkan kamu masuk ke sebuah kedai. Kamu nampak kerusi, meja, penjual, wang, dan kegembiraan. Semua BENDA, ORANG, TEMPAT, dan PERASAAN yang kamu sebut tadi — semuanya KATA NAMA. Kata nama ialah perkataan yang paling banyak kita guna dalam ayat setiap hari.",

  definisi: {
    teks: "Kata Nama ialah kata yang merujuk kepada nama orang, binatang, benda, tempat, atau perkara abstrak.",
    ciri: [
      "Boleh didahului oleh kata bilangan (seorang, seekor, sebuah)",
      "Boleh diikuti oleh kata penjodoh bilangan",
      "Boleh menjadi subjek atau objek dalam ayat",
      "Boleh didahului oleh 'si', 'sang', atau 'sri' untuk nama khas",
    ],
    ringkasan:
      "Mudah diingat: Kalau boleh letak 'sebuah/seorang/seekor' sebelumnya — ia KATA NAMA!",
  },

  cikguTerang: {
    intro:
      "Cikgu AcadeMy ada cara mudah nak kenal Kata Nama. Kita guna kaedah SOAL 'APA' atau 'SIAPA'.",
    langkah: [
      {
        tajuk: "Langkah 1 — Tanya 'Apa?' atau 'Siapa?'",
        teks: "Baca ayat, kemudian tanya: 'Apa yang dimaksudkan?' atau 'Siapa yang terlibat?'",
        contoh: "'Ahmad membeli buku di kedai.' → Siapa? Ahmad. Apa? Buku, kedai.",
      },
      {
        tajuk: "Langkah 2 — Cuba letak kata penjodoh bilangan",
        teks: "Kata Nama boleh digabung dengan penjodoh bilangan: se-ORANG, se-EKOR, se-BUAH, se-HELAI.",
        contoh: "'seorang Ahmad', 'seekor kucing', 'sebuah bangunan', 'sehelai kain'",
      },
      {
        tajuk: "Langkah 3 — Tentukan jenis",
        teks: "Adakah ia nama KHUSUS (satu sahaja di dunia) atau nama AM (banyak dalam kategori)?",
        contoh: "'Kuala Lumpur' = Nama Khas. 'bandar' = Nama Am.",
      },
      {
        tajuk: "Langkah 4 — Kenal Kata Ganti Nama",
        teks: "Perkataan yang MENGGANTIKAN kata nama (supaya tak ulang-ulang nama).",
        contoh: "'Siti pergi ke sekolah. DIA membawa beg.' → 'Dia' menggantikan 'Siti'.",
      },
    ],
    petua:
      "Jika soalan UASA tanya 'cari kata nama dalam ayat', cari perkataan yang boleh dijawab dengan soalan 'apa?' atau 'siapa?'.",
  },

  jenis: [
    {
      nama: "Kata Nama Am",
      definisi: "Nama biasa untuk golongan benda, orang, atau tempat — tidak merujuk sesuatu yang khusus.",
      formula: "Huruf kecil di awal perkataan",
      contoh: ["murid", "kereta", "sungai", "negara", "perasaan"],
      contohAyat: [
        "Murid itu rajin belajar.",
        "Kereta biru itu milik ayah saya.",
        "Sungai itu sangat dalam.",
      ],
    },
    {
      nama: "Kata Nama Khas",
      definisi: "Nama khusus untuk satu orang, tempat, atau benda yang unik di dunia.",
      formula: "Huruf BESAR di awal perkataan",
      contoh: ["Siti Nur Aisyah", "Kuala Lumpur", "Sungai Klang", "Hari Raya", "Malaysia"],
      contohAyat: [
        "Siti Nur Aisyah mendapat A dalam peperiksaan.",
        "Kuala Lumpur adalah ibu kota Malaysia.",
        "Kami pergi ke Gua Musang semasa cuti.",
      ],
    },
    {
      nama: "Kata Ganti Nama Diri",
      definisi: "Kata yang menggantikan nama seseorang dalam perbualan.",
      formula: "Ganti orang → saya/kami/kamu/awak/dia/mereka",
      contoh: ["saya", "kami", "awak", "kamu", "dia", "mereka", "beliau"],
      contohAyat: [
        "Saya suka membaca buku.",
        "Mereka pergi ke padang petang tadi.",
        "Beliau ialah pengetua sekolah kami.",
      ],
    },
    {
      nama: "Kata Ganti Nama Tunjuk",
      definisi: "Kata yang menunjuk arah atau kedudukan sesuatu benda.",
      formula: "ini (dekat) / itu (jauh)",
      contoh: ["ini", "itu", "sini", "situ", "sana"],
      contohAyat: [
        "Ambil buku ini.",
        "Siapakah yang tinggal di sana?",
        "Letak beg itu di sudut bilik.",
      ],
    },
    {
      nama: "Kata Ganti Nama Tanya",
      definisi: "Kata yang digunakan untuk bertanya tentang orang atau benda.",
      formula: "siapa / apa / mana / yang mana",
      contoh: ["siapa", "apa", "mana", "yang mana"],
      contohAyat: [
        "Siapa yang datang tadi?",
        "Apa yang berlaku semalam?",
        "Mana buku saya?",
      ],
    },
  ],

  contohHarian: {
    harian: [
      "Ibu memasak nasi goreng untuk makan malam. ('Ibu', 'nasi goreng', 'makan malam' = Kata Nama)",
      "Kucing kami tidur di atas sofa. ('Kucing', 'sofa' = Kata Nama Am)",
      "Ahmad pergi ke kedai buku bersama adiknya. ('Ahmad' = Nama Khas, 'kedai buku', 'adik' = Nama Am)",
      "Kegembiraan terpancar di wajahnya. ('Kegembiraan', 'wajah' = Kata Nama abstrak)",
      "Telefon bimbit itu terjatuh ke lantai. ('Telefon bimbit', 'lantai' = Kata Nama Am)",
    ],
    sekolah: [
      "Guru besar kami berucap di perhimpunan pagi. ('Guru besar', 'perhimpunan' = Kata Nama)",
      "Buku teks Bahasa Melayu tertinggal di kelas. (semua yang ditebal = Kata Nama)",
      "Pertandingan pidato akan diadakan di Dewan Sri Pinang. ('Dewan Sri Pinang' = Nama Khas)",
      "Kantin sekolah menjual pelbagai jenis makanan. ('Kantin', 'sekolah', 'makanan' = Kata Nama)",
      "Kami berbincang tentang projek sains. ('projek sains' = Kata Nama)",
    ],
    peperiksaan: [
      "Keberanian pahlawan itu dipuji oleh semua. (soal: apa yang dipuji? → 'Keberanian' = KN abstrak)",
      "Malaysia ialah sebuah negara yang aman. ('Malaysia' = KN Khas, 'negara' = KN Am)",
      "Dia menyimpan rahsia besar daripada keluarganya. ('rahsia' = KN abstrak, 'keluarga' = KN Am)",
      "Kejayaan pelajar itu membanggakan ibu bapanya. ('Kejayaan', 'pelajar', 'ibu bapa' = KN)",
      "Sungai Perak terkenal dengan penghasilan perak. ('Sungai Perak' = KN Khas, 'perak' = KN Am)",
    ],
  },

  tipsUASA: {
    kerap: [
      "Soalan sering minta 'kenal pasti kata nama' dalam petikan — biasanya 3–5 perkataan.",
      "Kata nama khas SELALU bermula huruf besar — ini tanda mudah!",
      "Kata ganti nama 'mereka', 'kami', 'dia' selalu keluar dalam soalan tatabahasa.",
      "Soalan tatabahasa sering bagi ayat dengan ruang kosong — pilih KN yang sesuai.",
    ],
    pemeriksa: [
      "Pemeriksa cari calon yang boleh BEZAKAN kata nama am dan nama khas dengan betul.",
      "Jawab dengan lengkap: tulis perkataan + jenis (cth: 'kucing' → Kata Nama Am).",
      "Jangan tulis huruf besar untuk kata nama am — ini kesalahan biasa yang tolak markah.",
    ],
    format: [
      "Format kenal pasti: 'Perkataan _____ ialah kata nama am/khas.'",
      "Format isi tempat kosong: pilih perkataan yang menjadi subjek atau objek ayat.",
      "Format pembetulan: tukar kata nama yang salah jenis kepada yang betul.",
    ],
  },

  kesalahan: [
    {
      salah: "Saya suka makan di kedai Makan.",
      sebabSalah: "'Makan' bukan nama khas, tidak perlu huruf besar.",
      betul: "Saya suka makan di kedai makan.",
      sebabBetul: "'kedai makan' adalah kata nama am, huruf kecil.",
    },
    {
      salah: "siti pergi ke kuala lumpur semalam.",
      sebabSalah: "'Siti' dan 'Kuala Lumpur' adalah kata nama khas, mesti huruf besar.",
      betul: "Siti pergi ke Kuala Lumpur semalam.",
      sebabBetul: "Nama orang dan nama tempat = kata nama khas = huruf besar.",
    },
    {
      salah: "Mereka membeli buah-Buahan di pasar.",
      sebabSalah: "'Buahan' di tengah ayat bukan nama khas, tidak perlu huruf besar.",
      betul: "Mereka membeli buah-buahan di pasar.",
      sebabBetul: "'buah-buahan' adalah kata nama am, semua huruf kecil.",
    },
    {
      salah: "Beliau ialah doktor yang pakar.",
      sebabSalah: "Tiada kesalahan di sini — 'Beliau' adalah kata ganti nama diri yang betul untuk orang yang dihormati.",
      betul: "Beliau ialah doktor yang pakar. ✓",
      sebabBetul: "'Beliau' digunakan untuk orang yang dihormati seperti guru, doktor, pengetua.",
    },
    {
      salah: "Kami pergi bercuti ke pulau Langkawi.",
      sebabSalah: "'Langkawi' adalah sebahagian nama khas, maka 'Pulau Langkawi' keseluruhan adalah nama khas.",
      betul: "Kami pergi bercuti ke Pulau Langkawi.",
      sebabBetul: "Nama pulau khusus = Kata Nama Khas = huruf besar pada semua kata.",
    },
  ],

  caraMudahIngat: {
    akronim: {
      kata: "BOTP",
      makna: "Benda · Orang · Tempat · Perkara (abstrak) — 4 jenis Kata Nama!",
    },
    visualMemory: [
      "Bayangkan kad nama seseorang — nama di kad = KATA NAMA KHAS (huruf besar, unik).",
      "Bayangkan senarai barang di kedai — semua benda dalam senarai = KATA NAMA AM.",
      "Kata Ganti Nama = cermin → ia 'memantulkan' (menggantikan) nama orang.",
    ],
    petua: [
      "Nama khas = nama yang ada di peta, di kad pengenalan, di papan tanda = HURUF BESAR.",
      "Tanya 'boleh ada banyak?' → Ya = Kata Nama Am. 'Hanya satu?' → Kata Nama Khas.",
      "Kata ganti nama TIDAK boleh digabung dengan penjodoh bilangan (bukan 'seorang dia').",
    ],
  },

  kbat: [
    {
      situasi:
        "Anda membaca petikan berikut: 'Aminah berlari menuju ke Balai Polis Sentul. Dia melaporkan kehilangan beg tangannya yang berharga itu kepada pegawai bertugas.'",
      soalan:
        "Kenal pasti DUA kata nama khas dan DUA kata nama am daripada petikan di atas. Berikan sebab bagi setiap pilihan anda.",
      jawapanModel:
        "Kata Nama Khas: (1) 'Aminah' — nama seseorang yang khusus, (2) 'Balai Polis Sentul' — nama tempat yang khusus. Kata Nama Am: (1) 'beg tangan' — merujuk benda secara umum, (2) 'pegawai' — merujuk orang secara umum tanpa nama khusus.",
      penjelasan:
        "Soalan KBAT ini menguji keupayaan membezakan nama khas (huruf besar, unik) dan nama am (huruf kecil, boleh banyak). Kata ganti nama 'Dia' tidak termasuk dalam kategori ini.",
    },
    {
      situasi:
        "Cikgu memberikan ayat: 'kucingnya berlari ke taman bunga.'",
      soalan:
        "Ayat di atas mempunyai DUA kesalahan yang berkaitan dengan kata nama. Kenal pasti dan betulkan.",
      jawapanModel:
        "Kesalahan 1: 'kucingnya' — ayat bermula dengan huruf kecil. Betul: 'Kucingnya'. Kesalahan 2: Tiada kesalahan lain pada kata nama — 'taman bunga' adalah kata nama am yang betul dengan huruf kecil. NAMUN jika 'Taman Bunga' adalah nama taman yang khusus, maka mesti huruf besar.",
      penjelasan:
        "Ayat mesti bermula dengan huruf besar. Nama taman yang khusus (nama khas) perlu huruf besar pada setiap kata.",
    },
  ],

  kuiz: [
    {
      q: "Antara berikut, yang manakah KATA NAMA KHAS?",
      options: ["kucing", "sungai", "Putrajaya", "kereta"],
      answer: 2,
      explanation: "'Putrajaya' adalah nama tempat yang khusus → Kata Nama Khas.",
    },
    {
      q: "Ayat: 'Dia membeli buku di kedai.' Kata ganti nama dalam ayat ini ialah?",
      options: ["buku", "kedai", "membeli", "Dia"],
      answer: 3,
      explanation: "'Dia' menggantikan nama seseorang → Kata Ganti Nama Diri.",
    },
    {
      q: "Kata nama am merujuk kepada?",
      options: [
        "Nama orang yang terkenal sahaja",
        "Nama biasa untuk benda, orang, atau tempat",
        "Nama yang bermula dengan huruf besar",
        "Nama yang hanya ada satu di dunia",
      ],
      answer: 1,
      explanation: "Kata Nama Am = nama BIASA yang boleh ada banyak contohnya.",
    },
    {
      q: "Pilih ayat yang menggunakan huruf besar dengan BETUL.",
      options: [
        "kami pergi ke Pulau Pinang.",
        "Kami pergi ke pulau pinang.",
        "Kami pergi ke Pulau Pinang.",
        "kami Pergi ke pulau Pinang.",
      ],
      answer: 2,
      explanation: "Ayat bermula huruf besar + nama khas 'Pulau Pinang' huruf besar.",
    },
    {
      q: "Perkataan 'ini' dan 'itu' tergolong dalam?",
      options: [
        "Kata Nama Am",
        "Kata Ganti Nama Tunjuk",
        "Kata Ganti Nama Tanya",
        "Kata Nama Khas",
      ],
      answer: 1,
      explanation: "'ini' dan 'itu' menunjuk arah/kedudukan → Kata Ganti Nama Tunjuk.",
    },
    {
      q: "Antara perkataan berikut, yang BUKAN kata nama ialah?",
      options: ["keberanian", "berlari", "kasih sayang", "kejayaan"],
      answer: 1,
      explanation: "'berlari' adalah kata kerja. Yang lain adalah kata nama abstrak.",
    },
    {
      q: "Kata penjodoh bilangan yang sesuai untuk 'sungai' ialah?",
      options: ["seekor", "sehelai", "sebuah", "sebatang"],
      answer: 3,
      explanation: "'sebatang sungai' — penjodoh bilangan untuk sungai/jalan/pena ialah 'batang'.",
    },
    {
      q: "Dalam ayat 'Mereka suka bermain di padang', perkataan manakah yang KATA GANTI NAMA?",
      options: ["bermain", "padang", "suka", "Mereka"],
      answer: 3,
      explanation: "'Mereka' menggantikan nama sekumpulan orang → Kata Ganti Nama Diri.",
    },
    {
      q: "Nama 'Hari Raya Aidilfitri' tergolong dalam?",
      options: ["Kata Nama Am", "Kata Kerja", "Kata Nama Khas", "Kata Sifat"],
      answer: 2,
      explanation: "Nama hari kebesaran yang khusus = Kata Nama Khas (huruf besar tiap kata).",
    },
    {
      q: "Siapakah yang betul diwakili oleh kata 'beliau'?",
      options: [
        "Kawan akrab yang sebaya",
        "Diri sendiri",
        "Orang yang dihormati seperti guru atau doktor",
        "Haiwan peliharaan",
      ],
      answer: 2,
      explanation: "'Beliau' = kata ganti diri hormat untuk orang yang dihormati.",
    },
  ],

  examBooster: {
    rumusan: [
      "Kata Nama = nama bagi BENDA, ORANG, TEMPAT, PERKARA ABSTRAK",
      "Nama Khas = huruf BESAR, unik (Siti, Kuala Lumpur, Hari Raya)",
      "Nama Am = huruf kecil, boleh ramai/banyak (murid, kereta, kebaikan)",
      "Kata Ganti Nama = ganti nama orang (saya, dia, mereka, beliau)",
      "Kata Ganti Tunjuk = ini (dekat), itu (jauh)",
      "TIPS: Tanya 'APA?' atau 'SIAPA?' → jawapan = KATA NAMA",
    ],
    lastMinuteTips: [
      "Semua nama orang + tempat khusus = HURUF BESAR selalu.",
      "Kata abstrak (kegembiraan, kejayaan, kasih sayang) = KATA NAMA juga!",
      "'Beliau' untuk orang dihormati, 'dia' untuk orang biasa.",
      "Dalam soalan petikan — cari kata yang boleh disertai 'sebuah/seorang/seekor' = kata nama.",
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// 2. KATA ADJEKTIF
// ─────────────────────────────────────────────────────────────
const kataAdjektif: SistemBahasaTopic = {
  id: "kata-adjektif",
  tajuk: "Kata Adjektif",
  subtitle: "Kata yang menerangkan sifat, keadaan, dan ciri sesuatu benda",
  difficulty: "Asas",
  masaBelajar: "25 minit",
  warna: "#34D399",

  pengenalan:
    "Bayangkan kamu mahu ceritakan tentang kucing kamu. Kamu boleh kata 'kucing' sahaja — tapi itu membosankan! Bila kamu kata 'kucing COMEL yang BERBULU LEBAT dan NAKAL' — itulah kuasa KATA ADJEKTIF. Kata adjektif membuat ayat kita lebih hidup, lebih jelas, dan lebih menarik!",

  definisi: {
    teks: "Kata Adjektif (juga dikenali sebagai Kata Sifat) ialah kata yang menerangkan sifat, keadaan, perasaan, atau ciri sesuatu kata nama.",
    ciri: [
      "Hadir selepas kata nama yang diterangkan",
      "Boleh didahului oleh kata penguat (sangat, amat, paling, terlalu)",
      "Boleh dibandingkan menggunakan 'lebih... daripada' atau 'paling'",
      "Boleh diulang untuk menyatakan darjat (cantik-cantik, besar-besar)",
    ],
    ringkasan:
      "Kaedah mudah: Kalau boleh letak 'sangat' depannya dan ayat masih betul — ia KATA ADJEKTIF! (sangat cantik ✓, sangat berlari ✗)",
  },

  cikguTerang: {
    intro:
      "Cikgu AcadeMy ajar cara cepat kenal Kata Adjektif: guna ujian 'SANGAT'. Tapi ada banyak lagi cara. Jom belajar langkah demi langkah!",
    langkah: [
      {
        tajuk: "Langkah 1 — Ujian 'SANGAT'",
        teks: "Letak 'sangat' sebelum perkataan. Kalau ayat masih logik → Kata Adjektif!",
        contoh: "'cantik' → 'sangat cantik' ✓ | 'berlari' → 'sangat berlari' ✗",
      },
      {
        tajuk: "Langkah 2 — Cari kata nama yang diterangkan",
        teks: "Kata adjektif SELALU menerangkan kata nama. Cari kata nama dahulu, kemudian cari penerangnya.",
        contoh: "'rumah BESAR' → 'rumah' = kata nama, 'besar' = kata adjektif",
      },
      {
        tajuk: "Langkah 3 — Kesan kata penguat",
        teks: "Kata adjektif sering hadir bersama penguat: sangat, amat, paling, terlalu, agak, cukup.",
        contoh: "'sangat rajin', 'amat bijak', 'paling cepat', 'terlalu malas'",
      },
      {
        tajuk: "Langkah 4 — Kenal darjah perbandingan",
        teks: "Kata adjektif boleh dibandingkan dalam 3 darjah: biasa, lebih (komparatif), paling (superlatif).",
        contoh: "tinggi → lebih tinggi daripada Ali → paling tinggi di kelas",
      },
    ],
    petua:
      "Dalam karangan, guna pelbagai kata adjektif untuk markah bahasa yang tinggi. Jangan guna 'cantik' atau 'bagus' sahaja — guna 'memukau', 'menawan', 'menakjubkan'!",
  },

  jenis: [
    {
      nama: "Kata Adjektif Sifatan",
      definisi: "Menerangkan rupa, warna, ukuran, atau sifat fizikal sesuatu benda.",
      formula: "Kata Nama + Kata Adjektif Sifatan",
      contoh: ["cantik", "hodoh", "besar", "kecil", "merah", "bulat", "panjang"],
      contohAyat: [
        "Bunga itu cantik sekali.",
        "Beg besar itu berat.",
        "Langit biru kelihatan cerah.",
      ],
    },
    {
      nama: "Kata Adjektif Perasaan",
      definisi: "Menerangkan perasaan atau emosi seseorang.",
      formula: "Subjek + rasa/berasa + Kata Adjektif Perasaan",
      contoh: ["gembira", "sedih", "marah", "takut", "malu", "rindu", "bimbang"],
      contohAyat: [
        "Dia berasa gembira mendapat hadiah.",
        "Ibu berasa bimbang apabila anaknya lewat pulang.",
        "Adik takut melihat ular itu.",
      ],
    },
    {
      nama: "Kata Adjektif Bilangan",
      definisi: "Menerangkan kuantiti atau jumlah sesuatu benda.",
      formula: "Kata Bilangan + Kata Nama",
      contoh: ["semua", "beberapa", "sebilangan", "segelintir", "banyak", "sedikit"],
      contohAyat: [
        "Semua murid hadir ke perhimpunan.",
        "Beberapa orang tidak faham soalan itu.",
        "Segelintir pelajar mendapat markah penuh.",
      ],
    },
    {
      nama: "Kata Adjektif Waktu",
      definisi: "Menerangkan masa atau waktu berlakunya sesuatu.",
      formula: "Masa + Kata Adjektif Waktu",
      contoh: ["awal", "lewat", "lama", "baru", "terkini", "lampau"],
      contohAyat: [
        "Berita terkini itu menakjubkan.",
        "Dia tiba awal ke majlis itu.",
        "Kisah lampau itu masih diingati.",
      ],
    },
    {
      nama: "Kata Adjektif Cara",
      definisi: "Menerangkan cara atau gaya sesuatu berlaku.",
      formula: "Kata Kerja + dengan + Kata Adjektif Cara",
      contoh: ["cepat", "lambat", "perlahan", "kuat", "lembut", "berani"],
      contohAyat: [
        "Dia berlari dengan cepat.",
        "Cikgu menerangkan dengan perlahan.",
        "Pahlawan itu bertempur dengan berani.",
      ],
    },
    {
      nama: "Kata Adjektif Jarak",
      definisi: "Menerangkan kedudukan atau jarak sesuatu dari tempat rujukan.",
      formula: "Kata Nama + Kata Adjektif Jarak",
      contoh: ["dekat", "jauh", "hampir", "berdekatan", "terpencil"],
      contohAyat: [
        "Sekolah itu dekat dengan rumah saya.",
        "Kampung itu terpencil di ceruk hutan.",
        "Kedai runcit berdekatan ditutup semalam.",
      ],
    },
  ],

  contohHarian: {
    harian: [
      "Ibu memasak nasi yang LAZAT untuk kami. ('lazat' menerangkan 'nasi')",
      "Kucing berbulu LEBAT itu tidur di atas kerusi EMPUK. (2 kata adjektif sifatan)",
      "Adik berasa GEMBIRA kerana mendapat hadiah. ('gembira' = kata adjektif perasaan)",
      "Jalan itu SEMPIT dan BERLUBANG-LUBANG. (2 kata adjektif sifatan)",
      "Kek yang MANIS itu dimakan oleh SEMUA ahli keluarga. (sifatan + bilangan)",
    ],
    sekolah: [
      "Murid RAJIN itu mendapat tempat pertama. ('rajin' menerangkan 'murid')",
      "Dewan LUAS sekolah kami boleh memuatkan 1000 orang. ('luas' = adjektif sifatan)",
      "Guru PENYABAR itu disenangi semua murid. ('penyabar' = adjektif sifatan)",
      "BEBERAPA pelajar tidak menyiapkan kerja rumah. ('beberapa' = adjektif bilangan)",
      "Pertandingan berlangsung dengan MERIAH. ('meriah' = adjektif cara)",
    ],
    peperiksaan: [
      "Pemandangan INDAH di tepi pantai itu menenangkan jiwa. ('indah' = adjektif sifatan)",
      "Rakyat SETIA itu mempertahankan tanah air dengan GIGIH. (2 kata adjektif)",
      "SEMUA usaha yang IKHLAS pasti membuahkan hasil. ('semua' + 'ikhlas' = adjektif)",
      "Dia berasa BANGGA dengan pencapaian anaknya. ('bangga' = adjektif perasaan)",
      "Cabaran yang BERAT itu dihadapi dengan TENANG. (2 kata adjektif)",
    ],
  },

  tipsUASA: {
    kerap: [
      "Soalan sering minta 'kenal pasti kata adjektif' dalam petikan — cari kata yang menerangkan kata nama.",
      "Darjah perbandingan kerap disoal: biasa / lebih...daripada / paling.",
      "Kata penguat (sangat, amat, terlalu) BUKAN kata adjektif — ia hanya penguat.",
      "Soalan lengkap ayat: pilih kata adjektif yang sesuai dari konteks.",
    ],
    pemeriksa: [
      "Jangan keliru antara kata adjektif dan kata penguat — 'sangat' bukan adjektif!",
      "Bezakan adjektif sifatan (rupa/warna/saiz) dengan adjektif perasaan (emosi).",
      "Dalam karangan, pemeriksa beri markah tinggi untuk variasi kata adjektif.",
    ],
    format: [
      "Format kenal pasti: 'Perkataan _____ ialah kata adjektif _____ kerana ia menerangkan _____.'",
      "Format darjah perbandingan: biasa → lebih... daripada → paling...",
      "Format isi tempat: pilih adjektif yang logik mengikut konteks ayat.",
    ],
  },

  kesalahan: [
    {
      salah: "Bunga itu sangat cantik sekali.",
      sebabSalah: "'Sangat' dan 'sekali' tidak boleh digunakan serentak — ia berulang makna.",
      betul: "Bunga itu sangat cantik. / Bunga itu cantik sekali.",
      sebabBetul: "Gunakan SATU sahaja penguat dalam ayat.",
    },
    {
      salah: "Dia lebih tinggi berbanding Ahmad.",
      sebabSalah: "Dalam BM, perbandingan menggunakan 'lebih... daripada', bukan 'berbanding'.",
      betul: "Dia lebih tinggi daripada Ahmad.",
      sebabBetul: "Kata hubung perbandingan dalam BM = 'daripada'.",
    },
    {
      salah: "Murid-murid paling rajin di antara semua kelas.",
      sebabSalah: "'Paling' tidak perlu disertai 'di antara' — ia sudah menunjukkan tahap tertinggi.",
      betul: "Murid-murid itu paling rajin di kelas.",
      sebabBetul: "'Paling' sudah cukup untuk menyatakan darjah superlatif.",
    },
    {
      salah: "Baju ini merah-merah warnanya.",
      sebabSalah: "Pengulangan kata adjektif warna tidak tepat — bermakna 'banyak yang merah'.",
      betul: "Baju ini berwarna merah. / Baju-baju ini berwarna merah.",
      sebabBetul: "Untuk satu benda, guna bentuk biasa; pengulangan untuk menyatakan banyak.",
    },
    {
      salah: "Dia berasa sangat sedih amat.",
      sebabSalah: "Tidak boleh letak dua penguat ('sangat' dan 'amat') dalam satu frasa.",
      betul: "Dia berasa sangat sedih. / Dia berasa amat sedih.",
      sebabBetul: "Satu frasa adjektif hanya memerlukan SATU kata penguat.",
    },
  ],

  caraMudahIngat: {
    akronim: {
      kata: "SPBWCJ",
      makna: "Sifatan · Perasaan · Bilangan · Waktu · Cara · Jarak — 6 jenis Kata Adjektif!",
    },
    visualMemory: [
      "Bayangkan adjektif sebagai 'baju' untuk kata nama — ia 'menghiasi' dan 'menerangkan' kata nama.",
      "Darjah perbandingan = tangga 3 anak tangga: BIASA → LEBIH → PALING.",
      "Ujian 'SANGAT' = ujian doktor untuk adjektif. Kalau lulus ujian, ia adjektif!",
    ],
    petua: [
      "Adjektif SELALU dekat dengan kata nama yang diterangkannya.",
      "'Sangat', 'amat', 'terlalu', 'paling' = PENGUAT sahaja, bukan adjektif.",
      "Adjektif perasaan = emosi (gembira, sedih, marah, takut, malu).",
    ],
  },

  kbat: [
    {
      situasi:
        "Baca petikan ini: 'Pelajar CEMERLANG itu berjaya mendapat keputusan yang MEMBANGGAKAN dalam peperiksaan PENENTUAN. Guru-guru yang DEDIKASI memuji usaha GIGIH pelajar tersebut.'",
      soalan:
        "Kenal pasti TIGA kata adjektif dalam petikan dan nyatakan kata nama yang diterangkan oleh setiap kata adjektif tersebut.",
      jawapanModel:
        "(1) 'cemerlang' menerangkan 'Pelajar'. (2) 'membanggakan' menerangkan 'keputusan'. (3) 'dedikasi' menerangkan 'Guru-guru'. (Bonus: 'gigih' menerangkan 'usaha'.)",
      penjelasan:
        "Cara kenal pasti: cari kata nama dahulu, kemudian cari kata yang menerangkan kata nama tersebut — itulah kata adjektif.",
    },
    {
      situasi:
        "Tugas anda: Tulis semula ayat dengan menukar kata adjektif kepada darjah yang diminta. Ayat asal: 'Ali tinggi.'",
      soalan:
        "Tulis ayat dalam (a) darjah biasa, (b) darjah lebih, (c) darjah paling, dengan membandingkan Ali dengan Borhan.",
      jawapanModel:
        "(a) Ali tinggi. (b) Ali lebih tinggi daripada Borhan. (c) Ali paling tinggi antara semua pelajar.",
      penjelasan:
        "Tiga darjah perbandingan: biasa (tiada perbandingan), komparatif (lebih... daripada), superlatif (paling / ter-).",
    },
  ],

  kuiz: [
    {
      q: "Kata adjektif berfungsi untuk?",
      options: [
        "Menerangkan perbuatan",
        "Menerangkan sifat atau keadaan kata nama",
        "Menghubungkan dua ayat",
        "Menyatakan waktu berlakunya sesuatu",
      ],
      answer: 1,
      explanation: "Kata adjektif menerangkan sifat, keadaan, atau ciri sesuatu kata nama.",
    },
    {
      q: "Dalam ayat 'Budak nakal itu dimarahi guru', kata adjektif ialah?",
      options: ["Budak", "nakal", "dimarahi", "guru"],
      answer: 1,
      explanation: "'nakal' menerangkan sifat 'Budak' → kata adjektif sifatan.",
    },
    {
      q: "Perkataan manakah BUKAN kata adjektif?",
      options: ["gembira", "berlari", "cantik", "rajin"],
      answer: 1,
      explanation: "'berlari' adalah kata kerja, bukan kata adjektif.",
    },
    {
      q: "Ujian mudah untuk mengenal kata adjektif ialah meletakkan _____ sebelum perkataan tersebut.",
      options: ["sudah", "sedang", "sangat", "sudah"],
      answer: 2,
      explanation: "Ujian 'SANGAT': jika 'sangat + perkataan' masih logik → kata adjektif.",
    },
    {
      q: "Ayat manakah menggunakan darjah perbandingan dengan BETUL?",
      options: [
        "Dia lebih tinggi berbanding Ali.",
        "Dia lebih tinggi daripada Ali.",
        "Dia paling tinggi dari Ali.",
        "Dia lebih tinggi dari Ali.",
      ],
      answer: 1,
      explanation: "Darjah komparatif BM = 'lebih... daripada' (bukan 'dari' atau 'berbanding').",
    },
    {
      q: "'Sangat', 'amat', 'terlalu' tergolong dalam?",
      options: ["Kata Adjektif", "Kata Penguat", "Kata Nama", "Kata Kerja"],
      answer: 1,
      explanation: "'Sangat', 'amat', 'terlalu' = Kata Penguat — bukan kata adjektif itu sendiri.",
    },
    {
      q: "Kata adjektif perasaan ialah?",
      options: ["besar", "merah", "gembira", "jauh"],
      answer: 2,
      explanation: "'gembira' menerangkan perasaan/emosi → kata adjektif perasaan.",
    },
    {
      q: "Ayat: 'Dia berasa sangat sedih amat.' Apa kesalahan dalam ayat ini?",
      options: [
        "Tiada kesalahan",
        "Salah ejaan 'sedih'",
        "Dua penguat digunakan serentak",
        "Kata adjektif salah jenis",
      ],
      answer: 2,
      explanation: "'Sangat' dan 'amat' tidak boleh digunakan serentak dalam satu frasa.",
    },
    {
      q: "'Pelajar-pelajar cemerlang mendapat biasiswa.' Kata adjektif dalam ayat ini ialah?",
      options: ["Pelajar-pelajar", "mendapat", "cemerlang", "biasiswa"],
      answer: 2,
      explanation: "'cemerlang' menerangkan sifat 'Pelajar-pelajar' → kata adjektif.",
    },
    {
      q: "Darjah SUPERLATIF kata adjektif 'pantas' ialah?",
      options: ["sangat pantas", "lebih pantas", "paling pantas", "agak pantas"],
      answer: 2,
      explanation: "Superlatif = paling (atau awalan ter-): 'paling pantas' / 'terpantas'.",
    },
  ],

  examBooster: {
    rumusan: [
      "Kata Adjektif = kata yang menerangkan SIFAT/KEADAAN kata nama",
      "6 jenis: Sifatan, Perasaan, Bilangan, Waktu, Cara, Jarak",
      "Ujian 'SANGAT' — letak 'sangat' depan: logik = adjektif",
      "Kata Penguat (sangat/amat/terlalu) BUKAN adjektif — ia penegas adjektif",
      "3 darjah: biasa → lebih...daripada → paling/ter-",
      "Jangan campurkan dua penguat dalam satu frasa!",
    ],
    lastMinuteTips: [
      "Cari kata nama dahulu dalam ayat, kemudian cari penerangnya = adjektif.",
      "Darjah komparatif BM: 'lebih... DARIPADA' (bukan 'dari' atau 'berbanding').",
      "Dalam karangan: variasikan adjektif untuk markah bahasa tinggi.",
      "Adjektif perasaan = emosi (gembira, sedih, marah, takut, rindu, malu).",
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// 3. KATA TUGAS
// ─────────────────────────────────────────────────────────────
const kataTugas: SistemBahasaTopic = {
  id: "kata-tugas",
  tajuk: "Kata Tugas",
  subtitle: "Kata yang menjalankan tugas nahu tanpa makna tersendiri",
  difficulty: "Sederhana",
  masaBelajar: "30 minit",
  warna: "#A78BFA",

  pengenalan:
    "Kalau kata nama adalah 'bintang' dan kata kerja adalah 'penari', maka Kata Tugas adalah 'pengarah pentas' — kita tak nampak dia, tapi tanpa dia ayat tak jalan! Kata Tugas menghubungkan, menerangkan arah, menyatakan hubungan, dan memberi makna tambahan kepada ayat.",

  definisi: {
    teks: "Kata Tugas ialah kata yang tidak boleh berdiri sendiri sebagai subjek atau predikat, tetapi berfungsi membantu kata-kata lain membina ayat yang gramatis dan bermakna.",
    ciri: [
      "Tidak boleh berdiri sendiri — perlu kata lain untuk memberi makna",
      "Tidak berubah bentuk (tidak boleh diimbuhkan)",
      "Jumlahnya tetap dan terhad dalam bahasa Melayu",
      "Mempunyai pelbagai fungsi nahu yang berbeza",
    ],
    ringkasan:
      "Kata Tugas = 'lem' yang menyatukan semua bahagian ayat. Tanpanya, ayat jadi berpecah-pecah.",
  },

  cikguTerang: {
    intro:
      "Cikgu AcadeMy guna analogi 'kereta api' untuk Kata Tugas. Gerbong (kata nama/kerja) tak boleh bergerak tanpa rel (kata tugas). Rel tak kelihatan tapi SANGAT penting!",
    langkah: [
      {
        tajuk: "Langkah 1 — Kenal Kata Sendi Nama",
        teks: "Kata yang hadir sebelum kata nama untuk menunjukkan hubungan: tempat, masa, arah, milik.",
        contoh: "di sekolah, ke pasar, dari rumah, untuk ibu, dengan kawan, oleh murid",
      },
      {
        tajuk: "Langkah 2 — Kenal Kata Hubung",
        teks: "Kata yang menghubungkan dua klausa atau ayat: dan, atau, tetapi, kerana, walaupun, supaya.",
        contoh: "Ali DAN Abu pergi. Dia sakit TETAPI datang juga. Dia belajar KERANA nak berjaya.",
      },
      {
        tajuk: "Langkah 3 — Kenal Kata Penguat",
        teks: "Memperkuat kata adjektif: sangat, amat, terlalu, paling, agak, cukup.",
        contoh: "SANGAT cantik, AMAT bijak, TERLALU malas, PALING tinggi",
      },
      {
        tajuk: "Langkah 4 — Kenal Kata Nafi",
        teks: "Menidakkan kata kerja atau kata adjektif: tidak, bukan, tak, tiada.",
        contoh: "TIDAK pergi, BUKAN dia, TAK mahu, TIADA air",
      },
    ],
    petua:
      "Dalam ujian, soalan kata tugas sering bentuk 'isi tempat kosong'. Baca konteks ayat → tentukan hubungan yang diperlukan → pilih kata tugas yang sesuai.",
  },

  jenis: [
    {
      nama: "Kata Sendi Nama",
      definisi: "Kata yang hadir sebelum kata nama untuk menunjukkan hubungan tempat, masa, arah, atau lain-lain.",
      formula: "Kata Sendi Nama + Kata Nama",
      contoh: ["di", "ke", "dari", "daripada", "pada", "kepada", "untuk", "oleh", "dengan", "tentang"],
      contohAyat: [
        "Dia pergi KE sekolah setiap pagi.",
        "Buku itu UNTUK adik saya.",
        "Surat itu ditulis OLEH pengarah.",
      ],
    },
    {
      nama: "Kata Hubung",
      definisi: "Kata yang menghubungkan dua kata, frasa, atau klausa.",
      formula: "Klausa 1 + Kata Hubung + Klausa 2",
      contoh: ["dan", "atau", "tetapi", "kerana", "walaupun", "supaya", "apabila", "semasa", "jika", "bahawa"],
      contohAyat: [
        "Dia belajar SUPAYA mendapat keputusan cemerlang.",
        "WALAUPUN hujan, dia tetap datang.",
        "Dia tidak tahu BAHAWA kawan telah pulang.",
      ],
    },
    {
      nama: "Kata Penguat",
      definisi: "Kata yang memperkuat makna kata adjektif.",
      formula: "Kata Penguat + Kata Adjektif",
      contoh: ["sangat", "amat", "terlalu", "paling", "agak", "cukup", "sekali", "benar"],
      contohAyat: [
        "Budak itu SANGAT rajin.",
        "Soalan ini AGAK susah.",
        "Dia AMAT bersyukur.",
      ],
    },
    {
      nama: "Kata Nafi",
      definisi: "Kata yang menidakkan sesuatu kata kerja, adjektif, atau nama.",
      formula: "Kata Nafi + Kata Kerja/Adjektif",
      contoh: ["tidak", "bukan", "tak", "tiada", "belum"],
      contohAyat: [
        "Dia TIDAK pergi ke sekolah semalam.",
        "BUKAN dia yang melakukan perkara itu.",
        "Air di kolam itu TIADA lagi.",
      ],
    },
    {
      nama: "Kata Tanya",
      definisi: "Kata yang digunakan untuk membina ayat tanya.",
      formula: "Kata Tanya + Ayat / Ayat + Kata Tanya",
      contoh: ["apa", "siapa", "bila", "di mana", "mengapa", "bagaimana", "berapa"],
      contohAyat: [
        "SIAPA yang memecahkan cermin itu?",
        "MENGAPA kamu tidak hadir semalam?",
        "BAGAIMANA cara membuat kek itu?",
      ],
    },
    {
      nama: "Kata Seru",
      definisi: "Kata yang menyatakan perasaan atau seruan secara spontan.",
      formula: "Kata Seru + !",
      contoh: ["amboi", "wah", "aduh", "eh", "syabas", "aduhai", "wahai"],
      contohAyat: [
        "WAH, cantiknya pemandangan ini!",
        "ADUH, sakitnya lutut saya!",
        "SYABAS, kamu berjaya!",
      ],
    },
  ],

  contohHarian: {
    harian: [
      "Ibu pergi KE pasar untuk membeli sayur. ('ke' = kata sendi nama arah)",
      "Ayah DAN ibu pergi bekerja setiap pagi. ('dan' = kata hubung gabungan)",
      "Adik TIDAK mahu makan sayur. ('tidak' = kata nafi)",
      "WAH, sedapnya makanan ini! ('wah' = kata seru)",
      "Kucing itu duduk DI atas kerusi. ('di' = kata sendi nama tempat)",
    ],
    sekolah: [
      "Murid-murid DARIPADA kelas 1 Bestari memenangi pertandingan. ('daripada' = kata sendi nama asal)",
      "Dia belajar keras SUPAYA lulus peperiksaan. ('supaya' = kata hubung tujuan)",
      "Guru SANGAT gembira dengan prestasi kelas. ('sangat' = kata penguat)",
      "BILA kamu akan hantar kerja rumah? ('bila' = kata tanya masa)",
      "Dia BELUM siap kerja projek sains. ('belum' = kata nafi masa)",
    ],
    peperiksaan: [
      "Wira itu berjuang DENGAN gigih untuk mempertahankan negara. ('dengan' = kata sendi cara)",
      "WALAUPUN miskin, dia tetap bersemangat belajar. ('walaupun' = kata hubung konsesi)",
      "Kejayaan itu dicapai OLEH mereka yang berusaha. ('oleh' = kata sendi nama agen)",
      "Dia BUKAN pengkhianat; dia adalah wira sejati. ('bukan' = kata nafi untuk kata nama)",
      "APABILA negara dalam bahaya, rakyat bersatu. ('apabila' = kata hubung waktu)",
    ],
  },

  tipsUASA: {
    kerap: [
      "Kata sendi nama 'di', 'ke', 'dari' kerap disoal — bezakan penggunaannya.",
      "Kata nafi 'tidak' vs 'bukan': 'tidak' untuk kata kerja/adjektif, 'bukan' untuk kata nama.",
      "Kata hubung kerap disoal dalam soalan lengkap ayat — baca konteks untuk tentukan hubungan.",
      "Kata tanya sering keluar dalam bahagian membina ayat dan soal jawab.",
    ],
    pemeriksa: [
      "Pemeriksa kerap uji 'di' (tempat) vs 'ke' (arah/tujuan) — ini kesalahan paling biasa.",
      "'daripada' (asal/perbandingan) vs 'dari' (tempat/masa) — perbezaan halus tapi penting.",
      "Jangan tulis 'tidak' untuk menafi kata nama — guna 'bukan'.",
    ],
    format: [
      "Format isi tempat: baca ayat, tentukan hubungan yang diperlukan, pilih kata tugas.",
      "Format kenal pasti: nyatakan jenis kata tugas dan fungsinya dalam ayat.",
      "Format pembetulan: kenal pasti kata tugas yang salah dan gantikan dengan yang betul.",
    ],
  },

  kesalahan: [
    {
      salah: "Dia pergi di sekolah setiap hari.",
      sebabSalah: "'di' menyatakan tempat (keadaan statik). Pergi = bergerak → perlu 'ke'.",
      betul: "Dia pergi ke sekolah setiap hari.",
      sebabBetul: "'ke' = arah pergerakan. 'di' = berada di tempat (statik).",
    },
    {
      salah: "Buku ini bukan milik saya tidak.",
      sebabSalah: "Kata nafi tidak boleh diulang dalam ayat yang sama.",
      betul: "Buku ini bukan milik saya.",
      sebabBetul: "Satu kata nafi sudah mencukupi untuk menafi satu kenyataan.",
    },
    {
      salah: "Dia datang dari Kuala Lumpur ke Johor.",
      sebabSalah: "Sepatutnya 'dari' untuk asal dan 'ke' untuk destinasi — ini sebenarnya BETUL.",
      betul: "Dia datang dari Kuala Lumpur ke Johor. ✓",
      sebabBetul: "Ayat ini sebenarnya betul. 'dari' = asal, 'ke' = destinasi.",
    },
    {
      salah: "Saya tidak tahu siapa yang tidak hadir.",
      sebabSalah: "Tiada kesalahan tatabahasa — penggunaan 'tidak' dua kali dalam konteks berbeza adalah betul.",
      betul: "Saya tidak tahu siapa yang tidak hadir. ✓",
      sebabBetul: "Dua 'tidak' dalam konteks berbeza (satu menafi 'tahu', satu menafi 'hadir') adalah gramatis.",
    },
    {
      salah: "Hadiah itu diberikan daripada ibu kepada adik.",
      sebabSalah: "'daripada' digunakan untuk menyatakan asal atau perbandingan, bukan pemberi hadiah. Gunakan 'oleh'.",
      betul: "Hadiah itu diberikan oleh ibu kepada adik.",
      sebabBetul: "'oleh' = agen/pemberi dalam ayat pasif. 'daripada' = sumber/asal.",
    },
  ],

  caraMudahIngat: {
    akronim: {
      kata: "SENDI-HUBUNG-KUAT-NAFI",
      makna: "4 jenis utama Kata Tugas yang selalu keluar dalam UASA",
    },
    visualMemory: [
      "'di' = pin di peta (statik, tidak bergerak). 'ke' = anak panah menuju destinasi.",
      "Kata hubung = jambatan antara dua pulau (dua klausa).",
      "Kata nafi 'tidak' = tanda ✗ untuk kata kerja/adjektif. 'bukan' = tanda ✗ untuk kata nama.",
    ],
    petua: [
      "'di', 'ke', 'dari' ditulis BERASINGAN daripada kata nama (di sekolah, bukan disekolah).",
      "'tidak' untuk KK/KA: 'tidak pergi', 'tidak cantik'. 'bukan' untuk KN: 'bukan guru'.",
      "Kata sendi nama TIDAK boleh hadir berturutan tanpa kata nama di antaranya.",
    ],
  },

  kbat: [
    {
      situasi: "Ayat: 'Ahmad pergi _____ kedai buku _____ membeli buku teks.'",
      soalan: "Pilih kata tugas yang paling sesuai untuk mengisi kedua-dua tempat kosong dan jelaskan fungsi setiap kata tugas tersebut.",
      jawapanModel: "Tempat 1: 'ke' (kata sendi nama arah — menunjukkan destinasi pergerakan Ahmad). Tempat 2: 'untuk' (kata sendi nama tujuan — menunjukkan tujuan pergi ke kedai). Ayat lengkap: 'Ahmad pergi ke kedai buku untuk membeli buku teks.'",
      penjelasan: "Kata sendi nama dipilih berdasarkan hubungan yang hendak dinyatakan: arah (ke), tujuan (untuk), tempat statik (di), asal (dari/daripada).",
    },
    {
      situasi: "Pelajar menulis: 'Dia tidak bukan guru.'",
      soalan: "Kenal pasti kesalahan kata tugas dalam ayat di atas dan tulis ayat yang betul dengan penjelasan.",
      jawapanModel: "Kesalahan: menggunakan 'tidak' dan 'bukan' serentak. 'bukan' sudah menafikan kata nama 'guru'. 'tidak' adalah kata nafi untuk kata kerja/adjektif, bukan untuk kata nama. Ayat betul: 'Dia bukan guru.' ATAU 'Dia tidak mengajar.' (bergantung maksud)",
      penjelasan: "Kata nafi 'tidak' menafikan KK/KA. 'bukan' menafikan KN. Tidak boleh gabungkan keduanya untuk menafi perkara yang sama.",
    },
  ],

  kuiz: [
    {
      q: "Kata sendi nama yang menyatakan TEMPAT (statik) ialah?",
      options: ["ke", "dari", "di", "untuk"],
      answer: 2,
      explanation: "'di' = tempat sesuatu berada secara statik (di sekolah, di rumah).",
    },
    {
      q: "Pilih kata nafi yang betul untuk menafi kata nama: 'Dia _____ penjenayah.'",
      options: ["tidak", "bukan", "tiada", "belum"],
      answer: 1,
      explanation: "'bukan' digunakan untuk menafi kata nama. 'tidak' untuk kata kerja/adjektif.",
    },
    {
      q: "'Walaupun' tergolong dalam jenis kata tugas?",
      options: ["Kata Sendi Nama", "Kata Nafi", "Kata Hubung", "Kata Penguat"],
      answer: 2,
      explanation: "'Walaupun' menghubungkan dua klausa yang menunjukkan pertentangan → Kata Hubung.",
    },
    {
      q: "Ayat: 'Dia belajar _____ mendapat kejayaan.' Kata tugas yang sesuai ialah?",
      options: ["kerana", "supaya", "walaupun", "apabila"],
      answer: 1,
      explanation: "'supaya' = kata hubung tujuan. Dia belajar dengan tujuan mendapat kejayaan.",
    },
    {
      q: "'WAH, cantiknya bunga itu!' Perkataan 'wah' ialah?",
      options: ["Kata Seru", "Kata Tanya", "Kata Nafi", "Kata Penguat"],
      answer: 0,
      explanation: "'Wah' menyatakan perasaan kagum secara spontan → Kata Seru.",
    },
    {
      q: "Kata tanya yang digunakan untuk bertanya tentang MASA ialah?",
      options: ["siapa", "mengapa", "bila", "bagaimana"],
      answer: 2,
      explanation: "'bila' = kata tanya masa. 'siapa' = orang, 'mengapa' = sebab, 'bagaimana' = cara.",
    },
    {
      q: "Penggunaan kata sendi yang BETUL ialah?",
      options: [
        "Dia pergi di kedai.",
        "Dia duduk ke kerusi.",
        "Dia datang dari kampung.",
        "Hadiah untuk dia.",
      ],
      answer: 2,
      explanation: "'dari kampung' = asal tempat. 'di kedai' sepatutnya 'ke kedai' (pergerakan). 'ke kerusi' sepatutnya 'di kerusi' (statik).",
    },
    {
      q: "'daripada' berbeza dengan 'dari' kerana 'daripada' menyatakan?",
      options: ["Tempat", "Asal atau perbandingan", "Arah", "Tujuan"],
      answer: 1,
      explanation: "'daripada' = asal/sumber atau perbandingan. 'dari' = tempat atau masa permulaan.",
    },
    {
      q: "Ayat manakah menggunakan kata nafi dengan BETUL?",
      options: [
        "Dia tidak guru.",
        "Dia bukan pergi.",
        "Dia tidak pergi.",
        "Dia bukan tidak.",
      ],
      answer: 2,
      explanation: "'tidak' menafikan kata kerja 'pergi' → betul. 'bukan' sepatutnya untuk kata nama.",
    },
    {
      q: "'Sangat', 'amat', 'terlalu' tergolong dalam?",
      options: ["Kata Nafi", "Kata Sendi Nama", "Kata Penguat", "Kata Hubung"],
      answer: 2,
      explanation: "Ketiga-tiga ini memperkuat makna kata adjektif → Kata Penguat.",
    },
  ],

  examBooster: {
    rumusan: [
      "Kata Tugas = kata yang 'menjalankan tugas' nahu tanpa makna tersendiri",
      "Kata Sendi Nama: di (statik), ke (arah), dari/daripada (asal), untuk (tujuan), oleh (agen)",
      "Kata Hubung: dan, atau, tetapi, kerana, supaya, walaupun, apabila",
      "Kata Nafi: 'tidak' untuk KK/KA, 'bukan' untuk KN",
      "Kata Penguat: sangat, amat, terlalu, paling (BUKAN kata adjektif!)",
      "Kata Seru: wah, aduh, amboi, syabas (perasaan spontan)",
    ],
    lastMinuteTips: [
      "'di' + tempat statik. 'ke' + destinasi pergerakan.",
      "'tidak pergi' ✓ | 'bukan pergi' ✗ | 'bukan guru' ✓ | 'tidak guru' ✗",
      "Kata sendi nama ditulis BERASINGAN: 'di sekolah' BUKAN 'disekolah'.",
      "Kata hubung tujuan: 'supaya' / 'agar'. Kata hubung sebab: 'kerana' / 'sebab'.",
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// 4. KATA KERJA TAK TRANSITIF
// ─────────────────────────────────────────────────────────────
const kataKerjaTakTransitif: SistemBahasaTopic = {
  id: "kata-kerja-tak-transitif",
  tajuk: "Kata Kerja Tak Transitif",
  subtitle: "Kata kerja yang tidak memerlukan objek untuk melengkapkan ayat",
  difficulty: "Sederhana",
  masaBelajar: "25 minit",
  warna: "#FB923C",

  pengenalan:
    "Ada kata kerja yang 'manja' — perlu ada objek di belakangnya. Ada kata kerja yang 'berdikari' — boleh berdiri sendiri tanpa objek! Kata Kerja Tak Transitif ialah kata kerja yang TIDAK memerlukan objek untuk ayat menjadi lengkap. 'Dia berlari.' — lengkap! Tak perlu 'berlari apa?'",

  definisi: {
    teks: "Kata Kerja Tak Transitif ialah kata kerja yang tidak memerlukan objek untuk melengkapkan predikat ayat. Ayat boleh lengkap dan bermakna tanpa objek selepas kata kerja.",
    ciri: [
      "Tidak memerlukan objek (tiada 'apa' atau 'siapa' selepasnya)",
      "Boleh berdiri sendiri selepas subjek",
      "Sering menggunakan imbuhan 'ber-', 'ter-', 'me-N' (tanpa objek)",
      "Boleh disertai keterangan (tempat, masa, cara) tetapi bukan objek",
    ],
    ringkasan:
      "Ujian mudah: Tanya 'Kata kerja ini buat APA?' — kalau soalan itu pelik/tak relevan → Kata Kerja Tak Transitif!",
  },

  cikguTerang: {
    intro:
      "Cikgu AcadeMy guna cara 'soal objek' untuk bezakan KK Transitif dan Tak Transitif. Cuba tanya 'buat apa?' atau 'kepada siapa?' selepas kata kerja. Kalau soalan tu tak masuk akal → KK TAK TRANSITIF.",
    langkah: [
      {
        tajuk: "Langkah 1 — Baca ayat dan kesan kata kerja",
        teks: "Kenal pasti kata kerja dalam ayat terlebih dahulu.",
        contoh: "'Budak itu berlari di padang.' → kata kerja = 'berlari'",
      },
      {
        tajuk: "Langkah 2 — Tanya 'berlari APA?'",
        teks: "Kalau soalan 'buat apa?' tidak masuk akal → Kata Kerja Tak Transitif.",
        contoh: "'berlari apa?' → tidak masuk akal → KK TAK TRANSITIF ✓",
      },
      {
        tajuk: "Langkah 3 — Bandingkan dengan KK Transitif",
        teks: "KK Transitif pula boleh dijawab: 'memakan IKAN' → makan apa? → ikan = objek.",
        contoh: "'Dia memakan ikan.' → makan APA? → ikan → KK TRANSITIF",
      },
      {
        tajuk: "Langkah 4 — Kenali imbuhan KK Tak Transitif",
        teks: "Imbuhan 'ber-' biasanya menghasilkan KK Tak Transitif.",
        contoh: "berlari, bernyanyi, berjalan, berenang, bercakap, bergerak",
      },
    ],
    petua:
      "Dalam soalan UASA, bezakan KK Transitif dan Tak Transitif dengan soal objek. Jika ada objek dalam ayat → KK Transitif. Tiada objek → KK Tak Transitif.",
  },

  jenis: [
    {
      nama: "KK Tak Transitif Tanpa Pelengkap",
      definisi: "Kata kerja yang boleh berdiri sendiri — ayat lengkap tanpa apa-apa penambahan.",
      formula: "Subjek + KK Tak Transitif",
      contoh: ["berlari", "tidur", "bangun", "menangis", "ketawa", "berenang"],
      contohAyat: [
        "Bayi itu menangis.",
        "Dia berlari.",
        "Mereka ketawa terbahak-bahak.",
      ],
    },
    {
      nama: "KK Tak Transitif Berpelengkap",
      definisi: "Kata kerja yang tidak memerlukan objek tetapi perlu PELENGKAP untuk ayat bermakna penuh.",
      formula: "Subjek + KK Tak Transitif + Pelengkap (kata adjektif/nama)",
      contoh: ["menjadi", "kelihatan", "terasa", "berbunyi", "bersifat"],
      contohAyat: [
        "Dia menjadi doktor. ('doktor' = pelengkap, bukan objek)",
        "Langit kelihatan cerah. ('cerah' = pelengkap adjektif)",
        "Suaranya terasa merdu. ('merdu' = pelengkap)",
      ],
    },
    {
      nama: "KK Tak Transitif + Keterangan",
      definisi: "KK Tak Transitif yang disertai keterangan tempat, masa, atau cara (bukan objek).",
      formula: "Subjek + KK Tak Transitif + Keterangan",
      contoh: ["duduk di sana", "berlari dengan pantas", "tidur semalam"],
      contohAyat: [
        "Kucing itu tidur di atas sofa. (keterangan tempat)",
        "Dia berlari dengan laju. (keterangan cara)",
        "Mereka berenang setiap pagi. (keterangan masa)",
      ],
    },
  ],

  contohHarian: {
    harian: [
      "Adik tertidur semasa menonton televisyen. ('tertidur' = KK Tak Transitif)",
      "Ibu bergelak ketawa mendengar cerita lucu itu. ('bergelak ketawa' = KK Tak Transitif)",
      "Kucing kami berlari-lari di halaman rumah. ('berlari-lari' = KK Tak Transitif)",
      "Ayah bersantai di kerusi malas. ('bersantai' = KK Tak Transitif, 'di kerusi malas' = keterangan)",
      "Bayi itu menangis kerana lapar. ('menangis' = KK Tak Transitif)",
    ],
    sekolah: [
      "Murid-murid berdiri di perhimpunan pagi. ('berdiri' = KK Tak Transitif)",
      "Pelajar itu berjaya dalam peperiksaan. ('berjaya' = KK Tak Transitif berpelengkap)",
      "Guru bercerita tentang sejarah negara. ('bercerita' = KK Tak Transitif + keterangan)",
      "Mereka bekerjasama dalam projek kumpulan. ('bekerjasama' = KK Tak Transitif)",
      "Paduan suara sekolah bernyanyi dengan merdu. ('bernyanyi' = KK Tak Transitif)",
    ],
    peperiksaan: [
      "Pahlawan itu bertempur dengan gagah berani. ('bertempur' = KK Tak Transitif)",
      "Rakyat bersatu untuk mempertahankan negara. ('bersatu' = KK Tak Transitif)",
      "Dia berjalan kaki sejauh dua kilometer. ('berjalan kaki' = KK Tak Transitif)",
      "Anak itu menjelma menjadi seorang yang berguna. ('menjelma menjadi' = KK Tak Transitif berpelengkap)",
      "Semangat perjuangan tidak pernah padam. ('padam' = KK Tak Transitif)",
    ],
  },

  tipsUASA: {
    kerap: [
      "Soalan kerap minta bezakan KK Transitif dan KK Tak Transitif dalam ayat.",
      "KK dengan imbuhan 'ber-' biasanya KK Tak Transitif — ingat ini!",
      "Soalan ubah ayat aktif-pasif: KK Tak Transitif TIDAK boleh dipasifkan!",
      "Soalan isi tempat: pilih KK yang sesuai dengan ada/tiada objek.",
    ],
    pemeriksa: [
      "Pemeriksa kerap uji melalui soalan 'ubah kepada ayat pasif' — KK Tak Transitif tak boleh diubah!",
      "Kenal pasti pelengkap vs objek: objek = boleh jadi subjek ayat pasif, pelengkap = tidak.",
      "Imbuhan 'di-' hanya boleh digunakan pada KK Transitif (ayat pasif).",
    ],
    format: [
      "Format kenal pasti: 'Kata kerja _____ ialah KK Tak Transitif kerana tidak mempunyai objek.'",
      "Format bezakan: tulis 'ada objek' atau 'tiada objek' selepas kenal pasti kata kerja.",
      "Format ubah ayat: KK Tak Transitif = TIDAK boleh diubah ke ayat pasif.",
    ],
  },

  kesalahan: [
    {
      salah: "Bunga itu dicium oleh dia. (jika 'mencium' KK Tak Transitif)",
      sebabSalah: "Sebenarnya 'mencium' adalah KK Transitif (mencium APA? = bunga). Ayat pasif ini betul.",
      betul: "Bunga itu dicium oleh dia. ✓",
      sebabBetul: "'mencium bunga' = ada objek → KK Transitif → boleh dipasifkan.",
    },
    {
      salah: "Dia dilarikan oleh abangnya.",
      sebabSalah: "'berlari' adalah KK Tak Transitif, TETAPI 'melarikan' (transitif: melarikan siapa?) boleh dipasifkan. Konteks penting!",
      betul: "Dia dilarikan oleh abangnya. ✓ (melarikan dia = objek ada)",
      sebabBetul: "'melarikan' (membawa lari seseorang) adalah KK Transitif berbeza dari 'berlari'.",
    },
    {
      salah: "Mereka menjadi seorang doktor.",
      sebabSalah: "'Mereka' = ramai, 'seorang' = satu. Tidak sesuai dari segi bilangan.",
      betul: "Mereka menjadi doktor. / Dia menjadi seorang doktor.",
      sebabBetul: "Padankan bilangan subjek dengan pelengkap.",
    },
    {
      salah: "Budak itu berlari dengan kencang bola.",
      sebabSalah: "'berlari' adalah KK Tak Transitif — tidak boleh ada objek 'bola' selepasnya.",
      betul: "Budak itu berlari dengan kencang. / Budak itu menendang bola dengan kencang.",
      sebabBetul: "'berlari' tak perlukan objek. Kalau ada bola, guna KK Transitif 'menendang'.",
    },
    {
      salah: "Dia terlelap tidur.",
      sebabSalah: "'Terlelap' sudah bermakna 'terlena/tertidur'. 'tidur' berulang makna.",
      betul: "Dia terlelap. / Dia tertidur.",
      sebabBetul: "Elakkan pengulangan makna yang sama dalam satu frasa kata kerja.",
    },
  ],

  caraMudahIngat: {
    akronim: {
      kata: "TT = Tak Transitif = Tak ada Teman (objek)",
      makna: "KK Tak Transitif tidak perlu 'teman' (objek) untuk berdiri sendiri!",
    },
    visualMemory: [
      "KK Tak Transitif = orang yang 'berdikari' — boleh buat kerja SENDIRI tanpa bantuan objek.",
      "KK Transitif = orang yang 'berkerjasama' — perlu 'partner' (objek) untuk lengkapkan kerja.",
      "Imbuhan 'ber-' = tanda KK Tak Transitif (berlari, bernyanyi, berjalan, bercakap).",
    ],
    petua: [
      "Soal 'buat APA?' / 'buat SIAPA?' — kalau tak logik → KK Tak Transitif.",
      "KK Tak Transitif TIDAK boleh diubah ke ayat pasif dengan imbuhan 'di-'.",
      "'Menjadi', 'kelihatan', 'terasa' = KK Tak Transitif berpelengkap (bukan objek!)",
    ],
  },

  kbat: [
    {
      situasi: "Dua ayat diberikan: (A) 'Ali memukul bola.' (B) 'Ali berlari di padang.'",
      soalan: "Bezakan kata kerja dalam ayat A dan B dari segi jenis dan fungsinya. Buktikan dengan menguji sama ada ayat boleh dipasifkan.",
      jawapanModel: "Ayat A: 'memukul' = KK Transitif (ada objek 'bola'). Boleh dipasifkan: 'Bola dipukul oleh Ali.' ✓ Ayat B: 'berlari' = KK Tak Transitif (tiada objek). TIDAK boleh dipasifkan: 'Padang dilarikan oleh Ali.' ✗ (tidak gramatis)",
      penjelasan: "Ujian pasif adalah cara terbaik mengesahkan jenis kata kerja. KK Transitif boleh dipasifkan, KK Tak Transitif tidak boleh.",
    },
    {
      situasi: "Ayat: 'Dia menjadi pemimpin yang disegani.'",
      soalan: "Adakah 'pemimpin yang disegani' objek atau pelengkap? Jelaskan perbezaan dan buktikan jawapan anda.",
      jawapanModel: "'pemimpin yang disegani' adalah PELENGKAP, bukan objek. Bukti: Tidak boleh dipasifkan sebagai subjek — 'Pemimpin yang disegani dijadi oleh dia' tidak gramatis. Pelengkap hanya melengkapkan makna KK Tak Transitif 'menjadi', bukan menerima perbuatan.",
      penjelasan: "Pelengkap ≠ Objek. Objek = boleh jadi subjek ayat pasif. Pelengkap = tidak boleh.",
    },
  ],

  kuiz: [
    {
      q: "KK Tak Transitif ialah kata kerja yang?",
      options: [
        "Memerlukan objek untuk ayat lengkap",
        "Tidak memerlukan objek untuk ayat lengkap",
        "Selalu menggunakan imbuhan 'me-'",
        "Tidak boleh digunakan dengan subjek",
      ],
      answer: 1,
      explanation: "KK Tak Transitif = tidak perlukan objek. Ayat lengkap tanpa objek.",
    },
    {
      q: "Antara berikut, yang manakah KK TAK TRANSITIF?",
      options: ["memakan", "berlari", "membaca", "mengambil"],
      answer: 1,
      explanation: "'berlari' tidak perlukan objek (berlari apa? = tak logik) → KK Tak Transitif.",
    },
    {
      q: "Ujian terbaik untuk menentukan KK Tak Transitif ialah?",
      options: [
        "Letak 'sangat' sebelumnya",
        "Tanya 'buat apa?' atau 'buat siapa?'",
        "Lihat huruf pertama kata kerja",
        "Kira bilangan suku kata",
      ],
      answer: 1,
      explanation: "Soal 'buat apa?' — kalau tak logik = KK Tak Transitif.",
    },
    {
      q: "Ayat manakah yang menggunakan KK Tak Transitif?",
      options: [
        "Dia memakan nasi.",
        "Dia membaca buku.",
        "Dia berlari di taman.",
        "Dia mengambil pen.",
      ],
      answer: 2,
      explanation: "'berlari' = tiada objek. Yang lain semua ada objek (nasi, buku, pen).",
    },
    {
      q: "KK Tak Transitif TIDAK boleh?",
      options: [
        "Digunakan dengan keterangan tempat",
        "Digunakan dengan imbuhan 'ber-'",
        "Diubah menjadi ayat pasif",
        "Digunakan dengan kata penguat",
      ],
      answer: 2,
      explanation: "KK Tak Transitif tidak boleh dipasifkan (tiada objek untuk jadi subjek pasif).",
    },
    {
      q: "Dalam ayat 'Dia menjadi guru', perkataan 'guru' ialah?",
      options: ["Objek", "Pelengkap", "Keterangan", "Subjek"],
      answer: 1,
      explanation: "'guru' = pelengkap kepada KK Tak Transitif 'menjadi'. Bukan objek.",
    },
    {
      q: "Imbuhan yang paling kerap menghasilkan KK Tak Transitif ialah?",
      options: ["me-N", "di-", "ber-", "ter-"],
      answer: 2,
      explanation: "Imbuhan 'ber-' biasanya menghasilkan KK Tak Transitif (berlari, bernyanyi).",
    },
    {
      q: "'Murid-murid bersurai selepas perhimpunan.' KK dalam ayat ini ialah?",
      options: ["Transitif", "Tak Transitif", "Pasif", "Aktif"],
      answer: 1,
      explanation: "'bersurai' = tiada objek → KK Tak Transitif.",
    },
    {
      q: "Ayat mana yang TIDAK boleh dipasifkan?",
      options: [
        "Dia membeli buku.",
        "Ibu memasak nasi.",
        "Adik menangis.",
        "Guru mengajar murid.",
      ],
      answer: 2,
      explanation: "'menangis' = KK Tak Transitif (tiada objek) → tidak boleh dipasifkan.",
    },
    {
      q: "'Langit kelihatan cerah.' 'cerah' ialah?",
      options: ["Objek", "Pelengkap adjektif", "Kata kerja", "Keterangan"],
      answer: 1,
      explanation: "'cerah' = pelengkap adjektif kepada KK Tak Transitif 'kelihatan'.",
    },
  ],

  examBooster: {
    rumusan: [
      "KK Tak Transitif = TIDAK perlukan objek untuk ayat lengkap",
      "Ujian: Soal 'buat apa?' — tak logik = KK Tak Transitif",
      "Imbuhan 'ber-' selalunya hasilkan KK Tak Transitif",
      "KK Tak Transitif TIDAK boleh dipasifkan (tiada objek = tiada subjek pasif)",
      "KK Tak Transitif Berpelengkap: menjadi, kelihatan, terasa (pelengkap ≠ objek)",
      "Keterangan (tempat/masa/cara) BUKAN objek — KK masih 'tak transitif'",
    ],
    lastMinuteTips: [
      "Soal 'buat apa?' — tak logik = Tak Transitif. Logik = Transitif.",
      "KK Tak Transitif + 'di-' = SALAH. 'berlari' → 'dilarikan' ✗ (kecuali ubah bentuk).",
      "Pelengkap ≠ Objek: pelengkap tidak boleh jadi subjek ayat pasif.",
      "Keterangan tempat/masa/cara BUKAN objek — jangan keliru!",
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// 5. KATA GANDA
// ─────────────────────────────────────────────────────────────
const kataGanda: SistemBahasaTopic = {
  id: "kata-ganda",
  tajuk: "Kata Ganda",
  subtitle: "Proses pengulangan kata untuk menghasilkan makna baharu",
  difficulty: "Sederhana",
  masaBelajar: "30 minit",
  warna: "#F59E0B",

  pengenalan:
    "Bahasa Melayu ada cara unik untuk menghasilkan makna baharu — dengan MENGGANDAKAN kata! 'Budak' jadi 'budak-budak' (ramai). 'Berlari' jadi 'berlari-lari' (berterusan). 'Kuning' jadi 'kuning-kuning' (agak kuning). Kata Ganda adalah ciri ISTIMEWA bahasa Melayu yang tak ada dalam bahasa Inggeris!",

  definisi: {
    teks: "Kata Ganda ialah proses pembentukan kata dengan cara mengulangi kata dasar, sama ada sepenuhnya, sebahagian, atau disertai perubahan bunyi.",
    ciri: [
      "Penggandaan boleh berlaku pada kata dasar atau kata terbitan",
      "Makna kata ganda berbeza dengan kata tunggal",
      "Tanda hubung (-) digunakan antara kata yang digandakan",
      "Terdapat tiga jenis utama: penuh, separa, dan berentak",
    ],
    ringkasan:
      "Ingat: Kata ganda MESTI ada tanda hubung (-) di antara ulangan! 'budak-budak' ✓ 'budakbudak' ✗",
  },

  cikguTerang: {
    intro:
      "Cikgu AcadeMy ajar tiga jenis Kata Ganda dengan cara yang mudah diingat. Kita guna kaedah 'PENUH-SEPARA-BUNYI'.",
    langkah: [
      {
        tajuk: "Langkah 1 — Kata Ganda Penuh",
        teks: "Kata dasar diulang sepenuhnya tanpa sebarang perubahan.",
        contoh: "buku → buku-buku | kanak → kanak-kanak | ibu → ibu-ibu",
      },
      {
        tajuk: "Langkah 2 — Kata Ganda Separa",
        teks: "Hanya sebahagian kata yang diulang — biasanya suku kata pertama.",
        contoh: "lelaki (dari 'laki') | tetamu (dari 'tamu') | sesiku (dari 'siku')",
      },
      {
        tajuk: "Langkah 3 — Kata Ganda Berentak",
        teks: "Kata diulang dengan perubahan bunyi vokal atau konsonan.",
        contoh: "lauk-pauk | sayur-mayur | sanak-saudara | batu-batan",
      },
      {
        tajuk: "Langkah 4 — Kesan makna penggandaan",
        teks: "Penggandaan boleh bermakna: ramai/banyak, berlaku berulang, agak/tidak pasti, atau jenis yang sama.",
        contoh: "murid-murid (ramai) | berlari-lari (berulang) | hijau-hijau (agak hijau)",
      },
    ],
    petua:
      "Dalam karangan, guna kata ganda berentak untuk naikkan markah bahasa: 'lauk-pauk', 'sayur-mayur', 'compang-camping', 'huru-hara'.",
  },

  jenis: [
    {
      nama: "Kata Ganda Penuh",
      definisi: "Kata dasar diulang sepenuhnya. Makna biasanya: ramai/banyak, berlaku berulang-ulang, atau tidak spesifik.",
      formula: "Kata Dasar + tanda hubung + Kata Dasar",
      contoh: ["buku-buku", "budak-budak", "pokok-pokok", "hari-hari", "sedikit-sedikit"],
      contohAyat: [
        "Budak-budak bermain di padang. (ramai budak)",
        "Dia datang hari-hari. (setiap hari/berulang)",
        "Bawa sedikit-sedikit sahaja. (tidak banyak)",
      ],
    },
    {
      nama: "Kata Ganda Separa",
      definisi: "Hanya suku kata pertama kata dasar diulang dan diletakkan di hadapan. Sering menunjukkan jenis atau kategori.",
      formula: "Suku kata pertama + kata dasar penuh",
      contoh: ["lelaki", "tetamu", "sesiku", "pepohon", "dedaun", "reranting"],
      contohAyat: [
        "Lelaki itu berani menghadapi cabaran.",
        "Tetamu dari jauh telah tiba.",
        "Pepohon di hutan itu tinggi-tinggi.",
      ],
    },
    {
      nama: "Kata Ganda Berentak",
      definisi: "Kata diulang dengan perubahan bunyi (vokal atau konsonan). Sering memberi makna 'pelbagai jenis' atau 'bercampur-campur'.",
      formula: "Kata 1 + tanda hubung + Kata 2 (bunyi hampir sama)",
      contoh: ["lauk-pauk", "sayur-mayur", "sanak-saudara", "compang-camping", "huru-hara", "tunggang-langgang"],
      contohAyat: [
        "Meja makan penuh dengan lauk-pauk yang lazat.",
        "Sayur-mayur dijual murah di pasar.",
        "Keadaan menjadi huru-hara akibat kebakaran.",
      ],
    },
  ],

  contohHarian: {
    harian: [
      "Ibu membeli sayur-mayur di pasar pagi. (kata ganda berentak = pelbagai sayur)",
      "Adik-adik saya suka bermain lumpur. (kata ganda penuh = ramai adik)",
      "Kuih-muih disediakan untuk tetamu. (kata ganda berentak = pelbagai kuih)",
      "Dia datang berlari-lari apabila mendengar namanya dipanggil. (kata ganda penuh KK = berulang)",
      "Lelaki tua itu duduk di bangku taman. (kata ganda separa = kategori lelaki)",
    ],
    sekolah: [
      "Murid-murid berbaris untuk masuk ke kelas. (kata ganda penuh = ramai)",
      "Guru-guru hadir ke mesyuarat pagi ini. (kata ganda penuh = ramai guru)",
      "Buku-buku teks mesti disimpan dengan kemas. (kata ganda penuh = banyak buku)",
      "Soalan-soalan peperiksaan agak mencabar tahun ini. (kata ganda penuh = banyak soalan)",
      "Cikgu menerangkan soalan itu sedikit-sedikit. (kata ganda penuh = sedikit demi sedikit)",
    ],
    peperiksaan: [
      "Pahlawan-pahlawan Melayu berjuang mempertahankan tanah air. (kata ganda penuh = ramai)",
      "Alam sekitar perlu dijaga daripada pencemaran yang berterusan. (tiada kata ganda — contoh negatif)",
      "Rakyat jelata hidup dengan aman damai. (tiada kata ganda — contoh negatif)",
      "Wira-wira negara dikenang sepanjang masa. (kata ganda penuh = ramai wira)",
      "Bunga-bungaan menghiasi taman istana dengan indah. (kata ganda penuh = pelbagai bunga)",
    ],
  },

  tipsUASA: {
    kerap: [
      "Soalan kerap minta kenal pasti jenis kata ganda (penuh/separa/berentak).",
      "Soalan ejaan: tanda hubung (-) MESTI ada dalam kata ganda — ejaan tanpa tanda hubung = salah.",
      "Soalan makna: 'apa makna kata ganda dalam konteks ini?' — hurai makna tambahan.",
      "Soalan pembentukan: beri kata dasar, bina kata ganda yang sesuai.",
    ],
    pemeriksa: [
      "Pemeriksa kerap uji ejaan kata ganda — tanda hubung wajib ada!",
      "Jangan keliru 'lelaki' (kata ganda separa, satu perkataan) dengan 'budak-budak' (ada tanda hubung).",
      "Kata ganda separa TIDAK ada tanda hubung — 'lelaki' bukan 'le-laki'.",
    ],
    format: [
      "Format kenal pasti: 'Kata ganda _____ adalah jenis kata ganda (penuh/separa/berentak).'",
      "Format makna: jelaskan makna kata ganda dalam konteks ayat.",
      "Format bina: beri kata dasar → bina kata ganda yang betul dengan tanda hubung.",
    ],
  },

  kesalahan: [
    {
      salah: "budakbudak berlari di padang.",
      sebabSalah: "Kata ganda penuh MESTI ditulis dengan tanda hubung (-) antara kedua-dua kata.",
      betul: "budak-budak berlari di padang.",
      sebabBetul: "Tanda hubung (-) wajib dalam kata ganda penuh: budak-budak.",
    },
    {
      salah: "le-laki itu berani.",
      sebabSalah: "'lelaki' adalah kata ganda separa — ditulis sebagai SATU perkataan tanpa tanda hubung.",
      betul: "Lelaki itu berani.",
      sebabBetul: "Kata ganda separa ditulis sebagai satu perkataan: lelaki, tetamu, pepohon.",
    },
    {
      salah: "Mereka berlari-larian di padang.",
      sebabSalah: "'berlari-larian' tidak betul. Bentuk yang betul adalah 'berlari-lari' atau 'berlarian'.",
      betul: "Mereka berlari-lari di padang. / Mereka berlarian di padang.",
      sebabBetul: "Jangan campurkan bentuk kata ganda dengan imbuhan yang berulang makna.",
    },
    {
      salah: "Ibu memasak lauk pauk untuk makan malam.",
      sebabSalah: "Kata ganda berentak 'lauk-pauk' mesti ada tanda hubung.",
      betul: "Ibu memasak lauk-pauk untuk makan malam.",
      sebabBetul: "Semua kata ganda berentak ditulis dengan tanda hubung: lauk-pauk, sayur-mayur.",
    },
    {
      salah: "Buku buku itu milik saya.",
      sebabSalah: "Kata ganda 'buku-buku' mesti ada tanda hubung — 'buku buku' (tanpa tanda) = salah ejaan.",
      betul: "Buku-buku itu milik saya.",
      sebabBetul: "Tanda hubung (-) wajib dalam kata ganda penuh.",
    },
  ],

  caraMudahIngat: {
    akronim: {
      kata: "PSB",
      makna: "Penuh (ulang semua) · Separa (ulang suku kata pertama) · Berentak (ubah bunyi)",
    },
    visualMemory: [
      "Kata ganda Penuh = cermin sempurna — reflection 100% sama: buku-buku.",
      "Kata ganda Separa = bayangan dalam air — hanya separuh jelas: 'le' + laki = lelaki.",
      "Kata ganda Berentak = muzik dengan variasi — bunyi hampir sama tapi berbeza: lauk-pauk.",
    ],
    petua: [
      "Tanda hubung (-) = WAJIB untuk kata ganda penuh dan berentak.",
      "Kata ganda separa = SATU perkataan tanpa tanda hubung (lelaki, tetamu).",
      "Kata ganda bermakna: ramai/banyak, berulang, agak/tak pasti, pelbagai jenis.",
    ],
  },

  kbat: [
    {
      situasi: "Senarai perkataan: (1) sayur-mayur (2) lelaki (3) buku-buku (4) anak-pinak (5) pepohon",
      soalan: "Kelaskan setiap perkataan ke dalam jenis kata ganda yang betul dan jelaskan ciri setiap jenis.",
      jawapanModel: "Kata Ganda Penuh: (3) buku-buku — kata dasar diulang sepenuhnya. Kata Ganda Separa: (2) lelaki, (5) pepohon — suku kata pertama diulang, satu perkataan. Kata Ganda Berentak: (1) sayur-mayur, (4) anak-pinak — diulang dengan perubahan bunyi, menunjukkan pelbagai jenis.",
      penjelasan: "Kunci pengelasan: Penuh = sama persis + tanda hubung. Separa = satu perkataan. Berentak = bunyi berbeza + tanda hubung.",
    },
    {
      situasi: "Ayat karangan: 'Pasar malam itu penuh sesak dengan orang (ramai).'",
      soalan: "Gantikan perkataan dalam kurungan dengan kata ganda yang sesuai dan huraikan makna yang ditambah oleh kata ganda tersebut.",
      jawapanModel: "'Pasar malam itu penuh sesak dengan orang ramai.' → 'ramai' boleh digantikan dengan konteks lebih hidup: 'orang-orang yang memenuhi kawasan itu'. Atau gunakan kata ganda berentak: 'hiruk-pikuk dengan manusia'. Makna tambahan: menekankan jumlah dan suasana yang meriah.",
      penjelasan: "Kata ganda dalam karangan menambah nilai bahasa dan ekspresi. Pemeriksa menghargai penggunaan kata ganda yang tepat dan bervariasi.",
    },
  ],

  kuiz: [
    {
      q: "Apakah jenis kata ganda bagi 'lauk-pauk'?",
      options: ["Kata Ganda Penuh", "Kata Ganda Separa", "Kata Ganda Berentak", "Kata Ganda Imbuhan"],
      answer: 2,
      explanation: "'lauk-pauk' — bunyi berubah (lauk → pauk) → Kata Ganda Berentak.",
    },
    {
      q: "Perkataan 'tetamu' adalah contoh?",
      options: ["Kata Ganda Penuh", "Kata Ganda Separa", "Kata Ganda Berentak", "Bukan kata ganda"],
      answer: 1,
      explanation: "'tetamu' dari 'tamu' — suku kata 'te' ditambah = Kata Ganda Separa.",
    },
    {
      q: "Ejaan kata ganda yang BETUL ialah?",
      options: ["budakbudak", "budak budak", "budak-budak", "budak_budak"],
      answer: 2,
      explanation: "Kata ganda penuh MESTI ada tanda hubung: budak-budak.",
    },
    {
      q: "Makna 'hari-hari' dalam ayat 'Dia bersenam hari-hari' ialah?",
      options: ["Dua hari sahaja", "Setiap hari / berulang", "Pagi dan petang", "Banyak hari lagi"],
      answer: 1,
      explanation: "Kata ganda penuh kata nama waktu = berulang / setiap kali: hari-hari = setiap hari.",
    },
    {
      q: "Kata ganda 'bunga-bungaan' bermaksud?",
      options: ["Dua kuntum bunga", "Pelbagai jenis bunga", "Bunga yang besar", "Bunga tiruan"],
      answer: 1,
      explanation: "Akhiran '-an' pada kata ganda = pelbagai jenis: bunga-bungaan = pelbagai jenis bunga.",
    },
    {
      q: "'Berlari-lari' bermaksud?",
      options: ["Berlari dua kali", "Berlari dengan pantas", "Berlari berulang-ulang / tidak bersungguh", "Berlari bersama-sama"],
      answer: 2,
      explanation: "Kata ganda kata kerja = berlaku berulang atau tidak bersungguh-sungguh.",
    },
    {
      q: "Antara berikut, yang manakah BUKAN kata ganda separa?",
      options: ["lelaki", "tetamu", "pepohon", "buku-buku"],
      answer: 3,
      explanation: "'buku-buku' ada tanda hubung = kata ganda penuh, bukan separa.",
    },
    {
      q: "Kata ganda berentak membawa makna?",
      options: [
        "Jumlah yang ramai",
        "Berlaku berulang kali",
        "Pelbagai jenis atau bercampur-campur",
        "Sesuatu yang besar",
      ],
      answer: 2,
      explanation: "Kata ganda berentak biasanya bermakna pelbagai jenis: lauk-pauk, sayur-mayur.",
    },
    {
      q: "Ayat manakah menggunakan kata ganda dengan BETUL?",
      options: [
        "lelaki-lelaki itu tinggi.",
        "Lelaki itu tinggi.",
        "le-laki itu tinggi.",
        "Laki-laki itu tinggi.",
      ],
      answer: 1,
      explanation: "'Lelaki' = kata ganda separa, ditulis sebagai satu perkataan tanpa tanda hubung.",
    },
    {
      q: "Proses pembentukan kata ganda melibatkan?",
      options: [
        "Penambahan imbuhan sahaja",
        "Pengulangan kata dasar sepenuhnya, sebahagian, atau dengan perubahan bunyi",
        "Penggabungan dua kata dasar yang berlainan makna",
        "Pemendekan kata panjang",
      ],
      answer: 1,
      explanation: "Kata ganda = pengulangan kata dasar: penuh (semua), separa (suku kata), berentak (ubah bunyi).",
    },
  ],

  examBooster: {
    rumusan: [
      "3 jenis Kata Ganda: Penuh (buku-buku), Separa (lelaki), Berentak (lauk-pauk)",
      "Kata Ganda Penuh & Berentak: WAJIB ada tanda hubung (-)",
      "Kata Ganda Separa: SATU perkataan, tanpa tanda hubung",
      "Makna kata ganda: ramai/banyak, berulang, agak, pelbagai jenis",
      "Dalam karangan: guna kata ganda berentak untuk markah bahasa tinggi!",
    ],
    lastMinuteTips: [
      "Tanda hubung (-) = wajib untuk kata ganda penuh dan berentak.",
      "'lelaki', 'tetamu', 'pepohon' = kata ganda separa = SATU perkataan.",
      "Kata ganda + '-an' = pelbagai jenis: bunga-bungaan, sayur-mayuran.",
      "Dalam karangan: lauk-pauk, sayur-mayur, huru-hara, tunggang-langgang = markah tinggi!",
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// 6. POLA AYAT INTI
// ─────────────────────────────────────────────────────────────
const polaAyatInti: SistemBahasaTopic = {
  id: "pola-ayat-inti",
  tajuk: "Pola Ayat Inti",
  subtitle: "4 pola asas ayat tunggal Bahasa Melayu",
  difficulty: "Sederhana",
  masaBelajar: "35 minit",
  warna: "#EC4899",

  pengenalan:
    "Setiap ayat Bahasa Melayu yang betul mesti ikut POLA tertentu. Bayangkan pola ayat seperti resipi masakan — ada 4 resipi asas, dan semua ayat BM dibina dari 4 resipi ini. Kalau kamu kuasai 4 Pola Ayat Inti, kamu boleh bina MANA-MANA ayat BM dengan betul!",

  definisi: {
    teks: "Pola Ayat Inti ialah 4 pola asas yang membentuk ayat tunggal Bahasa Melayu. Setiap ayat inti terdiri daripada SUBJEK dan PREDIKAT, dan predikat boleh terdiri daripada 4 jenis kata.",
    ciri: [
      "Terdiri daripada SUBJEK + PREDIKAT sahaja (ayat paling asas)",
      "Predikat boleh berupa: Frasa Nama, Frasa Kerja, Frasa Adjektif, atau Frasa Sendi Nama",
      "Ayat inti tidak mempunyai keterangan tambahan",
      "4 pola ini adalah asas kepada SEMUA ayat BM yang lebih kompleks",
    ],
    ringkasan:
      "4 Pola: FN+FN | FN+FK | FN+FA | FN+FSN. Subjek selalu Frasa Nama. Predikat boleh jadi 4 jenis.",
  },

  cikguTerang: {
    intro:
      "Cikgu AcadeMy guna kaedah 'SOAL PREDIKAT' untuk kenal pola ayat. Tengok apa yang ada dalam predikat — kata nama? kata kerja? kata adjektif? kata sendi? → Itulah polanya!",
    langkah: [
      {
        tajuk: "Langkah 1 — Kenal Subjek",
        teks: "Bahagian pertama ayat yang menjadi 'topik' — biasanya Frasa Nama (orang, benda, tempat).",
        contoh: "Ahmad | Kucing itu | Negara Malaysia | Keputusan peperiksaan",
      },
      {
        tajuk: "Langkah 2 — Kenal Predikat",
        teks: "Bahagian yang memberitahu sesuatu tentang subjek. Tanya: 'Apa yang berlaku pada subjek?'",
        contoh: "Ahmad | guru → predikat = 'guru' (Frasa Nama)",
      },
      {
        tajuk: "Langkah 3 — Tentukan Pola",
        teks: "Lihat jenis kata pertama dalam predikat untuk tentukan pola.",
        contoh: "Pola 1=FN, Pola 2=FK, Pola 3=FA, Pola 4=FSN",
      },
      {
        tajuk: "Langkah 4 — Bina ayat berdasarkan pola",
        teks: "Guna pola sebagai 'rangka' untuk bina ayat baharu yang gramatis.",
        contoh: "FN + FA → 'Bunga itu cantik.' 'Murid itu rajin.' 'Langit biru.'",
      },
    ],
    petua:
      "Dalam UASA, soalan pola ayat sering minta kamu 'kenal pasti pola' atau 'bina ayat mengikut pola'. Hafal 4 pola dengan contoh masing-masing.",
  },

  jenis: [
    {
      nama: "Pola 1: FN + FN (Frasa Nama + Frasa Nama)",
      definisi: "Subjek = Frasa Nama. Predikat = Frasa Nama. Menyatakan identiti atau persamaan.",
      formula: "Frasa Nama (subjek) + Frasa Nama (predikat)",
      contoh: [
        "Ahmad guru.",
        "Itu buku saya.",
        "Malaysia sebuah negara.",
        "Dia pemenang pertandingan.",
      ],
      contohAyat: [
        "Ahmad ialah seorang guru. (FN + FN)",
        "Malaysia sebuah negara yang aman. (FN + FN)",
        "Dia pemenang pertandingan itu. (FN + FN)",
      ],
    },
    {
      nama: "Pola 2: FN + FK (Frasa Nama + Frasa Kerja)",
      definisi: "Subjek = Frasa Nama. Predikat = Frasa Kerja. Menyatakan perbuatan atau tindakan.",
      formula: "Frasa Nama (subjek) + Frasa Kerja (predikat)",
      contoh: [
        "Murid belajar.",
        "Ibu memasak nasi.",
        "Mereka berlari.",
        "Ayah membaca surat khabar.",
      ],
      contohAyat: [
        "Murid-murid belajar dengan tekun. (FN + FK)",
        "Ibu memasak nasi goreng. (FN + FK)",
        "Mereka berlari di padang. (FN + FK)",
      ],
    },
    {
      nama: "Pola 3: FN + FA (Frasa Nama + Frasa Adjektif)",
      definisi: "Subjek = Frasa Nama. Predikat = Frasa Adjektif. Menyatakan sifat atau keadaan.",
      formula: "Frasa Nama (subjek) + Frasa Adjektif (predikat)",
      contoh: [
        "Bunga cantik.",
        "Murid itu rajin.",
        "Langit biru.",
        "Air sejuk.",
      ],
      contohAyat: [
        "Bunga itu sangat cantik. (FN + FA)",
        "Murid baharu itu rajin dan pintar. (FN + FA)",
        "Langit petang tadi merah keemasan. (FN + FA)",
      ],
    },
    {
      nama: "Pola 4: FN + FSN (Frasa Nama + Frasa Sendi Nama)",
      definisi: "Subjek = Frasa Nama. Predikat = Frasa Sendi Nama. Menyatakan kedudukan atau hubungan.",
      formula: "Frasa Nama (subjek) + Kata Sendi + Frasa Nama",
      contoh: [
        "Buku di atas meja.",
        "Dia di rumah.",
        "Mereka dari Johor.",
        "Hadiah untuk ibu.",
      ],
      contohAyat: [
        "Buku itu di atas meja. (FN + FSN)",
        "Dia sedang di rumah sekarang. (FN + FSN)",
        "Rombongan itu dari negara jiran. (FN + FSN)",
      ],
    },
  ],

  contohHarian: {
    harian: [
      "Ibu seorang doktor. (Pola 1: FN + FN — menyatakan identiti ibu)",
      "Adik makan nasi. (Pola 2: FN + FK — perbuatan adik)",
      "Makanan itu lazat. (Pola 3: FN + FA — sifat makanan)",
      "Gula di dalam bekas. (Pola 4: FN + FSN — kedudukan gula)",
      "Rumah kami besar. (Pola 3: FN + FA)",
    ],
    sekolah: [
      "Cikgu Aminah guru Matematik kami. (Pola 1: FN + FN)",
      "Pelajar-pelajar mengulang kaji sebelum peperiksaan. (Pola 2: FN + FK)",
      "Dewan sekolah luas dan bersih. (Pola 3: FN + FA)",
      "Pejabat pengetua di tingkat dua. (Pola 4: FN + FSN)",
      "Buku teks bahasa Melayu di rak buku. (Pola 4: FN + FSN)",
    ],
    peperiksaan: [
      "Hang Tuah seorang laksamana yang gagah berani. (Pola 1: FN + FN)",
      "Rakyat jelata menyokong perjuangan pemimpin mereka. (Pola 2: FN + FK)",
      "Semangat patriotisme rakyat kian membara. (Pola 3: FN + FA)",
      "Perjuangan mereka demi negara tercinta. (Pola 4: FN + FSN)",
      "Nilai kejujuran sangat penting dalam kehidupan. (Pola 3: FN + FA)",
    ],
  },

  tipsUASA: {
    kerap: [
      "Soalan kerap minta 'kenal pasti pola ayat' — tulis 'FN + FK' atau 'FN + FA' dll.",
      "Soalan bina ayat: beri kata-kata, susun mengikut pola yang betul.",
      "Soalan ubah: tukar ayat dari satu pola ke pola lain.",
      "Soalan analisis: cari 'kesilapan' pada susunan pola dalam ayat yang diberikan.",
    ],
    pemeriksa: [
      "Jangan keliru antara predikat FN dan FA — FN ada kata nama, FA ada kata adjektif.",
      "Frasa Sendi Nama MESTI ada kata sendi (di, ke, dari, oleh, untuk) — bukan frasa nama biasa.",
      "Ayat inti paling pendek: 2 perkataan sahaja boleh membentuk ayat (Ahmad berlari).",
    ],
    format: [
      "Format kenal pasti pola: 'Ayat ini mengikut pola _____ (FN + _____) kerana predikatnya ialah _____.'",
      "Format analisis: kenal pasti subjek (S) dan predikat (P) dalam ayat.",
      "Format bina: guna pola yang diberikan untuk bina ayat gramatis.",
    ],
  },

  kesalahan: [
    {
      salah: "Cantik bunga itu.",
      sebabSalah: "Dalam BM, subjek (FN) mesti datang DAHULU, diikuti predikat. 'Cantik' bukan subjek.",
      betul: "Bunga itu cantik.",
      sebabBetul: "Pola betul: FN (Bunga itu) + FA (cantik). Subjek dahulu, predikat kemudian.",
    },
    {
      salah: "Ahmad ialah berlari di padang.",
      sebabSalah: "'ialah' digunakan untuk pola FN+FN sahaja. Predikat 'berlari' adalah FK, bukan FN.",
      betul: "Ahmad berlari di padang.",
      sebabBetul: "Pola FN+FK tidak perlu 'ialah'. 'Ialah' hanya untuk FN+FN.",
    },
    {
      salah: "Di atas meja buku itu.",
      sebabSalah: "Ayat bermula dengan FSN — ini bukan pola inti yang betul untuk ayat asas.",
      betul: "Buku itu di atas meja.",
      sebabBetul: "Pola inti: FN (subjek) dahulu, FSN (predikat) kemudian.",
    },
    {
      salah: "Mereka seorang guru.",
      sebabSalah: "'Mereka' = ramai, 'seorang' = satu orang. Tidak sepadan dari segi bilangan.",
      betul: "Mereka guru-guru yang berdedikasi. / Dia seorang guru.",
      sebabBetul: "Padankan bilangan subjek (ramai/satu) dengan predikat.",
    },
    {
      salah: "Buku itu adalah di atas meja.",
      sebabSalah: "'Adalah' tidak sesuai digunakan dengan FSN. 'Adalah' untuk FN+FN atau FN+FA formal.",
      betul: "Buku itu di atas meja.",
      sebabBetul: "Pola FN+FSN tidak perlukan 'adalah' atau 'ialah'.",
    },
  ],

  caraMudahIngat: {
    akronim: {
      kata: "NKASI",
      makna: "Nama · Kerja · Adjektif · Sendi — 4 jenis predikat dalam Pola Ayat Inti",
    },
    visualMemory: [
      "Pola 1 (FN+FN): Persamaan — 'A = B'. Ahmad = guru. Malaysia = negara.",
      "Pola 2 (FN+FK): Perbuatan — orang melakukan sesuatu. Ahmad berlari.",
      "Pola 3 (FN+FA): Sifat — benda mempunyai ciri. Bunga cantik.",
      "Pola 4 (FN+FSN): Lokasi/hubungan — benda berada di mana. Buku di meja.",
    ],
    petua: [
      "Subjek SELALU Frasa Nama (FN). Yang berbeza hanya predikat.",
      "'ialah/adalah' = tanda Pola 1 (FN+FN). Tapi boleh juga tanpa 'ialah'.",
      "Kata sendi (di, ke, dari, untuk) = tanda Pola 4 (FN+FSN).",
    ],
  },

  kbat: [
    {
      situasi: "Ayat-ayat berikut diberikan: (A) 'Dia pelajar cemerlang.' (B) 'Murid belajar.' (C) 'Beg merah.' (D) 'Pen di dalam laci.'",
      soalan: "Kenal pasti pola setiap ayat dan jelaskan cara anda menentukan pola tersebut.",
      jawapanModel: "(A) Pola 1: FN + FN — predikat 'pelajar cemerlang' adalah frasa nama. (B) Pola 2: FN + FK — predikat 'belajar' adalah kata kerja. (C) Pola 3: FN + FA — predikat 'merah' adalah kata adjektif. (D) Pola 4: FN + FSN — predikat 'di dalam laci' bermula dengan kata sendi 'di'.",
      penjelasan: "Cara tentukan pola: lihat kata PERTAMA dalam predikat. Kata nama = Pola 1. Kata kerja = Pola 2. Kata adjektif = Pola 3. Kata sendi = Pola 4.",
    },
    {
      situasi: "Guru minta kamu bina SATU ayat untuk setiap pola ayat inti berkaitan tema 'alam sekitar'.",
      soalan: "Bina 4 ayat (satu untuk setiap pola) bertemakan alam sekitar.",
      jawapanModel: "Pola 1 (FN+FN): 'Hutan hujan tropika khazanah negara kita.' Pola 2 (FN+FK): 'Masyarakat setempat menjaga kebersihan sungai.' Pola 3 (FN+FA): 'Udara di kampung segar dan nyaman.' Pola 4 (FN+FSN): 'Tapak pelupusan sampah di luar kawasan bandar.'",
      penjelasan: "Ayat yang dibina mesti mempunyai SUBJEK (FN) yang jelas dan PREDIKAT yang mengikut pola yang dikehendaki.",
    },
  ],

  kuiz: [
    {
      q: "Berapa bilangannya Pola Ayat Inti dalam Bahasa Melayu?",
      options: ["2", "3", "4", "5"],
      answer: 2,
      explanation: "Terdapat 4 Pola Ayat Inti: FN+FN, FN+FK, FN+FA, FN+FSN.",
    },
    {
      q: "Ayat 'Bunga itu cantik.' mengikut pola?",
      options: ["FN + FN", "FN + FK", "FN + FA", "FN + FSN"],
      answer: 2,
      explanation: "'cantik' = kata adjektif dalam predikat → Pola 3: FN + FA.",
    },
    {
      q: "Kata 'ialah' biasanya menandakan pola?",
      options: ["FN + FK", "FN + FA", "FN + FN", "FN + FSN"],
      answer: 2,
      explanation: "'ialah' menghubungkan dua Frasa Nama (identiti/persamaan) → Pola 1: FN + FN.",
    },
    {
      q: "Ayat 'Buku di atas meja.' tergolong dalam pola?",
      options: ["FN + FN", "FN + FK", "FN + FA", "FN + FSN"],
      answer: 3,
      explanation: "'di atas meja' bermula dengan kata sendi 'di' → Frasa Sendi Nama → Pola 4: FN + FSN.",
    },
    {
      q: "Bahagian yang menjadi 'topik' dalam ayat inti ialah?",
      options: ["Predikat", "Keterangan", "Objek", "Subjek"],
      answer: 3,
      explanation: "Subjek = bahagian pertama ayat yang menjadi 'topik' yang diperkatakan.",
    },
    {
      q: "Semua pola ayat inti menggunakan _____ sebagai subjek.",
      options: ["Frasa Adjektif", "Frasa Nama", "Frasa Kerja", "Frasa Sendi Nama"],
      answer: 1,
      explanation: "Dalam semua 4 pola, SUBJEK selalu Frasa Nama (FN). Hanya predikat yang berbeza.",
    },
    {
      q: "Ayat 'Ahmad berlari di padang.' Predikat ayat ini ialah?",
      options: ["Ahmad", "berlari di padang", "padang", "di padang"],
      answer: 1,
      explanation: "Predikat = semua yang menerangkan subjek (Ahmad) = 'berlari di padang'.",
    },
    {
      q: "Pola FN + FK menyatakan?",
      options: ["Identiti subjek", "Perbuatan subjek", "Sifat subjek", "Kedudukan subjek"],
      answer: 1,
      explanation: "FN + FK = subjek melakukan sesuatu perbuatan (kata kerja dalam predikat).",
    },
    {
      q: "Ayat manakah mengikut pola FN + FN?",
      options: [
        "Dia berlari pantas.",
        "Dia seorang atlet.",
        "Dia berlari di padang.",
        "Dia pantas berlari.",
      ],
      answer: 1,
      explanation: "'seorang atlet' = Frasa Nama dalam predikat → Pola 1: FN + FN.",
    },
    {
      q: "Pola ayat inti yang predikatnya mengandungi kata sendi nama ialah?",
      options: ["Pola 1", "Pola 2", "Pola 3", "Pola 4"],
      answer: 3,
      explanation: "Pola 4: FN + FSN — predikat bermula dengan kata sendi (di, ke, dari, untuk).",
    },
  ],

  examBooster: {
    rumusan: [
      "4 Pola Ayat Inti: FN+FN, FN+FK, FN+FA, FN+FSN",
      "Pola 1 (FN+FN): menyatakan identiti — Ahmad guru.",
      "Pola 2 (FN+FK): menyatakan perbuatan — Murid belajar.",
      "Pola 3 (FN+FA): menyatakan sifat — Bunga cantik.",
      "Pola 4 (FN+FSN): menyatakan kedudukan/hubungan — Buku di meja.",
      "Subjek SELALU FN. Predikat boleh jadi 4 jenis.",
    ],
    lastMinuteTips: [
      "Lihat kata PERTAMA dalam predikat → tentukan pola.",
      "'ialah' = Pola 1 (FN+FN). Kata sendi = Pola 4 (FN+FSN).",
      "Semua ayat BM boleh dianalisis menggunakan 4 pola ini.",
      "Ayat inti = ayat paling pendek & asas. Tambah keterangan = ayat lebih panjang.",
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// 7. KESALAHAN AYAT
// ─────────────────────────────────────────────────────────────
const kesalahanAyat: SistemBahasaTopic = {
  id: "kesalahan-ayat",
  tajuk: "Kesalahan Ayat",
  subtitle: "Kenal pasti dan betulkan kesalahan tatabahasa yang paling kerap dilakukan",
  difficulty: "Tinggi",
  masaBelajar: "40 minit",
  warna: "#EF4444",

  pengenalan:
    "Ini topik PALING penting dalam UASA! Soalan 'betulkan ayat' selalu keluar. Bukan sahaja kamu perlu tahu apa yang salah, tapi KENAPA salah dan BAGAIMANA nak betulkan. Cikgu AcadeMy akan tunjukkan semua jenis kesalahan paling kerap supaya kamu tak buat kesilapan yang sama!",

  definisi: {
    teks: "Kesalahan Ayat merujuk kepada kesilapan tatabahasa, ejaan, penggunaan kata, atau struktur ayat yang menyalahi hukum-hukum Bahasa Melayu baku.",
    ciri: [
      "Boleh berlaku pada peringkat kata (ejaan, morfologi)",
      "Boleh berlaku pada peringkat frasa (susunan kata)",
      "Boleh berlaku pada peringkat ayat (struktur, pola)",
      "Sering disebabkan oleh pengaruh bahasa Inggeris atau bahasa pasar",
    ],
    ringkasan:
      "Tiga punca utama kesalahan: (1) Ejaan salah, (2) Kata salah guna, (3) Struktur ayat salah.",
  },

  cikguTerang: {
    intro:
      "Cikgu AcadeMy kategorikan kesalahan kepada 5 jenis. Hafal 5 jenis ini dan kamu dah boleh kenal pasti hampir semua kesalahan dalam UASA.",
    langkah: [
      {
        tajuk: "Jenis 1 — Kesalahan Ejaan",
        teks: "Ejaan tidak mengikut sistem ejaan Rumi Bahasa Melayu.",
        contoh: "aktiviti (✓) bukan 'aktifiti'. pelajar (✓) bukan 'plajar'. jadual (✓) bukan 'jadwal'.",
      },
      {
        tajuk: "Jenis 2 — Kesalahan Imbuhan",
        teks: "Penggunaan imbuhan yang salah atau tertinggal imbuhan yang diperlukan.",
        contoh: "'mentari' bukan 'matahari' (salah konteks). 'mempergunakan' atau 'menggunakan' (bukan 'mempergunai').",
      },
      {
        tajuk: "Jenis 3 — Kesalahan Kata Sendi Nama",
        teks: "Kata sendi yang salah digunakan atau terpengaruh dengan bahasa Inggeris.",
        contoh: "'ke sekolah' (✓) bukan 'pergi di sekolah'. 'daripada' (✓) bukan 'dari' untuk perbandingan.",
      },
      {
        tajuk: "Jenis 4 — Kesalahan Struktur Ayat",
        teks: "Susunan kata dalam ayat yang tidak mengikut tatabahasa BM.",
        contoh: "'Bunga itu cantik.' (✓) bukan 'Cantik bunga itu.' (struktur BI).",
      },
      {
        tajuk: "Jenis 5 — Kesalahan Kata Hubung",
        teks: "Kata hubung yang salah atau berulang dalam satu ayat.",
        contoh: "'Walaupun hujan, dia datang.' (✓) bukan 'Walaupun hujan, tetapi dia datang.' (kata hubung berulang).",
      },
    ],
    petua:
      "Dalam soalan UASA: baca ayat → kenal pasti yang pelik → semak ejaan, imbuhan, kata sendi, struktur, kata hubung → betulkan.",
  },

  jenis: [
    {
      nama: "Kesalahan Ejaan Lazim",
      definisi: "Ejaan yang salah akibat pengaruh fonetik atau bahasa lain.",
      formula: "Semak dengan Kamus Dewan atau senarai ejaan baku",
      contoh: ["aktiviti (bukan aktifiti)", "teknik (bukan tehnik)", "kualiti (bukan kualiti)", "sistem (bukan sistem)", "jadual (bukan jadwal)"],
      contohAyat: [
        "Aktiviti sukan akan diadakan esok. (bukan 'aktifiti')",
        "Teknik memasak itu mudah dipelajari. (bukan 'tehnik')",
        "Kualiti kerja mereka sangat baik. (bukan 'kualiti' — ejaan ini betul)",
      ],
    },
    {
      nama: "Kesalahan Penggunaan 'di' vs 'ke'",
      definisi: "Kekeliruan antara kata sendi tempat statik dan arah pergerakan.",
      formula: "'di' = statik (berada). 'ke' = pergerakan (menuju).",
      contoh: ["di sekolah (berada)", "ke sekolah (pergi)", "di rumah (ada di sana)", "ke rumah (menuju)"],
      contohAyat: [
        "Dia belajar di sekolah. ✓ (berada di sana)",
        "Dia pergi ke sekolah. ✓ (bergerak ke sana)",
        "Dia pergi di sekolah. ✗ (salah — pergi = bergerak = ke)",
      ],
    },
    {
      nama: "Kesalahan Kata Hubung Berganda",
      definisi: "Menggunakan dua kata hubung dalam satu ayat majmuk yang membawa makna yang sama.",
      formula: "PILIH SATU kata hubung sahaja",
      contoh: [
        "Walaupun...tetapi (❌) → pilih satu",
        "Kerana...sebab (❌) → pilih satu",
        "Meskipun...namun (boleh diterima dalam konteks tertentu)",
      ],
      contohAyat: [
        "Walaupun hujan lebat, dia tetap hadir. ✓",
        "Walaupun hujan lebat, tetapi dia tetap hadir. ✗",
        "Dia tidak hadir kerana sakit. ✓ (bukan 'kerana sebab sakit')",
      ],
    },
    {
      nama: "Kesalahan Perbandingan",
      definisi: "Menggunakan 'dari' sebagai ganti 'daripada' dalam perbandingan.",
      formula: "Perbandingan: lebih...DARIPADA (bukan 'dari')",
      contoh: [
        "lebih tinggi daripada (✓)",
        "lebih cantik dari (✗)",
        "berbeza daripada (✓)",
        "berlainan dari (✗)",
      ],
      contohAyat: [
        "Ali lebih tinggi daripada Abu. ✓",
        "Ali lebih tinggi dari Abu. ✗",
        "Keputusan itu berbeza daripada jangkaan. ✓",
      ],
    },
    {
      nama: "Kesalahan Kata Nafi",
      definisi: "Menggunakan 'tidak' untuk kata nama atau 'bukan' untuk kata kerja.",
      formula: "'tidak' + KK/KA. 'bukan' + KN.",
      contoh: [
        "tidak pergi (✓)", "bukan guru (✓)",
        "tidak guru (✗)", "bukan pergi (✗)",
      ],
      contohAyat: [
        "Dia tidak hadir ke sekolah. ✓",
        "Dia bukan pelajar kelas ini. ✓",
        "Dia tidak pelajar kelas ini. ✗",
        "Dia bukan hadir ke sekolah. ✗",
      ],
    },
  ],

  contohHarian: {
    harian: [
      "SALAH: 'Ibu pergi di pasar.' BETUL: 'Ibu pergi ke pasar.' (ke = arah pergerakan)",
      "SALAH: 'Walaupun penat, tetapi dia masak.' BETUL: 'Walaupun penat, dia tetap masak.'",
      "SALAH: 'Adik lebih rajin dari kakak.' BETUL: 'Adik lebih rajin daripada kakak.'",
      "SALAH: 'Dia tidak doktor.' BETUL: 'Dia bukan doktor.' ('bukan' untuk kata nama)",
      "SALAH: 'Kucing itu sangat cantik sekali.' BETUL: 'Kucing itu sangat cantik.' (satu penguat)",
    ],
    sekolah: [
      "SALAH: 'Aktifiti ko-kurikulum diadakan petang.' BETUL: 'Aktiviti ko-kurikulum...'",
      "SALAH: 'Cikgu menerangkan teknik-tehnik soalan.' BETUL: '...teknik-teknik soalan.'",
      "SALAH: 'Murid-murid pergi di padang.' BETUL: 'Murid-murid pergi ke padang.'",
      "SALAH: 'Kerana sakit, sebab itu dia tidak hadir.' BETUL: 'Kerana sakit, dia tidak hadir.'",
      "SALAH: 'Jadwal peperiksaan sudah diumumkan.' BETUL: 'Jadual peperiksaan...'",
    ],
    peperiksaan: [
      "SALAH: 'Pahlawan itu lebih berani dari musuh.' BETUL: '...lebih berani daripada musuh.'",
      "SALAH: 'Walaupun miskin, tetapi hatinya mulia.' BETUL: 'Walaupun miskin, hatinya tetap mulia.'",
      "SALAH: 'Cantik pemandangan di pantai itu.' BETUL: 'Pemandangan di pantai itu cantik.'",
      "SALAH: 'Dia tidak guru, dia jurutera.' BETUL: 'Dia bukan guru, dia jurutera.'",
      "SALAH: 'Buku itu diambil dari Ahmad.' BETUL: 'Buku itu diambil daripada Ahmad.' (asal = daripada)",
    ],
  },

  tipsUASA: {
    kerap: [
      "Soalan betulkan ayat: biasanya 5-10 ayat dengan 1-2 kesalahan setiap ayat.",
      "Kata sendi 'di' vs 'ke' — kesalahan paling kerap dalam UASA.",
      "Kata hubung berganda (walaupun...tetapi) — kesalahan kedua paling kerap.",
      "Ejaan: 'aktiviti', 'teknik', 'jadual', 'kualiti' — hafal ejaan baku ini.",
    ],
    pemeriksa: [
      "Pemeriksa mahu calon KENAL PASTI kesalahan DAN betulkan dengan tepat.",
      "Garis bawah kata yang salah, tulis pembetulan di sebelahnya.",
      "Jangan tukar makna ayat semasa membetulkan — hanya betulkan tatabahasa.",
    ],
    format: [
      "Format UASA: 'Kesalahan: _____. Pembetulan: _____.'",
      "Atau: garis bawah kesalahan dalam ayat dan tulis ayat yang betul.",
      "Format petikan: baca, kenal pasti semua kesalahan, betulkan dengan tepat.",
    ],
  },

  kesalahan: [
    {
      salah: "Walaupun hujan lebat, tetapi mereka tetap hadir.",
      sebabSalah: "Dua kata hubung 'walaupun' dan 'tetapi' tidak boleh digunakan serentak.",
      betul: "Walaupun hujan lebat, mereka tetap hadir.",
      sebabBetul: "Pilih SATU kata hubung. 'Walaupun' sudah cukup untuk menyatakan pertentangan.",
    },
    {
      salah: "Dia pergi di kedai buku.",
      sebabSalah: "'pergi' menunjukkan pergerakan, maka perlu 'ke' (arah), bukan 'di' (statik).",
      betul: "Dia pergi ke kedai buku.",
      sebabBetul: "'ke' = menuju ke destinasi. 'di' = sudah berada di tempat.",
    },
    {
      salah: "Hasil kerja dia lebih baik dari kerja saya.",
      sebabSalah: "Perbandingan dalam BM menggunakan 'daripada', bukan 'dari'.",
      betul: "Hasil kerja dia lebih baik daripada hasil kerja saya.",
      sebabBetul: "'daripada' = perbandingan. 'dari' = tempat/masa permulaan.",
    },
    {
      salah: "Sangat cantik sekali bunga itu.",
      sebabSalah: "Dua kesalahan: (1) penguat berganda 'sangat...sekali', (2) susunan ayat terbalik (pengaruh BI).",
      betul: "Bunga itu sangat cantik.",
      sebabBetul: "Subjek dahulu, predikat kemudian. Satu penguat sahaja.",
    },
    {
      salah: "Murid tidak guru, dia pelajar.",
      sebabSalah: "'tidak' digunakan untuk menafi kata kerja/adjektif, bukan kata nama 'guru'.",
      betul: "Murid bukan guru, dia pelajar.",
      sebabBetul: "'bukan' menafi kata nama. 'guru' = kata nama → perlu 'bukan'.",
    },
  ],

  caraMudahIngat: {
    akronim: {
      kata: "EIKSH",
      makna: "Ejaan · Imbuhan · Kata Sendi · Struktur · Hubung — 5 jenis kesalahan lazim",
    },
    visualMemory: [
      "'di' = pin (statik, diam di tempat). 'ke' = anak panah (bergerak ke arah).",
      "Kata hubung berganda = dua pengemudi dalam satu kereta — kereta tak jalan betul!",
      "'tidak' = X merah untuk kata kerja. 'bukan' = X merah untuk kata nama.",
    ],
    petua: [
      "Baca ayat dengan kuat — kalau bunyi pelik, mungkin ada kesalahan.",
      "Semak 5 perkara: ejaan, imbuhan, kata sendi, struktur, kata hubung.",
      "Jangan tukar makna ayat semasa membetulkan — hanya betulkan tatabahasa.",
    ],
  },

  kbat: [
    {
      situasi: "Petikan karangan murid: 'Ahmad sangat rajin sekali. Dia pergi di sekolah setiap hari walaupun sakit, tetapi dia tidak pernah ponteng. Dia lebih pandai dari semua kawan-kawannya.'",
      soalan: "Kenal pasti TIGA kesalahan tatabahasa dalam petikan dan betulkan setiap kesalahan.",
      jawapanModel: "(1) 'sangat rajin sekali' → 'sangat rajin' (penguat berganda). (2) 'pergi di sekolah' → 'pergi ke sekolah' (kata sendi salah). (3) 'walaupun...tetapi' → 'walaupun...,' sahaja (kata hubung berganda). (4) BONUS: 'lebih pandai dari' → 'lebih pandai daripada' (perbandingan).",
      penjelasan: "Kenal pasti kesalahan dengan semak 5 jenis: ejaan, imbuhan, kata sendi, struktur, kata hubung. Dalam petikan ini: kata sendi, kata penguat berganda, dan kata hubung berganda.",
    },
    {
      situasi: "Murid menulis ayat: 'Cantik bunga-bunga di taman itu sangat sekali dan ianya amat menarik perhatian.'",
      soalan: "Kenal pasti SEMUA kesalahan dan tulis semula ayat dengan betul.",
      jawapanModel: "Kesalahan: (1) 'Cantik bunga-bunga' — susunan terbalik (adjektif dahulu). (2) 'sangat sekali' — penguat berganda. (3) 'ianya' — kata ganti yang tidak baku (guna 'ia' atau 'bunga-bunga itu'). Ayat betul: 'Bunga-bunga di taman itu sangat cantik dan menarik perhatian.'",
      penjelasan: "'Ianya' adalah kata ganti tidak baku dalam BM tulisan formal. Gunakan 'ia' atau ulangi kata nama.",
    },
  ],

  kuiz: [
    {
      q: "Ayat manakah yang BETUL?",
      options: [
        "Walaupun penat, tetapi dia terus belajar.",
        "Walaupun penat, dia terus belajar.",
        "Penat walaupun, dia terus belajar.",
        "Dia terus belajar walaupun tetapi penat.",
      ],
      answer: 1,
      explanation: "Pilih SATU kata hubung. 'Walaupun' sudah cukup tanpa 'tetapi'.",
    },
    {
      q: "Kata sendi yang betul: 'Dia pergi _____ pasar.'",
      options: ["di", "dari", "ke", "daripada"],
      answer: 2,
      explanation: "'pergi' = bergerak → gunakan 'ke' (arah tujuan). 'di' untuk tempat statik.",
    },
    {
      q: "Pembetulan bagi 'sangat cantik sekali' ialah?",
      options: ["sangat cantik amat", "amat cantik sekali", "sangat cantik", "cantik sangat"],
      answer: 2,
      explanation: "Satu penguat sahaja: 'sangat cantik' ATAU 'cantik sekali'.",
    },
    {
      q: "Ayat 'Dia tidak pelajar.' kesalahannya ialah?",
      options: [
        "Salah ejaan 'tidak'",
        "Kata nafi 'tidak' salah — guna 'bukan' untuk kata nama",
        "Subjek tidak jelas",
        "Tiada predikat",
      ],
      answer: 1,
      explanation: "'pelajar' = kata nama → gunakan 'bukan', bukan 'tidak'.",
    },
    {
      q: "Ejaan yang BETUL ialah?",
      options: ["aktifiti", "tehnik", "jadwal", "aktiviti"],
      answer: 3,
      explanation: "Ejaan baku: 'aktiviti' (bukan aktifiti), 'teknik' (bukan tehnik), 'jadual' (bukan jadwal).",
    },
    {
      q: "Perbandingan yang betul ialah?",
      options: [
        "Ali lebih tinggi dari Abu.",
        "Ali lebih tinggi berbanding Abu.",
        "Ali lebih tinggi daripada Abu.",
        "Ali lebih tinggi dengan Abu.",
      ],
      answer: 2,
      explanation: "Perbandingan BM: 'lebih... daripada'. 'dari', 'berbanding', 'dengan' adalah salah.",
    },
    {
      q: "Ayat 'Cantik bunga itu.' salah kerana?",
      options: [
        "Ejaan salah",
        "Tiada objek",
        "Susunan terbalik — pengaruh bahasa Inggeris",
        "Kata adjektif salah",
      ],
      answer: 2,
      explanation: "Dalam BM: Subjek dahulu (Bunga itu), predikat kemudian (cantik). Bukan bermula dengan adjektif.",
    },
    {
      q: "Kesalahan dalam 'Buku diambil daripada atas meja.' ialah?",
      options: [
        "Tiada kesalahan — ayat betul",
        "'daripada' sepatutnya 'di' untuk tempat",
        "Kata kerja salah",
        "Subjek tidak jelas",
      ],
      answer: 1,
      explanation: "'dari atas meja' = tempat asal → guna 'dari', bukan 'daripada'. 'daripada' untuk sumber/perbandingan.",
    },
    {
      q: "Ayat manakah yang TIADA kesalahan?",
      options: [
        "Murid-murid pergi di padang.",
        "Dia bukan pergi ke sekolah.",
        "Mereka lebih rajin daripada kita.",
        "Walaupun hujan tetapi dia datang.",
      ],
      answer: 2,
      explanation: "'lebih rajin daripada' = perbandingan yang betul.",
    },
    {
      q: "'Ianya' dalam ayat formal adalah?",
      options: [
        "Kata ganti yang betul",
        "Kata ganti tidak baku — guna 'ia' sahaja",
        "Boleh digunakan dalam semua konteks",
        "Kata ganti hormat",
      ],
      answer: 1,
      explanation: "'Ianya' adalah bentuk tidak baku. Dalam BM formal, guna 'ia' atau 'itu'.",
    },
  ],

  examBooster: {
    rumusan: [
      "5 jenis kesalahan: Ejaan, Imbuhan, Kata Sendi, Struktur, Kata Hubung",
      "'di' = statik (di sekolah). 'ke' = bergerak (ke sekolah).",
      "Perbandingan: 'lebih...DARIPADA' (bukan 'dari' atau 'berbanding')",
      "Kata nafi: 'tidak' + KK/KA. 'bukan' + KN.",
      "Kata hubung berganda salah: walaupun...tetapi ✗. Pilih SATU.",
      "Ejaan baku: aktiviti, teknik, jadual, kualiti.",
    ],
    lastMinuteTips: [
      "Baca ayat kuat-kuat — bunyi pelik = ada kesalahan.",
      "Semak 5 perkara: Ejaan, Imbuhan, Kata Sendi, Struktur, Kata Hubung.",
      "Jangan tukar MAKNA — hanya betulkan TATABAHASA.",
      "'Ianya' = tidak baku. 'Sangat...sekali' = penguat berganda. Kedua-duanya salah.",
    ],
  },
};

// ─────────────────────────────────────────────────────────────
// 8. PERIBAHASA ASAS
// ─────────────────────────────────────────────────────────────
const peribahasaAsas: SistemBahasaTopic = {
  id: "peribahasa-asas",
  tajuk: "Peribahasa Asas",
  subtitle: "Peribahasa, simpulan bahasa, dan perumpamaan paling penting Form 1",
  difficulty: "Sederhana",
  masaBelajar: "35 minit",
  warna: "#10B981",

  pengenalan:
    "Peribahasa adalah 'permata' Bahasa Melayu! Orang Melayu zaman dahulu sangat bijak — mereka guna cerita alam semula jadi untuk ajar nilai dan nasihat. Bila kamu guna peribahasa dalam karangan, markah kamu naik TERUS! Tapi kena guna dengan BETUL — peribahasa yang salah konteks lebih teruk dari tak guna langsung.",

  definisi: {
    teks: "Peribahasa ialah ayat atau rangkai kata yang padat, indah, dan mengandungi pengajaran atau nasihat yang mendalam, mencerminkan kebijaksanaan dan kebudayaan masyarakat Melayu.",
    ciri: [
      "Mengandungi makna kiasan (bukan makna sebenar/literal)",
      "Ringkas tapi bermakna mendalam",
      "Mencerminkan pengalaman dan kebijaksanaan masyarakat Melayu",
      "Terdiri daripada beberapa jenis: simpulan bahasa, perumpamaan, pepatah, bidalan",
    ],
    ringkasan:
      "Peribahasa = makna KIASAN, bukan literal. 'Bagai aur dengan tebing' bukan tentang aur dan tebing sebenar!",
  },

  cikguTerang: {
    intro:
      "Cikgu AcadeMy ajar cara mudah guna peribahasa: SITUASI → PERIBAHASA → MAKNA. Jangan hafal peribahasa sahaja — kena tahu bila nak guna!",
    langkah: [
      {
        tajuk: "Langkah 1 — Bezakan 3 jenis utama",
        teks: "Simpulan bahasa = 2-3 kata sahaja. Perumpamaan = ada 'bagai/seperti'. Pepatah = ayat penuh dengan nasihat.",
        contoh: "Simpulan: 'buah tangan'. Perumpamaan: 'bagai aur dengan tebing'. Pepatah: 'Seperti ketam mengajar anaknya berjalan lurus'.",
      },
      {
        tajuk: "Langkah 2 — Kenal makna kiasan",
        teks: "Baca peribahasa → fikir konteks cerita alam → hubungkan dengan sifat manusia.",
        contoh: "'Bagai aur dengan tebing' → aur (pokok) bergantung pada tebing untuk kukuh → Makna: saling memerlukan/tolong-menolong.",
      },
      {
        tajuk: "Langkah 3 — Gunakan dalam konteks yang betul",
        teks: "Peribahasa mesti digunakan dalam situasi yang SESUAI dengan maknanya.",
        contoh: "'Bersatu teguh bercerai roboh' → guna bila cerita tentang kerjasama/perpaduan, bukan tentang kasih sayang.",
      },
      {
        tajuk: "Langkah 4 — Wajib hafal 15 peribahasa penting",
        teks: "Hafal peribahasa yang kerap keluar dalam UASA. Ingat: peribahasa + makna + cara guna.",
        contoh: "Ingat dalam kumpulan tema: kerjasama, rajin, tamak, bijak, bersyukur.",
      },
    ],
    petua:
      "Dalam karangan UASA, masukkan 1-2 peribahasa yang SESUAI dengan tema. Markah bahasa naik 2-3 markah! Tapi jangan paksa masuk peribahasa yang tak berkaitan.",
  },

  jenis: [
    {
      nama: "Simpulan Bahasa",
      definisi: "Gabungan dua atau tiga patah perkataan yang membawa makna kiasan berbeza dari makna asal.",
      formula: "2-3 kata → makna kiasan",
      contoh: [
        "buah tangan (hadiah)",
        "kepala angin (orang tidak serius)",
        "keras kepala (degil)",
        "ringan tulang (rajin)",
        "berat tulang (malas)",
        "panjang tangan (suka mencuri)",
        "murah hati (pemurah)",
        "tinggi hati (sombong)",
      ],
      contohAyat: [
        "Dia membawa buah tangan dari kampung. (hadiah)",
        "Janganlah bersifat keras kepala kerana akan rugi sendiri. (degil)",
        "Pekerja yang ringan tulang disukai majikan. (rajin)",
      ],
    },
    {
      nama: "Perumpamaan",
      definisi: "Peribahasa yang menggunakan perbandingan dengan kata 'bagai', 'seperti', 'umpama', 'laksana'.",
      formula: "bagai/seperti + benda alam + makna kiasan",
      contoh: [
        "bagai aur dengan tebing (saling memerlukan)",
        "seperti katak di bawah tempurung (berwawasan sempit)",
        "bagai api dalam sekam (marah tapi tidak zahir)",
        "umpama padi makin berisi makin tunduk (orang bijak semakin merendah diri)",
      ],
      contohAyat: [
        "Persahabatan mereka bagai aur dengan tebing — saling memerlukan.",
        "Jangan jadi seperti katak di bawah tempurung, perluas pengetahuan.",
        "Orang yang berilmu umpama padi makin berisi makin tunduk.",
      ],
    },
    {
      nama: "Pepatah",
      definisi: "Ungkapan panjang yang mengandungi nasihat atau pengajaran moral yang mendalam.",
      formula: "Ayat penuh + makna nasihat",
      contoh: [
        "Melentur buluh biarlah dari rebungnya (didik anak dari kecil)",
        "Bersatu teguh bercerai roboh (perpaduan penting)",
        "Seperti ketam mengajar anaknya berjalan lurus (tak ajar apa yang tak buat sendiri)",
        "Berakit-rakit ke hulu berenang-renang ke tepian (bersakit dahulu bersenang kemudian)",
      ],
      contohAyat: [
        "Seperti yang dikatakan, 'melentur buluh biarlah dari rebungnya' — didiklah anak dari kecil.",
        "Semangat 'bersatu teguh bercerai roboh' perlu diamalkan untuk capai matlamat.",
      ],
    },
  ],

  contohHarian: {
    harian: [
      "Adik membawa buah tangan selepas lawatan ke Melaka. (buah tangan = hadiah)",
      "Budak itu memang kepala angin — janji selalu tak tepat. (kepala angin = tak serius)",
      "Murah hati lelaki itu membuatkan semua orang sukakan dia. (murah hati = pemurah)",
      "Umpama padi makin berisi makin tunduk — orang berilmu tidak sombong.",
      "Ibu selalu pesan, 'berakit-rakit ke hulu' — kena susah dahulu baru senang kemudian.",
    ],
    sekolah: [
      "Kerjasama kelas kami bagai aur dengan tebing — saling memerlukan untuk berjaya.",
      "Janganlah jadi seperti katak di bawah tempurung — buka minda dan belajar banyak perkara.",
      "'Melentur buluh biarlah dari rebungnya' — cikgu selalu ajar nilai baik dari awal.",
      "Murid yang ringan tulang akan berjaya berbanding yang berat tulang.",
      "'Bersatu teguh bercerai roboh' — kelas kita mesti bersatu untuk menang dalam pertandingan.",
    ],
    peperiksaan: [
      "Semangat patriotisme rakyat 'bagai api dalam sekam' — membara di dalam jiwa walaupun tidak dizahirkan.",
      "Pemimpin yang bijaksana umpama padi makin berisi makin tunduk — semakin berkuasa semakin merendah diri.",
      "Rakyat bersatu mengikut semangat 'bersatu teguh bercerai roboh' untuk mempertahankan negara.",
      "Ibu bapa membesarkan anak dengan penuh kasih sayang, 'melentur buluh biarlah dari rebungnya'.",
      "Wira-wira negara berjuang 'seperti aur dengan tebing' — saling sokong-menyokong.",
    ],
  },

  tipsUASA: {
    kerap: [
      "Soalan padankan peribahasa dengan makna — hafal 15 peribahasa penting!",
      "Soalan isi tempat: pilih peribahasa yang sesuai dengan konteks ayat.",
      "Soalan karangan: masukkan 1-2 peribahasa → markah bahasa naik.",
      "Soalan makna simpulan bahasa: 'Huraikan makna simpulan bahasa _____ dalam ayat.'",
    ],
    pemeriksa: [
      "Pemeriksa mahu makna TEPAT — jangan bagi makna yang terlalu umum.",
      "Jangan salah guna peribahasa — guna yang sesuai dengan konteks sahaja.",
      "Dalam karangan, peribahasa mesti relevan dengan isi — jangan paksa masuk.",
    ],
    format: [
      "Format makna: 'Simpulan bahasa/Peribahasa _____ bermaksud _____.'",
      "Format penggunaan: 'Peribahasa _____ sesuai digunakan dalam situasi _____.'",
      "Format karangan: masukkan dalam ayat yang gramatis dan relevan.",
    ],
  },

  kesalahan: [
    {
      salah: "Dia bagai api dalam sekam kerana dia suka bercerita.",
      sebabSalah: "'Bagai api dalam sekam' bermaksud marah atau benci tapi tak dizahirkan — bukan orang yang suka bercerita.",
      betul: "Kemarahannya bagai api dalam sekam — tidak tampak di luar tapi membara di dalam.",
      sebabBetul: "Gunakan peribahasa mengikut makna yang tepat. 'Api dalam sekam' = emosi terpendam.",
    },
    {
      salah: "Orang tamak bagai aur dengan tebing.",
      sebabSalah: "'Bagai aur dengan tebing' bermaksud saling memerlukan/bekerjasama — bukan tentang kerakusan/tamak.",
      betul: "Orang tamak haloba bagai anjing dengan bayang-bayang — lebih mengutamakan yang tak ada dari yang ada.",
      sebabBetul: "Peribahasa mesti sesuai dengan sifat/situasi yang diceritakan.",
    },
    {
      salah: "Buah hati ibunya sangat lazat.",
      sebabSalah: "'Buah hati' = orang yang disayangi/anak tersayang, BUKAN 'buah' yang boleh dimakan.",
      betul: "Anak itu ialah buah hati ibunya yang paling disayangi.",
      sebabBetul: "Simpulan bahasa bermakna KIASAN, bukan literal.",
    },
    {
      salah: "Murid rajin adalah berat tulang.",
      sebabSalah: "'Berat tulang' = malas. Murid rajin = 'ringan tulang'.",
      betul: "Murid rajin adalah ringan tulang.",
      sebabBetul: "'Ringan tulang' = rajin bekerja. 'Berat tulang' = malas.",
    },
    {
      salah: "Dia keras kepala kerana dia kuat bersenam.",
      sebabSalah: "'Keras kepala' = degil/tidak mahu ikut nasihat — bukan berkaitan fizikal.",
      betul: "Dia keras kepala — tidak mahu ikut nasihat orang lain.",
      sebabBetul: "'Keras kepala' = kiasan untuk orang yang degil, bukan kepala yang keras secara fizikal.",
    },
  ],

  caraMudahIngat: {
    akronim: {
      kata: "SPP",
      makna: "Simpulan (2-3 kata) · Perumpamaan (bagai/seperti) · Pepatah (ayat penuh)",
    },
    visualMemory: [
      "Simpulan bahasa = 'kunci kecil buka pintu besar' — 2-3 kata tapi makna besar.",
      "Perumpamaan = kaca pembesar — membandingkan sifat manusia dengan alam.",
      "Pepatah = kata-kata datuk/nenek — panjang, penuh nasihat kehidupan.",
    ],
    petua: [
      "Hafal dalam TEMA: kerjasama (aur-tebing, bersatu teguh), rajin (ringan tulang, berakit-rakit), bijak (padi makin berisi).",
      "Peribahasa bermakna KIASAN — jangan terjemah secara literal!",
      "Dalam karangan: 1-2 peribahasa yang SESUAI lebih baik dari 5 peribahasa yang tak kena.",
    ],
  },

  kbat: [
    {
      situasi: "Situasi: Sebuah kelas berjaya memenangi pertandingan kerana semua ahli bekerjasama walaupun ada yang lebih berbakat dari yang lain.",
      soalan: "Pilih SATU peribahasa yang paling sesuai untuk situasi ini dan jelaskan kesesuaiannya.",
      jawapanModel: "Peribahasa yang sesuai: 'Bersatu teguh bercerai roboh'. Kesesuaian: Kelas berjaya KERANA bekerjasama (bersatu). Kalau tidak bersatu (bercerai), tidak akan berjaya (roboh). Peribahasa ini tepat menggambarkan bahawa kejayaan datang dari perpaduan, bukan dari bakat individu semata-mata.",
      penjelasan: "Pilih peribahasa berdasarkan TEMA situasi. Situasi kerjasama → peribahasa tentang perpaduan/kerjasama.",
    },
    {
      situasi: "Soalan karangan: 'Kepentingan mendidik anak sejak kecil.' Anda perlu masukkan peribahasa yang sesuai.",
      soalan: "Tulis SATU ayat menggunakan peribahasa yang sesuai dengan tema 'mendidik anak sejak kecil' dan jelaskan penggunaannya.",
      jawapanModel: "'Seperti pepatah Melayu, \"melentur buluh biarlah dari rebungnya\" — adalah lebih mudah untuk membentuk peribadi anak apabila mereka masih kecil berbanding menunggu sehingga mereka dewasa.' Penjelasan: 'Melentur buluh dari rebung' = membentuk/mendidik (melentur) manusia (buluh) dari kecil (rebung = tunas muda). Sesuai dengan tema mendidik anak sejak kecil.",
      penjelasan: "Peribahasa dalam karangan mesti (1) ditulis dengan betul, (2) dalam ayat gramatis, (3) sesuai dengan isi karangan.",
    },
  ],

  kuiz: [
    {
      q: "Simpulan bahasa 'ringan tulang' bermaksud?",
      options: ["Tulang yang kecil", "Rajin bekerja", "Sakit tulang", "Malas"],
      answer: 1,
      explanation: "'Ringan tulang' = kiasan untuk orang yang rajin bekerja.",
    },
    {
      q: "Peribahasa 'bagai aur dengan tebing' bermaksud?",
      options: [
        "Suka bergaduh",
        "Tidak berguna",
        "Saling memerlukan dan membantu",
        "Tinggal berdekatan",
      ],
      answer: 2,
      explanation: "Aur (pokok) dan tebing saling bergantung → bermaksud saling memerlukan/tolong-menolong.",
    },
    {
      q: "Pepatah 'melentur buluh biarlah dari rebungnya' sesuai untuk situasi?",
      options: [
        "Memasak makanan",
        "Mendidik anak dari kecil",
        "Berkebun",
        "Belajar bermain muzik",
      ],
      answer: 1,
      explanation: "'Rebung' = tunas muda (kiasan anak kecil). 'Melentur' = mendidik/membentuk. Sesuai untuk tema mendidik anak.",
    },
    {
      q: "Perumpamaan menggunakan kata?",
      options: ["kerana, supaya", "dan, atau", "bagai, seperti, umpama", "di, ke, dari"],
      answer: 2,
      explanation: "Perumpamaan menggunakan kata perbandingan: bagai, seperti, umpama, laksana.",
    },
    {
      q: "Simpulan bahasa 'tinggi hati' bermaksud?",
      options: ["Tinggi badan", "Sombong/angkuh", "Bercita-cita tinggi", "Berani"],
      answer: 1,
      explanation: "'Tinggi hati' = kiasan untuk orang yang sombong/angkuh.",
    },
    {
      q: "'Seperti katak di bawah tempurung' bermaksud?",
      options: [
        "Tinggal di hutan",
        "Berwawasan sempit/tidak tahu apa-apa",
        "Suka bersembunyi",
        "Takut keluar rumah",
      ],
      answer: 1,
      explanation: "Katak di bawah tempurung = tidak nampak dunia luar → wawasan sempit, tidak berpengalaman.",
    },
    {
      q: "'Bersatu teguh bercerai roboh' bermaksud?",
      options: [
        "Jangan berpisah dari keluarga",
        "Perpaduan membawa kekuatan; perpecahan membawa kelemahan",
        "Bina rumah yang kukuh",
        "Suka bergaduh",
      ],
      answer: 1,
      explanation: "Bersatu (perpaduan) = teguh (kuat). Bercerai (berpecah) = roboh (lemah/hancur).",
    },
    {
      q: "Dalam karangan UASA, penggunaan peribahasa yang baik ialah?",
      options: [
        "Masukkan sebanyak mungkin peribahasa",
        "Masukkan 1-2 peribahasa yang sesuai dengan tema",
        "Jangan guna peribahasa langsung",
        "Hanya guna simpulan bahasa sahaja",
      ],
      answer: 1,
      explanation: "1-2 peribahasa yang tepat dan sesuai dengan tema lebih bernilai dari banyak peribahasa yang tidak kena.",
    },
    {
      q: "Simpulan bahasa 'murah hati' bermaksud?",
      options: ["Harga barang murah", "Suka beri wang", "Pemurah/suka memberi", "Hati yang kecil"],
      answer: 2,
      explanation: "'Murah hati' = kiasan untuk orang yang pemurah, suka memberi dan membantu.",
    },
    {
      q: "Makna peribahasa berbeza dari makna literal kerana peribahasa menggunakan?",
      options: ["Makna sebenar", "Makna kiasan", "Makna saintifik", "Makna kamus"],
      answer: 1,
      explanation: "Peribahasa menggunakan makna KIASAN — bukan makna sebenar/literal perkataan.",
    },
  ],

  examBooster: {
    rumusan: [
      "3 jenis peribahasa: Simpulan (2-3 kata), Perumpamaan (bagai/seperti), Pepatah (ayat penuh)",
      "Peribahasa = makna KIASAN, bukan literal",
      "15 peribahasa wajib hafal: ringan tulang, murah hati, bagai aur dengan tebing, katak di bawah tempurung, melentur buluh dari rebungnya, bersatu teguh bercerai roboh, padi makin berisi makin tunduk...",
      "Guna peribahasa dalam karangan = markah bahasa naik!",
      "Kesesuaian > kuantiti: 1 peribahasa sesuai lebih baik dari 5 yang tak kena",
    ],
    lastMinuteTips: [
      "Hafal dalam TEMA: kerjasama, rajin, bijak/rendah diri, didikan.",
      "Simpulan bahasa paling kerap disoal: ringan/berat tulang, murah/tinggi hati, keras kepala.",
      "Perumpamaan paling kerap: bagai aur dengan tebing, katak di bawah tempurung.",
      "Pepatah paling kerap: melentur buluh dari rebungnya, bersatu teguh bercerai roboh.",
    ],
  },
};

// Full export — all 8 topics
export const SISTEM_BAHASA_CONTENT: SistemBahasaTopic[] = [
  kataNama,
  kataAdjektif,
  kataTugas,
  kataKerjaTakTransitif,
  kataGanda,
  polaAyatInti,
  kesalahanAyat,
  peribahasaAsas,
];

export function getSistemBahasaContent(topicId: string): SistemBahasaTopic | undefined {
  return SISTEM_BAHASA_CONTENT.find((t) => t.id === topicId);
}
