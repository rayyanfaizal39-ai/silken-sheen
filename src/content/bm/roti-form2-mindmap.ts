import type { MindNode } from "@/components/MindMap";

// Content verified against the prescribed poem and anthology-aligned
// Sasbadi Form 2 KOMSAS notes. Only short evidence phrases are reproduced.
const PREFIX = "bm-f2-roti";

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
    node(`${id}-sokongan`, "Idea / Rangkap Sokongan", support),
  ]);
}

function stanza(
  id: string,
  label: string,
  event: string,
  meaning: string,
  keyword: string,
): MindNode {
  return branch(id, label, [
    node(`${id}-peristiwa`, "Apa yang Berlaku", event),
    node(`${id}-tersirat`, "Maksud Tersirat", meaning),
    node(`${id}-kata`, "Kata Kunci", keyword),
  ]);
}

function device(id: string, label: string, evidence: string, effect: string): MindNode {
  return branch(id, label, [
    node(`${id}-bukti`, "Bukti Ringkas", evidence),
    node(`${id}-kesan`, "Kesan", effect),
  ]);
}

export const bahasaMelayuTingkatan2RotiMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "ROTI",
  summary:
    "Sajak • Ahmad Syahrul Wahid • KOMSAS Tingkatan 2\n\nSajak Roti bergerak daripada selera terhadap roti kepada kesedaran bahawa orang yang beriman dan berkecukupan tidak melupakan golongan miskin yang masih lapar. Roti menghubungkan rezeki, kesyukuran, keimanan dan tanggungjawab sesama manusia.",
  children: [
    branch("maksud-rangkap", "Maksud Rangkap", [
      stanza(
        "maksud-rangkap-1",
        "Rangkap 1",
        "Roti sedang dibuat di dapur. Asap berkepul dan baunya yang harum membangkitkan selera.",
        "Bau makanan yang sedang disediakan boleh menimbulkan keinginan untuk makan.",
        "DAPUR → BAU HARUM → SELERA",
      ),
      stanza(
        "maksud-rangkap-2",
        "Rangkap 2",
        "Orang yang lapar menunggu roti dibakar lalu dihidangkan dalam keadaan rangup dan segar.",
        "Selera semakin bertambah apabila roti yang dinanti siap dibakar dan kelihatan menyelerakan.",
        "LAPAR → MENUNGGU → ROTI TERHIDANG",
      ),
      stanza(
        "maksud-rangkap-3",
        "Rangkap 3",
        "Roti berada di depan mata lalu dimakan sehingga perut kenyang dan orang itu bersendawa.",
        "Makanan yang tersedia memenuhi selera dan menghilangkan rasa lapar.",
        "ROTI → MAKAN → KENYANG",
      ),
      stanza(
        "maksud-rangkap-4",
        "Rangkap 4",
        "Selepas kenyang, orang yang beriman masih teringat akan warga miskin yang lapar dan belum terbela.",
        "Keimanan dan perikemanusiaan menuntut golongan berkecukupan memikirkan serta membantu orang yang memerlukan.",
        "KENYANG → TERINGAT ORANG MISKIN → TANGGUNGJAWAB",
      ),
      stanza(
        "maksud-rangkap-5",
        "Rangkap 5",
        "Keimanan dan bantuan golongan berada mengurangkan penderitaan; golongan yang dibantu bersyukur dan kedamaian dapat dirasai.",
        "Kesyukuran, bantuan dan keimanan membawa kesejahteraan kepada masyarakat.",
        "IMAN + BANTUAN → SYUKUR → DAMAI",
      ),
      node(
        "maksud-parafrasa",
        "Parafrasa, Bukan Salinan",
        "Maksud disampaikan dengan bahasa sendiri tanpa menyalin sajak penuh atau mencipta baris baharu.",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "ORANG BERIMAN TIDAK MELUPAKAN GOLONGAN MISKIN KETIKA KENYANG", [
        node(
          "tema-huraian",
          "Huraian",
          "Sajak menunjukkan bahawa nikmat makanan perlu disertai keimanan, kesyukuran dan keprihatinan terhadap golongan miskin yang masih lapar.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema sajak Roti ialah sikap orang beriman yang tidak melupakan golongan miskin ketika menikmati rezeki. Mereka sedar bahawa nikmat makanan perlu disertai kesyukuran dan tanggungjawab membantu orang yang memerlukan.",
        ),
        node(
          "tema-pilihan",
          "Rumusan yang Disahkan",
          "Kesyukuran terhadap rezeki ialah unsur penting, tetapi rumusan tema rujukan yang lebih tepat menekankan orang beriman yang tidak melupakan golongan miskin ketika kenyang.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      supported(
        "persoalan-bau",
        "Bau Makanan Membangkitkan Selera",
        "Bau roti yang sedang dibakar menyebabkan seseorang teringin untuk makan.",
        "Rangkap 1 menggambarkan asap dapur dan bau juadah yang membangkitkan selera.",
      ),
      supported(
        "persoalan-lapar",
        "Sukar Menahan Selera ketika Lapar",
        "Orang yang lapar semakin berselera ketika menunggu makanan disediakan.",
        "Rangkap 2 menunjukkan penantian terhadap roti yang dibakar dan dihidangkan.",
      ),
      supported(
        "persoalan-kenyang",
        "Makanan Mengenyangkan",
        "Makanan yang enak dinikmati sehingga rasa lapar hilang.",
        "Rangkap 3 bergerak daripada selera yang kuat kepada perut yang kenyang.",
      ),
      supported(
        "persoalan-prihatin",
        "Keprihatinan terhadap Golongan Miskin",
        "Orang beriman tidak melupakan mereka yang masih lapar walaupun diri sendiri sudah kenyang.",
        "Rangkap 4 menyebut beban membela warga miskin yang lapar dan dahaga.",
      ),
      supported(
        "persoalan-syukur",
        "Kesyukuran sebagai Tanda Keimanan",
        "Nikmat dan bantuan yang diterima melahirkan rasa syukur serta kedamaian.",
        "Rangkap 5 menghubungkan syukur, kedamaian dan iman.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node(
        "bentuk-identiti",
        "Identiti Karya",
        "Roti ialah puisi moden atau sajak karya Ahmad Syahrul Wahid dalam antologi Baik Budi, Indah Bahasa, Tingkatan 2.",
      ),
      node("bentuk-rangkap", "Lima Rangkap", "Sajak terdiri daripada lima rangkap."),
      node(
        "bentuk-baris",
        "Bilangan Baris Berbeza",
        "Rangkap 1 mempunyai empat baris; Rangkap 2, 3, 4 dan 5 masing-masing mempunyai lima baris.",
      ),
      node(
        "bentuk-kata",
        "Dua hingga Enam Patah Kata",
        "Setiap baris mengandungi antara dua hingga enam patah kata.",
      ),
      node(
        "bentuk-suku",
        "Lima hingga Empat Belas Suku Kata",
        "Setiap baris mengandungi antara lima hingga empat belas suku kata.",
      ),
      node("bentuk-rima", "Rima Akhir", "Rangkap 1: abaa. Rangkap 2 hingga Rangkap 5: aaaaa."),
      node(
        "bentuk-bebas",
        "Sajak Bebas",
        "Bentuknya bebas; sajak tidak terikat pada pola pembayang dan maksud pantun atau bentuk syair.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      device(
        "gaya-hiperbola",
        "Hiperbola",
        "Frasa pendek: ‘nafsu makan pun bergelora’ dan ‘melangit damai dirasa’.",
        "Melebihkan gambaran untuk menegaskan kuatnya selera dan luasnya rasa damai.",
      ),
      device(
        "gaya-metafora",
        "Metafora",
        "Frasa pendek: ‘percikan iman’.",
        "Memberikan gambaran konkrit dan segar tentang keimanan.",
      ),
      device(
        "gaya-personifikasi",
        "Personifikasi",
        "Frasa pendek: ‘selera kian menggelepar’.",
        "Menjadikan selera seolah-olah hidup untuk menegaskan keinginan makan.",
      ),
      device(
        "gaya-simile",
        "Simile",
        "Frasa pendek: ‘terhidang seumpama permaidani terhampar’.",
        "Kata pembanding menjadikan hidangan roti lebih jelas dan menarik.",
      ),
      device(
        "gaya-asonansi",
        "Asonansi",
        "Pengulangan vokal i dalam frasa ‘Bagi pemilik iman di dada’.",
        "Pengulangan bunyi vokal menimbulkan kemerduan.",
      ),
      device(
        "gaya-aliterasi",
        "Aliterasi",
        "Pengulangan konsonan b dalam frasa ‘Bila begitu selamanya’.",
        "Pengulangan bunyi konsonan menghasilkan penegasan dan irama.",
      ),
      node(
        "gaya-had",
        "Had Bukti",
        "Gunakan teknik dan frasa pendek yang disahkan sahaja. Roti tidak dilabel sebagai metafora formal dalam analisis rujukan.",
      ),
    ]),
    branch("simbol-roti", "Simbol Roti", [
      node(
        "simbol-literal",
        "Makna Literal",
        "Roti ialah makanan yang dibakar, dihidangkan dan dimakan dalam tiga rangkap awal.",
      ),
      node(
        "simbol-konsep",
        "Tafsiran Konsep",
        "Dalam peta konsep ini, roti boleh dibaca sebagai penghubung kepada makanan, rezeki dan keperluan asas. Ini ialah tafsiran berdasarkan keseluruhan sajak, bukan label gaya bahasa rasmi.",
      ),
      node(
        "simbol-rantaian",
        "Rantaian Makna",
        "ROTI → MAKANAN → KEPERLUAN ASAS → REZEKI → TANGGUNGJAWAB.",
      ),
      node(
        "simbol-teras",
        "Idea Teras",
        "Nikmat makanan menjadi ujian keimanan: adakah orang yang kenyang masih mengingati mereka yang lapar?",
      ),
    ]),
    branch("kontras-kehidupan", "Kontras Kehidupan", [
      branch("kontras-kenyang", "Golongan Kenyang / Berkemampuan", [
        node("kontras-kenyang-1", "Keadaan", "Makanan tersedia dan perut sudah kenyang."),
        node(
          "kontras-kenyang-2",
          "Tuntutan",
          "Mengingati dan membantu orang yang kurang bernasib baik.",
        ),
      ]),
      branch("kontras-miskin", "Warga Miskin yang Lapar", [
        node("kontras-miskin-1", "Keadaan", "Masih lapar, dahaga dan belum terbela."),
        node(
          "kontras-miskin-2",
          "Keperluan",
          "Memerlukan perhatian serta bantuan, bukan penghakiman.",
        ),
      ]),
      node(
        "kontras-peta",
        "Peta Perbandingan",
        "KENYANG + BERIMAN → INGAT ORANG LAPAR → BANTUAN → SYUKUR + DAMAI.",
      ),
      branch("kontras-bayangkan", "Bayangkan", [
        node("kontras-bayangkan-a", "Murid A", "Sudah makan dan mempunyai makanan yang mencukupi."),
        node(
          "kontras-bayangkan-b",
          "Murid B",
          "Tidak pasti sama ada akan mendapat makanan pada hari ini.",
        ),
        node(
          "kontras-bayangkan-soalan",
          "Soalan",
          "Adakah sekeping roti mempunyai nilai yang sama kepada kedua-duanya?",
        ),
        node(
          "kontras-bayangkan-jawapan",
          "Jawapan",
          "Tidak. KEPERLUAN BERBEZA → NILAI YANG DIRASAI BERBEZA. Namun, sajak pergi lebih jauh dengan menuntut orang yang kenyang supaya mengingati orang yang lapar.",
        ),
      ]),
      node(
        "kontras-had",
        "Had Tafsiran",
        "Sajak menyebut warga miskin, lapar dan dahaga, tetapi tidak menamakan negara, peperangan, pelarian atau peristiwa sejarah tertentu.",
      ),
    ]),
    branch("nilai", "Nilai", [
      supported(
        "nilai-sabar",
        "Kesabaran",
        "Bersabar ketika menunggu sesuatu yang diingini.",
        "Rangkap 1 dan 2 menggambarkan penantian ketika roti disediakan.",
      ),
      supported(
        "nilai-baik",
        "Baik Hati",
        "Memikirkan dan membantu golongan yang memerlukan.",
        "Rangkap 4 mengingatkan tanggungjawab terhadap warga miskin.",
      ),
      supported(
        "nilai-syukur",
        "Kesyukuran",
        "Menghargai nikmat dan rezeki kurniaan Tuhan.",
        "Rangkap 5 menghubungkan syukur dengan kedamaian.",
      ),
      supported(
        "nilai-iman",
        "Keimanan",
        "Keimanan terlihat melalui keprihatinan, bantuan dan kesyukuran.",
        "Rangkap 4 dan 5 menyebut iman sebagai asas tindakan.",
      ),
      supported(
        "nilai-sederhana",
        "Kesederhanaan",
        "Menikmati rezeki tanpa melupakan keperluan orang lain.",
        "Peralihan Rangkap 3 kepada Rangkap 4 mengubah fokus daripada kenyang kepada tanggungjawab.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-sabar",
        "Kita Hendaklah Bersabar",
        "Kita hendaklah bersabar ketika menunggu untuk mendapatkan sesuatu.",
      ),
      node(
        "pengajaran-kongsi",
        "Kita Hendaklah Memikirkan Orang Lain",
        "Kita hendaklah memikirkan orang lain supaya mereka turut mendapat rezeki.",
      ),
      node(
        "pengajaran-prihatin",
        "Kita Hendaklah Prihatin",
        "Kita hendaklah mengingati keadaan orang yang kurang bernasib baik.",
      ),
      node(
        "pengajaran-iman",
        "Kita Hendaklah Memupuk Keimanan",
        "Kita hendaklah melatih diri menjadi orang beriman yang membuktikan keimanan melalui tindakan.",
      ),
      node(
        "pengajaran-syukur",
        "Kita Hendaklah Bersyukur",
        "Kita hendaklah bersyukur atas nikmat kurniaan Tuhan.",
      ),
      node(
        "pengajaran-pembaziran",
        "Tentang Pembaziran",
        "Elakkan menjadikan ‘jangan membazir’ sebagai jawapan utama tanpa huraian. Analisis rujukan menekankan kesederhanaan, kesyukuran dan berkongsi rezeki.",
      ),
    ]),
    branch("nada", "Nada", [
      node(
        "nada-didaktik",
        "DIDAKTIK",
        "Nada sajak ialah didaktik kerana penyajak mendidik pembaca tentang kesabaran, keimanan, kesyukuran dan tanggungjawab terhadap golongan miskin.",
      ),
      node(
        "nada-jawapan",
        "Jawapan Murid",
        "Sajak Roti bernada didaktik kerana mengajar pembaca supaya bersyukur, beriman dan tidak melupakan golongan yang memerlukan.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node(
        "kata-rantaian",
        "Rantaian Ingatan",
        "ROTI → SELERA → KENYANG → INGAT WARGA MISKIN → BANTU → SYUKUR → DAMAI.",
      ),
      node(
        "kata-kontras",
        "Kontras Teras",
        "ORANG KENYANG: menikmati rezeki. WARGA MISKIN: masih lapar. JAMBATAN: iman dan bantuan.",
      ),
      node("kata-memori", "Peta Memori", "ROTI → KENYANG → KESEDARAN → IMAN + BAIK HATI + SYUKUR."),
      node("kata-mesej", "Mesej Teras", "NIKMAT MAKANAN PERLU DISERTAI KESYUKURAN DAN KEPEDULIAN."),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node("jawab-maksud", "Maksud Rangkap", "APA YANG BERLAKU + MAKSUD TERSIRAT."),
      node("jawab-tema", "Tema", "ISU UTAMA + IMAN + TANGGUNGJAWAB TERHADAP GOLONGAN MISKIN."),
      node("jawab-persoalan", "Persoalan", "PERSOALAN + IDEA ATAU RANGKAP SOKONGAN."),
      node("jawab-nilai", "Nilai", "NILAI + HURAIAN TINDAKAN."),
      node("jawab-pengajaran", "Pengajaran", "‘Kita hendaklah...’ + TINDAKAN."),
      node("jawab-bentuk", "Bentuk", "CIRI SAJAK + BUKTI STRUKTUR."),
      node("jawab-gaya", "Gaya Bahasa", "TEKNIK + BUKTI PENDEK + KESAN."),
      node(
        "jawab-bukti",
        "Bukti Teks",
        "Gunakan frasa pendek yang tepat; jangan mereka petikan atau menyalin keseluruhan rangkap.",
      ),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "kesalahan-tema-roti",
        "Tema = Roti",
        "Salah. Roti ialah objek utama; tema menekankan orang beriman yang tidak melupakan golongan miskin ketika kenyang.",
      ),
      node(
        "kesalahan-resipi",
        "Sajak tentang Cara Membuat Roti",
        "Salah. Proses menyediakan roti menjadi permulaan kepada mesej kesyukuran, keimanan dan tanggungjawab sosial.",
      ),
      node(
        "kesalahan-pilihan",
        "Tema = Banyak Pilihan Makanan",
        "Tidak disokong. Sajak menampilkan selera, kenyang, warga miskin, kelaparan, bantuan, syukur dan iman; bukan kepelbagaian pilihan makanan.",
      ),
      node(
        "kesalahan-hukum",
        "Orang Senang = Orang Jahat",
        "Salah. Sajak menuntut keprihatinan dan tindakan beriman, bukan menghukum semua orang yang berkecukupan.",
      ),
      node(
        "kesalahan-miskin",
        "Orang Miskin = Malas",
        "Salah dan tidak disokong. Sajak hanya menyatakan mereka belum terbela serta masih lapar dan dahaga.",
      ),
      node(
        "kesalahan-simbol",
        "Roti = Simbol Wang Sahaja",
        "Terlalu sempit. Roti ialah makanan literal yang membuka gagasan rezeki, keperluan dan tanggungjawab.",
      ),
      node(
        "kesalahan-pembayang",
        "Mencari Pembayang",
        "Salah. Sajak bukan pantun dan tidak memerlukan struktur pembayang serta maksud.",
      ),
      node(
        "kesalahan-rangkap",
        "Semua Rangkap Sama Panjang",
        "Salah. Rangkap pertama mempunyai empat baris, manakala empat rangkap seterusnya mempunyai lima baris.",
      ),
      node(
        "kesalahan-nilai",
        "Nilai = Pengajaran",
        "Bezakan bentuk jawapan. Nilai: kesyukuran. Pengajaran: Kita hendaklah bersyukur atas nikmat kurniaan Tuhan.",
      ),
      node(
        "kesalahan-reka",
        "Mencipta Negara atau Peperangan",
        "Salah. Tiada negara, peperangan, pelarian atau peristiwa sejarah khusus dinyatakan dalam sajak.",
      ),
    ]),
  ],
};
