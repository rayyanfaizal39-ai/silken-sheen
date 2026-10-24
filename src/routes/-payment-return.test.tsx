// @vitest-environment jsdom
import { act, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const PAYMENT = "8cd3745b-0000-4000-8000-000000000001";
const page = vi.hoisted(() => ({
  search: { order_id: "" },
  user: null as { id: string; email: string } | null,
  lookup: vi.fn(),
}));
// Partial mock: the main config code-splits routes through lazyRouteComponent.
vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@tanstack/react-router")>()),
  createFileRoute: () => (options: Record<string, unknown>) => ({
    options,
    useSearch: () => page.search,
  }),
  Link: ({ children, to }: { children: ReactNode; to: string }) => <a href={to}>{children}</a>,
}));
vi.mock("@/context/auth-context", () => ({
  useAuth: () => ({ user: page.user, loading: false }),
}));
vi.mock("@/components/AcademyPage", () => ({
  AcademyPageShell: ({ children }: { children: ReactNode }) => <main>{children}</main>,
}));
vi.mock("@/lib/seo", () => ({ seoMeta: () => ({}) }));
vi.mock("./-upgrade.server", () => ({ getPaymentReturnStatus: page.lookup }));
import { Route } from "./payment-return";

const PaymentReturnPage = (
  Route as unknown as {
    options: { component: (() => ReactNode) & { preload?: () => Promise<unknown> } };
  }
).options.component;
let root: Root;
let container: HTMLDivElement;
async function render() {
  if (PaymentReturnPage.preload) await PaymentReturnPage.preload();
  await act(async () => {
    root.render(<PaymentReturnPage />);
  });
}
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
  page.search = { order_id: PAYMENT };
  page.user = { id: "owner", email: "learner@example.test" };
  container = document.createElement("div");
  document.body.append(container);
  root = createRoot(container);
});
afterEach(async () => {
  await act(async () => root.unmount());
  container.remove();
  vi.unstubAllGlobals();
});

describe.each([
  ["production", "https://www.myacademy.my"],
  ["preview", "https://fix-referral-account-confirm.academymy.pages.dev"],
])("/payment-return on %s", (_label, origin) => {
  beforeEach(() => {
    window.history.replaceState(
      {},
      "",
      `/payment-return?status_id=1&billcode=abc&order_id=${PAYMENT}`,
    );
    void origin; // The page is origin-agnostic; the Edge allowlist picks the origin.
  });
  it("shows the owner's verified successful payment", async () => {
    page.lookup.mockResolvedValue({
      state: "found",
      paymentId: PAYMENT,
      plan: "premium",
      amount: 59,
      currency: "MYR",
      status: "successful",
      invoiceNumber: "ACAD-20261017-000123",
    });
    await render();
    expect(page.lookup).toHaveBeenCalledExactlyOnceWith({ data: { paymentId: PAYMENT } });
    expect(container.textContent).toContain("Payment successful");
    expect(container.textContent).toContain("ACAD-20261017-000123");
  });
  it("explains a different signed-in account instead of claiming the reference is missing", async () => {
    page.lookup.mockResolvedValue({ state: "not_found" });
    await render();
    expect(container.textContent).toContain("This payment isn’t in this account");
    expect(container.textContent).toContain("learner@example.test");
    expect(container.textContent).not.toContain("Payment reference not found");
    expect(container.textContent).not.toMatch(/RM|59|premium|ACAD-/);
  });
  it("asks to sign in when only the browser still shows a session", async () => {
    page.lookup.mockResolvedValue({ state: "signed_out" });
    await render();
    expect(container.textContent).toContain("Sign in to check your payment");
  });
  it("reports a temporary failure without calling it a missing payment", async () => {
    page.lookup.mockRejectedValue(new Error("network"));
    await render();
    expect(container.textContent).toContain("We couldn’t check your payment just now");
    expect(container.textContent).not.toContain("not found");
  });
});

describe("/payment-return reference handling", () => {
  it("never queries without a valid payment reference", async () => {
    page.search = { order_id: "not-a-uuid" };
    await render();
    expect(page.lookup).not.toHaveBeenCalled();
    expect(container.textContent).toContain("Payment reference not found");
  });
  it("never queries when nobody is signed in", async () => {
    page.user = null;
    await render();
    expect(page.lookup).not.toHaveBeenCalled();
    expect(container.textContent).toContain("Sign in to check your payment");
  });
});
