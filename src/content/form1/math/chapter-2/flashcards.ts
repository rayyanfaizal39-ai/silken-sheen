import type { Flashcard } from "@/data/content";
import { structuredFront, structuredBack } from "@/features/flashcards/structuredFlashcard";
type MathFlashcardCategoryId = "concepts" | "operations" | "facts" | "practice";
const mathCard = (bmFront:string,bmBack:string,dlpFront:string,dlpBack:string) => ({bm:[bmFront,bmBack] as [string,string],dlp:[dlpFront,dlpBack] as [string,string]});
const LEGACY_C2_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah faktor?",
      "Faktor ialah nombor yang membahagi nombor lain tepat tanpa baki.",
      "What is a factor?",
      "A factor is a number that divides another number exactly without a remainder.",
    ),
    mathCard(
      "Adakah 3 faktor bagi 12?",
      "Ya, kerana 12 ÷ 3 = 4 tanpa baki.",
      "Is 3 a factor of 12?",
      "Yes, because 12 ÷ 3 = 4 with no remainder.",
    ),
    mathCard(
      "Apakah faktor bagi 12?",
      "1, 2, 3, 4, 6 dan 12.",
      "What are the factors of 12?",
      "1, 2, 3, 4, 6 and 12.",
    ),
    mathCard(
      "Apakah faktor bagi 18?",
      "1, 2, 3, 6, 9 dan 18.",
      "What are the factors of 18?",
      "1, 2, 3, 6, 9 and 18.",
    ),
    mathCard(
      "Apakah faktor bagi 20?",
      "1, 2, 4, 5, 10 dan 20.",
      "What are the factors of 20?",
      "1, 2, 4, 5, 10 and 20.",
    ),
    mathCard(
      "Apakah nombor perdana?",
      "Nombor perdana mempunyai tepat dua faktor, iaitu 1 dan nombor itu sendiri.",
      "What is a prime number?",
      "A prime number has exactly two factors: 1 and the number itself.",
    ),
    mathCard(
      "Berikan contoh nombor perdana.",
      "Contohnya 2, 3, 5, 7, 11 dan 13.",
      "Give examples of prime numbers.",
      "Examples include 2, 3, 5, 7, 11 and 13.",
    ),
    mathCard(
      "Adakah 1 nombor perdana?",
      "Tidak. 1 bukan nombor perdana.",
      "Is 1 a prime number?",
      "No. 1 is not a prime number.",
    ),
    mathCard(
      "Apakah faktor perdana?",
      "Faktor perdana ialah faktor bagi suatu nombor yang juga merupakan nombor perdana.",
      "What is a prime factor?",
      "A prime factor is a factor of a number that is also a prime number.",
    ),
    mathCard(
      "Apakah pemfaktoran perdana?",
      "Pemfaktoran perdana ialah menulis nombor sebagai hasil darab faktor perdana.",
      "What is prime factorisation?",
      "Prime factorisation is writing a number as a product of prime factors.",
    ),
    mathCard(
      "Apakah faktor perdana bagi 12?",
      "2 dan 3.",
      "What are the prime factors of 12?",
      "2 and 3.",
    ),
    mathCard(
      "Apakah faktor perdana bagi 18?",
      "2 dan 3.",
      "What are the prime factors of 18?",
      "2 and 3.",
    ),
    mathCard(
      "Apakah faktor perdana bagi 24?",
      "2 dan 3.",
      "What are the prime factors of 24?",
      "2 and 3.",
    ),
    mathCard(
      "Apakah faktor sepunya?",
      "Faktor sepunya ialah faktor yang sama bagi dua atau lebih nombor.",
      "What are common factors?",
      "Common factors are factors shared by two or more numbers.",
    ),
    mathCard(
      "Apakah faktor sepunya bagi 12 dan 18?",
      "1, 2, 3 dan 6.",
      "What are the common factors of 12 and 18?",
      "1, 2, 3 and 6.",
    ),
    mathCard(
      "Apakah maksud FSTB?",
      "FSTB ialah Faktor Sepunya Terbesar.",
      "What does HCF mean?",
      "HCF means Highest Common Factor.",
    ),
    mathCard(
      "Apakah FSTB?",
      "FSTB ialah faktor sepunya yang paling besar.",
      "What is HCF?",
      "HCF is the greatest common factor.",
    ),
    mathCard("Apakah FSTB bagi 12 dan 18?", "6.", "What is the HCF of 12 and 18?", "6."),
    mathCard(
      "Apakah gandaan?",
      "Gandaan ialah hasil darab suatu nombor dengan nombor bulat positif.",
      "What is a multiple?",
      "A multiple is the product of a number and a positive whole number.",
    ),
    mathCard(
      "Apakah gandaan bagi 4?",
      "4, 8, 12, 16, 20, 24 dan seterusnya.",
      "What are multiples of 4?",
      "4, 8, 12, 16, 20, 24 and so on.",
    ),
    mathCard(
      "Apakah gandaan bagi 6?",
      "6, 12, 18, 24, 30, 36 dan seterusnya.",
      "What are multiples of 6?",
      "6, 12, 18, 24, 30, 36 and so on.",
    ),
    mathCard(
      "Apakah gandaan sepunya?",
      "Gandaan sepunya ialah gandaan yang sama bagi dua atau lebih nombor.",
      "What are common multiples?",
      "Common multiples are multiples shared by two or more numbers.",
    ),
    mathCard(
      "Apakah gandaan sepunya bagi 4 dan 6?",
      "12, 24, 36 dan seterusnya.",
      "What are common multiples of 4 and 6?",
      "12, 24, 36 and so on.",
    ),
    mathCard(
      "Apakah maksud GSTK?",
      "GSTK ialah Gandaan Sepunya Terkecil.",
      "What does LCM mean?",
      "LCM means Lowest Common Multiple.",
    ),
    mathCard(
      "Apakah GSTK?",
      "GSTK ialah gandaan sepunya yang paling kecil.",
      "What is LCM?",
      "LCM is the smallest common multiple.",
    ),
    mathCard("Apakah GSTK bagi 4 dan 6?", "12.", "What is the LCM of 4 and 6?", "12."),
    mathCard(
      "Bila FSTB digunakan?",
      "FSTB digunakan untuk pembahagian kepada kumpulan sama banyak.",
      "When is HCF used?",
      "HCF is used for dividing into equal groups.",
    ),
    mathCard(
      "Bila GSTK digunakan?",
      "GSTK digunakan untuk kejadian berulang bersama.",
      "When is LCM used?",
      "LCM is used for repeated events happening together.",
    ),
    mathCard(
      "Apakah kata kunci FSTB?",
      "Terbesar, maksimum dan kumpulan sama.",
      "What are HCF keywords?",
      "Greatest, maximum and equal groups.",
    ),
    mathCard(
      "Apakah kata kunci GSTK?",
      "Terkecil, pertama kali bersama dan berulang.",
      "What are LCM keywords?",
      "Smallest, first time together and repeats.",
    ),
  ],
  operations: [
    mathCard(
      "Bagaimana mencari faktor?",
      "Bahagi nombor dengan nombor bulat dan semak sama ada bakinya sifar.",
      "How do you find factors?",
      "Divide the number by whole numbers and check whether the remainder is zero.",
    ),
    mathCard(
      "Bagaimana mengenal pasti faktor perdana?",
      "Cari faktor nombor itu, kemudian pilih faktor yang merupakan nombor perdana.",
      "How do you identify prime factors?",
      "Find the factors, then choose the factors that are prime numbers.",
    ),
    mathCard(
      "Bagaimana melakukan pemfaktoran perdana?",
      "Bahagi berulang dengan nombor perdana hingga semua faktor menjadi nombor perdana.",
      "How do you perform prime factorisation?",
      "Divide repeatedly by prime numbers until all factors are prime numbers.",
    ),
    mathCard(
      "Apakah pemfaktoran perdana bagi 12?",
      "12 = 2 x 2 x 3.",
      "What is the prime factorisation of 12?",
      "12 = 2 x 2 x 3.",
    ),
    mathCard(
      "Apakah pemfaktoran perdana bagi 18?",
      "18 = 2 x 3 x 3.",
      "What is the prime factorisation of 18?",
      "18 = 2 x 3 x 3.",
    ),
    mathCard(
      "Apakah pemfaktoran perdana bagi 24?",
      "24 = 2 x 2 x 2 x 3.",
      "What is the prime factorisation of 24?",
      "24 = 2 x 2 x 2 x 3.",
    ),
    mathCard(
      "Bagaimana mencari FSTB dengan faktor?",
      "Senaraikan faktor setiap nombor, cari faktor sepunya, kemudian pilih yang terbesar.",
      "How do you find HCF using factors?",
      "List the factors of each number, find the common factors, then choose the greatest.",
    ),
    mathCard(
      "Bagaimana mencari FSTB dengan pemfaktoran perdana?",
      "Ambil faktor perdana sepunya dengan kuasa terkecil.",
      "How do you find HCF using prime factorisation?",
      "Take the common prime factors with the smallest powers.",
    ),
    mathCard(
      "FSTB bagi 12 dan 18 menggunakan pemfaktoran perdana ialah?",
      "2 x 3 = 6.",
      "What is the HCF of 12 and 18 using prime factorisation?",
      "2 x 3 = 6.",
    ),
    mathCard(
      "Bagaimana mencari gandaan?",
      "Darab nombor dengan nombor bulat positif seperti 1, 2, 3, 4 dan seterusnya.",
      "How do you find multiples?",
      "Multiply the number by positive whole numbers such as 1, 2, 3, 4 and so on.",
    ),
    mathCard(
      "Bagaimana mencari GSTK dengan gandaan?",
      "Senaraikan gandaan setiap nombor, cari gandaan sepunya, kemudian pilih yang terkecil.",
      "How do you find LCM using multiples?",
      "List the multiples of each number, find the common multiples, then choose the smallest.",
    ),
    mathCard(
      "Bagaimana mencari GSTK dengan pemfaktoran perdana?",
      "Ambil semua faktor perdana dengan kuasa terbesar.",
      "How do you find LCM using prime factorisation?",
      "Take all prime factors with the greatest powers.",
    ),
    mathCard(
      "GSTK bagi 12 dan 18 menggunakan pemfaktoran perdana ialah?",
      "2 x 2 x 3 x 3 = 36.",
      "What is the LCM of 12 and 18 using prime factorisation?",
      "2 x 2 x 3 x 3 = 36.",
    ),
    mathCard(
      "Apakah kaedah lain selain pembahagian berulang?",
      "Pokok faktor.",
      "What is another method besides repeated division?",
      "A factor tree.",
    ),
    mathCard(
      "Bagaimana memilih antara FSTB dan GSTK?",
      "Gunakan FSTB untuk kumpulan sama; gunakan GSTK untuk pengulangan bersama.",
      "How do you choose between HCF and LCM?",
      "Use HCF for equal groups; use LCM for repeated events together.",
    ),
  ],
  facts: [
    mathCard("FSTB bagi 12 dan 18 ialah?", "6.", "The HCF of 12 and 18 is?", "6."),
    mathCard("GSTK bagi 4 dan 6 ialah?", "12.", "The LCM of 4 and 6 is?", "12."),
    mathCard("GSTK bagi 12 dan 18 ialah?", "36.", "The LCM of 12 and 18 is?", "36."),
    mathCard(
      "FSTB bermaksud apa?",
      "Faktor Sepunya Terbesar.",
      "What does HCF stand for?",
      "Highest Common Factor.",
    ),
    mathCard(
      "GSTK bermaksud apa?",
      "Gandaan Sepunya Terkecil.",
      "What does LCM stand for?",
      "Lowest Common Multiple.",
    ),
    mathCard(
      "FSTB mencari nilai jenis apa?",
      "Faktor sepunya paling besar.",
      "What type of value does HCF find?",
      "The greatest common factor.",
    ),
    mathCard(
      "GSTK mencari nilai jenis apa?",
      "Gandaan sepunya paling kecil.",
      "What type of value does LCM find?",
      "The smallest common multiple.",
    ),
    mathCard(
      "Nombor 2 ialah nombor perdana atau bukan?",
      "Nombor perdana.",
      "Is 2 a prime number?",
      "Yes, it is a prime number.",
    ),
    mathCard(
      "Nombor 1 ialah nombor perdana atau bukan?",
      "Bukan nombor perdana.",
      "Is 1 a prime number?",
      "No, it is not a prime number.",
    ),
    mathCard(
      "Jika soalan menyebut 'pertama kali bersama', gunakan apa?",
      "GSTK.",
      "If a question says 'first time together', what should you use?",
      "LCM.",
    ),
  ],
  practice: [
    mathCard("Adakah 5 faktor bagi 20?", "Ya.", "Is 5 a factor of 20?", "Yes."),
    mathCard("Adakah 7 faktor bagi 20?", "Tidak.", "Is 7 a factor of 20?", "No."),
    mathCard("Cari FSTB bagi 12 dan 18.", "6.", "Find the HCF of 12 and 18.", "6."),
    mathCard("Cari GSTK bagi 4 dan 6.", "12.", "Find the LCM of 4 and 6.", "12."),
    mathCard(
      "Loceng berbunyi setiap 4 dan 6 minit. Bila berbunyi bersama?",
      "Setiap 12 minit.",
      "Bells ring every 4 and 6 minutes. When do they ring together?",
      "Every 12 minutes.",
    ),
  ],
};


const legacy = (["concepts","operations","facts","practice"] as const).flatMap((category) => LEGACY_C2_PAIRS[category].map((entry,index)=>({entry,id:(lang:"bm"|"dlp")=>`math-f1-c2-${lang}-${category}-${index+1}`})));
export const C2_CHALLENGES = [
  {
    "subtopic": "1.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "item-arrays",
        "title": {
          "dlp": "Objects to group",
          "bm": "Objek untuk dikumpulkan"
        },
        "groups": [
          {
            "label": "A",
            "count": 24
          },
          {
            "label": "B",
            "count": 36
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "24 stickers and 36 badges must be packed into the largest equal groups without leftovers.",
      "parts": [
        "Find the HCF of 24 and 36.",
        "How many items of each kind are in one group?",
        "How many groups can be made?"
      ],
      "answer": [
        [
          "HCF(24, 36) = 12."
        ],
        [
          "24 ÷ 12 = 2 stickers; 36 ÷ 12 = 3 badges."
        ],
        [
          "12 groups."
        ]
      ]
    },
    "bm": {
      "prompt": "24 pelekat dan 36 lencana perlu dibahagi kepada kumpulan sama terbesar tanpa baki.",
      "parts": [
        "Cari FSTB bagi 24 dan 36.",
        "Berapa setiap jenis barang dalam satu kumpulan?",
        "Berapa kumpulan boleh dibuat?"
      ],
      "answer": [
        [
          "FSTB(24, 36) = 12."
        ],
        [
          "24 ÷ 12 = 2 pelekat; 36 ÷ 12 = 3 lencana."
        ],
        [
          "12 kumpulan."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "item-arrays",
        "title": {
          "dlp": "Objects to group",
          "bm": "Objek untuk dikumpulkan"
        },
        "groups": [
          {
            "label": "A",
            "count": 42
          },
          {
            "label": "B",
            "count": 56
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A school has 42 red ribbons and 56 blue ribbons. Each bundle must contain identical numbers of both colours.",
      "parts": [
        "Find the greatest possible number of bundles.",
        "Find red ribbons per bundle.",
        "Find blue ribbons per bundle."
      ],
      "answer": [
        [
          "HCF(42,56) = 14."
        ],
        [
          "42 ÷ 14 = 3."
        ],
        [
          "56 ÷ 14 = 4."
        ]
      ]
    },
    "bm": {
      "prompt": "Sekolah mempunyai 42 reben merah dan 56 reben biru. Setiap ikatan mesti mengandungi bilangan sama bagi setiap warna.",
      "parts": [
        "Cari bilangan ikatan maksimum.",
        "Cari reben merah setiap ikatan.",
        "Cari reben biru setiap ikatan."
      ],
      "answer": [
        [
          "FSTB(42,56) = 14."
        ],
        [
          "42 ÷ 14 = 3."
        ],
        [
          "56 ÷ 14 = 4."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Two numbers have prime factors 2 × 2 × 3 and 2 × 3 × 5.",
      "parts": [
        "Write both numbers.",
        "Find their HCF.",
        "Find their LCM."
      ],
      "answer": [
        [
          "12 and 30."
        ],
        [
          "2 × 3 = 6."
        ],
        [
          "2² × 3 × 5 = 60."
        ]
      ]
    },
    "bm": {
      "prompt": "Dua nombor mempunyai faktor perdana 2 × 2 × 3 dan 2 × 3 × 5.",
      "parts": [
        "Tulis kedua-dua nombor.",
        "Cari FSTB.",
        "Cari GSTK."
      ],
      "answer": [
        [
          "12 dan 30."
        ],
        [
          "2 × 3 = 6."
        ],
        [
          "2² × 3 × 5 = 60."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rectangular garden measures 18 m by 30 m. Equal square tiles must have the greatest whole-number side length.",
      "parts": [
        "Find the tile side length.",
        "How many tiles fit along the 18 m side?",
        "How many tiles are needed altogether?"
      ],
      "answer": [
        [
          "HCF(18,30) = 6 m."
        ],
        [
          "18 ÷ 6 = 3."
        ],
        [
          "3 × (30 ÷ 6) = 15 tiles."
        ]
      ]
    },
    "bm": {
      "prompt": "Taman segi empat tepat berukuran 18 m × 30 m. Jubin segi empat sama mestilah bersisi nombor bulat maksimum.",
      "parts": [
        "Cari panjang sisi jubin.",
        "Berapa jubin sepanjang sisi 18 m?",
        "Berapa jumlah jubin?"
      ],
      "answer": [
        [
          "FSTB(18,30) = 6 m."
        ],
        [
          "18 ÷ 6 = 3."
        ],
        [
          "3 × (30 ÷ 6) = 15 jubin."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "multiple-tracks",
        "title": {
          "dlp": "Recurring intervals",
          "bm": "Selang berulang"
        },
        "upTo": 24,
        "tracks": [
          {
            "every": 6
          },
          {
            "every": 8
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Bus A arrives every 6 minutes and bus B every 8 minutes. They arrive together at 9:00 a.m.",
      "parts": [
        "Find their LCM.",
        "Find the next simultaneous arrival time.",
        "How many times will bus A arrive before that time, excluding 9:00?"
      ],
      "answer": [
        [
          "LCM(6,8) = 24 minutes."
        ],
        [
          "9:24 a.m."
        ],
        [
          "At 9:06, 9:12 and 9:18: 3 times."
        ]
      ]
    },
    "bm": {
      "prompt": "Bas A tiba setiap 6 minit dan bas B setiap 8 minit. Kedua-duanya tiba bersama pada 9:00 pagi.",
      "parts": [
        "Cari GSTK.",
        "Cari masa tiba bersama seterusnya.",
        "Berapa kali bas A tiba sebelum masa itu, tidak termasuk 9:00?"
      ],
      "answer": [
        [
          "GSTK(6,8) = 24 minit."
        ],
        [
          "9:24 pagi."
        ],
        [
          "Pada 9:06, 9:12 dan 9:18: 3 kali."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "multiple-tracks",
        "title": {
          "dlp": "Recurring intervals",
          "bm": "Selang berulang"
        },
        "upTo": 30,
        "tracks": [
          {
            "every": 4
          },
          {
            "every": 10
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Two warning lights flash every 4 seconds and every 10 seconds, starting together.",
      "parts": [
        "Find the LCM.",
        "When do they next flash together?",
        "How many flashes does the first light make in the first 20 seconds, excluding the start?"
      ],
      "answer": [
        [
          "LCM(4,10) = 20."
        ],
        [
          "After 20 seconds."
        ],
        [
          "20 ÷ 4 = 5 flashes."
        ]
      ]
    },
    "bm": {
      "prompt": "Dua lampu amaran berkelip setiap 4 saat dan 10 saat, bermula serentak.",
      "parts": [
        "Cari GSTK.",
        "Bilakah berkelip serentak semula?",
        "Berapa kelipan lampu pertama dalam 20 saat, tidak termasuk permulaan?"
      ],
      "answer": [
        [
          "GSTK(4,10) = 20."
        ],
        [
          "Selepas 20 saat."
        ],
        [
          "20 ÷ 4 = 5 kelipan."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "multiple-tracks",
        "title": {
          "dlp": "Recurring intervals",
          "bm": "Selang berulang"
        },
        "upTo": 15,
        "tracks": [
          {
            "every": 3
          },
          {
            "every": 5
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A gardener waters roses every 3 days and orchids every 5 days, beginning on Monday.",
      "parts": [
        "Find the number of days until both are watered again.",
        "What day of the week is that?",
        "How many times are roses watered after Monday up to that day?"
      ],
      "answer": [
        [
          "LCM(3,5) = 15 days."
        ],
        [
          "Monday + 15 days = Tuesday."
        ],
        [
          "15 ÷ 3 = 5 times."
        ]
      ]
    },
    "bm": {
      "prompt": "Tukang kebun menyiram ros setiap 3 hari dan orkid setiap 5 hari, bermula hari Isnin.",
      "parts": [
        "Cari bilangan hari sehingga kedua-duanya disiram semula.",
        "Hari apakah itu?",
        "Berapa kali ros disiram selepas Isnin sehingga hari itu?"
      ],
      "answer": [
        [
          "GSTK(3,5) = 15 hari."
        ],
        [
          "Isnin + 15 hari = Selasa."
        ],
        [
          "15 ÷ 3 = 5 kali."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Three bells ring every 4, 6 and 9 minutes. All ring at noon.",
      "parts": [
        "Find the LCM of their intervals.",
        "At what time do they next ring together?",
        "How many times does the 9-minute bell ring after noon before that time?"
      ],
      "answer": [
        [
          "LCM(4,6,9) = 36 minutes."
        ],
        [
          "12:36 p.m."
        ],
        [
          "At 12:09, 12:18 and 12:27: 3 times."
        ]
      ]
    },
    "bm": {
      "prompt": "Tiga loceng berbunyi setiap 4, 6 dan 9 minit. Semua berbunyi pada tengah hari.",
      "parts": [
        "Cari GSTK bagi selang masa.",
        "Bilakah bunyi serentak seterusnya?",
        "Berapa kali loceng 9 minit berbunyi selepas tengah hari sebelum masa itu?"
      ],
      "answer": [
        [
          "GSTK(4,6,9) = 36 minit."
        ],
        [
          "12:36 tengah hari."
        ],
        [
          "Pada 12:09, 12:18 dan 12:27: 3 kali."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Find two numbers whose HCF is 6 and LCM is 36. Use 12 as the first number.",
      "parts": [
        "Use HCF × LCM to find their product.",
        "Find the second number.",
        "Check the HCF and LCM."
      ],
      "answer": [
        [
          "6 × 36 = 216."
        ],
        [
          "216 ÷ 12 = 18."
        ],
        [
          "HCF(12,18)=6; LCM(12,18)=36."
        ]
      ]
    },
    "bm": {
      "prompt": "Cari dua nombor dengan FSTB 6 dan GSTK 36. Gunakan 12 sebagai nombor pertama.",
      "parts": [
        "Gunakan FSTB × GSTK untuk hasil darab.",
        "Cari nombor kedua.",
        "Semak FSTB dan GSTK."
      ],
      "answer": [
        [
          "6 × 36 = 216."
        ],
        [
          "216 ÷ 12 = 18."
        ],
        [
          "FSTB(12,18)=6; GSTK(12,18)=36."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "multiple-tracks",
        "title": {
          "dlp": "Recurring intervals",
          "bm": "Selang berulang"
        },
        "upTo": 40,
        "tracks": [
          {
            "every": 12
          },
          {
            "every": 18
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A runner completes laps in 12 minutes and a cyclist in 18 minutes, starting together.",
      "parts": [
        "Find when both finish together again.",
        "How many laps does the runner complete?",
        "How many laps does the cyclist complete?"
      ],
      "answer": [
        [
          "LCM(12,18) = 36 minutes."
        ],
        [
          "36 ÷ 12 = 3 laps."
        ],
        [
          "36 ÷ 18 = 2 laps."
        ]
      ]
    },
    "bm": {
      "prompt": "Pelari melengkapkan pusingan dalam 12 minit dan penunggang basikal dalam 18 minit, bermula serentak.",
      "parts": [
        "Cari masa kedua-duanya tamat serentak semula.",
        "Berapa pusingan pelari?",
        "Berapa pusingan penunggang basikal?"
      ],
      "answer": [
        [
          "GSTK(12,18) = 36 minit."
        ],
        [
          "36 ÷ 12 = 3 pusingan."
        ],
        [
          "36 ÷ 18 = 2 pusingan."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "item-arrays",
        "title": {
          "dlp": "Objects to group",
          "bm": "Objek untuk dikumpulkan"
        },
        "groups": [
          {
            "label": "A",
            "count": 60
          },
          {
            "label": "B",
            "count": 48
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A teacher distributes 60 pencils and 48 erasers into identical packs with no leftovers.",
      "parts": [
        "Find the greatest number of packs.",
        "How many pencils per pack?",
        "How many erasers per pack?"
      ],
      "answer": [
        [
          "HCF(60,48) = 12 packs."
        ],
        [
          "60 ÷ 12 = 5."
        ],
        [
          "48 ÷ 12 = 4."
        ]
      ]
    },
    "bm": {
      "prompt": "Guru membahagikan 60 pensel dan 48 pemadam kepada pek sama tanpa baki.",
      "parts": [
        "Cari bilangan pek maksimum.",
        "Berapa pensel setiap pek?",
        "Berapa pemadam setiap pek?"
      ],
      "answer": [
        [
          "FSTB(60,48) = 12 pek."
        ],
        [
          "60 ÷ 12 = 5."
        ],
        [
          "48 ÷ 12 = 4."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Two ferries leave a pier every 9 and 12 minutes. Both leave at 8:00 a.m.",
      "parts": [
        "Find their LCM.",
        "When do they next depart together?",
        "How many 9-minute ferry departures occur after 8:00 up to 8:36?"
      ],
      "answer": [
        [
          "LCM(9,12) = 36 minutes."
        ],
        [
          "8:36 a.m."
        ],
        [
          "36 ÷ 9 = 4 departures."
        ]
      ]
    },
    "bm": {
      "prompt": "Dua feri bertolak dari jeti setiap 9 dan 12 minit. Kedua-duanya bertolak pada 8:00 pagi.",
      "parts": [
        "Cari GSTK.",
        "Bilakah bertolak bersama seterusnya?",
        "Berapa feri 9 minit bertolak selepas 8:00 hingga 8:36?"
      ],
      "answer": [
        [
          "GSTK(9,12) = 36 minit."
        ],
        [
          "8:36 pagi."
        ],
        [
          "36 ÷ 9 = 4 kali."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A hall is 24 m by 36 m. Identical square carpets must cover it without cutting.",
      "parts": [
        "Find the greatest possible carpet side.",
        "How many carpets fit across its width?",
        "Find the total number of carpets."
      ],
      "answer": [
        [
          "HCF(24,36)=12 m."
        ],
        [
          "24 ÷ 12 = 2."
        ],
        [
          "2 × (36 ÷ 12) = 6 carpets."
        ]
      ]
    },
    "bm": {
      "prompt": "Dewan berukuran 24 m × 36 m. Permaidani segi empat sama perlu menutupinya tanpa pemotongan.",
      "parts": [
        "Cari sisi permaidani maksimum.",
        "Berapa permaidani pada lebarnya?",
        "Cari jumlah permaidani."
      ],
      "answer": [
        [
          "FSTB(24,36)=12 m."
        ],
        [
          "24 ÷ 12 = 2."
        ],
        [
          "2 × (36 ÷ 12) = 6 permaidani."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "multiple-tracks",
        "title": {
          "dlp": "Recurring intervals",
          "bm": "Selang berulang"
        },
        "upTo": 36,
        "tracks": [
          {
            "every": 8
          },
          {
            "every": 12
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "One sprinkler runs every 8 hours, another every 12 hours, starting simultaneously at 6:00 a.m.",
      "parts": [
        "Find the time interval to the next simultaneous run.",
        "When do they next run together?",
        "How many times does the 8-hour sprinkler run after the start, up to that time?"
      ],
      "answer": [
        [
          "LCM(8,12)=24 hours."
        ],
        [
          "6:00 a.m. next day."
        ],
        [
          "24 ÷ 8 = 3 times."
        ]
      ]
    },
    "bm": {
      "prompt": "Penyiram pertama berfungsi setiap 8 jam dan yang kedua setiap 12 jam, bermula serentak pada 6:00 pagi.",
      "parts": [
        "Cari selang masa untuk berfungsi serentak semula.",
        "Bilakah kedua-duanya berfungsi serentak?",
        "Berapa kali penyiram 8 jam berfungsi selepas mula hingga masa itu?"
      ],
      "answer": [
        [
          "GSTK(8,12)=24 jam."
        ],
        [
          "6:00 pagi hari berikutnya."
        ],
        [
          "24 ÷ 8 = 3 kali."
        ]
      ]
    }
  },
  {
    "subtopic": "1.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Two ropes measuring 72 cm and 90 cm are cut into longest identical pieces with no waste.",
      "parts": [
        "Find the greatest piece length.",
        "How many pieces from the 72 cm rope?",
        "Find total pieces."
      ],
      "answer": [
        [
          "HCF(72,90)=18 cm."
        ],
        [
          "72 ÷ 18 = 4 pieces."
        ],
        [
          "4 + (90 ÷ 18) = 9 pieces."
        ]
      ]
    },
    "bm": {
      "prompt": "Dua tali sepanjang 72 cm dan 90 cm dipotong menjadi bahagian sama terpanjang tanpa baki.",
      "parts": [
        "Cari panjang maksimum sepotong.",
        "Berapa keping daripada tali 72 cm?",
        "Cari jumlah keping."
      ],
      "answer": [
        [
          "FSTB(72,90)=18 cm."
        ],
        [
          "72 ÷ 18 = 4 keping."
        ],
        [
          "4 + (90 ÷ 18) = 9 keping."
        ]
      ]
    }
  },
  {
    "subtopic": "1.2",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "multiple-tracks",
        "title": {
          "dlp": "Recurring intervals",
          "bm": "Selang berulang"
        },
        "upTo": 40,
        "tracks": [
          {
            "every": 6
          },
          {
            "every": 15
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Music lessons occur every 6 days and art lessons every 15 days, starting on the same date.",
      "parts": [
        "Find when both lessons next coincide.",
        "How many music sessions take place after the start, up to that day?",
        "How many art sessions take place after the start, up to that day?"
      ],
      "answer": [
        [
          "LCM(6,15)=30 days."
        ],
        [
          "30 ÷ 6 = 5 sessions."
        ],
        [
          "30 ÷ 15 = 2 sessions."
        ]
      ]
    },
    "bm": {
      "prompt": "Kelas muzik setiap 6 hari dan kelas seni setiap 15 hari, bermula pada tarikh sama.",
      "parts": [
        "Cari bila kedua-dua kelas bertemu semula.",
        "Berapa sesi muzik selepas mula hingga hari itu?",
        "Berapa sesi seni selepas mula hingga hari itu?"
      ],
      "answer": [
        [
          "GSTK(6,15)=30 hari."
        ],
        [
          "30 ÷ 6 = 5 sesi."
        ],
        [
          "30 ÷ 15 = 2 sesi."
        ]
      ]
    }
  }
];
export function buildMathF1C2Flashcards(lang:"bm"|"dlp"):Flashcard[] {
 if(legacy.length !== 60 || C2_CHALLENGES.length !== 16) throw new Error("Chapter 2 deck bank invariant failed");
 return legacy.map(({entry,id},index)=>{
  const mode=index<12?"concept":index<44?"practice":"challenge";
  const challenge=mode==="challenge"?C2_CHALLENGES[index-44]:null;
  const subtopic=challenge?.subtopic ?? (index<20?"2.1":index<38?"2.2":"2.3");
  const structured=challenge?{...challenge[lang],visuals:challenge.visuals}:{prompt:entry[lang][0],answer:[[entry[lang][1]]]};
  return {id:id(lang),subjectId:"math",form:"Form 1",chapter:"Chapter 2",lang,front:structuredFront(structured),back:structuredBack(structured),subtopic,reviewMode:mode,structured};
 });
}
