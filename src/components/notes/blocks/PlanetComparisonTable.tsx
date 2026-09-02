import { useState } from "react";
import type { PlanetComparisonBlock } from "@/content/form2/science/interactive-types";
import { conceptButtonClass, InteractiveBadge } from "./InteractiveFigureCard";
import { figureCopy } from "./figure-copy";

/**
 * The planet comparison table, one characteristic at a time.
 *
 * The source table (Jadual 12.2) is ten rows by eight planets. Reproduced whole
 * it is unreadable on a phone and needs horizontal scrolling on a laptop, so the
 * learner picks a characteristic and compares all eight planets on it. Earth is
 * always marked, because the standard asks for a comparison *with Earth* rather
 * than a bare table dump.
 *
 * Values are positional and come straight from the textbook; nothing is computed
 * or rounded here.
 */
export function PlanetComparisonTable({ block, lang }: { block: PlanetComparisonBlock; lang?: string }) {
  const [activeId, setActiveId] = useState(block.characteristics[0]?.id ?? "");
  const copy = figureCopy(lang);

  const active = block.characteristics.find((c) => c.id === activeId) ?? block.characteristics[0];
  const earthIndex = block.planets.indexOf(block.earth);
  const earthValue = active ? active.values[earthIndex] : undefined;

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      <InteractiveBadge lang={lang} instruction={block.instruction} className="mb-2.5" />

      <div className="mb-3 flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {block.characteristics.map((c) => (
          <button
            key={c.id}
            type="button"
            aria-pressed={c.id === active?.id}
            onClick={() => setActiveId(c.id)}
            className={conceptButtonClass(c.id === active?.id)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {active && (
        <>
          <table className="w-full border-collapse text-[12.5px]" data-characteristic={active.id}>
            <caption className="sr-only">
              {active.label}
              {active.unit ? ` (${active.unit})` : ""}
            </caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className="py-1.5 pr-2 text-left font-semibold text-muted-foreground">
                  {copy.planetColumn}
                </th>
                <th scope="col" className="py-1.5 text-right font-semibold text-muted-foreground">
                  {active.label}
                  {active.unit ? ` (${active.unit})` : ""}
                </th>
              </tr>
            </thead>
            <tbody>
              {block.planets.map((planet, i) => {
                const isEarth = planet === block.earth;
                return (
                  <tr
                    key={planet}
                    data-planet={planet}
                    data-earth={isEarth || undefined}
                    className={`border-b border-border/60 ${isEarth ? "bg-primary/12" : ""}`}
                  >
                    <th
                      scope="row"
                      className={`py-1.5 pr-2 text-left font-medium ${isEarth ? "text-primary" : "text-foreground"}`}
                    >
                      {planet}
                    </th>
                    <td className={`py-1.5 text-right tabular-nums ${isEarth ? "font-bold text-primary" : "text-muted-foreground"}`}>
                      {active.values[i]}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <p aria-live="polite" className="mt-2 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12px] leading-relaxed text-foreground">
            {active.note}
            {earthValue !== undefined && (
              <>
                {" "}
                <b className="text-primary">
                  {block.earth}: {earthValue}
                  {active.unit ? ` ${active.unit}` : ""}
                </b>
              </>
            )}
          </p>
        </>
      )}
    </div>
  );
}
