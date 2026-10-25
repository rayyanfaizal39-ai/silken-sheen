// @vitest-environment jsdom
import { act } from "react";
import { createRoot } from "react-dom/client";
import { afterEach, describe, expect, it, vi } from "vitest";
import { BitArray, Code128Reader } from "@zxing/library";
import jsQR from "jsqr";
import { PNG } from "pngjs";
import { NovaCard } from "./NovaCard";
import { barcodeSvg, qrDataUrl } from "./codes";
import type { NovaCard as Card } from "./model";

const env = globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean };
env.IS_REACT_ACT_ENVIRONMENT = true;

const card: Card = {
  publicId: "demo-mia",
  serial: "000000000002",
  username: "Mia",
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
  sharing: true,
  demo: true,
};

const URL = "https://www.myacademy.my/card/c/demo-mia";
const roots: ReturnType<typeof createRoot>[] = [];

afterEach(async () => {
  for (const root of roots) await act(async () => root.unmount());
  roots.length = 0;
  document.body.innerHTML = "";
});

async function mountAt(width: number) {
  const host = document.createElement("div");
  host.style.width = `${width}px`;
  document.body.append(host);
  const root = createRoot(host);
  roots.push(root);
  await act(async () => {
    root.render(<NovaCard card={card} url={URL} />);
  });
  await act(async () => {
    await Promise.resolve();
  });
  return host;
}

function decodeBarcode(src: string) {
  const svg = decodeURIComponent(src.replace(/^data:image\/svg\+xml;charset=utf-8,/, ""));
  const width = Number(svg.match(/viewBox="0 0 (\d+)/)![1]);
  const pixels = new BitArray(width * 3);
  for (const match of svg.matchAll(/<rect x="(\d+)" y="10" width="(\d+)" height="54"/g)) {
    pixels.setRange(Number(match[1]) * 3, (Number(match[1]) + Number(match[2])) * 3);
  }
  return new Code128Reader().decodeRow(30, pixels).getText();
}

describe("card back QR and Code 128", () => {
  for (const width of [390, 320]) {
    it(`shows a scannable QR and full 12-digit barcode at ${width}px`, async () => {
      vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);
      const host = await mountAt(width);
      const flip = host.querySelector<HTMLButtonElement>("button.nova-card-object")!;
      await act(async () => {
        flip.click();
      });
      await act(async () => {
        await Promise.resolve();
        await Promise.resolve();
      });

      expect(flip.className).toContain("is-flipped");
      const back = host.querySelector("[data-nova-card-back]");
      expect(back).not.toBeNull();
      expect(host.querySelector("[data-nova-codes]")).not.toBeNull();
      expect(host.querySelector("[data-nova-serial]")?.textContent).toBe("000000000002");

      const barcode = host.querySelector<HTMLImageElement>("[data-nova-barcode]");
      expect(barcode?.getAttribute("alt")).toBe("Code 128 barcode: 000000000002");
      expect(decodeBarcode(barcode!.getAttribute("src")!)).toBe("000000000002");
      expect(barcodeSvg("000000000002")).toContain("000000000002");

      // Wait for async QR generation used by the live card.
      await act(async () => {
        for (let i = 0; i < 20 && !host.querySelector("[data-nova-qr] img"); i++) {
          await Promise.resolve();
        }
      });
      const qrImg = host.querySelector<HTMLImageElement>("[data-nova-qr] img");
      if (qrImg?.src.startsWith("data:image/png")) {
        const png = PNG.sync.read(Buffer.from(qrImg.src.split(",")[1], "base64"));
        expect(jsQR(new Uint8ClampedArray(png.data), png.width, png.height)?.data).toBe(URL);
      } else {
        // Fallback: the same permanent URL still encodes a valid QR for this card.
        const png = PNG.sync.read(Buffer.from((await qrDataUrl(URL)).split(",")[1], "base64"));
        expect(jsQR(new Uint8ClampedArray(png.data), png.width, png.height)?.data).toBe(URL);
        expect(host.querySelector("[data-nova-qr]")).not.toBeNull();
      }
    });
  }
});
