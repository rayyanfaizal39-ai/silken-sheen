import type { StructuredNotes } from "./types";

export const scienceF1C8NotesBM: StructuredNotes = {
  quickRevision: [
    "Cahaya ialah satu bentuk tenaga yang membolehkan kita melihat objek di sekeliling kita.",
    "Cahaya bergerak dalam garis lurus, bergerak lebih laju daripada bunyi dan boleh bergerak melalui vakum.",
    "Cermin satah menghasilkan imej tegak, maya, songsang sisi dan sama saiz dengan objek.",
    "Pantulan berlaku apabila cahaya dipantulkan oleh permukaan, dan sudut tuju sama dengan sudut pantulan.",
    "Pembiasan ialah pembengkokan cahaya apabila bergerak melalui medium yang berlainan ketumpatan.",
    "Penyebaran memisahkan cahaya putih kepada tujuh warna: merah, jingga, kuning, hijau, biru, indigo dan ungu.",
    "Alat optik seperti periskop, kaleidoskop dan jam matahari menggunakan sifat cahaya.",
  ],
  sections: [
    {
      title: "8.1 Pengenalan kepada Cahaya",
      subsections: [
        {
          title: "Definisi Cahaya",
          content:
            "Cahaya ialah satu bentuk tenaga yang membolehkan kita melihat objek di sekeliling kita.",
        },
        {
          title: "Sifat Cahaya",
          bulletPoints: [
            "Bergerak dalam garis lurus.",
            "Bergerak lebih laju daripada bunyi.",
            "Kelajuan cahaya = 3.0 x 10^8 m/s.",
            "Boleh bergerak melalui vakum.",
          ],
        },
        {
          title: "Pembentukan Bayang-bayang",
          bulletPoints: [
            "Bayang-bayang terbentuk apabila cahaya dihalang oleh objek legap.",
            "Panjang bayang berubah mengikut kedudukan Matahari.",
            "Bayang paling pendek berlaku pada waktu tengah hari.",
          ],
        },
      ],
    },
    {
      title: "8.2 Cermin dan Imej",
      subsections: [
        {
          title: "Jenis Imej",
          table: {
            headers: ["Jenis Imej", "Ciri", "Contoh"],
            rows: [
              ["Imej sahih", "Boleh terbentuk pada skrin", "Imej projektor"],
              ["Imej maya", "Tidak boleh terbentuk pada skrin", "Imej dalam cermin"],
            ],
          },
        },
        {
          title: "Cermin Satah",
          bulletPoints: [
            "Imej tegak.",
            "Imej maya.",
            "Imej songsang sisi.",
            "Saiz imej sama dengan objek.",
            "Jarak imej sama dengan jarak objek.",
            "Digunakan di studio tarian, lif dan cermin pakaian.",
          ],
        },
        {
          title: "Cermin Cekung",
          bulletPoints: [
            "Membesarkan imej.",
            "Menjadikan objek kelihatan lebih besar.",
            "Digunakan sebagai cermin doktor gigi dan cermin solekan.",
          ],
        },
        {
          title: "Cermin Cembung",
          bulletPoints: [
            "Mempunyai kawasan penglihatan yang lebih luas.",
            "Digunakan sebagai cermin keselamatan jalan raya, cermin keselamatan pasar raya dan cermin basikal.",
          ],
        },
      ],
    },
    {
      title: "8.3 Pantulan Cahaya",
      subsections: [
        {
          title: "Definisi",
          content: "Pantulan berlaku apabila cahaya dipantulkan oleh permukaan.",
        },
        {
          title: "Hukum Pantulan",
          bulletPoints: [
            "Sinar tuju, sinar pantulan dan garis normal berada pada satah yang sama.",
            "Sudut tuju sama dengan sudut pantulan.",
          ],
          formula: "i = r",
        },
        {
          title: "Aplikasi",
          bulletPoints: ["Papan tanda pemantul", "Jaket keselamatan"],
        },
      ],
    },
    {
      title: "8.4 Pembiasan Cahaya",
      subsections: [
        {
          title: "Definisi",
          content:
            "Pembiasan ialah pembengkokan cahaya apabila bergerak melalui medium yang berlainan ketumpatan.",
        },
        {
          title: "Prinsip Pembiasan",
          table: {
            headers: ["Keadaan", "Kesan"],
            rows: [
              ["Kurang tumpat ke lebih tumpat", "Cahaya terbias mendekati garis normal"],
              ["Lebih tumpat ke kurang tumpat", "Cahaya terbias menjauhi garis normal"],
              ["Sepanjang garis normal", "Tiada pembiasan berlaku"],
            ],
          },
        },
        {
          title: "Kesan Pembiasan",
          bulletPoints: [
            "Kolam kelihatan lebih cetek.",
            "Pensel kelihatan bengkok dalam air.",
            "Ikan kelihatan lebih dekat dengan permukaan.",
          ],
        },
      ],
    },
    {
      title: "8.5 Penyebaran Cahaya",
      subsections: [
        {
          title: "Definisi",
          content:
            "Penyebaran ialah pengasingan cahaya putih kepada tujuh warna menggunakan prisma.",
        },
        {
          title: "Spektrum Warna",
          bulletPoints: ["Merah", "Jingga", "Kuning", "Hijau", "Biru", "Indigo", "Ungu"],
        },
        {
          title: "Ciri-ciri",
          bulletPoints: [
            "Cahaya merah paling kurang dibiaskan.",
            "Cahaya ungu paling banyak dibiaskan.",
          ],
        },
        {
          title: "Pembentukan Pelangi",
          content:
            "Pelangi terbentuk apabila cahaya matahari dibiaskan dan disebarkan oleh titisan air hujan.",
        },
      ],
    },
    {
      title: "8.6 Penyerakan Cahaya",
      subsections: [
        {
          title: "Definisi",
          content:
            "Penyerakan berlaku apabila cahaya dipantulkan ke semua arah oleh zarah dalam atmosfera.",
        },
        {
          title: "Langit Tengah Hari",
          bulletPoints: [
            "Cahaya biru diserakkan paling banyak.",
            "Langit kelihatan biru.",
          ],
        },
        {
          title: "Langit Senja",
          bulletPoints: [
            "Cahaya biru banyak diserakkan.",
            "Cahaya merah dan jingga sampai ke mata.",
            "Langit kelihatan kemerahan.",
          ],
        },
      ],
    },
    {
      title: "8.7 Penambahan dan Penolakan Cahaya",
      subsections: [
        {
          title: "Penambahan Cahaya",
          table: {
            headers: ["Gabungan Cahaya", "Hasil"],
            rows: [
              ["Merah + Biru", "Magenta"],
              ["Merah + Hijau", "Kuning"],
              ["Biru + Hijau", "Sian"],
              ["Merah + Hijau + Biru", "Putih"],
            ],
          },
        },
        {
          title: "Penolakan Cahaya",
          table: {
            headers: ["Objek", "Kesan"],
            rows: [
              ["Objek putih", "Memantulkan semua warna"],
              ["Objek hitam", "Menyerap semua warna"],
              ["Objek warna primer", "Memantulkan warna sendiri"],
              ["Objek warna sekunder", "Memantulkan warna sendiri dan warna pembentuknya"],
            ],
          },
        },
        {
          title: "Penapis Warna",
          table: {
            headers: ["Penapis", "Kesan"],
            rows: [
              ["Penapis primer", "Membenarkan warna sendiri sahaja melaluinya"],
              ["Penapis sekunder", "Membenarkan warna sendiri dan warna pembentuknya melaluinya"],
            ],
          },
        },
      ],
    },
    {
      title: "8.8 Alat Optik",
      subsections: [
        {
          title: "Periskop",
          bulletPoints: [
            "Menggunakan dua cermin satah.",
            "Cermin diletakkan pada sudut 45 darjah.",
            "Digunakan dalam kapal selam.",
          ],
        },
        {
          title: "Kaleidoskop",
          bulletPoints: [
            "Menggunakan pantulan berulang.",
            "Menghasilkan corak berwarna-warni yang menarik.",
          ],
        },
        {
          title: "Jam Matahari",
          bulletPoints: [
            "Menggunakan pembentukan bayang-bayang.",
            "Menganggarkan masa berdasarkan kedudukan bayang.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Cahaya ialah satu bentuk tenaga dan bergerak dalam garis lurus.",
    "Imej sahih boleh terbentuk pada skrin, tetapi imej maya tidak boleh terbentuk pada skrin.",
    "Cermin satah menghasilkan imej tegak, maya dan songsang sisi.",
    "Dalam pantulan, sudut tuju sama dengan sudut pantulan.",
    "Cahaya terbias mendekati garis normal apabila bergerak dari medium kurang tumpat ke medium lebih tumpat.",
    "Cahaya putih tersebar kepada tujuh warna melalui prisma.",
    "Cahaya biru diserakkan paling banyak, menyebabkan langit tengah hari kelihatan biru.",
  ],
  keyTerms: [
    "Cahaya",
    "Bayang-bayang",
    "Objek legap",
    "Imej sahih",
    "Imej maya",
    "Cermin satah",
    "Cermin cekung",
    "Cermin cembung",
    "Pantulan",
    "Pembiasan",
    "Penyebaran",
    "Spektrum",
    "Penyerakan",
    "Warna primer",
    "Warna sekunder",
    "Penapis warna",
    "Periskop",
    "Kaleidoskop",
    "Jam matahari",
  ],
  chapterSummary:
    "Bab 8 menerangkan sifat cahaya, pembentukan bayang-bayang, cermin dan imej, pantulan, pembiasan, penyebaran, penyerakan, penambahan dan penolakan cahaya, penapis warna serta alat optik.",
};
