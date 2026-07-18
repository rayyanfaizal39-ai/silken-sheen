export type AcademyHeroIllustrationVariant =
  | "astronaut"
  | "notes"
  | "mindmaps"
  | "flashcards"
  | "quizzes";

export function AcademyHeroVectorIllustration({
  variant,
}: {
  variant: Exclude<AcademyHeroIllustrationVariant, "astronaut">;
}) {
  if (variant === "notes") return <NotebookIllustration />;
  if (variant === "mindmaps") return <MindMapIllustration />;
  if (variant === "flashcards") return <FlashcardsIllustration />;
  return <QuizIllustration />;
}

const svgClassName = "absolute inset-0 h-full w-full";

function NotebookIllustration() {
  return (
    <svg viewBox="0 0 360 240" className={svgClassName} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="notes-page-left" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#A78BFA" stopOpacity="0.92" />
          <stop offset="1" stopColor="#312E81" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id="notes-page-right" x1="1" y1="0" x2="0" y2="1">
          <stop stopColor="#8B5CF6" stopOpacity="0.95" />
          <stop offset="1" stopColor="#1E1B4B" stopOpacity="0.94" />
        </linearGradient>
        <filter id="notes-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="180" cy="201" rx="118" ry="18" fill="#7C3AED" opacity="0.22" />
      <g filter="url(#notes-glow)">
        <path
          d="M180 70C151 51 111 49 73 63v119c38-13 78-10 107 13V70Z"
          fill="url(#notes-page-left)"
          stroke="#C4B5FD"
          strokeOpacity="0.82"
          strokeWidth="1.5"
        />
        <path
          d="M180 70c29-19 69-21 107-7v119c-38-13-78-10-107 13V70Z"
          fill="url(#notes-page-right)"
          stroke="#C4B5FD"
          strokeOpacity="0.82"
          strokeWidth="1.5"
        />
        <path d="M180 72v121" stroke="#DDD6FE" strokeOpacity="0.7" strokeWidth="2" />
      </g>
      <g fill="none" stroke="#EDE9FE" strokeLinecap="round" strokeOpacity="0.38" strokeWidth="3">
        <path d="M91 88c25-7 48-5 70 4" />
        <path d="M91 105c25-6 48-4 70 5" />
        <path d="M91 122c22-5 43-3 61 4" />
        <path d="M199 91c22-9 45-11 70-5" />
        <path d="M199 108c22-8 45-10 70-4" />
        <path d="M199 125c19-7 39-8 60-4" />
      </g>
      <path
        d="M92 145c22-4 42-1 61 7"
        fill="none"
        stroke="#FDE68A"
        strokeLinecap="round"
        strokeWidth="5"
      />
      <path
        d="m247 63 17 4-9 37-8-10-12 5 12-36Z"
        fill="#7C3AED"
        stroke="#DDD6FE"
        strokeOpacity="0.7"
      />
    </svg>
  );
}

function MindMapIllustration() {
  return (
    <svg viewBox="0 0 360 240" className={svgClassName} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="map-core" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#A78BFA" />
          <stop offset="1" stopColor="#4F46E5" />
        </linearGradient>
        <filter id="map-glow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g fill="none" stroke="#8B5CF6" strokeOpacity="0.62" strokeWidth="2">
        <path d="M180 120 101 69" />
        <path d="M180 120 78 139" />
        <path d="M180 120 126 187" />
        <path d="M180 120 257 67" />
        <path d="M180 120 286 128" />
        <path d="M180 120 245 187" />
      </g>
      <g filter="url(#map-glow)">
        <rect x="139" y="91" width="82" height="58" rx="22" fill="url(#map-core)" />
        <circle cx="101" cy="69" r="17" fill="#312E81" stroke="#A78BFA" strokeWidth="2" />
        <circle cx="78" cy="139" r="14" fill="#1E1B4B" stroke="#818CF8" strokeWidth="2" />
        <circle cx="126" cy="187" r="16" fill="#312E81" stroke="#C4B5FD" strokeWidth="2" />
        <circle cx="257" cy="67" r="16" fill="#312E81" stroke="#C4B5FD" strokeWidth="2" />
        <circle cx="286" cy="128" r="14" fill="#1E1B4B" stroke="#818CF8" strokeWidth="2" />
        <circle cx="245" cy="187" r="17" fill="#312E81" stroke="#A78BFA" strokeWidth="2" />
      </g>
      <circle cx="180" cy="120" r="10" fill="#EDE9FE" opacity="0.88" />
    </svg>
  );
}

function FlashcardsIllustration() {
  return (
    <svg viewBox="0 0 360 240" className={svgClassName} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="card-back" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#312E81" />
          <stop offset="1" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id="card-front" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#8B5CF6" />
          <stop offset="0.55" stopColor="#6366F1" />
          <stop offset="1" stopColor="#312E81" />
        </linearGradient>
        <filter id="cards-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="180" cy="199" rx="106" ry="16" fill="#7C3AED" opacity="0.22" />
      <g filter="url(#cards-glow)">
        <g transform="rotate(-9 153 117)">
          <rect
            x="82"
            y="54"
            width="142"
            height="126"
            rx="18"
            fill="url(#card-back)"
            stroke="#A78BFA"
            strokeOpacity="0.7"
            strokeWidth="2"
          />
          <circle cx="111" cy="84" r="10" fill="#C4B5FD" opacity="0.42" />
          <path
            d="M102 147h86"
            stroke="#DDD6FE"
            strokeLinecap="round"
            strokeOpacity="0.28"
            strokeWidth="4"
          />
        </g>
        <g transform="rotate(7 207 124)">
          <rect
            x="137"
            y="62"
            width="142"
            height="126"
            rx="18"
            fill="url(#card-front)"
            stroke="#DDD6FE"
            strokeOpacity="0.82"
            strokeWidth="2"
          />
          <rect x="158" y="83" width="38" height="8" rx="4" fill="#EDE9FE" opacity="0.72" />
          <path
            d="M158 112h91M158 130h72M158 148h82"
            stroke="#EDE9FE"
            strokeLinecap="round"
            strokeOpacity="0.35"
            strokeWidth="4"
          />
        </g>
      </g>
    </svg>
  );
}

function QuizIllustration() {
  return (
    <svg viewBox="0 0 360 240" className={svgClassName} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="quiz-sheet" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4C1D95" />
          <stop offset="0.55" stopColor="#312E81" />
          <stop offset="1" stopColor="#172554" />
        </linearGradient>
        <filter id="quiz-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="7" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <ellipse cx="180" cy="207" rx="89" ry="14" fill="#7C3AED" opacity="0.22" />
      <g filter="url(#quiz-glow)">
        <rect
          x="104"
          y="34"
          width="152"
          height="169"
          rx="18"
          fill="url(#quiz-sheet)"
          stroke="#C4B5FD"
          strokeOpacity="0.8"
          strokeWidth="2"
        />
        <circle cx="226" cy="68" r="24" fill="#7C3AED" stroke="#DDD6FE" strokeOpacity="0.7" />
      </g>
      <path
        d="M219 62c1-7 14-8 15 0 1 5-7 6-7 12m0 8h.01"
        fill="none"
        stroke="#F5F3FF"
        strokeLinecap="round"
        strokeWidth="4"
      />
      <g fill="none" stroke="#DDD6FE" strokeOpacity="0.72" strokeWidth="2">
        <rect x="126" y="101" width="14" height="14" rx="3" />
        <rect x="126" y="128" width="14" height="14" rx="3" />
        <rect x="126" y="155" width="14" height="14" rx="3" />
      </g>
      <path
        d="m129 107 4 4 8-10"
        fill="none"
        stroke="#A7F3D0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <path
        d="m129 134 4 4 8-10"
        fill="none"
        stroke="#A7F3D0"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <g stroke="#C4B5FD" strokeLinecap="round" strokeOpacity="0.42" strokeWidth="4">
        <path d="M153 108h61" />
        <path d="M153 135h77" />
        <path d="M153 162h52" />
      </g>
    </svg>
  );
}
