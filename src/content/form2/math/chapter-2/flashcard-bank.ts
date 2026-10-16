import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import type { FlashcardReviewMode } from "@/features/flashcards/structuredFlashcard";

/** Chapter 2: 4 subtopics × (3 concept + 8 practice + 4 challenge) = 60 cards. */
export interface MathF2C2Entry {
  subtopic: string;
  mode: FlashcardReviewMode;
  visuals?: MathQuestionVisual[];
  dlp: { prompt: string; parts?: string[]; answer: string[][] };
  bm: { prompt: string; parts?: string[]; answer: string[][] };
}

export const MATH_F2_C2_BANK: readonly MathF2C2Entry[] = [
  {
    "subtopic": "2.1",
    "mode": "concept",
    "dlp": {
      "prompt": "What does 3(x + 4) mean?",
      "answer": [
        [
          "Multiply both terms by 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah maksud 3(x + 4)?",
      "answer": [
        [
          "Darab kedua-dua sebutan dengan 3."
        ]
      ]
    }
  },
  {
    "subtopic": "2.1",
    "mode": "concept",
    "dlp": {
      "prompt": "Which expression has like terms: 2x + 3x or 2x + 3?",
      "answer": [
        [
          "2x + 3x."
        ]
      ]
    },
    "bm": {
      "prompt": "Yang mana mempunyai sebutan serupa: 2x + 3x atau 2x + 3?",
      "answer": [
        [
          "2x + 3x."
        ]
      ]
    }
  },
  {
    "subtopic": "2.1",
    "mode": "concept",
    "dlp": {
      "prompt": "In −2(x − 5), what happens to −5?",
      "answer": [
        [
          "−2 × −5 = +10."
        ]
      ]
    },
    "bm": {
      "prompt": "Dalam −2(x − 5), apakah hasil darab dengan −5?",
      "answer": [
        [
          "−2 × −5 = +10."
        ]
      ]
    }
  },
  {
    "subtopic": "2.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Expand 4(x + 3).",
      "answer": [
        [
          "4x + 12."
        ]
      ]
    },
    "bm": {
      "prompt": "Kembangkan 4(x + 3).",
      "answer": [
        [
          "4x + 12."
        ]
      ]
    }
  },
  {
    "subtopic": "2.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Expand 5(2x − 1).",
      "answer": [
        [
          "10x − 5."
        ]
      ]
    },
    "bm": {
      "prompt": "Kembangkan 5(2x − 1).",
      "answer": [
        [
          "10x − 5."
        ]
      ]
    }
  },
  {
    "subtopic": "2.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Expand −3(x + 4).",
      "answer": [
        [
          "−3x − 12."
        ]
      ]
    },
    "bm": {
      "prompt": "Kembangkan −3(x + 4).",
      "answer": [
        [
          "−3x − 12."
        ]
      ]
    }
  },
  {
    "subtopic": "2.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Expand 2x(3x + 5).",
      "answer": [
        [
          "6x² + 10x."
        ]
      ]
    },
    "bm": {
      "prompt": "Kembangkan 2x(3x + 5).",
      "answer": [
        [
          "6x² + 10x."
        ]
      ]
    }
  },
  {
    "subtopic": "2.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify 3(x + 2) + 2x.",
      "answer": [
        [
          "3x + 6 + 2x = 5x + 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan 3(x + 2) + 2x.",
      "answer": [
        [
          "3x + 6 + 2x = 5x + 6."
        ]
      ]
    }
  },
  {
    "subtopic": "2.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify 2(3x − 1) − (x + 4).",
      "answer": [
        [
          "6x − 2 − x − 4 = 5x − 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan 2(3x − 1) − (x + 4).",
      "answer": [
        [
          "6x − 2 − x − 4 = 5x − 6."
        ]
      ]
    }
  },
  {
    "subtopic": "2.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Expand (x + 2)(x + 3).",
      "answer": [
        [
          "x² + 5x + 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Kembangkan (x + 2)(x + 3).",
      "answer": [
        [
          "x² + 5x + 6."
        ]
      ]
    }
  },
  {
    "subtopic": "2.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Expand (2x − 3)(x + 4).",
      "answer": [
        [
          "2x² + 5x − 12."
        ]
      ]
    },
    "bm": {
      "prompt": "Kembangkan (2x − 3)(x + 4).",
      "answer": [
        [
          "2x² + 5x − 12."
        ]
      ]
    }
  },
  {
    "subtopic": "2.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rectangular garden has sides (x + 4) m and (x + 2) m.",
      "parts": [
        "Expand its area.",
        "Find it when x = 3.",
        "Explain why x² + 6x + 6 is wrong."
      ],
      "answer": [
        [
          "(x + 4)(x + 2) = x² + 6x + 8."
        ],
        [
          "49 m²."
        ],
        [
          "Constant term is 4 × 2 = 8, not 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Taman segi empat tepat mempunyai sisi (x + 4) m dan (x + 2) m.",
      "parts": [
        "Kembangkan luas.",
        "Cari luas jika x = 3.",
        "Jelaskan ralat x² + 6x + 6."
      ],
      "answer": [
        [
          "x² + 6x + 8."
        ],
        [
          "49 m²."
        ],
        [
          "Sebutan pemalar ialah 4 × 2 = 8."
        ]
      ]
    }
  },
  {
    "subtopic": "2.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A school buys 3 packs of (2x + 5) pencils and 2 packs of (x − 1) pencils.",
      "parts": [
        "Form a total.",
        "Simplify.",
        "Find x = 4."
      ],
      "answer": [
        [
          "3(2x + 5) + 2(x − 1)."
        ],
        [
          "8x + 13."
        ],
        [
          "45 pencils."
        ]
      ]
    },
    "bm": {
      "prompt": "Sekolah membeli 3 pek (2x + 5) pensel dan 2 pek (x − 1) pensel.",
      "parts": [
        "Bina ungkapan.",
        "Ringkaskan.",
        "Cari jika x = 4."
      ],
      "answer": [
        [
          "3(2x + 5) + 2(x − 1)."
        ],
        [
          "8x + 13."
        ],
        [
          "45 pensel."
        ]
      ]
    }
  },
  {
    "subtopic": "2.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A banner has width (x + 5) cm and height (2x − 1) cm.",
      "parts": [
        "Expand the area.",
        "Evaluate x = 6.",
        "Check a claim of 2x² + 9x + 5."
      ],
      "answer": [
        [
          "2x² + 9x − 5."
        ],
        [
          "121 cm²."
        ],
        [
          "Claim is wrong: 5 × (−1) = −5."
        ]
      ]
    },
    "bm": {
      "prompt": "Sepanduk mempunyai lebar (x + 5) cm dan tinggi (2x − 1) cm.",
      "parts": [
        "Kembangkan luas.",
        "Nilai x = 6.",
        "Semak dakwaan 2x² + 9x + 5."
      ],
      "answer": [
        [
          "2x² + 9x − 5."
        ],
        [
          "121 cm²."
        ],
        [
          "Salah kerana 5 × (−1) = −5."
        ]
      ]
    }
  },
  {
    "subtopic": "2.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A hall has x rows with (x + 4) chairs per row, plus 6 spare chairs.",
      "parts": [
        "Write a total.",
        "Expand.",
        "Find x = 8."
      ],
      "answer": [
        [
          "x(x + 4) + 6."
        ],
        [
          "x² + 4x + 6."
        ],
        [
          "102 chairs."
        ]
      ]
    },
    "bm": {
      "prompt": "Dewan mempunyai x baris dengan (x + 4) kerusi setiap baris serta 6 kerusi tambahan.",
      "parts": [
        "Bina ungkapan.",
        "Kembangkan.",
        "Cari x = 8."
      ],
      "answer": [
        [
          "x(x + 4) + 6."
        ],
        [
          "x² + 4x + 6."
        ],
        [
          "102 kerusi."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the HCF of 6x and 9?",
      "answer": [
        [
          "3."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah FSTB bagi 6x dan 9?",
      "answer": [
        [
          "3."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "concept",
    "dlp": {
      "prompt": "Which is a difference of squares: x² − 16 or x² + 16?",
      "answer": [
        [
          "x² − 16."
        ]
      ]
    },
    "bm": {
      "prompt": "Yang mana beza dua kuasa dua: x² − 16 atau x² + 16?",
      "answer": [
        [
          "x² − 16."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What checks a factorisation?",
      "answer": [
        [
          "Expand the brackets again."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagaimana menyemak pemfaktoran?",
      "answer": [
        [
          "Kembangkan semula kurungan."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Factorise 6x + 12.",
      "answer": [
        [
          "6(x + 2)."
        ]
      ]
    },
    "bm": {
      "prompt": "Faktorkan 6x + 12.",
      "answer": [
        [
          "6(x + 2)."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Factorise 8x² − 4x.",
      "answer": [
        [
          "4x(2x − 1)."
        ]
      ]
    },
    "bm": {
      "prompt": "Faktorkan 8x² − 4x.",
      "answer": [
        [
          "4x(2x − 1)."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Factorise x² − 25.",
      "answer": [
        [
          "(x − 5)(x + 5)."
        ]
      ]
    },
    "bm": {
      "prompt": "Faktorkan x² − 25.",
      "answer": [
        [
          "(x − 5)(x + 5)."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Factorise 9x² − 4.",
      "answer": [
        [
          "(3x − 2)(3x + 2)."
        ]
      ]
    },
    "bm": {
      "prompt": "Faktorkan 9x² − 4.",
      "answer": [
        [
          "(3x − 2)(3x + 2)."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Factorise x² + 7x + 12.",
      "answer": [
        [
          "(x + 3)(x + 4)."
        ]
      ]
    },
    "bm": {
      "prompt": "Faktorkan x² + 7x + 12.",
      "answer": [
        [
          "(x + 3)(x + 4)."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Factorise x² − 5x + 6.",
      "answer": [
        [
          "(x − 2)(x − 3)."
        ]
      ]
    },
    "bm": {
      "prompt": "Faktorkan x² − 5x + 6.",
      "answer": [
        [
          "(x − 2)(x − 3)."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Factorise 2x² + 7x + 3.",
      "answer": [
        [
          "(2x + 1)(x + 3)."
        ]
      ]
    },
    "bm": {
      "prompt": "Faktorkan 2x² + 7x + 3.",
      "answer": [
        [
          "(2x + 1)(x + 3)."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Factorise 3x² − 12.",
      "answer": [
        [
          "3(x − 2)(x + 2)."
        ]
      ]
    },
    "bm": {
      "prompt": "Faktorkan 3x² − 12.",
      "answer": [
        [
          "3(x − 2)(x + 2)."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rectangle has area (x² + 7x + 12) m² and length (x + 3) m.",
      "parts": [
        "Factorise area.",
        "Find width.",
        "Evaluate width for x = 5."
      ],
      "answer": [
        [
          "(x + 3)(x + 4)."
        ],
        [
          "x + 4 m."
        ],
        [
          "9 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi empat tepat berluas (x² + 7x + 12) m² dan panjang (x + 3) m.",
      "parts": [
        "Faktorkan luas.",
        "Cari lebar.",
        "Nilai x = 5."
      ],
      "answer": [
        [
          "(x + 3)(x + 4)."
        ],
        [
          "x + 4 m."
        ],
        [
          "9 m."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A tiled floor has area (x² − 16) m² and one side (x + 4) m, x > 4.",
      "parts": [
        "Factorise area.",
        "Find other side.",
        "Find area for x = 7."
      ],
      "answer": [
        [
          "(x − 4)(x + 4)."
        ],
        [
          "x − 4 m."
        ],
        [
          "33 m²."
        ]
      ]
    },
    "bm": {
      "prompt": "Lantai berjubin berluas (x² − 16) m² dan satu sisi (x + 4) m, x > 4.",
      "parts": [
        "Faktorkan.",
        "Cari sisi lain.",
        "Cari luas jika x = 7."
      ],
      "answer": [
        [
          "(x − 4)(x + 4)."
        ],
        [
          "x − 4 m."
        ],
        [
          "33 m²."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A notice board has area (2x² + 7x + 3) cm².",
      "parts": [
        "Factorise.",
        "Identify possible side lengths.",
        "Check x = 2."
      ],
      "answer": [
        [
          "(2x + 1)(x + 3)."
        ],
        [
          "2x + 1 and x + 3 cm."
        ],
        [
          "5 × 5 = 25 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan kenyataan berluas (2x² + 7x + 3) cm².",
      "parts": [
        "Faktorkan.",
        "Nyatakan ukuran sisi.",
        "Semak x = 2."
      ],
      "answer": [
        [
          "(2x + 1)(x + 3)."
        ],
        [
          "2x + 1 dan x + 3 cm."
        ],
        [
          "25 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "2.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Two identical square panels each have area x² cm². A smaller square of area 9 cm² is cut from one panel.",
      "parts": [
        "State remaining area.",
        "Factorise.",
        "Find x = 8."
      ],
      "answer": [
        [
          "x² − 9."
        ],
        [
          "(x − 3)(x + 3)."
        ],
        [
          "55 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Dua panel segi empat sama mempunyai luas x² cm² setiap satu. Segi empat kecil berluas 9 cm² dipotong daripada satu panel.",
      "parts": [
        "Nyatakan baki luas.",
        "Faktorkan.",
        "Cari x = 8."
      ],
      "answer": [
        [
          "x² − 9."
        ],
        [
          "(x − 3)(x + 3)."
        ],
        [
          "55 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What happens when dividing by a fraction?",
      "answer": [
        [
          "Multiply by its reciprocal."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah langkah membahagi dengan pecahan?",
      "answer": [
        [
          "Darab dengan salingan."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "concept",
    "dlp": {
      "prompt": "Can x be cancelled in (x + 2)/x?",
      "answer": [
        [
          "No. x + 2 is a sum, not a factor x."
        ]
      ]
    },
    "bm": {
      "prompt": "Bolehkah x dibatalkan dalam (x + 2)/x?",
      "answer": [
        [
          "Tidak. x + 2 ialah hasil tambah, bukan faktor x."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "concept",
    "dlp": {
      "prompt": "Why must a denominator never equal zero?",
      "answer": [
        [
          "Division by zero is undefined."
        ]
      ]
    },
    "bm": {
      "prompt": "Mengapa penyebut tidak boleh sifar?",
      "answer": [
        [
          "Pembahagian dengan sifar tidak ditakrif."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify (3x/4) × (8/9).",
      "answer": [
        [
          "2x/3."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan (3x/4) × (8/9).",
      "answer": [
        [
          "2x/3."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify (5x/6) × (3/10x), x ≠ 0.",
      "answer": [
        [
          "1/4."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan (5x/6) × (3/10x), x ≠ 0.",
      "answer": [
        [
          "1/4."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify (2x/3) ÷ (4/9), x any real.",
      "answer": [
        [
          "3x/2."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan (2x/3) ÷ (4/9).",
      "answer": [
        [
          "3x/2."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify (x²/6) × (12/x), x ≠ 0.",
      "answer": [
        [
          "2x."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan (x²/6) × (12/x), x ≠ 0.",
      "answer": [
        [
          "2x."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify (x² − 9)/(x + 3), x ≠ −3.",
      "answer": [
        [
          "x − 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan (x² − 9)/(x + 3), x ≠ −3.",
      "answer": [
        [
          "x − 3."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify (2x/5) ÷ (4x²/15), x ≠ 0.",
      "answer": [
        [
          "3/(2x)."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan (2x/5) ÷ (4x²/15), x ≠ 0.",
      "answer": [
        [
          "3/(2x)."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify (x + 2)/4 × 8/(x + 2), x ≠ −2.",
      "answer": [
        [
          "2."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan (x + 2)/4 × 8/(x + 2), x ≠ −2.",
      "answer": [
        [
          "2."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify 6x²/(9x), x ≠ 0.",
      "answer": [
        [
          "2x/3."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan 6x²/(9x), x ≠ 0.",
      "answer": [
        [
          "2x/3."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A ribbon of length (6x²/5) m is cut into (3x/2) equal pieces, x > 0.",
      "parts": [
        "Form length per piece.",
        "Simplify.",
        "Evaluate x = 5."
      ],
      "answer": [
        [
          "(6x²/5) ÷ (3x/2)."
        ],
        [
          "4x/5 m."
        ],
        [
          "4 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Reben panjang (6x²/5) m dipotong kepada (3x/2) bahagian sama, x > 0.",
      "parts": [
        "Bina bahagi.",
        "Ringkaskan.",
        "Nilai x = 5."
      ],
      "answer": [
        [
          "(6x²/5) ÷ (3x/2)."
        ],
        [
          "4x/5 m."
        ],
        [
          "4 m."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A garden of area (x² − 9) m² has length (x + 3) m, x > 3.",
      "parts": [
        "Write width as a fraction.",
        "Simplify.",
        "Find width when x = 8."
      ],
      "answer": [
        [
          "(x² − 9)/(x + 3)."
        ],
        [
          "x − 3 m."
        ],
        [
          "5 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Taman berluas (x² − 9) m² dan panjang (x + 3) m, x > 3.",
      "parts": [
        "Tulis lebar sebagai pecahan.",
        "Ringkaskan.",
        "Cari x = 8."
      ],
      "answer": [
        [
          "(x² − 9)/(x + 3)."
        ],
        [
          "x − 3 m."
        ],
        [
          "5 m."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A printer uses (3x/4) litres of ink per batch and completes (8/3x) batches, x > 0.",
      "parts": [
        "Form product.",
        "Simplify.",
        "Interpret the total."
      ],
      "answer": [
        [
          "(3x/4) × (8/3x)."
        ],
        [
          "2 litres."
        ],
        [
          "Total ink is 2 litres, independent of x."
        ]
      ]
    },
    "bm": {
      "prompt": "Pencetak menggunakan (3x/4) liter dakwat setiap kelompok dan mencetak (8/3x) kelompok, x > 0.",
      "parts": [
        "Bina darab.",
        "Ringkaskan.",
        "Tafsir jumlah."
      ],
      "answer": [
        [
          "(3x/4) × (8/3x)."
        ],
        [
          "2 liter."
        ],
        [
          "Jumlahnya 2 liter, tidak bergantung pada x."
        ]
      ]
    }
  },
  {
    "subtopic": "2.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A student simplifies (x² − 4)/(x − 2) to x² + 2.",
      "parts": [
        "Factorise numerator.",
        "Simplify correctly.",
        "State excluded x."
      ],
      "answer": [
        [
          "(x − 2)(x + 2)."
        ],
        [
          "x + 2."
        ],
        [
          "x ≠ 2."
        ]
      ]
    },
    "bm": {
      "prompt": "Murid meringkaskan (x² − 4)/(x − 2) kepada x² + 2.",
      "parts": [
        "Faktorkan pengangka.",
        "Ringkaskan.",
        "Nyatakan x yang tidak dibenarkan."
      ],
      "answer": [
        [
          "(x − 2)(x + 2)."
        ],
        [
          "x + 2."
        ],
        [
          "x ≠ 2."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "concept",
    "dlp": {
      "prompt": "What denominator is needed for x/3 + x/4?",
      "answer": [
        [
          "12, the LCM of 3 and 4."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah penyebut sepunya bagi x/3 + x/4?",
      "answer": [
        [
          "12, GSTK bagi 3 dan 4."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "concept",
    "dlp": {
      "prompt": "Can denominators be added directly?",
      "answer": [
        [
          "No. Use a common denominator."
        ]
      ]
    },
    "bm": {
      "prompt": "Bolehkah penyebut terus ditambah?",
      "answer": [
        [
          "Tidak. Gunakan penyebut sepunya."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "concept",
    "dlp": {
      "prompt": "Simplify x/5 + 2x/5: what stays the same?",
      "answer": [
        [
          "The denominator, 5."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan x/5 + 2x/5: apa yang kekal?",
      "answer": [
        [
          "Penyebut, iaitu 5."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify x/5 + 2x/5.",
      "answer": [
        [
          "3x/5."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan x/5 + 2x/5.",
      "answer": [
        [
          "3x/5."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify 3x/7 − x/7.",
      "answer": [
        [
          "2x/7."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan 3x/7 − x/7.",
      "answer": [
        [
          "2x/7."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify x/3 + x/4.",
      "answer": [
        [
          "7x/12."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan x/3 + x/4.",
      "answer": [
        [
          "7x/12."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify x/2 − x/5.",
      "answer": [
        [
          "3x/10."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan x/2 − x/5.",
      "answer": [
        [
          "3x/10."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify 2/x + 3/x, x ≠ 0.",
      "answer": [
        [
          "5/x."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan 2/x + 3/x, x ≠ 0.",
      "answer": [
        [
          "5/x."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify 1/x + 1/(2x), x ≠ 0.",
      "answer": [
        [
          "3/(2x)."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan 1/x + 1/(2x), x ≠ 0.",
      "answer": [
        [
          "3/(2x)."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify (x + 1)/4 + (x − 1)/4.",
      "answer": [
        [
          "x/2."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan (x + 1)/4 + (x − 1)/4.",
      "answer": [
        [
          "x/2."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "practice",
    "dlp": {
      "prompt": "Simplify 3/(2x) − 1/x, x ≠ 0.",
      "answer": [
        [
          "1/(2x)."
        ]
      ]
    },
    "bm": {
      "prompt": "Ringkaskan 3/(2x) − 1/x, x ≠ 0.",
      "answer": [
        [
          "1/(2x)."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "challenge",
    "dlp": {
      "prompt": "Two ribbons have lengths x/3 m and x/4 m.",
      "parts": [
        "Find total length.",
        "Simplify.",
        "Find total if x = 12."
      ],
      "answer": [
        [
          "x/3 + x/4."
        ],
        [
          "7x/12 m."
        ],
        [
          "7 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Dua reben panjang x/3 m dan x/4 m.",
      "parts": [
        "Bina jumlah.",
        "Ringkaskan.",
        "Cari jika x = 12."
      ],
      "answer": [
        [
          "x/3 + x/4."
        ],
        [
          "7x/12 m."
        ],
        [
          "7 m."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "challenge",
    "dlp": {
      "prompt": "A tank is filled by x/2 L in the morning and x/3 L in the afternoon, then loses x/6 L.",
      "parts": [
        "Write net gain.",
        "Simplify.",
        "Find x = 18."
      ],
      "answer": [
        [
          "x/2 + x/3 − x/6."
        ],
        [
          "2x/3 L."
        ],
        [
          "12 L."
        ]
      ]
    },
    "bm": {
      "prompt": "Tangki diisi x/2 L pagi, x/3 L petang dan kehilangan x/6 L.",
      "parts": [
        "Tulis pertambahan bersih.",
        "Ringkaskan.",
        "Cari x = 18."
      ],
      "answer": [
        [
          "x/2 + x/3 − x/6."
        ],
        [
          "2x/3 L."
        ],
        [
          "12 L."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "challenge",
    "dlp": {
      "prompt": "A recipe uses (x + 2)/4 kg flour and (x − 2)/6 kg sugar.",
      "parts": [
        "Form total.",
        "Simplify.",
        "Evaluate x = 10."
      ],
      "answer": [
        [
          "(x + 2)/4 + (x − 2)/6."
        ],
        [
          "(5x + 2)/12 kg."
        ],
        [
          "13/3 kg."
        ]
      ]
    },
    "bm": {
      "prompt": "Resipi guna (x + 2)/4 kg tepung dan (x − 2)/6 kg gula.",
      "parts": [
        "Bina jumlah.",
        "Ringkaskan.",
        "Nilai x = 10."
      ],
      "answer": [
        [
          "(x + 2)/4 + (x − 2)/6."
        ],
        [
          "(5x + 2)/12 kg."
        ],
        [
          "13/3 kg."
        ]
      ]
    }
  },
  {
    "subtopic": "2.4",
    "mode": "challenge",
    "dlp": {
      "prompt": "A student writes x/2 + x/3 = 2x/5.",
      "parts": [
        "Identify mistake.",
        "Find common denominator.",
        "Correct the answer."
      ],
      "answer": [
        [
          "Added denominators."
        ],
        [
          "6."
        ],
        [
          "3x/6 + 2x/6 = 5x/6."
        ]
      ]
    },
    "bm": {
      "prompt": "Murid tulis x/2 + x/3 = 2x/5.",
      "parts": [
        "Cari ralat.",
        "Cari penyebut sepunya.",
        "Betulkan jawapan."
      ],
      "answer": [
        [
          "Menambah penyebut."
        ],
        [
          "6."
        ],
        [
          "3x/6 + 2x/6 = 5x/6."
        ]
      ]
    }
  }
];
