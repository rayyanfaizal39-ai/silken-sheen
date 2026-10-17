import type { FlashcardReviewMode } from "@/features/flashcards/structuredFlashcard";
export interface MathF2C5Entry {
 subtopic: "5.1" | "5.2" | "5.3";
 mode: FlashcardReviewMode;
 dlp: {prompt:string; parts?:string[]; answer:string[][]};
 bm: {prompt:string; parts?:string[]; answer:string[][]};
}
/** Chapter 5 bilingual circle questions: 12 concept / 33 practice / 15 challenge. */
export const MATH_F2_C5_BANK: readonly MathF2C5Entry[] = [
  {
    "subtopic": "5.1",
    "mode": "concept",
    "dlp": {
      "prompt": "Name the line from the centre of a circle to its circumference.",
      "answer": [
        [
          "Radius."
        ]
      ]
    },
    "bm": {
      "prompt": "Namakan garis dari pusat bulatan ke lilitannya.",
      "answer": [
        [
          "Jejari."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "concept",
    "dlp": {
      "prompt": "Name the line through the centre joining two points on a circle.",
      "answer": [
        [
          "Diameter."
        ]
      ]
    },
    "bm": {
      "prompt": "Namakan garis melalui pusat yang menghubungkan dua titik pada bulatan.",
      "answer": [
        [
          "Diameter."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "concept",
    "dlp": {
      "prompt": "A straight line joins two points on a circle without passing through the centre. Name it.",
      "answer": [
        [
          "Chord."
        ]
      ]
    },
    "bm": {
      "prompt": "Garis lurus menghubungkan dua titik pada bulatan tanpa melalui pusat. Namakannya.",
      "answer": [
        [
          "Perentas."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "concept",
    "dlp": {
      "prompt": "What is a curved part of the circumference called?",
      "answer": [
        [
          "An arc."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah nama bahagian melengkung pada lilitan bulatan?",
      "answer": [
        [
          "Lengkok."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A circle has radius 3 cm. Find its diameter.",
      "answer": [
        [
          "d = 2 × 3 = 6 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Bulatan berjejari 3 cm. Cari diameter.",
      "answer": [
        [
          "d = 2 × 3 = 6 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "practice",
    "dlp": {
      "prompt": "The diameter of a circle is 8 mm. Find its radius.",
      "answer": [
        [
          "r = 8 ÷ 2 = 4 mm."
        ]
      ]
    },
    "bm": {
      "prompt": "Diameter bulatan ialah 8 mm. Cari jejari.",
      "answer": [
        [
          "r = 8 ÷ 2 = 4 mm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A circular plate has diameter 10 cm. Find the distance from its centre to its edge.",
      "answer": [
        [
          "Radius = 10 ÷ 2 = 5 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Pinggan bulat berdiameter 10 cm. Cari jarak pusat ke tepi.",
      "answer": [
        [
          "Jejari = 10 ÷ 2 = 5 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A circle has radius 6 cm. Find its diameter.",
      "answer": [
        [
          "d = 2 × 6 = 12 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Bulatan berjejari 6 cm. Cari diameter.",
      "answer": [
        [
          "d = 2 × 6 = 12 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "practice",
    "dlp": {
      "prompt": "The diameter of a circle is 14 mm. Find its radius.",
      "answer": [
        [
          "r = 14 ÷ 2 = 7 mm."
        ]
      ]
    },
    "bm": {
      "prompt": "Diameter bulatan ialah 14 mm. Cari jejari.",
      "answer": [
        [
          "r = 14 ÷ 2 = 7 mm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A circular plate has diameter 16 cm. Find the distance from its centre to its edge.",
      "answer": [
        [
          "Radius = 16 ÷ 2 = 8 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Pinggan bulat berdiameter 16 cm. Cari jarak pusat ke tepi.",
      "answer": [
        [
          "Jejari = 16 ÷ 2 = 8 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A circle has radius 9 cm. Find its diameter.",
      "answer": [
        [
          "d = 2 × 9 = 18 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Bulatan berjejari 9 cm. Cari diameter.",
      "answer": [
        [
          "d = 2 × 9 = 18 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "practice",
    "dlp": {
      "prompt": "The diameter of a circle is 20 mm. Find its radius.",
      "answer": [
        [
          "r = 20 ÷ 2 = 10 mm."
        ]
      ]
    },
    "bm": {
      "prompt": "Diameter bulatan ialah 20 mm. Cari jejari.",
      "answer": [
        [
          "r = 20 ÷ 2 = 10 mm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A circular plate has diameter 24 cm. Find the distance from its centre to its edge.",
      "answer": [
        [
          "Radius = 24 ÷ 2 = 12 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Pinggan bulat berdiameter 24 cm. Cari jarak pusat ke tepi.",
      "answer": [
        [
          "Jejari = 24 ÷ 2 = 12 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A circle has radius 14 cm. Find its diameter.",
      "answer": [
        [
          "d = 2 × 14 = 28 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Bulatan berjejari 14 cm. Cari diameter.",
      "answer": [
        [
          "d = 2 × 14 = 28 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "practice",
    "dlp": {
      "prompt": "The diameter of a circle is 30 mm. Find its radius.",
      "answer": [
        [
          "r = 30 ÷ 2 = 15 mm."
        ]
      ]
    },
    "bm": {
      "prompt": "Diameter bulatan ialah 30 mm. Cari jejari.",
      "answer": [
        [
          "r = 30 ÷ 2 = 15 mm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular sign has a radius of 5 cm.",
      "parts": [
        "Find its diameter.",
        "State whether the diameter is a chord.",
        "If the radius increases by 2 cm, find the new diameter."
      ],
      "answer": [
        [
          "2 × 5 = 10 cm."
        ],
        [
          "Yes. A diameter is the longest chord."
        ],
        [
          "2 × (5 + 2) = 14 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda bulat berjejari 5 cm.",
      "parts": [
        "Cari diameternya.",
        "Nyatakan sama ada diameter ialah perentas.",
        "Jika jejari bertambah 2 cm, cari diameter baharu."
      ],
      "answer": [
        [
          "2 × 5 = 10 cm."
        ],
        [
          "Ya. Diameter ialah perentas terpanjang."
        ],
        [
          "2 × (5 + 2) = 14 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular sign has a radius of 7 cm.",
      "parts": [
        "Find its diameter.",
        "State whether the diameter is a chord.",
        "If the radius increases by 2 cm, find the new diameter."
      ],
      "answer": [
        [
          "2 × 7 = 14 cm."
        ],
        [
          "Yes. A diameter is the longest chord."
        ],
        [
          "2 × (7 + 2) = 18 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda bulat berjejari 7 cm.",
      "parts": [
        "Cari diameternya.",
        "Nyatakan sama ada diameter ialah perentas.",
        "Jika jejari bertambah 2 cm, cari diameter baharu."
      ],
      "answer": [
        [
          "2 × 7 = 14 cm."
        ],
        [
          "Ya. Diameter ialah perentas terpanjang."
        ],
        [
          "2 × (7 + 2) = 18 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular sign has a radius of 9 cm.",
      "parts": [
        "Find its diameter.",
        "State whether the diameter is a chord.",
        "If the radius increases by 2 cm, find the new diameter."
      ],
      "answer": [
        [
          "2 × 9 = 18 cm."
        ],
        [
          "Yes. A diameter is the longest chord."
        ],
        [
          "2 × (9 + 2) = 22 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda bulat berjejari 9 cm.",
      "parts": [
        "Cari diameternya.",
        "Nyatakan sama ada diameter ialah perentas.",
        "Jika jejari bertambah 2 cm, cari diameter baharu."
      ],
      "answer": [
        [
          "2 × 9 = 18 cm."
        ],
        [
          "Ya. Diameter ialah perentas terpanjang."
        ],
        [
          "2 × (9 + 2) = 22 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular sign has a radius of 11 cm.",
      "parts": [
        "Find its diameter.",
        "State whether the diameter is a chord.",
        "If the radius increases by 2 cm, find the new diameter."
      ],
      "answer": [
        [
          "2 × 11 = 22 cm."
        ],
        [
          "Yes. A diameter is the longest chord."
        ],
        [
          "2 × (11 + 2) = 26 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda bulat berjejari 11 cm.",
      "parts": [
        "Cari diameternya.",
        "Nyatakan sama ada diameter ialah perentas.",
        "Jika jejari bertambah 2 cm, cari diameter baharu."
      ],
      "answer": [
        [
          "2 × 11 = 22 cm."
        ],
        [
          "Ya. Diameter ialah perentas terpanjang."
        ],
        [
          "2 × (11 + 2) = 26 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular sign has a radius of 13 cm.",
      "parts": [
        "Find its diameter.",
        "State whether the diameter is a chord.",
        "If the radius increases by 2 cm, find the new diameter."
      ],
      "answer": [
        [
          "2 × 13 = 26 cm."
        ],
        [
          "Yes. A diameter is the longest chord."
        ],
        [
          "2 × (13 + 2) = 30 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda bulat berjejari 13 cm.",
      "parts": [
        "Cari diameternya.",
        "Nyatakan sama ada diameter ialah perentas.",
        "Jika jejari bertambah 2 cm, cari diameter baharu."
      ],
      "answer": [
        [
          "2 × 13 = 26 cm."
        ],
        [
          "Ya. Diameter ialah perentas terpanjang."
        ],
        [
          "2 × (13 + 2) = 30 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the circumference of a circle?",
      "answer": [
        [
          "The distance around the circle."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah maksud lilitan bulatan?",
      "answer": [
        [
          "Jarak mengelilingi bulatan."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "concept",
    "dlp": {
      "prompt": "Write the circumference formula using radius r.",
      "answer": [
        [
          "C = 2πr."
        ]
      ]
    },
    "bm": {
      "prompt": "Tulis rumus lilitan menggunakan jejari r.",
      "answer": [
        [
          "C = 2πr."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "concept",
    "dlp": {
      "prompt": "Write the circumference formula using diameter d.",
      "answer": [
        [
          "C = πd."
        ]
      ]
    },
    "bm": {
      "prompt": "Tulis rumus lilitan menggunakan diameter d.",
      "answer": [
        [
          "C = πd."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "concept",
    "dlp": {
      "prompt": "If the radius doubles, how does circumference change?",
      "answer": [
        [
          "It doubles."
        ]
      ]
    },
    "bm": {
      "prompt": "Jika jejari menjadi dua kali ganda, bagaimana lilitan berubah?",
      "answer": [
        [
          "Lilitan juga menjadi dua kali ganda."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the circumference of a circle with radius 3 cm. Use π = 3.14.",
      "answer": [
        [
          "C = 2πr = 18.84 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari lilitan bulatan berjejari 3 cm. Gunakan π = 3.14.",
      "answer": [
        [
          "C = 2πr = 18.84 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A wheel has diameter 8 cm. Find its circumference. Use π notation.",
      "answer": [
        [
          "C = πd = 8π cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Roda berdiameter 8 cm. Cari lilitan. Gunakan tatatanda π.",
      "answer": [
        [
          "C = πd = 8π cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the circumference of a circle with radius 5 cm. Use an exact answer in π.",
      "answer": [
        [
          "C = 2πr = 10π cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari lilitan bulatan berjejari 5 cm. Gunakan jawapan tepat dalam π.",
      "answer": [
        [
          "C = 2πr = 10π cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A wheel has diameter 12 cm. Find its circumference. Use π = 3.14.",
      "answer": [
        [
          "C = πd = 37.68 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Roda berdiameter 12 cm. Cari lilitan. Gunakan π = 3.14.",
      "answer": [
        [
          "C = πd = 37.68 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the circumference of a circle with radius 7 cm. Use an exact answer in π.",
      "answer": [
        [
          "C = 2πr = 14π cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari lilitan bulatan berjejari 7 cm. Gunakan jawapan tepat dalam π.",
      "answer": [
        [
          "C = 2πr = 14π cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A wheel has diameter 16 cm. Find its circumference. Use π notation.",
      "answer": [
        [
          "C = πd = 16π cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Roda berdiameter 16 cm. Cari lilitan. Gunakan tatatanda π.",
      "answer": [
        [
          "C = πd = 16π cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the circumference of a circle with radius 9 cm. Use π = 3.14.",
      "answer": [
        [
          "C = 2πr = 56.52 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari lilitan bulatan berjejari 9 cm. Gunakan π = 3.14.",
      "answer": [
        [
          "C = 2πr = 56.52 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A wheel has diameter 20 cm. Find its circumference. Use π notation.",
      "answer": [
        [
          "C = πd = 20π cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Roda berdiameter 20 cm. Cari lilitan. Gunakan tatatanda π.",
      "answer": [
        [
          "C = πd = 20π cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the circumference of a circle with radius 11 cm. Use an exact answer in π.",
      "answer": [
        [
          "C = 2πr = 22π cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari lilitan bulatan berjejari 11 cm. Gunakan jawapan tepat dalam π.",
      "answer": [
        [
          "C = 2πr = 22π cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A wheel has diameter 24 cm. Find its circumference. Use π = 3.14.",
      "answer": [
        [
          "C = πd = 75.36 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Roda berdiameter 24 cm. Cari lilitan. Gunakan π = 3.14.",
      "answer": [
        [
          "C = πd = 75.36 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the circumference of a circle with radius 14 cm. Use an exact answer in π.",
      "answer": [
        [
          "C = 2πr = 28π cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari lilitan bulatan berjejari 14 cm. Gunakan jawapan tepat dalam π.",
      "answer": [
        [
          "C = 2πr = 28π cm."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular running path has radius 3 m. Give exact answers in π.",
      "parts": [
        "Find the circumference.",
        "Find the distance of 3 complete laps.",
        "Another path has twice the radius. Compare its circumference."
      ],
      "answer": [
        [
          "2π × 3 = 6π m."
        ],
        [
          "3 × 6π = 18π m."
        ],
        [
          "New circumference = 12π m, exactly twice the original."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan larian bulat berjejari 3 m. Berikan jawapan tepat dalam π.",
      "parts": [
        "Cari lilitan laluan.",
        "Cari jarak 3 pusingan lengkap.",
        "Laluan lain mempunyai jejari dua kali ganda. Bandingkan lilitannya."
      ],
      "answer": [
        [
          "2π × 3 = 6π m."
        ],
        [
          "3 × 6π = 18π m."
        ],
        [
          "Lilitan baharu = 12π m, dua kali ganda asal."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular running path has radius 4 m. Give exact answers in π.",
      "parts": [
        "Find the circumference.",
        "Find the distance of 3 complete laps.",
        "Another path has twice the radius. Compare its circumference."
      ],
      "answer": [
        [
          "2π × 4 = 8π m."
        ],
        [
          "3 × 8π = 24π m."
        ],
        [
          "New circumference = 16π m, exactly twice the original."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan larian bulat berjejari 4 m. Berikan jawapan tepat dalam π.",
      "parts": [
        "Cari lilitan laluan.",
        "Cari jarak 3 pusingan lengkap.",
        "Laluan lain mempunyai jejari dua kali ganda. Bandingkan lilitannya."
      ],
      "answer": [
        [
          "2π × 4 = 8π m."
        ],
        [
          "3 × 8π = 24π m."
        ],
        [
          "Lilitan baharu = 16π m, dua kali ganda asal."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular running path has radius 5 m. Give exact answers in π.",
      "parts": [
        "Find the circumference.",
        "Find the distance of 3 complete laps.",
        "Another path has twice the radius. Compare its circumference."
      ],
      "answer": [
        [
          "2π × 5 = 10π m."
        ],
        [
          "3 × 10π = 30π m."
        ],
        [
          "New circumference = 20π m, exactly twice the original."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan larian bulat berjejari 5 m. Berikan jawapan tepat dalam π.",
      "parts": [
        "Cari lilitan laluan.",
        "Cari jarak 3 pusingan lengkap.",
        "Laluan lain mempunyai jejari dua kali ganda. Bandingkan lilitannya."
      ],
      "answer": [
        [
          "2π × 5 = 10π m."
        ],
        [
          "3 × 10π = 30π m."
        ],
        [
          "Lilitan baharu = 20π m, dua kali ganda asal."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular running path has radius 6 m. Give exact answers in π.",
      "parts": [
        "Find the circumference.",
        "Find the distance of 3 complete laps.",
        "Another path has twice the radius. Compare its circumference."
      ],
      "answer": [
        [
          "2π × 6 = 12π m."
        ],
        [
          "3 × 12π = 36π m."
        ],
        [
          "New circumference = 24π m, exactly twice the original."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan larian bulat berjejari 6 m. Berikan jawapan tepat dalam π.",
      "parts": [
        "Cari lilitan laluan.",
        "Cari jarak 3 pusingan lengkap.",
        "Laluan lain mempunyai jejari dua kali ganda. Bandingkan lilitannya."
      ],
      "answer": [
        [
          "2π × 6 = 12π m."
        ],
        [
          "3 × 12π = 36π m."
        ],
        [
          "Lilitan baharu = 24π m, dua kali ganda asal."
        ]
      ]
    }
  },
  {
    "subtopic": "5.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular running path has radius 7 m. Give exact answers in π.",
      "parts": [
        "Find the circumference.",
        "Find the distance of 3 complete laps.",
        "Another path has twice the radius. Compare its circumference."
      ],
      "answer": [
        [
          "2π × 7 = 14π m."
        ],
        [
          "3 × 14π = 42π m."
        ],
        [
          "New circumference = 28π m, exactly twice the original."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan larian bulat berjejari 7 m. Berikan jawapan tepat dalam π.",
      "parts": [
        "Cari lilitan laluan.",
        "Cari jarak 3 pusingan lengkap.",
        "Laluan lain mempunyai jejari dua kali ganda. Bandingkan lilitannya."
      ],
      "answer": [
        [
          "2π × 7 = 14π m."
        ],
        [
          "3 × 14π = 42π m."
        ],
        [
          "Lilitan baharu = 28π m, dua kali ganda asal."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "concept",
    "dlp": {
      "prompt": "Write the formula for the area of a circle.",
      "answer": [
        [
          "A = πr²."
        ]
      ]
    },
    "bm": {
      "prompt": "Tulis rumus luas bulatan.",
      "answer": [
        [
          "A = πr²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "concept",
    "dlp": {
      "prompt": "Which length must be squared to calculate a circle's area?",
      "answer": [
        [
          "The radius."
        ]
      ]
    },
    "bm": {
      "prompt": "Panjang manakah perlu dikuasakan dua untuk mencari luas bulatan?",
      "answer": [
        [
          "Jejari."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What unit is used for the area of a circle measured in centimetres?",
      "answer": [
        [
          "cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah unit bagi luas bulatan yang diukur dalam sentimeter?",
      "answer": [
        [
          "cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "concept",
    "dlp": {
      "prompt": "If the radius doubles, what happens to the area?",
      "answer": [
        [
          "The area becomes four times as large."
        ]
      ]
    },
    "bm": {
      "prompt": "Jika jejari menjadi dua kali ganda, apakah perubahan luas?",
      "answer": [
        [
          "Luas menjadi empat kali ganda."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the area of a circle with radius 2 cm. Leave your answer in π.",
      "answer": [
        [
          "A = π × 2² = 4π cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari luas bulatan berjejari 2 cm. Biarkan jawapan dalam π.",
      "answer": [
        [
          "A = π × 2² = 4π cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A circular mat has diameter 6 cm. Find its area in terms of π.",
      "answer": [
        [
          "A = π × 3² = 9π cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Tikar bulat berdiameter 6 cm. Cari luas dalam sebutan π.",
      "answer": [
        [
          "A = π × 3² = 9π cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the area of a circle with radius 4 cm. Leave your answer in π.",
      "answer": [
        [
          "A = π × 4² = 16π cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari luas bulatan berjejari 4 cm. Biarkan jawapan dalam π.",
      "answer": [
        [
          "A = π × 4² = 16π cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A circular mat has diameter 10 cm. Find its area in terms of π.",
      "answer": [
        [
          "A = π × 5² = 25π cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Tikar bulat berdiameter 10 cm. Cari luas dalam sebutan π.",
      "answer": [
        [
          "A = π × 5² = 25π cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the area of a circle with radius 6 cm. Leave your answer in π.",
      "answer": [
        [
          "A = π × 6² = 36π cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari luas bulatan berjejari 6 cm. Biarkan jawapan dalam π.",
      "answer": [
        [
          "A = π × 6² = 36π cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A circular mat has diameter 14 cm. Find its area in terms of π.",
      "answer": [
        [
          "A = π × 7² = 49π cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Tikar bulat berdiameter 14 cm. Cari luas dalam sebutan π.",
      "answer": [
        [
          "A = π × 7² = 49π cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the area of a circle with radius 8 cm. Leave your answer in π.",
      "answer": [
        [
          "A = π × 8² = 64π cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari luas bulatan berjejari 8 cm. Biarkan jawapan dalam π.",
      "answer": [
        [
          "A = π × 8² = 64π cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A circular mat has diameter 18 cm. Find its area in terms of π.",
      "answer": [
        [
          "A = π × 9² = 81π cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Tikar bulat berdiameter 18 cm. Cari luas dalam sebutan π.",
      "answer": [
        [
          "A = π × 9² = 81π cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the area of a circle with radius 10 cm. Leave your answer in π.",
      "answer": [
        [
          "A = π × 10² = 100π cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari luas bulatan berjejari 10 cm. Biarkan jawapan dalam π.",
      "answer": [
        [
          "A = π × 10² = 100π cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A circular mat has diameter 24 cm. Find its area in terms of π.",
      "answer": [
        [
          "A = π × 12² = 144π cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Tikar bulat berdiameter 24 cm. Cari luas dalam sebutan π.",
      "answer": [
        [
          "A = π × 12² = 144π cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the area of a circle with radius 14 cm. Leave your answer in π.",
      "answer": [
        [
          "A = π × 14² = 196π cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari luas bulatan berjejari 14 cm. Biarkan jawapan dalam π.",
      "answer": [
        [
          "A = π × 14² = 196π cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular garden has radius 3 m. Give exact answers in π.",
      "parts": [
        "Calculate its area.",
        "A circular pond of radius 1 m is inside. Find the planting area.",
        "If the garden radius doubles, find its new area."
      ],
      "answer": [
        [
          "π × 3² = 9π m²."
        ],
        [
          "(9 − 1)π = 8π m²."
        ],
        [
          "π × 6² = 36π m²."
        ]
      ]
    },
    "bm": {
      "prompt": "Taman bulat berjejari 3 m. Berikan jawapan tepat dalam π.",
      "parts": [
        "Hitung luas taman.",
        "Kolam berjejari 1 m berada di dalam taman. Cari luas tanaman.",
        "Jika jejari taman digandakan, cari luas baharu."
      ],
      "answer": [
        [
          "π × 3² = 9π m²."
        ],
        [
          "(9 − 1)π = 8π m²."
        ],
        [
          "π × 6² = 36π m²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular garden has radius 4 m. Give exact answers in π.",
      "parts": [
        "Calculate its area.",
        "A circular pond of radius 1 m is inside. Find the planting area.",
        "If the garden radius doubles, find its new area."
      ],
      "answer": [
        [
          "π × 4² = 16π m²."
        ],
        [
          "(16 − 1)π = 15π m²."
        ],
        [
          "π × 8² = 64π m²."
        ]
      ]
    },
    "bm": {
      "prompt": "Taman bulat berjejari 4 m. Berikan jawapan tepat dalam π.",
      "parts": [
        "Hitung luas taman.",
        "Kolam berjejari 1 m berada di dalam taman. Cari luas tanaman.",
        "Jika jejari taman digandakan, cari luas baharu."
      ],
      "answer": [
        [
          "π × 4² = 16π m²."
        ],
        [
          "(16 − 1)π = 15π m²."
        ],
        [
          "π × 8² = 64π m²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular garden has radius 5 m. Give exact answers in π.",
      "parts": [
        "Calculate its area.",
        "A circular pond of radius 1 m is inside. Find the planting area.",
        "If the garden radius doubles, find its new area."
      ],
      "answer": [
        [
          "π × 5² = 25π m²."
        ],
        [
          "(25 − 1)π = 24π m²."
        ],
        [
          "π × 10² = 100π m²."
        ]
      ]
    },
    "bm": {
      "prompt": "Taman bulat berjejari 5 m. Berikan jawapan tepat dalam π.",
      "parts": [
        "Hitung luas taman.",
        "Kolam berjejari 1 m berada di dalam taman. Cari luas tanaman.",
        "Jika jejari taman digandakan, cari luas baharu."
      ],
      "answer": [
        [
          "π × 5² = 25π m²."
        ],
        [
          "(25 − 1)π = 24π m²."
        ],
        [
          "π × 10² = 100π m²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular garden has radius 6 m. Give exact answers in π.",
      "parts": [
        "Calculate its area.",
        "A circular pond of radius 1 m is inside. Find the planting area.",
        "If the garden radius doubles, find its new area."
      ],
      "answer": [
        [
          "π × 6² = 36π m²."
        ],
        [
          "(36 − 1)π = 35π m²."
        ],
        [
          "π × 12² = 144π m²."
        ]
      ]
    },
    "bm": {
      "prompt": "Taman bulat berjejari 6 m. Berikan jawapan tepat dalam π.",
      "parts": [
        "Hitung luas taman.",
        "Kolam berjejari 1 m berada di dalam taman. Cari luas tanaman.",
        "Jika jejari taman digandakan, cari luas baharu."
      ],
      "answer": [
        [
          "π × 6² = 36π m²."
        ],
        [
          "(36 − 1)π = 35π m²."
        ],
        [
          "π × 12² = 144π m²."
        ]
      ]
    }
  },
  {
    "subtopic": "5.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A circular garden has radius 7 m. Give exact answers in π.",
      "parts": [
        "Calculate its area.",
        "A circular pond of radius 1 m is inside. Find the planting area.",
        "If the garden radius doubles, find its new area."
      ],
      "answer": [
        [
          "π × 7² = 49π m²."
        ],
        [
          "(49 − 1)π = 48π m²."
        ],
        [
          "π × 14² = 196π m²."
        ]
      ]
    },
    "bm": {
      "prompt": "Taman bulat berjejari 7 m. Berikan jawapan tepat dalam π.",
      "parts": [
        "Hitung luas taman.",
        "Kolam berjejari 1 m berada di dalam taman. Cari luas tanaman.",
        "Jika jejari taman digandakan, cari luas baharu."
      ],
      "answer": [
        [
          "π × 7² = 49π m²."
        ],
        [
          "(49 − 1)π = 48π m²."
        ],
        [
          "π × 14² = 196π m²."
        ]
      ]
    }
  }
];
