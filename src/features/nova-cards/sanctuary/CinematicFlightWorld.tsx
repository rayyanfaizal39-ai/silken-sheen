import { AudioControls } from "./AudioControls";
import { QuestionOptions } from "./QuestionOptions";
import { answerOptionIndex, answerValue } from "../model";
import React, { useState, useEffect, useRef } from "react";
import { ACADEMY_LEARNING_QUESTIONS, LearningQuizQuestion } from "./questions";
import { soundscape } from "./audio";

interface CinematicFlightWorldProps {
  currentQuestionIndex: number;
  answers: Record<number, number>;
  onSelectAnswer: (questionId: number, optionIndex: number) => Promise<boolean>;
  busy: boolean;
  onPrevQuestion: () => void;
  onCompleteJourney: () => void;
  reducedMotion: boolean;
  /** Guests' answers live only on this page, so the screen must not promise saving. */
  guest?: boolean;
}

export const CinematicFlightWorld: React.FC<CinematicFlightWorldProps> = ({
  currentQuestionIndex,
  busy,
  answers,
  onSelectAnswer,
  onPrevQuestion,
  onCompleteJourney,
  reducedMotion,
  guest = false,
}) => {
  const currentQ: LearningQuizQuestion = ACADEMY_LEARNING_QUESTIONS[currentQuestionIndex];
  const selectedOptionIdx = answerOptionIndex(currentQuestionIndex, answers[currentQ.id]);

  // Camera transit state: 'idle' | 'traveling'
  const [isTraveling, setIsTraveling] = useState(false);
  const [justClickedIdx, setJustClickedIdx] = useState<number | null>(null);
  const clickedQuestion = useRef(-1);
  const [shockwaveActive, setShockwaveActive] = useState(false);
  const [shockwaveColor, setShockwaveColor] = useState("rgba(246, 202, 120, 0.7)");

  // Mouse tilt parallax
  const mouseTiltRef = useRef({ x: 0, y: 0 });
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const travelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (travelTimer.current) clearTimeout(travelTimer.current);
    },
    [],
  );

  // Canvas ref for procedural 3D starlight & volumetric tree flight
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Flight camera Z state
  const cameraZRef = useRef(0);
  const targetZRef = useRef(0);

  // Track mouse for subtle camera sway
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (reducedMotion) return;
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseTiltRef.current = { x, y };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [reducedMotion]);

  // Handle answer selection
  const handleSelect = async (idx: number) => {
    if (isTraveling || busy) return;

    setJustClickedIdx(idx);
    clickedQuestion.current = currentQuestionIndex;
    const chosenOpt = currentQ.options[idx];

    // Determine shockwave color
    const color =
      chosenOpt.element === "Water"
        ? "rgba(62, 193, 252, 0.8)"
        : chosenOpt.element === "Solar"
          ? "rgba(246, 202, 120, 0.85)"
          : "rgba(192, 132, 252, 0.8)";
    setShockwaveColor(color);
    setShockwaveActive(true);

    soundscape.playAnswer(currentQuestionIndex, idx);
    setIsTraveling(true);

    // Accelerate camera forward
    if (!reducedMotion) targetZRef.current += 900;

    // Save answer
    const saved = await onSelectAnswer(currentQ.id, answerValue(currentQuestionIndex, idx));
    if (!mounted.current) return;
    if (!saved) {
      setIsTraveling(false);
      setShockwaveActive(false);
      setJustClickedIdx(null);
      return;
    }

    if (reducedMotion) {
      setShockwaveActive(false);
      setJustClickedIdx(null);
      setIsTraveling(false);
      return;
    }
    // A short forward glide; saves remain authoritative before the next answer.
    travelTimer.current = setTimeout(
      () => {
        setShockwaveActive(false);
        setJustClickedIdx(null);
        setIsTraveling(false);

        if (currentQuestionIndex >= ACADEMY_LEARNING_QUESTIONS.length - 1) {
          onCompleteJourney();
        }
      },
      reducedMotion ? 0 : 460,
    );
  };

  // Canvas 3D Environment Rendering (Trees, Stardust, Bioluminescence, Volumetric Light)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize 3D forest waypoints & floating spores
    interface Spore {
      x: number;
      y: number;
      z: number;
      radius: number;
      color: string;
      alpha: number;
    }

    interface TreeWaypoint {
      x: number;
      y: number;
      z: number;
      side: "left" | "right";
      heightScale: number;
      hasLantern: boolean;
    }

    const spores: Spore[] = [];
    const sporeColors = ["#f6ca78", "#3ec1fc", "#c084fc", "#ffffff"];
    for (let i = 0; i < (window.innerWidth < 640 ? 65 : 120); i++) {
      spores.push({
        x: (Math.random() - 0.5) * 2400,
        y: (Math.random() - 0.5) * 1600,
        z: Math.random() * 3000,
        radius: Math.random() * 2 + 0.8,
        color: sporeColors[Math.floor(Math.random() * sporeColors.length)],
        alpha: Math.random() * 0.7 + 0.3,
      });
    }

    const trees: TreeWaypoint[] = [];
    for (let i = 0; i < (window.innerWidth < 640 ? 18 : 32); i++) {
      trees.push({
        x: i % 2 === 0 ? -450 - Math.random() * 300 : 450 + Math.random() * 300,
        y: 120 + Math.random() * 80,
        z: i * 200 + Math.random() * 100,
        side: i % 2 === 0 ? "left" : "right",
        heightScale: 0.8 + Math.random() * 0.4,
        hasLantern: i % 3 === 0,
      });
    }

    // Main animation loop
    const render = () => {
      // Smooth camera interpolation
      const speed = isTraveling ? 0.08 : 0.03;
      cameraZRef.current += (targetZRef.current - cameraZRef.current) * speed;

      // Gentle continuous forward cruise
      if (!reducedMotion) {
        targetZRef.current += isTraveling ? 6 : 1.2;
      }

      ctx.clearRect(0, 0, width, height);

      // Deep Atmospheric Horizon Gradient based on current question realm
      const isSanctuary = currentQuestionIndex >= 9;
      const isCrystal = currentQuestionIndex >= 6 && currentQuestionIndex < 9;
      const isForest = currentQuestionIndex >= 3 && currentQuestionIndex < 6;

      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      if (isSanctuary) {
        bgGrad.addColorStop(0, "#1c1032");
        bgGrad.addColorStop(0.5, "#0e071c");
        bgGrad.addColorStop(1, "#05020a");
      } else if (isCrystal) {
        bgGrad.addColorStop(0, "#130d2a");
        bgGrad.addColorStop(0.6, "#080514");
        bgGrad.addColorStop(1, "#030208");
      } else if (isForest) {
        bgGrad.addColorStop(0, "#091c24");
        bgGrad.addColorStop(0.6, "#050f14");
        bgGrad.addColorStop(1, "#020608");
      } else {
        bgGrad.addColorStop(0, "#10152b");
        bgGrad.addColorStop(0.5, "#090e1c");
        bgGrad.addColorStop(1, "#05070f");
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant celestial portal glow
      const cx = width / 2 + mouseTiltRef.current.x * -20;
      const cy = height * 0.42 + mouseTiltRef.current.y * -15;

      const portalGlow = ctx.createRadialGradient(cx, cy, 10, cx, cy, width * 0.45);
      if (isSanctuary) {
        portalGlow.addColorStop(0, "rgba(246, 202, 120, 0.22)");
        portalGlow.addColorStop(0.5, "rgba(96, 1, 209, 0.1)");
        portalGlow.addColorStop(1, "transparent");
      } else if (isForest) {
        portalGlow.addColorStop(0, "rgba(62, 193, 252, 0.18)");
        portalGlow.addColorStop(0.5, "rgba(14, 165, 233, 0.08)");
        portalGlow.addColorStop(1, "transparent");
      } else {
        portalGlow.addColorStop(0, "rgba(96, 1, 209, 0.22)");
        portalGlow.addColorStop(0.5, "rgba(246, 202, 120, 0.08)");
        portalGlow.addColorStop(1, "transparent");
      }
      ctx.fillStyle = portalGlow;
      ctx.fillRect(0, 0, width, height);

      // Render 3D Flying Trees
      trees.forEach((tree) => {
        let relativeZ = (tree.z - cameraZRef.current) % 3000;
        if (relativeZ < -200) relativeZ += 3000;

        if (relativeZ > 10 && relativeZ < 2800) {
          const perspective = 700 / (700 + relativeZ);
          const screenX = cx + tree.x * perspective;
          const screenY = cy + tree.y * perspective;
          const scale = perspective * tree.heightScale;

          // Tree trunk silhouette
          const trunkW = 40 * scale;
          const trunkH = 500 * scale;

          ctx.fillStyle = `rgba(12, 18, 32, ${Math.min(0.9, perspective * 1.5)})`;
          ctx.beginPath();
          ctx.moveTo(screenX - trunkW / 2, screenY);
          ctx.lineTo(screenX + trunkW / 2, screenY);
          ctx.lineTo(screenX + trunkW * 0.35, screenY - trunkH);
          ctx.lineTo(screenX - trunkW * 0.35, screenY - trunkH);
          ctx.closePath();
          ctx.fill();

          // Bioluminescent canopy glow
          const canopyR = 120 * scale;
          const canopyGlow = ctx.createRadialGradient(
            screenX,
            screenY - trunkH,
            10 * scale,
            screenX,
            screenY - trunkH,
            canopyR,
          );
          const canopyColor = isForest
            ? "rgba(62, 193, 252, "
            : isSanctuary
              ? "rgba(246, 202, 120, "
              : "rgba(192, 132, 252, ";
          canopyGlow.addColorStop(0, `${canopyColor}${0.35 * perspective})`);
          canopyGlow.addColorStop(1, "transparent");

          ctx.fillStyle = canopyGlow;
          ctx.beginPath();
          ctx.arc(screenX, screenY - trunkH, canopyR, 0, Math.PI * 2);
          ctx.fill();

          // Lantern hanging on branches
          if (tree.hasLantern) {
            ctx.fillStyle = "#f6ca78";
            ctx.shadowColor = "#f6ca78";
            ctx.shadowBlur = 15 * scale;
            ctx.beginPath();
            ctx.arc(
              screenX + (tree.side === "left" ? 30 : -30) * scale,
              screenY - trunkH * 0.7,
              4 * scale,
              0,
              Math.PI * 2,
            );
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      });

      // Render 3D Flying Bioluminescent Spores
      spores.forEach((spore) => {
        let relativeZ = (spore.z - cameraZRef.current) % 3000;
        if (relativeZ < 0) relativeZ += 3000;

        if (relativeZ > 5 && relativeZ < 2600) {
          const perspective = 650 / (650 + relativeZ);
          const sx = cx + spore.x * perspective;
          const sy = cy + spore.y * perspective;
          const sRadius = spore.radius * perspective * 2.2;

          ctx.fillStyle = spore.color;
          ctx.globalAlpha = spore.alpha * Math.min(1, perspective * 1.8);
          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(0.6, sRadius), 0, Math.PI * 2);
          ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0;

      // Ambient Ground Fog Wave along bottom
      const fogGrad = ctx.createLinearGradient(0, height - 200, 0, height);
      fogGrad.addColorStop(0, "transparent");
      fogGrad.addColorStop(0.7, "rgba(9, 14, 28, 0.75)");
      fogGrad.addColorStop(1, "#05070f");
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, height - 220, width, 220);

      if (!reducedMotion) animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [currentQuestionIndex, isTraveling, reducedMotion]);

  // Environment title
  const getRealmTitle = () => {
    if (currentQuestionIndex < 3) return "The Calling · Cosmic Portal";
    if (currentQuestionIndex < 6) return "The Enchanted Grove";
    if (currentQuestionIndex < 9) return "The Crystal Realm";
    return "The Awakening Sanctuary";
  };

  return (
    <div
      data-question={currentQuestionIndex}
      className="sanctuary-flight fixed inset-0 z-10 overflow-hidden bg-[#05070f] text-[#dfe1f6] select-none perspective-1000"
    >
      {/* 3D Moving Fantasy Canvas Background */}
      <canvas
        aria-hidden="true"
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-0 w-full h-full"
      />

      {/* Magical Shockwave Ripple on Choice */}
      {shockwaveActive && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full pointer-events-none z-20 transition-all duration-1000 ease-out"
          style={{
            boxShadow: `0 0 120px 40px ${shockwaveColor}`,
            transform: "scale(18)",
            opacity: 0,
          }}
        />
      )}

      {/* Top Header: Clean, Minimal, Non-Intrusive */}
      <div className="nova-flight-header absolute top-0 inset-x-0 z-40 p-4 sm:p-6 flex items-center justify-between pointer-events-auto">
        {/* Realm Indicator */}
        <div className="flex items-center gap-2.5">
          <img
            src="/branding/academy-icon.png"
            alt="AcadeMY"
            width="28"
            height="28"
            className="rounded-lg"
          />
          <div className="flex flex-col">
            <span className="font-headline text-xs sm:text-sm font-bold tracking-wide text-[#dfe1f6]">
              {getRealmTitle()}
            </span>
            <span className="font-label text-[10px] text-[#f6ca78] uppercase tracking-widest font-semibold">
              AcadeMY Cosmic Companion
            </span>
          </div>
        </div>

        {/* 12-Question Progress Constellation Dots */}
        <div className="hidden sm:flex items-center gap-1.5">
          {ACADEMY_LEARNING_QUESTIONS.map((q, idx) => {
            const isCompleted = idx < currentQuestionIndex;
            const isCurrent = idx === currentQuestionIndex;

            return (
              <div
                key={q.id}
                className={`transition-all duration-300 rounded-full ${
                  isCurrent
                    ? "w-6 h-2 bg-[#f6ca78] shadow-[0_0_12px_rgba(246,202,120,0.9)]"
                    : isCompleted
                      ? "w-2 h-2 bg-[#f6ca78]/60"
                      : "w-1.5 h-1.5 bg-[#303444]/60"
                }`}
                title={`Question ${idx + 1}: ${q.category}`}
              />
            );
          })}
        </div>

        {/* Right Controls: Back + Audio Toggle + Question Count */}
        <div className="flex items-center gap-3">
          {currentQuestionIndex > 0 && (
            <button
              onClick={onPrevQuestion}
              disabled={isTraveling || busy}
              className="text-xs font-label uppercase tracking-wider text-[#d1c5b3] hover:text-[#f6ca78] px-3 py-1.5 rounded-xl bg-[#090e1c]/80 backdrop-blur-md border border-[#303444] hover:border-[#f6ca78]/40 transition-colors flex items-center gap-1 cursor-pointer"
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span>Back</span>
            </button>
          )}

          <AudioControls />

          {/* Waypoint Number */}
          <div className="text-xs font-label text-[#d1c5b3] bg-[#090e1c]/80 backdrop-blur-md border border-[#303444]/60 px-3 py-1.5 rounded-xl">
            <span className="text-[#f6ca78] font-bold font-mono">
              {String(currentQuestionIndex + 1).padStart(2, "0")}
            </span>
            <span className="opacity-40 mx-1">/</span>
            <span className="opacity-70 font-mono">12</span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          Cinematic question with original text-only answer choices
      ========================================================================= */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center px-4 sm:px-6 pointer-events-none">
        <div
          data-flight-question
          aria-busy={busy}
          className={`w-full max-w-2xl flex flex-col items-center text-center transition-all duration-500 ease-out ${
            isTraveling
              ? "opacity-30 scale-[.98] translate-y-2"
              : "opacity-100 scale-100 translate-y-0"
          }`}
        >
          {/* Category Tag */}
          <span className="font-label text-xs uppercase tracking-[0.25em] text-[#f6ca78] font-bold mb-3 drop-shadow-md">
            {currentQ.category}
          </span>

          {/* The Question Headline */}
          <h1
            tabIndex={-1}
            className="font-headline text-2xl sm:text-3xl lg:text-4xl text-[#dfe1f6] font-medium leading-relaxed sm:leading-snug max-w-xl mb-10 drop-shadow-[0_2px_20px_rgba(7,11,25,0.95)]"
          >
            {currentQ.question}
          </h1>

          {/* Original answer text from the shared question model */}
          <QuestionOptions
            question={currentQ}
            selected={selectedOptionIdx}
            clicked={clickedQuestion.current === currentQuestionIndex ? justClickedIdx : null}
            disabled={isTraveling || busy}
            onSelect={(answer) => void handleSelect(answer)}
          />
          {/* Gentle Instruction */}
          <p className="font-label text-xs text-[#d1c5b3]/50 uppercase tracking-widest mt-8">
            {guest
              ? "Choose what feels like you. As a guest, your answers aren't saved."
              : "Choose what feels like you. Your answers save as you go."}
          </p>
        </div>
      </div>
    </div>
  );
};
