import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-pantun-kiasan";

function node(id: string, label: string, summary?: string, children?: MindNode[]): MindNode {
  return {
    id: `${PREFIX}-${id}`,
    label,
    ...(summary ? { summary } : {}),
    ...(children?.length ? { children } : {}),
  };
}

function branch(id: string, label: string, children: MindNode[]): MindNode {
  return node(id, label, undefined, children);
}

function supported(id: string, label: string, explanation: string, evidence: string): MindNode {
  return branch(id, label, [
    node(`${id}-huraian`, "Huraian", explanation),
    node(`${id}-bukti`, "Idea / Rangkap Sokongan", evidence),
  ]);
}

const stanzaMeanings = [
  {
    meaning:
      "Perbuatan membazir ialah amalan yang merugikan kerana sesuatu barang mungkin masih boleh digunakan.",
    advice: "Gunakan barang dengan cermat dan elakkan pembaziran.",
  },
  {
    meaning: "Orang yang merantau lazimnya merendah diri apabila berada di tempat orang.",
    advice: "Bawalah diri dengan rendah hati di tempat asing.",
  },
  {
    meaning:
      "Sebelum menginginkan sesuatu yang sukar atau mustahil, seseorang perlu mengenali kemampuan dirinya.",
    advice: "Ukur kemampuan sebelum mengejar sesuatu keinginan.",
  },
  {
    meaning: "Seseorang tidak wajar terlalu berharap kepada sesuatu yang belum pasti.",
    advice: "Bersikap realistik dan jangan bergantung pada hasil yang belum tentu.",
  },
  {
    meaning:
      "Orang yang sombong akan kebolehannya cenderung memandang rendah kemampuan orang lain.",
    advice: "Jangan angkuh atau meremehkan orang lain.",
  },
  {
    meaning: "Seseorang tidak patut membesar-besarkan kejayaan atau pekerjaan yang kecil.",
    advice: "Bersederhana ketika menceritakan pencapaian.",
  },
  {
    meaning: "Pendirian manusia mudah berubah jika tidak berpegang teguh pada sesuatu pendapat.",
    advice: "Bina pendirian yang tetap selepas membuat pertimbangan.",
  },
  {
    meaning:
      "Kemarahan dapat diredakan melalui kesabaran dan kata-kata bernas daripada orang berilmu.",
    advice: "Bersabar dan gunakan kebijaksanaan untuk meredakan kemarahan.",
  },
  {
    meaning: "Orang yang merantau akhirnya akan kembali semula ke tempat asalnya.",
    advice: "Ingatlah asal usul walaupun berada jauh di perantauan.",
  },
  {
    meaning: "Setiap perkara yang berlaku atau diperkatakan orang mempunyai sebabnya.",
    advice: "Selidiki punca sebelum membuat kesimpulan.",
  },
  {
    meaning:
      "Seseorang menginginkan sesuatu yang besar tetapi tidak mempunyai keupayaan untuk mencapainya.",
    advice: "Padankan cita-cita dengan usaha dan kemampuan yang sebenar.",
  },
  {
    meaning:
      "Orang yang berpengetahuan sedikit tidak wajar mencabar orang yang jauh lebih luas ilmunya.",
    advice: "Sedari batas ilmu dan belajarlah daripada orang yang lebih berpengetahuan.",
  },
  {
    meaning: "Seseorang tidak patut bersiap menikmati hasil yang belum tentu diperoleh.",
    advice: "Tunggu hasil yang nyata dan jangan terlalu awal berasa berjaya.",
  },
  {
    meaning:
      "Orang yang malas sejak muda sukar menjadi rajin apabila tua; kesukaran pula lebih berat jika ketika senang pun tidak berusaha.",
    advice: "Biasakan diri rajin berusaha sejak muda.",
  },
  {
    meaning: "Seseorang tidak seharusnya melakukan atau mengharapkan sesuatu di luar kemampuannya.",
    advice: "Bertindak mengikut keupayaan diri dan keadaan sebenar.",
  },
  {
    meaning: "Orang yang berdosa menyesal apabila peluang untuk bertaubat sudah terlambat.",
    advice: "Segeralah insaf dan bertaubat ketika masih berpeluang.",
  },
  {
    meaning:
      "Paras rupa yang cantik atau tampan tidak bernilai jika seseorang tidak berbudi bahasa.",
    advice: "Utamakan budi bahasa dan tingkah laku yang sopan.",
  },
] as const;

function stanzaNode(index: number, meaning: string, advice: string): MindNode {
  const id = index + 1;
  return branch(`maksud-${id}`, `Rangkap ${id}`, [
    node(`maksud-${id}-kiasan`, "Maksud Kiasan", meaning),
    node(`maksud-${id}-nasihat`, "Nasihat", advice),
  ]);
}

function kiasan(
  id: string,
  label: string,
  literal: string,
  implied: string,
  message: string,
): MindNode {
  return branch(`kiasan-${id}`, label, [
    node(`kiasan-${id}-literal`, "Gambaran / Maksud Literal", literal),
    node(`kiasan-${id}-tersirat`, "Maksud Tersirat", implied),
    node(`kiasan-${id}-mesej`, "Mesej", message),
  ]);
}

export const bahasaMelayuTingkatan2PantunKiasanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "PANTUN\nKIASAN",
  summary:
    "Pantun Kiasan menyampaikan maksud secara tidak langsung melalui perbandingan, lambang dan bahasa berkias untuk memberikan nasihat tentang kehidupan dan tingkah laku manusia.",
  children: [
    branch("apa-itu-kiasan", "Apa Itu Kiasan?", [
      node(
        "kiasan-definisi",
        "Definisi",
        "Kiasan ialah penggunaan kata, gambaran atau ungkapan yang membawa maksud secara tidak langsung.",
      ),
      node(
        "kiasan-tersurat-tersirat",
        "TERSURAT ≠ TERSIRAT",
        "Maksud tersurat ialah gambaran pada permukaan; maksud tersirat ialah idea manusia, sikap atau nasihat di sebalik gambaran itu.",
      ),
      node("kiasan-aliran", "Cara Kiasan Berfungsi", "OBJEK / GAMBARAN → MAKSUD KIASAN → MESEJ."),
      node(
        "kiasan-wakil",
        "Apa yang Boleh Diwakili?",
        "Sesuatu objek atau keadaan boleh mewakili tingkah laku, keperibadian, hubungan manusia, keadaan hidup atau nasihat.",
      ),
      node(
        "kiasan-konteks",
        "Konteks Menentukan Makna",
        "Jangan menganggap setiap kata nama sebagai simbol. Tafsir keseluruhan rangkap dan hubungkan gambaran dengan mesej yang munasabah.",
      ),
    ]),
    branch(
      "maksud-pantun",
      "Maksud Pantun",
      stanzaMeanings.map((item, index) => stanzaNode(index, item.meaning, item.advice)),
    ),
    branch("tema", "Tema", [
      branch("tema-utama", "SINDIRAN TERHADAP SIKAP NEGATIF MANUSIA", [
        node(
          "tema-huraian",
          "Huraian",
          "Pantun menyindir anggota masyarakat yang mengamalkan pelbagai sikap negatif sehingga menjejaskan kehidupan sendiri dan orang lain.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema Pantun Kiasan ialah sindiran terhadap segelintir anggota masyarakat yang mengamalkan sikap negatif sehingga menjejaskan kehidupan sendiri dan orang lain.",
        ),
        node(
          "tema-sokongan",
          "Idea Sokongan",
          "Pembaziran, kesombongan, harapan di luar kemampuan, kemalasan dan ketiadaan budi bahasa ialah antara sikap yang disindir.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      supported(
        "persoalan-membazir",
        "Keburukan Sikap Membazir",
        "Pembaziran merugikan diri dan perlu dielakkan.",
        "Rangkap 1 mengingatkan bahawa sesuatu yang kurang baik mungkin masih berguna.",
      ),
      supported(
        "persoalan-rendah-diri",
        "Sikap Rendah Diri di Tempat Orang",
        "Perantau perlu pandai membawa diri apabila berada dalam masyarakat lain.",
        "Rangkap 2 menggambarkan orang dagang yang merendah diri.",
      ),
      supported(
        "persoalan-kemampuan",
        "Harapan di Luar Kemampuan",
        "Keinginan perlu disesuaikan dengan kemampuan dan keadaan sebenar.",
        "Rangkap 3, 4, 11, 13 dan 15 menegur harapan yang mustahil atau belum pasti.",
      ),
      supported(
        "persoalan-sombong",
        "Keburukan Sombong dan Bangga Diri",
        "Kesombongan menyebabkan seseorang memandang rendah orang lain dan boleh memudaratkan dirinya.",
        "Rangkap 5 dan 6 menegur sikap membanggakan kebolehan serta pencapaian kecil.",
      ),
      supported(
        "persoalan-sabar",
        "Kesabaran Melenyapkan Kemarahan",
        "Kesabaran dan kebijaksanaan dapat menenangkan emosi.",
        "Rangkap 8 menggambarkan kemarahan yang dapat dipadamkan.",
      ),
      supported(
        "persoalan-malas",
        "Kemalasan Menghalang Kejayaan",
        "Sifat malas yang dibiasakan sejak muda sukar diubah ketika dewasa.",
        "Rangkap 14 membandingkan kemalasan pada waktu muda dengan keadaan ketika tua atau susah.",
      ),
      supported(
        "persoalan-budi",
        "Budi Bahasa Lebih Penting daripada Rupa",
        "Kecantikan luaran tidak bermakna tanpa akhlak dan kesopanan.",
        "Rangkap 17 menilai seseorang melalui budi bahasa, bukan rupa semata-mata.",
      ),
      supported(
        "persoalan-taubat",
        "Keinsafan dan Taubat Jangan Ditangguhkan",
        "Kesalahan perlu disedari dan diperbaiki ketika peluang masih ada.",
        "Rangkap 16 menggambarkan penyesalan yang datang terlalu lewat.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node(
        "bentuk-identiti",
        "Identiti Karya",
        "Puisi tradisional jenis pantun dalam antologi Baik Budi, Indah Bahasa, Tingkatan 2.",
      ),
      node("bentuk-rangkap", "Tujuh Belas Rangkap", "Pantun ini mengandungi 17 rangkap."),
      node("bentuk-baris", "Pantun Empat Kerat", "Setiap rangkap mempunyai empat baris."),
      node(
        "bentuk-pembayang",
        "Pembayang dan Maksud",
        "Dua baris pertama ialah pembayang, manakala dua baris terakhir membawa maksud.",
      ),
      node(
        "bentuk-kata",
        "Tiga hingga Lima Patah Kata",
        "Setiap baris mengandungi antara tiga hingga lima patah kata.",
      ),
      node(
        "bentuk-suku-kata",
        "Sembilan hingga Sebelas Suku Kata",
        "Setiap baris mengandungi antara sembilan hingga sebelas suku kata.",
      ),
      node("bentuk-rima", "Rima Akhir abab", "Kesemua rangkap berima akhir abab."),
      node("bentuk-terikat", "Bentuk Terikat", "Pantun mematuhi pola rangkap, baris dan rima."),
    ]),
    branch("ciri-pantun", "Ciri Pantun", [
      node(
        "ciri-pembayang",
        "Pembayang dan Maksud",
        "Pembayang membina imej serta bunyi; bahagian maksud menyampaikan sindiran atau nasihat.",
      ),
      node(
        "ciri-padat",
        "Bahasa Padat",
        "Baris yang singkat membawa tafsiran dan mesej kehidupan yang luas.",
      ),
      node(
        "ciri-kiasan",
        "Kiasan",
        "Sikap manusia diterangkan secara tidak langsung melalui objek, keadaan dan perbandingan.",
      ),
      node(
        "ciri-alam",
        "Unsur Alam dan Kehidupan Harian",
        "Haiwan, tumbuhan, cuaca dan benda harian menjadi wahana gambaran pantun.",
      ),
      node(
        "ciri-irama",
        "Irama",
        "Rima dan pengulangan bunyi menjadikan pantun merdu serta mudah diingati.",
      ),
    ]),
    branch("bahasa-kiasan", "Bahasa Kiasan", [
      kiasan(
        "pembaziran",
        "Barang Kurang Baik Masih Berguna — Rangkap 1",
        "Sesuatu benda yang kelihatan buruk tidak semestinya terus dibuang.",
        "Manusia tidak wajar membazir kerana benda itu mungkin mempunyai kegunaan lain.",
        "Gunakan sumber dengan cermat.",
      ),
      kiasan(
        "melukut",
        "Melukut di Tepi Gantang — Rangkap 2",
        "Melukut ialah serpihan beras kecil yang berada di pinggir gantang.",
        "Gambaran itu mewakili orang dagang yang merasakan dirinya kecil atau kurang penting di tempat orang.",
        "Rendah diri perlu diamalkan tanpa merendahkan harga diri secara keterlaluan.",
      ),
      kiasan(
        "harapan",
        "Mencapai di Luar Kemampuan — Rangkap 3, 4, 11, 13 dan 15",
        "Pelbagai gambaran menunjukkan usaha atau persediaan terhadap sesuatu yang sukar dan belum pasti.",
        "Keinginan yang terlalu tinggi tanpa kemampuan atau hasil nyata boleh mengecewakan.",
        "Nilai kemampuan, usaha dan kepastian sebelum bertindak.",
      ),
      kiasan(
        "besar-kecil",
        "Kemampuan Besar dan Masalah Kecil — Rangkap 5",
        "Perkara besar dan kecil dibandingkan untuk mengukur kebolehan.",
        "Orang yang benar-benar berkebolehan tidak perlu sombong atau meremehkan cabaran kecil.",
        "Tunjukkan kemampuan dengan tindakan, bukan keangkuhan.",
      ),
      kiasan(
        "ayam",
        "Resmi Ayam — Rangkap 6",
        "Ayam digambarkan membuat bising selepas menghasilkan sesuatu yang kecil.",
        "Gambaran itu menyindir orang yang menghebohkan pencapaian yang tidak seberapa.",
        "Bersederhana dan jangan membesar-besarkan kejayaan.",
      ),
      kiasan(
        "pendirian",
        "Gambaran yang Mudah Berubah — Rangkap 7",
        "Keadaan yang tidak tetap digunakan untuk menggambarkan perubahan.",
        "Manusia yang tiada pegangan mudah mengubah pendiriannya.",
        "Buat pertimbangan dan pegang keputusan yang munasabah.",
      ),
      kiasan(
        "api-embun",
        "Api dan Embun — Rangkap 8",
        "Api menggambarkan keadaan yang panas, manakala embun membawa kesan menyejukkan.",
        "Api mewakili kemarahan dan embun mewakili kesabaran atau kata-kata yang menenangkan.",
        "Tangani kemarahan dengan sabar dan bijaksana.",
      ),
      kiasan(
        "ilmu-malas",
        "Ukuran Ilmu dan Usaha — Rangkap 12 dan 14",
        "Ukuran yang sedikit serta perbandingan waktu muda dan tua menggambarkan batas manusia.",
        "Ilmu yang cetek tidak mengatasi pengetahuan luas; kemalasan sejak muda pula sukar diubah.",
        "Tambah ilmu dan rajin berusaha sejak awal.",
      ),
      kiasan(
        "kubur",
        "Tangisan di Pintu Kubur — Rangkap 16",
        "Nyawa digambarkan menangis ketika berada di ambang kematian.",
        "Gambaran itu melambangkan penyesalan apabila peluang bertaubat sudah terlambat.",
        "Insaf dan perbaikilah kesalahan segera.",
      ),
      kiasan(
        "rupa-budi",
        "Rupa Elok Tanpa Budi — Rangkap 17",
        "Paras rupa yang menarik dibandingkan dengan kelakuan seseorang.",
        "Kecantikan luaran tidak menyempurnakan seseorang yang tidak berbudi bahasa.",
        "Utamakan akhlak, kesopanan dan budi pekerti.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      supported(
        "gaya-hiperbola",
        "Hiperbola",
        "Gambaran yang dibesar-besarkan menegaskan kekuatan kemarahan dan kesan kesabaran.",
        "Contoh pendek: ‘Hujan ribut gunung terbakar’.",
      ),
      supported(
        "gaya-inversi",
        "Inversi",
        "Susunan kata diterbalikkan untuk menjaga irama dan penegasan.",
        "Contoh pendek: ‘Ikan busuk jangan dibuang’.",
      ),
      supported(
        "gaya-peribahasa",
        "Peribahasa",
        "Ungkapan yang mantap menyampaikan sindiran dengan padat.",
        "Contoh pendek: ‘melukut di tepi gantang’.",
      ),
      supported(
        "gaya-personifikasi",
        "Personifikasi",
        "Sifat manusia diberikan kepada sesuatu yang bukan manusia untuk menguatkan kesan penyesalan.",
        "Contoh pendek: ‘nyawa menangis’.",
      ),
      supported(
        "gaya-simile",
        "Simile",
        "Kata perbandingan menghubungkan gambaran dengan keadaan manusia.",
        "Contoh menggunakan kata ‘macam’ pada kiasan melukut.",
      ),
      supported(
        "gaya-sinkope",
        "Sinkope",
        "Pemendekan kata mengekalkan kelancaran dan irama pantun.",
        "Contoh pendek: ‘tak’.",
      ),
      supported(
        "gaya-repetisi",
        "Repetisi",
        "Pengulangan kata mengikat baris dan menegaskan imej.",
        "Kata ‘tikar’ diulang dalam Rangkap 1.",
      ),
      supported(
        "gaya-imej-alam",
        "Imej Alam",
        "Unsur alam membina pembayang yang nyata sebelum maksud tersirat disampaikan.",
        "Antara imej yang disahkan ialah ikan, burung, bunga dan gunung.",
      ),
      supported(
        "gaya-asonansi",
        "Asonansi",
        "Pengulangan bunyi vokal menghasilkan kemerduan.",
        "Bunyi vokal a berulang dalam frasa tentang daya dan tangan pada Rangkap 11.",
      ),
      supported(
        "gaya-aliterasi",
        "Aliterasi",
        "Pengulangan bunyi konsonan menguatkan irama.",
        "Bunyi konsonan k berulang pada frasa tentang cicak dalam Rangkap 5.",
      ),
      node(
        "gaya-had",
        "Had Petikan",
        "Gunakan contoh pendek yang disahkan; jangan menyalin keseluruhan rangkap atau mencipta baris pantun.",
      ),
    ]),
    branch("nilai", "Nilai", [
      supported(
        "nilai-jimat",
        "Berjimat Cermat",
        "Seseorang menggunakan barang dan sumber secara berhemah.",
        "Rangkap 1 menegur perbuatan membazir.",
      ),
      supported(
        "nilai-rendah-diri",
        "Merendah Diri",
        "Seseorang pandai membawa diri tanpa bersikap sombong.",
        "Rangkap 2 menggambarkan sikap orang dagang di tempat orang.",
      ),
      supported(
        "nilai-rasional",
        "Rasional",
        "Seseorang mempertimbangkan kemampuan dan kepastian sebelum bertindak.",
        "Rangkap 3, 4, 11, 13 dan 15 menegur keinginan yang tidak realistik.",
      ),
      supported(
        "nilai-sabar",
        "Kesabaran",
        "Seseorang mengawal emosi ketika menghadapi kemarahan atau masalah.",
        "Rangkap 8 menunjukkan kemarahan dapat diredakan.",
      ),
      supported(
        "nilai-rajin",
        "Kerajinan",
        "Seseorang membiasakan diri berusaha sejak muda.",
        "Rangkap 14 menegur sifat malas.",
      ),
      supported(
        "nilai-insaf",
        "Keinsafan",
        "Seseorang menyedari kesalahan dan berusaha memperbaikinya.",
        "Rangkap 16 memperlihatkan penyesalan yang datang terlambat.",
      ),
      supported(
        "nilai-budi",
        "Berbudi Bahasa",
        "Seseorang menjaga tutur kata dan tingkah laku yang sopan.",
        "Rangkap 17 mengutamakan budi bahasa berbanding paras rupa.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-jimat",
        "Kita Hendaklah Berjimat Cermat",
        "Gunakan barang dan sumber dengan baik supaya tidak berlaku pembaziran.",
      ),
      node(
        "pengajaran-rendah-diri",
        "Kita Hendaklah Bersikap Rendah Hati",
        "Pandai membawa diri ketika berada di tempat orang dan jangan bersikap sombong.",
      ),
      node(
        "pengajaran-rasional",
        "Kita Hendaklah Bersikap Rasional",
        "Pertimbangkan kemampuan, bukti dan akibat sebelum membuat keputusan.",
      ),
      node(
        "pengajaran-sabar",
        "Kita Hendaklah Bersabar",
        "Kesabaran dan kata-kata yang baik dapat meredakan kemarahan.",
      ),
      node(
        "pengajaran-rajin",
        "Kita Hendaklah Rajin Berusaha",
        "Elakkan kemalasan dan bina tabiat rajin sejak muda.",
      ),
      node(
        "pengajaran-insaf",
        "Kita Hendaklah Segera Insaf",
        "Akui kesalahan dan bertaubat sebelum terlambat.",
      ),
      node(
        "pengajaran-budi",
        "Kita Hendaklah Berbudi Bahasa",
        "Budi pekerti dan kesopanan lebih bernilai daripada kecantikan luaran.",
      ),
    ]),
    branch("teknik-tafsir", "Teknik Mentafsir Kiasan", [
      node(
        "tafsir-1",
        "Langkah 1 — Kenal Pasti Gambaran",
        "Tanya: Apakah objek, keadaan atau tindakan yang disebut?",
      ),
      node(
        "tafsir-2",
        "Langkah 2 — Jangan Berhenti pada Maksud Literal",
        "Tanya: Adakah pantun benar-benar hanya membincangkan objek itu?",
      ),
      node(
        "tafsir-3",
        "Langkah 3 — Hubungkan dengan Manusia",
        "Cari kaitan dengan sikap, tindakan, hubungan, akibat atau nasihat.",
      ),
      node(
        "tafsir-4",
        "Langkah 4 — Bentuk Maksud Tersirat",
        "Gunakan GAMBARAN + APA YANG DIWAKILI + MESEJ.",
      ),
      node(
        "tafsir-model",
        "Ayat Model",
        "Gambaran tersebut sebenarnya merujuk kepada ______ dan menasihati kita supaya ______.",
      ),
      node(
        "tafsir-semak",
        "Semak Tafsiran",
        "Pastikan tafsiran sesuai dengan kedua-dua baris maksud dan tidak terlalu jauh daripada konteks rangkap.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node(
        "kata-aliran",
        "ALIRAN INGATAN",
        "KIASAN → GAMBARAN → MAKSUD TERSIRAT → SIKAP MANUSIA → NASIHAT → PENGAJARAN.",
      ),
      node("kata-teras", "PERATURAN TERAS", "JANGAN BACA SECARA LITERAL SAHAJA."),
      node(
        "kata-peta",
        "PETA TINDAKAN",
        "APA YANG DILIHAT → KENAL PASTI KIASAN → TAFSIR MAKSUD → CARI NASIHAT → BENTUK JAWAPAN.",
      ),
      node("kata-core", "CORE", "LITERAL → TERSIRAT → MESEJ."),
      node(
        "kata-rangkap",
        "17 RANGKAP — KUMPULAN IDEA",
        "JIMAT + RENDAH DIRI + KEMAMPUAN + SABAR + ILMU + USAHA + INSAF + BUDI.",
      ),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node(
        "jawab-maksud",
        "Soalan Maksud",
        "MAKSUD TERSIRAT + BAHASA SENDIRI. Jangan berhenti pada gambaran permukaan.",
      ),
      node("jawab-kiasan", "Soalan Kiasan", "OBJEK / GAMBARAN + APA YANG DIWAKILI + MESEJ."),
      node("jawab-tema", "Tema", "TEMA + DUA MESEJ SOKONGAN."),
      node("jawab-persoalan", "Persoalan", "PERSOALAN + RANGKAP / MAKSUD KIASAN SOKONGAN."),
      node("jawab-nilai", "Nilai", "NILAI + HURAIAN BERDASARKAN SIKAP ATAU TINDAKAN."),
      node(
        "jawab-pengajaran",
        "Pengajaran",
        "Mulakan dengan ‘Kita hendaklah...’ + tindakan yang disokong oleh pantun.",
      ),
      node(
        "jawab-bentuk",
        "Bentuk",
        "CIRI + BUKTI STRUKTUR. Contoh: empat kerat kerana setiap rangkap mempunyai empat baris.",
      ),
      node("jawab-gaya", "Gaya Bahasa", "TEKNIK + CONTOH PENDEK YANG DISAHKAN + KESAN."),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "salah-literal",
        "Mentafsir Secara Literal",
        "Imej permukaan bukan semestinya mesej sebenar. Cari sikap atau nasihat yang diwakilinya.",
      ),
      node(
        "salah-semua-simbol",
        "Semua Objek Dianggap Simbol",
        "Tidak setiap kata nama bersifat simbolik. Gunakan fungsi kata dan konteks keseluruhan rangkap.",
      ),
      node(
        "salah-tema",
        "Tema = Bahasa Kiasan",
        "Bahasa kiasan ialah teknik penyampaian. Tema karya ialah sindiran terhadap sikap negatif manusia.",
      ),
      node(
        "salah-konteks",
        "Meneka Maksud Tanpa Konteks",
        "Baca pembayang dan maksud sebagai satu rangkap sebelum membuat tafsiran.",
      ),
      node(
        "salah-pembayang",
        "Pembayang Dijadikan Isi Utama",
        "Pembayang membina imej dan bunyi; dua baris akhir membawa mesej utama.",
      ),
      node(
        "salah-nilai",
        "Nilai = Pengajaran",
        "Nilai: kebijaksanaan. Pengajaran: Kita hendaklah bijak membuat keputusan.",
      ),
      node(
        "salah-terlalu-jauh",
        "Cipta Maksud Kiasan Terlalu Jauh",
        "Pastikan maksud tersirat selari dengan konteks dan analisis yang diterima.",
      ),
      node(
        "salah-gaya",
        "Gaya Bahasa Direka",
        "Gunakan teknik dan contoh pendek yang benar-benar terdapat dalam pantun.",
      ),
      node(
        "salah-salin",
        "Menyalin Keseluruhan Rangkap",
        "Jawab dengan parafrasa dan bukti ringkas; jangan menyalin puisi secara penuh.",
      ),
      node(
        "salah-rangkap",
        "Bilangan Rangkap Salah",
        "Pantun Kiasan mempunyai 17 rangkap, bukan tujuh rangkap seperti beberapa pantun lain dalam antologi.",
      ),
    ]),
  ],
};
