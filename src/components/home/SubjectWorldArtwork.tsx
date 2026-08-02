import { useState, type CSSProperties, type SyntheticEvent } from "react";
import { getSubjectWorldArtwork, SUBJECT_WORLD_FALLBACK_ACCENT } from "@/lib/subject-world-artwork";

type SubjectWorldArtworkProps = {
  subject?: unknown;
  className?: string;
};

export function SubjectWorldArtwork({ subject, className = "" }: SubjectWorldArtworkProps) {
  const artwork = getSubjectWorldArtwork(subject);
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showFallback = !artwork || failedSrc === artwork.src;
  const accent = artwork?.accent ?? SUBJECT_WORLD_FALLBACK_ACCENT;

  const handleError = (event: SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.hidden = true;
    if (!artwork) return;

    setFailedSrc(artwork.src);
    if (import.meta.env.DEV) {
      console.warn(`[subject-world-artwork] Unable to load artwork for ${artwork.canonicalId}.`);
    }
  };

  return (
    <div
      className={`home-subject-world-artwork ${className}`.trim()}
      data-fallback={showFallback ? "true" : undefined}
      style={{ "--home-world-accent": accent } as CSSProperties}
      aria-hidden={showFallback ? "true" : undefined}
    >
      {!showFallback && artwork && (
        <img
          key={artwork.src}
          src={artwork.src}
          alt={artwork.alt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={handleError}
        />
      )}
      <span className="home-subject-world-artwork__overlay" aria-hidden="true" />
    </div>
  );
}
