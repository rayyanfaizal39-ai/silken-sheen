import { bgPanel, groupGlow, neon, type NeonColor } from "./neon-tokens";

export interface ResearchMethodItem {
  icon: string;
  name: string;
  description: string;
  steps: string[];
}

const ROTATION: NeonColor[] = ["amber", "green", "violet"];

export function ResearchMethodCards({ methods }: { methods: ResearchMethodItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {methods.map((m, i) => {
        const color = neon[ROTATION[i % ROTATION.length]];
        return (
          <div
            key={m.name}
            className="rounded-2xl p-4"
            style={{ background: bgPanel, boxShadow: groupGlow(color, 18, 0.12) }}
          >
            <div className="text-2xl">{m.icon}</div>
            <h4 className="font-display mt-2.5 text-sm font-bold" style={{ color }}>
              {m.name}
            </h4>
            <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{m.description}</p>
            <ol className="mt-3 list-decimal space-y-1.5 pl-4 text-[11px] leading-relaxed text-muted-foreground">
              {m.steps.map((step, j) => (
                <li key={j}>{step}</li>
              ))}
            </ol>
          </div>
        );
      })}
    </div>
  );
}
