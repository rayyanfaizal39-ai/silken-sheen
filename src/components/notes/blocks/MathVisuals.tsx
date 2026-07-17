import type {
  FactorTreeNode,
  FactorVisual,
  MethodCard,
  NumberLineVisual,
  ProblemSolvingFlow,
  WorkedExample,
} from "@/data/content";

// Shared signature palette for the math problem-solving visuals — matches
// design-reference/mat-signature-visuals-ch2.html exactly (violet/blue/amber/green/red).
const VIOLET = "#8b6bff";
const BLUE = "#4fb0ff";
const AMBER = "#fbbf5a";
const GREEN = "#4ade80";
const RED = "#f87171";
const PRIME_PALETTE = [BLUE, VIOLET, AMBER, GREEN, RED];

function primeColorMap(primes: number[]): Map<number, string> {
  const map = new Map<number, string>();
  let next = 0;
  for (const p of primes) {
    if (!map.has(p)) {
      map.set(p, PRIME_PALETTE[next % PRIME_PALETTE.length]);
      next += 1;
    }
  }
  return map;
}

// ─── Worked Example ────────────────────────────────────────────────────────
export function WorkedExampleBlock({ example }: { example: WorkedExample }) {
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0c1128] p-4 sm:p-5">
      <div className="font-mono text-sm font-bold text-[#fbbf5a]">{example.problem}</div>
      <div className="mt-2.5 space-y-1.5">
        {example.steps.map((step, i) => (
          <div
            key={i}
            className="border-l-2 border-white/[0.10] pl-4 font-mono text-xs leading-6 text-slate-400"
          >
            {step}
          </div>
        ))}
      </div>
      <div className="mt-2.5 border-t border-white/[0.08] pt-2.5 font-mono text-sm font-bold text-[#4ade80]">
        {example.answer}
      </div>
    </div>
  );
}

// ─── Method comparison cards ───────────────────────────────────────────────
export function MethodCardsBlock({ methods }: { methods: MethodCard[] }) {
  return (
    <div className="flex flex-wrap gap-3.5">
      {methods.map((method) => (
        <div
          key={method.methodName}
          className="min-w-[220px] flex-1 rounded-2xl border border-white/[0.08] bg-[#0c1128] p-4"
        >
          <h5 className="font-display mb-2 text-[13px] font-bold text-[#8b6bff]">
            {method.methodName}
          </h5>
          <div className="space-y-1">
            {method.steps.map((step, i) => (
              <div key={i} className="font-mono text-[11px] leading-6 text-slate-400">
                {step}
              </div>
            ))}
          </div>
          <div className="mt-2 border-t border-white/[0.08] pt-2 font-mono text-[12.5px] font-bold text-[#4ade80]">
            {method.result}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── 4-step problem-solving flow ───────────────────────────────────────────
const PS_STEPS: { label: string; color: string }[] = [
  { label: "Understanding", color: VIOLET },
  { label: "Devising a Plan", color: BLUE },
  { label: "Implementing", color: AMBER },
  { label: "Reflection", color: GREEN },
];

export function ProblemSolvingFlowBlock({ flow }: { flow: ProblemSolvingFlow }) {
  const bodies: string[][] = [
    flow.understanding,
    flow.devisingPlan,
    flow.implementing,
    [flow.reflection],
  ];
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#0c1128] p-4 sm:p-5">
      <div className="mb-3 font-mono text-xs leading-6 text-slate-400">{flow.scenario}</div>
      <div className="flex flex-col">
        {PS_STEPS.map((step, i) => (
          <div key={step.label} className="relative flex gap-3.5 pb-5 pt-1 last:pb-0">
            {i < PS_STEPS.length - 1 && (
              <span
                className="absolute left-[17px] top-[42px] w-0.5 bg-white/[0.10]"
                style={{ height: "calc(100% - 20px)" }}
              />
            )}
            <div
              className="z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold text-[#050816]"
              style={{ background: step.color }}
            >
              {i + 1}
            </div>
            <div className="min-w-0 pt-1">
              <h6 className="font-display mb-1.5 text-[13px] font-bold" style={{ color: step.color }}>
                {step.label}
              </h6>
              <ul className="space-y-1 pl-4 text-[11.5px] leading-6 text-slate-400">
                {bodies[i].map((line, li) => (
                  <li key={li} className="list-disc">
                    {line}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Number line ────────────────────────────────────────────────────────────
export function NumberLineBlock({ line }: { line: NumberLineVisual }) {
  const { min, max, highlight = [] } = line;
  const values = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  const width = 60 + values.length * 46;
  const y = 40;
  const x = (v: number) => 30 + (v - min) * 46;

  return (
    <div className="flex justify-center overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#0c1128] p-4">
      <svg width={width} height={72} viewBox={`0 0 ${width} 72`}>
        <line x1={x(min) - 14} y1={y} x2={x(max) + 14} y2={y} stroke="rgba(148,163,184,0.35)" strokeWidth={1.5} />
        {values.map((v) => {
          const isHighlighted = highlight.includes(v);
          const isZero = v === 0;
          return (
            <g key={v}>
              <line x1={x(v)} y1={y - 5} x2={x(v)} y2={y + 5} stroke="rgba(148,163,184,0.35)" strokeWidth={1.5} />
              <circle
                cx={x(v)}
                cy={y}
                r={isHighlighted ? 6 : 3}
                fill={isHighlighted ? GREEN : isZero ? "#eef1fb" : "rgba(148,163,184,0.6)"}
              />
              <text
                x={x(v)}
                y={y + 24}
                textAnchor="middle"
                fontFamily="'JetBrains Mono', monospace"
                fontSize={13}
                fontWeight={isHighlighted || isZero ? 700 : 500}
                fill={isHighlighted ? GREEN : isZero ? "#eef1fb" : "#93a0c2"}
              >
                {v}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Factor tree + repeated-division ladder ────────────────────────────────
type LeafPos = { x: number; y: number; value: number; isPrime: boolean };
type Positioned = { node: FactorTreeNode; x: number; y: number };

function layoutTree(node: FactorTreeNode, depth: number, leafCounter: { n: number }, X_STEP: number, Y_STEP: number, Y_OFFSET: number): { pos: Positioned; leaves: LeafPos[]; lines: { x1: number; y1: number; x2: number; y2: number }[] } {
  const y = depth * Y_STEP + Y_OFFSET;
  if (!node.children) {
    const x = leafCounter.n * X_STEP + X_STEP / 2;
    leafCounter.n += 1;
    return {
      pos: { node, x, y },
      leaves: [{ x, y, value: node.value, isPrime: !!node.isPrime }],
      lines: [],
    };
  }
  const [left, right] = node.children;
  const leftLayout = layoutTree(left, depth + 1, leafCounter, X_STEP, Y_STEP, Y_OFFSET);
  const rightLayout = layoutTree(right, depth + 1, leafCounter, X_STEP, Y_STEP, Y_OFFSET);
  const x = (leftLayout.pos.x + rightLayout.pos.x) / 2;
  return {
    pos: { node, x, y },
    leaves: [...leftLayout.leaves, ...rightLayout.leaves],
    lines: [
      ...leftLayout.lines,
      ...rightLayout.lines,
      { x1: x, y1: y + 8, x2: leftLayout.pos.x, y2: leftLayout.pos.y - 10 },
      { x1: x, y1: y + 8, x2: rightLayout.pos.x, y2: rightLayout.pos.y - 10 },
    ],
  };
}

export function FactorVisualBlock({ visual }: { visual: FactorVisual }) {
  const { number, ladder, tree } = visual;

  // Repeated-division ladder: derive the quotient chain from the divisor list.
  const ladderRows: { divisor: number; quotient: number }[] = [];
  let running = number;
  for (const divisor of ladder) {
    running = running / divisor;
    ladderRows.push({ divisor, quotient: running });
  }
  const ladderColors = primeColorMap(ladder);
  const equation = `${number} = ${ladder.join("×")}`;

  // Factor tree layout.
  const X_STEP = 70;
  const Y_STEP = 55;
  const Y_OFFSET = 40;
  const leafCounter = { n: 0 };
  const { leaves, lines } = layoutTree(tree, 0, leafCounter, X_STEP, Y_STEP, Y_OFFSET);
  const treeColors = primeColorMap(leaves.map((l) => l.value));
  const treeWidth = leaves.length * X_STEP + 20;
  const maxDepth = Math.max(...leaves.map((l) => (l.y - Y_OFFSET) / Y_STEP));
  const treeHeight = maxDepth * Y_STEP + Y_OFFSET + 60;

  // Second pass to gather every node (internal + leaf) with correct x/y for text rendering.
  function collectAllNodes(node: FactorTreeNode, depth: number, counter: { n: number }): { x: number; y: number; value: number; isPrime: boolean }[] {
    const y = depth * Y_STEP + Y_OFFSET;
    if (!node.children) {
      const x = counter.n * X_STEP + X_STEP / 2;
      counter.n += 1;
      return [{ x, y, value: node.value, isPrime: !!node.isPrime }];
    }
    const [left, right] = node.children;
    const leftNodes = collectAllNodes(left, depth + 1, counter);
    const rightNodes = collectAllNodes(right, depth + 1, counter);
    const x = (leftNodes[0].x + rightNodes[rightNodes.length - 1].x) / 2;
    return [{ x, y, value: node.value, isPrime: false }, ...leftNodes, ...rightNodes];
  }
  const nodeCounter = { n: 0 };
  const nodeLabels = collectAllNodes(tree, 0, nodeCounter);

  return (
    <div className="flex flex-wrap justify-center gap-6 rounded-2xl border border-white/[0.08] bg-[#0c1128] p-4 sm:p-5">
      {/* Repeated division ladder */}
      <div className="flex flex-col items-center">
        <p className="mb-1 text-xs font-semibold text-slate-400">Repeated Division</p>
        <svg width={180} height={30 * (ladderRows.length + 1) + 50} viewBox={`0 0 180 ${30 * (ladderRows.length + 1) + 50}`}>
          <g fontFamily="'JetBrains Mono', monospace" fontSize={15} fontWeight={700}>
            <line x1={35} y1={10} x2={35} y2={10 + ladderRows.length * 30} stroke="rgba(148,163,184,0.35)" strokeWidth={1.5} />
            <line x1={30} y1={15} x2={160} y2={15} stroke="rgba(148,163,184,0.35)" strokeWidth={1.5} />
            <text x={90} y={25} textAnchor="middle" fill="#eef1fb">
              {number}
            </text>
            {ladderRows.map((row, i) => (
              <g key={i}>
                <text x={20} y={25 + (i + 1) * 30} textAnchor="middle" fill={ladderColors.get(row.divisor)}>
                  {row.divisor}
                </text>
                <text
                  x={90}
                  y={25 + (i + 1) * 30}
                  textAnchor="middle"
                  fill={row.quotient === 1 ? GREEN : "#eef1fb"}
                >
                  {row.quotient}
                </text>
              </g>
            ))}
          </g>
        </svg>
        <p className="mt-1 font-mono text-[13px] font-bold text-[#4ade80]">{equation}</p>
      </div>

      {/* Factor tree */}
      <div className="flex flex-col items-center">
        <p className="mb-1 text-xs font-semibold text-slate-400">Factor Tree</p>
        <svg width={treeWidth} height={treeHeight} viewBox={`0 0 ${treeWidth} ${treeHeight}`}>
          <g stroke="rgba(148,163,184,0.35)" strokeWidth={1.5}>
            {lines.map((l, i) => (
              <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} />
            ))}
          </g>
          <g fontFamily="'JetBrains Mono', monospace" fontSize={14} fontWeight={700} textAnchor="middle">
            {nodeLabels.map((n, i) => (
              <text key={i} x={n.x} y={n.y} fill={n.isPrime ? treeColors.get(n.value) : "#eef1fb"}>
                {n.value}
              </text>
            ))}
          </g>
        </svg>
        <p className="mt-1 font-mono text-[13px] font-bold text-[#4ade80]">{equation}</p>
      </div>
    </div>
  );
}
