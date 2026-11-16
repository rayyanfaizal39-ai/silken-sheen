// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { RANKS, getRankArtworkFit } from "@/data/rankAssets";
import { RankBadge } from "./RankBadge";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;

const roots: ReturnType<typeof createRoot>[] = [];

afterEach(async () => {
  for (const root of roots) await act(async () => root.unmount());
  roots.length = 0;
  document.body.innerHTML = "";
});

describe("RankBadge artwork alignment", () => {
  it.each(RANKS)("centres the visible $name artwork inside one square frame", async (rank) => {
    const host = document.createElement("div");
    document.body.append(host);
    const root = createRoot(host);
    roots.push(root);

    await act(async () => root.render(<RankBadge rank={rank} size={124} />));

    const frame = host.querySelector("span")!;
    const image = host.querySelector("img")!;
    const fit = getRankArtworkFit(rank.name);

    expect(frame.style.width).toBe("124px");
    expect(frame.style.height).toBe("124px");
    expect(frame.className).toContain("overflow-hidden");
    expect(image.className).toContain("object-contain");
    expect(image.className).toContain("object-center");
    expect(image.style.transform).toBe(
      `translate(${fit.translateX}%, ${fit.translateY}%) scale(${fit.scale})`,
    );
    expect(image.style.transformOrigin).toBe("center");
  });
});
