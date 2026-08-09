import { MATH_GREEN, MATH_RED } from "./mathTheme";

const FONT = "'Space Grotesk', sans-serif";

export interface RelationArrowSpec {
  inputs: (string | number)[];
  outputs: (string | number)[];
  pairs: [number, number][];
  isValid: boolean;
}

/**
 * Reusable arrow-diagram primitive: a small column of input dots, a column
 * of output dots, and lines joining them per `pairs` (colored green/red by
 * `isValid`). Generic over inputs/outputs/pairs so it isn't three one-off
 * SVGs — any future relation question can reuse this same shape.
 */
export function RelationArrowDiagram({ inputs, outputs, pairs, isValid }: RelationArrowSpec) {
  const color = isValid ? MATH_GREEN : MATH_RED;
  const y = (i: number) => 15 + i * 18;
  return (
    <svg width={100} height={70} viewBox="0 0 100 70">
      {pairs.map(([a, b], i) => (
        <line key={i} x1={15} y1={y(a)} x2={75} y2={y(b)} stroke={color} strokeWidth={1.2} />
      ))}
      {inputs.map((v, i) => (
        <g key={`i${i}`}>
          <circle cx={15} cy={y(i)} r={3} fill="#fff" />
          <text x={5} y={y(i) + 3} fontSize={8} fill="#fff" textAnchor="end" fontFamily={FONT}>
            {v}
          </text>
        </g>
      ))}
      {outputs.map((v, i) => (
        <g key={`o${i}`}>
          <circle cx={75} cy={y(i)} r={3} fill="#fff" />
          <text x={85} y={y(i) + 3} fontSize={8} fill="#fff" fontFamily={FONT}>
            {v}
          </text>
        </g>
      ))}
    </svg>
  );
}

export interface RelationCompareItem extends RelationArrowSpec {
  label: string;
}

/**
 * Three (or more) RelationArrowDiagrams side by side with a labeled
 * verdict under each — e.g. one-to-one ✓, many-to-one ✓, one-to-many ✗ —
 * showing that a function requires exactly one line out of every input.
 */
export function RelationCompare({
  items,
  caption,
}: {
  items: RelationCompareItem[];
  caption?: string;
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <div className="flex flex-wrap justify-center gap-4">
        {items.map((item, i) => (
          <div key={i} className="text-center">
            <RelationArrowDiagram
              inputs={item.inputs}
              outputs={item.outputs}
              pairs={item.pairs}
              isValid={item.isValid}
            />
            <div
              className="text-[9.5px] font-semibold"
              style={{ color: item.isValid ? MATH_GREEN : MATH_RED }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>
      {caption && <p className="mt-2 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}
