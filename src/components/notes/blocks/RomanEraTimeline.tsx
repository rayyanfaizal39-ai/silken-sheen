import { neon, type NeonColor } from "./neon-tokens";

export interface RomanEraItem {
  name: string;
  duration: string;
}

const ROTATION: NeonColor[] = ["violet", "blue", "amber"];

export function RomanEraTimeline({ eras }: { eras: RomanEraItem[] }) {
  return (
    <div className="flex items-start">
      {eras.map((era, i) => {
        const color = neon[ROTATION[i % ROTATION.length]];
        return (
          <div key={era.name} className="relative flex-1 text-center">
            {i < eras.length - 1 && (
              <div className="absolute left-1/2 top-2 h-0.5 w-full" style={{ background: "rgba(148,163,184,0.14)" }} />
            )}
            <div
              className="relative z-10 mx-auto mb-2 h-4 w-4 rounded-full"
              style={{ background: color, boxShadow: `0 0 8px ${color}99` }}
            />
            <h5 className="font-display text-xs font-bold text-foreground">{era.name}</h5>
            <p className="text-[10px] text-muted-foreground">{era.duration}</p>
          </div>
        );
      })}
    </div>
  );
}
