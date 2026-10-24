import type { FlashcardReviewMode } from "@/features/flashcards/structuredFlashcard";
import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
export interface MathF2C8Entry {
 subtopic: "8.1" | "8.2" | "8.3";
 mode: FlashcardReviewMode;
 visuals?: MathQuestionVisual[];
 dlp: {prompt:string; parts?:string[]; answer:string[][]};
 bm: {prompt:string; parts?:string[]; answer:string[][]};
}
export const MATH_F2_C8_BANK: readonly MathF2C8Entry[] = [
  {
    "subtopic": "8.1",
    "mode": "concept",
    "dlp": {
      "prompt": "In f(x) = 2x + 3, what is an input?",
      "answer": [
        [
          "The value of x."
        ]
      ]
    },
    "bm": {
      "prompt": "Dalam f(x) = 2x + 3, apakah input?",
      "answer": [
        [
          "Nilai x."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "concept",
    "dlp": {
      "prompt": "What does f(4) mean?",
      "answer": [
        [
          "The output when the input x is 4."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah maksud f(4)?",
      "answer": [
        [
          "Output apabila input x ialah 4."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "concept",
    "dlp": {
      "prompt": "What does the rule f(x) = x + 5 do?",
      "answer": [
        [
          "Adds 5 to each input."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah operasi peraturan f(x) = x + 5?",
      "answer": [
        [
          "Tambah 5 kepada setiap input."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "concept",
    "dlp": {
      "prompt": "Can two different inputs have the same output for a function?",
      "answer": [
        [
          "Yes; each input must have exactly one output."
        ]
      ]
    },
    "bm": {
      "prompt": "Bolehkah dua input berbeza menghasilkan output sama bagi fungsi?",
      "answer": [
        [
          "Ya; setiap input mesti mempunyai tepat satu output."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "practice",
    "dlp": {
      "prompt": "For f(x) = 2x + 1, find f(-5).",
      "answer": [
        [
          "f(-5) = (2)(-5) + (1) = -9."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagi f(x) = 2x + 1, cari f(-5).",
      "answer": [
        [
          "f(-5) = (2)(-5) + (1) = -9."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "practice",
    "dlp": {
      "prompt": "For f(x) = 3x − 2, find f(-4).",
      "answer": [
        [
          "f(-4) = (3)(-4) + (-2) = -14."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagi f(x) = 3x − 2, cari f(-4).",
      "answer": [
        [
          "f(-4) = (3)(-4) + (-2) = -14."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "practice",
    "dlp": {
      "prompt": "For f(x) = -1x + 3, find f(-3).",
      "answer": [
        [
          "f(-3) = (-1)(-3) + (3) = 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagi f(x) = -1x + 3, cari f(-3).",
      "answer": [
        [
          "f(-3) = (-1)(-3) + (3) = 6."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "practice",
    "dlp": {
      "prompt": "For f(x) = -2x + 4, find f(-2).",
      "answer": [
        [
          "f(-2) = (-2)(-2) + (4) = 8."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagi f(x) = -2x + 4, cari f(-2).",
      "answer": [
        [
          "f(-2) = (-2)(-2) + (4) = 8."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "practice",
    "dlp": {
      "prompt": "For f(x) = 4x − 3, find f(-1).",
      "answer": [
        [
          "f(-1) = (4)(-1) + (-3) = -7."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagi f(x) = 4x − 3, cari f(-1).",
      "answer": [
        [
          "f(-1) = (4)(-1) + (-3) = -7."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "practice",
    "dlp": {
      "prompt": "For f(x) = 2x + 1, find f(0).",
      "answer": [
        [
          "f(0) = (2)(0) + (1) = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagi f(x) = 2x + 1, cari f(0).",
      "answer": [
        [
          "f(0) = (2)(0) + (1) = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "practice",
    "dlp": {
      "prompt": "For f(x) = 3x − 2, find f(1).",
      "answer": [
        [
          "f(1) = (3)(1) + (-2) = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagi f(x) = 3x − 2, cari f(1).",
      "answer": [
        [
          "f(1) = (3)(1) + (-2) = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "practice",
    "dlp": {
      "prompt": "For f(x) = -1x + 3, find f(2).",
      "answer": [
        [
          "f(2) = (-1)(2) + (3) = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagi f(x) = -1x + 3, cari f(2).",
      "answer": [
        [
          "f(2) = (-1)(2) + (3) = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "practice",
    "dlp": {
      "prompt": "For f(x) = -2x + 4, find f(3).",
      "answer": [
        [
          "f(3) = (-2)(3) + (4) = -2."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagi f(x) = -2x + 4, cari f(3).",
      "answer": [
        [
          "f(3) = (-2)(3) + (4) = -2."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "practice",
    "dlp": {
      "prompt": "For f(x) = 4x − 3, find f(4).",
      "answer": [
        [
          "f(4) = (4)(4) + (-3) = 13."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagi f(x) = 4x − 3, cari f(4).",
      "answer": [
        [
          "f(4) = (4)(4) + (-3) = 13."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "practice",
    "dlp": {
      "prompt": "For f(x) = 2x + 1, find f(5).",
      "answer": [
        [
          "f(5) = (2)(5) + (1) = 11."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagi f(x) = 2x + 1, cari f(5).",
      "answer": [
        [
          "f(5) = (2)(5) + (1) = 11."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A printing shop charges RM3 fixed plus RM1 for every page. Let C(n) = 1n + 3.",
      "parts": [
        "Find the cost of 2 pages.",
        "Find the cost of 5 pages.",
        "Explain what the constant term represents."
      ],
      "answer": [
        [
          "C(2) = 5."
        ],
        [
          "C(5) = 8."
        ],
        [
          "RM3 is the fixed charge."
        ]
      ]
    },
    "bm": {
      "prompt": "Kedai cetak mengenakan caj tetap RM3 serta RM1 bagi setiap halaman. Diberi C(n) = 1n + 3.",
      "parts": [
        "Cari kos 2 halaman.",
        "Cari kos 5 halaman.",
        "Terangkan maksud sebutan pemalar."
      ],
      "answer": [
        [
          "C(2) = 5."
        ],
        [
          "C(5) = 8."
        ],
        [
          "RM3 ialah caj tetap."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A printing shop charges RM4 fixed plus RM2 for every page. Let C(n) = 2n + 4.",
      "parts": [
        "Find the cost of 2 pages.",
        "Find the cost of 5 pages.",
        "Explain what the constant term represents."
      ],
      "answer": [
        [
          "C(2) = 8."
        ],
        [
          "C(5) = 14."
        ],
        [
          "RM4 is the fixed charge."
        ]
      ]
    },
    "bm": {
      "prompt": "Kedai cetak mengenakan caj tetap RM4 serta RM2 bagi setiap halaman. Diberi C(n) = 2n + 4.",
      "parts": [
        "Cari kos 2 halaman.",
        "Cari kos 5 halaman.",
        "Terangkan maksud sebutan pemalar."
      ],
      "answer": [
        [
          "C(2) = 8."
        ],
        [
          "C(5) = 14."
        ],
        [
          "RM4 ialah caj tetap."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A printing shop charges RM5 fixed plus RM3 for every page. Let C(n) = 3n + 5.",
      "parts": [
        "Find the cost of 2 pages.",
        "Find the cost of 5 pages.",
        "Explain what the constant term represents."
      ],
      "answer": [
        [
          "C(2) = 11."
        ],
        [
          "C(5) = 20."
        ],
        [
          "RM5 is the fixed charge."
        ]
      ]
    },
    "bm": {
      "prompt": "Kedai cetak mengenakan caj tetap RM5 serta RM3 bagi setiap halaman. Diberi C(n) = 3n + 5.",
      "parts": [
        "Cari kos 2 halaman.",
        "Cari kos 5 halaman.",
        "Terangkan maksud sebutan pemalar."
      ],
      "answer": [
        [
          "C(2) = 11."
        ],
        [
          "C(5) = 20."
        ],
        [
          "RM5 ialah caj tetap."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A printing shop charges RM6 fixed plus RM4 for every page. Let C(n) = 4n + 6.",
      "parts": [
        "Find the cost of 2 pages.",
        "Find the cost of 5 pages.",
        "Explain what the constant term represents."
      ],
      "answer": [
        [
          "C(2) = 14."
        ],
        [
          "C(5) = 26."
        ],
        [
          "RM6 is the fixed charge."
        ]
      ]
    },
    "bm": {
      "prompt": "Kedai cetak mengenakan caj tetap RM6 serta RM4 bagi setiap halaman. Diberi C(n) = 4n + 6.",
      "parts": [
        "Cari kos 2 halaman.",
        "Cari kos 5 halaman.",
        "Terangkan maksud sebutan pemalar."
      ],
      "answer": [
        [
          "C(2) = 14."
        ],
        [
          "C(5) = 26."
        ],
        [
          "RM6 ialah caj tetap."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A printing shop charges RM7 fixed plus RM5 for every page. Let C(n) = 5n + 7.",
      "parts": [
        "Find the cost of 2 pages.",
        "Find the cost of 5 pages.",
        "Explain what the constant term represents."
      ],
      "answer": [
        [
          "C(2) = 17."
        ],
        [
          "C(5) = 32."
        ],
        [
          "RM7 is the fixed charge."
        ]
      ]
    },
    "bm": {
      "prompt": "Kedai cetak mengenakan caj tetap RM7 serta RM5 bagi setiap halaman. Diberi C(n) = 5n + 7.",
      "parts": [
        "Cari kos 2 halaman.",
        "Cari kos 5 halaman.",
        "Terangkan maksud sebutan pemalar."
      ],
      "answer": [
        [
          "C(2) = 17."
        ],
        [
          "C(5) = 32."
        ],
        [
          "RM7 ialah caj tetap."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "concept",
    "dlp": {
      "prompt": "Which coordinate is written first in an ordered pair (x, y)?",
      "answer": [
        [
          "x."
        ]
      ]
    },
    "bm": {
      "prompt": "Koordinat mana ditulis dahulu bagi pasangan tertib (x, y)?",
      "answer": [
        [
          "x."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What should be placed in the first row of a function table?",
      "answer": [
        [
          "Input x-values."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah nilai yang diisi pada baris pertama jadual fungsi?",
      "answer": [
        [
          "Nilai input x."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "concept",
    "dlp": {
      "prompt": "For y = 2x, does x = 0 give y = 0?",
      "answer": [
        [
          "Yes, y = 0."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagi y = 2x, adakah x = 0 memberikan y = 0?",
      "answer": [
        [
          "Ya, y = 0."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the purpose of a table of values?",
      "answer": [
        [
          "To pair selected inputs with their calculated outputs."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah tujuan jadual nilai?",
      "answer": [
        [
          "Memadankan input pilihan dengan output yang dihitung."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Function table",
          "bm": "Jadual fungsi"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "-3",
            "right": "-1"
          },
          {
            "left": "-2",
            "right": "?"
          },
          {
            "left": "-1",
            "right": "1"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Complete the missing table value for y = 1x + 2 at x = -2.",
      "answer": [
        [
          "y = 1(-2) + (2) = 0."
        ]
      ]
    },
    "bm": {
      "prompt": "Lengkapkan nilai dalam jadual bagi y = 1x + 2 apabila x = -2.",
      "answer": [
        [
          "y = 1(-2) + (2) = 0."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Function table",
          "bm": "Jadual fungsi"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "-2",
            "right": "-5"
          },
          {
            "left": "-1",
            "right": "?"
          },
          {
            "left": "0",
            "right": "-1"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Complete the missing table value for y = 2x − 1 at x = -1.",
      "answer": [
        [
          "y = 2(-1) + (-1) = -3."
        ]
      ]
    },
    "bm": {
      "prompt": "Lengkapkan nilai dalam jadual bagi y = 2x − 1 apabila x = -1.",
      "answer": [
        [
          "y = 2(-1) + (-1) = -3."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Function table",
          "bm": "Jadual fungsi"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "-1",
            "right": "4"
          },
          {
            "left": "0",
            "right": "?"
          },
          {
            "left": "1",
            "right": "2"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Complete the missing table value for y = -1x + 3 at x = 0.",
      "answer": [
        [
          "y = -1(0) + (3) = 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Lengkapkan nilai dalam jadual bagi y = -1x + 3 apabila x = 0.",
      "answer": [
        [
          "y = -1(0) + (3) = 3."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Function table",
          "bm": "Jadual fungsi"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "0",
            "right": "0"
          },
          {
            "left": "1",
            "right": "?"
          },
          {
            "left": "2",
            "right": "6"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Complete the missing table value for y = 3x + 0 at x = 1.",
      "answer": [
        [
          "y = 3(1) + (0) = 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Lengkapkan nilai dalam jadual bagi y = 3x + 0 apabila x = 1.",
      "answer": [
        [
          "y = 3(1) + (0) = 3."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Function table",
          "bm": "Jadual fungsi"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "1",
            "right": "-1"
          },
          {
            "left": "2",
            "right": "?"
          },
          {
            "left": "3",
            "right": "-5"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Complete the missing table value for y = -2x + 1 at x = 2.",
      "answer": [
        [
          "y = -2(2) + (1) = -3."
        ]
      ]
    },
    "bm": {
      "prompt": "Lengkapkan nilai dalam jadual bagi y = -2x + 1 apabila x = 2.",
      "answer": [
        [
          "y = -2(2) + (1) = -3."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Function table",
          "bm": "Jadual fungsi"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "-3",
            "right": "-1"
          },
          {
            "left": "-2",
            "right": "?"
          },
          {
            "left": "-1",
            "right": "1"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Complete the missing table value for y = 1x + 2 at x = -2.",
      "answer": [
        [
          "y = 1(-2) + (2) = 0."
        ]
      ]
    },
    "bm": {
      "prompt": "Lengkapkan nilai dalam jadual bagi y = 1x + 2 apabila x = -2.",
      "answer": [
        [
          "y = 1(-2) + (2) = 0."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Function table",
          "bm": "Jadual fungsi"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "-2",
            "right": "-5"
          },
          {
            "left": "-1",
            "right": "?"
          },
          {
            "left": "0",
            "right": "-1"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Complete the missing table value for y = 2x − 1 at x = -1.",
      "answer": [
        [
          "y = 2(-1) + (-1) = -3."
        ]
      ]
    },
    "bm": {
      "prompt": "Lengkapkan nilai dalam jadual bagi y = 2x − 1 apabila x = -1.",
      "answer": [
        [
          "y = 2(-1) + (-1) = -3."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Function table",
          "bm": "Jadual fungsi"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "-1",
            "right": "4"
          },
          {
            "left": "0",
            "right": "?"
          },
          {
            "left": "1",
            "right": "2"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Complete the missing table value for y = -1x + 3 at x = 0.",
      "answer": [
        [
          "y = -1(0) + (3) = 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Lengkapkan nilai dalam jadual bagi y = -1x + 3 apabila x = 0.",
      "answer": [
        [
          "y = -1(0) + (3) = 3."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Function table",
          "bm": "Jadual fungsi"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "0",
            "right": "0"
          },
          {
            "left": "1",
            "right": "?"
          },
          {
            "left": "2",
            "right": "6"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Complete the missing table value for y = 3x + 0 at x = 1.",
      "answer": [
        [
          "y = 3(1) + (0) = 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Lengkapkan nilai dalam jadual bagi y = 3x + 0 apabila x = 1.",
      "answer": [
        [
          "y = 3(1) + (0) = 3."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Function table",
          "bm": "Jadual fungsi"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "1",
            "right": "-1"
          },
          {
            "left": "2",
            "right": "?"
          },
          {
            "left": "3",
            "right": "-5"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Complete the missing table value for y = -2x + 1 at x = 2.",
      "answer": [
        [
          "y = -2(2) + (1) = -3."
        ]
      ]
    },
    "bm": {
      "prompt": "Lengkapkan nilai dalam jadual bagi y = -2x + 1 apabila x = 2.",
      "answer": [
        [
          "y = -2(2) + (1) = -3."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Function table",
          "bm": "Jadual fungsi"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "-3",
            "right": "-1"
          },
          {
            "left": "-2",
            "right": "?"
          },
          {
            "left": "-1",
            "right": "1"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Complete the missing table value for y = 1x + 2 at x = -2.",
      "answer": [
        [
          "y = 1(-2) + (2) = 0."
        ]
      ]
    },
    "bm": {
      "prompt": "Lengkapkan nilai dalam jadual bagi y = 1x + 2 apabila x = -2.",
      "answer": [
        [
          "y = 1(-2) + (2) = 0."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Complete the table",
          "bm": "Lengkapkan jadual"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "-1",
            "right": "?"
          },
          {
            "left": "0",
            "right": "?"
          },
          {
            "left": "1",
            "right": "?"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The school science club uses y = 1x − 2 to model a measured quantity.",
      "parts": [
        "Complete the table for x = −1, 0, 1.",
        "State the three ordered pairs.",
        "Explain the change in y when x increases by 1."
      ],
      "answer": [
        [
          "y: -3, -2, -1."
        ],
        [
          "(-1, -3), (0, -2), (1, -1)."
        ],
        [
          "y increases by 1 each time."
        ]
      ]
    },
    "bm": {
      "prompt": "Kelab sains sekolah menggunakan y = 1x − 2 bagi memodelkan satu kuantiti.",
      "parts": [
        "Lengkapkan jadual bagi x = −1, 0, 1.",
        "Nyatakan tiga pasangan tertib.",
        "Terangkan perubahan y apabila x bertambah 1."
      ],
      "answer": [
        [
          "y: -3, -2, -1."
        ],
        [
          "(-1, -3), (0, -2), (1, -1)."
        ],
        [
          "y bertambah 1 setiap kali."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Complete the table",
          "bm": "Lengkapkan jadual"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "-1",
            "right": "?"
          },
          {
            "left": "0",
            "right": "?"
          },
          {
            "left": "1",
            "right": "?"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The school science club uses y = 2x − 1 to model a measured quantity.",
      "parts": [
        "Complete the table for x = −1, 0, 1.",
        "State the three ordered pairs.",
        "Explain the change in y when x increases by 1."
      ],
      "answer": [
        [
          "y: -3, -1, 1."
        ],
        [
          "(-1, -3), (0, -1), (1, 1)."
        ],
        [
          "y increases by 2 each time."
        ]
      ]
    },
    "bm": {
      "prompt": "Kelab sains sekolah menggunakan y = 2x − 1 bagi memodelkan satu kuantiti.",
      "parts": [
        "Lengkapkan jadual bagi x = −1, 0, 1.",
        "Nyatakan tiga pasangan tertib.",
        "Terangkan perubahan y apabila x bertambah 1."
      ],
      "answer": [
        [
          "y: -3, -1, 1."
        ],
        [
          "(-1, -3), (0, -1), (1, 1)."
        ],
        [
          "y bertambah 2 setiap kali."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Complete the table",
          "bm": "Lengkapkan jadual"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "-1",
            "right": "?"
          },
          {
            "left": "0",
            "right": "?"
          },
          {
            "left": "1",
            "right": "?"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The school science club uses y = 1x + 0 to model a measured quantity.",
      "parts": [
        "Complete the table for x = −1, 0, 1.",
        "State the three ordered pairs.",
        "Explain the change in y when x increases by 1."
      ],
      "answer": [
        [
          "y: -1, 0, 1."
        ],
        [
          "(-1, -1), (0, 0), (1, 1)."
        ],
        [
          "y increases by 1 each time."
        ]
      ]
    },
    "bm": {
      "prompt": "Kelab sains sekolah menggunakan y = 1x + 0 bagi memodelkan satu kuantiti.",
      "parts": [
        "Lengkapkan jadual bagi x = −1, 0, 1.",
        "Nyatakan tiga pasangan tertib.",
        "Terangkan perubahan y apabila x bertambah 1."
      ],
      "answer": [
        [
          "y: -1, 0, 1."
        ],
        [
          "(-1, -1), (0, 0), (1, 1)."
        ],
        [
          "y bertambah 1 setiap kali."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Complete the table",
          "bm": "Lengkapkan jadual"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "-1",
            "right": "?"
          },
          {
            "left": "0",
            "right": "?"
          },
          {
            "left": "1",
            "right": "?"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The school science club uses y = 2x + 1 to model a measured quantity.",
      "parts": [
        "Complete the table for x = −1, 0, 1.",
        "State the three ordered pairs.",
        "Explain the change in y when x increases by 1."
      ],
      "answer": [
        [
          "y: -1, 1, 3."
        ],
        [
          "(-1, -1), (0, 1), (1, 3)."
        ],
        [
          "y increases by 2 each time."
        ]
      ]
    },
    "bm": {
      "prompt": "Kelab sains sekolah menggunakan y = 2x + 1 bagi memodelkan satu kuantiti.",
      "parts": [
        "Lengkapkan jadual bagi x = −1, 0, 1.",
        "Nyatakan tiga pasangan tertib.",
        "Terangkan perubahan y apabila x bertambah 1."
      ],
      "answer": [
        [
          "y: -1, 1, 3."
        ],
        [
          "(-1, -1), (0, 1), (1, 3)."
        ],
        [
          "y bertambah 2 setiap kali."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Complete the table",
          "bm": "Lengkapkan jadual"
        },
        "headings": [
          "x",
          "y"
        ],
        "rows": [
          {
            "left": "-1",
            "right": "?"
          },
          {
            "left": "0",
            "right": "?"
          },
          {
            "left": "1",
            "right": "?"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The school science club uses y = 1x + 2 to model a measured quantity.",
      "parts": [
        "Complete the table for x = −1, 0, 1.",
        "State the three ordered pairs.",
        "Explain the change in y when x increases by 1."
      ],
      "answer": [
        [
          "y: 1, 2, 3."
        ],
        [
          "(-1, 1), (0, 2), (1, 3)."
        ],
        [
          "y increases by 1 each time."
        ]
      ]
    },
    "bm": {
      "prompt": "Kelab sains sekolah menggunakan y = 1x + 2 bagi memodelkan satu kuantiti.",
      "parts": [
        "Lengkapkan jadual bagi x = −1, 0, 1.",
        "Nyatakan tiga pasangan tertib.",
        "Terangkan perubahan y apabila x bertambah 1."
      ],
      "answer": [
        [
          "y: 1, 2, 3."
        ],
        [
          "(-1, 1), (0, 2), (1, 3)."
        ],
        [
          "y bertambah 1 setiap kali."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              1,
              2
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "What shape is the graph of y = 2x + 1?",
      "answer": [
        [
          "A straight line."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah bentuk graf y = 2x + 1?",
      "answer": [
        [
          "Garis lurus."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              1,
              2
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "What shape is the graph of y = x²?",
      "answer": [
        [
          "A U-shaped curve (parabola)."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah bentuk graf y = x²?",
      "answer": [
        [
          "Lengkung berbentuk U (parabola)."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              1,
              2
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Why should both axes use a clear scale?",
      "answer": [
        [
          "To locate points consistently and accurately."
        ]
      ]
    },
    "bm": {
      "prompt": "Mengapa kedua-dua paksi memerlukan skala yang jelas?",
      "answer": [
        [
          "Supaya titik diplot secara tepat dan konsisten."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              1,
              2
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "How many points are sufficient to determine a straight line?",
      "answer": [
        [
          "Two distinct points."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapa titik diperlukan untuk menentukan satu garis lurus?",
      "answer": [
        [
          "Dua titik berlainan."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              -1
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              0
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              1
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                -1
              ],
              [
                0,
                0
              ],
              [
                1,
                1
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The graph represents y = 1x + 0. Find y when x = 1.",
      "answer": [
        [
          "y = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf mewakili y = 1x + 0. Cari y apabila x = 1.",
      "answer": [
        [
          "y = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              -1
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                -1
              ],
              [
                0,
                1
              ],
              [
                1,
                3
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The graph represents y = 2x + 1. Find y when x = 1.",
      "answer": [
        [
          "y = 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf mewakili y = 2x + 1. Cari y apabila x = 1.",
      "answer": [
        [
          "y = 3."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              -1
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              -2
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                0
              ],
              [
                0,
                -1
              ],
              [
                1,
                -2
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The graph represents y = -1x − 1. Find y when x = 1.",
      "answer": [
        [
          "y = -2."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf mewakili y = -1x − 1. Cari y apabila x = 1.",
      "answer": [
        [
          "y = -2."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              4
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              2
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              0
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                4
              ],
              [
                0,
                2
              ],
              [
                1,
                0
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The graph represents y = -2x + 2. Find y when x = 1.",
      "answer": [
        [
          "y = 0."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf mewakili y = -2x + 2. Cari y apabila x = 1.",
      "answer": [
        [
          "y = 0."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              -5
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              -2
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              1
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                -5
              ],
              [
                0,
                -2
              ],
              [
                1,
                1
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The graph represents y = 3x − 2. Find y when x = 1.",
      "answer": [
        [
          "y = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf mewakili y = 3x − 2. Cari y apabila x = 1.",
      "answer": [
        [
          "y = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              -1
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              0
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              1
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                -1
              ],
              [
                0,
                0
              ],
              [
                1,
                1
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The graph represents y = 1x + 0. Find y when x = 1.",
      "answer": [
        [
          "y = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf mewakili y = 1x + 0. Cari y apabila x = 1.",
      "answer": [
        [
          "y = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              -1
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                -1
              ],
              [
                0,
                1
              ],
              [
                1,
                3
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The graph represents y = 2x + 1. Find y when x = 1.",
      "answer": [
        [
          "y = 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf mewakili y = 2x + 1. Cari y apabila x = 1.",
      "answer": [
        [
          "y = 3."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              -1
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              -2
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                0
              ],
              [
                0,
                -1
              ],
              [
                1,
                -2
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The graph represents y = -1x − 1. Find y when x = 1.",
      "answer": [
        [
          "y = -2."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf mewakili y = -1x − 1. Cari y apabila x = 1.",
      "answer": [
        [
          "y = -2."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              4
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              2
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              0
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                4
              ],
              [
                0,
                2
              ],
              [
                1,
                0
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The graph represents y = -2x + 2. Find y when x = 1.",
      "answer": [
        [
          "y = 0."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf mewakili y = -2x + 2. Cari y apabila x = 1.",
      "answer": [
        [
          "y = 0."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              -5
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              -2
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              1
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                -5
              ],
              [
                0,
                -2
              ],
              [
                1,
                1
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The graph represents y = 3x − 2. Find y when x = 1.",
      "answer": [
        [
          "y = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf mewakili y = 3x − 2. Cari y apabila x = 1.",
      "answer": [
        [
          "y = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              -1
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              0
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              1
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                -1
              ],
              [
                0,
                0
              ],
              [
                1,
                1
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The graph represents y = 1x + 0. Find y when x = 1.",
      "answer": [
        [
          "y = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf mewakili y = 1x + 0. Cari y apabila x = 1.",
      "answer": [
        [
          "y = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              -3
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              -2
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              -1
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                -3
              ],
              [
                0,
                -2
              ],
              [
                1,
                -1
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A straight-line graph models y = 1x − 2.",
      "parts": [
        "Read the y-intercept.",
        "Find y when x = 2.",
        "Find the change in y when x increases from 0 to 3."
      ],
      "answer": [
        [
          "y-intercept = -2."
        ],
        [
          "y = 0."
        ],
        [
          "Change = 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf garis lurus memodelkan y = 1x − 2.",
      "parts": [
        "Baca pintasan-y.",
        "Cari y apabila x = 2.",
        "Cari perubahan y apabila x bertambah daripada 0 kepada 3."
      ],
      "answer": [
        [
          "Pintasan-y = -2."
        ],
        [
          "y = 0."
        ],
        [
          "Perubahan = 3."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              -3
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              -1
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              1
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                -3
              ],
              [
                0,
                -1
              ],
              [
                1,
                1
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A straight-line graph models y = 2x − 1.",
      "parts": [
        "Read the y-intercept.",
        "Find y when x = 2.",
        "Find the change in y when x increases from 0 to 3."
      ],
      "answer": [
        [
          "y-intercept = -1."
        ],
        [
          "y = 3."
        ],
        [
          "Change = 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf garis lurus memodelkan y = 2x − 1.",
      "parts": [
        "Baca pintasan-y.",
        "Cari y apabila x = 2.",
        "Cari perubahan y apabila x bertambah daripada 0 kepada 3."
      ],
      "answer": [
        [
          "Pintasan-y = -1."
        ],
        [
          "y = 3."
        ],
        [
          "Perubahan = 6."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              -1
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              0
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              1
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                -1
              ],
              [
                0,
                0
              ],
              [
                1,
                1
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A straight-line graph models y = 1x + 0.",
      "parts": [
        "Read the y-intercept.",
        "Find y when x = 2.",
        "Find the change in y when x increases from 0 to 3."
      ],
      "answer": [
        [
          "y-intercept = 0."
        ],
        [
          "y = 2."
        ],
        [
          "Change = 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf garis lurus memodelkan y = 1x + 0.",
      "parts": [
        "Baca pintasan-y.",
        "Cari y apabila x = 2.",
        "Cari perubahan y apabila x bertambah daripada 0 kepada 3."
      ],
      "answer": [
        [
          "Pintasan-y = 0."
        ],
        [
          "y = 2."
        ],
        [
          "Perubahan = 3."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              -1
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                -1
              ],
              [
                0,
                1
              ],
              [
                1,
                3
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A straight-line graph models y = 2x + 1.",
      "parts": [
        "Read the y-intercept.",
        "Find y when x = 2.",
        "Find the change in y when x increases from 0 to 3."
      ],
      "answer": [
        [
          "y-intercept = 1."
        ],
        [
          "y = 5."
        ],
        [
          "Change = 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf garis lurus memodelkan y = 2x + 1.",
      "parts": [
        "Baca pintasan-y.",
        "Cari y apabila x = 2.",
        "Cari perubahan y apabila x bertambah daripada 0 kepada 3."
      ],
      "answer": [
        [
          "Pintasan-y = 1."
        ],
        [
          "y = 5."
        ],
        [
          "Perubahan = 6."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Function graph",
          "bm": "Graf fungsi"
        },
        "description": {
          "dlp": "Given plotted values",
          "bm": "Nilai yang diplot"
        },
        "domain": [
          -8,
          8,
          -8,
          8
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              2
            ],
            "name": "B"
          },
          {
            "at": [
              1,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -1,
                1
              ],
              [
                0,
                2
              ],
              [
                1,
                3
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A straight-line graph models y = 1x + 2.",
      "parts": [
        "Read the y-intercept.",
        "Find y when x = 2.",
        "Find the change in y when x increases from 0 to 3."
      ],
      "answer": [
        [
          "y-intercept = 2."
        ],
        [
          "y = 4."
        ],
        [
          "Change = 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Graf garis lurus memodelkan y = 1x + 2.",
      "parts": [
        "Baca pintasan-y.",
        "Cari y apabila x = 2.",
        "Cari perubahan y apabila x bertambah daripada 0 kepada 3."
      ],
      "answer": [
        [
          "Pintasan-y = 2."
        ],
        [
          "y = 4."
        ],
        [
          "Perubahan = 3."
        ]
      ]
    }
  }
];
