import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import heroVideo from "@/assets/hero-intro.mp4.asset.json";

/**
 * Small "Watch intro" pill that opens a lightbox MP4 player.
 * The video itself is the cinematic intro from the Figma Make scene.
 */
export function WatchIntroVideo() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group inline-flex items-center gap-3 rounded-full bg-white/5 hover:bg-white/10 ring-1 ring-white/15 px-5 py-2.5 text-white text-sm font-semibold transition-colors"
      >
        <span className="relative grid place-items-center w-7 h-7 rounded-full bg-nova-yellow text-[#1a0f2e] shadow-[0_0_24px_rgba(250,204,21,0.5)]">
          <Play className="w-3.5 h-3.5 fill-current" />
          <span className="absolute inset-0 rounded-full bg-nova-yellow/40 animate-ping" />
        </span>
        Watch intro
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#050816]/85 backdrop-blur-xl animate-in fade-in"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close video"
            className="absolute top-5 right-5 grid place-items-center w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 ring-1 ring-white/20 text-white"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden ring-1 ring-white/15 shadow-[0_30px_120px_-20px_rgba(168,85,247,0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            <video
              src={heroVideo.url}
              controls
              autoPlay
              playsInline
              className="absolute inset-0 w-full h-full object-cover bg-black"
            />
          </div>
        </div>
      )}
    </>
  );
}
