import { useMemo } from "react";
import { SCENE } from "./timeline";

/* Scene-anchored art shares one coordinate frame, so every layer lines up at any screen size. */
const VIEW_BOX = `0 ${SCENE.top} ${SCENE.width} ${SCENE.height}`;
const C = { x: SCENE.centreX, y: SCENE.centreY };
const MIRROR = `matrix(-1 0 0 1 ${SCENE.width} 0)`;

/** Trigonometry differs in the last digits between server and browser; rounding keeps hydration exact. */
const fixed = (v: number) => Math.round(v * 100) / 100;

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

function SceneSvg({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <svg
      className={`cg-art ${className}`}
      viewBox={VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      {children}
    </svg>
  );
}

/** Edge of the central path: a line through the vanishing point, so it stays true as the camera moves. */
const pathX = (x0: number, y: number) => C.x + ((x0 - C.x) * (y - C.y)) / (690 - C.y);

/* ── Far realm: ruined spires, floating islands and their falling light ─────────────────────── */

function Spire({ x, base, top, width }: { x: number; base: number; top: number; width: number }) {
  const h = width / 2;
  return (
    <g>
      <path
        d={`M${x - h} ${base} L${x - h} ${top + width * 1.4} L${x} ${top} L${x + h} ${top + width * 1.4} L${x + h} ${base} Z`}
        fill="url(#cg-far-stone)"
      />
      <path
        d={`M${x + h} ${base} L${x + h} ${top + width * 1.4} L${x} ${top}`}
        fill="none"
        stroke="rgba(150,120,255,0.18)"
        strokeWidth="1.2"
      />
      <rect
        x={x - 3}
        y={top + width * 2.2}
        width="6"
        height="11"
        rx="3"
        fill="#f6ca78"
        opacity="0.32"
      />
    </g>
  );
}

function FloatingIsland({
  x,
  y,
  size,
  seed,
}: {
  x: number;
  y: number;
  size: number;
  seed: number;
}) {
  const rand = seeded(seed);
  const w = size;
  const spires = [-0.3, -0.12, 0.05, 0.22, 0.34].map((o) => ({
    x: x + o * w,
    h: (0.35 + rand() * 0.55) * w,
    width: (0.06 + rand() * 0.05) * w,
  }));
  return (
    <g>
      <path
        d={`M${x - w * 0.5} ${y} Q${x - w * 0.2} ${y + w * 0.75} ${x + w * 0.02} ${y + w * 0.95} Q${x + w * 0.22} ${y + w * 0.6} ${x + w * 0.5} ${y} Z`}
        fill="url(#cg-far-stone)"
      />
      {spires.map((s, i) => (
        <Spire key={i} x={s.x} base={y + 4} top={y - s.h} width={s.width} />
      ))}
      <rect
        x={x - w * 0.08}
        y={y + w * 0.5}
        width={w * 0.025}
        height={w * 1.6}
        fill="url(#cg-waterfall)"
      />
      <rect
        x={x + w * 0.12}
        y={y + w * 0.4}
        width={w * 0.012}
        height={w * 1.1}
        fill="url(#cg-waterfall)"
        opacity="0.7"
      />
    </g>
  );
}

export function FarRealm() {
  const left = [
    { x: 120, top: 120, width: 70 },
    { x: 205, top: 40, width: 56 },
    { x: 300, top: 180, width: 80 },
    { x: 390, top: 250, width: 64 },
  ];
  return (
    <SceneSvg className="cg-art--far">
      <defs>
        <linearGradient id="cg-far-stone" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1a1638" />
          <stop offset="1" stopColor="#0a0a1c" />
        </linearGradient>
        <linearGradient id="cg-waterfall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a78bfa" stopOpacity="0.55" />
          <stop offset="1" stopColor="#6d28d9" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="cg-far-haze" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#4c1d95" stopOpacity="0.35" />
          <stop offset="1" stopColor="#4c1d95" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="800" cy="560" rx="900" ry="190" fill="url(#cg-far-haze)" />
      <FloatingIsland x={330} y={170} size={190} seed={7} />
      <FloatingIsland x={1300} y={230} size={170} seed={19} />
      {[0, 1].map((side) => (
        <g key={side} transform={side ? MIRROR : undefined}>
          {left.map((s, i) => (
            <Spire key={i} x={s.x} base={720} top={s.top + 200} width={s.width} />
          ))}
          <path
            d="M-200 720 L-200 520 Q80 470 260 560 Q380 610 470 600 L470 720 Z"
            fill="#0b0a1c"
          />
        </g>
      ))}
    </SceneSvg>
  );
}

/* ── The gateway ──────────────────────────────────────────────────────────────────────────── */

function Lantern({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="0" cy="-74" r="56" fill="url(#cg-lantern-halo)" />
      <rect x="-24" y="-30" width="48" height="58" fill="url(#cg-stone-step)" />
      <rect x="-30" y="-36" width="60" height="9" fill="#2e2846" />
      <rect x="-30" y="24" width="60" height="10" fill="#1a1630" />
      <path d="M0 -112 L16 -92 L16 -54 L0 -38 L-16 -54 L-16 -92 Z" fill="url(#cg-crystal)" />
      <path
        d="M0 -112 L16 -92 L16 -54 L0 -38 L-16 -54 L-16 -92 Z M0 -112 L0 -38"
        fill="none"
        stroke="#f6ca78"
        strokeOpacity="0.8"
        strokeWidth="1.4"
      />
    </g>
  );
}

function LanternDefs() {
  return (
    <>
      <radialGradient id="cg-lantern-halo" cx="0.5" cy="0.5" r="0.5">
        <stop offset="0" stopColor="#ffdea5" stopOpacity="0.5" />
        <stop offset="0.4" stopColor="#f6ca78" stopOpacity="0.16" />
        <stop offset="1" stopColor="#f6ca78" stopOpacity="0" />
      </radialGradient>
      <linearGradient id="cg-crystal" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff3d6" />
        <stop offset="0.5" stopColor="#f6ca78" />
        <stop offset="1" stopColor="#b98a3a" />
      </linearGradient>
      <linearGradient id="cg-stone-step" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#2a2440" />
        <stop offset="1" stopColor="#141226" />
      </linearGradient>
    </>
  );
}

function Pillar() {
  return (
    <g>
      <rect x="488" y="296" width="104" height="18" fill="#2c2644" />
      <rect x="498" y="314" width="84" height="370" fill="url(#cg-pillar)" />
      <rect x="486" y="680" width="108" height="26" fill="#1c182f" />
      <path d="M520 420 H560 V600 L540 618 L520 600 Z" fill="url(#cg-banner)" />
    </g>
  );
}

function Vine({ d, seed }: { d: string; seed: number }) {
  const rand = seeded(seed);
  const points = d.replace(/[A-Z]/g, " ").trim().split(/\s+/).map(Number);
  const anchors: [number, number][] = [];
  for (let i = 0; i + 1 < points.length; i += 2) anchors.push([points[i], points[i + 1]]);
  return (
    <g>
      <path d={d} fill="none" stroke="#120f22" strokeWidth="5" strokeLinecap="round" />
      {anchors.flatMap(([x, y], i) =>
        Array.from({ length: 4 }, (_, j) => (
          <circle
            key={`${i}-${j}`}
            cx={x + (rand() - 0.5) * 22}
            cy={y + (rand() - 0.5) * 22}
            r={2 + rand() * 4}
            fill={rand() > 0.5 ? "#7c3aed" : "#a78bfa"}
            opacity={0.35 + rand() * 0.4}
          />
        )),
      )}
    </g>
  );
}

/** The unlit stone: towers, arch, ring, pillars, steps and the far floor. */
export function GatewayStone() {
  const voussoirs = Array.from({ length: 40 }, (_, i) => (i * 360) / 40);
  const floorRows = [730, 790, 870, 980, 1130, 1330];
  return (
    <SceneSvg className="cg-art--gate">
      <defs>
        <LanternDefs />
        <linearGradient id="cg-tower" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1b1734" />
          <stop offset="1" stopColor="#0b0a19" />
        </linearGradient>
        <linearGradient id="cg-pillar" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#0e0c1f" />
          <stop offset="0.6" stopColor="#272142" />
          <stop offset="1" stopColor="#110f24" />
        </linearGradient>
        <radialGradient id="cg-ring" cx={C.x} cy={C.y} r="262" gradientUnits="userSpaceOnUse">
          <stop offset="0.76" stopColor="#3d3354" />
          <stop offset="0.86" stopColor="#252039" />
          <stop offset="1" stopColor="#131027" />
        </radialGradient>
        <linearGradient id="cg-banner" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b157c" />
          <stop offset="1" stopColor="#170932" />
        </linearGradient>
        <linearGradient
          id="cg-floor"
          x1="0"
          y1="690"
          x2="0"
          y2="1400"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#0f1028" />
          <stop offset="1" stopColor="#06070f" />
        </linearGradient>
        <linearGradient
          id="cg-path"
          x1="0"
          y1="690"
          x2="0"
          y2="1400"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#1b1838" />
          <stop offset="1" stopColor="#0b0b1a" />
        </linearGradient>
      </defs>

      {[0, 1].map((side) => (
        <g key={side} transform={side ? MIRROR : undefined}>
          <path
            d="M430 706 L430 40 L450 0 L462 -70 L480 -26 L500 -128 L520 -40 L546 -86 L560 -14 L615 18 L615 706 Z"
            fill="url(#cg-tower)"
          />
          <path
            d="M500 -128 L520 -40 L546 -86 L560 -14 L615 18 L615 706"
            fill="none"
            stroke="rgba(150,120,255,0.16)"
            strokeWidth="1.5"
          />
          {[60, 150, 240].map((y) => (
            <rect
              key={y}
              x="470"
              y={y}
              width="14"
              height="30"
              rx="7"
              fill="#f6ca78"
              opacity="0.2"
            />
          ))}
        </g>
      ))}

      <path
        d="M548 706 L548 330 Q548 120 800 36 Q1052 120 1052 330 L1052 706 L1012 706 L1012 335 Q1012 162 800 84 Q588 162 588 335 L588 706 Z"
        fill="url(#cg-tower)"
        stroke="rgba(150,120,255,0.14)"
        strokeWidth="1.5"
      />

      <rect x="-400" y="690" width="2400" height="1400" fill="url(#cg-floor)" />
      <path
        d={`M640 690 L960 690 L${pathX(960, 2100)} 2100 L${pathX(640, 2100)} 2100 Z`}
        fill="url(#cg-path)"
      />
      {floorRows.map((y) => (
        <line
          key={y}
          x1={pathX(640, y)}
          x2={pathX(960, y)}
          y1={y}
          y2={y}
          stroke="rgba(140,110,230,0.13)"
          strokeWidth="1.2"
        />
      ))}
      {[700, 750, 850, 900].map((x) => (
        <line
          key={x}
          x1={x}
          y1="690"
          x2={pathX(x, 1400)}
          y2="1400"
          stroke="rgba(140,110,230,0.1)"
          strokeWidth="1.2"
        />
      ))}

      <circle cx={C.x} cy={C.y} r="227.5" fill="none" stroke="url(#cg-ring)" strokeWidth="45" />
      {voussoirs.map((a) => (
        <line
          key={a}
          x1={C.x}
          y1={C.y - 206}
          x2={C.x}
          y2={C.y - 250}
          stroke="rgba(5,7,15,0.55)"
          strokeWidth="1.6"
          transform={`rotate(${a} ${C.x} ${C.y})`}
        />
      ))}
      <circle cx={C.x} cy={C.y} r="252" fill="none" stroke="#2d2744" strokeWidth="4" />

      <circle cx={C.x} cy="150" r="52" fill="#1e1a34" stroke="#30294a" strokeWidth="3" />
      <circle cx="552" cy={C.y} r="29" fill="#1e1a34" stroke="#30294a" strokeWidth="3" />
      <circle cx="1048" cy={C.y} r="29" fill="#1e1a34" stroke="#30294a" strokeWidth="3" />

      <Pillar />
      <g transform={MIRROR}>
        <Pillar />
      </g>

      <rect x="612" y="650" width="376" height="18" fill="url(#cg-stone-step)" />
      <rect x="592" y="668" width="416" height="18" fill="url(#cg-stone-step)" />
      <rect x="572" y="686" width="456" height="18" fill="url(#cg-stone-step)" />

      <Vine d="M612 210 Q600 260 618 320 Q606 380 622 430" seed={3} />
      <Vine d="M690 120 Q672 170 684 230" seed={11} />
      <g transform={MIRROR}>
        <Vine d="M612 210 Q598 270 616 340 Q604 390 618 460" seed={5} />
        <Vine d="M700 110 Q684 150 692 200" seed={13} />
      </g>

      <Lantern x={560} y={736} scale={0.55} />
      <Lantern x={1040} y={736} scale={0.55} />
    </SceneSvg>
  );
}

/** Everything the awakening lights: gold rims, the star crest, crescents, rails and reflections. */
export function GatewayLight() {
  const star = "M800 66 L813 137 L878 150 L813 163 L800 244 L787 163 L722 150 L787 137 Z";
  const crescent = (x: number, flip: boolean) =>
    `M${x} 382 A18 18 0 1 ${flip ? 1 : 0} ${x} 418 A13 13 0 1 ${flip ? 0 : 1} ${x} 382 Z`;
  return (
    <SceneSvg className="cg-art--light">
      <defs>
        <linearGradient id="cg-gold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3d6" />
          <stop offset="0.5" stopColor="#f6ca78" />
          <stop offset="1" stopColor="#c99a4a" />
        </linearGradient>
        <radialGradient id="cg-crest" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f3e8ff" />
          <stop offset="0.35" stopColor="#a78bfa" stopOpacity="0.9" />
          <stop offset="1" stopColor="#6001d1" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cg-reflect" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffdea5" stopOpacity="0.3" />
          <stop offset="0.35" stopColor="#a78bfa" stopOpacity="0.12" />
          <stop offset="1" stopColor="#6001d1" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path
        d={`M720 704 L880 704 L${pathX(880, 1150)} 1150 L${pathX(720, 1150)} 1150 Z`}
        fill="url(#cg-reflect)"
      />
      {[640, 960].map((x) => (
        <line
          key={x}
          x1={x}
          y1="690"
          x2={pathX(x, 1500)}
          y2="1500"
          stroke="rgba(246,202,120,0.55)"
          strokeWidth="2"
        />
      ))}
      {[672, 928].map((x) => (
        <line
          key={x}
          x1={x}
          y1="690"
          x2={pathX(x, 1500)}
          y2="1500"
          stroke="rgba(246,202,120,0.24)"
          strokeWidth="1.2"
        />
      ))}
      {[650, 668, 686].map((y, i) => (
        <line
          key={y}
          x1={612 - i * 20}
          x2={988 + i * 20}
          y1={y}
          y2={y}
          stroke="rgba(255,222,165,0.6)"
          strokeWidth="1.4"
        />
      ))}

      <path
        d="M588 706 L588 335 Q588 162 800 84 Q1012 162 1012 335 L1012 706"
        fill="none"
        stroke="rgba(167,139,250,0.35)"
        strokeWidth="1.6"
      />
      <circle
        cx={C.x}
        cy={C.y}
        r="205"
        fill="none"
        stroke="rgba(246,202,120,0.22)"
        strokeWidth="16"
      />
      <circle cx={C.x} cy={C.y} r="205" fill="none" stroke="url(#cg-gold)" strokeWidth="2.6" />
      <circle
        cx={C.x}
        cy={C.y}
        r="250"
        fill="none"
        stroke="rgba(246,202,120,0.55)"
        strokeWidth="1.5"
      />
      <circle
        cx={C.x}
        cy={C.y}
        r="264"
        fill="none"
        stroke="rgba(246,202,120,0.22)"
        strokeWidth="1"
      />

      <circle cx={C.x} cy="150" r="64" fill="url(#cg-crest)" opacity="0.55" />
      <circle cx={C.x} cy="150" r="42" fill="none" stroke="url(#cg-gold)" strokeWidth="2.2" />
      <path d={star} fill="url(#cg-gold)" />
      <circle cx={C.x} cy="150" r="9" fill="#f3e8ff" />

      <path d={crescent(552, false)} fill="url(#cg-gold)" />
      <path d={crescent(1048, true)} fill="url(#cg-gold)" />

      {[0, 1].map((side) => (
        <g key={side} transform={side ? MIRROR : undefined}>
          <path
            d="M520 420 H560 V600 L540 618 L520 600 Z"
            fill="none"
            stroke="rgba(246,202,120,0.7)"
            strokeWidth="1.3"
          />
          {[470, 530].map((y) => (
            <path
              key={y}
              d={`M540 ${y - 10} L548 ${y} L540 ${y + 10} L532 ${y} Z`}
              fill="#f6ca78"
              opacity="0.85"
            />
          ))}
          <rect x="488" y="296" width="104" height="2" fill="rgba(246,202,120,0.5)" />
        </g>
      ))}
    </SceneSvg>
  );
}

const RUNE_COUNT = 32;
const RUNE_RADIUS = 228;

function Rune({ kind }: { kind: number }) {
  const y = C.y - RUNE_RADIUS;
  switch (kind % 4) {
    case 0:
      return <path d={`M${C.x} ${y - 8} L${C.x + 5} ${y} L${C.x} ${y + 8} L${C.x - 5} ${y} Z`} />;
    case 1:
      return <circle cx={C.x} cy={y} r="2.8" />;
    case 2:
      return (
        <g>
          <circle cx={C.x} cy={y - 3} r="2.4" />
          <circle cx={C.x} cy={y + 4} r="1.5" opacity="0.65" />
        </g>
      );
    default:
      return (
        <path
          d={`M${C.x - 5} ${y + 5} L${C.x} ${y - 6} L${C.x + 5} ${y + 5}`}
          fill="none"
          strokeWidth="1.6"
        />
      );
  }
}

/** Gold markings carved into the ring; CSS ignites them one after another, clockwise from the crest. */
export function GatewayRunes() {
  const circumference = Math.round(2 * Math.PI * RUNE_RADIUS);
  return (
    <SceneSvg className="cg-art--runes">
      <circle
        className="cg-rune-trace"
        cx={C.x}
        cy={C.y}
        r={RUNE_RADIUS}
        fill="none"
        stroke="rgba(255,222,165,0.55)"
        strokeWidth="1"
        strokeDasharray={circumference}
        strokeDashoffset={circumference}
        transform={`rotate(-90 ${C.x} ${C.y})`}
        style={{ "--cg-trace": circumference } as React.CSSProperties}
      />
      {Array.from({ length: RUNE_COUNT }, (_, i) => (
        <g
          key={i}
          className="cg-rune"
          fill="#ffdea5"
          stroke="#ffdea5"
          transform={`rotate(${(i * 360) / RUNE_COUNT} ${C.x} ${C.y})`}
          style={{ "--cg-rune-index": i } as React.CSSProperties}
        >
          <Rune kind={i} />
        </g>
      ))}
    </SceneSvg>
  );
}

/* ── Near the camera: the magic circle, curbs and lanterns along the approach ────────────────── */

export function NearFloor() {
  const starPoints = Array.from({ length: 16 }, (_, i) => {
    const a = (i * Math.PI) / 8 - Math.PI / 2;
    const r = i % 2 === 0 ? 1 : 0.32;
    return `${fixed(800 + Math.cos(a) * 190 * r)},${fixed(1150 + Math.sin(a) * 42 * r)}`;
  }).join(" ");
  return (
    <SceneSvg className="cg-art--floor">
      <g fill="none" stroke="rgba(246,202,120,0.42)" strokeWidth="1.6">
        <ellipse cx="800" cy="1150" rx="300" ry="64" />
        <ellipse cx="800" cy="1150" rx="236" ry="50" strokeOpacity="0.6" />
        <polygon points={starPoints} strokeOpacity="0.8" />
      </g>
      <circle cx="800" cy="1150" r="6" fill="#ffdea5" />
      {[0, 1].map((side) => (
        <g key={side} transform={side ? MIRROR : undefined}>
          <path d="M572 760 Q470 900 180 1460" fill="none" stroke="#17142b" strokeWidth="30" />
          <path
            d="M560 752 Q458 894 166 1450"
            fill="none"
            stroke="rgba(246,202,120,0.4)"
            strokeWidth="1.6"
          />
        </g>
      ))}
    </SceneSvg>
  );
}

export function NearLanterns() {
  return (
    <SceneSvg className="cg-art--lanterns">
      {/* Lantern gradients are defined once, in GatewayStone. */}
      <defs>
        <linearGradient id="cg-shard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ede9fe" />
          <stop offset="1" stopColor="#7c3aed" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <Lantern x={330} y={930} scale={1.15} />
      <Lantern x={1270} y={930} scale={1.15} />
      <path d="M592 1040 L604 1008 L616 1040 L604 1052 Z" fill="url(#cg-shard)" />
      <path d="M1000 1090 L1014 1052 L1028 1090 L1014 1104 Z" fill="url(#cg-shard)" />
    </SceneSvg>
  );
}

/* ── Framing trees, anchored to the screen edges rather than the scene ──────────────────────── */

const BLOSSOMS = ["#6d28d9", "#7c3aed", "#8b5cf6", "#a78bfa", "#c4b5fd"];

function useCanopy(seed: number) {
  return useMemo(() => {
    const rand = seeded(seed);
    const branch = (t: number) => ({
      x: 40 + t * 380,
      y: fixed(110 - t * 90 + Math.sin(t * 6) * 12),
    });
    const blossoms = Array.from({ length: 340 }, () => {
      const p = branch(rand());
      const spread = rand() * rand();
      return {
        x: p.x + (rand() - 0.5) * 150 * (0.4 + spread),
        y: p.y + (rand() - 0.3) * 120 * (0.4 + spread),
        r: 1.4 + rand() * 4.6,
        fill: BLOSSOMS[Math.floor(rand() * BLOSSOMS.length)],
        opacity: 0.2 + rand() * 0.55,
      };
    });
    const glows = Array.from({ length: 9 }, () => {
      const p = branch(0.1 + rand() * 0.9);
      return { x: p.x, y: p.y + 10, r: 34 + rand() * 30 };
    });
    const strands = Array.from({ length: 22 }, () => {
      const p = branch(0.2 + rand() * 0.8);
      const length = 8 + Math.floor(rand() * 11);
      return { x: p.x + (rand() - 0.5) * 30, y: p.y + 18, length };
    });
    const shadows = Array.from({ length: 12 }, () => {
      const p = branch(rand());
      return { x: p.x, y: p.y, rx: 40 + rand() * 50, ry: 24 + rand() * 30 };
    });
    return { blossoms, glows, strands, shadows };
  }, [seed]);
}

export function Tree({ side }: { side: "left" | "right" }) {
  const { blossoms, glows, strands, shadows } = useCanopy(side === "left" ? 41 : 87);
  const svgProps = {
    viewBox: "0 0 420 1000",
    preserveAspectRatio: "xMinYMin slice",
    "aria-hidden": true as const,
    focusable: "false" as const,
  };
  return (
    <div className={`cg-tree cg-tree--${side}`}>
      <svg className="cg-tree__trunk" {...svgProps}>
        <defs>
          <linearGradient id={`cg-bark-${side}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#05040b" />
            <stop offset="1" stopColor="#171230" />
          </linearGradient>
        </defs>
        <path
          d="M0 1000 L0 0 L64 0 C92 120 72 220 112 320 C142 400 122 520 152 640 C172 740 206 860 268 1000 Z"
          fill={`url(#cg-bark-${side})`}
        />
        <path
          d="M70 118 C150 88 250 58 420 18 L420 50 C282 90 182 142 100 204 Z"
          fill={`url(#cg-bark-${side})`}
        />
        <path
          d="M112 330 C190 300 262 300 332 252 L338 264 C272 322 200 344 120 372 Z"
          fill={`url(#cg-bark-${side})`}
        />
        <path d="M150 900 C200 920 262 960 330 1000 L200 1000 Z" fill="#07060f" />
        <g fill="none" stroke="#04030a" strokeWidth="2" opacity="0.7">
          <path d="M30 60 C50 200 40 360 80 520 C100 640 110 780 150 960" />
          <path d="M52 240 C70 330 72 420 100 520" />
          <path d="M14 420 C26 560 40 700 70 880" />
        </g>
      </svg>
      <svg className="cg-tree__rim" {...svgProps}>
        <path
          d="M64 0 C92 120 72 220 112 320 C142 400 122 520 152 640 C172 740 206 860 268 1000"
          fill="none"
          stroke="rgba(196,181,253,0.45)"
          strokeWidth="2.2"
        />
        <path
          d="M100 204 C182 142 282 90 420 50"
          fill="none"
          stroke="rgba(246,202,120,0.3)"
          strokeWidth="1.6"
        />
      </svg>
      <svg className="cg-tree__canopy" {...svgProps}>
        <defs>
          <radialGradient id={`cg-bloom-${side}`} cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#8b5cf6" stopOpacity="0.35" />
            <stop offset="1" stopColor="#6d28d9" stopOpacity="0" />
          </radialGradient>
        </defs>
        {shadows.map((s, i) => (
          <ellipse key={i} cx={s.x} cy={s.y} rx={s.rx} ry={s.ry} fill="#0b0818" opacity="0.85" />
        ))}
        {glows.map((g, i) => (
          <circle key={i} cx={g.x} cy={g.y} r={g.r} fill={`url(#cg-bloom-${side})`} />
        ))}
        {blossoms.map((b, i) => (
          <circle key={i} cx={b.x} cy={b.y} r={b.r} fill={b.fill} opacity={b.opacity} />
        ))}
        {strands.map((s, i) => (
          <g key={i}>
            {Array.from({ length: s.length }, (_, j) => (
              <ellipse
                key={j}
                cx={fixed(s.x + Math.sin(j * 0.7) * 3)}
                cy={s.y + j * 10}
                rx={fixed(3.4 - j * 0.12)}
                ry={fixed(4.6 - j * 0.15)}
                fill={j % 3 ? "#8b5cf6" : "#c4b5fd"}
                opacity={fixed(0.7 - j * 0.03)}
              />
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
}
