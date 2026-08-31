import { useState } from "react";
import type { LeverClassesBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * The three lever classes, drawn from one rule: whichever of fulcrum / load /
 * effort is named as `middle` is placed at the centre of the bar and the other
 * two go to the ends. That is the only thing that distinguishes the classes, so
 * generating the positions from it means a diagram cannot disagree with the
 * class it is labelled as.
 *
 * Labels come from the content data rather than single letters, because F/L/E
 * collide differently in BM (Fulkrum / Beban / Daya) and DLP.
 */

const BAR_LEFT = 56;
const BAR_RIGHT = 264;
const BAR_Y = 96;
const MID = (BAR_LEFT + BAR_RIGHT) / 2;

type Role = "fulcrum" | "load" | "effort";

/** Positions for the three roles given which one sits in the middle. */
function layout(middle: Role): Record<Role, number> {
  const others = (["fulcrum", "load", "effort"] as Role[]).filter((r) => r !== middle);
  return {
    [middle]: MID,
    [others[0]]: BAR_LEFT,
    [others[1]]: BAR_RIGHT,
  } as Record<Role, number>;
}

const COLOR: Record<Role, string> = {
  fulcrum: "fill-amber-300",
  load: "fill-rose-300",
  effort: "fill-emerald-300",
};

export function LeverClasses({ block, lang }: { block: LeverClassesBlock; lang?: string }) {
  const [active, setActive] = useState(block.classes[0]?.id ?? "first");
  const copy = figureCopy(lang);

  const cls = block.classes.find((c) => c.id === active) ?? block.classes[0];
  const pos = layout(cls.middle);
  const label: Record<Role, string> = {
    fulcrum: block.fulcrumLabel,
    load: block.loadLabel,
    effort: block.effortLabel,
  };

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-2 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.classes.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={active === c.id}
            onClick={() => setActive(c.id)}
            className={conceptButtonClass(active === c.id)}
          >
            {c.name}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 320 160"
          className="mx-auto h-auto w-full min-w-[290px] max-w-[430px]"
          role="img"
          aria-label={cls.name}
        >
          {/* the rigid bar */}
          <line x1={BAR_LEFT - 12} y1={BAR_Y} x2={BAR_RIGHT + 12} y2={BAR_Y} className="stroke-primary/70" strokeWidth="5" />

          {/* fulcrum drawn as a triangle under the bar */}
          <path
            d={`M${pos.fulcrum - 14},${BAR_Y + 30} L${pos.fulcrum},${BAR_Y + 4} L${pos.fulcrum + 14},${BAR_Y + 30} Z`}
            className="fill-amber-300/80 stroke-amber-300"
            strokeWidth="1.5"
          />

          {/* load: a block pressing down */}
          <rect x={pos.load - 15} y={BAR_Y - 30} width={30} height={26} rx="3" className="fill-rose-300/30 stroke-rose-300" strokeWidth="2" />
          <line x1={pos.load} y1={BAR_Y - 34} x2={pos.load} y2={BAR_Y - 52} className="stroke-rose-300" strokeWidth="2.5" />
          <path d="M-4,-5 L0,3 L4,-5 Z" transform={`translate(${pos.load} ${BAR_Y - 34})`} className="fill-rose-300" />

          {/* effort: an arrow showing the applied force */}
          <line x1={pos.effort} y1={BAR_Y - 52} x2={pos.effort} y2={BAR_Y - 8} className="stroke-emerald-300" strokeWidth="2.5" />
          <path d="M-4,-5 L0,3 L4,-5 Z" transform={`translate(${pos.effort} ${BAR_Y - 8})`} className="fill-emerald-300" />

          {/* role labels, positioned under the bar so they never sit on the arrows */}
          {(["fulcrum", "load", "effort"] as Role[]).map((role) => (
            <text
              key={role}
              x={pos[role]}
              y={BAR_Y + 48}
              textAnchor="middle"
              fontSize="10"
              fontWeight="bold"
              className={COLOR[role]}
            >
              {label[role]}
            </text>
          ))}
        </svg>
      </div>

      <p
        aria-live="polite"
        className="mt-2 min-h-[2.75rem] rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] leading-relaxed text-foreground"
      >
        <b className="text-primary">{cls.name}</b> — {cls.note} <i className="text-muted-foreground">{cls.examples}</i>
      </p>

      {/* the numerical relationship, and one worked example before any quiz asks for it */}
      <div className="mt-2.5 rounded-xl border border-primary/25 bg-secondary/30 px-3 py-2.5">
        <p className="font-display text-center text-[13px] font-bold text-primary">{block.formula}</p>
      </div>
      <div className="mt-2 rounded-xl border border-border bg-secondary/20 px-3 py-2.5">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted-foreground">
          {block.workedExample.title}
        </p>
        <p className="mt-1 text-[12px] leading-relaxed text-foreground">{block.workedExample.given}</p>
        <p className="mt-1 font-display text-[12px] leading-relaxed text-muted-foreground">
          {block.workedExample.working}
        </p>
        <p className="mt-1 font-display text-[13px] font-bold text-emerald-300">{block.workedExample.answer}</p>
      </div>
    </div>
  );
}
