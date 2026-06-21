import type { StructuredNotes } from "@/content/types";

export const geographyF2C1Notes: StructuredNotes = {
  chapterSummary:
    "Bab 1 memperkenalkan dua kemahiran asas geografi: skala (nisbah antara jarak di peta dengan jarak sebenar di permukaan bumi) dan jarak (mutlak dan relatif). Murid belajar tiga jenis skala — skala lurus, skala penyata dan pecahan wakilan — serta cara mengukur jarak sebenar sama ada lurus atau melengkung menggunakan pembaris, jangka tolok, benang atau jalur kertas. Kemahiran ini menjadi asas penting sebelum mempelajari Peta Topografi di Bab 2.",
  quickRevision: [
    "Skala ialah nisbah jarak di atas peta berbanding dengan jarak sebenar di permukaan bumi.",
    "Tiga jenis skala: skala lurus, skala penyata dan pecahan wakilan (PW).",
    "Jarak mutlak diukur dalam unit seperti meter atau kilometer dan tetap nilainya.",
    "Jarak relatif diukur berdasarkan masa, kos atau jenis pengangkutan dan boleh berubah.",
    "Jarak lurus diukur menggunakan pembaris, jangka tolok atau jalur kertas.",
    "Jarak melengkung diukur menggunakan benang atau jalur kertas yang dilenturkan mengikut lengkok.",
    "Formula utama: Jarak Sebenar = Jarak di Peta × Skala.",
    "1 km = 1 000 m, 1 m = 100 cm, 1 cm = 10 mm.",
  ],
  sections: [
    {
      title: "Pengenalan Bab",
      subsections: [
        {
          content:
            "Skala ialah nisbah jarak di atas peta berbanding dengan jarak sebenar di permukaan bumi. Jarak pula ialah ukuran jauh antara dua tempat atau dua titik. Kedua-dua kemahiran ini penting dalam geografi kerana murid perlu mengira jarak sebenar antara dua tempat hanya dengan merujuk peta, tanpa perlu mengukur secara fizikal di lapangan.\n\nDalam kehidupan harian, kemahiran ini membantu kita menganggar jarak dan masa perjalanan, merancang perjalanan mengikut kos dan pengangkutan yang paling sesuai, serta membaca peta laluan, peta pelancongan dan aplikasi navigasi GPS dengan lebih tepat.\n\nTip: Bab ini amat penting dalam peperiksaan kerana ia menjadi asas Kemahiran Geografi yang akan digunakan semula dalam Bab 2 (Peta Topografi) dan bab-bab kemahiran seterusnya. Soalan pengiraan skala dan jarak kerap muncul dalam format struktur dan berpandukan rajah.",
        },
      ],
    },
    {
      title: "1.1 Skala",
      subsections: [
        {
          title: "Maksud Skala",
          content:
            "Skala ialah nisbah jarak di atas peta berbanding dengan jarak sebenar di permukaan bumi. Skala membolehkan kawasan yang luas di permukaan bumi dilukis dalam bentuk yang lebih kecil pada sehelai peta atau pelan.",
        },
        {
          title: "Skala Lurus",
          content:
            "Skala lurus ialah skala yang berbentuk satu garisan lurus yang dibahagikan kepada beberapa bahagian yang sama saiz, dengan setiap bahagian mewakili jarak sebenar di permukaan bumi.\n\nCiri-ciri: dilukis sebagai garis berskala dengan unit ukuran ditanda pada setiap bahagian; terbahagi kepada skala lurus muduh (separuh skala bernombor negatif di sebelah kiri 0, untuk bacaan lebih tepat) dan skala lurus penuh (bermula dari 0 sehingga nombor maksimum).\n\nKelebihan: nilai skala tidak berubah walaupun peta diperbesar atau diperkecil melalui fotokopi, kerana garisan skala turut berubah mengikut kadar yang sama.\n\nCara membaca: kenal pasti nilai yang diwakili oleh setiap bahagian pada garis skala, kemudian kira jumlah bahagian yang diliputi oleh jarak yang diukur.\n\nKegunaan: sesuai digunakan pada peta yang akan diperbesar atau diperkecilkan saiznya (contohnya melalui fotokopi atau cetakan semula).",
        },
        {
          title: "Skala Penyata",
          content:
            "Skala penyata ialah skala yang dinyatakan dalam bentuk ayat pernyataan, contohnya '1 cm mewakili 1 km'.\n\nCiri-ciri: dinyatakan secara terus dalam ayat tanpa unit nisbah; mudah difahami secara literal kerana ia menyatakan unit jarak peta dan unit jarak sebenar secara jelas.\n\nKelebihan: senang dan cepat difahami oleh pembaca peta tanpa pengiraan tambahan unit.\n\nCara membaca: baca pernyataan skala (contoh: 1 cm mewakili 1 km), kemudian darabkan jarak yang diukur pada peta (dalam cm) dengan nilai jarak sebenar yang dinyatakan.\n\nKegunaan: digunakan secara meluas pada peta lakar dan peta pelancongan ringkas.",
        },
        {
          title: "Pecahan Wakilan (PW)",
          content:
            "Pecahan wakilan dinyatakan dalam bentuk nisbah tanpa unit, contohnya 1:100 000 atau 1/100 000.\n\nCiri-ciri: nombor pertama (1) mewakili 1 unit jarak di atas peta dan nombor kedua (100 000) mewakili unit jarak sebenar yang sama di permukaan bumi; tidak mempunyai unit kerana kedua-dua nombor dianggap unit yang sama (contohnya 1 cm di atas peta = 100 000 cm di permukaan bumi).\n\nKelebihan: skala yang seragam dan piawai digunakan di seluruh dunia tanpa mengira sistem unit ukuran negara (metrik atau imperial).\n\nCara membaca: 1 cm di atas peta bersamaan dengan 100 000 cm di atas permukaan bumi, iaitu 1 km di permukaan bumi (selepas penukaran unit).\n\nKegunaan: digunakan secara meluas pada peta topografi dan peta rasmi kerajaan.",
        },
        {
          title: "Jadual Perbandingan Jenis Skala",
          table: {
            headers: ["Jenis Skala", "Bentuk", "Kegunaan", "Contoh"],
            rows: [
              [
                "Skala Lurus",
                "Garisan lurus berbahagi sama saiz",
                "Peta yang akan diperbesar/diperkecil",
                "0   1   2   3 km",
              ],
              [
                "Skala Penyata",
                "Ayat pernyataan",
                "Peta lakar dan peta pelancongan",
                "1 cm mewakili 1 km",
              ],
              [
                "Pecahan Wakilan",
                "Nisbah tanpa unit",
                "Peta topografi dan peta rasmi",
                "1 : 100 000",
              ],
            ],
          },
        },
        {
          title: "Penukaran Unit",
          bulletPoints: ["1 km = 1 000 m", "1 m = 100 cm", "1 cm = 10 mm"],
        },
        {
          title: "Fakta Penting",
          content:
            "Nota: Nisbah ialah perbandingan ukuran, perimbangan atau kadar antara dua kuantiti. Semakin besar nombor kedua dalam pecahan wakilan (contoh 1:300 000 berbanding 1:100 000), semakin kecil skala peta tersebut dan semakin luas kawasan yang dapat diliputi.",
        },
        {
          title: "Wajib Hafal",
          bulletPoints: [
            "1 cm di atas peta mewakili 1 km di permukaan bumi (contoh skala penyata biasa).",
            "1 : 100 000 bermakna 1 cm di atas peta mewakili 100 000 cm (1 km) di permukaan bumi.",
            "1 km = 100 000 cm = 1 000 m.",
          ],
        },
      ],
    },
    {
      title: "1.2 Jarak",
      subsections: [
        {
          title: "Maksud Jarak",
          content:
            "Jarak ialah ukuran jauh atau dekatnya sesuatu tempat dengan tempat yang lain. Jarak terbahagi kepada dua jenis utama, iaitu jarak mutlak dan jarak relatif.",
        },
        {
          title: "Jarak Mutlak",
          content:
            "Jarak mutlak ialah jarak yang diukur dalam unit ukuran seperti meter atau kilometer.\n\nCiri-ciri: nilainya tetap dan tidak berubah-ubah walau apa pun cara atau jenis pengangkutan yang digunakan untuk menempuhinya.\n\nUnit ukuran: meter (m) atau kilometer (km).\n\nKelebihan: memberikan ukuran yang tepat dan piawai untuk tujuan perbandingan jarak yang konsisten.\n\nContoh: jarak rumah ke sekolah ialah 2.5 km — nilai ini tetap sama tidak kira sama ada seseorang berjalan kaki, menaiki basikal atau menaiki kereta.",
        },
        {
          title: "Jarak Relatif",
          content:
            "Jarak relatif ialah jarak yang diukur berdasarkan masa, kos atau jenis pengangkutan yang digunakan, bukan ukuran fizikal semata-mata.\n\nBerdasarkan masa: jarak dirasakan 'lebih dekat' atau 'lebih jauh' bergantung kepada tempoh masa perjalanan, contohnya 10 minit menaiki teksi berbanding 40 minit berjalan kaki.\n\nBerdasarkan kos: jarak dirasakan berbeza mengikut perbelanjaan tambang, contohnya RM5.00 menaiki bas berbanding RM16.00 menaiki teksi untuk destinasi yang sama.\n\nBerdasarkan jenis pengangkutan: jarak yang sama boleh dirasakan berbeza bergantung kepada kelajuan dan keselesaan kenderaan yang digunakan (basikal, bas atau teksi).\n\nKelebihan: lebih praktikal dan relevan kepada pengalaman harian sebenar pengguna jalan raya berbanding ukuran mutlak semata-mata.\n\nContoh: rumah Yusrate terletak 2.5 km dari sekolah (jarak mutlak), tetapi mengambil masa 5 minit menaiki teksi, 10 minit menaiki bas dan 16 minit menaiki basikal (jarak relatif).",
        },
        {
          title: "Jadual Perbandingan",
          table: {
            headers: ["Aspek", "Jarak Mutlak", "Jarak Relatif"],
            rows: [
              ["Ukuran", "Unit tetap (m / km)", "Masa, kos atau jenis pengangkutan"],
              ["Nilai", "Tidak berubah", "Boleh berubah mengikut situasi"],
              ["Contoh", "2.5 km dari rumah ke sekolah", "10 minit menaiki bas"],
            ],
          },
        },
        {
          title: "Situasi Kehidupan Harian",
          bulletPoints: [
            "Memilih pengangkutan berdasarkan kos paling murah (jarak relatif kos) walaupun jarak mutlaknya sama bagi semua pilihan.",
            "Merancang waktu keluar rumah berdasarkan anggaran masa perjalanan (jarak relatif masa) supaya tidak terlewat ke sekolah atau tempat kerja.",
            "Membandingkan dua laluan berbeza ke destinasi yang sama untuk memilih laluan yang lebih cepat walaupun jarak mutlaknya lebih panjang.",
          ],
        },
        {
          title: "Fakta Penting",
          content:
            "Nota: Dua tempat yang mempunyai jarak mutlak yang sama boleh mempunyai jarak relatif yang berbeza bergantung kepada jenis pengangkutan, keadaan jalan raya dan kos tambang yang terlibat.",
        },
        {
          title: "Wajib Hafal",
          bulletPoints: [
            "Jarak mutlak = ukuran tetap dalam unit meter/kilometer.",
            "Jarak relatif = ukuran berasaskan masa, kos atau jenis pengangkutan, boleh berubah.",
          ],
        },
      ],
    },
    {
      title: "1.3 Menentukan Jarak Sebenar Menggunakan Skala",
      subsections: [
        {
          title: "Mengukur Jarak Menggunakan Skala Penyata",
          bulletPoints: [
            "Langkah 1: Tandakan kedua-dua tempat (×) di atas peta, contohnya tanda × di sekolah dan di rumah Faiz.",
            "Langkah 2: Lukiskan satu garisan lurus yang menyambungkan kedua-dua tanda × tersebut, kemudian ukur panjang garisan itu menggunakan pembaris (dalam cm).",
            "Langkah 3: Darabkan bacaan jarak di atas peta (cm) dengan nilai skala penyata untuk mendapatkan jarak sebenar.",
          ],
        },
        {
          title: "Mengukur Jarak Menggunakan Skala Lurus",
          bulletPoints: [
            "Langkah 1: Tandakan × di kedua-dua sekolah dan rumah pejabat pos (atau tempat lain yang ingin diukur) menggunakan jangka tolok.",
            "Langkah 2: Letakkan kedua-dua hujung jangka tolok pada kedua-dua tanda × tersebut.",
            "Langkah 3: Pindahkan jangka tolok ke atas garisan skala lurus pada peta lakar tanpa mengubah lebar bukaannya, lalu baca nilai jarak sebenar pada skala.",
          ],
        },
        {
          title: "Mengukur Jarak Lurus",
          bulletPoints: [
            "Pembaris: digunakan untuk mengukur jarak lurus terus di atas peta dalam unit sentimeter.",
            "Jangka tolok: digunakan untuk memindahkan ukuran jarak terus ke garisan skala lurus tanpa mengubah bukaannya.",
            "Jalur kertas: digunakan sebagai alternatif kepada pembaris untuk menanda jarak lurus dan kemudiannya dipindahkan ke skala.",
            "Cara bacaan: pastikan mata berada tepat di atas garis skala (selari) semasa membuat bacaan untuk mengelakkan kesilapan paralaks.",
          ],
        },
        {
          title: "Mengukur Jarak Melengkung",
          bulletPoints: [
            "Benang: diletakkan dan dilenturkan mengikut bentuk lengkok (contohnya sungai atau jalan berliku) dari satu titik ke titik lain, kemudian direntangkan dan diukur menggunakan pembaris.",
            "Jalur kertas: ditanda secara bersela-sela mengikut lengkokan jalan/sungai pada peta, kemudian direntangkan lurus untuk diukur.",
            "Pembaris: digunakan pada akhir proses untuk mengukur panjang benang atau jalur kertas yang telah direntangkan lurus.",
          ],
        },
        {
          title: "Contoh Pengiraan",
          formula: "Jarak Sebenar = Jarak di Peta (cm) × Nilai Skala",
        },
        {
          title: "Contoh Pengiraan 1: Skala Penyata",
          content:
            "Jarak di antara kedua-dua tempat di atas peta ialah 11 cm. Skala peta ialah 1 cm mewakili 1 km.\nJarak sebenar = 11 cm × 1 km = 11 km.",
        },
        {
          title: "Contoh Pengiraan 2: Skala Lurus",
          content:
            "Jangka tolok diletakkan di antara dua tanda × dan dipindahkan ke garis skala lurus sebanyak 6 bahagian, dengan setiap bahagian mewakili 2 km.\nJarak sebenar = 6 × 2 km = 12 km.",
        },
        {
          title: "Contoh Pengiraan 3: Jarak Melengkung (Pecahan Wakilan)",
          content:
            "Benang diletakkan mengikut lengkok Sungai Jernih dari titik C ke titik D, kemudian direntangkan dan diukur menggunakan pembaris sepanjang 8 cm. Skala peta ialah 1 : 100 000 (1 cm mewakili 1 km).\nJarak sebenar = 8 cm × 1 km = 8 km.",
        },
        {
          title: "Kesilapan Lazim Murid",
          bulletPoints: [
            "Tidak menukar unit cm kepada km selepas pengiraan, menyebabkan jawapan ditolak markah.",
            "Tersilap meletakkan jangka tolok pada garis skala sehingga bukaan jangka tolok berubah dan bacaan menjadi tidak tepat.",
            "Tidak merentangkan benang secara lurus sepenuhnya sebelum mengukur, menyebabkan jarak melengkung terkurang anggaran.",
            "Lupa mendarab bilangan bahagian skala lurus dengan nilai sebenar setiap bahagian.",
          ],
        },
        {
          title: "Tip Menjawab Soalan",
          content:
            "Tip: Sentiasa tuliskan formula Jarak Sebenar = Jarak di Peta × Skala terlebih dahulu sebelum menggantikan nombor, kerana markah method kerap diberikan untuk penulisan formula yang betul walaupun jawapan akhir tersilap.",
        },
      ],
    },
    {
      title: "1.4 Menentukan Jarak Sebenar Berpandukan Skala pada Peta",
      subsections: [
        {
          title: "Cara Menentukan Jarak Sebenar",
          bulletPoints: [
            "Kenal pasti dan tandakan kedua-dua lokasi yang ingin diukur di atas peta (contohnya Balai Polis P dan Hospital Q).",
            "Ukur jarak di antara kedua-dua lokasi tersebut di atas peta menggunakan pembaris (untuk jarak lurus) atau benang (untuk jarak melengkung).",
            "Kenal pasti nilai skala peta yang diberikan (skala lurus, skala penyata atau pecahan wakilan).",
            "Darabkan bacaan jarak di atas peta dengan nilai skala untuk mendapatkan jarak sebenar, kemudian tukar unit kepada kilometer jika perlu.",
          ],
        },
        {
          title: "Formula Penting",
          formula: "Jarak Sebenar (km) = Jarak di Atas Peta (cm) × Skala (km bagi setiap cm)",
        },
        {
          title: "Contoh Pengiraan",
          content:
            "Jarak lurus di antara rumah Khairul dengan balai polis ialah 9 cm di atas peta. Skala peta ialah 1 cm mewakili 1 km.\nJarak sebenar = 9 cm × 1 km = 9 km.",
        },
        {
          title: "Tip Peperiksaan",
          content:
            "Tip: Apabila soalan memberikan pecahan wakilan seperti 1:100 000, tukarkan dahulu kepada skala penyata (1 cm mewakili 1 km) sebelum membuat pengiraan akhir supaya unit lebih mudah diuruskan.",
        },
        {
          title: "Kesilapan Lazim Murid",
          bulletPoints: [
            "Mengukur jarak di peta dengan tidak tepat kerana pembaris tidak diletakkan betul-betul pada kedua-dua titik.",
            "Terkeliru antara unit sentimeter (cm) di peta dengan unit kilometer (km) jarak sebenar semasa pengiraan akhir.",
          ],
        },
      ],
    },
    {
      title: "Kemahiran Geografi",
      subsections: [
        {
          title: "Langkah Mengukur Jarak Lurus",
          bulletPoints: [
            "Tandakan kedua-dua titik (×) yang hendak diukur di atas peta.",
            "Letakkan pembaris atau jangka tolok tepat pada kedua-dua tanda tersebut.",
            "Baca dan rekodkan bacaan jarak di atas peta dalam unit sentimeter (cm).",
          ],
        },
        {
          title: "Langkah Mengukur Jarak Melengkung",
          bulletPoints: [
            "Letakkan benang atau jalur kertas pada titik permulaan lengkok (contohnya tepi sungai atau jalan berliku).",
            "Lenturkan benang/jalur kertas mengikut setiap selekoh lengkok sehingga ke titik akhir.",
            "Tandakan titik akhir pada benang/jalur kertas, kemudian rentangkan secara lurus.",
            "Ukur panjang benang/jalur kertas yang telah direntangkan menggunakan pembaris.",
          ],
        },
        {
          title: "Cara Menggunakan Pembaris",
          bulletPoints: [
            "Letakkan tanda 0 cm pembaris tepat pada titik permulaan.",
            "Pastikan pembaris berada selari (lurus) dengan kedua-dua titik yang diukur.",
            "Baca nilai pada penanda yang bertepatan dengan titik akhir.",
          ],
        },
        {
          title: "Cara Menggunakan Benang",
          bulletPoints: [
            "Pegang hujung benang pada titik permulaan lengkok di atas peta.",
            "Ikuti dan lenturkan benang sepanjang laluan lengkok (sungai/jalan) tanpa direntap.",
            "Tandakan kedudukan titik akhir pada benang sebelum merentangkannya untuk diukur.",
          ],
        },
        {
          title: "Cara Menggunakan Jalur Kertas",
          bulletPoints: [
            "Letakkan jalur kertas mengikut lengkok laluan dan tandakan secara bersela-sela (sedikit demi sedikit) mengikut perubahan arah.",
            "Setelah sampai ke titik akhir, luruskan jalur kertas dan ukur jumlah panjangnya menggunakan pembaris.",
          ],
        },
        {
          title: "Aplikasi Kemahiran Geografi",
          bulletPoints: [
            "Digunakan untuk membaca peta topografi, peta pelancongan dan peta laluan dalam kehidupan harian.",
            "Menjadi asas penting sebelum mempelajari kemahiran membaca Peta Topografi (Bab 2) yang melibatkan pengiraan jarak yang lebih kompleks.",
            "Membantu kerja lapangan geografi seperti mengukur jarak sebenar di antara dua ciri geografi yang dikaji.",
          ],
        },
      ],
    },
    {
      title: "Formula Bank",
      subsections: [
        {
          title: "Formula Utama",
          formula: "Jarak Sebenar = Jarak di Peta × Skala",
        },
        {
          title: "Maksud Simbol",
          table: {
            headers: ["Simbol / Istilah", "Maksud"],
            rows: [
              ["Jarak Sebenar", "Jarak benar di permukaan bumi (biasanya dalam km)"],
              ["Jarak di Peta", "Jarak yang diukur di atas peta menggunakan pembaris/benang (dalam cm)"],
              ["Skala", "Nilai nisbah/pernyataan yang mewakili setiap 1 cm di peta (contoh: 1 cm mewakili 1 km)"],
            ],
          },
        },
        {
          title: "Contoh Penggunaan Formula 1",
          content:
            "Diberi: Jarak di peta = 11 cm, Skala = 1 cm mewakili 1 km.\nLangkah 1: Jarak Sebenar = Jarak di Peta × Skala.\nLangkah 2: Jarak Sebenar = 11 cm × 1 km.\nLangkah 3: Jarak Sebenar = 11 km.",
        },
        {
          title: "Contoh Penggunaan Formula 2",
          content:
            "Diberi: Jangka tolok mewakili 6 bahagian skala lurus, setiap bahagian = 2 km.\nLangkah 1: Jarak Sebenar = Bilangan Bahagian × Nilai Setiap Bahagian.\nLangkah 2: Jarak Sebenar = 6 × 2 km.\nLangkah 3: Jarak Sebenar = 12 km.",
        },
        {
          title: "Contoh Penggunaan Formula 3",
          content:
            "Diberi: Jarak melengkung (benang direntang) = 8 cm, Skala = 1:100 000 (1 cm mewakili 1 km).\nLangkah 1: Jarak Sebenar = Jarak di Peta × Skala.\nLangkah 2: Jarak Sebenar = 8 cm × 1 km.\nLangkah 3: Jarak Sebenar = 8 km.",
        },
      ],
    },
    {
      title: "Kesalahan Lazim Murid",
      subsections: [
        {
          title: "Kesalahan Sering Dilakukan",
          bulletPoints: [
            "Tidak menyertakan unit (km) pada jawapan akhir pengiraan jarak sebenar.",
            "Mengubah bukaan jangka tolok semasa memindahkannya daripada peta ke garis skala lurus.",
            "Tidak merentangkan benang secara lurus sepenuhnya semasa mengukur jarak melengkung, menyebabkan jawapan terlalu kecil.",
            "Mengelirukan jarak mutlak dengan jarak relatif semasa menjawab soalan definisi.",
            "Terlupa menukar unit (cm ke km, atau m ke km) sebelum menulis jawapan akhir.",
          ],
        },
        {
          title: "Cara Mengelakkan Kesalahan",
          bulletPoints: [
            "Sentiasa semak unit skala (cm, m atau km) sebelum membuat sebarang pengiraan.",
            "Pegang jangka tolok dengan stabil dan jangan tekan terlalu kuat semasa memindahkannya ke garis skala.",
            "Gunakan jalur kertas sebagai alternatif benang jika benang sukar dikawal semasa mengukur lengkok.",
            "Tuliskan semula maksud jarak mutlak dan jarak relatif dalam ayat sendiri sebagai latihan ingatan.",
          ],
        },
        {
          title: "Tips Mendapatkan Markah Penuh",
          bulletPoints: [
            "Tuliskan formula penuh sebelum menggantikan nilai nombor (markah method).",
            "Tunjukkan langkah pengiraan secara berperingkat, bukan terus kepada jawapan akhir.",
            "Pastikan jawapan akhir mempunyai unit yang betul (km), bukan cm.",
            "Bundarkan jawapan kepada satu tempat perpuluhan jika perlu, mengikut arahan soalan.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Skala ialah nisbah jarak di atas peta berbanding jarak sebenar di permukaan bumi.",
    "Tiga jenis skala: skala lurus, skala penyata dan pecahan wakilan (PW).",
    "1 cm di atas peta mewakili 1 km di permukaan bumi ialah contoh skala penyata yang biasa digunakan.",
    "1 : 100 000 bermakna 1 cm di atas peta mewakili 100 000 cm (1 km) di permukaan bumi.",
    "1 km = 1 000 m = 100 000 cm.",
    "Jarak mutlak diukur dalam unit (m/km) dan nilainya tetap.",
    "Jarak relatif diukur berdasarkan masa, kos atau jenis pengangkutan dan boleh berubah.",
    "Jarak lurus diukur menggunakan pembaris, jangka tolok atau jalur kertas.",
    "Jarak melengkung diukur menggunakan benang atau jalur kertas yang dilenturkan mengikut lengkok.",
    "Formula utama: Jarak Sebenar = Jarak di Peta × Skala.",
    "Jangka tolok digunakan untuk memindahkan ukuran jarak terus ke garisan skala lurus tanpa mengubah bukaannya.",
    "Benang dan jalur kertas perlu direntangkan lurus sebelum diukur menggunakan pembaris bagi jarak melengkung.",
  ],
  keyTerms: [
    "Skala",
    "Skala Lurus",
    "Skala Penyata",
    "Pecahan Wakilan",
    "Nisbah",
    "Jarak Mutlak",
    "Jarak Relatif",
    "Jangka Tolok",
    "Jalur Kertas",
    "Jarak Lurus",
    "Jarak Melengkung",
    "Kemahiran Geografi",
  ],
};
