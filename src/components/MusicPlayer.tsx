import { useEffect, useRef, useState } from "react";
import { Music, Play, Pause, X, Repeat } from "lucide-react";

type Track = {
  id: string;
  name: string;
  emoji: string;
  url: string;
};

const TRACKS: Track[] = [
  {
    id: "lofi",
    name: "Lo-Fi Study Beats",
    emoji: "🎵",
    url: "https://archive.org/download/cozy-alone-lofi-chill-out-beats/Cozy%20Alone%20Lofi%20Chill%20Out%20Beats%20Music%20Mix.mp3",
  },
  {
    id: "nature",
    name: "Nature Sounds (Rain + Birds)",
    emoji: "🌊",
    url: "https://archive.org/download/aporee_62755_74238/051620241821birdsrain.mp3",
  },
  {
    id: "piano",
    name: "Soft Piano",
    emoji: "🎹",
    url: "https://archive.org/download/jamendo-418019/01-1684726-DHDMusic-Ambient%20Soft%20Piano.mp3",
  },
  {
    id: "calm",
    name: "Calm & Catchy",
    emoji: "🎶",
    url: "https://cdn.pixabay.com/audio/2024/02/28/audio_0bf2761340.mp3",
  },
];

const STORAGE_KEY = "academy-music-prefs";
const TOOLTIP_KEY = "academy-music-tooltip-seen";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [trackId, setTrackId] = useState<string>("lofi");
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [loop, setLoop] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);

  // Load saved prefs
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.trackId) setTrackId(p.trackId);
        if (typeof p.volume === "number") setVolume(p.volume);
        if (typeof p.loop === "boolean") setLoop(p.loop);
      }
      if (!sessionStorage.getItem(TOOLTIP_KEY)) {
        setShowTooltip(true);
        const t = setTimeout(() => {
          setShowTooltip(false);
          sessionStorage.setItem(TOOLTIP_KEY, "1");
        }, 6000);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  // Persist prefs
  useEffect(() => {
    try {
      sessionStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ trackId, volume, loop }),
      );
    } catch {}
  }, [trackId, volume, loop]);

  // Apply volume / loop to audio element
  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume;
  }, [volume]);
  useEffect(() => {
    if (audioRef.current) audioRef.current.loop = loop;
  }, [loop]);

  // Click outside to close
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const current = TRACKS.find((t) => t.id === trackId) ?? TRACKS[0];

  async function togglePlay() {
    const a = audioRef.current;
    if (!a) return;
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  }

  async function selectTrack(id: string) {
    if (id === trackId) {
      togglePlay();
      return;
    }
    setTrackId(id);
    setPlaying(false);
    // wait next tick for src to update
    requestAnimationFrame(async () => {
      const a = audioRef.current;
      if (!a) return;
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    });
  }

  function openPanel() {
    setOpen(true);
    setShowTooltip(false);
    sessionStorage.setItem(TOOLTIP_KEY, "1");
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={current.url}
        loop={loop}
        preload="none"
        onEnded={() => !loop && setPlaying(false)}
        onPause={() => setPlaying(false)}
        onPlay={() => setPlaying(true)}
      />

      {/* Floating button */}
      <div className="fixed bottom-24 right-6 z-[70] flex flex-col items-end gap-3">
        {showTooltip && !open && (
          <div className="glass-strong rounded-xl px-3 py-2 text-xs text-foreground shadow-lg animate-fade-in">
            🎵 Need study music? Click here!
          </div>
        )}

        {open && (
          <div
            ref={panelRef}
            className="w-72 glass-strong rounded-2xl p-4 shadow-2xl border border-[#8B5CF6]/30"
            style={{
              animation: "slideUpFade 0.25s ease-out",
              boxShadow: "0 10px 40px -10px rgba(139,92,246,0.4)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Study Music
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Album art + equalizer */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center text-2xl overflow-hidden"
                style={{
                  background:
                    "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                }}
              >
                {playing ? (
                  <div className="flex items-end gap-1 h-7">
                    {[0, 1, 2, 3].map((i) => (
                      <span
                        key={i}
                        className="w-1 bg-white rounded-full"
                        style={{
                          animation: `eqBar 0.9s ease-in-out ${i * 0.15}s infinite`,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <span>{current.emoji}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">{current.name}</p>
                <p className="text-xs text-muted-foreground">
                  {playing ? "Now playing" : "Paused"}
                </p>
              </div>
            </div>

            {/* Play / loop */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={togglePlay}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-white text-sm font-semibold transition-transform hover:scale-[1.02]"
                style={{
                  background:
                    "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
                }}
              >
                {playing ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Play
                  </>
                )}
              </button>
              <button
                onClick={() => setLoop((l) => !l)}
                title={loop ? "Loop on" : "Loop off"}
                className={`p-2 rounded-xl border transition-colors ${
                  loop
                    ? "border-[#8B5CF6] text-[#8B5CF6] bg-[#8B5CF6]/10"
                    : "border-white/10 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Repeat className="w-4 h-4" />
              </button>
            </div>

            {/* Volume */}
            <div className="mb-3">
              <label className="text-xs text-muted-foreground">Volume</label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full mt-1 accent-[#8B5CF6]"
              />
            </div>

            {/* Tracks */}
            <div className="space-y-1">
              {TRACKS.map((t) => {
                const active = t.id === trackId;
                return (
                  <button
                    key={t.id}
                    onClick={() => selectTrack(t.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                      active
                        ? "bg-[#8B5CF6]/15 text-foreground"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    <span>{t.emoji}</span>
                    <span className="truncate">{t.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        <button
          onClick={open ? () => setOpen(false) : openPanel}
          aria-label="Toggle music player"
          className="relative w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-transform hover:scale-110"
          style={{
            background: "linear-gradient(135deg, #8B5CF6 0%, #6366F1 100%)",
            boxShadow: playing
              ? "0 0 20px rgba(139,92,246,0.6), 0 0 40px rgba(139,92,246,0.3)"
              : "0 4px 14px rgba(0,0,0,0.3)",
          }}
        >
          {playing && (
            <span
              className="absolute inset-0 rounded-full"
              style={{
                animation: "musicPulse 1.6s ease-out infinite",
                background: "#8B5CF6",
                opacity: 0.5,
              }}
            />
          )}
          <Music className="w-5 h-5 relative" />
        </button>
      </div>

      <style>{`
        @keyframes musicPulse {
          0% { transform: scale(1); opacity: 0.55; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes eqBar {
          0%, 100% { height: 20%; }
          50% { height: 100%; }
        }
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
