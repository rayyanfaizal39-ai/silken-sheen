import { useState } from "react";
import { ArrowHead } from "@/components/notes/chapter8/Chapter8PhotoFigure";

/**
 * A deterministic spring-balance diagram: the barrel with a 0-10 N scale,
 * a pointer that slides to the reading, a hook, and an object hanging from
 * it. Three states (100 g / 500 g / 1 kg) let a learner watch the pointer
 * move to roughly 1 N / 5 N / 10 N — the same 100 g -> 1 N relationship the
 * section already teaches in words.
 */

const SCALE_TOP = 26;
const SCALE_BOTTOM = 146;
const SCALE_MAX_N = 10;

function readingY(newtons: number) {
  return SCALE_TOP + (newtons / SCALE_MAX_N) * (SCALE_BOTTOM - SCALE_TOP);
}

export function SpringBalanceDiagram({ lang }: { lang?: string }) {
  const states = [
    { id: "100g", mass: lang === "bm" ? "100 g" : "100 g", newtons: 1 },
    { id: "500g", mass: lang === "bm" ? "500 g" : "500 g", newtons: 5 },
    { id: "1kg", mass: lang === "bm" ? "1 kg" : "1 kg", newtons: 10 },
  ] as const;
  const [active, setActive] = useState<(typeof states)[number]["id"]>("100g");
  const current = states.find((s) => s.id === active) ?? states[0];
  const pointerY = readingY(current.newtons);

  const ticks = [0, 2, 4, 6, 8, 10];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <div
        className="mb-2.5 flex flex-wrap gap-1.5"
        role="group"
        aria-label={lang === "bm" ? "Pilih jisim" : "Choose a mass"}
      >
        {states.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={active === s.id}
            onClick={() => setActive(s.id)}
            className={`min-h-11 cursor-pointer rounded-full border-2 px-3.5 py-1.5 text-[12px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              active === s.id
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-card/55 text-muted-foreground hover:border-primary"
            }`}
          >
            {s.mass}
          </button>
        ))}
      </div>

      <svg
        viewBox="0 0 180 220"
        className="mx-auto h-auto w-full max-w-[220px]"
        role="img"
        aria-label={lang === "bm" ? "Neraca spring" : "Spring balance"}
      >
        <ArrowHead id="ch8-spring-pointer" className="fill-amber-300" />

        {/* the barrel */}
        <rect
          x={55}
          y={14}
          width={40}
          height={148}
          rx={10}
          className="fill-none stroke-sky-400/70"
          strokeWidth="2.2"
        />
        {/* the hanging ring at the top */}
        <circle cx={75} cy={7} r={6} className="fill-none stroke-sky-400/70" strokeWidth="2.2" />
        <line x1={75} y1={13} x2={75} y2={17} className="stroke-sky-400/70" strokeWidth="2.2" />

        {/* scale ticks and numbers, 0 at top to 10 N at the bottom */}
        {ticks.map((n) => {
          const y = readingY(n);
          return (
            <g key={n}>
              <line
                x1={95}
                y1={y}
                x2={102}
                y2={y}
                className="stroke-muted-foreground"
                strokeWidth="1.5"
              />
              <text x={107} y={y + 3.5} fontSize="9" className="fill-muted-foreground">
                {n}
              </text>
            </g>
          );
        })}
        <text x={130} y={SCALE_BOTTOM + 6} fontSize="9" fontWeight="bold" className="fill-primary">
          N
        </text>

        {/* the pointer, sliding to the current reading */}
        <line
          x1={40}
          y1={pointerY}
          x2={54}
          y2={pointerY}
          className="stroke-amber-300"
          strokeWidth="3"
          markerEnd="url(#ch8-spring-pointer)"
        />
        <text
          x={38}
          y={pointerY - 6}
          textAnchor="end"
          fontSize="11"
          fontWeight="bold"
          className="fill-amber-300"
        >
          {current.newtons} N
        </text>

        {/* the hook, just below the barrel */}
        <line x1={75} y1={162} x2={75} y2={176} className="stroke-sky-400/70" strokeWidth="2.4" />
        <circle cx={75} cy={182} r={7} className="fill-none stroke-sky-400/70" strokeWidth="2.4" />

        {/* the object hanging from the hook */}
        <rect
          x={62}
          y={188}
          width={26}
          height={20}
          rx={3}
          className="fill-primary/15 stroke-primary"
          strokeWidth="2"
        />
        <text
          x={75}
          y={201}
          textAnchor="middle"
          fontSize="9"
          fontWeight="bold"
          className="fill-primary"
        >
          {current.mass}
        </text>
      </svg>

      <p
        aria-live="polite"
        className="mt-2 text-center text-[12px] leading-relaxed text-muted-foreground"
      >
        {lang === "bm"
          ? `${current.mass} mempunyai berat lebih kurang ${current.newtons} N.`
          : `${current.mass} has a weight of about ${current.newtons} N.`}
      </p>
    </div>
  );
}
