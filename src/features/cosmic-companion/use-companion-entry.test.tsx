// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { novaDashboardStatus } from "@/features/nova-cards/dashboard-status";

vi.mock("@/features/nova-cards/local-session", () => ({
  loadNovaDashboardStatus: vi.fn(),
  loadOwnerNova: vi.fn(),
}));
vi.mock("@/context/auth-context", () => ({
  useAuth: () => ({ user: { id: "student-1" }, devAuthBypass: false }),
}));

import { loadNovaDashboardStatus, loadOwnerNova } from "@/features/nova-cards/local-session";
import { useCompanionEntry } from "./use-companion-entry";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;

const queued = novaDashboardStatus({
  studio: {
    active: true,
    enabled: false,
    selected: "a",
    origin: { status: "queued" },
    publicId: "9b4c6f6e-55e6-4b52-9d5f-3c1c0f6e2a11",
    draft: { answers: [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0] },
  },
  card: {
    crafting: true,
    artworkPath: null,
    artOptions: [{ option: 1 }, { option: 2 }],
  },
});

function Probe() {
  const view = useCompanionEntry();
  return (
    <div>
      <output
        data-ready={String(view.ready)}
        data-kind={view.entry?.kind ?? ""}
        data-to={view.entry && "to" in view.entry ? view.entry.to : ""}
        data-problem={view.problem ?? ""}
      />
      <button type="button" onClick={view.retry}>
        Try again
      </button>
    </div>
  );
}

const roots: ReturnType<typeof createRoot>[] = [];
afterEach(async () => {
  for (const root of roots) await act(async () => root.unmount());
  roots.length = 0;
  document.body.innerHTML = "";
  vi.mocked(loadNovaDashboardStatus).mockReset();
  vi.mocked(loadOwnerNova).mockReset();
});

async function mount() {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  roots.push(root);
  await act(async () => root.render(<Probe />));
  for (let i = 0; i < 20; i += 1) {
    if (host.querySelector("output")?.getAttribute("data-ready") === "true") break;
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
  return host;
}

const view = (host: HTMLElement) => host.querySelector("output")!;

describe("companion entry load", () => {
  it("opens the portrait screen when the card load would fail", async () => {
    vi.mocked(loadNovaDashboardStatus).mockResolvedValue(queued);
    vi.mocked(loadOwnerNova).mockRejectedValue(
      new Error("Companion artwork is temporarily unavailable."),
    );
    const host = await mount();
    expect(view(host).getAttribute("data-kind")).toBe("journey");
    expect(view(host).getAttribute("data-to")).toBe("/companion/portal");
    expect(view(host).getAttribute("data-problem")).toBe("");
    expect(loadOwnerNova).not.toHaveBeenCalled();
  });

  it("shows a retry instead of Upgrade when the studio status cannot be loaded", async () => {
    vi.mocked(loadNovaDashboardStatus).mockRejectedValueOnce(new Error("Nova status unavailable"));
    vi.mocked(loadOwnerNova).mockResolvedValue([null, { active: true, status: "active" }]);
    const host = await mount();
    expect(view(host).getAttribute("data-kind")).toBe("");
    expect(view(host).getAttribute("data-problem")).toBe("unavailable");
    expect(view(host).getAttribute("data-to")).not.toBe("/upgrade");

    vi.mocked(loadNovaDashboardStatus).mockResolvedValue(queued);
    await act(async () => {
      host.querySelector("button")!.click();
    });
    for (let i = 0; i < 20; i += 1) {
      if (view(host).getAttribute("data-kind") === "journey") break;
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 0));
      });
    }
    expect(view(host).getAttribute("data-kind")).toBe("journey");
    expect(view(host).getAttribute("data-problem")).toBe("");
    expect(loadOwnerNova).not.toHaveBeenCalled();
  });
});
