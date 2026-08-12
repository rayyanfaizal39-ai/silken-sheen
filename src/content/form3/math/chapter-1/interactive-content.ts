// Form 3 Mathematics, Chapter 1 — Indices / Indeks. 2 official subtopics
// (1.1 Index Notation, 1.2 Law of Indices), but 1.2 covers 6 distinct index
// laws, so it's built as 3 flowing mini-sections under that one subtopic:
// multiplication/division/power-of-power together, then zero/negative
// index, then fractional index.
// Interactive bilingual content. EN sourced from T3_BT_MAT_DLP_-_MATHEMATICS.pdf,
// BM sourced from T3_BT_MAT_-_MATEMATIK.pdf, cross-checked against
// design-reference/math3-chapter1-indices-notes-v1.html.
// Content only — no presentation markup (rendered by MathF3Chapter1NotesBlock).
import type { WorkedStep } from "@/components/notes/blocks/StepsCard";
import type { Difficulty, PracticeQuestion } from "@/components/notes/blocks/DifficultyTabs";
import type { MindmapBranch } from "@/components/notes/blocks/ChapterSummaryMindmap";
import type { FormulaSheetEntry } from "@/components/notes/blocks/FormulaSheet";

export type MathF3C1Visual =
  | {
      kind: "indexCollapse";
      expression: string;
      base: string;
      index: string;
      factorCountLabel: string;
      baseIndexLabel: string;
      caption: string;
    }
  | {
      kind: "factorCombine";
      leftLabel: string;
      rightLabel: string;
      resultLabel: string;
      caption: string;
    }
  | {
      kind: "negIndexFlip";
      baseLabel: string;
      exponentLabel: string;
      denominatorLabel: string;
      caption: string;
    }
  | {
      kind: "rootPower";
      rootExpr: string;
      powerBase: string;
      powerExponent: string;
      sameValueLabel: string;
      caption: string;
    };

export interface MathF3C1Block {
  formula: { eyebrow: string; formula: string; legend?: { label: string; text: string }[] };
  worked?: { question: string; steps: WorkedStep[] };
}

export interface MathF3C1SubtopicContent {
  num: string;
  title: string;
  ideaParagraphs: string[];
  visual?: MathF3C1Visual;
  blocks: MathF3C1Block[];
  guided: { question: string; answer: string };
  mistake: { wrong: string; right: string };
  practice: Record<Difficulty, PracticeQuestion>;
  realLife?: string[];
}

export interface MathF3C1Content {
  subtopics: MathF3C1SubtopicContent[];
  summary: { center: string; branches: MindmapBranch[] };
  formulaSheet: FormulaSheetEntry[];
  quickRevision: string[];
  examTips: string[];
  challenge: { question: string; answer: string };
}

const en: MathF3C1Content = {
  subtopics: [
    {
      num: "1.1",
      title: "Index Notation",
      ideaParagraphs: [
        "4 × 4 × 4 is the same value as 4³ — just written two different ways. Index notation is a shortcut for repeated multiplication: the base is the number being multiplied, the index (or exponent) counts how many times.",
      ],
      visual: {
        kind: "indexCollapse",
        expression: "4 × 4 × 4",
        base: "4",
        index: "3",
        factorCountLabel: "3 factors",
        baseIndexLabel: "base & index",
        caption: "Count the factors — that count becomes the index",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Index Notation",
            formula: "aⁿ = a × a × a × ... × a  (n times)",
            legend: [{ label: "a", text: "= base, n = index (how many times a is multiplied)" }],
          },
          worked: {
            question: "Write in index form: (a) 5×5×5×5×5×5 (b) (−2)×(−2)×(−2)",
            steps: [
              {
                calc: "(a) 5×5×5×5×5×5 = 5⁶",
                why: "Count how many 5's are multiplied — 6 of them — that count becomes the index.",
              },
              {
                calc: "(b) (−2)×(−2)×(−2) = (−2)³",
                why: "The base here is the whole (−2), repeated 3 times.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Write m×m×m×m×m×m×m in index form.",
        answer: "m is repeated 7 times, so it's m⁷.",
      },
      mistake: {
        wrong: "Confusing 4³ with 4×3 — they mean completely different things.",
        right:
          "4³ means 4×4×4=64 (multiply 4 by itself 3 times). 4×3=12 is just plain multiplication — very different answers.",
      },
      practice: {
        easy: {
          question: "Write 0.3×0.3×0.3×0.3 in index form.",
          answer: "(0.3)⁴",
        },
        medium: {
          question: "Write ¼×¼×¼×¼×¼ in index form, then state the base and index.",
          answer: "(¼)⁵. Base = ¼, index = 5.",
        },
        hard: {
          question:
            "A memory card's capacity is calculated as 2ⁿ MB. If n=10, what is the capacity? Explain why index notation is useful here.",
          answer:
            '2¹⁰ = 1024 MB. Writing "2 multiplied by itself 10 times" would be far more cumbersome than 2¹⁰.',
        },
      },
      realLife: ["💾 Memory and storage capacity", "🦠 Bacteria/cell doubling"],
    },
    {
      num: "1.2",
      title: "Law of Indices — Multiplying and Dividing",
      ideaParagraphs: [
        "2³ means three 2's multiplied together. 2⁴ means four more. Multiply them, and you get SEVEN 2's multiplied together in total — so the indices just ADD. Dividing works the same way in reverse: the indices SUBTRACT.",
      ],
      visual: {
        kind: "factorCombine",
        leftLabel: "2³ (3 twos)",
        rightLabel: "2⁴ (4 twos)",
        resultLabel: "2⁷ (7 twos)",
        caption: "3 twos and 4 twos combine into 7 twos total — the indices just add",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Multiplication and Division Laws",
            formula: "aᵐ × aⁿ = aᵐ⁺ⁿ  |  aᵐ ÷ aⁿ = aᵐ⁻ⁿ",
            legend: [{ label: "", text: "Only works when the BASE is the same on both sides" }],
          },
          worked: {
            question: "Simplify: (a) 7² × 7³ (b) 2k² × 4k³",
            steps: [
              { calc: "(a) 7²×7³ = 7²⁺³ = 7⁵", why: "Same base (7) — add the indices." },
              {
                calc: "(b) 2k²×4k³ = (2×4)(k²×k³)",
                why: "Multiply the coefficients (2 and 4) separately from the k terms.",
              },
              { calc: "= 8k⁵", why: "8 from the coefficients, k²⁺³=k⁵ from adding the indices." },
            ],
          },
        },
        {
          formula: {
            eyebrow: "Power of a Power",
            formula: "(aᵐ)ⁿ = aᵐⁿ",
            legend: [
              {
                label: "",
                text: "(a³)² means (a³) multiplied by itself 2 times = a³⁺³ = a⁶ — the exponents MULTIPLY",
              },
            ],
          },
          worked: {
            question: "Simplify: (5m⁴n³)²",
            steps: [
              {
                calc: "(5m⁴n³)² = 5² × m⁴⁽²⁾ × n³⁽²⁾",
                why: "Every factor inside the bracket gets raised to the outer power — the 5, the m⁴, and the n³ all get squared.",
              },
              {
                calc: "= 25m⁸n⁶",
                why: "5²=25, and multiply each inner exponent by the outer power (4×2=8, 3×2=6).",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Simplify: m³ × n² × m⁴ × n⁵",
        answer: "Group same bases first: m³×m⁴ × n²×n⁵ = m⁷n⁷.",
      },
      mistake: {
        wrong: "Applying aᵐ×aⁿ=aᵐ⁺ⁿ to DIFFERENT bases, like m³×n².",
        right:
          "The base must match. m³×n² stays as m³n² — you can't combine different bases into one power.",
      },
      practice: {
        easy: {
          question: "Simplify: 3² × 3 × 3⁴",
          answer: "3⁷",
        },
        medium: {
          question: "Simplify: (p²q³r)⁴",
          answer: "p⁸q¹²r⁴",
        },
        hard: {
          question: "Simplify: (3m²n³)³ ÷ 6m³n",
          answer: "(3m²n³)³=27m⁶n⁹. 27m⁶n⁹÷6m³n = 4.5m³n⁸ = 9/2 m³n⁸.",
        },
      },
      realLife: ["🧮 Simplifying algebraic formulas", "💻 Computer science algorithms"],
    },
    {
      num: "1.2",
      title: "Zero and Negative Index",
      ideaParagraphs: [
        'What is 2³÷2³? Obviously 1 — anything divided by itself is 1. But the division law says 2³÷2³=2⁰. So 2⁰ MUST equal 1. Push the same logic further (2³÷2⁵=2⁻²), and a negative index turns out to mean "flip to the other side of the fraction bar".',
      ],
      visual: {
        kind: "negIndexFlip",
        baseLabel: "2",
        exponentLabel: "−2",
        denominatorLabel: "2²",
        caption: 'The negative sign means "flip below the line" — the value itself stays positive',
      },
      blocks: [
        {
          formula: { eyebrow: "Zero and Negative Index", formula: "a⁰ = 1  |  a⁻ⁿ = 1/aⁿ" },
          worked: {
            question: "Write in positive index form: (a) a⁻² (b) 2m⁻³",
            steps: [
              {
                calc: "(a) a⁻² = 1/a²",
                why: "The negative sign flips it below the line — the exponent becomes positive once it's flipped.",
              },
              {
                calc: "(b) 2m⁻³ = 2/m³",
                why: "Only the m⁻³ part flips — the coefficient 2 stays where it is.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Write 1/x⁴ in negative index form.",
        answer: "x⁻⁴ — flip the whole thing above the line, the exponent's sign flips too.",
      },
      mistake: {
        wrong: "Thinking a negative index makes the VALUE negative.",
        right:
          'A negative index only means "flip position" (numerator↔denominator) — 2⁻² = ¼, which is positive, not negative.',
      },
      practice: {
        easy: {
          question: "Evaluate: 5⁰",
          answer: "1",
        },
        medium: {
          question: "Evaluate: 3⁻²",
          answer: "1/9",
        },
        hard: {
          question: "Simplify, giving a positive-index answer: 3² × 3⁴ ÷ 3⁸",
          answer: "3²⁺⁴⁻⁸=3⁻². Positive form: 1/3² = 1/9.",
        },
      },
      realLife: ["🔬 Scientific notation for tiny values"],
    },
    {
      num: "1.2",
      title: "Fractional Index",
      ideaParagraphs: [
        "To solve x²=9 you take a square root: x=√9. But there's a second way — raise BOTH sides to the power ½ (the reciprocal of 2): x=9^(1/2). Both give the same answer, so a root and a fractional power are just two names for the same thing.",
      ],
      visual: {
        kind: "rootPower",
        rootExpr: "ⁿ√a",
        powerBase: "a",
        powerExponent: "1/n",
        sameValueLabel: "same value",
        caption: "A root and a fractional power are the same operation, written two ways",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Fractional Index",
            formula: "ⁿ√a = a^(1/n)",
            legend: [
              {
                label: "",
                text: "The root's small number (n) becomes the DENOMINATOR of the fractional power",
              },
            ],
          },
          worked: {
            question: "Convert to a^(1/n) form: (a) ²√36 (b) ⁵√m   Then evaluate: (c) ⁶√729",
            steps: [
              {
                calc: "(a) ²√36 = 36^(1/2)",
                why: "The root index (2) becomes the denominator of the fractional power.",
              },
              { calc: "(b) ⁵√m = m^(1/5)", why: "Same rule — the 5 becomes 1/5." },
              {
                calc: "(c) ⁶√729 = 729^(1/6) = 3",
                why: "3×3×3×3×3×3 = 729, so the 6th root of 729 is 3.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Evaluate: 512^(1/3)",
        answer: "512^(1/3) = ³√512 = 8, since 8×8×8=512.",
      },
      mistake: {
        wrong:
          "Confusing which number in the root becomes the numerator vs denominator of the fractional power.",
        right:
          "The small root-index number ALWAYS becomes the bottom (denominator): ⁿ√a = a^(1/n), never a^(n/1).",
      },
      practice: {
        easy: {
          question: "Convert 125^(1/5) to root form.",
          answer: "⁵√125",
        },
        medium: {
          question: "Evaluate: ⁵√(−32)",
          answer: "−2, since (−2)⁵=−32.",
        },
        hard: {
          question: "Evaluate: 256^(1/8)",
          answer: "2, since 2⁸=256.",
        },
      },
      realLife: ["📐 Engineering root calculations", "🧮 Calculator index buttons"],
    },
  ],
  summary: {
    center: "Indices",
    branches: [
      { title: "Multiply/Divide", points: ["Add or subtract indices"] },
      { title: "Zero/Negative", points: ["a⁰=1, a⁻ⁿ flips position"] },
      { title: "Fractional", points: ["Same as a root"] },
    ],
  },
  formulaSheet: [
    { formula: "aᵐ×aⁿ=aᵐ⁺ⁿ", label: "" },
    { formula: "aᵐ÷aⁿ=aᵐ⁻ⁿ", label: "" },
    { formula: "(aᵐ)ⁿ=aᵐⁿ", label: "" },
    { formula: "a⁰=1, a⁻ⁿ=1/aⁿ, ⁿ√a=a^(1/n)", label: "" },
  ],
  quickRevision: [
    "I can write repeated multiplication in index form.",
    "I can apply the multiplication, division, and power-of-power laws.",
    "I can simplify zero, negative, and fractional indices.",
  ],
  examTips: [
    "Different bases can't combine — group same-base terms together FIRST, before applying any index law.",
    "A negative index changes POSITION (top↔bottom), never the sign of the value.",
  ],
  challenge: {
    question:
      "If mᵃ × mᵇ = m⁸, where a and b are positive integers, list all the possible pairs of (a,b).",
    answer: "a+b=8, both positive integers: (1,7),(2,6),(3,5),(4,4),(5,3),(6,2),(7,1).",
  },
};

const bm: MathF3C1Content = {
  subtopics: [
    {
      num: "1.1",
      title: "Tatatanda Indeks",
      ideaParagraphs: [
        "4 × 4 × 4 ialah nilai sama seperti 4³ — cuma ditulis dua cara berbeza. Tatatanda indeks ialah jalan pintas untuk pendaraban berulang: asas ialah nombor didarab, indeks (atau eksponen) mengira berapa kali.",
      ],
      visual: {
        kind: "indexCollapse",
        expression: "4 × 4 × 4",
        base: "4",
        index: "3",
        factorCountLabel: "3 faktor",
        baseIndexLabel: "asas & indeks",
        caption: "Kira faktor — kiraan itu menjadi indeks",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Tatatanda Indeks",
            formula: "aⁿ = a × a × a × ... × a  (n kali)",
            legend: [{ label: "a", text: "= asas, n = indeks (berapa kali a didarab)" }],
          },
          worked: {
            question: "Tulis dalam bentuk indeks: (a) 5×5×5×5×5×5 (b) (−2)×(−2)×(−2)",
            steps: [
              {
                calc: "(a) 5×5×5×5×5×5 = 5⁶",
                why: "Kira berapa banyak 5 didarab — 6 daripadanya — kiraan itu menjadi indeks.",
              },
              {
                calc: "(b) (−2)×(−2)×(−2) = (−2)³",
                why: "Asas di sini ialah keseluruhan (−2), berulang 3 kali.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Tulis m×m×m×m×m×m×m dalam bentuk indeks.",
        answer: "m berulang 7 kali, jadi ia m⁷.",
      },
      mistake: {
        wrong: "Mengelirukan 4³ dengan 4×3 — kedua-duanya bermaksud sangat berbeza.",
        right:
          "4³ bermaksud 4×4×4=64 (darab 4 dengan dirinya 3 kali). 4×3=12 hanya pendaraban biasa — jawapan sangat berbeza.",
      },
      practice: {
        easy: {
          question: "Tulis 0.3×0.3×0.3×0.3 dalam bentuk indeks.",
          answer: "(0.3)⁴",
        },
        medium: {
          question: "Tulis ¼×¼×¼×¼×¼ dalam bentuk indeks, kemudian nyatakan asas dan indeks.",
          answer: "(¼)⁵. Asas = ¼, indeks = 5.",
        },
        hard: {
          question:
            "Muatan kad memori dikira sebagai 2ⁿ MB. Jika n=10, apakah muatannya? Jelaskan kenapa tatatanda indeks berguna di sini.",
          answer:
            '2¹⁰ = 1024 MB. Menulis "2 didarab dengan dirinya 10 kali" jauh lebih menyusahkan daripada 2¹⁰.',
        },
      },
      realLife: ["💾 Muatan memori dan storan", "🦠 Penggandaan bakteria/sel"],
    },
    {
      num: "1.2",
      title: "Hukum Indeks — Mendarab dan Membahagi",
      ideaParagraphs: [
        "2³ bermaksud tiga 2 didarab bersama. 2⁴ bermaksud empat lagi. Darabkan, dan anda dapat TUJUH 2 didarab bersama jumlahnya — jadi indeks hanya DITAMBAH. Membahagi berfungsi cara sama secara songsang: indeks DITOLAK.",
      ],
      visual: {
        kind: "factorCombine",
        leftLabel: "2³ (3 dua)",
        rightLabel: "2⁴ (4 dua)",
        resultLabel: "2⁷ (7 dua)",
        caption: "3 dua dan 4 dua bergabung menjadi 7 dua jumlahnya — indeks hanya bertambah",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Hukum Pendaraban dan Pembahagian",
            formula: "aᵐ × aⁿ = aᵐ⁺ⁿ  |  aᵐ ÷ aⁿ = aᵐ⁻ⁿ",
            legend: [{ label: "", text: "Hanya berfungsi apabila ASAS sama pada kedua-dua belah" }],
          },
          worked: {
            question: "Permudahkan: (a) 7² × 7³ (b) 2k² × 4k³",
            steps: [
              { calc: "(a) 7²×7³ = 7²⁺³ = 7⁵", why: "Asas sama (7) — tambah indeks." },
              {
                calc: "(b) 2k²×4k³ = (2×4)(k²×k³)",
                why: "Darab pekali (2 dan 4) berasingan daripada sebutan k.",
              },
              { calc: "= 8k⁵", why: "8 daripada pekali, k²⁺³=k⁵ daripada tambah indeks." },
            ],
          },
        },
        {
          formula: {
            eyebrow: "Kuasa bagi Kuasa",
            formula: "(aᵐ)ⁿ = aᵐⁿ",
            legend: [
              {
                label: "",
                text: "(a³)² bermaksud (a³) didarab dengan dirinya 2 kali = a³⁺³ = a⁶ — eksponen DIDARAB",
              },
            ],
          },
          worked: {
            question: "Permudahkan: (5m⁴n³)²",
            steps: [
              {
                calc: "(5m⁴n³)² = 5² × m⁴⁽²⁾ × n³⁽²⁾",
                why: "Setiap faktor dalam kurungan dinaikkan kepada kuasa luar — 5, m⁴, dan n³ semua dikuasaduakan.",
              },
              {
                calc: "= 25m⁸n⁶",
                why: "5²=25, dan darab setiap eksponen dalam dengan kuasa luar (4×2=8, 3×2=6).",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Permudahkan: m³ × n² × m⁴ × n⁵",
        answer: "Kumpulkan asas sama dahulu: m³×m⁴ × n²×n⁵ = m⁷n⁷.",
      },
      mistake: {
        wrong: "Guna aᵐ×aⁿ=aᵐ⁺ⁿ pada asas BERBEZA, seperti m³×n².",
        right:
          "Asas mesti sepadan. m³×n² kekal m³n² — anda tidak boleh gabung asas berbeza menjadi satu kuasa.",
      },
      practice: {
        easy: {
          question: "Permudahkan: 3² × 3 × 3⁴",
          answer: "3⁷",
        },
        medium: {
          question: "Permudahkan: (p²q³r)⁴",
          answer: "p⁸q¹²r⁴",
        },
        hard: {
          question: "Permudahkan: (3m²n³)³ ÷ 6m³n",
          answer: "(3m²n³)³=27m⁶n⁹. 27m⁶n⁹÷6m³n = 4.5m³n⁸ = 9/2 m³n⁸.",
        },
      },
      realLife: ["🧮 Memudahkan formula algebra", "💻 Algoritma sains komputer"],
    },
    {
      num: "1.2",
      title: "Indeks Sifar dan Negatif",
      ideaParagraphs: [
        'Apakah 2³÷2³? Jelas 1 — apa sahaja dibahagi dirinya ialah 1. Tetapi hukum pembahagian kata 2³÷2³=2⁰. Jadi 2⁰ MESTI bersamaan 1. Teruskan logik sama (2³÷2⁵=2⁻²), dan indeks negatif ternyata bermaksud "terbalik ke sebelah lain garis pecahan".',
      ],
      visual: {
        kind: "negIndexFlip",
        baseLabel: "2",
        exponentLabel: "−2",
        denominatorLabel: "2²",
        caption:
          'Tanda negatif bermaksud "terbalik ke bawah garis" — nilai itu sendiri kekal positif',
      },
      blocks: [
        {
          formula: { eyebrow: "Indeks Sifar dan Negatif", formula: "a⁰ = 1  |  a⁻ⁿ = 1/aⁿ" },
          worked: {
            question: "Tulis dalam bentuk indeks positif: (a) a⁻² (b) 2m⁻³",
            steps: [
              {
                calc: "(a) a⁻² = 1/a²",
                why: "Tanda negatif terbalikkannya ke bawah garis — eksponen menjadi positif sebaik terbalik.",
              },
              {
                calc: "(b) 2m⁻³ = 2/m³",
                why: "Hanya bahagian m⁻³ terbalik — pekali 2 kekal di tempatnya.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Tulis 1/x⁴ dalam bentuk indeks negatif.",
        answer: "x⁻⁴ — terbalik keseluruhan ke atas garis, tanda eksponen turut terbalik.",
      },
      mistake: {
        wrong: "Menyangka indeks negatif menjadikan NILAI negatif.",
        right:
          'Indeks negatif hanya bermaksud "terbalik kedudukan" (pengangka↔penyebut) — 2⁻² = ¼, iaitu positif, bukan negatif.',
      },
      practice: {
        easy: {
          question: "Nilaikan: 5⁰",
          answer: "1",
        },
        medium: {
          question: "Nilaikan: 3⁻²",
          answer: "1/9",
        },
        hard: {
          question: "Permudahkan, beri jawapan indeks positif: 3² × 3⁴ ÷ 3⁸",
          answer: "3²⁺⁴⁻⁸=3⁻². Bentuk positif: 1/3² = 1/9.",
        },
      },
      realLife: ["🔬 Tatatanda saintifik untuk nilai kecil"],
    },
    {
      num: "1.2",
      title: "Indeks Pecahan",
      ideaParagraphs: [
        "Untuk selesaikan x²=9 anda ambil punca kuasa dua: x=√9. Tetapi ada cara kedua — naikkan KEDUA-DUA belah kepada kuasa ½ (salingan 2): x=9^(1/2). Kedua-dua beri jawapan sama, jadi punca dan kuasa pecahan cuma dua nama untuk perkara sama.",
      ],
      visual: {
        kind: "rootPower",
        rootExpr: "ⁿ√a",
        powerBase: "a",
        powerExponent: "1/n",
        sameValueLabel: "nilai sama",
        caption: "Punca dan kuasa pecahan ialah operasi sama, ditulis dua cara",
      },
      blocks: [
        {
          formula: {
            eyebrow: "Indeks Pecahan",
            formula: "ⁿ√a = a^(1/n)",
            legend: [{ label: "", text: "Nombor kecil punca (n) menjadi PENYEBUT kuasa pecahan" }],
          },
          worked: {
            question:
              "Tukar kepada bentuk a^(1/n): (a) ²√36 (b) ⁵√m   Kemudian nilaikan: (c) ⁶√729",
            steps: [
              {
                calc: "(a) ²√36 = 36^(1/2)",
                why: "Indeks punca (2) menjadi penyebut kuasa pecahan.",
              },
              { calc: "(b) ⁵√m = m^(1/5)", why: "Peraturan sama — 5 menjadi 1/5." },
              {
                calc: "(c) ⁶√729 = 729^(1/6) = 3",
                why: "3×3×3×3×3×3 = 729, jadi punca ke-6 729 ialah 3.",
              },
            ],
          },
        },
      ],
      guided: {
        question: "Nilaikan: 512^(1/3)",
        answer: "512^(1/3) = ³√512 = 8, kerana 8×8×8=512.",
      },
      mistake: {
        wrong: "Mengelirukan nombor mana dalam punca menjadi pengangka lwn penyebut kuasa pecahan.",
        right:
          "Nombor indeks-punca kecil SENTIASA menjadi bawah (penyebut): ⁿ√a = a^(1/n), tidak pernah a^(n/1).",
      },
      practice: {
        easy: {
          question: "Tukar 125^(1/5) kepada bentuk punca.",
          answer: "⁵√125",
        },
        medium: {
          question: "Nilaikan: ⁵√(−32)",
          answer: "−2, kerana (−2)⁵=−32.",
        },
        hard: {
          question: "Nilaikan: 256^(1/8)",
          answer: "2, kerana 2⁸=256.",
        },
      },
      realLife: ["📐 Pengiraan punca kejuruteraan", "🧮 Butang indeks kalkulator"],
    },
  ],
  summary: {
    center: "Indeks",
    branches: [
      { title: "Darab/Bahagi", points: ["Tambah atau tolak indeks"] },
      { title: "Sifar/Negatif", points: ["a⁰=1, a⁻ⁿ terbalik kedudukan"] },
      { title: "Pecahan", points: ["Sama seperti punca"] },
    ],
  },
  formulaSheet: [
    { formula: "aᵐ×aⁿ=aᵐ⁺ⁿ", label: "" },
    { formula: "aᵐ÷aⁿ=aᵐ⁻ⁿ", label: "" },
    { formula: "(aᵐ)ⁿ=aᵐⁿ", label: "" },
    { formula: "a⁰=1, a⁻ⁿ=1/aⁿ, ⁿ√a=a^(1/n)", label: "" },
  ],
  quickRevision: [
    "Saya boleh tulis pendaraban berulang dalam bentuk indeks.",
    "Saya boleh guna hukum pendaraban, pembahagian, dan kuasa bagi kuasa.",
    "Saya boleh permudahkan indeks sifar, negatif, dan pecahan.",
  ],
  examTips: [
    "Asas berbeza tidak boleh gabung — kumpulkan sebutan asas sama DAHULU, sebelum guna sebarang hukum indeks.",
    "Indeks negatif ubah KEDUDUKAN (atas↔bawah), tidak pernah tanda nilai.",
  ],
  challenge: {
    question:
      "Jika mᵃ × mᵇ = m⁸, dengan a dan b integer positif, senaraikan semua pasangan (a,b) mungkin.",
    answer: "a+b=8, kedua-dua integer positif: (1,7),(2,6),(3,5),(4,4),(5,3),(6,2),(7,1).",
  },
};

export const mathF3C1InteractiveContent: { en: MathF3C1Content; bm: MathF3C1Content } = { en, bm };
