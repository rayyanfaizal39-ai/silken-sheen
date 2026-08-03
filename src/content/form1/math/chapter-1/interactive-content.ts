// Form 1 Mathematics, Chapter 1 — Rational Numbers / Nombor Nisbah
// Interactive bilingual content. EN sourced from T1 BT MAT DLP - MATHEMATICS.pdf,
// BM sourced from T1 BT MAT- MATEMATIK.pdf (KSSM counterpart), cross-checked
// against design-reference/math1-chapter1-rational-numbers-notes-v3.html.
// Content only — no presentation markup (rendered by MathF1Chapter1NotesBlock).
import type { NumberLineMark } from "@/components/notes/blocks/NumberLine";
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export interface MathSubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  numberLine?: { marks: NumberLineMark[]; min: number; max: number; answer?: string };
  formula?: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked: { question: string; steps: WorkedStep[] };
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF1C1Content {
  subtopics: MathSubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF1C1Content = {
  subtopics: [
    {
      num: "1.1",
      title: "Integers",
      ideaParagraphs: [
        "Every day you deal with opposite directions: a floor up or down, money earned or lost, a temperature rising or falling. Positive and negative numbers describe exactly this — direction and amount, in one number.",
        "Integers are whole numbers — positive, negative, or zero. No fractions, no decimals. On a number line, the further right, the greater the value; the further left, the smaller.",
      ],
      numberLine: {
        marks: [
          { value: -5, label: "-5" },
          { value: -3, label: "-3" },
          { value: -1, label: "-1" },
          { value: 0, label: "0" },
          { value: 2, label: "2" },
          { value: 4, label: "4" },
          { value: 6, label: "6" },
        ],
        min: -6,
        max: 6,
        answer: "Ascending: −5, −3, −1, 0, 2, 4, 6",
      },
      formula: {
        eyebrow: "Number Line",
        formula: "… −3, −2, −1, 0, 1, 2, 3 …",
        legend: [
          { label: "Negative", text: "less than zero" },
          { label: "Positive", text: "greater than zero" },
        ],
      },
      worked: {
        question: "Arrange −3, 4, 2, −5, 6, 0, −1 in ascending order.",
        steps: [
          {
            calc: "Plot: −5, −3, −1, 0, 2, 4, 6",
            why: "Placing every number on the line shows relative position at a glance.",
          },
          {
            calc: "Read left to right",
            why: "Ascending order always reads smallest (left) to largest (right).",
          },
          { calc: "−5, −3, −1, 0, 2, 4, 6", why: "This is the final answer." },
        ],
      },
      guided: {
        question: "Arrange −4, 3, 2, 5, −2, −1, −5 in descending order.",
        answer:
          "Plot all 7 numbers on a number line. Descending starts from the furthest right (largest). Answer: 5, 3, 2, −1, −2, −4, −5.",
      },
      mistake: {
        wrong: "−5 is NOT greater than −1, even though 5 > 1.",
        right: "−1 > −5 — for negatives, the smaller digit means the larger value.",
      },
      practice: {
        easy: {
          question: "Determine whether −76 is an integer.",
          answer: "Yes — −76 is a whole number (negative), so it is an integer.",
        },
        medium: {
          question: "Compare and arrange −4, 3, 1, −6, 5, 0, −2 in ascending order.",
          answer: "−6, −4, −2, 0, 1, 3, 5",
        },
        hard: {
          question:
            "A diver was at 50 m below sea level, rising 2 m every 5 seconds. Has the diver reached the surface after 2 minutes?",
          answer:
            "120 ÷ 5 = 24 intervals × 2 m = 48 m risen. −50 + 48 = −2 m. Not yet at the surface (still 2 m below).",
        },
      },
      realLife: [
        "🏦 Bank balances",
        "🌡️ Temperatures",
        "🏢 Lift floors",
        "🤿 Depth below sea level",
      ],
    },
    {
      num: "1.2",
      title: "Basic Operations with Integers",
      ideaParagraphs: [
        "A credit card balance, a temperature that rises then falls, a profit followed by a loss — real situations mix positive and negative changes. On a number line: adding a positive moves you right; adding a negative (or subtracting a positive) moves you left; subtracting a negative moves you right.",
      ],
      formula: {
        eyebrow: "Sign Rules for × and ÷",
        formula: "(+)×(+)=+   (–)×(–)=+   (+)×(–)=–   (–)×(+)=–",
        legend: [
          {
            label: "Rule",
            text: "Same signs → positive. Different signs → negative. (Same rule for ÷.)",
          },
        ],
      },
      worked: {
        question: "Solve: 4 − 12 ÷ (−2) + (−1)",
        steps: [
          { calc: "4 − 12 ÷ (−2) + (−1)", why: "Start with the original expression." },
          { calc: "= 4 − (−6) + (−1)", why: "Division first: 12 ÷ (−2) = −6." },
          {
            calc: "= 4 + 6 − 1 = 9",
            why: "Subtracting a negative = adding a positive; then add/subtract left to right.",
          },
        ],
      },
      guided: {
        question: "Solve: −8 × (−2 + 3)",
        answer: "Brackets first: −2 + 3 = 1. Then: −8 × 1 = −8.",
      },
      mistake: {
        wrong: "Solving left to right, ignoring that ÷ comes before + or −.",
        right: "Always: brackets → × or ÷ → + or −, in that order.",
      },
      practice: {
        easy: { question: "Solve: −6 × (−3)", answer: "18" },
        medium: { question: "Evaluate: −9 × (−4 + 6)", answer: "−18" },
        hard: {
          question:
            "A shop profits RM16,800 in year 1, loses RM6,500 in each of years 2-3, and loses double that in year 4. Total profit/loss?",
          answer: "16 800 − 6 500 − 6 500 − 13 000 = −RM9,200 (a loss)",
        },
      },
      realLife: ["💳 Credit card balances", "📈 Profit and loss"],
    },
    {
      num: "1.3",
      title: "Positive and Negative Fractions",
      ideaParagraphs: [
        "Fractions follow the same number-line logic as integers — positive fractions sit right of zero, negative fractions sit left. To compare two fractions, equate the denominators first, then compare numerators directly.",
      ],
      numberLine: {
        marks: [
          { value: -1.5, label: "-1½", color: "#f87171" },
          { value: 1.5, label: "1½", color: "#4ade80" },
        ],
        min: -2,
        max: 2,
      },
      worked: {
        question: "Solve: 1⅓ × (1⅖ − ⅚)",
        steps: [
          { calc: "1⅓ × (1⅖ − ⅚)", why: "Brackets first." },
          {
            calc: "1⅖ − ⅚ = 17/30",
            why: "Equate denominators (LCM of 5,6 is 30) before subtracting.",
          },
          { calc: "1⅓ × 17/30 = 34/45", why: "Convert 1⅓ to 4/3, then multiply." },
        ],
      },
      guided: {
        question: "Arrange −⅚, −¼, ⅜, −7/12 in ascending order.",
        answer:
          "LCM of 6, 4, 8, 12 is 24. Convert every fraction to 24ths, then compare like integers.",
      },
      mistake: {
        wrong: "Comparing ⅔ and ¾ by numerators alone, before equating denominators.",
        right: "⅔ = 8/12, ¾ = 9/12. Now compare: ¾ > ⅔.",
      },
      practice: {
        easy: {
          question: "Represent ½ and −¾ on a number line.",
          answer: "½ sits halfway between 0 and 1. −¾ sits three-quarters between 0 and −1.",
        },
        medium: { question: "Evaluate: −⅙ + 2⅚ ÷ (−3⅙)", answer: "= −17/19 − ⅙ = −1 7/114" },
        hard: {
          question:
            "A quiz gives +2 per correct answer, −½ per wrong. Mei Ling's wrong-answer score totalled −4 across 20 questions. Her total score?",
          answer: "Wrong = 8, correct = 12. Score = 12×2 − 4 = 20",
        },
      },
      realLife: ["🍰 Recipes", "📝 Quiz scoring"],
    },
    {
      num: "1.4",
      title: "Positive and Negative Decimals",
      ideaParagraphs: [
        'Decimals sit on the number line exactly like fractions and integers. To compare them, line up the decimal points and compare digit by digit — the same "smaller digit = larger value" rule applies to negatives.',
      ],
      numberLine: {
        marks: [
          { value: -0.5, label: "-0.5", color: "#f87171" },
          { value: 0.5, label: "0.5", color: "#4ade80" },
        ],
        min: -1,
        max: 1,
      },
      worked: {
        question: "Evaluate: (7.23 + 2.77) ÷ (−0.8)",
        steps: [
          { calc: "(7.23 + 2.77) ÷ (−0.8)", why: "Brackets first." },
          { calc: "= 10.0 ÷ (−0.8)", why: "7.23 + 2.77 = 10.0" },
          { calc: "= −12.5", why: "Different signs → negative." },
        ],
      },
      guided: {
        question: "Evaluate: −3.7 + (4.25 + 2.85) × 0.3",
        answer: "Brackets first: 4.25 + 2.85 = 7.1. Then × 0.3 = 2.13. Then −3.7 + 2.13 = −1.57.",
      },
      mistake: {
        wrong: 'Thinking −1.6 > −0.3 because "1.6 is bigger".',
        right: "−0.3 > −1.6 — it's closer to zero.",
      },
      practice: {
        easy: {
          question: "Arrange −1.23, −1.48, 0.34, −0.034, 1.034 in ascending order.",
          answer: "−1.48, −1.23, −0.034, 0.34, 1.034",
        },
        medium: { question: "Evaluate: 0.36 − (−8.67) ÷ (−0.3) + 0.82", answer: "−27.72" },
        hard: {
          question:
            "Aisah bought a shirt (RM19.90) and two same-price trousers. She paid RM55, then RM10 more, and got RM5.40 change. Price per pair of trousers?",
          answer: "RM19.85",
        },
      },
      realLife: ["💹 Stock prices", "🛍️ Shopping and change"],
    },
    {
      num: "1.5",
      title: "Rational Numbers",
      ideaParagraphs: [
        "Integers, fractions and decimals all belong to one family: rational numbers. A number is rational if it can be written as p/q, where p and q are integers and q is not zero.",
      ],
      formula: {
        eyebrow: "Rational Number Form",
        formula: "p / q   (p, q ∈ integers, q ≠ 0)",
      },
      worked: {
        question: "Determine whether 1⅘, ¾, −9 and 3.5 are rational numbers.",
        steps: [
          { calc: "1⅘=9/5, ¾=¾, −9=−9/1, 3.5=7/2", why: "Rewrite every number in p/q form." },
          { calc: "All fit p/q with integers, q≠0", why: "Check the condition for each." },
          { calc: "All FOUR are rational numbers", why: "Final conclusion." },
        ],
      },
      guided: {
        question: "Is 0.75 a rational number?",
        answer: "0.75 = 75/100 = ¾. Both 3 and 4 are integers, so yes — rational.",
      },
      mistake: {
        wrong:
          "Thinking whole numbers like −9 aren't rational since they \"don't look like a fraction\".",
        right: "−9 = −9/1 — every integer is rational.",
      },
      practice: {
        easy: { question: "Is −8 a rational number?", answer: "Yes — −8 = −8/1." },
        medium: {
          question: "Are 2.75 and −⅗ rational numbers?",
          answer: "2.75 = 11/4 — rational. −⅗ is already p/q — rational.",
        },
        hard: {
          question: "Is 3.141592654… (π) a rational number?",
          answer: "No — π is irrational, not rational.",
        },
      },
    },
  ],
  summary: {
    center: "Rational Numbers",
    branches: [
      { title: "Integers", points: ["Whole: positive, negative, zero"] },
      { title: "Operations", points: ["Brackets → × ÷ → + −"] },
      { title: "Fractions & Decimals", points: ["All are rational (p/q)"] },
    ],
  },
  formulaSheet: [
    { formula: "(+)×(+)=+   (–)×(–)=+", label: "Same signs → positive" },
    { formula: "(+)×(–)=–   (–)×(+)=–", label: "Different signs → negative" },
    { formula: "p / q  (q ≠ 0)", label: "Rational number form" },
    { formula: "Brackets → × ÷ → + −", label: "Order of operations" },
  ],
  quickRevision: [
    "I can compare and arrange integers on a number line.",
    "I can perform combined operations on integers, following the order of operations.",
    "I can compute with positive and negative fractions and decimals.",
    "I can recognise rational numbers in the form p/q.",
  ],
  examTips: [
    "Draw a quick number line whenever you're unsure which negative number is bigger.",
    "Circle the bracket operation first — it's the easiest step to skip by accident.",
    '"Profit/above/gain" → use +. "Loss/below/debt" → use −.',
  ],
  challenge: {
    question:
      "Encik Hafidz's account showed RM1,238. He signed two cheques: RM890 and RM1,730. (a) Which cheque would bounce? (b) How much top-up clears BOTH?",
    answer: "1238−890=348 (clears). 1238−1730=−492 (bounces). Needs RM492 top-up.",
  },
};

const bm: MathF1C1Content = {
  subtopics: [
    {
      num: "1.1",
      title: "Integer",
      ideaParagraphs: [
        "Setiap hari anda berhadapan dengan arah bertentangan: tingkat naik atau turun, wang diperoleh atau hilang, suhu naik atau turun. Nombor positif dan negatif menggambarkan ini — arah dan kuantiti, dalam satu nombor.",
        "Integer ialah nombor bulat — positif, negatif, atau sifar. Tiada pecahan, tiada perpuluhan. Pada garis nombor, semakin ke kanan, semakin besar nilainya; semakin ke kiri, semakin kecil.",
      ],
      numberLine: {
        marks: [
          { value: -5, label: "-5" },
          { value: -3, label: "-3" },
          { value: -1, label: "-1" },
          { value: 0, label: "0" },
          { value: 2, label: "2" },
          { value: 4, label: "4" },
          { value: 6, label: "6" },
        ],
        min: -6,
        max: 6,
        answer: "Tertib menaik: −5, −3, −1, 0, 2, 4, 6",
      },
      formula: {
        eyebrow: "Garis Nombor",
        formula: "… −3, −2, −1, 0, 1, 2, 3 …",
        legend: [
          { label: "Negatif", text: "kurang daripada sifar" },
          { label: "Positif", text: "lebih daripada sifar" },
        ],
      },
      worked: {
        question: "Susun −3, 4, 2, −5, 6, 0, −1 mengikut tertib menaik.",
        steps: [
          {
            calc: "Plot: −5, −3, −1, 0, 2, 4, 6",
            why: "Meletakkan setiap nombor pada garis menunjukkan kedudukan relatif serta-merta.",
          },
          {
            calc: "Baca dari kiri ke kanan",
            why: "Tertib menaik sentiasa dibaca terkecil (kiri) kepada terbesar (kanan).",
          },
          { calc: "−5, −3, −1, 0, 2, 4, 6", why: "Ini jawapan akhir." },
        ],
      },
      guided: {
        question: "Susun −4, 3, 2, 5, −2, −1, −5 mengikut tertib menurun.",
        answer:
          "Plot ketujuh-tujuh nombor pada garis nombor. Menurun bermula dari paling kanan (terbesar). Jawapan: 5, 3, 2, −1, −2, −4, −5.",
      },
      mistake: {
        wrong: "−5 BUKAN lebih besar daripada −1, walaupun 5 > 1.",
        right: "−1 > −5 — bagi nombor negatif, digit lebih kecil bermaksud nilai lebih besar.",
      },
      practice: {
        easy: {
          question: "Tentukan sama ada −76 ialah integer.",
          answer: "Ya — −76 ialah nombor bulat (negatif), jadi ia adalah integer.",
        },
        medium: {
          question: "Banding dan susun −4, 3, 1, −6, 5, 0, −2 mengikut tertib menaik.",
          answer: "−6, −4, −2, 0, 1, 3, 5",
        },
        hard: {
          question:
            "Seorang penyelam berada 50 m di bawah aras laut, naik 2 m setiap 5 saat. Adakah penyelam tiba di permukaan selepas 2 minit?",
          answer:
            "120 ÷ 5 = 24 selang × 2 m = 48 m naik. −50 + 48 = −2 m. Belum sampai permukaan (masih 2 m di bawah).",
        },
      },
      realLife: ["🏦 Baki bank", "🌡️ Suhu", "🏢 Aras lif", "🤿 Kedalaman bawah laut"],
    },
    {
      num: "1.2",
      title: "Operasi Asas dengan Integer",
      ideaParagraphs: [
        "Baki kad kredit, suhu naik kemudian turun, untung diikuti rugi — situasi sebenar mencampurkan perubahan positif dan negatif. Pada garis nombor: menambah positif gerak ke kanan; menambah negatif (atau menolak positif) gerak ke kiri; menolak negatif gerak ke kanan.",
      ],
      formula: {
        eyebrow: "Peraturan Tanda bagi × dan ÷",
        formula: "(+)×(+)=+   (–)×(–)=+   (+)×(–)=–   (–)×(+)=–",
        legend: [
          {
            label: "Peraturan",
            text: "Tanda sama → positif. Tanda berbeza → negatif. (Peraturan sama untuk ÷.)",
          },
        ],
      },
      worked: {
        question: "Selesaikan: 4 − 12 ÷ (−2) + (−1)",
        steps: [
          { calc: "4 − 12 ÷ (−2) + (−1)", why: "Mula dengan ungkapan asal." },
          { calc: "= 4 − (−6) + (−1)", why: "Pembahagian dahulu: 12 ÷ (−2) = −6." },
          {
            calc: "= 4 + 6 − 1 = 9",
            why: "Menolak negatif = menambah positif; kemudian tambah/tolak dari kiri.",
          },
        ],
      },
      guided: {
        question: "Selesaikan: −8 × (−2 + 3)",
        answer: "Kurungan dahulu: −2 + 3 = 1. Kemudian: −8 × 1 = −8.",
      },
      mistake: {
        wrong: "Menyelesaikan dari kiri ke kanan, mengabaikan ÷ perlu dahulu daripada + atau −.",
        right: "Sentiasa: kurungan → × atau ÷ → + atau −, mengikut turutan itu.",
      },
      practice: {
        easy: { question: "Selesaikan: −6 × (−3)", answer: "18" },
        medium: { question: "Nilaikan: −9 × (−4 + 6)", answer: "−18" },
        hard: {
          question:
            "Kedai untung RM16,800 tahun 1, rugi RM6,500 setiap tahun 2-3, dan rugi dua kali ganda tahun 4. Jumlah untung/rugi?",
          answer: "16 800 − 6 500 − 6 500 − 13 000 = −RM9,200 (kerugian)",
        },
      },
      realLife: ["💳 Baki kad kredit", "📈 Untung dan rugi"],
    },
    {
      num: "1.3",
      title: "Pecahan Positif dan Negatif",
      ideaParagraphs: [
        "Pecahan mengikut logik garis nombor yang sama seperti integer — pecahan positif di kanan sifar, pecahan negatif di kiri. Untuk banding dua pecahan, samakan penyebut dahulu, kemudian banding pengangka secara terus.",
      ],
      numberLine: {
        marks: [
          { value: -1.5, label: "-1½", color: "#f87171" },
          { value: 1.5, label: "1½", color: "#4ade80" },
        ],
        min: -2,
        max: 2,
      },
      worked: {
        question: "Selesaikan: 1⅓ × (1⅖ − ⅚)",
        steps: [
          { calc: "1⅓ × (1⅖ − ⅚)", why: "Kurungan dahulu." },
          { calc: "1⅖ − ⅚ = 17/30", why: "Samakan penyebut (GSTK 5,6 ialah 30) sebelum menolak." },
          { calc: "1⅓ × 17/30 = 34/45", why: "Tukar 1⅓ kepada 4/3, kemudian darab." },
        ],
      },
      guided: {
        question: "Susun −⅚, −¼, ⅜, −7/12 mengikut tertib menaik.",
        answer:
          "GSTK bagi 6, 4, 8, 12 ialah 24. Tukar setiap pecahan kepada per-24, kemudian banding seperti integer.",
      },
      mistake: {
        wrong: "Membanding ⅔ dan ¾ hanya pengangka, sebelum menyamakan penyebut.",
        right: "⅔ = 8/12, ¾ = 9/12. Kini banding: ¾ > ⅔.",
      },
      practice: {
        easy: {
          question: "Wakilkan ½ dan −¾ pada garis nombor.",
          answer: "½ separuh antara 0 dan 1. −¾ tiga perempat antara 0 dan −1.",
        },
        medium: { question: "Nilaikan: −⅙ + 2⅚ ÷ (−3⅙)", answer: "= −17/19 − ⅙ = −1 7/114" },
        hard: {
          question:
            "Kuiz beri +2 setiap betul, −½ setiap salah. Skor jawapan salah Mei Ling ialah −4 daripada 20 soalan. Jumlah skornya?",
          answer: "Salah = 8, betul = 12. Skor = 12×2 − 4 = 20",
        },
      },
      realLife: ["🍰 Resipi", "📝 Pemarkahan kuiz"],
    },
    {
      num: "1.4",
      title: "Perpuluhan Positif dan Negatif",
      ideaParagraphs: [
        'Perpuluhan terletak pada garis nombor sama seperti pecahan dan integer. Untuk banding, jajarkan titik perpuluhan dan banding digit demi digit — peraturan "digit lebih kecil = nilai lebih besar" masih terpakai bagi negatif.',
      ],
      numberLine: {
        marks: [
          { value: -0.5, label: "-0.5", color: "#f87171" },
          { value: 0.5, label: "0.5", color: "#4ade80" },
        ],
        min: -1,
        max: 1,
      },
      worked: {
        question: "Nilaikan: (7.23 + 2.77) ÷ (−0.8)",
        steps: [
          { calc: "(7.23 + 2.77) ÷ (−0.8)", why: "Kurungan dahulu." },
          { calc: "= 10.0 ÷ (−0.8)", why: "7.23 + 2.77 = 10.0" },
          { calc: "= −12.5", why: "Tanda berbeza → negatif." },
        ],
      },
      guided: {
        question: "Nilaikan: −3.7 + (4.25 + 2.85) × 0.3",
        answer:
          "Kurungan dahulu: 4.25 + 2.85 = 7.1. Kemudian × 0.3 = 2.13. Kemudian −3.7 + 2.13 = −1.57.",
      },
      mistake: {
        wrong: 'Menganggap −1.6 > −0.3 kerana "1.6 lebih besar".',
        right: "−0.3 > −1.6 — ia lebih dekat sifar.",
      },
      practice: {
        easy: {
          question: "Susun −1.23, −1.48, 0.34, −0.034, 1.034 mengikut tertib menaik.",
          answer: "−1.48, −1.23, −0.034, 0.34, 1.034",
        },
        medium: { question: "Nilaikan: 0.36 − (−8.67) ÷ (−0.3) + 0.82", answer: "−27.72" },
        hard: {
          question:
            "Aisah beli kemeja (RM19.90) dan dua seluar harga sama. Bayar RM55, kemudian RM10 lagi, terima baki RM5.40. Harga seluar?",
          answer: "RM19.85",
        },
      },
      realLife: ["💹 Harga saham", "🛍️ Beli-belah dan baki"],
    },
    {
      num: "1.5",
      title: "Nombor Nisbah",
      ideaParagraphs: [
        "Integer, pecahan dan perpuluhan semuanya satu keluarga: nombor nisbah. Sesuatu nombor adalah nisbah jika ia boleh ditulis sebagai p/q, dengan p dan q integer dan q bukan sifar.",
      ],
      formula: {
        eyebrow: "Bentuk Nombor Nisbah",
        formula: "p / q   (p, q ∈ integer, q ≠ 0)",
      },
      worked: {
        question: "Tentukan sama ada 1⅘, ¾, −9 dan 3.5 ialah nombor nisbah.",
        steps: [
          {
            calc: "1⅘=9/5, ¾=¾, −9=−9/1, 3.5=7/2",
            why: "Tulis semula setiap nombor dalam bentuk p/q.",
          },
          { calc: "Semua memenuhi p/q dengan integer, q≠0", why: "Semak syarat bagi setiap satu." },
          { calc: "Kesemua EMPAT ialah nombor nisbah", why: "Kesimpulan akhir." },
        ],
      },
      guided: {
        question: "Adakah 0.75 nombor nisbah?",
        answer: "0.75 = 75/100 = ¾. 3 dan 4 kedua-duanya integer, jadi ya — nisbah.",
      },
      mistake: {
        wrong:
          'Menganggap nombor bulat seperti −9 bukan nisbah kerana "tidak kelihatan seperti pecahan".',
        right: "−9 = −9/1 — setiap integer adalah nisbah.",
      },
      practice: {
        easy: { question: "Adakah −8 nombor nisbah?", answer: "Ya — −8 = −8/1." },
        medium: {
          question: "Adakah 2.75 dan −⅗ nombor nisbah?",
          answer: "2.75 = 11/4 — nisbah. −⅗ sudah p/q — nisbah.",
        },
        hard: {
          question: "Adakah 3.141592654… (π) nombor nisbah?",
          answer: "Tidak — π ialah tak nisbah, bukan nisbah.",
        },
      },
    },
  ],
  summary: {
    center: "Nombor Nisbah",
    branches: [
      { title: "Integer", points: ["Bulat: positif, negatif, sifar"] },
      { title: "Operasi", points: ["Kurungan → × ÷ → + −"] },
      { title: "Pecahan & Perpuluhan", points: ["Semua nisbah (p/q)"] },
    ],
  },
  formulaSheet: [
    { formula: "(+)×(+)=+   (–)×(–)=+", label: "Tanda sama → positif" },
    { formula: "(+)×(–)=–   (–)×(+)=–", label: "Tanda berbeza → negatif" },
    { formula: "p / q  (q ≠ 0)", label: "Bentuk nombor nisbah" },
    { formula: "Kurungan → × ÷ → + −", label: "Turutan operasi" },
  ],
  quickRevision: [
    "Saya boleh membanding dan menyusun integer pada garis nombor.",
    "Saya boleh melaksanakan operasi gabungan pada integer, mengikut turutan operasi.",
    "Saya boleh mengira dengan pecahan dan perpuluhan positif dan negatif.",
    "Saya boleh mengenal pasti nombor nisbah dalam bentuk p/q.",
  ],
  examTips: [
    "Lukis garis nombor ringkas apabila tidak pasti nombor negatif mana lebih besar.",
    "Bulatkan operasi kurungan dahulu — langkah paling mudah tertinggal.",
    '"Untung/atas/perolehan" → guna +. "Rugi/bawah/hutang" → guna −.',
  ],
  challenge: {
    question:
      "Akaun Encik Hafidz menunjukkan RM1,238. Beliau menandatangani dua cek: RM890 dan RM1,730. (a) Cek manakah akan dipulangkan? (b) Berapa tambahan untuk jelaskan KEDUA-DUA?",
    answer: "1238−890=348 (jelas). 1238−1730=−492 (dipulangkan). Perlu tambahan RM492.",
  },
};

export const mathF1C1InteractiveContent: { en: MathF1C1Content; bm: MathF1C1Content } = { en, bm };
