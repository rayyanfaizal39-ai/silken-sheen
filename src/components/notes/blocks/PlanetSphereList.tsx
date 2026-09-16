import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { PlanetSphere } from "@/content/form2/science/interactive-types";

export function PlanetSphereList({
  planets,
  openId: controlledOpenId,
  onOpenChange,
  cardIdPrefix,
}: {
  planets: PlanetSphere[];
  /** Controlled open card. Pass with `onOpenChange` to let a parent open a profile. */
  openId?: string | null;
  onOpenChange?: (next: string | null) => void;
  /**
   * Gives each card's toggle the id `${cardIdPrefix}-${planet.id}`, so a parent
   * (the Chapter 12 planet sheet) can scroll to and focus the profile it opened.
   */
  cardIdPrefix?: string;
}) {
  const [uncontrolledOpenId, setUncontrolledOpenId] = useState<string | null>(null);
  const isControlled = controlledOpenId !== undefined;
  const openId = isControlled ? controlledOpenId : uncontrolledOpenId;
  const setOpenId = (next: string | null) => {
    if (!isControlled) setUncontrolledOpenId(next);
    onOpenChange?.(next);
  };

  return (
    <div className="mt-3 flex flex-col gap-2.5">
      {planets.map((planet) => {
        const open = openId === planet.id;
        return (
          <div key={planet.id} className="rounded-2xl border border-border bg-card/55">
            <button
              type="button"
              id={cardIdPrefix ? `${cardIdPrefix}-${planet.id}` : undefined}
              data-planet-card={planet.id}
              onClick={() => setOpenId(open ? null : planet.id)}
              aria-expanded={open}
              className="flex w-full scroll-mt-24 items-center gap-4 rounded-2xl p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <span
                className="relative shrink-0"
                style={
                  planet.rings
                    ? { width: planet.size * 1.9, height: planet.size * 1.9 }
                    : { width: planet.size, height: planet.size }
                }
              >
                <span
                  className="absolute inset-0 m-auto rounded-full"
                  style={{ width: planet.size, height: planet.size, background: planet.gradient }}
                />
                {planet.rings && (
                  <span
                    className="pointer-events-none absolute inset-0 m-auto rounded-full border-2 border-white/35"
                    style={{ width: planet.size * 1.8, height: planet.size * 0.34, transform: "rotate(-15deg)" }}
                  />
                )}
              </span>
              <span className="min-w-0 flex-1">
                <span className="font-display block text-sm font-bold text-foreground">{planet.name}</span>
                <span className="mt-0.5 block text-[12.5px] leading-relaxed text-muted-foreground">{planet.fact}</span>
              </span>
              <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && (
              <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-border px-4 py-3">
                {planet.facts.map((f) => (
                  <div key={f.label} className="text-[11.5px] text-muted-foreground">
                    {f.label}: <b className="text-foreground">{f.value}</b>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
