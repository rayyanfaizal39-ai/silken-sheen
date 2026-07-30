import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-pendahuluan";

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

export const bahasaMelayuForm1PendahuluanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "PENDAHULUAN",
  summary:
    "Kemahiran membuka karangan dengan memperkenalkan tema, memberikan huraian awal dan menyatakan fokus tugasan secara jelas, ringkas serta tersusun.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu Pendahuluan?",
      penerangan:
        "Pendahuluan ialah bahagian permulaan penulisan yang memperkenalkan tajuk kepada pembaca. Pendahuluan membawa pembaca daripada tema umum kepada fokus sebenar karangan. Binaannya boleh mengandungi pengenalan tema, huraian awal dan fokus tugasan mengikut kesesuaian panjang penulisan.",
      langkah:
        "1. Kenal pasti tema • 2. Tentukan fokus soalan • 3. Tulis ayat pengenalan yang berkaitan • 4. Berikan huraian awal • 5. Hubungkan pendahuluan dengan perkara yang akan dibincangkan.",
      contoh:
        "Tajuk: langkah menjaga kebersihan sekolah. Kebersihan sekolah penting untuk mewujudkan persekitaran pembelajaran yang selesa. Sekolah yang bersih juga dapat melindungi warga sekolah daripada penyakit. Oleh itu, beberapa langkah perlu dilaksanakan untuk memastikan kebersihan sekolah sentiasa terpelihara.",
      tip: "Perkenalkan tajuk dengan jelas, gunakan bahasa baku dan simpan huraian terperinci untuk perenggan isi. Pendahuluan ringkas mungkin memerlukan satu ayat sahaja, manakala penulisan lebih panjang boleh menggunakan beberapa ayat.",
      kesalahan:
        "Memulakan karangan terus dengan isi, menulis perkara yang tidak berkaitan, menyalin seluruh arahan soalan, memasukkan terlalu banyak isi atau menghasilkan pendahuluan yang terlalu panjang.",
    }),
    lesson({
      id: "tujuan",
      label: "Tujuan Pendahuluan",
      penerangan:
        "Pendahuluan berfungsi sebagai pintu masuk kepada karangan. Bahagian ini memperkenalkan tema, memberikan gambaran awal, menetapkan arah perbincangan, menarik perhatian pembaca dan menunjukkan bahawa penulis memahami tugasan.",
      langkah:
        "1. Nyatakan tema • 2. Berikan konteks awal • 3. Tunjukkan kepentingan atau keadaan berkaitan • 4. Nyatakan fokus dengan jelas • 5. Bawa pembaca menuju isi pertama.",
      contoh:
        "Aktiviti sukan merupakan amalan yang menyumbang kepada kesejahteraan hidup. Selain menyihatkan tubuh, aktiviti ini membantu perkembangan emosi dan sosial seseorang. Oleh itu, penglibatan dalam aktiviti sukan memberikan pelbagai faedah kepada murid.",
      tip: "Tanya diri: Apakah temanya? Apakah yang perlu difahami oleh pembaca terlebih dahulu? Apakah fokus sebenar yang perlu dibincangkan?",
      kesalahan:
        "Menyebut tema tanpa fokus, memberikan kesimpulan terlalu awal, menjanjikan perbincangan yang tidak diteruskan dalam isi atau menggunakan cerita pembuka yang tiada hubungan jelas dengan tugasan.",
    }),
    lesson({
      id: "ciri",
      label: "Ciri-ciri Pendahuluan yang Baik",
      penerangan:
        "Pendahuluan yang baik tepat dengan tugasan, jelas, tersusun, ringkas, gramatis, menggunakan bahasa baku dan menghubungkan ayat dengan lancar. Bahasa menarik hanya berkesan apabila maksudnya relevan dan mudah difahami.",
      langkah:
        "1. Semak ketepatan tema dan fokus • 2. Pastikan susunan bergerak daripada pengenalan kepada fokus • 3. Potong pengulangan • 4. Semak ayat lengkap dan bahasa baku • 5. Pastikan peralihan kepada isi pertama lancar.",
      contoh:
        "Kurang baik: Pada zaman dahulu, banyak perkara telah berlaku dan hal ini sangat penting. Lebih baik: Amalan membaca membantu murid memperoleh ilmu di luar bilik darjah. Amalan ini juga memperluas kosa kata. Oleh itu, budaya membaca perlu dipupuk dalam kalangan murid.",
      tip: "Gunakan prinsip satu ayat, satu tujuan: ayat pertama memperkenalkan tema, ayat seterusnya menghuraikan tema dan ayat terakhir menyatakan fokus. Sesuaikan bilangannya dengan tugasan.",
      kesalahan:
        "Ayat terlalu panjang, pengulangan idea, ungkapan berbunga-bunga tanpa maksud, ayat tergantung, kesalahan ejaan atau tanda baca dan penggunaan penanda wacana secara rawak.",
    }),
    lesson({
      id: "jenis",
      label: "Jenis Pendahuluan",
      penerangan:
        "Pendahuluan boleh ditulis secara langsung, umum kepada khusus, definisi, gambaran situasi, persoalan, ungkapan atau peribahasa, dan berdasarkan bahan rangsangan. Pilih jenis yang paling sesuai dengan tajuk, tujuan penulisan dan kemampuan sendiri.",
      langkah:
        "1. Teliti kata tugas dan tema • 2. Pilih pembukaan yang sesuai • 3. Hubungkan pembukaan dengan fokus • 4. Gunakan teknik yang benar-benar difahami • 5. Semak peralihan kepada isi pertama.",
      contoh:
        "Langsung: Menjaga kebersihan sekolah ialah tanggungjawab semua warga sekolah. • Umum kepada khusus: Kebersihan penting dalam kehidupan. Oleh itu, kebersihan sekolah perlu diberi perhatian. • Persoalan: Siapakah yang bertanggungjawab menjaga kebersihan sekolah? Tanggungjawab ini perlu dipikul oleh seluruh warga sekolah. • Bahan rangsangan: Poster tersebut menunjukkan beberapa amalan untuk menjaga kebersihan sekolah.",
      tip: "Pendahuluan langsung ialah pilihan yang jelas jika kurang pasti. Gunakan definisi, persoalan, gambaran atau peribahasa hanya apabila teknik itu dapat dihubungkan secara tepat dengan fokus.",
      kesalahan:
        "Peribahasa salah maksud, persoalan tidak dijawab, definisi terlalu panjang, gambaran tidak relevan, menyalin semua maklumat bahan rangsangan atau mencampurkan terlalu banyak teknik.",
    }),
    lesson({
      id: "cara",
      label: "Cara Menulis Pendahuluan",
      penerangan:
        "Gunakan urutan T-H-F: Tema → Huraian → Fokus. Urutan ini membantu murid menghasilkan pembukaan yang jelas tanpa menghafal satu pendahuluan untuk semua tajuk.",
      langkah:
        "1. Fahami kata tugas, tema dan fokus • 2. Catat kata kunci • 3. Bina ayat tema • 4. Tambahkan huraian awal • 5. Nyatakan fokus tugasan • 6. Gabungkan dan semak ayat.",
      contoh:
        "Arahan: Jelaskan kepentingan menjaga kebersihan sekolah. Tema: Kebersihan sekolah perlu diberikan perhatian. Huraian: Persekitaran bersih mewujudkan pembelajaran yang selesa dan melindungi kesihatan murid. Fokus: Oleh itu, amalan menjaga kebersihan sekolah memberikan pelbagai kepentingan kepada warga sekolah.",
      tip: "Ubah ayat fokus mengikut kata tugas: beberapa langkah perlu dilaksanakan; memberikan pelbagai kepentingan; semua pihak perlu memainkan peranan; atau keadaan ini berlaku disebabkan beberapa faktor.",
      kesalahan:
        "Salah mengenal pasti fokus, membincangkan langkah apabila soalan meminta kepentingan, menyenaraikan semua isi dalam pendahuluan, menggunakan ayat fokus kabur atau mengulang tajuk tanpa huraian.",
    }),
    lesson({
      id: "kesalahan",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan pendahuluan biasanya berlaku apabila murid tidak memahami tugasan, terlalu bergantung pada ayat hafalan atau tidak membuat semakan. Kesalahan ini boleh menyebabkan keseluruhan karangan tersasar.",
      langkah:
        "1. Gariskan kata tugas dan fokus • 2. Potong ayat tidak berkaitan • 3. Pisahkan ayat terlalu panjang • 4. Gantikan bahasa pasar • 5. Betulkan ayat fokus • 6. Semak ejaan dan tanda baca.",
      contoh:
        "Tersasar: Sekolah saya terletak berhampiran sebuah taman. Pembetulan: Kebersihan sekolah penting untuk mewujudkan persekitaran pembelajaran yang selesa. • Bahasa tidak baku: Budak-budak kena jaga sekolah. Pembetulan: Murid-murid perlu menjaga kebersihan sekolah.",
      tip: "Selepas menulis, pastikan pendahuluan menepati fokus, mempunyai ayat lengkap, tidak mengulang idea, tidak terlalu panjang dan boleh dihubungkan dengan isi pertama.",
      kesalahan:
        "Pendahuluan hafalan tidak sesuai, fokus kabur, fakta atau peribahasa salah, ayat berbunga-bunga tetapi kosong, tiada pembahagian perenggan dan tiada semakan bahasa.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Ingat T-H-F: T ialah Tema, H ialah Huraian dan F ialah Fokus. Gunakan juga proses FAHAM → RANGKA → TULIS → SEMAK serta semakan I-B-S: Isi, Bahasa dan Susunan.",
      langkah:
        "1. Catat T-H-F pada rangka • 2. Tulis satu kata kunci bagi setiap huruf • 3. Tukarkan kepada ayat lengkap • 4. Semak dengan I-B-S • 5. Pastikan pendahuluan membawa pembaca kepada isi.",
      contoh:
        "Kebaikan membaca: T — amalan membaca penting • H — menambah ilmu dan memperluas kosa kata • F — amalan membaca memberikan pelbagai kebaikan kepada murid.",
      tip: "Hafal fungsi, bukan ayat contoh. Gunakan formula sebagai panduan yang boleh dipendekkan atau dikembangkan mengikut tugasan.",
      kesalahan:
        "Menganggap formula mesti menghasilkan bilangan ayat yang sama, menghafal contoh tanpa menyesuaikan fokus, menulis huruf formula dalam jawapan atau membina ayat yang terlalu kaku.",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Dalam UASA, pendahuluan perlu membuktikan bahawa murid memahami arahan. Ketepatan, kejelasan, bahasa dan susunan lebih penting daripada pendahuluan yang panjang.",
      langkah:
        "Sebelum: baca soalan dua kali, tandakan kata tugas, tema, fokus dan syarat, kemudian rangka T-H-F. • Semasa: tulis pembukaan yang jelas, gunakan bahasa baku dan akhiri dengan fokus. • Selepas: semak I-B-S, keselarasan dengan isi, ejaan, tanda baca dan syarat soalan.",
      contoh:
        "Arahan: Jelaskan cara-cara memupuk minat membaca dalam kalangan murid. Budaya membaca penting untuk melahirkan murid yang berilmu dan berfikiran luas. Namun begitu, minat membaca memerlukan galakan yang berterusan. Oleh itu, beberapa cara perlu dilaksanakan untuk memupuk minat membaca dalam kalangan murid.",
      tip: "Utamakan pembukaan tepat berbanding bahasa terlalu berbunga-bunga, gunakan pendahuluan langsung jika kurang pasti, patuhi bahan rangsangan apabila diarahkan dan simpan masa untuk semakan.",
      kesalahan:
        "Salah membaca kata tugas, tidak merujuk bahan rangsangan, menggunakan pendahuluan hafalan yang tersasar, menulis terlalu panjang, menukar fokus antara pendahuluan dengan isi atau tidak menyemak jawapan.",
    }),
  ],
};
