import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Sparkles,
  Check,
  Rocket,
  Languages,
  NotebookPen,
  Layers,
  BrainCircuit,
  ClipboardCheck,
  ShieldCheck,
  Star,
} from "lucide-react";

import { useState, useEffect, useRef, lazy, Suspense, type CSSProperties, type ReactNode, type MouseEvent as ReactMouseEvent } from "react";
import gsap from "gsap";
import { motion } from "framer-motion";
import { useSignInModal } from "@/context/sign-in-modal";
import { useAuth } from "@/context/auth-context";
import { CinematicStars } from "@/components/landing/CinematicStars";
import { WatchIntroVideo } from "@/components/landing/WatchIntroVideo";
import starCaptain from "@/assets/astronaut-hero.png.asset.json";
import backGround from "@/assets/back-ground.webp.asset.json";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

/* ---------------- Shared bits ---------------- */


function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-semibold uppercase tracking-[0.18em] text-primary/90 bg-primary/10 ring-1 ring-primary/30">
      <Sparkles className="w-3 h-3" />
      {children}
    </span>
  );
}

function PrimaryCta({
  to,
  onClick,
  children,
}: {
  to?: string;
  onClick?: () => void;
  children: ReactNode;
}) {
  const cls =
    "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-semibold shadow-[0_10px_40px_-10px_rgba(139,92,246,0.7)] hover:scale-[1.03] transition-transform";
  if (to)
    return (
      <Link to={to} className={cls}>
        {children}
        <ArrowRight className="w-4 h-4" />
      </Link>
    );
  return (
    <button onClick={onClick} className={cls}>
      {children}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}

function SecondaryCta({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white text-sm font-semibold ring-1 ring-white/10 transition-colors"
    >
      {children}
    </Link>
  );
}

/* ---------------- Top nav ---------------- */

const NAV_LINKS = [
  { id: "subjects", label: "Subjects" },
  { id: "cikgu-ai", label: "Cikgu AI" },
  { id: "parents", label: "Parents" },
  { id: "pricing", label: "Pricing" },
] as const;

const NAV_OFFSET = 88;

function smoothScrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const start = window.scrollY;
  const target = el.getBoundingClientRect().top + start - NAV_OFFSET;
  const distance = target - start;
  const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced || Math.abs(distance) < 4) {
    window.scrollTo(0, target);
    return true;
  }
  const duration = Math.min(800, Math.max(500, Math.abs(distance) * 0.6));
  const startTime = performance.now();
  const ease = (t: number) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);
  const step = (now: number) => {
    const t = Math.min(1, (now - startTime) / duration);
    window.scrollTo(0, start + distance * ease(t));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
  return true;
}

function LandingNav() {
  const { open } = useSignInModal();
  const { user } = useAuth();
  const [activeId, setActiveId] = useState<string>("");

  // Scroll on load if URL has a hash matching one of the sections
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    if (!NAV_LINKS.some((l) => l.id === hash)) return;
    // Wait a tick so lazy sections are mounted
    let attempts = 0;
    const tryScroll = () => {
      if (smoothScrollToId(hash)) return;
      if (attempts++ < 40) setTimeout(tryScroll, 100);
    };
    setTimeout(tryScroll, 50);
  }, []);

  // Active section tracking with IntersectionObserver
  useEffect(() => {
    const observed: HTMLElement[] = [];
    NAV_LINKS.forEach((l) => {
      const el = document.getElementById(l.id);
      if (el) observed.push(el);
    });
    if (!observed.length) return;
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.intersectionRatio);
          else visible.delete(e.target.id);
        }
        let bestId = "";
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        setActiveId(bestId);
      },
      { rootMargin: `-${NAV_OFFSET + 20}px 0px -55% 0px`, threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    observed.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleNavClick = (e: ReactMouseEvent, id: string) => {
    e.preventDefault();
    const scrolled = smoothScrollToId(id);
    if (scrolled) {
      history.replaceState(null, "", `#${id}`);
      setActiveId(id);
    }
  };

  return (
    <header className="absolute top-0 inset-x-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative">
            <div className="absolute inset-0 bg-primary blur-lg opacity-60 group-hover:opacity-100 transition-opacity" />
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="font-display text-xl font-bold tracking-tight">
            <span className="text-white">Acade</span>
            <span
              className="text-nova-yellow"
              style={{
                textShadow:
                  "0 0 12px rgba(250,204,21,0.7), 0 0 24px rgba(250,204,21,0.4)",
              }}
            >
              MY
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/[0.04] ring-1 ring-white/10 backdrop-blur">
          {NAV_LINKS.map((l) => {
            const active = activeId === l.id;
            return (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => handleNavClick(e, l.id)}
                aria-current={active ? "true" : undefined}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        {user ? (
          <Link
            to="/dashboard"
            className="px-4 py-2 rounded-full bg-white text-[#0b0a1f] text-sm font-semibold hover:scale-[1.03] transition-transform"
          >
            Dashboard
          </Link>
        ) : (
          <button
            onClick={() => open()}
            className="px-4 py-2 rounded-full bg-white text-[#0b0a1f] text-sm font-semibold hover:scale-[1.03] transition-transform"
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}


/* ---------------- Hero ---------------- */

function Hero() {
  const { open } = useSignInModal();
  const [comingSoonOpen, setComingSoonOpen] = useState(false);
  const heroCardRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const xpBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = heroCardRef.current;
    const img = heroImgRef.current;
    const glow = glowRef.current;
    const badge = badgeRef.current;
    const xp = xpBarRef.current;
    if (!card || !img) return;

    const ctx = gsap.context(() => {
      // Entrance — card fades in
      gsap.from(card, {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 1.1,
        ease: "power3.out",
      });

      // Astronaut zoom-in from tiny to full size
      gsap.from(img, {
        scale: 0.15,
        opacity: 0,
        duration: 1.6,
        ease: "power4.out",
        delay: 0.2,
      });

      if (badge) {
        gsap.from(badge, {
          y: -20,
          opacity: 0,
          duration: 0.8,
          delay: 0.6,
          ease: "back.out(2)",
        });
      }
      if (xp) {
        gsap.from(xp, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.2,
          delay: 0.9,
          ease: "power2.out",
        });
      }

      // Continuous float — more dramatic
      gsap.to(img, {
        y: -40,
        duration: 3.5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
      gsap.to(img, {
        rotation: 2.5,
        duration: 5,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 60%",
      });

      // Glow breathing
      if (glow) {
        gsap.to(glow, {
          opacity: 1,
          scale: 1.08,
          duration: 3.6,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }

      // Mouse + touch parallax (window-level, works even outside the card)
      let targetX = 0;
      let targetY = 0;
      const updateFromPoint = (clientX: number, clientY: number) => {
        targetX = (clientX / window.innerWidth) - 0.5;
        targetY = (clientY / window.innerHeight) - 0.5;
        gsap.to(img, {
          x: targetX * 60,
          y: `+=${0}`,
          rotateY: targetX * 18,
          rotateX: -targetY * 14,
          z: 40,
          duration: 1.1,
          ease: "power3.out",
          overwrite: "auto",
        });
        if (glow) {
          gsap.to(glow, {
            x: targetX * -30,
            y: targetY * -20,
            duration: 1.4,
            ease: "power3.out",
            overwrite: "auto",
          });
        }
      };
      const onMove = (e: MouseEvent) => updateFromPoint(e.clientX, e.clientY);
      const onTouch = (e: TouchEvent) => {
        const t = e.touches[0];
        if (t) updateFromPoint(t.clientX, t.clientY);
      };
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
      return () => {
        window.removeEventListener("mousemove", onMove);
        window.removeEventListener("touchmove", onTouch);
      };

    }, card);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative overflow-hidden pt-20 pb-24 md:pt-24 md:pb-32">
      {/* glow blobs */}
      <div
        aria-hidden
        className="absolute -top-32 -right-32 w-[520px] h-[520px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(168,85,247,0.35), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="absolute top-1/2 -left-40 w-[420px] h-[420px] rounded-full"
        style={{
          background:
            "radial-gradient(closest-side, rgba(59,130,246,0.25), transparent 70%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-8 grid md:grid-cols-[1.05fr_0.95fr] gap-12 items-center">
        <div>
          <SectionLabel>KSSM-aligned · Form 1–3</SectionLabel>
          <Dialog open={comingSoonOpen} onOpenChange={setComingSoonOpen}>
            <DialogTrigger asChild>
              <button
                type="button"
                className="mt-2 text-[11px] font-medium uppercase tracking-[0.18em] text-white/40 hover:text-white/70 cursor-pointer transition-colors bg-transparent border-0 p-0"
              >
                Form 4–5 (Coming Soon)
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#0b0a1f] border-white/10 text-white max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white text-lg font-semibold">
                  Form 4 &amp; 5 — Coming Soon
                </DialogTitle>
                <DialogDescription className="text-white/60 text-sm">
                  We are expanding AcadeMY to cover upper secondary KSSM
                  subjects.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3 text-sm text-white/70">
                <p>Planned subjects include:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Sains / Science (BM &amp; DLP)</li>
                  <li>Sejarah</li>
                  <li>Geografi</li>
                  <li>Matematik / Mathematics</li>
                  <li>Bahasa Melayu &amp; English</li>
                </ul>
                <p className="pt-2">
                  Target release:{" "}
                  <span className="text-white font-medium">Q4 2025</span>
                </p>
                <p className="text-xs text-white/40">
                  Sign up and we will notify you the moment Form 4–5 goes live.
                </p>
              </div>
            </DialogContent>
          </Dialog>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl md:text-7xl font-bold leading-[1.02] tracking-tight text-white">
            Malaysia's
            <br />
            <span className="bg-gradient-to-r from-white via-[#c9b8ff] to-accent bg-clip-text text-transparent">
              Interstellar
            </span>
            <br />
            Learning Platform
          </h1>
          <p className="mt-6 max-w-xl text-base md:text-lg text-white/65 leading-relaxed">
            Notes, flashcards, quizzes and mind maps in BM &amp; DLP — powered
            by your own Cikgu AI. Level up like a game, master KSSM like a pro.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PrimaryCta onClick={() => open()}>
              Start your mission
            </PrimaryCta>
            <SecondaryCta to="/subjects">Explore subjects</SecondaryCta>
            <WatchIntroVideo />
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-6 text-xs text-white/50">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> KSSM aligned
            </div>
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-sky-400" /> BM &amp; DLP
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-nova-yellow" /> Free to start
            </div>
          </div>
        </div>

        {/* Cinematic floating astronaut — blended into background */}
        <div className="relative group [perspective:1400px]">
          {/* atmospheric glow behind */}
          <div
            ref={glowRef}
            aria-hidden
            className="absolute -inset-10 blur-3xl opacity-90 pointer-events-none"
            style={{
              background:
                "radial-gradient(50% 55% at 50% 55%, rgba(255,140,60,0.45), transparent 70%), radial-gradient(45% 45% at 30% 30%, rgba(168,85,247,0.35), transparent 70%), radial-gradient(40% 40% at 75% 75%, rgba(250,204,21,0.28), transparent 70%)",
            }}
          />
          {/* soft ground haze */}
          <div
            aria-hidden
            className="absolute inset-x-[-10%] bottom-[-6%] h-40 blur-2xl opacity-70 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 100% at 50% 100%, rgba(255,120,40,0.55), transparent 70%)",
            }}
          />

          <div
            ref={heroCardRef}
            className="relative aspect-[4/5] [transform-style:preserve-3d]"
          >
            <motion.img
              ref={heroImgRef}
              src={starCaptain.url}
              alt="AcadeMY astronaut floating in deep space"
              className="absolute inset-0 w-full h-full object-contain object-center will-change-transform drop-shadow-[0_40px_60px_rgba(120,80,255,0.45)]"
              draggable={false}
              animate={{
                y: [0, -22, 0, 14, 0],
                x: [0, 10, 0, -8, 0],
                rotate: [0, 2.5, 0, -2, 0],
              }}
              transition={{
                duration: 9,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            />



            {/* Level badge */}
            <div
              ref={badgeRef}
              className="absolute left-1/2 -translate-x-1/2 bottom-16 flex items-center gap-2 rounded-full bg-black/45 backdrop-blur-md ring-1 ring-nova-yellow/40 px-3 py-1.5 w-fit z-10"
            >
              <span className="grid place-items-center w-6 h-6 rounded-full bg-nova-yellow text-[#1a0f2e] text-[11px] font-black shadow-[0_0_18px_rgba(250,204,21,0.6)]">
                18
              </span>
              <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-nova-yellow">
                Star Captain
              </span>
            </div>

            {/* XP bar */}
            <div className="absolute inset-x-0 bottom-2 px-6">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/70">
                <span>Lvl 18</span>
                <span className="text-nova-yellow">12,480 XP</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <div
                  ref={xpBarRef}
                  className="h-full rounded-full bg-gradient-to-r from-nova-yellow via-amber-300 to-nova-yellow shadow-[0_0_14px_rgba(250,204,21,0.7)]"
                  style={{ width: "72%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Page ---------------- */

const BelowFold = lazy(() => import("@/components/landing/BelowFold"));

function DeferredBelowFold() {
  const [visible, setVisible] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (visible) return;
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);

    // Also warm the chunk on idle so it's ready before the user scrolls
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    const idle = w.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    const idleId = idle(() => {
      void import("@/components/landing/BelowFold");
    });

    return () => {
      io.disconnect();
      if (typeof w.requestIdleCallback === "function") {
        (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(idleId as number);
      } else {
        window.clearTimeout(idleId as number);
      }
    };
  }, [visible]);

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-1 w-full" />
      {visible && (
        <Suspense fallback={<div aria-hidden className="min-h-[600px]" />}>
          <BelowFold />
        </Suspense>
      )}
    </>
  );
}

export function Landing() {
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* uploaded space background */}
      <div
        aria-hidden
        className="fixed inset-0 -z-20 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backGround.url})` }}
      />
      {/* dark scrim for readability */}
      <div
        aria-hidden
        className="fixed inset-0 -z-10 bg-black/45"
      />
      <CinematicStars />
      <LandingNav />
      <Hero />
      <DeferredBelowFold />
    </div>
  );
}

