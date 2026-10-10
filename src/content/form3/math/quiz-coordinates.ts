import type {
  Coordinate,
  CoordinateDomain,
  CoordinateLine,
  MathCoordinateVisual,
} from "@/features/quiz/visuals/mathCoordinateVisual";
import { t } from "./quiz-geometry";
export const point = (
  name: string,
  x: number,
  y: number,
  offset?: Coordinate,
) => ({ name, at: [x, y] as Coordinate, offset });
export const equation = (
  a: number,
  b: number,
  c: number,
  label: string,
  dashed = false,
): CoordinateLine => ({ a, b, c, label, dashed });
export function coordinates(
  description: ReturnType<typeof t>,
  data: Partial<
    Omit<MathCoordinateVisual, "kind" | "title" | "description">
  > = {},
): MathCoordinateVisual {
  return {
    kind: "coordinate-plane",
    title: t("Maklumat diberi", "Given information"),
    description,
    domain: [-6, 6, -6, 6] as CoordinateDomain,
    step: 2,
    ...data,
  };
}
export function squareCoordinates(side: number): Partial<MathCoordinateVisual> {
  return {
    domain: [-2, side + 2, -2, side + 2],
    step: 2,
    paths: [
      {
        points: [
          [0, 0],
          [side, 0],
          [side, side],
          [0, side],
        ],
        closed: true,
      },
    ],
    points: [
      point("A", 0, 0, [-18, 28]),
      point("B", side, 0, [8, 20]),
      point("C", side, side, [8, -8]),
      point("D", 0, side, [-8, -8]),
    ],
  };
}
