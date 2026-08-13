import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-kesalahan-lazim-pemahaman";

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

export const bahasaMelayuTingkatan1KesalahanLazimPemahamanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KESALAHAN PEMAHAMAN",
  summary:
    "Ramai murid kehilangan markah bukan kerana tidak tahu jawapan, tetapi kerana melakukan kesalahan teknik menjawab dan tidak memahami kehendak soalan.",
  children: [
    branch("apa-itu", "Apa Itu?", [
      node(
        "apa-itu-definisi",
        "Definisi",
        "Kesalahan lazim ialah kesilapan yang sering menyebabkan murid kehilangan markah walaupun memahami petikan.",
      ),
      node(
        "apa-itu-teknik",
        "Teknik Menjawab Penting",
        "Murid perlu memahami arahan, mencari bukti dan membina jawapan yang sesuai.",
      ),
      node(
        "apa-itu-tepat",
        "Ketepatan Lebih Penting",
        "Jawapan yang ringkas tetapi tepat lebih baik daripada jawapan panjang yang tidak berkaitan.",
      ),
      node(
        "apa-itu-kehendak",
        "Kehendak Berbeza",
        "Setiap soalan mungkin meminta fakta, sebab, kesan, langkah, inferens, pendapat atau bukti.",
      ),
      node(
        "apa-itu-baiki",
        "Kesalahan Boleh Dibaiki",
        "Kenal pasti punca kesilapan, gunakan langkah yang betul dan semak jawapan sebelum selesai.",
      ),
    ]),
    branch("salah-faham", "Salah Faham Soalan", [
      node(
        "salah-faham-arahan",
        "Tidak Membaca Arahan",
        "Murid terus mencari jawapan tanpa memahami kata tugas dan perkara yang diminta.",
      ),
      node(
        "salah-faham-kunci",
        "Salah Mengenal Pasti Kata Kunci",
        "Kata kunci yang salah menyebabkan murid mencari bahagian petikan yang tidak berkaitan.",
      ),
      node(
        "salah-faham-lain",
        "Menjawab Soalan Lain",
        "Isi mungkin benar, tetapi tidak menjawab kehendak soalan sebenar.",
      ),
      branch("salah-faham-faktor", "Faktor vs Langkah", [
        node("salah-faham-faktor-maksud", "Faktor", "Punca atau sebab sesuatu berlaku."),
        node("salah-faham-langkah-maksud", "Langkah", "Tindakan atau cara untuk mencapai tujuan."),
      ]),
      branch("salah-faham-sebab", "Sebab vs Kesan", [
        node("salah-faham-sebab-maksud", "Sebab", "Perkara yang menyebabkan sesuatu berlaku."),
        node("salah-faham-kesan-maksud", "Kesan", "Hasil atau akibat daripada sesuatu perkara."),
      ]),
      branch("salah-faham-isi", "Tersurat vs Tersirat", [
        node("salah-faham-tersurat", "Isi Tersurat", "Maklumat dinyatakan secara langsung."),
        node("salah-faham-tersirat", "Isi Tersirat", "Kesimpulan dibuat berdasarkan petunjuk."),
      ]),
      node(
        "salah-faham-baiki",
        "Cara Membaiki",
        "Bulatkan kata tugas, gariskan fokus soalan dan nyatakan semula kehendaknya dalam fikiran.",
      ),
    ]),
    branch("tidak-lengkap", "Jawapan Tidak Lengkap", [
      node(
        "tidak-lengkap-perkataan",
        "Hanya Satu Perkataan",
        "Satu perkataan mungkin tidak menunjukkan hubungan dengan soalan atau petikan.",
      ),
      node(
        "tidak-lengkap-subjek",
        "Tiada Subjek",
        "Jawapan seperti “kerana penat” tidak menjelaskan siapa yang terlibat.",
      ),
      node(
        "tidak-lengkap-alasan",
        "Tiada Alasan",
        "Pendapat atau inferens tanpa sebab belum disokong dengan lengkap.",
      ),
      node(
        "tidak-lengkap-huraian",
        "Tiada Huraian",
        "Soalan yang meminta penjelasan memerlukan sebab, bukti, contoh atau kesan yang relevan.",
      ),
      branch("tidak-lengkap-contoh", "Contoh", [
        node("tidak-lengkap-lemah", "Jawapan Lemah", "Rajin."),
        node(
          "tidak-lengkap-baik",
          "Jawapan Lengkap",
          "Amin seorang yang rajin kerana dia membantu ibunya setiap hari selepas pulang dari sekolah.",
        ),
        node(
          "tidak-lengkap-sebab",
          "Mengapa Lebih Baik?",
          "Jawapan menyatakan subjek, isi dan bukti dalam ayat lengkap.",
        ),
      ]),
      node(
        "tidak-lengkap-baiki",
        "Cara Membaiki",
        "Gunakan subjek yang jelas dan tambah alasan, bukti atau huraian apabila diminta.",
      ),
    ]),
    branch("tiada-bukti", "Tiada Bukti", [
      node(
        "tiada-bukti-masalah",
        "Jawapan Tanpa Rujukan",
        "Murid memberikan kesimpulan tetapi tidak menunjukkan maklumat petikan yang menyokongnya.",
      ),
      node(
        "tiada-bukti-cari",
        "Cari Ayat Sokongan",
        "Padankan kata kunci soalan dengan ayat yang sama atau seerti dalam petikan.",
      ),
      node(
        "tiada-bukti-relevan",
        "Gunakan Bukti Relevan",
        "Pilih tindakan, dialog, sebab, kesan atau keadaan yang menerangkan jawapan secara langsung.",
      ),
      branch("tiada-bukti-contoh", "Contoh", [
        node(
          "tiada-bukti-petikan",
          "Petunjuk",
          "Sara memulangkan dompet yang ditemukannya kepada guru.",
        ),
        node("tiada-bukti-lemah", "Tanpa Bukti", "Sara seorang yang jujur."),
        node(
          "tiada-bukti-kuat",
          "Dengan Bukti",
          "Sara seorang yang jujur kerana dia memulangkan dompet yang ditemukannya kepada guru.",
        ),
      ]),
      node(
        "tiada-bukti-semak",
        "Semak Kaitan",
        "Tanya sama ada bukti itu benar-benar menerangkan isi jawapan.",
      ),
    ]),
    branch("salin", "Salin Bulat-bulat", [
      node(
        "salin-masalah",
        "Menyalin Seluruh Perenggan",
        "Salinan panjang memasukkan maklumat sampingan dan tidak menunjukkan pemilihan jawapan.",
      ),
      node(
        "salin-pilih",
        "Pilih Isi Penting",
        "Ambil ayat atau frasa yang menjawab soalan sahaja.",
      ),
      node(
        "salin-olah",
        "Olah Bahasa Sendiri",
        "Susun semula ayat atau gunakan kata seerti apabila sesuai.",
      ),
      node(
        "salin-fakta",
        "Jangan Ubah Fakta",
        "Kekalkan watak, tindakan, sebab, kesan, masa, tempat dan maksud asal.",
      ),
      branch("salin-contoh", "Contoh", [
        node(
          "salin-asal",
          "Ayat Petikan",
          "Penduduk menanam pokok di taman itu untuk mengurangkan bahang dan mencantikkan kawasan.",
        ),
        node(
          "salin-olah-contoh",
          "Jawapan Diolah",
          "Penduduk menanam pokok bagi mengurangkan kepanasan dan mengindahkan taman tersebut.",
        ),
        node("salin-semak", "Semakan", "Bahasa berubah, tetapi dua tujuan asal dikekalkan."),
      ]),
    ]),
    branch("tidak-berkaitan", "Isi Tidak Berkaitan", [
      node(
        "tidak-berkaitan-pengalaman",
        "Pengalaman Tidak Diminta",
        "Jangan masukkan pengalaman sendiri jika soalan meminta jawapan berdasarkan petikan.",
      ),
      node(
        "tidak-berkaitan-luar",
        "Fakta Luar",
        "Pengetahuan tambahan tidak boleh menggantikan maklumat petikan kecuali soalan meminta pendapat.",
      ),
      node(
        "tidak-berkaitan-tema",
        "Lari daripada Tema",
        "Jawapan membincangkan topik yang berbeza walaupun menggunakan perkataan yang serupa.",
      ),
      node(
        "tidak-berkaitan-uji",
        "Uji Setiap Isi",
        "Tanya: Adakah isi ini menjawab kata tugas dan fokus soalan?",
      ),
      branch("tidak-berkaitan-contoh", "Contoh", [
        node(
          "tidak-berkaitan-soalan",
          "Soalan",
          "Apakah langkah sekolah menggalakkan murid membaca?",
        ),
        node("tidak-berkaitan-salah", "Tidak Berkaitan", "Membaca ialah hobi saya sejak kecil."),
        node(
          "tidak-berkaitan-betul",
          "Berkaitan",
          "Sekolah menyediakan sudut bacaan dan menganjurkan kempen membaca.",
        ),
      ]),
    ]),
    branch("bahasa", "Kesalahan Bahasa", [
      node(
        "bahasa-gramatis",
        "Ayat Tidak Gramatis",
        "Susunan kata yang salah atau ayat tidak lengkap boleh mengaburkan maksud.",
      ),
      node(
        "bahasa-ejaan",
        "Ejaan Salah",
        "Ejaan yang tidak tepat boleh menyebabkan perkataan sukar difahami atau berubah makna.",
      ),
      node(
        "bahasa-tanda",
        "Tanda Baca",
        "Gunakan noktah, koma dan huruf besar pada tempat yang sesuai.",
      ),
      node(
        "bahasa-kata",
        "Kata Tidak Tepat",
        "Pilih perkataan yang sesuai dengan konteks, golongan kata dan maksud ayat.",
      ),
      node(
        "bahasa-jelas",
        "Bahasa yang Jelas",
        "Ayat yang gramatis dan tepat membantu jawapan menyampaikan isi tanpa kekeliruan.",
      ),
      branch("bahasa-contoh", "Contoh", [
        node("bahasa-salah", "Salah", "Mereka pergi sekolah untuk belajar-belajaran."),
        node("bahasa-betul", "Betul", "Mereka pergi ke sekolah untuk belajar."),
      ]),
    ]),
    branch("masa", "Pengurusan Masa", [
      node(
        "masa-baca",
        "Baca Dahulu",
        "Luangkan masa memahami petikan dan arahan sebelum menulis jawapan.",
      ),
      node(
        "masa-mudah",
        "Jawab yang Mudah",
        "Selesaikan soalan yang pasti dahulu, kemudian kembali kepada soalan yang memerlukan penelitian.",
      ),
      node(
        "masa-semak",
        "Sediakan Masa untuk Semakan",
        "Semak kehendak, isi, bukti, bahasa dan soalan yang tertinggal.",
      ),
      node(
        "masa-jangan-lama",
        "Jangan Terlalu Lama",
        "Jika buntu pada satu soalan, tandakan dan teruskan dahulu supaya soalan lain sempat dijawab.",
      ),
      node(
        "masa-tergesa",
        "Elakkan Tergesa-gesa",
        "Kelajuan tanpa ketelitian boleh menyebabkan arahan dan kata kunci terlepas pandang.",
      ),
    ]),
    branch("cara", "Cara Mengelakkan", [
      node("cara-satu", "1. Fahami Soalan", "Kenal pasti kata tugas dan fokus jawapan."),
      node(
        "cara-dua",
        "2. Cari Kata Kunci",
        "Tandakan perkataan penting dalam soalan dan petikan.",
      ),
      node("cara-tiga", "3. Cari Bukti", "Pilih maklumat yang menyokong jawapan secara langsung."),
      node(
        "cara-empat",
        "4. Jawab dengan Ayat Gramatis",
        "Bina jawapan lengkap, jelas dan sesuai dengan kehendak soalan.",
      ),
      node(
        "cara-lima",
        "5. Semak Semula",
        "Pastikan isi berkaitan, bukti tepat, fakta kekal dan bahasa betul.",
      ),
      node(
        "cara-rutin",
        "Jadikan Rutin",
        "Gunakan langkah yang sama pada setiap soalan supaya kesalahan mudah dicegah.",
      ),
    ]),
    branch("pembetulan", "Contoh Pembetulan", [
      branch("pembetulan-satu", "Contoh 1 — Jawapan Tidak Lengkap", [
        node("pembetulan-satu-salah", "Jawapan Salah", "Prihatin."),
        node(
          "pembetulan-satu-sebab",
          "Mengapa Salah?",
          "Tiada subjek dan bukti untuk menerangkan sifat tersebut.",
        ),
        node(
          "pembetulan-satu-baik",
          "Jawapan Dibaiki",
          "Lina seorang yang prihatin kerana dia membantu jirannya yang sakit.",
        ),
        node(
          "pembetulan-satu-skor",
          "Mengapa Lebih Baik?",
          "Jawapan lengkap dan sifat disokong oleh tindakan watak.",
        ),
      ]),
      branch("pembetulan-dua", "Contoh 2 — Salah Kehendak", [
        node(
          "pembetulan-dua-salah",
          "Jawapan Salah",
          "Pencemaran menyebabkan sungai berbau busuk.",
        ),
        node(
          "pembetulan-dua-sebab",
          "Mengapa Salah?",
          "Soalan meminta langkah, tetapi jawapan menyatakan kesan.",
        ),
        node(
          "pembetulan-dua-baik",
          "Jawapan Dibaiki",
          "Masyarakat perlu mengelakkan pembuangan sampah ke dalam sungai.",
        ),
        node(
          "pembetulan-dua-skor",
          "Mengapa Lebih Baik?",
          "Jawapan memberikan tindakan yang menepati kata tugas langkah.",
        ),
      ]),
      branch("pembetulan-tiga", "Contoh 3 — Tiada Bukti", [
        node("pembetulan-tiga-salah", "Jawapan Salah", "Hakim seorang yang berani."),
        node(
          "pembetulan-tiga-sebab",
          "Mengapa Salah?",
          "Inferens tidak disertai petunjuk daripada petikan.",
        ),
        node(
          "pembetulan-tiga-baik",
          "Jawapan Dibaiki",
          "Hakim seorang yang berani kerana dia menyelamatkan anak kucing itu ketika hujan lebat.",
        ),
        node(
          "pembetulan-tiga-skor",
          "Mengapa Lebih Baik?",
          "Bukti tindakan menerangkan inferens tentang sifat Hakim.",
        ),
      ]),
      branch("pembetulan-empat", "Contoh 4 — Fakta Luar", [
        node(
          "pembetulan-empat-salah",
          "Jawapan Salah",
          "Murid perlu membaca kerana buku digital lebih murah.",
        ),
        node(
          "pembetulan-empat-sebab",
          "Mengapa Salah?",
          "Maklumat harga tidak dinyatakan atau diminta dalam petikan.",
        ),
        node(
          "pembetulan-empat-baik",
          "Jawapan Dibaiki",
          "Murid perlu membaca kerana amalan itu menambah pengetahuan dan memperkaya kosa kata.",
        ),
        node(
          "pembetulan-empat-skor",
          "Mengapa Lebih Baik?",
          "Jawapan menggunakan dua manfaat yang relevan daripada petikan.",
        ),
      ]),
    ]),
    branch("teknik", "Teknik Mengingat", [
      branch("teknik-semak", "Rumus SEMAK", [
        node("teknik-s", "S — Soalan", "Fahami kata tugas dan fokus soalan."),
        node("teknik-e", "E — Evidence", "Cari bukti atau petunjuk yang relevan."),
        node("teknik-m", "M — Maksud", "Pastikan jawapan dan bukti mengekalkan maksud asal."),
        node("teknik-a", "A — Ayat", "Bina ayat yang lengkap dan gramatis."),
        node("teknik-k", "K — Kesemakan Akhir", "Semak kaitan, fakta, ejaan dan tanda baca."),
      ]),
      node(
        "teknik-guna",
        "Guna Sebelum Beralih",
        "Lakukan semakan SEMAK pada setiap jawapan sebelum meneruskan soalan berikutnya.",
      ),
      node(
        "teknik-tanya",
        "Lima Soalan Ringkas",
        "Apa yang ditanya? Apakah buktinya? Adakah maksud kekal? Adakah ayat jelas? Sudahkah disemak?",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node(
        "uasa-dua-kali",
        "Baca Soalan Dua Kali",
        "Bacaan pertama memahami soalan; bacaan kedua mengenal pasti kata tugas dan fokus.",
      ),
      node(
        "uasa-tenang",
        "Jangan Tergesa-gesa",
        "Ambil masa yang munasabah untuk meneliti petikan dan memilih jawapan.",
      ),
      node(
        "uasa-kait",
        "Pastikan Jawapan Berkaitan",
        "Padankan setiap isi dengan kehendak soalan.",
      ),
      node(
        "uasa-jelas",
        "Gunakan Bahasa Jelas",
        "Tulis ayat lengkap, gramatis dan mudah difahami.",
      ),
      node(
        "uasa-semak",
        "Semak Sebelum Menghantar",
        "Periksa soalan yang tertinggal, bukti, fakta, ejaan dan tanda baca.",
      ),
      node(
        "uasa-arahan",
        "Ikut Arahan Semasa",
        "Jangan bergantung pada markah tetap atau janji skor. Ikuti kehendak soalan dan format pentaksiran semasa.",
      ),
    ]),
  ],
};
