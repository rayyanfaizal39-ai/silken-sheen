import { numericPairedSeed as n, pairedSeed as q, type PairedQuizSeed } from "../paired-quiz-bank";

const foundation: PairedQuizSeed[] = [
  q(
    "Apakah maksud laju?",
    "What is speed?",
    ["Jarak yang dilalui per unit masa", "Distance travelled per unit time"],
    [
      ["Masa per unit jarak", "Time per unit distance"],
      ["Perubahan laju per unit masa", "Change in speed per unit time"],
      ["Jumlah jarak dan masa", "Sum of distance and time"],
    ],
    "Laju ialah kadar perubahan jarak terhadap masa.",
    "Speed is the rate of change of distance with time.",
  ),
  q(
    "Rumus laju ialah apa?",
    "What is the formula for speed?",
    ["jarak ÷ masa", "distance ÷ time"],
    [
      ["jarak × masa", "distance × time"],
      ["masa ÷ jarak", "time ÷ distance"],
      ["jarak + masa", "distance + time"],
    ],
    "Bahagikan jarak dengan masa.",
    "Divide distance by time.",
  ),
  q(
    "Rumus laju purata ialah apa?",
    "What is the formula for average speed?",
    ["jumlah jarak ÷ jumlah masa", "total distance ÷ total time"],
    [
      ["jumlah masa ÷ jumlah jarak", "total time ÷ total distance"],
      ["jumlah semua laju ÷ 2", "sum of all speeds ÷ 2"],
      ["jarak terjauh ÷ masa terpantas", "longest distance ÷ shortest time"],
    ],
    "Laju purata menggunakan keseluruhan jarak dan keseluruhan masa.",
    "Average speed uses the total distance and total time.",
  ),
  q(
    "Apakah maksud pecutan?",
    "What is acceleration?",
    ["Perubahan laju per unit masa", "Change in speed per unit time"],
    [
      ["Jarak per unit masa", "Distance per unit time"],
      ["Jumlah laju dan masa", "Sum of speed and time"],
      ["Masa per unit jarak", "Time per unit distance"],
    ],
    "Pecutan mengukur kadar perubahan laju.",
    "Acceleration measures the rate of change of speed.",
  ),
  q(
    "Apakah unit SI bagi pecutan?",
    "What is the SI unit of acceleration?",
    "m/s²",
    ["m/s", "km/h", "m²/s"],
    "Pecutan ialah perubahan m/s bagi setiap saat, iaitu m/s².",
    "Acceleration is change in m/s per second, hence m/s².",
  ),
  q(
    "Nyahpecutan berlaku apabila apa?",
    "When does deceleration occur?",
    ["Laju berkurang dengan masa", "Speed decreases with time"],
    [
      ["Laju kekal", "Speed remains constant"],
      ["Jarak menjadi sifar", "Distance becomes zero"],
      ["Masa berkurang", "Time decreases"],
    ],
    "Nyahpecutan ialah pecutan negatif yang mengurangkan laju.",
    "Deceleration is negative acceleration that reduces speed.",
  ),
  q(
    "1 m/s bersamaan dengan berapa km/h?",
    "What is 1 m/s in km/h?",
    "3.6 km/h",
    ["0.36 km/h", "36 km/h", "1000 km/h"],
    "Darab m/s dengan 3.6.",
    "Multiply m/s by 3.6.",
  ),
  q(
    "1 km/h bersamaan dengan berapa m/s?",
    "What is 1 km/h in m/s?",
    "5/18 m/s",
    ["18/5 m/s", "3.6 m/s", "60 m/s"],
    "Darab km/h dengan 5/18.",
    "Multiply km/h by 5/18.",
  ),
  q(
    "Sebuah objek bergerak pada 12 m/s selama 5 s. Kuantiti manakah boleh dicari melalui 12 × 5?",
    "An object moves at 12 m/s for 5 s. Which quantity is found by 12 × 5?",
    ["Jarak", "Distance"],
    [
      ["Pecutan", "Acceleration"],
      ["Laju purata baharu", "New average speed"],
      ["Nyahpecutan", "Deceleration"],
    ],
    "Jarak = laju × masa.",
    "Distance = speed × time.",
  ),
  q(
    "Dua perjalanan mempunyai laju berbeza. Mengapakah purata aritmetik kedua-dua laju tidak semestinya laju purata?",
    "Two legs have different speeds. Why is their arithmetic mean not necessarily the average speed?",
    [
      "Jarak atau masa setiap perjalanan mungkin berbeza",
      "The distance or time for each leg may differ",
    ],
    [
      ["Laju tidak mempunyai unit", "Speed has no unit"],
      ["Laju purata sentiasa sifar", "Average speed is always zero"],
      ["Masa tidak digunakan", "Time is not used"],
    ],
    "Laju purata mesti berdasarkan jumlah jarak dan jumlah masa.",
    "Average speed must use total distance and total time.",
  ),
];

[
  [120, 2],
  [150, 3],
  [96, 1.5],
  [210, 3.5],
  [72, 0.8],
].forEach(([d, t], i) =>
  foundation.push(
    n(
      `Kenderaan ${i + 1} bergerak ${d} km dalam ${t} jam. Cari lajunya.`,
      `Vehicle ${i + 1} travels ${d} km in ${t} hours. Find its speed.`,
      d / t,
      " km/h",
      `Laju = ${d} ÷ ${t} = ${d / t} km/h.`,
      `Speed = ${d} ÷ ${t} = ${d / t} km/h.`,
    ),
  ),
);
[
  [18, "ms"],
  [72, "kmh"],
  [25, "ms"],
  [90, "kmh"],
  [12.5, "ms"],
].forEach(([raw, kind], i) => {
  const value = Number(raw);
  const answer = kind === "ms" ? value * 3.6 : value / 3.6;
  foundation.push(
    n(
      kind === "ms" ? `Tukar ${value} m/s kepada km/h.` : `Tukar ${value} km/h kepada m/s.`,
      kind === "ms" ? `Convert ${value} m/s to km/h.` : `Convert ${value} km/h to m/s.`,
      answer,
      kind === "ms" ? " km/h" : " m/s",
      kind === "ms" ? "Darab dengan 3.6." : "Bahagi dengan 3.6.",
      kind === "ms" ? "Multiply by 3.6." : "Divide by 3.6.",
    ),
  );
});
[
  [4, 16, 6],
  [10, 22, 4],
  [18, 6, 3],
  [0, 15, 5],
  [25, 10, 5],
].forEach(([u, v, t], i) =>
  foundation.push(
    n(
      `Laju objek ${i + 1} berubah daripada ${u} m/s kepada ${v} m/s dalam ${t} s. Cari pecutan.`,
      `The speed of object ${i + 1} changes from ${u} m/s to ${v} m/s in ${t} s. Find the acceleration.`,
      (v - u) / t,
      " m/s²",
      `a = (${v} − ${u}) ÷ ${t} = ${(v - u) / t} m/s².`,
      `a = (${v} − ${u}) ÷ ${t} = ${(v - u) / t} m/s².`,
    ),
  ),
);
[
  [15, 8],
  [22, 6],
  [9, 12],
  [30, 2.5],
  [7.5, 16],
].forEach(([s, t], i) =>
  foundation.push(
    n(
      `Seorang pelari ${i + 1} bergerak pada ${s} m/s selama ${t} s. Cari jarak.`,
      `Runner ${i + 1} moves at ${s} m/s for ${t} s. Find the distance.`,
      s * t,
      " m",
      `Jarak = ${s} × ${t} = ${s * t} m.`,
      `Distance = ${s} × ${t} = ${s * t} m.`,
    ),
  ),
);

const practice: PairedQuizSeed[] = [];
[
  [60, 1, 90, 1.5],
  [80, 1.2, 40, 0.8],
  [45, 0.75, 75, 1.25],
  [100, 2, 50, 0.5],
  [72, 1.5, 108, 2],
].forEach(([d1, t1, d2, t2], i) =>
  practice.push(
    n(
      `Perjalanan ${i + 1} meliputi ${d1} km dalam ${t1} jam dan ${d2} km dalam ${t2} jam. Cari laju purata.`,
      `Journey ${i + 1} covers ${d1} km in ${t1} hours and ${d2} km in ${t2} hours. Find the average speed.`,
      (d1 + d2) / (t1 + t2),
      " km/h",
      "Bahagikan jumlah jarak dengan jumlah masa.",
      "Divide total distance by total time.",
    ),
  ),
);
[
  [120, 2, 0.5],
  [180, 3, 0.75],
  [96, 1.5, 0.5],
  [210, 3.5, 1],
  [150, 2.5, 0.25],
].forEach(([d, moving, stop], i) =>
  practice.push(
    n(
      `Bas ${i + 1} menempuh ${d} km dalam ${moving} jam dan berhenti ${stop} jam. Cari laju purata bagi seluruh perjalanan.`,
      `Bus ${i + 1} covers ${d} km in ${moving} hours and stops for ${stop} hours. Find the average speed for the whole journey.`,
      d / (moving + stop),
      " km/h",
      "Masa berhenti termasuk dalam jumlah masa.",
      "Stopping time is included in total time.",
    ),
  ),
);
[
  [18, 25],
  [20, 36],
  [12.5, 48],
  [15, 42],
  [22, 30],
].forEach(([speed, time], i) =>
  practice.push(
    n(
      `Mesin ${i + 1} bergerak pada ${speed} m/s selama ${time} s. Cari jarak dalam kilometer.`,
      `Machine ${i + 1} moves at ${speed} m/s for ${time} s. Find the distance in kilometres.`,
      (speed * time) / 1000,
      " km",
      "Cari jarak dalam meter, kemudian bahagi 1000.",
      "Find the distance in metres, then divide by 1000.",
    ),
  ),
);
[
  [5, 23, 6],
  [12, 30, 9],
  [20, 8, 4],
  [0, 28, 7],
  [32, 17, 5],
].forEach(([u, v, t], i) =>
  practice.push(
    n(
      `Laju motosikal ${i + 1} berubah daripada ${u} m/s kepada ${v} m/s dalam ${t} s. Tentukan pecutannya.`,
      `The speed of motorcycle ${i + 1} changes from ${u} m/s to ${v} m/s in ${t} s. Determine its acceleration.`,
      (v - u) / t,
      " m/s²",
      "Gunakan perubahan laju dibahagi masa.",
      "Use change in speed divided by time.",
    ),
  ),
);
[
  [30, 12, 6],
  [25, 5, 4],
  [18, 0, 3],
  [40, 16, 8],
  [22, 10, 2],
].forEach(([u, v, t], i) =>
  practice.push(
    n(
      `Kenderaan ${i + 1} memperlahankan laju daripada ${u} m/s kepada ${v} m/s dalam ${t} s. Cari magnitud nyahpecutan.`,
      `Vehicle ${i + 1} slows from ${u} m/s to ${v} m/s in ${t} s. Find the magnitude of deceleration.`,
      (u - v) / t,
      " m/s²",
      "Magnitud nyahpecutan = (laju awal − laju akhir) ÷ masa.",
      "Deceleration magnitude = (initial speed − final speed) ÷ time.",
    ),
  ),
);
[
  [3, 4, 19],
  [2.5, 6, 23],
  [4, 5, 32],
  [1.5, 8, 20],
  [2, 7, 29],
].forEach(([a, t, v], i) =>
  practice.push(
    n(
      `Objek ${i + 1} memecut pada ${a} m/s² selama ${t} s hingga ${v} m/s. Cari laju awal.`,
      `Object ${i + 1} accelerates at ${a} m/s² for ${t} s to ${v} m/s. Find its initial speed.`,
      v - a * t,
      " m/s",
      "Daripada a=(v−u)/t, u=v−at.",
      "From a=(v−u)/t, u=v−at.",
    ),
  ),
);

const challenge: PairedQuizSeed[] = [];
[
  [60, 40, 80],
  [90, 45, 60],
  [120, 50, 75],
  [75, 30, 50],
  [100, 55, 110],
].forEach(([d, out, back], i) =>
  challenge.push(
    n(
      `Seorang penunggang ${i + 1} pergi sejauh ${d} km pada ${out} km/h dan pulang melalui jarak sama pada ${back} km/h. Cari laju purata.`,
      `Rider ${i + 1} travels ${d} km outward at ${out} km/h and returns the same distance at ${back} km/h. Find the average speed.`,
      (2 * d) / (d / out + d / back),
      " km/h",
      "Jumlah jarak ialah dua kali jarak sehala; tambah kedua-dua masa.",
      "Total distance is twice the one-way distance; add both travel times.",
    ),
  ),
);
[
  [180, 3, 0.5],
  [240, 4, 1],
  [150, 2.5, 0.25],
  [300, 5, 0.75],
  [210, 3.5, 0.5],
].forEach(([d, planned, delay], i) =>
  challenge.push(
    n(
      `Perjalanan ${i + 1} sejauh ${d} km dirancang dalam ${planned} jam. Selepas kelewatan ${delay} jam sebelum bergerak, apakah laju tetap diperlukan untuk tiba mengikut masa asal?`,
      `Journey ${i + 1} of ${d} km was planned for ${planned} hours. After a ${delay}-hour delay before departure, what constant speed is needed to arrive on time?`,
      d / (planned - delay),
      " km/h",
      "Masa bergerak yang tinggal = masa dirancang − kelewatan.",
      "Remaining travel time = planned time − delay.",
    ),
  ),
);
[
  [30, 0.5, 45, 1, 60, 0.5],
  [24, 0.25, 36, 0.5, 48, 0.75],
  [50, 1, 75, 0.5, 40, 1.5],
  [18, 0.5, 27, 0.75, 36, 0.25],
  [64, 0.8, 80, 1, 48, 1.2],
].forEach(([s1, t1, s2, t2, s3, t3], i) =>
  challenge.push(
    n(
      `Robot ${i + 1} bergerak pada ${s1} km/h selama ${t1} jam, ${s2} km/h selama ${t2} jam dan ${s3} km/h selama ${t3} jam. Cari laju purata.`,
      `Robot ${i + 1} moves at ${s1} km/h for ${t1} hours, ${s2} km/h for ${t2} hours and ${s3} km/h for ${t3} hours. Find the average speed.`,
      (s1 * t1 + s2 * t2 + s3 * t3) / (t1 + t2 + t3),
      " km/h",
      "Jumlahkan jarak setiap peringkat dan bahagi dengan jumlah masa.",
      "Sum the distance for each stage and divide by total time.",
    ),
  ),
);
[
  [10, 28, 6, 4],
  [15, 33, 9, 3],
  [8, 20, 4, 2],
  [22, 10, 6, 4],
  [5, 25, 5, 5],
].forEach(([u, v, t, extra], i) => {
  const a = (v - u) / t;
  challenge.push(
    n(
      `Objek ${i + 1} berubah daripada ${u} m/s kepada ${v} m/s dalam ${t} s pada pecutan seragam, kemudian memecut ${extra} s lagi pada kadar sama. Cari laju akhirnya.`,
      `Object ${i + 1} changes from ${u} m/s to ${v} m/s in ${t} s at uniform acceleration, then accelerates for another ${extra} s at the same rate. Find its final speed.`,
      v + a * extra,
      " m/s",
      "Cari pecutan daripada peringkat pertama, kemudian tambah perubahan laju seterusnya.",
      "Find acceleration from the first stage, then add the next speed change.",
    ),
  );
});
[
  [72, 18, 10],
  [90, 25, 12],
  [54, 15, 8],
  [108, 30, 15],
  [63, 17.5, 9],
].forEach(([kmh, u, t], i) => {
  const v = kmh / 3.6;
  challenge.push(
    n(
      `Laju akhir kereta ${i + 1} ialah ${kmh} km/h. Jika laju awal ${u} m/s dicapai selepas ${t} s, cari pecutan dalam m/s².`,
      `The final speed of car ${i + 1} is ${kmh} km/h. If it starts at ${u} m/s and reaches that speed after ${t} s, find the acceleration in m/s².`,
      (v - u) / t,
      " m/s²",
      "Tukar laju akhir kepada m/s sebelum menggunakan rumus pecutan.",
      "Convert final speed to m/s before using the acceleration formula.",
    ),
  );
});
[
  [120, 60, 90, 45],
  [150, 75, 100, 50],
  [96, 48, 72, 36],
  [180, 90, 120, 80],
  [210, 70, 140, 56],
].forEach(([d1, s1, d2, s2], i) =>
  challenge.push(
    n(
      `Laluan A ${i + 1} ialah ${d1} km pada ${s1} km/h, diikuti laluan B ${d2} km pada ${s2} km/h. Berapa minitkah keseluruhan perjalanan?`,
      `Route A ${i + 1} is ${d1} km at ${s1} km/h, followed by route B of ${d2} km at ${s2} km/h. How many minutes does the whole journey take?`,
      (d1 / s1 + d2 / s2) * 60,
      " min",
      "Tambah masa kedua-dua laluan dalam jam, kemudian darab 60.",
      "Add both route times in hours, then multiply by 60.",
    ),
  ),
);

export const mathF2C9PairedSeeds: readonly PairedQuizSeed[] = [
  ...foundation,
  ...practice,
  ...challenge,
];
