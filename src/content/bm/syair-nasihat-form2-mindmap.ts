import type { MindNode } from "@/components/MindMap";

// Content checked against the prescribed extract reproduced by Penerbitan Pelangi,
// Sasbadi's KOMSAS notes, and the UPSI repository copy of Puisi-puisi Raja Ali Haji.
const PREFIX = "bm-f2-syair-nasihat";

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
    node(`${id}-sokongan`, "Rangkap / Idea Sokongan", support),
  ]);
}

function stanza(number: number, meaning: string, advice: string, keyword: string): MindNode {
  return branch(`maksud-rangkap-${number}`, `Rangkap ${number}`, [
    node(`maksud-rangkap-${number}-mudah`, "Maksud Mudah", meaning),
    node(`maksud-rangkap-${number}-nasihat`, "Nasihat Utama", advice),
    node(`maksud-rangkap-${number}-kata`, "Kata Kunci", keyword),
  ]);
}

export const bahasaMelayuTingkatan2SyairNasihatMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "SYAIR NASIHAT",
  summary:
    "Penghujung Thamarat al-Muhimmah menyampaikan nasihat seorang bapa kepada anaknya agar menjadi pemimpin yang amanah, adil, bijaksana, berilmu dan bertanggungjawab ketika menjalankan pemerintahan.",
  children: [
    branch("maksud-rangkap", "Maksud Rangkap", [
      stanza(
        1,
        "Penyair menyatakan bahawa kitabnya telah selesai dikarang walaupun dia merendah diri tentang akal dan ilmunya.",
        "Sampaikan panduan dengan bersungguh-sungguh walaupun menyedari kekurangan diri.",
        "KITAB • RENDAH DIRI",
      ),
      stanza(
        2,
        "Ayah meluahkan nasihat yang terpendam dengan harapan anak-anaknya membetulkan tingkah laku dan berakhlak baik.",
        "Pelihara tingkah laku dan budi pekerti.",
        "AKHLAK",
      ),
      stanza(
        3,
        "Ayah meminta anaknya yang masih muda mendengar, mengamalkan nasihat kebajikan dan menjauhi sikap malas serta takut.",
        "Dengar pesan yang baik dan rajin mengamalkannya.",
        "NASIHAT",
      ),
      stanza(
        4,
        "Jika anaknya menjadi raja, dia hendaklah berhati benar dan rajin menjalankan tugas pemerintahan.",
        "Kepimpinan ialah tanggungjawab, bukan kuasa semata-mata.",
        "PEMIMPIN",
      ),
      stanza(
        5,
        "Anaknya hendaklah rajin berbuat kebajikan serta menjaga keikhlasan zahir dan batin.",
        "Laksanakan kebajikan dengan hati yang bersih dan ikhlas.",
        "IKHLAS",
      ),
      stanza(
        6,
        "Anaknya tidak harus segan menuntut ilmu yang benar dan bermanfaat seperti yang dijelaskan dalam kitab.",
        "Tuntut ilmu yang benar, bukan ilmu yang menyesatkan.",
        "ILMU BENAR",
      ),
      stanza(
        7,
        "Anaknya perlu mengutamakan pengajian dan tidak melampaui hukum syarak agar terpelihara daripada aib.",
        "Utamakan ilmu dan patuhi batas agama.",
        "SYARAK",
      ),
      stanza(
        8,
        "Setiap tindakan perlu berasaskan ilmu supaya membawa kebajikan; tindakan sembarangan akhirnya mendatangkan kesusahan.",
        "Fikir dan gunakan ilmu sebelum bertindak.",
        "ILMU • TINDAKAN",
      ),
      stanza(
        9,
        "Ilmu membolehkan pemimpin membezakan kebenaran daripada kebatilan serta mengadili rakyat dengan adil.",
        "Gunakan ilmu untuk membuat pengadilan yang benar dan tidak berat sebelah.",
        "ADIL",
      ),
      stanza(
        10,
        "Pemimpin yang memandang ringan ilmu akan kebingungan apabila rakyat datang membawa masalah.",
        "Jangan meremehkan ilmu yang diperlukan untuk menyelesaikan masalah rakyat.",
        "JANGAN ABAI ILMU",
      ),
      stanza(
        11,
        "Tanpa ilmu, pemimpin tidak tahu menjatuhkan hukuman tetapi tidak pula mampu berdiam diri, lalu hanya mengeluh dan memohon pertolongan Allah.",
        "Lengkapkan diri dengan ilmu sebelum memikul kuasa pengadilan.",
        "BUNTU TANPA ILMU",
      ),
      stanza(
        12,
        "Pemimpin yang tidak berilmu akhirnya terdiam, gelisah dan kembali bersembunyi di dalam istana tanpa menyelesaikan urusan.",
        "Jangan mengelak daripada tanggungjawab kepimpinan.",
        "TANGGUNGJAWAB",
      ),
      stanza(
        13,
        "Rakyat yang menuntut pengadilan terus menunggu dan berasa sakit hati kerana keputusan masih tidak pasti.",
        "Urus aduan rakyat dengan cekap, teliti dan pasti.",
        "RAKYAT MENANTI",
      ),
      stanza(
        14,
        "Ada kalanya hukuman dibuat secara tidak berlandaskan hukum syarak atau adat kerana pemimpin mahu mengambil jalan mudah.",
        "Siasat, pertimbangkan dasar yang benar dan jangan menghukum sesuka hati.",
        "JANGAN TERBURU-BURU",
      ),
      stanza(
        15,
        "Hukuman yang tidak mengikut jalan yang betul mungkin diterima di hadapan pemimpin tetapi akan dicela di belakangnya.",
        "Tegakkan keputusan yang adil supaya kepercayaan rakyat terpelihara.",
        "HUKUM YANG BETUL",
      ),
      stanza(
        16,
        "Apabila hukuman yang benar telah dibuat, pemimpin tidak perlu terpengaruh oleh pujian atau umpatan dan hendaklah menyerahkan penilaian kepada Allah.",
        "Berpegang pada kebenaran, bukan tekanan atau pujian manusia.",
        "TEGUH PADA BENAR",
      ),
      stanza(
        17,
        "Jika anaknya menjadi menteri, dia hendaklah mendampingi dan bermesyuarat dengan orang berilmu supaya urusan berjalan dengan baik.",
        "Dapatkan pandangan orang berilmu sebelum membuat keputusan.",
        "MUSYAWARAH",
      ),
      stanza(
        18,
        "Seorang ketua hendaklah meneliti perilaku wazir dan menjauhkan perbuatan mungkir agar tidak tergelincir daripada amanah.",
        "Pantau pegawai bawahan dan cegah penyelewengan.",
        "PERIKSA PEGAWAI",
      ),
      node(
        "maksud-had",
        "Parafrasa, Bukan Salinan",
        "Kesemua 18 rangkap diterangkan dengan bahasa moden tanpa menghasilkan semula syair penuh.",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "NASIHAT TENTANG TANGGUNGJAWAB SEORANG PEMIMPIN", [
        node(
          "tema-huraian",
          "Huraian",
          "Seorang bapa menasihati anaknya supaya menuntut ilmu dan memimpin dengan benar, rajin, ikhlas serta adil apabila dilantik sebagai raja atau menteri.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema Syair Nasihat ialah nasihat tentang tanggungjawab seorang pemimpin. Seorang pemimpin hendaklah berilmu, amanah, adil dan bijaksana ketika menjalankan pemerintahan.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      supported(
        "persoalan-pemimpin",
        "Tanggungjawab Seorang Pemimpin",
        "Jawatan membawa tugas yang perlu dilaksanakan dengan rajin dan hati yang benar.",
        "Rangkap 4 mengingatkan bakal raja supaya rajin bekerja dan bertindak dengan betul.",
      ),
      supported(
        "persoalan-ilmu",
        "Kepentingan Ilmu",
        "Ilmu membimbing tindakan, pengadilan dan penyelesaian masalah rakyat.",
        "Rangkap 6 hingga 11 menunjukkan manfaat ilmu serta akibat mengabaikannya.",
      ),
      supported(
        "persoalan-ikhlas",
        "Keikhlasan dalam Kebajikan",
        "Kebajikan perlu dilakukan dengan hati yang bersih tanpa sikap culas.",
        "Rangkap 5 menghubungkan kerja kebajikan dengan keikhlasan zahir dan batin.",
      ),
      supported(
        "persoalan-adil",
        "Kepentingan Keadilan",
        "Pemimpin perlu membezakan yang benar daripada yang salah sebelum menjatuhkan hukuman.",
        "Rangkap 9, 14 hingga 16 menekankan pengadilan yang benar dan adil.",
      ),
      supported(
        "persoalan-musyarawah",
        "Kebijaksanaan Bermesyuarat",
        "Pemimpin wajar mendapatkan pandangan orang berilmu agar urusan dapat dilaksanakan dengan baik.",
        "Rangkap 17 menyarankan menteri mendampingi orang berilmu dan bermesyuarat.",
      ),
      supported(
        "persoalan-rakyat",
        "Kebajikan dan Aduan Rakyat",
        "Kelemahan membuat keputusan menyebabkan rakyat menunggu dan hilang kepercayaan.",
        "Rangkap 10 hingga 13 menggambarkan kesukaran rakyat apabila pemimpin tidak berilmu.",
      ),
      supported(
        "persoalan-pegawai",
        "Pemantauan Pegawai",
        "Ketua perlu memastikan pembantunya amanah dan tidak menyeleweng.",
        "Rangkap 18 meminta pemimpin meneliti perilaku wazir dan menjauhkan kemungkaran.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node(
        "bentuk-rangkap",
        "18 Rangkap",
        "Petikan yang ditetapkan mengandungi lapan belas rangkap.",
      ),
      node(
        "bentuk-baris",
        "Empat Baris Serangkap",
        "Setiap rangkap mempunyai empat baris; kesemua 72 baris menyumbang kepada maksud.",
      ),
      node(
        "bentuk-kata",
        "Tiga hingga Enam Patah Kata",
        "Setiap baris mengandungi antara tiga hingga enam patah kata.",
      ),
      node(
        "bentuk-suku",
        "Lapan hingga Empat Belas Suku Kata",
        "Setiap baris mengandungi antara lapan hingga empat belas suku kata.",
      ),
      node(
        "bentuk-rima",
        "Rima Akhir aaaa",
        "Keempat-empat baris bagi setiap satu daripada 18 rangkap mempunyai bunyi akhir yang sama.",
      ),
      node(
        "bentuk-terikat",
        "Bentuk Terikat",
        "Bilangan baris dan pola rima yang tetap menjadikan syair ini puisi terikat.",
      ),
    ]),
    branch("ciri-syair", "Ciri Syair", [
      node(
        "ciri-tiada-pembayang",
        "Tiada Pembayang",
        "Semua baris membawa maksud; syair tidak dibahagikan kepada pembayang dan maksud seperti pantun.",
      ),
      node("ciri-empat-baris", "Empat Baris", "Setiap rangkap dibina daripada empat baris."),
      node(
        "ciri-berterusan",
        "Nasihat Berterusan",
        "Idea berkembang daripada pembentukan akhlak dan ilmu kepada pengadilan, urusan rakyat serta pemantauan pegawai.",
      ),
      node(
        "ciri-padat",
        "Bahasa Padat",
        "Nasihat tentang pemerintahan disampaikan secara ringkas dan berirama.",
      ),
      node(
        "ciri-rima",
        "Rima Teratur",
        "Pola aaaa pada setiap rangkap menghasilkan irama yang konsisten.",
      ),
      node(
        "ciri-nasihat",
        "Berbentuk Nasihat",
        "Seorang bapa memberikan panduan kepimpinan kepada anaknya.",
      ),
      node(
        "ciri-perbandingan",
        "Pantun vs Syair",
        "PANTUN: empat baris, pembayang + maksud, idea biasanya lengkap dalam rangkap. SYAIR: empat baris, semua baris membawa maksud, dan nasihat boleh bersambung antara rangkap.",
      ),
      node(
        "ciri-sumber",
        "Pengarang dan Sumber",
        "Karya Raja Ali Haji; petikan daripada Puisi-puisi Raja Ali Haji yang diselenggarakan oleh Abu Hassan Sham pada tahun 1993 dan dipreskripsikan dalam antologi Baik Budi, Indah Bahasa, Tingkatan 2.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      branch("gaya-inversi", "Inversi", [
        node("gaya-inversi-bukti", "Contoh Ringkas", "‘nasihat kebajikan ayahanda beri’"),
        node(
          "gaya-inversi-kesan",
          "Kesan",
          "Susunan songsang mengekalkan rima dan menegaskan nasihat ayahanda.",
        ),
      ]),
      branch("gaya-anafora", "Anafora", [
        node(
          "gaya-anafora-bukti",
          "Contoh Ringkas",
          "Pengulangan ‘Hendak’ pada awal dua baris dalam Rangkap 11.",
        ),
        node(
          "gaya-anafora-kesan",
          "Kesan",
          "Pengulangan menegaskan kebuntuan pemimpin yang tidak berilmu.",
        ),
      ]),
      branch("gaya-simile", "Simile", [
        node("gaya-simile-bukti", "Contoh Ringkas", "‘seperti air di dalam gelas’"),
        node(
          "gaya-simile-kesan",
          "Kesan",
          "Perbandingan menjelaskan kejernihan dan keikhlasan hati.",
        ),
      ]),
      branch("gaya-sinkope", "Sinkope", [
        node(
          "gaya-sinkope-bukti",
          "Contoh Ringkas",
          "Kata singkat ‘tak’ digunakan dalam Rangkap 11.",
        ),
        node(
          "gaya-sinkope-kesan",
          "Kesan",
          "Bentuk singkat membantu kepadatan dan kelancaran irama.",
        ),
      ]),
      branch("gaya-klasik", "Bahasa Klasik", [
        node("gaya-klasik-bukti", "Contoh Ringkas", "Kata ‘puri’, ‘wazir’ dan ‘ugahari’."),
        node("gaya-klasik-kesan", "Kesan", "Diksi menampilkan latar pemerintahan dan zaman karya."),
      ]),
      branch("gaya-arab", "Bahasa Arab", [
        node("gaya-arab-bukti", "Contoh Ringkas", "Kata ‘syarak’, ‘batil’ dan ‘Allahu’."),
        node(
          "gaya-arab-kesan",
          "Kesan",
          "Istilah memperkukuh dasar agama dalam nasihat dan pengadilan.",
        ),
      ]),
      branch("gaya-asonansi", "Asonansi", [
        node(
          "gaya-asonansi-bukti",
          "Bukti Bunyi",
          "Pengulangan vokal a dalam frasa ringkas ‘anakanda muda remaja’.",
        ),
        node("gaya-asonansi-kesan", "Kesan", "Pengulangan vokal menghasilkan kemerduan bunyi."),
      ]),
      branch("gaya-aliterasi", "Aliterasi", [
        node(
          "gaya-aliterasi-bukti",
          "Bukti Bunyi",
          "Pengulangan konsonan m dalam frasa ‘maka kebajikan boleh bertemu’.",
        ),
        node("gaya-aliterasi-kesan", "Kesan", "Pengulangan konsonan menguatkan irama baris."),
      ]),
    ]),
    branch("nasihat-kepimpinan", "Nasihat Kepimpinan", [
      node(
        "kepimpinan-amanah",
        "Amanah",
        "Gunakan jawatan dengan jujur dan jauhkan penyelewengan.",
      ),
      node(
        "kepimpinan-adil",
        "Adil",
        "Bezakan yang benar daripada yang salah dan jangan berat sebelah.",
      ),
      node(
        "kepimpinan-ilmu",
        "Berilmu",
        "Ilmu membimbing pertimbangan, pengadilan dan penyelesaian masalah.",
      ),
      node(
        "kepimpinan-bijak",
        "Bijaksana",
        "Pertimbangkan hukum, bukti dan akibat sebelum bertindak.",
      ),
      node(
        "kepimpinan-teliti",
        "Teliti",
        "Jangan mengambil jalan mudah ketika menghukum atau memantau pegawai.",
      ),
      node(
        "kepimpinan-tanggungjawab",
        "Bertanggungjawab",
        "Jawatan ialah tugas yang perlu dilaksanakan, bukan sekadar kedudukan.",
      ),
      node(
        "kepimpinan-rakyat",
        "Menjaga Rakyat",
        "Selesaikan aduan dan pelihara keadilan serta kebajikan rakyat.",
      ),
      node(
        "kepimpinan-formula",
        "Formula Pemimpin Baik",
        "KUASA + AMANAH + ILMU + ADIL = KEPIMPINAN BAIK.",
      ),
    ]),
    branch("nilai", "Nilai", [
      supported(
        "nilai-amanah",
        "Amanah",
        "Tanggungjawab dilaksanakan dengan jujur tanpa penyelewengan.",
        "Rangkap 4 dan 18 menekankan tugas pemimpin serta pemantauan wazir.",
      ),
      supported(
        "nilai-adil",
        "Keadilan",
        "Keputusan dibuat secara benar dan tidak berat sebelah.",
        "Rangkap 9 dan 14 hingga 16 menekankan pengadilan yang betul.",
      ),
      supported(
        "nilai-bijak",
        "Kebijaksanaan",
        "Ilmu dan musyawarah digunakan untuk membuat pertimbangan yang baik.",
        "Rangkap 8, 9 dan 17 menghubungkan ilmu dengan tindakan serta perundingan.",
      ),
      supported(
        "nilai-rajin",
        "Kerajinan",
        "Tugas, kebajikan dan pengajian dilaksanakan tanpa sikap malas.",
        "Rangkap 3 hingga 7 mengulang tuntutan supaya rajin bekerja dan belajar.",
      ),
      supported(
        "nilai-ikhlas",
        "Keikhlasan",
        "Kebajikan dilaksanakan dengan hati yang bersih.",
        "Rangkap 5 menekankan keikhlasan zahir dan batin.",
      ),
      supported(
        "nilai-rasional",
        "Rasional",
        "Pemimpin menggunakan ilmu dan dasar yang benar sebelum membuat keputusan.",
        "Rangkap 8, 9 dan 14 menolak tindakan sembarangan serta jalan mudah.",
      ),
      supported(
        "nilai-kasih",
        "Kasih Sayang",
        "Bapa membimbing anak kerana mengambil berat tentang akhlak dan masa depannya.",
        "Rangkap 2 dan 3 menyampaikan pengajaran ayah kepada anak-anaknya.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-amanah",
        "Kita Hendaklah Menjalankan Amanah dengan Jujur",
        "Gunakan kuasa dengan betul dan cegah penyelewengan.",
      ),
      node(
        "pengajaran-adil",
        "Kita Hendaklah Berlaku Adil",
        "Bezakan perkara benar dan salah sebelum menjatuhkan hukuman.",
      ),
      node(
        "pengajaran-ilmu",
        "Kita Hendaklah Menuntut Ilmu",
        "Ilmu yang benar membolehkan kita bertindak dan membuat keputusan dengan baik.",
      ),
      node(
        "pengajaran-fikir",
        "Kita Hendaklah Berfikir Sebelum Membuat Keputusan",
        "Elakkan hukuman terburu-buru atau jalan mudah yang tidak berlandaskan hukum.",
      ),
      node(
        "pengajaran-musyarawah",
        "Kita Hendaklah Mendampingi Orang Berilmu",
        "Perbincangan dengan orang berpengetahuan membantu melancarkan urusan.",
      ),
      node(
        "pengajaran-rakyat",
        "Kita Hendaklah Menjaga Kebajikan Orang di Bawah Tanggungjawab",
        "Aduan rakyat perlu ditangani secara cekap dan adil.",
      ),
      node(
        "pengajaran-nasihat",
        "Kita Hendaklah Mendengar Nasihat yang Baik",
        "Panduan orang berpengalaman membantu membentuk akhlak dan tindakan.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node(
        "kata-rantaian",
        "Rantaian Ingatan",
        "BAPA → NASIHAT → ANAK → PEMIMPIN → AMANAH → ADIL → ILMU → BIJAK → RAKYAT.",
      ),
      node(
        "kata-pemimpin",
        "Formula Kesejahteraan",
        "KUASA + AMANAH + KEADILAN + ILMU → KESEJAHTERAAN.",
      ),
      node("kata-amaran", "Amaran Utama", "KUASA TANPA AMANAH = BAHAYA."),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node(
        "jawab-maksud",
        "Maksud Rangkap",
        "SIAPA + NASIHAT + TINDAKAN. Gunakan bahasa sendiri dan jangan salin syair.",
      ),
      node("jawab-tema", "Tema", "NASIHAT + TANGGUNGJAWAB PEMIMPIN + ILMU."),
      node("jawab-persoalan", "Persoalan", "PERSOALAN + RANGKAP ATAU IDEA SOKONGAN."),
      node("jawab-nilai", "Nilai", "NILAI + BUKTI IDEA."),
      node("jawab-pengajaran", "Pengajaran", "‘Kita hendaklah...’ + TINDAKAN ATAU SEBAB."),
      node("jawab-bentuk", "Bentuk", "CIRI SYAIR + BUKTI STRUKTUR."),
      node("jawab-gaya", "Gaya Bahasa", "TEKNIK + CONTOH PENDEK YANG DISAHKAN + KESAN."),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "kesalahan-pantun",
        "Syair = Pantun",
        "Salah. Pantun mempunyai pembayang dan maksud; semua baris syair membawa maksud.",
      ),
      node(
        "kesalahan-tema",
        "Tema = Kasih Sayang Bapa",
        "Terlalu sempit. Hubungan bapa-anak membingkai nasihat, tetapi fokus utama ialah ilmu dan tanggungjawab kepimpinan.",
      ),
      node(
        "kesalahan-raja",
        "Pemimpin = Raja Sahaja",
        "Dalam teks, kepimpinan merujuk raja atau menteri; prinsipnya boleh difahami dalam konteks kepimpinan lain tanpa mendakwa konteks moden berlaku dalam syair.",
      ),
      node(
        "kesalahan-amanah",
        "Amanah = Jujur Sahaja",
        "Amanah juga meliputi tanggungjawab, penggunaan kuasa yang betul dan pencegahan penyelewengan.",
      ),
      node(
        "kesalahan-adil",
        "Adil = Semua Mendapat Perkara Sama",
        "Adil bermaksud membuat keputusan secara wajar, berasaskan kebenaran dan tidak berat sebelah.",
      ),
      node(
        "kesalahan-hukum",
        "Terus Menghukum",
        "Salah. Gunakan ILMU → SIASAT → PERTIMBANGKAN → PUTUSKAN.",
      ),
      node(
        "kesalahan-nilai",
        "Nilai = Pengajaran",
        "Nilai: amanah. Pengajaran: Kita hendaklah menjalankan amanah dengan penuh tanggungjawab.",
      ),
      node(
        "kesalahan-petikan",
        "Cipta Petikan",
        "Jangan mereka baris syair atau bukti gaya bahasa.",
      ),
      node(
        "kesalahan-rangkap",
        "Bilangan Rangkap Salah",
        "Petikan yang ditetapkan mempunyai 18 rangkap, bukannya jumlah yang diandaikan daripada ciri umum syair.",
      ),
    ]),
  ],
};
