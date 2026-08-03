import { useState } from "react";
import { Check } from "lucide-react";
import { MATH_GREEN } from "./mathTheme";

/** Chapter-end self-check checklist — click an item to mark it done. */
export function QuickRevisionChecklist({ items }: { items: string[] }) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  return (
    <div className="mt-4">
      {items.map((item, i) => {
        const isDone = !!done[i];
        return (
          <div
            key={i}
            onClick={() => setDone((d) => ({ ...d, [i]: !d[i] }))}
            className="flex cursor-pointer items-start gap-3 border-b border-white/[0.08] py-3 last:border-b-0"
          >
            <div
              className="mt-0.5 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-md border-[1.5px]"
              style={
                isDone
                  ? { background: MATH_GREEN, borderColor: MATH_GREEN }
                  : { borderColor: "#6b7593" }
              }
            >
              {isDone && <Check className="h-3.5 w-3.5 text-[#050816]" strokeWidth={3} />}
            </div>
            <p
              className={`text-[13.5px] leading-relaxed ${isDone ? "text-slate-500 line-through" : "text-slate-300"}`}
            >
              {item}
            </p>
          </div>
        );
      })}
    </div>
  );
}
