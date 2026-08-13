import type { PairedQuizSeed } from "../paired-quiz-bank";

const q = (
  bm: string,
  dlp: string,
  correct: PairedQuizSeed["correct"],
  distractors: PairedQuizSeed["distractors"],
  bmExplanation: string,
  dlpExplanation: string,
): PairedQuizSeed => ({
  question: [bm, dlp],
  correct,
  distractors,
  explanation: [bmExplanation, dlpExplanation],
});

const n = (value: number, unit = ""): string => `${Number(value.toFixed(2))}${unit}`;
const numeric = (answer: number, unit = ""): [string, string, string, string] => {
  const alternatives = [
    answer * 2,
    answer / 2,
    answer + (answer > 10 ? 10 : 2),
    answer - 2,
    answer + 1,
  ]
    .map((value) => n(value, unit))
    .filter((value, index, values) => value !== n(answer, unit) && values.indexOf(value) === index)
    .slice(0, 3);
  return [n(answer, unit), alternatives[0], alternatives[1], alternatives[2]];
};
const calc = (
  bm: string,
  dlp: string,
  answer: number,
  unit: string,
  bmWork: string,
  dlpWork: string,
): PairedQuizSeed => {
  const [correct, ...wrong] = numeric(answer, unit);
  return q(bm, dlp, correct, wrong as [string, string, string], bmWork, dlpWork);
};

const foundation: PairedQuizSeed[] = [
  q(
    "Apakah maksud muka bagi bentuk tiga matra?",
    "What is a face of a three-dimensional shape?",
    ["Permukaan rata atau melengkung pada bentuk", "A flat or curved surface of the shape"],
    [
      ["Garis tempat dua muka bertemu", "A line where two faces meet"],
      ["Titik tempat beberapa rusuk bertemu", "A point where several edges meet"],
      ["Ruang di dalam bentuk", "The space inside the shape"],
    ],
    "Muka ialah setiap permukaan yang membatasi bentuk tiga matra.",
    "A face is any surface that bounds a three-dimensional shape.",
  ),
  q(
    "Apakah rusuk bagi bentuk tiga matra?",
    "What is an edge of a three-dimensional shape?",
    ["Garis tempat dua muka bertemu", "A line where two faces meet"],
    [
      ["Permukaan bentuk", "A surface of the shape"],
      ["Titik tengah bentuk", "The centre of the shape"],
      ["Isi padu bentuk", "The volume of the shape"],
    ],
    "Rusuk terbentuk pada pertemuan dua muka.",
    "An edge is formed where two faces meet.",
  ),
  q(
    "Kubus mempunyai berapa muka, rusuk dan bucu?",
    "How many faces, edges and vertices does a cube have?",
    ["6 muka, 12 rusuk, 8 bucu", "6 faces, 12 edges, 8 vertices"],
    [
      ["6 muka, 8 rusuk, 12 bucu", "6 faces, 8 edges, 12 vertices"],
      ["8 muka, 12 rusuk, 6 bucu", "8 faces, 12 edges, 6 vertices"],
      ["4 muka, 6 rusuk, 4 bucu", "4 faces, 6 edges, 4 vertices"],
    ],
    "Kubus mempunyai 6 muka segi empat sama, 12 rusuk dan 8 bucu.",
    "A cube has 6 square faces, 12 edges and 8 vertices.",
  ),
  q(
    "Bentuk manakah mempunyai satu permukaan melengkung dan tiada bucu?",
    "Which shape has one curved surface and no vertices?",
    ["Sfera", "Sphere"],
    [
      ["Kon", "Cone"],
      ["Silinder", "Cylinder"],
      ["Piramid", "Pyramid"],
    ],
    "Sfera mempunyai satu permukaan melengkung tanpa rusuk atau bucu.",
    "A sphere has one curved surface with no edges or vertices.",
  ),
  q(
    "Apakah bentuk keratan rentas seragam bagi prisma segi tiga?",
    "What is the uniform cross-section of a triangular prism?",
    ["Segi tiga", "Triangle"],
    [
      ["Segi empat sama", "Square"],
      ["Bulatan", "Circle"],
      ["Pentagon", "Pentagon"],
    ],
    "Prisma dinamakan mengikut keratan rentas seragamnya.",
    "A prism is named after its uniform cross-section.",
  ),
  q(
    "Apakah bentangan?",
    "What is a net?",
    [
      "Corak dua matra yang boleh dilipat menjadi bentuk tiga matra",
      "A two-dimensional pattern that folds into a three-dimensional shape",
    ],
    [
      ["Pandangan hadapan sahaja", "A front view only"],
      ["Luas satu muka", "The area of one face"],
      ["Keratan rentas melengkung", "A curved cross-section"],
    ],
    "Bentangan menunjukkan semua permukaan dalam bentuk rata sebelum dilipat.",
    "A net shows all surfaces laid flat before folding.",
  ),
  q(
    "Bentangan kubus terdiri daripada apa?",
    "What does a cube net consist of?",
    ["Enam segi empat sama kongruen", "Six congruent squares"],
    [
      ["Empat segi tiga", "Four triangles"],
      ["Dua bulatan dan satu segi empat tepat", "Two circles and one rectangle"],
      ["Enam segi empat tepat berlainan", "Six different rectangles"],
    ],
    "Enam muka kubus ialah segi empat sama yang kongruen.",
    "The six faces of a cube are congruent squares.",
  ),
  q(
    "Bentangan silinder mengandungi bentuk apa?",
    "Which shapes make up a cylinder net?",
    ["Dua bulatan dan satu segi empat tepat", "Two circles and one rectangle"],
    [
      ["Satu bulatan dan satu sektor", "One circle and one sector"],
      ["Enam segi empat sama", "Six squares"],
      ["Dua segi tiga dan tiga segi empat tepat", "Two triangles and three rectangles"],
    ],
    "Dua bulatan menjadi tapak dan segi empat tepat menjadi permukaan melengkung.",
    "The two circles form the bases and the rectangle forms the curved surface.",
  ),
  q(
    "Apakah unit sesuai bagi luas permukaan?",
    "What is a suitable unit for surface area?",
    "cm²",
    ["cm", "cm³", "°"],
    "Luas diukur dalam unit persegi.",
    "Area is measured in square units.",
  ),
  q(
    "Apakah unit sesuai bagi isi padu?",
    "What is a suitable unit for volume?",
    "cm³",
    ["cm", "cm²", "m²"],
    "Isi padu diukur dalam unit padu.",
    "Volume is measured in cubic units.",
  ),
  calc(
    "Cari isi padu kubus bersisi 4 cm.",
    "Find the volume of a cube of side 4 cm.",
    64,
    " cm³",
    "V = 4³ = 64 cm³.",
    "V = 4³ = 64 cm³.",
  ),
  calc(
    "Cari luas permukaan kubus bersisi 5 cm.",
    "Find the surface area of a cube of side 5 cm.",
    150,
    " cm²",
    "L = 6(5²) = 150 cm².",
    "A = 6(5²) = 150 cm².",
  ),
  calc(
    "Sebuah kuboid berukuran 6 cm × 4 cm × 3 cm. Cari isi padunya.",
    "A cuboid measures 6 cm × 4 cm × 3 cm. Find its volume.",
    72,
    " cm³",
    "V = 6 × 4 × 3 = 72 cm³.",
    "V = 6 × 4 × 3 = 72 cm³.",
  ),
  calc(
    "Cari luas permukaan kuboid 5 cm × 3 cm × 2 cm.",
    "Find the surface area of a 5 cm × 3 cm × 2 cm cuboid.",
    62,
    " cm²",
    "L = 2(15 + 6 + 10) = 62 cm².",
    "A = 2(15 + 6 + 10) = 62 cm².",
  ),
  calc(
    "Luas keratan rentas sebuah prisma ialah 12 cm² dan panjangnya 7 cm. Cari isi padu.",
    "A prism has cross-sectional area 12 cm² and length 7 cm. Find its volume.",
    84,
    " cm³",
    "V = luas keratan rentas × panjang = 12 × 7.",
    "V = cross-sectional area × length = 12 × 7.",
  ),
  q(
    "Rumus isi padu silinder berjejari j dan tinggi t ialah apa?",
    "What is the volume formula for a cylinder of radius r and height h?",
    "πj²t",
    ["2πjt", "πjt²", "2πj²t"],
    "Isi padu silinder = luas tapak bulatan × tinggi = πj²t.",
    "Cylinder volume = circular base area × height = πr²h.",
  ),
  q(
    "Rumus isi padu kon berjejari j dan tinggi t ialah apa?",
    "What is the volume formula for a cone of radius r and height h?",
    "⅓πj²t",
    ["πj²t", "⅓πjt²", "2πjt"],
    "Isi padu kon ialah satu pertiga isi padu silinder dengan tapak dan tinggi sama.",
    "A cone's volume is one third of a cylinder with the same base and height.",
  ),
  q(
    "Rumus isi padu piramid ialah apa?",
    "What is the volume formula for a pyramid?",
    ["⅓ × luas tapak × tinggi", "⅓ × base area × height"],
    [
      ["Luas tapak × tinggi", "Base area × height"],
      ["½ × luas tapak × tinggi", "½ × base area × height"],
      ["Perimeter tapak × tinggi", "Base perimeter × height"],
    ],
    "Piramid mengisi satu pertiga prisma dengan tapak dan tinggi yang sama.",
    "A pyramid occupies one third of a prism with the same base and height.",
  ),
  q(
    "Permukaan kon terdiri daripada apa?",
    "What surfaces make up a cone?",
    ["Satu tapak bulat dan satu permukaan melengkung", "One circular base and one curved surface"],
    [
      ["Dua tapak bulat", "Two circular bases"],
      ["Satu segi tiga dan satu bulatan", "One triangle and one circle"],
      ["Empat muka segi tiga", "Four triangular faces"],
    ],
    "Kon mempunyai satu bulatan sebagai tapak serta satu permukaan melengkung.",
    "A cone has one circular base and one curved surface.",
  ),
  q(
    "Piramid bertapak segi empat sama mempunyai berapa muka segi tiga?",
    "How many triangular faces does a square-based pyramid have?",
    "4",
    ["3", "5", "8"],
    "Setiap sisi tapak segi empat sama bersambung kepada satu muka segi tiga.",
    "Each side of the square base connects to one triangular face.",
  ),
  calc(
    "Cari isi padu silinder berjejari 7 cm dan tinggi 5 cm. Gunakan π = 22/7.",
    "Find the volume of a cylinder of radius 7 cm and height 5 cm. Use π = 22/7.",
    770,
    " cm³",
    "V = (22/7)(7²)(5) = 770 cm³.",
    "V = (22/7)(7²)(5) = 770 cm³.",
  ),
  calc(
    "Cari isi padu kon berjejari 3 cm dan tinggi 12 cm dalam sebutan π.",
    "Find the volume of a cone of radius 3 cm and height 12 cm in terms of π.",
    36,
    "π cm³",
    "V = ⅓π(3²)(12) = 36π cm³.",
    "V = ⅓π(3²)(12) = 36π cm³.",
  ),
  calc(
    "Tapak piramid seluas 30 cm² dan tingginya 9 cm. Cari isi padu.",
    "A pyramid has base area 30 cm² and height 9 cm. Find its volume.",
    90,
    " cm³",
    "V = ⅓(30)(9) = 90 cm³.",
    "V = ⅓(30)(9) = 90 cm³.",
  ),
  q(
    "Sebuah hemisfera ialah berapa bahagian daripada sfera?",
    "What fraction of a sphere is a hemisphere?",
    "1/2",
    ["1/3", "1/4", "2/3"],
    "Hemisfera ialah separuh daripada sebuah sfera.",
    "A hemisphere is half of a sphere.",
  ),
  q(
    "Bentuk manakah mempunyai dua tapak selari dan kongruen?",
    "Which solid has two parallel congruent bases?",
    ["Prisma", "Prism"],
    [
      ["Piramid", "Pyramid"],
      ["Kon", "Cone"],
      ["Sfera", "Sphere"],
    ],
    "Semua prisma mempunyai dua keratan rentas hujung yang selari dan kongruen.",
    "Every prism has two parallel congruent end cross-sections.",
  ),
  q(
    "Mengapakah sfera tidak mempunyai bentangan tepat daripada kepingan rata?",
    "Why does a sphere not have an exact net made from flat pieces?",
    ["Permukaannya melengkung dalam semua arah", "Its surface curves in every direction"],
    [
      ["Sfera mempunyai terlalu banyak bucu", "A sphere has too many vertices"],
      ["Sfera ialah bentuk dua matra", "A sphere is two-dimensional"],
      ["Sfera tiada isi padu", "A sphere has no volume"],
    ],
    "Permukaan sfera tidak boleh diratakan tanpa herotan.",
    "A spherical surface cannot be flattened without distortion.",
  ),
  q(
    "Jika semua ukuran panjang didarab 2, berapa kali ganda isi padu berubah?",
    "If every length is multiplied by 2, by what factor does volume change?",
    ["8 kali", "8 times"],
    [
      ["2 kali", "2 times"],
      ["4 kali", "4 times"],
      ["6 kali", "6 times"],
    ],
    "Isi padu berubah mengikut kuasa tiga faktor skala: 2³ = 8.",
    "Volume changes by the cube of the scale factor: 2³ = 8.",
  ),
  q(
    "Jika semua ukuran panjang didarab 3, berapa kali ganda luas permukaan berubah?",
    "If every length is multiplied by 3, by what factor does surface area change?",
    ["9 kali", "9 times"],
    [
      ["3 kali", "3 times"],
      ["6 kali", "6 times"],
      ["27 kali", "27 times"],
    ],
    "Luas berubah mengikut kuasa dua faktor skala: 3² = 9.",
    "Area changes by the square of the scale factor: 3² = 9.",
  ),
  q(
    "Apakah perbezaan utama luas permukaan dan isi padu?",
    "What is the main difference between surface area and volume?",
    [
      "Luas permukaan mengukur bahagian luar; isi padu mengukur ruang di dalam",
      "Surface area measures the outside; volume measures space inside",
    ],
    [
      ["Kedua-duanya mengukur panjang", "Both measure length"],
      ["Luas permukaan menggunakan unit padu", "Surface area uses cubic units"],
      ["Isi padu hanya untuk bentuk dua matra", "Volume is only for two-dimensional shapes"],
    ],
    "Luas permukaan menjumlahkan permukaan luar, manakala isi padu mengukur ruang yang diisi.",
    "Surface area totals the outside surfaces, while volume measures occupied space.",
  ),
  q(
    "Dalam gabungan dua pepejal, muka yang bercantum dikira dalam luas permukaan luar?",
    "In a composite solid, is a joined face counted in the external surface area?",
    ["Tidak, kerana muka itu tersembunyi di dalam", "No, because the face is hidden inside"],
    [
      ["Ya, dua kali", "Yes, twice"],
      ["Ya, sekali", "Yes, once"],
      ["Hanya jika berbentuk bulatan", "Only if it is circular"],
    ],
    "Muka cantuman bukan sebahagian daripada permukaan yang terdedah.",
    "A joined face is not part of the exposed surface.",
  ),
];

const practice: PairedQuizSeed[] = [];
const cuboids = [
  [8, 5, 3],
  [10, 4, 2],
  [7, 6, 4],
  [9, 5, 2],
  [12, 3, 3],
];
cuboids.forEach(([l, w, h], i) =>
  practice.push(
    calc(
      `Kotak ${i + 1} berukuran ${l} cm × ${w} cm × ${h} cm. Cari luas permukaannya.`,
      `Box ${i + 1} measures ${l} cm × ${w} cm × ${h} cm. Find its surface area.`,
      2 * (l * w + w * h + l * h),
      " cm²",
      `L = 2(${l * w} + ${w * h} + ${l * h}) = ${2 * (l * w + w * h + l * h)} cm².`,
      `A = 2(${l * w} + ${w * h} + ${l * h}) = ${2 * (l * w + w * h + l * h)} cm².`,
    ),
  ),
);
const prisms = [
  [12, 8],
  [15, 6],
  [18, 5],
  [20, 9],
  [24, 7],
];
prisms.forEach(([a, l], i) =>
  practice.push(
    calc(
      `Prisma ${i + 1} mempunyai luas keratan rentas ${a} cm² dan panjang ${l} cm. Cari isi padu.`,
      `Prism ${i + 1} has cross-sectional area ${a} cm² and length ${l} cm. Find its volume.`,
      a * l,
      " cm³",
      `V = ${a} × ${l} = ${a * l} cm³.`,
      `V = ${a} × ${l} = ${a * l} cm³.`,
    ),
  ),
);
const cylinders = [
  [7, 10],
  [5, 8],
  [3, 14],
  [4, 9],
  [6, 5],
];
cylinders.forEach(([r, h], i) => {
  const ans = r % 7 === 0 ? 2 * (22 / 7) * r * (r + h) : 2 * 3.142 * r * (r + h);
  practice.push(
    calc(
      `Silinder tertutup ${i + 1} berjejari ${r} cm dan tinggi ${h} cm. Cari luas permukaan. Gunakan π = ${r % 7 === 0 ? "22/7" : "3.142"}.`,
      `Closed cylinder ${i + 1} has radius ${r} cm and height ${h} cm. Find its surface area. Use π = ${r % 7 === 0 ? "22/7" : "3.142"}.`,
      ans,
      " cm²",
      `L = 2πj(j + t) = ${n(ans)} cm².`,
      `A = 2πr(r + h) = ${n(ans)} cm².`,
    ),
  );
});
const pyramids = [
  [48, 12],
  [75, 8],
  [54, 10],
  [96, 6],
  [42, 15],
];
pyramids.forEach(([a, h], i) =>
  practice.push(
    calc(
      `Piramid ${i + 1} mempunyai luas tapak ${a} cm² dan tinggi ${h} cm. Cari isi padu.`,
      `Pyramid ${i + 1} has base area ${a} cm² and height ${h} cm. Find its volume.`,
      (a * h) / 3,
      " cm³",
      `V = ⅓(${a})(${h}) = ${(a * h) / 3} cm³.`,
      `V = ⅓(${a})(${h}) = ${(a * h) / 3} cm³.`,
    ),
  ),
);
const missing = [
  [240, 8, 5],
  [360, 10, 6],
  [504, 12, 7],
  [270, 9, 5],
  [420, 14, 6],
];
missing.forEach(([v, l, w], i) =>
  practice.push(
    calc(
      `Isi padu kuboid ${i + 1} ialah ${v} cm³. Panjang ${l} cm dan lebar ${w} cm. Cari tinggi.`,
      `Cuboid ${i + 1} has volume ${v} cm³, length ${l} cm and width ${w} cm. Find its height.`,
      v / (l * w),
      " cm",
      `t = ${v} ÷ (${l} × ${w}) = ${v / (l * w)} cm.`,
      `h = ${v} ÷ (${l} × ${w}) = ${v / (l * w)} cm.`,
    ),
  ),
);
practice.push(
  calc(
    "Sebuah tangki 2 m × 1.5 m × 1 m diisi separuh. Cari isi padu air.",
    "A 2 m × 1.5 m × 1 m tank is half full. Find the water volume.",
    1.5,
    " m³",
    "Isi padu tangki = 3 m³; separuh = 1.5 m³.",
    "Tank volume = 3 m³; half = 1.5 m³.",
  ),
  calc(
    "Sebuah kubus berisi padu 343 cm³. Cari panjang sisinya.",
    "A cube has volume 343 cm³. Find its side length.",
    7,
    " cm",
    "Sisi = ∛343 = 7 cm.",
    "Side = ∛343 = 7 cm.",
  ),
  calc(
    "Sebuah silinder berisi padu 616 cm³ dan tinggi 4 cm. Cari jejari. Gunakan π = 22/7.",
    "A cylinder has volume 616 cm³ and height 4 cm. Find its radius. Use π = 22/7.",
    7,
    " cm",
    "j² = 616 ÷ [(22/7)(4)] = 49; j = 7 cm.",
    "r² = 616 ÷ [(22/7)(4)] = 49; r = 7 cm.",
  ),
  calc(
    "Luas permukaan kubus ialah 294 cm². Cari sisinya.",
    "A cube has surface area 294 cm². Find its side.",
    7,
    " cm",
    "6s² = 294; s² = 49; s = 7 cm.",
    "6s² = 294; s² = 49; s = 7 cm.",
  ),
  calc(
    "Sebuah prisma segi tiga mempunyai tapak segi tiga 8 cm, tinggi segi tiga 5 cm dan panjang prisma 12 cm. Cari isi padu.",
    "A triangular prism has triangle base 8 cm, triangle height 5 cm and prism length 12 cm. Find its volume.",
    240,
    " cm³",
    "Keratan rentas = ½(8)(5) = 20; V = 20(12) = 240 cm³.",
    "Cross-section = ½(8)(5) = 20; V = 20(12) = 240 cm³.",
  ),
);

const challenge: PairedQuizSeed[] = [];
const tanks = [
  [10, 6, 4, 0.75],
  [12, 5, 3, 0.6],
  [8, 7, 5, 0.5],
  [15, 4, 2, 0.8],
  [9, 6, 5, 0.4],
];
tanks.forEach(([l, w, h, f], i) =>
  challenge.push(
    calc(
      `Tangki ${i + 1} berukuran ${l} m × ${w} m × ${h} m diisi ${f * 100}%. Cari isi padu ruang kosong.`,
      `Tank ${i + 1} measures ${l} m × ${w} m × ${h} m and is ${f * 100}% full. Find the empty volume.`,
      l * w * h * (1 - f),
      " m³",
      `Ruang kosong = ${l * w * h}(1 − ${f}) = ${l * w * h * (1 - f)} m³.`,
      `Empty volume = ${l * w * h}(1 − ${f}) = ${l * w * h * (1 - f)} m³.`,
    ),
  ),
);
const scale = [
  [2, 3],
  [3, 4],
  [1.5, 8],
  [2.5, 6],
  [4, 2],
];
scale.forEach(([k, v], i) =>
  challenge.push(
    calc(
      `Pepejal ${i + 1} mempunyai isi padu ${v} cm³. Semua panjang didarab ${k}. Cari isi padu baharu.`,
      `Solid ${i + 1} has volume ${v} cm³. Every length is multiplied by ${k}. Find the new volume.`,
      v * k ** 3,
      " cm³",
      `Isi padu baharu = ${v}(${k}³) = ${n(v * k ** 3)} cm³.`,
      `New volume = ${v}(${k}³) = ${n(v * k ** 3)} cm³.`,
    ),
  ),
);
const hollow = [
  [10, 8, 6, 8, 6, 4],
  [12, 10, 8, 10, 8, 6],
  [9, 7, 5, 7, 5, 3],
  [15, 9, 6, 13, 7, 4],
  [11, 8, 7, 9, 6, 5],
];
hollow.forEach(([L, W, H, l, w, h], i) =>
  challenge.push(
    calc(
      `Blok berongga ${i + 1} mempunyai kuboid luar ${L}×${W}×${H} cm dan rongga ${l}×${w}×${h} cm. Cari isi padu bahan.`,
      `Hollow block ${i + 1} has outer cuboid ${L}×${W}×${H} cm and cavity ${l}×${w}×${h} cm. Find the material volume.`,
      L * W * H - l * w * h,
      " cm³",
      `V = ${L * W * H} − ${l * w * h} = ${L * W * H - l * w * h} cm³.`,
      `V = ${L * W * H} − ${l * w * h} = ${L * W * H - l * w * h} cm³.`,
    ),
  ),
);
const costs = [
  [6, 4, 3, 2],
  [8, 5, 2, 1.5],
  [10, 3, 3, 2.5],
  [7, 6, 4, 1.2],
  [9, 4, 5, 1.8],
];
costs.forEach(([l, w, h, c], i) => {
  const area = 2 * (l * w + w * h + l * h);
  challenge.push(
    calc(
      `Kotak tertutup ${i + 1} berukuran ${l} m × ${w} m × ${h} m dicat pada RM${c}/m². Cari kos.`,
      `Closed box ${i + 1} measures ${l} m × ${w} m × ${h} m and is painted at RM${c}/m². Find the cost.`,
      area * c,
      "",
      `Luas = ${area} m²; kos = ${area}(${c}) = RM${n(area * c)}.`,
      `Area = ${area} m²; cost = ${area}(${c}) = RM${n(area * c)}.`,
    ),
  );
});
const coneCylinder = [
  [3, 8],
  [5, 6],
  [7, 9],
  [4, 12],
  [6, 10],
];
coneCylinder.forEach(([r, h], i) =>
  challenge.push(
    calc(
      `Kon dan silinder ${i + 1} mempunyai jejari ${r} cm dan tinggi ${h} cm yang sama. Cari nisbah isi padu kon kepada silinder sebagai peratus.`,
      `Cone and cylinder ${i + 1} have the same radius ${r} cm and height ${h} cm. Express cone volume as a percentage of cylinder volume.`,
      33.33,
      "%",
      "Kon ialah ⅓ silinder, iaitu 33.33%.",
      "A cone is ⅓ of the cylinder, or 33.33%.",
    ),
  ),
);
challenge.push(
  calc(
    "Sebuah kubus dilebur menjadi 8 kubus kecil sama. Jika sisi asal 12 cm, cari sisi setiap kubus kecil.",
    "A cube is melted into 8 equal smaller cubes. If the original side is 12 cm, find each small cube's side.",
    6,
    " cm",
    "Isi padu setiap kubus = 12³/8 = 216 cm³; sisi = ∛216 = 6 cm.",
    "Each cube volume = 12³/8 = 216 cm³; side = ∛216 = 6 cm.",
  ),
  calc(
    "Sebuah prisma mempunyai isi padu 960 cm³. Keratan rentasnya trapezium dengan sisi selari 8 cm dan 12 cm serta tinggi 6 cm. Cari panjang prisma.",
    "A prism has volume 960 cm³. Its cross-section is a trapezium with parallel sides 8 cm and 12 cm and height 6 cm. Find the prism length.",
    16,
    " cm",
    "Luas trapezium = ½(8+12)(6)=60 cm²; panjang = 960/60=16 cm.",
    "Trapezium area = ½(8+12)(6)=60 cm²; length = 960/60=16 cm.",
  ),
  calc(
    "Sebuah silinder berjari-jari 7 cm dan tinggi 12 cm dipotong separuh mengikut diameternya. Cari isi padu satu bahagian. Gunakan π = 22/7.",
    "A cylinder of radius 7 cm and height 12 cm is cut in half through its diameter. Find one part's volume. Use π = 22/7.",
    924,
    " cm³",
    "Separuh isi padu = ½(22/7)(7²)(12)=924 cm³.",
    "Half-volume = ½(22/7)(7²)(12)=924 cm³.",
  ),
  calc(
    "Sebuah piramid dan prisma berkongsi tapak 60 cm². Piramid tinggi 15 cm. Berapakah tinggi prisma jika isi padunya sama?",
    "A pyramid and prism share a 60 cm² base. The pyramid height is 15 cm. What prism height gives equal volume?",
    5,
    " cm",
    "Isi padu piramid = ⅓(60)(15)=300; tinggi prisma = 300/60=5 cm.",
    "Pyramid volume = ⅓(60)(15)=300; prism height = 300/60=5 cm.",
  ),
  calc(
    "Bekas kuboid 30 cm × 20 cm × 15 cm diisi kubus bersisi 5 cm tanpa ruang. Berapa kubus muat?",
    "A 30 cm × 20 cm × 15 cm cuboid is packed with side-5 cm cubes without gaps. How many fit?",
    72,
    "",
    "Bilangan = (30/5)(20/5)(15/5)=6×4×3=72.",
    "Number = (30/5)(20/5)(15/5)=6×4×3=72.",
  ),
);

export const mathF2C6PairedSeeds: readonly PairedQuizSeed[] = [
  ...foundation,
  ...practice,
  ...challenge,
];
