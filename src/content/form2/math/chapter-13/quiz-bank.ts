import { numericPairedSeed as n, pairedSeed as q, type PairedQuizSeed } from "../paired-quiz-bank";

const fraction = (a: number, b: number) => {
  const gcd = (x: number, y: number): number => (y ? gcd(y, x % y) : Math.abs(x));
  const d = gcd(a, b);
  return `${a / d}/${b / d}`;
};

const foundation: PairedQuizSeed[] = [
  q(
    "Apakah ruang sampel?",
    "What is a sample space?",
    ["Set semua kesudahan yang mungkin", "The set of all possible outcomes"],
    [
      ["Satu kesudahan yang dipilih", "One selected outcome"],
      ["Bilangan percubaan sahaja", "Only the number of trials"],
      ["Kebarangkalian pelengkap", "A complementary probability"],
    ],
    "Ruang sampel menyenaraikan semua kesudahan tanpa tertinggal.",
    "A sample space lists every possible outcome.",
  ),
  q(
    "Apakah peristiwa dalam kebarangkalian?",
    "What is an event in probability?",
    ["Satu set kesudahan daripada ruang sampel", "A set of outcomes from the sample space"],
    [
      ["Semua nombor nyata", "All real numbers"],
      ["Bilangan percubaan", "The number of trials"],
      ["Satu formula tanpa kesudahan", "A formula without outcomes"],
    ],
    "Peristiwa ialah subset ruang sampel.",
    "An event is a subset of the sample space.",
  ),
  q(
    "Julat nilai kebarangkalian ialah apa?",
    "What is the range of probability values?",
    "0 ≤ P(A) ≤ 1",
    ["P(A) > 1", "P(A) < 0", "−1 ≤ P(A) ≤ 1"],
    "Kebarangkalian mustahil ialah 0 dan pasti ialah 1.",
    "An impossible event has probability 0 and a certain event has probability 1.",
  ),
  q(
    "Apakah kebarangkalian peristiwa mustahil?",
    "What is the probability of an impossible event?",
    "0",
    ["1", "1/2", "−1"],
    "Peristiwa mustahil tidak mempunyai kesudahan memihak.",
    "An impossible event has no favourable outcomes.",
  ),
  q(
    "Apakah kebarangkalian peristiwa pasti?",
    "What is the probability of a certain event?",
    "1",
    ["0", "1/2", "2"],
    "Peristiwa pasti merangkumi seluruh ruang sampel.",
    "A certain event contains the whole sample space.",
  ),
  q(
    "Rumus kebarangkalian teori bagi kesudahan sama mungkin ialah apa?",
    "What is the theoretical probability formula for equally likely outcomes?",
    [
      "bilangan kesudahan memihak ÷ jumlah kesudahan",
      "number of favourable outcomes ÷ total outcomes",
    ],
    [
      ["jumlah kesudahan ÷ kesudahan memihak", "total outcomes ÷ favourable outcomes"],
      ["kesudahan memihak × jumlah kesudahan", "favourable outcomes × total outcomes"],
      ["1 + bilangan kesudahan memihak", "1 + number of favourable outcomes"],
    ],
    "Bandingkan kesudahan memihak dengan semua kesudahan.",
    "Compare favourable outcomes with all outcomes.",
  ),
  q(
    "Rumus kebarangkalian eksperimen ialah apa?",
    "What is the experimental probability formula?",
    ["kekerapan peristiwa ÷ jumlah percubaan", "event frequency ÷ total trials"],
    [
      ["jumlah percubaan ÷ kekerapan", "total trials ÷ frequency"],
      ["kekerapan + percubaan", "frequency + trials"],
      ["kekerapan teori × 2", "theoretical frequency × 2"],
    ],
    "Gunakan keputusan sebenar percubaan.",
    "Use the actual trial results.",
  ),
  q(
    "Jika A′ ialah pelengkap A, apakah hubungannya?",
    "If A′ is the complement of A, what is the relationship?",
    "P(A′) = 1 − P(A)",
    ["P(A′) = P(A)", "P(A′) = 1 + P(A)", "P(A′) = 2P(A)"],
    "A dan pelengkapnya meliputi seluruh ruang sampel tanpa bertindih.",
    "A and its complement cover the whole sample space without overlap.",
  ),
  q(
    "Sebuah syiling adil dilambung sekali. Apakah ruang sampelnya?",
    "A fair coin is tossed once. What is its sample space?",
    "{H, T}",
    ["{H}", "{1, 2}", "{H, T, H}"],
    "Terdapat dua kesudahan: kepala dan ekor.",
    "There are two outcomes: heads and tails.",
  ),
  q(
    "Sebuah dadu adil dilontar sekali. Berapa kesudahan dalam ruang sampel?",
    "A fair die is rolled once. How many outcomes are in the sample space?",
    "6",
    ["2", "5", "12"],
    "Kesudahannya ialah 1 hingga 6.",
    "The outcomes are 1 through 6.",
  ),
];

[
  [12, 20],
  [18, 30],
  [9, 25],
  [24, 40],
  [35, 50],
].forEach(([success, trials], i) =>
  foundation.push(
    q(
      `Dalam eksperimen ${i + 1}, peristiwa A berlaku ${success} kali daripada ${trials} percubaan. Cari kebarangkalian eksperimen.`,
      `In experiment ${i + 1}, event A occurs ${success} times in ${trials} trials. Find the experimental probability.`,
      fraction(success, trials),
      [
        fraction(trials - success, trials),
        fraction(success, trials + success),
        fraction(1, trials),
      ],
      "Bahagikan kekerapan A dengan jumlah percubaan dan ringkaskan.",
      "Divide A's frequency by total trials and simplify.",
    ),
  ),
);
[
  ["lambungan dua syiling", "tossing two coins", "{HH, HT, TH, TT}"],
  ["satu dadu", "one die", "{1, 2, 3, 4, 5, 6}"],
  ["pilihan huruf daripada MAT", "choosing a letter from MAT", "{M, A, T}"],
  ["pemutar bernombor 1 hingga 4", "a spinner numbered 1 to 4", "{1, 2, 3, 4}"],
  ["jantina dua anak menggunakan L/P", "sexes of two children using B/G", "{BB, BG, GB, GG}"],
].forEach(([bmContext, dlpContext, answer], i) =>
  foundation.push(
    q(
      `Nyatakan ruang sampel bagi ${bmContext}.`,
      `State the sample space for ${dlpContext}.`,
      answer,
      ["{1}", "{A sahaja}", "{dua kesudahan sahaja}"],
      "Senaraikan setiap kesudahan yang mungkin sekali sahaja.",
      "List every possible outcome exactly once.",
    ),
  ),
);
[
  [2, 6],
  [3, 8],
  [5, 10],
  [4, 12],
  [7, 14],
].forEach(([fav, total], i) =>
  foundation.push(
    q(
      `Peristiwa B${i + 1} mempunyai ${fav} kesudahan memihak daripada ${total} kesudahan sama mungkin. Cari P(B).`,
      `Event B${i + 1} has ${fav} favourable outcomes among ${total} equally likely outcomes. Find P(B).`,
      fraction(fav, total),
      [fraction(total - fav, total), fraction(fav, total + fav), fraction(1, total)],
      "P(B)=kesudahan memihak ÷ jumlah kesudahan.",
      "P(B)=favourable outcomes ÷ total outcomes.",
    ),
  ),
);
[
  [1, 4],
  [2, 5],
  [3, 8],
  [7, 10],
  [5, 12],
].forEach(([a, b], i) =>
  foundation.push(
    q(
      `Diberi P(C${i + 1})=${a}/${b}. Cari P(C′).`,
      `Given P(C${i + 1})=${a}/${b}. Find P(C′).`,
      fraction(b - a, b),
      [fraction(a, b), fraction(b, a), fraction(1, b)],
      "P(C′)=1−P(C).",
      "P(C′)=1−P(C).",
    ),
  ),
);

const practice: PairedQuizSeed[] = [];
[
  [2, 4, 6],
  [1, 3, 5],
  [2, 3, 4, 5],
  [1, 2, 6],
  [3, 6, 9, 12],
].forEach((fav, i) =>
  practice.push(
    q(
      `Satu nombor dipilih daripada 1 hingga ${Math.max(...fav) + 2}. Peristiwa A${i + 1} ialah memilih salah satu daripada {${fav.join(",")}}. Cari P(A).`,
      `A number is chosen from 1 to ${Math.max(...fav) + 2}. Event A${i + 1} is choosing one of {${fav.join(",")}}. Find P(A).`,
      fraction(fav.length, Math.max(...fav) + 2),
      [
        fraction(Math.max(...fav) + 2 - fav.length, Math.max(...fav) + 2),
        fraction(fav.length, Math.max(...fav)),
        fraction(1, Math.max(...fav) + 2),
      ],
      "Kira kesudahan memihak dalam ruang sampel.",
      "Count favourable outcomes in the sample space.",
    ),
  ),
);
[
  [3, 5],
  [4, 6],
  [5, 8],
  [2, 7],
  [6, 9],
].forEach(([red, total], i) =>
  practice.push(
    q(
      `Sebuah beg ${i + 1} mengandungi ${red} guli merah dan ${total - red} guli biru. Cari kebarangkalian memilih guli bukan merah.`,
      `Bag ${i + 1} contains ${red} red marbles and ${total - red} blue marbles. Find the probability of choosing a non-red marble.`,
      fraction(total - red, total),
      [fraction(red, total), fraction(total - red, red), fraction(1, total)],
      "Bukan merah ialah peristiwa pelengkap merah.",
      "Not red is the complement of red.",
    ),
  ),
);
[
  [28, 50, 200],
  [36, 60, 150],
  [18, 40, 120],
  [45, 75, 300],
  [32, 80, 250],
].forEach(([success, trials, future], i) =>
  practice.push(
    n(
      `Dalam ${trials} percubaan, A${i + 1} berlaku ${success} kali. Anggarkan kekerapan A dalam ${future} percubaan akan datang.`,
      `In ${trials} trials, A${i + 1} occurs ${success} times. Estimate its frequency in ${future} future trials.`,
      (success / trials) * future,
      "",
      "Darab kebarangkalian eksperimen dengan bilangan percubaan baharu.",
      "Multiply experimental probability by the new number of trials.",
    ),
  ),
);
[
  [6, 2],
  [8, 3],
  [10, 4],
  [12, 5],
  [15, 6],
].forEach(([total, bad], i) =>
  practice.push(
    q(
      `Daripada ${total} kad sama mungkin, ${bad} rosak. Cari kebarangkalian memilih kad elok.`,
      `Among ${total} equally likely cards, ${bad} are defective. Find the probability of selecting a good card.`,
      fraction(total - bad, total),
      [fraction(bad, total), fraction(total - bad, bad), fraction(1, total)],
      "Bilangan elok = jumlah − rosak.",
      "Number good = total − defective.",
    ),
  ),
);
[
  ["genap", 3, "even"],
  ["lebih daripada 4", 2, "greater than 4"],
  ["faktor bagi 6", 4, "a factor of 6"],
  ["nombor perdana", 3, "a prime number"],
  ["kurang daripada 5", 4, "less than 5"],
].forEach(([bmEvent, count, dlpEvent], i) =>
  practice.push(
    q(
      `Dadu adil dilontar. Cari kebarangkalian mendapat ${bmEvent}.`,
      `A fair die is rolled. Find the probability of getting ${dlpEvent}.`,
      fraction(Number(count), 6),
      [fraction(6 - Number(count), 6), fraction(Number(count), 12), fraction(1, 6)],
      "Senaraikan kesudahan dadu yang memenuhi peristiwa.",
      "List the die outcomes satisfying the event.",
    ),
  ),
);
[
  [1, 2, 3],
  [2, 5, 4],
  [3, 10, 5],
  [4, 7, 2],
  [5, 8, 6],
].forEach(([a, b, mult], i) =>
  practice.push(
    q(
      `Diberi P(A${i + 1})=${a}/${b}. Dalam ${b * mult} percubaan, berapakah kekerapan jangkaan A?`,
      `Given P(A${i + 1})=${a}/${b}. In ${b * mult} trials, what is the expected frequency of A?`,
      `${a * mult}`,
      [`${(b - a) * mult}`, `${b * mult}`, `${mult}`],
      "Kekerapan jangkaan = kebarangkalian × percubaan.",
      "Expected frequency = probability × trials.",
    ),
  ),
);

const challenge: PairedQuizSeed[] = [];
[
  [3, 2, 5],
  [4, 3, 7],
  [5, 4, 9],
  [6, 2, 8],
  [7, 5, 12],
].forEach(([red, blue, total], i) =>
  challenge.push(
    q(
      `Beg ${i + 1} mengandungi ${red} merah, ${blue} biru dan ${total - red - blue} hijau. Cari kebarangkalian memilih guli yang bukan biru.`,
      `Bag ${i + 1} contains ${red} red, ${blue} blue and ${total - red - blue} green marbles. Find the probability of selecting a marble that is not blue.`,
      fraction(total - blue, total),
      [fraction(blue, total), fraction(red, total), fraction(total - red, total)],
      "Gabungkan merah dan hijau, atau gunakan pelengkap biru.",
      "Combine red and green, or use the complement of blue.",
    ),
  ),
);
[
  [30, 50, 18, 30],
  [42, 70, 24, 40],
  [25, 40, 36, 60],
  [54, 90, 21, 30],
  [32, 50, 45, 75],
].forEach(([a1, t1, a2, t2], i) =>
  challenge.push(
    q(
      `Eksperimen I${i + 1}: A berlaku ${a1}/${t1}; Eksperimen II: ${a2}/${t2}. Eksperimen manakah memberi kebarangkalian A lebih tinggi?`,
      `Experiment I${i + 1}: A occurs ${a1}/${t1}; Experiment II: ${a2}/${t2}. Which gives a higher probability of A?`,
      a1 / t1 > a2 / t2 ? "I" : a1 / t1 < a2 / t2 ? "II" : ["Sama", "Equal"],
      ["I", "II", ["Sama", "Equal"], ["Tidak dapat ditentukan", "Cannot be determined"]]
        .filter(
          (v) =>
            Array.isArray(v) || v !== (a1 / t1 > a2 / t2 ? "I" : a1 / t1 < a2 / t2 ? "II" : ""),
        )
        .slice(0, 3) as [string, string, string],
      "Tukarkan kedua-dua nisbah kepada pecahan atau perpuluhan setara.",
      "Convert both ratios to equivalent fractions or decimals.",
    ),
  ),
);
[
  [1, 4, 3, 5],
  [2, 7, 1, 3],
  [3, 8, 2, 5],
  [4, 9, 1, 6],
  [5, 12, 3, 10],
].forEach(([a, b, c, d], i) =>
  challenge.push(
    q(
      `Peristiwa A${i + 1} dan B saling eksklusif dengan P(A)=${a}/${b} dan P(B)=${c}/${d}. Cari P(A atau B).`,
      `Events A${i + 1} and B are mutually exclusive with P(A)=${a}/${b} and P(B)=${c}/${d}. Find P(A or B).`,
      fraction(a * d + c * b, b * d),
      [
        fraction(a * c, b * d),
        fraction(Math.abs(a * d - c * b), b * d),
        fraction(b * d - (a * d + c * b), b * d),
      ],
      "Bagi peristiwa saling eksklusif, tambah P(A)+P(B).",
      "For mutually exclusive events, add P(A)+P(B).",
    ),
  ),
);
[
  [2, 3, 4],
  [3, 5, 2],
  [1, 4, 6],
  [5, 8, 3],
  [7, 10, 2],
].forEach(([a, b, mult], i) =>
  challenge.push(
    q(
      `Kebarangkalian gagal bagi ujian ${i + 1} ialah ${a}/${b}. Dalam ${b * mult} cubaan, anggarkan bilangan kejayaan.`,
      `The failure probability for test ${i + 1} is ${a}/${b}. In ${b * mult} trials, estimate the number of successes.`,
      `${(b - a) * mult}`,
      [`${a * mult}`, `${b * mult}`, `${mult}`],
      "Cari kebarangkalian kejayaan sebagai pelengkap, kemudian darab percubaan.",
      "Find success probability as the complement, then multiply by trials.",
    ),
  ),
);
[
  [2, 3, 1],
  [3, 4, 2],
  [4, 5, 1],
  [5, 6, 3],
  [6, 7, 2],
].forEach(([red, total, added], i) =>
  challenge.push(
    q(
      `Sebuah beg mempunyai ${red} guli merah daripada ${total} guli. Selepas ${added} guli merah ditambah, cari kebarangkalian memilih merah.`,
      `A bag has ${red} red marbles among ${total} marbles. After ${added} red marbles are added, find the probability of selecting red.`,
      fraction(red + added, total + added),
      [
        fraction(red, total + added),
        fraction(red + added, total),
        fraction(total - red, total + added),
      ],
      "Kemas kini pengangka dan jumlah guli.",
      "Update both the numerator and total number of marbles.",
    ),
  ),
);
[
  [24, 40, 100],
  [35, 50, 200],
  [18, 30, 150],
  [42, 60, 300],
  [28, 80, 400],
].forEach(([success, trials, target], i) =>
  challenge.push(
    n(
      `Dalam kajian ${i + 1}, kejayaan berlaku ${success} kali daripada ${trials}. Jika kadar itu kekal, berapakah kegagalan dijangka dalam ${target} percubaan?`,
      `In study ${i + 1}, success occurs ${success} times out of ${trials}. If the rate continues, how many failures are expected in ${target} trials?`,
      ((trials - success) / trials) * target,
      "",
      "Cari kebarangkalian gagal sebagai pelengkap kadar kejayaan.",
      "Find failure probability as the complement of the success rate.",
    ),
  ),
);

export const mathF2C13PairedSeeds: readonly PairedQuizSeed[] = [
  ...foundation,
  ...practice,
  ...challenge,
];
