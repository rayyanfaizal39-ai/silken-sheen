import { useState } from "react";
import { figureCopy } from "./figure-copy";

/**
 * Converts a distance in kilometres into astronomical units and light years.
 *
 * Both constants are the textbook's own (printed p.252), and the arithmetic is
 * the textbook's own method (p.253): divide the distance in km by the km-value
 * of the unit. The conversion runs in both directions so the km <-> A.U. <-> ly
 * requirement in the DSKP Catatan is actually reachable, rather than km-only.
 *
 * Chrome copy comes from `figureCopy` so the BM stream is not left with English
 * labels, which is what it used to render.
 */

const KM_PER_AU = 1.5e8;
const KM_PER_LY = 9.5e12;

type Unit = "km" | "au" | "ly";

const TO_KM: Record<Unit, number> = { km: 1, au: KM_PER_AU, ly: KM_PER_LY };

export function auLightYearFrom(value: number, unit: Unit) {
  const km = value * TO_KM[unit];
  return { km, au: km / KM_PER_AU, ly: km / KM_PER_LY };
}

export function AuLightYearCalculator({ defaultKm, lang }: { defaultKm?: number; lang?: string }) {
  const copy = figureCopy(lang);
  const [raw, setRaw] = useState(defaultKm !== undefined ? String(defaultKm) : "");
  const [unit, setUnit] = useState<Unit>("km");

  const entered = parseFloat(raw);
  const valid = !isNaN(entered) && entered > 0;
  const result = valid ? auLightYearFrom(entered, unit) : null;

  const unitLabels: Record<Unit, string> = { km: "km", au: "A.U.", ly: "ly" };

  return (
    <div className="mt-3 flex flex-col gap-3">
      <div className="flex flex-wrap items-end gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="ch12-au-ly-input" className="text-[11px] uppercase tracking-wide text-muted-foreground">
            {unit === "km" ? copy.distanceKm : `${copy.distanceKm.replace(/\(.*\)/, "").trim()} (${unitLabels[unit]})`}
          </label>
          <input
            id="ch12-au-ly-input"
            type="number"
            inputMode="decimal"
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            placeholder={copy.distanceExample}
            aria-label={copy.distanceKm}
            className="min-h-11 w-40 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <div
          className="min-h-11 rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground"
          aria-live="polite"
        >
          {result ? (
            <>
              {result.au.toExponential(2)} A.U. · {result.ly.toExponential(2)} ly
              {unit !== "km" && <> · {result.km.toExponential(2)} km</>}
            </>
          ) : (
            copy.enterDistance
          )}
        </div>
      </div>
      {/* The unit the entered number is in, so the conversion works both ways. */}
      <div className="flex flex-wrap gap-1.5" role="group" aria-label={copy.controlsLabel}>
        {(["km", "au", "ly"] as Unit[]).map((u) => (
          <button
            key={u}
            type="button"
            aria-pressed={unit === u}
            onClick={() => setUnit(u)}
            className={`min-h-11 rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              unit === u
                ? "border-primary bg-primary/20 text-foreground"
                : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/50"
            }`}
          >
            {unitLabels[u]}
          </button>
        ))}
      </div>
    </div>
  );
}
