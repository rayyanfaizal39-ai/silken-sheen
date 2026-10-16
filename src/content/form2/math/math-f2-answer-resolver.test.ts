import { describe, expect, it } from "vitest";
import type { QuizQuestion } from "@/data/content";
import { buildPairedQuizBank, type PairedQuizSeed } from "./paired-quiz-bank";
import { mathF2C6PairedSeeds as c6 } from "./chapter-6/quiz-bank";
import { mathF2C7PairedSeeds as c7 } from "./chapter-7/quiz-bank";
import { mathF2C8PairedSeeds as c8 } from "./chapter-8/quiz-bank";
import { mathF2C9PairedSeeds as c9 } from "./chapter-9/quiz-bank";
import { mathF2C10PairedSeeds as c10 } from "./chapter-10/quiz-bank";
import { mathF2C11PairedSeeds as c11 } from "./chapter-11/quiz-bank";
import { mathF2C12PairedSeeds as c12 } from "./chapter-12/quiz-bank";
import { mathF2C13PairedSeeds as c13 } from "./chapter-13/quiz-bank";

/**
 * Independent re-solution of every GENERATED question family. Each solver parses
 * the BM stem and recomputes the answer from first principles (never by calling
 * the generator), then checks the stored correct option and that no distractor
 * has the same value. A family that stops matching its expected count fails too.
 */
type Expected = number | [number, number] | string;
type Solver = [
  family: string,
  pattern: RegExp,
  count: number,
  solve: (n: number[], m: RegExpExecArray) => Expected,
];

const N = (s: string) => Number(s.replace(/−/g, "-"));
const nums = (s: string) => (s.replace(/−/g, "-").match(/-?\d+(?:\.\d+)?/g) ?? []).map(Number);
const list = (s: string) => s.split(",").map(N);
const mean = (v: number[]) => v.reduce((a, b) => a + b, 0) / v.length;
const median = (v: number[]) => {
  const s = [...v].sort((a, b) => a - b);
  return s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
};
const gcd = (a: number, b: number): number => (b ? gcd(b, a % b) : Math.abs(a));
const frac = (a: number, b: number) => `${a / gcd(a, b)}/${b / gcd(a, b)}`;
const D = String.raw`(-?\d+(?:\.\d+)?)`;
const P = String.raw`\((-?\d+),\s?(-?\d+)\)`;
const re = (s: string) => new RegExp(`^${s}$`);

/** Value(s) an option denotes: a fraction stays text, a coordinate is a pair, else its first number. */
function valueOf(option: string, expected: Expected): Expected {
  if (typeof expected === "string") return option;
  const v = nums(option);
  return Array.isArray(expected) ? [v[0], v[1]] : v[0];
}
const same = (a: Expected, b: Expected) =>
  typeof a === "string" || typeof b === "string"
    ? a === b
    : Array.isArray(a) && Array.isArray(b)
      ? Math.abs(a[0] - b[0]) < 0.006 && Math.abs(a[1] - b[1]) < 0.006
      : Math.abs((a as number) - (b as number)) < 0.006;

function check(
  chapter: 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13,
  seeds: readonly PairedQuizSeed[],
  solvers: Solver[],
) {
  const bank: QuizQuestion[] = buildPairedQuizBank(chapter, "bm", seeds);
  for (const [family, pattern, count, solve] of solvers) {
    const matches = bank.flatMap((q) => {
      const m = pattern.exec(q.question);
      return m ? [{ q, m }] : [];
    });
    expect(matches.length, `Chapter ${chapter} ${family}`).toBe(count);
    for (const { q, m } of matches) {
      const expected = solve(
        m.slice(1).map((v) => (/^-?\d/.test(v ?? "") ? N(v) : NaN)),
        m,
      );
      const correct = q.options[q.answerIndex];
      expect(
        same(valueOf(correct, expected), expected),
        `${q.id} ${q.question} → ${correct}, expected ${expected}`,
      ).toBe(true);
      for (const [i, option] of q.options.entries()) {
        if (i !== q.answerIndex)
          expect(
            same(valueOf(option, expected), expected),
            `${q.id} distractor "${option}" equals the answer`,
          ).toBe(false);
      }
    }
  }
}

describe("Math Form 2 generated answers are independently re-solved", () => {
  it("Chapter 6: surface area and volume", () => {
    check(6, c6, [
      [
        "box surface area",
        re(`Kotak \\d+ berukuran ${D} cm × ${D} cm × ${D} cm\\. Cari luas permukaannya\\.`),
        5,
        ([l, w, h]) => 2 * (l * w + w * h + l * h),
      ],
      [
        "prism volume",
        re(
          `Prisma \\d+ mempunyai luas keratan rentas ${D} cm² dan panjang ${D} cm\\. Cari isi padu\\.`,
        ),
        5,
        ([a, l]) => a * l,
      ],
      [
        "closed cylinder",
        re(
          `Silinder tertutup \\d+ berjejari ${D} cm dan tinggi ${D} cm\\. Cari luas permukaan\\. Gunakan π = (22/7|3\\.142)\\.`,
        ),
        5,
        ([r, h], m) => 2 * (m[3] === "22/7" ? 22 / 7 : 3.142) * r * (r + h),
      ],
      [
        "pyramid volume",
        re(`Piramid \\d+ mempunyai luas tapak ${D} cm² dan tinggi ${D} cm\\. Cari isi padu\\.`),
        5,
        ([a, h]) => (a * h) / 3,
      ],
      [
        "missing height",
        re(
          `Isi padu kuboid \\d+ ialah ${D} cm³\\. Panjang ${D} cm dan lebar ${D} cm\\. Cari tinggi\\.`,
        ),
        5,
        ([v, l, w]) => v / (l * w),
      ],
      [
        "empty tank",
        re(
          `Tangki \\d+ berukuran ${D} m × ${D} m × ${D} m diisi ${D}%\\. Cari isi padu ruang kosong\\.`,
        ),
        5,
        ([l, w, h, p]) => l * w * h * (1 - p / 100),
      ],
      [
        "scaled volume",
        re(
          `Pepejal \\d+ mempunyai isi padu ${D} cm³\\. Semua panjang didarab ${D}\\. Cari isi padu baharu\\.`,
        ),
        5,
        ([v, k]) => v * k ** 3,
      ],
      [
        "hollow block",
        re(
          `Blok berongga \\d+ mempunyai kuboid luar ${D}×${D}×${D} cm dan rongga ${D}×${D}×${D} cm\\. Cari isi padu bahan\\.`,
        ),
        5,
        ([a, b, c, d, e, f]) => a * b * c - d * e * f,
      ],
      [
        "painting cost",
        re(
          `Kotak tertutup \\d+ berukuran ${D} m × ${D} m × ${D} m dicat pada RM${D}/m²\\. Cari kos\\.`,
        ),
        5,
        ([l, w, h, c]) => 2 * (l * w + w * h + l * h) * c,
      ],
    ]);
  });

  it("Chapter 7: coordinates", () => {
    const d = (a: number, b: number, c: number, e: number) => Math.hypot(c - a, e - b);
    check(7, c7, [
      ["distance", re(`Cari jarak antara ${P} dan ${P}\\.`), 5, ([a, b, c, e]) => d(a, b, c, e)],
      [
        "midpoint",
        re(`Cari titik tengah bagi ${P} dan ${P}\\.`),
        5,
        ([a, b, c, e]) => [(a + c) / 2, (b + e) / 2],
      ],
      [
        "rectangle area",
        re(
          `Segi empat tepat mempunyai bucu bertentangan ${P} dan ${P} dengan sisi selari paksi\\. Cari luas\\.`,
        ),
        5,
        ([a, b, c, e]) => Math.abs((c - a) * (e - b)),
      ],
      [
        "path length",
        re(`Laluan lurus \\d+ menghubungkan A${P} dan B${P}\\. Cari panjangnya\\.`),
        10,
        ([a, b, c, e]) => d(a, b, c, e),
      ],
      [
        "segment midpoint",
        re(`M ialah titik tengah segmen \\d+ dengan hujung ${P} dan ${P}\\. Cari M\\.`),
        10,
        ([a, b, c, e]) => [(a + c) / 2, (b + e) / 2],
      ],
      [
        "triangle area",
        re(`Segi tiga \\d+ mempunyai bucu A${P}, B${P} dan C${P}\\. Cari luas\\.`),
        5,
        ([ax, ay, bx, by, cx, cy]) => Math.abs((bx - ax) * (cy - ay) - (by - ay) * (cx - ax)) / 2,
      ],
      [
        "other endpoint",
        re(`M${P} ialah titik tengah AB dan A${P}\\. Cari B bagi kes \\d+\\.`),
        5,
        ([mx, my, ax, ay]) => [2 * mx - ax, 2 * my - ay],
      ],
      [
        "perimeter",
        re(`Segi tiga koordinat \\d+ mempunyai A${P}, B${P}, C${P}\\. Cari perimeter\\.`),
        5,
        ([a, b, c, e, f, g]) => d(a, b, c, e) + d(c, e, f, g) + d(f, g, a, b),
      ],
      [
        "fraction of the way",
        re(
          `Titik P membahagi AB pada ${D}% perjalanan dari A${P} ke B${P} bagi kes \\d+\\. Cari P\\.`,
        ),
        5,
        ([p, ax, ay, bx, by]) => [ax + (p / 100) * (bx - ax), ay + (p / 100) * (by - ay)],
      ],
      [
        "radius from diameter",
        re(
          `M\\(${D},${D}\\) ialah pusat bulatan dan A${P}, B${P} ialah hujung diameter \\d+\\. Cari jejari\\.`,
        ),
        5,
        ([, , ax, ay, bx, by]) => d(ax, ay, bx, by) / 2,
      ],
      [
        "quadrilateral area",
        re(
          `Sisi empat \\d+ mempunyai bucu berturutan ${P}, ${P}, ${P} dan ${P}\\. Cari luasnya\\.`,
        ),
        5,
        (v) =>
          Math.abs(
            [0, 1, 2, 3].reduce(
              (s, k) => s + v[2 * k] * v[(2 * k + 3) % 8] - v[2 * k + 1] * v[(2 * k + 2) % 8],
              0,
            ),
          ) / 2,
      ],
    ]);
  });

  it("Chapter 8: functions", () => {
    const lin = (s: string) => {
      const m = /^(−?\d*)x(?: ([+−]) (\d+))?$/.exec(s.replace(/^y\s?=\s?/, ""));
      if (!m) throw new Error(`Unparsed rule ${s}`);
      const a = m[1] === "" ? 1 : m[1] === "−" ? -1 : N(m[1]);
      return { a, c: m[3] ? (m[2] === "−" ? -1 : 1) * N(m[3]) : 0 };
    };
    const R = String.raw`(−?\d*x(?: [+−] \d+)?)`;
    check(8, c8, [
      [
        "f(x)",
        re(`Diberi f\\(x\\) = ${R}, cari f\\(${D}\\)\\.`),
        5,
        (_, m) => lin(m[1]).a * N(m[2]) + lin(m[1]).c,
      ],
      [
        "function machine",
        re(`Mesin fungsi \\d+ menggunakan f\\(x\\)=${R}\\. Cari output apabila x=${D}\\.`),
        10,
        (_, m) => lin(m[1]).a * N(m[2]) + lin(m[1]).c,
      ],
      [
        "solve f(x) = y",
        re(`Diberi f\\(x\\)=${R} dan f\\(x\\)=${D}, cari x\\.`),
        5,
        (_, m) => (N(m[2]) - lin(m[1]).c) / lin(m[1]).a,
      ],
      [
        "table value",
        re(`Lengkapkan nilai yang hilang dalam jadual \\d+: y=${R}, x=${D}\\.`),
        5,
        (_, m) => lin(m[1]).a * N(m[2]) + lin(m[1]).c,
      ],
      [
        "find a",
        re(`Diberi f\\(x\\)=ax(?: ([+−]) (\\d+))? dan f\\(${D}\\)=${D}\\. Cari a\\.`),
        5,
        (_, m) => (N(m[4]) - (m[2] ? (m[1] === "−" ? -1 : 1) * N(m[2]) : 0)) / N(m[3]),
      ],
      [
        "quadratic value",
        re(`Bagi g\\(x\\)=(−?\\d*)x²(?: ([+−]) (\\d+))?, cari g\\(${D}\\)\\.`),
        5,
        (_, m) =>
          (m[1] === "" ? 1 : m[1] === "−" ? -1 : N(m[1])) * N(m[4]) ** 2 +
          (m[3] ? (m[2] === "−" ? -1 : 1) * N(m[3]) : 0),
      ],
      [
        "cost model",
        re(
          `Kos C \\(RM\\) bagi situasi \\d+ diberi C = ${D}t(?: \\+ (\\d+))?, dengan t dalam jam\\. Cari kos apabila t = ${D}\\.`,
        ),
        5,
        ([rate, fixed, hours]) => rate * hours + (Number.isNaN(fixed) ? 0 : fixed),
      ],
      [
        "shifted graph",
        re(`Graf y=${R} dialih 3 unit ke atas\\. Cari nilai y baharu apabila x=${D}\\.`),
        5,
        (_, m) => lin(m[1]).a * N(m[2]) + lin(m[1]).c + 3,
      ],
      [
        "intersection",
        re(`Cari titik persilangan y=${R} dan y=${R}\\.`),
        5,
        (_, m) => {
          const [p, q] = [lin(m[1]), lin(m[2])];
          const x = (q.c - p.c) / (p.a - q.a);
          return [x, p.a * x + p.c];
        },
      ],
      [
        "point on graph",
        re(`Adakah titik ${P} terletak pada graf y=${R}\\?`),
        5,
        ([x, y], m) => {
          const g = lin(m[3]).a * x + lin(m[3]).c;
          return y === g
            ? "Ya; nilai y pada graf sama dengan koordinat-y titik"
            : y > g
              ? "Tidak; titik itu berada di atas graf"
              : "Tidak; titik itu berada di bawah graf";
        },
      ],
    ]);
    // Line through a point with a given gradient: the stored equation must have that gradient and pass through the point.
    for (const q of buildPairedQuizBank(8, "bm", c8)) {
      const m =
        /^Garis \d+ berkecerunan (-?\d+) melalui \((-?\d+),(-?\d+)\)\. Apakah persamaannya\?$/.exec(
          q.question,
        );
      if (!m) continue;
      const { a, c } = lin(q.options[q.answerIndex]);
      expect(a).toBe(N(m[1]));
      expect(a * N(m[2]) + c).toBe(N(m[3]));
      for (const [i, o] of q.options.entries())
        if (i !== q.answerIndex) {
          const other = lin(o);
          expect(other.a === a && other.c === c, `${q.id} duplicate equation ${o}`).toBe(false);
        }
    }
  });

  it("Chapter 9: speed and acceleration", () => {
    check(9, c9, [
      [
        "speed",
        re(`Kenderaan \\d+ bergerak ${D} km dalam ${D} jam\\. Cari lajunya\\.`),
        5,
        ([d, t]) => d / t,
      ],
      ["m/s → km/h", re(`Tukar ${D} m/s kepada km/h\\.`), 3, ([v]) => v * 3.6],
      ["km/h → m/s", re(`Tukar ${D} km/h kepada m/s\\.`), 2, ([v]) => v / 3.6],
      [
        "acceleration",
        re(
          `Laju objek \\d+ berubah daripada ${D} m/s kepada ${D} m/s dalam ${D} s\\. Cari pecutan\\.`,
        ),
        5,
        ([u, v, t]) => (v - u) / t,
      ],
      [
        "distance",
        re(`Seorang pelari \\d+ bergerak pada ${D} m/s selama ${D} s\\. Cari jarak\\.`),
        5,
        ([s, t]) => s * t,
      ],
      [
        "average speed",
        re(
          `Perjalanan \\d+ meliputi ${D} km dalam ${D} jam dan ${D} km dalam ${D} jam\\. Cari laju purata\\.`,
        ),
        5,
        ([a, b, c, d]) => (a + c) / (b + d),
      ],
      [
        "bus with stop",
        re(
          `Bas \\d+ menempuh ${D} km dalam ${D} jam dan berhenti ${D} jam\\. Cari laju purata bagi seluruh perjalanan\\.`,
        ),
        5,
        ([d, m, s]) => d / (m + s),
      ],
      [
        "metres to km",
        re(`Mesin \\d+ bergerak pada ${D} m/s selama ${D} s\\. Cari jarak dalam kilometer\\.`),
        5,
        ([s, t]) => (s * t) / 1000,
      ],
      [
        "motorcycle",
        re(
          `Laju motosikal \\d+ berubah daripada ${D} m/s kepada ${D} m/s dalam ${D} s\\. Tentukan pecutannya\\.`,
        ),
        5,
        ([u, v, t]) => (v - u) / t,
      ],
      [
        "deceleration",
        re(
          `Kenderaan \\d+ memperlahankan laju daripada ${D} m/s kepada ${D} m/s dalam ${D} s\\. Cari magnitud nyahpecutan\\.`,
        ),
        5,
        ([u, v, t]) => (u - v) / t,
      ],
      [
        "initial speed",
        re(`Objek \\d+ memecut pada ${D} m/s² selama ${D} s hingga ${D} m/s\\. Cari laju awal\\.`),
        5,
        ([a, t, v]) => v - a * t,
      ],
      [
        "out and back",
        re(
          `Seorang penunggang \\d+ pergi sejauh ${D} km pada ${D} km/h dan pulang melalui jarak sama pada ${D} km/h\\. Cari laju purata\\.`,
        ),
        5,
        ([d, o, b]) => (2 * d) / (d / o + d / b),
      ],
      [
        "delayed start",
        re(
          `Perjalanan \\d+ sejauh ${D} km dirancang dalam ${D} jam\\. Selepas kelewatan ${D} jam sebelum bergerak, apakah laju tetap diperlukan untuk tiba mengikut masa asal\\?`,
        ),
        5,
        ([d, p, l]) => d / (p - l),
      ],
      [
        "three stages",
        re(
          `Robot \\d+ bergerak pada ${D} km/h selama ${D} jam, ${D} km/h selama ${D} jam dan ${D} km/h selama ${D} jam\\. Cari laju purata\\.`,
        ),
        5,
        ([a, b, c, d, e, f]) => (a * b + c * d + e * f) / (b + d + f),
      ],
      [
        "continued acceleration",
        re(
          `Objek \\d+ berubah daripada ${D} m/s kepada ${D} m/s dalam ${D} s pada pecutan seragam, kemudian memecut ${D} s lagi pada kadar sama\\. Cari laju akhirnya\\.`,
        ),
        5,
        ([u, v, t, e]) => v + ((v - u) / t) * e,
      ],
      [
        "km/h acceleration",
        re(
          `Laju akhir kereta \\d+ ialah ${D} km/h\\. Jika laju awal ${D} m/s dicapai selepas ${D} s, cari pecutan dalam m/s²\\.`,
        ),
        5,
        ([k, u, t]) => (k / 3.6 - u) / t,
      ],
      [
        "two routes",
        re(
          `Laluan A \\d+ ialah ${D} km pada ${D} km/h, diikuti laluan B ${D} km pada ${D} km/h\\. Berapa minitkah keseluruhan perjalanan\\?`,
        ),
        5,
        ([a, b, c, d]) => (a / b + c / d) * 60,
      ],
    ]);
  });

  it("Chapter 10: gradient and motion graphs", () => {
    check(10, c10, [
      [
        "gradient",
        re(`Garis \\d+ melalui ${P} dan ${P}\\. Cari kecerunan\\.`),
        5,
        ([a, b, c, d]) => (d - b) / (c - a),
      ],
      [
        "distance-time gradient",
        re(
          `Pada graf jarak-masa \\d+, jarak meningkat secara lurus daripada 0 kepada ${D} km dalam ${D} jam\\. Cari kecerunan\\.`,
        ),
        5,
        ([d, t]) => d / t,
      ],
      [
        "speed-time gradient",
        re(
          `Graf laju-masa \\d+ berubah secara lurus daripada ${D} m/s kepada ${D} m/s dalam ${D} s\\. Cari kecerunan\\.`,
        ),
        5,
        ([u, v, t]) => (v - u) / t,
      ],
      [
        "rectangle area",
        re(
          `Graf laju-masa \\d+ mengufuk pada ${D} m/s selama ${D} s\\. Cari luas di bawah graf\\.`,
        ),
        5,
        ([s, t]) => s * t,
      ],
      [
        "y from gradient",
        re(`Garis \\d+ berkecerunan ${D} melalui ${P}\\. Cari nilai y apabila x=${D}\\.`),
        5,
        ([m, x, y, x2]) => y + m * (x2 - x),
      ],
      [
        "classify",
        re(`Kelaskan kecerunan garis \\d+ melalui ${P} dan ${P}\\.`),
        5,
        ([a, b, c, d]) =>
          c === a
            ? "Tak tertakrif"
            : d === b
              ? "Sifar"
              : (d - b) / (c - a) > 0
                ? "Positif"
                : "Negatif",
      ],
      [
        "segment speed",
        re(
          `Graf jarak-masa \\d+ melalui \\(${D} jam, ${D} km\\) dan \\(${D} jam, ${D} km\\)\\. Cari laju pada segmen itu\\.`,
        ),
        5,
        ([t1, d1, t2, d2]) => (d2 - d1) / (t2 - t1),
      ],
      [
        "trapezium distance",
        re(
          `Pada graf laju-masa \\d+, laju berubah sekata daripada ${D} m/s kepada ${D} m/s dalam ${D} s\\. Cari jarak\\.`,
        ),
        5,
        ([u, v, t]) => ((u + v) * t) / 2,
      ],
      [
        "stop adds nothing",
        re(
          `Graf jarak-masa \\d+ menunjukkan gerakan pada ${D} km/h selama ${D} jam, kemudian berhenti ${D} jam\\. Cari jarak akhir\\.`,
        ),
        5,
        ([s, t]) => s * t,
      ],
      [
        "two rectangles",
        re(
          `Graf laju-masa \\d+ mempunyai dua bahagian mengufuk: ${D} m/s selama ${D} s dan ${D} m/s selama ${D} s\\. Cari jumlah jarak\\.`,
        ),
        5,
        ([a, b, c, d]) => a * b + c * d,
      ],
      [
        "collinear",
        re(`Adakah titik ${P}, ${P} dan ${P} segaris bagi kes \\d+\\?`),
        5,
        ([a, b, c, d, e, f]) =>
          (d - b) * (e - c) === (f - d) * (c - a)
            ? "Ya; kecerunan AB sama dengan kecerunan BC"
            : "Tidak; kecerunan AB berbeza daripada kecerunan BC",
      ],
      [
        "find k",
        re(`Garis \\d+ melalui ${P} dan \\(${D},k\\) dengan kecerunan ${D}\\. Cari k\\.`),
        5,
        ([x, y, x2, m]) => y + m * (x2 - x),
      ],
      [
        "trapezium then constant",
        re(
          `Graf laju-masa \\d+: laju berubah sekata daripada ${D} kepada ${D} m/s dalam ${D} s, kemudian kekal ${D} m/s selama ${D} s\\. Cari jumlah jarak\\.`,
        ),
        5,
        ([u, v, t1, s, t2]) => {
          expect(s).toBe(v); // "remains at" must continue the speed just reached
          return ((u + v) * t1) / 2 + s * t2;
        },
      ],
      [
        "up then down",
        re(
          `Graf laju-masa \\d+ berubah daripada ${D} kepada ${D} m/s dalam ${D} s, kemudian daripada ${D} kepada 0 dalam ${D} s\\. Cari jarak keseluruhan\\.`,
        ),
        5,
        ([u, v, t1, , t2]) => {
          expect(v).toBeGreaterThan(0);
          return ((u + v) * t1) / 2 + (v * t2) / 2;
        },
      ],
      [
        "round-trip duration",
        re(
          `Graf jarak-masa perjalanan \\d+ menunjukkan ${D} km ditempuh dalam ${D} jam, berhenti ${D} jam, kemudian pulang ${D} km pada ${D} km/h\\. Cari tempoh keseluruhan\\.`,
        ),
        5,
        ([, t, s, d, r]) => t + s + d / r,
      ],
      [
        "final speed",
        re(
          `Kawasan di bawah satu bahagian graf laju-masa \\d+ berbentuk trapezium seluas ${D} m dengan tempoh ${D} s dan laju awal ${D} m/s\\. Cari laju akhir\\.`,
        ),
        5,
        ([a, t, u]) => {
          const v = (2 * a) / t - u;
          expect(v > 0 && v !== u, "a trapezium needs two different, positive parallel sides").toBe(
            true,
          );
          return v;
        },
      ],
    ]);
  });

  it("Chapter 11: isometric transformations", () => {
    check(11, c11, [
      [
        "reflect in x-axis",
        re(`Pantulkan titik P\\d+${P} pada paksi-x\\.`),
        5,
        ([x, y]) => [x, -y],
      ],
      [
        "translate",
        re(`Titik A\\d+${P} ditranslasi oleh vektor ${P}\\. Cari imejnya\\.`),
        5,
        ([x, y, a, b]) => [x + a, y + b],
      ],
      [
        "rotate 180°",
        re(`Putarkan titik B\\d+${P} sebanyak 180° pada asalan\\.`),
        5,
        ([x, y]) => [-x, -y],
      ],
      [
        "reflect in x = k",
        re(`Pantulkan C\\d+${P} pada garis x=${D}\\.`),
        5,
        ([x, y, k]) => [2 * k - x, y],
      ],
      [
        "reflect in y = k",
        re(`Pantulkan D\\d+${P} pada garis y=${D}\\.`),
        5,
        ([x, y, k]) => [x, 2 * k - y],
      ],
      [
        "rotate 90° anticlockwise",
        re(`Putarkan E\\d+${P} 90° lawan arah jam pada asalan\\.`),
        5,
        ([x, y]) => [-y, x],
      ],
      [
        "rotate 90° clockwise",
        re(`Putarkan F\\d+${P} 90° ikut arah jam pada asalan\\.`),
        5,
        ([x, y]) => [y, -x],
      ],
      [
        "translation vector",
        re(`Titik G\\d+${P} dipetakan kepada G′${P} oleh translasi\\. Cari vektornya\\.`),
        5,
        ([x, y, X, Y]) => [X - x, Y - y],
      ],
      [
        "apply the same translation",
        re(
          `Titik H\\d+${P} dipetakan kepada H′${P}\\. Jika transformasinya translasi, cari imej titik J${P}\\.`,
        ),
        5,
        ([x, y, X, Y, jx, jy]) => [jx + X - x, jy + Y - y],
      ],
      [
        "identify the rotation",
        re(
          `Titik K\\d+${P} dipetakan kepada ${P} oleh putaran berpusat di asalan\\. Nyatakan putaran\\.`,
        ),
        5,
        ([x, y, X, Y]) =>
          X === -y && Y === x
            ? "90° lawan arah jam"
            : X === y && Y === -x
              ? "90° ikut arah jam"
              : X === -x && Y === -y
                ? "180°"
                : "?",
      ],
      [
        "translate then reflect",
        re(
          `Titik L\\d+${P} ditranslasi oleh ${P}, kemudian dipantulkan pada paksi-x\\. Cari imej akhir\\.`,
        ),
        5,
        ([x, y, a, b]) => [x + a, -(y + b)],
      ],
      [
        "rotate then translate",
        re(
          `Titik M\\d+${P} diputar 90° ikut arah jam, kemudian ditranslasi oleh \\(3,−2\\)\\. Cari imej akhir\\.`,
        ),
        5,
        ([x, y]) => [y + 3, -x - 2],
      ],
    ]);
    // Mirror-line identification: the stated line must map P onto P′.
    for (const q of buildPairedQuizBank(11, "bm", c11)) {
      const m =
        /^P\((-?\d+),(-?\d+)\) dipantulkan kepada P′\((-?\d+),(-?\d+)\)\. Apakah garis cermin\?$/.exec(
          q.question,
        );
      if (!m) continue;
      const [x, y, X, Y] = m.slice(1).map(Number);
      const line = q.options[q.answerIndex].replace(/−/g, "-");
      const image =
        line === "y = x"
          ? [y, x]
          : line.startsWith("x = ")
            ? [2 * N(line.slice(4)) - x, y]
            : [x, 2 * N(line.slice(4)) - y];
      expect(image, `${q.id} ${line}`).toEqual([X, Y]);
    }
  });

  it("Chapter 12: measures of central tendency", () => {
    check(12, c12, [
      ["mean", re(`Cari min bagi data \\d+: ([\\d, ]+)\\.`), 5, (_, m) => mean(list(m[1]))],
      ["median", re(`Tentukan median data \\d+: ([\\d, ]+)\\.`), 5, (_, m) => median(list(m[1]))],
      [
        "frequency mean",
        re(`Nilai ([\\d,]+) mempunyai kekerapan ([\\d,]+)\\. Cari min bagi jadual \\d+\\.`),
        5,
        (_, m) => {
          const v = list(m[1]),
            f = list(m[2]);
          return v.reduce((s, x, i) => s + x * f[i], 0) / f.reduce((a, b) => a + b, 0);
        },
      ],
      [
        "missing value",
        re(`Min bagi ([\\d, ]+) dan x ialah ${D}\\. Cari x\\.`),
        5,
        (_, m) => {
          const v = list(m[1]);
          return N(m[2]) * (v.length + 1) - v.reduce((a, b) => a + b, 0);
        },
      ],
      [
        "even median",
        re(`Cari median bagi set genap \\d+: ([\\d, ]+)\\.`),
        5,
        (_, m) => median(list(m[1])),
      ],
      [
        "shifted mean",
        re(`Setiap nilai dalam ([\\d, ]+) ditambah ${D}\\. Cari min baharu\\.`),
        5,
        (_, m) => mean(list(m[1])) + N(m[2]),
      ],
      [
        "combined mean",
        re(
          `Kumpulan A\\d+ mempunyai ${D} murid dengan min ${D}; kumpulan B mempunyai ${D} murid dengan min ${D}\\. Cari min gabungan\\.`,
        ),
        5,
        ([a, b, c, d]) => (a * b + c * d) / (a + c),
      ],
      [
        "added value",
        re(`Selepas satu nilai x ditambah kepada ([\\d, ]+), min menjadi ${D}\\. Tentukan x\\.`),
        5,
        (_, m) => {
          const v = list(m[1]);
          return N(m[2]) * (v.length + 1) - v.reduce((a, b) => a + b, 0);
        },
      ],
      [
        "outlier removed",
        re(`Data \\d+ ialah ([\\d, ]+)\\. Berapakah perubahan min jika pencilan ${D} dibuang\\?`),
        5,
        (_, m) => {
          const v = list(m[1]);
          return Math.abs(mean(v) - mean(v.filter((x) => x !== N(m[2]))));
        },
      ],
      [
        "linear transform",
        re(
          `Setiap nilai x dalam ([\\d, ]+) ditukar kepada ${D}x ([+−]) ${D}\\. Cari min data baharu\\.`,
        ),
        5,
        (_, m) => N(m[2]) * mean(list(m[1])) + (m[3] === "−" ? -1 : 1) * N(m[4]),
      ],
      [
        "higher mean",
        re(
          `Set data A\\d+: ([\\d, ]+); B: ([\\d, ]+)\\. Set manakah mempunyai min lebih tinggi\\?`,
        ),
        5,
        (_, m) => {
          const [a, b] = [mean(list(m[1])), mean(list(m[2]))];
          return a > b ? "Set A" : a < b ? "Set B" : "Sama";
        },
      ],
    ]);
  });

  it("Chapter 13: simple probability", () => {
    check(13, c13, [
      [
        "experimental",
        re(
          `Dalam eksperimen \\d+, peristiwa A berlaku ${D} kali daripada ${D} percubaan\\. Cari kebarangkalian eksperimen\\.`,
        ),
        5,
        ([a, b]) => frac(a, b),
      ],
      [
        "theoretical",
        re(
          `Peristiwa B\\d+ mempunyai ${D} kesudahan memihak daripada ${D} kesudahan sama mungkin\\. Cari P\\(B\\)\\.`,
        ),
        5,
        ([a, b]) => frac(a, b),
      ],
      [
        "complement",
        re(`Diberi P\\(C\\d+\\)=${D}/${D}\\. Cari P\\(C′\\)\\.`),
        5,
        ([a, b]) => frac(b - a, b),
      ],
      [
        "chosen number",
        re(
          `Satu nombor dipilih daripada 1 hingga ${D}\\. Peristiwa A\\d+ ialah memilih salah satu daripada \\{([\\d,]+)\\}\\. Cari P\\(A\\)\\.`,
        ),
        5,
        ([n], m) => frac(list(m[2]).length, n),
      ],
      [
        "not red",
        re(
          `Sebuah beg \\d+ mengandungi ${D} guli merah dan ${D} guli biru\\. Cari kebarangkalian memilih guli bukan merah\\.`,
        ),
        5,
        ([r, b]) => frac(b, r + b),
      ],
      [
        "expected frequency",
        re(
          `Dalam ${D} percubaan, A\\d+ berlaku ${D} kali\\. Anggarkan kekerapan A dalam ${D} percubaan akan datang\\.`,
        ),
        5,
        ([t, s, f]) => (s / t) * f,
      ],
      [
        "good cards",
        re(`Daripada ${D} kad sama mungkin, ${D} rosak\\. Cari kebarangkalian memilih kad elok\\.`),
        5,
        ([t, b]) => frac(t - b, t),
      ],
      [
        "expected from P",
        re(
          `Diberi P\\(A\\d+\\)=${D}/${D}\\. Dalam ${D} percubaan, berapakah kekerapan jangkaan A\\?`,
        ),
        5,
        ([a, b, n]) => (a / b) * n,
      ],
      [
        "not blue",
        re(
          `Beg \\d+ mengandungi ${D} merah, ${D} biru dan ${D} hijau\\. Cari kebarangkalian memilih guli yang bukan biru\\.`,
        ),
        5,
        ([r, b, g]) => {
          expect(g, "a three-colour bag must contain green marbles").toBeGreaterThan(0);
          return frac(r + g, r + b + g);
        },
      ],
      [
        "red or blue",
        re(
          `Dalam beg \\d+, kebarangkalian memilih guli merah ialah ${D}/${D} dan guli biru ialah ${D}/${D}\\. Guli selebihnya hijau\\. Cari kebarangkalian memilih guli merah atau biru\\.`,
        ),
        5,
        ([a, b, c, d]) => frac(a * d + c * b, b * d),
      ],
      [
        "successes from failure rate",
        re(
          `Kebarangkalian gagal bagi ujian \\d+ ialah ${D}/${D}\\. Dalam ${D} cubaan, anggarkan bilangan kejayaan\\.`,
        ),
        5,
        ([a, b, n]) => ((b - a) / b) * n,
      ],
      [
        "red added",
        re(
          `Sebuah beg mempunyai ${D} guli merah daripada ${D} guli\\. Selepas ${D} guli merah ditambah, cari kebarangkalian memilih merah\\.`,
        ),
        5,
        ([r, t, a]) => frac(r + a, t + a),
      ],
      [
        "failures expected",
        re(
          `Dalam kajian \\d+, kejayaan berlaku ${D} kali daripada ${D}\\. Jika kadar itu kekal, berapakah kegagalan dijangka dalam ${D} percubaan\\?`,
        ),
        5,
        ([s, t, n]) => ((t - s) / t) * n,
      ],
    ]);
  });
});
