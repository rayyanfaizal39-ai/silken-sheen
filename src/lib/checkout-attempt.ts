// Private browser retry state. No referral information, credentials or payment
// status are stored here. Never rotate a key just because a request timed out.
type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">;
type Attempt = { plan: string; key: string; paymentId?: string };
const prefix = "academy:checkout-attempt:";
const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
export function assertCheckoutAccount(expected: string, current: string | undefined) {
  if (current !== expected) throw new Error("The signed-in account changed during checkout");
}
function read(storage: Store, userId: string): Attempt | undefined {
  const raw = storage.getItem(prefix + userId);
  if (!raw) return undefined;
  const attempt = JSON.parse(raw) as Attempt;
  if (!uuid.test(attempt.key) || !["pro_monthly", "premium_monthly"].includes(attempt.plan))
    throw new Error("Checkout state is unavailable");
  return attempt;
}
export function checkoutAttemptKey(storage: Store, userId: string, plan: string) {
  const previous = read(storage, userId);
  if (previous) {
    if (previous.plan !== plan) throw new Error("An earlier checkout must be resolved first");
    return previous.key;
  }
  const attempt = { plan, key: crypto.randomUUID() };
  storage.setItem(prefix + userId, JSON.stringify(attempt));
  return attempt.key;
}
export function rememberCheckoutPayment(
  storage: Store,
  userId: string,
  key: string,
  paymentId: string,
) {
  const attempt = read(storage, userId);
  if (attempt?.key === key)
    storage.setItem(prefix + userId, JSON.stringify({ ...attempt, paymentId }));
}
// Call only after an authenticated, owner-scoped server status says terminal.
// A provider URL parameter or an unavailable/pending lookup must never clear it.
export function finishCheckoutAttempt(storage: Store, userId: string, paymentId: string) {
  if (read(storage, userId)?.paymentId === paymentId) storage.removeItem(prefix + userId);
}
