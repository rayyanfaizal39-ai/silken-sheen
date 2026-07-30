import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-karangan-berpandukan-gambar";

function node(id: string, label: string, summary: string): MindNode {
  return { id: `${PREFIX}-${id}`, label, summary };
}

type LessonBranch = {
  id: string;
  label: string;
  penerangan: string;
  langkah: string;
  contoh: string;
  tip: string;
  kesalahan: string;
  kesalahanLabel?: string;
};

function lesson({
  id,
  label,
  penerangan,
  langkah,
  contoh,
  tip,
  kesalahan,
  kesalahanLabel = "Kesalahan Lazim",
}: LessonBranch): MindNode {
  return {
    id: `${PREFIX}-${id}`,
    label,
    children: [
      node(`${id}-penerangan`, "Penerangan", penerangan),
      node(`${id}-langkah`, "Langkah-langkah", langkah),
      node(`${id}-contoh`, "Contoh", contoh),
      node(`${id}-tip`, "Tip Penulisan", tip),
      node(`${id}-kesalahan`, kesalahanLabel, kesalahan),
    ],
  };
}

export const bahasaMelayuForm1KaranganBerpandukanGambarMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KARANGAN BERPANDUKAN GAMBAR",
  summary:
    "Kemahiran mentafsir maklumat visual, memilih isi, menyusun idea dan menghasilkan karangan yang jelas, lengkap serta menepati arahan.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu Karangan Berpandukan Gambar?",
      penerangan:
        "Karangan berpandukan gambar ialah penulisan yang menggunakan satu gambar atau beberapa gambar sebagai rangsangan. Murid perlu memahami arahan, mentafsir perkara yang dilihat dan mengembangkan maklumat visual menjadi ayat serta perenggan yang tersusun.",
      langkah:
        "1. Baca arahan • 2. Perhatikan keseluruhan gambar • 3. Kenal pasti tema dan situasi • 4. Catat isi yang berkaitan • 5. Susun rangka • 6. Tulis dan semak karangan.",
      contoh:
        "Gambar menunjukkan murid dan guru bergotong-royong di sekolah. Karangan boleh menerangkan persediaan, aktiviti membersihkan kawasan, kerjasama peserta dan keadaan sekolah selepas aktiviti.",
      tip: "Gunakan gambar sebagai sumber idea, tetapi pastikan semua ayat menjawab tugasan. Jika gambar mempunyai beberapa bahagian, teliti setiap bahagian sebelum menulis.",
      kesalahan:
        "Menulis tanpa membaca arahan, hanya menyenaraikan benda dalam gambar, mereka-reka perkara yang bercanggah dengan gambar atau mengabaikan fokus tugasan.",
    }),
    lesson({
      id: "mentafsir",
      label: "Cara Mentafsir Gambar",
      penerangan:
        "Mentafsir gambar bermaksud memahami maklumat yang ditunjukkan secara langsung dan membuat kesimpulan yang munasabah berdasarkan petunjuk visual. Gunakan soalan Siapa, Apa, Bila, Di mana, Mengapa dan Bagaimana.",
      langkah:
        "1. Lihat latar tempat dan masa • 2. Kenal pasti watak • 3. Perhatikan tindakan • 4. Teliti objek dan suasana • 5. Tentukan hubungan antara gambar • 6. Kaitkan tafsiran dengan arahan.",
      contoh:
        "Siapa: murid dan guru • Apa: bergotong-royong • Di mana: kawasan sekolah • Bagaimana: menyapu, mengutip sampah dan menanam pokok • Mengapa: menceriakan serta membersihkan sekolah.",
      tip: "Bezakan perkara yang jelas kelihatan daripada andaian. Andaian boleh digunakan hanya jika logik, sesuai dengan tema dan membantu huraian.",
      kesalahan:
        "Tersalah mengenal tindakan, mentafsir gambar secara terpisah tanpa melihat hubungan, membuat andaian melampau atau memasukkan maklumat yang tidak relevan.",
    }),
    lesson({
      id: "isi-penting",
      label: "Mengenal Pasti Isi Penting",
      penerangan:
        "Isi penting ialah tindakan, peristiwa atau maklumat utama dalam gambar yang menjawab fokus soalan. Pilih isi yang berlainan dan boleh dihuraikan.",
      langkah:
        "1. Gariskan kata tugas dan fokus • 2. Senaraikan semua tindakan yang kelihatan • 3. Gabungkan tindakan yang sama • 4. Pilih isi paling relevan • 5. Catat huraian atau kesan bagi setiap isi.",
      contoh:
        "Gotong-royong sekolah: membahagikan tugas • menyapu dan mengutip sampah • membersihkan longkang • menanam pokok • mengumpulkan bahan kitar semula.",
      tip: "Tulis isi dalam bentuk kata kunci dahulu. Pastikan setiap isi membawa maklumat baharu dan dapat disokong oleh gambar.",
      kesalahan:
        "Memilih butiran kecil sebagai isi utama, mengulang tindakan yang sama, mengambil semua isi tanpa memilih atau menulis isi yang tidak menjawab kata tugas.",
    }),
    lesson({
      id: "urutan",
      label: "Menyusun Idea Mengikut Urutan",
      penerangan:
        "Idea perlu disusun supaya pembaca dapat mengikuti peristiwa atau penerangan dengan mudah. Urutan boleh berdasarkan masa, susunan gambar, proses atau hubungan umum kepada khusus.",
      langkah:
        "1. Tentukan jenis urutan • 2. Susun kata kunci • 3. Letakkan persediaan sebelum tindakan • 4. Susun aktiviti utama secara logik • 5. Akhiri dengan hasil atau perasaan • 6. Tambah penanda wacana.",
      contoh:
        "Sebelum: guru membahagikan tugas • Semasa: murid menyapu, mengutip sampah dan menanam pokok • Selepas: kawasan sekolah menjadi bersih dan ceria.",
      tip: "Gunakan penanda seperti “Pada mulanya”, “Kemudian”, “Seterusnya”, “Selepas itu” dan “Akhirnya” apabila karangan memerlukan urutan masa.",
      kesalahan:
        "Melompat-lompat antara peristiwa, menulis kesan sebelum tindakan, mengikut kedudukan gambar secara membuta tuli atau menggunakan penanda urutan yang salah.",
    }),
    lesson({
      id: "pendahuluan",
      label: "Membina Pendahuluan",
      penerangan:
        "Pendahuluan memperkenalkan tema, tempat, masa atau situasi utama dalam gambar. Bahagian ini perlu membawa pembaca terus kepada perkara yang akan diceritakan atau dihuraikan.",
      langkah:
        "1. Kenal pasti tema • 2. Tentukan situasi utama • 3. Tulis ayat pengenalan • 4. Masukkan tempat atau masa jika jelas dan relevan • 5. Hubungkan dengan fokus karangan.",
      contoh:
        "Pada hari Sabtu yang lalu, warga Sekolah Menengah Seri Murni telah mengadakan aktiviti gotong-royong. Aktiviti tersebut bertujuan untuk membersihkan dan menceriakan kawasan sekolah.",
      tip: "Mulakan secara langsung dan ringkas. Jangan menerangkan semua tindakan dalam pendahuluan kerana maklumat itu perlu dikembangkan dalam perenggan isi.",
      kesalahan:
        "Pendahuluan terlalu umum, menyalin arahan soalan, memasukkan semua isi, mereka nama atau masa yang tidak diperlukan atau tidak menghubungkan pembukaan dengan gambar.",
    }),
    lesson({
      id: "mengembangkan",
      label: "Mengembangkan Isi",
      penerangan:
        "Setiap isi gambar perlu ditukarkan menjadi ayat lengkap dan dihuraikan. Gunakan unsur Isi, Mengapa, Bagaimana, Akibat atau Kesan dan Kesimpulan kecil mengikut kesesuaian.",
      langkah:
        "1. Nyatakan tindakan utama • 2. Terangkan pelaku dan cara • 3. Tambahkan sebab atau tujuan • 4. Nyatakan kesan atau perasaan • 5. Gunakan contoh visual • 6. Semak kaitan dengan gambar.",
      contoh:
        "Sekumpulan murid membersihkan longkang di belakang kantin. Mereka menggunakan penyapu dan penyodok untuk mengeluarkan sampah yang menyekat aliran air. Hasilnya, longkang menjadi bersih dan air dapat mengalir dengan lancar.",
      tip: "Gunakan kata kerja yang tepat seperti menyapu, mengutip, mengasingkan, mencangkul dan menanam. Huraikan perkara yang berlaku, bukan sekadar menyebut objek.",
      kesalahan:
        "Isi hanya satu ayat, ayat berulang, huraian tidak berdasarkan gambar, terlalu banyak andaian atau semua tindakan dicampurkan dalam satu perenggan.",
    }),
    lesson({
      id: "penutup",
      label: "Menulis Penutup",
      penerangan:
        "Penutup merumuskan peristiwa atau tema dan boleh menyatakan hasil, perasaan, pengajaran atau harapan. Penutup perlu menamatkan karangan tanpa memperkenalkan peristiwa baharu.",
      langkah:
        "1. Rumuskan aktiviti • 2. Nyatakan hasil • 3. Tambahkan perasaan atau pengajaran • 4. Nyatakan harapan jika sesuai • 5. Semak supaya tiada isi baharu.",
      contoh:
        "Aktiviti gotong-royong itu berakhir pada tengah hari. Semua peserta berasa gembira kerana kawasan sekolah telah menjadi bersih dan ceria. Kami berharap agar kebersihan sekolah terus dipelihara.",
      tip: "Hubungkan penutup dengan keadaan terakhir dalam gambar. Gunakan penanda seperti “Akhirnya”, “Kesimpulannya” atau “Selepas selesai” mengikut jenis penulisan.",
      kesalahan:
        "Tiada penutup, menambah aktiviti baharu, mengulang semua isi, perasaan tidak sesuai atau penutup terlalu umum dan tidak berkaitan.",
    }),
    lesson({
      id: "kesalahan",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan boleh berlaku pada tafsiran, isi, susunan dan bahasa. Semakan perlu memastikan karangan menepati arahan serta gambar dan dapat dibaca dengan lancar.",
      langkah:
        "1. Bandingkan karangan dengan arahan • 2. Semak penggunaan setiap gambar • 3. Tandakan isi berulang • 4. Periksa urutan • 5. Semak ayat lengkap • 6. Betulkan ejaan dan tanda baca.",
      contoh:
        "Lemah: Mereka bergotong-royong. Mereka menyapu. Mereka mengutip sampah. Lebih baik: Murid-murid bekerjasama menyapu kawasan sekolah dan mengutip sampah sebelum memasukkannya ke dalam tong.",
      tip: "Gunakan semakan G-I-U-B: Gambar, Isi, Urutan dan Bahasa. Pastikan setiap bahagian menyokong tugasan.",
      kesalahan:
        "Menyalin kapsyen, menyenaraikan objek, isi tersasar, urutan bercelaru, ayat terlalu pendek, bahasa pasar, watak berubah tanpa sebab dan jumlah perkataan atau syarat arahan diabaikan.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Gunakan formula LIHAT: L — Lihat keseluruhan, I — Ingat arahan, H — Himpun isi, A — Atur urutan, T — Tulis dan teliti. Gunakan 5W1H untuk membantu tafsiran.",
      langkah:
        "1. LIHAT keseluruhan gambar • 2. Tanya Siapa, Apa, Bila, Di mana, Mengapa dan Bagaimana • 3. Catat isi • 4. Susun rangka • 5. Tulis karangan • 6. Teliti jawapan.",
      contoh:
        "L — gambar gotong-royong • I — ceritakan aktiviti • H — bahagi tugas, bersihkan kawasan, tanam pokok • A — sebelum, semasa, selepas • T — tulis dan semak.",
      tip: "Hafal langkah, bukan contoh karangan. Gunakan kata kunci ringkas semasa merangka supaya lebih banyak masa dapat digunakan untuk menulis dan menyemak.",
      kesalahan:
        "Menulis huruf formula dalam jawapan, menghafal cerita yang sama untuk semua gambar, menggunakan semua soalan 5W1H secara paksa atau tidak membuat semakan akhir.",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Jawapan UASA yang baik menepati arahan, menggunakan maklumat gambar, menyusun idea dengan jelas dan menggunakan bahasa baku. Panjang semata-mata tidak menjamin kualiti.",
      langkah:
        "Sebelum: baca arahan dua kali, teliti gambar, tandakan fokus dan bina rangka LIHAT. • Semasa: tulis pendahuluan, kembangkan isi mengikut urutan dan akhiri dengan penutup. • Selepas: semak G-I-U-B serta semua syarat soalan.",
      contoh:
        "Rangka ringkas: Pendahuluan — gotong-royong sekolah • Isi 1 — guru membahagikan tugas • Isi 2 — murid membersihkan kawasan • Isi 3 — menanam pokok dan mengitar semula • Penutup — sekolah bersih, peserta gembira.",
      tip: "Gunakan semua gambar yang relevan, simpan masa untuk semakan, pilih ayat yang jelas dan jangan memaksa peribahasa atau kosa kata sukar jika tidak sesuai.",
      kesalahan:
        "Terus menulis tanpa rangka, tertinggal gambar penting, tidak menjawab kata tugas, isi tanpa huraian, tiada perenggan, penutup tergantung atau tidak mematuhi syarat soalan.",
    }),
  ],
};
