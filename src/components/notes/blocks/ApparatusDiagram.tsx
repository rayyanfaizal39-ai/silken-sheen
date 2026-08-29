import { useState } from "react";
import type { ApparatusDiagramBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * The electromagnet experiment set-up, drawn as the circuit it actually is.
 *
 * The coil, rheostat, ammeter, switch and supply sit on one series loop —
 * which matters, because the ammeter must read the current through the coil and
 * the rheostat must be able to change it. Drawing them on separate stubs would
 * teach the wrong circuit even if every label were right.
 */
export function ApparatusDiagram({
  block,
  lang,
}: {
  block: ApparatusDiagramBlock;
  lang?: string;
}) {
  const [active, setActive] = useState<string | null>(null);
  const activePart = block.parts.find((p) => p.id === active) ?? null;
  const copy = figureCopy(lang);

  const on = (id: string) => active === id;
  const cls = (id: string) => (on(id) ? "stroke-primary" : "stroke-border");
  const wd = (id: string) => (on(id) ? 3 : 2);

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 190"
          className="mx-auto h-auto w-full min-w-[300px] max-w-[430px]"
          role="img"
          aria-label={block.title}
        >
          {/* series loop: supply -> switch -> ammeter -> rheostat -> coil -> back */}
          <path
            d="M30,40 L96,40 M130,40 L166,40 M206,40 L240,40 M290,40 L290,120 L200,120 M120,120 L30,120 L30,40"
            fill="none"
            className="stroke-border"
            strokeWidth="2"
          />

          {/* DC power supply on the left wire */}
          <g className={cls("supply")}>
            <line x1={19} y1={72} x2={41} y2={72} className="stroke-current" strokeWidth={wd("supply")} />
            <line x1={25} y1={82} x2={35} y2={82} className="stroke-current" strokeWidth={wd("supply") + 1} />
            <line x1={19} y1={92} x2={41} y2={92} className="stroke-current" strokeWidth={wd("supply")} />
          </g>

          {/* switch */}
          <g className={cls("switch")}>
            <circle cx={96} cy={40} r="2.6" className="fill-current" />
            <circle cx={130} cy={40} r="2.6" className="fill-current" />
            <line x1={96} y1={40} x2={127} y2={31} className="stroke-current" strokeWidth={wd("switch")} />
          </g>

          {/* ammeter, in the loop */}
          <g className={cls("ammeter")}>
            <circle cx={186} cy={40} r="14" fill="none" className="stroke-current" strokeWidth={on("ammeter") ? 2.8 : 1.8} />
            <text x={186} y={44.5} textAnchor="middle" fontSize="11" fontWeight="bold" className={on("ammeter") ? "fill-primary" : "fill-foreground"}>
              A
            </text>
          </g>

          {/* rheostat, in the loop */}
          <g className={cls("rheostat")}>
            <rect x={240} y={31} width="50" height="18" fill="none" className="stroke-current" strokeWidth={on("rheostat") ? 2.6 : 1.8} />
            <path d="M248,22 L282,22 L276,28" fill="none" className="stroke-current" strokeWidth={wd("rheostat") - 0.4} />
          </g>

          {/* iron rod wound with copper wire, on the bottom wire */}
          <g className={cls("rod")}>
            <rect x={120} y={112} width="80" height="16" rx="3" fill="none" className="stroke-current" strokeWidth={on("rod") ? 2.8 : 2} />
          </g>
          <g className={cls("coil")}>
            {[0, 1, 2, 3, 4].map((i) => (
              <ellipse
                key={i}
                cx={132 + i * 14}
                cy={120}
                rx={5}
                ry={14}
                fill="none"
                className="stroke-current"
                strokeWidth={on("coil") ? 2.6 : 1.8}
              />
            ))}
          </g>

          {/* Petri dish of pins under the rod */}
          <g className={cls("pins")}>
            <path d="M126,158 L194,158 L188,172 L132,172 Z" fill="none" className="stroke-current" strokeWidth={on("pins") ? 2.6 : 1.8} />
            {[140, 152, 164, 176].map((x) => (
              <line key={x} x1={x} y1={161} x2={x + 5} y2={169} className={on("pins") ? "stroke-primary" : "stroke-muted-foreground"} strokeWidth="1.6" />
            ))}
          </g>

          {/* retort stand holding the rod */}
          <g className={cls("stand")}>
            <line x1={272} y1={176} x2={272} y2={104} className="stroke-current" strokeWidth={wd("stand")} />
            <line x1={252} y1={176} x2={296} y2={176} className="stroke-current" strokeWidth={wd("stand")} />
            <line x1={272} y1={110} x2={206} y2={110} className="stroke-current" strokeWidth={wd("stand") - 0.4} />
          </g>
        </svg>
      </div>

      <p className="mt-1 text-center text-[11.5px] italic text-muted-foreground">{block.caption}</p>

      <div className="mt-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.parts.map((p) => {
          const isActive = active === p.id;
          return (
            <button
              key={p.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(isActive ? null : p.id)}
              className={conceptButtonClass(isActive)}
            >
              {p.label}
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className={`mt-2 min-h-[2.75rem] rounded-xl border px-3 py-2 text-[12px] leading-relaxed ${
          activePart
            ? "border-primary/25 bg-primary/10 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {activePart ? (
          <>
            <b className="text-primary">{activePart.label}</b> — {activePart.note}
          </>
        ) : (
          block.hint || copy.prompt
        )}
      </p>
    </div>
  );
}
