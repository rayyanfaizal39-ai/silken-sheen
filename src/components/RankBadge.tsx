import { type CSSProperties } from "react";
import { getRankAsset, getRankGlow, type SpaceRank } from "@/data/rankAssets";
import { cn } from "@/lib/utils";

type RankBadgeProps = {
  rank: SpaceRank | string;
  size?: number | string;
  className?: string;
  locked?: boolean;
};

export function RankBadge({
  rank,
  size = 48,
  className,
  locked = false,
}: RankBadgeProps) {
  const rankName = typeof rank === "string" ? rank : rank.name;
  const src = getRankAsset(rankName);

  return (
    <span
      className={cn("relative inline-flex shrink-0 items-center justify-center", className)}
      style={
        {
          width: size,
          height: size,
          opacity: locked ? 0.35 : 1,
          filter: locked
            ? "grayscale(1) brightness(0.65)"
            : `drop-shadow(0 0 10px ${getRankGlow(rankName)})`,
        } as CSSProperties
      }
      data-rank={rankName}
      data-locked={locked || undefined}
    >
      <img
        src={src}
        alt={locked ? "" : `${rankName} rank badge`}
        aria-hidden={locked || undefined}
        className="h-[92%] w-[92%] object-contain"
        draggable={false}
      />
    </span>
  );
}
