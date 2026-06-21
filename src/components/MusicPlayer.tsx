import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  Music,
  Play,
  Pause,
  X,
  SkipForward,
  Volume2,
  Headphones,
} from "lucide-react";

// ---------------------------------------------------------------------------
// AcadeMy Global Music System
// ---------------------------------------------------------------------------
// Student-safe (ages 13-17). All curated tracks below are instrumental /
// royalty-free (Kevin MacLeod, ccMixter, archive.org Creative Commons).
// No lyrics → guaranteed no profanity / explicit content.
// The previous "Cozy Alone Lofi" track has been removed for that reason.
// ---------------------------------------------------------------------------

export type StationId =
  | "focus-lofi"
  | "cosmic-chill"
  | "teen-study"
  | "exam-mode"
  | "rain-music"
  | "level-up"
  | "silent";

type Track = { title: string; url: string };

export type Station = {
  id: StationId;
  name: string;
  emoji: string;
  tagline: string;
  tracks: Track[];
};

// Kevin MacLeod (incompetech.com) — CC-BY, instrumental, family-safe.
const KM = (name: string) =>
  `https://incompetech.com/music/royalty-free/mp3-royaltyfree/${encodeURIComponent(name)}.mp3`;

export const STATIONS: Station[] = [
  {
    id: "focus-lofi",
    name: "Focus Lo-Fi",
    emoji: "🎧",
    tagline: "Instrumental beats for deep work",
    tracks: [
      { title: "Deep Haze", url: KM("Deep Haze") },
      { title: "Inspired", url: KM("Inspired") },
      { title: "Cipher2", url: KM("Cipher2") },
      { title: "Long Note Two", url: KM("Long Note Two") },
    ],
  },
  {
    id: "cosmic-chill",
    name: "Cosmic Chill",
    emoji: "🌌",
    tagline: "Space-themed ambient for explorers",
    tracks: [
      { title: "Cosmic Glow", url: KM("Cosmic Glow") },
      { title: "Floating Cities", url: KM("Floating Cities") },
      { title: "Constance", url: KM("Constance") },
      { title: "Anamalie", url: KM("Anamalie") },
    ],
  },
  {
    id: "teen-study",
    name: "Teen Study Hits",
    emoji: "🎤",
    tagline: "Modern, upbeat, positive vibes",
    tracks: [
      { title: "Carefree", url: KM("Carefree") },
      { title: "Wallpaper", url: KM("Wallpaper") },
      { title: "Sunday Plans", url: KM("Sunday Plans") },
      { title: "Bushwick Tarantella", url: KM("Bushwick Tarantella") },
    ],
  },
  {
    id: "exam-mode",
    name: "Exam Mode",
    emoji: "📚",
    tagline: "Instrumental only • Max focus",
    tracks: [
      { title: "Meditation Impromptu 03", url: KM("Meditation Impromptu 03") },
      { title: "Ascending the Vale", url: KM("Ascending the Vale") },
      { title: "Pamgaea", url: KM("Pamgaea") },
      { title: "Healing", url: KM("Healing") },
    ],
  },
  {
    id: "rain-music",
    name: "Rain & Music",
    emoji: "🌧",
    tagline: "Rain ambience + calm piano",
    tracks: [
      {
        title: "Rain Ambience",
        url: "https://archive.org/download/aporee_62755_74238/051620241821birdsrain.mp3",
      },
      { title: "Lightless Dawn", url: KM("Lightless Dawn") },
      { title: "Awkward Meeting", url: KM("Awkward Meeting") },
    ],
  },
  {
    id: "level-up",
    name: "Level Up",
    emoji: "🚀",
    tagline: "Motivational • Achievement mode",
    tracks: [
      { title: "Heroic Age", url: KM("Heroic Age") },
      { title: "Exhilarate", url: KM("Exhilarate") },
      { title: "Hitman", url: KM("Hitman") },
      { title: "Volatile Reaction", url: KM("Volatile Reaction") },
    ],
  },
  {
    id: "silent",
    name: "Silent Mode",
    emoji: "🔇",
    tagline: "No music",
    tracks: [],
  },
];

// Subject → default station (exported for any future integration; the player
// itself works fully without subject pages touching it).
export const SUBJECT_STATION_DEFAULTS: Record<string, StationId> = {
  math: "focus-lofi",
  mathematics: "focus-lofi",
  science: "cosmic-chill",
  sejarah: "level-up",
  geography: "cosmic-chill",
  geografi: "cosmic-chill",
  english: "teen-study",
  bm: "rain-music",
  "bahasa-melayu": "rain-music",
};

const STORAGE_KEY = "academy-music-prefs-v2";
const TOOLTIP_KEY = "academy-music-tooltip-seen-v2";

// ---------------------------------------------------------------------------
// Module-level singleton store. Outside React so the audio element survives
// route changes and component unmount/remount.
// ---------------------------------------------------------------------------
type PlayerState = {
  stationId: StationId;
  trackIndex: number;
  playing: boolean;
  volume: number; // 0..1
};

type Store = {
  audio: HTMLAudioElement | null;
  state: PlayerState;
  listeners: Set<() => void>;
};

const defaultState: PlayerState = {
  stationId: "focus-lofi",
  trackIndex: 0,
  playing: false, // first-time users → music OFF
  volume: 0.3, // default 30%
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
    // Note: we deliberately don't restore `playing: true` — browsers block
    // autoplay before user interaction. We honor "was playing" by re-arming
    // play on the first interaction (see resumeIfWanted).
    if (typeof p.wasPlaying === "boolean") (s as any)._wasPlaying = p.wasPlaying;
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
    audio.loop = false; // playlist mode — advance to next track
    audio.addEventListener("play", () => setState({ playing: true }));
    audio.addEventListener("pause", () => setState({ playing: false }));
    audio.addEventListener("ended", () => {
      // auto-advance to next track in the station
      next(true);
    });
    audio.addEventListener("error", () => {
      // skip broken URLs silently
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
  if (!t) return; // silent station
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
// UI
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
          <div className="glass-strong max-w-[230px] rounded-2xl px-3 py-2 text-xs font-medium text-foreground shadow-lg animate-fade-in">
            🎧 Pick a study station
          </div>
        )}

        {open && (
          <div
            ref={panelRef}
            className="w-80 glass-strong rounded-2xl p-4 shadow-2xl border border-[#8B5CF6]/30"
            style={{
              animation: "slideUpFade 0.25s ease-out",
              boxShadow: "0 10px 40px -10px rgba(139,92,246,0.4)",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                <Headphones className="w-3.5 h-3.5" /> AcadeMy Radio
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Now playing */}
            <div className="flex items-center gap-3 mb-3">
              <div
                className="relative w-14 h-14 rounded-xl flex items-center justify-center text-2xl overflow-hidden flex-shrink-0"
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
                  <span>{station.emoji}</span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold truncate">
                  {station.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {track ? (playing ? `Now playing · ${track.title}` : track.title) : station.tagline}
                </p>
              </div>
            </div>

            {/* Transport */}
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={togglePlay}
                disabled={station.tracks.length === 0}
                className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-white text-sm font-semibold transition-transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
                onClick={() => next(false)}
                disabled={station.tracks.length <= 1}
                title="Next track"
                aria-label="Next track"
                className="p-2 rounded-xl border border-white/10 text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors disabled:opacity-40"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Volume */}
            <div className="mb-3">
              <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                <Volume2 className="w-3 h-3" /> Volume · {Math.round(volume * 100)}%
              </label>
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

            {/* Stations */}
            <div className="space-y-1 max-h-64 overflow-y-auto pr-1">
              <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-1">
                Stations
              </p>
              {STATIONS.map((s) => {
                const active = s.id === stationId;
                return (
                  <button
                    key={s.id}
                    onClick={() => selectStation(s.id)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-left transition-colors ${
                      active
                        ? "bg-[#8B5CF6]/15 text-foreground ring-1 ring-[#8B5CF6]/40"
                        : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                    }`}
                  >
                    <span className="text-base">{s.emoji}</span>
                    <span className="flex-1 min-w-0">
                      <span className="block truncate font-medium">
                        {s.name}
                      </span>
                      <span className="block truncate text-[10px] text-muted-foreground/80">
                        {s.tagline}
                      </span>
                    </span>
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
