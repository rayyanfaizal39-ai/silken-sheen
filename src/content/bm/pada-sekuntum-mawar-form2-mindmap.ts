import type { MindNode } from "@/components/MindMap";

// Content verified against the repository's Form 2 KOMSAS source and
// Sasbadi's anthology-aligned Tingkatan 2 analysis. Evidence stays deliberately short.
const PREFIX = "bm-f2-pada-sekuntum-mawar";

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
  situation: string,
  meaning: string,
  keyword: string,
): MindNode {
  return branch(id, label, [
    node(`${id}-situasi`, "Simbol / Situasi", situation),
    node(`${id}-maksud`, "Maksud Sebenar", meaning),
    node(`${id}-kata`, "Kata Kunci", keyword),
  ]);
}

function device(id: string, label: string, evidence: string, effect: string): MindNode {
  return branch(id, label, [
    node(`${id}-bukti`, "Bukti Ringkas", evidence),
    node(`${id}-kesan`, "Kesan", effect),
  ]);
}

export const bahasaMelayuTingkatan2PadaSekuntumMawarMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "PADA\nSEKUNTUM\nMAWAR",
  summary:
    "Sajak • Mahwa Mohamed • KOMSAS Tingkatan 2\n\nSajak menggunakan mawar sebagai lambang seorang gadis. Penyajak menegaskan kepentingan menjaga maruah, harga diri dan keimanan kerana keruntuhan diri bukan sahaja menjejaskan masa depan seseorang, malah membawa kesedihan kepada orang yang menyayanginya.",
  children: [
    branch("maksud-rangkap", "Maksud Rangkap", [
      stanza(
        "maksud-rangkap-1",
        "Rangkap 1 — Maruah Gadis dan Kesedihan Ibu",
        "Mawar melambangkan seorang gadis, manakala kelopak yang gugur melambangkan maruah atau harga diri yang tercemar.",
        "Apabila maruah anak gadis terjejas, ibunya berasa amat sedih dalam menghadapi hari tua.",
        "MAWAR = GADIS → KELOPAK GUGUR = MARUAH TERCEMAR → IBU BERSEDIH",
      ),
      stanza(
        "maksud-rangkap-2",
        "Rangkap 2 — Harapan Ibu Seakan Musnah",
        "Gambaran malam tanpa angin, laut tanpa ombak dan pintu kehidupan yang tertutup membina suasana sepi serta lara.",
        "Ibu merasakan segala harapan terhadap masa depan anaknya seakan-akan musnah apabila maruah anak gadisnya tercemar.",
        "MARUAH TERJEJAS → HARAPAN IBU MUSNAH → SEPI + LARA",
      ),
      branch("maksud-rangkap-2-konteks", "Emosi Sajak dan Kehidupan Sebenar", [
        node(
          "maksud-rangkap-2-konteks-sajak",
          "Emosi dalam Sajak",
          "Bahasa yang gelap dan sunyi menggambarkan keamatan kesedihan ibu, bukan hukum bahawa hidup seseorang telah tamat.",
        ),
        node(
          "maksud-rangkap-2-konteks-realiti",
          "Kemungkinan Pemulihan",
          "Dalam kehidupan sebenar, seseorang masih boleh mendapatkan bantuan, berubah dan membina semula masa depannya.",
        ),
      ]),
      stanza(
        "maksud-rangkap-3",
        "Rangkap 3 — Jaga Maruah dan Iman",
        "Mawar tidak sepatutnya berada di lembah, sebaliknya mahkotanya perlu diangkat ke puncak iman.",
        "Penyajak menasihati gadis supaya menjaga diri, maruah dan pegangan agama agar menjadi insan beriman serta dihormati.",
        "JAGA DIRI + JAGA MARUAH + IMAN → MARTABAT DIRI",
      ),
      node(
        "maksud-parafrasa",
        "Parafrasa, Bukan Salinan",
        "Maksud disampaikan dengan bahasa sendiri tanpa menyalin sajak penuh atau mencipta baris baharu.",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "KEPENTINGAN ANAK GADIS MENJAGA MARUAH DAN MARTABAT DIRI", [
        node(
          "tema-huraian",
          "Huraian",
          "Penyajak menasihati gadis supaya menjaga maruah, harga diri dan keimanan agar dihormati serta tidak menjejaskan masa depan sendiri dan perasaan keluarga.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema sajak Pada Sekuntum Mawar ialah kepentingan seorang gadis menjaga maruah dan martabat dirinya.",
        ),
        node(
          "tema-sempadan",
          "Bukan Tema Utama",
          "Kasih sayang dan kesedihan ibu ialah unsur penting, tetapi lebih sesuai dihuraikan sebagai persoalan dan emosi.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      supported(
        "persoalan-maruah",
        "Kepentingan Menjaga Maruah Diri",
        "Seseorang perlu memelihara harga diri dan kehormatannya.",
        "Rangkap 3 menasihati gadis supaya mengangkat martabat diri ke puncak iman.",
      ),
      supported(
        "persoalan-sedih",
        "Kesedihan Seorang Ibu",
        "Ibu berasa amat sedih apabila maruah dan masa depan anaknya terjejas.",
        "Rangkap 1 menghubungkan kelopak yang gugur dengan air mata ibu.",
      ),
      supported(
        "persoalan-harapan",
        "Harapan Ibu terhadap Anak",
        "Ibu mengharapkan anaknya menjalani kehidupan yang baik dan bermaruah.",
        "Rangkap 2 menggambarkan kehancuran harapan ibu melalui suasana sepi dan lara.",
      ),
      supported(
        "persoalan-kesan",
        "Kesan Perbuatan terhadap Masa Depan",
        "Pilihan yang tidak bertanggungjawab boleh memberikan kesan kepada kehidupan seseorang dan keluarganya.",
        "Rangkap 2 menggunakan imej pintu kehidupan yang seakan-akan tertutup.",
      ),
      supported(
        "persoalan-iman",
        "Kepentingan Keimanan",
        "Pegangan agama yang kukuh menjadi panduan untuk menjaga diri dan membuat keputusan.",
        "Rangkap 3 berakhir dengan imej puncak iman.",
      ),
      supported(
        "persoalan-kasih",
        "Kasih Sayang Ibu kepada Anak",
        "Kesedihan ibu berpunca daripada kasih dan harapannya terhadap masa depan anak.",
        "Rangkap 1 dan Rangkap 2 memusatkan air mata serta penderitaan emosi ibu.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node(
        "bentuk-identiti",
        "Identiti Karya",
        "Pada Sekuntum Mawar ialah puisi moden atau sajak karya Mahwa Mohamed dalam antologi Baik Budi, Indah Bahasa, Tingkatan 2.",
      ),
      node("bentuk-rangkap", "Tiga Rangkap", "Sajak terdiri daripada tiga rangkap."),
      node(
        "bentuk-baris",
        "Bilangan Baris Tidak Sama",
        "Rangkap 1 mempunyai tiga baris, Rangkap 2 enam baris dan Rangkap 3 lima baris.",
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
      node(
        "bentuk-rima",
        "Rima Akhir Bebas",
        "Rangkap 1: abb. Rangkap 2: abcdee. Rangkap 3: abcbd.",
      ),
      node(
        "bentuk-bebas",
        "Sajak Bebas",
        "Panjang rangkap dan pola rima tidak sama; sajak tidak terikat seperti pantun atau syair.",
      ),
      node(
        "bentuk-pembayang",
        "Tiada Pembayang",
        "Sajak tidak menggunakan struktur pembayang dan maksud seperti pantun.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      device(
        "gaya-metafora",
        "Metafora",
        "Frasa pendek: ‘lipatan usia’ dan ‘pintu kehidupan’.",
        "Metafora menjadikan usia dan perjalanan hidup lebih konkrit serta menegaskan kesedihan ibu.",
      ),
      device(
        "gaya-imej-alam",
        "Imej Alam",
        "Kata ringkas: malam, angin, laut, ombak, mawar dan lembah.",
        "Imej alam membina suasana suram dan menghasilkan kontras antara keindahan dengan kemusnahan.",
      ),
      device(
        "gaya-simile",
        "Simile",
        "Frasa pendek: ‘seperti telah menutup’.",
        "Perbandingan langsung menguatkan tanggapan ibu bahawa peluang kehidupan anaknya seakan-akan tertutup.",
      ),
      device(
        "gaya-sinkope",
        "Sinkope",
        "Perkataan singkat: ‘tak’.",
        "Bentuk singkat menghasilkan bahasa puitis yang padat dan semula jadi.",
      ),
      device(
        "gaya-asonansi",
        "Asonansi",
        "Pengulangan vokal u dalam frasa ‘bukan melontar harum indahmu’.",
        "Pengulangan vokal menghasilkan kemerduan dan menguatkan irama.",
      ),
      node(
        "gaya-had",
        "Had Bukti",
        "Gunakan teknik dan frasa pendek yang disahkan sahaja; jangan mencipta petikan atau menyalin rangkap penuh.",
      ),
    ]),
    branch("simbol-mawar", "Simbol Mawar", [
      node(
        "simbol-literal",
        "Makna Literal",
        "Mawar ialah bunga yang cantik dan mempunyai kelopak.",
      ),
      node("simbol-gadis", "Makna Simbolik", "MAWAR = GADIS."),
      node(
        "simbol-terpelihara",
        "Kelopak Terpelihara",
        "MAWAR TERPELIHARA → CANTIK + BERNILAI → MARUAH TERJAGA.",
      ),
      node(
        "simbol-gugur",
        "Kelopak Gugur",
        "KELOPAK GUGUR → KEROSAKAN / KEHILANGAN → MARUAH TERCEMAR.",
      ),
      node(
        "simbol-air-mata",
        "Air Mata Ibu",
        "AIR MATA IBU → KESEDIHAN apabila anak menghadapi masalah yang menjejaskan masa depan.",
      ),
      node(
        "simbol-puncak",
        "Mahkota dan Puncak",
        "MAHKOTA / PUNCAK → IMAN + MARTABAT yang perlu ditinggikan.",
      ),
      node(
        "simbol-batas",
        "Batas Tafsiran",
        "Ini ialah kerangka simbolik sajak. Nilai kemanusiaan seseorang tidak hilang secara kekal kerana satu kesilapan atau perkara buruk yang menimpanya.",
      ),
    ]),
    branch("maruah", "Maruah dan Harga Diri", [
      node(
        "maruah-makna",
        "Makna",
        "Maruah diri merangkumi harga diri, kehormatan, prinsip dan pilihan yang bertanggungjawab.",
      ),
      node(
        "maruah-hormat",
        "Hormati Diri",
        "Menghargai diri sendiri tanpa merendahkan orang lain.",
      ),
      node("maruah-tingkah", "Jaga Tingkah Laku", "Bertindak dengan sopan dan bertanggungjawab."),
      node(
        "maruah-pilihan",
        "Buat Pilihan Baik",
        "Memikirkan kesan keputusan terhadap diri dan masa depan.",
      ),
      node("maruah-batas", "Jaga Batas", "Menetapkan batas yang melindungi kesejahteraan diri."),
      node(
        "maruah-prinsip",
        "Pegang Prinsip",
        "Tidak meninggalkan nilai diri kerana tekanan orang lain.",
      ),
      node(
        "maruah-selamat",
        "Jaga Keselamatan",
        "Mendapatkan bantuan daripada orang dipercayai apabila berada dalam bahaya atau tekanan.",
      ),
      node(
        "maruah-mangsa",
        "Bukan Menyalahkan Mangsa",
        "Jika seseorang dicederakan atau dizalimi oleh orang lain, tanggungjawab terletak pada pihak yang melakukan perbuatan tersebut.",
      ),
      branch("maruah-analogi", "Analogi Murid: Pilihan Sukar", [
        node(
          "maruah-analogi-situasi",
          "Situasi",
          "Seorang murid ditawarkan pilihan yang boleh mencederakan diri, melanggar prinsip atau membawa kesan serius kepada masa depan.",
        ),
        node("maruah-analogi-soalan", "Soalan", "Apakah yang patut memandu keputusan murid itu?"),
        node(
          "maruah-analogi-jawapan",
          "Jawapan",
          "PRINSIP + KESELAMATAN + MASA DEPAN + NASIHAT ORANG DIPERCAYAI.",
        ),
        node(
          "maruah-analogi-kaitan",
          "Kaitan",
          "Inilah makna moden menjaga maruah dan harga diri: hormat diri, pilihan bijak dan nilai yang kukuh, bukan rasa malu.",
        ),
      ]),
    ]),
    branch("perasaan-ibu", "Perasaan Ibu", [
      node(
        "ibu-rangkap-1",
        "Rangkap 1 — Sedih",
        "Kelopak yang gugur disamakan dengan air mata ibu.",
      ),
      node(
        "ibu-rangkap-2",
        "Rangkap 2 — Kecewa, Lara dan Hilang Harapan",
        "Suasana malam dan laut yang tidak bergerak menggambarkan kekosongan serta kehancuran emosi ibu.",
      ),
      node(
        "ibu-asas",
        "Emosi Asas — Kasih Sayang",
        "Ibu sangat terkesan kerana menyayangi anak dan mengharapkan masa depan yang baik untuknya.",
      ),
      node(
        "ibu-bukan-benci",
        "Bukan Kebencian",
        "Sajak mengungkap penderitaan ibu, bukan mengajar bahawa kasih ibu harus hilang atau anak perlu ditinggalkan apabila melakukan kesilapan.",
      ),
      node(
        "ibu-rantaian",
        "Perkembangan Emosi",
        "IBU SAYANG ANAK → HARAP MASA DEPAN BAIK → ANAK MENGHADAPI MASALAH → IBU SEDIH DAN LARA.",
      ),
    ]),
    branch("nilai", "Nilai", [
      supported(
        "nilai-hemah",
        "Hemah Tinggi",
        "Menjaga tingkah laku dan maruah diri dengan baik.",
        "Rangkap 3 menasihati gadis supaya menjaga diri dan martabat.",
      ),
      supported(
        "nilai-kasih",
        "Kasih Sayang",
        "Ibu mengambil berat tentang anak dan masa depannya.",
        "Rangkap 1 dan Rangkap 2 menggambarkan air mata serta kesedihan ibu.",
      ),
      supported(
        "nilai-waspada",
        "Berwaspada",
        "Seseorang perlu berhati-hati dalam tingkah laku dan pilihan.",
        "Rangkap 3 mengingatkan gadis supaya tidak membiarkan maruahnya tercemar.",
      ),
      supported(
        "nilai-sedar",
        "Kesedaran",
        "Memahami bahawa tindakan boleh memberikan kesan kepada diri dan keluarga.",
        "Perubahan daripada kelopak gugur kepada nasihat pada Rangkap 3 menunjukkan kesedaran tentang akibat.",
      ),
      supported(
        "nilai-rasional",
        "Rasional",
        "Berfikir sebelum membuat keputusan yang boleh menjejaskan masa depan.",
        "Rangkap 3 menyeru pembaca memilih jalan yang mengangkat martabat diri.",
      ),
      supported(
        "nilai-iman",
        "Keimanan",
        "Pegangan agama membimbing seseorang menjaga diri dan maruah.",
        "Rangkap 3 menggunakan imej puncak iman sebagai matlamat.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-maruah",
        "Kita Hendaklah Menjaga Maruah Diri",
        "Kita hendaklah menghormati diri dan membuat pilihan yang bertanggungjawab.",
      ),
      node(
        "pengajaran-ibu",
        "Kita Hendaklah Menjaga Hati Ibu",
        "Kita hendaklah menghargai kasih sayang dan harapan ibu.",
      ),
      node(
        "pengajaran-waspada",
        "Kita Hendaklah Menjaga Diri",
        "Kita hendaklah berwaspada agar tidak terlibat dalam perkara yang memudaratkan kehidupan.",
      ),
      node(
        "pengajaran-fikir",
        "Kita Hendaklah Berfikir Sebelum Bertindak",
        "Kita hendaklah mempertimbangkan kesan pilihan terhadap keselamatan dan masa depan.",
      ),
      node(
        "pengajaran-nasihat",
        "Kita Hendaklah Mendengar Nasihat yang Baik",
        "Panduan orang yang dipercayai dapat membantu kita mengelakkan pilihan yang berbahaya.",
      ),
      node(
        "pengajaran-iman",
        "Kita Hendaklah Mengukuhkan Keimanan",
        "Kita hendaklah menjadikan iman dan nilai baik sebagai panduan menjaga maruah diri.",
      ),
    ]),
    branch("nada", "Nada", [
      node(
        "nada-melankolik",
        "MELANKOLIK",
        "Nada sajak ialah melankolik kerana menggambarkan kesedihan dan kepiluan ibu apabila maruah serta masa depan anak gadisnya terjejas.",
      ),
      node(
        "nada-bukti",
        "Bukti Suasana",
        "Air mata, malam tanpa angin, laut tanpa ombak, sepi dan lara membina suasana sedih.",
      ),
      node(
        "nada-beza",
        "Nada Bukan Pengajaran",
        "Sajak mengandungi nasihat, tetapi klasifikasi nadanya ialah melankolik; ‘sedih’ pula ialah perasaan ibu.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node(
        "kata-rantaian",
        "Rantaian Ingatan",
        "MAWAR → GADIS → KELOPAK GUGUR → MARUAH TERJEJAS → IBU SEDIH → NASIHAT → JAGA DIRI + IMAN.",
      ),
      node("kata-empat", "Empat Kata", "MAWAR → MARUAH → IBU → IMAN."),
      node(
        "kata-simbol",
        "Peta Simbol",
        "MAWAR = GADIS; KELOPAK GUGUR = MARUAH TERCEMAR; PUNCAK IMAN = MARTABAT DIRI.",
      ),
      node("kata-formula", "Formula Akhir", "MARUAH + IMAN + PILIHAN BIJAK = MARTABAT DIRI."),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node("jawab-maksud", "Maksud Rangkap", "SIMBOL / SITUASI + MAKSUD SEBENAR."),
      node("jawab-tema", "Tema", "SIAPA + APA YANG PERLU DIJAGA."),
      node("jawab-persoalan", "Persoalan", "ISU + RANGKAP ATAU IDEA SOKONGAN."),
      node("jawab-nilai", "Nilai", "NILAI + BUKTI IDEA."),
      node("jawab-pengajaran", "Pengajaran", "‘Kita hendaklah...’ + TINDAKAN."),
      node("jawab-nada", "Nada", "MELANKOLIK + BUKTI SUASANA SEDIH."),
      node("jawab-gaya", "Gaya Bahasa", "TEKNIK + BUKTI PENDEK + KESAN."),
      node("jawab-simbol", "Simbol", "OBJEK = MAKSUD TERSIRAT; contohnya, MAWAR = GADIS."),
      node(
        "jawab-bukti",
        "Bukti Teks",
        "Gunakan frasa pendek yang tepat; jangan mereka petikan atau menyalin keseluruhan rangkap.",
      ),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "salah-bunga",
        "Mawar = Bunga Sahaja",
        "Salah. Mawar berfungsi sebagai lambang seorang gadis.",
      ),
      node(
        "salah-gugur",
        "Kelopak Gugur = Bunga Layu Sahaja",
        "Terlalu literal. Kelopak gugur melambangkan maruah yang tercemar.",
      ),
      node(
        "salah-tema-ibu",
        "Tema = Kesedihan Ibu",
        "Terlalu sempit. Kesedihan ibu ialah persoalan dan emosi; tema berfokus pada menjaga maruah gadis.",
      ),
      node(
        "salah-tema-bunga",
        "Tema = Bunga Mawar",
        "Salah. Bunga mawar ialah simbol, bukannya tema.",
      ),
      node(
        "salah-benci",
        "Rangkap 2 = Ibu Membenci Anak",
        "Salah. Emosi ibu berasaskan kasih sayang, kesedihan dan harapan terhadap anak.",
      ),
      node(
        "salah-tamat",
        "Kesilapan = Hidup Tamat",
        "Salah sebagai nasihat kehidupan. Kesilapan mempunyai kesan, tetapi manusia masih boleh mendapatkan bantuan, berubah dan memperbaiki diri.",
      ),
      node(
        "salah-reputasi",
        "Maruah = Pandangan Orang Sahaja",
        "Terlalu sempit. Maruah turut merangkumi hormat diri, prinsip, keselamatan dan pilihan bertanggungjawab.",
      ),
      node(
        "salah-mangsa",
        "Mangsa Mesti Dipersalahkan",
        "Salah. Pihak yang melakukan perbuatan yang mencederakan atau menzalimi orang lain bertanggungjawab atas perbuatannya.",
      ),
      node(
        "salah-nilai",
        "Nilai = Pengajaran",
        "Bezakan bentuk jawapan. Nilai: keimanan. Pengajaran: Kita hendaklah mengukuhkan iman sebagai panduan hidup.",
      ),
      node(
        "salah-pantun",
        "Sajak = Pantun",
        "Salah. Karya ini ialah sajak bebas tanpa struktur pembayang dan maksud.",
      ),
      node(
        "salah-rima",
        "Rima = abc / abcdef / abcbd",
        "Tidak tepat. Rima berdasarkan teks ialah abb / abcdee / abcbd.",
      ),
      node(
        "salah-reka",
        "Mencipta Petikan",
        "Jangan mereka bukti teks. Gunakan hanya frasa pendek yang telah disahkan.",
      ),
    ]),
  ],
};
