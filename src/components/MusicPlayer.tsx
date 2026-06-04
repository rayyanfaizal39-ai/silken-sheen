import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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
];

const STORAGE_KEY = "academy-music-prefs";
const TOOLTIP_KEY = "academy-music-tooltip-seen";

// ---------------------------------------------------------------------------
// Module-level singleton store. Lives outside React so the audio element and
// playback state survive route changes, re-renders, and even component
// unmount/remount. Only created in the browser.
// ---------------------------------------------------------------------------
type PlayerState = {
  trackId: string;
  playing: boolean;
  volume: number;
  loop: boolean;
};

type Store = {
  audio: HTMLAudioElement | null;
  state: PlayerState;
  listeners: Set<() => void>;
};

const defaultState: PlayerState = {
  trackId: "lofi",
  playing: false,
  volume: 0.5,
  loop: true,
};

let store: Store | null = null;

function getStore(): Store {
  if (store) return store;
  const initial: PlayerState = { ...defaultState };
  if (typeof window !== "undefined") {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) {
        const p = JSON.parse(raw);
        if (p.trackId) initial.trackId = p.trackId;
        if (typeof p.volume === "number") initial.volume = p.volume;
        if (typeof p.loop === "boolean") initial.loop = p.loop;
      }
    } catch {}
  }

  const audio =
    typeof window !== "undefined" ? new Audio() : (null as any);
  store = { audio, state: initial, listeners: new Set() };

  if (audio) {
    const current = TRACKS.find((t) => t.id === initial.trackId) ?? TRACKS[0];
    audio.src = current.url;
    audio.loop = initial.loop;
    audio.volume = initial.volume;
    audio.preload = "none";
    audio.addEventListener("play", () => setState({ playing: true }));
    audio.addEventListener("pause", () => setState({ playing: false }));
    audio.addEventListener("ended", () => {
      if (!store!.state.loop) setState({ playing: false });
    });
  }
  return store;
}

function emit() {
  store?.listeners.forEach((l) => l());
}

function setState(patch: Partial<PlayerState>) {
  const s = getStore();
  s.state = { ...s.state, ...patch };
  try {
    sessionStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        trackId: s.state.trackId,
        volume: s.state.volume,
        loop: s.state.loop,
      }),
    );
  } catch {}
  emit();
}

function subscribe(cb: () => void) {
  const s = getStore();
  s.listeners.add(cb);
  return () => {
    s.listeners.delete(cb);
  };
}

function getSnapshot(): PlayerState {
  return getStore().state;
}

function getServerSnapshot(): PlayerState {
  return defaultState;
}

async function play() {
  const s = getStore();
  if (!s.audio) return;
  try {
    await s.audio.play();
  } catch {
    setState({ playing: false });
  }
}

function pause() {
  const s = getStore();
  s.audio?.pause();
}

async function selectTrackId(id: string) {
  const s = getStore();
  if (!s.audio) return;
  if (id === s.state.trackId) {
    if (s.state.playing) pause();
    else await play();
    return;
  }
  const track = TRACKS.find((t) => t.id === id) ?? TRACKS[0];
  s.audio.src = track.url;
  setState({ trackId: id, playing: false });
  await play();
}

function setVolume(v: number) {
  const s = getStore();
  if (s.audio) s.audio.volume = v;
  setState({ volume: v });
}

function setLoop(l: boolean) {
  const s = getStore();
  if (s.audio) s.audio.loop = l;
  setState({ loop: l });
}

// ---------------------------------------------------------------------------
// Component (UI only — audio lives in the singleton store above).
// ---------------------------------------------------------------------------
export function MusicPlayer() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { trackId, playing, volume, loop } = state;

  const panelRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Ensure store is initialized on the client
  useEffect(() => {
    getStore();
    try {
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
    if (playing) pause();
    else await play();
  }

  function openPanel() {
    setOpen(true);
    setShowTooltip(false);
    try {
      sessionStorage.setItem(TOOLTIP_KEY, "1");
    } catch {}
  }

  return (
    <>
      {/* Floating button */}
      <div className="fixed bottom-40 right-4 z-[70] flex flex-col items-end gap-3 md:bottom-24 md:right-6">
        {showTooltip && !open && (
          <div className="glass-strong max-w-[210px] rounded-2xl px-3 py-2 text-xs font-medium text-foreground shadow-lg animate-fade-in">
            Study music for focus
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
                onClick={() => setLoop(!loop)}
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
                    onClick={() => selectTrackId(t.id)}
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
          className="relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 md:h-14 md:w-14 md:rounded-3xl"
          style={{
            background: "linear-gradient(135deg, #8B5CF6 0%, #2563EB 100%)",
            boxShadow: playing
              ? "0 16px 42px -20px rgba(139,92,246,0.9), 0 0 22px rgba(139,92,246,0.35)"
              : "0 16px 38px -24px rgba(0,0,0,0.75)",
          }}
        >
          {playing && (
            <span
              className="absolute inset-0 rounded-2xl md:rounded-3xl"
              style={{
                animation: "musicPulse 1.6s ease-out infinite",
                background: "#8B5CF6",
                opacity: 0.32,
              }}
            />
          )}
          <Music className="relative h-6 w-6 md:h-7 md:w-7" />
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
