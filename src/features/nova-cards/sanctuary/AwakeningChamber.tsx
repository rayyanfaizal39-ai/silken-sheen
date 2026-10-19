import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import { CompanionGarden } from "../../cosmic-companion/CompanionGarden";
import { QUESTIONS, answerOptionIndex, type NovaTraits } from "../model";
import { NovaEgg } from "./NovaEgg";
import "./awakening-chamber.css";

/** Accent colours for the element the student actually chose. */
const ELEMENT_TONE: Record<string, string> = {
  Fire: "#fb923c",
  Water: "#60a5fa",
  Starlight: "#f6ca78",
  Wind: "#5eead4",
};

/** Swatches for the existing colour options, so the card shows the student's real palette. */
const COLOUR_SWATCHES: Record<string, [string, string]> = {
  "Obsidian Black / Violet": ["#1f1633", "#8b5cf6"],
  "Sapphire Blue / Gold": ["#2563eb", "#f6ca78"],
  "Pearl / Rose": ["#f1ece4", "#f9a8c4"],
  "Emerald Green / Silver": ["#10b981", "#d4d4d8"],
};

const ELEMENT_ICONS: Record<string, ReactNode> = {
  Fire: (
    <path d="M12 3c1 4 5 5.5 5 10a5 5 0 0 1-10 0c0-2.4 1.4-3.6 2.4-5 .3 1.6 1 2.4 1.9 2.8C11 8.6 11 6 12 3Z" />
  ),
  Water: <path d="M12 3.5c3 4 5.5 7.2 5.5 10.2a5.5 5.5 0 0 1-11 0C6.5 10.7 9 7.5 12 3.5Z" />,
  Starlight: <path d="M12 3.5 13.9 10l6.6 2-6.6 2L12 20.5 10.1 14l-6.6-2 6.6-2Z" />,
  Wind: <path d="M4 9h10a3 3 0 1 0-3-3M4 13h14a3 3 0 1 1-3 3M4 17h6" strokeLinecap="round" />,
};

type IdentityCard = {
  label: string;
  value: string;
  caption: string;
  tone: string;
  icon: ReactNode;
};

function identityCards(traits: NovaTraits, answers: number[]): IdentityCard[] {
  const firstChoice = QUESTIONS[0].options[answerOptionIndex(0, answers[0])];
  const swatch = COLOUR_SWATCHES[traits.colours];
  return [
    {
      label: "Personality",
      value: traits.personality,
      caption: `Revealed by “${firstChoice}”.`,
      tone: "#a78bfa",
      icon: (
        <>
          <circle cx="12" cy="12" r="8.5" />
          <path d="m15.2 8.8-2 4.4-4.4 2 2-4.4Z" />
        </>
      ),
    },
    {
      label: "Challenge approach",
      value: traits.approach,
      caption: "How you meet a new challenge.",
      tone: "#c084fc",
      icon: <path d="M5 19c3-1 3-5 7-6s4-5 7-6M17 5h2v2" strokeLinecap="round" />,
    },
    {
      label: "Magical gift",
      value: traits.ability,
      caption: "The gift your companion shares.",
      tone: "#f6ca78",
      icon: (
        <>
          <path d="M12 4 13.4 9l5 1.5-5 1.5L12 17l-1.4-5-5-1.5 5-1.5Z" />
          <path d="M18 16.5 18.6 18l1.4.6-1.4.6-.6 1.4-.6-1.4-1.4-.6 1.4-.6Z" />
        </>
      ),
    },
    {
      label: "Temperament",
      value: traits.behaviour,
      caption: "How your companion greets a stranger.",
      tone: "#5eead4",
      icon: (
        <path d="M12 19s-6.5-3.9-6.5-8.6A3.6 3.6 0 0 1 12 8.5a3.6 3.6 0 0 1 6.5 1.9C18.5 15.1 12 19 12 19Z" />
      ),
    },
    {
      label: "Element affinity",
      value: traits.element,
      caption: "The element that feels like you.",
      tone: ELEMENT_TONE[traits.element] ?? "#a78bfa",
      icon: ELEMENT_ICONS[traits.element] ?? ELEMENT_ICONS.Starlight,
    },
    {
      label: "Colour essence",
      value: traits.colours,
      caption: "The colours of your companion's light.",
      tone: swatch?.[1] ?? "#f6ca78",
      icon: swatch ? (
        <>
          <circle cx="9.5" cy="12" r="5" fill={swatch[0]} />
          <circle cx="14.5" cy="12" r="5" fill={swatch[1]} fillOpacity=".9" />
        </>
      ) : (
        <circle cx="12" cy="12" r="6" />
      ),
    },
  ];
}

/** The remaining traits, kept one tap away for students who want every detail. */
function moreTraits(traits: NovaTraits): [string, string][] {
  return [
    ["Creature", traits.creature],
    ["Silhouette", traits.appearance],
    ["Habitat", traits.habitat],
    ["Eyes", traits.eyes],
    ["Signature detail", traits.marking],
    ["Bond", traits.bond],
  ];
}

/**
 * The awakening chamber shown after the 12th answer. It presents the student's computed traits;
 * every action (nickname, continue, review) is still handled by the Studio's existing logic.
 */
export function AwakeningChamber({
  traits,
  answers,
  calm,
  intro,
  nickname,
  continueLabel,
  continueDisabled,
  onContinue,
  notice,
  backLabel,
  backDisabled = false,
  onBack,
}: {
  traits: NovaTraits;
  answers: number[];
  calm: boolean;
  /** Supporting copy for the identity panel; changes while the identity is being confirmed. */
  intro: string;
  /** The existing nickname field, when the Studio still needs one. */
  nickname?: ReactNode;
  continueLabel: string;
  continueDisabled: boolean;
  onContinue: () => void;
  notice?: ReactNode;
  backLabel?: string;
  backDisabled?: boolean;
  onBack?: () => void;
}) {
  const [glowing, setGlowing] = useState(false);
  const glowTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (glowTimer.current) clearTimeout(glowTimer.current);
    },
    [],
  );
  const cards = identityCards(traits, answers);

  return (
    <section className="cca" data-calm={calm} data-glow={glowing} aria-labelledby="cca-title">
      <div className="cca-garden" aria-hidden="true">
        <CompanionGarden />
      </div>

      <div className="cca-awakening">
        <p className="cca-crest">
          <span aria-hidden="true">✦</span> Cosmic Companion <span aria-hidden="true">✦</span>
        </p>
        <h1 id="cca-title" tabIndex={-1}>
          Your Cosmic Connection <span>Has Awakened</span>
        </h1>
        <p className="cca-lead">
          Your twelve choices have revealed something extraordinary. A companion is waiting to meet
          you.
        </p>
        <NovaEgg phase="awakening" />
      </div>

      <div className="cca-panel">
        <header className="cca-panel__head">
          <span className="cca-panel__badge" aria-hidden="true">
            <Sparkles size={22} />
          </span>
          <div>
            <h2>Your Cosmic Identity</h2>
            <p>{intro}</p>
          </div>
        </header>

        <dl className="cca-traits">
          {cards.map((card, i) => (
            <div
              key={card.label}
              className="cca-trait"
              style={{ "--cca-tone": card.tone, "--cca-n": i } as React.CSSProperties}
            >
              <svg className="cca-trait__icon" viewBox="0 0 24 24" aria-hidden="true">
                {card.icon}
              </svg>
              <dt>{card.label}</dt>
              <dd>
                <b>{card.value}</b>
                <small>{card.caption}</small>
              </dd>
            </div>
          ))}
        </dl>

        <details className="cca-more">
          <summary>
            Explore all traits <ChevronDown size={16} aria-hidden="true" />
          </summary>
          <dl>
            {moreTraits(traits).map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </details>

        {nickname}
        {notice}

        <button
          type="button"
          className="cca-continue"
          disabled={continueDisabled}
          onClick={() => {
            if (!calm) {
              setGlowing(true);
              if (glowTimer.current) clearTimeout(glowTimer.current);
              glowTimer.current = setTimeout(() => setGlowing(false), 1100);
            }
            onContinue();
          }}
        >
          <Sparkles size={20} aria-hidden="true" />
          <span>{continueLabel}</span>
          <ArrowRight size={20} aria-hidden="true" />
        </button>
        {onBack && backLabel && (
          <button type="button" className="cca-back" disabled={backDisabled} onClick={onBack}>
            ← {backLabel}
          </button>
        )}
      </div>
    </section>
  );
}
