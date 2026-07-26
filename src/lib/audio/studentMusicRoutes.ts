const STUDENT_MUSIC_ROUTE_PREFIXES = [
  "/home",
  "/dashboard",
  "/subjects",
  "/notes",
  "/quizzes",
  "/flashcards",
  "/mindmaps",
  "/tracker",
  "/companion",
  "/leaderboard",
] as const;

export function isStudentMusicRoute(pathname: string) {
  return STUDENT_MUSIC_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}
