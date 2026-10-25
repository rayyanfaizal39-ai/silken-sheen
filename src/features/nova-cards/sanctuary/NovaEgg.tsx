const EGG = "M120 22c-50 0-88 80-88 150 0 60 38 102 88 102s88-42 88-102C208 102 170 22 120 22Z";

/** Fixed points so server and browser render the same galaxy. */
const EGG_STARS = [
  [92, 92, 1.4],
  [148, 80, 1.1],
  [168, 140, 1.5],
  [74, 160, 1.2],
  [130, 120, 0.9],
  [104, 210, 1.3],
  [158, 214, 1],
  [86, 236, 0.9],
  [140, 176, 1.2],
  [118, 64, 1],
] as const;

/**
 * The awakening egg: the existing Studio egg refined into a glowing, galaxy-filled shell.
 * It only glows and breathes; it never cracks or reveals the companion inside.
 */
function AwakeningEgg() {
  return (
    <div className="sanctuary-egg-scene sanctuary-egg-awakening" aria-hidden="true">
      <div className="awk-egg-halo" />
      <div className="awk-egg-pulse" />
      <svg className="awk-egg" viewBox="0 0 240 300">
        <defs>
          <radialGradient id="awk-shell" cx=".46" cy=".5" r=".62">
            <stop stopColor="#f1ddff" />
            <stop offset=".22" stopColor="#b48cff" />
            <stop offset=".55" stopColor="#6b3fd6" />
            <stop offset=".82" stopColor="#3a2a9c" />
            <stop offset="1" stopColor="#1d2a78" />
          </radialGradient>
          <radialGradient id="awk-core" cx=".5" cy=".55" r=".5">
            <stop stopColor="#fff4dc" stopOpacity=".95" />
            <stop offset=".35" stopColor="#ffd89a" stopOpacity=".55" />
            <stop offset="1" stopColor="#ffd89a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="awk-rim" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#ffe7b8" />
            <stop offset=".5" stopColor="#f6ca78" stopOpacity=".6" />
            <stop offset="1" stopColor="#c4b5fd" stopOpacity=".8" />
          </linearGradient>
          <linearGradient id="awk-sheen" x1="0" y1="0" x2="1" y2="0">
            <stop stopColor="#ffe7b8" stopOpacity="0" />
            <stop offset=".5" stopColor="#ffe7b8" stopOpacity=".55" />
            <stop offset="1" stopColor="#ffe7b8" stopOpacity="0" />
          </linearGradient>
          <clipPath id="awk-clip">
            <path d={EGG} />
          </clipPath>
          <filter id="awk-blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>
        <ellipse
          className="awk-orbit"
          cx="120"
          cy="168"
          rx="112"
          ry="34"
          transform="rotate(-14 120 168)"
        />
        <path d={EGG} fill="url(#awk-shell)" />
        <g clipPath="url(#awk-clip)">
          <g filter="url(#awk-blur)" opacity=".75">
            <path
              d="M40 190c40-50 120-30 160-80"
              fill="none"
              stroke="#ff9fe0"
              strokeWidth="18"
              strokeOpacity=".35"
            />
            <path
              d="M30 120c50 30 110 10 180 40"
              fill="none"
              stroke="#7dd3fc"
              strokeWidth="14"
              strokeOpacity=".28"
            />
            <path
              d="M60 250c30-40 90-40 140-20"
              fill="none"
              stroke="#c4b5fd"
              strokeWidth="16"
              strokeOpacity=".3"
            />
          </g>
          <circle className="awk-core" cx="120" cy="160" r="62" fill="url(#awk-core)" />
          <g fill="#fff6e4">
            {EGG_STARS.map(([x, y, r]) => (
              <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
            ))}
          </g>
          <rect
            className="awk-sheen"
            x="-80"
            y="0"
            width="70"
            height="300"
            fill="url(#awk-sheen)"
          />
        </g>
        <path d={EGG} fill="none" stroke="url(#awk-rim)" strokeWidth="2.2" />
        <path className="awk-orbit awk-orbit--front" d="M11 195A112 34 -14 0 0 229 141" />
      </svg>
      <div className="awk-dais" />
      <div className="awk-motes">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
}

export function NovaEgg({
  phase = "waiting",
}: {
  phase?: "gathering" | "waiting" | "ready" | "hatching" | "awakening";
}) {
  if (phase === "awakening") return <AwakeningEgg />;
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
