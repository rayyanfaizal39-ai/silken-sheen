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
const fmt = (value: number) => `${Number(value.toFixed(2))}`;
/** " + 3", " − 4" or "" for 0, so rules never read "+ 0" or "+ -3". */
const signed = (c: number) => (c === 0 ? "" : ` ${c < 0 ? "−" : "+"} ${Math.abs(c)}`);
/** "3x", "x", "−x", "−2x²" — no "1x" or hyphen-minus coefficients. */
const term = (m: number, v = "x") =>
  m === 1 ? v : m === -1 ? `−${v}` : `${String(m).replace("-", "−")}${v}`;
const lin = (m: number, c: number, v = "x") => `${term(m, v)}${signed(c)}`;
const calc = (
  bm: string,
  dlp: string,
  answer: number,
  bmExplanation: string,
  dlpExplanation: string,
): PairedQuizSeed => {
  const correct = fmt(answer);
  const distractors = [answer + 2, answer - 2, answer * 2, answer / 2, answer + 5]
    .map(fmt)
    .filter((value, index, all) => value !== correct && all.indexOf(value) === index)
    .slice(0, 3);
  return q(
    bm,
    dlp,
    correct,
    distractors as [string, string, string],
    bmExplanation,
    dlpExplanation,
  );
};

const foundation: PairedQuizSeed[] = [
  q(
    "Apakah fungsi?",
    "What is a function?",
    [
      "Hubungan yang memetakan setiap input kepada tepat satu output",
      "A relation mapping every input to exactly one output",
    ],
    [
      [
        "Hubungan yang memberi dua output kepada setiap input",
        "A relation giving two outputs for every input",
      ],
      ["Senarai nombor tanpa aturan", "An unordered list of numbers"],
      ["Graf yang sentiasa melengkung", "A graph that is always curved"],
    ],
    "Setiap nilai input dalam fungsi mempunyai satu output sahaja.",
    "Each input value in a function has exactly one output.",
  ),
  q(
    "Dalam y = f(x), apakah pemboleh ubah input?",
    "In y = f(x), which variable is the input?",
    "x",
    ["y", "f", "xy"],
    "Nilai x dimasukkan ke dalam fungsi untuk menghasilkan y.",
    "x is entered into the function to produce y.",
  ),
  q(
    "Apakah domain suatu fungsi?",
    "What is the domain of a function?",
    ["Set semua nilai input", "The set of all input values"],
    [
      ["Set semua nilai output", "The set of all output values"],
      ["Paksi menegak sahaja", "Only the vertical axis"],
      ["Kecerunan graf", "The gradient of the graph"],
    ],
    "Domain mengandungi nilai x yang dibenarkan.",
    "The domain contains the allowed x-values.",
  ),
  q(
    "Apakah julat suatu fungsi?",
    "What is the range of a function?",
    ["Set semua nilai output", "The set of all output values"],
    [
      ["Set semua nilai input", "The set of all input values"],
      ["Paksi mengufuk sahaja", "Only the horizontal axis"],
      ["Titik asalan", "The origin"],
    ],
    "Julat ialah nilai y yang dihasilkan oleh fungsi.",
    "The range is the set of y-values produced by the function.",
  ),
  q(
    "Graf y = 3x + 2 berbentuk apa?",
    "What is the shape of the graph y = 3x + 2?",
    ["Garis lurus", "A straight line"],
    [
      ["Parabola", "A parabola"],
      ["Bulatan", "A circle"],
      ["Garis menegak", "A vertical line"],
    ],
    "Fungsi linear menghasilkan graf garis lurus.",
    "A linear function produces a straight-line graph.",
  ),
  q(
    "Graf y = x² berbentuk apa?",
    "What is the shape of the graph y = x²?",
    ["Parabola", "A parabola"],
    [
      ["Garis lurus", "A straight line"],
      ["Bulatan", "A circle"],
      ["Segi tiga", "A triangle"],
    ],
    "Fungsi kuadratik menghasilkan parabola.",
    "A quadratic function produces a parabola.",
  ),
  q(
    "Dalam y = mx + c, apakah maksud c?",
    "In y = mx + c, what does c represent?",
    ["Pintasan-y", "The y-intercept"],
    [
      ["Kecerunan", "The gradient"],
      ["Pintasan-x", "The x-intercept"],
      ["Domain", "The domain"],
    ],
    "Apabila x = 0, y = c; maka c ialah pintasan-y.",
    "When x = 0, y = c; hence c is the y-intercept.",
  ),
  q(
    "Dalam y = mx + c, apakah maksud m?",
    "In y = mx + c, what does m represent?",
    ["Kecerunan", "The gradient"],
    [
      ["Pintasan-y", "The y-intercept"],
      ["Julat", "The range"],
      ["Koordinat asalan", "The origin"],
    ],
    "m menunjukkan kadar perubahan y bagi setiap perubahan satu unit x.",
    "m gives the change in y for each unit change in x.",
  ),
  q(
    "Pasangan tertib manakah mewakili x = 2, y = 5?",
    "Which ordered pair represents x = 2, y = 5?",
    "(2, 5)",
    ["(5, 2)", "(2, 2)", "(5, 5)"],
    "Pasangan tertib ditulis sebagai (x, y).",
    "An ordered pair is written as (x, y).",
  ),
  q(
    "Ujian garis menegak digunakan untuk apa?",
    "What is the vertical-line test used for?",
    ["Mengenal pasti graf fungsi", "Identifying a function graph"],
    [
      ["Mengenal pasti luas bawah graf", "Identifying the area under a graph"],
      ["Mengenal pasti titik tengah graf", "Identifying a graph’s midpoint"],
      ["Mengenal pasti skala paksi graf", "Identifying a graph’s axis scale"],
    ],
    "Graf fungsi dipotong paling banyak sekali oleh setiap garis menegak.",
    "A function graph is crossed at most once by every vertical line.",
  ),
];

[
  [2, 3, 4],
  [3, -1, 5],
  [-2, 4, -3],
  [5, 0, 2],
  [-3, -2, 4],
].forEach(([a, b, x], i) => {
  const answer = a * x + b;
  foundation.push(
    calc(
      `Diberi f(x) = ${lin(a, b)}, cari f(${x}).`,
      `Given f(x) = ${lin(a, b)}, find f(${x}).`,
      answer,
      `Gantikan x = ${x}: f(${x}) = ${a}(${x})${signed(b)} = ${answer}.`,
      `Substitute x = ${x}: f(${x}) = ${a}(${x})${signed(b)} = ${answer}.`,
    ),
  );
});
[
  [1, 2, 3],
  [0, 2, 4],
  [-2, 1, 3],
  [3, -1, 2],
  [-1, 4, 5],
].forEach(([start, step, count], i) => {
  const domain = Array.from({ length: count }, (_, k) => start + k * step);
  const range = domain.map((x) => 2 * x + 1);
  foundation.push(
    q(
      `Domain fungsi ${i + 1} ialah {${domain.join(", ")}} dan f(x)=2x+1. Apakah julat?`,
      `The domain of function ${i + 1} is {${domain.join(", ")}} and f(x)=2x+1. What is the range?`,
      `{${range.join(", ")}}`,
      [
        `{${domain.join(", ")}}`,
        `{${domain.map((x) => 2 * x).join(", ")}}`,
        `{${range.map((y) => y + 1).join(", ")}}`,
      ],
      "Gantikan setiap nilai domain ke dalam 2x + 1.",
      "Substitute every domain value into 2x + 1.",
    ),
  );
});
[
  [1, 3],
  [2, -1],
  [-1, 4],
  [3, 0],
  [-2, -3],
].forEach(([m, c], i) => {
  const xs = [-1, 0, 1];
  const ys = xs.map((x) => m * x + c);
  foundation.push(
    q(
      `Jadual ${i + 1} bagi y=${lin(m, c)} menggunakan x = −1, 0, 1. Baris y yang betul ialah?`,
      `Table ${i + 1} for y=${lin(m, c)} uses x = −1, 0, 1. Which y-row is correct?`,
      ys.join(", "),
      [xs.join(", "), ys.map((y) => y + 1).join(", "), ys.slice().reverse().join(", ")],
      "Kira y bagi setiap nilai x mengikut turutan.",
      "Calculate y for each x-value in order.",
    ),
  );
});
foundation.push(
  q(
    "Jika graf garis lurus menaik dari kiri ke kanan, tanda kecerunannya ialah apa?",
    "If a straight-line graph rises from left to right, what is the sign of its gradient?",
    ["Positif", "Positive"],
    [
      ["Negatif", "Negative"],
      ["Sifar", "Zero"],
      ["Tidak ditentukan", "Undefined"],
    ],
    "Nilai y bertambah apabila x bertambah, jadi kecerunan positif.",
    "y increases as x increases, so the gradient is positive.",
  ),
  q(
    "Jika y = 4 apabila x = 0, apakah pintasan-y?",
    "If y = 4 when x = 0, what is the y-intercept?",
    "4",
    ["0", "−4", "1"],
    "Pintasan-y ialah nilai y apabila x = 0.",
    "The y-intercept is the y-value when x = 0.",
  ),
  q(
    "Adakah hubungan {(1,2),(1,3),(2,4)} suatu fungsi?",
    "Is the relation {(1,2),(1,3),(2,4)} a function?",
    ["Tidak", "No"],
    [
      ["Ya", "Yes"],
      ["Hanya jika x positif", "Only if x is positive"],
      ["Tidak dapat ditentukan", "Cannot be determined"],
    ],
    "Input 1 dipetakan kepada dua output berbeza.",
    "Input 1 maps to two different outputs.",
  ),
  q(
    "Adakah hubungan {(1,2),(2,2),(3,2)} suatu fungsi?",
    "Is the relation {(1,2),(2,2),(3,2)} a function?",
    ["Ya", "Yes"],
    [
      ["Tidak", "No"],
      ["Hanya jika output berbeza", "Only if the outputs differ"],
      ["Tidak dapat ditentukan", "Cannot be determined"],
    ],
    "Setiap input mempunyai tepat satu output; output boleh berulang.",
    "Every input has exactly one output; outputs may repeat.",
  ),
  q(
    "Apakah koordinat titik apabila x = 0 bagi y = −2x + 5?",
    "What is the point when x = 0 for y = −2x + 5?",
    "(0, 5)",
    ["(5, 0)", "(0, −2)", "(−2, 5)"],
    "Gantikan x = 0 untuk memperoleh y = 5.",
    "Substitute x = 0 to obtain y = 5.",
  ),
);

const practice: PairedQuizSeed[] = [];
[
  [2, 1, -4],
  [3, -2, 5],
  [-2, 6, 3],
  [4, -5, -2],
  [-3, -1, 4],
  [5, 2, 0],
  [1, -7, 9],
  [-4, 3, -3],
  [6, -4, 2],
  [2, -6, 7],
].forEach(([m, c, x], i) =>
  practice.push(
    calc(
      `Mesin fungsi ${i + 1} menggunakan f(x)=${lin(m, c)}. Cari output apabila x=${x}.`,
      `Function machine ${i + 1} uses f(x)=${lin(m, c)}. Find the output when x=${x}.`,
      m * x + c,
      "Gantikan input ke dalam peraturan fungsi.",
      "Substitute the input into the function rule.",
    ),
  ),
);
[
  [2, 3, 21],
  [3, -1, 14],
  [-2, 5, -9],
  [4, -6, 18],
  [-3, 2, 23],
].forEach(([m, c, y], i) => {
  const x = (y - c) / m;
  practice.push(
    calc(
      `Diberi f(x)=${lin(m, c)} dan f(x)=${y}, cari x.`,
      `Given f(x)=${lin(m, c)} and f(x)=${y}, find x.`,
      x,
      `Selesaikan ${lin(m, c)}=${y}; x=${x}.`,
      `Solve ${lin(m, c)}=${y}; x=${x}.`,
    ),
  );
});
[
  [2, 3, 4],
  [1, -2, 6],
  [-1, 5, 3],
  [3, 1, 2],
  [-2, -3, 4],
].forEach(([m, c, x], i) =>
  practice.push(
    calc(
      `Lengkapkan nilai yang hilang dalam jadual ${i + 1}: y=${lin(m, c)}, x=${x}.`,
      `Complete the missing value in table ${i + 1}: y=${lin(m, c)}, x=${x}.`,
      m * x + c,
      "Gunakan peraturan jadual untuk nilai x yang diberi.",
      "Use the table rule for the given x-value.",
    ),
  ),
);
[
  [1, 5, 3],
  [2, 5, 2],
  [-1, 4, -2],
  [1, -3, 4],
  [-2, 2, -3],
].forEach(([x1, y1, m], i) => {
  const c = y1 - m * x1;
  practice.push(
    q(
      `Garis ${i + 1} berkecerunan ${m} melalui (${x1},${y1}). Apakah persamaannya?`,
      `Line ${i + 1} has gradient ${m} and passes through (${x1},${y1}). What is its equation?`,
      `y = ${lin(m, c)}`,
      [`y = ${lin(c, m)}`, `y = ${lin(m, -c)}`, `y = ${lin(m, y1)}`],
      `Gunakan c = y − mx = ${c}.`,
      `Use c = y − mx = ${c}.`,
    ),
  );
});
[
  [2, 1, 3, 7],
  [-1, 5, 2, 4],
  [3, -4, 0, -4],
  [4, 2, -2, -7],
  [-2, -1, 5, -10],
].forEach(([m, c, x, y], i) => {
  const onGraph = m * x + c;
  const verdicts: [string, string][] = [
    [
      "Ya; nilai y pada graf sama dengan koordinat-y titik",
      "Yes; the graph's y-value equals the point's y-coordinate",
    ],
    ["Tidak; titik itu berada di atas graf", "No; the point lies above the graph"],
    ["Tidak; titik itu berada di bawah graf", "No; the point lies below the graph"],
    ["Tidak dapat ditentukan tanpa melukis graf", "Cannot be determined without drawing the graph"],
  ];
  const verdict = y === onGraph ? 0 : y > onGraph ? 1 : 2;
  const [correct, ...wrong] = [verdicts[verdict], ...verdicts.filter((_, k) => k !== verdict)];
  practice.push(
    q(
      `Adakah titik (${x},${y}) terletak pada graf y=${lin(m, c)}?`,
      `Does (${x},${y}) lie on y=${lin(m, c)}?`,
      correct,
      wrong as [[string, string], [string, string], [string, string]],
      `Apabila x = ${x}, graf memberi y = ${onGraph}; titik itu mempunyai y = ${y}.`,
      `When x = ${x}, the graph gives y = ${onGraph}; the point has y = ${y}.`,
    ),
  );
});

const challenge: PairedQuizSeed[] = [];
[
  [2, 1, -1, 7],
  [3, -4, 1, 6],
  [-2, 8, 2, -4],
  [4, -3, -1, 7],
  [-3, 5, 2, -5],
].forEach(([m1, c1, m2, c2], i) => {
  const x = (c2 - c1) / (m1 - m2),
    y = m1 * x + c1;
  challenge.push(
    q(
      `Cari titik persilangan y=${lin(m1, c1)} dan y=${lin(m2, c2)}.`,
      `Find the intersection of y=${lin(m1, c1)} and y=${lin(m2, c2)}.`,
      `(${fmt(x)}, ${fmt(y)})`,
      [`(${fmt(y)}, ${fmt(x)})`, `(${fmt(-x)}, ${fmt(m1 * -x + c1)})`, `(${fmt(x)}, ${fmt(c1)})`],
      "Samakan kedua-dua ungkapan y, cari x, kemudian y.",
      "Equate both expressions for y, solve x, then y.",
    ),
  );
});
[
  [2, 3, 11],
  [4, -1, 19],
  [-3, 5, -13],
  [5, 2, 17],
  [-2, -4, -18],
].forEach(([x, c, y], i) => {
  const a = (y - c) / x;
  challenge.push(
    calc(
      `Diberi f(x)=ax${signed(c)} dan f(${x})=${y}. Cari a.`,
      `Given f(x)=ax${signed(c)} and f(${x})=${y}. Find a.`,
      a,
      `Daripada a(${x})${signed(c)} = ${y}, a = ${a}.`,
      `From a(${x})${signed(c)} = ${y}, a = ${a}.`,
    ),
  );
});
[
  [1, -4, 3],
  [1, 2, -1],
  [2, -8, 5],
  [-1, 6, 4],
  [3, -12, 6],
].forEach(([a, c, x], i) =>
  challenge.push(
    calc(
      `Bagi g(x)=${lin(a, c, "x²")}, cari g(${x}).`,
      `For g(x)=${lin(a, c, "x²")}, find g(${x}).`,
      a * x * x + c,
      "Kuasa duakan x dahulu, kemudian darab dan tambah pemalar.",
      "Square x first, then multiply and add the constant.",
    ),
  ),
);
[
  [4, 3, 8],
  [6, 5, 7],
  [2.5, 10, 12],
  [7, 0, 6],
  [3, 12, 9],
].forEach(([rate, fixed, hours], i) => {
  const { correct, distractors } = calc("", "", rate * hours + fixed, "", "");
  challenge.push(
    q(
      `Kos C (RM) bagi situasi ${i + 1} diberi C = ${lin(rate, fixed, "t")}, dengan t dalam jam. Cari kos apabila t = ${hours}.`,
      `Cost C (RM) in situation ${i + 1} is C = ${lin(rate, fixed, "t")}, where t is in hours. Find the cost when t = ${hours}.`,
      `RM${correct}`,
      distractors.map((value) => `RM${value}`) as [string, string, string],
      `C = ${rate}(${hours})${signed(fixed)} = RM${fmt(rate * hours + fixed)}.`,
      `C = ${rate}(${hours})${signed(fixed)} = RM${fmt(rate * hours + fixed)}.`,
    ),
  );
});
[
  [2, 3, 4],
  [-1, 5, -2],
  [3, -4, 1],
  [4, 0, -3],
  [-2, -1, 6],
].forEach(([m, c, k], i) => {
  const original = m * k + c;
  challenge.push(
    calc(
      `Graf y=${lin(m, c)} dialih 3 unit ke atas. Cari nilai y baharu apabila x=${k}.`,
      `The graph y=${lin(m, c)} is shifted 3 units upward. Find the new y-value when x=${k}.`,
      original + 3,
      "Nilai asal ditambah 3 kerana anjakan menegak ke atas.",
      "Add 3 to the original value for an upward vertical shift.",
    ),
  );
});
challenge.push(
  q(
    "Graf y=2x+1 dan y=2x−4 mempunyai hubungan apa?",
    "What is the relationship between y=2x+1 and y=2x−4?",
    ["Selari", "Parallel"],
    [
      ["Berserenjang", "Perpendicular"],
      ["Berimpit", "Coincident"],
      ["Bersilang pada paksi-y", "Intersect on the y-axis"],
    ],
    "Kedua-dua garis mempunyai kecerunan 2 tetapi pintasan-y berbeza.",
    "Both lines have gradient 2 but different y-intercepts.",
  ),
  q(
    "Apakah paksi simetri bagi y=(x−3)²+2?",
    "What is the axis of symmetry of y=(x−3)²+2?",
    "x = 3",
    ["x = −3", "y = 2", "x = 2"],
    "Bentuk y=(x−h)²+k mempunyai paksi simetri x=h.",
    "The form y=(x−h)²+k has axis of symmetry x=h.",
  ),
  q(
    "Jika f(x)=2x−1 dan g(x)=x+4, cari f(3)+g(3).",
    "If f(x)=2x−1 and g(x)=x+4, find f(3)+g(3).",
    "12",
    ["5", "7", "14"],
    "f(3)=5 dan g(3)=7, maka jumlahnya 12.",
    "f(3)=5 and g(3)=7, so the total is 12.",
  ),
  q(
    "Bagi y=x²−4, apakah pintasan-x?",
    "For y=x²−4, what are the x-intercepts?",
    ["x = −2 dan x = 2", "x = −2 and x = 2"],
    [
      ["x = −4 dan x = 4", "x = −4 and x = 4"],
      ["x = 0 sahaja", "x = 0 only"],
      ["x = 2 sahaja", "x = 2 only"],
    ],
    "Tetapkan y=0: x²=4, jadi x=±2.",
    "Set y=0: x²=4, so x=±2.",
  ),
  q(
    "Sebuah graf melalui (0,6) dan (3,0). Apakah kecerunannya?",
    "A graph passes through (0,6) and (3,0). What is its gradient?",
    "−2",
    ["2", "−1/2", "6"],
    "m=(0−6)/(3−0)=−2.",
    "m=(0−6)/(3−0)=−2.",
  ),
);

export const mathF2C8PairedSeeds: readonly PairedQuizSeed[] = [
  ...foundation,
  ...practice,
  ...challenge,
];
