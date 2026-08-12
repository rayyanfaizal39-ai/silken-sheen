import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-maksud-frasa-ungkapan";

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

export const bahasaMelayuTingkatan1MaksudFrasaUngkapanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "MAKSUD DALAM KONTEKS",
  summary:
    "Maksud perkataan, frasa dan ungkapan perlu ditentukan berdasarkan penggunaannya dalam ayat atau petikan, bukan berdasarkan hafalan semata-mata.",
  children: [
    branch("apa-itu", "Apa Itu?", [
      node(
        "apa-itu-definisi",
        "Definisi",
        "Soalan maksud meminta murid menjelaskan makna sesuatu perkataan, frasa atau ungkapan berdasarkan konteks petikan.",
      ),
      node(
        "apa-itu-bentuk",
        "Tiga Bentuk",
        "Murid mungkin ditanya tentang satu perkataan, satu frasa atau satu ungkapan.",
      ),
      node(
        "apa-itu-konteks",
        "Berdasarkan Konteks",
        "Makna mesti sesuai dengan ayat tempat perkataan atau frasa itu digunakan.",
      ),
      node(
        "apa-itu-hafalan",
        "Bukan Hafalan Sahaja",
        "Satu perkataan mungkin mempunyai lebih daripada satu makna.",
      ),
      branch("apa-itu-contoh", "Contoh", [
        node(
          "apa-itu-contoh-ayat",
          "Ayat",
          "“Ali menjadi buah mulut penduduk kampung kerana kejayaannya.”",
        ),
        node(
          "apa-itu-contoh-maksud",
          "Maksud",
          "“Buah mulut” bermaksud perkara yang sering diperkatakan.",
        ),
        node("apa-itu-contoh-bukan", "Bukan", "Buah yang berada di dalam mulut."),
      ]),
    ]),
    branch("perkataan", "Perkataan", [
      node(
        "perkataan-maksud",
        "Maksud",
        "Satu perkataan boleh membawa makna tertentu mengikut ayat.",
      ),
      branch("perkataan-contoh-1", "Contoh 1", [
        node("perkataan-contoh-1-ayat", "Ayat", "“Pasukan itu berjaya menumpaskan lawannya.”"),
        node("perkataan-contoh-1-maksud", "Maksud ‘Menumpaskan’", "Mengalahkan."),
      ]),
      branch("perkataan-contoh-2", "Contoh 2", [
        node("perkataan-contoh-2-ayat", "Ayat", "“Pihak sekolah melaksanakan pelbagai usaha.”"),
        node("perkataan-contoh-2-maksud", "Maksud ‘Usaha’", "Ikhtiar atau tindakan."),
      ]),
      branch("perkataan-contoh-3", "Contoh 3", [
        node("perkataan-contoh-3-ayat", "Ayat", "“Keadaan itu semakin meruncing.”"),
        node("perkataan-contoh-3-maksud", "Maksud ‘Meruncing’", "Menjadi semakin serius."),
      ]),
      node(
        "perkataan-golongan",
        "Semak Golongan Kata",
        "Pastikan kata ganti mengekalkan fungsi asal, seperti kata kerja diganti dengan kata kerja yang sesuai dan kata nama dengan kata nama yang sesuai.",
      ),
      node(
        "perkataan-jangan-ubah",
        "Jangan Tukar Maksud",
        "Kata ganti mesti mengekalkan maksud ayat.",
      ),
    ]),
    branch("frasa", "Frasa", [
      node(
        "frasa-maksud",
        "Maksud",
        "Frasa ialah gabungan dua atau lebih perkataan yang membawa satu makna dalam konteks tertentu.",
      ),
      node(
        "frasa-contoh-1",
        "Contoh 1",
        "‘Mengambil tindakan’ bermaksud melakukan sesuatu langkah.",
      ),
      node(
        "frasa-contoh-2",
        "Contoh 2",
        "‘Memberikan perhatian’ bermaksud memberi tumpuan atau mengambil berat.",
      ),
      node("frasa-contoh-3", "Contoh 3", "‘Membuka peluang’ bermaksud memberikan kesempatan."),
      node(
        "frasa-keseluruhan",
        "Jawab Keseluruhan Frasa",
        "Jangan jelaskan satu perkataan sahaja apabila soalan meminta maksud frasa lengkap.",
      ),
      branch("frasa-salah", "Contoh Salah", [
        node("frasa-salah-soalan", "Soalan", "Apakah maksud ‘mengambil tindakan’?"),
        node("frasa-salah-jawapan", "Salah", "‘Mengambil’."),
        node("frasa-salah-betul", "Betul", "‘Melakukan sesuatu langkah’."),
      ]),
    ]),
    branch("ungkapan", "Ungkapan", [
      node(
        "ungkapan-maksud",
        "Maksud",
        "Ungkapan ialah rangkaian kata yang membawa maksud tertentu dan kadangkala bersifat kiasan.",
      ),
      node(
        "ungkapan-contoh-1",
        "Contoh 1",
        "‘Anak emas’ bermaksud orang yang sangat disayangi atau diberi layanan istimewa.",
      ),
      node(
        "ungkapan-contoh-2",
        "Contoh 2",
        "‘Ringan tulang’ bermaksud rajin membantu atau rajin bekerja.",
      ),
      node("ungkapan-contoh-3", "Contoh 3", "‘Membuka mata’ bermaksud memberikan kesedaran."),
      node(
        "ungkapan-ayat",
        "Berdasarkan Ayat",
        "Sesetengah ungkapan membawa nuansa makna yang berbeza mengikut petikan.",
      ),
      node(
        "ungkapan-satu-satu",
        "Jangan Terjemah Perkataan Satu-satu",
        "Maksud ungkapan tidak semestinya terbentuk daripada gabungan makna literal setiap perkataan.",
      ),
    ]),
    branch("konteks-ayat", "Konteks Ayat", [
      node(
        "konteks-maksud",
        "Maksud Konteks",
        "Konteks ialah maklumat sekeliling yang membantu menentukan makna.",
      ),
      node("konteks-penuh", "Baca Ayat Penuh", "Jangan lihat perkataan secara terasing."),
      node(
        "konteks-sekeliling",
        "Baca Ayat Sebelum dan Selepas",
        "Makna mungkin dijelaskan oleh ayat berdekatan.",
      ),
      node(
        "konteks-tema",
        "Kenal Pasti Tema",
        "Contohnya: kesihatan, pendidikan, alam sekitar, persahabatan atau teknologi.",
      ),
      node(
        "konteks-tindakan",
        "Lihat Tindakan",
        "Perkara yang berlaku dalam ayat boleh menunjukkan maksud yang dikehendaki.",
      ),
      branch("konteks-contoh", "Contoh", [
        node(
          "konteks-contoh-ayat",
          "Ayat",
          "“Selepas ditegur oleh gurunya, Amir mula membuka mata tentang kepentingan disiplin.”",
        ),
        node("konteks-contoh-maksud", "Maksud ‘Membuka Mata’", "Sedar akan kepentingan disiplin."),
      ]),
    ]),
    branch("kata-seerti", "Kata Seerti", [
      node(
        "seerti-maksud",
        "Maksud",
        "Kata seerti ialah perkataan yang mempunyai makna hampir sama.",
      ),
      node("seerti-contoh-1", "Contoh 1", "‘Manfaat’ boleh diganti dengan ‘faedah’."),
      node("seerti-contoh-2", "Contoh 2", "‘Prihatin’ boleh diganti dengan ‘ambil berat’."),
      node(
        "seerti-contoh-3",
        "Contoh 3",
        "‘Menangani’ boleh diganti dengan ‘mengatasi’, bergantung pada konteks.",
      ),
      node(
        "seerti-tidak-sama",
        "Tidak Semestinya Sama Sepenuhnya",
        "Kata yang hampir sama makna boleh berbeza dari segi nada, keformalan, penggunaan dan struktur ayat.",
      ),
      node(
        "seerti-uji",
        "Uji dalam Ayat",
        "Gantikan perkataan dan baca semula ayat penuh. Jika maksud berubah, kata ganti itu tidak sesuai.",
      ),
    ]),
    branch("makna-literal", "Makna Literal", [
      node(
        "literal-maksud",
        "Maksud",
        "Makna literal ialah makna langsung atau makna biasa sesuatu perkataan.",
      ),
      node(
        "literal-contoh",
        "Contoh",
        "‘Tangan kanan’ secara literal bermaksud tangan di sebelah kanan.",
      ),
      node("literal-ayat", "Contoh Ayat", "“Ali menulis menggunakan tangan kanan.”"),
      node(
        "literal-biasa",
        "Kata Biasa",
        "Banyak perkataan dalam petikan fakta digunakan dengan makna literal.",
      ),
      node("literal-semak", "Semak Konteks", "Jangan anggap setiap frasa membawa makna kiasan."),
      node(
        "literal-kesalahan",
        "Kesalahan Lazim",
        "Murid menganggap makna langsung sebagai simpulan bahasa hanya kerana frasa mengandungi dua perkataan.",
      ),
    ]),
    branch("makna-kiasan", "Makna Kiasan", [
      node(
        "kiasan-maksud",
        "Maksud",
        "Makna kiasan ialah makna tidak langsung yang berbeza daripada makna biasa perkataan.",
      ),
      node(
        "kiasan-contoh",
        "Contoh",
        "‘Tangan kanan’ secara kiasan bermaksud orang kepercayaan utama.",
      ),
      node("kiasan-ayat", "Contoh Ayat", "“Farid menjadi tangan kanan pengurus syarikat itu.”"),
      node("kiasan-petunjuk", "Petunjuk", "Tanya sama ada makna literal masuk akal dalam ayat."),
      node(
        "kiasan-lain",
        "Contoh Lain",
        "‘Buah tangan’ bermaksud hadiah yang dibawa pulang daripada perjalanan atau kunjungan.",
      ),
      node("kiasan-jangan-cipta", "Jangan Cipta Makna", "Gunakan makna baku dan konteks petikan."),
    ]),
    branch("petunjuk-sekeliling", "Petunjuk Sekeliling", [
      node(
        "petunjuk-definisi",
        "Definisi",
        "Petunjuk sekeliling ialah maklumat dalam ayat atau perenggan yang membantu menjelaskan makna.",
      ),
      node(
        "petunjuk-sinonim",
        "Sinonim",
        "Petikan mungkin menyertakan perkataan lain yang hampir sama makna.",
      ),
      branch("petunjuk-lawan", "Lawan Kata", [
        node("petunjuk-lawan-nota", "Nota", "Pertentangan boleh menunjukkan makna."),
        node(
          "petunjuk-lawan-contoh",
          "Contoh",
          "“Walaupun dahulu dia malas, kini dia sangat rajin.”",
        ),
      ]),
      node(
        "petunjuk-contoh",
        "Contoh",
        "Ayat mungkin memberikan contoh selepas perkataan atau frasa.",
      ),
      node(
        "petunjuk-sebab",
        "Sebab dan Akibat",
        "Kesan sesuatu tindakan boleh menunjukkan maksud frasa.",
      ),
      node(
        "petunjuk-nada",
        "Nada",
        "Nada boleh menunjukkan sama ada maksudnya positif, negatif, serius atau lucu.",
      ),
      node(
        "petunjuk-baca",
        "Tanda Baca",
        "Koma, tanda petik atau kurungan kadangkala memberikan petunjuk.",
      ),
    ]),
    branch("cara-menjawab", "Cara Menjawab", [
      node("cara-langkah-1", "Langkah 1", "Baca soalan dengan teliti."),
      node("cara-langkah-2", "Langkah 2", "Cari perkataan, frasa atau ungkapan dalam petikan."),
      node("cara-langkah-3", "Langkah 3", "Baca keseluruhan ayat."),
      node("cara-langkah-4", "Langkah 4", "Baca ayat berdekatan."),
      node("cara-langkah-5", "Langkah 5", "Tentukan sama ada maknanya literal atau kiasan."),
      node("cara-langkah-6", "Langkah 6", "Pilih maksud yang mudah dan tepat."),
      node("cara-langkah-7", "Langkah 7", "Uji maksud dalam ayat asal."),
      node(
        "cara-ringkas",
        "Jawapan Ringkas",
        "Jawab terus. Contoh: “Maksud ‘ringan tulang’ ialah rajin membantu.”",
      ),
      node(
        "cara-jangan-panjang",
        "Jangan Huraikan Terlalu Panjang",
        "Berikan penerangan yang diperlukan sahaja.",
      ),
    ]),
    branch("ayat-ganti", "Bina Ayat Ganti", [
      node(
        "ganti-tujuan",
        "Tujuan",
        "Menggantikan ungkapan dengan maksudnya membantu menguji ketepatan.",
      ),
      branch("ganti-contoh-1", "Contoh 1", [
        node("ganti-contoh-1-asal", "Ayat Asal", "“Rina ringan tulang.”"),
        node("ganti-contoh-1-ganti", "Ayat Ganti", "“Rina rajin membantu.”"),
        node("ganti-contoh-1-semak", "Semakan", "Maksud ayat kekal."),
      ]),
      branch("ganti-contoh-2", "Contoh 2", [
        node("ganti-contoh-2-asal", "Ayat Asal", "“Berita itu membuka mata masyarakat.”"),
        node(
          "ganti-contoh-2-ganti",
          "Ayat Ganti",
          "“Berita itu memberikan kesedaran kepada masyarakat.”",
        ),
      ]),
      branch("ganti-contoh-3", "Contoh 3", [
        node("ganti-contoh-3-asal", "Ayat Asal", "“Amir menjadi buah mulut orang ramai.”"),
        node(
          "ganti-contoh-3-ganti",
          "Ayat Ganti",
          "“Amir menjadi perkara yang sering diperkatakan oleh orang ramai.”",
        ),
      ]),
      node("ganti-gramatis", "Semak Tatabahasa", "Ayat ganti mesti kekal gramatis."),
      node(
        "ganti-maklumat",
        "Jangan Tukar Maklumat",
        "Kekalkan orang, tindakan, masa, tempat dan nada yang dimaksudkan.",
      ),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      branch("kesalahan-terjemah", "Terjemah Perkataan Satu-satu", [
        node(
          "kesalahan-terjemah-salah",
          "Salah",
          "‘Buah tangan’ diterjemah sebagai ‘buah pada tangan’.",
        ),
        node(
          "kesalahan-terjemah-betul",
          "Betul",
          "Hadiah yang dibawa pulang daripada kunjungan atau perjalanan.",
        ),
      ]),
      node(
        "kesalahan-konteks",
        "Abaikan Konteks",
        "Murid memilih makna kamus yang tidak sesuai dengan ayat.",
      ),
      node(
        "kesalahan-sebahagian",
        "Jawab Sebahagian Frasa",
        "Murid menerangkan satu perkataan sahaja.",
      ),
      branch("kesalahan-umum", "Makna Terlalu Umum", [
        node("kesalahan-umum-lemah", "Lemah", "‘Sesuatu perkara’."),
        node("kesalahan-umum-baik", "Lebih Baik", "Berikan maksud yang tepat berdasarkan ayat."),
      ]),
      node("kesalahan-tukar", "Tukar Maksud", "Murid menggunakan kata seerti yang tidak sesuai."),
      node(
        "kesalahan-salin",
        "Salin Frasa Asal",
        "Murid mengulang frasa tanpa menerangkan maksudnya.",
      ),
      node(
        "kesalahan-panjang",
        "Ayat Terlalu Panjang",
        "Murid menambah penerangan yang tidak berkaitan.",
      ),
      node(
        "kesalahan-literal",
        "Keliru Literal dan Kiasan",
        "Murid menganggap setiap frasa membawa makna kiasan.",
      ),
    ]),
    branch("teknik-mengingat", "Teknik Mengingat", [
      branch("teknik-kait", "Rumus KAIT", [
        node("teknik-k", "K — Kenal pasti perkataan", "Tentukan bahagian yang ditanya."),
        node("teknik-a", "A — Analisis ayat", "Baca ayat secara keseluruhan."),
        node("teknik-i", "I — Interpretasi konteks", "Tentukan maksud daripada petunjuk."),
        node("teknik-t", "T — Tukar dengan maksud", "Uji maksud sebagai pengganti."),
      ]),
      node("teknik-uji", "Uji Ganti", "Gantikan frasa dengan maksud yang dicadangkan."),
      branch("teknik-soalan", "Dua Soalan", [
        node("teknik-soalan-1", "Soalan 1", "Adakah makna literal masuk akal?"),
        node("teknik-soalan-2", "Soalan 2", "Apakah yang dimaksudkan oleh keseluruhan ayat?"),
      ]),
      node("teknik-sekeliling", "Baca Sekeliling", "Baca satu ayat sebelum dan selepas."),
      node(
        "teknik-tema",
        "Simpan Mengikut Tema",
        "Kelompokkan kosa kata mengikut pendidikan, kesihatan, alam sekitar, masyarakat dan nilai.",
      ),
      node("teknik-faham", "Faham, Bukan Hafal", "Konteks menentukan maksud akhir."),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node("uasa-cari", "Cari dalam Petikan", "Sentiasa cari frasa asal dalam petikan."),
      node("uasa-ayat", "Baca Ayat Penuh", "Jangan jawab berdasarkan frasa yang terasing."),
      node(
        "uasa-mudah",
        "Pilih Maksud Mudah",
        "Penerangan yang jelas dan tepat lebih baik daripada penerangan yang rumit.",
      ),
      node(
        "uasa-beza",
        "Bezakan Literal dan Kiasan",
        "Semak sama ada makna biasa sesuai dengan ayat.",
      ),
      node(
        "uasa-sendiri",
        "Guna Bahasa Sendiri",
        "Terangkan maksud tanpa mengulang frasa semata-mata.",
      ),
      node("uasa-uji", "Uji Ayat Ganti", "Gantikan frasa dalam fikiran dan baca semula ayat."),
      node(
        "uasa-semak",
        "Semak Ketepatan",
        "Pastikan maksud sesuai, gramatis, menerangkan keseluruhan frasa dan mengekalkan mesej asal.",
      ),
      node(
        "uasa-arahan",
        "Ikut Arahan",
        "Jangan tetapkan markah, panjang jawapan atau jaminan skor. Ikuti arahan soalan dan format pentaksiran semasa.",
      ),
    ]),
  ],
};
