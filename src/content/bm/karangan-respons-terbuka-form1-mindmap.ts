import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-karangan-respons-terbuka";

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

export const bahasaMelayuForm1KaranganResponsTerbukaMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KARANGAN RESPONS TERBUKA",
  summary:
    "Kemahiran memahami soalan, merancang idea dan menghasilkan karangan lengkap yang mempunyai pendahuluan, isi terhuraikan serta penutup yang relevan.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu Karangan Respons Terbuka?",
      penerangan:
        "Karangan respons terbuka ialah penulisan yang memberikan ruang kepada murid memilih, menyusun dan menghuraikan idea berdasarkan tajuk atau situasi yang diberikan. Jawapan perlu menepati arahan, mempunyai struktur lengkap dan menggunakan bahasa yang jelas serta gramatis.",
      langkah:
        "1. Baca arahan • 2. Kenal pasti tema, kata tugas dan fokus • 3. Jana isi • 4. Susun rangka • 5. Tulis pendahuluan, isi dan penutup • 6. Semak jawapan.",
      contoh:
        "Soalan: Jelaskan langkah-langkah menjaga kebersihan sekolah. Jawapan perlu membincangkan tindakan seperti gotong-royong, penggunaan tong sampah dan amalan kitar semula berserta huraian yang sesuai.",
      tip: "Respons terbuka bukan bermaksud menulis apa-apa sahaja. Kebebasan memilih isi tetap perlu dikawal oleh kehendak soalan dan tujuan penulisan.",
      kesalahan:
        "Menulis berdasarkan tema umum tetapi tidak menjawab fokus, menghafal karangan siap, tiada rangka, isi tidak dihuraikan atau struktur karangan tidak lengkap.",
    }),
    lesson({
      id: "kehendak-soalan",
      label: "Cara Memahami Kehendak Soalan",
      penerangan:
        "Kehendak soalan ialah perkara khusus yang perlu dilakukan oleh murid. Fahami siapa yang terlibat, perkara yang perlu dibincangkan, sudut perbincangan dan syarat yang dinyatakan.",
      langkah:
        "1. Baca soalan dua kali • 2. Gariskan kata tugas • 3. Bulatkan tema • 4. Tandakan fokus • 5. Periksa konteks, sasaran dan bahan rangsangan • 6. Ungkapkan semula kehendak soalan dengan ayat sendiri.",
      contoh:
        "“Huraikan kepentingan amalan membaca kepada murid.” Kata tugas: huraikan • Fokus: kepentingan • Tema: amalan membaca • Sasaran: murid. Jawapan perlu menerangkan manfaat, bukan cara memupuk membaca.",
      tip: "Sebelum merangka, lengkapkan ayat: “Saya perlu menulis tentang...” Jika ayat itu masih kabur, baca soalan sekali lagi.",
      kesalahan:
        "Tergesa-gesa memilih isi, mengabaikan sasaran, tidak menggunakan bahan apabila diarahkan, tersalah fokus atau menulis format yang tidak diminta.",
    }),
    lesson({
      id: "kata-kunci",
      label: "Mengenal Pasti Kata Kunci",
      penerangan:
        "Kata kunci menunjukkan tindakan dan batas perbincangan. Kata tugas seperti jelaskan, huraikan, bincangkan, ceritakan dan gambarkan menentukan cara isi dikembangkan.",
      langkah:
        "1. Cari kata tugas • 2. Kenal pasti tema • 3. Tentukan aspek seperti langkah, punca, kesan, faedah atau peranan • 4. Tandakan sasaran • 5. Jadikan kata kunci sebagai tajuk kecil rangka.",
      contoh:
        "“Jelaskan peranan ibu bapa dalam memupuk amalan membaca.” Kata tugas: jelaskan • Aspek: peranan • Pelaku: ibu bapa • Matlamat: memupuk amalan membaca.",
      tip: "Bandingkan kata kunci sebelum memilih isi. “Kepentingan bersukan” memerlukan manfaat, manakala “cara menggalakkan sukan” memerlukan tindakan.",
      kesalahan:
        "Hanya mengenal pasti tema, mengabaikan kata tugas, menukar “punca” kepada “kesan”, mencampurkan beberapa fokus atau menyalin kata kunci tanpa memahaminya.",
    }),
    lesson({
      id: "merancang",
      label: "Merancang Isi Karangan",
      penerangan:
        "Rangka membantu murid memilih isi yang tepat, berlainan dan mudah dihuraikan. Rangka perlu mengandungi pendahuluan, beberapa isi utama dan penutup mengikut kesesuaian tugasan.",
      langkah:
        "1. Jana idea dalam kata kunci • 2. Pilih isi paling relevan • 3. Buang isi berulang • 4. Susun isi secara logik • 5. Catat sebab, cara, contoh atau kesan • 6. Rancang pendahuluan dan penutup.",
      contoh:
        "Langkah menjaga kebersihan sekolah: Pendahuluan — kepentingan kebersihan • Isi 1 — buang sampah dengan betul • Isi 2 — gotong-royong • Isi 3 — kitar semula • Penutup — tanggungjawab bersama.",
      tip: "Pilih isi yang dapat dihuraikan dengan yakin. Rangka cukup dalam bentuk kata kunci; jangan membuang masa menulis ayat penuh sebelum karangan bermula.",
      kesalahan:
        "Merangka isi yang hampir sama, memilih isi di luar fokus, terlalu banyak isi tanpa huraian, menyusun idea secara rawak atau tidak merancang penutup.",
    }),
    lesson({
      id: "pendahuluan",
      label: "Membina Pendahuluan",
      penerangan:
        "Pendahuluan memperkenalkan tema dan membawa pembaca kepada fokus perbincangan. Gunakan urutan Tema, Huraian dan Fokus secara fleksibel.",
      langkah:
        "1. Nyatakan tema • 2. Berikan huraian awal • 3. Kaitkan dengan keadaan atau kepentingan • 4. Tegaskan fokus • 5. Semak supaya pendahuluan tidak terlalu panjang.",
      contoh:
        "Kebersihan sekolah penting untuk mewujudkan suasana pembelajaran yang selesa. Persekitaran yang bersih juga dapat melindungi kesihatan warga sekolah. Oleh itu, beberapa langkah perlu dilaksanakan untuk memastikan kebersihan sekolah sentiasa terpelihara.",
      tip: "Gunakan pendahuluan langsung jika kurang pasti. Pendahuluan yang tepat lebih baik daripada pembukaan berbunga-bunga yang tidak berkaitan.",
      kesalahan:
        "Menyalin soalan bulat-bulat, menggunakan pendahuluan hafalan, memasukkan semua isi, fokus tidak jelas atau pembukaan terlalu panjang.",
    }),
    lesson({
      id: "mengembangkan",
      label: "Mengembangkan Isi",
      penerangan:
        "Isi perlu dikembangkan supaya pembaca memahami idea dengan lengkap. Gunakan unsur IMBAK: Isi, Mengapa, Bagaimana, Akibat atau Kesan dan Kesimpulan kecil mengikut kesesuaian.",
      langkah:
        "1. Nyatakan satu isi utama • 2. Jelaskan mengapa isi itu penting • 3. Terangkan bagaimana dilaksanakan • 4. Berikan contoh • 5. Nyatakan kesan • 6. Tegaskan semula tanpa isi baharu.",
      contoh:
        "Pihak sekolah boleh mengadakan gotong-royong secara berkala. Aktiviti ini membolehkan murid bekerjasama membersihkan kelas, kantin dan kawasan lapang. Hasilnya, sekolah menjadi bersih dan murid belajar dalam keadaan yang lebih selesa.",
      tip: "Satu perenggan perlu membawa satu isi utama. Pilih unsur IMBAK yang membantu tugasan dan jangan menggunakannya secara kaku.",
      kesalahan:
        "Isi hanya disenaraikan, huraian mengulang ayat topik, contoh tidak relevan, terlalu banyak idea dalam satu perenggan atau penanda wacana digunakan secara rawak.",
    }),
    lesson({
      id: "penutup",
      label: "Menulis Penutup",
      penerangan:
        "Penutup merumuskan keseluruhan perbincangan dan boleh mengandungi penegasan, cadangan atau harapan. Penutup perlu kembali kepada fokus tanpa memperkenalkan isi baharu.",
      langkah:
        "1. Rumuskan perbincangan • 2. Tegaskan kepentingan • 3. Berikan cadangan jika sesuai • 4. Nyatakan harapan • 5. Pastikan pengakhiran lengkap.",
      contoh:
        "Kesimpulannya, kebersihan sekolah perlu dipelihara melalui kerjasama seluruh warga sekolah. Setiap pihak hendaklah melaksanakan tanggungjawab masing-masing. Diharapkan agar sekolah sentiasa bersih, sihat dan selesa.",
      tip: "Gunakan formula R-P-H: Rumusan, Penegasan atau cadangan dan Harapan. Sesuaikan bilangan ayat dengan panjang serta tujuan karangan.",
      kesalahan:
        "Tiada penutup, menyalin pendahuluan, mengulang semua isi, memasukkan isi baharu atau memberikan harapan yang tidak berkaitan.",
    }),
    lesson({
      id: "menyemak",
      label: "Menyemak Semula Karangan",
      penerangan:
        "Semakan memastikan jawapan menepati arahan serta bebas daripada kesalahan yang mudah dikesan. Semak Isi, Bahasa dan Susunan menggunakan I-B-S.",
      langkah:
        "1. Semak kehendak soalan • 2. Periksa setiap isi • 3. Cari pengulangan • 4. Semak subjek dan predikat • 5. Betulkan ejaan dan tanda baca • 6. Semak perenggan serta penanda wacana • 7. Periksa semua syarat.",
      contoh:
        "Isi: adakah semua perenggan membincangkan langkah? • Bahasa: adakah “di sekolah” dipisahkan dan ayat lengkap? • Susunan: adakah pendahuluan, isi dan penutup tersusun?",
      tip: "Baca ayat perlahan-lahan. Semak satu perkara pada satu masa supaya kesalahan isi, bahasa dan susunan lebih mudah ditemukan.",
      kesalahan:
        "Hanya mengira perkataan, membaca terlalu cepat, membetulkan ejaan tetapi mengabaikan fokus, menambah isi baharu ketika semakan atau tidak menyimpan masa untuk menyemak.",
    }),
    lesson({
      id: "kesalahan",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan respons terbuka biasanya berpunca daripada salah memahami soalan, perancangan lemah, isi tidak berkembang dan bahasa tidak disemak.",
      langkah:
        "1. Bandingkan jawapan dengan kata kunci • 2. Tandakan isi utama • 3. Semak huraian dan contoh • 4. Periksa pembahagian perenggan • 5. Potong pengulangan • 6. Betulkan bahasa.",
      contoh:
        "Tersasar: soalan meminta kepentingan membaca tetapi jawapan menerangkan cara membaca. Lemah: Murid perlu membaca buku. Lebih baik: Murid perlu membaca kerana amalan ini menambahkan ilmu dan memperluas kosa kata.",
      tip: "Gunakan senarai semak: tepat fokus, isi berlainan, huraian lengkap, contoh relevan, perenggan tersusun, bahasa baku dan penutup lengkap.",
      kesalahan:
        "Isi tersasar, karangan hafalan, tiada rangka, isi berulang, ayat tergantung, bahasa pasar, tiada perenggan, penanda wacana salah, tiada penutup dan tiada semakan.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Gunakan proses FAHAM → RANGKA → TULIS → SEMAK. Untuk isi, gunakan IMBAK. Untuk semakan, gunakan I-B-S. Semua teknik membantu proses berfikir dan bukan ayat hafalan.",
      langkah:
        "1. FAHAM kata tugas dan fokus • 2. RANGKA isi berlainan • 3. TULIS pendahuluan, perenggan IMBAK dan penutup • 4. SEMAK isi, bahasa dan susunan.",
      contoh:
        "Soalan kepentingan bersukan: FAHAM — bincang manfaat • RANGKA — kesihatan, disiplin, kerjasama • TULIS — huraikan setiap isi • SEMAK — pastikan tiada langkah atau punca yang tersasar.",
      tip: "Hafal fungsi setiap teknik, bukan karangan contoh. Sesuaikan jumlah isi dan huraian dengan arahan serta masa yang tersedia.",
      kesalahan:
        "Menulis nama formula dalam jawapan, memaksa semua unsur IMBAK, menghafal contoh bulat-bulat atau mengutamakan formula sehingga bahasa menjadi kaku.",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Dalam UASA, jawapan yang baik menepati arahan, mempunyai isi yang jelas dan terhuraikan, menggunakan bahasa baku serta disusun supaya mudah dibaca.",
      langkah:
        "Sebelum: baca dua kali, tandakan kata kunci dan bina rangka. • Semasa: tulis pendahuluan tepat, kembangkan satu isi bagi setiap perenggan dan lengkapkan penutup. • Selepas: semak I-B-S serta semua syarat soalan.",
      contoh:
        "Soalan peranan ibu bapa memupuk membaca: Pendahuluan — kepentingan membaca • Isi — menyediakan bahan, menjadi teladan, membawa anak ke perpustakaan • Penutup — kerjasama melahirkan budaya membaca.",
      tip: "Agihkan masa untuk memahami, merangka, menulis dan menyemak. Utamakan ketepatan serta huraian berbanding karangan panjang yang mengulang isi.",
      kesalahan:
        "Terus menulis tanpa analisis, salah kata tugas, isi terlalu umum, tidak memberikan contoh, seluruh karangan satu perenggan, penggunaan ungkapan dipaksa atau jawapan tidak sempat disemak.",
    }),
  ],
};
