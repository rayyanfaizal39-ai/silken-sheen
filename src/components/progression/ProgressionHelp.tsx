import type { ReactNode } from "react";
import { Flame, Info, Sparkles, Zap } from "lucide-react";
import { getCompanionLevelProgress } from "@/hooks/use-progress";
import { PROGRESSION_REWARD_DISPLAY } from "@/lib/progression-rewards";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const contentClass =
  "z-[100] max-h-[min(72vh,34rem)] w-[min(calc(100vw-2rem),22rem)] overflow-y-auto rounded-2xl border-white/10 bg-[#0B1220]/98 p-4 text-white shadow-[0_20px_70px_rgba(0,0,0,0.55)]";

export function StreakInfoPopover({
  streak,
  className,
  children,
}: {
  streak: number;
  className: string;
  children?: ReactNode;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button type="button" className={className} aria-label="Explain learning streak">
          {children ?? (
            <>
              <Flame className="h-4 w-4 text-orange-400" aria-hidden="true" />
              <span>{streak > 0 ? `${streak} Day Streak` : "Start your streak"}</span>
              <Info className="h-3.5 w-3.5 text-orange-200/65" aria-hidden="true" />
            </>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent className={contentClass} align="end" sideOffset={8}>
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5 text-orange-400" aria-hidden="true" />
          <h2 className="font-display text-base font-black">Learning Streak</h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-white/70">
          Earn XP on a qualifying learning activity each day to keep your streak alive.
        </p>
        <ul className="mt-3 space-y-2 text-xs leading-5 text-white/60">
          <li>• Answer a quiz question correctly</li>
          <li>• Rate a flashcard Good or Easy</li>
          <li>• Complete a supported interactive lesson activity</li>
        </ul>
        <div className="mt-4 rounded-xl border border-orange-300/15 bg-orange-300/[0.06] px-3 py-2">
          <p className="text-xs font-bold text-orange-100">
            {streak > 0
              ? `Current streak: ${streak} day${streak === 1 ? "" : "s"}`
              : "Complete a qualifying XP activity today to begin."}
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function XpInfoPopover({ className = "" }: { className?: string }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`inline-flex min-h-11 items-center gap-1.5 rounded-xl px-2 text-xs font-bold text-[#C4B5FD] transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] ${className}`}
          aria-label="How to earn XP"
        >
          <Info className="h-3.5 w-3.5" aria-hidden="true" /> How to earn XP
        </button>
      </PopoverTrigger>
      <PopoverContent className={contentClass} align="end" sideOffset={8}>
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-[#FBBF24]" aria-hidden="true" />
          <h2 className="font-display text-base font-black">What is XP?</h2>
        </div>
        <p className="mt-3 text-sm leading-6 text-white/70">
          Earn XP from learning activities. Your Lifetime XP unlocks Explorer Ranks and grows your
          Companion.
        </p>
        <h3 className="mt-4 text-xs font-black uppercase tracking-[0.16em] text-[#A78BFA]">
          How to earn XP
        </h3>
        <dl className="mt-2 divide-y divide-white/[0.07]">
          {PROGRESSION_REWARD_DISPLAY.map((reward) => (
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 py-2.5" key={reward.label}>
              <div>
                <dt className="text-xs font-bold text-white/85">{reward.label}</dt>
                <dd className="text-[11px] leading-4 text-white/40">{reward.note}</dd>
              </div>
              <dd className="text-right text-xs font-black tabular-nums text-[#FDE68A]">
                {reward.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="mt-4 rounded-xl border border-violet-300/15 bg-violet-300/[0.06] p-3">
          <p className="flex flex-wrap items-center gap-1 text-xs font-black text-violet-100">
            Learn <span aria-hidden="true">→</span> Earn XP <span aria-hidden="true">→</span> Rank
            Up <span aria-hidden="true">→</span> Grow Your Companion
          </p>
          <p className="mt-1.5 text-[11px] leading-5 text-white/50">
            Monthly XP is tracked separately for the current leaderboard competition.
          </p>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function CompanionInfoPopover({
  xp,
  companionName,
  className = "",
}: {
  xp: number;
  companionName: string;
  className?: string;
}) {
  const companionProgress = getCompanionLevelProgress(xp);
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className={`inline-flex min-h-11 items-center gap-1.5 rounded-xl px-2 text-xs font-bold text-[#F5D0FE] transition-colors hover:bg-white/[0.06] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F0ABFC] ${className}`}
          aria-label={`Explain ${companionName}'s growth`}
        >
          <Info className="h-3.5 w-3.5" aria-hidden="true" /> How growth works
        </button>
      </PopoverTrigger>
      <PopoverContent className={contentClass} align="end" sideOffset={8}>
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[#F0ABFC]" aria-hidden="true" />
          <h2 className="font-display text-base font-black">{companionName}&apos;s Growth</h2>
        </div>
        <dl className="mt-3 grid grid-cols-2 gap-2 text-xs">
          <div className="rounded-xl bg-white/[0.05] p-3">
            <dt className="text-white/40">Current stage</dt>
            <dd className="mt-1 font-black text-white">{companionProgress.currentStage.name}</dd>
          </div>
          <div className="rounded-xl bg-white/[0.05] p-3">
            <dt className="text-white/40">Companion level</dt>
            <dd className="mt-1 font-black text-white">Level {companionProgress.currentLevel}</dd>
          </div>
        </dl>
        <p className="mt-3 text-sm leading-6 text-white/65">
          Lifetime XP from learning automatically moves {companionName} through Companion stages.
        </p>
        <p className="mt-2 text-xs font-bold text-[#F5D0FE]">
          {companionProgress.nextStage
            ? `${companionProgress.remainingXp.toLocaleString()} XP until ${companionProgress.nextStage.name}`
            : `${companionName} has reached the final stage.`}
        </p>
      </PopoverContent>
    </Popover>
  );
}
