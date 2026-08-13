import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-mengenal-pasti-isi-tersurat-lanjutan";

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

export const bahasaMelayuTingkatan2IsiTersuratMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "ISI TERSURAT LANJUTAN",
  summary:
    "Isi tersurat ialah maklumat yang dinyatakan secara jelas dalam petikan. Pada Tingkatan 2, murid perlu mengenal pasti maklumat yang tepat daripada petikan yang lebih panjang, menghubungkan beberapa ayat dan memilih bukti yang benar-benar menjawab soalan.",
  children: [
    branch("apa-itu", "Apa Itu?", [
      node(
        "apa-definisi",
        "Definisi",
        "Isi tersurat ialah maklumat yang dinyatakan secara langsung dalam petikan.",
      ),
      node(
        "apa-tahap",
        "Tingkatan 2",
        "Jawapan mungkin berada dalam satu ayat, tersebar dalam dua ayat berdekatan, muncul dalam lebih daripada satu perenggan atau menggunakan perkataan berbeza yang membawa maksud sama.",
      ),
      node(
        "apa-fokus",
        "Fokus",
        "Cari maklumat yang betul dan relevan, jumlah isi yang diminta serta bukti yang paling tepat.",
      ),
      node(
        "apa-tanpa-tekaan",
        "Tidak Perlu Meneka",
        "Jika maklumat dinyatakan dengan jelas, jangan menambah andaian atau pendapat sendiri.",
      ),
      node("apa-contoh", "Contoh Ringkas", undefined, [
        node(
          "apa-petikan",
          "Petikan",
          "Sekolah itu melaksanakan program kitar semula setiap hari Jumaat. Program tersebut bertujuan mengurangkan jumlah sampah dan meningkatkan kesedaran murid.",
        ),
        node("apa-soalan", "Soalan", "Apakah dua tujuan program tersebut?"),
        node(
          "apa-jawapan",
          "Jawapan",
          "Mengurangkan jumlah sampah dan meningkatkan kesedaran murid.",
        ),
      ]),
    ]),
    branch("maklumat-penting", "Bezakan Maklumat Penting", [
      node("penting-utama", "Idea Utama", "Maklumat yang paling berkaitan dengan kehendak soalan."),
      node(
        "penting-sokongan",
        "Maklumat Sokongan",
        "Maklumat yang menerangkan, mengukuhkan atau memperincikan idea utama.",
      ),
      node(
        "penting-contoh",
        "Contoh Tambahan",
        "Contoh dalam petikan tidak semestinya menjadi jawapan utama. Tentukan fungsinya dahulu.",
      ),
      node(
        "penting-tidak-berkaitan",
        "Maklumat Tidak Berkaitan",
        "Jangan memilih ayat hanya kerana ayat itu berada dalam perenggan yang sama.",
      ),
      node(
        "penting-panduan",
        "Soalan Panduan",
        "Tanya: Adakah maklumat ini benar-benar menjawab soalan?",
      ),
      node("penting-latihan", "Contoh", undefined, [
        node(
          "penting-petikan",
          "Petikan",
          "Amalan bersenam dapat meningkatkan kecergasan. Selain itu, aktiviti tersebut membantu mengawal berat badan. Amir biasanya bersenam bersama rakannya.",
        ),
        node("penting-soalan", "Soalan", "Nyatakan dua faedah bersenam."),
        node(
          "penting-betul",
          "Pilihan Tepat",
          "Meningkatkan kecergasan dan membantu mengawal berat badan.",
        ),
        node(
          "penting-salah",
          "Bukan Jawapan",
          "Amir bersenam bersama rakannya ialah butiran kegiatan, bukan faedah.",
        ),
      ]),
    ]),
    branch("kata-kunci", "Kata Kunci Soalan", [
      node(
        "kunci-tugas",
        "Kata Tugas",
        "Kenal pasti kata tugas seperti nyatakan, berikan, senaraikan, jelaskan, mengapakah dan bagaimanakah.",
      ),
      node(
        "kunci-fokus",
        "Fokus Isi",
        "Tentukan sama ada soalan meminta faktor, kesan, faedah, langkah, peranan, sebab, tujuan atau tindakan.",
      ),
      node(
        "kunci-subjek",
        "Subjek",
        "Kenal pasti orang, pihak atau perkara yang dirujuk oleh soalan.",
      ),
      node(
        "kunci-bilangan",
        "Bilangan Isi",
        "Jika soalan meminta dua faktor, pilih tepat dua faktor yang relevan kecuali arahan pentaksiran menyatakan sebaliknya.",
      ),
      node(
        "kunci-sinonim",
        "Sinonim",
        "Soalan mungkin menggunakan faedah, manakala petikan menggunakan manfaat. Padankan maksud, bukan perkataan semata-mata.",
      ),
      node(
        "kunci-analisis",
        "Contoh Analisis",
        "Soalan: Nyatakan dua langkah yang diambil oleh pihak sekolah. Kata kunci: dua, langkah dan pihak sekolah.",
      ),
    ]),
    branch("bukti", "Cari Bukti Tepat", [
      node("bukti-langkah-1", "Langkah 1", "Baca soalan hingga faham kehendaknya."),
      node("bukti-langkah-2", "Langkah 2", "Gariskan fokus dan bilangan isi."),
      node("bukti-langkah-3", "Langkah 3", "Imbas perenggan yang berkaitan."),
      node("bukti-langkah-4", "Langkah 4", "Cari ayat atau frasa sokongan yang paling jelas."),
      node(
        "bukti-langkah-5",
        "Langkah 5",
        "Semak sama ada bukti itu sepadan dengan subjek dan fokus soalan.",
      ),
      node(
        "bukti-terbaik",
        "Bukti Terbaik",
        "Pilih bukti yang paling langsung dan elakkan menyalin butiran yang tidak diperlukan.",
      ),
      node("bukti-contoh", "Contoh", undefined, [
        node("bukti-soalan", "Soalan", "Apakah sebab penduduk menyertai program itu?"),
        node(
          "bukti-sokongan",
          "Bukti",
          "Mereka mahu memastikan kawasan perumahan sentiasa bersih.",
        ),
        node(
          "bukti-jawapan",
          "Jawapan",
          "Penduduk menyertai program itu kerana mereka mahu memastikan kawasan perumahan sentiasa bersih.",
        ),
      ]),
    ]),
    branch("rentas-ayat", "Maklumat Merentas Ayat", [
      node(
        "ayat-maksud",
        "Maksud",
        "Satu jawapan kadangkala dibina daripada maklumat dalam dua ayat berdekatan.",
      ),
      node(
        "ayat-hubung",
        "Hubungkan Maklumat",
        "Ayat pertama mungkin memberikan pernyataan, manakala ayat kedua memberikan bukti sokongan.",
      ),
      node(
        "ayat-sekeliling",
        "Baca Ayat Sekeliling",
        "Jangan berhenti pada satu ayat. Periksa ayat sebelum dan selepas maklumat yang ditemukan.",
      ),
      node(
        "ayat-rujukan",
        "Semak Rujukan",
        "Jejak rujukan seperti program itu, perkara tersebut, mereka dan kegiatan itu kepada kata nama yang tepat.",
      ),
      node("ayat-contoh", "Contoh", undefined, [
        node(
          "ayat-petikan",
          "Petikan",
          "Program itu mendapat sambutan yang baik. Seramai 200 orang penduduk menyertainya.",
        ),
        node(
          "ayat-soalan",
          "Soalan",
          "Apakah bukti bahawa program itu mendapat sambutan yang baik?",
        ),
        node(
          "ayat-jawapan",
          "Jawapan",
          "Buktinya, seramai 200 orang penduduk menyertai program tersebut.",
        ),
      ]),
    ]),
    branch("rentas-perenggan", "Maklumat Merentas Perenggan", [
      node(
        "perenggan-maksud",
        "Maksud",
        "Satu soalan boleh memerlukan maklumat yang terdapat dalam perenggan berlainan.",
      ),
      node(
        "perenggan-strategi",
        "Strategi",
        "Kenal pasti fokus, cari perenggan demi perenggan, tandakan setiap isi berkaitan dan gabungkan isi yang diminta sahaja.",
      ),
      node(
        "perenggan-terus",
        "Teruskan Carian",
        "Jika lebih daripada satu isi diminta, jangan berhenti selepas menemukan isi pertama.",
      ),
      node(
        "perenggan-duplikasi",
        "Elakkan Duplikasi",
        "Dua ayat mungkin menyatakan idea yang sama. Kira makna, bukan bilangan ayat.",
      ),
      node("perenggan-contoh", "Contoh", undefined, [
        node(
          "perenggan-satu",
          "Perenggan 1",
          "Amalan membaca meningkatkan pengetahuan murid tentang pelbagai perkara.",
        ),
        node(
          "perenggan-tiga",
          "Perenggan 3",
          "Pembacaan bahan bermutu turut memperkaya kosa kata murid.",
        ),
        node("perenggan-soalan", "Soalan", "Nyatakan dua manfaat membaca."),
        node("perenggan-jawapan", "Jawapan", "Meningkatkan pengetahuan dan memperkaya kosa kata."),
      ]),
    ]),
    branch("sebab-kesan", "Sebab dan Kesan", [
      node(
        "sebab-petunjuk",
        "Petunjuk Sebab",
        "Cari kerana, disebabkan oleh, berpunca daripada, faktor dan sebab.",
      ),
      node(
        "kesan-petunjuk",
        "Petunjuk Kesan",
        "Cari akibatnya, kesannya, menyebabkan, hasilnya dan implikasi.",
      ),
      node(
        "sebab-beza",
        "Bezakan",
        "Sebab menerangkan mengapa sesuatu berlaku; kesan menerangkan perkara yang berlaku sebagai hasilnya.",
      ),
      node("sebab-contoh", "Contoh", undefined, [
        node(
          "sebab-petikan",
          "Petikan",
          "Banjir berlaku kerana hujan turun tanpa henti. Akibatnya, beberapa jalan raya ditutup.",
        ),
        node("sebab-jawapan", "Punca Banjir", "Hujan turun tanpa henti."),
        node("kesan-jawapan", "Kesan Banjir", "Beberapa jalan raya ditutup."),
      ]),
      node(
        "sebab-salah",
        "Kesalahan Lazim",
        "Jangan menjawab soalan sebab dengan kesan atau menjawab soalan kesan dengan sebab.",
      ),
    ]),
    branch("perbandingan", "Perbandingan", [
      node(
        "banding-maksud",
        "Maksud",
        "Soalan perbandingan meminta persamaan atau perbezaan yang dinyatakan dengan jelas.",
      ),
      node(
        "banding-petunjuk",
        "Petunjuk",
        "Cari manakala, berbeza, sama, lebih, kurang dan sebaliknya.",
      ),
      node(
        "banding-jadual",
        "Jadual Ringkas",
        "Susun pihak dan maklumat secara berpasangan, contohnya Amir → sejarah; Farid → sains.",
      ),
      node("banding-contoh", "Contoh", undefined, [
        node(
          "banding-petikan",
          "Petikan",
          "Amir gemar membaca buku sejarah, manakala Farid lebih suka membaca buku sains.",
        ),
        node(
          "banding-jawapan",
          "Jawapan",
          "Amir gemar membaca buku sejarah manakala Farid lebih suka membaca buku sains.",
        ),
      ]),
      node(
        "banding-tanpa-nilai",
        "Jangan Tambah Penilaian",
        "Jangan menyatakan bahawa satu pilihan lebih baik kecuali perkara itu dinyatakan dalam petikan.",
      ),
    ]),
    branch("bahan", "Maklumat daripada Bahan", [
      node(
        "bahan-teks",
        "Bahan Teks",
        "Gunakan pernyataan langsung daripada petikan, dialog, e-mel, laporan atau berita.",
      ),
      node(
        "bahan-visual",
        "Bahan Visual",
        "Maklumat tersurat juga boleh hadir pada poster, infografik, ilustrasi, iklan atau carta apabila bahan itu disediakan.",
      ),
      node(
        "bahan-label",
        "Cari Label",
        "Perhatikan tajuk, kapsyen, nombor, label, slogan dan pernyataan ringkas.",
      ),
      node(
        "bahan-gabung",
        "Gabungkan Teks dan Visual",
        "Jika soalan menggunakan beberapa bahan, tentukan bahan yang mengandungi maklumat yang diminta sebelum menggabungkannya.",
      ),
      node(
        "bahan-tanpa-tafsir",
        "Jangan Tafsir Berlebihan",
        "Maklumat yang dapat dibaca atau dilihat secara langsung ialah tersurat. Jangan mengubahnya menjadi inferens tanpa keperluan.",
      ),
    ]),
    branch("jawapan", "Bina Jawapan", [
      node(
        "jawapan-lengkap",
        "Ayat Lengkap",
        "Gunakan ayat lengkap apabila sesuai dan pastikan subjek jawapan jelas.",
      ),
      node(
        "jawapan-terus",
        "Terus kepada Jawapan",
        "Mulakan dengan isi yang diminta tanpa pendahuluan yang tidak diperlukan.",
      ),
      node(
        "jawapan-gabung",
        "Gabungkan Isi",
        "Gabungkan dua maklumat berkaitan dengan kata hubung yang tepat tanpa menghilangkan fakta.",
      ),
      node(
        "jawapan-bilangan",
        "Bilangan Isi",
        "Patuhi bilangan isi yang diminta dan jangan menambah isi luar apabila jawapan perlu berdasarkan bahan.",
      ),
      node("jawapan-contoh", "Contoh", undefined, [
        node("jawapan-soalan", "Soalan", "Nyatakan dua manfaat teknologi dalam pendidikan."),
        node(
          "jawapan-model",
          "Jawapan",
          "Teknologi memudahkan murid mendapatkan maklumat dan membantu guru menyampaikan bahan pembelajaran dengan lebih menarik.",
        ),
      ]),
    ]),
    branch("olah", "Olah Bahasa", [
      node(
        "olah-maksud",
        "Maksud",
        "Murid boleh menyusun semula maklumat tersurat menggunakan bahasa sendiri.",
      ),
      node(
        "olah-fakta",
        "Kekalkan Fakta",
        "Jangan mengubah orang, tempat, masa, tindakan, sebab, kesan atau kuantiti.",
      ),
      node("olah-contoh", "Contoh", undefined, [
        node("olah-asal", "Ayat Asal", "Program tersebut memberikan banyak manfaat kepada murid."),
        node("olah-baharu", "Ayat Diolah", "Program itu membawa pelbagai faedah kepada murid."),
      ]),
      node(
        "olah-sinonim",
        "Sinonim Berhati-hati",
        "Gantikan perkataan hanya jika sinonim itu menepati konteks dan tidak mengubah maksud.",
      ),
      node(
        "olah-tidak-semua",
        "Tidak Perlu Ubah Semua",
        "Istilah teknikal dan nama khas boleh dikekalkan. Utamakan ketepatan sebelum kepelbagaian bahasa.",
      ),
    ]),
    branch("semak", "Semak Ketepatan", [
      node("semak-fokus", "Semak Fokus", "Adakah jawapan menjawab perkara yang diminta?"),
      node(
        "semak-bukti",
        "Semak Bukti",
        "Bolehkah jawapan ditunjukkan dan disokong dengan tepat dalam bahan?",
      ),
      node("semak-bilangan", "Semak Bilangan Isi", "Adakah bilangan isi menepati arahan soalan?"),
      node(
        "semak-fakta",
        "Semak Fakta",
        "Pastikan subjek, nombor, masa, lokasi, sebab dan kesan tidak berubah.",
      ),
      node(
        "semak-bahasa",
        "Semak Bahasa",
        "Pastikan jawapan gramatis, jelas dan tidak mengandungi rujukan yang kabur.",
      ),
      node(
        "semak-duplikasi",
        "Semak Duplikasi",
        "Pastikan dua isi tidak membawa maksud yang sama.",
      ),
      node(
        "semak-akhir",
        "Ujian Akhir",
        "Tanya: Jika jawapan ini dipadankan dengan petikan, bolehkah saya menunjukkan bukti yang tepat?",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "salah-tidak-relevan",
        "Pilih Maklumat Tidak Relevan",
        "Memilih butiran yang tidak menjawab fokus soalan.",
      ),
      node(
        "salah-berhenti",
        "Berhenti Selepas Satu Isi",
        "Tidak meneruskan carian apabila soalan meminta lebih daripada satu isi.",
      ),
      node(
        "salah-salin",
        "Salin Seluruh Perenggan",
        "Menyalin terlalu banyak maklumat tanpa memilih bukti yang diperlukan.",
      ),
      node(
        "salah-ulang",
        "Ulang Isi Sama",
        "Memberikan makna yang sama dalam dua ayat dan menganggapnya sebagai dua isi.",
      ),
      node("salah-sebab", "Salah Sebab dan Kesan", "Mencampuradukkan punca dengan akibat."),
      node(
        "salah-rujukan",
        "Gagal Jejak Kata Ganti Nama",
        "Tidak menentukan pihak yang dirujuk oleh dia, mereka, beliau atau tersebut.",
      ),
      node(
        "salah-pendapat",
        "Tambah Pendapat Sendiri",
        "Menambah pengetahuan luar apabila soalan meminta maklumat daripada bahan sahaja.",
      ),
      node(
        "salah-fakta",
        "Ubah Fakta",
        "Mengolah bahasa sehingga orang, masa, tindakan, sebab atau hasil berubah.",
      ),
      node(
        "salah-bahasa",
        "Jawapan Tidak Gramatis",
        "Menggunakan nota atau serpihan ayat apabila ayat lengkap diperlukan.",
      ),
    ]),
    branch("teknik", "Teknik Mengingat", [
      node(
        "teknik-tepat",
        "Rumus TEPAT",
        "T — Tentukan kehendak; E — Empat? Dua? Semak bilangan isi; P — Padankan kata kunci; A — Ambil bukti; T — Tulis jawapan. Huruf E mengingatkan murid supaya menyemak bilangan sebenar yang diminta, bukan sentiasa empat atau dua.",
      ),
      node("teknik-bukti", "Rumus BUKTI", "Soalan → kata kunci → bukti → jawapan."),
      node(
        "teknik-peta",
        "Peta Perenggan",
        "Semasa latihan, labelkan setiap perenggan dengan satu idea utama yang ringkas.",
      ),
      node(
        "teknik-sinonim",
        "Tandakan Sinonim",
        "Catat pasangan yang setara mengikut konteks seperti faedah ↔ manfaat dan usaha ↔ langkah.",
      ),
      node(
        "teknik-dua-kali",
        "Semak Dua Kali",
        "Semakan pertama untuk isi dan bukti; semakan kedua untuk bahasa.",
      ),
    ]),
    branch("uasa", "Tip UASA", [
      node(
        "uasa-soalan",
        "Baca Soalan Dulu",
        "Ketahui maklumat yang perlu dicari sebelum meneliti bahan.",
      ),
      node(
        "uasa-sinonim",
        "Cari Lebih daripada Kata Sama",
        "Jejak sinonim dan ungkapan yang membawa maksud setara.",
      ),
      node(
        "uasa-sekeliling",
        "Baca Ayat Sekeliling",
        "Jawapan mungkin tersebar dalam ayat berdekatan.",
      ),
      node(
        "uasa-terus",
        "Teruskan Carian",
        "Jika beberapa isi diminta, teruskan mencari selepas isi pertama ditemukan.",
      ),
      node(
        "uasa-bukti",
        "Pilih Bukti Paling Tepat",
        "Ambil maklumat yang diperlukan dan tinggalkan butiran sampingan.",
      ),
      node(
        "uasa-jelas",
        "Jawab dengan Jelas",
        "Gunakan ayat yang ringkas, gramatis dan menepati bilangan isi.",
      ),
      node(
        "uasa-pendapat",
        "Jangan Campur Pendapat",
        "Masukkan pendapat hanya apabila soalan memintanya secara jelas.",
      ),
      node(
        "uasa-tiada-formula",
        "Tiada Formula Markah Tetap",
        "Ikuti arahan soalan dan format pentaksiran semasa; tiada panjang, masa atau jumlah markah yang menjamin skor.",
      ),
    ]),
  ],
};
