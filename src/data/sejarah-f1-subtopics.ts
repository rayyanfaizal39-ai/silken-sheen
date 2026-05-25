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
      keywords: ["Gua Chauvet", "Altamira", "Stonehenge", "Catal Huyuk", "Zhoukoudian", "Kota Tampan", "Gua Niah", "Gua Kecil", "Gua Cha", "Bukit Tengkorak", "Sungai Lang", "Lembah Bernam", "megalitik"],
    },
    {
      key: "c3-s4",
      num: 4,
      title: "Ciri-ciri Kehidupan Manusia Prasejarah",
      summary:
        "🏠 Tempat Tinggal:\n- Paleolitik & Mesolitik — Gua, lubang bawah tanah, tempat terbuka.\n- Neolitik — Menetap dalam rumah kayu/tanah di lembah sungai.\n- Zaman Logam — Menetap lebih lama, membina bandar dan kota.\n\n🪓 Peralatan:\n- Paleolitik & Mesolitik — Batu kasar dan ringkas.\n- Neolitik — Batu yang dicanai halus, tembikar.\n- Zaman Logam — Alatan daripada gangsa dan besi (kapak, sabit, mata lembing).\n\n💰 Ekonomi:\n- Paleolitik & Mesolitik — Memburu binatang, mengumpul hasil hutan.\n- Neolitik — Pertanian, penternakan, sistem barter.\n- Zaman Logam — Pertanian pesat, perdagangan antarabangsa melalui laut.\n\n👥 Organisasi Sosial:\n- Paleolitik & Mesolitik — Kumpulan kecil, nomad (berpindah-randah).\n- Neolitik — Hidup menetap, ada ketua, wujud pembahagian kerja.\n- Zaman Logam — Masyarakat kompleks, wujud ketua berwibawa dan undang-undang.\n\n🙏 Kepercayaan:\n- Paleolitik & Mesolitik — Animisme, menghormati si mati.\n- Neolitik — Ritual keagamaan lebih tersusun, percaya kehidupan selepas mati.\n- Zaman Logam — Membina tempat ibadat khusus, upacara pengebumian menggunakan kubur kepingan batu.\n\n🎨 Kesenian:\n- Paleolitik & Mesolitik — Lukisan gua (bersifat realisme).\n- Neolitik — Corak pada tembikar (geometrik).\n- Zaman Logam — Kesenian pada peralatan logam (gendang gangsa Dong Son).",
      keywords: ["nomad", "animisme", "pertanian", "penternakan", "barter", "tembikar", "gendang gangsa", "Dong Son", "kubur kepingan batu", "kapak", "sabit"],
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
      keywords: ["Pertanian", "Kod Hammurabi", "Bandar", "Artisan", "Roda", "Organisasi Sosial", "Politeisme", "Ziggurat", "Piramid", "Kuneiform", "Hieroglif", "Ideogram", "Kesenian"],
    },
  ],
"Chapter 5": [
    {
      key: "c5-s1",
      num: 1,
      title: "Faktor Geografi: Mengapa Lembah Sungai?",
      summary:
        "Keempat-empat tamadun awal dunia muncul di lembah sungai utama kerana faktor-faktor berikut:\n\n🌱 Tanah yang Subur — Banjir sungai membawa mendapan lumpur (lanar) yang sangat kaya dengan nutrien untuk pertanian.\n\n💧 Bekalan Air — Sumber utama untuk kegunaan harian manusia, minuman haiwan ternakan, dan pengairan tanaman.\n\n🚢 Pengangkutan & Perhubungan — Sungai berfungsi sebagai jalan raya semula jadi untuk perdagangan antara wilayah.\n\n🐟 Sumber Protein — Membekalkan ikan dan hidupan air sebagai tambahan sumber makanan penduduk.",
      keywords: ["lembah sungai", "tanah subur", "lanar", "mendapan lumpur", "bekalan air", "pengangkutan", "perdagangan"],
    },
    {
      key: "c5-s2",
      num: 2,
      title: "Tamadun Mesopotamia (3,500 SM – 539 SM)",
      summary:
        "Tamadun Mesopotamia terletak di wilayah yang dikenali sebagai Bulan Sabit Subur (Fertile Crescent).\n\n👑 Sistem Beraja & Kerajaan:\n- Setiap negara kota mempunyai pemerintah sendiri. Raja dianggap sebagai wakil tuhan di bumi.\n- Negara kota yang terkenal: Ur, Uruk, Lagash, dan Babylon.\n\n🔬 Sumbangan Sains & Teknologi:\n- Matematik: Memperkenalkan sistem perpuluhan, konsep bulatan 360 darjah, dan formula pengiraan luas.\n- Astronomi: Mencipta kalendar berdasarkan fasa bulan (12 bulan dalam setahun).\n- Seni Bina: Membina Ziggurat sebagai pusat ibadat, pusat penyimpanan khazanah, dan pusat pendidikan.\n\n⚖️ Kod Undang-undang Hammurabi:\n- Merupakan kod undang-undang bertulis tertua.\n- Mengandungi prinsip 'mata ganti mata' untuk memastikan keadilan sosial yang ketat.",
      keywords: ["Mesopotamia", "Bulan Sabit Subur", "Fertile Crescent", "Ur", "Uruk", "Lagash", "Babylon", "Ziggurat", "Kod Hammurabi", "Kuneiform", "360 darjah", "kalendar bulan"],
    },
    {
      key: "c5-s3",
      num: 3,
      title: "Tamadun Mesir Purba (3,100 SM – 332 SM)",
      summary:
        "Tamadun Mesir Purba dibahagikan kepada tiga zaman utama: Kerajaan Purba, Kerajaan Pertengahan, dan Kerajaan Baru.\n\n👑 Organisasi Sosial & Pentadbiran:\n- Firaun: Mempunyai kuasa mutlak dalam pentadbiran, agama, dan ketenteraan.\n- Wazir: Pegawai tertinggi yang membantu Firaun dalam urusan kutipan cukai dan keadilan.\n- Jurutulis (Scribes): Golongan elit yang pakar dalam tulisan Hieroglif untuk menyimpan rekod kerajaan.\n\n🔬 Sumbangan Intelektual & Sains:\n- Perubatan: Kepakaran dalam Mumia (pengawetan mayat) membawa kepada pemahaman anatomi manusia dan pembedahan.\n- Kertas Papirus: Menggunakan serat pokok papirus untuk dijadikan kertas bagi tujuan penulisan dan lukisan.\n- Matematik: Memperkenalkan konsep geometri bagi menguruskan banjir dan pembinaan piramid.",
      keywords: ["Mesir Purba", "Firaun", "Wazir", "Jurutulis", "Scribes", "Hieroglif", "Mumia", "Papirus", "geometri", "Piramid", "Kerajaan Purba", "Kerajaan Pertengahan", "Kerajaan Baru"],
    },
    {
      key: "c5-s4",
      num: 4,
      title: "Tamadun Indus (2,500 SM – 1,750 SM)",
      summary:
        "Tamadun Indus dikenali sebagai tamadun yang mempunyai kemahiran kejuruteraan bangunan yang paling maju pada zamannya.\n\n🏙️ Perancangan Bandar Sistematik:\n- Bandar dibina mengikut pelan grid yang teratur (segi empat tepat).\n- Sistem Perparitan: Longkang di bawah jalan raya adalah tertutup dan mempunyai lubang pemeriksaan untuk memudahkan pembersihan.\n- Pusat Awam: Adanya The Great Bath (kolam mandi awam) yang digunakan untuk upacara keagamaan dan kebersihan.\n\n💼 Ekonomi & Perdagangan:\n- Mencipta Meterai (Seals) yang mempunyai ukiran haiwan dan tulisan sebagai simbol pengenalan pedagang dalam urusan perdagangan antarabangsa dengan Mesopotamia.",
      keywords: ["Tamadun Indus", "pelan grid", "sistem perparitan", "The Great Bath", "Meterai", "Seals", "Piktograf", "perdagangan antarabangsa", "Mohenjo-daro", "Harappa"],
    },
    {
      key: "c5-s5",
      num: 5,
      title: "Tamadun Huang He (1,766 SM – 256 SM)",
      summary:
        "Tamadun Huang He bermula di Lembah Sungai Huang He yang juga dikenali sebagai Sungai Kuning.\n\n🏛️ Sistem Politik:\n- Konsep Mandat dari Syurga: Pemerintah dipercayai mendapat restu tuhan. Jika berlaku bencana alam, ia dianggap petanda bahawa mandat raja telah ditarik balik.\n\n🌾 Kemajuan Pertanian & Ekonomi:\n- Peralatan Besi: Penggunaan cangkul dan sabit daripada besi meningkatkan produktiviti makanan.\n- Sistem Pengairan: Terusan dibina untuk mengalirkan air ke kawasan pertanian dan mengawal banjir.\n\n🖋️ Budaya & Tulisan:\n- Ideogram: Tulisan yang berkembang daripada simbol-simbol pada tulang sula (oracle bones).\n- Sutera: Masyarakat Huang He merupakan yang pertama menenun sutera untuk pakaian.",
      keywords: ["Huang He", "Sungai Kuning", "Mandat dari Syurga", "oracle bones", "Ideogram", "sutera", "cangkul", "sabit", "terusan", "pengairan"],
    },
    {
      key: "c5-s6",
      num: 6,
      title: "Perbandingan Antara Tamadun Awal",
      summary:
        "Jadual perbandingan ringkas antara keempat-empat tamadun awal dunia:\n\n🏛️ Mesopotamia\n- Lokasi Sungai: Tigris & Euphrates\n- Sistem Tulisan: Kuneiform\n- Monumen Terkenal: Ziggurat\n\n🏛️ Mesir Purba\n- Lokasi Sungai: Sungai Nil\n- Sistem Tulisan: Hieroglif\n- Monumen Terkenal: Piramid\n\n🏛️ Indus\n- Lokasi Sungai: Sungai Indus\n- Sistem Tulisan: Piktograf (Indus script)\n- Monumen Terkenal: The Great Bath\n\n🏛️ Huang He\n- Lokasi Sungai: Sungai Huang He\n- Sistem Tulisan: Ideogram\n- Monumen Terkenal: Tembok Besar (Zaman kemudian)",
      keywords: ["Mesopotamia", "Mesir Purba", "Indus", "Huang He", "Tigris", "Euphrates", "Nil", "Kuneiform", "Hieroglif", "Piktograf", "Ideogram", "Ziggurat", "Piramid", "The Great Bath", "Tembok Besar"],
    },
  ],
};
export function getSejarahF1Subtopics(chapterKey: string): Subtopic[] {
  return sejarahF1Subtopics[chapterKey] ?? [];
},