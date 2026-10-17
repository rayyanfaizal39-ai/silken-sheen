import type { FlashcardReviewMode } from "@/features/flashcards/structuredFlashcard";
import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
export interface Entry {subtopic:"13.1"|"13.2"|"13.3"|"13.4";mode:FlashcardReviewMode;visuals?:MathQuestionVisual[];dlp:{prompt:string;parts?:string[];answer:string[][]};bm:{prompt:string;parts?:string[];answer:string[][]}}
export const MATH_F2_C13_BANK:readonly Entry[] = [
  {
    "subtopic": "13.1",
    "mode": "concept",
    "dlp": {
      "prompt": "How is experimental probability estimated?",
      "answer": [
        [
          "Event frequency divided by total trials."
        ]
      ]
    },
    "bm": {
      "prompt": "Bagaimanakah kebarangkalian eksperimen dianggarkan?",
      "answer": [
        [
          "Kekerapan peristiwa dibahagi jumlah cubaan."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "concept",
    "dlp": {
      "prompt": "Why can experimental probability change between trials?",
      "answer": [
        [
          "Random outcomes cause sampling variation."
        ]
      ]
    },
    "bm": {
      "prompt": "Mengapa kebarangkalian eksperimen boleh berubah antara ujian?",
      "answer": [
        [
          "Kesudahan rawak menyebabkan variasi sampel."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "concept",
    "dlp": {
      "prompt": "Can an experimental probability equal zero?",
      "answer": [
        [
          "Yes, if the event never occurred in the trials."
        ]
      ]
    },
    "bm": {
      "prompt": "Bolehkah kebarangkalian eksperimen sifar?",
      "answer": [
        [
          "Ya, jika peristiwa tidak berlaku dalam cubaan."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Trial results",
          "bm": "Keputusan percubaan"
        },
        "yLabel": {
          "dlp": "Count",
          "bm": "Bilangan"
        },
        "bars": [
          {
            "label": "H",
            "value": 8
          },
          {
            "label": "T",
            "value": 12
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair coin was tossed 20 times, with 8 heads. Estimate the experimental probability of a head.",
      "answer": [
        [
          "P(head) = 8 ÷ 20."
        ]
      ]
    },
    "bm": {
      "prompt": "Syiling adil dilambung 20 kali, dengan 8 kepala. Anggar kebarangkalian eksperimen mendapat kepala.",
      "answer": [
        [
          "P(kepala) = 8 ÷ 20."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Observed frequencies",
          "bm": "Kekerapan diperhatikan"
        },
        "valueHeading": {
          "dlp": "Outcome",
          "bm": "Kesudahan"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "Head",
            "frequency": 9
          },
          {
            "value": "Tail",
            "frequency": 14
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair coin was tossed 23 times, with 9 heads. Estimate the experimental probability of a head.",
      "answer": [
        [
          "P(head) = 9 ÷ 23."
        ]
      ]
    },
    "bm": {
      "prompt": "Syiling adil dilambung 23 kali, dengan 9 kepala. Anggar kebarangkalian eksperimen mendapat kepala.",
      "answer": [
        [
          "P(kepala) = 9 ÷ 23."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Trial results",
          "bm": "Keputusan percubaan"
        },
        "yLabel": {
          "dlp": "Count",
          "bm": "Bilangan"
        },
        "bars": [
          {
            "label": "H",
            "value": 10
          },
          {
            "label": "T",
            "value": 16
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair coin was tossed 26 times, with 10 heads. Estimate the experimental probability of a head.",
      "answer": [
        [
          "P(head) = 10 ÷ 26."
        ]
      ]
    },
    "bm": {
      "prompt": "Syiling adil dilambung 26 kali, dengan 10 kepala. Anggar kebarangkalian eksperimen mendapat kepala.",
      "answer": [
        [
          "P(kepala) = 10 ÷ 26."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Observed frequencies",
          "bm": "Kekerapan diperhatikan"
        },
        "valueHeading": {
          "dlp": "Outcome",
          "bm": "Kesudahan"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "Head",
            "frequency": 11
          },
          {
            "value": "Tail",
            "frequency": 18
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair coin was tossed 29 times, with 11 heads. Estimate the experimental probability of a head.",
      "answer": [
        [
          "P(head) = 11 ÷ 29."
        ]
      ]
    },
    "bm": {
      "prompt": "Syiling adil dilambung 29 kali, dengan 11 kepala. Anggar kebarangkalian eksperimen mendapat kepala.",
      "answer": [
        [
          "P(kepala) = 11 ÷ 29."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Trial results",
          "bm": "Keputusan percubaan"
        },
        "yLabel": {
          "dlp": "Count",
          "bm": "Bilangan"
        },
        "bars": [
          {
            "label": "H",
            "value": 12
          },
          {
            "label": "T",
            "value": 20
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair coin was tossed 32 times, with 12 heads. Estimate the experimental probability of a head.",
      "answer": [
        [
          "P(head) = 12 ÷ 32."
        ]
      ]
    },
    "bm": {
      "prompt": "Syiling adil dilambung 32 kali, dengan 12 kepala. Anggar kebarangkalian eksperimen mendapat kepala.",
      "answer": [
        [
          "P(kepala) = 12 ÷ 32."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Observed frequencies",
          "bm": "Kekerapan diperhatikan"
        },
        "valueHeading": {
          "dlp": "Outcome",
          "bm": "Kesudahan"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "Head",
            "frequency": 13
          },
          {
            "value": "Tail",
            "frequency": 22
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair coin was tossed 35 times, with 13 heads. Estimate the experimental probability of a head.",
      "answer": [
        [
          "P(head) = 13 ÷ 35."
        ]
      ]
    },
    "bm": {
      "prompt": "Syiling adil dilambung 35 kali, dengan 13 kepala. Anggar kebarangkalian eksperimen mendapat kepala.",
      "answer": [
        [
          "P(kepala) = 13 ÷ 35."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "bar-chart",
        "title": {
          "dlp": "Trial results",
          "bm": "Keputusan percubaan"
        },
        "yLabel": {
          "dlp": "Count",
          "bm": "Bilangan"
        },
        "bars": [
          {
            "label": "H",
            "value": 14
          },
          {
            "label": "T",
            "value": 24
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair coin was tossed 38 times, with 14 heads. Estimate the experimental probability of a head.",
      "answer": [
        [
          "P(head) = 14 ÷ 38."
        ]
      ]
    },
    "bm": {
      "prompt": "Syiling adil dilambung 38 kali, dengan 14 kepala. Anggar kebarangkalian eksperimen mendapat kepala.",
      "answer": [
        [
          "P(kepala) = 14 ÷ 38."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "practice",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Observed frequencies",
          "bm": "Kekerapan diperhatikan"
        },
        "valueHeading": {
          "dlp": "Outcome",
          "bm": "Kesudahan"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "Head",
            "frequency": 15
          },
          {
            "value": "Tail",
            "frequency": 26
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair coin was tossed 41 times, with 15 heads. Estimate the experimental probability of a head.",
      "answer": [
        [
          "P(head) = 15 ÷ 41."
        ]
      ]
    },
    "bm": {
      "prompt": "Syiling adil dilambung 41 kali, dengan 15 kepala. Anggar kebarangkalian eksperimen mendapat kepala.",
      "answer": [
        [
          "P(kepala) = 15 ÷ 41."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Observed frequencies",
          "bm": "Kekerapan diperhatikan"
        },
        "valueHeading": {
          "dlp": "Outcome",
          "bm": "Kesudahan"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "Heads",
            "frequency": 10
          },
          {
            "value": "Tails",
            "frequency": 15
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Students tossed a coin 25 times and recorded the results.",
      "parts": [
        "Find the total number of trials.",
        "Calculate experimental P(head).",
        "Compare it with the theoretical probability of a head."
      ],
      "answer": [
        [
          "10 + 15 = 25."
        ],
        [
          "10 ÷ 25."
        ],
        [
          "Theoretical P(head) = 1 ÷ 2; experimental value differs by sampling variation."
        ]
      ]
    },
    "bm": {
      "prompt": "Murid melambung syiling 25 kali dan merekod keputusan.",
      "parts": [
        "Cari jumlah cubaan.",
        "Hitung kebarangkalian eksperimen kepala.",
        "Bandingkan dengan kebarangkalian teori mendapat kepala."
      ],
      "answer": [
        [
          "10 + 15 = 25."
        ],
        [
          "10 ÷ 25."
        ],
        [
          "Kebarangkalian teori = 1 ÷ 2; nilai eksperimen berbeza akibat variasi sampel."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Observed frequencies",
          "bm": "Kekerapan diperhatikan"
        },
        "valueHeading": {
          "dlp": "Outcome",
          "bm": "Kesudahan"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "Heads",
            "frequency": 15
          },
          {
            "value": "Tails",
            "frequency": 20
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Students tossed a coin 35 times and recorded the results.",
      "parts": [
        "Find the total number of trials.",
        "Calculate experimental P(head).",
        "Compare it with the theoretical probability of a head."
      ],
      "answer": [
        [
          "15 + 20 = 35."
        ],
        [
          "15 ÷ 35."
        ],
        [
          "Theoretical P(head) = 1 ÷ 2; experimental value differs by sampling variation."
        ]
      ]
    },
    "bm": {
      "prompt": "Murid melambung syiling 35 kali dan merekod keputusan.",
      "parts": [
        "Cari jumlah cubaan.",
        "Hitung kebarangkalian eksperimen kepala.",
        "Bandingkan dengan kebarangkalian teori mendapat kepala."
      ],
      "answer": [
        [
          "15 + 20 = 35."
        ],
        [
          "15 ÷ 35."
        ],
        [
          "Kebarangkalian teori = 1 ÷ 2; nilai eksperimen berbeza akibat variasi sampel."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Observed frequencies",
          "bm": "Kekerapan diperhatikan"
        },
        "valueHeading": {
          "dlp": "Outcome",
          "bm": "Kesudahan"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "Heads",
            "frequency": 20
          },
          {
            "value": "Tails",
            "frequency": 25
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Students tossed a coin 45 times and recorded the results.",
      "parts": [
        "Find the total number of trials.",
        "Calculate experimental P(head).",
        "Compare it with the theoretical probability of a head."
      ],
      "answer": [
        [
          "20 + 25 = 45."
        ],
        [
          "20 ÷ 45."
        ],
        [
          "Theoretical P(head) = 1 ÷ 2; experimental value differs by sampling variation."
        ]
      ]
    },
    "bm": {
      "prompt": "Murid melambung syiling 45 kali dan merekod keputusan.",
      "parts": [
        "Cari jumlah cubaan.",
        "Hitung kebarangkalian eksperimen kepala.",
        "Bandingkan dengan kebarangkalian teori mendapat kepala."
      ],
      "answer": [
        [
          "20 + 25 = 45."
        ],
        [
          "20 ÷ 45."
        ],
        [
          "Kebarangkalian teori = 1 ÷ 2; nilai eksperimen berbeza akibat variasi sampel."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Observed frequencies",
          "bm": "Kekerapan diperhatikan"
        },
        "valueHeading": {
          "dlp": "Outcome",
          "bm": "Kesudahan"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "Heads",
            "frequency": 25
          },
          {
            "value": "Tails",
            "frequency": 30
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Students tossed a coin 55 times and recorded the results.",
      "parts": [
        "Find the total number of trials.",
        "Calculate experimental P(head).",
        "Compare it with the theoretical probability of a head."
      ],
      "answer": [
        [
          "25 + 30 = 55."
        ],
        [
          "25 ÷ 55."
        ],
        [
          "Theoretical P(head) = 1 ÷ 2; experimental value differs by sampling variation."
        ]
      ]
    },
    "bm": {
      "prompt": "Murid melambung syiling 55 kali dan merekod keputusan.",
      "parts": [
        "Cari jumlah cubaan.",
        "Hitung kebarangkalian eksperimen kepala.",
        "Bandingkan dengan kebarangkalian teori mendapat kepala."
      ],
      "answer": [
        [
          "25 + 30 = 55."
        ],
        [
          "25 ÷ 55."
        ],
        [
          "Kebarangkalian teori = 1 ÷ 2; nilai eksperimen berbeza akibat variasi sampel."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What is a sample space?",
      "answer": [
        [
          "The set of every possible outcome."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah ruang sampel?",
      "answer": [
        [
          "Set semua kesudahan yang mungkin."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "concept",
    "dlp": {
      "prompt": "What is an event?",
      "answer": [
        [
          "A subset of outcomes in the sample space."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah peristiwa?",
      "answer": [
        [
          "Subset kesudahan dalam ruang sampel."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "concept",
    "dlp": {
      "prompt": "Why must a sample space list every outcome?",
      "answer": [
        [
          "So the event can be counted against all possibilities."
        ]
      ]
    },
    "bm": {
      "prompt": "Mengapa ruang sampel mesti menyenaraikan semua kesudahan?",
      "answer": [
        [
          "Supaya peristiwa dibandingkan dengan semua kemungkinan."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4"
        ],
        "outside": [
          "1",
          "3"
        ]
      }
    ],
    "dlp": {
      "prompt": "A bag contains tickets numbered 1 through 4. Write the complete sample space.",
      "answer": [
        [
          "S = {1, 2, 3, 4}."
        ]
      ]
    },
    "bm": {
      "prompt": "Beg mengandungi tiket bernombor 1 hingga 4. Tulis ruang sampel lengkap.",
      "answer": [
        [
          "S = {1, 2, 3, 4}."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4"
        ],
        "outside": [
          "1",
          "3",
          "5"
        ]
      }
    ],
    "dlp": {
      "prompt": "A spinner has 5 equally sized sectors labelled 1 to 5. List outcomes in the event 'even number'.",
      "answer": [
        [
          "{2, 4}"
        ]
      ]
    },
    "bm": {
      "prompt": "Pemutar mempunyai 5 sektor sama luas berlabel 1 hingga 5. Senaraikan kesudahan peristiwa 'nombor genap'.",
      "answer": [
        [
          "{2, 4}"
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4",
          "6"
        ],
        "outside": [
          "1",
          "3",
          "5"
        ]
      }
    ],
    "dlp": {
      "prompt": "A bag contains tickets numbered 1 through 6. Write the complete sample space.",
      "answer": [
        [
          "S = {1, 2, 3, 4, 5, 6}."
        ]
      ]
    },
    "bm": {
      "prompt": "Beg mengandungi tiket bernombor 1 hingga 6. Tulis ruang sampel lengkap.",
      "answer": [
        [
          "S = {1, 2, 3, 4, 5, 6}."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4"
        ],
        "outside": [
          "1",
          "3"
        ]
      }
    ],
    "dlp": {
      "prompt": "A spinner has 4 equally sized sectors labelled 1 to 4. List outcomes in the event 'even number'.",
      "answer": [
        [
          "{2, 4}"
        ]
      ]
    },
    "bm": {
      "prompt": "Pemutar mempunyai 4 sektor sama luas berlabel 1 hingga 4. Senaraikan kesudahan peristiwa 'nombor genap'.",
      "answer": [
        [
          "{2, 4}"
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4"
        ],
        "outside": [
          "1",
          "3",
          "5"
        ]
      }
    ],
    "dlp": {
      "prompt": "A bag contains tickets numbered 1 through 5. Write the complete sample space.",
      "answer": [
        [
          "S = {1, 2, 3, 4, 5}."
        ]
      ]
    },
    "bm": {
      "prompt": "Beg mengandungi tiket bernombor 1 hingga 5. Tulis ruang sampel lengkap.",
      "answer": [
        [
          "S = {1, 2, 3, 4, 5}."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4",
          "6"
        ],
        "outside": [
          "1",
          "3",
          "5"
        ]
      }
    ],
    "dlp": {
      "prompt": "A spinner has 6 equally sized sectors labelled 1 to 6. List outcomes in the event 'even number'.",
      "answer": [
        [
          "{2, 4, 6}"
        ]
      ]
    },
    "bm": {
      "prompt": "Pemutar mempunyai 6 sektor sama luas berlabel 1 hingga 6. Senaraikan kesudahan peristiwa 'nombor genap'.",
      "answer": [
        [
          "{2, 4, 6}"
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4"
        ],
        "outside": [
          "1",
          "3"
        ]
      }
    ],
    "dlp": {
      "prompt": "A bag contains tickets numbered 1 through 4. Write the complete sample space.",
      "answer": [
        [
          "S = {1, 2, 3, 4}."
        ]
      ]
    },
    "bm": {
      "prompt": "Beg mengandungi tiket bernombor 1 hingga 4. Tulis ruang sampel lengkap.",
      "answer": [
        [
          "S = {1, 2, 3, 4}."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4"
        ],
        "outside": [
          "1",
          "3",
          "5"
        ]
      }
    ],
    "dlp": {
      "prompt": "A spinner has 5 equally sized sectors labelled 1 to 5. List outcomes in the event 'even number'.",
      "answer": [
        [
          "{2, 4}"
        ]
      ]
    },
    "bm": {
      "prompt": "Pemutar mempunyai 5 sektor sama luas berlabel 1 hingga 5. Senaraikan kesudahan peristiwa 'nombor genap'.",
      "answer": [
        [
          "{2, 4}"
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4",
          "6"
        ],
        "outside": [
          "1",
          "3",
          "5"
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair die is rolled. Let event A be 'even'.",
      "parts": [
        "List the sample space.",
        "List outcomes belonging to A.",
        "List the complementary outcomes A′."
      ],
      "answer": [
        [
          "{1, 2, 3, 4, 5, 6}."
        ],
        [
          "A = {2, 4, 6}."
        ],
        [
          "A′ = {1, 3, 5}."
        ]
      ]
    },
    "bm": {
      "prompt": "Dadu adil dilambung. Peristiwa A ialah 'genap'.",
      "parts": [
        "Senaraikan ruang sampel.",
        "Senaraikan kesudahan dalam A.",
        "Senaraikan kesudahan pelengkap A′."
      ],
      "answer": [
        [
          "{1, 2, 3, 4, 5, 6}."
        ],
        [
          "A = {2, 4, 6}."
        ],
        [
          "A′ = {1, 3, 5}."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "4",
          "5",
          "6"
        ],
        "outside": [
          "1",
          "2",
          "3"
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair die is rolled. Let event A be 'greater than 3'.",
      "parts": [
        "List the sample space.",
        "List outcomes belonging to A.",
        "List the complementary outcomes A′."
      ],
      "answer": [
        [
          "{1, 2, 3, 4, 5, 6}."
        ],
        [
          "A = {4, 5, 6}."
        ],
        [
          "A′ = {1, 2, 3}."
        ]
      ]
    },
    "bm": {
      "prompt": "Dadu adil dilambung. Peristiwa A ialah 'lebih besar daripada 3'.",
      "parts": [
        "Senaraikan ruang sampel.",
        "Senaraikan kesudahan dalam A.",
        "Senaraikan kesudahan pelengkap A′."
      ],
      "answer": [
        [
          "{1, 2, 3, 4, 5, 6}."
        ],
        [
          "A = {4, 5, 6}."
        ],
        [
          "A′ = {1, 2, 3}."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4",
          "6"
        ],
        "outside": [
          "1",
          "3",
          "5"
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair die is rolled. Let event A be 'even'.",
      "parts": [
        "List the sample space.",
        "List outcomes belonging to A.",
        "List the complementary outcomes A′."
      ],
      "answer": [
        [
          "{1, 2, 3, 4, 5, 6}."
        ],
        [
          "A = {2, 4, 6}."
        ],
        [
          "A′ = {1, 3, 5}."
        ]
      ]
    },
    "bm": {
      "prompt": "Dadu adil dilambung. Peristiwa A ialah 'genap'.",
      "parts": [
        "Senaraikan ruang sampel.",
        "Senaraikan kesudahan dalam A.",
        "Senaraikan kesudahan pelengkap A′."
      ],
      "answer": [
        [
          "{1, 2, 3, 4, 5, 6}."
        ],
        [
          "A = {2, 4, 6}."
        ],
        [
          "A′ = {1, 3, 5}."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "4",
          "5",
          "6"
        ],
        "outside": [
          "1",
          "2",
          "3"
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair die is rolled. Let event A be 'greater than 3'.",
      "parts": [
        "List the sample space.",
        "List outcomes belonging to A.",
        "List the complementary outcomes A′."
      ],
      "answer": [
        [
          "{1, 2, 3, 4, 5, 6}."
        ],
        [
          "A = {4, 5, 6}."
        ],
        [
          "A′ = {1, 2, 3}."
        ]
      ]
    },
    "bm": {
      "prompt": "Dadu adil dilambung. Peristiwa A ialah 'lebih besar daripada 3'.",
      "parts": [
        "Senaraikan ruang sampel.",
        "Senaraikan kesudahan dalam A.",
        "Senaraikan kesudahan pelengkap A′."
      ],
      "answer": [
        [
          "{1, 2, 3, 4, 5, 6}."
        ],
        [
          "A = {4, 5, 6}."
        ],
        [
          "A′ = {1, 2, 3}."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "concept",
    "dlp": {
      "prompt": "When are outcomes equally likely?",
      "answer": [
        [
          "When each individual outcome has the same chance."
        ]
      ]
    },
    "bm": {
      "prompt": "Bilakah kesudahan sama mungkin?",
      "answer": [
        [
          "Apabila setiap kesudahan mempunyai peluang yang sama."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "concept",
    "dlp": {
      "prompt": "What is theoretical probability for equally likely outcomes?",
      "answer": [
        [
          "Number of favourable outcomes divided by total outcomes."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah kebarangkalian teori bagi kesudahan sama mungkin?",
      "answer": [
        [
          "Bilangan kesudahan memihak dibahagi jumlah kesudahan."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "concept",
    "dlp": {
      "prompt": "Can theoretical probability exceed 1?",
      "answer": [
        [
          "No, it is always between 0 and 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Bolehkah kebarangkalian teori melebihi 1?",
      "answer": [
        [
          "Tidak, nilainya antara 0 hingga 1."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4",
          "6"
        ],
        "outside": [
          "1",
          "3",
          "5"
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair die is rolled. Find P(even number).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Dadu adil dilambung. Cari P(nombor genap).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "4",
          "5",
          "6"
        ],
        "outside": [
          "1",
          "2",
          "3"
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair die is rolled. Find P(number at least 4).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Dadu adil dilambung. Cari P(nombor sekurang-kurangnya 4).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4",
          "6"
        ],
        "outside": [
          "1",
          "3",
          "5"
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair die is rolled. Find P(even number).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Dadu adil dilambung. Cari P(nombor genap).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "4",
          "5",
          "6"
        ],
        "outside": [
          "1",
          "2",
          "3"
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair die is rolled. Find P(number at least 4).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Dadu adil dilambung. Cari P(nombor sekurang-kurangnya 4).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4",
          "6"
        ],
        "outside": [
          "1",
          "3",
          "5"
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair die is rolled. Find P(even number).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Dadu adil dilambung. Cari P(nombor genap).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "4",
          "5",
          "6"
        ],
        "outside": [
          "1",
          "2",
          "3"
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair die is rolled. Find P(number at least 4).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Dadu adil dilambung. Cari P(nombor sekurang-kurangnya 4).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4",
          "6"
        ],
        "outside": [
          "1",
          "3",
          "5"
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair die is rolled. Find P(even number).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Dadu adil dilambung. Cari P(nombor genap).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "practice",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "4",
          "5",
          "6"
        ],
        "outside": [
          "1",
          "2",
          "3"
        ]
      }
    ],
    "dlp": {
      "prompt": "A fair die is rolled. Find P(number at least 4).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    },
    "bm": {
      "prompt": "Dadu adil dilambung. Cari P(nombor sekurang-kurangnya 4).",
      "answer": [
        [
          "P = 3 ÷ 6."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Observed frequencies",
          "bm": "Kekerapan diperhatikan"
        },
        "valueHeading": {
          "dlp": "Outcome",
          "bm": "Kesudahan"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "Red",
            "frequency": 2
          },
          {
            "value": "Blue",
            "frequency": 3
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A bag contains 2 red and 3 blue balls of identical size. One ball is chosen at random.",
      "parts": [
        "Find the total possible equally likely balls.",
        "Find P(red).",
        "Find P(blue), and check the probabilities total 1."
      ],
      "answer": [
        [
          "5."
        ],
        [
          "2 ÷ 5."
        ],
        [
          "3 ÷ 5; (2 + 3) ÷ 5 = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Beg mengandungi 2 bola merah dan 3 bola biru bersaiz sama. Satu bola dipilih secara rawak.",
      "parts": [
        "Cari jumlah bola sama mungkin.",
        "Cari P(merah).",
        "Cari P(biru), dan semak jumlah kebarangkalian 1."
      ],
      "answer": [
        [
          "5."
        ],
        [
          "2 ÷ 5."
        ],
        [
          "3 ÷ 5; (2 + 3) ÷ 5 = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Observed frequencies",
          "bm": "Kekerapan diperhatikan"
        },
        "valueHeading": {
          "dlp": "Outcome",
          "bm": "Kesudahan"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "Red",
            "frequency": 3
          },
          {
            "value": "Blue",
            "frequency": 4
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A bag contains 3 red and 4 blue balls of identical size. One ball is chosen at random.",
      "parts": [
        "Find the total possible equally likely balls.",
        "Find P(red).",
        "Find P(blue), and check the probabilities total 1."
      ],
      "answer": [
        [
          "7."
        ],
        [
          "3 ÷ 7."
        ],
        [
          "4 ÷ 7; (3 + 4) ÷ 7 = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Beg mengandungi 3 bola merah dan 4 bola biru bersaiz sama. Satu bola dipilih secara rawak.",
      "parts": [
        "Cari jumlah bola sama mungkin.",
        "Cari P(merah).",
        "Cari P(biru), dan semak jumlah kebarangkalian 1."
      ],
      "answer": [
        [
          "7."
        ],
        [
          "3 ÷ 7."
        ],
        [
          "4 ÷ 7; (3 + 4) ÷ 7 = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Observed frequencies",
          "bm": "Kekerapan diperhatikan"
        },
        "valueHeading": {
          "dlp": "Outcome",
          "bm": "Kesudahan"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "Red",
            "frequency": 4
          },
          {
            "value": "Blue",
            "frequency": 5
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A bag contains 4 red and 5 blue balls of identical size. One ball is chosen at random.",
      "parts": [
        "Find the total possible equally likely balls.",
        "Find P(red).",
        "Find P(blue), and check the probabilities total 1."
      ],
      "answer": [
        [
          "9."
        ],
        [
          "4 ÷ 9."
        ],
        [
          "5 ÷ 9; (4 + 5) ÷ 9 = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Beg mengandungi 4 bola merah dan 5 bola biru bersaiz sama. Satu bola dipilih secara rawak.",
      "parts": [
        "Cari jumlah bola sama mungkin.",
        "Cari P(merah).",
        "Cari P(biru), dan semak jumlah kebarangkalian 1."
      ],
      "answer": [
        [
          "9."
        ],
        [
          "4 ÷ 9."
        ],
        [
          "5 ÷ 9; (4 + 5) ÷ 9 = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "13.3",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "frequency-table",
        "title": {
          "dlp": "Observed frequencies",
          "bm": "Kekerapan diperhatikan"
        },
        "valueHeading": {
          "dlp": "Outcome",
          "bm": "Kesudahan"
        },
        "frequencyHeading": {
          "dlp": "Frequency",
          "bm": "Kekerapan"
        },
        "rows": [
          {
            "value": "Red",
            "frequency": 5
          },
          {
            "value": "Blue",
            "frequency": 6
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A bag contains 5 red and 6 blue balls of identical size. One ball is chosen at random.",
      "parts": [
        "Find the total possible equally likely balls.",
        "Find P(red).",
        "Find P(blue), and check the probabilities total 1."
      ],
      "answer": [
        [
          "11."
        ],
        [
          "5 ÷ 11."
        ],
        [
          "6 ÷ 11; (5 + 6) ÷ 11 = 1."
        ]
      ]
    },
    "bm": {
      "prompt": "Beg mengandungi 5 bola merah dan 6 bola biru bersaiz sama. Satu bola dipilih secara rawak.",
      "parts": [
        "Cari jumlah bola sama mungkin.",
        "Cari P(merah).",
        "Cari P(biru), dan semak jumlah kebarangkalian 1."
      ],
      "answer": [
        [
          "11."
        ],
        [
          "5 ÷ 11."
        ],
        [
          "6 ÷ 11; (5 + 6) ÷ 11 = 1."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "concept",
    "visuals": [
      {
        "kind": "venn-one-set",
        "title": {
          "dlp": "Event A and its sample space",
          "bm": "Peristiwa A dan ruang sampel"
        },
        "setName": "A",
        "inside": [
          "2",
          "4",
          "6"
        ],
        "outside": [
          "1",
          "3",
          "5"
        ]
      }
    ],
    "dlp": {
      "prompt": "What is the complement of event A?",
      "answer": [
        [
          "Every sample-space outcome not in A."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah pelengkap peristiwa A?",
      "answer": [
        [
          "Semua kesudahan ruang sampel yang bukan dalam A."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "concept",
    "dlp": {
      "prompt": "What is P(A) + P(A′)?",
      "answer": [
        [
          "1."
        ]
      ]
    },
    "bm": {
      "prompt": "Berapakah P(A) + P(A′)?",
      "answer": [
        [
          "1."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "concept",
    "dlp": {
      "prompt": "What is the complement of an impossible event?",
      "answer": [
        [
          "A certain event."
        ]
      ]
    },
    "bm": {
      "prompt": "Apakah pelengkap peristiwa mustahil?",
      "answer": [
        [
          "Peristiwa pasti."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Probability scale",
          "bm": "Skala kebarangkalian"
        },
        "min": 0,
        "max": 1,
        "ticks": [
          {
            "value": 0
          },
          {
            "value": 0.25
          },
          {
            "value": 0.5
          },
          {
            "value": 0.75
          },
          {
            "value": 1
          }
        ],
        "points": [
          {
            "value": 0.1,
            "label": "P(A)"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The probability of a bus arriving on time is 0.1. Find the probability it is late.",
      "answer": [
        [
          "P(late) = 1 − 0.1 = 0.9."
        ]
      ]
    },
    "bm": {
      "prompt": "Kebarangkalian bas tiba tepat pada masa ialah 0.1. Cari kebarangkalian bas lewat.",
      "answer": [
        [
          "P(lewat) = 1 − 0.1 = 0.9."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Probability scale",
          "bm": "Skala kebarangkalian"
        },
        "min": 0,
        "max": 1,
        "ticks": [
          {
            "value": 0
          },
          {
            "value": 0.25
          },
          {
            "value": 0.5
          },
          {
            "value": 0.75
          },
          {
            "value": 1
          }
        ],
        "points": [
          {
            "value": 0.2,
            "label": "P(A)"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The probability of a bus arriving on time is 0.2. Find the probability it is late.",
      "answer": [
        [
          "P(late) = 1 − 0.2 = 0.8."
        ]
      ]
    },
    "bm": {
      "prompt": "Kebarangkalian bas tiba tepat pada masa ialah 0.2. Cari kebarangkalian bas lewat.",
      "answer": [
        [
          "P(lewat) = 1 − 0.2 = 0.8."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Probability scale",
          "bm": "Skala kebarangkalian"
        },
        "min": 0,
        "max": 1,
        "ticks": [
          {
            "value": 0
          },
          {
            "value": 0.25
          },
          {
            "value": 0.5
          },
          {
            "value": 0.75
          },
          {
            "value": 1
          }
        ],
        "points": [
          {
            "value": 0.3,
            "label": "P(A)"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The probability of a bus arriving on time is 0.3. Find the probability it is late.",
      "answer": [
        [
          "P(late) = 1 − 0.3 = 0.7."
        ]
      ]
    },
    "bm": {
      "prompt": "Kebarangkalian bas tiba tepat pada masa ialah 0.3. Cari kebarangkalian bas lewat.",
      "answer": [
        [
          "P(lewat) = 1 − 0.3 = 0.7."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Probability scale",
          "bm": "Skala kebarangkalian"
        },
        "min": 0,
        "max": 1,
        "ticks": [
          {
            "value": 0
          },
          {
            "value": 0.25
          },
          {
            "value": 0.5
          },
          {
            "value": 0.75
          },
          {
            "value": 1
          }
        ],
        "points": [
          {
            "value": 0.4,
            "label": "P(A)"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The probability of a bus arriving on time is 0.4. Find the probability it is late.",
      "answer": [
        [
          "P(late) = 1 − 0.4 = 0.6."
        ]
      ]
    },
    "bm": {
      "prompt": "Kebarangkalian bas tiba tepat pada masa ialah 0.4. Cari kebarangkalian bas lewat.",
      "answer": [
        [
          "P(lewat) = 1 − 0.4 = 0.6."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Probability scale",
          "bm": "Skala kebarangkalian"
        },
        "min": 0,
        "max": 1,
        "ticks": [
          {
            "value": 0
          },
          {
            "value": 0.25
          },
          {
            "value": 0.5
          },
          {
            "value": 0.75
          },
          {
            "value": 1
          }
        ],
        "points": [
          {
            "value": 0.5,
            "label": "P(A)"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The probability of a bus arriving on time is 0.5. Find the probability it is late.",
      "answer": [
        [
          "P(late) = 1 − 0.5 = 0.5."
        ]
      ]
    },
    "bm": {
      "prompt": "Kebarangkalian bas tiba tepat pada masa ialah 0.5. Cari kebarangkalian bas lewat.",
      "answer": [
        [
          "P(lewat) = 1 − 0.5 = 0.5."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Probability scale",
          "bm": "Skala kebarangkalian"
        },
        "min": 0,
        "max": 1,
        "ticks": [
          {
            "value": 0
          },
          {
            "value": 0.25
          },
          {
            "value": 0.5
          },
          {
            "value": 0.75
          },
          {
            "value": 1
          }
        ],
        "points": [
          {
            "value": 0.6,
            "label": "P(A)"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The probability of a bus arriving on time is 0.6. Find the probability it is late.",
      "answer": [
        [
          "P(late) = 1 − 0.6 = 0.4."
        ]
      ]
    },
    "bm": {
      "prompt": "Kebarangkalian bas tiba tepat pada masa ialah 0.6. Cari kebarangkalian bas lewat.",
      "answer": [
        [
          "P(lewat) = 1 − 0.6 = 0.4."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Probability scale",
          "bm": "Skala kebarangkalian"
        },
        "min": 0,
        "max": 1,
        "ticks": [
          {
            "value": 0
          },
          {
            "value": 0.25
          },
          {
            "value": 0.5
          },
          {
            "value": 0.75
          },
          {
            "value": 1
          }
        ],
        "points": [
          {
            "value": 0.7,
            "label": "P(A)"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The probability of a bus arriving on time is 0.7. Find the probability it is late.",
      "answer": [
        [
          "P(late) = 1 − 0.7 = 0.30000000000000004."
        ]
      ]
    },
    "bm": {
      "prompt": "Kebarangkalian bas tiba tepat pada masa ialah 0.7. Cari kebarangkalian bas lewat.",
      "answer": [
        [
          "P(lewat) = 1 − 0.7 = 0.30000000000000004."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "practice",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Probability scale",
          "bm": "Skala kebarangkalian"
        },
        "min": 0,
        "max": 1,
        "ticks": [
          {
            "value": 0
          },
          {
            "value": 0.25
          },
          {
            "value": 0.5
          },
          {
            "value": 0.75
          },
          {
            "value": 1
          }
        ],
        "points": [
          {
            "value": 0.8,
            "label": "P(A)"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The probability of a bus arriving on time is 0.8. Find the probability it is late.",
      "answer": [
        [
          "P(late) = 1 − 0.8 = 0.19999999999999996."
        ]
      ]
    },
    "bm": {
      "prompt": "Kebarangkalian bas tiba tepat pada masa ialah 0.8. Cari kebarangkalian bas lewat.",
      "answer": [
        [
          "P(lewat) = 1 − 0.8 = 0.19999999999999996."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Probability scale",
          "bm": "Skala kebarangkalian"
        },
        "min": 0,
        "max": 1,
        "ticks": [
          {
            "value": 0
          },
          {
            "value": 0.25
          },
          {
            "value": 0.5
          },
          {
            "value": 0.75
          },
          {
            "value": 1
          }
        ],
        "points": [
          {
            "value": 0.2,
            "label": "P(A)"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The probability of winning a classroom game is 0.2.",
      "parts": [
        "Find P(not winning).",
        "Find the sum P(win) + P(not win).",
        "Explain why these two events are complementary."
      ],
      "answer": [
        [
          "0.8."
        ],
        [
          "0.2 + 0.8 = 1."
        ],
        [
          "Winning and not winning cover every outcome without overlap."
        ]
      ]
    },
    "bm": {
      "prompt": "Kebarangkalian menang permainan kelas ialah 0.2.",
      "parts": [
        "Cari P(tidak menang).",
        "Cari jumlah P(menang) + P(tidak menang).",
        "Terangkan mengapa dua peristiwa ini saling melengkapi."
      ],
      "answer": [
        [
          "0.8."
        ],
        [
          "0.2 + 0.8 = 1."
        ],
        [
          "Menang dan tidak menang meliputi semua kesudahan tanpa pertindihan."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Probability scale",
          "bm": "Skala kebarangkalian"
        },
        "min": 0,
        "max": 1,
        "ticks": [
          {
            "value": 0
          },
          {
            "value": 0.25
          },
          {
            "value": 0.5
          },
          {
            "value": 0.75
          },
          {
            "value": 1
          }
        ],
        "points": [
          {
            "value": 0.35,
            "label": "P(A)"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The probability of winning a classroom game is 0.35.",
      "parts": [
        "Find P(not winning).",
        "Find the sum P(win) + P(not win).",
        "Explain why these two events are complementary."
      ],
      "answer": [
        [
          "0.65."
        ],
        [
          "0.35 + 0.65 = 1."
        ],
        [
          "Winning and not winning cover every outcome without overlap."
        ]
      ]
    },
    "bm": {
      "prompt": "Kebarangkalian menang permainan kelas ialah 0.35.",
      "parts": [
        "Cari P(tidak menang).",
        "Cari jumlah P(menang) + P(tidak menang).",
        "Terangkan mengapa dua peristiwa ini saling melengkapi."
      ],
      "answer": [
        [
          "0.65."
        ],
        [
          "0.35 + 0.65 = 1."
        ],
        [
          "Menang dan tidak menang meliputi semua kesudahan tanpa pertindihan."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Probability scale",
          "bm": "Skala kebarangkalian"
        },
        "min": 0,
        "max": 1,
        "ticks": [
          {
            "value": 0
          },
          {
            "value": 0.25
          },
          {
            "value": 0.5
          },
          {
            "value": 0.75
          },
          {
            "value": 1
          }
        ],
        "points": [
          {
            "value": 0.4,
            "label": "P(A)"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The probability of winning a classroom game is 0.4.",
      "parts": [
        "Find P(not winning).",
        "Find the sum P(win) + P(not win).",
        "Explain why these two events are complementary."
      ],
      "answer": [
        [
          "0.6."
        ],
        [
          "0.4 + 0.6 = 1."
        ],
        [
          "Winning and not winning cover every outcome without overlap."
        ]
      ]
    },
    "bm": {
      "prompt": "Kebarangkalian menang permainan kelas ialah 0.4.",
      "parts": [
        "Cari P(tidak menang).",
        "Cari jumlah P(menang) + P(tidak menang).",
        "Terangkan mengapa dua peristiwa ini saling melengkapi."
      ],
      "answer": [
        [
          "0.6."
        ],
        [
          "0.4 + 0.6 = 1."
        ],
        [
          "Menang dan tidak menang meliputi semua kesudahan tanpa pertindihan."
        ]
      ]
    }
  },
  {
    "subtopic": "13.4",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "number-line",
        "title": {
          "dlp": "Probability scale",
          "bm": "Skala kebarangkalian"
        },
        "min": 0,
        "max": 1,
        "ticks": [
          {
            "value": 0
          },
          {
            "value": 0.25
          },
          {
            "value": 0.5
          },
          {
            "value": 0.75
          },
          {
            "value": 1
          }
        ],
        "points": [
          {
            "value": 0.65,
            "label": "P(A)"
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The probability of winning a classroom game is 0.65.",
      "parts": [
        "Find P(not winning).",
        "Find the sum P(win) + P(not win).",
        "Explain why these two events are complementary."
      ],
      "answer": [
        [
          "0.35."
        ],
        [
          "0.65 + 0.35 = 1."
        ],
        [
          "Winning and not winning cover every outcome without overlap."
        ]
      ]
    },
    "bm": {
      "prompt": "Kebarangkalian menang permainan kelas ialah 0.65.",
      "parts": [
        "Cari P(tidak menang).",
        "Cari jumlah P(menang) + P(tidak menang).",
        "Terangkan mengapa dua peristiwa ini saling melengkapi."
      ],
      "answer": [
        [
          "0.35."
        ],
        [
          "0.65 + 0.35 = 1."
        ],
        [
          "Menang dan tidak menang meliputi semua kesudahan tanpa pertindihan."
        ]
      ]
    }
  }
];
