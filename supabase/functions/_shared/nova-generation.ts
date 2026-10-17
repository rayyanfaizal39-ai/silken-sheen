import { validNovaAnswer } from "./nova-answers.ts";
// Provider-neutral contracts, also exercised by CI. No secrets or network at import time.
export type Identity = {
  version: "nova-identity-v1";
  answers: number[];
  traits: Record<string, string>;
  artDirection: string;
  previousArtwork?: string;
  originArtwork?: string;
};
export type GenerationRequest = {
  id: string;
  custom_id: string;
  candidate_id: string;
  candidate: "a" | "b";
  job_id: string;
  card_id: string;
  stage: number;
  identity: Identity;
};
export type Batch = {
  id: string;
  model: string;
  endpoint: "/v1/images/generations" | "/v1/images/edits";
  quality: "low" | "medium";
  status: string;
  provider_batch_id: string | null;
};
const TRAITS = [
  "personality",
  "creature",
  "element",
  "appearance",
  "colours",
  "ability",
  "habitat",
  "behaviour",
  "eyes",
  "marking",
  "approach",
  "bond",
] as const;
const STAGE_DIRECTION = [
  "Origin: precious, charming earliest beautiful form. Establish a memorable friendly face.",
  "Awakened: slightly more mature and confident. Develop anatomical wing/tail/ear details and refined magic.",
  "Ascended: stronger refined posture, sophisticated anatomy and elegant evolved features.",
  "Mythic: majestic, rare, breathtaking detail and atmospheric grandeur.",
  "Legendary: fully realized iconic masterpiece, exquisite detail and memorable silhouette.",
];
export function artPrompt(r: GenerationRequest): string {
  const identity = r.identity;
  if (
    identity.version !== "nova-identity-v1" ||
    identity.answers.length !== 12 ||
    identity.answers.some((a, i) => !validNovaAnswer(i, a)) ||
    !Number.isInteger(r.stage) ||
    r.stage < 1 ||
    r.stage > 5 ||
    (r.stage > 1 && r.candidate !== "a")
  )
    throw new Error("Invalid permanent identity");
  // Allowlisted trait strings only; no username, account ID, answers or other PII goes to OpenAI.
  const profile = TRAITS.map((key) => {
    const value = identity.traits[key];
    if (typeof value !== "string" || value.length > 100) throw new Error("Invalid trait");
    return `${key}: ${value}`;
  }).join("\n");
  return `Nova master art direction v1. Cinematic fantasy collectible illustration, ART ONLY.
${profile}
${STAGE_DIRECTION[r.stage - 1]}
Lovable, friendly, cute yet noble magical creature. Clear expressive radiant eyes, luxurious
layered fur or feathers, meaningful integrated celestial markings, tasteful gold filigree and
a single elegant crystal ornament. Rich jewel tones harmonious with navy, gold and violet.
Portrait 3/4 or full body, readable silhouette and face, clean composition, detailed atmospheric
habitat supporting the hero. Soft cinematic rim light, refined magical bloom, polished texture.
${
  r.stage === 1
    ? r.candidate === "a"
      ? "Composition A: calm three-quarter portrait, warm curious gaze toward viewer, graceful poised stance, magic cradled close."
      : "Composition B: dynamic full-body diagonal composition, playful delighted expression, looking over shoulder, flowing elemental magic leading outward. Clearly different pose and framing from a calm portrait."
    : "EDIT the supplied approved images: image 1 is the previous stage; image 2 is the permanent Origin anchor. Preserve exact species, recognizable face structure, eye design, main palette, signature markings and personality. Evolve the same character, never substitute a new animal. Phoenix: more elegant developed wings and flowing flame feathers. Magical Fox: richer fluffy tails, ears and water/celestial detail. Dragon: refined rounded horns, developed membrane wings, scales and a flowing tail. Lion: fuller regal mane, rounded ears, strong gentle paws and a tufted tail. Unicorn: elegant spiral horn, flowing mane, feathered hooves and a luminous tail. Apply only the selected species' anatomy. Friendly and approachable at every stage."
}
Avoid text, names, logos, typography, watermarks, borders, QR, barcodes, card frames, horror,
aggression, uncanny human face, flat vector cartoon, muddy colours, extra limbs, distorted
anatomy, broken ornaments, clutter, random props or blown-out highlights.`;
}

export async function batchJsonl(
  batch: Batch,
  requests: GenerationRequest[],
  reference: (path: string) => Promise<string>,
): Promise<string> {
  if (
    !/^gpt-image-2\.5-(flare|sunburst)(-2026-09-08)?$/.test(batch.model) ||
    !["low", "medium"].includes(batch.quality) ||
    requests.length < 1 ||
    requests.length > 8
  )
    throw new Error("Unsupported batch configuration");
  const seen = new Set<string>();
  const lines: string[] = [];
  for (const r of requests) {
    if (seen.has(r.custom_id)) throw new Error("Duplicate custom_id");
    seen.add(r.custom_id);
    const edit = r.stage > 1;
    if (edit !== (batch.endpoint === "/v1/images/edits")) throw new Error("Mixed endpoints");
    const body: Record<string, unknown> = {
      model: batch.model,
      prompt: artPrompt(r),
      n: 1,
      quality: batch.quality,
      size: "1024x1536",
      output_format: "png",
      moderation: "auto",
    };
    if (edit) {
      if (!r.identity.previousArtwork || !r.identity.originArtwork)
        throw new Error("Approved reference missing");
      body.images = await Promise.all(
        [r.identity.previousArtwork, r.identity.originArtwork].map(async (path) => {
          if (!path.startsWith(`${r.card_id}/`)) throw new Error("Reference owner mismatch");
          return { image_url: await reference(path) };
        }),
      );
    }
    lines.push(
      JSON.stringify({ custom_id: r.custom_id, method: "POST", url: batch.endpoint, body }),
    );
  }
  return lines.join("\n") + "\n";
}

export type ProviderBatch = {
  id: string;
  status: string;
  input_file_id?: string;
  output_file_id?: string | null;
  error_file_id?: string | null;
  metadata?: Record<string, string>;
};
export interface BatchProvider {
  submit(jsonl: string, batch: Batch): Promise<ProviderBatch>;
  retrieve(id: string): Promise<ProviderBatch>;
  file(id: string): Promise<string>;
}
export class OpenAIBatchProvider implements BatchProvider {
  constructor(
    private key: string,
    private http: typeof fetch = fetch,
  ) {
    if (!key) throw new Error("Server OpenAI key missing");
  }
  private async api(path: string, init: RequestInit = {}) {
    const res = await this.http(`https://api.openai.com/v1${path}`, {
      ...init,
      headers: { Authorization: `Bearer ${this.key}`, ...init.headers },
      signal: AbortSignal.timeout(45000),
    });
    if (!res.ok) throw new Error(`provider_http_${res.status}`);
    return res;
  }
  async submit(jsonl: string, batch: Batch) {
    const form = new FormData();
    form.append("purpose", "batch");
    form.append("file", new Blob([jsonl], { type: "application/jsonl" }), "nova.jsonl");
    const file = (await (await this.api("/files", { method: "POST", body: form })).json()) as {
      id: string;
    };
    // Intentionally no automatic retries: a timeout can mean OpenAI accepted the batch.
    return (await (
      await this.api("/batches", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input_file_id: file.id,
          endpoint: batch.endpoint,
          completion_window: "24h",
          metadata: { nova_batch_id: batch.id, prompt_version: "nova-art-v1" },
        }),
      })
    ).json()) as ProviderBatch;
  }
  async retrieve(id: string) {
    if (!/^batch_[\w-]+$/.test(id)) throw new Error("Invalid batch ID");
    return (await (await this.api(`/batches/${id}`)).json()) as ProviderBatch;
  }
  async file(id: string) {
    if (!/^file-[\w-]+$/.test(id) && !/^file_[\w-]+$/.test(id)) throw new Error("Invalid file ID");
    const res = await this.api(`/files/${id}/content`);
    return limitedText(res, 100 * 1024 * 1024);
  }
}
export async function limitedText(res: Response, max: number) {
  if (!res.body) throw new Error("Empty provider file");
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let count = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      count += value.length;
      if (count > max) throw new Error("Provider file exceeds limit");
      chunks.push(value);
    }
  } finally {
    await reader.cancel();
  }
  const bytes = new Uint8Array(count);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.length;
  }
  return new TextDecoder().decode(bytes);
}

export type BatchResult = {
  custom_id: string;
  response?: {
    status_code: number;
    request_id?: string;
    body?: { data?: { b64_json?: string }[]; usage?: Record<string, unknown> };
  };
  error?: { code?: string };
};
export function associateResults(texts: string[], requests: GenerationRequest[]) {
  const expected = new Set(requests.map((r) => r.custom_id));
  const results = new Map<string, BatchResult>();
  for (const text of texts)
    for (const line of text.split("\n").filter((x) => x.trim())) {
      const r = JSON.parse(line) as BatchResult;
      if (!expected.has(r.custom_id) || results.has(r.custom_id))
        throw new Error("Unexpected or duplicate custom_id");
      results.set(r.custom_id, r);
    }
  return results;
}

// Strict PNG integrity + complete decompression, rather than trusting a MIME type or magic bytes.
export async function validatePng(base64: string) {
  if (base64.length > 32 * 1024 * 1024 || !/^[A-Za-z0-9+/]+={0,2}$/.test(base64))
    throw new Error("invalid_png");
  const bytes = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
  const view = new DataView(bytes.buffer);
  if (bytes.length < 45 || bytes.slice(0, 8).join(",") !== "137,80,78,71,13,10,26,10")
    throw new Error("invalid_png");
  let offset = 8,
    width = 0,
    height = 0,
    channels = 0,
    ended = false;
  const data: Uint8Array[] = [];
  while (offset + 12 <= bytes.length) {
    const len = view.getUint32(offset),
      start = offset + 4,
      end = start + 4 + len;
    if (end + 4 > bytes.length) throw new Error("invalid_png");
    const type = new TextDecoder().decode(bytes.slice(start, start + 4));
    let crc = 0xffffffff;
    for (let i = start; i < end; i++) {
      crc ^= bytes[i];
      for (let b = 0; b < 8; b++) crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
    if ((crc ^ 0xffffffff) >>> 0 !== view.getUint32(end)) throw new Error("invalid_png_crc");
    if (offset === 8 && type !== "IHDR") throw new Error("invalid_png");
    if (type === "IHDR") {
      if (width || len !== 13) throw new Error("invalid_png");
      width = view.getUint32(start + 4);
      height = view.getUint32(start + 8);
      channels = bytes[start + 13] === 6 ? 4 : bytes[start + 13] === 2 ? 3 : 0;
      if (
        width !== 1024 ||
        height !== 1536 ||
        bytes[start + 12] !== 8 ||
        !channels ||
        bytes[start + 14] !== 0 ||
        bytes[start + 15] !== 0 ||
        bytes[start + 16] !== 0
      )
        throw new Error("unsupported_png");
    } else if (type === "IDAT") data.push(bytes.slice(start + 4, end));
    else if (type === "IEND") {
      if (len !== 0 || end + 4 !== bytes.length) throw new Error("invalid_png");
      ended = true;
      break;
    }
    offset = end + 4;
  }
  if (!ended || !data.length) throw new Error("invalid_png");
  const stream = new Blob(data as BlobPart[])
    .stream()
    .pipeThrough(new DecompressionStream("deflate"));
  const reader = stream.getReader();
  let total = 0;
  const row = width * channels + 1,
    expected = height * row;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (total + value.length > expected) throw new Error("invalid_png_size");
      for (let i = (row - (total % row)) % row; i < value.length; i += row)
        if (value[i] > 4) throw new Error("invalid_png_filter");
      total += value.length;
    }
  } finally {
    await reader.cancel();
  }
  if (total !== expected) throw new Error("invalid_png_size");
  const hash = await crypto.subtle.digest("SHA-256", bytes);
  return {
    bytes,
    sha256: Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, "0")).join(""),
  };
}

// Conservative, uncached STANDARD input rates, BATCH output rate, USD micro-units.
// Actual invoiced cost remains authoritative. Missing usage is logged as unknown, never zero.
export function estimatedCost(usage: Record<string, unknown> | undefined): number | null {
  const details = usage?.input_tokens_details as
    | { text_tokens?: number; image_tokens?: number }
    | undefined;
  const output = usage?.output_tokens;
  if (
    !details ||
    typeof details.text_tokens !== "number" ||
    typeof details.image_tokens !== "number" ||
    typeof output !== "number"
  )
    return null;
  const values = [details.text_tokens, details.image_tokens, output];
  if (values.some((x) => !Number.isSafeInteger(x) || x < 0)) return null;
  return Math.ceil(values[0] * 5 + values[1] * 8 + values[2] * 15);
}

export class MockBatchProvider implements BatchProvider {
  readonly submissions: { jsonl: string; batch: Batch }[] = [];
  constructor(private fixtures: Record<string, string>) {}
  async submit(jsonl: string, batch: Batch) {
    this.submissions.push({ jsonl, batch });
    return { id: `batch_mock_${batch.id}`, status: "in_progress" };
  }
  async retrieve(id: string) {
    return { id, status: "completed", output_file_id: "file_mock" };
  }
  async file() {
    return Object.entries(this.fixtures)
      .reverse()
      .map(([custom_id, b64_json]) =>
        JSON.stringify({
          custom_id,
          response: {
            status_code: 200,
            request_id: `req_${custom_id}`,
            body: {
              data: [{ b64_json }],
              usage: {
                input_tokens_details: { text_tokens: 100, image_tokens: 0 },
                output_tokens: 1000,
              },
            },
          },
        }),
      )
      .join("\n");
  }
}
