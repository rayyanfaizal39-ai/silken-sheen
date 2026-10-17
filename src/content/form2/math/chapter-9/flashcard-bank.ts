import type { FlashcardReviewMode } from "@/features/flashcards/structuredFlashcard";
import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
export interface MathF2C9Entry { subtopic: "9.1"|"9.2"|"9.3"; mode: FlashcardReviewMode; visuals?: MathQuestionVisual[]; dlp:{prompt:string;parts?:string[];answer:string[][]}; bm:{prompt:string;parts?:string[];answer:string[][]} }
export const MATH_F2_C9_BANK: readonly MathF2C9Entry[] = [
  {
    "subtopic": "9.1",
    "mode": "concept",
    "dlp": {
      "prompt": "What does speed describe?",
      "answer": [
        [
          "Distance travelled per unit time."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah yang diterangkan oleh laju?",
      "answer": [
        [
          "Jarak bergerak setiap unit masa."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "concept",
    "dlp": {
      "prompt": "Which unit is appropriate for a car's speed?",
      "answer": [
        [
          "km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Unit apakah sesuai bagi laju kereta?",
      "answer": [
        [
          "km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "concept",
    "dlp": {
      "prompt": "How many seconds are there in one minute?",
      "answer": [
        [
          "60 seconds."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapakah saat dalam satu minit?",
      "answer": [
        [
          "60 saat."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "concept",
    "dlp": {
      "prompt": "If a cyclist moves at constant speed, what does that mean?",
      "answer": [
        [
          "Equal distances are travelled in equal times."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah maksud basikal bergerak dengan laju seragam?",
      "answer": [
        [
          "Jarak sama dilalui dalam tempoh masa sama."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A scooter travels 30 km in 15 hours. Find its speed.",
      "answer": [
        [
          "Speed = 30 ÷ 15 = 2 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Skuter bergerak 30 km dalam 15 jam. Cari lajunya.",
      "answer": [
        [
          "Laju = 30 ÷ 15 = 2 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A runner covers 36 m in 12 s. Find speed.",
      "answer": [
        [
          "Speed = 36 ÷ 12 = 3 m/s."
        ]
      ]
    },
    "bm": {
      "prompt": "Pelari bergerak 36 m dalam 12 s. Cari laju.",
      "answer": [
        [
          "Laju = 36 ÷ 12 = 3 m/s."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A vehicle moves at 40 km/h for 3 hours. Find the distance.",
      "answer": [
        [
          "Distance = 40 × 3 = 120 km."
        ]
      ]
    },
    "bm": {
      "prompt": "Kenderaan bergerak pada 40 km/j selama 3 jam. Cari jarak.",
      "answer": [
        [
          "Jarak = 40 × 3 = 120 km."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A scooter travels 75 km in 15 hours. Find its speed.",
      "answer": [
        [
          "Speed = 75 ÷ 15 = 5 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Skuter bergerak 75 km dalam 15 jam. Cari lajunya.",
      "answer": [
        [
          "Laju = 75 ÷ 15 = 5 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A runner covers 72 m in 12 s. Find speed.",
      "answer": [
        [
          "Speed = 72 ÷ 12 = 6 m/s."
        ]
      ]
    },
    "bm": {
      "prompt": "Pelari bergerak 72 m dalam 12 s. Cari laju.",
      "answer": [
        [
          "Laju = 72 ÷ 12 = 6 m/s."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A vehicle moves at 70 km/h for 3 hours. Find the distance.",
      "answer": [
        [
          "Distance = 70 × 3 = 210 km."
        ]
      ]
    },
    "bm": {
      "prompt": "Kenderaan bergerak pada 70 km/j selama 3 jam. Cari jarak.",
      "answer": [
        [
          "Jarak = 70 × 3 = 210 km."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A scooter travels 120 km in 15 hours. Find its speed.",
      "answer": [
        [
          "Speed = 120 ÷ 15 = 8 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Skuter bergerak 120 km dalam 15 jam. Cari lajunya.",
      "answer": [
        [
          "Laju = 120 ÷ 15 = 8 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A runner covers 108 m in 12 s. Find speed.",
      "answer": [
        [
          "Speed = 108 ÷ 12 = 9 m/s."
        ]
      ]
    },
    "bm": {
      "prompt": "Pelari bergerak 108 m dalam 12 s. Cari laju.",
      "answer": [
        [
          "Laju = 108 ÷ 12 = 9 m/s."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A vehicle moves at 100 km/h for 3 hours. Find the distance.",
      "answer": [
        [
          "Distance = 100 × 3 = 300 km."
        ]
      ]
    },
    "bm": {
      "prompt": "Kenderaan bergerak pada 100 km/j selama 3 jam. Cari jarak.",
      "answer": [
        [
          "Jarak = 100 × 3 = 300 km."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A scooter travels 165 km in 15 hours. Find its speed.",
      "answer": [
        [
          "Speed = 165 ÷ 15 = 11 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Skuter bergerak 165 km dalam 15 jam. Cari lajunya.",
      "answer": [
        [
          "Laju = 165 ÷ 15 = 11 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "practice",
    "dlp": {
      "prompt": "A runner covers 144 m in 12 s. Find speed.",
      "answer": [
        [
          "Speed = 144 ÷ 12 = 12 m/s."
        ]
      ]
    },
    "bm": {
      "prompt": "Pelari bergerak 144 m dalam 12 s. Cari laju.",
      "answer": [
        [
          "Laju = 144 ÷ 12 = 12 m/s."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A delivery van covers 60 km in 3 hours at constant speed.",
      "parts": [
        "Find the van's speed in km/h.",
        "Find the distance covered in 30 minutes.",
        "How long does it take to cover another 20 km at the same speed?"
      ],
      "answer": [
        [
          "60 ÷ 3 = 20 km/h."
        ],
        [
          "20 × 0.5 = 10 km."
        ],
        [
          "20 ÷ 20 = 1 h."
        ]
      ]
    },
    "bm": {
      "prompt": "Van penghantaran bergerak 60 km dalam 3 jam pada laju seragam.",
      "parts": [
        "Cari laju van dalam km/j.",
        "Cari jarak dalam 30 minit.",
        "Berapa masa diperlukan untuk bergerak 20 km lagi pada laju sama?"
      ],
      "answer": [
        [
          "60 ÷ 3 = 20 km/j."
        ],
        [
          "20 × 0.5 = 10 km."
        ],
        [
          "20 ÷ 20 = 1 jam."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Journey details",
          "bm": "Maklumat perjalanan"
        },
        "headings": [
          {
            "dlp": "Quantity",
            "bm": "Kuantiti"
          },
          {
            "dlp": "Value",
            "bm": "Nilai"
          }
        ],
        "rows": [
          {
            "left": {
              "dlp": "Distance",
              "bm": "Jarak"
            },
            "right": "60 km"
          },
          {
            "left": {
              "dlp": "Time",
              "bm": "Masa"
            },
            "right": "3 h"
          }
        ]
      }
    ]
  },
  {
    "subtopic": "9.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A delivery van covers 90 km in 3 hours at constant speed.",
      "parts": [
        "Find the van's speed in km/h.",
        "Find the distance covered in 30 minutes.",
        "How long does it take to cover another 20 km at the same speed?"
      ],
      "answer": [
        [
          "90 ÷ 3 = 30 km/h."
        ],
        [
          "30 × 0.5 = 15 km."
        ],
        [
          "20 ÷ 30 = 0.6666666666666666 h."
        ]
      ]
    },
    "bm": {
      "prompt": "Van penghantaran bergerak 90 km dalam 3 jam pada laju seragam.",
      "parts": [
        "Cari laju van dalam km/j.",
        "Cari jarak dalam 30 minit.",
        "Berapa masa diperlukan untuk bergerak 20 km lagi pada laju sama?"
      ],
      "answer": [
        [
          "90 ÷ 3 = 30 km/j."
        ],
        [
          "30 × 0.5 = 15 km."
        ],
        [
          "20 ÷ 30 = 0.6666666666666666 jam."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Journey details",
          "bm": "Maklumat perjalanan"
        },
        "headings": [
          {
            "dlp": "Quantity",
            "bm": "Kuantiti"
          },
          {
            "dlp": "Value",
            "bm": "Nilai"
          }
        ],
        "rows": [
          {
            "left": {
              "dlp": "Distance",
              "bm": "Jarak"
            },
            "right": "90 km"
          },
          {
            "left": {
              "dlp": "Time",
              "bm": "Masa"
            },
            "right": "3 h"
          }
        ]
      }
    ]
  },
  {
    "subtopic": "9.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A delivery van covers 120 km in 3 hours at constant speed.",
      "parts": [
        "Find the van's speed in km/h.",
        "Find the distance covered in 30 minutes.",
        "How long does it take to cover another 20 km at the same speed?"
      ],
      "answer": [
        [
          "120 ÷ 3 = 40 km/h."
        ],
        [
          "40 × 0.5 = 20 km."
        ],
        [
          "20 ÷ 40 = 0.5 h."
        ]
      ]
    },
    "bm": {
      "prompt": "Van penghantaran bergerak 120 km dalam 3 jam pada laju seragam.",
      "parts": [
        "Cari laju van dalam km/j.",
        "Cari jarak dalam 30 minit.",
        "Berapa masa diperlukan untuk bergerak 20 km lagi pada laju sama?"
      ],
      "answer": [
        [
          "120 ÷ 3 = 40 km/j."
        ],
        [
          "40 × 0.5 = 20 km."
        ],
        [
          "20 ÷ 40 = 0.5 jam."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Journey details",
          "bm": "Maklumat perjalanan"
        },
        "headings": [
          {
            "dlp": "Quantity",
            "bm": "Kuantiti"
          },
          {
            "dlp": "Value",
            "bm": "Nilai"
          }
        ],
        "rows": [
          {
            "left": {
              "dlp": "Distance",
              "bm": "Jarak"
            },
            "right": "120 km"
          },
          {
            "left": {
              "dlp": "Time",
              "bm": "Masa"
            },
            "right": "3 h"
          }
        ]
      }
    ]
  },
  {
    "subtopic": "9.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A delivery van covers 150 km in 3 hours at constant speed.",
      "parts": [
        "Find the van's speed in km/h.",
        "Find the distance covered in 30 minutes.",
        "How long does it take to cover another 20 km at the same speed?"
      ],
      "answer": [
        [
          "150 ÷ 3 = 50 km/h."
        ],
        [
          "50 × 0.5 = 25 km."
        ],
        [
          "20 ÷ 50 = 0.4 h."
        ]
      ]
    },
    "bm": {
      "prompt": "Van penghantaran bergerak 150 km dalam 3 jam pada laju seragam.",
      "parts": [
        "Cari laju van dalam km/j.",
        "Cari jarak dalam 30 minit.",
        "Berapa masa diperlukan untuk bergerak 20 km lagi pada laju sama?"
      ],
      "answer": [
        [
          "150 ÷ 3 = 50 km/j."
        ],
        [
          "50 × 0.5 = 25 km."
        ],
        [
          "20 ÷ 50 = 0.4 jam."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Journey details",
          "bm": "Maklumat perjalanan"
        },
        "headings": [
          {
            "dlp": "Quantity",
            "bm": "Kuantiti"
          },
          {
            "dlp": "Value",
            "bm": "Nilai"
          }
        ],
        "rows": [
          {
            "left": {
              "dlp": "Distance",
              "bm": "Jarak"
            },
            "right": "150 km"
          },
          {
            "left": {
              "dlp": "Time",
              "bm": "Masa"
            },
            "right": "3 h"
          }
        ]
      }
    ]
  },
  {
    "subtopic": "9.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A delivery van covers 180 km in 3 hours at constant speed.",
      "parts": [
        "Find the van's speed in km/h.",
        "Find the distance covered in 30 minutes.",
        "How long does it take to cover another 20 km at the same speed?"
      ],
      "answer": [
        [
          "180 ÷ 3 = 60 km/h."
        ],
        [
          "60 × 0.5 = 30 km."
        ],
        [
          "20 ÷ 60 = 0.3333333333333333 h."
        ]
      ]
    },
    "bm": {
      "prompt": "Van penghantaran bergerak 180 km dalam 3 jam pada laju seragam.",
      "parts": [
        "Cari laju van dalam km/j.",
        "Cari jarak dalam 30 minit.",
        "Berapa masa diperlukan untuk bergerak 20 km lagi pada laju sama?"
      ],
      "answer": [
        [
          "180 ÷ 3 = 60 km/j."
        ],
        [
          "60 × 0.5 = 30 km."
        ],
        [
          "20 ÷ 60 = 0.3333333333333333 jam."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Journey details",
          "bm": "Maklumat perjalanan"
        },
        "headings": [
          {
            "dlp": "Quantity",
            "bm": "Kuantiti"
          },
          {
            "dlp": "Value",
            "bm": "Nilai"
          }
        ],
        "rows": [
          {
            "left": {
              "dlp": "Distance",
              "bm": "Jarak"
            },
            "right": "180 km"
          },
          {
            "left": {
              "dlp": "Time",
              "bm": "Masa"
            },
            "right": "3 h"
          }
        ]
      }
    ]
  },
  {
    "subtopic": "9.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What is average speed?",
      "answer": [
        [
          "Total distance divided by total time."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah laju purata?",
      "answer": [
        [
          "Jumlah jarak dibahagi jumlah masa."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "concept",
    "dlp": {
      "prompt": "Does waiting time count when calculating average speed for an entire journey?",
      "answer": [
        [
          "Yes, if total elapsed time is used."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah masa berhenti dikira bagi laju purata keseluruhan perjalanan?",
      "answer": [
        [
          "Ya, jika masa keseluruhan digunakan."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "concept",
    "dlp": {
      "prompt": "Is average speed always the arithmetic mean of two speeds?",
      "answer": [
        [
          "No. It depends on distance and time."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah laju purata sentiasa purata aritmetik dua laju?",
      "answer": [
        [
          "Tidak. Ia bergantung pada jarak dan masa."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What two totals are needed for average speed?",
      "answer": [
        [
          "Total distance and total time."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah dua jumlah yang diperlukan untuk laju purata?",
      "answer": [
        [
          "Jumlah jarak dan jumlah masa."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A bus travels 20 km in 2 h and 30 km in 3 h. Find its average speed.",
      "answer": [
        [
          "Total distance = 50 km; total time = 5 h; average speed = 10 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Bas bergerak 20 km dalam 2 jam dan 30 km dalam 3 jam. Cari laju purata.",
      "answer": [
        [
          "Jumlah jarak = 50 km; jumlah masa = 5 j; laju purata = 10 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A bus travels 30 km in 2 h and 40 km in 3 h. Find its average speed.",
      "answer": [
        [
          "Total distance = 70 km; total time = 5 h; average speed = 14 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Bas bergerak 30 km dalam 2 jam dan 40 km dalam 3 jam. Cari laju purata.",
      "answer": [
        [
          "Jumlah jarak = 70 km; jumlah masa = 5 j; laju purata = 14 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A bus travels 40 km in 2 h and 50 km in 3 h. Find its average speed.",
      "answer": [
        [
          "Total distance = 90 km; total time = 5 h; average speed = 18 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Bas bergerak 40 km dalam 2 jam dan 50 km dalam 3 jam. Cari laju purata.",
      "answer": [
        [
          "Jumlah jarak = 90 km; jumlah masa = 5 j; laju purata = 18 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A bus travels 50 km in 2 h and 60 km in 3 h. Find its average speed.",
      "answer": [
        [
          "Total distance = 110 km; total time = 5 h; average speed = 22 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Bas bergerak 50 km dalam 2 jam dan 60 km dalam 3 jam. Cari laju purata.",
      "answer": [
        [
          "Jumlah jarak = 110 km; jumlah masa = 5 j; laju purata = 22 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A bus travels 60 km in 2 h and 70 km in 3 h. Find its average speed.",
      "answer": [
        [
          "Total distance = 130 km; total time = 5 h; average speed = 26 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Bas bergerak 60 km dalam 2 jam dan 70 km dalam 3 jam. Cari laju purata.",
      "answer": [
        [
          "Jumlah jarak = 130 km; jumlah masa = 5 j; laju purata = 26 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A bus travels 70 km in 2 h and 80 km in 3 h. Find its average speed.",
      "answer": [
        [
          "Total distance = 150 km; total time = 5 h; average speed = 30 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Bas bergerak 70 km dalam 2 jam dan 80 km dalam 3 jam. Cari laju purata.",
      "answer": [
        [
          "Jumlah jarak = 150 km; jumlah masa = 5 j; laju purata = 30 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A bus travels 80 km in 2 h and 90 km in 3 h. Find its average speed.",
      "answer": [
        [
          "Total distance = 170 km; total time = 5 h; average speed = 34 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Bas bergerak 80 km dalam 2 jam dan 90 km dalam 3 jam. Cari laju purata.",
      "answer": [
        [
          "Jumlah jarak = 170 km; jumlah masa = 5 j; laju purata = 34 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A bus travels 90 km in 2 h and 100 km in 3 h. Find its average speed.",
      "answer": [
        [
          "Total distance = 190 km; total time = 5 h; average speed = 38 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Bas bergerak 90 km dalam 2 jam dan 100 km dalam 3 jam. Cari laju purata.",
      "answer": [
        [
          "Jumlah jarak = 190 km; jumlah masa = 5 j; laju purata = 38 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A bus travels 100 km in 2 h and 110 km in 3 h. Find its average speed.",
      "answer": [
        [
          "Total distance = 210 km; total time = 5 h; average speed = 42 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Bas bergerak 100 km dalam 2 jam dan 110 km dalam 3 jam. Cari laju purata.",
      "answer": [
        [
          "Jumlah jarak = 210 km; jumlah masa = 5 j; laju purata = 42 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A bus travels 110 km in 2 h and 120 km in 3 h. Find its average speed.",
      "answer": [
        [
          "Total distance = 230 km; total time = 5 h; average speed = 46 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Bas bergerak 110 km dalam 2 jam dan 120 km dalam 3 jam. Cari laju purata.",
      "answer": [
        [
          "Jumlah jarak = 230 km; jumlah masa = 5 j; laju purata = 46 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "practice",
    "dlp": {
      "prompt": "A bus travels 120 km in 2 h and 130 km in 3 h. Find its average speed.",
      "answer": [
        [
          "Total distance = 250 km; total time = 5 h; average speed = 50 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Bas bergerak 120 km dalam 2 jam dan 130 km dalam 3 jam. Cari laju purata.",
      "answer": [
        [
          "Jumlah jarak = 250 km; jumlah masa = 5 j; laju purata = 50 km/j."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A train travels 24 km in 2 hours and 36 km in 3 hours.",
      "parts": [
        "Find the total distance.",
        "Find the total travel time.",
        "Calculate average speed for the whole journey."
      ],
      "answer": [
        [
          "24 + 36 = 60 km."
        ],
        [
          "2 + 3 = 5 h."
        ],
        [
          "60 ÷ 5 = 12 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Kereta api bergerak 24 km dalam 2 jam dan 36 km dalam 3 jam.",
      "parts": [
        "Cari jumlah jarak.",
        "Cari jumlah masa perjalanan.",
        "Hitung laju purata keseluruhan perjalanan."
      ],
      "answer": [
        [
          "24 + 36 = 60 km."
        ],
        [
          "2 + 3 = 5 jam."
        ],
        [
          "60 ÷ 5 = 12 km/j."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Two stages of a journey",
          "bm": "Dua peringkat perjalanan"
        },
        "headings": [
          {
            "dlp": "Stage",
            "bm": "Peringkat"
          },
          {
            "dlp": "Distance and time",
            "bm": "Jarak dan masa"
          }
        ],
        "rows": [
          {
            "left": "1",
            "right": "24 km, 2 h"
          },
          {
            "left": "2",
            "right": "36 km, 3 h"
          }
        ]
      }
    ]
  },
  {
    "subtopic": "9.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A train travels 36 km in 2 hours and 48 km in 3 hours.",
      "parts": [
        "Find the total distance.",
        "Find the total travel time.",
        "Calculate average speed for the whole journey."
      ],
      "answer": [
        [
          "36 + 48 = 84 km."
        ],
        [
          "2 + 3 = 5 h."
        ],
        [
          "84 ÷ 5 = 16.8 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Kereta api bergerak 36 km dalam 2 jam dan 48 km dalam 3 jam.",
      "parts": [
        "Cari jumlah jarak.",
        "Cari jumlah masa perjalanan.",
        "Hitung laju purata keseluruhan perjalanan."
      ],
      "answer": [
        [
          "36 + 48 = 84 km."
        ],
        [
          "2 + 3 = 5 jam."
        ],
        [
          "84 ÷ 5 = 16.8 km/j."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Two stages of a journey",
          "bm": "Dua peringkat perjalanan"
        },
        "headings": [
          {
            "dlp": "Stage",
            "bm": "Peringkat"
          },
          {
            "dlp": "Distance and time",
            "bm": "Jarak dan masa"
          }
        ],
        "rows": [
          {
            "left": "1",
            "right": "36 km, 2 h"
          },
          {
            "left": "2",
            "right": "48 km, 3 h"
          }
        ]
      }
    ]
  },
  {
    "subtopic": "9.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A train travels 48 km in 2 hours and 60 km in 3 hours.",
      "parts": [
        "Find the total distance.",
        "Find the total travel time.",
        "Calculate average speed for the whole journey."
      ],
      "answer": [
        [
          "48 + 60 = 108 km."
        ],
        [
          "2 + 3 = 5 h."
        ],
        [
          "108 ÷ 5 = 21.6 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Kereta api bergerak 48 km dalam 2 jam dan 60 km dalam 3 jam.",
      "parts": [
        "Cari jumlah jarak.",
        "Cari jumlah masa perjalanan.",
        "Hitung laju purata keseluruhan perjalanan."
      ],
      "answer": [
        [
          "48 + 60 = 108 km."
        ],
        [
          "2 + 3 = 5 jam."
        ],
        [
          "108 ÷ 5 = 21.6 km/j."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Two stages of a journey",
          "bm": "Dua peringkat perjalanan"
        },
        "headings": [
          {
            "dlp": "Stage",
            "bm": "Peringkat"
          },
          {
            "dlp": "Distance and time",
            "bm": "Jarak dan masa"
          }
        ],
        "rows": [
          {
            "left": "1",
            "right": "48 km, 2 h"
          },
          {
            "left": "2",
            "right": "60 km, 3 h"
          }
        ]
      }
    ]
  },
  {
    "subtopic": "9.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A train travels 60 km in 2 hours and 72 km in 3 hours.",
      "parts": [
        "Find the total distance.",
        "Find the total travel time.",
        "Calculate average speed for the whole journey."
      ],
      "answer": [
        [
          "60 + 72 = 132 km."
        ],
        [
          "2 + 3 = 5 h."
        ],
        [
          "132 ÷ 5 = 26.4 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Kereta api bergerak 60 km dalam 2 jam dan 72 km dalam 3 jam.",
      "parts": [
        "Cari jumlah jarak.",
        "Cari jumlah masa perjalanan.",
        "Hitung laju purata keseluruhan perjalanan."
      ],
      "answer": [
        [
          "60 + 72 = 132 km."
        ],
        [
          "2 + 3 = 5 jam."
        ],
        [
          "132 ÷ 5 = 26.4 km/j."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Two stages of a journey",
          "bm": "Dua peringkat perjalanan"
        },
        "headings": [
          {
            "dlp": "Stage",
            "bm": "Peringkat"
          },
          {
            "dlp": "Distance and time",
            "bm": "Jarak dan masa"
          }
        ],
        "rows": [
          {
            "left": "1",
            "right": "60 km, 2 h"
          },
          {
            "left": "2",
            "right": "72 km, 3 h"
          }
        ]
      }
    ]
  },
  {
    "subtopic": "9.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A train travels 72 km in 2 hours and 84 km in 3 hours.",
      "parts": [
        "Find the total distance.",
        "Find the total travel time.",
        "Calculate average speed for the whole journey."
      ],
      "answer": [
        [
          "72 + 84 = 156 km."
        ],
        [
          "2 + 3 = 5 h."
        ],
        [
          "156 ÷ 5 = 31.2 km/h."
        ]
      ]
    },
    "bm": {
      "prompt": "Kereta api bergerak 72 km dalam 2 jam dan 84 km dalam 3 jam.",
      "parts": [
        "Cari jumlah jarak.",
        "Cari jumlah masa perjalanan.",
        "Hitung laju purata keseluruhan perjalanan."
      ],
      "answer": [
        [
          "72 + 84 = 156 km."
        ],
        [
          "2 + 3 = 5 jam."
        ],
        [
          "156 ÷ 5 = 31.2 km/j."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Two stages of a journey",
          "bm": "Dua peringkat perjalanan"
        },
        "headings": [
          {
            "dlp": "Stage",
            "bm": "Peringkat"
          },
          {
            "dlp": "Distance and time",
            "bm": "Jarak dan masa"
          }
        ],
        "rows": [
          {
            "left": "1",
            "right": "72 km, 2 h"
          },
          {
            "left": "2",
            "right": "84 km, 3 h"
          }
        ]
      }
    ]
  },
  {
    "subtopic": "9.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What is acceleration?",
      "answer": [
        [
          "Change in velocity divided by the time taken."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah pecutan?",
      "answer": [
        [
          "Perubahan halaju dibahagi masa yang diambil."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the SI unit of acceleration?",
      "answer": [
        [
          "m/s²."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah unit SI bagi pecutan?",
      "answer": [
        [
          "m/s²."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What does negative acceleration indicate for motion in one direction?",
      "answer": [
        [
          "A decrease in velocity; slowing down if direction stays the same."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah maksud pecutan negatif bagi gerakan satu arah?",
      "answer": [
        [
          "Halaju berkurang; objek memperlahankan gerakan jika arah kekal."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What is acceleration when initial and final velocities are equal?",
      "answer": [
        [
          "Zero."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapakah pecutan jika halaju awal sama dengan halaju akhir?",
      "answer": [
        [
          "Sifar."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A trolley accelerates from 2 m/s to 8 m/s in 2 s. Calculate acceleration.",
      "answer": [
        [
          "a = (8 − 2) ÷ 2 = 3 m/s²."
        ]
      ]
    },
    "bm": {
      "prompt": "Troli memecut daripada 2 m/s kepada 8 m/s dalam 2 s. Hitung pecutan.",
      "answer": [
        [
          "a = (8 − 2) ÷ 2 = 3 m/s²."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A trolley accelerates from 3 m/s to 11 m/s in 2 s. Calculate acceleration.",
      "answer": [
        [
          "a = (11 − 3) ÷ 2 = 4 m/s²."
        ]
      ]
    },
    "bm": {
      "prompt": "Troli memecut daripada 3 m/s kepada 11 m/s dalam 2 s. Hitung pecutan.",
      "answer": [
        [
          "a = (11 − 3) ÷ 2 = 4 m/s²."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A trolley accelerates from 4 m/s to 14 m/s in 2 s. Calculate acceleration.",
      "answer": [
        [
          "a = (14 − 4) ÷ 2 = 5 m/s²."
        ]
      ]
    },
    "bm": {
      "prompt": "Troli memecut daripada 4 m/s kepada 14 m/s dalam 2 s. Hitung pecutan.",
      "answer": [
        [
          "a = (14 − 4) ÷ 2 = 5 m/s²."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A trolley accelerates from 5 m/s to 17 m/s in 2 s. Calculate acceleration.",
      "answer": [
        [
          "a = (17 − 5) ÷ 2 = 6 m/s²."
        ]
      ]
    },
    "bm": {
      "prompt": "Troli memecut daripada 5 m/s kepada 17 m/s dalam 2 s. Hitung pecutan.",
      "answer": [
        [
          "a = (17 − 5) ÷ 2 = 6 m/s²."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A trolley accelerates from 6 m/s to 20 m/s in 2 s. Calculate acceleration.",
      "answer": [
        [
          "a = (20 − 6) ÷ 2 = 7 m/s²."
        ]
      ]
    },
    "bm": {
      "prompt": "Troli memecut daripada 6 m/s kepada 20 m/s dalam 2 s. Hitung pecutan.",
      "answer": [
        [
          "a = (20 − 6) ÷ 2 = 7 m/s²."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A trolley accelerates from 7 m/s to 23 m/s in 2 s. Calculate acceleration.",
      "answer": [
        [
          "a = (23 − 7) ÷ 2 = 8 m/s²."
        ]
      ]
    },
    "bm": {
      "prompt": "Troli memecut daripada 7 m/s kepada 23 m/s dalam 2 s. Hitung pecutan.",
      "answer": [
        [
          "a = (23 − 7) ÷ 2 = 8 m/s²."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A trolley accelerates from 8 m/s to 26 m/s in 2 s. Calculate acceleration.",
      "answer": [
        [
          "a = (26 − 8) ÷ 2 = 9 m/s²."
        ]
      ]
    },
    "bm": {
      "prompt": "Troli memecut daripada 8 m/s kepada 26 m/s dalam 2 s. Hitung pecutan.",
      "answer": [
        [
          "a = (26 − 8) ÷ 2 = 9 m/s²."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A trolley accelerates from 9 m/s to 29 m/s in 2 s. Calculate acceleration.",
      "answer": [
        [
          "a = (29 − 9) ÷ 2 = 10 m/s²."
        ]
      ]
    },
    "bm": {
      "prompt": "Troli memecut daripada 9 m/s kepada 29 m/s dalam 2 s. Hitung pecutan.",
      "answer": [
        [
          "a = (29 − 9) ÷ 2 = 10 m/s²."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A trolley accelerates from 10 m/s to 32 m/s in 2 s. Calculate acceleration.",
      "answer": [
        [
          "a = (32 − 10) ÷ 2 = 11 m/s²."
        ]
      ]
    },
    "bm": {
      "prompt": "Troli memecut daripada 10 m/s kepada 32 m/s dalam 2 s. Hitung pecutan.",
      "answer": [
        [
          "a = (32 − 10) ÷ 2 = 11 m/s²."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A trolley accelerates from 11 m/s to 35 m/s in 2 s. Calculate acceleration.",
      "answer": [
        [
          "a = (35 − 11) ÷ 2 = 12 m/s²."
        ]
      ]
    },
    "bm": {
      "prompt": "Troli memecut daripada 11 m/s kepada 35 m/s dalam 2 s. Hitung pecutan.",
      "answer": [
        [
          "a = (35 − 11) ÷ 2 = 12 m/s²."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "practice",
    "dlp": {
      "prompt": "A trolley accelerates from 12 m/s to 38 m/s in 2 s. Calculate acceleration.",
      "answer": [
        [
          "a = (38 − 12) ÷ 2 = 13 m/s²."
        ]
      ]
    },
    "bm": {
      "prompt": "Troli memecut daripada 12 m/s kepada 38 m/s dalam 2 s. Hitung pecutan.",
      "answer": [
        [
          "a = (38 − 12) ÷ 2 = 13 m/s²."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A vehicle's velocity rises from 4 m/s to 13 m/s in 3 s.",
      "parts": [
        "Find the change in velocity.",
        "Calculate acceleration.",
        "If the same acceleration continues for another 2 s, find the final velocity."
      ],
      "answer": [
        [
          "13 − 4 = 9 m/s."
        ],
        [
          "9 ÷ 3 = 3 m/s²."
        ],
        [
          "13 + 3 × 2 = 19 m/s."
        ]
      ]
    },
    "bm": {
      "prompt": "Halaju kenderaan meningkat daripada 4 m/s kepada 13 m/s dalam 3 s.",
      "parts": [
        "Cari perubahan halaju.",
        "Hitung pecutan.",
        "Jika pecutan sama diteruskan selama 2 s lagi, cari halaju akhir."
      ],
      "answer": [
        [
          "13 − 4 = 9 m/s."
        ],
        [
          "9 ÷ 3 = 3 m/s²."
        ],
        [
          "13 + 3 × 2 = 19 m/s."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Velocity readings",
          "bm": "Bacaan halaju"
        },
        "headings": [
          {
            "dlp": "Time",
            "bm": "Masa"
          },
          {
            "dlp": "Velocity",
            "bm": "Halaju"
          }
        ],
        "rows": [
          {
            "left": "0 s",
            "right": "4 m/s"
          },
          {
            "left": "3 s",
            "right": "13 m/s"
          }
        ]
      }
    ]
  },
  {
    "subtopic": "9.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A vehicle's velocity rises from 6 m/s to 18 m/s in 3 s.",
      "parts": [
        "Find the change in velocity.",
        "Calculate acceleration.",
        "If the same acceleration continues for another 2 s, find the final velocity."
      ],
      "answer": [
        [
          "18 − 6 = 12 m/s."
        ],
        [
          "12 ÷ 3 = 4 m/s²."
        ],
        [
          "18 + 4 × 2 = 26 m/s."
        ]
      ]
    },
    "bm": {
      "prompt": "Halaju kenderaan meningkat daripada 6 m/s kepada 18 m/s dalam 3 s.",
      "parts": [
        "Cari perubahan halaju.",
        "Hitung pecutan.",
        "Jika pecutan sama diteruskan selama 2 s lagi, cari halaju akhir."
      ],
      "answer": [
        [
          "18 − 6 = 12 m/s."
        ],
        [
          "12 ÷ 3 = 4 m/s²."
        ],
        [
          "18 + 4 × 2 = 26 m/s."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Velocity readings",
          "bm": "Bacaan halaju"
        },
        "headings": [
          {
            "dlp": "Time",
            "bm": "Masa"
          },
          {
            "dlp": "Velocity",
            "bm": "Halaju"
          }
        ],
        "rows": [
          {
            "left": "0 s",
            "right": "6 m/s"
          },
          {
            "left": "3 s",
            "right": "18 m/s"
          }
        ]
      }
    ]
  },
  {
    "subtopic": "9.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A vehicle's velocity rises from 8 m/s to 23 m/s in 3 s.",
      "parts": [
        "Find the change in velocity.",
        "Calculate acceleration.",
        "If the same acceleration continues for another 2 s, find the final velocity."
      ],
      "answer": [
        [
          "23 − 8 = 15 m/s."
        ],
        [
          "15 ÷ 3 = 5 m/s²."
        ],
        [
          "23 + 5 × 2 = 33 m/s."
        ]
      ]
    },
    "bm": {
      "prompt": "Halaju kenderaan meningkat daripada 8 m/s kepada 23 m/s dalam 3 s.",
      "parts": [
        "Cari perubahan halaju.",
        "Hitung pecutan.",
        "Jika pecutan sama diteruskan selama 2 s lagi, cari halaju akhir."
      ],
      "answer": [
        [
          "23 − 8 = 15 m/s."
        ],
        [
          "15 ÷ 3 = 5 m/s²."
        ],
        [
          "23 + 5 × 2 = 33 m/s."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Velocity readings",
          "bm": "Bacaan halaju"
        },
        "headings": [
          {
            "dlp": "Time",
            "bm": "Masa"
          },
          {
            "dlp": "Velocity",
            "bm": "Halaju"
          }
        ],
        "rows": [
          {
            "left": "0 s",
            "right": "8 m/s"
          },
          {
            "left": "3 s",
            "right": "23 m/s"
          }
        ]
      }
    ]
  },
  {
    "subtopic": "9.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A vehicle's velocity rises from 10 m/s to 28 m/s in 3 s.",
      "parts": [
        "Find the change in velocity.",
        "Calculate acceleration.",
        "If the same acceleration continues for another 2 s, find the final velocity."
      ],
      "answer": [
        [
          "28 − 10 = 18 m/s."
        ],
        [
          "18 ÷ 3 = 6 m/s²."
        ],
        [
          "28 + 6 × 2 = 40 m/s."
        ]
      ]
    },
    "bm": {
      "prompt": "Halaju kenderaan meningkat daripada 10 m/s kepada 28 m/s dalam 3 s.",
      "parts": [
        "Cari perubahan halaju.",
        "Hitung pecutan.",
        "Jika pecutan sama diteruskan selama 2 s lagi, cari halaju akhir."
      ],
      "answer": [
        [
          "28 − 10 = 18 m/s."
        ],
        [
          "18 ÷ 3 = 6 m/s²."
        ],
        [
          "28 + 6 × 2 = 40 m/s."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Velocity readings",
          "bm": "Bacaan halaju"
        },
        "headings": [
          {
            "dlp": "Time",
            "bm": "Masa"
          },
          {
            "dlp": "Velocity",
            "bm": "Halaju"
          }
        ],
        "rows": [
          {
            "left": "0 s",
            "right": "10 m/s"
          },
          {
            "left": "3 s",
            "right": "28 m/s"
          }
        ]
      }
    ]
  },
  {
    "subtopic": "9.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A vehicle's velocity rises from 12 m/s to 33 m/s in 3 s.",
      "parts": [
        "Find the change in velocity.",
        "Calculate acceleration.",
        "If the same acceleration continues for another 2 s, find the final velocity."
      ],
      "answer": [
        [
          "33 − 12 = 21 m/s."
        ],
        [
          "21 ÷ 3 = 7 m/s²."
        ],
        [
          "33 + 7 × 2 = 47 m/s."
        ]
      ]
    },
    "bm": {
      "prompt": "Halaju kenderaan meningkat daripada 12 m/s kepada 33 m/s dalam 3 s.",
      "parts": [
        "Cari perubahan halaju.",
        "Hitung pecutan.",
        "Jika pecutan sama diteruskan selama 2 s lagi, cari halaju akhir."
      ],
      "answer": [
        [
          "33 − 12 = 21 m/s."
        ],
        [
          "21 ÷ 3 = 7 m/s²."
        ],
        [
          "33 + 7 × 2 = 47 m/s."
        ]
      ]
    },
    "visuals": [
      {
        "kind": "value-pairs",
        "title": {
          "dlp": "Velocity readings",
          "bm": "Bacaan halaju"
        },
        "headings": [
          {
            "dlp": "Time",
            "bm": "Masa"
          },
          {
            "dlp": "Velocity",
            "bm": "Halaju"
          }
        ],
        "rows": [
          {
            "left": "0 s",
            "right": "12 m/s"
          },
          {
            "left": "3 s",
            "right": "33 m/s"
          }
        ]
      }
    ]
  }
];
