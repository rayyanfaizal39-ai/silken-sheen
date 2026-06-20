import { Link } from "@tanstack/react-router";
import { Sparkles, X, Zap } from "lucide-react";
import {
  COMPANION_STAGES,
  getCompanionStageForXp,
  useProgress,
} from "@/hooks/use-progress";
import { CompanionImage } from "./CompanionImage";
import { getCompanionMood, getCompanionMoodMessage, MOOD_EMOJI, MOOD_LABEL } from "./mood";
import { getCompanionDisplayName, getCompanionSpecies } from "./species";

/** Popover panel opened from the floating Cosmic Companion widget. */
export function CompanionPanel({ onClose }: { onClose: () => void }) {
  const { progress } = useProgress();
  const companion = progress.companion ?? { id: "nova" as const, level: 1 };
  const species = getCompanionSpecies(companion.id);
  const displayName = getCompanionDisplayName(companion);

  const stageId = getCompanionStageForXp(progress.xp);
  const stageIndex = Math.max(0, COMPANION_STAGES.findIndex((s) => s.id === stageId));
  const currentStage = COMPANION_STAGES[stageIndex] ?? COMPANION_STAGES[0];
  const nextStage = COMPANION_STAGES[stageIndex + 1] ?? null;
  const xpIntoStage = progress.xp - currentStage.xpRequired;
  const xpForNextStage = nextStage ? nextStage.xpRequired - currentStage.xpRequired : 0;
  const xpProgressPct =
    nextStage && xpForNextStage > 0
      ? Math.min(100, Math.round((xpIntoStage / xpForNextStage) * 100))
      : 100;
  const mood = getCompanionMood(progress, stageId);
  const moodMessage = getCompanionMoodMessage(mood, displayName);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-end p-4 sm:items-center sm:justify-center">
      <button
        type="button"
        aria-label="Close companion panel"
        onClick={onClose}
        className="absolute inset-0 bg-[#050816]/70 backdrop-blur-sm"
      />

      <div className="relative z-10 w-full max-w-sm overflow-hidden rounded-[1.75rem] border border-[#F0ABFC]/25 bg-gradient-to-b from-[#312E81]/55 to-[#0B1220]/92 p-6 text-center shadow-[0_24px_64px_rgba(0,0,0,0.6)] backdrop-blur-2xl">
        {/* Starfield speckle */}
        <div className="pointer-events-none absolute inset-0 opacity-40" aria-hidden>
          <span className="absolute left-[10%] top-[14%] h-1 w-1 rounded-full bg-white/80" />
          <span className="absolute right-[14%] top-[24%] h-1.5 w-1.5 rounded-full bg-white/60" />
          <span className="absolute left-[20%] bottom-[18%] h-1 w-1 rounded-full bg-white/70" />
        </div>

        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-white/60 transition-colors hover:bg-white/[0.12] hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        <p className="relative z-10 text-[10px] font-black uppercase tracking-[0.22em] text-[#F0ABFC]/70">
          Cosmic Companion
        </p>

        <div className="relative z-10 mt-3">
          <div className="relative mx-auto mb-4 flex h-28 w-28 items-center justify-center">
            <div className="cosmic-companion-glow absolute inset-0 rounded-full bg-[#F0ABFC]/20 blur-2xl" />
            <div className="absolute inset-2 rounded-full border border-white/15 shadow-[0_0_36px_rgba(240,171,252,0.35)]" />
            <CompanionImage
              speciesId={companion.id}
              stage={stageId}
              size={84}
              className="relative z-10 animate-[companionFloat_4.6s_ease-in-out_infinite]"
            />
          </div>

          <h3 className="font-display text-xl font-black text-white">
            {displayName} {currentStage.name}
          </h3>
          <p className="mt-1 text-xs font-bold text-white/45">
            {MOOD_EMOJI[mood]} {moodMessage}
          </p>

          <dl className="mt-4 grid grid-cols-2 gap-2 text-left">
            <Field label="Species" value={species.name} />
            <Field label="Stage" value={currentStage.name} />
            <Field label="Level" value={String(stageIndex + 1)} />
            <Field label="XP" value={progress.xp.toLocaleString()} />
            <Field label="Mood" value={`${MOOD_EMOJI[mood]} ${MOOD_LABEL[mood]}`} />
          </dl>

          <div className="mt-4 rounded-xl border border-white/[0.08] bg-white/[0.04] p-3 text-left">
            <div className="mb-1.5 flex items-center justify-between text-[10px] text-white/40">
              <span className="flex items-center gap-1 font-bold uppercase tracking-widest">
                <Zap className="h-3 w-3 text-yellow-400" /> Next Evolution
              </span>
              <span>{nextStage ? nextStage.name : "Max stage"}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#818CF8] to-[#F0ABFC] transition-all duration-500"
                style={{ width: `${xpProgressPct}%` }}
              />
            </div>
          </div>

          <Link
            to="/companion"
            onClick={onClose}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-4 py-3 text-sm font-bold text-white transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="h-4 w-4" /> Open Companion Page
          </Link>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] px-3 py-2">
      <p className="text-[9px] font-black uppercase tracking-widest text-white/30">{label}</p>
      <p className="mt-0.5 truncate text-sm font-bold text-white">{value}</p>
    </div>
  );
}
