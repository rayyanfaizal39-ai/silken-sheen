// Form 1 Mathematics, Chapter 1 — Rational Numbers / Nombor Nisbah.
// Bilingual learner-facing content rendered by MathF1Chapter1NotesBlock.
import type { NumberLineMark } from "@/components/notes/blocks/NumberLine";
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export interface MathSubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  numberLine?: {
    marks: NumberLineMark[];
    min: number;
    max: number;
    answer?: string;
    caption?: string;
  };
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
        "Positive and negative numbers describe opposite situations. For example, +30°C is above zero while −10°C is below zero; +150 m is above sea level while −50 m is below it; a profit of RM2,000 is positive while a loss of RM500 is negative.",
        "Integers are positive whole numbers, negative whole numbers and zero: …, −3, −2, −1, 0, 1, 2, 3, …. Fractions such as −4/5 and decimals such as −3.4 are not integers.",
      ],
      numberLine: {
        marks: [-5, -3, -1, 0, 2, 4].map((value) => ({ value, label: String(value) })),
        min: -5,
        max: 4,
        answer: "Ascending order: −5, −3, −1, 0, 2, 4",
        caption: "Values increase to the right and decrease to the left.",
      },
      formula: {
        eyebrow: "Ordering integers",
        formula: "Ascending: smallest → largest\nDescending: largest → smallest",
      },
      worked: {
        question: "Arrange −3, 4, 2, −5 and 0 in ascending order.",
        steps: [
          { calc: "−5 < −3 < 0 < 2 < 4", why: "Place the values on a number line." },
          { calc: "−5, −3, 0, 2, 4", why: "Read from left to right for ascending order." },
        ],
      },
      guided: {
        question: "Arrange −4, 3, 2, 5, −2 and −5 in descending order.",
        answer: "Read the number line from right to left: 5, 3, 2, −2, −4, −5.",
      },
      mistake: {
        wrong: "Thinking −5 is greater than −1 because 5 is greater than 1.",
        right: "−1 is greater than −5 because −1 lies farther to the right.",
      },
      practice: {
        easy: { question: "Is −76 an integer?", answer: "Yes. It is a negative whole number." },
        medium: {
          question: "Which is greater, −2 or −7?",
          answer: "−2, because it is farther to the right.",
        },
        hard: {
          question: "A diver is at −50 m and rises 48 m. What is the new depth?",
          answer: "−50 + 48 = −2 m.",
        },
      },
      realLife: ["Temperature", "Sea level", "Profit and loss"],
    },
    {
      num: "1.2",
      title: "Basic Arithmetic Operations with Integers",
      ideaParagraphs: [
        "For consecutive signs: +(+a) becomes +a, +(−a) becomes −a, −(+a) becomes −a, and −(−a) becomes +a.",
        "For multiplication and division, like signs give a positive result and unlike signs give a negative result. In combined operations, solve brackets first, then multiplication or division, followed by addition or subtraction from left to right.",
        "Addition and multiplication obey the commutative and associative laws. The distributive law is a × (b + c) = a × b + a × c. Identity facts include a + 0 = a, a × 1 = a and a × 0 = 0.",
      ],
      formula: {
        eyebrow: "Sign rules",
        formula: "(+) × (+) = +   (−) × (−) = +\n(+) × (−) = −   (−) × (+) = −",
        legend: [{ label: "Remember", text: "The same sign rules apply to division." }],
      },
      worked: {
        question: "Evaluate 4 − 12 ÷ (−2) + (−1).",
        steps: [
          { calc: "12 ÷ (−2) = −6", why: "Division comes before addition and subtraction." },
          { calc: "4 − (−6) − 1", why: "Replace the division with its value." },
          { calc: "4 + 6 − 1 = 9", why: "Subtracting a negative is adding a positive." },
        ],
      },
      guided: {
        question: "Evaluate −8 × (−2 + 3).",
        answer: "Brackets first: −2 + 3 = 1. Then −8 × 1 = −8.",
      },
      mistake: {
        wrong: "Working only from left to right and adding before dividing.",
        right: "Use brackets → multiply or divide → add or subtract.",
      },
      practice: {
        easy: { question: "Calculate −6 × (−3).", answer: "18" },
        medium: { question: "Calculate −12 ÷ (−2) + 5.", answer: "6 + 5 = 11" },
        hard: { question: "Evaluate 18 − 3 × (−4 + 2).", answer: "18 − 3 × (−2) = 24" },
      },
      realLife: ["Bank balances", "Changes in temperature"],
    },
    {
      num: "1.3",
      title: "Positive and Negative Fractions",
      ideaParagraphs: [
        "Positive fractions lie to the right of zero and negative fractions lie to the left. Equal intervals on a number line must have equal lengths.",
        "To compare fractions with different denominators, first use a common denominator, then compare the numerators.",
      ],
      numberLine: {
        marks: [
          { value: -0.5, label: "−1/2" },
          { value: 0, label: "0" },
          { value: 0.5, label: "1/2" },
        ],
        min: -1,
        max: 1,
        caption: "Negative fractions are left of zero; positive fractions are right of zero.",
      },
      worked: {
        question: "Arrange −3/4, 1/2, −1/2 and 1/4 in ascending order.",
        steps: [
          { calc: "−3/4, 2/4, −2/4, 1/4", why: "Use the common denominator 4." },
          { calc: "−3/4 < −2/4 < 1/4 < 2/4", why: "Compare the numerators." },
          { calc: "−3/4, −1/2, 1/4, 1/2", why: "Write the fractions in their original forms." },
        ],
      },
      guided: {
        question: "Calculate 1/2 ÷ 1/4.",
        answer: "Multiply by the reciprocal: 1/2 × 4/1 = 2.",
      },
      mistake: {
        wrong: "Comparing only the numerators when the denominators are different.",
        right: "Use a common denominator before comparing numerators.",
      },
      practice: {
        easy: { question: "Which is greater, −1/4 or −3/4?", answer: "−1/4" },
        medium: { question: "Calculate −2/3 × 9/4.", answer: "−18/12 = −3/2" },
        hard: {
          question: "Arrange −5/6, 1/3 and −1/2 in ascending order.",
          answer: "−5/6, −1/2, 1/3",
        },
      },
      realLife: ["Recipes", "Quiz scores"],
    },
    {
      num: "1.4",
      title: "Positive and Negative Decimals",
      ideaParagraphs: [
        "Positive decimals lie to the right of zero and negative decimals lie to the left. Align decimal points and compare digits by place value.",
        "Use the same order of operations as for integers. A decimal may be changed to a fraction if that makes the calculation easier.",
      ],
      numberLine: {
        marks: [
          { value: -0.5, label: "−0.5" },
          { value: 0, label: "0" },
          { value: 0.5, label: "0.5" },
        ],
        min: -1,
        max: 1,
      },
      worked: {
        question: "Evaluate (7.23 + 2.77) ÷ (−0.8).",
        steps: [
          { calc: "7.23 + 2.77 = 10", why: "Solve the brackets first." },
          { calc: "10 ÷ (−0.8) = −12.5", why: "Unlike signs give a negative result." },
        ],
      },
      guided: {
        question: "Evaluate −3.7 + (4.25 + 2.85) × 0.3.",
        answer: "−3.7 + 7.1 × 0.3 = −3.7 + 2.13 = −1.57.",
      },
      mistake: {
        wrong: "Thinking −1.6 is greater than −0.3.",
        right: "−0.3 is greater because it is closer to zero.",
      },
      practice: {
        easy: {
          question: "Arrange −1.2, 0.4 and −0.2 in ascending order.",
          answer: "−1.2, −0.2, 0.4",
        },
        medium: { question: "Evaluate 2.4 − 3 × 0.7.", answer: "0.3" },
        hard: {
          question:
            "A price is RM2.05, rises RM0.32, then falls RM0.28 for three hours. Find the final price.",
          answer: "2.05 + 0.32 − 3(0.28) = RM1.53",
        },
      },
      realLife: ["Prices", "Measurements"],
    },
    {
      num: "1.5",
      title: "Rational Numbers",
      ideaParagraphs: [
        "A rational number can be written as p/q, where p and q are integers and q is not zero. Integers, fractions and terminating decimals are rational numbers.",
        "Examples include −9 = −9/1, 1 4/5 = 9/5 and 3.5 = 7/2. For combined operations, first write every number in a consistent fraction or decimal form.",
      ],
      formula: { eyebrow: "Rational number form", formula: "p/q, where p, q ∈ integers and q ≠ 0" },
      worked: {
        question: "Evaluate −0.6 + 3/4 × (−1 1/3).",
        steps: [
          { calc: "−0.6 = −3/5; −1 1/3 = −4/3", why: "Write all values as fractions." },
          { calc: "3/4 × (−4/3) = −1", why: "Multiply before adding." },
          { calc: "−3/5 − 1 = −8/5 = −1 3/5", why: "Use denominator 5." },
        ],
      },
      guided: {
        question: "Show that 3.5 is rational.",
        answer: "3.5 = 35/10 = 7/2, so it has p/q form with q ≠ 0.",
      },
      mistake: {
        wrong: "Assuming an integer is not rational because it is not written as a fraction.",
        right: "Every integer is rational: for example, −9 = −9/1.",
      },
      practice: {
        easy: { question: "Is −8 rational?", answer: "Yes, because −8 = −8/1." },
        medium: {
          question: "Write 2.75 as a fraction in simplest form.",
          answer: "2.75 = 275/100 = 11/4.",
        },
        hard: { question: "Evaluate 1/2 − 0.75 × (−4/3).", answer: "1/2 − (−1) = 3/2." },
      },
      realLife: ["Money", "Measurements", "Scores"],
    },
    {
      num: "1.6",
      title: "Daily-Life Problem Solving",
      ideaParagraphs: [
        "Translate words such as above, below, profit, loss, rise and fall into positive or negative values before calculating. Keep units in every step and check whether the final answer is reasonable.",
      ],
      formula: {
        eyebrow: "Problem-solving check",
        formula: "Understand → Plan → Calculate → Check",
      },
      worked: {
        question:
          "A town is at 12°C. The temperature falls to −6°C, rises by 3°C, then falls by 8°C. Find the first change and final temperature.",
        steps: [
          {
            calc: "First change = −6 − 12 = −18°C",
            why: "Change equals new value minus original value.",
          },
          {
            calc: "Final = −6 + 3 − 8",
            why: "Continue from the temperature after the first fall.",
          },
          { calc: "Final temperature = −11°C", why: "Add and subtract from left to right." },
        ],
      },
      guided: {
        question:
          "A 20-question quiz awards 2 marks for a correct answer and −1/2 mark for a wrong answer. Mei Ling receives −4 marks from wrong answers. Find her total score.",
        answer:
          "Wrong answers = −4 ÷ (−1/2) = 8. Correct answers = 12. Total = 12 × 2 − 4 = 20 marks.",
      },
      mistake: {
        wrong: "Using 12°C again after the temperature has already fallen to −6°C.",
        right: "Apply each new change to the latest value, not the original value.",
      },
      practice: {
        easy: {
          question: "A balance of RM40 decreases by RM55. Find the new balance.",
          answer: "40 − 55 = −RM15",
        },
        medium: {
          question: "A lift moves from floor 3 to B2. What is the change in floors?",
          answer: "Represent B2 as −2: −2 − 3 = −5 floors.",
        },
        hard: {
          question:
            "A quiz awards 3 marks for correct and −1 for wrong. A student gets 14 correct out of 20. Find the score.",
          answer: "14(3) + 6(−1) = 36 marks.",
        },
      },
      realLife: ["Weather", "Lift floors", "Competitions"],
    },
  ],
  summary: {
    center: "Rational Numbers",
    branches: [
      { title: "Integers", points: ["Positive, negative and zero", "Order on a number line"] },
      { title: "Operations", points: ["Sign rules", "Brackets → × or ÷ → + or −"] },
      { title: "Fractions and decimals", points: ["Compare", "Calculate", "Convert forms"] },
      { title: "p/q form", points: ["p and q are integers", "q ≠ 0"] },
    ],
  },
  formulaSheet: [
    { formula: "+(+a)=+a   +(−a)=−a\n−(+a)=−a   −(−a)=+a", label: "Consecutive signs" },
    {
      formula: "Like signs → positive\nUnlike signs → negative",
      label: "Multiplication and division",
    },
    { formula: "a(b + c) = ab + ac", label: "Distributive law" },
    { formula: "p/q, q ≠ 0", label: "Rational number" },
  ],
  quickRevision: [
    "I can compare and order positive and negative values.",
    "I can use sign rules and the order of operations.",
    "I can calculate with positive and negative fractions and decimals.",
    "I can write rational numbers in p/q form.",
    "I can model daily situations using rational numbers.",
  ],
  examTips: [
    "Draw a quick number line when comparing negative values.",
    "Write one calculation per line to protect negative signs.",
    "Convert mixed numbers before multiplying or dividing fractions.",
  ],
  challenge: {
    question:
      "An account has RM1,238. Two cheques for RM890 and RM1,730 are considered separately. Which cheque would be rejected, and how much is needed to cover it?",
    answer:
      "RM1,238 − RM890 = RM348, so the first cheque clears. RM1,238 − RM1,730 = −RM492, so the second is rejected and needs RM492.",
  },
};

const bm: MathF1C1Content = {
  subtopics: [
    {
      num: "1.1",
      title: "Integer",
      ideaParagraphs: [
        "Nombor positif dan negatif menerangkan situasi yang bertentangan. Contohnya, +30°C berada di atas sifar manakala −10°C di bawah sifar; +150 m berada di atas aras laut manakala −50 m di bawahnya; untung RM2,000 bernilai positif manakala rugi RM500 bernilai negatif.",
        "Integer ialah nombor bulat positif, nombor bulat negatif dan sifar: …, −3, −2, −1, 0, 1, 2, 3, …. Pecahan seperti −4/5 dan perpuluhan seperti −3.4 bukan integer.",
      ],
      numberLine: {
        marks: [-5, -3, -1, 0, 2, 4].map((value) => ({ value, label: String(value) })),
        min: -5,
        max: 4,
        answer: "Tertib menaik: −5, −3, −1, 0, 2, 4",
        caption: "Nilai bertambah ke kanan dan berkurang ke kiri.",
      },
      formula: {
        eyebrow: "Menyusun integer",
        formula: "Menaik: terkecil → terbesar\nMenurun: terbesar → terkecil",
      },
      worked: {
        question: "Susun −3, 4, 2, −5 dan 0 mengikut tertib menaik.",
        steps: [
          { calc: "−5 < −3 < 0 < 2 < 4", why: "Letakkan nilai pada garis nombor." },
          { calc: "−5, −3, 0, 2, 4", why: "Baca dari kiri ke kanan untuk tertib menaik." },
        ],
      },
      guided: {
        question: "Susun −4, 3, 2, 5, −2 dan −5 mengikut tertib menurun.",
        answer: "Baca garis nombor dari kanan ke kiri: 5, 3, 2, −2, −4, −5.",
      },
      mistake: {
        wrong: "Menganggap −5 lebih besar daripada −1 kerana 5 lebih besar daripada 1.",
        right: "−1 lebih besar daripada −5 kerana −1 berada lebih ke kanan.",
      },
      practice: {
        easy: {
          question: "Adakah −76 suatu integer?",
          answer: "Ya. −76 ialah nombor bulat negatif.",
        },
        medium: {
          question: "Yang manakah lebih besar, −2 atau −7?",
          answer: "−2 kerana berada lebih ke kanan.",
        },
        hard: {
          question: "Penyelam berada pada −50 m dan naik 48 m. Apakah kedalaman baharu?",
          answer: "−50 + 48 = −2 m.",
        },
      },
      realLife: ["Suhu", "Aras laut", "Untung dan rugi"],
    },
    {
      num: "1.2",
      title: "Operasi Asas Aritmetik dengan Integer",
      ideaParagraphs: [
        "Bagi dua tanda berturutan: +(+a) menjadi +a, +(−a) menjadi −a, −(+a) menjadi −a dan −(−a) menjadi +a.",
        "Bagi darab dan bahagi, tanda sama menghasilkan positif dan tanda berbeza menghasilkan negatif. Dalam operasi bergabung, selesaikan kurungan, kemudian darab atau bahagi, diikuti tambah atau tolak dari kiri ke kanan.",
        "Tambah dan darab mematuhi hukum kalis tukar tertib dan kalis sekutuan. Hukum kalis agihan ialah a × (b + c) = a × b + a × c. Hukum identiti termasuk a + 0 = a, a × 1 = a dan a × 0 = 0.",
      ],
      formula: {
        eyebrow: "Hukum tanda",
        formula: "(+) × (+) = +   (−) × (−) = +\n(+) × (−) = −   (−) × (+) = −",
        legend: [{ label: "Ingat", text: "Hukum tanda yang sama digunakan untuk bahagi." }],
      },
      worked: {
        question: "Nilaikan 4 − 12 ÷ (−2) + (−1).",
        steps: [
          { calc: "12 ÷ (−2) = −6", why: "Bahagi dilakukan sebelum tambah dan tolak." },
          { calc: "4 − (−6) − 1", why: "Gantikan hasil bahagi." },
          { calc: "4 + 6 − 1 = 9", why: "Menolak negatif bersamaan dengan menambah positif." },
        ],
      },
      guided: {
        question: "Nilaikan −8 × (−2 + 3).",
        answer: "Kurungan dahulu: −2 + 3 = 1. Kemudian −8 × 1 = −8.",
      },
      mistake: {
        wrong: "Mengira dari kiri ke kanan sehingga tambah dilakukan sebelum bahagi.",
        right: "Gunakan kurungan → darab atau bahagi → tambah atau tolak.",
      },
      practice: {
        easy: { question: "Hitung −6 × (−3).", answer: "18" },
        medium: { question: "Hitung −12 ÷ (−2) + 5.", answer: "6 + 5 = 11" },
        hard: { question: "Nilaikan 18 − 3 × (−4 + 2).", answer: "18 − 3 × (−2) = 24" },
      },
      realLife: ["Baki bank", "Perubahan suhu"],
    },
    {
      num: "1.3",
      title: "Pecahan Positif dan Pecahan Negatif",
      ideaParagraphs: [
        "Pecahan positif berada di sebelah kanan sifar dan pecahan negatif di sebelah kiri. Selang yang sama pada garis nombor mesti mempunyai jarak yang sama.",
        "Untuk membanding pecahan yang mempunyai penyebut berbeza, gunakan penyebut sepunya dahulu, kemudian bandingkan pengangka.",
      ],
      numberLine: {
        marks: [
          { value: -0.5, label: "−1/2" },
          { value: 0, label: "0" },
          { value: 0.5, label: "1/2" },
        ],
        min: -1,
        max: 1,
        caption: "Pecahan negatif di kiri sifar; pecahan positif di kanan sifar.",
      },
      worked: {
        question: "Susun −3/4, 1/2, −1/2 dan 1/4 mengikut tertib menaik.",
        steps: [
          { calc: "−3/4, 2/4, −2/4, 1/4", why: "Gunakan penyebut sepunya 4." },
          { calc: "−3/4 < −2/4 < 1/4 < 2/4", why: "Bandingkan pengangka." },
          { calc: "−3/4, −1/2, 1/4, 1/2", why: "Tulis semula dalam bentuk asal." },
        ],
      },
      guided: { question: "Hitung 1/2 ÷ 1/4.", answer: "Darab dengan salingan: 1/2 × 4/1 = 2." },
      mistake: {
        wrong: "Membandingkan pengangka sahaja apabila penyebut berbeza.",
        right: "Gunakan penyebut sepunya sebelum membandingkan pengangka.",
      },
      practice: {
        easy: { question: "Yang manakah lebih besar, −1/4 atau −3/4?", answer: "−1/4" },
        medium: { question: "Hitung −2/3 × 9/4.", answer: "−18/12 = −3/2" },
        hard: {
          question: "Susun −5/6, 1/3 dan −1/2 mengikut tertib menaik.",
          answer: "−5/6, −1/2, 1/3",
        },
      },
      realLife: ["Resipi", "Markah kuiz"],
    },
    {
      num: "1.4",
      title: "Perpuluhan Positif dan Perpuluhan Negatif",
      ideaParagraphs: [
        "Perpuluhan positif berada di sebelah kanan sifar dan perpuluhan negatif di sebelah kiri. Jajarkan titik perpuluhan dan bandingkan digit mengikut nilai tempat.",
        "Gunakan tertib operasi yang sama seperti integer. Perpuluhan boleh ditukar kepada pecahan jika pengiraan menjadi lebih mudah.",
      ],
      numberLine: {
        marks: [
          { value: -0.5, label: "−0.5" },
          { value: 0, label: "0" },
          { value: 0.5, label: "0.5" },
        ],
        min: -1,
        max: 1,
      },
      worked: {
        question: "Nilaikan (7.23 + 2.77) ÷ (−0.8).",
        steps: [
          { calc: "7.23 + 2.77 = 10", why: "Selesaikan kurungan dahulu." },
          { calc: "10 ÷ (−0.8) = −12.5", why: "Tanda berbeza menghasilkan negatif." },
        ],
      },
      guided: {
        question: "Nilaikan −3.7 + (4.25 + 2.85) × 0.3.",
        answer: "−3.7 + 7.1 × 0.3 = −3.7 + 2.13 = −1.57.",
      },
      mistake: {
        wrong: "Menganggap −1.6 lebih besar daripada −0.3.",
        right: "−0.3 lebih besar kerana lebih dekat dengan sifar.",
      },
      practice: {
        easy: {
          question: "Susun −1.2, 0.4 dan −0.2 mengikut tertib menaik.",
          answer: "−1.2, −0.2, 0.4",
        },
        medium: { question: "Nilaikan 2.4 − 3 × 0.7.", answer: "0.3" },
        hard: {
          question:
            "Harga RM2.05 naik RM0.32, kemudian turun RM0.28 selama tiga jam. Cari harga akhir.",
          answer: "2.05 + 0.32 − 3(0.28) = RM1.53",
        },
      },
      realLife: ["Harga", "Ukuran"],
    },
    {
      num: "1.5",
      title: "Nombor Nisbah",
      ideaParagraphs: [
        "Nombor nisbah boleh ditulis sebagai p/q, dengan p dan q ialah integer dan q bukan sifar. Integer, pecahan dan perpuluhan tamat ialah nombor nisbah.",
        "Contohnya, −9 = −9/1, 1 4/5 = 9/5 dan 3.5 = 7/2. Bagi operasi bergabung, tulis semua nombor dalam bentuk pecahan atau perpuluhan yang seragam dahulu.",
      ],
      formula: { eyebrow: "Bentuk nombor nisbah", formula: "p/q, dengan p, q ∈ integer dan q ≠ 0" },
      worked: {
        question: "Nilaikan −0.6 + 3/4 × (−1 1/3).",
        steps: [
          { calc: "−0.6 = −3/5; −1 1/3 = −4/3", why: "Tulis semua nilai sebagai pecahan." },
          { calc: "3/4 × (−4/3) = −1", why: "Darab sebelum tambah." },
          { calc: "−3/5 − 1 = −8/5 = −1 3/5", why: "Gunakan penyebut 5." },
        ],
      },
      guided: {
        question: "Tunjukkan bahawa 3.5 ialah nombor nisbah.",
        answer: "3.5 = 35/10 = 7/2, maka bentuknya p/q dengan q ≠ 0.",
      },
      mistake: {
        wrong: "Menganggap integer bukan nombor nisbah kerana tidak ditulis sebagai pecahan.",
        right: "Setiap integer ialah nombor nisbah; contohnya −9 = −9/1.",
      },
      practice: {
        easy: { question: "Adakah −8 nombor nisbah?", answer: "Ya, kerana −8 = −8/1." },
        medium: {
          question: "Tulis 2.75 sebagai pecahan termudah.",
          answer: "2.75 = 275/100 = 11/4.",
        },
        hard: { question: "Nilaikan 1/2 − 0.75 × (−4/3).", answer: "1/2 − (−1) = 3/2." },
      },
      realLife: ["Wang", "Ukuran", "Markah"],
    },
    {
      num: "1.6",
      title: "Penyelesaian Masalah Harian",
      ideaParagraphs: [
        "Tukarkan perkataan seperti atas, bawah, untung, rugi, naik dan turun kepada nilai positif atau negatif sebelum mengira. Kekalkan unit pada setiap langkah dan semak kewajaran jawapan akhir.",
      ],
      formula: { eyebrow: "Semakan penyelesaian", formula: "Faham → Rancang → Kira → Semak" },
      worked: {
        question:
          "Suhu sebuah bandar ialah 12°C. Suhu turun hingga −6°C, naik 3°C, kemudian turun 8°C. Cari perubahan pertama dan suhu akhir.",
        steps: [
          {
            calc: "Perubahan pertama = −6 − 12 = −18°C",
            why: "Perubahan ialah nilai baharu tolak nilai asal.",
          },
          { calc: "Akhir = −6 + 3 − 8", why: "Teruskan daripada suhu selepas penurunan pertama." },
          { calc: "Suhu akhir = −11°C", why: "Tambah dan tolak dari kiri ke kanan." },
        ],
      },
      guided: {
        question:
          "Kuiz 20 soalan memberi 2 markah bagi jawapan betul dan −1/2 markah bagi jawapan salah. Mei Ling mendapat −4 markah daripada jawapan salah. Cari jumlah markahnya.",
        answer: "Salah = −4 ÷ (−1/2) = 8. Betul = 12. Jumlah = 12 × 2 − 4 = 20 markah.",
      },
      mistake: {
        wrong: "Menggunakan 12°C semula selepas suhu sudah turun kepada −6°C.",
        right: "Kenakan setiap perubahan baharu pada nilai terkini, bukan nilai asal.",
      },
      practice: {
        easy: {
          question: "Baki RM40 berkurang RM55. Cari baki baharu.",
          answer: "40 − 55 = −RM15",
        },
        medium: {
          question: "Lif bergerak dari tingkat 3 ke B2. Apakah perubahan tingkat?",
          answer: "Wakilkan B2 sebagai −2: −2 − 3 = −5 tingkat.",
        },
        hard: {
          question:
            "Kuiz memberi 3 markah bagi betul dan −1 bagi salah. Murid mendapat 14 betul daripada 20. Cari markah.",
          answer: "14(3) + 6(−1) = 36 markah.",
        },
      },
      realLife: ["Cuaca", "Aras lif", "Pertandingan"],
    },
  ],
  summary: {
    center: "Nombor Nisbah",
    branches: [
      { title: "Integer", points: ["Positif, negatif dan sifar", "Susunan pada garis nombor"] },
      { title: "Operasi", points: ["Hukum tanda", "Kurungan → × atau ÷ → + atau −"] },
      { title: "Pecahan dan perpuluhan", points: ["Banding", "Kira", "Tukar bentuk"] },
      { title: "Bentuk p/q", points: ["p dan q ialah integer", "q ≠ 0"] },
    ],
  },
  formulaSheet: [
    { formula: "+(+a)=+a   +(−a)=−a\n−(+a)=−a   −(−a)=+a", label: "Tanda berturutan" },
    { formula: "Tanda sama → positif\nTanda berbeza → negatif", label: "Darab dan bahagi" },
    { formula: "a(b + c) = ab + ac", label: "Hukum kalis agihan" },
    { formula: "p/q, q ≠ 0", label: "Nombor nisbah" },
  ],
  quickRevision: [
    "Saya boleh membanding dan menyusun nilai positif dan negatif.",
    "Saya boleh menggunakan hukum tanda dan tertib operasi.",
    "Saya boleh mengira pecahan dan perpuluhan positif serta negatif.",
    "Saya boleh menulis nombor nisbah dalam bentuk p/q.",
    "Saya boleh memodelkan situasi harian menggunakan nombor nisbah.",
  ],
  examTips: [
    "Lukis garis nombor ringkas ketika membandingkan nilai negatif.",
    "Tulis satu langkah pengiraan pada setiap baris supaya tanda negatif tidak tercicir.",
    "Tukar nombor bercampur sebelum mendarab atau membahagi pecahan.",
  ],
  challenge: {
    question:
      "Sebuah akaun mempunyai RM1,238. Dua cek bernilai RM890 dan RM1,730 dipertimbangkan secara berasingan. Cek manakah ditolak dan berapakah wang tambahan diperlukan?",
    answer:
      "RM1,238 − RM890 = RM348, jadi cek pertama berjaya. RM1,238 − RM1,730 = −RM492, jadi cek kedua ditolak dan memerlukan RM492.",
  },
};

export const mathF1C1InteractiveContent: { en: MathF1C1Content; bm: MathF1C1Content } = { en, bm };
