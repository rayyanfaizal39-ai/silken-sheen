import { useState, type ReactElement } from "react";
import type { CircuitSymbolsBlock } from "@/content/form2/science/interactive-types";
import { figureCopy } from "./figure-copy";

/**
 * Table 7.1 as the textbook draws it — one row per component, its exact
 * standard circuit symbol, and a one-line purpose — taught before a learner
 * is expected to read the symbols inside `CircuitMeterDiagram` or
 * `ApparatusDiagram`.
 *
 * Every symbol is deterministic SVG built to the standard convention (IEC-style
 * as used in the KSSM textbook), not generated artwork, so it stays exact and
 * needs no per-language asset.
 */
const SYMBOL_VIEWBOX = "0 0 64 32";

/** Selected -> the AcadeMY primary colour; idle -> the neutral foreground. Never a geometry change. */
const symbolColour = (active: boolean) => (active ? "stroke-primary" : "stroke-foreground");
const symbolFill = (active: boolean) => (active ? "fill-primary" : "fill-foreground");

/**
 * The wrapper around one symbol's `<svg>`: a glow/outline on the selected
 * one, a slight dim on every other one once something is selected, and
 * nothing at all before any row has been tapped. Exported so the response to
 * selection can be asserted directly, without simulating a click.
 */
export function symbolWrapperClass(isActive: boolean, anySelected: boolean): string {
  const base = "inline-flex items-center justify-center rounded-md p-1 transition-all";
  if (isActive)
    return `${base} bg-primary/10 ring-2 ring-primary ring-offset-1 ring-offset-background`;
  return anySelected ? `${base} opacity-45` : base;
}

function CellSymbol({ active }: { active: boolean }) {
  return (
    <g className={symbolColour(active)} strokeWidth="2.5" strokeLinecap="round">
      <line x1={4} y1={16} x2={26} y2={16} />
      <line x1={26} y1={7} x2={26} y2={25} />
      <line x1={34} y1={11} x2={34} y2={21} strokeWidth="4.5" />
      <line x1={34} y1={16} x2={60} y2={16} />
    </g>
  );
}

function BatterySymbol({ active }: { active: boolean }) {
  return (
    <g className={symbolColour(active)} strokeWidth="2.5" strokeLinecap="round">
      <line x1={2} y1={16} x2={18} y2={16} />
      <line x1={18} y1={7} x2={18} y2={25} />
      <line x1={26} y1={11} x2={26} y2={21} strokeWidth="4.5" />
      <line x1={34} y1={7} x2={34} y2={25} />
      <line x1={42} y1={11} x2={42} y2={21} strokeWidth="4.5" />
      <line x1={42} y1={16} x2={62} y2={16} />
    </g>
  );
}

function SwitchSymbol({ active }: { active: boolean }) {
  return (
    <g className={symbolColour(active)} strokeWidth="2.5" strokeLinecap="round">
      <line x1={4} y1={16} x2={20} y2={16} />
      <circle cx={22} cy={16} r={2.4} className={`${symbolFill(active)} stroke-none`} />
      <line x1={22} y1={16} x2={42} y2={7} />
      <circle cx={44} cy={16} r={2.4} className={`${symbolFill(active)} stroke-none`} />
      <line x1={44} y1={16} x2={60} y2={16} />
    </g>
  );
}

function BulbSymbol({ active }: { active: boolean }) {
  return (
    <g className={symbolColour(active)} strokeWidth="2.5" strokeLinecap="round">
      <line x1={2} y1={16} x2={13} y2={16} />
      <circle cx={32} cy={16} r={13} fill="none" />
      <line x1={23} y1={7} x2={41} y2={25} />
      <line x1={41} y1={7} x2={23} y2={25} />
      <line x1={51} y1={16} x2={62} y2={16} />
    </g>
  );
}

function ResistorSymbol({ active }: { active: boolean }) {
  return (
    <g className={symbolColour(active)} strokeWidth="2.5" strokeLinecap="round" fill="none">
      <line x1={2} y1={16} x2={14} y2={16} />
      <rect x={14} y={8} width={36} height={16} />
      <line x1={50} y1={16} x2={62} y2={16} />
    </g>
  );
}

function RheostatSymbol({ active }: { active: boolean }) {
  return (
    <g className={symbolColour(active)} strokeWidth="2.5" strokeLinecap="round" fill="none">
      <line x1={2} y1={16} x2={14} y2={16} />
      <rect x={14} y={8} width={36} height={16} />
      <line x1={50} y1={16} x2={62} y2={16} />
      <line x1={12} y1={28} x2={48} y2={4} markerEnd="url(#rheostat-arrow)" />
      <defs>
        <marker
          id="rheostat-arrow"
          markerWidth="7"
          markerHeight="7"
          refX="3.5"
          refY="3.5"
          orient="auto"
        >
          <path d="M0,0 L7,3.5 L0,7 Z" className={symbolFill(active)} />
        </marker>
      </defs>
    </g>
  );
}

function FuseSymbol({ active }: { active: boolean }) {
  return (
    <g className={symbolColour(active)} strokeWidth="2.5" strokeLinecap="round" fill="none">
      <line x1={2} y1={16} x2={14} y2={16} />
      <rect x={14} y={9} width={36} height={14} rx={7} />
      <line x1={16} y1={22} x2={48} y2={10} strokeWidth="1.8" />
      <line x1={50} y1={16} x2={62} y2={16} />
    </g>
  );
}

function MeterSymbol({ letter, active }: { letter: string; active: boolean }) {
  return (
    <g className={symbolColour(active)} strokeWidth="2.5" strokeLinecap="round" fill="none">
      <line x1={2} y1={16} x2={13} y2={16} />
      <circle cx={32} cy={16} r={13} />
      <text
        x={32}
        y={21}
        textAnchor="middle"
        fontSize="14"
        fontWeight="bold"
        className={`${symbolFill(active)} stroke-none`}
      >
        {letter}
      </text>
      <line x1={51} y1={16} x2={62} y2={16} />
    </g>
  );
}

function WireSymbol({ active }: { active: boolean }) {
  return (
    <g className={symbolColour(active)} strokeWidth="2.5" strokeLinecap="round">
      <line x1={4} y1={16} x2={60} y2={16} />
      <circle cx={4} cy={16} r={2.4} className={`${symbolFill(active)} stroke-none`} />
      <circle cx={60} cy={16} r={2.4} className={`${symbolFill(active)} stroke-none`} />
    </g>
  );
}

const SYMBOL_ART: Record<string, (active: boolean) => ReactElement> = {
  cell: (active) => <CellSymbol active={active} />,
  battery: (active) => <BatterySymbol active={active} />,
  switch: (active) => <SwitchSymbol active={active} />,
  bulb: (active) => <BulbSymbol active={active} />,
  resistor: (active) => <ResistorSymbol active={active} />,
  rheostat: (active) => <RheostatSymbol active={active} />,
  ammeter: (active) => <MeterSymbol letter="A" active={active} />,
  voltmeter: (active) => <MeterSymbol letter="V" active={active} />,
  galvanometer: (active) => <MeterSymbol letter="G" active={active} />,
  fuse: (active) => <FuseSymbol active={active} />,
  wire: (active) => <WireSymbol active={active} />,
};

export function CircuitSymbolsTable({
  block,
  lang,
}: {
  block: CircuitSymbolsBlock;
  lang?: string;
}) {
  const [active, setActive] = useState(block.symbols[0]?.id ?? "");
  const copy = figureCopy(lang);
  const selected = block.symbols.find((s) => s.id === active) ?? block.symbols[0];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      <div
        className="overflow-hidden rounded-xl border border-border"
        role="group"
        aria-label={copy.controlsLabel}
      >
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-secondary/40">
              <th
                scope="col"
                className="px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-primary"
              >
                {lang === "bm" ? "Komponen" : "Component"}
              </th>
              <th
                scope="col"
                className="px-2.5 py-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-primary"
              >
                {lang === "bm" ? "Simbol" : "Symbol"}
              </th>
            </tr>
          </thead>
          <tbody>
            {block.symbols.map((s, i) => {
              const Art = SYMBOL_ART[s.id];
              const isActive = s.id === active;
              return (
                <tr key={s.id} className={i % 2 === 1 ? "bg-card/40" : undefined}>
                  <td className="p-0">
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActive(s.id)}
                      className={`min-h-11 w-full cursor-pointer px-2.5 py-1.5 text-left text-[12.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
                        isActive
                          ? "bg-primary/15 text-primary"
                          : "text-foreground hover:bg-primary/5"
                      }`}
                    >
                      {s.name}
                    </button>
                  </td>
                  <td className="px-2.5 py-1">
                    {Art && (
                      <span className={symbolWrapperClass(isActive, Boolean(active))}>
                        <svg
                          viewBox={SYMBOL_VIEWBOX}
                          className="h-6 w-14"
                          role="img"
                          aria-label={s.name}
                        >
                          {Art(isActive)}
                        </svg>
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {selected && (
        <p
          aria-live="polite"
          className="mt-2 min-h-[2.5rem] rounded-xl border border-primary/25 bg-primary/10 px-3 py-1.5 text-[12px] leading-relaxed text-foreground"
        >
          <b className="text-primary">{selected.name}</b> — {selected.purpose}
        </p>
      )}
    </div>
  );
}
