import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-teknik-menggunakan-bukti-petikan-lanjutan";

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

export const bahasaMelayuTingkatan2BuktiPetikanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "BUKTI PETIKAN LANJUTAN",
  summary:
    "Bukti daripada petikan digunakan untuk menyokong jawapan secara tepat. Pada Tingkatan 2, murid perlu memilih bukti paling relevan, menghubungkan beberapa petunjuk dan mengolahnya tanpa mengubah fakta asal.",
  children: [
    branch("apa-itu", "Apa Itu Bukti?", [
      node(
        "apa-definisi",
        "Definisi",
        "Bukti ialah maklumat daripada petikan yang menyokong sesuatu jawapan, inferens atau kesimpulan.",
      ),
      branch("apa-ciri", "Ciri Bukti Kukuh", [
        node("apa-relevan", "Relevan", "Bukti berkaitan terus dengan perkara yang ditanya."),
        node("apa-tepat", "Tepat", "Bukti mengekalkan fakta dan maksud asal petikan."),
        node(
          "apa-kaitan",
          "Kaitan Langsung",
          "Hubungan antara bukti dengan jawapan dapat diterangkan dengan jelas.",
        ),
        node(
          "apa-cukup",
          "Mencukupi",
          "Bukti menyediakan sokongan yang memadai untuk jawapan atau kesimpulan.",
        ),
      ]),
      node(
        "apa-bukan-salin",
        "Bukan Salin Perenggan",
        "Menggunakan bukti tidak bermaksud menyalin seluruh perenggan. Pilih bahagian yang paling tepat dan olah jika sesuai.",
      ),
    ]),
    branch("kepentingan", "Mengapa Bukti Penting", [
      node(
        "penting-teks",
        "Berasal daripada Petikan",
        "Bukti menunjukkan bahawa jawapan mempunyai asas dalam bahan sumber.",
      ),
      node(
        "penting-inferens",
        "Menyokong Inferens",
        "Tindakan atau keadaan dalam petikan menguatkan kesimpulan yang dibuat.",
      ),
      node(
        "penting-pendapat",
        "Elakkan Pendapat Tanpa Sokongan",
        "Bukti membezakan tafsiran berasas daripada andaian.",
      ),
      node(
        "penting-jelas",
        "Menjelaskan Jawapan",
        "Bukti menerangkan mengapa sesuatu jawapan munasabah.",
      ),
      node(
        "penting-kesimpulan",
        "Menjustifikasikan Kesimpulan",
        "Maklumat yang relevan membolehkan kesimpulan dipertahankan.",
      ),
      branch("penting-contoh", "Contoh Rina", [
        node("rina-dakwaan", "Jawapan", "Rina seorang yang prihatin."),
        node("rina-bukti", "Bukti", "Rina membantu jirannya yang sakit menyediakan makanan."),
        node(
          "rina-gabung",
          "Jawapan dengan Bukti",
          "Rina seorang yang prihatin kerana dia membantu jirannya yang sakit menyediakan makanan.",
        ),
      ]),
    ]),
    branch("cari", "Cari Bukti Tepat", [
      node(
        "cari-1",
        "1. Baca Soalan",
        "Fahami perkara yang perlu dibuktikan sebelum mencari maklumat.",
      ),
      node(
        "cari-2",
        "2. Kenal Pasti Kata Kunci",
        "Tandai subjek, tindakan, sebab, kesan atau sifat yang ditanya.",
      ),
      node(
        "cari-3",
        "3. Cari Bahagian Berkaitan",
        "Imbas ayat dan perenggan yang membincangkan kata kunci atau idea setara.",
      ),
      node(
        "cari-4",
        "4. Gariskan Calon Bukti",
        "Tandai beberapa maklumat yang mungkin menyokong jawapan.",
      ),
      node(
        "cari-5",
        "5. Semak Kaitan",
        "Uji sama ada setiap calon bukti benar-benar menjawab soalan.",
      ),
      node(
        "cari-6",
        "6. Pilih yang Paling Tepat",
        "Utamakan bukti yang paling langsung dan mencukupi.",
      ),
      node(
        "cari-uji",
        "Ujian Bukti",
        "Tanya: ‘Jika bukti ini dibuang, adakah jawapan saya masih dapat dibuktikan?’",
      ),
    ]),
    branch("rentas-ayat", "Bukti Merentas Ayat", [
      node(
        "ayat-prinsip",
        "Dua Ayat, Satu Jawapan",
        "Kadangkala satu ayat menyatakan dakwaan, manakala ayat berdekatan menyediakan bukti yang diperlukan.",
      ),
      branch("ayat-program", "Contoh Program", [
        node("ayat-1", "Ayat 1", "Program itu mendapat sambutan yang menggalakkan."),
        node("ayat-2", "Ayat 2", "Lebih 300 orang murid mengambil bahagian."),
        node("ayat-soalan", "Soalan", "Apakah bukti bahawa program itu mendapat sambutan baik?"),
        node(
          "ayat-jawapan",
          "Jawapan",
          "Buktinya, lebih 300 orang murid mengambil bahagian dalam program tersebut.",
        ),
        node(
          "ayat-hubungan",
          "Hubungan",
          "Ayat pertama menyatakan sambutan yang baik, manakala ayat kedua membuktikannya melalui jumlah penyertaan.",
        ),
      ]),
      node(
        "ayat-kata-buktinya",
        "Bahasa Fleksibel",
        "Perkataan ‘buktinya’ boleh membantu, tetapi tidak wajib digunakan jika hubungan jawapan dan bukti sudah jelas.",
      ),
    ]),
    branch("rentas-perenggan", "Bukti Merentas Perenggan", [
      node(
        "perenggan-prinsip",
        "Cari dalam Beberapa Perenggan",
        "Bukti yang menyokong satu kesimpulan mungkin tersebar dan tidak muncul bersebelahan.",
      ),
      branch("perenggan-amir", "Contoh Amir", [
        node("perenggan-1", "Perenggan 1", "Amir datang awal untuk latihan setiap hari."),
        node("perenggan-3", "Perenggan 3", "Jurulatih memilih Amir sebagai ketua pasukan."),
        node("perenggan-kesimpulan", "Kesimpulan", "Amir seorang yang berdisiplin dan dipercayai."),
        node(
          "perenggan-hubungan",
          "Hubungan Bukti",
          "Kehadiran awal menunjukkan disiplin, manakala pelantikan sebagai ketua menunjukkan kepercayaan jurulatih.",
        ),
      ]),
      node(
        "perenggan-kenal",
        "Kenal Pasti Butiran Berkaitan",
        "Cari maklumat yang menyokong kesimpulan yang sama.",
      ),
      node(
        "perenggan-hubung",
        "Hubungkan Petunjuk",
        "Terangkan sumbangan setiap petunjuk kepada jawapan.",
      ),
      node(
        "perenggan-elak",
        "Elakkan Gabungan Rawak",
        "Jangan satukan fakta yang tidak mempunyai hubungan dengan kesimpulan.",
      ),
    ]),
    branch("tersurat", "Bukti untuk Tersurat", [
      node(
        "tersurat-prinsip",
        "Maklumat Dinyatakan Langsung",
        "Untuk soalan tersurat, bukti biasanya dapat dikenal pasti secara terus dalam petikan.",
      ),
      branch("tersurat-membaca", "Contoh Faedah Membaca", [
        node("tersurat-soalan", "Soalan", "Apakah dua faedah membaca?"),
        node("tersurat-bukti-1", "Bukti 1", "Meningkatkan pengetahuan."),
        node("tersurat-bukti-2", "Bukti 2", "Memperluas kosa kata."),
        node(
          "tersurat-jawapan",
          "Jawapan",
          "Dua faedah membaca ialah meningkatkan pengetahuan dan memperluas kosa kata.",
        ),
      ]),
      node(
        "tersurat-ringkas",
        "Jawab Secara Terus",
        "Jangan merumitkan jawapan apabila maklumat yang diminta telah dinyatakan dengan jelas.",
      ),
    ]),
    branch("tersirat", "Bukti untuk Tersirat", [
      node(
        "tersirat-rangka",
        "Inferens + Bukti",
        "Nyatakan kesimpulan yang munasabah, kemudian sokongnya dengan tindakan, kata-kata atau keadaan dalam petikan.",
      ),
      branch("tersirat-farah", "Contoh Farah", [
        node(
          "farah-petikan",
          "Petikan",
          "Farah tetap membantu ibunya walaupun baru pulang dari sekolah.",
        ),
        node("farah-inferens", "Inferens", "Farah seorang yang ringan tulang."),
        node(
          "farah-jawapan",
          "Jawapan dengan Bukti",
          "Farah seorang yang ringan tulang kerana dia tetap membantu ibunya walaupun baru pulang dari sekolah.",
        ),
      ]),
      node(
        "tersirat-lemah",
        "Inferens Tanpa Bukti Lebih Lemah",
        "Sifat atau kesimpulan perlu dihubungkan dengan petunjuk yang membolehkannya dibuat.",
      ),
    ]),
    branch("kbat", "Bukti untuk KBAT", [
      node(
        "kbat-prinsip",
        "Tidak Semestinya Petikan Langsung",
        "Jawapan KBAT tidak selalu memerlukan petikan langsung, tetapi idea mesti kekal berkaitan dengan situasi atau isu dalam bahan.",
      ),
      branch("kbat-plastik", "Contoh Pencemaran Plastik", [
        node("kbat-petikan", "Isu Petikan", "Petikan membincangkan pencemaran plastik."),
        node("kbat-soalan", "Soalan", "Cadangkan satu tindakan yang boleh dilakukan oleh murid."),
        node(
          "kbat-jawapan",
          "Jawapan",
          "Murid boleh membawa bekas makanan guna semula supaya penggunaan plastik sekali guna dapat dikurangkan.",
        ),
        node(
          "kbat-kaitan",
          "Mengapa Sesuai?",
          "Idea itu tidak disalin daripada petikan, tetapi tindakan dan kesannya relevan dengan isu pencemaran plastik.",
        ),
      ]),
      branch("kbat-beza", "Dua Bentuk Sokongan", [
        node("kbat-tekstual", "Bukti Tekstual", "Maklumat khusus yang dinyatakan dalam petikan."),
        node(
          "kbat-kontekstual",
          "Sokongan Kontekstual",
          "Idea sendiri yang logik dan kekal terikat pada isu petikan.",
        ),
      ]),
    ]),
    branch("gabung", "Gabungkan Bukti", [
      node(
        "gabung-prinsip",
        "Beberapa Petunjuk, Satu Kesimpulan",
        "Gabungkan petunjuk apabila setiap satu menguatkan kesimpulan yang sama.",
      ),
      branch("gabung-ali", "Contoh Ali", [
        node("ali-1", "Petunjuk 1", "Ali menghadiri latihan setiap hari."),
        node("ali-2", "Petunjuk 2", "Ali meneliti maklum balas jurulatih."),
        node("ali-3", "Petunjuk 3", "Ali berjaya meningkatkan prestasinya."),
        node("ali-kesimpulan", "Kesimpulan", "Ali komited untuk meningkatkan prestasinya."),
      ]),
      branch("gabung-aliran", "Aliran", [
        node("aliran-1", "Petunjuk 1", "Pilih tindakan atau keadaan yang relevan."),
        node("aliran-2", "+ Petunjuk 2", "Tambah petunjuk yang mengukuhkan idea yang sama."),
        node(
          "aliran-3",
          "+ Petunjuk 3",
          "Gunakan hanya jika memberikan sokongan tambahan yang berguna.",
        ),
        node(
          "aliran-hasil",
          "→ Kesimpulan",
          "Rumuskan perkara yang dibuktikan oleh petunjuk tersebut.",
        ),
      ]),
      node(
        "gabung-cukup",
        "Utamakan Bukti Mencukupi",
        "Jangan senaraikan setiap petunjuk jika satu atau dua bukti kukuh sudah mencukupi.",
      ),
    ]),
    branch("olah", "Olah Bukti", [
      branch("olah-contoh", "Contoh Penduduk", [
        node("olah-asal", "Ayat Asal", "Penduduk berganding bahu membersihkan kawasan perumahan."),
        node(
          "olah-parafrasa",
          "Parafrasa",
          "Penduduk bekerjasama membersihkan kawasan tempat tinggal mereka.",
        ),
      ]),
      branch("olah-kekal", "Perkara yang Dikekalkan", [
        node("olah-maksud", "Maksud", "Idea teras tidak berubah."),
        node("olah-subjek", "Subjek", "Pihak yang melakukan tindakan kekal sama."),
        node("olah-tindakan", "Tindakan", "Perbuatan asal tidak ditukar kepada tindakan lain."),
        node("olah-sebab", "Sebab dan Kesan", "Hubungan sebab-akibat asal dipelihara."),
        node("olah-kuantiti", "Kuantiti", "Bilangan atau skop tidak ditambah atau dikurangkan."),
        node(
          "olah-kepastian",
          "Kepastian",
          "Kata seperti mungkin, sering atau pasti tidak ditukar sesuka hati.",
        ),
      ]),
      node(
        "olah-bukan-semua",
        "Bukan Tukar Setiap Perkataan",
        "Parafrasa bertujuan menyampaikan bukti dengan jelas, bukan mengubah fakta hanya supaya ayat kelihatan berbeza.",
      ),
    ]),
    branch("bina", "Bina Jawapan", [
      node("bina-tersurat", "Tersurat", "Jawapan + bukti langsung apabila diperlukan."),
      node("bina-tersirat", "Tersirat", "Inferens + kerana + bukti."),
      node("bina-nilai", "Nilai", "Nilai + ditunjukkan apabila + tindakan."),
      node("bina-perasaan", "Perasaan", "Perasaan + kerana + petunjuk."),
      node("bina-kbat", "KBAT", "Idea + alasan + kaitan dengan isu."),
      node(
        "bina-contoh",
        "Contoh",
        "Amir seorang yang bertanggungjawab kerana dia menyiapkan tugasan sebelum membantu rakannya.",
      ),
      node(
        "bina-beza",
        "Jawapan dan Bukti Berbeza Peranan",
        "Jawapan menyatakan perkara yang ditanya, manakala bukti menerangkan atau membuktikan mengapa jawapan itu tepat.",
      ),
    ]),
    branch("nilai", "Nilai Kekuatan Bukti", [
      node("nilai-soalan", "Soalan", "Adakah program itu berjaya?"),
      node(
        "nilai-kuat",
        "Bukti Kukuh",
        "Jumlah penyertaan meningkat daripada 80 kepada 200 orang.",
      ),
      node(
        "nilai-sebab-kuat",
        "Mengapa Kukuh?",
        "Peningkatan penyertaan menyokong dakwaan kejayaan secara langsung.",
      ),
      node("nilai-lemah", "Bukti Lemah", "Program itu diadakan pada hari Sabtu."),
      node(
        "nilai-sebab-lemah",
        "Mengapa Lemah?",
        "Maklumat itu mungkin benar, tetapi hari pelaksanaan tidak membuktikan program tersebut berjaya.",
      ),
      node(
        "nilai-prinsip",
        "Relevan Lebih Penting",
        "Satu bukti kukuh lebih berguna daripada beberapa fakta benar yang tidak berkaitan.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node("salah-tiada", "Tiada Bukti", "Dakwaan atau kesimpulan dibuat tanpa sokongan."),
      node(
        "salah-tidak-berkaitan",
        "Bukti Tidak Berkaitan",
        "Fakta itu benar tetapi tidak menjawab soalan.",
      ),
      node(
        "salah-salin",
        "Salin Terlalu Banyak",
        "Seluruh perenggan disalin walaupun hanya satu bahagian diperlukan.",
      ),
      node(
        "salah-lemah",
        "Pilih Bukti Lemah",
        "Butiran yang tidak membuktikan kesimpulan digunakan.",
      ),
      node(
        "salah-ubah",
        "Ubah Fakta",
        "Parafrasa menukar subjek, tindakan, kuantiti atau hubungan idea.",
      ),
      node(
        "salah-gabung",
        "Gabung Fakta Tidak Berkaitan",
        "Kesimpulan dibina daripada maklumat yang tidak saling menyokong.",
      ),
      node(
        "salah-inferens",
        "Inferens Tanpa Bukti",
        "Sifat atau kesimpulan dinyatakan tanpa tindakan yang menyokongnya.",
      ),
      node(
        "salah-tanpa-jawapan",
        "Bukti Tanpa Jawapan",
        "Ayat petikan disalin tanpa menerangkan perkara yang dibuktikannya.",
      ),
      node(
        "salah-kbat",
        "Anggap Semua KBAT Perlu Petikan Langsung",
        "Murid gagal memberikan idea sendiri yang munasabah apabila soalan meminta pendapat atau aplikasi.",
      ),
    ]),
    branch("teknik", "Teknik Mengingat", [
      branch("teknik-bukti", "Rumus BUKTI", [
        node("bukti-b", "B — Baca Soalan", "Fahami perkara yang perlu dijawab atau dibuktikan."),
        node(
          "bukti-u",
          "U — Underline Kata Kunci",
          "Gariskan kata kunci yang memandu carian bukti.",
        ),
        node("bukti-k", "K — Kenal Pasti Bukti", "Cari maklumat yang berkaitan dalam petikan."),
        node("bukti-t", "T — Tentukan Kaitan", "Semak bagaimana bukti menyokong jawapan."),
        node(
          "bukti-i",
          "I — Integrasikan dalam Jawapan",
          "Gabungkan jawapan dan bukti secara gramatis.",
        ),
      ]),
      branch("teknik-claim", "Jawapan → Bukti", [
        node("claim-jawapan", "Jawapan atau Inferens", "Nyatakan perkara yang hendak dibuktikan."),
        node("claim-bukti", "↓ Bukti", "Pilih maklumat yang menyokongnya."),
        node("claim-semak", "↓ Semak Kaitan", "Pastikan bukti benar-benar menguatkan jawapan."),
      ]),
      branch("teknik-3s", "Semakan 3S", [
        node("s-sesuai", "Sesuai", "Bukti berkaitan dengan soalan dan jawapan."),
        node("s-tepat", "Tepat", "Bukti mengekalkan fakta asal."),
        node("s-cukup", "Mencukupi", "Bukti memberikan sokongan yang memadai."),
      ]),
      node(
        "teknik-fleksibel",
        "Panduan Fleksibel",
        "Gunakan teknik ini sebagai alat berfikir, bukan syarat bahawa setiap jawapan mesti mempunyai petikan langsung atau perkataan tertentu.",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node(
        "uasa-soalan",
        "Baca Soalan Dahulu",
        "Ketahui perkara yang perlu dibuktikan sebelum meneliti petikan.",
      ),
      node(
        "uasa-relevan",
        "Pilih Bukti Paling Relevan",
        "Utamakan maklumat yang menyokong jawapan secara langsung.",
      ),
      node("uasa-salin", "Jangan Salin Terlalu Banyak", "Ambil hanya bahagian yang diperlukan."),
      node(
        "uasa-sekeliling",
        "Baca Ayat Sekeliling",
        "Gunakan konteks sebelum dan selepas untuk memahami bukti.",
      ),
      node(
        "uasa-perenggan",
        "Cari Merentas Perenggan",
        "Teliti bahagian lain apabila satu petunjuk belum mencukupi.",
      ),
      node(
        "uasa-olah",
        "Olah Tanpa Mengubah Fakta",
        "Parafrasa dengan mengekalkan subjek, tindakan dan hubungan idea.",
      ),
      node(
        "uasa-beza",
        "Bezakan Bukti Langsung dan Inferens",
        "Kenal pasti sama ada jawapan dinyatakan atau perlu disimpulkan.",
      ),
      node("uasa-sokong", "Semak Sokongan", "Pastikan bukti benar-benar membuktikan jawapan."),
      node("uasa-semak", "Semak Semula", "Periksa ketepatan, kaitan dan kecukupan bukti."),
      node(
        "uasa-arahan",
        "Ikut Arahan Sebenar",
        "Jangan andaikan bilangan bukti atau panjang jawapan yang tetap, jaminan markah, atau bahawa setiap jawapan mesti mengandungi petikan langsung.",
      ),
    ]),
  ],
};
