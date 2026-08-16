import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-analisis-petikan-pelbagai-bahan";

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

export const bahasaMelayuTingkatan3PelbagaiBahanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "PELBAGAI BAHAN",
  summary:
    "Soalan pelbagai bahan memerlukan murid mengenal pasti maklumat dalam setiap bahan, mencari hubungan antara bahan dan memilih bukti yang tepat mengikut kehendak soalan.",
  children: [
    branch("maksud", "Apa Itu Pelbagai Bahan?", [
      node(
        "maksud-definisi",
        "Maksud",
        "Pelbagai bahan bermaksud dua atau lebih sumber maklumat digunakan dalam satu set soalan.",
      ),
      branch("maksud-sumber", "Sumber yang Mungkin", [
        node("sumber-petikan", "Petikan Umum", "Teks penerangan, fakta atau pendapat."),
        node("sumber-dialog", "Dialog", "Pertuturan antara watak atau pihak."),
        node("sumber-poster", "Poster", "Mesej ringkas, slogan dan seruan tindakan."),
        node("sumber-iklan", "Iklan", "Maklumat promosi atau kempen."),
        node("sumber-infografik", "Infografik", "Fakta, kategori dan hubungan visual."),
        node("sumber-ilustrasi", "Ilustrasi", "Situasi, tindakan atau simbol."),
        node("sumber-jadual", "Jadual", "Maklumat tersusun dalam baris dan lajur."),
        node("sumber-carta", "Carta", "Perbandingan atau perubahan data."),
        node("sumber-sastera", "Petikan Sastera", "Peristiwa, watak, bahasa dan nilai."),
        node("sumber-emel", "E-mel", "Tujuan, maklumat dan respons komunikasi."),
      ]),
      node(
        "maksud-bilangan",
        "Bilangan Bahan Tidak Tetap",
        "Jangan anggap setiap set soalan sentiasa mengandungi bilangan bahan yang sama.",
      ),
    ]),
    branch("jenis", "Kenal Pasti Jenis Bahan", [
      branch("jenis-label", "Label Dahulu", [
        node("jenis-b1", "Bahan 1 → Petikan Umum", "Kenal pasti bentuk sumber pertama."),
        node("jenis-b2", "Bahan 2 → Poster", "Kenal pasti bentuk sumber kedua."),
        node(
          "jenis-b3",
          "Bahan 3 → Infografik",
          "Label bahan ketiga hanya apabila bahan itu memang diberikan.",
        ),
      ]),
      branch("jenis-kekuatan", "Kekuatan Setiap Bahan", [
        node("jenis-petikan", "Petikan", "Sesuai menunjukkan butiran dan penjelasan."),
        node("jenis-poster", "Poster", "Sesuai menunjukkan mesej, slogan dan tindakan."),
        node("jenis-info", "Infografik", "Sesuai menunjukkan fakta, kategori dan hubungan."),
        node("jenis-visual", "Visual", "Sesuai menunjukkan tindakan, situasi dan simbol."),
      ]),
      node(
        "jenis-format",
        "Format Bukan Pandangan",
        "Bahan yang berbeza format tidak semestinya membawa pandangan yang berbeza.",
      ),
    ]),
    branch("bahan-1", "Analisis Bahan 1", [
      branch("bahan-1-fokus", "Kenal Pasti", [
        node("bahan-1-tema", "Tema", "Isu umum yang dibincangkan."),
        node("bahan-1-utama", "Idea Utama", "Perkara teras yang disampaikan."),
        node("bahan-1-isi", "Isi Penting", "Maklumat yang mengembangkan idea utama."),
        node("bahan-1-fakta", "Fakta Utama", "Butiran yang boleh dibuktikan dalam bahan."),
        node("bahan-1-kunci", "Kata Kunci", "Perkataan yang menandakan fokus."),
      ]),
      branch("bahan-1-aliran", "Bahan 1 → Maklumat → Bukti", [
        node("bahan-1-tanya", "Apa Dibincangkan?", "Ringkaskan fokus bahan."),
        node("bahan-1-penting", "Apa Maklumat Penting?", "Pilih isi yang relevan."),
        node("bahan-1-bukti", "Apa Boleh Dijadikan Bukti?", "Tandakan sokongan yang tepat."),
      ]),
      branch("bahan-1-contoh", "Contoh Pencemaran Sungai", [
        node("bahan-1-petikan", "Petikan", "Petikan membincangkan pencemaran sungai."),
        node("bahan-1-idea", "Idea Utama", "Punca pencemaran sungai."),
        node(
          "bahan-1-isi-contoh",
          "Isi Penting",
          "Pembuangan sampah, sisa industri dan kurang kesedaran masyarakat.",
        ),
      ]),
    ]),
    branch("bahan-2", "Analisis Bahan 2", [
      node(
        "bahan-2-prinsip",
        "Cari Sumbangan Baharu",
        "Gunakan proses analisis yang sama, tetapi tentukan fungsi khusus bahan kedua tanpa mengulang rumusan Bahan 1.",
      ),
      branch("bahan-2-soalan", "Soalan Panduan", [
        node(
          "bahan-2-sokong",
          "Menyokong Bahan 1?",
          "Cari idea yang menguatkan maklumat terdahulu.",
        ),
        node("bahan-2-contoh", "Memberi Contoh?", "Kesan contoh khusus bagi idea umum."),
        node("bahan-2-kesan", "Menunjukkan Kesan?", "Cari akibat daripada masalah atau tindakan."),
        node("bahan-2-langkah", "Mencadangkan Langkah?", "Cari penyelesaian atau seruan tindakan."),
      ]),
      branch("bahan-2-poster", "Contoh Poster — Jaga Sungai Kita", [
        node("bahan-2-poster-1", "Tindakan 1", "Jangan membuang sampah."),
        node("bahan-2-poster-2", "Tindakan 2", "Amalkan gotong-royong."),
        node("bahan-2-poster-3", "Tindakan 3", "Laporkan pencemaran."),
      ]),
    ]),
    branch("bahan-3", "Analisis Bahan 3", [
      node(
        "bahan-3-syarat",
        "Jika Bahan Ketiga Wujud",
        "Kenal pasti sumbangannya. Jika set hanya mempunyai dua bahan, teruskan analisis tanpa mereka bahan ketiga.",
      ),
      branch("bahan-3-peranan", "Peranan yang Mungkin", [
        node("bahan-3-fakta", "Fakta Tambahan", "Menambah butiran yang relevan."),
        node("bahan-3-banding", "Perbandingan", "Menunjukkan persamaan atau perbezaan."),
        node("bahan-3-contoh", "Contoh", "Memberi kes khusus kepada idea umum."),
        node("bahan-3-visual", "Bukti Visual", "Menunjukkan tindakan, situasi atau simbol."),
        node("bahan-3-kesan", "Kesan", "Menunjukkan akibat sesuatu keadaan."),
        node("bahan-3-solusi", "Penyelesaian", "Mencadangkan langkah mengatasi isu."),
      ]),
      branch("bahan-3-info", "Contoh Infografik", [
        node(
          "bahan-3-info-data",
          "Maklumat",
          "Infografik menunjukkan tahap kebersihan sungai yang semakin menurun.",
        ),
        node(
          "bahan-3-info-guna",
          "Kegunaan",
          "Maklumat menjadi bukti bahawa masalah pencemaran semakin buruk.",
        ),
      ]),
    ]),
    branch("tema", "Cari Tema Bersama", [
      node("tema-soalan", "Soalan Utama", "Tanya: ‘Apakah isu yang menghubungkan semua bahan?’"),
      branch("tema-sungai", "Contoh Sungai", [
        node("tema-b1", "Bahan 1", "Punca pencemaran sungai."),
        node("tema-b2", "Bahan 2", "Langkah menjaga sungai."),
        node("tema-b3", "Bahan 3", "Kesan pencemaran."),
        node("tema-hasil", "Tema Bersama", "Pemeliharaan kebersihan sungai."),
      ]),
      node(
        "tema-fokus",
        "Tema Luas, Fokus Lebih Khusus",
        "Tema menyatukan bahan, tetapi jawapan mesti mengikut aspek sempit yang ditanya seperti punca, kesan atau langkah.",
      ),
    ]),
    branch("banding", "Banding Maklumat", [
      branch("banding-soalan", "Banding Fungsi dan Isi", [
        node("banding-sebab", "Bahan Mana Memberi Sebab?", "Kenal pasti sumber punca."),
        node("banding-kesan", "Bahan Mana Memberi Kesan?", "Kenal pasti sumber akibat."),
        node("banding-langkah", "Bahan Mana Memberi Langkah?", "Kenal pasti sumber penyelesaian."),
        node(
          "banding-contoh",
          "Bahan Mana Memberi Contoh?",
          "Kenal pasti sumber ilustrasi khusus.",
        ),
      ]),
      branch("banding-peranan", "Contoh Peranan Berbeza", [
        node("banding-b1", "Bahan 1 — Sebab", "Menerangkan punca masalah."),
        node("banding-b2", "Bahan 2 — Penyelesaian", "Mencadangkan tindakan."),
        node("banding-b3", "Bahan 3 — Kesan", "Menunjukkan akibat masalah."),
      ]),
      node(
        "banding-amaran",
        "Jangan Samakan Semua Bahan",
        "Setiap bahan mungkin menyumbang jenis maklumat dan kepentingan yang berbeza mengikut soalan.",
      ),
    ]),
    branch("hubung", "Hubungkan Idea", [
      branch("hubung-sebab", "Sebab → Kesan", [
        node("hubung-sebab-a", "Pembuangan Sampah", "Sebab."),
        node("hubung-sebab-b", "→ Sungai Tercemar", "Kesan."),
      ]),
      branch("hubung-masalah", "Masalah → Penyelesaian", [
        node("hubung-masalah-a", "Pencemaran", "Masalah."),
        node("hubung-masalah-b", "→ Kempen Kesedaran", "Penyelesaian."),
      ]),
      branch("hubung-tindakan", "Tindakan → Faedah", [
        node("hubung-tindakan-a", "Gotong-royong", "Tindakan."),
        node("hubung-tindakan-b", "→ Kawasan Lebih Bersih", "Faedah."),
      ]),
      branch("hubung-fakta", "Fakta → Contoh", [
        node("hubung-fakta-a", "Pernyataan Umum", "Fakta atau idea luas."),
        node("hubung-fakta-b", "→ Kes Khusus", "Contoh yang membuktikan atau menjelaskan."),
      ]),
      branch("hubung-rumus", "Bahan A + Bahan B = Idea Lebih Lengkap", [
        node("hubung-rumus-a", "Bahan A", "Pilih idea pertama yang relevan."),
        node("hubung-rumus-b", "+ Bahan B", "Pilih idea kedua yang berkaitan."),
        node(
          "hubung-rumus-hasil",
          "= Idea Lebih Lengkap",
          "Jelaskan hubungan antara kedua-duanya.",
        ),
      ]),
    ]),
    branch("persamaan", "Cari Persamaan", [
      node(
        "persamaan-maksud",
        "Maksud",
        "Persamaan berlaku apabila kedua-dua bahan menyampaikan perkara yang benar-benar berkaitan.",
      ),
      branch("persamaan-contoh", "Contoh Aktiviti Fizikal", [
        node("persamaan-b1", "Bahan 1", "Kepentingan bersenam."),
        node("persamaan-b2", "Bahan 2", "Faedah aktiviti fizikal."),
        node(
          "persamaan-hasil",
          "Persamaan",
          "Kedua-dua bahan menekankan manfaat aktiviti fizikal.",
        ),
      ]),
      node(
        "persamaan-struktur",
        "Struktur Jawapan",
        "Gunakan ‘Kedua-dua bahan menunjukkan bahawa…’ hanya apabila persamaan itu dibuktikan oleh kedua-duanya.",
      ),
    ]),
    branch("perbezaan", "Cari Perbezaan", [
      branch("perbezaan-aspek", "Aspek yang Boleh Berbeza", [
        node("perbezaan-fokus", "Fokus", "Aspek khusus yang dibincangkan."),
        node("perbezaan-pandangan", "Sudut Pandangan", "Cara isu dinilai atau diterangkan."),
        node("perbezaan-sebab", "Sebab", "Punca yang diketengahkan."),
        node("perbezaan-kesan", "Kesan", "Akibat yang diterangkan."),
        node("perbezaan-cadang", "Cadangan", "Langkah yang disarankan."),
        node("perbezaan-contoh", "Contoh", "Kes khusus yang digunakan."),
        node(
          "perbezaan-format",
          "Format",
          "Cara maklumat dipersembahkan, bukan bukti automatik pandangan berbeza.",
        ),
      ]),
      branch("perbezaan-sihat", "Contoh Gaya Hidup", [
        node("perbezaan-b1", "Bahan 1", "Menerangkan punca gaya hidup tidak sihat."),
        node("perbezaan-b2", "Bahan 2", "Mencadangkan amalan gaya hidup sihat."),
        node(
          "perbezaan-hasil",
          "Perbezaan",
          "Satu bahan menjelaskan masalah, manakala bahan yang lain mencadangkan penyelesaian.",
        ),
      ]),
      node(
        "perbezaan-amaran",
        "Jangan Paksa Perbezaan",
        "Format berlainan sahaja tidak membuktikan fokus atau pandangan yang berlainan.",
      ),
    ]),
    branch("bukti", "Gabungkan Bukti", [
      node(
        "bukti-prinsip",
        "Pilih Merentas Bahan",
        "Jawapan kukuh boleh menggunakan bukti daripada lebih daripada satu bahan apabila kedua-duanya relevan.",
      ),
      branch("bukti-sungai", "Contoh Kebersihan Sungai", [
        node(
          "bukti-soalan",
          "Soalan",
          "‘Bagaimanakah masyarakat boleh menjaga kebersihan sungai?’",
        ),
        node("bukti-b1", "Bahan 1", "Elakkan membuang sampah ke sungai."),
        node("bukti-b2", "Bahan 2", "Sertai aktiviti gotong-royong."),
        node(
          "bukti-jawapan",
          "Jawapan Gabungan",
          "Masyarakat boleh mengelakkan pembuangan sampah ke sungai dan menyertai aktiviti gotong-royong bagi memastikan sungai sentiasa bersih.",
        ),
      ]),
      node(
        "bukti-relevan",
        "Relevan Lebih Penting",
        "Jangan paksa setiap bahan atau terlalu banyak fakta ke dalam setiap jawapan; gunakan hanya bukti yang menjawab fokus.",
      ),
    ]),
    branch("inferens", "Buat Inferens", [
      node(
        "inferens-maksud",
        "Gabungkan Petunjuk",
        "Inferens merumuskan perkara yang tidak dinyatakan secara terus tetapi disokong oleh petunjuk merentas bahan.",
      ),
      branch("inferens-contoh", "Contoh Kesedaran Alam Sekitar", [
        node("inferens-b1", "Bahan 1", "Aduan pencemaran semakin meningkat."),
        node("inferens-b2", "Bahan 2", "Kualiti air semakin menurun."),
        node(
          "inferens-hasil",
          "Inferens",
          "Kesedaran masyarakat atau penguatkuasaan mungkin masih tidak mencukupi.",
        ),
      ]),
      branch("inferens-syarat", "Syarat Inferens", [
        node("inferens-munasabah", "Munasabah", "Selaras dengan konteks semua petunjuk."),
        node("inferens-disokong", "Disokong", "Dapat dijejak kepada bukti dalam bahan."),
        node(
          "inferens-sederhana",
          "Tidak Keterlaluan",
          "Tidak melampaui perkara yang boleh dibuktikan.",
        ),
      ]),
      node(
        "inferens-amaran",
        "Jangan Reka Fakta",
        "Jangan cipta statistik, nama, peristiwa atau pendapat peribadi yang mengatasi bukti sumber.",
      ),
    ]),
    branch("jawapan", "Bina Jawapan", [
      branch("jawapan-struktur", "Struktur Mengikut Kehendak", [
        node("jawapan-satu", "Satu Bahan", "Isi + bukti daripada bahan yang relevan."),
        node("jawapan-silang", "Merentas Bahan", "Idea Bahan 1 + idea Bahan 2."),
        node(
          "jawapan-banding",
          "Perbandingan",
          "Persamaan atau perbezaan + bukti daripada kedua-dua bahan.",
        ),
        node("jawapan-inferens", "Inferens", "Kesimpulan + petunjuk gabungan."),
      ]),
      node(
        "jawapan-contoh",
        "Contoh Perbandingan",
        "Bahan 1 menekankan punca pencemaran, manakala Bahan 2 memberikan langkah untuk mengatasinya.",
      ),
      branch("latihan", "Contoh latihan — Amalan Gaya Hidup Sihat", [
        node(
          "latihan-nota",
          "Bahan Fiksyen untuk Latihan",
          "Ketiga-tiga bahan berikut dicipta untuk latihan dan bukan soalan peperiksaan rasmi.",
        ),
        node(
          "latihan-b1",
          "Bahan 1 — Petikan",
          "Petikan ringkas menerangkan faedah bersenam secara berkala.",
        ),
        node("latihan-b2", "Bahan 2 — Poster", "Poster menggalakkan pilihan makanan yang sihat."),
        node(
          "latihan-b3",
          "Bahan 3 — Infografik",
          "Infografik ringkas menunjukkan kepentingan tidur yang mencukupi.",
        ),
        branch("latihan-s1", "Soalan 1 — Sintesis", [
          node(
            "latihan-s1-soalan",
            "Soalan",
            "‘Apakah tema yang menghubungkan ketiga-tiga bahan?’",
          ),
          node(
            "latihan-s1-jawapan",
            "Jawapan",
            "Tema yang menghubungkan ketiga-tiga bahan ialah amalan gaya hidup sihat.",
          ),
          node(
            "latihan-s1-analisis",
            "Analisis",
            "Jawapan mensintesis tema bersama ketiga-tiga bahan.",
          ),
        ]),
        branch("latihan-s2", "Soalan 2 — Maklumat Tersurat Merentas Bahan", [
          node("latihan-s2-soalan", "Soalan", "‘Nyatakan dua amalan yang boleh diamalkan.’"),
          node(
            "latihan-s2-jawapan",
            "Jawapan",
            "Antara amalan tersebut ialah bersenam secara berkala dan memilih makanan yang sihat.",
          ),
          node(
            "latihan-s2-analisis",
            "Analisis",
            "Jawapan memilih maklumat tersurat yang relevan daripada dua bahan.",
          ),
        ]),
        branch("latihan-s3", "Soalan 3 — KBAT Berdasarkan Tema", [
          node(
            "latihan-s3-soalan",
            "Soalan",
            "‘Pada pendapat anda, apakah kesan jika remaja mengabaikan amalan tersebut?’",
          ),
          node(
            "latihan-s3-jawapan",
            "Jawapan Mungkin",
            "Remaja yang mengabaikan gaya hidup sihat mungkin mengalami masalah kecergasan dan sukar mengekalkan kesihatan tubuh dalam jangka panjang.",
          ),
          node(
            "latihan-s3-analisis",
            "Analisis",
            "Jawapan KBAT kekal berasaskan tema dan tidak mengatasi bukti sumber.",
          ),
        ]),
      ]),
      node(
        "jawapan-ringkas",
        "Tepat dan Ringkas",
        "Tidak semua bahan perlu diringkaskan dalam jawapan akhir dan jawapan lebih panjang tidak semestinya lebih kuat.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-satu",
        "Hanya Baca Satu Bahan",
        "Mengabaikan maklumat penting daripada sumber lain.",
      ),
      node(
        "kesalahan-sama",
        "Semua Bahan Dianggap Sama Penting",
        "Tidak menilai kerelevanan mengikut soalan.",
      ),
      node("kesalahan-salin", "Salin Tanpa Hubungan", "Mengumpul isi tanpa menjelaskan kaitannya."),
      node(
        "kesalahan-campur",
        "Campur Fakta Tidak Berkaitan",
        "Menggabungkan idea yang tidak menyokong fokus sama.",
      ),
      node("kesalahan-tema", "Salah Kenal Tema", "Memilih isu yang tidak merangkumi bahan."),
      node("kesalahan-fokus", "Jawab Tema, Bukan Fokus", "Memberi jawapan terlalu umum."),
      node(
        "kesalahan-inferens",
        "Inferens Tanpa Bukti",
        "Membuat kesimpulan tanpa petunjuk sumber.",
      ),
      node(
        "kesalahan-visual",
        "Visual Diguna Berlebihan",
        "Menganggap semua unsur hiasan sebagai maklumat penting.",
      ),
      node(
        "kesalahan-persamaan",
        "Paksa Persamaan",
        "Mendakwa persamaan yang tidak benar-benar wujud.",
      ),
      node(
        "kesalahan-perbezaan",
        "Paksa Perbezaan",
        "Menganggap format berlainan membuktikan isi berlainan.",
      ),
      node("kesalahan-luar", "Tambah Fakta Luar", "Membiarkan pengetahuan luar mengatasi sumber."),
      node("kesalahan-ubah", "Ubah Fakta Asal", "Mengolah hingga maksud sumber berubah."),
      node(
        "kesalahan-panjang",
        "Panjang tetapi Tidak Tepat",
        "Menulis banyak tanpa menjawab kehendak.",
      ),
    ]),
    branch("uasa", "Tip UASA", [
      branch("uasa-proses", "Proses Fleksibel", [
        node("uasa-label", "1. LABEL", "Label setiap bahan."),
        node("uasa-ringkas", "2. RINGKAS", "Ringkaskan setiap bahan dalam satu ayat."),
        node("uasa-hubung", "3. HUBUNG", "Cari hubungan antara idea."),
        node("uasa-fokus", "4. FOKUS", "Baca perkara khusus yang ditanya."),
        node("uasa-bukti", "5. BUKTI", "Pilih maklumat yang relevan."),
        node("uasa-jawab", "6. JAWAB", "Tulis jawapan yang tepat dan ringkas."),
      ]),
      branch("uasa-mnemonik", "L-R-H-F-B-J", [
        node("uasa-l", "L — Label Bahan", "Kenal pasti setiap sumber."),
        node("uasa-r", "R — Ringkaskan", "Nyatakan fokus setiap bahan."),
        node("uasa-h", "H — Hubungkan", "Cari sebab, kesan, contoh atau penyelesaian."),
        node("uasa-f", "F — Fokus Soalan", "Tentukan perkara yang perlu dijawab."),
        node("uasa-b", "B — Bukti", "Pilih sokongan yang paling relevan."),
        node("uasa-j", "J — Jawab", "Sampaikan jawapan secara gramatis."),
      ]),
      node(
        "uasa-fleksibel",
        "Alat Ingatan, Bukan Formula Kaku",
        "Jangan tetapkan bilangan bahan, isi, panjang jawapan atau markah yang dijamin. Ikut arahan sebenar soalan.",
      ),
    ]),
  ],
};
