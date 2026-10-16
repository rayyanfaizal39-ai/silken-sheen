import type { FlashcardReviewMode } from "@/features/flashcards/structuredFlashcard";

/** Chapter 3: 60 paired DLP/BM formula questions. Subtopics remain tagged for coverage. */
export interface MathF2C3Entry {
  subtopic: "3.1" | "3.2" | "3.3";
  mode: FlashcardReviewMode;
  dlp: { prompt: string; answer: string[][] };
  bm: { prompt: string; answer: string[][] };
}
export const MATH_F2_C3_BANK: readonly MathF2C3Entry[] = [
  {
    "subtopic": "3.1",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the subject of A = lw?",
      "answer": [
        [
          "A, because it appears alone on the left."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah perkara rumus A = lw?",
      "answer": [
        [
          "A, kerana A bersendirian di sebelah kiri."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "concept",
    "dlp": {
      "prompt": "What does substituting x = 3 into 2x + 5 mean?",
      "answer": [
        [
          "Replace x with 3 before calculating."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah maksud menggantikan x = 3 dalam 2x + 5?",
      "answer": [
        [
          "Gantikan x dengan 3 sebelum mengira."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "concept",
    "dlp": {
      "prompt": "In v = u + at, what does at mean?",
      "answer": [
        [
          "a multiplied by t."
        ]
      ]
    },
    "bm": {
      "prompt": "Dalam v = u + at, apakah maksud at?",
      "answer": [
        [
          "a didarab dengan t."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "concept",
    "dlp": {
      "prompt": "Why must units be checked when using a formula?",
      "answer": [
        [
          "The units help verify that the answer represents the correct quantity."
        ]
      ]
    },
    "bm": {
      "prompt": "Mengapa unit perlu disemak apabila menggunakan rumus?",
      "answer": [
        [
          "Unit membantu memastikan jawapan mewakili kuantiti yang betul."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the subject of y = 3x − 4?",
      "answer": [
        [
          "y."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah perkara rumus y = 3x − 4?",
      "answer": [
        [
          "y."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "concept",
    "dlp": {
      "prompt": "Which operation reverses multiplication by 5?",
      "answer": [
        [
          "Division by 5."
        ]
      ]
    },
    "bm": {
      "prompt": "Operasi apakah yang menyongsangkan darab dengan 5?",
      "answer": [
        [
          "Bahagi dengan 5."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "concept",
    "dlp": {
      "prompt": "Why do we perform the same operation on both sides of an equation?",
      "answer": [
        [
          "To preserve equality."
        ]
      ]
    },
    "bm": {
      "prompt": "Mengapa operasi yang sama dilakukan pada kedua-dua belah persamaan?",
      "answer": [
        [
          "Untuk mengekalkan kesamaan."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "concept",
    "dlp": {
      "prompt": "To make x the subject of y = 2x + 7, what comes first?",
      "answer": [
        [
          "Subtract 7 from both sides."
        ]
      ]
    },
    "bm": {
      "prompt": "Untuk menjadikan x perkara rumus y = 2x + 7, apakah langkah pertama?",
      "answer": [
        [
          "Tolak 7 pada kedua-dua belah."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "concept",
    "dlp": {
      "prompt": "Which formula finds the area of a rectangle?",
      "answer": [
        [
          "A = lw."
        ]
      ]
    },
    "bm": {
      "prompt": "Rumus manakah digunakan untuk luas segi empat tepat?",
      "answer": [
        [
          "A = lw."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "concept",
    "dlp": {
      "prompt": "In d = st, which variable represents distance?",
      "answer": [
        [
          "d."
        ]
      ]
    },
    "bm": {
      "prompt": "Dalam d = st, pemboleh ubah manakah mewakili jarak?",
      "answer": [
        [
          "d."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What should you do before substituting 150 cm into a formula using metres?",
      "answer": [
        [
          "Convert 150 cm to 1.5 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah langkah sebelum menggantikan 150 cm ke dalam rumus unit meter?",
      "answer": [
        [
          "Tukar 150 cm kepada 1.5 m."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "concept",
    "dlp": {
      "prompt": "How can you check an answer after rearranging a formula?",
      "answer": [
        [
          "Substitute it into the original formula."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagaimanakah menyemak jawapan selepas menukar perkara rumus?",
      "answer": [
        [
          "Gantikan jawapan ke dalam rumus asal."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Calculate A = lw when l = 8 and w = 5.",
      "answer": [
        [
          "A = 8 × 5 = 40."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung A = lw apabila l = 8 dan w = 5.",
      "answer": [
        [
          "A = 8 × 5 = 40."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Find P = 2(l + w) when l = 7 and w = 4.",
      "answer": [
        [
          "P = 2(7 + 4) = 22."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari P = 2(l + w) apabila l = 7 dan w = 4.",
      "answer": [
        [
          "P = 2(7 + 4) = 22."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Evaluate y = 3x + 2 for x = −4.",
      "answer": [
        [
          "y = 3(−4) + 2 = −10."
        ]
      ]
    },
    "bm": {
      "prompt": "Nilai y = 3x + 2 apabila x = −4.",
      "answer": [
        [
          "y = 3(−4) + 2 = −10."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Evaluate s = ut + ½at² when u = 2, a = 4, t = 3.",
      "answer": [
        [
          "s = 2(3) + ½(4)(9) = 24."
        ]
      ]
    },
    "bm": {
      "prompt": "Nilai s = ut + ½at² apabila u = 2, a = 4, t = 3.",
      "answer": [
        [
          "s = 2(3) + ½(4)(9) = 24."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Find C = 2πr for r = 7 and π = 22/7.",
      "answer": [
        [
          "C = 2 × (22/7) × 7 = 44."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari C = 2πr apabila r = 7 dan π = 22/7.",
      "answer": [
        [
          "C = 2 × (22/7) × 7 = 44."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Calculate v = u + at for u = 5, a = 3, t = 4.",
      "answer": [
        [
          "v = 5 + 3(4) = 17."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung v = u + at apabila u = 5, a = 3, t = 4.",
      "answer": [
        [
          "v = 5 + 3(4) = 17."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Find V = lwh when l = 5, w = 3, h = 2.",
      "answer": [
        [
          "V = 5 × 3 × 2 = 30."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari V = lwh apabila l = 5, w = 3, h = 2.",
      "answer": [
        [
          "V = 5 × 3 × 2 = 30."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Evaluate y = x² − 2x when x = −3.",
      "answer": [
        [
          "y = 9 + 6 = 15."
        ]
      ]
    },
    "bm": {
      "prompt": "Nilai y = x² − 2x apabila x = −3.",
      "answer": [
        [
          "y = 9 + 6 = 15."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Calculate F = ma when m = 6 and a = 2.5.",
      "answer": [
        [
          "F = 6 × 2.5 = 15."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung F = ma apabila m = 6 dan a = 2.5.",
      "answer": [
        [
          "F = 6 × 2.5 = 15."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Find T = 3a − 2b when a = 4 and b = −3.",
      "answer": [
        [
          "T = 12 − (−6) = 18."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari T = 3a − 2b apabila a = 4 dan b = −3.",
      "answer": [
        [
          "T = 12 − (−6) = 18."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "practice",
    "dlp": {
      "prompt": "Calculate A = ½bh when b = 12 and h = 9.",
      "answer": [
        [
          "A = ½ × 12 × 9 = 54."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung A = ½bh apabila b = 12 dan h = 9.",
      "answer": [
        [
          "A = ½ × 12 × 9 = 54."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Make x the subject of y = 4x + 3.",
      "answer": [
        [
          "x = (y − 3)/4."
        ]
      ]
    },
    "bm": {
      "prompt": "Jadikan x perkara rumus y = 4x + 3.",
      "answer": [
        [
          "x = (y − 3)/4."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Make a the subject of F = ma.",
      "answer": [
        [
          "a = F/m, m ≠ 0."
        ]
      ]
    },
    "bm": {
      "prompt": "Jadikan a perkara rumus F = ma.",
      "answer": [
        [
          "a = F/m, m ≠ 0."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Make t the subject of d = st.",
      "answer": [
        [
          "t = d/s, s ≠ 0."
        ]
      ]
    },
    "bm": {
      "prompt": "Jadikan t perkara rumus d = st.",
      "answer": [
        [
          "t = d/s, s ≠ 0."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Make w the subject of A = lw.",
      "answer": [
        [
          "w = A/l, l ≠ 0."
        ]
      ]
    },
    "bm": {
      "prompt": "Jadikan w perkara rumus A = lw.",
      "answer": [
        [
          "w = A/l, l ≠ 0."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Make l the subject of P = 2l + 2w.",
      "answer": [
        [
          "l = (P − 2w)/2."
        ]
      ]
    },
    "bm": {
      "prompt": "Jadikan l perkara rumus P = 2l + 2w.",
      "answer": [
        [
          "l = (P − 2w)/2."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Make x the subject of y = 5 − 2x.",
      "answer": [
        [
          "x = (5 − y)/2."
        ]
      ]
    },
    "bm": {
      "prompt": "Jadikan x perkara rumus y = 5 − 2x.",
      "answer": [
        [
          "x = (5 − y)/2."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Make r the subject of C = 2πr.",
      "answer": [
        [
          "r = C/(2π), π ≠ 0."
        ]
      ]
    },
    "bm": {
      "prompt": "Jadikan r perkara rumus C = 2πr.",
      "answer": [
        [
          "r = C/(2π), π ≠ 0."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Make h the subject of V = lwh.",
      "answer": [
        [
          "h = V/(lw), lw ≠ 0."
        ]
      ]
    },
    "bm": {
      "prompt": "Jadikan h perkara rumus V = lwh.",
      "answer": [
        [
          "h = V/(lw), lw ≠ 0."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Make x the subject of p = (x + 3)/5.",
      "answer": [
        [
          "x = 5p − 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Jadikan x perkara rumus p = (x + 3)/5.",
      "answer": [
        [
          "x = 5p − 3."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Make b the subject of A = ½bh.",
      "answer": [
        [
          "b = 2A/h, h ≠ 0."
        ]
      ]
    },
    "bm": {
      "prompt": "Jadikan b perkara rumus A = ½bh.",
      "answer": [
        [
          "b = 2A/h, h ≠ 0."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Make x the subject of y = (2x − 1)/3.",
      "answer": [
        [
          "x = (3y + 1)/2."
        ]
      ]
    },
    "bm": {
      "prompt": "Jadikan x perkara rumus y = (2x − 1)/3.",
      "answer": [
        [
          "x = (3y + 1)/2."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A car travels 180 km in 3 hours. Use s = d/t to find speed.",
      "answer": [
        [
          "s = 180/3 = 60 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Kereta bergerak 180 km dalam 3 jam. Guna s = d/t untuk cari laju.",
      "answer": [
        [
          "s = 180/3 = 60 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find a rectangular field's area using A = lw for l = 18 m and w = 12 m.",
      "answer": [
        [
          "A = 216 m²."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari luas padang menggunakan A = lw jika l = 18 m dan w = 12 m.",
      "answer": [
        [
          "A = 216 m²."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A tank has V = lwh. Find its height if V = 120 m³, l = 5 m, w = 4 m.",
      "answer": [
        [
          "h = 120/(5 × 4) = 6 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Tangki mempunyai V = lwh. Cari tinggi jika V = 120 m³, l = 5 m, w = 4 m.",
      "answer": [
        [
          "h = 120/(5 × 4) = 6 m."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "practice",
    "dlp": {
      "prompt": "For a trip d = st, find distance if s = 70 km/h and t = 2.5 h.",
      "answer": [
        [
          "d = 70 × 2.5 = 175 km."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagi perjalanan d = st, cari jarak jika s = 70 km/j dan t = 2.5 j.",
      "answer": [
        [
          "d = 70 × 2.5 = 175 km."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A runner has v = u + at. Find v if u = 3 m/s, a = 2 m/s², t = 6 s.",
      "answer": [
        [
          "v = 3 + 2(6) = 15 m/s."
        ]
      ]
    },
    "bm": {
      "prompt": "Pelari mempunyai v = u + at. Cari v jika u = 3 m/s, a = 2 m/s², t = 6 s.",
      "answer": [
        [
          "v = 3 + 2(6) = 15 m/s."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the width when a rectangle has area 84 cm² and length 12 cm.",
      "answer": [
        [
          "w = A/l = 84/12 = 7 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari lebar segi empat tepat jika luas 84 cm² dan panjang 12 cm.",
      "answer": [
        [
          "w = A/l = 84/12 = 7 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A rectangle's perimeter is 50 m and width is 9 m. Find length.",
      "answer": [
        [
          "l = P/2 − w = 25 − 9 = 16 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Perimeter segi empat tepat ialah 50 m dan lebar 9 m. Cari panjang.",
      "answer": [
        [
          "l = P/2 − w = 25 − 9 = 16 m."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Use C = 2πr to calculate the radius if C = 44 cm and π = 22/7.",
      "answer": [
        [
          "r = 44/(2 × 22/7) = 7 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Guna C = 2πr untuk mencari jejari jika C = 44 cm dan π = 22/7.",
      "answer": [
        [
          "r = 44/(2 × 22/7) = 7 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A triangle has area 48 cm² and base 12 cm. Use A = ½bh to find height.",
      "answer": [
        [
          "h = 2A/b = 96/12 = 8 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga berluas 48 cm² dan tapak 12 cm. Guna A = ½bh untuk tinggi.",
      "answer": [
        [
          "h = 2A/b = 96/12 = 8 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A machine does work W = Ft. Find W for F = 15 N and t = 8 m.",
      "answer": [
        [
          "W = 15 × 8 = 120 J."
        ]
      ]
    },
    "bm": {
      "prompt": "Mesin melakukan kerja W = Ft. Cari W apabila F = 15 N dan t = 8 m.",
      "answer": [
        [
          "W = 15 × 8 = 120 J."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A delivery fee is C = 6 + 2d. Find C for d = 9 km.",
      "answer": [
        [
          "C = 6 + 18 = RM24."
        ]
      ]
    },
    "bm": {
      "prompt": "Bayaran penghantaran C = 6 + 2d. Cari C apabila d = 9 km.",
      "answer": [
        [
          "C = 6 + 18 = RM24."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rectangle's length is 2x + 3 cm and width x − 1 cm. Find its area if x = 5.",
      "answer": [
        [
          "Length = 13 cm; width = 4 cm; area = 52 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Panjang segi empat tepat 2x + 3 cm dan lebar x − 1 cm. Cari luas jika x = 5.",
      "answer": [
        [
          "Panjang = 13 cm; lebar = 4 cm; luas = 52 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A cyclist's distance is d = vt. Find distance for v = 12 km/h and t = 45 minutes.",
      "answer": [
        [
          "t = 0.75 h; d = 12 × 0.75 = 9 km."
        ]
      ]
    },
    "bm": {
      "prompt": "Jarak penunggang basikal d = vt. Cari jarak jika v = 12 km/j dan t = 45 minit.",
      "answer": [
        [
          "t = 0.75 j; d = 12 × 0.75 = 9 km."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "The perimeter of a rectangle is P = 2l + 2w. Find P for l = 3x and w = x + 2 when x = 4.",
      "answer": [
        [
          "l = 12; w = 6; P = 36 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Perimeter segi empat tepat P = 2l + 2w. Cari P jika l = 3x dan w = x + 2 apabila x = 4.",
      "answer": [
        [
          "l = 12; w = 6; P = 36 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A triangle has b = 2x cm and h = x + 1 cm. Use A = ½bh to find area for x = 6.",
      "answer": [
        [
          "b = 12, h = 7; A = 42 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga mempunyai b = 2x cm dan h = x + 1 cm. Guna A = ½bh untuk cari luas jika x = 6.",
      "answer": [
        [
          "b = 12, h = 7; A = 42 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "3.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A car starts at 8 m/s, accelerates at 3 m/s² for 7 seconds. Use v = u + at. A pupil claims v = 29 m/s. Check.",
      "answer": [
        [
          "v = 8 + 3(7) = 29 m/s, so the pupil is correct."
        ]
      ]
    },
    "bm": {
      "prompt": "Kereta bermula 8 m/s dan memecut 3 m/s² selama 7 saat. Guna v = u + at. Murid mendakwa v = 29 m/s. Semak.",
      "answer": [
        [
          "v = 8 + 3(7) = 29 m/s; murid betul."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "The perimeter is P = 2(l + w). Make w the subject and find w when P = 46 cm and l = 15 cm.",
      "answer": [
        [
          "w = P/2 − l = 23 − 15 = 8 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Perimeter ialah P = 2(l + w). Jadikan w perkara rumus dan cari w jika P = 46 cm, l = 15 cm.",
      "answer": [
        [
          "w = P/2 − l = 23 − 15 = 8 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "For y = 4x − 7, make x the subject and find x when y = 21.",
      "answer": [
        [
          "x = (y + 7)/4 = 28/4 = 7."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagi y = 4x − 7, jadikan x perkara rumus dan cari x apabila y = 21.",
      "answer": [
        [
          "x = (y + 7)/4 = 28/4 = 7."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A tank's volume is V = lwh. Make l the subject; find l if V = 180, w = 6, h = 5.",
      "answer": [
        [
          "l = V/(wh) = 180/30 = 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Isi padu tangki V = lwh. Jadikan l perkara rumus; cari l jika V = 180, w = 6, h = 5.",
      "answer": [
        [
          "l = V/(wh) = 180/30 = 6."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A formula is T = (3a + 5)/2. Make a the subject and evaluate when T = 13.",
      "answer": [
        [
          "2T = 3a + 5; a = (2T − 5)/3 = 7."
        ]
      ]
    },
    "bm": {
      "prompt": "Rumus T = (3a + 5)/2. Jadikan a perkara rumus dan nilai apabila T = 13.",
      "answer": [
        [
          "2T = 3a + 5; a = (2T − 5)/3 = 7."
        ]
      ]
    }
  },
  {
    "subtopic": "3.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A pupil rearranges F = ma as m = a/F. Identify the error and find m for F = 45, a = 9.",
      "answer": [
        [
          "Correct formula: m = F/a = 45/9 = 5."
        ]
      ]
    },
    "bm": {
      "prompt": "Murid menukar F = ma kepada m = a/F. Cari ralat dan m jika F = 45, a = 9.",
      "answer": [
        [
          "Rumus betul: m = F/a = 45/9 = 5."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A school's rectangular hall has area 240 m² and width 12 m. Make l the subject of A = lw and find l.",
      "answer": [
        [
          "l = A/w = 240/12 = 20 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Dewan sekolah berluas 240 m² dan lebar 12 m. Jadikan l perkara rumus A = lw dan cari l.",
      "answer": [
        [
          "l = A/w = 240/12 = 20 m."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A bus travels 150 km in 2 h 30 min. Using v = d/t, calculate its average speed.",
      "answer": [
        [
          "t = 2.5 h; v = 150/2.5 = 60 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Bas bergerak 150 km dalam 2 jam 30 minit. Guna v = d/t untuk laju purata.",
      "answer": [
        [
          "t = 2.5 j; v = 150/2.5 = 60 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A square room has side x metres. Its area is 81 m². Use A = x² to find positive x and its perimeter.",
      "answer": [
        [
          "x = 9 m; perimeter = 4 × 9 = 36 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Bilik segi empat sama bersisi x meter dan berluas 81 m². Guna A = x² untuk cari x positif dan perimeter.",
      "answer": [
        [
          "x = 9 m; perimeter = 36 m."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A phone plan costs C = 20 + 0.5m ringgit, where m is minutes. Find m if C = RM55.",
      "answer": [
        [
          "55 = 20 + 0.5m; m = 70 minutes."
        ]
      ]
    },
    "bm": {
      "prompt": "Pelan telefon berharga C = 20 + 0.5m ringgit dengan m minit. Cari m jika C = RM55.",
      "answer": [
        [
          "55 = 20 + 0.5m; m = 70 minit."
        ]
      ]
    }
  },
  {
    "subtopic": "3.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A recipe needs 3x + 2 grams of sugar for x portions. For 6 portions, find sugar used; check a claim of 18 g.",
      "answer": [
        [
          "3(6) + 2 = 20 g; claim is 2 g too low."
        ]
      ]
    },
    "bm": {
      "prompt": "Resipi memerlukan 3x + 2 gram gula bagi x hidangan. Untuk 6 hidangan, cari gula; semak dakwaan 18 g.",
      "answer": [
        [
          "3(6) + 2 = 20 g; dakwaan kurang 2 g."
        ]
      ]
    }
  }
];
