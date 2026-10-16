import { readFileSync } from "node:fs";
import { beforeEach, describe, expect, it } from "vitest";
import { PGlite } from "@electric-sql/pglite";

const liveSchema = readFileSync(new URL("./partner-commissions.live-schema.sql", import.meta.url), "utf8");
const migration = readFileSync(
  new URL("../../supabase/migrations/20261016120000_partner_referral_commissions.sql", import.meta.url),
  "utf8",
);

const PARTNER = "00000000-0000-4000-8000-0000000000a1";
const OTHER_PARTNER = "00000000-0000-4000-8000-0000000000a2";
const SUSPENDED_PARTNER = "00000000-0000-4000-8000-0000000000a3";
const STUDENT = "00000000-0000-4000-8000-0000000000b1";
const SECOND_STUDENT = "00000000-0000-4000-8000-0000000000b2";
const TEACHER = "00000000-0000-4000-8000-0000000000c1";

type Commission = {
  payment_reference: string;
  payment_number: number;
  gross_amount: string;
  commission_amount: string;
  status: string;
  partner_user_id: string;
  review_available_at: string;
};

let db: PGlite;
let billCounter = 0;

async function asUser<T>(uid: string, sql: string, params: unknown[] = []) {
  await db.query(`select set_config('test.uid', $1, false)`, [uid]);
  try {
    return await db.query<T>(sql, params);
  } finally {
    await db.query(`select set_config('test.uid', '', false)`);
  }
}

async function claim(uid: string, code: string) {
  const result = await asUser<{ r: { claimed: boolean; reason?: string } }>(
    uid,
    `select public.partner_claim_referral($1) as r`,
    [code],
  );
  return result.rows[0].r;
}

/** create-toyyibpay-bill: insert the pending row, then store the bill code. */
async function createCheckout(userId: string, plan: "pro" | "premium", provider = "toyyibpay") {
  const amount = plan === "pro" ? 29 : 59;
  const inserted = await db.query<{ id: string }>(
    `insert into public.payment_transactions (user_id, provider, plan, amount) values ($1, $2, $3, $4) returning id`,
    [userId, provider, plan, amount],
  );
  const id = inserted.rows[0].id;
  billCounter += 1;
  await db.query(`update public.payment_transactions set provider_bill_code = $2 where id = $1`, [
    id,
    `bill${billCounter}`,
  ]);
  return { id, amount };
}

/** toyyibpay-callback after independent getBillTransactions verification. */
async function verifiedCallback(payment: { id: string; amount: number }, txn = `TP${payment.id.slice(0, 8)}`) {
  const result = await db.query<{ already_processed: boolean }>(
    `select * from public.process_verified_payment($1, $2, $3, 'MYR', 'fpx', '{"sandbox":true}'::jsonb, 'Parent', 'parent@example.test', null)`,
    [payment.id, txn, payment.amount],
  );
  return result.rows[0];
}

async function commissions(userId = STUDENT) {
  const result = await db.query<Commission>(
    `select c.* from public.partner_commissions c
       join public.partner_referrals r on r.id = c.referral_id
      where r.customer_reference = $1 order by c.payment_number`,
    [userId],
  );
  return result.rows;
}

beforeEach(async () => {
  db = new PGlite();
  billCounter = 0;
  await db.exec(liveSchema);
  await db.exec(migration);
  await db.exec(`
    insert into auth.users (id) values
      ('${PARTNER}'), ('${OTHER_PARTNER}'), ('${SUSPENDED_PARTNER}'),
      ('${STUDENT}'), ('${SECOND_STUDENT}'), ('${TEACHER}');
    insert into public.profiles (id, role) values
      ('${PARTNER}', 'student'), ('${OTHER_PARTNER}', 'student'), ('${SUSPENDED_PARTNER}', 'student'),
      ('${STUDENT}', 'student'), ('${SECOND_STUDENT}', 'student'), ('${TEACHER}', 'teacher');
    insert into public.partner_profiles (user_id, partner_code, status) values
      ('${PARTNER}', 'ACAPARTNER1', 'active'),
      ('${OTHER_PARTNER}', 'ACAPARTNER2', 'active'),
      ('${SUSPENDED_PARTNER}', 'ACASUSPEND', 'suspended');
  `);
});

describe("partner referral commissions", () => {
  it("records a pending RM17.70 commission for a verified RM59 payment", async () => {
    expect(await claim(STUDENT, "acapartner1")).toEqual({ claimed: true });
    const payment = await createCheckout(STUDENT, "premium");

    const link = await db.query(`select partner_user_id from public.partner_sandbox_checkout_links where payment_id = $1`, [
      payment.id,
    ]);
    expect(link.rows).toEqual([{ partner_user_id: PARTNER }]);

    await verifiedCallback(payment);
    const [row] = await commissions();
    expect(row).toMatchObject({
      payment_reference: payment.id,
      payment_number: 1,
      gross_amount: "59.00",
      commission_amount: "17.70",
      status: "pending",
      partner_user_id: PARTNER,
    });

    const window = await db.query<{ days: number }>(
      `select extract(day from c.review_available_at - p.paid_at)::int as days
         from public.partner_commissions c join public.payment_transactions p on p.id::text = c.payment_reference`,
    );
    expect(window.rows[0].days).toBe(30);

    const referral = await db.query(`select status, plan from public.partner_referrals where customer_reference = $1`, [STUDENT]);
    expect(referral.rows).toEqual([{ status: "active", plan: "premium" }]);
  });

  it("keeps checkout, subscription activation and invoicing unchanged", async () => {
    await claim(STUDENT, "ACAPARTNER1");
    const payment = await createCheckout(STUDENT, "premium");
    await verifiedCallback(payment);
    const state = await db.query(`
      select p.payment_status, s.status as subscription, s.plan, i.total, i.invoice_number like 'ACAD-%' as numbered, pr.plan as profile_plan
        from public.payment_transactions p
        join public.subscriptions s on s.id = p.subscription_id
        join public.invoices i on i.payment_transaction_id = p.id
        join public.profiles pr on pr.id = p.user_id
       where p.id = $1`, [payment.id]);
    expect(state.rows).toEqual([
      { payment_status: "successful", subscription: "active", plan: "premium", total: "59.00", numbered: true, profile_plan: "paid" },
    ]);
  });

  it("attributes an existing free student with abandoned checkouts and a brand-new registration", async () => {
    // Existing account: earlier pending/failed attempts (like the 15 Oct student) do not block a claim.
    const abandoned = await createCheckout(STUDENT, "premium");
    await db.query(`update public.payment_transactions set payment_status = 'failed' where id = $1`, [abandoned.id]);
    await createCheckout(STUDENT, "pro");
    expect(await claim(STUDENT, "ACAPARTNER1")).toEqual({ claimed: true });

    // New registration: on_auth_user_created inserts the profile with role 'student'.
    const NEW_STUDENT = "00000000-0000-4000-8000-0000000000b9";
    await db.query(`insert into auth.users (id) values ($1)`, [NEW_STUDENT]);
    await db.query(`insert into public.profiles (id) values ($1)`, [NEW_STUDENT]);
    expect(await claim(NEW_STUDENT, "ACAPARTNER2")).toEqual({ claimed: true });

    await verifiedCallback(await createCheckout(STUDENT, "premium"));
    await verifiedCallback(await createCheckout(NEW_STUDENT, "premium"));
    expect((await commissions(STUDENT)).map((row) => [row.partner_user_id, row.commission_amount])).toEqual([[PARTNER, "17.70"]]);
    expect((await commissions(NEW_STUDENT)).map((row) => [row.partner_user_id, row.commission_amount])).toEqual([
      [OTHER_PARTNER, "17.70"],
    ]);
  });

  it("creates no duplicate commission when the callback is replayed", async () => {
    await claim(STUDENT, "ACAPARTNER1");
    const payment = await createCheckout(STUDENT, "premium");
    await verifiedCallback(payment);
    const replay = await verifiedCallback(payment);
    expect(replay.already_processed).toBe(true);
    const direct = await db.query<{ r: { credited: boolean; reason: string } }>(
      `select public.partner_credit_verified_payment($1) as r`,
      [payment.id],
    );
    expect(direct.rows[0].r).toEqual({ credited: false, reason: "already_credited" });
    const legacyFlagPath = await db.query<{ r: { credited: boolean } }>(
      `select public.partner_credit_sandbox_upgrade($1) as r`,
      [payment.id],
    );
    expect(legacyFlagPath.rows[0].r.credited).toBe(false);
    expect(await commissions()).toHaveLength(1);
    const sandboxBills = await db.query(`select 1 from public.partner_sandbox_bills`);
    expect(sandboxBills.rows).toHaveLength(0);
  });

  it("keeps earning on the seventh and later renewals", async () => {
    await claim(STUDENT, "ACAPARTNER1");
    for (let month = 0; month < 8; month += 1) {
      await verifiedCallback(await createCheckout(STUDENT, "premium"));
    }
    const rows = await commissions();
    expect(rows.map((row) => row.payment_number)).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
    expect(rows[6]).toMatchObject({ payment_number: 7, commission_amount: "17.70", status: "pending" });
  });

  it("credits RM8.70 on a Pro payment", async () => {
    await claim(STUDENT, "ACAPARTNER1");
    await verifiedCallback(await createCheckout(STUDENT, "pro"));
    expect((await commissions())[0].commission_amount).toBe("8.70");
  });

  it("never reassigns a student to a later partner across renewals", async () => {
    await claim(STUDENT, "ACAPARTNER1");
    for (let month = 0; month < 3; month += 1) {
      expect(await claim(STUDENT, "ACAPARTNER2")).toEqual({ claimed: false, reason: "already_attributed" });
      const payment = await createCheckout(STUDENT, "premium");
      await db.query(`select public.partner_attach_sandbox_checkout($1, $2, 'ACAPARTNER2')`, [payment.id, STUDENT]);
      await verifiedCallback(payment);
    }
    expect((await commissions()).map((row) => row.partner_user_id)).toEqual([PARTNER, PARTNER, PARTNER]);
  });

  it("rejects self-referrals, inactive partners, unknown codes and non-students", async () => {
    expect(await claim(PARTNER, "ACAPARTNER1")).toEqual({ claimed: false, reason: "self_referral" });
    expect(await claim(STUDENT, "ACASUSPEND")).toEqual({ claimed: false, reason: "invalid_code" });
    expect(await claim(STUDENT, "NOPE999")).toEqual({ claimed: false, reason: "invalid_code" });
    expect(await claim(STUDENT, "<script>")).toEqual({ claimed: false, reason: "invalid_code" });
    expect(await claim(TEACHER, "ACAPARTNER1")).toEqual({ claimed: false, reason: "not_student" });
    const referrals = await db.query(`select 1 from public.partner_referrals`);
    expect(referrals.rows).toHaveLength(0);
  });

  it("rejects forged attribution for existing customers and other users", async () => {
    await verifiedCallback(await createCheckout(STUDENT, "premium"));
    expect(await claim(STUDENT, "ACAPARTNER1")).toEqual({ claimed: false, reason: "existing_customer" });

    const privileges = await db.query<Record<string, boolean>>(`
      select
        has_function_privilege('authenticated', 'public.partner_claim_referral(text)', 'execute') as claim_self,
        has_function_privilege('authenticated', 'public.partner_claim_referral_for(uuid,text,text)', 'execute') as claim_other,
        has_function_privilege('authenticated', 'public.partner_credit_verified_payment(uuid)', 'execute') as credit,
        has_function_privilege('anon', 'public.partner_claim_referral(text)', 'execute') as anon_claim
    `);
    expect(privileges.rows[0]).toEqual({ claim_self: true, claim_other: false, credit: false, anon_claim: false });
    await expect(db.query(`select public.partner_claim_referral('ACAPARTNER1')`)).rejects.toThrow(/Authentication required/);
  });

  it("does not attach attribution retroactively to a payment created before the claim", async () => {
    const early = await createCheckout(STUDENT, "premium");
    await claim(STUDENT, "ACAPARTNER1");
    await verifiedCallback(early);
    expect(await commissions()).toHaveLength(0);
  });

  it("never credits failed, unverified or mock payments", async () => {
    await claim(STUDENT, "ACAPARTNER1");
    const failed = await createCheckout(STUDENT, "premium");
    await db.query(`update public.payment_transactions set payment_status = 'failed' where id = $1`, [failed.id]);
    const unverified = await createCheckout(STUDENT, "premium");
    await db.query(`update public.payment_transactions set payment_status = 'successful' where id = $1`, [unverified.id]);
    const mock = await createCheckout(STUDENT, "premium", "mock");
    await verifiedCallback(mock);
    expect(await commissions()).toHaveLength(0);
  });

  it("reverses unpaid commissions on refund and leaves paid-out ones for review", async () => {
    await claim(STUDENT, "ACAPARTNER1");
    const first = await createCheckout(STUDENT, "premium");
    await verifiedCallback(first);
    const second = await createCheckout(STUDENT, "premium");
    await verifiedCallback(second);
    await db.query(`update public.partner_commissions set status = 'paid' where payment_reference = $1`, [first.id]);

    await db.query(`update public.payment_transactions set payment_status = 'refunded' where id = any($1::uuid[])`, [
      [first.id, second.id],
    ]);
    expect((await commissions()).map((row) => row.status)).toEqual(["paid", "reversed"]);
  });

  it("marks the referral cancelled when the subscription is cancelled", async () => {
    await claim(STUDENT, "ACAPARTNER1");
    await verifiedCallback(await createCheckout(STUDENT, "premium"));
    await db.query(`update public.subscriptions set status = 'cancelled' where user_id = $1`, [STUDENT]);
    const referral = await db.query(`select status from public.partner_referrals where customer_reference = $1`, [STUDENT]);
    expect(referral.rows).toEqual([{ status: "cancelled" }]);
  });

  it("never blocks a verified payment if commission bookkeeping fails", async () => {
    await claim(STUDENT, "ACAPARTNER1");
    await db.exec(`alter table public.partner_commissions add constraint force_failure check (commission_amount < 0) not valid`);
    const payment = await createCheckout(STUDENT, "premium");
    await verifiedCallback(payment);
    const status = await db.query(`select payment_status from public.payment_transactions where id = $1`, [payment.id]);
    expect(status.rows).toEqual([{ payment_status: "successful" }]);
    expect(await commissions()).toHaveLength(0);

    // The idempotent credit function repairs the ledger once the fault is fixed.
    await db.exec(`alter table public.partner_commissions drop constraint force_failure`);
    await db.query(`select public.partner_credit_verified_payment($1)`, [payment.id]);
    expect(await commissions()).toHaveLength(1);
  });

  it("keeps separate students independent", async () => {
    await claim(STUDENT, "ACAPARTNER1");
    await claim(SECOND_STUDENT, "ACAPARTNER2");
    await verifiedCallback(await createCheckout(STUDENT, "premium"));
    await verifiedCallback(await createCheckout(SECOND_STUDENT, "pro"));
    expect((await commissions(STUDENT))[0].partner_user_id).toBe(PARTNER);
    expect((await commissions(SECOND_STUDENT))[0].partner_user_id).toBe(OTHER_PARTNER);
  });
});
