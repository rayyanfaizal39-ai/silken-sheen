import { Link } from "@tanstack/react-router";
import { Check, NotebookPen, Layers, BrainCircuit, ClipboardCheck } from "lucide-react";

import {
  useState,
  useEffect,
  useRef,
  lazy,
  Suspense,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { useSignInModal } from "@/context/sign-in-modal";
import { useAuth } from "@/context/auth-context";
import { CinematicStars } from "@/components/landing/CinematicStars";
import { CosmicHero } from "@/components/landing/CosmicHero";
import { AcademyLogo } from "@/components/AcademyLogo";
import backGround from "@/assets/back-ground.webp.asset.json";

/* ---------------- Top nav ---------------- */

const NAV_LINKS = [
  { id: "top", label: "Home" },
  { id: "features", label: "Features" },
  { id: "parents", label: "For Parents" },
] as const;

const NAV_OFFSET = 88;

function smoothScrollToId(id: string) {
  const isTop = id === "top";
  const el = isTop ? null : document.getElementById(id);
  if (!isTop && !el) return false;
  const start = window.scrollY;
  const target = isTop ? 0 : el!.getBoundingClientRect().top + start - NAV_OFFSET;
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
        <Link
          to="/"
          aria-label="AcadeMY home"
          className="group rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
        >
          <AcademyLogo className="h-auto w-[128px] transition-opacity group-hover:opacity-90 sm:w-[168px]" />
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
          <Link
            to="/upgrade"
            className="px-4 py-1.5 rounded-full text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/5 transition-colors"
          >
            Pricing
          </Link>
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
            className="px-6 py-3 rounded-lg bg-[#4f46e5] text-white text-sm font-semibold drop-shadow-[0px_4px_6px_rgba(79,70,229,0.15)] hover:scale-[1.03] transition-transform"
          >
            Sign In
          </button>
        )}
      </div>
    </header>
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
        (window as Window & { cancelIdleCallback?: (id: number) => void }).cancelIdleCallback?.(
          idleId as number,
        );
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
      <div aria-hidden className="fixed inset-0 -z-10 bg-black/45" />
      <CinematicStars />
      <LandingNav />
      <CosmicHero />
      <DeferredBelowFold />
    </div>
  );
}
