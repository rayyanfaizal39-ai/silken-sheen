import { numericPairedSeed as n, pairedSeed as q, type PairedQuizSeed } from "../paired-quiz-bank";

const point = ([x, y]: number[]) => `(${x}, ${y})`;
const coordinateQuestion = (
  bm: string,
  dlp: string,
  answer: number[],
  bmExplanation: string,
  dlpExplanation: string,
): PairedQuizSeed => {
  const [x, y] = answer;
  const wrong = [
    [x + 1, y],
    [x, y + 1],
    [-x, y],
    [x, -y],
    [-x, -y],
    [y, x],
  ]
    .map(point)
    .filter((value, index, all) => value !== point(answer) && all.indexOf(value) === index)
    .slice(0, 3) as [string, string, string];
  return q(bm, dlp, point(answer), wrong, bmExplanation, dlpExplanation);
};

const foundation: PairedQuizSeed[] = [
  q(
    "Apakah transformasi isometri?",
    "What is an isometric transformation?",
    [
      "Transformasi yang mengekalkan bentuk dan saiz",
      "A transformation that preserves shape and size",
    ],
    [
      [
        "Transformasi yang sentiasa membesarkan bentuk",
        "A transformation that always enlarges a shape",
      ],
      ["Transformasi yang mengubah semua sudut", "A transformation that changes every angle"],
      ["Transformasi tanpa imej", "A transformation without an image"],
    ],
    "Isometri mengekalkan panjang dan sudut.",
    "An isometry preserves lengths and angles.",
  ),
  q(
    "Apakah maklumat yang diperlukan untuk menerangkan translasi?",
    "What information describes a translation?",
    ["Vektor translasi", "A translation vector"],
    [
      ["Pusat dan sudut", "A centre and angle"],
      ["Garis cermin", "A mirror line"],
      ["Faktor skala", "A scale factor"],
    ],
    "Vektor menyatakan gerakan mengufuk dan menegak.",
    "The vector states horizontal and vertical movement.",
  ),
  q(
    "Apakah maklumat lengkap bagi putaran?",
    "What information fully describes a rotation?",
    ["Pusat, sudut dan arah", "Centre, angle and direction"],
    [
      ["Garis dan faktor skala", "Line and scale factor"],
      ["Vektor sahaja", "Vector only"],
      ["Dua panjang sisi", "Two side lengths"],
    ],
    "Ketiga-tiga maklumat diperlukan untuk putaran yang unik.",
    "All three details are required for a unique rotation.",
  ),
  q(
    "Apakah yang menentukan suatu pantulan?",
    "What defines a reflection?",
    ["Garis cermin", "A mirror line"],
    [
      ["Pusat putaran", "A centre of rotation"],
      ["Vektor translasi", "A translation vector"],
      ["Kecerunan sahaja", "A gradient only"],
    ],
    "Objek dan imej berada pada sisi bertentangan garis cermin.",
    "Object and image lie on opposite sides of the mirror line.",
  ),
  q(
    "Dua bentuk kongruen mesti mempunyai apa?",
    "What must two congruent shapes have?",
    ["Bentuk dan saiz yang sama", "The same shape and size"],
    [
      ["Luas sama tetapi bentuk berbeza", "Equal area but different shape"],
      ["Perimeter berbeza", "Different perimeters"],
      ["Orientasi yang sama sahaja", "Only the same orientation"],
    ],
    "Kongruen bermaksud sepadan tepat selepas isometri.",
    "Congruent means an exact match after an isometry.",
  ),
  q(
    "Pantulan pada paksi-x mengubah (x,y) menjadi apa?",
    "Reflection in the x-axis maps (x,y) to what?",
    "(x, −y)",
    ["(−x, y)", "(−x, −y)", "(y, x)"],
    "Koordinat-x kekal dan tanda y berubah.",
    "x stays the same and the sign of y changes.",
  ),
  q(
    "Pantulan pada paksi-y mengubah (x,y) menjadi apa?",
    "Reflection in the y-axis maps (x,y) to what?",
    "(−x, y)",
    ["(x, −y)", "(−x, −y)", "(y, x)"],
    "Tanda x berubah dan koordinat-y kekal.",
    "The sign of x changes and y stays the same.",
  ),
  q(
    "Putaran 180° pada asalan mengubah (x,y) menjadi apa?",
    "A 180° rotation about the origin maps (x,y) to what?",
    "(−x, −y)",
    ["(−x, y)", "(x, −y)", "(y, x)"],
    "Kedua-dua tanda koordinat berubah.",
    "Both coordinate signs change.",
  ),
  q(
    "Adakah orientasi berubah selepas translasi?",
    "Does orientation change after a translation?",
    ["Tidak", "No"],
    [
      ["Ya, sentiasa", "Yes, always"],
      ["Hanya bagi segi tiga", "Only for triangles"],
      ["Tidak dapat ditentukan", "Cannot be determined"],
    ],
    "Translasi menggelongsorkan bentuk tanpa memusing atau membalikkan.",
    "A translation slides a shape without turning or flipping it.",
  ),
  q(
    "Antara pantulan, putaran dan translasi, yang manakah membalikkan orientasi?",
    "Among reflection, rotation and translation, which reverses orientation?",
    ["Pantulan", "Reflection"],
    [
      ["Putaran", "Rotation"],
      ["Translasi", "Translation"],
      ["Ketiga-tiganya", "All three"],
    ],
    "Pantulan menghasilkan imej cermin.",
    "Reflection creates a mirror image.",
  ),
];

[
  [3, 5],
  [-4, 2],
  [1, -6],
  [-7, -3],
  [5, 0],
].forEach(([x, y], i) =>
  foundation.push(
    coordinateQuestion(
      `Pantulkan titik P${i + 1}(${x},${y}) pada paksi-x.`,
      `Reflect point P${i + 1}(${x},${y}) in the x-axis.`,
      [x, -y],
      "Kekalkan x dan tukar tanda y.",
      "Keep x and change the sign of y.",
    ),
  ),
);
[
  [2, 3, 4, -1],
  [-5, 1, 3, 2],
  [0, -4, -2, 5],
  [6, -3, -4, -2],
  [-2, 7, 5, -6],
].forEach(([x, y, a, b], i) =>
  foundation.push(
    coordinateQuestion(
      `Titik A${i + 1}(${x},${y}) ditranslasi oleh vektor (${a},${b}). Cari imejnya.`,
      `Point A${i + 1}(${x},${y}) is translated by vector (${a},${b}). Find its image.`,
      [x + a, y + b],
      "Tambah komponen vektor pada koordinat sepadan.",
      "Add each vector component to its corresponding coordinate.",
    ),
  ),
);
[
  [2, 5],
  [-3, 4],
  [6, -1],
  [-2, -7],
  [5, 3],
].forEach(([x, y], i) =>
  foundation.push(
    coordinateQuestion(
      `Putarkan titik B${i + 1}(${x},${y}) sebanyak 180° pada asalan.`,
      `Rotate point B${i + 1}(${x},${y}) through 180° about the origin.`,
      [-x, -y],
      "Putaran 180° menukar kedua-dua tanda.",
      "A 180° rotation changes both signs.",
    ),
  ),
);
[
  [3, 4, 5],
  [5, 12, 13],
  [6, 8, 10],
  [8, 15, 17],
  [7, 24, 25],
].forEach(([a, b, c], i) =>
  foundation.push(
    q(
      `Segi tiga ${i + 1} bersisi ${a}, ${b}, ${c}. Segi tiga lain juga bersisi ${a}, ${b}, ${c}. Apakah hubungannya?`,
      `Triangle ${i + 1} has sides ${a}, ${b}, ${c}. Another triangle has the same three side lengths. What is their relationship?`,
      ["Kongruen", "Congruent"],
      [
        ["Serupa sahaja", "Similar only"],
        ["Tidak kongruen", "Not congruent"],
        ["Tidak boleh dibandingkan", "Cannot be compared"],
      ],
      "Tiga sisi sepadan sama panjang, maka bentuk dan saiz sama.",
      "All three corresponding sides are equal, so shape and size match.",
    ),
  ),
);

const practice: PairedQuizSeed[] = [];
[
  [3, 5, 2],
  [-4, 1, -1],
  [6, -3, 4],
  [-2, -5, 0],
  [8, 2, 5],
].forEach(([x, y, k], i) =>
  practice.push(
    coordinateQuestion(
      `Pantulkan C${i + 1}(${x},${y}) pada garis x=${k}.`,
      `Reflect C${i + 1}(${x},${y}) in the line x=${k}.`,
      [2 * k - x, y],
      "Garis cermin ialah titik tengah koordinat-x objek dan imej.",
      "The mirror line is midway between the object's and image's x-coordinates.",
    ),
  ),
);
[
  [2, 7, 4],
  [-3, 1, -2],
  [5, -6, 0],
  [-4, 3, 5],
  [7, 2, -1],
].forEach(([x, y, k], i) =>
  practice.push(
    coordinateQuestion(
      `Pantulkan D${i + 1}(${x},${y}) pada garis y=${k}.`,
      `Reflect D${i + 1}(${x},${y}) in the line y=${k}.`,
      [x, 2 * k - y],
      "Garis y=k membahagi dua jarak menegak objek-imej.",
      "The line y=k bisects the vertical object-image distance.",
    ),
  ),
);
[
  [2, 5],
  [-3, 4],
  [6, -1],
  [-2, -7],
  [5, 3],
].forEach(([x, y], i) =>
  practice.push(
    coordinateQuestion(
      `Putarkan E${i + 1}(${x},${y}) 90° lawan arah jam pada asalan.`,
      `Rotate E${i + 1}(${x},${y}) 90° anticlockwise about the origin.`,
      [-y, x],
      "Peraturan putaran ialah (x,y)→(−y,x).",
      "The rotation rule is (x,y)→(−y,x).",
    ),
  ),
);
[
  [4, 1],
  [-2, 6],
  [3, -5],
  [-7, -1],
  [5, 8],
].forEach(([x, y], i) =>
  practice.push(
    coordinateQuestion(
      `Putarkan F${i + 1}(${x},${y}) 90° ikut arah jam pada asalan.`,
      `Rotate F${i + 1}(${x},${y}) 90° clockwise about the origin.`,
      [y, -x],
      "Peraturan putaran ialah (x,y)→(y,−x).",
      "The rotation rule is (x,y)→(y,−x).",
    ),
  ),
);
[
  [1, 3, 6, -2],
  [-4, 5, 2, 8],
  [0, -3, -7, 4],
  [6, 1, 1, -5],
  [-2, -6, 5, 0],
].forEach(([x, y, X, Y], i) =>
  practice.push(
    q(
      `Titik G${i + 1}(${x},${y}) dipetakan kepada G′(${X},${Y}) oleh translasi. Cari vektornya.`,
      `Point G${i + 1}(${x},${y}) maps to G′(${X},${Y}) by translation. Find its vector.`,
      point([X - x, Y - y]),
      [point([X + x, Y + y]), point([x - X, y - Y]), point([Y - y, X - x])],
      "Vektor = imej − objek bagi setiap koordinat.",
      "Vector = image − object for each coordinate.",
    ),
  ),
);
[
  [3, 4, 6, 8],
  [5, 7, 5, 7],
  [4, 6, 6, 4],
  [8, 10, 12, 15],
  [6, 9, 9, 6],
].forEach(([a, b, c, d], i) =>
  practice.push(
    q(
      `Segi empat tepat P${i + 1} bersisi ${a} dan ${b}; Q bersisi ${c} dan ${d}. Adakah P dan Q kongruen?`,
      `Rectangle P${i + 1} has sides ${a} and ${b}; Q has sides ${c} and ${d}. Are P and Q congruent?`,
      a * b === c * d && [a, b].sort().join() === [c, d].sort().join()
        ? ["Ya", "Yes"]
        : ["Tidak", "No"],
      [
        ["Ya kerana kedua-duanya segi empat tepat", "Yes because both are rectangles"],
        ["Ya jika luas hampir sama", "Yes if their areas are close"],
        ["Tidak dapat ditentukan", "Cannot be determined"],
      ],
      "Bandingkan kedua-dua panjang sisi sepadan, bukan nama bentuk sahaja.",
      "Compare both corresponding side lengths, not only the shape name.",
    ),
  ),
);

const challenge: PairedQuizSeed[] = [];
[
  [2, 3, 5, -1],
  [-4, 1, 2, 6],
  [0, -5, -3, 4],
  [6, -2, -1, -7],
  [-3, 8, 7, 0],
].forEach(([x, y, X, Y], i) =>
  challenge.push(
    q(
      `Titik H${i + 1}(${x},${y}) dipetakan kepada H′(${X},${Y}). Jika transformasinya translasi, cari imej titik J(${x + 2},${y - 3}).`,
      `Point H${i + 1}(${x},${y}) maps to H′(${X},${Y}). If the transformation is a translation, find the image of J(${x + 2},${y - 3}).`,
      point([X + 2, Y - 3]),
      [point([X - 2, Y + 3]), point([x + 2, y - 3]), point([X + 3, Y - 2])],
      "Gunakan vektor H ke H′ pada J.",
      "Apply the vector from H to H′ to J.",
    ),
  ),
);
[
  [3, 5, -3, 5],
  [-4, 2, 4, 2],
  [6, -1, -6, -1],
  [-2, -7, 2, -7],
  [5, 3, -5, 3],
].forEach(([x, y, X, Y], i) =>
  challenge.push(
    q(
      `P(${x},${y}) dipantulkan kepada P′(${X},${Y}). Apakah garis cermin?`,
      `P(${x},${y}) is reflected to P′(${X},${Y}). What is the mirror line?`,
      `x = 0`,
      ["y = 0", "y = x", "x = 1"],
      "Koordinat-y kekal dan x bertukar tanda, jadi paksi-y ialah garis cermin.",
      "y stays fixed while x changes sign, so the y-axis is the mirror line.",
    ),
  ),
);
[
  [2, 5, -5, 2],
  [-3, 4, -4, -3],
  [6, -1, 1, 6],
  [-2, -7, 7, -2],
  [5, 3, -3, 5],
].forEach(([x, y, X, Y], i) =>
  challenge.push(
    q(
      `Titik K${i + 1}(${x},${y}) dipetakan kepada (${X},${Y}) oleh putaran berpusat di asalan. Nyatakan putaran.`,
      `Point K${i + 1}(${x},${y}) maps to (${X},${Y}) by a rotation about the origin. State the rotation.`,
      ["90° lawan arah jam", "90° anticlockwise"],
      [
        ["90° ikut arah jam", "90° clockwise"],
        ["180°", "180°"],
        ["360°", "360°"],
      ],
      "Pemetaan (x,y)→(−y,x) ialah 90° lawan arah jam.",
      "The mapping (x,y)→(−y,x) is 90° anticlockwise.",
    ),
  ),
);
[
  [1, 2, 4, -1],
  [-3, 5, 2, 8],
  [0, -4, -5, 2],
  [6, 1, 1, -7],
  [-2, -6, 7, 0],
].forEach(([x, y, a, b], i) =>
  challenge.push(
    coordinateQuestion(
      `Titik L${i + 1}(${x},${y}) ditranslasi oleh (${a},${b}), kemudian dipantulkan pada paksi-x. Cari imej akhir.`,
      `Point L${i + 1}(${x},${y}) is translated by (${a},${b}), then reflected in the x-axis. Find the final image.`,
      [x + a, -(y + b)],
      "Lakukan translasi dahulu, kemudian tukar tanda koordinat-y.",
      "Translate first, then change the sign of the y-coordinate.",
    ),
  ),
);
[
  [2, 3],
  [-4, 1],
  [6, -2],
  [-3, -5],
  [5, 7],
].forEach(([x, y], i) =>
  challenge.push(
    coordinateQuestion(
      `Titik M${i + 1}(${x},${y}) diputar 90° ikut arah jam, kemudian ditranslasi oleh (3,−2). Cari imej akhir.`,
      `Point M${i + 1}(${x},${y}) is rotated 90° clockwise, then translated by (3,−2). Find the final image.`,
      [y + 3, -x - 2],
      "Putaran memberi (y,−x), kemudian tambah (3,−2).",
      "Rotation gives (y,−x), then add (3,−2).",
    ),
  ),
);
[
  [3, 4, 5, 3, 4, 5],
  [5, 5, 8, 5, 5, 8],
  [4, 6, 7, 4, 7, 6],
  [6, 8, 10, 12, 16, 20],
  [7, 9, 11, 7, 9, 12],
].forEach(([a, b, c, d, e, f], i) =>
  challenge.push(
    q(
      `Segi tiga A${i + 1} bersisi ${a},${b},${c}; segi tiga B bersisi ${d},${e},${f}. Tentukan sama ada kedua-duanya kongruen.`,
      `Triangle A${i + 1} has sides ${a},${b},${c}; triangle B has sides ${d},${e},${f}. Determine whether they are congruent.`,
      [a, b, c].sort((x, y) => x - y).join() === [d, e, f].sort((x, y) => x - y).join()
        ? ["Kongruen", "Congruent"]
        : ["Tidak kongruen", "Not congruent"],
      [
        ["Kongruen kerana kedua-duanya segi tiga", "Congruent because both are triangles"],
        ["Kongruen jika perimeter hampir sama", "Congruent if perimeters are close"],
        [
          "Tidak dapat ditentukan walaupun sisi diberi",
          "Cannot be determined even with side lengths",
        ],
      ],
      "Susun dan bandingkan ketiga-tiga panjang sisi.",
      "Order and compare all three side lengths.",
    ),
  ),
);

export const mathF2C11PairedSeeds: readonly PairedQuizSeed[] = [
  ...foundation,
  ...practice,
  ...challenge,
];
