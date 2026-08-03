import { MATH_VIOLET } from "./mathTheme";

/**
 * The single bold visual highlight per subtopic — violet gradient card, large
 * centered formula, optional legend explaining each term.
 */
export function FormulaCard({
  eyebrow,
  formula,
  legend,
}: {
  eyebrow: string;
  formula: string;
  legend?: { label: string; text: string }[];
}) {
  return (
    <div
      className="mt-4 rounded-2xl border p-6 text-center sm:p-7"
      style={{
        background: "linear-gradient(135deg, rgba(139,107,255,0.12), rgba(79,176,255,0.08))",
        borderColor: "rgba(139,107,255,0.3)",
      }}
    >
      <div
        className="font-display mb-3 text-[11px] font-bold uppercase tracking-wider"
        style={{ color: MATH_VIOLET }}
      >
        {eyebrow}
      </div>
      <div className="font-display text-xl font-bold leading-snug text-[#eef1fb] sm:text-[26px]">
        {formula}
      </div>
      {legend && legend.length > 0 && (
        <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 border-t border-white/[0.08] pt-4">
          {legend.map((item) => (
            <div key={item.label} className="text-left text-[12.5px] text-slate-400">
              <b className="font-display mr-1 font-semibold text-[#eef1fb]">{item.label}</b>
              {item.text}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
