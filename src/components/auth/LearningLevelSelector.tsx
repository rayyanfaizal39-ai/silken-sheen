import { useId, useState } from "react";
import { preload } from "react-dom";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DEFAULT_LEARNING_LEVEL,
  LEARNING_LEVELS,
  isLearningLevelAvailable,
  type LearningLevelId,
} from "@/lib/learning-levels";

interface LevelTheme {
  /** ~900px-wide WebP artwork shown as the card background. */
  image: string;
  /** Border plus a matching gradient that shows until the image loads. */
  card: string;
  diamond: string;
}

// Primary = enchanted forest (emerald), Junior = purple space, Senior = academy express (gold border).
const LEVEL_THEMES: Record<LearningLevelId, LevelTheme> = {
  primary: {
    image: "/images/login/level-primary.webp",
    card: "border-[#34D399]/70 bg-[linear-gradient(160deg,#1E8A55_0%,#11633C_55%,#0A3D26_100%)]",
    diamond: "bg-[#6EE7B7]",
  },
  junior: {
    image: "/images/login/level-junior.webp",
    card: "border-[#A855F7] bg-[linear-gradient(160deg,#5B21B6_0%,#3B0F86_55%,#1E0B4B_100%)]",
    diamond: "bg-[#C4B5FD]",
  },
  senior: {
    image: "/images/login/level-senior.webp",
    card: "border-[#FACC15]/80 bg-[linear-gradient(160deg,#B7860B_0%,#8A5A07_55%,#4A2C04_100%)]",
    diamond: "bg-[#FDE68A]",
  },
};

/**
 * Visual learning-level picker for the login page. Native radios give arrow-key
 * navigation and skip disabled levels; the choice is local UI state only and is
 * never sent to auth, profiles, or redirects.
 */
export function LearningLevelSelector() {
  const headingId = useId();
  const [selected, setSelected] = useState<LearningLevelId>(DEFAULT_LEARNING_LEVEL);

  // CSS backgrounds are discovered late; hint them into <head> so they load with the page.
  for (const { image } of Object.values(LEVEL_THEMES)) {
    preload(image, { as: "image", type: "image/webp", fetchPriority: "high" });
  }

  return (
    <div>
      <h2
        id={headingId}
        className="text-center font-display text-[20px] font-bold text-white [text-shadow:0_2px_12px_rgba(0,0,0,0.4)] min-[360px]:text-[22px] sm:text-4xl lg:text-[40px]"
      >
        Choose your learning level
      </h2>
      <p className="mt-1 text-center text-[13px] text-white/85 sm:mt-2 sm:text-lg">
        Pick the level that matches your journey
      </p>

      <div
        role="radiogroup"
        aria-labelledby={headingId}
        className="mt-5 grid grid-cols-3 gap-2 sm:mt-6 sm:gap-5 lg:gap-8"
      >
        {LEARNING_LEVELS.map((level) => {
          const available = isLearningLevelAvailable(level.id);
          const isSelected = available && selected === level.id;
          const theme = LEVEL_THEMES[level.id];
          const statusId = `${headingId}-${level.id}-status`;

          return (
            <label
              key={level.id}
              data-level={level.id}
              data-selected={isSelected}
              data-available={available}
              className={cn(
                "relative flex min-h-[168px] min-w-0 flex-col items-center justify-end overflow-hidden rounded-2xl border-2 px-1 py-4 text-center sm:min-h-[230px] sm:rounded-3xl sm:px-4 lg:min-h-[248px]",
                "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-white",
                theme.card,
                available ? "cursor-pointer" : "cursor-not-allowed",
                isSelected &&
                  "shadow-[0_0_0_1px_rgba(196,181,253,0.5),0_0_44px_rgba(168,85,247,0.5)]",
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${theme.image})` }}
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/40 to-black/75"
              />
              <input
                type="radio"
                name="learning-level"
                value={level.id}
                checked={isSelected}
                disabled={!available}
                aria-describedby={statusId}
                onChange={() => setSelected(level.id)}
                className="sr-only"
              />
              {isSelected && (
                <span
                  aria-hidden="true"
                  className="absolute right-1.5 top-1.5 z-10 inline-flex items-center gap-1 rounded-full border border-[#34D399]/60 bg-[#052E1F]/85 p-1 text-xs font-semibold text-[#6EE7B7] sm:right-3 sm:top-3 lg:px-2.5 lg:py-1"
                >
                  <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={3} />
                  <span className="hidden lg:inline">Selected</span>
                </span>
              )}
              <span className="relative flex flex-col items-center">
                <span className="font-display text-[15px] font-bold leading-tight text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.35)] sm:mt-4 sm:text-2xl lg:text-[32px]">
                  {level.name}
                </span>
                <span className="mt-0.5 whitespace-nowrap text-[11px] text-white/90 sm:mt-1 sm:text-lg lg:text-xl">
                  {level.range}
                </span>
                <span
                  id={statusId}
                  className={cn(
                    "mt-3 inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-1.5 py-1 text-[10px] font-semibold leading-none sm:mt-5 sm:gap-2 sm:px-5 sm:py-2.5 sm:text-base",
                    available
                      ? "bg-[#34D399] text-[#052E1F] shadow-[0_6px_18px_rgba(52,211,153,0.35)]"
                      : "border border-white/20 bg-black/35 text-white",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-2 w-2 shrink-0",
                      available
                        ? "hidden rounded-full bg-[#047857] sm:inline-block"
                        : cn("hidden rotate-45 sm:inline-block", theme.diamond),
                    )}
                  />
                  {available ? "Available" : "Coming Soon"}
                </span>
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
