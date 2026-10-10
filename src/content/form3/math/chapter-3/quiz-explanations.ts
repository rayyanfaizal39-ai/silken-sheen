import type { LocalizedText } from "@/features/quiz/visuals/mathQuestionVisual";

/** Worked feedback is displayed only after an answer has been submitted. */
export const MATH_F3_C3_QUIZ_EXPLANATIONS: Record<number, LocalizedText> = {
  1: {
    bm: "Faedah mudah: I = Prt. P ialah prinsipal, r kadar faedah tahunan dalam perpuluhan, dan t tempoh dalam tahun.",
    dlp: "Simple interest: I = Prt. P is the principal, r the annual rate as a decimal, and t the time in years.",
  },
  2: {
    bm: "P ialah prinsipal, iaitu jumlah wang asal yang disimpan atau dipinjam sebelum faedah.",
    dlp: "P is the principal: the original amount saved or borrowed before interest.",
  },
  3: {
    bm: "r ialah kadar faedah tahunan dalam perpuluhan. Contohnya, 3% = 3 ÷ 100 = 0.03.",
    dlp: "r is the annual interest rate as a decimal. For example, 3% = 3 ÷ 100 = 0.03.",
  },
  4: {
    bm: "t ialah tempoh dalam tahun apabila kadar faedah diberi setahun. Contohnya, 6 bulan = 6 ÷ 12 = 0.5 tahun.",
    dlp: "t is time in years when the rate is annual. For example, 6 months = 6 ÷ 12 = 0.5 years.",
  },
  5: {
    bm: "I = Prt = 4 000 × 0.02 × 1 = RM80. Ini faedah sahaja, bukan jumlah simpanan akhir.",
    dlp: "I = Prt = 4 000 × 0.02 × 1 = RM80. This is the interest alone, not the final savings balance.",
  },
  6: {
    bm: "Akaun simpanan tetap mempunyai tempoh simpanan yang ditetapkan dan biasanya kadar faedah lebih tinggi dalam perbandingan ini. Kadar sebenar bergantung pada terma bank.",
    dlp: "A fixed deposit has a specified savings term and usually a higher interest rate in this comparison. Actual rates depend on the bank’s terms.",
  },
  7: {
    bm: "Saham boleh memberikan dividen serta keuntungan modal apabila dijual pada harga lebih tinggi daripada kos belian. Pulangan ini tidak dijamin.",
    dlp: "Shares can provide dividends and capital gains when sold above their purchase cost. These returns are not guaranteed.",
  },
  8: {
    bm: "Nilai matang: MV = P(1 + r/n)^(nt). Kadar setiap tempoh ialah r/n dan bilangan tempoh pengkompaunan ialah nt.",
    dlp: "Maturity value: MV = P(1 + r/n)^(nt). The rate per period is r/n and the number of compounding periods is nt.",
  },
  9: {
    bm: "n ialah bilangan pengkompaunan setahun: tahunan n = 1, suku tahunan n = 4, bulanan n = 12.",
    dlp: "n is the number of compounding periods per year: yearly n = 1, quarterly n = 4, monthly n = 12.",
  },
  10: {
    bm: "ROI = (jumlah pulangan bersih ÷ kos pelaburan) × 100%. Jumlah pulangan ialah keuntungan, bukan keseluruhan wang diterima daripada jualan.",
    dlp: "ROI = (total net return ÷ investment cost) × 100%. The return is the gain, not all the money received from a sale.",
  },
  11: {
    bm: "Risiko ialah kemungkinan kerugian; pulangan ialah hasil pelaburan; kecairan ialah keupayaan menukar pelaburan kepada tunai dengan segera.",
    dlp: "Risk concerns possible losses; return is the investment gain; liquidity is the ability to convert the investment into cash quickly.",
  },
  12: {
    bm: "Kecairan menerangkan betapa mudah dan cepat pelaburan boleh ditukar kepada tunai. Ia bukan jumlah faedah atau kadar pulangan.",
    dlp: "Liquidity describes how easily and quickly an investment can be converted into cash. It is not the amount of interest or the return rate.",
  },
  13: {
    bm: "Kredit membolehkan wang atau barang diperoleh sekarang dengan persetujuan untuk membayar kemudian. Jumlah yang perlu dibayar menjadi hutang.",
    dlp: "Credit allows money or goods to be obtained now with an agreement to pay later. The amount owed becomes a debt.",
  },
  14: {
    bm: "Baki tempoh = 20 − 7 = 13 hari. Gunakan tempoh yang dinyatakan dalam soalan ini; terma kad lain boleh berbeza.",
    dlp: "Remaining time = 20 − 7 = 13 days. Use the period stated in this question; other cards may have different terms.",
  },
  15: {
    bm: "5% × RM800 = RM40. Bandingkan RM40 dengan RM50 dan pilih yang lebih tinggi: RM50. Bayaran minimum bukan bayaran penuh baki penyata.",
    dlp: "5% × RM800 = RM40. Compare RM40 with RM50 and choose the larger amount: RM50. The minimum payment does not settle the full statement balance.",
  },
  16: {
    bm: "Bagi pinjaman faedah sama rata, I = Prt dikira atas prinsipal asal. Jumlah bayaran balik A = P + I = P + Prt.",
    dlp: "For a flat-rate loan, I = Prt is calculated on the original principal. Total repayment A = P + I = P + Prt.",
  },
  17: {
    bm: "Ansuran bulanan = jumlah bayaran balik A ÷ bilangan bulan. Tukar tahun kepada bulan dengan mendarab 12.",
    dlp: "Monthly instalment = total repayment A ÷ number of months. Convert years to months by multiplying by 12.",
  },
  18: {
    bm: "Rebat tunai dan mata ganjaran ialah kelebihan kad yang dinyatakan. Kad kredit masih tertakluk pada caj, had dan syarat pembayaran.",
    dlp: "Cash rebates and reward points are benefits of the stated card. Credit cards still have charges, limits and payment conditions.",
  },
  19: {
    bm: "Caj faedah boleh menambah jumlah hutang, manakala kemudahan kredit boleh membawa kepada perbelanjaan melebihi kemampuan.",
    dlp: "Finance charges can increase the debt, while access to credit can lead to spending beyond one’s means.",
  },
  20: {
    bm: "Strategi pemurataan kos melaburkan amaun tetap secara berkala. Harga yang berbeza menghasilkan bilangan unit yang berbeza; keuntungan tidak dijamin.",
    dlp: "Dollar-cost averaging invests a fixed amount at regular intervals. Different prices buy different numbers of units; profits are not guaranteed.",
  },
  21: {
    bm: "I = 5 000 × 0.03 × 2 = RM300. Gunakan kadar 3% = 0.03 dan tempoh 2 tahun.",
    dlp: "I = 5 000 × 0.03 × 2 = RM300. Use 3% = 0.03 and a term of 2 years.",
  },
  22: {
    bm: "6 bulan = 6/12 = 0.5 tahun. I = 10 000 × 0.04 × 0.5 = RM200.",
    dlp: "6 months = 6/12 = 0.5 years. I = 10 000 × 0.04 × 0.5 = RM200.",
  },
  23: {
    bm: "MV = 10 000(1 + 0.05/12)^(12 × 1) = RM10 511.6189… ≈ RM10 511.62. Bundarkan pada langkah akhir.",
    dlp: "MV = 10 000(1 + 0.05/12)^(12 × 1) = RM10 511.6189… ≈ RM10 511.62. Round only at the final step.",
  },
  24: {
    bm: "A: 10 000(1 + 0.05/4)^4 ≈ RM10 509.45. B: 10 000(1 + 0.05/12)^12 ≈ RM10 511.62. Simpanan B mempunyai nilai matang lebih tinggi.",
    dlp: "A: 10 000(1 + 0.05/4)^4 ≈ RM10 509.45. B: 10 000(1 + 0.05/12)^12 ≈ RM10 511.62. Deposit B has the higher maturity value.",
  },
  25: {
    bm: "Hibah diterima = 20 500 − 20 000 = RM500. Peratus hibah = (500 ÷ 20 000) × 100% = 2.5%. Ini hibah yang telah diterima, bukan kadar dijamin.",
    dlp: "Hibah received = 20 500 − 20 000 = RM500. Hibah percentage = (500 ÷ 20 000) × 100% = 2.5%. This is the hibah received, not a guaranteed rate.",
  },
  26: {
    bm: "ROI = (456 000 ÷ 600 000) × 100% = 76%. Gunakan jumlah pulangan sebagai pengangka dan kos pelaburan sebagai penyebut.",
    dlp: "ROI = (456 000 ÷ 600 000) × 100% = 76%. Use total return as the numerator and investment cost as the denominator.",
  },
  27: {
    bm: "Bilangan unit = jumlah pelaburan ÷ harga seunit = 20 000 ÷ 2.00 = 10 000 unit.",
    dlp: "Number of units = investment amount ÷ unit price = 20 000 ÷ 2.00 = 10 000 units.",
  },
  28: {
    bm: "Kos purata seunit = 20 000 ÷ 10 626 = RM1.8821… ≈ RM1.88 kepada sen terdekat.",
    dlp: "Average cost per unit = 20 000 ÷ 10 626 = RM1.8821… ≈ RM1.88 to the nearest sen.",
  },
  29: {
    bm: "Linda: 20 000 ÷ 10 000 = RM2.00 seunit. Esther: 20 000 ÷ 10 626 ≈ RM1.88 seunit. Esther mempunyai kos purata lebih rendah dalam data ini.",
    dlp: "Linda: 20 000 ÷ 10 000 = RM2.00 per unit. Esther: 20 000 ÷ 10 626 ≈ RM1.88 per unit. Esther has the lower average cost in these data.",
  },
  30: {
    bm: "I = 10 000 × 0.04 × 7 = RM2 800. A = 10 000 + 2 800 = RM12 800.",
    dlp: "I = 10 000 × 0.04 × 7 = RM2 800. A = 10 000 + 2 800 = RM12 800.",
  },
  31: {
    bm: "Ansuran = 12 800 ÷ 84 = RM152.3809… ≈ RM152.38 kepada sen terdekat.",
    dlp: "Instalment = 12 800 ÷ 84 = RM152.3809… ≈ RM152.38 to the nearest sen.",
  },
  32: {
    bm: "Kadar bulanan = 0.06 ÷ 12 = 0.005. Faedah bulan pertama = 10 000 × 0.005 = RM50.00.",
    dlp: "Monthly rate = 0.06 ÷ 12 = 0.005. First-month interest = 10 000 × 0.005 = RM50.00.",
  },
  33: {
    bm: "Faedah dikira atas baki semasa: 9 900 × (0.06 ÷ 12) = RM49.50, bukan atas prinsipal asal RM10 000.",
    dlp: "Interest uses the current balance: 9 900 × (0.06 ÷ 12) = RM49.50, rather than the original RM10 000 principal.",
  },
  34: {
    bm: "Baki selepas ansuran = 10 000 + 50 − 150 = RM9 900. Daripada ansuran RM150, RM50 membayar faedah dan RM100 mengurangkan prinsipal.",
    dlp: "Balance after instalment = 10 000 + 50 − 150 = RM9 900. Of the RM150 instalment, RM50 pays interest and RM100 reduces principal.",
  },
  35: {
    bm: "8 tahun = 8 × 12 = 96 bulan. A = 218.75 × 96 = RM21 000.",
    dlp: "8 years = 8 × 12 = 96 months. A = 218.75 × 96 = RM21 000.",
  },
  36: {
    bm: "A = P(1 + rt). P = 21 000 ÷ (1 + 0.05 × 8) = 21 000 ÷ 1.4 = RM15 000.",
    dlp: "A = P(1 + rt). P = 21 000 ÷ (1 + 0.05 × 8) = 21 000 ÷ 1.4 = RM15 000.",
  },
  37: {
    bm: "5 tahun = 60 bulan. Jumlah bayaran balik = 320 × 60 = RM19 200.",
    dlp: "5 years = 60 months. Total repayment = 320 × 60 = RM19 200.",
  },
  38: {
    bm: "Jumlah faedah = jumlah bayaran balik − prinsipal = 19 200 − 16 000 = RM3 200.",
    dlp: "Total interest = total repayment − principal = 19 200 − 16 000 = RM3 200.",
  },
  39: {
    bm: "r = I ÷ (Pt) = 3 200 ÷ (16 000 × 5) = 0.04. Kadar setahun = 0.04 × 100% = 4%.",
    dlp: "r = I ÷ (Pt) = 3 200 ÷ (16 000 × 5) = 0.04. Annual rate = 0.04 × 100% = 4%.",
  },
  40: {
    bm: "Bank A tidak memerlukan penjamin, jadi memenuhi syarat yang ditanya. Ini bukan keputusan tentang kemampuan ansuran atau jumlah kos pinjaman.",
    dlp: "Bank A does not require a guarantor, so it meets the stated condition. This does not determine instalment affordability or the total borrowing cost.",
  },
  41: {
    bm: "Pendahuluan = 10% × 600 000 = RM60 000. Keuntungan bersih = 1 300 000 − 486 000 − 60 000 − 450 000 − 15 000 − 15 000 − 18 000 = RM256 000.",
    dlp: "Down payment = 10% × 600 000 = RM60 000. Net gain = 1 300 000 − 486 000 − 60 000 − 450 000 − 15 000 − 15 000 − 18 000 = RM256 000.",
  },
  42: {
    bm: "Jumlah pulangan = sewa + keuntungan modal bersih = 200 000 + 256 000 = RM456 000.",
    dlp: "Total return = rent + net capital gain = 200 000 + 256 000 = RM456 000.",
  },
  43: {
    bm: "Nilai syer asal = 6 000 × RM1 = RM6 000. Dividen = 6 000 × 0.06 = RM360.",
    dlp: "Original share value = 6 000 × RM1 = RM6 000. Dividend = 6 000 × 0.06 = RM360.",
  },
  44: {
    bm: "1 syer bonus bagi setiap 2 syer asal: bilangan bonus = 6 000 ÷ 2 = 3 000 unit.",
    dlp: "1 bonus share for every 2 original shares: bonus shares = 6 000 ÷ 2 = 3 000 units.",
  },
  45: {
    bm: "Jumlah syer selepas bonus = syer asal + syer bonus = 6 000 + 3 000 = 9 000 unit.",
    dlp: "Total shares after bonus = original shares + bonus shares = 6 000 + 3 000 = 9 000 units.",
  },
  46: {
    bm: "MV = 5 000(1 + 0.04/4)^(4 × 3) = RM5 634.1251… Faedah = MV − 5 000 = RM634.1251… ≈ RM634.13.",
    dlp: "MV = 5 000(1 + 0.04/4)^(4 × 3) = RM5 634.1251… Interest = MV − 5 000 = RM634.1251… ≈ RM634.13.",
  },
  47: {
    bm: "I = Prt = 15 000 × 0.05 × 5 = RM3 750. Faedah sama rata dikira atas prinsipal asal.",
    dlp: "I = Prt = 15 000 × 0.05 × 5 = RM3 750. Flat-rate interest uses the original principal.",
  },
  48: {
    bm: "I = 15 000 × 0.05 × 5 = RM3 750. A = 15 000 + 3 750 = RM18 750. Ansuran = 18 750 ÷ 60 = RM312.50.",
    dlp: "I = 15 000 × 0.05 × 5 = RM3 750. A = 15 000 + 3 750 = RM18 750. Instalment = 18 750 ÷ 60 = RM312.50.",
  },
  49: {
    bm: "Faedah = RM0 kerana pembelian ini layak untuk tempoh tanpa faedah dan baki penyata dibayar penuh tepat pada masanya seperti dinyatakan.",
    dlp: "Interest = RM0 because this purchase qualifies for the interest-free period and the statement balance is paid in full on time, as stated.",
  },
  50: {
    bm: "Jumlah transaksi = 250 + 50 = SGD300. Caj tambahan = 300 × 0.01 = SGD3.00.",
    dlp: "Transaction total = 250 + 50 = SGD300. Surcharge = 300 × 0.01 = SGD3.00.",
  },
  51: {
    bm: "Kos L dalam RM = 303 × 3.30 = RM999.90. Kos V = RM799. Oleh sebab 799 < 999.90, Syarikat V lebih murah.",
    dlp: "L’s cost in RM = 303 × 3.30 = RM999.90. V’s cost = RM799. Since 799 < 999.90, Company V is cheaper.",
  },
  52: {
    bm: "Faedah atas baki berkurangan dikira atas baki semasa yang belum dibayar. Faedah sama rata menggunakan prinsipal asal.",
    dlp: "Reducing-balance interest uses the current outstanding balance. Flat-rate interest uses the original principal.",
  },
  53: {
    bm: "Pada tahun kedua, faedah kompaun dikira atas prinsipal serta faedah tahun pertama. Faedah mudah dikira atas prinsipal asal sahaja.",
    dlp: "In year 2, compound interest is calculated on the principal plus year 1’s interest. Simple interest uses only the original principal.",
  },
  54: {
    bm: "Keuntungan bersih = 600 000 − 30 000 − 475 000 = RM95 000. Jumlah pulangan = 95 000 + 60 000 = RM155 000. Kos lain diabaikan seperti arahan soalan.",
    dlp: "Net gain = 600 000 − 30 000 − 475 000 = RM95 000. Total return = 95 000 + 60 000 = RM155 000. Other costs are ignored as instructed.",
  },
  55: {
    bm: "ROI = (155 000 ÷ 300 000) × 100% = 51.666…% ≈ 51.7% kepada 1 tempat perpuluhan, menggunakan penyebut yang diberi.",
    dlp: "ROI = (155 000 ÷ 300 000) × 100% = 51.666…% ≈ 51.7% to 1 decimal place, using the stated denominator.",
  },
};
