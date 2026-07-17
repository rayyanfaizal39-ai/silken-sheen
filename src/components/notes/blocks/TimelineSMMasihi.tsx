import { bgPanel, neon } from "./neon-tokens";

export interface TimeUnit {
  unit: string;
  duration: string;
}

export function TimelineSMMasihi({ timeUnits }: { timeUnits: TimeUnit[] }) {
  const ticks = [
    { x: 450, label: timeUnits[0]?.unit, sub: timeUnits[0]?.duration },
    { x: 600, label: timeUnits[1]?.unit, sub: timeUnits[1]?.duration },
    { x: 780, label: timeUnits[2]?.unit, sub: timeUnits[2]?.duration },
  ];

  return (
    <div className="rounded-2xl border border-border p-3" style={{ background: bgPanel }}>
      <svg width="100%" height="200" viewBox="0 0 900 200" preserveAspectRatio="xMidYMid meet">
        <rect x="60" y="90" width="330" height="20" fill={neon.red} opacity="0.28" stroke={neon.red} strokeOpacity="0.5" rx="4" />
        <rect x="390" y="90" width="450" height="20" fill={neon.green} opacity="0.28" stroke={neon.green} strokeOpacity="0.5" rx="4" />

        <line
          x1="60"
          y1="100"
          x2="840"
          y2="100"
          stroke={neon.blue}
          strokeWidth="3"
          style={{ filter: `drop-shadow(0 0 6px ${neon.blue}80)` }}
        />
        <polygon points="840,100 828,93 828,107" fill={neon.blue} />

        <circle cx="390" cy="100" r="8" fill={neon.amber} style={{ filter: `drop-shadow(0 0 10px ${neon.amber}99)` }} />
        <text x="390" y="70" textAnchor="middle" fontSize="12" fill={neon.amber} fontWeight="700">
          0 (Kelahiran Nabi Isa AS)
        </text>

        <text x="200" y="140" textAnchor="middle" fontSize="14" fill={neon.red} fontWeight="700" fontFamily="'Space Grotesk',sans-serif">
          Sebelum Masihi (SM)
        </text>
        <text x="620" y="140" textAnchor="middle" fontSize="14" fill={neon.green} fontWeight="700" fontFamily="'Space Grotesk',sans-serif">
          Masihi (M)
        </text>

        {ticks.map((t) => (
          <g key={t.x}>
            <line x1={t.x} y1="95" x2={t.x} y2="105" stroke="#93a0c2" strokeWidth="2" />
            <text x={t.x} y="180" textAnchor="middle" fontSize="10" fill="#93a0c2">
              {t.label}
            </text>
            <text x={t.x} y="192" textAnchor="middle" fontSize="9" fill="#6b7593">
              {t.sub}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
