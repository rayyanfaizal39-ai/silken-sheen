import type { FlashcardReviewMode } from "@/features/flashcards/structuredFlashcard";
import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
export interface MathF2C10Entry {
 subtopic: "10.1" | "10.2" | "10.3";
 mode: FlashcardReviewMode;
 visuals?: MathQuestionVisual[];
 dlp: {prompt:string;parts?:string[];answer:string[][]};
 bm: {prompt:string;parts?:string[];answer:string[][]};
}
export const MATH_F2_C10_BANK: readonly MathF2C10Entry[] = [
  {
    "subtopic": "10.1",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              2
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              2
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                2
              ],
              [
                4,
                2
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "What is gradient?",
      "answer": [
        [
          "Vertical change divided by horizontal change."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah maksud kecerunan?",
      "answer": [
        [
          "Perubahan menegak dibahagi perubahan mengufuk."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "concept",
    "dlp": {
      "prompt": "How do you recognise a positive gradient?",
      "answer": [
        [
          "The line rises from left to right."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagaimana mengenal pasti kecerunan positif?",
      "answer": [
        [
          "Garis menaik dari kiri ke kanan."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              4
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              0
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                4
              ],
              [
                4,
                0
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "What is the gradient of a horizontal line?",
      "answer": [
        [
          "Zero."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapakah kecerunan garis mengufuk?",
      "answer": [
        [
          "Sifar."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "concept",
    "dlp": {
      "prompt": "What happens to the gradient of a vertical line?",
      "answer": [
        [
          "It is undefined."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagaimanakah kecerunan garis menegak?",
      "answer": [
        [
          "Tidak tertakrif."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              9
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                0
              ],
              [
                3,
                9
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A line rises 9 units vertically and changes 3 units horizontally, from A (0, 0) to B (3, 9). Find its gradient.",
      "answer": [
        [
          "m = (9 − 0) ÷ (3 − 0) = 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Garis berubah 9 unit secara menegak dan 3 unit mengufuk, dari A (0, 0) ke B (3, 9). Cari kecerunan.",
      "answer": [
        [
          "m = (9 − 0) ÷ (3 − 0) = 3."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              1,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              5,
              5
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                1,
                1
              ],
              [
                5,
                5
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A line rises 4 units vertically and changes 4 units horizontally, from A (1, 1) to B (5, 5). Find its gradient.",
      "answer": [
        [
          "m = (5 − 1) ÷ (5 − 1) = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Garis berubah 4 unit secara menegak dan 4 unit mengufuk, dari A (1, 1) ke B (5, 5). Cari kecerunan.",
      "answer": [
        [
          "m = (5 − 1) ÷ (5 − 1) = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -2,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              2,
              4
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -2,
                0
              ],
              [
                2,
                4
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A line rises 4 units vertically and changes 4 units horizontally, from A (-2, 0) to B (2, 4). Find its gradient.",
      "answer": [
        [
          "m = (4 − 0) ÷ (2 − -2) = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Garis berubah 4 unit secara menegak dan 4 unit mengufuk, dari A (-2, 0) ke B (2, 4). Cari kecerunan.",
      "answer": [
        [
          "m = (4 − 0) ÷ (2 − -2) = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -3,
              4
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              -2
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -3,
                4
              ],
              [
                3,
                -2
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A line rises 6 units vertically and changes 6 units horizontally, from A (-3, 4) to B (3, -2). Find its gradient.",
      "answer": [
        [
          "m = (-2 − 4) ÷ (3 − -3) = -1."
        ]
      ]
    },
    "bm": {
      "prompt": "Garis berubah 6 unit secara menegak dan 6 unit mengufuk, dari A (-3, 4) ke B (3, -2). Cari kecerunan.",
      "answer": [
        [
          "m = (-2 − 4) ÷ (3 − -3) = -1."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              -2
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              6
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                -2
              ],
              [
                4,
                6
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A line rises 8 units vertically and changes 4 units horizontally, from A (0, -2) to B (4, 6). Find its gradient.",
      "answer": [
        [
          "m = (6 − -2) ÷ (4 − 0) = 2."
        ]
      ]
    },
    "bm": {
      "prompt": "Garis berubah 8 unit secara menegak dan 4 unit mengufuk, dari A (0, -2) ke B (4, 6). Cari kecerunan.",
      "answer": [
        [
          "m = (6 − -2) ÷ (4 − 0) = 2."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              1,
              3
            ],
            "name": "A"
          },
          {
            "at": [
              7,
              6
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                1,
                3
              ],
              [
                7,
                6
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A line rises 3 units vertically and changes 6 units horizontally, from A (1, 3) to B (7, 6). Find its gradient.",
      "answer": [
        [
          "m = (6 − 3) ÷ (7 − 1) = 0.5."
        ]
      ]
    },
    "bm": {
      "prompt": "Garis berubah 3 unit secara menegak dan 6 unit mengufuk, dari A (1, 3) ke B (7, 6). Cari kecerunan.",
      "answer": [
        [
          "m = (6 − 3) ÷ (7 − 1) = 0.5."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -4,
              -1
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              3
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -4,
                -1
              ],
              [
                4,
                3
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A line rises 4 units vertically and changes 8 units horizontally, from A (-4, -1) to B (4, 3). Find its gradient.",
      "answer": [
        [
          "m = (3 − -1) ÷ (4 − -4) = 0.5."
        ]
      ]
    },
    "bm": {
      "prompt": "Garis berubah 4 unit secara menegak dan 8 unit mengufuk, dari A (-4, -1) ke B (4, 3). Cari kecerunan.",
      "answer": [
        [
          "m = (3 − -1) ÷ (4 − -4) = 0.5."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              2,
              8
            ],
            "name": "A"
          },
          {
            "at": [
              8,
              2
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                2,
                8
              ],
              [
                8,
                2
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A line rises 6 units vertically and changes 6 units horizontally, from A (2, 8) to B (8, 2). Find its gradient.",
      "answer": [
        [
          "m = (2 − 8) ÷ (8 − 2) = -1."
        ]
      ]
    },
    "bm": {
      "prompt": "Garis berubah 6 unit secara menegak dan 6 unit mengufuk, dari A (2, 8) ke B (8, 2). Cari kecerunan.",
      "answer": [
        [
          "m = (2 − 8) ÷ (8 − 2) = -1."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -6,
              -3
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              3
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -6,
                -3
              ],
              [
                0,
                3
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A line rises 6 units vertically and changes 6 units horizontally, from A (-6, -3) to B (0, 3). Find its gradient.",
      "answer": [
        [
          "m = (3 − -3) ÷ (0 − -6) = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Garis berubah 6 unit secara menegak dan 6 unit mengufuk, dari A (-6, -3) ke B (0, 3). Cari kecerunan.",
      "answer": [
        [
          "m = (3 − -3) ÷ (0 − -6) = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -4,
              6
            ],
            "name": "A"
          },
          {
            "at": [
              2,
              0
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -4,
                6
              ],
              [
                2,
                0
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A line rises 6 units vertically and changes 6 units horizontally, from A (-4, 6) to B (2, 0). Find its gradient.",
      "answer": [
        [
          "m = (0 − 6) ÷ (2 − -4) = -1."
        ]
      ]
    },
    "bm": {
      "prompt": "Garis berubah 6 unit secara menegak dan 6 unit mengufuk, dari A (-4, 6) ke B (2, 0). Cari kecerunan.",
      "answer": [
        [
          "m = (0 − 6) ÷ (2 − -4) = -1."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              8,
              4
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                0
              ],
              [
                8,
                4
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A line rises 4 units vertically and changes 8 units horizontally, from A (0, 0) to B (8, 4). Find its gradient.",
      "answer": [
        [
          "m = (4 − 0) ÷ (8 − 0) = 0.5."
        ]
      ]
    },
    "bm": {
      "prompt": "Garis berubah 4 unit secara menegak dan 8 unit mengufuk, dari A (0, 0) ke B (8, 4). Cari kecerunan.",
      "answer": [
        [
          "m = (4 − 0) ÷ (8 − 0) = 0.5."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -6,
              3
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              -3
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -6,
                3
              ],
              [
                0,
                -3
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A builder measures a sloped access ramp. A (-6, 3), B (0, -3).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = -3 − (3) = -6."
        ],
        [
          "Δx = 0 − (-6) = 6."
        ],
        [
          "m = -6 ÷ 6 = -1 (negative)."
        ]
      ]
    },
    "bm": {
      "prompt": "Pembina mengukur tanjakan akses. A (-6, 3), B (0, -3).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = -3 − (3) = -6."
        ],
        [
          "Δx = 0 − (-6) = 6."
        ],
        [
          "m = -6 ÷ 6 = -1 (negatif)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -2,
              -4
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              8
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -2,
                -4
              ],
              [
                4,
                8
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A builder measures a sloped access ramp. A (-2, -4), B (4, 8).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = 8 − (-4) = 12."
        ],
        [
          "Δx = 4 − (-2) = 6."
        ],
        [
          "m = 12 ÷ 6 = 2 (positive)."
        ]
      ]
    },
    "bm": {
      "prompt": "Pembina mengukur tanjakan akses. A (-2, -4), B (4, 8).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = 8 − (-4) = 12."
        ],
        [
          "Δx = 4 − (-2) = 6."
        ],
        [
          "m = 12 ÷ 6 = 2 (positif)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -3,
              -6
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              0
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -3,
                -6
              ],
              [
                3,
                0
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A builder measures a sloped access ramp. A (-3, -6), B (3, 0).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = 0 − (-6) = 6."
        ],
        [
          "Δx = 3 − (-3) = 6."
        ],
        [
          "m = 6 ÷ 6 = 1 (positive)."
        ]
      ]
    },
    "bm": {
      "prompt": "Pembina mengukur tanjakan akses. A (-3, -6), B (3, 0).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = 0 − (-6) = 6."
        ],
        [
          "Δx = 3 − (-3) = 6."
        ],
        [
          "m = 6 ÷ 6 = 1 (positif)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              4
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                0
              ],
              [
                4,
                4
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A builder measures a sloped access ramp. A (0, 0), B (4, 4).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = 4 − (0) = 4."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = 4 ÷ 4 = 1 (positive)."
        ]
      ]
    },
    "bm": {
      "prompt": "Pembina mengukur tanjakan akses. A (0, 0), B (4, 4).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = 4 − (0) = 4."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = 4 ÷ 4 = 1 (positif)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              8
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                0
              ],
              [
                4,
                8
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A builder measures a sloped access ramp. A (0, 0), B (4, 8).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = 8 − (0) = 8."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = 8 ÷ 4 = 2 (positive)."
        ]
      ]
    },
    "bm": {
      "prompt": "Pembina mengukur tanjakan akses. A (0, 0), B (4, 8).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = 8 − (0) = 8."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = 8 ÷ 4 = 2 (positif)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              4
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              0
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                4
              ],
              [
                4,
                0
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "What is the two-point gradient formula?",
      "answer": [
        [
          "m = (y₂ − y₁) ÷ (x₂ − x₁)."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah rumus kecerunan dua titik?",
      "answer": [
        [
          "m = (y₂ − y₁) ÷ (x₂ − x₁)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "concept",
    "dlp": {
      "prompt": "Why must both coordinate differences use the same point order?",
      "answer": [
        [
          "To preserve the sign of the gradient."
        ]
      ]
    },
    "bm": {
      "prompt": "Mengapa susunan titik mesti sama bagi kedua-dua beza koordinat?",
      "answer": [
        [
          "Untuk mengekalkan tanda kecerunan."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              9
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                0
              ],
              [
                3,
                9
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "What if two points have the same x-coordinate?",
      "answer": [
        [
          "Their line is vertical; gradient is undefined."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagaimana jika dua titik berkongsi koordinat-x sama?",
      "answer": [
        [
          "Garis menegak; kecerunan tidak tertakrif."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "concept",
    "dlp": {
      "prompt": "Does reversing the endpoints change the gradient?",
      "answer": [
        [
          "No, both differences reverse signs."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah menukar susunan hujung mengubah kecerunan?",
      "answer": [
        [
          "Tidak, kedua-dua beza bertukar tanda."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -2,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              2,
              4
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -2,
                0
              ],
              [
                2,
                4
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the gradient between A (-2, 0) and B (2, 4).",
      "answer": [
        [
          "m = (4 − 0) ÷ (2 − -2) = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung kecerunan antara A (-2, 0) dan B (2, 4).",
      "answer": [
        [
          "m = (4 − 0) ÷ (2 − -2) = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -3,
              4
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              -2
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -3,
                4
              ],
              [
                3,
                -2
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the gradient between A (-3, 4) and B (3, -2).",
      "answer": [
        [
          "m = (-2 − 4) ÷ (3 − -3) = -1."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung kecerunan antara A (-3, 4) dan B (3, -2).",
      "answer": [
        [
          "m = (-2 − 4) ÷ (3 − -3) = -1."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              -2
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              6
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                -2
              ],
              [
                4,
                6
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the gradient between A (0, -2) and B (4, 6).",
      "answer": [
        [
          "m = (6 − -2) ÷ (4 − 0) = 2."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung kecerunan antara A (0, -2) dan B (4, 6).",
      "answer": [
        [
          "m = (6 − -2) ÷ (4 − 0) = 2."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              1,
              3
            ],
            "name": "A"
          },
          {
            "at": [
              7,
              6
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                1,
                3
              ],
              [
                7,
                6
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the gradient between A (1, 3) and B (7, 6).",
      "answer": [
        [
          "m = (6 − 3) ÷ (7 − 1) = 0.5."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung kecerunan antara A (1, 3) dan B (7, 6).",
      "answer": [
        [
          "m = (6 − 3) ÷ (7 − 1) = 0.5."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -4,
              -1
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              3
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -4,
                -1
              ],
              [
                4,
                3
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the gradient between A (-4, -1) and B (4, 3).",
      "answer": [
        [
          "m = (3 − -1) ÷ (4 − -4) = 0.5."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung kecerunan antara A (-4, -1) dan B (4, 3).",
      "answer": [
        [
          "m = (3 − -1) ÷ (4 − -4) = 0.5."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              2,
              8
            ],
            "name": "A"
          },
          {
            "at": [
              8,
              2
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                2,
                8
              ],
              [
                8,
                2
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the gradient between A (2, 8) and B (8, 2).",
      "answer": [
        [
          "m = (2 − 8) ÷ (8 − 2) = -1."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung kecerunan antara A (2, 8) dan B (8, 2).",
      "answer": [
        [
          "m = (2 − 8) ÷ (8 − 2) = -1."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -6,
              -3
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              3
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -6,
                -3
              ],
              [
                0,
                3
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the gradient between A (-6, -3) and B (0, 3).",
      "answer": [
        [
          "m = (3 − -3) ÷ (0 − -6) = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung kecerunan antara A (-6, -3) dan B (0, 3).",
      "answer": [
        [
          "m = (3 − -3) ÷ (0 − -6) = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -4,
              6
            ],
            "name": "A"
          },
          {
            "at": [
              2,
              0
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -4,
                6
              ],
              [
                2,
                0
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the gradient between A (-4, 6) and B (2, 0).",
      "answer": [
        [
          "m = (0 − 6) ÷ (2 − -4) = -1."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung kecerunan antara A (-4, 6) dan B (2, 0).",
      "answer": [
        [
          "m = (0 − 6) ÷ (2 − -4) = -1."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              8,
              4
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                0
              ],
              [
                8,
                4
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the gradient between A (0, 0) and B (8, 4).",
      "answer": [
        [
          "m = (4 − 0) ÷ (8 − 0) = 0.5."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung kecerunan antara A (0, 0) dan B (8, 4).",
      "answer": [
        [
          "m = (4 − 0) ÷ (8 − 0) = 0.5."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -6,
              3
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              -3
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -6,
                3
              ],
              [
                0,
                -3
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the gradient between A (-6, 3) and B (0, -3).",
      "answer": [
        [
          "m = (-3 − 3) ÷ (0 − -6) = -1."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung kecerunan antara A (-6, 3) dan B (0, -3).",
      "answer": [
        [
          "m = (-3 − 3) ÷ (0 − -6) = -1."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -2,
              -4
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              8
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -2,
                -4
              ],
              [
                4,
                8
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the gradient between A (-2, -4) and B (4, 8).",
      "answer": [
        [
          "m = (8 − -4) ÷ (4 − -2) = 2."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung kecerunan antara A (-2, -4) dan B (4, 8).",
      "answer": [
        [
          "m = (8 − -4) ÷ (4 − -2) = 2."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -3,
              -6
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              0
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -3,
                -6
              ],
              [
                3,
                0
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A surveyor records two endpoints of a route. A (-3, -6), B (3, 0).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = 0 − (-6) = 6."
        ],
        [
          "Δx = 3 − (-3) = 6."
        ],
        [
          "m = 6 ÷ 6 = 1 (positive)."
        ]
      ]
    },
    "bm": {
      "prompt": "Juruukur merekod dua hujung laluan. A (-3, -6), B (3, 0).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = 0 − (-6) = 6."
        ],
        [
          "Δx = 3 − (-3) = 6."
        ],
        [
          "m = 6 ÷ 6 = 1 (positif)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              4
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                0
              ],
              [
                4,
                4
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A surveyor records two endpoints of a route. A (0, 0), B (4, 4).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = 4 − (0) = 4."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = 4 ÷ 4 = 1 (positive)."
        ]
      ]
    },
    "bm": {
      "prompt": "Juruukur merekod dua hujung laluan. A (0, 0), B (4, 4).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = 4 − (0) = 4."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = 4 ÷ 4 = 1 (positif)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              8
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                0
              ],
              [
                4,
                8
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A surveyor records two endpoints of a route. A (0, 0), B (4, 8).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = 8 − (0) = 8."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = 8 ÷ 4 = 2 (positive)."
        ]
      ]
    },
    "bm": {
      "prompt": "Juruukur merekod dua hujung laluan. A (0, 0), B (4, 8).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = 8 − (0) = 8."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = 8 ÷ 4 = 2 (positif)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              2
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              2
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                2
              ],
              [
                4,
                2
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A surveyor records two endpoints of a route. A (0, 2), B (4, 2).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = 2 − (2) = 0."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = 0 ÷ 4 = 0 (zero)."
        ]
      ]
    },
    "bm": {
      "prompt": "Juruukur merekod dua hujung laluan. A (0, 2), B (4, 2).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = 2 − (2) = 0."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = 0 ÷ 4 = 0 (sifar)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              2,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              2,
              6
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                2,
                0
              ],
              [
                2,
                6
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A surveyor records two endpoints of a route. A (2, 0), B (2, 6).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = 6 − (0) = 6."
        ],
        [
          "Δx = 2 − (2) = 0."
        ],
        [
          "m = undefined, because Δx = 0 (undefined)."
        ]
      ]
    },
    "bm": {
      "prompt": "Juruukur merekod dua hujung laluan. A (2, 0), B (2, 6).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = 6 − (0) = 6."
        ],
        [
          "Δx = 2 − (2) = 0."
        ],
        [
          "m = tidak tertakrif kerana Δx = 0 (tidak tertakrif)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              9
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                0
              ],
              [
                3,
                9
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Does a steeper upward line have a larger positive gradient?",
      "answer": [
        [
          "Yes, for the same axis scale."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah garis menaik lebih curam mempunyai kecerunan positif lebih besar?",
      "answer": [
        [
          "Ya, bagi skala paksi yang sama."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the gradient of a flat road?",
      "answer": [
        [
          "Zero."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapakah kecerunan jalan rata?",
      "answer": [
        [
          "Sifar."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -2,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              2,
              4
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -2,
                0
              ],
              [
                2,
                4
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "What is the meaning of a negative gradient?",
      "answer": [
        [
          "The line falls from left to right."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah maksud kecerunan negatif?",
      "answer": [
        [
          "Garis menurun dari kiri ke kanan."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "concept",
    "dlp": {
      "prompt": "Can a vertical wall be assigned a finite gradient?",
      "answer": [
        [
          "No, its gradient is undefined."
        ]
      ]
    },
    "bm": {
      "prompt": "Bolehkah dinding menegak diberi kecerunan terhingga?",
      "answer": [
        [
          "Tidak, kecerunannya tidak tertakrif."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              -2
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              6
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                -2
              ],
              [
                4,
                6
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A path runs from A (0, -2) to B (4, 6). Determine its gradient and direction.",
      "answer": [
        [
          "m = (6 − -2) ÷ (4 − 0) = 2. Rises from left to right."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan dari A (0, -2) ke B (4, 6). Tentukan kecerunan serta arahnya.",
      "answer": [
        [
          "m = (6 − -2) ÷ (4 − 0) = 2. Menaik dari kiri ke kanan."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              1,
              3
            ],
            "name": "A"
          },
          {
            "at": [
              7,
              6
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                1,
                3
              ],
              [
                7,
                6
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A path runs from A (1, 3) to B (7, 6). Determine its gradient and direction.",
      "answer": [
        [
          "m = (6 − 3) ÷ (7 − 1) = 0.5. Rises from left to right."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan dari A (1, 3) ke B (7, 6). Tentukan kecerunan serta arahnya.",
      "answer": [
        [
          "m = (6 − 3) ÷ (7 − 1) = 0.5. Menaik dari kiri ke kanan."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -4,
              -1
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              3
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -4,
                -1
              ],
              [
                4,
                3
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A path runs from A (-4, -1) to B (4, 3). Determine its gradient and direction.",
      "answer": [
        [
          "m = (3 − -1) ÷ (4 − -4) = 0.5. Rises from left to right."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan dari A (-4, -1) ke B (4, 3). Tentukan kecerunan serta arahnya.",
      "answer": [
        [
          "m = (3 − -1) ÷ (4 − -4) = 0.5. Menaik dari kiri ke kanan."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              2,
              8
            ],
            "name": "A"
          },
          {
            "at": [
              8,
              2
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                2,
                8
              ],
              [
                8,
                2
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A path runs from A (2, 8) to B (8, 2). Determine its gradient and direction.",
      "answer": [
        [
          "m = (2 − 8) ÷ (8 − 2) = -1. Falls from left to right."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan dari A (2, 8) ke B (8, 2). Tentukan kecerunan serta arahnya.",
      "answer": [
        [
          "m = (2 − 8) ÷ (8 − 2) = -1. Menurun dari kiri ke kanan."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -6,
              -3
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              3
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -6,
                -3
              ],
              [
                0,
                3
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A path runs from A (-6, -3) to B (0, 3). Determine its gradient and direction.",
      "answer": [
        [
          "m = (3 − -3) ÷ (0 − -6) = 1. Rises from left to right."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan dari A (-6, -3) ke B (0, 3). Tentukan kecerunan serta arahnya.",
      "answer": [
        [
          "m = (3 − -3) ÷ (0 − -6) = 1. Menaik dari kiri ke kanan."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -4,
              6
            ],
            "name": "A"
          },
          {
            "at": [
              2,
              0
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -4,
                6
              ],
              [
                2,
                0
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A path runs from A (-4, 6) to B (2, 0). Determine its gradient and direction.",
      "answer": [
        [
          "m = (0 − 6) ÷ (2 − -4) = -1. Falls from left to right."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan dari A (-4, 6) ke B (2, 0). Tentukan kecerunan serta arahnya.",
      "answer": [
        [
          "m = (0 − 6) ÷ (2 − -4) = -1. Menurun dari kiri ke kanan."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              8,
              4
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                0
              ],
              [
                8,
                4
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A path runs from A (0, 0) to B (8, 4). Determine its gradient and direction.",
      "answer": [
        [
          "m = (4 − 0) ÷ (8 − 0) = 0.5. Rises from left to right."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan dari A (0, 0) ke B (8, 4). Tentukan kecerunan serta arahnya.",
      "answer": [
        [
          "m = (4 − 0) ÷ (8 − 0) = 0.5. Menaik dari kiri ke kanan."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -6,
              3
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              -3
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -6,
                3
              ],
              [
                0,
                -3
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A path runs from A (-6, 3) to B (0, -3). Determine its gradient and direction.",
      "answer": [
        [
          "m = (-3 − 3) ÷ (0 − -6) = -1. Falls from left to right."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan dari A (-6, 3) ke B (0, -3). Tentukan kecerunan serta arahnya.",
      "answer": [
        [
          "m = (-3 − 3) ÷ (0 − -6) = -1. Menurun dari kiri ke kanan."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -2,
              -4
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              8
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -2,
                -4
              ],
              [
                4,
                8
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A path runs from A (-2, -4) to B (4, 8). Determine its gradient and direction.",
      "answer": [
        [
          "m = (8 − -4) ÷ (4 − -2) = 2. Rises from left to right."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan dari A (-2, -4) ke B (4, 8). Tentukan kecerunan serta arahnya.",
      "answer": [
        [
          "m = (8 − -4) ÷ (4 − -2) = 2. Menaik dari kiri ke kanan."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -3,
              -6
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              0
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                -3,
                -6
              ],
              [
                3,
                0
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A path runs from A (-3, -6) to B (3, 0). Determine its gradient and direction.",
      "answer": [
        [
          "m = (0 − -6) ÷ (3 − -3) = 1. Rises from left to right."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan dari A (-3, -6) ke B (3, 0). Tentukan kecerunan serta arahnya.",
      "answer": [
        [
          "m = (0 − -6) ÷ (3 − -3) = 1. Menaik dari kiri ke kanan."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              4
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                0
              ],
              [
                4,
                4
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A path runs from A (0, 0) to B (4, 4). Determine its gradient and direction.",
      "answer": [
        [
          "m = (4 − 0) ÷ (4 − 0) = 1. Rises from left to right."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan dari A (0, 0) ke B (4, 4). Tentukan kecerunan serta arahnya.",
      "answer": [
        [
          "m = (4 − 0) ÷ (4 − 0) = 1. Menaik dari kiri ke kanan."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              8
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                0
              ],
              [
                4,
                8
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A designer checks the slope of a walkway. A (0, 0), B (4, 8).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = 8 − (0) = 8."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = 8 ÷ 4 = 2 (positive)."
        ]
      ]
    },
    "bm": {
      "prompt": "Pereka menyemak kecerunan laluan pejalan kaki. A (0, 0), B (4, 8).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = 8 − (0) = 8."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = 8 ÷ 4 = 2 (positif)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              2
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              2
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                2
              ],
              [
                4,
                2
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A designer checks the slope of a walkway. A (0, 2), B (4, 2).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = 2 − (2) = 0."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = 0 ÷ 4 = 0 (zero)."
        ]
      ]
    },
    "bm": {
      "prompt": "Pereka menyemak kecerunan laluan pejalan kaki. A (0, 2), B (4, 2).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = 2 − (2) = 0."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = 0 ÷ 4 = 0 (sifar)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              2,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              2,
              6
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                2,
                0
              ],
              [
                2,
                6
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A designer checks the slope of a walkway. A (2, 0), B (2, 6).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = 6 − (0) = 6."
        ],
        [
          "Δx = 2 − (2) = 0."
        ],
        [
          "m = undefined, because Δx = 0 (undefined)."
        ]
      ]
    },
    "bm": {
      "prompt": "Pereka menyemak kecerunan laluan pejalan kaki. A (2, 0), B (2, 6).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = 6 − (0) = 6."
        ],
        [
          "Δx = 2 − (2) = 0."
        ],
        [
          "m = tidak tertakrif kerana Δx = 0 (tidak tertakrif)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              4
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              0
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                4
              ],
              [
                4,
                0
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A designer checks the slope of a walkway. A (0, 4), B (4, 0).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = 0 − (4) = -4."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = -4 ÷ 4 = -1 (negative)."
        ]
      ]
    },
    "bm": {
      "prompt": "Pereka menyemak kecerunan laluan pejalan kaki. A (0, 4), B (4, 0).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = 0 − (4) = -4."
        ],
        [
          "Δx = 4 − (0) = 4."
        ],
        [
          "m = -4 ÷ 4 = -1 (negatif)."
        ]
      ]
    }
  },
  {
    "subtopic": "10.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Gradient diagram",
          "bm": "Rajah kecerunan"
        },
        "description": {
          "dlp": "The two labelled points lie on the line",
          "bm": "Dua titik berlabel terletak pada garis"
        },
        "domain": [
          -12,
          12,
          -12,
          12
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              6,
              3
            ],
            "name": "B"
          }
        ],
        "paths": [
          {
            "points": [
              [
                0,
                0
              ],
              [
                6,
                3
              ]
            ]
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A designer checks the slope of a walkway. A (0, 0), B (6, 3).",
      "parts": [
        "Find the vertical change from A to B.",
        "Find the horizontal change from A to B.",
        "Calculate the gradient and describe its sign."
      ],
      "answer": [
        [
          "Δy = 3 − (0) = 3."
        ],
        [
          "Δx = 6 − (0) = 6."
        ],
        [
          "m = 3 ÷ 6 = 0.5 (positive)."
        ]
      ]
    },
    "bm": {
      "prompt": "Pereka menyemak kecerunan laluan pejalan kaki. A (0, 0), B (6, 3).",
      "parts": [
        "Cari perubahan menegak dari A ke B.",
        "Cari perubahan mengufuk dari A ke B.",
        "Hitung kecerunan dan terangkan tandanya."
      ],
      "answer": [
        [
          "Δy = 3 − (0) = 3."
        ],
        [
          "Δx = 6 − (0) = 6."
        ],
        [
          "m = 3 ÷ 6 = 0.5 (positif)."
        ]
      ]
    }
  }
];
