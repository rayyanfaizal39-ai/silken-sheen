import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f3-strategi-menjawab-uasa";

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
      node(`${id}-tip`, "Tip Peperiksaan", tip),
      node(`${id}-kesalahan`, kesalahanLabel, kesalahan),
    ],
  };
}

export const bahasaMelayuForm3StrategiMenjawabUasaMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "STRATEGI MENJAWAB UASA",
  summary:
    "Panduan Tingkatan 3 untuk menganalisis soalan, mengurus masa, merancang, menulis dan menyemak komponen Penulisan UASA secara teratur serta matang.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu UASA Penulisan?",
      penerangan:
        "UASA Penulisan menilai keupayaan murid memahami tugasan dan menghasilkan penulisan yang relevan, tersusun, gramatis serta sesuai dengan tujuan. Pada Tingkatan 3, murid menggabungkan kemahiran asas Tingkatan 1 dan pengolahan idea Tingkatan 2 untuk menghasilkan jawapan yang lebih matang.",
      langkah:
        "1. Kenal pasti tugasan penulisan • 2. Fahami bahan atau tajuk • 3. Rancang respons • 4. Tulis mengikut bentuk yang diminta • 5. Kembangkan idea • 6. Semak isi dan bahasa • 7. Patuhi arahan kertas semasa.",
      contoh:
        "Jika bahan memaparkan amalan membaca, murid bukan sahaja menyenaraikan isi. Murid perlu memilih maklumat yang relevan, membina ayat sendiri dan menghubungkan idea supaya jawapan menjadi lengkap.",
      tip: "Anggap setiap arahan sebagai kontrak jawapan. Kandungan yang menarik tetap tidak tepat jika tidak melaksanakan kata tugas, fokus atau bentuk yang diminta.",
      kesalahan:
        "Menghafal karangan tanpa memahami soalan, menulis isi berbentuk senarai, menggunakan bahasa percakapan atau mengabaikan arahan khusus pada kertas.",
    }),
    lesson({
      id: "format",
      label: "Format Penulisan UASA",
      penerangan:
        "Berdasarkan bahan Tingkatan 3 dalam projek, komponen Penulisan berada dalam Kertas 2. Bahagian A melibatkan karangan pendek berdasarkan bahan rangsangan, manakala Bahagian B melibatkan karangan respons terbuka. Arahan, pilihan soalan, bentuk dan panjang jawapan hendaklah dirujuk pada kertas peperiksaan semasa.",
      langkah:
        "1. Semak nombor bahagian • 2. Baca semua arahan • 3. Kenal pasti sama ada bahan rangsangan atau respons terbuka • 4. Periksa bentuk penulisan • 5. Tandakan panjang jawapan yang ditetapkan • 6. Periksa pilihan soalan • 7. Jawab pada ruang yang betul.",
      contoh:
        "Bahagian A: bahan menunjukkan faedah membaca; olah semua maklumat penting menjadi karangan pendek. Bahagian B: huraikan langkah menjaga keselamatan siber; pilih dan kembangkan isi sendiri dalam karangan respons terbuka.",
      tip: "Bezakan strategi kedua-dua bahagian. Karangan pendek perlu padat dan berpandukan bahan; respons terbuka memerlukan pemilihan isi, huraian, contoh dan organisasi yang lebih luas.",
      kesalahan:
        "Menggunakan strategi respons terbuka untuk jawapan pendek, tertinggal maklumat bahan, menjawab lebih daripada atau kurang daripada pilihan yang diarahkan, salah format atau mengabaikan ketetapan panjang jawapan.",
    }),
    lesson({
      id: "arahan",
      label: "Memahami Arahan Soalan",
      penerangan:
        "Arahan menentukan tema, format dan tugasan sebenar. Teknik TFT membantu murid membezakan perkara yang dibincangkan, bentuk jawapan dan fokus yang perlu dilaksanakan.",
      langkah:
        "1. Baca soalan dua kali • 2. T—bulatkan tema • 3. F—kenal pasti format atau bentuk • 4. T—gariskan tugasan dan kata tugas • 5. Tandakan sasaran atau konteks • 6. Ungkapkan semula kehendak soalan • 7. Uji setiap isi dengan fokus.",
      contoh:
        "Soalan: “Huraikan langkah-langkah remaja melindungi diri daripada ancaman siber.” Tema: keselamatan siber • Format: karangan fakta tanpa format khusus • Tugasan: langkah perlindungan oleh remaja.",
      tip: "Lengkapkan ayat, “Saya mesti menulis [bentuk] tentang [tema] dengan menghuraikan [tugasan].” Jika ayat itu kabur, jangan mula menulis.",
      kesalahan:
        "Tersalah kata tugas, menjawab punca sedangkan soalan meminta langkah, mengabaikan sasaran remaja, memilih format salah atau hanya mengulang tajuk.",
    }),
    lesson({
      id: "masa",
      label: "Pengurusan Masa",
      penerangan:
        "Masa perlu dibahagikan kepada analisis dan rangka, penulisan serta semakan. Pembahagian mestilah berdasarkan masa keseluruhan dan tuntutan setiap bahagian dalam kertas semasa, bukan satu angka hafalan.",
      langkah:
        "1. Catat masa mula dan tamat • 2. Peruntukkan masa mengikut tuntutan bahagian • 3. Tetapkan had untuk membaca dan merangka • 4. Simpan masa akhir untuk semakan • 5. Pantau kemajuan selepas setiap perenggan • 6. Bergerak jika terlalu lama pada satu ayat.",
      contoh:
        "Jika masa bahagian hampir tamat tetapi satu ungkapan menarik belum ditemui, teruskan dengan ayat yang jelas. Lengkapkan penutup dan semakan dahulu sebelum memperindah bahasa jika masih ada masa.",
      tip: "Latih tiga fasa dengan jam: Rancang → Tulis → Semak. Dalam latihan, laraskan nisbah sehingga semua jawapan dapat disiapkan tanpa mengorbankan semakan.",
      kesalahan:
        "Menghabiskan masa pada pendahuluan, menyalin rangka terlalu terperinci, mengejar perkataan sukar, tidak memantau masa atau menggunakan semua masa untuk menulis tanpa semakan.",
    }),
    lesson({
      id: "merancang",
      label: "Merancang Jawapan",
      penerangan:
        "Rangka menukar analisis TFT kepada susunan jawapan. Untuk respons terbuka, pola 1–3/4–1 membantu menyediakan satu pendahuluan, tiga atau empat isi yang berlainan dan satu penutup. Bilangan sebenar perlu disesuaikan dengan tugasan dan masa.",
      langkah:
        "1. Senaraikan idea • 2. Pilih isi paling relevan • 3. Buang isi bertindih • 4. Susun secara logik • 5. Catat Huraian, Contoh dan Penegasan bagi setiap isi • 6. Rancang pembukaan dan penutup • 7. Padankan rangka dengan TFT.",
      contoh:
        "Tugasan keselamatan siber: Pendahuluan—risiko Internet • Isi 1—rahsia maklumat peribadi • Isi 2—kata laluan kukuh • Isi 3—elak pautan mencurigakan • Isi 4—laporkan ancaman • Penutup—tanggungjawab bersama.",
      tip: "Gunakan kata kunci, bukan ayat lengkap. Pilih isi yang boleh dihuraikan melalui mengapa, bagaimana, contoh dan kesan.",
      kesalahan:
        "Terus menulis tanpa rangka, menyenaraikan isi yang sama maksud, memilih isi di luar TFT, menyediakan terlalu banyak isi cetek atau tidak merancang penutup.",
    }),
    lesson({
      id: "pendahuluan",
      label: "Strategi Menulis Pendahuluan",
      penerangan:
        "Pendahuluan memperkenalkan tema dan membawa pembaca kepada tugasan. Murid boleh menggunakan definisi, situasi semasa, kenyataan umum, persoalan atau peribahasa yang tepat, tetapi hubungan dengan tajuk mesti jelas.",
      langkah:
        "1. Pilih pembukaan yang dikuasai • 2. Perkenalkan tema • 3. Nyatakan isu atau konteks • 4. Arahkan pembaca kepada tugasan • 5. Pastikan ringkas • 6. Semak fakta dan bahasa • 7. Elakkan menghuraikan semua isi.",
      contoh:
        "Dalam era teknologi maklumat, Internet menjadi sebahagian daripada kehidupan remaja. Namun begitu, penggunaannya turut membawa risiko penipuan dan pencerobohan akaun. Oleh itu, remaja perlu mengetahui langkah yang berkesan untuk melindungi diri daripada ancaman siber.",
      tip: "Gunakan pola Tema → Isu → Tugasan. Pembukaan langsung yang relevan lebih selamat daripada pendahuluan hafalan yang panjang.",
      kesalahan:
        "Menyalin soalan bulat-bulat, pembukaan terlalu umum, fakta tidak disahkan, peribahasa dipaksa, semua isi disenaraikan atau pendahuluan mengambil terlalu banyak masa.",
    }),
    lesson({
      id: "isi",
      label: "Strategi Mengembangkan Isi",
      penerangan:
        "Pada Tingkatan 3, setiap perenggan perlu menunjukkan hubungan antara idea, huraian dan bukti. Gunakan I-H-C-P—Isi, Huraian, Contoh, Penegasan—serta soalan 5W1H untuk memperincikan mengapa, bagaimana dan kesannya.",
      langkah:
        "1. Nyatakan satu isi utama • 2. Huraikan sebab atau kepentingan • 3. Terangkan cara • 4. Berikan contoh relevan • 5. Jelaskan kesan jika sesuai • 6. Tegaskan isi • 7. Hubungkan perenggan dengan penanda wacana yang tepat.",
      contoh:
        "Remaja perlu merahsiakan maklumat peribadi di media sosial. Hal ini penting kerana butiran diri boleh disalahgunakan. Contohnya, mereka tidak seharusnya berkongsi kata laluan atau lokasi semasa dengan orang asing. Jelaslah bahawa kerahsiaan data merupakan benteng keselamatan pengguna.",
      tip: "Gunakan satu isi utama bagi satu perenggan. Contoh yang logik dan dekat dengan kehidupan remaja lebih berkesan daripada statistik yang tidak dapat dipastikan.",
      kesalahan:
        "Huraian mengulang isi, contoh tidak berkaitan, beberapa isi bercampur, ayat terlalu panjang, penanda wacana berulang atau perkataan sukar digunakan dengan maksud salah.",
    }),
    lesson({
      id: "penutup",
      label: "Strategi Menulis Penutup",
      penerangan:
        "Penutup yang lengkap merumuskan perbincangan, memberikan cadangan atau penegasan dan menyatakan harapan yang berkaitan. Pola R-C-H—Rumusan, Cadangan, Harapan—membantu menamatkan jawapan dengan mantap.",
      langkah:
        "1. R—rumuskan tema dan tugasan • 2. C—nyatakan tindakan atau cadangan umum • 3. H—berikan harapan yang realistik • 4. Kekalkan nada karangan • 5. Elakkan isi baharu • 6. Semak kaitan dengan pendahuluan.",
      contoh:
        "Kesimpulannya, keselamatan siber ialah tanggungjawab setiap pengguna Internet. Remaja hendaklah mengamalkan langkah perlindungan dan mendapatkan bantuan apabila berlaku ancaman. Diharapkan kesedaran semua pihak dapat mewujudkan persekitaran digital yang lebih selamat.",
      tip: "Jika masa terhad, utamakan tiga fungsi R-C-H dalam ayat yang jelas. Ungkapan menarik hanya digunakan jika tepat dan semula jadi.",
      kesalahan:
        "Tiada penutup, hanya satu ayat umum, memasukkan isi baharu, menyalin pendahuluan, cadangan mustahil atau harapan yang tidak berkaitan.",
    }),
    lesson({
      id: "menyemak",
      label: "Menyemak Jawapan Sebelum Menghantar",
      penerangan:
        "Semakan akhir meliputi kehendak soalan, kelengkapan isi, organisasi dan bahasa. Murid perlu membetulkan kesalahan yang jelas tanpa merosakkan ayat yang sudah betul.",
      langkah:
        "1. Baca arahan semula • 2. Semak TFT dan format • 3. Pastikan setiap isi terhuraikan • 4. Periksa urutan dan pemerengganan • 5. Semak subjek-predikat, imbuhan dan kata sendi • 6. Betulkan ejaan serta tanda baca • 7. Periksa panjang dan semua syarat.",
      contoh:
        "Sebelum: “Sekolah kena ajar pasal Internet.” Selepas: “Pihak sekolah perlu memberikan pendidikan keselamatan siber supaya murid menggunakan Internet secara bijak dan bertanggungjawab.”",
      tip: "Semak dua pusingan: Isi dan organisasi dahulu; bahasa, ejaan serta tanda baca kemudian. Tanda setiap perenggan yang sudah diperiksa.",
      kesalahan:
        "Menyemak ejaan sahaja, mengubah terlalu banyak ayat pada saat akhir, tidak membaca arahan semula, meninggalkan ayat tergantung atau terlupa memeriksa bahagian jawapan.",
    }),
    lesson({
      id: "kesalahan-lazim",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan peperiksaan lazim berpunca daripada salah membaca tugasan, perancangan lemah, isi tidak berkembang, bahasa tidak baku dan kegagalan mengurus masa. Kesalahan kecil yang berulang turut mengganggu kejelasan jawapan.",
      langkah:
        "1. Kenal pasti jenis kesalahan • 2. Padankan setiap isi dengan tugasan • 3. Cari isi berulang • 4. Uji huraian dan contoh • 5. Periksa format serta perenggan • 6. Betulkan bahasa • 7. Catat perangkap peribadi untuk latihan seterusnya.",
      contoh:
        "Lemah: “Internet bahaya. Kita kena hati-hati.” Baik: “Pengguna perlu berhati-hati ketika menerima pautan tidak dikenali kerana pautan tersebut mungkin digunakan untuk mencuri maklumat log masuk.”",
      tip: "Gunakan senarai semak enam perkara: TFT, format, isi, huraian, bahasa dan masa. Dahulukan pembetulan yang menjejaskan maksud.",
      kesalahan:
        "Karangan terkeluar tajuk, format salah, isi berbentuk senarai, huraian berulang, contoh tidak relevan, bahasa pasar, peribahasa dipaksa, ayat tergantung dan tiada semakan.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "teknik-mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Gunakan aliran TFT → RANGKA → I-H-C-P → R-C-H → SEMAK. Aliran ini menggabungkan kemahiran memahami soalan, menyusun idea, mengembangkan perenggan, menutup karangan dan mengedit jawapan.",
      langkah:
        "1. TFT—Tema, Format, Tugasan • 2. RANGKA—pendahuluan, isi, penutup • 3. I-H-C-P—Isi, Huraian, Contoh, Penegasan • 4. R-C-H—Rumusan, Cadangan, Harapan • 5. SEMAK—soalan, isi, bahasa dan syarat.",
      contoh:
        "Soalan perpaduan: TFT—peranan remaja • Rangka—hormat, kerjasama, komunikasi • I-H-C-P—kembangkan setiap peranan • R-C-H—rumus dan harapkan masyarakat harmoni • Semak—fokus serta bahasa.",
      tip: "Hafal proses berfikir, bukan karangan model. Teknik boleh disesuaikan mengikut bentuk dan arahan soalan.",
      kesalahan:
        "Menulis nama formula dalam jawapan, memaksa setiap perenggan mempunyai panjang sama, menghafal contoh, mengabaikan konteks atau menganggap formula menggantikan pemikiran.",
    }),
    lesson({
      id: "teknik-uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Strategi menyeluruh ialah membaca, memilih, merancang, menulis dan menyemak secara terkawal. Bahagian A perlu padat serta berpandukan bahan, manakala Bahagian B perlu menunjukkan idea yang relevan, pengembangan matang dan organisasi yang utuh.",
      langkah:
        "Sebelum menulis: baca semua arahan, teliti bahan atau pilihan, analisis TFT dan bina rangka. • Semasa menulis: patuhi format, gunakan ayat sendiri, kembangkan isi dan pantau masa. • Selepas menulis: semak fokus, panjang jawapan, pemerengganan, bahasa, ejaan, tanda baca dan kelengkapan semua bahagian.",
      contoh:
        "Bahagian A membaca: gabungkan maklumat bahan dalam jawapan ringkas yang lengkap. Bahagian B keselamatan siber: pilih soalan yang dikuasai jika pilihan diberikan, bina rangka empat isi, kembangkan dengan I-H-C-P dan akhiri dengan R-C-H.",
      tip: "Pilih soalan berdasarkan kefahaman dan bekalan isi, bukan tajuk yang kelihatan menarik. Patuhi masa, bentuk, pilihan dan panjang jawapan seperti yang dinyatakan pada kertas semasa.",
      kesalahan:
        "Terus menulis, tidak meneliti semua pilihan, menyalin bahan, jawapan pendek tanpa huraian, respons terbuka tanpa rangka, melanggar arahan atau menghantar tanpa semakan.",
    }),
  ],
};
