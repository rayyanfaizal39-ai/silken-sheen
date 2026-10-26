/** Crisp SVG marks for the dashboard Cosmic Companion widget. Decorative only. */

function Spark({
  cx,
  cy,
  size = 2.2,
  color = "#E8C17C",
  opacity = 0.85,
}: {
  cx: number;
  cy: number;
  size?: number;
  color?: string;
  opacity?: number;
}) {
  const s = size;
  return (
    <path
      d={`M${cx} ${cy - s} L${cx + s * 0.35} ${cy - s * 0.35} L${cx + s} ${cy} L${cx + s * 0.35} ${cy + s * 0.35} L${cx} ${cy + s} L${cx - s * 0.35} ${cy + s * 0.35} L${cx - s} ${cy} L${cx - s * 0.35} ${cy - s * 0.35} Z`}
      fill={color}
      opacity={opacity}
    />
  );
}

/** Arch portal with gold star and violet orbital ring — not started / unfinished. */
export function CosmicPortalMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 140"
      width="140"
      height="140"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="cpw-portal-halo" cx="50%" cy="55%" r="48%">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.45" />
          <stop offset="55%" stopColor="#6366F1" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cpw-portal-stone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="40%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#312E81" />
        </linearGradient>
        <radialGradient id="cpw-portal-void" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="70%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#0F172A" />
        </radialGradient>
        <linearGradient id="cpw-portal-orbit" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.15" />
          <stop offset="50%" stopColor="#C4B5FD" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <circle cx="70" cy="72" r="58" fill="url(#cpw-portal-halo)" />

      {/* Arch outer */}
      <path
        d="M28 118 C28 52 112 52 112 118"
        fill="none"
        stroke="url(#cpw-portal-stone)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M38 116 C38 62 102 62 102 116"
        fill="url(#cpw-portal-void)"
        stroke="#818CF8"
        strokeWidth="1.25"
        opacity="0.95"
      />

      {/* Orbital ring */}
      <ellipse
        cx="70"
        cy="108"
        rx="46"
        ry="10"
        fill="none"
        stroke="url(#cpw-portal-orbit)"
        strokeWidth="2.5"
      />
      <circle cx="28" cy="108" r="3.2" fill="#E8C17C" opacity="0.9" />
      <circle cx="112" cy="108" r="2.4" fill="#C4B5FD" opacity="0.85" />

      {/* Center star */}
      <Spark cx={70} cy={78} size={11} color="#F6EAD2" opacity={1} />
      <Spark cx={70} cy={78} size={6.5} color="#E8C17C" opacity={0.95} />

      <Spark cx={42} cy={48} size={2.4} />
      <Spark cx={98} cy={54} size={1.8} color="#C4B5FD" />
      <Spark cx={88} cy={36} size={1.5} opacity={0.7} />
    </svg>
  );
}

/** Sapphire-violet egg with gold star, soft halo, orbit, and restrained sparkles. */
export function CosmicEggMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 140"
      width="140"
      height="140"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="cpw-egg-halo" cx="50%" cy="52%" r="48%">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.42" />
          <stop offset="60%" stopColor="#6366F1" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="cpw-egg-shell" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#DDD6FE" />
          <stop offset="28%" stopColor="#A78BFA" />
          <stop offset="62%" stopColor="#6D28D9" />
          <stop offset="100%" stopColor="#1E1B4B" />
        </radialGradient>
        <linearGradient id="cpw-egg-orbit" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.12" />
          <stop offset="50%" stopColor="#C4B5FD" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.12" />
        </linearGradient>
      </defs>

      <circle cx="70" cy="68" r="56" fill="url(#cpw-egg-halo)" />

      <ellipse cx="70" cy="108" rx="40" ry="9" fill="#312E81" opacity="0.35" />
      <ellipse
        cx="70"
        cy="108"
        rx="48"
        ry="11"
        fill="none"
        stroke="url(#cpw-egg-orbit)"
        strokeWidth="2.4"
      />
      <circle cx="26" cy="108" r="3" fill="#E8C17C" opacity="0.9" />
      <circle cx="114" cy="108" r="2.2" fill="#C4B5FD" opacity="0.8" />

      <ellipse cx="70" cy="64" rx="34" ry="44" fill="url(#cpw-egg-shell)" />
      <ellipse cx="56" cy="46" rx="12" ry="16" fill="#F5F3FF" opacity="0.22" />
      <ellipse
        cx="70"
        cy="64"
        rx="34"
        ry="44"
        fill="none"
        stroke="rgba(232,193,124,0.38)"
        strokeWidth="1.4"
      />

      <Spark cx={70} cy={64} size={9} color="#F6EAD2" opacity={1} />
      <Spark cx={70} cy={64} size={5.2} color="#E8C17C" opacity={0.95} />

      <Spark cx={38} cy={40} size={2.2} />
      <Spark cx={104} cy={48} size={1.7} color="#C4B5FD" />
      <Spark cx={96} cy={30} size={1.4} opacity={0.65} />
      <Spark cx={44} cy={92} size={1.5} opacity={0.7} />
    </svg>
  );
}

/**
 * Dual portrait frames for the ready state — same companion, two staff options.
 * Abstract frames only; never invent two different species.
 */
export function CosmicDualFrameMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 140 140"
      width="140"
      height="140"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="cpw-dual-halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cpw-dual-a" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id="cpw-dual-b" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
      <circle cx="70" cy="70" r="58" fill="url(#cpw-dual-halo)" />
      <rect
        x="14"
        y="28"
        width="52"
        height="72"
        rx="12"
        fill="#1E1B4B"
        stroke="url(#cpw-dual-a)"
        strokeWidth="2.5"
      />
      <rect
        x="74"
        y="28"
        width="52"
        height="72"
        rx="12"
        fill="#1E1B4B"
        stroke="url(#cpw-dual-b)"
        strokeWidth="2.5"
      />
      <Spark cx={40} cy={64} size={7} color="#A78BFA" opacity={0.9} />
      <Spark cx={100} cy={64} size={7} color="#E8C17C" opacity={0.9} />
      <Spark cx={28} cy={38} size={1.6} />
      <Spark cx={112} cy={40} size={1.6} color="#C4B5FD" />
    </svg>
  );
}
