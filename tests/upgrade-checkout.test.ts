import assert from "node:assert/strict";
import test from "node:test";
import {
  CheckoutAuthenticationError,
  executeCheckout,
  type CheckoutDependencies,
  type VerifiedCheckoutUser,
} from "../src/routes/-upgrade-checkout.ts";

function dependenciesFor(user: VerifiedCheckoutUser | null) {
  const inserted: Array<Parameters<CheckoutDependencies["insertPendingPayment"]>[0]> = [];
  const confirmed: string[] = [];
  const dependencies: CheckoutDependencies = {
    async getVerifiedUser() {
      return user;
    },
    async insertPendingPayment(input) {
      inserted.push(input);
      return "payment-1";
    },
    async confirmPayment(paymentId) {
      confirmed.push(paymentId);
    },
  };
  return { dependencies, inserted, confirmed };
}

test("authenticated checkout succeeds with the verified session user", async () => {
  const fixture = dependenciesFor({ id: "session-user", email: "verified@example.com" });
  const result = await executeCheckout({ plan: "pro_monthly" }, fixture.dependencies);

  assert.deepEqual(result, { paymentId: "payment-1", status: "paid" });
  assert.equal(fixture.inserted[0]?.userId, "session-user");
  assert.equal(fixture.inserted[0]?.customerEmail, "verified@example.com");
  assert.deepEqual(fixture.confirmed, ["payment-1"]);
});

test("unauthenticated checkout returns an authentication error with status 401", async () => {
  const fixture = dependenciesFor(null);
  await assert.rejects(
    executeCheckout({ plan: "pro_monthly" }, fixture.dependencies),
    (error: unknown) => error instanceof CheckoutAuthenticationError && error.statusCode === 401,
  );
  assert.equal(fixture.inserted.length, 0);
});

test("spoofed user_id in request data is ignored", async () => {
  const fixture = dependenciesFor({ id: "session-user", email: "verified@example.com" });
  const spoofedData = { plan: "pro_annual" as const, user_id: "attacker-user" };
  await executeCheckout(spoofedData, fixture.dependencies);

  assert.equal(fixture.inserted[0]?.userId, "session-user");
});

test("checkout derives both user id and customer email from the verified session", async () => {
  const fixture = dependenciesFor({ id: "verified-id", email: "customer@example.com" });
  await executeCheckout({ plan: "premium_annual" }, fixture.dependencies);

  assert.deepEqual(fixture.inserted[0], {
    userId: "verified-id",
    customerEmail: "customer@example.com",
    amount: 490,
    plan: "premium_annual",
  });
});
