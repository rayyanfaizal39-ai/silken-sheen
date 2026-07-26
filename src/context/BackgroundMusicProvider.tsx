import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import {
  BackgroundMusicContext,
  type BackgroundMusicContextValue,
} from "@/context/background-music-context";
import { cancelAudioFade, fadeAudio } from "@/lib/audio/fadeAudio";

const AUDIO_SRC = "/audio/infinite-papercraft-galaxy.mp3";
const DEFAULT_VOLUME = 0.12;
const MAX_VOLUME = 0.3;
const POSITION_SAVE_INTERVAL_MS = 10_000;
const ENABLED_KEY = "academy:bg-music:enabled:v1";
const VOLUME_KEY = "academy:bg-music:volume:v1";
const POSITION_KEY = "academy:bg-music:position:v1";
const IMPORTANT_SFX_EVENT = "academy:important-sound-effect";

function readNumber(key: string, fallback: number) {
  try {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) return fallback;
    const value = Number(storedValue);
    return Number.isFinite(value) ? value : fallback;
  } catch {
    return fallback;
  }
}

function writePreference(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Storage may be unavailable in privacy modes. Playback still works.
  }
}

export function BackgroundMusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const enabledRef = useRef(false);
  const volumeRef = useRef(DEFAULT_VOLUME);
  const unlockedRef = useRef(false);
  const mediaPauseDepthRef = useRef(0);
  const resumeAfterMediaRef = useRef(false);
  const duckTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isEnabled, setIsEnabled] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(DEFAULT_VOLUME);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const savePosition = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !Number.isFinite(audio.currentTime)) return;
    writePreference(POSITION_KEY, String(Math.max(0, audio.currentTime)));
  }, []);

  const startPlayback = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !enabledRef.current || mediaPauseDepthRef.current > 0) return;

    cancelAudioFade(audio);
    audio.volume = 0;
    try {
      await audio.play();
      unlockedRef.current = true;
      setIsUnlocked(true);
      fadeAudio(audio, volumeRef.current, 750);
    } catch {
      // Autoplay rejection is expected. The visible control remains available.
    }
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    savePosition();
    fadeAudio(audio, 0, 400, () => {
      audio.pause();
      audio.volume = volumeRef.current;
    });
  }, [savePosition]);

  const play = useCallback(async () => {
    await startPlayback();
  }, [startPlayback]);

  const toggleMusic = useCallback(async () => {
    const audio = audioRef.current;
    if (enabledRef.current) {
      enabledRef.current = false;
      resumeAfterMediaRef.current = false;
      setIsEnabled(false);
      writePreference(ENABLED_KEY, "false");
      pause();
      return;
    }

    enabledRef.current = true;
    setIsEnabled(true);
    writePreference(ENABLED_KEY, "true");
    if (audio) await startPlayback();
  }, [pause, startPlayback]);

  const setVolume = useCallback((nextVolume: number) => {
    const clamped = Math.max(0, Math.min(MAX_VOLUME, nextVolume));
    volumeRef.current = clamped;
    setVolumeState(clamped);
    writePreference(VOLUME_KEY, String(clamped));

    const audio = audioRef.current;
    if (audio && !audio.paused && mediaPauseDepthRef.current === 0) {
      cancelAudioFade(audio);
      audio.volume = clamped;
    }
  }, []);

  const pauseForMedia = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (mediaPauseDepthRef.current === 0) {
      resumeAfterMediaRef.current = enabledRef.current && !audio.paused;
      if (resumeAfterMediaRef.current) {
        savePosition();
        fadeAudio(audio, 0, 400, () => {
          audio.pause();
          audio.volume = volumeRef.current;
        });
      }
    }
    mediaPauseDepthRef.current += 1;
  }, [savePosition]);

  const resumeAfterMedia = useCallback(async () => {
    if (mediaPauseDepthRef.current > 0) mediaPauseDepthRef.current -= 1;
    if (mediaPauseDepthRef.current > 0) return;

    const shouldResume = resumeAfterMediaRef.current && enabledRef.current;
    resumeAfterMediaRef.current = false;
    if (shouldResume) await startPlayback();
  }, [startPlayback]);

  const duckForSoundEffect = useCallback((durationMs = 500) => {
    const audio = audioRef.current;
    if (!audio || audio.paused || !enabledRef.current || mediaPauseDepthRef.current > 0) return;

    if (duckTimerRef.current) clearTimeout(duckTimerRef.current);
    fadeAudio(audio, volumeRef.current * 0.4, 200);
    duckTimerRef.current = setTimeout(
      () => {
        duckTimerRef.current = null;
        if (!audio.paused && enabledRef.current && mediaPauseDepthRef.current === 0) {
          fadeAudio(audio, volumeRef.current, 300);
        }
      },
      Math.max(200, durationMs),
    );
  }, []);

  useEffect(() => {
    const savedEnabled = localStorage.getItem(ENABLED_KEY) === "true";
    const savedVolume = Math.max(0, Math.min(MAX_VOLUME, readNumber(VOLUME_KEY, DEFAULT_VOLUME)));
    enabledRef.current = savedEnabled;
    volumeRef.current = savedVolume;
    setIsEnabled(savedEnabled);
    setVolumeState(savedVolume);

    // Deferring creation prevents React Strict Mode's simulated first mount
    // from issuing a duplicate media request.
    const createTimer = window.setTimeout(() => {
      const audio = new Audio();
      audio.src = AUDIO_SRC;
      audio.loop = true;
      audio.preload = "metadata";
      audio.volume = savedVolume;
      audioRef.current = audio;

      let hasRestoredPosition = false;
      const restorePosition = () => {
        if (hasRestoredPosition) return;
        const savedPosition = readNumber(POSITION_KEY, 0);
        if (savedPosition <= 0) {
          hasRestoredPosition = true;
          return;
        }
        if (!Number.isFinite(audio.duration) || audio.duration <= 0) return;

        hasRestoredPosition = true;
        if (savedPosition < audio.duration) {
          audio.currentTime = savedPosition;
        } else {
          writePreference(POSITION_KEY, "0");
        }
      };
      const onPlay = () => setIsPlaying(true);
      const onPause = () => setIsPlaying(false);
      audio.addEventListener("loadedmetadata", restorePosition);
      audio.addEventListener("durationchange", restorePosition);
      audio.addEventListener("play", onPlay);
      audio.addEventListener("pause", onPause);
      audio.load();

      Object.assign(audio, {
        __academyCleanup: () => {
          audio.removeEventListener("loadedmetadata", restorePosition);
          audio.removeEventListener("durationchange", restorePosition);
          audio.removeEventListener("play", onPlay);
          audio.removeEventListener("pause", onPause);
        },
      });
    }, 0);

    return () => {
      window.clearTimeout(createTimer);
      if (duckTimerRef.current) clearTimeout(duckTimerRef.current);
      const audio = audioRef.current;
      if (!audio) return;
      savePosition();
      cancelAudioFade(audio);
      (audio as HTMLAudioElement & { __academyCleanup?: () => void }).__academyCleanup?.();
      audio.pause();
      audio.removeAttribute("src");
      audio.load();
      audioRef.current = null;
    };
  }, [savePosition]);

  useEffect(() => {
    if (!isEnabled || isUnlocked) return;

    const unlock = () => {
      void startPlayback();
    };
    const options: AddEventListenerOptions = { passive: true };
    window.addEventListener("pointerdown", unlock, options);
    window.addEventListener("touchstart", unlock, options);
    window.addEventListener("keydown", unlock);
    return () => {
      window.removeEventListener("pointerdown", unlock);
      window.removeEventListener("touchstart", unlock);
      window.removeEventListener("keydown", unlock);
    };
  }, [isEnabled, isUnlocked, startPlayback]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      if (audioRef.current && !audioRef.current.paused) savePosition();
    }, POSITION_SAVE_INTERVAL_MS);
    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") savePosition();
    };
    const onImportantSoundEffect = (event: Event) => {
      const duration = (event as CustomEvent<{ durationMs?: number }>).detail?.durationMs;
      duckForSoundEffect(duration);
    };

    window.addEventListener("beforeunload", savePosition);
    document.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener(IMPORTANT_SFX_EVENT, onImportantSoundEffect);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener("beforeunload", savePosition);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener(IMPORTANT_SFX_EVENT, onImportantSoundEffect);
    };
  }, [duckForSoundEffect, savePosition]);

  const value = useMemo<BackgroundMusicContextValue>(
    () => ({
      isEnabled,
      isPlaying,
      volume,
      isUnlocked,
      toggleMusic,
      play,
      pause,
      setVolume,
      pauseForMedia,
      resumeAfterMedia,
      duckForSoundEffect,
    }),
    [
      duckForSoundEffect,
      isEnabled,
      isPlaying,
      isUnlocked,
      pause,
      pauseForMedia,
      play,
      resumeAfterMedia,
      setVolume,
      toggleMusic,
      volume,
    ],
  );

  return (
    <BackgroundMusicContext.Provider value={value}>{children}</BackgroundMusicContext.Provider>
  );
}
