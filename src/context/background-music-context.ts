import { createContext } from "react";

export type BackgroundMusicContextValue = {
  isEnabled: boolean;
  isPlaying: boolean;
  volume: number;
  isUnlocked: boolean;
  toggleMusic: () => Promise<void>;
  play: () => Promise<void>;
  pause: () => void;
  setVolume: (volume: number) => void;
  pauseForMedia: () => void;
  resumeAfterMedia: () => Promise<void>;
  duckForSoundEffect: (durationMs?: number) => void;
};

export const BackgroundMusicContext = createContext<BackgroundMusicContextValue | null>(null);
