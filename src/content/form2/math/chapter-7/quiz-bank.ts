import type { PairedQuizSeed } from "../paired-quiz-bank";

const q = (
  bm: string,
  dlp: string,
  correct: PairedQuizSeed["correct"],
  distractors: PairedQuizSeed["distractors"],
  be: string,
  de: string,
): PairedQuizSeed => ({ question: [bm, dlp], correct, distractors, explanation: [be, de] });
const fmt = (value: number) => `${Number(value.toFixed(2))}`;
const num = (answer: number, unit = ""): PairedQuizSeed["distractors"] => {
  const correct = fmt(answer);
  const values = [answer + 2, answer - 2, answer * 2, answer / 2, answer + 5]
    .map(fmt)
    .filter((value, index, all) => value !== correct && all.indexOf(value) === index)
    .slice(0, 3);
  return [`${values[0]}${unit}`, `${values[1]}${unit}`, `${values[2]}${unit}`];
};
const calc = (bm: string, dlp: string, answer: number, unit: string, be: string, de: string) =>
  q(bm, dlp, `${answer}${unit}`, num(answer, unit), be, de);
const dist = (a: number, b: number, c: number, d: number) => Math.sqrt((c - a) ** 2 + (d - b) ** 2);
const areaRect = (x1: number, y1: number, x2: number, y2: number) =>
  Math.abs((x2 - x1) * (y2 - y1));

const foundation: PairedQuizSeed[] = [
  q(
    "Dalam koordinat (x, y), nilai manakah dibaca dahulu?",
    "In coordinates (x, y), which value is read first?",
    ["Koordinat-x", "The x-coordinate"],
    [
      ["Koordinat-y", "The y-coordinate"],
      ["Jarak dari asalan", "Distance from the origin"],
      ["Kecerunan", "Gradient"],
    ],
    "Koordinat ditulis mengikut tertib x dahulu, kemudian y.",
    "Coordinates are written in the order x first, then y.",
  ),
  q(
    "Apakah koordinat asalan?",
    "What are the coordinates of the origin?",
    "(0, 0)",
    ["(1, 0)", "(0, 1)", "(1, 1)"],
    "Paksi-x dan paksi-y bersilang di (0, 0).",
    "The x-axis and y-axis intersect at (0, 0).",
  ),
  q(
    "Titik (4, -3) terletak di kuadran mana?",
    "In which quadrant does (4, -3) lie?",
    ["Kuadran IV", "Quadrant IV"],
    [
      ["Kuadran I", "Quadrant I"],
      ["Kuadran II", "Quadrant II"],
      ["Kuadran III", "Quadrant III"],
    ],
    "x positif dan y negatif menunjukkan Kuadran IV.",
    "Positive x and negative y indicate Quadrant IV.",
  ),
  q(
    "Titik (-2, 5) terletak di kuadran mana?",
    "In which quadrant does (-2, 5) lie?",
    ["Kuadran II", "Quadrant II"],
    [
      ["Kuadran I", "Quadrant I"],
      ["Kuadran III", "Quadrant III"],
      ["Kuadran IV", "Quadrant IV"],
    ],
    "x negatif dan y positif menunjukkan Kuadran II.",
    "Negative x and positive y indicate Quadrant II.",
  ),
  q(
    "Titik (0, 7) terletak di mana?",
    "Where does the point (0, 7) lie?",
    ["Paksi-y", "The y-axis"],
    [
      ["Paksi-x", "The x-axis"],
      ["Kuadran I", "Quadrant I"],
      ["Asalan", "The origin"],
    ],
    "Koordinat-x sifar bermaksud titik berada pada paksi-y.",
    "An x-coordinate of zero places the point on the y-axis.",
  ),
  q(
    "Rumus jarak antara A(x₁,y₁) dan B(x₂,y₂) ialah apa?",
    "What is the distance formula between A(x₁,y₁) and B(x₂,y₂)?",
    "√[(x₂-x₁)²+(y₂-y₁)²]",
    ["(x₂-x₁)+(y₂-y₁)", "√[(x₂+x₁)²+(y₂+y₁)²]", "(x₂-x₁)²+(y₂-y₁)²"],
    "Teorem Pythagoras digunakan pada beza mengufuk dan menegak.",
    "Pythagoras' theorem is applied to the horizontal and vertical differences.",
  ),
  q(
    "Rumus titik tengah A(x₁,y₁) dan B(x₂,y₂) ialah apa?",
    "What is the midpoint formula for A(x₁,y₁) and B(x₂,y₂)?",
    "((x₁+x₂)/2, (y₁+y₂)/2)",
    ["(x₁+x₂, y₁+y₂)", "((x₂-x₁)/2, (y₂-y₁)/2)", "((x₁+y₁)/2, (x₂+y₂)/2)"],
    "Purata koordinat-x dan koordinat-y secara berasingan.",
    "Average the x-coordinates and y-coordinates separately.",
  ),
  q(
    "Jarak antara dua titik sentiasa mempunyai nilai bagaimana?",
    "What type of value is the distance between two points?",
    ["Bukan negatif", "Non-negative"],
    [
      ["Sentiasa negatif", "Always negative"],
      ["Sentiasa integer", "Always an integer"],
      ["Sama dengan koordinat-x", "Equal to the x-coordinate"],
    ],
    "Jarak ialah panjang, maka tidak boleh negatif.",
    "Distance is a length, so it cannot be negative.",
  ),
  q(
    "Jika dua titik mempunyai koordinat-y sama, jaraknya diperoleh bagaimana?",
    "If two points have the same y-coordinate, how is their distance found?",
    ["Beza mutlak koordinat-x", "Absolute difference of x-coordinates"],
    [
      ["Jumlah koordinat-y", "Sum of y-coordinates"],
      ["Beza mutlak koordinat-y", "Absolute difference of y-coordinates"],
      ["Darab koordinat-x", "Product of x-coordinates"],
    ],
    "Segmen itu mengufuk, jadi hanya perubahan x diambil.",
    "The segment is horizontal, so only the x-change is used.",
  ),
  q(
    "Jika dua titik mempunyai koordinat-x sama, segmen yang menyambungkannya ialah apa?",
    "If two points have the same x-coordinate, what type of segment joins them?",
    ["Menegak", "Vertical"],
    [
      ["Mengufuk", "Horizontal"],
      ["Melengkung", "Curved"],
      ["Selari dengan kedua-dua paksi", "Parallel to both axes"],
    ],
    "Nilai x tetap manakala y berubah, jadi segmen menegak.",
    "x stays fixed while y changes, so the segment is vertical.",
  ),
];
[
  [1, 2, 4, 2],
  [-3, 5, 2, 5],
  [0, -4, 0, 3],
  [6, 1, 6, 9],
  [-5, -2, -1, -2],
].forEach(([a, b, c, d]) =>
  foundation.push(
    calc(
      `Cari jarak antara (${a}, ${b}) dan (${c}, ${d}).`,
      `Find the distance between (${a}, ${b}) and (${c}, ${d}).`,
      dist(a, b, c, d),
      " unit",
      `Jarak = ${dist(a, b, c, d)} unit.`,
      `Distance = ${dist(a, b, c, d)} units.`,
    ),
  ),
);
[
  [0, 0, 4, 6],
  [-2, 4, 6, 8],
  [-5, -3, 1, 5],
  [2, -6, 8, 2],
  [-8, 4, 2, -2],
].forEach(([a, b, c, d]) =>
  foundation.push(
    q(
      `Cari titik tengah bagi (${a}, ${b}) dan (${c}, ${d}).`,
      `Find the midpoint of (${a}, ${b}) and (${c}, ${d}).`,
      `(${(a + c) / 2}, ${(b + d) / 2})`,
      [`(${a}, ${b})`, `(${c}, ${d})`, `(${(a + c) / 2 + 1}, ${(b + d) / 2})`],
      `Titik tengah = (${a + c}/2, ${b + d}/2) = (${(a + c) / 2}, ${(b + d) / 2}).`,
      `Midpoint = (${a + c}/2, ${b + d}/2) = (${(a + c) / 2}, ${(b + d) / 2}).`,
    ),
  ),
);
[
  [0, 0, 5, 3],
  [-2, 1, 4, 6],
  [3, -4, 8, 2],
  [-5, -3, 1, 4],
  [2, 2, 9, 7],
].forEach(([x1, y1, x2, y2]) =>
  foundation.push(
    calc(
      `Segi empat tepat mempunyai bucu bertentangan (${x1}, ${y1}) dan (${x2}, ${y2}) dengan sisi selari paksi. Cari luas.`,
      `A rectangle has opposite vertices (${x1}, ${y1}) and (${x2}, ${y2}) with axis-parallel sides. Find its area.`,
      areaRect(x1, y1, x2, y2),
      " unit²",
      `Luas = |${x2}-${x1}| × |${y2}-${y1}| = ${areaRect(x1, y1, x2, y2)} unit².`,
      `Area = |${x2}-${x1}| × |${y2}-${y1}| = ${areaRect(x1, y1, x2, y2)} units².`,
    ),
  ),
);
foundation.push(
  q(
    "Apakah kaedah sesuai untuk luas poligon daripada koordinat bucu?",
    "Which method is suitable for finding polygon area from vertex coordinates?",
    ["Kaedah kasut (shoelace)", "Shoelace method"],
    [
      ["Rumus titik tengah sahaja", "Midpoint formula only"],
      ["Rumus jarak sahaja", "Distance formula only"],
      ["Jumlah semua koordinat", "Sum of all coordinates"],
    ],
    "Kaedah kasut menggunakan hasil darab silang koordinat bucu yang tersusun.",
    "The shoelace method uses cross-products of ordered vertex coordinates.",
  ),
  q(
    "Semasa menggunakan kaedah kasut, bucu mesti disenaraikan bagaimana?",
    "When using the shoelace method, how must vertices be listed?",
    [
      "Mengikut arah jam atau lawan jam secara konsisten",
      "Consistently clockwise or anticlockwise",
    ],
    [
      ["Secara rawak", "Randomly"],
      ["Mengikut koordinat-x sahaja", "By x-coordinate only"],
      ["Bermula pada asalan sahaja", "Starting only at the origin"],
    ],
    "Tertib mengelilingi sempadan memastikan hasil darab mewakili poligon.",
    "Boundary order ensures the products represent the polygon.",
  ),
  q(
    "Mengapakah nilai mutlak diambil dalam pengiraan luas koordinat?",
    "Why is an absolute value taken in coordinate-area calculations?",
    ["Luas mesti positif", "Area must be positive"],
    [
      ["Koordinat tidak boleh negatif", "Coordinates cannot be negative"],
      ["Jarak mesti integer", "Distance must be an integer"],
      ["Titik tengah mesti di asalan", "The midpoint must be at the origin"],
    ],
    "Arah susunan bucu boleh menghasilkan tanda negatif, tetapi luas ialah positif.",
    "Vertex order can produce a negative sign, but area is positive.",
  ),
  q(
    "Titik tengah suatu segmen membahagikan segmen itu dalam nisbah apa?",
    "In what ratio does a midpoint divide a segment?",
    "1:1",
    ["1:2", "2:3", "3:1"],
    "Kedua-dua bahagian dari titik tengah adalah sama panjang.",
    "The two parts from the midpoint are equal in length.",
  ),
  q(
    "Jika A dan B ditukar tertib dalam rumus jarak, apakah berlaku?",
    "What happens if A and B are reversed in the distance formula?",
    ["Jarak kekal sama", "The distance stays the same"],
    [
      ["Jarak menjadi negatif", "The distance becomes negative"],
      ["Jarak menjadi dua kali", "The distance doubles"],
      ["Jarak menjadi sifar", "The distance becomes zero"],
    ],
    "Beza koordinat berubah tanda tetapi kuasa duanya kekal sama.",
    "Coordinate differences change sign, but their squares remain equal.",
  ),
);

const practice: PairedQuizSeed[] = [];
[
  [1, 2, 4, 6],
  [-2, 3, 4, -5],
  [0, 0, 8, 15],
  [-5, -1, 7, 4],
  [3, -6, -5, 9],
  [-4, 7, 5, -5],
  [2, 8, 11, -4],
  [-7, -3, 1, 12],
  [6, 5, -6, -11],
  [-9, 4, 3, 9],
].forEach(([a, b, c, d], i) => {
  const ans = dist(a, b, c, d);
  practice.push(
    calc(
      `Laluan lurus ${i + 1} menghubungkan A(${a},${b}) dan B(${c},${d}). Cari panjangnya.`,
      `Straight path ${i + 1} joins A(${a},${b}) and B(${c},${d}). Find its length.`,
      Number(ans.toFixed(2)),
      " unit",
      `AB = √[(${c - a})²+(${d - b})²] = ${ans.toFixed(2)} unit.`,
      `AB = √[(${c - a})²+(${d - b})²] = ${ans.toFixed(2)} units.`,
    ),
  );
});
[
  [2, 3, 8, 11],
  [-4, 6, 10, -2],
  [-7, -5, 5, 9],
  [3, -9, 13, 7],
  [-10, 4, 6, 12],
  [1, 8, 9, -6],
  [-3, 11, 7, 1],
  [4, -2, 12, 10],
  [-8, -4, 2, 6],
  [5, 7, 15, -3],
].forEach(([a, b, c, d], i) =>
  practice.push(
    q(
      `M ialah titik tengah segmen ${i + 1} dengan hujung (${a},${b}) dan (${c},${d}). Cari M.`,
      `M is the midpoint of segment ${i + 1} with endpoints (${a},${b}) and (${c},${d}). Find M.`,
      `(${(a + c) / 2}, ${(b + d) / 2})`,
      [`(${a + c}, ${b + d})`, `(${c - a}, ${d - b})`, `(${(a + c) / 2}, ${b + d})`],
      `M = ((${a}+${c})/2, (${b}+${d})/2).`,
      `M = ((${a}+${c})/2, (${b}+${d})/2).`,
    ),
  ),
);
[
  [0, 0, 6, 0, 0, 4],
  [-2, 1, 5, 1, -2, 7],
  [1, -3, 9, -3, 1, 2],
  [-5, -4, 3, -4, -5, 5],
  [2, 2, 12, 2, 2, 8],
].forEach(([ax, ay, bx, by, cx, cy], i) => {
  const ans = Math.abs((bx - ax) * (cy - ay) - (by - ay) * (cx - ax)) / 2;
  practice.push(
    calc(
      `Segi tiga ${i + 1} mempunyai bucu A(${ax},${ay}), B(${bx},${by}) dan C(${cx},${cy}). Cari luas.`,
      `Triangle ${i + 1} has vertices A(${ax},${ay}), B(${bx},${by}) and C(${cx},${cy}). Find its area.`,
      ans,
      " unit²",
      `Luas = ½|(${bx - ax})(${cy - ay})-(${by - ay})(${cx - ax})| = ${ans}.`,
      `Area = ½|(${bx - ax})(${cy - ay})-(${by - ay})(${cx - ax})| = ${ans}.`,
    ),
  );
});
[
  [2, 3, 5, 7],
  [-1, 4, 3, -2],
  [6, -5, -2, 1],
  [-4, -3, 7, 2],
  [1, 8, -5, -6],
].forEach(([mx, my, ax, ay], i) =>
  practice.push(
    q(
      `M(${mx},${my}) ialah titik tengah AB dan A(${ax},${ay}). Cari B bagi kes ${i + 1}.`,
      `M(${mx},${my}) is midpoint of AB and A(${ax},${ay}). Find B in case ${i + 1}.`,
      `(${2 * mx - ax}, ${2 * my - ay})`,
      [`(${mx - ax}, ${my - ay})`, `(${mx + ax}, ${my + ay})`, `(${2 * mx + ax}, ${2 * my + ay})`],
      `B = (2Mₓ-Aₓ, 2Mᵧ-Aᵧ) = (${2 * mx - ax},${2 * my - ay}).`,
      `B = (2Mₓ-Aₓ, 2Mᵧ-Aᵧ) = (${2 * mx - ax},${2 * my - ay}).`,
    ),
  ),
);

const challenge: PairedQuizSeed[] = [];
[
  [0, 0, 3, 4, 6, 0],
  [-2, 1, 2, 4, 6, 1],
  [1, -3, 5, 0, 9, -3],
  [-4, -2, 0, 1, 4, -2],
  [2, 5, 6, 8, 10, 5],
].forEach(([ax, ay, bx, by, cx, cy], i) => {
  const ab = dist(ax, ay, bx, by),
    bc = dist(bx, by, cx, cy),
    ca = dist(cx, cy, ax, ay);
  challenge.push(
    calc(
      `Segi tiga koordinat ${i + 1} mempunyai A(${ax},${ay}), B(${bx},${by}), C(${cx},${cy}). Cari perimeter.`,
      `Coordinate triangle ${i + 1} has A(${ax},${ay}), B(${bx},${by}), C(${cx},${cy}). Find its perimeter.`,
      Number((ab + bc + ca).toFixed(2)),
      " unit",
      `Perimeter = AB+BC+CA = ${(ab + bc + ca).toFixed(2)} unit.`,
      `Perimeter = AB+BC+CA = ${(ab + bc + ca).toFixed(2)} units.`,
    ),
  );
});
[
  [0, 0, 8, 6, 0.5],
  [-4, 2, 6, 10, 0.25],
  [2, -6, 10, 2, 0.75],
  [-8, -4, 4, 8, 0.5],
  [3, 1, 15, 9, 0.25],
].forEach(([ax, ay, bx, by, t], i) =>
  challenge.push(
    q(
      `Titik P membahagi AB pada ${t * 100}% perjalanan dari A(${ax},${ay}) ke B(${bx},${by}) bagi kes ${i + 1}. Cari P.`,
      `Point P is ${t * 100}% of the way from A(${ax},${ay}) to B(${bx},${by}) in case ${i + 1}. Find P.`,
      `(${ax + t * (bx - ax)}, ${ay + t * (by - ay)})`,
      [`(${ax}, ${ay})`, `(${bx}, ${by})`, `(${ax + t * (bx - ax) + 1}, ${ay + t * (by - ay)})`],
      `P = A + ${t}(B-A) = (${ax + t * (bx - ax)},${ay + t * (by - ay)}).`,
      `P = A + ${t}(B-A) = (${ax + t * (bx - ax)},${ay + t * (by - ay)}).`,
    ),
  ),
);
[
  [1, 2, 7, 8],
  [-4, 5, 6, -3],
  [2, -7, 10, 5],
  [-8, -2, 4, 6],
  [3, 9, 15, -1],
].forEach(([ax, ay, bx, by], i) => {
  const mx = (ax + bx) / 2,
    my = (ay + by) / 2;
  challenge.push(
    calc(
      `M(${mx},${my}) ialah pusat bulatan dan A(${ax},${ay}), B(${bx},${by}) ialah hujung diameter ${i + 1}. Cari jejari.`,
      `M(${mx},${my}) is the centre and A(${ax},${ay}), B(${bx},${by}) are endpoints of diameter ${i + 1}. Find the radius.`,
      Number((dist(ax, ay, bx, by) / 2).toFixed(2)),
      " unit",
      "Jejari ialah separuh jarak AB.",
      "The radius is half the distance AB.",
    ),
  );
});
[
  [0, 0, 6, 8, 3, 4],
  [-2, 1, 4, 9, 1, 5],
  [1, -5, 9, 7, 5, 1],
  [-6, -2, 2, 4, -2, 1],
  [3, 3, 13, 9, 8, 6],
].forEach(([ax, ay, bx, by, mx, my], i) =>
  challenge.push(
    q(
      `Bagi segmen ${i + 1}, A(${ax},${ay}), B(${bx},${by}) dan calon titik tengah M(${mx},${my}). Nilai dakwaan bahawa M ialah titik tengah.`,
      `For segment ${i + 1}, A(${ax},${ay}), B(${bx},${by}) and proposed midpoint M(${mx},${my}). Assess the claim.`,
      ["Betul", "Correct"],
      [
        ["Salah; M ialah A", "False; M is A"],
        ["Salah; M ialah B", "False; M is B"],
        ["Tidak dapat ditentukan", "Cannot be determined"],
      ],
      `Purata koordinat A dan B ialah (${(ax + bx) / 2},${(ay + by) / 2}), sama dengan M.`,
      `The coordinate averages are (${(ax + bx) / 2},${(ay + by) / 2}), equal to M.`,
    ),
  ),
);
[
  [0, 0, 4, 0, 6, 3, 2, 5],
  [-3, 1, 3, 1, 5, 5, -1, 7],
  [1, -4, 7, -4, 9, 2, 3, 4],
  [-5, -2, 2, -2, 4, 3, -3, 5],
  [2, 1, 10, 1, 12, 6, 4, 8],
].forEach((v, i) => {
  let s1 = 0,
    s2 = 0;
  for (let k = 0; k < 4; k++) {
    const x = v[2 * k],
      y = v[2 * k + 1],
      xn = v[2 * ((k + 1) % 4)],
      yn = v[2 * ((k + 1) % 4) + 1];
    s1 += x * yn;
    s2 += y * xn;
  }
  const ans = Math.abs(s1 - s2) / 2;
  challenge.push(
    calc(
      `Gunakan kaedah kasut untuk luas poligon ${i + 1} dengan bucu berturutan (${v[0]},${v[1]}), (${v[2]},${v[3]}), (${v[4]},${v[5]}), (${v[6]},${v[7]}).`,
      `Use the shoelace method for polygon ${i + 1} with consecutive vertices (${v[0]},${v[1]}), (${v[2]},${v[3]}), (${v[4]},${v[5]}), (${v[6]},${v[7]}).`,
      ans,
      " unit²",
      `Luas = ½|${s1}-${s2}| = ${ans} unit².`,
      `Area = ½|${s1}-${s2}| = ${ans} units².`,
    ),
  );
});
challenge.push(
  calc(
    "Sebuah robot bergerak dari (-3,4) ke (5,10), kemudian ke (11,2). Cari jumlah jarak.",
    "A robot moves from (-3,4) to (5,10), then to (11,2). Find the total distance.",
    20,
    " unit",
    "Dua jarak masing-masing 10 unit; jumlah 20 unit.",
    "Both distances are 10 units; total 20 units.",
  ),
  q(
    "A(2,3) dan B(8,11). Titik P berada pada pembahagi dua serenjang AB. Hubungan manakah benar?",
    "A(2,3) and B(8,11). Point P lies on the perpendicular bisector of AB. Which relationship is true?",
    "PA = PB",
    ["PA = 2PB", "PA < PB", "PA + PB = AB"],
    "Setiap titik pada pembahagi dua serenjang sama jarak dari kedua-dua hujung.",
    "Every point on a perpendicular bisector is equidistant from the endpoints.",
  ),
  calc(
    "Segi empat tepat berpusat di (2,1), panjang 10 unit dan lebar 6 unit dengan sisi selari paksi. Cari luas.",
    "An axis-aligned rectangle is centred at (2,1), with length 10 units and width 6 units. Find its area.",
    60,
    " unit²",
    "Luas = 10 × 6 = 60 unit²; kedudukan pusat tidak mengubah luas.",
    "Area = 10 × 6 = 60 units²; the centre location does not change area.",
  ),
  q(
    "Titik A(-2,5) diterjemah 7 unit ke kanan dan 3 unit ke bawah. Cari kedudukan baharu.",
    "Point A(-2,5) is translated 7 units right and 3 units down. Find its new position.",
    "(5, 2)",
    ["(-9, 8)", "(5, 8)", "(-5, 12)"],
    "Tambah 7 pada x dan tolak 3 daripada y: (5,2).",
    "Add 7 to x and subtract 3 from y: (5,2).",
  ),
  calc(
    "Sebuah segi tiga bersudut tegak mempunyai bucu (-1,2), (7,2) dan (-1,8). Cari panjang hipotenus.",
    "A right triangle has vertices (-1,2), (7,2) and (-1,8). Find the hypotenuse length.",
    10,
    " unit",
    "Sisi tegak ialah 8 dan 6; hipotenus = √(8²+6²)=10.",
    "The legs are 8 and 6; hypotenuse = √(8²+6²)=10.",
  ),
);

export const mathF2C7PairedSeeds: readonly PairedQuizSeed[] = [
  ...foundation,
  ...practice,
  ...challenge,
];
