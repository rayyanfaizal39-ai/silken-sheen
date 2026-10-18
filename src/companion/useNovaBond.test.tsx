// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createNovaBond } from "./personality";
import { useNovaBond } from "./useNovaBond";

const mocks = vi.hoisted(() => ({
  auth: { user: { id: "student-a" } as { id: string } | null, loading: false },
  read: vi.fn(),
  write: vi.fn(),
  owners: [] as string[],
}));
vi.mock("@/context/auth-context", () => ({ useAuth: () => mocks.auth }));
vi.mock("@/lib/supabase", () => ({
  isSupabaseConfigured: true,
  supabase: {
    from: () => ({
      select: () => ({
        eq: (_: string, owner: string) => {
          mocks.owners.push(owner);
          return { abortSignal: () => ({ maybeSingle: mocks.read }) };
        },
      }),
      upsert: (row: unknown) => ({ abortSignal: () => mocks.write(row) }),
    }),
  },
}));

(
  globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT: boolean }
).IS_REACT_ACT_ENVIRONMENT = true;
let state: ReturnType<typeof useNovaBond>;
let root: Root;
let host: HTMLDivElement;
function Harness() {
  state = useNovaBond();
  return <p>{state.bond?.name ?? "No bond"}</p>;
}
const render = async () => act(async () => root.render(<Harness />));
const bond = createNovaBond(
  Array(5).fill("steady"),
  "Stardust",
  new Date("2026-10-10T20:00Z"),
);

describe("Nova bond persistence", () => {
  beforeEach(() => {
    localStorage.clear();
    mocks.auth = { user: { id: "student-a" }, loading: false };
    mocks.owners = [];
    mocks.read.mockReset().mockResolvedValue({ data: null, error: null });
    mocks.write.mockReset().mockResolvedValue({ error: null });
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
  });
  afterEach(async () => {
    await act(async () => root.unmount());
    host.remove();
  });

  it("restores the database copy on a new device", async () => {
    mocks.read.mockResolvedValue({ data: { bond }, error: null });
    await render();
    expect(state.bond).toEqual(bond);
    expect(mocks.owners).toEqual(["student-a"]);
    expect(
      JSON.parse(localStorage.getItem("academy:nova-bond:v1:student-a")!),
    ).toEqual(bond);
  });
  it("saves only cosmetic preferences to the authenticated owner's row", async () => {
    await render();
    await act(async () => state.saveBond(bond));
    expect(mocks.write).toHaveBeenCalledWith({ user_id: "student-a", bond });
    expect(state.bond).toEqual(bond);
  });
  it("does not expose one student's result when the account changes", async () => {
    mocks.read.mockResolvedValueOnce({ data: { bond }, error: null });
    await render();
    expect(state.bond?.name).toBe("Stardust");
    mocks.auth = { user: { id: "student-b" }, loading: false };
    await render();
    expect(state.bond).toBeNull();
    expect(host.textContent).toBe("No bond");
    expect(mocks.owners).toEqual(["student-a", "student-b"]);
  });
  it("keeps a newer local copy during a delayed database read", async () => {
    const older = createNovaBond(
      Array(5).fill("curious"),
      "Old",
      new Date("2026-10-10T19:00Z"),
    );
    localStorage.setItem(
      "academy:nova-bond:v1:student-a",
      JSON.stringify(bond),
    );
    mocks.read.mockResolvedValue({ data: { bond: older }, error: null });
    await render();
    expect(state.bond).toEqual(bond);
  });
  it("does not claim a save succeeded when the database rejects it", async () => {
    mocks.write.mockResolvedValue({ error: { message: "unavailable" } });
    await render();
    await act(async () => {
      await expect(state.saveBond(bond)).rejects.toThrow("couldn’t save");
    });
    expect(state.bond).toBeNull();
    expect(localStorage.getItem("academy:nova-bond:v1:student-a")).toBeNull();
  });
  it("keeps a guest preview separate from signed-in records", async () => {
    mocks.auth = { user: null, loading: false };
    await render();
    await act(async () => state.saveBond(bond));
    expect(mocks.write).not.toHaveBeenCalled();
    expect(localStorage.getItem("academy:nova-bond:v1:guest")).not.toBeNull();
    mocks.auth = { user: { id: "student-a" }, loading: false };
    await render();
    expect(state.bond).toBeNull();
  });
});
