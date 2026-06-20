import { useState } from "react";
import type { CompanionId, CompanionStageId } from "@/hooks/use-progress";
import { getCompanionSpecies } from "./species";

/** Renders a companion's stage artwork, falling back to an emoji if the image is missing/broken. */
export function CompanionImage({
  speciesId,
  stage,
  size = 96,
  className = "",
}: {
  speciesId: CompanionId;
  stage: CompanionStageId;
  size?: number;
  className?: string;
}) {
  const species = getCompanionSpecies(speciesId);
  const [failed, setFailed] = useState(false);
  const src = species.images[stage];

  if (failed || !src) {
    return (
      <span
        role="img"
        aria-label={`${species.name} (${stage})`}
        className={className}
        style={{ fontSize: size * 0.6, lineHeight: 1, position: "relative", zIndex: 10 }}
      >
        {species.fallbackEmoji[stage]}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`${species.name} — ${stage} stage`}
      width={size}
      height={size}
      className={className}
      style={{ width: size, height: size, objectFit: "contain", position: "relative", zIndex: 10 }}
      onError={() => setFailed(true)}
    />
  );
}
