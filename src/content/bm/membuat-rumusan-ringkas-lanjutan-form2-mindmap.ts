import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-membuat-rumusan-ringkas-lanjutan";

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

export const bahasaMelayuTingkatan2RumusanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "RUMUSAN LANJUTAN",
  summary:
    "Rumusan yang baik memilih isi penting, menggabungkan maklumat yang berkaitan dan menyampaikan maksud asal secara ringkas menggunakan bahasa yang jelas.",
  children: [
    branch("apa-itu", "Apa Itu?", [
      node(
        "apa-definisi",
        "Definisi",
        "Rumusan ialah penulisan ringkas yang menyampaikan isi penting daripada petikan tanpa memasukkan maklumat yang tidak diperlukan.",
      ),
      node(
        "apa-tingkatan-2",
        "Keperluan Tingkatan 2",
        "Murid perlu mengenal pasti beberapa isi penting, membezakan isi utama daripada contoh, menggabungkan idea berkaitan, mengekalkan maksud asal dan menulis secara koheren.",
      ),
      node(
        "apa-bukan-salin",
        "Bukan Salin Pendek",
        "Rumusan bukan sekadar memendekkan setiap ayat dalam petikan. Murid perlu memilih dan mengolah maklumat mengikut fokus.",
      ),
      branch("apa-prinsip", "Prinsip", [
        node("prinsip-pilih", "Pilih", "Kenal pasti isi yang benar-benar penting."),
        node("prinsip-gabung", "+ Gabung", "Satukan isi berkaitan tanpa mengaburkan makna."),
        node("prinsip-olah", "+ Olah", "Gunakan bahasa sendiri yang tepat dan gramatis."),
        node("prinsip-semak", "+ Semak", "Pastikan fokus, fakta dan aliran idea terpelihara."),
      ]),
    ]),
    branch("fokus", "Kenal Pasti Fokus", [
      node(
        "fokus-tema",
        "Apakah Tema Utama?",
        "Tentukan perkara umum yang menjadi pokok perbincangan petikan.",
      ),
      node(
        "fokus-dominan",
        "Apakah yang Paling Banyak Dibincangkan?",
        "Perhatikan idea yang dihuraikan berulang kali atau dikembangkan dalam beberapa perenggan.",
      ),
      node(
        "fokus-arahan",
        "Apakah Fokus Arahan?",
        "Jika arahan diberikan, kenal pasti sama ada rumusan perlu menumpukan faedah, langkah, faktor, kesan, peranan atau cabaran.",
      ),
      node(
        "fokus-contoh",
        "Contoh Faedah Bersenam",
        "Jika petikan menghuraikan beberapa manfaat aktiviti fizikal, fokus yang sesuai ialah ‘faedah bersenam’.",
      ),
      node(
        "fokus-kekal",
        "Kekal pada Fokus",
        "Ketepikan butiran yang menarik tetapi tidak menjawab fokus rumusan.",
      ),
    ]),
    branch("isi-utama", "Cari Isi Utama", [
      node(
        "utama-definisi",
        "Mesej Terpenting",
        "Isi utama ialah mesej paling penting dalam sesuatu ayat atau perenggan yang menyumbang terus kepada fokus rumusan.",
      ),
      branch("utama-petunjuk", "Petunjuk Isi Utama", [
        node(
          "utama-ayat-topik",
          "Ayat Topik",
          "Cari ayat yang memperkenalkan atau merumuskan idea perenggan.",
        ),
        node(
          "utama-ulang",
          "Idea Berulang",
          "Kenal pasti gagasan yang muncul atau dihuraikan dalam beberapa bahagian.",
        ),
        node(
          "utama-fakta",
          "Fakta Utama",
          "Pilih fakta yang penting untuk memahami fokus petikan.",
        ),
        node(
          "utama-sebab-kesan",
          "Sebab atau Kesan Utama",
          "Pilih hubungan sebab dan akibat yang menjadi teras perbincangan.",
        ),
        node(
          "utama-tindakan",
          "Tindakan Utama",
          "Pilih langkah yang benar-benar menjawab masalah atau fokus.",
        ),
      ]),
      branch("utama-contoh", "Contoh Membaca", [
        node(
          "utama-perenggan",
          "Perenggan",
          "Membaca dapat meningkatkan pengetahuan. Murid juga memperoleh kosa kata baharu. Aktiviti ini boleh dilakukan di perpustakaan atau di rumah.",
        ),
        node("utama-isi-1", "Isi Utama 1", "Membaca meningkatkan pengetahuan."),
        node("utama-isi-2", "Isi Utama 2", "Membaca menambah kosa kata."),
        node(
          "utama-sokongan",
          "Butiran Sokongan",
          "Frasa ‘di perpustakaan atau di rumah’ hanya menerangkan tempat aktiviti dan bukan isi utama.",
        ),
      ]),
    ]),
    branch("sokongan", "Bezakan Isi Sokongan", [
      node("sokongan-utama", "Isi Utama", "Idea teras yang perlu dikekalkan untuk menjawab fokus."),
      node(
        "sokongan-contoh",
        "Contoh",
        "Ilustrasi yang membantu penerangan tetapi mungkin tidak perlu dalam rumusan akhir.",
      ),
      node("sokongan-huraian", "Huraian", "Penjelasan lanjut yang menerangkan isi utama."),
      node(
        "sokongan-kecil",
        "Butiran Kecil",
        "Maklumat sampingan seperti nama, tempat khusus atau gambaran terperinci.",
      ),
      node(
        "sokongan-petunjuk",
        "Butiran yang Lazim Digugurkan",
        "Nama, tempat khusus, contoh ilustrasi dan huraian berulang boleh diketepikan apabila tidak diperlukan untuk mengekalkan maksud utama.",
      ),
      node(
        "sokongan-prinsip",
        "Tidak Semua Ayat Dipilih",
        "Setiap ayat dalam petikan tidak semestinya layak dimasukkan ke dalam rumusan akhir.",
      ),
    ]),
    branch("gabung", "Gabungkan Isi", [
      branch("gabung-membaca", "Contoh Membaca", [
        node("gabung-membaca-1", "Idea 1", "Membaca meningkatkan pengetahuan."),
        node("gabung-membaca-2", "Idea 2", "Membaca memperluas kosa kata."),
        node(
          "gabung-membaca-hasil",
          "Gabungan",
          "Amalan membaca dapat meningkatkan pengetahuan dan memperluas kosa kata.",
        ),
      ]),
      branch("gabung-senaman", "Contoh Bersenam", [
        node("gabung-senaman-1", "Idea 1", "Bersenam menguatkan tubuh."),
        node("gabung-senaman-2", "Idea 2", "Bersenam meningkatkan stamina."),
        node(
          "gabung-senaman-hasil",
          "Gabungan",
          "Bersenam membantu meningkatkan kecergasan dan stamina tubuh.",
        ),
      ]),
      node(
        "gabung-syarat",
        "Gabung Jika Berkaitan",
        "Satukan isi apabila subjek dan hubungannya jelas serta maksud asal masih terpelihara.",
      ),
      node(
        "gabung-elak",
        "Jangan Paksa",
        "Jangan memaksa idea yang tidak berkaitan ke dalam satu ayat kerana aliran dan maksud boleh menjadi kabur.",
      ),
    ]),
    branch("susun", "Susun Mengikut Logik", [
      node(
        "susun-umum",
        "Umum → Khusus",
        "Mulakan dengan gambaran umum sebelum menyatakan perkara yang lebih khusus.",
      ),
      node(
        "susun-sebab",
        "Sebab → Kesan",
        "Nyatakan punca sebelum akibat supaya hubungan idea mudah diikuti.",
      ),
      node(
        "susun-masalah",
        "Masalah → Penyelesaian",
        "Bentangkan masalah dahulu sebelum langkah mengatasinya.",
      ),
      node(
        "susun-penting",
        "Paling Penting → Sokongan",
        "Dahulukan isi yang paling kuat atau paling menepati fokus.",
      ),
      node(
        "susun-petikan",
        "Urutan Petikan",
        "Kekalkan susunan asal apabila urutan itu sudah logik dan membantu kefahaman.",
      ),
      node(
        "susun-penanda",
        "Penanda Wacana Ringkas",
        "Gunakan selain itu, seterusnya, di samping itu atau oleh itu apabila perlu untuk menghubungkan idea.",
      ),
      node(
        "susun-tidak-rawak",
        "Elakkan Lompatan Idea",
        "Pastikan idea mengalir secara semula jadi dan jangan memenuhi rumusan dengan terlalu banyak penanda wacana.",
      ),
    ]),
    branch("bahasa-sendiri", "Gunakan Bahasa Sendiri", [
      branch("bahasa-contoh", "Contoh Kokurikulum", [
        node(
          "bahasa-asal",
          "Ayat Asal",
          "Murid digalakkan menyertai aktiviti kokurikulum kerana dapat meningkatkan keyakinan diri.",
        ),
        node(
          "bahasa-olah",
          "Ayat Diolah",
          "Penglibatan dalam aktiviti kokurikulum dapat membantu murid membina keyakinan diri.",
        ),
      ]),
      node(
        "bahasa-struktur",
        "Ubah Struktur Ayat",
        "Susun semula ayat tanpa menukar hubungan fakta.",
      ),
      node(
        "bahasa-sinonim",
        "Gunakan Sinonim Sesuai",
        "Pilih kata seerti yang tepat dalam konteks, bukan secara membuta tuli.",
      ),
      node(
        "bahasa-gabung",
        "Gabungkan Maklumat",
        "Satukan idea yang berkaitan untuk menghasilkan ayat yang lebih padat.",
      ),
      node(
        "bahasa-maksud",
        "Pelihara Maksud",
        "Bahasa sendiri tidak bermaksud semua perkataan asal mesti ditukar. Ketepatan makna lebih utama.",
      ),
    ]),
    branch("kekalkan", "Kekalkan Maksud", [
      node(
        "kekalkan-unsur",
        "Unsur yang Tidak Boleh Berubah",
        "Pelihara subjek, sebab, kesan, kuantiti, urutan, darjah dan tahap kepastian yang dinyatakan dalam petikan.",
      ),
      branch("kekalkan-contoh", "Contoh Kuantiti", [
        node("kekalkan-asal", "Ayat Asal", "Sesetengah murid menghadapi masalah mengurus masa."),
        node("kekalkan-salah", "Ayat Salah", "Semua murid tidak pandai mengurus masa."),
        node(
          "kekalkan-betul",
          "Ayat Tepat",
          "Sebahagian murid menghadapi kesukaran mengurus masa.",
        ),
        node(
          "kekalkan-beza",
          "Mengapa Berbeza?",
          "‘Sesetengah’ merujuk sebahagian sahaja, manakala ‘semua’ merangkumi keseluruhan kumpulan dan mengubah fakta asal.",
        ),
      ]),
      node(
        "kekalkan-nuansa",
        "Pelihara Nuansa",
        "Kata seperti mungkin, boleh, sering dan pasti membawa tahap kepastian yang berbeza dan tidak boleh ditukar sesuka hati.",
      ),
    ]),
    branch("pembuka", "Ayat Pembuka", [
      node(
        "pembuka-bincang",
        "Petikan Membincangkan…",
        "Sesuai untuk memperkenalkan sesuatu isu atau perkara umum.",
      ),
      node(
        "pembuka-hurai",
        "Petikan Menghuraikan…",
        "Sesuai apabila petikan mengembangkan beberapa aspek sesuatu perkara.",
      ),
      node(
        "pembuka-terang",
        "Petikan Menerangkan…",
        "Sesuai apabila petikan memberikan penerangan atau proses.",
      ),
      node(
        "pembuka-jelas",
        "Petikan Menjelaskan…",
        "Sesuai apabila petikan memperincikan sebab, kesan atau hubungan idea.",
      ),
      node(
        "pembuka-contoh",
        "Contoh",
        "Petikan membincangkan kepentingan amalan membaca dalam kalangan murid.",
      ),
      node(
        "pembuka-pilih",
        "Pilih Secara Semula Jadi",
        "Sesuaikan kata kerja dengan kandungan. Jangan paksa satu ayat pembuka yang sama untuk setiap rumusan.",
      ),
    ]),
    branch("penutup", "Ayat Penutup", [
      node(
        "penutup-membaca",
        "Contoh Membaca",
        "Kesimpulannya, amalan membaca memberikan pelbagai manfaat kepada murid.",
      ),
      node(
        "penutup-alam",
        "Contoh Alam Sekitar",
        "Secara keseluruhannya, semua pihak perlu bekerjasama untuk menjaga alam sekitar.",
      ),
      node(
        "penutup-ringkas",
        "Ringkas dan Berkaitan",
        "Gunakan kesimpulan yang padat apabila sesuai dengan arahan dan bentuk rumusan.",
      ),
      node(
        "penutup-baharu",
        "Jangan Tambah Isi Baharu",
        "Ayat penutup merangkum fokus dan tidak memperkenalkan perkara yang belum dinyatakan.",
      ),
      node(
        "penutup-peribahasa",
        "Jangan Paksa Peribahasa",
        "Rumusan tidak semestinya memerlukan peribahasa.",
      ),
    ]),
    branch("contoh", "Contoh Rumusan", [
      branch("contoh-petikan", "Petikan Ringkas", [
        node(
          "contoh-ayat-1",
          "Ayat 1",
          "Amalan membaca membolehkan murid memperoleh pelbagai pengetahuan baharu.",
        ),
        node(
          "contoh-ayat-2",
          "Ayat 2",
          "Melalui bahan bacaan yang bermutu, mereka juga dapat memperluas kosa kata.",
        ),
        node(
          "contoh-ayat-3",
          "Ayat 3",
          "Pembacaan yang aktif melatih murid menilai maklumat dan meningkatkan kemahiran berfikir.",
        ),
        node(
          "contoh-ayat-4",
          "Ayat 4",
          "Sesetengah murid gemar membaca di sudut bacaan sekolah pada waktu rehat.",
        ),
        node(
          "contoh-ayat-5",
          "Ayat 5",
          "Oleh sebab itu, budaya membaca wajar dipupuk secara berterusan.",
        ),
      ]),
      node("contoh-isi-1", "Isi 1", "Membaca meningkatkan pengetahuan."),
      node("contoh-isi-2", "Isi 2", "Membaca memperluas kosa kata."),
      node("contoh-isi-3", "Isi 3", "Membaca meningkatkan kemahiran berfikir."),
      node(
        "contoh-tidak-perlu",
        "Maklumat Tidak Perlu",
        "Keterangan tentang sudut bacaan sekolah dan waktu rehat ialah butiran kecil yang tidak diperlukan untuk fokus faedah membaca.",
      ),
      node(
        "contoh-akhir",
        "Rumusan Akhir",
        "Petikan menghuraikan faedah amalan membaca kepada murid. Amalan ini dapat meningkatkan pengetahuan, memperluas kosa kata dan mengembangkan kemahiran berfikir. Kesimpulannya, budaya membaca membawa pelbagai manfaat kepada murid.",
      ),
      node(
        "contoh-baik",
        "Mengapa Baik?",
        "Rumusan menepati fokus, menggabungkan isi penting, membuang butiran kecil, mengekalkan maksud asal dan menggunakan bahasa yang gramatis serta koheren.",
      ),
    ]),
    branch("semak", "Semak Rumusan", [
      node("semak-fokus", "Fokus", "Adakah rumusan kekal pada perkara yang diminta?"),
      node("semak-isi", "Isi", "Adakah isi penting daripada petikan telah dimasukkan?"),
      node(
        "semak-duplikasi",
        "Duplikasi",
        "Adakah idea yang sama diulang dengan kata-kata berbeza?",
      ),
      node(
        "semak-maksud",
        "Maksud",
        "Adakah subjek, kuantiti, sebab, kesan atau fakta lain telah berubah?",
      ),
      node("semak-bahasa", "Bahasa", "Adakah ayat gramatis, lengkap dan jelas?"),
      node("semak-koheren", "Koheren", "Adakah idea disusun dan dihubungkan secara logik?"),
      node(
        "semak-arahan",
        "Arahan",
        "Patuhi had perkataan atau format hanya jika dinyatakan dalam soalan sebenar; jangan andaikan satu had yang universal.",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node(
        "salah-salin",
        "Salin Bulat-bulat",
        "Bahagian besar petikan disalin tanpa pemilihan atau pengolahan.",
      ),
      node(
        "salah-contoh",
        "Terlalu Banyak Contoh",
        "Contoh kecil dikekalkan sedangkan isi teras tertinggal.",
      ),
      node(
        "salah-tertinggal",
        "Isi Utama Tertinggal",
        "Satu atau lebih idea penting yang menjawab fokus tidak dimasukkan.",
      ),
      node(
        "salah-ulang",
        "Isi Sama Diulang",
        "Makna yang sama dinyatakan beberapa kali dengan perkataan berbeza.",
      ),
      node(
        "salah-pendapat",
        "Tambah Pendapat Sendiri",
        "Pandangan yang tidak disokong oleh petikan dimasukkan ke dalam rumusan.",
      ),
      node(
        "salah-fakta",
        "Ubah Fakta",
        "Kuantiti, subjek, sebab atau kesan asal telah berubah semasa mengolah ayat.",
      ),
      node(
        "salah-panjang",
        "Rumusan Terlalu Panjang",
        "Butiran dan huraian yang tidak diperlukan masih dikekalkan.",
      ),
      node(
        "salah-pendek",
        "Rumusan Terlalu Pendek",
        "Terlalu banyak maklumat dibuang sehingga maksud penting hilang.",
      ),
      node(
        "salah-bahasa",
        "Bahasa Tidak Gramatis",
        "Ayat tergantung atau fragmen digunakan tanpa hubungan yang jelas.",
      ),
    ]),
    branch("teknik", "Teknik Mengingat", [
      branch("teknik-rumus", "Rumus RUMUS", [
        node("rumus-r", "R — Rujuk Fokus", "Pastikan isi dipilih mengikut tema dan arahan."),
        node(
          "rumus-u1",
          "U — Utamakan Isi Penting",
          "Bezakan isi teras daripada contoh atau butiran kecil.",
        ),
        node(
          "rumus-m",
          "M — Masukkan Idea Berkaitan",
          "Gabungkan isi yang mempunyai hubungan jelas.",
        ),
        node(
          "rumus-u2",
          "U — Ubah kepada Bahasa Sendiri",
          "Olah struktur dan kosa kata dengan tepat.",
        ),
        node("rumus-s", "S — Semak Maksud", "Pastikan fakta dan nuansa asal tidak berubah."),
      ]),
      branch("teknik-pilih", "Rumus PILIH", [
        node("pilih-p", "P — Pahami Petikan", "Baca keseluruhan petikan sebelum memilih isi."),
        node("pilih-i1", "I — Isi Utama", "Tandai perkara yang terus menjawab fokus."),
        node("pilih-l", "L — Lupakan Contoh Kecil", "Gugurkan ilustrasi yang tidak diperlukan."),
        node(
          "pilih-i2",
          "I — Ikat Idea Berkaitan",
          "Satukan maklumat yang boleh disampaikan dengan jelas.",
        ),
        node("pilih-h", "H — Hasilkan Rumusan", "Tulis perenggan yang padat dan koheren."),
      ]),
      node(
        "teknik-fleksibel",
        "Panduan Fleksibel",
        "RUMUS dan PILIH ialah alat berfikir, bukannya formula kaku yang menggantikan pemahaman terhadap arahan sebenar.",
      ),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node(
        "uasa-baca",
        "Baca Keseluruhan Petikan",
        "Fahami perkembangan idea termasuk maklumat merentas perenggan.",
      ),
      node("uasa-fokus", "Kenal Pasti Fokus", "Tentukan perkara tepat yang perlu dirumuskan."),
      node(
        "uasa-utama",
        "Cari Isi Utama",
        "Pilih idea teras, sebab, kesan atau tindakan yang penting.",
      ),
      node(
        "uasa-buang",
        "Buang Contoh Tidak Penting",
        "Ketepikan nama, tempat atau ilustrasi yang tidak menambah maksud utama.",
      ),
      node(
        "uasa-gabung",
        "Gabungkan Idea Berkaitan",
        "Padatkan maklumat tanpa memaksa idea yang berlainan.",
      ),
      node("uasa-bahasa", "Gunakan Bahasa Sendiri", "Olah ayat secara tepat dan gramatis."),
      node(
        "uasa-maksud",
        "Jangan Ubah Maksud",
        "Kekalkan fakta, kuantiti dan tahap kepastian asal.",
      ),
      node("uasa-duplikasi", "Semak Duplikasi", "Buang pengulangan makna yang tidak diperlukan."),
      node(
        "uasa-arahan",
        "Ikut Arahan Sebenar",
        "Patuhi fokus, format atau had yang dinyatakan dalam soalan.",
      ),
      node(
        "uasa-tiada-formula",
        "Tiada Formula Universal",
        "Jangan andaikan bilangan isi, ayat atau perkataan yang tetap, jawapan contoh yang sesuai untuk semua petikan, atau jaminan markah.",
      ),
    ]),
  ],
};
