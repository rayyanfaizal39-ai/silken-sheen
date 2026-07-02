import { useEffect, useState } from "react";

/**
 * Live HUD widgets — signal bars, orbital ticks, telemetry readouts.
 * All values update in real time. Purely decorative, pointer-events none,
 * respects reduced motion.
 */
export function HudWidgets() {
  const reduced = usePrefersReducedMotion();
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => setTick((t) => (t + 1) % 1_000_000), 1000);
    return () => clearInterval(id);
  }, [reduced]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{ fontFamily: "'Orbitron', 'Space Grotesk', system-ui, sans-serif" }}
    >
      <SignalPanel tick={tick} />
      <OrbitalTicker tick={tick} />
      <TelemetryReadout tick={tick} />
    </div>
  );
}

/* ---------- Signal bars (top-left) ---------- */
function SignalPanel({ tick }: { tick: number }) {
  // 12 bars, values oscillate with sinusoids offset per bar for organic feel.
  const bars = Array.from({ length: 12 }, (_, i) => {
    const v = 0.5 + 0.5 * Math.sin((tick + i * 0.9) * 0.6 + i);
    return Math.max(0.08, v);
  });
  const rssi = -40 - Math.round(30 * (0.5 + 0.5 * Math.sin(tick * 0.4)));

  return (
    <div className="absolute left-4 top-20 w-[210px] rounded-lg border border-cyan-400/20 bg-slate-950/55 p-3 backdrop-blur-md shadow-[0_0_30px_rgba(34,211,238,0.08)]">
      <div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-[0.28em] text-cyan-300/90">
        <span className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)] animate-pulse" />
          Signal
        </span>
        <span className="text-slate-400/80 tabular-nums">{rssi} dBm</span>
      </div>
      <div className="flex h-10 items-end gap-[3px]">
        {bars.map((v, i) => (
          <div
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-cyan-500/80 to-emerald-300/90 transition-[height] duration-700 ease-out"
            style={{
              height: `${v * 100}%`,
              boxShadow: "0 0 6px rgba(34,211,238,0.5)",
            }}
          />
        ))}
      </div>
      <div className="mt-2 flex justify-between text-[9px] uppercase tracking-[0.2em] text-slate-400/70">
        <span>Ch 07</span>
        <span className="text-emerald-300/90">Lock</span>
      </div>
    </div>
  );
}

/* ---------- Orbital ticker (top-right) ---------- */
function OrbitalTicker({ tick }: { tick: number }) {
  const angle = (tick * 6) % 360; // 6°/s → full orbit / minute
  const alt = 412 + Math.round(8 * Math.sin(tick * 0.3));
  const vel = (7.66 + 0.02 * Math.sin(tick * 0.5)).toFixed(2);
  return (
    <div className="absolute right-4 top-20 w-[220px] rounded-lg border border-fuchsia-400/20 bg-slate-950/55 p-3 backdrop-blur-md shadow-[0_0_30px_rgba(232,121,249,0.08)]">
      <div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-[0.28em] text-fuchsia-300/90">
        <span>Orbit · LEO</span>
        <span className="tabular-nums text-slate-300/80">{angle.toString().padStart(3, "0")}°</span>
      </div>
      <div className="relative mx-auto h-[92px] w-[92px]">
        <div className="absolute inset-0 rounded-full border border-fuchsia-400/25" />
        <div className="absolute inset-3 rounded-full border border-cyan-400/20" />
        <div className="absolute inset-6 rounded-full border border-emerald-400/20" />
        {/* rotating sweep */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(from ${angle}deg, rgba(232,121,249,0.35), transparent 35%)`,
            transition: "background 900ms linear",
          }}
        />
        {/* orbiter dot */}
        <div
          className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-300 shadow-[0_0_10px_rgba(232,121,249,0.9)]"
          style={{
            transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-42px)`,
            transition: "transform 900ms linear",
          }}
        />
        <div className="absolute left-1/2 top-1/2 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/80" />
      </div>
      <div className="mt-2 grid grid-cols-2 gap-x-2 text-[9px] uppercase tracking-[0.2em] text-slate-400/75 tabular-nums">
        <span>ALT</span>
        <span className="text-right text-cyan-200">{alt} km</span>
        <span>VEL</span>
        <span className="text-right text-emerald-200">{vel} km/s</span>
      </div>
    </div>
  );
}

/* ---------- Telemetry readout (bottom-left, above status bar) ---------- */
function TelemetryReadout({ tick }: { tick: number }) {
  const cpu = 32 + Math.round(18 * (0.5 + 0.5 * Math.sin(tick * 0.7)));
  const mem = 58 + Math.round(10 * (0.5 + 0.5 * Math.sin(tick * 0.35 + 1)));
  const net = 120 + Math.round(80 * (0.5 + 0.5 * Math.sin(tick * 0.9 + 2)));
  const rows = [
    { k: "CPU", v: `${cpu}%`, pct: cpu, tint: "from-cyan-400 to-emerald-300" },
    { k: "MEM", v: `${mem}%`, pct: mem, tint: "from-fuchsia-400 to-cyan-300" },
    { k: "NET", v: `${net} kb/s`, pct: Math.min(100, net / 3), tint: "from-amber-300 to-fuchsia-400" },
  ];
  return (
    <div className="absolute bottom-16 left-4 w-[230px] rounded-lg border border-emerald-400/20 bg-slate-950/55 p-3 backdrop-blur-md shadow-[0_0_30px_rgba(52,211,153,0.08)]">
      <div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-[0.28em] text-emerald-300/90">
        <span>Telemetry</span>
        <span className="text-slate-400/80">Live</span>
      </div>
      <div className="space-y-1.5">
        {rows.map((r) => (
          <div key={r.k} className="space-y-0.5">
            <div className="flex justify-between text-[9px] uppercase tracking-[0.22em] text-slate-300/80 tabular-nums">
              <span>{r.k}</span>
              <span>{r.v}</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-slate-800/70">
              <div
                className={`h-full rounded-full bg-gradient-to-r ${r.tint} transition-[width] duration-700 ease-out`}
                style={{ width: `${r.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- reduced motion hook ---------- */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(m.matches);
    const on = () => setReduced(m.matches);
    m.addEventListener?.("change", on);
    return () => m.removeEventListener?.("change", on);
  }, []);
  return reduced;
}
