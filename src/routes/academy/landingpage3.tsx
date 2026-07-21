import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef } from 'react';
import heroBackground from '@/assets/landing/hero/hero-background.png.asset.json';
import heroPlanet from '@/assets/landing/hero/hero-planet.png.asset.json';

export const Route = createFileRoute('/academy/landingpage3')({
  component: LandingPage3,
  head: () => ({
    meta: [
      { title: 'AcadeMY — Landing Page 3' },
      { name: 'description', content: 'AcadeMY cinematic hero.' },
    ],
  }),
});

function LandingPage3() {
  const planetWrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const el = planetWrapRef.current;
    if (!el) return;

    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmall = window.matchMedia('(max-width: 767px)').matches;
    if (isTouch || reduceMotion || isSmall) return;

    let targetX = 0, targetY = 0, curX = 0, curY = 0;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nx = (e.clientX / w) * 2 - 1;
      const ny = (e.clientY / h) * 2 - 1;
      targetX = nx * 5;
      targetY = ny * 3;
    };

    const tick = () => {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      el.style.setProperty('--mx', `${curX.toFixed(2)}px`);
      el.style.setProperty('--my', `${curY.toFixed(2)}px`);
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes academy-hero-idle {
          0%   { transform: scale(1.02); }
          100% { transform: scale(1.025); }
        }
        .academy-hero-bg {
          animation: academy-hero-idle 52s ease-in-out infinite alternate;
        }

        .academy-planet-wrap {
          --mx: 0px;
          --my: 0px;
          position: absolute;
          top: 4vh;
          right: -7vw;
          width: clamp(360px, 34vw, 650px);
          aspect-ratio: 1 / 1;
          pointer-events: none;
          user-select: none;
          z-index: 2;
          transform: translate3d(var(--mx), var(--my), 0);
          will-change: transform;
        }
        .academy-planet-float {
          position: absolute;
          inset: 0;
          animation: academy-planet-float 16s ease-in-out infinite alternate;
        }
        .academy-planet-rotate {
          position: absolute;
          inset: 0;
          animation: academy-planet-rotate 32s ease-in-out infinite alternate;
        }
        .academy-planet-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
        .academy-planet-halo {
          position: absolute;
          inset: -10%;
          background: radial-gradient(circle at 50% 50%,
            rgba(139, 92, 246, 0.28) 0%,
            rgba(217, 70, 239, 0.12) 38%,
            rgba(139, 92, 246, 0) 68%);
          filter: blur(40px);
          animation: academy-planet-halo 10s ease-in-out infinite alternate;
          z-index: 0;
        }
        .academy-planet-underglow {
          position: absolute;
          inset: 0;
          filter: blur(14px) brightness(1.05);
          opacity: 0.18;
          z-index: 1;
        }
        .academy-planet-main {
          z-index: 2;
        }

        @keyframes academy-planet-float {
          0%   { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(2px, -6px, 0); }
        }
        @keyframes academy-planet-rotate {
          0%   { transform: rotate(-0.4deg); }
          100% { transform: rotate(0.4deg); }
        }
        @keyframes academy-planet-halo {
          0%   { opacity: 0.85; transform: scale(0.98); }
          100% { opacity: 1;    transform: scale(1.03); }
        }

        @media (max-width: 1024px) {
          .academy-planet-wrap {
            width: 42vw;
            right: -10vw;
            top: 5vh;
          }
        }
        @media (max-width: 767px) {
          .academy-planet-wrap {
            width: 68vw;
            right: -22vw;
            top: 6vh;
            --mx: 0px;
            --my: 0px;
          }
          .academy-planet-halo {
            filter: blur(24px);
            opacity: 0.7;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .academy-hero-bg,
          .academy-planet-float,
          .academy-planet-rotate,
          .academy-planet-halo {
            animation: none !important;
          }
          .academy-planet-wrap { transform: none !important; }
        }
      `}</style>
      <section
        style={{
          position: 'relative',
          width: '100%',
          minHeight: '100svh',
          overflow: 'hidden',
          backgroundColor: '#050816',
        }}
      >
        <img
          src={heroBackground.url}
          alt=""
          aria-hidden="true"
          draggable={false}
          className="academy-hero-bg"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            transform: 'scale(1.02)',
            willChange: 'transform',
            zIndex: 1,
          }}
        />

        <div ref={planetWrapRef} className="academy-planet-wrap" aria-hidden="true">
          <div className="academy-planet-float">
            <div className="academy-planet-rotate">
              <div className="academy-planet-halo" />
              <img
                src={heroPlanet.url}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="academy-planet-img academy-planet-underglow"
              />
              <img
                src={heroPlanet.url}
                alt=""
                aria-hidden="true"
                draggable={false}
                className="academy-planet-img academy-planet-main"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
