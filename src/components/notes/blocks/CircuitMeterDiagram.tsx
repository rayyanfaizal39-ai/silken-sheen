import { useState } from "react";
import type { CircuitMeterDiagramBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * Where each meter joins the circuit.
 *
 * The single most examinable fact in this chapter is topological, so it is
 * drawn topologically: the main loop passes *through* the ammeter, while the
 * voltmeter hangs on its own branch that leaves the loop before the bulb and
 * rejoins it after. Selecting the voltmeter highlights that branch, which is
 * the only way to see at a glance that it is not part of the loop.
 *
 * Every wire below is an actual conducting path — there are no decorative
 * segments, and no component is drawn across a gap it does not bridge.
 */

// Loop geometry. The main circuit is a rectangle; the voltmeter branch bulges
// below the bulb, tapping the same two nodes the bulb sits between.
const L = 34;
const R = 286;
const TOP = 34;
const BOT = 138;
const BULB_L = 150;
const BULB_R = 196;
const BRANCH_Y = 186;

export function CircuitMeterDiagram({
  block,
  lang,
}: {
  block: CircuitMeterDiagramBlock;
  lang?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const activeLabel = block.labels.find((l) => l.id === active) ?? null;
  const copy = figureCopy(lang);

  const on = (id: string) => active === id;
  const wire = (id: string) => (on(id) ? "stroke-primary" : "stroke-border");
  const w = (id: string) => (on(id) ? 3 : 2);

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 214"
          className="mx-auto h-auto w-full min-w-[300px] max-w-[440px]"
          role="img"
          aria-label={block.title}
        >
          {/* ---------- main loop, drawn as four segments ---------- */}
          {/* top wire: left corner -> switch -> ammeter -> right corner */}
          <line x1={L} y1={TOP} x2={96} y2={TOP} className="stroke-border" strokeWidth="2" />
          <line x1={130} y1={TOP} x2={196} y2={TOP} className="stroke-border" strokeWidth="2" />
          <line x1={228} y1={TOP} x2={R} y2={TOP} className="stroke-border" strokeWidth="2" />
          {/* right wire down */}
          <line x1={R} y1={TOP} x2={R} y2={BOT} className="stroke-border" strokeWidth="2" />
          {/* bottom wire: right -> bulb -> left */}
          <line x1={R} y1={BOT} x2={BULB_R} y2={BOT} className="stroke-border" strokeWidth="2" />
          <line x1={BULB_L} y1={BOT} x2={L} y2={BOT} className="stroke-border" strokeWidth="2" />
          {/* left wire up */}
          <line x1={L} y1={BOT} x2={L} y2={TOP} className="stroke-border" strokeWidth="2" />

          {/* ---------- cell (on the left wire) ---------- */}
          <g className={wire("cell")}>
            <line x1={L - 11} y1={78} x2={L + 11} y2={78} className="stroke-current" strokeWidth={w("cell")} />
            <line x1={L - 6} y1={88} x2={L + 6} y2={88} className="stroke-current" strokeWidth={w("cell") + 1} />
          </g>
          <text x={L - 16} y={72} textAnchor="end" fontSize="8" className="fill-muted-foreground">
            +
          </text>

          {/* ---------- switch (top wire, drawn open-ish but closed) ---------- */}
          <g className={wire("switch")}>
            <circle cx={96} cy={TOP} r="2.6" className="fill-current" />
            <circle cx={130} cy={TOP} r="2.6" className="fill-current" />
            <line x1={96} y1={TOP} x2={127} y2={TOP - 9} className="stroke-current" strokeWidth={w("switch")} />
          </g>

          {/* ---------- AMMETER: sits IN the top wire, so the loop runs through it ---------- */}
          <g className={wire("ammeter")}>
            <circle
              cx={212}
              cy={TOP}
              r="15"
              fill="none"
              className="stroke-current"
              strokeWidth={on("ammeter") ? 2.8 : 1.8}
            />
            <text
              x={212}
              y={TOP + 4.5}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              className={on("ammeter") ? "fill-primary" : "fill-foreground"}
            >
              A
            </text>
          </g>

          {/* ---------- bulb (bottom wire) ---------- */}
          <g className={wire("bulb")}>
            <circle
              cx={173}
              cy={BOT}
              r="15"
              fill="none"
              className="stroke-current"
              strokeWidth={on("bulb") ? 2.8 : 1.8}
            />
            <line x1={163} y1={BOT - 10} x2={183} y2={BOT + 10} className="stroke-current" strokeWidth="1.4" />
            <line x1={183} y1={BOT - 10} x2={163} y2={BOT + 10} className="stroke-current" strokeWidth="1.4" />
          </g>

          {/* ---------- VOLTMETER: its own branch across the bulb ---------- */}
          <g className={on("voltmeter") ? "stroke-primary" : "stroke-sky-400/70"}>
            {/* tap down from the node on the bulb's left, across, and back up on its right */}
            <path
              d={`M${BULB_L},${BOT} L${BULB_L},${BRANCH_Y} L${157},${BRANCH_Y}`}
              fill="none"
              className="stroke-current"
              strokeWidth={on("voltmeter") ? 3 : 2}
            />
            <path
              d={`M${189},${BRANCH_Y} L${BULB_R},${BRANCH_Y} L${BULB_R},${BOT}`}
              fill="none"
              className="stroke-current"
              strokeWidth={on("voltmeter") ? 3 : 2}
            />
            {/* the two junction dots make it unmistakable that this is a branch */}
            <circle cx={BULB_L} cy={BOT} r="3" className="fill-current" />
            <circle cx={BULB_R} cy={BOT} r="3" className="fill-current" />
            <circle
              cx={173}
              cy={BRANCH_Y}
              r="15"
              fill="none"
              className="stroke-current"
              strokeWidth={on("voltmeter") ? 2.8 : 1.8}
            />
            <text
              x={173}
              y={BRANCH_Y + 4.5}
              textAnchor="middle"
              fontSize="12"
              fontWeight="bold"
              className={on("voltmeter") ? "fill-primary" : "fill-sky-300"}
            >
              V
            </text>
          </g>
        </svg>
      </div>

      <p className="mt-1 text-center text-[11.5px] font-semibold text-foreground">
        {block.ruleCaption}
      </p>

      <div
        className="mt-2 flex flex-wrap gap-1.5"
        role="group"
        aria-label={copy.controlsLabel}
      >
        {block.labels.map((label) => {
          const isActive = active === label.id;
          return (
            <button
              key={label.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(isActive ? null : label.id)}
              className={conceptButtonClass(isActive)}
            >
              {label.label}
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className={`mt-2 min-h-[2.75rem] rounded-xl border px-3 py-2 text-[12px] leading-relaxed ${
          activeLabel
            ? "border-primary/25 bg-primary/10 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {activeLabel ? (
          <>
            <b className="text-primary">{activeLabel.label}</b> — {activeLabel.note}
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </p>
    </div>
  );
}
