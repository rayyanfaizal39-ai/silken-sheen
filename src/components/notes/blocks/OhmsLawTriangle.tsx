import { useState } from "react";
import type { OhmsTriangleBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

type Quantity = "V" | "I" | "R";

const FORMULA: Record<
  Quantity,
  keyof Pick<OhmsTriangleBlock, "vFormula" | "iFormula" | "rFormula">
> = {
  V: "vFormula",
  I: "iFormula",
  R: "rFormula",
};

/**
 * The V / I / R triangle every learner is taught to cover-and-read: cover the
 * quantity you want, and the other two show you the formula. Tapping a
 * letter covers it and reveals its rearrangement, rather than the triangle
 * only sitting there as a static reference image.
 */
export function OhmsLawTriangle({ block, lang }: { block: OhmsTriangleBlock; lang?: string }) {
  const [covered, setCovered] = useState<Quantity>("V");
  const copy = figureCopy(lang);

  const covers = (q: Quantity) => covered === q;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <svg
        viewBox="0 0 160 140"
        className="mx-auto h-auto w-full max-w-[190px]"
        role="img"
        aria-label={block.title}
      >
        <path d="M80,10 L150,130 L10,130 Z" fill="none" className="stroke-border" strokeWidth="2" />
        <line x1={10} y1={83.3} x2={150} y2={83.3} className="stroke-border" strokeWidth="2" />
        <line x1={55} y1={130} x2={91.7} y2={83.3} className="stroke-border" strokeWidth="2" />

        {/* V / I / R cells. Purely a mouse/touch convenience layered on the
            diagram — the button row below is the one accessible control,
            so these carry no separate focus stop or aria state. */}
        <g onClick={() => setCovered("V")} className="cursor-pointer" aria-hidden="true">
          <rect
            x={45}
            y={30}
            width={70}
            height={45}
            fill={covers("V") ? "currentColor" : "transparent"}
            className={covers("V") ? "text-primary" : ""}
            opacity={covers("V") ? 0.18 : 0}
          />
          <text
            x={80}
            y={62}
            textAnchor="middle"
            fontSize="26"
            fontWeight="bold"
            className={covers("V") ? "fill-primary" : "fill-foreground"}
          >
            V
          </text>
        </g>
        <g onClick={() => setCovered("I")} className="cursor-pointer" aria-hidden="true">
          <rect
            x={16}
            y={92}
            width={68}
            height={35}
            fill={covers("I") ? "currentColor" : "transparent"}
            className={covers("I") ? "text-primary" : ""}
            opacity={covers("I") ? 0.18 : 0}
          />
          <text
            x={45}
            y={118}
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            className={covers("I") ? "fill-primary" : "fill-foreground"}
          >
            I
          </text>
        </g>
        <g onClick={() => setCovered("R")} className="cursor-pointer" aria-hidden="true">
          <rect
            x={90}
            y={92}
            width={54}
            height={35}
            fill={covers("R") ? "currentColor" : "transparent"}
            className={covers("R") ? "text-primary" : ""}
            opacity={covers("R") ? 0.18 : 0}
          />
          <text
            x={117}
            y={118}
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            className={covers("R") ? "fill-primary" : "fill-foreground"}
          >
            R
          </text>
        </g>
      </svg>

      <div
        className="mt-2 flex flex-wrap justify-center gap-1.5"
        role="group"
        aria-label={copy.controlsLabel}
      >
        {(["V", "I", "R"] as Quantity[]).map((q) => (
          <button
            key={q}
            type="button"
            aria-pressed={covers(q)}
            onClick={() => setCovered(q)}
            className={conceptButtonClass(covers(q), "min-w-11")}
          >
            {q}
          </button>
        ))}
      </div>

      <p
        aria-live="polite"
        className="mt-2 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-center text-[16px] font-bold text-primary"
      >
        {block[FORMULA[covered]]}
      </p>
    </div>
  );
}
