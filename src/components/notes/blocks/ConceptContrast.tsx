import type { ConceptContrastBlock } from "@/content/form2/science/interactive-types";

/**
 * Two concepts learners routinely fuse into one, set side by side.
 *
 * The distinguishing question sits above each definition rather than below it,
 * so the contrast is readable before either definition is. On narrow screens
 * the columns stack but keep their colours, which is what carries the
 * distinction once they are no longer adjacent.
 */
export function ConceptContrast({ block }: { block: ConceptContrastBlock }) {
  const sides = [
    {
      side: block.left,
      tone: "border-sky-400/35 bg-sky-500/10",
      accent: "text-sky-300",
    },
    {
      side: block.right,
      tone: "border-amber-400/35 bg-amber-500/10",
      accent: "text-amber-300",
    },
  ];

  return (
    <div className="rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/10 to-accent/5 p-3.5">
      {block.instruction && (
        <p className="mb-2.5 text-[13px] leading-relaxed text-muted-foreground">
          {block.instruction}
        </p>
      )}

      <div className="grid gap-2.5 sm:grid-cols-2">
        {sides.map(({ side, tone, accent }) => (
          <div key={side.id} className={`flex flex-col rounded-xl border px-3 py-2.5 ${tone}`}>
            <p className="font-display text-[14px] font-bold text-foreground">
              {side.icon && <span className="mr-1">{side.icon}</span>}
              {side.term}
            </p>
            <p className={`mt-1 text-[11.5px] font-bold uppercase tracking-wide ${accent}`}>
              {side.question}
            </p>
            <p className="mt-1.5 text-[12.5px] leading-relaxed text-foreground">
              {side.definition}
            </p>
            <ul className="mt-2 flex flex-col gap-1">
              {side.examples.map((ex) => (
                <li
                  key={ex}
                  className="text-[12px] leading-relaxed text-muted-foreground before:mr-1.5 before:content-['•']"
                >
                  {ex}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-2.5 rounded-xl border border-primary/25 bg-primary/10 px-3 py-2 text-[12.5px] leading-relaxed text-foreground">
        {block.keyPoint}
      </p>
    </div>
  );
}
