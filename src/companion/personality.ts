export const NOVA_PERSONALITY_IDS = [
  "curious",
  "steady",
  "brave",
  "playful",
] as const;
export type NovaPersonalityId = (typeof NOVA_PERSONALITY_IDS)[number];

export const NOVA_PERSONALITIES: Record<
  NovaPersonalityId,
  {
    title: string;
    trait: string;
    description: string;
    greeting: string;
    messages: readonly string[];
  }
> = {
  curious: {
    title: "Curious Explorer",
    trait: "Curious",
    description:
      "You like asking questions and discovering what is around the next corner. Nova will bring a little curiosity to your study adventures.",
    greeting:
      "There is a whole universe to discover. Let’s explore it together!",
    messages: [
      "What will we discover in this chapter?",
      "Got a question? Let’s investigate it together.",
      "One new idea is a discovery worth celebrating.",
    ],
  },
  steady: {
    title: "Steady Navigator",
    trait: "Steady",
    description:
      "You enjoy taking things one step at a time. Nova will be your calm companion as you build progress at your own pace.",
    greeting: "One small step at a time. I’ll be right here with you.",
    messages: [
      "Let’s take this one question at a time.",
      "A small study session still counts as progress.",
      "Take a breath. We can work through this together.",
    ],
  },
  brave: {
    title: "Brave Voyager",
    trait: "Brave",
    description:
      "You like having a challenge to work towards. Nova will cheer you on when you try something new or give a tricky question another go.",
    greeting: "Ready for our first challenge? We’ll take it on together!",
    messages: [
      "Ready to give that tricky question another go?",
      "Trying again is a step forward.",
      "Let’s see what we can work out today.",
    ],
  },
  playful: {
    title: "Playful Stargazer",
    trait: "Playful",
    description:
      "You enjoy a little fun along the way. Nova will bring a cheerful spark to your learning and celebrate your small wins with you.",
    greeting:
      "You, me, and a little stardust. Let’s make learning an adventure!",
    messages: [
      "A little quiz adventure? Count me in!",
      "Small win spotted. Let’s celebrate!",
      "Ready to turn another flashcard together?",
    ],
  },
};

type PersonalityQuestion = {
  id: string;
  prompt: string;
  options: { personality: NovaPersonalityId; label: string }[];
};

// A playful preference quiz. These choices customise Nova's encouragement;
// they do not prescribe learning styles or make psychological assessments.
export const NOVA_PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
  {
    id: "new-world",
    prompt: "You land on a new planet. What do you do first?",
    options: [
      {
        personality: "curious",
        label: "Explore something I have never seen before.",
      },
      {
        personality: "steady",
        label: "Find a quiet spot and plan my next step.",
      },
      { personality: "brave", label: "Head towards the biggest adventure." },
      {
        personality: "playful",
        label: "Find something fun to do with my crew.",
      },
    ],
  },
  {
    id: "tricky-puzzle",
    prompt: "A puzzle has you stuck. What feels most like you?",
    options: [
      {
        personality: "brave",
        label: "Give it another go. I want to crack it.",
      },
      {
        personality: "curious",
        label: "Ask why it works and look for a clue.",
      },
      {
        personality: "playful",
        label: "Turn it into a little game or challenge.",
      },
      { personality: "steady", label: "Slow down and work through one part." },
    ],
  },
  {
    id: "small-win",
    prompt: "You finish something you worked hard on. How do you celebrate?",
    options: [
      {
        personality: "playful",
        label: "A happy dance and a well-earned break.",
      },
      {
        personality: "brave",
        label: "Feel proud, then pick my next challenge.",
      },
      { personality: "steady", label: "Enjoy the moment and see my progress." },
      {
        personality: "curious",
        label: "Tell someone about what I discovered.",
      },
    ],
  },
  {
    id: "crew-role",
    prompt: "Your space crew needs a hand. Which role would you choose?",
    options: [
      {
        personality: "steady",
        label: "The navigator who helps us stay on course.",
      },
      {
        personality: "playful",
        label: "The teammate who keeps our spirits up.",
      },
      {
        personality: "curious",
        label: "The explorer who asks good questions.",
      },
      {
        personality: "brave",
        label: "The voyager who tries the next challenge.",
      },
    ],
  },
  {
    id: "nova-message",
    prompt: "What would you like Nova to say before you start studying?",
    options: [
      {
        personality: "curious",
        label: "Let’s discover something new together.",
      },
      { personality: "steady", label: "One small step. We’ve got time." },
      { personality: "brave", label: "Let’s give today’s challenge a go." },
      {
        personality: "playful",
        label: "Ready for a little learning adventure?",
      },
    ],
  },
];

export interface NovaBond {
  version: 1;
  personality: NovaPersonalityId;
  answers: NovaPersonalityId[];
  name: string;
  completedAt: string;
}

export function isNovaPersonality(value: unknown): value is NovaPersonalityId {
  return NOVA_PERSONALITY_IDS.includes(value as NovaPersonalityId);
}

export function resolveNovaPersonality(
  answers: readonly NovaPersonalityId[],
): NovaPersonalityId {
  if (
    answers.length !== NOVA_PERSONALITY_QUESTIONS.length ||
    !answers.every(isNovaPersonality)
  ) {
    throw new Error("Answer all five questions to meet Nova.");
  }
  const counts = Object.fromEntries(
    NOVA_PERSONALITY_IDS.map((id) => [id, 0]),
  ) as Record<NovaPersonalityId, number>;
  answers.forEach((id) => counts[id]++);
  const highest = Math.max(...Object.values(counts));
  // Deterministic ties follow the student's first preference among the leaders.
  return answers.find((id) => counts[id] === highest)!;
}

export function createNovaBond(
  answers: NovaPersonalityId[],
  name: string,
  now = new Date(),
): NovaBond {
  return {
    version: 1,
    personality: resolveNovaPersonality(answers),
    answers: [...answers],
    name: Array.from(name.trim()).slice(0, 24).join("") || "Nova",
    completedAt: now.toISOString(),
  };
}

export function parseNovaBond(value: unknown): NovaBond | null {
  if (!value || typeof value !== "object") return null;
  const bond = value as Partial<NovaBond>;
  if (
    bond.version !== 1 ||
    !Array.isArray(bond.answers) ||
    bond.answers.length !== 5 ||
    !bond.answers.every(isNovaPersonality) ||
    !isNovaPersonality(bond.personality) ||
    resolveNovaPersonality(bond.answers) !== bond.personality ||
    typeof bond.name !== "string" ||
    !bond.name.trim() ||
    Array.from(bond.name).length > 24 ||
    typeof bond.completedAt !== "string" ||
    !Number.isFinite(Date.parse(bond.completedAt))
  )
    return null;
  return {
    version: 1,
    personality: bond.personality,
    answers: [...bond.answers],
    name: bond.name,
    completedAt: bond.completedAt,
  };
}

export function latestNovaBond(
  local: NovaBond | null,
  remote: NovaBond | null,
): NovaBond | null {
  if (!local) return remote;
  if (!remote) return local;
  return Date.parse(remote.completedAt) >= Date.parse(local.completedAt)
    ? remote
    : local;
}
