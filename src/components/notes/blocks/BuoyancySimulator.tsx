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
      {/* A tank of water, so where the material ends up is the answer being shown:
          floating sits astride the surface, sinking rests on the bottom. */}
      <svg
        viewBox="0 0 120 140"
        className="h-36 w-36 shrink-0"
        role="img"
        aria-label={
          active
            ? `${active.label} — ${floats ? (lang === "bm" ? "terapung" : "floats") : lang === "bm" ? "tenggelam" : "sinks"}`
            : lang === "bm"
              ? "Tangki air"
              : "Water tank"
        }
        data-state={active ? (floats ? "floats" : "sinks") : "empty"}
      >
        <rect x={9} y={46} width={102} height={83} className="fill-sky-400/25" />
        <line x1={9} y1={46} x2={111} y2={46} className="stroke-sky-300/80" strokeWidth="2" />
        <path d="M8,10 L8,130 L112,130 L112,10" fill="none" className="stroke-accent/60" strokeWidth="2.5" />
        {active && (
          <g
            className="transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateY(${floats ? 0 : 68}px)` }}
          >
            <rect x={43} y={33} width={34} height={26} rx="3" className="fill-primary stroke-accent" strokeWidth="2" />
          </g>
        )}
      </svg>
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
