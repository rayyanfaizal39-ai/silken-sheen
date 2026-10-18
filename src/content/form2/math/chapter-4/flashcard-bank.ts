import type { FlashcardReviewMode } from "@/features/flashcards/structuredFlashcard";
import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";

export interface MathF2C4Entry {
 subtopic: "4.1" | "4.2" | "4.3";
 mode: FlashcardReviewMode;
 visuals: MathQuestionVisual[];
 dlp: { prompt: string; parts?: string[]; answer: string[][] };
 bm: { prompt: string; parts?: string[]; answer: string[][] };
}
/** Bilingual structured polygon bank: 12 concept, 33 practice, 15 challenge. */
export const MATH_F2_C4_BANK: readonly MathF2C4Entry[] = [
  {
    "subtopic": "4.1",
    "mode": "concept",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "3-sided polygon",
              "bm": "Poligon 3 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    18,
                    138.35
                  ],
                  [
                    90,
                    13.65
                  ],
                  [
                    162,
                    138.35
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 3"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Identify the polygon shown with 3 sides.",
      "answer": [
        [
          "It is a triangle, with 3 sides."
        ]
      ]
    },
    "bm": {
      "prompt": "Namakan poligon dengan 3 sisi yang ditunjukkan.",
      "answer": [
        [
          "Ini ialah segi tiga, dengan 3 sisi."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "concept",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "4-sided polygon",
              "bm": "Poligon 4 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    18,
                    148
                  ],
                  [
                    18,
                    4
                  ],
                  [
                    162,
                    4
                  ],
                  [
                    162,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 4"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "How many vertices and diagonals from one vertex does the quadrilateral have?",
      "answer": [
        [
          "4 vertices and 1 diagonals from one vertex."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapakah bucu dan pepenjuru dari satu bucu bagi segi empat?",
      "answer": [
        [
          "4 bucu dan 1 pepenjuru dari satu bucu."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "concept",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "5-sided polygon",
              "bm": "Poligon 5 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    45.5,
                    144.48
                  ],
                  [
                    18,
                    59.83
                  ],
                  [
                    90,
                    7.52
                  ],
                  [
                    162,
                    59.83
                  ],
                  [
                    134.5,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 5"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Identify the polygon shown with 5 sides.",
      "answer": [
        [
          "It is a pentagon, with 5 sides."
        ]
      ]
    },
    "bm": {
      "prompt": "Namakan poligon dengan 5 sisi yang ditunjukkan.",
      "answer": [
        [
          "Ini ialah pentagon, dengan 5 sisi."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "concept",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "6-sided polygon",
              "bm": "Poligon 6 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    54,
                    138.35
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    54,
                    13.65
                  ],
                  [
                    126,
                    13.65
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    126,
                    138.35
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 6"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "How many vertices and diagonals from one vertex does the hexagon have?",
      "answer": [
        [
          "6 vertices and 3 diagonals from one vertex."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapakah bucu dan pepenjuru dari satu bucu bagi heksagon?",
      "answer": [
        [
          "6 bucu dan 3 pepenjuru dari satu bucu."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "7-sided polygon",
              "bm": "Poligon 7 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    57.96,
                    146.19
                  ],
                  [
                    18,
                    96.09
                  ],
                  [
                    32.26,
                    33.61
                  ],
                  [
                    90,
                    5.81
                  ],
                  [
                    147.74,
                    33.61
                  ],
                  [
                    162,
                    96.09
                  ],
                  [
                    122.04,
                    146.19
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 7"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A heptagon has 7 sides. How many triangles are formed by diagonals from one vertex?",
      "answer": [
        [
          "7 − 2 = 5 triangles."
        ]
      ]
    },
    "bm": {
      "prompt": "heptagon mempunyai 7 sisi. Berapa segi tiga terbentuk melalui pepenjuru dari satu bucu?",
      "answer": [
        [
          "7 − 2 = 5 segi tiga."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "8-sided polygon",
              "bm": "Poligon 8 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    60.18,
                    148
                  ],
                  [
                    18,
                    105.82
                  ],
                  [
                    18,
                    46.18
                  ],
                  [
                    60.18,
                    4
                  ],
                  [
                    119.82,
                    4
                  ],
                  [
                    162,
                    46.18
                  ],
                  [
                    162,
                    105.82
                  ],
                  [
                    119.82,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 8"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find the total number of vertices and sides in a octagon.",
      "answer": [
        [
          "8 vertices and 8 sides, total 16."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah bucu dan sisi bagi oktagon.",
      "answer": [
        [
          "8 bucu dan 8 sisi; jumlah 16."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "9-sided polygon",
              "bm": "Poligon 9 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    64.99,
                    146.91
                  ],
                  [
                    26.68,
                    114.76
                  ],
                  [
                    18,
                    65.51
                  ],
                  [
                    43.01,
                    22.2
                  ],
                  [
                    90,
                    5.09
                  ],
                  [
                    136.99,
                    22.2
                  ],
                  [
                    162,
                    65.51
                  ],
                  [
                    153.32,
                    114.76
                  ],
                  [
                    115.01,
                    146.91
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 9"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find the number of diagonals of the 9-sided polygon.",
      "answer": [
        [
          "9(9 − 3) ÷ 2 = 27 diagonals."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari bilangan pepenjuru dalam poligon 9 sisi.",
      "answer": [
        [
          "9(9 − 3) ÷ 2 = 27 pepenjuru."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "10-sided polygon",
              "bm": "Poligon 10 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    67.75,
                    144.48
                  ],
                  [
                    31.75,
                    118.32
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    31.75,
                    33.68
                  ],
                  [
                    67.75,
                    7.52
                  ],
                  [
                    112.25,
                    7.52
                  ],
                  [
                    148.25,
                    33.68
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    148.25,
                    118.32
                  ],
                  [
                    112.25,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 10"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A decagon has 10 sides. How many triangles are formed by diagonals from one vertex?",
      "answer": [
        [
          "10 − 2 = 8 triangles."
        ]
      ]
    },
    "bm": {
      "prompt": "dekagon mempunyai 10 sisi. Berapa segi tiga terbentuk melalui pepenjuru dari satu bucu?",
      "answer": [
        [
          "10 − 2 = 8 segi tiga."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "12-sided polygon",
              "bm": "Poligon 12 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    70.71,
                    148
                  ],
                  [
                    37.29,
                    128.71
                  ],
                  [
                    18,
                    95.29
                  ],
                  [
                    18,
                    56.71
                  ],
                  [
                    37.29,
                    23.29
                  ],
                  [
                    70.71,
                    4
                  ],
                  [
                    109.29,
                    4
                  ],
                  [
                    142.71,
                    23.29
                  ],
                  [
                    162,
                    56.71
                  ],
                  [
                    162,
                    95.29
                  ],
                  [
                    142.71,
                    128.71
                  ],
                  [
                    109.29,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 12"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find the total number of vertices and sides in a dodecagon.",
      "answer": [
        [
          "12 vertices and 12 sides, total 24."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah bucu dan sisi bagi dodekagon.",
      "answer": [
        [
          "12 bucu dan 12 sisi; jumlah 24."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "5-sided polygon",
              "bm": "Poligon 5 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    45.5,
                    144.48
                  ],
                  [
                    18,
                    59.83
                  ],
                  [
                    90,
                    7.52
                  ],
                  [
                    162,
                    59.83
                  ],
                  [
                    134.5,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 5"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find the number of diagonals of the 5-sided polygon.",
      "answer": [
        [
          "5(5 − 3) ÷ 2 = 5 diagonals."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari bilangan pepenjuru dalam poligon 5 sisi.",
      "answer": [
        [
          "5(5 − 3) ÷ 2 = 5 pepenjuru."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "6-sided polygon",
              "bm": "Poligon 6 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    54,
                    138.35
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    54,
                    13.65
                  ],
                  [
                    126,
                    13.65
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    126,
                    138.35
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 6"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A hexagon has 6 sides. How many triangles are formed by diagonals from one vertex?",
      "answer": [
        [
          "6 − 2 = 4 triangles."
        ]
      ]
    },
    "bm": {
      "prompt": "heksagon mempunyai 6 sisi. Berapa segi tiga terbentuk melalui pepenjuru dari satu bucu?",
      "answer": [
        [
          "6 − 2 = 4 segi tiga."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "8-sided polygon",
              "bm": "Poligon 8 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    60.18,
                    148
                  ],
                  [
                    18,
                    105.82
                  ],
                  [
                    18,
                    46.18
                  ],
                  [
                    60.18,
                    4
                  ],
                  [
                    119.82,
                    4
                  ],
                  [
                    162,
                    46.18
                  ],
                  [
                    162,
                    105.82
                  ],
                  [
                    119.82,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 8"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find the total number of vertices and sides in a octagon.",
      "answer": [
        [
          "8 vertices and 8 sides, total 16."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah bucu dan sisi bagi oktagon.",
      "answer": [
        [
          "8 bucu dan 8 sisi; jumlah 16."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "10-sided polygon",
              "bm": "Poligon 10 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    67.75,
                    144.48
                  ],
                  [
                    31.75,
                    118.32
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    31.75,
                    33.68
                  ],
                  [
                    67.75,
                    7.52
                  ],
                  [
                    112.25,
                    7.52
                  ],
                  [
                    148.25,
                    33.68
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    148.25,
                    118.32
                  ],
                  [
                    112.25,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 10"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find the number of diagonals of the 10-sided polygon.",
      "answer": [
        [
          "10(10 − 3) ÷ 2 = 35 diagonals."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari bilangan pepenjuru dalam poligon 10 sisi.",
      "answer": [
        [
          "10(10 − 3) ÷ 2 = 35 pepenjuru."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "12-sided polygon",
              "bm": "Poligon 12 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    70.71,
                    148
                  ],
                  [
                    37.29,
                    128.71
                  ],
                  [
                    18,
                    95.29
                  ],
                  [
                    18,
                    56.71
                  ],
                  [
                    37.29,
                    23.29
                  ],
                  [
                    70.71,
                    4
                  ],
                  [
                    109.29,
                    4
                  ],
                  [
                    142.71,
                    23.29
                  ],
                  [
                    162,
                    56.71
                  ],
                  [
                    162,
                    95.29
                  ],
                  [
                    142.71,
                    128.71
                  ],
                  [
                    109.29,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 12"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A dodecagon has 12 sides. How many triangles are formed by diagonals from one vertex?",
      "answer": [
        [
          "12 − 2 = 10 triangles."
        ]
      ]
    },
    "bm": {
      "prompt": "dodekagon mempunyai 12 sisi. Berapa segi tiga terbentuk melalui pepenjuru dari satu bucu?",
      "answer": [
        [
          "12 − 2 = 10 segi tiga."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "7-sided polygon",
              "bm": "Poligon 7 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    57.96,
                    146.19
                  ],
                  [
                    18,
                    96.09
                  ],
                  [
                    32.26,
                    33.61
                  ],
                  [
                    90,
                    5.81
                  ],
                  [
                    147.74,
                    33.61
                  ],
                  [
                    162,
                    96.09
                  ],
                  [
                    122.04,
                    146.19
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 7"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find the total number of vertices and sides in a heptagon.",
      "answer": [
        [
          "7 vertices and 7 sides, total 14."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah bucu dan sisi bagi heptagon.",
      "answer": [
        [
          "7 bucu dan 7 sisi; jumlah 14."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "9-sided polygon",
              "bm": "Poligon 9 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    64.99,
                    146.91
                  ],
                  [
                    26.68,
                    114.76
                  ],
                  [
                    18,
                    65.51
                  ],
                  [
                    43.01,
                    22.2
                  ],
                  [
                    90,
                    5.09
                  ],
                  [
                    136.99,
                    22.2
                  ],
                  [
                    162,
                    65.51
                  ],
                  [
                    153.32,
                    114.76
                  ],
                  [
                    115.01,
                    146.91
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 9"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A designer uses nonagon-shaped tiles for a mural.",
      "parts": [
        "State the number of sides and vertices.",
        "Calculate the total number of diagonals.",
        "Explain how many triangles arise from one vertex."
      ],
      "answer": [
        [
          "9 sides and 9 vertices."
        ],
        [
          "9(9 − 3) ÷ 2 = 27 diagonals."
        ],
        [
          "9 − 2 = 7 triangles."
        ]
      ]
    },
    "bm": {
      "prompt": "Pereka menggunakan jubin berbentuk nonagon untuk mural.",
      "parts": [
        "Nyatakan bilangan sisi dan bucu.",
        "Hitung jumlah pepenjuru.",
        "Terangkan bilangan segi tiga dari satu bucu."
      ],
      "answer": [
        [
          "9 sisi dan 9 bucu."
        ],
        [
          "9(9 − 3) ÷ 2 = 27 pepenjuru."
        ],
        [
          "9 − 2 = 7 segi tiga."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "4-sided polygon",
              "bm": "Poligon 4 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    18,
                    148
                  ],
                  [
                    18,
                    4
                  ],
                  [
                    162,
                    4
                  ],
                  [
                    162,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 4"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A designer uses quadrilateral-shaped tiles for a mural.",
      "parts": [
        "State the number of sides and vertices.",
        "Calculate the total number of diagonals.",
        "Explain how many triangles arise from one vertex."
      ],
      "answer": [
        [
          "4 sides and 4 vertices."
        ],
        [
          "4(4 − 3) ÷ 2 = 2 diagonals."
        ],
        [
          "4 − 2 = 2 triangles."
        ]
      ]
    },
    "bm": {
      "prompt": "Pereka menggunakan jubin berbentuk segi empat untuk mural.",
      "parts": [
        "Nyatakan bilangan sisi dan bucu.",
        "Hitung jumlah pepenjuru.",
        "Terangkan bilangan segi tiga dari satu bucu."
      ],
      "answer": [
        [
          "4 sisi dan 4 bucu."
        ],
        [
          "4(4 − 3) ÷ 2 = 2 pepenjuru."
        ],
        [
          "4 − 2 = 2 segi tiga."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "6-sided polygon",
              "bm": "Poligon 6 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    54,
                    138.35
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    54,
                    13.65
                  ],
                  [
                    126,
                    13.65
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    126,
                    138.35
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 6"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A designer uses hexagon-shaped tiles for a mural.",
      "parts": [
        "State the number of sides and vertices.",
        "Calculate the total number of diagonals.",
        "Explain how many triangles arise from one vertex."
      ],
      "answer": [
        [
          "6 sides and 6 vertices."
        ],
        [
          "6(6 − 3) ÷ 2 = 9 diagonals."
        ],
        [
          "6 − 2 = 4 triangles."
        ]
      ]
    },
    "bm": {
      "prompt": "Pereka menggunakan jubin berbentuk heksagon untuk mural.",
      "parts": [
        "Nyatakan bilangan sisi dan bucu.",
        "Hitung jumlah pepenjuru.",
        "Terangkan bilangan segi tiga dari satu bucu."
      ],
      "answer": [
        [
          "6 sisi dan 6 bucu."
        ],
        [
          "6(6 − 3) ÷ 2 = 9 pepenjuru."
        ],
        [
          "6 − 2 = 4 segi tiga."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "8-sided polygon",
              "bm": "Poligon 8 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    60.18,
                    148
                  ],
                  [
                    18,
                    105.82
                  ],
                  [
                    18,
                    46.18
                  ],
                  [
                    60.18,
                    4
                  ],
                  [
                    119.82,
                    4
                  ],
                  [
                    162,
                    46.18
                  ],
                  [
                    162,
                    105.82
                  ],
                  [
                    119.82,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 8"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A designer uses octagon-shaped tiles for a mural.",
      "parts": [
        "State the number of sides and vertices.",
        "Calculate the total number of diagonals.",
        "Explain how many triangles arise from one vertex."
      ],
      "answer": [
        [
          "8 sides and 8 vertices."
        ],
        [
          "8(8 − 3) ÷ 2 = 20 diagonals."
        ],
        [
          "8 − 2 = 6 triangles."
        ]
      ]
    },
    "bm": {
      "prompt": "Pereka menggunakan jubin berbentuk oktagon untuk mural.",
      "parts": [
        "Nyatakan bilangan sisi dan bucu.",
        "Hitung jumlah pepenjuru.",
        "Terangkan bilangan segi tiga dari satu bucu."
      ],
      "answer": [
        [
          "8 sisi dan 8 bucu."
        ],
        [
          "8(8 − 3) ÷ 2 = 20 pepenjuru."
        ],
        [
          "8 − 2 = 6 segi tiga."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "10-sided polygon",
              "bm": "Poligon 10 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    67.75,
                    144.48
                  ],
                  [
                    31.75,
                    118.32
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    31.75,
                    33.68
                  ],
                  [
                    67.75,
                    7.52
                  ],
                  [
                    112.25,
                    7.52
                  ],
                  [
                    148.25,
                    33.68
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    148.25,
                    118.32
                  ],
                  [
                    112.25,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 10"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A designer uses decagon-shaped tiles for a mural.",
      "parts": [
        "State the number of sides and vertices.",
        "Calculate the total number of diagonals.",
        "Explain how many triangles arise from one vertex."
      ],
      "answer": [
        [
          "10 sides and 10 vertices."
        ],
        [
          "10(10 − 3) ÷ 2 = 35 diagonals."
        ],
        [
          "10 − 2 = 8 triangles."
        ]
      ]
    },
    "bm": {
      "prompt": "Pereka menggunakan jubin berbentuk dekagon untuk mural.",
      "parts": [
        "Nyatakan bilangan sisi dan bucu.",
        "Hitung jumlah pepenjuru.",
        "Terangkan bilangan segi tiga dari satu bucu."
      ],
      "answer": [
        [
          "10 sisi dan 10 bucu."
        ],
        [
          "10(10 − 3) ÷ 2 = 35 pepenjuru."
        ],
        [
          "10 − 2 = 8 segi tiga."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "concept",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "6-sided polygon",
              "bm": "Poligon 6 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    54,
                    138.35
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    54,
                    13.65
                  ],
                  [
                    126,
                    13.65
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    126,
                    138.35
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 6"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "What is the sum of exterior angles when moving once around a convex polygon?",
      "answer": [
        [
          "360°, for every convex polygon."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah jumlah sudut peluaran apabila bergerak sekali mengelilingi poligon cembung?",
      "answer": [
        [
          "360° bagi setiap poligon cembung."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "concept",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "7-sided polygon",
              "bm": "Poligon 7 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    57.96,
                    146.19
                  ],
                  [
                    18,
                    96.09
                  ],
                  [
                    32.26,
                    33.61
                  ],
                  [
                    90,
                    5.81
                  ],
                  [
                    147.74,
                    33.61
                  ],
                  [
                    162,
                    96.09
                  ],
                  [
                    122.04,
                    146.19
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 7"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "How many triangles can be made from one vertex of the heptagon?",
      "answer": [
        [
          "7 − 2 = 5."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapa segi tiga boleh dibina dari satu bucu heptagon?",
      "answer": [
        [
          "7 − 2 = 5."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "concept",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "8-sided polygon",
              "bm": "Poligon 8 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    60.18,
                    148
                  ],
                  [
                    18,
                    105.82
                  ],
                  [
                    18,
                    46.18
                  ],
                  [
                    60.18,
                    4
                  ],
                  [
                    119.82,
                    4
                  ],
                  [
                    162,
                    46.18
                  ],
                  [
                    162,
                    105.82
                  ],
                  [
                    119.82,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 8"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "What is the sum of exterior angles when moving once around a convex polygon?",
      "answer": [
        [
          "360°, for every convex polygon."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah jumlah sudut peluaran apabila bergerak sekali mengelilingi poligon cembung?",
      "answer": [
        [
          "360° bagi setiap poligon cembung."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "concept",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "9-sided polygon",
              "bm": "Poligon 9 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    64.99,
                    146.91
                  ],
                  [
                    26.68,
                    114.76
                  ],
                  [
                    18,
                    65.51
                  ],
                  [
                    43.01,
                    22.2
                  ],
                  [
                    90,
                    5.09
                  ],
                  [
                    136.99,
                    22.2
                  ],
                  [
                    162,
                    65.51
                  ],
                  [
                    153.32,
                    114.76
                  ],
                  [
                    115.01,
                    146.91
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 9"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "How many triangles can be made from one vertex of the nonagon?",
      "answer": [
        [
          "9 − 2 = 7."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapa segi tiga boleh dibina dari satu bucu nonagon?",
      "answer": [
        [
          "9 − 2 = 7."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "10-sided polygon",
              "bm": "Poligon 10 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    67.75,
                    144.48
                  ],
                  [
                    31.75,
                    118.32
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    31.75,
                    33.68
                  ],
                  [
                    67.75,
                    7.52
                  ],
                  [
                    112.25,
                    7.52
                  ],
                  [
                    148.25,
                    33.68
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    148.25,
                    118.32
                  ],
                  [
                    112.25,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 10"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find the sum of interior angles of a 10-sided polygon using triangles.",
      "answer": [
        [
          "(10 − 2) × 180° = 1440°."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah sudut pedalaman poligon 10 sisi menggunakan segi tiga.",
      "answer": [
        [
          "(10 − 2) × 180° = 1440°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "12-sided polygon",
              "bm": "Poligon 12 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    70.71,
                    148
                  ],
                  [
                    37.29,
                    128.71
                  ],
                  [
                    18,
                    95.29
                  ],
                  [
                    18,
                    56.71
                  ],
                  [
                    37.29,
                    23.29
                  ],
                  [
                    70.71,
                    4
                  ],
                  [
                    109.29,
                    4
                  ],
                  [
                    142.71,
                    23.29
                  ],
                  [
                    162,
                    56.71
                  ],
                  [
                    162,
                    95.29
                  ],
                  [
                    142.71,
                    128.71
                  ],
                  [
                    109.29,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 12"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A dodecagon is divided into triangles from one vertex. Find the angle sum.",
      "answer": [
        [
          "(12 − 2) × 180° = 1800°."
        ]
      ]
    },
    "bm": {
      "prompt": "dodekagon dibahagikan kepada segi tiga dari satu bucu. Cari jumlah sudutnya.",
      "answer": [
        [
          "(12 − 2) × 180° = 1800°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "5-sided polygon",
              "bm": "Poligon 5 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    45.5,
                    144.48
                  ],
                  [
                    18,
                    59.83
                  ],
                  [
                    90,
                    7.52
                  ],
                  [
                    162,
                    59.83
                  ],
                  [
                    134.5,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 5"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find the sum of interior angles of a pentagon.",
      "answer": [
        [
          "(5 − 2) × 180° = 540°."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah sudut pedalaman pentagon.",
      "answer": [
        [
          "(5 − 2) × 180° = 540°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "6-sided polygon",
              "bm": "Poligon 6 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    54,
                    138.35
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    54,
                    13.65
                  ],
                  [
                    126,
                    13.65
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    126,
                    138.35
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 6"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find the sum of interior angles of a 6-sided polygon using triangles.",
      "answer": [
        [
          "(6 − 2) × 180° = 720°."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah sudut pedalaman poligon 6 sisi menggunakan segi tiga.",
      "answer": [
        [
          "(6 − 2) × 180° = 720°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "8-sided polygon",
              "bm": "Poligon 8 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    60.18,
                    148
                  ],
                  [
                    18,
                    105.82
                  ],
                  [
                    18,
                    46.18
                  ],
                  [
                    60.18,
                    4
                  ],
                  [
                    119.82,
                    4
                  ],
                  [
                    162,
                    46.18
                  ],
                  [
                    162,
                    105.82
                  ],
                  [
                    119.82,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 8"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A octagon is divided into triangles from one vertex. Find the angle sum.",
      "answer": [
        [
          "(8 − 2) × 180° = 1080°."
        ]
      ]
    },
    "bm": {
      "prompt": "oktagon dibahagikan kepada segi tiga dari satu bucu. Cari jumlah sudutnya.",
      "answer": [
        [
          "(8 − 2) × 180° = 1080°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "10-sided polygon",
              "bm": "Poligon 10 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    67.75,
                    144.48
                  ],
                  [
                    31.75,
                    118.32
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    31.75,
                    33.68
                  ],
                  [
                    67.75,
                    7.52
                  ],
                  [
                    112.25,
                    7.52
                  ],
                  [
                    148.25,
                    33.68
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    148.25,
                    118.32
                  ],
                  [
                    112.25,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 10"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find the sum of interior angles of a decagon.",
      "answer": [
        [
          "(10 − 2) × 180° = 1440°."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah sudut pedalaman dekagon.",
      "answer": [
        [
          "(10 − 2) × 180° = 1440°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "12-sided polygon",
              "bm": "Poligon 12 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    70.71,
                    148
                  ],
                  [
                    37.29,
                    128.71
                  ],
                  [
                    18,
                    95.29
                  ],
                  [
                    18,
                    56.71
                  ],
                  [
                    37.29,
                    23.29
                  ],
                  [
                    70.71,
                    4
                  ],
                  [
                    109.29,
                    4
                  ],
                  [
                    142.71,
                    23.29
                  ],
                  [
                    162,
                    56.71
                  ],
                  [
                    162,
                    95.29
                  ],
                  [
                    142.71,
                    128.71
                  ],
                  [
                    109.29,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 12"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find the sum of interior angles of a 12-sided polygon using triangles.",
      "answer": [
        [
          "(12 − 2) × 180° = 1800°."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah sudut pedalaman poligon 12 sisi menggunakan segi tiga.",
      "answer": [
        [
          "(12 − 2) × 180° = 1800°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "7-sided polygon",
              "bm": "Poligon 7 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    57.96,
                    146.19
                  ],
                  [
                    18,
                    96.09
                  ],
                  [
                    32.26,
                    33.61
                  ],
                  [
                    90,
                    5.81
                  ],
                  [
                    147.74,
                    33.61
                  ],
                  [
                    162,
                    96.09
                  ],
                  [
                    122.04,
                    146.19
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 7"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A heptagon is divided into triangles from one vertex. Find the angle sum.",
      "answer": [
        [
          "(7 − 2) × 180° = 900°."
        ]
      ]
    },
    "bm": {
      "prompt": "heptagon dibahagikan kepada segi tiga dari satu bucu. Cari jumlah sudutnya.",
      "answer": [
        [
          "(7 − 2) × 180° = 900°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "9-sided polygon",
              "bm": "Poligon 9 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    64.99,
                    146.91
                  ],
                  [
                    26.68,
                    114.76
                  ],
                  [
                    18,
                    65.51
                  ],
                  [
                    43.01,
                    22.2
                  ],
                  [
                    90,
                    5.09
                  ],
                  [
                    136.99,
                    22.2
                  ],
                  [
                    162,
                    65.51
                  ],
                  [
                    153.32,
                    114.76
                  ],
                  [
                    115.01,
                    146.91
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 9"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find the sum of interior angles of a nonagon.",
      "answer": [
        [
          "(9 − 2) × 180° = 1260°."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah sudut pedalaman nonagon.",
      "answer": [
        [
          "(9 − 2) × 180° = 1260°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "4-sided polygon",
              "bm": "Poligon 4 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    18,
                    148
                  ],
                  [
                    18,
                    4
                  ],
                  [
                    162,
                    4
                  ],
                  [
                    162,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 4"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find the sum of interior angles of a 4-sided polygon using triangles.",
      "answer": [
        [
          "(4 − 2) × 180° = 360°."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah sudut pedalaman poligon 4 sisi menggunakan segi tiga.",
      "answer": [
        [
          "(4 − 2) × 180° = 360°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "6-sided polygon",
              "bm": "Poligon 6 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    54,
                    138.35
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    54,
                    13.65
                  ],
                  [
                    126,
                    13.65
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    126,
                    138.35
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 6"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A hexagon is divided into triangles from one vertex. Find the angle sum.",
      "answer": [
        [
          "(6 − 2) × 180° = 720°."
        ]
      ]
    },
    "bm": {
      "prompt": "heksagon dibahagikan kepada segi tiga dari satu bucu. Cari jumlah sudutnya.",
      "answer": [
        [
          "(6 − 2) × 180° = 720°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "8-sided polygon",
              "bm": "Poligon 8 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    60.18,
                    148
                  ],
                  [
                    18,
                    105.82
                  ],
                  [
                    18,
                    46.18
                  ],
                  [
                    60.18,
                    4
                  ],
                  [
                    119.82,
                    4
                  ],
                  [
                    162,
                    46.18
                  ],
                  [
                    162,
                    105.82
                  ],
                  [
                    119.82,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 8"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "An architect sketches a 8-sided courtyard.",
      "parts": [
        "Find the number of triangles from one vertex.",
        "Calculate the sum of interior angles.",
        "Find the total exterior-angle sum."
      ],
      "answer": [
        [
          "8 − 2 = 6."
        ],
        [
          "(8 − 2) × 180° = 1080°."
        ],
        [
          "360° around a convex polygon."
        ]
      ]
    },
    "bm": {
      "prompt": "Arkitek melakar laman 8 sisi.",
      "parts": [
        "Cari bilangan segi tiga dari satu bucu.",
        "Hitung jumlah sudut pedalaman.",
        "Cari jumlah sudut peluaran."
      ],
      "answer": [
        [
          "8 − 2 = 6."
        ],
        [
          "(8 − 2) × 180° = 1080°."
        ],
        [
          "360° untuk poligon cembung."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "10-sided polygon",
              "bm": "Poligon 10 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    67.75,
                    144.48
                  ],
                  [
                    31.75,
                    118.32
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    31.75,
                    33.68
                  ],
                  [
                    67.75,
                    7.52
                  ],
                  [
                    112.25,
                    7.52
                  ],
                  [
                    148.25,
                    33.68
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    148.25,
                    118.32
                  ],
                  [
                    112.25,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 10"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "An architect sketches a 10-sided courtyard.",
      "parts": [
        "Find the number of triangles from one vertex.",
        "Calculate the sum of interior angles.",
        "Find the total exterior-angle sum."
      ],
      "answer": [
        [
          "10 − 2 = 8."
        ],
        [
          "(10 − 2) × 180° = 1440°."
        ],
        [
          "360° around a convex polygon."
        ]
      ]
    },
    "bm": {
      "prompt": "Arkitek melakar laman 10 sisi.",
      "parts": [
        "Cari bilangan segi tiga dari satu bucu.",
        "Hitung jumlah sudut pedalaman.",
        "Cari jumlah sudut peluaran."
      ],
      "answer": [
        [
          "10 − 2 = 8."
        ],
        [
          "(10 − 2) × 180° = 1440°."
        ],
        [
          "360° untuk poligon cembung."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "3-sided polygon",
              "bm": "Poligon 3 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    18,
                    138.35
                  ],
                  [
                    90,
                    13.65
                  ],
                  [
                    162,
                    138.35
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 3"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "An architect sketches a 3-sided courtyard.",
      "parts": [
        "Find the number of triangles from one vertex.",
        "Calculate the sum of interior angles.",
        "Find the total exterior-angle sum."
      ],
      "answer": [
        [
          "3 − 2 = 1."
        ],
        [
          "(3 − 2) × 180° = 180°."
        ],
        [
          "360° around a convex polygon."
        ]
      ]
    },
    "bm": {
      "prompt": "Arkitek melakar laman 3 sisi.",
      "parts": [
        "Cari bilangan segi tiga dari satu bucu.",
        "Hitung jumlah sudut pedalaman.",
        "Cari jumlah sudut peluaran."
      ],
      "answer": [
        [
          "3 − 2 = 1."
        ],
        [
          "(3 − 2) × 180° = 180°."
        ],
        [
          "360° untuk poligon cembung."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "4-sided polygon",
              "bm": "Poligon 4 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    18,
                    148
                  ],
                  [
                    18,
                    4
                  ],
                  [
                    162,
                    4
                  ],
                  [
                    162,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 4"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "An architect sketches a 4-sided courtyard.",
      "parts": [
        "Find the number of triangles from one vertex.",
        "Calculate the sum of interior angles.",
        "Find the total exterior-angle sum."
      ],
      "answer": [
        [
          "4 − 2 = 2."
        ],
        [
          "(4 − 2) × 180° = 360°."
        ],
        [
          "360° around a convex polygon."
        ]
      ]
    },
    "bm": {
      "prompt": "Arkitek melakar laman 4 sisi.",
      "parts": [
        "Cari bilangan segi tiga dari satu bucu.",
        "Hitung jumlah sudut pedalaman.",
        "Cari jumlah sudut peluaran."
      ],
      "answer": [
        [
          "4 − 2 = 2."
        ],
        [
          "(4 − 2) × 180° = 360°."
        ],
        [
          "360° untuk poligon cembung."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "5-sided polygon",
              "bm": "Poligon 5 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    45.5,
                    144.48
                  ],
                  [
                    18,
                    59.83
                  ],
                  [
                    90,
                    7.52
                  ],
                  [
                    162,
                    59.83
                  ],
                  [
                    134.5,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 5"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "An architect sketches a 5-sided courtyard.",
      "parts": [
        "Find the number of triangles from one vertex.",
        "Calculate the sum of interior angles.",
        "Find the total exterior-angle sum."
      ],
      "answer": [
        [
          "5 − 2 = 3."
        ],
        [
          "(5 − 2) × 180° = 540°."
        ],
        [
          "360° around a convex polygon."
        ]
      ]
    },
    "bm": {
      "prompt": "Arkitek melakar laman 5 sisi.",
      "parts": [
        "Cari bilangan segi tiga dari satu bucu.",
        "Hitung jumlah sudut pedalaman.",
        "Cari jumlah sudut peluaran."
      ],
      "answer": [
        [
          "5 − 2 = 3."
        ],
        [
          "(5 − 2) × 180° = 540°."
        ],
        [
          "360° untuk poligon cembung."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "9-sided polygon",
              "bm": "Poligon 9 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    64.99,
                    146.91
                  ],
                  [
                    26.68,
                    114.76
                  ],
                  [
                    18,
                    65.51
                  ],
                  [
                    43.01,
                    22.2
                  ],
                  [
                    90,
                    5.09
                  ],
                  [
                    136.99,
                    22.2
                  ],
                  [
                    162,
                    65.51
                  ],
                  [
                    153.32,
                    114.76
                  ],
                  [
                    115.01,
                    146.91
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 9"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "What makes a polygon regular?",
      "answer": [
        [
          "All sides are equal and all interior angles are equal."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah ciri poligon sekata?",
      "answer": [
        [
          "Semua sisi sama panjang dan semua sudut pedalaman sama besar."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "10-sided polygon",
              "bm": "Poligon 10 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    67.75,
                    144.48
                  ],
                  [
                    31.75,
                    118.32
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    31.75,
                    33.68
                  ],
                  [
                    67.75,
                    7.52
                  ],
                  [
                    112.25,
                    7.52
                  ],
                  [
                    148.25,
                    33.68
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    148.25,
                    118.32
                  ],
                  [
                    112.25,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 10"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "What is the sum of exterior angles of a regular polygon?",
      "answer": [
        [
          "360°."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapakah jumlah sudut peluaran poligon sekata?",
      "answer": [
        [
          "360°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "12-sided polygon",
              "bm": "Poligon 12 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    70.71,
                    148
                  ],
                  [
                    37.29,
                    128.71
                  ],
                  [
                    18,
                    95.29
                  ],
                  [
                    18,
                    56.71
                  ],
                  [
                    37.29,
                    23.29
                  ],
                  [
                    70.71,
                    4
                  ],
                  [
                    109.29,
                    4
                  ],
                  [
                    142.71,
                    23.29
                  ],
                  [
                    162,
                    56.71
                  ],
                  [
                    162,
                    95.29
                  ],
                  [
                    142.71,
                    128.71
                  ],
                  [
                    109.29,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 12"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "What makes a polygon regular?",
      "answer": [
        [
          "All sides are equal and all interior angles are equal."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah ciri poligon sekata?",
      "answer": [
        [
          "Semua sisi sama panjang dan semua sudut pedalaman sama besar."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "5-sided polygon",
              "bm": "Poligon 5 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    45.5,
                    144.48
                  ],
                  [
                    18,
                    59.83
                  ],
                  [
                    90,
                    7.52
                  ],
                  [
                    162,
                    59.83
                  ],
                  [
                    134.5,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 5"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "What is the sum of exterior angles of a regular polygon?",
      "answer": [
        [
          "360°."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapakah jumlah sudut peluaran poligon sekata?",
      "answer": [
        [
          "360°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "6-sided polygon",
              "bm": "Poligon 6 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    54,
                    138.35
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    54,
                    13.65
                  ],
                  [
                    126,
                    13.65
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    126,
                    138.35
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 6"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Calculate each interior angle of a regular 6-sided polygon.",
      "answer": [
        [
          "180° − 360° ÷ 6 = 120°."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung setiap sudut pedalaman poligon sekata 6 sisi.",
      "answer": [
        [
          "180° − 360° ÷ 6 = 120°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "8-sided polygon",
              "bm": "Poligon 8 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    60.18,
                    148
                  ],
                  [
                    18,
                    105.82
                  ],
                  [
                    18,
                    46.18
                  ],
                  [
                    60.18,
                    4
                  ],
                  [
                    119.82,
                    4
                  ],
                  [
                    162,
                    46.18
                  ],
                  [
                    162,
                    105.82
                  ],
                  [
                    119.82,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 8"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A regular octagon has equal exterior angles. Find one.",
      "answer": [
        [
          "360° ÷ 8 = 45°."
        ]
      ]
    },
    "bm": {
      "prompt": "oktagon sekata mempunyai sudut peluaran sama besar. Cari satu sudut.",
      "answer": [
        [
          "360° ÷ 8 = 45°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "10-sided polygon",
              "bm": "Poligon 10 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    67.75,
                    144.48
                  ],
                  [
                    31.75,
                    118.32
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    31.75,
                    33.68
                  ],
                  [
                    67.75,
                    7.52
                  ],
                  [
                    112.25,
                    7.52
                  ],
                  [
                    148.25,
                    33.68
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    148.25,
                    118.32
                  ],
                  [
                    112.25,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 10"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find each exterior angle of a regular decagon.",
      "answer": [
        [
          "360° ÷ 10 = 36°."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari setiap sudut peluaran dekagon sekata.",
      "answer": [
        [
          "360° ÷ 10 = 36°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "12-sided polygon",
              "bm": "Poligon 12 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    70.71,
                    148
                  ],
                  [
                    37.29,
                    128.71
                  ],
                  [
                    18,
                    95.29
                  ],
                  [
                    18,
                    56.71
                  ],
                  [
                    37.29,
                    23.29
                  ],
                  [
                    70.71,
                    4
                  ],
                  [
                    109.29,
                    4
                  ],
                  [
                    142.71,
                    23.29
                  ],
                  [
                    162,
                    56.71
                  ],
                  [
                    162,
                    95.29
                  ],
                  [
                    142.71,
                    128.71
                  ],
                  [
                    109.29,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 12"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Calculate each interior angle of a regular 12-sided polygon.",
      "answer": [
        [
          "180° − 360° ÷ 12 = 150°."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung setiap sudut pedalaman poligon sekata 12 sisi.",
      "answer": [
        [
          "180° − 360° ÷ 12 = 150°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "7-sided polygon",
              "bm": "Poligon 7 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    57.96,
                    146.19
                  ],
                  [
                    18,
                    96.09
                  ],
                  [
                    32.26,
                    33.61
                  ],
                  [
                    90,
                    5.81
                  ],
                  [
                    147.74,
                    33.61
                  ],
                  [
                    162,
                    96.09
                  ],
                  [
                    122.04,
                    146.19
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 7"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A regular heptagon has equal exterior angles. Find one.",
      "answer": [
        [
          "360° ÷ 7 = 51.42857142857143°."
        ]
      ]
    },
    "bm": {
      "prompt": "heptagon sekata mempunyai sudut peluaran sama besar. Cari satu sudut.",
      "answer": [
        [
          "360° ÷ 7 = 51.42857142857143°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "9-sided polygon",
              "bm": "Poligon 9 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    64.99,
                    146.91
                  ],
                  [
                    26.68,
                    114.76
                  ],
                  [
                    18,
                    65.51
                  ],
                  [
                    43.01,
                    22.2
                  ],
                  [
                    90,
                    5.09
                  ],
                  [
                    136.99,
                    22.2
                  ],
                  [
                    162,
                    65.51
                  ],
                  [
                    153.32,
                    114.76
                  ],
                  [
                    115.01,
                    146.91
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 9"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find each exterior angle of a regular nonagon.",
      "answer": [
        [
          "360° ÷ 9 = 40°."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari setiap sudut peluaran nonagon sekata.",
      "answer": [
        [
          "360° ÷ 9 = 40°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "4-sided polygon",
              "bm": "Poligon 4 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    18,
                    148
                  ],
                  [
                    18,
                    4
                  ],
                  [
                    162,
                    4
                  ],
                  [
                    162,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 4"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Calculate each interior angle of a regular 4-sided polygon.",
      "answer": [
        [
          "180° − 360° ÷ 4 = 90°."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung setiap sudut pedalaman poligon sekata 4 sisi.",
      "answer": [
        [
          "180° − 360° ÷ 4 = 90°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "6-sided polygon",
              "bm": "Poligon 6 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    54,
                    138.35
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    54,
                    13.65
                  ],
                  [
                    126,
                    13.65
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    126,
                    138.35
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 6"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A regular hexagon has equal exterior angles. Find one.",
      "answer": [
        [
          "360° ÷ 6 = 60°."
        ]
      ]
    },
    "bm": {
      "prompt": "heksagon sekata mempunyai sudut peluaran sama besar. Cari satu sudut.",
      "answer": [
        [
          "360° ÷ 6 = 60°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "8-sided polygon",
              "bm": "Poligon 8 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    60.18,
                    148
                  ],
                  [
                    18,
                    105.82
                  ],
                  [
                    18,
                    46.18
                  ],
                  [
                    60.18,
                    4
                  ],
                  [
                    119.82,
                    4
                  ],
                  [
                    162,
                    46.18
                  ],
                  [
                    162,
                    105.82
                  ],
                  [
                    119.82,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 8"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Find each exterior angle of a regular octagon.",
      "answer": [
        [
          "360° ÷ 8 = 45°."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari setiap sudut peluaran oktagon sekata.",
      "answer": [
        [
          "360° ÷ 8 = 45°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "10-sided polygon",
              "bm": "Poligon 10 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    67.75,
                    144.48
                  ],
                  [
                    31.75,
                    118.32
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    31.75,
                    33.68
                  ],
                  [
                    67.75,
                    7.52
                  ],
                  [
                    112.25,
                    7.52
                  ],
                  [
                    148.25,
                    33.68
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    148.25,
                    118.32
                  ],
                  [
                    112.25,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 10"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "Calculate each interior angle of a regular 10-sided polygon.",
      "answer": [
        [
          "180° − 360° ÷ 10 = 144°."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung setiap sudut pedalaman poligon sekata 10 sisi.",
      "answer": [
        [
          "180° − 360° ÷ 10 = 144°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "3-sided polygon",
              "bm": "Poligon 3 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    18,
                    138.35
                  ],
                  [
                    90,
                    13.65
                  ],
                  [
                    162,
                    138.35
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 3"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A regular triangle has equal exterior angles. Find one.",
      "answer": [
        [
          "360° ÷ 3 = 120°."
        ]
      ]
    },
    "bm": {
      "prompt": "segi tiga sekata mempunyai sudut peluaran sama besar. Cari satu sudut.",
      "answer": [
        [
          "360° ÷ 3 = 120°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "4-sided polygon",
              "bm": "Poligon 4 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    18,
                    148
                  ],
                  [
                    18,
                    4
                  ],
                  [
                    162,
                    4
                  ],
                  [
                    162,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 4"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A maker designs a regular quadrilateral-shaped badge.",
      "parts": [
        "Find each exterior angle.",
        "Find each interior angle.",
        "Check that their sum is 180°."
      ],
      "answer": [
        [
          "360° ÷ 4 = 90°."
        ],
        [
          "180° − 90° = 90°."
        ],
        [
          "90° + 90° = 180°."
        ]
      ]
    },
    "bm": {
      "prompt": "Pembuat mereka lencana berbentuk segi empat sekata.",
      "parts": [
        "Cari setiap sudut peluaran.",
        "Cari setiap sudut pedalaman.",
        "Semak jumlah kedua-duanya ialah 180°."
      ],
      "answer": [
        [
          "360° ÷ 4 = 90°."
        ],
        [
          "180° − 90° = 90°."
        ],
        [
          "90° + 90° = 180°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "5-sided polygon",
              "bm": "Poligon 5 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    45.5,
                    144.48
                  ],
                  [
                    18,
                    59.83
                  ],
                  [
                    90,
                    7.52
                  ],
                  [
                    162,
                    59.83
                  ],
                  [
                    134.5,
                    144.48
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 5"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A maker designs a regular pentagon-shaped badge.",
      "parts": [
        "Find each exterior angle.",
        "Find each interior angle.",
        "Check that their sum is 180°."
      ],
      "answer": [
        [
          "360° ÷ 5 = 72°."
        ],
        [
          "180° − 72° = 108°."
        ],
        [
          "72° + 108° = 180°."
        ]
      ]
    },
    "bm": {
      "prompt": "Pembuat mereka lencana berbentuk pentagon sekata.",
      "parts": [
        "Cari setiap sudut peluaran.",
        "Cari setiap sudut pedalaman.",
        "Semak jumlah kedua-duanya ialah 180°."
      ],
      "answer": [
        [
          "360° ÷ 5 = 72°."
        ],
        [
          "180° − 72° = 108°."
        ],
        [
          "72° + 108° = 180°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "6-sided polygon",
              "bm": "Poligon 6 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    54,
                    138.35
                  ],
                  [
                    18,
                    76
                  ],
                  [
                    54,
                    13.65
                  ],
                  [
                    126,
                    13.65
                  ],
                  [
                    162,
                    76
                  ],
                  [
                    126,
                    138.35
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 6"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A maker designs a regular hexagon-shaped badge.",
      "parts": [
        "Find each exterior angle.",
        "Find each interior angle.",
        "Check that their sum is 180°."
      ],
      "answer": [
        [
          "360° ÷ 6 = 60°."
        ],
        [
          "180° − 60° = 120°."
        ],
        [
          "60° + 120° = 180°."
        ]
      ]
    },
    "bm": {
      "prompt": "Pembuat mereka lencana berbentuk heksagon sekata.",
      "parts": [
        "Cari setiap sudut peluaran.",
        "Cari setiap sudut pedalaman.",
        "Semak jumlah kedua-duanya ialah 180°."
      ],
      "answer": [
        [
          "360° ÷ 6 = 60°."
        ],
        [
          "180° − 60° = 120°."
        ],
        [
          "60° + 120° = 180°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "7-sided polygon",
              "bm": "Poligon 7 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    57.96,
                    146.19
                  ],
                  [
                    18,
                    96.09
                  ],
                  [
                    32.26,
                    33.61
                  ],
                  [
                    90,
                    5.81
                  ],
                  [
                    147.74,
                    33.61
                  ],
                  [
                    162,
                    96.09
                  ],
                  [
                    122.04,
                    146.19
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 7"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A maker designs a regular heptagon-shaped badge.",
      "parts": [
        "Find each exterior angle.",
        "Find each interior angle.",
        "Check that their sum is 180°."
      ],
      "answer": [
        [
          "360° ÷ 7 = 51.42857142857143°."
        ],
        [
          "180° − 51.42857142857143° = 128.57142857142856°."
        ],
        [
          "51.42857142857143° + 128.57142857142856° = 180°."
        ]
      ]
    },
    "bm": {
      "prompt": "Pembuat mereka lencana berbentuk heptagon sekata.",
      "parts": [
        "Cari setiap sudut peluaran.",
        "Cari setiap sudut pedalaman.",
        "Semak jumlah kedua-duanya ialah 180°."
      ],
      "answer": [
        [
          "360° ÷ 7 = 51.42857142857143°."
        ],
        [
          "180° − 51.42857142857143° = 128.57142857142856°."
        ],
        [
          "51.42857142857143° + 128.57142857142856° = 180°."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "geometry-diagram",
        "title": {
          "dlp": "Polygon diagram",
          "bm": "Rajah poligon"
        },
        "panels": [
          {
            "title": {
              "dlp": "8-sided polygon",
              "bm": "Poligon 8 sisi"
            },
            "description": {
              "dlp": "All marked vertices are joined in order.",
              "bm": "Semua bucu ditandakan dan disambungkan mengikut turutan."
            },
            "paths": [
              {
                "points": [
                  [
                    60.18,
                    148
                  ],
                  [
                    18,
                    105.82
                  ],
                  [
                    18,
                    46.18
                  ],
                  [
                    60.18,
                    4
                  ],
                  [
                    119.82,
                    4
                  ],
                  [
                    162,
                    46.18
                  ],
                  [
                    162,
                    105.82
                  ],
                  [
                    119.82,
                    148
                  ]
                ],
                "closed": true
              }
            ],
            "labels": [
              {
                "at": [
                  90,
                  168
                ],
                "text": "n = 8"
              }
            ],
            "viewBox": [
              180,
              174
            ]
          }
        ],
        "layout": "compact"
      }
    ],
    "dlp": {
      "prompt": "A maker designs a regular octagon-shaped badge.",
      "parts": [
        "Find each exterior angle.",
        "Find each interior angle.",
        "Check that their sum is 180°."
      ],
      "answer": [
        [
          "360° ÷ 8 = 45°."
        ],
        [
          "180° − 45° = 135°."
        ],
        [
          "45° + 135° = 180°."
        ]
      ]
    },
    "bm": {
      "prompt": "Pembuat mereka lencana berbentuk oktagon sekata.",
      "parts": [
        "Cari setiap sudut peluaran.",
        "Cari setiap sudut pedalaman.",
        "Semak jumlah kedua-duanya ialah 180°."
      ],
      "answer": [
        [
          "360° ÷ 8 = 45°."
        ],
        [
          "180° − 45° = 135°."
        ],
        [
          "45° + 135° = 180°."
        ]
      ]
    }
  }
];
