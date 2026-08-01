import "./homeSectionSkeleton.css";

type HomeSectionSkeletonProps = {
  lines?: number;
  withArtwork?: boolean;
  label?: string;
};

/**
 * Lightweight shimmer placeholder for non-critical dashboard sections whose
 * data resolves after the full-screen boot loader has already faded out.
 */
export function HomeSectionSkeleton({
  lines = 3,
  withArtwork = true,
  label = "Loading section",
}: HomeSectionSkeletonProps) {
  return (
    <section className="home-skeleton__card home-section-skeleton" aria-label={label} aria-busy>
      {withArtwork ? <div className="home-section-skeleton__art shimmer" /> : null}
      <div className="home-section-skeleton__lines">
        <span className="shimmer home-section-skeleton__line home-section-skeleton__line--label" />
        {Array.from({ length: lines }, (_, i) => (
          <span key={i} className="shimmer home-section-skeleton__line" />
        ))}
        <span className="shimmer home-section-skeleton__line home-section-skeleton__line--button" />
      </div>
    </section>
  );
}
