function hash(seed: number, i: number, salt: number) {
  const v = Math.sin(seed + i * salt) * 43758.5453;
  return v - Math.floor(v);
}

function scatter(count: number, seed: number) {
  const points: { x: number; y: number; delay: number }[] = [];
  for (let i = 0; i < count; i++) {
    points.push({
      x: 10 + hash(seed, i, 12.9898) * 80,
      y: 10 + hash(seed, i, 78.233) * 80,
      delay: hash(seed, i, 45.164) * 2,
    });
  }
  return points;
}

const SOLID_PARTICLES = scatter(24, 1.3);
const LIQUID_PARTICLES = scatter(16, 7.7);
const GAS_PARTICLES = scatter(8, 21.4);

const CONFIG = [
  { colorClass: "bg-accent", animClass: "notes-particle-solid", scatter: SOLID_PARTICLES },
  { colorClass: "bg-primary", animClass: "notes-particle-liquid", scatter: LIQUID_PARTICLES },
  { colorClass: "bg-emerald-400", animClass: "notes-particle-gas", scatter: GAS_PARTICLES },
];

export interface ParticleStateInfo {
  state: string;
  particleMovement: string;
}

export function ParticleAnimation({ stateProperties }: { stateProperties: ParticleStateInfo[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stateProperties.map((s, i) => {
        const cfg = CONFIG[i] ?? CONFIG[CONFIG.length - 1];
        return (
          <div key={s.state} className="rounded-2xl border border-border bg-secondary/40 p-4 text-center">
            <p className="font-display text-[13px] font-bold text-foreground">{s.state}</p>
            <div className="relative mx-auto my-3 h-[140px] w-full max-w-[180px] overflow-hidden rounded-xl border border-border bg-background/40">
              {cfg.scatter.map((p, j) => (
                <span
                  key={j}
                  className={`absolute h-[8px] w-[8px] rounded-full ${cfg.colorClass} ${cfg.animClass}`}
                  style={{ left: `${p.x}%`, top: `${p.y}%`, animationDelay: `${p.delay}s` }}
                />
              ))}
            </div>
            <p className="text-[11px] leading-snug text-muted-foreground">{s.particleMovement}</p>
          </div>
        );
      })}
    </div>
  );
}
