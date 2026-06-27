import type { StructuredNotes } from "@/data/types";

export const mathF3C5NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 5 Nisbah Trigonometri membantu murid mengenal pasti sisi bertentangan, sisi bersebelahan dan hipotenus, mentakrifkan sinus, kosinus dan tangen bagi sudut tirus, menentukan nilai trigonometri sudut khas (30°, 45°, 60°) tanpa kalkulator, menggunakan kalkulator saintifik untuk nilai trigonometri dan sudut, serta menyelesaikan masalah yang melibatkan sinus, kosinus dan tangen.",
  quickRevision: [
    "Hipotenus ialah sisi terpanjang, bertentangan dengan sudut 90°.",
    "sin θ = sisi bertentangan / hipotenus; kos θ = sisi bersebelahan / hipotenus; tan θ = sisi bertentangan / sisi bersebelahan.",
    "tan θ = sin θ / kos θ.",
    "Apabila sudut tirus bertambah: sin θ dan tan θ bertambah, kos θ berkurang.",
    "Nilai khas: sin30=1/2, kos30=√3/2, tan30=1/√3; sin45=kos45=1/√2, tan45=1; sin60=√3/2, kos60=1/2, tan60=√3.",
    "Sudut boleh dinyatakan dalam darjah, minit dan saat: 1° = 60'.",
  ],
  keyExamFacts: [
    "sin θ = bertentangan/hipotenus; kos θ = bersebelahan/hipotenus; tan θ = bertentangan/bersebelahan.",
    "tan θ = sin θ / kos θ.",
    "Nilai sudut khas 30°, 45°, 60° boleh dikira tanpa kalkulator menggunakan segi tiga sama sisi/sama kaki.",
    "Sin dan tan bertambah, kos berkurang apabila sudut tirus membesar (0°-90°).",
    "1° = 60 minit ('); gunakan butang °' '' pada kalkulator untuk sudut dalam darjah-minit.",
  ],
  keyTerms: ["sinus", "kosinus", "tangen", "hipotenus", "sisi bertentangan", "sisi bersebelahan", "sudut tirus", "darjah", "minit"],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengenal pasti sisi bertentangan dan sisi bersebelahan berdasarkan sudut tirus dalam segi tiga bersudut tegak.",
            "Membuat dan menentusahkan konjektur tentang hubungan sudut tirus dengan nisbah sisi segi tiga, dan mentakrifkan sinus, kosinus dan tangen.",
            "Membuat dan menentusahkan konjektur tentang kesan perubahan saiz sudut terhadap nilai sinus, kosinus dan tangen.",
            "Menentukan nilai sinus, kosinus dan tangen suatu sudut tirus.",
            "Menentukan nilai sinus, kosinus dan tangen sudut 30°, 45° dan 60° tanpa kalkulator.",
            "Melakukan pengiraan yang melibatkan sinus, kosinus dan tangen.",
            "Menyelesaikan masalah yang melibatkan sinus, kosinus dan tangen.",
          ],
        },
      ],
    },
    {
      title: "5.1 Sinus, Kosinus dan Tangen bagi Sudut Tirus",
      subsections: [
        {
          title: "5.1.1 Mengenal Pasti Sisi - Penerangan Ringkas",
          content:
            "Bagi sudut tirus dalam segi tiga bersudut tegak: hipotenus ialah sisi terpanjang bertentangan sudut 90° (tetap kedudukannya); sisi bertentangan dan sisi bersebelahan berubah mengikut sudut tirus yang dirujuk.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Hipotenus sentiasa bertentangan dengan sudut 90° dan tidak berubah walau sudut tirus mana dirujuk.",
            "Sisi bertentangan ialah sisi bertentangan dengan sudut tirus yang dirujuk.",
            "Sisi bersebelahan ialah sisi yang bersebelahan dengan sudut tirus (bukan hipotenus).",
          ],
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Sudut", "Hipotenus", "Sisi Bertentangan", "Sisi Bersebelahan"],
            rows: [
              ["∠BAC dalam ΔABC", "AC", "BC", "AB"],
              ["∠BCA dalam ΔABC", "AC", "AB", "BC"],
              ["∠LKM dalam ΔKLM", "KM", "LM", "KL"],
            ],
          },
        },
        {
          title: "5.1.2 Mentakrifkan Sinus, Kosinus dan Tangen - Penerangan Ringkas",
          content:
            "Bagi sudut tirus tetap, nisbah sisi bertentangan:hipotenus, sisi bersebelahan:hipotenus dan sisi bertentangan:sisi bersebelahan adalah pemalar tanpa mengira saiz segi tiga, selagi sudut sama.",
        },
        {
          title: "Formula",
          formula:
            "sin θ = sisi bertentangan / hipotenus\nkos θ = sisi bersebelahan / hipotenus\ntan θ = sisi bertentangan / sisi bersebelahan\ntan θ = sin θ / kos θ",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Segi tiga bersudut tegak PQR, PQ=15cm, QR=8cm. Hitung panjang PR.",
                "PR=√(15²+8²)=√289",
                "PR = 17 cm",
              ],
              [
                "Daripada soalan di atas, hitung sin ∠PRQ.",
                "sin∠PRQ = bertentangan(PQ)/hipotenus(PR) = 15/17",
                "15/17",
              ],
              [
                "Daripada soalan di atas, hitung kos ∠PRQ dan tan ∠QPR.",
                "kos∠PRQ = QR/PR = 8/17; tan∠QPR = QR/PQ = 8/15",
                "kos = 8/17, tan = 8/15",
              ],
              [
                "Jika sin θ = 0.6 dan kos θ = 0.8, hitung tan θ.",
                "tan θ = sin θ / kos θ = 0.6/0.8",
                "0.75",
              ],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Nisbah trigonometri bagi sudut yang sama adalah sama walaupun saiz segi tiga berbeza (segi tiga serupa).",
            "Apabila saiz sudut tirus bertambah (0° ke 90°): sin θ bertambah ke 1; kos θ berkurang ke 0; tan θ bertambah ke infiniti.",
            "tan 45° = 1 sebab sisi bertentangan = sisi bersebelahan dalam segi tiga bersudut tegak sama kaki.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Mengelirukan sisi bersebelahan dengan hipotenus.",
            "Tersalah identifikasi sisi bertentangan apabila sudut tirus berubah dalam segi tiga yang sama.",
            "Lupa formula tan θ = sin θ/kos θ apabila salah satu nilai tidak diberi secara langsung.",
          ],
        },
        {
          title: "5.1.3 Sudut Khas 30°, 45°, 60° Tanpa Kalkulator - Penerangan Ringkas",
          content:
            "Nilai trigonometri bagi 30°, 45°, 60° boleh diperoleh menggunakan segi tiga sama sisi (dibahagi dua untuk 30°/60°) dan segi tiga bersudut tegak sama kaki (untuk 45°), menggunakan Teorem Pythagoras.",
        },
        {
          title: "Formula",
          formula:
            "sin30°=1/2, kos30°=√3/2, tan30°=1/√3\nsin45°=1/√2, kos45°=1/√2, tan45°=1\nsin60°=√3/2, kos60°=1/2, tan60°=√3",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Hitung sin45° + kos45° tanpa kalkulator.", "1/√2 + 1/√2 = 2/√2", "√2"],
              ["Hitung 3kos30° - 2sin60°.", "3(√3/2) - 2(√3/2) = (3√3-2√3)/2", "√3/2"],
              ["Hitung 2tan45° - 2kos60°.", "2(1) - 2(1/2)", "1"],
            ],
          },
        },
        {
          title: "5.1.4 Menggunakan Kalkulator Saintifik - Penerangan Ringkas",
          content:
            "Kalkulator saintifik boleh mengira nilai sin, kos, tan bagi sebarang sudut, dan boleh mencari sudut (menggunakan sin⁻¹, kos⁻¹, tan⁻¹) jika nilai nisbah trigonometri diberi.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Hitung sin x = 0.8377, cari x.", "x = sin⁻¹(0.8377)", "x ≈ 56.9° = 56° 54'"],
              ["Tukar 30.2° kepada darjah dan minit.", "30.2° = 30° + (0.2x60)'", "30° 12'"],
              ["Tukar 43° 30' kepada darjah.", "43° + (30/60)°", "43.5°"],
            ],
          },
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "1° = 60 minit; gunakan butang °' '' pada kalkulator untuk input/output sudut darjah-minit terus.",
            "Apabila unit saat ≥30, bundarkan naik 1 minit.",
            "Pastikan kalkulator dalam mod 'Deg' (darjah), bukan radian, semasa mengira trigonometri.",
          ],
        },
        {
          title: "5.1.5 Menyelesaikan Masalah - Penerangan Ringkas",
          content:
            "Masalah trigonometri sering melibatkan tangga, tiang, sudut dongak/tunduk, dan bentuk 3D seperti kuboid, di mana segi tiga bersudut tegak dikenal pasti dahulu sebelum nisbah trigonometri digunakan.",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Tangga PQR bersandar pada dinding, sudut 50°, tinggi QR=2.5m. Hitung panjang tangga PR.",
                "sin50° = QR/PR = 2.5/PR; PR = 2.5/sin50°",
                "PR ≈ 3.26 m",
              ],
              [
                "Kuboid ABCDEFGH: BC=8cm, CH=5cm, HE=4cm. Hitung ∠FCG.",
                "FG=EH=4cm; CG=√(8²+5²)=√89; tan∠FCG=FG/CG=4/√89",
                "∠FCG ≈ 22.98° = 22° 59'",
              ],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Kenal pasti segi tiga bersudut tegak yang relevan dahulu sebelum memilih nisbah sin/kos/tan yang sesuai.",
            "Gunakan sisi yang diketahui untuk menentukan nisbah mana (sin, kos atau tan) paling sesuai digunakan.",
            "Bagi masalah sudut dongak/tunduk, lukis gambar rajah ringkas untuk kenal pasti sisi bertentangan/bersebelahan dengan betul.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Menggunakan nisbah trigonometri yang salah (contoh guna kos apabila sepatutnya sin).",
            "Tertinggal menukar sudut kepada darjah perpuluhan sebelum menggunakan kalkulator.",
            "Tersilap meletakkan sisi bertentangan/bersebelahan apabila terdapat lebih daripada satu segi tiga bersudut tegak dalam rajah.",
          ],
        },
        {
          title: "Aplikasi Kehidupan Sebenar",
          bulletPoints: [
            "Mengukur kelebaran sungai atau ketinggian bangunan tanpa mengukur secara terus (menggunakan teodolit).",
            "Navigasi pelayaran dan penerbangan.",
            "Kejuruteraan, astronomi dan pembinaan menggunakan trigonometri secara meluas.",
          ],
        },
        {
          title: "Ringkasan",
          bulletPoints: [
            "sin θ = bertentangan/hipotenus; kos θ = bersebelahan/hipotenus; tan θ = bertentangan/bersebelahan = sinθ/kosθ.",
            "Nilai khas 30°,45°,60° dikira menggunakan segi tiga sama sisi/sama kaki tanpa kalkulator.",
            "Sin & tan bertambah, kos berkurang, apabila sudut tirus membesar.",
            "Kenal pasti segi tiga bersudut tegak yang betul sebelum menyelesaikan masalah trigonometri.",
          ],
        },
      ],
    },
  ],
};
