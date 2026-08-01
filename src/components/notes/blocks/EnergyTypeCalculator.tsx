import { useState } from "react";

type Mode = "gpe" | "epe" | "ke";

export function EnergyTypeCalculator({
  lang,
  defaultGpeMass = 1500,
  defaultGpeHeight = 30,
  defaultEpeForce = 20,
  defaultEpeExtension = 0.08,
  defaultKeMass = 500000,
  defaultKeVelocity = 100,
}: {
  lang: "en" | "bm";
  defaultGpeMass?: number;
  defaultGpeHeight?: number;
  defaultEpeForce?: number;
  defaultEpeExtension?: number;
  defaultKeMass?: number;
  defaultKeVelocity?: number;
}) {
  const bm = lang === "bm";
  const [mode, setMode] = useState<Mode>("gpe");

  const [gpeMassRaw, setGpeMassRaw] = useState(String(defaultGpeMass));
  const [gpeHeightRaw, setGpeHeightRaw] = useState(String(defaultGpeHeight));
  const [epeForceRaw, setEpeForceRaw] = useState(String(defaultEpeForce));
  const [epeExtRaw, setEpeExtRaw] = useState(String(defaultEpeExtension));
  const [keMassRaw, setKeMassRaw] = useState(String(defaultKeMass));
  const [keVelRaw, setKeVelRaw] = useState(String(defaultKeVelocity));

  const gpeMass = parseFloat(gpeMassRaw);
  const gpeHeight = parseFloat(gpeHeightRaw);
  const gpeResult = !isNaN(gpeMass) && !isNaN(gpeHeight) ? `${(gpeMass * 10 * gpeHeight).toFixed(0)} J` : "—";

  const epeForce = parseFloat(epeForceRaw);
  const epeExt = parseFloat(epeExtRaw);
  const epeResult = !isNaN(epeForce) && !isNaN(epeExt) ? `${(0.5 * epeForce * epeExt).toFixed(3)} J` : "—";

  const keMass = parseFloat(keMassRaw);
  const keVel = parseFloat(keVelRaw);
  const keResult = !isNaN(keMass) && !isNaN(keVel) ? `${(0.5 * keMass * keVel * keVel).toExponential(3)} J` : "—";

  const modes: { id: Mode; label: string }[] = [
    { id: "gpe", label: bm ? "T.K. Graviti" : "Gravitational P.E." },
    { id: "epe", label: bm ? "T.K. Kenyal" : "Elastic P.E." },
    { id: "ke", label: bm ? "Tenaga Kinetik" : "Kinetic Energy" },
  ];

  return (
    <div className="mt-3">
      <div className="inline-flex flex-wrap gap-1 rounded-full border border-border bg-secondary/30 p-1">
        {modes.map((m) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setMode(m.id)}
            className={`min-h-9 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              m.id === mode ? "bg-gradient-to-r from-primary to-accent text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {mode === "gpe" && (
        <div className="mt-3">
          <p className="mb-2 text-[13px] text-muted-foreground">{bm ? "Tenaga keupayaan graviti = mgh (g = 10 m s⁻²)" : "Gravitational potential energy = mgh (g = 10 m s⁻²)"}</p>
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{bm ? "Jisim, m (kg)" : "Mass, m (kg)"}</label>
              <input type="number" inputMode="decimal" value={gpeMassRaw} onChange={(e) => setGpeMassRaw(e.target.value)} className="w-28 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{bm ? "Ketinggian, h (m)" : "Height, h (m)"}</label>
              <input type="number" inputMode="decimal" value={gpeHeightRaw} onChange={(e) => setGpeHeightRaw(e.target.value)} className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            </div>
            <div className="rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground" aria-live="polite">{gpeResult}</div>
          </div>
        </div>
      )}

      {mode === "epe" && (
        <div className="mt-3">
          <p className="mb-2 text-[13px] text-muted-foreground">{bm ? "Tenaga keupayaan kenyal = ½Fx" : "Elastic potential energy = ½Fx"}</p>
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{bm ? "Daya, F (N)" : "Force, F (N)"}</label>
              <input type="number" inputMode="decimal" value={epeForceRaw} onChange={(e) => setEpeForceRaw(e.target.value)} className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{bm ? "Pemanjangan, x (m)" : "Extension, x (m)"}</label>
              <input type="number" inputMode="decimal" value={epeExtRaw} onChange={(e) => setEpeExtRaw(e.target.value)} className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            </div>
            <div className="rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground" aria-live="polite">{epeResult}</div>
          </div>
        </div>
      )}

      {mode === "ke" && (
        <div className="mt-3">
          <p className="mb-2 text-[13px] text-muted-foreground">{bm ? "Tenaga kinetik = ½mv²" : "Kinetic energy = ½mv²"}</p>
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{bm ? "Jisim, m (kg)" : "Mass, m (kg)"}</label>
              <input type="number" inputMode="decimal" value={keMassRaw} onChange={(e) => setKeMassRaw(e.target.value)} className="w-32 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[11px] uppercase tracking-wide text-muted-foreground">{bm ? "Halaju, v (m/s)" : "Velocity, v (m/s)"}</label>
              <input type="number" inputMode="decimal" value={keVelRaw} onChange={(e) => setKeVelRaw(e.target.value)} className="w-24 rounded-lg border border-border bg-secondary/40 px-3 py-2 font-display text-sm text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary" />
            </div>
            <div className="rounded-xl border border-primary/35 bg-primary/15 px-4 py-2.5 font-display text-sm font-bold text-foreground" aria-live="polite">{keResult}</div>
          </div>
        </div>
      )}
    </div>
  );
}
