import { useId } from "react";
import type { MathLang } from "./mathNotesChrome";
import { chrome } from "./mathNotesChrome";
import { MATH_GREEN, MATH_ORANGE, MATH_VIOLET } from "./mathTheme";

/**
 * Static illustrative SVG for proportion cross-multiplication — two fraction
 * stacks with diagonal arrows showing numerator1 × denominator2 = denominator1
 * × numerator2. Purely illustrative (parameterized by the 4 values), not a
 * calculator — reused per worked example by passing different numbers.
 */
export function CrossMultiplyVisual({
  lang,
  numerator1,
  denominator1,
  numerator2,
  denominator2,
}: {
  lang: MathLang;
  numerator1: number;
  denominator1: number;
  numerator2: number;
  denominator2: number;
}) {
  const product = numerator1 * denominator2;
  const uid = useId();
  const arrowVId = `crossMultArrowV-${uid}`;
  const arrowOId = `crossMultArrowO-${uid}`;
  return (
    <div className="mt-4 flex flex-col items-center">
      <svg viewBox="0 0 320 140" className="w-full max-w-[320px]">
        <text
          x="80"
          y="40"
          fontSize="20"
          fill="#eef1fb"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
        >
          {numerator1}
        </text>
        <line x1="55" y1="50" x2="105" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth={2} />
        <text
          x="80"
          y="72"
          fontSize="20"
          fill="#eef1fb"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
        >
          {denominator1}
        </text>
        <text
          x="160"
          y="56"
          fontSize="22"
          fill="#6b7593"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
        >
          =
        </text>
        <text
          x="240"
          y="40"
          fontSize="20"
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
        >
          {numerator2}
        </text>
        <line x1="205" y1="50" x2="275" y2="50" stroke="rgba(255,255,255,0.4)" strokeWidth={2} />
        <text
          x="240"
          y="72"
          fontSize="20"
          fill={MATH_GREEN}
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="700"
        >
          {denominator2}
        </text>
        <line
          x1="105"
          y1="35"
          x2="205"
          y2="65"
          stroke={MATH_VIOLET}
          strokeWidth={2}
          strokeDasharray="4,3"
          markerEnd={`url(#${arrowVId})`}
        />
        <line
          x1="105"
          y1="65"
          x2="205"
          y2="35"
          stroke={MATH_ORANGE}
          strokeWidth={2}
          strokeDasharray="4,3"
          markerEnd={`url(#${arrowOId})`}
        />
        <text
          x="160"
          y="110"
          fontSize="12"
          fill="#6b7593"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
        >
          {numerator1} × {denominator2} = {denominator1} × {numerator2} = {product}
        </text>
        <defs>
          <marker id={arrowVId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={MATH_VIOLET} />
          </marker>
          <marker id={arrowOId} markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
            <path d="M0,0 L6,3 L0,6 Z" fill={MATH_ORANGE} />
          </marker>
        </defs>
      </svg>
      <p className="mt-2 text-center text-[11.5px] text-slate-500">
        {chrome("crossMultCaption", lang)}
      </p>
    </div>
  );
}
