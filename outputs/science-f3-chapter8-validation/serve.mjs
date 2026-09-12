import { createServer } from "vite";
import react from "@vitejs/plugin-react";
import tailwind from "@tailwindcss/vite";
import { resolve } from "node:path";

const server = await createServer({
  configFile: false,
  plugins: [react(), tailwind()],
  resolve: { alias: { "@": resolve("src") } },
  server: { host: "127.0.0.1", port: 4188, strictPort: true },
});
await server.listen();
console.log("Chapter 8 preview: http://127.0.0.1:4188/outputs/science-f3-chapter8-validation/index.html");
