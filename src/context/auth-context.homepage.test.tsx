/** @vitest-environment jsdom */

import type { ReactNode } from "react";
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ pathname: "/dashboard" }));
const authApi = vi.hoisted(() => ({
  getSession: vi.fn(),
  onAuthStateChange: vi.fn(),
  signOut: vi.fn(),
  signInWithOAuth: vi.fn(),
  signInWithPassword: vi.fn(),
  signUp: vi.fn(),
  resetPasswordForEmail: vi.fn(),
}));
const profileApi = vi.hoisted(() => ({
  getExplorerProfile: vi.fn(),
  saveCompletedExplorerProfile: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  useRouterState: ({
    select,
  }: {
    select: (value: { location: { pathname: string } }) => unknown;
  }) => select({ location: { pathname: state.pathname } }),
  Link: ({ children, to, ...props }: { children: ReactNode; to: string }) => (
    <a href={to} {...props}>
      {children}
    </a>
  ),
}));
vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: true,
  supabase: { auth: authApi },
}));
vi.mock("@/lib/dev-auth", () => ({ isDevAuthBypassEnabled: () => false }));
vi.mock("@/lib/guest-mode", () => ({ clearGuestMode: vi.fn() }));
vi.mock("@/lib/onboarding-routing", () => ({ shouldLoadExplorerProfile: () => false }));
vi.mock("@/lib/loading-store", () => ({
  beginLoadingTask: () => ({ finish: vi.fn(), fail: vi.fn() }),
}));
vi.mock("@/lib/explorer-profile", () => ({
  getExplorerProfile: profileApi.getExplorerProfile,
  saveCompletedExplorerProfile: profileApi.saveCompletedExplorerProfile,
  needsExplorerOnboarding: () => false,
}));

import {
  CinematicAuthCta,
  CinematicLoginAction,
} from "@/components/landing-cinematic/CinematicAuthActions";
import { AuthProvider, useAuth } from "./auth-context";

(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }).IS_REACT_ACT_ENVIRONMENT =
  true;

const existingSession = {
  access_token: "persisted-access-token",
  refresh_token: "persisted-refresh-token",
  expires_in: 3600,
  expires_at: 4_102_444_800,
  token_type: "bearer",
  user: {
    id: "existing-student-id",
    email: "student@example.com",
    created_at: "2024-01-01T00:00:00.000Z",
    user_metadata: { full_name: "Existing Student" },
    app_metadata: {},
    aud: "authenticated",
  },
};

function HomepageActions({ revision }: { revision: number }) {
  const { user, loading } = useAuth();
  return (
    <div data-revision={revision}>
      <span data-testid="identity">{loading ? "loading" : user?.id}</span>
      <CinematicAuthCta
        className="cta"
        authenticatedLabel="Continue Learning"
        authenticatedTo="/dashboard"
      >
        Start Your Journey
      </CinematicAuthCta>
      <CinematicLoginAction className="login" />
    </div>
  );
}

function App({ revision }: { revision: number }) {
  return (
    <AuthProvider>
      <HomepageActions revision={revision} />
    </AuthProvider>
  );
}

let host: HTMLDivElement;
let root: Root;
let capturedSignUp:
  | ((email: string, password: string) => Promise<{ needsConfirmation: boolean }>)
  | null = null;

function CaptureSignUp() {
  capturedSignUp = useAuth().signUpWithEmail;
  return null;
}

async function renderApp(revision: number) {
  await act(async () => {
    root.render(<App revision={revision} />);
    await Promise.resolve();
    await Promise.resolve();
  });
}

beforeEach(() => {
  state.pathname = "/dashboard";
  authApi.getSession.mockReset().mockResolvedValue({
    data: { session: existingSession },
    error: null,
  });
  authApi.onAuthStateChange.mockReset().mockReturnValue({
    data: { subscription: { unsubscribe: vi.fn() } },
  });
  authApi.signOut.mockReset();
  authApi.signUp.mockReset();
  profileApi.getExplorerProfile.mockReset();
  profileApi.saveCompletedExplorerProfile.mockReset();
  capturedSignUp = null;
  host = document.createElement("div");
  document.body.appendChild(host);
  root = createRoot(host);
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
});

describe("authenticated public homepage regression", () => {
  it("preserves the existing student session when returning to the public homepage", async () => {
    await renderApp(0);
    expect(host.querySelector('[data-testid="identity"]')?.textContent).toBe("existing-student-id");

    state.pathname = "/";
    await renderApp(1);

    expect(host.querySelector('[data-testid="identity"]')?.textContent).toBe("existing-student-id");
    expect(host.querySelector('a[href="/dashboard"]')?.textContent).toBe("Continue Learning");
    expect(host.querySelector('a[href="/register"]')).toBeNull();
    expect(host.querySelector('a[href="/login"]')).toBeNull();
    expect(authApi.signOut).not.toHaveBeenCalled();
    expect(profileApi.saveCompletedExplorerProfile).not.toHaveBeenCalled();
  });

  it("restores the same identity after a homepage refresh", async () => {
    state.pathname = "/";
    await renderApp(0);
    expect(host.querySelector('[data-testid="identity"]')?.textContent).toBe("existing-student-id");

    act(() => root.unmount());
    root = createRoot(host);
    await renderApp(1);

    expect(authApi.getSession).toHaveBeenCalledTimes(2);
    expect(host.querySelector('[data-testid="identity"]')?.textContent).toBe("existing-student-id");
    expect(host.querySelector('a[href="/dashboard"]')?.textContent).toBe("Continue Learning");
    expect(authApi.signOut).not.toHaveBeenCalled();
    expect(profileApi.saveCompletedExplorerProfile).not.toHaveBeenCalled();
  });

  it("normalizes Supabase's existing-email response without writing student data", async () => {
    authApi.getSession.mockResolvedValue({ data: { session: null }, error: null });
    authApi.signUp.mockResolvedValue({
      data: { session: null, user: null },
      error: { code: "email_exists", message: "Email address already exists in the system." },
    });

    await act(async () => {
      root.render(
        <AuthProvider>
          <CaptureSignUp />
        </AuthProvider>,
      );
      await Promise.resolve();
      await Promise.resolve();
    });

    let result: { needsConfirmation: boolean } | undefined;
    await act(async () => {
      result = await capturedSignUp?.("student@example.com", "secure-password");
    });

    expect(result).toEqual({ needsConfirmation: true });
    expect(authApi.signUp).toHaveBeenCalledTimes(1);
    expect(profileApi.saveCompletedExplorerProfile).not.toHaveBeenCalled();
  });
});
