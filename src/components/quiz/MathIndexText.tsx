import { Fragment, type ReactNode } from "react";
import type { MathVisualLang } from "@/features/quiz/visuals/mathQuestionVisual";

/** Explicit caret notation only; never guesses whether adjacent letters are powers. */
export function MathIndexText({
  text,
  lang,
}: {
  text: string;
  lang: MathVisualLang;
}) {
  const parts: ReactNode[] = [];
  const power = /\^/g;
  let previous = 0;
  for (const match of text.matchAll(power)) {
    const start = match.index! + 1;
    if (start < previous) continue;
    let end = start;
    let exponent: string;
    if (text[start] === "(") {
      let depth = 1;
      end = start + 1;
      while (end < text.length && depth > 0) {
        if (text[end] === "(") depth += 1;
        if (text[end] === ")") depth -= 1;
        end += 1;
      }
      if (depth !== 0) continue;
      exponent = text.slice(start + 1, end - 1);
    } else {
      const token = /^(-?\d+|[a-z]+|\?)/.exec(text.slice(start));
      if (!token) continue;
      exponent = token[0];
      end = start + exponent.length;
    }
    parts.push(text.slice(previous, match.index));
    parts.push(
      <sup key={match.index} className="text-[0.72em] leading-none">
        <span className="sr-only">
          {lang === "bm" ? " kuasa " : " to the power of "}
        </span>
        {exponent === "?" ? (
          <span className="text-amber-300">?</span>
        ) : (
          exponent
        )}
      </sup>,
    );
    previous = end;
  }
  parts.push(text.slice(previous));
  return <Fragment>{parts}</Fragment>;
}
