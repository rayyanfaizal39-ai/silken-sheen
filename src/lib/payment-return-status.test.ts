import { AuthRetryableFetchError, AuthSessionMissingError } from "@supabase/supabase-js";
import type { SupabaseClient } from "@supabase/supabase-js";
import { describe, expect, it } from "vitest";
import { lookupPaymentReturn } from "./payment-return-status.server";

const OWNER = "00000000-0000-4000-8000-0000000000b1";
const OTHER = "00000000-0000-4000-8000-0000000000b2";
const ADMIN = "00000000-0000-4000-8000-0000000000ad";
const PAID = "8cd3745b-0000-4000-8000-000000000001";
const PENDING = "e0584679-0000-4000-8000-000000000002";

type Row = Record<string, unknown>;
const tables: Record<string, Row[]> = {
  payment_transactions: [
    {
      id: PAID,
      user_id: OWNER,
      provider: "toyyibpay",
      plan: "premium",
      amount: "59.00",
      currency: "MYR",
      payment_status: "successful",
    },
    {
      id: PENDING,
      user_id: OWNER,
      provider: "toyyibpay",
      plan: "pro",
      amount: "29.00",
      currency: "MYR",
      payment_status: "pending",
    },
  ],
  invoices: [
    { payment_transaction_id: PAID, user_id: OWNER, invoice_number: "ACAD-20261017-000123" },
  ],
};

/** Applies only the query's own filters: like an admin session that RLS lets read every row. */
function client(
  user: string | null,
  options: { authError?: unknown; failTable?: string } = {},
): SupabaseClient {
  return {
    auth: {
      getUser: async () => ({
        data: { user: user ? { id: user } : null },
        error: options.authError ?? (user ? null : new AuthSessionMissingError()),
      }),
    },
    from(table: string) {
      const filters: [string, unknown][] = [];
      const query = {
        select: () => query,
        eq: (column: string, value: unknown) => {
          filters.push([column, value]);
          return query;
        },
        maybeSingle: async () => {
          if (options.failTable === table) return { data: null, error: { message: "timeout" } };
          const rows = tables[table].filter((row) => filters.every(([c, v]) => row[c] === v));
          return { data: rows[0] ?? null, error: null };
        },
      };
      return query;
    },
  } as unknown as SupabaseClient;
}

describe("payment return status", () => {
  it("shows the owner their verified successful payment and invoice", async () => {
    expect(await lookupPaymentReturn(client(OWNER), PAID)).toEqual({
      state: "found",
      paymentId: PAID,
      plan: "premium",
      amount: 59,
      currency: "MYR",
      status: "successful",
      invoiceNumber: "ACAD-20261017-000123",
    });
  });
  it("shows a pending payment so the page can keep polling", async () => {
    expect(await lookupPaymentReturn(client(OWNER), PENDING)).toMatchObject({
      state: "found",
      status: "pending",
      invoiceNumber: null,
    });
  });
  it("never shows another student's payment, even to an admin that RLS would allow", async () => {
    for (const viewer of [OTHER, ADMIN]) {
      expect(await lookupPaymentReturn(client(viewer), PAID)).toEqual({ state: "not_found" });
    }
  });
  it("answers identically for another account's payment and a non-existent one", async () => {
    expect(await lookupPaymentReturn(client(OTHER), PAID)).toEqual(
      await lookupPaymentReturn(client(OTHER), "00000000-0000-4000-8000-00000000dead"),
    );
  });
  it("reports a missing server session as signed out, not as a missing payment", async () => {
    expect(await lookupPaymentReturn(client(null), PAID)).toEqual({ state: "signed_out" });
  });
  it("reports temporary failures as unavailable", async () => {
    expect(await lookupPaymentReturn(null, PAID)).toEqual({ state: "unavailable" });
    expect(
      await lookupPaymentReturn(
        client(null, { authError: new AuthRetryableFetchError("offline", 0) }),
        PAID,
      ),
    ).toEqual({ state: "unavailable" });
    expect(
      await lookupPaymentReturn(client(OWNER, { failTable: "payment_transactions" }), PAID),
    ).toEqual({ state: "unavailable" });
  });
  it("still confirms a successful payment when the invoice cannot be read", async () => {
    expect(await lookupPaymentReturn(client(OWNER, { failTable: "invoices" }), PAID)).toMatchObject(
      { state: "found", status: "successful", invoiceNumber: null },
    );
  });
});
