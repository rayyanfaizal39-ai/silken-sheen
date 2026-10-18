import type {FlashcardReviewMode} from "@/features/flashcards/structuredFlashcard";
import type {MathQuestionVisual} from "@/features/quiz/visuals/mathQuestionVisual";
export interface Entry {subtopic:"1.1"|"1.2"|"1.3"|"1.4";mode:FlashcardReviewMode;visuals?:MathQuestionVisual[];dlp:{prompt:string;parts?:string[];answer:string[][]};bm:{prompt:string;parts?:string[];answer:string[][]}}
export const MATH_F1_C1_BANK:readonly Entry[] = [
  {
    "subtopic": "1.1",
    "mode": "concept",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Number line",
          "bm": "Garis nombor"
        },
        "min": -4,
        "max": 4,
        "ticks": [
          {
            "value": -4
          },
          {
            "value": -3
          },
          {
            "value": -2
          },
          {
            "value": -1
          },
          {
            "value": 0
          },
          {
            "value": 1
          },
          {
            "value": 2
          },
          {
            "value": 3
          },
          {
            "value": 4
          }
        ],
        "points": []
      }
    ],
    "dlp": {
      "prompt": "Which numbers are integers?",
      "answer": [
        [
          "Positive and negative whole numbers, including zero."
        ]
      ]
    },
    "bm": {
      "prompt": "Nombor manakah integer?",
      "answer": [
        [
          "Nombor bulat positif dan negatif, termasuk sifar."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "concept",
    "dlp": {
      "prompt": "Is zero a positive integer, a negative integer, or neither?",
      "answer": [
        [
          "Neither; zero is an integer but is not positive or negative."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah sifar integer positif, integer negatif, atau bukan kedua-duanya?",
      "answer": [
        [
          "Bukan kedua-duanya; sifar ialah integer tetapi bukan positif atau negatif."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "concept",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Number line",
          "bm": "Garis nombor"
        },
        "min": -5,
        "max": 2,
        "ticks": [
          {
            "value": -5
          },
          {
            "value": -4
          },
          {
            "value": -3
          },
          {
            "value": -2
          },
          {
            "value": -1
          },
          {
            "value": 0
          },
          {
            "value": 1
          },
          {
            "value": 2
          }
        ],
        "points": [
          {
            "value": -4,
            "label": "A"
          },
          {
            "value": -1,
            "label": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "On a number line, which number is greater: −4 or −1?",
      "answer": [
        [
          "−1, because it lies to the right of −4."
        ]
      ]
    },
    "bm": {
      "prompt": "Pada garis nombor, nombor manakah lebih besar: −4 atau −1?",
      "answer": [
        [
          "−1 kerana terletak di kanan −4."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "concept",
    "dlp": {
      "prompt": "What does the absolute value |−7| represent?",
      "answer": [
        [
          "Distance from zero; |−7| = 7."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah maksud nilai mutlak |−7|?",
      "answer": [
        [
          "Jarak dari sifar; |−7| = 7."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "concept",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Number line",
          "bm": "Garis nombor"
        },
        "min": -9,
        "max": 0,
        "ticks": [
          {
            "value": -9
          },
          {
            "value": -8
          },
          {
            "value": -7
          },
          {
            "value": -6
          },
          {
            "value": -5
          },
          {
            "value": -4
          },
          {
            "value": -3
          },
          {
            "value": -2
          },
          {
            "value": -1
          },
          {
            "value": 0
          }
        ],
        "points": [
          {
            "value": -8,
            "label": "A"
          },
          {
            "value": -3,
            "label": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Why is −8 smaller than −3?",
      "answer": [
        [
          "It lies farther left on the number line."
        ]
      ]
    },
    "bm": {
      "prompt": "Mengapakah −8 lebih kecil daripada −3?",
      "answer": [
        [
          "Terletak lebih jauh ke kiri pada garis nombor."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the sign of the product of two negative integers?",
      "answer": [
        [
          "Positive."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah tanda hasil darab dua integer negatif?",
      "answer": [
        [
          "Positif."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What happens when zero is multiplied by any rational number?",
      "answer": [
        [
          "The product is zero."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah hasil apabila sifar didarab dengan nombor nisbah?",
      "answer": [
        [
          "Hasilnya sifar."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "concept",
    "dlp": {
      "prompt": "How can subtraction of a negative number be rewritten?",
      "answer": [
        [
          "Subtracting a negative is adding its positive opposite."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagaimanakah penolakan nombor negatif ditulis semula?",
      "answer": [
        [
          "Menolak nombor negatif sama seperti menambah nombor positifnya."
        ]
      ]
    }
  },
  {
    "subtopic": "1.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What is a rational number?",
      "answer": [
        [
          "A number expressible as a/b with integers a, b and b ≠ 0."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah nombor nisbah?",
      "answer": [
        [
          "Nombor dalam bentuk a/b dengan a, b integer dan b ≠ 0."
        ]
      ]
    }
  },
  {
    "subtopic": "1.3",
    "mode": "concept",
    "dlp": {
      "prompt": "Is 0.25 a rational number? Why?",
      "answer": [
        [
          "Yes; 0.25 = 1/4."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah 0.25 nombor nisbah? Mengapa?",
      "answer": [
        [
          "Ya; 0.25 = 1/4."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "concept",
    "dlp": {
      "prompt": "Why must two fractions have a common denominator before addition?",
      "answer": [
        [
          "Their parts must represent the same-sized units."
        ]
      ]
    },
    "bm": {
      "prompt": "Mengapakah penyebut sepunya diperlukan sebelum menambah pecahan?",
      "answer": [
        [
          "Bahagiannya mesti mewakili unit yang sama saiz."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "concept",
    "dlp": {
      "prompt": "What is a reciprocal?",
      "answer": [
        [
          "For a nonzero a/b, its reciprocal is b/a."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah salingan?",
      "answer": [
        [
          "Bagi a/b bukan sifar, salingannya ialah b/a."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Number line",
          "bm": "Garis nombor"
        },
        "min": -7,
        "max": 3,
        "ticks": [
          {
            "value": -7
          },
          {
            "value": -6
          },
          {
            "value": -5
          },
          {
            "value": -4
          },
          {
            "value": -3
          },
          {
            "value": -2
          },
          {
            "value": -1
          },
          {
            "value": 0
          },
          {
            "value": 1
          },
          {
            "value": 2
          },
          {
            "value": 3
          }
        ],
        "points": [
          {
            "value": -6,
            "label": "A"
          },
          {
            "value": 2,
            "label": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Place −6 and 2 in ascending order.",
      "answer": [
        [
          "−6, 2."
        ]
      ]
    },
    "bm": {
      "prompt": "Susun −6 dan 2 secara menaik.",
      "answer": [
        [
          "−6, 2."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the absolute value of −9.",
      "answer": [
        [
          "|−9| = 9."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari nilai mutlak −9.",
      "answer": [
        [
          "|−9| = 9."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Number line",
          "bm": "Garis nombor"
        },
        "min": -6,
        "max": 2,
        "ticks": [
          {
            "value": -6
          },
          {
            "value": -5
          },
          {
            "value": -4
          },
          {
            "value": -3
          },
          {
            "value": -2
          },
          {
            "value": -1
          },
          {
            "value": 0
          },
          {
            "value": 1
          },
          {
            "value": 2
          }
        ],
        "points": [
          {
            "value": -5,
            "label": "A"
          },
          {
            "value": 1,
            "label": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Which integer lies halfway between −5 and 1?",
      "answer": [
        [
          "(−5 + 1) ÷ 2 = −2."
        ]
      ]
    },
    "bm": {
      "prompt": "Integer manakah di tengah antara −5 dan 1?",
      "answer": [
        [
          "(−5 + 1) ÷ 2 = −2."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "practice",
    "dlp": {
      "prompt": "The temperature is −3°C and drops by 4°C. What is the new temperature?",
      "answer": [
        [
          "−3 − 4 = −7°C."
        ]
      ]
    },
    "bm": {
      "prompt": "Suhu ialah −3°C dan turun 4°C. Berapakah suhu baharu?",
      "answer": [
        [
          "−3 − 4 = −7°C."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Which is smaller, −12 or −8?",
      "answer": [
        [
          "−12."
        ]
      ]
    },
    "bm": {
      "prompt": "Yang manakah lebih kecil, −12 atau −8?",
      "answer": [
        [
          "−12."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Write the opposite of −15.",
      "answer": [
        [
          "15."
        ]
      ]
    },
    "bm": {
      "prompt": "Tulis lawan bagi −15.",
      "answer": [
        [
          "15."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Number line",
          "bm": "Garis nombor"
        },
        "min": -5,
        "max": 6,
        "ticks": [
          {
            "value": -5
          },
          {
            "value": -4
          },
          {
            "value": -3
          },
          {
            "value": -2
          },
          {
            "value": -1
          },
          {
            "value": 0
          },
          {
            "value": 1
          },
          {
            "value": 2
          },
          {
            "value": 3
          },
          {
            "value": 4
          },
          {
            "value": 5
          },
          {
            "value": 6
          }
        ],
        "points": [
          {
            "value": -4,
            "label": "A"
          },
          {
            "value": 5,
            "label": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the distance between −4 and 5 on a number line.",
      "answer": [
        [
          "5 − (−4) = 9 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jarak antara −4 dengan 5 pada garis nombor.",
      "answer": [
        [
          "5 − (−4) = 9 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Number line",
          "bm": "Garis nombor"
        },
        "min": -5,
        "max": 3,
        "ticks": [
          {
            "value": -5
          },
          {
            "value": -4
          },
          {
            "value": -3
          },
          {
            "value": -2
          },
          {
            "value": -1
          },
          {
            "value": 0
          },
          {
            "value": 1
          },
          {
            "value": 2
          },
          {
            "value": 3
          }
        ],
        "points": [
          {
            "value": 2,
            "label": "A"
          },
          {
            "value": -1,
            "label": "B"
          },
          {
            "value": -4,
            "label": "C"
          },
          {
            "value": 0,
            "label": "D"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Arrange 2, −1, −4 and 0 in ascending order.",
      "answer": [
        [
          "−4, −1, 0, 2."
        ]
      ]
    },
    "bm": {
      "prompt": "Susun 2, −1, −4 dan 0 secara menaik.",
      "answer": [
        [
          "−4, −1, 0, 2."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A submarine is 8 m below sea level. Represent its position as an integer.",
      "answer": [
        [
          "−8 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Kapal selam berada 8 m di bawah aras laut. Wakilkan kedudukannya sebagai integer.",
      "answer": [
        [
          "−8 m."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Number line",
          "bm": "Garis nombor"
        },
        "min": -4,
        "max": 5,
        "ticks": [
          {
            "value": -4
          },
          {
            "value": -3
          },
          {
            "value": -2
          },
          {
            "value": -1
          },
          {
            "value": 0
          },
          {
            "value": 1
          },
          {
            "value": 2
          },
          {
            "value": 3
          },
          {
            "value": 4
          },
          {
            "value": 5
          }
        ],
        "points": [
          {
            "value": -2,
            "label": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Which number is 5 units to the right of −2?",
      "answer": [
        [
          "−2 + 5 = 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Nombor manakah 5 unit di kanan −2?",
      "answer": [
        [
          "−2 + 5 = 3."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Calculate −7 + 12.",
      "answer": [
        [
          "5."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung −7 + 12.",
      "answer": [
        [
          "5."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Calculate 6 − (−9).",
      "answer": [
        [
          "15."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung 6 − (−9).",
      "answer": [
        [
          "15."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Find (−4) × (−6).",
      "answer": [
        [
          "24."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari (−4) × (−6).",
      "answer": [
        [
          "24."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Calculate −45 ÷ 5.",
      "answer": [
        [
          "−9."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung −45 ÷ 5.",
      "answer": [
        [
          "−9."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Evaluate −3 × 4 + 7.",
      "answer": [
        [
          "−12 + 7 = −5."
        ]
      ]
    },
    "bm": {
      "prompt": "Nilaikan −3 × 4 + 7.",
      "answer": [
        [
          "−12 + 7 = −5."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Evaluate 18 ÷ (−3) − 2.",
      "answer": [
        [
          "−6 − 2 = −8."
        ]
      ]
    },
    "bm": {
      "prompt": "Nilaikan 18 ÷ (−3) − 2.",
      "answer": [
        [
          "−6 − 2 = −8."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the missing integer: −5 + □ = 4.",
      "answer": [
        [
          "9."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari integer yang hilang: −5 + □ = 4.",
      "answer": [
        [
          "9."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Number line",
          "bm": "Garis nombor"
        },
        "min": -7,
        "max": 3,
        "ticks": [
          {
            "value": -7
          },
          {
            "value": -6
          },
          {
            "value": -5
          },
          {
            "value": -4
          },
          {
            "value": -3
          },
          {
            "value": -2
          },
          {
            "value": -1
          },
          {
            "value": 0
          },
          {
            "value": 1
          },
          {
            "value": 2
          },
          {
            "value": 3
          }
        ],
        "points": [
          {
            "value": -6,
            "label": "A"
          },
          {
            "value": 2,
            "label": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The temperature rises from −6°C to 2°C. Find the increase.",
      "answer": [
        [
          "2 − (−6) = 8°C."
        ]
      ]
    },
    "bm": {
      "prompt": "Suhu naik daripada −6°C kepada 2°C. Cari peningkatan.",
      "answer": [
        [
          "2 − (−6) = 8°C."
        ]
      ]
    }
  },
  {
    "subtopic": "1.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Write −5 as a fraction with denominator 1.",
      "answer": [
        [
          "−5/1."
        ]
      ]
    },
    "bm": {
      "prompt": "Tulis −5 sebagai pecahan berpenyebut 1.",
      "answer": [
        [
          "−5/1."
        ]
      ]
    }
  },
  {
    "subtopic": "1.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Convert 0.75 into a fraction in simplest form.",
      "answer": [
        [
          "75/100 = 3/4."
        ]
      ]
    },
    "bm": {
      "prompt": "Tukar 0.75 kepada pecahan termudah.",
      "answer": [
        [
          "75/100 = 3/4."
        ]
      ]
    }
  },
  {
    "subtopic": "1.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Convert −1.2 to a simplified fraction.",
      "answer": [
        [
          "−12/10 = −6/5."
        ]
      ]
    },
    "bm": {
      "prompt": "Tukar −1.2 kepada pecahan termudah.",
      "answer": [
        [
          "−12/10 = −6/5."
        ]
      ]
    }
  },
  {
    "subtopic": "1.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Which is larger, 2/3 or 3/5?",
      "answer": [
        [
          "2/3 = 10/15 and 3/5 = 9/15; 2/3 is larger."
        ]
      ]
    },
    "bm": {
      "prompt": "Yang manakah lebih besar, 2/3 atau 3/5?",
      "answer": [
        [
          "2/3 = 10/15 dan 3/5 = 9/15; 2/3 lebih besar."
        ]
      ]
    }
  },
  {
    "subtopic": "1.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Arrange −1/2, 0 and 1/4 in ascending order.",
      "answer": [
        [
          "−1/2, 0, 1/4."
        ]
      ]
    },
    "bm": {
      "prompt": "Susun −1/2, 0 dan 1/4 secara menaik.",
      "answer": [
        [
          "−1/2, 0, 1/4."
        ]
      ]
    }
  },
  {
    "subtopic": "1.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Express 3/8 as a decimal.",
      "answer": [
        [
          "0.375."
        ]
      ]
    },
    "bm": {
      "prompt": "Ungkapkan 3/8 sebagai perpuluhan.",
      "answer": [
        [
          "0.375."
        ]
      ]
    }
  },
  {
    "subtopic": "1.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Is 7/0 a rational number?",
      "answer": [
        [
          "No. Division by zero is undefined."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah 7/0 nombor nisbah?",
      "answer": [
        [
          "Tidak. Pembahagian dengan sifar tidak tertakrif."
        ]
      ]
    }
  },
  {
    "subtopic": "1.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Write −0.4 as a simplified fraction.",
      "answer": [
        [
          "−4/10 = −2/5."
        ]
      ]
    },
    "bm": {
      "prompt": "Tulis −0.4 sebagai pecahan termudah.",
      "answer": [
        [
          "−4/10 = −2/5."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Calculate 1/3 + 1/6.",
      "answer": [
        [
          "2/6 + 1/6 = 1/2."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung 1/3 + 1/6.",
      "answer": [
        [
          "2/6 + 1/6 = 1/2."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Evaluate 3/4 − 1/2.",
      "answer": [
        [
          "3/4 − 2/4 = 1/4."
        ]
      ]
    },
    "bm": {
      "prompt": "Nilaikan 3/4 − 1/2.",
      "answer": [
        [
          "3/4 − 2/4 = 1/4."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Calculate (−2/3) × (3/5).",
      "answer": [
        [
          "−6/15 = −2/5."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung (−2/3) × (3/5).",
      "answer": [
        [
          "−6/15 = −2/5."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Evaluate 3/5 ÷ 2/3.",
      "answer": [
        [
          "3/5 × 3/2 = 9/10."
        ]
      ]
    },
    "bm": {
      "prompt": "Nilaikan 3/5 ÷ 2/3.",
      "answer": [
        [
          "3/5 × 3/2 = 9/10."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Calculate 0.6 + 1/5.",
      "answer": [
        [
          "0.6 + 0.2 = 0.8."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung 0.6 + 1/5.",
      "answer": [
        [
          "0.6 + 0.2 = 0.8."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Find 2/3 of 18.",
      "answer": [
        [
          "18 × 2/3 = 12."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari 2/3 daripada 18.",
      "answer": [
        [
          "18 × 2/3 = 12."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Evaluate −1/4 + 3/8.",
      "answer": [
        [
          "−2/8 + 3/8 = 1/8."
        ]
      ]
    },
    "bm": {
      "prompt": "Nilaikan −1/4 + 3/8.",
      "answer": [
        [
          "−2/8 + 3/8 = 1/8."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Calculate (−1.5) ÷ 0.5.",
      "answer": [
        [
          "−3."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung (−1.5) ÷ 0.5.",
      "answer": [
        [
          "−3."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the reciprocal of −4/7.",
      "answer": [
        [
          "−7/4."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari salingan −4/7.",
      "answer": [
        [
          "−7/4."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Evaluate 1 − 5/8.",
      "answer": [
        [
          "8/8 − 5/8 = 3/8."
        ]
      ]
    },
    "bm": {
      "prompt": "Nilaikan 1 − 5/8.",
      "answer": [
        [
          "8/8 − 5/8 = 3/8."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "An elevator starts on floor −3. It rises 7 floors, then descends 2 floors.",
      "parts": [
        "Find the floor after rising.",
        "Find the final floor.",
        "Find the total number of floors moved."
      ],
      "answer": [
        [
          "−3 + 7 = 4."
        ],
        [
          "4 − 2 = 2."
        ],
        [
          "7 + 2 = 9 floors."
        ]
      ]
    },
    "bm": {
      "prompt": "Lif bermula pada aras −3. Lif naik 7 aras, kemudian turun 2 aras.",
      "parts": [
        "Cari aras selepas naik.",
        "Cari aras akhir.",
        "Cari jumlah aras yang dilalui."
      ],
      "answer": [
        [
          "−3 + 7 = 4."
        ],
        [
          "4 − 2 = 2."
        ],
        [
          "7 + 2 = 9 aras."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A diver is at −12 m and swims upwards by 5 m before descending by 4 m.",
      "parts": [
        "Find the depth after rising.",
        "Find the final depth.",
        "How far is the diver below the sea surface?"
      ],
      "answer": [
        [
          "−12 + 5 = −7 m."
        ],
        [
          "−7 − 4 = −11 m."
        ],
        [
          "11 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Penyelam berada pada −12 m, berenang naik 5 m kemudian turun 4 m.",
      "parts": [
        "Cari kedalaman selepas naik.",
        "Cari kedalaman akhir.",
        "Berapakah jarak penyelam di bawah permukaan laut?"
      ],
      "answer": [
        [
          "−12 + 5 = −7 m."
        ],
        [
          "−7 − 4 = −11 m."
        ],
        [
          "11 m."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A football team gains 6 points, loses 9 points, then gains 4 points.",
      "parts": [
        "Find the score change after two events.",
        "Find the final change.",
        "Is the overall change positive or negative?"
      ],
      "answer": [
        [
          "6 − 9 = −3."
        ],
        [
          "−3 + 4 = +1."
        ],
        [
          "Positive by 1 point."
        ]
      ]
    },
    "bm": {
      "prompt": "Pasukan bola sepak memperoleh 6 mata, kehilangan 9 mata, kemudian memperoleh 4 mata.",
      "parts": [
        "Cari perubahan selepas dua peristiwa.",
        "Cari perubahan akhir.",
        "Adakah keseluruhan perubahan positif atau negatif?"
      ],
      "answer": [
        [
          "6 − 9 = −3."
        ],
        [
          "−3 + 4 = +1."
        ],
        [
          "Positif sebanyak 1 mata."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "At dawn the temperature is −5°C. It increases by 8°C and decreases by 6°C.",
      "parts": [
        "Find the highest temperature.",
        "Find the final temperature.",
        "Find the difference between highest and final temperatures."
      ],
      "answer": [
        [
          "−5 + 8 = 3°C."
        ],
        [
          "3 − 6 = −3°C."
        ],
        [
          "3 − (−3) = 6°C."
        ]
      ]
    },
    "bm": {
      "prompt": "Pada subuh suhu ialah −5°C. Suhu meningkat 8°C kemudian menurun 6°C.",
      "parts": [
        "Cari suhu tertinggi.",
        "Cari suhu akhir.",
        "Cari beza suhu tertinggi dan akhir."
      ],
      "answer": [
        [
          "−5 + 8 = 3°C."
        ],
        [
          "3 − 6 = −3°C."
        ],
        [
          "3 − (−3) = 6°C."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A contest awards +5 points for a correct answer and −2 for a wrong answer. Amir gets 6 correct and 3 wrong.",
      "parts": [
        "Find points from correct answers.",
        "Find penalties.",
        "Calculate the final score."
      ],
      "answer": [
        [
          "6 × 5 = 30."
        ],
        [
          "3 × (−2) = −6."
        ],
        [
          "30 − 6 = 24 points."
        ]
      ]
    },
    "bm": {
      "prompt": "Pertandingan memberikan +5 mata bagi jawapan betul dan −2 bagi salah. Amir menjawab 6 betul dan 3 salah.",
      "parts": [
        "Cari mata jawapan betul.",
        "Cari penalti.",
        "Hitung skor akhir."
      ],
      "answer": [
        [
          "6 × 5 = 30."
        ],
        [
          "3 × (−2) = −6."
        ],
        [
          "30 − 6 = 24 mata."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A bank account starts at −RM40. A deposit of RM75 is made, followed by a RM20 withdrawal.",
      "parts": [
        "Find the balance after depositing.",
        "Find the final balance.",
        "Is the account in credit or debt?"
      ],
      "answer": [
        [
          "−40 + 75 = RM35."
        ],
        [
          "35 − 20 = RM15."
        ],
        [
          "Credit of RM15."
        ]
      ]
    },
    "bm": {
      "prompt": "Akaun bank bermula pada −RM40. RM75 dimasukkan, kemudian RM20 dikeluarkan.",
      "parts": [
        "Cari baki selepas simpanan.",
        "Cari baki akhir.",
        "Adakah akaun mempunyai lebihan atau hutang?"
      ],
      "answer": [
        [
          "−40 + 75 = RM35."
        ],
        [
          "35 − 20 = RM15."
        ],
        [
          "Lebihan RM15."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A submarine descends 4 m every minute for 5 minutes from sea level.",
      "parts": [
        "Express one minute's change as an integer.",
        "Find its position after 5 minutes.",
        "How far must it rise to return to sea level?"
      ],
      "answer": [
        [
          "−4 m."
        ],
        [
          "5 × (−4) = −20 m."
        ],
        [
          "20 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Kapal selam turun 4 m setiap minit selama 5 minit dari aras laut.",
      "parts": [
        "Ungkapkan perubahan seminit sebagai integer.",
        "Cari kedudukan selepas 5 minit.",
        "Berapa meter perlu naik untuk kembali ke aras laut?"
      ],
      "answer": [
        [
          "−4 m."
        ],
        [
          "5 × (−4) = −20 m."
        ],
        [
          "20 m."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A shop loses RM12 each day for 4 days, then earns RM70 on the fifth day.",
      "parts": [
        "Find the loss over four days.",
        "Calculate the five-day net result.",
        "Is it a profit or loss?"
      ],
      "answer": [
        [
          "4 × (−12) = −RM48."
        ],
        [
          "−48 + 70 = RM22."
        ],
        [
          "Profit RM22."
        ]
      ]
    },
    "bm": {
      "prompt": "Kedai mengalami kerugian RM12 sehari selama 4 hari, kemudian mendapat RM70 pada hari kelima.",
      "parts": [
        "Cari kerugian empat hari.",
        "Hitung hasil bersih lima hari.",
        "Adakah untung atau rugi?"
      ],
      "answer": [
        [
          "4 × (−12) = −RM48."
        ],
        [
          "−48 + 70 = RM22."
        ],
        [
          "Untung RM22."
        ]
      ]
    }
  },
  {
    "subtopic": "1.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A jug holds 1.5 L of juice and another holds 3/4 L.",
      "parts": [
        "Write 1.5 L as a fraction.",
        "Find the combined volume.",
        "If 1 L is poured out, find the remaining volume."
      ],
      "answer": [
        [
          "3/2 L."
        ],
        [
          "3/2 + 3/4 = 9/4 L."
        ],
        [
          "9/4 − 1 = 5/4 L."
        ]
      ]
    },
    "bm": {
      "prompt": "Jag berisi 1.5 L jus dan sebuah lagi berisi 3/4 L.",
      "parts": [
        "Tulis 1.5 L sebagai pecahan.",
        "Cari jumlah isi padu.",
        "Jika 1 L dituang keluar, cari baki isi padu."
      ],
      "answer": [
        [
          "3/2 L."
        ],
        [
          "3/2 + 3/4 = 9/4 L."
        ],
        [
          "9/4 − 1 = 5/4 L."
        ]
      ]
    }
  },
  {
    "subtopic": "1.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A recipe needs 0.6 kg flour and 1/4 kg sugar.",
      "parts": [
        "Convert 0.6 to a simplified fraction.",
        "Find the total mass.",
        "How much more flour than sugar is used?"
      ],
      "answer": [
        [
          "3/5 kg."
        ],
        [
          "3/5 + 1/4 = 17/20 kg."
        ],
        [
          "3/5 − 1/4 = 7/20 kg."
        ]
      ]
    },
    "bm": {
      "prompt": "Resipi memerlukan 0.6 kg tepung dan 1/4 kg gula.",
      "parts": [
        "Tukar 0.6 kepada pecahan termudah.",
        "Cari jumlah jisim.",
        "Berapa lebih tepung berbanding gula?"
      ],
      "answer": [
        [
          "3/5 kg."
        ],
        [
          "3/5 + 1/4 = 17/20 kg."
        ],
        [
          "3/5 − 1/4 = 7/20 kg."
        ]
      ]
    }
  },
  {
    "subtopic": "1.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "Two runners finish in 0.8 minute and 3/4 minute respectively.",
      "parts": [
        "Convert 0.8 into a fraction.",
        "Determine who is faster.",
        "Find the difference in minutes."
      ],
      "answer": [
        [
          "4/5 minute."
        ],
        [
          "The 3/4-minute runner."
        ],
        [
          "4/5 − 3/4 = 1/20 minute."
        ]
      ]
    },
    "bm": {
      "prompt": "Dua pelari menamatkan larian dalam 0.8 minit dan 3/4 minit.",
      "parts": [
        "Tukar 0.8 kepada pecahan.",
        "Tentukan pelari lebih pantas.",
        "Cari beza dalam minit."
      ],
      "answer": [
        [
          "4/5 minit."
        ],
        [
          "Pelari 3/4 minit."
        ],
        [
          "4/5 − 3/4 = 1/20 minit."
        ]
      ]
    }
  },
  {
    "subtopic": "1.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "An athlete completes 2/5 km and then 0.35 km.",
      "parts": [
        "Convert 2/5 to decimal.",
        "Find total distance.",
        "Find the distance needed to complete 1 km."
      ],
      "answer": [
        [
          "0.4 km."
        ],
        [
          "0.4 + 0.35 = 0.75 km."
        ],
        [
          "1 − 0.75 = 0.25 km."
        ]
      ]
    },
    "bm": {
      "prompt": "Atlet bergerak 2/5 km kemudian 0.35 km.",
      "parts": [
        "Tukar 2/5 kepada perpuluhan.",
        "Cari jumlah jarak.",
        "Cari baki jarak untuk melengkapkan 1 km."
      ],
      "answer": [
        [
          "0.4 km."
        ],
        [
          "0.4 + 0.35 = 0.75 km."
        ],
        [
          "1 − 0.75 = 0.25 km."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "challenge",
    "dlp": {
      "prompt": "A ribbon is 5/6 m long. A piece of 1/4 m is cut off.",
      "parts": [
        "Find the common denominator.",
        "Calculate remaining ribbon.",
        "If another 1/6 m is cut, find the new remaining length."
      ],
      "answer": [
        [
          "12."
        ],
        [
          "10/12 − 3/12 = 7/12 m."
        ],
        [
          "7/12 − 2/12 = 5/12 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Reben panjangnya 5/6 m. Sepotong 1/4 m dipotong.",
      "parts": [
        "Cari penyebut sepunya.",
        "Hitung panjang reben berbaki.",
        "Jika 1/6 m lagi dipotong, cari baki baharu."
      ],
      "answer": [
        [
          "12."
        ],
        [
          "10/12 − 3/12 = 7/12 m."
        ],
        [
          "7/12 − 2/12 = 5/12 m."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "challenge",
    "dlp": {
      "prompt": "A bottle contains 3/4 L of water. Half the water is used.",
      "parts": [
        "Find the amount used.",
        "Find the amount remaining.",
        "How much is needed to refill to 1 L?"
      ],
      "answer": [
        [
          "1/2 × 3/4 = 3/8 L."
        ],
        [
          "3/4 − 3/8 = 3/8 L."
        ],
        [
          "1 − 3/8 = 5/8 L."
        ]
      ]
    },
    "bm": {
      "prompt": "Botol mengandungi 3/4 L air. Separuh air digunakan.",
      "parts": [
        "Cari jumlah air digunakan.",
        "Cari baki air.",
        "Berapa air diperlukan untuk mengisi sehingga 1 L?"
      ],
      "answer": [
        [
          "1/2 × 3/4 = 3/8 L."
        ],
        [
          "3/4 − 3/8 = 3/8 L."
        ],
        [
          "1 − 3/8 = 5/8 L."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "challenge",
    "dlp": {
      "prompt": "A class uses 2/3 of a roll of paper on Monday and 1/6 on Tuesday.",
      "parts": [
        "Find the total fraction used.",
        "Find the fraction remaining.",
        "If the roll is 12 m long, find the length left."
      ],
      "answer": [
        [
          "2/3 + 1/6 = 5/6."
        ],
        [
          "1 − 5/6 = 1/6."
        ],
        [
          "12 × 1/6 = 2 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Kelas menggunakan 2/3 gulung kertas pada Isnin dan 1/6 pada Selasa.",
      "parts": [
        "Cari jumlah pecahan digunakan.",
        "Cari pecahan berbaki.",
        "Jika gulung panjangnya 12 m, cari panjang berbaki."
      ],
      "answer": [
        [
          "2/3 + 1/6 = 5/6."
        ],
        [
          "1 − 5/6 = 1/6."
        ],
        [
          "12 × 1/6 = 2 m."
        ]
      ]
    }
  },
  {
    "subtopic": "1.4",
    "mode": "challenge",
    "dlp": {
      "prompt": "A tank is 7/8 full. Water equal to 3/8 of its capacity is drained.",
      "parts": [
        "Find the fraction remaining.",
        "What fraction is empty?",
        "If capacity is 80 L, find remaining water."
      ],
      "answer": [
        [
          "7/8 − 3/8 = 1/2."
        ],
        [
          "1 − 1/2 = 1/2."
        ],
        [
          "80 × 1/2 = 40 L."
        ]
      ]
    },
    "bm": {
      "prompt": "Tangki berisi 7/8. Air sebanyak 3/8 kapasiti dikeluarkan.",
      "parts": [
        "Cari pecahan berbaki.",
        "Berapa pecahan kosong?",
        "Jika kapasiti 80 L, cari baki air."
      ],
      "answer": [
        [
          "7/8 − 3/8 = 1/2."
        ],
        [
          "1 − 1/2 = 1/2."
        ],
        [
          "80 × 1/2 = 40 L."
        ]
      ]
    }
  }
];
