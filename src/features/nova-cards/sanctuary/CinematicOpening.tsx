import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { CompanionGarden } from "../../cosmic-companion/CompanionGarden";
import { AudioControls } from "./AudioControls";
import { soundscape } from "./audio";
import { academyHomeHref } from "../paths";
import "./journey-intro.css";

interface CinematicOpeningProps {
  onStartJourney: () => void;
  reducedMotion: boolean;
  /** Shown beneath Begin My Journey, such as the guest notice. */
  notice?: ReactNode;
}

/** Long enough for the garden to dissolve before Question 1 takes over. */
const ENTER_FOREST_MS = 900;

const INFO: { title: string; body: string; icon: ReactNode }[] = [
  {
    title: "Thoughtful Questions",
    body: "Answer 12 fun and meaningful questions.",
    icon: (
      <>
        <path d="M6 10.5c5-2 10-1.6 14 1.5 4-3.1 9-3.5 14-1.5v19c-5-2-10-1.6-14 1.5-4-3.1-9-3.5-14-1.5Z" />
        <path d="M20 12v19" />
        <path d="M10 16h6M10 20h6M24 16h6M24 20h6" strokeOpacity=".5" />
      </>
    ),
  },
  {
    title: "A Personal Journey",
    body: "Explore your mindset, strengths and learning style.",
    icon: (
      <>
        <circle cx="20" cy="20" r="13" />
        <circle cx="20" cy="20" r="9.5" strokeOpacity=".4" strokeDasharray="1.5 3" />
        <path d="m25.5 14.5-3.6 7.4-7.4 3.6 3.6-7.4Z" />
        <circle cx="20" cy="20" r="1.4" />
      </>
    ),
  },
  {
    title: "Discover Your Companion",
    body: "Find a unique companion that matches who you are.",
    icon: (
      <>
        <path d="M19 10c-6 .4-10 6-10 12 0 2.6.8 5 1.8 6.8h20.8c1.2-2.2 1.6-5 1-7.6-.8-4-3-6.2-5.6-7.4-2-2.6-4.8-4-8-3.8Z" />
        <path d="M19.5 21.5c0-2 3-2 3 0 0 1.4-1.5 1.6-1.5 3M21 27v.2" strokeLinecap="round" />
      </>
    ),
  },
  {
    title: "A Cosmic Card to Keep",
    body: "Receive a beautifully designed card that stays with you forever.",
    icon: (
      <>
        <rect x="11" y="6" width="18" height="28" rx="3" transform="rotate(-8 20 20)" />
        <path d="M20 14.5 21.6 19l4.4 1.6-4.4 1.6L20 26.6l-1.6-4.4-4.4-1.6 4.4-1.6Z" />
      </>
    ),
  },
];

/**
 * The journey introduction: the first scene after the Celestial Gateway and the only
 * "before we begin" screen. It explains the 12 questions; it never records an answer.
 */
export function CinematicOpening({ onStartJourney, reducedMotion, notice }: CinematicOpeningProps) {
  const [entering, setEntering] = useState(false);
  const enterTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (enterTimer.current) clearTimeout(enterTimer.current);
    },
    [],
  );

  const begin = () => {
    if (entering) return;
    soundscape.playStarlightWhisper();
    if (reducedMotion) {
      onStartJourney();
      return;
    }
    setEntering(true);
    enterTimer.current = setTimeout(onStartJourney, ENTER_FOREST_MS);
  };

  return (
    <div
      className="sanctuary-opening cci"
      data-entering={entering}
      data-calm={reducedMotion}
      aria-labelledby="cci-title"
      role="region"
    >
      <div className="cci-garden" aria-hidden="true">
        <CompanionGarden />
      </div>
      <div className="cci-veil" aria-hidden="true" />

      <header className="cci-bar">
        <a className="cci-logo" href={academyHomeHref} aria-label="AcadeMY home">
          <img src="/branding/academy-icon.png" alt="" width="30" height="30" />
          <span>
            Acade<b>MY</b>
          </span>
        </a>
        <p className="cci-crest">
          <span aria-hidden="true">✦</span> Cosmic Companion <span aria-hidden="true">✦</span>
        </p>
        <AudioControls />
      </header>

      <div className="cci-content">
        <p className="cci-eyebrow cci-step" style={{ "--cci-at": 0 } as React.CSSProperties}>
          Before we begin
        </p>
        <h1
          id="cci-title"
          tabIndex={-1}
          className="cci-step"
          style={{ "--cci-at": 0 } as React.CSSProperties}
        >
          Let&apos;s Discover <span>Your Cosmic Companion</span>
        </h1>
        <p className="cci-lead cci-step" style={{ "--cci-at": 1 } as React.CSSProperties}>
          You&apos;re about to answer 12 carefully crafted questions that will help us find the
          companion that truly matches your mindset, strengths and learning style.
        </p>

        <ul className="cci-info" aria-label="What to expect">
          {INFO.map((item, i) => (
            <li
              key={item.title}
              className="cci-step"
              style={{ "--cci-at": 2, "--cci-n": i } as React.CSSProperties}
            >
              <span className="cci-info__number">0{i + 1}</span>
              <svg className="cci-info__icon" viewBox="0 0 40 40" aria-hidden="true">
                {item.icon}
              </svg>
              <h2>{item.title}</h2>
              <p>{item.body}</p>
            </li>
          ))}
        </ul>

        <div className="cci-action cci-step" style={{ "--cci-at": 3 } as React.CSSProperties}>
          <button type="button" className="cci-begin" onClick={begin} disabled={entering}>
            <span>Begin My Journey</span>
            <ArrowRight size={20} aria-hidden="true" />
          </button>
          <p>Your adventure begins with 12 questions.</p>
          {notice}
        </div>
      </div>
    </div>
  );
}
