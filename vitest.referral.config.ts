import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    include: [
      "src/lib/partner*.test.ts",
      "src/components/PartnerReferenceCapture.test.tsx",
      "src/lib/toyyibpay-response.test.ts",
      "src/lib/payment-return.test.ts",
      "src/lib/auth-return-to.test.ts",
    ],
  },
});
