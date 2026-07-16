import { bgPanel, neon, type NeonColor } from "./neon-tokens";

export interface LeadershipCategoryItem {
  category: string;
  points: string[];
}

const ROTATION: NeonColor[] = ["violet", "blue", "amber", "green"];

export function LeadershipCategoryGrid({ categories }: { categories: LeadershipCategoryItem[] }) {
  return (
    <div className="grid gap-3.5 sm:grid-cols-2">
      {categories.map((c, i) => (
        <div key={c.category} className="rounded-xl p-4" style={{ background: bgPanel }}>
          <h5 className="font-display mb-2 text-[13px] font-bold" style={{ color: neon[ROTATION[i % ROTATION.length]] }}>
            {c.category}
          </h5>
          <ul className="list-disc space-y-1.5 pl-4 text-[10.5px] leading-relaxed text-muted-foreground">
            {c.points.map((p, j) => (
              <li key={j}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
