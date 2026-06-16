import { useEffect, useMemo, useState, type CSSProperties } from "react";
import { Sparkles, X, ArrowDown } from "lucide-react";
import { Confetti } from "@/components/Confetti";
import { sfx } from "@/lib/sounds";

export type RarityKey = "common" | "rare" | "epic" | "legendary";

export interface UnlockReward {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  glow: string;
  rarityLabel?: string;
  /** Optional rarity key used to remap to the cinematic palette
   * (common = blue, rare = cyan, epic = purple, legendary = gold). */
  rarityKey?: RarityKey;
  /** Optional previous item name, shown as "from → to" evolution reveal. */
  from?: string;
}

// Cinematic rarity palette (overrides any incoming tones for premium feel)
const RARITY_PALETTE: Record<RarityKey, { color: string; glow: string; soft: string }> = {
  common:    { color: "#3B82F6", glow: "rgba(59,130,246,0.65)",  soft: "rgba(59,130,246,0.25)" },
  rare:      { color: "#22D3EE", glow: "rgba(34,211,238,0.7)",   soft: "rgba(34,211,238,0.25)" },
  epic:      { color: "#A855F7", glow: "rgba(168,85,247,0.7)",   soft: "rgba(168,85,247,0.28)" },
  legendary: { color: "#FBBF24", glow: "rgba(251,191,36,0.75)",  soft: "rgba(251,191,36,0.3)"  },
};

type Phase = "gather" | "flash" | "reveal";

/**
 * Full-viewport cinematic evolution reveal. Locks scroll, shakes the screen,
 * gathers cosmic energy, flashes, then auto-reveals the evolved card centered.
 * Feels like opening a rare pack in a premium game.
 */
export function UnlockCelebration({
  reward,
  onClose,
}: {
  reward: UnlockReward;
  onClose: () => void;
}) {
  const [phase, setPhase] = useState<Phase>("gather");

  // Cinematic palette — fall back to the reward's own colours if rarityKey absent.
  const palette = useMemo(() => {
    if (reward.rarityKey) return RARITY_PALETTE[reward.rarityKey];
    return { color: reward.color, glow: reward.glow, soft: `${reward.color}33` };
  }, [reward.rarityKey, reward.color, reward.glow]);

  // ── Scroll lock for the entire cinematic ───────────────────────────────────
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    const prevPaddingRight = document.body.style.paddingRight;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPaddingRight;
    };
  }, []);

  // ── Sound + phase scheduling ───────────────────────────────────────────────
  useEffect(() => {
    sfx.whoosh();
    const t1 = window.setTimeout(() => {
      sfx.perfect();
      setPhase("flash");
    }, 1400);
    const t2 = window.setTimeout(() => {
      sfx.fanfare();
      setPhase("reveal");
    }, 1700);
    const t3 = window.setTimeout(onClose, 6500);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [onClose, reward.id]);

  // Particles (cosmic gathering motes)
  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => {
        const angle = (i / 36) * Math.PI * 2 + Math.random() * 0.5;
        const radius = 280 + Math.random() * 260;
        return {
          id: i,
          x: Math.cos(angle) * radius,
          y: Math.sin(angle) * radius,
          delay: Math.random() * 0.6,
          dur: 1.1 + Math.random() * 0.4,
          size: 4 + Math.random() * 6,
        };
      }),
    [reward.id],
  );

  // Sparkle stars during reveal
  const sparkles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 1.4,
        dur: 1.4 + Math.random() * 1.6,
        size: 10 + Math.random() * 14,
      })),
    [reward.id],
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Evolved: ${reward.name}`}
      className={`fixed inset-0 z-[200] flex items-center justify-center overflow-hidden ${
        phase !== "reveal" ? "evo-shake" : ""
      }`}
      onClick={phase === "reveal" ? onClose : undefined}
      style={
        {
          ["--rar" as string]: palette.color,
          ["--rar-glow" as string]: palette.glow,
          ["--rar-soft" as string]: palette.soft,
        } as CSSProperties
      }
    >
      {/* Deep scrim with radial vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(5,8,22,0.78) 0%, rgba(5,8,22,0.96) 70%, #050816 100%)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      {/* Rotating rays */}
      <div
        className="evo-rays absolute left-1/2 top-1/2 h-[180vmax] w-[180vmax] -translate-x-1/2 -translate-y-1/2"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 6%, ${palette.glow} 7% 9%, transparent 10% 22%, ${palette.glow} 23% 25%, transparent 26% 50%, ${palette.glow} 51% 53%, transparent 54% 72%, ${palette.glow} 73% 75%, transparent 76% 100%)`,
          opacity: phase === "reveal" ? 0.45 : 0.25,
          maskImage: "radial-gradient(circle, black 25%, transparent 65%)",
          WebkitMaskImage: "radial-gradient(circle, black 25%, transparent 65%)",
          transition: "opacity 600ms ease",
        }}
      />

      {/* Pulsing core glow */}
      <div
        className="evo-pulse pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: "min(70vmin, 720px)",
          height: "min(70vmin, 720px)",
          background: `radial-gradient(circle, ${palette.glow} 0%, transparent 65%)`,
        }}
      />

      {/* Cosmic gather particles → converge to center */}
      {phase === "gather" &&
        particles.map((p) => (
          <span
            key={p.id}
            className="evo-particle pointer-events-none absolute left-1/2 top-1/2 rounded-full"
            style={
              {
                width: p.size,
                height: p.size,
                background: palette.color,
                boxShadow: `0 0 ${p.size * 2}px ${palette.glow}`,
                ["--sx" as string]: `${p.x}px`,
                ["--sy" as string]: `${p.y}px`,
                animationDelay: `${p.delay}s`,
                animationDuration: `${p.dur}s`,
              } as CSSProperties
            }
          />
        ))}

      {/* White flash transition */}
      {phase === "flash" && <div className="evo-flash absolute inset-0 bg-white" />}

      {/* Sparkles & expanding rings during reveal */}
      {phase === "reveal" && (
        <>
          <Confetti count={110} />
          {sparkles.map((s) => (
            <span
              key={s.id}
              className="evo-sparkle pointer-events-none absolute"
              style={{
                left: `${s.left}%`,
                top: `${s.top}%`,
                fontSize: s.size,
                color: palette.color,
                animationDelay: `${s.delay}s`,
                animationDuration: `${s.dur}s`,
                textShadow: `0 0 12px ${palette.glow}`,
              }}
            >
              ✦
            </span>
          ))}
          {[0, 0.25, 0.5].map((d) => (
            <span
              key={d}
              className="evo-ring pointer-events-none absolute left-1/2 top-1/2 rounded-full border-2"
              style={{
                borderColor: palette.color,
                width: "min(40vmin, 420px)",
                height: "min(40vmin, 420px)",
                boxShadow: `0 0 40px ${palette.glow}`,
                animationDelay: `${d}s`,
              }}
            />
          ))}
        </>
      )}

      {/* ── Reveal card (centered, auto-shown) ───────────────────────────── */}
      {phase === "reveal" && (
        <div
          className="evo-card relative z-10 w-full max-w-md rounded-[2rem] border bg-[#0B1220]/90 p-7 text-center backdrop-blur-2xl"
          style={{
            borderColor: `${palette.color}66`,
            boxShadow: `0 0 80px ${palette.glow}, inset 0 0 40px ${palette.soft}`,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/60 transition-colors hover:bg-white/[0.12] hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <p
            className="flex items-center justify-center gap-1.5 text-[11px] font-black uppercase tracking-[0.32em]"
            style={{ color: palette.color }}
          >
            <Sparkles className="h-3.5 w-3.5" /> Evolution Complete
          </p>

          {/* From → To name reveal */}
          <div className="mt-6 space-y-3">
            {reward.from && (
              <>
                <p className="font-display text-2xl font-black text-white/45 line-through decoration-white/30 sm:text-3xl">
                  {reward.from}
                </p>
                <ArrowDown
                  className="mx-auto h-7 w-7 evo-arrow"
                  style={{ color: palette.color, filter: `drop-shadow(0 0 12px ${palette.glow})` }}
                />
              </>
            )}
            <h2
              className="evo-name font-display text-4xl font-black leading-tight sm:text-5xl"
              style={{
                color: "#fff",
                textShadow: `0 0 24px ${palette.glow}, 0 0 60px ${palette.glow}`,
              }}
            >
              {reward.name}
            </h2>
          </div>

          {reward.rarityLabel && (
            <span
              className="mt-5 inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest"
              style={{ background: `${palette.color}22`, color: palette.color }}
            >
              {reward.rarityLabel}
            </span>
          )}
          <p className="mt-3 text-sm text-white/60">{reward.subtitle}</p>

          <button
            type="button"
            onClick={onClose}
            className="mt-6 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-black text-[#050816] transition-transform hover:scale-[1.02]"
            style={{ background: `linear-gradient(90deg, ${palette.color}, ${palette.glow})` }}
          >
            Awesome!
          </button>
        </div>
      )}
    </div>
  );
}
