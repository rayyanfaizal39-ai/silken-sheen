import type { StructuredNotes } from "@/data/types";

export const mathF3C3NotesBM: StructuredNotes = {
  chapterSummary:
    "Bab 3 Matematik Pengguna: Simpanan dan Pelaburan, Kredit dan Hutang membantu murid mengenal jenis simpanan dan pelaburan, mengira faedah mudah dan faedah kompaun, mengira nilai pulangan pelaburan (ROI), membanding risiko-pulangan-kecairan, memahami strategi pemurataan kos, serta menguruskan kredit dan hutang secara bijak termasuk pengiraan bayaran balik pinjaman dan ansuran.",
  quickRevision: [
    "Faedah mudah: I = Prt, dengan P=prinsipal, r=kadar faedah, t=tempoh dalam tahun.",
    "Nilai matang faedah kompaun: MV = P(1 + r/n)^(nt), dengan n=kekerapan pengkompaunan setahun.",
    "Nilai pulangan pelaburan (ROI) = (Jumlah pulangan / kos pelaburan) x 100%.",
    "Bagi pinjaman faedah sama rata: A = P + Prt; ansuran bulanan = A / bilangan bulan.",
    "Bagi faedah atas baki, faedah bulanan dikira semula berdasarkan baki pinjaman terkini selepas setiap ansuran.",
    "Strategi pemurataan kos: bilangan unit = jumlah pelaburan / harga seunit, dikumpul setiap bulan.",
  ],
  keyExamFacts: [
    "Faedah mudah: I = Prt.",
    "Faedah kompaun: MV = P(1 + r/n)^(nt).",
    "ROI = (Jumlah pulangan ÷ kos pelaburan) x 100%.",
    "Pinjaman faedah sama rata: A = P + Prt; ansuran bulanan = A ÷ bilangan bulan.",
    "Faedah atas baki dikira semula setiap bulan berdasarkan baki semasa.",
    "Tiga faktor pelaburan: potensi risiko, tahap pulangan, aspek kecairan.",
  ],
  keyTerms: ["simpanan", "pelaburan", "faedah mudah", "faedah kompaun", "ROI", "kredit", "hutang", "ansuran", "kecairan"],
  sections: [
    {
      title: "Hasil Pembelajaran",
      subsections: [
        {
          content: "Pada akhir bab ini, murid sepatutnya boleh:",
          bulletPoints: [
            "Mengenal pelbagai jenis simpanan dan pelaburan.",
            "Membuat pengiraan faedah mudah dan faedah kompaun bagi simpanan.",
            "Membuat pengiraan nilai pulangan pelaburan (ROI) dan faktor yang mempengaruhinya.",
            "Membanding dan membeza risiko, pulangan dan kecairan pelbagai jenis simpanan dan pelaburan.",
            "Mengira kos purata seunit menggunakan strategi pemurataan kos.",
            "Menyelesaikan masalah simpanan dan pelaburan.",
            "Menjelaskan maksud kredit dan hutang serta pengurusannya yang bijak.",
            "Mengira bayaran balik pinjaman dan ansuran bulanan.",
          ],
        },
      ],
    },
    {
      title: "3.1 Simpanan dan Pelaburan",
      subsections: [
        {
          title: "3.1.1 Jenis Simpanan dan Pelaburan - Penerangan Ringkas",
          content:
            "Simpanan ialah wang lebihan yang disimpan, contohnya akaun simpanan dan akaun simpanan tetap. Pelaburan ialah langkah mendapatkan pulangan masa depan, contohnya saham, amanah saham dan hartanah.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Akaun simpanan: faedah rendah, boleh keluar bila-bila masa.",
            "Akaun simpanan tetap: faedah lebih tinggi, wang disimpan untuk tempoh tertentu.",
            "Saham: pulangan dalam bentuk dividen dan keuntungan modal; risiko tinggi.",
            "Amanah saham: diuruskan pengurus dana profesional; risiko sederhana.",
            "Hartanah: pulangan dalam bentuk sewa dan keuntungan modal; risiko bergantung lokasi dan ekonomi.",
          ],
        },
        {
          title: "3.1.2 Faedah Mudah dan Faedah Kompaun - Penerangan Ringkas",
          content:
            "Faedah mudah dikira berdasarkan prinsipal asal sahaja. Faedah kompaun dikira berdasarkan prinsipal dan faedah terkumpul daripada tempoh sebelumnya, dan menghasilkan pulangan lebih tinggi.",
        },
        {
          title: "Formula",
          formula: "Faedah mudah: I = Prt\nNilai matang (faedah kompaun): MV = P(1 + r/n)^(nt)",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              ["Encik Zainal simpan RM4 000, kadar 2% setahun. Hitung faedah selepas 1 tahun.", "I = 4000 x 0.02 x 1", "RM80"],
              ["Encik Badrul simpan RM5 000, kadar 3% setahun, 2 tahun. Hitung jumlah faedah.", "I = 5000 x 0.03 x 2", "RM300"],
              ["Cik Wong simpan RM10 000, kadar 4% setahun. Hitung faedah selepas 6 bulan.", "I = 10000 x 0.04 x (6/12)", "RM200"],
              [
                "Puan Liew Foong simpan RM15 000, kadar 4% setahun, dikompaun setiap 6 bulan, 3 tahun. Hitung jumlah simpanan akhir.",
                "MV = 15000(1+0.04/2)^(2x3) = 15000(1.02)^6",
                "RM16 898.18 (anggaran)",
              ],
              [
                "RM10 000, kadar 5% setahun, dikompaun bulanan (n=12) selama 1 tahun.",
                "MV = 10000(1+0.05/12)^12",
                "RM10 511.62",
              ],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Semakin lama tempoh simpanan, semakin tinggi jumlah faedah (faedah mudah).",
            "Semakin tinggi kadar faedah, semakin tinggi jumlah simpanan akhir.",
            "Semakin kerap pengkompaunan (n besar), semakin tinggi nilai matang.",
            "Faedah kompaun sentiasa memberi pulangan lebih tinggi berbanding faedah mudah untuk prinsipal, kadar dan tempoh yang sama.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Tertinggal menukar peratus kadar faedah kepada perpuluhan (% ÷ 100) sebelum mengira.",
            "Tertinggal menukar tempoh bulan kepada pecahan tahun (bulan/12) dalam formula I=Prt.",
            "Mengelirukan n (kekerapan pengkompaunan setahun) dengan t (tempoh tahun).",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Senaraikan P, r, t (dan n jika kompaun) sebelum menggantikan ke dalam formula.",
            "Pastikan unit kadar faedah dan tempoh adalah konsisten (kedua-duanya tahun, atau kedua-duanya bulan).",
            "Bundarkan jawapan wang kepada 2 tempat perpuluhan.",
          ],
        },
        {
          title: "3.1.3 Nilai Pulangan Pelaburan (ROI) - Penerangan Ringkas",
          content:
            "ROI mengukur keberkesanan sesuatu pelaburan berbanding kos asal. Bagi hartanah, jumlah pulangan termasuk sewa dan keuntungan modal (harga jualan tolak semua kos pembelian dan pinjaman berbaki).",
        },
        {
          title: "Formula",
          formula: "ROI = (Jumlah Pulangan / Kos Pelaburan) x 100%\nKeuntungan modal = Harga Jualan - Semua Kos Berkaitan",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Encik Yusuf beli kedai RM600 000 (bayar 10%=RM60 000), jual RM1 300 000. Pinjaman berbaki RM486 000, ansuran dilunaskan RM450 000, kos guaman RM15 000, duti setem RM15 000, komisen RM18 000. Sewa terkumpul RM200 000. Hitung ROI.",
                "Keuntungan modal = 1300000-486000-60000-15000-15000-18000-450000 = 256000; Jumlah pulangan = 200000+256000 = 456000",
                "ROI = (456000/600000) x100% = 76%",
              ],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Tiga faktor sebelum melabur: potensi risiko, tahap pulangan, aspek kecairan.",
            "Faktor mempengaruhi pulangan hartanah: situasi politik, keadaan ekonomi, lokasi.",
            "Pelbagaikan portfolio pelaburan membantu mengurangkan risiko keseluruhan.",
          ],
        },
        {
          title: "3.1.4 Strategi Pemurataan Kos - Penerangan Ringkas",
          content:
            "Strategi pemurataan ialah teknik melabur amaun tetap secara berkala (bulanan/suku tahun/tahunan) tanpa mengira keadaan pasaran, supaya kos purata seunit menjadi lebih rendah berbanding pembelian sekali gus pada harga tinggi.",
        },
        {
          title: "Formula",
          formula: "Bilangan unit dibeli = Jumlah pelaburan bulanan / Harga seunit\nKos purata seunit = Jumlah pelaburan keseluruhan / Jumlah unit dimiliki",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Puan Linda labur RM20 000 sekali gus pada RM2.00 seunit; Puan Esther labur RM20 000 mengikut bulan dengan harga berbeza, memperoleh 10 626 unit.",
                "Puan Linda: 20000/2.00=10000 unit, kos purata RM2.00. Puan Esther: 20000/10626=RM1.88",
                "Puan Esther Wong lebih bijak kerana kos purata lebih rendah (RM1.88) dan unit lebih banyak",
              ],
            ],
          },
        },
        {
          title: "Aplikasi Kehidupan Sebenar",
          bulletPoints: [
            "Perancangan persaraan: membandingkan pulangan hartanah, saham dan simpanan tetap.",
            "Pelaburan unit amanah secara bulanan oleh pekerja gaji bulanan.",
            "Membuat keputusan kewangan berdasarkan risiko, pulangan dan kecairan peribadi.",
          ],
        },
      ],
    },
    {
      title: "3.2 Pengurusan Kredit dan Hutang",
      subsections: [
        {
          title: "3.2.1 Kredit dan Kad Kredit - Penerangan Ringkas",
          content:
            "Kredit ialah perjanjian meminjam wang/barang daripada pembekal untuk dibayar kemudian. Kad kredit memberi tempoh tanpa faedah (biasanya 20 hari dari tarikh penyata) jika baki dibayar penuh; jika tidak, caj kewangan dan caj lewat dikenakan.",
        },
        {
          title: "Konsep Penting",
          bulletPoints: [
            "Bayaran minimum biasanya 5% daripada baki akhir atau RM50, mengikut mana yang lebih tinggi.",
            "Membayar hanya jumlah minimum membawa kepada caj faedah berterusan pada baki.",
            "Kelebihan kad kredit: rebat tunai, mata ganjaran, kemudahan transaksi atas talian.",
            "Kekurangan kad kredit: yuran tahunan, caj faedah, risiko berbelanja lebih.",
          ],
        },
        {
          title: "3.2.2 Pinjaman dan Bayaran Balik - Penerangan Ringkas",
          content:
            "Pinjaman dikenakan faedah mengikut dua kaedah: faedah kadar sama rata (dikira sekali atas prinsipal penuh untuk seluruh tempoh) dan faedah atas baki (dikira semula setiap bulan berdasarkan baki terkini).",
        },
        {
          title: "Formula",
          formula:
            "Faedah kadar sama rata: A = P + Prt\nAnsuran bulanan = A / bilangan bulan\nFaedah atas baki (bulanan) = Baki semasa x (r/100) x (1/12)",
        },
        {
          title: "Contoh Berpandu",
          table: {
            headers: ["Soalan", "Kerja", "Jawapan"],
            rows: [
              [
                "Encik Azlan pinjam RM10 000, kadar 4% sama rata, 7 tahun. Hitung ansuran bulanan.",
                "A = 10000 + (10000x0.04x7) = 12800; ansuran = 12800/84 bulan",
                "RM152.38 sebulan",
              ],
              [
                "Encik Harith pinjam RM10 000, kadar 6% atas baki, ansuran bulanan RM150. Hitung faedah bulan pertama.",
                "Faedah = 10000 x (6/100) x (1/12)",
                "RM50.00 (baki selepas ansuran 1 = RM9 900)",
              ],
            ],
          },
        },
        {
          title: "Nota Penting",
          bulletPoints: [
            "Faedah atas baki biasanya lebih rendah jumlah keseluruhannya berbanding faedah kadar sama rata kerana baki berkurang setiap bulan.",
            "Bandingkan tawaran pinjaman berdasarkan jumlah faedah keseluruhan, bukan hanya kadar faedah peratusan.",
            "Elakkan peminjam wang tidak berlesen kerana kadar faedah yang tidak munasabah dan risiko undang-undang.",
          ],
        },
        {
          title: "Kesilapan Lazim",
          bulletPoints: [
            "Mengira faedah atas baki menggunakan prinsipal asal sepanjang tempoh (sepatutnya guna baki terkini setiap bulan).",
            "Tertinggal menambah faedah terkumpul sebelum menolak ansuran bulanan.",
            "Salah menukar tempoh tahun kepada bilangan bulan (tahun x 12).",
          ],
        },
        {
          title: "Tip Peperiksaan",
          bulletPoints: [
            "Untuk faedah kadar sama rata, kira jumlah bayaran balik (A) dahulu sebelum membahagi dengan bilangan bulan.",
            "Untuk faedah atas baki, buat jadual bulan demi bulan: faedah, jumlah pinjaman, tolak ansuran, baki baharu.",
            "Bandingkan dua pakej pinjaman dengan mengira jumlah faedah keseluruhan bagi setiap pakej.",
          ],
        },
        {
          title: "Aplikasi Kehidupan Sebenar",
          bulletPoints: [
            "Pinjaman kereta dan pinjaman peribadi menggunakan faedah kadar sama rata.",
            "Pengurusan kad kredit bijak mengelakkan hutang berlebihan dan caj faedah tinggi.",
            "Perbandingan pakej pinjaman bank untuk membuat keputusan kewangan yang tepat.",
          ],
        },
        {
          title: "Ringkasan",
          bulletPoints: [
            "Simpanan: akaun simpanan, akaun simpanan tetap; Pelaburan: saham, amanah saham, hartanah.",
            "Faedah mudah I=Prt; Faedah kompaun MV=P(1+r/n)^(nt).",
            "ROI = (jumlah pulangan/kos pelaburan) x100%.",
            "Pinjaman: A=P+Prt (sama rata) atau faedah atas baki dikira semula setiap bulan.",
            "Urus kredit dan hutang bijak: bayar penuh dalam tempoh tanpa faedah, elakkan bayaran minimum berterusan.",
          ],
        },
      ],
    },
  ],
};
