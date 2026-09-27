import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const routeTreeSource = readFileSync(new URL("../routeTree.gen.ts", import.meta.url), "utf8");

const fileRoutesByFullPath = routeTreeSource.slice(
  routeTreeSource.indexOf("export interface FileRoutesByFullPath"),
  routeTreeSource.indexOf("export interface FileRoutesByTo"),
);

const CRITICAL_ROUTES = [
  "/",
  "/home",
  "/login",
  "/forgot-password",
  "/auth/callback",
  "/auth/reset-password",
  "/subjects",
  "/notes",
  "/quizzes",
  "/flashcards",
  "/mindmaps",
  "/leaderboard",
  "/profile",
  "/admin",
  "/admin/login",
] as const;

describe("app route registration", () => {
  it("keeps critical public, learning, auth, and admin paths in the generated route tree", () => {
    expect(fileRoutesByFullPath.length).toBeGreaterThan(0);

    for (const path of CRITICAL_ROUTES) {
      expect(fileRoutesByFullPath, `missing FileRoutesByFullPath entry for ${path}`).toContain(
        `'${path}':`,
      );
    }
  });
});
