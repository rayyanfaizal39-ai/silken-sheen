import { mkdirSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import QRCode from "qrcode";

const CARD_URL = "https://www.myacademy.my/card/";
const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(scriptDir, "../public/card/academy-faizal-zain-qr-2048.png");

mkdirSync(dirname(outputPath), { recursive: true });
await QRCode.toFile(outputPath, CARD_URL, {
  type: "png",
  width: 2048,
  margin: 4,
  errorCorrectionLevel: "H",
  color: {
    dark: "#061226ff",
    light: "#ffffffff",
  },
});

console.log(`[generate-business-card-qr] Wrote ${outputPath}`);
