import type { StructuredNotes } from "@/data/types";

export const mathF3C9NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 9 Garis Lurus membantu murid memahami perkaitan antara persamaan y=mx+c dengan kecerunan dan pintasan-y, menukar bentuk persamaan garis lurus (ax+by=c, x/a+y/b=1, y=mx+c), menyiasat hubungan titik dengan garis lurus, menentukan kecerunan garis selari, menentukan persamaan garis lurus, dan mencari titik persilangan dua garis lurus.",
  quickRevision: [
    "Bentuk y=mx+c: m ialah kecerunan, c ialah pintasan-y.",
    "Bentuk x/a+y/b=1: a ialah pintasan-x, b ialah pintasan-y.",
    "Kecerunan = -(pintasan-y/pintasan-x) bagi bentuk ax+by=c.",
    "Garis lurus y=h selari paksi-x (kecerunan=0); garis x=h selari paksi-y (kecerunan tak tertakrif).",
    "Dua garis lurus selari jika dan hanya jika kecerunan kedua-duanya sama.",
    "Titik (x,y) terletak pada garis lurus jika ia memenuhi persamaan garis itu (kiri=kanan).",
    "Titik persilangan dua garis: selesaikan secara serentak (penggantian/penghapusan) atau lukis graf.",
  ],
  keyExamFacts: [
    "y=mx+c: m=kecerunan, c=pintasan-y.",
    "x/a+y/b=1: a=pintasan-x, b=pintasan-y.",
    "Dua garis selari ⟺ kecerunan sama.",
    "Garis y=h: kecerunan=0 (selari paksi-x); garis x=h: kecerunan tak tertakrif (selari paksi-y).",
    "Titik pada garis: gantikan koordinat, semak kiri=kanan persamaan.",
    "Persamaan garis melalui 2 titik: m=(y2-y1)/(x2-x1), kemudian guna y=mx+c untuk cari c.",
  ],
  keyTerms: ["kecerunan", "pintasan-y", "pintasan-x", "garis selari", "persamaan serentak", "titik persilangan"],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Membuat perkaitan antara persamaan y=mx+c dengan kecerunan dan pintasan-y.",
            "Menyiasat dan mentafsir persamaan garis lurus dalam bentuk lain (ax+by=c, x/a+y/b=1) dan menukar kepada y=mx+c.",
            "Menyiasat hubungan antara titik pada garis lurus dengan persamaan garis lurus.",
            "Menyiasat dan membuat inferens tentang kecerunan garis selari.",
            "Menentukan persamaan suatu garis lurus.",
            "Menentukan titik persilangan bagi dua garis lurus.",
          ],
        },
      ],
    },
    {
      title: "9.1 Garis Lurus",
      subsections: [
        {
          title: "Persamaan y=mx+c - Penerangan Ringkas",
          content:
            "Bagi fungsi linear y=mx+c, m ialah kecerunan dan c ialah pintasan-y garis lurus. Graf bagi y=mx+c sentiasa satu garis lurus.",
        },
        {
          title: "Formula",
          formula: "y = mx + c\nm = kecerunan, c = pintasan-y\nGaris y=h selari paksi-x (m=0); garis x=h selari paksi-y (m tak tertakrif)",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Tentukan kecerunan dan pintasan-y bagi y=2x+9.", "Banding dengan y=mx+c", "m=2, c=9"],
              ["Tentukan kecerunan dan pintasan-y bagi 3y=-2x+12.", "Bahagi dengan 3: y=-2/3x+4", "m=-2/3, c=4"],
              ["Graf garis y=6 (selari paksi-x). Nyatakan h.", "Garis sentiasa berjarak 6 unit dari paksi-x", "h=6"],
            ],
          },
        },
        {
          title: "Bentuk ax+by=c dan x/a+y/b=1 - Penerangan Ringkas",
          content:
            "Bagi bentuk x/a+y/b=1, a ialah pintasan-x dan b ialah pintasan-y. Persamaan ini boleh ditukar kepada y=mx+c dan sebaliknya melalui manipulasi algebra.",
        },
        {
          title: "Formula",
          formula: "x/a + y/b = 1\na = pintasan-x, b = pintasan-y",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Tukar 2x+3y=12 kepada bentuk x/a+y/b=1.", "Bahagi setiap sebutan dengan 12: x/6+y/4=1", "x/6 + y/4 = 1"],
              ["Tukar 2x+3y=12 kepada y=mx+c.", "3y=-2x+12, y=-2/3x+4", "y = -2/3x + 4"],
              ["Tukar x/6+y/3=1 kepada ax+by=c.", "Darab dengan 18 (gcd penyebut): 3x+6y=18, mudahkan: x+2y=6", "x + 2y = 6"],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Pekali y dalam y=mx+c mesti +1; selaras pembahagi/pendaraban untuk mendapatkannya.",
            "Bagi x/a+y/b=1, a dan b boleh dikenal pasti terus tanpa pengiraan tambahan sebagai pintasan-x dan pintasan-y.",
            "Tukar antara bentuk dengan teliti mengikut langkah algebra (bahagi/darab kedua belah dengan nombor sama).",
          ],
        },
        {
          title: "Titik pada Garis Lurus - Penerangan Ringkas",
          content:
            "Suatu titik terletak pada garis lurus jika menggantikan koordinatnya ke dalam persamaan garis itu menghasilkan kedua belah (kiri dan kanan) bersamaan.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Tentukan jika P(2,8) terletak pada y=3x+2.", "Kanan=3(2)+2=8; Kiri=8", "Ya, sama (8=8), P terletak pada garis"],
              ["Tentukan jika P(-4,2) terletak pada 3x-2y=12.", "Kiri=3(-4)-2(2)=-16; Kanan=12", "Tidak, -16≠12, P tidak terletak pada garis"],
            ],
          },
        },
        {
          title: "Kecerunan Garis Selari - Penerangan Ringkas",
          content:
            "Garis lurus yang mempunyai kecerunan yang sama adalah selari. Sebaliknya, jika dua garis selari, kecerunan kedua-duanya mesti sama.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Adakah y=3x+5 selari dengan 6x-2y=9?", "6x-2y=9 -> y=3x-4.5; bandingkan kecerunan 3 dan 3", "Ya, selari (kecerunan sama=3)"],
              ["4x+3y=18 selari dengan 2x+hy=20. Cari h.", "Kecerunan 1: -4/3; Kecerunan 2: -2/h; samakan: -4/3=-2/h", "h = 3/2"],
            ],
          },
        },
        {
          title: "Menentukan Persamaan Garis Lurus - Penerangan Ringkas",
          content:
            "Persamaan garis lurus boleh ditentukan apabila kecerunan dan satu titik diketahui, atau apabila dua titik pada garis diketahui (cari kecerunan dahulu menggunakan formula kecerunan).",
        },
        {
          title: "Formula",
          formula: "y = mx + c\nm = (y2-y1)/(x2-x1) untuk dua titik (x1,y1) dan (x2,y2)",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Cari persamaan garis kecerunan 1/2 melalui P(6,8).", "8=(1/2)(6)+c; 8=3+c; c=5", "y = (1/2)x + 5"],
              ["Cari persamaan garis melalui P(-1,5) dan Q(2,-7).", "m=(-7-5)/(2-(-1))=-12/3=-4; 5=(-4)(-1)+c; c=1", "y = -4x + 1"],
              ["Cari persamaan garis selari dengan y=-2x+6 melalui P(5,4).", "m=-2 (sama); 4=(-2)(5)+c; c=14", "y = -2x + 14"],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Garis selari dengan paksi-x: bentuk y=h, kecerunan=0.",
            "Garis selari dengan paksi-y: bentuk x=h, kecerunan tak tertakrif.",
            "Untuk garis selari dengan garis diberi, gunakan kecerunan yang sama, kemudian cari c menggunakan titik yang diberi.",
          ],
        },
        {
          title: "Menentukan Titik Persilangan Dua Garis Lurus - Penerangan Ringkas",
          content:
            "Titik persilangan dua garis lurus boleh ditentukan melalui (a) graf pada satah Cartes yang sama, atau (b) penyelesaian persamaan serentak menggunakan kaedah penggantian atau penghapusan.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Cari titik persilangan 2x+y=5 dan x+2y=1.",
                "Daripada (1): y=5-2x; gantikan ke (2): x+2(5-2x)=1; x+10-4x=1; -3x=-9; x=3; y=5-2(3)=-1",
                "Titik persilangan (3, -1)",
              ],
            ],
          },
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Tertinggal menukar pekali y kepada +1 sebelum membaca nilai kecerunan dan pintasan-y.",
            "Mengelirukan pintasan-x dengan pintasan-y semasa menggunakan bentuk x/a+y/b=1.",
            "Tersilap tanda semasa mengira kecerunan menggunakan formula (y2-y1)/(x2-x1).",
            "Tidak menyemak jawapan titik persilangan dengan menggantikan semula ke kedua-dua persamaan asal.",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Sentiasa tukar persamaan kepada bentuk y=mx+c terlebih dahulu untuk mengenal pasti kecerunan dengan cepat.",
            "Gunakan kaedah penghapusan jika pekali pemboleh ubah mudah disamakan; gunakan penggantian jika satu pemboleh ubah mudah diasingkan.",
            "Sahkan jawapan akhir dengan menggantikan semula ke dalam persamaan asal.",
          ],
        },
        {
          title: "Aplikasi Kehidupan Sebenar",
          bulletPoints: [
            "Konsep garis lurus digunakan dalam pembinaan bentuk geometri seperti segi empat sama, segi tiga dan lelayang.",
            "Digunakan dalam kejuruteraan, arkitek, pembinaan, pemetaan dan sains.",
            "Menara Jam Condong Teluk Intan ialah contoh struktur garis condong yang menarik dalam sejarah Malaysia.",
          ],
        },
        {
          title: "Ringkasan",
          bulletPoints: [
            "y=mx+c: m=kecerunan, c=pintasan-y.",
            "x/a+y/b=1: a=pintasan-x, b=pintasan-y.",
            "Titik pada garis: gantikan koordinat, semak kesamaan kiri=kanan.",
            "Garis selari: kecerunan sama.",
            "Persamaan garis: guna kecerunan + satu titik, atau dua titik untuk cari m dahulu.",
            "Titik persilangan: selesaikan persamaan serentak (penggantian/penghapusan) atau lukis graf.",
          ],
        },
      ],
    },
  ],
};
