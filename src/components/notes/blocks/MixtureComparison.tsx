import { useState } from "react";
import type { MixtureComparisonBlock, MixtureKind } from "@/content/form2/science/interactive-types";

/**
 * Solution, suspension and colloid compared by the two tests that actually
 * separate them: shining a light through, and filtering.
 *
 * Each panel draws its own beaker and torch beam, so the three sit side by side
 * and can be read against each other. The colloid's beam is drawn as
 * intermediate rather than scattered — the source positions a colloid between a
 * solution and a suspension but states no light-path behaviour for it, and
 * inventing one here would teach a claim the syllabus does not make.
 */
function Beaker({ kind, selected }: { kind: MixtureKind; selected: boolean }) {
  const fill =
    kind.lightPasses === "yes"
      ? "fill-sky-400/15"
      : kind.lightPasses === "no"
        ? "fill-stone-400/45"
        : "fill-stone-300/25";

  // beam reaches the far wall in a solution, stops short in a suspension
  const beamEnd = kind.lightPasses === "yes" ? 96 : kind.lightPasses === "between" ? 68 : 48;

  return (
    <svg viewBox="0 0 110 74" className="h-auto w-full" role="img" aria-label={kind.name}>
      {/* torch */}
      <rect x={2} y={30} width="12" height="10" rx="2" className="fill-amber-400/70" />
      {/* beam */}
      <line
        x1={14}
        y1={35}
        x2={beamEnd}
        y2={35}
        className={kind.lightPasses === "no" ? "stroke-amber-300/40" : "stroke-amber-300/85"}
        strokeWidth={selected ? 3.4 : 2.4}
        strokeLinecap="round"
      />
      {/* beaker */}
      <path
        d="M28,14 L28,66 L92,66 L92,14"
        fill="none"
        className={selected ? "stroke-primary" : "stroke-border"}
        strokeWidth={selected ? 2.2 : 1.5}
      />
      <rect x={29} y={22} width="62" height="43" className={fill} />
      {/* undissolved particles settle only in a suspension */}
      {kind.lightPasses === "no" &&
        [34, 46, 58, 70, 82].map((x) => (
          <circle key={x} cx={x} cy={62} r="2.2" className="fill-stone-200/70" />
        ))}
    </svg>
  );
}

export function MixtureComparison({ block }: { block: MixtureComparisonBlock }) {
  const [active, setActive] = useState<string | null>(null);
  const activeKind = block.kinds.find((k) => k.id === active) ?? null;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      <div className="grid gap-2.5 sm:grid-cols-3">
        {block.kinds.map((kind) => {
          const isActive = active === kind.id;
          return (
            <button
              key={kind.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(isActive ? null : kind.id)}
              className={`flex flex-col rounded-xl border px-2.5 py-2 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                isActive
                  ? "border-primary bg-primary/10"
                  : "border-border bg-card/55 hover:border-primary"
              }`}
            >
              <p className="font-display text-[13px] font-bold text-foreground">{kind.name}</p>
              <div className="my-1.5">
                <Beaker kind={kind} selected={isActive} />
              </div>
              <dl className="flex flex-col gap-0.5">
                <div>
                  <dt className="inline text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    {block.appearanceLabel}:{" "}
                  </dt>
                  <dd className="inline text-[11.5px] leading-snug text-foreground">
                    {kind.appearance}
                  </dd>
                </div>
                <div>
                  <dt className="inline text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    {block.filtrationLabel}:{" "}
                  </dt>
                  <dd className="inline text-[11.5px] leading-snug text-foreground">
                    {kind.filtration}
                  </dd>
                </div>
                <div>
                  <dt className="inline text-[10px] font-bold uppercase tracking-wide text-muted-foreground">
                    {block.exampleLabel}:{" "}
                  </dt>
                  <dd className="inline text-[11.5px] leading-snug text-foreground">
                    {kind.example}
                  </dd>
                </div>
              </dl>
            </button>
          );
        })}
      </div>

      <p
        aria-live="polite"
        className={`mt-2.5 min-h-[2.5rem] rounded-xl border px-3 py-1.5 text-[12px] leading-relaxed ${
          activeKind
            ? "border-primary/25 bg-primary/10 text-foreground"
            : "border-border bg-secondary/30 text-muted-foreground"
        }`}
      >
        {activeKind ? (
          <>
            <b className="text-primary">{activeKind.name}</b> — {activeKind.note}
          </>
        ) : (
          block.hint
        )}
      </p>
    </div>
  );
}
