import { ArrowHead } from "@/components/notes/chapter8/Chapter8PhotoFigure";

/**
 * A deterministic, language-neutral lever-bar diagram for the Principle of
 * Moments: fulcrum near one end, a downward load arrow at the short arm, an
 * upward effort arrow at the long arm, and a dimension line under each arm
 * showing the distance that goes into the formula. Not drawn to the worked
 * example's own numbers — it illustrates the relationship (short arm, long
 * arm, two distances) the same way for every worked example.
 */
export function LeverPrincipleDiagram({
  loadLabel,
  effortLabel,
  fulcrumLabel,
  loadDistanceLabel,
  effortDistanceLabel,
}: {
  loadLabel: string;
  effortLabel: string;
  fulcrumLabel: string;
  loadDistanceLabel: string;
  effortDistanceLabel: string;
}) {
  const barY = 54;
  const barLeft = 24;
  const barRight = 276;
  const fulcrumX = 84;
  const dimY = barY + 46;

  return (
    <svg
      viewBox="0 0 300 130"
      className="mx-auto h-auto w-full max-w-[380px]"
      role="img"
      aria-label={`${loadLabel}, ${fulcrumLabel}, ${effortLabel}`}
    >
      <ArrowHead id="ch8-lp-load" className="fill-rose-300" />
      <ArrowHead id="ch8-lp-effort" className="fill-emerald-300" />

      {/* the rigid bar */}
      <line
        x1={barLeft - 6}
        y1={barY}
        x2={barRight + 6}
        y2={barY}
        className="stroke-primary/70"
        strokeWidth="5"
      />

      {/* fulcrum, drawn as a triangle under the bar */}
      <path
        d={`M${fulcrumX - 14},${barY + 26} L${fulcrumX},${barY + 2} L${fulcrumX + 14},${barY + 26} Z`}
        className="fill-amber-300/80 stroke-amber-300"
        strokeWidth="1.5"
      />
      <text
        x={fulcrumX}
        y={barY + 40}
        textAnchor="middle"
        fontSize="10"
        fontWeight="bold"
        className="fill-amber-300"
      >
        {fulcrumLabel}
      </text>

      {/* load: arrow pressing down at the short arm's end */}
      <line
        x1={barLeft}
        y1={barY - 34}
        x2={barLeft}
        y2={barY - 4}
        className="stroke-rose-300"
        strokeWidth="3.5"
        markerEnd="url(#ch8-lp-load)"
      />
      <text
        x={barLeft}
        y={barY - 40}
        textAnchor="middle"
        fontSize="10.5"
        fontWeight="bold"
        className="fill-rose-300"
      >
        {loadLabel}
      </text>

      {/* effort: arrow pulling up at the long arm's end */}
      <line
        x1={barRight}
        y1={barY - 4}
        x2={barRight}
        y2={barY - 34}
        className="stroke-emerald-300"
        strokeWidth="3.5"
        markerEnd="url(#ch8-lp-effort)"
      />
      <text
        x={barRight}
        y={barY - 40}
        textAnchor="middle"
        fontSize="10.5"
        fontWeight="bold"
        className="fill-emerald-300"
      >
        {effortLabel}
      </text>

      {/* dimension line: fulcrum to load */}
      <line
        x1={barLeft}
        y1={dimY}
        x2={fulcrumX}
        y2={dimY}
        className="stroke-muted-foreground"
        strokeWidth="1.5"
      />
      <line
        x1={barLeft}
        y1={dimY - 5}
        x2={barLeft}
        y2={dimY + 5}
        className="stroke-muted-foreground"
        strokeWidth="1.5"
      />
      <line
        x1={fulcrumX}
        y1={dimY - 5}
        x2={fulcrumX}
        y2={dimY + 5}
        className="stroke-muted-foreground"
        strokeWidth="1.5"
      />
      <text
        x={(barLeft + fulcrumX) / 2}
        y={dimY + 16}
        textAnchor="middle"
        fontSize="8.5"
        className="fill-muted-foreground"
      >
        {loadDistanceLabel}
      </text>

      {/* dimension line: fulcrum to effort */}
      <line
        x1={fulcrumX}
        y1={dimY}
        x2={barRight}
        y2={dimY}
        className="stroke-muted-foreground"
        strokeWidth="1.5"
      />
      <line
        x1={barRight}
        y1={dimY - 5}
        x2={barRight}
        y2={dimY + 5}
        className="stroke-muted-foreground"
        strokeWidth="1.5"
      />
      <text
        x={(fulcrumX + barRight) / 2}
        y={dimY + 16}
        textAnchor="middle"
        fontSize="8.5"
        className="fill-muted-foreground"
      >
        {effortDistanceLabel}
      </text>
    </svg>
  );
}
