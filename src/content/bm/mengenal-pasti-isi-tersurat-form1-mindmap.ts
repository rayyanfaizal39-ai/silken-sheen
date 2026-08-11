import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-mengenal-pasti-isi-tersurat";

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

export const bahasaMelayuTingkatan1IsiTersuratMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "ISI TERSURAT",
  summary:
    "Isi tersurat ialah maklumat yang dinyatakan secara jelas dalam petikan dan boleh dikenal pasti melalui kata kunci serta bukti langsung.",
  children: [
    branch("apa-itu", "Apa Itu?", [
      node(
        "apa-itu-definisi",
        "Definisi",
        "Isi tersurat ialah maklumat yang dinyatakan secara langsung dan jelas dalam petikan.",
      ),
      node(
        "apa-itu-ciri-utama",
        "Ciri Utama",
        "Jawapan boleh ditemukan dalam satu ayat, dua ayat berdekatan, satu perenggan, atau label dan teks dalam bahan visual.",
      ),
      node(
        "apa-itu-tidak-meneka",
        "Tidak Perlu Meneka",
        "Murid tidak perlu membuat andaian sendiri jika jawapan sudah dinyatakan.",
      ),
      node(
        "apa-itu-berdasarkan-petikan",
        "Berdasarkan Petikan",
        "Jawapan mesti disokong oleh maklumat yang benar-benar terdapat dalam bahan.",
      ),
      branch("apa-itu-contoh", "Contoh Ringkas", [
        node(
          "apa-itu-contoh-petikan",
          "Petikan",
          "“Amir pergi ke perpustakaan selepas waktu sekolah.”",
        ),
        node("apa-itu-contoh-soalan", "Soalan", "“Ke manakah Amir pergi selepas waktu sekolah?”"),
        node(
          "apa-itu-contoh-jawapan",
          "Jawapan",
          "“Amir pergi ke perpustakaan selepas waktu sekolah.”",
        ),
      ]),
    ]),
    branch("ciri-ciri", "Ciri-ciri", [
      node("ciri-jelas", "Jelas", "Maklumat dinyatakan secara langsung."),
      node(
        "ciri-boleh-ditunjukkan",
        "Boleh Ditunjukkan",
        "Murid boleh menunjukkan ayat atau frasa tepat yang menyokong jawapan.",
      ),
      node(
        "ciri-tiada-inferens",
        "Tidak Memerlukan Inferens",
        "Jawapan tidak bergantung pada maksud tersembunyi atau kesimpulan sendiri.",
      ),
      node(
        "ciri-fakta-petikan",
        "Menggunakan Fakta Petikan",
        "Jawapan boleh melibatkan nama, tempat, masa, tindakan, sebab, kesan atau penerangan.",
      ),
      node(
        "ciri-boleh-diolah",
        "Boleh Diolah",
        "Susunan kata boleh diubah sedikit selagi maksud asal dikekalkan.",
      ),
    ]),
    branch("kata-kunci", "Kata Kunci", [
      node(
        "kata-kunci-soalan",
        "Dalam Soalan",
        "Kenal pasti kata penting seperti siapa, apa, di mana, bila, mengapa dan bagaimana.",
      ),
      node(
        "kata-kunci-subjek",
        "Nama atau Subjek",
        "Cari orang, kumpulan, tempat atau isu yang disebut.",
      ),
      node(
        "kata-kunci-tugas",
        "Kata Tugas",
        "Contohnya: nyatakan, berikan, siapa, apakah, bilakah, di manakah, mengapakah dan bagaimanakah.",
      ),
      branch("kata-kunci-padan", "Padanan Makna", [
        node("kata-kunci-padan-nota", "Nota", "Petikan mungkin menggunakan perkataan seerti."),
        node("kata-kunci-padan-soalan", "Soalan", "“Apakah manfaat membaca?”"),
        node("kata-kunci-padan-petikan", "Petikan", "“Amalan membaca memberikan banyak faedah.”"),
      ]),
      node(
        "kata-kunci-elak",
        "Elakkan Kata Tidak Penting",
        "Jangan anggap setiap perkataan dalam soalan sebagai kata kunci.",
      ),
    ]),
    branch("cari-petikan", "Cari dalam Petikan", [
      node("cari-langkah-1", "Langkah 1", "Baca soalan terlebih dahulu."),
      node("cari-langkah-2", "Langkah 2", "Gariskan kata kunci utama."),
      node(
        "cari-langkah-3",
        "Langkah 3",
        "Imbas petikan untuk mencari perkataan yang sama atau makna yang berkaitan.",
      ),
      node("cari-langkah-4", "Langkah 4", "Baca keseluruhan ayat yang mengandungi kata kunci."),
      node("cari-langkah-5", "Langkah 5", "Baca satu ayat sebelum dan selepasnya jika perlu."),
      node("cari-langkah-6", "Langkah 6", "Pilih hanya maklumat yang menjawab soalan."),
      node(
        "cari-nota",
        "Nota",
        "Jangan berhenti pada perkataan sepadan yang pertama tanpa menyemak maksud keseluruhan.",
      ),
    ]),
    branch("bukti-langsung", "Bukti Langsung", [
      node(
        "bukti-maksud",
        "Maksud",
        "Bukti langsung ialah ayat atau frasa dalam petikan yang menyokong jawapan.",
      ),
      node(
        "bukti-cara",
        "Cara Mencari",
        "Tanya: “Bahagian manakah dalam petikan membuktikan jawapan saya?”",
      ),
      branch("bukti-contoh", "Contoh", [
        node(
          "bukti-contoh-petikan",
          "Petikan",
          "“Siti membantu ibunya menyediakan sarapan setiap pagi.”",
        ),
        node(
          "bukti-contoh-soalan",
          "Soalan",
          "“Apakah bukti bahawa Siti rajin membantu keluarganya?”",
        ),
        node(
          "bukti-contoh-jawapan",
          "Jawapan",
          "“Buktinya, Siti membantu ibunya menyediakan sarapan setiap pagi.”",
        ),
      ]),
      node("bukti-terpilih", "Petik Secara Terpilih", "Jangan salin seluruh perenggan."),
      node(
        "bukti-olah",
        "Boleh Diolah",
        "Jika sesuai, olah bukti semula sebagai ayat yang lengkap.",
      ),
      node("bukti-jangan-cipta", "Jangan Cipta", "Bukti mesti berasal daripada petikan."),
    ]),
    branch("soalan-siapa", "Soalan “Siapa”", [
      node("siapa-fokus", "Fokus", "Kenal pasti orang atau kumpulan."),
      branch("siapa-contoh", "Contoh", [
        node("siapa-petikan", "Petikan", "“Guru kelas membawa murid-murid ke muzium.”"),
        node("siapa-soalan", "Soalan", "“Siapakah yang membawa murid-murid ke muzium?”"),
        node("siapa-jawapan", "Jawapan", "“Guru kelas membawa murid-murid ke muzium.”"),
      ]),
      branch("siapa-kesalahan", "Kesalahan Lazim", [
        node("siapa-kesalahan-nota", "Kesalahan", "Memberikan objek dan bukannya orang."),
        node("siapa-salah", "Salah", "“Murid-murid.”"),
        node("siapa-betul", "Betul", "“Guru kelas.”"),
      ]),
    ]),
    branch("soalan-apa", "Soalan “Apa”", [
      node(
        "apa-fokus",
        "Fokus",
        "Kenal pasti aktiviti, objek, peristiwa, manfaat, masalah atau mesej.",
      ),
      branch("apa-contoh", "Contoh", [
        node("apa-petikan", "Petikan", "“Program itu bertujuan memupuk minat membaca.”"),
        node("apa-soalan", "Soalan", "“Apakah tujuan program itu?”"),
        node("apa-jawapan", "Jawapan", "“Tujuan program itu adalah untuk memupuk minat membaca.”"),
      ]),
      node(
        "apa-semak",
        "Semak Kata Nama",
        "Pastikan jawapan sepadan dengan jenis perkara yang diminta.",
      ),
    ]),
    branch("soalan-bila", "Soalan “Bila”", [
      node(
        "bila-fokus",
        "Fokus",
        "Cari maklumat masa seperti tarikh, hari, pagi, petang, sebelum, selepas atau tempoh.",
      ),
      branch("bila-contoh", "Contoh", [
        node("bila-petikan", "Petikan", "“Pertandingan itu akan diadakan pada hari Sabtu.”"),
        node("bila-soalan", "Soalan", "“Bilakah pertandingan itu akan diadakan?”"),
        node("bila-jawapan", "Jawapan", "“Pertandingan itu akan diadakan pada hari Sabtu.”"),
      ]),
      node("bila-kesalahan", "Kesalahan Lazim", "Memberikan tempat dan bukannya masa."),
    ]),
    branch("soalan-di-mana", "Soalan “Di Mana”", [
      node("di-mana-fokus", "Fokus", "Cari lokasi atau tempat."),
      branch("di-mana-contoh", "Contoh", [
        node("di-mana-petikan", "Petikan", "“Mereka berkumpul di dewan sekolah.”"),
        node("di-mana-soalan", "Soalan", "“Di manakah mereka berkumpul?”"),
        node("di-mana-jawapan", "Jawapan", "“Mereka berkumpul di dewan sekolah.”"),
      ]),
      node("di-mana-sendi", "Kata Sendi", "Berikan perhatian kepada di, ke dan dari."),
      node(
        "di-mana-kesalahan",
        "Kesalahan Lazim",
        "Menggugurkan kata sendi nama tempat sehingga jawapan menjadi tidak lengkap.",
      ),
    ]),
    branch("soalan-mengapa", "Soalan “Mengapa”", [
      node("mengapa-fokus", "Fokus", "Cari sebab atau punca."),
      node(
        "mengapa-petunjuk",
        "Petunjuk",
        "Contohnya: kerana, sebab, oleh sebab dan disebabkan oleh.",
      ),
      branch("mengapa-contoh", "Contoh", [
        node(
          "mengapa-petikan",
          "Petikan",
          "“Amir membawa payung kerana hujan turun dengan lebat.”",
        ),
        node("mengapa-soalan", "Soalan", "“Mengapakah Amir membawa payung?”"),
        node(
          "mengapa-jawapan",
          "Jawapan",
          "“Amir membawa payung kerana hujan turun dengan lebat.”",
        ),
      ]),
      branch("mengapa-kesalahan", "Kesalahan Lazim", [
        node("mengapa-kesalahan-nota", "Kesalahan", "Memberikan tindakan dan bukannya sebab."),
        node("mengapa-salah", "Salah", "“Amir membawa payung.”"),
        node("mengapa-betul", "Betul", "“Kerana hujan turun dengan lebat.”"),
        node(
          "mengapa-lengkap",
          "Jawapan Lengkap",
          "Dalam jawapan akhir, utamakan ayat lengkap: “Amir membawa payung kerana hujan turun dengan lebat.”",
        ),
      ]),
    ]),
    branch("soalan-bagaimana", "Soalan “Bagaimana”", [
      node(
        "bagaimana-fokus",
        "Fokus",
        "Cari kaedah, proses, tindakan, cara atau langkah yang dinyatakan.",
      ),
      branch("bagaimana-contoh", "Contoh", [
        node(
          "bagaimana-petikan",
          "Petikan",
          "“Murid-murid menjaga kebersihan kelas dengan menyapu lantai dan mengelap tingkap.”",
        ),
        node("bagaimana-soalan", "Soalan", "“Bagaimanakah murid-murid menjaga kebersihan kelas?”"),
        node(
          "bagaimana-jawapan",
          "Jawapan",
          "“Murid-murid menjaga kebersihan kelas dengan menyapu lantai dan mengelap tingkap.”",
        ),
      ]),
      node(
        "bagaimana-kesalahan",
        "Kesalahan Lazim",
        "Memberikan sebab dan bukannya menerangkan cara.",
      ),
    ]),
    branch("bina-jawapan", "Bina Jawapan", [
      node("bina-lengkap", "Ayat Lengkap", "Gunakan ayat lengkap apabila sesuai."),
      branch("bina-subjek", "Masukkan Subjek", [
        node("bina-subjek-nota", "Nota", "Elakkan serpihan ayat yang tidak jelas."),
        node("bina-subjek-lemah", "Lemah", "“Di perpustakaan.”"),
        node("bina-subjek-baik", "Lebih Baik", "“Amir berada di perpustakaan.”"),
      ]),
      node("bina-makna", "Kekalkan Makna", "Jangan ubah fakta daripada petikan."),
      branch("bina-bahasa-sendiri", "Gunakan Bahasa Sendiri", [
        node(
          "bina-bahasa-nota",
          "Nota",
          "Olah semula dengan teliti apabila boleh tanpa mengubah maksud.",
        ),
        node("bina-bahasa-asal", "Ayat Asal", "“Murid digalakkan membaca setiap hari.”"),
        node("bina-bahasa-jawapan", "Jawapan", "“Murid disarankan supaya membaca setiap hari.”"),
      ]),
      node(
        "bina-jangan-tambah",
        "Jangan Tambah",
        "Jangan masukkan maklumat baharu yang tidak terdapat dalam petikan.",
      ),
      node(
        "bina-ringkas",
        "Ringkas dan Tepat",
        "Jawab secara langsung tanpa penerangan yang tidak diperlukan.",
      ),
    ]),
    branch("kesalahan-lazim", "Kesalahan Lazim", [
      node(
        "kesalahan-tidak-baca",
        "Tidak Baca Soalan",
        "Murid menyalin ayat yang tidak menjawab fokus soalan.",
      ),
      node(
        "kesalahan-kata-sama",
        "Pilih Kata Sama Sahaja",
        "Murid mengabaikan sinonim dan makna yang berkaitan.",
      ),
      node("kesalahan-salin", "Salin Terlalu Banyak", "Murid menyalin seluruh perenggan."),
      branch("kesalahan-ringkas", "Jawapan Terlalu Ringkas", [
        node("kesalahan-ringkas-lemah", "Lemah", "“Kerana sakit.”"),
        node(
          "kesalahan-ringkas-baik",
          "Lebih Baik",
          "“Ali tidak hadir ke sekolah kerana dia sakit.”",
        ),
      ]),
      node(
        "kesalahan-tambah",
        "Tambah Maklumat Sendiri",
        "Murid menambah fakta yang tidak disokong oleh petikan.",
      ),
      node(
        "kesalahan-kata-tanya",
        "Salah Kata Tanya",
        "Murid mengelirukan siapa, apa, bila, di mana, mengapa dan bagaimana.",
      ),
      node("kesalahan-fakta", "Ubah Fakta", "Murid mengubah orang, tindakan, tempat atau masa."),
      node(
        "kesalahan-gramatis",
        "Ayat Tidak Gramatis",
        "Murid menulis serpihan nota dan bukannya jawapan yang jelas.",
      ),
    ]),
    branch("teknik-mengingat", "Teknik Mengingat", [
      branch("teknik-tanya", "Rumus TANYA", [
        node("teknik-t", "T — Tentukan kata tanya", "Kenal pasti jenis maklumat yang diminta."),
        node("teknik-a1", "A — Analisis kata kunci", "Tentukan fokus utama soalan."),
        node("teknik-n", "N — Nampakkan bukti", "Tunjukkan maklumat sokongan dalam petikan."),
        node("teknik-y", "Y — Yakin dengan petikan", "Pastikan jawapan bersumberkan petikan."),
        node("teknik-a2", "A — Ayatkan jawapan", "Tulis jawapan yang jelas dan gramatis."),
      ]),
      node(
        "teknik-5w1h",
        "Rumus 5W1H",
        "Who, What, When, Where, Why dan How diajar melalui padanan Bahasa Melayu: Siapa, Apa, Bila, Di mana, Mengapa dan Bagaimana.",
      ),
      node(
        "teknik-garis",
        "Garis Bukti",
        "Semasa latihan, gariskan ayat tepat yang menyokong jawapan.",
      ),
      node("teknik-satu-fokus", "Satu Soalan, Satu Fokus", "Jangan campurkan beberapa jawapan."),
      node("teknik-baca-semula", "Baca Semula", "Baca jawapan bersama-sama dengan soalan."),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node("uasa-soalan", "Baca Soalan Dahulu", "Ketahui perkara yang perlu dicari."),
      node("uasa-kunci", "Gariskan Kata Kunci", "Kenal pasti fokus yang tepat."),
      node("uasa-bukti", "Cari Bukti", "Gunakan petikan sebagai sumber jawapan."),
      node(
        "uasa-sekeliling",
        "Baca Ayat Sekeliling",
        "Jawapan mungkin memerlukan lebih daripada satu ayat yang berdekatan.",
      ),
      node("uasa-terus", "Jawab Terus", "Jangan tulis pengenalan yang panjang."),
      node("uasa-gramatis", "Ayat Gramatis", "Gunakan ayat lengkap apabila sesuai."),
      node("uasa-fakta", "Semak Fakta", "Pastikan orang, tempat, masa dan tindakan kekal tepat."),
      node("uasa-arahan", "Ikut Arahan", "Patuhi bilangan jawapan atau isi yang diminta."),
      node(
        "uasa-tiada-tetap",
        "Tiada Formula Markah Tetap",
        "Jangan menetapkan markah, masa, bilangan ayat atau jaminan skor. Ikuti arahan soalan dan format pentaksiran semasa.",
      ),
    ]),
  ],
};
