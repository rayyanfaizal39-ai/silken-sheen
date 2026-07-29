import type { MindNode } from "@/components/MindMap";

type BidalanEntry = {
  id: string;
  label: string;
  maksud: string;
  huraian: string;
  contohAyat: string;
  situasi: string;
  kesalahan: string;
  berkaitan: string;
};

const PREFIX = "bm-f3-bidalan";

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

function bidalan(entry: BidalanEntry): MindNode {
  return branch(`senarai-${entry.id}`, entry.label, [
    node(`senarai-${entry.id}-maksud`, "Maksud", entry.maksud),
    node(`senarai-${entry.id}-huraian`, "Huraian Ringkas", entry.huraian),
    node(`senarai-${entry.id}-contoh`, "Contoh Ayat", entry.contohAyat),
    node(`senarai-${entry.id}-situasi`, "Situasi Penggunaan", entry.situasi),
    node(`senarai-${entry.id}-kesalahan`, "Kesalahan Lazim", entry.kesalahan),
    node(`senarai-${entry.id}-berkaitan`, "Bidalan Berkaitan", entry.berkaitan),
  ]);
}

const bidalanEntries: BidalanEntry[] = [
  {
    id: "alah-bisa-tegal-biasa",
    label: "Alah bisa tegal biasa",
    maksud:
      "Perkara yang sukar atau menyakitkan akan menjadi mudah apabila dilakukan berulang kali.",
    huraian:
      "Pengalaman dan latihan membolehkan seseorang membiasakan diri serta mengatasi kesukaran.",
    contohAyat:
      "Pada mulanya Parjo berasa malu apabila digelar “Parjo Tapai”, tetapi lama-kelamaan dia dapat menerimanya kerana alah bisa tegal biasa.",
    situasi:
      "Murid semakin mahir selepas berlatih • Membiasakan diri dengan tugas baharu • Menyesuaikan diri dalam keadaan mencabar",
    kesalahan:
      "Jangan tafsirkan “bisa” sebagai racun semata-mata atau gunakan bidalan ini untuk kejayaan tanpa latihan dan pembiasaan.",
    berkaitan:
      "Genggam bara api biar sampai jadi arang — kedua-duanya menekankan ketabahan, tetapi bidalan ini lebih berfokus pada pembiasaan.",
  },
  {
    id: "bapa-borek-anak-rintik",
    label: "Bapa borek anak rintik",
    maksud: "Anak lazimnya mewarisi atau meniru sifat, perangai atau bakat bapanya.",
    huraian:
      "Persamaan antara anak dengan bapanya dapat dilihat pada kebolehan, sikap atau tingkah laku.",
    contohAyat:
      "Syahir mewarisi bakat bermain badminton daripada ayahnya; benarlah bidalan bapa borek anak rintik.",
    situasi:
      "Anak mewarisi bakat ibu bapa • Tingkah laku anak menyerupai ibu bapa • Anak meneruskan kemahiran keluarga",
    kesalahan:
      "Gunakan bentuk “bapa borek anak rintik”. Jangan hadkan penggunaannya kepada persamaan rupa fizikal sahaja.",
    berkaitan:
      "Tiada bidalan lain dalam senarai yang sama tepat. “Bagaimana acuan, begitulah kuihnya” berkaitan dengan didikan, tetapi diletakkan di bawah pepatah dalam kandungan ini.",
  },
  {
    id: "pecahkan-ruyung",
    label: "Kalau tidak dipecahkan ruyung, manakan dapat sagunya",
    maksud: "Kejayaan tidak akan diperoleh tanpa usaha dan pengorbanan.",
    huraian:
      "Seseorang perlu menghadapi kesukaran dan berusaha terlebih dahulu sebelum memperoleh hasil yang diingini.",
    contohAyat:
      "Zuraida gigih memajukan perniagaannya kerana dia sedar bahawa kalau tidak dipecahkan ruyung, manakan dapat sagunya.",
    situasi:
      "Usahawan memajukan perniagaan • Murid belajar bersungguh-sungguh • Berkorban masa dan tenaga demi cita-cita",
    kesalahan:
      "Jangan gugurkan bahagian awal, menulis “ruyung” sebagai “ruang” atau menggunakannya untuk kejayaan tanpa usaha.",
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
      "Walaupun sering kalah pada peringkat awal, Syahir terus berlatih kerana dia berpegang pada bidalan genggam bara api biar sampai jadi arang.",
    situasi:
      "Meneruskan usaha walaupun dicabar • Menyelesaikan tugasan sukar dengan tekun • Menyiapkan projek sehingga berjaya",
    kesalahan:
      "Jangan ubah bentuk asal menjadi “genggam bara biar jadi arang”. Bidalan ini menekankan ketekunan, bukan tindakan terburu-buru.",
    berkaitan:
      "Kalau tidak dipecahkan ruyung, manakan dapat sagunya • Alah bisa tegal biasa",
  },
  {
    id: "belakang-parang",
    label: "Belakang parang pun kalau diasah nescaya tajam",
    maksud:
      "Orang yang kurang pandai sekalipun boleh menjadi pandai jika diajar dan berusaha dengan tekun.",
    huraian:
      "Kebolehan dapat ditingkatkan melalui latihan, bimbingan dan pembelajaran yang berterusan.",
    contohAyat:
      "Farid yang lemah dalam Matematik akhirnya memperoleh keputusan cemerlang selepas rajin berlatih kerana belakang parang pun kalau diasah nescaya tajam.",
    situasi:
      "Murid lemah maju selepas dibimbing • Kemahiran dikuasai melalui latihan • Galakan supaya tidak berputus asa",
    kesalahan:
      "Jangan gunakan untuk menghina seseorang, menggugurkan kata “nescaya” atau menganggap kejayaan berlaku tanpa proses mengasah.",
    berkaitan:
      "Alah bisa tegal biasa — kedua-duanya menekankan latihan, tetapi bidalan ini lebih khusus kepada peningkatan ilmu atau kemahiran.",
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
      "Jangan terbalikkan susunannya atau gunakan bidalan ini apabila seseorang hanya berharap tanpa bertindak.",
    berkaitan:
      "Kalau tidak dipecahkan ruyung, manakan dapat sagunya — kemahuan perlu disusuli usaha untuk memperoleh hasil.",
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
      "Jangan tafsirkan secara harfiah atau gunakan selepas musibah berlaku; bidalan ini menekankan persediaan sebelum kejadian.",
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
      "Sediakan payung sebelum hujan — kedua-duanya berkaitan dengan pencegahan; bidalan ini lebih menonjolkan sikap berhati-hati.",
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
      "Jangan anggap bidalan ini memuji sikap rajin membantu; maksudnya negatif kerana seseorang sengaja menambah kesusahan.",
    berkaitan:
      "Sediakan payung sebelum hujan membawa nilai yang berlawanan: bersedia dengan bijak, bukannya menambah kesusahan.",
  },
];

export const bahasaMelayuForm3BidalanMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "BIDALAN",
  summary:
    "Peribahasa yang mengandungi pengajaran, peringatan atau sindiran berdasarkan bahan Bahasa Melayu Tingkatan 3.",
  children: [
    branch("apa-itu", "Apa Itu Bidalan?", [
      node(
        "apa-itu-definisi",
        "Definisi",
        "Bidalan ialah peribahasa yang mengandungi pengajaran, peringatan atau sindiran untuk dijadikan panduan dalam kehidupan.",
      ),
      node(
        "apa-itu-makna",
        "Makna Tersirat",
        "Maksudnya ditafsirkan berdasarkan keseluruhan ungkapan dan konteks, bukan makna harfiah semata-mata.",
      ),
      node(
        "apa-itu-skop",
        "Skop Tingkatan 3",
        "Bahan Tingkatan 3 menghimpunkan pepatah dan bidalan dalam satu subkategori kerana kedua-duanya membawa pengajaran atau kebenaran umum.",
      ),
    ]),
    branch("ciri", "Ciri-ciri", [
      node("ciri-tetap", "Bentuk Tetap", "Susunan kata tidak boleh diubah sesuka hati."),
      node("ciri-tersirat", "Makna Tersirat", "Maksudnya melampaui makna langsung perkataan."),
      node(
        "ciri-pengajaran",
        "Pengajaran atau Sindiran",
        "Menggalakkan tindakan yang baik, memberikan peringatan atau menyindir tindakan yang tidak wajar.",
      ),
      node(
        "ciri-akibat",
        "Tindakan dan Akibat",
        "Banyak bidalan menunjukkan hubungan antara sesuatu tindakan dengan hasil atau akibatnya.",
      ),
      node(
        "ciri-fungsi",
        "Fungsi",
        "Menjadi panduan hidup dan menguatkan huraian dalam pertuturan atau penulisan.",
      ),
    ]),
    branch("kenal-pasti", "Cara Mengenal Pasti", [
      node("kenal-pasti-baca", "Baca Seluruh Ungkapan", "Jangan tentukan jenis berdasarkan satu perkataan."),
      node(
        "kenal-pasti-pengajaran",
        "Cari Pengajaran atau Sindiran",
        "Tanyakan tindakan yang digalakkan, diperingatkan atau ditegur.",
      ),
      node(
        "kenal-pasti-akibat",
        "Kenal Pasti Akibat",
        "Perhatikan sama ada sesuatu tindakan membawa hasil atau kesan tertentu.",
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
        "Pastikan bidalan dapat merumuskan pengajaran atau teguran dalam situasi yang diberi.",
      ),
    ]),
    branch("senarai", "Senarai Bidalan", bidalanEntries.map(bidalan)),
    branch("batas", "Batas Klasifikasi", [
      node(
        "batas-pepatah",
        "Diletakkan di bawah Pepatah",
        "Diam-diam ubi berisi • Berat sama dipikul, ringan sama dijinjing • Bagaimana acuan, begitulah kuihnya",
      ),
      node(
        "batas-perumpamaan",
        "Perumpamaan",
        "Bagai aur dengan tebing • Seperti isi dengan kuku",
      ),
      node(
        "batas-simpulan",
        "Simpulan Bahasa",
        "Berat mulut • Jantung hati • Mati akal • Gulung tikar • Putih mata • Tukar tangan • Perah otak",
      ),
      node(
        "batas-hikmat",
        "Kata-kata Hikmat",
        "Ilmu itu penyuluh kehidupan",
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      node("kesalahan-bentuk", "Mengubah Bentuk", "Jangan tukar perkataan atau susunan kata bidalan."),
      node(
        "kesalahan-harfiah",
        "Maksud Harfiah",
        "Fahami pengajaran atau sindiran, bukan imej luaran semata-mata.",
      ),
      node(
        "kesalahan-konteks",
        "Salah Konteks",
        "Jangan memilih bidalan berdasarkan satu kata kunci tanpa memahami seluruh situasi.",
      ),
      node(
        "kesalahan-jenis",
        "Salah Jenis",
        "Jangan anggap semua peribahasa sebagai bidalan; bezakan pepatah, perumpamaan, simpulan bahasa dan kata-kata hikmat.",
      ),
      node(
        "kesalahan-berlebihan",
        "Penggunaan Berlebihan",
        "Elakkan memasukkan terlalu banyak bidalan dalam satu ayat atau perenggan.",
      ),
      node(
        "kesalahan-tanpa-hubungan",
        "Tiada Hubungan",
        "Terangkan kaitan bidalan dengan isi supaya penggunaannya tidak menjadi hiasan semata-mata.",
      ),
    ]),
    branch("mengingat", "Teknik Mengingat", [
      node(
        "mengingat-tema",
        "Kelompok Mengikut Tema",
        "Usaha dan ketekunan • Keluarga dan sifat • Persediaan dan keselamatan • Sindiran terhadap tindakan",
      ),
      node(
        "mengingat-imej",
        "Ingat Imej Utama",
        "Bisa → biasa • Ruyung → hasil • Bara → bertahan • Parang → latihan • Payung → persediaan • Batu → beban tambahan",
      ),
      node(
        "mengingat-pasangan",
        "Pasangkan Maksud Hampir Sama",
        "Sediakan payung ↔ beringat • Pecahkan ruyung ↔ genggam bara • Alah bisa ↔ belakang parang",
      ),
      node(
        "mengingat-formula",
        "Formula Ingatan",
        "Bidalan → Pengajaran → Situasi. Contoh: Sediakan payung sebelum hujan → bersedia awal → membuat salinan sandaran fail.",
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
        "Tentukan sama ada situasi berkaitan usaha, latihan, persediaan, keluarga atau tindakan yang disindir.",
      ),
      node(
        "uasa-pengajaran",
        "3. Rumuskan Pengajaran",
        "Nyatakan pengajaran situasi dengan ayat sendiri sebelum memilih bidalan.",
      ),
      node(
        "uasa-padan",
        "4. Padankan",
        "Padankan maksud dan pengajaran, bukan perkataan yang kebetulan sama.",
      ),
      node(
        "uasa-ayat",
        "5. Bina Ayat",
        "Gunakan formula Isi → Bidalan → Hubungan dan masukkan bidalan secara gramatis.",
      ),
      node(
        "uasa-semak",
        "6. Semak",
        "Pastikan maksud tepat, bentuk asal dikekalkan, ayat gramatis dan penggunaan tidak berlebihan.",
      ),
      node(
        "uasa-frasa",
        "Frasa Sesuai",
        "Bak kata bidalan, ... • Hal ini bertepatan dengan bidalan ... • Situasi ini membuktikan kebenaran bidalan ...",
      ),
    ]),
  ],
};
