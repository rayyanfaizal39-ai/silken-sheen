export type LoadingTaskOptions = {
  id?: string;
  message?: string;
  delayMs?: number;
  minVisibleMs?: number;
  timeoutMs?: number;
};

export type LoadingTaskHandle = {
  id: string;
  finish: () => void;
  fail: (error?: unknown) => void;
};

type LoadingTask = Required<Omit<LoadingTaskOptions, "id">> & {
  id: string;
  startedAt: number;
  visibleAt: number;
};

export type LoadingSnapshot = {
  taskCount: number;
  visible: boolean;
  message: string;
  error: Error | null;
};

const DEFAULT_MESSAGE = "Preparing your learning mission…";
const tasks = new Map<string, LoadingTask>();
const listeners = new Set<() => void>();
const timers = new Map<string, ReturnType<typeof setTimeout>[]>();
let sequence = 0;
let error: Error | null = null;
let snapshot: LoadingSnapshot = {
  taskCount: 0,
  visible: false,
  message: DEFAULT_MESSAGE,
  error: null,
};

function asError(value: unknown): Error {
  if (value instanceof Error) return value;
  return new Error(typeof value === "string" ? value : "Loading took longer than expected.");
}

function clearTaskTimers(id: string) {
  for (const timer of timers.get(id) ?? []) clearTimeout(timer);
  timers.delete(id);
}

function publish() {
  const now = Date.now();
  const active = [...tasks.values()];
  const visibleTasks = active.filter((task) => now >= task.visibleAt);
  snapshot = {
    taskCount: active.length,
    visible: visibleTasks.length > 0 || error !== null,
    message: visibleTasks.at(-1)?.message ?? DEFAULT_MESSAGE,
    error,
  };
  listeners.forEach((listener) => listener());
}

export function beginLoadingTask(options: LoadingTaskOptions = {}): LoadingTaskHandle {
  const requestedId = options.id ?? `loading:${++sequence}`;
  const id = tasks.has(requestedId) ? `${requestedId}:${++sequence}` : requestedId;
  clearTaskTimers(id);

  const startedAt = Date.now();
  const task: LoadingTask = {
    id,
    message: options.message ?? DEFAULT_MESSAGE,
    delayMs: Math.max(0, options.delayMs ?? 0),
    minVisibleMs: Math.max(0, options.minVisibleMs ?? 0),
    timeoutMs: Math.max(0, options.timeoutMs ?? 15_000),
    startedAt,
    visibleAt: startedAt + Math.max(0, options.delayMs ?? 0),
  };
  tasks.set(id, task);

  const taskTimers: ReturnType<typeof setTimeout>[] = [];
  if (task.delayMs > 0) taskTimers.push(setTimeout(publish, task.delayMs));
  if (task.timeoutMs > 0) {
    taskTimers.push(
      setTimeout(() => {
        if (!tasks.has(id)) return;
        error = new Error("AcadeMY could not finish loading this screen.");
        tasks.delete(id);
        clearTaskTimers(id);
        publish();
      }, task.timeoutMs),
    );
  }
  timers.set(id, taskTimers);
  publish();

  let settled = false;
  const settle = (failure?: unknown) => {
    if (settled) return;
    settled = true;
    const current = tasks.get(id);
    if (!current) return;
    const visibleFor = Date.now() - current.visibleAt;
    const remaining = Date.now() >= current.visibleAt ? current.minVisibleMs - visibleFor : 0;
    const complete = () => {
      tasks.delete(id);
      clearTaskTimers(id);
      if (failure !== undefined) {
        error = asError(failure);
        if (import.meta.env.DEV) console.error("[GlobalLoading] Task failed", { id, error });
      }
      publish();
    };
    if (remaining > 0) {
      clearTaskTimers(id);
      timers.set(id, [setTimeout(complete, remaining)]);
    } else {
      complete();
    }
  };

  return {
    id,
    finish: () => settle(),
    fail: (failure) => settle(failure ?? new Error("Loading failed.")),
  };
}

export function clearLoadingError() {
  error = null;
  publish();
}

export function finishAllLoadingTasks() {
  for (const id of tasks.keys()) clearTaskTimers(id);
  tasks.clear();
  error = null;
  publish();
}

export const loadingStore = {
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: () => snapshot,
  getServerSnapshot: () => snapshot,
};
