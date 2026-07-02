import earthBg from "@/assets/orbital-earth-bg.png.asset.json";

/**
 * Full-viewport cinematic backdrop for the home / command deck.
 * Fixed layer sits behind AppShell content, adds a soft Earth-horizon vista,
 * a subtle vignette, and a slow scan-line for that "living observation deck" feel.
 * Motion is disabled under prefers-reduced-motion.
 */
export function OrbitalBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Deep-space base */}
      <div className="absolute inset-0 bg-[#020617]" />

      {/* Earth horizon vista */}
      <img
        src={earthBg.url}
        alt=""
        loading="eager"
        decoding="async"
        className="absolute inset-x-0 top-0 h-[92vh] w-full object-cover opacity-90"
        style={{ objectPosition: "center 35%" }}
      />

      {/* Cinematic top-fade + strong bottom-fade so content stays legible */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/25 via-[#020617]/70 to-[#020617]" />

      {/* Soft cyan bloom near the horizon */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 45% at 50% 62%, rgba(56,189,248,0.14), transparent 70%)",
        }}
      />

      {/* Very faint scan line (cinematic HUD hint) */}
      <div className="orbital-scanline absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
    </div>
  );
}
