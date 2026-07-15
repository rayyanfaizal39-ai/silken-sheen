export type ThemePreference = "dark" | "light" | "system";
export type UserSettings = {
  learningLanguage: "bm" | "en" | "dual";
  defaultDifficulty: "easy" | "normal" | "hard";
  dailyXpGoal: 10 | 25 | 50 | 100;
  quizTimerEnabled: boolean;
  quizAutoAdvance: boolean;
  autoExplainWrongAnswers: boolean;
  answerConfirmationEnabled: boolean;
  theme: ThemePreference;
  reducedMotion: boolean;
  animationsEnabled: boolean;
  largeTextEnabled: boolean;
  masterSoundEnabled: boolean;
  masterVolume: number;
  backgroundMusicEnabled: boolean;
  backgroundMusicVolume: number;
  soundEffectsEnabled: boolean;
  soundEffectsVolume: number;
  homeMusicEnabled: boolean;
  quizMusicEnabled: boolean;
  flashcardMusicEnabled: boolean;
  cikguExplanationStyle: "simple" | "detailed" | "exam";
  cikguVoiceEnabled: boolean;
  readNotesAloud: boolean;
  speakingSpeed: 0.75 | 1 | 1.25 | 1.5;
  motivationalMessagesEnabled: boolean;
  learningSuggestionsEnabled: boolean;
  companionEnabled: boolean;
  companionSoundEnabled: boolean;
  companionIdleAnimations: boolean;
  celebrationEffectsEnabled: boolean;
  rankUpAnimationEnabled: boolean;
  evolutionAnimationEnabled: boolean;
  dailyRevisionReminder: boolean;
  achievementNotifications: boolean;
  leaderboardNotifications: boolean;
  weeklyProgressSummary: boolean;
  emailNotifications: boolean;
  pushNotifications: boolean;
  parentReportEnabled: boolean;
  parentReportLanguage: "bm" | "en";
  parentReportDay: "monday" | "wednesday" | "friday" | "sunday";
  parentEmail: string;
};

export const DEFAULT_USER_SETTINGS: UserSettings = {
  learningLanguage: "dual",
  defaultDifficulty: "normal",
  dailyXpGoal: 25,
  quizTimerEnabled: true,
  quizAutoAdvance: false,
  autoExplainWrongAnswers: true,
  answerConfirmationEnabled: false,
  theme: "dark",
  reducedMotion: false,
  animationsEnabled: true,
  largeTextEnabled: false,
  masterSoundEnabled: true,
  masterVolume: 0.7,
  backgroundMusicEnabled: true,
  backgroundMusicVolume: 0.5,
  soundEffectsEnabled: true,
  soundEffectsVolume: 0.7,
  homeMusicEnabled: true,
  quizMusicEnabled: true,
  flashcardMusicEnabled: true,
  cikguExplanationStyle: "simple",
  cikguVoiceEnabled: false,
  readNotesAloud: false,
  speakingSpeed: 1,
  motivationalMessagesEnabled: true,
  learningSuggestionsEnabled: true,
  companionEnabled: true,
  companionSoundEnabled: true,
  companionIdleAnimations: true,
  celebrationEffectsEnabled: true,
  rankUpAnimationEnabled: true,
  evolutionAnimationEnabled: true,
  dailyRevisionReminder: false,
  achievementNotifications: true,
  leaderboardNotifications: false,
  weeklyProgressSummary: true,
  emailNotifications: false,
  pushNotifications: false,
  parentReportEnabled: false,
  parentReportLanguage: "bm",
  parentReportDay: "sunday",
  parentEmail: "",
};

export function normalizeSettings(value: unknown): UserSettings {
  const raw = value && typeof value === "object" ? (value as Partial<UserSettings>) : {};
  return { ...DEFAULT_USER_SETTINGS, ...raw };
}

export function applyUserSettings(s: UserSettings) {
  if (typeof document === "undefined") return;
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const dark = s.theme === "dark" || (s.theme === "system" && systemDark);
  document.documentElement.classList.toggle("dark", dark);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
  document.documentElement.classList.toggle(
    "user-reduced-motion",
    s.reducedMotion || !s.animationsEnabled,
  );
  document.documentElement.classList.toggle("user-large-text", s.largeTextEnabled);
  document.documentElement.style.setProperty(
    "--academy-master-volume",
    String(s.masterSoundEnabled ? s.masterVolume : 0),
  );
  window.dispatchEvent(new CustomEvent("academy-settings-changed", { detail: s }));
}
