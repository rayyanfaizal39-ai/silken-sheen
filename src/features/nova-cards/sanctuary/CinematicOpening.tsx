import { AudioControls } from "./AudioControls";
import React, { useState, useEffect, useRef } from "react";
import { soundscape } from "./audio";

interface CinematicOpeningProps {
  onStartJourney: () => void;
  onSkipIntro: () => void;
  reducedMotion: boolean;
}

export const CinematicOpening: React.FC<CinematicOpeningProps> = ({
  onStartJourney,
  onSkipIntro,
  reducedMotion,
}) => {
  const [phase, setPhase] = useState<"darkness" | "spark" | "portal" | "revealed">(
    reducedMotion ? "revealed" : "darkness",
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const beginTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (beginTimer.current) clearTimeout(beginTimer.current);
    },
    [],
  );
  useEffect(() => {
    if (reducedMotion) {
      setPhase("revealed");
      return;
    }
    // Stage 1: Darkness to tiny spark
    const t1 = setTimeout(() => {
      setPhase("spark");
    }, 500);

    // Stage 2: Stars ignite & portal opens
    const t2 = setTimeout(() => {
      setPhase("portal");
    }, 2000);

    // Stage 3: World revealed with message & CTA
    const t3 = setTimeout(() => {
      setPhase("revealed");
    }, 3800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [reducedMotion]);

  const handleBegin = () => {
    if (isTransitioning) return;
    soundscape.playStarlightWhisper();
    setIsTransitioning(true);

    beginTimer.current = setTimeout(onStartJourney, reducedMotion ? 0 : 1000);
  };

  return (
    <div className="sanctuary-opening fixed inset-0 z-50 bg-[#05070f] flex items-center justify-center overflow-hidden select-none">
      {/* Background Layer 1: Deep Cosmos & Stars */}
      <div
        className={`absolute inset-0 transition-opacity duration-1000 ${
          phase !== "darkness" ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#171b2a] via-[#090e1c] to-[#05070f]" />

        {/* Ambient Nebula Lights */}
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-[#6001d1]/20 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#3ec1fc]/15 rounded-full blur-[160px] pointer-events-none" />
      </div>

      {/* Background Layer 2: Cosmic Portal Rings & Glowing Trees Silhouette */}
      <div
        className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-1000 ${
          phase === "portal" || phase === "revealed"
            ? "opacity-100 scale-100"
            : "opacity-0 scale-75"
        } ${isTransitioning ? "scale-150 opacity-0 filter blur-lg" : ""}`}
      >
        {/* Outer Armillary Portal Rings */}
        <div className="w-[580px] h-[580px] sm:w-[720px] sm:h-[720px] rounded-full border border-[#f6ca78]/25 animate-spin-slow" />
        <div className="absolute w-[440px] h-[440px] sm:w-[560px] sm:h-[560px] rounded-full border border-dashed border-[#6001d1]/40 animate-spin-slow-reverse" />
        <div className="absolute w-[320px] h-[320px] sm:w-[400px] sm:h-[400px] rounded-full border border-[#3ec1fc]/30" />

        {/* Volumetric Starlight Rays from the Center */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <div className="w-[2px] h-[180vh] bg-gradient-to-t from-transparent via-[#f6ca78]/40 to-transparent rotate-45 transform pointer-events-none" />
          <div className="w-[2px] h-[180vh] bg-gradient-to-t from-transparent via-[#6001d1]/30 to-transparent -rotate-45 transform pointer-events-none" />
          <div className="w-[2px] h-[180vh] bg-gradient-to-t from-transparent via-[#3ec1fc]/30 to-transparent rotate-12 transform pointer-events-none" />
        </div>

        {/* Silhouette of Enchanted Glowing Forest at the Horizon */}
        <div
          className={`absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-[#05070f] via-[#090e1c]/80 to-transparent flex items-end justify-center transition-opacity duration-1000 ${
            phase === "revealed" ? "opacity-80" : "opacity-0"
          }`}
        >
          <svg
            className="w-full max-w-4xl h-48 opacity-40 text-[#3ec1fc]"
            viewBox="0 0 1000 200"
            fill="none"
          >
            <path
              d="M100 200 C120 140 110 80 130 30 C135 15 150 10 160 30 C180 80 170 140 190 200 Z"
              fill="currentColor"
            />
            <circle cx="145" cy="40" r="45" fill="currentColor" fillOpacity="0.25" />
            <path
              d="M820 200 C835 130 840 90 855 40 C860 20 875 20 885 40 C900 90 905 130 920 200 Z"
              fill="currentColor"
            />
            <circle cx="870" cy="50" r="50" fill="currentColor" fillOpacity="0.2" />
            <path
              d="M480 200 C490 140 495 90 500 50 C505 30 515 30 520 50 C525 90 530 140 540 200 Z"
              fill="#d8af60"
            />
            <circle cx="510" cy="55" r="40" fill="#d8af60" fillOpacity="0.3" />
          </svg>
        </div>
      </div>

      {/* The Central Golden Light Spark */}
      <div
        className={`relative z-20 flex flex-col items-center justify-center transition-all duration-1000 ${
          isTransitioning ? "scale-150 opacity-0" : "scale-100 opacity-100"
        }`}
      >
        <div
          className={`rounded-full transition-all duration-1000 flex items-center justify-center ${
            phase === "darkness"
              ? "w-1 h-1 opacity-0 bg-[#f6ca78]"
              : phase === "spark"
                ? "w-4 h-4 bg-[#f6ca78] shadow-[0_0_40px_rgba(246,202,120,1),0_0_80px_rgba(246,202,120,0.8)] animate-pulse"
                : "w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-tr from-[#6001d1] via-[#171b2a] to-[#f6ca78] border border-[#f6ca78]/80 shadow-[0_0_60px_rgba(246,202,120,0.6)]"
          }`}
        >
          {phase === "revealed" && (
            <img
              src="/branding/academy-icon.png"
              alt=""
              width="48"
              height="48"
              className="rounded-xl"
            />
          )}
        </div>
      </div>

      {/* Cinematic Reveal Text & Action Button */}
      <div
        className={`absolute inset-x-4 bottom-16 sm:bottom-24 z-30 flex flex-col items-center text-center transition-all duration-1000 ${
          phase === "revealed" && !isTransitioning
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6 pointer-events-none"
        }`}
      >
        <h1
          tabIndex={-1}
          className="font-headline text-2xl sm:text-4xl lg:text-5xl text-[#dfe1f6] font-medium tracking-wide max-w-2xl leading-relaxed mb-8 drop-shadow-[0_2px_20px_rgba(7,11,25,0.9)]"
        >
          "Somewhere beyond the stars, a companion is waiting for you."
        </h1>

        <button
          disabled={isTransitioning || phase !== "revealed"}
          onClick={handleBegin}
          className="px-10 py-4 rounded-2xl bg-gradient-to-r from-[#d8af60] via-[#f6ca78] to-[#ffdea5] text-[#412d00] font-label text-xs sm:text-sm uppercase tracking-[0.25em] font-bold shadow-[0_0_35px_rgba(246,202,120,0.5)] hover:brightness-110 active:scale-95 transition-all duration-300 flex items-center gap-3 cursor-pointer"
        >
          <span>Begin Your Journey</span>
          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4-6.2-4.5-6.2 4.5 2.4-7.4L2 9.4h7.6z" />
          </svg>
        </button>
      </div>

      {/* Top Right Discreet Skip Intro & Audio Controls */}
      <div className="absolute top-6 right-6 z-40 flex items-center gap-3">
        <AudioControls />

        <button
          onClick={() => {
            soundscape.playStarlightWhisper();
            onSkipIntro();
          }}
          className="text-xs font-label uppercase tracking-widest text-[#d1c5b3] hover:text-[#f6ca78] px-3.5 py-2 rounded-xl bg-[#090e1c]/80 backdrop-blur-md border border-[#303444] hover:border-[#f6ca78]/40 transition-colors cursor-pointer"
        >
          Skip Intro
        </button>
      </div>
    </div>
  );
};
