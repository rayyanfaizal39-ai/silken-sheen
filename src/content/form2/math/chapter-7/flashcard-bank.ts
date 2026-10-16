import type { FlashcardReviewMode } from "@/features/flashcards/structuredFlashcard";
import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
export interface MathF2C7Entry {
 subtopic: "7.1" | "7.2" | "7.3";
 mode: FlashcardReviewMode;
 visuals?: MathQuestionVisual[];
 dlp: { prompt: string; parts?: string[]; answer: string[][] };
 bm: { prompt: string; parts?: string[]; answer: string[][] };
}
export const MATH_F2_C7_BANK: readonly MathF2C7Entry[] = [
  {
    "subtopic": "7.1",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              3
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Which coordinate is written first in an ordered pair?",
      "answer": [
        [
          "The x-coordinate."
        ]
      ]
    },
    "bm": {
      "prompt": "Koordinat manakah ditulis dahulu dalam pasangan tertib?",
      "answer": [
        [
          "Koordinat-x."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -4,
              5
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "What does a negative x-coordinate indicate?",
      "answer": [
        [
          "The point is left of the y-axis."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah maksud koordinat-x negatif?",
      "answer": [
        [
          "Titik berada di kiri paksi-y."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -3,
              -2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Which axis contains points whose x-coordinate is zero?",
      "answer": [
        [
          "The y-axis."
        ]
      ]
    },
    "bm": {
      "prompt": "Paksi manakah mengandungi titik dengan koordinat-x sifar?",
      "answer": [
        [
          "Paksi-y."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              6,
              -4
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "How do you identify the quadrant of a point?",
      "answer": [
        [
          "Use the signs of x and y."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagaimanakah menentukan sukuan bagi sesuatu titik?",
      "answer": [
        [
          "Gunakan tanda positif atau negatif x dan y."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              5
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A is at (0, 5). State whether it is on an axis or in a quadrant.",
      "answer": [
        [
          "y-axis"
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A pada (0, 5). Nyatakan sama ada pada paksi atau dalam sukuan.",
      "answer": [
        [
          "paksi-y"
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -6,
              0
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Reflect A (-6, 0) in the x-axis. Find the image coordinate.",
      "answer": [
        [
          "(-6, 0)."
        ]
      ]
    },
    "bm": {
      "prompt": "Pantulkan A (-6, 0) pada paksi-x. Cari koordinat imej.",
      "answer": [
        [
          "(-6, 0)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              5,
              0
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A is plotted at (5, 0). State its x- and y-coordinates.",
      "answer": [
        [
          "x = 5, y = 0."
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A diplot pada (5, 0). Nyatakan koordinat-x dan koordinat-y.",
      "answer": [
        [
          "x = 5, y = 0."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -7
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A is at (0, -7). State whether it is on an axis or in a quadrant.",
      "answer": [
        [
          "y-axis"
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A pada (0, -7). Nyatakan sama ada pada paksi atau dalam sukuan.",
      "answer": [
        [
          "paksi-y"
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              7,
              2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Reflect A (7, 2) in the x-axis. Find the image coordinate.",
      "answer": [
        [
          "(7, -2)."
        ]
      ]
    },
    "bm": {
      "prompt": "Pantulkan A (7, 2) pada paksi-x. Cari koordinat imej.",
      "answer": [
        [
          "(7, -2)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              8
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A is plotted at (-2, 8). State its x- and y-coordinates.",
      "answer": [
        [
          "x = -2, y = 8."
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A diplot pada (-2, 8). Nyatakan koordinat-x dan koordinat-y.",
      "answer": [
        [
          "x = -2, y = 8."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -5
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A is at (3, -5). State whether it is on an axis or in a quadrant.",
      "answer": [
        [
          "Quadrant IV"
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A pada (3, -5). Nyatakan sama ada pada paksi atau dalam sukuan.",
      "answer": [
        [
          "Sukuan IV"
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -7,
              -3
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Reflect A (-7, -3) in the x-axis. Find the image coordinate.",
      "answer": [
        [
          "(-7, 3)."
        ]
      ]
    },
    "bm": {
      "prompt": "Pantulkan A (-7, -3) pada paksi-x. Cari koordinat imej.",
      "answer": [
        [
          "(-7, 3)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              6
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A is plotted at (4, 6). State its x- and y-coordinates.",
      "answer": [
        [
          "x = 4, y = 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A diplot pada (4, 6). Nyatakan koordinat-x dan koordinat-y.",
      "answer": [
        [
          "x = 4, y = 6."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -5,
              4
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Point A is at (-5, 4). State whether it is on an axis or in a quadrant.",
      "answer": [
        [
          "Quadrant II"
        ]
      ]
    },
    "bm": {
      "prompt": "Titik A pada (-5, 4). Nyatakan sama ada pada paksi atau dalam sukuan.",
      "answer": [
        [
          "Sukuan II"
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              8,
              -2
            ],
            "name": "A"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Reflect A (8, -2) in the x-axis. Find the image coordinate.",
      "answer": [
        [
          "(8, 2)."
        ]
      ]
    },
    "bm": {
      "prompt": "Pantulkan A (8, -2) pada paksi-x. Cari koordinat imej.",
      "answer": [
        [
          "(8, 2)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -8
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              -10
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A school map shows A (2, -8) and B (3, -10).",
      "parts": [
        "State the coordinates of A.",
        "Find the horizontal and vertical changes from A to B.",
        "Give the image of B after reflection in the y-axis."
      ],
      "answer": [
        [
          "A = (2, -8)."
        ],
        [
          "Δx = 1; Δy = -2."
        ],
        [
          "B′ = (-3, -10)."
        ]
      ]
    },
    "bm": {
      "prompt": "Peta sekolah menunjukkan A (2, -8) dan B (3, -10).",
      "parts": [
        "Nyatakan koordinat A.",
        "Cari perubahan mengufuk dan menegak dari A ke B.",
        "Cari imej B selepas pantulan pada paksi-y."
      ],
      "answer": [
        [
          "A = (2, -8)."
        ],
        [
          "Δx = 1; Δy = -2."
        ],
        [
          "B′ = (-3, -10)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -8,
              1
            ],
            "name": "A"
          },
          {
            "at": [
              -7,
              -1
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A school map shows A (-8, 1) and B (-7, -1).",
      "parts": [
        "State the coordinates of A.",
        "Find the horizontal and vertical changes from A to B.",
        "Give the image of B after reflection in the y-axis."
      ],
      "answer": [
        [
          "A = (-8, 1)."
        ],
        [
          "Δx = 1; Δy = -2."
        ],
        [
          "B′ = (7, -1)."
        ]
      ]
    },
    "bm": {
      "prompt": "Peta sekolah menunjukkan A (-8, 1) dan B (-7, -1).",
      "parts": [
        "Nyatakan koordinat A.",
        "Cari perubahan mengufuk dan menegak dari A ke B.",
        "Cari imej B selepas pantulan pada paksi-y."
      ],
      "answer": [
        [
          "A = (-8, 1)."
        ],
        [
          "Δx = 1; Δy = -2."
        ],
        [
          "B′ = (7, -1)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              0
            ],
            "name": "A"
          },
          {
            "at": [
              1,
              -2
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A school map shows A (0, 0) and B (1, -2).",
      "parts": [
        "State the coordinates of A.",
        "Find the horizontal and vertical changes from A to B.",
        "Give the image of B after reflection in the y-axis."
      ],
      "answer": [
        [
          "A = (0, 0)."
        ],
        [
          "Δx = 1; Δy = -2."
        ],
        [
          "B′ = (-1, -2)."
        ]
      ]
    },
    "bm": {
      "prompt": "Peta sekolah menunjukkan A (0, 0) dan B (1, -2).",
      "parts": [
        "Nyatakan koordinat A.",
        "Cari perubahan mengufuk dan menegak dari A ke B.",
        "Cari imej B selepas pantulan pada paksi-y."
      ],
      "answer": [
        [
          "A = (0, 0)."
        ],
        [
          "Δx = 1; Δy = -2."
        ],
        [
          "B′ = (-1, -2)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              5,
              5
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
        ]
      }
    ],
    "dlp": {
      "prompt": "A school map shows A (5, 5) and B (6, 3).",
      "parts": [
        "State the coordinates of A.",
        "Find the horizontal and vertical changes from A to B.",
        "Give the image of B after reflection in the y-axis."
      ],
      "answer": [
        [
          "A = (5, 5)."
        ],
        [
          "Δx = 1; Δy = -2."
        ],
        [
          "B′ = (-6, 3)."
        ]
      ]
    },
    "bm": {
      "prompt": "Peta sekolah menunjukkan A (5, 5) dan B (6, 3).",
      "parts": [
        "Nyatakan koordinat A.",
        "Cari perubahan mengufuk dan menegak dari A ke B.",
        "Cari imej B selepas pantulan pada paksi-y."
      ],
      "answer": [
        [
          "A = (5, 5)."
        ],
        [
          "Δx = 1; Δy = -2."
        ],
        [
          "B′ = (-6, 3)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -4,
              -6
            ],
            "name": "A"
          },
          {
            "at": [
              -3,
              -8
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A school map shows A (-4, -6) and B (-3, -8).",
      "parts": [
        "State the coordinates of A.",
        "Find the horizontal and vertical changes from A to B.",
        "Give the image of B after reflection in the y-axis."
      ],
      "answer": [
        [
          "A = (-4, -6)."
        ],
        [
          "Δx = 1; Δy = -2."
        ],
        [
          "B′ = (3, -8)."
        ]
      ]
    },
    "bm": {
      "prompt": "Peta sekolah menunjukkan A (-4, -6) dan B (-3, -8).",
      "parts": [
        "Nyatakan koordinat A.",
        "Cari perubahan mengufuk dan menegak dari A ke B.",
        "Cari imej B selepas pantulan pada paksi-y."
      ],
      "answer": [
        [
          "A = (-4, -6)."
        ],
        [
          "Δx = 1; Δy = -2."
        ],
        [
          "B′ = (3, -8)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
          },
          {
            "at": [
              5,
              2
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "What is the distance between two points on the same horizontal line?",
      "answer": [
        [
          "Absolute difference of their x-coordinates."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagaimanakah mencari jarak dua titik pada garis mengufuk?",
      "answer": [
        [
          "Beza mutlak koordinat-x."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              2,
              7
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "What is the distance between two points on the same vertical line?",
      "answer": [
        [
          "Absolute difference of their y-coordinates."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagaimanakah mencari jarak dua titik pada garis menegak?",
      "answer": [
        [
          "Beza mutlak koordinat-y."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -4,
              3
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
        ]
      }
    ],
    "dlp": {
      "prompt": "What is the Pythagorean formula for the straight-line distance?",
      "answer": [
        [
          "d = √((x₂ − x₁)² + (y₂ − y₁)²)."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah rumus Pythagoras untuk jarak garis lurus?",
      "answer": [
        [
          "d = √((x₂ − x₁)² + (y₂ − y₁)²)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -5
            ],
            "name": "A"
          },
          {
            "at": [
              -2,
              1
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Why is distance never negative?",
      "answer": [
        [
          "Distance measures length, which is non-negative."
        ]
      ]
    },
    "bm": {
      "prompt": "Mengapa jarak tidak pernah negatif?",
      "answer": [
        [
          "Jarak ialah ukuran panjang yang tidak negatif."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              0
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              4
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the distance from A (0, 0) to B (3, 4).",
      "answer": [
        [
          "d = √((3)² + (4)²) = √25 = 5 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung jarak dari A (0, 0) ke B (3, 4).",
      "answer": [
        [
          "d = √((3)² + (4)²) = √25 = 5 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              7,
              9
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the distance from A (1, 1) to B (7, 9).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung jarak dari A (1, 1) ke B (7, 9).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -3,
              -4
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              4
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the distance from A (-3, -4) to B (3, 4).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung jarak dari A (-3, -4) ke B (3, 4).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -3
            ],
            "name": "A"
          },
          {
            "at": [
              8,
              5
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the distance from A (2, -3) to B (8, 5).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung jarak dari A (2, -3) ke B (8, 5).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -5,
              2
            ],
            "name": "A"
          },
          {
            "at": [
              1,
              10
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the distance from A (-5, 2) to B (1, 10).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung jarak dari A (-5, 2) ke B (1, 10).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -7,
              -1
            ],
            "name": "A"
          },
          {
            "at": [
              -1,
              7
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the distance from A (-7, -1) to B (-1, 7).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung jarak dari A (-7, -1) ke B (-1, 7).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              2
            ],
            "name": "A"
          },
          {
            "at": [
              9,
              10
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the distance from A (3, 2) to B (9, 10).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung jarak dari A (3, 2) ke B (9, 10).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -8,
              0
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              6
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the distance from A (-8, 0) to B (0, 6).",
      "answer": [
        [
          "d = √((8)² + (6)²) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung jarak dari A (-8, 0) ke B (0, 6).",
      "answer": [
        [
          "d = √((8)² + (6)²) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -6
            ],
            "name": "A"
          },
          {
            "at": [
              8,
              0
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the distance from A (0, -6) to B (8, 0).",
      "answer": [
        [
          "d = √((8)² + (6)²) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung jarak dari A (0, -6) ke B (8, 0).",
      "answer": [
        [
          "d = √((8)² + (6)²) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
          },
          {
            "at": [
              4,
              9
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the distance from A (-2, 1) to B (4, 9).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung jarak dari A (-2, 1) ke B (4, 9).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -5
            ],
            "name": "A"
          },
          {
            "at": [
              7,
              3
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Calculate the distance from A (1, -5) to B (7, 3).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Hitung jarak dari A (1, -5) ke B (7, 3).",
      "answer": [
        [
          "d = √((6)² + (8)²) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              0
            ],
            "name": "A"
          },
          {
            "at": [
              6,
              8
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "On a coordinate map, two checkpoints are A (0, 0) and B (6, 8).",
      "parts": [
        "Find the horizontal change.",
        "Find the vertical change.",
        "Calculate the direct distance between checkpoints."
      ],
      "answer": [
        [
          "Δx = 6."
        ],
        [
          "Δy = 8."
        ],
        [
          "d = √(36 + 64) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Pada peta koordinat, dua pusat pemeriksaan ialah A (0, 0) dan B (6, 8).",
      "parts": [
        "Cari perubahan mengufuk.",
        "Cari perubahan menegak.",
        "Hitung jarak terus antara pusat pemeriksaan."
      ],
      "answer": [
        [
          "Δx = 6."
        ],
        [
          "Δy = 8."
        ],
        [
          "d = √(36 + 64) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              2
            ],
            "name": "A"
          },
          {
            "at": [
              8,
              10
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "On a coordinate map, two checkpoints are A (2, 2) and B (8, 10).",
      "parts": [
        "Find the horizontal change.",
        "Find the vertical change.",
        "Calculate the direct distance between checkpoints."
      ],
      "answer": [
        [
          "Δx = 6."
        ],
        [
          "Δy = 8."
        ],
        [
          "d = √(36 + 64) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Pada peta koordinat, dua pusat pemeriksaan ialah A (2, 2) dan B (8, 10).",
      "parts": [
        "Cari perubahan mengufuk.",
        "Cari perubahan menegak.",
        "Hitung jarak terus antara pusat pemeriksaan."
      ],
      "answer": [
        [
          "Δx = 6."
        ],
        [
          "Δy = 8."
        ],
        [
          "d = √(36 + 64) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -1
            ],
            "name": "A"
          },
          {
            "at": [
              9,
              7
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "On a coordinate map, two checkpoints are A (3, -1) and B (9, 7).",
      "parts": [
        "Find the horizontal change.",
        "Find the vertical change.",
        "Calculate the direct distance between checkpoints."
      ],
      "answer": [
        [
          "Δx = 6."
        ],
        [
          "Δy = 8."
        ],
        [
          "d = √(36 + 64) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Pada peta koordinat, dua pusat pemeriksaan ialah A (3, -1) dan B (9, 7).",
      "parts": [
        "Cari perubahan mengufuk.",
        "Cari perubahan menegak.",
        "Hitung jarak terus antara pusat pemeriksaan."
      ],
      "answer": [
        [
          "Δx = 6."
        ],
        [
          "Δy = 8."
        ],
        [
          "d = √(36 + 64) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              3
            ],
            "name": "A"
          },
          {
            "at": [
              7,
              11
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "On a coordinate map, two checkpoints are A (1, 3) and B (7, 11).",
      "parts": [
        "Find the horizontal change.",
        "Find the vertical change.",
        "Calculate the direct distance between checkpoints."
      ],
      "answer": [
        [
          "Δx = 6."
        ],
        [
          "Δy = 8."
        ],
        [
          "d = √(36 + 64) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Pada peta koordinat, dua pusat pemeriksaan ialah A (1, 3) dan B (7, 11).",
      "parts": [
        "Cari perubahan mengufuk.",
        "Cari perubahan menegak.",
        "Hitung jarak terus antara pusat pemeriksaan."
      ],
      "answer": [
        [
          "Δx = 6."
        ],
        [
          "Δy = 8."
        ],
        [
          "d = √(36 + 64) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -4,
              -3
            ],
            "name": "A"
          },
          {
            "at": [
              2,
              5
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "On a coordinate map, two checkpoints are A (-4, -3) and B (2, 5).",
      "parts": [
        "Find the horizontal change.",
        "Find the vertical change.",
        "Calculate the direct distance between checkpoints."
      ],
      "answer": [
        [
          "Δx = 6."
        ],
        [
          "Δy = 8."
        ],
        [
          "d = √(36 + 64) = √100 = 10 units."
        ]
      ]
    },
    "bm": {
      "prompt": "Pada peta koordinat, dua pusat pemeriksaan ialah A (-4, -3) dan B (2, 5).",
      "parts": [
        "Cari perubahan mengufuk.",
        "Cari perubahan menegak.",
        "Hitung jarak terus antara pusat pemeriksaan."
      ],
      "answer": [
        [
          "Δx = 6."
        ],
        [
          "Δy = 8."
        ],
        [
          "d = √(36 + 64) = √100 = 10 unit."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -4,
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
        ]
      }
    ],
    "dlp": {
      "prompt": "How is the x-coordinate of a midpoint found?",
      "answer": [
        [
          "Average the two x-coordinates."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagaimanakah mencari koordinat-x titik tengah?",
      "answer": [
        [
          "Cari purata kedua-dua koordinat-x."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              4
            ],
            "name": "A"
          },
          {
            "at": [
              6,
              8
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "How is the y-coordinate of a midpoint found?",
      "answer": [
        [
          "Average the two y-coordinates."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagaimanakah mencari koordinat-y titik tengah?",
      "answer": [
        [
          "Cari purata kedua-dua koordinat-y."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -6,
              2
            ],
            "name": "A"
          },
          {
            "at": [
              2,
              10
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Does a midpoint always lie halfway along a segment?",
      "answer": [
        [
          "Yes, it is equidistant from both ends."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah titik tengah sentiasa separuh jalan sepanjang garis?",
      "answer": [
        [
          "Ya, jaraknya sama dari kedua-dua hujung."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -8,
              -4
            ],
            "name": "A"
          },
          {
            "at": [
              0,
              4
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A segment has endpoints A and B. What are their roles in the midpoint formula?",
      "answer": [
        [
          "Their coordinate pairs are averaged separately."
        ]
      ]
    },
    "bm": {
      "prompt": "Segmen mempunyai hujung A dan B. Apakah peranannya dalam rumus titik tengah?",
      "answer": [
        [
          "Puratakan koordinat-x dan koordinat-y secara berasingan."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              0
            ],
            "name": "A"
          },
          {
            "at": [
              8,
              6
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the midpoint of A (0, 0) and B (8, 6).",
      "answer": [
        [
          "M = ((0 + 8) ÷ 2, (0 + 6) ÷ 2) = (4, 3)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari titik tengah bagi A (0, 0) dan B (8, 6).",
      "answer": [
        [
          "M = ((0 + 8) ÷ 2, (0 + 6) ÷ 2) = (4, 3)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              6
            ],
            "name": "A"
          },
          {
            "at": [
              6,
              2
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the midpoint of A (-2, 6) and B (6, 2).",
      "answer": [
        [
          "M = ((-2 + 6) ÷ 2, (6 + 2) ÷ 2) = (2, 4)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari titik tengah bagi A (-2, 6) dan B (6, 2).",
      "answer": [
        [
          "M = ((-2 + 6) ÷ 2, (6 + 2) ÷ 2) = (2, 4)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              3
            ],
            "name": "A"
          },
          {
            "at": [
              7,
              9
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the midpoint of A (1, 3) and B (7, 9).",
      "answer": [
        [
          "M = ((1 + 7) ÷ 2, (3 + 9) ÷ 2) = (4, 6)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari titik tengah bagi A (1, 3) dan B (7, 9).",
      "answer": [
        [
          "M = ((1 + 7) ÷ 2, (3 + 9) ÷ 2) = (4, 6)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -3,
              -7
            ],
            "name": "A"
          },
          {
            "at": [
              5,
              1
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the midpoint of A (-3, -7) and B (5, 1).",
      "answer": [
        [
          "M = ((-3 + 5) ÷ 2, (-7 + 1) ÷ 2) = (1, -3)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari titik tengah bagi A (-3, -7) dan B (5, 1).",
      "answer": [
        [
          "M = ((-3 + 5) ÷ 2, (-7 + 1) ÷ 2) = (1, -3)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -7,
              -1
            ],
            "name": "A"
          },
          {
            "at": [
              1,
              7
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the midpoint of A (-7, -1) and B (1, 7).",
      "answer": [
        [
          "M = ((-7 + 1) ÷ 2, (-1 + 7) ÷ 2) = (-3, 3)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari titik tengah bagi A (-7, -1) dan B (1, 7).",
      "answer": [
        [
          "M = ((-7 + 1) ÷ 2, (-1 + 7) ÷ 2) = (-3, 3)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -6
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
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the midpoint of A (4, -6) and B (8, 2).",
      "answer": [
        [
          "M = ((4 + 8) ÷ 2, (-6 + 2) ÷ 2) = (6, -2)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari titik tengah bagi A (4, -6) dan B (8, 2).",
      "answer": [
        [
          "M = ((4 + 8) ÷ 2, (-6 + 2) ÷ 2) = (6, -2)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -8,
              0
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
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the midpoint of A (-8, 0) and B (4, 6).",
      "answer": [
        [
          "M = ((-8 + 4) ÷ 2, (0 + 6) ÷ 2) = (-2, 3)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari titik tengah bagi A (-8, 0) dan B (4, 6).",
      "answer": [
        [
          "M = ((-8 + 4) ÷ 2, (0 + 6) ÷ 2) = (-2, 3)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -6,
              -8
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
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the midpoint of A (-6, -8) and B (2, 0).",
      "answer": [
        [
          "M = ((-6 + 2) ÷ 2, (-8 + 0) ÷ 2) = (-2, -4)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari titik tengah bagi A (-6, -8) dan B (2, 0).",
      "answer": [
        [
          "M = ((-6 + 2) ÷ 2, (-8 + 0) ÷ 2) = (-2, -4)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -4
            ],
            "name": "A"
          },
          {
            "at": [
              10,
              4
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the midpoint of A (2, -4) and B (10, 4).",
      "answer": [
        [
          "M = ((2 + 10) ÷ 2, (-4 + 4) ÷ 2) = (6, 0)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari titik tengah bagi A (2, -4) dan B (10, 4).",
      "answer": [
        [
          "M = ((2 + 10) ÷ 2, (-4 + 4) ÷ 2) = (6, 0)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -3,
              3
            ],
            "name": "A"
          },
          {
            "at": [
              7,
              5
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the midpoint of A (-3, 3) and B (7, 5).",
      "answer": [
        [
          "M = ((-3 + 7) ÷ 2, (3 + 5) ÷ 2) = (2, 4)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari titik tengah bagi A (-3, 3) dan B (7, 5).",
      "answer": [
        [
          "M = ((-3 + 7) ÷ 2, (3 + 5) ÷ 2) = (2, 4)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -5,
              -5
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              3
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the midpoint of A (-5, -5) and B (3, 3).",
      "answer": [
        [
          "M = ((-5 + 3) ÷ 2, (-5 + 3) ÷ 2) = (-1, -1)."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari titik tengah bagi A (-5, -5) dan B (3, 3).",
      "answer": [
        [
          "M = ((-5 + 3) ÷ 2, (-5 + 3) ÷ 2) = (-1, -1)."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              2
            ],
            "name": "A"
          },
          {
            "at": [
              8,
              10
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A straight footpath connects A (2, 2) and B (8, 10).",
      "parts": [
        "Find the midpoint.",
        "Calculate the horizontal distance from A to the midpoint.",
        "A new point C is the reflection of A across the midpoint. Find C."
      ],
      "answer": [
        [
          "M = (5, 6)."
        ],
        [
          "|5 − (2)| = 3 units."
        ],
        [
          "C = (8, 10) = B."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan lurus menghubungkan A (2, 2) dengan B (8, 10).",
      "parts": [
        "Cari titik tengah.",
        "Hitung jarak mengufuk A ke titik tengah.",
        "C ialah pantulan A pada titik tengah. Cari koordinat C."
      ],
      "answer": [
        [
          "M = (5, 6)."
        ],
        [
          "|5 − (2)| = 3 unit."
        ],
        [
          "C = (8, 10) = B."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -4
            ],
            "name": "A"
          },
          {
            "at": [
              6,
              2
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A straight footpath connects A (0, -4) and B (6, 2).",
      "parts": [
        "Find the midpoint.",
        "Calculate the horizontal distance from A to the midpoint.",
        "A new point C is the reflection of A across the midpoint. Find C."
      ],
      "answer": [
        [
          "M = (3, -1)."
        ],
        [
          "|3 − (0)| = 3 units."
        ],
        [
          "C = (6, 2) = B."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan lurus menghubungkan A (0, -4) dengan B (6, 2).",
      "parts": [
        "Cari titik tengah.",
        "Hitung jarak mengufuk A ke titik tengah.",
        "C ialah pantulan A pada titik tengah. Cari koordinat C."
      ],
      "answer": [
        [
          "M = (3, -1)."
        ],
        [
          "|3 − (0)| = 3 unit."
        ],
        [
          "C = (6, 2) = B."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -4,
              4
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
        ]
      }
    ],
    "dlp": {
      "prompt": "A straight footpath connects A (-4, 4) and B (4, 8).",
      "parts": [
        "Find the midpoint.",
        "Calculate the horizontal distance from A to the midpoint.",
        "A new point C is the reflection of A across the midpoint. Find C."
      ],
      "answer": [
        [
          "M = (0, 6)."
        ],
        [
          "|0 − (-4)| = 4 units."
        ],
        [
          "C = (4, 8) = B."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan lurus menghubungkan A (-4, 4) dengan B (4, 8).",
      "parts": [
        "Cari titik tengah.",
        "Hitung jarak mengufuk A ke titik tengah.",
        "C ialah pantulan A pada titik tengah. Cari koordinat C."
      ],
      "answer": [
        [
          "M = (0, 6)."
        ],
        [
          "|0 − (-4)| = 4 unit."
        ],
        [
          "C = (4, 8) = B."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -3
            ],
            "name": "A"
          },
          {
            "at": [
              9,
              5
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A straight footpath connects A (1, -3) and B (9, 5).",
      "parts": [
        "Find the midpoint.",
        "Calculate the horizontal distance from A to the midpoint.",
        "A new point C is the reflection of A across the midpoint. Find C."
      ],
      "answer": [
        [
          "M = (5, 1)."
        ],
        [
          "|5 − (1)| = 4 units."
        ],
        [
          "C = (9, 5) = B."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan lurus menghubungkan A (1, -3) dengan B (9, 5).",
      "parts": [
        "Cari titik tengah.",
        "Hitung jarak mengufuk A ke titik tengah.",
        "C ialah pantulan A pada titik tengah. Cari koordinat C."
      ],
      "answer": [
        [
          "M = (5, 1)."
        ],
        [
          "|5 − (1)| = 4 unit."
        ],
        [
          "C = (9, 5) = B."
        ]
      ]
    }
  },
  {
    "subtopic": "7.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "coordinate-plane",
        "title": {
          "dlp": "Cartesian plane",
          "bm": "Satah Cartes"
        },
        "description": {
          "dlp": "Plot the labelled points",
          "bm": "Titik berlabel pada satah Cartes"
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
              -7,
              -3
            ],
            "name": "A"
          },
          {
            "at": [
              3,
              7
            ],
            "name": "B"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A straight footpath connects A (-7, -3) and B (3, 7).",
      "parts": [
        "Find the midpoint.",
        "Calculate the horizontal distance from A to the midpoint.",
        "A new point C is the reflection of A across the midpoint. Find C."
      ],
      "answer": [
        [
          "M = (-2, 2)."
        ],
        [
          "|-2 − (-7)| = 5 units."
        ],
        [
          "C = (3, 7) = B."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan lurus menghubungkan A (-7, -3) dengan B (3, 7).",
      "parts": [
        "Cari titik tengah.",
        "Hitung jarak mengufuk A ke titik tengah.",
        "C ialah pantulan A pada titik tengah. Cari koordinat C."
      ],
      "answer": [
        [
          "M = (-2, 2)."
        ],
        [
          "|-2 − (-7)| = 5 unit."
        ],
        [
          "C = (3, 7) = B."
        ]
      ]
    }
  }
];
