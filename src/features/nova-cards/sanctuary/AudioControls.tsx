import { useSyncExternalStore } from "react";
import { Music2, Volume2 } from "lucide-react";
import { soundscape } from "./audio";

export function AudioControls() {
  const state = useSyncExternalStore(
    soundscape.subscribe,
    soundscape.getSnapshot,
    soundscape.getServerSnapshot,
  );
  return (
    <div
      className="sanctuary-audio-controls"
      role="group"
      aria-label="Nova audio controls"
      data-music-state={state.musicStatus}
      data-effect={state.effect ?? "silent"}
    >
      <button
        type="button"
        aria-label="Music"
        aria-pressed={state.music}
        onClick={() => soundscape.toggle("music")}
        title={`Music ${state.music ? "on" : "off"}${state.musicStatus === "loading" ? " · loading" : ""}`}
      >
        <Music2 size={15} aria-hidden="true" />
        <span>
          Music <b>{state.music ? "on" : "off"}</b>
        </span>
      </button>
      <button
        type="button"
        aria-label="Sound effects"
        aria-pressed={state.effects}
        onClick={() => soundscape.toggle("effects")}
        title={`Sound effects ${state.effects ? "on" : "off"}`}
      >
        <Volume2 size={15} aria-hidden="true" />
        <span>
          Effects <b>{state.effects ? "on" : "off"}</b>
        </span>
      </button>
      <details className="sanctuary-volume">
        <summary aria-label="Audio volume" title="Audio volume">
          ⋮
        </summary>
        <label>
          Volume{" "}
          <input
            type="range"
            min="0"
            max="60"
            step="1"
            value={Math.round(state.volume * 100)}
            onChange={(e) => soundscape.setVolume(Number(e.target.value) / 100)}
            aria-label="Nova audio volume"
          />
          <output>{Math.round(state.volume * 100)}%</output>
        </label>
      </details>
      <span className="sr-only" role="status">
        {state.message ||
          (state.musicStatus === "playing"
            ? "Background music is playing."
            : state.musicStatus === "idle" && (state.music || state.effects)
              ? "Saved audio is ready. Interact with Nova Studio to start playback."
              : "")}
      </span>
    </div>
  );
}
