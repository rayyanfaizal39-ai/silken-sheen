import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import type { User, Session } from "@supabase/supabase-js";
import { supabase, isSupabaseConfigured } from "@/lib/supabase";
import { beginLoadingTask } from "@/lib/loading-store";
import {
  getExplorerProfile,
  needsExplorerOnboarding,
  saveCompletedExplorerProfile,
  type ExplorerProfile,
  type ExplorerProfileInput,
} from "@/lib/explorer-profile";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface AuthUser {
  id: string;
  email: string | undefined;
  name: string | undefined;
  avatarUrl: string | undefined;
  createdAt: string | undefined;
}

interface AuthContextValue {
  user: AuthUser | null;
  session: Session | null;
  loading: boolean;
  explorerProfile: ExplorerProfile | null;
  explorerProfileLoading: boolean;
  explorerProfileError: string | null;
  onboardingRequired: boolean;
  isConfigured: boolean;
  signInWithGoogle: (returnTo?: "/admin/login" | "/upgrade") => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<{ needsConfirmation: boolean }>;
  requestPasswordReset: (email: string) => Promise<void>;
  refreshExplorerProfile: () => Promise<void>;
  completeExplorerProfile: (input: ExplorerProfileInput) => Promise<void>;
  signOut: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: true,
  explorerProfile: null,
  explorerProfileLoading: false,
  explorerProfileError: null,
  onboardingRequired: false,
  isConfigured: false,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => ({ needsConfirmation: false }),
  requestPasswordReset: async () => {},
  refreshExplorerProfile: async () => {},
  completeExplorerProfile: async () => {},
  signOut: async () => {},
});

// ─── Helper ───────────────────────────────────────────────────────────────────

function supabaseUserToAuthUser(u: User): AuthUser {
  return {
    id: u.id,
    email: u.email,
    name: u.user_metadata?.full_name ?? u.user_metadata?.name ?? u.email,
    avatarUrl: u.user_metadata?.avatar_url ?? u.user_metadata?.picture,
    createdAt: u.created_at,
  };
}

// ─── Provider ─────────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [explorerProfile, setExplorerProfile] = useState<ExplorerProfile | null>(null);
  const [explorerProfileLoading, setExplorerProfileLoading] = useState(false);
  const [explorerProfileUserId, setExplorerProfileUserId] = useState<string | null>(null);
  const [explorerProfileError, setExplorerProfileError] = useState<string | null>(null);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }

    // Retrieve the initial session (handles post-OAuth redirects too)
    console.info("[Auth] Initial session check started", { path: window.location.pathname });
    void supabase.auth
      .getSession()
      .then(({ data: { session: s }, error }) => {
        if (error) console.error("[Auth] Initial session check failed", error);
        else console.info("[Auth] Initial session check completed", { hasSession: !!s });
        setSession(s);
        setUser(s?.user ? supabaseUserToAuthUser(s.user) : null);
      })
      .catch((error: unknown) => {
        console.error("[Auth] Initial session check threw", error);
      })
      .finally(() => setLoading(false));

    // Subscribe to auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, s) => {
      console.info("[Auth] State changed", { event, hasSession: !!s });
      // Supabase re-fires SIGNED_IN/INITIAL_SESSION on tab focus even when
      // the session hasn't actually changed — skip the state update (and the
      // re-render it triggers in every useAuth() consumer) when it's a no-op.
      setSession((prev) => (prev?.access_token === s?.access_token ? prev : s));
      setUser((prev) => {
        const nextId = s?.user?.id ?? null;
        if (prev?.id === nextId) return prev;
        return s?.user ? supabaseUserToAuthUser(s.user) : null;
      });
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    let active = true;

    if (!isSupabaseConfigured || !user) {
      setExplorerProfile(null);
      setExplorerProfileUserId(null);
      setExplorerProfileError(null);
      setExplorerProfileLoading(false);
      return;
    }

    setExplorerProfileLoading(true);
    setExplorerProfileError(null);
    void getExplorerProfile(user.id)
      .then((profile) => {
        if (!active) return;
        setExplorerProfile(profile);
        setExplorerProfileUserId(user.id);
      })
      .catch((error: unknown) => {
        if (!active) return;
        console.error("[Auth] Explorer Profile load failed", error);
        setExplorerProfile(null);
        setExplorerProfileUserId(user.id);
        setExplorerProfileError("We couldn't load your Explorer Profile.");
      })
      .finally(() => {
        if (active) setExplorerProfileLoading(false);
      });

    return () => {
      active = false;
    };
  }, [user]);

  const signInWithGoogle = useCallback(async (returnTo?: "/admin/login" | "/upgrade") => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase is not configured");
    }

    // Detect iframe (Lovable preview). Google blocks OAuth inside iframes,
    // so we need to break out to the top window or open a new tab.
    let inIframe = false;
    try {
      inIframe = window.self !== window.top;
    } catch {
      inIframe = true; // cross-origin access throws → we're in an iframe
    }

    const origin =
      inIframe && window.top
        ? // Best-effort: use the top window's origin when accessible
          (() => {
            try {
              return window.top!.location.origin;
            } catch {
              return window.location.origin;
            }
          })()
        : window.location.origin;

    const redirectTo = returnTo
      ? `${origin}/auth/callback?next=${encodeURIComponent(returnTo)}`
      : `${origin}/auth/callback`;
    console.info("[Auth] Google OAuth request started", { redirectTo, inIframe });

    if (inIframe) {
      // Get the URL from Supabase without auto-redirecting, then navigate the
      // top frame (or open a new tab if we can't reach top).
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo,
          queryParams: { prompt: "select_account" },
          skipBrowserRedirect: true,
        },
      });
      if (error) throw error;
      const url = data?.url;
      if (!url) throw new Error("Couldn't start Google sign-in.");
      try {
        if (window.top) {
          window.top.location.href = url;
          return;
        }
      } catch {
        /* fall through to popup */
      }
      window.open(url, "_blank", "noopener");
      return;
    }

    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo,
        queryParams: { prompt: "select_account" },
      },
    });

    if (error) throw error;
  }, []);

  const signInWithEmail = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase is not configured");
    }

    const task = beginLoadingTask({
      message: "Signing you in…",
      timeoutMs: 15_000,
    });

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw error;
      }
    } finally {
      task.finish();
    }
  }, []);

  const signUpWithEmail = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) {
      throw new Error("Supabase is not configured");
    }

    const task = beginLoadingTask({
      message: "Creating your AcadeMY account…",
      timeoutMs: 15_000,
    });

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        throw error;
      }

      return {
        needsConfirmation: !data.session,
      };
    } finally {
      task.finish();
    }
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    if (!isSupabaseConfigured) throw new Error("Supabase is not configured");
    const redirectTo = `${window.location.origin}/auth/reset-password`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw error;
  }, []);

  const refreshExplorerProfile = useCallback(async () => {
    if (!user) return;
    setExplorerProfileLoading(true);
    setExplorerProfileError(null);
    try {
      const profile = await getExplorerProfile(user.id);
      setExplorerProfile(profile);
      setExplorerProfileUserId(user.id);
    } catch (error) {
      console.error("[Auth] Explorer Profile refresh failed", error);
      setExplorerProfileError("We couldn't load your Explorer Profile.");
      throw error;
    } finally {
      setExplorerProfileLoading(false);
    }
  }, [user]);

  const completeExplorerProfile = useCallback(
    async (input: ExplorerProfileInput) => {
      if (!user) throw new Error("Sign in before completing your Explorer Profile.");
      const profile = await saveCompletedExplorerProfile(user.id, input);
      setExplorerProfile(profile);
      setExplorerProfileUserId(user.id);
      setExplorerProfileError(null);
      setUser((current) =>
        current && profile.displayName ? { ...current, name: profile.displayName } : current,
      );
    },
    [user],
  );

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    const task = beginLoadingTask({ message: "Securing your session…", timeoutMs: 15_000 });
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      task.finish();
    } catch (error) {
      task.fail(error);
      throw error;
    }
  }, []);

  const value = useMemo(() => {
    const profileLoading = Boolean(
      user && (explorerProfileLoading || explorerProfileUserId !== user.id),
    );
    return {
      user,
      session,
      loading,
      explorerProfile,
      explorerProfileLoading: profileLoading,
      explorerProfileError,
      onboardingRequired: !profileLoading && needsExplorerOnboarding(explorerProfile),
      isConfigured: isSupabaseConfigured,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      requestPasswordReset,
      refreshExplorerProfile,
      completeExplorerProfile,
      signOut,
    };
  }, [
    user,
    session,
    loading,
    explorerProfile,
    explorerProfileLoading,
    explorerProfileUserId,
    explorerProfileError,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    requestPasswordReset,
    refreshExplorerProfile,
    completeExplorerProfile,
    signOut,
  ]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  return useContext(AuthContext);
}
