import type {Flashcard} from "@/data/content";
import {structuredFront,structuredBack,type StructuredFlashcard} from "@/features/flashcards/structuredFlashcard";
type MathFlashcardCategoryId="concepts"|"operations"|"facts"|"practice";
const mathCard=(bmFront:string,bmBack:string,dlpFront:string,dlpBack:string)=>({bm:[bmFront,bmBack] as [string,string],dlp:[dlpFront,dlpBack] as [string,string]});
const LEGACY_C4_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah nisbah?",
      "Nisbah ialah perbandingan dua atau lebih kuantiti yang sama jenis dan unit.",
      "What is a ratio?",
      "A ratio compares two or more quantities of the same kind and same unit.",
    ),
    mathCard(
      "Bagaimana nisbah ditulis?",
      "Dalam bentuk a : b atau a : b : c.",
      "How is a ratio written?",
      "In the form a : b or a : b : c.",
    ),
    mathCard(
      "Apakah syarat utama membentuk nisbah?",
      "Kuantiti mestilah sama jenis dan sama unit.",
      "What is the main condition to form a ratio?",
      "The quantities must be of the same kind and same unit.",
    ),
    mathCard(
      "Apakah nisbah setara?",
      "Nisbah yang mempunyai nilai sama tetapi ditulis dalam bentuk berbeza.",
      "What are equivalent ratios?",
      "Ratios that have the same value but are written differently.",
    ),
    mathCard(
      "Bagaimana mendapat nisbah setara?",
      "Darab atau bahagi setiap sebutan dengan nombor sama bukan sifar.",
      "How do you form an equivalent ratio?",
      "Multiply or divide each term by the same non-zero number.",
    ),
    mathCard(
      "Apakah bentuk termudah nisbah?",
      "Apabila FSTB semua sebutan ialah 1.",
      "What is the simplest form of a ratio?",
      "When the HCF of all terms is 1.",
    ),
    mathCard(
      "Bagaimana mempermudah nisbah?",
      "Bahagi semua sebutan dengan FSTB mereka.",
      "How do you simplify a ratio?",
      "Divide every term by their HCF.",
    ),
    mathCard(
      "Apakah yang perlu dilakukan jika nisbah dalam unit berbeza?",
      "Tukar kepada unit yang sama dahulu.",
      "What should you do if a ratio has different units?",
      "Convert to the same unit first.",
    ),
    mathCard(
      "Apakah kadar?",
      "Kadar ialah perbandingan dua kuantiti yang berlainan jenis atau unit.",
      "What is a rate?",
      "A rate compares two quantities of different kinds or units.",
    ),
    mathCard(
      "Berikan contoh kadar.",
      "60 km/j, RM 5 per kg, 12 km per liter.",
      "Give examples of rates.",
      "60 km/h, RM 5 per kg, 12 km per litre.",
    ),
    mathCard(
      "Apakah perbezaan utama nisbah dan kadar?",
      "Nisbah membandingkan kuantiti sama jenis; kadar membandingkan kuantiti berbeza jenis.",
      "What is the main difference between a ratio and a rate?",
      "A ratio compares same-kind quantities; a rate compares different-kind quantities.",
    ),
    mathCard(
      "Apakah kadaran?",
      "Kadaran ialah persamaan dua nisbah atau dua kadar yang setara.",
      "What is a proportion?",
      "A proportion is an equation of two equivalent ratios or rates.",
    ),
    mathCard(
      "Bagaimana kadaran ditulis?",
      "a : b = c : d atau a/b = c/d.",
      "How is a proportion written?",
      "a : b = c : d or a/b = c/d.",
    ),
    mathCard(
      "Apakah maksud nisbah sebagai pecahan?",
      "Nisbah a : b boleh ditulis sebagai a/b.",
      "What does ratio mean as a fraction?",
      "The ratio a : b can be written as a/b.",
    ),
    mathCard(
      "Bagaimana peratusan ditulis sebagai nisbah?",
      "x% ditulis sebagai x : 100.",
      "How is a percentage written as a ratio?",
      "x% is written as x : 100.",
    ),
  ],
  operations: [
    mathCard(
      "Apakah langkah pertama mempermudah nisbah?",
      "Cari FSTB bagi semua sebutan.",
      "What is the first step to simplify a ratio?",
      "Find the HCF of all the terms.",
    ),
    mathCard(
      "Bagaimana menggabungkan A : B dan B : C?",
      "Samakan nilai B menggunakan GSTK, kemudian gabungkan.",
      "How do you combine A : B and B : C?",
      "Make the value of B equal using the LCM, then combine.",
    ),
    mathCard(
      "Apakah kaedah unitari?",
      "Cari nilai satu unit, kemudian darab dengan bilangan unit yang dikehendaki.",
      "What is the unitary method?",
      "Find the value of one unit, then multiply by the number of units required.",
    ),
    mathCard(
      "Apakah kaedah kadaran?",
      "Tulis dua nisbah sebagai pecahan setara dan selesaikan.",
      "What is the proportion method?",
      "Write the two ratios as equivalent fractions and solve.",
    ),
    mathCard(
      "Apakah kaedah pendaraban silang?",
      "Jika a/b = c/d, maka a × d = b × c.",
      "What is the cross-multiplication method?",
      "If a/b = c/d, then a × d = b × c.",
    ),
    mathCard(
      "Bilakah kaedah pendaraban silang digunakan?",
      "Apabila nilai tidak diketahui berada dalam pengangka atau penyebut kadaran.",
      "When is cross multiplication used?",
      "When the unknown is in the numerator or denominator of a proportion.",
    ),
    mathCard(
      "Bagaimana menukar RM per m kepada RM per cm?",
      "Bahagikan dengan 100 kerana 1 m = 100 cm.",
      "How do you convert RM per m to RM per cm?",
      "Divide by 100 because 1 m = 100 cm.",
    ),
    mathCard(
      "Bagaimana menukar km/j kepada m/s?",
      "Bahagi dengan 3.6 atau darab dengan 1000/3600.",
      "How do you convert km/h to m/s?",
      "Divide by 3.6 or multiply by 1000/3600.",
    ),
    mathCard(
      "Bagaimana mencari kadar laju?",
      "Bahagikan jarak dengan masa.",
      "How do you find speed?",
      "Divide distance by time.",
    ),
    mathCard(
      "Bagaimana mencari harga seunit?",
      "Bahagikan jumlah harga dengan kuantiti.",
      "How do you find unit price?",
      "Divide total price by quantity.",
    ),
    mathCard(
      "Bagaimana mengesahkan dua nisbah setara?",
      "Permudahkan kedua-duanya kepada bentuk termudah dan bandingkan.",
      "How do you check two ratios are equivalent?",
      "Reduce both to simplest form and compare.",
    ),
    mathCard(
      "Bagaimana menyelesaikan 4/6 = x/9?",
      "Pendaraban silang: 4 × 9 = 6x, x = 6.",
      "How do you solve 4/6 = x/9?",
      "Cross multiply: 4 × 9 = 6x, x = 6.",
    ),
    mathCard(
      "Bagaimana mempermudah 12 : 18?",
      "FSTB = 6, jadi 12 : 18 = 2 : 3.",
      "How do you simplify 12 : 18?",
      "HCF = 6, so 12 : 18 = 2 : 3.",
    ),
    mathCard(
      "Bagaimana mempermudah 6 : 9 : 12?",
      "FSTB = 3, jadi 6 : 9 : 12 = 2 : 3 : 4.",
      "How do you simplify 6 : 9 : 12?",
      "HCF = 3, so 6 : 9 : 12 = 2 : 3 : 4.",
    ),
    mathCard(
      "Bagaimana mengira skala peta?",
      "Skala 1 : n bermaksud 1 unit pada peta = n unit sebenar.",
      "How do you read a map scale?",
      "A scale of 1 : n means 1 unit on the map = n actual units.",
    ),
  ],
  facts: [
    mathCard("1 m = ? cm", "100 cm.", "1 m = ? cm", "100 cm."),
    mathCard("1 km = ? m", "1000 m.", "1 km = ? m", "1000 m."),
    mathCard("1 jam = ? minit", "60 minit.", "1 hour = ? minutes", "60 minutes."),
    mathCard("1 kg = ? g", "1000 g.", "1 kg = ? g", "1000 g."),
    mathCard("50% sebagai nisbah?", "1 : 2.", "50% as a ratio?", "1 : 2."),
    mathCard("25% sebagai nisbah?", "1 : 4.", "25% as a ratio?", "1 : 4."),
    mathCard("20% sebagai nisbah?", "1 : 5.", "20% as a ratio?", "1 : 5."),
    mathCard("80% sebagai nisbah?", "4 : 5.", "80% as a ratio?", "4 : 5."),
    mathCard("75% sebagai nisbah?", "3 : 4.", "75% as a ratio?", "3 : 4."),
    mathCard(
      "Formula pendaraban silang?",
      "a × d = b × c.",
      "Cross-multiplication formula?",
      "a × d = b × c.",
    ),
    mathCard(
      "Formula peratusan kepada bahagian?",
      "x/100 = Bahagian/Keseluruhan.",
      "Percentage to part formula?",
      "x/100 = Part/Whole.",
    ),
    mathCard(
      "Formula anggaran populasi?",
      "(Ditangkap bertanda / Jumlah ditangkap semula) = (Asal ditanda / Anggaran populasi).",
      "Population estimation formula?",
      "(Marked recaptured / Total recaptured) = (Originally marked / Estimated population).",
    ),
    mathCard("2 : 3 = 4 : ?", "6.", "2 : 3 = 4 : ?", "6."),
    mathCard("3 : 5 = ? : 15", "9.", "3 : 5 = ? : 15", "9."),
    mathCard("FSTB bagi 8 dan 12?", "4.", "HCF of 8 and 12?", "4."),
  ],
  practice: [
    mathCard("Permudahkan 15 : 25.", "3 : 5.", "Simplify 15 : 25.", "3 : 5."),
    mathCard(
      "Jika 5 buku berharga RM 20, harga 8 buku ialah?",
      "RM 32.",
      "If 5 books cost RM 20, the cost of 8 books is?",
      "RM 32.",
    ),
    mathCard("Selesaikan 3/4 = x/12.", "x = 9.", "Solve 3/4 = x/12.", "x = 9."),
    mathCard(
      "Kereta bergerak 120 km dalam 2 jam. Apakah kelajuannya?",
      "60 km/j.",
      "A car travels 120 km in 2 hours. What is its speed?",
      "60 km/h.",
    ),
    mathCard(
      "Jika A : B = 2 : 3 dan B : C = 4 : 5, maka A : B : C ialah?",
      "8 : 12 : 15.",
      "If A : B = 2 : 3 and B : C = 4 : 5, then A : B : C is?",
      "8 : 12 : 15.",
    ),
    mathCard(
      "Tukar RM 8 per m kepada RM per cm.",
      "RM 0.08 per cm.",
      "Convert RM 8 per m to RM per cm.",
      "RM 0.08 per cm.",
    ),
    mathCard("Adakah 2 : 3 dan 8 : 12 setara?", "Ya.", "Are 2 : 3 and 8 : 12 equivalent?", "Yes."),
    mathCard("Permudahkan 200 g : 1 kg.", "1 : 5.", "Simplify 200 g : 1 kg.", "1 : 5."),
    mathCard(
      "Tulis 40% sebagai nisbah termudah.",
      "2 : 5.",
      "Write 40% as a simplest ratio.",
      "2 : 5.",
    ),
    mathCard("5 pen = RM 15. Harga 3 pen?", "RM 9.", "5 pens = RM 15. Price of 3 pens?", "RM 9."),
    mathCard(
      "Skala peta 1 : 1000. Jarak sebenar 5 cm pada peta ialah?",
      "5000 cm atau 50 m.",
      "Map scale 1 : 1000. Actual distance for 5 cm on map?",
      "5000 cm or 50 m.",
    ),
    mathCard(
      "20 ditanda dilepaskan; 50 ditangkap, 10 bertanda. Anggaran populasi?",
      "100.",
      "20 marked released; 50 recaptured, 10 marked. Estimated population?",
      "100.",
    ),
    mathCard(
      "Resipi untuk 4 orang gunakan 200 g tepung. Untuk 6 orang?",
      "300 g.",
      "Recipe for 4 uses 200 g flour. For 6 people?",
      "300 g.",
    ),
    mathCard(
      "Kadar 90 km/j sama dengan berapa m/s?",
      "25 m/s.",
      "Rate 90 km/h equals how many m/s?",
      "25 m/s.",
    ),
    mathCard(
      "Jika nisbah lelaki kepada perempuan 3 : 2 dan jumlah 25, berapa lelaki?",
      "15.",
      "If boys to girls is 3 : 2 and total is 25, how many boys?",
      "15.",
    ),
  ],
};


const legacy=(["concepts","operations","facts","practice"] as const).flatMap(category=>LEGACY_C4_PAIRS[category].map((entry,index)=>({entry,id:(lang:"bm"|"dlp")=>`math-f1-c4-${lang}-${category}-${index+1}`})));
export const C4_CHALLENGES=[
  {
    "subtopic": "4.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "ratio-bars",
        "title": {
          "dlp": "Given share ratio",
          "bm": "Nisbah bahagian diberi"
        },
        "rows": [
          {
            "label": "A",
            "parts": 3
          },
          {
            "label": "B",
            "parts": 5
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The ratio of red to blue beads is 3:5. There are 40 beads.",
      "parts": [
        "Find the total parts.",
        "Find the number of red beads.",
        "Find the number of blue beads."
      ],
      "answer": [
        [
          "3 + 5 = 8 parts."
        ],
        [
          "40 × 3/8 = 15."
        ],
        [
          "40 × 5/8 = 25."
        ]
      ]
    },
    "bm": {
      "prompt": "Nisbah manik merah kepada biru ialah 3:5. Jumlah manik ialah 40.",
      "parts": [
        "Cari jumlah bahagian.",
        "Cari bilangan manik merah.",
        "Cari bilangan manik biru."
      ],
      "answer": [
        [
          "3 + 5 = 8 parts."
        ],
        [
          "40 × 3/8 = 15."
        ],
        [
          "40 × 5/8 = 25."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "ratio-bars",
        "title": {
          "dlp": "Given share ratio",
          "bm": "Nisbah bahagian diberi"
        },
        "rows": [
          {
            "label": "A",
            "parts": 4
          },
          {
            "label": "B",
            "parts": 7
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "A school has boys and girls in the ratio 4:7. There are 28 boys.",
      "parts": [
        "Find the value of one part.",
        "Find the number of girls.",
        "Find the total number of pupils."
      ],
      "answer": [
        [
          "28 ÷ 4 = 7."
        ],
        [
          "7 × 7 = 49."
        ],
        [
          "28 + 49 = 77."
        ]
      ]
    },
    "bm": {
      "prompt": "Nisbah lelaki kepada perempuan ialah 4:7. Bilangan lelaki ialah 28.",
      "parts": [
        "Cari nilai satu bahagian.",
        "Cari bilangan perempuan.",
        "Cari jumlah murid."
      ],
      "answer": [
        [
          "28 ÷ 4 = 7."
        ],
        [
          "7 × 7 = 49."
        ],
        [
          "28 + 49 = 77."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "ratio-bars",
        "title": {
          "dlp": "Given share ratio",
          "bm": "Nisbah bahagian diberi"
        },
        "rows": [
          {
            "label": "A",
            "parts": 2
          },
          {
            "label": "B",
            "parts": 3
          },
          {
            "label": "C",
            "parts": 4
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "Three friends share RM180 in the ratio 2:3:4.",
      "parts": [
        "Find the sum of parts.",
        "Find the smallest share.",
        "Find the largest share."
      ],
      "answer": [
        [
          "2 + 3 + 4 = 9."
        ],
        [
          "RM180 × 2/9 = RM40."
        ],
        [
          "RM180 × 4/9 = RM80."
        ]
      ]
    },
    "bm": {
      "prompt": "Tiga rakan membahagi RM180 dalam nisbah 2:3:4.",
      "parts": [
        "Cari jumlah bahagian.",
        "Cari bahagian terkecil.",
        "Cari bahagian terbesar."
      ],
      "answer": [
        [
          "2 + 3 + 4 = 9."
        ],
        [
          "RM180 × 2/9 = RM40."
        ],
        [
          "RM180 × 4/9 = RM80."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "challenge",
    "visuals": [
      {
        "kind": "ratio-bars",
        "title": {
          "dlp": "Given share ratio",
          "bm": "Nisbah bahagian diberi"
        },
        "rows": [
          {
            "label": "A",
            "parts": 2
          },
          {
            "label": "B",
            "parts": 3
          }
        ]
      }
    ],
    "dlp": {
      "prompt": "The ratio of orange to apple juice is 2:3. A drink contains 750 mL in total.",
      "parts": [
        "Find the volume of orange juice.",
        "Find the volume of apple juice.",
        "How much more apple juice is used?"
      ],
      "answer": [
        [
          "750 × 2/5 = 300 mL."
        ],
        [
          "750 × 3/5 = 450 mL."
        ],
        [
          "450 − 300 = 150 mL."
        ]
      ]
    },
    "bm": {
      "prompt": "Nisbah jus oren kepada jus epal ialah 2:3. Minuman berjumlah 750 mL.",
      "parts": [
        "Cari isi padu jus oren.",
        "Cari isi padu jus epal.",
        "Berapa lebih jus epal digunakan?"
      ],
      "answer": [
        [
          "750 × 2/5 = 300 mL."
        ],
        [
          "750 × 3/5 = 450 mL."
        ],
        [
          "450 − 300 = 150 mL."
        ]
      ]
    }
  },
  {
    "subtopic": "4.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A map scale shows 1 cm : 5 km. Two towns are 7 cm apart on the map.",
      "parts": [
        "Find the actual distance.",
        "Express 5 km in centimetres.",
        "Write the scale as 1:n."
      ],
      "answer": [
        [
          "7 × 5 = 35 km."
        ],
        [
          "5 km = 500,000 cm."
        ],
        [
          "1:500,000."
        ]
      ]
    },
    "bm": {
      "prompt": "Skala peta ialah 1 cm : 5 km. Dua bandar berjarak 7 cm pada peta.",
      "parts": [
        "Cari jarak sebenar.",
        "Ungkapkan 5 km dalam sentimeter.",
        "Tulis skala dalam bentuk 1:n."
      ],
      "answer": [
        [
          "7 × 5 = 35 km."
        ],
        [
          "5 km = 500,000 cm."
        ],
        [
          "1:500,000."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A cyclist travels 48 km in 3 hours at a constant speed.",
      "parts": [
        "Calculate speed in km/h.",
        "Find distance in 5 hours.",
        "Find time taken to travel 80 km."
      ],
      "answer": [
        [
          "48 ÷ 3 = 16 km/h."
        ],
        [
          "16 × 5 = 80 km."
        ],
        [
          "80 ÷ 16 = 5 hours."
        ]
      ]
    },
    "bm": {
      "prompt": "Penunggang basikal bergerak 48 km dalam 3 jam pada laju tetap.",
      "parts": [
        "Hitung laju dalam km/j.",
        "Cari jarak dalam 5 jam.",
        "Cari masa untuk bergerak 80 km."
      ],
      "answer": [
        [
          "48 ÷ 3 = 16 km/h."
        ],
        [
          "16 × 5 = 80 km."
        ],
        [
          "80 ÷ 16 = 5 hours."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Six notebooks cost RM27 at a fixed unit price.",
      "parts": [
        "Find the price per notebook.",
        "Find the cost of 10 notebooks.",
        "How many notebooks can RM45 buy?"
      ],
      "answer": [
        [
          "27 ÷ 6 = RM4.50."
        ],
        [
          "10 × RM4.50 = RM45."
        ],
        [
          "45 ÷ 4.50 = 10."
        ]
      ]
    },
    "bm": {
      "prompt": "Enam buku nota berharga RM27 pada harga seunit tetap.",
      "parts": [
        "Cari harga sebuah buku.",
        "Cari harga 10 buku.",
        "Berapa buku boleh dibeli dengan RM45?"
      ],
      "answer": [
        [
          "27 ÷ 6 = RM4.50."
        ],
        [
          "10 × RM4.50 = RM45."
        ],
        [
          "45 ÷ 4.50 = 10."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A tap fills 36 L in 4 minutes at a constant rate.",
      "parts": [
        "Find the rate in L/min.",
        "Find water volume in 7 minutes.",
        "How long to fill 90 L?"
      ],
      "answer": [
        [
          "36 ÷ 4 = 9 L/min."
        ],
        [
          "9 × 7 = 63 L."
        ],
        [
          "90 ÷ 9 = 10 minutes."
        ]
      ]
    },
    "bm": {
      "prompt": "Paip mengisi 36 L dalam 4 minit pada kadar tetap.",
      "parts": [
        "Cari kadar dalam L/min.",
        "Cari isi padu dalam 7 minit.",
        "Berapa lama untuk mengisi 90 L?"
      ],
      "answer": [
        [
          "36 ÷ 4 = 9 L/min."
        ],
        [
          "9 × 7 = 63 L."
        ],
        [
          "90 ÷ 9 = 10 minutes."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A car uses 15 L of petrol over 180 km at a constant consumption rate.",
      "parts": [
        "Find kilometres per litre.",
        "Find distance possible with 20 L.",
        "Find petrol needed for 300 km."
      ],
      "answer": [
        [
          "180 ÷ 15 = 12 km/L."
        ],
        [
          "12 × 20 = 240 km."
        ],
        [
          "300 ÷ 12 = 25 L."
        ]
      ]
    },
    "bm": {
      "prompt": "Kereta menggunakan 15 L petrol bagi 180 km pada kadar tetap.",
      "parts": [
        "Cari kilometer seliter.",
        "Cari jarak dengan 20 L.",
        "Cari petrol diperlukan untuk 300 km."
      ],
      "answer": [
        [
          "180 ÷ 15 = 12 km/L."
        ],
        [
          "12 × 20 = 240 km."
        ],
        [
          "300 ÷ 12 = 25 L."
        ]
      ]
    }
  },
  {
    "subtopic": "4.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A machine packs 240 biscuits in 8 minutes at a constant rate.",
      "parts": [
        "Find biscuits packed per minute.",
        "Find biscuits packed in 15 minutes.",
        "Find time needed for 600 biscuits."
      ],
      "answer": [
        [
          "240 ÷ 8 = 30."
        ],
        [
          "30 × 15 = 450."
        ],
        [
          "600 ÷ 30 = 20 minutes."
        ]
      ]
    },
    "bm": {
      "prompt": "Mesin membungkus 240 biskut dalam 8 minit pada kadar tetap.",
      "parts": [
        "Cari biskut seminit.",
        "Cari biskut dalam 15 minit.",
        "Cari masa untuk 600 biskut."
      ],
      "answer": [
        [
          "240 ÷ 8 = 30."
        ],
        [
          "30 × 15 = 450."
        ],
        [
          "600 ÷ 30 = 20 minutes."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "Four identical bottles contain 6 L of water in total.",
      "parts": [
        "Find the volume in one bottle.",
        "Find the total volume in 10 bottles.",
        "How many bottles hold 18 L?"
      ],
      "answer": [
        [
          "6 ÷ 4 = 1.5 L."
        ],
        [
          "1.5 × 10 = 15 L."
        ],
        [
          "18 ÷ 1.5 = 12 bottles."
        ]
      ]
    },
    "bm": {
      "prompt": "Empat botol serupa mengandungi 6 L air.",
      "parts": [
        "Cari isi padu sebotol.",
        "Cari jumlah isi padu 10 botol.",
        "Berapa botol memuatkan 18 L?"
      ],
      "answer": [
        [
          "6 ÷ 4 = 1.5 L."
        ],
        [
          "1.5 × 10 = 15 L."
        ],
        [
          "18 ÷ 1.5 = 12 bottles."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "Five workers paint 20 identical fences in one day at the same rate.",
      "parts": [
        "Find fences per worker per day.",
        "Find fences painted by 8 workers in one day.",
        "How many workers are needed for 36 fences in one day?"
      ],
      "answer": [
        [
          "20 ÷ 5 = 4."
        ],
        [
          "8 × 4 = 32."
        ],
        [
          "36 ÷ 4 = 9 workers."
        ]
      ]
    },
    "bm": {
      "prompt": "Lima pekerja mengecat 20 pagar serupa dalam sehari pada kadar sama.",
      "parts": [
        "Cari pagar setiap pekerja sehari.",
        "Cari pagar dicat 8 pekerja sehari.",
        "Berapa pekerja perlu untuk 36 pagar sehari?"
      ],
      "answer": [
        [
          "20 ÷ 5 = 4."
        ],
        [
          "8 × 4 = 32."
        ],
        [
          "36 ÷ 4 = 9 workers."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A recipe for 4 people uses 300 g flour. The ingredients scale directly.",
      "parts": [
        "Find flour per person.",
        "Find flour for 10 people.",
        "How many people can 900 g serve?"
      ],
      "answer": [
        [
          "300 ÷ 4 = 75 g."
        ],
        [
          "75 × 10 = 750 g."
        ],
        [
          "900 ÷ 75 = 12 people."
        ]
      ]
    },
    "bm": {
      "prompt": "Resipi untuk 4 orang menggunakan 300 g tepung. Bahan bertambah secara kadaran langsung.",
      "parts": [
        "Cari tepung seorang.",
        "Cari tepung untuk 10 orang.",
        "Berapa orang bagi 900 g?"
      ],
      "answer": [
        [
          "300 ÷ 4 = 75 g."
        ],
        [
          "75 × 10 = 750 g."
        ],
        [
          "900 ÷ 75 = 12 people."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rectangular drawing is enlarged using scale factor 3. The original is 4 cm by 6 cm.",
      "parts": [
        "Find the new width.",
        "Find the new length.",
        "Find the ratio of enlarged area to original area."
      ],
      "answer": [
        [
          "4 × 3 = 12 cm."
        ],
        [
          "6 × 3 = 18 cm."
        ],
        [
          "3²:1 = 9:1."
        ]
      ]
    },
    "bm": {
      "prompt": "Lukisan segi empat tepat dibesarkan dengan faktor skala 3. Asal bersaiz 4 cm × 6 cm.",
      "parts": [
        "Cari lebar baharu.",
        "Cari panjang baharu.",
        "Cari nisbah luas baharu kepada luas asal."
      ],
      "answer": [
        [
          "4 × 3 = 12 cm."
        ],
        [
          "6 × 3 = 18 cm."
        ],
        [
          "3²:1 = 9:1."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A school spends RM84 on 7 identical footballs.",
      "parts": [
        "Find cost of one ball.",
        "Find cost of 12 balls.",
        "Find how many balls can be bought for RM180."
      ],
      "answer": [
        [
          "84 ÷ 7 = RM12."
        ],
        [
          "12 × 12 = RM144."
        ],
        [
          "180 ÷ 12 = 15 balls."
        ]
      ]
    },
    "bm": {
      "prompt": "Sekolah membelanjakan RM84 untuk 7 bola sepak serupa.",
      "parts": [
        "Cari harga sebiji bola.",
        "Cari harga 12 biji bola.",
        "Cari bilangan bola dengan RM180."
      ],
      "answer": [
        [
          "84 ÷ 7 = RM12."
        ],
        [
          "12 × 12 = RM144."
        ],
        [
          "180 ÷ 12 = 15 balls."
        ]
      ]
    }
  },
  {
    "subtopic": "4.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "On a plan, 2 cm represents 3 m. A wall measures 8 cm on the plan.",
      "parts": [
        "Find the actual wall length.",
        "Find drawing length for a 9 m wall.",
        "Express the original scale as 1:n."
      ],
      "answer": [
        [
          "8 ÷ 2 × 3 = 12 m."
        ],
        [
          "9 ÷ 3 × 2 = 6 cm."
        ],
        [
          "2 cm : 300 cm = 1:150."
        ]
      ]
    },
    "bm": {
      "prompt": "Pada pelan, 2 cm mewakili 3 m. Dinding berukuran 8 cm pada pelan.",
      "parts": [
        "Cari panjang sebenar dinding.",
        "Cari panjang pelan bagi dinding 9 m.",
        "Ungkap skala asal sebagai 1:n."
      ],
      "answer": [
        [
          "8 ÷ 2 × 3 = 12 m."
        ],
        [
          "9 ÷ 3 × 2 = 6 cm."
        ],
        [
          "2 cm : 300 cm = 1:150."
        ]
      ]
    }
  }
];
export function buildMathF1C4Flashcards(lang:"bm"|"dlp"):Flashcard[]{
 if(legacy.length!==60||C4_CHALLENGES.length!==16)throw new Error("Chapter 4 flashcard count invariant failed");
 return legacy.map(({entry,id},index)=>{
   const mode=index<12?"concept":index<44?"practice":"challenge";
   const challenge=mode==="challenge"?C4_CHALLENGES[index-44]:null;
   const structured:StructuredFlashcard=challenge?{...challenge[lang],visuals:challenge.visuals as StructuredFlashcard["visuals"]}:{prompt:entry[lang][0],answer:[[entry[lang][1]]]};
   return {id:id(lang),subjectId:"math",form:"Form 1",chapter:"Chapter 4",lang,front:structuredFront(structured),back:structuredBack(structured),subtopic:challenge?.subtopic??(index<20?"4.1":index<40?"4.2":"4.3"),reviewMode:mode,structured};
 });
}
