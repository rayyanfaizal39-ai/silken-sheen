import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f1-mengedit-menyemak-karangan";

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

export const bahasaMelayuForm1MengeditMenyemakKaranganMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "MENGEDIT DAN MENYEMAK KARANGAN",
  summary:
    "Panduan praktikal menyemak isi, bahasa dan susunan karangan supaya jawapan lebih tepat, jelas, gramatis serta kemas sebelum dihantar.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu Mengedit dan Menyemak?",
      penerangan:
        "Menyemak ialah membaca semula karangan untuk mengesan kelemahan. Mengedit ialah membetulkan kelemahan itu pada isi, bahasa atau susunan tanpa mengubah tujuan asal karangan.",
      langkah:
        "1. Berhenti seketika selepas menulis • 2. Baca semula soalan • 3. Baca keseluruhan karangan • 4. Tandakan bahagian yang lemah • 5. Buat pembetulan dengan kemas • 6. Baca sekali lagi.",
      contoh:
        "Sebelum: Murid menjaga kebersihan sekolah kerana sekolah akan bersih. Selepas: Murid hendaklah membuang sampah ke dalam tong supaya persekitaran sekolah sentiasa bersih dan selesa.",
      tip: "Semak satu perkara pada satu masa. Cara ini lebih berkesan daripada cuba mencari semua jenis kesalahan serentak.",
      kesalahan:
        "Membaca sepintas lalu, hanya mencari salah ejaan, menukar ayat yang sudah betul atau menulis semula seluruh karangan sehingga masa terbuang.",
    }),
    lesson({
      id: "kepentingan",
      label: "Kepentingan Mengedit Karangan",
      penerangan:
        "Pengeditan memastikan jawapan menepati kehendak soalan, isi mudah difahami, bahasa lebih tepat dan karangan tersusun. Kesalahan kecil yang dikesan awal dapat dibetulkan sebelum jawapan dihantar.",
      langkah:
        "1. Pastikan fokus dijawab • 2. Semak kecukupan huraian • 3. Betulkan bahasa • 4. Susun idea dengan jelas • 5. Periksa syarat soalan • 6. Kemas kini jawapan.",
      contoh:
        "Soalan meminta kepentingan bersukan. Semakan mengesan satu perenggan yang menerangkan cara bersukan; perenggan itu perlu dilaraskan supaya menerangkan manfaat bersukan.",
      tip: "Anggap semakan sebagai bahagian wajib dalam proses FAHAM → RANGKA → TULIS → SEMAK, bukan kerja tambahan selepas karangan siap.",
      kesalahan:
        "Menganggap karangan pertama sudah sempurna, mengutamakan panjang semata-mata, tidak membandingkan jawapan dengan soalan atau meninggalkan pembetulan yang mudah.",
    }),
    lesson({
      id: "tatabahasa",
      label: "Menyemak Tatabahasa",
      penerangan:
        "Semakan tatabahasa meliputi binaan ayat, penggunaan imbuhan, kata sendi nama, kata ganti nama dan pemilihan kata baku. Ayat perlu mempunyai hubungan subjek dan predikat yang jelas.",
      langkah:
        "1. Cari subjek dan predikat • 2. Semak imbuhan • 3. Periksa kata sendi nama • 4. Pastikan kata ganti nama sesuai • 5. Gunakan bentuk baku • 6. Baca ayat untuk menguji makna.",
      contoh:
        "Salah: Para murid-murid perlu menjaga akan kebersihan. Betul: Para murid perlu menjaga kebersihan. Betul juga: Murid-murid perlu menjaga kebersihan.",
      tip: "Gariskan bahagian yang meragukan dan periksa berdasarkan aturan yang telah dipelajari. Utamakan ayat mudah yang tepat dan jelas.",
      kesalahan:
        "Menggunakan penanda jamak dua kali, salah imbuhan, mencampurkan bahasa pasar, menggunakan kata sendi secara tidak tepat atau membetulkan ayat mengikut bunyi semata-mata.",
    }),
    lesson({
      id: "ejaan",
      label: "Menyemak Ejaan",
      penerangan:
        "Ejaan yang betul menjadikan karangan kemas dan mudah dibaca. Berikan perhatian kepada huruf besar, kata nama khas, kata majmuk serta bentuk “di” dan “ke”.",
      langkah:
        "1. Baca perkataan demi perkataan • 2. Semak huruf besar • 3. Periksa nama khas • 4. Bezakan kata sendi dengan imbuhan • 5. Semak tanda sempang • 6. Betulkan ejaan yang pasti.",
      contoh:
        "Kata sendi ditulis terpisah: di sekolah, ke kantin. Imbuhan ditulis rapat: dibersihkan, ketiga. Nama khas menggunakan huruf besar: Sekolah Menengah Seri Murni.",
      tip: "Jejaki setiap baris dengan hujung pen atau jari supaya mata tidak melangkau perkataan yang pendek.",
      kesalahan:
        "Menulis “disekolah” atau “di bersihkan”, mengabaikan huruf besar, mengeja mengikut sebutan harian dan membuat singkatan seperti “yg” atau “utk”.",
    }),
    lesson({
      id: "tanda-baca",
      label: "Menyemak Tanda Baca",
      penerangan:
        "Tanda baca memisahkan idea dan membantu pembaca memahami nada serta maksud ayat. Tanda noktah, koma, soal, seru dan petik perlu digunakan mengikut fungsi.",
      langkah:
        "1. Pastikan setiap ayat berakhir • 2. Letakkan noktah pada ayat penyata • 3. Gunakan koma untuk jeda yang perlu • 4. Semak ayat tanya dan dialog • 5. Padankan tanda petik • 6. Buang tanda yang berlebihan.",
      contoh:
        "Sebelum: Pada hari Sabtu kami menyapu kelas mengelap tingkap dan menyusun meja. Selepas: Pada hari Sabtu, kami menyapu kelas, mengelap tingkap dan menyusun meja.",
      tip: "Baca perlahan dan berhenti pada setiap noktah. Jika ayat terlalu panjang tanpa hentian, pertimbangkan untuk memecahkannya.",
      kesalahan:
        "Tiada noktah, koma diletakkan antara subjek dengan predikat, tanda seru digunakan berulang kali atau tanda petik dialog tidak lengkap.",
    }),
    lesson({
      id: "struktur-ayat",
      label: "Menyemak Struktur Ayat",
      penerangan:
        "Ayat yang baik lengkap, jelas dan tidak berbelit-belit. Setiap ayat perlu menyampaikan maksud yang dapat difahami serta berkaitan dengan ayat sebelum dan selepasnya.",
      langkah:
        "1. Kenal pasti idea utama ayat • 2. Pastikan subjek dan predikat lengkap • 3. Betulkan ayat tergantung • 4. Pecahkan ayat terlalu panjang • 5. Buang pengulangan • 6. Susun perkataan secara jelas.",
      contoh:
        "Lemah: Kerana dapat menyihatkan badan. Lebih baik: Aktiviti bersukan penting kerana dapat menyihatkan badan. Panjang: Kami membersihkan kelas dan kami menyusun meja dan kami mengelap tingkap. Lebih baik: Kami membersihkan kelas, menyusun meja dan mengelap tingkap.",
      tip: "Baca ayat secara bersuara perlahan. Jika maksud sukar difahami dalam sekali bacaan, ringkaskan atau susun semula ayat itu.",
      kesalahan:
        "Ayat tergantung, subjek tidak jelas, terlalu banyak kata hubung, terjemahan langsung daripada bahasa lain atau satu ayat memuatkan terlalu banyak idea.",
    }),
    lesson({
      id: "perenggan",
      label: "Menyemak Perenggan",
      penerangan:
        "Perenggan mengumpulkan ayat yang membincangkan satu isi utama. Perenggan isi lazimnya mempunyai ayat topik, huraian, contoh atau kesan dan penegasan kecil mengikut keperluan.",
      langkah:
        "1. Tandakan isi utama setiap perenggan • 2. Pastikan satu perenggan satu isi • 3. Semak huraian dan contoh • 4. Pisahkan idea baharu • 5. Periksa urutan perenggan • 6. Gunakan penanda wacana yang sesuai.",
      contoh:
        "Perenggan tentang gotong-royong perlu menerangkan cara pelaksanaan dan kesannya. Idea tentang kitar semula yang berlainan hendaklah dimulakan dalam perenggan baharu.",
      tip: "Tulis satu kata kunci di sisi setiap perenggan. Jika dua perenggan mempunyai kata kunci yang sama, semak sama ada isi itu berulang.",
      kesalahan:
        "Seluruh karangan ditulis dalam satu perenggan, satu perenggan memuatkan banyak isi, huraian tersasar, perenggan terlalu pendek atau penanda wacana dipaksa.",
    }),
    lesson({
      id: "keseluruhan-isi",
      label: "Menyemak Keseluruhan Isi",
      penerangan:
        "Semakan keseluruhan menilai sama ada semua idea menjawab soalan, tersusun dan berkembang dengan mencukupi. Pendahuluan, isi dan penutup perlu membawa fokus yang sama.",
      langkah:
        "1. Baca semula kata tugas dan fokus • 2. Padankan setiap isi dengan soalan • 3. Buang isi tersasar • 4. Semak pengulangan • 5. Pastikan huraian dan contoh relevan • 6. Selaraskan pendahuluan dengan penutup.",
      contoh:
        "Jika soalan meminta langkah menjaga alam sekitar, isi “alam sekitar sangat indah” belum menjawab soalan. Ubah kepada tindakan seperti mengasingkan sisa untuk dikitar semula, kemudian huraikan caranya.",
      tip: "Tanya tiga soalan pada setiap isi: Adakah isi ini menjawab tugasan? Adakah isi ini berlainan? Adakah pembaca memahami sebab, cara atau kesannya?",
      kesalahan:
        "Isi di luar tajuk, isi berulang dengan perkataan berbeza, contoh tidak menyokong isi, huraian terlalu umum atau penutup bercanggah dengan perbincangan.",
    }),
    lesson({
      id: "senarai-semak",
      label: "Senarai Semak Sebelum Menghantar",
      penerangan:
        "Senarai semak membantu murid membuat pemeriksaan akhir secara teratur. Gunakan lima bahagian: kehendak soalan, isi, bahasa, susunan dan syarat jawapan.",
      langkah:
        "1. Kehendak: kata tugas dan fokus tepat • 2. Isi: relevan, berlainan dan dihuraikan • 3. Bahasa: tatabahasa, ejaan serta tanda baca betul • 4. Susunan: perenggan teratur • 5. Syarat: format dan arahan dipatuhi.",
      contoh:
        "✓ Menjawab fokus • ✓ Pendahuluan berkaitan • ✓ Setiap isi dihuraikan • ✓ Tiada isi berulang • ✓ Ayat lengkap • ✓ Ejaan dan tanda baca disemak • ✓ Penutup lengkap • ✓ Semua arahan dipatuhi.",
      tip: "Gerakkan pen atau jari pada setiap perkara dan tandakan hanya selepas semakan dibuat. Beri perhatian tambahan kepada kesalahan yang kerap anda lakukan.",
      kesalahan:
        "Menanda senarai tanpa membaca karangan, hanya memeriksa bilangan perenggan, mengabaikan syarat soalan atau berhenti selepas menemukan satu kesalahan.",
    }),
    lesson({
      id: "kesalahan-lazim",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan semasa menyemak biasanya berlaku kerana murid tergesa-gesa, tidak menggunakan urutan semakan atau mengubah jawapan tanpa sebab yang kukuh.",
      langkah:
        "1. Kenal pasti tabiat kesalahan sendiri • 2. Semak mengikut I-B-S • 3. Bulatkan kesalahan • 4. Potong sekali dengan kemas • 5. Tulis pembetulan yang jelas • 6. Baca ayat yang telah dibaiki.",
      contoh:
        "Tidak berkesan: membaca laju dan hanya membetulkan satu ejaan. Berkesan: semak fokus dan isi dahulu, kemudian bahasa, seterusnya susunan serta syarat jawapan.",
      tip: "Buat pembetulan yang perlu sahaja. Pastikan tulisan baharu boleh dibaca dan maksud ayat tidak berubah secara tidak sengaja.",
      kesalahan:
        "Tiada masa untuk menyemak, memadam hingga tulisan kabur, menambah isi baharu pada saat akhir, membetulkan jawapan betul menjadi salah atau tidak membaca semula selepas pembetulan.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "teknik-mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Gunakan I-B-S untuk semakan utama: Isi, Bahasa dan Susunan. Teknik S-E-M-A-K pula membantu mengingat butiran: Soalan dan susunan, Ejaan, Maksud dan isi, Ayat dan tatabahasa, serta Kemas tanda baca dan perenggan.",
      langkah:
        "1. I—semak isi dan fokus • 2. B—semak bahasa • 3. S—semak susunan • 4. Gunakan S-E-M-A-K sebagai panduan terperinci • 5. Ulang baca bahagian yang dibetulkan.",
      contoh:
        "I: semua isi membincangkan kepentingan • B: “di sekolah” dan imbuhan betul • S: pendahuluan, isi dan penutup tersusun • S-E-M-A-K: periksa semula ayat serta kekemasan.",
      tip: "Ingat fungsi huruf, bukan sekadar nama teknik. Gunakan teknik secara fleksibel mengikut kesalahan yang paling kerap anda lakukan.",
      kesalahan:
        "Menulis singkatan teknik dalam karangan, menghafal tanpa melakukan semakan, memeriksa bahasa sahaja atau terlalu lama pada satu perkataan hingga bahagian lain tidak disemak.",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Dalam UASA, sediakan ruang masa untuk semakan selepas karangan siap. Utamakan ketepatan kehendak, kejelasan isi, bahasa baku, pemerengganan dan pematuhan semua arahan.",
      langkah:
        "Sebelum menulis: fahami soalan dan rancang isi. • Semasa menulis: bina ayat jelas dan perenggan teratur. • Selepas menulis: semak I-B-S, ejaan, tanda baca, syarat soalan dan kekemasan pembetulan.",
      contoh:
        "Soalan meminta faedah membaca. Semakan UASA: semua isi menerangkan faedah, setiap isi mempunyai huraian atau contoh, ayat lengkap, penutup merumuskan tajuk dan arahan soalan dipatuhi.",
      tip: "Jangan menunggu sehingga saat akhir untuk mula menyemak. Jika masa terhad, dahulukan fokus soalan dan isi, kemudian kesalahan bahasa yang jelas serta susunan jawapan.",
      kesalahan:
        "Terus menghantar selepas menulis, hanya mengira perkataan, menambah perenggan baharu tanpa semakan, membuat pembetulan tidak kemas atau mengabaikan arahan khusus pada soalan.",
    }),
  ],
};
