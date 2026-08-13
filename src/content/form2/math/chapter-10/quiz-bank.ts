import { numericPairedSeed as n, pairedSeed as q, type PairedQuizSeed } from "../paired-quiz-bank";

const foundation: PairedQuizSeed[] = [
  q(
    "Rumus kecerunan antara dua titik ialah apa?",
    "What is the gradient formula between two points?",
    "(y₂ − y₁)/(x₂ − x₁)",
    ["(x₂ − x₁)/(y₂ − y₁)", "(y₂ + y₁)/(x₂ + x₁)", "y₂ − y₁ + x₂ − x₁"],
    "Kecerunan ialah perubahan menegak dibahagi perubahan mengufuk.",
    "Gradient is vertical change divided by horizontal change.",
  ),
  q(
    "Garis yang menaik dari kiri ke kanan mempunyai kecerunan bagaimana?",
    "What gradient does a line rising from left to right have?",
    ["Positif", "Positive"],
    [
      ["Negatif", "Negative"],
      ["Sifar", "Zero"],
      ["Tidak ditentukan", "Undefined"],
    ],
    "Nilai y meningkat apabila x meningkat.",
    "y increases as x increases.",
  ),
  q(
    "Apakah kecerunan garis mengufuk?",
    "What is the gradient of a horizontal line?",
    "0",
    ["1", "−1", "Tidak ditentukan"],
    "Perubahan menegak ialah sifar.",
    "The vertical change is zero.",
  ),
  q(
    "Apakah kecerunan garis menegak?",
    "What is the gradient of a vertical line?",
    ["Tidak ditentukan", "Undefined"],
    [
      ["Sifar", "Zero"],
      ["Satu", "One"],
      ["Negatif satu", "Negative one"],
    ],
    "Perubahan mengufuk sifar menyebabkan pembahagian dengan sifar.",
    "Zero horizontal change would require division by zero.",
  ),
  q(
    "Kecerunan graf jarak-masa mewakili apa?",
    "What does the gradient of a distance-time graph represent?",
    ["Laju", "Speed"],
    [
      ["Pecutan", "Acceleration"],
      ["Jarak", "Distance"],
      ["Luas", "Area"],
    ],
    "Perubahan jarak dibahagi perubahan masa ialah laju.",
    "Change in distance divided by change in time is speed.",
  ),
  q(
    "Garis mengufuk pada graf jarak-masa menunjukkan apa?",
    "What does a horizontal line on a distance-time graph show?",
    ["Objek berhenti", "The object is stationary"],
    [
      ["Objek memecut", "The object accelerates"],
      ["Objek berpatah balik", "The object turns back"],
      ["Objek bergerak paling laju", "The object moves fastest"],
    ],
    "Jarak tidak berubah apabila masa berlalu.",
    "Distance does not change as time passes.",
  ),
  q(
    "Kecerunan graf laju-masa mewakili apa?",
    "What does the gradient of a speed-time graph represent?",
    ["Pecutan", "Acceleration"],
    [
      ["Jarak", "Distance"],
      ["Laju purata", "Average speed"],
      ["Masa", "Time"],
    ],
    "Perubahan laju dibahagi masa ialah pecutan.",
    "Change in speed divided by time is acceleration.",
  ),
  q(
    "Luas di bawah graf laju-masa mewakili apa?",
    "What does the area under a speed-time graph represent?",
    ["Jarak", "Distance"],
    [
      ["Pecutan", "Acceleration"],
      ["Kecerunan", "Gradient"],
      ["Masa", "Time"],
    ],
    "Laju × masa memberikan jarak.",
    "Speed × time gives distance.",
  ),
  q(
    "Garis mengufuk pada graf laju-masa menunjukkan apa?",
    "What does a horizontal line on a speed-time graph show?",
    ["Laju seragam", "Constant speed"],
    [
      ["Objek berhenti semestinya", "The object is necessarily stationary"],
      ["Pecutan meningkat", "Increasing acceleration"],
      ["Jarak berkurang", "Decreasing distance"],
    ],
    "Laju tidak berubah, maka pecutan sifar.",
    "Speed is unchanged, so acceleration is zero.",
  ),
  q(
    "Apakah unit luas di bawah graf laju (m/s) melawan masa (s)?",
    "What is the unit of area under a speed (m/s) against time (s) graph?",
    "m",
    ["m/s", "m/s²", "s/m"],
    "(m/s) × s = m.",
    "(m/s) × s = m.",
  ),
];

[
  [0, 1, 4, 9],
  [2, 3, 8, 15],
  [-3, 5, 5, -7],
  [1, -4, 7, 8],
  [-6, -2, 2, 2],
].forEach(([x1, y1, x2, y2], i) =>
  foundation.push(
    n(
      `Garis ${i + 1} melalui (${x1},${y1}) dan (${x2},${y2}). Cari kecerunan.`,
      `Line ${i + 1} passes through (${x1},${y1}) and (${x2},${y2}). Find its gradient.`,
      (y2 - y1) / (x2 - x1),
      "",
      `m=(${y2}−${y1})/(${x2}−${x1}).`,
      `m=(${y2}−${y1})/(${x2}−${x1}).`,
    ),
  ),
);
[
  [60, 2],
  [120, 3],
  [75, 1.5],
  [180, 4],
  [48, 0.8],
].forEach(([d, t], i) =>
  foundation.push(
    n(
      `Pada graf jarak-masa ${i + 1}, jarak meningkat secara lurus daripada 0 kepada ${d} km dalam ${t} jam. Cari kecerunan.`,
      `On distance-time graph ${i + 1}, distance rises linearly from 0 to ${d} km in ${t} hours. Find the gradient.`,
      d / t,
      " km/h",
      "Kecerunan = perubahan jarak ÷ perubahan masa.",
      "Gradient = change in distance ÷ change in time.",
    ),
  ),
);
[
  [4, 16, 6],
  [10, 25, 5],
  [20, 8, 4],
  [0, 18, 3],
  [30, 15, 5],
].forEach(([u, v, t], i) =>
  foundation.push(
    n(
      `Graf laju-masa ${i + 1} berubah secara lurus daripada ${u} m/s kepada ${v} m/s dalam ${t} s. Cari kecerunan.`,
      `Speed-time graph ${i + 1} changes linearly from ${u} m/s to ${v} m/s in ${t} s. Find its gradient.`,
      (v - u) / t,
      " m/s²",
      "Kecerunan = perubahan laju ÷ masa.",
      "Gradient = change in speed ÷ time.",
    ),
  ),
);
[
  [12, 5],
  [18, 8],
  [25, 4],
  [9, 12],
  [30, 2.5],
].forEach(([speed, time], i) =>
  foundation.push(
    n(
      `Graf laju-masa ${i + 1} mengufuk pada ${speed} m/s selama ${time} s. Cari luas di bawah graf.`,
      `Speed-time graph ${i + 1} is horizontal at ${speed} m/s for ${time} s. Find the area under it.`,
      speed * time,
      " m",
      "Luas segi empat tepat = laju × masa.",
      "Rectangle area = speed × time.",
    ),
  ),
);

const practice: PairedQuizSeed[] = [];
[
  [2, 5, 8],
  [3, -4, 7],
  [-2, 6, -1],
  [4, 1, 5],
  [-3, -2, 4],
].forEach(([m, x1, y1], i) =>
  practice.push(
    n(
      `Garis ${i + 1} berkecerunan ${m} melalui (${x1},${y1}). Cari nilai y apabila x=${x1 + 3}.`,
      `Line ${i + 1} has gradient ${m} and passes through (${x1},${y1}). Find y when x=${x1 + 3}.`,
      y1 + 3 * m,
      "",
      "Gunakan perubahan y = m × perubahan x.",
      "Use change in y = m × change in x.",
    ),
  ),
);
[
  [0, 0, 4, 8],
  [2, 7, 8, -5],
  [-3, 6, 5, 6],
  [1, -2, 1, 9],
  [-4, 10, 2, -2],
].forEach(([x1, y1, x2, y2], i) =>
  practice.push(
    q(
      `Kelaskan kecerunan garis ${i + 1} melalui (${x1},${y1}) dan (${x2},${y2}).`,
      `Classify the gradient of line ${i + 1} through (${x1},${y1}) and (${x2},${y2}).`,
      x2 === x1
        ? ["Tidak ditentukan", "Undefined"]
        : y2 === y1
          ? ["Sifar", "Zero"]
          : (y2 - y1) / (x2 - x1) > 0
            ? ["Positif", "Positive"]
            : ["Negatif", "Negative"],
      [
        ["Sentiasa satu", "Always one"],
        ["Sentiasa positif", "Always positive"],
        ["Tidak boleh dikelaskan", "Cannot be classified"],
      ],
      "Bandingkan perubahan menegak dan mengufuk.",
      "Compare vertical and horizontal changes.",
    ),
  ),
);
[
  [40, 1, 70, 2.5],
  [30, 0.5, 90, 2],
  [60, 1.5, 120, 3],
  [25, 0.25, 85, 1.75],
  [80, 2, 140, 3.5],
].forEach(([d1, t1, d2, t2], i) =>
  practice.push(
    n(
      `Graf jarak-masa ${i + 1} melalui (${t1} jam, ${d1} km) dan (${t2} jam, ${d2} km). Cari laju pada segmen itu.`,
      `Distance-time graph ${i + 1} passes through (${t1} h, ${d1} km) and (${t2} h, ${d2} km). Find the speed on that segment.`,
      (d2 - d1) / (t2 - t1),
      " km/h",
      "Cari kecerunan antara dua titik graf.",
      "Find the gradient between the two graph points.",
    ),
  ),
);
[
  [0, 20, 8],
  [5, 25, 10],
  [12, 4, 4],
  [8, 32, 6],
  [18, 0, 9],
].forEach(([u, v, t], i) =>
  practice.push(
    n(
      `Pada graf laju-masa ${i + 1}, laju berubah sekata daripada ${u} m/s kepada ${v} m/s dalam ${t} s. Cari jarak.`,
      `On speed-time graph ${i + 1}, speed changes uniformly from ${u} m/s to ${v} m/s in ${t} s. Find the distance.`,
      ((u + v) * t) / 2,
      " m",
      "Luas trapezium = ½(jumlah sisi selari) × masa.",
      "Trapezium area = ½(sum of parallel sides) × time.",
    ),
  ),
);
[
  [10, 4, 6],
  [15, 3, 5],
  [8, 6, 4],
  [20, 2.5, 7.5],
  [12, 5, 3],
].forEach(([speed, move, stop], i) =>
  practice.push(
    n(
      `Graf jarak-masa ${i + 1} menunjukkan gerakan pada ${speed} km/h selama ${move} jam, kemudian berhenti ${stop} jam. Cari jarak akhir.`,
      `Distance-time graph ${i + 1} shows motion at ${speed} km/h for ${move} hours, followed by a stop of ${stop} hours. Find the final distance.`,
      speed * move,
      " km",
      "Bahagian mengufuk ketika berhenti tidak menambah jarak.",
      "The horizontal stopping segment adds no distance.",
    ),
  ),
);
[
  [6, 5, 12, 4],
  [10, 3, 18, 6],
  [4, 8, 16, 5],
  [15, 2, 9, 4],
  [7, 6, 21, 3],
].forEach(([s1, t1, s2, t2], i) =>
  practice.push(
    n(
      `Graf laju-masa ${i + 1} mempunyai dua bahagian mengufuk: ${s1} m/s selama ${t1} s dan ${s2} m/s selama ${t2} s. Cari jumlah jarak.`,
      `Speed-time graph ${i + 1} has two horizontal sections: ${s1} m/s for ${t1} s and ${s2} m/s for ${t2} s. Find total distance.`,
      s1 * t1 + s2 * t2,
      " m",
      "Tambah luas dua segi empat tepat.",
      "Add the areas of the two rectangles.",
    ),
  ),
);

const challenge: PairedQuizSeed[] = [];
[
  [0, 0, 3, 6, 7, 14],
  [1, 5, 4, -1, 8, -9],
  [-2, 3, 2, 11, 5, 17],
  [0, 8, 5, 8, 9, 8],
  [-4, -6, 0, 2, 6, 14],
].forEach(([x1, y1, x2, y2, x3, y3], i) =>
  challenge.push(
    q(
      `Adakah titik (${x1},${y1}), (${x2},${y2}) dan (${x3},${y3}) segaris bagi kes ${i + 1}?`,
      `Are (${x1},${y1}), (${x2},${y2}) and (${x3},${y3}) collinear in case ${i + 1}?`,
      ["Ya", "Yes"],
      [
        ["Tidak", "No"],
        ["Hanya dua titik segaris", "Only two points are collinear"],
        ["Tidak dapat ditentukan", "Cannot be determined"],
      ],
      "Kecerunan pasangan titik berturutan adalah sama.",
      "The gradients of consecutive pairs are equal.",
    ),
  ),
);
[
  [2, 4, 7],
  [3, -5, 11],
  [-2, 6, -4],
  [4, 1, 13],
  [-3, -2, 10],
].forEach(([m, x1, y1], i) => {
  const y2 = y1 + 5 * m;
  challenge.push(
    n(
      `Garis ${i + 1} melalui (${x1},${y1}) dan (${x1 + 5},k) dengan kecerunan ${m}. Cari k.`,
      `Line ${i + 1} passes through (${x1},${y1}) and (${x1 + 5},k) with gradient ${m}. Find k.`,
      y2,
      "",
      "Gunakan m=(k−y₁)/(x₂−x₁).",
      "Use m=(k−y₁)/(x₂−x₁).",
    ),
  );
});
[
  [0, 15, 5, 15, 4],
  [5, 25, 4, 10, 3],
  [8, 20, 6, 20, 5],
  [0, 24, 8, 12, 4],
  [10, 30, 5, 15, 6],
].forEach(([u, v, t1, s2, t2], i) =>
  challenge.push(
    n(
      `Graf laju-masa ${i + 1}: laju berubah sekata daripada ${u} kepada ${v} m/s dalam ${t1} s, kemudian kekal ${s2} m/s selama ${t2} s. Cari jumlah jarak.`,
      `Speed-time graph ${i + 1}: speed changes uniformly from ${u} to ${v} m/s in ${t1} s, then remains at ${s2} m/s for ${t2} s. Find total distance.`,
      ((u + v) * t1) / 2 + s2 * t2,
      " m",
      "Tambah luas trapezium dan segi empat tepat.",
      "Add the trapezium and rectangle areas.",
    ),
  ),
);
[
  [0, 20, 5, 4],
  [10, 30, 4, 6],
  [5, 25, 8, 3],
  [12, 0, 6, 5],
  [8, 32, 3, 7],
].forEach(([u, v, t1, t2], i) =>
  challenge.push(
    n(
      `Graf laju-masa ${i + 1} berubah daripada ${u} kepada ${v} m/s dalam ${t1} s, kemudian daripada ${v} kepada 0 dalam ${t2} s. Cari jarak keseluruhan.`,
      `Speed-time graph ${i + 1} changes from ${u} to ${v} m/s in ${t1} s, then from ${v} to 0 in ${t2} s. Find total distance.`,
      ((u + v) * t1) / 2 + (v * t2) / 2,
      " m",
      "Jumlahkan luas dua bahagian trapezium/segitiga.",
      "Add the areas of the two trapezium/triangle sections.",
    ),
  ),
);
[
  [120, 2, 0.5, 40],
  [180, 3, 0.75, 60],
  [90, 1.5, 0.25, 30],
  [240, 4, 1, 80],
  [150, 2.5, 0.5, 50],
].forEach(([d, t, stop, returnSpeed], i) =>
  challenge.push(
    n(
      `Graf jarak-masa perjalanan ${i + 1} menunjukkan ${d} km ditempuh dalam ${t} jam, berhenti ${stop} jam, kemudian pulang ${d} km pada ${returnSpeed} km/h. Cari tempoh keseluruhan.`,
      `Distance-time graph ${i + 1} shows ${d} km travelled in ${t} hours, a ${stop}-hour stop, then ${d} km returned at ${returnSpeed} km/h. Find total duration.`,
      t + stop + d / returnSpeed,
      " jam",
      "Jumlahkan masa pergi, berhenti dan pulang.",
      "Add outward, stopping and return times.",
    ),
  ),
);
[
  [10, 50, 8],
  [12, 72, 10],
  [15, 90, 12],
  [8, 48, 6],
  [20, 100, 5],
].forEach(([height, area, base], i) =>
  challenge.push(
    n(
      `Kawasan di bawah satu bahagian graf laju-masa ${i + 1} berbentuk trapezium seluas ${area} m dengan tempoh ${base} s dan laju awal ${height} m/s. Cari laju akhir.`,
      `One section under speed-time graph ${i + 1} is a trapezium of area ${area} m, duration ${base} s and initial speed ${height} m/s. Find the final speed.`,
      (2 * area) / base - height,
      " m/s",
      "Daripada luas = ½(u+v)t, susun semula untuk v.",
      "From area = ½(u+v)t, rearrange for v.",
    ),
  ),
);

export const mathF2C10PairedSeeds: readonly PairedQuizSeed[] = [
  ...foundation,
  ...practice,
  ...challenge,
];
