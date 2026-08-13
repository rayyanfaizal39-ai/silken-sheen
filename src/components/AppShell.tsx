import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  Brain,
  CreditCard,
  Flame,
  Gauge,
  Home,
  LayoutDashboard,
  Library,
  LogIn,
  LogOut,
  MoreHorizontal,
  Network,
  Radar,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
  X,
  Zap,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import {
  useProgress,
  getRank,
  getChessRating,
  getCompanionLevelProgress,
} from "@/hooks/use-progress";
import { RankBadge } from "@/components/RankBadge";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { useAuth } from "@/context/auth-context";
import { useSignInModal } from "@/context/sign-in-modal";
import { GalaxySearch } from "@/components/GalaxySearch";
import { AICompanionButton } from "@/companion";
import { CompanionTip } from "@/components/CompanionTip";
import { NextMissionCard } from "@/components/NextMissionCard";
import { RankUpModal } from "@/components/progression/RankUpModal";
import { CompanionEvolutionModal } from "@/components/progression/CompanionEvolutionModal";
import { MissionRewardCelebration } from "@/components/progression/MissionRewardCelebration";
import { SiteFooter } from "@/components/SiteFooter";
import { AcademyLogo } from "@/components/AcademyLogo";
import { CompanionInfoPopover, StreakInfoPopover } from "@/components/progression/ProgressionHelp";
import { getCompanionDisplayName } from "@/companion";
import { isRouteActive } from "@/lib/study-routing";
import { getProfileForAdminCheck, hasAdministratorRole } from "@/lib/admin-access";
import { BackgroundMusicControl } from "@/components/audio/BackgroundMusicControl";
import { BackgroundMusicProvider } from "@/context/BackgroundMusicProvider";
import { isStudentMusicRoute } from "@/lib/audio/studentMusicRoutes";
import {
  isPublicAuthRoute,
  isOnboardingExemptRoute,
  shouldRedirectToLogin,
  shouldRedirectToOnboarding,
} from "@/lib/onboarding-routing";

const ProfileSummaryDialog = lazy(() =>
  import("@/components/profile/ProfileSummaryDialog").then((module) => ({
    default: module.ProfileSummaryDialog,
  })),
);

const navItems = [
  {
    label: "Home",
    short: "Home",
    to: "/home",
    icon: Home,
    accent: "#6366F1",
    accentGlow: "rgba(99,102,241,0.55)",
    accentBg: "rgba(99,102,241,0.22)",
    line: "linear-gradient(90deg,#818CF8,#C084FC)",
  },
  {
    label: "Dashboard",
    short: "Dash",
    to: "/dashboard",
    icon: LayoutDashboard,
    accent: "#8B5CF6",
    accentGlow: "rgba(139,92,246,0.55)",
    accentBg: "rgba(139,92,246,0.22)",
    line: "linear-gradient(90deg,#A78BFA,#7C3AED)",
  },
  {
    label: "Notes",
    short: "Notes",
    to: "/notes",
    icon: BookOpen,
    accent: "#3B82F6",
    accentGlow: "rgba(59,130,246,0.55)",
    accentBg: "rgba(59,130,246,0.22)",
    line: "linear-gradient(90deg,#60A5FA,#2563EB)",
  },
  {
    label: "Mind Maps",
    short: "Maps",
    to: "/mindmaps",
    icon: Network,
    accent: "#22D3EE",
    accentGlow: "rgba(34,211,238,0.55)",
    accentBg: "rgba(34,211,238,0.20)",
    line: "linear-gradient(90deg,#67E8F9,#0EA5E9)",
  },
  {
    label: "Quizzes",
    short: "Quiz",
    to: "/quizzes",
    icon: Brain,
    accent: "#F59E0B",
    accentGlow: "rgba(245,158,11,0.55)",
    accentBg: "rgba(245,158,11,0.22)",
    line: "linear-gradient(90deg,#FBBF24,#D97706)",
  },
  {
    label: "Flashcards",
    short: "Cards",
    to: "/flashcards",
    icon: Library,
    accent: "#A855F7",
    accentGlow: "rgba(168,85,247,0.55)",
    accentBg: "rgba(168,85,247,0.22)",
    line: "linear-gradient(90deg,#C084FC,#9333EA)",
  },
  {
    label: "AI Tracker",
    short: "Track",
    to: "/tracker",
    icon: Radar,
    accent: "#22D3EE",
    accentGlow: "rgba(34,211,238,0.55)",
    accentBg: "rgba(34,211,238,0.20)",
    line: "linear-gradient(90deg,#67E8F9,#0EA5E9)",
  },
  {
    label: "Cosmic Companion",
    short: "Buddy",
    to: "/companion",
    icon: Sparkles,
    accent: "#F0ABFC",
    accentGlow: "rgba(240,171,252,0.55)",
    accentBg: "rgba(240,171,252,0.20)",
    line: "linear-gradient(90deg,#F0ABFC,#8B5CF6)",
  },
  {
    label: "Leaderboard",
    short: "Ranks",
    to: "/leaderboard",
    icon: Trophy,
    accent: "#FCD34D",
    accentGlow: "rgba(252,211,77,0.55)",
    accentBg: "rgba(252,211,77,0.20)",
    line: "linear-gradient(90deg,#FDE68A,#F59E0B)",
  },
  {
    label: "Parent Dashboard",
    short: "Analytics",
    to: "/parent-dashboard",
    icon: Gauge,
    accent: "#A78BFA",
    accentGlow: "rgba(167,139,250,0.55)",
    accentBg: "rgba(167,139,250,0.20)",
    line: "linear-gradient(90deg,#C4B5FD,#8B5CF6)",
  },
] as const;

const primaryMobileNavItems = navItems.filter(({ label }) =>
  ["Home", "Dashboard", "Notes", "Quizzes"].includes(label),
);
const secondaryMobileNavItems = navItems.filter((item) => !primaryMobileNavItems.includes(item));
const moreNavAppearance = {
  accent: "#C084FC",
  accentGlow: "rgba(192,132,252,0.55)",
  accentBg: "rgba(192,132,252,0.22)",
  line: "linear-gradient(90deg,#C084FC,#818CF8)",
} as const;

function SidebarBottom() {
  const { progress } = useProgress();
  const { user, signOut, isConfigured } = useAuth();
  const { open: openSignIn } = useSignInModal();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideSignIn = pathname === "/" || pathname.startsWith("/dashboard");
  const rank = getRank(progress.xp);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setIsAdmin(false);
    if (!user) return;

    void getProfileForAdminCheck(user.id)
      .then((profile) => {
        if (!cancelled) setIsAdmin(hasAdministratorRole(profile));
      })
      .catch(() => {
        if (!cancelled) setIsAdmin(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user?.id]);

  return (
    <div className="mt-auto space-y-3">
      {/* User profile card when signed in */}
      {user ? (
        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.03] p-3 space-y-2.5">
          <div className="flex items-center gap-2.5">
            <ProfileAvatar
              source={progress.profileAvatarSource}
              googleUrl={user.avatarUrl}
              avatarId={progress.profileAvatarId}
              name={progress.displayName ?? user.name ?? "Student"}
              size={32}
              className="rounded-xl"
            />
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-bold text-white">{user.name ?? "Student"}</p>
              <p className="truncate text-[10px] text-white/40">{user.email}</p>
            </div>
          </div>
          {isAdmin && (
            <Link
              to="/admin"
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-violet-400/20 bg-violet-400/10 px-3 py-1.5 text-[11px] font-semibold text-violet-200 transition-colors hover:bg-violet-400/20 hover:text-white"
            >
              <ShieldCheck className="h-3 w-3" />
              Admin Portal
            </Link>
          )}
          <Link
            to="/account/billing"
            className="flex min-h-11 w-full items-center justify-center gap-1.5 rounded-xl border border-[#F2622E]/20 bg-[#F2622E]/10 px-3 py-2 text-[11px] font-semibold text-[#FFB394] transition-colors hover:bg-[#F2622E]/15 hover:text-white"
          >
            <CreditCard className="h-3.5 w-3.5" />
            Account &amp; Billing
          </Link>
          <button
            type="button"
            onClick={() => void signOut()}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/[0.07] bg-white/[0.04] px-3 py-1.5 text-[11px] font-semibold text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white/80"
          >
            <LogOut className="h-3 w-3" />
            Sign Out
          </button>
        </div>
      ) : isConfigured && !hideSignIn ? (
        <button
          type="button"
          onClick={() => openSignIn()}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.09] bg-white/[0.04] px-3 py-2.5 text-xs font-semibold text-white/50 transition-colors hover:bg-white/[0.08] hover:text-white"
        >
          <LogIn className="h-3.5 w-3.5" />
          Sign in to sync progress
        </button>
      ) : null}

      {/* Live rank chip */}
      {progress.xp > 0 && (
        <div className="flex items-center gap-3 rounded-2xl border border-white/[0.07] bg-white/[0.04] px-3 py-2.5">
          <div
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-lg"
            style={{ background: `${rank.color}22` }}
          >
            <RankBadge rank={rank} size={32} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-bold" style={{ color: rank.color }}>
              {rank.name}
            </p>
            <p
              className="text-[10px] text-white/40"
              title="Display rating: 1,000 plus Lifetime XP, capped at 3,000. It does not determine Rank or Monthly Leaderboard placement."
            >
              Rating {getChessRating(progress.xp).toLocaleString()}
            </p>
          </div>
          {progress.streak > 0 && (
            <div className="flex items-center gap-1 rounded-xl bg-orange-500/15 px-2 py-1">
              <Flame className="h-3 w-3 text-orange-400" />
              <span className="text-[10px] font-bold text-orange-300">
                {progress.streak} Day Streak
              </span>
            </div>
          )}
        </div>
      )}

      {/* Kad mula belajar */}
      <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/20 p-4">
        <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] shadow-[0_0_24px_rgba(99,102,241,0.5)]">
          <Zap className="h-4 w-4 text-white" />
        </div>
        <p className="text-sm font-bold text-white">Ready to study?</p>
        <p className="mt-1 text-xs leading-5 text-white/50">Keep your daily study streak going.</p>
        <Link
          to="/notes"
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2 text-xs font-bold text-[#050816] transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Start Studying
        </Link>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { user, loading, explorerProfileLoading, onboardingRequired } = useAuth();
  const onboardingExempt = isOnboardingExemptRoute(pathname);
  const redirectToOnboarding =
    !loading &&
    !explorerProfileLoading &&
    Boolean(user) &&
    shouldRedirectToOnboarding(pathname, onboardingRequired);
  const redirectToLogin = shouldRedirectToLogin(pathname, loading, Boolean(user));

  useEffect(() => {
    if (redirectToOnboarding) {
      void navigate({ to: "/onboarding", replace: true });
    }
  }, [navigate, redirectToOnboarding]);

  useEffect(() => {
    if (redirectToLogin) {
      void navigate({ to: "/login", replace: true });
    }
  }, [navigate, redirectToLogin]);

  // Login, password recovery, and OAuth callback pages deliberately bypass
  // the authenticated shell and all of its progress/profile consumers.
  if (isPublicAuthRoute(pathname)) return <>{children}</>;

  if (redirectToLogin) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#050816] text-white">
        <div className="text-center" role="status">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/25 border-t-white" />
          <p className="mt-4 text-sm text-white/55">Taking you to sign in…</p>
        </div>
      </div>
    );
  }

  if (user && !onboardingExempt && (explorerProfileLoading || redirectToOnboarding)) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#050816] text-white">
        <div className="text-center" role="status">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/25 border-t-white" />
          <p className="mt-4 text-sm text-white/55">Loading your Explorer Profile…</p>
        </div>
      </div>
    );
  }

  if (
    pathname.startsWith("/academy/") ||
    pathname.startsWith("/admin") ||
    pathname === "/onboarding" ||
    pathname === "/explore-academy" ||
    pathname === "/"
  ) {
    return <>{children}</>;
  }

  const shell = <AppShellLayout pathname={pathname}>{children}</AppShellLayout>;
  if (!isStudentMusicRoute(pathname)) return shell;

  return (
    <BackgroundMusicProvider>
      {shell}
      <BackgroundMusicControl />
    </BackgroundMusicProvider>
  );
}

function AppShellLayout({ children, pathname }: { children: ReactNode; pathname: string }) {
  const { progress, lastRankUp } = useProgress();
  const { user, explorerProfile } = useAuth();
  const [moreOpen, setMoreOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const moreActive = secondaryMobileNavItems.some((item) => isRouteActive(pathname, item.to));

  useEffect(() => {
    setMoreOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!moreOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMoreOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [moreOpen]);

  return (
    <div className="relative min-h-svh overflow-hidden bg-[#050816] text-white">
      {/* Space background */}
      <div className="pointer-events-none fixed inset-0 -z-20 bg-[#050816]" />
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(99,102,241,0.24),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(139,92,246,0.20),transparent_30%),radial-gradient(circle_at_72%_70%,rgba(16,185,129,0.10),transparent_28%)]" />
      <div className="pointer-events-none fixed inset-0 -z-10 opacity-[0.35] [background-image:radial-gradient(circle,rgba(255,255,255,0.72)_1px,transparent_1px)] [background-size:42px_42px]" />

      {/* â”€â”€ Desktop Sidebar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <aside className="fixed left-0 top-0 z-[60] hidden h-svh w-[236px] flex-col border-r border-white/[0.07] bg-[#080E1C]/90 px-4 py-6 shadow-[2px_0_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl lg:flex">
        {/* Brand */}
        <Link
          to="/"
          aria-label="AcadeMY home"
          className="rounded-2xl p-1 transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6]"
        >
          <AcademyLogo className="h-auto w-[168px]" />
        </Link>

        {/* Nav */}
        <nav className="mt-8 space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isRouteActive(pathname, item.to);
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${
                  active
                    ? "bg-white/[0.09] text-white"
                    : "text-white/50 hover:bg-white/[0.06] hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {/* Active left accent bar */}
                {active && (
                  <span
                    className="absolute left-0 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-full"
                    style={{ background: item.accent, boxShadow: `0 0 12px ${item.accent}` }}
                  />
                )}
                <span
                  className="flex h-5 w-5 shrink-0 items-center justify-center"
                  aria-hidden="true"
                >
                  <Icon
                    className={`h-[17px] w-[17px] transition-colors ${active ? "text-white" : "text-white/40 group-hover:text-white/70"}`}
                    style={active ? { color: item.accent } : undefined}
                  />
                </span>
                <span className="truncate">{item.label}</span>
                {active && (
                  <span
                    className="pointer-events-none absolute inset-0 rounded-xl opacity-25"
                    style={{
                      background: `radial-gradient(ellipse at left center, ${item.accent}60, transparent 70%)`,
                    }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <SidebarBottom />
      </aside>

      {/* â”€â”€ Main content area â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <div className="relative z-10 overflow-x-clip lg:ml-[236px]">
        {/* Top header */}
        <header className="sticky top-0 z-40 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] bg-[#050816]/86 px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.22)] backdrop-blur-2xl sm:px-6 lg:flex-nowrap lg:px-8">
          <div className="flex items-center gap-2">
            {/* Mobile brand */}
            <Link
              to="/"
              aria-label="AcadeMY home"
              className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] lg:hidden"
            >
              <AcademyLogo variant="icon" className="h-8 w-8" />
            </Link>
          </div>

          <div className="order-3 w-full lg:order-none lg:min-w-[320px] lg:max-w-2xl lg:flex-1">
            <GalaxySearch />
          </div>

          <div className="flex items-center gap-2">
            <HeaderCompanion />
            {/* Live streak */}
            <HeaderStreak />
            {/* Upgrade button */}
            <Link
              to="/upgrade"
              className="hidden items-center gap-1.5 rounded-xl border border-[#F59E0B]/40 bg-[#F59E0B]/10 px-2.5 py-1.5 text-xs font-bold text-[#FBBF24] transition-colors hover:bg-[#F59E0B]/20 sm:flex"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Upgrade
            </Link>
            <HeaderAuthAction />
            {/* Desktop Explorer Profile entry point */}
            {user ? (
              <button
                type="button"
                onClick={() => setProfileOpen(true)}
                aria-label="Open Explorer Profile"
                className="hidden min-h-11 items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.06] px-2.5 text-left transition-colors hover:bg-white/[0.10] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300 lg:flex"
              >
                <ProfileAvatar
                  source={progress.profileAvatarSource}
                  googleUrl={user.avatarUrl}
                  avatarId={progress.profileAvatarId}
                  name={explorerProfile?.displayName ?? user.name ?? "Student"}
                  size={28}
                  className="rounded-lg"
                />
                <span className="max-w-24 truncate text-xs font-bold text-white/80">
                  {explorerProfile?.displayName ?? user.name ?? "Profile"}
                </span>
              </button>
            ) : (
              <Link
                to="/dashboard"
                aria-label="Open dashboard"
                className="hidden min-h-11 items-center rounded-xl border border-white/[0.08] bg-white/[0.06] px-2 transition-colors hover:bg-white/[0.10] lg:flex"
              >
                <HeaderRankBadge />
              </Link>
            )}
          </div>
        </header>

        <main className="app-main page-content overflow-x-clip">
          {(() => {
            const studyPaths = ["/notes", "/quizzes", "/flashcards", "/mindmaps"];
            const onStudy = studyPaths.some((p) => pathname.startsWith(p));
            return onStudy ? (
              <div className="mx-auto w-full max-w-5xl px-4 pt-4 sm:px-6">
                <NextMissionCard compact />
              </div>
            ) : null;
          })()}
          {children}
        </main>
      </div>

      <SiteFooter />

      <AICompanionButton />
      <CompanionTip />
      {lastRankUp ? <RankUpModal /> : <CompanionEvolutionModal />}
      <MissionRewardCelebration />

      {moreOpen && (
        <div
          className="fixed inset-0 z-[85] bg-[#02040D]/70 backdrop-blur-sm lg:hidden"
          onClick={() => setMoreOpen(false)}
        >
          <section
            id="mobile-more-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-more-title"
            className="mobile-more-sheet absolute inset-x-0 mx-auto max-w-xl overflow-y-auto rounded-t-[2rem] border border-b-0 border-[#8B5CF6]/30 bg-[#080E1C]/98 px-4 pb-5 pt-3 shadow-[0_-20px_70px_rgba(76,29,149,0.45)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto h-1 w-10 rounded-full bg-white/20" aria-hidden="true" />
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#C4B5FD]/70">
                  Explore AcadeMY
                </p>
                <h2
                  id="mobile-more-title"
                  className="mt-0.5 font-display text-xl font-bold text-white"
                >
                  More
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setMoreOpen(false)}
                aria-label="Close More menu"
                className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] text-white/60 transition-colors hover:bg-white/[0.09] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {user && (
              <button
                type="button"
                onClick={() => {
                  setMoreOpen(false);
                  setProfileOpen(true);
                }}
                className="mt-4 flex min-h-16 w-full items-center gap-3 rounded-2xl border border-violet-300/20 bg-violet-500/10 px-3 py-3 text-left text-white transition-colors hover:bg-violet-500/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-300"
              >
                <span
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-400/15 text-violet-200"
                  aria-hidden="true"
                >
                  <UserRound className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <strong className="block text-sm">Profile</strong>
                  <span className="mt-0.5 block truncate text-xs text-white/45">
                    {explorerProfile?.displayName ?? user.name ?? user.email}
                  </span>
                </span>
              </button>
            )}

            <nav aria-label="More destinations" className="mt-4 grid grid-cols-2 gap-3">
              {secondaryMobileNavItems.map((item) => {
                const Icon = item.icon;
                const active = isRouteActive(pathname, item.to);
                return (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMoreOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={`group flex min-h-16 min-w-0 items-center gap-3 rounded-2xl border px-3 py-3 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A78BFA] ${
                      active
                        ? "border-[#A78BFA]/55 bg-[#7C3AED]/20 text-white"
                        : "border-white/[0.08] bg-white/[0.04] text-white/65 hover:border-white/15 hover:bg-white/[0.07] hover:text-white"
                    }`}
                  >
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                      style={{ background: item.accentBg, color: item.accent }}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0 text-sm font-bold leading-tight">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </section>
        </div>
      )}

      {user && profileOpen && (
        <Suspense fallback={null}>
          <ProfileSummaryDialog
            open
            user={user}
            profile={explorerProfile}
            avatarSource={progress.profileAvatarSource}
            avatarId={progress.profileAvatarId}
            onClose={() => setProfileOpen(false)}
          />
        </Suspense>
      )}

      {/* â”€â”€ Mobile Bottom Nav â€” Space Theme â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      <nav
        className="space-nav-shell mobile-nav-shell fixed inset-x-0 z-[80] px-1.5 lg:hidden"
        aria-label="Primary navigation"
      >
        <div className="mx-auto flex h-full w-full items-center justify-between gap-0.5">
          {primaryMobileNavItems.map((item) => {
            const Icon = item.icon;
            const active = isRouteActive(pathname, item.to);
            return (
              <Link
                key={item.label}
                to={item.to}
                className={`space-nav-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${active ? "space-nav-item-active" : ""}`}
                style={
                  active
                    ? ({
                        "--nav-accent-bg": `linear-gradient(135deg, ${item.accentBg}, ${item.accentBg.replace("0.22", "0.16")})`,
                        "--nav-accent-glow": item.accentGlow,
                        "--nav-accent-line": item.line,
                      } as React.CSSProperties)
                    : undefined
                }
                aria-current={active ? "page" : undefined}
              >
                <Icon
                  className="relative h-5 w-5 transition-transform"
                  style={
                    active
                      ? { color: item.accent, filter: `drop-shadow(0 0 6px ${item.accentGlow})` }
                      : undefined
                  }
                />
                <span
                  className="space-nav-label"
                  style={active ? { color: item.accent } : undefined}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => setMoreOpen(true)}
            aria-expanded={moreOpen}
            aria-controls="mobile-more-sheet"
            className={`space-nav-item focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5CF6] ${moreActive ? "space-nav-item-active" : ""}`}
            style={
              moreActive
                ? ({
                    "--nav-accent-bg": `linear-gradient(135deg, ${moreNavAppearance.accentBg}, rgba(129,140,248,0.16))`,
                    "--nav-accent-glow": moreNavAppearance.accentGlow,
                    "--nav-accent-line": moreNavAppearance.line,
                  } as React.CSSProperties)
                : undefined
            }
          >
            <MoreHorizontal
              className="relative h-5 w-5 transition-transform"
              style={
                moreActive
                  ? {
                      color: moreNavAppearance.accent,
                      filter: `drop-shadow(0 0 6px ${moreNavAppearance.accentGlow})`,
                    }
                  : undefined
              }
              aria-hidden="true"
            />
            <span
              className="space-nav-label"
              style={moreActive ? { color: moreNavAppearance.accent } : undefined}
            >
              More
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
}

function HeaderStreak() {
  const { progress } = useProgress();
  return (
    <StreakInfoPopover
      streak={progress.streak}
      className="hidden min-h-11 items-center gap-1.5 rounded-xl border border-orange-300/15 bg-orange-400/[0.08] px-3 text-xs font-bold text-orange-100 shadow-[0_0_18px_rgba(251,146,60,0.10)] transition-colors hover:bg-orange-400/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-300 sm:flex"
    />
  );
}

function HeaderAuthAction() {
  const { user, isConfigured, loading } = useAuth();
  const { open } = useSignInModal();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hideSignIn = pathname === "/" || pathname.startsWith("/dashboard");
  if (!isConfigured || loading || user || hideSignIn) return null;
  return (
    <button
      type="button"
      onClick={() => open()}
      className="flex items-center gap-1.5 rounded-xl border border-[#8B5CF6]/40 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] px-3 py-1.5 text-xs font-bold text-white shadow-[0_0_18px_rgba(139,92,246,0.45)] transition-transform hover:scale-105"
    >
      <LogIn className="h-3.5 w-3.5" />
      Sign In
    </button>
  );
}

function HeaderCompanion() {
  const { progress } = useProgress();
  const companion = progress.companion ?? { id: "nova" as const, level: 1 };
  const companionLevel = getCompanionLevelProgress(progress.xp).currentLevel;
  const companionName = getCompanionDisplayName(companion);
  return (
    <div className="flex items-center">
      <Link
        to="/companion"
        className="flex min-h-11 items-center gap-1.5 rounded-l-xl border border-r-0 border-[#F0ABFC]/25 bg-[#F0ABFC]/10 px-2.5 transition-colors hover:bg-[#F0ABFC]/20"
        aria-label={`Open ${companionName}, Companion Level ${companionLevel}`}
      >
        <Sparkles className="h-4 w-4 text-[#F0ABFC]" />
        <span className="text-xs font-bold tabular-nums text-white">
          <span className="hidden sm:inline">Companion </span>Lv {companionLevel}
        </span>
      </Link>
      <CompanionInfoPopover
        xp={progress.xp}
        companionName={companionName}
        className="w-11 justify-center gap-0 rounded-l-none border border-[#F0ABFC]/25 bg-[#F0ABFC]/10 px-0 text-[0px] [&_svg]:h-4 [&_svg]:w-4"
      />
    </div>
  );
}

function HeaderRankBadge() {
  const { progress } = useProgress();
  const rank = getRank(progress.xp);
  return (
    <RankBadge
      rank={rank}
      size={28}
      className="header-rank-icon-wrapper"
      imageClassName="header-rank-icon-image"
    />
  );
}
