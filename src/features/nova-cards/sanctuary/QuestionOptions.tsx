import { soundscape } from "./audio";
import type { LearningQuizQuestion } from "./questions";

export function QuestionOptions({
  question,
  selected,
  clicked,
  disabled,
  onSelect,
}: {
  question: LearningQuizQuestion;
  selected: number | undefined;
  clicked: number | null;
  disabled: boolean;
  onSelect: (answer: number) => void;
}) {
  return (
    <div className="nova-question-options">
      {question.options.map((option, i) => {
        const active = clicked === i || selected === i;
        return (
          <button
            key={option.text}
            type="button"
            data-nova-answer={i}
            data-selected={active}
            aria-pressed={active}
            disabled={disabled}
            onClick={() => onSelect(i)}
            onMouseEnter={() => void soundscape.play("hover")}
            onFocus={() => void soundscape.play("hover")}
            className="nova-text-choice"
          >
            {option.text}
          </button>
        );
      })}
    </div>
  );
}
