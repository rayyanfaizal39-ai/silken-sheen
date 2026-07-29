import type { MindNode } from "@/components/MindMap";

type PepatahEntry = {
  id: string;
  label: string;
  maksud: string;
  huraian: string;
  contohAyat: string;
  situasi: string;
  kesalahan: string;
  berkaitan?: string;
};

const PREFIX = "bm-f3-pepatah";

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

function pepatah(entry: PepatahEntry): MindNode {
  return branch(`senarai-${entry.id}`, entry.label, [
    node(`senarai-${entry.id}-maksud`, "Maksud", entry.maksud),
    node(`senarai-${entry.id}-huraian`, "Huraian Ringkas", entry.huraian),
    node(`senarai-${entry.id}-contoh`, "Contoh Ayat", entry.contohAyat),
    node(`senarai-${entry.id}-situasi`, "Situasi Penggunaan", entry.situasi),
    node(`senarai-${entry.id}-kesalahan`, "Kesalahan Lazim", entry.kesalahan),
    ...(entry.berkaitan
      ? [node(`senarai-${entry.id}-berkaitan`, "Pepatah Berkaitan", entry.berkaitan)]
      : []),
  ]);
}

const pepatahEntries: PepatahEntry[] = [
  {
    id: "alah-bisa-tegal-biasa",
    label: "Alah bisa tegal biasa",
    maksud:
      "Perkara yang sukar atau menyakitkan akan menjadi mudah apabila dilakukan berulang kali.",
    huraian:
      "Latihan dan pengalaman membolehkan seseorang menyesuaikan diri serta mengatasi kesukaran.",
    contohAyat:
      "Pada mulanya Parjo berasa malu apabila digelar “Parjo Tapai”, tetapi lama-kelamaan dia dapat menerimanya kerana alah bisa tegal biasa.",
    situasi:
      "Tugas baharu yang semakin mudah • Murid semakin mahir selepas kerap berlatih • Penyesuaian diri dalam keadaan mencabar",
    kesalahan:
      "Jangan tafsirkan “bisa” sebagai racun semata-mata atau gunakan pepatah ini untuk kejayaan tanpa latihan dan pembiasaan.",
    berkaitan:
      "Genggam bara api biar sampai jadi arang — kedua-duanya menekankan ketabahan, tetapi pepatah ini lebih berfokus pada pembiasaan.",
  },
  {
    id: "bapa-borek-anak-rintik",
    label: "Bapa borek anak rintik",
    maksud: "Anak lazimnya mewarisi atau meniru sifat, perangai atau bakat bapanya.",
    huraian:
      "Persamaan antara anak dengan bapanya dapat dilihat pada kebolehan, sikap atau tingkah laku.",
    contohAyat:
      "Syahir mewarisi bakat bermain badminton daripada ayahnya; benarlah kata pepatah, bapa borek anak rintik.",
    situasi:
      "Anak mewarisi bakat ibu bapa • Tingkah laku anak menyerupai ibu bapa • Anak meneruskan kemahiran keluarga",
    kesalahan:
      "Gunakan bentuk “bapa borek anak rintik”. Jangan hadkan penggunaannya kepada persamaan rupa fizikal sahaja.",
    berkaitan:
      "Bagaimana acuan, begitulah kuihnya — pepatah ini menekankan sifat atau bakat yang diwarisi, manakala pepatah berkaitan menekankan didikan dan teladan.",
  },
  {
    id: "pecahkan-ruyung",
    label: "Kalau tidak dipecahkan ruyung, manakan dapat sagunya",
    maksud: "Kejayaan tidak akan diperoleh tanpa usaha dan pengorbanan.",
    huraian:
      "Seseorang perlu berusaha menghadapi kesukaran terlebih dahulu sebelum memperoleh hasil yang diingini.",
    contohAyat:
      "Zuraida gigih memajukan perniagaannya kerana dia sedar bahawa kalau tidak dipecahkan ruyung, manakan dapat sagunya.",
    situasi:
      "Usahawan mengembangkan perniagaan • Murid belajar bersungguh-sungguh • Seseorang berkorban masa dan tenaga demi cita-cita",
    kesalahan:
      "Jangan gugurkan bahagian awal, menulis “ruyung” sebagai “ruang” atau menggunakannya untuk kejayaan yang diperoleh tanpa usaha.",
    berkaitan:
      "Di mana ada kemahuan, di situ ada jalan • Genggam bara api biar sampai jadi arang",
  },
  {
    id: "genggam-bara-api",
    label: "Genggam bara api biar sampai jadi arang",
    maksud:
      "Apabila melakukan pekerjaan yang sukar, lakukanlah dengan bersungguh-sungguh hingga berjaya atau selesai.",
    huraian: "Kesukaran tidak seharusnya menyebabkan seseorang berhenti separuh jalan.",
    contohAyat:
      "Walaupun sering kalah pada peringkat awal, Syahir terus berlatih kerana dia berpegang pada pepatah genggam bara api biar sampai jadi arang.",
    situasi:
      "Meneruskan usaha walaupun dicabar • Menyelesaikan tugasan sukar dengan tekun • Menyiapkan projek sehingga berjaya",
    kesalahan:
      "Jangan ubah bentuk asal menjadi “genggam bara biar jadi arang”. Pepatah ini menekankan ketekunan, bukan tindakan terburu-buru.",
    berkaitan:
      "Kalau tidak dipecahkan ruyung, manakan dapat sagunya • Alah bisa tegal biasa",
  },
  {
    id: "diam-diam-ubi-berisi",
    label: "Diam-diam ubi berisi",
    maksud:
      "Orang yang pendiam biasanya mempunyai ilmu, kebolehan atau kelebihan yang tidak ditunjuk-tunjukkan.",
    huraian:
      "Seseorang tidak wajar dipandang rendah hanya kerana kurang bercakap atau tidak suka menonjolkan diri.",
    contohAyat:
      "Aina jarang bercakap di dalam kelas, tetapi pembentangannya sangat bernas; dia memang diam-diam ubi berisi.",
    situasi:
      "Murid pendiam mencapai kecemerlangan • Seseorang memiliki kemahiran yang tidak diketahui ramai • Orang berilmu bersikap rendah hati",
    kesalahan:
      "Jangan gunakan untuk orang yang diam kerana tidak tahu atau anggap sifat pendiam sebagai kelemahan; pepatah ini bernada positif.",
    berkaitan:
      "Belakang parang pun kalau diasah nescaya tajam — pepatah berkaitan menekankan kebolehan yang berkembang melalui latihan.",
  },
  {
    id: "belakang-parang",
    label: "Belakang parang pun kalau diasah nescaya tajam",
    maksud:
      "Orang yang kurang pandai sekalipun boleh menjadi pandai jika diajar dan berusaha dengan tekun.",
    huraian:
      "Kebolehan boleh ditingkatkan melalui latihan, bimbingan dan pembelajaran yang berterusan.",
    contohAyat:
      "Farid yang lemah dalam Matematik akhirnya memperoleh keputusan cemerlang selepas rajin berlatih kerana belakang parang pun kalau diasah nescaya tajam.",
    situasi:
      "Murid lemah maju selepas dibimbing • Kemahiran dikuasai melalui latihan • Galakan supaya tidak berputus asa",
    kesalahan:
      "Jangan gunakan untuk menghina seseorang, menggugurkan kata “nescaya” atau menganggap kejayaan berlaku tanpa proses mengasah.",
    berkaitan:
      "Alah bisa tegal biasa — kedua-duanya menekankan latihan, tetapi pepatah ini lebih khusus kepada peningkatan ilmu atau kemahiran.",
  },
  {
    id: "ada-kemahuan-ada-jalan",
    label: "Di mana ada kemahuan, di situ ada jalan",
    maksud:
      "Jika seseorang benar-benar berazam, dia akan menemukan cara untuk mencapai matlamatnya.",
    huraian:
      "Kemahuan yang kuat mendorong seseorang mencari penyelesaian dan terus berusaha.",
    contohAyat:
      "Aina tetap mencari bahan rujukan walaupun menghadapi masalah capaian Internet kerana di mana ada kemahuan, di situ ada jalan.",
    situasi:
      "Mencari jalan mengatasi halangan • Mengejar cita-cita walaupun kekurangan kemudahan • Menyelesaikan masalah",
    kesalahan:
      "Jangan terbalikkan susunannya menjadi “di mana ada jalan, di situ ada kemahuan” atau gunakan apabila watak hanya berharap tanpa bertindak.",
    berkaitan:
      "Kalau tidak dipecahkan ruyung, manakan dapat sagunya — kemahuan perlu disusuli usaha untuk memperoleh hasil.",
  },
  {
    id: "acuan-dan-kuih",
    label: "Bagaimana acuan, begitulah kuihnya",
    maksud:
      "Perangai dan peribadi anak lazimnya terbentuk mengikut didikan serta teladan ibu bapanya.",
    huraian:
      "Ibu bapa dan persekitaran keluarga menjadi contoh penting dalam pembentukan sahsiah anak.",
    contohAyat:
      "Anak-anak Encik Rahman sentiasa berbudi bahasa kerana diasuh dengan baik; bagaimana acuan, begitulah kuihnya.",
    situasi:
      "Anak mencontohi sikap ibu bapa • Didikan keluarga mempengaruhi sahsiah • Tingkah laku mencerminkan suasana tempat dibesarkan",
    kesalahan:
      "Jangan ubah bentuk asal atau gunakannya untuk dua orang yang hanya mempunyai rupa yang sama tanpa hubungan didikan.",
    berkaitan:
      "Bapa borek anak rintik — kedua-duanya berkaitan dengan persamaan anak dan ibu bapa, tetapi fokusnya berbeza.",
  },
  {
    id: "sediakan-payung",
    label: "Sediakan payung sebelum hujan",
    maksud:
      "Bersedia lebih awal sebelum berlaku kesusahan atau perkara yang tidak diingini.",
    huraian:
      "Langkah berjaga-jaga dapat mengurangkan risiko dan kesan buruk pada masa hadapan.",
    contohAyat:
      "Kita hendaklah membuat salinan sandaran fail penting sebagai langkah sediakan payung sebelum hujan.",
    situasi:
      "Menyimpan wang kecemasan • Bersedia menghadapi peperiksaan • Melindungi data dan akaun digital",
    kesalahan:
      "Jangan tafsirkan secara harfiah atau gunakan selepas musibah berlaku; pepatah ini menekankan persediaan sebelum kejadian.",
    berkaitan:
      "Beringat sebelum kena — kedua-duanya mengingatkan kita supaya mengambil langkah awal.",
  },
  {
    id: "beringat-sebelum-kena",
    label: "Beringat sebelum kena",
    maksud: "Sentiasa berhati-hati sebelum ditimpa bahaya atau kesusahan.",
    huraian:
      "Seseorang perlu memikirkan risiko dan menjaga keselamatan sebelum sesuatu yang buruk berlaku.",
    contohAyat:
      "Pengguna Internet perlu merahsiakan kata laluan dan menyemak pautan yang diterima kerana beringat sebelum kena.",
    situasi:
      "Keselamatan Internet • Mematuhi peraturan jalan raya • Meneliti tawaran sebelum membuat keputusan",
    kesalahan:
      "Jangan tulis “beringat setelah kena”, yang bertentangan dengan maksudnya, atau gunakan apabila tindakan pencegahan sudah terlambat.",
    berkaitan:
      "Sediakan payung sebelum hujan — pepatah ini lebih menonjolkan sikap berhati-hati.",
  },
  {
    id: "berat-sama-dipikul",
    label: "Berat sama dipikul, ringan sama dijinjing",
    maksud: "Susah dan senang dihadapi bersama-sama.",
    huraian:
      "Setiap anggota kumpulan berkongsi tanggungjawab serta saling membantu tanpa mengira berat atau ringannya tugas.",
    contohAyat:
      "Penduduk taman mengamalkan sikap berat sama dipikul, ringan sama dijinjing ketika membersihkan kawasan perumahan.",
    situasi:
      "Masyarakat bergotong-royong • Keluarga saling membantu ketika susah • Ahli kumpulan membahagikan tugas dengan adil",
    kesalahan:
      "Jangan tukar pasangan katanya menjadi “berat sama dijinjing, ringan sama dipikul” atau gunakan apabila hanya seorang melakukan semua kerja.",
    berkaitan:
      "Bagai aur dengan tebing membawa maksud berkaitan, tetapi ungkapan itu ialah perumpamaan kerana menggunakan kata bandingan “bagai”.",
  },
  {
    id: "tak-ada-beban",
    label: "Tak ada beban, batu digalas",
    maksud: "Sengaja mencari kesusahan atau menambahkan beban yang tidak perlu.",
    huraian:
      "Seseorang melakukan sesuatu yang akhirnya menyusahkan dirinya walaupun pada asalnya dia tidak menghadapi masalah tersebut.",
    contohAyat:
      "Hakim menerima terlalu banyak tugas walaupun kerjanya belum selesai; tindakannya itu seperti tak ada beban, batu digalas.",
    situasi:
      "Mencampuri masalah tanpa sebab munasabah • Mengambil tugas tambahan di luar kemampuan • Tindakan sendiri menimbulkan masalah",
    kesalahan:
      "Jangan anggap pepatah ini memuji sikap rajin membantu; maksudnya negatif kerana seseorang sengaja menambah kesusahan.",
    berkaitan:
      "Sediakan payung sebelum hujan membawa nilai yang berlawanan: bersedia dengan bijak, bukannya menambah kesusahan.",
  },
];

export const bahasaMelayuForm3PepatahMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "PEPATAH",
  summary:
    "Ungkapan tetap yang mengandungi nasihat, pedoman hidup, pengajaran atau kebenaran umum dalam bahan Bahasa Melayu Tingkatan 3.",
  children: [
    branch("apa-itu", "Apa Itu Pepatah?", [
      node(
        "apa-itu-definisi",
        "Definisi",
        "Pepatah ialah ungkapan tetap yang mengandungi nasihat, pedoman hidup, pengajaran atau kebenaran umum.",
      ),
      node(
        "apa-itu-makna",
        "Makna Tersirat",
        "Maksudnya difahami melalui gambaran, pengalaman hidup dan kebijaksanaan masyarakat, bukan melalui makna harfiah semata-mata.",
      ),
      node(
        "apa-itu-skop",
        "Skop Tingkatan 3",
        "Bahan Tingkatan 3 menghimpunkan pepatah dan bidalan di bawah ungkapan yang membawa pengajaran atau kebenaran umum.",
      ),
    ]),
    branch("ciri", "Ciri-ciri", [
      node("ciri-tetap", "Bentuk Tetap", "Susunan kata tidak boleh diubah sesuka hati."),
      node("ciri-tersirat", "Makna Tersirat", "Maksudnya melampaui makna langsung perkataan."),
      node(
        "ciri-pengajaran",
        "Ada Pengajaran",
        "Membawa nasihat, pedoman, pengajaran atau kebenaran umum.",
      ),
      node(
        "ciri-lengkap",
        "Ungkapan Lengkap",
        "Biasanya berbentuk ungkapan atau ayat yang lebih lengkap daripada simpulan bahasa.",
      ),
      node(
        "ciri-fungsi",
        "Fungsi",
        "Menguatkan huraian dan menjadikan pertuturan atau penulisan lebih berkesan.",
      ),
    ]),
    branch("kenal-pasti", "Cara Mengenal Pasti", [
      node("kenal-pasti-baca", "Baca Seluruh Ungkapan", "Jangan tentukan jenis berdasarkan satu atau dua perkataan."),
      node(
        "kenal-pasti-pengajaran",
        "Cari Pengajaran Umum",
        "Tanyakan apakah nasihat atau pedoman yang disampaikan.",
      ),
      node(
        "kenal-pasti-perumpamaan",
        "Bezakan Perumpamaan",
        "Perumpamaan biasanya menggunakan kata bandingan seperti bagai, bak, ibarat, laksana atau seperti.",
      ),
      node(
        "kenal-pasti-simpulan",
        "Bezakan Simpulan Bahasa",
        "Simpulan bahasa lazimnya ringkas, seperti berat mulut, jantung hati dan mati akal.",
      ),
      node(
        "kenal-pasti-situasi",
        "Uji dengan Situasi",
        "Pastikan ungkapan dapat merumuskan pengajaran daripada situasi yang diberi.",
      ),
    ]),
    branch("senarai", "Senarai Pepatah", pepatahEntries.map(pepatah)),
    branch("kesalahan", "Kesalahan Lazim", [
      node("kesalahan-bentuk", "Mengubah Bentuk", "Jangan tukar perkataan atau susunan kata pepatah."),
      node(
        "kesalahan-harfiah",
        "Maksud Harfiah",
        "Fahami makna kiasan dan pengajaran, bukan imej luaran semata-mata.",
      ),
      node(
        "kesalahan-konteks",
        "Salah Konteks",
        "Jangan memilih pepatah berdasarkan satu kata kunci tanpa memahami seluruh situasi.",
      ),
      node(
        "kesalahan-jenis",
        "Salah Jenis",
        "Jangan anggap semua peribahasa sebagai pepatah; bezakan perumpamaan, simpulan bahasa dan kata-kata hikmat.",
      ),
      node(
        "kesalahan-berlebihan",
        "Penggunaan Berlebihan",
        "Elakkan memasukkan terlalu banyak pepatah dalam satu ayat atau perenggan.",
      ),
      node(
        "kesalahan-tanpa-hubungan",
        "Tiada Hubungan",
        "Terangkan kaitan pepatah dengan isi supaya penggunaannya tidak menjadi hiasan semata-mata.",
      ),
    ]),
    branch("mengingat", "Teknik Mengingat", [
      node(
        "mengingat-tema",
        "Kelompok Mengikut Tema",
        "Usaha dan ketekunan • Keluarga dan didikan • Persediaan dan keselamatan • Sikap dan kebolehan • Kerjasama",
      ),
      node(
        "mengingat-imej",
        "Ingat Imej Utama",
        "Ruyung → hasil selepas usaha • Bara → bertahan hingga selesai • Parang → latihan • Payung → persediaan • Batu → beban tambahan",
      ),
      node(
        "mengingat-pasangan",
        "Pasangkan Maksud Hampir Sama",
        "Bapa borek ↔ acuan dan kuih • Sediakan payung ↔ beringat • Pecahkan ruyung ↔ genggam bara",
      ),
      node(
        "mengingat-formula",
        "Formula Ingatan",
        "Pepatah → Maksud → Situasi. Contoh: Sediakan payung sebelum hujan → bersedia awal → membuat salinan sandaran fail.",
      ),
    ]),
    branch("uasa", "Teknik Menjawab UASA", [
      node(
        "uasa-baca",
        "1. Baca Situasi",
        "Baca hingga selesai dan kenal pasti tindakan, masalah serta hasil.",
      ),
      node(
        "uasa-tema",
        "2. Tentukan Tema",
        "Tentukan sama ada situasi berkaitan usaha, keluarga, persediaan, kerjasama atau sikap.",
      ),
      node(
        "uasa-maksud",
        "3. Rumuskan Maksud",
        "Nyatakan maksud situasi dengan ayat sendiri sebelum memilih pepatah.",
      ),
      node(
        "uasa-padan",
        "4. Padankan",
        "Padankan maksud, bukan perkataan yang kebetulan sama.",
      ),
      node(
        "uasa-ayat",
        "5. Bina Ayat",
        "Gunakan formula Isi → Pepatah → Hubungan dan masukkan pepatah secara gramatis.",
      ),
      node(
        "uasa-semak",
        "6. Semak",
        "Pastikan maksud tepat, bentuk asal dikekalkan, ayat gramatis dan penggunaan tidak berlebihan.",
      ),
      node(
        "uasa-frasa",
        "Frasa Sesuai",
        "Bak kata pepatah, ... • Hal ini bertepatan dengan pepatah ... • Situasi ini membuktikan kebenaran pepatah ...",
      ),
    ]),
  ],
};
