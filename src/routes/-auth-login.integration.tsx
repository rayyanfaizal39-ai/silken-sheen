import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { ReactElement, ReactNode } from "react";

const state = vi.hoisted(() => ({
  search: {} as Record<string, unknown>,
  user: null as null | { id: string },
  replace: vi.fn(),
  navigate: vi.fn(),
  google: vi.fn(),
  email: vi.fn(),
}));
vi.mock("react", async (original) => ({
  ...(await original<typeof import("react")>()),
  useEffect: (effect: () => void) => effect(),
  useState: (initial: unknown) => [initial, vi.fn()],
}));
vi.mock("@tanstack/react-router", () => ({
  createFileRoute:
    () => (options: { validateSearch: (search: Record<string, unknown>) => unknown }) => ({
      options,
      useSearch: () => options.validateSearch(state.search),
    }),
  useNavigate: () => state.navigate,
  Link: "a",
}));
vi.mock("@/context/auth-context", () => ({
  useAuth: () => ({
    user: state.user,
    loading: false,
    isConfigured: true,
    signInWithGoogle: state.google,
    signInWithEmail: state.email,
    signOut: vi.fn(),
  }),
}));
vi.mock("@/lib/admin-access", () => ({
  getProfileForAdminCheck: async () => ({ role: "admin" }),
  hasAdministratorRole: () => true,
}));
import { Route as Login } from "./login";
import { Route as Admin } from "./admin_.login";

function render(route: typeof Login | typeof Admin) {
  return (route.options.component as () => ReactElement)();
}
function find(
  node: ReactNode,
  predicate: (element: ReactElement<Record<string, unknown>>) => boolean,
): ReactElement<Record<string, unknown>> | undefined {
  if (Array.isArray(node)) {
    for (const child of node) {
      const result = find(child, predicate);
      if (result) return result;
    }
    return;
  }
  if (!node || typeof node !== "object" || !("props" in node)) return;
  const element = node as ReactElement<Record<string, unknown>>;
  return predicate(element) ? element : find(element.props.children as ReactNode, predicate);
}
beforeEach(() => {
  state.user = null;
  state.search = {};
  vi.stubGlobal("window", { location: { replace: state.replace } });
});
afterEach(() => {
  vi.clearAllMocks();
  vi.unstubAllGlobals();
});

describe("login route next wiring", () => {
  it.each([
    undefined,
    "https://senior.myacademy.my/home",
    "https://evil.example",
    "javascript:alert(1)",
    "//evil.example",
  ])("passes safe next from Main login to Google: %s", async (next) => {
    state.search = { next };
    const page = render(Login);
    const button = find(page, (e) => e.type === "button" && typeof e.props.onClick === "function")!;
    await (button.props.onClick as () => Promise<void>)();
    expect(state.google).toHaveBeenCalledWith(
      next === undefined ? undefined : next === "https://senior.myacademy.my/home" ? next : "/home",
    );
  });
  it("an already signed-in Main user returns directly to Senior", () => {
    state.search = { next: "https://senior.myacademy.my/home" };
    state.user = { id: "test" };
    render(Login);
    expect(state.replace).toHaveBeenCalledWith("https://senior.myacademy.my/home");
  });
  it.each([undefined, "https://senior.myacademy.my/home", "//evil.example"])(
    "email/password returns safely, preserving the existing admin fallback: %s",
    async (next) => {
      state.search = { next };
      state.email.mockImplementation(async () => {
        state.user = { id: "test" };
      });
      const form = find(render(Admin), (e) => e.type === "form")!;
      await (form.props.onSubmit as (event: { preventDefault: () => void }) => Promise<void>)({
        preventDefault: vi.fn(),
      });
      expect(state.email).toHaveBeenCalled();
      render(Admin);
      await Promise.resolve();
      if (next === undefined) {
        expect(state.navigate).toHaveBeenCalledWith({ to: "/admin", replace: true });
        expect(state.replace).not.toHaveBeenCalled();
      } else expect(state.replace).toHaveBeenCalledWith(next === "//evil.example" ? "/home" : next);
    },
  );
});
