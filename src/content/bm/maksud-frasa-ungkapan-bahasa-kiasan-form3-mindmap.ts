import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-maksud-frasa-ungkapan-bahasa-kiasan";

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

export const bahasaMelayuTingkatan3MaksudFrasaBahasaKiasanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "TAFSIR MAKNA",
  summary:
    "Makna sesuatu perkataan atau ungkapan perlu ditentukan berdasarkan konteks. Murid perlu memahami bukan sahaja maksud literal, tetapi juga maksud tersirat, bahasa kiasan dan kesannya terhadap mesej petikan.",
  children: [
    branch("makna-konteks", "Makna dalam Konteks", [
      node(
        "makna-konteks-prinsip",
        "Konteks Menentukan Makna",
        "Perkataan yang sama boleh membawa makna yang berbeza mengikut ayat. Jangan terus memilih makna kamus pertama; baca ayat dan idea di sekelilingnya.",
      ),
      branch("makna-konteks-langkah", "Contoh ‘Langkah’", [
        node(
          "makna-konteks-langkah-ayat",
          "Ayat",
          "Dia mengambil langkah untuk menyelesaikan masalah.",
        ),
        node(
          "makna-konteks-langkah-maksud",
          "Maksud",
          "‘Langkah’ bermaksud tindakan atau usaha, bukannya pergerakan kaki.",
        ),
      ]),
      branch("makna-konteks-tulang", "Contoh ‘Tulang Belakang’", [
        node(
          "makna-konteks-tulang-ayat",
          "Ayat",
          "Pasukan itu menjadi tulang belakang program tersebut.",
        ),
        node(
          "makna-konteks-tulang-maksud",
          "Maksud",
          "Pihak utama yang memberikan sokongan, bukannya tulang belakang manusia.",
        ),
      ]),
    ]),
    branch("perkataan", "Maksud Perkataan", [
      node(
        "perkataan-petunjuk",
        "Enam Sumber Petunjuk",
        "Gunakan perkataan sekeliling, topik, hubungan sebab dan kesan, pertentangan, contoh serta fungsi perkataan dalam ayat.",
      ),
      branch("perkataan-meruncing", "Contoh ‘Meruncing’", [
        node("perkataan-meruncing-ayat", "Ayat", "Keadaan ekonomi keluarga itu semakin meruncing."),
        node(
          "perkataan-meruncing-maksud",
          "Maksud",
          "Menjadi semakin serius atau buruk, bukannya menjadi tajam secara fizikal.",
        ),
      ]),
      node(
        "perkataan-fungsi",
        "Semak Fungsi Ayat",
        "Pastikan maksud yang dipilih sesuai dengan perkara yang diterangkan dan peranan perkataan dalam ayat.",
      ),
    ]),
    branch("frasa", "Maksud Frasa", [
      node(
        "frasa-unit",
        "Tafsir sebagai Satu Unit",
        "Apabila gabungan perkataan berfungsi sebagai satu frasa, jelaskan maksud keseluruhannya dan jangan huraikan setiap perkataan secara berasingan.",
      ),
      node("frasa-peluang", "‘Membuka Peluang’", "Maksudnya memberikan kesempatan atau peluang."),
      node(
        "frasa-berat",
        "‘Mengambil Berat’",
        "Maksudnya memberikan perhatian atau menunjukkan keprihatinan.",
      ),
      node(
        "frasa-semak",
        "Semak Kesatuan Makna",
        "Jika huraian satu demi satu mengubah idea ayat, tafsir frasa itu sebagai satu unit lengkap.",
      ),
    ]),
    branch("ungkapan", "Maksud Ungkapan", [
      node(
        "ungkapan-prinsip",
        "Makna Melebihi Kata Individu",
        "Ungkapan boleh membawa maksud yang tidak dapat diperoleh dengan mentafsir setiap perkataan secara berasingan. Utamakan maksud yang sesuai dengan konteks.",
      ),
      node("ungkapan-tulang", "‘Membanting Tulang’", "Maksudnya bekerja keras."),
      node("ungkapan-fikiran", "‘Buah Fikiran’", "Maksudnya idea atau pendapat."),
      node(
        "ungkapan-jalan",
        "‘Jalan Penyelesaian’",
        "Maksudnya cara untuk menyelesaikan sesuatu masalah.",
      ),
    ]),
    branch("literal-kiasan", "Literal vs Kiasan", [
      branch("literal", "Literal — Makna Langsung", [
        node("literal-ayat", "Ayat", "Adik membuka pintu."),
        node(
          "literal-maksud",
          "Maksud",
          "‘Membuka’ ialah tindakan membuka sesuatu secara fizikal.",
        ),
      ]),
      branch("kiasan", "Kiasan — Makna Tidak Langsung", [
        node("kiasan-ayat", "Ayat", "Program itu membuka mata masyarakat."),
        node(
          "kiasan-maksud",
          "Maksud",
          "‘Membuka mata’ bermaksud menyedarkan atau memberikan kesedaran.",
        ),
      ]),
      branch("literal-rumus", "KATA + KONTEKS = MAKNA SEBENAR", [
        node("literal-rumus-kata", "Kata", "Kenal pasti perkataan atau frasa yang ditanya."),
        node("literal-rumus-konteks", "+ Konteks", "Baca situasi dan idea sekeliling."),
        node(
          "literal-rumus-makna",
          "= Makna Sebenar",
          "Pilih tafsiran yang mengekalkan idea ayat.",
        ),
      ]),
    ]),
    branch("simile", "Simile", [
      node(
        "simile-definisi",
        "Perbandingan dengan Kata Bandingan",
        "Simile membandingkan sesuatu dengan perkara lain menggunakan kata seperti, bagai, bak, umpama atau laksana.",
      ),
      branch("simile-pucat", "Contoh ‘Pucat seperti Mayat’", [
        node("simile-pucat-ayat", "Ayat", "Wajahnya pucat seperti mayat."),
        node("simile-pucat-maksud", "Maksud", "Wajahnya sangat pucat."),
        node(
          "simile-pucat-kesan",
          "Kesan",
          "Perbandingan itu menguatkan gambaran tentang kepucatan wajah.",
        ),
      ]),
      node(
        "simile-jawab",
        "Jawab Makna, Bukan Nama Sahaja",
        "Jika soalan meminta maksud, jelaskan perkara yang disampaikan oleh perbandingan; jangan sekadar menjawab bahawa ungkapan itu ialah simile.",
      ),
    ]),
    branch("metafora", "Metafora", [
      node(
        "metafora-definisi",
        "Perbandingan Tidak Langsung",
        "Metafora menggambarkan sesuatu melalui perbandingan tidak langsung tanpa kata bandingan yang jelas. Jangan tafsir perkataan demi perkataan.",
      ),
      branch("metafora-tonggak", "Contoh ‘Tonggak Negara’", [
        node("metafora-tonggak-ayat", "Ayat", "Remaja ialah tonggak negara."),
        node(
          "metafora-tonggak-maksud",
          "Maksud",
          "Remaja ialah golongan penting yang akan menyumbang kepada masa depan negara.",
        ),
      ]),
      branch("metafora-api", "Contoh ‘Api Semangat’", [
        node("metafora-api-ayat", "Ayat", "Api semangatnya masih membara."),
        node("metafora-api-maksud", "Maksud", "Semangat atau keghairahannya masih kuat."),
      ]),
    ]),
    branch("personifikasi", "Personifikasi", [
      node(
        "personifikasi-definisi",
        "Sifat Manusia pada Bukan Manusia",
        "Personifikasi memberikan sifat atau tindakan manusia kepada benda, alam atau perkara bukan manusia. Benda itu tidak benar-benar menjadi manusia.",
      ),
      branch("personifikasi-angin", "Contoh ‘Angin Menyapa’", [
        node("personifikasi-angin-ayat", "Ayat", "Angin malam menyapa wajahnya."),
        node(
          "personifikasi-angin-realiti",
          "Realiti Literal",
          "Angin tidak benar-benar boleh menyapa seseorang.",
        ),
        node(
          "personifikasi-angin-kesan",
          "Maksud dan Kesan",
          "Ungkapan itu menggambarkan angin menyentuh wajah dengan lembut.",
        ),
      ]),
      branch("personifikasi-matahari", "Contoh ‘Matahari Tersenyum’", [
        node("personifikasi-matahari-ayat", "Ayat", "Matahari tersenyum di ufuk timur."),
        node(
          "personifikasi-matahari-kesan",
          "Kesan",
          "Ungkapan itu mewujudkan gambaran pagi yang hidup dan menyenangkan.",
        ),
      ]),
    ]),
    branch("peribahasa", "Peribahasa dalam Petikan", [
      node(
        "peribahasa-prinsip",
        "Tafsir Mengikut Situasi",
        "Hubungkan peribahasa dengan situasi sekeliling, tetapi jangan ubah maksud peribahasa yang telah mantap semata-mata untuk menyesuaikan jawapan.",
      ),
      branch("peribahasa-aur", "Contoh ‘Bagai Aur dengan Tebing’", [
        node("peribahasa-aur-ayat", "Ayat", "Mereka bekerjasama bagai aur dengan tebing."),
        node("peribahasa-aur-maksud", "Maksud", "Saling membantu atau bekerjasama erat."),
      ]),
      branch("peribahasa-aliran", "PERIBAHASA → KONTEKS → MAKSUD", [
        node("peribahasa-aliran-kenal", "Peribahasa", "Kenal pasti ungkapan yang digunakan."),
        node("peribahasa-aliran-konteks", "→ Konteks", "Semak keadaan yang digambarkan."),
        node(
          "peribahasa-aliran-maksud",
          "→ Maksud",
          "Nyatakan ertinya, bukan jenis peribahasa sahaja.",
        ),
      ]),
    ]),
    branch("petunjuk", "Petunjuk Konteks", [
      node(
        "petunjuk-definisi",
        "Definisi",
        "Maksud diterangkan secara langsung berdekatan dengan perkataan.",
      ),
      node(
        "petunjuk-sinonim",
        "Sinonim",
        "Perkataan berdekatan mempunyai maksud yang sama atau hampir sama.",
      ),
      node(
        "petunjuk-antonim",
        "Antonim atau Pertentangan",
        "Idea yang berlawanan membantu menyingkap maksud.",
      ),
      node("petunjuk-contoh", "Contoh", "Contoh khusus menjelaskan penggunaan perkataan."),
      node(
        "petunjuk-sebab",
        "Sebab dan Kesan",
        "Hasil sesuatu tindakan atau keadaan membantu menerangkan maksudnya.",
      ),
      branch("petunjuk-cermat", "Contoh ‘Cermat’", [
        node(
          "petunjuk-cermat-ayat",
          "Ayat",
          "Amir amat cermat ketika melakukan eksperimen. Dia memeriksa setiap sukatan sebelum mencampurkan bahan.",
        ),
        node(
          "petunjuk-cermat-maksud",
          "Maksud",
          "‘Cermat’ bermaksud berhati-hati atau teliti; tindakan memeriksa setiap sukatan menjadi petunjuknya.",
        ),
      ]),
    ]),
    branch("nada", "Nada dan Emosi", [
      node(
        "nada-pilihan",
        "Pilihan Kata Membina Nada",
        "Nada yang mungkin termasuk gembira, sedih, kecewa, marah, bimbang, berharap, tegas dan prihatin.",
      ),
      branch("nada-sungai", "Contoh Sungai", [
        node(
          "nada-sungai-ayat",
          "Ayat",
          "Kita tidak boleh terus membiarkan sungai kita dipenuhi sampah!",
        ),
        node("nada-sungai-nada", "Nada Mungkin", "Tegas dan prihatin."),
        node(
          "nada-sungai-bukti",
          "Bukti",
          "Kata-kata yang kuat dan tanda seru menguatkan ketegasan dalam konteks seruan menjaga sungai.",
        ),
      ]),
      node(
        "nada-amaran",
        "Nilai Konteks Luas",
        "Jangan meneka nada daripada satu perkataan atau tanda seru sahaja apabila konteks yang lebih luas menunjukkan emosi lain.",
      ),
    ]),
    branch("tujuan", "Tujuan Penggunaan", [
      node("tujuan-soalan", "Soalan Panduan", "Tanya: ‘Mengapakah penulis memilih ungkapan ini?’"),
      branch("tujuan-senarai", "Tujuan yang Mungkin", [
        node("tujuan-huraian", "Menguatkan Huraian", "Menjadikan sifat atau keadaan lebih jelas."),
        node("tujuan-emosi", "Mewujudkan Emosi", "Membangkitkan perasaan tertentu dalam pembaca."),
        node("tujuan-tegas", "Menegaskan Idea", "Memberikan penekanan kepada mesej penting."),
        node("tujuan-imej", "Mencipta Gambaran", "Membantu pembaca membayangkan situasi."),
        node(
          "tujuan-ingat",
          "Menjadikan Tulisan Diingati",
          "Menyampaikan idea dengan cara yang berkesan.",
        ),
        node("tujuan-sikap", "Menyampaikan Sikap", "Menunjukkan pendirian atau nada penulis."),
        node("tujuan-pujuk", "Memujuk Pembaca", "Menguatkan usaha mempengaruhi pembaca."),
      ]),
      branch("tujuan-duri", "Contoh ‘Duri dalam Daging’", [
        node("tujuan-duri-ayat", "Ayat", "Masalah itu menjadi duri dalam daging kepada penduduk."),
        node("tujuan-duri-maksud", "Maksud", "Masalah berterusan yang menyebabkan kesukaran."),
        node(
          "tujuan-duri-kesan",
          "Kesan",
          "Menegaskan bahawa masalah itu berpanjangan dan sangat menyusahkan.",
        ),
      ]),
      node(
        "tujuan-beza",
        "Maksud ≠ Kesan",
        "Maksud ialah perkara yang disampaikan oleh ungkapan. Kesan atau tujuan menerangkan sebab dan cara ungkapan mempengaruhi penulisan. Tidak semua bahasa kiasan semestinya memperbaik penulisan.",
      ),
    ]),
    branch("mengganti", "Teknik Mengganti", [
      branch("mengganti-langkah", "Lima Langkah", [
        node("mengganti-1", "1. Kenal Pasti", "Tandai frasa yang ditanya."),
        node("mengganti-2", "2. Cadangkan", "Fikirkan satu maksud yang mungkin."),
        node("mengganti-3", "3. Gantikan", "Masukkan maksud itu ke dalam ayat asal."),
        node("mengganti-4", "4. Baca Semula", "Baca ayat baharu secara lengkap."),
        node("mengganti-5", "5. Semak", "Pastikan makna asal kekal logik dan gramatis."),
      ]),
      branch("mengganti-contoh", "Contoh Penggantian", [
        node(
          "mengganti-asal",
          "Ayat Asal",
          "Program itu membuka ruang kepada murid untuk berkarya.",
        ),
        node(
          "mengganti-cadangan",
          "Maksud Mungkin",
          "‘Membuka ruang’ bermaksud memberikan peluang.",
        ),
        node(
          "mengganti-baharu",
          "Ayat Baharu",
          "Program itu memberikan peluang kepada murid untuk berkarya.",
        ),
        node("mengganti-hasil", "Hasil", "Maksud kekal logik; tafsiran itu sesuai."),
      ]),
      branch("mengganti-rumus", "GANTI → BACA → SEMAK", [
        node("mengganti-rumus-ganti", "Ganti", "Masukkan maksud cadangan."),
        node("mengganti-rumus-baca", "→ Baca", "Baca ayat secara keseluruhan."),
        node(
          "mengganti-rumus-semak",
          "→ Semak",
          "Pastikan idea, nada dan fakta asal tidak berubah.",
        ),
      ]),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-satu",
        "Terjemah Satu-satu",
        "Menjelaskan setiap perkataan dan bukannya maksud frasa lengkap.",
      ),
      node(
        "kesalahan-konteks",
        "Abaikan Konteks",
        "Memilih makna kamus yang tidak sesuai dengan ayat.",
      ),
      node(
        "kesalahan-literal",
        "Literal untuk Bahasa Kiasan",
        "Mentafsir ungkapan kiasan secara harfiah.",
      ),
      node(
        "kesalahan-sinonim",
        "Sinonim Tidak Tepat",
        "Menggunakan perkataan yang kelihatan serupa tetapi membawa maksud berbeza.",
      ),
      node("kesalahan-ulang", "Ulang Frasa", "Mengulang frasa asal tanpa menerangkan maksudnya."),
      branch("kesalahan-umum", "Maksud Terlalu Umum", [
        node("kesalahan-umum-salah", "Kurang Tepat", "‘Membuka mata’ bermaksud sesuatu yang baik."),
        node(
          "kesalahan-umum-baik",
          "Lebih Tepat",
          "‘Membuka mata’ bermaksud memberikan kesedaran.",
        ),
      ]),
      node("kesalahan-cipta", "Cipta Maksud", "Meneka tanpa petunjuk teks."),
      node(
        "kesalahan-kesan",
        "Keliru Maksud dan Kesan",
        "Maksud menerangkan mesej ungkapan; kesan menerangkan pengaruhnya terhadap penulisan.",
      ),
      node("kesalahan-nada", "Abaikan Nada", "Tidak mengambil kira emosi dan sikap dalam konteks."),
      node("kesalahan-fakta", "Tukar Fakta", "Mengubah idea asal ketika memparafrasa."),
      node(
        "kesalahan-panjang",
        "Jawapan Terlalu Panjang",
        "Jawapan terpanjang bukan semestinya paling tepat; pilih huraian yang jelas dan mencukupi.",
      ),
    ]),
    branch("uasa", "Tip UASA", [
      branch("uasa-langkah", "Tujuh Langkah", [
        node("uasa-1", "1. Baca Ayat Sasaran", "Baca ayat yang mengandungi perkataan atau frasa."),
        node("uasa-2", "2. Baca Ayat Sekeliling", "Baca ayat sebelum dan selepas."),
        node("uasa-3", "3. Tentukan Jenis", "Nilai sama ada maksudnya literal atau kiasan."),
        node("uasa-4", "4. Cari Petunjuk", "Kenal pasti petunjuk konteks."),
        node("uasa-5", "5. Cadangkan Maksud", "Pilih erti yang paling sesuai."),
        node("uasa-6", "6. Gunakan Teknik Mengganti", "Masukkan maksud ke dalam ayat."),
        node("uasa-7", "7. Semak", "Pastikan maksud asal kekal."),
      ]),
      branch("uasa-konteks", "K-O-N-T-E-K-S", [
        node("uasa-k", "K — Kenal Pasti Frasa", "Cari unsur tepat yang ditanya."),
        node(
          "uasa-o",
          "O — Perhatikan Ayat Sekitar",
          "Baca ayat sebelum dan selepas tanpa memaksa perkataan Inggeris.",
        ),
        node("uasa-n", "N — Nilai Literal atau Kiasan", "Tentukan jenis makna."),
        node(
          "uasa-t",
          "T — Tentukan Petunjuk",
          "Cari definisi, sinonim, pertentangan, contoh atau kesan.",
        ),
        node("uasa-e", "E — Erti yang Sesuai", "Pilih maksud yang tepat dan mudah."),
        node("uasa-k2", "K — Kaitkan dengan Petikan", "Semak maksud terhadap mesej keseluruhan."),
        node(
          "uasa-s",
          "S — Semak dengan Teknik Mengganti",
          "Pastikan tafsiran mengekalkan makna asal.",
        ),
      ]),
      branch("uasa-aliran", "FRASA ↓ KONTEKS ↓ MAKSUD ↓ GANTI ↓ SEMAK", [
        node("uasa-aliran-frasa", "Frasa", "Kenal pasti unsur yang ditanya."),
        node("uasa-aliran-konteks", "↓ Konteks", "Kumpulkan petunjuk ayat sekeliling."),
        node("uasa-aliran-maksud", "↓ Maksud", "Cadangkan tafsiran yang tepat."),
        node("uasa-aliran-ganti", "↓ Ganti", "Uji dalam ayat asal."),
        node("uasa-aliran-semak", "↓ Semak", "Pastikan idea asal kekal."),
      ]),
      branch("uasa-contoh", "Contoh Latihan", [
        node(
          "uasa-contoh-petikan",
          "Petikan",
          "Selepas beberapa bulan berusaha, projek kebun sekolah itu akhirnya membuahkan hasil. Murid bukan sahaja berjaya menghasilkan sayur-sayuran, malah aktiviti tersebut membuka mata mereka tentang kepentingan menjaga alam sekitar. Semangat bekerjasama juga semakin subur dalam kalangan murid.",
        ),
        branch("uasa-contoh-s1", "Soalan 1 — Maksud ‘Membuahkan Hasil’", [
          node("uasa-contoh-s1-soalan", "Soalan", "Apakah maksud ‘membuahkan hasil’?"),
          node(
            "uasa-contoh-s1-jawapan",
            "Jawapan",
            "Memberikan hasil atau mencapai kejayaan selepas usaha dilakukan.",
          ),
          node(
            "uasa-contoh-s1-hurai",
            "Penjelasan",
            "Ungkapan ini berkias dan tidak bermaksud menghasilkan buah secara literal dalam konteks ini.",
          ),
        ]),
        branch("uasa-contoh-s2", "Soalan 2 — Maksud ‘Membuka Mata’", [
          node("uasa-contoh-s2-soalan", "Soalan", "Apakah maksud ‘membuka mata mereka’?"),
          node("uasa-contoh-s2-jawapan", "Jawapan", "Memberikan kesedaran kepada mereka."),
          node(
            "uasa-contoh-s2-hurai",
            "Penjelasan",
            "Makna kiasan ditentukan melalui konteks kepentingan menjaga alam sekitar.",
          ),
        ]),
        branch("uasa-contoh-s3", "Soalan 3 — Maksud ‘Semakin Subur’", [
          node(
            "uasa-contoh-s3-soalan",
            "Soalan",
            "Apakah maksud ‘semangat bekerjasama semakin subur’?",
          ),
          node(
            "uasa-contoh-s3-jawapan",
            "Jawapan",
            "Semangat bekerjasama semakin berkembang atau semakin kuat.",
          ),
          node(
            "uasa-contoh-s3-hurai",
            "Penjelasan",
            "Perkataan ‘subur’ digunakan secara kiasan, bukan untuk pertumbuhan tumbuhan.",
          ),
        ]),
        branch("uasa-contoh-s4", "Soalan 4 — Kesan Penggunaan Ungkapan", [
          node("uasa-contoh-s4-soalan", "Soalan", "Apakah kesan penggunaan ungkapan tersebut?"),
          node(
            "uasa-contoh-s4-jawapan",
            "Jawapan Mungkin",
            "Ungkapan tersebut menjadikan penerangan lebih menarik dan memberikan gambaran yang lebih jelas tentang perubahan positif dalam kalangan murid.",
          ),
          node(
            "uasa-contoh-s4-hurai",
            "Penjelasan",
            "Soalan 1 hingga 3 meminta MAKSUD, manakala Soalan 4 meminta KESAN atau TUJUAN.",
          ),
        ]),
      ]),
    ]),
  ],
};
