import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { createFileRoute } from "@tanstack/react-router";

import imgAcademyLogo from "@/assets/landingpage3/academy-logo.png";
import imgAstronaut from "@/assets/premium-astronaut-rocket.png";
import imgWhyEllipse from "@/assets/landingpage3/why-ellipse.png";
import imgPlanetScience from "@/assets/landingpage3/planet-science.png";
import imgPlanetMath from "@/assets/landingpage3/planet-math.png";
import imgPlanetEnglish from "@/assets/landingpage3/planet-english.png";
import imgPlanetBm from "@/assets/landingpage3/planet-bm.png";
import imgPlanetSejarah from "@/assets/landingpage3/planet-sejarah.png";
import imgPlanetGeografi from "@/assets/landingpage3/planet-geografi.png";
import imgNovaOrb from "@/assets/landingpage3/nova-orb.png";
import imgNovaEllipse from "@/assets/landingpage3/nova-ellipse.png";
import imgAvatarCommander from "@/assets/landingpage3/avatar-commander.png";
import imgProgressScience from "@/assets/landingpage3/progress-science.png";
import imgProgressMath from "@/assets/landingpage3/progress-math.png";
import imgProgressEnglish from "@/assets/landingpage3/progress-english.png";
import imgProgressBm from "@/assets/landingpage3/progress-bm.png";
import imgProgressSejarah from "@/assets/landingpage3/progress-sejarah.png";
import imgProgressGeografi from "@/assets/landingpage3/progress-geografi.png";
import imgParentsDashboard from "@/assets/landingpage3/parents-dashboard.png";
import imgPlanExplorer from "@/assets/landingpage3/plan-explorer.png";
import imgPlanCommander from "@/assets/landingpage3/plan-commander.png";
import imgPlanMissionControl from "@/assets/landingpage3/plan-mission-control.png";
import imgFinalGlow from "@/assets/landingpage3/final-glow.png";

export const Route = createFileRoute("/academy/landingpage3")({
  head: () => ({
    meta: [{ title: "AcadeMY — Malaysia's Interstellar Learning Platform" }],
  }),
  component: LandingPage3,
});

/* ── Cinematic star canvas ───────────────────────────────────── */
function StarCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const starsRef = useRef<
    { x: number; y: number; r: number; alpha: number; speed: number; phase: number }[]
  >([]);
  const scrollYRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
      starsRef.current = Array.from({ length: 220 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.005 + 0.002,
        phase: Math.random() * Math.PI * 2,
      }));
    };
    resize();
    window.addEventListener("resize", resize);

    let t = 0;
    const draw = () => {
      const c = canvasRef.current;
      if (!c || !ctx) return;
      ctx.clearRect(0, 0, c.width, c.height);
      const sy = scrollYRef.current;
      starsRef.current.forEach((s) => {
        const twinkle = (Math.sin(t * s.speed + s.phase) + 1) / 2;
        const alpha = s.alpha * (0.4 + 0.6 * twinkle);
        const parallaxY = s.y - sy * 0.15;
        ctx.beginPath();
        ctx.arc(s.x, parallaxY, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      });
      t += 1;
      animFrameRef.current = requestAnimationFrame(draw);
    };
    draw();

    const onScroll = () => {
      scrollYRef.current = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

const lp3Style = `
  @keyframes lp3NebulaPulse { 0%, 100% { opacity: 0.25; transform: scale(1); } 50% { opacity: 0.4; transform: scale(1.05); } }
  @keyframes lp3NebulaPulse2 { 0%, 100% { opacity: 0.15; transform: scale(1.02); } 50% { opacity: 0.3; transform: scale(0.97); } }
  @keyframes lp3PlanetFloat { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-12px) rotate(2deg); } }
  @keyframes lp3GlowPulse { 0%, 100% { box-shadow: 0 0 20px 4px rgba(124,58,237,0.3); } 50% { box-shadow: 0 0 40px 8px rgba(124,58,237,0.6); } }
  @keyframes lp3Shimmer { 0%, 100% { box-shadow: 0 0 12px rgba(255,199,51,0.3); } 50% { box-shadow: 0 0 24px rgba(255,199,51,0.7); } }
`;

/* ── Reveal-on-scroll wrapper ────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  const initial = {
    opacity: 0,
    y: direction === "up" ? 40 : 0,
    x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
  };
  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  );
}

/* ── Header ──────────────────────────────────────────────────── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-500 md:px-[120px] md:py-[32px]"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{
        background: scrolled ? "rgba(5,5,16,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.08)" : "none",
      }}
    >
      <div className="h-[32px] w-[128px] md:h-[40px] md:w-[160px]">
        <img alt="AcadeMY" className="size-full object-contain" src={imgAcademyLogo} />
      </div>
      <nav aria-label="Primary" className="hidden gap-[40px] font-normal text-[14px] text-white md:flex">
        {["Features", "Subjects", "Cikgu AI", "Parents", "Pricing"].map((link) => (
          <a
            key={link}
            href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
            className="rounded-sm text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa]"
          >
            {link}
          </a>
        ))}
      </nav>
      <div className="flex items-center gap-[12px] md:gap-[24px]">
        <a
          href="#signin"
          className="hidden rounded-sm text-[14px] leading-[20px] text-white/80 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa] sm:block"
        >
          Sign In
        </a>
        <motion.a
          href="#pricing"
          className="flex cursor-pointer items-center justify-center rounded-[100px] bg-white px-[16px] py-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050510] focus-visible:ring-[#a78bfa] md:px-[20px] md:py-[10px]"
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(255,255,255,0.3)" }}
          whileTap={{ scale: 0.97 }}
        >
          <p className="text-[13px] font-bold leading-normal text-[#050510] md:text-[14px]">
            Start Free
          </p>
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ── Hero ────────────────────────────────────────────────────── */
function Hero() {
  return (
    <div className="relative w-full shrink-0 pb-20 pt-[140px] md:h-[960px] md:pb-0 md:pt-0">
      <div
        className="pointer-events-none absolute right-[-200px] top-[100px] size-[800px]"
        style={{ animation: "lp3NebulaPulse 6s ease-in-out infinite" }}
      >
        <svg className="block size-full" fill="none" viewBox="0 0 1100 1100">
          <g filter="url(#hn1)" opacity="0.3">
            <circle cx="550" cy="550" fill="#6B21A8" r="400" />
          </g>
          <defs>
            <filter id="hn1" filterUnits="userSpaceOnUse" width="1100" height="1100" x="0" y="0">
              <feGaussianBlur stdDeviation="75" />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="relative flex size-full flex-col items-center gap-12 px-6 md:flex-row md:items-start md:px-[120px]">
        {/* Left content */}
        <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-[24px] md:h-full md:gap-[40px]">
          <Reveal delay={0.1}>
            <div className="relative flex items-start rounded-[100px] bg-[rgba(245,158,11,0.15)] px-[16px] py-[8px]">
              <div
                className="absolute inset-0 rounded-[100px] border border-solid border-[#f59e0b]"
                style={{ animation: "lp3Shimmer 2s ease-in-out infinite" }}
              />
              <p className="whitespace-nowrap text-[14px] font-normal leading-[20px] text-[#f59e0b]">
                {`MALAYSIA'S #1 KSSM PLATFORM`}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex w-full flex-col items-start gap-[20px] text-white">
              <h1 className="min-w-full text-[36px] font-bold leading-[1.08] tracking-tight md:text-[76px] md:leading-[1.04]">
                Studying, reimagined as a{" "}
                <span className="bg-gradient-to-r from-[#a78bfa] via-[#f5d36b] to-[#60a5fa] bg-clip-text text-transparent">
                  space mission.
                </span>
              </h1>
              <p className="w-full text-[16px] font-normal leading-[26px] text-white/80 md:w-[560px] md:text-[18px]">
                AcadeMY turns the KSSM syllabus into a galaxy of quests, XP and AI guidance —
                built for Malaysian students who'd rather explore than memorise.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="flex flex-wrap items-center gap-[20px]">
              <motion.a
                href="#pricing"
                className="flex cursor-pointer items-center justify-center rounded-[100px] bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-[32px] py-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050510] focus-visible:ring-[#a78bfa]"
                style={{ boxShadow: "0px 8px 24px rgba(124,58,237,0.45)" }}
                whileHover={{ scale: 1.04, boxShadow: "0px 14px 32px rgba(124,58,237,0.6)" }}
                whileTap={{ scale: 0.97 }}
              >
                <p className="whitespace-nowrap text-[16px] font-semibold leading-[24px] text-white">
                  Begin Your Mission — It's Free
                </p>
              </motion.a>
              <a
                href="#features"
                className="group flex cursor-pointer items-center gap-[8px] rounded-sm px-[8px] py-[16px] text-[15px] font-medium text-white/75 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa]"
              >
                See how it works
                <svg className="size-[14px] transition-transform group-hover:translate-y-[2px]" fill="none" viewBox="0 0 12 12">
                  <path d="M6 2v8M2 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.5}>
            <div className="flex flex-wrap items-center gap-x-[28px] gap-y-[8px] pt-[4px] text-[13px] text-white/55">
              <span className="flex items-center gap-[8px]">
                <span className="size-[6px] rounded-full bg-[#4ade80]" /> 50,000+ students learning
              </span>
              <span>6 KSSM subjects</span>
              <span>No credit card required</span>
            </div>
          </Reveal>
        </div>

        {/* Right: astronaut */}
        <div className="relative flex h-full w-full shrink-0 flex-col items-center justify-center md:w-[640px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative flex w-full items-center justify-center"
            style={{ animation: "lp3PlanetFloat 6s ease-in-out infinite" }}
          >
            <div
              className="pointer-events-none absolute inset-[-10%] rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(124,58,237,0.3) 0%, rgba(79,70,229,0.15) 45%, transparent 70%)",
                animation: "lp3NebulaPulse 4s ease-in-out infinite",
              }}
            />
            <img
              src={imgAstronaut}
              alt="Cosmic Astronaut"
              className="relative w-[320px] object-contain drop-shadow-2xl md:w-[560px]"
            />
          </motion.div>

          <motion.div
            className="flex flex-col items-center gap-[8px] pt-6 md:absolute md:bottom-[60px] md:pt-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="relative rounded-[100px] bg-[rgba(124,58,237,0.85)] px-[14px] py-[5px] backdrop-blur-sm">
              <div className="absolute inset-0 rounded-[100px] border border-solid border-[rgba(167,139,250,0.6)]" />
              <p className="whitespace-nowrap text-[12px] font-extrabold uppercase tracking-[1.5px] text-white">
                Level 18
              </p>
            </div>
            <div
              className="relative h-[52px] w-[280px] rounded-[100px] bg-[rgba(10,10,46,0.88)] md:w-[340px]"
              style={{ animation: "lp3Shimmer 3s ease-in-out infinite 1s" }}
            >
              <div className="absolute inset-0 rounded-[100px] border-[1.5px] border-solid border-[rgba(255,199,51,0.6)]" />
              <div className="absolute inset-0 flex items-center justify-center text-center text-[15px] font-bold tracking-[0.5px] text-[#ffd638] md:text-[17px]">
                <p>★ Star Captain · XP 7,539</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

/* ── Why AcadeMY ─────────────────────────────────────────────── */
function GlassFeatureCard({
  icon,
  title,
  desc,
  color,
  iconBg,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  color: string;
  iconBg: string;
}) {
  return (
    <motion.div
      className="relative min-w-0 flex-1 cursor-pointer rounded-[24px] bg-[rgba(255,255,255,0.08)] backdrop-blur-[16px]"
      whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.12)" }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative flex size-full flex-col items-start p-[28px] md:p-[40px]">
        <div className="flex w-full items-start gap-[24px]">
          <div
            className="relative flex size-[56px] shrink-0 items-center justify-center rounded-[16px] md:size-[64px]"
            style={{ background: iconBg }}
          >
            <div className="absolute inset-0 rounded-[16px] border border-solid" style={{ borderColor: color }} />
            {icon}
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-[12px] text-white">
            <p className="w-full text-[18px] font-bold leading-normal md:text-[20px]">{title}</p>
            <p className="w-full text-[14px] font-normal leading-[22px] text-white/75 md:text-[15px]">{desc}</p>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 rounded-[24px] border border-solid border-[rgba(255,255,255,0.15)]" />
    </motion.div>
  );
}

function WhySection() {
  return (
    <div id="features" className="relative w-full shrink-0 overflow-hidden bg-[#050510] py-24 md:h-[800px] md:py-0">
      <div
        className="pointer-events-none absolute left-[-200px] top-[200px] size-[700px]"
        style={{ animation: "lp3NebulaPulse2 7s ease-in-out infinite" }}
      >
        <svg className="block size-full" fill="none" viewBox="0 0 1000 1000">
          <g filter="url(#wn1)" opacity="0.3">
            <circle cx="500" cy="500" fill="#1E3A8A" r="350" />
          </g>
          <defs>
            <filter id="wn1" filterUnits="userSpaceOnUse" width="1000" height="1000" x="0" y="0">
              <feGaussianBlur stdDeviation="75" />
            </filter>
          </defs>
        </svg>
      </div>
      <div
        className="pointer-events-none absolute right-[-100px] top-1/2 size-[140px] -translate-y-1/2 md:size-[200px]"
        style={{ animation: "lp3PlanetFloat 5s ease-in-out infinite" }}
      >
        <img alt="" className="block size-full" src={imgWhyEllipse} />
      </div>

      <div className="relative flex size-full flex-col items-center gap-[48px] px-6 md:gap-[80px] md:p-[120px]">
        <Reveal>
          <div className="flex w-full flex-col items-center gap-[16px]">
            <p className="whitespace-nowrap text-[32px] font-extrabold leading-normal text-white md:text-[48px]">
              Why AcadeMY?
            </p>
            <div className="h-[4px] w-[80px] rounded-[2px] bg-[#f59e0b]" />
            <p className="text-center text-[14px] font-normal leading-[24px] text-white/70 md:whitespace-nowrap md:text-[16px]">
              Four reasons 50,000+ Malaysian students chose AcadeMY over a textbook.
            </p>
          </div>
        </Reveal>

        <div className="grid w-full grid-cols-1 gap-[20px] sm:grid-cols-2 md:flex md:items-start md:gap-[24px]">
          {[
            {
              delay: 0.1,
              title: "Curriculum-Aligned",
              desc: "KSSM Form 1–3 content mapped exactly to MOE syllabus",
              color: "#60A5FA",
              iconBg: "rgba(96,165,250,0.15)",
              path: "M29.332 13.333V21.3339M8.0004 16.6667V21.3339C8.0004 22.3949 8.84319 23.4125 10.3434 24.1627C11.8435 24.9129 13.8782 25.3344 15.9998 25.3344C18.1213 25.3344 20.156 24.9129 21.6562 24.1627C23.1563 23.4125 23.9991 22.3949 23.9991 21.3339V16.6667M28.5585 14.563C28.7972 14.4577 28.9997 14.2846 29.141 14.0653C29.2823 13.846 29.3562 13.5901 29.3535 13.3292C29.3508 13.0683 29.2717 12.8139 29.1258 12.5975C28.98 12.3812 28.774 12.2124 28.5332 12.112L17.1061 6.9061C16.7587 6.74762 16.3813 6.6656 15.9995 6.6656C15.6177 6.6656 15.2403 6.74762 14.8929 6.9061L3.46717 12.1067C3.22981 12.2107 3.02789 12.3816 2.8861 12.5985C2.74431 12.8154 2.6688 13.069 2.6688 13.3282C2.6688 13.5873 2.74431 13.8409 2.8861 14.0578C3.02789 14.2748 3.22981 14.4457 3.46717 14.5496L14.8929 19.7609C15.2403 19.9194 15.6177 20.0014 15.9995 20.0014C16.3813 20.0014 16.7587 19.9194 17.1061 19.7609L28.5585 14.563Z",
            },
            {
              delay: 0.2,
              title: "AI-Powered Learning",
              desc: "Personalised study paths that adapt to each student",
              color: "#8B5CF6",
              iconBg: "rgba(139,92,246,0.15)",
              path: "M16.0001 23.9996V6.66573M16.0001 23.9996C16.0009 24.7287 16.1511 25.4503 16.4415 26.119C16.7319 26.7877 17.1564 27.3897 17.6886 27.888C18.2208 28.3862 18.8495 28.7701 19.5359 29.0158C20.2223 29.2616 20.9518 29.364 21.6793 29.3168C22.4068 29.2696 23.117 29.0737 23.7658 28.7414C24.4147 28.409 24.9885 27.9471 25.4519 27.3842C25.9153 26.8214 26.2583 26.1695 26.4599 25.4689C26.6614 24.7683 26.7172 24.0338 26.6237 23.3108M16.0001 23.9996C15.9993 24.7287 15.8491 25.4503 15.5587 26.119C15.2683 26.7877 14.8439 27.3897 14.3116 27.888C13.7794 28.3862 13.1507 28.7701 12.4643 29.0158C11.7779 29.2616 11.0484 29.364 10.3209 29.3168C9.59338 29.2696 8.88325 29.0737 8.23438 28.7414C7.58551 28.409 7.01168 27.9471 6.54832 27.3842C6.08496 26.8214 5.74192 26.1695 5.54037 25.4689C5.33882 24.7683 5.28305 24.0338 5.3765 23.3108M16.0001 6.66573C16.0001 6.05215 16.1412 5.44695 16.4126 4.89664C16.684 4.34632 17.0783 3.8658 17.5651 3.49226C18.052 3.11873 18.6182 2.86218 19.22 2.74247C19.8218 2.62276 20.4431 2.64309 21.0359 2.80191C21.6286 2.96072 22.1768 3.25374 22.6381 3.65831C23.0995 4.06289 23.4616 4.56816 23.6964 5.13505C23.9312 5.70194 24.0324 6.31524 23.9923 6.92751C23.9521 7.53978 23.7716 8.13461 23.4648 8.66598M16.0001 6.66573C16.0001 6.05215 15.859 5.44695 15.5876 4.89664C15.3162 4.34632 14.9219 3.8658 14.4351 3.49226C13.9483 3.11873 13.3821 2.86218 12.7802 2.74247C12.1784 2.62276 11.5571 2.64309 10.9644 2.80191C10.3717 2.96072 9.82344 3.25374 9.3621 3.65831C8.90076 4.06289 8.53868 4.56816 8.30387 5.13505C8.06907 5.70194 7.96783 6.31524 8.00798 6.92751C8.04814 7.53978 8.22862 8.13461 8.53545 8.66598M20.0005 17.3328C18.8468 16.9955 17.8334 16.2936 17.1122 15.332C16.391 14.3705 16.0008 13.2012 16.0001 11.9992C15.9994 13.2012 15.6092 14.3705 14.888 15.332C14.1668 16.2936 13.1535 16.9955 11.9998 17.3328M23.9969 6.83241C24.7807 7.03393 25.5084 7.41116 26.1248 7.93553C26.7412 8.45989 27.2302 9.11765 27.5548 9.85897C27.8793 10.6003 28.0309 11.4058 27.9981 12.2143C27.9653 13.0229 27.7488 13.8134 27.3652 14.526M24.0008 23.9998C25.1749 23.9998 26.3162 23.6123 27.2477 22.8976C28.1792 22.1829 28.8488 21.1808 29.1527 20.0467C29.4565 18.9127 29.3777 17.7101 28.9284 16.6254C28.4792 15.5407 27.6845 14.6346 26.6677 14.0475M7.99917 23.9998C6.82506 23.9998 5.68378 23.6123 4.75231 22.8976C3.82084 22.1829 3.15124 21.1808 2.84735 20.0467C2.54347 18.9127 2.62228 17.7101 3.07156 16.6254C3.52084 15.5407 4.31549 14.6346 5.33227 14.0475M8.00331 6.83241C7.21951 7.03393 6.49185 7.41116 5.87543 7.93553C5.25902 8.45989 4.77001 9.11765 4.44546 9.85897C4.1209 10.6003 3.9693 11.4058 4.00214 12.2143C4.03499 13.0229 4.25141 13.8134 4.63501 14.526",
            },
            {
              delay: 0.3,
              title: "Gamified Journey",
              desc: "Earn XP, level up, unlock cosmic rewards",
              color: "#F59E0B",
              iconBg: "rgba(245,158,11,0.15)",
              path: "M16.0011 19.9989V26.6656C16.0011 26.6656 20.0411 25.9323 21.3344 23.9989C22.7744 21.8389 21.3344 17.3323 21.3344 17.3323M16.0011 19.9989C17.8633 19.2902 19.65 18.3968 21.3344 17.3323M16.0011 19.9989L12.0011 15.9993C12.7106 14.1585 13.604 12.394 14.6677 10.7326C16.2213 8.24858 18.3846 6.20333 20.9517 4.79139C23.5189 3.37944 26.4046 2.64776 29.3344 2.66593C29.3344 6.2926 28.2944 12.6656 21.3344 17.3323M12.0011 15.9993L5.3344 15.9984C5.3344 15.9984 6.06773 11.9584 8.00107 10.6651C10.1611 9.22506 14.6677 10.7326 14.6677 10.7326M6.00107 21.9994C4.00107 23.6794 3.3344 28.666 3.3344 28.666C3.3344 28.666 8.32107 27.9994 10.0011 25.9994C10.9477 24.8794 10.9344 23.1594 9.88107 22.1194C9.36281 21.6247 8.68012 21.3389 7.96403 21.3167C7.24795 21.2946 6.5489 21.5377 6.00107 21.9994Z",
            },
            {
              delay: 0.4,
              title: "Parent Visibility",
              desc: "Real-time mission control dashboard for parents",
              color: "#10B981",
              iconBg: "rgba(16,185,129,0.15)",
              path: "M9.31984 4.45271C11.8631 2.98235 14.8208 2.39307 17.7333 2.77644C20.6459 3.1598 23.3504 4.49433 25.4265 6.57271L17.8797 14.1192M5.33286 7.99964H5.3462",
            },
          ].map((card) => (
            <Reveal key={card.title} delay={card.delay} className="min-w-0 md:flex-1">
              <GlassFeatureCard
                title={card.title}
                desc={card.desc}
                color={card.color}
                iconBg={card.iconBg}
                icon={
                  <svg className="block size-[28px] md:size-[32px]" fill="none" viewBox="0 0 32 32">
                    <path d={card.path} stroke={card.color} strokeLinecap="round" strokeWidth="2" />
                  </svg>
                }
              />
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Subject Planets ─────────────────────────────────────────── */
function SubjectsSection() {
  const subjects = [
    { img: imgPlanetScience, name: "Science", sub: "180+ topics", delay: 0.1 },
    { img: imgPlanetMath, name: "Mathematics", sub: "210+ topics", delay: 0.2 },
    { img: imgPlanetEnglish, name: "English", sub: "140+ topics", delay: 0.3 },
    { img: imgPlanetBm, name: "B. Malaysia", sub: "160+ topics", delay: 0.4 },
    { img: imgPlanetSejarah, name: "Sejarah", sub: "120+ topics", delay: 0.5 },
    { img: imgPlanetGeografi, name: "Geografi", sub: "110+ topics", delay: 0.6 },
  ];

  return (
    <div id="subjects" className="relative w-full overflow-hidden bg-[#050510] py-24 md:p-[120px]">
      <div
        className="pointer-events-none absolute left-1/2 top-[200px] size-[1000px] -translate-x-1/2"
        style={{ animation: "lp3NebulaPulse2 8s ease-in-out infinite" }}
      >
        <svg className="block size-full" fill="none" viewBox="0 0 1300 1300">
          <g filter="url(#sn1)" opacity="0.15">
            <circle cx="650" cy="650" fill="#6B21A8" r="500" />
          </g>
          <defs>
            <filter id="sn1" filterUnits="userSpaceOnUse" width="1300" height="1300" x="0" y="0">
              <feGaussianBlur stdDeviation="75" />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="relative flex flex-col items-center gap-12 px-6">
        <Reveal>
          <div className="flex flex-col items-center gap-[16px] text-center text-white">
            <p className="text-[32px] font-extrabold leading-normal md:text-[48px] md:whitespace-nowrap">
              Powerful Learning Tools
            </p>
            <p className="text-[14px] font-normal leading-[24px] text-white/70 md:text-[16px] md:whitespace-nowrap">
              6 KSSM subjects. Hundreds of topics. One epic universe.
            </p>
          </div>
        </Reveal>

        <div className="grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3">
          {subjects.map((s) => (
            <motion.a
              key={s.name}
              href={`#${s.name.toLowerCase().replace(/\s+/g, "-")}`}
              className="group flex flex-col items-center gap-[16px] rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa]"
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: s.delay }}
              whileHover={{ scale: 1.08, y: -8 }}
            >
              <div
                className="size-[88px] md:size-[120px]"
                style={{ animation: `lp3PlanetFloat ${4 + s.delay * 2}s ease-in-out infinite` }}
              >
                <img alt="" className="block size-full object-contain" src={s.img} />
              </div>
              <div className="flex flex-col items-center gap-[4px]">
                <p className="whitespace-nowrap text-[15px] font-bold leading-normal text-white md:text-[18px]">
                  {s.name}
                </p>
                <p className="whitespace-nowrap text-[11px] font-normal leading-normal text-white/55 md:text-[12px]">
                  {s.sub}
                </p>
                <div className="flex items-center gap-[4px] pt-[8px]">
                  <p className="whitespace-nowrap text-[12px] font-bold leading-normal text-[#60a5fa] transition-colors group-hover:text-white md:text-[13px]">
                    Explore
                  </p>
                  <svg className="block size-[12px]" fill="none" viewBox="0 0 12 12">
                    <path
                      d="M2.4996 6H9.5004M6 9.5004L9.5004 6L6 2.4996"
                      stroke="#60A5FA"
                      strokeLinecap="round"
                      strokeWidth="2"
                    />
                  </svg>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Cikgu AI / Nova companion ───────────────────────────────── */
function NovaSection() {
  const features = [
    "Explains concepts in simple language",
    "Gives instant feedback on answers",
    "Adapts to your learning style",
    "Available 24/7 across all devices",
  ];

  return (
    <div id="cikgu-ai" className="relative w-full overflow-hidden bg-[#050510] py-24 md:p-[120px]">
      <div
        className="pointer-events-none absolute left-[20px] top-[60px] size-[320px] md:left-[100px] md:top-[100px] md:size-[600px]"
        style={{ animation: "lp3NebulaPulse 7s ease-in-out infinite" }}
      >
        <svg className="block size-full" fill="none" viewBox="0 0 900 900">
          <g filter="url(#nn1)" opacity="0.3">
            <circle cx="450" cy="450" fill="#4F46E5" r="300" />
          </g>
          <defs>
            <filter id="nn1" filterUnits="userSpaceOnUse" width="900" height="900" x="0" y="0">
              <feGaussianBlur stdDeviation="75" />
            </filter>
          </defs>
        </svg>
      </div>
      <div
        className="pointer-events-none absolute right-[-150px] top-[-60px] size-[280px] opacity-40 md:right-[-270px] md:top-[-100px] md:size-[520px]"
        style={{ animation: "lp3PlanetFloat 6s ease-in-out infinite 1s" }}
      >
        <img alt="" className="block size-full" src={imgNovaEllipse} />
      </div>

      <div className="relative flex flex-col items-center gap-12 px-6 md:flex-row md:gap-[80px]">
        <div className="relative flex w-full shrink-0 flex-col items-center justify-center md:w-[560px]">
          <motion.div
            className="relative flex size-[260px] shrink-0 items-center justify-center md:size-[500px]"
            animate={{ scaleX: [1, 1.04, 1], scaleY: [1, 1.04, 1], y: [0, -24, 0] }}
            transition={{ duration: 4, ease: [0.45, 0, 0.55, 1], repeat: Infinity }}
          >
            <div className="relative size-[220px] shrink-0 md:size-[420px]">
              <img alt="Nova AI" className="block size-full object-contain" src={imgNovaOrb} />
            </div>
            <div
              className="absolute inset-[-5%] animate-spin rounded-full border border-indigo-500/20"
              style={{ animationDuration: "12s" }}
            />
            <div
              className="absolute inset-[-15%] animate-spin rounded-full border border-blue-500/10"
              style={{ animationDuration: "25s", animationDirection: "reverse" }}
            />
          </motion.div>
        </div>

        <div className="flex w-full shrink-0 flex-col items-start gap-[32px] md:w-[584px] md:gap-[40px]">
          <Reveal direction="right">
            <div className="flex flex-col items-start gap-[16px] font-extrabold">
              <p className="text-[13px] uppercase tracking-wide leading-normal text-[#f59e0b] md:text-[14px]">
                Your AI study guide
              </p>
              <p className="text-[40px] leading-[1.15] text-white md:text-[56px] md:leading-[64px]">Meet Cikgu AI</p>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.1}>
            <div className="flex w-full flex-col items-start gap-[24px]">
              {features.map((f, i) => (
                <motion.div key={i} className="flex items-center gap-[16px]" whileHover={{ x: 4 }}>
                  <div className="relative flex size-[40px] shrink-0 items-center justify-center rounded-[20px] bg-[rgba(96,165,250,0.15)]">
                    <svg className="block size-[20px]" fill="none" viewBox="0 0 20 20">
                      <path
                        d="M7.49971 9.16644L9.99971 11.6664L18.333 3.33311"
                        stroke="#60A5FA"
                        strokeLinecap="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <p className="text-[16px] font-medium leading-normal text-white md:text-[18px]">{f}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.2}>
            <motion.a
              href="#pricing"
              className="flex cursor-pointer items-center justify-center rounded-[100px] bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] px-[32px] py-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050510] focus-visible:ring-[#a78bfa]"
              style={{ boxShadow: "0px 8px 12px rgba(124,58,237,0.4)" }}
              whileHover={{ scale: 1.05, boxShadow: "0px 12px 24px rgba(124,58,237,0.6)" }}
              whileTap={{ scale: 0.97 }}
            >
              <p className="whitespace-nowrap text-[16px] font-medium leading-[24px] text-white">
                Talk to Cikgu AI
              </p>
            </motion.a>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

/* ── Progress tracking ───────────────────────────────────────── */
function ProgressBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div className="relative flex h-[6px] w-full items-start overflow-hidden rounded-[3px] bg-[rgba(255,255,255,0.1)]">
      <motion.div
        className="relative h-full"
        style={{ background: color }}
        initial={{ width: 0 }}
        whileInView={{ width: `${pct}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />
    </div>
  );
}

function ProgressTracking() {
  const subjects = [
    { img: imgProgressScience, name: "Science", xp: "4,200 XP", color: "#60a5fa", pct: 85 },
    { img: imgProgressMath, name: "Mathematics", xp: "3,100 XP", color: "#f59e0b", pct: 60 },
    { img: imgProgressEnglish, name: "English", xp: "1,800 XP", color: "#10b981", pct: 45 },
    { img: imgProgressBm, name: "B. Malaysia", xp: "5,400 XP", color: "#fbbf24", pct: 90 },
    { img: imgProgressSejarah, name: "Sejarah", xp: "900 XP", color: "#ef4444", pct: 30 },
    { img: imgProgressGeografi, name: "Geografi", xp: "2,600 XP", color: "#8b5cf6", pct: 75 },
  ];

  return (
    <div className="relative flex w-full flex-col items-center gap-[48px] overflow-hidden bg-[#050510] px-6 py-24 md:gap-[64px] md:p-[120px]">
      <Reveal>
        <div className="flex w-full flex-col items-center gap-[16px] text-white">
          <p className="text-center text-[32px] font-bold leading-normal md:text-[48px] md:whitespace-nowrap">
            Watch the progress, not just the grades
          </p>
          <p className="w-full text-center text-[14px] font-normal leading-[24px] text-white/70 md:w-[700px] md:text-[16px]">
            Every quiz, every lesson, every streak — visualised in one cosmic dashboard.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.15} className="flex w-full justify-center">
        <div className="relative w-full max-w-[1000px] rounded-[24px] bg-[rgba(255,255,255,0.08)] backdrop-blur-[16px]">
          <div className="relative flex flex-col items-start gap-[32px] rounded-[inherit] p-6 md:gap-[40px] md:p-[48px]">
            <div className="flex w-full flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-[16px] md:gap-[24px]">
                <div className="relative size-[48px] md:size-[64px]">
                  <img alt="" className="absolute block size-full" src={imgAvatarCommander} />
                </div>
                <div className="flex flex-col items-start gap-[4px] leading-normal text-white">
                  <p className="text-[18px] font-extrabold md:text-[20px]">Commander Adam</p>
                  <p className="text-[13px] font-normal text-white/65 md:text-[14px]">
                    Space Cadet → Cosmonaut
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-[24px] leading-normal whitespace-nowrap md:gap-[32px]">
                <div className="flex flex-col items-center gap-[4px] text-white">
                  <p className="text-[22px] font-extrabold md:text-[24px]">🔥 14</p>
                  <p className="text-[10px] font-normal uppercase text-white/65">Day Streak</p>
                </div>
                <div className="flex flex-col items-center gap-[4px] text-[#f59e0b]">
                  <p className="text-[22px] font-extrabold md:text-[24px]">18,432</p>
                  <p className="text-[10px] font-normal uppercase text-white/65">Total XP</p>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-wrap items-start gap-[20px] md:gap-[24px]">
              {subjects.map((s) => (
                <motion.div
                  key={s.name}
                  className="relative flex w-full flex-col items-start gap-[16px] rounded-[16px] bg-[rgba(255,255,255,0.05)] p-[20px] sm:w-[calc(50%-12px)] lg:w-[270px]"
                  whileHover={{ scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" }}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-[12px]">
                      <div className="relative size-[32px]">
                        <img alt="" className="absolute block size-full" src={s.img} />
                      </div>
                      <p className="whitespace-nowrap text-[14px] font-bold leading-normal text-white">
                        {s.name}
                      </p>
                    </div>
                    <p className="whitespace-nowrap text-[12px] leading-normal" style={{ color: s.color }}>
                      {s.xp}
                    </p>
                  </div>
                  <div className="flex w-full flex-col items-start gap-[8px]">
                    <ProgressBar pct={s.pct} color={s.color} />
                    <p className="w-full text-right text-[10px] font-normal leading-normal text-white/60">
                      {s.pct}% Complete
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="relative flex w-full flex-wrap items-start justify-between gap-4 pt-[20px]">
              <div className="absolute inset-0 border-t border-solid border-[rgba(255,255,255,0.1)]" />
              {["Lesson Streak", "Quiz Master", "Planet Unlocked", "Top 10%"].map((badge) => (
                <motion.div key={badge} className="flex items-center gap-[12px]" whileHover={{ scale: 1.05 }}>
                  <div className="relative flex size-[48px] items-center justify-center rounded-[24px] bg-[rgba(245,158,11,0.15)]">
                    <svg className="block size-[24px]" fill="none" viewBox="0 0 24 24">
                      <path
                        d="M7.2113 15.0002L2.66162 7.13961C2.46544 6.80046 2.37317 6.41114 2.39628 6.02C2.41939 5.62886 2.55686 5.25312 2.79161 4.93944L4.4015 2.79926C4.58778 2.55085 4.82933 2.34923 5.10703 2.21036C5.38472 2.0715 5.69092 1.9992 6.00139 1.9992H18.0005C18.311 1.9992 18.6172 2.0715 18.8949 2.21036C19.1726 2.34923 19.4142 2.55085 19.6004 2.79926L21.2003 4.93944C21.4366 5.25211 21.5759 5.62733 21.6008 6.01849C21.6257 6.40965 21.5351 6.7995 21.3403 7.13961L16.7906 15.0002"
                        stroke="#F59E0B"
                        strokeLinecap="round"
                        strokeWidth="2"
                      />
                    </svg>
                  </div>
                  <p className="whitespace-nowrap text-[14px] font-semibold leading-normal text-white">
                    {badge}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="absolute inset-0 rounded-[24px] border border-solid border-[rgba(255,255,255,0.15)]" />
        </div>
      </Reveal>
    </div>
  );
}

/* ── Parents trust ───────────────────────────────────────────── */
function ParentsSection() {
  return (
    <div id="parents" className="relative w-full shrink-0 overflow-hidden bg-[#0b1426]">
      <div className="mx-auto flex w-full max-w-[1440px] min-h-[600px] flex-col md:h-[800px] md:flex-row">
        <div className="relative flex w-full shrink-0 flex-col items-start justify-center gap-[40px] px-6 py-[60px] md:w-[720px] md:gap-[56px] md:py-0 md:pl-[100px] md:pr-[80px]">
          <Reveal direction="left">
            <div className="flex w-full flex-col items-start gap-[16px]">
              <p
                className="w-full text-[72px] font-bold leading-[1.1] text-[#d4a017] md:text-[128px]"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Parents
              </p>
              <p className="w-full text-[12px] font-semibold uppercase leading-normal tracking-[1.68px] text-white md:text-[14px]">
                TRUST
              </p>
            </div>
          </Reveal>

          <Reveal direction="left" delay={0.15}>
            <div className="flex w-full flex-col items-start gap-[24px] md:gap-[32px]">
              {[
                {
                  num: "01",
                  title: "Monitor",
                  desc: (
                    <>
                      Stay informed with <strong>real-time performance reports</strong>, allowing you to
                      track your child{"'"}s progress and identify areas needing attention.
                    </>
                  ),
                },
                {
                  num: "02",
                  title: "Alerts",
                  desc: (
                    <>
                      Receive <strong>early weakness alerts</strong> to promptly address challenges your
                      child may face, ensuring they stay on track for success.
                    </>
                  ),
                },
              ].map((f) => (
                <div key={f.num} className="flex w-full flex-col items-start gap-[10px] md:gap-[12px]">
                  <div className="flex items-baseline gap-[16px] text-[24px] leading-normal text-white md:text-[32px]">
                    <p style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{f.num}</p>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 500 }}>{f.title}</p>
                  </div>
                  <div className="h-px w-full bg-white opacity-30" />
                  <p className="w-full text-[14px] font-normal leading-[1.5] text-white md:text-[16px]">
                    {f.desc}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="relative h-[300px] flex-1 md:h-full">
          <img
            alt="Parent Dashboard"
            className="absolute inset-0 size-full max-w-none object-cover"
            src={imgParentsDashboard}
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to right, rgba(11,20,38,0.3), transparent)" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Mission plans (pricing) ─────────────────────────────────── */
function CheckItem({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-[12px]">
      <svg className="block size-[14px] shrink-0" fill="none" viewBox="0 0 14 14">
        <g opacity="0.5">
          <path d="M11.6662 3.5L5.25017 9.9162L2.3338 6.99975" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
      <p className="whitespace-nowrap text-[14px] font-normal leading-normal text-white opacity-80">{label}</p>
    </div>
  );
}

function MissionPlans() {
  return (
    <div id="pricing" className="relative flex w-full flex-col items-center gap-[48px] overflow-hidden bg-[#050510] px-6 py-24 md:gap-[64px] md:p-[120px]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[800px] -translate-x-1/2 -translate-y-1/2"
        style={{ animation: "lp3NebulaPulse2 10s ease-in-out infinite" }}
      >
        <svg className="block size-full" fill="none" viewBox="0 0 1100 1100">
          <g filter="url(#mpn1)" opacity="0.1">
            <circle cx="550" cy="550" fill="#F59E0B" r="400" />
          </g>
          <defs>
            <filter id="mpn1" filterUnits="userSpaceOnUse" width="1100" height="1100" x="0" y="0">
              <feGaussianBlur stdDeviation="75" />
            </filter>
          </defs>
        </svg>
      </div>

      <Reveal>
        <div className="flex flex-col items-center gap-[16px] text-center text-white">
          <p className="text-[32px] font-bold leading-normal md:text-[48px]">Pick your rank</p>
          <p className="text-[14px] font-normal leading-[24px] text-white/70 md:text-[16px]">{`Start free. Upgrade the moment you're ready for more.`}</p>
        </div>
      </Reveal>

      <div className="grid w-full max-w-6xl grid-cols-1 items-end gap-[24px] md:grid-cols-3 md:gap-[32px]">
        {/* Explorer */}
        <Reveal delay={0.1}>
          <div className="relative min-w-0 rounded-[24px] bg-[rgba(255,255,255,0.08)] backdrop-blur-[16px]">
            <div
              className="absolute inset-0 rounded-[24px] border border-solid border-[rgba(255,255,255,0.15)]"
              style={{ boxShadow: "0px 12px 40px 0px rgba(96,165,250,0.2)" }}
            />
            <div className="relative flex flex-col items-start gap-[32px] p-[32px] md:p-[40px]">
              <div className="flex w-full flex-col items-start gap-[16px]">
                <div className="relative size-[60px]">
                  <img alt="" className="absolute block size-full" src={imgPlanExplorer} />
                </div>
                <p className="whitespace-nowrap text-[14px] font-extrabold uppercase leading-normal text-[#60a5fa]">
                  Explorer
                </p>
                <p className="whitespace-nowrap text-[40px] font-extrabold leading-normal text-white">Free</p>
              </div>
              <div className="flex w-full flex-1 flex-col items-start gap-[16px]">
                {["Free notes only", "1 quiz only", "1 flashcard", "Basic"].map((item) => (
                  <CheckItem key={item} label={item} />
                ))}
              </div>
              <motion.a
                href="#pricing"
                className="relative flex w-full cursor-pointer items-center justify-center rounded-[100px] px-[32px] py-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050510] focus-visible:ring-[#a78bfa]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="absolute inset-0 rounded-[100px] border-[1.5px] border-solid border-white" />
                <p className="whitespace-nowrap text-[16px] font-medium leading-[24px] text-white">
                  Start Exploring
                </p>
              </motion.a>
            </div>
          </div>
        </Reveal>

        {/* Commander */}
        <Reveal delay={0.2}>
          <div className="relative min-w-0 rounded-[24px] bg-[rgba(255,255,255,0.08)] backdrop-blur-[16px]">
            <div
              className="absolute inset-0 rounded-[24px] border-2 border-solid border-[#f59e0b]"
              style={{ boxShadow: "0px 12px 40px 0px rgba(124,58,237,0.2)" }}
            />
            <div className="absolute left-1/2 top-[-16px] z-10 -translate-x-1/2 rounded-[100px] bg-[#f59e0b] px-[16px] py-[6px]">
              <p className="whitespace-nowrap text-[11px] font-extrabold leading-normal text-[#050510]">
                MOST POPULAR
              </p>
            </div>
            <div className="relative flex flex-col items-start gap-[32px] p-[32px] md:p-[40px]">
              <div className="flex w-full flex-col items-start gap-[16px]">
                <div className="relative size-[60px]">
                  <img alt="" className="absolute block size-full" src={imgPlanCommander} />
                </div>
                <p className="whitespace-nowrap text-[14px] font-extrabold uppercase leading-normal text-[#7c3aed]">
                  Commander
                </p>
                <div className="flex items-end gap-[4px] leading-normal text-white">
                  <p className="text-[40px] font-extrabold">RM29</p>
                  <p className="text-[16px] font-normal opacity-40">/mo</p>
                </div>
                <p className="w-[280px] text-[12px] font-normal leading-normal text-white/72">
                  Unlock your full learning adventure.
                </p>
              </div>
              <div className="flex w-full flex-1 flex-col items-start gap-[16px]">
                <p className="w-[280px] text-[12px] font-semibold leading-normal text-[#9cf]">
                  Everything needed to study:
                </p>
                {["All notes", "All quizzes", "All flashcards", "All mind maps", "Cikgu AI", "XP", "Companion", "Future content"].map(
                  (item) => (
                    <CheckItem key={item} label={item} />
                  ),
                )}
              </div>
              <motion.a
                href="#contact"
                className="relative block w-full cursor-pointer rounded-[100px] bg-gradient-to-r from-[#7c3aed] to-[#4f46e5] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050510] focus-visible:ring-[#a78bfa]"
                style={{ boxShadow: "0px 8px 12px rgba(124,58,237,0.4)" }}
                whileHover={{ scale: 1.03, boxShadow: "0px 12px 24px rgba(124,58,237,0.6)" }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="flex w-full items-center justify-center px-[32px] py-[16px]">
                  <p className="whitespace-nowrap text-[16px] font-medium leading-[24px] text-white">
                    Upgrade to Commander
                  </p>
                </div>
              </motion.a>
            </div>
          </div>
        </Reveal>

        {/* Mission Control */}
        <Reveal delay={0.3}>
          <div className="relative min-w-0 rounded-[24px] bg-[rgba(255,255,255,0.08)] backdrop-blur-[16px]">
            <div
              className="absolute inset-0 rounded-[24px] border border-solid border-[rgba(255,255,255,0.15)]"
              style={{ boxShadow: "0px 12px 40px 0px rgba(245,158,11,0.2)" }}
            />
            <div className="relative flex flex-col items-start gap-[32px] p-[32px] md:p-[40px]">
              <div className="flex w-full flex-col items-start gap-[16px]">
                <div className="relative size-[60px]">
                  <img alt="" className="absolute block size-full" src={imgPlanMissionControl} />
                </div>
                <p className="w-[200px] text-[14px] font-extrabold uppercase leading-normal text-[#f59e0b]">
                  🛰 Mission Control
                </p>
                <div className="flex items-end gap-[4px] leading-normal text-white">
                  <p className="text-[40px] font-extrabold">RM59</p>
                  <p className="text-[16px] font-normal opacity-40">/mo</p>
                </div>
                <p className="w-[200px] text-[14px] font-bold leading-normal text-[#ffd633]">For Parents</p>
                <p className="w-[280px] text-[12px] font-normal leading-normal text-white/72">{`Stay connected with your child's learning journey.`}</p>
              </div>
              <div className="flex w-full flex-1 flex-col items-start gap-[16px]">
                <p className="w-[250px] text-[14px] font-normal leading-normal text-[#9cf] opacity-80">
                  Everything in Commander PLUS:
                </p>
                {["📊 Parent Dashboard", "📧 Weekly Progress Report", "🎯 Weekly Study Goals"].map((item) => (
                  <CheckItem key={item} label={item} />
                ))}
              </div>
              <motion.a
                href="#contact"
                className="relative flex w-full cursor-pointer items-center justify-center rounded-[100px] px-[32px] py-[16px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050510] focus-visible:ring-[#a78bfa]"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <div className="absolute inset-0 rounded-[100px] border-[1.5px] border-solid border-white" />
                <p className="whitespace-nowrap text-[16px] font-medium leading-[24px] text-white">
                  Get Mission Control
                </p>
              </motion.a>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

/* ── Final CTA + footer ──────────────────────────────────────── */
function FinalCta() {
  return (
    <div className="relative flex w-full flex-col items-center overflow-hidden bg-[#050510] py-20 md:py-[100px]">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 opacity-30 md:size-[1000px]"
        style={{ animation: "lp3NebulaPulse 10s ease-in-out infinite" }}
      >
        <div className="absolute inset-[-4%]">
          <img alt="" className="block size-full max-w-none object-contain" src={imgFinalGlow} />
        </div>
      </div>

      <div className="relative flex w-full flex-col items-center gap-[40px] px-6">
        <Reveal>
          <div className="flex flex-col items-center gap-[24px]">
            <div className="relative flex items-start rounded-[100px] bg-[rgba(245,158,11,0.15)] px-[16px] py-[8px]">
              <div className="absolute inset-0 rounded-[100px] border border-solid border-[#f59e0b]" />
              <p className="whitespace-nowrap text-[12px] font-extrabold uppercase leading-normal text-[#f59e0b]">
                BEGIN YOUR JOURNEY
              </p>
            </div>
            <div className="text-center text-[40px] font-extrabold leading-[1.15] text-white md:text-[72px]">
              <p>Ready to Launch Your</p>
              <p>Mission?</p>
            </div>
            <p className="w-full max-w-[600px] text-center text-[16px] font-normal leading-[1.5] text-white/75 md:text-[20px] md:leading-[30px]">
              The galaxy of knowledge is waiting for you. Join 50,000+ students already exploring AcadeMY.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <motion.div
            className="relative flex cursor-pointer items-start rounded-[100px] bg-[#7c3aed] px-[40px] py-[20px] md:px-[56px] md:py-[24px]"
            style={{ boxShadow: "0px 12px 20px rgba(124,58,237,0.67)" }}
            whileHover={{ scale: 1.06, boxShadow: "0px 20px 40px rgba(124,58,237,0.8)" }}
            whileTap={{ scale: 0.97 }}
          >
            <p className="whitespace-nowrap text-[18px] font-extrabold leading-normal text-white md:text-[20px]">
              Launch Your Mission →
            </p>
          </motion.div>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="flex flex-wrap items-start justify-center gap-[20px] pt-[20px] text-[13px] leading-normal text-white/60 md:gap-[40px]">
            <p>No credit card required</p>
            <p>Cancel anytime</p>
            <p>Free forever plan</p>
          </div>
        </Reveal>
      </div>

      <div className="relative mt-auto flex w-full flex-col items-start gap-[40px] px-6 pb-[40px] pt-[80px] md:px-[120px]">
        <div className="h-px w-full bg-white opacity-[0.1]" />
        <div className="flex w-full flex-wrap items-center justify-between gap-6">
          <div className="h-[32px] w-[128px] md:h-[40px] md:w-[160px]">
            <img alt="AcadeMY" className="size-full object-contain" src={imgAcademyLogo} />
          </div>
          <div className="flex flex-wrap gap-[24px] text-[14px] font-normal leading-normal md:gap-[32px]">
            {["Privacy", "Terms", "Support", "Contact"].map((l) => (
              <a
                key={l}
                href="#"
                className="whitespace-nowrap rounded-sm text-white/65 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a78bfa]"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
        <p className="w-full text-[12px] font-normal leading-normal text-white/40">
          © 2026 AcadeMY Malaysia. Every Legend Starts With Learning.
        </p>
      </div>
    </div>
  );
}

/* ── Page root ───────────────────────────────────────────────── */
function LandingPage3() {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#050510]">
      <style>{lp3Style}</style>
      <StarCanvas />
      <Header />
      <div className="relative z-10 flex w-full flex-col items-start">
        <Hero />
        <WhySection />
        <SubjectsSection />
        <NovaSection />
        <ProgressTracking />
        <ParentsSection />
        <MissionPlans />
        <FinalCta />
      </div>
    </div>
  );
}
