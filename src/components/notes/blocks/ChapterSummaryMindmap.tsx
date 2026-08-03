import { MATH_VIOLET } from "./mathTheme";

export interface MindmapBranch {
  title: string;
  points: string[];
}

/** Chapter-end summary mindmap: a center topic with a few branch cards. */
export function ChapterSummaryMindmap({
  center,
  branches,
}: {
  center: string;
  branches: MindmapBranch[];
}) {
  return (
    <div className="mt-4 flex flex-col items-center">
      <div
        className="font-display rounded-2xl px-6 py-3.5 text-[15px] font-bold text-white"
        style={{ background: `linear-gradient(135deg, ${MATH_VIOLET}, #4fb0ff)` }}
      >
        {center}
      </div>
      <div className="mt-5 grid w-full gap-3.5 sm:grid-cols-3">
        {branches.map((b) => (
          <div
            key={b.title}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-3.5"
          >
            <h5 className="font-display mb-2 text-[13px] font-bold" style={{ color: MATH_VIOLET }}>
              {b.title}
            </h5>
            <ul className="space-y-1">
              {b.points.map((p, i) => (
                <li
                  key={i}
                  className={`text-[12px] leading-relaxed text-slate-400 ${i > 0 ? "border-t border-dashed border-white/[0.08] pt-1" : ""}`}
                >
                  {p}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
