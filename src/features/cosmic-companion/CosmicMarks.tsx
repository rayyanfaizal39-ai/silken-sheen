/** Compact, crisp SVG marks for the dashboard Cosmic Companion widget. Decorative only. */

export function CosmicPortalMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      width="120"
      height="120"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="cpw-portal-glow" cx="50%" cy="55%" r="45%">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.55" />
          <stop offset="70%" stopColor="#6366F1" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="cpw-portal-ring" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E8C17C" />
          <stop offset="50%" stopColor="#C4B5FD" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
      </defs>
      <circle cx="60" cy="62" r="42" fill="url(#cpw-portal-glow)" />
      <ellipse
        cx="60"
        cy="62"
        rx="28"
        ry="36"
        fill="none"
        stroke="url(#cpw-portal-ring)"
        strokeWidth="3.5"
        opacity="0.95"
      />
      <ellipse
        cx="60"
        cy="62"
        rx="18"
        ry="24"
        fill="#1E1B4B"
        stroke="#A78BFA"
        strokeWidth="1.5"
        opacity="0.9"
      />
      <circle cx="60" cy="62" r="7" fill="#F6EAD2" opacity="0.95" />
      <path
        d="M60 48 L62.2 58.5 L73 58.5 L64.3 65 L67.5 75.5 L60 69 L52.5 75.5 L55.7 65 L47 58.5 L57.8 58.5 Z"
        fill="#E8C17C"
        opacity="0.95"
      />
      <circle cx="34" cy="36" r="1.6" fill="#E8C17C" opacity="0.8" />
      <circle cx="88" cy="40" r="1.2" fill="#C4B5FD" opacity="0.85" />
      <circle cx="82" cy="88" r="1.4" fill="#E8C17C" opacity="0.7" />
    </svg>
  );
}

export function CosmicEggMark({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 120"
      width="120"
      height="120"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <radialGradient id="cpw-egg-shell" cx="42%" cy="32%" r="68%">
          <stop offset="0%" stopColor="#C4B5FD" />
          <stop offset="45%" stopColor="#7C3AED" />
          <stop offset="100%" stopColor="#312E81" />
        </radialGradient>
        <radialGradient id="cpw-egg-glow" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#0B1220" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="78" rx="34" ry="10" fill="url(#cpw-egg-glow)" />
      <ellipse cx="60" cy="58" rx="30" ry="38" fill="url(#cpw-egg-shell)" />
      <ellipse cx="48" cy="42" rx="10" ry="14" fill="#E9D5FF" opacity="0.22" />
      <path
        d="M60 44 L62 54 L72 54 L64 60 L67 70 L60 64 L53 70 L56 60 L48 54 L58 54 Z"
        fill="#E8C17C"
      />
      <ellipse
        cx="60"
        cy="58"
        rx="30"
        ry="38"
        fill="none"
        stroke="rgba(232,193,124,0.35)"
        strokeWidth="1.25"
      />
    </svg>
  );
}
