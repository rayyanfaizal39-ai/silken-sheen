import type { CSSProperties } from "react";
export function ConfettiBurst({ calm }: { calm: boolean }) {
  if (calm) return null;
  return (
    <div className="sanctuary-confetti" aria-hidden="true">
      {Array.from({ length: 70 }, (_, i) => (
        <i
          key={i}
          style={
            {
              "--x": `${(i * 37) % 100}%`,
              "--drift": `${((i * 71) % 280) - 140}px`,
              "--delay": `${(i % 9) * 0.035}s`,
              background: ["#f6ca78", "#d8af60", "#3ec1fc", "#ffffff"][i % 4],
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
