/** Keep a batch running after the HTTP response so a short pg_net timeout does not cancel it. */
export function scheduleInBackground(work: Promise<unknown>): boolean {
  const runtime = (
    globalThis as { EdgeRuntime?: { waitUntil?: (promise: Promise<unknown>) => void } }
  ).EdgeRuntime;
  if (!runtime?.waitUntil) return false;
  runtime.waitUntil(work);
  return true;
}
