import { useEffect, useRef, useState } from "react";
import { CinematicAuthCta, CinematicLoginAction } from "./CinematicAuthActions";
import { useCinematicMotion } from "./cinematicMotionContext";

/** Anchor order matches the page. `#why-academy` is the "Why Choose AcadeMY"
 *  benefit section; `#learning-world` is the Learning Planet showcase. */
const LINKS = [
  { label: "Learning World", target: "#learning-world" },
  { label: "Why AcadeMY", target: "#why-academy" },
  { label: "Ace", target: "#cikgu-ai" },
  { label: "Parents", target: "#parents" },
  { label: "KSSM", target: "#kssm" },
];

export function AcademyLogo() {
  return (
    <span className="cine-academy-logo">
      <span className="cine-academy-logo__mark">A</span>
      <span className="cine-academy-logo__word">
        Acade<em>MY</em>
      </span>
    </span>
  );
}

export default function CinematicNavigation() {
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const motion = useCinematicMotion();

  useEffect(() => {
    if (!motion) return;
    const { gsap, ScrollTrigger } = motion;
    const nav = navRef.current;
    if (!nav) return;
    const st = ScrollTrigger.create({
      start: () => window.innerHeight * 0.6,
      onUpdate: (self) => {
        nav.classList.toggle("is-solid", self.scroll() > window.innerHeight * 0.6);
      },
    });
    nav.classList.toggle("is-solid", window.scrollY > window.innerHeight * 0.6);
    const ctx = gsap.context(() => {
      // clearProps is essential: a leftover transform on this fixed bar would
      // become the containing block for the fixed mobile menu, collapsing the
      // full-screen overlay down to the height of the bar itself.
      gsap.from(nav, {
        yPercent: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        delay: 0.4,
        clearProps: "transform",
      });
    }, nav);
    return () => {
      st.kill();
      ctx.revert();
    };
  }, [motion]);

  /* Highlight the link whose section currently occupies the viewport. Several
     sections are pinned, so an IntersectionObserver on the raw element is
     unreliable — sample which target sits across the upper third instead. */
  useEffect(() => {
    if (!motion) return;
    const { ScrollTrigger } = motion;
    const sample = () => {
      const line = window.innerHeight * 0.35;
      let found = "";
      let bestTop = -Infinity;
      for (const l of LINKS) {
        const el = navRef.current
          ?.closest(".cinematic-landing-root")
          ?.querySelector<HTMLElement>(l.target);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        // the section that owns the line; if several qualify, the one that
        // started most recently (a pinned section sits on top of the next)
        if (r.top <= line && r.bottom > line && r.top > bestTop) {
          bestTop = r.top;
          found = l.target;
        }
      }
      setActive(found);
    };
    // Driven by ScrollTrigger rather than the window scroll event: Lenis pumps
    // ScrollTrigger, so this stays in sync with smooth + programmatic scrolls.
    const st = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight,
      onUpdate: sample,
      onRefresh: sample,
    });
    sample();
    return () => st.kill();
  }, [motion]);

  /* The full-screen mobile menu owns focus while open. The page behind is both
     scroll-locked and inert, so keyboard and assistive-technology navigation
     cannot drift into visually covered content. */
  useEffect(() => {
    if (!open) return;
    const nav = navRef.current;
    const menu = menuRef.current;
    const main = nav
      ?.closest(".cinematic-landing-root")
      ?.querySelector<HTMLElement>("#cinematic-main");
    const wasInert = main?.inert ?? false;

    const focusableElements = () =>
      Array.from(
        nav?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex="0"]') ?? [],
      ).filter((element) => element.offsetParent !== null);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burgerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const focusable = focusableElements();
      const first = focusable[0];
      const last = focusable.at(-1);
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    if (main) main.inert = true;
    window.addEventListener("keydown", onKey);

    const focusFrame = window.requestAnimationFrame(() => {
      menu?.querySelector<HTMLElement>(".cine-nav__link")?.focus();
    });

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = prev;
      if (main) main.inert = wasInert;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const go = (target: string) => {
    const wasOpen = open;
    setOpen(false);
    motion?.scrollToSection(target);
    if (wasOpen) {
      window.requestAnimationFrame(() => burgerRef.current?.focus());
    }
  };

  return (
    <nav
      ref={navRef}
      className={`cine-nav ${open ? "is-menu-open" : ""}`}
      aria-label="Main navigation"
    >
      <button
        className="cine-nav__logo"
        type="button"
        onClick={() => go("#hero")}
        aria-label="AcadeMY home"
      >
        <AcademyLogo />
      </button>

      <div id="cine-nav-menu" ref={menuRef} className={`cine-nav__links ${open ? "is-open" : ""}`}>
        {LINKS.map((l) => (
          <button
            key={l.target}
            type="button"
            className={`cine-nav__link ${active === l.target ? "is-active" : ""}`}
            aria-current={active === l.target ? "location" : undefined}
            onClick={() => go(l.target)}
          >
            {l.label}
          </button>
        ))}
        <div className="cine-nav__auth cine-nav__auth--mobile">
          <CinematicLoginAction className="cine-button cine-button--ghost" />
          <CinematicAuthCta className="cine-button cine-button--primary">
            Start Free
          </CinematicAuthCta>
        </div>
      </div>

      <div className="cine-nav__auth cine-nav__auth--desktop">
        <CinematicLoginAction className="cine-button cine-button--ghost" />
        <CinematicAuthCta className="cine-button cine-button--primary">Start Free</CinematicAuthCta>
      </div>

      <button
        ref={burgerRef}
        className={`cine-nav__burger ${open ? "is-open" : ""}`}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="cine-nav-menu"
        type="button"
        onClick={() => setOpen((v) => !v)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
}
