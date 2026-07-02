import { useEffect, useState } from "react";

/**
 * Slim bottom HUD status bar — cinematic "life-support / network" chrome that
 * makes the whole home feel alive. Purely decorative; safe-area padded.
 */
export function HudStatusBar() {
  const [time, setTime] = useState<string>(() => formatTime(new Date()));

  useEffect(() => {
    const id = setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      aria-hidden
      className="hud-status-bar pointer-events-none fixed inset-x-0 bottom-0 z-40 hidden md:flex items-center justify-between px-6 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-slate-400/80"
      style={{
        fontFamily: "'Orbitron', 'Space Grotesk', system-ui, sans-serif",
        paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom, 0px))",
        background:
          "linear-gradient(to top, rgba(2,6,23,0.85), rgba(2,6,23,0.35) 65%, transparent)",
        borderTop: "1px solid rgba(148,163,184,0.08)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="flex gap-6">
        <span className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
          System · Nominal
        </span>
        <span className="hidden lg:inline">Oksigen · 98%</span>
      </div>
      <div className="flex gap-6 items-center">
        <span className="text-cyan-300/90 animate-pulse-slow hidden lg:inline">
          AcadeMY Network · Connected
        </span>
        <span>UTC {time}</span>
      </div>
    </div>
  );
}

function formatTime(d: Date) {
  return d.toISOString().slice(11, 19);
}
