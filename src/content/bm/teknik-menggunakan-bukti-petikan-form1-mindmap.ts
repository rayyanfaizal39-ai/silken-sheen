import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-teknik-menggunakan-bukti-petikan";

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

export const bahasaMelayuTingkatan1TeknikMenggunakanBuktiPetikanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "BUKTI PETIKAN",
  summary:
    "Jawapan yang baik disokong oleh bukti daripada petikan. Bukti mesti relevan, tepat dan tidak mengubah maksud asal.",
  children: [
    branch("apa-itu", "Apa Itu Bukti?", [
      node(
        "apa-itu-definisi",
        "Definisi",
        "Bukti ialah maklumat daripada petikan yang menyokong jawapan.",
      ),
      node(
        "apa-itu-sumber",
        "Datang daripada Petikan",
        "Bukti mesti ditemukan dalam ayat, perenggan, tindakan, dialog atau penerangan yang diberikan.",
      ),
      node(
        "apa-itu-sokong",
        "Menyokong Jawapan",
        "Bukti menunjukkan asas bagi isi, kesimpulan atau inferens yang diberikan.",
      ),
      node(
        "apa-itu-bukan-pendapat",
        "Bukan Pendapat Sendiri",
        "Pengalaman atau andaian murid tidak boleh menggantikan maklumat daripada petikan.",
      ),
      branch("apa-itu-contoh", "Contoh", [
        node("apa-itu-contoh-ayat", "Ayat Petikan", "Aina mengulang kaji pelajaran setiap malam."),
        node("apa-itu-contoh-bukti", "Bukti", "Aina mengulang kaji pelajaran setiap malam."),
        node(
          "apa-itu-contoh-sokongan",
          "Disokong",
          "Bukti itu menyokong jawapan bahawa Aina seorang yang rajin belajar.",
        ),
      ]),
    ]),
    branch("mengapa", "Mengapa Perlu Bukti?", [
      node("mengapa-tepat", "Lebih Tepat", "Jawapan berasaskan maklumat sebenar dalam petikan."),
      node(
        "mengapa-yakin",
        "Lebih Meyakinkan",
        "Pembaca dapat melihat sebab jawapan itu munasabah.",
      ),
      node(
        "mengapa-selaras",
        "Selaras dengan Kehendak Soalan",
        "Bukti yang dipilih membantu jawapan menumpukan kata tugas dan perkara yang ditanya.",
      ),
      node(
        "mengapa-elak",
        "Mengelakkan Andaian",
        "Bukti mengehadkan jawapan kepada perkara yang boleh disokong oleh petikan.",
      ),
      node(
        "mengapa-hubungan",
        "Menunjukkan Hubungan",
        "Bukti menerangkan hubungan antara jawapan dengan tindakan, sebab, kesan atau perasaan dalam petikan.",
      ),
    ]),
    branch("cara", "Cara Mencari Bukti", [
      node("cara-satu", "1. Baca Soalan", "Fahami perkara dan bentuk jawapan yang diminta."),
      node(
        "cara-dua",
        "2. Kenal Pasti Kata Kunci",
        "Tandakan nama, tindakan, perasaan, sebab, kesan, nilai atau frasa utama dalam soalan.",
      ),
      node(
        "cara-tiga",
        "3. Cari Ayat Berkaitan",
        "Cari kata yang sama atau seerti, kemudian baca ayat sebelum dan selepasnya.",
      ),
      node(
        "cara-empat",
        "4. Gariskan Bukti",
        "Tandakan bahagian khusus yang benar-benar menyokong jawapan.",
      ),
      node(
        "cara-lima",
        "5. Semak Semula Konteks",
        "Pastikan bukti tidak dipisahkan daripada konteks sehingga maksudnya berubah.",
      ),
      node(
        "cara-uji",
        "Uji dengan Soalan",
        "Tanya: Adakah bukti ini menerangkan jawapan saya secara langsung?",
      ),
    ]),
    branch("pilih", "Pilih Bukti Tepat", [
      node(
        "pilih-langsung",
        "Jawab Secara Langsung",
        "Pilih maklumat yang mempunyai hubungan paling jelas dengan perkara yang ditanya.",
      ),
      node(
        "pilih-khusus",
        "Cukup Khusus",
        "Bukti perlu mengandungi butiran yang menyokong jawapan, bukan frasa terlalu umum.",
      ),
      node(
        "pilih-ringkas",
        "Ambil Bahagian yang Perlu",
        "Gunakan ayat atau frasa yang relevan sahaja.",
      ),
      node(
        "pilih-jangan-perenggan",
        "Jangan Salin Seluruh Perenggan",
        "Salinan yang terlalu panjang boleh menyembunyikan bukti sebenar dan memasukkan maklumat tidak berkaitan.",
      ),
      branch("pilih-banding", "Bandingkan", [
        node(
          "pilih-lemah",
          "Bukti Lemah",
          "Seluruh perenggan disalin tanpa memilih bahagian yang menjawab soalan.",
        ),
        node(
          "pilih-kuat",
          "Bukti Tepat",
          "Frasa atau ayat khusus yang menunjukkan tindakan, sebab atau keadaan yang ditanya.",
        ),
      ]),
      node(
        "pilih-beberapa",
        "Jika Ada Beberapa Bukti",
        "Pilih bukti paling kuat atau gabungkan bukti yang saling melengkapi tanpa pengulangan.",
      ),
    ]),
    branch("olah", "Mengolah Bukti", [
      node(
        "olah-parafrasa",
        "Parafrasa",
        "Bukti boleh ditulis semula menggunakan bahasa sendiri apabila maksud asal dikekalkan.",
      ),
      node(
        "olah-susunan",
        "Tukar Susunan Ayat",
        "Susun semula ayat supaya sesuai dengan jawapan yang lengkap dan gramatis.",
      ),
      node(
        "olah-seerti",
        "Gunakan Kata Seerti",
        "Pilih perkataan lain yang sesuai dengan konteks tanpa menukar nada atau fakta.",
      ),
      node(
        "olah-kekal",
        "Kekalkan Fakta",
        "Jangan ubah watak, tindakan, sebab, kesan, masa, tempat atau urutan peristiwa.",
      ),
      branch("olah-contoh", "Contoh", [
        node("olah-asal", "Bukti Asal", "Ravi membantu jirannya membawa barang-barang yang berat."),
        node("olah-semula", "Bukti Diolah", "Ravi menolong jirannya mengangkat barang berat."),
        node(
          "olah-semak",
          "Semakan",
          "Perkataan berubah tetapi pelaku, tindakan dan maksud asal kekal.",
        ),
      ]),
    ]),
    branch("tersurat", "Bukti untuk Isi Tersurat", [
      node(
        "tersurat-maksud",
        "Maklumat Langsung",
        "Bukti isi tersurat biasanya diambil terus daripada ayat yang menyatakan jawapan.",
      ),
      node(
        "tersurat-cara",
        "Padankan Kata Kunci",
        "Cari perkataan yang sama atau seerti dengan kata kunci dalam soalan.",
      ),
      branch("tersurat-contoh-satu", "Contoh 1", [
        node(
          "tersurat-satu-petikan",
          "Petikan",
          "Mira pergi ke perpustakaan pada waktu rehat untuk meminjam buku.",
        ),
        node("tersurat-satu-soalan", "Soalan", "Mengapakah Mira pergi ke perpustakaan?"),
        node("tersurat-satu-bukti", "Bukti", "Untuk meminjam buku."),
        node("tersurat-satu-jawapan", "Jawapan", "Mira pergi ke perpustakaan untuk meminjam buku."),
      ]),
      branch("tersurat-contoh-dua", "Contoh 2", [
        node(
          "tersurat-dua-petikan",
          "Petikan",
          "Gotong-royong itu diadakan pada hari Sabtu di taman permainan.",
        ),
        node("tersurat-dua-soalan", "Soalan", "Bilakah gotong-royong itu diadakan?"),
        node("tersurat-dua-bukti", "Bukti", "Pada hari Sabtu."),
      ]),
      node(
        "tersurat-jangan-tambah",
        "Jangan Tambah Maklumat",
        "Jawab menggunakan perkara yang dinyatakan, walaupun murid mengetahui maklumat lain tentang topik tersebut.",
      ),
    ]),
    branch("tersirat", "Bukti untuk Isi Tersirat", [
      node(
        "tersirat-maksud",
        "Menyokong Inferens",
        "Bukti isi tersirat ialah petunjuk yang membolehkan murid membuat kesimpulan yang tidak dinyatakan secara langsung.",
      ),
      branch("tersirat-formula", "Formula", [
        node("tersirat-inferens", "Inferens", "Nyatakan kesimpulan yang munasabah."),
        node("tersirat-tambah", "+", "Hubungkan inferens dengan petunjuk petikan."),
        node(
          "tersirat-bukti",
          "Bukti",
          "Nyatakan tindakan, dialog atau keadaan yang menyokong inferens.",
        ),
      ]),
      branch("tersirat-contoh", "Contoh", [
        node(
          "tersirat-petikan",
          "Petikan",
          "Walaupun hujan lebat, Siti tetap datang awal dan menyusun kerusi sebelum program bermula.",
        ),
        node("tersirat-soalan", "Soalan", "Apakah sifat Siti?"),
        node("tersirat-inferens-contoh", "Inferens", "Siti seorang yang bertanggungjawab."),
        node(
          "tersirat-bukti-contoh",
          "Bukti",
          "Dia datang awal dan menyusun kerusi walaupun hujan lebat.",
        ),
        node(
          "tersirat-jawapan",
          "Jawapan",
          "Siti seorang yang bertanggungjawab kerana dia tetap datang awal dan menyusun kerusi walaupun hujan lebat.",
        ),
      ]),
      node(
        "tersirat-bukan-teka",
        "Bukan Teka-teki",
        "Inferens mesti boleh dijelaskan dengan satu atau lebih petunjuk dalam petikan.",
      ),
    ]),
    branch("contoh", "Contoh Soalan", [
      branch("contoh-tindakan", "Tindakan", [
        node(
          "contoh-tindakan-soalan",
          "Soalan",
          "Apakah tindakan Farah untuk menjaga kebersihan kelas?",
        ),
        node(
          "contoh-tindakan-bukti",
          "Bukti",
          "Farah menyapu lantai dan mengosongkan tong sampah selepas kelas.",
        ),
        node(
          "contoh-tindakan-jawapan",
          "Jawapan Contoh",
          "Farah menjaga kebersihan kelas dengan menyapu lantai dan mengosongkan tong sampah.",
        ),
        node(
          "contoh-tindakan-hurai",
          "Penjelasan",
          "Bukti menyatakan dua tindakan yang menjawab soalan secara langsung.",
        ),
      ]),
      branch("contoh-perasaan", "Perasaan", [
        node(
          "contoh-perasaan-soalan",
          "Soalan",
          "Apakah perasaan Kumar selepas menerima keputusan peperiksaan?",
        ),
        node(
          "contoh-perasaan-bukti",
          "Bukti",
          "Kumar tersenyum lebar lalu mengucapkan terima kasih kepada gurunya.",
        ),
        node(
          "contoh-perasaan-jawapan",
          "Jawapan Contoh",
          "Kumar berasa gembira kerana dia tersenyum lebar selepas menerima keputusan peperiksaan.",
        ),
        node(
          "contoh-perasaan-hurai",
          "Penjelasan",
          "Ekspresi Kumar menjadi petunjuk yang menyokong inferens tentang perasaannya.",
        ),
      ]),
      branch("contoh-sebab", "Sebab", [
        node("contoh-sebab-soalan", "Soalan", "Mengapakah penduduk menanam pokok di kawasan itu?"),
        node(
          "contoh-sebab-bukti",
          "Bukti",
          "Pokok-pokok itu dapat mengurangkan bahang dan menyediakan udara yang lebih segar.",
        ),
        node(
          "contoh-sebab-jawapan",
          "Jawapan Contoh",
          "Penduduk menanam pokok untuk mengurangkan bahang dan mendapatkan udara yang lebih segar.",
        ),
        node(
          "contoh-sebab-hurai",
          "Penjelasan",
          "Jawapan mengolah dua sebab yang dinyatakan dalam petikan tanpa menambah fakta.",
        ),
      ]),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "kesalahan-tiada",
        "Tiada Bukti",
        "Jawapan diberikan tanpa menyatakan maklumat yang menyokongnya.",
      ),
      node(
        "kesalahan-salah",
        "Bukti Salah",
        "Maklumat dipetik dengan tidak tepat atau bercanggah dengan petikan.",
      ),
      node(
        "kesalahan-banyak",
        "Salin Terlalu Banyak",
        "Seluruh perenggan disalin walaupun hanya satu bahagian diperlukan.",
      ),
      node(
        "kesalahan-ubah",
        "Ubah Fakta",
        "Bukti diolah sehingga pelaku, tindakan, sebab atau maksud asal berubah.",
      ),
      node(
        "kesalahan-tidak-kait",
        "Bukti Tidak Berkaitan",
        "Petikan yang dipilih benar, tetapi tidak menyokong jawapan kepada soalan tersebut.",
      ),
      node(
        "kesalahan-pendapat",
        "Ganti dengan Pendapat",
        "Murid menggunakan pandangan sendiri sebagai bukti petikan.",
      ),
    ]),
    branch("teknik", "Teknik Mengingat", [
      branch("teknik-bukti", "Rumus BUKTI", [
        node("teknik-b", "B — Baca Soalan", "Fahami perkara yang perlu dibuktikan."),
        node("teknik-u", "U — Underline Kata Kunci", "Gariskan kata kunci dalam soalan."),
        node("teknik-k", "K — Kenal Pasti Ayat", "Cari ayat yang berkaitan dalam petikan."),
        node("teknik-t", "T — Tunjukkan Bukti", "Pilih bahagian yang paling tepat."),
        node("teknik-i", "I — Isi Jawapan", "Gabungkan jawapan dengan bukti secara gramatis."),
      ]),
      node("teknik-uji", "Uji Kaitan", "Tanya sama ada bukti benar-benar menjelaskan jawapan."),
      node(
        "teknik-konteks",
        "Baca Sekeliling",
        "Semak ayat sebelum dan selepas agar konteks tidak tersalah tafsir.",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node(
        "uasa-tepat",
        "Pilih Bukti Paling Tepat",
        "Utamakan bahagian yang menjawab soalan secara langsung.",
      ),
      node(
        "uasa-fakta",
        "Jangan Menambah Fakta",
        "Gunakan maklumat yang terdapat dalam petikan sahaja.",
      ),
      node(
        "uasa-gramatis",
        "Gunakan Bahasa Gramatis",
        "Gabungkan jawapan dan bukti dalam ayat lengkap yang mudah difahami.",
      ),
      node(
        "uasa-semak",
        "Semak Kesesuaian Bukti",
        "Pastikan bukti tepat, relevan dan mengekalkan maksud asal.",
      ),
      node(
        "uasa-ringkas",
        "Elakkan Salinan Berlebihan",
        "Ambil bukti yang diperlukan sahaja, bukan seluruh perenggan.",
      ),
      node(
        "uasa-arahan",
        "Ikut Arahan Soalan",
        "Jangan bergantung pada markah tetap atau janji skor. Ikuti kehendak soalan dan format pentaksiran semasa.",
      ),
    ]),
  ],
};
