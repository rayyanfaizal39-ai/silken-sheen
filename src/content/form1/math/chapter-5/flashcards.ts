import type { Flashcard } from "@/data/content";
import {structuredFront,structuredBack,type StructuredFlashcard} from "@/features/flashcards/structuredFlashcard";
type MathFlashcardCategoryId="concepts"|"operations"|"facts"|"practice";
const mathCard=(bmFront:string,bmBack:string,dlpFront:string,dlpBack:string)=>({bm:[bmFront,bmBack] as [string,string],dlp:[dlpFront,dlpBack] as [string,string]});
const LEGACY_C5_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah maksud algebra?",
      "Algebra ialah cabang matematik yang menggunakan huruf untuk mewakili nombor atau nilai yang tidak diketahui.",
      "What is algebra?",
      "Algebra is a branch of mathematics that uses letters to represent numbers or unknown values.",
    ),
    mathCard(
      "Daripada perkataan apakah istilah 'algebra' berasal?",
      "Daripada perkataan Arab 'al-jabr'.",
      "What word does the term 'algebra' come from?",
      "From the Arabic word 'al-jabr'.",
    ),
    mathCard(
      "Apakah pemboleh ubah?",
      "Huruf atau simbol yang mewakili suatu nilai yang tidak diketahui.",
      "What is a variable?",
      "A letter or symbol that represents an unknown value.",
    ),
    mathCard(
      "Berikan contoh pemboleh ubah.",
      "x, y, n, a.",
      "Give examples of variables.",
      "x, y, n, a.",
    ),
    mathCard(
      "Apakah perbezaan antara nilai tetap dan nilai berubah?",
      "Nilai tetap tidak berubah, manakala nilai berubah boleh berubah mengikut keadaan.",
      "What is the difference between a fixed value and a varied value?",
      "A fixed value does not change, while a varied value can change depending on circumstances.",
    ),
    mathCard(
      "Berikan contoh nilai tetap.",
      "Kadar faedah tahunan.",
      "Give an example of a fixed value.",
      "Annual interest rate.",
    ),
    mathCard(
      "Berikan contoh nilai berubah.",
      "Masa perjalanan ke sekolah setiap hari.",
      "Give an example of a varied value.",
      "Daily travel time to school.",
    ),
    mathCard(
      "Apakah ungkapan algebra?",
      "Gabungan nombor, pemboleh ubah dan operasi seperti tambah, tolak atau darab.",
      "What is an algebraic expression?",
      "A combination of numbers, variables and operations such as addition, subtraction or multiplication.",
    ),
    mathCard(
      "Apakah sebutan algebra?",
      "Nombor, pemboleh ubah, atau hasil darab antara nombor dengan pemboleh ubah.",
      "What is an algebraic term?",
      "A number, a variable, or the product of a number and a variable.",
    ),
    mathCard(
      "Apakah pekali?",
      "Faktor nombor yang mendarab pemboleh ubah dalam sesuatu sebutan.",
      "What is a coefficient?",
      "The numerical factor that multiplies a variable in a term.",
    ),
    mathCard(
      "Apakah sebutan serupa?",
      "Sebutan algebra yang mempunyai pemboleh ubah dan kuasa yang sama.",
      "What are like terms?",
      "Algebraic terms that have the same variables and the same powers.",
    ),
    mathCard(
      "Apakah sebutan tidak serupa?",
      "Sebutan algebra yang mempunyai pemboleh ubah berbeza atau kuasa yang berbeza.",
      "What are unlike terms?",
      "Algebraic terms that have different variables or different powers.",
    ),
    mathCard(
      "Mengapakah xy dan yx dianggap sebutan serupa?",
      "Kerana x × y = y × x, jadi kedua-duanya mewakili hasil darab pemboleh ubah yang sama.",
      "Why are xy and yx considered like terms?",
      "Because x × y = y × x, so both represent the product of the same variables.",
    ),
    mathCard(
      "Mengapakah x dan x² ialah sebutan tidak serupa?",
      "Kerana kuasa pemboleh ubah berbeza, iaitu kuasa 1 berbanding kuasa 2.",
      "Why are x and x² unlike terms?",
      "Because the powers of the variable are different — power 1 compared with power 2.",
    ),
    mathCard(
      "Apakah pekali bagi sebutan y?",
      "1, kerana y bermaksud 1y.",
      "What is the coefficient of the term y?",
      "1, because y means 1y.",
    ),
  ],
  operations: [
    mathCard(
      "Apakah kaedah penggantian?",
      "Kaedah menggantikan pemboleh ubah dengan nilai nombor untuk mencari nilai sesuatu ungkapan.",
      "What is the substitution method?",
      "A method of replacing variables with numerical values to find the value of an expression.",
    ),
    mathCard(
      "Apakah peraturan utama bagi penambahan dan penolakan ungkapan algebra?",
      "Hanya sebutan serupa boleh ditambah atau ditolak antara satu sama lain.",
      "What is the main rule for adding and subtracting algebraic expressions?",
      "Only like terms can be added to or subtracted from each other.",
    ),
    mathCard(
      "Bagaimana cara mempermudah −(a + b)?",
      "−(a + b) = −a − b.",
      "How do you simplify −(a + b)?",
      "−(a + b) = −a − b.",
    ),
    mathCard(
      "Bagaimana cara mempermudah −(a − b)?",
      "−(a − b) = −a + b.",
      "How do you simplify −(a − b)?",
      "−(a − b) = −a + b.",
    ),
    mathCard(
      "Bagaimana cara mempermudah −(−a − b)?",
      "−(−a − b) = a + b.",
      "How do you simplify −(−a − b)?",
      "−(−a − b) = a + b.",
    ),
    mathCard(
      "Apakah peraturan apabila tanda negatif berada di hadapan kurungan?",
      "Setiap sebutan di dalam kurungan didarab dengan tanda negatif itu, jadi tanda setiap sebutan bertukar.",
      "What is the rule when a negative sign is in front of brackets?",
      "Every term inside the brackets is multiplied by that negative sign, so each term's sign changes.",
    ),
    mathCard(
      "Apakah peraturan untuk mendarab sebutan algebra dengan pemboleh ubah yang sama?",
      "Tambahkan kuasa pemboleh ubah tersebut: aᵐ × aⁿ = aᵐ⁺ⁿ.",
      "What is the rule for multiplying algebraic terms with the same variable?",
      "Add the powers of that variable: aᵐ × aⁿ = aᵐ⁺ⁿ.",
    ),
    mathCard(
      "Apakah peraturan untuk membahagi sebutan algebra dengan pemboleh ubah yang sama?",
      "Tolakkan kuasa pemboleh ubah tersebut: aᵐ ÷ aⁿ = aᵐ⁻ⁿ.",
      "What is the rule for dividing algebraic terms with the same variable?",
      "Subtract the powers of that variable: aᵐ ÷ aⁿ = aᵐ⁻ⁿ.",
    ),
    mathCard(
      "Bagaimana menulis pendaraban berulang a × a × a dalam bentuk kuasa?",
      "a³.",
      "How do you write the repeated multiplication a × a × a in power form?",
      "a³.",
    ),
    mathCard(
      "Apakah langkah pertama semasa mendarab 3ab² × 4a³b?",
      "Darabkan pekali kedua-dua sebutan terlebih dahulu: 3 × 4 = 12.",
      "What is the first step when multiplying 3ab² × 4a³b?",
      "Multiply the coefficients of both terms first: 3 × 4 = 12.",
    ),
    mathCard(
      "Apakah langkah pertama semasa membahagi 20m⁴n² ÷ 5m²n³?",
      "Bahagikan pekali kedua-dua sebutan terlebih dahulu: 20 ÷ 5 = 4.",
      "What is the first step when dividing 20m⁴n² ÷ 5m²n³?",
      "Divide the coefficients of both terms first: 20 ÷ 5 = 4.",
    ),
    mathCard(
      "Bagaimana cara mengenal pasti sebutan serupa dalam sesuatu ungkapan?",
      "Cari sebutan yang mempunyai pemboleh ubah yang sama dan kuasa yang sama.",
      "How do you identify like terms in an expression?",
      "Look for terms that have the same variables and the same powers.",
    ),
    mathCard(
      "Apakah yang perlu dilakukan jika kuasa hasil pembahagian menjadi negatif?",
      "Tulis jawapan dalam bentuk pecahan, contohnya n⁻¹ ditulis sebagai 1/n.",
      "What should you do if the power resulting from a division becomes negative?",
      "Write the answer as a fraction, for example n⁻¹ is written as 1/n.",
    ),
    mathCard(
      "Apakah tertib operasi yang perlu diikuti semasa menggantikan nilai ke dalam ungkapan?",
      "Selesaikan pendaraban terlebih dahulu sebelum penambahan dan penolakan.",
      "What order of operations should be followed when substituting values into an expression?",
      "Carry out multiplication first, before addition and subtraction.",
    ),
    mathCard(
      "Apakah kesilapan biasa apabila menambah sebutan 3x dan 2y?",
      "Menulisnya sebagai 5xy, sedangkan x dan y bukan sebutan serupa dan tidak boleh digabungkan menjadi satu sebutan.",
      "What is a common mistake when adding the terms 3x and 2y?",
      "Writing it as 5xy, when x and y are not like terms and cannot be combined into one term.",
    ),
  ],
  facts: [
    mathCard("a × a = ?", "a².", "a × a = ?", "a²."),
    mathCard("a × a × a = ?", "a³.", "a × a × a = ?", "a³."),
    mathCard(
      "Apakah formula bagi −(a + b)?",
      "−a − b.",
      "What is the formula for −(a + b)?",
      "−a − b.",
    ),
    mathCard(
      "Apakah formula bagi −(a − b)?",
      "−a + b.",
      "What is the formula for −(a − b)?",
      "−a + b.",
    ),
    mathCard(
      "Apakah formula bagi −(−a − b)?",
      "a + b.",
      "What is the formula for −(−a − b)?",
      "a + b.",
    ),
    mathCard(
      "Apakah formula hukum penambahan kuasa?",
      "aᵐ × aⁿ = aᵐ⁺ⁿ.",
      "What is the law of adding powers?",
      "aᵐ × aⁿ = aᵐ⁺ⁿ.",
    ),
    mathCard(
      "Apakah formula hukum penolakan kuasa?",
      "aᵐ ÷ aⁿ = aᵐ⁻ⁿ.",
      "What is the law of subtracting powers?",
      "aᵐ ÷ aⁿ = aᵐ⁻ⁿ.",
    ),
    mathCard("Pekali bagi 3x ialah?", "3.", "The coefficient of 3x is?", "3."),
    mathCard("Pekali bagi −7ab ialah?", "−7.", "The coefficient of −7ab is?", "−7."),
    mathCard("Pekali bagi y ialah?", "1.", "The coefficient of y is?", "1."),
    mathCard("Pekali bagi −n ialah?", "−1.", "The coefficient of −n is?", "−1."),
    mathCard(
      "a² dibaca sebagai apa dan bermaksud apa?",
      "Dibaca 'a kuasa dua' dan bermaksud a × a.",
      "How is a² read and what does it mean?",
      "Read as 'a squared' and means a × a.",
    ),
    mathCard(
      "a³ dibaca sebagai apa dan bermaksud apa?",
      "Dibaca 'a kuasa tiga' dan bermaksud a × a × a.",
      "How is a³ read and what does it mean?",
      "Read as 'a cubed' and means a × a × a.",
    ),
    mathCard(
      "Bagaimana (a + b)(a + b)(a + b) ditulis dalam bentuk kuasa?",
      "(a + b)³.",
      "How is (a + b)(a + b)(a + b) written in power form?",
      "(a + b)³.",
    ),
    mathCard("n⁻¹ adalah sama dengan?", "1/n.", "n⁻¹ is equal to?", "1/n."),
  ],
  practice: [
    mathCard("3x + 2x = ?", "5x.", "3x + 2x = ?", "5x."),
    mathCard("7ab − 4ab = ?", "3ab.", "7ab − 4ab = ?", "3ab."),
    mathCard("8x − 5x = ?", "3x.", "8x − 5x = ?", "3x."),
    mathCard("5y + 6y = ?", "11y.", "5y + 6y = ?", "11y."),
    mathCard("Permudahkan −(x + 4).", "−x − 4.", "Simplify −(x + 4).", "−x − 4."),
    mathCard("Permudahkan −(3a − 2b).", "−3a + 2b.", "Simplify −(3a − 2b).", "−3a + 2b."),
    mathCard("Permudahkan 5x − (2x − 3).", "3x + 3.", "Simplify 5x − (2x − 3).", "3x + 3."),
    mathCard("a × a² = ?", "a³.", "a × a² = ?", "a³."),
    mathCard("a⁵ ÷ a² = ?", "a³.", "a⁵ ÷ a² = ?", "a³."),
    mathCard("2a × 3a = ?", "6a².", "2a × 3a = ?", "6a²."),
    mathCard("3ab² × 4a³b = ?", "12a⁴b³.", "3ab² × 4a³b = ?", "12a⁴b³."),
    mathCard("20m⁴n² ÷ 5m²n³ = ?", "4m²/n.", "20m⁴n² ÷ 5m²n³ = ?", "4m²/n."),
    mathCard(
      "Jika x = 3, cari nilai 2x + 1.",
      "2(3) + 1 = 7.",
      "If x = 3, find the value of 2x + 1.",
      "2(3) + 1 = 7.",
    ),
    mathCard(
      "Jika x = 3 dan y = 2, cari nilai 8x − 5y + 7.",
      "8(3) − 5(2) + 7 = 21.",
      "If x = 3 and y = 2, find the value of 8x − 5y + 7.",
      "8(3) − 5(2) + 7 = 21.",
    ),
    mathCard(
      "Tulis ungkapan algebra bagi 'n biji gula-gula tambah 6'.",
      "n + 6.",
      "Write the algebraic expression for 'n sweets plus 6'.",
      "n + 6.",
    ),
  ],
};


const legacy=(["concepts","operations","facts","practice"] as const).flatMap(category=>LEGACY_C5_PAIRS[category].map((entry,index)=>({entry,id:(lang:"bm"|"dlp")=>`math-f1-c5-${lang}-${category}-${index+1}`})));
export const C5_CHALLENGES=[
  {
    "subtopic": "5.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A stationery shop sells pencils at RM2 each and erasers at RM3 each.",
      "parts": [
        "Write the cost of x pencils and y erasers.",
        "Calculate the cost for x = 4 and y = 3.",
        "Find the change from RM25."
      ],
      "answer": [
        [
          "2x + 3y."
        ],
        [
          "2(4) + 3(3) = RM17."
        ],
        [
          "RM25 − RM17 = RM8."
        ]
      ]
    },
    "bm": {
      "prompt": "Kedai alat tulis menjual pensel RM2 sebatang dan pemadam RM3 sebiji.",
      "parts": [
        "Tulis kos x pensel dan y pemadam.",
        "Hitung kos apabila x = 4 dan y = 3.",
        "Cari baki daripada RM25."
      ],
      "answer": [
        [
          "2x + 3y."
        ],
        [
          "2(4) + 3(3) = RM17."
        ],
        [
          "RM25 − RM17 = RM8."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rectangle has length (3x + 2) cm and width (x + 1) cm.",
      "parts": [
        "Write its perimeter as an expression.",
        "Simplify the expression.",
        "Calculate the perimeter when x = 2."
      ],
      "answer": [
        [
          "P = 2(3x + 2) + 2(x + 1)."
        ],
        [
          "P = 8x + 6."
        ],
        [
          "P = 8(2) + 6 = 22 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi empat tepat panjang (3x + 2) cm dan lebar (x + 1) cm.",
      "parts": [
        "Tulis perimeter sebagai ungkapan.",
        "Permudahkan ungkapan.",
        "Hitung perimeter apabila x = 2."
      ],
      "answer": [
        [
          "P = 2(3x + 2) + 2(x + 1)."
        ],
        [
          "P = 8x + 6."
        ],
        [
          "P = 8(2) + 6 = 22 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A pupil writes 4a + 3b = 7ab.",
      "parts": [
        "Explain why this is incorrect.",
        "Simplify 4a + 3a.",
        "Evaluate 4a + 3b for a = 2, b = 5."
      ],
      "answer": [
        [
          "4a and 3b are unlike terms."
        ],
        [
          "7a."
        ],
        [
          "4(2) + 3(5) = 23."
        ]
      ]
    },
    "bm": {
      "prompt": "Murid menulis 4a + 3b = 7ab.",
      "parts": [
        "Terangkan mengapa salah.",
        "Permudahkan 4a + 3a.",
        "Nilaikan 4a + 3b jika a = 2, b = 5."
      ],
      "answer": [
        [
          "4a and 3b are unlike terms."
        ],
        [
          "7a."
        ],
        [
          "4(2) + 3(5) = 23."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A taxi charges RM5 plus RM2 for each kilometre travelled.",
      "parts": [
        "Write the fare for k kilometres.",
        "Find the fare for 8 km.",
        "How much more does a 12 km journey cost than an 8 km journey?"
      ],
      "answer": [
        [
          "5 + 2k."
        ],
        [
          "5 + 2(8) = RM21."
        ],
        [
          "[5 + 2(12)] − 21 = RM8."
        ]
      ]
    },
    "bm": {
      "prompt": "Teksi mengenakan RM5 serta RM2 bagi setiap kilometer.",
      "parts": [
        "Tulis tambang bagi k kilometer.",
        "Cari tambang bagi 8 km.",
        "Berapa tambahan kos perjalanan 12 km berbanding 8 km?"
      ],
      "answer": [
        [
          "5 + 2k."
        ],
        [
          "5 + 2(8) = RM21."
        ],
        [
          "[5 + 2(12)] − 21 = RM8."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Three bags contain x apples each. Another bag contains 5 apples.",
      "parts": [
        "Write the total as an expression.",
        "Find total if x = 7.",
        "How many more apples if each of the three bags gains 2 apples?"
      ],
      "answer": [
        [
          "3x + 5."
        ],
        [
          "3(7) + 5 = 26."
        ],
        [
          "3 × 2 = 6 more apples."
        ]
      ]
    },
    "bm": {
      "prompt": "Tiga beg mengandungi x epal setiap satu. Satu beg lagi mengandungi 5 epal.",
      "parts": [
        "Tulis jumlah sebagai ungkapan.",
        "Cari jumlah jika x = 7.",
        "Berapa tambahan epal jika setiap tiga beg ditambah 2 epal?"
      ],
      "answer": [
        [
          "3x + 5."
        ],
        [
          "3(7) + 5 = 26."
        ],
        [
          "3 × 2 = 6 more apples."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Simplify 3x + 7x − 2x.",
      "parts": [
        "Collect the positive x terms.",
        "Subtract 2x.",
        "Evaluate the result for x = 5."
      ],
      "answer": [
        [
          "3x + 7x = 10x."
        ],
        [
          "10x − 2x = 8x."
        ],
        [
          "8(5) = 40."
        ]
      ]
    },
    "bm": {
      "prompt": "Permudahkan 3x + 7x − 2x.",
      "parts": [
        "Kumpulkan sebutan x positif.",
        "Tolak 2x.",
        "Nilaikan jika x = 5."
      ],
      "answer": [
        [
          "3x + 7x = 10x."
        ],
        [
          "10x − 2x = 8x."
        ],
        [
          "8(5) = 40."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Expand 4(2a + 3) − 5a.",
      "parts": [
        "Expand the bracket.",
        "Collect like terms.",
        "Find its value when a = 2."
      ],
      "answer": [
        [
          "8a + 12 − 5a."
        ],
        [
          "3a + 12."
        ],
        [
          "3(2) + 12 = 18."
        ]
      ]
    },
    "bm": {
      "prompt": "Kembangkan 4(2a + 3) − 5a.",
      "parts": [
        "Kembangkan kurungan.",
        "Kumpulkan sebutan serupa.",
        "Cari nilai apabila a = 2."
      ],
      "answer": [
        [
          "8a + 12 − 5a."
        ],
        [
          "3a + 12."
        ],
        [
          "3(2) + 12 = 18."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A pupil simplifies 2(x + 4) as 2x + 4.",
      "parts": [
        "Identify the mistake.",
        "Write the correct expansion.",
        "Evaluate the expression for x = 3."
      ],
      "answer": [
        [
          "The 2 must multiply both terms."
        ],
        [
          "2x + 8."
        ],
        [
          "2(3) + 8 = 14."
        ]
      ]
    },
    "bm": {
      "prompt": "Murid mempermudah 2(x + 4) sebagai 2x + 4.",
      "parts": [
        "Kenal pasti kesilapan.",
        "Tulis kembangan betul.",
        "Nilaikan jika x = 3."
      ],
      "answer": [
        [
          "The 2 must multiply both terms."
        ],
        [
          "2x + 8."
        ],
        [
          "2(3) + 8 = 14."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Simplify 5p − 2q + 3p + 4q.",
      "parts": [
        "Group like terms.",
        "Simplify.",
        "Evaluate when p = 2 and q = 3."
      ],
      "answer": [
        [
          "(5p + 3p) + (−2q + 4q)."
        ],
        [
          "8p + 2q."
        ],
        [
          "8(2) + 2(3) = 22."
        ]
      ]
    },
    "bm": {
      "prompt": "Permudahkan 5p − 2q + 3p + 4q.",
      "parts": [
        "Kumpulkan sebutan serupa.",
        "Permudahkan.",
        "Nilaikan apabila p = 2 dan q = 3."
      ],
      "answer": [
        [
          "(5p + 3p) + (−2q + 4q)."
        ],
        [
          "8p + 2q."
        ],
        [
          "8(2) + 2(3) = 22."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rectangle has sides (2x + 3) cm and (x + 4) cm.",
      "parts": [
        "Write an expression for its perimeter.",
        "Simplify it.",
        "Calculate perimeter for x = 3."
      ],
      "answer": [
        [
          "2(2x + 3) + 2(x + 4)."
        ],
        [
          "6x + 14."
        ],
        [
          "6(3) + 14 = 32 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi empat tepat mempunyai sisi (2x + 3) cm dan (x + 4) cm.",
      "parts": [
        "Tulis ungkapan perimeter.",
        "Permudahkan.",
        "Hitung perimeter jika x = 3."
      ],
      "answer": [
        [
          "2(2x + 3) + 2(x + 4)."
        ],
        [
          "6x + 14."
        ],
        [
          "6(3) + 14 = 32 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Multiply 3x by (2x + 5).",
      "parts": [
        "Write the distributed products.",
        "Simplify the result.",
        "Evaluate for x = 2."
      ],
      "answer": [
        [
          "(3x)(2x) + (3x)(5)."
        ],
        [
          "6x² + 15x."
        ],
        [
          "6(4) + 15(2) = 54."
        ]
      ]
    },
    "bm": {
      "prompt": "Darabkan 3x dengan (2x + 5).",
      "parts": [
        "Tulis hasil darab bagi setiap sebutan.",
        "Permudahkan hasil.",
        "Nilaikan apabila x = 2."
      ],
      "answer": [
        [
          "(3x)(2x) + (3x)(5)."
        ],
        [
          "6x² + 15x."
        ],
        [
          "6(4) + 15(2) = 54."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "The area of a rectangle is (12x + 18) cm² and its width is 6 cm.",
      "parts": [
        "Write its length as a quotient.",
        "Simplify the length.",
        "Find the length when x = 2."
      ],
      "answer": [
        [
          "(12x + 18) ÷ 6."
        ],
        [
          "2x + 3 cm."
        ],
        [
          "2(2) + 3 = 7 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Luas segi empat tepat (12x + 18) cm² dan lebarnya 6 cm.",
      "parts": [
        "Tulis panjang sebagai hasil bahagi.",
        "Permudahkan panjang.",
        "Cari panjang apabila x = 2."
      ],
      "answer": [
        [
          "(12x + 18) ÷ 6."
        ],
        [
          "2x + 3 cm."
        ],
        [
          "2(2) + 3 = 7 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "Simplify (15a² + 10a) ÷ 5a, where a ≠ 0.",
      "parts": [
        "Divide the first term.",
        "Divide the second term.",
        "Write the simplified expression."
      ],
      "answer": [
        [
          "15a² ÷ 5a = 3a."
        ],
        [
          "10a ÷ 5a = 2."
        ],
        [
          "3a + 2."
        ]
      ]
    },
    "bm": {
      "prompt": "Permudahkan (15a² + 10a) ÷ 5a, dengan a ≠ 0.",
      "parts": [
        "Bahagikan sebutan pertama.",
        "Bahagikan sebutan kedua.",
        "Tulis ungkapan termudah."
      ],
      "answer": [
        [
          "15a² ÷ 5a = 3a."
        ],
        [
          "10a ÷ 5a = 2."
        ],
        [
          "3a + 2."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "The total cost of 4 identical boxes is RM(8x + 20).",
      "parts": [
        "Write the cost of one box.",
        "Simplify.",
        "Find its cost if x = 3."
      ],
      "answer": [
        [
          "(8x + 20) ÷ 4."
        ],
        [
          "2x + 5."
        ],
        [
          "RM(2 × 3 + 5) = RM11."
        ]
      ]
    },
    "bm": {
      "prompt": "Jumlah kos 4 kotak serupa ialah RM(8x + 20).",
      "parts": [
        "Tulis kos sebuah kotak.",
        "Permudahkan.",
        "Cari kos apabila x = 3."
      ],
      "answer": [
        [
          "(8x + 20) ÷ 4."
        ],
        [
          "2x + 5."
        ],
        [
          "RM(2 × 3 + 5) = RM11."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A pupil claims (6x + 9) ÷ 3 = 2x + 9.",
      "parts": [
        "Identify the error.",
        "Give the correct simplified expression.",
        "Evaluate the result at x = 4."
      ],
      "answer": [
        [
          "Both terms must be divided by 3."
        ],
        [
          "2x + 3."
        ],
        [
          "2(4) + 3 = 11."
        ]
      ]
    },
    "bm": {
      "prompt": "Murid mendakwa (6x + 9) ÷ 3 = 2x + 9.",
      "parts": [
        "Kenal pasti kesilapan.",
        "Beri ungkapan termudah yang betul.",
        "Nilaikan apabila x = 4."
      ],
      "answer": [
        [
          "Both terms must be divided by 3."
        ],
        [
          "2x + 3."
        ],
        [
          "2(4) + 3 = 11."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "Simplify 2(3m + 4) + (5m − 1).",
      "parts": [
        "Expand the brackets.",
        "Collect like terms.",
        "Find the result for m = 2."
      ],
      "answer": [
        [
          "6m + 8 + 5m − 1."
        ],
        [
          "11m + 7."
        ],
        [
          "11(2) + 7 = 29."
        ]
      ]
    },
    "bm": {
      "prompt": "Permudahkan 2(3m + 4) + (5m − 1).",
      "parts": [
        "Kembangkan kurungan.",
        "Kumpulkan sebutan serupa.",
        "Cari hasil jika m = 2."
      ],
      "answer": [
        [
          "6m + 8 + 5m − 1."
        ],
        [
          "11m + 7."
        ],
        [
          "11(2) + 7 = 29."
        ]
      ]
    }
  }
];
export function buildMathF1C5Flashcards(lang:"bm"|"dlp"):Flashcard[]{
 if(legacy.length!==60||C5_CHALLENGES.length!==16)throw new Error("Chapter 5 card count invariant failed");
 return legacy.map(({entry,id},index)=>{
   const mode=index<12?"concept":index<44?"practice":"challenge";
   const challenge=mode==="challenge"?C5_CHALLENGES[index-44]:null;
   const structured:StructuredFlashcard=challenge?{...challenge[lang]}:{prompt:entry[lang][0],answer:[[entry[lang][1]]]};
   return {id:id(lang),subjectId:"math",form:"Form 1",chapter:"Chapter 5",lang,front:structuredFront(structured),back:structuredBack(structured),subtopic:challenge?.subtopic??(index<20?"5.1":index<40?"5.2":"5.3"),reviewMode:mode,structured};
 });
}
