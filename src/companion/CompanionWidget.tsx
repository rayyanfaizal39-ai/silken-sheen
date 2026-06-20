import { useState } from "react";
import { COMPANION_STAGES, getCompanionStageForXp, useProgress } from "@/hooks/use-progress";
import { CompanionImage } from "./CompanionImage";
import { CompanionPanel } from "./CompanionPanel";
import { getCompanionDisplayName } from "./species";

/** Fixed bottom-right companion launcher. Mirrors the same XP/stage shown on /companion. */
export function CompanionWidget() {
  const { progress } = useProgress();
  const [open, setOpen] = useState(false);
  const companion = progress.companion;

  if (!companion) return null;

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

  return (
    <>
      <button
        type="button"
        aria-label="Open Cosmic Companion"
        onClick={() => setOpen(true)}
        className="fixed bottom-[calc(var(--mobile-content-bottom,0px)+1.25rem)] right-4 z-50 flex items-center gap-2.5 rounded-full border border-[#F0ABFC]/30 bg-[#0B1220]/85 py-1.5 pl-1.5 pr-4 shadow-[0_8px_32px_rgba(240,171,252,0.4)] backdrop-blur-xl transition-transform hover:scale-105 active:scale-95 sm:bottom-6 sm:right-6"
      >
        <span className="cosmic-companion-glow relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_32%_24%,rgba(255,255,255,0.9),#F0ABFC_18%,#8B5CF6_62%,#22D3EE_100%)]">
          <CompanionImage speciesId={companion.id} stage={stageId} size={34} />
        </span>
        <span className="flex flex-col items-start gap-0.5">
          <span className="flex items-center gap-1.5 text-xs font-black text-white">
            {displayName}
            <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[9px] font-bold text-[#F0ABFC]">
              Lv {stageIndex + 1}
            </span>
          </span>
          <span className="h-1.5 w-20 overflow-hidden rounded-full bg-white/[0.1]">
            <span
              className="block h-full rounded-full bg-gradient-to-r from-[#818CF8] to-[#F0ABFC]"
              style={{ width: `${xpProgressPct}%` }}
            />
          </span>
        </span>
      </button>

      {open && <CompanionPanel onClose={() => setOpen(false)} />}
    </>
  );
}
