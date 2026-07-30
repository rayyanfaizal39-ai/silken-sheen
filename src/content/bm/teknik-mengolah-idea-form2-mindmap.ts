import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-teknik-mengolah-idea";

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

export const bahasaMelayuForm2TeknikMengolahIdeaMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "TEKNIK MENGOLAH IDEA",
  summary:
    "Panduan Tingkatan 2 untuk memilih, mengembangkan, menyusun dan menghubungkan idea supaya karangan mempunyai aliran yang jelas, matang serta menarik.",
  children: [
    lesson({
      id: "apa-itu",
      label: "Apa Itu Mengolah Idea?",
      penerangan:
        "Mengolah idea ialah proses menukar kata kunci atau fikiran awal menjadi isi yang jelas, terhuraikan dan tersusun. Proses ini melibatkan pemilihan idea utama, huraian, contoh, hubungan antara idea dan penegasan.",
      langkah:
        "1. Fahami kehendak soalan • 2. Jana beberapa idea • 3. Pilih idea yang relevan • 4. Kembangkan setiap idea • 5. Susun mengikut urutan • 6. Hubungkan idea • 7. Semak keseluruhan aliran.",
      contoh:
        "Kata kunci: membaca. Idea terolah: Amalan membaca memperluas pengetahuan kerana murid memperoleh maklumat tentang pelbagai bidang. Contohnya, buku sains dan sejarah membantu mereka memahami dunia dengan lebih luas.",
      tip: "Mulakan dengan rangka kata kunci. Jangan terus membina ayat panjang sebelum menentukan fungsi setiap idea dalam karangan.",
      kesalahan:
        "Menyalin kata kunci sebagai ayat, menulis apa-apa idea yang terlintas, mencampurkan beberapa fokus atau menganggap idea yang panjang semestinya matang.",
    }),
    lesson({
      id: "kepentingan",
      label: "Kepentingan Mengolah Idea",
      penerangan:
        "Pengolahan idea menjadikan karangan mudah diikuti, mengelakkan pengulangan dan membantu setiap perenggan menyumbang kepada fokus. Idea yang tersusun juga membolehkan huraian serta contoh digunakan dengan berkesan.",
      langkah:
        "1. Tetapkan fokus • 2. Bezakan isi • 3. Tentukan tujuan setiap perenggan • 4. Sediakan sokongan • 5. Susun hubungan • 6. Nilai sama ada pembaca dapat mengikuti hujah.",
      contoh:
        "Tanpa olahan: Kebersihan penting. Kita perlu bersih. Sekolah mesti bersih. Dengan olahan: Kebersihan sekolah menjamin keselesaan, melindungi kesihatan dan memupuk sikap bertanggungjawab dalam kalangan murid.",
      tip: "Tulis satu label ringkas bagi setiap perenggan. Jika dua label membawa maksud sama, gabungkan atau gantikan salah satu isi.",
      kesalahan:
        "Isi bertindih, semua idea diberi penekanan yang sama, huraian tidak menyokong isi atau urutan karangan berubah tanpa sebab.",
    }),
    lesson({
      id: "idea-utama",
      label: "Mengenal Pasti Idea Utama",
      penerangan:
        "Idea utama ialah isi teras yang menjawab kata tugas dan fokus soalan. Idea ini perlu cukup khusus untuk dihuraikan tetapi tidak terlalu sempit sehingga sukar disokong.",
      langkah:
        "1. Gariskan kata tugas • 2. Bulatkan tema • 3. Tentukan fokus seperti punca, langkah, kesan atau kepentingan • 4. Senaraikan idea • 5. Pilih idea berlainan • 6. Uji kaitannya dengan soalan.",
      contoh:
        "Soalan: Huraikan kepentingan amalan membaca kepada murid. Idea utama yang tepat: menambahkan ilmu, memperluas kosa kata dan mengisi masa lapang. “Membeli buku” ialah langkah, bukan kepentingan.",
      tip: "Lengkapkan ayat “Isi ini menjawab soalan kerana…”. Jika jawapannya kabur, idea itu mungkin terlalu umum atau tersasar.",
      kesalahan:
        "Hanya mengenal pasti tema, salah memahami kata tugas, memilih contoh sebagai isi utama, mengulang idea dengan perkataan lain atau mengambil isi di luar skop.",
    }),
    lesson({
      id: "mengembangkan",
      label: "Mengembangkan Idea",
      penerangan:
        "Idea dikembangkan dengan menerangkan sebab, cara, contoh dan kesan. Gunakan I-H-C-P secara fleksibel: Isi, Huraian, Contoh dan Penegasan.",
      langkah:
        "1. Nyatakan isi • 2. Tanya mengapa • 3. Jelaskan bagaimana • 4. Berikan contoh • 5. Nyatakan kesan • 6. Tegaskan semula idea • 7. Pastikan semua ayat kekal pada satu fokus.",
      contoh:
        "Isi: Aktiviti gotong-royong memupuk kerjasama. Huraian: Murid perlu membahagikan tugas dan saling membantu. Contoh: Mereka membersihkan kelas secara berkumpulan. Penegasan: Jelaslah bahawa gotong-royong mengeratkan hubungan.",
      tip: "Pilih unsur yang membantu isi; tidak semua perenggan perlu mempunyai bilangan ayat yang sama. Huraian logik lebih penting daripada formula yang kaku.",
      kesalahan:
        "Mengulang ayat isi sebagai huraian, memberi contoh tanpa penjelasan, kesan tidak logik atau memasukkan isi baharu di tengah-tengah perenggan.",
    }),
    lesson({
      id: "susunan-logik",
      label: "Menyusun Idea Secara Logik",
      penerangan:
        "Susunan logik menempatkan idea mengikut hubungan yang mudah difahami, seperti umum kepada khusus, sebab kepada kesan, masalah kepada penyelesaian, langkah mengikut urutan atau isi kurang penting kepada lebih penting.",
      langkah:
        "1. Senaraikan isi • 2. Kenal pasti hubungan • 3. Pilih pola susunan • 4. Nomborkan isi • 5. Letakkan idea sokongan di bawah isi • 6. Periksa peralihan • 7. Ubah urutan jika aliran terputus.",
      contoh:
        "Tajuk menjaga alam sekitar: masalah pencemaran → mengurangkan plastik → mengitar semula → menanam pokok → kesan persekitaran lebih bersih. Bagi karangan proses, susun tindakan mengikut urutan pelaksanaan.",
      tip: "Pilih satu pola utama mengikut soalan. Jangan menyusun isi hanya berdasarkan urutan idea yang terlintas.",
      kesalahan:
        "Kesan ditulis sebelum sebab tanpa penjelasan, langkah bercampur, isi melompat-lompat, idea utama diletakkan selepas contoh atau pola susunan berubah secara tiba-tiba.",
    }),
    lesson({
      id: "penanda-wacana",
      label: "Menghubungkan Idea dengan Penanda Wacana",
      penerangan:
        "Penanda wacana menunjukkan hubungan antara ayat dan perenggan. Pilih penanda mengikut fungsi seperti menambah idea, menerangkan sebab, memberi contoh, menunjukkan kesan, membuat pertentangan atau merumuskan.",
      langkah:
        "1. Tentukan hubungan idea • 2. Pilih penanda yang sepadan • 3. Letakkan pada bahagian sesuai • 4. Bina ayat lengkap • 5. Pelbagaikan secara sederhana • 6. Baca peralihan • 7. Buang penanda yang tidak diperlukan.",
      contoh:
        "Menambah: Selain itu, murid dapat memperluas kosa kata. Sebab: Hal ini demikian kerana mereka menemui perkataan baharu. Contoh: Sebagai contoh, murid boleh membaca novel. Kesan: Kesannya, penulisan menjadi lebih matang.",
      tip: "Hubungan makna perlu wujud sebelum penanda wacana dipilih. Penanda yang tepat lebih penting daripada penanda yang kelihatan menarik.",
      kesalahan:
        "Menggunakan “selain itu” untuk sebab, mengulang penanda yang sama, memulakan setiap ayat dengan penanda, menggunakan penanda tanpa kaitan atau memasukkan terlalu banyak penanda.",
    }),
    lesson({
      id: "contoh",
      label: "Menyokong Idea dengan Contoh",
      penerangan:
        "Contoh menjadikan idea lebih khusus dan meyakinkan. Contoh perlu munasabah, berkaitan terus dengan isi dan dekat dengan situasi yang dibincangkan.",
      langkah:
        "1. Kenal pasti isi yang perlu dijelaskan • 2. Pilih situasi relevan • 3. Tentukan pelaku atau tindakan • 4. Gunakan penanda contoh • 5. Bina ayat lengkap • 6. Hubungkan dengan kesan atau penegasan.",
      contoh:
        "Idea: Teknologi membantu pembelajaran. Contoh: Sebagai contoh, murid boleh menggunakan platform pembelajaran untuk mengulang kaji video penerangan dan latihan dari rumah.",
      tip: "Satu contoh yang jelas lebih baik daripada senarai panjang. Pastikan contoh menunjukkan bagaimana isi berlaku atau dilaksanakan.",
      kesalahan:
        "Contoh terlalu umum, fakta tidak pasti, contoh membawa isi baharu, senarai tanpa huraian atau contoh bercanggah dengan idea utama.",
    }),
    lesson({
      id: "kesalahan-lazim",
      label: "Kesalahan Lazim",
      penerangan:
        "Kesalahan pengolahan idea berlaku apabila fokus kabur, isi berulang, susunan tidak logik, huraian cetek, contoh tidak relevan atau hubungan antara perenggan terputus.",
      langkah:
        "1. Bandingkan setiap isi dengan soalan • 2. Labelkan idea utama • 3. Cari pengulangan • 4. Semak huraian dan contoh • 5. Periksa urutan • 6. Betulkan penanda wacana • 7. Baca keseluruhan karangan.",
      contoh:
        "Berulang: Bersukan menyihatkan badan. Sukan menjadikan tubuh sihat. Dibaiki: Kekalkan satu isi tentang kesihatan, kemudian gunakan isi berlainan seperti disiplin atau kerjasama.",
      tip: "Gunakan ujian tiga soalan: Adakah idea tepat? Adakah idea berlainan? Adakah idea dihuraikan dan disokong?",
      kesalahan:
        "Salah fokus, isi bertindih, huraian mengulang, contoh tersasar, penanda wacana salah, perenggan bercampur dan kesimpulan memperkenalkan idea baharu.",
      kesalahanLabel: "Jenis Kesalahan",
    }),
    lesson({
      id: "teknik-mengingat",
      label: "Teknik Mengingat",
      penerangan:
        "Gunakan teknik J-A-L-I-N: Jawab fokus, Ambil idea utama, Lengkapkan huraian, Ikat dengan penanda wacana dan Nyatakan contoh atau penegasan.",
      langkah:
        "1. J—semak kehendak soalan • 2. A—pilih isi berlainan • 3. L—huraikan sebab, cara atau kesan • 4. I—hubungkan idea • 5. N—sokong dengan contoh dan tegaskan.",
      contoh:
        "J: kepentingan membaca • A: menambah ilmu • L: memperoleh maklumat • I: Hal ini demikian kerana… • N: buku sains sebagai contoh; tegasnya, membaca meluaskan pengetahuan.",
      tip: "Ingat fungsi setiap huruf dan gunakan sebagai senarai semak rangka. Teknik ini membimbing pemikiran, bukan ayat yang perlu ditulis dalam karangan.",
      kesalahan:
        "Menulis singkatan J-A-L-I-N dalam jawapan, menghafal contoh, memaksa semua ayat mengikut pola sama atau menggunakan teknik tanpa membaca soalan.",
    }),
    lesson({
      id: "uasa",
      label: "Teknik Menjawab UASA",
      penerangan:
        "Dalam UASA, idea mesti menepati kata tugas, disusun dalam rangka dan dikembangkan menjadi perenggan yang koheren. Bahasa gramatis, penanda wacana tepat dan contoh relevan menyokong pengolahan yang baik.",
      langkah:
        "Sebelum: baca soalan, tandakan fokus dan bina rangka J-A-L-I-N. • Semasa: satu isi bagi satu perenggan, huraikan dan beri contoh. • Selepas: semak fokus, urutan, pengulangan, hubungan idea dan bahasa.",
      contoh:
        "Soalan faedah membaca: Pendahuluan tema → ilmu → kosa kata → pengisian masa → penutup. Setiap isi dihuraikan dengan sebab atau cara, contoh bahan bacaan dan kesan yang berkaitan.",
      tip: "Utamakan beberapa isi yang dapat dihuraikan dengan matang. Jangan menambah isi lemah semata-mata untuk memanjangkan karangan.",
      kesalahan:
        "Terus menulis tanpa rangka, salah kata tugas, terlalu banyak isi, tiada contoh, penanda wacana dipaksa, urutan idea lemah atau tidak menyemak jawapan.",
    }),
  ],
};
