import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch2-ekosistem.png";
import tropicalImage from "@/assets/notes/form2-science/chapter-2/chapter2_tropical_adaptation.webp";
import desertImage from "@/assets/notes/form2-science/chapter-2/chapter2_desert_adaptation.webp";
import tundraImage from "@/assets/notes/form2-science/chapter-2/chapter2_tundra_adaptation.webp";
import carbonOxygenCycleImage from "@/assets/notes/form2-science/chapter-2/chapter2_carbon_oxygen_cycle.webp";
import waterCycleImage from "@/assets/notes/form2-science/chapter-2/chapter2_water_cycle.webp";

export const scienceF2C2InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 2,
  blogHighlight: {
    title: "Science Blog — Monkey Control at Taman Tasik Perdana",
    body: "When the long-tailed macaque population grew too large, wildlife officers used humane population management. This is a real example of careful human intervention to restore an ecosystem's balance.",
    imagePath: chapterImage,
  },
  keywords: [
    "Ecosystem",
    "Producer",
    "Consumer",
    "Decomposer",
    "Primary carnivore",
    "Food chain",
    "Food web",
    "Nutrient cycle",
    "Adaptation",
    "Symbiosis",
    "Biological control",
  ],
  sections: [
    // ───────────────────────────────────────────── SP 2.1.1
    {
      number: "2.1.1",
      title: "Producers, Consumers and Decomposers",
      intro:
        "Energy enters almost every ecosystem as sunlight. Producers trap it through photosynthesis, consumers obtain it by feeding, and decomposers return nutrients to the environment.",
      cards: [
        {
          title: "Producer",
          body: "Green plants make their own food through photosynthesis. Every food chain begins here.",
          detail: "First trophic level",
        },
        {
          title: "Primary consumer",
          body: "Herbivores and omnivores that eat producers. Examples: caterpillar, snail, grasshopper.",
          detail: "Eats producers",
        },
        {
          title: "Secondary consumer (primary carnivore)",
          body: "Omnivores and carnivores that eat primary consumers. Because it is the first carnivore in that chain, it is called a primary carnivore. Example: kingfisher.",
          detail: "Primary carnivore",
        },
        {
          title: "Tertiary consumer (secondary carnivore)",
          body: "A carnivore that eats secondary consumers, usually larger in size. Because it is the second carnivore in that chain, it is called a secondary carnivore. Examples: civet, snake.",
          detail: "Secondary carnivore",
        },
        {
          title: "Decomposer",
          body: "Bacteria and fungi break dead organisms and waste down into simple nutrients. This relationship is called saprophytism.",
          detail: "Nutrients recycled",
        },
      ],
      checks: [
        {
          question: "Why does every food chain begin with a producer?",
          hint: "Only producers can convert light energy into chemical energy in food; every other level depends on them.",
        },
        {
          question: "How do secondary and tertiary consumers differ in carnivore terms?",
          hint: "A secondary consumer is a primary carnivore; a tertiary consumer is a secondary carnivore.",
        },
        {
          question: "What would happen to an ecosystem with no decomposers?",
          hint: "Nutrients would stay locked in dead organisms and could not be reused by producers, so plants would eventually fail to thrive.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.1.2
    {
      number: "2.1.2",
      title: "Food Chains and Food Webs",
      intro:
        "A food chain shows one straight feeding pathway. A food web is several interconnected food chains within the same ecosystem.",
      sequence: {
        title: "Food chain: one straight pathway",
        instruction: "Follow the energy from the producer up to the top consumer.",
        steps: [
          { title: "Cabbage", body: "The producer traps light energy through photosynthesis." },
          { title: "Snail", body: "The primary consumer eats the cabbage." },
          { title: "Bird", body: "The secondary consumer (primary carnivore) eats the snail." },
          {
            title: "Civet",
            body: "The tertiary consumer (secondary carnivore) receives the smallest share of the original energy.",
          },
        ],
      },
      foodWeb: {
        title: "Food web: many chains crossing",
        instruction:
          "This vegetable-garden food web is built from four food chains that share the same organisms.",
        arrowNote: "Each arrow points towards the organism that EATS — that is the direction energy flows.",
        tapHint: "Tap an organism to see every chain running through it, or tap a chain below.",
        chainsLabel: "Food chains inside this web",
        tierLabels: ["Producer", "Primary consumer", "Secondary consumer", "Tertiary consumer"],
        nodes: [
          { id: "kubis", label: "Cabbage", tier: 0, icon: "🥬" },
          { id: "beluncas", label: "Caterpillar", tier: 1, icon: "🐛" },
          { id: "siput", label: "Snail", tier: 1, icon: "🐌" },
          { id: "belalang", label: "Grasshopper", tier: 1, icon: "🦗" },
          { id: "burung", label: "Bird", tier: 2, icon: "🐦" },
          { id: "katak", label: "Frog", tier: 2, icon: "🐸" },
          { id: "ular", label: "Snake", tier: 3, icon: "🐍" },
        ],
        edges: [
          { from: "kubis", to: "beluncas" },
          { from: "kubis", to: "siput" },
          { from: "kubis", to: "belalang" },
          { from: "beluncas", to: "burung" },
          { from: "siput", to: "burung" },
          { from: "belalang", to: "burung" },
          { from: "belalang", to: "katak" },
          { from: "burung", to: "ular" },
          { from: "katak", to: "ular" },
        ],
      },
      cards: [
        {
          title: "Energy flows one way",
          body: "Energy is not recycled the way nutrients are. At every level some energy is used for movement and life processes such as respiration, and is released as heat.",
          detail: "This is why food chains are short",
        },
        {
          title: "An extra loss in consumers",
          body: "Consumers also lose energy in undigested food, that is, faeces. Producers do not have this kind of loss because they make their own food.",
          detail: "Specific to animals",
        },
      ],
      checks: [
        {
          question: "How is a food web different from a food chain?",
          hint: "A food chain is one straight pathway; a food web combines several interconnected food chains.",
        },
        {
          question: "In the web above, how many food chains can be built and what do they share?",
          hint: "Four. All of them start with cabbage (producer) and end with the snake (tertiary consumer).",
        },
        {
          question: "Why is energy not recycled in an ecosystem?",
          hint: "It is lost as heat through respiration and movement at every level, and in consumers also through faeces.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.2.1
    {
      number: "2.2.1",
      title: "The Carbon and Oxygen Cycles",
      images: [
        {
          src: carbonOxygenCycleImage,
          imageKey: [
            { color: "#ef4444", label: "Red arrow = releasing carbon dioxide" },
            { color: "#3b82f6", label: "Blue arrow = releasing oxygen" },
          ],
          annotationMode: "hybrid",
          size: "wide",
          alt: "A woodland scene showing carbon dioxide and oxygen moving between the sun, a tree, a grazing deer, decomposers in the soil and a fire.",
          aspect: "3 / 2",
          legendLabel: "Parts of the carbon and oxygen cycles",
          caption: "Tap each number to see the process happening at that point.",
          annotations: [
            { id: "sunlight", label: "Sunlight", x: 10, y: 27, note: "The energy source that drives photosynthesis." },
            { id: "photosynthesis", label: "Photosynthesis", x: 19, y: 47, note: "The tree takes in carbon dioxide and releases oxygen." },
            { id: "carbon-dioxide", label: "Carbon dioxide", x: 50, y: 20, note: "Taken in by green plants and returned by respiration, decomposition and combustion." },
            { id: "oxygen", label: "Oxygen", x: 63, y: 22, note: "Released by photosynthesis and used in respiration." },
            { id: "feeding", label: "Feeding", x: 47, y: 63, note: "Carbon passes from plants to animals through food." },
            { id: "respiration", label: "Respiration", x: 60, y: 52, note: "Animals and plants release carbon dioxide." },
            { id: "decomposition", label: "Decomposition", x: 64, y: 82, note: "Decomposers break down dead remains and release carbon dioxide." },
            { id: "combustion", label: "Combustion", x: 88, y: 66, note: "Burning fuel releases carbon dioxide into the air." },
          ],
        },
      ],
      intro:
        "Unlike energy, carbon and oxygen are cycled continuously between organisms and the environment. The two cycles are linked through photosynthesis and respiration.",
      tabs: [
        {
          title: "Carbon cycle",
          body: "Photosynthesis absorbs carbon dioxide from the air. Carbon passes to animals through feeding. Respiration, decay by decomposers and combustion return carbon dioxide to the atmosphere.",
        },
        {
          title: "Oxygen cycle",
          body: "Photosynthesis by green plants releases oxygen into the air. Respiration by animals and plants, decay by decomposers and combustion use that oxygen again.",
        },
      ],
      cards: [
        {
          title: "Role of green plants",
          body: "Photosynthesis absorbs carbon dioxide and releases oxygen, keeping the balance of both gases in the air.",
        },
        {
          title: "Role of animals and plants",
          body: "Respiration uses oxygen and releases carbon dioxide — this happens in animals and in plants.",
        },
        {
          title: "Role of decomposers",
          body: "Bacteria and fungi break down dead organisms using oxygen and releasing carbon dioxide, while returning nutrients to the soil.",
        },
      ],
      checks: [
        {
          question: "Name three processes that return carbon dioxide to the atmosphere.",
          hint: "Respiration, decay (decomposition) and combustion.",
        },
        {
          question: "How are the carbon and oxygen cycles linked?",
          hint: "Photosynthesis absorbs CO₂ and releases O₂; respiration and decay do the opposite.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.2.2
    {
      number: "2.2.2",
      title: "The Water Cycle",
      images: [
        {
          src: waterCycleImage,
          annotationMode: "hybrid",
          size: "wide",
          alt: "A coastal scene showing water moving from the sea into cloud, falling as rain, running over the land, soaking into the soil and being taken up by tree roots.",
          aspect: "16 / 9",
          legendLabel: "Processes in the water cycle",
          caption: "Tap each number to see the process happening at that point.",
          annotations: [
            { id: "evaporation", label: "Evaporation", x: 15, y: 56, note: "The sun's heat turns sea water into water vapour." },
            { id: "condensation", label: "Condensation", x: 29, y: 30, note: "Water vapour cools high in the air and forms cloud." },
            { id: "precipitation", label: "Precipitation", x: 50, y: 38, note: "Droplets in the cloud grow heavy enough to fall as rain." },
            { id: "runoff", label: "Surface runoff", x: 52, y: 71, note: "Rain flows across the land back into rivers and the sea." },
            { id: "infiltration", label: "Infiltration", x: 91, y: 66, note: "Some rain soaks down into the soil." },
            { id: "groundwater", label: "Groundwater", x: 44, y: 93, note: "Water held within layers of soil and rock." },
            { id: "root-uptake", label: "Root uptake", x: 80, y: 52, note: "Roots absorb water from the soil." },
            { id: "transpiration", label: "Transpiration", x: 80, y: 12, note: "Water leaves the plant as vapour through the leaves." },
          ],
        },
      ],
      intro:
        "Water moves continuously between Earth and the atmosphere. Living things do not merely use water — they help drive and regulate the water cycle itself.",
      tabs: [
        {
          title: "Physical processes",
          body: "Evaporation lifts water vapour into the atmosphere; condensation forms clouds; precipitation returns water to Earth, where it infiltrates the soil or runs off the surface.",
        },
        {
          title: "Role of living things",
          body: "Plant roots absorb water from the soil and leaves release it again through transpiration. Animals release water vapour through respiration, sweating and excretion. All of these add water vapour to the atmosphere.",
        },
      ],
      causeEffect: {
        title: "Why plants matter to the water cycle",
        instruction: "Each role contributes to the water cycle in a different way.",
        items: [
          {
            icon: "🌿",
            title: "Transpiration",
            chain: [
              "Roots absorb water from the soil",
              "Leaves release water vapour",
              "Water vapour in the atmosphere increases",
            ],
          },
          {
            icon: "🌱",
            title: "Roots grip the soil",
            chain: [
              "Roots bind the soil structure",
              "Underground water flow slows down",
              "Soil erosion is prevented",
            ],
          },
          {
            icon: "🍂",
            title: "Fallen leaves cover the ground",
            chain: [
              "Leaf litter covers the soil surface",
              "The rate of evaporation falls",
              "The soil does not dry out quickly",
            ],
          },
        ],
      },
      checks: [
        {
          question: "Give two changes of state that occur in the water cycle.",
          hint: "Evaporation (liquid → gas) and condensation (gas → liquid).",
        },
        {
          question: "Justify why clearing a forest can disrupt the water cycle.",
          hint: "Fewer trees means less transpiration, roots no longer grip the soil, and there is less leaf litter — less water returns to the atmosphere and erosion increases.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.2.3
    {
      number: "2.2.3",
      title: "Disruptions to the Nutrient Cycle",
      intro:
        "The three human activities below disrupt the nutrient cycle. For each one the effect can be traced and a solution can be applied.",
      causeEffect: {
        title: "Problems and their solutions",
        instruction: "Follow the chain of effects, then read the matching solution on the green line.",
        items: [
          {
            icon: "🪓",
            title: "Uncontrolled deforestation",
            chain: [
              "The number of trees falls",
              "Photosynthesis and transpiration decrease",
              "Less CO₂ is absorbed and less water returns to the atmosphere",
              "The carbon cycle and water cycle are disrupted",
            ],
            note: "Solution: replant trees and tighten forestry law enforcement.",
          },
          {
            icon: "🏭",
            title: "Burning fossil fuels",
            chain: [
              "Vehicles and industry burn fossil fuels",
              "Oxygen is used up and extra carbon dioxide is released",
              "Atmospheric CO₂ rises",
              "The greenhouse effect becomes stronger",
            ],
            note: "Solution: use public transport and cleaner energy sources.",
          },
          {
            icon: "💧",
            title: "Excessive use of water (agricultural and domestic)",
            chain: [
              "Water is drawn off excessively for irrigation and daily use",
              "Groundwater, river and lake stores fall",
              "Less water is available for plants and animals",
              "The water cycle is disrupted and ecosystem resources shrink",
            ],
            note: "Solution: conserve water, harvest rainwater and set up planned agricultural systems.",
          },
        ],
      },
      accordions: [
        {
          title: "⭐ Additional Knowledge — Fertiliser overuse and eutrophication",
          body: "Excess fertiliser is washed into rivers and lakes. The extra nutrients trigger algal blooms; when the algae die and decompose, dissolved oxygen in the water falls and aquatic life suffers.",
        },
      ],
      checks: [
        {
          question: "Name three human activities that disrupt the nutrient cycle.",
          hint: "Uncontrolled deforestation, burning fossil fuels, and excessive use of water for agriculture and domestic purposes.",
        },
        {
          question: "Suggest two steps to conserve water.",
          hint: "Harvest rainwater for daily use and plan agricultural irrigation so that water is not wasted.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.3.1
    {
      number: "2.3.1",
      title: "Interdependence and Ecological Terms",
      intro:
        "Before studying interactions, learn the five basic ecological terms. Species, population and community are levels of living organisation; a habitat is a place, not a level.",
      ecologicalTerms: {
        title: "How these terms relate",
        instruction:
          "Notice that habitat is not the next level after community. A habitat is a place, while an ecosystem forms when a community interacts with its non-living surroundings.",
        levelsLabel: "Levels of living organisation",
        placeLabel: "The place they live",
        ecosystemLabel: "How an ecosystem forms",
        species: {
          term: "Species",
          definition: "Similar organisms that can interbreed with one another.",
        },
        population: {
          term: "Population",
          definition: "All the organisms of the same species in the same habitat.",
        },
        community: {
          term: "Community",
          definition: "Several different populations living together and interacting.",
          short: "All the living things in that area.",
        },
        habitat: {
          term: "Habitat",
          definition: "The natural dwelling place of an organism — a pond, a forest or the soil.",
        },
        nonLiving: {
          term: "Non-living environment",
          definition: "Water, air, light, temperature and soil.",
        },
        ecosystem: {
          term: "Ecosystem",
          definition: "A community together with its non-living surroundings, interacting as one unit.",
        },
        note: "A common mistake: listing species → population → community → habitat → ecosystem as a single ladder. A habitat is a place, not a level of organisation.",
      },
      cards: [
        {
          title: "Species",
          body: "A group of organisms with similar characteristics that can interbreed to produce offspring.",
        },
        {
          title: "Population",
          body: "A group of organisms of the same species living in the same habitat. Example: one population of dragonflies in a pond.",
        },
        {
          title: "Community",
          body: "Several different populations of organisms living together in one habitat and interacting with one another.",
        },
        {
          title: "Habitat",
          body: "The natural surroundings or dwelling place of an organism. Examples: a pond, a forest, the soil.",
        },
        {
          title: "Ecosystem",
          body: "Several communities living together in one habitat and interacting with one another, including non-living components such as water, air and soil.",
        },
      ],
      comparison: {
        title: "A balanced ecosystem",
        columns: [
          {
            title: "What makes it balanced",
            body: "Organisms depend on one another and on non-living components (water, light, air, soil). An ecosystem is said to be balanced when all of these are in harmony without outside disturbance.",
          },
          {
            title: "Natural and man-made ecosystems",
            body: "A forest and a pond are natural ecosystems. An aquarium is a man-made ecosystem — it too can be balanced as long as the organisms and non-living components inside it interact harmoniously.",
          },
        ],
      },
      checks: [
        {
          question: "Arrange these terms from the smallest scope: community, species, ecosystem, population.",
          hint: "Species → population → community → ecosystem.",
        },
        {
          question: "How does a habitat differ from an ecosystem?",
          hint: "A habitat is where an organism lives; an ecosystem includes all the communities there together with the non-living components.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.3.2
    {
      number: "2.3.2",
      title: "Adaptation of Living Things",
      intro:
        "Every habitat imposes a different challenge. An adaptation is a body feature or behaviour that lets an organism overcome that challenge — without it, the organism could not survive there.",
      adaptations: {
        title: "Challenge → adaptation → function → advantage",
        instruction:
          "Choose a habitat, then follow the chain for the animal and the plant. Notice that each adaptation solves that habitat's specific challenge.",
        labels: {
          challenge: "Habitat challenge",
          adaptation: "Adaptation",
          role: "What it does",
          benefit: "Survival advantage",
          animal: "Animal",
          plant: "Plant",
        },
        cases: [
          {
            id: "tropical",
            habitat: "Tropical",
            challenge:
              "Heavy rainfall and abundant sunshine all year. Tall trees compete for light, and the soil is constantly damp and waterlogged.",
            imagePath: tropicalImage,
            imageAnnotationMode: "callouts",
            imageSize: "compact",
            imageAlt:
              "A monkey gripping a branch in the rainforest, beside broad leaves whose tapered tips shed drops of rainwater.",
            imageAspect: "16 / 9",
            imageAnnotations: [
              { id: "hands", label: "Grasping hands", x: 36, y: 10, note: "Hands that grip branches firmly, letting the monkey move and hang high in the canopy." },
              { id: "feet", label: "Grasping feet", x: 35, y: 56, note: "Feet that grip like hands, giving extra hold so the monkey does not fall." },
              { id: "limbs", label: "Long limbs", x: 28, y: 25, note: "Long limbs let the monkey reach distant branches and move quickly through the trees." },
              { id: "leaves", label: "Broad leaves", x: 80, y: 42, note: "Broad leaves capture as much sunlight as possible under the shaded forest canopy." },
              { id: "driptip", label: "Drip tips", x: 57, y: 57, note: "The tapered leaf tip drains rainwater quickly so the leaf does not rot from standing water." },
            ],
            organisms: [
              {
                kind: "animal",
                name: "Monkey",
                adaptation: "Long limbs and a strong tail for climbing.",
                role: "Lets it move through the high forest canopy.",
                benefit: "It can reach fruit and leaves above, away from predators on the forest floor.",
              },
              {
                kind: "plant",
                name: "Rainforest tree",
                adaptation: "Broad leaves with a pointed tip (a drip tip).",
                role: "Broad leaves capture maximum light; the pointed tip drains rainwater quickly.",
                benefit: "Photosynthesis continues without leaves rotting from standing water.",
              },
            ],
          },
          {
            id: "desert",
            habitat: "Desert",
            challenge:
              "Extremely hot days, cold nights and very little rain. Water loss is the main threat.",
            imagePath: desertImage,
            imageAnnotationMode: "callouts",
            imageSize: "compact",
            imageAlt:
              "A camel standing in the desert beside a thick-stemmed cactus whose roots spread out shallowly below the sand.",
            imageAspect: "3 / 2",
            imageAnnotations: [
              { id: "hump", label: "Hump", x: 27, y: 29, note: "The hump stores fat as an energy reserve. Keeping fat in one place stops heat being trapped all over the body." },
              { id: "eyelashes", label: "Long eyelashes", x: 50, y: 25, note: "Long eyelashes keep sand out of the eyes during sandstorms." },
              { id: "legs", label: "Long legs", x: 30, y: 63, note: "Long legs hold the body away from the scorching hot sand." },
              { id: "feet", label: "Broad padded feet", x: 34, y: 84, note: "Broad padded feet spread the camel's weight so it does not sink into the sand." },
              { id: "spines", label: "Spines", x: 84, y: 30, note: "Leaves reduced to spines cut the surface area, so water loss by transpiration is very low. The spines also protect the cactus from being eaten." },
              { id: "stem", label: "Thick water-storing stem", x: 79, y: 45, note: "The thick stem stores water, letting the cactus survive through the dry season." },
              { id: "roots", label: "Wide shallow roots", x: 78, y: 85, note: "Wide, shallow roots soak up rainwater quickly over a large area before it evaporates." },
            ],
            organisms: [
              {
                kind: "animal",
                name: "Camel",
                adaptation: "A hump that stores fat, and a body that tolerates water loss.",
                role: "The fat is an energy store that does not trap heat across the whole body.",
                benefit: "It can survive long periods without food and water while crossing the desert.",
              },
              {
                kind: "plant",
                name: "Cactus",
                adaptation: "Leaves reduced to spines and a thick stem that stores water.",
                role: "Spines cut the surface area so that transpiration is very low.",
                benefit: "Stored water lasts through the dry season and the spines protect it from being eaten.",
              },
            ],
          },
          {
            id: "tundra",
            habitat: "Tundra",
            challenge:
              "A long winter with very low temperatures, a short summer, frozen ground and strong winds across a treeless plain.",
            imagePath: tundraImage,
            imageAnnotationMode: "callouts",
            imageSize: "compact",
            imageAlt:
              "An Arctic fox with thick fur standing on tundra covered in low-growing plants, mosses and lichens.",
            imageAspect: "16 / 9",
            imageAnnotations: [
              { id: "fur", label: "Thick fur", x: 19, y: 80, note: "Thick fur traps air and insulates the body against heat loss to the freezing surroundings." },
              { id: "ears", label: "Small ears", x: 36, y: 52, note: "Small ears reduce the surface area, so less body heat escapes through them." },
              { id: "body", label: "Compact body", x: 31, y: 66, note: "A compact body lowers the surface-area-to-volume ratio, making body heat easier to keep in." },
              { id: "lowplants", label: "Low-growing plants", x: 48, y: 88, note: "Low-growing plants hugging the ground avoid strong winds and trap a little warmth near the soil surface." },
              { id: "moss", label: "Mosses and lichens", x: 8, y: 90, note: "Mosses and lichens have no tall woody stems, so they can live on frozen ground with a very short summer." },
            ],
            organisms: [
              {
                kind: "animal",
                name: "Arctic fox",
                adaptation: "Thick fur, a layer of fat under the skin, small ears, and fur that turns white in winter.",
                role: "Fur and fat insulate body heat; small ears reduce heat loss; white fur camouflages it against snow.",
                benefit: "Its body temperature stays steady in extreme cold, and it can hunt without being easily seen.",
              },
              {
                kind: "plant",
                name: "Mosses and lichens",
                adaptation: "They grow low and close to the ground with no tall woody stem.",
                role: "This avoids the strong wind and traps a little warmth near the ground surface.",
                benefit: "They can live on shallow frozen ground where tall trees cannot root.",
              },
            ],
          },
        ],
      },
      cards: [
        {
          title: "Environmental factors decide distribution",
          body: "Temperature, light and humidity decide where organisms gather. In the woodlice investigation, the woodlice gathered in the damp, dark area at a moderate temperature.",
          detail: "Example lab investigation",
        },
      ],
      checks: [
        {
          question: "Justify why adaptation matters to an organism.",
          hint: "An adaptation solves the specific challenge of its habitat — without that feature the organism would lose water, heat, food or protection, and could not survive.",
        },
        {
          question: "Compare the cactus adaptation with the tundra moss adaptation.",
          hint: "The cactus stores water and cuts transpiration because its challenge is drought; the moss grows low because its challenge is cold, wind and frozen ground.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.3.3
    {
      number: "2.3.3",
      title: "Interactions Between Organisms",
      intro:
        "Interactions between organisms consist of symbiosis (mutualism, commensalism, parasitism), predator–prey and competition.",
      cards: [
        {
          title: "Mutualism",
          body: "Both organisms benefit. Example: the sea anemone shelters the clownfish from predators; the clownfish cleans the anemone and supplies nutrients from its food scraps.",
        },
        {
          title: "Commensalism",
          body: "One organism (the commensal) benefits; the other is unaffected. Example: the remora attaches to a shark and eats its food scraps without harming the shark.",
        },
        {
          title: "Parasitism",
          body: "One organism (the parasite) benefits; the host is harmed. Example: a tapeworm lives in the human intestine and absorbs nutrients from its host.",
        },
        {
          title: "Predator–prey",
          body: "One organism (the predator) hunts and eats another (the prey). Example: an owl hunts and eats rats.",
        },
        {
          title: "Competition",
          body: "Organisms in the same habitat compete for a limited supply of basic needs such as light, space, water, food or mates. It can occur within one species or between different species.",
        },
      ],
      matcher: {
        title: "Match the interaction",
        instruction: "Choose an interaction on the left, then its correct example.",
        pairs: [
          { id: "mutualism", label: "Mutualism", match: "Clownfish and sea anemone — both benefit" },
          { id: "commensalism", label: "Commensalism", match: "Remora benefits; the shark is unaffected" },
          { id: "parasitism", label: "Parasitism", match: "Tapeworm benefits; the human host is harmed" },
          { id: "predation", label: "Predator–prey", match: "An owl hunts and eats rats" },
          { id: "competition", label: "Competition", match: "Plants compete for light, water and space" },
        ],
      },
      accordions: [
        {
          title: "🦉 Biological control — applying interactions in daily life",
          body: "Biological control uses a natural predator, parasite or pathogen to reduce the number of pests. In Malaysia: owls control rats in oil palm estates, guppies eat mosquito larvae, ladybirds eat aphids, ducks eat snails in paddy fields, and Bacillus thuringiensis controls rhinoceros beetles.",
        },
        {
          title: "⚖️ Advantages over chemical control",
          body: "Biological control is more environmentally friendly because it uses no pesticides or chemicals. It is usually cheaper and it does not harm human health.",
        },
        {
          title: "⏳ Long-term effects to consider",
          body: "Biological control takes longer before its effect is visible. The balance of the ecosystem may also be disturbed because a new species is introduced into it — that species can itself become a problem if its population is not controlled.",
        },
      ],
      checks: [
        {
          question: "Distinguish mutualism from commensalism.",
          hint: "Mutualism: both benefit. Commensalism: one benefits and the other is unaffected (not harmed).",
        },
        {
          question: "Why is biological control safer than pesticide, and what is its risk?",
          hint: "Safer because there is no chemical pollution and no harm to health; the risk is that it acts slowly and the newly introduced species can disturb the ecosystem's balance.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.3.4
    {
      number: "2.3.4",
      title: "Factors Affecting Population Size",
      intro:
        "Population size does not stay constant. The four factors below can raise or lower it within an ecosystem.",
      causeEffect: {
        title: "Four main factors",
        instruction: "Each factor changes population size through its own chain of effects.",
        items: [
          {
            icon: "🦠",
            title: "Disease outbreak",
            chain: [
              "An outbreak spreads through the population",
              "Many individuals die or weaken",
              "Population size falls",
            ],
            note: "Examples: bird flu in poultry farms; tobacco mosaic disease in tobacco plantations.",
          },
          {
            icon: "🦁",
            title: "Presence of predators",
            chain: [
              "The number of predators rises",
              "More prey are eaten",
              "The prey population falls",
            ],
            note: "Example: the zebra population falls where lions are present in the savanna.",
          },
          {
            icon: "🎋",
            title: "Food source",
            chain: [
              "The main food source declines",
              "Organisms starve or move away",
              "The population is threatened with extinction",
            ],
            note: "Example: pandas depend on bamboo; conversely, plentiful food waste has raised the crow population in Malaysia.",
          },
          {
            icon: "☀️",
            title: "Drought (weather change)",
            chain: [
              "A prolonged drought occurs",
              "Soil becomes dry and infertile, and the risk of forest fire rises",
              "Plant and animal populations fall",
            ],
          },
        ],
      },
      checks: [
        {
          question: "Name the four factors that affect population size.",
          hint: "Disease outbreak, presence of predators, food source and drought (weather change).",
        },
        {
          question: "Why has the crow population in Malaysia increased?",
          hint: "An excessive amount of human food waste provides a plentiful food source.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.3.5
    {
      number: "2.3.5",
      title: "Changes in an Ecosystem",
      intro:
        "Changes in an ecosystem alter the resources available and disturb the balance between populations. Predict the effects by following the chains below.",
      causeEffect: {
        title: "Three kinds of change",
        instruction: "Notice how one change spreads to other populations.",
        items: [
          {
            icon: "💧",
            title: "Shortage of water supply",
            chain: [
              "A prolonged drought hits the paddy field",
              "Paddy (the producer) declines through lack of water",
              "Consumers that depend on it lose their food",
              "The whole food web is affected",
            ],
            note: "Paddy is a crop that needs a great deal of water, so it is affected first.",
          },
          {
            icon: "🕊️",
            title: "Migration",
            chain: [
              "Animals move from one place to another because of seasonal change",
              "Cattle egrets arrive at Kuala Gula, Perak from September to April",
              "The birds eat insects in that area",
              "Populations of grasshoppers, crickets, spiders, flies and earthworms fall",
            ],
            note: "Populations at both the source and the destination change.",
          },
          {
            icon: "📈",
            title: "Change in population size",
            chain: [
              "One population rises or falls sharply",
              "Other populations linked to it also change",
              "Example: beetles and caterpillars increase",
              "The plant population falls because it is eaten",
            ],
            note: "This knock-on effect also happens when a predator is removed — its prey will increase.",
          },
        ],
      },
      checks: [
        {
          question: "Predict the effect of a long drought on the food web in a paddy field.",
          hint: "Paddy as the producer declines, so every consumer that depends on it declines too — the whole web is affected.",
        },
        {
          question: "How does bird migration change the population balance at the destination?",
          hint: "The visiting birds eat local insects, so the insect population there falls during the migration season.",
        },
      ],
    },

    // ───────────────────────────────────────────── SP 2.4.1
    {
      number: "2.4.1",
      title: "The Role of Humans in Maintaining a Balanced Nature",
      intro:
        "Humans need a stable and productive ecosystem for sustainable living — it is where our food, clean water, safe air, raw materials and medicines come from. When an ecosystem is disturbed those resources suffer too, so humans are responsible for conserving nature's balance.",
      comparison: {
        title: "The cost of human activity to nature",
        columns: [
          {
            title: "Human pressure",
            body: "Deforestation causes species extinction, soil erosion and the greenhouse effect. Industry pollutes air, water and soil and causes acid rain. Unsustainable agriculture pollutes water and strips minerals from the soil. Dumping rubbish causes pollution, foul smells and flash floods.",
          },
          {
            title: "Restoring the balance",
            body: "Enforce the law (forest patrols and roadblocks by the Forestry Department), raise public awareness, practise the 5Rs, and use biological control in agriculture.",
          },
        ],
      },
      cards: [
        { title: "Refuse", body: "Avoid using materials that cannot be recycled." },
        { title: "Reduce", body: "Cut down the amount of material used." },
        { title: "Reuse", body: "Use an item again." },
        { title: "Recycle", body: "Process waste into new material." },
        { title: "Repurpose", body: "Give an old material a new function." },
      ],
      checks: [
        {
          question: "Justify why humans need a stable and productive ecosystem.",
          hint: "Ecosystems supply food, clean water, air, raw materials and medicines; if they are disturbed, our own supply of those resources suffers.",
        },
        {
          question: "List the 5Rs in full order.",
          hint: "Refuse, Reduce, Reuse, Recycle, Repurpose.",
        },
        {
          question: "How does logging disturb the balance of an ecosystem?",
          hint: "Habitat loss, species extinction, soil erosion, and higher atmospheric carbon dioxide because there is less photosynthesis.",
        },
      ],
    },
  ],
  reflectionItems: [
    "I can explain energy flow through producers, consumers and decomposers, including the primary and secondary carnivore terms.",
    "I can interpret a food chain and a food web.",
    "I can describe the carbon, oxygen and water cycles and the role of living things within them.",
    "I can explain disruptions to the nutrient cycle and suggest solutions.",
    "I can justify the importance of adaptation to the environment.",
    "I can compare the main interactions between organisms.",
    "I can predict how changes in an ecosystem affect the balance between populations.",
    "I can justify actions that keep an ecosystem balanced.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: Energy is recycled endlessly in an ecosystem.",
      answer: false,
      explanation:
        "Energy flows one way and much is lost as heat through respiration and movement; it is nutrients that are recycled.",
    },
    {
      type: "multiple-choice",
      question: "Why did rat numbers rise after eagles were removed?",
      options: ["Rats lost a food source", "Predation pressure decreased", "More decomposers appeared", "Rainfall stopped"],
      answerIndex: 1,
      explanation: "Removing a predator allows more prey to survive and reproduce.",
    },
  ],
};
