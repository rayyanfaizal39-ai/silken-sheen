import { createFileRoute } from '@tanstack/react-router';
import heroBackground from '@/assets/landing/hero/hero-background.png.asset.json';

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
        @media (prefers-reduced-motion: reduce) {
          .academy-hero-bg { animation: none !important; transform: scale(1.02); }
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
          src={heroBackground.src}
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
          }}
        />
      </section>
    </>
  );
}
