import { MATH_ORANGE } from "./mathTheme";

/** Chapter-end exam tips list. */
export function ExamTips({ tips }: { tips: string[] }) {
  return (
    <ul className="mt-3 space-y-2.5">
      {tips.map((tip, i) => (
        <li key={i} className="flex items-start gap-2.5 text-[13px] leading-relaxed text-slate-400">
          <span className="mt-0.5 font-bold" style={{ color: MATH_ORANGE }}>
            →
          </span>
          <span>{tip}</span>
        </li>
      ))}
    </ul>
  );
}
