import { useRef, useState, type PointerEvent, type ReactNode, type TransitionEvent } from "react";
import "./unrevealed-cosmic-card.css";

const MAX_TILT_DEG = 7;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/**
 * A single plump, rounded presence rising from the mist. It deliberately has no head, limbs,
 * ears, wings, tail, horns or face, so it reads as neither a person, an animal nor a ghost:
 * the real companion stays hidden until the 12-question journey ends.
 */
const SILHOUETTE =
  "M90 118c-30 2-50 30-49 60 0 13 4 25 9 34h104c6-11 8-25 5-38-4-20-15-31-28-37-10-13-24-20-41-19Z";

/** Small lights drifting around the presence: [x, y, radius, delay in seconds]. */
const ORBS = [
  [50, 124, 3, 0],
  [152, 112, 2.4, 1.6],
  [166, 158, 2, 3.1],
] as const;

const MOTES = [
  [36, 62, 1.2, 0],
  [162, 48, 1.5, 1.2],
  [30, 150, 1, 2.1],
  [178, 128, 1.2, 0.6],
  [74, 34, 0.9, 1.7],
  [130, 28, 1.1, 2.6],
] as const;

function CardFront() {
  return (
    <div className="ucc-face ucc-face--front">
      <svg className="ucc-art" viewBox="0 0 200 280" aria-hidden="true">
        <defs>
          <radialGradient id="ucc-aura" cx=".5" cy=".45" r=".5">
            <stop stopColor="#c4b5fd" stopOpacity=".55" />
            <stop offset=".45" stopColor="#7c3aed" stopOpacity=".32" />
            <stop offset="1" stopColor="#4c1d95" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ucc-shadow" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#2a1f5a" />
            <stop offset=".55" stopColor="#171236" />
            <stop offset="1" stopColor="#0d0b24" />
          </linearGradient>
          <radialGradient id="ucc-mist" cx=".5" cy=".5" r=".5">
            <stop stopColor="#a78bfa" stopOpacity=".7" />
            <stop offset="1" stopColor="#6d28d9" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ucc-fog" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#2a1d5e" stopOpacity="0" />
            <stop offset=".35" stopColor="#261a54" stopOpacity=".95" />
            <stop offset="1" stopColor="#0f0e2a" stopOpacity=".85" />
          </linearGradient>
          <filter id="ucc-soft" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.2" />
          </filter>
          <filter id="ucc-halo" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="7" />
          </filter>
        </defs>
        <g className="ucc-breathe">
          <circle cx="98" cy="160" r="88" fill="url(#ucc-aura)" />
          <path
            d={SILHOUETTE}
            fill="none"
            stroke="#b79bff"
            strokeOpacity=".9"
            strokeWidth="7"
            filter="url(#ucc-halo)"
          />
        </g>
        <path d={SILHOUETTE} fill="url(#ucc-shadow)" filter="url(#ucc-soft)" />
        <g fill="#e9ddff">
          {ORBS.map(([x, y, r, delay]) => (
            <circle
              key={`${x}-${y}`}
              className="ucc-orb"
              cx={x}
              cy={y}
              r={r}
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </g>
        <text x="98" y="174" textAnchor="middle" className="ucc-question">
          ?
        </text>
        <ellipse cx="58" cy="208" rx="76" ry="22" fill="url(#ucc-mist)" />
        <ellipse cx="146" cy="212" rx="78" ry="24" fill="url(#ucc-mist)" />
        <rect x="0" y="198" width="200" height="82" fill="url(#ucc-fog)" />
        <ellipse cx="100" cy="208" rx="96" ry="18" fill="url(#ucc-mist)" opacity=".8" />
        <g fill="#fff3d6">
          {MOTES.map(([x, y, r, delay]) => (
            <circle
              key={`${x}-${y}`}
              className="ucc-mote"
              cx={x}
              cy={y}
              r={r}
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </g>
      </svg>
      <span className="ucc-caption">Awaiting discovery</span>
    </div>
  );
}

function CardBack() {
  return (
    <div className="ucc-face ucc-face--back">
      <svg className="ucc-art" viewBox="0 0 200 280" aria-hidden="true">
        <defs>
          <radialGradient id="ucc-lock-glow" cx=".5" cy=".5" r=".5">
            <stop stopColor="#8b5cf6" stopOpacity=".5" />
            <stop offset="1" stopColor="#4c1d95" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ucc-gold" x1="0" y1="0" x2="0" y2="1">
            <stop stopColor="#ffe7b8" />
            <stop offset="1" stopColor="#d9a352" />
          </linearGradient>
        </defs>
        <g fill="none" stroke="#a78bfa" strokeOpacity=".22">
          <path d="M-10 70c40-24 80 24 120 0s80-24 100 0" />
          <path d="M-10 214c40-24 80 24 120 0s80-24 100 0" />
          <path d="M-10 230c40-24 80 24 120 0s80-24 100 0" strokeOpacity=".14" />
          <circle cx="100" cy="102" r="58" strokeOpacity=".16" />
          <circle cx="100" cy="102" r="70" strokeOpacity=".1" strokeDasharray="2 6" />
        </g>
        <circle cx="100" cy="102" r="62" fill="url(#ucc-lock-glow)" />
        <circle
          cx="100"
          cy="102"
          r="36"
          fill="#120d2e"
          stroke="url(#ucc-gold)"
          strokeOpacity=".8"
        />
        <path
          d="M89 99v-7a11 11 0 0 1 22 0v7"
          fill="none"
          stroke="url(#ucc-gold)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <rect x="84" y="98" width="32" height="24" rx="6" fill="url(#ucc-gold)" />
        <circle cx="100" cy="108" r="3.2" fill="#120d2e" />
        <path d="M100 110v6" stroke="#120d2e" strokeWidth="2.4" strokeLinecap="round" />
      </svg>
      <div className="ucc-back__text">
        <p className="ucc-back__label">Identity locked</p>
        <p className="ucc-back__line">Your companion is waiting to be discovered.</p>
      </div>
      <span className="ucc-caption">AcadeMY · Cosmic Companion</span>
    </div>
  );
}

/**
 * The mystery Cosmic Card. Students flip it by click, tap or keyboard. Both faces are
 * placeholders: it never reveals or requests a companion.
 */
export function UnrevealedCosmicCard({ pedestal }: { pedestal?: ReactNode }) {
  const [flipped, setFlipped] = useState(false);
  const [turning, setTurning] = useState(false);
  const tilt = useRef<HTMLDivElement>(null);

  const lean = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse" || prefersReducedMotion() || !tilt.current) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    tilt.current.style.setProperty("--ucc-tilt-x", `${(-y * MAX_TILT_DEG).toFixed(2)}deg`);
    tilt.current.style.setProperty("--ucc-tilt-y", `${(x * MAX_TILT_DEG).toFixed(2)}deg`);
  };
  const settle = () => {
    tilt.current?.style.setProperty("--ucc-tilt-x", "0deg");
    tilt.current?.style.setProperty("--ucc-tilt-y", "0deg");
  };
  const landed = (event: TransitionEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget && event.propertyName === "transform") {
      setTurning(false);
    }
  };

  return (
    <div className="ucc" data-turning={turning}>
      <button
        type="button"
        className="ucc-button"
        aria-pressed={flipped}
        aria-label={
          flipped
            ? "Mystery Cosmic Card, back: Identity locked. Your companion is waiting to be discovered. Flip the card."
            : "Mystery Cosmic Card, front: a hidden companion in the mist. Flip the card."
        }
        onClick={() => {
          setFlipped((side) => !side);
          setTurning(!prefersReducedMotion());
        }}
        onPointerMove={lean}
        onPointerLeave={settle}
      >
        <div ref={tilt} className="ucc-tilt">
          <div className="ucc-float">
            <div className="ucc-card" data-flipped={flipped} onTransitionEnd={landed}>
              <CardFront />
              <CardBack />
            </div>
          </div>
        </div>
      </button>
      {pedestal}
      <p className="ucc-hint" aria-hidden="true">
        Tap to flip your card
      </p>
    </div>
  );
}
