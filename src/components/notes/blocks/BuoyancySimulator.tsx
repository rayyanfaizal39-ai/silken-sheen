import { useState } from "react";
import type { BuoyancyMaterial } from "@/content/form2/science/interactive-types";

export function BuoyancySimulator({
  materials,
  lang,
}: {
  materials: BuoyancyMaterial[];
  lang: "en" | "bm";
}) {
  const [active, setActive] = useState<BuoyancyMaterial | null>(null);
  const floats = active ? active.density < 1.0 : null;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-5">
      <div className="relative h-36 w-36 shrink-0 overflow-hidden rounded-b-2xl border-2 border-accent/40 bg-gradient-to-b from-transparent from-30% to-accent/30">
        {active && (
          <div
            className="absolute left-1/2 h-9 w-9 -translate-x-1/2 rounded-lg bg-gradient-to-br from-primary to-accent transition-[top] duration-1000 ease-in-out"
            style={{ top: floats ? "8%" : "72%" }}
          />
        )}
      </div>
      <div className="min-w-[180px] flex-1 text-[13px] text-muted-foreground">
        {active ? (
          <>
            <b className="font-display block text-[15px] text-foreground">
              {active.label} — {lang === "bm" ? "ketumpatan" : "density"} {active.density} g/cm³
            </b>
            {floats
              ? lang === "bm"
                ? "Kurang tumpat daripada air (1.0 g/cm³), jadi ia terapung — daya keapungan sepadan dengan beratnya."
                : "Less dense than water (1.0 g/cm³), so it floats — buoyant force matches its weight."
              : lang === "bm"
                ? "Lebih tumpat daripada air (1.0 g/cm³), jadi ia tenggelam — daya keapungan tidak dapat menampung beratnya."
                : "More dense than water (1.0 g/cm³), so it sinks — buoyant force can't support its weight."}
          </>
        ) : (
          <>
            <b className="font-display block text-[15px] text-foreground">{lang === "bm" ? "Pilih bahan" : "Pick a material"}</b>
            {lang === "bm" ? "Lihat apa yang berlaku dalam air." : "See what happens in water."}
          </>
        )}
      </div>
      <div className="flex w-full flex-wrap gap-2">
        {materials.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setActive(m)}
            className={`min-h-11 rounded-full border px-3.5 py-2 text-[12.5px] font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              active?.id === m.id
                ? "border-primary bg-primary/20 text-foreground"
                : "border-border bg-secondary/40 text-muted-foreground hover:border-primary/50"
            }`}
          >
            {m.icon} {m.label} ({m.density} g/cm³)
          </button>
        ))}
      </div>
    </div>
  );
}
