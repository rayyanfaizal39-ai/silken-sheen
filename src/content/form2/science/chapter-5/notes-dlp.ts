import type { ScienceChapter2Notes } from "@/data/content";

export const scienceF2C5NotesDLP: ScienceChapter2Notes = {
  chapterSummary:
    "Chapter 5 explains the physical characteristics of pure water (colourless, odourless, tasteless, boiling point 100°C, freezing point 0°C, density 1 g cm⁻³, high surface tension and capillary action caused by cohesive and adhesive forces), the changes of state of water through absorption/release of heat (melting, freezing, evaporation/boiling, condensation, sublimation), the composition of water as a compound of hydrogen and oxygen (H₂O) determined through electrolysis, the effects of impurities on the melting/boiling points of water, evaporation of water and the four factors affecting its rate (humidity, surrounding temperature, exposed surface area, movement of air), solute/solvent/solution and the three types of solutions (dilute, concentrated, saturated), the difference between solution and suspension, solubility and the three factors affecting the rate of solubility (temperature, rate of stirring, size of solute), colloids, water as a universal solvent, organic solvents, water purification methods (filtration, boiling, chlorination, distillation), the water supply system (filtration, oxidation, coagulation, sedimentation, filtration, chlorination and fluoridation), and water sustainability including water pollutants and ways to overcome water pollution.",
  quickRevision: [
    "Pure water is colourless, odourless and tasteless; boiling point = 100°C, freezing point = 0°C, density = 1 g cm⁻³.",
    "Surface tension is caused by cohesive force between water molecules; capillary action in plants uses BOTH cohesive force (between water molecules) and adhesive force (between water molecules and xylem cell walls).",
    "Changes of state: melting (solid→liquid), freezing (liquid→solid), evaporation/boiling (liquid→gas), condensation (gas→liquid), sublimation (solid↔gas directly). Heat is ABSORBED for melting/evaporation/sublimation(solid→gas); heat is RELEASED for freezing/condensation/sublimation(gas→solid).",
    "Water is a compound of hydrogen and oxygen, formula H₂O. Electrolysis of water produces oxygen gas at the ANODE and hydrogen gas at the CATHODE, in a volume ratio of hydrogen : oxygen = 2 : 1.",
    "Impurities LOWER the melting point of ice and RAISE the boiling point of water (e.g. adding salt).",
    "Evaporation occurs at the water surface at ANY temperature, when water molecules with higher kinetic energy escape into the air.",
    "4 factors affecting rate of evaporation: humidity (lower humidity → faster), surrounding temperature (higher → faster), exposed surface area (larger → faster), movement of air (faster → faster).",
    "Solute = substance that dissolves; Solvent = liquid that dissolves a substance; Solution = mixture formed when solute dissolves in solvent.",
    "3 types of solutions: dilute (little solute, can dissolve more), concentrated (more solute, can dissolve less), saturated (excess solute, forms precipitate, cannot dissolve more).",
    "Solution = clear, uniform mixture, light passes through, no residue when filtered. Suspension = cloudy, non-uniform mixture, blocks light, leaves residue when filtered, settles over time.",
    "Solubility = the maximum amount of solute that can dissolve in 100 ml of solvent at a specific temperature.",
    "3 factors affecting rate of solubility: temperature of solvent (higher → faster), rate of stirring (faster → faster), size of solute (smaller → faster, larger surface area).",
    "Colloid = intermediate between solution and suspension (e.g. shaving cream foam, milk/mayonnaise emulsion) — does not form a clear mixture or a precipitate.",
    "Water is a universal solvent because it can dissolve almost all substances — solid, liquid or gas.",
    "Organic solvents (carbon-based, used for substances insoluble in water): alcohol, kerosene, acetone, turpentine, ether.",
    "4 water purification methods: filtration, boiling, chlorination, distillation. Distillation is the only one that removes BOTH suspended particles AND dissolved substances AND kills microorganisms.",
    "Water supply system stages: Filtration → Oxidation → Coagulation (alum + slaked lime) → Sedimentation → Filtration → Chlorination and fluoridation.",
    "Water pollutants: domestic waste, industrial waste, chemicals in agriculture, oil spillage.",
  ],
  sections: [
    {
      title: "Chapter Introduction",
      subsections: [
        {
          content:
            "Water is a basic need of all life on Earth — no life would survive without it. More than 70% of the Earth's surface is covered by water. This chapter explores the physical characteristics of water, its composition, evaporation, solutions and solubility, colloids, water as a universal solvent, organic solvents, water purification methods, the water supply system, and water sustainability.\n\nScience Blog: The Dead Sea, located at the border of Jordan, is the saltiest sea in the world. Lying roughly 430.5 metres below sea level, it is the lowest point on Earth. The Dead Sea is completely surrounded by land, so water flowing from the Jordan River evaporates quickly, increasing its saltiness. This unusually high salt content makes the water very dense, causing natural buoyancy that allows people to easily float in it.",
        },
        {
          title: "Keywords",
          bulletPoints: [
            "Compound",
            "Capillary action",
            "Solubility",
            "Suspension",
            "Emulsion",
            "Saturated solution",
            "Universal solvent",
            "Oxidation",
            "Chlorination",
            "Water sustainability",
          ],
        },
      ],
    },
    {
      title: "5.1 Physical Characteristics of Water",
      subsections: [
        {
          title: "Physical Characteristics of Pure Water",
          content:
            "Pure water is colourless, odourless and tasteless. It exists as liquid at room temperature.",
          table: {
            headers: ["Property", "Value"],
            rows: [
              ["Boiling point", "100°C"],
              ["Freezing point", "0°C"],
              ["Colour", "Colourless"],
              ["Density", "1 g cm⁻³"],
            ],
          },
        },
        {
          title: "Surface Tension and Capillary Action",
          content:
            "Water has a high surface tension. Surface tension results from cohesive force between water molecules at the surface — this allows insects like the daddy longlegs to stay afloat on water. Cohesive force between water molecules and adhesive force between water molecules and the cell walls of xylem allow water to be drawn up from the roots to the leaves of plants. This phenomenon is known as capillary action.",
          bulletPoints: [
            "Cohesive force = attractive force between SAME molecules (e.g. water molecule and water molecule).",
            "Adhesive force = attractive force between DIFFERENT molecules (e.g. water molecule and xylem cell wall).",
          ],
        },
        {
          title: "Changes of State of Water",
          content:
            "Absorption and release of heat to the surroundings result in changes of the state of water.",
          table: {
            headers: ["Change of State", "Direction", "Heat"],
            rows: [
              ["Melting", "Solid → Liquid", "Absorbed"],
              ["Freezing", "Liquid → Solid", "Released"],
              ["Evaporation/Boiling", "Liquid → Gas", "Absorbed"],
              ["Condensation", "Gas → Liquid", "Released"],
              ["Sublimation", "Solid → Gas (directly)", "Absorbed"],
              ["Sublimation (reverse)", "Gas → Solid (directly)", "Released"],
            ],
          },
        },
        {
          title: "Composition of Water",
          content:
            "Water is a compound made up of oxygen and hydrogen that combine chemically. The composition of elements in a water molecule can be determined through electrolysis.",
          bulletPoints: [
            "During electrolysis, oxygen gas is produced at the ANODE (electrode connected to the positive terminal) while hydrogen gas is produced at the CATHODE (electrode connected to the negative terminal).",
            "A water molecule is made up of two hydrogen atoms and one oxygen atom — chemical formula H₂O.",
            "Volume ratio of hydrogen gas to oxygen gas collected = 2 : 1.",
            "Dilute hydrochloric acid is added to distilled water before electrolysis because pure water alone does not conduct electricity well; the acid increases the ions present to allow current to flow.",
            "Testing the gases: a glowing wooden splinter RELIGHTS in oxygen gas; a burning wooden splinter produces a 'pop' sound in hydrogen gas.",
          ],
        },
        {
          title: "Effects of Impurities on Melting Point and Boiling Point",
          content:
            "Impurities such as salt change the physical characteristics of water. A pot of chicken soup boils slower than a pot of plain water because of the dissolved impurities in the soup.",
          bulletPoints: [
            "Adding salt to ice LOWERS the melting point of ice (ice melts at a temperature below 0°C).",
            "Adding salt to water RAISES the boiling point of water (water boils at a temperature above 100°C).",
            "Other physical characteristics — taste, smell and colour — can also change in the presence of impurities (e.g. seawater tastes salty due to dissolved salt).",
          ],
        },
        {
          title: "Evaporation of Water",
          content:
            "Evaporation is the process that happens at the surface of water that changes water to water vapour. This process occurs at ANY temperature. The molecules of water at the surface have higher kinetic energy, allowing them to move faster and escape into the air.",
        },
        {
          title: "Factors Affecting the Rate of Evaporation of Water",
          table: {
            headers: ["Factor", "Effect on Rate of Evaporation"],
            rows: [
              ["Humidity", "Dry air (low humidity) can hold more water molecules escaping from the surface, so the rate of evaporation INCREASES."],
              ["Surrounding temperature", "Higher temperature gives surface water molecules more energy to move faster and escape, so the rate of evaporation INCREASES."],
              ["Exposed surface area of water", "A larger exposed surface area allows more water molecules to escape, so the rate of evaporation INCREASES."],
              ["Movement of air", "Moving air sweeps away water vapour from the surface; high wind speed dries the surface and INCREASES the rate of evaporation."],
            ],
          },
        },
        {
          title: "Applications of Evaporation of Water in Daily Life",
          bulletPoints: [
            "Clothes hung on clothes lines have a large exposed surface area, so they dry faster.",
            "Sea salt is obtained by evaporating seawater.",
            "Dried seafood can be kept longer because microorganisms cannot survive without water.",
            "Hair dryers blow hot air, increasing temperature and thus increasing evaporation.",
          ],
        },
        {
          title: "⭐ Must Know",
          bulletPoints: [
            "Pure water: colourless, odourless, tasteless, boiling point 100°C, freezing point 0°C, density 1 g cm⁻³.",
            "Surface tension = cohesive force only. Capillary action = cohesive force + adhesive force together.",
            "Electrolysis of water: Oxygen at ANODE, Hydrogen at CATHODE, ratio H₂:O₂ = 2:1.",
            "Impurities LOWER melting point, RAISE boiling point of water.",
            "Evaporation happens at ANY temperature (not just at boiling point) — happens at the surface only.",
            "4 factors of evaporation rate: humidity↓, temperature↑, surface area↑, air movement↑ — all INCREASE the rate (except humidity, which must DECREASE to increase rate).",
          ],
        },
        {
          title: "🎯 Exam Tips",
          bulletPoints: [
            "Distinguish cohesive force (SAME molecules — water-water) from adhesive force (DIFFERENT substances — water-xylem) — capillary action needs BOTH, surface tension needs only cohesive force.",
            "When asked to test gases from electrolysis: glowing splinter RELIGHTS = oxygen; burning splinter gives 'POP' sound = hydrogen. Remember the ratio H:O is 2:1 by volume, NOT by mass.",
          ],
        },
        {
          title: "⚠️ Common Mistakes",
          bulletPoints: [
            "Thinking evaporation only happens at 100°C — evaporation occurs at the water surface at ANY temperature; boiling is evaporation occurring throughout the liquid at 100°C specifically.",
            "Confusing the effect of salt: salt LOWERS the freezing/melting point of ice but RAISES the boiling point of water — these are opposite directions.",
            "Forgetting that humidity has an INVERSE relationship with evaporation rate (higher humidity = LOWER rate), unlike the other three factors which have a DIRECT relationship.",
          ],
        },
      ],
    },
    {
      title: "5.2 Solution and Rate of Solubility",
      subsections: [
        {
          title: "Solute, Solvent and Solution",
          content:
            "Solute is a substance that can dissolve in a liquid, whereas solvent is a liquid that dissolves a substance. Solution is the mixture formed when a solute dissolves in a solvent. For example, sugar (solute) dissolved in water (solvent) forms sugar water (solution).",
        },
        {
          title: "Dilute, Concentrated and Saturated Solutions",
          content: "The amount of solute in a solution affects the concentration of the solution.",
          table: {
            headers: ["Dilute Solution", "Concentrated Solution", "Saturated Solution"],
            rows: [
              [
                "Less amount of solute in the solvent; can dissolve MORE solute.",
                "More amount of solute in the solvent; can dissolve LESS solute.",
                "Excess amount of solute in the solvent; CANNOT dissolve any more solute and forms a precipitate.",
              ],
            ],
          },
        },
        {
          title: "Solution and Suspension",
          content:
            "Solution is a clear mixture formed when a solute dissolves in a solvent. Suspension is a cloudy mixture formed from undissolved solute particles in a solvent (e.g. river water containing sand particles).",
          table: {
            headers: ["Solution", "Suspension"],
            rows: [
              ["Clear, uniform colour and appearance", "Cloudy, non-uniform mixture"],
              ["Light passes through easily", "Light cannot pass through (particles too large)"],
              ["No residue left when filtered", "Leaves residue when filtered"],
              ["Does not settle over time", "Settles if left undisturbed"],
              ["Solute particles are tiny", "Solute particles are large enough to block light"],
            ],
          },
        },
        {
          title: "Solubility",
          content:
            "Solubility of a solute is the maximum amount of the solute that can dissolve in 100 ml of solvent at a specific temperature.",
        },
        {
          title: "Factors Affecting the Rate of Solubility",
          table: {
            headers: ["Factor", "Effect on Rate of Solubility"],
            rows: [
              ["Temperature of solvent", "Higher temperature → particles move more rapidly → rate of solubility INCREASES."],
              ["Rate of stirring", "Faster stirring → particles of solvent and solute fill spaces between them faster → rate of solubility INCREASES."],
              ["Size of solute", "Smaller solute size → bigger total surface area exposed to solvent → rate of solubility INCREASES."],
            ],
          },
        },
        {
          title: "Colloid",
          content:
            "A colloid is a mixture of two or more solutes dispersed evenly in a solvent. Colloids neither form a clear mixture nor a precipitate, so colloids are INTERMEDIATE between a solution and a suspension.",
          bulletPoints: [
            "Examples of colloids: foam (shaving cream), emulsion (milk, mayonnaise).",
          ],
        },
        {
          title: "Water as a Universal Solvent",
          content:
            "Water is known as a universal solvent due to its ability to dissolve almost all substances — solid, liquid or gas. Water is used as a solvent in domestic use and as a raw material in manufacturing industry, agriculture and medicine.",
          bulletPoints: [
            "Fertilisers dissolve in water and are absorbed by the roots of plants.",
            "Soft drinks are produced using water as a solvent.",
            "Water dissolves detergents used in cleaning processes.",
          ],
        },
        {
          title: "Organic Solvents",
          content:
            "Organic solvents are carbon-based solvents used to dissolve solutes that are insoluble in water. Many organic solvents are volatile, making them widely used in manufacturing aerosol substances such as spray paint, perfumes and pesticides.",
          table: {
            headers: ["Organic Solvent", "Common Uses"],
            rows: [
              ["Alcohol", "Perfume, antiseptic"],
              ["Kerosene", "Lamp oil"],
              ["Acetone", "Nail varnish remover, lacquer"],
              ["Turpentine", "Paint remover, paint thinner"],
              ["Ether", "Oil extractor"],
            ],
          },
        },
        {
          title: "⭐ Must Know",
          bulletPoints: [
            "Solute dissolves IN solvent; Solvent dissolves solute; Solution = the resulting mixture.",
            "Dilute (less solute) → Concentrated (more solute) → Saturated (excess, forms precipitate).",
            "Solution: clear, light passes, no residue. Suspension: cloudy, blocks light, leaves residue, settles over time.",
            "Solubility = MAXIMUM solute dissolved in 100 ml solvent at a SPECIFIC temperature.",
            "3 factors of solubility rate: temperature↑, stirring↑, solute size↓ — all INCREASE the rate.",
            "Colloid is BETWEEN solution and suspension — examples: shaving cream (foam), milk/mayonnaise (emulsion).",
            "Organic solvents: alcohol, kerosene, acetone, turpentine, ether — dissolve substances INSOLUBLE in water.",
          ],
        },
        {
          title: "🎯 Exam Tips",
          bulletPoints: [
            "When asked to distinguish solution vs suspension experimentally, use the LIGHT TEST (torchlight passes through solution but is blocked by suspension) and the FILTRATION TEST (solution leaves no residue; suspension leaves residue).",
            "Saturated solutions can become UNSATURATED again if heated (since solubility usually increases with temperature) — this is a common KBAT trap.",
          ],
        },
        {
          title: "⚠️ Common Mistakes",
          bulletPoints: [
            "Thinking a saturated solution is the same as a concentrated solution — saturated means it has reached its MAXIMUM and cannot dissolve more (forms precipitate); concentrated just means a large amount of solute, but more may still dissolve.",
            "Confusing colloids with suspensions — colloids do NOT settle or separate like suspensions do, even though both look cloudy/non-transparent.",
          ],
        },
      ],
    },
    {
      title: "5.3 Water Purification and Water Supply",
      subsections: [
        {
          title: "Why Water Needs Purification",
          content:
            "Water covers two-thirds of the Earth's surface, but most of it cannot be used directly as it contains impurities, microorganisms and dissolved substances. Water purification removes odour, taste, colour, microorganisms and dissolved substances so the water can be used for various purposes.",
        },
        {
          title: "Water Purification Methods",
          table: {
            headers: ["Method", "Function"],
            rows: [
              ["Filtration", "To separate suspended particles from liquid."],
              ["Boiling", "To kill microorganisms."],
              ["Chlorination", "To kill microorganisms."],
              ["Distillation", "To separate suspended particles AND dissolved substances, AND to kill microorganisms — produces the PUREST water."],
            ],
          },
        },
        {
          title: "Water Supply System (Treatment Stages)",
          content:
            "Water collected from sources such as rivers and rain is conveyed to water treatment plants prior to distribution to consumers.",
          table: {
            headers: ["Stage", "Function"],
            rows: [
              ["Filtration", "Removes large suspended particles such as tree branches and leaves."],
              ["Oxidation", "Increases oxygen content in the water to get rid of unpleasant smell and taste."],
              ["Coagulation", "Alum is added so mud particles stick together and sink; slaked lime (calcium hydroxide) is added to reduce the acidity of water."],
              ["Sedimentation", "Suspended particles deposit at the bottom of the tank."],
              ["Filtration", "Removes remaining suspended particles through sand filters."],
              ["Chlorination and fluoridation", "Chlorine is added to kill microorganisms; sodium fluoride is added to prevent tooth decay."],
            ],
          },
        },
        {
          title: "Solving the Problems of Water Supply",
          content: "Some countries with limited water sources use alternative ways to meet their water needs.",
          bulletPoints: [
            "NEWater (Singapore): uses modern technology to recycle sewage into drinking water and for industrial uses.",
            "Other alternatives: fog harvesting, water purification from seawater through reverse osmosis (desalination).",
          ],
        },
        {
          title: "Water Sustainability",
          content:
            "Rivers are the main water source in Malaysia. Water pollution makes water unsuitable for consumption and harms the environment. Development projects, industrial and agricultural activities are among the main sources of water pollution.",
          table: {
            headers: ["Water Pollutant", "Ways to Overcome"],
            rows: [
              ["Domestic waste", "Upgrade sewerage systems nationwide; educate people on proper rubbish management; improve sanitation facilities in rural areas."],
              ["Industrial waste / chemicals in agriculture", "Enforce laws to ensure industrial waste is treated before discharge (e.g. Environmental Quality Regulations on Scheduled Wastes 2005, Industrial Effluent 2009, Sewage 2009); educate farmers to use biodegradable fertilisers/pesticides."],
              ["Oil spillage", "Contain spilled oil using the National Oil Spill Contingency Plan; improve air surveillance with the Air Police Unit."],
            ],
          },
        },
        {
          title: "⭐ Must Know",
          bulletPoints: [
            "4 purification methods: Filtration (suspended particles), Boiling (kills microorganisms), Chlorination (kills microorganisms), Distillation (BOTH suspended particles AND dissolved substances AND kills microorganisms — purest water).",
            "Water supply system order: Filtration → Oxidation → Coagulation → Sedimentation → Filtration → Chlorination and fluoridation.",
            "Coagulation uses TWO chemicals: alum (sticks mud particles together) and slaked lime/calcium hydroxide (reduces acidity).",
            "Chlorination kills microorganisms; fluoridation (sodium fluoride) prevents tooth decay — these are DIFFERENT purposes in the same stage.",
            "4 main water pollutant sources: domestic waste, industrial waste, agricultural chemicals, oil spillage.",
            "NEWater (Singapore) = recycled sewage water; reverse osmosis = desalination of seawater.",
          ],
        },
        {
          title: "🎯 Exam Tips",
          bulletPoints: [
            "Memorise the EXACT order of the water supply system stages — exam questions often ask to arrange jumbled stages (filtration, oxidation, coagulation, sedimentation, filtration, chlorination/fluoridation) correctly.",
            "When asked which method gives the PUREST water, always answer DISTILLATION — it is the only method that removes dissolved substances as well as suspended particles and microorganisms.",
          ],
        },
        {
          title: "⚠️ Common Mistakes",
          bulletPoints: [
            "Forgetting that filtration appears TWICE in the water supply system (once early to remove large debris, once later to remove fine particles after sedimentation).",
            "Mixing up alum (coagulation — sticks particles together) with chlorine (disinfection — kills microorganisms) — they serve completely different functions.",
          ],
        },
      ],
    },
    {
      title: "Chapter Summary",
      subsections: [
        {
          title: "Chapter 5 Concept Map",
          content:
            "Water and Solution → Physical Characteristics of Water (boiling point, freezing point, colour, density, surface tension) → Water Composition (hydrogen + oxygen, H₂O) → Evaporation of Water (factors: humidity, temperature, surface area, air movement) → Solution (types: dilute, concentrated, saturated; factors affecting solubility: temperature, stirring, solute size; Water as universal solvent; Organic solvents) → Water Purification and Supply (Water purification methods: filtration, distillation, boiling, chlorination; Water supply system; Water sustainability: sources of pollution, water pollutants, ways to overcome).",
        },
        {
          title: "Self-Reflection (Learning Outcomes)",
          bulletPoints: [
            "5.1 Physical Characteristics of Water: Elaborate and communicate about water. Carry out experiments and communicate about the water evaporation process in daily life.",
            "5.2 Solution and Rate of Solubility: Explain with examples the meaning of solution and solubility. Carry out experiments to determine factors affecting rate of solubility. Explain colloids in daily life. Elaborate on uses of water as a universal solvent. Demonstrate examples of organic solvents and their uses.",
            "5.3 Water Purification and Water Supply: Demonstrate the water purification method. Solve problems in getting water supply for daily usage. Build a model and communicate about water supply system. Justify water sustainability as a key to healthy living.",
          ],
        },
      ],
    },
  ],
  keyExamFacts: [
    "Pure water: colourless, odourless, tasteless; boiling point 100°C, freezing point 0°C, density 1 g cm⁻³.",
    "Surface tension = cohesive force (water-water) only. Capillary action = cohesive force + adhesive force (water-xylem) together.",
    "5 changes of state: melting (absorb heat), freezing (release heat), evaporation/boiling (absorb heat), condensation (release heat), sublimation (solid↔gas directly, absorb or release depending on direction).",
    "Water = compound, H₂O, 2 hydrogen atoms + 1 oxygen atom. Electrolysis: Oxygen at ANODE, Hydrogen at CATHODE, volume ratio H:O = 2:1.",
    "Impurities LOWER the melting point of ice and RAISE the boiling point of water.",
    "Evaporation happens at the water SURFACE at ANY temperature (not only at 100°C).",
    "4 factors of evaporation rate: low humidity, high temperature, large exposed surface area, fast air movement — all INCREASE the rate.",
    "Solute (dissolves) + Solvent (dissolves the solute) = Solution. 3 types: dilute < concentrated < saturated (excess, forms precipitate).",
    "Solution: clear, light passes, no residue when filtered. Suspension: cloudy, blocks light, leaves residue, settles over time.",
    "Solubility = MAXIMUM amount of solute dissolved in 100 ml of solvent at a SPECIFIC temperature.",
    "3 factors of solubility rate: temperature↑, stirring rate↑, solute size↓ — all INCREASE the rate.",
    "Colloid = intermediate between solution and suspension (e.g. shaving cream/foam, milk/mayonnaise/emulsion) — does not settle or form precipitate.",
    "Water = universal solvent (dissolves almost everything). Organic solvents (carbon-based, dissolve water-insoluble substances): alcohol, kerosene, acetone, turpentine, ether.",
    "4 water purification methods: filtration (suspended particles), boiling (kills microorganisms), chlorination (kills microorganisms), distillation (removes EVERYTHING — purest water).",
    "Water supply system order: Filtration → Oxidation → Coagulation (alum + slaked lime) → Sedimentation → Filtration → Chlorination and fluoridation.",
    "4 water pollutant sources: domestic waste, industrial waste, agricultural chemicals, oil spillage. NEWater (Singapore) = recycled sewage; reverse osmosis = seawater desalination.",
  ],
  keyTerms: [
    "Compound",
    "Surface Tension",
    "Cohesive Force",
    "Adhesive Force",
    "Capillary Action",
    "Electrolysis",
    "Anode",
    "Cathode",
    "Evaporation",
    "Solute",
    "Solvent",
    "Solution",
    "Saturated Solution",
    "Suspension",
    "Solubility",
    "Colloid",
    "Emulsion",
    "Universal Solvent",
    "Organic Solvent",
    "Chlorination",
    "Coagulation",
    "Sedimentation",
    "Distillation",
    "Water Sustainability",
  ],
};
