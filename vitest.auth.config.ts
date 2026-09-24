import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

// Auth tests do not need the production route-splitting or Cloudflare build plugins.
export default defineConfig({
  resolve: { alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) } },
  test: {
    include: [
      "src/lib/auth-*.test.ts",
      "src/lib/supabase*.test.ts",
      "src/lib/onboarding-routing.test.ts",
      "src/routes/-auth-login.integration.tsx",
    ],
  },
});
