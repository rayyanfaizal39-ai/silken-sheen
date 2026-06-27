import type { StructuredNotes } from "@/data/types";

export const mathF3C6NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 6 Sudut dan Tangen bagi Bulatan membantu murid memahami sudut pada lilitan dan sudut pusat yang dicangkum oleh lengkok, sifat sisi empat kitaran, sifat tangen kepada bulatan termasuk sudut antara tangen dan jejari serta sudut tembereng selang-seli, dan menyelesaikan masalah yang melibatkan sudut dan tangen bulatan.",
  quickRevision: [
    "Sudut pada lilitan yang dicangkum oleh lengkok yang sama adalah sama besar.",
    "Sudut pada pusat bulatan = 2 x sudut pada lilitan yang dicangkum oleh lengkok yang sama.",
    "Sudut pada lilitan yang dicangkum oleh diameter ialah 90°.",
    "Hasil tambah sudut pedalaman bertentangan dalam sisi empat kitaran ialah 180°.",
    "Sudut peluaran sisi empat kitaran = sudut pedalaman bertentangan yang sepadan.",
    "Tangen berserenjang (90°) dengan jejari pada titik ketangenan.",
    "Dua tangen daripada satu titik luar adalah sama panjang; sudut yang dibentuk dengan pusat adalah sama.",
    "Sudut antara tangen dan perentas = sudut pada tembereng selang-seli yang dicangkum oleh perentas itu.",
  ],
  keyExamFacts: [
    "Sudut lilitan sama lengkok = sama besar; sudut pusat = 2 x sudut lilitan sama lengkok.",
    "Sudut lilitan dicangkum diameter = 90°.",
    "Sudut bertentangan sisi empat kitaran: jumlah = 180°.",
    "Sudut peluaran sisi empat kitaran = sudut pedalaman bertentangan sepadan.",
    "Tangen ⊥ jejari pada titik ketangenan (90°).",
    "Dua tangen dari titik luar sama: panjang sama, sudut pusat sama, sudut pada titik luar sama.",
    "Sudut tangen-perentas = sudut tembereng selang-seli yang dicangkum perentas tersebut.",
  ],
  keyTerms: ["lilitan", "lengkok", "perentas", "sisi empat kitaran", "tangen", "titik ketangenan", "tembereng selang-seli", "tangen sepunya"],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Membuat dan menentusahkan konjektur tentang hubungan sudut lilitan dengan sudut pusat yang dicangkum lengkok sama.",
            "Menyelesaikan masalah yang melibatkan sudut pada lilitan dan sudut pusat bulatan.",
            "Mengenal pasti sisi empat kitaran dan menerangkan sifat sudut pedalaman dan peluarannya.",
            "Menyelesaikan masalah yang melibatkan sisi empat kitaran.",
            "Mengenal pasti tangen kepada bulatan dan sifat-sifatnya termasuk sudut tangen-jejari dan tangen-perentas.",
            "Menyelesaikan masalah yang melibatkan tangen kepada bulatan.",
          ],
        },
      ],
    },
    {
      title: "6.1 Sudut pada Lilitan dan Sudut Pusat",
      subsections: [
        {
          title: "Penerangan Ringkas",
          content:
            "Sudut pada lilitan ialah sudut yang dibentuk oleh dua perentas bertemu pada satu titik di lilitan, dicangkum oleh suatu lengkok. Sudut pada pusat ialah sudut di pusat bulatan yang dicangkum oleh lengkok yang sama.",
        },
        {
          title: "Formula",
          formula:
            "Sudut lilitan sama lengkok adalah sama: ∠PRQ = ∠PSQ = ∠PTQ\nSudut pusat = 2 x sudut lilitan (lengkok sama): ∠AOC = 2∠ABC\nSudut lilitan dicangkum diameter = 90°",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Sudut pusat 80°, hitung sudut lilitan lengkok sama.", "Sudut lilitan = 80°/2", "40°"],
              ["Sudut lilitan 35°, hitung sudut pusat lengkok sama.", "Sudut pusat = 2 x 35°", "70°"],
              ["PR & QS diameter, ∠QRS=90°. Hitung y jika ∠QPR=45°.", "y+45°+90°=180°", "y = 45°"],
              ["Lengkok PR = lengkok QS, ∠40° diberi. Hitung x.", "x = 40° (sudut sama lengkok sama)", "40°"],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Sudut lilitan berkadaran terus dengan panjang lengkok yang dicangkum.",
            "Sudut tegak pada diameter (90°) sangat berguna untuk segi tiga bersudut tegak dalam bulatan.",
            "Apabila lengkok major diberi, sudut pusat major = 360° - sudut pusat minor.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Mengelirukan sudut pusat dengan sudut lilitan (lupa kali/bahagi 2).",
            "Tersalah kenal pasti lengkok yang dicangkum oleh sudut tertentu.",
            "Tertinggal menggunakan 360° - sudut minor untuk dapatkan sudut pusat major.",
          ],
        },
      ],
    },
    {
      title: "6.2 Sisi Empat Kitaran",
      subsections: [
        {
          title: "Penerangan Ringkas",
          content:
            "Sisi empat kitaran ialah sisi empat dengan keempat-empat bucu terletak pada lilitan bulatan yang sama. Sudut pedalaman bertentangan dalam sisi empat kitaran berjumlah 180°.",
        },
        {
          title: "Formula",
          formula:
            "∠A + ∠C = 180°, ∠B + ∠D = 180° (sudut bertentangan)\nSudut peluaran = sudut pedalaman bertentangan yang sepadan",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["KLMN sisi empat kitaran, ∠LKN=104°, ∠LMN=8x. Hitung x.", "104+8x=180; 8x=76", "x=9.5°"],
              ["∠KNM=98°, ∠KLM=4y. Hitung y.", "98+4y=180; 4y=82", "y=20.5°"],
              ["PQRS kitaran, ∠PQR=4y, ∠PSR=2y, garis lurus RST. Hitung ∠PST.", "4y+2y=180; y=30; ∠PST=∠PQR=4(30)", "120°"],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Mesti sahkan keempat-empat bucu terletak tepat pada lilitan sebelum mengaplikasikan sifat sisi empat kitaran.",
            "Sudut peluaran (apabila sisi dipanjangkan) sama dengan sudut pedalaman bertentangan yang sepadan, bukan sudut bersebelahan.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menggunakan sifat sisi empat kitaran pada sisi empat yang bukan kitaran (ada bucu tidak pada lilitan).",
            "Mengelirukan sudut peluaran dengan sudut pedalaman bersebelahan.",
          ],
        },
      ],
    },
    {
      title: "6.3 Tangen kepada Bulatan",
      subsections: [
        {
          title: "Penerangan Ringkas",
          content:
            "Tangen ialah garis lurus yang menyentuh bulatan pada satu titik sahaja (titik ketangenan). Tangen berserenjang dengan jejari pada titik ketangenan.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Sudut antara tangen dan jejari pada titik ketangenan ialah 90°.",
            "Dua tangen daripada satu titik luar yang sama: panjang sama (BA=CA), sudut pusat sama (∠BOA=∠COA), sudut pada titik luar sama (∠OAB=∠OAC).",
            "Sudut antara tangen dan perentas (sudut tangen-perentas) = sudut pada tembereng selang-seli yang dicangkum oleh perentas tersebut.",
          ],
        },
        {
          title: "Formula",
          formula:
            "Sudut tangen-jejari = 90°\nSudut tangen-perentas = sudut tembereng selang-seli",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["ABC garis lurus tangen, AB=OB, ∠BAO=28°. Hitung x.", "∠AOB=180°-2(28°)? Gunakan sudut tegak: x=90°-∠AOB", "Bergantung rajah; x=48° (contoh dalam buku teks)"],
              ["Tangen PQ, RQ bertemu Q. ∠OPQ=90°, ∠OQP=66°. Hitung x (∠POQ).", "x+66°=90°", "x=24°"],
              ["PMN tangen, ∠KLA pada tembereng selang-seli. Hitung ∠PMK jika ∠KLM=60°.", "∠PMK = ∠KLM (sudut tembereng selang-seli)", "60°"],
            ],
          },
        },
        {
          title: "Tangen Sepunya - Penerangan Ringkas",
          content:
            "Tangen sepunya ialah satu garis lurus yang menjadi tangen kepada dua bulatan serentak. Bilangan tangen sepunya bergantung kepada kedudukan dua bulatan: tidak bersentuhan (4 tangen), bersentuhan di luar (3 tangen), bersilang (2 tangen), bertindih di dalam (1 tangen).",
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Gunakan Teorem Pythagoras untuk mencari jejari atau jarak apabila tangen dan garis dari pusat membentuk segi tiga bersudut tegak.",
            "Bagi dua tangen dari titik luar, segi tiga yang dibentuk dengan pusat adalah kongruen (sisi-sisi-sisi).",
            "Kenal pasti tembereng selang-seli dengan teliti: ia berada bertentangan dengan sudut tangen-perentas yang dirujuk.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menganggap semua garis menyentuh bulatan adalah tangen tanpa mengesahkan satu titik sentuhan sahaja.",
            "Tersilap mengaplikasikan sudut tembereng selang-seli pada tembereng yang salah.",
            "Lupa sudut tangen-jejari mesti 90° apabila menyelesaikan segi tiga berkaitan.",
          ],
        },
        {
          title: "Aplikasi Kehidupan Sebenar",
          bulletPoints: [
            "Roda kenderaan menyentuh jalan raya pada satu titik (konsep tangen).",
            "Reka bentuk struktur bulat dalam kejuruteraan dan pembinaan jalan raya.",
            "Pengukuran jarak menggunakan sifat tangen dalam astronomi dan navigasi.",
          ],
        },
      ],
    },
    {
      title: "6.4 Sudut dan Tangen bagi Bulatan - Menyelesaikan Masalah",
      subsections: [
        {
          title: "Penerangan Ringkas",
          content:
            "Masalah gabungan menggunakan semua sifat sudut lilitan, sudut pusat, sisi empat kitaran dan tangen secara serentak, sering melibatkan beberapa langkah berurutan.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Lengkok PQ=QR, SQ melalui O, ∠QOR=50°. Hitung ∠QSR dan ∠PQS.",
                "∠QSR=(1/2)(50°)=25°; ∠PQS=180°-90°-25°",
                "∠QSR=25°, ∠PQS=65°",
              ],
              [
                "Dua bulatan jejari 4cm dan 3cm, PQRS tangen sepunya. Hitung x menggunakan kos⁻¹.",
                "kos x = 1/7 (anggaran berdasarkan jarak pusat dan beza jejari)",
                "x ≈ 81.79°",
              ],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Pecahkan masalah kompleks kepada beberapa langkah: kenal pasti sudut pusat/lilitan dahulu, kemudian sisi empat kitaran, kemudian tangen jika berkaitan.",
            "Lukis atau anotasi rajah dengan semua sudut diketahui untuk mengelakkan tersilap.",
            "Sentiasa semak jumlah sudut segi tiga (180°) atau sudut pusat (360°) untuk mengesahkan jawapan.",
          ],
        },
        {
          title: "Ringkasan",
          bulletPoints: [
            "Sudut lilitan sama lengkok sama besar; sudut pusat = 2x sudut lilitan.",
            "Sudut lilitan dicangkum diameter = 90°.",
            "Sudut bertentangan sisi empat kitaran berjumlah 180°; sudut peluaran = sudut pedalaman bertentangan sepadan.",
            "Tangen ⊥ jejari pada titik ketangenan; dua tangen dari titik luar adalah sama panjang.",
            "Sudut tangen-perentas = sudut tembereng selang-seli.",
          ],
        },
      ],
    },
  ],
};
