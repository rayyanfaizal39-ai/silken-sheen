// Cosmic Companion archetype catalogue. Human-written and reviewed; nothing here is generated.
//
// Identity rules (see docs/cosmic-companion-matching.md):
// - An archetype ID is permanent. Never rename, reuse or repurpose one.
// - Never edit an archetype's identity fields (name, species, element, personality, build,
//   visual sheet) inside a published version. Add archetypes or publish a new catalogue
//   version instead; stored candidate specifications keep the version they were matched with.
import { NOVA_CREATURES } from "./nova-answers.ts";

export const PERSONALITIES = ["Explorer", "Nurturer", "Strategist", "Guardian"] as const;
export const ELEMENTS = ["Fire", "Water", "Starlight", "Wind"] as const;
/** Body shapes, one per answer to "Choose a silhouette." */
export const BUILDS = ["soft", "sleek", "sturdy", "graceful"] as const;

export type Species = (typeof NOVA_CREATURES)[number];
export type Personality = (typeof PERSONALITIES)[number];
export type Element = (typeof ELEMENTS)[number];
export type Build = (typeof BUILDS)[number];

export interface CanonicalVisual {
  /** Body proportions that stay fixed across every artwork of this companion. */
  proportions: string;
  silhouette: string;
  face: string;
  eyes: string;
  markings: string;
  /** The single feature that makes this companion recognisable at a glance. */
  signatureFeature: string;
  palette: { primary: string; secondary: string; accent: string; glow: string };
}

export interface CompanionArchetype {
  id: string;
  /** Catalogue version that introduced this archetype. */
  since: string;
  name: string;
  species: Species;
  element: Element;
  personality: Personality;
  build: Build;
  strengths: readonly string[];
  /** How this companion likes to learn: a trait of the companion, not a claim about the student. */
  learningStyle: string;
  tagline: string;
  description: string;
  story: string;
  traits: readonly string[];
  abilities: readonly string[];
  /** Headline templates. The only placeholder is {name}. */
  explanation: { preference: string; kindred: string };
  visual: CanonicalVisual;
}

export interface CompanionCatalogue {
  version: string;
  /** Shared art direction for every companion in this catalogue. */
  style: string;
  archetypes: readonly CompanionArchetype[];
}

const V1 = "cc-catalogue-v1";

const ARCHETYPES: CompanionArchetype[] = [
  {
    id: "lumi",
    since: V1,
    name: "Lumi",
    species: "Magical Fox",
    element: "Starlight",
    personality: "Explorer",
    build: "soft",
    strengths: ["Curiosity", "Creative thinking"],
    learningStyle: "Learns by exploring",
    tagline: "Lights the way through new ideas",
    description: "A gentle, curious fox kit who loves discovering something new every day.",
    story:
      "Lumi was born where the first starlight touched the Crystal Forest. Every glowing paw print it leaves becomes a small path to somewhere new, and it never walks one alone.",
    traits: ["Curious", "Gentle", "Bright"],
    abilities: ["Starlight trail", "Spark of wonder"],
    explanation: {
      preference: "{name} turns every new idea into a small adventure.",
      kindred: "{name} brings a curious, starlit spark to every question you explore.",
    },
    visual: {
      proportions:
        "Baby fox kit: oversized round head about half its height, compact bean-shaped body, short plush legs and one huge fluffy tail as large as its body.",
      silhouette: "Round head with two tall rounded ears and a big crescent-curled tail.",
      face: "Short rounded muzzle, tiny button nose and a small open smile framed by soft cheek fluff.",
      eyes: "Large round glossy eyes with star-shaped highlights.",
      markings: "Pale star freckles across the cheeks and a cream tail tip.",
      signatureFeature: "A faint starlight trail that sparkles from its tail tip.",
      palette: { primary: "#F2A65A", secondary: "#FFF4E6", accent: "#B9A6FF", glow: "#FFE9A8" },
    },
  },
  {
    id: "ember",
    since: V1,
    name: "Ember",
    species: "Lion",
    element: "Fire",
    personality: "Explorer",
    build: "sturdy",
    strengths: ["Courage to try", "Energy"],
    learningStyle: "Learns by trying things out",
    tagline: "Turns every spark into a new adventure",
    description: "A cheerful lion cub who is always ready to try something new.",
    story:
      "Ember was born in the warm Ancient Sky Gardens, where the sunsets never quite end. Its little mane flickers brighter whenever it takes a brave first step somewhere new.",
    traits: ["Adventurous", "Cheerful", "Warm"],
    abilities: ["Hearth flame", "Glow trail"],
    explanation: {
      preference: "{name} keeps a warm flame ready for every new adventure.",
      kindred: "{name} meets new places with a warm, brave spark.",
    },
    visual: {
      proportions:
        "Baby lion cub: chubby round body, big round head, short stubby legs, oversized paws and a short tail with a flame-shaped tuft.",
      silhouette: "Bouncy mid-step pose with a small, flickering flame-like mane.",
      face: "Round muzzle, rosy cheeks and a wide toothless smile.",
      eyes: "Big warm amber eyes with ember-orange highlights.",
      markings: "Golden flame-shaped patches on the paws and a lighter chest.",
      signatureFeature: "A small mane that flickers like a friendly campfire.",
      palette: { primary: "#E8603C", secondary: "#FFD3A3", accent: "#FFB347", glow: "#FFC46B" },
    },
  },
  {
    id: "zephy",
    since: V1,
    name: "Zephy",
    species: "Phoenix",
    element: "Wind",
    personality: "Explorer",
    build: "sleek",
    strengths: ["Adaptability", "Quick reactions"],
    learningStyle: "Learns by moving and doing",
    tagline: "Rides every breeze toward something new",
    description: "A swift little phoenix chick who follows every breeze to see where it goes.",
    story:
      "Zephy learned to glide before it learned to fly, riding the winds between the Floating Islands. Whenever the breeze changes direction, Zephy wants to know what lies beyond.",
    traits: ["Free-spirited", "Playful", "Quick"],
    abilities: ["Tailwind glide", "Breeze whistle"],
    explanation: {
      preference: "{name} rides every new breeze to see where it leads.",
      kindred: "{name} brings a light, free-spirited energy to every journey.",
    },
    visual: {
      proportions:
        "Baby phoenix chick: round fluffy body, large head, short legs, small wings with long sweeping tips and two long tail streamers.",
      silhouette:
        "Teardrop body with a swept-back crest of three feathers and flowing tail streamers.",
      face: "Small rounded beak, soft feathered cheeks and a cheerful expression.",
      eyes: "Large bright eyes with a soft sky-coloured shimmer.",
      markings: "Pale swirl patterns on the wings, like gusts of wind.",
      signatureFeature: "Tail streamers that ripple as if a breeze is always passing.",
      palette: { primary: "#7FD1C7", secondary: "#E8FBF7", accent: "#F6E27F", glow: "#BFF3EC" },
    },
  },
  {
    id: "mira",
    since: V1,
    name: "Mira",
    species: "Magical Fox",
    element: "Water",
    personality: "Nurturer",
    build: "graceful",
    strengths: ["Kindness", "Patience"],
    learningStyle: "Learns by talking things through",
    tagline: "Calms the waters for everyone nearby",
    description: "A graceful fox kit who looks after friends and keeps everyone calm.",
    story:
      "Mira grew up beside the Moonlit Lagoon, where every ripple carries a quiet song. When a friend feels worried, Mira sits close and waits until the water is still again.",
    traits: ["Gentle", "Caring", "Calm"],
    abilities: ["Healing ripple", "Moonlit mist"],
    explanation: {
      preference: "{name} keeps a calm, caring presence wherever you go.",
      kindred: "{name} brings patience and care to every challenge you share.",
    },
    visual: {
      proportions:
        "Baby fox kit with slightly longer legs and an elegant neck, still round-headed, with a long flowing tail.",
      silhouette:
        "Slender upright pose, tall ears with rounded tips and a tail that curls like a wave.",
      face: "Narrow rounded muzzle and a gentle closed-mouth smile.",
      eyes: "Large soft eyes with a watery blue-green sheen.",
      markings: "Wave-shaped stripes on the tail and a pale droplet mark on the chest.",
      signatureFeature: "Small droplets of light that drift from its tail like mist.",
      palette: { primary: "#5DA9E9", secondary: "#EAF6FF", accent: "#9EE6D8", glow: "#BDE7FF" },
    },
  },
  {
    id: "seri",
    since: V1,
    name: "Seri",
    species: "Phoenix",
    element: "Fire",
    personality: "Nurturer",
    build: "soft",
    strengths: ["Encouragement", "Warmth"],
    learningStyle: "Learns by helping others",
    tagline: "Shares its warmth with everyone",
    description: "A fluffy phoenix chick whose gentle glow cheers up everyone around it.",
    story:
      "Seri's feathers glow like a sunrise, and the glow grows warmer whenever someone nearby needs encouragement. It believes every friend can rise again after a hard day.",
    traits: ["Warm-hearted", "Encouraging", "Sunny"],
    abilities: ["Kindling glow", "Rising feather"],
    explanation: {
      preference: "{name} shares a warm, encouraging glow with everyone nearby.",
      kindred: "{name} brings warmth and encouragement whenever a friend needs it.",
    },
    visual: {
      proportions:
        "Baby phoenix chick: very round fluffy body, big head, tiny wings and short soft tail plumes.",
      silhouette: "Round puffball shape with a small flame-like crest of soft feathers.",
      face: "Tiny rounded beak, rosy feathered cheeks and a happy squint smile.",
      eyes: "Large warm eyes with golden sunrise highlights.",
      markings: "Feathers that fade from gold at the chest to coral at the wing tips.",
      signatureFeature: "A soft, flickering glow around its crest that never burns.",
      palette: { primary: "#F7934C", secondary: "#FFE3C2", accent: "#F25F7A", glow: "#FFD27A" },
    },
  },
  {
    id: "celeste",
    since: V1,
    name: "Celeste",
    species: "Unicorn",
    element: "Starlight",
    personality: "Nurturer",
    build: "graceful",
    strengths: ["Empathy", "Steady support"],
    learningStyle: "Learns by listening and reflecting",
    tagline: "Holds a light for friends in the dark",
    description: "A gentle baby unicorn who notices when someone needs a kind word.",
    story:
      "Celeste was born on a night full of falling stars and kept one in its horn. When a friend feels lost, the horn glows just enough to show the next step.",
    traits: ["Kind", "Dreamy", "Thoughtful"],
    abilities: ["Star blessing", "Comet glow"],
    explanation: {
      preference: "{name} holds a gentle starlight for you when the way feels dark.",
      kindred: "{name} brings kindness and steady support to every step you take.",
    },
    visual: {
      proportions:
        "Baby unicorn foal: big head, long slender legs with oversized hooves and a short round body.",
      silhouette: "Upright foal stance with a short spiral horn and a cloud-like mane.",
      face: "Soft rounded muzzle, gentle smile and long curled eyelashes.",
      eyes: "Large dreamy eyes with tiny constellations in the iris.",
      markings: "Star-dust speckles on the hooves and a crescent on the flank.",
      signatureFeature: "A short spiral horn with a single star glowing inside.",
      palette: { primary: "#F3EEFF", secondary: "#C7B8FF", accent: "#FFD6EC", glow: "#E8DDFF" },
    },
  },
  {
    id: "coral",
    since: V1,
    name: "Coral",
    species: "Dragon",
    element: "Water",
    personality: "Strategist",
    build: "soft",
    strengths: ["Careful planning", "Problem solving"],
    learningStyle: "Learns by planning step by step",
    tagline: "Thinks two ripples ahead",
    description: "A soft, round water dragon who likes to understand a puzzle before diving in.",
    story:
      "Coral spends quiet hours watching the tides of the Moonlit Lagoon to learn their patterns. It always knows which stepping stone to take next, because it looks before it leaps.",
    traits: ["Patient", "Clever", "Calm"],
    abilities: ["Tide map", "Bubble shield"],
    explanation: {
      preference: "{name} studies every puzzle calmly before diving in.",
      kindred: "{name} brings careful, step-by-step thinking to every puzzle.",
    },
    visual: {
      proportions:
        "Baby water dragon: soft round body, big head, short paddle-like legs, small fin-shaped wings and a curling finned tail.",
      silhouette: "Rounded body with frilled fin ears and a curled finned tail.",
      face: "Short rounded snout and a small thoughtful smile.",
      eyes: "Large calm eyes with a deep sea-blue gloss.",
      markings: "Pearly scale spots along the back and a lighter belly.",
      signatureFeature: "Tiny bubbles that float up when it is thinking.",
      palette: { primary: "#3FA7B5", secondary: "#D6F5F2", accent: "#FF9E8A", glow: "#A7F0E9" },
    },
  },
  {
    id: "orion",
    since: V1,
    name: "Orion",
    species: "Lion",
    element: "Starlight",
    personality: "Strategist",
    build: "graceful",
    strengths: ["Focus", "Wise decisions"],
    learningStyle: "Learns by observing and asking why",
    tagline: "Reads the stars before choosing a path",
    description: "A calm lion cub who watches the night sky to find the best way forward.",
    story:
      "Orion learned the name of every constellation above the Crystal Forest. When the path ahead is unclear, it looks up, thinks carefully and follows the brightest stars.",
    traits: ["Wise", "Observant", "Composed"],
    abilities: ["Constellation map", "Guiding star"],
    explanation: {
      preference: "{name} looks carefully at the stars before choosing the way forward.",
      kindred: "{name} brings calm focus and careful thinking to every decision.",
    },
    visual: {
      proportions:
        "Baby lion cub: round head, short sturdy legs, oversized paws and a slim tail with a tufted tip.",
      silhouette: "Seated cub pose with a small starry mane framing the face.",
      face: "Round muzzle and a small, serious but kind smile.",
      eyes: "Large deep-blue eyes with tiny star points.",
      markings: "Constellation dots across the mane and paws.",
      signatureFeature: "A small mane that twinkles like a night sky.",
      palette: { primary: "#E9C27A", secondary: "#2F3A73", accent: "#F8F1D8", glow: "#B9C7FF" },
    },
  },
  {
    id: "aria",
    since: V1,
    name: "Aria",
    species: "Unicorn",
    element: "Wind",
    personality: "Strategist",
    build: "sleek",
    strengths: ["Creative problem solving", "Clear thinking"],
    learningStyle: "Learns by finding patterns",
    tagline: "Finds the clever way through",
    description: "A quick, light-footed unicorn who loves figuring out clever solutions.",
    story:
      "Aria races the winds across the Floating Islands, but never without a plan. It notices patterns in the clouds and always seems to find the clever way through.",
    traits: ["Clever", "Graceful", "Light-footed"],
    abilities: ["Whirl step", "Breeze song"],
    explanation: {
      preference: "{name} finds the clever path, quick as the wind.",
      kindred: "{name} brings quick, clever thinking to every challenge.",
    },
    visual: {
      proportions:
        "Baby unicorn foal: slim body, long light legs, big head and a flowing mane and tail.",
      silhouette: "Mid-stride pose with a swept-back mane and a slender spiral horn.",
      face: "Narrow rounded muzzle and a confident little smile.",
      eyes: "Large bright eyes with silver swirl highlights.",
      markings: "Swirling wind patterns along the flank.",
      signatureFeature: "A mane and tail that always flow as if caught in a breeze.",
      palette: { primary: "#9AD4F5", secondary: "#F5FBFF", accent: "#C6B6FF", glow: "#D8F1FF" },
    },
  },
  {
    id: "sol",
    since: V1,
    name: "Sol",
    species: "Lion",
    element: "Wind",
    personality: "Guardian",
    build: "sturdy",
    strengths: ["Courage", "Steady focus"],
    learningStyle: "Learns by practising",
    tagline: "Stays calm when challenges appear",
    description: "A brave, loyal lion cub who keeps going when things get difficult.",
    story:
      "Sol stands at the edge of the Floating Islands where the strongest winds blow. It plants its big paws, takes a breath and keeps going, so its friends never face the storm alone.",
    traits: ["Brave", "Loyal", "Steady"],
    abilities: ["Winds of courage", "Steady shield"],
    explanation: {
      preference: "{name} stands steady beside you when the winds are strong.",
      kindred: "{name} brings courage and loyal support to every challenge.",
    },
    visual: {
      proportions:
        "Baby lion cub: chunky round body, big round head, short thick legs and very large paws.",
      silhouette: "Sturdy standing pose with a fluffy wind-swept mane.",
      face: "Broad rounded muzzle and a determined little smile.",
      eyes: "Large golden eyes with a bright, steady gleam.",
      markings: "Pale swirl marks on the shoulders, like gusts of wind.",
      signatureFeature: "A mane that ruffles like a breeze even when the air is still.",
      palette: { primary: "#F0B44C", secondary: "#FFF1D0", accent: "#7FC8D9", glow: "#FFE08A" },
    },
  },
  {
    id: "blaze",
    since: V1,
    name: "Blaze",
    species: "Dragon",
    element: "Fire",
    personality: "Guardian",
    build: "sturdy",
    strengths: ["Protecting others", "Determination"],
    learningStyle: "Learns by facing challenges head-on",
    tagline: "Guards its friends with a warm heart",
    description: "A bold baby dragon with a warm heart who always stands up for its friends.",
    story:
      "Blaze keeps watch over the Ancient Sky Gardens at sunset. The scales along its crest glow like embers, and its tiny roar is more of a promise than a warning: nobody gets left behind.",
    traits: ["Protective", "Bold", "Big-hearted"],
    abilities: ["Hearth shield", "Ember roar"],
    explanation: {
      preference: "{name} keeps a warm, watchful heart for the friends it loves.",
      kindred: "{name} brings bold determination and a protective heart.",
    },
    visual: {
      proportions:
        "Baby dragon: stocky round body, big head, short strong legs, small sturdy wings and a thick tail with a rounded spade tip.",
      silhouette:
        "Proud upright stance with wings half-open like a small shield and two short curved horns.",
      face: "Broad rounded snout, soft round nostrils and a confident toothless grin.",
      eyes: "Large amber eyes with warm flame highlights.",
      markings: "Ember-orange tips along its back crest and a lighter belly plate.",
      signatureFeature: "A crest of soft scales whose tips glow like embers.",
      palette: { primary: "#E2703A", secondary: "#FFE0B8", accent: "#FFC24B", glow: "#FF9A5C" },
    },
  },
  {
    id: "brook",
    since: V1,
    name: "Brook",
    species: "Unicorn",
    element: "Water",
    personality: "Guardian",
    build: "sleek",
    strengths: ["Reliability", "Calm under pressure"],
    learningStyle: "Learns by steady repetition",
    tagline: "Keeps its friends safe like a quiet river",
    description: "A dependable baby unicorn who keeps its friends safe and steady.",
    story:
      "Brook follows the streams that flow into the Moonlit Lagoon and knows every safe crossing. Whenever a friend needs to cross, Brook goes first and waits on the other side.",
    traits: ["Loyal", "Dependable", "Serene"],
    abilities: ["River ward", "Healing currents"],
    explanation: {
      preference: "{name} keeps you safe and steady, like a quiet river.",
      kindred: "{name} brings calm, dependable protection to every adventure.",
    },
    visual: {
      proportions:
        "Baby unicorn foal: smooth streamlined body, long legs, big head and a flowing tail.",
      silhouette: "Alert standing pose with a wave-like mane and a straight, smooth horn.",
      face: "Rounded muzzle and a calm, gentle smile.",
      eyes: "Large clear eyes like a shallow river.",
      markings: "Flowing water patterns from shoulder to hoof.",
      signatureFeature: "A smooth horn with a ripple of light moving along it.",
      palette: { primary: "#4C8FD6", secondary: "#E6F2FF", accent: "#7FE0C4", glow: "#B5DBFF" },
    },
  },
  {
    id: "saffron",
    since: V1,
    name: "Saffron",
    species: "Magical Fox",
    element: "Fire",
    personality: "Strategist",
    build: "sleek",
    strengths: ["Clever ideas", "Thinking ahead"],
    learningStyle: "Learns by asking questions and testing ideas",
    tagline: "Lights a lantern for every puzzle",
    description: "A clever fox kit whose glowing tail lights up every tricky puzzle.",
    story:
      "Saffron lives at the edge of the Ancient Sky Gardens, where it gathers warm embers in its tail like tiny lanterns. When a puzzle looks too dark to solve, Saffron holds up its glowing tail and studies it one clue at a time.",
    traits: ["Clever", "Warm", "Focused"],
    abilities: ["Lantern tail", "Spark of insight"],
    explanation: {
      preference: "{name} lights up every tricky puzzle, one clue at a time.",
      kindred: "{name} brings warm, clever thinking to every puzzle you share.",
    },
    visual: {
      proportions:
        "Baby fox kit: slim bean-shaped body, big round head, slender legs and a long tapering tail that ends in a soft glow.",
      silhouette: "Alert seated pose with tall rounded ears and a tail held high like a lantern.",
      face: "Narrow rounded muzzle, tiny nose and a small knowing smile.",
      eyes: "Large amber eyes with a warm candle-flame highlight.",
      markings:
        "Ember-orange socks on all four paws and a pale flame-shaped blaze on the forehead.",
      signatureFeature: "A tail tip that glows like a small lantern.",
      palette: { primary: "#D9772B", secondary: "#FFE8CF", accent: "#7A4BD1", glow: "#FFB45C" },
    },
  },
  {
    id: "bayu",
    since: V1,
    name: "Bayu",
    species: "Magical Fox",
    element: "Wind",
    personality: "Guardian",
    build: "sturdy",
    strengths: ["Loyalty", "Staying steady"],
    learningStyle: "Learns by practising until it feels easy",
    tagline: "Shields its friends from every gust",
    description:
      "A sturdy little fox who stands in front of its friends whenever the wind blows hard.",
    story:
      "Bayu grew up on the windiest edge of the Floating Islands. It learned to dig its paws in, fluff up its thick tail and let the strongest gusts pass, so the smaller creatures behind it stayed warm and safe.",
    traits: ["Loyal", "Sturdy", "Kind-hearted"],
    abilities: ["Gust shield", "Calm breeze"],
    explanation: {
      preference: "{name} keeps you sheltered when the wind blows hard.",
      kindred: "{name} brings loyal, steady protection to every adventure.",
    },
    visual: {
      proportions:
        "Baby fox kit: compact chunky body, big round head, short sturdy legs and a thick, wide tail it can wrap around friends.",
      silhouette:
        "Low, steady stance with rounded ears swept back and a big tail curled forward like a shield.",
      face: "Short rounded muzzle and a calm, brave little smile.",
      eyes: "Large steady grey-blue eyes with a soft silver gleam.",
      markings: "Pale wind-swirl patterns on the shoulders and a white tail tip.",
      signatureFeature: "A thick tail that billows like a sail in the breeze.",
      palette: { primary: "#8FB8C9", secondary: "#F2F7FA", accent: "#E7B76A", glow: "#D2ECF5" },
    },
  },
  {
    id: "tasik",
    since: V1,
    name: "Tasik",
    species: "Phoenix",
    element: "Water",
    personality: "Strategist",
    build: "graceful",
    strengths: ["Patience", "Spotting patterns"],
    learningStyle: "Learns by reflecting before answering",
    tagline: "Sees the answer in still water",
    description: "A calm water phoenix who thinks things through before it spreads its wings.",
    story:
      "Tasik glides over the Moonlit Lagoon and watches its reflection in the still water. When a problem appears, it waits until the ripples settle, because the clearest answers appear when everything is calm.",
    traits: ["Serene", "Wise", "Graceful"],
    abilities: ["Mirror pool", "Rain feather"],
    explanation: {
      preference: "{name} waits for the water to settle, then sees the answer clearly.",
      kindred: "{name} brings patient, reflective thinking to every problem.",
    },
    visual: {
      proportions:
        "Baby phoenix chick: slender teardrop body, large head, an elegant neck and long tail feathers that flow like falling water.",
      silhouette:
        "Graceful standing pose with a smooth crest and tail feathers that pool around its feet.",
      face: "Small rounded beak and a serene closed-mouth smile.",
      eyes: "Large calm eyes with a reflective silver-blue sheen.",
      markings: "Ripple-shaped rings along the wing feathers.",
      signatureFeature: "Tail feathers that shimmer and ripple like water.",
      palette: { primary: "#3E7CB1", secondary: "#E3F1FB", accent: "#9CD8E6", glow: "#B8E2F5" },
    },
  },
  {
    id: "astra",
    since: V1,
    name: "Astra",
    species: "Phoenix",
    element: "Starlight",
    personality: "Guardian",
    build: "sturdy",
    strengths: ["Bravery", "Keeping watch"],
    learningStyle: "Learns by keeping a steady routine",
    tagline: "Keeps watch under the stars",
    description: "A brave little phoenix who keeps watch over its friends through the night.",
    story:
      "Astra perches at the top of the Crystal Forest every evening and counts the stars as they appear. If a friend is still out exploring, Astra's crest glows like a beacon until they find their way home.",
    traits: ["Brave", "Watchful", "Warm"],
    abilities: ["Star beacon", "Night guard"],
    explanation: {
      preference: "{name} keeps a bright watch so nobody is left in the dark.",
      kindred: "{name} brings steady courage and a watchful heart.",
    },
    visual: {
      proportions:
        "Baby phoenix chick: round, sturdy body, big head, strong little legs and short, broad wings.",
      silhouette: "Upright guard pose with a tall star-tipped crest and a fanned tail.",
      face: "Small rounded beak and a determined, friendly expression.",
      eyes: "Large deep-violet eyes with bright star points.",
      markings: "Constellation speckles across the chest and wing tips.",
      signatureFeature: "A crest whose tip glows like a single bright star.",
      palette: { primary: "#5B4BB7", secondary: "#EDE9FF", accent: "#F6D27A", glow: "#C9BFFF" },
    },
  },
  {
    id: "comet",
    since: V1,
    name: "Comet",
    species: "Dragon",
    element: "Starlight",
    personality: "Explorer",
    build: "sleek",
    strengths: ["Big questions", "Fast learning"],
    learningStyle: "Learns by asking big questions",
    tagline: "Chases every shooting star",
    description: "A sleek baby dragon who zooms after shooting stars to see where they land.",
    story:
      "Comet hatched under a meteor shower and has been chasing shooting stars ever since. Each night it zooms a little further across the sky, and each morning it comes back with a new question to explore.",
    traits: ["Daring", "Curious", "Speedy"],
    abilities: ["Stardust dash", "Comet tail"],
    explanation: {
      preference: "{name} zooms after every shooting star to see where it lands.",
      kindred: "{name} brings a daring, starry curiosity to everything you explore.",
    },
    visual: {
      proportions:
        "Baby dragon: slim streamlined body, big head, short legs, swept-back wings and a long tail.",
      silhouette: "Gliding pose with wings swept back and a long tail trailing behind.",
      face: "Smooth rounded snout and an excited open smile.",
      eyes: "Large bright eyes with swirling galaxy highlights.",
      markings: "Star-dust speckles along the wings and a pale belly.",
      signatureFeature: "A tail that leaves a short sparkling trail like a comet.",
      palette: { primary: "#2E3B8F", secondary: "#DCE3FF", accent: "#F8C8F0", glow: "#9FB2FF" },
    },
  },
  {
    id: "mochi",
    since: V1,
    name: "Mochi",
    species: "Dragon",
    element: "Wind",
    personality: "Nurturer",
    build: "soft",
    strengths: ["Gentleness", "Making friends welcome"],
    learningStyle: "Learns by sharing ideas with friends",
    tagline: "Floats in to cheer everyone up",
    description: "A soft, cloud-like baby dragon who floats over to help anyone feeling down.",
    story:
      "Mochi drifts between the Floating Islands on warm breezes, looking for anyone who needs a friend. It is so soft and round that a hug from Mochi feels like sinking into a cloud.",
    traits: ["Gentle", "Huggable", "Cheerful"],
    abilities: ["Cloud cushion", "Warm breeze"],
    explanation: {
      preference: "{name} floats over on a warm breeze whenever a friend needs cheering up.",
      kindred: "{name} brings gentle care and a cheerful hug to every friend.",
    },
    visual: {
      proportions:
        "Baby dragon: very round cloud-soft body, big head, tiny legs, small fluffy wings and a short curled tail.",
      silhouette: "Floating puffball pose with two tiny rounded horns and cloud-like wings.",
      face: "Short rounded snout, rosy cheeks and a big happy smile.",
      eyes: "Large gentle eyes with a soft sky-blue shine.",
      markings: "Soft cloud-shaped patches on the wings and a lighter belly.",
      signatureFeature: "Fluffy wings that look like little puffs of cloud.",
      palette: { primary: "#A9D8F2", secondary: "#FFFFFF", accent: "#F7B7C8", glow: "#DDF1FC" },
    },
  },
  {
    id: "embun",
    since: V1,
    name: "Embun",
    species: "Lion",
    element: "Water",
    personality: "Nurturer",
    build: "soft",
    strengths: ["Kind listening", "Calm support"],
    learningStyle: "Learns through gentle, steady practice",
    tagline: "Brings calm like morning dew",
    description: "A gentle lion cub who brings calm and comfort wherever it goes.",
    story:
      "Embun wakes early beside the Moonlit Lagoon, when dew still sparkles on every leaf. It pads quietly from friend to friend, and a nuzzle from its soft, cool mane makes worries feel smaller.",
    traits: ["Soothing", "Patient", "Tender"],
    abilities: ["Dewdrop mane", "Calm tide"],
    explanation: {
      preference: "{name} brings a calm, gentle comfort wherever you go.",
      kindred: "{name} brings soothing comfort and kind listening to every friend.",
    },
    visual: {
      proportions:
        "Baby lion cub: soft round body, big round head, short legs, oversized paws and a slim tail with a droplet-shaped tuft.",
      silhouette: "Relaxed lying pose with a soft, cloud-like mane.",
      face: "Round muzzle and a sleepy, gentle smile.",
      eyes: "Large soft aqua eyes with dewdrop highlights.",
      markings: "Pale droplet spots on the paws and a lighter muzzle.",
      signatureFeature: "A soft mane sprinkled with glowing dewdrops.",
      palette: { primary: "#6CC3C1", secondary: "#EFFAF9", accent: "#F5C77E", glow: "#BFEDEB" },
    },
  },
  {
    id: "spark",
    since: V1,
    name: "Spark",
    species: "Unicorn",
    element: "Fire",
    personality: "Explorer",
    build: "graceful",
    strengths: ["Enthusiasm", "Bold ideas"],
    learningStyle: "Learns by experimenting",
    tagline: "Lights a new trail wherever it gallops",
    description:
      "A lively baby unicorn whose glowing hooves leave a trail of sparks wherever it explores.",
    story:
      "Spark gallops through the Ancient Sky Gardens at sunrise, leaving a trail of warm sparks behind it. It loves finding paths nobody has taken yet, and its friends follow the glowing hoofprints to join the adventure.",
    traits: ["Lively", "Bold", "Joyful"],
    abilities: ["Spark trail", "Sunrise horn"],
    explanation: {
      preference: "{name} gallops ahead, lighting a new trail for you to follow.",
      kindred: "{name} brings bright, bold energy to every new trail.",
    },
    visual: {
      proportions:
        "Baby unicorn foal: light round body, big head, long slender legs and a flowing tail.",
      silhouette: "Prancing pose with a flame-like mane and a short spiral horn.",
      face: "Soft rounded muzzle and a delighted open smile.",
      eyes: "Large bright eyes with warm golden flecks.",
      markings: "Glowing ember-coloured hooves and a sunrise gradient on the mane.",
      signatureFeature: "Hooves that leave small, harmless sparks with every step.",
      palette: { primary: "#F28A5C", secondary: "#FFF1E6", accent: "#FFD166", glow: "#FFB38A" },
    },
  },
];

function deepFreeze<T>(value: T): T {
  if (value && typeof value === "object") {
    for (const child of Object.values(value)) deepFreeze(child);
    Object.freeze(value);
  }
  return value;
}

export const COMPANION_CATALOGUE: CompanionCatalogue = deepFreeze({
  version: V1,
  style:
    "Premium stylised 3D baby companion: soft rounded forms, oversized head and eyes, gentle smile, velvety matte fur, feathers or scales, soft cinematic rim light. Cute, friendly and noble; never scary.",
  archetypes: ARCHETYPES,
});

export class CatalogueError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CatalogueError";
  }
}

const HEX = /^#[0-9A-F]{6}$/;
const ID = /^[a-z][a-z0-9-]{1,39}$/;
const text = (value: unknown, max = 400) =>
  typeof value === "string" && value.trim() === value && value.length > 0 && value.length <= max;

/** Throws if a catalogue cannot be matched against safely. */
export function validateCatalogue(catalogue: CompanionCatalogue): void {
  const fail = (message: string): never => {
    throw new CatalogueError(message);
  };
  if (!text(catalogue.version, 60) || !text(catalogue.style, 600))
    fail("Catalogue needs a version and style");
  if (!Array.isArray(catalogue.archetypes) || catalogue.archetypes.length < 2)
    fail("Catalogue needs archetypes");
  const ids = new Set<string>();
  const names = new Set<string>();
  for (const a of catalogue.archetypes) {
    if (!ID.test(a.id) || ids.has(a.id)) fail(`Invalid or duplicate archetype ID: ${a.id}`);
    if (!text(a.name, 24) || names.has(a.name)) fail(`Invalid or duplicate name: ${a.name}`);
    ids.add(a.id);
    names.add(a.name);
    if (!text(a.since, 60)) fail(`${a.id}: missing catalogue version`);
    if (!(NOVA_CREATURES as readonly string[]).includes(a.species))
      fail(`${a.id}: unknown species`);
    if (!(ELEMENTS as readonly string[]).includes(a.element)) fail(`${a.id}: unknown element`);
    if (!(PERSONALITIES as readonly string[]).includes(a.personality))
      fail(`${a.id}: unknown personality`);
    if (!(BUILDS as readonly string[]).includes(a.build)) fail(`${a.id}: unknown build`);
    for (const list of [a.strengths, a.traits, a.abilities])
      if (!Array.isArray(list) || list.length < 2 || !list.every((v) => text(v, 40)))
        fail(`${a.id}: lists need at least two short entries`);
    for (const value of [a.learningStyle, a.tagline, a.description, a.story])
      if (!text(value)) fail(`${a.id}: missing text`);
    for (const template of [a.explanation.preference, a.explanation.kindred])
      if (
        !text(template, 200) ||
        !template.includes("{name}") ||
        /\{(?!name\})[^}]*\}/.test(template)
      )
        fail(`${a.id}: explanation templates may only use {name}`);
    const v = a.visual;
    for (const value of [
      v.proportions,
      v.silhouette,
      v.face,
      v.eyes,
      v.markings,
      v.signatureFeature,
    ])
      if (!text(value)) fail(`${a.id}: incomplete visual specification`);
    if (
      !Object.values(v.palette).every((hex) => HEX.test(hex)) ||
      Object.keys(v.palette).length !== 4
    )
      fail(`${a.id}: palette needs four #RRGGBB colours`);
  }
  if (new Set(catalogue.archetypes.map((a) => a.species)).size < 2)
    fail("Catalogue needs at least two species so the second companion can differ");
}
