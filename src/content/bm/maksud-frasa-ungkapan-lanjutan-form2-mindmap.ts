import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-maksud-frasa-ungkapan-lanjutan";

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

export const bahasaMelayuTingkatan2MaksudFrasaUngkapanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "MAKSUD DALAM KONTEKS LANJUTAN",
  summary:
    "Maksud sesuatu perkataan, frasa atau ungkapan perlu ditentukan melalui konteks ayat, hubungan idea, nada dan petunjuk di sekelilingnya.",
  children: [
    branch("apa-itu", "Apa Itu?", [
      node(
        "apa-definisi",
        "Definisi",
        "Soalan maksud meminta murid menjelaskan makna perkataan, frasa atau ungkapan berdasarkan konteks penggunaannya.",
      ),
      node(
        "apa-tahap",
        "Keperluan Tingkatan 2",
        "Murid mungkin menghadapi kosa kata yang kurang lazim, ungkapan kiasan, frasa abstrak, konteks yang tersebar dalam beberapa ayat dan perkataan yang mempunyai lebih daripada satu kemungkinan makna.",
      ),
      node(
        "apa-proses",
        "Proses Menentukan Makna",
        "Kenal pasti unsur yang ditanya, baca ayat penuh, hubungkan petunjuk sekeliling dan pilih maksud yang paling sesuai dengan keseluruhan petikan.",
      ),
      node(
        "apa-kamus",
        "Kamus Bukan Penentu Tunggal",
        "Makna kamus boleh menjadi panduan, tetapi konteks menentukan makna yang digunakan dalam petikan.",
      ),
    ]),
    branch("makna-konteks", "Makna Mengikut Konteks", [
      node(
        "konteks-prinsip",
        "Satu Perkataan, Beberapa Makna",
        "Perkataan yang sama boleh membawa makna berlainan apabila digunakan dalam ayat yang berbeza.",
      ),
      branch("konteks-tajam", "Contoh ‘Tajam’", [
        node("tajam-ayat-1", "Ayat 1", "Pisau itu sangat tajam."),
        node("tajam-maksud-1", "Maksud 1", "Mempunyai mata atau hujung yang dapat memotong."),
        node("tajam-ayat-2", "Ayat 2", "Kritikannya sangat tajam."),
        node(
          "tajam-maksud-2",
          "Maksud 2",
          "Kritikan itu kuat, terus terang atau keras, bukannya mempunyai mata yang boleh memotong.",
        ),
      ]),
      node(
        "konteks-penentu",
        "Konteks Menentukan",
        "Subjek, tindakan, nada dan idea sekeliling membantu memilih makna yang sesuai daripada beberapa kemungkinan.",
      ),
      node(
        "konteks-tidak-kekal",
        "Makna Tidak Sentiasa Kekal",
        "Jangan menganggap satu perkataan atau frasa mempunyai satu makna yang sama dalam setiap penggunaan.",
      ),
    ]),
    branch("frasa-kompleks", "Frasa Kompleks", [
      node(
        "frasa-prinsip",
        "Tafsir Keseluruhan Frasa",
        "Gabungan perkataan perlu difahami sebagai satu unit makna, bukan diterjemahkan satu demi satu.",
      ),
      node("frasa-ruang", "Membuka Ruang", "Maksudnya memberikan peluang."),
      node("frasa-langkah", "Mengambil Langkah", "Maksudnya melakukan tindakan."),
      node(
        "frasa-tanggungjawab",
        "Memikul Tanggungjawab",
        "Maksudnya melaksanakan kewajipan atau tugas yang diamanahkan.",
      ),
      node(
        "frasa-sepakat",
        "Mencapai Kata Sepakat",
        "Maksudnya mencapai persetujuan selepas perbincangan.",
      ),
      node(
        "frasa-semak",
        "Semak dalam Ayat",
        "Pilih maksud yang menerangkan keseluruhan frasa dan masih sesuai apabila dimasukkan semula ke dalam ayat.",
      ),
    ]),
    branch("ungkapan-kiasan", "Ungkapan Kiasan", [
      node(
        "kiasan-prinsip",
        "Makna Bukan Harfiah",
        "Sesetengah ungkapan membawa makna kiasan apabila tafsiran literal tidak sesuai dengan konteks.",
      ),
      node("kiasan-fikiran", "Buah Fikiran", "Maksudnya idea atau pendapat."),
      node(
        "kiasan-buntu",
        "Jalan Buntu",
        "Maksudnya keadaan tanpa penyelesaian yang jelas atau keadaan yang sukar diselesaikan.",
      ),
      node(
        "kiasan-tulang",
        "Tulang Belakang",
        "Dalam konteks organisasi atau keluarga, maksudnya pihak atau individu utama yang menjadi penyokong.",
      ),
      node("kiasan-mata", "Membuka Mata", "Maksudnya memberi kesedaran atau kefahaman baharu."),
      node(
        "kiasan-uji-literal",
        "Uji Makna Literal",
        "Jika makna sebenar anggota badan, objek atau tindakan tidak masuk akal dalam ayat, teliti kemungkinan makna kiasan.",
      ),
      node(
        "kiasan-bukan-semua",
        "Bukan Semua Frasa Kiasan",
        "Tentukan melalui konteks; jangan menganggap setiap gabungan perkataan mempunyai makna tersirat.",
      ),
    ]),
    branch("sinonim", "Sinonim Kontekstual", [
      node(
        "sinonim-prinsip",
        "Kekalkan Maksud",
        "Kata seerti hampir sama maknanya, tetapi hanya pilihan yang mengekalkan maksud ayat boleh digunakan.",
      ),
      node("sinonim-manfaat", "Manfaat", "Dalam konteks faedah yang diperoleh, maksudnya faedah."),
      node("sinonim-usaha", "Usaha", "Dalam konteks tindakan mencapai tujuan, maksudnya ikhtiar."),
      branch("sinonim-menangani", "Menangani", [
        node(
          "menangani-masalah",
          "Masalah",
          "Boleh bermaksud mengatasi atau menyelesaikan masalah.",
        ),
        node(
          "menangani-urusan",
          "Urusan",
          "Boleh bermaksud mengurus sesuatu urusan mengikut konteks.",
        ),
      ]),
      node(
        "sinonim-tidak-semua",
        "Tidak Boleh Ditukar Sesuka Hati",
        "Dua perkataan yang hampir seerti mungkin mempunyai nuansa, penggunaan atau pasangan kata yang berbeza.",
      ),
    ]),
    branch("antonim", "Antonim sebagai Petunjuk", [
      node(
        "antonim-prinsip",
        "Gunakan Pertentangan",
        "Makna perkataan kurang dikenali boleh dikesan melalui idea yang berlawanan dalam ayat.",
      ),
      branch("antonim-hana", "Contoh Hana", [
        node("antonim-ayat", "Ayat", "Berbeza dengan adiknya yang pemalu, Hana sangat peramah."),
        node(
          "antonim-maksud",
          "Maksud ‘Peramah’",
          "Mudah bergaul, mesra atau suka berinteraksi dengan orang lain.",
        ),
        node(
          "antonim-alasan",
          "Petunjuk",
          "Kata ‘berbeza’ menunjukkan sifat Hana bertentangan dengan sifat pemalu adiknya.",
        ),
      ]),
      node(
        "antonim-penanda",
        "Penanda Pertentangan",
        "Cari kata seperti tetapi, sebaliknya, berbeza, walaupun dan namun.",
      ),
      node(
        "antonim-semak",
        "Semak Keseluruhan Ayat",
        "Penanda pertentangan ialah petunjuk, tetapi maksud akhir masih perlu sesuai dengan subjek dan situasi.",
      ),
    ]),
    branch("nada-sikap", "Nada dan Sikap", [
      node(
        "nada-prinsip",
        "Nada Membantu Makna",
        "Cara sesuatu dilafazkan atau digambarkan dapat menjelaskan sama ada perkataan membawa maksud positif, negatif atau berkecuali.",
      ),
      branch("nada-sinis", "Contoh Sinis", [
        node("nada-ayat", "Ayat", "Dia menjawab dengan sinis."),
        node(
          "nada-maksud",
          "Maksud Kontekstual",
          "Jawapannya bernada negatif, mengejek atau menyindir, bergantung pada dialog dan keadaan.",
        ),
      ]),
      node(
        "nada-petunjuk",
        "Petunjuk Nada",
        "Teliti dialog marah, respons menyindir, pujian, kritikan, keprihatinan atau kekecewaan.",
      ),
      node(
        "nada-bukti",
        "Jangan Tafsir Berlebihan",
        "Sikap atau nada mesti disokong oleh pilihan kata, reaksi atau keadaan dalam petikan.",
      ),
    ]),
    branch("petunjuk-sekeliling", "Petunjuk Sebelum dan Selepas", [
      node(
        "sekeliling-prinsip",
        "Baca Ayat Berdekatan",
        "Ayat sebelum atau selepas mungkin menerangkan, memberi contoh atau menunjukkan tindakan yang menjelaskan makna.",
      ),
      branch("sekeliling-cakna", "Contoh ‘Cakna’", [
        node("cakna-ayat-1", "Ayat 1", "Penduduk sangat cakna terhadap kebersihan kawasan."),
        node(
          "cakna-ayat-2",
          "Ayat 2",
          "Mereka sentiasa memastikan sampah dibuang di tempat yang betul.",
        ),
        node("cakna-maksud", "Maksud", "Prihatin atau mengambil berat."),
        node(
          "cakna-alasan",
          "Hubungan",
          "Tindakan menjaga pembuangan sampah menerangkan bentuk keprihatinan penduduk.",
        ),
      ]),
      node(
        "sekeliling-fungsi",
        "Jenis Petunjuk",
        "Cari definisi, huraian, contoh, sebab, kesan, persamaan atau pertentangan dalam ayat berdekatan.",
      ),
      node(
        "sekeliling-jangan-cepat",
        "Jangan Jawab Terlalu Awal",
        "Baca sekurang-kurangnya ayat penuh dan ayat berdekatan sebelum memilih maksud.",
      ),
    ]),
    branch("rentas-perenggan", "Maksud Merentas Perenggan", [
      node(
        "rentas-prinsip",
        "Konteks Lebih Luas",
        "Frasa dalam perenggan awal kadangkala dijelaskan melalui pengulangan idea, contoh atau kesan dalam perenggan seterusnya.",
      ),
      branch("rentas-langkah", "Lima Langkah", [
        node("rentas-1", "1. Cari Frasa", "Kenal pasti kedudukan tepat unsur yang ditanya."),
        node("rentas-2", "2. Baca Ayat Penuh", "Fahami peranan frasa dalam ayat."),
        node("rentas-3", "3. Baca Ayat Berdekatan", "Cari petunjuk sebelum dan selepas."),
        node(
          "rentas-4",
          "4. Semak Perenggan Seterusnya",
          "Teruskan membaca jika maknanya masih belum jelas.",
        ),
        node(
          "rentas-5",
          "5. Kenal Pasti Idea Berulang",
          "Padankan frasa dengan idea yang dihuraikan atau dijelaskan semula.",
        ),
      ]),
      branch("rentas-contoh", "Contoh Dua Perenggan", [
        node(
          "rentas-p1",
          "Perenggan 1",
          "Program mentor rakan sebaya menjadi pemangkin perubahan dalam kalangan murid.",
        ),
        node(
          "rentas-p2",
          "Perenggan 2",
          "Selepas program dilaksanakan, murid lebih yakin bertanya dan pencapaian mereka beransur baik.",
        ),
        node(
          "rentas-maksud",
          "Maksud ‘Pemangkin Perubahan’",
          "Sesuatu yang mendorong atau mempercepat perubahan positif.",
        ),
      ]),
      node(
        "rentas-jangan-henti",
        "Jangan Berhenti pada Satu Ayat",
        "Jika ayat asal bersifat abstrak, cari penjelasan melalui perkembangan idea dalam perenggan lain.",
      ),
    ]),
    branch("uji-makna", "Uji Makna", [
      node(
        "uji-cara",
        "Ujian Penggantian",
        "Gantikan perkataan atau frasa asal dengan maksud yang dicadangkan. Jika ayat kekal gramatis dan idea asal terpelihara, tafsiran itu berkemungkinan tepat.",
      ),
      branch("uji-ruang", "Contoh Penggantian", [
        node("uji-asal", "Ayat Asal", "Program itu membuka ruang kepada murid untuk berkarya."),
        node("uji-ganti", "Ayat Ganti", "Program itu memberi peluang kepada murid untuk berkarya."),
        node("uji-hasil", "Hasil", "Makna dan hubungan ayat masih terpelihara."),
      ]),
      node(
        "uji-tiga",
        "Tiga Semakan",
        "Pastikan ayat ganti masuk akal, gramatis dan tidak mengubah nada atau fakta asal.",
      ),
      node(
        "uji-bukan-bukti-tunggal",
        "Bukan Ujian Tunggal",
        "Ayat yang kedengaran lancar masih perlu disemak dengan konteks keseluruhan petikan.",
      ),
    ]),
    branch("bina-jawapan", "Bina Jawapan", [
      node(
        "bina-rangka",
        "Rangka Jawapan",
        "Gunakan bentuk ‘Maksud frasa ______ ialah ______.’ atau bentuk setara yang gramatis.",
      ),
      node("bina-ruang", "Contoh Frasa", "Maksud frasa ‘membuka ruang’ ialah memberikan peluang."),
      node(
        "bina-buntu",
        "Contoh Ungkapan",
        "Maksud ungkapan ‘jalan buntu’ ialah keadaan yang sukar diselesaikan.",
      ),
      node(
        "bina-ciri",
        "Ciri Jawapan",
        "Jawapan hendaklah jelas, terus, gramatis dan berdasarkan konteks.",
      ),
      node(
        "bina-mudah",
        "Gunakan Kosa Kata Mudah",
        "Pilih penjelasan yang lebih mudah daripada unsur asal tanpa menghilangkan maknanya.",
      ),
      node(
        "bina-panjang",
        "Utamakan Ketepatan",
        "Penjelasan yang panjang tidak semestinya lebih baik; jawab setakat yang diperlukan untuk menerangkan makna.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "salah-kamus",
        "Guna Maksud Kamus Sahaja",
        "Makna dipilih tanpa menyemak penggunaan khusus dalam petikan.",
      ),
      node(
        "salah-satu-satu",
        "Terjemah Satu demi Satu",
        "Setiap perkataan diterjemahkan secara berasingan sehingga maksud keseluruhan frasa berubah.",
      ),
      node(
        "salah-sebahagian",
        "Jawab Sebahagian Frasa",
        "Hanya satu perkataan dijelaskan sedangkan soalan meminta keseluruhan frasa.",
      ),
      node(
        "salah-sinonim",
        "Sinonim Tidak Tepat",
        "Kata yang hampir seerti dipilih tetapi tidak sesuai dengan ayat.",
      ),
      node(
        "salah-semua-kiasan",
        "Anggap Semua Frasa Kiasan",
        "Makna literal yang sesuai diabaikan tanpa alasan.",
      ),
      node(
        "salah-abaikan",
        "Abaikan Ayat Sekeliling",
        "Petunjuk sebelum dan selepas tidak digunakan.",
      ),
      node(
        "salah-umum",
        "Maksud Terlalu Umum",
        "Jawapan tidak menerangkan penggunaan khusus dalam petikan.",
      ),
      node(
        "salah-ulang",
        "Ulang Frasa Asal",
        "Jawapan mengulang perkataan yang sama tanpa menjelaskan maknanya.",
      ),
      node(
        "salah-sukar",
        "Kosa Kata Lebih Sukar",
        "Penjelasan menjadi lebih sukar difahami daripada frasa asal.",
      ),
      node("salah-ubah", "Ubah Maksud Petikan", "Jawapan menambah atau menukar idea asal."),
    ]),
    branch("teknik", "Teknik Mengingat", [
      branch("teknik-konteks", "Rumus KONTEKS", [
        node("teknik-k1", "K — Kenal pasti frasa", "Cari unsur tepat yang ditanya."),
        node("teknik-o", "O — Observe ayat sekeliling", "Perhatikan ayat sebelum dan selepas."),
        node("teknik-n", "N — Nilai maksud literal", "Uji sama ada makna harfiah sesuai."),
        node("teknik-t", "T — Tentukan petunjuk", "Cari huraian, contoh, nada atau pertentangan."),
        node(
          "teknik-e",
          "E — Elakkan terjemahan satu-satu",
          "Tafsir keseluruhan perkataan atau frasa dalam konteks.",
        ),
        node(
          "teknik-k2",
          "K — Kaitkan dengan petikan",
          "Gunakan idea keseluruhan untuk menyemak makna.",
        ),
        node("teknik-s", "S — Semak dengan ayat ganti", "Gantikan frasa dan uji makna."),
      ]),
      branch("teknik-aliran", "Aliran Semakan", [
        node("aliran-frasa", "Frasa", "Kenal pasti unsur yang ditanya."),
        node("aliran-konteks", "↓ Konteks", "Kumpulkan petunjuk sekeliling."),
        node("aliran-maksud", "↓ Maksud Mungkin", "Cadangkan makna yang paling sesuai."),
        node("aliran-uji", "↓ Uji Penggantian", "Pastikan makna asal terpelihara."),
      ]),
      node(
        "teknik-pilih",
        "Pilih yang Paling Tepat",
        "Jika terdapat beberapa kemungkinan, bandingkan setiap pilihan dengan ayat dan petikan penuh.",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node("uasa-cari", "Cari Frasa", "Tandai frasa tepat dalam petikan."),
      node("uasa-ayat", "Baca Ayat Penuh", "Fahami peranan frasa dalam ayat."),
      node("uasa-sekeliling", "Baca Ayat Sekeliling", "Cari penerangan sebelum dan selepas."),
      node(
        "uasa-petunjuk",
        "Perhatikan Pertentangan atau Huraian",
        "Gunakan penanda pertentangan, contoh, definisi dan idea berulang.",
      ),
      node("uasa-jenis", "Tentukan Jenis Makna", "Bezakan makna literal daripada makna kiasan."),
      node("uasa-mudah", "Pilih Maksud Mudah", "Gunakan penjelasan yang paling mudah dan tepat."),
      node(
        "uasa-uji",
        "Uji dalam Ayat",
        "Gunakan ujian penggantian sebelum memuktamadkan jawapan.",
      ),
      node(
        "uasa-terus",
        "Jawab Secara Terus",
        "Berikan maksud tanpa huraian yang tidak berkaitan.",
      ),
      node(
        "uasa-semak",
        "Semak Semula",
        "Pastikan jawapan gramatis, sesuai dengan konteks dan tidak mengubah idea petikan.",
      ),
      node(
        "uasa-arahan",
        "Ikut Arahan Semasa",
        "Jangan menetapkan markah, panjang jawapan atau jaminan skor. Patuhi kehendak soalan dan format pentaksiran semasa.",
      ),
    ]),
  ],
};
