import type { Flashcard } from "@/data/content";
import { structuredFront, structuredBack, type StructuredFlashcard } from "@/features/flashcards/structuredFlashcard";
const mathCard = (bmFront:string,bmBack:string,dlpFront:string,dlpBack:string)=>({bm:[bmFront,bmBack] as [string,string],dlp:[dlpFront,dlpBack] as [string,string]});
const LEGACY_C13_PAIRS = {
  concepts: [
    mathCard(
      "Apakah hipotenus?",
      "Hipotenus ialah sisi terpanjang dalam segi tiga bersudut tegak. Ia sentiasa bertentangan dengan sudut 90°.",
      "What is the hypotenuse?",
      "The hypotenuse is the longest side in a right-angled triangle. It is always opposite the 90° angle.",
    ),
    mathCard(
      "Apakah Teorem Pythagoras?",
      "Teorem Pythagoras menyatakan: c² = a² + b², di mana c ialah hipotenus dan a, b ialah dua sisi yang lain dalam segi tiga bersudut tegak.",
      "What is Pythagoras' Theorem?",
      "Pythagoras' Theorem states: c² = a² + b², where c is the hypotenuse and a, b are the other two sides of a right-angled triangle.",
    ),
    mathCard(
      "Apakah segi tiga bersudut tegak?",
      "Segi tiga bersudut tegak ialah segi tiga yang mempunyai TEPAT SATU sudut tegak (90°). Simbol □ menandakan sudut tegak.",
      "What is a right-angled triangle?",
      "A right-angled triangle is a triangle that has EXACTLY ONE right angle (90°). The □ symbol marks the right angle.",
    ),
    mathCard(
      "Di manakah hipotenus berada dalam segi tiga bersudut tegak?",
      "Hipotenus berada BERTENTANGAN dengan sudut 90°. Ia adalah sisi yang tidak membentuk sudut tegak.",
      "Where is the hypotenuse in a right-angled triangle?",
      "The hypotenuse is OPPOSITE the 90° angle. It is the side that does not form the right angle.",
    ),
    mathCard(
      "Apakah akas Teorem Pythagoras?",
      "Akas menyatakan: jika c² = a² + b² (c = sisi terpanjang), maka segi tiga adalah BERSUDUT TEGAK.",
      "What is the converse of Pythagoras' Theorem?",
      "The converse states: if c² = a² + b² (c = longest side), then the triangle IS RIGHT-ANGLED.",
    ),
    mathCard(
      "Apakah triple Pythagoras?",
      "Set tiga nombor bulat positif (a, b, c) yang memenuhi a² + b² = c². Contoh: 3-4-5, 5-12-13, 8-15-17, 7-24-25.",
      "What is a Pythagorean triple?",
      "A set of three positive integers (a, b, c) satisfying a² + b² = c². Examples: 3-4-5, 5-12-13, 8-15-17, 7-24-25.",
    ),
    mathCard(
      "Apakah segi tiga bersudut tirus?",
      "Segi tiga di mana SEMUA sudut kurang daripada 90°. Dikenal pasti dengan: c² < a² + b² (c = sisi terpanjang).",
      "What is an acute-angled triangle?",
      "A triangle where ALL angles are less than 90°. Identified by: c² < a² + b² (c = longest side).",
    ),
    mathCard(
      "Apakah segi tiga bersudut cakah?",
      "Segi tiga yang mempunyai SATU sudut lebih besar daripada 90°. Dikenal pasti dengan: c² > a² + b² (c = sisi terpanjang).",
      "What is an obtuse-angled triangle?",
      "A triangle that has ONE angle greater than 90°. Identified by: c² > a² + b² (c = longest side).",
    ),
    mathCard(
      "Bolehkah Teorem Pythagoras digunakan untuk semua segi tiga?",
      "TIDAK. Teorem Pythagoras HANYA boleh digunakan untuk segi tiga BERSUDUT TEGAK sahaja.",
      "Can Pythagoras' Theorem be used for all triangles?",
      "NO. Pythagoras' Theorem can ONLY be used for RIGHT-ANGLED triangles.",
    ),
    mathCard(
      "Apakah yang dimaksudkan dengan 'kaki' dalam segi tiga bersudut tegak?",
      "Kaki ialah dua sisi yang lebih pendek dalam segi tiga bersudut tegak — sisi yang membentuk sudut 90°. Hipotenus adalah sisi ketiga.",
      "What is meant by 'leg' in a right-angled triangle?",
      "Legs are the two shorter sides in a right-angled triangle — the sides that form the 90° angle. The hypotenuse is the third side.",
    ),
    mathCard(
      "Adakah hipotenus boleh menjadi kaki sudut tegak?",
      "TIDAK. Hipotenus sentiasa bertentangan dengan sudut 90°, BUKAN menjadi kaki sudut tegak. Kaki sudut tegak adalah dua sisi yang lebih pendek.",
      "Can the hypotenuse be a leg of the right angle?",
      "NO. The hypotenuse is always OPPOSITE the right angle, NOT a leg forming it. The legs are the two shorter sides.",
    ),
    mathCard(
      "Apakah aplikasi Teorem Pythagoras dalam pembinaan?",
      "Dalam pembinaan, Teorem Pythagoras digunakan untuk memastikan sudut tepat 90° — jika sisi 3m, 4m dan pepenjuru 5m, sudutnya adalah 90°.",
      "What is the application of Pythagoras' Theorem in construction?",
      "In construction, Pythagoras' Theorem is used to ensure 90° right angles — if sides are 3m, 4m and diagonal is 5m, the angle is exactly 90°.",
    ),
    mathCard(
      "Berapakah saiz sudut yang bertentangan dengan hipotenus?",
      "Sudut yang bertentangan dengan hipotenus sentiasa 90° (sudut tegak). Ini adalah definisi hipotenus.",
      "What is the size of the angle opposite the hypotenuse?",
      "The angle opposite the hypotenuse is always 90° (right angle). This is the definition of the hypotenuse.",
    ),
    mathCard(
      "Mengapa c² = a² + b² dan bukan a² = c² + b²?",
      "Kerana c ialah hipotenus (sisi terpanjang). Dalam rumus, hipotenus BERSENDIRIAN di satu sisi persamaan. a dan b (kaki) berada di sisi lain.",
      "Why is c² = a² + b² and not a² = c² + b²?",
      "Because c is the hypotenuse (longest side). In the formula, the hypotenuse is ALONE on one side of the equation. a and b (legs) are on the other side.",
    ),
    mathCard(
      "Apakah kegunaan triple Pythagoras dalam penyelesaian soalan?",
      "Jika anda mengenal triple Pythagoras (3-4-5, 5-12-13, dll.), anda boleh terus menulis jawapan TANPA pengiraan panjang — menjimatkan masa dalam peperiksaan.",
      "What is the use of Pythagorean triples in solving problems?",
      "If you recognise a Pythagorean triple (3-4-5, 5-12-13, etc.), you can write the answer DIRECTLY without lengthy calculation — saving time in exams.",
    ),
  ],
  operations: [
    mathCard(
      "Rumus untuk mencari hipotenus c ialah:",
      "c = √(a² + b²). Langkah: kira a², kira b², tambah, kemudian ambil punca kuasa dua.",
      "The formula to find hypotenuse c is:",
      "c = √(a² + b²). Steps: calculate a², calculate b², add, then take the square root.",
    ),
    mathCard(
      "Rumus untuk mencari kaki a ialah:",
      "a = √(c² − b²). TOLAK, bukan tambah, kerana mencari sisi lebih pendek. c = hipotenus.",
      "The formula to find leg a is:",
      "a = √(c² − b²). SUBTRACT, not add, because we are finding the shorter side. c = hypotenuse.",
    ),
    mathCard(
      "Apakah langkah-langkah untuk mencari hipotenus?",
      "① Kenal pasti a dan b. ② Kira a² dan b². ③ Tambah: c² = a²+b². ④ Ambil punca kuasa dua: c = √(c²). ⑤ Semak: c > a dan c > b.",
      "What are the steps to find the hypotenuse?",
      "① Identify a and b. ② Calculate a² and b². ③ Add: c² = a²+b². ④ Take square root: c = √(c²). ⑤ Check: c > a and c > b.",
    ),
    mathCard(
      "Apakah langkah-langkah untuk mencari kaki yang tidak diketahui?",
      "① Kenal pasti c (hipotenus) dan kaki yang diketahui. ② Kira c². ③ Kira (kaki diketahui)². ④ TOLAK: kaki² = c² − (kaki diketahui)². ⑤ Ambil punca kuasa dua.",
      "What are the steps to find the missing leg?",
      "① Identify c (hypotenuse) and the known leg. ② Calculate c². ③ Calculate (known leg)². ④ SUBTRACT: leg² = c² − (known leg)². ⑤ Take square root.",
    ),
    mathCard(
      "Apakah langkah-langkah mengklasifikasikan segi tiga menggunakan akas?",
      "① Senarai 3 sisi. ② Kenal pasti c (terpanjang). ③ Kira c². ④ Kira a²+b². ⑤ Bandingkan: sama=tegak, kurang=tirus, lebih=cakah.",
      "What are the steps to classify a triangle using the converse?",
      "① List 3 sides. ② Identify c (longest). ③ Calculate c². ④ Calculate a²+b². ⑤ Compare: equal=right, less=acute, greater=obtuse.",
    ),
    mathCard(
      "Cara menggunakan akas Teorem Pythagoras untuk menentukan jenis segi tiga:",
      "Kira c² dan a²+b². Jika sama → tegak. Jika c² < a²+b² → tirus. Jika c² > a²+b² → cakah.",
      "How to use the converse of Pythagoras' Theorem to determine triangle type:",
      "Calculate c² and a²+b². If equal → right. If c² < a²+b² → acute. If c² > a²+b² → obtuse.",
    ),
    mathCard(
      "a = 3, b = 4. Cari c.",
      "c² = 3²+4² = 9+16 = 25. c = √25 = 5.",
      "a = 3, b = 4. Find c.",
      "c² = 3²+4² = 9+16 = 25. c = √25 = 5.",
    ),
    mathCard(
      "c = 13, a = 5. Cari b.",
      "b² = 13²−5² = 169−25 = 144. b = √144 = 12.",
      "c = 13, a = 5. Find b.",
      "b² = 13²−5² = 169−25 = 144. b = √144 = 12.",
    ),
    mathCard(
      "Bagaimana cara mencari pepenjuru segi empat tepat 6cm × 8cm?",
      "Pepenjuru = hipotenus. d² = 6²+8² = 36+64 = 100. d = √100 = 10 cm.",
      "How to find the diagonal of a 6cm × 8cm rectangle?",
      "Diagonal = hypotenuse. d² = 6²+8² = 36+64 = 100. d = √100 = 10 cm.",
    ),
    mathCard(
      "Tangga 10m bersandar pada dinding. Kaki tangga 6m dari dinding. Berapa ketinggian tangga pada dinding?",
      "h² = 10²−6² = 100−36 = 64. h = √64 = 8m.",
      "A 10m ladder leans on a wall. Base is 6m from wall. Find height on wall.",
      "h² = 10²−6² = 100−36 = 64. h = √64 = 8m.",
    ),
    mathCard(
      "Adakah 7, 24, 25 triple Pythagoras?",
      "7²+24² = 49+576 = 625 = 25². Ya, ia adalah triple Pythagoras!",
      "Is 7, 24, 25 a Pythagorean triple?",
      "7²+24² = 49+576 = 625 = 25². Yes, it is a Pythagorean triple!",
    ),
    mathCard(
      "Apakah gandaan triple 3-4-5 yang lain?",
      "Gandakan setiap nombor dengan faktor yang sama: ×2 = (6,8,10), ×3 = (9,12,15), ×4 = (12,16,20), ×5 = (15,20,25).",
      "What are other multiples of the 3-4-5 triple?",
      "Multiply each number by the same factor: ×2 = (6,8,10), ×3 = (9,12,15), ×4 = (12,16,20), ×5 = (15,20,25).",
    ),
    mathCard(
      "a = 8, b = 15. Cari c.",
      "c² = 8²+15² = 64+225 = 289. c = √289 = 17. Triple 8-15-17!",
      "a = 8, b = 15. Find c.",
      "c² = 8²+15² = 64+225 = 289. c = √289 = 17. The 8-15-17 triple!",
    ),
    mathCard(
      "Segi tiga sama kaki dengan dua sisi = 10cm dan tapak = 12cm. Cari ketinggian.",
      "Bahagi tapak: 6cm. h²+6² = 10². h² = 100−36 = 64. h = 8cm.",
      "Isosceles triangle with two sides = 10cm and base = 12cm. Find height.",
      "Halve the base: 6cm. h²+6² = 10². h² = 100−36 = 64. h = 8cm.",
    ),
    mathCard(
      "Cara menentukan sama ada segi tiga 9, 40, 41 adalah bersudut tegak:",
      "c=41: c²=1681. a²+b²=81+1600=1681. 1681=1681 ✓. Bersudut tegak! (Triple 9-40-41).",
      "How to determine whether triangle 9, 40, 41 is right-angled:",
      "c=41: c²=1681. a²+b²=81+1600=1681. 1681=1681 ✓. Right-angled! (9-40-41 triple).",
    ),
    mathCard(
      "Cara mencari sisi tidak diketahui dalam segi tiga bersudut tegak — kesilapan lazim:",
      "❌ SILAP: a² = c²+b² (menambah — salah!). ✅ BETUL: a² = c²−b² (menolak — betul, kerana mencari sisi lebih pendek).",
      "How to find the missing side in a right-angled triangle — common mistake:",
      "❌ WRONG: a² = c²+b² (adding — incorrect!). ✅ CORRECT: a² = c²−b² (subtracting — correct, because finding shorter side).",
    ),
  ],
  facts: [
    mathCard(
      "Fakta: hipotenus sentiasa...",
      "...sisi TERPANJANG. Dan sentiasa BERTENTANGAN dengan sudut 90°. Tidak pernah menjadi kaki sudut tegak.",
      "Fact: the hypotenuse is always...",
      "...the LONGEST side. And always OPPOSITE the 90° angle. Never a leg forming the right angle.",
    ),
    mathCard(
      "Fakta: c² = a²+b² adalah BENAR hanya untuk...",
      "...segi tiga BERSUDUT TEGAK sahaja. Ia tidak berlaku untuk segi tiga tirus atau cakah.",
      "Fact: c² = a²+b² is TRUE only for...",
      "...RIGHT-ANGLED triangles only. It does not apply to acute or obtuse triangles.",
    ),
    mathCard(
      "Fakta: jika c² = a²+b², segi tiga adalah...",
      "...bersudut tegak. Ini adalah akas Teorem Pythagoras — bukan andaian, ia adalah fakta yang terbukti.",
      "Fact: if c² = a²+b², the triangle is...",
      "...right-angled. This is the converse of Pythagoras' Theorem — not an assumption, it is a proven fact.",
    ),
    mathCard(
      "Fakta: jika c² < a²+b², segi tiga adalah...",
      "...bersudut tirus (semua sudut < 90°). Sisi terpanjang 'tidak cukup panjang' untuk membentuk sudut tegak.",
      "Fact: if c² < a²+b², the triangle is...",
      "...acute-angled (all angles < 90°). The longest side is 'not long enough' to form a right angle.",
    ),
    mathCard(
      "Fakta: jika c² > a²+b², segi tiga adalah...",
      "...bersudut cakah (satu sudut > 90°). Sisi terpanjang 'terlalu panjang' — sudutnya melebihi 90°.",
      "Fact: if c² > a²+b², the triangle is...",
      "...obtuse-angled (one angle > 90°). The longest side is 'too long' — the angle exceeds 90°.",
    ),
    mathCard(
      "Fakta: gandaan triple Pythagoras...",
      "...juga merupakan triple Pythagoras. Cth: 3-4-5 × 2 = 6-8-10; 3-4-5 × 3 = 9-12-15. Semuanya bersudut tegak.",
      "Fact: multiples of Pythagorean triples...",
      "...are also Pythagorean triples. E.g.: 3-4-5 × 2 = 6-8-10; 3-4-5 × 3 = 9-12-15. All are right-angled.",
    ),
    mathCard(
      "Empat triple Pythagoras paling biasa yang perlu dihafal:",
      "(3, 4, 5) — paling biasa!\n(5, 12, 13)\n(8, 15, 17)\n(7, 24, 25)",
      "Four most common Pythagorean triples to memorise:",
      "(3, 4, 5) — most common!\n(5, 12, 13)\n(8, 15, 17)\n(7, 24, 25)",
    ),
    mathCard(
      "Fakta: pepenjuru segi empat tepat...",
      "...boleh dicari menggunakan Teorem Pythagoras. Pepenjuru = hipotenus segi tiga bersudut tegak yang dibentuk oleh panjang dan lebar.",
      "Fact: the diagonal of a rectangle...",
      "...can be found using Pythagoras' Theorem. Diagonal = hypotenuse of the right-angled triangle formed by the length and width.",
    ),
    mathCard(
      "Fakta: ketinggian segi tiga sama kaki...",
      "...boleh dicari dengan Pythagoras. Bahagi tapak kepada dua, kemudian gunakan a²+h²=sisi² untuk mencari h.",
      "Fact: the height of an isosceles triangle...",
      "...can be found using Pythagoras. Halve the base, then use a²+h²=side² to find h.",
    ),
    mathCard(
      "Fakta: untuk menyemak jawapan hipotenus:",
      "Hipotenus MESTI lebih panjang daripada setiap kaki. Jika jawapan anda lebih pendek daripada salah satu kaki, ada kesilapan!",
      "Fact: to check the hypotenuse answer:",
      "The hypotenuse MUST be longer than each leg. If your answer is shorter than one of the legs, there is an error!",
    ),
    mathCard(
      "Fakta: segi tiga tidak sah jika...",
      "...jumlah mana-mana dua sisi TIDAK lebih besar daripada sisi ketiga. Contoh: 1, 2, 10 bukan segi tiga kerana 1+2=3 < 10.",
      "Fact: a triangle is invalid if...",
      "...the sum of any two sides is NOT greater than the third side. Example: 1, 2, 10 is not a triangle because 1+2=3 < 10.",
    ),
    mathCard(
      "Fakta: Teorem Pythagoras digunakan dalam kehidupan seharian untuk...",
      "...tangga & dinding, tiang & wayar sokongan, jarak pepenjuru, saiz skrin TV, dan memastikan sudut tegak dalam pembinaan.",
      "Fact: Pythagoras' Theorem is used in daily life for...",
      "...ladders & walls, poles & support wires, diagonal distances, TV screen sizes, and ensuring right angles in construction.",
    ),
    mathCard(
      "Rumus ringkas untuk semua situasi:",
      "c² = a²+b² → hipotenus. a² = c²−b² → kaki. b² = c²−a² → kaki. Ingat: cari hipotenus TAMBAH; cari kaki TOLAK.",
      "Compact formula for all situations:",
      "c² = a²+b² → hypotenuse. a² = c²−b² → leg. b² = c²−a² → leg. Remember: finding hypotenuse ADD; finding leg SUBTRACT.",
    ),
    mathCard(
      "Fakta: saiz skrin TV diukur menggunakan...",
      "...pepenjuru, yang dikira menggunakan Teorem Pythagoras daripada lebar dan tinggi skrin.",
      "Fact: TV screen size is measured using...",
      "...the diagonal, which is calculated using Pythagoras' Theorem from the screen width and height.",
    ),
  ],
  practice: [
    mathCard(
      "a = 6, b = 8. Cari hipotenus c.",
      "c² = 36+64 = 100. c = 10.",
      "a = 6, b = 8. Find hypotenuse c.",
      "c² = 36+64 = 100. c = 10.",
    ),
    mathCard(
      "c = 10, a = 6. Cari b.",
      "b² = 100−36 = 64. b = 8.",
      "c = 10, a = 6. Find b.",
      "b² = 100−36 = 64. b = 8.",
    ),
    mathCard(
      "Adakah 5, 12, 13 merupakan triple Pythagoras?",
      "5²+12² = 25+144 = 169 = 13². Ya!",
      "Is 5, 12, 13 a Pythagorean triple?",
      "5²+12² = 25+144 = 169 = 13². Yes!",
    ),
    mathCard(
      "Segi tiga 6, 8, 11 — jenis apakah?",
      "c=11: c²=121. a²+b²=36+64=100. 121 > 100 → Bersudut CAKAH.",
      "Triangle 6, 8, 11 — what type?",
      "c=11: c²=121. a²+b²=36+64=100. 121 > 100 → OBTUSE-angled.",
    ),
    mathCard(
      "Segi tiga 5, 6, 7 — jenis apakah?",
      "c=7: c²=49. a²+b²=25+36=61. 49 < 61 → Bersudut TIRUS.",
      "Triangle 5, 6, 7 — what type?",
      "c=7: c²=49. a²+b²=25+36=61. 49 < 61 → ACUTE-angled.",
    ),
    mathCard(
      "Segi empat tepat 9cm × 12cm. Cari pepenjuru.",
      "d² = 81+144 = 225. d = 15cm. (Triple 9-12-15, gandaan 3-4-5!)",
      "Rectangle 9cm × 12cm. Find the diagonal.",
      "d² = 81+144 = 225. d = 15cm. (9-12-15 triple, multiple of 3-4-5!)",
    ),
    mathCard(
      "Tangga 5m. Kaki tangga 3m dari dinding. Berapa ketinggian pada dinding?",
      "h² = 25−9 = 16. h = 4m.",
      "5m ladder. Base 3m from wall. Find height on wall.",
      "h² = 25−9 = 16. h = 4m.",
    ),
    mathCard(
      "Adakah 6, 7, 10 bersudut tegak?",
      "c=10: c²=100. a²+b²=36+49=85. 100 ≠ 85 → BUKAN bersudut tegak. Kerana 100>85 → bersudut CAKAH.",
      "Is 6, 7, 10 right-angled?",
      "c=10: c²=100. a²+b²=36+49=85. 100 ≠ 85 → NOT right-angled. Since 100>85 → OBTUSE-angled.",
    ),
    mathCard(
      "a = 9, b = 40. Cari c.",
      "c² = 81+1600 = 1681. c = 41. (Triple 9-40-41!)",
      "a = 9, b = 40. Find c.",
      "c² = 81+1600 = 1681. c = 41. (9-40-41 triple!)",
    ),
    mathCard(
      "c = 25, b = 24. Cari a.",
      "a² = 625−576 = 49. a = 7. (Triple 7-24-25!)",
      "c = 25, b = 24. Find a.",
      "a² = 625−576 = 49. a = 7. (7-24-25 triple!)",
    ),
    mathCard(
      "Tiang 15m. Wayar dari puncak ke tanah, 9m dari kaki tiang. Berapa panjang wayar?",
      "Wayar² = 15²+9² = 225+81 = 306. Wayar = √306 ≈ 17.5m.",
      "15m pole. Wire from top to ground, 9m from base. Find wire length.",
      "Wire² = 15²+9² = 225+81 = 306. Wire = √306 ≈ 17.5m.",
    ),
    mathCard(
      "Segi tiga 10, 10, 14. Jenis apakah?",
      "c=14: c²=196. a²+b²=100+100=200. 196 < 200 → Bersudut TIRUS.",
      "Triangle 10, 10, 14. What type?",
      "c=14: c²=196. a²+b²=100+100=200. 196 < 200 → ACUTE-angled.",
    ),
  ],
};


const legacyCards = (["concepts","operations","facts","practice"] as const).flatMap(category=>LEGACY_C13_PAIRS[category].map((entry,index)=>({entry,id:(lang:"bm"|"dlp")=>`math-f1-c13-${lang}-${category}-${index+1}`})));
export const C13_CHALLENGES=[
  {
    "subtopic": "13.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A right triangle has legs 6 cm and 8 cm.",
      "parts": [
        "Write Pythagoras' equation.",
        "Find the hypotenuse.",
        "Find its perimeter."
      ],
      "answer": [
        [
          "c² = 6² + 8² = 100."
        ],
        [
          "c = 10 cm."
        ],
        [
          "6 + 8 + 10 = 24 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga bersudut tegak mempunyai sisi tegak 6 cm dan 8 cm.",
      "parts": [
        "Tulis persamaan Pythagoras.",
        "Cari hipotenus.",
        "Cari perimeter."
      ],
      "answer": [
        [
          "c² = 6² + 8² = 100."
        ],
        [
          "c = 10 cm."
        ],
        [
          "6 + 8 + 10 = 24 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A right triangle has hypotenuse 13 cm and one leg 5 cm.",
      "parts": [
        "Form an equation for other leg x.",
        "Find x.",
        "Find the triangle's area."
      ],
      "answer": [
        [
          "x² = 13² − 5² = 144."
        ],
        [
          "x = 12 cm."
        ],
        [
          "½ × 5 × 12 = 30 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga bersudut tegak mempunyai hipotenus 13 cm dan satu sisi tegak 5 cm.",
      "parts": [
        "Bina persamaan bagi sisi tegak x.",
        "Cari x.",
        "Cari luas segi tiga."
      ],
      "answer": [
        [
          "x² = 13² − 5² = 144."
        ],
        [
          "x = 12 cm."
        ],
        [
          "½ × 5 × 12 = 30 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A ladder 10 m long rests against a wall, with its base 6 m from the wall.",
      "parts": [
        "Form an equation for height h.",
        "Find h.",
        "Find h if the base moves to 8 m from the wall."
      ],
      "answer": [
        [
          "h² = 10² − 6² = 64."
        ],
        [
          "h = 8 m."
        ],
        [
          "h = √(100 − 64) = 6 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Tangga 10 m bersandar pada dinding, tapaknya 6 m dari dinding.",
      "parts": [
        "Bina persamaan tinggi h.",
        "Cari h.",
        "Cari h jika tapak dialih 8 m dari dinding."
      ],
      "answer": [
        [
          "h² = 10² − 6² = 64."
        ],
        [
          "h = 8 m."
        ],
        [
          "h = √(100 − 64) = 6 m."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rectangular field measures 9 m by 12 m.",
      "parts": [
        "Write an equation for its diagonal.",
        "Find its diagonal.",
        "Find the perimeter of the field."
      ],
      "answer": [
        [
          "d² = 9² + 12² = 225."
        ],
        [
          "d = 15 m."
        ],
        [
          "2(9 + 12) = 42 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Padang segi empat tepat berukuran 9 m × 12 m.",
      "parts": [
        "Tulis persamaan pepenjuru.",
        "Cari panjang pepenjuru.",
        "Cari perimeter padang."
      ],
      "answer": [
        [
          "d² = 9² + 12² = 225."
        ],
        [
          "d = 15 m."
        ],
        [
          "2(9 + 12) = 42 m."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A triangle has sides 7 cm, 24 cm, 25 cm.",
      "parts": [
        "Identify the longest side.",
        "Compare its square to the sum of the other squares.",
        "Classify the triangle."
      ],
      "answer": [
        [
          "25 cm."
        ],
        [
          "25² = 625; 7² + 24² = 625."
        ],
        [
          "Right-angled / bersudut tegak."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga mempunyai sisi 7 cm, 24 cm, 25 cm.",
      "parts": [
        "Kenal pasti sisi terpanjang.",
        "Bandingkan kuasa duanya dengan jumlah dua lagi.",
        "Kelaskan segi tiga."
      ],
      "answer": [
        [
          "25 cm."
        ],
        [
          "25² = 625; 7² + 24² = 625."
        ],
        [
          "Right-angled / bersudut tegak."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A triangle has sides 5 cm, 6 cm and 8 cm.",
      "parts": [
        "Identify the longest side.",
        "Compare squares.",
        "Classify by angles."
      ],
      "answer": [
        [
          "8 cm."
        ],
        [
          "8² = 64 > 5² + 6² = 61."
        ],
        [
          "Obtuse-angled / bersudut cakah."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga mempunyai sisi 5 cm, 6 cm dan 8 cm.",
      "parts": [
        "Kenal pasti sisi terpanjang.",
        "Bandingkan kuasa dua.",
        "Kelaskan mengikut sudut."
      ],
      "answer": [
        [
          "8 cm."
        ],
        [
          "8² = 64 > 5² + 6² = 61."
        ],
        [
          "Obtuse-angled / bersudut cakah."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A triangle has sides 6 cm, 7 cm and 8 cm.",
      "parts": [
        "Identify the longest side.",
        "Compare its square to the other squares.",
        "Classify by angles."
      ],
      "answer": [
        [
          "8 cm."
        ],
        [
          "8² = 64 < 6² + 7² = 85."
        ],
        [
          "Acute-angled / bersudut tirus."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga mempunyai sisi 6 cm, 7 cm dan 8 cm.",
      "parts": [
        "Kenal pasti sisi terpanjang.",
        "Bandingkan kuasa dua.",
        "Kelaskan mengikut sudut."
      ],
      "answer": [
        [
          "8 cm."
        ],
        [
          "8² = 64 < 6² + 7² = 85."
        ],
        [
          "Acute-angled / bersudut tirus."
        ]
      ]
    }
  },
  {
    "subtopic": "13.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A square has diagonal √200 cm.",
      "parts": [
        "Form the Pythagoras equation for side s.",
        "Find s.",
        "Find the square's area."
      ],
      "answer": [
        [
          "s² + s² = 200."
        ],
        [
          "2s² = 200; s = 10 cm."
        ],
        [
          "s² = 100 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi empat sama mempunyai pepenjuru √200 cm.",
      "parts": [
        "Bina persamaan Pythagoras bagi sisi s.",
        "Cari s.",
        "Cari luas segi empat sama."
      ],
      "answer": [
        [
          "s² + s² = 200."
        ],
        [
          "2s² = 200; s = 10 cm."
        ],
        [
          "s² = 100 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A right triangle has hypotenuse 17 cm and one leg 15 cm.",
      "parts": [
        "Find square of missing side.",
        "Find missing side.",
        "Find triangle area."
      ],
      "answer": [
        [
          "17² − 15² = 64."
        ],
        [
          "8 cm."
        ],
        [
          "½ × 15 × 8 = 60 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga bersudut tegak mempunyai hipotenus 17 cm dan sisi tegak 15 cm.",
      "parts": [
        "Cari kuasa dua sisi belum diketahui.",
        "Cari sisi belum diketahui.",
        "Cari luas segi tiga."
      ],
      "answer": [
        [
          "17² − 15² = 64."
        ],
        [
          "8 cm."
        ],
        [
          "½ × 15 × 8 = 60 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A ramp rises 1.2 m over a horizontal distance of 1.6 m.",
      "parts": [
        "Form a Pythagoras equation.",
        "Find ramp length.",
        "Find the perimeter of its triangular side."
      ],
      "answer": [
        [
          "r² = 1.2² + 1.6² = 4."
        ],
        [
          "r = 2 m."
        ],
        [
          "1.2 + 1.6 + 2 = 4.8 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Laluan landai naik 1.2 m pada jarak mendatar 1.6 m.",
      "parts": [
        "Bina persamaan Pythagoras.",
        "Cari panjang laluan.",
        "Cari perimeter sisi segi tiga."
      ],
      "answer": [
        [
          "r² = 1.2² + 1.6² = 4."
        ],
        [
          "r = 2 m."
        ],
        [
          "1.2 + 1.6 + 2 = 4.8 m."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A right triangle has legs 9 cm and 40 cm.",
      "parts": [
        "Find c².",
        "Find c.",
        "Find its area."
      ],
      "answer": [
        [
          "9² + 40² = 1681."
        ],
        [
          "c = 41 cm."
        ],
        [
          "½ × 9 × 40 = 180 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga bersudut tegak mempunyai dua sisi tegak 9 cm dan 40 cm.",
      "parts": [
        "Cari c².",
        "Cari c.",
        "Cari luas."
      ],
      "answer": [
        [
          "9² + 40² = 1681."
        ],
        [
          "c = 41 cm."
        ],
        [
          "½ × 9 × 40 = 180 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A kite is 15 m high and the horizontal distance to the child is 20 m, assuming a taut straight string.",
      "parts": [
        "Form the equation for string length.",
        "Calculate string length.",
        "How much longer is the string than the height?"
      ],
      "answer": [
        [
          "s² = 15² + 20² = 625."
        ],
        [
          "s = 25 m."
        ],
        [
          "25 − 15 = 10 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Layang-layang setinggi 15 m dan jarak mendatar ke kanak-kanak 20 m, dengan tali lurus tegang.",
      "parts": [
        "Bina persamaan panjang tali.",
        "Hitung panjang tali.",
        "Berapa tali lebih panjang daripada tinggi?"
      ],
      "answer": [
        [
          "s² = 15² + 20² = 625."
        ],
        [
          "s = 25 m."
        ],
        [
          "25 − 15 = 10 m."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A right triangle has hypotenuse 25 cm and one leg 20 cm.",
      "parts": [
        "Find the other leg.",
        "Find the area.",
        "Find the perimeter."
      ],
      "answer": [
        [
          "√(25² − 20²) = 15 cm."
        ],
        [
          "½ × 20 × 15 = 150 cm²."
        ],
        [
          "15 + 20 + 25 = 60 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga bersudut tegak mempunyai hipotenus 25 cm dan satu sisi tegak 20 cm.",
      "parts": [
        "Cari sisi tegak satu lagi.",
        "Cari luas.",
        "Cari perimeter."
      ],
      "answer": [
        [
          "√(25² − 20²) = 15 cm."
        ],
        [
          "½ × 20 × 15 = 150 cm²."
        ],
        [
          "15 + 20 + 25 = 60 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A triangle has sides 10 cm, 10 cm and 14 cm.",
      "parts": [
        "Identify its longest side.",
        "Compare squares.",
        "Classify by angles."
      ],
      "answer": [
        [
          "14 cm."
        ],
        [
          "14² = 196 < 10² + 10² = 200."
        ],
        [
          "Acute-angled / bersudut tirus."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga mempunyai sisi 10 cm, 10 cm dan 14 cm.",
      "parts": [
        "Kenal pasti sisi terpanjang.",
        "Bandingkan kuasa dua.",
        "Kelaskan mengikut sudut."
      ],
      "answer": [
        [
          "14 cm."
        ],
        [
          "14² = 196 < 10² + 10² = 200."
        ],
        [
          "Acute-angled / bersudut tirus."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A room is 8 m long and 6 m wide.",
      "parts": [
        "Find the diagonal length.",
        "Find the direct distance from one corner to the opposite.",
        "How much shorter is this than walking 8 m + 6 m along two walls?"
      ],
      "answer": [
        [
          "√(8² + 6²) = 10 m."
        ],
        [
          "10 m."
        ],
        [
          "14 − 10 = 4 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Bilik panjang 8 m dan lebar 6 m.",
      "parts": [
        "Cari panjang pepenjuru.",
        "Cari jarak terus antara bucu bertentangan.",
        "Berapa lebih pendek daripada berjalan 8 m + 6 m sepanjang dua dinding?"
      ],
      "answer": [
        [
          "√(8² + 6²) = 10 m."
        ],
        [
          "10 m."
        ],
        [
          "14 − 10 = 4 m."
        ]
      ]
    }
  },
  {
    "subtopic": "13.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A right triangle has hypotenuse 29 cm and a leg of 21 cm.",
      "parts": [
        "Find the missing leg.",
        "Find area.",
        "Find perimeter."
      ],
      "answer": [
        [
          "√(29² − 21²) = 20 cm."
        ],
        [
          "½ × 21 × 20 = 210 cm²."
        ],
        [
          "20 + 21 + 29 = 70 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga bersudut tegak mempunyai hipotenus 29 cm dan satu sisi tegak 21 cm.",
      "parts": [
        "Cari sisi tegak yang hilang.",
        "Cari luas.",
        "Cari perimeter."
      ],
      "answer": [
        [
          "√(29² − 21²) = 20 cm."
        ],
        [
          "½ × 21 × 20 = 210 cm²."
        ],
        [
          "20 + 21 + 29 = 70 cm."
        ]
      ]
    }
  }
];
export function buildMathF1C13Flashcards(lang:"bm"|"dlp"):Flashcard[]{
 if(legacyCards.length!==57||C13_CHALLENGES.length!==16)throw new Error("Chapter 13 flashcard count invariant failed");
 return legacyCards.map(({entry,id},index)=>{
   const mode=index<12?"concept":index<41?"practice":"challenge";
   const challenge=mode==="challenge"?C13_CHALLENGES[index-41]:null;
   const structured:StructuredFlashcard=challenge?{...challenge[lang]}:{prompt:entry[lang][0],answer:[[entry[lang][1]]]};
   return {id:id(lang),subjectId:"math",form:"Form 1",chapter:"Chapter 13",lang,front:structuredFront(structured),back:structuredBack(structured),subtopic:challenge?.subtopic??"13.1",reviewMode:mode,structured};
 });
}
