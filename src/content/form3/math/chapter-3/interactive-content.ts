// Form 3 Mathematics, Chapter 3 — Consumer Mathematics: Savings and
// Investment, Credit and Debt / Matematik Pengguna: Simpanan dan
// Pelaburan, Kredit dan Hutang. 2 official subtopics (3.1 Savings and
// Investments, 3.2 Credit and Debt Management), built as normal.
// Interactive bilingual content. EN sourced from T3_BT_MAT_DLP_-_MATHEMATICS.pdf,
// BM sourced from T3_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math3-chapter3-consumer-mathematics-notes-v1.html.
// Content only — no presentation markup (rendered by MathF3Chapter3NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF3C3Visual =
  | {
      kind: "interestCompare";
      principal: number;
      rate: number;
      years: number;
      simpleLabel: string;
      compoundLabel: string;
      yearAbbrev: string;
      caption: string;
    }
  | {
      kind: "creditFlow";
      youLabel: string;
      bankLabel: string;
      sellerLabel: string;
      repayLaterLabel: string;
      paysNowLabel: string;
      caption: string;
    };

export interface MathF3C3Block {
  formula: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked?: { question: string; steps: WorkedStep[] };
}

export interface MathF3C3SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF3C3Visual;
  blocks: MathF3C3Block[];
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF3C3Content {
  subtopics: MathF3C3SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF3C3Content = {
  subtopics: [
    {
      num: "3.1",
      title: "Savings and Investments",
      ideaParagraphs: [
        "Simple interest pays you the same amount every year, based only on your original deposit. Compound interest pays you interest on your ORIGINAL deposit PLUS every year's earned interest — so the amount you earn keeps growing.",
      ],
      visual: {
        kind: "interestCompare",
        principal: 1000,
        rate: 0.05,
        years: 5,
        simpleLabel: "Simple",
        compoundLabel: "Compound",
        yearAbbrev: "Yr",
        caption:
          "Same RM1000 at 5% — amber (simple) grows in a straight line, green (compound) pulls ahead more each year",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Simple Interest",
            formula: "I = Prt",
            legend: [
              { label: "P", text: "= principal, r = rate (as a decimal), t = time in years" },
            ],
          },
          worked: {
            question:
              "Encik Badrul deposits RM500 at 3% per annum for 2 years. Find the total interest earned.",
            steps: [
              {
                calc: "I = 500 × 0.03 × 2",
                why: "Plug principal, rate (as a decimal), and time straight into I=Prt.",
              },
              { calc: "I = RM30", why: "500×0.03=15, then ×2 years = 30." },
            ],
          },
        },
        {
          formula: {
            eyebrow: "Compound Interest",
            formula: "MV = P(1 + r/n)ⁿᵗ",
            legend: [{ label: "MV", text: "= matured value, n = times compounded per year" }],
          },
          worked: {
            question:
              "RM800 is deposited at 3% per annum, compounded yearly. Find the savings after 2 years.",
            steps: [
              {
                calc: "MV = 800(1+0.03/1)^(1×2)",
                why: "Compounded yearly means n=1 — the rate isn't split, and the exponent is just the number of years.",
              },
              {
                calc: "MV = 800(1.03)² = RM848.72",
                why: "Raise 1.03 to the power of 2, then multiply by the principal.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "RM1500 is saved at 4% per annum, compounded every 6 months (n=2). Find the total savings after 1 year.",
        answer: "MV = 1500(1+0.04/2)^(2×1) = 1500(1.02)² = RM1560.60.",
      },
      mistake: {
        wrong:
          "Forgetting to divide the rate by n, or multiply the time by n, when interest compounds more than once a year.",
        right:
          "Both r/n AND the exponent nt need the SAME n — if compounding twice a year, both change together.",
      },
      practice: {
        easy: {
          question: "RM400 is deposited at 2% per annum for 1 year. Find the interest.",
          answer: "RM8",
        },
        medium: {
          question: "RM1000 deposited at 4% per annum for 6 months. Find the interest.",
          answer: "I=1000×0.04×0.5=RM20.",
        },
        hard: {
          question:
            "Compare: RM2000 at 5% simple interest vs 5% compound interest (yearly), both for 3 years. Which earns more, and by how much?",
          answer:
            "Simple: 2000×0.05×3=RM300. Compound: 2000(1.05)³−2000=RM315.25. Compound earns RM15.25 more.",
        },
      },
      realLife: ["🏦 Savings and fixed deposit accounts", "📈 Unit trust and share investments"],
    },
    {
      num: "3.2",
      title: "Credit and Debt Management",
      ideaParagraphs: [
        "Credit is permission to pay LATER — a bank pays the seller now, and you repay the bank within an agreed period. Whatever you haven't paid back yet becomes your debt.",
      ],
      visual: {
        kind: "creditFlow",
        youLabel: "You",
        bankLabel: "Bank",
        sellerLabel: "Seller",
        repayLaterLabel: "repay later",
        paysNowLabel: "pays now",
        caption:
          "The bank pays the seller immediately — what you owe the bank until you repay is your debt",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Managing Credit Wisely",
            formula: "Pay in full within the interest-free period = no extra charges",
          },
          worked: {
            question:
              "Puan Zuraidah wants to buy a fridge but is short RM2500 in cash. A shop offers an instant loan at 4% per annum, and she also has a credit card. Which should she use, and why?",
            steps: [
              {
                calc: "Compare: instant loan interest vs credit card interest-free period",
                why: "The instant loan charges interest from day one. A credit card charges NO interest if repaid within the interest-free period.",
              },
              {
                calc: "Best choice: the credit card, repaid promptly",
                why: "If she can repay before the statement due date, the credit card costs her nothing extra — the instant loan always costs 4% per annum.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Encik Syed buys an air conditioner and is RM1200 short in cash, but knows he'll have the money by the end of the month when his salary arrives. Which credit facility fits best?",
        answer:
          "A credit card — if he repays within the interest-free period (before his salary-payday statement), he avoids all extra charges.",
      },
      mistake: {
        wrong: "Paying only the credit card's minimum amount, thinking the debt is under control.",
        right:
          'Paying only the minimum lets the bank charge interest on the REST — the debt keeps growing even while you\'re "paying" it.',
      },
      practice: {
        easy: {
          question: "What is the minimum age to apply for a credit card?",
          answer: "21 years old and above.",
        },
        medium: {
          question: "Name two advantages and two disadvantages of using a credit card.",
          answer:
            "Advantages: cash rebates, no need to carry cash. Disadvantages: annual/interest charges, risk of overspending.",
        },
        hard: {
          question:
            "A person has been relying on credit cards and is now in serious debt. Suggest two practical steps they could take to manage this responsibly.",
          answer:
            "Make a personal budget to track income and spending; pay more than the minimum each month to reduce the balance faster; seek credit counselling if needed.",
        },
      },
      realLife: ["💳 Credit card statements", "🏠 Personal loans and financing"],
    },
  ],
  summary: {
    center: "Consumer Mathematics",
    branches: [
      { title: "Simple Interest", points: ["I=Prt"] },
      { title: "Compound Interest", points: ["MV=P(1+r/n)ⁿᵗ"] },
      { title: "Credit & Debt", points: ["Pay within interest-free period"] },
    ],
  },
  formulaSheet: [
    { formula: "I = Prt", label: "Simple interest" },
    { formula: "MV = P(1+r/n)ⁿᵗ", label: "Compound interest" },
  ],
  quickRevision: [
    "I can calculate simple and compound interest.",
    "I can explain credit, debt, and how to manage them wisely.",
  ],
  examTips: [
    "Always convert the percentage rate to a decimal (divide by 100) before using it in a formula.",
    "If time is given in months, convert to years by dividing by 12 before using I=Prt.",
  ],
  challenge: {
    question:
      "Mrs Liew saves RM1500 at 4% per annum, compounded every 6 months. Find her total savings at the end of 3 years.",
    answer: "MV = 1500(1+0.04/2)^(2×3) = 1500(1.02)⁶ ≈ RM1689.24.",
  },
};

const bm: MathF3C3Content = {
  subtopics: [
    {
      num: "3.1",
      title: "Simpanan dan Pelaburan",
      ideaParagraphs: [
        "Faedah mudah bayar anda jumlah sama setiap tahun, berdasarkan deposit asal sahaja. Faedah kompaun bayar anda faedah atas deposit ASAL TAMBAH faedah diperoleh setiap tahun — jadi jumlah anda perolehi terus berkembang.",
      ],
      visual: {
        kind: "interestCompare",
        principal: 1000,
        rate: 0.05,
        years: 5,
        simpleLabel: "Mudah",
        compoundLabel: "Kompaun",
        yearAbbrev: "Th",
        caption:
          "RM1000 sama pada 5% — ambar (mudah) berkembang garis lurus, hijau (kompaun) mendahului lebih setiap tahun",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Faedah Mudah",
            formula: "I = Prt",
            legend: [
              {
                label: "P",
                text: "= prinsipal, r = kadar (sebagai perpuluhan), t = masa dalam tahun",
              },
            ],
          },
          worked: {
            question:
              "Encik Badrul deposit RM500 pada 3% setahun selama 2 tahun. Cari jumlah faedah diperoleh.",
            steps: [
              {
                calc: "I = 500 × 0.03 × 2",
                why: "Masukkan prinsipal, kadar (sebagai perpuluhan), dan masa terus ke I=Prt.",
              },
              { calc: "I = RM30", why: "500×0.03=15, kemudian ×2 tahun = 30." },
            ],
          },
        },
        {
          formula: {
            eyebrow: "Faedah Kompaun",
            formula: "MV = P(1 + r/n)ⁿᵗ",
            legend: [{ label: "MV", text: "= nilai matang, n = berapa kali dikompaun setahun" }],
          },
          worked: {
            question:
              "RM800 dideposit pada 3% setahun, dikompaun tahunan. Cari simpanan selepas 2 tahun.",
            steps: [
              {
                calc: "MV = 800(1+0.03/1)^(1×2)",
                why: "Dikompaun tahunan bermaksud n=1 — kadar tidak dipecah, dan eksponen hanya bilangan tahun.",
              },
              {
                calc: "MV = 800(1.03)² = RM848.72",
                why: "Naikkan 1.03 kepada kuasa 2, kemudian darab dengan prinsipal.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "RM1500 disimpan pada 4% setahun, dikompaun setiap 6 bulan (n=2). Cari jumlah simpanan selepas 1 tahun.",
        answer: "MV = 1500(1+0.04/2)^(2×1) = 1500(1.02)² = RM1560.60.",
      },
      mistake: {
        wrong:
          "Terlupa bahagi kadar dengan n, atau darab masa dengan n, apabila faedah kompaun lebih daripada sekali setahun.",
        right:
          "Kedua-dua r/n DAN eksponen nt perlukan n SAMA — jika kompaun dua kali setahun, kedua-dua berubah bersama.",
      },
      practice: {
        easy: {
          question: "RM400 dideposit pada 2% setahun selama 1 tahun. Cari faedah.",
          answer: "RM8",
        },
        medium: {
          question: "RM1000 dideposit pada 4% setahun selama 6 bulan. Cari faedah.",
          answer: "I=1000×0.04×0.5=RM20.",
        },
        hard: {
          question:
            "Banding: RM2000 pada 5% faedah mudah lwn 5% faedah kompaun (tahunan), kedua-dua 3 tahun. Mana perolehi lebih, dan berapa banyak?",
          answer:
            "Mudah: 2000×0.05×3=RM300. Kompaun: 2000(1.05)³−2000=RM315.25. Kompaun perolehi RM15.25 lebih.",
        },
      },
      realLife: ["🏦 Akaun simpanan dan simpanan tetap", "📈 Pelaburan unit amanah dan saham"],
    },
    {
      num: "3.2",
      title: "Pengurusan Kredit dan Hutang",
      ideaParagraphs: [
        "Kredit ialah kebenaran untuk bayar KEMUDIAN — bank bayar penjual sekarang, dan anda bayar semula bank dalam tempoh dipersetujui. Apa sahaja belum dibayar semula menjadi hutang anda.",
      ],
      visual: {
        kind: "creditFlow",
        youLabel: "Anda",
        bankLabel: "Bank",
        sellerLabel: "Penjual",
        repayLaterLabel: "bayar kemudian",
        paysNowLabel: "bayar sekarang",
        caption:
          "Bank bayar penjual serta-merta — apa anda berhutang bank sehingga anda bayar semula ialah hutang anda",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Mengurus Kredit dengan Bijak",
            formula: "Bayar penuh dalam tempoh bebas faedah = tiada caj tambahan",
          },
          worked: {
            question:
              "Puan Zuraidah mahu beli peti sejuk tetapi kurang RM2500 tunai. Kedai tawar pinjaman segera 4% setahun, dan dia juga ada kad kredit. Mana dia patut guna, dan kenapa?",
            steps: [
              {
                calc: "Banding: faedah pinjaman segera lwn tempoh bebas faedah kad kredit",
                why: "Pinjaman segera kenakan faedah dari hari pertama. Kad kredit TIDAK kenakan faedah jika dibayar dalam tempoh bebas faedah.",
              },
              {
                calc: "Pilihan terbaik: kad kredit, dibayar segera",
                why: "Jika dia boleh bayar semula sebelum tarikh akhir penyata, kad kredit tidak kos apa-apa tambahan — pinjaman segera sentiasa kos 4% setahun.",
              },
            ],
          },
        },
      ],
      guided: {
        question:
          "Encik Syed beli penyaman udara dan kurang RM1200 tunai, tetapi tahu dia akan ada wang hujung bulan bila gaji tiba. Kemudahan kredit mana paling sesuai?",
        answer:
          "Kad kredit — jika dia bayar semula dalam tempoh bebas faedah (sebelum penyata hari gaji), dia elak semua caj tambahan.",
      },
      mistake: {
        wrong: "Bayar hanya jumlah minimum kad kredit, menyangka hutang terkawal.",
        right:
          'Bayar minimum sahaja bank kenakan faedah pada BAKI — hutang terus berkembang walaupun anda "membayarnya".',
      },
      practice: {
        easy: {
          question: "Apakah umur minimum untuk memohon kad kredit?",
          answer: "21 tahun ke atas.",
        },
        medium: {
          question: "Namakan dua kelebihan dan dua kelemahan menggunakan kad kredit.",
          answer:
            "Kelebihan: rebat tunai, tidak perlu bawa tunai. Kelemahan: caj tahunan/faedah, risiko belanja lebih.",
        },
        hard: {
          question:
            "Seseorang telah bergantung pada kad kredit dan kini berhutang serius. Cadangkan dua langkah praktikal mereka boleh ambil untuk uruskan secara bertanggungjawab.",
          answer:
            "Buat bajet peribadi untuk jejak pendapatan dan perbelanjaan; bayar lebih daripada minimum setiap bulan untuk kurangkan baki lebih cepat; dapatkan kaunseling kredit jika perlu.",
        },
      },
      realLife: ["💳 Penyata kad kredit", "🏠 Pinjaman peribadi dan pembiayaan"],
    },
  ],
  summary: {
    center: "Matematik Pengguna",
    branches: [
      { title: "Faedah Mudah", points: ["I=Prt"] },
      { title: "Faedah Kompaun", points: ["MV=P(1+r/n)ⁿᵗ"] },
      { title: "Kredit & Hutang", points: ["Bayar dalam tempoh bebas faedah"] },
    ],
  },
  formulaSheet: [
    { formula: "I = Prt", label: "Faedah mudah" },
    { formula: "MV = P(1+r/n)ⁿᵗ", label: "Faedah kompaun" },
  ],
  quickRevision: [
    "Saya boleh kira faedah mudah dan kompaun.",
    "Saya boleh terangkan kredit, hutang, dan cara mengurusnya dengan bijak.",
  ],
  examTips: [
    "Sentiasa tukar kadar peratusan kepada perpuluhan (bahagi 100) sebelum guna dalam formula.",
    "Jika masa diberi dalam bulan, tukar kepada tahun dengan bahagi 12 sebelum guna I=Prt.",
  ],
  challenge: {
    question:
      "Puan Liew simpan RM1500 pada 4% setahun, dikompaun setiap 6 bulan. Cari jumlah simpanannya pada akhir 3 tahun.",
    answer: "MV = 1500(1+0.04/2)^(2×3) = 1500(1.02)⁶ ≈ RM1689.24.",
  },
};

export const mathF3C3InteractiveContent: { en: MathF3C3Content; bm: MathF3C3Content } = { en, bm };
