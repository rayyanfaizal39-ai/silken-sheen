import { useContext } from "react";

import {
  BackgroundMusicContext,
  type BackgroundMusicContextValue,
} from "@/context/background-music-context";

export function useBackgroundMusic(): BackgroundMusicContextValue {
  const context = useContext(BackgroundMusicContext);
  if (!context) {
    throw new Error("useBackgroundMusic must be used within a BackgroundMusicProvider.");
  }
  return context;
}
