// Cosmic Companion Visual DNA (Phase 4B): a unique, immutable visual specification per candidate,
// and the deterministic compiler that turns it into an image-generation request.
//
// * The identity lock never varies: species anatomy, the archetype's proportions, silhouette and
//   signature feature, element and personality. Genes vary everything else, from curated,
//   species-compatible, versioned pools.
// * Genes are chosen by HMAC(server secret, version | student | slot | candidate fingerprint):
//   unique per student, reproducible on the server, unpredictable and unforgeable elsewhere.
// * Prompts are compiled only from DNA whose every value is checked against these tables. No
//   nickname, student ID, secret or raw answer text can reach a provider prompt.
import type { CompanionCandidateSpec } from "./companion-matcher.ts";
import type { Element, Personality, Species } from "./companion-catalogue.ts";
import { canonicalJson, hmacSha256Hex, sha256Hex } from "./content-fingerprint.ts";

export const DNA_SCHEMA = "cosmic-companion-dna/1";
export const DNA_VERSION = "cc-dna-v1";
export const GENE_POOL_VERSION = "cc-genes-v1";
export const STYLE_VERSION = "cc-style-v1";
export const PROMPT_VERSION = "cc-art-v1";

/** The official AcadeMY art direction shared by every companion (versioned). */
export const ACADEMY_ART_STYLE = [
  "Premium stylised 3D baby fantasy creature for a collectible card.",
  "Rounded, compact, cute proportions with an oversized head and large expressive eyes.",
  "Friendly, emotionally appealing face; gentle and noble, never scary.",
  "High-quality soft materials: velvety fur, downy feathers or smooth satin scales.",
  "Soft, consistent studio lighting with a gentle rim light; clean readable silhouette.",
  "Restrained magical effects that support the character without clutter.",
].join(" ");

type Covering = "fur" | "feathers" | "scales" | "coat";
export interface Anatomy {
  body: string;
  covering: Covering;
  eyes: 2;
  legs: number;
  wings: number;
  horns: number;
  tails: 1;
}
/** Fixed anatomy per species. Genes can style these features but never add or remove them. */
export const ANATOMY: Record<Species, Anatomy> = {
  "Magical Fox": {
    body: "baby fox kit",
    covering: "fur",
    eyes: 2,
    legs: 4,
    wings: 0,
    horns: 0,
    tails: 1,
  },
  Phoenix: {
    body: "baby phoenix chick",
    covering: "feathers",
    eyes: 2,
    legs: 2,
    wings: 2,
    horns: 0,
    tails: 1,
  },
  Dragon: {
    body: "baby dragon",
    covering: "scales",
    eyes: 2,
    legs: 4,
    wings: 2,
    horns: 2,
    tails: 1,
  },
  Lion: { body: "baby lion cub", covering: "fur", eyes: 2, legs: 4, wings: 0, horns: 0, tails: 1 },
  Unicorn: {
    body: "baby unicorn foal",
    covering: "coat",
    eyes: 2,
    legs: 4,
    wings: 0,
    horns: 1,
    tails: 1,
  },
};

const FACE_SHAPES = [
  "extra-round chubby cheeks",
  "a soft heart-shaped face",
  "a wide, button-cute face",
  "a small delicate face with a broad forehead",
  "plush, squishy cheeks",
] as const;
const EXPRESSIONS: Record<Personality, readonly string[]> = {
  Explorer: [
    "bright, curious wide-eyed wonder",
    "an excited open-mouthed grin",
    "a playful head tilt and lopsided smile",
    "an eager, adventurous sparkle in the eyes",
  ],
  Nurturer: [
    "a warm, gentle closed-eye smile",
    "soft, caring eyes and a tender smile",
    "a calm, comforting half-smile",
    "a shy, sweet smile with relaxed brows",
  ],
  Strategist: [
    "a thoughtful, focused gaze",
    "a small knowing smile",
    "attentive eyes with one brow slightly raised",
    "a calm, quietly confident expression",
  ],
  Guardian: [
    "a brave, determined little smile",
    "a steady, protective gaze",
    "a confident chin-up grin",
    "a kind but resolute expression",
  ],
};
const IRISES = [
  "starburst irises",
  "concentric glowing ring irises",
  "soft gradient irises",
  "speckled irises like tiny galaxies",
  "swirl-patterned irises",
] as const;
const HIGHLIGHTS = [
  "two bright star-shaped highlights",
  "one large round sparkle and one small sparkle",
  "crescent-shaped highlights",
  "soft diamond-shaped glints",
] as const;
const PATTERNS: Record<Covering, readonly string[]> = {
  fur: [
    "a gentle gradient from back to belly",
    "soft dappled spots",
    "faint stripes along the back",
    "a two-tone saddle pattern",
    "frosted fur tips",
  ],
  feathers: [
    "layered scalloped feathers",
    "gradient feather tips",
    "speckled downy feathers",
    "banded wing feathers",
    "an iridescent sheen on the feather edges",
  ],
  scales: [
    "tiny pearlescent scales",
    "rounded belly plates with tiny back scales",
    "a diamond pattern of small scales",
    "speckled scales",
    "a gradient of scales from back to belly",
  ],
  coat: [
    "a smooth satin coat with a soft gradient",
    "a dappled coat",
    "frosted coat tips",
    "a two-tone coat with lighter legs",
    "a subtly shimmering coat",
  ],
};
const MARKING_SHAPES: Record<Element, readonly string[]> = {
  Fire: ["small flame-shaped marks", "ember speckles", "sun-ray streaks", "spiral ember swirls"],
  Water: ["droplet marks", "wave-shaped stripes", "ripple rings", "bubble-like dots"],
  Starlight: ["tiny star marks", "small crescent moons", "constellation dots", "sparkle freckles"],
  Wind: ["swirl marks", "feather-like streaks", "leaf-shaped marks", "breeze curls"],
};
const MARKING_PLACES: Record<Species, readonly string[]> = {
  "Magical Fox": ["on the cheeks", "along the tail", "on the forehead", "on the paws"],
  Lion: ["on the cheeks", "on the shoulders", "on the paws", "along the tail tuft"],
  Unicorn: ["on the flank", "on the hooves", "along the mane", "on the forehead below the horn"],
  Phoenix: ["on the wing tips", "on the chest", "around the eyes", "along the tail plume"],
  Dragon: ["along the back ridge", "on the wings", "on the cheeks", "along the tail"],
};
const HEAD_FEATURES: Record<Species, readonly string[]> = {
  "Magical Fox": [
    "tall rounded ears with fluffy tufts",
    "large soft ears with darker tips",
    "rounded ears with star-shaped inner fur",
    "slightly floppy ear tips",
  ],
  Lion: [
    "a cloud-soft round mane",
    "a wind-swept fluffy mane",
    "a short tufted mane with a curly fringe",
    "a sunburst-shaped mane",
  ],
  Unicorn: [
    "a short smooth spiral horn",
    "a pearly ridged spiral horn",
    "a crystal-clear spiral horn",
    "a gently glowing spiral horn",
  ],
  Phoenix: [
    "a three-plume crest",
    "a single curled crest feather",
    "a fan-shaped crest",
    "a tufted starburst crest",
  ],
  Dragon: [
    "two short nub horns",
    "two small curled horns",
    "two smooth swept-back horns",
    "two tiny crystal-tipped horns",
  ],
};
const TAILS: Record<Species, readonly string[]> = {
  "Magical Fox": [
    "one huge fluffy tail curled around the body",
    "one plume tail with a bright tip",
    "one bushy tail held high",
    "one sweeping tail with a soft curl",
  ],
  Lion: [
    "a thin tail with a fluffy tuft",
    "a tail with a heart-shaped tuft",
    "a curled tail with a glowing tuft",
    "a tail with a star-shaped tuft",
  ],
  Unicorn: [
    "a flowing silky tail",
    "a wavy tail with soft curls",
    "a long tail with glowing strands",
    "a fluffy cloud-like tail",
  ],
  Phoenix: [
    "a tail of two long ribbon feathers",
    "a tail fan of short plumes",
    "a tail of three curling feathers",
    "a tail of one long sweeping plume",
  ],
  Dragon: [
    "a short thick tail with a rounded tip",
    "a curling tail with a small fin",
    "a tail with a spade-shaped tip",
    "a tail with a soft ridge of tiny rounded spikes",
  ],
};
const ELEMENTAL_EFFECTS: Record<Element, readonly string[]> = {
  Fire: [
    "a few gently drifting embers",
    "a soft warm glow around its feet",
    "tiny harmless flame wisps at the tail tip",
    "faintly glowing ember freckles",
  ],
  Water: [
    "a few floating water droplets",
    "soft ripple rings beneath its feet",
    "a light mist around the body",
    "tiny bubbles drifting upward",
  ],
  Starlight: [
    "a few twinkling star motes",
    "faint glowing constellation lines nearby",
    "a soft halo of stardust",
    "tiny stars orbiting slowly",
  ],
  Wind: [
    "a gentle swirl of breeze ribbons",
    "a few drifting leaves",
    "soft wind streaks around the tail",
    "tiny spirals of air",
  ],
};
const ACCENTS = [
  "a softly glowing chest patch",
  "a lighter muzzle and chest",
  "shimmering edges on its head feature",
  "a tiny glowing gem-like mark on the chest",
  "gradient-tinted tips on the tail",
] as const;
/** A and B always come from different pose pools, so the pair never shares a composition. */
const POSES = {
  a: [
    "sitting calmly in a three-quarter view",
    "standing upright in a gentle three-quarter view",
    "seated with its head slightly tilted toward the viewer",
    "settled in a relaxed, rounded resting posture",
  ],
  b: [
    "caught mid-hop in a dynamic diagonal pose",
    "playfully bounding forward",
    "turning with one foot lifted in a happy twirl",
    "looking back over its shoulder mid-step",
  ],
} as const;
const SHADES = [
  { name: "soft pastel", lightness: 12 },
  { name: "balanced", lightness: 0 },
  { name: "rich jewel-toned", lightness: -10 },
] as const;

/** Answer-derived look preferences, translated into design language (never the answer text). */
const PERSONAL_EYES: Record<string, string> = {
  "Cosmic Galaxy Eyes": "deep violet-blue eyes with a swirling galaxy shimmer",
  "Golden Starlight Eyes": "warm golden eyes with starlight glints",
  "Ocean Crystal Eyes": "clear sea-blue eyes with a crystal sparkle",
  "Emerald Aurora Eyes": "green eyes with a soft aurora shimmer",
};
const PERSONAL_DETAILS: Record<string, string> = {
  "A glowing forehead star": "a small glowing star mark on the forehead",
  "Golden ear tips": "golden-tinted tips on the ears, crest or mane",
  "A crescent marking": "one small crescent-moon marking",
  "A shimmering spiral": "one small shimmering spiral marking",
};
const PERSONAL_TEXTURE: Record<string, string> = {
  "Soft and fluffy": "an extra soft, fluffy texture",
  "Sleek and swift": "a smooth, sleek texture",
  "Small and sturdy": "a compact, sturdy stance",
  "Graceful and majestic": "a graceful, poised posture",
};

export interface VisualDna {
  schema: typeof DNA_SCHEMA;
  dnaVersion: string;
  genePoolVersion: string;
  styleVersion: string;
  slot: "a" | "b";
  candidateId: string;
  candidateFingerprint: string;
  archetypeId: string;
  species: Species;
  element: Element;
  personality: Personality;
  identityLock: Anatomy & { proportions: string; silhouette: string; signatureFeature: string };
  genes: {
    faceShape: string;
    expression: string;
    irises: string;
    highlights: string;
    pattern: string;
    markingShape: string;
    markingPlace: string;
    headFeature: string;
    tail: string;
    elementalEffect: string;
    accent: string;
    pose: string;
    shade: string;
  };
  palette: {
    role: "main" | "accent";
    primary: string;
    secondary: string;
    accent: string;
    glow: string;
  };
  personalTouches: { eyes: string | null; signatureDetail: string | null; texture: string | null };
  /** First 24 hex characters of the HMAC that chose the genes. */
  variationId: string;
  /** SHA-256 of every other field. */
  fingerprint: string;
}

export class DnaError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "DnaError";
  }
}

/** Every pool a candidate of this kind may draw from: the allowlist for validation too. */
export function genePools(
  species: Species,
  element: Element,
  personality: Personality,
  slot: "a" | "b",
) {
  const anatomy = ANATOMY[species];
  return {
    faceShape: FACE_SHAPES,
    expression: EXPRESSIONS[personality],
    irises: IRISES,
    highlights: HIGHLIGHTS,
    pattern: PATTERNS[anatomy.covering],
    markingShape: MARKING_SHAPES[element],
    markingPlace: MARKING_PLACES[species],
    headFeature: HEAD_FEATURES[species],
    tail: TAILS[species],
    elementalEffect: ELEMENTAL_EFFECTS[element],
    accent: ACCENTS,
    pose: POSES[slot],
    shade: SHADES.map((s) => s.name),
  } satisfies Record<keyof VisualDna["genes"], readonly string[]>;
}

/** How many distinct gene combinations exist for one kind of candidate. */
export function variationSpace(
  species: Species,
  element: Element,
  personality: Personality,
  slot: "a" | "b",
) {
  return Object.values(genePools(species, element, personality, slot)).reduce(
    (n, pool) => n * pool.length,
    1,
  );
}

const HEX = /^#[0-9A-F]{6}$/;
function shadeHex(hex: string, delta: number) {
  const n = Number.parseInt(hex.slice(1), 16);
  const channel = (shift: number) => {
    const v = (n >> shift) & 0xff;
    const out =
      delta >= 0 ? v + Math.round(((255 - v) * delta) / 100) : v + Math.round((v * delta) / 100);
    return Math.max(0, Math.min(255, out));
  };
  return `#${[16, 8, 0]
    .map((s) => channel(s).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}

/**
 * Derive a candidate's Visual DNA. Only the trusted server calls this: `secret` is a server
 * secret of at least 32 characters, `studentId` the verified account (used only as HMAC input).
 */
export function deriveVisualDna(
  spec: CompanionCandidateSpec,
  { studentId, secret }: { studentId: string; secret: string },
): VisualDna {
  if (typeof secret !== "string" || secret.length < 32)
    throw new DnaError("DNA secret is not configured");
  if (!/^[0-9a-f-]{36}$/i.test(studentId)) throw new DnaError("A verified student is required");
  const anatomy = ANATOMY[spec.species];
  if (!anatomy) throw new DnaError("Unknown species");
  const pools = genePools(spec.species, spec.element, spec.personality, spec.slot);
  const mac = hmacSha256Hex(
    secret,
    `${DNA_VERSION}|${studentId.toLowerCase()}|${spec.slot}|${spec.fingerprint}`,
  );
  // Two bytes per gene, in a fixed order; 13 genes use 26 of the 32 bytes.
  const order = Object.keys(pools) as (keyof VisualDna["genes"])[];
  const genes = Object.fromEntries(
    order.map((gene, i) => {
      const pool = pools[gene];
      const value = Number.parseInt(mac.slice(i * 4, i * 4 + 4), 16);
      return [gene, pool[value % pool.length]];
    }),
  ) as VisualDna["genes"];
  const shade = SHADES.find((s) => s.name === genes.shade)!.lightness;
  const canonical = spec.visual.canonical.palette;
  const student = spec.visual.personalisation.palette;
  const main = spec.visual.personalisation.paletteRole === "main";
  const base = main
    ? {
        primary: student.primary,
        secondary: student.secondary,
        accent: student.accent,
        glow: canonical.glow,
      }
    : {
        primary: canonical.primary,
        secondary: canonical.secondary,
        accent: student.secondary,
        glow: canonical.glow,
      };
  const translate = (table: Record<string, string>, value: string | null, label: string) => {
    if (value === null) return null;
    const out = table[value];
    if (!out) throw new DnaError(`Unknown ${label}`);
    return out;
  };
  const body: Omit<VisualDna, "fingerprint"> = {
    schema: DNA_SCHEMA,
    dnaVersion: DNA_VERSION,
    genePoolVersion: GENE_POOL_VERSION,
    styleVersion: STYLE_VERSION,
    slot: spec.slot,
    candidateId: spec.candidateId,
    candidateFingerprint: spec.fingerprint,
    archetypeId: spec.archetypeId,
    species: spec.species,
    element: spec.element,
    personality: spec.personality,
    identityLock: {
      ...anatomy,
      proportions: spec.visual.canonical.proportions,
      silhouette: spec.visual.canonical.silhouette,
      signatureFeature: spec.visual.canonical.signatureFeature,
    },
    genes,
    palette: {
      role: main ? "main" : "accent",
      primary: shadeHex(base.primary, shade),
      secondary: shadeHex(base.secondary, shade),
      accent: shadeHex(base.accent, shade),
      glow: base.glow,
    },
    personalTouches: {
      eyes: translate(PERSONAL_EYES, spec.visual.personalisation.eyes, "eye preference"),
      signatureDetail: translate(
        PERSONAL_DETAILS,
        spec.visual.personalisation.signatureDetail,
        "signature detail",
      ),
      texture: translate(
        PERSONAL_TEXTURE,
        spec.visual.personalisation.silhouette,
        "silhouette preference",
      ),
    },
    variationId: mac.slice(0, 24),
  };
  return { ...body, fingerprint: sha256Hex(canonicalJson(body)) };
}

export function verifyDnaFingerprint(dna: VisualDna): boolean {
  const { fingerprint, ...body } = dna;
  try {
    return fingerprint === sha256Hex(canonicalJson(body));
  } catch {
    return false;
  }
}

const SAFE_TEXT = /^[A-Za-z0-9 ,.:;'()/#-]{1,240}$/;
/**
 * Full allowlist validation: versions, fingerprint, anatomy, every gene from its own pool,
 * personal touches from their tables and safe characters everywhere. Throws DnaError.
 */
export function validateDna(dna: VisualDna): void {
  const fail = (why: string): never => {
    throw new DnaError(`Invalid Visual DNA: ${why}`);
  };
  if (dna?.schema !== DNA_SCHEMA || dna.dnaVersion !== DNA_VERSION) fail("version");
  if (dna.genePoolVersion !== GENE_POOL_VERSION || dna.styleVersion !== STYLE_VERSION)
    fail("version");
  if (!verifyDnaFingerprint(dna)) fail("fingerprint");
  const anatomy = ANATOMY[dna.species];
  if (!anatomy) fail("species");
  for (const [key, value] of Object.entries(anatomy))
    if (dna.identityLock[key as keyof Anatomy] !== value) fail(`anatomy ${key}`);
  const pools = genePools(dna.species, dna.element, dna.personality, dna.slot);
  if (!pools.expression || !pools.markingShape || !pools.pose) fail("kind");
  for (const [gene, pool] of Object.entries(pools))
    if (!(pool as readonly string[]).includes(dna.genes[gene as keyof VisualDna["genes"]]))
      fail(`gene ${gene}`);
  const allowed = (table: Record<string, string>, value: string | null) =>
    value === null || Object.values(table).includes(value);
  if (
    !allowed(PERSONAL_EYES, dna.personalTouches.eyes) ||
    !allowed(PERSONAL_DETAILS, dna.personalTouches.signatureDetail) ||
    !allowed(PERSONAL_TEXTURE, dna.personalTouches.texture)
  )
    fail("personal touch");
  if (
    ![dna.palette.primary, dna.palette.secondary, dna.palette.accent, dna.palette.glow].every((h) =>
      HEX.test(h),
    )
  )
    fail("palette");
  for (const text of [
    dna.identityLock.proportions,
    dna.identityLock.silhouette,
    dna.identityLock.signatureFeature,
  ])
    if (!SAFE_TEXT.test(text)) fail("unsafe text");
  if (!/^[0-9a-f]{24}$/.test(dna.variationId)) fail("variation");
}

export interface ArtModelConfig {
  /** Pinned provider snapshot, e.g. gpt-image-2.5-flare-2026-09-08. */
  model: string;
  quality: "low" | "medium" | "high";
}
export interface ArtRequest {
  promptVersion: typeof PROMPT_VERSION;
  providerConfig: "openai-images-v1";
  body: {
    model: string;
    prompt: string;
    n: 1;
    quality: string;
    size: "1024x1536";
    output_format: "png";
    background: "transparent";
    moderation: "auto";
  };
  promptSha256: string;
}

const count = (n: number, noun: string) =>
  n === 0 ? `no ${noun}s` : `exactly ${n} ${noun}${n === 1 ? "" : "s"}`;

/** Deterministically compile a stored, validated Visual DNA into a provider request. */
export function compileArtRequest(dna: VisualDna, config: ArtModelConfig): ArtRequest {
  validateDna(dna);
  if (!/^gpt-image-2\.5-(flare|sunburst)-\d{4}-\d{2}-\d{2}$/.test(config.model))
    throw new DnaError("Model must be a pinned snapshot");
  const a = dna.identityLock;
  const g = dna.genes;
  const p = dna.palette;
  const touches = [
    dna.personalTouches.eyes,
    dna.personalTouches.signatureDetail,
    dna.personalTouches.texture,
  ]
    .filter((x): x is string => !!x)
    .join("; ");
  const prompt = [
    `AcadeMY Cosmic Companion art direction ${dna.styleVersion}, prompt ${PROMPT_VERSION}. ART ONLY.`,
    `Style: ${ACADEMY_ART_STYLE}`,
    `Character: one ${a.body} with ${dna.element} magic and ${/^[AEIOU]/.test(dna.personality) ? "an" : "a"} ${dna.personality} personality.`,
    `Locked anatomy, must match exactly: ${count(a.eyes, "eye")}, ${count(a.legs, "leg")}, ${count(a.wings, "wing")}, ${count(a.horns, "horn")}, ${count(a.tails, "tail")}; covered in ${a.covering}.`,
    `Archetype foundation, keep exactly: ${a.proportions} ${a.silhouette} Signature feature: ${a.signatureFeature}`,
    `Unique styling within that foundation, never changing its anatomy or silhouette: ${g.faceShape}; ${g.expression}; eyes with ${g.irises} and ${g.highlights}; ${g.pattern}; ${g.markingShape} ${g.markingPlace}; ${g.headFeature}; ${g.tail}; ${g.accent}; magical effect: ${g.elementalEffect}.`,
    `Colour palette, ${g.shade}: main ${p.primary}, secondary ${p.secondary}, accent ${p.accent}, magical glow ${p.glow}.`,
    touches ? `Personal touches: ${touches}.` : "",
    `Pose and framing: ${g.pose}; the whole character visible and centred with clear margin; portrait 2:3; fully transparent background with no scenery, floor or frame.`,
    "Avoid: text, letters, logos, watermarks, signatures, borders, card frames, UI, extra limbs, extra eyes, extra horns or wings, distorted anatomy, scary or aggressive expressions, realistic animal photography, flat vector cartoon, clutter, accessories, clothing, and any resemblance to existing copyrighted characters.",
  ]
    .filter(Boolean)
    .join("\n");
  return {
    promptVersion: PROMPT_VERSION,
    providerConfig: "openai-images-v1",
    body: {
      model: config.model,
      prompt,
      n: 1,
      quality: config.quality,
      size: "1024x1536",
      output_format: "png",
      background: "transparent",
      moderation: "auto",
    },
    promptSha256: sha256Hex(prompt),
  };
}
