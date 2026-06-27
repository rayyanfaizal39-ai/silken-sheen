import type { Flashcard } from "@/data/content";

type FlashcardSeed = [string, string];

function buildFlashcards(items: FlashcardSeed[]): Flashcard[] {
  return items.map(([front, back], index) => ({
    id: `math-f3-c3-bm-f${index + 1}`,
    subjectId: "math",
    form: "Form 3",
    chapter: "Chapter 3",
    lang: "bm",
    front,
    back,
  }));
}

export const mathF3C3FlashcardsBM: Flashcard[] = buildFlashcards([
  // Deck 1: Simpanan, Pelaburan dan Faedah (Cards 1-20)
  ["Apakah maksud simpanan?", "Wang lebihan yang disimpan, contoh dalam akaun bank."],
  ["Apakah maksud pelaburan?", "Langkah mendapatkan pulangan masa depan, contoh saham dan hartanah."],
  ["Apakah formula faedah mudah?", "I = Prt"],
  ["Apakah maksud P, r, t dalam I=Prt?", "P=prinsipal, r=kadar faedah, t=tempoh dalam tahun"],
  ["Apakah formula nilai matang faedah kompaun?", "MV = P(1+r/n)^(nt)"],
  ["Apakah maksud n dalam formula faedah kompaun?", "Kekerapan pengkompaunan setahun"],
  ["RM4 000 pada 2% setahun, faedah selepas 1 tahun?", "RM80"],
  ["RM5 000 pada 3% setahun, 2 tahun, jumlah faedah?", "RM300"],
  ["RM10 000 pada 4% setahun, faedah 6 bulan?", "RM200"],
  ["Apakah kesan tempoh lebih lama terhadap faedah mudah?", "Faedah bertambah"],
  ["Apakah kesan kadar lebih tinggi terhadap jumlah simpanan akhir?", "Jumlah simpanan akhir bertambah"],
  ["Apakah kesan pengkompaunan lebih kerap terhadap nilai matang?", "Nilai matang bertambah"],
  ["Adakah faedah kompaun sentiasa lebih tinggi daripada faedah mudah?", "Ya, untuk P, r, t yang sama"],
  ["Apakah jenis simpanan dengan faedah rendah tetapi boleh keluar bila-bila masa?", "Akaun simpanan biasa"],
  ["Apakah jenis simpanan dengan faedah lebih tinggi, tempoh tertentu?", "Akaun simpanan tetap"],
  ["Apakah pulangan saham?", "Dividen dan keuntungan modal"],
  ["Apakah pulangan hartanah?", "Sewa dan keuntungan modal"],
  ["Siapa menguruskan amanah saham?", "Pengurus dana profesional"],
  ["Apakah maksud hibah dalam prinsip wadiah?", "Hadiah/pulangan daripada bank Islam, bukan faedah"],
  ["Encik Osman simpan RM20 000, terima RM20 500. Peratus hibah?", "2.5%"],

  // Deck 2: ROI, Risiko dan Strategi Pemurataan (Cards 21-40)
  ["Apakah formula ROI?", "(Jumlah pulangan/kos pelaburan) x100%"],
  ["Apakah tiga faktor sebelum melabur?", "Risiko, pulangan, kecairan"],
  ["Apakah maksud kecairan?", "Keupayaan menukar pelaburan kepada tunai dengan segera"],
  ["Apakah maksud potensi risiko?", "Kemungkinan ketidakpastian daripada pelaburan"],
  ["Apakah maksud tahap pulangan?", "Keuntungan yang dinikmati daripada pelaburan"],
  ["Bagaimana mengurangkan risiko pelaburan?", "Pelbagaikan portfolio pelaburan"],
  ["Apakah faktor mempengaruhi pulangan hartanah?", "Situasi politik, keadaan ekonomi, lokasi"],
  ["Apakah maksud keuntungan modal?", "Harga jualan tolak semua kos berkaitan"],
  ["Apakah strategi pemurataan kos?", "Melabur amaun tetap secara berkala tanpa kira keadaan pasaran"],
  ["Apakah formula bilangan unit dibeli?", "Jumlah pelaburan / harga seunit"],
  ["Apakah formula kos purata seunit?", "Jumlah pelaburan keseluruhan / jumlah unit dimiliki"],
  ["Puan Linda labur RM20 000 sekaligus pada RM2.00/unit. Berapa unit?", "10 000 unit"],
  ["Puan Esther labur secara pemurataan, perolehi 10 626 unit dengan RM20 000. Kos purata?", "RM1.88"],
  ["Siapa lebih bijak antara Linda dan Esther?", "Esther, kos purata lebih rendah"],
  ["Apakah kelebihan strategi pemurataan?", "Mengambil kesempatan perubahan harga, kos purata lebih rendah"],
  ["Encik Yusuf: jumlah pulangan RM456 000, kos RM600 000. ROI?", "76%"],
  ["Apakah risiko saham berbanding simpanan tetap?", "Risiko saham lebih tinggi"],
  ["Apakah kecairan hartanah berbanding simpanan?", "Hartanah kurang cair, ambil masa untuk dijual"],
  ["Apakah pulangan amanah saham?", "Pulangan amanah saham (unit trust)"],
  ["Apakah maksud diversifikasi portfolio?", "Melabur dalam pelbagai instrumen untuk kurangkan risiko"],

  // Deck 3: Kredit, Hutang dan Pinjaman (Cards 41-60)
  ["Apakah maksud kredit?", "Perjanjian meminjam wang/barang untuk dibayar kemudian"],
  ["Berapa tempoh tanpa faedah biasa kad kredit?", "20 hari dari tarikh penyata"],
  ["Berapa bayaran minimum biasa kad kredit?", "5% baki akhir atau RM50, mana lebih tinggi"],
  ["Apakah kesan membayar hanya bayaran minimum?", "Caj faedah berterusan dikenakan pada baki"],
  ["Apakah kelebihan kad kredit?", "Rebat tunai, mata ganjaran, kemudahan transaksi"],
  ["Apakah kekurangan kad kredit?", "Caj yuran tahunan, faedah, risiko berbelanja lebih"],
  ["Apakah formula bayaran balik pinjaman sama rata?", "A = P + Prt"],
  ["Apakah formula ansuran bulanan?", "A / bilangan bulan"],
  ["Encik Azlan pinjam RM10 000, 4% sama rata, 7 tahun. A?", "RM12 800"],
  ["Daripada soalan di atas, ansuran bulanan (84 bulan)?", "RM152.38"],
  ["Apakah dua jenis kaedah faedah pinjaman?", "Faedah kadar sama rata dan faedah atas baki"],
  ["Bagaimana faedah atas baki dikira?", "Berdasarkan baki semasa setiap bulan, bukan prinsipal asal"],
  ["Encik Harith pinjam RM10 000, 6% atas baki, ansuran RM150. Faedah bulan 1?", "RM50.00"],
  ["Baki selepas ansuran bulan 1 (RM10000+50-150)?", "RM9 900"],
  ["Faedah bulan 2 (baki RM9900, 6% atas baki)?", "RM49.50"],
  ["Manakah biasanya lebih rendah jumlah faedah: sama rata atau atas baki?", "Faedah atas baki (baki berkurang setiap bulan)"],
  ["Apakah risiko pinjaman tidak berlesen?", "Kadar faedah tidak munasabah dan risiko undang-undang"],
  ["Bagaimana membandingkan dua pakej pinjaman?", "Bandingkan jumlah faedah keseluruhan, bukan kadar peratus sahaja"],
  ["Encik Murugan pinjam RM16 000, ansuran RM320, 5 tahun (60 bulan). Jumlah bayaran balik?", "RM19 200"],
  ["Apakah jumlah faedah bagi pinjaman di atas?", "RM3 200"],
]);
