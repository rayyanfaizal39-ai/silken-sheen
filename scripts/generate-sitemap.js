#!/usr/bin/env node
// Generates dist/client/sitemap.xml after `vite build`.
//
// WHY: keeping this list here (rather than trying to introspect the router's
// generated route tree) is deliberate — it's the single place that decides
// which URLs are public, crawlable content vs. authenticated/per-user app
// views (dashboard, tracker, parent-dashboard, companion, login, admin),
// which mirrors the Disallow list in public/robots.txt. A route showing up
// in both the app AND the sitemap does not mean it belongs in search results.

import { writeFileSync, mkdirSync } from "node:fs";
import { existsSync } from "node:fs";

const SITE_URL = "https://www.myacademy.my";

const PUBLIC_ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/landing", priority: "0.9", changefreq: "weekly" },
  { path: "/subjects", priority: "0.9", changefreq: "monthly" },
  { path: "/notes", priority: "0.8", changefreq: "weekly" },
  { path: "/quizzes", priority: "0.8", changefreq: "weekly" },
  { path: "/flashcards", priority: "0.8", changefreq: "weekly" },
  { path: "/mindmaps", priority: "0.8", changefreq: "weekly" },
  { path: "/leaderboard", priority: "0.6", changefreq: "daily" },
  { path: "/upgrade", priority: "0.7", changefreq: "monthly" },
  { path: "/parent", priority: "0.6", changefreq: "monthly" },
  { path: "/contact", priority: "0.4", changefreq: "yearly" },
  { path: "/privacy", priority: "0.3", changefreq: "yearly" },
  { path: "/terms", priority: "0.3", changefreq: "yearly" },
];

const today = new Date().toISOString().slice(0, 10);

const urlEntries = PUBLIC_ROUTES.map(
  ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`,
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>
`;

const outDir = "dist/client";
if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/sitemap.xml`, xml, "utf-8");
console.log(`[generate-sitemap] wrote ${outDir}/sitemap.xml (${PUBLIC_ROUTES.length} URLs)`);
