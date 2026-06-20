import { useProgress, COMPANION_STAGES } from "@/hooks/use-progress";
import { CompanionImage, getCompanionDisplayName } from "@/companion";

/** Global celebration shown whenever the student's companion evolves to a new stage. */
export function CompanionEvolutionModal() {
  const { progress, lastCompanionEvolution, clearCompanionEvolutionEvent } = useProgress();
  if (!lastCompanionEvolution) return null;

  const fromStage = COMPANION_STAGES.find((s) => s.id === lastCompanionEvolution.fromStage);
  const toStage = COMPANION_STAGES.find((s) => s.id === lastCompanionEvolution.toStage);
  if (!toStage) return null;

  const displayName = progress.companion
    ? getCompanionDisplayName(progress.companion)
    : "Your companion";

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Dismiss"
        onClick={clearCompanionEvolutionEvent}
        className="absolute inset-0 bg-[#050816]/75 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-[#F0ABFC]/30 bg-gradient-to-b from-[#312E81]/60 to-[#0B1220]/94 p-6 text-center shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-2xl animate-[evolvePop_0.35s_ease-out]">
        <div className="pointer-events-none absolute -top-10 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-[#F0ABFC]/25 blur-3xl" />

        <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.28em] text-[#F0ABFC]/70">
          Your Companion Evolved!
        </p>

        <div className="relative z-10 mx-auto mt-4 flex h-28 w-28 items-center justify-center">
          <div className="absolute inset-2 rounded-full border border-white/15 shadow-[0_0_36px_rgba(240,171,252,0.35)]" />
          <CompanionImage
            speciesId={lastCompanionEvolution.companionId}
            stage={toStage.id}
            size={84}
            className="rank-companion-float"
          />
        </div>

        <h2 className="relative z-10 mt-3 font-display text-xl font-black text-white">
          {displayName}
        </h2>

        <div className="relative z-10 mt-2 flex items-center justify-center gap-2 text-sm font-bold text-white/60">
          {fromStage && <span>{fromStage.name}</span>}
          {fromStage && <span className="text-white/30">→</span>}
          <span className="text-[#F0ABFC]">{toStage.name}</span>
        </div>

        <button
          type="button"
          onClick={clearCompanionEvolutionEvent}
          className="relative z-10 mt-6 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-5 py-3 text-sm font-black text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Awesome!
        </button>
      </div>

      <style>{`
        @keyframes evolvePop {
          from { opacity: 0; transform: scale(0.9) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}
