import type { CSSProperties, ReactElement } from "react";

/**
 * Shared per-subject illustrations — the actual visual identity of each
 * world (shape, not emoji). Originally built only for SubjectWorldPage's
 * hero; reused everywhere a subject needs to be instantly recognisable.
 * Each art piece is authored at a fixed design size and scaled via CSS
 * transform so the hand-tuned absolute-pixel layouts never need rewriting.
 */

const DESIGN_W = 208; // w-52
const DESIGN_H = 144; // h-36

// ─── Mathematics (coordinate plane + formulas) ─────────────────────────────────

function MathWorldArtBase({ color }: { color: string }) {
  const dim = "rgba(251,191,36,";
  return (
    <div
      className="relative h-36 w-52 shrink-0 overflow-hidden rounded-2xl"
      style={{ border: `1px solid ${color}28`, background: "rgba(0,0,0,0.3)" }}
    >
      <div className="absolute top-0 bottom-0" style={{ left: "50%", width: 1, background: `${dim}0.35)` }} />
      <div className="absolute left-0 right-0" style={{ top: "55%", height: 1, background: `${dim}0.35)` }} />
      {[22, 36, 64, 78].map((p) => (
        <div key={`v${p}`} className="absolute top-0 bottom-0" style={{ left: `${p}%`, width: 1, background: `${dim}0.10)` }} />
      ))}
      {[20, 38, 72, 88].map((p) => (
        <div key={`h${p}`} className="absolute left-0 right-0" style={{ top: `${p}%`, height: 1, background: `${dim}0.10)` }} />
      ))}
      <div
        className="absolute"
        style={{
          bottom: "22%", left: "18%", right: "18%", height: 36,
          border: `1.5px solid ${color}55`, borderBottom: "none", borderRadius: "50% 50% 0 0",
        }}
      />
      <div className="absolute" style={{ left: "50%", top: 4, transform: "translateX(-50%)", width: 0, height: 0, borderLeft: "4px solid transparent", borderRight: "4px solid transparent", borderBottom: `7px solid ${color}55` }} />
      <div className="absolute" style={{ right: 4, top: "55%", transform: "translateY(-50%)", width: 0, height: 0, borderTop: "4px solid transparent", borderBottom: "4px solid transparent", borderLeft: `7px solid ${color}55` }} />
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-black leading-none" style={{ fontSize: "2.4rem", color, opacity: 0.82 }}>π</span>
        <span className="mt-1 font-black tracking-[0.25em]" style={{ fontSize: "0.6rem", color, opacity: 0.45 }}>∑ · ∞ · ∫ · √</span>
      </div>
    </div>
  );
}

// ─── Science (atom orbital) ─────────────────────────────────────────────────────

function ScienceWorldArtBase({ color }: { color: string }) {
  return (
    <div className="relative flex h-36 w-52 shrink-0 items-center justify-center">
      <div className="absolute rounded-[50%]" style={{ width: 160, height: 56, border: `1.5px solid ${color}45`, transform: "rotate(-30deg)", animation: "orbit-spin-cw 6s linear infinite" }} />
      <div className="absolute rounded-[50%]" style={{ width: 130, height: 48, border: `1.5px solid ${color}35`, transform: "rotate(30deg)", animation: "orbit-spin-ccw 9s linear infinite" }} />
      <div className="absolute rounded-[50%]" style={{ width: 100, height: 36, border: `1px dashed ${color}28`, transform: "rotate(80deg)", animation: "orbit-spin-cw 12s linear infinite" }} />
      <div
        className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full"
        style={{ background: `radial-gradient(circle, ${color}55, ${color}22)`, boxShadow: `0 0 22px ${color}70` }}
      >
        <span style={{ fontSize: "0.65rem", fontWeight: 900, color, letterSpacing: "0.05em" }}>⚛</span>
      </div>
      {["H₂O", "O₂", "CO₂"].map((label, i) => (
        <div
          key={label}
          className="absolute flex items-center justify-center rounded-full text-center"
          style={{ width: 28, height: 28, background: `${color}18`, border: `1px solid ${color}35`, top: `${[12, 64, 38][i]}%`, left: `${[8, 18, 72][i]}%` }}
        >
          <span style={{ fontSize: "0.45rem", color, fontWeight: 700, opacity: 0.8 }}>{label}</span>
        </div>
      ))}
    </div>
  );
}

// ─── English (open book + quotes) ──────────────────────────────────────────────

function EnglishWorldArtBase({ color }: { color: string }) {
  return (
    <div className="relative flex h-36 w-52 shrink-0 items-center justify-center">
      <div className="absolute rounded-l-xl rounded-r-none" style={{ left: "8%", top: "10%", width: "40%", height: "80%", background: `${color}10`, border: `1px solid ${color}30`, borderRight: "none" }}>
        {[20, 35, 50, 65, 80].map((p) => (
          <div key={p} className="absolute left-3 right-3" style={{ top: `${p}%`, height: 1, background: `${color}28` }} />
        ))}
      </div>
      <div className="absolute rounded-r-xl rounded-l-none" style={{ right: "8%", top: "10%", width: "40%", height: "80%", background: `${color}10`, border: `1px solid ${color}30`, borderLeft: "none" }}>
        {[20, 35, 50, 65, 80].map((p) => (
          <div key={p} className="absolute left-3 right-3" style={{ top: `${p}%`, height: 1, background: `${color}28` }} />
        ))}
      </div>
      <div className="absolute" style={{ left: "48%", top: "10%", width: 4, height: "80%", background: `${color}40` }} />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span style={{ fontSize: "3rem", color, opacity: 0.55, fontFamily: "Georgia, serif", lineHeight: 1 }}>❝</span>
      </div>
    </div>
  );
}

// ─── Geography (topographic + compass) ──────────────────────────────────────────

function GeoWorldArtBase({ color }: { color: string }) {
  return (
    <div className="relative flex h-36 w-52 shrink-0 items-center justify-center">
      {[44, 60, 76, 92, 108, 124].map((size, i) => (
        <div
          key={size}
          className="absolute rounded-[50%]"
          style={{ width: size, height: size * 0.65, border: `1px solid ${color}${["55", "44", "38", "2e", "22", "18"][i]}`, bottom: `${5 + i * 3}%`, left: "50%", transform: "translateX(-50%)" }}
        />
      ))}
      <div className="absolute top-4 right-6 flex h-14 w-14 items-center justify-center">
        <div className="absolute inset-0 rounded-full" style={{ border: `1px solid ${color}35` }} />
        {[
          { label: "N", top: "2px", left: "50%", transform: "translateX(-50%)" },
          { label: "S", bottom: "2px", left: "50%", transform: "translateX(-50%)" },
          { label: "E", right: "4px", top: "50%", transform: "translateY(-50%)" },
          { label: "W", left: "4px", top: "50%", transform: "translateY(-50%)" },
        ].map(({ label, ...pos }) => (
          <span key={label} className="absolute font-black" style={{ fontSize: "0.55rem", color, opacity: label === "N" ? 0.95 : 0.55, ...pos }}>
            {label}
          </span>
        ))}
        <div className="absolute" style={{ top: "50%", left: "10%", right: "10%", height: 1, background: `${color}40` }} />
        <div className="absolute" style={{ left: "50%", top: "10%", bottom: "10%", width: 1, background: `${color}40` }} />
        <div className="absolute h-1 w-1 rounded-full" style={{ background: color, top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      </div>
    </div>
  );
}

// ─── Sejarah (timeline) ──────────────────────────────────────────────────────────

function SejarahWorldArtBase({ color }: { color: string }) {
  const eras = [
    { label: "BCE", year: "5000" },
    { label: "Prasejarah", year: "500" },
    { label: "Tamadun", year: "1400" },
    { label: "Islam", year: "1957" },
  ];
  return (
    <div className="relative flex h-36 w-52 shrink-0 items-center justify-center">
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2" style={{ width: 80, height: 52, border: `1.5px solid ${color}40`, borderBottom: "none", borderRadius: "40px 40px 0 0" }} />
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2" style={{ width: 52, height: 36, border: `1px solid ${color}28`, borderBottom: "none", borderRadius: "26px 26px 0 0" }} />
      <div className="absolute" style={{ top: "28%", left: "6%", right: "6%", height: 2, background: `linear-gradient(90deg, ${color}18, ${color}70, ${color}18)` }}>
        {eras.map((era, i) => (
          <div key={era.label} className="absolute top-1/2 flex -translate-y-1/2 flex-col items-center" style={{ left: `${(i / (eras.length - 1)) * 100}%`, transform: "translate(-50%, -50%)" }}>
            <div className="h-2 w-2 rounded-full" style={{ background: color, boxShadow: `0 0 6px ${color}` }} />
            <span className="absolute whitespace-nowrap font-bold" style={{ fontSize: "0.42rem", color, opacity: 0.7, top: 10 }}>{era.year}</span>
            <span className="absolute whitespace-nowrap font-semibold" style={{ fontSize: "0.4rem", color: "rgba(255,255,255,0.35)", bottom: 10 }}>{era.label}</span>
          </div>
        ))}
      </div>
      <div className="absolute top-2 right-3 text-right">
        <span className="font-display font-black" style={{ fontSize: "1.6rem", color, opacity: 0.65 }}>1957</span>
        <span className="block font-bold tracking-widest" style={{ fontSize: "0.45rem", color, opacity: 0.4 }}>MERDEKA</span>
      </div>
    </div>
  );
}

// ─── Bahasa Melayu (songket pattern) ─────────────────────────────────────────────

function BMWorldArtBase({ color }: { color: string }) {
  return (
    <div className="relative h-36 w-52 shrink-0 overflow-hidden rounded-2xl" style={{ border: `1px solid ${color}28`, background: "rgba(0,0,0,0.25)" }}>
      {Array.from({ length: 10 }, (_, i) => (
        <div key={`d1-${i}`} className="absolute" style={{ top: 0, bottom: 0, left: `${i * 24 - 40}px`, width: 1, background: `${color}25`, transform: "rotate(45deg) scaleY(3)", transformOrigin: "top center" }} />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <div key={`d2-${i}`} className="absolute" style={{ top: 0, bottom: 0, left: `${i * 24 - 40}px`, width: 1, background: `${color}18`, transform: "rotate(-45deg) scaleY(3)", transformOrigin: "top center" }} />
      ))}
      <div className="absolute inset-x-0 top-2 flex justify-around">
        {["◆", "◆", "◆", "◆", "◆"].map((d, i) => (
          <span key={i} style={{ fontSize: "0.55rem", color, opacity: 0.35 }}>{d}</span>
        ))}
      </div>
      <div className="absolute inset-x-0 bottom-2 flex justify-around">
        {["◆", "◆", "◆", "◆", "◆"].map((d, i) => (
          <span key={i} style={{ fontSize: "0.55rem", color, opacity: 0.35 }}>{d}</span>
        ))}
      </div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display font-black leading-none" style={{ fontSize: "2rem", color, opacity: 0.75 }}>بـم</span>
        <span className="mt-1 font-black tracking-[0.3em]" style={{ fontSize: "0.5rem", color, opacity: 0.45 }}>BAHASA · SASTERA · BUDAYA</span>
      </div>
    </div>
  );
}

// ─── Bahasa Melayu subject card (modern language + literature) ─────────────────

function BMCardArtBase({ color }: { color: string }) {
  const pageSurface = `linear-gradient(145deg, rgba(255,255,255,0.18), ${color}18)`;
  return (
    <div
      data-subject-art="bm-language-literature"
      className="relative h-36 w-52 shrink-0 overflow-hidden rounded-2xl"
      style={{
        border: `1px solid ${color}28`,
        background: `radial-gradient(circle at 70% 18%, ${color}24, transparent 42%), rgba(0,0,0,0.2)`,
      }}
    >
      {/* Low-contrast alphabet and layered paper accents. */}
      <span className="absolute left-4 top-3 font-display text-xl font-black" style={{ color, opacity: 0.12 }}>
        A
      </span>
      <span className="absolute right-5 bottom-3 font-display text-lg font-black" style={{ color, opacity: 0.1 }}>
        C
      </span>
      <div
        className="absolute left-9 top-5 h-20 w-28 -rotate-3 rounded-xl"
        style={{ border: `1px solid ${color}18`, background: `${color}08` }}
      />
      <div
        className="absolute left-12 top-4 h-20 w-28 rotate-2 rounded-xl"
        style={{ border: `1px solid ${color}20`, background: `${color}0b` }}
      />

      {/* Speech bubble with a compact quotation mark. */}
      <div
        className="absolute right-4 top-3 flex h-9 w-11 items-center justify-center rounded-2xl rounded-br-md"
        style={{
          border: `1px solid ${color}35`,
          background: `${color}14`,
          boxShadow: `0 0 16px ${color}18`,
        }}
      >
        <span className="font-serif text-xl font-black leading-none" style={{ color, opacity: 0.7 }}>
          “
        </span>
      </div>

      {/* Open notebook: two layered pages, writing lines, and a central fold. */}
      <div
        className="absolute bottom-6 left-[18px] h-[76px] w-[86px] origin-bottom-right -rotate-3 rounded-l-xl rounded-br-md"
        style={{
          background: pageSurface,
          border: `1px solid ${color}42`,
          boxShadow: `0 10px 24px rgba(0,0,0,0.25), inset 0 1px rgba(255,255,255,0.12)`,
        }}
      >
        {[26, 40, 54, 68].map((top, index) => (
          <div
            key={top}
            className="absolute left-4 h-px rounded-full"
            style={{
              top: `${top}%`,
              width: `${index === 3 ? 42 : 58}px`,
              background: `${color}${index === 0 ? "48" : "30"}`,
            }}
          />
        ))}
      </div>
      <div
        className="absolute bottom-6 right-[18px] h-[76px] w-[86px] origin-bottom-left rotate-3 rounded-r-xl rounded-bl-md"
        style={{
          background: pageSurface,
          border: `1px solid ${color}42`,
          boxShadow: `0 10px 24px rgba(0,0,0,0.25), inset 0 1px rgba(255,255,255,0.12)`,
        }}
      >
        {[26, 40, 54, 68].map((top, index) => (
          <div
            key={top}
            className="absolute right-4 h-px rounded-full"
            style={{
              top: `${top}%`,
              width: `${index === 3 ? 38 : 56}px`,
              background: `${color}${index === 0 ? "48" : "30"}`,
            }}
          />
        ))}
      </div>
      <div
        className="absolute bottom-[25px] left-1/2 h-[72px] w-px -translate-x-1/2"
        style={{ background: `linear-gradient(180deg, transparent, ${color}70, transparent)` }}
      />

      {/* Pencil crossing the page to make writing the primary action. */}
      <div
        className="absolute bottom-[25px] left-[58px] z-10 h-[7px] w-[104px] -rotate-[18deg] rounded-full"
        style={{
          background: `linear-gradient(90deg, #FDE68A 0 72%, ${color} 72% 90%, #F9A8D4 90%)`,
          boxShadow: "0 4px 10px rgba(0,0,0,0.28)",
        }}
      >
        <div
          className="absolute -left-2 top-0 h-0 w-0"
          style={{
            borderBottom: "3.5px solid transparent",
            borderRight: "9px solid #F4D7B2",
            borderTop: "3.5px solid transparent",
          }}
        />
      </div>
    </div>
  );
}

const ART_BY_SUBJECT: Record<string, (props: { color: string }) => ReactElement> = {
  math: MathWorldArtBase,
  science: ScienceWorldArtBase,
  english: EnglishWorldArtBase,
  geography: GeoWorldArtBase,
  sejarah: SejarahWorldArtBase,
  bm: BMWorldArtBase,
};

/**
 * Renders a subject's world illustration scaled to fit any target box.
 * The art is authored at a fixed design size (208×144) and uniformly
 * scaled via CSS transform, so internals never need rewriting per size.
 */
export function SubjectWorldArt({
  subjectId,
  color,
  width = DESIGN_W,
  height = DESIGN_H,
  className = "",
  variant = "default",
}: {
  subjectId: string;
  color: string;
  width?: number;
  height?: number;
  className?: string;
  variant?: "default" | "card";
}) {
  const ArtBase =
    subjectId === "bm" && variant === "card"
      ? BMCardArtBase
      : (ART_BY_SUBJECT[subjectId] ?? MathWorldArtBase);
  const scale = Math.min(width / DESIGN_W, height / DESIGN_H);
  return (
    <div className={`pointer-events-none relative overflow-hidden ${className}`} style={{ width, height }} aria-hidden>
      <div
        style={
          {
            position: "absolute",
            top: "50%",
            left: "50%",
            width: DESIGN_W,
            height: DESIGN_H,
            transform: `translate(-50%, -50%) scale(${scale})`,
          } as CSSProperties
        }
      >
        <ArtBase color={color} />
      </div>
    </div>
  );
}
