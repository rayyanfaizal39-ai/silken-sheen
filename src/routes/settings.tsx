import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useState } from "react";
import type * as React from "react";
import {
  Bell,
  Bot,
  CircleUserRound,
  CreditCard,
  Database,
  Headphones,
  HelpCircle,
  Lock,
  Palette,
  Save,
  Settings2,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/context/auth-context";
import { useUserSettings } from "@/context/user-settings-context";
import { supabase } from "@/lib/supabase";
import { getFeaturesForPlan, hasFeature, resolveStoredPlan } from "@/lib/feature-access";
import { PLAN_FEATURES } from "@/config/features";
import { useProgress } from "@/hooks/use-progress";
import type { UserSettings } from "@/lib/user-settings";
import { applyUserSettings } from "@/lib/user-settings";
import { configureMusic, isMuted, toggleMute } from "@/lib/bg-music";
import { sfx } from "@/lib/sounds";

export const Route = createFileRoute("/settings")({
  component: SettingsPage,
  head: () => ({
    meta: [
      { title: "Mission Control — AcadeMY" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

const sections = [
  ["account", "Account", CircleUserRound],
  ["membership", "Membership", CreditCard],
  ["learning", "Learning", Settings2],
  ["appearance", "Appearance", Palette],
  ["audio", "Audio", Headphones],
  ["cikgu", "Cikgu AI", Bot],
  ["companion", "Companion", Sparkles],
  ["notifications", "Notifications", Bell],
  ["privacy", "Privacy & Data", Database],
  ["support", "Help & Support", HelpCircle],
  ["danger", "Danger Zone", ShieldAlert],
] as const;
type SectionId = (typeof sections)[number][0];
type Profile = {
  full_name: string;
  username: string;
  school: string;
  form_level: "Form 1" | "Form 2" | "Form 3";
  avatar_url: string;
  plan: string;
};

function SettingsPage() {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { settings, loading, error, save, reload } = useUserSettings();
  const { progress } = useProgress();
  const [draft, setDraft] = useState(settings);
  const [profile, setProfile] = useState<Profile>({
    full_name: "",
    username: "",
    school: "",
    form_level: "Form 2",
    avatar_url: "",
    plan: "free",
  });
  const [savedProfile, setSavedProfile] = useState(profile);
  const [active, setActive] = useState<SectionId>("account");
  const [saving, setSaving] = useState(false);
  const [profileError, setProfileError] = useState("");
  useEffect(() => {
    if (!authLoading && !user)
      navigate({ to: "/login", search: { redirect: "/settings" } as never, replace: true });
  }, [authLoading, user, navigate]);
  useEffect(() => setDraft(settings), [settings]);
  useEffect(() => {
    applyUserSettings(draft);
    sfx.setMuted(!draft.masterSoundEnabled || !draft.soundEffectsEnabled);
    sfx.setVolume(draft.masterVolume * draft.soundEffectsVolume);
    configureMusic({
      volume: draft.masterVolume * draft.backgroundMusicVolume,
      home: draft.homeMusicEnabled,
      quiz: draft.quizMusicEnabled,
      flashcards: draft.flashcardMusicEnabled,
    });
    const shouldMute = !draft.masterSoundEnabled || !draft.backgroundMusicEnabled;
    if (isMuted() !== shouldMute) toggleMute();
  }, [draft]);
  useEffect(() => {
    if (!user) return;
    void supabase
      .from("profiles")
      .select("full_name,username,school,form_level,avatar_url,plan")
      .eq("id", user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (data) {
          const p = {
            full_name: data.full_name ?? user.name ?? "",
            username: data.username ?? "",
            school: data.school ?? "",
            form_level: data.form_level ?? "Form 2",
            avatar_url: data.avatar_url ?? user.avatarUrl ?? "",
            plan: data.plan ?? "free",
          } as Profile;
          setProfile(p);
          setSavedProfile(p);
        }
      });
  }, [user]);
  const dirty = useMemo(
    () =>
      JSON.stringify(draft) !== JSON.stringify(settings) ||
      JSON.stringify(profile) !== JSON.stringify(savedProfile),
    [draft, settings, profile, savedProfile],
  );
  useEffect(() => {
    const before = (e: BeforeUnloadEvent) => {
      if (dirty) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", before);
    return () => window.removeEventListener("beforeunload", before);
  }, [dirty]);
  const set = <K extends keyof UserSettings>(key: K, value: UserSettings[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));
  async function saveAll() {
    if (!user || saving) return;
    setProfileError("");
    if (!profile.full_name.trim()) {
      setProfileError("Full name is required.");
      setActive("account");
      return;
    }
    if (profile.username && !/^[a-zA-Z0-9_]{3,24}$/.test(profile.username)) {
      setProfileError("Username must be 3–24 letters, numbers or underscores.");
      setActive("account");
      return;
    }
    if (draft.parentReportEnabled && !/^\S+@\S+\.\S+$/.test(draft.parentEmail)) {
      toast.error("Enter a valid parent email address.");
      setActive("notifications");
      return;
    }
    setSaving(true);
    try {
      const { error: pe } = await supabase
        .from("profiles")
        .update({
          full_name: profile.full_name.trim(),
          username: profile.username.trim() || null,
          school: profile.school.trim() || null,
          form_level: profile.form_level,
        })
        .eq("id", user.id);
      if (pe) throw pe;
      await save(draft);
      setSavedProfile(profile);
      toast.success("Mission Control settings saved.");
    } catch (e) {
      const message = e instanceof Error ? e.message : "Could not save settings.";
      setProfileError(message.includes("unique") ? "That username is already taken." : message);
      toast.error("Save failed. Please try again.");
    } finally {
      setSaving(false);
    }
  }
  function revert() {
    setDraft(settings);
    setProfile(savedProfile);
    setProfileError("");
  }
  if (authLoading || loading || !user)
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div
          className="h-8 w-8 animate-spin rounded-full border-2 border-violet-400 border-t-transparent"
          aria-label="Loading settings"
        />
      </div>
    );
  const plan = resolveStoredPlan(profile.plan);
  const parentAccess = hasFeature(plan, "parent_dashboard");
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 pb-32 sm:px-6 lg:px-8">
      <header className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[.22em] text-violet-300">
          Personal command deck
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold sm:text-4xl">Mission Control</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/60">
          Manage your account, learning experience and AcadeMY preferences.
        </p>
        {error && (
          <button onClick={() => void reload()} className="mt-3 text-sm text-red-300 underline">
            Settings could not load. Retry
          </button>
        )}
      </header>
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav
          aria-label="Settings categories"
          className="flex gap-2 overflow-x-auto pb-2 lg:sticky lg:top-24 lg:block lg:self-start lg:overflow-visible"
        >
          {sections.map(([id, label, Icon]) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              aria-current={active === id ? "page" : undefined}
              className={`flex min-h-11 shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold transition-colors lg:mb-1 lg:w-full ${active === id ? "bg-violet-500/20 text-white ring-1 ring-violet-400/40" : "text-white/55 hover:bg-white/[.06] hover:text-white"}`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
        <main className="min-w-0">
          <Panel title={sections.find((x) => x[0] === active)![1]}>
            {active === "account" && (
              <Account
                profile={profile}
                setProfile={setProfile}
                email={user.email ?? ""}
                error={profileError}
                onPassword={async () => {
                  if (!user.email) return;
                  const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
                    redirectTo: `${window.location.origin}/auth/callback`,
                  });
                  if (error) toast.error(error.message);
                  else toast.success("Password reset email sent.");
                }}
                onSignOut={async () => {
                  await signOut();
                  navigate({ to: "/login", replace: true });
                }}
              />
            )}
            {active === "membership" && <Membership plan={plan} />}{" "}
            {active === "learning" && <Learning s={draft} set={set} />}{" "}
            {active === "appearance" && <Appearance s={draft} set={set} />}{" "}
            {active === "audio" && <Audio s={draft} set={set} />}{" "}
            {active === "cikgu" && <Cikgu s={draft} set={set} />}{" "}
            {active === "companion" && (
              <Companion
                s={draft}
                set={set}
                name={progress.companion?.name || "Nova"}
                stage={progress.companion?.stage || "egg"}
              />
            )}{" "}
            {active === "notifications" && (
              <Notifications s={draft} set={set} parentAccess={parentAccess} />
            )}{" "}
            {active === "privacy" && (
              <Privacy userId={user.id} profile={profile} settings={settings} progress={progress} />
            )}{" "}
            {active === "support" && <Support />}{" "}
            {active === "danger" && (
              <Danger
                onSignOut={async () => {
                  await signOut();
                  navigate({ to: "/login", replace: true });
                }}
              />
            )}
          </Panel>
        </main>
      </div>
      {dirty && (
        <div className="fixed bottom-[calc(5.5rem+env(safe-area-inset-bottom))] left-3 right-3 z-[90] mx-auto flex max-w-xl items-center justify-between gap-3 rounded-2xl border border-violet-400/30 bg-[#0b1022]/95 p-3 shadow-2xl backdrop-blur-xl lg:bottom-5">
          <span className="text-sm font-semibold">
            <span className="mr-2 inline-block h-2 w-2 rounded-full bg-amber-400" />
            Unsaved changes
          </span>
          <div className="flex gap-2">
            <button
              onClick={revert}
              disabled={saving}
              className="min-h-11 rounded-xl px-4 text-sm text-white/65 hover:bg-white/5"
            >
              Cancel
            </button>
            <button
              onClick={() => void saveAll()}
              disabled={saving}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-violet-500 px-4 text-sm font-bold disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-[1.75rem] border border-white/[.08] bg-[#0b1220]/75 p-5 shadow-[0_24px_80px_rgba(0,0,0,.25)] backdrop-blur-xl sm:p-7">
      <h2 className="font-display text-xl font-bold">{title}</h2>
      <div className="mt-6 space-y-5">{children}</div>
    </section>
  );
}
const cls =
  "min-h-11 w-full rounded-xl border border-white/10 bg-white/[.04] px-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-500/20";
function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block text-sm font-semibold text-white/80">
      <span>{label}</span>
      <div className="mt-2">{children}</div>
      {hint && <span className="mt-1 block text-xs font-normal text-white/45">{hint}</span>}
    </label>
  );
}
function Toggle({
  label,
  checked,
  onChange,
  disabled = false,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
  hint?: string;
}) {
  return (
    <label
      className={`flex min-h-12 items-center justify-between gap-4 rounded-xl border border-white/[.07] bg-white/[.025] px-4 py-3 ${disabled ? "opacity-50" : ""}`}
    >
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        {hint && <span className="mt-1 block text-xs text-white/45">{hint}</span>}
      </span>
      <input
        type="checkbox"
        role="switch"
        checked={checked}
        disabled={disabled}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 accent-violet-500"
      />
    </label>
  );
}
function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string | number;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <Field label={label}>
      <select className={cls} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map(([v, l]) => (
          <option key={v} value={v} className="bg-slate-900">
            {l}
          </option>
        ))}
      </select>
    </Field>
  );
}
function Account({
  profile,
  setProfile,
  email,
  error,
  onPassword,
  onSignOut,
}: {
  profile: Profile;
  setProfile: (p: Profile) => void;
  email: string;
  error: string;
  onPassword: () => void;
  onSignOut: () => void;
}) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Full name">
          <input
            className={cls}
            value={profile.full_name}
            onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
          />
        </Field>
        <Field label="Username">
          <input
            className={cls}
            value={profile.username}
            onChange={(e) => setProfile({ ...profile, username: e.target.value })}
            autoCapitalize="none"
          />
        </Field>
        <Field label="Email" hint="Email changes require a secure verification flow.">
          <input className={cls} value={email} readOnly aria-readonly />
        </Field>
        <Field label="School">
          <input
            className={cls}
            value={profile.school}
            onChange={(e) => setProfile({ ...profile, school: e.target.value })}
          />
        </Field>
        <SelectField
          label="Current form"
          value={profile.form_level}
          onChange={(v) => setProfile({ ...profile, form_level: v as Profile["form_level"] })}
          options={[
            ["Form 1", "Form 1"],
            ["Form 2", "Form 2"],
            ["Form 3", "Form 3"],
          ]}
        />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-300">
          {error}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <button
          onClick={onPassword}
          className="min-h-11 rounded-xl border border-white/10 px-4 text-sm font-semibold"
        >
          Change password
        </button>
        <button
          onClick={onSignOut}
          className="min-h-11 rounded-xl border border-white/10 px-4 text-sm font-semibold"
        >
          Sign out
        </button>
      </div>
    </>
  );
}
function Membership({ plan }: { plan: keyof typeof PLAN_FEATURES }) {
  return (
    <>
      <div className="rounded-2xl border border-violet-400/25 bg-violet-500/10 p-5">
        <p className="text-xs uppercase tracking-wider text-violet-300">Current plan</p>
        <p className="mt-1 text-2xl font-bold capitalize">{plan}</p>
        <p className="mt-2 text-sm text-white/55">
          {getFeaturesForPlan(plan).length
            ? `${getFeaturesForPlan(plan).length} feature groups unlocked.`
            : "Core preview access."}
        </p>
      </div>
      <div className="grid gap-2 sm:grid-cols-2">
        {Object.keys(PLAN_FEATURES.enterprise).map(() => null)}
        {[
          "student_learning",
          "quiz_history",
          "parent_dashboard",
          "parent_reports",
          "teacher_dashboard",
          "ai_quiz_generation",
          "school_dashboard",
          "admin_upload_center",
        ].map((f) => (
          <div key={f} className="flex items-center gap-2 rounded-xl bg-white/[.03] p-3 text-sm">
            <Lock
              className={`h-4 w-4 ${getFeaturesForPlan(plan).includes(f as never) ? "text-emerald-400" : "text-white/25"}`}
            />
            <span className={getFeaturesForPlan(plan).includes(f as never) ? "" : "text-white/40"}>
              {f.replaceAll("_", " ")}
            </span>
          </div>
        ))}
      </div>
      <Link
        to="/upgrade"
        className="inline-flex min-h-11 items-center rounded-xl bg-violet-500 px-4 text-sm font-bold"
      >
        View upgrade options
      </Link>
      <p className="text-xs text-white/45">
        Subscription management is unavailable until live billing is connected. No renewal status is
        shown because none exists.
      </p>
    </>
  );
}
function Learning({ s, set }: { s: UserSettings; set: any }) {
  return (
    <>
      <div className="grid gap-4 sm:grid-cols-3">
        <SelectField
          label="Learning language"
          value={s.learningLanguage}
          onChange={(v) => set("learningLanguage", v)}
          options={[
            ["bm", "Bahasa Melayu"],
            ["en", "English"],
            ["dual", "Dual Language"],
          ]}
        />
        <SelectField
          label="Default difficulty"
          value={s.defaultDifficulty}
          onChange={(v) => set("defaultDifficulty", v)}
          options={[
            ["easy", "Easy"],
            ["normal", "Normal"],
            ["hard", "Hard"],
          ]}
        />
        <SelectField
          label="Daily XP goal"
          value={s.dailyXpGoal}
          onChange={(v) => set("dailyXpGoal", Number(v))}
          options={[
            ["10", "10 XP"],
            ["25", "25 XP"],
            ["50", "50 XP"],
            ["100", "100 XP"],
          ]}
        />
      </div>
      {[
        ["quizTimerEnabled", "Quiz timer"],
        ["quizAutoAdvance", "Auto-advance after answering"],
        ["autoExplainWrongAnswers", "Explain wrong answers"],
        ["answerConfirmationEnabled", "Confirm answers before submission"],
      ].map(([k, l]) => (
        <Toggle key={k} label={l} checked={(s as any)[k]} onChange={(v) => set(k, v)} />
      ))}
    </>
  );
}
function Appearance({ s, set }: { s: UserSettings; set: any }) {
  return (
    <>
      <SelectField
        label="Theme"
        value={s.theme}
        onChange={(v) => {
          set("theme", v);
        }}
        options={[
          ["dark", "Dark"],
          ["light", "Light"],
          ["system", "System"],
        ]}
      />
      <Toggle
        label="Reduced motion"
        checked={s.reducedMotion}
        onChange={(v) => set("reducedMotion", v)}
      />
      <Toggle
        label="Interface animations"
        checked={s.animationsEnabled}
        onChange={(v) => set("animationsEnabled", v)}
      />
      <Toggle
        label="Larger text"
        checked={s.largeTextEnabled}
        onChange={(v) => set("largeTextEnabled", v)}
      />
    </>
  );
}
function Audio({ s, set }: { s: UserSettings; set: any }) {
  const slider = (key: keyof UserSettings, label: string) => (
    <Field label={`${label}: ${Math.round(Number(s[key]) * 100)}%`}>
      <input
        className="w-full accent-violet-500"
        type="range"
        min="0"
        max="1"
        step=".05"
        value={Number(s[key])}
        onChange={(e) => set(key, Number(e.target.value))}
      />
    </Field>
  );
  return (
    <>
      <Toggle
        label="Master sound"
        checked={s.masterSoundEnabled}
        onChange={(v) => set("masterSoundEnabled", v)}
      />
      {slider("masterVolume", "Master volume")}
      <Toggle
        label="Background music"
        checked={s.backgroundMusicEnabled}
        onChange={(v) => set("backgroundMusicEnabled", v)}
      />
      {slider("backgroundMusicVolume", "Music volume")}
      <Toggle
        label="Sound effects"
        checked={s.soundEffectsEnabled}
        onChange={(v) => set("soundEffectsEnabled", v)}
      />
      {slider("soundEffectsVolume", "Effects volume")}
      {[
        ["homeMusicEnabled", "Home music"],
        ["quizMusicEnabled", "Quiz music"],
        ["flashcardMusicEnabled", "Flashcard music"],
      ].map(([k, l]) => (
        <Toggle key={k} label={l} checked={(s as any)[k]} onChange={(v) => set(k, v)} />
      ))}
    </>
  );
}
function Cikgu({ s, set }: { s: UserSettings; set: any }) {
  return (
    <>
      <SelectField
        label="Explanation style"
        value={s.cikguExplanationStyle}
        onChange={(v) => set("cikguExplanationStyle", v)}
        options={[
          ["simple", "Simple"],
          ["detailed", "Detailed"],
          ["exam", "Exam Focus"],
        ]}
      />
      <Toggle
        label="Cikgu AI voice"
        checked={false}
        onChange={() => {}}
        disabled
        hint="Coming later — no production voice service is connected."
      />
      <Toggle
        label="Read notes aloud"
        checked={false}
        onChange={() => {}}
        disabled
        hint="Coming later."
      />
      <SelectField
        label="Speaking speed"
        value={s.speakingSpeed}
        onChange={(v) => set("speakingSpeed", Number(v))}
        options={[
          ["0.75", "0.75x"],
          ["1", "1x"],
          ["1.25", "1.25x"],
          ["1.5", "1.5x"],
        ]}
      />
      <Toggle
        label="Motivational messages"
        checked={s.motivationalMessagesEnabled}
        onChange={(v) => set("motivationalMessagesEnabled", v)}
      />
      <Toggle
        label="Follow-up learning suggestions"
        checked={s.learningSuggestionsEnabled}
        onChange={(v) => set("learningSuggestionsEnabled", v)}
      />
    </>
  );
}
function Companion({
  s,
  set,
  name,
  stage,
}: {
  s: UserSettings;
  set: any;
  name: string;
  stage: string;
}) {
  return (
    <>
      <div className="rounded-2xl bg-white/[.04] p-4">
        <p className="font-bold">{name}</p>
        <p className="text-sm capitalize text-white/50">Current stage: {stage}</p>
        <p className="mt-2 text-xs text-white/45">
          Nova is the only companion currently implemented. Progress and evolution are never changed
          here.
        </p>
      </div>
      {[
        ["companionEnabled", "Companion enabled"],
        ["companionSoundEnabled", "Companion sound"],
        ["companionIdleAnimations", "Idle animations"],
        ["celebrationEffectsEnabled", "Celebration effects"],
        ["rankUpAnimationEnabled", "Rank-up animation"],
        ["evolutionAnimationEnabled", "Evolution animation"],
      ].map(([k, l]) => (
        <Toggle
          key={k}
          label={l}
          checked={(s as any)[k]}
          onChange={(v) => set(k, v)}
          hint={
            s.reducedMotion && k.includes("Animation")
              ? "Reduced motion overrides this preference."
              : undefined
          }
        />
      ))}
    </>
  );
}
function Notifications({
  s,
  set,
  parentAccess,
}: {
  s: UserSettings;
  set: any;
  parentAccess: boolean;
}) {
  const status =
    typeof Notification === "undefined"
      ? "Unavailable"
      : Notification.permission[0].toUpperCase() + Notification.permission.slice(1);
  return (
    <>
      {[
        ["dailyRevisionReminder", "Daily revision reminder"],
        ["achievementNotifications", "Achievement notifications"],
        ["leaderboardNotifications", "Leaderboard updates"],
        ["weeklyProgressSummary", "Weekly progress summary"],
        ["emailNotifications", "Email notifications"],
      ].map(([k, l]) => (
        <Toggle
          key={k}
          label={l}
          checked={(s as any)[k]}
          onChange={(v) => set(k, v)}
          hint="Preference saved. Delivery setup pending."
        />
      ))}
      <Toggle
        label={`Browser push notifications — ${status}`}
        checked={s.pushNotifications}
        onChange={async (v) => {
          if (v && "Notification" in window) {
            const p = await Notification.requestPermission();
            set("pushNotifications", p === "granted");
          } else set("pushNotifications", false);
        }}
        hint="Permission is requested only when enabled."
      />
      {parentAccess && (
        <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
          <h3 className="font-bold">Parent Report Preferences</h3>
          <Toggle
            label="Weekly parent report"
            checked={s.parentReportEnabled}
            onChange={(v) => set("parentReportEnabled", v)}
            hint="Preference saved; delivery uses existing report infrastructure when configured."
          />
          <SelectField
            label="Report language"
            value={s.parentReportLanguage}
            onChange={(v) => set("parentReportLanguage", v)}
            options={[
              ["bm", "Bahasa Melayu"],
              ["en", "English"],
            ]}
          />
          <SelectField
            label="Preferred day"
            value={s.parentReportDay}
            onChange={(v) => set("parentReportDay", v)}
            options={[
              ["monday", "Monday"],
              ["wednesday", "Wednesday"],
              ["friday", "Friday"],
              ["sunday", "Sunday"],
            ]}
          />
          <Field label="Parent email">
            <input
              type="email"
              className={cls}
              value={s.parentEmail}
              onChange={(e) => set("parentEmail", e.target.value)}
            />
          </Field>
        </div>
      )}
    </>
  );
}
function Privacy({
  userId,
  profile,
  settings,
  progress,
}: {
  userId: string;
  profile: Profile;
  settings: UserSettings;
  progress: unknown;
}) {
  function exportData() {
    const safe = {
      exportedAt: new Date().toISOString(),
      userId,
      profile: {
        fullName: profile.full_name,
        username: profile.username,
        school: profile.school,
        formLevel: profile.form_level,
        plan: profile.plan,
      },
      settings,
      progress,
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(safe, null, 2)], { type: "application/json" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = "academy-learning-data.json";
    a.click();
    URL.revokeObjectURL(url);
  }
  function clear() {
    if (!confirm("Clear safe AcadeMY device cache? Cloud data and your login will remain.")) return;
    Object.keys(localStorage)
      .filter((k) => k.startsWith("learnnova-") || k.startsWith("academy-"))
      .forEach((k) => localStorage.removeItem(k));
    toast.success("Local device cache cleared.");
  }
  return (
    <>
      <div className="rounded-xl bg-emerald-500/10 p-4 text-sm text-emerald-200">
        Cloud sync active for this authenticated account.
      </div>
      <button
        onClick={exportData}
        className="min-h-11 rounded-xl border border-white/10 px-4 text-sm font-semibold"
      >
        Export learning data (JSON)
      </button>
      <button
        onClick={clear}
        className="ml-2 min-h-11 rounded-xl border border-white/10 px-4 text-sm font-semibold"
      >
        Clear local device cache
      </button>
      <div className="flex gap-4 text-sm">
        <Link to="/privacy" className="underline">
          Privacy Policy
        </Link>
        <Link to="/terms" className="underline">
          Terms of Service
        </Link>
      </div>
    </>
  );
}
function Support() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Link to="/contact" className="rounded-xl border border-white/10 p-4 font-semibold">
        Contact Support
      </Link>
      <Link
        to="/contact"
        search={{ topic: "bug" } as never}
        className="rounded-xl border border-white/10 p-4 font-semibold"
      >
        Report a Bug
      </Link>
      <Link
        to="/contact"
        search={{ topic: "feature" } as never}
        className="rounded-xl border border-white/10 p-4 font-semibold"
      >
        Suggest a Feature
      </Link>
      <Link to="/privacy" className="rounded-xl border border-white/10 p-4 font-semibold">
        Privacy Policy
      </Link>
      <Link to="/terms" className="rounded-xl border border-white/10 p-4 font-semibold">
        Terms of Service
      </Link>
      <div className="rounded-xl bg-white/[.03] p-4 text-sm text-white/50">
        AcadeMY production build
      </div>
    </div>
  );
}
function Danger({ onSignOut }: { onSignOut: () => void }) {
  return (
    <>
      <div className="rounded-2xl border border-red-400/20 bg-red-500/[.06] p-5">
        <h3 className="font-bold text-red-200">Account deletion</h3>
        <p className="mt-2 text-sm text-white/55">
          Secure automated deletion is not available. Contact support for identity verification and
          deletion assistance.
        </p>
        <Link
          to="/contact"
          className="mt-4 inline-flex min-h-11 items-center rounded-xl border border-red-300/20 px-4 text-sm font-semibold text-red-200"
        >
          Contact support
        </Link>
      </div>
      <button
        onClick={onSignOut}
        className="min-h-11 rounded-xl border border-white/10 px-4 text-sm font-semibold"
      >
        Sign out
      </button>
    </>
  );
}
