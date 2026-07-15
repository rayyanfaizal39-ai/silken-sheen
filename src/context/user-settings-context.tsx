import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "@/context/auth-context";
import { isSupabaseConfigured, supabase } from "@/lib/supabase";
import {
  applyUserSettings,
  DEFAULT_USER_SETTINGS,
  normalizeSettings,
  type UserSettings,
} from "@/lib/user-settings";
import { sfx } from "@/lib/sounds";
import { configureMusic, isMuted, toggleMute } from "@/lib/bg-music";

type Value = {
  settings: UserSettings;
  loading: boolean;
  error: string | null;
  save: (next: UserSettings) => Promise<void>;
  reload: () => Promise<void>;
};
const Context = createContext<Value>({
  settings: DEFAULT_USER_SETTINGS,
  loading: true,
  error: null,
  save: async () => {},
  reload: async () => {},
});

export function UserSettingsProvider({ children }: { children: ReactNode }) {
  const { user, loading: authLoading } = useAuth();
  const [settings, setSettings] = useState(DEFAULT_USER_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const apply = useCallback((next: UserSettings) => {
    setSettings(next);
    applyUserSettings(next);
    sfx.setMuted(!next.masterSoundEnabled || !next.soundEffectsEnabled);
    sfx.setVolume(next.masterVolume * next.soundEffectsVolume);
    configureMusic({
      volume: next.masterVolume * next.backgroundMusicVolume,
      home: next.homeMusicEnabled,
      quiz: next.quizMusicEnabled,
      flashcards: next.flashcardMusicEnabled,
    });
    const shouldMuteMusic = !next.masterSoundEnabled || !next.backgroundMusicEnabled;
    if (isMuted() !== shouldMuteMusic) toggleMute();
  }, []);
  const reload = useCallback(async () => {
    if (authLoading) return;
    if (!user || !isSupabaseConfigured) {
      apply(DEFAULT_USER_SETTINGS);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    const { data, error: queryError } = await supabase
      .from("user_settings")
      .select("preferences")
      .eq("user_id", user.id)
      .maybeSingle();
    if (queryError) {
      setError(queryError.message);
      setLoading(false);
      return;
    }
    const next = normalizeSettings(data?.preferences);
    if (!data) await supabase.from("user_settings").insert({ user_id: user.id, preferences: next });
    apply(next);
    setLoading(false);
  }, [apply, authLoading, user]);
  useEffect(() => {
    void reload();
  }, [reload]);
  useEffect(() => {
    if (settings.theme !== "system") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const listener = () => applyUserSettings(settings);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [settings]);
  const save = useCallback(
    async (next: UserSettings) => {
      if (!user) throw new Error("You must be signed in.");
      const { error: saveError } = await supabase
        .from("user_settings")
        .upsert({ user_id: user.id, preferences: next }, { onConflict: "user_id" });
      if (saveError) throw saveError;
      apply(next);
    },
    [apply, user],
  );
  const value = useMemo(
    () => ({ settings, loading, error, save, reload }),
    [settings, loading, error, save, reload],
  );
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useUserSettings = () => useContext(Context);
