import { useProgress, SPACE_RANKS } from "@/hooks/use-progress";

/** Global celebration shown whenever a student's Cosmic Rank advances. */
export function RankUpModal() {
  const { lastRankUp, clearRankUpEvent } = useProgress();
  if (!lastRankUp) return null;

  const fromRank = SPACE_RANKS.find((r) => r.id === lastRankUp.fromRank);
  const toRank = SPACE_RANKS.find((r) => r.id === lastRankUp.toRank);
  if (!toRank) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Dismiss"
        onClick={clearRankUpEvent}
        className="absolute inset-0 bg-[#050816]/75 backdrop-blur-sm"
      />

      <div
        className="relative z-10 w-full max-w-sm overflow-hidden rounded-[1.75rem] border p-6 text-center shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-2xl animate-[rankUpPop_0.35s_ease-out]"
        style={{
          borderColor: `${toRank.color}44`,
          background: `linear-gradient(160deg, ${toRank.glowColor}, rgba(11,18,32,0.94))`,
        }}
      >
        <div
          className="pointer-events-none absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: toRank.glowColor }}
        />

        <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.28em] text-white/50">
          Rank Up!
        </p>

        <div className="relative z-10 mt-4 flex items-center justify-center gap-3">
          {fromRank && (
            <span className="flex flex-col items-center gap-1 opacity-50">
              <span className="text-3xl">{fromRank.emoji}</span>
              <span className="text-[10px] font-bold text-white/60">{fromRank.name}</span>
            </span>
          )}
          {fromRank && <span className="text-xl text-white/30">→</span>}
          <span className="flex flex-col items-center gap-1">
            <span className="text-4xl">{toRank.emoji}</span>
          </span>
        </div>

        <h2
          className="relative z-10 mt-3 font-display text-2xl font-black"
          style={{ color: toRank.color, textShadow: `0 0 24px ${toRank.glowColor}` }}
        >
          {toRank.name}
        </h2>
        <p className="relative z-10 mt-1 text-xs italic text-white/55">"{toRank.description}"</p>

        <p className="relative z-10 mt-4 text-sm font-bold text-white">
          +{lastRankUp.xpGained.toLocaleString()} XP earned
        </p>

        <button
          type="button"
          onClick={clearRankUpEvent}
          className="relative z-10 mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#7C3AED] to-[#6D28D9] px-5 py-3 text-sm font-black text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Continue
        </button>
      </div>

      <style>{`
        @keyframes rankUpPop {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
