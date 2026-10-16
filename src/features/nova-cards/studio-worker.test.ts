import { readFileSync } from "node:fs";
import sharp from "sharp";
import { beforeAll, describe, expect, it, vi } from "vitest";
import { DEMO_CARDS } from "./model";
import { companionSvg } from "./artwork";
import {
  artPrompt,
  associateResults,
  batchJsonl,
  estimatedCost,
  MockBatchProvider,
  OpenAIBatchProvider,
  validatePng,
  type Batch,
  type GenerationRequest,
} from "../../../supabase/functions/_shared/nova-generation";
import { runNovaWorker, type WorkerStore } from "../../../supabase/functions/_shared/nova-worker";

const batch: Batch = {
  id: "local-batch",
  model: "gpt-image-2.5-flare-2026-09-08",
  endpoint: "/v1/images/generations",
  quality: "medium",
  status: "prepared",
  provider_batch_id: null,
};
function request(candidate: "a" | "b", profile = 0): GenerationRequest {
  return {
    id: `request-${profile}-${candidate}`,
    custom_id: `opaque_${profile}_${candidate}`,
    candidate_id: `candidate-${profile}-${candidate}`,
    candidate,
    job_id: `job-${profile}`,
    card_id: `card-${profile}`,
    stage: 1,
    identity: {
      version: "nova-identity-v1",
      answers: profile ? [0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0] : Array(12).fill(0),
      traits: { ...DEMO_CARDS[profile].traits },
      artDirection: "nova-master-art-direction-v1",
    },
  };
}
let images: string[];
beforeAll(async () => {
  images = await Promise.all(
    [0, 1].map(async (i) =>
      (
        await sharp(Buffer.from(companionSvg(DEMO_CARDS[i].traits, "a")))
          .resize(1024, 1536)
          .removeAlpha()
          .png()
          .toBuffer()
      ).toString("base64"),
    ),
  );
});
function memoryStore() {
  const current = { ...batch };
  const requests = [request("a"), request("b")];
  const outcomes: Parameters<WorkerStore["finish"]>[0][] = [];
  const uploaded = new Map<string, Uint8Array>();
  const store: WorkerStore = {
    batches: async () => [current],
    prepare: async () => {},
    begin: async () => {
      if (current.status !== "prepared") return false;
      current.status = "submitting";
      return true;
    },
    requests: async () => requests,
    reference: async () => {
      throw new Error("Unexpected Origin reference");
    },
    attach: async (_, id) => {
      current.provider_batch_id = id;
      current.status = "submitted";
    },
    review: async () => {
      current.status = "review";
    },
    claim: async () => {
      if (current.status !== "submitted") return null;
      current.status = "collecting";
      return "lease";
    },
    upload: async (path, bytes) => {
      uploaded.set(path, bytes);
    },
    finish: async (input) => {
      outcomes.push(input);
    },
    collected: async (_, __, status) => {
      current.status = status;
    },
    release: async () => {},
  };
  return { store, current, requests, outcomes, uploaded };
}
describe("Nova Batch provider contracts and crash safety", () => {
  it("builds two distinct n=1 Origin JSONL requests without student PII", async () => {
    const requests = [request("a"), request("b")];
    for (const profile of [0, 1]) {
      const a = artPrompt(request("a", profile)),
        b = artPrompt(request("b", profile));
      expect(a).not.toBe(b);
      for (const value of Object.values(DEMO_CARDS[profile].traits)) {
        expect(a).toContain(value);
        expect(b).toContain(value);
      }
      expect(a).not.toMatch(/Rayyan|Mia|email|school_id|owner_id|card-0/);
    }
    const lines = (await batchJsonl(batch, requests, async () => ""))
      .trim()
      .split("\n")
      .map((s) => JSON.parse(s));
    expect(new Set(lines.map((r) => r.custom_id)).size).toBe(2);
    for (const line of lines)
      expect(line).toMatchObject({
        method: "POST",
        url: "/v1/images/generations",
        body: { n: 1, output_format: "png", size: "1024x1536", moderation: "auto" },
      });
    await expect(batchJsonl(batch, [requests[0], requests[0]], async () => "")).rejects.toThrow(
      /Duplicate/,
    );
  });
  it("uses durable approved Origin + previous artwork references for supported JSON Batch edits", async () => {
    const edit = { ...request("a"), stage: 2 };
    edit.identity = {
      ...edit.identity,
      previousArtwork: "card-0/approved2.png",
      originArtwork: "card-0/approved1.png",
    };
    const reference = vi.fn(async (path) => `data:image/png;base64,${path}`);
    const line = JSON.parse(
      (
        await batchJsonl(
          { ...batch, endpoint: "/v1/images/edits", model: "gpt-image-2.5-sunburst" },
          [edit],
          reference,
        )
      ).trim(),
    );
    expect(reference).toHaveBeenCalledTimes(2);
    expect(line.body.images).toHaveLength(2);
    expect(line.body.prompt).toMatch(/Preserve exact species, recognizable face structure/);
    expect(line.body).not.toHaveProperty("input_fidelity");
    await expect(batchJsonl(batch, [edit], reference)).rejects.toThrow(/Mixed endpoints/);
  });
  it("maps shuffled results by custom_id and rejects unknown or duplicated results", async () => {
    const requests = [request("a"), request("b", 1)];
    const provider = new MockBatchProvider({
      [requests[0].custom_id]: images[0],
      [requests[1].custom_id]: images[1],
    });
    const file = await provider.file();
    const mapped = associateResults([file], requests);
    expect(mapped.get(requests[0].custom_id)?.response?.body?.data?.[0].b64_json).toBe(images[0]);
    expect(() => associateResults([file, file], requests)).toThrow(/duplicate/);
    expect(() => associateResults([file], [requests[0]])).toThrow(/Unexpected/);
    const [a, b] = await Promise.all(images.map(validatePng));
    expect(a.sha256).not.toBe(b.sha256);
    const corrupt = Buffer.from(images[0], "base64");
    corrupt[60] ^= 1;
    await expect(validatePng(corrupt.toString("base64"))).rejects.toThrow(/invalid_png/);
    await expect(validatePng(Buffer.from("<svg/>").toString("base64"))).rejects.toThrow(
      /invalid_png/,
    );
  });
  it("processes mocked generation, survives repeated ticks, and collects exactly two validated images", async () => {
    const { store, current, requests, outcomes, uploaded } = memoryStore();
    const provider = new MockBatchProvider(
      Object.fromEntries(requests.map((r, i) => [r.custom_id, images[i]])),
    );
    await runNovaWorker(store, provider, { enabled: false, batchEnabled: false });
    expect(provider.submissions).toHaveLength(0);
    await runNovaWorker(store, provider, { enabled: true, batchEnabled: true });
    expect(provider.submissions).toHaveLength(1);
    await runNovaWorker(store, provider, { enabled: true, batchEnabled: true });
    expect(current.status).toBe("completed");
    expect(outcomes).toHaveLength(2);
    expect(uploaded.size).toBe(2);
    expect(outcomes.every((o) => o.digest?.length === 64 && o.cost_microusd === 15500)).toBe(true);
    await runNovaWorker(store, provider, { enabled: true, batchEnabled: true });
    expect(provider.submissions).toHaveLength(1);
  });
  it("never resubmits an uncertain paid creation, even on the next tick", async () => {
    const { store, current } = memoryStore();
    const submit = vi.fn(async () => {
      throw new Error("Connection lost after acceptance");
    });
    const provider = { submit, retrieve: vi.fn(), file: vi.fn() };
    await runNovaWorker(store, provider, { enabled: true, batchEnabled: true });
    expect(current.status).toBe("review");
    await runNovaWorker(store, provider, { enabled: true, batchEnabled: true });
    expect(submit).toHaveBeenCalledTimes(1);
  });
  it("uploads Batch files with purpose=batch and explicitly sets 24h without automatic retry", async () => {
    const responses = [{ id: "file-input" }, { id: "batch_contract", status: "validating" }];
    const http = vi.fn(
      async () => new Response(JSON.stringify(responses.shift()), { status: 200 }),
    );
    const provider = new OpenAIBatchProvider("fake-test-key", http as typeof fetch);
    await provider.submit("{}\n", batch);
    expect((http.mock.calls as unknown[][])[0][0]).toBe("https://api.openai.com/v1/files");
    const options = (http.mock.calls as unknown[][])[1][1] as RequestInit;
    expect(JSON.parse(options.body as string)).toMatchObject({
      completion_window: "24h",
      endpoint: "/v1/images/generations",
      metadata: { nova_batch_id: batch.id },
    });
    expect(estimatedCost(undefined)).toBeNull();
  });
  it("keeps the dashboard import graph free of artwork, QR and card renderers", () => {
    const source = readFileSync(new URL("./NovaStatusLink.tsx", import.meta.url), "utf8");
    expect(source).not.toMatch(/from ['"].*(NovaCard|artwork|codes|StudioPage)/);
    const route = readFileSync(new URL("../../routes/nova_.studio.tsx", import.meta.url), "utf8");
    expect(route).toContain("lazy(");
  });
});
