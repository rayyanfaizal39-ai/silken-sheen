export function ParticleBg() {
  const dots = Array.from({ length: 28 });
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {dots.map((_, i) => {
        const size = 2 + (i % 4);
        const left = (i * 37) % 100;
        const top = (i * 53) % 100;
        const delay = (i % 8) * 0.6;
        const dur = 8 + (i % 6);
        const purple = i % 3 === 0;
        return (
          <span
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
              background: purple ? "oklch(0.7 0.22 295)" : "oklch(0.7 0.2 265)",
              boxShadow: `0 0 ${size * 4}px currentColor`,
              color: purple ? "oklch(0.7 0.22 295)" : "oklch(0.7 0.2 265)",
              opacity: 0.5,
              animation: `float ${dur}s ease-in-out ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}
