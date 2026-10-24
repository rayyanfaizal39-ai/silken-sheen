import type { FlashcardReviewMode } from "@/features/flashcards/structuredFlashcard";
export interface MathF2C6Entry {
 subtopic: "6.1" | "6.2" | "6.3";
 mode: FlashcardReviewMode;
 dlp: { prompt: string; parts?: string[]; answer: string[][] };
 bm: { prompt: string; parts?: string[]; answer: string[][] };
}
/** Form 2 Maths Chapter 6: one bilingual 60-card bank; 12 / 33 / 15 by mode.
 * Diagrams live in ./flashcard-visuals, keyed by bank index. */
export const MATH_F2_C6_BANK: readonly MathF2C6Entry[] =  [
  {
    "subtopic": "6.1",
    "mode": "concept",
    "dlp": {
      "prompt": "How many faces does a cube have?",
      "answer": [
        [
          "6 faces."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapa muka terdapat pada kubus?",
      "answer": [
        [
          "6 muka."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "concept",
    "dlp": {
      "prompt": "What is an edge of a 3D solid?",
      "answer": [
        [
          "A line segment where two faces meet."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah tepi pepejal 3D?",
      "answer": [
        [
          "Segmen garis tempat dua muka bertemu."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "concept",
    "dlp": {
      "prompt": "What is a vertex of a solid?",
      "answer": [
        [
          "A point where edges meet."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah bucu pepejal?",
      "answer": [
        [
          "Titik pertemuan tepi."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "concept",
    "dlp": {
      "prompt": "Which solid has two equal circular faces and one curved surface?",
      "answer": [
        [
          "A cylinder."
        ]
      ]
    },
    "bm": {
      "prompt": "Pepejal manakah mempunyai dua muka bulat yang sama dan satu permukaan melengkung?",
      "answer": [
        [
          "Silinder."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "practice",
    "dlp": {
      "prompt": "State the number of faces, edges and vertices of a cube.",
      "answer": [
        [
          "6 faces, 12 edges, 8 vertices."
        ]
      ]
    },
    "bm": {
      "prompt": "Nyatakan bilangan muka, tepi dan bucu kubus.",
      "answer": [
        [
          "6 muka, 12 tepi, 8 bucu."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "practice",
    "dlp": {
      "prompt": "State the number of faces, edges and vertices of a cuboid.",
      "answer": [
        [
          "6 faces, 12 edges, 8 vertices."
        ]
      ]
    },
    "bm": {
      "prompt": "Nyatakan bilangan muka, tepi dan bucu kuboid.",
      "answer": [
        [
          "6 muka, 12 tepi, 8 bucu."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "practice",
    "dlp": {
      "prompt": "State the number of faces, edges and vertices of a triangular prism.",
      "answer": [
        [
          "5 faces, 9 edges, 6 vertices."
        ]
      ]
    },
    "bm": {
      "prompt": "Nyatakan bilangan muka, tepi dan bucu prisma segi tiga.",
      "answer": [
        [
          "5 muka, 9 tepi, 6 bucu."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "practice",
    "dlp": {
      "prompt": "State the number of faces, edges and vertices of a square-based pyramid.",
      "answer": [
        [
          "5 faces, 8 edges, 5 vertices."
        ]
      ]
    },
    "bm": {
      "prompt": "Nyatakan bilangan muka, tepi dan bucu piramid bertapak segi empat sama.",
      "answer": [
        [
          "5 muka, 8 tepi, 5 bucu."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A prism has a pentagonal cross-section. How many vertices does it have?",
      "answer": [
        [
          "2 × 5 = 10 vertices."
        ]
      ]
    },
    "bm": {
      "prompt": "Prisma mempunyai keratan rentas pentagon. Berapakah bilangan bucunya?",
      "answer": [
        [
          "2 × 5 = 10 bucu."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "practice",
    "dlp": {
      "prompt": "How many edges does a hexagonal prism have?",
      "answer": [
        [
          "3 × 6 = 18 edges."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapakah tepi bagi prisma heksagon?",
      "answer": [
        [
          "3 × 6 = 18 tepi."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A rectangular prism has 8 vertices and 12 edges. Use Euler's formula to find faces.",
      "answer": [
        [
          "F = 2 + E − V = 2 + 12 − 8 = 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Prisma segi empat tepat mempunyai 8 bucu dan 12 tepi. Guna rumus Euler untuk cari muka.",
      "answer": [
        [
          "F = 2 + E − V = 6."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "practice",
    "dlp": {
      "prompt": "How many triangular side faces does a pentagonal pyramid have?",
      "answer": [
        [
          "5 triangular side faces."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapa muka sisi segi tiga bagi piramid pentagon?",
      "answer": [
        [
          "5 muka sisi segi tiga."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A hexagonal prism has two hexagonal faces. How many rectangular side faces?",
      "answer": [
        [
          "6 rectangular side faces."
        ]
      ]
    },
    "bm": {
      "prompt": "Prisma heksagon mempunyai dua muka heksagon. Berapa muka sisi segi empat tepat?",
      "answer": [
        [
          "6 muka sisi segi empat tepat."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A solid has 5 faces, 9 edges and 6 vertices. Check Euler's formula.",
      "answer": [
        [
          "F + V = 5 + 6 = 11; E + 2 = 9 + 2 = 11."
        ]
      ]
    },
    "bm": {
      "prompt": "Pepejal mempunyai 5 muka, 9 tepi dan 6 bucu. Semak rumus Euler.",
      "answer": [
        [
          "F + V = 5 + 6 = 11; E + 2 = 9 + 2 = 11."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "practice",
    "dlp": {
      "prompt": "How many faces does a prism with a quadrilateral cross-section have?",
      "answer": [
        [
          "4 side faces + 2 bases = 6 faces."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapa muka bagi prisma berkeratan rentas segi empat?",
      "answer": [
        [
          "4 muka sisi + 2 tapak = 6 muka."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A school exhibition features a 3-sided prism.",
      "parts": [
        "Determine the number of faces.",
        "Calculate the number of edges and vertices.",
        "Verify Euler's relationship F + V = E + 2."
      ],
      "answer": [
        [
          "3 rectangular sides + 2 bases = 5 faces."
        ],
        [
          "E = 3 × 3 = 9; V = 2 × 3 = 6."
        ],
        [
          "F + V = 11; E + 2 = 11. Equal."
        ]
      ]
    },
    "bm": {
      "prompt": "Pameran sekolah mempamerkan prisma 3 sisi.",
      "parts": [
        "Tentukan bilangan muka.",
        "Hitung bilangan tepi dan bucu.",
        "Semak hubungan Euler F + V = E + 2."
      ],
      "answer": [
        [
          "3 muka sisi + 2 tapak = 5 muka."
        ],
        [
          "E = 3 × 3 = 9; V = 2 × 3 = 6."
        ],
        [
          "F + V = 11; E + 2 = 11. Sama."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A school exhibition features a 4-sided prism.",
      "parts": [
        "Determine the number of faces.",
        "Calculate the number of edges and vertices.",
        "Verify Euler's relationship F + V = E + 2."
      ],
      "answer": [
        [
          "4 rectangular sides + 2 bases = 6 faces."
        ],
        [
          "E = 3 × 4 = 12; V = 2 × 4 = 8."
        ],
        [
          "F + V = 14; E + 2 = 14. Equal."
        ]
      ]
    },
    "bm": {
      "prompt": "Pameran sekolah mempamerkan prisma 4 sisi.",
      "parts": [
        "Tentukan bilangan muka.",
        "Hitung bilangan tepi dan bucu.",
        "Semak hubungan Euler F + V = E + 2."
      ],
      "answer": [
        [
          "4 muka sisi + 2 tapak = 6 muka."
        ],
        [
          "E = 3 × 4 = 12; V = 2 × 4 = 8."
        ],
        [
          "F + V = 14; E + 2 = 14. Sama."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A school exhibition features a 5-sided prism.",
      "parts": [
        "Determine the number of faces.",
        "Calculate the number of edges and vertices.",
        "Verify Euler's relationship F + V = E + 2."
      ],
      "answer": [
        [
          "5 rectangular sides + 2 bases = 7 faces."
        ],
        [
          "E = 3 × 5 = 15; V = 2 × 5 = 10."
        ],
        [
          "F + V = 17; E + 2 = 17. Equal."
        ]
      ]
    },
    "bm": {
      "prompt": "Pameran sekolah mempamerkan prisma 5 sisi.",
      "parts": [
        "Tentukan bilangan muka.",
        "Hitung bilangan tepi dan bucu.",
        "Semak hubungan Euler F + V = E + 2."
      ],
      "answer": [
        [
          "5 muka sisi + 2 tapak = 7 muka."
        ],
        [
          "E = 3 × 5 = 15; V = 2 × 5 = 10."
        ],
        [
          "F + V = 17; E + 2 = 17. Sama."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A school exhibition features a 6-sided prism.",
      "parts": [
        "Determine the number of faces.",
        "Calculate the number of edges and vertices.",
        "Verify Euler's relationship F + V = E + 2."
      ],
      "answer": [
        [
          "6 rectangular sides + 2 bases = 8 faces."
        ],
        [
          "E = 3 × 6 = 18; V = 2 × 6 = 12."
        ],
        [
          "F + V = 20; E + 2 = 20. Equal."
        ]
      ]
    },
    "bm": {
      "prompt": "Pameran sekolah mempamerkan prisma 6 sisi.",
      "parts": [
        "Tentukan bilangan muka.",
        "Hitung bilangan tepi dan bucu.",
        "Semak hubungan Euler F + V = E + 2."
      ],
      "answer": [
        [
          "6 muka sisi + 2 tapak = 8 muka."
        ],
        [
          "E = 3 × 6 = 18; V = 2 × 6 = 12."
        ],
        [
          "F + V = 20; E + 2 = 20. Sama."
        ]
      ]
    }
  },
  {
    "subtopic": "6.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A school exhibition features a 7-sided prism.",
      "parts": [
        "Determine the number of faces.",
        "Calculate the number of edges and vertices.",
        "Verify Euler's relationship F + V = E + 2."
      ],
      "answer": [
        [
          "7 rectangular sides + 2 bases = 9 faces."
        ],
        [
          "E = 3 × 7 = 21; V = 2 × 7 = 14."
        ],
        [
          "F + V = 23; E + 2 = 23. Equal."
        ]
      ]
    },
    "bm": {
      "prompt": "Pameran sekolah mempamerkan prisma 7 sisi.",
      "parts": [
        "Tentukan bilangan muka.",
        "Hitung bilangan tepi dan bucu.",
        "Semak hubungan Euler F + V = E + 2."
      ],
      "answer": [
        [
          "7 muka sisi + 2 tapak = 9 muka."
        ],
        [
          "E = 3 × 7 = 21; V = 2 × 7 = 14."
        ],
        [
          "F + V = 23; E + 2 = 23. Sama."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What is a net of a 3D solid?",
      "answer": [
        [
          "A 2D arrangement of faces that folds into the solid."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah bentangan pepejal 3D?",
      "answer": [
        [
          "Susunan muka 2D yang boleh dilipat menjadi pepejal."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "concept",
    "dlp": {
      "prompt": "How many congruent squares are needed for a cube net?",
      "answer": [
        [
          "Six squares."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapa segi empat sama kongruen diperlukan untuk bentangan kubus?",
      "answer": [
        [
          "Enam segi empat sama."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "concept",
    "dlp": {
      "prompt": "How many rectangles and triangles form a triangular prism net?",
      "answer": [
        [
          "Three rectangles and two triangles."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapa segi empat tepat dan segi tiga dalam bentangan prisma segi tiga?",
      "answer": [
        [
          "Tiga segi empat tepat dan dua segi tiga."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What makes a cube net invalid?",
      "answer": [
        [
          "Some faces overlap or cannot form six distinct cube faces."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah sebab bentangan kubus tidak sah?",
      "answer": [
        [
          "Ada muka bertindih atau tidak membentuk enam muka kubus yang berbeza."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "practice",
    "dlp": {
      "prompt": "How many rectangles are in a cuboid's net?",
      "answer": [
        [
          "Six rectangles, in three equal opposite pairs."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapakah segi empat tepat dalam bentangan kuboid?",
      "answer": [
        [
          "Enam segi empat tepat, dalam tiga pasangan muka bertentangan yang sama."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A cube has side 4 cm. What is the side length of each square in its net?",
      "answer": [
        [
          "4 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Kubus bersisi 4 cm. Berapa panjang sisi setiap segi empat sama dalam bentangannya?",
      "answer": [
        [
          "4 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "practice",
    "dlp": {
      "prompt": "How many circles appear in a cylinder's net?",
      "answer": [
        [
          "Two equal circles."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapa bulatan dalam bentangan silinder?",
      "answer": [
        [
          "Dua bulatan sama besar."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "practice",
    "dlp": {
      "prompt": "What is the shape of the curved surface in a cylinder net?",
      "answer": [
        [
          "A rectangle."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah bentuk bentangan permukaan melengkung silinder?",
      "answer": [
        [
          "Segi empat tepat."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "practice",
    "dlp": {
      "prompt": "How many sectors form the curved surface in a cone net?",
      "answer": [
        [
          "One circular sector."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapa sektor bulatan membentuk permukaan melengkung bentangan kon?",
      "answer": [
        [
          "Satu sektor bulatan."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "practice",
    "dlp": {
      "prompt": "How many triangles form the four side faces of a square pyramid's net?",
      "answer": [
        [
          "Four triangles."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapa segi tiga membentuk muka sisi bentangan piramid segi empat sama?",
      "answer": [
        [
          "Empat segi tiga."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A cube net has 5 squares. Can it fold into a complete cube?",
      "answer": [
        [
          "No; a cube has 6 square faces."
        ]
      ]
    },
    "bm": {
      "prompt": "Bentangan kubus mempunyai 5 segi empat sama. Bolehkah menjadi kubus lengkap?",
      "answer": [
        [
          "Tidak; kubus mempunyai 6 muka segi empat sama."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A triangular prism net has 3 rectangles and 1 triangle. What is missing?",
      "answer": [
        [
          "One more congruent triangle."
        ]
      ]
    },
    "bm": {
      "prompt": "Bentangan prisma segi tiga mempunyai 3 segi empat tepat dan 1 segi tiga. Apa yang kurang?",
      "answer": [
        [
          "Satu lagi segi tiga kongruen."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "practice",
    "dlp": {
      "prompt": "The net of a cube has six squares of side 3 cm. Find the combined area.",
      "answer": [
        [
          "6 × 3² = 54 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Bentangan kubus ada enam segi empat sama bersisi 3 cm. Cari jumlah luas.",
      "answer": [
        [
          "6 × 3² = 54 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A cuboid is 2 cm by 3 cm by 5 cm. What three rectangle sizes occur in its net?",
      "answer": [
        [
          "2 × 3, 2 × 5, and 3 × 5 cm; each appears twice."
        ]
      ]
    },
    "bm": {
      "prompt": "Kuboid berukuran 2 cm × 3 cm × 5 cm. Apakah tiga saiz segi empat tepat dalam bentangan?",
      "answer": [
        [
          "2 × 3, 2 × 5 dan 3 × 5 cm; setiap satu dua kali."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "practice",
    "dlp": {
      "prompt": "For a prism net, why must both end faces be congruent?",
      "answer": [
        [
          "They represent equal, parallel cross-sections."
        ]
      ]
    },
    "bm": {
      "prompt": "Mengapa kedua-dua muka hujung bentangan prisma perlu kongruen?",
      "answer": [
        [
          "Kedua-duanya keratan rentas selari yang sama."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A gift box is a cube of side 2 cm. The diagram shows one possible net layout.",
      "parts": [
        "How many square faces does its net require?",
        "Find the area of one face.",
        "Calculate the total paper area without overlaps."
      ],
      "answer": [
        [
          "6 square faces."
        ],
        [
          "2 × 2 = 4 cm²."
        ],
        [
          "6 × 4 = 24 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Kotak hadiah berbentuk kubus bersisi 2 cm. Rajah menunjukkan susunan bentangan yang mungkin.",
      "parts": [
        "Berapa muka segi empat sama diperlukan?",
        "Cari luas satu muka.",
        "Hitung jumlah luas kertas tanpa pertindihan."
      ],
      "answer": [
        [
          "6 muka segi empat sama."
        ],
        [
          "2 × 2 = 4 cm²."
        ],
        [
          "6 × 4 = 24 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A gift box is a cube of side 3 cm. The diagram shows one possible net layout.",
      "parts": [
        "How many square faces does its net require?",
        "Find the area of one face.",
        "Calculate the total paper area without overlaps."
      ],
      "answer": [
        [
          "6 square faces."
        ],
        [
          "3 × 3 = 9 cm²."
        ],
        [
          "6 × 9 = 54 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Kotak hadiah berbentuk kubus bersisi 3 cm. Rajah menunjukkan susunan bentangan yang mungkin.",
      "parts": [
        "Berapa muka segi empat sama diperlukan?",
        "Cari luas satu muka.",
        "Hitung jumlah luas kertas tanpa pertindihan."
      ],
      "answer": [
        [
          "6 muka segi empat sama."
        ],
        [
          "3 × 3 = 9 cm²."
        ],
        [
          "6 × 9 = 54 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A gift box is a cube of side 4 cm. The diagram shows one possible net layout.",
      "parts": [
        "How many square faces does its net require?",
        "Find the area of one face.",
        "Calculate the total paper area without overlaps."
      ],
      "answer": [
        [
          "6 square faces."
        ],
        [
          "4 × 4 = 16 cm²."
        ],
        [
          "6 × 16 = 96 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Kotak hadiah berbentuk kubus bersisi 4 cm. Rajah menunjukkan susunan bentangan yang mungkin.",
      "parts": [
        "Berapa muka segi empat sama diperlukan?",
        "Cari luas satu muka.",
        "Hitung jumlah luas kertas tanpa pertindihan."
      ],
      "answer": [
        [
          "6 muka segi empat sama."
        ],
        [
          "4 × 4 = 16 cm²."
        ],
        [
          "6 × 16 = 96 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A gift box is a cube of side 5 cm. The diagram shows one possible net layout.",
      "parts": [
        "How many square faces does its net require?",
        "Find the area of one face.",
        "Calculate the total paper area without overlaps."
      ],
      "answer": [
        [
          "6 square faces."
        ],
        [
          "5 × 5 = 25 cm²."
        ],
        [
          "6 × 25 = 150 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Kotak hadiah berbentuk kubus bersisi 5 cm. Rajah menunjukkan susunan bentangan yang mungkin.",
      "parts": [
        "Berapa muka segi empat sama diperlukan?",
        "Cari luas satu muka.",
        "Hitung jumlah luas kertas tanpa pertindihan."
      ],
      "answer": [
        [
          "6 muka segi empat sama."
        ],
        [
          "5 × 5 = 25 cm²."
        ],
        [
          "6 × 25 = 150 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A gift box is a cube of side 6 cm. The diagram shows one possible net layout.",
      "parts": [
        "How many square faces does its net require?",
        "Find the area of one face.",
        "Calculate the total paper area without overlaps."
      ],
      "answer": [
        [
          "6 square faces."
        ],
        [
          "6 × 6 = 36 cm²."
        ],
        [
          "6 × 36 = 216 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Kotak hadiah berbentuk kubus bersisi 6 cm. Rajah menunjukkan susunan bentangan yang mungkin.",
      "parts": [
        "Berapa muka segi empat sama diperlukan?",
        "Cari luas satu muka.",
        "Hitung jumlah luas kertas tanpa pertindihan."
      ],
      "answer": [
        [
          "6 muka segi empat sama."
        ],
        [
          "6 × 6 = 36 cm²."
        ],
        [
          "6 × 36 = 216 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "concept",
    "dlp": {
      "prompt": "How are surface area and volume different?",
      "answer": [
        [
          "Surface area measures outer faces in square units; volume measures space inside in cubic units."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah beza luas permukaan dengan isi padu?",
      "answer": [
        [
          "Luas permukaan dalam unit persegi; isi padu ruang dalaman dalam unit padu."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the volume formula for a cuboid?",
      "answer": [
        [
          "V = length × width × height."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah rumus isi padu kuboid?",
      "answer": [
        [
          "V = panjang × lebar × tinggi."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the surface area formula for a cube of side s?",
      "answer": [
        [
          "6s²."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah rumus luas permukaan kubus bersisi s?",
      "answer": [
        [
          "6s²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the volume formula for a prism?",
      "answer": [
        [
          "Cross-sectional area × length."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah rumus isi padu prisma?",
      "answer": [
        [
          "Luas keratan rentas × panjang."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the volume of a cube with side 2 cm.",
      "answer": [
        [
          "V = 2³ = 8 cm³."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari isi padu kubus bersisi 2 cm.",
      "answer": [
        [
          "V = 2³ = 8 cm³."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the volume of a cube with side 3 cm.",
      "answer": [
        [
          "V = 3³ = 27 cm³."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari isi padu kubus bersisi 3 cm.",
      "answer": [
        [
          "V = 3³ = 27 cm³."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the volume of a cube with side 4 cm.",
      "answer": [
        [
          "V = 4³ = 64 cm³."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari isi padu kubus bersisi 4 cm.",
      "answer": [
        [
          "V = 4³ = 64 cm³."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the volume of a cube with side 5 cm.",
      "answer": [
        [
          "V = 5³ = 125 cm³."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari isi padu kubus bersisi 5 cm.",
      "answer": [
        [
          "V = 5³ = 125 cm³."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the total surface area of a cube with side 2 cm.",
      "answer": [
        [
          "A = 6 × 2² = 24 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah luas permukaan kubus bersisi 2 cm.",
      "answer": [
        [
          "A = 6 × 2² = 24 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the total surface area of a cube with side 3 cm.",
      "answer": [
        [
          "A = 6 × 3² = 54 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah luas permukaan kubus bersisi 3 cm.",
      "answer": [
        [
          "A = 6 × 3² = 54 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the total surface area of a cube with side 4 cm.",
      "answer": [
        [
          "A = 6 × 4² = 96 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah luas permukaan kubus bersisi 4 cm.",
      "answer": [
        [
          "A = 6 × 4² = 96 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the total surface area of a cube with side 5 cm.",
      "answer": [
        [
          "A = 6 × 5² = 150 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari jumlah luas permukaan kubus bersisi 5 cm.",
      "answer": [
        [
          "A = 6 × 5² = 150 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the volume of a cuboid measuring 3 cm × 4 cm × 5 cm.",
      "answer": [
        [
          "V = 3 × 4 × 5 = 60 cm³."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari isi padu kuboid berukuran 3 cm × 4 cm × 5 cm.",
      "answer": [
        [
          "V = 3 × 4 × 5 = 60 cm³."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the volume of a cuboid measuring 2 cm × 5 cm × 7 cm.",
      "answer": [
        [
          "V = 2 × 5 × 7 = 70 cm³."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari isi padu kuboid berukuran 2 cm × 5 cm × 7 cm.",
      "answer": [
        [
          "V = 2 × 5 × 7 = 70 cm³."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "practice",
    "dlp": {
      "prompt": "Find the volume of a cuboid measuring 4 cm × 6 cm × 8 cm.",
      "answer": [
        [
          "V = 4 × 6 × 8 = 192 cm³."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari isi padu kuboid berukuran 4 cm × 6 cm × 8 cm.",
      "answer": [
        [
          "V = 4 × 6 × 8 = 192 cm³."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A closed rectangular package is 2 cm long, 3 cm wide and 4 cm high.",
      "parts": [
        "Calculate its volume.",
        "Find its total surface area.",
        "State which units are appropriate for volume and surface area."
      ],
      "answer": [
        [
          "V = 2 × 3 × 4 = 24 cm³."
        ],
        [
          "A = 2(6 + 12 + 8) = 52 cm²."
        ],
        [
          "Volume: cm³; surface area: cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Bungkusan segi empat tepat tertutup berukuran panjang 2 cm, lebar 3 cm dan tinggi 4 cm.",
      "parts": [
        "Hitung isi padu.",
        "Cari jumlah luas permukaan.",
        "Nyatakan unit bagi isi padu dan luas permukaan."
      ],
      "answer": [
        [
          "V = 2 × 3 × 4 = 24 cm³."
        ],
        [
          "A = 2(6 + 12 + 8) = 52 cm²."
        ],
        [
          "Isi padu: cm³; luas permukaan: cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A closed rectangular package is 3 cm long, 4 cm wide and 5 cm high.",
      "parts": [
        "Calculate its volume.",
        "Find its total surface area.",
        "State which units are appropriate for volume and surface area."
      ],
      "answer": [
        [
          "V = 3 × 4 × 5 = 60 cm³."
        ],
        [
          "A = 2(12 + 20 + 15) = 94 cm²."
        ],
        [
          "Volume: cm³; surface area: cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Bungkusan segi empat tepat tertutup berukuran panjang 3 cm, lebar 4 cm dan tinggi 5 cm.",
      "parts": [
        "Hitung isi padu.",
        "Cari jumlah luas permukaan.",
        "Nyatakan unit bagi isi padu dan luas permukaan."
      ],
      "answer": [
        [
          "V = 3 × 4 × 5 = 60 cm³."
        ],
        [
          "A = 2(12 + 20 + 15) = 94 cm²."
        ],
        [
          "Isi padu: cm³; luas permukaan: cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A closed rectangular package is 4 cm long, 5 cm wide and 6 cm high.",
      "parts": [
        "Calculate its volume.",
        "Find its total surface area.",
        "State which units are appropriate for volume and surface area."
      ],
      "answer": [
        [
          "V = 4 × 5 × 6 = 120 cm³."
        ],
        [
          "A = 2(20 + 30 + 24) = 148 cm²."
        ],
        [
          "Volume: cm³; surface area: cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Bungkusan segi empat tepat tertutup berukuran panjang 4 cm, lebar 5 cm dan tinggi 6 cm.",
      "parts": [
        "Hitung isi padu.",
        "Cari jumlah luas permukaan.",
        "Nyatakan unit bagi isi padu dan luas permukaan."
      ],
      "answer": [
        [
          "V = 4 × 5 × 6 = 120 cm³."
        ],
        [
          "A = 2(20 + 30 + 24) = 148 cm²."
        ],
        [
          "Isi padu: cm³; luas permukaan: cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A closed rectangular package is 3 cm long, 5 cm wide and 8 cm high.",
      "parts": [
        "Calculate its volume.",
        "Find its total surface area.",
        "State which units are appropriate for volume and surface area."
      ],
      "answer": [
        [
          "V = 3 × 5 × 8 = 120 cm³."
        ],
        [
          "A = 2(15 + 40 + 24) = 158 cm²."
        ],
        [
          "Volume: cm³; surface area: cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Bungkusan segi empat tepat tertutup berukuran panjang 3 cm, lebar 5 cm dan tinggi 8 cm.",
      "parts": [
        "Hitung isi padu.",
        "Cari jumlah luas permukaan.",
        "Nyatakan unit bagi isi padu dan luas permukaan."
      ],
      "answer": [
        [
          "V = 3 × 5 × 8 = 120 cm³."
        ],
        [
          "A = 2(15 + 40 + 24) = 158 cm²."
        ],
        [
          "Isi padu: cm³; luas permukaan: cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "6.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A closed rectangular package is 5 cm long, 6 cm wide and 9 cm high.",
      "parts": [
        "Calculate its volume.",
        "Find its total surface area.",
        "State which units are appropriate for volume and surface area."
      ],
      "answer": [
        [
          "V = 5 × 6 × 9 = 270 cm³."
        ],
        [
          "A = 2(30 + 54 + 45) = 258 cm²."
        ],
        [
          "Volume: cm³; surface area: cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Bungkusan segi empat tepat tertutup berukuran panjang 5 cm, lebar 6 cm dan tinggi 9 cm.",
      "parts": [
        "Hitung isi padu.",
        "Cari jumlah luas permukaan.",
        "Nyatakan unit bagi isi padu dan luas permukaan."
      ],
      "answer": [
        [
          "V = 5 × 6 × 9 = 270 cm³."
        ],
        [
          "A = 2(30 + 54 + 45) = 258 cm²."
        ],
        [
          "Isi padu: cm³; luas permukaan: cm²."
        ]
      ]
    }
  }
];
