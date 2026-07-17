// mat-chapter1-content.ts
// Source-verified content for Mathematics Form 1, Chapter 1 — Rational Numbers / Nombor Nisbah
// EN sourced from T1_BT_MAT_DLP_-_MATHEMATICS.pdf (pages 1-24)
// BM sourced from T1_BT_MAT-_MATEMATIK.pdf (pages 1-24, official KSSM counterpart)
// Content data only — no presentation markup.

export interface NumberLineExample {
  value: string;
  meaning: string;
}

export interface WorkedExample {
  problem: string;
  steps: string[];
  answer: string;
}

export interface ProblemSolvingExample {
  scenario: string;
  understanding: string[];
  devisingPlan: string[];
  implementing: string[];
  reflection: string;
}

export interface ArithmeticLaw {
  name: string;
  formula: string;
}

export interface Mat1Content {
  hook: { title: string; body: string };
  integers: {
    definition: string;
    realLifeExamples: { situation: string; representation: string }[];
    numberLine: {
      concept: string;
      examples: NumberLineExample[];
    };
    comparingOrdering: {
      rule: string;
      ascendingExample: WorkedExample;
      descendingExample: WorkedExample;
    };
  };
  arithmeticOperations: {
    addSubtract: {
      rules: string[];
      examples: WorkedExample[];
    };
    multiplyDivide: {
      signRules: string[];
    };
    laws: ArithmeticLaw[];
    efficientComputation: WorkedExample[];
  };
  fractions: {
    numberLineConcept: string;
    comparingOrdering: WorkedExample;
    combinedOperations: WorkedExample;
    problemSolving: ProblemSolvingExample;
  };
  decimals: {
    numberLineConcept: string;
    comparingOrdering: WorkedExample;
    combinedOperations: WorkedExample;
    problemSolving: ProblemSolvingExample;
  };
  rationalNumbers: {
    definition: string;
    formula: string;
    determiningExample: WorkedExample;
    combinedOperations: WorkedExample;
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const en: Mat1Content = {
  hook: {
    title: "Why this matters",
    body: "Every time you check a bank balance, read a weather forecast below zero, or track a stock price rising and falling — you're using rational numbers. This chapter builds the foundation for every number operation you'll do for the rest of secondary school."
  },
  integers: {
    definition: "Integers are a group of numbers which include positive and negative whole numbers as well as zero. Numbers written with the '+' sign or without any sign are positive numbers. Numbers written with the '−' sign are negative numbers.",
    realLifeExamples: [
      { situation: "A lift going up two floors", representation: "+2 or 2" },
      { situation: "A lift going down one floor", representation: "−1" },
      { situation: "Temperature of 45°C at a desert", representation: "+45 or 45" },
      { situation: "Temperature of a glacier 10°C below 0°C", representation: "−10" }
    ],
    numberLine: {
      concept: "On a number line, if the direction towards right is positive and towards left is negative: for a positive integer, the greater the number, the further right its position and the greater its value. For a negative integer, the smaller the number, the further left its position and the lesser its value.",
      examples: [
        { value: "−3", meaning: "3 less than 0" },
        { value: "3", meaning: "3 more than 0" },
        { value: "−1", meaning: "1 less than 0" },
        { value: "1", meaning: "1 more than 0" }
      ]
    },
    comparingOrdering: {
      rule: "A positive number always has a larger value than a negative number. Numbers in the positive direction are always greater than numbers in the negative direction.",
      ascendingExample: { problem: "Compare and arrange −3, 4, 2, −5, 6, 0, −1 in ascending order", steps: ["Plot each value on a number line", "Read values from left (smallest) to right (largest)"], answer: "−5, −3, −1, 0, 2, 4, 6" },
      descendingExample: { problem: "Compare and arrange −4, 3, 2, 5, −2, −1, −5 in descending order", steps: ["Plot each value on a number line", "Read values from right (largest) to left (smallest)"], answer: "5, 3, 2, −1, −2, −4, −5" }
    }
  },
  arithmeticOperations: {
    addSubtract: {
      rules: [
        "Addition of positive integers is represented by moving towards the right",
        "Addition of negative integers is represented by moving towards the left",
        "Subtraction of positive integers is represented by moving towards the left",
        "Subtraction of negative integers is represented by moving towards the right"
      ],
      examples: [
        { problem: "8 + (+3)", steps: ["Move 3 units to the right from 8"], answer: "11" },
        { problem: "5 + (−2)", steps: ["Move 2 units to the left from 5"], answer: "3" },
        { problem: "2 − (+4)", steps: ["Move 4 units to the left from 2"], answer: "−2" },
        { problem: "−1 − (−4)", steps: ["Equivalent to −1 + 4", "Move 4 units to the right from −1"], answer: "3" }
      ]
    },
    multiplyDivide: {
      signRules: [
        "Positive × Positive = Positive",
        "Negative × Negative = Positive",
        "Positive × Negative = Negative",
        "Negative × Positive = Negative",
        "Same sign rules apply for division"
      ]
    },
    laws: [
      { name: "Commutative Law", formula: "a + b = b + a  and  a × b = b × a" },
      { name: "Associative Law", formula: "(a + b) + c = a + (b + c)  and  (a × b) × c = a × (b × c)" },
      { name: "Distributive Law", formula: "a × (b + c) = a × b + a × c" },
      { name: "Identity Law", formula: "a + 0 = a,  a × 1 = a,  a + (−a) = 0,  a × (1/a) = 1" }
    ],
    efficientComputation: [
      { problem: "29 + 38 + 2", steps: ["= 29 + (38 + 2) — Associative Law", "= 29 + 40"], answer: "69" },
      { problem: "2 × 24 × 5", steps: ["= 24 × 2 × 5 — Commutative Law", "= 24 × (2 × 5) — Associative Law", "= 24 × 10"], answer: "240" },
      { problem: "7 × 3040", steps: ["= 7 × (3000 + 40)", "= 7 × 3000 + 7 × 40 — Distributive Law", "= 21000 + 280"], answer: "21280" }
    ]
  },
  fractions: {
    numberLineConcept: "Representation of fractions on a number line is the same as integers. Positive fractions are fractions more than zero; negative fractions are fractions less than zero.",
    comparingOrdering: {
      problem: "Compare and arrange 1/8, −3/4, −1¼, ½, −1⅝, −3/8 in ascending order",
      steps: ["Equalise the denominators of all fractions first", "Plot on a number line", "Read from smallest to largest"],
      answer: "−1⅝, −1¼, −3/4, −3/8, 1/8, ½"
    },
    combinedOperations: {
      problem: "5/8 + 1⅓ ÷ (−⅚)",
      steps: ["Division is performed first", "Change ÷ to × and use the reciprocal of −5/6, which is −6/5", "= 5/8 + 4/3 × (−6/5)", "Follow order of operations: (), × or ÷, then + or −"],
      answer: "−39/40"
    },
    problemSolving: {
      scenario: "A mathematics quiz has 20 questions. A score of 2 marks is awarded for every correct answer and −½ mark for every incorrect answer. Mei Ling answered all questions and her score for incorrect answers was −4. What was her total score?",
      understanding: ["A correct answer scores 2 marks", "An incorrect answer scores −½ mark", "Score for incorrect answers = −4", "Find the total score"],
      devisingPlan: ["+2 represents the score for a correct answer", "−½ represents the score for an incorrect answer", "Find the number of incorrect answers using division", "Find total score using multiplication and addition"],
      implementing: ["Number of incorrect answers = −4 ÷ (−½) = 8", "Total score = (20 − 8) × 2 + (−4) = 12 × 2 − 4 = 20"],
      reflection: "Checking: 20 questions, 8 incorrect (score −4), 12 correct (score 24) → 24 − 4 = 20 ✓"
    }
  },
  decimals: {
    numberLineConcept: "Representation of decimals on a number line is the same as integers and fractions. Positive decimals are more than zero; negative decimals are less than zero.",
    comparingOrdering: {
      problem: "Compare and arrange −1.6, 0.5, −0.3, 1.4, −0.7 in descending order",
      steps: ["Plot each value on a number line", "Read from largest to smallest"],
      answer: "1.4, 0.5, −0.3, −0.7, −1.6"
    },
    combinedOperations: {
      problem: "3.5 − (−6.5) × 0.2",
      steps: ["Multiplication is performed first: (−6.5) × 0.2 = −1.3", "= 3.5 − (−1.3)", "= 3.5 + 1.3"],
      answer: "4.8"
    },
    problemSolving: {
      scenario: "The price of a company's stock was RM2.05. The price hiked by RM0.32, then dropped RM0.28 every hour for the next three hours. Calculate the final stock price.",
      understanding: ["Starting price = RM2.05", "Price hiked by RM0.32", "Price dropped RM0.28 every hour for 3 hours", "Find the final price"],
      devisingPlan: ["Increase in price is written as +0.32", "Decrease in price is written as −0.28", "Use multiplication and addition"],
      implementing: ["Final price = 2.05 + 0.32 + 3 × (−0.28)", "= 2.37 + (−0.84)", "= 2.37 − 0.84 = 1.53"],
      reflection: "RM2.05 + RM0.32 − 3 × RM0.28 = RM2.37 − RM0.84 = RM1.53 — the final stock price was RM1.53"
    }
  },
  rationalNumbers: {
    definition: "Numbers that can be written in fractional form p/q, such that p and q are integers and q ≠ 0, are known as rational numbers.",
    formula: "p/q, where p and q are integers, q ≠ 0",
    determiningExample: {
      problem: "Determine whether 1⅘, ¾, −9 and 3.5 are rational numbers",
      steps: ["1⅘ = 9/5", "¾ stays as 3/4", "−9 = −9/1", "3.5 = 35/10 = 7/2"],
      answer: "All four numbers can be written in the form p/q, so all are rational numbers"
    },
    combinedOperations: {
      problem: "−0.4 + 1½ × (−⅛)",
      steps: ["Convert decimals into fractions first: −0.4 = −4/10 = −2/5", "= −2/5 + 3/2 × (−1/8)", "Follow order of operations: × or ÷ first, then + or −"],
      answer: "−47/80"
    }
  },
  keyExamFacts: [
    "Integers are positive and negative whole numbers, plus zero",
    "On a number line, positive direction values are always greater than negative direction values",
    "Addition of positive integers moves right; addition of negative integers moves left (opposite for subtraction)",
    "Same-sign multiplication/division gives a positive result; different signs give a negative result",
    "4 arithmetic laws: Commutative (a+b=b+a), Associative ((a+b)+c=a+(b+c)), Distributive (a×(b+c)=a×b+a×c), Identity (a+0=a, a×1=a)",
    "Fractions and decimals follow the same number-line logic as integers",
    "Rational numbers are any number expressible as p/q where p, q are integers and q ≠ 0",
    "Problem-solving follows 4 steps: Understanding the problem → Devising a plan → Implementing the strategy → Doing reflection"
  ],
  keyTerms: [
    "Integer", "Positive integer", "Negative integer", "Number line", "Ascending order", "Descending order",
    "Commutative Law", "Associative Law", "Distributive Law", "Identity Law",
    "Positive fraction", "Negative fraction", "Positive decimal", "Negative decimal",
    "Rational number", "Order of operations", "Reciprocal"
  ],
  chapterSummary: "Chapter 1 covers integers (definition, number line representation, comparing/ordering), the 4 basic arithmetic operations on integers including the 4 arithmetic laws, positive/negative fractions and decimals (number line, ordering, combined operations, and real-world problem-solving), and the formal definition of rational numbers as any number expressible in the form p/q."
};

const bm: Mat1Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Setiap kali anda menyemak baki bank, membaca ramalan cuaca di bawah sifar, atau menjejak harga saham naik turun — anda sedang menggunakan nombor nisbah. Bab ini membina asas untuk setiap operasi nombor yang akan anda lakukan sepanjang sekolah menengah."
  },
  integers: {
    definition: "Integer ialah kumpulan nombor yang termasuk nombor bulat positif dan negatif serta sifar. Nombor yang ditulis dengan tanda '+' atau tanpa sebarang tanda adalah nombor positif. Nombor yang ditulis dengan tanda '−' adalah nombor negatif.",
    realLifeExamples: [
      { situation: "Lif bergerak naik dua tingkat", representation: "+2 atau 2" },
      { situation: "Lif bergerak turun satu tingkat", representation: "−1" },
      { situation: "Suhu 45°C di gurun", representation: "+45 atau 45" },
      { situation: "Suhu glasier 10°C bawah 0°C", representation: "−10" }
    ],
    numberLine: {
      concept: "Pada garis nombor, jika arah ke kanan adalah positif dan ke kiri adalah negatif: bagi integer positif, semakin besar nombor, semakin jauh kedudukannya ke kanan dan semakin besar nilainya. Bagi integer negatif, semakin kecil nombor, semakin jauh kedudukannya ke kiri dan semakin kecil nilainya.",
      examples: [
        { value: "−3", meaning: "3 kurang daripada 0" },
        { value: "3", meaning: "3 lebih daripada 0" },
        { value: "−1", meaning: "1 kurang daripada 0" },
        { value: "1", meaning: "1 lebih daripada 0" }
      ]
    },
    comparingOrdering: {
      rule: "Nombor positif sentiasa mempunyai nilai lebih besar daripada nombor negatif. Nombor dalam arah positif sentiasa lebih besar daripada nombor dalam arah negatif.",
      ascendingExample: { problem: "Bandingkan dan susun −3, 4, 2, −5, 6, 0, −1 mengikut tertib menaik", steps: ["Plot setiap nilai pada garis nombor", "Baca nilai dari kiri (terkecil) ke kanan (terbesar)"], answer: "−5, −3, −1, 0, 2, 4, 6" },
      descendingExample: { problem: "Bandingkan dan susun −4, 3, 2, 5, −2, −1, −5 mengikut tertib menurun", steps: ["Plot setiap nilai pada garis nombor", "Baca nilai dari kanan (terbesar) ke kiri (terkecil)"], answer: "5, 3, 2, −1, −2, −4, −5" }
    }
  },
  arithmeticOperations: {
    addSubtract: {
      rules: [
        "Penambahan integer positif diwakili dengan bergerak ke kanan",
        "Penambahan integer negatif diwakili dengan bergerak ke kiri",
        "Penolakan integer positif diwakili dengan bergerak ke kiri",
        "Penolakan integer negatif diwakili dengan bergerak ke kanan"
      ],
      examples: [
        { problem: "8 + (+3)", steps: ["Bergerak 3 unit ke kanan daripada 8"], answer: "11" },
        { problem: "5 + (−2)", steps: ["Bergerak 2 unit ke kiri daripada 5"], answer: "3" },
        { problem: "2 − (+4)", steps: ["Bergerak 4 unit ke kiri daripada 2"], answer: "−2" },
        { problem: "−1 − (−4)", steps: ["Bersamaan dengan −1 + 4", "Bergerak 4 unit ke kanan daripada −1"], answer: "3" }
      ]
    },
    multiplyDivide: {
      signRules: [
        "Positif × Positif = Positif",
        "Negatif × Negatif = Positif",
        "Positif × Negatif = Negatif",
        "Negatif × Positif = Negatif",
        "Peraturan tanda yang sama terpakai untuk pembahagian"
      ]
    },
    laws: [
      { name: "Hukum Kalis Tukar Tertib", formula: "a + b = b + a  dan  a × b = b × a" },
      { name: "Hukum Kalis Sekutuan", formula: "(a + b) + c = a + (b + c)  dan  (a × b) × c = a × (b × c)" },
      { name: "Hukum Kalis Agihan", formula: "a × (b + c) = a × b + a × c" },
      { name: "Hukum Identiti", formula: "a + 0 = a,  a × 1 = a,  a + (−a) = 0,  a × (1/a) = 1" }
    ],
    efficientComputation: [
      { problem: "29 + 38 + 2", steps: ["= 29 + (38 + 2) — Hukum Kalis Sekutuan", "= 29 + 40"], answer: "69" },
      { problem: "2 × 24 × 5", steps: ["= 24 × 2 × 5 — Hukum Kalis Tukar Tertib", "= 24 × (2 × 5) — Hukum Kalis Sekutuan", "= 24 × 10"], answer: "240" },
      { problem: "7 × 3040", steps: ["= 7 × (3000 + 40)", "= 7 × 3000 + 7 × 40 — Hukum Kalis Agihan", "= 21000 + 280"], answer: "21280" }
    ]
  },
  fractions: {
    numberLineConcept: "Perwakilan pecahan pada garis nombor adalah sama seperti integer. Pecahan positif adalah pecahan lebih daripada sifar; pecahan negatif adalah pecahan kurang daripada sifar.",
    comparingOrdering: {
      problem: "Bandingkan dan susun 1/8, −3/4, −1¼, ½, −1⅝, −3/8 mengikut tertib menaik",
      steps: ["Samakan penyebut semua pecahan dahulu", "Plot pada garis nombor", "Baca dari terkecil ke terbesar"],
      answer: "−1⅝, −1¼, −3/4, −3/8, 1/8, ½"
    },
    combinedOperations: {
      problem: "5/8 + 1⅓ ÷ (−⅚)",
      steps: ["Pembahagian dilakukan dahulu", "Tukar ÷ kepada × dan guna songsang −5/6, iaitu −6/5", "= 5/8 + 4/3 × (−6/5)", "Ikut susunan operasi: (), × atau ÷, kemudian + atau −"],
      answer: "−39/40"
    },
    problemSolving: {
      scenario: "Satu kuiz matematik mengandungi 20 soalan. Markah 2 diberikan bagi setiap jawapan betul dan −½ markah bagi setiap jawapan salah. Mei Ling menjawab semua soalan dan markah bagi jawapan salahnya ialah −4. Berapakah jumlah markah Mei Ling?",
      understanding: ["Jawapan betul mendapat markah 2", "Jawapan salah mendapat markah −½", "Markah bagi jawapan salah = −4", "Cari jumlah markah"],
      devisingPlan: ["+2 mewakili markah bagi jawapan betul", "−½ mewakili markah bagi jawapan salah", "Cari bilangan jawapan salah menggunakan pembahagian", "Cari jumlah markah menggunakan pendaraban dan penambahan"],
      implementing: ["Bilangan jawapan salah = −4 ÷ (−½) = 8", "Jumlah markah = (20 − 8) × 2 + (−4) = 12 × 2 − 4 = 20"],
      reflection: "Semakan: 20 soalan, 8 salah (markah −4), 12 betul (markah 24) → 24 − 4 = 20 ✓"
    }
  },
  decimals: {
    numberLineConcept: "Perwakilan perpuluhan pada garis nombor adalah sama seperti integer dan pecahan. Perpuluhan positif lebih daripada sifar; perpuluhan negatif kurang daripada sifar.",
    comparingOrdering: {
      problem: "Bandingkan dan susun −1.6, 0.5, −0.3, 1.4, −0.7 mengikut tertib menurun",
      steps: ["Plot setiap nilai pada garis nombor", "Baca dari terbesar ke terkecil"],
      answer: "1.4, 0.5, −0.3, −0.7, −1.6"
    },
    combinedOperations: {
      problem: "3.5 − (−6.5) × 0.2",
      steps: ["Pendaraban dilakukan dahulu: (−6.5) × 0.2 = −1.3", "= 3.5 − (−1.3)", "= 3.5 + 1.3"],
      answer: "4.8"
    },
    problemSolving: {
      scenario: "Harga saham sebuah syarikat ialah RM2.05. Harga naik RM0.32, kemudian jatuh RM0.28 setiap jam untuk tiga jam berikutnya. Hitung harga akhir saham tersebut.",
      understanding: ["Harga permulaan = RM2.05", "Harga naik RM0.32", "Harga jatuh RM0.28 setiap jam untuk 3 jam", "Cari harga akhir"],
      devisingPlan: ["Kenaikan harga ditulis sebagai +0.32", "Penurunan harga ditulis sebagai −0.28", "Gunakan pendaraban dan penambahan"],
      implementing: ["Harga akhir = 2.05 + 0.32 + 3 × (−0.28)", "= 2.37 + (−0.84)", "= 2.37 − 0.84 = 1.53"],
      reflection: "RM2.05 + RM0.32 − 3 × RM0.28 = RM2.37 − RM0.84 = RM1.53 — harga akhir saham ialah RM1.53"
    }
  },
  rationalNumbers: {
    definition: "Nombor yang boleh ditulis dalam bentuk pecahan p/q, dengan syarat p dan q adalah integer dan q ≠ 0, dikenali sebagai nombor nisbah.",
    formula: "p/q, dengan p dan q adalah integer, q ≠ 0",
    determiningExample: {
      problem: "Tentukan sama ada 1⅘, ¾, −9 dan 3.5 adalah nombor nisbah",
      steps: ["1⅘ = 9/5", "¾ kekal sebagai 3/4", "−9 = −9/1", "3.5 = 35/10 = 7/2"],
      answer: "Kesemua empat nombor boleh ditulis dalam bentuk p/q, maka kesemuanya adalah nombor nisbah"
    },
    combinedOperations: {
      problem: "−0.4 + 1½ × (−⅛)",
      steps: ["Tukar perpuluhan kepada pecahan dahulu: −0.4 = −4/10 = −2/5", "= −2/5 + 3/2 × (−1/8)", "Ikut susunan operasi: × atau ÷ dahulu, kemudian + atau −"],
      answer: "−47/80"
    }
  },
  keyExamFacts: [
    "Integer ialah nombor bulat positif dan negatif, ditambah sifar",
    "Pada garis nombor, nilai arah positif sentiasa lebih besar daripada nilai arah negatif",
    "Penambahan integer positif bergerak ke kanan; penambahan integer negatif bergerak ke kiri (bertentangan untuk penolakan)",
    "Pendaraban/pembahagian tanda sama menghasilkan jawapan positif; tanda berbeza menghasilkan jawapan negatif",
    "4 hukum aritmetik: Kalis Tukar Tertib (a+b=b+a), Kalis Sekutuan ((a+b)+c=a+(b+c)), Kalis Agihan (a×(b+c)=a×b+a×c), Identiti (a+0=a, a×1=a)",
    "Pecahan dan perpuluhan mengikut logik garis nombor yang sama seperti integer",
    "Nombor nisbah ialah sebarang nombor yang boleh dinyatakan sebagai p/q dengan p, q integer dan q ≠ 0",
    "Penyelesaian masalah mengikut 4 langkah: Memahami masalah → Merancang strategi → Melaksanakan strategi → Membuat refleksi"
  ],
  keyTerms: [
    "Integer", "Integer positif", "Integer negatif", "Garis nombor", "Tertib menaik", "Tertib menurun",
    "Hukum Kalis Tukar Tertib", "Hukum Kalis Sekutuan", "Hukum Kalis Agihan", "Hukum Identiti",
    "Pecahan positif", "Pecahan negatif", "Perpuluhan positif", "Perpuluhan negatif",
    "Nombor nisbah", "Susunan operasi", "Songsang"
  ],
  chapterSummary: "Bab 1 merangkumi integer (definisi, perwakilan garis nombor, perbandingan/penyusunan), empat operasi asas aritmetik integer termasuk empat hukum aritmetik, pecahan dan perpuluhan positif/negatif (garis nombor, penyusunan, operasi gabungan, dan penyelesaian masalah dunia sebenar), serta definisi formal nombor nisbah sebagai sebarang nombor yang boleh dinyatakan dalam bentuk p/q."
};

export const mat1Content = { en, bm };
export default mat1Content;
