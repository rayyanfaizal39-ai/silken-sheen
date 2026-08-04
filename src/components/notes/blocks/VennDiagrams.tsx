import { MATH_GREEN, MATH_RED, MATH_VIOLET } from "./mathTheme";

const FAINT = "#6b7593";
const FONT = "'Space Grotesk', sans-serif";

/**
 * Universal set ξ (rectangle) containing set A (ellipse) with subset B fully
 * nested inside A, plus sample elements as dots — ports buildVennDiagram
 * exactly (Chapter 11 mockup, static — always the same ξ/A/B={5,10} example
 * used once to open 11.2's lesson intro).
 */
export function VennSubsetDiagram({ caption }: { caption?: string }) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 280 200" className="w-full max-w-[320px]">
        <rect
          x={15}
          y={15}
          width={250}
          height={170}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
          rx={6}
        />
        <text x={25} y={37} fontSize={15} fill="#fff" fontFamily={FONT} fontWeight={700}>
          ξ
        </text>
        <ellipse
          cx={150}
          cy={105}
          rx={95}
          ry={65}
          fill="rgba(139,107,255,0.1)"
          stroke={MATH_VIOLET}
          strokeWidth={2}
        />
        <text x={70} y={55} fontSize={14} fill={MATH_VIOLET} fontFamily={FONT} fontWeight={700}>
          A
        </text>
        <ellipse
          cx={175}
          cy={105}
          rx={45}
          ry={35}
          fill="rgba(74,222,128,0.15)"
          stroke={MATH_GREEN}
          strokeWidth={2}
        />
        <text
          x={175}
          y={80}
          fontSize={13}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          B
        </text>
        <circle cx={175} cy={100} r={3} fill="#fff" />
        <text x={182} y={104} fontSize={11} fill="#fff" fontFamily={FONT}>
          5
        </text>
        <circle cx={185} cy={115} r={3} fill="#fff" />
        <text x={192} y={119} fontSize={11} fill="#fff" fontFamily={FONT}>
          10
        </text>
        <circle cx={105} cy={90} r={3} fill="#fff" />
        <text x={95} y={86} fontSize={11} fill="#fff" fontFamily={FONT}>
          1
        </text>
        <circle cx={110} cy={125} r={3} fill="#fff" />
        <text x={100} y={140} fontSize={11} fill="#fff" fontFamily={FONT}>
          2
        </text>
        <circle cx={255} cy={40} r={3} fill={FAINT} />
        <text x={245} y={36} fontSize={11} fill={FAINT} fontFamily={FONT}>
          7
        </text>
      </svg>
      {caption && <p className="mt-2.5 text-center text-[11.5px] text-slate-500">{caption}</p>}
    </div>
  );
}

/** Single set circle with its elements listed inside, plus a count label below. Ports buildElementCircle. */
export function SetElementsDiagram({
  setName,
  elements,
  countLabel,
}: {
  setName: string;
  elements: string;
  countLabel: string;
}) {
  const cx = 120;
  const cy = 65;
  const r = 55;
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 240 140" className="w-full max-w-[260px]">
        <ellipse
          cx={cx}
          cy={cy}
          rx={r + 15}
          ry={r}
          fill="rgba(139,107,255,0.1)"
          stroke={MATH_VIOLET}
          strokeWidth={2}
        />
        <text
          x={cx - r + 5}
          y={cy - r + 8}
          fontSize={13}
          fill={MATH_VIOLET}
          fontFamily={FONT}
          fontWeight={700}
        >
          {setName}
        </text>
        <text
          x={cx}
          y={cy + 4}
          fontSize={11.5}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {elements}
        </text>
        <text
          x={cx}
          y={132}
          fontSize={12}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {countLabel}
        </text>
      </svg>
    </div>
  );
}

/** Set circle plus one element checked either inside (member, green ✓) or outside (not a member, red ✗). Ports buildElementCheck. */
export function SetMembershipCheck({
  setName,
  elements,
  checkedElement,
  isIn,
}: {
  setName: string;
  elements: string;
  checkedElement: string;
  isIn: boolean;
}) {
  const cx = 115;
  const cy = 65;
  const r = 55;
  const checkX = isIn ? cx : cx + r + 30;
  const checkY = isIn ? cy + r - 10 : cy;
  const col = isIn ? MATH_GREEN : MATH_RED;
  const mark = isIn ? "✓" : "✗";
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 270 150" className="w-full max-w-[280px]">
        <ellipse
          cx={cx}
          cy={cy}
          rx={r + 15}
          ry={r}
          fill="rgba(139,107,255,0.1)"
          stroke={MATH_VIOLET}
          strokeWidth={2}
        />
        <text
          x={cx - r + 5}
          y={cy - r + 8}
          fontSize={13}
          fill={MATH_VIOLET}
          fontFamily={FONT}
          fontWeight={700}
        >
          {setName}
        </text>
        <text
          x={cx}
          y={cy - 6}
          fontSize={11}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {elements}
        </text>
        <text
          x={checkX}
          y={checkY}
          fontSize={13}
          fill={col}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {mark} {checkedElement}
        </text>
      </svg>
    </div>
  );
}

/** An empty set: dashed circle, ∅ symbol, and an already-localized caption. Ports buildEmptySet. */
export function EmptySetDiagram({ label }: { label: string }) {
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 200 130" className="w-full max-w-[220px]">
        <ellipse
          cx={100}
          cy={60}
          rx={70}
          ry={45}
          fill="none"
          stroke={FAINT}
          strokeWidth={2}
          strokeDasharray="5,4"
        />
        <text
          x={100}
          y={70}
          fontSize={26}
          fill={FAINT}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          ∅
        </text>
        <text x={100} y={122} fontSize={11.5} fill={FAINT} textAnchor="middle" fontFamily={FONT}>
          {label}
        </text>
      </svg>
    </div>
  );
}

/** Universal set ξ with set P's circle; P's elements inside, complement elements shown outside the circle but inside ξ. Ports buildVennComplementQ. */
export function SetComplementDiagram({
  pElements,
  complementElements,
}: {
  pElements: string;
  complementElements: string;
}) {
  const rectPad = 15;
  const w = 280;
  const h = 170;
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[300px]">
        <rect
          x={rectPad}
          y={rectPad}
          width={w - 2 * rectPad}
          height={h - 2 * rectPad}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
          rx={6}
        />
        <text
          x={rectPad + 10}
          y={rectPad + 22}
          fontSize={14}
          fill="#fff"
          fontFamily={FONT}
          fontWeight={700}
        >
          ξ
        </text>
        <ellipse
          cx={105}
          cy={90}
          rx={65}
          ry={50}
          fill="rgba(139,107,255,0.12)"
          stroke={MATH_VIOLET}
          strokeWidth={2}
        />
        <text
          x={105}
          y={55}
          fontSize={12}
          fill={MATH_VIOLET}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          P
        </text>
        <text
          x={105}
          y={95}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {pElements}
        </text>
        <text
          x={200}
          y={95}
          fontSize={11}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {complementElements}
        </text>
        <text x={200} y={60} fontSize={11} fill={MATH_GREEN} textAnchor="middle" fontFamily={FONT}>
          P′
        </text>
      </svg>
    </div>
  );
}

/** A set circle missing one element, shown outside with a red ✗. Ports buildMissingElementCheck. */
export function MissingElementCheck({
  setElements,
  missingElement,
}: {
  setElements: string;
  missingElement: string;
}) {
  const cx = 115;
  const cy = 70;
  const r = 55;
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 250 150" className="w-full max-w-[270px]">
        <ellipse
          cx={cx}
          cy={cy}
          rx={r + 10}
          ry={r}
          fill="rgba(139,107,255,0.1)"
          stroke={MATH_VIOLET}
          strokeWidth={2}
        />
        <text
          x={cx}
          y={cy + 4}
          fontSize={12}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {setElements}
        </text>
        <text
          x={cx + r + 40}
          y={cy}
          fontSize={13}
          fill={MATH_RED}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          ✗ {missingElement}
        </text>
      </svg>
    </div>
  );
}

/** Two overlapping circles A and B with sample elements in each region, to check a subset relation. Ports buildVennOverlapQ. */
export function VennOverlapDiagram({
  aOnlyEl,
  bothEl,
  bOnlyEl,
  aLabel,
  bLabel,
}: {
  aOnlyEl: string;
  bothEl: string;
  bOnlyEl: string;
  aLabel: string;
  bLabel: string;
}) {
  const cx1 = 95;
  const cx2 = 165;
  const cy = 75;
  const r = 60;
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox="0 0 260 150" className="w-full max-w-[280px]">
        <ellipse
          cx={cx1}
          cy={cy}
          rx={r}
          ry={r - 12}
          fill="rgba(139,107,255,0.1)"
          stroke={MATH_VIOLET}
          strokeWidth={2}
        />
        <ellipse
          cx={cx2}
          cy={cy}
          rx={r}
          ry={r - 12}
          fill="rgba(74,222,128,0.1)"
          stroke={MATH_GREEN}
          strokeWidth={2}
        />
        <text
          x={cx1 - r + 10}
          y={cy - r + 22}
          fontSize={12}
          fill={MATH_VIOLET}
          fontFamily={FONT}
          fontWeight={700}
        >
          {aLabel}
        </text>
        <text
          x={cx2 + r - 10}
          y={cy - r + 22}
          fontSize={12}
          fill={MATH_GREEN}
          textAnchor="end"
          fontFamily={FONT}
          fontWeight={700}
        >
          {bLabel}
        </text>
        <text
          x={cx1 - 25}
          y={cy + 4}
          fontSize={11}
          fill={MATH_RED}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {aOnlyEl}
        </text>
        <text
          x={(cx1 + cx2) / 2}
          y={cy + 4}
          fontSize={10.5}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {bothEl}
        </text>
        <text
          x={cx2 + 25}
          y={cy + 4}
          fontSize={11}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          {bOnlyEl}
        </text>
      </svg>
    </div>
  );
}

/** Small items shown as labeled dots, illustrating a combination-counting problem. Ports buildEventDots. */
export function EventDotsDiagram({ items }: { items: string[] }) {
  const w = 220;
  const cy = 45;
  const spacing = (w - 60) / (items.length - 1 || 1);
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox={`0 0 ${w} 90`} className="w-full max-w-[240px]">
        {items.map((it, i) => {
          const x = 30 + i * spacing;
          return (
            <g key={it}>
              <circle
                cx={x}
                cy={cy}
                r={18}
                fill="rgba(139,107,255,0.15)"
                stroke={MATH_VIOLET}
                strokeWidth={1.5}
              />
              <text
                x={x}
                y={cy + 4}
                fontSize={10}
                fill="#fff"
                textAnchor="middle"
                fontFamily={FONT}
                fontWeight={700}
              >
                {it}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * Three sets ξ, A, B (B fully inside A, both inside ξ) — the challenge
 * mission diagram. Ports buildVennTripleQ exactly (static — always the same
 * A={1,2,5,10}, B={5,10} example).
 */
export function VennTripleDiagram() {
  const rectPad = 15;
  const w = 260;
  const h = 180;
  return (
    <div className="mt-3 flex justify-center">
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[280px]">
        <rect
          x={rectPad}
          y={rectPad}
          width={w - 2 * rectPad}
          height={h - 2 * rectPad}
          fill="none"
          stroke="#fff"
          strokeWidth={2}
          rx={6}
        />
        <text
          x={rectPad + 10}
          y={rectPad + 22}
          fontSize={14}
          fill="#fff"
          fontFamily={FONT}
          fontWeight={700}
        >
          ξ
        </text>
        <ellipse
          cx={130}
          cy={100}
          rx={95}
          ry={60}
          fill="rgba(139,107,255,0.1)"
          stroke={MATH_VIOLET}
          strokeWidth={2}
        />
        <text
          x={60}
          y={55}
          fontSize={12}
          fill={MATH_VIOLET}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          A
        </text>
        <ellipse
          cx={150}
          cy={100}
          rx={42}
          ry={32}
          fill="rgba(74,222,128,0.15)"
          stroke={MATH_GREEN}
          strokeWidth={2}
        />
        <text
          x={150}
          y={78}
          fontSize={12}
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          B
        </text>
        <text
          x={150}
          y={105}
          fontSize={11}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          5, 10
        </text>
        <text
          x={90}
          y={120}
          fontSize={11}
          fill="#fff"
          textAnchor="middle"
          fontFamily={FONT}
          fontWeight={700}
        >
          1, 2
        </text>
      </svg>
    </div>
  );
}
