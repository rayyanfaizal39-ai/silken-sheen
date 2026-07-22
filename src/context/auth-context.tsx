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
  isConfigured: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string) => Promise<{ needsConfirmation: boolean }>;
  requestPasswordReset: (email: string) => Promise<void>;
  signOut: () => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const AuthContext = createContext<AuthContextValue>({
  user: null,
  session: null,
  loading: true,
  isConfigured: false,
  signInWithGoogle: async () => {},
  signInWithEmail: async () => {},
  signUpWithEmail: async () => ({ needsConfirmation: false }),
  requestPasswordReset: async () => {},
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

  const signInWithGoogle = useCallback(async () => {
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

    const redirectTo = `${origin}/auth/callback`;
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
    if (!isSupabaseConfigured) throw new Error("Supabase is not configured");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signUpWithEmail = useCallback(async (email: string, password: string) => {
    if (!isSupabaseConfigured) throw new Error("Supabase is not configured");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) throw error;
    return { needsConfirmation: !data.session };
  }, []);

  const requestPasswordReset = useCallback(async (email: string) => {
    if (!isSupabaseConfigured) throw new Error("Supabase is not configured");
    const redirectTo = `${window.location.origin}/auth/callback?next=${encodeURIComponent("/auth/reset-password")}`;
    const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo });
    if (error) throw error;
  }, []);

  const signOut = useCallback(async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signOut();
  }, []);

  const value = useMemo(
    () => ({
      user,
      session,
      loading,
      isConfigured: isSupabaseConfigured,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      requestPasswordReset,
      signOut,
    }),
    [
      user,
      session,
      loading,
      signInWithGoogle,
      signInWithEmail,
      signUpWithEmail,
      requestPasswordReset,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth() {
  return useContext(AuthContext);
}
