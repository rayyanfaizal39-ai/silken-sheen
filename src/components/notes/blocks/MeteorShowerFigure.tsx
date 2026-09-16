import type { MeteorShowerBlock } from "@/content/form2/science/interactive-types";

/**
 * A meteor shower: many meteors in Earth's atmosphere at about the same time.
 *
 * Drawn, not photographed, and deliberately kept OFF the meteoroid → meteor →
 * meteorite journey. The old build taught "meteor shower" as the third stage of
 * one meteoroid's trip, which it is not; here there is no meteoroid, no ground
 * impact and no arrow into the journey — just the sky, the atmosphere, and many
 * streaks fanning from one direction.
 *
 * Streak geometry is fixed, so the picture is identical on every render.
 */

const W = 320;
const H = 170;
/** The point in the sky the streaks appear to come from, above the frame. */
const RADIANT = { x: 262, y: -40 };

export const SHOWER_STREAKS = Array.from({ length: 14 }, (_, i) => {
  const deg = 104 + i * 3.5;
  const a = (deg * Math.PI) / 180;
  const dir = { x: Math.cos(a), y: Math.sin(a) };
  const startY = 48 + ((i * 37) % 31);
  const d = (startY - RADIANT.y) / dir.y;
  const length = 22 + ((i * 23) % 19);
  const start = { x: RADIANT.x + dir.x * d, y: startY };
  return { start, end: { x: start.x + dir.x * length, y: start.y + dir.y * length } };
});

const STARS = Array.from({ length: 24 }, (_, i) => ({
  x: (i * 71 + 13) % W,
  y: 6 + ((i * 29) % 38),
  r: i % 5 === 0 ? 1.1 : 0.7,
}));

export function MeteorShowerFigure({ block }: { block: MeteorShowerBlock }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="mx-auto block h-auto w-full max-w-[560px] rounded-xl"
      role="img"
      aria-label={block.figureLabel}
      data-ch13-figure="meteor-shower"
    >
      <defs>
        <linearGradient id="c13-shower-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#020617" />
          <stop offset="100%" stopColor="#1e3a8a" />
        </linearGradient>
        {SHOWER_STREAKS.map((streak, i) => (
          <linearGradient
            key={i}
            id={`c13-shower-${i}`}
            x1={streak.start.x}
            y1={streak.start.y}
            x2={streak.end.x}
            y2={streak.end.y}
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="#fde68a" stopOpacity="0" />
            <stop offset="100%" stopColor="#fef3c7" stopOpacity="1" />
          </linearGradient>
        ))}
      </defs>

      <rect x="0" y="0" width={W} height={H} rx="12" fill="url(#c13-shower-sky)" />
      {STARS.map((star, i) => (
        <circle key={i} cx={star.x} cy={star.y} r={star.r} fill="#e2e8f0" opacity="0.8" />
      ))}

      {/* Earth's atmosphere, then the surface */}
      <path d="M0 70 Q160 30 320 70 L320 140 Q160 110 0 140 Z" fill="#38bdf8" opacity="0.2" />
      <path
        d="M0 70 Q160 30 320 70"
        fill="none"
        stroke="#7dd3fc"
        strokeWidth="1"
        strokeDasharray="4 3"
        opacity="0.7"
      />
      <path d="M0 140 Q160 110 320 140 L320 170 L0 170 Z" fill="#166534" />

      {/* many meteors at about the same time */}
      {SHOWER_STREAKS.map((streak, i) => (
        <g key={i}>
          <line
            x1={streak.start.x}
            y1={streak.start.y}
            x2={streak.end.x}
            y2={streak.end.y}
            stroke={`url(#c13-shower-${i})`}
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx={streak.end.x} cy={streak.end.y} r="1.7" fill="#fffbeb" />
        </g>
      ))}

      <text x="10" y="100" fill="#e0f2fe" fontSize="10.5" fontWeight="700">
        {block.atmosphereLabel}
      </text>
      <text x="10" y="162" fill="#dcfce7" fontSize="10.5" fontWeight="700">
        {block.surfaceLabel}
      </text>
    </svg>
  );
}
