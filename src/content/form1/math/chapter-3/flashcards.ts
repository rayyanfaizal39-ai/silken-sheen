import type { Flashcard } from "@/data/content";
import { structuredFront, structuredBack, type StructuredFlashcard } from "@/features/flashcards/structuredFlashcard";
type MathFlashcardCategoryId="concepts"|"operations"|"facts"|"practice";
const mathCard=(bmFront:string,bmBack:string,dlpFront:string,dlpBack:string)=>({bm:[bmFront,bmBack] as [string,string],dlp:[dlpFront,dlpBack] as [string,string]});
const LEGACY_C3_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah maksud kuasa dua?",
      "Kuasa dua bermaksud mendarab sesuatu nombor dengan dirinya sendiri.",
      "What does square mean?",
      "Square means multiplying a number by itself.",
    ),
    mathCard("Apakah maksud 4²?", "4² bermaksud 4 x 4.", "What does 4² mean?", "4² means 4 x 4."),
    mathCard(
      "Apakah kaitan kuasa dua dengan segi empat sama?",
      "Jika sisi segi empat sama ialah s, luasnya ialah s².",
      "How is square related to a square shape?",
      "If the side of a square is s, its area is s².",
    ),
    mathCard(
      "Apakah kuasa dua sempurna?",
      "Kuasa dua sempurna ialah nombor yang terhasil daripada kuasa dua nombor bulat.",
      "What is a perfect square?",
      "A perfect square is a number produced by squaring a whole number.",
    ),
    mathCard(
      "Berikan contoh kuasa dua sempurna.",
      "Contohnya 1, 4, 9, 16, 25 dan 36.",
      "Give examples of perfect squares.",
      "Examples include 1, 4, 9, 16, 25 and 36.",
    ),
    mathCard(
      "Bagaimana mengenal pasti kuasa dua sempurna melalui pemfaktoran perdana?",
      "Faktor perdana boleh dikumpulkan dalam dua kumpulan yang sama.",
      "How can you identify a perfect square using prime factorisation?",
      "Its prime factors can be grouped into two identical groups.",
    ),
    mathCard(
      "Adakah 36 kuasa dua sempurna?",
      "Ya, kerana 36 = 6².",
      "Is 36 a perfect square?",
      "Yes, because 36 = 6².",
    ),
    mathCard("Adakah 20 kuasa dua sempurna?", "Tidak.", "Is 20 a perfect square?", "No."),
    mathCard(
      "Apakah maksud punca kuasa dua?",
      "Punca kuasa dua ialah nombor yang didarab dengan dirinya sendiri untuk mendapat nombor asal.",
      "What does square root mean?",
      "A square root is a number that is multiplied by itself to get the original number.",
    ),
    mathCard("Jika 6² = 36, apakah √36?", "√36 = 6.", "If 6² = 36, what is √36?", "√36 = 6."),
    mathCard(
      "Punca kuasa dua bagi luas segi empat sama memberi nilai apa?",
      "Panjang sisi segi empat sama.",
      "The square root of a square's area gives what value?",
      "The side length of the square.",
    ),
    mathCard(
      "Mengapa kuasa dua 1 hingga 20 penting?",
      "Ia membantu mengira dan mengenal pasti kuasa dua sempurna dengan cepat.",
      "Why are squares from 1 to 20 important?",
      "They help calculate and identify perfect squares quickly.",
    ),
    mathCard("Apakah √(49/81)?", "7/9.", "What is √(49/81)?", "7/9."),
    mathCard(
      "Apakah langkah sebelum mencari punca kuasa dua nombor bercampur?",
      "Tukarkan nombor bercampur kepada pecahan tak wajar dahulu.",
      "What should you do before finding the square root of a mixed number?",
      "Convert the mixed number into an improper fraction first.",
    ),
    mathCard("Apakah nilai √a x √a?", "a.", "What is the value of √a x √a?", "a."),
    mathCard("Apakah nilai √a x √b?", "√ab.", "What is the value of √a x √b?", "√ab."),
    mathCard(
      "Apakah maksud kuasa tiga?",
      "Kuasa tiga bermaksud mendarab sesuatu nombor dengan dirinya sendiri sebanyak tiga kali.",
      "What does cube mean?",
      "Cube means multiplying a number by itself three times.",
    ),
    mathCard(
      "Apakah maksud a³?",
      "a³ bermaksud a x a x a.",
      "What does a³ mean?",
      "a³ means a x a x a.",
    ),
    mathCard(
      "Apakah kesilapan biasa bagi 2³?",
      "2³ bukan 2 x 3; 2³ = 2 x 2 x 2.",
      "What is a common mistake for 2³?",
      "2³ is not 2 x 3; 2³ = 2 x 2 x 2.",
    ),
    mathCard(
      "Apakah kaitan kuasa tiga dengan kubus?",
      "Jika sisi kubus ialah s, isipadunya ialah s³.",
      "How is cube related to a cube shape?",
      "If the edge of a cube is s, its volume is s³.",
    ),
    mathCard(
      "Berikan contoh kuasa tiga sempurna.",
      "Contohnya 1, 8, 27, 64, 125 dan 1000.",
      "Give examples of perfect cubes.",
      "Examples include 1, 8, 27, 64, 125 and 1000.",
    ),
    mathCard(
      "Bagaimana mengenal pasti kuasa tiga sempurna melalui pemfaktoran perdana?",
      "Faktor perdana boleh dikumpulkan dalam tiga kumpulan yang sama.",
      "How can you identify a perfect cube using prime factorisation?",
      "Its prime factors can be grouped into three identical groups.",
    ),
    mathCard(
      "Apakah tanda kuasa tiga bagi nombor positif?",
      "Hasilnya positif.",
      "What is the sign of the cube of a positive number?",
      "The result is positive.",
    ),
    mathCard(
      "Apakah tanda kuasa tiga bagi nombor negatif?",
      "Hasilnya negatif.",
      "What is the sign of the cube of a negative number?",
      "The result is negative.",
    ),
    mathCard("Berapakah (-5)³?", "-125.", "What is (-5)³?", "-125."),
    mathCard(
      "Apakah maksud punca kuasa tiga?",
      "Punca kuasa tiga ialah nombor yang dikuasakan tiga untuk mendapat nombor asal.",
      "What does cube root mean?",
      "A cube root is a number that is cubed to get the original number.",
    ),
    mathCard("Jika 2³ = 8, apakah ∛8?", "∛8 = 2.", "If 2³ = 8, what is ∛8?", "∛8 = 2."),
    mathCard(
      "Bolehkah punca kuasa tiga bernilai negatif?",
      "Ya. Contohnya ∛(-8) = -2.",
      "Can a cube root be negative?",
      "Yes. For example, ∛(-8) = -2.",
    ),
    mathCard("Apakah ∛(-8)?", "-2.", "What is ∛(-8)?", "-2."),
    mathCard(
      "Punca kuasa tiga bagi isipadu kubus memberi nilai apa?",
      "Panjang sisi kubus.",
      "The cube root of a cube's volume gives what value?",
      "The edge length of the cube.",
    ),
  ],
  operations: [
    mathCard(
      "Apakah formula kuasa dua?",
      "a² = a x a.",
      "What is the square formula?",
      "a² = a x a.",
    ),
    mathCard(
      "Apakah formula kuasa tiga?",
      "a³ = a x a x a.",
      "What is the cube formula?",
      "a³ = a x a x a.",
    ),
    mathCard(
      "Bagaimana menguji kuasa dua sempurna dengan faktor perdana?",
      "Kumpulkan faktor perdana secara berpasangan.",
      "How do you test a perfect square using prime factors?",
      "Group the prime factors in pairs.",
    ),
    mathCard(
      "Bagaimana menguji kuasa tiga sempurna dengan faktor perdana?",
      "Kumpulkan faktor perdana dalam kumpulan tiga.",
      "How do you test a perfect cube using prime factors?",
      "Group the prime factors in threes.",
    ),
    mathCard(
      "Anggarkan √54.",
      "√54 terletak antara 7 dan 8.",
      "Estimate √54.",
      "√54 lies between 7 and 8.",
    ),
    mathCard(
      "Anggarkan 4.2³.",
      "4.2³ terletak antara 4³ dan 5³.",
      "Estimate 4.2³.",
      "4.2³ lies between 4³ and 5³.",
    ),
    mathCard(
      "Apakah langkah pertama dalam tertib operasi?",
      "Selesaikan kurungan dahulu.",
      "What is the first step in order of operations?",
      "Solve brackets first.",
    ),
    mathCard(
      "Selepas kurungan, apakah operasi yang perlu diselesaikan?",
      "Kuasa, punca kuasa dua dan punca kuasa tiga.",
      "After brackets, which operations should be solved?",
      "Powers, square roots and cube roots.",
    ),
    mathCard(
      "Selepas kuasa dan punca, apakah operasi seterusnya?",
      "Darab dan bahagi dari kiri ke kanan.",
      "After powers and roots, what operations come next?",
      "Multiply and divide from left to right.",
    ),
    mathCard(
      "Apakah operasi terakhir dalam tertib operasi?",
      "Tambah dan tolak dari kiri ke kanan.",
      "What are the final operations in order of operations?",
      "Add and subtract from left to right.",
    ),
    mathCard(
      "Jika diberi luas segi empat sama, operasi apa mencari sisi?",
      "Gunakan punca kuasa dua.",
      "If the area of a square is given, which operation finds the side?",
      "Use square root.",
    ),
    mathCard(
      "Jika diberi isipadu kubus, operasi apa mencari sisi?",
      "Gunakan punca kuasa tiga.",
      "If the volume of a cube is given, which operation finds the edge?",
      "Use cube root.",
    ),
    mathCard("Berapakah √49?", "7.", "What is √49?", "7."),
    mathCard("Berapakah ∛64?", "4.", "What is ∛64?", "4."),
    mathCard("Berapakah ∛(-27)?", "-3.", "What is ∛(-27)?", "-3."),
  ],
  facts: [
    mathCard("1² = ?", "1.", "1² = ?", "1."),
    mathCard("2² = ?", "4.", "2² = ?", "4."),
    mathCard("5² = ?", "25.", "5² = ?", "25."),
    mathCard("6² = ?", "36.", "6² = ?", "36."),
    mathCard("2³ = ?", "8.", "2³ = ?", "8."),
    mathCard("3³ = ?", "27.", "3³ = ?", "27."),
    mathCard("4³ = ?", "64.", "4³ = ?", "64."),
    mathCard("5³ = ?", "125.", "5³ = ?", "125."),
    mathCard("10³ = ?", "1000.", "10³ = ?", "1000."),
    mathCard("√(49/81) = ?", "7/9.", "√(49/81) = ?", "7/9."),
  ],
  practice: [
    mathCard("4² = ?", "16.", "4² = ?", "16."),
    mathCard("√36 = ?", "6.", "√36 = ?", "6."),
    mathCard("2³ = ?", "8.", "2³ = ?", "8."),
    mathCard("∛8 = ?", "2.", "∛8 = ?", "2."),
    mathCard(
      "Jika luas segi empat sama ialah 81 cm², panjang sisinya ialah?",
      "9 cm.",
      "If the area of a square is 81 cm², what is its side length?",
      "9 cm.",
    ),
  ],
};


const legacy=(["concepts","operations","facts","practice"] as const).flatMap(category=>LEGACY_C3_PAIRS[category].map((entry,index)=>({entry,id:(lang:"bm"|"dlp")=>`math-f1-c3-${lang}-${category}-${index+1}`})));
export const C3_CHALLENGES=[
  {
    "subtopic": "3.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A square garden has an area of 196 m².",
      "parts": [
        "Find its side length.",
        "Find its perimeter.",
        "If the side increases by 2 m, find its new area."
      ],
      "answer": [
        [
          "√196 = 14 m."
        ],
        [
          "4 × 14 = 56 m."
        ],
        [
          "16² = 256 m²."
        ]
      ]
    },
    "bm": {
      "prompt": "Sebuah taman segi empat sama mempunyai luas 196 m².",
      "parts": [
        "Cari panjang sisinya.",
        "Cari perimeternya.",
        "Jika sisi bertambah 2 m, cari luas baharu."
      ],
      "answer": [
        [
          "√196 = 14 m."
        ],
        [
          "4 × 14 = 56 m."
        ],
        [
          "16² = 256 m²."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A 12 × 12 array of seats is arranged in a hall.",
      "parts": [
        "Find the total number of seats.",
        "Is the total a perfect square?",
        "If one row is removed, how many seats remain?"
      ],
      "answer": [
        [
          "12² = 144 seats."
        ],
        [
          "Yes, 144 = 12²."
        ],
        [
          "144 − 12 = 132 seats."
        ]
      ]
    },
    "bm": {
      "prompt": "Sebanyak 12 × 12 kerusi disusun di dewan.",
      "parts": [
        "Cari jumlah kerusi.",
        "Adakah jumlah kuasa dua sempurna?",
        "Jika satu baris dibuang, berapa kerusi tinggal?"
      ],
      "answer": [
        [
          "12² = 144 seats."
        ],
        [
          "Yes, 144 = 12²."
        ],
        [
          "144 − 12 = 132 seats."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A square mosaic uses 225 identical tiles.",
      "parts": [
        "Find tiles on each side.",
        "Find tiles along its outer boundary.",
        "If 25 more tiles are added, is the new total a perfect square?"
      ],
      "answer": [
        [
          "√225 = 15."
        ],
        [
          "4 × 15 − 4 = 56."
        ],
        [
          "250 is not a perfect square."
        ]
      ]
    },
    "bm": {
      "prompt": "Mozek segi empat sama menggunakan 225 jubin serupa.",
      "parts": [
        "Cari bilangan jubin setiap sisi.",
        "Cari bilangan jubin pada sempadan luar.",
        "Jika ditambah 25 jubin, adakah jumlah baharu kuasa dua sempurna?"
      ],
      "answer": [
        [
          "√225 = 15."
        ],
        [
          "4 × 15 − 4 = 56."
        ],
        [
          "250 is not a perfect square."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A number N has prime factorisation 2⁴ × 3².",
      "parts": [
        "Find N.",
        "Explain why it is a perfect square.",
        "Find √N."
      ],
      "answer": [
        [
          "16 × 9 = 144."
        ],
        [
          "Every prime exponent is even."
        ],
        [
          "√144 = 12."
        ]
      ]
    },
    "bm": {
      "prompt": "N mempunyai pemfaktoran perdana 2⁴ × 3².",
      "parts": [
        "Cari N.",
        "Terangkan mengapa kuasa dua sempurna.",
        "Cari √N."
      ],
      "answer": [
        [
          "16 × 9 = 144."
        ],
        [
          "Every prime exponent is even."
        ],
        [
          "√144 = 12."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A square playground has perimeter 100 m.",
      "parts": [
        "Find one side.",
        "Find the area.",
        "How much does the area increase if each side becomes 30 m?"
      ],
      "answer": [
        [
          "100 ÷ 4 = 25 m."
        ],
        [
          "25² = 625 m²."
        ],
        [
          "30² − 625 = 275 m²."
        ]
      ]
    },
    "bm": {
      "prompt": "Taman permainan segi empat sama berperimeter 100 m.",
      "parts": [
        "Cari satu sisi.",
        "Cari luas.",
        "Berapa pertambahan luas jika setiap sisi menjadi 30 m?"
      ],
      "answer": [
        [
          "100 ÷ 4 = 25 m."
        ],
        [
          "25² = 625 m²."
        ],
        [
          "30² − 625 = 275 m²."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Adjacent integers",
          "bm": "Integer bersebelahan"
        },
        "min": 7,
        "max": 10,
        "ticks": [
          {
            "value": 7
          },
          {
            "value": 8
          },
          {
            "value": 9
          },
          {
            "value": 10
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Between which consecutive integers is √70?",
      "parts": [
        "Identify squares just below and above 70.",
        "Give bounds for √70.",
        "Is √70 an integer?"
      ],
      "answer": [
        [
          "8² = 64; 9² = 81."
        ],
        [
          "8 < √70 < 9."
        ],
        [
          "No."
        ]
      ]
    },
    "bm": {
      "prompt": "Antara integer berturutan manakah terletaknya √70?",
      "parts": [
        "Kenal pasti kuasa dua tepat bawah dan atas 70.",
        "Beri julat bagi √70.",
        "Adakah √70 integer?"
      ],
      "answer": [
        [
          "8² = 64; 9² = 81."
        ],
        [
          "8 < √70 < 9."
        ],
        [
          "No."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A pupil says (−9)² = −81.",
      "parts": [
        "Is the statement correct?",
        "Calculate (−9)².",
        "Explain the sign of the answer."
      ],
      "answer": [
        [
          "No."
        ],
        [
          "(−9) × (−9) = 81."
        ],
        [
          "Negative times negative is positive."
        ]
      ]
    },
    "bm": {
      "prompt": "Murid menyatakan (−9)² = −81.",
      "parts": [
        "Adakah pernyataan betul?",
        "Hitung (−9)².",
        "Terangkan tanda jawapan."
      ],
      "answer": [
        [
          "No."
        ],
        [
          "(−9) × (−9) = 81."
        ],
        [
          "Negative times negative is positive."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A square board has side length 0.7 m.",
      "parts": [
        "Find its area.",
        "Express the area as a fraction.",
        "Find the perimeter."
      ],
      "answer": [
        [
          "0.7² = 0.49 m²."
        ],
        [
          "49/100 m²."
        ],
        [
          "4 × 0.7 = 2.8 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan segi empat sama bersisi 0.7 m.",
      "parts": [
        "Cari luasnya.",
        "Ungkap luas sebagai pecahan.",
        "Cari perimeter."
      ],
      "answer": [
        [
          "0.7² = 0.49 m²."
        ],
        [
          "49/100 m²."
        ],
        [
          "4 × 0.7 = 2.8 m."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "challenge",
    
    "dlp": {
      "prompt": "A large cube has edge length 6 cm.",
      "parts": [
        "Find its volume.",
        "How many 1 cm³ cubes fit inside?",
        "If each edge doubles, find the new volume."
      ],
      "answer": [
        [
          "6³ = 216 cm³."
        ],
        [
          "216 unit cubes."
        ],
        [
          "12³ = 1728 cm³."
        ]
      ]
    },
    "bm": {
      "prompt": "Kubus besar mempunyai sisi 6 cm.",
      "parts": [
        "Cari isi padunya.",
        "Berapa kubus 1 cm³ di dalamnya?",
        "Jika setiap sisi berganda, cari isi padu baharu."
      ],
      "answer": [
        [
          "6³ = 216 cm³."
        ],
        [
          "216 unit cubes."
        ],
        [
          "12³ = 1728 cm³."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A cube-shaped box has volume 343 cm³.",
      "parts": [
        "Find its edge length.",
        "Calculate its total edge length (12 edges).",
        "Find the volume of a cube with edge 2 cm longer."
      ],
      "answer": [
        [
          "∛343 = 7 cm."
        ],
        [
          "12 × 7 = 84 cm."
        ],
        [
          "9³ = 729 cm³."
        ]
      ]
    },
    "bm": {
      "prompt": "Kotak berbentuk kubus mempunyai isi padu 343 cm³.",
      "parts": [
        "Cari panjang sisinya.",
        "Hitung jumlah panjang 12 rusuk.",
        "Cari isi padu kubus bersisi 2 cm lebih panjang."
      ],
      "answer": [
        [
          "∛343 = 7 cm."
        ],
        [
          "12 × 7 = 84 cm."
        ],
        [
          "9³ = 729 cm³."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A cube of sugar has side length 0.5 cm.",
      "parts": [
        "Find its volume.",
        "Convert 0.125 to a fraction.",
        "Find combined volume of 8 cubes."
      ],
      "answer": [
        [
          "0.5³ = 0.125 cm³."
        ],
        [
          "1/8."
        ],
        [
          "8 × 0.125 = 1 cm³."
        ]
      ]
    },
    "bm": {
      "prompt": "Kiub gula mempunyai sisi 0.5 cm.",
      "parts": [
        "Cari isi padu.",
        "Tukar 0.125 kepada pecahan.",
        "Cari isi padu 8 kiub."
      ],
      "answer": [
        [
          "0.5³ = 0.125 cm³."
        ],
        [
          "1/8."
        ],
        [
          "8 × 0.125 = 1 cm³."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A pupil claims ∛(−125) = 5.",
      "parts": [
        "Is the claim correct?",
        "Find the actual cube root.",
        "Verify by cubing your answer."
      ],
      "answer": [
        [
          "No."
        ],
        [
          "∛(−125) = −5."
        ],
        [
          "(−5)³ = −125."
        ]
      ]
    },
    "bm": {
      "prompt": "Seorang murid mendakwa ∛(−125) = 5.",
      "parts": [
        "Adakah dakwaan betul?",
        "Cari punca kuasa tiga sebenar.",
        "Sahkan dengan mengkuasakan tiga jawapan."
      ],
      "answer": [
        [
          "No."
        ],
        [
          "∛(−125) = −5."
        ],
        [
          "(−5)³ = −125."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A cube-shaped water tank holds 1000 L (1 L = 1000 cm³).",
      "parts": [
        "Convert the capacity to cm³.",
        "Find the side length in cm.",
        "Express the side in metres."
      ],
      "answer": [
        [
          "1000 × 1000 = 1,000,000 cm³."
        ],
        [
          "∛1,000,000 = 100 cm."
        ],
        [
          "1 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Tangki air berbentuk kubus boleh memuatkan 1000 L (1 L = 1000 cm³).",
      "parts": [
        "Tukar kapasiti kepada cm³.",
        "Cari panjang sisi dalam cm.",
        "Ungkap sisi dalam meter."
      ],
      "answer": [
        [
          "1000 × 1000 = 1,000,000 cm³."
        ],
        [
          "∛1,000,000 = 100 cm."
        ],
        [
          "1 m."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Two cubes have edges of 3 cm and 5 cm.",
      "parts": [
        "Find both volumes.",
        "Find the difference in volume.",
        "Is the larger volume twice the smaller?"
      ],
      "answer": [
        [
          "3³ = 27; 5³ = 125 cm³."
        ],
        [
          "125 − 27 = 98 cm³."
        ],
        [
          "No; 125 ÷ 27 ≈ 4.63."
        ]
      ]
    },
    "bm": {
      "prompt": "Dua kubus mempunyai sisi 3 cm dan 5 cm.",
      "parts": [
        "Cari kedua-dua isi padu.",
        "Cari beza isi padu.",
        "Adakah isi padu besar dua kali ganda yang kecil?"
      ],
      "answer": [
        [
          "3³ = 27; 5³ = 125 cm³."
        ],
        [
          "125 − 27 = 98 cm³."
        ],
        [
          "No; 125 ÷ 27 ≈ 4.63."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Determine whether 216 is a perfect cube.",
      "parts": [
        "Write 216 as a product of equal factors.",
        "Find ∛216.",
        "Find the next perfect cube after 216."
      ],
      "answer": [
        [
          "216 = 6 × 6 × 6."
        ],
        [
          "∛216 = 6."
        ],
        [
          "7³ = 343."
        ]
      ]
    },
    "bm": {
      "prompt": "Tentukan sama ada 216 kuasa tiga sempurna.",
      "parts": [
        "Tulis 216 sebagai hasil darab faktor sama.",
        "Cari ∛216.",
        "Cari kuasa tiga sempurna berikutnya selepas 216."
      ],
      "answer": [
        [
          "216 = 6 × 6 × 6."
        ],
        [
          "∛216 = 6."
        ],
        [
          "7³ = 343."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A cube has volume 64 cm³. Its edge is increased by 1 cm.",
      "parts": [
        "Find the original edge length.",
        "Find the new volume.",
        "Find the increase in volume."
      ],
      "answer": [
        [
          "∛64 = 4 cm."
        ],
        [
          "5³ = 125 cm³."
        ],
        [
          "125 − 64 = 61 cm³."
        ]
      ]
    },
    "bm": {
      "prompt": "Kubus berisi padu 64 cm³. Sisinya ditambah 1 cm.",
      "parts": [
        "Cari sisi asal.",
        "Cari isi padu baharu.",
        "Cari pertambahan isi padu."
      ],
      "answer": [
        [
          "∛64 = 4 cm."
        ],
        [
          "5³ = 125 cm³."
        ],
        [
          "125 − 64 = 61 cm³."
        ]
      ]
    }
  }
];
export function buildMathF1C3Flashcards(lang:"bm"|"dlp"):Flashcard[]{
 if(legacy.length!==60||C3_CHALLENGES.length!==16)throw new Error("Form 1 Maths Chapter 3 deck invariant failed");
 return legacy.map(({entry,id},index)=>{
  const mode=index<12?"concept":index<44?"practice":"challenge";
  const challenge=mode==="challenge"?C3_CHALLENGES[index-44]:null;
  const structured:StructuredFlashcard=challenge?{...challenge[lang],visuals:challenge.visuals as StructuredFlashcard["visuals"]}:{prompt:entry[lang][0],answer:[[entry[lang][1]]]};
  return {id:id(lang),subjectId:"math",form:"Form 1",chapter:"Chapter 3",lang,front:structuredFront(structured),back:structuredBack(structured),subtopic:challenge?.subtopic??(index<30?"3.1":"3.2"),reviewMode:mode,structured};
 });
}
