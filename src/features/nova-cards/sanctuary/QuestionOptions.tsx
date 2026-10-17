import type { CSSProperties } from "react";
import { soundscape } from "./audio";
import type { LearningQuizQuestion } from "./questions";

const creatures = [
  {
    name: "Phoenix",
    art: "phoenix",
    description: "A legendary companion born from magical flames.",
    caption: "THE EMBERBORN",
    hue: "#dfa87d",
  },
  {
    name: "Magical Fox",
    art: "fox",
    description: "A mystical companion filled with wisdom and wonder.",
    caption: "THE STARKEEPER",
    hue: "#82cadf",
  },
];
const marks = ["✦", "⌁", "☾"];
function Detail({ question, index }: { question: number; index: number }) {
  if (question === 4)
    return (
      <span
        aria-hidden="true"
        className="nova-colour-swatch"
        style={{
          background: [
            "linear-gradient(125deg,#15101f 35%,#9560e8)",
            "linear-gradient(125deg,#2776c1 35%,#efc46d)",
            "linear-gradient(125deg,#f3e8db 35%,#d78da6)",
          ][index],
        }}
      >
        <i />
        <i />
      </span>
    );
  if (question === 6)
    return (
      <img
        className="nova-habitat-art"
        src={`/nova/creatures/${["islands", "lagoon", "forest"][index]}.svg`}
        alt=""
        width="260"
        height="180"
        loading="lazy"
        decoding="async"
      />
    );
  if (question === 8)
    return (
      <svg className="nova-eye-detail" aria-hidden="true" viewBox="0 0 120 80">
        <defs>
          <radialGradient id={`eye-${index}`}>
            <stop stopColor={["#d6b3ff", "#fff0b2", "#c3ffff"][index]} />
            <stop offset=".6" stopColor={["#7653ae", "#ca9a43", "#408fae"][index]} />
            <stop offset="1" stopColor="#172038" />
          </radialGradient>
        </defs>
        <path
          d="M10 43 Q60 3 110 43 Q60 76 10 43"
          fill="#11162a"
          stroke="#d7c49a"
          strokeWidth="1.5"
        />
        <circle cx="60" cy="41" r="25" fill={`url(#eye-${index})`} />
        <ellipse cx="60" cy="42" rx="10" ry="20" fill="#0b1022" />
        <circle cx="50" cy="30" r="7" fill="#fff" />
        <circle cx="73" cy="49" r="3" fill="#fff" />
        <path d="M30 42 L36 44 M83 30 l4-4 M83 50 l4 4" stroke="#fff" opacity=".7" />
      </svg>
    );
  if (question === 2)
    return (
      <svg className={`nova-element-art element-${index}`} aria-hidden="true" viewBox="0 0 90 90">
        <circle cx="45" cy="45" r="36" fill="currentColor" opacity=".06" />
        <circle cx="45" cy="45" r="30" stroke="currentColor" fill="none" opacity=".15" />
        {index === 0 ? (
          <>
            <path
              d="M47 12 Q70 39 63 58 Q60 75 44 76 Q18 72 25 49 Q29 39 35 35 Q34 53 41 50 Q47 42 47 12"
              fill="currentColor"
            />
            <path d="M46 45 Q60 63 45 70 Q33 69 37 59Z" fill="#ffe6b0" />
          </>
        ) : index === 1 ? (
          <>
            <path d="M45 13 Q74 47 65 62 Q58 79 42 75 Q18 71 24 49Z" fill="currentColor" />
            <path
              d="M31 54 Q26 66 42 69"
              stroke="#d7ffff"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
            />
          </>
        ) : (
          <>
            <path
              d="M45 11 L52 35 L77 43 L52 51 L45 77 L37 51 L13 43 L37 35Z"
              fill="currentColor"
            />
            <path d="M70 10 l2 7 7 2 -7 2 -2 7 -2-7 -7-2 7-2Z" fill="#fff1b4" />
          </>
        )}
      </svg>
    );
  return (
    <span
      aria-hidden="true"
      className={`nova-option-symbol ${question === 11 ? "nova-pact-symbol" : ""}`}
    >
      {question === 9
        ? marks[index]
        : question === 11
          ? ["✧", "∞", "◇"][index]
          : question === 0
            ? ["✧", "♡", "⌕"][index]
            : question === 5
              ? ["☀", "≋", "✦"][index]
              : question === 10
                ? ["↗", "✺", "◈"][index]
                : ["✦", "❋", "☾"][index]}
    </span>
  );
}
export function QuestionOptions({
  question,
  index,
  selected,
  clicked,
  disabled,
  onSelect,
}: {
  question: LearningQuizQuestion;
  index: number;
  selected: number | undefined;
  clicked: number | null;
  disabled: boolean;
  onSelect: (answer: number) => void;
}) {
  const creature = index === 1;
  return (
    <div
      className={`nova-question-options ${creature ? "nova-creature-choices" : `nova-detail-choices nova-question-${index}`}`}
    >
      {question.options.map((option, i) => {
        const entry = creature ? creatures[i] : null;
        const active = clicked === i || selected === i;
        return (
          <button
            key={option.text}
            type="button"
            data-nova-answer={i}
            data-selected={active}
            aria-pressed={active}
            aria-label={option.text}
            disabled={disabled}
            onClick={() => onSelect(i)}
            onMouseEnter={() => void soundscape.play("hover")}
            onFocus={() => void soundscape.play("hover")}
            className={`nova-choice ${creature ? "nova-creature-choice" : "nova-detail-choice"}`}
            style={
              {
                "--choice-hue": entry?.hue ?? ["#e9ae75", "#80cbe5", "#b59ce4"][i],
              } as CSSProperties
            }
          >
            {entry ? (
              <>
                <div className="nova-creature-portrait">
                  <img
                    src={`/nova/creatures/${entry.art}.svg`}
                    alt=""
                    width="512"
                    height="420"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="nova-portrait-mist" />
                  <span className="nova-creature-sigil" aria-hidden="true">
                    {i === 0 ? "✦" : "☾"}
                  </span>
                </div>
                <span className="nova-creature-copy">
                  <small>{entry.caption}</small>
                  <strong>{entry.name}</strong>
                  <span>{entry.description}</span>
                </span>
              </>
            ) : (
              <>
                <Detail question={index} index={i} />
                <strong>{option.text}</strong>
              </>
            )}
            <span className="nova-choice-check" aria-hidden="true">
              {active ? "✓" : "+"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
