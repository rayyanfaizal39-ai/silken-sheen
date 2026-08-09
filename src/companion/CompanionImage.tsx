import { useState } from "react";
import type { CompanionId, CompanionStageId } from "@/hooks/use-progress";
import { getCompanionSpecies } from "./species";

/** Renders a companion's stage artwork, falling back to an emoji if the image is missing/broken. */
export function CompanionImage({
  speciesId,
  stage,
  size = 220,
  className = "",
}: {
  speciesId: CompanionId;
  stage: CompanionStageId;
  size?: number | string;
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
        style={{
          fontSize: typeof size === "number" ? size * 0.6 : "3.5rem",
          lineHeight: 1,
          position: "relative",
          zIndex: 10,
        }}
      >
        {species.fallbackEmoji[stage]}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={`${species.name} — ${stage} stage`}
      width={typeof size === "number" ? size : undefined}
      height={typeof size === "number" ? size : undefined}
      className={className}
      style={{
        width: size,
        height: size,
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
        position: "relative",
        zIndex: 10,
      }}
      onError={() => setFailed(true)}
    />
  );
}
