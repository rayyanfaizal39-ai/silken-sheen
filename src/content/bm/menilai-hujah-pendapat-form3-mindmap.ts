import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-menilai-hujah-pendapat";

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

export const bahasaMelayuTingkatan3MenilaiHujahMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "NILAI HUJAH",
  summary:
    "Hujah yang baik mempunyai pendirian yang jelas, alasan yang relevan, bukti yang sesuai dan hubungan logik antara idea.",
  children: [
    branch("maksud", "Apa Itu Hujah?", [
      node(
        "maksud-definisi",
        "Definisi",
        "Hujah ialah pendapat atau pendirian yang disokong oleh alasan dan bukti.",
      ),
      branch("maksud-rumus", "HUJAH = DAKWAAN + ALASAN + BUKTI", [
        node("maksud-dakwaan", "Dakwaan", "Perkara yang ingin diyakinkan kepada pembaca."),
        node("maksud-alasan", "Alasan", "Penjelasan tentang sebab dakwaan itu munasabah."),
        node("maksud-bukti", "Bukti", "Maklumat yang menyokong alasan atau dakwaan."),
      ]),
      branch("maksud-contoh", "Contoh Amalan Membaca", [
        node("maksud-contoh-dakwaan", "Dakwaan", "Murid perlu mengamalkan tabiat membaca."),
        node("maksud-contoh-alasan", "Alasan", "Membaca dapat meningkatkan pengetahuan."),
        node(
          "maksud-contoh-bukti",
          "Bukti atau Sokongan",
          "Murid memperoleh maklumat dan kosa kata baharu melalui bahan bacaan.",
        ),
      ]),
      node(
        "maksud-yakin",
        "Sokongan Menambah Keyakinan",
        "Sesuatu pernyataan menjadi lebih meyakinkan apabila dakwaan, alasan dan sokongannya jelas.",
      ),
    ]),
    branch("fakta-pendapat", "Fakta dan Pendapat", [
      branch("fakta", "Fakta", [
        node(
          "fakta-maksud",
          "Maksud",
          "Maklumat yang boleh disahkan melalui bukti atau sumber yang sesuai.",
        ),
        node("fakta-contoh", "Contoh", "Air membeku pada suhu tertentu dalam keadaan tertentu."),
      ]),
      branch("pendapat", "Pendapat", [
        node(
          "pendapat-maksud",
          "Maksud",
          "Pandangan, penilaian atau pilihan yang mungkin berbeza antara individu.",
        ),
        node(
          "pendapat-contoh",
          "Contoh",
          "Membaca novel ialah aktiviti yang paling menyeronokkan.",
        ),
      ]),
      branch("pendapat-isyarat", "Kata Isyarat yang Mungkin", [
        node("isyarat-saya", "Pada Pendapat Saya", "Boleh menandakan pandangan peribadi."),
        node("isyarat-berpendapat", "Saya Berpendapat", "Boleh memperkenalkan pendirian."),
        node("isyarat-wajar", "Wajar", "Boleh menunjukkan penilaian."),
        node("isyarat-terbaik", "Terbaik", "Boleh menunjukkan perbandingan subjektif."),
        node("isyarat-sesuai", "Lebih Sesuai", "Boleh menunjukkan pilihan atau pertimbangan."),
      ]),
      node(
        "pendapat-amaran",
        "Nilai Keseluruhan Ayat",
        "Jangan tentukan fakta atau pendapat berdasarkan satu kata kunci sahaja; semak sama ada maklumat dapat disahkan.",
      ),
    ]),
    branch("dakwaan", "Kenal Pasti Dakwaan", [
      node(
        "dakwaan-soalan",
        "Soalan Panduan",
        "Tanya: ‘Apakah perkara utama yang cuba diyakinkan oleh penulis?’",
      ),
      branch("dakwaan-awam", "Contoh Pengangkutan Awam", [
        node(
          "dakwaan-awam-ayat",
          "Ayat",
          "Penggunaan pengangkutan awam perlu digalakkan kerana dapat membantu mengurangkan jumlah kenderaan di jalan raya.",
        ),
        node(
          "dakwaan-awam-utama",
          "Dakwaan Utama",
          "Penggunaan pengangkutan awam perlu digalakkan.",
        ),
        node(
          "dakwaan-awam-alasan",
          "Alasan Sokongan",
          "Dapat membantu mengurangkan jumlah kenderaan di jalan raya.",
        ),
      ]),
      node(
        "dakwaan-beza",
        "Dakwaan Bukan Alasan",
        "Dakwaan ialah pendirian utama, manakala alasan menerangkan mengapa pendirian itu patut diterima.",
      ),
    ]),
    branch("alasan", "Kenal Pasti Alasan", [
      node("alasan-soalan", "Soalan Panduan", "Tanya: ‘Mengapakah penulis berpendapat demikian?’"),
      branch("alasan-sukan", "Contoh Aktiviti Sukan", [
        node("alasan-sukan-dakwaan", "Dakwaan", "Sekolah perlu menggalakkan aktiviti sukan."),
        node(
          "alasan-sukan-alasan",
          "Alasan",
          "Aktiviti sukan membantu murid kekal aktif dan sihat.",
        ),
      ]),
      branch("alasan-banding", "Alasan Kuat atau Lemah", [
        node(
          "alasan-banding-kuat",
          "Kuat",
          "Sekolah perlu menggalakkan sukan kerana aktiviti fizikal menyokong kesihatan murid.",
        ),
        node(
          "alasan-banding-lemah",
          "Lemah",
          "Sekolah perlu menggalakkan sukan kerana bangunan sekolah besar.",
        ),
        node(
          "alasan-banding-sebab",
          "Mengapa Lemah?",
          "Saiz bangunan mungkin benar, tetapi tidak menerangkan sebab aktiviti sukan perlu digalakkan.",
        ),
      ]),
    ]),
    branch("bukti", "Cari Bukti", [
      branch("bukti-bentuk", "Bentuk Sokongan", [
        node("bukti-contoh", "Contoh", "Kes khusus yang menjelaskan dakwaan."),
        node("bukti-pemerhatian", "Pemerhatian", "Perkara yang dilihat atau dicatat."),
        node("bukti-peristiwa", "Peristiwa", "Kejadian yang menyokong alasan."),
        node("bukti-fakta", "Fakta", "Maklumat yang boleh disahkan."),
        node(
          "bukti-banding",
          "Perbandingan",
          "Maklumat yang menunjukkan persamaan atau perbezaan.",
        ),
        node("bukti-petikan", "Maklumat Petikan", "Butiran relevan daripada bahan yang diberikan."),
      ]),
      branch("bukti-kitar", "Contoh Program Kitar Semula", [
        node("bukti-kitar-dakwaan", "Dakwaan", "Program kitar semula mendapat sambutan."),
        node(
          "bukti-kitar-sokongan",
          "Bukti",
          "Jumlah murid yang menyertai program meningkat setiap minggu.",
        ),
      ]),
      node(
        "bukti-tepat",
        "Sokong Secara Langsung",
        "Bukti perlu membuktikan dakwaan, bukan sekadar berkaitan dengan tema umum.",
      ),
      node(
        "bukti-jangan-reka",
        "Jangan Cipta Bukti",
        "Jangan mereka statistik, kajian, nama pakar, organisasi atau tinjauan yang tidak dibekalkan oleh bahan.",
      ),
    ]),
    branch("relevan", "Relevan atau Tidak?", [
      node(
        "relevan-prinsip",
        "Benar Belum Tentu Relevan",
        "Maklumat boleh benar tetapi masih tidak membantu menjawab soalan atau menyokong dakwaan.",
      ),
      branch("relevan-basikal", "Contoh Basikal", [
        node(
          "relevan-soalan",
          "Soalan",
          "Adakah penggunaan basikal dapat membantu mengurangkan pencemaran?",
        ),
        node("relevan-ya", "Relevan", "Basikal tidak menghasilkan asap ekzos semasa digunakan."),
        node("relevan-kurang", "Kurang Relevan", "Basikal terdapat dalam pelbagai warna."),
      ]),
      branch("relevan-aliran", "SOALAN → DAKWAAN → BUKTI → ADA KAITAN?", [
        node("relevan-aliran-soalan", "Soalan", "Kenal pasti fokus penilaian."),
        node("relevan-aliran-dakwaan", "→ Dakwaan", "Tentukan pendirian yang dinilai."),
        node("relevan-aliran-bukti", "→ Bukti", "Pilih maklumat sokongan."),
        node("relevan-aliran-kaitan", "→ Ada Kaitan?", "Uji hubungan secara langsung."),
      ]),
    ]),
    branch("kuat", "Kuat atau Lemah?", [
      branch("kuat-lemah", "Hujah Lemah", [
        node("kuat-lemah-ayat", "Ayat", "Murid perlu membaca kerana membaca itu bagus."),
        node("kuat-lemah-kabur", "Kabur", "Perkataan ‘bagus’ tidak menerangkan manfaat khusus."),
        node("kuat-lemah-ulang", "Berulang", "Alasan hanya mengulangi idea membaca."),
        node(
          "kuat-lemah-tiada",
          "Tiada Penjelasan",
          "Hubungan dakwaan dan alasan tidak dikembangkan.",
        ),
      ]),
      branch("kuat-baik", "Hujah Lebih Kuat", [
        node(
          "kuat-baik-ayat",
          "Ayat",
          "Murid perlu membudayakan amalan membaca kerana aktiviti tersebut dapat memperluas pengetahuan dan meningkatkan penguasaan kosa kata.",
        ),
        node("kuat-baik-dakwaan", "Dakwaan Jelas", "Pendirian dapat dikenal pasti."),
        node("kuat-baik-alasan", "Alasan Relevan", "Manfaat membaca menyokong pendirian."),
        node("kuat-baik-hubung", "Hubungan Difahami", "Sebab dan hasil dinyatakan dengan jelas."),
      ]),
      node(
        "kuat-panjang",
        "Panjang Bukan Ukuran",
        "Hujah lebih panjang tidak semestinya lebih kuat; nilai mutu alasan, bukti dan logiknya.",
      ),
    ]),
    branch("logik", "Logik atau Tidak?", [
      branch("logik-kitar", "Tindakan dan Kesan", [
        node("logik-tindakan", "Tindakan", "Mengadakan program kitar semula."),
        node("logik-kesan", "Kesan Logik", "Membantu mengurangkan jumlah sisa yang dibuang."),
        node(
          "logik-tidak",
          "Kesan Tidak Logik",
          "Menjamin semua murid memperoleh keputusan peperiksaan cemerlang.",
        ),
      ]),
      node(
        "logik-soalan",
        "Uji Sebab dan Kesan",
        "Tanya: ‘Adakah kesan ini benar-benar boleh berlaku akibat tindakan tersebut?’",
      ),
      branch("logik-melampau", "Kesimpulan Melampau", [
        node(
          "logik-melampau-lemah",
          "Lemah",
          "Jika murid membaca setiap hari, semua masalah pendidikan akan selesai.",
        ),
        node(
          "logik-melampau-baik",
          "Lebih Munasabah",
          "Amalan membaca secara konsisten boleh membantu meningkatkan pengetahuan dan penguasaan bahasa murid.",
        ),
      ]),
    ]),
    branch("banding", "Banding Dua Pendapat", [
      branch("banding-telefon", "Contoh Telefon Pintar", [
        node(
          "banding-a",
          "Pendapat A",
          "Telefon pintar tidak sepatutnya digunakan semasa pembelajaran kerana boleh mengganggu tumpuan.",
        ),
        node(
          "banding-b",
          "Pendapat B",
          "Telefon pintar boleh digunakan dalam pembelajaran kerana memudahkan murid mengakses bahan pendidikan.",
        ),
      ]),
      branch("banding-aspek", "Aspek Perbandingan", [
        node("banding-dakwaan", "Dakwaan", "Bandingkan pendirian utama."),
        node("banding-alasan", "Alasan", "Bandingkan sebab yang diberikan."),
        node("banding-bukti", "Bukti", "Nilai sokongan bagi setiap pendirian."),
        node("banding-faedah", "Kelebihan", "Kenal pasti manfaat setiap pandangan."),
        node("banding-batas", "Batasan", "Kenal pasti kelemahan atau syaratnya."),
      ]),
      node(
        "banding-kesimpulan",
        "Kesimpulan Seimbang",
        "Kedua-dua pendapat mempunyai alasan yang munasabah. Penggunaan telefon pintar boleh membantu pembelajaran jika penggunaannya dikawal dan berkaitan dengan aktiviti pendidikan.",
      ),
      node(
        "banding-pilih",
        "Tidak Semestinya Pilih Satu",
        "Jangan paksa memilih satu pihak apabila soalan hanya meminta perbandingan.",
      ),
    ]),
    branch("setuju", "Setuju atau Tidak?", [
      branch("setuju-soalan", "Bentuk Soalan", [
        node("setuju-adakah", "Adakah Anda Bersetuju?", "Nyatakan pendirian dan sebab."),
        node("setuju-wajar", "Wajarkah Tindakan Tersebut?", "Nilai tindakan berdasarkan alasan."),
        node(
          "setuju-pendapat",
          "Apakah Pendapat Anda?",
          "Berikan pandangan yang relevan dan logik.",
        ),
      ]),
      branch("setuju-rumus", "PENDIRIAN + ALASAN + KESAN / CONTOH", [
        node(
          "setuju-pendirian",
          "Pendirian",
          "Nyatakan setuju, tidak setuju atau pendirian bersyarat.",
        ),
        node("setuju-alasan", "+ Alasan", "Terangkan mengapa pendirian munasabah."),
        node("setuju-kesan", "+ Kesan atau Contoh", "Jelaskan implikasi atau sokongan."),
      ]),
      branch("setuju-gotong", "Contoh Gotong-royong", [
        node(
          "setuju-gotong-soalan",
          "Soalan",
          "Wajarkah sekolah mengadakan aktiviti gotong-royong?",
        ),
        node(
          "setuju-gotong-jawapan",
          "Jawapan",
          "Ya, aktiviti gotong-royong wajar diadakan kerana dapat menjaga kebersihan kawasan sekolah serta memupuk kerjasama dalam kalangan murid.",
        ),
      ]),
      node(
        "setuju-fleksibel",
        "Pendirian Lain Boleh Diterima",
        "Murid tidak wajib bersetuju dengan penulis; pendirian berbeza boleh diterima jika disokong secara logik.",
      ),
    ]),
    branch("justifikasi", "Bina Justifikasi", [
      node("justifikasi-1", "Tahap 1 — Tidak Lengkap", "Saya setuju."),
      node(
        "justifikasi-2",
        "Tahap 2 — Lebih Baik tetapi Kabur",
        "Saya setuju kerana program itu bermanfaat.",
      ),
      node(
        "justifikasi-3",
        "Tahap 3 — Jelas dan Khusus",
        "Saya bersetuju kerana program tersebut dapat meningkatkan kesedaran murid tentang penjagaan alam sekitar melalui penglibatan secara langsung dalam aktiviti kitar semula.",
      ),
      branch("justifikasi-rumus", "JUSTIFIKASI = MENGAPA + BAGAIMANA / KESAN", [
        node("justifikasi-mengapa", "Mengapa", "Berikan sebab yang relevan."),
        node(
          "justifikasi-bagaimana",
          "+ Bagaimana atau Kesan",
          "Jelaskan cara atau hasil yang menguatkan alasan.",
        ),
      ]),
    ]),
    branch("kesimpulan", "Buat Kesimpulan", [
      node(
        "kesimpulan-prinsip",
        "Pertimbang Bukti Dahulu",
        "Kesimpulan dibuat selepas menilai kekuatan dan batas maklumat yang diberikan.",
      ),
      branch("kesimpulan-kitar", "Contoh Program Kitar Semula", [
        node("kesimpulan-a", "Bukti A", "Penyertaan program meningkat."),
        node(
          "kesimpulan-b",
          "Bukti B",
          "Sisa yang dikumpulkan untuk dikitar semula turut meningkat.",
        ),
        node(
          "kesimpulan-hasil",
          "Kesimpulan",
          "Berdasarkan maklumat tersebut, program kitar semula menunjukkan kesan yang positif terhadap penglibatan murid.",
        ),
      ]),
      node(
        "kesimpulan-elak",
        "Elakkan Dakwaan Melampau",
        "Jangan menyimpulkan bahawa program itu pasti menyelesaikan semua masalah sampah.",
      ),
      node(
        "kesimpulan-had",
        "Ikut Kekuatan Bukti",
        "Kesimpulan tidak boleh melebihi perkara yang benar-benar disokong oleh bukti.",
      ),
    ]),
    branch("contoh", "Contoh Analisis", [
      branch("contoh-latihan", "Contoh Latihan", [
        node(
          "contoh-petikan",
          "Petikan",
          "Sesetengah pihak berpendapat bahawa sekolah perlu memperbanyakkan aktiviti luar bilik darjah. Aktiviti seperti berkebun, sukan dan projek komuniti memberikan peluang kepada murid untuk mempraktikkan kemahiran yang dipelajari. Namun begitu, aktiviti tersebut perlu dirancang dengan baik agar tidak mengganggu pembelajaran akademik.",
        ),
        branch("contoh-s1", "Soalan 1 — Dakwaan", [
          node("contoh-s1-soalan", "Soalan", "Apakah pendapat utama yang dikemukakan?"),
          node(
            "contoh-s1-jawapan",
            "Jawapan",
            "Sekolah perlu memperbanyakkan aktiviti luar bilik darjah.",
          ),
          node("contoh-s1-jenis", "Jenis", "DAKWAAN."),
        ]),
        branch("contoh-s2", "Soalan 2 — Alasan", [
          node("contoh-s2-soalan", "Soalan", "Apakah alasan yang menyokong pendapat tersebut?"),
          node(
            "contoh-s2-jawapan",
            "Jawapan",
            "Aktiviti luar bilik darjah memberikan peluang kepada murid untuk mempraktikkan kemahiran yang dipelajari.",
          ),
          node("contoh-s2-jenis", "Jenis", "ALASAN."),
        ]),
        branch("contoh-s3", "Soalan 3 — Batasan", [
          node("contoh-s3-soalan", "Soalan", "Apakah batasan yang turut dinyatakan?"),
          node(
            "contoh-s3-jawapan",
            "Jawapan",
            "Aktiviti tersebut perlu dirancang dengan baik supaya tidak mengganggu pembelajaran akademik.",
          ),
          node("contoh-s3-jenis", "Jenis", "BATASAN / PERTIMBANGAN."),
        ]),
        branch("contoh-s4", "Soalan 4 — Penilaian", [
          node(
            "contoh-s4-soalan",
            "Soalan",
            "Pada pendapat anda, adakah hujah tersebut munasabah?",
          ),
          node(
            "contoh-s4-jawapan",
            "Jawapan Mungkin",
            "Ya, hujah tersebut munasabah kerana aktiviti luar bilik darjah boleh memberikan pengalaman praktikal kepada murid, tetapi pelaksanaannya perlu seimbang dengan keperluan akademik.",
          ),
          node(
            "contoh-s4-analisis",
            "Mengapa Seimbang?",
            "Jawapan menyatakan pendirian, menggunakan petikan, mempertimbangkan manfaat dan batasan serta membina kesimpulan yang seimbang.",
          ),
        ]),
      ]),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-opini",
        "Pendapat = Fakta",
        "Menganggap sesuatu pandangan telah terbukti secara automatik.",
      ),
      node("kesalahan-fakta", "Fakta = Pendapat", "Mengabaikan maklumat yang boleh disahkan."),
      node("kesalahan-dakwaan", "Dakwaan Tanpa Alasan", "Memberi pendirian tanpa justifikasi."),
      node("kesalahan-alasan", "Alasan Tidak Berkaitan", "Sebab tidak menyokong dakwaan."),
      node(
        "kesalahan-bukti",
        "Bukti Lemah",
        "Maklumat berkaitan tema tetapi tidak membuktikan dakwaan.",
      ),
      node("kesalahan-cipta", "Cipta Bukti", "Mereka statistik, kajian atau pakar."),
      node(
        "kesalahan-setuju",
        "Setuju Tanpa Sebab",
        "Menjawab ‘Ya, saya setuju’ tanpa penerangan.",
      ),
      node("kesalahan-emosi", "Terlalu Emosi", "Menggantikan penaakulan dengan perasaan peribadi."),
      node(
        "kesalahan-melampau",
        "Kesimpulan Melampau",
        "Membuat dakwaan besar daripada bukti yang terhad.",
      ),
      node(
        "kesalahan-panjang",
        "Panjang = Kuat",
        "Menambah perkataan tanpa memperbaik alasan atau bukti.",
      ),
      node(
        "kesalahan-lain",
        "Abaikan Pendapat Lain",
        "Tidak mempertimbangkan pandangan lain apabila perbandingan diminta.",
      ),
    ]),
    branch("uasa", "Tip UASA", [
      branch("uasa-langkah", "Tujuh Langkah", [
        node("uasa-1", "1. Cari Dakwaan", "Apakah perkara yang dihujahkan?"),
        node("uasa-2", "2. Cari Alasan", "Mengapakah pendirian itu diberikan?"),
        node("uasa-3", "3. Semak Bukti", "Apakah maklumat yang menyokongnya?"),
        node("uasa-4", "4. Uji Kaitan", "Adakah bukti benar-benar menyokong hujah?"),
        node("uasa-5", "5. Uji Logik", "Adakah hubungan idea masuk akal?"),
        node("uasa-6", "6. Nilai", "Adakah hujah meyakinkan berdasarkan bahan?"),
        node("uasa-7", "7. Jawab", "Berikan justifikasi yang jelas."),
      ]),
      branch("uasa-dabl", "D-A-B-L", [
        node("uasa-d", "D — Dakwaan", "Kenal pasti pendirian utama."),
        node("uasa-a", "A — Alasan", "Kenal pasti sebab yang diberikan."),
        node("uasa-b", "B — Bukti", "Nilai sokongan yang digunakan."),
        node("uasa-l", "L — Logik", "Uji hubungan antara semua unsur."),
      ]),
      node(
        "uasa-rumus",
        "DAB + LOGIK = HUJAH LEBIH KUAT",
        "Gunakan sebagai alat ingatan, bukan formula peperiksaan yang kaku atau jaminan markah.",
      ),
    ]),
  ],
};
