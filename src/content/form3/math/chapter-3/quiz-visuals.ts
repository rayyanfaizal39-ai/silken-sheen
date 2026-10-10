import type { MathFinanceVisual } from "@/features/quiz/visuals/mathFinanceVisual";
import type { LocalizedText } from "@/features/quiz/visuals/mathQuestionVisual";
const text = (bm: string, dlp = bm): LocalizedText => ({ bm, dlp });
const entry = (
  bm: string,
  dlp: string,
  value: string,
  englishValue = value,
) => ({ label: text(bm, dlp), value: text(value, englishValue) });
function model(
  layout: MathFinanceVisual["layout"],
  title: LocalizedText,
  entries: MathFinanceVisual["entries"],
  target: LocalizedText,
): MathFinanceVisual {
  return { kind: "finance-model", layout, title, entries, target };
}
const interest = text("Faedah", "Interest");
const repayment = text("Jumlah bayaran balik", "Total repayment");
const instalment = text("Ansuran bulanan", "Monthly instalment");
const roi = text("ROI");
const savings = (
  principal: string,
  rate: string,
  term: string,
  englishTerm: string,
  target = interest,
  frequency?: string,
) =>
  model(
    "timeline",
    text("Simpanan", "Savings"),
    [
      entry("Simpanan awal", "Initial deposit", principal),
      entry("Kadar tahunan", "Annual rate", rate),
      ...(frequency ? [entry("Pengkompaunan", "Compounding", frequency)] : []),
      entry("Tempoh", "Term", term, englishTerm),
    ],
    target,
  );
const loan = (
  principal: string,
  rate: string,
  term: string,
  englishTerm: string,
  target = repayment,
) =>
  model(
    "timeline",
    text("Pinjaman faedah sama rata", "Flat-rate loan"),
    [
      entry("Prinsipal", "Principal", principal),
      entry("Kadar tahunan", "Annual rate", rate),
      entry("Tempoh", "Term", term, englishTerm),
    ],
    target,
  );
const ledger = (
  entries: MathFinanceVisual["entries"],
  target: LocalizedText,
  title = text("Ringkasan transaksi", "Transaction summary"),
) => model("ledger", title, entries, target);
const comparison = (
  entries: MathFinanceVisual["entries"],
  target: LocalizedText,
) => model("comparison", text("Perbandingan", "Comparison"), entries, target);

/** Both banks share these same givens. No computed answer is included. */
export const MATH_F3_C3_QUIZ_VISUALS: Partial<
  Record<number, MathFinanceVisual>
> = {
  5: savings("RM4 000", "2%", "1 tahun", "1 year"),
  14: model(
    "timeline",
    text("Tempoh tanpa faedah", "Interest-free period"),
    [
      entry("Tempoh diberi", "Stated period", "20 hari", "20 days"),
      entry("Masa berlalu", "Time elapsed", "7 hari", "7 days"),
    ],
    text("Baki hari", "Days remaining"),
  ),
  15: ledger(
    [
      entry("Baki penyata", "Statement balance", "RM800"),
      entry("Bayaran berdasarkan peratus", "Percentage payment", "5%"),
      entry("Bayaran minimum tetap", "Fixed minimum", "RM50"),
      entry(
        "Peraturan",
        "Rule",
        "Pilih yang lebih tinggi",
        "Choose the higher amount",
      ),
    ],
    text("Bayaran minimum", "Minimum payment"),
  ),
  21: savings("RM5 000", "3%", "2 tahun", "2 years"),
  22: savings("RM10 000", "4%", "6 bulan", "6 months"),
  23: savings(
    "RM10 000",
    "5%",
    "1 tahun",
    "1 year",
    text("Nilai matang", "Maturity value"),
    "n = 12",
  ),
  24: comparison(
    [
      entry(
        "Simpanan A",
        "Deposit A",
        "RM10 000\n5%\n1 tahun\nn = 4",
        "RM10 000\n5%\n1 year\nn = 4",
      ),
      entry(
        "Simpanan B",
        "Deposit B",
        "RM10 000\n5%\n1 tahun\nn = 12",
        "RM10 000\n5%\n1 year\nn = 12",
      ),
    ],
    text("Nilai matang lebih tinggi", "Higher maturity value"),
  ),
  25: ledger(
    [
      entry("Simpanan awal", "Initial deposit", "RM20 000"),
      entry("Jumlah selepas 1 tahun", "Amount after 1 year", "RM20 500"),
    ],
    text("Peratus hibah", "Hibah percentage"),
  ),
  26: ledger(
    [
      entry("Jumlah pulangan", "Total return", "RM456 000"),
      entry("Kos pelaburan", "Investment cost", "RM600 000"),
    ],
    roi,
  ),
  27: ledger(
    [
      entry("Jumlah pelaburan", "Investment amount", "RM20 000"),
      entry("Harga seunit", "Price per unit", "RM2.00"),
    ],
    text("Bilangan unit", "Number of units"),
  ),
  28: ledger(
    [
      entry("Jumlah pelaburan", "Investment amount", "RM20 000"),
      entry("Unit diperoleh", "Units obtained", "10 626"),
    ],
    text("Kos purata seunit", "Average cost per unit"),
  ),
  29: comparison(
    [
      entry(
        "Puan Linda",
        "Puan Linda",
        "RM20 000\n10 000 unit",
        "RM20 000\n10 000 units",
      ),
      entry(
        "Puan Esther",
        "Puan Esther",
        "RM20 000\n10 626 unit",
        "RM20 000\n10 626 units",
      ),
    ],
    text("Kos purata lebih rendah", "Lower average cost"),
  ),
  30: loan("RM10 000", "4%", "7 tahun", "7 years"),
  31: ledger(
    [
      entry("Jumlah bayaran balik", "Total repayment", "RM12 800"),
      entry("Bilangan bulan", "Number of months", "84"),
    ],
    instalment,
  ),
  32: model(
    "timeline",
    text("Faedah atas baki", "Reducing-balance interest"),
    [
      entry("Baki awal bulan 1", "Opening balance, month 1", "RM10 000"),
      entry("Kadar tahunan", "Annual rate", "6%"),
      entry("Kadar bulanan", "Monthly rate", "6% ÷ 12"),
      entry("Ansuran akhir bulan", "Month-end instalment", "RM150"),
    ],
    text("Faedah bulan 1", "Month 1 interest"),
  ),
  33: ledger(
    [
      entry("Baki awal bulan 2", "Opening balance, month 2", "RM9 900"),
      entry("Kadar tahunan", "Annual rate", "6%"),
      entry("Kadar bulanan", "Monthly rate", "6% ÷ 12"),
    ],
    text("Faedah bulan 2", "Month 2 interest"),
  ),
  34: model(
    "timeline",
    text("Baki selepas ansuran", "Balance after instalment"),
    [
      entry("Baki awal", "Opening balance", "RM10 000"),
      entry("Faedah ditambah", "Interest added", "+ RM50"),
      entry("Ansuran dibayar", "Instalment paid", "− RM150"),
    ],
    text("Baki akhir", "Closing balance"),
  ),
  35: ledger(
    [
      entry("Ansuran bulanan", "Monthly instalment", "RM218.75"),
      entry("Tempoh", "Term", "8 tahun", "8 years"),
    ],
    repayment,
  ),
  36: ledger(
    [
      entry("Jumlah bayaran balik", "Total repayment", "RM21 000"),
      entry("Kadar tahunan sama rata", "Annual flat rate", "5%"),
      entry("Tempoh", "Term", "8 tahun", "8 years"),
    ],
    text("Prinsipal P", "Principal P"),
  ),
  37: ledger(
    [
      entry("Prinsipal", "Principal", "RM16 000"),
      entry("Ansuran bulanan", "Monthly instalment", "RM320"),
      entry("Tempoh", "Term", "5 tahun", "5 years"),
    ],
    repayment,
  ),
  38: ledger(
    [
      entry("Jumlah bayaran balik", "Total repayment", "RM19 200"),
      entry("Prinsipal", "Principal", "RM16 000"),
    ],
    interest,
  ),
  39: ledger(
    [
      entry("Prinsipal", "Principal", "RM16 000"),
      entry("Jumlah faedah", "Total interest", "RM3 200"),
      entry("Tempoh", "Term", "5 tahun", "5 years"),
    ],
    text("Kadar tahunan", "Annual rate"),
  ),
  40: comparison(
    [
      entry(
        "Bank A",
        "Bank A",
        "9 tahun\n4.5%\nPenjamin tidak diperlukan",
        "9 years\n4.5%\nNo guarantor required",
      ),
      entry(
        "Bank B",
        "Bank B",
        "6 tahun\n5%\nPenjamin diperlukan",
        "6 years\n5%\nGuarantor required",
      ),
    ],
    text("Tanpa penjamin", "Without a guarantor"),
  ),
  41: ledger(
    [
      entry("Harga jualan", "Sale price", "RM1 300 000"),
      entry("Harga belian", "Purchase price", "RM600 000"),
      entry("Pendahuluan", "Down payment", "10%"),
      entry("Baki pinjaman", "Outstanding loan", "RM486 000"),
      entry("Ansuran terdahulu", "Earlier instalments", "RM450 000"),
      entry("Kos guaman", "Legal fees", "RM15 000"),
      entry("Duti setem", "Stamp duty", "RM15 000"),
      entry("Komisen", "Commission", "RM18 000"),
    ],
    text("Keuntungan modal bersih", "Net capital gain"),
  ),
  42: ledger(
    [
      entry("Keuntungan modal bersih", "Net capital gain", "RM256 000"),
      entry("Sewa terkumpul", "Accumulated rent", "RM200 000"),
    ],
    text("Jumlah pulangan", "Total return"),
  ),
  43: ledger(
    [
      entry("Syer asal", "Original shares", "6 000"),
      entry("Nilai seunit", "Value per share", "RM1"),
      entry("Kadar dividen", "Dividend rate", "6%"),
    ],
    text("Jumlah dividen", "Total dividend"),
  ),
  44: ledger(
    [
      entry("Syer asal", "Original shares", "6 000"),
      entry("Nisbah bonus : asal", "Bonus : original ratio", "1 : 2"),
    ],
    text("Syer bonus", "Bonus shares"),
  ),
  45: ledger(
    [
      entry("Syer asal", "Original shares", "6 000"),
      entry("Syer bonus", "Bonus shares", "3 000"),
    ],
    text("Jumlah syer", "Total shares"),
  ),
  46: savings(
    "RM5 000",
    "4%",
    "3 tahun",
    "3 years",
    text("Faedah terkumpul", "Accumulated interest"),
    "n = 4",
  ),
  47: loan("RM15 000", "5%", "5 tahun", "5 years", interest),
  48: loan(
    "RM15 000",
    "5%",
    "5 tahun / 60 bulan",
    "5 years / 60 months",
    text("Jumlah dan ansuran", "Total and instalment"),
  ),
  49: ledger(
    [
      entry("Harga pembelian", "Purchase price", "RM3 200"),
      entry("Tunai", "Cash", "RM2 000"),
      entry("Kad kredit", "Credit card", "RM1 200"),
      entry(
        "Bayaran",
        "Payment",
        "Penuh dalam tempoh tanpa faedah",
        "In full within the interest-free period",
      ),
    ],
    interest,
  ),
  50: ledger(
    [
      entry("Harga beg", "Bag price", "SGD250"),
      entry("Penghantaran", "Shipping", "SGD50"),
      entry("Kadar caj tambahan", "Surcharge rate", "1%"),
    ],
    text("Caj tambahan", "Surcharge"),
  ),
  51: comparison(
    [
      entry("Syarikat L", "Company L", "SGD303\nSGD1 = RM3.30"),
      entry("Syarikat V", "Company V", "RM799"),
    ],
    text("Harga lebih rendah dalam RM", "Lower price in RM"),
  ),
  54: ledger(
    [
      entry("Harga jualan", "Sale price", "RM600 000"),
      entry("Pendahuluan", "Down payment", "RM30 000"),
      entry("Jumlah bayaran pinjaman", "Total loan payments", "RM475 000"),
      entry("Sewa terkumpul", "Accumulated rent", "RM60 000"),
    ],
    text("Jumlah pulangan bersih", "Total net return"),
  ),
  55: ledger(
    [
      entry("Jumlah pulangan bersih", "Total net return", "RM155 000"),
      entry("Kos pelaburan awal", "Initial investment cost", "RM300 000"),
    ],
    roi,
  ),
};
