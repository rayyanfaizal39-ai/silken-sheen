import type { FlashcardReviewMode } from "@/features/flashcards/structuredFlashcard";
import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
export interface MathF2C11Entry {
 subtopic: "11.1" | "11.2" | "11.3" | "11.4";
 mode: FlashcardReviewMode;
 visuals?: MathQuestionVisual[];
 dlp: {prompt:string;parts?:string[];answer:string[][]};
 bm: {prompt:string;parts?:string[];answer:string[][]};
}
export const MATH_F2_C11_BANK: readonly MathF2C11Entry[] = [
  {
    "subtopic": "11.1",
    "mode": "concept",
    "dlp": {
      "prompt": "What is a line of reflection?",
      "answer": [
        [
          "A mirror line that is equally distant from corresponding points."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah garis pantulan?",
      "answer": [
        [
          "Garis cermin yang berjarak sama dari titik-titik sepadan."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "concept",
    "dlp": {
      "prompt": "Which coordinate changes sign when reflecting in the x-axis?",
      "answer": [
        [
          "The y-coordinate."
        ]
      ]
    },
    "bm": {
      "prompt": "Koordinat manakah berubah tanda apabila dipantul pada paksi-x?",
      "answer": [
        [
          "Koordinat-y."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "concept",
    "dlp": {
      "prompt": "Does reflection change the size of a triangle?",
      "answer": [
        [
          "No; lengths and angles remain unchanged."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah pantulan mengubah saiz segi tiga?",
      "answer": [
        [
          "Tidak; panjang dan sudut kekal sama."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -2,
              1
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (-2, 1) under x-axis.",
      "answer": [
        [
          "A′ = (-2, -1)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (-2, 1) selepas paksi-x.",
      "answer": [
        [
          "A′ = (-2, -1)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (-1, 2) under y-axis.",
      "answer": [
        [
          "A′ = (1, 2)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (-1, 2) selepas paksi-y.",
      "answer": [
        [
          "A′ = (1, 2)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              3
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (0, 3) under x-axis.",
      "answer": [
        [
          "A′ = (0, -3)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (0, 3) selepas paksi-x.",
      "answer": [
        [
          "A′ = (0, -3)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              1,
              1
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (1, 1) under y-axis.",
      "answer": [
        [
          "A′ = (-1, 1)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (1, 1) selepas paksi-y.",
      "answer": [
        [
          "A′ = (-1, 1)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -2,
              2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (-2, 2) under x-axis.",
      "answer": [
        [
          "A′ = (-2, -2)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (-2, 2) selepas paksi-x.",
      "answer": [
        [
          "A′ = (-2, -2)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              3
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (-1, 3) under y-axis.",
      "answer": [
        [
          "A′ = (1, 3)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (-1, 3) selepas paksi-y.",
      "answer": [
        [
          "A′ = (1, 3)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              1
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (0, 1) under x-axis.",
      "answer": [
        [
          "A′ = (0, -1)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (0, 1) selepas paksi-x.",
      "answer": [
        [
          "A′ = (0, -1)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              1,
              2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (1, 2) under y-axis.",
      "answer": [
        [
          "A′ = (-1, 2)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (1, 2) selepas paksi-y.",
      "answer": [
        [
          "A′ = (-1, 2)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
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
              2,
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
                1,
                1
              ],
              [
                2,
                1
              ],
              [
                1,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (1, 1), B (2, 1), C (1, 3). Apply x-axis.",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (1, -1), B′ = (2, -1)."
        ],
        [
          "C′ = (1, -3)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (1, 1), B (2, 1), C (1, 3). Lakukan paksi-x.",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (1, -1), B′ = (2, -1)."
        ],
        [
          "C′ = (1, -3)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              2,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              2,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                2,
                1
              ],
              [
                3,
                1
              ],
              [
                2,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (2, 1), B (3, 1), C (2, 3). Apply y-axis.",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (-2, 1), B′ = (-3, 1)."
        ],
        [
          "C′ = (-2, 3)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (2, 1), B (3, 1), C (2, 3). Lakukan paksi-y.",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (-2, 1), B′ = (-3, 1)."
        ],
        [
          "C′ = (-2, 3)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              3,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              3,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                3,
                1
              ],
              [
                4,
                1
              ],
              [
                3,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (3, 1), B (4, 1), C (3, 3). Apply x-axis.",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (3, -1), B′ = (4, -1)."
        ],
        [
          "C′ = (3, -3)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (3, 1), B (4, 1), C (3, 3). Lakukan paksi-x.",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (3, -1), B′ = (4, -1)."
        ],
        [
          "C′ = (3, -3)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              4,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              5,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              4,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                4,
                1
              ],
              [
                5,
                1
              ],
              [
                4,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (4, 1), B (5, 1), C (4, 3). Apply y-axis.",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (-4, 1), B′ = (-5, 1)."
        ],
        [
          "C′ = (-4, 3)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (4, 1), B (5, 1), C (4, 3). Lakukan paksi-y.",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (-4, 1), B′ = (-5, 1)."
        ],
        [
          "C′ = (-4, 3)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What three pieces of information specify a rotation?",
      "answer": [
        [
          "Centre, angle and direction."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah tiga maklumat bagi sesuatu putaran?",
      "answer": [
        [
          "Pusat, sudut dan arah."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the image of (x, y) after 90° anticlockwise about the origin?",
      "answer": [
        [
          "(−y, x)."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah imej (x, y) selepas putaran 90° lawan arah jam pada asalan?",
      "answer": [
        [
          "(−y, x)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "concept",
    "dlp": {
      "prompt": "Does rotation preserve the side lengths of a shape?",
      "answer": [
        [
          "Yes, every corresponding length is unchanged."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah putaran mengekalkan panjang sisi?",
      "answer": [
        [
          "Ya, semua panjang sepadan kekal sama."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -2,
              1
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (-2, 1) under 90° anticlockwise about the origin.",
      "answer": [
        [
          "A′ = (-1, -2)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (-2, 1) selepas 90° lawan arah jam berpusat di asalan.",
      "answer": [
        [
          "A′ = (-1, -2)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (-1, 2) under 90° clockwise about the origin.",
      "answer": [
        [
          "A′ = (2, 1)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (-1, 2) selepas 90° ikut arah jam berpusat di asalan.",
      "answer": [
        [
          "A′ = (2, 1)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              3
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (0, 3) under 90° anticlockwise about the origin.",
      "answer": [
        [
          "A′ = (-3, 0)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (0, 3) selepas 90° lawan arah jam berpusat di asalan.",
      "answer": [
        [
          "A′ = (-3, 0)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              1,
              1
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (1, 1) under 90° clockwise about the origin.",
      "answer": [
        [
          "A′ = (1, -1)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (1, 1) selepas 90° ikut arah jam berpusat di asalan.",
      "answer": [
        [
          "A′ = (1, -1)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -2,
              2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (-2, 2) under 90° anticlockwise about the origin.",
      "answer": [
        [
          "A′ = (-2, -2)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (-2, 2) selepas 90° lawan arah jam berpusat di asalan.",
      "answer": [
        [
          "A′ = (-2, -2)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              3
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (-1, 3) under 90° clockwise about the origin.",
      "answer": [
        [
          "A′ = (3, 1)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (-1, 3) selepas 90° ikut arah jam berpusat di asalan.",
      "answer": [
        [
          "A′ = (3, 1)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              1
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (0, 1) under 90° anticlockwise about the origin.",
      "answer": [
        [
          "A′ = (-1, 0)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (0, 1) selepas 90° lawan arah jam berpusat di asalan.",
      "answer": [
        [
          "A′ = (-1, 0)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              1,
              2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (1, 2) under 90° clockwise about the origin.",
      "answer": [
        [
          "A′ = (2, -1)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (1, 2) selepas 90° ikut arah jam berpusat di asalan.",
      "answer": [
        [
          "A′ = (2, -1)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
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
              2,
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
                1,
                1
              ],
              [
                2,
                1
              ],
              [
                1,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (1, 1), B (2, 1), C (1, 3). Apply 90° anticlockwise about the origin.",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (-1, 1), B′ = (-1, 2)."
        ],
        [
          "C′ = (-3, 1)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (1, 1), B (2, 1), C (1, 3). Lakukan 90° lawan arah jam berpusat di asalan.",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (-1, 1), B′ = (-1, 2)."
        ],
        [
          "C′ = (-3, 1)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              2,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              2,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                2,
                1
              ],
              [
                3,
                1
              ],
              [
                2,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (2, 1), B (3, 1), C (2, 3). Apply 90° clockwise about the origin.",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (1, -2), B′ = (1, -3)."
        ],
        [
          "C′ = (3, -2)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (2, 1), B (3, 1), C (2, 3). Lakukan 90° ikut arah jam berpusat di asalan.",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (1, -2), B′ = (1, -3)."
        ],
        [
          "C′ = (3, -2)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              3,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              3,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                3,
                1
              ],
              [
                4,
                1
              ],
              [
                3,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (3, 1), B (4, 1), C (3, 3). Apply 90° anticlockwise about the origin.",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (-1, 3), B′ = (-1, 4)."
        ],
        [
          "C′ = (-3, 3)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (3, 1), B (4, 1), C (3, 3). Lakukan 90° lawan arah jam berpusat di asalan.",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (-1, 3), B′ = (-1, 4)."
        ],
        [
          "C′ = (-3, 3)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              4,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              5,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              4,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                4,
                1
              ],
              [
                5,
                1
              ],
              [
                4,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (4, 1), B (5, 1), C (4, 3). Apply 90° clockwise about the origin.",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (1, -4), B′ = (1, -5)."
        ],
        [
          "C′ = (3, -4)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (4, 1), B (5, 1), C (4, 3). Lakukan 90° ikut arah jam berpusat di asalan.",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (1, -4), B′ = (1, -5)."
        ],
        [
          "C′ = (3, -4)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What is a translation?",
      "answer": [
        [
          "A movement by the same vector for every point."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah translasi?",
      "answer": [
        [
          "Pergerakan dengan vektor yang sama bagi setiap titik."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What does the vector (3, −2) mean?",
      "answer": [
        [
          "Move 3 units right and 2 units down."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah maksud vektor (3, −2)?",
      "answer": [
        [
          "Gerak 3 unit ke kanan dan 2 unit ke bawah."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "concept",
    "dlp": {
      "prompt": "Does translation change the direction a triangle faces?",
      "answer": [
        [
          "No; its orientation stays the same."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah translasi mengubah orientasi segi tiga?",
      "answer": [
        [
          "Tidak; orientasi kekal sama."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -2,
              1
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (-2, 1) under (−3, 3).",
      "answer": [
        [
          "A′ = (-5, 4)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (-2, 1) selepas (−3, 3).",
      "answer": [
        [
          "A′ = (-5, 4)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (-1, 2) under (2, −2).",
      "answer": [
        [
          "A′ = (1, 0)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (-1, 2) selepas (2, −2).",
      "answer": [
        [
          "A′ = (1, 0)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              3
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (0, 3) under (−3, 3).",
      "answer": [
        [
          "A′ = (-3, 6)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (0, 3) selepas (−3, 3).",
      "answer": [
        [
          "A′ = (-3, 6)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              1,
              1
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (1, 1) under (2, −2).",
      "answer": [
        [
          "A′ = (3, -1)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (1, 1) selepas (2, −2).",
      "answer": [
        [
          "A′ = (3, -1)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -2,
              2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (-2, 2) under (−3, 3).",
      "answer": [
        [
          "A′ = (-5, 5)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (-2, 2) selepas (−3, 3).",
      "answer": [
        [
          "A′ = (-5, 5)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              3
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (-1, 3) under (2, −2).",
      "answer": [
        [
          "A′ = (1, 1)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (-1, 3) selepas (2, −2).",
      "answer": [
        [
          "A′ = (1, 1)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              1
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (0, 1) under (−3, 3).",
      "answer": [
        [
          "A′ = (-3, 4)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (0, 1) selepas (−3, 3).",
      "answer": [
        [
          "A′ = (-3, 4)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              1,
              2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the image of A (1, 2) under (2, −2).",
      "answer": [
        [
          "A′ = (3, 0)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari imej A (1, 2) selepas (2, −2).",
      "answer": [
        [
          "A′ = (3, 0)."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
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
              2,
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
                1,
                1
              ],
              [
                2,
                1
              ],
              [
                1,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (1, 1), B (2, 1), C (1, 3). Apply (−3, 3).",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (-2, 4), B′ = (-1, 4)."
        ],
        [
          "C′ = (-2, 6)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (1, 1), B (2, 1), C (1, 3). Lakukan (−3, 3).",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (-2, 4), B′ = (-1, 4)."
        ],
        [
          "C′ = (-2, 6)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              2,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              2,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                2,
                1
              ],
              [
                3,
                1
              ],
              [
                2,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (2, 1), B (3, 1), C (2, 3). Apply (2, −2).",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (4, -1), B′ = (5, -1)."
        ],
        [
          "C′ = (4, 1)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (2, 1), B (3, 1), C (2, 3). Lakukan (2, −2).",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (4, -1), B′ = (5, -1)."
        ],
        [
          "C′ = (4, 1)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              3,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              3,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                3,
                1
              ],
              [
                4,
                1
              ],
              [
                3,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (3, 1), B (4, 1), C (3, 3). Apply (−3, 3).",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (0, 4), B′ = (1, 4)."
        ],
        [
          "C′ = (0, 6)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (3, 1), B (4, 1), C (3, 3). Lakukan (−3, 3).",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (0, 4), B′ = (1, 4)."
        ],
        [
          "C′ = (0, 6)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              4,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              5,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              4,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                4,
                1
              ],
              [
                5,
                1
              ],
              [
                4,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (4, 1), B (5, 1), C (4, 3). Apply (2, −2).",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (6, -1), B′ = (7, -1)."
        ],
        [
          "C′ = (6, 1)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (4, 1), B (5, 1), C (4, 3). Lakukan (2, −2).",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (6, -1), B′ = (7, -1)."
        ],
        [
          "C′ = (6, 1)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "concept",
    "dlp": {
      "prompt": "What are congruent shapes?",
      "answer": [
        [
          "Shapes with matching side lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah bentuk kongruen?",
      "answer": [
        [
          "Bentuk dengan panjang sisi dan sudut sepadan yang sama."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "concept",
    "dlp": {
      "prompt": "Does a reflection preserve congruence?",
      "answer": [
        [
          "Yes, it changes position or orientation, not size."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah pantulan mengekalkan kekongruenan?",
      "answer": [
        [
          "Ya, kedudukan atau orientasi berubah tetapi saiz sama."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "concept",
    "dlp": {
      "prompt": "Can two triangles of equal area but different shapes be congruent?",
      "answer": [
        [
          "Not necessarily; corresponding sides and angles must match."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah dua segi tiga yang sama luas tetapi berbeza bentuk semestinya kongruen?",
      "answer": [
        [
          "Tidak semestinya; sisi dan sudut sepadan mesti sama."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -2,
              1
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A (-2, 1) is transformed by translation by (2, −2). Find its image and state whether distances are preserved.",
      "answer": [
        [
          "A′ = (0, -1). Distances are preserved."
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A (-2, 1) dikenakan translasi (2, −2). Cari imej dan nyatakan sama ada jarak dikekalkan.",
      "answer": [
        [
          "A′ = (0, -1). Jarak dikekalkan."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A (-1, 2) is transformed by reflection in the y-axis. Find its image and state whether distances are preserved.",
      "answer": [
        [
          "A′ = (1, 2). Distances are preserved."
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A (-1, 2) dikenakan pantulan pada paksi-y. Cari imej dan nyatakan sama ada jarak dikekalkan.",
      "answer": [
        [
          "A′ = (1, 2). Jarak dikekalkan."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              3
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A (0, 3) is transformed by translation by (2, −2). Find its image and state whether distances are preserved.",
      "answer": [
        [
          "A′ = (2, 1). Distances are preserved."
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A (0, 3) dikenakan translasi (2, −2). Cari imej dan nyatakan sama ada jarak dikekalkan.",
      "answer": [
        [
          "A′ = (2, 1). Jarak dikekalkan."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              1,
              1
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A (1, 1) is transformed by reflection in the y-axis. Find its image and state whether distances are preserved.",
      "answer": [
        [
          "A′ = (-1, 1). Distances are preserved."
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A (1, 1) dikenakan pantulan pada paksi-y. Cari imej dan nyatakan sama ada jarak dikekalkan.",
      "answer": [
        [
          "A′ = (-1, 1). Jarak dikekalkan."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -2,
              2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A (-2, 2) is transformed by translation by (2, −2). Find its image and state whether distances are preserved.",
      "answer": [
        [
          "A′ = (0, 0). Distances are preserved."
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A (-2, 2) dikenakan translasi (2, −2). Cari imej dan nyatakan sama ada jarak dikekalkan.",
      "answer": [
        [
          "A′ = (0, 0). Jarak dikekalkan."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              -1,
              3
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A (-1, 3) is transformed by reflection in the y-axis. Find its image and state whether distances are preserved.",
      "answer": [
        [
          "A′ = (1, 3). Distances are preserved."
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A (-1, 3) dikenakan pantulan pada paksi-y. Cari imej dan nyatakan sama ada jarak dikekalkan.",
      "answer": [
        [
          "A′ = (1, 3). Jarak dikekalkan."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              0,
              1
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A (0, 1) is transformed by translation by (2, −2). Find its image and state whether distances are preserved.",
      "answer": [
        [
          "A′ = (2, -1). Distances are preserved."
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A (0, 1) dikenakan translasi (2, −2). Cari imej dan nyatakan sama ada jarak dikekalkan.",
      "answer": [
        [
          "A′ = (2, -1). Jarak dikekalkan."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Object points",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              1,
              2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A (1, 2) is transformed by reflection in the y-axis. Find its image and state whether distances are preserved.",
      "answer": [
        [
          "A′ = (-1, 2). Distances are preserved."
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A (1, 2) dikenakan pantulan pada paksi-y. Cari imej dan nyatakan sama ada jarak dikekalkan.",
      "answer": [
        [
          "A′ = (-1, 2). Jarak dikekalkan."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
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
              2,
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
                1,
                1
              ],
              [
                2,
                1
              ],
              [
                1,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (1, 1), B (2, 1), C (1, 3). Apply translation by (2, −2).",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (3, -1), B′ = (4, -1)."
        ],
        [
          "C′ = (3, 1)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (1, 1), B (2, 1), C (1, 3). Lakukan translasi (2, −2).",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (3, -1), B′ = (4, -1)."
        ],
        [
          "C′ = (3, 1)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              2,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              2,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                2,
                1
              ],
              [
                3,
                1
              ],
              [
                2,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (2, 1), B (3, 1), C (2, 3). Apply reflection in the y-axis.",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (-2, 1), B′ = (-3, 1)."
        ],
        [
          "C′ = (-2, 3)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (2, 1), B (3, 1), C (2, 3). Lakukan pantulan pada paksi-y.",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (-2, 1), B′ = (-3, 1)."
        ],
        [
          "C′ = (-2, 3)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              3,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              4,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              3,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                3,
                1
              ],
              [
                4,
                1
              ],
              [
                3,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (3, 1), B (4, 1), C (3, 3). Apply translation by (2, −2).",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (5, -1), B′ = (6, -1)."
        ],
        [
          "C′ = (5, 1)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (3, 1), B (4, 1), C (3, 3). Lakukan translasi (2, −2).",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (5, -1), B′ = (6, -1)."
        ],
        [
          "C′ = (5, 1)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  },
  {
    "subtopic": "11.4",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Transformation diagram",
          "bm": "Rajah transformasi"
        },
        "description": {
          "dlp": "Original triangular sign",
          "bm": "Titik objek"
        },
        "domain": [
          -10,
          10,
          -10,
          10
        ],
        "step": 2,
        "points": [
          {
            "at": [
              4,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              5,
              1
            ],
            "name": "B"
          },
          {
            "at": [
              4,
              3
            ],
            "name": "C"
          }
        ],
        "paths": [
          {
            "points": [
              [
                4,
                1
              ],
              [
                5,
                1
              ],
              [
                4,
                3
              ]
            ],
            "closed": true
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A triangular sign has vertices A (4, 1), B (5, 1), C (4, 3). Apply reflection in the y-axis.",
      "parts": [
        "Find the images of vertices A and B.",
        "Find the image of vertex C.",
        "Explain whether the image triangle is congruent to the original."
      ],
      "answer": [
        [
          "A′ = (-4, 1), B′ = (-5, 1)."
        ],
        [
          "C′ = (-4, 3)."
        ],
        [
          "Yes. The transformation preserves lengths and angles."
        ]
      ]
    },
    "bm": {
      "prompt": "Papan tanda segi tiga mempunyai bucu A (4, 1), B (5, 1), C (4, 3). Lakukan pantulan pada paksi-y.",
      "parts": [
        "Cari imej bagi bucu A dan B.",
        "Cari imej bagi bucu C.",
        "Terangkan sama ada segi tiga imej kongruen dengan objek asal."
      ],
      "answer": [
        [
          "A′ = (-4, 1), B′ = (-5, 1)."
        ],
        [
          "C′ = (-4, 3)."
        ],
        [
          "Ya. Transformasi mengekalkan panjang dan sudut."
        ]
      ]
    }
  }
];
