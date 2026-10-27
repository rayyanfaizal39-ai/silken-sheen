import sharp from "sharp";
import { describe, expect, it } from "vitest";
import {
  CompanionImageError,
  hashDistance,
  validateCompanionPng,
} from "../../../supabase/functions/_shared/companion-image";
import { batchJsonl, type Batch } from "../../../supabase/functions/_shared/nova-generation";
import { prepareCompanionSubmission } from "../../../supabase/functions/_shared/companion-submission";
import { TEST_DNA_SECRET, companionPng } from "./test-support/companion-pipeline";

const STUDENT = "00000000-0000-4000-8000-000000000001";
const ANSWERS = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];
const BATCH: Batch = {
  id: "local-batch",
  model: "gpt-image-2.5-flare-2026-09-08",
  endpoint: "/v1/images/generations",
  quality: "medium",
  status: "prepared",
  provider_batch_id: null,
};
const code = async (promise: Promise<unknown>) => {
  try {
    await promise;
  } catch (error) {
    return error instanceof CompanionImageError ? error.code : `other: ${(error as Error).message}`;
  }
  return "accepted";
};

describe("companion artwork checks (png-rgba-v1)", () => {
  it("accepts a transparent RGBA portrait and reports its checks and hash", async () => {
    const art = await validateCompanionPng(await companionPng("candidate-a"));
    expect(art.sha256).toMatch(/^[0-9a-f]{64}$/);
    expect(art.phash).toMatch(/^[0-9a-f]{16}$/);
    expect(art.checks).toMatchObject({
      validation: "png-rgba-v1",
      width: 1024,
      height: 1536,
      cornerAlphaMax: 0,
    });
    expect(art.checks.transparentPermille).toBeGreaterThan(500);
    expect(art.checks.subjectPermille).toBeGreaterThan(30);
    // Deterministic: the same file always gives the same hash.
    expect((await validateCompanionPng(await companionPng("candidate-a"))).phash).toBe(art.phash);
  }, 30_000);

  it("rejects images that must never reach review", async () => {
    expect(await code(validateCompanionPng(await companionPng("x", { opaque: true })))).toBe(
      "background_not_transparent",
    );
    expect(await code(validateCompanionPng(await companionPng("x", { rgb: true })))).toBe(
      "not_rgba",
    );
    const small = (
      await sharp({
        create: {
          width: 512,
          height: 768,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      })
        .png()
        .toBuffer()
    ).toString("base64");
    expect(await code(validateCompanionPng(small))).toBe("unsupported_png");
    const empty = (
      await sharp({
        create: {
          width: 1024,
          height: 1536,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      })
        .png()
        .toBuffer()
    ).toString("base64");
    expect(await code(validateCompanionPng(empty))).toBe("subject_too_small");
    expect(await code(validateCompanionPng("not-a-png"))).toBe("invalid_png");
    const valid = await companionPng("y");
    const corrupt = valid.slice(0, 200) + (valid[200] === "A" ? "B" : "A") + valid.slice(201);
    expect(await code(validateCompanionPng(corrupt))).toMatch(/^invalid_png/);
  }, 30_000);

  it("flags subjects that touch the edge for the reviewer", async () => {
    const edge = await sharp({
      create: {
        width: 1024,
        height: 1536,
        channels: 4,
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      },
    })
      .composite([
        {
          input: Buffer.from(
            '<svg xmlns="http://www.w3.org/2000/svg" width="1024" height="1536"><rect x="0" y="600" width="600" height="400" fill="#c06"/></svg>',
          ),
        },
      ])
      .png()
      .toBuffer();
    const art = await validateCompanionPng(edge.toString("base64"));
    expect(art.checks.warnings).toContain("subject_touches_edge");
  });

  it("separates different artworks by perceptual hash and matches identical ones", async () => {
    const hashes = await Promise.all(
      ["a1", "b2", "c3", "d4", "e5", "f6"].map(
        async (seed) => (await validateCompanionPng(await companionPng(seed))).phash,
      ),
    );
    expect(hashDistance(hashes[0], hashes[0])).toBe(0);
    const distances = hashes.slice(1).map((h) => hashDistance(hashes[0], h));
    expect(Math.max(...distances)).toBeGreaterThan(6);
  });
});

describe("companion generation requests", () => {
  it("compiles each candidate's request from its own Visual DNA", async () => {
    const { dna } = prepareCompanionSubmission(ANSWERS, STUDENT, TEST_DNA_SECRET);
    const requests = dna.map((d, i) => ({
      id: `r${i}`,
      custom_id: `nova_custom_${i}`,
      candidate_id: `c${i}`,
      candidate: d.slot,
      job_id: "job",
      card_id: "card",
      stage: 1,
      identity: {
        version: "nova-identity-v1" as const,
        answers: ANSWERS,
        traits: {},
        artDirection: "x",
      },
      promptVersion: "cc-art-v1",
      dna: d,
    }));
    const lines = (await batchJsonl(BATCH, requests, async () => ""))
      .trim()
      .split("\n")
      .map((l) => JSON.parse(l));
    expect(lines.map((l) => l.custom_id)).toEqual(["nova_custom_0", "nova_custom_1"]);
    for (const [i, line] of lines.entries()) {
      expect(line.body).toMatchObject({
        model: BATCH.model,
        background: "transparent",
        output_format: "png",
        size: "1024x1536",
        n: 1,
      });
      expect(line.body.prompt).toContain("prompt cc-art-v1");
      expect(line.body.prompt).toContain(dna[i].genes.pose);
      expect(line.body.prompt).not.toContain("Nova master art direction");
    }
    expect(lines[0].body.prompt).not.toBe(lines[1].body.prompt);
  });

  it("refuses a companion request without stored DNA", async () => {
    const request = {
      id: "r",
      custom_id: "nova_custom",
      candidate_id: "c",
      candidate: "a" as const,
      job_id: "job",
      card_id: "card",
      stage: 1,
      identity: {
        version: "nova-identity-v1" as const,
        answers: ANSWERS,
        traits: {},
        artDirection: "x",
      },
      promptVersion: "cc-art-v1",
    };
    await expect(batchJsonl(BATCH, [request], async () => "")).rejects.toThrow(/Visual DNA/);
  });
});
