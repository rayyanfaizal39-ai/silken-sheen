import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-pantun-dua-kerat-nasihat";

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

function supported(id: string, label: string, explanation: string, support: string): MindNode {
  return branch(id, label, [
    node(`${id}-huraian`, "Huraian", explanation),
    node(`${id}-sokongan`, "Pantun / Idea Sokongan", support),
  ]);
}

export const bahasaMelayuTingkatan1PantunDuaKeratNasihatMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "PANTUN DUA KERAT",
  summary:
    "Pantun dua kerat menyampaikan nasihat secara ringkas dan berirama tentang kehidupan, sikap manusia dan kepentingan melakukan perkara yang baik.",
  children: [
    branch("pengenalan", "Apa Itu Pantun Dua Kerat?", [
      node(
        "pengenalan-definisi",
        "Definisi",
        "Pantun dua kerat ialah pantun yang mempunyai dua baris dalam setiap rangkap.",
      ),
      node(
        "pengenalan-struktur",
        "Struktur Umum",
        "Baris pertama berfungsi sebagai pembayang, manakala baris kedua membawa maksud atau nasihat utama.",
      ),
      node(
        "pengenalan-padatan",
        "Idea Lengkap dan Ringkas",
        "Walaupun hanya dua baris, setiap rangkap menyampaikan satu idea atau teguran yang lengkap.",
      ),
      node(
        "pengenalan-konteks",
        "Baca sebagai Satu Pasangan",
        "Pembayang dan maksud perlu dibaca bersama mengikut konteks rangkap; jangan memaksa setiap perkataan dalam pembayang mempunyai padanan makna secara langsung.",
      ),
    ]),
    branch("maksud-pantun", "Maksud Pantun", [
      node(
        "maksud-1",
        "Pantun 1 — Sikap Tercermin melalui Perbuatan",
        "Perbuatan dan tingkah laku seseorang berkait rapat dengan sifat, cara berfikir serta keputusan yang dibuat. Oleh itu, seseorang hendaklah berhati-hati dalam setiap tindakan.",
      ),
      node(
        "maksud-2",
        "Pantun 2 — Sikap Leka dan Malas Merugikan",
        "Orang yang suka tidur, leka dan tidak mahu melakukan pekerjaan akan menjadi malas serta sukar mencapai kemajuan.",
      ),
      node(
        "maksud-3",
        "Pantun 3 — Setiap Insan Mempunyai Kelebihan",
        "Kekurangan pada rupa luaran tidak bermakna seseorang tiada keistimewaan. Penilaian hendaklah dibuat secara rasional dengan melihat kelebihan dalaman.",
      ),
      node(
        "maksud-4",
        "Pantun 4 — Usaha Membawa Hasil",
        "Seseorang yang malas berusaha atau berikhtiar tidak akan memperoleh hasil dan kesenangan hidup.",
      ),
      node(
        "maksud-5",
        "Pantun 5 — Kerjasama Memudahkan Pekerjaan",
        "Semangat bekerjasama dan saling membantu membolehkan sesuatu pekerjaan dilaksanakan dengan lebih mudah serta berkesan.",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "NASIHAT UNTUK MEMBENTUK SIKAP DAN TINGKAH LAKU YANG BAIK", [
        node(
          "tema-huraian",
          "Huraian",
          "Pantun-pantun ini memberikan panduan supaya manusia menjaga tingkah laku, menjauhi kemalasan, menilai orang secara rasional, rajin berusaha dan bekerjasama.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema Pantun Dua Kerat (Nasihat) ialah nasihat untuk membentuk sikap dan tingkah laku yang baik dalam kehidupan.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      supported(
        "persoalan-sifat",
        "Sikap Tercermin melalui Perbuatan",
        "Tindakan seseorang menggambarkan sifat dan cara pemikirannya.",
        "Pantun 1 menghubungkan perbuatan serta tingkah laku dengan sifat seseorang.",
      ),
      supported(
        "persoalan-malas",
        "Keburukan Sikap Malas dan Leka",
        "Kemalasan serta sikap leka menghalang seseorang daripada maju.",
        "Pantun 2 menegur orang yang suka tidur, manakala Pantun 4 menunjukkan bahawa orang malas tidak memperoleh hasil.",
      ),
      supported(
        "persoalan-kelebihan",
        "Kelebihan Setiap Insan",
        "Seseorang tidak patut dinilai berdasarkan kekurangan luaran semata-mata.",
        "Pantun 3 menegaskan bahawa sesuatu yang kelihatan kurang menarik masih mempunyai keistimewaan.",
      ),
      supported(
        "persoalan-usaha",
        "Kepentingan Rajin Berusaha",
        "Usaha dan ikhtiar diperlukan untuk memperoleh hasil.",
        "Pantun 4 mengaitkan kemalasan dengan kegagalan menikmati hasil kehidupan.",
      ),
      supported(
        "persoalan-kerjasama",
        "Kepentingan Kerjasama",
        "Muafakat dan tolong-menolong memudahkan penyelesaian sesuatu tugas.",
        "Pantun 5 menggambarkan pembahagian peranan ketika memikul sesuatu beban.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node(
        "bentuk-identiti",
        "Identiti Karya",
        "Pantun Dua Kerat (Nasihat) ialah puisi tradisional dalam antologi Kuingin Berterima Kasih.",
      ),
      node(
        "bentuk-rangkap",
        "Lima Rangkap",
        "Bahagian yang ditetapkan dalam antologi mengandungi lima rangkap.",
      ),
      node("bentuk-baris", "Dua Baris Setiap Rangkap", "Kesemua rangkap mempunyai dua baris."),
      node(
        "bentuk-pembayang",
        "Pembayang dan Maksud",
        "Secara umum, baris pertama ialah pembayang dan baris kedua ialah maksud. Kedua-duanya membentuk satu rangkap yang lengkap.",
      ),
      node(
        "bentuk-kata",
        "Tiga hingga Lima Patah Kata",
        "Bilangan perkataan dalam baris-baris pantun ini berubah antara tiga hingga lima patah kata.",
      ),
      node(
        "bentuk-rima",
        "Rima Akhir aa",
        "Rima akhir bagi setiap rangkap adalah sama, iaitu aa. Pantun ini berbentuk terikat.",
      ),
      node(
        "bentuk-sempadan",
        "Had Analisis Bentuk",
        "Bilangan suku kata tidak dipaparkan untuk mengelakkan pertikaian kiraan sebutan. Fokus diberikan pada ciri yang konsisten dan disahkan.",
      ),
    ]),
    branch("ciri-pantun", "Ciri Pantun", [
      node(
        "ciri-pembayang",
        "Pembayang",
        "Memperkenalkan imej, bunyi atau ungkapan yang membina rangkap.",
      ),
      node("ciri-maksud", "Maksud", "Menyampaikan mesej, teguran atau nasihat utama rangkap."),
      node(
        "ciri-irama",
        "Irama",
        "Rima dan susunan bunyi menjadikan pantun sedap didengar serta mudah diingati.",
      ),
      node(
        "ciri-padat",
        "Bahasa Padat",
        "Ungkapan yang pendek membawa makna kehidupan yang lebih luas.",
      ),
      node(
        "ciri-nasihat",
        "Unsur Nasihat",
        "Pantun membimbing pembaca supaya membentuk sikap dan amalan yang baik.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      branch("gaya-imej-alam", "Imej Alam", [
        node(
          "gaya-imej-alam-bukti",
          "Contoh Ringkas",
          "‘pucuk kawa’, ‘buah sintang’ dan ‘buah senikul’.",
        ),
        node(
          "gaya-imej-alam-fungsi",
          "Fungsi",
          "Unsur alam membentuk pembayang yang konkrit dan mudah dibayangkan.",
        ),
      ]),
      branch("gaya-repetisi", "Repetisi", [
        node("gaya-repetisi-bukti", "Contoh Ringkas", "‘Satu memegang satu memikul’."),
        node(
          "gaya-repetisi-fungsi",
          "Fungsi",
          "Pengulangan menegaskan pembahagian peranan dan semangat kerjasama.",
        ),
      ]),
      branch("gaya-bahasa-arab", "Bahasa Arab", [
        node("gaya-bahasa-arab-bukti", "Contoh Ringkas", "‘wujud’ dan ‘sifat’."),
        node("gaya-bahasa-arab-fungsi", "Fungsi", "Kata pinjaman memperkaya kosa kata pantun."),
      ]),
      branch("gaya-asonansi", "Asonansi", [
        node("gaya-asonansi-bukti", "Contoh Ringkas", "‘Malas bergerak tidak merasa’."),
        node("gaya-asonansi-fungsi", "Fungsi", "Pengulangan bunyi vokal menghasilkan kemerduan."),
      ]),
      branch("gaya-aliterasi", "Aliterasi", [
        node("gaya-aliterasi-bukti", "Contoh Ringkas", "‘Sarang semut dalam gelap’."),
        node(
          "gaya-aliterasi-fungsi",
          "Fungsi",
          "Pengulangan bunyi konsonan menguatkan irama pantun.",
        ),
      ]),
      branch("gaya-responsi", "Responsi", [
        node(
          "gaya-responsi-bukti",
          "Bukti",
          "Pantun 1 menggunakan kata yang saling menyahut pada kedudukan yang sepadan dalam kedua-dua baris.",
        ),
        node(
          "gaya-responsi-fungsi",
          "Fungsi",
          "Struktur seimbang mengikat pembayang dengan maksud.",
        ),
      ]),
      branch("gaya-paradoks", "Paradoks", [
        node("gaya-paradoks-bukti", "Contoh Ringkas", "‘hitam dipandang lawa’."),
        node(
          "gaya-paradoks-fungsi",
          "Fungsi",
          "Pertentangan yang kelihatan pada permukaan menegaskan bahawa kekurangan luaran tidak menafikan keistimewaan.",
        ),
      ]),
      node(
        "gaya-amaran",
        "Had Petikan",
        "Gunakan hanya contoh pendek yang disahkan. Jangan menyalin keseluruhan rangkap atau mereka-reka baris pantun.",
      ),
    ]),
    branch("nilai", "Nilai", [
      supported(
        "nilai-berhati-hati",
        "Berhati-hati",
        "Seseorang meneliti tindakan kerana tingkah laku mencerminkan peribadi.",
        "Mesej Pantun 1 menghubungkan perbuatan dengan sifat seseorang.",
      ),
      supported(
        "nilai-kerajinan",
        "Kerajinan",
        "Seseorang rajin berusaha untuk mendapatkan hasil dan memperbaiki kehidupan.",
        "Pantun 2 dan Pantun 4 menegur sifat leka serta malas.",
      ),
      supported(
        "nilai-rasional",
        "Rasional",
        "Seseorang menilai orang lain berdasarkan kelebihan, bukan rupa luaran semata-mata.",
        "Pantun 3 mengingatkan bahawa setiap insan mempunyai keistimewaan.",
      ),
      supported(
        "nilai-kerjasama",
        "Kerjasama",
        "Seseorang saling membantu dan berkongsi tanggungjawab untuk menyiapkan tugas.",
        "Pantun 5 menggambarkan dua pihak memainkan peranan dalam memikul beban.",
      ),
      supported(
        "nilai-tanggungjawab",
        "Tanggungjawab",
        "Seseorang bertanggungjawab terhadap sikap, usaha dan peranannya dalam kumpulan.",
        "Pantun 1, Pantun 4 dan Pantun 5 menekankan tindakan diri serta pembahagian peranan.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-tingkah-laku",
        "Kita Hendaklah Menjaga Tingkah Laku",
        "Perbuatan yang baik mencerminkan sifat dan pemikiran yang baik.",
      ),
      node(
        "pengajaran-malas",
        "Kita Tidak Sewajarnya Bersikap Malas",
        "Sikap suka tidur, leka dan tidak mahu bekerja akan merugikan diri.",
      ),
      node(
        "pengajaran-rasional",
        "Kita Hendaklah Menilai Orang Secara Rasional",
        "Jangan menilai seseorang berdasarkan kekurangan atau rupa luaran sahaja.",
      ),
      node(
        "pengajaran-usaha",
        "Kita Hendaklah Rajin Berusaha",
        "Usaha dan ikhtiar diperlukan untuk memperoleh hasil serta kesenangan hidup.",
      ),
      node(
        "pengajaran-kerjasama",
        "Kita Hendaklah Bekerjasama",
        "Semangat muafakat dan tolong-menolong memudahkan sesuatu pekerjaan.",
      ),
    ]),
    branch("nada", "Nada", [
      node(
        "nada-nasihat",
        "NASIHAT — NADA UTAMA",
        "Pantun membimbing pembaca supaya mengamalkan sikap yang baik dan menjauhi tabiat yang merugikan.",
      ),
      node(
        "nada-tegas",
        "TEGAS DAN SINIS — KESAN SAMPINGAN",
        "Teguran terhadap sikap leka serta malas disampaikan dengan tegas dan kadangkala bernada sinis.",
      ),
      node(
        "nada-beza",
        "Tidak Bercanggah",
        "Nasihat ialah tujuan keseluruhan karya, manakala tegas atau sinis menerangkan cara sesetengah teguran disampaikan.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node("kata-1", "Pantun 1 — SIFAT", "Tingkah laku mencerminkan peribadi."),
      node(
        "kata-2",
        "Pantun 2 — ELAK LALAI",
        "Tidur berlebihan dan kemalasan menghalang kemajuan.",
      ),
      node("kata-3", "Pantun 3 — KELEBIHAN", "Setiap insan mempunyai keistimewaan."),
      node("kata-4", "Pantun 4 — USAHA", "Kerajinan dan ikhtiar membawa hasil."),
      node("kata-5", "Pantun 5 — KERJASAMA", "Muafakat memudahkan pekerjaan."),
      node(
        "kata-aliran",
        "LIMA NASIHAT",
        "JAGA SIKAP → ELAK MALAS → NILAI KELEBIHAN → RAJIN BERUSAHA → BEKERJASAMA.",
      ),
      node(
        "kata-peta",
        "PANTUN DUA KERAT — PETA INGATAN",
        "PEMBAYANG → MAKSUD → NASIHAT → NILAI → PENGAJARAN.",
      ),
      node("kata-teras", "AMALAN TERAS", "FIKIR + BERSIKAP + BERTINDAK DENGAN BAIK."),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node(
        "jawab-maksud",
        "Maksud Pantun",
        "NASIHAT + PARAFRASA. Jangan salin rangkap bulat-bulat.",
      ),
      node("jawab-tema", "Tema", "TEMA + DUA IDEA SOKONGAN."),
      node("jawab-persoalan", "Persoalan", "PERSOALAN + PANTUN SOKONGAN."),
      node("jawab-nilai", "Nilai", "NILAI + HURAIAN."),
      node(
        "jawab-pengajaran",
        "Pengajaran",
        "Mulakan dengan ‘Kita hendaklah...’ + tindakan yang sesuai.",
      ),
      node(
        "jawab-bentuk",
        "Bentuk",
        "CIRI + BUKTI. Contoh: dua kerat kerana setiap rangkap mempunyai dua baris.",
      ),
      node("jawab-gaya", "Gaya Bahasa", "TEKNIK + CONTOH PENDEK YANG DISAHKAN + FUNGSI."),
      node(
        "jawab-pembayang-maksud",
        "Pembayang atau Maksud?",
        "Kenal pasti kedudukan baris, kemudian terangkan fungsi dan mesejnya mengikut konteks rangkap.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-tema",
        "Tema = Nasihat Sahaja",
        "Jawapan itu terlalu umum. Nyatakan nasihat untuk membentuk sikap dan tingkah laku yang baik.",
      ),
      node(
        "kesalahan-salin",
        "Maksud Pantun Disalin",
        "Terangkan mesej rangkap dengan bahasa sendiri tanpa menyalin kedua-dua baris.",
      ),
      node(
        "kesalahan-pembayang",
        "Pembayang = Maksud",
        "Pembayang membina imej dan bunyi, manakala maksud menyampaikan nasihat utama.",
      ),
      node(
        "kesalahan-nilai",
        "Nilai = Pengajaran",
        "Nilai: kerajinan. Pengajaran: Kita hendaklah rajin berusaha.",
      ),
      node(
        "kesalahan-anggap-pembayang",
        "Anggap Pembayang Tidak Penting",
        "Pembayang menyumbang kepada bentuk, rima, irama dan imej pantun.",
      ),
      node(
        "kesalahan-cipta-maksud",
        "Cipta Maksud yang Tiada",
        "Tafsir berdasarkan konteks lima rangkap sebenar, bukan berdasarkan pantun latihan lain.",
      ),
      node(
        "kesalahan-bilangan",
        "Menggunakan Tiga Pantun Latihan",
        "Bahagian antologi yang ditetapkan mempunyai lima rangkap. Jangan gantikan dengan tiga rangkap daripada bahan latihan projek.",
      ),
      node(
        "kesalahan-ilmu-tutur",
        "Memasukkan Tema yang Tidak Disokong",
        "Set ini tidak secara khusus membincangkan kepentingan ilmu atau menjaga tutur kata. Gunakan mesej lima rangkap yang disahkan.",
      ),
      node(
        "kesalahan-gaya",
        "Gaya Bahasa Direka",
        "Jangan menambah simile, metafora atau personifikasi tanpa bukti daripada pantun ini.",
      ),
      node(
        "kesalahan-petikan",
        "Petikan Direka",
        "Gunakan hanya contoh pendek yang telah disahkan dan jangan mencipta baris pantun.",
      ),
    ]),
  ],
};
