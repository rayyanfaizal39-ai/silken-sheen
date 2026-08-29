import type { MindNode } from "@/components/MindMap";

// Content checked against the repository's existing Form 2 KOMSAS analysis,
// Sasbadi KOMSAS notes, and anthology-aligned reproductions of the prescribed text.
const PREFIX = "bm-f2-dalam-persekitaran-kata-kata";

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
    node(`${id}-sokongan`, "Idea / Bahagian Sokongan", support),
  ]);
}

function section(
  id: string,
  label: string,
  meaning: string,
  mainIdea: string,
  keyword: string,
): MindNode {
  return branch(id, label, [
    node(`${id}-maksud`, "Maksud Mudah", meaning),
    node(`${id}-idea`, "Idea Utama", mainIdea),
    node(`${id}-kata`, "Kata Kunci", keyword),
  ]);
}

export const bahasaMelayuTingkatan2DalamPersekitaranKataKataMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "DALAM\nPERSEKITARAN\nKATA-KATA",
  summary:
    "Sajak menonjolkan bahasa dan kebolehan berkata-kata sebagai anugerah Tuhan. Melalui bahasa, manusia dapat menyampaikan makna, memperoleh ilmu, memahami alam dan mengembangkan kehidupan serta tamadun.",
  children: [
    branch("maksud-bahagian", "Maksud Bahagian", [
      section(
        "maksud-epigraf",
        "Pembuka / Epigraf al-Quran",
        "Tuhan mencipta manusia dan mengurniakan kebolehan untuk berbicara. Kebolehan berbahasa ialah anugerah besar, bukan sekadar kemahiran biasa.",
        "TUHAN → MANUSIA → BAHASA.",
        "ANUGERAH",
      ),
      section(
        "maksud-rangkap-1",
        "Rangkap 1 — Kata-kata dan Akal",
        "Tuhan mengurniakan kata-kata dan akal kepada manusia. Bahasa membolehkan makna serta idea disampaikan merentas tempat dan zaman.",
        "AKAL + BAHASA → MAKNA → TEMPAT DAN ZAMAN.",
        "MAKNA",
      ),
      section(
        "maksud-rangkap-2",
        "Rangkap 2 — Bangsa dan Pengembaraan",
        "Penyajak menggambarkan bangsanya yang beridentiti tersendiri sebagai pelayar yang mengembara merentasi samudera, pulau dan pantai semenanjung.",
        "BANGSA → MENGEMBARA → MENEROKA.",
        "PELAYAR",
      ),
      section(
        "maksud-rangkap-3",
        "Rangkap 3 — Alam Menjadi Sumber Ilmu",
        "Manusia menggunakan kata-kata untuk menamakan dan mentafsir alam. Pembacaan kitab serta penelitian ciptaan Tuhan membantu manusia memperoleh ilmu dan menjernihkan pemahaman.",
        "ALAM → KATA-KATA → ILMU → TAFSIRAN.",
        "ILMU",
      ),
      section(
        "maksud-rangkap-4",
        "Rangkap 4 — Bahasa Memahami Kehidupan",
        "Bahasa mengembangkan pengalaman manusia dan membantu manusia memahami makna kehidupan serta kewujudan alam.",
        "BAHASA + ILMU → PENGALAMAN → FAHAM KEHIDUPAN.",
        "KEWUJUDAN",
      ),
      node(
        "maksud-konvensyen",
        "Konvensyen Bahagian",
        "Peta ini membezakan pembuka al-Quran daripada empat rangkap karya Baha Zain. Sesetengah nota mengira pembuka itu sebagai rangkap pertama lalu menyatakan lima rangkap.",
      ),
      node(
        "maksud-had",
        "Parafrasa, Bukan Salinan",
        "Semua maksud dihuraikan dengan bahasa sendiri tanpa menghasilkan semula sajak penuh.",
      ),
    ]),
    branch("tema", "Tema", [
      branch("tema-utama", "KEPENTINGAN BAHASA SEBAGAI ANUGERAH TUHAN DALAM KEHIDUPAN MANUSIA", [
        node(
          "tema-huraian",
          "Huraian",
          "Bahasa yang dikurniakan Tuhan membolehkan manusia berfikir, menyampaikan makna, memperoleh ilmu, memahami alam dan mengembangkan kehidupan dari satu generasi kepada generasi yang lain.",
        ),
        node(
          "tema-jawapan",
          "Jawapan Murid",
          "Tema sajak Dalam Persekitaran Kata-kata ialah kepentingan bahasa sebagai anugerah Tuhan kepada manusia. Bahasa membolehkan manusia menyampaikan ilmu, memahami alam dan mengembangkan kehidupan.",
        ),
        node(
          "tema-perbandingan",
          "Mengapa Tema Ini Dipilih",
          "Tema ini menyatukan dua rumusan rujukan—kesyukuran atas anugerah Tuhan serta manusia dan alam sebagai ciptaan-Nya—dengan imej bahasa yang berulang sepanjang sajak.",
        ),
      ]),
    ]),
    branch("persoalan", "Persoalan", [
      supported(
        "persoalan-anugerah",
        "Bahasa sebagai Anugerah Tuhan",
        "Manusia dikurniakan kebolehan berbahasa dan berfikir.",
        "Epigraf dan Rangkap 1 menghubungkan Tuhan, akal serta kata-kata.",
      ),
      supported(
        "persoalan-akal",
        "Kepentingan Akal",
        "Akal membolehkan manusia menggunakan bahasa untuk menyampaikan idea dengan bermakna.",
        "Rangkap 1 menyatukan akal, ujaran dan pemindahan makna.",
      ),
      supported(
        "persoalan-zaman",
        "Bahasa Merentasi Tempat dan Zaman",
        "Makna dan pengetahuan dapat diwariskan merentasi ruang serta generasi.",
        "Rangkap 1 menggambarkan pemindahan makna dari satu tempat dan zaman kepada yang lain.",
      ),
      supported(
        "persoalan-identiti",
        "Identiti Bangsa",
        "Pengalaman bahasa, budaya dan sejarah membantu membentuk identiti bersama.",
        "Rangkap 2 menggambarkan bangsa penyajak melalui imej budaya dan pengembaraan.",
      ),
      supported(
        "persoalan-pelayar",
        "Bangsa Melayu sebagai Bangsa Pelayar",
        "Masyarakat Melayu dahulu berani mengembara dan meneroka wilayah maritim.",
        "Rangkap 2 menyebut perjalanan merentasi samudera, pulau dan pantai semenanjung.",
      ),
      supported(
        "persoalan-alam",
        "Alam sebagai Sumber Pengetahuan",
        "Pemerhatian dan penamaan unsur alam membuka peluang untuk belajar serta mentafsir ciptaan.",
        "Rangkap 3 menghubungkan persekitaran alam dengan istilah, takrif dan tafsiran.",
      ),
      supported(
        "persoalan-membaca",
        "Kepentingan Membaca",
        "Teks dan kitab menyimpan pengetahuan yang dapat dipelajari oleh generasi kemudian.",
        "Rangkap 3 mengaitkan pembacaan kitab lama dengan ilmu dan pemahaman.",
      ),
      supported(
        "persoalan-tuhan",
        "Hubungan Manusia dengan Tuhan",
        "Pemahaman terhadap bahasa dan alam menyedarkan manusia tentang Pencipta.",
        "Epigraf serta Rangkap 3 menghubungkan anugerah bahasa, alam dan keimanan.",
      ),
      supported(
        "persoalan-kehidupan",
        "Bahasa Membantu Memahami Kehidupan",
        "Bahasa membolehkan pengalaman ditafsir supaya kewujudan lebih bermakna.",
        "Rangkap 4 merumuskan hubungan kata-kata, pengalaman dan kewujudan.",
      ),
    ]),
    branch("bentuk", "Bentuk", [
      node(
        "bentuk-identiti",
        "Identiti Karya",
        "Dalam Persekitaran Kata-kata ialah sajak atau puisi moden karya Baha Zain dalam antologi Baik Budi, Indah Bahasa, Tingkatan 2.",
      ),
      node(
        "bentuk-konvensyen",
        "Epigraf + Empat Rangkap",
        "Petikan al-Quran menjadi pembuka yang berasingan, diikuti empat rangkap karya penyajak.",
      ),
      node(
        "bentuk-epigraf",
        "Epigraf al-Quran",
        "Pembuka dua baris dipetik daripada Surah ar-Rahman, ayat 3–4 dan tidak dikira dalam pola rangkap karya Baha Zain.",
      ),
      node("bentuk-rangkap-1", "Rangkap 1", "Lima baris dengan rima akhir aaabc."),
      node("bentuk-rangkap-2", "Rangkap 2", "Lima baris dengan rima akhir abccd."),
      node("bentuk-rangkap-3", "Rangkap 3", "Sembilan baris dengan rima akhir abcaaadda."),
      node("bentuk-rangkap-4", "Rangkap 4", "Tiga baris dengan rima akhir aba."),
      node(
        "bentuk-kata",
        "Dua hingga Empat Patah Kata",
        "Baris-baris sajak mengandungi antara dua hingga empat patah kata.",
      ),
      node(
        "bentuk-suku",
        "Lapan hingga Tiga Belas Suku Kata",
        "Baris-baris sajak mengandungi antara lapan hingga tiga belas suku kata.",
      ),
      node(
        "bentuk-bebas",
        "Sajak Bebas",
        "Bilangan baris dan rima berbeza antara rangkap; sajak tidak terikat pada pola pantun atau syair.",
      ),
      node(
        "bentuk-perbandingan",
        "Pantun vs Syair vs Sajak",
        "PANTUN: puisi tradisional, pembayang + maksud, terikat. SYAIR: puisi tradisional, semua baris membawa maksud, terikat. SAJAK: puisi moden, tiada pembayang wajib, bentuk lebih bebas.",
      ),
    ]),
    branch("gaya-bahasa", "Gaya Bahasa", [
      branch("gaya-anafora", "Anafora", [
        node(
          "gaya-anafora-bukti",
          "Contoh Ringkas",
          "Pengulangan ‘dari’ pada awal dua baris berturutan.",
        ),
        node(
          "gaya-anafora-kesan",
          "Kesan",
          "Pengulangan menegaskan pergerakan makna merentasi ruang dan masa.",
        ),
      ]),
      branch("gaya-repetisi", "Repetisi", [
        node("gaya-repetisi-bukti", "Bukti", "Frasa ‘kata-kata’ diulang dalam beberapa rangkap."),
        node(
          "gaya-repetisi-kesan",
          "Kesan",
          "Pengulangan menegaskan bahasa sebagai gagasan utama sajak.",
        ),
      ]),
      branch("gaya-personifikasi", "Personifikasi", [
        node("gaya-personifikasi-bukti", "Contoh Ringkas", "‘Kata-kata mengembangkan pengalaman’"),
        node(
          "gaya-personifikasi-kesan",
          "Kesan",
          "Kata-kata diberikan keupayaan aktif untuk memperluas pengalaman manusia.",
        ),
      ]),
      branch("gaya-simile", "Simile", [
        node("gaya-simile-bukti", "Contoh Ringkas", "‘seperti kami memetik buah-buahan’"),
        node(
          "gaya-simile-kesan",
          "Kesan",
          "Perbandingan menjadikan proses memilih istilah dan memperoleh ilmu lebih konkrit.",
        ),
      ]),
      branch("gaya-alam", "Imejan Alam", [
        node("gaya-alam-bukti", "Contoh", "Langit, bumi, laut, gunung, awan, hujan dan pohon."),
        node(
          "gaya-alam-kesan",
          "Kesan",
          "Imej alam menghubungkan bahasa dan ilmu dengan ciptaan Tuhan.",
        ),
      ]),
      branch("gaya-ganda", "Kata Ganda", [
        node("gaya-ganda-bukti", "Contoh", "‘kata-kata’, ‘pulau-pulau’ dan ‘kitab-kitab’."),
        node(
          "gaya-ganda-kesan",
          "Kesan",
          "Kata ganda memperluas gambaran benda, tempat dan sumber ilmu.",
        ),
      ]),
      branch("gaya-klasik", "Bahasa Klasik", [
        node("gaya-klasik-bukti", "Contoh Ringkas", "‘samudera’"),
        node("gaya-klasik-kesan", "Kesan", "Diksi memperindah gambaran perjalanan maritim bangsa."),
      ]),
      branch("gaya-arab", "Bahasa Arab", [
        node("gaya-arab-bukti", "Contoh Ringkas", "‘istilah’ dan ‘iman’."),
        node("gaya-arab-kesan", "Kesan", "Diksi menyokong hubungan bahasa, ilmu dan keagamaan."),
      ]),
      branch("gaya-asonansi", "Asonansi", [
        node(
          "gaya-asonansi-bukti",
          "Bukti Bunyi",
          "Pengulangan vokal a dalam frasa ‘Kami pindahkan makna’.",
        ),
        node("gaya-asonansi-kesan", "Kesan", "Pengulangan vokal menghasilkan kemerduan bunyi."),
      ]),
      branch("gaya-aliterasi", "Aliterasi", [
        node(
          "gaya-aliterasi-bukti",
          "Bukti Bunyi",
          "Pengulangan konsonan k dalam frasa ‘Engkau beri kami kata-kata’.",
        ),
        node(
          "gaya-aliterasi-kesan",
          "Kesan",
          "Pengulangan konsonan menegaskan kata-kata sebagai anugerah.",
        ),
      ]),
      node(
        "gaya-had",
        "Had Petikan",
        "Gunakan hanya frasa pendek yang telah disahkan; jangan menyalin rangkap penuh atau mereka baris sajak.",
      ),
    ]),
    branch("bahasa-anugerah", "Bahasa sebagai Anugerah", [
      node(
        "anugerah-tuhan",
        "Tuhan",
        "Tuhan mencipta manusia dan mengurniakan akal serta kebolehan berbicara.",
      ),
      node("anugerah-berfikir", "Berfikir", "Akal membantu manusia membentuk dan menilai idea."),
      node(
        "anugerah-berbicara",
        "Berbicara",
        "Bahasa membolehkan manusia berkomunikasi dengan pihak lain.",
      ),
      node(
        "anugerah-makna",
        "Menyampaikan Makna",
        "Kata-kata memindahkan idea daripada seseorang kepada orang lain.",
      ),
      node(
        "anugerah-warisan",
        "Mewariskan Ilmu",
        "Bahasa menyimpan pengetahuan untuk generasi dan zaman seterusnya.",
      ),
      node(
        "anugerah-hidup",
        "Memahami Kehidupan",
        "Bahasa membantu manusia mentafsir pengalaman dan kewujudan.",
      ),
      node(
        "anugerah-aliran",
        "Aliran Anugerah",
        "TUHAN → AKAL + BAHASA → PEMIKIRAN → KOMUNIKASI → ILMU → TAMADUN.",
      ),
    ]),
    branch("bahasa-ilmu", "Bahasa dan Ilmu", [
      node(
        "ilmu-menamakan",
        "Menamakan",
        "Manusia menggunakan kata untuk mengenal pasti benda, pengalaman dan idea.",
      ),
      node(
        "ilmu-mentafsir",
        "Mentafsir",
        "Bahasa membantu manusia menjelaskan pemerhatian dan membina kefahaman.",
      ),
      node(
        "ilmu-menyimpan",
        "Menyimpan Ilmu",
        "Pengetahuan dapat ditulis dan dipelihara dalam kitab atau teks.",
      ),
      node(
        "ilmu-menyebar",
        "Menyebarkan Ilmu",
        "Makna dapat bergerak merentasi tempat, zaman dan generasi.",
      ),
      node(
        "ilmu-membaca",
        "Membaca",
        "Pembacaan memberikan akses kepada pemikiran yang dihimpunkan oleh generasi terdahulu.",
      ),
      node("ilmu-rantaian", "Rantaian Ilmu", "KATA → MAKNA → PENGETAHUAN → ILMU → PEMAHAMAN."),
      node("ilmu-formula", "Formula", "BAHASA + MEMBACA = ILMU BERKEMBANG."),
    ]),
    branch("bahasa-alam-tuhan", "Bahasa, Alam dan Tuhan", [
      node(
        "alam-perhati",
        "Alam Diperhati",
        "Manusia memerhatikan langit, bumi, laut, gunung, awan, hujan dan pohon.",
      ),
      node(
        "alam-nama",
        "Dinamakan melalui Bahasa",
        "Kata-kata memberikan nama dan konsep kepada perkara yang diperhatikan.",
      ),
      node(
        "alam-kaji",
        "Dikaji",
        "Pembacaan dan penelitian membantu manusia mencari hubungan serta makna.",
      ),
      node(
        "alam-faham",
        "Difahami",
        "Ilmu menjernihkan tafsiran manusia terhadap alam dan kehidupan.",
      ),
      node(
        "alam-pencipta",
        "Kesedaran tentang Pencipta",
        "Pemahaman terhadap ciptaan mengukuhkan keinsafan tentang kebesaran Tuhan.",
      ),
      node(
        "alam-peta",
        "Peta Hubungan",
        "ALAM → DIPERHATI → DINAMAKAN → DIKAJI → DIFAHAMI → MENYEDARI PENCIPTA.",
      ),
      node("alam-teras", "Idea Teras", "ALAM + BAHASA + ILMU + KEINSAFAN."),
    ]),
    branch("nilai", "Nilai", [
      supported(
        "nilai-kesyukuran",
        "Kesyukuran",
        "Mensyukuri anugerah akal, bahasa dan kebolehan memperoleh ilmu.",
        "Epigraf serta Rangkap 1 mengaitkan Tuhan dengan akal dan bahasa.",
      ),
      supported(
        "nilai-bijaksana",
        "Kebijaksanaan",
        "Menggunakan akal dan bahasa dengan baik untuk membina kefahaman.",
        "Rangkap 1 dan 4 menunjukkan bahasa memindahkan makna serta mengembangkan pengalaman.",
      ),
      supported(
        "nilai-rajin",
        "Kerajinan",
        "Rajin membaca, meneliti dan menimba pengetahuan.",
        "Rangkap 3 menghubungkan kitab lama dengan takrif dan tafsiran.",
      ),
      supported(
        "nilai-berani",
        "Keberanian",
        "Berani mengembara untuk meneroka pengalaman dan mencari kehidupan.",
        "Rangkap 2 menggambarkan bangsa pelayar yang merentasi samudera.",
      ),
      supported(
        "nilai-insaf",
        "Keinsafan",
        "Menyedari hubungan manusia, alam dan Tuhan sebagai Pencipta.",
        "Epigraf dan Rangkap 3 menautkan bahasa, ciptaan serta iman.",
      ),
      supported(
        "nilai-bangga",
        "Kebanggaan",
        "Menghargai identiti, bahasa dan sejarah budaya bangsa.",
        "Rangkap 2 menampilkan identiti bangsa serta pengalaman maritimnya.",
      ),
      supported(
        "nilai-tanggungjawab",
        "Tanggungjawab",
        "Menggunakan anugerah bahasa dan akal secara bermanfaat.",
        "Keseluruhan sajak menunjukkan bahasa perlu digunakan untuk ilmu dan pemahaman.",
      ),
    ]),
    branch("pengajaran", "Pengajaran", [
      node(
        "pengajaran-syukur",
        "Kita Hendaklah Mensyukuri Anugerah Bahasa",
        "Bahasa membolehkan manusia berkomunikasi, berfikir dan memperoleh ilmu.",
      ),
      node(
        "pengajaran-akal",
        "Kita Hendaklah Menggunakan Akal dengan Bijaksana",
        "Fikirkan makna dan kesan kata-kata sebelum menggunakannya.",
      ),
      node(
        "pengajaran-ilmu",
        "Kita Hendaklah Rajin Menuntut Ilmu",
        "Pembacaan serta penelitian memperluas pengalaman dan kefahaman.",
      ),
      node(
        "pengajaran-bahasa",
        "Kita Hendaklah Menghargai Bahasa",
        "Bahasa membawa identiti, pengetahuan dan pengalaman antara generasi.",
      ),
      node(
        "pengajaran-alam",
        "Kita Hendaklah Menghayati Alam Ciptaan Tuhan",
        "Pemerhatian terhadap alam dapat menambah ilmu dan keinsafan.",
      ),
      node(
        "pengajaran-baik",
        "Kita Hendaklah Menggunakan Bahasa dengan Baik",
        "Bahasa seharusnya membina pemahaman dan mengelakkan kekeliruan.",
      ),
      node(
        "pengajaran-berani",
        "Kita Hendaklah Berani Meneroka",
        "Pengalaman baharu dapat memperluas ilmu, rezeki dan pandangan hidup.",
      ),
    ]),
    branch("nada", "Nada", [
      node(
        "nada-romantik",
        "ROMANTIK — NADA PROJEK YANG DISAHKAN",
        "Sajak menggambarkan hubungan manusia dengan bahasa dan alam ciptaan Tuhan secara tenang, mendalam dan mendamaikan.",
      ),
      node(
        "nada-keagamaan",
        "Keagamaan — Dimensi Isi",
        "Epigraf al-Quran dan kesedaran tentang Tuhan memberikan sajak dimensi keagamaan yang kuat; sesetengah rujukan menamakannya sebagai nada utama.",
      ),
      node(
        "nada-jawapan",
        "Jawapan Selaras Projek",
        "Nada sajak ialah romantik kerana penyajak mengungkapkan hubungan manusia, bahasa dan alam ciptaan Tuhan secara tenang serta mendamaikan.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node(
        "kata-rantaian",
        "Rantaian Ingatan",
        "TUHAN → AKAL → KATA → MAKNA → ILMU → ALAM → KEHIDUPAN.",
      ),
      node(
        "kata-cabang",
        "Bahasa Menghubungkan",
        "BAHASA → KOMUNIKASI + ILMU + BANGSA + ALAM + TUHAN.",
      ),
      node(
        "kata-mesej",
        "Mesej Teras",
        "BAHASA MENGHUBUNGKAN MANUSIA DENGAN ILMU, ALAM DAN PENCIPTA.",
      ),
      node("kata-formula", "Formula Ingatan", "BAHASA = ANUGERAH + ILMU + TAMADUN."),
      node(
        "kata-peta",
        "Peta Keseluruhan",
        "TUHAN → AKAL + BAHASA → BERKATA-KATA → MAKNA → ILMU → ALAM → KEHIDUPAN.",
      ),
    ]),
    branch("teknik-menjawab", "Teknik Menjawab", [
      node("jawab-maksud", "Maksud Bahagian", "IDEA UTAMA + BAHASA SENDIRI. Jangan salin sajak."),
      node("jawab-tema", "Tema", "BAHASA + ANUGERAH TUHAN + PERANAN DALAM KEHIDUPAN."),
      node("jawab-persoalan", "Persoalan", "ISU + IDEA ATAU BAHAGIAN SOKONGAN."),
      node("jawab-nilai", "Nilai", "NILAI + TINDAKAN ATAU IDEA."),
      node("jawab-pengajaran", "Pengajaran", "‘Kita hendaklah...’ + TINDAKAN."),
      node("jawab-bentuk", "Bentuk", "CIRI SAJAK + BUKTI STRUKTUR."),
      node("jawab-gaya", "Gaya Bahasa", "TEKNIK + CONTOH PENDEK YANG DISAHKAN + KESAN."),
      node(
        "jawab-epigraf",
        "Epigraf",
        "Nyatakan pembuka al-Quran secara berasingan daripada empat rangkap karya penyajak.",
      ),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "kesalahan-tema",
        "Tema = Bahasa",
        "Terlalu umum. Gunakan KEPENTINGAN BAHASA + ANUGERAH TUHAN + KEHIDUPAN MANUSIA.",
      ),
      node(
        "kesalahan-syair",
        "Sajak = Syair",
        "Salah. Syair ialah puisi tradisional terikat, manakala karya ini ialah sajak moden berbentuk bebas.",
      ),
      node(
        "kesalahan-pembayang",
        "Mencari Pembayang",
        "Sajak tidak menggunakan struktur pembayang dan maksud seperti pantun.",
      ),
      node(
        "kesalahan-panjang",
        "Semua Rangkap Sama Panjang",
        "Salah. Empat rangkap sajak mempunyai 5, 5, 9 dan 3 baris.",
      ),
      node(
        "kesalahan-bangsa",
        "Bangsa Melayu = Tema Utama",
        "Terlalu sempit. Pengalaman maritim ialah satu persoalan dalam gagasan bahasa yang lebih luas.",
      ),
      node(
        "kesalahan-sawo",
        "Sawo Matang = Definisi Biologi",
        "Salah. Imej ini ialah gambaran puitis dan budaya dalam konteks bangsa penyajak.",
      ),
      node(
        "kesalahan-alam",
        "Alam = Hiasan Sahaja",
        "Alam menjadi sumber penamaan, ilmu, tafsiran dan kesedaran tentang Pencipta.",
      ),
      node(
        "kesalahan-nilai",
        "Nilai = Pengajaran",
        "Nilai: kesyukuran. Pengajaran: Kita hendaklah bersyukur atas anugerah bahasa dan akal.",
      ),
      node(
        "kesalahan-epigraf",
        "Epigraf Terus Dikira Rangkap 1",
        "Peta ini mengasingkan petikan al-Quran daripada empat rangkap karya Baha Zain.",
      ),
      node(
        "kesalahan-gaya",
        "Cipta Gaya Bahasa",
        "Jangan mereka petikan atau menamakan teknik tanpa bukti teks.",
      ),
      node(
        "kesalahan-salin",
        "Menyalin Sajak",
        "Parafrasa maksud dengan bahasa sendiri dan gunakan petikan pendek sahaja apabila diminta.",
      ),
    ]),
  ],
};
