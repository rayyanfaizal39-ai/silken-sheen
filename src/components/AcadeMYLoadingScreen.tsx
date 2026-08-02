import { useEffect, useMemo, useRef, useState } from "react";
import { AcademyLogo } from "@/components/AcademyLogo";
import "./academyLoadingScreen.css";

export const ACADEMY_LOADER_FADE_MS = 450;

/** Dependency-free CSS used by the document loader before the app stylesheet exists. */
export const ACADEMY_LOADING_CRITICAL_CSS = `
html{background:#050816}body[data-academy-loading="true"]{margin:0;overflow:hidden;background:#050816}
body[data-academy-loading="true"] #academy-app,body[data-academy-loading="true"] #root{visibility:hidden}
#academy-static-loader{position:fixed;inset:0;z-index:2147483647;display:flex;box-sizing:border-box;flex-direction:column;align-items:center;justify-content:center;gap:1.75rem;padding:2rem 1.5rem calc(2rem + env(safe-area-inset-bottom));overflow:hidden;background:radial-gradient(120% 90% at 50% 15%,rgba(109,40,255,.28),transparent 60%),radial-gradient(90% 70% at 80% 90%,rgba(56,24,140,.35),transparent 65%),#050816;color:#e9e6ff;font-family:system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;opacity:1;transition:opacity 450ms cubic-bezier(.4,0,.2,1)}
#academy-static-loader[hidden]{display:none}#academy-static-loader.academy-loader--leaving{opacity:0;pointer-events:none}
.academy-static-stars{position:absolute;inset:0;opacity:.48;background-image:radial-gradient(circle at 13% 20%,#fff 0 1px,transparent 1.5px),radial-gradient(circle at 77% 16%,#fff 0 1px,transparent 1.5px),radial-gradient(circle at 30% 72%,#fff 0 1px,transparent 1.5px),radial-gradient(circle at 88% 78%,#fff 0 1px,transparent 1.5px),radial-gradient(circle at 55% 42%,#fff 0 1px,transparent 1.5px);background-size:170px 170px;animation:academy-static-twinkle 3.2s ease-in-out infinite}
.academy-static-stage{position:relative;display:grid;place-items:center;width:clamp(160px,42vw,220px);height:clamp(160px,42vw,220px)}.academy-static-glow{position:absolute;inset:22%;border-radius:50%;background:radial-gradient(circle,rgba(139,92,246,.55),transparent 70%);filter:blur(18px);animation:academy-static-pulse 3.6s ease-in-out infinite}
.academy-static-orbit{position:absolute;inset:0;border:1px solid rgba(167,139,250,.28);border-radius:50%;animation:academy-static-spin 14s linear infinite}.academy-static-orbit.inner{inset:20%;border-color:rgba(244,180,0,.22);animation-duration:9s;animation-direction:reverse}.academy-static-satellite{position:absolute;top:-5px;left:50%;width:10px;height:10px;margin-left:-5px;border-radius:50%;background:#a78bfa;box-shadow:0 0 14px rgba(167,139,250,.9)}.academy-static-orbit.inner .academy-static-satellite{width:7px;height:7px;top:-4px;background:#f4b400;box-shadow:0 0 12px rgba(244,180,0,.85)}
.academy-static-loading{display:flex;flex-direction:column;align-items:center;gap:1.75rem}.academy-static-logo{position:relative;width:76px;height:76px;filter:drop-shadow(0 0 24px rgba(109,40,255,.5));animation:academy-static-float 5s ease-in-out infinite}.academy-static-message{margin:0;max-width:22rem;text-align:center;font-size:clamp(.95rem,2.6vw,1.05rem);font-weight:500;letter-spacing:.01em;color:rgba(233,230,255,.86)}.academy-static-bar{position:relative;width:min(220px,60vw);height:3px;border-radius:999px;background:rgba(167,139,250,.18);overflow:hidden}.academy-static-bar span{position:absolute;inset-block:0;width:42%;border-radius:999px;background:linear-gradient(90deg,transparent,#a78bfa,#f4b400,transparent);animation:academy-static-sweep 1.8s cubic-bezier(.4,0,.2,1) infinite}
.academy-static-error{display:none;max-width:28rem;text-align:center}.academy-static-error h1{margin:0 0 .5rem;font-size:1.25rem}.academy-static-error p{margin:0;color:rgba(233,230,255,.72);line-height:1.5}.academy-static-actions{display:flex;flex-wrap:wrap;justify-content:center;gap:.75rem;margin-top:1.25rem}.academy-static-actions button{min-width:7rem;min-height:44px;border:1px solid rgba(167,139,250,.45);border-radius:999px;padding:.65rem 1.1rem;background:#6d28ff;color:#fff;font:600 .9rem system-ui;cursor:pointer}.academy-static-actions button+button{background:rgba(255,255,255,.08)}#academy-static-loader[data-error="true"] .academy-static-loading{display:none}#academy-static-loader[data-error="true"] .academy-static-error{display:block}
@keyframes academy-static-spin{to{transform:rotate(360deg)}}@keyframes academy-static-float{50%{transform:translateY(8px)}}@keyframes academy-static-pulse{50%{opacity:.9;transform:scale(1.08)}}@keyframes academy-static-sweep{from{transform:translateX(-110%)}to{transform:translateX(260%)}}@keyframes academy-static-twinkle{50%{opacity:.8}}
@media(prefers-reduced-motion:reduce){#academy-static-loader,#academy-static-loader *{animation:none!important;transition-duration:200ms!important}.academy-static-bar span{width:100%;opacity:.6;transform:none}}
`;

/** HTML-document loader. Its logo is inline so first paint needs no asset request. */
export function AcadeMYStaticLoadingShell() {
  return (
    <div id="academy-static-loader" role="status" aria-live="polite" aria-label="Preparing your learning mission">
      <div className="academy-static-stars" aria-hidden="true" />
      <div className="academy-static-loading">
        <div className="academy-static-stage">
          <div className="academy-static-glow" aria-hidden="true" />
          <div className="academy-static-orbit" aria-hidden="true"><span className="academy-static-satellite" /></div>
          <div className="academy-static-orbit inner" aria-hidden="true"><span className="academy-static-satellite" /></div>
          <svg className="academy-static-logo" viewBox="0 0 32 32" aria-hidden="true"><rect width="32" height="32" rx="8" fill="#6D28FF"/><path d="M13.042 17.158H18.172V20.164H13.042V17.158ZM10.072 22L14.41 9.742H17.668L21.61 22H18.334L15.4 11.956H16.696L13.33 22H10.072Z" fill="#F4B400"/></svg>
        </div>
        <p className="academy-static-message" data-loading-message>Preparing your learning mission…</p>
        <div className="academy-static-bar" aria-hidden="true"><span /></div>
      </div>
      <div className="academy-static-error" role="alert">
        <h1>Mission control needs a moment</h1>
        <p data-loading-error>AcadeMY could not finish loading this screen.</p>
        <div className="academy-static-actions">
          <button type="button" data-loading-retry>Retry</button>
          <button type="button" data-loading-reload>Reload</button>
        </div>
      </div>
    </div>
  );
}

type AcadeMYLoadingScreenProps = {
  /** When false the loader starts fading out. */
  visible: boolean;
  /** Called once the fade-out transition has completed. */
  onFadeOutComplete?: () => void;
  message?: string;
};

/**
 * Full-screen branded boot screen. Purely presentational — readiness is
 * decided by <AppBootGate />. Motion is CSS-only and disabled entirely under
 * `prefers-reduced-motion`.
 */
export function AcadeMYLoadingScreen({
  visible,
  onFadeOutComplete,
  message = "Preparing your learning mission…",
}: AcadeMYLoadingScreenProps) {
  const [leaving, setLeaving] = useState(false);
  const doneRef = useRef(false);

  useEffect(() => {
    if (visible) return;
    setLeaving(true);
    const timer = window.setTimeout(() => {
      if (doneRef.current) return;
      doneRef.current = true;
      onFadeOutComplete?.();
    }, ACADEMY_LOADER_FADE_MS);
    return () => window.clearTimeout(timer);
  }, [visible, onFadeOutComplete]);

  // Deterministic star field — same values on server and client, so the
  // markup hydrates without a mismatch.
  const stars = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => {
        const golden = (i * 137.508) % 360;
        return {
          left: `${(golden / 360) * 100}%`,
          top: `${((i * 61) % 97) + 1}%`,
          size: i % 3 === 0 ? 3 : 2,
          delay: `${(i % 7) * 0.42}s`,
          duration: `${3.2 + (i % 5) * 0.6}s`,
        };
      }),
    [],
  );

  return (
    <div
      className={`academy-loader${leaving ? " academy-loader--leaving" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={message}
    >
      <div className="academy-loader__stars" aria-hidden="true">
        {stars.map((star, i) => (
          <span
            key={i}
            className="academy-loader__star"
            style={{
              left: star.left,
              top: star.top,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDelay: star.delay,
              animationDuration: star.duration,
            }}
          />
        ))}
      </div>

      <div className="academy-loader__stage">
        <div className="academy-loader__glow" aria-hidden="true" />
        <div className="academy-loader__orbit academy-loader__orbit--outer" aria-hidden="true">
          <span className="academy-loader__satellite" />
        </div>
        <div className="academy-loader__orbit academy-loader__orbit--inner" aria-hidden="true">
          <span className="academy-loader__satellite academy-loader__satellite--small" />
        </div>
        <AcademyLogo variant="icon" className="academy-loader__logo" />
      </div>

      <p className="academy-loader__message">{message}</p>
      <div className="academy-loader__bar" aria-hidden="true">
        <span />
      </div>
    </div>
  );
}
