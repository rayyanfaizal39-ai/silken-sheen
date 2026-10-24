import type {Flashcard} from "@/data/content";
import {structuredFront,structuredBack,type StructuredFlashcard} from "@/features/flashcards/structuredFlashcard";
type MathFlashcardCategoryId="concepts"|"operations"|"facts"|"practice";
const mathCard=(bmFront:string,bmBack:string,dlpFront:string,dlpBack:string)=>({bm:[bmFront,bmBack] as [string,string],dlp:[dlpFront,dlpBack] as [string,string]});
const LEGACY_C8_PAIRS: Record<
  MathFlashcardCategoryId,
  Array<{ bm: [string, string]; dlp: [string, string] }>
> = {
  concepts: [
    mathCard(
      "Apakah sudut?",
      "Sudut ialah ukuran putaran antara dua tembereng garis yang bertemu di satu titik (bucu).",
      "What is an angle?",
      "An angle is the measure of rotation between two line segments meeting at a point (vertex).",
    ),
    mathCard(
      "Apakah sudut tirus?",
      "Sudut tirus ialah sudut yang lebih kecil daripada 90°. Contoh: 30°, 45°, 60°.",
      "What is an acute angle?",
      "An acute angle is an angle smaller than 90°. Examples: 30°, 45°, 60°.",
    ),
    mathCard(
      "Apakah sudut tegak?",
      "Sudut tegak ialah sudut yang tepat 90°. Ia ditandakan dengan simbol kotak kecil □.",
      "What is a right angle?",
      "A right angle is exactly 90°. It is marked with a small square symbol □.",
    ),
    mathCard(
      "Apakah sudut cakah?",
      "Sudut cakah ialah sudut yang lebih besar daripada 90° tetapi kurang daripada 180°. Contoh: 110°, 150°.",
      "What is an obtuse angle?",
      "An obtuse angle is greater than 90° but less than 180°. Examples: 110°, 150°.",
    ),
    mathCard(
      "Apakah sudut refleks?",
      "Sudut refleks ialah sudut yang lebih besar daripada 180° tetapi kurang daripada 360°. Contoh: 200°, 270°.",
      "What is a reflex angle?",
      "A reflex angle is greater than 180° but less than 360°. Examples: 200°, 270°.",
    ),
    mathCard(
      "Apakah sudut pelengkap?",
      "Sudut pelengkap ialah dua sudut yang berjumlah 90°. Setiap satu ialah pelengkap kepada yang lain.",
      "What are complementary angles?",
      "Complementary angles are two angles that sum to 90°. Each is the complement of the other.",
    ),
    mathCard(
      "Apakah sudut penggenap?",
      "Sudut penggenap ialah dua sudut yang berjumlah 180°. Setiap satu ialah penggenap kepada yang lain.",
      "What are supplementary angles?",
      "Supplementary angles are two angles that sum to 180°. Each is the supplement of the other.",
    ),
    mathCard(
      "Apakah sudut konjugat?",
      "Sudut konjugat ialah dua sudut yang berjumlah 360°. Mereka bersama-sama membentuk putaran lengkap.",
      "What are conjugate angles?",
      "Conjugate angles are two angles that sum to 360°. Together they form a complete turn.",
    ),
    mathCard(
      "Apakah sudut bertentang bucu?",
      "Sudut bertentang bucu ialah sudut-sudut yang berhadapan di titik persilangan dua garis. Sudut bertentang bucu adalah sama besar.",
      "What are vertically opposite angles?",
      "Vertically opposite angles are angles facing each other at the intersection of two lines. They are equal in size.",
    ),
    mathCard(
      "Apakah garis serenjang?",
      "Garis serenjang ialah dua garis yang bertemu pada sudut tepat 90°. Dilambangkan dengan simbol ⊥.",
      "What are perpendicular lines?",
      "Perpendicular lines are two lines that meet at exactly 90°. Denoted by the symbol ⊥.",
    ),
    mathCard(
      "Apakah garis selari?",
      "Garis selari ialah dua garis yang tidak bersilang walaupun dipanjangkan seberapa jauh. Jarak antara keduanya sentiasa sama.",
      "What are parallel lines?",
      "Parallel lines are two lines that never intersect even when extended. The distance between them is always the same.",
    ),
    mathCard(
      "Apakah garis rentas lintang?",
      "Garis rentas lintang ialah garis yang memotong dua atau lebih garis lain.",
      "What is a transversal?",
      "A transversal is a line that cuts across two or more other lines.",
    ),
    mathCard(
      "Apakah sudut sepadan?",
      "Sudut sepadan ialah sudut pada kedudukan yang sama di dua persilangan dengan garis rentas lintang. Sudut sepadan adalah sama besar (corak F).",
      "What are corresponding angles?",
      "Corresponding angles are in the same position at two intersections with a transversal. They are equal (F-pattern).",
    ),
    mathCard(
      "Apakah sudut selang-seli?",
      "Sudut selang-seli ialah sudut di kawasan dalam garis selari pada sisi yang berlawanan garis rentas. Sudut selang-seli adalah sama besar (corak Z/N).",
      "What are alternate angles?",
      "Alternate angles are between parallel lines on opposite sides of the transversal. They are equal (Z/N-pattern).",
    ),
    mathCard(
      "Apakah sudut pedalaman?",
      "Sudut pedalaman ialah sudut di kawasan dalam garis selari pada sisi yang sama garis rentas. Dua sudut pedalaman bersebelahan berjumlah 180° (corak C/U).",
      "What are interior angles?",
      "Interior angles are between parallel lines on the same side of the transversal. Two co-interior angles sum to 180° (C/U-pattern).",
    ),
    mathCard(
      "Apakah sudut dongak?",
      "Sudut dongak ialah sudut yang diukur dari garisan ufuk ke atas ke arah objek. Pemerhati berada di bawah objek.",
      "What is the angle of elevation?",
      "The angle of elevation is measured from the horizontal upward to the object. The observer is below the object.",
    ),
    mathCard(
      "Apakah sudut tunduk?",
      "Sudut tunduk ialah sudut yang diukur dari garisan ufuk ke bawah ke arah objek. Pemerhati berada di atas objek.",
      "What is the angle of depression?",
      "The angle of depression is measured from the horizontal downward to the object. The observer is above the object.",
    ),
    mathCard(
      "Apakah protraktor?",
      "Protraktor ialah alat yang digunakan untuk mengukur dan melukis sudut dalam darjah (°).",
      "What is a protractor?",
      "A protractor is a tool used to measure and draw angles in degrees (°).",
    ),
  ],
  operations: [
    mathCard(
      "Bagaimana menggunakan protraktor?",
      "Langkah 1: Letakkan titik tengah pada bucu. Langkah 2: Sejajarkan garisan dasar. Langkah 3: Baca darjah pada skala yang betul.",
      "How do you use a protractor?",
      "Step 1: Place centre at vertex. Step 2: Align baseline. Step 3: Read degrees on the correct scale.",
    ),
    mathCard(
      "Bagaimana mencari sudut pelengkap?",
      "Tolak sudut daripada 90°. Jika sudut = 35°, maka pelengkap = 90° − 35° = 55°.",
      "How do you find the complement of an angle?",
      "Subtract the angle from 90°. If angle = 35°, complement = 90° − 35° = 55°.",
    ),
    mathCard(
      "Bagaimana mencari sudut penggenap?",
      "Tolak sudut daripada 180°. Jika sudut = 70°, maka penggenap = 180° − 70° = 110°.",
      "How do you find the supplement of an angle?",
      "Subtract the angle from 180°. If angle = 70°, supplement = 180° − 70° = 110°.",
    ),
    mathCard(
      "Bagaimana mencari sudut konjugat?",
      "Tolak sudut daripada 360°. Jika sudut = 130°, maka konjugat = 360° − 130° = 230°.",
      "How do you find the conjugate of an angle?",
      "Subtract the angle from 360°. If angle = 130°, conjugate = 360° − 130° = 230°.",
    ),
    mathCard(
      "Bagaimana menggunakan sifat sudut pada garis lurus?",
      "Tetapkan jumlah semua sudut = 180°. Contoh: a + 65° = 180° → a = 115°.",
      "How do you use angles on a straight line?",
      "Set sum of all angles = 180°. Example: a + 65° = 180° → a = 115°.",
    ),
    mathCard(
      "Bagaimana menggunakan sifat putaran lengkap?",
      "Tetapkan jumlah semua sudut di sekeliling titik = 360°. Contoh: 120° + 80° + x = 360° → x = 160°.",
      "How do you use angles at a complete turn?",
      "Set sum of all angles around the point = 360°. Example: 120° + 80° + x = 360° → x = 160°.",
    ),
    mathCard(
      "Bagaimana menggunakan sudut bertentang bucu?",
      "Tetapkan sudut bertentang bucu = sama. Contoh: 3x = 75° → x = 25°.",
      "How do you use vertically opposite angles?",
      "Set vertically opposite angles as equal. Example: 3x = 75° → x = 25°.",
    ),
    mathCard(
      "Bagaimana mengenal pasti sudut sepadan (corak F)?",
      "Sudut sepadan berada pada kedudukan yang sama di dua persilangan — kedua-duanya di atas-kiri, atau kedua-duanya di bawah-kanan. Corak: huruf F.",
      "How do you identify corresponding angles (F-pattern)?",
      "Corresponding angles are in the same position at two intersections — both top-left or both bottom-right. Pattern: letter F.",
    ),
    mathCard(
      "Bagaimana mengenal pasti sudut selang-seli (corak Z)?",
      "Sudut selang-seli berada di kawasan dalam, pada sisi yang berlawanan garis rentas. Corak: huruf Z atau N.",
      "How do you identify alternate angles (Z-pattern)?",
      "Alternate angles are in the inner region, on opposite sides of the transversal. Pattern: letter Z or N.",
    ),
    mathCard(
      "Bagaimana mengenal pasti sudut pedalaman (corak C)?",
      "Sudut pedalaman berada di kawasan dalam, pada sisi yang sama garis rentas. Jumlah = 180°. Corak: huruf C atau U.",
      "How do you identify interior angles (C-pattern)?",
      "Interior angles are in the inner region, on the same side of the transversal. Sum = 180°. Pattern: letter C or U.",
    ),
    mathCard(
      "Cara menyelesaikan sudut dalam persilangan garis.",
      "1. Kenal pasti jenis sudut. 2. Tulis persamaan. 3. Selesaikan. 4. Semak semula.",
      "Steps to solve angles at intersecting lines.",
      "1. Identify the type of angles. 2. Write the equation. 3. Solve. 4. Check your answer.",
    ),
    mathCard(
      "Jika sudut sepadan = (3x + 10)° dan 70°, cari x.",
      "3x + 10 = 70 (sudut sepadan sama). 3x = 60. x = 20.",
      "If corresponding angles = (3x + 10)° and 70°, find x.",
      "3x + 10 = 70 (corresponding angles equal). 3x = 60. x = 20.",
    ),
    mathCard(
      "Jika sudut pedalaman = 65° dan (2y + 15)°, cari y.",
      "65 + (2y + 15) = 180 (sudut pedalaman berjumlah 180°). 2y + 80 = 180. 2y = 100. y = 50.",
      "If interior angles = 65° and (2y + 15)°, find y.",
      "65 + (2y + 15) = 180 (interior angles sum to 180°). 2y + 80 = 180. 2y = 100. y = 50.",
    ),
    mathCard(
      "Membezakan sudut dongak dan tunduk dalam masalah.",
      "Dongak: pemerhati di bawah, lihat ke atas. Tunduk: pemerhati di atas, lihat ke bawah. Kedua-duanya diukur dari garisan ufuk.",
      "Distinguishing elevation and depression in problems.",
      "Elevation: observer below, looking up. Depression: observer above, looking down. Both measured from the horizontal.",
    ),
    mathCard(
      "Melukis garis serenjang menggunakan protraktor.",
      "Lukis satu garis, letakkan pusat protraktor pada titik yang dikehendaki, tandakan 90°, lukis garisan melalui tanda tersebut.",
      "Drawing perpendicular lines using a protractor.",
      "Draw a line, place the protractor centre at the desired point, mark 90°, draw a line through the mark.",
    ),
    mathCard(
      "Menyelesaikan: (2x + 10)°, 40° dan (x − 5)° pada garis lurus.",
      "(2x + 10) + 40 + (x − 5) = 180. 3x + 45 = 180. 3x = 135. x = 45.",
      "Solve: (2x + 10)°, 40° and (x − 5)° on a straight line.",
      "(2x + 10) + 40 + (x − 5) = 180. 3x + 45 = 180. 3x = 135. x = 45.",
    ),
    mathCard(
      "Menyelesaikan: sudut selang-seli = (4m − 20)° dan 80°.",
      "4m − 20 = 80 (sudut selang-seli sama). 4m = 100. m = 25.",
      "Solve: alternate angles = (4m − 20)° and 80°.",
      "4m − 20 = 80 (alternate angles equal). 4m = 100. m = 25.",
    ),
  ],
  facts: [
    mathCard(
      "Berapakah jumlah sudut pada garis lurus?",
      "180°. Semua sudut yang terbentuk di atas (atau bawah) garis lurus sentiasa berjumlah 180°.",
      "What is the sum of angles on a straight line?",
      "180°. All angles formed above (or below) a straight line always sum to 180°.",
    ),
    mathCard(
      "Berapakah jumlah sudut putaran lengkap?",
      "360°. Semua sudut di sekeliling satu titik sentiasa berjumlah 360°.",
      "What is the sum of angles in a complete turn?",
      "360°. All angles around a single point always sum to 360°.",
    ),
    mathCard(
      "Berapa banyak sudut terbentuk apabila dua garis bersilang?",
      "4 sudut. Dua pasangan sudut bertentang bucu dan dua pasangan sudut bersebelahan.",
      "How many angles are formed when two lines intersect?",
      "4 angles. Two pairs of vertically opposite angles and two pairs of adjacent angles.",
    ),
    mathCard(
      "Berapa banyak sudut terbentuk apabila garis rentas memotong dua garis selari?",
      "8 sudut. 4 di setiap titik persilangan.",
      "How many angles are formed when a transversal cuts two parallel lines?",
      "8 angles. 4 at each intersection point.",
    ),
    mathCard(
      "Nyatakan julat setiap jenis sudut.",
      "Tirus: 0°–90°. Tegak: 90°. Cakah: 90°–180°. Refleks: 180°–360°.",
      "State the range of each type of angle.",
      "Acute: 0°–90°. Right: 90°. Obtuse: 90°–180°. Reflex: 180°–360°.",
    ),
    mathCard(
      "Apakah sifat sudut bertentang bucu?",
      "Sudut bertentang bucu adalah SAMA BESAR. Jika satu sudut = 65°, maka sudut bertentang bucu juga = 65°.",
      "What is the property of vertically opposite angles?",
      "Vertically opposite angles are EQUAL. If one angle = 65°, the vertically opposite angle is also 65°.",
    ),
    mathCard(
      "Apakah sifat sudut sepadan pada garis selari?",
      "Sudut SEPADAN adalah SAMA BESAR apabila garis rentas memotong dua garis selari. Corak: F.",
      "What is the property of corresponding angles in parallel lines?",
      "CORRESPONDING angles are EQUAL when a transversal cuts two parallel lines. Pattern: F.",
    ),
    mathCard(
      "Apakah sifat sudut selang-seli pada garis selari?",
      "Sudut SELANG-SELI adalah SAMA BESAR apabila garis rentas memotong dua garis selari. Corak: Z/N.",
      "What is the property of alternate angles in parallel lines?",
      "ALTERNATE angles are EQUAL when a transversal cuts two parallel lines. Pattern: Z/N.",
    ),
    mathCard(
      "Apakah sifat sudut pedalaman pada garis selari?",
      "Sudut PEDALAMAN BERSEBELAHAN BERJUMLAH 180° apabila garis rentas memotong dua garis selari. Corak: C/U.",
      "What is the property of interior angles in parallel lines?",
      "CO-INTERIOR angles SUM TO 180° when a transversal cuts two parallel lines. Pattern: C/U.",
    ),
    mathCard(
      "Formula: pelengkap bagi sudut a.",
      "Pelengkap = 90° − a. Contoh: pelengkap 35° = 90° − 35° = 55°.",
      "Formula: complement of angle a.",
      "Complement = 90° − a. Example: complement of 35° = 90° − 35° = 55°.",
    ),
    mathCard(
      "Formula: penggenap bagi sudut a.",
      "Penggenap = 180° − a. Contoh: penggenap 70° = 180° − 70° = 110°.",
      "Formula: supplement of angle a.",
      "Supplement = 180° − a. Example: supplement of 70° = 180° − 70° = 110°.",
    ),
    mathCard(
      "Formula: konjugat bagi sudut a.",
      "Konjugat = 360° − a. Contoh: konjugat 120° = 360° − 120° = 240°.",
      "Formula: conjugate of angle a.",
      "Conjugate = 360° − a. Example: conjugate of 120° = 360° − 120° = 240°.",
    ),
    mathCard(
      "Apakah perbezaan garis serenjang dan selari?",
      "Serenjang: bertemu pada 90°. Selari: tidak bersilang, jarak sentiasa sama.",
      "What is the difference between perpendicular and parallel lines?",
      "Perpendicular: meet at 90°. Parallel: never intersect, distance always the same.",
    ),
  ],
  practice: [
    mathCard(
      "Sudut pada garis lurus = 65° dan x. Cari x.",
      "x = 180° − 65° = 115°.",
      "Angles on a straight line: 65° and x. Find x.",
      "x = 180° − 65° = 115°.",
    ),
    mathCard(
      "Tiga sudut putaran lengkap: 90°, 150° dan y. Cari y.",
      "90° + 150° + y = 360°. y = 120°.",
      "Three angles at a point: 90°, 150° and y. Find y.",
      "90° + 150° + y = 360°. y = 120°.",
    ),
    mathCard("Pelengkap bagi 42°?", "90° − 42° = 48°.", "Complement of 42°?", "90° − 42° = 48°."),
    mathCard(
      "Penggenap bagi 115°?",
      "180° − 115° = 65°.",
      "Supplement of 115°?",
      "180° − 115° = 65°.",
    ),
    mathCard(
      "Konjugat bagi 250°?",
      "360° − 250° = 110°.",
      "Conjugate of 250°?",
      "360° − 250° = 110°.",
    ),
    mathCard(
      "Dua garis bersilang membentuk sudut 80° dan x (bertentang bucu). Cari x.",
      "x = 80° (sudut bertentang bucu adalah sama).",
      "Two lines intersect forming 80° and x (vertically opposite). Find x.",
      "x = 80° (vertically opposite angles are equal).",
    ),
    mathCard(
      "Sudut bersebelahan = 130°. Cari sudut yang lain.",
      "180° − 130° = 50°.",
      "Adjacent angles: one is 130°. Find the other.",
      "180° − 130° = 50°.",
    ),
    mathCard(
      "Sudut sepadan = (2x + 5)° dan 85°. Cari x.",
      "2x + 5 = 85. 2x = 80. x = 40.",
      "Corresponding angles: (2x + 5)° and 85°. Find x.",
      "2x + 5 = 85. 2x = 80. x = 40.",
    ),
    mathCard(
      "Sudut selang-seli = (3y − 10)° dan 65°. Cari y.",
      "3y − 10 = 65. 3y = 75. y = 25.",
      "Alternate angles: (3y − 10)° and 65°. Find y.",
      "3y − 10 = 65. 3y = 75. y = 25.",
    ),
    mathCard(
      "Sudut pedalaman bersebelahan = 70° dan (2z + 10)°. Cari z.",
      "70 + (2z + 10) = 180. 2z + 80 = 180. 2z = 100. z = 50.",
      "Co-interior angles: 70° and (2z + 10)°. Find z.",
      "70 + (2z + 10) = 180. 2z + 80 = 180. 2z = 100. z = 50.",
    ),
    mathCard(
      "Jenis sudut: 135°?",
      "Sudut cakah (90° < 135° < 180°).",
      "Type of angle: 135°?",
      "Obtuse angle (90° < 135° < 180°).",
    ),
    mathCard(
      "Jenis sudut: 215°?",
      "Sudut refleks (180° < 215° < 360°).",
      "Type of angle: 215°?",
      "Reflex angle (180° < 215° < 360°).",
    ),
    mathCard(
      "Sudut dongak = 30°. Pemerhati berdiri di bawah bangunan. Apakah maksudnya?",
      "Pemerhati melihat ke atas bangunan pada sudut 30° dari garisan ufuk.",
      "Angle of elevation = 30°. Observer stands below a building. What does this mean?",
      "The observer looks up at the building at 30° from the horizontal line.",
    ),
    mathCard(
      "Sudut tunduk = 45°. Pemerhati berada di atas menara. Apakah maksudnya?",
      "Pemerhati melihat ke bawah pada sudut 45° dari garisan ufuk.",
      "Angle of depression = 45°. Observer is on top of a tower. What does this mean?",
      "The observer looks downward at 45° from the horizontal line.",
    ),
    mathCard(
      "Garis rentas memotong dua garis selari. Sudut = 110°. Cari sudut selang-seli dan sudut sepadan.",
      "Sudut selang-seli = 110° (sama). Sudut sepadan = 110° (sama).",
      "Transversal cuts two parallel lines. Angle = 110°. Find alternate and corresponding angles.",
      "Alternate angle = 110° (equal). Corresponding angle = 110° (equal).",
    ),
  ],
};


const legacy=(["concepts","operations","facts","practice"] as const).flatMap(category=>LEGACY_C8_PAIRS[category].map((entry,index)=>({entry,id:(lang:"bm"|"dlp")=>`math-f1-c8-${lang}-${category}-${index+1}`})));
export const C8_CHALLENGES=[
  {
    "subtopic": "8.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Two angles on a straight line are (3x + 10)° and (2x + 20)°.",
      "parts": [
        "Form an equation.",
        "Find x.",
        "Find both angles."
      ],
      "answer": [
        [
          "5x + 30 = 180."
        ],
        [
          "x = 30."
        ],
        [
          "100° and 80°."
        ]
      ]
    },
    "bm": {
      "prompt": "Dua sudut pada garis lurus ialah (3x + 10)° dan (2x + 20)°.",
      "parts": [
        "Bina persamaan.",
        "Cari x.",
        "Cari kedua-dua sudut."
      ],
      "answer": [
        [
          "5x + 30 = 180."
        ],
        [
          "x = 30."
        ],
        [
          "100° and 80°."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Angles around a point measure 85°, 120°, 70° and y°.",
      "parts": [
        "Write the angle sum.",
        "Find y.",
        "Classify y."
      ],
      "answer": [
        [
          "85 + 120 + 70 + y = 360."
        ],
        [
          "y = 85°."
        ],
        [
          "Acute / tirus."
        ]
      ]
    },
    "bm": {
      "prompt": "Sudut pada satu titik ialah 85°, 120°, 70° dan y°.",
      "parts": [
        "Tulis jumlah sudut.",
        "Cari y.",
        "Kelaskan y."
      ],
      "answer": [
        [
          "85 + 120 + 70 + y = 360."
        ],
        [
          "y = 85°."
        ],
        [
          "Acute / tirus."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Two vertically opposite angles are (4x − 5)° and (2x + 35)°.",
      "parts": [
        "Form an equation.",
        "Find x.",
        "Find the angle."
      ],
      "answer": [
        [
          "4x − 5 = 2x + 35."
        ],
        [
          "x = 20."
        ],
        [
          "75°."
        ]
      ]
    },
    "bm": {
      "prompt": "Dua sudut bertentangan bucu ialah (4x − 5)° dan (2x + 35)°.",
      "parts": [
        "Bina persamaan.",
        "Cari x.",
        "Cari sudut."
      ],
      "answer": [
        [
          "4x − 5 = 2x + 35."
        ],
        [
          "x = 20."
        ],
        [
          "75°."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "Adjacent supplementary angles have ratio 2:3.",
      "parts": [
        "Find the total ratio parts.",
        "Calculate the smaller angle.",
        "Calculate the larger angle."
      ],
      "answer": [
        [
          "2 + 3 = 5."
        ],
        [
          "180 × 2/5 = 72°."
        ],
        [
          "180 × 3/5 = 108°."
        ]
      ]
    },
    "bm": {
      "prompt": "Sudut bersebelahan pelengkap 180° mempunyai nisbah 2:3.",
      "parts": [
        "Cari jumlah bahagian nisbah.",
        "Hitung sudut kecil.",
        "Hitung sudut besar."
      ],
      "answer": [
        [
          "2 + 3 = 5."
        ],
        [
          "180 × 2/5 = 72°."
        ],
        [
          "180 × 3/5 = 108°."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "An angle is 25° greater than its complement.",
      "parts": [
        "Form an equation using x.",
        "Find x.",
        "Find its complement."
      ],
      "answer": [
        [
          "x + (x − 25) = 90."
        ],
        [
          "x = 57.5°."
        ],
        [
          "32.5°."
        ]
      ]
    },
    "bm": {
      "prompt": "Suatu sudut 25° lebih besar daripada pelengkap 90° baginya.",
      "parts": [
        "Bina persamaan menggunakan x.",
        "Cari x.",
        "Cari pelengkap 90°."
      ],
      "answer": [
        [
          "x + (x − 25) = 90."
        ],
        [
          "x = 57.5°."
        ],
        [
          "32.5°."
        ]
      ]
    }
  },
  {
    "subtopic": "8.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A clock shows 3:30.",
      "parts": [
        "Find the minute-hand position from 12.",
        "Find the hour-hand position from 12.",
        "Find the smaller angle between hands."
      ],
      "answer": [
        [
          "180°."
        ],
        [
          "3.5 × 30° = 105°."
        ],
        [
          "180° − 105° = 75°."
        ]
      ]
    },
    "bm": {
      "prompt": "Jam menunjukkan 3:30.",
      "parts": [
        "Cari kedudukan jarum minit dari 12.",
        "Cari kedudukan jarum jam dari 12.",
        "Cari sudut kecil antara jarum."
      ],
      "answer": [
        [
          "180°."
        ],
        [
          "3.5 × 30° = 105°."
        ],
        [
          "180° − 105° = 75°."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Two parallel lines are cut by a transversal. One corresponding angle is 68°.",
      "parts": [
        "Find its corresponding angle.",
        "Find the adjacent supplementary angle.",
        "Find the vertically opposite angle to 68°."
      ],
      "answer": [
        [
          "68°."
        ],
        [
          "180° − 68° = 112°."
        ],
        [
          "68°."
        ]
      ]
    },
    "bm": {
      "prompt": "Dua garis selari dipotong garis rentas lintang. Satu sudut sepadan ialah 68°.",
      "parts": [
        "Cari sudut sepadan.",
        "Cari sudut bersebelahan pelengkap 180°.",
        "Cari sudut bertentangan bucu dengan 68°."
      ],
      "answer": [
        [
          "68°."
        ],
        [
          "180° − 68° = 112°."
        ],
        [
          "68°."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Parallel lines are cut by a transversal. Alternate interior angles are (5x − 10)° and (3x + 30)°.",
      "parts": [
        "Write an equation.",
        "Find x.",
        "Find the angle size."
      ],
      "answer": [
        [
          "5x − 10 = 3x + 30."
        ],
        [
          "x = 20."
        ],
        [
          "90°."
        ]
      ]
    },
    "bm": {
      "prompt": "Garis selari dipotong garis rentas lintang. Sudut pedalaman berselang-seli ialah (5x − 10)° dan (3x + 30)°.",
      "parts": [
        "Tulis persamaan.",
        "Cari x.",
        "Cari saiz sudut."
      ],
      "answer": [
        [
          "5x − 10 = 3x + 30."
        ],
        [
          "x = 20."
        ],
        [
          "90°."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Co-interior angles between parallel lines are (2x + 40)° and (3x − 10)°.",
      "parts": [
        "Write their sum.",
        "Find x.",
        "Find both angles."
      ],
      "answer": [
        [
          "5x + 30 = 180."
        ],
        [
          "x = 30."
        ],
        [
          "100° and 80°."
        ]
      ]
    },
    "bm": {
      "prompt": "Sudut pedalaman sepihak antara garis selari ialah (2x + 40)° dan (3x − 10)°.",
      "parts": [
        "Tulis jumlah sudut.",
        "Cari x.",
        "Cari kedua-dua sudut."
      ],
      "answer": [
        [
          "5x + 30 = 180."
        ],
        [
          "x = 30."
        ],
        [
          "100° and 80°."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "Two lines cross. One angle is 127°.",
      "parts": [
        "Find the vertically opposite angle.",
        "Find either adjacent angle.",
        "Check the full turn sum."
      ],
      "answer": [
        [
          "127°."
        ],
        [
          "180 − 127 = 53°."
        ],
        [
          "127 + 53 + 127 + 53 = 360°."
        ]
      ]
    },
    "bm": {
      "prompt": "Dua garis bersilang. Satu sudut ialah 127°.",
      "parts": [
        "Cari sudut bertentangan bucu.",
        "Cari salah satu sudut bersebelahan.",
        "Semak jumlah satu pusingan."
      ],
      "answer": [
        [
          "127°."
        ],
        [
          "180 − 127 = 53°."
        ],
        [
          "127 + 53 + 127 + 53 = 360°."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A transversal intersects two parallel lines. One acute angle is 42°.",
      "parts": [
        "Find another acute angle.",
        "Find an obtuse angle.",
        "Find the difference between them."
      ],
      "answer": [
        [
          "42°."
        ],
        [
          "180° − 42° = 138°."
        ],
        [
          "138 − 42 = 96°."
        ]
      ]
    },
    "bm": {
      "prompt": "Garis rentas lintang memotong dua garis selari. Satu sudut tirus ialah 42°.",
      "parts": [
        "Cari satu lagi sudut tirus.",
        "Cari sudut cakah.",
        "Cari beza kedua-dua sudut."
      ],
      "answer": [
        [
          "42°."
        ],
        [
          "180° − 42° = 138°."
        ],
        [
          "138 − 42 = 96°."
        ]
      ]
    }
  },
  {
    "subtopic": "8.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "At an intersection, one angle is (6x + 4)° and its adjacent angle is (4x + 16)°.",
      "parts": [
        "Form an equation.",
        "Find x.",
        "Find the larger angle."
      ],
      "answer": [
        [
          "10x + 20 = 180."
        ],
        [
          "x = 16."
        ],
        [
          "6(16) + 4 = 100°."
        ]
      ]
    },
    "bm": {
      "prompt": "Pada persilangan, satu sudut (6x + 4)° dan sudut bersebelahannya (4x + 16)°.",
      "parts": [
        "Bina persamaan.",
        "Cari x.",
        "Cari sudut lebih besar."
      ],
      "answer": [
        [
          "10x + 20 = 180."
        ],
        [
          "x = 16."
        ],
        [
          "6(16) + 4 = 100°."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A triangle has interior angles 2x°, 3x° and 4x°.",
      "parts": [
        "Find x.",
        "Find the largest interior angle.",
        "Classify the triangle by angles."
      ],
      "answer": [
        [
          "9x = 180; x = 20."
        ],
        [
          "4x = 80°."
        ],
        [
          "Acute-angled / bersudut tirus."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga mempunyai sudut pedalaman 2x°, 3x° dan 4x°.",
      "parts": [
        "Cari x.",
        "Cari sudut pedalaman terbesar.",
        "Kelaskan segi tiga mengikut sudut."
      ],
      "answer": [
        [
          "9x = 180; x = 20."
        ],
        [
          "4x = 80°."
        ],
        [
          "Acute-angled / bersudut tirus."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "An isosceles triangle has vertex angle 44°.",
      "parts": [
        "Find the sum of its base angles.",
        "Find each base angle.",
        "Find one exterior angle at the base."
      ],
      "answer": [
        [
          "180 − 44 = 136°."
        ],
        [
          "136 ÷ 2 = 68°."
        ],
        [
          "180 − 68 = 112°."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga sama kaki mempunyai sudut puncak 44°.",
      "parts": [
        "Cari jumlah sudut tapak.",
        "Cari setiap sudut tapak.",
        "Cari sudut peluaran pada tapak."
      ],
      "answer": [
        [
          "180 − 44 = 136°."
        ],
        [
          "136 ÷ 2 = 68°."
        ],
        [
          "180 − 68 = 112°."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A quadrilateral has angles 85°, 110°, 95° and z°.",
      "parts": [
        "Write the interior angle sum.",
        "Find z.",
        "Is z acute, right or obtuse?"
      ],
      "answer": [
        [
          "360°."
        ],
        [
          "z = 360 − 290 = 70°."
        ],
        [
          "Acute / tirus."
        ]
      ]
    },
    "bm": {
      "prompt": "Sisi empat mempunyai sudut 85°, 110°, 95° dan z°.",
      "parts": [
        "Tulis jumlah sudut pedalaman.",
        "Cari z.",
        "Adakah z tirus, tegak atau cakah?"
      ],
      "answer": [
        [
          "360°."
        ],
        [
          "z = 360 − 290 = 70°."
        ],
        [
          "Acute / tirus."
        ]
      ]
    }
  },
  {
    "subtopic": "8.3",
    "mode": "challenge",
    "dlp": {
      "prompt": "A triangle has two interior angles of 48° and 67°.",
      "parts": [
        "Find the third angle.",
        "Find the exterior angle next to the third angle.",
        "Check using the exterior angle theorem."
      ],
      "answer": [
        [
          "180 − 48 − 67 = 65°."
        ],
        [
          "180 − 65 = 115°."
        ],
        [
          "48 + 67 = 115°."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga mempunyai dua sudut pedalaman 48° dan 67°.",
      "parts": [
        "Cari sudut ketiga.",
        "Cari sudut peluaran bersebelahan sudut ketiga.",
        "Semak dengan teorem sudut peluaran."
      ],
      "answer": [
        [
          "180 − 48 − 67 = 65°."
        ],
        [
          "180 − 65 = 115°."
        ],
        [
          "48 + 67 = 115°."
        ]
      ]
    }
  }
];
export function buildMathF1C8Flashcards(lang:"bm"|"dlp"):Flashcard[]{
 if(legacy.length!==63||C8_CHALLENGES.length!==16)throw new Error("Chapter 8 card count invariant failed");
 return legacy.map(({entry,id},index)=>{
  const mode=index<12?"concept":index<47?"practice":"challenge";
  const challenge=mode==="challenge"?C8_CHALLENGES[index-47]:null;
  const structured:StructuredFlashcard=challenge?{...challenge[lang]}:{prompt:entry[lang][0],answer:[[entry[lang][1]]]};
  return {id:id(lang),subjectId:"math",form:"Form 1",chapter:"Chapter 8",lang,front:structuredFront(structured),back:structuredBack(structured),subtopic:challenge?.subtopic??(index<25?"8.1":index<45?"8.2":"8.3"),reviewMode:mode,structured};
 });
}
