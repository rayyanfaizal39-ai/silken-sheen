import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-strategi-menjawab-soalan-pemahaman";

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

export const bahasaMelayuTingkatan3StrategiPemahamanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "STRATEGI PEMAHAMAN T3",
  summary:
    "Kuasai proses membaca, menganalisis dan membina jawapan dengan menghubungkan kehendak soalan, maklumat petikan, bukti serta penaakulan yang tepat.",
  children: [
    branch("fahami", "Fahami Petikan", [
      node(
        "fahami-pertama",
        "Bacaan Pertama",
        "Baca keseluruhan petikan untuk memahami tema, situasi, watak atau pihak, isu utama dan perkembangan idea. Jangan terus memburu kata kunci yang terasing.",
      ),
      node(
        "fahami-kedua",
        "Bacaan Kedua",
        "Baca secara analitis untuk mengesan isi utama, idea berulang, sebab dan kesan, pertentangan, contoh serta perubahan sikap atau keadaan.",
      ),
      branch("fahami-struktur", "Struktur Petikan", [
        node("struktur-pendahuluan", "Pendahuluan", "Idea atau isu diperkenalkan."),
        node(
          "struktur-isi",
          "Isi",
          "Idea dikembangkan melalui huraian, bukti, contoh dan hubungan.",
        ),
        node("struktur-penutup", "Penutup", "Kesimpulan atau implikasi dinyatakan apabila sesuai."),
      ]),
      node(
        "fahami-soalan",
        "Soalan Utama",
        "Selepas membaca, tanya: ‘Apakah sebenarnya yang ingin disampaikan oleh petikan ini?’",
      ),
      node(
        "fahami-tujuan-penulis",
        "Tujuan Penulis",
        "Tentukan sama ada penulis mahu memaklumkan, menjelaskan, meningkatkan kesedaran atau mempengaruhi pembaca. Sokong tafsiran dengan nada, susunan idea dan bukti daripada keseluruhan petikan.",
      ),
    ]),
    branch("fokus", "Kenal Pasti Fokus", [
      node("fokus-tema", "Tema", "Perkara umum yang menjadi latar keseluruhan petikan."),
      node("fokus-soalan", "Fokus Soalan", "Aspek khusus dalam tema yang perlu dijawab."),
      branch("fokus-contoh", "Contoh Kesihatan Remaja", [
        node("fokus-petikan", "Petikan", "Petikan membincangkan kesihatan remaja."),
        node("fokus-tanya", "Soalan", "Apakah faktor yang menyebabkan remaja kurang bersenam?"),
        node("fokus-tema-jawapan", "Tema", "Kesihatan."),
        node("fokus-tepat", "Fokus", "Faktor kurang bersenam."),
      ]),
      node(
        "fokus-amaran",
        "Tema Betul Belum Mencukupi",
        "Murid boleh memahami tema tetapi masih tersalah menjawab jika tidak menepati fokus soalan.",
      ),
    ]),
    branch("kata-tugas", "Analisis Kata Tugas", [
      node("tugas-nyatakan", "Nyatakan", "Berikan maklumat yang diminta secara terus."),
      node("tugas-jelaskan", "Jelaskan", "Berikan jawapan berserta penerangan."),
      node("tugas-huraikan", "Huraikan", "Kembangkan isi dengan jelas dan relevan."),
      node("tugas-mengapa", "Mengapakah", "Nyatakan sebab atau alasan."),
      node("tugas-bagaimana", "Bagaimanakah", "Terangkan cara, tindakan atau proses."),
      node(
        "tugas-banding",
        "Bandingkan",
        "Kenal pasti persamaan dan/atau perbezaan yang relevan mengikut soalan.",
      ),
      node("tugas-ramal", "Ramalkan", "Berikan hasil masa hadapan yang logik berdasarkan situasi."),
      node("tugas-wajar", "Wajarkah", "Nyatakan pendirian dan justifikasi."),
      node(
        "tugas-pendapat",
        "Pada Pendapat Anda",
        "Berikan pendapat yang relevan berserta alasan.",
      ),
      node("tugas-bukti", "Buktikan", "Nyatakan dakwaan dan sokong dengan bukti daripada petikan."),
      node(
        "tugas-tepat",
        "Patuhi Wording Soalan",
        "Bentuk jawapan perlu berubah mengikut kata tugas; jangan gunakan satu struktur universal untuk semua soalan.",
      ),
    ]),
    branch("jenis", "Bezakan Jenis Maklumat", [
      node("jenis-tersurat", "Tersurat", "Maklumat dinyatakan secara langsung."),
      node("jenis-tersirat", "Tersirat", "Jawapan disimpulkan daripada petunjuk."),
      node("jenis-bukti", "Bukti", "Maklumat teks yang menyokong sesuatu jawapan atau inferens."),
      node("jenis-kbat", "Pendapat atau KBAT", "Penaakulan murid yang relevan dengan isu."),
      branch("jenis-hakim", "Contoh Hakim", [
        node("hakim-petikan", "Petikan", "Walaupun hujan lebat, Hakim tetap hadir ke latihan."),
        node("hakim-tersurat", "Tersurat", "Hakim hadir ke latihan walaupun hujan."),
        node("hakim-tersirat", "Tersirat", "Hakim mempunyai komitmen yang tinggi."),
        node("hakim-bukti", "Bukti", "Dia tetap hadir walaupun keadaan cuaca tidak baik."),
        node(
          "hakim-kbat",
          "KBAT",
          "Disiplin seperti ini boleh membantu seseorang meningkatkan prestasi kerana latihan dilakukan secara konsisten.",
        ),
      ]),
    ]),
    branch("bukti", "Jejak Bukti", [
      branch("bukti-aliran", "Aliran Jejak Bukti", [
        node("bukti-soalan", "Soalan", "Fahami perkara yang perlu dibuktikan."),
        node(
          "bukti-kunci",
          "↓ Kata Kunci",
          "Kenal pasti subjek, tindakan atau hubungan yang ditanya.",
        ),
        node(
          "bukti-lokasi",
          "↓ Lokasi Petikan",
          "Cari bahagian yang membincangkan idea berkaitan.",
        ),
        node("bukti-pilih", "↓ Bukti", "Pilih maklumat yang menyokong jawapan secara langsung."),
        node("bukti-jawapan", "↓ Jawapan", "Integrasikan bukti dengan jawapan secara gramatis."),
      ]),
      node(
        "bukti-kata-sama",
        "Kata Sama Bukan Jaminan",
        "Kehadiran kata yang sama dalam petikan tidak semestinya bermaksud ayat itu mengandungi jawapan.",
      ),
      node(
        "bukti-kuat",
        "Bukti Kukuh",
        "Bukti yang membuktikan jawapan secara langsung dan tepat.",
      ),
      node(
        "bukti-lemah",
        "Bukti Lemah",
        "Maklumat berkaitan tema tetapi tidak membuktikan jawapan.",
      ),
      node(
        "bukti-salin",
        "Pilih, Jangan Salin Semua",
        "Gunakan bahagian yang diperlukan; lebih banyak salinan tidak semestinya lebih kuat.",
      ),
    ]),
    branch("hubungkan", "Hubungkan Maklumat", [
      node(
        "hubung-prinsip",
        "Maklumat Boleh Tersebar",
        "Jawapan Tingkatan 3 mungkin memerlukan dua ayat, beberapa bahagian dalam perenggan atau maklumat daripada beberapa perenggan.",
      ),
      branch("hubung-nadia", "Contoh Nadia", [
        node("nadia-p1", "Perenggan 1", "Nadia berlatih berucap di khalayak setiap minggu."),
        node(
          "nadia-p3",
          "Perenggan 3",
          "Dia mewakili sekolah dalam pertandingan dengan penuh keyakinan.",
        ),
        node(
          "nadia-inferens",
          "Inferens",
          "Latihan yang konsisten membantu Nadia membina keyakinan.",
        ),
      ]),
      branch("hubung-rumus", "Sintesis Petunjuk", [
        node("hubung-a", "Petunjuk A", "Kenal pasti maklumat pertama yang relevan."),
        node("hubung-b", "+ Petunjuk B", "Cari maklumat lain yang menguatkan idea yang sama."),
        node(
          "hubung-logik",
          "+ Hubungan Logik",
          "Terangkan cara kedua-dua petunjuk saling berkaitan.",
        ),
        node("hubung-hasil", "= Kesimpulan", "Bina kesimpulan yang disokong oleh kedua-duanya."),
      ]),
      node(
        "hubung-elak",
        "Elakkan Gabungan Rawak",
        "Jangan mensintesis maklumat yang tidak menyokong kesimpulan yang sama.",
      ),
    ]),
    branch("tafsir", "Tafsir Maksud", [
      node(
        "tafsir-petunjuk",
        "Gunakan Petunjuk Konteks",
        "Tentukan makna melalui ayat sekeliling, pertentangan, sebab dan kesan, nada serta penggunaan kiasan.",
      ),
      branch("tafsir-jalan", "Contoh Membuka Jalan", [
        node(
          "jalan-ayat",
          "Ayat",
          "Langkah tersebut membuka jalan kepada perubahan yang lebih besar.",
        ),
        node(
          "jalan-bukan",
          "Bukan Literal",
          "Frasa itu tidak merujuk perbuatan membuka jalan sebenar.",
        ),
        node("jalan-maksud", "Maksud", "Memberi peluang atau memungkinkan sesuatu berlaku."),
      ]),
      branch("tafsir-uji", "Ujian Penggantian", [
        node("uji-asal", "Frasa Asal", "Kenal pasti unsur yang ditanya."),
        node("uji-mungkin", "↓ Maksud Mungkin", "Cadangkan makna berdasarkan konteks."),
        node("uji-ganti", "↓ Gantikan", "Masukkan maksud ke dalam ayat."),
        node("uji-semak", "↓ Semak", "Pastikan maksud dan hubungan ayat kekal."),
      ]),
    ]),
    branch("sebab-kesan", "Analisis Sebab dan Kesan", [
      node("sebab-definisi", "Sebab", "Perkara yang menerangkan mengapa sesuatu berlaku."),
      node("kesan-definisi", "Kesan", "Perkara yang berlaku sebagai hasil sesuatu sebab."),
      branch("plastik", "Contoh Plastik", [
        node(
          "plastik-ayat",
          "Ayat",
          "Penggunaan plastik secara berlebihan menyebabkan jumlah sisa meningkat.",
        ),
        node("plastik-sebab", "Sebab", "Penggunaan plastik secara berlebihan."),
        node("plastik-kesan", "Kesan", "Jumlah sisa meningkat."),
      ]),
      branch("rantaian", "Rantaian Sebab dan Kesan", [
        node("rantaian-a", "A — Kurang Tidur", "Keadaan awal."),
        node(
          "rantaian-b",
          "→ B — Sukar Menumpukan Perhatian",
          "Kesan pertama yang juga menjadi sebab seterusnya.",
        ),
        node("rantaian-c", "→ C — Prestasi Boleh Terjejas", "Kesan lanjutan yang munasabah."),
      ]),
      node(
        "rantaian-semak",
        "Ikut Rantaian",
        "Jangan melangkau hubungan atau menukar arah sebab dan kesan.",
      ),
    ]),
    branch("inferens", "Buat Inferens", [
      branch("inferens-rumus", "Petunjuk + Konteks = Inferens", [
        node(
          "inferens-petunjuk",
          "Petunjuk",
          "Pilih tindakan, kata-kata atau keadaan yang relevan.",
        ),
        node("inferens-konteks", "+ Konteks", "Fahami situasi yang menerangkan petunjuk."),
        node("inferens-hasil", "= Inferens", "Bina kesimpulan yang munasabah."),
      ]),
      branch("inferens-sarah", "Contoh Sarah", [
        node(
          "sarah-petikan",
          "Petikan",
          "Sarah menyemak semula jawapannya beberapa kali sebelum menyerahkan kertas peperiksaan.",
        ),
        node("sarah-inferens", "Inferens", "Sarah seorang yang teliti."),
        node("sarah-bukti", "Bukti", "Dia menyemak jawapannya beberapa kali."),
      ]),
      node(
        "inferens-ciri",
        "Ciri Inferens",
        "Inferens mestilah munasabah, disokong dan relevan, bukannya sekadar imaginatif.",
      ),
    ]),
    branch("nilai", "Nilai dan Pengajaran", [
      node("nilai-definisi", "Nilai", "Sifat positif yang ditunjukkan melalui tindakan."),
      node(
        "pengajaran-definisi",
        "Pengajaran",
        "Pelajaran tentang perkara yang patut atau tidak patut dilakukan.",
      ),
      branch("nilai-amir", "Contoh Dompet", [
        node("amir-situasi", "Situasi", "Amir memulangkan dompet yang ditemuinya."),
        node("amir-nilai", "Nilai", "Kejujuran."),
        node(
          "amir-pengajaran",
          "Pengajaran",
          "Kita hendaklah bersikap jujur dan memulangkan barang yang bukan milik kita.",
        ),
      ]),
      node(
        "nilai-padan",
        "Padankan dengan Tindakan",
        "Jangan pilih nilai hanya kerana kedengaran positif; bukti tindakan mesti sepadan.",
      ),
    ]),
    branch("kbat", "Jawab KBAT", [
      node("kbat-pendapat", "Pendapat", "Pendirian + alasan."),
      node("kbat-cadangan", "Cadangan", "Pihak + tindakan + kesan."),
      node("kbat-ramalan", "Ramalan", "Situasi + kesan munasabah + alasan."),
      node("kbat-penilaian", "Penilaian", "Pendirian + bukti atau alasan + implikasi."),
      node("kbat-selesai", "Penyelesaian", "Masalah + tindakan + cara tindakan membantu."),
      branch("kbat-membaca", "Contoh Minat Membaca", [
        node(
          "kbat-soalan",
          "Soalan",
          "Pada pendapat anda, bagaimanakah sekolah dapat meningkatkan minat membaca?",
        ),
        node(
          "kbat-jawapan",
          "Jawapan Kukuh",
          "Pihak sekolah boleh menyediakan bahan bacaan yang pelbagai dan menganjurkan aktiviti seperti ulasan buku supaya murid melihat membaca sebagai aktiviti yang menarik dan bermanfaat.",
        ),
        node(
          "kbat-sebab",
          "Mengapa Berkesan?",
          "Jawapan menamakan pihak, memberikan tindakan praktikal dan menerangkan kesannya.",
        ),
      ]),
      node(
        "kbat-fleksibel",
        "Lebih daripada Satu Pandangan",
        "Jawapan lain boleh diterima jika relevan, logik dan dijustifikasikan.",
      ),
    ]),
    branch("bina", "Bina Jawapan", [
      node("bina-lemah", "Lemah", "Kerana baik."),
      node(
        "bina-sebab-lemah",
        "Mengapa Lemah?",
        "Jawapan terlalu umum, tidak lengkap dan tidak menjelaskan hubungan.",
      ),
      node(
        "bina-baik",
        "Lebih Baik",
        "Amalan tersebut baik kerana dapat membantu menjaga kesihatan.",
      ),
      node(
        "bina-matang",
        "Matang",
        "Amalan bersenam perlu dilakukan secara konsisten kerana dapat meningkatkan kecergasan tubuh dan membantu seseorang menjalani kehidupan yang lebih sihat.",
      ),
      node(
        "bina-ciri",
        "Ciri Jawapan Matang",
        "Jawapan tepat, gramatis, relevan dan dikembangkan secukupnya. Jawapan matang tidak semestinya panjang.",
      ),
    ]),
    branch("pelbagai", "Soalan Pelbagai Bahagian", [
      branch("pelbagai-contoh", "Contoh Tiga Bahagian", [
        node(
          "pelbagai-a",
          "(a) Nyatakan Dua Faktor",
          "Gunakan maklumat yang dinyatakan dalam petikan.",
        ),
        node(
          "pelbagai-b",
          "(b) Jelaskan Satu Kesan",
          "Terangkan hubungan atau kesan dengan jelas.",
        ),
        node(
          "pelbagai-c",
          "(c) Cadangkan Satu Langkah",
          "Gunakan penaakulan sendiri yang relevan dengan isu.",
        ),
      ]),
      node(
        "pelbagai-asing",
        "Jangan Campur Jawapan",
        "Jawab setiap bahagian mengikut kata tugas dan ruangnya sendiri.",
      ),
      node(
        "pelbagai-bilangan",
        "Bilangan Isi",
        "Perhatikan jumlah isi yang diminta bagi setiap bahagian.",
      ),
      node(
        "pelbagai-perubahan",
        "Perubahan Kata Tugas",
        "Semak apabila tugasan berubah daripada nyatakan kepada jelaskan atau cadangkan.",
      ),
      node("pelbagai-bukti", "Keperluan Bukti", "Tentukan bahagian yang memerlukan bukti teks."),
      node(
        "pelbagai-reasoning",
        "Penaakulan Sendiri",
        "Gunakan hanya apabila soalan membenarkan pendapat, aplikasi atau KBAT.",
      ),
      node(
        "pelbagai-semak",
        "Semak Satu demi Satu",
        "Pastikan setiap subsoalan dijawab sebelum beralih.",
      ),
    ]),
    branch("semak", "Semak Jawapan", [
      node("semak-fokus", "Fokus Check", "Adakah saya menjawab perkara yang ditanya?"),
      node("semak-bukti", "Bukti Check", "Adakah bukti benar-benar relevan?"),
      node("semak-logik", "Logik Check", "Adakah penaakulan dan hubungan idea masuk akal?"),
      node(
        "semak-fakta",
        "Fakta Check",
        "Adakah saya mengubah fakta petikan secara tidak sengaja?",
      ),
      node("semak-bahasa", "Bahasa Check", "Adakah ayat gramatis dan jelas?"),
      node("semak-lengkap", "Lengkap Check", "Adakah semua bahagian soalan telah dijawab?"),
      branch("semak-aliran", "Aliran Akhir", [
        node("akhir-fokus", "Fokus", "Jawab kehendak sebenar."),
        node("akhir-bukti", "→ Bukti", "Sokong apabila diperlukan."),
        node("akhir-logik", "→ Logik", "Pastikan hubungan munasabah."),
        node("akhir-bahasa", "→ Bahasa", "Sampaikan secara tepat dan gramatis."),
      ]),
      node(
        "semak-elak",
        "Kesalahan yang Perlu Dielakkan",
        "Jangan terus menjawab tanpa memahami petikan, mencari kata kunci sahaja, tersalah kata tugas, menyalin seluruh perenggan, membuat inferens tanpa bukti, memberikan KBAT tidak berkaitan, mengubah fakta, menambah isi tidak perlu, menulis terlalu pendek atau panjang tanpa fokus, meninggalkan subsoalan atau menggunakan bahasa tidak gramatis.",
      ),
    ]),
    branch("uasa", "Strategi UASA", [
      node("uasa-1", "1. Baca", "Fahami petikan secara keseluruhan."),
      node("uasa-2", "2. Tanda", "Kenal pasti kata tugas dan kata kunci soalan."),
      node("uasa-3", "3. Cari", "Temukan maklumat yang relevan."),
      node("uasa-4", "4. Fikir", "Tentukan sama ada jawapan tersurat, tersirat atau KBAT."),
      node("uasa-5", "5. Bina", "Tulis jawapan yang jelas dan lengkap."),
      node("uasa-6", "6. Bukti", "Sokong jawapan apabila diperlukan."),
      node("uasa-7", "7. Semak", "Periksa fokus, fakta, logik dan bahasa."),
      branch("uasa-mnemonik", "BACA–FIKIR–BUKTI", [
        node("mnemonik-baca", "BACA", "Fahami teks dan perkembangan ideanya."),
        node("mnemonik-fikir", "FIKIR", "Fahami kehendak dan jenis jawapan."),
        node(
          "mnemonik-bukti",
          "BUKTI",
          "Pastikan jawapan mempunyai asas yang tepat apabila sokongan diperlukan.",
        ),
      ]),
      branch("uasa-contoh", "Mini Contoh Berpandu", [
        node(
          "contoh-petikan",
          "Petikan",
          "Sejak sekolah melaksanakan program kebun komuniti, murid semakin aktif menjaga kawasan tanaman. Mereka bergilir-gilir menyiram pokok dan memastikan kawasan tersebut bersih. Hasil tanaman pula diberikan kepada keluarga yang memerlukan.",
        ),
        branch("contoh-1", "Soalan 1 — Tersurat", [
          node("contoh-1-soalan", "Soalan", "Nyatakan dua aktiviti yang dilakukan oleh murid."),
          node(
            "contoh-1-jawapan",
            "Jawapan",
            "Menyiram pokok dan memastikan kawasan kebun bersih.",
          ),
          node(
            "contoh-1-sebab",
            "Analisis",
            "Kedua-dua aktiviti dinyatakan secara langsung dalam petikan.",
          ),
        ]),
        branch("contoh-2", "Soalan 2 — Inferens + Bukti", [
          node("contoh-2-soalan", "Soalan", "Apakah nilai yang ditunjukkan oleh murid?"),
          node(
            "contoh-2-jawapan",
            "Jawapan",
            "Murid menunjukkan nilai bertanggungjawab kerana mereka menjaga tanaman dan kebersihan kebun secara bergilir-gilir.",
          ),
          node(
            "contoh-2-sebab",
            "Analisis",
            "Nilai diinferenskan dan disokong oleh tindakan dalam petikan.",
          ),
        ]),
        branch("contoh-3", "Soalan 3 — KBAT", [
          node(
            "contoh-3-soalan",
            "Soalan",
            "Apakah manfaat lain program seperti ini kepada murid?",
          ),
          node(
            "contoh-3-jawapan",
            "Jawapan",
            "Program seperti ini dapat meningkatkan kemahiran bekerjasama kerana murid perlu membahagikan tugas dan melaksanakan aktiviti secara bersama-sama.",
          ),
          node(
            "contoh-3-sebab",
            "Analisis",
            "Idea tidak disalin secara langsung tetapi masih berkaitan secara logik dengan situasi.",
          ),
        ]),
      ]),
      node(
        "uasa-fleksibel",
        "Proses Fleksibel",
        "Strategi ini membantu pemikiran, bukan formula jaminan markah. Patuhi arahan sebenar dan jangan hafal jawapan contoh kata demi kata.",
      ),
    ]),
  ],
};
