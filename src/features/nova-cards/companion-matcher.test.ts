import { createHash } from "node:crypto";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { QUESTIONS, traitsFromAnswers } from "./model";
import {
  BUILDS,
  COMPANION_CATALOGUE,
  CatalogueError,
  ELEMENTS,
  PERSONALITIES,
  validateCatalogue,
  type CompanionArchetype,
  type CompanionCatalogue,
} from "../../../supabase/functions/_shared/companion-catalogue";
import {
  ANSWER_OPTIONS,
  CANDIDATE_SCHEMA,
  CompanionMatchError,
  MATCHER_VERSION,
  MATCH_WEIGHTS,
  deriveSignals,
  matchCompanions,
  selectArchetypes,
  verifyCandidateFingerprint,
  type CompanionCandidateSpec,
} from "../../../supabase/functions/_shared/companion-matcher";
import {
  canonicalJson,
  fnv1a32,
  sha256Hex,
} from "../../../supabase/functions/_shared/content-fingerprint";
import { NOVA_CREATURES } from "../../../supabase/functions/_shared/nova-answers";

/** Durable creature codes in visible order; 2 is the retired Phoenix code. */
const CREATURE_CODES = [0, 1, 3, 4, 5];
const FOUR = [0, 1, 2, 3];
const CATALOGUE = COMPANION_CATALOGUE.archetypes;

/** Every combination of the nine answers that can change which companions are chosen. */
function* selectionCombos() {
  for (const q0 of FOUR)
    for (const q1 of CREATURE_CODES)
      for (const q2 of FOUR)
        for (const q3 of FOUR)
          for (const q5 of FOUR)
            for (const q6 of FOUR)
              for (const q7 of FOUR)
                for (const q10 of FOUR)
                  for (const q11 of FOUR) yield [q0, q1, q2, q3, 0, q5, q6, q7, 0, 0, q10, q11];
}
/** A deterministic spread over all twelve answers, including cosmetic ones and legacy code 2. */
function* spreadCombos(count: number) {
  for (let i = 0; i < count; i++) {
    const answers = Array.from(
      { length: 12 },
      (_, q) => (i * (q * 7 + 3) + q * q + (i >> (q % 5))) % 4,
    );
    answers[1] = [0, 1, 2, 3, 4, 5][(i * 5 + (i >> 3)) % 6];
    yield answers;
  }
}
/** One exhaustive pass (327,680 students), shared by the rule and bias tests below. */
let sweepResult: ReturnType<typeof runSweep> | undefined;
function runSweep() {
  const asA = new Map<string, number>();
  const asB = new Map<string, number>();
  const pairs = new Set<string>();
  const violations = {
    speciesNotKept: 0,
    elementNotKept: 0,
    sameArchetype: 0,
    sameSpecies: 0,
    sameElement: 0,
    notDominant: 0,
  };
  let total = 0;
  let elementKept = 0;
  for (const answers of selectionCombos()) {
    const { a, b, signals } = selectArchetypes(answers);
    total++;
    asA.set(a.id, (asA.get(a.id) ?? 0) + 1);
    asB.set(b.id, (asB.get(b.id) ?? 0) + 1);
    pairs.add(`${a.id}>${b.id}`);
    if (a.element === signals.element) elementKept++;
    if (a.species !== signals.species) violations.speciesNotKept++;
    if (a.element !== signals.element) violations.elementNotKept++;
    if (b.id === a.id) violations.sameArchetype++;
    if (b.species === a.species) violations.sameSpecies++;
    if (b.element === a.element) violations.sameElement++;
    if (b.personality !== signals.dominantPersonality) violations.notDominant++;
  }
  return { total, asA, asB, pairs, elementKept, violations };
}
const sweep = () => (sweepResult ??= runSweep());
beforeAll(() => {
  sweep();
}, 120_000);

afterEach(() => vi.restoreAllMocks());

describe("content fingerprint", () => {
  it("matches Node's SHA-256 for ASCII, Unicode and every padding boundary", () => {
    const samples = [
      "",
      "abc",
      "You picked “Light the way” — Seri’s glow ✨",
      "Ω≈ç√∫ 你好 مرحبا 🦊🐉",
      ...Array.from({ length: 200 }, (_, n) => "x".repeat(n)),
    ];
    for (const text of samples)
      expect(sha256Hex(text)).toBe(createHash("sha256").update(text, "utf8").digest("hex"));
  });

  it("serialises canonically and refuses ambiguous values", () => {
    expect(canonicalJson({ b: 1, a: [true, null, "x", { d: 2, c: 1 }] })).toBe(
      '{"a":[true,null,"x",{"c":1,"d":2}],"b":1}',
    );
    for (const bad of [{ a: undefined }, 1.5, Number.NaN, Infinity, new Date(0), () => 1])
      expect(() => canonicalJson(bad)).toThrow();
  });

  it("has a stable tie-break hash", () => {
    expect(fnv1a32("")).toBe(0x811c9dc5);
    expect(fnv1a32("cc-matcher-v1|lumi")).toBe(fnv1a32("cc-matcher-v1|lumi"));
    expect(fnv1a32("a")).not.toBe(fnv1a32("b"));
  });
});

describe("companion catalogue v1", () => {
  it("is valid and deeply frozen", () => {
    expect(() => validateCatalogue(COMPANION_CATALOGUE)).not.toThrow();
    expect(COMPANION_CATALOGUE.version).toBe("cc-catalogue-v1");
    const frozen = (value: unknown): boolean =>
      typeof value !== "object" ||
      value === null ||
      (Object.isFrozen(value) && Object.values(value).every(frozen));
    expect(frozen(COMPANION_CATALOGUE)).toBe(true);
  });

  it("keeps every published archetype identity unchanged", () => {
    // Editing any row means publishing a new catalogue version, never changing v1 in place.
    expect(
      CATALOGUE.map((a) => [a.id, a.name, a.species, a.element, a.personality, a.build, a.since]),
    ).toEqual([
      ["lumi", "Lumi", "Magical Fox", "Starlight", "Explorer", "soft", "cc-catalogue-v1"],
      ["ember", "Ember", "Lion", "Fire", "Explorer", "sturdy", "cc-catalogue-v1"],
      ["zephy", "Zephy", "Phoenix", "Wind", "Explorer", "sleek", "cc-catalogue-v1"],
      ["mira", "Mira", "Magical Fox", "Water", "Nurturer", "graceful", "cc-catalogue-v1"],
      ["seri", "Seri", "Phoenix", "Fire", "Nurturer", "soft", "cc-catalogue-v1"],
      ["celeste", "Celeste", "Unicorn", "Starlight", "Nurturer", "graceful", "cc-catalogue-v1"],
      ["coral", "Coral", "Dragon", "Water", "Strategist", "soft", "cc-catalogue-v1"],
      ["orion", "Orion", "Lion", "Starlight", "Strategist", "graceful", "cc-catalogue-v1"],
      ["aria", "Aria", "Unicorn", "Wind", "Strategist", "sleek", "cc-catalogue-v1"],
      ["sol", "Sol", "Lion", "Wind", "Guardian", "sturdy", "cc-catalogue-v1"],
      ["blaze", "Blaze", "Dragon", "Fire", "Guardian", "sturdy", "cc-catalogue-v1"],
      ["brook", "Brook", "Unicorn", "Water", "Guardian", "sleek", "cc-catalogue-v1"],
      ["saffron", "Saffron", "Magical Fox", "Fire", "Strategist", "sleek", "cc-catalogue-v1"],
      ["bayu", "Bayu", "Magical Fox", "Wind", "Guardian", "sturdy", "cc-catalogue-v1"],
      ["tasik", "Tasik", "Phoenix", "Water", "Strategist", "graceful", "cc-catalogue-v1"],
      ["astra", "Astra", "Phoenix", "Starlight", "Guardian", "sturdy", "cc-catalogue-v1"],
      ["comet", "Comet", "Dragon", "Starlight", "Explorer", "sleek", "cc-catalogue-v1"],
      ["mochi", "Mochi", "Dragon", "Wind", "Nurturer", "soft", "cc-catalogue-v1"],
      ["embun", "Embun", "Lion", "Water", "Nurturer", "soft", "cc-catalogue-v1"],
      ["spark", "Spark", "Unicorn", "Fire", "Explorer", "graceful", "cc-catalogue-v1"],
    ]);
  });

  it("covers all 20 species-and-element combinations exactly once", () => {
    for (const species of NOVA_CREATURES)
      for (const element of ELEMENTS)
        expect(
          CATALOGUE.filter((a) => a.species === species && a.element === element),
          `${species} + ${element}`,
        ).toHaveLength(1);
    expect(CATALOGUE).toHaveLength(20);
  });

  it("balances personalities and body shapes across species and elements", () => {
    const count = (key: keyof CompanionArchetype, value: string) =>
      CATALOGUE.filter((a) => a[key] === value).length;
    for (const species of NOVA_CREATURES) expect(count("species", species)).toBe(4);
    for (const element of ELEMENTS) expect(count("element", element)).toBe(5);
    for (const personality of PERSONALITIES) expect(count("personality", personality)).toBe(5);
    for (const build of BUILDS) expect(count("build", build)).toBe(5);
    // Every species offers all four personalities, so after excluding Candidate A's species
    // the kindred match still has the student's dominant personality in four other species.
    for (const species of NOVA_CREATURES)
      expect(
        new Set(CATALOGUE.filter((a) => a.species === species).map((a) => a.personality)),
      ).toEqual(new Set(PERSONALITIES));
  });

  it("gives every archetype its own complete, distinct identity", () => {
    for (const field of ["name", "tagline", "description", "story"] as const)
      expect(new Set(CATALOGUE.map((a) => a[field])).size).toBe(CATALOGUE.length);
    for (const field of ["signatureFeature", "silhouette", "proportions"] as const)
      expect(new Set(CATALOGUE.map((a) => a.visual[field])).size).toBe(CATALOGUE.length);
    expect(new Set(CATALOGUE.map((a) => JSON.stringify(a.visual.palette))).size).toBe(
      CATALOGUE.length,
    );
  });

  it("rejects catalogues that cannot be matched safely", () => {
    const base = CATALOGUE.slice(0, 4) as CompanionArchetype[];
    const make = (archetypes: CompanionArchetype[]): CompanionCatalogue => ({
      version: "test",
      style: "Test style.",
      archetypes,
    });
    const cases: CompanionArchetype[][] = [
      [base[0], { ...base[1], id: base[0].id }],
      [base[0], { ...base[1], name: base[0].name }],
      [base[0], { ...base[1], species: "Griffin" as never }],
      [base[0], { ...base[1], element: "Lightning" as never }],
      [
        base[0],
        { ...base[1], explanation: { preference: "{name} likes {colour}.", kindred: "{name}." } },
      ],
      [base[0], { ...base[1], explanation: { preference: "No placeholder.", kindred: "{name}." } }],
      [
        base[0],
        {
          ...base[1],
          visual: { ...base[1].visual, palette: { ...base[1].visual.palette, primary: "red" } },
        },
      ],
      [base[0], { ...base[1], strengths: ["Only one"] }],
      [base[0], { ...base[3], species: base[0].species }],
    ];
    for (const archetypes of cases)
      expect(() => validateCatalogue(make(archetypes))).toThrow(CatalogueError);
    expect(() => validateCatalogue(make([base[0], base[1]]))).not.toThrow();
  });
});

describe("compatibility with the existing questionnaire", () => {
  it("uses exactly the live question options, in order", () => {
    expect(ANSWER_OPTIONS.map((options) => [...options])).toEqual(
      QUESTIONS.map((q) => [...q.options]),
    );
  });

  it("derives the same choices as the live identity calculation, including legacy codes", () => {
    for (const answers of spreadCombos(500)) {
      const live = traitsFromAnswers(answers);
      const s = deriveSignals(answers);
      expect([
        s.species,
        s.element,
        s.silhouette,
        s.colours,
        s.gift,
        s.habitat,
        s.eyes,
        s.signatureDetail,
      ]).toEqual([
        live.creature,
        live.element,
        live.appearance,
        live.colours,
        live.ability,
        live.habitat,
        live.eyes,
        live.marking,
      ]);
    }
  });

  it("treats the retired Phoenix code 2 exactly like the current Phoenix answer", () => {
    for (const answers of spreadCombos(120)) {
      const legacy = [...answers];
      legacy[1] = 2;
      const current = [...answers];
      current[1] = 0;
      const a = selectArchetypes(legacy);
      const b = selectArchetypes(current);
      expect(a.signals.species).toBe("Phoenix");
      expect([a.a.id, a.b.id]).toEqual([b.a.id, b.b.id]);
      const [la, lb] = matchCompanions(legacy).candidates;
      const [ca, cb] = matchCompanions(current).candidates;
      // Only the input fingerprint (and so the IDs) records which code was stored.
      const strip = ({
        candidateId,
        fingerprint,
        inputFingerprint,
        ...rest
      }: CompanionCandidateSpec) => rest;
      expect([strip(la), strip(lb)]).toEqual([strip(ca), strip(cb)]);
      expect(la.inputFingerprint).not.toBe(ca.inputFingerprint);
    }
  });

  it("maps answers only where their wording supports it", () => {
    const base = [0, 1, 0, 0, 0, 1, 2, 0, 0, 0, 0, 0];
    const signalsWith = (index: number, value: number) =>
      deriveSignals(base.map((v, i) => (i === index ? value : v)));
    // "Inspire each other" supports no personality; the other bonds support one each.
    const inspire = signalsWith(11, 3).personality;
    const explore = signalsWith(11, 0).personality;
    expect(
      Object.values(explore).reduce((x, y) => x + y) -
        Object.values(inspire).reduce((x, y) => x + y),
    ).toBe(2);
    expect(signalsWith(11, 2).personality.Guardian - inspire.Guardian).toBe(2);
    expect(signalsWith(11, 1).personality.Nurturer - inspire.Nurturer).toBe(2);
    // "Trust your instincts" supports no personality; the other challenge answers support one.
    const instincts = signalsWith(10, 3).personality;
    expect(Object.values(instincts).reduce((x, y) => x + y)).toBe(
      Object.values(signalsWith(10, 0).personality).reduce((x, y) => x + y) - 2,
    );
    expect(instincts.Guardian).toBe(signalsWith(10, 0).personality.Guardian);
    // "Bold and welcoming" supports courage (Guardian) and warmth (Nurturer) equally.
    const bold = signalsWith(7, 3).personality;
    const curious = signalsWith(7, 0).personality;
    expect([bold.Guardian - curious.Guardian, bold.Nurturer - curious.Nurturer]).toEqual([1, 1]);
    // "Light the way" names light, which can be flame or starlight.
    const light = signalsWith(5, 0).elementAffinity;
    const healing = signalsWith(5, 1).elementAffinity;
    expect([light.Fire - healing.Fire, light.Starlight - healing.Starlight]).toEqual([1, 1]);
    expect(healing.Water - light.Water).toBe(2);
    // Habitats: a lagoon is water, sky places are air; "Crystal forest" names no element.
    const crystal = signalsWith(6, 2).elementAffinity;
    expect(signalsWith(6, 1).elementAffinity.Water - crystal.Water).toBe(1);
    expect(signalsWith(6, 0).elementAffinity.Wind - crystal.Wind).toBe(1);
    expect(signalsWith(6, 3).elementAffinity.Wind - crystal.Wind).toBe(1);
    expect(signalsWith(6, 3).elementAffinity.Fire).toBe(crystal.Fire);
  });

  it("names one dominant personality, settling ties by the earliest answer", () => {
    // Adventure says Explorer (4); challenge, greeting and bond say Nurturer (2+2+2 = 6).
    expect(deriveSignals([0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1]).dominantPersonality).toBe(
      "Nurturer",
    );
    // Explorer 4 vs Nurturer 4: the adventure answer decides.
    expect(deriveSignals([0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 3]).dominantPersonality).toBe(
      "Explorer",
    );
    // Strategist 4 vs Nurturer 4 (greeting 2 + challenge 2): adventure still decides.
    expect(deriveSignals([2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 3]).dominantPersonality).toBe(
      "Strategist",
    );
    // The other three answers can add at most 6 points in total, so two personalities can only
    // tie at the top if one of them is the adventure answer's; the later tie-break steps exist
    // for future weights.
  });

  it("leaves the live identity calculation untouched", () => {
    expect(traitsFromAnswers(Array(12).fill(0))).toMatchObject({
      personality: "Explorer",
      creature: "Phoenix",
      element: "Fire",
    });
  });
});

describe("input validation", () => {
  const valid = [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0];
  const withAnswer = (index: number, value: unknown) =>
    valid.map((v, i) => (i === index ? value : v));
  it.each([
    ["not an array", "0,1,2"],
    ["null", null],
    ["an object", { length: 12 }],
    ["eleven answers", valid.slice(0, 11)],
    ["thirteen answers", [...valid, 0]],
    ["an empty array", []],
    ["holes", new Array(12)],
    ["a string answer", withAnswer(0, "1")],
    ["a fractional answer", withAnswer(3, 1.5)],
    ["a negative answer", withAnswer(5, -1)],
    ["NaN", withAnswer(7, Number.NaN)],
    ["an out-of-range answer", withAnswer(0, 4)],
    ["an out-of-range creature code", withAnswer(1, 6)],
    ["a null answer", withAnswer(11, null)],
  ])("rejects %s", (_, answers) => {
    let error: unknown;
    try {
      matchCompanions(answers as number[]);
    } catch (caught) {
      error = caught;
    }
    expect(error).toBeInstanceOf(CompanionMatchError);
    expect((error as CompanionMatchError).code).toBe("invalid_answers");
  });

  it("accepts every valid code, including the legacy creature code, without mutating input", () => {
    for (const code of [0, 1, 2, 3, 4, 5]) {
      const answers = Object.freeze(withAnswer(1, code)) as readonly number[];
      expect(() => matchCompanions(answers)).not.toThrow();
      expect(answers[1]).toBe(code);
    }
  });
});

const EXAMPLES = {
  explorerFox: [0, 1, 2, 0, 0, 0, 2, 0, 0, 0, 0, 0],
  guardianLion: [3, 4, 0, 2, 1, 2, 3, 3, 1, 2, 3, 2],
  guardianLionWind: [3, 4, 3, 2, 1, 3, 0, 3, 1, 2, 3, 2],
  nurturerUnicorn: [1, 5, 1, 3, 2, 1, 1, 1, 2, 0, 1, 1],
  strategistDragonWind: [2, 3, 3, 1, 3, 3, 0, 2, 3, 3, 2, 3],
};

describe("Candidate A — preference match", () => {
  it("honours the chosen creature and element for representative students", () => {
    const pick = (answers: number[]) =>
      matchCompanions(answers).candidates.map((c) => c.archetypeId);
    expect(pick(EXAMPLES.explorerFox)).toEqual(["lumi", "ember"]);
    // Lion + Fire is Ember (an Explorer): the explicit choices win; B brings the Guardian.
    expect(pick(EXAMPLES.guardianLion)).toEqual(["ember", "astra"]);
    expect(pick(EXAMPLES.guardianLionWind)).toEqual(["sol", "astra"]);
    expect(pick(EXAMPLES.nurturerUnicorn)).toEqual(["brook", "seri"]);
    expect(pick(EXAMPLES.strategistDragonWind)).toEqual(["mochi", "saffron"]);
  });

  it("always keeps both the chosen species and the chosen element", () => {
    expect(sweep().violations.speciesNotKept).toBe(0);
    expect(sweep().violations.elementNotKept).toBe(0);
  });

  // Catalogue v1 covers every pair, so fallbacks are exercised with a reduced test catalogue.
  const without = (...ids: string[]): CompanionCatalogue => ({
    version: `test-without-${ids.join("-")}`,
    style: COMPANION_CATALOGUE.style,
    archetypes: CATALOGUE.filter((a) => !ids.includes(a.id)),
  });

  it("explains an element fallback honestly instead of hiding it", () => {
    const [a] = matchCompanions(EXAMPLES.strategistDragonWind, without("mochi")).candidates;
    expect(a.species).toBe("Dragon");
    expect(a.element).not.toBe("Wind");
    expect(a.match.reasons.find((r) => r.basis === "element")?.text).toMatch(
      /^You picked Wind, but no Dragon in this collection carries Wind yet, so \w+ carries \w+ magic instead\./,
    );
  });

  it("uses personality only to choose between companions of the chosen creature", () => {
    // Without a Fox + Fire companion, the personality answers decide between the other foxes.
    const explorer = [0, 1, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0];
    const nurturer = [1, 1, 0, 0, 0, 0, 2, 1, 0, 0, 1, 1];
    expect(selectArchetypes(explorer, without("saffron")).a.id).toBe("lumi");
    expect(selectArchetypes(nurturer, without("saffron")).a.id).toBe("mira");
    // With full coverage, personality never overrides the explicit choices.
    expect(selectArchetypes(nurturer).a.id).toBe("saffron");
  });

  it("falls back deterministically when a creature is missing from the catalogue", () => {
    const noDragons = without("coral", "blaze", "comet", "mochi");
    const first = matchCompanions(EXAMPLES.strategistDragonWind, noDragons);
    expect(first).toEqual(matchCompanions(EXAMPLES.strategistDragonWind, noDragons));
    const [a, b] = first.candidates;
    expect(a.species).not.toBe("Dragon");
    expect(a.match.reasons[0].text).toContain("This collection has no Dragon that fits yet");
    expect(b.species).not.toBe(a.species);
  });

  it("carries the student's colours, eyes and signature detail on its own anatomy", () => {
    const [a] = matchCompanions(EXAMPLES.guardianLion).candidates;
    const ember = CATALOGUE.find((x) => x.id === "ember")!;
    expect(a.visual.canonical).toEqual(ember.visual);
    expect(a.visual.personalisation).toMatchObject({
      paletteRole: "main",
      palette: { name: "Sapphire Blue / Gold" },
      eyes: "Golden Starlight Eyes",
      silhouette: "Small and sturdy",
      signatureDetail: "A crescent marking",
    });
  });

  it("keeps the silhouette answer as a styling preference without changing anatomy", () => {
    for (const silhouette of [0, 1, 2, 3]) {
      const answers = [...EXAMPLES.explorerFox];
      answers[3] = silhouette;
      const [a, b] = matchCompanions(answers).candidates;
      expect(a.archetypeId).toBe("lumi");
      expect(a.visual.personalisation.silhouette).toBe(ANSWER_OPTIONS[3][silhouette]);
      // The canonical body is the archetype's, whatever silhouette was chosen.
      expect(a.visual.canonical).toEqual(CATALOGUE.find((x) => x.id === "lumi")!.visual);
      expect(a.visual.personalisation.rule).toMatch(/never the species anatomy or proportions/);
      expect(b.visual.personalisation.silhouette).toBeNull();
    }
  });
});

describe("Candidate B — kindred spirit match", () => {
  it("is always a different archetype, species and element from Candidate A", () => {
    expect(sweep().violations.sameArchetype).toBe(0);
    expect(sweep().violations.sameSpecies).toBe(0);
    expect(sweep().violations.sameElement).toBe(0);
  });

  it("always has the student's dominant personality", () => {
    expect(sweep().violations.notDominant).toBe(0);
  });

  it("keeps a different species when a future catalogue cannot also vary the element", () => {
    // Only Water companions: no other element exists, so B keeps a different species only.
    const narrow: CompanionCatalogue = {
      version: "test-water-only",
      style: COMPANION_CATALOGUE.style,
      archetypes: CATALOGUE.filter((a) => a.element === "Water"),
    };
    const { a, b } = selectArchetypes([0, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], narrow);
    expect(a.id).toBe("embun");
    expect(b.species).not.toBe(a.species);
    expect(b.element).toBe(a.element);
  });

  it("brings the student's personality even when Candidate A cannot", () => {
    const { a, b, signals } = selectArchetypes(EXAMPLES.nurturerUnicorn);
    expect(signals.personality.Nurturer).toBe(10);
    expect(a.personality).toBe("Guardian");
    expect(b.personality).toBe("Nurturer");
  });

  it("keeps its own canonical look, using the student's colours only as accents", () => {
    const [a, b] = matchCompanions(EXAMPLES.explorerFox).candidates;
    expect(b.visual.canonical).toEqual(CATALOGUE.find((x) => x.id === b.archetypeId)!.visual);
    expect(b.visual.canonical).not.toEqual(a.visual.canonical);
    expect(b.visual.personalisation).toMatchObject({
      paletteRole: "accent",
      eyes: null,
      silhouette: null,
      signatureDetail: null,
    });
    expect(b.visual.personalisation.palette).toEqual(a.visual.personalisation.palette);
  });

  it("is not a renamed or recoloured copy of Candidate A", () => {
    for (const answers of spreadCombos(400)) {
      const [a, b] = matchCompanions(answers).candidates;
      for (const field of [
        "name",
        "species",
        "element",
        "tagline",
        "description",
        "story",
      ] as const)
        expect(b[field]).not.toBe(a[field]);
      expect(b.visual.canonical.signatureFeature).not.toBe(a.visual.canonical.signatureFeature);
      expect(b.visual.canonical.proportions).not.toBe(a.visual.canonical.proportions);
    }
  });
});

describe("matching explanations", () => {
  const BANNED =
    /%|percent|\bscore|\byou are\b|\byou're\b|\bIQ\b|personality type|scientific|proven|guarantee/i;
  it("quote only the student's own answers and make no unsupported claims", () => {
    for (const answers of spreadCombos(1500)) {
      const signals = deriveSignals(answers);
      for (const c of matchCompanions(answers).candidates) {
        expect(c.match.reasons.length).toBeGreaterThanOrEqual(3);
        for (const reason of c.match.reasons) {
          expect(reason.text).not.toMatch(BANNED);
          expect(reason.text).not.toMatch(/\{|\}|undefined|null/);
          const quoted = [...reason.text.matchAll(/“([^”]+)”/g)].map((m) => m[1]);
          const cited = reason.answerIndexes.map((i) =>
            i === 1 ? signals.species : i === 2 ? signals.element : ANSWER_OPTIONS[i][answers[i]],
          );
          for (const quote of quoted) expect(cited).toContain(quote);
          for (const value of cited)
            expect(reason.text.toLowerCase()).toContain(String(value).toLowerCase());
        }
        expect(c.match.headline).toContain(c.name);
        expect(c.match.headline).not.toMatch(BANNED);
      }
    }
  });

  it("states the creature and element facts correctly", () => {
    const [a, b] = matchCompanions(EXAMPLES.explorerFox).candidates;
    expect(a.match.reasons.map((r) => r.text).slice(0, 2)).toEqual([
      "You chose the Magical Fox, and Lumi is a Magical Fox.",
      "Lumi carries Starlight magic, the element you picked.",
    ]);
    expect(b.match.reasons.find((r) => r.basis === "difference")?.text).toBe(
      "Ember is a Lion with Fire magic, a different kind of companion from Lumi.",
    );
    const unicornB = [...spreadCombos(400)]
      .map((answers) => matchCompanions(answers).candidates[1])
      .find((c) => c.species === "Unicorn")!;
    expect(unicornB.match.reasons.find((r) => r.basis === "difference")?.text).toMatch(
      new RegExp(`^${unicornB.name} is a Unicorn with`),
    );
  });
});

describe("determinism, versioning and fingerprints", () => {
  it("produces identical output without randomness, clocks or network", () => {
    vi.spyOn(Math, "random").mockImplementation(() => {
      throw new Error("Math.random must not be used");
    });
    vi.spyOn(Date, "now").mockImplementation(() => {
      throw new Error("Date.now must not be used");
    });
    vi.spyOn(globalThis, "fetch").mockImplementation(() => {
      throw new Error("No network");
    });
    const runs: [string, string][] = [];
    try {
      for (const answers of spreadCombos(200))
        runs.push([
          canonicalJson(matchCompanions(answers)),
          canonicalJson(matchCompanions([...answers])),
        ]);
    } finally {
      vi.restoreAllMocks();
    }
    for (const [first, second] of runs) expect(second).toBe(first);
  });

  it("pins golden fingerprints for this matcher and catalogue version", () => {
    const summary = (answers: number[]) => {
      const m = matchCompanions(answers);
      return [m.inputFingerprint.slice(0, 16), ...m.candidates.map((c) => c.candidateId)];
    };
    expect(summary(EXAMPLES.explorerFox)).toEqual([
      "8aa22d220df3847b",
      "cc1-a-56030bc58e14b8222229",
      "cc1-b-2c58f101b55f2358380b",
    ]);
    expect(summary(EXAMPLES.guardianLion)).toEqual([
      "46d063af0ce33b79",
      "cc1-a-13c374d51df90f52f961",
      "cc1-b-b16ddec66b2387c04d3c",
    ]);
    expect(summary(EXAMPLES.strategistDragonWind)).toEqual([
      "fa4f0f1bb7336fb0",
      "cc1-a-d26df2448ba252d07236",
      "cc1-b-faa0df94cdf05696b1be",
    ]);
  });

  it("returns serialisable, versioned, self-verifying specifications", () => {
    for (const answers of spreadCombos(300)) {
      const match = matchCompanions(answers);
      expect(match.matcherVersion).toBe(MATCHER_VERSION);
      expect(match.catalogueVersion).toBe("cc-catalogue-v1");
      expect(match.inputFingerprint).toMatch(/^[0-9a-f]{64}$/);
      const roundTrip = JSON.parse(JSON.stringify(match));
      expect(roundTrip).toEqual(match);
      expect(match.candidates.map((c) => c.slot)).toEqual(["a", "b"]);
      for (const c of roundTrip.candidates as CompanionCandidateSpec[]) {
        expect(c.schema).toBe(CANDIDATE_SCHEMA);
        expect(c.inputFingerprint).toBe(match.inputFingerprint);
        expect(c.fingerprint).toMatch(/^[0-9a-f]{64}$/);
        expect(c.candidateId).toBe(`cc1-${c.slot}-${c.fingerprint.slice(0, 20)}`);
        expect(verifyCandidateFingerprint(c)).toBe(true);
      }
    }
  });

  it("detects any change to a stored specification", () => {
    const [a] = matchCompanions(EXAMPLES.explorerFox).candidates;
    expect(verifyCandidateFingerprint({ ...a, name: "Phoenix" })).toBe(false);
    expect(verifyCandidateFingerprint({ ...a, element: "Fire" })).toBe(false);
    expect(verifyCandidateFingerprint({ ...a, candidateId: "cc1-a-00000000000000000000" })).toBe(
      false,
    );
    expect(
      verifyCandidateFingerprint({
        ...a,
        match: { ...a.match, headline: "Lumi is perfect for you." },
      }),
    ).toBe(false);
  });

  it("returns fresh objects that cannot alter the catalogue or later matches", () => {
    const first = matchCompanions(EXAMPLES.explorerFox);
    first.candidates[0].strengths.push("Changed");
    first.candidates[0].visual.canonical.palette.primary = "#000000";
    const again = matchCompanions(EXAMPLES.explorerFox);
    expect(again.candidates[0].strengths).toEqual(["Curiosity", "Creative thinking"]);
    expect(CATALOGUE[0].visual.palette.primary).toBe("#F2A65A");
  });

  it("ignores cosmetic answers when choosing companions", () => {
    for (const answers of spreadCombos(150)) {
      const base = selectArchetypes(answers);
      for (const [q, value] of [
        [4, (answers[4] + 1) % 4],
        [8, (answers[8] + 2) % 4],
        [9, (answers[9] + 3) % 4],
      ]) {
        const changed = [...answers];
        changed[q] = value;
        const other = selectArchetypes(changed);
        expect([other.a.id, other.b.id]).toEqual([base.a.id, base.b.id]);
      }
    }
  });

  it("keeps the documented weight ordering", () => {
    const p = MATCH_WEIGHTS.preference;
    const k = MATCH_WEIGHTS.kindred;
    expect(p.species).toBeGreaterThan(9 * p.element + 10 * p.personality + p.build);
    expect((6 - 3) * p.element).toBeGreaterThan(10 * p.personality + p.build);
    expect(k.personality).toBeGreaterThan(k.dominant + 9 * k.element + k.build);
    expect(k.dominant).toBeGreaterThan(9 * k.element + k.build);
  });
});

describe("catalogue coverage across every selection-relevant answer combination", () => {
  it("spreads both candidates across the catalogue without excessive bias", () => {
    const { total, asA, asB, pairs, elementKept } = sweep();
    expect(total).toBe(4 ** 8 * 5);
    const share = (n: number | undefined) => (n ?? 0) / total;
    for (const archetype of CATALOGUE) {
      // A is decided by the explicit species and element: exactly 1/20 each.
      expect(share(asA.get(archetype.id))).toBe(0.05);
      // B is decided by personality, then answer-supported element (see the docs for the
      // Fire/Wind skew): every archetype appears, none dominates.
      expect(share(asB.get(archetype.id))).toBeGreaterThanOrEqual(0.025);
      expect(share(asB.get(archetype.id))).toBeLessThanOrEqual(0.09);
    }
    // Allowed pairs: for each A, 16 companions of other species, minus the 4 of those that
    // share A's element (one per other species) = 12. 20 x 12 = 240, and every one occurs.
    for (const archetype of CATALOGUE) {
      const allowed = CATALOGUE.filter(
        (x) => x.species !== archetype.species && x.element !== archetype.element,
      );
      expect(allowed).toHaveLength(12);
      for (const b of allowed) expect(pairs.has(`${archetype.id}>${b.id}`)).toBe(true);
    }
    expect(pairs.size).toBe(240);
    expect(elementKept).toBe(total);
  });
});
