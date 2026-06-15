import { useEffect, useRef } from "react";

const FADE_DURATION = 0.5;

export function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tick = () => {
      if (video.duration && !isNaN(video.duration)) {
        const t = video.currentTime;
        const d = video.duration;
        let opacity = 1;
        if (t < FADE_DURATION) {
          opacity = t / FADE_DURATION;
        } else if (t > d - FADE_DURATION) {
          opacity = Math.max(0, (d - t) / FADE_DURATION);
        }
        video.style.opacity = String(opacity);
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      setTimeout(() => {
        video.currentTime = 0;
        void video.play();
      }, 100);
    };

    video.addEventListener("ended", handleEnded);
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <div className="relative min-h-svh w-full overflow-hidden bg-white font-body">
      {/* Video Background */}
      <div
        className="absolute z-0"
        style={{ top: "300px", inset: "auto 0 0 0" }}
      >
        <video
          ref={videoRef}
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_083109_283f3553-e28f-428b-a723-d639c617eb2b.mp4"
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ opacity: 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 max-w-7xl mx-auto flex justify-between items-center px-8 py-6">
        <a
          href="#"
          className="font-display text-3xl tracking-tight"
          style={{ color: "#000000" }}
        >
          Aethera<sup className="text-xs">®</sup>
        </a>
        <ul className="hidden md:flex items-center gap-8 text-sm">
          {[
            { label: "Home", color: "#000000" },
            { label: "Studio", color: "#6F6F6F" },
            { label: "About", color: "#6F6F6F" },
            { label: "Journal", color: "#6F6F6F" },
            { label: "Reach Us", color: "#6F6F6F" },
          ].map((item) => (
            <li key={item.label}>
              <a
                href="#"
                className="transition-colors hover:opacity-70"
                style={{ color: item.color }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          className="rounded-full px-6 py-2.5 text-sm transition-transform hover:scale-[1.03]"
          style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
        >
          Begin Journey
        </button>
      </nav>

      {/* Hero */}
      <section
        className="relative z-10 flex flex-col items-center justify-center text-center px-6 pb-40"
        style={{ paddingTop: "calc(8rem - 75px)" }}
      >
        <h1
          className="font-display font-normal text-5xl sm:text-7xl md:text-8xl max-w-7xl animate-fade-rise"
          style={{
            color: "#000000",
            lineHeight: 0.95,
            letterSpacing: "-2.46px",
          }}
        >
          Beyond <em style={{ color: "#6F6F6F" }}>silence,</em> we build{" "}
          <em style={{ color: "#6F6F6F" }}>the eternal.</em>
        </h1>

        <p
          className="text-base sm:text-lg max-w-2xl mt-8 leading-relaxed animate-fade-rise-delay"
          style={{ color: "#6F6F6F" }}
        >
          Building platforms for brilliant minds, fearless makers, and thoughtful
          souls. Through the noise, we craft digital havens for deep work and
          pure flows.
        </p>

        <button
          className="rounded-full px-14 py-5 text-base mt-12 transition-transform hover:scale-[1.03] animate-fade-rise-delay-2"
          style={{ backgroundColor: "#000000", color: "#FFFFFF" }}
        >
          Begin Journey
        </button>
      </section>
    </div>
  );
}
