import { describe, expect, it } from "vitest";

import { isStudentMusicRoute } from "./studentMusicRoutes";

describe("isStudentMusicRoute", () => {
  it.each([
    "/home",
    "/dashboard",
    "/subjects/science",
    "/notes/chapter/1",
    "/quizzes",
    "/flashcards",
    "/mindmaps",
    "/tracker",
    "/companion",
    "/leaderboard",
  ])("includes the student learning route %s", (pathname) => {
    expect(isStudentMusicRoute(pathname)).toBe(true);
  });

  it.each([
    "/",
    "/login",
    "/auth/callback",
    "/admin",
    "/admin/login",
    "/parent",
    "/parent-dashboard",
    "/upgrade",
    "/payment-return",
    "/academy/landingpage3",
    "/contact",
    "/privacy",
    "/terms",
  ])("excludes the non-student route %s", (pathname) => {
    expect(isStudentMusicRoute(pathname)).toBe(false);
  });
});
