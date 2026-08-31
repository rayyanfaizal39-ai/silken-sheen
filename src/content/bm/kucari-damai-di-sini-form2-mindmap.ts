import type { MindNode } from "@/components/MindMap";

// Content verified against the repository's Form 2 KOMSAS source and
// Sasbadi's anthology-aligned Tingkatan 2 analysis. Quotes stay deliberately short.
const PREFIX = "bm-f2-kucari-damai-di-sini";

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
    node(`${id}-berlaku`, "Apa yang Dicari / Diharapkan", event),
    node(`${id}-maksud`, "Maksud Tersirat", meaning),
    node(`${id}-kata`, "Kata Kunci", keyword),
  ]);
}

function device(id: string, label: string, evidence: string, effect: string): MindNode {
  return branch(id, label, [
    node(`${id}-bukti`, "Bukti Ringkas", evidence),
    node(`${id}-kesan`, "Kesan", effect),
  ]);
}

export const bahasaMelayuTingkatan2KucariDamaiDiSiniMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KUCARI DAMAI\nDI SINI",
  summary:
    "Sajak • A. Hamid Jemain • KOMSAS Tingkatan 2\n\nSajak menggambarkan usaha mencari dan mengekalkan kedamaian di tanah air melalui persaudaraan, kasih sayang, jati diri, kemanusiaan dan rasa cinta kepada negara supaya keamanan dapat diwarisi oleh generasi akan datang.",
  children: [
    branch("maksud-rangkap", "Maksud Rangkap", [
      stanza(
        "maksud-rangkap-1",
        "Rangkap 1 — Mencari Kedamaian di Tanah Air",
        "Penyajak mencari kedamaian di negaranya yang subur, makmur dan merdeka.",
        "Kemerdekaan sahaja tidak menjamin keharmonian. Perasaan negatif perlu diatasi dengan sejarah persaudaraan, sangka baik dan nilai kemanusiaan.",
        "TANAH AIR → MERDEKA + PERSAUDARAAN + KEMANUSIAAN → DAMAI",
      ),
      stanza(
        "maksud-rangkap-2",
        "Rangkap 2 — Cinta dan Jati Diri",
        "Penyajak mencari kedamaian melalui cinta, jati diri dan kasih sayang yang tertanam dalam jiwa.",
        "Kedamaian lahir apabila rakyat memiliki keperibadian mulia dan memupuk kasih sayang yang tulen.",
        "CINTA + JATI DIRI + KASIH SAYANG → DAMAI",
      ),
      branch("maksud-jati-diri", "Jati Diri", [
        node(
          "maksud-jati-diri-makna",
          "Maksud",
          "Jati diri ialah identiti, prinsip, nilai diri dan kesedaran sebagai anggota masyarakat serta negara; bukan keyakinan diri semata-mata.",
        ),
      ]),
      stanza(
        "maksud-rangkap-3",
        "Rangkap 3 — Keamanan untuk Masa Depan",
        "Penyajak berharap kedamaian dan kemerdekaan negara terus berkekalan sepanjang zaman.",
        "Masalah perlu diselesaikan dengan bijaksana supaya kejayaan negara menjadi kebanggaan dan warisan generasi akan datang.",
        "AMAN → DIPELIHARA → KEBANGGAAN → GENERASI MASA DEPAN",
      ),
      node(
        "maksud-parafrasa",
        "Parafrasa, Bukan Salinan",
        "Semua maksud dihuraikan dengan bahasa sendiri tanpa menyalin sajak penuh atau mencipta baris baharu.",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "PENGHARGAAN TERHADAP KEDAMAIAN DAN KESEJAHTERAAN NEGARA", [
        node(
          "tema-huraian",
          "Huraian",
          "Penyajak menghargai kedamaian di tanah air merdeka dan menunjukkan bahawa keharmonian perlu dipelihara melalui persaudaraan, kasih sayang, jati diri serta cinta akan negara.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema sajak Kucari Damai di Sini ialah penghargaan terhadap kedamaian dan kesejahteraan negara yang perlu dipelihara melalui persaudaraan, kasih sayang dan jati diri.",
        ),
        node("tema-kata", "Formula Tema", "KEDAMAIAN NEGARA + CARA MEMELIHARANYA."),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      supported(
        "persoalan-usaha",
        "Kedamaian Memerlukan Usaha",
        "Kedamaian tidak datang dengan sendirinya dan perlu dibina oleh masyarakat.",
        "Rangkap 1 menghubungkan kemerdekaan dengan persaudaraan dan kemanusiaan.",
      ),
      supported(
        "persoalan-makmur",
        "Keamanan dan Kemakmuran Negara",
        "Rakyat perlu menghargai tanah air yang aman, subur, makmur dan merdeka.",
        "Rangkap 1 menggambarkan keadaan tanah air yang dinikmati penyajak.",
      ),
      supported(
        "persoalan-merdeka",
        "Perjuangan Mengekalkan Kemerdekaan",
        "Kemerdekaan perlu dihargai dan dipelihara supaya negara terus maju.",
        "Rangkap 1 dan Rangkap 3 mengaitkan kemerdekaan dengan kedamaian berpanjangan.",
      ),
      supported(
        "persoalan-kasih",
        "Kasih Sayang Membina Kedamaian",
        "Hubungan yang berasaskan kasih sayang membantu membentuk masyarakat harmoni.",
        "Rangkap 2 menghubungkan cinta, jati diri, kasih sayang dan naluri.",
      ),
      supported(
        "persoalan-jati",
        "Kepentingan Jati Diri",
        "Identiti dan nilai diri yang kukuh membantu rakyat menyumbang kepada keharmonian negara.",
        "Rangkap 2 menampilkan cinta dan jati diri yang tumbuh dalam jiwa.",
      ),
      supported(
        "persoalan-generasi",
        "Keamanan untuk Generasi Akan Datang",
        "Kejayaan serta kedamaian negara perlu dipelihara sebagai warisan masa depan.",
        "Rangkap 3 menyatakan harapan agar kegemilangan menjadi kebanggaan generasi seterusnya.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node(
        "bentuk-identiti",
        "Identiti Karya",
        "Kucari Damai di Sini ialah puisi moden atau sajak karya A. Hamid Jemain dalam antologi Baik Budi, Indah Bahasa, Tingkatan 2.",
      ),
      node("bentuk-rangkap", "Tiga Rangkap", "Sajak terdiri daripada tiga rangkap."),
      node(
        "bentuk-baris",
        "Bilangan Baris Berbeza",
        "Rangkap 1 mempunyai enam baris, Rangkap 2 lima baris dan Rangkap 3 empat baris.",
      ),
      node(
        "bentuk-kata",
        "Tiga hingga Lapan Patah Kata",
        "Setiap baris mengandungi antara tiga hingga lapan patah kata.",
      ),
      node(
        "bentuk-suku",
        "Enam hingga Lapan Belas Suku Kata",
        "Setiap baris mengandungi antara enam hingga lapan belas suku kata.",
      ),
      node(
        "bentuk-rima",
        "Rima Akhir Bebas",
        "Rangkap 1: abaccc. Rangkap 2: aabca. Rangkap 3: abbb.",
      ),
      node(
        "bentuk-bebas",
        "Sajak Bebas",
        "Panjang rangkap dan pola rima berbeza; sajak tidak terikat seperti pantun atau syair.",
      ),
      node(
        "bentuk-pembayang",
        "Tiada Pembayang",
        "Sajak tidak menggunakan struktur pembayang dan maksud seperti pantun.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      device(
        "gaya-paradoks",
        "Paradoks",
        "Frasa pendek: ‘antara realiti dan mimpi’.",
        "Pertentangan yang kelihatan membantu menggambarkan ketegangan antara kedamaian sebenar dengan kedamaian yang masih diimpikan.",
      ),
      device(
        "gaya-hiperbola",
        "Hiperbola",
        "Frasa pendek: ‘membebat perasaan kehidupan’.",
        "Gambaran yang diperbesar menegaskan usaha merawat konflik dan perasaan dalam kehidupan.",
      ),
      device(
        "gaya-metafora",
        "Metafora",
        "Frasa pendek: ‘laman sukma’.",
        "Metafora merujuk ruang batin atau jiwa tempat cinta dan jati diri berkembang.",
      ),
      device(
        "gaya-repetisi",
        "Repetisi",
        "Frasa ‘Kucari damai di sini’ diulang pada awal Rangkap 1 dan Rangkap 2.",
        "Pengulangan menegaskan pencarian kedamaian sebagai gagasan utama.",
      ),
      device(
        "gaya-asonansi",
        "Asonansi",
        "Pengulangan vokal a dalam frasa ‘dengan sejarah persaudaraan’.",
        "Pengulangan vokal menghasilkan kemerduan dan menguatkan irama.",
      ),
      device(
        "gaya-aliterasi",
        "Aliterasi",
        "Pengulangan konsonan d dalam frasa ‘Kucari damai di sini’.",
        "Pengulangan konsonan memberikan penegasan bunyi pada idea damai.",
      ),
      node(
        "gaya-had",
        "Had Bukti",
        "Gunakan teknik dan frasa pendek yang telah disahkan sahaja; jangan mencipta petikan atau menyalin rangkap penuh.",
      ),
    ]),
    branch("maksud-damai", "Maksud “Damai”", [
      node(
        "damai-bukan",
        "Bukan Tiada Perang Sahaja",
        "Dalam sajak, damai merangkumi keadaan negara dan mutu hubungan antara manusia.",
      ),
      node("damai-aman", "Aman", "Kehidupan masyarakat tidak diganggu ancaman dan konflik."),
      node("damai-harmoni", "Harmoni", "Masyarakat hidup dengan hubungan yang baik."),
      node(
        "damai-saudara",
        "Persaudaraan",
        "Sejarah hubungan yang akrab menyatukan manusia, bukan memecahkan mereka.",
      ),
      node("damai-kasih", "Kasih Sayang", "Masyarakat mengambil berat antara satu sama lain."),
      node("damai-manusia", "Kemanusiaan", "Maruah dan kesejahteraan setiap manusia dihormati."),
      node(
        "damai-faham",
        "Persefahaman",
        "Perbezaan dan masalah diurus secara bijaksana serta membina.",
      ),
      node(
        "damai-peta",
        "Peta Makna",
        "DAMAI = AMAN + HARMONI + PERSAUDARAAN + KASIH SAYANG + KEMANUSIAAN + PERSEFAHAMAN.",
      ),
      branch("damai-analogi", "Analogi Moden: Sekolah Harmoni", [
        node(
          "damai-analogi-situasi",
          "Bayangkan",
          "Sebuah sekolah mempunyai murid daripada kaum, latar belakang dan pandangan yang berbeza.",
        ),
        node(
          "damai-analogi-soalan",
          "Soalan",
          "Adakah sekolah itu benar-benar damai hanya kerana tiada pergaduhan?",
        ),
        node(
          "damai-analogi-jawapan",
          "Jawapan",
          "Belum lengkap. Keharmonian juga memerlukan HORMAT + PERSEFAHAMAN + KASIH SAYANG + KERJASAMA.",
        ),
        node(
          "damai-analogi-had",
          "Batas Analogi",
          "Sekolah harmoni ialah analogi moden berskala kecil untuk memahami masyarakat harmoni; situasi sekolah tidak berlaku dalam sajak.",
        ),
      ]),
    ]),
    branch("patriotisme", "Patriotisme", [
      node(
        "patriot-makna",
        "Cinta Negara melalui Tindakan",
        "Patriotisme dalam sajak bukan sekadar bendera, lagu atau upacara. Cinta negara dibuktikan dengan menjaga keharmonian.",
      ),
      node("patriot-aman", "Menjaga Keamanan", "Berusaha memastikan kehidupan negara kekal aman."),
      node(
        "patriot-saudara",
        "Menjaga Persaudaraan",
        "Memelihara hubungan baik dan mengelakkan perpecahan.",
      ),
      node(
        "patriot-jati",
        "Memupuk Jati Diri",
        "Membina identiti, prinsip dan nilai sebagai warganegara.",
      ),
      node(
        "patriot-sejarah",
        "Menghormati Sejarah",
        "Menghargai pengalaman persaudaraan dan pencapaian negara.",
      ),
      node(
        "patriot-merdeka",
        "Memelihara Kemerdekaan",
        "Menghargai kebebasan dan tidak menganggapnya terjamin tanpa usaha.",
      ),
      node(
        "patriot-masa",
        "Membina Masa Depan",
        "Menjaga negara supaya keamanan dapat diwarisi generasi akan datang.",
      ),
      node(
        "patriot-peta",
        "Peta Patriotisme",
        "CINTA NEGARA → JAGA KEHARMONIAN → KEKALKAN KEAMANAN → WARISKAN MASA DEPAN.",
      ),
    ]),
    branch("nilai", "Nilai", [
      supported(
        "nilai-syukur",
        "Kesyukuran",
        "Menghargai kedamaian, kemakmuran dan kemerdekaan negara.",
        "Rangkap 1 menggambarkan tanah air yang subur, makmur dan merdeka.",
      ),
      supported(
        "nilai-hormat",
        "Hormat-menghormati",
        "Menghormati orang lain menjadi asas hubungan masyarakat yang harmoni.",
        "Rangkap 1 menonjolkan persaudaraan dan naluri kemanusiaan.",
      ),
      supported(
        "nilai-patriot",
        "Patriotisme",
        "Mencintai negara dan berusaha mengekalkan kemerdekaan serta kedamaiannya.",
        "Keseluruhan sajak menampilkan cinta tanah air dan harapan untuk negara.",
      ),
      supported(
        "nilai-insaf",
        "Keinsafan",
        "Menyedari bahawa kedamaian perlu diusahakan dan dipelihara.",
        "Perjalanan tiga rangkap bergerak daripada mencari damai kepada menjaganya untuk masa depan.",
      ),
      supported(
        "nilai-tanggungjawab",
        "Tanggungjawab",
        "Rakyat bertanggungjawab mengekalkan keamanan dan memajukan negara.",
        "Rangkap 3 menghubungkan kegemilangan hari ini dengan generasi akan datang.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-usaha",
        "Kita Mestilah Berusaha Mendapatkan dan Mengekalkan Kedamaian",
        "Kedamaian tidak hadir atau berkekalan tanpa usaha masyarakat.",
      ),
      node(
        "pengajaran-merdeka",
        "Kita Hendaklah Menghargai Kemerdekaan Negara",
        "Kemerdekaan membolehkan rakyat membina kemakmuran dan kehidupan yang sejahtera.",
      ),
      node(
        "pengajaran-kekal",
        "Kita Hendaklah Memastikan Kedamaian Terus Berkekalan",
        "Hubungan harmoni perlu sentiasa dipupuk dan dipelihara.",
      ),
      node(
        "pengajaran-bijak",
        "Kita Hendaklah Menyelesaikan Krisis dengan Bijaksana",
        "Masalah dan perbezaan perlu ditangani tanpa merosakkan keamanan.",
      ),
      node(
        "pengajaran-generasi",
        "Kita Hendaklah Menjaga Negara untuk Generasi Akan Datang",
        "Tindakan hari ini menentukan keamanan yang bakal diwarisi.",
      ),
    ]),
    branch("nada", "Nada", [
      node(
        "nada-patriotik",
        "PATRIOTIK",
        "Nada sajak ialah patriotik kerana penyajak menampilkan cinta akan tanah air, penghargaan terhadap kemerdekaan dan harapan agar kegemilangan negara berkekalan.",
      ),
      node("nada-formula", "Formula Nada", "CINTA NEGARA + HARAPAN + KEBANGGAAN."),
      node(
        "nada-jawapan",
        "Jawapan Murid",
        "Sajak bernada patriotik kerana penyajak mencintai tanah air dan berharap kedamaian negara berkekalan untuk generasi masa depan.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node(
        "kata-rantaian",
        "Rantaian Ingatan",
        "MERDEKA → PERSAUDARAAN → KEMANUSIAAN → CINTA → JATI DIRI → KASIH SAYANG → DAMAI → MASA DEPAN.",
      ),
      node(
        "kata-formula",
        "Formula Damai",
        "DAMAI = PERSAUDARAAN + JATI DIRI + KASIH SAYANG + PATRIOTISME.",
      ),
      node(
        "kata-memori",
        "Peta Memori",
        "TANAH AIR → MERDEKA, TETAPI MERDEKA SAHAJA ≠ DAMAI → BINA PERSAUDARAAN + KEMANUSIAAN + CINTA → DAMAI → KEBANGGAAN → GENERASI MASA DEPAN.",
      ),
      node("kata-teras", "Mesej Teras", "DAMAI PERLU DIBINA DAN DIPELIHARA."),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node("jawab-maksud", "Maksud Rangkap", "APA YANG DICARI ATAU DIHARAPKAN + CARA MENCAPAINYA."),
      node("jawab-tema", "Tema", "KEDAMAIAN NEGARA + CARA MEMELIHARANYA."),
      node("jawab-persoalan", "Persoalan", "ISU + RANGKAP ATAU IDEA SOKONGAN."),
      node("jawab-nilai", "Nilai", "NILAI + BUKTI IDEA."),
      node("jawab-pengajaran", "Pengajaran", "‘Kita hendaklah...’ + TINDAKAN."),
      node("jawab-nada", "Nada", "NADA PATRIOTIK + BUKTI CINTA NEGARA ATAU HARAPAN."),
      node("jawab-bentuk", "Bentuk", "CIRI SAJAK + BUKTI STRUKTUR."),
      node("jawab-gaya", "Gaya Bahasa", "TEKNIK + BUKTI PENDEK + KESAN."),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "kesalahan-damai",
        "Damai = Tiada Perang Sahaja",
        "Terlalu sempit. Damai turut merangkumi keharmonian, persaudaraan, kemanusiaan, kasih sayang dan persefahaman.",
      ),
      node(
        "kesalahan-merdeka",
        "Merdeka = Automatik Damai",
        "Salah. Kemerdekaan perlu disertai hubungan sosial yang baik dan usaha mengekalkan keamanan.",
      ),
      node(
        "kesalahan-tema",
        "Tema = Kemerdekaan",
        "Terlalu sempit. Tema utama ialah penghargaan terhadap kedamaian dan kesejahteraan negara.",
      ),
      node(
        "kesalahan-patriot",
        "Patriotisme = Mengibarkan Bendera Sahaja",
        "Terlalu sempit. Patriotisme juga melibatkan menjaga keamanan, persaudaraan, jati diri dan masa depan negara.",
      ),
      node(
        "kesalahan-jati",
        "Jati Diri = Keyakinan Diri Sahaja",
        "Terlalu sempit. Jati diri merangkumi identiti, prinsip, nilai dan kesedaran sebagai warganegara.",
      ),
      node(
        "kesalahan-sejarah",
        "Rangkap 3 = Sejarah Lama Sahaja",
        "Salah. Rangkap terakhir memandang ke hadapan kepada generasi masa depan.",
      ),
      node(
        "kesalahan-pantun",
        "Sajak = Pantun",
        "Salah. Karya ini ialah sajak bebas tanpa struktur pembayang dan maksud.",
      ),
      node(
        "kesalahan-panjang",
        "Semua Rangkap Sama Panjang",
        "Salah. Tiga rangkap mempunyai enam, lima dan empat baris.",
      ),
      node(
        "kesalahan-nilai",
        "Nilai = Pengajaran",
        "Bezakan bentuk jawapan. Nilai: patriotisme. Pengajaran: Kita hendaklah mencintai dan menjaga keamanan negara.",
      ),
      node(
        "kesalahan-gaya",
        "Mencipta Gaya Bahasa",
        "Jangan mereka bukti teks. Gunakan hanya teknik dan frasa pendek yang telah disahkan.",
      ),
      node(
        "kesalahan-analogi",
        "Analogi Sekolah Berlaku dalam Sajak",
        "Salah. Situasi sekolah ialah analogi moden untuk pembelajaran, bukan latar sajak.",
      ),
    ]),
  ],
};
