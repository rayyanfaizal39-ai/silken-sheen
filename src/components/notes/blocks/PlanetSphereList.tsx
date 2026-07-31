import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { PlanetSphere } from "@/content/form2/science/interactive-types";

export function PlanetSphereList({ planets }: { planets: PlanetSphere[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="mt-3 flex flex-col gap-2.5">
      {planets.map((planet) => {
        const open = openId === planet.id;
        return (
          <div key={planet.id} className="rounded-2xl border border-border bg-card/55">
            <button
              type="button"
              onClick={() => setOpenId(open ? null : planet.id)}
              aria-expanded={open}
              className="flex w-full items-center gap-4 p-4 text-left"
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
