import type { Flashcard } from "@/data/content";
import { structuredFront, structuredBack, type StructuredFlashcard } from "@/features/flashcards/structuredFlashcard";
type MathFlashcardCategoryId = "concepts" | "operations" | "facts" | "practice";
const mathCard = (bmFront:string,bmBack:string,dlpFront:string,dlpBack:string) => ({bm:[bmFront,bmBack] as [string,string],dlp:[dlpFront,dlpBack] as [string,string]});
const LEGACY_C9_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah poligon?",
      "Poligon ialah bentuk 2D tertutup yang dibatasi oleh tiga atau lebih sisi lurus.",
      "What is a polygon?",
      "A polygon is a closed 2D shape bounded by three or more straight sides.",
    ),
    mathCard(
      "Apakah perbezaan poligon sekata dan tidak sekata?",
      "Sekata: semua sisi sama dan semua sudut sama. Tidak sekata: sisi atau sudut berbeza.",
      "What is the difference between regular and irregular polygons?",
      "Regular: all sides equal and all angles equal. Irregular: sides or angles differ.",
    ),
    mathCard(
      "Apakah pepenjuru poligon?",
      "Pepenjuru ialah tembereng garis yang menghubungkan dua bucu yang TIDAK bersebelahan.",
      "What is a diagonal of a polygon?",
      "A diagonal is a line segment connecting two NON-ADJACENT vertices.",
    ),
    mathCard(
      "Berapakah bilangan sisi segi tiga, sisi empat dan pentagon?",
      "Segi tiga = 3, Sisi empat = 4, Pentagon = 5.",
      "How many sides do a triangle, quadrilateral and pentagon have?",
      "Triangle = 3, Quadrilateral = 4, Pentagon = 5.",
    ),
    mathCard(
      "Apakah segi tiga sama sisi?",
      "Segi tiga sama sisi mempunyai 3 sisi sama panjang, 3 sudut = 60°, dan 3 garis simetri.",
      "What is an equilateral triangle?",
      "An equilateral triangle has 3 equal sides, all angles = 60°, and 3 lines of symmetry.",
    ),
    mathCard(
      "Apakah segi tiga sama kaki?",
      "Segi tiga sama kaki mempunyai 2 sisi sama, 2 sudut tapak sama, dan 1 garis simetri.",
      "What is an isosceles triangle?",
      "An isosceles triangle has 2 equal sides, 2 equal base angles, and 1 line of symmetry.",
    ),
    mathCard(
      "Apakah segi tiga tak sama kaki?",
      "Segi tiga tak sama kaki mempunyai semua sisi berbeza, semua sudut berbeza, dan tiada garis simetri.",
      "What is a scalene triangle?",
      "A scalene triangle has all sides different, all angles different, and no lines of symmetry.",
    ),
    mathCard(
      "Apakah segi tiga bersudut tegak?",
      "Segi tiga bersudut tegak mempunyai satu sudut 90°. Sisi terpanjang dipanggil hipotenus.",
      "What is a right-angled triangle?",
      "A right-angled triangle has one 90° angle. The longest side is called the hypotenuse.",
    ),
    mathCard(
      "Apakah segi tiga bersudut cakah?",
      "Segi tiga bersudut cakah mempunyai SATU sudut lebih besar daripada 90°.",
      "What is an obtuse-angled triangle?",
      "An obtuse-angled triangle has ONE angle greater than 90°.",
    ),
    mathCard(
      "Apakah segi tiga bersudut tirus?",
      "Segi tiga bersudut tirus mempunyai SEMUA TIGA sudut kurang daripada 90°.",
      "What is an acute-angled triangle?",
      "An acute-angled triangle has ALL THREE angles less than 90°.",
    ),
    mathCard(
      "Apakah segi empat tepat?",
      "Segi empat tepat mempunyai 4 sudut 90°, sisi bertentangan sama dan selari, dan 2 garis simetri.",
      "What is a rectangle?",
      "A rectangle has 4 right angles, opposite sides equal and parallel, and 2 lines of symmetry.",
    ),
    mathCard(
      "Apakah segi empat sama?",
      "Segi empat sama mempunyai 4 sisi sama, 4 sudut 90°, pepenjuru berserenjang, dan 4 garis simetri.",
      "What is a square?",
      "A square has 4 equal sides, 4 right angles, perpendicular diagonals, and 4 lines of symmetry.",
    ),
    mathCard(
      "Apakah jajaran genjang?",
      "Jajaran genjang mempunyai 2 pasang sisi bertentangan yang selari dan sama, sudut bertentangan sama, dan tiada garis simetri.",
      "What is a parallelogram?",
      "A parallelogram has 2 pairs of opposite parallel equal sides, opposite angles equal, and no lines of symmetry.",
    ),
    mathCard(
      "Apakah belah ketupat?",
      "Belah ketupat mempunyai 4 sisi sama, pepenjuru berserenjang, dan 2 garis simetri.",
      "What is a rhombus?",
      "A rhombus has 4 equal sides, perpendicular diagonals, and 2 lines of symmetry.",
    ),
    mathCard(
      "Apakah trapezium?",
      "Trapezium mempunyai tepat SATU pasang sisi yang selari.",
      "What is a trapezium?",
      "A trapezium has exactly ONE pair of parallel sides.",
    ),
    mathCard(
      "Apakah lelayang?",
      "Lelayang mempunyai DUA pasang sisi BERSEBELAHAN yang sama, pepenjuru berserenjang, dan 1 garis simetri.",
      "What is a kite?",
      "A kite has TWO pairs of ADJACENT equal sides, perpendicular diagonals, and 1 line of symmetry.",
    ),
    mathCard(
      "Apakah hipotenus?",
      "Hipotenus ialah sisi terpanjang segi tiga bersudut tegak — sisi yang bertentangan dengan sudut 90°.",
      "What is the hypotenuse?",
      "The hypotenuse is the longest side of a right-angled triangle — the side opposite the 90° angle.",
    ),
    mathCard(
      "Apakah garis simetri?",
      "Garis simetri ialah garis yang membahagi bentuk kepada dua bahagian yang sama (imej cermin antara satu sama lain).",
      "What is a line of symmetry?",
      "A line of symmetry divides a shape into two identical mirror-image halves.",
    ),
  ],
  operations: [
    mathCard(
      "Bagaimana mengira bilangan pepenjuru?",
      "Guna formula: n(n − 3) / 2, di mana n ialah bilangan sisi.",
      "How do you calculate the number of diagonals?",
      "Use the formula: n(n − 3) / 2, where n is the number of sides.",
    ),
    mathCard(
      "Berapa pepenjuru bagi sisi empat?",
      "n = 4: 4(4 − 3)/2 = 4(1)/2 = 2 pepenjuru.",
      "How many diagonals does a quadrilateral have?",
      "n = 4: 4(4 − 3)/2 = 4(1)/2 = 2 diagonals.",
    ),
    mathCard(
      "Berapa pepenjuru bagi pentagon?",
      "n = 5: 5(5 − 3)/2 = 5(2)/2 = 5 pepenjuru.",
      "How many diagonals does a pentagon have?",
      "n = 5: 5(5 − 3)/2 = 5(2)/2 = 5 diagonals.",
    ),
    mathCard(
      "Berapa pepenjuru bagi heksagon?",
      "n = 6: 6(6 − 3)/2 = 6(3)/2 = 9 pepenjuru.",
      "How many diagonals does a hexagon have?",
      "n = 6: 6(6 − 3)/2 = 6(3)/2 = 9 diagonals.",
    ),
    mathCard(
      "Bagaimana mencari sudut ketiga segi tiga?",
      "Tolak dua sudut yang diketahui daripada 180°. Contoh: ∠C = 180° − ∠A − ∠B.",
      "How do you find the third angle of a triangle?",
      "Subtract the two known angles from 180°. Example: ∠C = 180° − ∠A − ∠B.",
    ),
    mathCard(
      "Bagaimana menggunakan sifat sudut luar segi tiga?",
      "Sudut luar = jumlah dua sudut dalam yang tidak bersebelahan. Contoh: jika ∠A = 40° dan ∠B = 60°, sudut luar di C = 100°.",
      "How do you use the exterior angle property of a triangle?",
      "Exterior angle = sum of two non-adjacent interior angles. Example: if ∠A = 40° and ∠B = 60°, exterior angle at C = 100°.",
    ),
    mathCard(
      "Bagaimana mencari sudut keempat sisi empat?",
      "Tolak tiga sudut yang diketahui daripada 360°. Contoh: ∠D = 360° − ∠A − ∠B − ∠C.",
      "How do you find the fourth angle of a quadrilateral?",
      "Subtract the three known angles from 360°. Example: ∠D = 360° − ∠A − ∠B − ∠C.",
    ),
    mathCard(
      "Bagaimana menggunakan sifat jajaran genjang?",
      "Sudut bertentangan sama, dan sudut bersebelahan berjumlah 180°. Jika ∠A = 75°, maka ∠C = 75° dan ∠B = 105°.",
      "How do you use parallelogram angle properties?",
      "Opposite angles equal, adjacent angles sum to 180°. If ∠A = 75°, then ∠C = 75° and ∠B = 105°.",
    ),
    mathCard(
      "Segi tiga sama kaki: dua sudut tapak = 55°. Cari sudut puncak.",
      "Sudut puncak = 180° − 55° − 55° = 70°.",
      "Isosceles triangle: two base angles = 55°. Find the apex angle.",
      "Apex angle = 180° − 55° − 55° = 70°.",
    ),
    mathCard(
      "Segi tiga bersudut tegak: dua sudut lain = 30° dan x. Cari x.",
      "30° + x = 90° (dua sudut bukan tegak berjumlah 90°). x = 60°.",
      "Right-angled triangle: two non-right angles = 30° and x. Find x.",
      "30° + x = 90° (two non-right angles sum to 90°). x = 60°.",
    ),
    mathCard(
      "Jajaran genjang ABCD: ∠A = 68°. Cari semua sudut.",
      "∠C = 68° (bertentangan). ∠B = ∠D = 180° − 68° = 112°.",
      "Parallelogram ABCD: ∠A = 68°. Find all angles.",
      "∠C = 68° (opposite). ∠B = ∠D = 180° − 68° = 112°.",
    ),
    mathCard(
      "Cara mengenal pasti segi tiga berdasarkan sisi.",
      "1 seretan (tick) = satu sisi. 2 seretan = sisi yang sama. 3 seretan = segi tiga tak sama kaki. Semua 1 seretan = sama sisi.",
      "How to identify triangles by their sides in a diagram.",
      "1 tick = one side. 2 ticks = equal sides. Same tick on all = equilateral. Mixed ticks = scalene.",
    ),
    mathCard(
      "Cara membezakan belah ketupat dan segi empat sama.",
      "Belah ketupat: 4 sisi sama, tiada sudut 90° (melainkan ianya segi empat sama). Segi empat sama: 4 sisi sama DENGAN 4 sudut 90°.",
      "How to distinguish a rhombus from a square.",
      "Rhombus: 4 equal sides, no 90° angles (unless it is a square). Square: 4 equal sides WITH 4 right angles.",
    ),
    mathCard(
      "Sudut luar segi tiga = (3x + 10)° dan dua sudut dalam berhadapan = 70° dan (x + 20)°. Cari x.",
      "3x + 10 = 70 + (x + 20). 3x + 10 = x + 90. 2x = 80. x = 40.",
      "Exterior angle = (3x + 10)°, two non-adjacent interior angles = 70° and (x + 20)°. Find x.",
      "3x + 10 = 70 + (x + 20). 3x + 10 = x + 90. 2x = 80. x = 40.",
    ),
    mathCard(
      "Sisi empat ABCD: ∠A = 80°, ∠B = 100°, ∠C = 75°. Cari ∠D.",
      "∠D = 360° − 80° − 100° − 75° = 105°.",
      "Quadrilateral ABCD: ∠A = 80°, ∠B = 100°, ∠C = 75°. Find ∠D.",
      "∠D = 360° − 80° − 100° − 75° = 105°.",
    ),
    mathCard(
      "Cari bilangan pepenjuru oktagon (n = 8).",
      "8(8 − 3)/2 = 8(5)/2 = 40/2 = 20 pepenjuru.",
      "Find the number of diagonals of an octagon (n = 8).",
      "8(8 − 3)/2 = 8(5)/2 = 40/2 = 20 diagonals.",
    ),
    mathCard(
      "Segi tiga PQR: ∠P = (2x + 5)°, ∠Q = (x + 10)°, ∠R = (3x − 15)°. Cari x.",
      "(2x + 5) + (x + 10) + (3x − 15) = 180. 6x = 180. x = 30.",
      "Triangle PQR: ∠P = (2x + 5)°, ∠Q = (x + 10)°, ∠R = (3x − 15)°. Find x.",
      "(2x + 5) + (x + 10) + (3x − 15) = 180. 6x = 180. x = 30.",
    ),
  ],
  facts: [
    mathCard(
      "Berapakah jumlah sudut dalam segi tiga?",
      "Jumlah sudut dalam segi tiga = 180°. Ini berlaku untuk MANA-MANA segi tiga.",
      "What is the sum of interior angles of a triangle?",
      "Sum of interior angles of a triangle = 180°. This applies to ANY triangle.",
    ),
    mathCard(
      "Berapakah jumlah sudut dalam sisi empat?",
      "Jumlah sudut dalam sisi empat = 360°. Ini berlaku untuk MANA-MANA sisi empat.",
      "What is the sum of interior angles of a quadrilateral?",
      "Sum of interior angles of a quadrilateral = 360°. This applies to ANY quadrilateral.",
    ),
    mathCard(
      "Formula bilangan pepenjuru.",
      "Bilangan pepenjuru = n(n − 3) / 2, di mana n ialah bilangan sisi.",
      "Formula for number of diagonals.",
      "Number of diagonals = n(n − 3) / 2, where n is the number of sides.",
    ),
    mathCard(
      "Bilangan garis simetri: segi empat sama vs segi empat tepat.",
      "Segi empat sama: 4 garis simetri. Segi empat tepat: 2 garis simetri.",
      "Lines of symmetry: square vs rectangle.",
      "Square: 4 lines of symmetry. Rectangle: 2 lines of symmetry.",
    ),
    mathCard(
      "Bilangan garis simetri: jajaran genjang vs belah ketupat.",
      "Jajaran genjang: 0 garis simetri. Belah ketupat: 2 garis simetri.",
      "Lines of symmetry: parallelogram vs rhombus.",
      "Parallelogram: 0 lines of symmetry. Rhombus: 2 lines of symmetry.",
    ),
    mathCard(
      "Bilangan garis simetri pelbagai bentuk.",
      "Segi tiga sama sisi: 3. Segi empat sama: 4. Belah ketupat: 2. Lelayang: 1. Trapezium: 0. Jajaran genjang: 0.",
      "Lines of symmetry for various shapes.",
      "Equilateral triangle: 3. Square: 4. Rhombus: 2. Kite: 1. Trapezium: 0. Parallelogram: 0.",
    ),
    mathCard(
      "Apakah sifat pepenjuru segi empat sama?",
      "Pepenjuru segi empat sama adalah sama panjang, bersilang di tengah, berserenjang (90°), dan membahagi dua sudut bucu.",
      "What are the diagonal properties of a square?",
      "Diagonals of a square are equal in length, bisect each other, are perpendicular (90°), and bisect the corner angles.",
    ),
    mathCard(
      "Apakah sifat pepenjuru belah ketupat?",
      "Pepenjuru belah ketupat berserenjang (90°) dan bersilang di tengah, tetapi tidak sama panjang.",
      "What are the diagonal properties of a rhombus?",
      "Diagonals of a rhombus are perpendicular (90°) and bisect each other, but are NOT equal in length.",
    ),
    mathCard(
      "Apakah sifat pepenjuru segi empat tepat?",
      "Pepenjuru segi empat tepat adalah sama panjang dan bersilang di tengah, tetapi TIDAK berserenjang.",
      "What are the diagonal properties of a rectangle?",
      "Diagonals of a rectangle are equal in length and bisect each other, but are NOT perpendicular.",
    ),
    mathCard(
      "Apakah sifat pepenjuru lelayang?",
      "Satu pepenjuru membahagi dua pepenjuru yang lain. Pepenjuru berserenjang (90°). Pepenjuru tidak sama panjang.",
      "What are the diagonal properties of a kite?",
      "One diagonal bisects the other. Diagonals are perpendicular (90°). Diagonals are not equal in length.",
    ),
    mathCard(
      "Apakah sifat sudut jajaran genjang?",
      "Sudut bertentangan sama. Sudut bersebelahan berjumlah 180°.",
      "What are the angle properties of a parallelogram?",
      "Opposite angles are equal. Adjacent angles sum to 180°.",
    ),
    mathCard(
      "Nyatakan sifat sudut luar segi tiga.",
      "Sudut luar segi tiga = jumlah dua sudut dalam yang TIDAK bersebelahan (berhadapan).",
      "State the exterior angle property of a triangle.",
      "Exterior angle of a triangle = sum of the two NON-ADJACENT (opposite) interior angles.",
    ),
    mathCard(
      "Berapa banyak pepenjuru segi tiga mempunyai?",
      "Sifar (0). Semua bucu segi tiga adalah bersebelahan, jadi tiada dua bucu yang 'tidak bersebelahan'.",
      "How many diagonals does a triangle have?",
      "Zero (0). All vertices of a triangle are adjacent, so there are no 'non-adjacent' pairs of vertices.",
    ),
  ],
  practice: [
    mathCard(
      "Cari bilangan pepenjuru heptagon.",
      "n = 7: 7(7 − 3)/2 = 7(4)/2 = 14 pepenjuru.",
      "Find the number of diagonals of a heptagon.",
      "n = 7: 7(7 − 3)/2 = 7(4)/2 = 14 diagonals.",
    ),
    mathCard(
      "Segi tiga: ∠A = 65°, ∠B = 70°. Cari ∠C.",
      "∠C = 180° − 65° − 70° = 45°.",
      "Triangle: ∠A = 65°, ∠B = 70°. Find ∠C.",
      "∠C = 180° − 65° − 70° = 45°.",
    ),
    mathCard(
      "Sisi empat: ∠A = 90°, ∠B = 80°, ∠C = 100°. Cari ∠D.",
      "∠D = 360° − 90° − 80° − 100° = 90°.",
      "Quadrilateral: ∠A = 90°, ∠B = 80°, ∠C = 100°. Find ∠D.",
      "∠D = 360° − 90° − 80° − 100° = 90°.",
    ),
    mathCard(
      "Sudut luar segi tiga = 115°. Satu sudut dalam berhadapan = 55°. Cari yang lain.",
      "115° − 55° = 60°.",
      "Exterior angle of a triangle = 115°. One non-adjacent interior angle = 55°. Find the other.",
      "115° − 55° = 60°.",
    ),
    mathCard(
      "Jajaran genjang: ∠A = 125°. Cari semua sudut lain.",
      "∠C = 125°. ∠B = ∠D = 180° − 125° = 55°.",
      "Parallelogram: ∠A = 125°. Find all other angles.",
      "∠C = 125°. ∠B = ∠D = 180° − 125° = 55°.",
    ),
    mathCard(
      "Segi tiga sama kaki: sudut puncak = 40°. Cari sudut tapak.",
      "(180° − 40°) / 2 = 140° / 2 = 70°.",
      "Isosceles triangle: apex angle = 40°. Find the base angles.",
      "(180° − 40°) / 2 = 140° / 2 = 70°.",
    ),
    mathCard(
      "Poligon dengan n = 10 (dekagon). Berapa pepenjuru?",
      "10(10 − 3)/2 = 10(7)/2 = 35 pepenjuru.",
      "Polygon with n = 10 (decagon). How many diagonals?",
      "10(10 − 3)/2 = 10(7)/2 = 35 diagonals.",
    ),
    mathCard(
      "Sebuah sisi empat mempunyai 3 sudut sama iaitu 85° setiap satu. Cari sudut keempat.",
      "360° − 85° − 85° − 85° = 105°.",
      "A quadrilateral has 3 equal angles of 85° each. Find the fourth angle.",
      "360° − 85° − 85° − 85° = 105°.",
    ),
    mathCard(
      "Segi tiga dengan sudut (2x)°, (3x)° dan (x + 30)°. Cari x.",
      "2x + 3x + x + 30 = 180. 6x + 30 = 180. 6x = 150. x = 25.",
      "Triangle with angles (2x)°, (3x)° and (x + 30)°. Find x.",
      "2x + 3x + x + 30 = 180. 6x + 30 = 180. 6x = 150. x = 25.",
    ),
    mathCard(
      "Namakan poligon dengan 9 sisi.",
      "Nonagon.",
      "Name the polygon with 9 sides.",
      "Nonagon.",
    ),
    mathCard(
      "Sebuah sisi empat mempunyai tepat satu pasang sisi selari. Apakah namanya?",
      "Trapezium.",
      "A quadrilateral has exactly one pair of parallel sides. What is it called?",
      "Trapezium.",
    ),
    mathCard(
      "Apakah sisi empat yang mempunyai 4 sisi sama tetapi sudut bukan 90°?",
      "Belah ketupat.",
      "What quadrilateral has 4 equal sides but angles not equal to 90°?",
      "Rhombus.",
    ),
    mathCard(
      "Bilangan garis simetri lelayang dan segi tiga sama kaki.",
      "Lelayang: 1 garis simetri. Segi tiga sama kaki: 1 garis simetri.",
      "Lines of symmetry for a kite and isosceles triangle.",
      "Kite: 1 line of symmetry. Isosceles triangle: 1 line of symmetry.",
    ),
  ],
};


const legacy = (["concepts","operations","facts","practice"] as const).flatMap(category=>LEGACY_C9_PAIRS[category].map((entry,index)=>({entry,id:(lang:"bm"|"dlp")=>`math-f1-c9-${lang}-${category}-${index+1}`})));
export const C9_CHALLENGES = [
  {
    "subtopic": "9.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A regular hexagon has side length 8 cm.",
      "parts": [
        "How many sides does it have?",
        "Find its perimeter.",
        "Find its number of lines of symmetry."
      ],
      "answer": [
        [
          "6 sides."
        ],
        [
          "6 × 8 = 48 cm."
        ],
        [
          "6 lines of symmetry."
        ]
      ]
    },
    "bm": {
      "prompt": "Sebuah heksagon sekata mempunyai panjang sisi 8 cm.",
      "parts": [
        "Berapa bilangan sisinya?",
        "Cari perimeternya.",
        "Cari bilangan paksi simetrinya."
      ],
      "answer": [
        [
          "6 sisi."
        ],
        [
          "6 × 8 = 48 cm."
        ],
        [
          "6 paksi simetri."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A regular pentagon has a perimeter of 65 cm.",
      "parts": [
        "How many sides does it have?",
        "Find the length of one side.",
        "Find the sum of its interior angles."
      ],
      "answer": [
        [
          "5 sides."
        ],
        [
          "65 ÷ 5 = 13 cm."
        ],
        [
          "(5 − 2) × 180° = 540°."
        ]
      ]
    },
    "bm": {
      "prompt": "Sebuah pentagon sekata mempunyai perimeter 65 cm.",
      "parts": [
        "Berapa sisinya?",
        "Cari panjang satu sisi.",
        "Cari jumlah sudut pedalaman."
      ],
      "answer": [
        [
          "5 sisi."
        ],
        [
          "65 ÷ 5 = 13 cm."
        ],
        [
          "(5 − 2) × 180° = 540°."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A polygon has 8 straight sides, all equal in length, but its angles are not all equal.",
      "parts": [
        "Name the polygon by its sides.",
        "Is it regular? Explain.",
        "How many vertices does it have?"
      ],
      "answer": [
        [
          "An octagon."
        ],
        [
          "No; a regular polygon requires equal sides and equal angles."
        ],
        [
          "8 vertices."
        ]
      ]
    },
    "bm": {
      "prompt": "Poligon mempunyai 8 sisi lurus sama panjang, tetapi sudutnya tidak semuanya sama.",
      "parts": [
        "Namakan poligon mengikut sisinya.",
        "Adakah poligon sekata? Jelaskan.",
        "Berapa bilangan bucunya?"
      ],
      "answer": [
        [
          "Oktagon."
        ],
        [
          "Tidak; poligon sekata memerlukan sisi dan sudut yang sama."
        ],
        [
          "8 bucu."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A regular octagon has side length 3.5 cm.",
      "parts": [
        "Find its number of sides.",
        "Calculate its perimeter.",
        "Find the sum of its interior angles."
      ],
      "answer": [
        [
          "8."
        ],
        [
          "8 × 3.5 = 28 cm."
        ],
        [
          "(8 − 2) × 180° = 1080°."
        ]
      ]
    },
    "bm": {
      "prompt": "Oktagon sekata mempunyai sisi 3.5 cm.",
      "parts": [
        "Cari bilangan sisinya.",
        "Hitung perimeter.",
        "Cari jumlah sudut pedalaman."
      ],
      "answer": [
        [
          "8."
        ],
        [
          "8 × 3.5 = 28 cm."
        ],
        [
          "(8 − 2) × 180° = 1080°."
        ]
      ]
    }
  },
  {
    "subtopic": "9.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A shape is open and made of five straight segments.",
      "parts": [
        "Is it a polygon?",
        "What condition is missing?",
        "If it is closed without intersections, how many sides will it have?"
      ],
      "answer": [
        [
          "No."
        ],
        [
          "A polygon must be closed."
        ],
        [
          "5 sides; it becomes a pentagon."
        ]
      ]
    },
    "bm": {
      "prompt": "Bentuk terbuka dibina daripada lima tembereng lurus.",
      "parts": [
        "Adakah ia poligon?",
        "Apakah syarat yang tiada?",
        "Jika ditutup tanpa bersilang, berapa sisinya?"
      ],
      "answer": [
        [
          "Tidak."
        ],
        [
          "Poligon mesti tertutup."
        ],
        [
          "5 sisi; menjadi pentagon."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A regular hexagon has six equal interior angles.",
      "parts": [
        "Calculate the sum of the interior angles.",
        "Find one interior angle.",
        "Find one exterior angle."
      ],
      "answer": [
        [
          "(6 − 2) × 180° = 720°."
        ],
        [
          "720° ÷ 6 = 120°."
        ],
        [
          "180° − 120° = 60°."
        ]
      ]
    },
    "bm": {
      "prompt": "Heksagon sekata mempunyai enam sudut pedalaman sama.",
      "parts": [
        "Hitung jumlah sudut pedalaman.",
        "Cari satu sudut pedalaman.",
        "Cari satu sudut peluaran."
      ],
      "answer": [
        [
          "(6 − 2) × 180° = 720°."
        ],
        [
          "720° ÷ 6 = 120°."
        ],
        [
          "180° − 120° = 60°."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "The exterior angle of a regular polygon is 45°.",
      "parts": [
        "How many sides does it have?",
        "Find its interior angle.",
        "Find the sum of its interior angles."
      ],
      "answer": [
        [
          "360° ÷ 45° = 8."
        ],
        [
          "180° − 45° = 135°."
        ],
        [
          "(8 − 2) × 180° = 1080°."
        ]
      ]
    },
    "bm": {
      "prompt": "Sudut peluaran poligon sekata ialah 45°.",
      "parts": [
        "Berapa bilangan sisinya?",
        "Cari sudut pedalaman.",
        "Cari jumlah sudut pedalaman."
      ],
      "answer": [
        [
          "360° ÷ 45° = 8."
        ],
        [
          "180° − 45° = 135°."
        ],
        [
          "(8 − 2) × 180° = 1080°."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "The interior angle of a regular polygon is 150°.",
      "parts": [
        "Find the exterior angle.",
        "Determine the number of sides.",
        "Calculate the interior angle sum."
      ],
      "answer": [
        [
          "180° − 150° = 30°."
        ],
        [
          "360° ÷ 30° = 12."
        ],
        [
          "(12 − 2) × 180° = 1800°."
        ]
      ]
    },
    "bm": {
      "prompt": "Sudut pedalaman poligon sekata ialah 150°.",
      "parts": [
        "Cari sudut peluaran.",
        "Tentukan bilangan sisi.",
        "Hitung jumlah sudut pedalaman."
      ],
      "answer": [
        [
          "180° − 150° = 30°."
        ],
        [
          "360° ÷ 30° = 12."
        ],
        [
          "(12 − 2) × 180° = 1800°."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "The sum of the interior angles of a convex polygon is 900°.",
      "parts": [
        "Form an equation for its number of sides n.",
        "Find n.",
        "Find the number of diagonals."
      ],
      "answer": [
        [
          "(n − 2) × 180 = 900."
        ],
        [
          "n = 7."
        ],
        [
          "7(7 − 3)/2 = 14 diagonals."
        ]
      ]
    },
    "bm": {
      "prompt": "Jumlah sudut pedalaman poligon cembung ialah 900°.",
      "parts": [
        "Bina persamaan untuk bilangan sisi n.",
        "Cari n.",
        "Cari bilangan pepenjuru."
      ],
      "answer": [
        [
          "(n − 2) × 180 = 900."
        ],
        [
          "n = 7."
        ],
        [
          "7(7 − 3)/2 = 14 pepenjuru."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A regular pentagon has each exterior angle marked x°.",
      "parts": [
        "Find x.",
        "Find the adjacent interior angle.",
        "Find the sum of five interior angles."
      ],
      "answer": [
        [
          "360° ÷ 5 = 72°."
        ],
        [
          "180° − 72° = 108°."
        ],
        [
          "5 × 108° = 540°."
        ]
      ]
    },
    "bm": {
      "prompt": "Pentagon sekata mempunyai setiap sudut peluaran ditandakan x°.",
      "parts": [
        "Cari x.",
        "Cari sudut pedalaman bersebelahan.",
        "Cari jumlah lima sudut pedalaman."
      ],
      "answer": [
        [
          "360° ÷ 5 = 72°."
        ],
        [
          "180° − 72° = 108°."
        ],
        [
          "5 × 108° = 540°."
        ]
      ]
    }
  },
  {
    "subtopic": "9.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A regular nonagon has nine sides.",
      "parts": [
        "Find the interior angle sum.",
        "Find each exterior angle.",
        "Find each interior angle."
      ],
      "answer": [
        [
          "(9 − 2) × 180° = 1260°."
        ],
        [
          "360° ÷ 9 = 40°."
        ],
        [
          "180° − 40° = 140°."
        ]
      ]
    },
    "bm": {
      "prompt": "Nonagon sekata mempunyai sembilan sisi.",
      "parts": [
        "Cari jumlah sudut pedalaman.",
        "Cari setiap sudut peluaran.",
        "Cari setiap sudut pedalaman."
      ],
      "answer": [
        [
          "(9 − 2) × 180° = 1260°."
        ],
        [
          "360° ÷ 9 = 40°."
        ],
        [
          "180° − 40° = 140°."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A convex hexagon is divided into triangles from one vertex.",
      "parts": [
        "How many triangles are formed?",
        "Find the total angle sum.",
        "How many diagonals can be drawn from that vertex?"
      ],
      "answer": [
        [
          "6 − 2 = 4 triangles."
        ],
        [
          "4 × 180° = 720°."
        ],
        [
          "6 − 3 = 3 diagonals."
        ]
      ]
    },
    "bm": {
      "prompt": "Heksagon cembung dibahagikan kepada segi tiga daripada satu bucu.",
      "parts": [
        "Berapa segi tiga terbentuk?",
        "Cari jumlah sudut.",
        "Berapa pepenjuru daripada bucu itu?"
      ],
      "answer": [
        [
          "6 − 2 = 4 segi tiga."
        ],
        [
          "4 × 180° = 720°."
        ],
        [
          "6 − 3 = 3 pepenjuru."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A convex octagon has eight vertices.",
      "parts": [
        "Find diagonals from one vertex.",
        "Calculate all diagonals.",
        "Find the interior angle sum."
      ],
      "answer": [
        [
          "8 − 3 = 5."
        ],
        [
          "8(8 − 3)/2 = 20."
        ],
        [
          "(8 − 2) × 180° = 1080°."
        ]
      ]
    },
    "bm": {
      "prompt": "Oktagon cembung mempunyai lapan bucu.",
      "parts": [
        "Cari pepenjuru daripada satu bucu.",
        "Hitung jumlah pepenjuru.",
        "Cari jumlah sudut pedalaman."
      ],
      "answer": [
        [
          "8 − 3 = 5."
        ],
        [
          "8(8 − 3)/2 = 20."
        ],
        [
          "(8 − 2) × 180° = 1080°."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A convex polygon has 9 diagonals in total.",
      "parts": [
        "Write the diagonal-count equation.",
        "Find the number of sides.",
        "Name the polygon."
      ],
      "answer": [
        [
          "n(n − 3)/2 = 9."
        ],
        [
          "n = 6."
        ],
        [
          "Hexagon."
        ]
      ]
    },
    "bm": {
      "prompt": "Poligon cembung mempunyai 9 pepenjuru semuanya.",
      "parts": [
        "Tulis persamaan jumlah pepenjuru.",
        "Cari bilangan sisi.",
        "Namakan poligon."
      ],
      "answer": [
        [
          "n(n − 3)/2 = 9."
        ],
        [
          "n = 6."
        ],
        [
          "Heksagon."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A regular decagon has side length 4 cm.",
      "parts": [
        "Find the perimeter.",
        "Find the exterior angle.",
        "Find the number of diagonals."
      ],
      "answer": [
        [
          "10 × 4 = 40 cm."
        ],
        [
          "360° ÷ 10 = 36°."
        ],
        [
          "10(10 − 3)/2 = 35."
        ]
      ]
    },
    "bm": {
      "prompt": "Dekagon sekata mempunyai sisi 4 cm.",
      "parts": [
        "Cari perimeter.",
        "Cari sudut peluaran.",
        "Cari bilangan pepenjuru."
      ],
      "answer": [
        [
          "10 × 4 = 40 cm."
        ],
        [
          "360° ÷ 10 = 36°."
        ],
        [
          "10(10 − 3)/2 = 35."
        ]
      ]
    }
  },
  {
    "subtopic": "9.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A regular polygon has each exterior angle equal to 24°.",
      "parts": [
        "Determine the number of sides.",
        "Calculate one interior angle.",
        "Find its number of diagonals."
      ],
      "answer": [
        [
          "360° ÷ 24° = 15."
        ],
        [
          "180° − 24° = 156°."
        ],
        [
          "15(15 − 3)/2 = 90."
        ]
      ]
    },
    "bm": {
      "prompt": "Poligon sekata mempunyai setiap sudut peluaran 24°.",
      "parts": [
        "Tentukan bilangan sisi.",
        "Hitung satu sudut pedalaman.",
        "Cari jumlah pepenjuru."
      ],
      "answer": [
        [
          "360° ÷ 24° = 15."
        ],
        [
          "180° − 24° = 156°."
        ],
        [
          "15(15 − 3)/2 = 90."
        ]
      ]
    }
  }
];
export function buildMathF1C9Flashcards(lang:"bm"|"dlp"): Flashcard[] {
 if(legacy.length!==61||C9_CHALLENGES.length!==16) throw new Error("Chapter 9 card count invariant failed");
 return legacy.map(({entry,id},index)=>{
  const mode = index<12?"concept":index<45?"practice":"challenge";
  const challenge = mode==="challenge"?C9_CHALLENGES[index-45]:null;
  const structured:StructuredFlashcard = challenge?{...challenge[lang]}:{prompt:entry[lang][0],answer:[[entry[lang][1]]]};
  return {id:id(lang),subjectId:"math",form:"Form 1",chapter:"Chapter 9",lang,front:structuredFront(structured),back:structuredBack(structured),subtopic:challenge?.subtopic??(index<20?"9.1":index<40?"9.2":"9.3"),reviewMode:mode,structured};
 });
}
