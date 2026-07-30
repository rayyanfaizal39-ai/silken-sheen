import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-karangan-respons-terbuka";

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

export const bahasaMelayuForm2KaranganResponsTerbukaMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "KARANGAN RESPONS TERBUKA",
  summary:
    "Panduan Tingkatan 2 untuk memahami tugasan, merancang dan mengembangkan idea secara matang serta menghasilkan karangan yang tersusun, relevan dan gramatis.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu Karangan Respons Terbuka?",
      penerangan:
        "Karangan respons terbuka memberikan ruang kepada murid memilih, menyusun dan menghuraikan idea berdasarkan tajuk atau situasi yang diberikan. Jawapan perlu mempunyai pendahuluan, perenggan isi dan penutup yang saling berkaitan serta menepati kehendak soalan.",
      langkah:
        "1. Baca semua arahan • 2. Kenal pasti tema, fokus dan kata tugas • 3. Tentukan pendekatan atau bentuk yang diminta • 4. Rancang isi • 5. Tulis pendahuluan, isi dan penutup • 6. Semak serta tambah baik.",
      contoh:
        "Soalan: Huraikan usaha membudayakan amalan membaca dalam kalangan remaja. Murid bebas memilih usaha yang relevan, tetapi setiap usaha mesti dihuraikan dengan jelas dan kekal pada fokus remaja.",
      tip: "Gunakan kebebasan memilih isi untuk menunjukkan pemikiran sendiri. Pilih isi yang dapat dihuraikan dengan sebab, cara, contoh dan kesan.",
      kesalahan:
        "Menganggap respons terbuka bermaksud boleh menulis apa-apa sahaja, menghasilkan jawapan tanpa struktur, menggunakan karangan hafalan atau menyimpang daripada fokus soalan.",
    }),
    lesson({
      id: "kehendak-soalan",
      label: "Memahami Kehendak Soalan",
      penerangan:
        "Kehendak soalan ialah tugasan sebenar yang mesti dijawab. Murid perlu membezakan tema umum daripada fokus khusus, kemudian mengenal pasti konteks, sasaran, bentuk penulisan dan syarat yang dinyatakan.",
      langkah:
        "1. Baca soalan dua kali • 2. Gariskan kata tugas • 3. Bulatkan tema • 4. Tandakan fokus khusus • 5. Kenal pasti sasaran atau situasi • 6. Periksa bentuk dan syarat • 7. Ungkapkan semula tugasan dengan ayat sendiri.",
      contoh:
        "Soalan: Huraikan usaha membudayakan amalan membaca dalam kalangan remaja. Tema: membaca • Fokus: usaha • Sasaran: remaja. Oleh itu, isi tentang faedah membaca sahaja tidak menjawab kehendak soalan.",
      tip: "Lengkapkan ayat, “Saya perlu menulis tentang … untuk …”. Jika jawapannya masih terlalu umum, teliti fokus soalan semula.",
      kesalahan:
        "Menjawab tema tetapi bukan fokus, mengabaikan sasaran, salah memilih bentuk karangan, tertinggal bahagian arahan atau tidak mematuhi syarat yang dinyatakan.",
    }),
    lesson({
      id: "kata-tugas",
      label: "Mengenal Pasti Kata Tugas",
      penerangan:
        "Kata tugas menentukan cara idea disampaikan. “Huraikan” dan “jelaskan” memerlukan penerangan; “bincangkan” memerlukan kupasan beberapa aspek; “ceritakan” memerlukan urutan peristiwa; manakala “gambarkan” memerlukan pemerian yang jelas.",
      langkah:
        "1. Cari kata kerja arahan • 2. Tentukan tindakan yang diminta • 3. Padankan isi dengan tindakan itu • 4. Pilih susunan yang sesuai • 5. Semak setiap perenggan supaya benar-benar melaksanakan kata tugas.",
      contoh:
        "“Jelaskan kepentingan bersukan” memerlukan sebab dan kesan. “Ceritakan pengalaman menyertai kejohanan” pula memerlukan peristiwa yang disusun secara kronologi. Kedua-duanya tidak boleh dijawab dengan rangka yang sama.",
      tip: "Baca kata tugas bersama-sama fokus, bukan secara berasingan. Maksud tugasan menjadi tepat apabila kedua-duanya digabungkan.",
      kesalahan:
        "Menyamakan semua kata tugas, menulis cerita bagi soalan huraian, memberi senarai tanpa penjelasan atau menyatakan pendapat tanpa alasan dan bukti yang sesuai.",
    }),
    lesson({
      id: "merancang-isi",
      label: "Merancang Isi Karangan",
      penerangan:
        "Rangka membantu murid memilih isi yang berlainan, relevan dan boleh dikembangkan. Susunan yang terancang mengelakkan pengulangan serta memastikan karangan bergerak secara logik daripada pendahuluan hingga penutup.",
      langkah:
        "1. Sumbang sarankan idea • 2. Pilih isi paling tepat • 3. Asingkan isi yang bertindih • 4. Susun mengikut kepentingan, urutan atau kelompok • 5. Catat huraian, contoh dan kesan • 6. Rancang pendahuluan serta penutup • 7. Semak dengan kehendak soalan.",
      contoh:
        "Topik budaya membaca: Pendahuluan—isu amalan membaca • Isi 1—teladan keluarga • Isi 2—program sekolah • Isi 3—akses kepada bahan bercetak dan digital • Penutup—kerjasama membina budaya membaca.",
      tip: "Tulis rangka dalam bentuk kata kunci. Utamakan tiga atau empat isi yang benar-benar dapat dihuraikan daripada banyak isi yang hanya disebut sepintas lalu.",
      kesalahan:
        "Terus menulis tanpa rangka, memilih isi yang sama maksud, menyusun isi secara rawak, merancang terlalu banyak isi atau menggunakan contoh yang tidak sesuai dengan konteks.",
    }),
    lesson({
      id: "pendahuluan",
      label: "Menulis Pendahuluan yang Berkesan",
      penerangan:
        "Pendahuluan memperkenalkan tema, menjelaskan latar isu dan membawa pembaca kepada fokus karangan. Pendahuluan yang berkesan adalah ringkas, relevan dan menyediakan hala tuju tanpa menghuraikan semua isi.",
      langkah:
        "1. Mulakan dengan latar tema • 2. Kaitkan dengan isu atau situasi • 3. Nyatakan fokus karangan • 4. Gunakan ayat gramatis • 5. Semak supaya pembukaan tidak terlalu umum atau panjang.",
      contoh:
        "Amalan membaca menjadi asas pembentukan masyarakat berilmu. Namun begitu, sebahagian remaja masih kurang menjadikan pembacaan sebagai rutin harian. Oleh itu, pelbagai usaha perlu dilaksanakan untuk menyuburkan budaya membaca dalam kalangan mereka.",
      tip: "Gunakan pola latar → isu → fokus. Pilih fakta umum yang munasabah dan elakkan pembukaan berbunga-bunga yang tidak membantu jawapan.",
      kesalahan:
        "Menyalin soalan bulat-bulat, memasukkan semua isi dalam pendahuluan, menggunakan pembukaan terlalu panjang, membuat dakwaan melampau atau tidak menyatakan fokus.",
    }),
    lesson({
      id: "mengembangkan-isi",
      label: "Mengembangkan Isi Secara Matang",
      penerangan:
        "Isi matang tidak berhenti pada satu pernyataan. Murid perlu menghuraikan mengapa dan bagaimana, memberikan contoh yang sesuai, menjelaskan kesan serta menegaskan hubungannya dengan tajuk. Teknik I-H-C-P atau IMBAK boleh digunakan secara fleksibel.",
      langkah:
        "1. Nyatakan isi utama • 2. Huraikan sebab atau maksud • 3. Jelaskan cara pelaksanaan • 4. Berikan contoh khusus • 5. Nyatakan akibat atau kesan • 6. Tegaskan semula kaitan isi • 7. Hubungkan perenggan dengan penanda wacana.",
      contoh:
        "Pihak sekolah boleh memperkasa program membaca. Program seperti sesi membaca berkala dan ulasan buku membimbing murid membaca secara konsisten. Apabila penyertaan dihargai, minat mereka akan meningkat. Jelaslah bahawa program terancang dapat menyuburkan budaya membaca.",
      tip: "Satu perenggan, satu idea utama. Gunakan I-H-C-P: Isi, Huraian, Contoh, Penegasan; atau IMBAK: Isi, Mengapa, Bagaimana, Akibat/Kesan, Kesimpulan kecil.",
      kesalahan:
        "Isi hanya satu ayat, huraian mengulang isi, contoh terlalu umum, beberapa isi bercampur dalam satu perenggan, penanda wacana dipaksa atau kesan tidak berkaitan.",
    }),
    lesson({
      id: "penutup",
      label: "Menulis Penutup yang Mantap",
      penerangan:
        "Penutup merumuskan keseluruhan perbincangan, menegaskan pendirian atau tindakan dan menyatakan harapan yang sesuai. Penutup perlu memberi rasa selesai tanpa memperkenalkan isi baharu.",
      langkah:
        "1. Rumuskan tema • 2. Tegaskan kepentingan atau pendirian • 3. Nyatakan tindakan atau cadangan umum • 4. Berikan harapan yang realistik • 5. Gunakan ungkapan menarik jika benar-benar sesuai • 6. Semak kaitannya dengan fokus.",
      contoh:
        "Kesimpulannya, budaya membaca dalam kalangan remaja memerlukan usaha berterusan daripada keluarga, sekolah dan masyarakat. Semua pihak hendaklah berganding bahu menyediakan galakan serta peluang membaca. Diharapkan generasi berilmu dapat dilahirkan.",
      tip: "Gunakan pola rumusan → penegasan/tindakan → harapan. Pastikan nada penutup sepadan dengan jenis dan tujuan karangan.",
      kesalahan:
        "Memasukkan isi baharu, mengulang pendahuluan bulat-bulat, menamatkan karangan secara tiba-tiba, menggunakan harapan yang tidak realistik atau memaksa peribahasa.",
    }),
    lesson({
      id: "semak-tambah-baik",
      label: "Menyemak dan Menambah Baik Karangan",
      penerangan:
        "Semakan bukan sekadar mencari salah ejaan. Murid perlu menilai ketepatan isi, kematangan huraian, kesinambungan perenggan, variasi ayat, pemilihan kata, tatabahasa, ejaan dan tanda baca.",
      langkah:
        "1. Baca semula kehendak soalan • 2. Semak pendahuluan, setiap isi dan penutup • 3. Tanda isi yang belum dihuraikan • 4. Baiki hubungan idea dan penanda wacana • 5. Pelbagaikan ayat jika perlu • 6. Betulkan bahasa, ejaan dan tanda baca • 7. Pastikan semua syarat dipatuhi.",
      contoh:
        "Sebelum: Sekolah buat program membaca. Program itu bagus. Selepas: Selain itu, pihak sekolah boleh melaksanakan program membaca secara berkala agar murid membina tabiat membaca yang konsisten.",
      tip: "Semak dalam dua pusingan: pertama untuk isi dan organisasi, kedua untuk bahasa serta mekanik penulisan. Baca ayat perlahan-lahan supaya kesalahan mudah dikesan.",
      kesalahan:
        "Menyemak ejaan sahaja, menambah ayat baharu tanpa menilai kaitan, memotong isi penting, membuat pembetulan yang mengubah maksud atau menghantar tanpa semakan akhir.",
    }),
    lesson({
      id: "kesalahan-lazim",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan utama ialah salah fokus, isi umum atau berulang, huraian cetek, contoh tidak relevan, organisasi lemah dan penggunaan bahasa yang tidak tepat. Kesalahan ini menjejaskan kejelasan serta kematangan karangan.",
      langkah:
        "1. Padankan setiap isi dengan fokus • 2. Cari pengulangan • 3. Uji huraian dengan soalan mengapa dan bagaimana • 4. Semak contoh serta kesan • 5. Periksa urutan perenggan • 6. Betulkan tatabahasa, ejaan dan tanda baca.",
      contoh:
        "Lemah: Membaca sangat penting. Membaca banyak faedah. Matang: Membaca memperluas pengetahuan remaja kerana mereka terdedah kepada maklumat daripada pelbagai bidang; pengetahuan ini membantu mereka membuat pertimbangan yang lebih baik.",
      tip: "Gunakan senarai semak: Tepat fokus? Isi berbeza? Huraian lengkap? Contoh sesuai? Perenggan tersusun? Bahasa gramatis?",
      kesalahan:
        "Karangan hafalan, isi terkeluar tajuk, perenggan terlalu pendek, contoh tidak munasabah, ayat terlalu panjang, bahasa percakapan, ungkapan menarik yang salah dan tiada semakan.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "teknik-mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Gunakan urutan FAHAM → RANGKA → TULIS → SEMAK yang telah dipelajari, kemudian gunakan I-H-C-P atau IMBAK untuk mematangkan setiap perenggan isi. Teknik ini ialah panduan berfikir, bukan formula yang mesti ditulis dalam jawapan.",
      langkah:
        "1. FAHAM—tema, fokus, kata tugas dan syarat • 2. RANGKA—pilih serta susun isi • 3. TULIS—pendahuluan, isi matang dan penutup • 4. SEMAK—isi, organisasi dan bahasa • Dalam isi, gunakan I-H-C-P atau IMBAK secara fleksibel.",
      contoh:
        "Soalan usaha membaca: FAHAM—usaha untuk remaja • RANGKA—keluarga, sekolah, akses bahan • TULIS—kembangkan setiap isi dengan contoh dan kesan • SEMAK—pastikan semua perenggan menjawab fokus.",
      tip: "Hafal proses, bukan karangan contoh. Formula membantu mengingat unsur penting, tetapi ayat hendaklah mengalir secara semula jadi.",
      kesalahan:
        "Menulis nama formula dalam karangan, memaksa setiap perenggan mempunyai bilangan ayat sama, menghafal contoh bulat-bulat atau menggunakan teknik tanpa memahami kehendak soalan.",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Dalam UASA, jawapan berkualiti menepati arahan, terancang, matang dan menggunakan bahasa yang tepat. Murid perlu mengurus masa untuk memahami soalan, merangka, menulis serta menyemak mengikut kehendak kertas semasa.",
      langkah:
        "Sebelum: baca pilihan dan pilih soalan yang paling dikuasai jika pilihan diberikan; tandakan kata tugas, fokus dan syarat; bina rangka. • Semasa: tulis pendahuluan tepat, kembangkan satu isi setiap perenggan dan akhiri dengan penutup. • Selepas: semak fokus, isi, bahasa serta semua arahan.",
      contoh:
        "Bagi soalan “Bincangkan cara memupuk semangat kejiranan”, rangka boleh mengandungi aktiviti gotong-royong, kunjung-mengunjungi dan komunikasi digital yang berhemah. Setiap cara dihuraikan dengan pelaksanaan, contoh dan kesan kepada hubungan jiran.",
      tip: "Agihkan masa secara munasabah dan patuhi bentuk serta had yang dinyatakan pada soalan. Jika buntu, kembali kepada kata kunci dalam rangka dan bina huraian melalui mengapa, bagaimana, contoh dan kesan.",
      kesalahan:
        "Memilih soalan kerana tajuknya kelihatan mudah tetapi kekurangan isi, terus menulis tanpa rangka, mengabaikan kata tugas, melanggar syarat, menghabiskan masa pada pendahuluan atau tidak menyemak.",
    }),
  ],
};
