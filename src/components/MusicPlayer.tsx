import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  Radio,
  Play,
  Pause,
  X,
  SkipForward,
  Volume2,
  Rocket,
} from "lucide-react";

// ---------------------------------------------------------------------------
// AcadeMy Global Music System — Cosmic / Gaming edition
// ---------------------------------------------------------------------------
// All tracks are instrumental & royalty-free (Kevin MacLeod incompetech.com,
// CC-BY) plus a CC rain ambience from archive.org. No vocals → student-safe.
// Stations are curated to feel like a game universe: focus, space exploration,
// confidence, late-night grind, cinematic exam mode, and cozy rain.
// ---------------------------------------------------------------------------

export type StationId =
  | "focus-mode"
  | "space-explorer"
  | "main-character"
  | "late-night"
  | "exam-beast"
  | "rainy-day"
  | "silent";

type Track = { title: string; url: string };

export type Station = {
  id: StationId;
  name: string;
  emoji: string;
  tagline: string;
  accent: string; // gradient for accent
  tracks: Track[];
};

// Kevin MacLeod (incompetech.com) — CC-BY, instrumental.
const KM = (name: string) =>
  `https://incompetech.com/music/royalty-free/mp3-royaltyfree/${encodeURIComponent(name)}.mp3`;

const RAIN_AMBIENCE =
  "https://archive.org/download/aporee_62755_74238/051620241821birdsrain.mp3";

export const STATIONS: Station[] = [
  {
    id: "focus-mode",
    name: "Focus Mode",
    emoji: "🎮",
    tagline: "Calm gaming atmosphere · Deep work",
    accent: "linear-gradient(135deg,#22d3ee 0%,#6366f1 100%)",
    tracks: [
      { title: "Long Note Two", url: KM("Long Note Two") },
      { title: "Long Note Three", url: KM("Long Note Three") },
      { title: "Long Note Four", url: KM("Long Note Four") },
      { title: "Deep Haze", url: KM("Deep Haze") },
      { title: "Inspired", url: KM("Inspired") },
    ],
  },
  {
    id: "space-explorer",
    name: "Space Explorer",
    emoji: "🚀",
    tagline: "Cosmic ambience · Discover worlds",
    accent: "linear-gradient(135deg,#8b5cf6 0%,#2563eb 100%)",
    tracks: [
      { title: "Cosmic Glow", url: KM("Cosmic Glow") },
      { title: "Floating Cities", url: KM("Floating Cities") },
      { title: "Anamalie", url: KM("Anamalie") },
      { title: "Constance", url: KM("Constance") },
      { title: "Tranquility Base", url: KM("Tranquility Base") },
    ],
  },
  {
    id: "main-character",
    name: "Main Character Mode",
    emoji: "⚡",
    tagline: "Clean electronic · Locked in",
    accent: "linear-gradient(135deg,#f59e0b 0%,#ec4899 100%)",
    tracks: [
      { title: "Cipher2", url: KM("Cipher2") },
      { title: "Cipher", url: KM("Cipher") },
      { title: "Future Gladiator", url: KM("Future Gladiator") },
      { title: "Electrodoodle", url: KM("Electrodoodle") },
      { title: "Hitman", url: KM("Hitman") },
    ],
  },
  {
    id: "late-night",
    name: "Late Night Grind",
    emoji: "🌃",
    tagline: "Lofi · Synthwave · Night city",
    accent: "linear-gradient(135deg,#ec4899 0%,#6366f1 100%)",
    tracks: [
      { title: "Lightless Dawn", url: KM("Lightless Dawn") },
      { title: "Dewdrop Fantasy", url: KM("Dewdrop Fantasy") },
      { title: "Quiet Music Box Tune", url: KM("Quiet Music Box Tune") },
      { title: "Awkward Meeting", url: KM("Awkward Meeting") },
    ],
  },
  {
    id: "exam-beast",
    name: "Exam Beast",
    emoji: "🏆",
    tagline: "Cinematic momentum · Ace it",
    accent: "linear-gradient(135deg,#facc15 0%,#f97316 100%)",
    tracks: [
      { title: "Heroic Age", url: KM("Heroic Age") },
      { title: "Ascending the Vale", url: KM("Ascending the Vale") },
      { title: "Pamgaea", url: KM("Pamgaea") },
      { title: "All This", url: KM("All This") },
    ],
  },
  {
    id: "rainy-day",
    name: "Rainy Day Study",
    emoji: "🌧",
    tagline: "Rain · Soft piano · Cozy",
    accent: "linear-gradient(135deg,#38bdf8 0%,#6366f1 100%)",
    tracks: [
      { title: "Rain Ambience", url: RAIN_AMBIENCE },
      { title: "Meditation Impromptu 03", url: KM("Meditation Impromptu 03") },
      { title: "Lightless Dawn", url: KM("Lightless Dawn") },
    ],
  },
  {
    id: "silent",
    name: "Silent Mode",
    emoji: "🔇",
    tagline: "No music",
    accent: "linear-gradient(135deg,#475569 0%,#1e293b 100%)",
    tracks: [],
  },
];

// Subject → default station
export const SUBJECT_STATION_DEFAULTS: Record<string, StationId> = {
  math: "focus-mode",
  mathematics: "focus-mode",
  science: "space-explorer",
  sejarah: "exam-beast",
  geography: "space-explorer",
  geografi: "space-explorer",
  english: "main-character",
  bm: "late-night",
  "bahasa-melayu": "late-night",
};

const STORAGE_KEY = "academy-music-prefs-v3";
const TOOLTIP_KEY = "academy-music-tooltip-seen-v3";

// ---------------------------------------------------------------------------
// Module-level singleton store — audio survives route changes.
// ---------------------------------------------------------------------------
type PlayerState = {
  stationId: StationId;
  trackIndex: number;
  playing: boolean;
  volume: number;
};

type Store = {
  audio: HTMLAudioElement | null;
  state: PlayerState;
  listeners: Set<() => void>;
};

const defaultState: PlayerState = {
  stationId: "focus-mode",
  trackIndex: 0,
  playing: false, // first-time users → music OFF
  volume: 0.3,
};

let store: Store | null = null;

function loadPrefs(): PlayerState {
  const s: PlayerState = { ...defaultState };
  if (typeof window === "undefined") return s;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return s;
    const p = JSON.parse(raw);
    if (typeof p.stationId === "string" && STATIONS.some((x) => x.id === p.stationId))
      s.stationId = p.stationId;
    if (typeof p.trackIndex === "number") s.trackIndex = Math.max(0, p.trackIndex | 0);
    if (typeof p.volume === "number") s.volume = Math.min(1, Math.max(0, p.volume));
  } catch {}
  return s;
}

function persist(s: PlayerState) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        stationId: s.stationId,
        trackIndex: s.trackIndex,
        volume: s.volume,
        wasPlaying: s.playing,
      }),
    );
  } catch {}
}

function currentTrack(s: PlayerState): Track | null {
  const station = STATIONS.find((x) => x.id === s.stationId);
  if (!station || station.tracks.length === 0) return null;
  return station.tracks[s.trackIndex % station.tracks.length];
}

function getStore(): Store {
  if (store) return store;
  const initial = loadPrefs();
  const audio = typeof window !== "undefined" ? new Audio() : (null as any);
  store = { audio, state: initial, listeners: new Set() };

  if (audio) {
    const t = currentTrack(initial);
    if (t) audio.src = t.url;
    audio.volume = initial.volume;
    audio.preload = "none";
    audio.loop = false;
    audio.addEventListener("play", () => setState({ playing: true }));
    audio.addEventListener("pause", () => setState({ playing: false }));
    audio.addEventListener("ended", () => {
      next(true);
    });
    audio.addEventListener("error", () => {
      next(true);
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
  persist(s.state);
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
  const t = currentTrack(s.state);
  if (!t) return;
  if (!s.audio.src) s.audio.src = t.url;
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

async function selectStation(id: StationId) {
  const s = getStore();
  if (s.state.stationId === id) return;
  if (id === "silent") {
    pause();
    setState({ stationId: id, trackIndex: 0 });
    return;
  }
  const station = STATIONS.find((x) => x.id === id);
  if (!station || station.tracks.length === 0) {
    setState({ stationId: id, trackIndex: 0 });
    return;
  }
  if (s.audio) s.audio.src = station.tracks[0].url;
  setState({ stationId: id, trackIndex: 0 });
  await play();
}

async function next(autoFromEnded = false) {
  const s = getStore();
  const station = STATIONS.find((x) => x.id === s.state.stationId);
  if (!station || station.tracks.length === 0) return;
  const nextIdx = (s.state.trackIndex + 1) % station.tracks.length;
  if (s.audio) s.audio.src = station.tracks[nextIdx].url;
  setState({ trackIndex: nextIdx });
  if (autoFromEnded || s.state.playing) await play();
}

function setVolume(v: number) {
  const s = getStore();
  if (s.audio) s.audio.volume = v;
  setState({ volume: v });
}

// ---------------------------------------------------------------------------
// UI — spaceship-control inspired glass widget
// ---------------------------------------------------------------------------
export function MusicPlayer() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const { stationId, trackIndex, playing, volume } = state;

  const panelRef = useRef<HTMLDivElement | null>(null);
  const [open, setOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    getStore();
    try {
      if (!localStorage.getItem(TOOLTIP_KEY)) {
        setShowTooltip(true);
        const t = setTimeout(() => {
          setShowTooltip(false);
          localStorage.setItem(TOOLTIP_KEY, "1");
        }, 6000);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

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

  const station = STATIONS.find((s) => s.id === stationId) ?? STATIONS[0];
  const track = station.tracks[trackIndex % Math.max(1, station.tracks.length)];

  async function togglePlay() {
    if (playing) pause();
    else await play();
  }

  function openPanel() {
    setOpen(true);
    setShowTooltip(false);
    try {
      localStorage.setItem(TOOLTIP_KEY, "1");
    } catch {}
  }

  return (
    <>
      <div className="mobile-music-control fixed z-[70] flex flex-col items-end gap-3 md:bottom-24 md:right-6">
        {showTooltip && !open && (
          <div
            className="max-w-[240px] rounded-2xl px-3 py-2 text-xs font-medium text-white shadow-lg animate-fade-in border border-white/10"
            style={{
              background: "linear-gradient(135deg,rgba(15,23,42,0.92),rgba(30,41,59,0.92))",
              backdropFilter: "blur(14px)",
            }}
          >
            🎮 Pick a station · Tune your universe
          </div>
        )}

        {open && (
          <div
            ref={panelRef}
            className="w-[22rem] rounded-3xl p-5 shadow-2xl border border-white/10 text-white"
            style={{
              animation: "slideUpFade 0.28s ease-out",
              background:
                "linear-gradient(160deg,rgba(15,23,42,0.92) 0%,rgba(30,27,75,0.92) 60%,rgba(15,23,42,0.95) 100%)",
              backdropFilter: "blur(20px) saturate(140%)",
              boxShadow:
                "0 20px 60px -20px rgba(139,92,246,0.55), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-white/60 flex items-center gap-1.5">
                <Rocket className="w-3.5 h-3.5" /> AcadeMy · Cosmic Radio
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-white/50 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Now playing — spaceship dashboard */}
            <div
              className="relative rounded-2xl p-4 mb-4 overflow-hidden border border-white/10"
              style={{
                background:
                  "linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))",
              }}
            >
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-30 blur-2xl"
                style={{ background: station.accent }}
              />
              <div className="relative flex items-center gap-3">
                <div
                  className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl overflow-hidden flex-shrink-0 ring-1 ring-white/15"
                  style={{ background: station.accent }}
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
                    <span>{station.emoji}</span>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-white/50 font-semibold">
                    {playing ? "Now transmitting" : "Standby"}
                  </p>
                  <p className="text-sm font-bold truncate">{station.name}</p>
                  <p className="text-xs text-white/60 truncate">
                    {track ? track.title : station.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Transport */}
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={togglePlay}
                disabled={station.tracks.length === 0}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-2xl text-white text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 ring-1 ring-white/15"
                style={{ background: station.accent }}
              >
                {playing ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" /> Play
                  </>
                )}
              </button>
              <button
                onClick={() => next(false)}
                disabled={station.tracks.length <= 1}
                title="Next track"
                aria-label="Next track"
                className="p-2.5 rounded-2xl border border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-30"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Volume */}
            <div className="mb-4">
              <label className="text-[10px] uppercase tracking-wider text-white/50 font-semibold flex items-center gap-1.5">
                <Volume2 className="w-3 h-3" /> Volume · {Math.round(volume * 100)}%
              </label>
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full mt-1.5 accent-[#a78bfa]"
              />
            </div>

            {/* Stations grid */}
            <div className="space-y-1 max-h-72 overflow-y-auto pr-1 -mr-1">
              <p className="text-[10px] font-bold text-white/50 uppercase tracking-[0.18em] px-1 mb-2 flex items-center gap-1.5">
                <Radio className="w-3 h-3" /> Stations
              </p>
              {STATIONS.map((s) => {
                const active = s.id === stationId;
                return (
                  <button
                    key={s.id}
                    onClick={() => selectStation(s.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-left transition-all ${
                      active
                        ? "bg-white/10 ring-1 ring-white/20"
                        : "hover:bg-white/5"
                    }`}
                  >
                    <span
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-base flex-shrink-0 ring-1 ring-white/10"
                      style={{ background: s.accent, opacity: active ? 1 : 0.85 }}
                    >
                      {s.emoji}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block truncate font-semibold text-white/95">
                        {s.name}
                      </span>
                      <span className="block truncate text-[10px] text-white/55">
                        {s.tagline}
                      </span>
                    </span>
                    {active && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-white/80 px-1.5 py-0.5 rounded bg-white/10">
                        Live
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Floating launch button */}
        <button
          onClick={open ? () => setOpen(false) : openPanel}
          aria-label="Toggle music player"
          className="relative flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 md:h-14 md:w-14 md:rounded-3xl ring-1 ring-white/15"
          style={{
            background: station.accent,
            boxShadow: playing
              ? "0 16px 42px -18px rgba(139,92,246,0.95), 0 0 26px rgba(139,92,246,0.4)"
              : "0 16px 38px -22px rgba(0,0,0,0.8)",
          }}
        >
          {playing && (
            <span
              className="absolute inset-0 rounded-2xl md:rounded-3xl pointer-events-none"
              style={{
                animation: "musicPulse 1.8s ease-out infinite",
                background: "rgba(167,139,250,0.5)",
              }}
            />
          )}
          {playing ? (
            <div className="relative flex items-end gap-[3px] h-5">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-[3px] bg-white rounded-full"
                  style={{
                    animation: `eqBar 0.9s ease-in-out ${i * 0.18}s infinite`,
                  }}
                />
              ))}
            </div>
          ) : (
            <Radio className="relative h-6 w-6 md:h-7 md:w-7" />
          )}
        </button>
      </div>

      <style>{`
        @keyframes musicPulse {
          0% { transform: scale(1); opacity: 0.55; }
          100% { transform: scale(1.85); opacity: 0; }
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
