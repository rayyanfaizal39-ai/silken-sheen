// ─── Daily companion messages ───────────────────────────────────────────────
// Short, encouraging, space-themed. One is picked at random per page load.

export const COMPANION_MESSAGES: string[] = [
  "Let's complete a quiz together!",
  "I'm excited to learn today!",
  "Only a little more XP until I evolve!",
  "You're doing great!",
  "I believe in you!",
  "Every chapter you read makes me stronger.",
  "Ready for another mission, Cadet?",
  "The stars are watching your progress!",
];

export function getRandomCompanionMessage(): string {
  return COMPANION_MESSAGES[Math.floor(Math.random() * COMPANION_MESSAGES.length)];
}
