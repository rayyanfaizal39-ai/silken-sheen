import type { StructuredNotes } from "@/data/types";

export const mathF3C8NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 8 Lokus dalam Dua Dimensi membantu murid mengenal lokus dalam situasi kehidupan sebenar, memerihalkan lokus bagi titik berjarak tetap daripada titik tetap, lokus bagi titik berjarak sama daripada dua titik tetap, lokus bagi titik berjarak tetap daripada garis lurus, lokus berjarak sama daripada dua garis selari atau bersilang, serta menentukan lokus yang memenuhi dua atau lebih syarat serentak.",
  quickRevision: [
    "Lokus ialah surihan/lintasan satu set titik dalam satu satah yang memenuhi syarat tertentu.",
    "Lokus titik berjarak tetap dari satu titik tetap = bulatan berpusat titik tetap itu.",
    "Lokus titik berjarak sama dari dua titik tetap = pembahagi dua sama serenjang garis yang menyambung dua titik itu.",
    "Lokus titik berjarak tetap dari satu garis lurus = sepasang garis selari dengan garis itu.",
    "Lokus titik berjarak sama dari dua garis selari = satu garis lurus selari di tengah-tengah kedua garis itu.",
    "Lokus titik berjarak sama dari dua garis bersilang = pembahagi dua sama sudut antara dua garis itu.",
    "Persilangan dua atau lebih lokus ditentukan dengan melukis semua lokus pada rajah yang sama.",
  ],
  keyExamFacts: [
    "Lokus titik jarak tetap dari titik tetap = bulatan.",
    "Lokus titik jarak sama dari 2 titik tetap = pembahagi dua sama serenjang.",
    "Lokus titik jarak tetap dari garis lurus = sepasang garis selari.",
    "Lokus titik jarak sama dari 2 garis selari = garis selari di tengah.",
    "Lokus titik jarak sama dari 2 garis bersilang = pembahagi dua sama sudut.",
    "Lokus 3D: bentuk 2D diputar 360° mengeliling paksi menghasilkan bentuk putaran (silinder, sfera, dll.).",
  ],
  keyTerms: ["lokus", "berjarak sama", "pembahagi dua sama serenjang", "pembahagi dua sudut", "lengkok", "lengkung"],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengenal lokus dalam situasi kehidupan sebenar dan menerangkan maksud lokus.",
            "Memerihalkan lokus bagi titik yang berjarak tetap dari satu titik tetap.",
            "Memerihalkan lokus bagi titik yang berjarak sama dari dua titik tetap.",
            "Memerihalkan lokus bagi titik yang berjarak tetap dari satu garis lurus.",
            "Memerihalkan lokus bagi titik yang berjarak sama dari dua garis lurus selari atau bersilang.",
            "Menentukan lokus yang memenuhi dua atau lebih syarat.",
          ],
        },
      ],
    },
    {
      title: "8.1 Lokus",
      subsections: [
        {
          title: "Penerangan Ringkas",
          content:
            "Lokus ialah satu surihan atau lintasan oleh satu set titik dalam satu satah atau ruang tiga dimensi yang memenuhi syarat-syarat tertentu. Lokus dua dimensi boleh berbentuk garis lurus, lengkok atau lengkung.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Situasi", "Lokus Terhasil"],
            rows: [
              ["Titik pada sayap kipas berputar", "Bulatan"],
              ["Titik pada roket dilancarkan menegak", "Garis lurus"],
              ["Titik pada bandul yang berayun", "Lengkok"],
              ["Sisi PQ diputar 360° mengeliling tiang MN", "Silinder tegak (3D)"],
              ["Papan semi bulatan diputar 360° mengeliling tiang MN", "Sfera (3D)"],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Lokus tiga dimensi terhasil apabila bentuk dua dimensi diputar 360° mengelilingi suatu paksi/tiang.",
            "Bentuk lokus 3D biasa: silinder (segi empat tepat diputar), sfera (semi bulatan diputar), kon (segi tiga bersudut tegak diputar).",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Tidak mengenal pasti syarat pergerakan dengan tepat sebelum melakar lokus.",
            "Mengelirukan lokus dua dimensi dengan laluan sebenar objek tiga dimensi.",
          ],
        },
      ],
    },
    {
      title: "8.2 Lokus dalam Dua Dimensi",
      subsections: [
        {
          title: "Lokus Jarak Tetap daripada Satu Titik Tetap - Penerangan Ringkas",
          content:
            "Lokus bagi suatu titik yang sentiasa berjarak tetap dari satu titik tetap ialah sebuah bulatan berpusat di titik tetap itu, dengan jejari bersamaan jarak tetap tersebut.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Bina lokus titik P berjarak 3cm dari titik tetap O.", "Lukis bulatan jejari 3cm berpusat O", "Bulatan berjejari 3cm berpusat di O"],
              ["X berjarak 3cm dari titik P. Huraikan lokus X.", "Lokus = bulatan jejari 3cm berpusat P", "Bulatan berjejari 3cm berpusat di titik P"],
            ],
          },
        },
        {
          title: "Lokus Jarak Sama daripada Dua Titik Tetap - Penerangan Ringkas",
          content:
            "Lokus bagi suatu titik yang berjarak sama dari dua titik tetap ialah pembahagi dua sama serenjang bagi garis yang menyambungkan dua titik tetap itu.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Bina lokus P berjarak sama dari M dan N.", "Lukis pembahagi dua sama serenjang bagi MN", "Garis lurus berserenjang melalui titik tengah MN"],
              ["X berjarak sama dari P dan R (segi tiga sama sisi PQR).", "Pembahagi dua sama serenjang PR", "Garis pembahagi dua sama serenjang bagi PR"],
            ],
          },
        },
        {
          title: "Lokus Jarak Tetap daripada Satu Garis Lurus - Penerangan Ringkas",
          content:
            "Lokus bagi suatu titik yang sentiasa sama jarak dari satu garis lurus ialah sepasang garis lurus yang selari dengan garis lurus itu, satu di setiap sisi pada jarak tetap tersebut.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Lukis lokus X yang bergerak 3 unit dari garis AB.", "Lukis dua garis selari AB pada jarak 3 unit di setiap sisi", "Sepasang garis selari AB, berjarak 3 unit"],
              ["T berjarak 1.5cm dari garis CD (panjang 6cm).", "Dua garis selari CD pada jarak 1.5cm", "Sepasang garis selari dengan CD, jarak 1.5cm"],
            ],
          },
        },
        {
          title: "Lokus Jarak Sama daripada Dua Garis Selari - Penerangan Ringkas",
          content:
            "Lokus bagi suatu titik yang berjarak sama dari dua garis selari ialah satu garis lurus yang selari dengan kedua-dua garis itu dan melalui titik tengah jarak antara keduanya.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Lukis lokus X berjarak sama dari AB dan DC (segi empat tepat ABCD).", "Garis selari di tengah-tengah AB dan DC", "Satu garis lurus selari AB & DC, di tengah-tengah"],
            ],
          },
        },
        {
          title: "Lokus Jarak Sama daripada Dua Garis Bersilang - Penerangan Ringkas",
          content:
            "Lokus bagi suatu titik yang berjarak sama dari dua garis lurus yang bersilang ialah garis lurus yang membahagi dua sama sudut yang dibentuk oleh dua garis tersebut (pembahagi dua sudut).",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Bina lokus X berjarak sama dari PQ dan PN (bersilang di P).", "Bina pembahagi dua sudut ∠QPN", "Garis lurus membahagi dua sama ∠QPN"],
              ["Y berjarak sama dari AB dan AD (segi empat sama ABCD).", "Pembahagi dua ∠BAD", "Garis lurus membahagi dua sama ∠BAD"],
            ],
          },
        },
        {
          title: "Menentukan Lokus dengan Dua atau Lebih Syarat - Penerangan Ringkas",
          content:
            "Apabila terdapat dua syarat atau lebih, lukis setiap lokus secara berasingan pada rajah yang sama, kemudian kenal pasti titik persilangan antara lokus-lokus tersebut.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "X berjarak 7 unit dari A; Y berjarak sama dari AB dan CD. Tandakan persilangan.",
                "Lukis lokus X (bulatan jejari 7 unit pusat A) dan lokus Y (garis selari di tengah AB,CD) pada rajah sama",
                "Tanda titik persilangan dengan simbol ⊗",
              ],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Sentiasa kenal pasti jenis lokus (bulatan, pembahagi dua serenjang, garis selari, pembahagi dua sudut) berdasarkan syarat yang diberi sebelum melukis.",
            "Bagi syarat gabungan, lukis kedua-dua lokus pada rajah yang sama untuk mengenal pasti persilangan dengan tepat.",
            "Gunakan jangka lukis dan pembaris dengan tepat untuk membina lokus secara geometri (bukan anggaran).",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Melukis bulatan penuh apabila sepatutnya hanya lengkok dalam kawasan terhad (contoh dalam segi empat sama).",
            "Tersilap mengenal pasti garis pembahagi dua sudut sebagai pembahagi dua serenjang, atau sebaliknya.",
            "Lupa lokus jarak tetap dari garis lurus menghasilkan SEPASANG garis (bukan satu garis sahaja).",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Baca syarat lokus dengan teliti: 'jarak tetap dari satu titik' (bulatan) berbeza dengan 'jarak sama dari dua titik' (pembahagi dua serenjang).",
            "Apabila lokus terhad pada suatu kawasan (contoh dalam segi empat sama), pastikan hanya lukis bahagian lokus dalam kawasan tersebut.",
            "Untuk soalan koordinat (paksi-x, paksi-y), gunakan sifat pembahagi dua sudut paksi (45°) untuk mengenal pasti lokus.",
          ],
        },
        {
          title: "Aplikasi Kehidupan Sebenar",
          bulletPoints: [
            "Menganggar/meramal jarak pergerakan atau lokasi berdasarkan syarat tertentu (contoh: laluan bot, kedudukan seseorang).",
            "Digunakan dalam bidang pembinaan, lukisan kejuruteraan, penerbangan dan pergerakan satelit.",
            "Permainan badminton dan sukan lain menggunakan konsep lokus untuk menganalisis pergerakan.",
          ],
        },
        {
          title: "Ringkasan",
          bulletPoints: [
            "Lokus titik jarak tetap dari titik tetap = bulatan.",
            "Lokus titik jarak sama dari 2 titik tetap = pembahagi dua sama serenjang.",
            "Lokus titik jarak tetap dari garis lurus = sepasang garis selari.",
            "Lokus titik jarak sama dari 2 garis selari = garis selari di tengah.",
            "Lokus titik jarak sama dari 2 garis bersilang = pembahagi dua sudut.",
            "Lokus gabungan: lukis semua syarat pada rajah sama, kenal pasti persilangan.",
          ],
        },
      ],
    },
  ],
};
