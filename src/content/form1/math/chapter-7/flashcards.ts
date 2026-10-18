import type {Flashcard} from "@/data/content";
import {structuredFront,structuredBack,type StructuredFlashcard} from "@/features/flashcards/structuredFlashcard";
type MathFlashcardCategoryId="concepts"|"operations"|"facts"|"practice";
const mathCard=(bmFront:string,bmBack:string,dlpFront:string,dlpBack:string)=>({bm:[bmFront,bmBack] as [string,string],dlp:[dlpFront,dlpBack] as [string,string]});
const LEGACY_C7_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah ketaksamaan linear?",
      "Hubungan antara dua ungkapan linear yang tidak semestinya sama nilainya, dengan pemboleh ubah berkuasa 1.",
      "What is a linear inequality?",
      "A relationship between two linear expressions that are not necessarily equal, with the variable having a power of 1.",
    ),
    mathCard(
      "Apakah maksud 'linear' dalam ketaksamaan linear?",
      "Pemboleh ubah dalam ungkapan hanya berkuasa 1 sahaja.",
      "What does 'linear' mean in a linear inequality?",
      "The variable in the expression has a power of 1 only.",
    ),
    mathCard(
      "Berikan contoh ungkapan linear.",
      "4a, −7x, 2y + 3, 5m − 1 (semua pemboleh ubah berkuasa 1).",
      "Give examples of linear expressions.",
      "4a, −7x, 2y + 3, 5m − 1 (all variables have a power of 1).",
    ),
    mathCard(
      "Apakah perbezaan antara persamaan dan ketaksamaan?",
      "Persamaan menggunakan tanda = (kedua-dua belah sama nilai); ketaksamaan menggunakan simbol >, <, ≥, atau ≤.",
      "What is the difference between an equation and an inequality?",
      "An equation uses the = sign (both sides equal in value); an inequality uses >, <, ≥, or ≤.",
    ),
    mathCard(
      "Apakah simbol 'lebih besar daripada'?",
      "Simbol > (greater than).",
      "What is the symbol for 'greater than'?",
      "The symbol > (greater than).",
    ),
    mathCard(
      "Apakah simbol 'lebih kecil daripada'?",
      "Simbol < (less than).",
      "What is the symbol for 'less than'?",
      "The symbol < (less than).",
    ),
    mathCard(
      "Apakah simbol 'lebih besar daripada atau sama dengan'?",
      "Simbol ≥ (greater than or equal to).",
      "What is the symbol for 'greater than or equal to'?",
      "The symbol ≥ (greater than or equal to).",
    ),
    mathCard(
      "Apakah simbol 'lebih kecil daripada atau sama dengan'?",
      "Simbol ≤ (less than or equal to).",
      "What is the symbol for 'less than or equal to'?",
      "The symbol ≤ (less than or equal to).",
    ),
    mathCard(
      "Kata kunci apakah yang dikaitkan dengan simbol ≥?",
      "Sekurang-kurangnya, minimum, at least, tidak kurang daripada.",
      "What keywords are associated with the symbol ≥?",
      "At least, minimum, not less than, sekurang-kurangnya.",
    ),
    mathCard(
      "Kata kunci apakah yang dikaitkan dengan simbol ≤?",
      "Paling banyak, maksimum, at most, tidak melebihi.",
      "What keywords are associated with the symbol ≤?",
      "At most, maximum, not more than, paling banyak.",
    ),
    mathCard(
      "Apakah garis nombor dalam konteks ketaksamaan?",
      "Alat visual berbentuk garis mendatar untuk mewakili semua nilai yang memenuhi sesuatu ketaksamaan.",
      "What is a number line in the context of inequalities?",
      "A horizontal visual tool used to represent all values that satisfy a given inequality.",
    ),
    mathCard(
      "Bilakah bulatan terbuka ○ digunakan pada garis nombor?",
      "Apabila menggunakan simbol > atau < — nilai sempadan TIDAK termasuk dalam penyelesaian.",
      "When is an open circle ○ used on the number line?",
      "When using the symbol > or < — the boundary value is NOT included in the solution.",
    ),
    mathCard(
      "Bilakah bulatan tertutup ● digunakan pada garis nombor?",
      "Apabila menggunakan simbol ≥ atau ≤ — nilai sempadan TERMASUK dalam penyelesaian.",
      "When is a closed circle ● used on the number line?",
      "When using the symbol ≥ or ≤ — the boundary value IS included in the solution.",
    ),
    mathCard(
      "Ke arah manakah anak panah untuk x > 3?",
      "Anak panah menghala ke kanan (→), kerana x lebih besar daripada 3.",
      "Which direction does the arrow point for x > 3?",
      "The arrow points right (→), because x is greater than 3.",
    ),
    mathCard(
      "Ke arah manakah anak panah untuk x ≤ −4?",
      "Anak panah menghala ke kiri (←), kerana x lebih kecil daripada atau sama dengan −4.",
      "Which direction does the arrow point for x ≤ −4?",
      "The arrow points left (←), because x is less than or equal to −4.",
    ),
    mathCard(
      "Apakah ketaksamaan linear serentak?",
      "Dua atau lebih ketaksamaan linear yang perlu dipenuhi pada masa yang sama oleh satu pemboleh ubah.",
      "What are simultaneous linear inequalities?",
      "Two or more linear inequalities that must be satisfied at the same time by one variable.",
    ),
    mathCard(
      "Apakah nilai sepunya dalam ketaksamaan serentak?",
      "Nilai atau julat nilai yang memenuhi KEDUA-DUA ketaksamaan serentak pada masa yang sama.",
      "What are common values in simultaneous inequalities?",
      "Values or a range of values that satisfy BOTH simultaneous inequalities at the same time.",
    ),
    mathCard(
      "Bilakah terdapat tiada nilai sepunya dalam ketaksamaan serentak?",
      "Apabila kawasan penyelesaian kedua-dua ketaksamaan tidak bertindih langsung pada garis nombor.",
      "When are there no common values in simultaneous inequalities?",
      "When the solution regions of both inequalities do not overlap on the number line.",
    ),
  ],
  operations: [
    mathCard(
      "Apakah peraturan penting apabila mendarab ketaksamaan dengan nombor negatif?",
      "Arah simbol ketaksamaan MESTI DITUKAR.",
      "What is the important rule when multiplying an inequality by a negative number?",
      "The direction of the inequality symbol MUST BE REVERSED.",
    ),
    mathCard(
      "Apakah peraturan penting apabila membahagi ketaksamaan dengan nombor negatif?",
      "Arah simbol ketaksamaan MESTI DITUKAR.",
      "What is the important rule when dividing an inequality by a negative number?",
      "The direction of the inequality symbol MUST BE REVERSED.",
    ),
    mathCard(
      "Selesaikan −x > −3.",
      "Darab kedua-dua belah dengan −1 dan tukar simbol: x < 3.",
      "Solve −x > −3.",
      "Multiply both sides by −1 and reverse the symbol: x < 3.",
    ),
    mathCard(
      "Selesaikan −2x > 6.",
      "Bahagi kedua-dua belah dengan −2 dan tukar simbol: x < −3.",
      "Solve −2x > 6.",
      "Divide both sides by −2 and reverse the symbol: x < −3.",
    ),
    mathCard(
      "Selesaikan −4x ≤ 8.",
      "Bahagi kedua-dua belah dengan −4 dan tukar simbol: x ≥ −2.",
      "Solve −4x ≤ 8.",
      "Divide both sides by −4 and reverse the symbol: x ≥ −2.",
    ),
    mathCard(
      "Apakah Sifat Akas ketaksamaan?",
      "Jika a < b, maka b > a. Apabila susunan ditukar, simbol juga mesti ditukar.",
      "What is the Converse Property of inequalities?",
      "If a < b, then b > a. When the order is swapped, the symbol must also be reversed.",
    ),
    mathCard(
      "Tulis bentuk akas bagi x < 5.",
      "5 > x.",
      "Write the converse form of x < 5.",
      "5 > x.",
    ),
    mathCard(
      "Apakah Sifat Transitif ketaksamaan?",
      "Jika a < b dan b < c, maka a < c.",
      "What is the Transitive Property of inequalities?",
      "If a < b and b < c, then a < c.",
    ),
    mathCard(
      "Jika x < 3 dan 3 < 7, apakah kesimpulan menggunakan Sifat Transitif?",
      "x < 7.",
      "If x < 3 and 3 < 7, what is the conclusion using the Transitive Property?",
      "x < 7.",
    ),
    mathCard(
      "Apakah tiga langkah menyelesaikan ketaksamaan linear?",
      "Langkah 1: Selesaikan ketaksamaan. Langkah 2: Wakilkan pada garis nombor. Langkah 3: Senaraikan nilai integer yang mungkin.",
      "What are the three steps to solve a linear inequality?",
      "Step 1: Solve the inequality. Step 2: Represent on a number line. Step 3: List possible integer values.",
    ),
    mathCard(
      "Selesaikan 2x + 3 > 7.",
      "2x > 4, maka x > 2. Garis nombor: bulatan terbuka pada 2, anak panah ke kanan.",
      "Solve 2x + 3 > 7.",
      "2x > 4, so x > 2. Number line: open circle at 2, arrow right.",
    ),
    mathCard(
      "Selesaikan 3x − 1 ≤ 8.",
      "3x ≤ 9, maka x ≤ 3. Garis nombor: bulatan tertutup pada 3, anak panah ke kiri.",
      "Solve 3x − 1 ≤ 8.",
      "3x ≤ 9, so x ≤ 3. Number line: closed circle at 3, arrow left.",
    ),
    mathCard(
      "Selesaikan −2x + 5 > 1.",
      "−2x > −4, bahagi dengan −2 dan tukar simbol: x < 2.",
      "Solve −2x + 5 > 1.",
      "−2x > −4, divide by −2 and reverse: x < 2.",
    ),
    mathCard(
      "Apakah langkah menyelesaikan ketaksamaan serentak?",
      "Selesaikan setiap ketaksamaan, wakilkan pada garis nombor yang sama, kenal pasti kawasan bertindih.",
      "What are the steps to solve simultaneous inequalities?",
      "Solve each inequality, represent both on the same number line, identify the overlapping region.",
    ),
    mathCard(
      "Diberi x > 2 dan x > 5, apakah nilai sepunya?",
      "Gunakan syarat lebih ketat: x > 5. Nilai integer: 6, 7, 8, ...",
      "Given x > 2 and x > 5, what are the common values?",
      "Use the stricter condition: x > 5. Integer values: 6, 7, 8, ...",
    ),
    mathCard(
      "Diberi x ≤ 3 dan x ≤ 1, apakah nilai sepunya?",
      "Gunakan syarat lebih ketat: x ≤ 1. Nilai integer: 1, 0, −1, −2, ...",
      "Given x ≤ 3 and x ≤ 1, what are the common values?",
      "Use the stricter condition: x ≤ 1. Integer values: 1, 0, −1, −2, ...",
    ),
    mathCard(
      "Apakah Peraturan Salingan (Reciprocal Rule) untuk ketaksamaan?",
      "Jika a < b (dengan a, b > 0), maka 1/a > 1/b. Simbol ditukar apabila mengambil salingan.",
      "What is the Reciprocal Rule for inequalities?",
      "If a < b (where a, b > 0), then 1/a > 1/b. The symbol is reversed when taking the reciprocal.",
    ),
  ],
  facts: [
    mathCard(
      "Apakah bunyi Sifat Akas secara lengkap untuk semua empat simbol?",
      "Jika a < b → b > a; jika a > b → b < a; jika a ≤ b → b ≥ a; jika a ≥ b → b ≤ a.",
      "What is the full Converse Property for all four symbols?",
      "If a < b → b > a; if a > b → b < a; if a ≤ b → b ≥ a; if a ≥ b → b ≤ a.",
    ),
    mathCard(
      "Apakah bunyi Sifat Transitif secara lengkap?",
      "Jika a < b dan b < c, maka a < c. Berlaku juga untuk >, ≤, dan ≥.",
      "What is the full Transitive Property?",
      "If a < b and b < c, then a < c. Also applies for >, ≤, and ≥.",
    ),
    mathCard(
      "Berikan contoh nyata menggunakan Sifat Transitif.",
      "Jika x < 3 dan 3 < 7, maka x < 7.",
      "Give a real example using the Transitive Property.",
      "If x < 3 and 3 < 7, then x < 7.",
    ),
    mathCard(
      "Apakah nilai integer yang mungkin bagi x > 3?",
      "4, 5, 6, 7, ... (tidak terhingga, mulai dari 4).",
      "What are the possible integer values for x > 3?",
      "4, 5, 6, 7, ... (infinite, starting from 4).",
    ),
    mathCard(
      "Apakah nilai integer yang mungkin bagi x ≤ 2?",
      "2, 1, 0, −1, −2, ... (tidak terhingga, termasuk 2).",
      "What are the possible integer values for x ≤ 2?",
      "2, 1, 0, −1, −2, ... (infinite, including 2).",
    ),
    mathCard(
      "Apakah nilai integer yang mungkin bagi −1 < x ≤ 4?",
      "0, 1, 2, 3, 4.",
      "What are the possible integer values for −1 < x ≤ 4?",
      "0, 1, 2, 3, 4.",
    ),
    mathCard(
      "Apakah nilai integer yang mungkin bagi 2 ≤ x < 7?",
      "2, 3, 4, 5, 6.",
      "What are the possible integer values for 2 ≤ x < 7?",
      "2, 3, 4, 5, 6.",
    ),
    mathCard(
      "Apakah nilai integer yang mungkin bagi 1 < x < 5?",
      "2, 3, 4.",
      "What are the possible integer values for 1 < x < 5?",
      "2, 3, 4.",
    ),
    mathCard(
      "Apakah nilai integer yang mungkin bagi −3 ≤ x ≤ 3?",
      "−3, −2, −1, 0, 1, 2, 3.",
      "What are the possible integer values for −3 ≤ x ≤ 3?",
      "−3, −2, −1, 0, 1, 2, 3.",
    ),
    mathCard(
      "Apakah tiga senario kemungkinan dalam ketaksamaan serentak?",
      "1. Bertindih di tengah (ada nilai sepunya). 2. Bertindih satu arah (ada nilai sepunya, guna syarat ketat). 3. Tidak bertindih (tiada nilai sepunya).",
      "What are the three possible scenarios in simultaneous inequalities?",
      "1. Middle overlap (common values exist). 2. Same-direction overlap (use stricter condition). 3. No overlap (no common values).",
    ),
    mathCard(
      "Apakah contoh tiada nilai sepunya?",
      "x > 5 dan x < 2 — tiada nilai yang melebihi 5 dan kurang daripada 2 pada masa yang sama.",
      "What is an example of no common values?",
      "x > 5 and x < 2 — no value can be both greater than 5 and less than 2 at the same time.",
    ),
    mathCard(
      "Nyatakan formula Reciprocal Rule.",
      "Jika a < b dengan a, b > 0, maka 1/a > 1/b.",
      "State the Reciprocal Rule formula.",
      "If a < b where a, b > 0, then 1/a > 1/b.",
    ),
  ],
  practice: [
    mathCard(
      "Apakah simbol yang digunakan untuk 'sekurang-kurangnya 50'?",
      "≥ 50 (lebih besar daripada atau sama dengan 50).",
      "What symbol is used for 'at least 50'?",
      "≥ 50 (greater than or equal to 50).",
    ),
    mathCard(
      "Apakah simbol yang digunakan untuk 'tidak melebihi 100'?",
      "≤ 100 (lebih kecil daripada atau sama dengan 100).",
      "What symbol is used for 'does not exceed 100'?",
      "≤ 100 (less than or equal to 100).",
    ),
    mathCard(
      "Adakah x = 3 memenuhi ketaksamaan x > 3?",
      "Tidak. Bulatan terbuka bermaksud 3 tidak termasuk dalam penyelesaian.",
      "Does x = 3 satisfy the inequality x > 3?",
      "No. The open circle means 3 is not included in the solution.",
    ),
    mathCard(
      "Adakah x = 3 memenuhi ketaksamaan x ≥ 3?",
      "Ya. Bulatan tertutup bermaksud 3 termasuk dalam penyelesaian.",
      "Does x = 3 satisfy the inequality x ≥ 3?",
      "Yes. The closed circle means 3 is included in the solution.",
    ),
    mathCard(
      "Selesaikan x/3 + 1 ≥ 4 dan nyatakan tiga nilai integer yang mungkin.",
      "x ≥ 9. Nilai integer: 9, 10, 11.",
      "Solve x/3 + 1 ≥ 4 and state three possible integer values.",
      "x ≥ 9. Integer values: 9, 10, 11.",
    ),
    mathCard(
      "Tulis ketaksamaan bagi 'umur sekurang-kurangnya 18 tahun' dengan u mewakili umur.",
      "u ≥ 18.",
      "Write the inequality for 'age at least 18 years' where u represents age.",
      "u ≥ 18.",
    ),
    mathCard(
      "Selesaikan −3x < 9 dan nyatakan arah anak panah.",
      "Bahagi dengan −3, tukar simbol: x > −3. Anak panah ke kanan.",
      "Solve −3x < 9 and state the arrow direction.",
      "Divide by −3, reverse symbol: x > −3. Arrow points right.",
    ),
    mathCard(
      "Diberi x > −1 dan x ≤ 3, nyatakan nilai sepunya dalam bentuk ketaksamaan berganda.",
      "−1 < x ≤ 3.",
      "Given x > −1 and x ≤ 3, state the common values as a compound inequality.",
      "−1 < x ≤ 3.",
    ),
    mathCard(
      "Diberi x > 5 dan x < 2, apakah kesimpulannya?",
      "Tiada nilai sepunya kerana kawasan dua ketaksamaan tidak bertindih.",
      "Given x > 5 and x < 2, what is the conclusion?",
      "No common values because the regions of the two inequalities do not overlap.",
    ),
    mathCard(
      "Apakah nilai integer yang mungkin bagi ketaksamaan serentak x > 0 dan x ≤ 4?",
      "1, 2, 3, 4.",
      "What are the possible integer values for the simultaneous inequality x > 0 and x ≤ 4?",
      "1, 2, 3, 4.",
    ),
    mathCard(
      "Tukar ke bentuk akas: y ≤ 6.",
      "6 ≥ y.",
      "Convert to converse form: y ≤ 6.",
      "6 ≥ y.",
    ),
    mathCard(
      "Jika 2 < a dan a < 8, apakah kesimpulan menggunakan Sifat Transitif?",
      "2 < 8 (atau secara langsung: a berada antara 2 dan 8).",
      "If 2 < a and a < 8, what is the conclusion using the Transitive Property?",
      "2 < 8 (or directly: a lies between 2 and 8).",
    ),
    mathCard(
      "Selesaikan 5 − x > 2 dan nyatakan penyelesaian.",
      "−x > −3, darab dengan −1 dan tukar simbol: x < 3.",
      "Solve 5 − x > 2 and state the solution.",
      "−x > −3, multiply by −1 and reverse: x < 3.",
    ),
  ],
};


const legacy=(["concepts","operations","facts","practice"] as const).flatMap(category=>LEGACY_C7_PAIRS[category].map((entry,index)=>({entry,id:(lang:"bm"|"dlp")=>`math-f1-c7-${lang}-${category}-${index+1}`})));
export const C7_CHALLENGES=[
  {
    "subtopic": "7.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A lift can carry at most 600 kg. It already carries 175 kg.",
      "parts": [
        "Write an inequality for the additional mass m.",
        "Find the maximum m.",
        "Can an extra 430 kg be carried?"
      ],
      "answer": [
        [
          "175 + m ≤ 600."
        ],
        [
          "m ≤ 425 kg."
        ],
        [
          "No; 175 + 430 = 605 > 600."
        ]
      ]
    },
    "bm": {
      "prompt": "Lif boleh membawa paling banyak 600 kg. Beban semasa 175 kg.",
      "parts": [
        "Tulis ketaksamaan bagi jisim tambahan m.",
        "Cari nilai maksimum m.",
        "Bolehkah tambahan 430 kg dibawa?"
      ],
      "answer": [
        [
          "175 + m ≤ 600."
        ],
        [
          "m ≤ 425 kg."
        ],
        [
          "No; 175 + 430 = 605 > 600."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A club needs at least 35 members. It has 22 members.",
      "parts": [
        "Form an inequality for new members n.",
        "Find the minimum n.",
        "Is adding 12 enough?"
      ],
      "answer": [
        [
          "22 + n ≥ 35."
        ],
        [
          "n ≥ 13."
        ],
        [
          "No; 22 + 12 = 34."
        ]
      ]
    },
    "bm": {
      "prompt": "Kelab memerlukan sekurang-kurangnya 35 ahli. Kini ada 22 ahli.",
      "parts": [
        "Bina ketaksamaan bagi ahli baharu n.",
        "Cari nilai minimum n.",
        "Adakah tambahan 12 ahli mencukupi?"
      ],
      "answer": [
        [
          "22 + n ≥ 35."
        ],
        [
          "n ≥ 13."
        ],
        [
          "No; 22 + 12 = 34."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A student has RM80 to buy notebooks costing RM9 each.",
      "parts": [
        "Write an inequality for number n.",
        "Find the greatest whole-number n.",
        "How much money remains?"
      ],
      "answer": [
        [
          "9n ≤ 80."
        ],
        [
          "n ≤ 8 whole notebooks."
        ],
        [
          "80 − 9(8) = RM8."
        ]
      ]
    },
    "bm": {
      "prompt": "Murid mempunyai RM80 untuk membeli buku nota berharga RM9 sebuah.",
      "parts": [
        "Tulis ketaksamaan bagi bilangan n.",
        "Cari integer maksimum n.",
        "Berapa baki wang?"
      ],
      "answer": [
        [
          "9n ≤ 80."
        ],
        [
          "n ≤ 8 whole notebooks."
        ],
        [
          "80 − 9(8) = RM8."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "The temperature T must be below 4°C but not below −2°C.",
      "parts": [
        "Write a compound inequality.",
        "Is T = −2°C allowed?",
        "Is T = 4°C allowed?"
      ],
      "answer": [
        [
          "−2 ≤ T < 4."
        ],
        [
          "Yes; the lower bound is inclusive."
        ],
        [
          "No; 4 is excluded."
        ]
      ]
    },
    "bm": {
      "prompt": "Suhu T mesti kurang daripada 4°C tetapi tidak kurang daripada −2°C.",
      "parts": [
        "Tulis ketaksamaan bergabung.",
        "Adakah T = −2°C dibenarkan?",
        "Adakah T = 4°C dibenarkan?"
      ],
      "answer": [
        [
          "−2 ≤ T < 4."
        ],
        [
          "Yes; the lower bound is inclusive."
        ],
        [
          "No; 4 is excluded."
        ]
      ]
    }
  },
  {
    "subtopic": "7.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "To enter a competition, age a must be greater than 12 but at most 16.",
      "parts": [
        "Write the inequality.",
        "List allowable whole-number ages.",
        "Can a 12-year-old enter?"
      ],
      "answer": [
        [
          "12 < a ≤ 16."
        ],
        [
          "13, 14, 15, 16."
        ],
        [
          "No; 12 is excluded."
        ]
      ]
    },
    "bm": {
      "prompt": "Untuk menyertai pertandingan, umur a lebih daripada 12 tetapi tidak melebihi 16.",
      "parts": [
        "Tulis ketaksamaan.",
        "Senaraikan umur integer dibenarkan.",
        "Bolehkah murid berumur 12 tahun menyertai?"
      ],
      "answer": [
        [
          "12 < a ≤ 16."
        ],
        [
          "13, 14, 15, 16."
        ],
        [
          "No; 12 is excluded."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Solve 3x + 5 > 20.",
      "parts": [
        "Isolate the x-term.",
        "Solve for x.",
        "Find the smallest integer solution."
      ],
      "answer": [
        [
          "3x > 15."
        ],
        [
          "x > 5."
        ],
        [
          "6."
        ]
      ]
    },
    "bm": {
      "prompt": "Selesaikan 3x + 5 > 20.",
      "parts": [
        "Asingkan sebutan x.",
        "Selesaikan untuk x.",
        "Cari integer penyelesaian terkecil."
      ],
      "answer": [
        [
          "3x > 15."
        ],
        [
          "x > 5."
        ],
        [
          "6."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Solve 5 − 2x ≥ 13.",
      "parts": [
        "Isolate −2x.",
        "Divide and state the correct inequality.",
        "Test x = −4."
      ],
      "answer": [
        [
          "−2x ≥ 8."
        ],
        [
          "x ≤ −4 (reverse sign)."
        ],
        [
          "5 − 2(−4) = 13; valid."
        ]
      ]
    },
    "bm": {
      "prompt": "Selesaikan 5 − 2x ≥ 13.",
      "parts": [
        "Asingkan −2x.",
        "Bahagi dan tulis ketaksamaan betul.",
        "Uji x = −4."
      ],
      "answer": [
        [
          "−2x ≥ 8."
        ],
        [
          "x ≤ −4 (reverse sign)."
        ],
        [
          "5 − 2(−4) = 13; valid."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Solve −3(x − 2) < 12.",
      "parts": [
        "Divide by −3 carefully.",
        "Solve for x.",
        "Check x = 0."
      ],
      "answer": [
        [
          "x − 2 > −4."
        ],
        [
          "x > −2."
        ],
        [
          "−3(0 − 2) = 6 < 12."
        ]
      ]
    },
    "bm": {
      "prompt": "Selesaikan −3(x − 2) < 12.",
      "parts": [
        "Bahagi dengan −3 dengan teliti.",
        "Selesaikan x.",
        "Semak x = 0."
      ],
      "answer": [
        [
          "x − 2 > −4."
        ],
        [
          "x > −2."
        ],
        [
          "−3(0 − 2) = 6 < 12."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Solve 4x − 7 ≤ 2x + 5.",
      "parts": [
        "Collect x-terms.",
        "Solve for x.",
        "Is x = 7 a solution?"
      ],
      "answer": [
        [
          "2x ≤ 12."
        ],
        [
          "x ≤ 6."
        ],
        [
          "No."
        ]
      ]
    },
    "bm": {
      "prompt": "Selesaikan 4x − 7 ≤ 2x + 5.",
      "parts": [
        "Kumpulkan sebutan x.",
        "Selesaikan x.",
        "Adakah x = 7 penyelesaian?"
      ],
      "answer": [
        [
          "2x ≤ 12."
        ],
        [
          "x ≤ 6."
        ],
        [
          "No."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Solve (x + 3)/2 ≥ 5.",
      "parts": [
        "Clear the positive denominator.",
        "Find the solution set.",
        "Find the smallest integer solution."
      ],
      "answer": [
        [
          "x + 3 ≥ 10."
        ],
        [
          "x ≥ 7."
        ],
        [
          "7."
        ]
      ]
    },
    "bm": {
      "prompt": "Selesaikan (x + 3)/2 ≥ 5.",
      "parts": [
        "Hapuskan penyebut positif.",
        "Cari set penyelesaian.",
        "Cari integer penyelesaian terkecil."
      ],
      "answer": [
        [
          "x + 3 ≥ 10."
        ],
        [
          "x ≥ 7."
        ],
        [
          "7."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A pupil writes −2x < 10, therefore x < −5.",
      "parts": [
        "Explain the error.",
        "Write the correct inequality.",
        "Check x = 0."
      ],
      "answer": [
        [
          "Dividing by negative reverses < to >."
        ],
        [
          "x > −5."
        ],
        [
          "−2(0) = 0 < 10; valid."
        ]
      ]
    },
    "bm": {
      "prompt": "Murid menulis −2x < 10, maka x < −5.",
      "parts": [
        "Terangkan kesilapan.",
        "Tulis ketaksamaan betul.",
        "Semak x = 0."
      ],
      "answer": [
        [
          "Dividing by negative reverses < to >."
        ],
        [
          "x > −5."
        ],
        [
          "−2(0) = 0 < 10; valid."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Solve 2 ≤ 3x − 1 < 11.",
      "parts": [
        "Add 1 throughout.",
        "Divide by 3.",
        "List all integer solutions."
      ],
      "answer": [
        [
          "3 ≤ 3x < 12."
        ],
        [
          "1 ≤ x < 4."
        ],
        [
          "1, 2, 3."
        ]
      ]
    },
    "bm": {
      "prompt": "Selesaikan 2 ≤ 3x − 1 < 11.",
      "parts": [
        "Tambah 1 pada semua bahagian.",
        "Bahagi dengan 3.",
        "Senaraikan semua integer penyelesaian."
      ],
      "answer": [
        [
          "3 ≤ 3x < 12."
        ],
        [
          "1 ≤ x < 4."
        ],
        [
          "1, 2, 3."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A shop charges RM4 per item plus RM6 delivery; a customer's budget is less than RM50.",
      "parts": [
        "Write an inequality for number n.",
        "Solve it.",
        "Find the maximum whole-number items."
      ],
      "answer": [
        [
          "4n + 6 < 50."
        ],
        [
          "n < 11."
        ],
        [
          "10 items."
        ]
      ]
    },
    "bm": {
      "prompt": "Kedai mengenakan RM4 seunit serta RM6 penghantaran; bajet pelanggan kurang daripada RM50.",
      "parts": [
        "Tulis ketaksamaan bagi bilangan n.",
        "Selesaikan.",
        "Cari bilangan maksimum barang."
      ],
      "answer": [
        [
          "4n + 6 < 50."
        ],
        [
          "n < 11."
        ],
        [
          "10 items."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rectangle has width x cm and length (x + 3) cm. Its perimeter must not exceed 38 cm.",
      "parts": [
        "Form an inequality.",
        "Solve for x.",
        "For a positive width, state the allowable x values."
      ],
      "answer": [
        [
          "2x + 2(x + 3) ≤ 38."
        ],
        [
          "4x + 6 ≤ 38; x ≤ 8."
        ],
        [
          "0 < x ≤ 8."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi empat tepat mempunyai lebar x cm dan panjang (x + 3) cm. Perimeter tidak boleh melebihi 38 cm.",
      "parts": [
        "Bina ketaksamaan.",
        "Selesaikan untuk x.",
        "Bagi lebar positif, nyatakan nilai x dibenarkan."
      ],
      "answer": [
        [
          "2x + 2(x + 3) ≤ 38."
        ],
        [
          "4x + 6 ≤ 38; x ≤ 8."
        ],
        [
          "0 < x ≤ 8."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A tank contains 12 L. Water enters at 3 L/min. The tank capacity is 45 L.",
      "parts": [
        "Write a capacity inequality for time t.",
        "Solve for t.",
        "Is 12 minutes safe?"
      ],
      "answer": [
        [
          "12 + 3t ≤ 45."
        ],
        [
          "t ≤ 11 minutes."
        ],
        [
          "No; 12 + 3(12) = 48 L."
        ]
      ]
    },
    "bm": {
      "prompt": "Tangki mengandungi 12 L. Air masuk pada 3 L/min. Kapasiti tangki 45 L.",
      "parts": [
        "Tulis ketaksamaan kapasiti bagi masa t.",
        "Selesaikan untuk t.",
        "Adakah 12 minit selamat?"
      ],
      "answer": [
        [
          "12 + 3t ≤ 45."
        ],
        [
          "t ≤ 11 minutes."
        ],
        [
          "No; 12 + 3(12) = 48 L."
        ]
      ]
    }
  },
  {
    "subtopic": "7.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Solve −4x + 9 > 25.",
      "parts": [
        "Isolate −4x.",
        "Find the solution, observing the sign rule.",
        "Check x = −5."
      ],
      "answer": [
        [
          "−4x > 16."
        ],
        [
          "x < −4."
        ],
        [
          "−4(−5) + 9 = 29 > 25."
        ]
      ]
    },
    "bm": {
      "prompt": "Selesaikan −4x + 9 > 25.",
      "parts": [
        "Asingkan −4x.",
        "Cari penyelesaian dengan peraturan tanda.",
        "Semak x = −5."
      ],
      "answer": [
        [
          "−4x > 16."
        ],
        [
          "x < −4."
        ],
        [
          "−4(−5) + 9 = 29 > 25."
        ]
      ]
    }
  }
];
export function buildMathF1C7Flashcards(lang:"bm"|"dlp"):Flashcard[]{
 if(legacy.length!==60||C7_CHALLENGES.length!==16)throw new Error("Chapter 7 card count invariant failed");
 return legacy.map(({entry,id},index)=>{
  const mode=index<12?"concept":index<44?"practice":"challenge";
  const challenge=mode==="challenge"?C7_CHALLENGES[index-44]:null;
  const structured:StructuredFlashcard=challenge?{...challenge[lang]}:{prompt:entry[lang][0],answer:[[entry[lang][1]]]};
  return {id:id(lang),subjectId:"math",form:"Form 1",chapter:"Chapter 7",lang,front:structuredFront(structured),back:structuredBack(structured),subtopic:challenge?.subtopic??(index<22?"7.1":"7.2"),reviewMode:mode,structured};
 });
}
