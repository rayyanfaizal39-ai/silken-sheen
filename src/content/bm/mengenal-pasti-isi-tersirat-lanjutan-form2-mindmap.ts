import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-mengenal-pasti-isi-tersirat-lanjutan";

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

export const bahasaMelayuTingkatan2IsiTersiratMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "ISI TERSIRAT LANJUTAN",
  summary:
    "Isi tersirat ialah maklumat yang tidak dinyatakan secara langsung tetapi dapat disimpulkan melalui petunjuk, hubungan idea dan bukti daripada petikan.",
  children: [
    branch("apa-itu", "Apa Itu?", [
      node(
        "apa-definisi",
        "Definisi",
        "Isi tersirat ialah maklumat yang perlu disimpulkan daripada petunjuk dalam petikan.",
      ),
      node(
        "apa-tahap",
        "Keperluan Tingkatan 2",
        "Murid mungkin perlu menggabungkan beberapa petunjuk, menghubungkan ayat atau perenggan, mengenal pasti sebab dan kesan tersirat serta menyimpulkan sikap, nilai atau niat.",
      ),
      node(
        "apa-proses",
        "Proses Berfikir",
        "Kenal pasti petunjuk yang berkaitan, jalinkan maknanya, pertimbangkan konteks dan bentuk kesimpulan yang paling munasabah.",
      ),
      node(
        "apa-bukan-tekaan",
        "Bukan Tekaan Rawak",
        "Inferens mesti berpunca daripada petikan. Pendapat peribadi atau andaian tanpa bukti bukan isi tersirat yang sah.",
      ),
    ]),
    branch("tersurat-tersirat", "Tersurat vs Tersirat", [
      node(
        "banding-tersurat",
        "Tersurat",
        "Maklumat dinyatakan secara langsung dan boleh ditemukan dengan jelas dalam petikan.",
      ),
      node(
        "banding-tersirat",
        "Tersirat",
        "Maklumat disimpulkan daripada satu atau beberapa petunjuk yang saling berkaitan.",
      ),
      branch("banding-contoh", "Contoh Farah", [
        node(
          "banding-petikan",
          "Petikan",
          "Farah tetap hadir ke sekolah walaupun hujan lebat kerana dia tidak mahu ketinggalan pelajaran.",
        ),
        node("banding-jelas", "Tersurat", "Farah tetap hadir ke sekolah."),
        node(
          "banding-simpulan",
          "Tersirat",
          "Farah seorang yang rajin dan bertanggungjawab terhadap pelajarannya.",
        ),
        node(
          "banding-sebab",
          "Mengapa?",
          "Tindakannya hadir walaupun hujan lebat dan hasratnya supaya tidak ketinggalan pelajaran menyokong kedua-dua sifat tersebut.",
        ),
      ]),
      node(
        "banding-nota",
        "Semak Jenis Maklumat",
        "Jika sebab telah dinyatakan, jawapan itu tersurat. Soalan menggunakan kata tanya ‘mengapa’ tidak semestinya meminta inferens.",
      ),
    ]),
    branch("cari-petunjuk", "Cari Petunjuk", [
      node(
        "petunjuk-sumber",
        "Sumber Petunjuk",
        "Teliti tindakan, dialog, reaksi, perubahan, sebab, akibat, nada dan keadaan yang digambarkan.",
      ),
      branch("petunjuk-azlan", "Contoh Azlan", [
        node(
          "petunjuk-petikan",
          "Petikan",
          "Azlan melihat jam berulang kali sambil berjalan mundar-mandir.",
        ),
        node(
          "petunjuk-inferens",
          "Inferens Mungkin",
          "Azlan berasa cemas atau tidak sabar menunggu sesuatu.",
        ),
        node(
          "petunjuk-bukti",
          "Bukti",
          "Perbuatan melihat jam berulang kali dan berjalan mundar-mandir menunjukkan kegelisahan, tetapi petikan tidak menetapkan satu emosi sahaja.",
        ),
      ]),
      node(
        "petunjuk-konteks",
        "Baca Konteks",
        "Makna satu tindakan boleh berubah mengikut situasi. Baca ayat sebelum dan selepasnya sebelum membuat kesimpulan.",
      ),
      node(
        "petunjuk-lebih-satu",
        "Cari Lebih daripada Satu",
        "Gunakan beberapa petunjuk apabila satu butiran sahaja belum cukup kuat untuk menyokong inferens.",
      ),
    ]),
    branch("hubungkan-idea", "Hubungkan Idea", [
      branch("hubung-formula", "Rangka Inferens", [
        node("hubung-petunjuk-1", "Petunjuk 1", "Kenal pasti butiran pertama yang relevan."),
        node("hubung-petunjuk-2", "+ Petunjuk 2", "Cari butiran lain yang menguatkan makna."),
        node("hubung-konteks", "+ Konteks", "Pertimbangkan keadaan keseluruhan petikan."),
        node("hubung-inferens", "= Inferens", "Bentuk satu kesimpulan yang disokong."),
      ]),
      branch("hubung-contoh", "Contoh Usaha", [
        node(
          "hubung-butiran",
          "Petunjuk",
          "Murid berlatih setiap hari, jurulatih memuji usahanya dan dia akhirnya menang pertandingan.",
        ),
        node("hubung-simpulan", "Inferens", "Usaha yang konsisten membantu mencapai kejayaan."),
        node(
          "hubung-alasan",
          "Hubungan Logik",
          "Latihan yang berterusan menunjukkan usaha, pujian mengesahkan kesungguhannya dan kemenangan menunjukkan hasil usaha tersebut.",
        ),
      ]),
      node(
        "hubung-pilih",
        "Pilih Idea Berkaitan",
        "Jangan gabungkan butiran yang kebetulan berada dalam petikan tetapi tidak mempunyai hubungan makna.",
      ),
    ]),
    branch("tindakan-sikap", "Tindakan dan Sikap", [
      node("sikap-jujur", "Memulangkan Dompet", "Tindakan ini dapat menunjukkan sikap jujur."),
      node(
        "sikap-prihatin",
        "Membantu Tanpa Diminta",
        "Tindakan ini dapat menunjukkan sikap prihatin atau ringan tulang.",
      ),
      node(
        "sikap-disiplin",
        "Berlatih Setiap Hari",
        "Tindakan ini dapat menunjukkan kerajinan atau disiplin.",
      ),
      node(
        "sikap-tanggungjawab",
        "Menepati Janji",
        "Tindakan ini dapat menunjukkan sikap bertanggungjawab.",
      ),
      node(
        "sikap-konteks",
        "Padankan dengan Konteks",
        "Satu tindakan mungkin mencerminkan lebih daripada satu sifat. Pilih sifat yang paling tepat dan sokongnya dengan tindakan dalam petikan.",
      ),
    ]),
    branch("perasaan-reaksi", "Perasaan dan Reaksi", [
      node(
        "perasaan-cara",
        "Cara Mengenal Pasti",
        "Gunakan ekspresi wajah, tingkah laku, dialog, nada dan reaksi sebagai petunjuk perasaan.",
      ),
      branch("perasaan-gementar", "Contoh Gementar", [
        node(
          "perasaan-gementar-petikan",
          "Petikan",
          "Tangannya menggigil dan suaranya terketar-ketar.",
        ),
        node("perasaan-gementar-jawapan", "Perasaan Mungkin", "Takut atau gementar."),
        node(
          "perasaan-gementar-sebab",
          "Alasan",
          "Kedua-dua reaksi fizikal menyokong perasaan tersebut, namun konteks diperlukan untuk memilih perkataan paling tepat.",
        ),
      ]),
      branch("perasaan-gembira", "Contoh Gembira", [
        node("perasaan-gembira-petikan", "Petikan", "Dia tersenyum sambil memeluk ibunya."),
        node("perasaan-gembira-jawapan", "Perasaan Mungkin", "Gembira atau bersyukur."),
      ]),
      node(
        "perasaan-fleksibel",
        "Bukan Satu Emosi Tetap",
        "Lebih daripada satu istilah perasaan mungkin munasabah jika setiap jawapan selaras dengan konteks dan bukti.",
      ),
    ]),
    branch("sebab-kesan", "Sebab dan Kesan", [
      node(
        "sebab-prinsip",
        "Maklumat Tersirat",
        "Kadangkala petikan menyatakan kesan tetapi membiarkan pembaca menyimpulkan sebab, atau menyatakan sebab lalu meminta kesan yang munasabah.",
      ),
      branch("sebab-ribut", "Contoh Keadaan", [
        node("sebab-ribut-petikan", "Petikan", "Banyak pokok tumbang dan beberapa jalan ditutup."),
        node(
          "sebab-ribut-inferens",
          "Inferens Mungkin",
          "Kawasan itu mungkin baru dilanda ribut atau angin kuat.",
        ),
        node(
          "sebab-ribut-bukti",
          "Hubungan",
          "Pokok tumbang dan jalan ditutup ialah kesan yang munasabah selepas kejadian cuaca buruk.",
        ),
      ]),
      node(
        "sebab-jangan-reka",
        "Had Inferens",
        "Jangan mencipta tarikh, kelajuan angin, lokasi atau tahap kerosakan yang tidak dinyatakan.",
      ),
      node(
        "sebab-uji",
        "Uji Hubungan",
        "Tanya sama ada sebab benar-benar dapat menerangkan kesan dan sama ada petikan menyediakan petunjuk yang cukup.",
      ),
    ]),
    branch("rentas-perenggan", "Inferens Merentas Perenggan", [
      branch("rentas-amir", "Contoh Amir", [
        node("rentas-p1", "Perenggan 1", "Amir kerap tiba awal untuk latihan."),
        node("rentas-p3", "Perenggan 3", "Amir dipilih sebagai ketua pasukan."),
        node(
          "rentas-inferens",
          "Inferens",
          "Amir seorang yang berdisiplin dan dipercayai oleh jurulatihnya.",
        ),
        node(
          "rentas-alasan",
          "Alasan",
          "Kehadiran awal menunjukkan disiplin, manakala pemilihannya sebagai ketua pasukan menunjukkan kepercayaan yang diberikan kepadanya.",
        ),
      ]),
      branch("rentas-langkah", "Empat Langkah", [
        node("rentas-langkah-1", "1. Kenal Pasti", "Tandai butiran yang berkaitan."),
        node("rentas-langkah-2", "2. Hubungkan", "Jalinkan butiran daripada perenggan berbeza."),
        node(
          "rentas-langkah-3",
          "3. Tafsir Bersama",
          "Tanya perkara yang dicadangkan oleh semua petunjuk secara kolektif.",
        ),
        node("rentas-langkah-4", "4. Simpulkan", "Bina satu kesimpulan yang logik."),
      ]),
      node(
        "rentas-jangan-asing",
        "Jangan Baca Secara Terasing",
        "Petunjuk pada perenggan awal mungkin hanya menjadi jelas selepas dikaitkan dengan peristiwa pada perenggan kemudian.",
      ),
    ]),
    branch("nilai-pengajaran", "Nilai dan Pengajaran", [
      node("nilai-maksud", "Nilai", "Sifat positif yang ditunjukkan melalui tindakan atau sikap."),
      node(
        "pengajaran-maksud",
        "Pengajaran",
        "Perkara yang patut dilakukan berdasarkan peristiwa dalam petikan.",
      ),
      branch("nilai-contoh", "Contoh Siti", [
        node("nilai-peristiwa", "Peristiwa", "Siti membantu jirannya yang sakit."),
        node("nilai-jawapan", "Nilai", "Prihatin."),
        node(
          "pengajaran-jawapan",
          "Pengajaran",
          "Kita hendaklah membantu jiran yang memerlukan bantuan.",
        ),
      ]),
      node(
        "nilai-beza",
        "Perbezaan Bentuk",
        "Nilai menamakan sifat, manakala pengajaran lazimnya dibina sebagai ayat nasihat seperti ‘Kita hendaklah…’ diikuti tindakan yang relevan.",
      ),
      node(
        "nilai-bukti",
        "Berdasarkan Peristiwa",
        "Nilai dan pengajaran mesti sepadan dengan tindakan sebenar, bukan dipilih daripada senarai secara rawak.",
      ),
    ]),
    branch("rumusan", "Rumusan Inferens", [
      node(
        "rumusan-tujuan",
        "Tujuan",
        "Satukan beberapa petunjuk menjadi kesimpulan ringkas yang menerangkan gambaran keseluruhan.",
      ),
      branch("rumusan-kitar-semula", "Contoh Alam Sekitar", [
        node(
          "rumusan-petunjuk",
          "Petunjuk",
          "Sekolah menjalankan kempen kitar semula, semakin banyak murid membawa botol guna semula dan jumlah sampah plastik berkurang.",
        ),
        node(
          "rumusan-jawapan",
          "Inferens",
          "Kempen tersebut berjaya meningkatkan kesedaran murid terhadap penjagaan alam sekitar.",
        ),
        node(
          "rumusan-hubungan",
          "Mengapa Tepat?",
          "Perubahan amalan murid dan pengurangan sampah menjadi hasil yang menyokong keberkesanan kempen.",
        ),
      ]),
      node(
        "rumusan-ringkas",
        "Ringkas tetapi Lengkap",
        "Utamakan hubungan utama antara petunjuk. Jangan menyenaraikan semula semua ayat tanpa kesimpulan.",
      ),
    ]),
    branch("sokong-bukti", "Sokong dengan Bukti", [
      node(
        "bukti-prinsip",
        "Inferens + Bukti",
        "Nyatakan kesimpulan dan sertakan butiran petikan yang secara langsung menyokongnya.",
      ),
      branch("bukti-amir", "Contoh Disiplin", [
        node("bukti-inferens", "Inferens", "Amir seorang yang berdisiplin."),
        node("bukti-sokongan", "Bukti", "Dia hadir lebih awal untuk latihan setiap hari."),
        node(
          "bukti-jawapan",
          "Jawapan Lengkap",
          "Amir seorang yang berdisiplin kerana dia hadir lebih awal untuk latihan setiap hari.",
        ),
      ]),
      node(
        "bukti-kriteria",
        "Bukti yang Sesuai",
        "Bukti mesti berasal daripada petikan, menyokong inferens secara langsung dan mengekalkan fakta asal.",
      ),
      node(
        "bukti-tidak-panjang",
        "Pilih, Jangan Salin Semua",
        "Gunakan frasa atau butiran yang relevan; tidak perlu menyalin seluruh perenggan.",
      ),
      node(
        "bukti-semak",
        "Ujian Bukti",
        "Tanya: Jika bukti ini dibuang, adakah inferens masih jelas disokong oleh petikan?",
      ),
    ]),
    branch("bina-jawapan", "Bina Jawapan", [
      branch("bina-rangka", "Rangka Umum", [
        node("bina-inferens", "Inferens", "Nyatakan kesimpulan yang menjawab fokus soalan."),
        node("bina-bukti", "+ Alasan / Bukti", "Sertakan petunjuk yang mengesahkan kesimpulan."),
      ]),
      branch("bina-farid", "Contoh Sikap", [
        node("bina-soalan", "Soalan", "Apakah yang dapat disimpulkan tentang sikap Farid?"),
        node(
          "bina-contoh-jawapan",
          "Jawapan",
          "Farid seorang yang bertanggungjawab kerana dia menyiapkan tugasannya sebelum membantu rakannya.",
        ),
      ]),
      node("bina-perasaan", "Soalan Perasaan", "Gunakan perasaan + bukti."),
      node("bina-nilai", "Soalan Nilai", "Gunakan nilai + tindakan yang membuktikannya."),
      node(
        "bina-pengajaran",
        "Soalan Pengajaran",
        "Gunakan ‘Kita hendaklah…’ diikuti tindakan yang relevan dengan peristiwa.",
      ),
      node(
        "bina-gramatis",
        "Ayat Gramatis",
        "Gunakan penanda seperti ‘kerana’ atau ‘berdasarkan’ apabila sesuai supaya hubungan kesimpulan dan bukti jelas.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "salah-meneka",
        "Meneka Tanpa Bukti",
        "Jawapan lahir daripada imaginasi, bukan petunjuk.",
      ),
      node(
        "salah-salin",
        "Salin Ayat Tersurat",
        "Ayat disalin tanpa membentuk kesimpulan yang diminta.",
      ),
      node(
        "salah-jauh",
        "Inferens Terlalu Jauh",
        "Jawapan menambah sebab, niat atau peristiwa yang tidak disokong.",
      ),
      node(
        "salah-tindakan",
        "Salah Tafsir Tindakan",
        "Sifat atau perasaan yang dipilih tidak sepadan dengan konteks tindakan.",
      ),
      node(
        "salah-pendapat",
        "Campur Pendapat Sendiri",
        "Pandangan peribadi menggantikan maklumat yang dapat disimpulkan daripada petikan.",
      ),
      node(
        "salah-nilai",
        "Nilai Tidak Sesuai",
        "Nilai tidak mempunyai bukti melalui tindakan watak.",
      ),
      node(
        "salah-keliru",
        "Nilai dan Pengajaran Keliru",
        "Nilai ialah sifat, manakala pengajaran ialah perkara yang patut dilakukan.",
      ),
      node("salah-fakta", "Mengubah Fakta", "Orang, tindakan atau keadaan asal ditukar."),
      node(
        "salah-tanpa-alasan",
        "Jawapan Tanpa Alasan",
        "Inferens diberikan tanpa petunjuk yang menyokongnya.",
      ),
      node(
        "salah-panjang",
        "Panjang tetapi Tidak Tepat",
        "Huraian yang banyak tidak membantu jika tidak menjawab fokus atau tidak disokong bukti.",
      ),
    ]),
    branch("teknik", "Teknik Mengingat", [
      branch("teknik-petunjuk", "Rumus PETUNJUK", [
        node("teknik-p", "P — Perhatikan tindakan", "Kenal pasti perbuatan yang membawa makna."),
        node("teknik-e", "E — Emosi", "Teliti reaksi dan perasaan yang mungkin."),
        node("teknik-t", "T — Tanda dalam dialog", "Perhatikan kata-kata dan nada."),
        node("teknik-u1", "U — Urutan peristiwa", "Hubungkan perkara sebelum dan selepas."),
        node("teknik-n", "N — Nilai", "Padankan tindakan dengan sifat yang sesuai."),
        node("teknik-j", "J — Jalinkan idea", "Gabungkan petunjuk daripada beberapa bahagian."),
        node("teknik-u2", "U — Uji dengan bukti", "Pastikan petikan menyokong tafsiran."),
        node("teknik-k", "K — Kesimpulan", "Nyatakan inferens yang paling munasabah."),
      ]),
      node(
        "teknik-ib",
        "Inferens + Bukti",
        "Gunakan pasangan ini untuk memastikan jawapan bukan sekadar tekaan.",
      ),
      node(
        "teknik-jejak",
        "Jejak Petunjuk",
        "Semasa latihan, tandai petunjuk daripada ayat atau perenggan berbeza sebelum merumuskan jawapan.",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node("uasa-soalan", "Baca Soalan Dahulu", "Kenal pasti fokus sebelum meneliti petikan."),
      node(
        "uasa-jenis",
        "Tentukan Jenis Jawapan",
        "Bezakan sama ada soalan meminta inferens, nilai, perasaan atau pengajaran.",
      ),
      node(
        "uasa-petunjuk",
        "Cari Petunjuk Berkaitan",
        "Cari lebih daripada satu petunjuk jika satu butiran belum mencukupi.",
      ),
      node(
        "uasa-hubung",
        "Hubungkan Idea",
        "Baca ayat dan perenggan berkaitan sebagai satu rangkaian.",
      ),
      node(
        "uasa-munasabah",
        "Pastikan Munasabah",
        "Pilih kesimpulan yang paling selaras dengan konteks.",
      ),
      node("uasa-bukti", "Sokong dengan Bukti", "Nyatakan alasan yang datang daripada petikan."),
      node(
        "uasa-fakta",
        "Jangan Tambah Fakta",
        "Elakkan andaian yang tidak diberikan oleh petikan.",
      ),
      node(
        "uasa-semak",
        "Semak Semula",
        "Pastikan jawapan menjawab fokus, mengekalkan fakta dan mempunyai hubungan logik dengan bukti.",
      ),
      node(
        "uasa-arahan",
        "Ikut Arahan Semasa",
        "Rujuk kehendak soalan dan format pentaksiran; jangan bergantung pada formula markah, panjang jawapan atau jaminan skor yang tetap.",
      ),
    ]),
  ],
};
