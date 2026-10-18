import type { Flashcard } from "@/data/content";
import { structuredFront, structuredBack, type StructuredFlashcard } from "@/features/flashcards/structuredFlashcard";
const mathCard = (bmFront:string,bmBack:string,dlpFront:string,dlpBack:string)=>({bm:[bmFront,bmBack] as [string,string],dlp:[dlpFront,dlpBack] as [string,string]});
const LEGACY_C10_PAIRS = {
  concepts: [
    mathCard(
      "Apakah perimeter?",
      "Perimeter ialah jumlah panjang kesemua sisi luar sesuatu bentuk rata. Ia mengukur panjang sempadan bentuk tersebut.",
      "What is perimeter?",
      "Perimeter is the total length of all outer sides of a flat shape. It measures the length of the boundary.",
    ),
    mathCard(
      "Apakah luas?",
      "Luas ialah jumlah ruang di dalam sempadan sesuatu bentuk rata (2D). Ia mengukur kawasan yang diliputi bentuk tersebut.",
      "What is area?",
      "Area is the amount of space inside the boundary of a flat (2D) shape. It measures the region covered by the shape.",
    ),
    mathCard(
      "Apakah perbezaan antara perimeter dan luas?",
      "Perimeter: panjang sempadan (unit: cm, m). Luas: kawasan dalaman (unit: cm², m²). Kedua-duanya boleh berbeza walaupun untuk bentuk yang kelihatan serupa.",
      "What is the difference between perimeter and area?",
      "Perimeter: length of boundary (units: cm, m). Area: inner region (units: cm², m²). Both can differ even for shapes that look similar.",
    ),
    mathCard(
      "Dalam unit apakah perimeter diukur?",
      "Perimeter diukur dalam unit panjang satu dimensi: cm, m, mm, km.",
      "In what units is perimeter measured?",
      "Perimeter is measured in one-dimensional length units: cm, m, mm, km.",
    ),
    mathCard(
      "Dalam unit apakah luas diukur?",
      "Luas diukur dalam unit persegi (dua dimensi): cm², m², km².",
      "In what units is area measured?",
      "Area is measured in square units (two-dimensional): cm², m², km².",
    ),
    mathCard(
      "Apakah bentuk komposit?",
      "Bentuk komposit ialah bentuk yang terbentuk daripada gabungan dua atau lebih bentuk mudah seperti segi tiga, segi empat tepat, atau trapezium.",
      "What is a composite shape?",
      "A composite shape is a shape formed by combining two or more simple shapes such as triangles, rectangles, or trapeziums.",
    ),
    mathCard(
      "Apakah yang dimaksudkan dengan tinggi berserenjang?",
      "Tinggi berserenjang ialah jarak yang diukur pada sudut tegak (90°) kepada tapak. Ini adalah tinggi BETUL untuk semua formula luas.",
      "What is meant by perpendicular height?",
      "Perpendicular height is the distance measured at a right angle (90°) to the base. This is the CORRECT height for all area formulas.",
    ),
    mathCard(
      "Bolehkah dua bentuk mempunyai perimeter yang sama tetapi luas berbeza?",
      "Ya. Contoh: Segi empat tepat 8×2 (perimeter 20 cm, luas 16 cm²) dan 5×5 (perimeter 20 cm, luas 25 cm²).",
      "Can two shapes have the same perimeter but different areas?",
      "Yes. Example: Rectangle 8×2 (perimeter 20 cm, area 16 cm²) and 5×5 (perimeter 20 cm, area 25 cm²).",
    ),
    mathCard(
      "Apakah kaedah grid untuk menganggar luas?",
      "Lukis bentuk di atas kertas grid. Kira petak penuh = 1. Petak lebih separuh = 1. Petak kurang separuh = 0. Jumlahkan semua.",
      "What is the grid method for estimating area?",
      "Draw the shape on grid paper. Count full squares = 1. Squares more than half inside = 1. Squares less than half inside = 0. Add all counts.",
    ),
    mathCard(
      "Apakah hubungan antara 1 m² dan cm²?",
      "1 m² = 10 000 cm². Ini kerana 1 m = 100 cm, dan 100 × 100 = 10 000.",
      "What is the relationship between 1 m² and cm²?",
      "1 m² = 10 000 cm². This is because 1 m = 100 cm, and 100 × 100 = 10 000.",
    ),
    mathCard(
      "Apakah sisi selari trapezium dalam formula luas?",
      "Dua sisi yang SELARI antara satu sama lain, dilabelkan 'a' dan 'b'. Bukan semua sisi — hanya dua sisi yang selari.",
      "What are the parallel sides of a trapezium in the area formula?",
      "The two sides that are PARALLEL to each other, labelled 'a' and 'b'. Not all sides — only the two parallel sides.",
    ),
    mathCard(
      "Apakah pepenjuru lelayang dalam formula luas?",
      "d₁ dan d₂ ialah dua garisan yang menyilang di dalam lelayang pada sudut tegak (90°). Formula luas = ½ × d₁ × d₂.",
      "What are the diagonals of a kite in the area formula?",
      "d₁ and d₂ are the two lines crossing inside the kite at right angles (90°). Area formula = ½ × d₁ × d₂.",
    ),
    mathCard(
      "Apakah strategi dua kaedah untuk mengira luas bentuk komposit?",
      "1) TAMBAH: Bahagikan kepada bentuk mudah, kira luas setiap satu, tambahkan. 2) TOLAK: Mulakan dengan bentuk besar, tolak luas bahagian yang tidak diperlukan.",
      "What are the two strategies for finding the area of composite shapes?",
      "1) ADD: Split into simple shapes, calculate each area, add them. 2) SUBTRACT: Start with a large shape, subtract the unwanted areas.",
    ),
    mathCard(
      "Apakah yang berlaku kepada perimeter apabila luas tetap tetapi dimensi segi empat tepat diubah?",
      "Perimeter BERTAMBAH apabila dimensi menjadi semakin berbeza. Perimeter terkecil berlaku apabila bentuk adalah segi empat sama.",
      "What happens to perimeter when area is fixed but rectangle dimensions change?",
      "Perimeter INCREASES as dimensions become more different. Minimum perimeter occurs when the shape is a square.",
    ),
    mathCard(
      "Apakah yang berlaku kepada luas apabila perimeter tetap tetapi dimensi segi empat tepat diubah?",
      "Luas BERKURANG apabila dimensi menjadi semakin berbeza. Luas terbesar berlaku apabila bentuk adalah segi empat sama.",
      "What happens to area when perimeter is fixed but rectangle dimensions change?",
      "Area DECREASES as dimensions become more different. Maximum area occurs when the shape is a square.",
    ),
  ],
  operations: [
    mathCard(
      "Apakah formula perimeter segi empat tepat?",
      "Perimeter = 2(p + l) atau Perimeter = 2p + 2l. Di mana p = panjang dan l = lebar.",
      "What is the formula for the perimeter of a rectangle?",
      "Perimeter = 2(l + w) or Perimeter = 2l + 2w. Where l = length and w = width.",
    ),
    mathCard(
      "Apakah formula perimeter segi empat sama?",
      "Perimeter = 4s. Di mana s = panjang sisi.",
      "What is the formula for the perimeter of a square?",
      "Perimeter = 4s. Where s = side length.",
    ),
    mathCard(
      "Apakah formula luas segi tiga?",
      "Luas = ½ × tapak × tinggi. Pastikan tinggi adalah berserenjang dengan tapak.",
      "What is the formula for the area of a triangle?",
      "Area = ½ × base × height. Make sure the height is perpendicular to the base.",
    ),
    mathCard(
      "Apakah formula luas segi empat selari?",
      "Luas = tapak × tinggi. Di mana tinggi adalah jarak berserenjang antara dua sisi selari.",
      "What is the formula for the area of a parallelogram?",
      "Area = base × height. Where height is the perpendicular distance between the two parallel sides.",
    ),
    mathCard(
      "Apakah formula luas trapezium?",
      "Luas = ½ × (a + b) × tinggi. Di mana a dan b ialah sisi selari, dan tinggi adalah jarak berserenjang antara keduanya.",
      "What is the formula for the area of a trapezium?",
      "Area = ½ × (a + b) × height. Where a and b are the parallel sides, and height is the perpendicular distance between them.",
    ),
    mathCard(
      "Apakah formula luas lelayang?",
      "Luas = ½ × d₁ × d₂. Di mana d₁ dan d₂ ialah dua pepenjuru lelayang.",
      "What is the formula for the area of a kite?",
      "Area = ½ × d₁ × d₂. Where d₁ and d₂ are the two diagonals of the kite.",
    ),
    mathCard(
      "Segi empat tepat panjang 9 cm, lebar 4 cm. Kira perimeter.",
      "Perimeter = 2(9 + 4) = 2(13) = 26 cm.",
      "Rectangle 9 cm long, 4 cm wide. Calculate the perimeter.",
      "Perimeter = 2(9 + 4) = 2(13) = 26 cm.",
    ),
    mathCard(
      "Segi tiga dengan tapak 12 cm dan tinggi 5 cm. Kira luas.",
      "Luas = ½ × 12 × 5 = ½ × 60 = 30 cm².",
      "Triangle with base 12 cm and height 5 cm. Calculate the area.",
      "Area = ½ × 12 × 5 = ½ × 60 = 30 cm².",
    ),
    mathCard(
      "Jajaran genjang dengan tapak 8 cm dan tinggi 6 cm (sisi condong 7 cm). Kira luas.",
      "Luas = tapak × tinggi = 8 × 6 = 48 cm². Gunakan 6 cm (tinggi berserenjang), BUKAN 7 cm (sisi condong).",
      "Parallelogram with base 8 cm and height 6 cm (slant side 7 cm). Calculate the area.",
      "Area = base × height = 8 × 6 = 48 cm². Use 6 cm (perpendicular height), NOT 7 cm (slant side).",
    ),
    mathCard(
      "Trapezium dengan sisi selari 9 cm dan 5 cm, tinggi 4 cm. Kira luas.",
      "Luas = ½ × (9 + 5) × 4 = ½ × 14 × 4 = ½ × 56 = 28 cm².",
      "Trapezium with parallel sides 9 cm and 5 cm, height 4 cm. Calculate the area.",
      "Area = ½ × (9 + 5) × 4 = ½ × 14 × 4 = ½ × 56 = 28 cm².",
    ),
    mathCard(
      "Lelayang dengan pepenjuru 12 cm dan 7 cm. Kira luas.",
      "Luas = ½ × 12 × 7 = ½ × 84 = 42 cm².",
      "Kite with diagonals 12 cm and 7 cm. Calculate the area.",
      "Area = ½ × 12 × 7 = ½ × 84 = 42 cm².",
    ),
    mathCard(
      "Segi tiga: luas = 36 cm², tinggi = 9 cm. Cari tapak.",
      "Luas = ½ × tapak × tinggi. 36 = ½ × tapak × 9. 36 = 4.5 × tapak. Tapak = 36 ÷ 4.5 = 8 cm.",
      "Triangle: area = 36 cm², height = 9 cm. Find the base.",
      "Area = ½ × base × height. 36 = ½ × base × 9. 36 = 4.5 × base. Base = 36 ÷ 4.5 = 8 cm.",
    ),
    mathCard(
      "Trapezium: luas = 60 cm², sisi selari = 8 cm dan 12 cm. Cari tinggi.",
      "60 = ½ × (8 + 12) × tinggi. 60 = ½ × 20 × tinggi. 60 = 10 × tinggi. Tinggi = 6 cm.",
      "Trapezium: area = 60 cm², parallel sides = 8 cm and 12 cm. Find the height.",
      "60 = ½ × (8 + 12) × height. 60 = ½ × 20 × height. 60 = 10 × height. Height = 6 cm.",
    ),
    mathCard(
      "Tukarkan 2.5 m² kepada cm².",
      "2.5 m² = 2.5 × 10 000 = 25 000 cm².",
      "Convert 2.5 m² to cm².",
      "2.5 m² = 2.5 × 10 000 = 25 000 cm².",
    ),
    mathCard(
      "Tukarkan 80 000 cm² kepada m².",
      "80 000 cm² ÷ 10 000 = 8 m².",
      "Convert 80 000 cm² to m².",
      "80 000 cm² ÷ 10 000 = 8 m².",
    ),
    mathCard(
      "Bentuk L: segi empat tepat besar 10 × 6 cm, segi empat tepat kecil 4 × 3 cm (ditambah). Kira jumlah luas.",
      "Luas = (10 × 6) + (4 × 3) = 60 + 12 = 72 cm².",
      "L-shape: large rectangle 10 × 6 cm, small rectangle 4 × 3 cm (added). Calculate total area.",
      "Area = (10 × 6) + (4 × 3) = 60 + 12 = 72 cm².",
    ),
    mathCard(
      "Segi empat tepat 10 × 8 cm dengan lubang segi empat 2 × 3 cm. Kira luas baki.",
      "Luas baki = (10 × 8) − (2 × 3) = 80 − 6 = 74 cm².",
      "Rectangle 10 × 8 cm with a 2 × 3 cm rectangular hole. Calculate the remaining area.",
      "Remaining area = (10 × 8) − (2 × 3) = 80 − 6 = 74 cm².",
    ),
  ],
  facts: [
    mathCard(
      "Nyatakan semua formula luas yang perlu diingati.",
      "Segi tiga: ½bh. Segi empat selari: bh. Trapezium: ½(a+b)h. Lelayang: ½d₁d₂. Segi empat tepat: p×l. Segi empat sama: s².",
      "State all area formulas to remember.",
      "Triangle: ½bh. Parallelogram: bh. Trapezium: ½(a+b)h. Kite: ½d₁d₂. Rectangle: l×w. Square: s².",
    ),
    mathCard(
      "Mengapa formula luas segi tiga menggunakan ½?",
      "Kerana setiap segi tiga adalah separuh daripada segi empat selari yang mempunyai tapak dan tinggi yang sama.",
      "Why does the triangle area formula use ½?",
      "Because every triangle is half of a parallelogram with the same base and height.",
    ),
    mathCard(
      "Mengapa formula luas trapezium menggunakan ½(a+b)?",
      "Kerana dua trapezium yang sama digabungkan membentuk segi empat selari dengan tapak (a+b). Luas satu trapezium = separuh luas segi empat selari itu.",
      "Why does the trapezium area formula use ½(a+b)?",
      "Because two identical trapeziums combine to form a parallelogram with base (a+b). Area of one trapezium = half the area of that parallelogram.",
    ),
    mathCard(
      "Mengapa formula luas lelayang menggunakan ½d₁d₂?",
      "Kerana lelayang menempati separuh kawasan segi empat tepat yang mempunyai panjang d₁ dan lebar d₂.",
      "Why does the kite area formula use ½d₁d₂?",
      "Because a kite occupies half the area of a rectangle with length d₁ and width d₂.",
    ),
    mathCard(
      "Apakah formula luas juga digunakan untuk belah ketupat?",
      "Ya. Luas belah ketupat = ½ × d₁ × d₂, iaitu formula yang sama dengan lelayang, kerana pepenjuru belah ketupat juga berserenjang.",
      "Which area formula also applies to a rhombus?",
      "Yes. Area of rhombus = ½ × d₁ × d₂, the same formula as a kite, because a rhombus's diagonals are also perpendicular.",
    ),
    mathCard(
      "Apakah fakta kunci: perimeter tetap vs luas tetap?",
      "Perimeter tetap → luas TERBESAR = segi empat sama. Luas tetap → perimeter TERKECIL = segi empat sama.",
      "What is the key fact about fixed perimeter vs fixed area?",
      "Fixed perimeter → LARGEST area = square. Fixed area → SMALLEST perimeter = square.",
    ),
    mathCard(
      "Nyatakan peraturan anggaran grid.",
      "Petak penuh di dalam = kira sebagai 1. Lebih separuh di dalam = kira sebagai 1. Kurang separuh di dalam = kira sebagai 0. Luar bentuk = tidak dikira.",
      "State the grid estimation rules.",
      "Full square inside = count as 1. More than half inside = count as 1. Less than half inside = count as 0. Outside shape = not counted.",
    ),
    mathCard(
      "Berapakah 1 m² dalam cm²?",
      "1 m² = 10 000 cm². (Kerana 1 m = 100 cm, maka 1 m² = 100 cm × 100 cm = 10 000 cm²)",
      "How many cm² is 1 m²?",
      "1 m² = 10 000 cm². (Because 1 m = 100 cm, so 1 m² = 100 cm × 100 cm = 10 000 cm²)",
    ),
    mathCard(
      "Apakah unit luas yang digunakan untuk bilik / bangunan?",
      "m² (meter persegi) digunakan untuk bilik, bangunan, dan kawasan bersaiz sederhana.",
      "What area unit is used for rooms / buildings?",
      "m² (square metres) is used for rooms, buildings and medium-sized areas.",
    ),
    mathCard(
      "Apakah unit luas yang digunakan untuk objek kecil seperti buku?",
      "cm² (sentimeter persegi) digunakan untuk objek kecil seperti buku, meja, dan kertas.",
      "What area unit is used for small objects like books?",
      "cm² (square centimetres) is used for small objects like books, tables and paper.",
    ),
    mathCard(
      "Apakah petua untuk tidak silap dalam soalan segi empat selari?",
      "Jangan gunakan sisi condong sebagai tinggi. Tinggi MESTI berserenjang (90°) dengan tapak.",
      "What is the tip to avoid mistakes in parallelogram questions?",
      "Do not use the slant side as the height. Height MUST be perpendicular (90°) to the base.",
    ),
    mathCard(
      "Apakah petua untuk tidak silap dalam soalan trapezium?",
      "Gunakan HANYA dua sisi yang SELARI (a dan b). Jangan tambahkan semua empat sisi dalam formula.",
      "What is the tip to avoid mistakes in trapezium questions?",
      "Use ONLY the two PARALLEL sides (a and b). Do not add all four sides into the formula.",
    ),
    mathCard(
      "Berikan contoh nyata penggunaan perimeter.",
      "Memasang pagar, membuat bingkai gambar, mengukur sempadan tanah, mengecat pinggiran.",
      "Give a real example of perimeter use.",
      "Installing fencing, making picture frames, measuring land boundaries, painting edges.",
    ),
    mathCard(
      "Berikan contoh nyata penggunaan luas.",
      "Membeli jubin lantai, mengira cat dinding, penanaman ladang, mereka bentuk taman.",
      "Give a real example of area use.",
      "Buying floor tiles, calculating wall paint, planting fields, designing gardens.",
    ),
  ],
  practice: [
    mathCard(
      "Segi empat sama berisi 7 cm. Kira perimeter dan luas.",
      "Perimeter = 4 × 7 = 28 cm. Luas = 7² = 49 cm².",
      "Square with side 7 cm. Calculate the perimeter and area.",
      "Perimeter = 4 × 7 = 28 cm. Area = 7² = 49 cm².",
    ),
    mathCard(
      "Segi empat tepat 11 cm × 5 cm. Kira perimeter dan luas.",
      "Perimeter = 2(11 + 5) = 32 cm. Luas = 11 × 5 = 55 cm².",
      "Rectangle 11 cm × 5 cm. Calculate perimeter and area.",
      "Perimeter = 2(11 + 5) = 32 cm. Area = 11 × 5 = 55 cm².",
    ),
    mathCard(
      "Segi tiga dengan tapak 14 cm dan tinggi 8 cm. Kira luas.",
      "Luas = ½ × 14 × 8 = ½ × 112 = 56 cm².",
      "Triangle with base 14 cm and height 8 cm. Calculate the area.",
      "Area = ½ × 14 × 8 = ½ × 112 = 56 cm².",
    ),
    mathCard(
      "Trapezium dengan sisi selari 15 cm dan 9 cm, tinggi 6 cm. Kira luas.",
      "Luas = ½ × (15 + 9) × 6 = ½ × 24 × 6 = ½ × 144 = 72 cm².",
      "Trapezium with parallel sides 15 cm and 9 cm, height 6 cm. Calculate the area.",
      "Area = ½ × (15 + 9) × 6 = ½ × 24 × 6 = ½ × 144 = 72 cm².",
    ),
    mathCard(
      "Lelayang dengan pepenjuru 16 cm dan 9 cm. Kira luas.",
      "Luas = ½ × 16 × 9 = ½ × 144 = 72 cm².",
      "Kite with diagonals 16 cm and 9 cm. Calculate the area.",
      "Area = ½ × 16 × 9 = ½ × 144 = 72 cm².",
    ),
    mathCard(
      "Taman berbentuk segi empat tepat 25 m × 18 m. Berapa meter pagar diperlukan?",
      "Pagar = perimeter = 2(25 + 18) = 2(43) = 86 m.",
      "Rectangular garden 25 m × 18 m. How many metres of fencing are needed?",
      "Fencing = perimeter = 2(25 + 18) = 2(43) = 86 m.",
    ),
    mathCard(
      "Lelayang: luas = 54 cm², satu pepenjuru = 12 cm. Cari pepenjuru yang lain.",
      "54 = ½ × 12 × d₂. 54 = 6d₂. d₂ = 9 cm.",
      "Kite: area = 54 cm², one diagonal = 12 cm. Find the other diagonal.",
      "54 = ½ × 12 × d₂. 54 = 6d₂. d₂ = 9 cm.",
    ),
    mathCard(
      "Segi tiga: luas = 30 cm², tapak = 10 cm. Cari tinggi.",
      "30 = ½ × 10 × tinggi. 30 = 5 × tinggi. Tinggi = 6 cm.",
      "Triangle: area = 30 cm², base = 10 cm. Find the height.",
      "30 = ½ × 10 × height. 30 = 5 × height. Height = 6 cm.",
    ),
    mathCard(
      "Segi empat tepat 5 m × 4 m. Jubin 50 cm × 50 cm. Berapa jubin diperlukan?",
      "Luas bilik = 5 × 4 = 20 m². Luas jubin = 0.5 × 0.5 = 0.25 m². Bilangan = 20 ÷ 0.25 = 80 jubin.",
      "Rectangle 5 m × 4 m. Tiles 50 cm × 50 cm. How many tiles are needed?",
      "Room area = 5 × 4 = 20 m². Tile area = 0.5 × 0.5 = 0.25 m². Number = 20 ÷ 0.25 = 80 tiles.",
    ),
    mathCard(
      "Bentuk L: segi empat tepat besar 8 × 5 = 40 cm², segi empat tepat kecil 3 × 2 = 6 cm². Apakah luas jumlah?",
      "Jumlah luas = 40 + 6 = 46 cm².",
      "L-shape: large rectangle 8 × 5 = 40 cm², small rectangle 3 × 2 = 6 cm². What is the total area?",
      "Total area = 40 + 6 = 46 cm².",
    ),
    mathCard(
      "Perimeter segi empat tepat = 36 cm. Panjang = 11 cm. Cari lebar.",
      "2(11 + l) = 36. 11 + l = 18. l = 7 cm.",
      "Perimeter of rectangle = 36 cm. Length = 11 cm. Find the width.",
      "2(11 + w) = 36. 11 + w = 18. w = 7 cm.",
    ),
    mathCard(
      "Apakah dimensi segi empat sama yang memberikan luas terbesar jika perimeter = 20 cm?",
      "Sisi segi empat sama = 20 ÷ 4 = 5 cm. Luas = 5 × 5 = 25 cm².",
      "What square dimensions give the largest area if perimeter = 20 cm?",
      "Square side = 20 ÷ 4 = 5 cm. Area = 5 × 5 = 25 cm².",
    ),
    mathCard(
      "Jajaran genjang: luas = 72 cm², tapak = 9 cm. Cari tinggi.",
      "72 = 9 × tinggi. Tinggi = 72 ÷ 9 = 8 cm.",
      "Parallelogram: area = 72 cm², base = 9 cm. Find the height.",
      "72 = 9 × height. Height = 72 ÷ 9 = 8 cm.",
    ),
  ],
};


const legacyCards = (["concepts","operations","facts","practice"] as const).flatMap(category=>LEGACY_C10_PAIRS[category].map((entry,index)=>({entry,id:(lang:"bm"|"dlp")=>`math-f1-c10-${lang}-${category}-${index+1}`})));
export const C10_CHALLENGES=[
  {
    "subtopic": "10.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rectangle is 14 cm long and 9 cm wide.",
      "parts": [
        "Find its perimeter.",
        "Find its area.",
        "If its length increases by 3 cm, find the new area."
      ],
      "answer": [
        [
          "2(14 + 9) = 46 cm."
        ],
        [
          "14 × 9 = 126 cm²."
        ],
        [
          "17 × 9 = 153 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi empat tepat panjang 14 cm dan lebar 9 cm.",
      "parts": [
        "Cari perimeter.",
        "Cari luas.",
        "Jika panjang bertambah 3 cm, cari luas baharu."
      ],
      "answer": [
        [
          "2(14 + 9) = 46 cm."
        ],
        [
          "14 × 9 = 126 cm²."
        ],
        [
          "17 × 9 = 153 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A square has a perimeter of 52 cm.",
      "parts": [
        "Find its side length.",
        "Find its area.",
        "Find its new perimeter if each side increases by 2 cm."
      ],
      "answer": [
        [
          "52 ÷ 4 = 13 cm."
        ],
        [
          "13² = 169 cm²."
        ],
        [
          "4 × 15 = 60 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi empat sama berperimeter 52 cm.",
      "parts": [
        "Cari panjang sisi.",
        "Cari luas.",
        "Cari perimeter baharu jika sisi bertambah 2 cm."
      ],
      "answer": [
        [
          "52 ÷ 4 = 13 cm."
        ],
        [
          "13² = 169 cm²."
        ],
        [
          "4 × 15 = 60 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A triangle has base 16 cm and perpendicular height 9 cm.",
      "parts": [
        "Write the area formula.",
        "Calculate its area.",
        "Find its new area if the height doubles."
      ],
      "answer": [
        [
          "A = ½ × base × height."
        ],
        [
          "½ × 16 × 9 = 72 cm²."
        ],
        [
          "½ × 16 × 18 = 144 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga mempunyai tapak 16 cm dan tinggi serenjang 9 cm.",
      "parts": [
        "Tulis rumus luas.",
        "Hitung luas.",
        "Cari luas baharu jika tinggi digandakan."
      ],
      "answer": [
        [
          "A = ½ × base × height."
        ],
        [
          "½ × 16 × 9 = 72 cm²."
        ],
        [
          "½ × 16 × 18 = 144 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A parallelogram has base 18 cm and perpendicular height 7 cm.",
      "parts": [
        "Write the area formula.",
        "Find its area.",
        "Find its height if its area becomes 180 cm² with the same base."
      ],
      "answer": [
        [
          "A = base × perpendicular height."
        ],
        [
          "18 × 7 = 126 cm²."
        ],
        [
          "180 ÷ 18 = 10 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi empat selari bertapak 18 cm dan tinggi serenjang 7 cm.",
      "parts": [
        "Tulis rumus luas.",
        "Cari luas.",
        "Cari tinggi jika luas menjadi 180 cm² dengan tapak sama."
      ],
      "answer": [
        [
          "A = base × perpendicular height."
        ],
        [
          "18 × 7 = 126 cm²."
        ],
        [
          "180 ÷ 18 = 10 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rectangle has area 180 cm² and width 12 cm.",
      "parts": [
        "Find the length.",
        "Find the perimeter.",
        "Find the area of a square with that length as its side."
      ],
      "answer": [
        [
          "180 ÷ 12 = 15 cm."
        ],
        [
          "2(15 + 12) = 54 cm."
        ],
        [
          "15² = 225 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi empat tepat berluas 180 cm² dan lebar 12 cm.",
      "parts": [
        "Cari panjang.",
        "Cari perimeter.",
        "Cari luas segi empat sama dengan sisi sama seperti panjang itu."
      ],
      "answer": [
        [
          "180 ÷ 12 = 15 cm."
        ],
        [
          "2(15 + 12) = 54 cm."
        ],
        [
          "15² = 225 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A right triangle has perpendicular sides 6 cm and 8 cm.",
      "parts": [
        "Find its area.",
        "Find the hypotenuse.",
        "Find its perimeter."
      ],
      "answer": [
        [
          "½ × 6 × 8 = 24 cm²."
        ],
        [
          "√(6² + 8²) = 10 cm."
        ],
        [
          "6 + 8 + 10 = 24 cm."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi tiga bersudut tegak mempunyai sisi serenjang 6 cm dan 8 cm.",
      "parts": [
        "Cari luas.",
        "Cari hipotenus.",
        "Cari perimeter."
      ],
      "answer": [
        [
          "½ × 6 × 8 = 24 cm²."
        ],
        [
          "√(6² + 8²) = 10 cm."
        ],
        [
          "6 + 8 + 10 = 24 cm."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "An L-shaped floor is made from a 12 m × 8 m rectangle after removing a 4 m × 3 m corner.",
      "parts": [
        "Find the full rectangle's area.",
        "Find the removed area.",
        "Find the remaining floor area."
      ],
      "answer": [
        [
          "12 × 8 = 96 m²."
        ],
        [
          "4 × 3 = 12 m²."
        ],
        [
          "96 − 12 = 84 m²."
        ]
      ]
    },
    "bm": {
      "prompt": "Lantai berbentuk L terbentuk daripada segi empat tepat 12 m × 8 m dengan sudut 4 m × 3 m dibuang.",
      "parts": [
        "Cari luas segi empat tepat asal.",
        "Cari luas bahagian dibuang.",
        "Cari luas lantai berbaki."
      ],
      "answer": [
        [
          "12 × 8 = 96 m²."
        ],
        [
          "4 × 3 = 12 m²."
        ],
        [
          "96 − 12 = 84 m²."
        ]
      ]
    }
  },
  {
    "subtopic": "10.1",
    "mode": "challenge",
    "dlp": {
      "prompt": "A trapezium has parallel sides 10 cm and 18 cm and perpendicular height 6 cm.",
      "parts": [
        "Write its area formula.",
        "Calculate its area.",
        "Find the area if the height is 9 cm."
      ],
      "answer": [
        [
          "A = ½(a + b)h."
        ],
        [
          "½(10 + 18) × 6 = 84 cm²."
        ],
        [
          "½(10 + 18) × 9 = 126 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Trapezium mempunyai sisi selari 10 cm dan 18 cm serta tinggi serenjang 6 cm.",
      "parts": [
        "Tulis rumus luas.",
        "Hitung luas.",
        "Cari luas jika tinggi 9 cm."
      ],
      "answer": [
        [
          "A = ½(a + b)h."
        ],
        [
          "½(10 + 18) × 6 = 84 cm²."
        ],
        [
          "½(10 + 18) × 9 = 126 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rectangle has length (x + 4) cm and width x cm. Its perimeter is 40 cm.",
      "parts": [
        "Form an equation.",
        "Find x.",
        "Find the area."
      ],
      "answer": [
        [
          "2(x + 4) + 2x = 40."
        ],
        [
          "4x + 8 = 40; x = 8."
        ],
        [
          "8 × 12 = 96 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Segi empat tepat panjang (x + 4) cm dan lebar x cm. Perimeternya 40 cm.",
      "parts": [
        "Bina persamaan.",
        "Cari x.",
        "Cari luas."
      ],
      "answer": [
        [
          "2(x + 4) + 2x = 40."
        ],
        [
          "4x + 8 = 40; x = 8."
        ],
        [
          "8 × 12 = 96 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A square field has area 625 m².",
      "parts": [
        "Find its side length.",
        "Find its perimeter.",
        "Find the total fence length for three complete rounds."
      ],
      "answer": [
        [
          "√625 = 25 m."
        ],
        [
          "4 × 25 = 100 m."
        ],
        [
          "3 × 100 = 300 m."
        ]
      ]
    },
    "bm": {
      "prompt": "Padang segi empat sama berluas 625 m².",
      "parts": [
        "Cari panjang sisi.",
        "Cari perimeter.",
        "Cari jumlah pagar untuk tiga pusingan penuh."
      ],
      "answer": [
        [
          "√625 = 25 m."
        ],
        [
          "4 × 25 = 100 m."
        ],
        [
          "3 × 100 = 300 m."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A farmer has 50 m of fencing for a rectangle 15 m long.",
      "parts": [
        "Form a perimeter equation.",
        "Find the width.",
        "Find the enclosed area."
      ],
      "answer": [
        [
          "2(15 + w) = 50."
        ],
        [
          "w = 10 m."
        ],
        [
          "15 × 10 = 150 m²."
        ]
      ]
    },
    "bm": {
      "prompt": "Petani mempunyai pagar 50 m untuk segi empat tepat sepanjang 15 m.",
      "parts": [
        "Bina persamaan perimeter.",
        "Cari lebar.",
        "Cari luas dipagar."
      ],
      "answer": [
        [
          "2(15 + w) = 50."
        ],
        [
          "w = 10 m."
        ],
        [
          "15 × 10 = 150 m²."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A square tile has side length 20 cm.",
      "parts": [
        "Find its area in cm².",
        "Convert its area to m².",
        "How many tiles cover 4 m² without gaps?"
      ],
      "answer": [
        [
          "20² = 400 cm²."
        ],
        [
          "400 ÷ 10,000 = 0.04 m²."
        ],
        [
          "4 ÷ 0.04 = 100 tiles."
        ]
      ]
    },
    "bm": {
      "prompt": "Jubin segi empat sama bersisi 20 cm.",
      "parts": [
        "Cari luas dalam cm².",
        "Tukar luas kepada m².",
        "Berapa jubin menutup 4 m² tanpa ruang?"
      ],
      "answer": [
        [
          "20² = 400 cm²."
        ],
        [
          "400 ÷ 10,000 = 0.04 m²."
        ],
        [
          "4 ÷ 0.04 = 100 tiles."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rhombus has diagonals 12 cm and 16 cm.",
      "parts": [
        "Write its area formula.",
        "Find its area.",
        "Find its new area if one diagonal doubles."
      ],
      "answer": [
        [
          "A = ½d₁d₂."
        ],
        [
          "½ × 12 × 16 = 96 cm²."
        ],
        [
          "192 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Rombus mempunyai pepenjuru 12 cm dan 16 cm.",
      "parts": [
        "Tulis rumus luas.",
        "Cari luas.",
        "Cari luas baharu jika satu pepenjuru digandakan."
      ],
      "answer": [
        [
          "A = ½d₁d₂."
        ],
        [
          "½ × 12 × 16 = 96 cm²."
        ],
        [
          "192 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A triangular banner has area 45 cm² and base 15 cm.",
      "parts": [
        "Form an equation for perpendicular height h.",
        "Find h.",
        "Find the area if the base becomes 20 cm with the same height."
      ],
      "answer": [
        [
          "½ × 15 × h = 45."
        ],
        [
          "h = 6 cm."
        ],
        [
          "½ × 20 × 6 = 60 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Sepanduk segi tiga berluas 45 cm² dan tapak 15 cm.",
      "parts": [
        "Bina persamaan bagi tinggi serenjang h.",
        "Cari h.",
        "Cari luas jika tapak menjadi 20 cm dengan tinggi sama."
      ],
      "answer": [
        [
          "½ × 15 × h = 45."
        ],
        [
          "h = 6 cm."
        ],
        [
          "½ × 20 × 6 = 60 cm²."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A rectangular garden measures 9 m by 7 m.",
      "parts": [
        "Find its area.",
        "Find the perimeter.",
        "If a 1 m-wide path is built entirely inside along each edge, find the remaining inner area."
      ],
      "answer": [
        [
          "9 × 7 = 63 m²."
        ],
        [
          "2(9 + 7) = 32 m."
        ],
        [
          "(9 − 2)(7 − 2) = 35 m²."
        ]
      ]
    },
    "bm": {
      "prompt": "Taman segi empat tepat berukuran 9 m × 7 m.",
      "parts": [
        "Cari luas.",
        "Cari perimeter.",
        "Jika laluan 1 m lebar dibina di sebelah dalam sepanjang setiap tepi, cari luas bahagian tengah."
      ],
      "answer": [
        [
          "9 × 7 = 63 m²."
        ],
        [
          "2(9 + 7) = 32 m."
        ],
        [
          "(9 − 2)(7 − 2) = 35 m²."
        ]
      ]
    }
  },
  {
    "subtopic": "10.2",
    "mode": "challenge",
    "dlp": {
      "prompt": "A composite shape consists of two non-overlapping rectangles of 5 × 6 cm and 4 × 3 cm.",
      "parts": [
        "Find the first area.",
        "Find the second area.",
        "Find their total area."
      ],
      "answer": [
        [
          "5 × 6 = 30 cm²."
        ],
        [
          "4 × 3 = 12 cm²."
        ],
        [
          "30 + 12 = 42 cm²."
        ]
      ]
    },
    "bm": {
      "prompt": "Bentuk gabungan terdiri daripada dua segi empat tepat tidak bertindih berukuran 5 × 6 cm dan 4 × 3 cm.",
      "parts": [
        "Cari luas pertama.",
        "Cari luas kedua.",
        "Cari jumlah luas."
      ],
      "answer": [
        [
          "5 × 6 = 30 cm²."
        ],
        [
          "4 × 3 = 12 cm²."
        ],
        [
          "30 + 12 = 42 cm²."
        ]
      ]
    }
  }
];
export function buildMathF1C10Flashcards(lang:"bm"|"dlp"):Flashcard[]{
 if(legacyCards.length!==59||C10_CHALLENGES.length!==16)throw new Error("Chapter 10 flashcard count invariant failed");
 return legacyCards.map(({entry,id},index)=>{
   const mode=index<12?"concept":index<43?"practice":"challenge";
   const challenge=mode==="challenge"?C10_CHALLENGES[index-43]:null;
   const structured:StructuredFlashcard=challenge?{...challenge[lang]}:{prompt:entry[lang][0],answer:[[entry[lang][1]]]};
   return {id:id(lang),subjectId:"math",form:"Form 1",chapter:"Chapter 10",lang,front:structuredFront(structured),back:structuredBack(structured),subtopic:challenge?.subtopic??"10.1",reviewMode:mode,structured};
 });
}
