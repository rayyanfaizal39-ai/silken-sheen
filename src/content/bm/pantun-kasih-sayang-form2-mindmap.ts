import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-pantun-kasih-sayang";

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

function stanza(id: string, title: string, meaning: string, keywords: string): MindNode {
  return branch(`maksud-${id}`, `Rangkap ${id} — ${title}`, [
    node(`maksud-${id}-huraian`, "Maksud", meaning),
    node(`maksud-${id}-kata-kunci`, "Kata Kunci", keywords),
  ]);
}

function supported(id: string, label: string, explanation: string, evidence: string): MindNode {
  return branch(id, label, [
    node(`${id}-huraian`, "Huraian", explanation),
    node(`${id}-bukti`, "Bukti Idea", evidence),
  ]);
}

export const bahasaMelayuTingkatan2PantunKasihSayangMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "PANTUN KASIH SAYANG",
  summary:
    "Pantun Kasih Sayang menggambarkan kasih dan kekaguman terhadap insan yang disukai, harapan yang terhalang, keinginan yang sukar dicapai, minat yang disembunyikan serta keyakinan bahawa jodoh dan pertemuan ditentukan Tuhan.",
  children: [
    branch("maksud-rangkap", "Maksud Rangkap", [
      stanza(
        "1",
        "Keindahan Senyuman",
        "Senyuman orang yang dikasihi dianggap lebih manis dan menarik daripada sesuatu yang sememangnya terkenal dengan rasa manis. Kekaguman ini tidak terbatas pada rupa fizikal semata-mata.",
        "SENYUMAN → MENARIK → DIKAGUMI",
      ),
      stanza(
        "2",
        "Harapan Terhalang",
        "Seseorang menaruh harapan terhadap insan yang disayanginya, tetapi perbezaan kedudukan atau keadaan menyebabkan harapan itu sukar dipenuhi.",
        "HARAPAN + HALANGAN → SUKAR DIPENUHI",
      ),
      stanza(
        "3",
        "Keinginan yang Sukar Dicapai",
        "Seseorang menginginkan insan atau sesuatu yang indah, namun menyedari bahawa keinginannya amat tinggi dan sukar dicapai.",
        "INGIN → TINGGI → SUKAR DICAPAI",
      ),
      stanza(
        "4",
        "Minat yang Disembunyikan",
        "Seseorang berpura-pura melakukan perkara lain sedangkan sebenarnya dia mahu melihat atau memerhatikan orang yang diminatinya secara tidak langsung.",
        "PURA-PURA → MEMERHATI → MINAT",
      ),
      stanza(
        "5",
        "Jodoh dan Pertemuan",
        "Perpisahan tidak semestinya berkekalan kerana dua insan akan bertemu semula apabila sampai masa jika telah ditentukan berjodoh.",
        "TAKDIR + JODOH → BERTEMU SEMULA",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "PERASAAN KASIH SAYANG TERHADAP INSAN YANG DIKAGUMI", [
        node(
          "tema-huraian",
          "Huraian",
          "Pantun menggambarkan kasih, kekaguman dan harapan seseorang terhadap insan yang disukai, di samping kesedaran tentang halangan, batas kemampuan dan ketentuan jodoh.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema Pantun Kasih Sayang ialah perasaan kasih sayang terhadap insan yang dikagumi. Pantun turut menggambarkan harapan, batas kemampuan dan keyakinan terhadap ketentuan jodoh.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      supported(
        "persoalan-kagum",
        "Daya Tarikan Peribadi",
        "Senyuman dan perwatakan yang menarik menimbulkan rasa kagum serta kasih.",
        "Rangkap 1 menggambarkan kekaguman terhadap kemanisan senyuman.",
      ),
      supported(
        "persoalan-darjat",
        "Perbezaan Darjat sebagai Halangan",
        "Perbezaan kedudukan boleh menyebabkan sesuatu harapan atau hubungan sukar dicapai.",
        "Rangkap 2 membandingkan harapan yang tinggi dengan batas diri.",
      ),
      supported(
        "persoalan-sukar",
        "Keinginan terhadap Sesuatu yang Sukar Dicapai",
        "Manusia kadangkala menginginkan seseorang atau sesuatu yang berada di luar kemampuannya.",
        "Rangkap 3 menggunakan imej bulan yang dipagar bintang.",
      ),
      supported(
        "persoalan-tersembunyi",
        "Perasaan Suka yang Disembunyikan",
        "Seseorang mungkin menyembunyikan minat dan memerhatikan orang yang disukai secara tidak langsung.",
        "Rangkap 4 menunjukkan perbuatan berpura-pura untuk melihat orang yang diminati.",
      ),
      supported(
        "persoalan-jodoh",
        "Jodoh dan Pertemuan Ditentukan Tuhan",
        "Dua insan yang telah ditentukan berjodoh boleh bertemu semula apabila tiba masanya.",
        "Rangkap 5 menghubungkan perpisahan dengan kemungkinan pertemuan semula.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node(
        "bentuk-identiti",
        "Identiti Karya",
        "Puisi tradisional jenis pantun dalam antologi Baik Budi, Indah Bahasa, Tingkatan 2.",
      ),
      node("bentuk-rangkap", "Lima Rangkap", "Pantun ini mengandungi lima rangkap."),
      node("bentuk-baris", "Empat Baris Serangkap", "Setiap rangkap mempunyai empat baris."),
      node(
        "bentuk-kerat",
        "Pantun Empat Kerat",
        "Baris pertama dan kedua ialah pembayang; baris ketiga dan keempat menyampaikan maksud.",
      ),
      node(
        "bentuk-kata",
        "Tiga hingga Enam Patah Kata",
        "Setiap baris mengandungi antara tiga hingga enam patah kata.",
      ),
      node(
        "bentuk-suku-kata",
        "Lapan hingga Sepuluh Suku Kata",
        "Setiap baris mengandungi antara lapan hingga sepuluh suku kata.",
      ),
      branch("bentuk-rima", "Rima Akhir Setiap Rangkap", [
        node("bentuk-rima-1", "Rangkap 1 — abab", "Rangkap 1 menggunakan rima silang abab."),
        node("bentuk-rima-2", "Rangkap 2 — abab", "Rangkap 2 menggunakan rima silang abab."),
        node("bentuk-rima-3", "Rangkap 3 — abab", "Rangkap 3 menggunakan rima silang abab."),
        node(
          "bentuk-rima-4",
          "Rangkap 4 — abcb",
          "Bunyi akhir baris kedua, ketiga dan keempat menghasilkan pola abcb; rangkap ini bukan abab.",
        ),
        node("bentuk-rima-5", "Rangkap 5 — abab", "Rangkap 5 menggunakan rima silang abab."),
      ]),
      node(
        "bentuk-terikat",
        "Bentuk Terikat",
        "Pantun mengikuti susunan rangkap, baris, pembayang, maksud dan rima yang teratur.",
      ),
    ]),
    branch("ciri-pantun", "Ciri Pantun", [
      node(
        "ciri-pembayang",
        "Pembayang dan Maksud",
        "Dua baris pembayang diikuti dua baris yang membawa maksud dalam setiap rangkap.",
      ),
      node(
        "ciri-padat",
        "Bahasa Padat",
        "Perasaan yang kompleks disampaikan melalui ungkapan yang ringkas dan mudah diingati.",
      ),
      node(
        "ciri-alam",
        "Unsur Alam",
        "Pembayang dan kiasan menggunakan imej buah, asap, langit, laut, bulan dan bintang.",
      ),
      node(
        "ciri-kiasan",
        "Bahasa Kiasan",
        "Perasaan disampaikan secara tidak langsung melalui gambaran dan perbandingan.",
      ),
      node("ciri-irama", "Irama", "Pola bunyi dan rima menjadikan pantun merdu serta mudah dilafazkan."),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      supported(
        "gaya-personifikasi",
        "Personifikasi",
        "Perbuatan manusia diberikan kepada unsur bukan manusia untuk menghasilkan gambaran yang hidup.",
        "Contoh pendek Rangkap 3: ‘Anak udang meniti batang’.",
      ),
      supported(
        "gaya-paradoks",
        "Paradoks",
        "Dua gagasan yang kelihatan bertentangan diletakkan bersama untuk menegaskan batas diri dan harapan.",
        "Contoh pendek Rangkap 2: ‘Langit tinggi kupandang rendah’.",
      ),
      supported(
        "gaya-simile",
        "Simile",
        "Kata pembanding menerangkan betapa sukarnya keinginan itu dicapai.",
        "Contoh pendek Rangkap 3: ‘Bagaikan rasa hendak dicapai’.",
      ),
      supported(
        "gaya-inversi",
        "Inversi",
        "Susunan kata diterbalikkan untuk mengekalkan irama dan memberikan penegasan.",
        "Contoh pendek Rangkap 1: ‘Gula madu kusangka manis’.",
      ),
      supported(
        "gaya-kata-ganda",
        "Kata Ganda",
        "Penggandaan kata menghasilkan rentak dan menggambarkan tindakan yang berulang atau dibuat-buat.",
        "Contoh pendek Rangkap 4: ‘jalan-jalan’, ‘singgah-menyinggah’ dan ‘pura-pura’.",
      ),
      supported(
        "gaya-asonansi",
        "Asonansi",
        "Pengulangan bunyi vokal a menghasilkan kemerduan.",
        "Bunyi a berulang dalam contoh pendek Rangkap 3: ‘Bagaikan rasa hendak dicapai’.",
      ),
      supported(
        "gaya-aliterasi",
        "Aliterasi",
        "Pengulangan bunyi konsonan g menguatkan rentak.",
        "Bunyi g berulang dalam contoh pendek Rangkap 4: ‘Singgah-menyinggah di pagar orang’.",
      ),
      node(
        "gaya-had",
        "Had Petikan",
        "Gunakan bukti pendek yang disahkan; jangan menyalin keseluruhan rangkap atau mencipta baris pantun.",
      ),
    ]),
    branch("perasaan", "Perasaan dalam Pantun", [
      supported(
        "emosi-kagum",
        "Kagum",
        "Penutur mengagumi kemanisan senyuman insan yang disukai.",
        "Rangkap 1.",
      ),
      supported(
        "emosi-berharap",
        "Berharap",
        "Penutur menyimpan harapan walaupun menyedari adanya perbezaan atau halangan.",
        "Rangkap 2.",
      ),
      supported(
        "emosi-ingin",
        "Menginginkan",
        "Penutur menginginkan sesuatu yang indah tetapi sukar dicapai.",
        "Rangkap 3.",
      ),
      supported(
        "emosi-tertarik",
        "Tertarik",
        "Penutur menyembunyikan minat dengan berpura-pura melakukan perkara lain.",
        "Rangkap 4.",
      ),
      supported(
        "emosi-reda",
        "Reda dan Yakin",
        "Penutur menerima perpisahan sambil meyakini ketentuan jodoh dan kemungkinan pertemuan semula.",
        "Rangkap 5.",
      ),
      node(
        "emosi-aliran",
        "Peta Emosi",
        "KAGUM ↓ BERHARAP ↓ MENGINGINKAN ↓ TERTARIK ↓ REDA PADA KETENTUAN",
      ),
    ]),
    branch("nilai", "Nilai", [
      supported(
        "nilai-kasih",
        "Kasih Sayang",
        "Seseorang mempunyai perasaan sayang dan menghargai insan lain.",
        "Rangkap 1 menonjolkan kekaguman terhadap insan yang disukai.",
      ),
      supported(
        "nilai-rasional",
        "Rasional",
        "Seseorang menyedari bahawa tidak semua harapan dan keinginan mampu dicapai.",
        "Rangkap 2 dan 3 mengingatkan pembaca tentang halangan serta batas diri.",
      ),
      supported(
        "nilai-kejujuran",
        "Kejujuran",
        "Perasaan dan hubungan yang sihat memerlukan kejujuran, bukan helah yang berpanjangan.",
        "Rangkap 4 membuka ruang untuk menilai minat yang masih disembunyikan.",
      ),
      supported(
        "nilai-kepercayaan",
        "Kepercayaan kepada Ketentuan Tuhan",
        "Seseorang menerima bahawa jodoh dan pertemuan berlaku menurut ketentuan Tuhan.",
        "Rangkap 5 menyampaikan keyakinan terhadap jodoh dan masa pertemuan.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-sayang",
        "Kita Hendaklah Saling Menyayangi",
        "Kasih sayang yang tulus membantu membina hubungan yang baik.",
      ),
      node(
        "pengajaran-rasional",
        "Kita Hendaklah Bersikap Rasional",
        "Nilai keadaan dan kemampuan diri apabila berhadapan dengan harapan yang sukar dicapai.",
      ),
      node(
        "pengajaran-jujur",
        "Kita Hendaklah Jujur",
        "Luahkan perasaan secara jujur dan beradab apabila keadaan sesuai.",
      ),
      node(
        "pengajaran-takdir",
        "Kita Hendaklah Menerima Ketentuan Tuhan",
        "Terima urusan jodoh dan pertemuan dengan sabar tanpa memaksa orang lain.",
      ),
      node(
        "pengajaran-batas",
        "Kita Hendaklah Menghormati Batas Orang Lain",
        "USAHA + RASIONAL + HORMATI BATAS; kasih sayang yang sihat bukan paksaan atau obsesi.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node(
        "kata-aliran",
        "Tangga Ingatan",
        "R1 KAGUM ↓ R2 HARAPAN ↓ R3 SUKAR DICAPAI ↓ R4 MINAT TERSEMBUNYI ↓ R5 JODOH",
      ),
      node("kata-r1", "Rangkap 1", "SENYUMAN → KAGUM"),
      node("kata-r2", "Rangkap 2", "LANGIT TINGGI → HALANGAN"),
      node("kata-r3", "Rangkap 3", "BULAN + BINTANG → SUKAR DICAPAI"),
      node("kata-r4", "Rangkap 4", "PURA-PURA → MINAT TERSEMBUNYI"),
      node("kata-r5", "Rangkap 5", "JODOH → BERTEMU SEMULA"),
      node(
        "kata-mesej",
        "Mesej Teras",
        "KASIH SAYANG + RASIONAL + HORMATI BATAS + TERIMA KETENTUAN",
      ),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node("jawab-maksud", "Maksud Rangkap", "PERASAAN + SITUASI; parafrasa tanpa menyalin pantun."),
      node("jawab-tema", "Tema", "PERASAAN UTAMA + SIAPA / APA + IDEA SOKONGAN."),
      node("jawab-persoalan", "Persoalan", "PERSOALAN + HURAIAN + RANGKAP SOKONGAN."),
      node("jawab-nilai", "Nilai", "NILAI + BUKTI IDEA BERDASARKAN SIKAP ATAU TINDAKAN."),
      node(
        "jawab-pengajaran",
        "Pengajaran",
        "Mulakan dengan ‘Kita hendaklah...’ kemudian nyatakan tindakan yang sesuai.",
      ),
      node("jawab-gaya", "Gaya Bahasa", "TEKNIK + CONTOH PENDEK YANG DISAHKAN + KESAN."),
      node("jawab-bentuk", "Bentuk", "CIRI + BUKTI; nyatakan rima Rangkap 4 sebagai abcb."),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "salah-tema",
        "Tema = Percintaan Semata-mata",
        "Terlalu sempit. Pantun turut merangkumi kekaguman, harapan, halangan, batas diri dan ketentuan jodoh.",
      ),
      node(
        "salah-r2",
        "Rangkap 2 = Minat Tersembunyi",
        "Salah. Rangkap 2 membawa harapan yang terhalang; minat tersembunyi terdapat dalam Rangkap 4.",
      ),
      node(
        "salah-r3",
        "Rangkap 3 = Langit Sebenar",
        "Salah. Rangkap 3 menggunakan bulan dan bintang untuk menggambarkan keinginan yang sukar dicapai.",
      ),
      node(
        "salah-r4",
        "Rangkap 4 = Kesetiaan hingga Maut",
        "Salah. Rangkap 4 menggambarkan minat yang disembunyikan melalui perbuatan berpura-pura.",
      ),
      node(
        "salah-r5",
        "Rangkap 5 = Bulan Sebenar",
        "Salah. Rangkap 5 membawa gagasan jodoh dan pertemuan semula, bukan imej bulan dan bintang.",
      ),
      node(
        "salah-obses",
        "Kasih Sayang = Obsesi",
        "Salah. Kasih sayang yang sihat mesti menghormati pilihan dan batas orang lain.",
      ),
      node(
        "salah-nilai",
        "Nilai = Pengajaran",
        "Nilai ialah rasional; pengajaran ialah kita hendaklah bersikap rasional.",
      ),
      node(
        "salah-rima",
        "Semua Rima Dianggap abab",
        "Rangkap 1, 2, 3 dan 5 berima abab, manakala Rangkap 4 berima abcb.",
      ),
      node(
        "salah-gaya",
        "Gaya Bahasa Direka",
        "Gunakan teknik dan bukti pendek yang benar-benar terdapat dalam teks.",
      ),
      node(
        "salah-pembayang",
        "Pembayang = Maksud",
        "Dua baris awal ialah pembayang; dua baris akhir menyampaikan maksud.",
      ),
    ]),
  ],
};
