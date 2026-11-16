import { type CSSProperties } from "react";
import { getRankArtworkFit, getRankAsset, getRankGlow, type SpaceRank } from "@/data/rankAssets";
import { cn } from "@/lib/utils";

type RankBadgeProps = {
  rank: SpaceRank | string;
  size?: number | string;
  className?: string;
  imageClassName?: string;
  locked?: boolean;
};

export function RankBadge({
  rank,
  size = 48,
  className,
  imageClassName,
  locked = false,
}: RankBadgeProps) {
  const rankName = typeof rank === "string" ? rank : rank.name;
  const src = getRankAsset(rankName);
  const fit = getRankArtworkFit(rankName);

  return (
    <span
      className={cn("relative inline-grid shrink-0 place-items-center overflow-hidden", className)}
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
        className={cn(
          "absolute inset-0 block h-full w-full object-contain object-center",
          imageClassName,
        )}
        style={{
          transform: `translate(${fit.translateX}%, ${fit.translateY}%) scale(${fit.scale})`,
          transformOrigin: "center",
        }}
        draggable={false}
      />
    </span>
  );
}
