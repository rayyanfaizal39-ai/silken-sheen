// mat-chapter2-content.ts
// Source-verified content for Mathematics Form 1, Chapter 2 — Factors and Multiples / Faktor dan Gandaan
// EN sourced from T1_BT_MAT_DLP_-_MATHEMATICS.pdf (pages 30-43)
// BM sourced from T1_BT_MAT-_MATEMATIK.pdf (pages 30-43, official KSSM counterpart)
// Content data only — no presentation markup.

export interface WorkedExample {
  problem: string;
  steps: string[];
  answer: string;
}

export interface MethodExample {
  methodName: string;
  steps: string[];
  result: string;
}

export interface ProblemSolvingExample {
  scenario: string;
  understanding: string[];
  devisingPlan: string[];
  implementing: string[];
  reflection: string;
}

export interface Mat2Content {
  hook: { title: string; body: string };
  factors: {
    definition: string;
    determiningExample: WorkedExample;
    listingExample: WorkedExample;
  };
  primeFactors: {
    definition: string;
    primeFactorisationDefinition: string;
    methods: MethodExample[];
  };
  commonFactors: {
    definition: string;
    determiningExample: WorkedExample;
    listingExample: WorkedExample;
  };
  hcf: {
    definition: string;
    methodNames: string[];
    methods: MethodExample[];
    problemSolving: ProblemSolvingExample;
  };
  commonMultiples: {
    definition: string;
    determiningExample: WorkedExample;
    listingExample: WorkedExample;
    keyInsight: string;
  };
  lcm: {
    definition: string;
    methodNames: string[];
    methods: MethodExample[];
    problemSolving: ProblemSolvingExample;
  };
  chapterComparison: {
    factorsOf12: string[];
    factorsOf18: string[];
    commonFactors1218: string[];
    hcf1218: string;
    multiplesOf6: string[];
    multiplesOf8: string[];
    commonMultiples68: string[];
    lcm68: string;
  };
  keyExamFacts: string[];
  keyTerms: string[];
  chapterSummary: string;
}

const en: Mat2Content = {
  hook: {
    title: "Why this matters",
    body: "Dividing a donation equally into the maximum number of packs, or figuring out when two blinking lights will flash together again — these are HCF and LCM problems in disguise. This chapter gives you the tools to solve them systematically instead of by guesswork."
  },
  factors: {
    definition: "Factors of a number are whole numbers that can divide the number completely. 1 is a factor of all numbers.",
    determiningExample: { problem: "Determine whether 12 is a factor of 36, and whether 9 is a factor of 30", steps: ["36 ÷ 12 = 3 → 12 is a factor of 36", "30 cannot be divided completely by 9 → 9 is not a factor of 30"], answer: "12 is a factor of 36; 9 is not a factor of 30" },
    listingExample: { problem: "List all the factors of 18", steps: ["18 = 1 × 18", "18 = 2 × 9", "18 = 3 × 6"], answer: "Factors of 18 are 1, 2, 3, 6, 9 and 18" }
  },
  primeFactors: {
    definition: "Among the factors of a number, those which are prime numbers are known as prime factors. For example, factors of 18 are 1, 2, 3, 6, 9, 18 — of these, 2 and 3 are prime numbers, so 2 and 3 are the prime factors of 18.",
    primeFactorisationDefinition: "A number can be expressed in the form of prime factorisation, in which the number is written as the product of its prime factors. For instance, 18 = 2 × 3 × 3.",
    methods: [
      { methodName: "Repeated Division", steps: ["Perform division repeatedly by dividing with the smallest prime number", "Continue until the quotient is 1", "60 ÷ 2 = 30 ÷ 2 = 15 ÷ 3 = 5 ÷ 5 = 1"], result: "60 = 2 × 2 × 3 × 5" },
      { methodName: "Factor Tree", steps: ["Write the number as the product of two factors continuously", "Continue until all factors at the bottom level are prime factors"], result: "60 = 2 × 2 × 3 × 5" }
    ]
  },
  commonFactors: {
    definition: "Numbers that are factors of two or more numbers at the same time are known as common factors of those numbers.",
    determiningExample: { problem: "Determine whether 8 is a common factor of 16, 32, 48 and 72", steps: ["16 ÷ 8 = 2", "32 ÷ 8 = 4", "48 ÷ 8 = 6", "72 ÷ 8 = 9"], answer: "8 is a common factor of 16, 32, 48 and 72" },
    listingExample: { problem: "List all the common factors of 20, 44, 56 and 64", steps: ["Factors of 20: 1, 2, 4, 5, 10, 20", "Factors of 44: 1, 2, 4, 11, 22, 44", "Factors of 56: 1, 2, 4, 7, 8, 14, 28, 56", "Factors of 64: 1, 2, 4, 8, 16, 32, 64"], answer: "Common factors of 20, 44, 56 and 64 are 1, 2 and 4" }
  },
  hcf: {
    definition: "Among the common factors of a set of numbers, the greatest one is known as the Highest Common Factor (HCF).",
    methodNames: ["Listing the common factors", "Repeated division", "Prime factorisation"],
    methods: [
      { methodName: "Listing the Common Factors", steps: ["Factors of 18: 1, 2, 3, 6, 9, 18", "Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24", "Common factors: 1, 2, 3, 6"], result: "HCF of 18 and 24 is 6" },
      { methodName: "Repeated Division", steps: ["Divide 36, 60, 72 by a common factor repeatedly", "2 | 36, 60, 72 → 18, 30, 36", "2 | 18, 30, 36 → 9, 15, 18", "3 | 9, 15, 18 → 3, 5, 6", "Multiply all the divisors: 2 × 2 × 3"], result: "HCF of 36, 60 and 72 is 12" },
      { methodName: "Prime Factorisation", steps: ["48 = 2 × 2 × 2 × 2 × 3", "64 = 2 × 2 × 2 × 2 × 2 × 2", "80 = 2 × 2 × 2 × 2 × 5", "Multiply all the common prime factors: 2 × 2 × 2 × 2"], result: "HCF of 48, 64 and 80 is 16" }
    ],
    problemSolving: {
      scenario: "The Boy Scouts of a school donated 252 shirts, 180 pairs of trousers and 108 pairs of socks to an orphanage. All items were divided equally into each pack. What was the maximum number of packs prepared?",
      understanding: ["252 shirts, 180 pairs of trousers, 108 pairs of socks were divided equally into each pack", "Find the maximum number of packs that were prepared"],
      devisingPlan: ["Find the HCF of 252, 180 and 108"],
      implementing: ["252 = 2 × 2 × 3 × 3 × 7", "180 = 2 × 2 × 3 × 3 × 5", "108 = 2 × 2 × 3 × 3 × 3", "HCF of 252, 180 and 108 = 2 × 2 × 3 × 3 = 36", "The maximum number of packs prepared would be 36"],
      reflection: "Checking: 252 ÷ 36 = 7, 180 ÷ 36 = 5, 108 ÷ 36 = 3 — all divide exactly, confirming 36 packs works"
    }
  },
  commonMultiples: {
    definition: "Numbers that are multiples of two or more numbers at the same time are known as common multiples of those numbers.",
    determiningExample: { problem: "Determine whether 72 is a common multiple of 8, 9, 18 and 24", steps: ["72 ÷ 8 = 9", "72 ÷ 9 = 8", "72 ÷ 18 = 4", "72 ÷ 24 = 3"], answer: "72 is a common multiple of 8, 9, 18 and 24" },
    listingExample: { problem: "List the first five common multiples of 2, 3 and 4", steps: ["Multiples of 2: 2, 4, 6, 8, 10, 12, 14…", "Multiples of 3: 3, 6, 9, 12, 15…", "Multiples of 4: 4, 8, 12, 16…", "First common multiple of 2, 3 and 4 is 12"], answer: "12, 24, 36, 48, 60" },
    keyInsight: "The first common multiple of two numbers is the key — all other common multiples are multiples of this first one. For example, the first common multiple of 3 and 5 is 15, and all other common multiples of 3 and 5 are multiples of 15."
  },
  lcm: {
    definition: "Among the common multiples of a set of numbers, the least one is known as the Lowest Common Multiple (LCM).",
    methodNames: ["Listing the common multiples", "Repeated division", "Prime factorisation"],
    methods: [
      { methodName: "Listing the Common Multiples", steps: ["Multiples of 2: 2, 4, 6, 8, 10…", "Multiples of 3: 3, 6, 9, 12…", "Choose the lowest common multiple"], result: "LCM of 2 and 3 is 6" },
      { methodName: "Repeated Division", steps: ["Divide the numbers repeatedly by a divisor that can divide completely at least one number", "Numbers that can't be divided are brought down unchanged", "Continue until all quotients become 1", "Multiply all the divisors: 3 × 2 × 3"], result: "LCM of 3, 6 and 9 is 18" },
      { methodName: "Prime Factorisation", steps: ["3 = 3", "8 = 2 × 2 × 2", "12 = 2 × 2 × 3", "Multiply the highest power of each prime factor present: 2 × 2 × 2 × 3"], result: "LCM of 3, 8 and 12 is 24" }
    ],
    problemSolving: {
      scenario: "Canned coffee is sold 6 cans per box and canned tea 9 cans per box. Ainun wants to buy the same number of canned coffee and canned tea for her sister's birthday party. What is the minimum number of boxes of each she needs to buy?",
      understanding: ["Number of cans of coffee = 6 cans per box", "Number of cans of tea = 9 cans per box", "Find the minimum number of boxes of each type needed"],
      devisingPlan: ["Find the LCM of 6 and 9 to determine the same number of cans", "Use division to find the number of boxes of coffee and tea"],
      implementing: ["Multiples of 6: 6, 12, 18, 24, 30…", "Multiples of 9: 9, 18, 27, 36, 45…", "LCM of 6 and 9 = 18", "Number of boxes of canned coffee = 18 ÷ 6 = 3", "Number of boxes of canned tea = 18 ÷ 9 = 2"],
      reflection: "Number of canned coffee = 3 × 6 = 18; number of canned tea = 2 × 9 = 18 — both equal, confirming the answer"
    }
  },
  chapterComparison: {
    factorsOf12: ["1", "2", "3", "4", "6", "12"],
    factorsOf18: ["1", "2", "3", "6", "9", "18"],
    commonFactors1218: ["1", "2", "3", "6"],
    hcf1218: "6",
    multiplesOf6: ["6", "12", "18", "24", "30", "…"],
    multiplesOf8: ["8", "16", "24", "32", "40", "…"],
    commonMultiples68: ["24", "48", "72", "96", "120", "…"],
    lcm68: "24"
  },
  keyExamFacts: [
    "Factors of a number are whole numbers that divide it completely; 1 is a factor of every number",
    "Prime factors are the factors of a number that are also prime numbers",
    "A number can be written as a product of its prime factors (prime factorisation) via repeated division or a factor tree",
    "Common factors are shared factors of two or more numbers; the HCF is the greatest of these",
    "HCF can be found via listing common factors, repeated division, or prime factorisation",
    "Common multiples are shared multiples of two or more numbers; the LCM is the smallest of these",
    "LCM can be found via listing common multiples, repeated division, or prime factorisation",
    "The first common multiple of two numbers determines all subsequent common multiples (they're all multiples of it)"
  ],
  keyTerms: [
    "Factor", "Prime factor", "Prime factorisation", "Factor tree", "Common factor",
    "Highest Common Factor (HCF)", "Multiple", "Common multiple", "Lowest Common Multiple (LCM)",
    "Repeated division"
  ],
  chapterSummary: "Chapter 2 covers factors (definition, listing, prime factors and prime factorisation via repeated division or factor tree), common factors and the Highest Common Factor (HCF) via three methods plus real-world problem-solving, and multiples, common multiples, and the Lowest Common Multiple (LCM) via three methods plus real-world problem-solving."
};

const bm: Mat2Content = {
  hook: {
    title: "Kenapa ini penting",
    body: "Membahagikan sumbangan sama rata kepada bilangan pek maksimum, atau mengetahui bila dua lampu berkelip akan berkelip serentak semula — ini adalah masalah FSTB dan GSTK secara tersirat. Bab ini memberikan anda kaedah sistematik untuk menyelesaikannya, bukan meneka."
  },
  factors: {
    definition: "Faktor sesuatu nombor ialah nombor bulat yang boleh membahagi nombor tersebut secara tepat. 1 ialah faktor bagi semua nombor.",
    determiningExample: { problem: "Tentukan sama ada 12 ialah faktor bagi 36, dan sama ada 9 ialah faktor bagi 30", steps: ["36 ÷ 12 = 3 → 12 ialah faktor bagi 36", "30 tidak boleh dibahagi tepat oleh 9 → 9 bukan faktor bagi 30"], answer: "12 ialah faktor bagi 36; 9 bukan faktor bagi 30" },
    listingExample: { problem: "Senaraikan semua faktor bagi 18", steps: ["18 = 1 × 18", "18 = 2 × 9", "18 = 3 × 6"], answer: "Faktor bagi 18 ialah 1, 2, 3, 6, 9 dan 18" }
  },
  primeFactors: {
    definition: "Antara faktor sesuatu nombor, yang merupakan nombor perdana dikenali sebagai faktor perdana. Contohnya, faktor bagi 18 ialah 1, 2, 3, 6, 9, 18 — daripada ini, 2 dan 3 adalah nombor perdana, maka 2 dan 3 ialah faktor perdana bagi 18.",
    primeFactorisationDefinition: "Sesuatu nombor boleh dinyatakan dalam bentuk pemfaktoran perdana, iaitu nombor tersebut ditulis sebagai hasil darab faktor-faktor perdananya. Contohnya, 18 = 2 × 3 × 3.",
    methods: [
      { methodName: "Pembahagian Berulang", steps: ["Lakukan pembahagian berulang dengan nombor perdana terkecil", "Teruskan sehingga hasil bahagi menjadi 1", "60 ÷ 2 = 30 ÷ 2 = 15 ÷ 3 = 5 ÷ 5 = 1"], result: "60 = 2 × 2 × 3 × 5" },
      { methodName: "Pokok Faktor", steps: ["Tulis nombor sebagai hasil darab dua faktor secara berterusan", "Teruskan sehingga semua faktor di peringkat bawah adalah faktor perdana"], result: "60 = 2 × 2 × 3 × 5" }
    ]
  },
  commonFactors: {
    definition: "Nombor yang merupakan faktor bagi dua atau lebih nombor pada masa yang sama dikenali sebagai faktor sepunya bagi nombor-nombor tersebut.",
    determiningExample: { problem: "Tentukan sama ada 8 ialah faktor sepunya bagi 16, 32, 48 dan 72", steps: ["16 ÷ 8 = 2", "32 ÷ 8 = 4", "48 ÷ 8 = 6", "72 ÷ 8 = 9"], answer: "8 ialah faktor sepunya bagi 16, 32, 48 dan 72" },
    listingExample: { problem: "Senaraikan semua faktor sepunya bagi 20, 44, 56 dan 64", steps: ["Faktor 20: 1, 2, 4, 5, 10, 20", "Faktor 44: 1, 2, 4, 11, 22, 44", "Faktor 56: 1, 2, 4, 7, 8, 14, 28, 56", "Faktor 64: 1, 2, 4, 8, 16, 32, 64"], answer: "Faktor sepunya bagi 20, 44, 56 dan 64 ialah 1, 2 dan 4" }
  },
  hcf: {
    definition: "Antara faktor sepunya bagi sekumpulan nombor, yang terbesar dikenali sebagai Faktor Sepunya Terbesar (FSTB).",
    methodNames: ["Menyenaraikan faktor sepunya", "Pembahagian berulang", "Pemfaktoran perdana"],
    methods: [
      { methodName: "Menyenaraikan Faktor Sepunya", steps: ["Faktor 18: 1, 2, 3, 6, 9, 18", "Faktor 24: 1, 2, 3, 4, 6, 8, 12, 24", "Faktor sepunya: 1, 2, 3, 6"], result: "FSTB bagi 18 dan 24 ialah 6" },
      { methodName: "Pembahagian Berulang", steps: ["Bahagikan 36, 60, 72 dengan faktor sepunya secara berulang", "2 | 36, 60, 72 → 18, 30, 36", "2 | 18, 30, 36 → 9, 15, 18", "3 | 9, 15, 18 → 3, 5, 6", "Darabkan semua pembahagi: 2 × 2 × 3"], result: "FSTB bagi 36, 60 dan 72 ialah 12" },
      { methodName: "Pemfaktoran Perdana", steps: ["48 = 2 × 2 × 2 × 2 × 3", "64 = 2 × 2 × 2 × 2 × 2 × 2", "80 = 2 × 2 × 2 × 2 × 5", "Darabkan semua faktor perdana sepunya: 2 × 2 × 2 × 2"], result: "FSTB bagi 48, 64 dan 80 ialah 16" }
    ],
    problemSolving: {
      scenario: "Pengakap sebuah sekolah menderma 252 baju, 180 pasang seluar dan 108 pasang stoking kepada rumah anak yatim. Semua barangan dibahagikan sama rata dalam setiap pek. Berapakah bilangan maksimum pek yang disediakan?",
      understanding: ["252 baju, 180 pasang seluar, 108 pasang stoking dibahagikan sama rata dalam setiap pek", "Cari bilangan maksimum pek yang disediakan"],
      devisingPlan: ["Cari FSTB bagi 252, 180 dan 108"],
      implementing: ["252 = 2 × 2 × 3 × 3 × 7", "180 = 2 × 2 × 3 × 3 × 5", "108 = 2 × 2 × 3 × 3 × 3", "FSTB bagi 252, 180 dan 108 = 2 × 2 × 3 × 3 = 36", "Bilangan maksimum pek yang disediakan ialah 36"],
      reflection: "Semakan: 252 ÷ 36 = 7, 180 ÷ 36 = 5, 108 ÷ 36 = 3 — semua terbahagi tepat, mengesahkan 36 pek adalah betul"
    }
  },
  commonMultiples: {
    definition: "Nombor yang merupakan gandaan bagi dua atau lebih nombor pada masa yang sama dikenali sebagai gandaan sepunya bagi nombor-nombor tersebut.",
    determiningExample: { problem: "Tentukan sama ada 72 ialah gandaan sepunya bagi 8, 9, 18 dan 24", steps: ["72 ÷ 8 = 9", "72 ÷ 9 = 8", "72 ÷ 18 = 4", "72 ÷ 24 = 3"], answer: "72 ialah gandaan sepunya bagi 8, 9, 18 dan 24" },
    listingExample: { problem: "Senaraikan lima gandaan sepunya pertama bagi 2, 3 dan 4", steps: ["Gandaan 2: 2, 4, 6, 8, 10, 12, 14…", "Gandaan 3: 3, 6, 9, 12, 15…", "Gandaan 4: 4, 8, 12, 16…", "Gandaan sepunya pertama bagi 2, 3 dan 4 ialah 12"], answer: "12, 24, 36, 48, 60" },
    keyInsight: "Gandaan sepunya pertama bagi dua nombor adalah kunci — semua gandaan sepunya lain adalah gandaan bagi gandaan sepunya pertama ini. Contohnya, gandaan sepunya pertama bagi 3 dan 5 ialah 15, dan semua gandaan sepunya lain bagi 3 dan 5 adalah gandaan bagi 15."
  },
  lcm: {
    definition: "Antara gandaan sepunya bagi sekumpulan nombor, yang terkecil dikenali sebagai Gandaan Sepunya Terkecil (GSTK).",
    methodNames: ["Menyenaraikan gandaan sepunya", "Pembahagian berulang", "Pemfaktoran perdana"],
    methods: [
      { methodName: "Menyenaraikan Gandaan Sepunya", steps: ["Gandaan 2: 2, 4, 6, 8, 10…", "Gandaan 3: 3, 6, 9, 12…", "Pilih gandaan sepunya terkecil"], result: "GSTK bagi 2 dan 3 ialah 6" },
      { methodName: "Pembahagian Berulang", steps: ["Bahagikan nombor secara berulang dengan pembahagi yang boleh membahagi sekurang-kurangnya satu nombor secara tepat", "Nombor yang tidak boleh dibahagi dibawa turun tanpa diubah", "Teruskan sehingga semua hasil bahagi menjadi 1", "Darabkan semua pembahagi: 3 × 2 × 3"], result: "GSTK bagi 3, 6 dan 9 ialah 18" },
      { methodName: "Pemfaktoran Perdana", steps: ["3 = 3", "8 = 2 × 2 × 2", "12 = 2 × 2 × 3", "Darabkan kuasa tertinggi setiap faktor perdana yang hadir: 2 × 2 × 2 × 3"], result: "GSTK bagi 3, 8 dan 12 ialah 24" }
    ],
    problemSolving: {
      scenario: "Kopi tin dijual 6 tin sekotak dan teh tin dijual 9 tin sekotak. Ainun ingin membeli bilangan yang sama bagi kopi tin dan teh tin untuk parti hari jadi kakaknya. Berapakah bilangan minimum kotak setiap jenis minuman tin yang perlu dibeli?",
      understanding: ["Bilangan tin kopi = 6 tin sekotak", "Bilangan tin teh = 9 tin sekotak", "Cari bilangan minimum kotak setiap jenis yang diperlukan"],
      devisingPlan: ["Cari GSTK bagi 6 dan 9 untuk menentukan bilangan tin yang sama", "Guna pembahagian untuk cari bilangan kotak kopi dan teh"],
      implementing: ["Gandaan 6: 6, 12, 18, 24, 30…", "Gandaan 9: 9, 18, 27, 36, 45…", "GSTK bagi 6 dan 9 = 18", "Bilangan kotak kopi tin = 18 ÷ 6 = 3", "Bilangan kotak teh tin = 18 ÷ 9 = 2"],
      reflection: "Bilangan kopi tin = 3 × 6 = 18; bilangan teh tin = 2 × 9 = 18 — kedua-duanya sama, mengesahkan jawapan"
    }
  },
  chapterComparison: {
    factorsOf12: ["1", "2", "3", "4", "6", "12"],
    factorsOf18: ["1", "2", "3", "6", "9", "18"],
    commonFactors1218: ["1", "2", "3", "6"],
    hcf1218: "6",
    multiplesOf6: ["6", "12", "18", "24", "30", "…"],
    multiplesOf8: ["8", "16", "24", "32", "40", "…"],
    commonMultiples68: ["24", "48", "72", "96", "120", "…"],
    lcm68: "24"
  },
  keyExamFacts: [
    "Faktor sesuatu nombor ialah nombor bulat yang membahaginya secara tepat; 1 ialah faktor bagi setiap nombor",
    "Faktor perdana ialah faktor sesuatu nombor yang juga merupakan nombor perdana",
    "Sesuatu nombor boleh ditulis sebagai hasil darab faktor perdananya (pemfaktoran perdana) melalui pembahagian berulang atau pokok faktor",
    "Faktor sepunya ialah faktor yang dikongsi oleh dua atau lebih nombor; FSTB ialah yang terbesar",
    "FSTB boleh dicari melalui menyenaraikan faktor sepunya, pembahagian berulang, atau pemfaktoran perdana",
    "Gandaan sepunya ialah gandaan yang dikongsi oleh dua atau lebih nombor; GSTK ialah yang terkecil",
    "GSTK boleh dicari melalui menyenaraikan gandaan sepunya, pembahagian berulang, atau pemfaktoran perdana",
    "Gandaan sepunya pertama bagi dua nombor menentukan semua gandaan sepunya seterusnya (kesemuanya gandaan bagi nombor tersebut)"
  ],
  keyTerms: [
    "Faktor", "Faktor perdana", "Pemfaktoran perdana", "Pokok faktor", "Faktor sepunya",
    "Faktor Sepunya Terbesar (FSTB)", "Gandaan", "Gandaan sepunya", "Gandaan Sepunya Terkecil (GSTK)",
    "Pembahagian berulang"
  ],
  chapterSummary: "Bab 2 merangkumi faktor (definisi, penyenaraian, faktor perdana dan pemfaktoran perdana melalui pembahagian berulang atau pokok faktor), faktor sepunya dan Faktor Sepunya Terbesar (FSTB) melalui tiga kaedah serta penyelesaian masalah dunia sebenar, dan gandaan, gandaan sepunya, serta Gandaan Sepunya Terkecil (GSTK) melalui tiga kaedah serta penyelesaian masalah dunia sebenar."
};

export const mat2Content = { en, bm };
export default mat2Content;
