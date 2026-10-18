// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { describe, expect, it, vi } from "vitest";
const calls = vi.hoisted(() => ({ refresh: vi.fn(), download: vi.fn() }));
vi.mock("./server", () => ({ getCardForExport: calls.refresh }));
vi.mock("./download", () => ({ downloadCard: calls.download }));
vi.mock("./codes", async (original) => ({
  ...(await original<typeof import("./codes")>()),
  qrDataUrl: async () => "data:image/png;base64,fixture",
}));
import { NovaCard } from "./NovaCard";
import { DEMO_CARDS, cardUrl } from "./model";

describe("Private artwork exports", () => {
  for (const revoked of [false, true])
    it(
      revoked
        ? "stops export if access was revoked"
        : "refreshes an expired signed URL and preserves the QR identity",
      async () => {
        calls.refresh.mockReset();
        calls.download.mockReset();
        const card = {
          ...DEMO_CARDS[0],
          demo: false,
          artworkUrl: "https://storage.test/expired.png",
        };
        const fresh = { ...card, artworkUrl: "https://storage.test/fresh.png" };
        const url = cardUrl(card.publicId, "https://www.myacademy.my");
        if (revoked)
          calls.refresh.mockRejectedValue(new Error("This card is private or unavailable."));
        else calls.refresh.mockResolvedValue(fresh);
        const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
        env.IS_REACT_ACT_ENVIRONMENT = true;
        const host = document.createElement("div");
        document.body.append(host);
        const root = createRoot(host);
        try {
          await act(async () => root.render(<NovaCard card={card} url={url} />));
          const button = [...host.querySelectorAll("button")].find((b) =>
            b.textContent?.includes("Save image"),
          )!;
          await act(async () => button.click());
          expect(calls.refresh).toHaveBeenCalledExactlyOnceWith({ data: card.publicId });
          if (revoked) {
            expect(calls.download).not.toHaveBeenCalled();
            expect(host.textContent).toContain("private or unavailable");
          } else expect(calls.download).toHaveBeenCalledExactlyOnceWith(fresh, url);
        } finally {
          await act(async () => root.unmount());
          host.remove();
          delete env.IS_REACT_ACT_ENVIRONMENT;
        }
      },
    );
});
