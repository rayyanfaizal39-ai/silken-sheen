export interface Subtopic {
  key: string;
  num: number;
  title: string;
  summary: string;
  keywords: string[];
}

// Sejarah Form 1 subtopics, keyed by chapter (e.g. "Chapter 1")
export const sejarahF1Subtopics: Record<string, Subtopic[]> = {
  "Chapter 1": [
    {
      key: "c1-s1",
      num: 1,
      title: "Pengertian Sejarah",
      summary:
        "Istilah sejarah mempunyai makna unik mengikut bahasa dan pandangan tokoh. Dalam bahasa Arab, ia berasal daripada perkataan 'syajaratun' yang bermaksud pokok — melambangkan salasilah dan asal usul. Dalam bahasa Melayu, sejarah merujuk kepada asal usul, silsilah, dan peristiwa yang benar-benar berlaku, dengan istilah lain seperti 'tambo' (riwayat dahulu kala). Dalam bahasa Inggeris, 'history' berasal daripada perkataan Yunani 'historia' yang bermaksud penyelidikan. Herodotus (Bapa Sejarah) menyatakan sejarah ialah penceritaan tentang tindakan manusia yang mengagumkan. Ibn Khaldun membicarakan masyarakat manusia, peradaban dunia, dan perubahan sifat masyarakat. E.H. Carr menganggap sejarah sebagai proses interaksi berterusan antara ahli sejarah dengan fakta-faktanya. Khoo Kay Kim pula merujuk sejarah kepada apa-apa yang pernah atau sudah berlaku.",
      keywords: ["syajaratun", "tambo", "historia", "Herodotus", "Ibn Khaldun", "E.H. Carr", "Khoo Kay Kim"],
    },
    {
      key: "c1-s2",
      num: 2,
      title: "Masa Silam dan Ruang dalam Sejarah",
      summary:
        "Masa silam ialah rentetan peristiwa yang telah berlaku, manakala kronologi ialah penyusunan peristiwa mengikut urutan masa kejadian. Unit masa penting termasuk dekad (10 tahun), abad (100 tahun), dan alaf (1,000 tahun). Konsep Sebelum Masihi (SM) merujuk kepada zaman sebelum kelahiran Nabi Isa AS, manakala Masihi (M) merujuk kepada selepas kelahiran baginda. Pemahaman ruang dan masa membantu sejarawan menyusun peristiwa secara teratur untuk menerangkan sebab dan akibat sesuatu kejadian.",
      keywords: ["masa silam", "kronologi", "dekad", "abad", "alaf", "SM", "Masihi"],
    },
    {
      key: "c1-s3",
      num: 3,
      title: "Sumber Sejarah",
      summary:
        "Sumber sejarah terbahagi kepada dua: sumber primer dan sumber sekunder. Sumber primer bersifat asli dan belum diolah — contohnya fosil, artifak (kapak batu, loceng gangsa, mata wang), dokumen rasmi, diari, manuskrip asal, batu bersurat, serta bukan artifak seperti dinding gua, struktur candi, dan lubang sampah yang tidak boleh dialih. Sumber sekunder ialah bahan yang telah diolah, ditafsir, dan diterbitkan untuk umum — contohnya buku teks, majalah, surat khabar, dan ensiklopedia. Sumber primer adalah lebih sahih kerana ia berasal terus dari zaman peristiwa berlaku.",
      keywords: ["sumber primer", "sumber sekunder", "artifak", "bukan artifak", "fosil", "manuskrip"],
    },
    {
      key: "c1-s4",
      num: 4,
      title: "Kaedah Penyelidikan Sejarah",
      summary:
        "Terdapat tiga kaedah utama penyelidikan sejarah. (1) Kaedah Bertulis: mengkaji catatan pada batu bersurat, dinding gua, kulit kayu, gading, dan kertas. Langkahnya bermula dengan mengenal pasti sumber, mengumpul, mengesahkan, menganalisis, dan akhirnya menulis. (2) Kaedah Lisan: mendapatkan maklumat melalui temubual dengan tokoh atau saksi peristiwa (orang sumber). Risikonya ialah wujud unsur tokok tambah akibat ingatan yang lemah. (3) Kaedah Arkeologi: pendekatan saintifik melalui aktiviti gali cari (ekskavasi) peninggalan sejarah di permukaan tanah atau di bawah air, menggunakan teknologi moden seperti ujian karbon radioaktif.",
      keywords: ["kaedah bertulis", "kaedah lisan", "kaedah arkeologi", "ekskavasi", "orang sumber", "tokok tambah"],
    },
    {
      key: "c1-s5",
      num: 5,
      title: "Tafsiran Sejarah",
      summary:
        "Tafsiran sejarah ialah tindakan menerangkan, mengulas, dan memberi makna kepada fakta sejarah berdasarkan sumber yang ada. Perbezaan tafsiran berlaku kerana perbezaan pandangan sejarawan, ideologi, latar belakang, tujuan penulisan, dan pemilihan sumber yang tidak sama. Contohnya, sejarawan Barat melihat Tok Janggut sebagai pemberontak, manakala sejarawan tempatan memandang beliau sebagai pejuang tanah air. Tafsiran objektif memerlukan pelbagai sumber. Kepentingan tafsiran ialah untuk mendorong kita berfikir secara kritis dalam menilai sesuatu peristiwa dari pelbagai sudut pandang.",
      keywords: ["tafsiran", "ideologi", "Tok Janggut", "objektif", "pemikiran kritis"],
    },
    {
      key: "c1-s6",
      num: 6,
      title: "Kepentingan Mempelajari Sejarah",
      summary:
        "Mempelajari sejarah membawa pelbagai kepentingan: (1) Mengenal asal usul keluarga, bangsa, dan negara untuk membina identiti diri. (2) Mengambil iktibar dan pengajaran daripada kejayaan dan kegagalan masa lalu supaya kita boleh membuat keputusan yang lebih baik. (3) Memupuk patriotisme — semangat cinta dan taat setia terhadap negara — dengan menghargai perjuangan nenek moyang dan warisan negara. (4) Mengukuhkan perpaduan dengan memahami sejarah, budaya, dan sumbangan pelbagai kaum di Malaysia agar dapat hidup harmoni.",
      keywords: ["asal usul", "iktibar", "patriotisme", "perpaduan", "warisan"],
    },
  ],
  "Chapter 2": [
    {
      key: "c2-s1",
      num: 1,
      title: "Pengenalan dan Istilah Penting",
      summary:
        "Zaman Air Batu ialah tempoh di mana suhu bumi turun secara mendadak dan sebahagian besar permukaan bumi dilitupi oleh lapisan air batu yang tebal. Usia bumi dianggarkan kira-kira 4.6 bilion tahun. Dua bidang utama yang mengkaji zaman ini ialah Geologi (sains mengkaji struktur fizikal dan sejarah pembentukan bumi) dan Paleontologi (kajian tentang fosil dan organisma purba). Istilah penting lain termasuk glasier (lapisan ais besar yang bergerak), pengglasieran (proses bumi dilitupi air batu), fosil (sisa hidupan purba), dan nomad (hidup berpindah-randah).",
      keywords: ["Zaman Air Batu", "Geologi", "Paleontologi", "glasier", "fosil", "nomad"],
    },
    {
      key: "c2-s2",
      num: 2,
      title: "Tahap Zaman Air Batu (MPPH)",
      summary:
        "Zaman Air Batu dibahagikan kepada empat tahap utama (MPPH): (1) Miosen (23–5 juta tahun dahulu) — pembentukan banjaran gunung dan kemunculan mamalia awal. (2) Pliosen (5.3–2.6 juta tahun dahulu) — penyejukan global dan penyebaran padang rumput yang luas. (3) Pleistosen (2.5 juta–11,700 tahun dahulu) — berlaku 11 kali pengglasieran utama dan manusia mula berhijrah ke Eropah dan Asia. (4) Holosen (11,700 tahun dahulu hingga kini) — zaman moden dengan aktiviti bercucuk tanam, penternakan, ciptaan roda, dan tulisan awal.",
      keywords: ["Miosen", "Pliosen", "Pleistosen", "Holosen", "pengglasieran", "MPPH"],
    },
    {
      key: "c2-s3",
      num: 3,
      title: "Ciri-ciri Zaman Air Batu",
      summary:
        "Ciri-ciri utama Zaman Air Batu: suhu bumi sangat rendah; hanya tumbuhan renek dan rumput yang menjalar dapat tumbuh; haiwan berbulu tebal seperti mamot, badak berbulu, dan harimau bertaring panjang mendominasi; manusia hidup secara nomad dengan memburu dan mengumpul makanan untuk mencari kawasan yang lebih panas; paras laut sangat rendah kerana sebahagian besar air terkunci dalam bentuk ais; manusia menggunakan peralatan batu yang kasar dan tinggal di dalam gua untuk berlindung daripada kesejukan.",
      keywords: ["mamot", "nomad", "tumbuhan renek", "paras laut", "gua", "peralatan batu"],
    },
    {
      key: "c2-s4",
      num: 4,
      title: "Perubahan dan Kesan Berakhirnya Zaman Air Batu",
      summary:
        "Apabila Zaman Air Batu berakhir, suhu bumi meningkat secara beransur-ansur akibat radiasi matahari. Kesan utamanya: ais cair dan paras laut naik sehingga kira-kira 100 meter; kawasan daratan rendah tenggelam dan membentuk selat, teluk, serta pulau; tasik air tawar baharu terbentuk; mamot dan beberapa mamalia besar pupus kerana gagal menyesuaikan diri dengan iklim panas; manusia mula menetap di satu tempat, bercucuk tanam, menternak, dan membina petempatan kekal — menandakan permulaan Zaman Holosen dan tamadun awal.",
      keywords: ["pencairan ais", "paras laut", "kepupusan", "penetapan", "Holosen", "tamadun awal"],
    },
    {
      key: "c2-s5",
      num: 5,
      title: "Kesan di Asia Tenggara (Pentas Sunda)",
      summary:
        "Sebelum Zaman Air Batu berakhir, kawasan Asia Tenggara dihubungkan oleh sebuah daratan luas yang dikenali sebagai Pentas Sunda. Pentas Sunda menyambungkan Semenanjung Malaysia, Singapura, Sumatera, Jawa, dan Borneo sebagai satu daratan tunggal. Apabila ais cair dan paras laut naik, sebahagian besar Pentas Sunda tenggelam dan membentuk Laut China Selatan serta kepulauan yang ada hari ini. Inilah sebab mengapa penduduk Asia Tenggara mempunyai banyak persamaan dari segi ciri fizikal, bahasa Melayu-Polinesia, dan budaya — kerana asalnya mereka berkongsi tamadun di daratan yang sama.",
      keywords: ["Pentas Sunda", "Laut China Selatan", "Borneo", "Sumatera", "Melayu-Polinesia"],
    },
    {
      key: "c2-s6",
      num: 6,
      title: "Kesimpulan",
      summary:
        "Zaman Air Batu memberi pengajaran penting tentang hubungan manusia dengan alam sekitar. Perubahan iklim yang ekstrem boleh mengubah muka bumi, menyebabkan kepupusan spesies, dan memaksa manusia berhijrah serta menyesuaikan diri. Pembentukan Pentas Sunda dan kepulauan Asia Tenggara menunjukkan bagaimana geografi rantau kita terbentuk. Memahami zaman ini mendorong kita menjaga alam sekitar pada hari ini bagi mengelakkan perubahan iklim yang ekstrem dan memastikan kelestarian bumi untuk generasi akan datang.",
      keywords: ["perubahan iklim", "kelestarian", "alam sekitar", "evolusi", "pengajaran"],
    },
  ],
  "Chapter 3": [
    {
      key: "c3-s1",
      num: 1,
      title: "Maksud Zaman Prasejarah",
      summary:
        "Zaman Prasejarah ialah zaman manusia belum mengenali tulisan. Ia dibahagikan kepada dua tahap utama:\n\n🪨 Zaman Batu — Penggunaan teknologi batu dalam kehidupan harian:\n- Paleolitik (Zaman Batu Lama)\n- Mesolitik (Zaman Batu Pertengahan)\n- Neolitik (Zaman Batu Baru)\n\n⚙️ Zaman Logam — Penggunaan teknologi gangsa dan besi.",
      keywords: ["Zaman Prasejarah", "Zaman Batu", "Zaman Logam", "Paleolitik", "Mesolitik", "Neolitik", "tulisan"],
    },
    {
      key: "c3-s2",
      num: 2,
      title: "Garis Masa Zaman Prasejarah",
      summary:
        "1️⃣ Zaman Paleolitik (2.5 juta SM – 8,000 SM): Manusia menggunakan peralatan batu yang ringkas dan kasar.\n\n2️⃣ Zaman Mesolitik (12,000 SM – 4,000 SM): Cara hidup semakin berkembang. Menggunakan alat batu yang lebih kecil (mikrolit). Mula tinggal di pinggir sungai dan laut.\n\n3️⃣ Zaman Neolitik (10,000 SM – 2,000 SM): Bermulanya kehidupan menetap. Aktiviti pertanian, penternakan, dan pembuatan tembikar.\n\n4️⃣ Zaman Logam (3,500 SM – 500 M): Manusia mula mencipta alatan daripada gangsa dan besi. Aktiviti pelayaran dan perdagangan mula berkembang.",
      keywords: ["Paleolitik", "Mesolitik", "Neolitik", "Zaman Logam", "mikrolit", "pertanian", "pelayaran", "SM", "M"],
    },
    {
      key: "c3-s3",
      num: 3,
      title: "Lokasi Zaman Prasejarah",
      summary:
        "🌍 Lokasi di Dunia:\n- Gua Chauvet (Perancis) — Lukisan gua yang membuktikan aktiviti memburu.\n- Altamira (Sepanyol) — Lukisan gua zaman Paleolitik.\n- Stonehenge (Britain) — Binaan batu besar (megalitik) berkaitan upacara ritual dan astronomi.\n- Catal Huyuk (Turki) — Petempatan Zaman Neolitik yang tersusun.\n- Zhoukoudian (China) — Penemuan rangka 'Peking Man'.\n\n🇲🇾 Lokasi di Malaysia:\n⛏️ Paleolitik:\n- Kota Tampan (Perak) — Bengkel membuat alat batu.\n- Gua Niah (Sarawak) — Penemuan manusia tertua di Asia Tenggara.\n\n⛏️ Mesolitik:\n- Gua Kecil (Pahang)\n- Kawasan di sepanjang Sungai Tembeling.\n\n⛏️ Neolitik:\n- Gua Cha (Kelantan) — Tapak pengebumian penting.\n- Bukit Tengkorak (Sabah) — Tapak pembuatan tembikar.\n\n⛏️ Zaman Logam:\n- Sungai Lang (Selangor) — Penemuan gendang gangsa.\n- Lembah Bernam (Selangor) — Penemuan alat besi bersoket.",
      keywords: [
        "Gua Chauvet",
        "Altamira",
        "Stonehenge",
        "Catal Huyuk",
        "Zhoukoudian",
        "Kota Tampan",
        "Gua Niah",
        "Gua Kecil",
        "Gua Cha",
        "Bukit Tengkorak",
        "Sungai Lang",
        "Lembah Bernam",
        "megalitik",
      ],
    },
    {
      key: "c3-s4",
      num: 4,
      title: "Ciri-ciri Kehidupan Manusia Prasejarah",
      summary:
        "🏠 Tempat Tinggal:\n- Paleolitik & Mesolitik — Gua, lubang bawah tanah, tempat terbuka.\n- Neolitik — Menetap dalam rumah kayu/tanah di lembah sungai.\n- Zaman Logam — Menetap lebih lama, membina bandar dan kota.\n\n🪓 Peralatan:\n- Paleolitik & Mesolitik — Batu kasar dan ringkas.\n- Neolitik — Batu yang dicanai halus, tembikar.\n- Zaman Logam — Alatan daripada gangsa dan besi (kapak, sabit, mata lembing).\n\n💰 Ekonomi:\n- Paleolitik & Mesolitik — Memburu binatang, mengumpul hasil hutan.\n- Neolitik — Pertanian, penternakan, sistem barter.\n- Zaman Logam — Pertanian pesat, perdagangan antarabangsa melalui laut.\n\n👥 Organisasi Sosial:\n- Paleolitik & Mesolitik — Kumpulan kecil, nomad (berpindah-randah).\n- Neolitik — Hidup menetap, ada ketua, wujud pembahagian kerja.\n- Zaman Logam — Masyarakat kompleks, wujud ketua berwibawa dan undang-undang.\n\n🙏 Kepercayaan:\n- Paleolitik & Mesolitik — Animisme, menghormati si mati.\n- Neolitik — Ritual keagamaan lebih tersusun, percaya kehidupan selepas mati.\n- Zaman Logam — Membina tempat ibadat khusus, upacara pengebumian menggunakan kubur kepingan batu.\n\n🎨 Kesenian:\n- Paleolitik & Mesolitik — Lukisan gua (bersifat realisme).\n- Neolitik — Corak pada tembikar (geometrik).\n- Zaman Logam — Kesenian pada peralatan logam (gendang gangsa Dong Son).",
      keywords: [
        "nomad",
        "animisme",
        "pertanian",
        "penternakan",
        "barter",
        "tembikar",
        "gendang gangsa",
        "Dong Son",
        "kubur kepingan batu",
        "kapak",
        "sabit",
      ],
    },
    {
      key: "c3-s5",
      num: 5,
      title: "Kesinambungan Sumbangan Zaman Prasejarah",
      summary:
        "Aktiviti manusia hari ini adalah evolusi daripada penemuan Zaman Prasejarah:\n\n🌾 Pertanian\n→ Bermula daripada menanam bijirin untuk sara diri kepada industri pertanian komersial masa kini.\n\n🐄 Penternakan\n→ Menjamin bekalan makanan yang berterusan.\n\n🔧 Peralatan\n→ Daripada batu kepada logam, membawa kepada penciptaan jentera moden.\n\n🏗️ Seni Bina\n→ Keupayaan membina tempat tinggal berkembang menjadi reka bentuk bangunan yang canggih.",
      keywords: ["evolusi", "pertanian komersial", "jentera moden", "seni bina", "kesinambungan"],
    },
    {
      key: "c3-s6",
      num: 6,
      title: "Penemuan Penting: Perak Man",
      summary:
        "📍 Lokasi: Gua Gunung Runtuh, Lenggong, Perak.\n\n🦴 Kepentingan:\n→ Merupakan rangka manusia Zaman Paleolitik yang paling lengkap ditemui di Malaysia.\n→ Membuktikan sistem kepercayaan awal melalui cara si mati dikebumikan bersama barangan tertentu.",
      keywords: ["Perak Man", "Gua Gunung Runtuh", "Lenggong", "Paleolitik", "pengebumian"],
    },
  ],
  "Chapter 4": [
    {
      key: "c4-s1",
      num: 1,
      title: "Pengertian Tamadun",
      summary:
        "Tamadun bukan sekadar pembangunan bangunan tinggi tetapi merangkumi kemajuan menyeluruh dalam masyarakat.\n\n🌍 Mengikut Bahasa:\n- Bahasa Yunani (Civitas) — Merujuk kepada bandar atau kota. Masyarakat bertamadun telah mencapai kemajuan dalam sistem politik, ekonomi, dan sosial.\n- Bahasa Inggeris (Civilization) — Tahap kebudayaan yang kompleks diukur melalui pencapaian sains, teknologi, seni, dan undang-undang.\n- Bahasa Arab — Menggunakan istilah: Mudun, Madain, Madana (tinggi budi bahasa dan pembukaan bandar); Hadharah (kawasan, daerah, atau kota); Madaniyyah (taraf kehidupan yang maju).\n- Bahasa Melayu — Dikenali sebagai Peradaban, iaitu kemajuan lahiriah dan rohani masyarakat.",
      keywords: ["Tamadun", "Civitas", "Civilization", "Peradaban", "Mudun", "Hadharah", "Madaniyyah"],
    },
    {
      key: "c4-s2",
      num: 2,
      title: "Perbezaan Konsep Tamadun",
      summary:
        "☪️ Sudut Pandang Islam:\n- Tamadun adalah pembangunan SEIMBANG antara kebendaan (lahiriah) dan kerohanian (insaniah).\n- Tokoh: Syed Naquib al-Attas → Tamadun ialah keadaan kehidupan insan yang mencapai taraf kehalusan budi pekerti dan kebudayaan yang luhur bagi seluruh masyarakat.\n- Berteraskan nilai murni, akidah, dan syariat Islam.\n\n🌐 Sudut Pandang Barat:\n- Lebih menitikberatkan pembangunan LAHIRIAH (aspek fizikal sahaja).\n- Tokoh: Arnold J. Toynbee → Tamadun sebagai satu sistem masyarakat yang membantu manusia mempertingkatkan hasil kesenian, penulisan, undang-undang, dan sains.",
      keywords: ["Syed Naquib al-Attas", "Arnold J. Toynbee", "Tamadun Islam", "Tamadun Barat", "lahiriah", "insaniah"],
    },
    {
      key: "c4-s3",
      num: 3,
      title: "Sembilan Ciri Utama Tamadun Awal",
      summary:
        "1️⃣ Pertanian dan Perdagangan — Manusia mencipta sistem pengairan dan kincir air. Lebihan hasil pertanian membawa kepada perdagangan (barter → mata wang).\n\n2️⃣ Sistem Pemerintahan — Sistem beraja diwujudkan untuk menguruskan populasi yang besar. Undang-undang digubal untuk menjaga keamanan. Contoh: Kod Hammurabi.\n\n3️⃣ Pembentukan Bandar — Bandar berfungsi sebagai pusat pentadbiran, ekonomi (pasar), dan pusat ibadat. Dibina secara terancang dengan sistem saliran dan perparitan.\n\n4️⃣ Pengkhususan Pekerjaan — Wujud golongan pakar seperti artisan (pembuat tembikar dan alat logam), askar, dan pegawai kerajaan.\n\n5️⃣ Teknologi — Penemuan gangsa dan besi untuk alat pertanian yang lebih kuat. Penciptaan RODA membantu pengangkutan (kereta kuda) dan pembuatan tembikar.\n\n6️⃣ Organisasi Sosial — Susun lapis masyarakat berbentuk piramid: Atas (Raja dan Bangsawan), Tengah (Pendeta, pedagang, dan artisan), Bawah (Petani dan hamba).\n\n7️⃣ Agama dan Kepercayaan — Manusia awal mengamalkan politeisme (menyembah banyak tuhan). Membina monumen keagamaan besar seperti Ziggurat (Mesopotamia) dan Piramid (Mesir).\n\n8️⃣ Tulisan dan Penyimpanan Rekod — Penting untuk merekod cukai, perdagangan, dan undang-undang. Contoh tulisan: Kuneiform (Mesopotamia), Hieroglif (Mesir), Ideogram (China).\n\n9️⃣ Kesenian dan Kesusasteraan — Seniman menghasilkan patung tuhan atau raja daripada batu dan logam. Karya sastera menceritakan kehebatan wira dan sejarah raja-raja mereka.",
      keywords: [
        "Pertanian",
        "Kod Hammurabi",
        "Bandar",
        "Artisan",
        "Roda",
        "Organisasi Sosial",
        "Politeisme",
        "Ziggurat",
        "Piramid",
        "Kuneiform",
        "Hieroglif",
        "Ideogram",
        "Kesenian",
      ],
    },
  ],
  "Chapter 5": [
    {
      key: "c5-s1",
      num: 1,
      title: "Faktor Geografi: Mengapa Lembah Sungai?",
      summary:
        "Keempat-empat tamadun awal dunia muncul di lembah sungai utama kerana faktor-faktor berikut:\n\n🌱 Tanah yang Subur — Banjir sungai membawa mendapan lumpur (lanar) yang sangat kaya dengan nutrien untuk pertanian.\n\n💧 Bekalan Air — Sumber utama untuk kegunaan harian manusia, minuman haiwan ternakan, dan pengairan tanaman.\n\n🚢 Pengangkutan & Perhubungan — Sungai berfungsi sebagai jalan raya semula jadi untuk perdagangan antara wilayah.\n\n🐟 Sumber Protein — Membekalkan ikan dan hidupan air sebagai tambahan sumber makanan penduduk.",
      keywords: [
        "lembah sungai",
        "tanah subur",
        "lanar",
        "mendapan lumpur",
        "bekalan air",
        "pengangkutan",
        "perdagangan",
      ],
    },
    {
      key: "c5-s2",
      num: 2,
      title: "Tamadun Mesopotamia (3,500 SM – 539 SM)",
      summary:
        "Tamadun Mesopotamia terletak di wilayah yang dikenali sebagai Bulan Sabit Subur (Fertile Crescent).\n\n👑 Sistem Beraja & Kerajaan:\n- Setiap negara kota mempunyai pemerintah sendiri. Raja dianggap sebagai wakil tuhan di bumi.\n- Negara kota yang terkenal: Ur, Uruk, Lagash, dan Babylon.\n\n🔬 Sumbangan Sains & Teknologi:\n- Matematik: Memperkenalkan sistem perpuluhan, konsep bulatan 360 darjah, dan formula pengiraan luas.\n- Astronomi: Mencipta kalendar berdasarkan fasa bulan (12 bulan dalam setahun).\n- Seni Bina: Membina Ziggurat sebagai pusat ibadat, pusat penyimpanan khazanah, dan pusat pendidikan.\n\n⚖️ Kod Undang-undang Hammurabi:\n- Merupakan kod undang-undang bertulis tertua.\n- Mengandungi prinsip 'mata ganti mata' untuk memastikan keadilan sosial yang ketat.",
      keywords: [
        "Mesopotamia",
        "Bulan Sabit Subur",
        "Fertile Crescent",
        "Ur",
        "Uruk",
        "Lagash",
        "Babylon",
        "Ziggurat",
        "Kod Hammurabi",
        "Kuneiform",
        "360 darjah",
        "kalendar bulan",
      ],
    },
    {
      key: "c5-s3",
      num: 3,
      title: "Tamadun Mesir Purba (3,100 SM – 332 SM)",
      summary:
        "Tamadun Mesir Purba dibahagikan kepada tiga zaman utama: Kerajaan Purba, Kerajaan Pertengahan, dan Kerajaan Baru.\n\n👑 Organisasi Sosial & Pentadbiran:\n- Firaun: Mempunyai kuasa mutlak dalam pentadbiran, agama, dan ketenteraan.\n- Wazir: Pegawai tertinggi yang membantu Firaun dalam urusan kutipan cukai dan keadilan.\n- Jurutulis (Scribes): Golongan elit yang pakar dalam tulisan Hieroglif untuk menyimpan rekod kerajaan.\n\n🔬 Sumbangan Intelektual & Sains:\n- Perubatan: Kepakaran dalam Mumia (pengawetan mayat) membawa kepada pemahaman anatomi manusia dan pembedahan.\n- Kertas Papirus: Menggunakan serat pokok papirus untuk dijadikan kertas bagi tujuan penulisan dan lukisan.\n- Matematik: Memperkenalkan konsep geometri bagi menguruskan banjir dan pembinaan piramid.",
      keywords: [
        "Mesir Purba",
        "Firaun",
        "Wazir",
        "Jurutulis",
        "Scribes",
        "Hieroglif",
        "Mumia",
        "Papirus",
        "geometri",
        "Piramid",
        "Kerajaan Purba",
        "Kerajaan Pertengahan",
        "Kerajaan Baru",
      ],
    },
    {
      key: "c5-s4",
      num: 4,
      title: "Tamadun Indus (2,500 SM – 1,750 SM)",
      summary:
        "Tamadun Indus dikenali sebagai tamadun yang mempunyai kemahiran kejuruteraan bangunan yang paling maju pada zamannya.\n\n🏙️ Perancangan Bandar Sistematik:\n- Bandar dibina mengikut pelan grid yang teratur (segi empat tepat).\n- Sistem Perparitan: Longkang di bawah jalan raya adalah tertutup dan mempunyai lubang pemeriksaan untuk memudahkan pembersihan.\n- Pusat Awam: Adanya The Great Bath (kolam mandi awam) yang digunakan untuk upacara keagamaan dan kebersihan.\n\n💼 Ekonomi & Perdagangan:\n- Mencipta Meterai (Seals) yang mempunyai ukiran haiwan dan tulisan sebagai simbol pengenalan pedagang dalam urusan perdagangan antarabangsa dengan Mesopotamia.",
      keywords: [
        "Tamadun Indus",
        "pelan grid",
        "sistem perparitan",
        "The Great Bath",
        "Meterai",
        "Seals",
        "Piktograf",
        "perdagangan antarabangsa",
        "Mohenjo-daro",
        "Harappa",
      ],
    },
    {
      key: "c5-s5",
      num: 5,
      title: "Tamadun Huang He (1,766 SM – 256 SM)",
      summary:
        "Tamadun Huang He bermula di Lembah Sungai Huang He yang juga dikenali sebagai Sungai Kuning.\n\n🏛️ Sistem Politik:\n- Konsep Mandat dari Syurga: Pemerintah dipercayai mendapat restu tuhan. Jika berlaku bencana alam, ia dianggap petanda bahawa mandat raja telah ditarik balik.\n\n🌾 Kemajuan Pertanian & Ekonomi:\n- Peralatan Besi: Penggunaan cangkul dan sabit daripada besi meningkatkan produktiviti makanan.\n- Sistem Pengairan: Terusan dibina untuk mengalirkan air ke kawasan pertanian dan mengawal banjir.\n\n🖋️ Budaya & Tulisan:\n- Ideogram: Tulisan yang berkembang daripada simbol-simbol pada tulang sula (oracle bones).\n- Sutera: Masyarakat Huang He merupakan yang pertama menenun sutera untuk pakaian.",
      keywords: [
        "Huang He",
        "Sungai Kuning",
        "Mandat dari Syurga",
        "oracle bones",
        "Ideogram",
        "sutera",
        "cangkul",
        "sabit",
        "terusan",
        "pengairan",
      ],
    },
    {
      key: "c5-s6",
      num: 6,
      title: "Perbandingan Antara Tamadun Awal",
      summary:
        "Jadual perbandingan ringkas antara keempat-empat tamadun awal dunia:\n\n🏛️ Mesopotamia\n- Lokasi Sungai: Tigris & Euphrates\n- Sistem Tulisan: Kuneiform\n- Monumen Terkenal: Ziggurat\n\n🏛️ Mesir Purba\n- Lokasi Sungai: Sungai Nil\n- Sistem Tulisan: Hieroglif\n- Monumen Terkenal: Piramid\n\n🏛️ Indus\n- Lokasi Sungai: Sungai Indus\n- Sistem Tulisan: Piktograf (Indus script)\n- Monumen Terkenal: The Great Bath\n\n🏛️ Huang He\n- Lokasi Sungai: Sungai Huang He\n- Sistem Tulisan: Ideogram\n- Monumen Terkenal: Tembok Besar (Zaman kemudian)",
      keywords: [
        "Mesopotamia",
        "Mesir Purba",
        "Indus",
        "Huang He",
        "Tigris",
        "Euphrates",
        "Nil",
        "Kuneiform",
        "Hieroglif",
        "Piktograf",
        "Ideogram",
        "Ziggurat",
        "Piramid",
        "The Great Bath",
        "Tembok Besar",
      ],
    },
  ],
  "Chapter 6": [
    {
      key: "c6-s1",
      num: 1,
      title: "Pengenalan Tamadun Yunani",
      summary:
        "Tamadun Yunani berkembang di Semenanjung Balkan dan pulau-pulau di Laut Aegean. Peningkatannya yang paling ketara adalah dalam aspek pemerintahan dan pentadbiran.\n\n🏛️ Sistem Negara Kota (Polis):\nPolis bukan sekadar bandar, tetapi unit politik yang bebas dan merdeka. Komponen utama polis ialah:\n- Bandar Utama: Pusat tumpuan penduduk.\n- Acropolis: Kawasan tertinggi yang menempatkan bangunan kerajaan, kuil, dan kubu pertahanan.\n- Agora: Kawasan lapang yang berfungsi sebagai pusat ekonomi (pasar) dan tempat pertemuan warganegara.\n- Kawasan Kampung: Kawasan di luar bandar yang membekalkan sumber pertanian.\n\n🌟 Tiga Polis Terkenal: Athens (pusat ilmu dan demokrasi), Sparta (pusat ketenteraan), dan Corinth.",
      keywords: ["Polis", "Acropolis", "Agora", "Athens", "Sparta", "Corinth", "Semenanjung Balkan", "Laut Aegean"],
    },
    {
      key: "c6-s2",
      num: 2,
      title: "Evolusi Pemerintahan Athens (5 Tahap)",
      summary:
        "Athens melalui perubahan sistem pemerintahan yang kompleks sebelum mencapai demokrasi:\n\n1️⃣ Monarki — Pemerintahan beraja. Raja mempunyai kuasa mutlak dan dibantu oleh Majlis golongan bangsawan.\n\n2️⃣ Oligarki — Pemerintahan oleh sekelompok kecil orang kaya yang memegang kuasa politik dan ekonomi.\n\n3️⃣ Aristokrasi — Kuasa dipegang oleh golongan bangsawan yang memiliki tanah dan mempunyai pengaruh besar.\n\n4️⃣ Tirani — Pemerintahan oleh individu (diktator) yang merampas kuasa. Walaupun berkuasa mutlak, mereka sering melakukan pembaharuan untuk meraih sokongan rakyat.\n\n5️⃣ Demokrasi — Pemerintahan oleh rakyat melalui wakil. Athens merupakan pelopor sistem demokrasi langsung di dunia.",
      keywords: ["Monarki", "Oligarki", "Aristokrasi", "Tirani", "Demokrasi", "Athens", "demokrasi langsung"],
    },
    {
      key: "c6-s3",
      num: 3,
      title: "Struktur Demokrasi Athens",
      summary:
        "Sistem demokrasi Athens mempunyai empat badan utama:\n\n🏛️ Dewan Perhimpunan:\n- Fungsi: Badan tertinggi yang menggubal undang-undang, mengawal kewangan, membincangkan dasar luar, dan bertindak sebagai mahkamah rayuan.\n- Keahlian: Semua warganegara lelaki Athens berumur 18 tahun ke atas. Bersidang sekurang-kurangnya 3 kali sebulan.\n\n📋 Majlis (Council of 500):\n- Fungsi: Menguruskan hal ehwal harian kerajaan dan menyediakan agenda mesyuarat Dewan Perhimpunan.\n- Keahlian: 500 orang dipilih melalui undian untuk tempoh satu tahun.\n\n⚖️ Majistret:\n- Fungsi: Kakitangan awam yang melaksanakan dasar-dasar kerajaan.\n\n👨‍⚖️ Juri:\n- Fungsi: Memutuskan kes mahkamah. Bilangan juri sangat besar (201–501 orang) untuk mengelakkan rasuah.",
      keywords: ["Dewan Perhimpunan", "Majlis", "Council of 500", "Majistret", "Juri", "demokrasi langsung", "undian"],
    },
    {
      key: "c6-s4",
      num: 4,
      title: "Keunikan Sparta: Kerajaan Ketenteraan",
      summary:
        "Sparta dikenali sebagai negara kota yang mengutamakan kekuatan ketenteraan:\n\n⚔️ Sistem Diarqi:\n- Diperintah oleh DUA orang raja serentak untuk memastikan tiada seorang pun yang memegang kuasa mutlak.\n\n🏋️ Agoge (Sistem Pendidikan):\n- Anak lelaki Sparta diambil dari keluarga seawal usia 7 tahun untuk menjalani latihan ketenteraan yang sangat keras.\n- Matlamatnya: melahirkan tentera yang setia dan perkasa.\n\n👩 Peranan Wanita:\n- Wanita Sparta diberikan latihan fizikal supaya dapat melahirkan anak yang kuat dan sihat untuk menjadi tentera.",
      keywords: ["Sparta", "Diarqi", "Agoge", "sistem pendidikan", "latihan ketenteraan", "wanita Sparta"],
    },
    {
      key: "c6-s5",
      num: 5,
      title: "Tamadun Rom: Seni Bina Ikonik",
      summary:
        "Peningkatan Tamadun Rom yang paling menonjol adalah dalam bidang seni bina yang menggabungkan kepakaran kejuruteraan dengan estetika.\n\n🧱 Bahan Binaan: Pozzolana (campuran kapur dan abu gunung berapi) menghasilkan simen yang sangat kuat dan tahan air.\n\n🏟️ Tujuh Hasil Seni Bina Ikonik:\n1. Colosseum — Amfiteater berbentuk elips, memuatkan 50,000 penonton. Digunakan untuk pertarungan gladiator.\n2. Pantheon — Kuil untuk tuhan-tuhan Rom. Mempunyai kubah konkrit terbesar tanpa tulang sokongan. Di atasnya terdapat Oculus (lubang cahaya).\n3. Akueduk — Sistem saluran air membawa air bersih dari pergunungan ke bandar melalui graviti.\n4. Amfiteater — Tempat persembahan terbuka untuk seni dan teater; direka bentuk dengan aspek akustik.\n5. Jalan Raya Rom — Dibina berlapis (pasir, batu, simen) untuk pergerakan tentera dan perdagangan.\n6. Tembok Hadrian — Tembok pertahanan sepanjang 117 km di Britain untuk melindungi wilayah Rom.\n7. Pusat Mandi Awam — Pusat sosial dilengkapi bilik mandi panas/sejuk/suam, perpustakaan, dan gimnasium.",
      keywords: [
        "Pozzolana",
        "Colosseum",
        "Pantheon",
        "Oculus",
        "Akueduk",
        "Jalan Raya Rom",
        "Tembok Hadrian",
        "Pusat Mandi Awam",
        "gladiator",
      ],
    },
    {
      key: "c6-s6",
      num: 6,
      title: "Kesimpulan dan Iktibar",
      summary:
        "Tamadun Yunani dan Rom meninggalkan warisan yang sangat besar kepada dunia moden:\n\n🗳️ Inovasi Politik:\n- Idea demokrasi Athens menjadi asas kepada sistem politik moden kebanyakan negara hari ini. Konsep parlimen, mahkamah bebas, dan undian adalah warisan terus dari Athens.\n\n🏗️ Inovasi Teknologi:\n- Kepakaran seni bina Rom dalam menggunakan simen (Pozzolana) dan struktur arca membuktikan kehebatan sains dan kreativiti manusia purba. Banyak binaan Rom masih tegak berdiri sehingga kini.\n\n📖 Iktibar:\n- Tamadun boleh tegak melalui kemajuan pemikiran (Yunani) dan kemajuan teknologi (Rom). Kita perlu menggabungkan kedua-dua aspek ini untuk membina masyarakat yang bertamadun.",
      keywords: [
        "demokrasi moden",
        "parlimen",
        "warisan Yunani",
        "warisan Rom",
        "Pozzolana",
        "seni bina moden",
        "iktibar",
      ],
    },
  ],
  "Chapter 8": [
    {
      key: "c8-s1",
      num: 1,
      title: "Masyarakat Arab Jahiliah",
      summary:
        "Zaman Jahiliah (300–610 M) merujuk kepada kejahilan dari segi moral dan akidah, bukan intelek. Masyarakat Arab hidup berpuak-puak mengikut sistem kabilah dan semangat asabiyah yang menyebabkan peperangan berpanjangan seperti Perang al-Basus. Dalam ekonomi pula, amalan riba dan penipuan timbangan menyebabkan ketidakadilan sosial dan penindasan terhadap golongan miskin.",
      keywords: ["Jahiliah", "asabiyah", "kabilah", "Perang al-Basus", "riba", "penipuan timbangan"],
    },

    {
      key: "c8-s2",
      num: 2,
      title: "Kelahiran Islam dan Wahyu Pertama",
      summary:
        "Islam bermula dengan penurunan wahyu pertama kepada Nabi Muhammad SAW di Gua Hira melalui Surah al-Alaq yang dimulakan dengan perkataan 'Iqra' (Bacalah). Wahyu ini menekankan kepentingan ilmu pengetahuan dan mencetuskan revolusi intelek dalam masyarakat Arab. Dakwah secara terbuka di Bukit Safa ditentang oleh pembesar Quraisy kerana mereka bimbang kehilangan kuasa politik dan ekonomi daripada perniagaan berhala di Kaabah.",
      keywords: ["Iqra", "Surah al-Alaq", "Gua Hira", "Bukit Safa", "Quraisy", "dakwah", "Kaabah"],
    },

    {
      key: "c8-s3",
      num: 3,
      title: "Kepimpinan Nabi Muhammad SAW di Madinah",
      summary:
        "Nabi Muhammad SAW membina negara Islam Madinah berasaskan perpaduan dan keadilan. Piagam Madinah merupakan perlembagaan bertulis pertama yang menyatukan orang Islam, Yahudi, dan kaum lain di bawah konsep Ummah. Sistem syura pula menekankan perbincangan dan permuafakatan dalam pentadbiran negara bagi menjaga kepentingan masyarakat.",
      keywords: ["Piagam Madinah", "Ummah", "syura", "Madinah", "pluralisme", "perlembagaan"],
    },

    {
      key: "c8-s4",
      num: 4,
      title: "Sumbangan Ekonomi dan Sosial Islam",
      summary:
        "Tamadun Islam memperkenalkan sistem ekonomi yang adil melalui institusi Baitulmal yang menguruskan zakat, kharaj, dan jizyah. Zakat membantu golongan miskin dan memastikan kekayaan diagihkan secara seimbang dalam masyarakat. Jizyah pula ialah cukai perlindungan yang dikenakan kepada bukan Islam sebagai balasan kepada jaminan keselamatan negara.",
      keywords: ["Baitulmal", "zakat", "kharaj", "jizyah", "ekonomi Islam", "kebajikan", "asnaf"],
    },

    {
      key: "c8-s5",
      num: 5,
      title: "Seni Bina Islam",
      summary:
        "Seni bina Islam menekankan nilai kerohanian dan keindahan yang berasaskan tauhid. Corak geometri dan kaligrafi digunakan bagi mengelakkan unsur pemujaan terhadap makhluk hidup. Kubah masjid pula direka untuk memperbaiki akustik dan pengudaraan supaya suasana ibadat menjadi lebih selesa dan khusyuk.",
      keywords: ["seni bina Islam", "kaligrafi", "geometri", "tauhid", "kubah", "akustik", "arabes"],
    },

    {
      key: "c8-s6",
      num: 6,
      title: "Kesan dan Kepentingan Tamadun Islam",
      summary:
        "Tamadun Islam membawa perubahan besar dalam bidang ilmu, pentadbiran, ekonomi, dan sosial. Islam menekankan keadilan, ilmu pengetahuan, dan perpaduan masyarakat tanpa mengira kaum atau agama. Sumbangan tamadun Islam menjadi asas penting kepada perkembangan tamadun dunia moden termasuk sistem pendidikan, perlembagaan, dan kebajikan sosial.",
      keywords: ["tamadun Islam", "ilmu", "keadilan", "perpaduan", "pendidikan", "kebajikan sosial"],
    },
  ],
  "Chapter 7": [
    {
      key: "c7-s1",
      num: 1,
      title: "Peningkatan Tamadun India",
      summary:
        "Tamadun India berkembang daripada petempatan kecil yang dikenali sebagai Janapada kepada kerajaan besar Mahajanapada. Perubahan ini menunjukkan peningkatan dalam sistem politik, ekonomi, dan sosial masyarakat India sehingga munculnya kerajaan yang lebih tersusun dan kuat.",
      keywords: ["Janapada", "Mahajanapada", "Tamadun India", "politik", "ekonomi", "sosial"],
    },

    {
      key: "c7-s2",
      num: 2,
      title: "Keunggulan Kerajaan Magadha",
      summary:
        "Kerajaan Magadha muncul sebagai kuasa utama di India antara 540 SM hingga 320 SM. Kedudukannya di Lembah Ganges yang subur membantu perkembangan pertanian dan perdagangan. Selain itu, Magadha mempunyai sumber besi yang banyak untuk menghasilkan senjata serta gajah hutan yang digunakan dalam ketenteraan.",
      keywords: ["Magadha", "Lembah Ganges", "pertanian", "perdagangan", "besi", "gajah", "ketenteraan"],
    },

    {
      key: "c7-s3",
      num: 3,
      title: "Perluasan Kuasa Dinasti Maurya",
      summary:
        "Dinasti Maurya mencapai kegemilangan semasa pemerintahan Chandragupta Maurya dan Bindusara. Chandragupta Maurya dengan bantuan Chanakya membina angkatan tentera yang besar untuk menyatukan India Utara. Bindusara pula meneruskan usaha perluasan kuasa ke India Selatan sehingga ke Mysore.",
      keywords: ["Dinasti Maurya", "Chandragupta Maurya", "Bindusara", "Chanakya", "tentera", "Mysore", "India Utara"],
    },

    {
      key: "c7-s4",
      num: 4,
      title: "Raja Asoka dan Dasar Dharma",
      summary:
        "Selepas Perang Kalinga pada tahun 261 SM, Raja Asoka berasa kesal terhadap kematian dan penderitaan yang berlaku. Beliau memeluk agama Buddha dan memperkenalkan Dasar Dharma yang menekankan kasih sayang, keadilan, toleransi agama, dan kebajikan rakyat. Titah perintah Asoka diukir pada Tiang Asoka untuk dijadikan panduan masyarakat.",
      keywords: ["Asoka", "Perang Kalinga", "Dharma", "Buddha", "Tiang Asoka", "keadilan", "toleransi agama"],
    },

    {
      key: "c7-s5",
      num: 5,
      title: "Peningkatan Tamadun China",
      summary:
        "Peningkatan Tamadun China berasaskan sistem pendidikan dan meritokrasi. Pendidikan bertujuan melahirkan pegawai kerajaan yang berkualiti, mengekalkan ajaran Konfusianisme, dan meningkatkan status sosial masyarakat. Sistem ini membantu melahirkan pentadbiran yang cekap dan stabil.",
      keywords: ["Tamadun China", "meritokrasi", "Konfusianisme", "pendidikan", "pegawai kerajaan", "status sosial"],
    },

    {
      key: "c7-s6",
      num: 6,
      title: "Sistem Pendidikan dan Peperiksaan Awam China",
      summary:
        "Sistem pendidikan China dibahagikan kepada pendidikan rendah, menengah, dan tinggi. Pelajar mempelajari tulisan, sastera, falsafah Konfusius, etika, dan kepimpinan. Sistem peperiksaan awam dimulakan oleh Maharaja Wu semasa Dinasti Han. Peperiksaan terdiri daripada tiga tahap: Xiucai, Juren, dan Jinshi. Sistem ini sangat ketat dan bertujuan memilih pegawai kerajaan berdasarkan kebolehan serta ilmu pengetahuan.",
      keywords: [
        "Maharaja Wu",
        "Dinasti Han",
        "Xiucai",
        "Juren",
        "Jinshi",
        "Konfusius",
        "peperiksaan awam",
        "meritokrasi",
      ],
    },
  ],
};
/**
 * Textbook cross-check additions.
 *
 * The original cards intentionally read like quick revision notes, but that
 * caused a number of examinable facts from the KSSM textbook to disappear.
 * Keep those concise cards above and append these detail cards in the notes
 * view.  This gives pupils both a quick overview and complete textbook
 * coverage without duplicating the chapter registry.
 */
export const sejarahF1TextbookAdditions: Record<string, Subtopic[]> = {
  "Chapter 1": [
    {
      key: "c1-tb1",
      num: 7,
      title: "Pandangan Sejarawan: Muhd Yusof Ibrahim",
      summary:
        "Profesor Emeritus Tan Sri Dr. Muhd Yusof Ibrahim mentakrifkan sejarah sebagai catatan atau rekod mengenai sesuatu peristiwa yang berlaku pada suatu masa yang lalu. Pandangan ini melengkapkan pandangan Herodotus, E.H. Carr dan Ibn Khaldun yang dinyatakan dalam buku teks.",
      keywords: ["Muhd Yusof Ibrahim", "catatan", "rekod", "peristiwa masa lalu"],
    },
    {
      key: "c1-tb2",
      num: 8,
      title: "Sumber Primer dan Sekunder: Butiran Lengkap",
      summary:
        "Sumber primer belum diolah atau diterbitkan dan bersifat asli. Contohnya fosil, artifak, bukan artifak, batu bersurat, keterangan lisan, dokumen rasmi, manuskrip, fail rasmi jabatan, surat peribadi dan diari. Artifak ialah hasil kerja manusia yang boleh dialihkan seperti loceng gangsa, tembikar dan mata wang; bukan artifak ialah data arkeologi yang tidak boleh dialihkan seperti struktur candi, dinding gua dan lubang sampah. Sumber sekunder pula telah diolah dan diterbitkan, misalnya buku, akhbar, majalah, jurnal, ensiklopedia dan risalah.",
      keywords: ["keterangan lisan", "fail rasmi", "surat peribadi", "jurnal", "risalah", "bukan artifak"],
    },
    {
      key: "c1-tb3",
      num: 9,
      title: "Langkah Kaedah Bertulis",
      summary:
        "Penyelidikan bertulis dilaksanakan dalam lima langkah: mengenal pasti sumber bagi sesuatu peristiwa, mendapatkan dan mengesahkan sumber, mengumpul dan menyimpan sumber, menggunakan peralatan yang sesuai untuk menganalisis data, kemudian menganalisis serta membentangkan hasil. Sumber bertulis boleh terdapat pada batu, kulit kayu, gading, daun lontar, logam, kertas dan dinding gua. Epigrafi membantu membaca tulisan pada batu bersurat, manakala paleografi mengkaji tulisan kuno.",
      keywords: ["lima langkah", "epigrafi", "paleografi", "daun lontar", "mengesahkan sumber"],
    },
    {
      key: "c1-tb4",
      num: 10,
      title: "Kaedah Lisan dan Arkeologi",
      summary:
        "Kaedah lisan mempunyai tiga tahap. Tahap persediaan: memilih orang sumber, menentukan skop dan menyediakan soalan. Tahap rakaman: membuat persediaan lengkap, meyakinkan orang sumber dan merakam temu bual. Tahap memproses rakaman: membuat senarai kandungan, menyalin rakaman, menyemak fakta dan menyimpan rakaman dengan baik. Kaedah arkeologi pula mendapatkan maklumat daripada tinggalan melalui gali cari. Arkeologi bawah air mengkaji kapal karam dan artifak di dasar laut; artifak perlu direkod, dibawa ke makmal, dibersihkan, dikatalogkan dan dikaji.",
      keywords: ["tahap persediaan", "tahap rakaman", "memproses rakaman", "arkeologi bawah air", "kapal karam"],
    },
    {
      key: "c1-tb5",
      num: 11,
      title: "Enam Kepentingan Mempelajari Sejarah",
      summary:
        "Buku teks menyenaraikan enam kepentingan: mengenal asal usul; mengambil iktibar; memupuk patriotisme; mengukuhkan perpaduan; membangunkan negara dan bangsa dengan mengekalkan kegemilangan serta mencontohi kejayaan terdahulu; dan mengaplikasikan Kemahiran Pemikiran Sejarah melalui pemikiran kritis dan analitis ketika menilai peristiwa.",
      keywords: ["membangunkan negara", "Kemahiran Pemikiran Sejarah", "kritis", "analitis"],
    },
  ],
  "Chapter 2": [
    {
      key: "c2-tb1",
      num: 7,
      title: "Pembentukan Fizikal Bumi",
      summary:
        "Bumi dianggarkan berusia 4.6 bilion tahun. Perubahan fizikal bumi melalui tiga tahap utama: pada 390 juta tahun dahulu air laut masih tawar dan hidupan seperti ikan serta amfibia mula wujud; pada 195 juta tahun dahulu Zaman Jurasik berkembang dan dinosaur menjadi hidupan utama; pada 94 juta tahun dahulu berlaku kepupusan dinosaur dan rupa bentuk benua mula kelihatan. Benua, lautan, gunung dan pulau terus berubah mengikut peredaran masa.",
      keywords: ["4.6 bilion tahun", "390 juta", "195 juta", "Zaman Jurasik", "94 juta", "dinosaur"],
    },
    {
      key: "c2-tb2",
      num: 8,
      title: "Lautan dan Benua Dunia",
      summary:
        "Dunia mempunyai tujuh benua, iaitu Asia, Afrika, Amerika Utara, Amerika Selatan, Antartika, Eropah dan Oceania. Lautan utama pula ialah Lautan Pasifik, Atlantik, Hindi, Selatan dan Artik. Lautan Pasifik ialah lautan terluas. Pengetahuan kedudukan benua dan lautan membantu memahami perubahan muka bumi semasa dan selepas Zaman Air Batu.",
      keywords: ["tujuh benua", "Lautan Pasifik", "Atlantik", "Hindi", "Selatan", "Artik"],
    },
    {
      key: "c2-tb3",
      num: 9,
      title: "Garis Masa Miosen hingga Holosen",
      summary:
        "Miosen berlaku kira-kira 23 hingga 5 juta tahun dahulu: gunung-ganang fizikal moden terbentuk, mamalia berkembang dan suhu dunia panas serta kering. Pliosen (5.3 hingga 2.6 juta tahun dahulu) mengalami penyejukan global, padang rumput dan savana meluas serta jambatan darat Panama terbentuk. Pleistosen (2.5 juta hingga 10,000 tahun dahulu) menyaksikan pengglasieran utama berulang dan manusia mengetahui cara membuat api. Holosen bermula kira-kira 10,000 tahun dahulu hingga kini; ais mencair, paras laut meningkat dan manusia maju dalam pertanian, roda serta tulisan.",
      keywords: ["Panama", "savana", "membuat api", "10,000 tahun", "roda", "tulisan"],
    },
    {
      key: "c2-tb4",
      num: 10,
      title: "Ciri Zaman Air Batu Akhir",
      summary:
        "Ciri khusus Zaman Air Batu Akhir merangkumi suhu yang sejuk, daratan lebih luas daripada hari ini, paras laut rendah, tumbuhan utama berupa rumput dan tumbuhan renek, serta haiwan seperti mamot berbulu, badak, kuda dan singa. Manusia hidup secara nomad dan memburu. Permukaan air laut yang membeku menyebabkan sebahagian besar bumi dilitupi salji.",
      keywords: ["daratan luas", "paras laut rendah", "mamot berbulu", "badak", "kuda", "singa"],
    },
    {
      key: "c2-tb5",
      num: 11,
      title: "Asia Tenggara dan Pentas Sunda",
      summary:
        "Sebelum kenaikan paras laut, Pentas Sunda ialah daratan seluas lebih 3.2 juta kilometer persegi yang menyatukan Burma (Myanmar), Thailand, Laos, Kemboja, Vietnam, Semenanjung Tanah Melayu, Borneo, Sumatera, Jawa dan Filipina. Sungai Sunda Utara ialah sistem sungai besar yang mengalirkan air dari kawasan tersebut. Apabila air batu cair, paras laut meningkat dan memisahkan daratan kepada pulau serta semenanjung. Bentuk fizikal dan hidupan di rantau ini mempunyai persamaan kerana dahulunya berada pada daratan yang sama.",
      keywords: ["3.2 juta kilometer persegi", "Sungai Sunda Utara", "Kemboja", "Vietnam", "Filipina"],
    },
  ],
  "Chapter 3": [
    {
      key: "c3-tb1",
      num: 7,
      title: "Lokasi Prasejarah Dunia Mengikut Negara",
      summary:
        "Lokasi penting yang ditunjukkan buku teks ialah Gua Chauvet (Perancis), Altamira (Sepanyol), Stonehenge (Britain), Catal Huyuk (Turki), Gobekli Tepe (Turki), Shahr-i-Sokhta (Iran), Gua Bhimbetka (India), Zhoukoudian (China) dan Ban Chiang (Thailand). Penemuannya merangkumi lukisan gua, rangka manusia, tempat kediaman, binaan megalit, peralatan batu dan logam serta kegiatan pertanian.",
      keywords: ["Gobekli Tepe", "Shahr-i-Sokhta", "Bhimbetka", "Ban Chiang", "megalit"],
    },
    {
      key: "c3-tb2",
      num: 8,
      title: "Kehidupan Paleolitik dan Mesolitik",
      summary:
        "Paleolitik: tinggal di gua, lubang bawah tanah dan tempat berlindung daripada ranting; hidup nomad dalam kelompok kecil; memburu, mengumpul makanan dan mengamalkan perkongsian; menggunakan alat batu, kayu dan tulang yang ringkas; berkepercayaan animisme serta menghasilkan lukisan gua. Mesolitik masih banyak meneruskan cara ini tetapi manusia tinggal di pinggir sungai dan laut, menangkap ikan, mengutip kerang, menggunakan mikrolit, panah dan perangkap, serta membentuk kelompok yang lebih teratur.",
      keywords: ["perkongsian makanan", "mikrolit", "panah", "perangkap", "pinggir sungai", "kerang"],
    },
    {
      key: "c3-tb3",
      num: 9,
      title: "Kehidupan Neolitik dan Zaman Logam",
      summary:
        "Neolitik membawa kehidupan menetap, rumah yang lebih baik, pertanian dan penternakan, perdagangan barter, pengkhususan kerja, alat batu yang dilicinkan, tembikar, tenunan, ritual dan binaan megalit. Pada Zaman Logam, petempatan berkembang berhampiran sungai dan pantai; perdagangan, pelayaran dan pertukaran barangan meningkat; pemimpin dan susun lapis masyarakat terbentuk; alatan gangsa dan besi digunakan; pengebumian menggunakan kepingan batu dan kesenian ukiran pada gendang gangsa berkembang.",
      keywords: ["kehidupan menetap", "pengkhususan kerja", "tenunan", "pelayaran", "susun lapis", "kepingan batu"],
    },
    {
      key: "c3-tb4",
      num: 10,
      title: "Kesinambungan hingga Kehidupan Moden",
      summary:
        "Sumbangan prasejarah yang berterusan ialah pertanian, penternakan, pembuatan peralatan, pembuatan tembikar, pembinaan monumen dan seni bina, ideofak (kepercayaan), kesenian serta sistem sosial. Pertanian sara diri berkembang menjadi pertanian komersial; peralatan batu dan logam menjadi mesin moden; tembikar kekal sebagai industri; monumen menjadi lambang pencapaian; kepercayaan dan adat pengebumian terus mempengaruhi masyarakat; seni gua berkembang kepada seni moden.",
      keywords: ["ideofak", "tembikar", "monumen", "pertanian komersial", "sistem sosial"],
    },
    {
      key: "c3-tb5",
      num: 11,
      title: "Tapak Prasejarah di Malaysia",
      summary:
        "Antara tapak utama ialah Tingkayu, Gua Niah, Kota Tampan dan Lembah Mansuli bagi Paleolitik; Gua Madai, Gua Cha dan Jenderam Hilir bagi Hoabinhian; Bukit Tengkorak dan Gua Kecil bagi Neolitik; serta Sungai Tembeling, Lembah Bernam dan Gua Harimau bagi Zaman Logam. Penemuan membuktikan kemahiran membuat alat batu dan tembikar, aktiviti memburu serta menangkap ikan, perdagangan, kepercayaan pengebumian dan penyesuaian manusia terhadap alam sekitar.",
      keywords: ["Tingkayu", "Lembah Mansuli", "Gua Madai", "Jenderam Hilir", "Gua Harimau", "Hoabinhian"],
    },
  ],
  "Chapter 4": [
    {
      key: "c4-tb1",
      num: 4,
      title: "Istilah Tamadun yang Tepat",
      summary:
        "Bahasa Yunani menggunakan perkataan civitas yang bermaksud bandar atau kota. Bahasa Inggeris menggunakan civilization, iaitu tahap pembangunan manusia dan organisasi yang dianggap paling maju. Bahasa Arab menggunakan mudun, madain dan madana yang berkaitan bandar, kemajuan dan budi bahasa; hadharah bermaksud kawasan, daerah, bandar, kota atau tanah yang didiami; hadari pula bermaksud tanah atau rumah yang didiami masyarakat, tahap kemajuan dan memperoleh kekayaan. Bahasa Melayu mentakrifkan tamadun sebagai suatu peradaban yang merujuk pencapaian kemajuan masyarakat dari segi kebendaan dan kerohanian.",
      keywords: ["civitas", "civilization", "mudun", "madain", "madana", "hadharah", "hadari"],
    },
    {
      key: "c4-tb2",
      num: 5,
      title: "Konsep Islam dan Barat",
      summary:
        "Konsep Islam merangkumi kemajuan lahiriah dan rohaniah. Ibn Khaldun mengaitkannya dengan kehidupan bandar, organisasi sosial, kebudayaan tinggi dan kemajuan dalam seni bina, ilmu, seni serta teknologi. Syed Muhammad Naquib al-Attas menekankan kehalusan tatasusila dan kebudayaan luhur. Konsep Barat pula menumpukan pencapaian lahiriah seperti penulisan, undang-undang, kesenian dan perbandaran. Arnold J. Toynbee melihat tamadun sebagai sistem masyarakat yang memperkasakan kegiatan politik, ekonomi, sosial, kesenian dan kebudayaan.",
      keywords: ["Ibn Khaldun", "Syed Muhammad Naquib al-Attas", "Arnold J. Toynbee", "lahiriah", "rohaniah"],
    },
    {
      key: "c4-tb3",
      num: 6,
      title: "Ciri Tamadun: Pertanian hingga Pengkhususan",
      summary:
        "Pertanian berkembang melalui penciptaan pengairan, pembinaan terusan dan penggunaan teknologi lalu menghasilkan lebihan makanan serta perdagangan. Bandar menjadi pusat pemerintahan, ekonomi, ibadat dan pertemuan masyarakat. Sistem pemerintahan dibentuk untuk mengurus negara, manakala golongan agama membantu pentadbiran dan undang-undang menjaga keamanan. Pengkhususan pekerjaan melahirkan petani, artisan, pedagang, tentera dan pengurus pentadbiran serta meningkatkan ekonomi.",
      keywords: ["lebihan makanan", "terusan", "pusat pemerintahan", "golongan agama", "artisan"],
    },
    {
      key: "c4-tb4",
      num: 7,
      title: "Ciri Tamadun: Teknologi hingga Kesenian",
      summary:
        "Teknologi seperti roda, pengangkutan, tembikar, metalurgi dan monumen meningkatkan kehidupan. Organisasi sosial mewujudkan kelas berdasarkan pekerjaan, kekayaan dan pengaruh. Agama dan kepercayaan berkembang daripada pemujaan alam kepada institusi tersusun dengan rumah ibadat. Tulisan serta penyimpanan rekod mengurus pentadbiran, perdagangan, undang-undang dan ilmu. Kesenian dan kesusasteraan pula menghasilkan gaya seni tersendiri, patung, lukisan, muzik, tarian dan karya epik yang merekod cerita masyarakat.",
      keywords: ["metalurgi", "kelas sosial", "rumah ibadat", "penyimpanan rekod", "karya epik"],
    },
  ],
  "Chapter 5": [
    {
      key: "c5-tb6",
      num: 7,
      title: "Faktor Tambahan Kemunculan Tamadun",
      summary:
        "Petempatan Kekal — Bekalan air, tanah subur dan sumber makanan membolehkan manusia membina petempatan tetap. Perlindungan Semula Jadi — Sungai dan bentuk muka bumi di sekitarnya membantu menjadi sempadan serta perlindungan kepada petempatan.",
      keywords: ["petempatan kekal", "perlindungan semula jadi", "sempadan semula jadi"],
    },
    {
      key: "c5-tb7",
      num: 8,
      title: "Pelengkap Tamadun Mesopotamia",
      summary:
        "Mesopotamia bermaksud tanah di antara dua sungai, iaitu Sungai Tigris dan Sungai Euphrates. Urutan kerajaan utamanya ialah Sumer, Akkad, Babylon, Asyria dan Chaldea. Bandar Ur menjadi pusat perdagangan dan pelabuhan. Ziggurat turut berfungsi sebagai pusat pentadbiran. Selain sistem perpuluhan yang telah dipelajari, Mesopotamia juga terkenal dengan sistem nombor berasaskan 60; sistem ini menjadi asas pembahagian masa dan bulatan 360 darjah. Tulisan kuneiform ditulis pada kepingan tanah liat. Epik Gilgamesh ialah karya kesusasteraan terkenal tentang pemerintahan, kepahlawanan, persahabatan dan kehidupan manusia.",
      keywords: [
        "Sungai Tigris",
        "Sungai Euphrates",
        "Sumer",
        "Akkad",
        "Asyria",
        "Chaldea",
        "Epik Gilgamesh",
        "sistem nombor berasaskan 60",
        "pusat pentadbiran",
        "tanah liat",
        "Ur",
      ],
    },
    {
      key: "c5-tb8",
      num: 9,
      title: "Pelengkap Tamadun Mesir Purba",
      summary:
        "Mesir Purba pada awalnya terdiri daripada Mesir Hulu dan Mesir Hilir. Raja Mennes menyatukan kedua-duanya sekitar 3100 SM. Sungai Nil membekalkan tanah subur melalui mendapan lumpur selepas banjir. Piramid dibina sebagai makam Firaun dan menunjukkan kemajuan seni bina serta kejuruteraan. Sfinks pula ialah binaan berkepala manusia dan berbadan singa yang dikaitkan dengan kekuasaan serta perlindungan.",
      keywords: [
        "Sungai Nil",
        "Mesir Hulu",
        "Mesir Hilir",
        "Raja Mennes",
        "3100 SM",
        "Piramid",
        "makam Firaun",
        "Sfinks",
      ],
    },
    {
      key: "c5-tb9",
      num: 10,
      title: "Pelengkap Tamadun Indus",
      summary:
        "Mohenjo-Daro dan Harappa ialah dua bandar utama Tamadun Indus. Rumah dan bangunannya mempunyai sistem saliran serta paip air yang terancang. Sukatan dan timbangan yang seragam memudahkan perdagangan. Masyarakatnya mahir menghasilkan tembikar, barangan logam dan kraftangan. Antara faktor yang dipercayai mungkin menyebabkan kemerosotannya ialah banjir, perubahan aliran sungai, pergerakan tektonik dan kemerosotan kegiatan ekonomi; tiada satu punca yang dapat dinyatakan sebagai benar-benar pasti.",
      keywords: [
        "Sungai Indus",
        "Mohenjo-Daro",
        "Harappa",
        "paip air",
        "saliran",
        "sukatan seragam",
        "timbangan seragam",
        "pergerakan tektonik",
        "banjir",
        "perubahan aliran sungai",
      ],
    },
    {
      key: "c5-tb10",
      num: 11,
      title: "Pelengkap Tamadun Huang He",
      summary:
        "Perkembangan kerajaan utama Huang He melalui Dinasti Xia, Dinasti Shang dan Dinasti Zhou. Anyang menjadi pusat pemerintahan penting Dinasti Shang, manakala Dinasti Zhou menggunakan konsep Mandat dari Syurga untuk mengesahkan pemerintahan. Masyarakatnya mahir menghasilkan barangan gangsa, termasuk bekas upacara dan senjata, di samping tembikar serta peralatan pertanian. Tulang oracle digunakan dalam upacara keagamaan dan ramalan yang berkaitan dengan pemujaan nenek moyang.",
      keywords: [
        "Sungai Huang He",
        "Xia",
        "Shang",
        "Zhou",
        "Anyang",
        "gangsa",
        "senjata gangsa",
        "bekas upacara",
        "tulang oracle",
        "pemujaan nenek moyang",
      ],
    },
    {
      key: "c5-tb11",
      num: 12,
      title: "Perbandingan Pemerintahan Tamadun Awal",
      summary:
        "Mesopotamia — Raja memerintah negara-kota dan dianggap wakil tuhan. Mesir Purba — Firaun berkuasa dalam pemerintahan, agama dan ketenteraan. Indus — Golongan pendeta dipercayai mempunyai pengaruh penting dalam masyarakat. Huang He — Raja dibantu pembesar dan pemerintahannya dikaitkan dengan Mandat dari Syurga.",
      keywords: ["raja negara-kota", "wakil tuhan", "Firaun", "pendeta", "pembesar", "Mandat dari Syurga"],
    },
    {
      key: "c5-tb12",
      num: 13,
      title: "Perbandingan Ekonomi Tamadun Awal",
      summary:
        "Keempat-empat tamadun menjalankan pertanian, penternakan, pertukangan, pengairan dan perdagangan. Lebihan hasil menggalakkan pengkhususan pekerjaan. Mesopotamia menjalankan perdagangan antara negara-kota; Mesir Purba bertani di Lembah Sungai Nil; Indus berdagang dengan Mesopotamia; Huang He pula berkembang melalui pertanian, sutera, gangsa dan perdagangan.",
      keywords: ["pertanian", "penternakan", "pertukangan", "pengairan", "perdagangan", "lebihan hasil", "pengkhususan pekerjaan"],
    },
    {
      key: "c5-tb13",
      num: 14,
      title: "Perbandingan Teknologi Tamadun Awal",
      summary:
        "Mesopotamia — roda, bajak, sistem nombor berasaskan 60 dan kalendar. Mesir Purba — pengairan, geometri, perubatan dan pembinaan piramid. Indus — bandar grid, perparitan, paip air serta sukatan seragam. Huang He — pengairan, gangsa, senjata, peralatan pertanian dan kalendar.",
      keywords: ["roda", "bajak", "geometri", "perubatan", "bandar grid", "perparitan", "kalendar"],
    },
    {
      key: "c5-tb14",
      num: 15,
      title: "Perbandingan Kesenian dan Kesusasteraan",
      summary:
        "Mesopotamia — ziggurat dan Epik Gilgamesh. Mesir Purba — piramid, sfinks, ukiran makam dan lukisan. Indus — patung, mohor, tembikar dan barangan logam. Huang He — barangan gangsa, tembikar dan seni yang berkaitan dengan upacara.",
      keywords: ["ziggurat", "Epik Gilgamesh", "sfinks", "ukiran makam", "mohor", "barangan gangsa"],
    },
    {
      key: "c5-tb15",
      num: 16,
      title: "Perbandingan Kepercayaan Tamadun Awal",
      summary:
        "Mesopotamia mempercayai banyak tuhan. Mesir Purba mempercayai kehidupan selepas mati. Kepercayaan Indus dapat dilihat melalui patung, mohor dan tempat mandi ritual. Masyarakat Huang He memuja nenek moyang dan menjalankan upacara menggunakan tulang oracle.",
      keywords: ["banyak tuhan", "kehidupan selepas mati", "tempat mandi ritual", "tulang oracle", "pemujaan nenek moyang"],
    },
    {
      key: "c5-tb16",
      num: 17,
      title: "Fungsi Sistem Tulisan",
      summary:
        "Kuneiform, hieroglif, piktograf Indus dan ideogram digunakan untuk merekod pentadbiran, menyimpan rekod cukai, mencatat urusan perdagangan, merekod kegiatan agama, menghasilkan kesusasteraan dan menyimpan ilmu untuk generasi berikutnya. Kuneiform ditulis pada tanah liat dan menghasilkan Epik Gilgamesh; hieroglif turut ditulis pada papirus; piktograf Indus terdapat pada mohor; ideogram Huang He berkembang daripada tulisan pada tulang oracle.",
      keywords: ["kuneiform", "hieroglif", "piktograf Indus", "ideogram", "papirus", "tulang oracle", "Epik Gilgamesh"],
    },
    {
      key: "c5-tb17",
      num: 18,
      title: "Kronologi Ringkas Tamadun Awal",
      summary:
        "1. Mesopotamia — sekitar 3500 SM\n2. Mesir Purba — sekitar 3100 SM\n3. Indus — sekitar 2500 SM\n4. Huang He — sekitar 1766 SM\n\nCara ingat: Mesopotamia muncul dahulu, diikuti Mesir Purba, Indus dan Huang He.",
      keywords: ["3500 SM", "3100 SM", "2500 SM", "1766 SM", "kronologi"],
    },
  ],
  "Chapter 6": [
    {
      key: "c6-tb1",
      num: 7,
      title: "Polis Yunani: Athens, Sparta dan Corinth",
      summary:
        "Tamadun Yunani berkembang di Semenanjung Greece dan pulau sekitarnya. Bentuk muka bumi bergunung-ganang melahirkan negara-kota atau polis yang berasingan. Setiap polis terdiri daripada kota, kawasan kecil di luar kota dan pelabuhan; di tengah kota terdapat acropolis, agora dan rumah ibadat. Athens menonjol dalam demokrasi, Sparta dalam ketenteraan dan Corinth dalam perdagangan.",
      keywords: ["polis", "acropolis", "agora", "Athens", "Sparta", "Corinth"],
    },
    {
      key: "c6-tb2",
      num: 8,
      title: "Demokrasi Athens Secara Lengkap",
      summary:
        "Athens melalui sistem monarki, oligarki, aristokrasi, tirani dan akhirnya demokrasi. Dalam demokrasi, Dewan Perhimpunan dianggotai warganegara lelaki dewasa dan bersidang sekurang-kurangnya tiga kali sebulan untuk menggubal undang-undang, membuat dasar serta melantik ahli Majlis, magistrat dan juri. Majlis mengendalikan urusan pentadbiran, magistrat melaksanakan dasar dan mahkamah atau juri mengadili kes. Wanita, hamba dan orang asing tidak dianggap warganegara.",
      keywords: ["monarki", "oligarki", "aristokrasi", "tirani", "Dewan Perhimpunan", "magistrat", "juri"],
    },
    {
      key: "c6-tb3",
      num: 9,
      title: "Pemerintahan Sparta",
      summary:
        "Sparta mengamalkan monarki terhad dengan dua orang raja. Dewan Perhimpunan dan Majlis membantu pemerintahan, sementara lima orang ephor memastikan raja tidak memerintah secara mutlak. Kehidupan masyarakat berasaskan disiplin dan latihan ketenteraan: kanak-kanak lelaki dilatih sejak berumur tujuh tahun, manakala wanita turut dilatih untuk menjadi kuat. Kesetiaan kepada negara-kota mengatasi kepentingan individu.",
      keywords: ["dua raja", "ephor", "monarki terhad", "umur tujuh tahun", "latihan ketenteraan"],
    },
    {
      key: "c6-tb4",
      num: 10,
      title: "Prinsip Seni Bina Rom",
      summary:
        "Seni bina Rom berkembang melalui kepakaran, pendidikan, dasar pemerintah, kewangan, teknologi konkrit, batu marmar, kubah, gerbang dan tiang gaya Yunani. Binaan dibuat kukuh, besar, praktikal dan mempunyai nilai estetika. Marcus Vitruvius Pollio melalui karya On Architecture menghuraikan prinsip ketahanan, kegunaan dan keindahan dalam seni bina.",
      keywords: ["Marcus Vitruvius Pollio", "On Architecture", "konkrit", "marmar", "gerbang", "ketahanan"],
    },
    {
      key: "c6-tb5",
      num: 11,
      title: "Lapan Binaan Utama Rom",
      summary:
        "Colosseum ialah arena pertandingan gladiator; Pantheon ialah tempat memuja dewa; amfiteater menjadi tempat persembahan; akueduk menyalurkan air; jalan raya menghubungkan wilayah empayar; Tembok Hadrian mempertahankan sempadan; tempat mandi awam menjadi pusat kebersihan dan sosial; Circus Maximus menganjurkan perlumbaan kereta kuda. Binaan ini menunjukkan kemajuan kejuruteraan, pengurusan bandar dan kemudahan awam Rom.",
      keywords: ["Colosseum", "Pantheon", "amfiteater", "akueduk", "Tembok Hadrian", "Circus Maximus"],
    },
  ],
  "Chapter 7": [
    {
      key: "c7-tb1",
      num: 7,
      title: "Janapada, Mahajanapada dan Magadha",
      summary:
        "Selepas Tamadun Indus berakhir, pusat tamadun beralih ke Lembah Ganges. Kerajaan kecil dikenali sebagai janapada, manakala gabungan yang lebih besar disebut mahajanapada. Magadha muncul sebagai kuasa penting kerana kedudukan strategik, tanah subur, sumber besi, gajah untuk tentera dan hubungan perdagangan. Dinasti Nanda kemudian digantikan oleh Dinasti Maurya yang diasaskan Chandragupta Maurya.",
      keywords: ["Lembah Ganges", "janapada", "mahajanapada", "Dinasti Nanda", "Dinasti Maurya"],
    },
    {
      key: "c7-tb2",
      num: 8,
      title: "Perluasan Kuasa India",
      summary:
        "Perluasan kuasa dilakukan secara fizikal dan keagamaan. Chandragupta Maurya membentuk empayar berpusat di Pataliputra dengan tentera yang besar. Asoka meneruskan perluasan hingga Perang Kalinga, tetapi penderitaan perang mendorongnya menghentikan penaklukan bersenjata. Beliau kemudian menyebarkan agama Buddha melalui utusan, inskripsi dan misi ke Tibet, Nepal, Alexandria, Antioch, Bactria serta Asia Tenggara.",
      keywords: ["Pataliputra", "Perang Kalinga", "perluasan fizikal", "perluasan keagamaan", "inskripsi", "Bactria"],
    },
    {
      key: "c7-tb3",
      num: 9,
      title: "Matlamat Pendidikan Tamadun China",
      summary:
        "Pendidikan China bertujuan lulus peperiksaan perkhidmatan awam, mengekalkan ajaran Konfusianisme, membezakan golongan elit dengan rakyat, memilih pegawai yang cekap dan memupuk nilai moral. Pendidikan rendah menumpukan hafalan tulisan dan buku suci; peringkat menengah mengajar karangan dan sastera; peringkat tinggi menafsir kitab suci serta ajaran Konfusius.",
      keywords: ["perkhidmatan awam", "Konfusianisme", "golongan elit", "hafalan", "karangan", "kitab suci"],
    },
    {
      key: "c7-tb4",
      num: 10,
      title: "Peperiksaan Perkhidmatan Awam China",
      summary:
        "Sistem peperiksaan bermula sejak Dinasti Qin dan diperkemas Maharaja Wu Di daripada Dinasti Han. Calon diperiksa dengan ketat untuk mengelakkan penipuan. Tiga tahap utama ialah Xiucai (daerah, dua kali setiap tiga tahun), Juren (ibu kota daerah, tiga tahun sekali) dan Jinshi (ibu kota empayar di hadapan maharaja, tiga tahun sekali). Mereka yang lulus memperoleh jawatan kerajaan, keistimewaan, tanda nama dan status sosial tinggi.",
      keywords: ["Dinasti Qin", "Maharaja Wu Di", "Xiucai", "Juren", "Jinshi", "tiga tahun sekali"],
    },
  ],
  "Chapter 8": [
    {
      key: "c8-tb1",
      num: 7,
      title: "Masyarakat Arab Sebelum Islam",
      summary:
        "Semenanjung Tanah Arab terbahagi kepada kawasan tengah yang kering serta kawasan pesisir yang lebih subur. Masyarakat hidup secara badwi (nomad) dan hadhari (menetap). Politik berasaskan kabilah dan syeikh; ekonomi meliputi pertanian, penternakan serta perdagangan; sosial menekankan semangat kesukuan. Kepercayaan merangkumi agama samawi Yahudi dan Nasrani, Majusi, penyembahan berhala serta kepercayaan animisme dan hunafa, iaitu pengikut ajaran Nabi Ibrahim AS.",
      keywords: ["badwi", "hadhari", "syeikh", "agama samawi", "Majusi", "hunafa"],
    },
    {
      key: "c8-tb2",
      num: 8,
      title: "Perkembangan Islam: Khulafa al-Rasyidin",
      summary:
        "Selepas kewafatan Nabi Muhammad SAW, Khulafa al-Rasyidin meneruskan pemerintahan. Abu Bakar al-Siddiq memerangi golongan murtad dan nabi palsu serta memulakan pengumpulan al-Quran. Umar al-Khattab meluaskan wilayah, menyusun pentadbiran dan memperkenalkan takwim Hijrah. Uthman bin Affan menyelaraskan mushaf al-Quran dan memperkuat angkatan laut. Ali bin Abi Talib berusaha mengekalkan kestabilan ketika berlaku konflik dalaman.",
      keywords: ["Abu Bakar", "Umar al-Khattab", "Uthman bin Affan", "Ali bin Abi Talib", "mushaf", "takwim Hijrah"],
    },
    {
      key: "c8-tb3",
      num: 9,
      title: "Kerajaan Umaiyah, Abbasiyah dan Turki Uthmaniyah",
      summary:
        "Kerajaan Umaiyah berpusat di Damsyik dan kemudian Cordoba; wilayah Islam meluas ke Afrika Utara, Sepanyol, Asia Tengah dan India. Kerajaan Abbasiyah berpusat di Baghdad dan menjadi pusat ilmu, penterjemahan, perdagangan serta kebudayaan. Kerajaan Turki Uthmaniyah berpusat di Anatolia dan menguasai Constantinople pada tahun 1453 di bawah Sultan Mehmed II. Islam turut berkembang melalui perdagangan, dakwah dan hubungan diplomatik.",
      keywords: ["Umaiyah", "Damsyik", "Cordoba", "Abbasiyah", "Baghdad", "Uthmaniyah", "Constantinople", "1453"],
    },
    {
      key: "c8-tb4",
      num: 10,
      title: "Ketokohan Nabi Muhammad SAW",
      summary:
        "Sebagai pemimpin negara, baginda merangka Piagam Madinah, membina masjid dan mempersaudarakan Muhajirin dengan Ansar. Sebagai pemimpin masyarakat, baginda menegakkan keadilan, kebajikan dan perpaduan pelbagai kaum. Sebagai pemimpin ekonomi, baginda menggalakkan perdagangan yang halal, amanah dan bebas riba. Sebagai pemimpin tentera, baginda mengutamakan strategi, disiplin dan perdamaian serta melarang pembunuhan orang awam dan pemusnahan tanaman.",
      keywords: ["Muhajirin", "Ansar", "pemimpin negara", "pemimpin masyarakat", "pemimpin ekonomi", "pemimpin tentera"],
    },
    {
      key: "c8-tb5",
      num: 11,
      title: "Sumbangan Politik dan Sosial Islam",
      summary:
        "Dalam politik, Islam memperkenalkan syura, keadilan, persamaan taraf, kebebasan beragama, konsep ummah dan pentadbiran berasaskan akidah serta syariah. Dalam sosial, Islam mengangkat martabat wanita, memupuk persaudaraan, kebajikan, akhlak dan pendidikan. Institusi masjid, madrasah, perpustakaan dan hospital berkembang. Ilmuwan seperti Ibn Sina, al-Khawarizmi, al-Biruni dan Ibn Khaldun menyumbang dalam perubatan, matematik, astronomi dan sejarah.",
      keywords: ["syura", "persamaan taraf", "martabat wanita", "madrasah", "Ibn Sina", "al-Khawarizmi", "al-Biruni"],
    },
    {
      key: "c8-tb6",
      num: 12,
      title: "Sumbangan Ekonomi Islam",
      summary:
        "Ekonomi Islam melaksanakan zakat dan wakaf, penggunaan mata wang dinar dan dirham, serta cukai al-kharaj, al-jizyah, jizyah al-ru'us dan al-'usyr. Islam melarang riba, penipuan, mengurangkan timbangan, pembaziran dan monopoli yang menindas. Baitulmal mengurus sumber negara dan kebajikan. Pertanian, penyelidikan, perdagangan halal, pembinaan empangan, jalan, jambatan serta kemudahan asas digalakkan.",
      keywords: ["wakaf", "dinar", "dirham", "al-kharaj", "al-jizyah", "al-usyr", "Baitulmal"],
    },
    {
      key: "c8-tb7",
      num: 13,
      title: "Ciri dan Contoh Seni Bina Islam",
      summary:
        "Seni bina Islam menampilkan ruang cahaya untuk keselesaan beribadat, pengudaraan yang baik, mihrab, menara, kubah, mimbar, hiasan geometri, motif tumbuhan dan kaligrafi. Binaan menyesuaikan diri dengan budaya dan iklim setempat serta berfungsi untuk ibadat, pendidikan dan masyarakat. Contoh penting dalam buku teks termasuk Masjid Cordoba, Istana Alhambra, Masjid Sultan Ahmed, Masjid Qairawan, Masjid Negara dan Masjid Putra.",
      keywords: ["mihrab", "menara", "mimbar", "Masjid Cordoba", "Alhambra", "Sultan Ahmed", "Qairawan"],
    },
  ],
};

export function getSejarahF1Subtopics(chapterKey: string): Subtopic[] {
  return [
    ...(sejarahF1Subtopics[chapterKey] ?? []),
    ...(sejarahF1TextbookAdditions[chapterKey] ?? []),
  ];
}
