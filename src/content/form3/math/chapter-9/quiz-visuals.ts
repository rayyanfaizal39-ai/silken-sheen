import type { MathQuestionVisual } from "@/features/quiz/visuals/mathQuestionVisual";
import { t } from "../quiz-geometry";
import { coordinates, equation, point } from "../quiz-coordinates";
const line = (
  a: number,
  b: number,
  c: number,
  label: string,
  domain: [number, number, number, number] = [-6, 6, -6, 6],
) =>
  coordinates(
    t(
      "Persamaan garis diberi; tiada nilai jawapan dilabel.",
      "The line equation is given; no answer values are labelled.",
    ),
    { domain, step: 2, lines: [equation(a, b, c, label)] },
  );
const lines = (
  entries: [number, number, number, string][],
  domain: [number, number, number, number] = [-6, 6, -6, 6],
) =>
  coordinates(
    t(
      "Dua persamaan diberi; tiada titik persilangan jawapan dilabel.",
      "Two given equations; no solution intersection is labelled.",
    ),
    { domain, step: 2, lines: entries.map((e) => equation(...e)) },
  );
export const MATH_F3_C9_QUIZ_VISUALS: Record<number, MathQuestionVisual> = {
  3: line(-2, 1, 9, "y = 2x + 9", [-6, 6, -2, 10]),
  4: line(-2, 1, 9, "y = 2x + 9", [-6, 6, -2, 10]),
  7: line(0, 1, 6, "y = 6", [-2, 10, -2, 10]),
  8: line(1, 0, 2, "x = 2"),
  13: line(2, 3, 12, "3y = −2x + 12", [-2, 10, -2, 10]),
  14: line(2, 3, 12, "3y = −2x + 12", [-2, 10, -2, 10]),
  15: coordinates(
    t(
      "P(2,8) dan garis y = 3x + 2 diberi.",
      "P(2,8) and the line y = 3x + 2 are given.",
    ),
    {
      domain: [-2, 10, -2, 10],
      lines: [equation(-3, 1, 2, "y = 3x + 2")],
      points: [point("P", 2, 8)],
    },
  ),
  16: coordinates(
    t(
      "P(2,8) dan garis y = 3x + 2 diberi.",
      "P(2,8) and the line y = 3x + 2 are given.",
    ),
    {
      domain: [-2, 10, -2, 10],
      lines: [equation(-3, 1, 2, "y = 3x + 2")],
      points: [point("P", 2, 8)],
    },
  ),
  20: coordinates(
    t(
      "P(1,2) dan Q(3,6) diberi. Cari kecerunan PQ.",
      "Given P(1,2) and Q(3,6). Find the gradient of PQ.",
    ),
    {
      domain: [-2, 8, -2, 8],
      points: [point("P", 1, 2), point("Q", 3, 6)],
      paths: [
        {
          points: [
            [1, 2],
            [3, 6],
          ],
        },
      ],
    },
  ),
  21: line(2, 3, 12, "2x + 3y = 12", [-2, 10, -2, 10]),
  22: line(2, 3, 12, "2x + 3y = 12", [-2, 10, -2, 10]),
  23: line(1, 2, 6, "x/6 + y/3 = 1", [-2, 10, -2, 10]),
  24: line(3, -4, 24, "3x − 4y = 24", [-2, 10, -8, 4]),
  25: coordinates(
    t(
      "P(−4,2) dan garis 3x − 2y = 12 diberi.",
      "P(−4,2) and the line 3x − 2y = 12 are given.",
    ),
    {
      domain: [-6, 6, -6, 6],
      points: [point("P", -4, 2)],
      lines: [equation(3, -2, 12, "3x − 2y = 12")],
    },
  ),
  26: coordinates(
    t(
      "P(6,−2) dan garis x/3 + y/2 = 1 diberi.",
      "P(6,−2) and the line x/3 + y/2 = 1 are given.",
    ),
    {
      domain: [-2, 10, -6, 6],
      points: [point("P", 6, -2)],
      lines: [equation(2, 3, 6, "x/3 + y/2 = 1")],
    },
  ),
  27: lines([
    [-3, 1, 5, "y = 3x + 5"],
    [6, -2, 9, "6x − 2y = 9"],
  ]),
  28: lines([
    [-3, 1, 8, "y = 3x + 8"],
    [-3, 6, -9, "6y = 3x − 9"],
  ]),
  29: line(4, 3, 18, "4x + 3y = 18", [-2, 10, -2, 10]),
  30: coordinates(
    t(
      "P(6,8) diberi; kecerunan garis yang dicari ialah 1/2.",
      "P(6,8) is given; the required line has gradient 1/2.",
    ),
    { domain: [-2, 10, -2, 10], points: [point("P", 6, 8)] },
  ),
  31: coordinates(
    t("P(−1,5) dan Q(2,−7) diberi.", "Given P(−1,5) and Q(2,−7)."),
    {
      domain: [-8, 8, -8, 8],
      step: 2,
      points: [point("P", -1, 5), point("Q", 2, -7)],
      paths: [
        {
          points: [
            [-1, 5],
            [2, -7],
          ],
        },
      ],
    },
  ),
  32: coordinates(
    t(
      "Garis rujukan dan P(5,4) diberi; garis selari yang dicari belum dilukis.",
      "The reference line and P(5,4) are given; the required parallel line is not drawn.",
    ),
    {
      domain: [-2, 10, -2, 10],
      lines: [equation(2, 1, 6, "y = −2x + 6")],
      points: [point("P", 5, 4)],
    },
  ),
  33: coordinates(t("A(2,4) dan M(0,4) diberi.", "Given A(2,4) and M(0,4)."), {
    points: [point("A", 2, 4), point("M", 0, 4, [-8, -8])],
    paths: [
      {
        points: [
          [0, 4],
          [2, 4],
        ],
      },
    ],
  }),
  34: coordinates(t("A(2,4) dan N(2,0) diberi.", "Given A(2,4) and N(2,0)."), {
    points: [point("A", 2, 4), point("N", 2, 0)],
    paths: [
      {
        points: [
          [2, 0],
          [2, 4],
        ],
      },
    ],
  }),
  35: lines([
    [2, 1, 5, "2x + y = 5"],
    [1, 2, 1, "x + 2y = 1"],
  ]),
  36: line(3, 1, 4, "y = −3x + 4"),
  37: line(6, 2, 15, "6x + 2y = 15"),
  38: line(3, 5, 15, "3x + 5y = 15"),
  39: line(3, 5, 15, "3x + 5y = 15"),
  40: line(3, 5, 15, "3x + 5y = 15"),
  41: line(2, 1, 8, "y = −2x + 8", [-2, 10, -2, 10]),
  42: line(-3, 1, 6, "y = 3x + 6"),
  43: coordinates(
    t(
      "Garis rujukan dan A(2,4) diberi; garis yang dicari belum dilukis.",
      "The reference line and A(2,4) are given; the required line is not drawn.",
    ),
    {
      lines: [equation(-1, 3, 6, "y = (1/3)x + 2")],
      points: [point("A", 2, 4)],
    },
  ),
  44: line(-1, 3, 6, "y = (1/3)x + 2"),
  45: lines([
    [-1, 1, 2, "y = x + 2"],
    [2, 3, 6, "2x + 3y = 6"],
  ]),
  46: lines(
    [
      [6, 3, 3, "3y = −6x + 3"],
      [2, 1, 14, "y + 2x = 14"],
    ],
    [-10, 6, -4, 12],
  ),
  47: lines([
    [2, 3, 3, "2x + 3y = 3"],
    [2, 6, 12, "2x + 6y = 12"],
  ]),
  48: lines([
    [-2, 1, 1, "y = 2x + 1"],
    [8, -4, 5, "8x − 4y = 5"],
  ]),
  49: line(-5, 8, 1, "8y = 5x + 1"),
  50: coordinates(
    t(
      "P(0,0), Q(800,0) dan jalan y = 0 diberi; unit ialah meter. Kedudukan klinik belum ditanda.",
      "P(0,0), Q(800,0) and road y = 0 are given; units are metres. The clinic position is not marked.",
    ),
    {
      domain: [-200, 1000, -200, 1000],
      step: 200,
      points: [point("P", 0, 0, [-8, -8]), point("Q", 800, 0, [8, -8])],
      lines: [equation(0, 1, 0, "y = 0")],
    },
  ),
  53: lines([
    [2, -1, 7, "2x − y = 7"],
    [1, 1, 5, "x + y = 5"],
  ]),
};
