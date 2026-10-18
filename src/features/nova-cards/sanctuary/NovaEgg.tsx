export function NovaEgg({
  phase = "waiting",
}: {
  phase?: "gathering" | "waiting" | "ready" | "hatching";
}) {
  return (
    <div className={`sanctuary-egg-scene sanctuary-egg-${phase}`} aria-hidden="true">
      <div className="sanctuary-altar-ring" />
      <div className="sanctuary-egg">
        <div className="sanctuary-egg-core" />
        <svg className="sanctuary-egg-filigree" viewBox="0 0 200 280" fill="none">
          <path
            d="M100 20 Q160 100 100 260"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M100 20 Q40 100 100 260"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <circle cx="100" cy="140" r="30" stroke="currentColor" strokeWidth="1.5" />
        </svg>
        <span>{phase === "waiting" ? "⌛" : "✦"}</span>
      </div>
      <div className="sanctuary-egg-halo" />
    </div>
  );
}
