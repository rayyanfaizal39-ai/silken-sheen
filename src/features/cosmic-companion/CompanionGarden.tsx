import { useMemo } from "react";
import "./companion-garden.css";

function seeded(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (v: number) => Math.round(v * 10) / 10;

function Island({ x, y, scale, glow }: { x: number; y: number; scale: number; glow: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} opacity={glow}>
      <ellipse cx="0" cy="-20" rx="150" ry="70" fill="url(#cg2-island-glow)" />
      <path d="M-120 0h240q-40 70-110 120Q-90 70-120 0Z" fill="url(#cg2-rock)" />
      <g fill="url(#cg2-tower)">
        <path d="M-70 0v-60l12-30 12 30V0Z" />
        <path d="M-30 0v-110l16-46 16 46V0Z" />
        <path d="M14 0v-80l13-36 13 36V0Z" />
        <path d="M52 0v-50l10-26 10 26V0Z" />
        <path d="M-100 0v-30h160V0Z" />
      </g>
      <g fill="#ffd79a">
        <rect x="-17" y="-96" width="6" height="12" rx="3" />
        <rect x="-17" y="-60" width="6" height="12" rx="3" />
        <rect x="24" y="-56" width="5" height="10" rx="2.5" />
        <rect x="-62" y="-36" width="5" height="10" rx="2.5" />
        <rect x="58" y="-30" width="4" height="8" rx="2" />
      </g>
      <path d="M-10 108v60M14 96v40" stroke="#a78bfa" strokeOpacity=".35" strokeWidth="3" />
    </g>
  );
}

function Lantern({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="-70" r="60" fill="url(#cg2-lantern-halo)" />
      <rect x="-3" y="-40" width="6" height="120" fill="#17132e" />
      <path d="M-14 -88h28l-4 36h-20Z" fill="#ffcf85" />
      <path d="M-18 -92h36l-18-16Z" fill="#221b3e" />
      <rect x="-16" y="-54" width="32" height="5" fill="#221b3e" />
    </g>
  );
}

function Arch({ x, width, top, base }: { x: number; width: number; top: number; base: number }) {
  const r = width / 2;
  return (
    <path
      d={`M${x} ${base}V${top + r}A${r} ${r} 0 0 1 ${x + width} ${top + r}V${base}`}
      fill="none"
      stroke="url(#cg2-stone)"
      strokeWidth={width * 0.12}
    />
  );
}

/**
 * The garden around the card: distant academy islands, colonnades, lanterns, wisteria and
 * glowing flowers. Purely decorative, drawn from lightweight SVG rather than a background image.
 */
export function CompanionGarden() {
  const { wisteria, flowers } = useMemo(() => {
    const rand = seeded(23);
    const wisteria = Array.from({ length: 26 }, (_, i) => {
      const left = i < 13;
      const x = left ? 20 + rand() * 300 : 1330 + rand() * 260;
      return { x: round(x), y: round(rand() * 40), length: 6 + Math.floor(rand() * 12) };
    });
    const flowers = Array.from({ length: 22 }, (_, i) => {
      const left = i < 11;
      return {
        x: round(left ? rand() * 260 : 1360 + rand() * 240),
        y: round(640 + rand() * 240),
        r: round(5 + rand() * 9),
      };
    });
    return { wisteria, flowers };
  }, []);

  return (
    <div className="ccp-garden" aria-hidden="true">
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="cg2-sky" cx=".72" cy=".38" r=".62">
            <stop stopColor="#7a5fd6" stopOpacity=".75" />
            <stop offset=".3" stopColor="#4a3a9a" stopOpacity=".6" />
            <stop offset=".65" stopColor="#1f1b52" stopOpacity=".5" />
            <stop offset="1" stopColor="#070a18" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cg2-dawn" cx=".85" cy=".6" r=".35">
            <stop stopColor="#ffcf85" stopOpacity=".28" />
            <stop offset="1" stopColor="#ffcf85" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cg2-arch-light" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#8f74f0" stopOpacity=".35" />
            <stop offset="1" stopColor="#3b2a8a" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="cg2-island-glow" cx=".5" cy=".5" r=".5">
            <stop stopColor="#c4a5ff" stopOpacity=".35" />
            <stop offset="1" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cg2-rock" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#3a2f6e" />
            <stop offset="1" stopColor="#120f2a" stopOpacity=".2" />
          </linearGradient>
          <linearGradient id="cg2-tower" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#4a3c86" />
            <stop offset="1" stopColor="#231c4a" />
          </linearGradient>
          <linearGradient id="cg2-stone" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#2b2452" />
            <stop offset="1" stopColor="#120f28" />
          </linearGradient>
          <radialGradient id="cg2-lantern-halo" cx=".5" cy=".5" r=".5">
            <stop stopColor="#ffdea5" stopOpacity=".5" />
            <stop offset=".4" stopColor="#f6ca78" stopOpacity=".15" />
            <stop offset="1" stopColor="#f6ca78" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cg2-flower" cx=".5" cy=".5" r=".5">
            <stop stopColor="#e9d5ff" />
            <stop offset=".45" stopColor="#a78bfa" stopOpacity=".85" />
            <stop offset="1" stopColor="#6d28d9" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cg2-floor" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#2a2260" stopOpacity="0" />
            <stop offset=".3" stopColor="#2a2260" stopOpacity=".55" />
            <stop offset="1" stopColor="#05070f" stopOpacity="0" />
          </linearGradient>
        </defs>

        <rect width="1600" height="900" fill="url(#cg2-sky)" />
        <rect width="1600" height="900" fill="url(#cg2-dawn)" />
        <g fill="url(#cg2-arch-light)">
          <path d="M852 700V231a63 63 0 0 1 126 0v469Z" />
          <path d="M1012 700V231a63 63 0 0 1 126 0v469Z" />
          <path d="M1170 700V262a55 55 0 0 1 110 0v438Z" />
        </g>
        <Island x={1330} y={300} scale={1} glow={0.95} />
        <Island x={760} y={210} scale={0.45} glow={0.5} />
        <Island x={520} y={300} scale={0.32} glow={0.35} />

        <g opacity=".75">
          <Arch x={840} width={150} top={150} base={700} />
          <Arch x={1000} width={150} top={150} base={700} />
          <Arch x={1160} width={130} top={190} base={700} />
        </g>
        <rect x="0" y="600" width="1600" height="300" fill="url(#cg2-floor)" />

        <Arch x={-80} width={380} top={-120} base={900} />
        <Arch x={1380} width={380} top={-120} base={900} />

        <g fill="#8b5cf6">
          {wisteria.map((w) =>
            Array.from({ length: w.length }, (_, j) => (
              <ellipse
                key={`${w.x}-${j}`}
                cx={w.x + (j % 2 ? 2 : -2)}
                cy={w.y + j * 13}
                rx={round(5 - j * 0.2)}
                ry={round(7 - j * 0.25)}
                opacity={round(0.75 - j * 0.04)}
                fill={j % 3 ? "#8b5cf6" : "#c4b5fd"}
              />
            )),
          )}
        </g>

        <Lantern x={1250} y={640} scale={0.8} />
        <Lantern x={1500} y={680} scale={1.1} />
        <Lantern x={70} y={760} scale={0.9} />

        {flowers.map((f) => (
          <g key={`${f.x}-${f.y}`}>
            <circle cx={f.x} cy={f.y} r={f.r * 2.6} fill="url(#cg2-flower)" opacity=".5" />
            <circle cx={f.x} cy={f.y} r={f.r} fill="url(#cg2-flower)" />
            <circle cx={f.x} cy={f.y} r={round(f.r * 0.22)} fill="#ffdea5" />
          </g>
        ))}
      </svg>
      <div className="ccp-garden__motes">
        {Array.from({ length: 14 }, (_, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties} />
        ))}
      </div>
    </div>
  );
}
