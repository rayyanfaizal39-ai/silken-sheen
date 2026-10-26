// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { NovaCard } from "@/features/nova-cards/model";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    className,
  }: {
    to: string;
    children: React.ReactNode;
    className?: string;
    search?: unknown;
  }) => (
    <a href={to} className={className}>
      {children}
    </a>
  ),
}));

vi.mock("@/context/auth-context", () => ({
  useAuth: vi.fn(),
}));

vi.mock("@/features/nova-cards/local-session", () => ({
  loadNovaDashboardStatus: vi.fn(),
  loadOwnerNova: vi.fn(),
}));

import { useAuth } from "@/context/auth-context";
import { loadNovaDashboardStatus, loadOwnerNova } from "@/features/nova-cards/local-session";
import { CosmicPortalWidget } from "./CosmicPortalWidget";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;

const roots: ReturnType<typeof createRoot>[] = [];
afterEach(async () => {
  for (const root of roots) await act(async () => root.unmount());
  roots.length = 0;
  document.body.innerHTML = "";
  vi.mocked(loadNovaDashboardStatus).mockReset();
  vi.mocked(loadOwnerNova).mockReset();
  vi.mocked(useAuth).mockReset();
});

async function mount() {
  const host = document.createElement("div");
  document.body.append(host);
  const root = createRoot(host);
  roots.push(root);
  await act(async () => root.render(<CosmicPortalWidget />));
  for (let i = 0; i < 30; i += 1) {
    if (host.querySelector("[data-state]")?.getAttribute("data-state") !== "loading") break;
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });
  }
  return host;
}

const ownerPortrait = {
  publicId: "00000000-0000-4000-8000-00000000d101",
  serial: "R-4H7K2M9P",
  username: "Aisha",
  traits: null,
  companion: {
    archetypeId: "fox",
    name: "Lumi",
    species: "Magical Fox",
    element: "Starlight",
    personality: "Gentle",
    tagline: "A quiet light",
    description: "A starlight fox.",
    traits: ["curious"],
    abilities: ["glow"],
  },
  variant: "b",
  rarity: "Rare",
  stage: 1,
  sharing: false,
  artworkUrl: "https://example.test/owner-portrait.png",
  artworkPath: "owner/path.png",
} as NovaCard;

describe("CosmicPortalWidget", () => {
  it("shows the discovery portal for guests without fictional pet art", async () => {
    vi.mocked(useAuth).mockReturnValue({ user: null, devAuthBypass: false } as never);
    const host = await mount();
    const widget = host.querySelector("[data-state='new']")!;
    expect(widget.getAttribute("data-mark")).toBe("portal");
    expect(host.textContent).toContain("Discover My");
    expect(host.textContent).toContain("Companion");
    expect(host.textContent).toContain("Start My Journey");
    const imgs = host.querySelectorAll("img");
    expect(imgs).toHaveLength(1);
    expect(imgs[0].getAttribute("src")).toContain("academy-cosmic-portal-v1");
    expect(imgs[0].getAttribute("alt")).toBe("");
    expect(host.querySelector(".cosmic-portal-widget__art svg")).toBeNull();
  });

  it("keeps the portal art and continue CTA for a saved unfinished journey", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "student-1" },
      devAuthBypass: false,
    } as never);
    vi.mocked(loadNovaDashboardStatus).mockResolvedValue({
      active: true,
      selected: false,
      ready: false,
      pending: false,
      failed: false,
      unfinished: true,
    });
    const host = await mount();
    expect(host.querySelector("[data-state='unfinished']")?.getAttribute("data-mark")).toBe(
      "portal",
    );
    expect(host.querySelector("img")?.getAttribute("src")).toContain("academy-cosmic-portal-v1");
    expect(host.textContent).toContain("Continue My Journey");
  });

  it("shows egg waiting art while a portrait is being crafted", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "student-1" },
      devAuthBypass: false,
    } as never);
    vi.mocked(loadNovaDashboardStatus).mockResolvedValue({
      active: true,
      selected: false,
      ready: false,
      pending: true,
      failed: false,
      unfinished: false,
    });
    vi.mocked(loadOwnerNova).mockResolvedValue([
      {
        ...ownerPortrait,
        artworkUrl: undefined,
        artworkPath: undefined,
        crafting: true,
        artOptions: [],
      },
      { active: true } as never,
    ]);
    const host = await mount();
    expect(host.querySelector("[data-state='waiting']")?.getAttribute("data-mark")).toBe("egg");
    const imgs = host.querySelectorAll("img");
    expect(imgs).toHaveLength(1);
    expect(imgs[0].getAttribute("src")).toContain("academy-cosmic-egg-v2");
    expect(host.querySelector(".cosmic-portal-widget__art svg")).toBeNull();
    expect(host.textContent).toContain("Your Companion Is Being Crafted");
    expect(host.textContent).toContain("Your unique portrait is on its way.");
    expect(host.textContent).toContain("Check My Journey");
  });

  it("renders the owner's real signed portrait after permanent selection", async () => {
    vi.mocked(useAuth).mockReturnValue({
      user: { id: "student-1" },
      devAuthBypass: false,
    } as never);
    vi.mocked(loadNovaDashboardStatus).mockResolvedValue({
      active: true,
      selected: true,
      ready: false,
      pending: false,
      failed: false,
      unfinished: false,
    });
    vi.mocked(loadOwnerNova).mockResolvedValue([ownerPortrait, { active: true } as never]);
    const host = await mount();
    expect(host.querySelector("[data-state='selected']")).toBeTruthy();
    const imgs = host.querySelectorAll("img");
    expect(imgs).toHaveLength(1);
    expect(imgs[0].getAttribute("src")).toBe("https://example.test/owner-portrait.png");
    expect(host.innerHTML).not.toContain("academy-cosmic-");
    expect(host.textContent).toContain("Lumi");
    expect(host.textContent).toContain("Rare");
    expect(host.textContent).toContain("Stage 1 · Origin");
    expect(host.textContent).toContain("Magical Fox");
    expect(host.textContent).toContain("View My Card");
    expect(host.textContent).not.toContain("Earn Lifetime XP");
    expect(host.querySelector("a[href='/nova']")?.textContent).toContain("View My Card");
  });
});
