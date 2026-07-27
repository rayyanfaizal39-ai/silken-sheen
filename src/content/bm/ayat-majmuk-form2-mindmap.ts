import type { MindNode } from "@/components/MindMap";

const PREFIX = "bm-f2-ayat-majmuk";

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

export const bahasaMelayuForm2AyatMajmukMindMap: MindNode = {
  id: `${PREFIX}-root`,
  label: "AYAT MAJMUK",
  summary:
    "Ayat majmuk ialah ayat yang terbentuk daripada gabungan dua atau lebih ayat tunggal atau klausa.",
  children: [
    branch("definisi", "Definisi", [
      node(
        "definisi-maksud",
        "Maksud",
        "Ayat majmuk ialah ayat yang terbentuk daripada gabungan dua atau lebih ayat tunggal atau klausa.",
      ),
      node(
        "definisi-tujuan",
        "Tujuan",
        "Ayat majmuk digunakan untuk menyampaikan lebih daripada satu maklumat, hubungan antara idea, sebab dan akibat, pertentangan, pilihan, urutan peristiwa atau penerangan tambahan.",
      ),
      branch("definisi-contoh", "Contoh Mudah", [
        node("definisi-contoh-tunggal-1", "Ayat Tunggal 1", '"Ali membaca buku."'),
        node("definisi-contoh-tunggal-2", "Ayat Tunggal 2", '"Siti menulis karangan."'),
        node(
          "definisi-contoh-majmuk",
          "Ayat Majmuk",
          '"Ali membaca buku dan Siti menulis karangan."',
        ),
      ]),
      node(
        "definisi-ketepatan",
        "Nota Ketepatan",
        "Bukan setiap ayat yang panjang ialah ayat majmuk. Pengelasan bergantung pada struktur ayat dan hubungan antara klausanya.",
      ),
    ]),
    branch("cara-terbentuk", "Cara Terbentuk", [
      branch("cara-terbentuk-ayat-tunggal", "Gabungan Ayat Tunggal", [
        node("cara-terbentuk-ayat-tunggal-1", "Ayat 1", '"Farah membaca novel."'),
        node("cara-terbentuk-ayat-tunggal-2", "Ayat 2", '"Adiknya menonton televisyen."'),
        node(
          "cara-terbentuk-ayat-tunggal-gabungan",
          "Hasil Gabungan",
          '"Farah membaca novel dan adiknya menonton televisyen."',
        ),
      ]),
      node(
        "cara-terbentuk-klausa",
        "Gabungan Klausa",
        "Ayat majmuk boleh mengandungi klausa yang setara, klausa yang bergantung pada klausa lain atau klausa yang digabungkan melalui lebih daripada satu cara.",
      ),
      node(
        "cara-terbentuk-penghubung",
        "Unsur Penghubung",
        "Antara unsur penghubung yang lazim ialah dan, atau, tetapi, lalu, kerana, supaya, apabila, yang dan bahawa.",
      ),
      branch("cara-terbentuk-pengguguran", "Pengguguran Unsur Berulang", [
        node(
          "cara-terbentuk-pengguguran-asal",
          "Bentuk Asal",
          '"Amir membeli buku dan Amir membaca buku itu."',
        ),
        node(
          "cara-terbentuk-pengguguran-natural",
          "Bentuk Lebih Semula Jadi",
          '"Amir membeli dan membaca buku itu."',
        ),
        node(
          "cara-terbentuk-pengguguran-syarat",
          "Syarat",
          "Unsur berulang hanya boleh digugurkan apabila maksud kekal jelas serta tidak menimbulkan kekaburan atau mengubah makna.",
        ),
      ]),
    ]),
    branch("gabungan", "Majmuk Gabungan", [
      node(
        "gabungan-maksud",
        "Maksud",
        "Ayat majmuk gabungan mencantumkan dua atau lebih klausa yang setara. Setiap klausa biasanya boleh berdiri sebagai ayat lengkap.",
      ),
      branch("gabungan-dan", 'Dengan "dan"', [
        node("gabungan-dan-ayat", "Ayat", '"Ali membaca buku dan Siti menulis karangan."'),
        node("gabungan-dan-klausa-1", "Klausa 1", "Ali membaca buku"),
        node("gabungan-dan-klausa-2", "Klausa 2", "Siti menulis karangan"),
      ]),
      branch("gabungan-tetapi", 'Dengan "tetapi"', [
        node(
          "gabungan-tetapi-ayat",
          "Ayat",
          '"Amir rajin belajar tetapi adiknya kurang berminat."',
        ),
        node(
          "gabungan-tetapi-hubungan",
          "Hubungan",
          "Kata hubung tetapi menunjukkan pertentangan atau perbezaan.",
        ),
      ]),
      branch("gabungan-atau", 'Dengan "atau"', [
        node(
          "gabungan-atau-ayat",
          "Ayat",
          '"Kamu boleh menaiki bas atau kamu boleh berjalan kaki."',
        ),
        node("gabungan-atau-hubungan", "Hubungan", "Kata hubung atau menunjukkan pilihan."),
      ]),
      branch("gabungan-lalu", 'Dengan "lalu"', [
        node("gabungan-lalu-ayat", "Ayat", '"Dia membuka pintu lalu masuk ke dalam bilik."'),
        node("gabungan-lalu-hubungan", "Hubungan", "Kata hubung lalu menunjukkan urutan tindakan."),
      ]),
      branch("gabungan-serta", 'Dengan "serta"', [
        node("gabungan-serta-ayat", "Ayat", '"Ibu membeli buah-buahan serta sayur-sayuran."'),
        node(
          "gabungan-serta-ketepatan",
          "Nota Ketepatan",
          "Ayat ini mungkin menyelaraskan unsur majmuk dalam satu klausa, bukannya mengungkapkan dua klausa penuh. Gunakannya untuk memahami penyelarasan, bukan sebagai satu-satunya contoh ayat majmuk gabungan.",
        ),
      ]),
      node(
        "gabungan-nota",
        "Nota",
        'Bukan setiap ayat yang mengandungi "dan" ialah ayat majmuk. Dalam "Ali dan Abu pergi ke sekolah.", frasa "Ali dan Abu" boleh menjadi subjek majmuk dalam satu klausa. Analisis mesti berdasarkan struktur lengkap ayat.',
      ),
    ]),
    branch("pancangan", "Majmuk Pancangan", [
      node(
        "pancangan-maksud",
        "Maksud",
        "Ayat majmuk pancangan mengandungi satu klausa utama dan satu atau lebih klausa yang bergantung padanya. Klausa pancangan tidak sentiasa dapat berdiri sendiri dengan fungsi dan maksud yang sama.",
      ),
      branch("pancangan-relatif", "Pancangan Relatif", [
        node("pancangan-relatif-penanda", "Penanda Lazim", "yang"),
        node("pancangan-relatif-ayat", "Ayat", '"Murid yang memakai baju biru itu ketua kelas."'),
        node("pancangan-relatif-utama", "Maklumat Utama", "Murid itu ketua kelas"),
        node("pancangan-relatif-klausa", "Klausa Relatif", "yang memakai baju biru"),
        node("pancangan-relatif-fungsi", "Fungsi", 'Klausa relatif menerangkan kata nama "murid".'),
      ]),
      branch("pancangan-komplemen", "Pancangan Komplemen", [
        node("pancangan-komplemen-penanda", "Penanda Lazim", "bahawa"),
        node(
          "pancangan-komplemen-ayat",
          "Ayat",
          '"Guru itu menjelaskan bahawa peperiksaan akan bermula esok."',
        ),
        node("pancangan-komplemen-utama", "Klausa Utama", "Guru itu menjelaskan"),
        node(
          "pancangan-komplemen-klausa",
          "Klausa Komplemen",
          "bahawa peperiksaan akan bermula esok",
        ),
      ]),
      branch("pancangan-keterangan", "Pancangan Keterangan", [
        node(
          "pancangan-keterangan-penghubung",
          "Kata Hubung Lazim",
          "kerana • apabila • jika • supaya • walaupun • ketika",
        ),
        node(
          "pancangan-keterangan-ayat",
          "Ayat",
          '"Mereka berteduh kerana hujan turun dengan lebat."',
        ),
        node("pancangan-keterangan-utama", "Klausa Utama", "Mereka berteduh"),
        node("pancangan-keterangan-klausa", "Klausa Keterangan", "kerana hujan turun dengan lebat"),
      ]),
      node(
        "pancangan-ketepatan",
        "Nota Ketepatan",
        "Kenali fungsi klausa utama dan klausa pancangan pada tahap Tingkatan 2 tanpa membebankan analisis dengan istilah klausa yang terlalu lanjut.",
      ),
    ]),
    branch("campuran", "Majmuk Campuran", [
      node(
        "campuran-maksud",
        "Maksud",
        "Ayat majmuk campuran menggabungkan lebih daripada satu jenis binaan ayat majmuk.",
      ),
      branch("campuran-contoh", "Contoh", [
        node(
          "campuran-contoh-ayat",
          "Ayat",
          '"Ali membaca buku dan Siti menulis karangan kerana mereka perlu menyiapkan tugasan."',
        ),
        node(
          "campuran-contoh-gabungan",
          "Bahagian Gabungan",
          "Ali membaca buku + Siti menulis karangan",
        ),
        node(
          "campuran-contoh-pancangan",
          "Pancangan Keterangan",
          "kerana mereka perlu menyiapkan tugasan",
        ),
      ]),
      node(
        "campuran-ciri",
        "Ciri",
        "Binaan ini boleh mengandungi dua atau lebih klausa utama, satu atau lebih klausa pancangan dan lebih daripada satu jenis kata hubung.",
      ),
      node(
        "campuran-nota",
        "Nota",
        "Murid tidak perlu melakukan analisis rajah klausa yang terlalu teknikal. Matlamat utama ialah mengenal pasti bahawa lebih daripada satu proses penggabungan ayat digunakan.",
      ),
    ]),
    branch("kata-hubung", "Kata Hubung", [
      node(
        "kata-hubung-fungsi",
        "Fungsi",
        "Kata hubung menghubungkan perkataan, frasa atau klausa. Dalam ayat majmuk, kata hubung sering menunjukkan hubungan antara klausa.",
      ),
      node("kata-hubung-gabungan", "Gabungan", "dan • atau • tetapi • lalu • serta"),
      node(
        "kata-hubung-pancangan",
        "Pancangan",
        "kerana • supaya • apabila • jika • walaupun • bahawa • yang",
      ),
      node(
        "kata-hubung-makna",
        "Hubungan Makna",
        "dan: penambahan • tetapi: pertentangan • atau: pilihan • kerana: sebab • supaya: tujuan • apabila: masa • jika: syarat • walaupun: pertentangan yang tidak menghalang",
      ),
      node(
        "kata-hubung-ketepatan",
        "Nota Ketepatan",
        "Fokus cabang ini ialah fungsi kata hubung dalam ayat majmuk, bukan pengulangan keseluruhan pelajaran Kata Hubung Tingkatan 1.",
      ),
    ]),
    branch("penggabungan", "Penggabungan Ayat", [
      branch("penggabungan-langkah-1", "Langkah 1: Kenal Pasti Maklumat", [
        node("penggabungan-langkah-1-ayat-1", "Ayat 1", '"Lina membuka buku."'),
        node("penggabungan-langkah-1-ayat-2", "Ayat 2", '"Lina mula membaca."'),
      ]),
      node(
        "penggabungan-langkah-2",
        "Langkah 2: Tentukan Hubungan",
        "Kedua-dua tindakan berlaku secara berurutan.",
      ),
      node(
        "penggabungan-langkah-3",
        "Langkah 3: Pilih Kata Hubung",
        "Kata hubung yang sesuai ialah lalu.",
      ),
      node(
        "penggabungan-langkah-4",
        "Langkah 4: Gabungkan",
        '"Lina membuka buku lalu mula membaca."',
      ),
      branch("penggabungan-sebab", "Contoh Sebab", [
        node("penggabungan-sebab-ayat-1", "Ayat Tunggal 1", '"Amir tidak hadir ke sekolah."'),
        node("penggabungan-sebab-ayat-2", "Ayat Tunggal 2", '"Amir demam."'),
        node(
          "penggabungan-sebab-hasil",
          "Hasil",
          '"Amir tidak hadir ke sekolah kerana dia demam."',
        ),
      ]),
      branch("penggabungan-pertentangan", "Contoh Pertentangan", [
        node(
          "penggabungan-pertentangan-ayat-1",
          "Ayat Tunggal 1",
          '"Hakim sudah belajar dengan tekun."',
        ),
        node("penggabungan-pertentangan-ayat-2", "Ayat Tunggal 2", '"Hakim masih berasa bimbang."'),
        node(
          "penggabungan-pertentangan-hasil",
          "Hasil",
          '"Hakim sudah belajar dengan tekun tetapi masih berasa bimbang."',
        ),
      ]),
      branch("penggabungan-tujuan", "Contoh Tujuan", [
        node(
          "penggabungan-tujuan-ayat-1",
          "Ayat Tunggal 1",
          '"Murid-murid belajar bersungguh-sungguh."',
        ),
        node(
          "penggabungan-tujuan-ayat-2",
          "Ayat Tunggal 2",
          '"Murid-murid mahu mencapai keputusan yang baik."',
        ),
        node(
          "penggabungan-tujuan-hasil",
          "Hasil",
          '"Murid-murid belajar bersungguh-sungguh supaya mereka mencapai keputusan yang baik."',
        ),
      ]),
      node(
        "penggabungan-pengguguran",
        "Pengguguran Unsur Berulang",
        "Gugurkan subjek yang berulang hanya apabila hasilnya kekal jelas dan gramatis. Jangan menggugurkan maklumat semata-mata untuk memendekkan ayat.",
      ),
      node(
        "penggabungan-maksud",
        "Kekalkan Maksud",
        "Ayat gabungan tidak boleh menambah maklumat baharu, membuang maklumat penting, menyongsangkan sebab dan akibat atau mengubah hubungan antara klausa.",
      ),
    ]),
    branch("pencerakinan", "Pencerakinan", [
      node(
        "pencerakinan-maksud",
        "Maksud",
        "Pencerakinan ialah proses memisahkan ayat majmuk menjadi beberapa ayat tunggal.",
      ),
      branch("pencerakinan-gabungan", "Contoh Gabungan", [
        node(
          "pencerakinan-gabungan-asal",
          "Ayat Asal",
          '"Ali membaca buku dan Siti menulis karangan."',
        ),
        node("pencerakinan-gabungan-1", "Ayat Tunggal 1", '"Ali membaca buku."'),
        node("pencerakinan-gabungan-2", "Ayat Tunggal 2", '"Siti menulis karangan."'),
      ]),
      branch("pencerakinan-subjek", "Subjek yang Digugurkan", [
        node("pencerakinan-subjek-asal", "Ayat Asal", '"Amir membeli dan membaca buku itu."'),
        node("pencerakinan-subjek-1", "Ayat Tunggal 1", '"Amir membeli buku itu."'),
        node("pencerakinan-subjek-2", "Ayat Tunggal 2", '"Amir membaca buku itu."'),
        node(
          "pencerakinan-subjek-nota",
          "Nota",
          "Pulihkan subjek dan objek yang diperlukan hanya apabila pemulihan itu disokong oleh maksud asal.",
        ),
      ]),
      branch("pencerakinan-keterangan", "Pancangan Keterangan", [
        node(
          "pencerakinan-keterangan-asal",
          "Ayat Asal",
          '"Mereka berteduh kerana hujan turun dengan lebat."',
        ),
        node("pencerakinan-keterangan-1", "Ayat Tunggal 1", '"Mereka berteduh."'),
        node("pencerakinan-keterangan-2", "Ayat Tunggal 2", '"Hujan turun dengan lebat."'),
        node(
          "pencerakinan-keterangan-nota",
          "Nota",
          "Fakta asal dikekalkan, tetapi hubungan sebab tidak lagi dinyatakan selepas ayat dipisahkan. Ikuti kehendak soalan dan format peperiksaan.",
        ),
      ]),
      branch("pencerakinan-relatif", "Pancangan Relatif", [
        node(
          "pencerakinan-relatif-asal",
          "Ayat Asal",
          '"Murid yang memakai baju biru itu ketua kelas."',
        ),
        node("pencerakinan-relatif-1", "Cadangan Ayat 1", '"Murid itu memakai baju biru."'),
        node("pencerakinan-relatif-2", "Cadangan Ayat 2", '"Murid itu ketua kelas."'),
        node(
          "pencerakinan-relatif-nota",
          "Nota",
          "Rujukan subjek mesti kekal sama dan tidak boleh menjadi kabur.",
        ),
      ]),
      node(
        "pencerakinan-semakan",
        "Semakan",
        "Setiap ayat yang terhasil mesti mempunyai subjek lengkap, predikat lengkap, struktur yang gramatis dan fakta asal yang dikekalkan.",
      ),
    ]),
    branch("dengan-ayat-tunggal", "Dengan Ayat Tunggal", [
      branch("dengan-ayat-tunggal-tunggal", "Ayat Tunggal", [
        node(
          "dengan-ayat-tunggal-tunggal-ciri",
          "Ciri",
          "Mempunyai satu struktur utama subjek-predikat.",
        ),
        node("dengan-ayat-tunggal-tunggal-contoh", "Contoh", '"Farah membaca novel."'),
      ]),
      branch("dengan-ayat-tunggal-majmuk", "Ayat Majmuk", [
        node(
          "dengan-ayat-tunggal-majmuk-ciri",
          "Ciri",
          "Mengandungi dua atau lebih klausa atau gagasan yang digabungkan.",
        ),
        node(
          "dengan-ayat-tunggal-majmuk-contoh",
          "Contoh",
          '"Farah membaca novel dan adiknya menonton televisyen."',
        ),
      ]),
      branch("dengan-ayat-tunggal-panjang", "Jangan Berdasarkan Panjang", [
        node(
          "dengan-ayat-tunggal-panjang-contoh",
          "Contoh Satu Klausa yang Panjang",
          '"Pelajar Tingkatan Dua itu sedang membaca buku sejarah baharu di perpustakaan sekolah."',
        ),
        node(
          "dengan-ayat-tunggal-panjang-nota",
          "Nota Ketepatan",
          'Contoh seperti "Murid yang rajin itu sedang membaca buku sejarah di perpustakaan sekolah." tidak sesuai dijadikan bukti mutlak kerana "yang rajin" boleh memperkenalkan struktur relatif.',
        ),
      ]),
      node(
        "dengan-ayat-tunggal-hubung",
        "Kata Hubung Bukan Satu-satunya Petunjuk",
        "Sesetengah ayat majmuk menggunakan kata hubung yang jelas, tetapi pengelasan mesti berdasarkan struktur klausa dan bukan kehadiran satu perkataan sahaja.",
      ),
      node(
        "dengan-ayat-tunggal-soalan",
        "Soalan Panduan",
        "Berapa banyak hubungan klausa bermakna yang digabungkan dalam ayat ini?",
      ),
    ]),
    branch("dengan-kata-majmuk", "Dengan Kata Majmuk", [
      branch("dengan-kata-majmuk-ayat", "Ayat Majmuk", [
        node(
          "dengan-kata-majmuk-ayat-maksud",
          "Binaan",
          "Struktur sintaksis yang terbentuk melalui penggabungan klausa atau ayat.",
        ),
        node(
          "dengan-kata-majmuk-ayat-contoh",
          "Contoh",
          '"Ali membaca buku dan Siti menulis karangan."',
        ),
      ]),
      branch("dengan-kata-majmuk-kata", "Kata Majmuk", [
        node(
          "dengan-kata-majmuk-kata-maksud",
          "Binaan",
          "Bentuk morfologi daripada dua atau lebih kata dasar yang menghasilkan makna tertentu.",
        ),
        node(
          "dengan-kata-majmuk-kata-contoh",
          "Contoh",
          "kereta api • urus niaga • tanggungjawab • warganegara • alat tulis",
        ),
      ]),
      node(
        "dengan-kata-majmuk-beza",
        "Perbezaan Utama",
        "Ayat majmuk menggabungkan klausa atau struktur ayat, manakala kata majmuk menggabungkan perkataan.",
      ),
      node(
        "dengan-kata-majmuk-nota",
        "Jangan Keliru",
        'Perkataan "majmuk" tidak bermaksud kedua-dua topik mempunyai fungsi tatabahasa yang sama.',
      ),
    ]),
    branch("kesalahan", "Kesalahan Lazim", [
      branch("kesalahan-hubung", "Kata Hubung Tidak Sesuai", [
        node("kesalahan-hubung-salah", "Salah", '"Amir tidak hadir ke sekolah tetapi dia demam."'),
        node(
          "kesalahan-hubung-betul",
          "Lebih Tepat",
          '"Amir tidak hadir ke sekolah kerana dia demam."',
        ),
        node(
          "kesalahan-hubung-sebab",
          "Sebab",
          "Kata hubung mesti sepadan dengan hubungan makna yang hendak disampaikan.",
        ),
      ]),
      branch("kesalahan-subjek", "Pengulangan Subjek yang Janggal", [
        node(
          "kesalahan-subjek-kurang",
          "Kurang Semula Jadi",
          '"Lina membuka buku lalu Lina mula membaca."',
        ),
        node("kesalahan-subjek-betul", "Lebih Baik", '"Lina membuka buku lalu mula membaca."'),
        node(
          "kesalahan-subjek-nota",
          "Nota",
          "Jangan gugurkan subjek berulang jika pengguguran itu menyebabkan kekaburan.",
        ),
      ]),
      branch("kesalahan-tergantung", "Ayat Tergantung", [
        node("kesalahan-tergantung-salah", "Tidak Lengkap", '"Kerana hujan turun dengan lebat."'),
        node(
          "kesalahan-tergantung-betul",
          "Ayat Lengkap",
          '"Mereka berteduh kerana hujan turun dengan lebat."',
        ),
      ]),
      branch("kesalahan-cerakin", "Pencerakinan Tidak Lengkap", [
        node(
          "kesalahan-cerakin-asal",
          "Ayat Asal",
          '"Ali membaca buku dan Siti menulis karangan."',
        ),
        node("kesalahan-cerakin-salah-1", "Salah 1", '"Membaca buku."'),
        node("kesalahan-cerakin-salah-2", "Salah 2", '"Siti menulis."'),
        node("kesalahan-cerakin-betul-1", "Betul 1", '"Ali membaca buku."'),
        node("kesalahan-cerakin-betul-2", "Betul 2", '"Siti menulis karangan."'),
      ]),
      branch("kesalahan-maksud", "Mengubah Maksud", [
        node(
          "kesalahan-maksud-asal",
          "Ayat Asal",
          '"Dia belajar bersungguh-sungguh supaya dia lulus."',
        ),
        node(
          "kesalahan-maksud-salah",
          "Perubahan Salah",
          '"Dia lulus kerana dia belajar bersungguh-sungguh."',
        ),
        node(
          "kesalahan-maksud-nota",
          "Sebab",
          "Ayat baharu mengubah hubungan tujuan kepada hubungan sebab atau hasil.",
        ),
      ]),
      branch("kesalahan-semua-dan", 'Menganggap Semua "dan" sebagai Ayat Majmuk', [
        node("kesalahan-semua-dan-ayat", "Ayat", '"Ali dan Abu bermain bola."'),
        node(
          "kesalahan-semua-dan-nota",
          "Analisis",
          '"Ali dan Abu" boleh menjadi subjek majmuk dalam satu klausa; ayat ini tidak boleh terus dianggap mengandungi dua klausa.',
        ),
      ]),
      branch("kesalahan-kata-majmuk", "Keliru dengan Kata Majmuk", [
        node("kesalahan-kata-majmuk-contoh", "Contoh", '"Kereta api"'),
        node(
          "kesalahan-kata-majmuk-nota",
          "Pembetulan",
          "Kereta api ialah kata majmuk, bukannya ayat majmuk.",
        ),
      ]),
    ]),
    branch("tip-uasa", "Tip UASA", [
      node(
        "tip-uasa-klausa",
        "Cari Klausa",
        "Kenal pasti setiap kelompok yang mempunyai hubungan subjek-predikat atau gagasan yang lengkap.",
      ),
      node(
        "tip-uasa-hubung",
        "Kenal Pasti Kata Hubung",
        "Semak sama ada kata hubung menunjukkan penambahan, pertentangan, pilihan, sebab, tujuan, masa, syarat atau penerangan.",
      ),
      node(
        "tip-uasa-jenis",
        "Tentukan Jenis",
        "Pilih ayat majmuk gabungan, ayat majmuk pancangan atau ayat majmuk campuran.",
      ),
      node(
        "tip-uasa-gabung",
        "Untuk Penggabungan",
        "Kekalkan setiap idea asal, pilih kata hubung yang tepat, gugurkan pengulangan hanya apabila selamat dan pastikan ayat akhir gramatis.",
      ),
      node(
        "tip-uasa-cerakin",
        "Untuk Pencerakinan",
        "Pulihkan subjek, objek atau pelengkap yang diperlukan; hasilkan ayat lengkap dan kekalkan fakta asal.",
      ),
      node(
        "tip-uasa-semak",
        "Semak Maksud",
        "Baca ayat akhir sekali lagi dan pastikan hubungan antara idea tidak berubah.",
      ),
    ]),
    branch("ingat", "Ingat!", [
      node(
        "ingat-rumus",
        "Rumus Umum",
        "Ayat Majmuk = Dua atau Lebih Klausa + Hubungan yang Jelas",
      ),
      node("ingat-jenis", "Tiga Jenis Utama", "Gabungan • Pancangan • Campuran"),
      branch("ingat-gabungan", "Gabungan", [
        node("ingat-gabungan-ciri", "Ciri", "Klausa yang setara."),
        node("ingat-gabungan-contoh", "Contoh", '"Ali membaca dan Siti menulis."'),
      ]),
      branch("ingat-pancangan", "Pancangan", [
        node(
          "ingat-pancangan-ciri",
          "Ciri",
          "Klausa utama bersama klausa yang bergantung padanya.",
        ),
        node("ingat-pancangan-contoh", "Contoh", '"Mereka berteduh kerana hujan turun."'),
      ]),
      node(
        "ingat-campuran",
        "Campuran",
        "Menggunakan lebih daripada satu proses penggabungan ayat.",
      ),
      node(
        "ingat-semakan",
        "Semakan Cepat",
        "Berapa banyak idea atau klausa digabungkan? • Apakah hubungan antara klausa? • Adakah kata hubung yang digunakan tepat? • Adakah maksud asal masih dikekalkan?",
      ),
    ]),
  ],
};
