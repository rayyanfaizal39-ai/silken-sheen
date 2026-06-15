import type { CSSProperties } from "react";
import type { AvatarConfig } from "@/hooks/use-progress";
import { resolveAvatar } from "@/data/avatar";

interface AvatarProps {
  config: AvatarConfig;
  size?: number;
  glow?: boolean;
  /** Rank-based bottom glow color (e.g. "#7C3AED" for Queen). */
  rankGlow?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Pop Mart-style vinyl toy figure. Character type is driven by the equipped
 * suit skin; accessories, expression, and companion come from the other slots.
 */
export function Avatar({ config, size = 96, glow = true, rankGlow, className, style }: AvatarProps) {
  const { suit, helmet, visor, pet } = resolveAvatar(config);
  const uid = `pm-${suit.id}-${helmet.id}-${visor.id}`.replace(/[^a-z0-9-]/gi, "");

  // Derive character archetype from suit id
  const isLabubu     = suit.id.includes("labubu");
  const isDimoo      = suit.id.includes("dimoo");
  const isSkullpanda = suit.id.includes("skull");
  const isCrybaby    = suit.id.includes("crybaby");
  const isGolden     = suit.id.includes("golden");

  // Skin tone: skullpanda gets dark fantasy skin
  const skinBase = isSkullpanda ? "#2D1B4E" : "#FFE4CC";
  const skinShadow = isSkullpanda ? "#1A0A2E" : "#F5C9A0";

  // Eye style from visor id
  const eyeStyle = visor.id.includes("star") ? "star"
    : visor.id.includes("heart") ? "heart"
    : visor.id.includes("wink") ? "wink"
    : "round";

  const c = suit.colors;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="Pop Mart character avatar"
      className={className}
      style={style}
    >
      <defs>
        <radialGradient id={`amb-${uid}`} cx="50%" cy="30%" r="65%">
          <stop offset="0%" stopColor={c.trim} stopOpacity="0.28" />
          <stop offset="100%" stopColor={c.trim} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={c.trim} />
          <stop offset="100%" stopColor={c.base} />
        </linearGradient>
        <linearGradient id={`skin-${uid}`} x1="0" y1="0" x2="0.4" y2="1">
          <stop offset="0%" stopColor={skinBase} />
          <stop offset="100%" stopColor={skinShadow} />
        </linearGradient>
        <radialGradient id={`blush-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F87171" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#F87171" stopOpacity="0" />
        </radialGradient>
        {rankGlow && (
          <radialGradient id={`rglow-${uid}`} cx="50%" cy="30%" r="60%">
            <stop offset="0%" stopColor={rankGlow} stopOpacity="0.95" />
            <stop offset="70%" stopColor={rankGlow} stopOpacity="0.4" />
            <stop offset="100%" stopColor={rankGlow} stopOpacity="0" />
          </radialGradient>
        )}
        <filter id={`glow-f-${uid}`} x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Ambient character glow */}
      {glow && <ellipse cx="60" cy="55" r="52" fill={`url(#amb-${uid})`} />}

      {/* ── Rank glow platform (bottom) ── */}
      {rankGlow && (
        <ellipse
          cx="60"
          cy="116"
          rx="34"
          ry="7"
          fill={`url(#rglow-${uid})`}
          filter={`url(#glow-f-${uid})`}
        />
      )}

      {/* ── Body ── */}
      <ellipse cx="60" cy="102" rx="25" ry="17" fill={`url(#body-${uid})`} stroke={c.trim} strokeWidth="1.5" />

      {/* ── Arms ── */}
      <ellipse cx="32" cy="95" rx="11" ry="7.5" transform="rotate(-22,32,95)" fill={`url(#body-${uid})`} stroke={c.trim} strokeWidth="1.2" />
      <ellipse cx="88" cy="95" rx="11" ry="7.5" transform="rotate(22,88,95)" fill={`url(#body-${uid})`} stroke={c.trim} strokeWidth="1.2" />

      {/* ── Labubu bunny ears ── */}
      {isLabubu && <LabubuEars c={c} uid={uid} />}

      {/* ── Head ── */}
      <circle cx="60" cy="48" r="35" fill={`url(#skin-${uid})`} stroke={skinShadow} strokeWidth="1.2" />

      {/* ── Cheeks (not on skullpanda) ── */}
      {!isSkullpanda && (
        <>
          <ellipse cx="40" cy="57" rx="9" ry="6" fill={`url(#blush-${uid})`} />
          <ellipse cx="80" cy="57" rx="9" ry="6" fill={`url(#blush-${uid})`} />
        </>
      )}

      {/* ── Dimoo star forehead ── */}
      {isDimoo && (
        <path
          d="M60 16 L61.8 21.5 L67.5 21.5 L63 25 L64.8 30.5 L60 27 L55.2 30.5 L57 25 L52.5 21.5 L58.2 21.5 Z"
          fill="#FBBF24"
          stroke="#F59E0B"
          strokeWidth="0.8"
        />
      )}

      {/* ── Eyes ── */}
      <Eyes eyeStyle={eyeStyle} isDimoo={isDimoo} isSkullpanda={isSkullpanda} isCrybaby={isCrybaby} visorColors={visor.colors} />

      {/* ── Mouth expression ── */}
      <Mouth charType={isLabubu ? "labubu" : isCrybaby ? "crybaby" : isDimoo ? "dimoo" : "default"} />

      {/* ── Crybaby tears ── */}
      {isCrybaby && (
        <>
          <path d="M47 60 Q46 66 47 72" stroke="#93C5FD" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M73 60 Q72 66 73 72" stroke="#93C5FD" strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="47" cy="73" rx="2.5" ry="3.5" fill="#BAE6FD" />
          <ellipse cx="73" cy="73" rx="2.5" ry="3.5" fill="#BAE6FD" />
        </>
      )}

      {/* ── Golden sparkles ── */}
      {isGolden && (
        <>
          <path d="M18 32 L19.5 27 L21 32 L26 33.5 L21 35 L19.5 40 L18 35 L13 33.5 Z" fill="#FBBF24" opacity="0.9" />
          <path d="M97 22 L98 19 L99 22 L102 23 L99 24 L98 27 L97 24 L94 23 Z" fill="#FBBF24" opacity="0.85" />
          <path d="M100 75 L100.8 72.5 L101.6 75 L104 75.8 L101.6 76.6 L100.8 79 L100 76.6 L97.6 75.8 Z" fill="#F59E0B" opacity="0.75" />
        </>
      )}

      {/* ── Skullpanda gothic detail ── */}
      {isSkullpanda && (
        <path d="M44 70 Q60 66 76 70" stroke="#A78BFA" strokeWidth="1.5" fill="none" opacity="0.5" />
      )}

      {/* ── Headgear (helmet slot) ── */}
      <Headgear helmetId={helmet.id} helmetColors={helmet.colors} />

      {/* ── Companion (pet slot) ── */}
      {pet.id !== "pet-none" && <Companion petId={pet.id} petColors={pet.colors} />}
    </svg>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function LabubuEars({ c, uid }: { c: { base: string; trim: string }; uid: string }) {
  return (
    <>
      <ellipse cx="31" cy="20" rx="11" ry="18" transform="rotate(-12,31,20)" fill={c.base} stroke={c.trim} strokeWidth="1.5" />
      <ellipse cx="31" cy="20" rx="6" ry="10" transform="rotate(-12,31,20)" fill={c.trim} opacity="0.35" />
      <ellipse cx="89" cy="20" rx="11" ry="18" transform="rotate(12,89,20)" fill={c.base} stroke={c.trim} strokeWidth="1.5" />
      <ellipse cx="89" cy="20" rx="6" ry="10" transform="rotate(12,89,20)" fill={c.trim} opacity="0.35" />
    </>
  );
}

function Eyes({ eyeStyle, isDimoo, isSkullpanda, isCrybaby, visorColors }: {
  eyeStyle: string;
  isDimoo: boolean;
  isSkullpanda: boolean;
  isCrybaby: boolean;
  visorColors: { base: string; trim: string };
}) {
  if (isDimoo) {
    // Dreamy half-closed eyes
    return (
      <>
        <ellipse cx="46" cy="46" rx="11" ry="8" fill="white" />
        <ellipse cx="74" cy="46" rx="11" ry="8" fill="white" />
        {/* Heavy-lidded upper half */}
        <ellipse cx="46" cy="50" rx="9" ry="7" fill="#1A1A2E" />
        <ellipse cx="74" cy="50" rx="9" ry="7" fill="#1A1A2E" />
        <path d="M35 46 Q46 39 57 46" fill="#FFE4CC" />
        <path d="M63 46 Q74 39 85 46" fill="#FFE4CC" />
        <circle cx="43" cy="46" r="2.5" fill="white" opacity="0.9" />
        <circle cx="71" cy="46" r="2.5" fill="white" opacity="0.9" />
      </>
    );
  }

  if (isSkullpanda) {
    // Large haunting gothic eyes
    return (
      <>
        <ellipse cx="46" cy="45" rx="13" ry="14" fill="#0D0020" />
        <ellipse cx="74" cy="45" rx="13" ry="14" fill="#0D0020" />
        <ellipse cx="46" cy="45" rx="10" ry="11" fill={visorColors.base} opacity="0.85" />
        <ellipse cx="74" cy="45" rx="10" ry="11" fill={visorColors.base} opacity="0.85" />
        <ellipse cx="46" cy="46" rx="6.5" ry="7.5" fill="#050010" />
        <ellipse cx="74" cy="46" rx="6.5" ry="7.5" fill="#050010" />
        <circle cx="43" cy="41" r="3" fill="white" opacity="0.8" />
        <circle cx="71" cy="41" r="3" fill="white" opacity="0.8" />
        <circle cx="49" cy="47" r="1.8" fill={visorColors.trim} opacity="0.6" />
        <circle cx="77" cy="47" r="1.8" fill={visorColors.trim} opacity="0.6" />
      </>
    );
  }

  if (eyeStyle === "star") {
    return (
      <>
        <circle cx="46" cy="46" r="12" fill="white" />
        <circle cx="74" cy="46" r="12" fill="white" />
        <path d="M46 37 L48.2 43 L54.5 43 L49.5 47 L51.5 53 L46 49.5 L40.5 53 L42.5 47 L37.5 43 L43.8 43 Z" fill={visorColors.base} />
        <path d="M74 37 L76.2 43 L82.5 43 L77.5 47 L79.5 53 L74 49.5 L68.5 53 L70.5 47 L65.5 43 L71.8 43 Z" fill={visorColors.base} />
        <circle cx="43" cy="43" r="2.5" fill="white" opacity="0.9" />
        <circle cx="71" cy="43" r="2.5" fill="white" opacity="0.9" />
      </>
    );
  }

  if (eyeStyle === "heart") {
    return (
      <>
        <circle cx="46" cy="46" r="12" fill="white" />
        <circle cx="74" cy="46" r="12" fill="white" />
        <path d="M46 41 C46 37.5 41.5 36.5 41.5 41 C41.5 44.5 46 49 46 49 C46 49 50.5 44.5 50.5 41 C50.5 36.5 46 37.5 46 41 Z" fill="#EF4444" />
        <path d="M74 41 C74 37.5 69.5 36.5 69.5 41 C69.5 44.5 74 49 74 49 C74 49 78.5 44.5 78.5 41 C78.5 36.5 74 37.5 74 41 Z" fill="#EF4444" />
        <circle cx="43" cy="42" r="2.5" fill="white" opacity="0.85" />
        <circle cx="71" cy="42" r="2.5" fill="white" opacity="0.85" />
      </>
    );
  }

  if (eyeStyle === "wink") {
    return (
      <>
        {/* Left eye: normal */}
        <circle cx="46" cy="46" r="12" fill="white" />
        <circle cx="46" cy="47" r="8" fill="#1A1A1A" />
        <circle cx="43" cy="44" r="2.8" fill="white" />
        <circle cx="49" cy="48" r="1.4" fill="white" opacity="0.6" />
        {/* Right eye: wink (curved line) */}
        <path d="M63 45 Q74 38 85 45" stroke="#1A1A1A" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M63 47 Q74 52 85 47" stroke="#1A1A1A" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.3" />
      </>
    );
  }

  // Default round eyes (also crybaby — same shape but tears added separately)
  return (
    <>
      <circle cx="46" cy="46" r="12" fill="white" />
      <circle cx="74" cy="46" r="12" fill="white" />
      <circle cx="46" cy="47" r="8.5" fill="#1A1A1A" />
      <circle cx="74" cy="47" r="8.5" fill="#1A1A1A" />
      <circle cx="43" cy="43.5" r="3" fill="white" />
      <circle cx="71" cy="43.5" r="3" fill="white" />
      {/* Tiny eye-shine dot */}
      <circle cx="49" cy="49" r="1.4" fill="white" opacity="0.6" />
      <circle cx="77" cy="49" r="1.4" fill="white" opacity="0.6" />
      {isCrybaby && (
        <>
          {/* Watery sparkle in corner */}
          <circle cx="42" cy="55" r="2.5" fill="#93C5FD" opacity="0.7" />
          <circle cx="70" cy="55" r="2.5" fill="#93C5FD" opacity="0.7" />
        </>
      )}
    </>
  );
}

function Mouth({ charType }: { charType: string }) {
  if (charType === "labubu") {
    return (
      <>
        <path d="M42 63 Q60 76 78 63" fill="#1A1A1A" />
        <path d="M46 63 Q60 74 74 63" fill="white" />
        <line x1="51" y1="63" x2="51" y2="68" stroke="#1A1A1A" strokeWidth="1.3" />
        <line x1="57" y1="63" x2="57" y2="70" stroke="#1A1A1A" strokeWidth="1.3" />
        <line x1="63" y1="63" x2="63" y2="70" stroke="#1A1A1A" strokeWidth="1.3" />
        <line x1="69" y1="63" x2="69" y2="68" stroke="#1A1A1A" strokeWidth="1.3" />
      </>
    );
  }
  if (charType === "crybaby") {
    return <path d="M49 65 Q60 58 71 65" fill="none" stroke="#4B4B6B" strokeWidth="2.8" strokeLinecap="round" />;
  }
  if (charType === "dimoo") {
    return <path d="M53 62 Q60 67 67 62" fill="none" stroke="#4B4B6B" strokeWidth="2.2" strokeLinecap="round" />;
  }
  return <path d="M49 62 Q60 70 71 62" fill="none" stroke="#3D3D3D" strokeWidth="2.8" strokeLinecap="round" />;
}

function Headgear({ helmetId, helmetColors }: { helmetId: string; helmetColors: { base: string; trim: string } }) {
  if (helmetId.includes("bow") || helmetId.includes("molly") || helmetId.includes("classic")) {
    return (
      <g transform="translate(60,14)">
        {/* Left wing */}
        <path d="M-14 0 C-18 -9 -6 -12 0 -4" fill={helmetColors.base} stroke={helmetColors.trim} strokeWidth="1" />
        {/* Right wing */}
        <path d="M14 0 C18 -9 6 -12 0 -4" fill={helmetColors.base} stroke={helmetColors.trim} strokeWidth="1" />
        {/* Centre knot */}
        <circle cx="0" cy="-2" r="4.5" fill={helmetColors.trim} />
      </g>
    );
  }
  if (helmetId.includes("crown") || helmetId.includes("gold")) {
    return (
      <g transform="translate(60,15)">
        <path d="M-15 0 L-15 -9 L-7.5 -4 L0 -13 L7.5 -4 L15 -9 L15 0 Z" fill={helmetColors.base} stroke={helmetColors.trim} strokeWidth="1.2" />
        <circle cx="-7.5" cy="-3.5" r="2.2" fill={helmetColors.trim} />
        <circle cx="0" cy="-3.5" r="2.2" fill={helmetColors.trim} />
        <circle cx="7.5" cy="-3.5" r="2.2" fill={helmetColors.trim} />
      </g>
    );
  }
  if (helmetId.includes("cat") || helmetId.includes("carbon")) {
    return (
      <>
        <path d="M38 19 L31 5 L46 13 Z" fill={helmetColors.base} stroke={helmetColors.trim} strokeWidth="1.2" />
        <path d="M82 19 L89 5 L74 13 Z" fill={helmetColors.base} stroke={helmetColors.trim} strokeWidth="1.2" />
        <path d="M38 19 L34 10 L43 14 Z" fill={helmetColors.trim} opacity="0.55" />
        <path d="M82 19 L86 10 L77 14 Z" fill={helmetColors.trim} opacity="0.55" />
      </>
    );
  }
  if (helmetId.includes("crimson") || helmetId.includes("party")) {
    return (
      <>
        <path d="M60 5 L44 20 L76 20 Z" fill={helmetColors.base} stroke={helmetColors.trim} strokeWidth="1.2" />
        <circle cx="60" cy="5" r="3.5" fill={helmetColors.trim} />
        <circle cx="50" cy="17" r="2" fill={helmetColors.trim} opacity="0.7" />
        <circle cx="70" cy="17" r="2" fill={helmetColors.trim} opacity="0.7" />
      </>
    );
  }
  // "none" / default starter bow already handled above by "classic"
  return null;
}

function Companion({ petId, petColors }: { petId: string; petColors: { base: string; trim: string } }) {
  if (petId === "pet-star") {
    return (
      <g transform="translate(102,32)">
        <path d="M0 -10 L2.4 -3.4 L9.5 -3 L4 1.6 L6 8.5 L0 5 L-6 8.5 L-4 1.6 L-9.5 -3 L-2.4 -3.4 Z" fill={petColors.base} stroke={petColors.trim} strokeWidth="1.2" />
        <circle cx="0" cy="0" r="2.5" fill="white" opacity="0.55" />
      </g>
    );
  }
  if (petId === "pet-flower") {
    return (
      <g transform="translate(102,32)">
        {[0, 60, 120, 180, 240, 300].map((deg) => (
          <ellipse
            key={deg}
            cx={Math.round(6.5 * Math.cos((deg * Math.PI) / 180))}
            cy={Math.round(6.5 * Math.sin((deg * Math.PI) / 180))}
            rx="5"
            ry="3.5"
            transform={`rotate(${deg})`}
            fill={petColors.base}
          />
        ))}
        <circle cx="0" cy="0" r="4.5" fill={petColors.trim} />
        <circle cx="0" cy="0" r="2" fill="white" opacity="0.6" />
      </g>
    );
  }
  if (petId === "pet-moon") {
    return (
      <g transform="translate(102,32)">
        <path d="M0 -11 A11 11 0 1 0 10 3 A8 8 0 1 1 0 -11 Z" fill={petColors.base} stroke={petColors.trim} strokeWidth="1" />
        <circle cx="4" cy="-5" r="1.8" fill={petColors.trim} opacity="0.75" />
        <circle cx="-2" cy="3" r="1.2" fill={petColors.trim} opacity="0.55" />
      </g>
    );
  }
  // pet-rainbow
  return (
    <g transform="translate(98,28)">
      {["#EF4444", "#F97316", "#FBBF24", "#4ADE80", "#60A5FA", "#A78BFA"].map((col, i) => (
        <path
          key={col}
          d={`M-13 4 A${13 + i * 0} ${13 - i * 1.8} 0 0 1 ${13} 4`}
          fill="none"
          stroke={col}
          strokeWidth="2.2"
          opacity="0.9"
        />
      ))}
    </g>
  );
}
