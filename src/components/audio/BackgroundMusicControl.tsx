import { Music, Music2, Pause, Play, Volume1 } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useBackgroundMusic } from "@/hooks/use-background-music";

const MAX_VOLUME = 0.3;

export function BackgroundMusicControl() {
  const { isEnabled, isPlaying, volume, toggleMusic, play, pause, setVolume } =
    useBackgroundMusic();
  const volumePercent = Math.round(volume * 100);

  const togglePlayback = () => {
    if (!isEnabled) {
      void toggleMusic();
    } else if (isPlaying) {
      pause();
    } else {
      void play();
    }
  };

  return (
    <div className="mobile-music-control fixed bottom-[calc(var(--mobile-fab-bottom)+60px)] right-[18px] z-[75] md:bottom-24 md:right-7">
      <Popover>
        <TooltipProvider delayDuration={500}>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  aria-label={`Background music: ${isEnabled ? "enabled" : "disabled"}`}
                  className="group flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-300/20 bg-[#0B1024]/92 text-violet-100 shadow-[0_12px_40px_rgba(3,7,18,0.55),0_0_24px_rgba(139,92,246,0.18)] backdrop-blur-xl transition-[transform,background-color,border-color] duration-150 ease-out hover:border-violet-300/35 hover:bg-[#151B38] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 active:scale-[0.97]"
                >
                  {isEnabled ? (
                    <Music2 className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <span className="relative" aria-hidden="true">
                      <Music className="h-5 w-5 opacity-55" />
                      <span className="absolute left-1/2 top-1/2 h-[1px] w-6 -translate-x-1/2 -translate-y-1/2 -rotate-45 rounded-full bg-current opacity-80" />
                    </span>
                  )}
                </button>
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent side="left">Background music</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <PopoverContent
          side="top"
          align="end"
          sideOffset={10}
          aria-label="Background music controls"
          className="w-[min(19rem,calc(100vw-2rem))] origin-(--radix-popover-content-transform-origin) rounded-3xl border-white/10 bg-[#0B1024]/96 p-4 text-white shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-2xl"
        >
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500/30 to-fuchsia-500/20 ring-1 ring-violet-300/20">
              <Music2 className="h-5 w-5 text-violet-200" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-200/55">
                AcadeMY study soundtrack
              </p>
              <p className="mt-1 truncate text-sm font-bold text-white">
                Infinite Papercraft Galaxy
              </p>
            </div>
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={
                !isEnabled || !isPlaying ? "Play background music" : "Pause background music"
              }
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-500 text-white shadow-[0_8px_24px_rgba(139,92,246,0.35)] transition-transform duration-150 ease-out hover:scale-[1.04] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 active:scale-[0.97]"
            >
              {!isEnabled || !isPlaying ? (
                <Play className="h-4 w-4 fill-current" aria-hidden="true" />
              ) : (
                <Pause className="h-4 w-4 fill-current" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-3 py-3">
            <div className="mb-2.5 flex items-center gap-2">
              <Volume1 className="h-4 w-4 text-violet-200/70" aria-hidden="true" />
              <span className="text-xs font-medium text-white/60">Volume</span>
              <span className="ml-auto text-xs font-bold tabular-nums text-violet-200">
                {volumePercent}%
              </span>
            </div>
            <Slider
              aria-label="Background music volume"
              min={0}
              max={MAX_VOLUME}
              step={0.01}
              value={[volume]}
              onValueChange={([nextVolume]) => setVolume(nextVolume ?? 0)}
              className="[&_[role=slider]]:border-violet-300/50 [&_[role=slider]]:bg-white [&_[role=slider]]:focus-visible:ring-violet-400 [&_[data-orientation=horizontal]>span]:bg-violet-400"
            />
          </div>

          <button
            type="button"
            onClick={() => void toggleMusic()}
            className="mt-3 w-full rounded-xl px-3 py-2 text-xs font-semibold text-white/55 transition-[color,background-color,transform] duration-150 ease-out hover:bg-white/[0.05] hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-400 active:scale-[0.98]"
          >
            {isEnabled ? "Turn soundtrack off" : "Turn soundtrack on"}
          </button>
        </PopoverContent>
      </Popover>
    </div>
  );
}
