import type { FlashcardReviewMode } from "@/features/flashcards/structuredFlashcard";
import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
export interface Entry {subtopic:"12.1"|"12.2"|"12.3"|"12.4";mode:FlashcardReviewMode;visuals?:MathQuestionVisual[];dlp:{prompt:string;parts?:string[];answer:string[][]};bm:{prompt:string;parts?:string[];answer:string[][]}}
export const MATH_F2_C12_BANK:readonly Entry[] =  [
  {
    "subtopic": "12.1",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the mean of a dataset?",
      "answer": [
        [
          "Sum of observations divided by their number."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah min satu set data?",
      "answer": [
        [
          "Jumlah semua cerapan dibahagi bilangan cerapan."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "concept",
    "dlp": {
      "prompt": "Does the mean need to be an observed value?",
      "answer": [
        [
          "No; it may lie between observations."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah min mesti merupakan nilai cerapan?",
      "answer": [
        [
          "Tidak; min boleh berada antara cerapan."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "concept",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "2",
            "value": 1
          },
          {
            "label": "4",
            "value": 1
          },
          {
            "label": "6",
            "value": 1
          },
          {
            "label": "8",
            "value": 1
          },
          {
            "label": "10",
            "value": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Why must all observations be included in the mean?",
      "answer": [
        [
          "Each value contributes to the total."
        ]
      ]
    },
    "bm": {
      "prompt": "Mengapa semua cerapan mesti dimasukkan dalam min?",
      "answer": [
        [
          "Setiap nilai menyumbang kepada jumlah."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "dot-plot",
        "title": {
          "dlp": "Observed values",
          "bm": "Nilai diperhatikan"
        },
        "xLabel": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "min": 1,
        "max": 11,
        "values": [
          2,
          4,
          6,
          8,
          10
        ]
      }
    ],
    "dlp": {
      "prompt": "The diagram records test scores. Find the mean of the observations.",
      "answer": [
        [
          "Mean = 30 ÷ 5 = 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Rajah merekod markah ujian. Cari min cerapan.",
      "answer": [
        [
          "Min = 30 ÷ 5 = 6."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency distribution",
          "bm": "Taburan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "3",
            "frequency": 1
          },
          {
            "value": "5",
            "frequency": 1
          },
          {
            "value": "7",
            "frequency": 1
          },
          {
            "value": "9",
            "frequency": 1
          },
          {
            "value": "11",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The diagram records test scores. Find the mean of the observations.",
      "answer": [
        [
          "Mean = 35 ÷ 5 = 7."
        ]
      ]
    },
    "bm": {
      "prompt": "Rajah merekod markah ujian. Cari min cerapan.",
      "answer": [
        [
          "Min = 35 ÷ 5 = 7."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "4",
            "value": 2
          },
          {
            "label": "6",
            "value": 1
          },
          {
            "label": "8",
            "value": 2
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The diagram records test scores. Find the mean of the observations.",
      "answer": [
        [
          "Mean = 30 ÷ 5 = 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Rajah merekod markah ujian. Cari min cerapan.",
      "answer": [
        [
          "Min = 30 ÷ 5 = 6."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency display",
          "bm": "Paparan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "5",
            "frequency": 1
          },
          {
            "value": "6",
            "frequency": 1
          },
          {
            "value": "7",
            "frequency": 1
          },
          {
            "value": "8",
            "frequency": 1
          },
          {
            "value": "9",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The diagram records test scores. Find the mean of the observations.",
      "answer": [
        [
          "Mean = 35 ÷ 5 = 7."
        ]
      ]
    },
    "bm": {
      "prompt": "Rajah merekod markah ujian. Cari min cerapan.",
      "answer": [
        [
          "Min = 35 ÷ 5 = 7."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "dot-plot",
        "title": {
          "dlp": "Observed values",
          "bm": "Nilai diperhatikan"
        },
        "xLabel": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "min": 1,
        "max": 9,
        "values": [
          2,
          3,
          3,
          4,
          8
        ]
      }
    ],
    "dlp": {
      "prompt": "The diagram records test scores. Find the mean of the observations.",
      "answer": [
        [
          "Mean = 20 ÷ 5 = 4."
        ]
      ]
    },
    "bm": {
      "prompt": "Rajah merekod markah ujian. Cari min cerapan.",
      "answer": [
        [
          "Min = 20 ÷ 5 = 4."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency distribution",
          "bm": "Taburan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "4",
            "frequency": 1
          },
          {
            "value": "6",
            "frequency": 2
          },
          {
            "value": "8",
            "frequency": 1
          },
          {
            "value": "11",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The diagram records test scores. Find the mean of the observations.",
      "answer": [
        [
          "Mean = 35 ÷ 5 = 7."
        ]
      ]
    },
    "bm": {
      "prompt": "Rajah merekod markah ujian. Cari min cerapan.",
      "answer": [
        [
          "Min = 35 ÷ 5 = 7."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "1",
            "value": 1
          },
          {
            "label": "3",
            "value": 1
          },
          {
            "label": "5",
            "value": 1
          },
          {
            "label": "7",
            "value": 1
          },
          {
            "label": "9",
            "value": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The diagram records test scores. Find the mean of the observations.",
      "answer": [
        [
          "Mean = 25 ÷ 5 = 5."
        ]
      ]
    },
    "bm": {
      "prompt": "Rajah merekod markah ujian. Cari min cerapan.",
      "answer": [
        [
          "Min = 25 ÷ 5 = 5."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency display",
          "bm": "Paparan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "3",
            "frequency": 1
          },
          {
            "value": "5",
            "frequency": 2
          },
          {
            "value": "7",
            "frequency": 1
          },
          {
            "value": "10",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The diagram records test scores. Find the mean of the observations.",
      "answer": [
        [
          "Mean = 30 ÷ 5 = 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Rajah merekod markah ujian. Cari min cerapan.",
      "answer": [
        [
          "Min = 30 ÷ 5 = 6."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "dot-plot",
        "title": {
          "dlp": "Observed values",
          "bm": "Nilai diperhatikan"
        },
        "xLabel": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "min": 3,
        "max": 9,
        "values": [
          4,
          4,
          6,
          8,
          8
        ]
      }
    ],
    "dlp": {
      "prompt": "A class collected five readings shown in the diagram. A sixth reading is 7.",
      "parts": [
        "Find the sum of the first five readings.",
        "Calculate the new mean of all six readings.",
        "Explain whether the new mean increases or decreases compared with the first mean."
      ],
      "answer": [
        [
          "Sum = 30."
        ],
        [
          "(30 + 7) ÷ 6 = 6.166666666666667."
        ],
        [
          "Original mean = 6; new mean = 6.166666666666667, so it increases."
        ]
      ]
    },
    "bm": {
      "prompt": "Sebuah kelas mengumpul lima bacaan dalam rajah. Bacaan keenam ialah 7.",
      "parts": [
        "Cari jumlah lima bacaan pertama.",
        "Hitung min baharu bagi enam bacaan.",
        "Terangkan sama ada min baharu meningkat atau menurun berbanding min asal."
      ],
      "answer": [
        [
          "Jumlah = 30."
        ],
        [
          "(30 + 7) ÷ 6 = 6.166666666666667."
        ],
        [
          "Min asal = 6; min baharu = 6.166666666666667, jadi nilainya meningkat."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency distribution",
          "bm": "Taburan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "5",
            "frequency": 1
          },
          {
            "value": "6",
            "frequency": 1
          },
          {
            "value": "7",
            "frequency": 1
          },
          {
            "value": "8",
            "frequency": 1
          },
          {
            "value": "9",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A class collected five readings shown in the diagram. A sixth reading is 9.",
      "parts": [
        "Find the sum of the first five readings.",
        "Calculate the new mean of all six readings.",
        "Explain whether the new mean increases or decreases compared with the first mean."
      ],
      "answer": [
        [
          "Sum = 35."
        ],
        [
          "(35 + 9) ÷ 6 = 7.333333333333333."
        ],
        [
          "Original mean = 7; new mean = 7.333333333333333, so it increases."
        ]
      ]
    },
    "bm": {
      "prompt": "Sebuah kelas mengumpul lima bacaan dalam rajah. Bacaan keenam ialah 9.",
      "parts": [
        "Cari jumlah lima bacaan pertama.",
        "Hitung min baharu bagi enam bacaan.",
        "Terangkan sama ada min baharu meningkat atau menurun berbanding min asal."
      ],
      "answer": [
        [
          "Jumlah = 35."
        ],
        [
          "(35 + 9) ÷ 6 = 7.333333333333333."
        ],
        [
          "Min asal = 7; min baharu = 7.333333333333333, jadi nilainya meningkat."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "2",
            "value": 1
          },
          {
            "label": "3",
            "value": 2
          },
          {
            "label": "4",
            "value": 1
          },
          {
            "label": "8",
            "value": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A class collected five readings shown in the diagram. A sixth reading is 6.",
      "parts": [
        "Find the sum of the first five readings.",
        "Calculate the new mean of all six readings.",
        "Explain whether the new mean increases or decreases compared with the first mean."
      ],
      "answer": [
        [
          "Sum = 20."
        ],
        [
          "(20 + 6) ÷ 6 = 4.333333333333333."
        ],
        [
          "Original mean = 4; new mean = 4.333333333333333, so it increases."
        ]
      ]
    },
    "bm": {
      "prompt": "Sebuah kelas mengumpul lima bacaan dalam rajah. Bacaan keenam ialah 6.",
      "parts": [
        "Cari jumlah lima bacaan pertama.",
        "Hitung min baharu bagi enam bacaan.",
        "Terangkan sama ada min baharu meningkat atau menurun berbanding min asal."
      ],
      "answer": [
        [
          "Jumlah = 20."
        ],
        [
          "(20 + 6) ÷ 6 = 4.333333333333333."
        ],
        [
          "Min asal = 4; min baharu = 4.333333333333333, jadi nilainya meningkat."
        ]
      ]
    }
  },
  {
    "subtopic": "12.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency display",
          "bm": "Paparan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "4",
            "frequency": 1
          },
          {
            "value": "6",
            "frequency": 2
          },
          {
            "value": "8",
            "frequency": 1
          },
          {
            "value": "11",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A class collected five readings shown in the diagram. A sixth reading is 11.",
      "parts": [
        "Find the sum of the first five readings.",
        "Calculate the new mean of all six readings.",
        "Explain whether the new mean increases or decreases compared with the first mean."
      ],
      "answer": [
        [
          "Sum = 35."
        ],
        [
          "(35 + 11) ÷ 6 = 7.666666666666667."
        ],
        [
          "Original mean = 7; new mean = 7.666666666666667, so it increases."
        ]
      ]
    },
    "bm": {
      "prompt": "Sebuah kelas mengumpul lima bacaan dalam rajah. Bacaan keenam ialah 11.",
      "parts": [
        "Cari jumlah lima bacaan pertama.",
        "Hitung min baharu bagi enam bacaan.",
        "Terangkan sama ada min baharu meningkat atau menurun berbanding min asal."
      ],
      "answer": [
        [
          "Jumlah = 35."
        ],
        [
          "(35 + 11) ÷ 6 = 7.666666666666667."
        ],
        [
          "Min asal = 7; min baharu = 7.666666666666667, jadi nilainya meningkat."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What must be done before finding the median?",
      "answer": [
        [
          "Arrange the values in order."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah langkah pertama sebelum mencari median?",
      "answer": [
        [
          "Susun nilai mengikut tertib."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "concept",
    "dlp": {
      "prompt": "How do we find the median of an even-sized dataset?",
      "answer": [
        [
          "Average the two middle values."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagaimanakah median bagi bilangan data genap dicari?",
      "answer": [
        [
          "Cari purata dua nilai tengah."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "concept",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "3",
            "value": 1
          },
          {
            "label": "5",
            "value": 1
          },
          {
            "label": "7",
            "value": 1
          },
          {
            "label": "9",
            "value": 1
          },
          {
            "label": "11",
            "value": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Does an extreme value always change the median?",
      "answer": [
        [
          "Not if the middle position and value remain unchanged."
        ]
      ]
    },
    "bm": {
      "prompt": "Adakah nilai ekstrem sentiasa mengubah median?",
      "answer": [
        [
          "Tidak, jika kedudukan dan nilai tengah kekal."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "dot-plot",
        "title": {
          "dlp": "Observed values",
          "bm": "Nilai diperhatikan"
        },
        "xLabel": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "min": 2,
        "max": 12,
        "values": [
          3,
          5,
          7,
          9,
          11
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the median of the displayed observations.",
      "answer": [
        [
          "Order the values: 3, 5, 7, 9, 11. Median = 7."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari median bagi cerapan yang dipaparkan.",
      "answer": [
        [
          "Susun nilai: 3, 5, 7, 9, 11. Median = 7."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency distribution",
          "bm": "Taburan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "4",
            "frequency": 1
          },
          {
            "value": "6",
            "frequency": 1
          },
          {
            "value": "8",
            "frequency": 1
          },
          {
            "value": "10",
            "frequency": 1
          },
          {
            "value": "12",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the median of the displayed observations.",
      "answer": [
        [
          "Order the values: 4, 6, 8, 10, 12. Median = 8."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari median bagi cerapan yang dipaparkan.",
      "answer": [
        [
          "Susun nilai: 4, 6, 8, 10, 12. Median = 8."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "5",
            "value": 2
          },
          {
            "label": "7",
            "value": 1
          },
          {
            "label": "9",
            "value": 2
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the median of the displayed observations.",
      "answer": [
        [
          "Order the values: 5, 5, 7, 9, 9. Median = 7."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari median bagi cerapan yang dipaparkan.",
      "answer": [
        [
          "Susun nilai: 5, 5, 7, 9, 9. Median = 7."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency display",
          "bm": "Paparan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "6",
            "frequency": 1
          },
          {
            "value": "7",
            "frequency": 1
          },
          {
            "value": "8",
            "frequency": 1
          },
          {
            "value": "9",
            "frequency": 1
          },
          {
            "value": "10",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the median of the displayed observations.",
      "answer": [
        [
          "Order the values: 6, 7, 8, 9, 10. Median = 8."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari median bagi cerapan yang dipaparkan.",
      "answer": [
        [
          "Susun nilai: 6, 7, 8, 9, 10. Median = 8."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "dot-plot",
        "title": {
          "dlp": "Observed values",
          "bm": "Nilai diperhatikan"
        },
        "xLabel": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "min": 2,
        "max": 10,
        "values": [
          3,
          4,
          4,
          5,
          9
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the median of the displayed observations.",
      "answer": [
        [
          "Order the values: 3, 4, 4, 5, 9. Median = 4."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari median bagi cerapan yang dipaparkan.",
      "answer": [
        [
          "Susun nilai: 3, 4, 4, 5, 9. Median = 4."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency distribution",
          "bm": "Taburan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "5",
            "frequency": 1
          },
          {
            "value": "7",
            "frequency": 2
          },
          {
            "value": "9",
            "frequency": 1
          },
          {
            "value": "12",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the median of the displayed observations.",
      "answer": [
        [
          "Order the values: 5, 7, 7, 9, 12. Median = 7."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari median bagi cerapan yang dipaparkan.",
      "answer": [
        [
          "Susun nilai: 5, 7, 7, 9, 12. Median = 7."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "2",
            "value": 1
          },
          {
            "label": "4",
            "value": 1
          },
          {
            "label": "6",
            "value": 1
          },
          {
            "label": "8",
            "value": 1
          },
          {
            "label": "10",
            "value": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the median of the displayed observations.",
      "answer": [
        [
          "Order the values: 2, 4, 6, 8, 10. Median = 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari median bagi cerapan yang dipaparkan.",
      "answer": [
        [
          "Susun nilai: 2, 4, 6, 8, 10. Median = 6."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency display",
          "bm": "Paparan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "4",
            "frequency": 1
          },
          {
            "value": "6",
            "frequency": 2
          },
          {
            "value": "8",
            "frequency": 1
          },
          {
            "value": "11",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Find the median of the displayed observations.",
      "answer": [
        [
          "Order the values: 4, 6, 6, 8, 11. Median = 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari median bagi cerapan yang dipaparkan.",
      "answer": [
        [
          "Susun nilai: 4, 6, 6, 8, 11. Median = 6."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "dot-plot",
        "title": {
          "dlp": "Observed values",
          "bm": "Nilai diperhatikan"
        },
        "xLabel": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "min": 4,
        "max": 10,
        "values": [
          5,
          5,
          7,
          9,
          9
        ]
      }
    ],
    "dlp": {
      "prompt": "A sports club records five lap counts as shown. One additional member completes a different number of laps.",
      "parts": [
        "Order the original observations.",
        "Find the original median.",
        "If the extra member completes 8 laps, find the new median."
      ],
      "answer": [
        [
          "5, 5, 7, 9, 9."
        ],
        [
          "7."
        ],
        [
          "7.5."
        ]
      ]
    },
    "bm": {
      "prompt": "Kelab sukan merekod lima bilangan pusingan seperti ditunjukkan. Seorang ahli tambahan melengkapkan bilangan pusingan yang berbeza.",
      "parts": [
        "Susun cerapan asal.",
        "Cari median asal.",
        "Jika ahli tambahan menamatkan 8 pusingan, cari median baharu."
      ],
      "answer": [
        [
          "5, 5, 7, 9, 9."
        ],
        [
          "7."
        ],
        [
          "7.5."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency distribution",
          "bm": "Taburan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "6",
            "frequency": 1
          },
          {
            "value": "7",
            "frequency": 1
          },
          {
            "value": "8",
            "frequency": 1
          },
          {
            "value": "9",
            "frequency": 1
          },
          {
            "value": "10",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A sports club records five lap counts as shown. One additional member completes a different number of laps.",
      "parts": [
        "Order the original observations.",
        "Find the original median.",
        "If the extra member completes 9 laps, find the new median."
      ],
      "answer": [
        [
          "6, 7, 8, 9, 10."
        ],
        [
          "8."
        ],
        [
          "8.5."
        ]
      ]
    },
    "bm": {
      "prompt": "Kelab sukan merekod lima bilangan pusingan seperti ditunjukkan. Seorang ahli tambahan melengkapkan bilangan pusingan yang berbeza.",
      "parts": [
        "Susun cerapan asal.",
        "Cari median asal.",
        "Jika ahli tambahan menamatkan 9 pusingan, cari median baharu."
      ],
      "answer": [
        [
          "6, 7, 8, 9, 10."
        ],
        [
          "8."
        ],
        [
          "8.5."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "3",
            "value": 1
          },
          {
            "label": "4",
            "value": 2
          },
          {
            "label": "5",
            "value": 1
          },
          {
            "label": "9",
            "value": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A sports club records five lap counts as shown. One additional member completes a different number of laps.",
      "parts": [
        "Order the original observations.",
        "Find the original median.",
        "If the extra member completes 5 laps, find the new median."
      ],
      "answer": [
        [
          "3, 4, 4, 5, 9."
        ],
        [
          "4."
        ],
        [
          "4.5."
        ]
      ]
    },
    "bm": {
      "prompt": "Kelab sukan merekod lima bilangan pusingan seperti ditunjukkan. Seorang ahli tambahan melengkapkan bilangan pusingan yang berbeza.",
      "parts": [
        "Susun cerapan asal.",
        "Cari median asal.",
        "Jika ahli tambahan menamatkan 5 pusingan, cari median baharu."
      ],
      "answer": [
        [
          "3, 4, 4, 5, 9."
        ],
        [
          "4."
        ],
        [
          "4.5."
        ]
      ]
    }
  },
  {
    "subtopic": "12.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency display",
          "bm": "Paparan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "5",
            "frequency": 1
          },
          {
            "value": "7",
            "frequency": 2
          },
          {
            "value": "9",
            "frequency": 1
          },
          {
            "value": "12",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A sports club records five lap counts as shown. One additional member completes a different number of laps.",
      "parts": [
        "Order the original observations.",
        "Find the original median.",
        "If the extra member completes 8 laps, find the new median."
      ],
      "answer": [
        [
          "5, 7, 7, 9, 12."
        ],
        [
          "7."
        ],
        [
          "7.5."
        ]
      ]
    },
    "bm": {
      "prompt": "Kelab sukan merekod lima bilangan pusingan seperti ditunjukkan. Seorang ahli tambahan melengkapkan bilangan pusingan yang berbeza.",
      "parts": [
        "Susun cerapan asal.",
        "Cari median asal.",
        "Jika ahli tambahan menamatkan 8 pusingan, cari median baharu."
      ],
      "answer": [
        [
          "5, 7, 7, 9, 12."
        ],
        [
          "7."
        ],
        [
          "7.5."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the mode?",
      "answer": [
        [
          "The observation with greatest frequency."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah mod?",
      "answer": [
        [
          "Cerapan dengan kekerapan paling tinggi."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "concept",
    "dlp": {
      "prompt": "Can a dataset have two modes?",
      "answer": [
        [
          "Yes, if two values share the highest frequency."
        ]
      ]
    },
    "bm": {
      "prompt": "Bolehkah data mempunyai dua mod?",
      "answer": [
        [
          "Ya, jika dua nilai berkongsi kekerapan tertinggi."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "concept",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "4",
            "value": 2
          },
          {
            "label": "6",
            "value": 1
          },
          {
            "label": "8",
            "value": 2
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Can a dataset have no mode?",
      "answer": [
        [
          "Yes, when no value occurs more often than any other."
        ]
      ]
    },
    "bm": {
      "prompt": "Bolehkah data tiada mod?",
      "answer": [
        [
          "Ya, apabila tiada nilai yang berlaku lebih kerap berbanding yang lain."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "dot-plot",
        "title": {
          "dlp": "Observed values",
          "bm": "Nilai diperhatikan"
        },
        "xLabel": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "min": 3,
        "max": 13,
        "values": [
          4,
          6,
          8,
          10,
          12
        ]
      }
    ],
    "dlp": {
      "prompt": "Identify the mode of the displayed dataset, or state that it has none.",
      "answer": [
        [
          "Highest-frequency observation: no mode."
        ]
      ]
    },
    "bm": {
      "prompt": "Kenal pasti mod set data yang dipaparkan, atau nyatakan tiada mod.",
      "answer": [
        [
          "Cerapan kekerapan tertinggi: tiada mod."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency distribution",
          "bm": "Taburan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "5",
            "frequency": 1
          },
          {
            "value": "7",
            "frequency": 1
          },
          {
            "value": "9",
            "frequency": 1
          },
          {
            "value": "11",
            "frequency": 1
          },
          {
            "value": "13",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Identify the mode of the displayed dataset, or state that it has none.",
      "answer": [
        [
          "Highest-frequency observation: no mode."
        ]
      ]
    },
    "bm": {
      "prompt": "Kenal pasti mod set data yang dipaparkan, atau nyatakan tiada mod.",
      "answer": [
        [
          "Cerapan kekerapan tertinggi: tiada mod."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "6",
            "value": 2
          },
          {
            "label": "8",
            "value": 1
          },
          {
            "label": "10",
            "value": 2
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Identify the mode of the displayed dataset, or state that it has none.",
      "answer": [
        [
          "Highest-frequency observation: 6 and 10."
        ]
      ]
    },
    "bm": {
      "prompt": "Kenal pasti mod set data yang dipaparkan, atau nyatakan tiada mod.",
      "answer": [
        [
          "Cerapan kekerapan tertinggi: 6 and 10."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency display",
          "bm": "Paparan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "7",
            "frequency": 1
          },
          {
            "value": "8",
            "frequency": 1
          },
          {
            "value": "9",
            "frequency": 1
          },
          {
            "value": "10",
            "frequency": 1
          },
          {
            "value": "11",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Identify the mode of the displayed dataset, or state that it has none.",
      "answer": [
        [
          "Highest-frequency observation: no mode."
        ]
      ]
    },
    "bm": {
      "prompt": "Kenal pasti mod set data yang dipaparkan, atau nyatakan tiada mod.",
      "answer": [
        [
          "Cerapan kekerapan tertinggi: tiada mod."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "dot-plot",
        "title": {
          "dlp": "Observed values",
          "bm": "Nilai diperhatikan"
        },
        "xLabel": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "min": 3,
        "max": 11,
        "values": [
          4,
          5,
          5,
          6,
          10
        ]
      }
    ],
    "dlp": {
      "prompt": "Identify the mode of the displayed dataset, or state that it has none.",
      "answer": [
        [
          "Highest-frequency observation: 5."
        ]
      ]
    },
    "bm": {
      "prompt": "Kenal pasti mod set data yang dipaparkan, atau nyatakan tiada mod.",
      "answer": [
        [
          "Cerapan kekerapan tertinggi: 5."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency distribution",
          "bm": "Taburan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "6",
            "frequency": 1
          },
          {
            "value": "8",
            "frequency": 2
          },
          {
            "value": "10",
            "frequency": 1
          },
          {
            "value": "13",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Identify the mode of the displayed dataset, or state that it has none.",
      "answer": [
        [
          "Highest-frequency observation: 8."
        ]
      ]
    },
    "bm": {
      "prompt": "Kenal pasti mod set data yang dipaparkan, atau nyatakan tiada mod.",
      "answer": [
        [
          "Cerapan kekerapan tertinggi: 8."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "3",
            "value": 1
          },
          {
            "label": "5",
            "value": 1
          },
          {
            "label": "7",
            "value": 1
          },
          {
            "label": "9",
            "value": 1
          },
          {
            "label": "11",
            "value": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Identify the mode of the displayed dataset, or state that it has none.",
      "answer": [
        [
          "Highest-frequency observation: no mode."
        ]
      ]
    },
    "bm": {
      "prompt": "Kenal pasti mod set data yang dipaparkan, atau nyatakan tiada mod.",
      "answer": [
        [
          "Cerapan kekerapan tertinggi: tiada mod."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency display",
          "bm": "Paparan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "5",
            "frequency": 1
          },
          {
            "value": "7",
            "frequency": 2
          },
          {
            "value": "9",
            "frequency": 1
          },
          {
            "value": "12",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Identify the mode of the displayed dataset, or state that it has none.",
      "answer": [
        [
          "Highest-frequency observation: 7."
        ]
      ]
    },
    "bm": {
      "prompt": "Kenal pasti mod set data yang dipaparkan, atau nyatakan tiada mod.",
      "answer": [
        [
          "Cerapan kekerapan tertinggi: 7."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "dot-plot",
        "title": {
          "dlp": "Observed values",
          "bm": "Nilai diperhatikan"
        },
        "xLabel": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "min": 5,
        "max": 11,
        "values": [
          6,
          6,
          8,
          10,
          10
        ]
      }
    ],
    "dlp": {
      "prompt": "A survey records how many books were read, shown by the diagram.",
      "parts": [
        "Identify the most frequent value or values.",
        "State the highest frequency.",
        "Explain whether the distribution is unimodal, bimodal, multimodal or has no mode."
      ],
      "answer": [
        [
          "6 and 10."
        ],
        [
          "2."
        ],
        [
          "2 mode(s)."
        ]
      ]
    },
    "bm": {
      "prompt": "Tinjauan merekod bilangan buku dibaca seperti dalam rajah.",
      "parts": [
        "Kenal pasti nilai paling kerap.",
        "Nyatakan kekerapan tertinggi.",
        "Terangkan sama ada taburan bermod tunggal, dua mod, banyak mod atau tiada mod."
      ],
      "answer": [
        [
          "6 and 10."
        ],
        [
          "2."
        ],
        [
          "2 mod."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency distribution",
          "bm": "Taburan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "7",
            "frequency": 1
          },
          {
            "value": "8",
            "frequency": 1
          },
          {
            "value": "9",
            "frequency": 1
          },
          {
            "value": "10",
            "frequency": 1
          },
          {
            "value": "11",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A survey records how many books were read, shown by the diagram.",
      "parts": [
        "Identify the most frequent value or values.",
        "State the highest frequency.",
        "Explain whether the distribution is unimodal, bimodal, multimodal or has no mode."
      ],
      "answer": [
        [
          "no mode."
        ],
        [
          "1."
        ],
        [
          "No mode."
        ]
      ]
    },
    "bm": {
      "prompt": "Tinjauan merekod bilangan buku dibaca seperti dalam rajah.",
      "parts": [
        "Kenal pasti nilai paling kerap.",
        "Nyatakan kekerapan tertinggi.",
        "Terangkan sama ada taburan bermod tunggal, dua mod, banyak mod atau tiada mod."
      ],
      "answer": [
        [
          "Tiada mod."
        ],
        [
          "1."
        ],
        [
          "Tiada mod."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "4",
            "value": 1
          },
          {
            "label": "5",
            "value": 2
          },
          {
            "label": "6",
            "value": 1
          },
          {
            "label": "10",
            "value": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A survey records how many books were read, shown by the diagram.",
      "parts": [
        "Identify the most frequent value or values.",
        "State the highest frequency.",
        "Explain whether the distribution is unimodal, bimodal, multimodal or has no mode."
      ],
      "answer": [
        [
          "5."
        ],
        [
          "2."
        ],
        [
          "1 mode(s)."
        ]
      ]
    },
    "bm": {
      "prompt": "Tinjauan merekod bilangan buku dibaca seperti dalam rajah.",
      "parts": [
        "Kenal pasti nilai paling kerap.",
        "Nyatakan kekerapan tertinggi.",
        "Terangkan sama ada taburan bermod tunggal, dua mod, banyak mod atau tiada mod."
      ],
      "answer": [
        [
          "5."
        ],
        [
          "2."
        ],
        [
          "1 mod."
        ]
      ]
    }
  },
  {
    "subtopic": "12.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency display",
          "bm": "Paparan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "6",
            "frequency": 1
          },
          {
            "value": "8",
            "frequency": 2
          },
          {
            "value": "10",
            "frequency": 1
          },
          {
            "value": "13",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A survey records how many books were read, shown by the diagram.",
      "parts": [
        "Identify the most frequent value or values.",
        "State the highest frequency.",
        "Explain whether the distribution is unimodal, bimodal, multimodal or has no mode."
      ],
      "answer": [
        [
          "8."
        ],
        [
          "2."
        ],
        [
          "1 mode(s)."
        ]
      ]
    },
    "bm": {
      "prompt": "Tinjauan merekod bilangan buku dibaca seperti dalam rajah.",
      "parts": [
        "Kenal pasti nilai paling kerap.",
        "Nyatakan kekerapan tertinggi.",
        "Terangkan sama ada taburan bermod tunggal, dua mod, banyak mod atau tiada mod."
      ],
      "answer": [
        [
          "8."
        ],
        [
          "2."
        ],
        [
          "1 mod."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "concept",
    "dlp": {
      "prompt": "Which measure is generally resistant to extreme outliers?",
      "answer": [
        [
          "Median."
        ]
      ]
    },
    "bm": {
      "prompt": "Sukatan manakah biasanya tahan terhadap nilai ekstrem?",
      "answer": [
        [
          "Median."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "concept",
    "dlp": {
      "prompt": "Which measure identifies the most common shoe size?",
      "answer": [
        [
          "Mode."
        ]
      ]
    },
    "bm": {
      "prompt": "Sukatan manakah mengenal pasti saiz kasut paling lazim?",
      "answer": [
        [
          "Mod."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "concept",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "5",
            "value": 1
          },
          {
            "label": "6",
            "value": 1
          },
          {
            "label": "7",
            "value": 1
          },
          {
            "label": "8",
            "value": 1
          },
          {
            "label": "9",
            "value": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "When is the mean useful?",
      "answer": [
        [
          "When all numeric observations should contribute to one average."
        ]
      ]
    },
    "bm": {
      "prompt": "Bilakah min sesuai digunakan?",
      "answer": [
        [
          "Apabila semua cerapan berangka perlu diambil kira dalam purata."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "dot-plot",
        "title": {
          "dlp": "Observed values",
          "bm": "Nilai diperhatikan"
        },
        "xLabel": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "min": 4,
        "max": 61,
        "values": [
          5,
          7,
          9,
          11,
          13,
          60
        ]
      }
    ],
    "dlp": {
      "prompt": "The displayed scores include an unusually high value. Choose mean or median to describe a typical score.",
      "answer": [
        [
          "Median, because the outlier can distort the mean."
        ]
      ]
    },
    "bm": {
      "prompt": "Markah yang dipaparkan mengandungi nilai luar biasa tinggi. Pilih min atau median untuk menerangkan markah tipikal.",
      "answer": [
        [
          "Median, kerana nilai ekstrem boleh memesongkan min."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency distribution",
          "bm": "Taburan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "6",
            "frequency": 1
          },
          {
            "value": "8",
            "frequency": 1
          },
          {
            "value": "10",
            "frequency": 1
          },
          {
            "value": "12",
            "frequency": 1
          },
          {
            "value": "14",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A shop wants to stock the most frequently purchased size. Which measure should it use?",
      "answer": [
        [
          "Mode, because it identifies the most frequent size."
        ]
      ]
    },
    "bm": {
      "prompt": "Kedai mahu menyimpan stok saiz paling kerap dibeli. Sukatan manakah sesuai?",
      "answer": [
        [
          "Mod, kerana menunjukkan saiz paling kerap."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "7",
            "value": 2
          },
          {
            "label": "9",
            "value": 1
          },
          {
            "label": "11",
            "value": 2
          },
          {
            "label": "60",
            "value": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The displayed scores include an unusually high value. Choose mean or median to describe a typical score.",
      "answer": [
        [
          "Median, because the outlier can distort the mean."
        ]
      ]
    },
    "bm": {
      "prompt": "Markah yang dipaparkan mengandungi nilai luar biasa tinggi. Pilih min atau median untuk menerangkan markah tipikal.",
      "answer": [
        [
          "Median, kerana nilai ekstrem boleh memesongkan min."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency display",
          "bm": "Paparan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "8",
            "frequency": 1
          },
          {
            "value": "9",
            "frequency": 1
          },
          {
            "value": "10",
            "frequency": 1
          },
          {
            "value": "11",
            "frequency": 1
          },
          {
            "value": "12",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A shop wants to stock the most frequently purchased size. Which measure should it use?",
      "answer": [
        [
          "Mode, because it identifies the most frequent size."
        ]
      ]
    },
    "bm": {
      "prompt": "Kedai mahu menyimpan stok saiz paling kerap dibeli. Sukatan manakah sesuai?",
      "answer": [
        [
          "Mod, kerana menunjukkan saiz paling kerap."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "dot-plot",
        "title": {
          "dlp": "Observed values",
          "bm": "Nilai diperhatikan"
        },
        "xLabel": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "min": 4,
        "max": 61,
        "values": [
          5,
          6,
          6,
          7,
          11,
          60
        ]
      }
    ],
    "dlp": {
      "prompt": "The displayed scores include an unusually high value. Choose mean or median to describe a typical score.",
      "answer": [
        [
          "Median, because the outlier can distort the mean."
        ]
      ]
    },
    "bm": {
      "prompt": "Markah yang dipaparkan mengandungi nilai luar biasa tinggi. Pilih min atau median untuk menerangkan markah tipikal.",
      "answer": [
        [
          "Median, kerana nilai ekstrem boleh memesongkan min."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency distribution",
          "bm": "Taburan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "7",
            "frequency": 1
          },
          {
            "value": "9",
            "frequency": 2
          },
          {
            "value": "11",
            "frequency": 1
          },
          {
            "value": "14",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A shop wants to stock the most frequently purchased size. Which measure should it use?",
      "answer": [
        [
          "Mode, because it identifies the most frequent size."
        ]
      ]
    },
    "bm": {
      "prompt": "Kedai mahu menyimpan stok saiz paling kerap dibeli. Sukatan manakah sesuai?",
      "answer": [
        [
          "Mod, kerana menunjukkan saiz paling kerap."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "4",
            "value": 1
          },
          {
            "label": "6",
            "value": 1
          },
          {
            "label": "8",
            "value": 1
          },
          {
            "label": "10",
            "value": 1
          },
          {
            "label": "12",
            "value": 1
          },
          {
            "label": "60",
            "value": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The displayed scores include an unusually high value. Choose mean or median to describe a typical score.",
      "answer": [
        [
          "Median, because the outlier can distort the mean."
        ]
      ]
    },
    "bm": {
      "prompt": "Markah yang dipaparkan mengandungi nilai luar biasa tinggi. Pilih min atau median untuk menerangkan markah tipikal.",
      "answer": [
        [
          "Median, kerana nilai ekstrem boleh memesongkan min."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency display",
          "bm": "Paparan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "6",
            "frequency": 1
          },
          {
            "value": "8",
            "frequency": 2
          },
          {
            "value": "10",
            "frequency": 1
          },
          {
            "value": "13",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A shop wants to stock the most frequently purchased size. Which measure should it use?",
      "answer": [
        [
          "Mode, because it identifies the most frequent size."
        ]
      ]
    },
    "bm": {
      "prompt": "Kedai mahu menyimpan stok saiz paling kerap dibeli. Sukatan manakah sesuai?",
      "answer": [
        [
          "Mod, kerana menunjukkan saiz paling kerap."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "dot-plot",
        "title": {
          "dlp": "Observed values",
          "bm": "Nilai diperhatikan"
        },
        "xLabel": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "min": 6,
        "max": 101,
        "values": [
          7,
          7,
          9,
          11,
          11,
          100
        ]
      }
    ],
    "dlp": {
      "prompt": "A manager compares ordinary daily sales with a day containing an exceptional large sale.",
      "parts": [
        "Find the median of the displayed sales figures.",
        "Find their mean.",
        "Choose which measure better represents a typical day and justify."
      ],
      "answer": [
        [
          "10."
        ],
        [
          "145 ÷ 6 = 24.166666666666668."
        ],
        [
          "Median, because the exceptionally high sale pulls the mean upwards."
        ]
      ]
    },
    "bm": {
      "prompt": "Pengurus membandingkan jualan harian biasa dengan hari jualan luar biasa tinggi.",
      "parts": [
        "Cari median jualan yang dipaparkan.",
        "Cari min jualan.",
        "Pilih sukatan yang lebih sesuai bagi hari biasa dan jelaskan."
      ],
      "answer": [
        [
          "10."
        ],
        [
          "145 ÷ 6 = 24.166666666666668."
        ],
        [
          "Median, kerana jualan luar biasa menaikkan min."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency distribution",
          "bm": "Taburan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "8",
            "frequency": 1
          },
          {
            "value": "9",
            "frequency": 1
          },
          {
            "value": "10",
            "frequency": 1
          },
          {
            "value": "11",
            "frequency": 1
          },
          {
            "value": "12",
            "frequency": 1
          },
          {
            "value": "101",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A manager compares ordinary daily sales with a day containing an exceptional large sale.",
      "parts": [
        "Find the median of the displayed sales figures.",
        "Find their mean.",
        "Choose which measure better represents a typical day and justify."
      ],
      "answer": [
        [
          "10.5."
        ],
        [
          "151 ÷ 6 = 25.166666666666668."
        ],
        [
          "Median, because the exceptionally high sale pulls the mean upwards."
        ]
      ]
    },
    "bm": {
      "prompt": "Pengurus membandingkan jualan harian biasa dengan hari jualan luar biasa tinggi.",
      "parts": [
        "Cari median jualan yang dipaparkan.",
        "Cari min jualan.",
        "Pilih sukatan yang lebih sesuai bagi hari biasa dan jelaskan."
      ],
      "answer": [
        [
          "10.5."
        ],
        [
          "151 ÷ 6 = 25.166666666666668."
        ],
        [
          "Median, kerana jualan luar biasa menaikkan min."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Counts by value",
          "bm": "Bilangan mengikut nilai"
        },
        "yLabel": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "bars": [
          {
            "label": "5",
            "value": 1
          },
          {
            "label": "6",
            "value": 2
          },
          {
            "label": "7",
            "value": 1
          },
          {
            "label": "11",
            "value": 1
          },
          {
            "label": "102",
            "value": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A manager compares ordinary daily sales with a day containing an exceptional large sale.",
      "parts": [
        "Find the median of the displayed sales figures.",
        "Find their mean.",
        "Choose which measure better represents a typical day and justify."
      ],
      "answer": [
        [
          "6.5."
        ],
        [
          "137 ÷ 6 = 22.833333333333332."
        ],
        [
          "Median, because the exceptionally high sale pulls the mean upwards."
        ]
      ]
    },
    "bm": {
      "prompt": "Pengurus membandingkan jualan harian biasa dengan hari jualan luar biasa tinggi.",
      "parts": [
        "Cari median jualan yang dipaparkan.",
        "Cari min jualan.",
        "Pilih sukatan yang lebih sesuai bagi hari biasa dan jelaskan."
      ],
      "answer": [
        [
          "6.5."
        ],
        [
          "137 ÷ 6 = 22.833333333333332."
        ],
        [
          "Median, kerana jualan luar biasa menaikkan min."
        ]
      ]
    }
  },
  {
    "subtopic": "12.4",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Frequency display",
          "bm": "Paparan kekerapan"
        },
        "valueHeading": {
          "dlp": "Value",
          "bm": "Nilai"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "7",
            "frequency": 1
          },
          {
            "value": "9",
            "frequency": 2
          },
          {
            "value": "11",
            "frequency": 1
          },
          {
            "value": "14",
            "frequency": 1
          },
          {
            "value": "103",
            "frequency": 1
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A manager compares ordinary daily sales with a day containing an exceptional large sale.",
      "parts": [
        "Find the median of the displayed sales figures.",
        "Find their mean.",
        "Choose which measure better represents a typical day and justify."
      ],
      "answer": [
        [
          "10."
        ],
        [
          "153 ÷ 6 = 25.5."
        ],
        [
          "Median, because the exceptionally high sale pulls the mean upwards."
        ]
      ]
    },
    "bm": {
      "prompt": "Pengurus membandingkan jualan harian biasa dengan hari jualan luar biasa tinggi.",
      "parts": [
        "Cari median jualan yang dipaparkan.",
        "Cari min jualan.",
        "Pilih sukatan yang lebih sesuai bagi hari biasa dan jelaskan."
      ],
      "answer": [
        [
          "10."
        ],
        [
          "153 ÷ 6 = 25.5."
        ],
        [
          "Median, kerana jualan luar biasa menaikkan min."
        ]
      ]
    }
  }
];
