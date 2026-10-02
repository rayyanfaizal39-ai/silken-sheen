import type { CSSProperties } from "react";
import { getRankArtworkFit, getRankAsset, getRankGlow, type SpaceRank } from "@/data/rankAssets";
import { cn } from "@/lib/utils";

/**
 * Fixed outer boxes for leaderboard Cosmic Rank artwork.
 * Champion is 92/78 ≈ 1.18× the podium finalists from the sm breakpoint up,
 * and 74/64 ≈ 1.16× below that.
 * Top 10 rows are 40px from the md breakpoint and 44px from lg.
 * Mobile ranking cards are 36px. The sidebar chip stays 32px.
 * Hall of Fame badges are calmer than the live podium and larger than a table row.
 */
export const COSMIC_RANK_ICON_FRAME = {
  champion: "h-[74px] w-[74px] sm:h-[92px] sm:w-[92px]",
  podium: "h-[64px] w-[64px] sm:h-[78px] sm:w-[78px]",
  table: "h-[40px] w-[40px] lg:h-[44px] lg:w-[44px]",
  compact: "h-[36px] w-[36px]",
  sidebar: "h-8 w-8",
  hallChampion: "h-[56px] w-[56px] sm:h-[64px] sm:w-[64px]",
  hall: "h-[48px] w-[48px] sm:h-[56px] sm:w-[56px]",
  fill: "absolute inset-0",
} as const;

export type CosmicRankIconSize = keyof typeof COSMIC_RANK_ICON_FRAME;

type CosmicRankIconProps = {
  rank: SpaceRank | string;
  size?: CosmicRankIconSize;
  /** Podium frames already draw their own glow, so the image glow stays off there. */
  glow?: boolean;
  className?: string;
};

export function CosmicRankIcon({
  rank,
  size = "table",
  glow = true,
  className,
}: CosmicRankIconProps) {
  const rankName = typeof rank === "string" ? rank : rank.name;
  const src = getRankAsset(rankName);
  const fit = getRankArtworkFit(rankName);

  return (
    <span
      className={cn(
        "relative inline-flex min-h-0 min-w-0 shrink-0 items-center justify-center overflow-hidden",
        COSMIC_RANK_ICON_FRAME[size],
        className,
      )}
      style={
        {
          filter: glow ? `drop-shadow(0 0 10px ${getRankGlow(rankName)})` : undefined,
        } as CSSProperties
      }
      data-rank={rankName}
      data-rank-icon-size={size}
    >
      <img
        src={src}
        alt={`${rankName} rank badge`}
        draggable={false}
        className="absolute inset-0 h-full w-full object-contain object-center"
        style={{
          transform: `translate(${fit.translateX}%, ${fit.translateY}%) scale(${fit.scale})`,
          transformOrigin: "center",
        }}
      />
    </span>
  );
}
