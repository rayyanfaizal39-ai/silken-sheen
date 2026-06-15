import { useEffect, type CSSProperties } from "react";
import { Sparkles, X } from "lucide-react";
import { Confetti } from "@/components/Confetti";

export interface UnlockReward {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  glow: string;
  rarityLabel?: string;
}

/**
 * Full-screen celebration shown when the student unlocks a collectible.
 * Rarity-coloured rays + ring burst + confetti. Tap anywhere or auto-dismiss.
 */
export function UnlockCelebration({
  reward,
  onClose,
}: {
  reward: UnlockReward;
  onClose: () => void;
}) {
  useEffect(() => {
    const t = window.setTimeout(onClose, 4200);
    return () => window.clearTimeout(t);
  }, [onClose, reward.id]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Unlocked: ${reward.name}`}
      className="fixed inset-0 z-[200] flex items-center justify-center px-6"
      onClick={onClose}
    >
      {/* Scrim */}
      <div className="absolute inset-0 bg-[#050816]/80 backdrop-blur-sm" />

      <Confetti count={90} />

      {/* Rays */}
      <div
        className="unlock-rays h-[140vmin] w-[140vmin]"
        style={{
          background: `conic-gradient(from 0deg, transparent 0 6%, ${reward.glow} 7% 9%, transparent 10% 22%, ${reward.glow} 23% 25%, transparent 26% 50%, ${reward.glow} 51% 53%, transparent 54% 72%, ${reward.glow} 73% 75%, transparent 76% 100%)`,
          opacity: 0.5,
          maskImage: "radial-gradient(circle, black 30%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)",
        }}
      />

      {/* Card */}
      <div
        className="animate-unlock-card relative w-full max-w-sm rounded-[2rem] border bg-[#0B1220]/90 p-7 text-center backdrop-blur-2xl"
        style={{ borderColor: `${reward.color}55`, boxShadow: `0 0 60px ${reward.glow}` }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-white/50 transition-colors hover:bg-white/[0.12] hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <p
          className="flex items-center justify-center gap-1.5 text-[11px] font-black uppercase tracking-[0.3em]"
          style={{ color: reward.color }}
        >
          <Sparkles className="h-3.5 w-3.5" /> Unlocked
        </p>

        {/* Ring burst medallion */}
        <div className="relative mx-auto my-5 flex h-28 w-28 items-center justify-center">
          <span
            className="unlock-ring-burst h-20 w-20"
            style={{ ["--rar-color" as string]: reward.color } as CSSProperties}
          />
          <div
            className="flex h-24 w-24 items-center justify-center rounded-full border-2"
            style={{
              borderColor: reward.color,
              background: `radial-gradient(circle at 40% 30%, ${reward.color}55, ${reward.color}18 60%, transparent)`,
              boxShadow: `inset 0 0 24px ${reward.glow}, 0 0 28px ${reward.glow}`,
            }}
          >
            <Sparkles className="h-10 w-10" style={{ color: reward.color }} />
          </div>
        </div>

        {reward.rarityLabel && (
          <span
            className="inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest"
            style={{ background: `${reward.color}22`, color: reward.color }}
          >
            {reward.rarityLabel}
          </span>
        )}
        <h2 className="mt-2 font-display text-2xl font-extrabold text-white">{reward.name}</h2>
        <p className="mt-1 text-sm text-white/55">{reward.subtitle}</p>

        <button
          type="button"
          onClick={onClose}
          className="mt-5 inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-black text-[#050816] transition-transform hover:scale-[1.02]"
          style={{ background: `linear-gradient(90deg, ${reward.color}, ${reward.glow})` }}
        >
          Awesome!
        </button>
      </div>
    </div>
  );
}
