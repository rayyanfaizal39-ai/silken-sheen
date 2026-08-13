import { numericPairedSeed as n, pairedSeed as q, type PairedQuizSeed } from "../paired-quiz-bank";

const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
const median = (values: number[]) => {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
};

const foundation: PairedQuizSeed[] = [
  q(
    "Apakah min bagi satu set data?",
    "What is the mean of a data set?",
    ["Jumlah nilai dibahagi bilangan nilai", "Sum of values divided by number of values"],
    [
      ["Nilai di tengah tanpa menyusun", "The middle value without sorting"],
      ["Nilai paling kerap sahaja", "Only the most frequent value"],
      ["Nilai terbesar tolak terkecil", "Largest minus smallest"],
    ],
    "Min menggunakan semua nilai data.",
    "The mean uses every data value.",
  ),
  q(
    "Apakah langkah pertama untuk mencari median?",
    "What is the first step in finding the median?",
    ["Susun data mengikut tertib", "Arrange the data in order"],
    [
      ["Tambah semua nilai", "Add all values"],
      ["Pilih nilai terbesar", "Choose the largest value"],
      ["Kira julat", "Calculate the range"],
    ],
    "Median ialah nilai tengah selepas data disusun.",
    "The median is the middle value after sorting.",
  ),
  q(
    "Apakah mod?",
    "What is the mode?",
    ["Nilai yang paling kerap muncul", "The most frequently occurring value"],
    [
      ["Nilai tengah", "The middle value"],
      ["Purata semua nilai", "The average of all values"],
      ["Nilai terbesar", "The largest value"],
    ],
    "Mod ditentukan melalui kekerapan tertinggi.",
    "The mode has the highest frequency.",
  ),
  q(
    "Bolehkah satu set data mempunyai dua mod?",
    "Can a data set have two modes?",
    [
      "Ya, jika dua nilai berkongsi kekerapan tertinggi",
      "Yes, if two values share the highest frequency",
    ],
    [
      ["Tidak, mod sentiasa satu", "No, there is always one mode"],
      ["Ya, hanya jika min sifar", "Yes, only if the mean is zero"],
      ["Tidak, kecuali semua nilai sama", "No, unless all values are equal"],
    ],
    "Dua nilai dengan kekerapan tertinggi yang sama menghasilkan data bimod.",
    "Two values sharing the same highest frequency make the data bimodal.",
  ),
  q(
    "Jika setiap nilai muncul sekali sahaja, apakah modnya?",
    "If every value occurs exactly once, what is the mode?",
    ["Tiada mod", "No mode"],
    [
      ["Semua nilai ialah mod", "Every value is a mode"],
      ["Nilai pertama", "The first value"],
      ["Min data", "The mean"],
    ],
    "Tiada nilai yang lebih kerap daripada yang lain.",
    "No value occurs more frequently than another.",
  ),
  q(
    "Sukatan manakah paling dipengaruhi oleh nilai pencilan?",
    "Which measure is most affected by an outlier?",
    ["Min", "Mean"],
    [
      ["Median", "Median"],
      ["Mod", "Mode"],
      ["Kedudukan median", "Median position"],
    ],
    "Min menggunakan magnitud setiap nilai, termasuk pencilan.",
    "The mean uses the magnitude of every value, including outliers.",
  ),
  q(
    "Sukatan manakah biasanya sesuai untuk pendapatan apabila terdapat beberapa nilai amat tinggi?",
    "Which measure is usually suitable for incomes with a few extremely high values?",
    ["Median", "Median"],
    [
      ["Min", "Mean"],
      ["Mod semestinya", "Mode necessarily"],
      ["Jumlah", "Total"],
    ],
    "Median kurang terjejas oleh pencilan tinggi.",
    "The median is less affected by high outliers.",
  ),
  q(
    "Sukatan manakah sesuai untuk menentukan saiz kasut paling popular?",
    "Which measure suits finding the most popular shoe size?",
    ["Mod", "Mode"],
    [
      ["Min", "Mean"],
      ["Median", "Median"],
      ["Jumlah", "Total"],
    ],
    "Saiz paling popular ialah nilai dengan kekerapan tertinggi.",
    "The most popular size is the value with highest frequency.",
  ),
  q(
    "Bagi bilangan data ganjil, median terletak di mana?",
    "For an odd number of data values, where is the median?",
    ["Pada satu nilai tengah selepas disusun", "At the single middle value after sorting"],
    [
      ["Di antara dua nilai hujung", "Between the two end values"],
      ["Pada nilai paling kerap", "At the most frequent value"],
      ["Pada min", "At the mean"],
    ],
    "Bilangan ganjil mempunyai satu kedudukan tengah.",
    "An odd count has one middle position.",
  ),
  q(
    "Bagi bilangan data genap, bagaimana median diperoleh?",
    "For an even number of data values, how is the median found?",
    ["Purata dua nilai tengah", "Mean of the two middle values"],
    [
      ["Nilai tengah pertama sahaja", "First middle value only"],
      ["Nilai tengah kedua sahaja", "Second middle value only"],
      ["Purata nilai pertama dan akhir", "Mean of first and last values"],
    ],
    "Selepas disusun, ambil purata dua nilai di tengah.",
    "After sorting, average the two middle values.",
  ),
];

[
  [2, 4, 6, 8],
  [5, 7, 9, 11, 13],
  [3, 3, 6, 8, 10],
  [12, 15, 18],
  [4, 9, 10, 13, 14],
].forEach((values, i) =>
  foundation.push(
    n(
      `Cari min bagi data ${i + 1}: ${values.join(", ")}.`,
      `Find the mean of data set ${i + 1}: ${values.join(", ")}.`,
      mean(values),
      "",
      "Jumlahkan data dan bahagi dengan bilangannya.",
      "Add the data and divide by the number of values.",
    ),
  ),
);
[
  [7, 2, 9, 4, 5],
  [12, 6, 8, 10, 4, 14],
  [3, 11, 5, 9, 7],
  [20, 15, 10, 25, 5, 30],
  [8, 2, 6, 4, 10, 12, 14],
].forEach((values, i) =>
  foundation.push(
    n(
      `Tentukan median data ${i + 1}: ${values.join(", ")}.`,
      `Determine the median of data set ${i + 1}: ${values.join(", ")}.`,
      median(values),
      "",
      "Susun data dahulu dan ambil nilai tengah.",
      "Sort the data first and take the middle value.",
    ),
  ),
);
[
  { v: [2, 3, 3, 4, 5], a: "3" },
  { v: [6, 7, 6, 8, 9, 6], a: "6" },
  { v: [1, 2, 2, 3, 3, 4], a: "2 dan 3" },
  { v: [5, 7, 9, 5, 8, 5, 9], a: "5" },
  { v: [4, 4, 6, 6, 7, 8], a: "4 dan 6" },
].forEach(({ v, a }, i) =>
  foundation.push(
    q(
      `Cari mod bagi data ${i + 1}: ${v.join(", ")}.`,
      `Find the mode of data set ${i + 1}: ${v.join(", ")}.`,
      a,
      [`${Math.min(...v)}`, `${Math.max(...v)}`, `${mean(v)}`],
      "Kenal pasti nilai dengan kekerapan tertinggi.",
      "Identify the value with the highest frequency.",
    ),
  ),
);
[
  ["warna kereta paling laris", "most popular car colour", "Mod", "Mode"],
  [
    "gaji tipikal dengan seorang jutawan",
    "typical salary with one millionaire",
    "Median",
    "Median",
  ],
  ["markah purata kelas tanpa pencilan", "average class score without outliers", "Min", "Mean"],
  ["saiz baju paling banyak dijual", "best-selling shirt size", "Mod", "Mode"],
  [
    "harga rumah tipikal dalam data sangat pencong",
    "typical house price in strongly skewed data",
    "Median",
    "Median",
  ],
].forEach(([bmContext, dlpContext, bmAnswer, dlpAnswer], i) =>
  foundation.push(
    q(
      `Sukatan manakah paling sesuai untuk ${bmContext}?`,
      `Which measure is most suitable for the ${dlpContext}?`,
      [bmAnswer, dlpAnswer],
      [
        ["Min", "Mean"],
        ["Median", "Median"],
        ["Mod", "Mode"],
      ].filter(([bm]) => bm !== bmAnswer) as [[string, string], [string, string], [string, string]],
      "Pilih sukatan berdasarkan tujuan dan bentuk data.",
      "Choose the measure based on purpose and data shape.",
    ),
  ),
);

const practice: PairedQuizSeed[] = [];
[
  [
    [2, 3, 4],
    [4, 2, 1],
  ],
  [
    [5, 6, 8],
    [2, 3, 1],
  ],
  [
    [10, 12, 15],
    [3, 2, 1],
  ],
  [
    [1, 3, 5, 7],
    [1, 2, 2, 1],
  ],
  [
    [20, 25, 30],
    [2, 4, 2],
  ],
].forEach(([values, freqs], i) => {
  const total = (values as number[]).reduce((s, v, k) => s + v * (freqs as number[])[k], 0);
  const count = (freqs as number[]).reduce((s, v) => s + v, 0);
  practice.push(
    n(
      `Nilai ${values} mempunyai kekerapan ${freqs}. Cari min bagi jadual ${i + 1}.`,
      `Values ${values} have frequencies ${freqs}. Find the mean for table ${i + 1}.`,
      total / count,
      "",
      "Gunakan Σfx ÷ Σf.",
      "Use Σfx ÷ Σf.",
    ),
  );
});
[
  [[4, 6, 8, 10], 8],
  [[12, 15, 18], 16],
  [[5, 7, 9, 11, 13], 10],
  [[20, 24, 28], 25],
  [[3, 6, 9, 12], 9],
].forEach(([raw, target], i) => {
  const values = raw as number[];
  const missing = (target as number) * (values.length + 1) - values.reduce((s, v) => s + v, 0);
  practice.push(
    n(
      `Min bagi ${values.join(", ")} dan x ialah ${target}. Cari x.`,
      `The mean of ${values.join(", ")} and x is ${target}. Find x.`,
      missing,
      "",
      "Jumlah diperlukan = min × bilangan data.",
      "Required total = mean × number of data values.",
    ),
  );
});
[
  [9, 2, 7, 4, 6, 8],
  [15, 5, 11, 7, 9, 13],
  [20, 4, 16, 8, 12, 24],
  [3, 10, 5, 8, 6, 12],
  [18, 6, 14, 10, 22, 2],
].forEach((values, i) =>
  practice.push(
    n(
      `Cari median bagi set genap ${i + 1}: ${values.join(", ")}.`,
      `Find the median of even data set ${i + 1}: ${values.join(", ")}.`,
      median(values),
      "",
      "Susun dan puratakan dua nilai tengah.",
      "Sort and average the two middle values.",
    ),
  ),
);
[
  [[1, 2, 3, 4], [2, 5, 5, 1], "2 dan 3"],
  [[5, 6, 7], [4, 2, 4], "5 dan 7"],
  [[2, 4, 6, 8], [1, 3, 2, 3], "4 dan 8"],
  [[10, 12, 14], [5, 2, 1], "10"],
  [[3, 5, 7, 9], [2, 4, 4, 1], "5 dan 7"],
].forEach(([values, freqs, answer], i) =>
  practice.push(
    q(
      `Jadual ${i + 1} mempunyai nilai ${values} dan kekerapan ${freqs}. Cari mod.`,
      `Table ${i + 1} has values ${values} and frequencies ${freqs}. Find the mode.`,
      answer as string,
      [`${(values as number[])[0]}`, `${(values as number[]).at(-1)}`, "Tiada mod"],
      "Pilih nilai dengan kekerapan maksimum.",
      "Select the value with maximum frequency.",
    ),
  ),
);
[
  [[2, 4, 6, 8], 3],
  [[5, 7, 9], 4],
  [[10, 15, 20, 25], -2],
  [[1, 3, 5, 7, 9], 6],
  [[12, 18, 24], 0.5],
].forEach(([raw, k], i) => {
  const values = raw as number[];
  practice.push(
    n(
      `Setiap nilai dalam ${values.join(", ")} ditambah ${k}. Cari min baharu.`,
      `Every value in ${values.join(", ")} is increased by ${k}. Find the new mean.`,
      mean(values) + (k as number),
      "",
      "Menambah k pada semua data menambah min sebanyak k.",
      "Adding k to every value increases the mean by k.",
    ),
  );
});
[
  [
    "masa menunggu dengan satu kelewatan luar biasa",
    "waiting times with one exceptional delay",
    "Median",
    "Median",
  ],
  [
    "bilangan adik-beradik untuk mengira purata tepat",
    "numbers of siblings to calculate an exact average",
    "Min",
    "Mean",
  ],
  ["jenama telefon yang paling dipilih", "most frequently chosen phone brand", "Mod", "Mode"],
  [
    "nilai rumah tipikal dengan beberapa banglo mahal",
    "typical home value with a few expensive mansions",
    "Median",
    "Median",
  ],
  [
    "penggunaan air purata bagi rumah yang hampir seragam",
    "average water use for similar households",
    "Min",
    "Mean",
  ],
].forEach(([bmContext, dlpContext, bmAnswer, dlpAnswer]) =>
  practice.push(
    q(
      `Pilih sukatan kecenderungan memusat yang paling sesuai bagi ${bmContext}.`,
      `Choose the most suitable measure of central tendency for ${dlpContext}.`,
      [bmAnswer, dlpAnswer],
      [
        ["Min", "Mean"],
        ["Median", "Median"],
        ["Mod", "Mode"],
      ].filter(([bm]) => bm !== bmAnswer) as [[string, string], [string, string], [string, string]],
      "Pertimbangkan pencilan, jenis data dan tujuan analisis.",
      "Consider outliers, data type and the purpose of analysis.",
    ),
  ),
);

const challenge: PairedQuizSeed[] = [];
[
  [20, 12, 25, 18],
  [15, 8, 10, 14],
  [30, 16, 20, 22],
  [12, 25, 18, 19],
  [24, 10, 16, 15],
].forEach(([n1, m1, n2, m2], i) =>
  challenge.push(
    n(
      `Kumpulan A${i + 1} mempunyai ${n1} murid dengan min ${m1}; kumpulan B mempunyai ${n2} murid dengan min ${m2}. Cari min gabungan.`,
      `Group A${i + 1} has ${n1} students with mean ${m1}; group B has ${n2} students with mean ${m2}. Find the combined mean.`,
      (n1 * m1 + n2 * m2) / (n1 + n2),
      "",
      "Gabungkan jumlah kedua-dua kumpulan sebelum membahagi jumlah murid.",
      "Combine both group totals before dividing by total students.",
    ),
  ),
);
[
  [[4, 7, 9, 12], 8],
  [[10, 14, 18], 15],
  [[3, 5, 11, 13, 17], 10],
  [[20, 24, 30], 26],
  [[6, 8, 10, 16], 11],
].forEach(([raw, target], i) => {
  const values = raw as number[];
  challenge.push(
    n(
      `Selepas satu nilai x ditambah kepada ${values.join(", ")}, min menjadi ${target}. Tentukan x.`,
      `After one value x is added to ${values.join(", ")}, the mean becomes ${target}. Determine x.`,
      (target as number) * (values.length + 1) - values.reduce((s, v) => s + v, 0),
      "",
      "Cari jumlah baharu yang diperlukan dan tolak jumlah asal.",
      "Find the required new total and subtract the original total.",
    ),
  );
});
[
  [[5, 6, 7, 8, 50], 50],
  [[12, 13, 14, 15, 80], 80],
  [[2, 3, 4, 5, 30], 30],
  [[20, 22, 24, 26, 100], 100],
  [[7, 8, 9, 10, 60], 60],
].forEach(([raw, outlier], i) => {
  const values = raw as number[];
  const without = values.filter((v) => v !== outlier);
  challenge.push(
    n(
      `Data ${i + 1} ialah ${values.join(", ")}. Berapakah perubahan min jika pencilan ${outlier} dibuang?`,
      `Data set ${i + 1} is ${values.join(", ")}. By how much does the mean change when outlier ${outlier} is removed?`,
      Math.abs(mean(values) - mean(without)),
      "",
      "Bandingkan min sebelum dan selepas pencilan dibuang.",
      "Compare the means before and after removing the outlier.",
    ),
  );
});
[
  [[2, 5, 8], 3, 4],
  [[4, 6, 10], 2, -1],
  [[10, 15, 20], 0.5, 5],
  [[1, 3, 7, 9], 4, 2],
  [[12, 18, 24], 1.5, -3],
].forEach(([raw, a, b], i) => {
  const values = raw as number[];
  challenge.push(
    n(
      `Setiap nilai x dalam ${values.join(", ")} ditukar kepada ${a}x ${Number(b) >= 0 ? "+" : "−"} ${Math.abs(Number(b))}. Cari min data baharu.`,
      `Each x in ${values.join(", ")} is transformed to ${a}x ${Number(b) >= 0 ? "+" : "−"} ${Math.abs(Number(b))}. Find the new mean.`,
      Number(a) * mean(values) + Number(b),
      "",
      "Min baharu = a(min asal)+b.",
      "New mean = a(original mean)+b.",
    ),
  );
});
[
  [
    [4, 6, 8, 10],
    [5, 7, 7, 9],
  ],
  [
    [10, 10, 10, 10],
    [7, 9, 11, 13],
  ],
  [
    [2, 4, 6, 20],
    [5, 6, 7, 8],
  ],
  [
    [12, 14, 16, 18],
    [10, 10, 15, 25],
  ],
  [
    [3, 5, 7, 9, 11],
    [4, 4, 7, 10, 11],
  ],
].forEach(([a, b], i) =>
  challenge.push(
    q(
      `Set data A${i + 1}: ${(a as number[]).join(", ")}; B: ${(b as number[]).join(", ")}. Set manakah mempunyai min lebih tinggi?`,
      `Data set A${i + 1}: ${(a as number[]).join(", ")}; B: ${(b as number[]).join(", ")}. Which set has the higher mean?`,
      mean(a as number[]) > mean(b as number[])
        ? "A"
        : mean(a as number[]) < mean(b as number[])
          ? "B"
          : ["Sama", "Equal"],
      ["A", "B", ["Sama", "Equal"]]
        .filter(
          (value) =>
            Array.isArray(value) ||
            value !== (mean(a as number[]) > mean(b as number[]) ? "A" : "B"),
        )
        .slice(0, 3) as [string, string, string],
      "Kira dan bandingkan min kedua-dua set.",
      "Calculate and compare both means.",
    ),
  ),
);
[
  [[40, 42, 43, 45, 100], "median"],
  [[6, 7, 7, 8, 9, 9, 9], "mode"],
  [[70, 72, 74, 76, 78], "mean"],
  [[1200, 1250, 1300, 1400, 9000], "median"],
  [[2, 2, 3, 4, 4, 4, 5], "mode"],
].forEach(([raw, kind], i) => {
  const values = raw as number[];
  const answer =
    kind === "mean"
      ? mean(values)
      : kind === "median"
        ? median(values)
        : Number(
            kind === "mode"
              ? [...values].sort(
                  (a, b) =>
                    values.filter((v) => v === b).length - values.filter((v) => v === a).length,
                )[0]
              : 0,
          );
  challenge.push(
    n(
      `Gunakan sukatan paling sesuai untuk mewakili data ${i + 1}: ${values.join(", ")}. Apakah nilainya?`,
      `Use the most suitable measure to represent data set ${i + 1}: ${values.join(", ")}. What is its value?`,
      answer,
      "",
      kind === "median"
        ? "Median dipilih kerana terdapat pencilan."
        : kind === "mode"
          ? "Mod dipilih untuk nilai paling lazim."
          : "Min sesuai kerana data seimbang tanpa pencilan.",
      kind === "median"
        ? "Median is chosen because there is an outlier."
        : kind === "mode"
          ? "Mode is chosen for the most common value."
          : "Mean suits balanced data without outliers.",
    ),
  );
});

export const mathF2C12PairedSeeds: readonly PairedQuizSeed[] = [
  ...foundation,
  ...practice,
  ...challenge,
];
