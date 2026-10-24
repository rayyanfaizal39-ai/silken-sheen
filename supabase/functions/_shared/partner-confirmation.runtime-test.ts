// Portable Node/Deno/Workers check. This key and vector are public test data.
import { signPartnerReceipt, validPartnerReceipt } from "./partner-confirmation.ts";
function verify() {
  const secret = "public-test-vector-not-a-secret";
  const expected =
    "eyJ1c2VySWQiOiJsZWFybmVyLUIiLCJwYXJ0bmVyQ29kZSI6IkFDQVRFU1QiLCJjaGVja291dEtleSI6ImNoZWNrb3V0LTEiLCJleHBpcmVzQXQiOjYwMTAwMH0.Kgp5_k7EUSikZuaSXzBF-ck8Sdw98FuwW1TKM3cHcIs";
  const token = signPartnerReceipt("learner-B", "ACATEST", secret, 1000, "checkout-1");
  if (token !== expected)
    throw new Error("Receipt runtime signature differs from Node test vector");
  if (!validPartnerReceipt(token, "learner-B", "ACATEST", secret, 2000, "checkout-1"))
    throw new Error("Valid receipt rejected");
  for (const [value, user, code, key, now] of [
    [`${token}x`, "learner-B", "ACATEST", "checkout-1", 2000],
    [token, "learner-A", "ACATEST", "checkout-1", 2000],
    [token, "learner-B", "ACAOTHER", "checkout-1", 2000],
    [token, "learner-B", "ACATEST", "checkout-2", 2000],
    [token, "learner-B", "ACATEST", "checkout-1", 601000],
  ] as const)
    if (validPartnerReceipt(value, user, code, secret, now, key))
      throw new Error("Invalid receipt accepted");
}
verify();
export default { test: verify };
