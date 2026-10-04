// @vitest-environment jsdom
import { act, type ComponentType, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import * as registry from "@/content/registry";
import { ContentRegistryContext } from "@/hooks/use-content-registry";
import { orderRegularQuizQuestions } from "@/features/quiz/difficulty/quizDifficulty";
import { Route } from "@/routes/quizzes";

const mocks = vi.hoisted(() => ({
  progress: { xp: 0, quizzesTaken: 0, quizHistory: [] },
  record: vi.fn().mockResolvedValue({ awarded: false, xpEarned: 0, reason: "guest" }),
  mark: vi.fn(),
  confirm: vi.fn(),
  reset: vi.fn(),
  navigate: vi.fn(),
}));
vi.mock("@tanstack/react-router", async (importOriginal) => ({
  ...await importOriginal<typeof import("@tanstack/react-router")>(),
  createFileRoute: () => (options: unknown) => ({
    options,
    useSearch: () => ({ subject: "science", form: 1, chapter: "Chapter 1" }),
    useNavigate: () => mocks.navigate,
  }),
}));
vi.mock("@/hooks/use-progress", () => ({ useProgress: () => ({ progress: mocks.progress, awardBadge: vi.fn(), markChapter: mocks.mark, recordQuizResult: mocks.record }) }));
vi.mock("@/context/auth-context", () => ({ useAuth: () => ({ user: null }) }));
vi.mock("@/context/cikgu-context", () => ({ useCikgu: () => ({ openCikgu: vi.fn() }) }));
vi.mock("@/context/sign-in-modal", () => ({ useSignInModal: () => ({ open: vi.fn() }) }));
vi.mock("@/hooks/use-science-lang", () => ({ useScienceLang: () => ({ lang: "dlp", setLang: vi.fn() }) }));
vi.mock("@/features/quiz-streak/useQuizStreak", () => ({ useQuizStreak: () => ({ streak: 0, bestStreak: 0, celebration: null, confirmAnswer: mocks.confirm, resetStreak: mocks.reset }) }));
vi.mock("@/features/quiz-streak/QuizStreakCelebration", () => ({ QuizStreakCelebration: () => null }));
vi.mock("@/components/Confetti", () => ({ Confetti: () => null }));
vi.mock("@/components/DailyQuote", () => ({ DailyQuote: () => null }));
vi.mock("@/components/notes/ChapterFeatureBar", () => ({ ChapterContentTabs: () => null }));
vi.mock("@/components/ChapterPicker", () => ({ ContentHeader: () => null, SubjectGrid: () => null, FormGrid: () => null, ChapterGrid: () => null, FormComingSoon: () => null, ComingSoonScreen: () => null }));
vi.mock("@/components/AcademyPage", () => ({ AcademyPageShell: ({ children }: { children: ReactNode }) => children, AcademyPanel: ({ children }: { children: ReactNode }) => children, AcademyHero: () => null, SubjectWorldBanner: () => null }));
vi.mock("@/lib/sounds", () => ({ sfx: { success: vi.fn(), wrong: vi.fn(), perfect: vi.fn(), click: vi.fn() } }));
vi.mock("@/features/quiz/difficulty/quizDifficulty", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/features/quiz/difficulty/quizDifficulty")>();
  return { ...actual, orderRegularQuizQuestions: vi.fn(actual.orderRegularQuizQuestions) };
});

const Page = Route.options.component as ComponentType;
let container: HTMLDivElement;
let root: Root;
const bank = registry.getChapterQuizQuestions("science", "Form 1", "Chapter 1", "dlp");
const render = () => root.render(<ContentRegistryContext.Provider value={registry}><Page /></ContentRegistryContext.Provider>);
function button(text: string) {
  const found = [...document.querySelectorAll("button")].find((node) => node.textContent?.trim() === text);
  expect(found, `button ${text}`).toBeDefined();
  return found!;
}
function click(text: string) { act(() => button(text).click()); }
function currentQuestion() {
  const question = bank.find((q) => [...document.querySelectorAll("h2")].some((h) => h.textContent === q.question));
  expect(question, document.body.textContent?.slice(-1500)).toBeDefined();
  return question!;
}
function start(timed = false) {
  const selector = timed ? '[aria-label^="Timed quiz"]' : '[aria-label^="No Timer"]';
  act(() => (document.querySelector(selector) as HTMLButtonElement).click());
  const startButton = [...document.querySelectorAll("button")].find((b) => /Start Quiz/.test(b.textContent ?? ""));
  expect(startButton).toBeDefined();
  act(() => startButton!.click());
}
function answerCorrectly() {
  const q = currentQuestion();
  const answer = [...document.querySelectorAll("button")].find((b) => [...b.querySelectorAll("span")].some((span) => span.textContent === q.options[q.answerIndex]));
  expect(answer).toBeDefined();
  act(() => answer!.click());
}

beforeEach(() => {
  vi.clearAllMocks();
  vi.useFakeTimers();
  vi.spyOn(Math, "random").mockReturnValue(0);
  Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
  window.history.replaceState({}, "", "/quizzes?subject=science&form=1&chapter=Chapter+1");
  container = document.createElement("div"); document.body.appendChild(container);
  root = createRoot(container);
  act(render);
});
afterEach(() => {
  act(() => root.unmount()); container.remove();
  vi.useRealTimers(); vi.restoreAllMocks();
});

describe("actual Science Form 1 quiz attempt lifecycle", () => {
  it("keeps question/options stable through timers, XP renders and answer feedback; explicit Shuffle rebuilds", () => {
    start(true);
    const first = currentQuestion();
    const optionText = () => [...document.querySelectorAll("button.group")].map((b) => b.textContent);
    const before = optionText();
    expect(vi.mocked(orderRegularQuizQuestions)).toHaveBeenCalledTimes(1);
    act(() => vi.advanceTimersByTime(2000));
    mocks.progress.xp = 123;
    act(render);
    expect(currentQuestion().id).toBe(first.id);
    expect(optionText()).toEqual(before);
    answerCorrectly();
    expect(currentQuestion().id).toBe(first.id);
    expect(vi.mocked(orderRegularQuizQuestions)).toHaveBeenCalledTimes(1);
    vi.mocked(Math.random).mockReturnValue(0.99);
    click("Shuffle");
    expect(vi.mocked(orderRegularQuizQuestions)).toHaveBeenCalledTimes(2);
    expect(currentQuestion().id).not.toBe(first.id);
  });

  it("submits all thirty answers by their own difficulty and starts a fresh Try Again attempt", async () => {
    start();
    const seen: string[] = [];
    for (let i = 0; i < 30; i++) {
      seen.push(currentQuestion().id);
      answerCorrectly();
      const next = [...document.querySelectorAll("button")].find((b) => /^(Next Question|See Results|View Results|Next)/.test(b.textContent?.trim() ?? ""));
      expect(next, document.body.textContent?.slice(-600)).toBeDefined();
      await act(async () => next!.click());
    }
    expect(new Set(seen).size).toBe(30);
    expect(vi.mocked(orderRegularQuizQuestions)).toHaveBeenCalledTimes(1);
    expect(mocks.record).toHaveBeenCalledWith(expect.objectContaining({
      quizKey: "quiz-v2:standard:science:form-1:chapter-1:dlp:set-default:difficulty-all",
      total: 30, correct: { easy: 10, medium: 10, hard: 10 }, timerMode: "none", formula: "standard",
    }));
    expect(mocks.mark).toHaveBeenCalledWith("science", "Chapter 1", "quiz");
    vi.mocked(Math.random).mockReturnValue(0.99);
    click("Try Again"); start();
    expect(vi.mocked(orderRegularQuizQuestions)).toHaveBeenCalledTimes(2);
    expect(currentQuestion().id).not.toBe(seen[0]);
  });

  it.each(["Easy", "Medium", "Hard"])("uses the actual %s filter before shuffling", (difficulty) => {
    start(); click(difficulty); start();
    const last = vi.mocked(orderRegularQuizQuestions).mock.calls.at(-1)!;
    expect(last[0]).toHaveLength(10);
    expect(last[0].every((q) => q.difficulty === difficulty)).toBe(true);
    expect(last[1]).toEqual({ subjectId: "science", form: "Form 1" });
  });
});
