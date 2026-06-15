import { useEffect, useState } from "react";

const emojis = ["🎉", "✨", "🌟", "⭐", "🎊", "🔥", "💫", "🏆"];

export function Confetti({ count = 60 }: { count?: number }) {
  const [pieces, setPieces] = useState<Array<{ id: number; left: number; cx: number; delay: number; dur: number; emoji: string }>>([]);
  useEffect(() => {
    setPieces(
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        cx: (Math.random() - 0.5) * 200,
        delay: Math.random() * 0.6,
        dur: 1.6 + Math.random() * 1.4,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      }))
    );
  }, [count]);
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="absolute text-2xl"
          style={{
            left: `${p.left}%`,
            top: 0,
            // @ts-expect-error css var
            "--cx": `${p.cx}px`,
            animation: `confetti-fall ${p.dur}s ${p.delay}s cubic-bezier(.2,.6,.4,1) forwards`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
