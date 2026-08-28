import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch5-air-larutan.png";
import capillaryActionImg from "@/assets/notes/form2-science/chapter-5/chapter5_capillary_action.webp";
import electrolysisImg from "@/assets/notes/form2-science/chapter-5/chapter5_electrolysis_of_water.webp";
import evaporationFactorsImg from "@/assets/notes/form2-science/chapter-5/chapter5_evaporation_factors.webp";
import mixtureTypesImg from "@/assets/notes/form2-science/chapter-5/chapter5_solution_suspension_colloid.webp";
import concentrationTypesImg from "@/assets/notes/form2-science/chapter-5/chapter5_dilute_concentrated_saturated.webp";
import waterTreatmentImg from "@/assets/notes/form2-science/chapter-5/chapter5_water_treatment_system.webp";

/**
 * English rendering of "kadar keterlarutan".
 *
 * HELD PENDING SOURCE. The official DLP textbook is not in the source pack, so
 * we cannot confirm whether it prints "rate of solubility" — a literal
 * rendering of the BM term, and what this chapter has always used — or the more
 * standard English "rate of dissolving". Switching it now would be speculative
 * and could pull the notes out of line with the paper students actually sit.
 *
 * It is isolated here so that one edit changes every learner-facing use once
 * the DLP source is available. Note that the concept is taught correctly either
 * way: this is about the phrase, not about what it claims.
 */
const RATE_TERM = "rate of solubility";
const RATE_TERM_TITLE = "Rate of Solubility";

export const scienceF2C5InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 5,
  blogHighlight: {
    title: "Science Blog — The Dead Sea",
    body: "Sitting about 430.5 metres below sea level, the Dead Sea is the lowest point on Earth. Because it is completely enclosed by land, water flowing in from the Jordan River evaporates quickly and leaves its salt behind — making the water so dense that people can float on its surface without effort.",
    imagePath: chapterImage,
  },
  keywords: [
    "Compound",
    "Cohesive force",
    "Adhesive force",
    "Capillary action",
    "Rate of evaporation",
    "Solubility",
    RATE_TERM_TITLE,
    "Suspension",
    "Colloid",
    "Saturated solution",
    "Universal solvent",
    "Coagulation",
    "Chlorination",
    "Reverse osmosis",
    "Water sustainability",
  ],
  sections: [
    // ---------------------------------------------------------------- 5.1
    {
      number: "5.1",
      title: "Physical Characteristics of Water",
      intro:
        "Pure water is colourless, odourless and tasteless, and stays liquid at room temperature. It boils at exactly 100°C, freezes at 0°C, and has a density of 1 g cm⁻³. These fixed values are actually how we test whether water contains impurities, since impurities shift them.",
      cards: [
        {
          title: "Four fixed values of pure water",
          body: "Boiling point 100°C, freezing point 0°C, no colour, and a density of 1 g cm⁻³. All of them are measured on water that is genuinely pure.",
          detail: "Any change in these values points to dissolved impurities being present.",
        },
        {
          title: "Melting & Freezing",
          body: "Melting turns solid ice into liquid water by absorbing heat. Freezing turns liquid water into solid ice by releasing heat.",
        },
        {
          title: "Evaporation/Boiling & Condensation",
          body: "Evaporation/boiling turns liquid water into water vapour by absorbing heat. Condensation turns water vapour back into liquid by releasing heat.",
        },
      ],
      checks: [
        {
          question: "How could Ikram test whether a bottle of water is pure?",
          hint: "Test its boiling and freezing points — pure water boils at exactly 100°C and freezes at exactly 0°C. Any shift points to dissolved impurities.",
        },
      ],
    },
    {
      number: "5.1",
      title: "Surface Tension and Capillary Action",
      intro:
        "Water molecules attract one another, and they also attract other surfaces they touch. These two forces explain why insects can rest on water, and how water climbs from roots to leaves with no pump at all.",
      cards: [
        {
          title: "High surface tension",
          body: "The cohesive force between water molecules is strong enough at the surface that the surface behaves like a thin skin. Light insects such as pond skaters can rest on top without sinking.",
        },
        {
          title: "Water reaches the treetops",
          body: "Inside very fine xylem vessels, the adhesive force pulls water up along the vessel wall, while the cohesive force drags the next water molecules along behind it. Together they lift water from the roots all the way to the leaves.",
        },
      ],
      capillaryDiagram: {
        image: {
          src: capillaryActionImg,
          alt: "Water rising up a narrow plant tube, with cohesion between water molecules and adhesion between water and the tube wall.",
          size: "wide",
          aspect: "3 / 2",
          annotationMode: "regions",
          legendLabel: "Cohesion, adhesion and capillary action",
          caption: "Water travels from roots to leaves through fine xylem vessels",
          points: [
            { id: "cohesion", x: 18, y: 40, w: 24, h: 38 },
            { id: "adhesion", x: 77, y: 40, w: 24, h: 38 },
            { id: "capillary", x: 46, y: 52, w: 20, h: 92 },
          ],
        },
        title: "💧 The two forces that lift water",
        instruction: "Tap each force to see only its arrows and read what it means.",
        caption: "Water travels from roots to leaves through fine xylem vessels",
        hint: "Tap Cohesive force, Adhesive force or Capillary action.",
        labels: [
          {
            id: "cohesion",
            label: "Cohesive force",
            note: "The attraction between water molecules and other water molecules — that is, between molecules of the same kind. This force produces surface tension and drags the next water molecules up behind.",
          },
          {
            id: "adhesion",
            label: "Adhesive force",
            note: "The attraction between water molecules and a different surface, such as the xylem vessel wall of a plant. This force is what sticks water to the wall and pulls it upwards.",
          },
          {
            id: "capillary",
            label: "Capillary action",
            note: "The combined effect of the cohesive and adhesive forces inside a very fine vessel, which makes water rise without being pumped — carrying water from roots to leaves.",
          },
        ],
      },
      checks: [
        {
          question: "Why can a towel soak up water when water is supposed to flow downwards?",
          hint: "The fine gaps between the towel's fibres behave like capillary tubes — the adhesive force pulls water onto the fibre walls and the cohesive force drags the next water molecules along.",
        },
      ],
    },
    {
      number: "5.1",
      title: "Impurities and Electrolysis of Water",
      intro:
        "Water is a compound — two hydrogen atoms joined to one oxygen atom, H₂O. Electrolysis splits it apart again, and the volumes of gas collected prove that ratio. Dissolved impurities, meanwhile, shift the melting and boiling points of water.",
      cards: [
        {
          title: "Why salty soup boils more slowly",
          body: "Dissolved impurities change the melting and boiling points of water — salt lowers the melting point of ice but raises the boiling point of water. That is why a pot of plain water boils faster than one holding salt or dissolved soup stock.",
          detail:
            "Taste, smell and colour can also change with impurities present — seawater tastes salty because of the salt dissolved in it.",
        },
        {
          title: "Testing the gases produced",
          body: "A glowing splinter relights in oxygen; a lit splinter makes a 'pop' sound in hydrogen.",
          detail:
            "Distilled water is itself a poor conductor of electricity, so a little dilute acid is added so that current can flow during electrolysis.",
        },
      ],
      electrolysisDiagram: {
        image: {
          src: electrolysisImg,
          alt: "Electrolysis of acidified water: hydrogen collecting over the cathode and oxygen over the anode, in a volume ratio of two to one.",
          size: "wide",
          aspect: "3 / 2",
          annotationMode: "regions",
          legendLabel: "Electrolysis of water",
          caption: "Volume of hydrogen : oxygen = 2 : 1",
          points: [
            { id: "cathode", x: 20, y: 60, w: 34, h: 17 },
            { id: "anode", x: 72, y: 60, w: 32, h: 17 },
            { id: "hydrogen", x: 24, y: 27, w: 32, h: 32 },
            { id: "oxygen", x: 65, y: 27, w: 25, h: 32 },
          ],
          extra: [
            {
              id: "ratio",
              label: "Gas volume ratio 2 : 1",
              note: "Twice as much hydrogen as oxygen, because every water molecule (H\u2082O) holds two hydrogen atoms to one oxygen atom.",
              x: 89,
              y: 31,
              w: 20,
              h: 23,
            },
          ],
        },
        title: "⚡ Electrolysis of water",
        instruction: "Tap any part to find out what it does. Compare the heights of the two gas columns.",
        ratioCaption: "Volume of hydrogen : oxygen = 2 : 1",
        hint: "Tap Anode, Cathode, Hydrogen gas or Oxygen gas.",
        labels: [
          {
            id: "anode",
            label: "Anode",
            note: "The electrode connected to the positive terminal of the battery. Oxygen gas collects here.",
          },
          {
            id: "cathode",
            label: "Cathode",
            note: "The electrode connected to the negative terminal of the battery. Hydrogen gas collects here.",
          },
          {
            id: "hydrogen",
            label: "Hydrogen gas",
            note: "Collects at the cathode. Its volume is exactly twice that of oxygen because every water molecule contains two hydrogen atoms.",
          },
          {
            id: "oxygen",
            label: "Oxygen gas",
            note: "Collects at the anode. Its volume is half that of hydrogen because every water molecule contains only one oxygen atom.",
          },
        ],
      },
      checks: [
        {
          question: "During electrolysis of water, which test tube collects more gas, and why?",
          hint: "The one at the cathode — hydrogen gas. Its volume is twice that of oxygen because every water molecule (H₂O) has two hydrogen atoms to one oxygen atom.",
        },
      ],
    },
    {
      number: "5.1",
      title: "Evaporation of Water",
      intro:
        "Evaporation happens at the surface of water and turns water into water vapour. It can occur at any temperature, because water molecules at the surface have higher kinetic energy and can escape into the air. Four factors affect the rate of evaporation.",
      flipCards: [
        {
          id: "humidity",
          icon: "💨",
          label: "Humidity",
          fact: "Drier air (low humidity) can hold more escaping water molecules, so evaporation is faster.",
        },
        {
          id: "temperature",
          icon: "🌡️",
          label: "Temperature",
          fact: "Higher temperature gives surface water molecules more energy to escape into the air.",
        },
        {
          id: "surface-area",
          icon: "📐",
          label: "Surface area",
          fact: "A larger exposed surface area lets more water molecules escape at the same time.",
        },
        {
          id: "air-movement",
          icon: "🌬️",
          label: "Air movement",
          fact: "Moving air sweeps water vapour away from the surface, allowing more evaporation to happen.",
        },
      ],
      miniExperiment: {
        title: "🔬 Investigation: factors affecting the rate of evaporation of water",
        aim: "To study the factors that affect the rate of evaporation of water.",
        instruction: "Pick one factor to see its full investigation.",
        aimLabel: "Aim",
        hypothesisLabel: "Hypothesis",
        manipulatedLabel: "Manipulated variable",
        respondingLabel: "Responding variable",
        controlledLabel: "Controlled variables",
        materialsLabel: "Materials",
        apparatusLabel: "Apparatus",
        methodLabel: "Method",
        observationLabel: "Observation",
        conclusionLabel: "Conclusion",
        parts: [
          {
            id: "humidity",
            icon: "💨",
            label: "Humidity of air",
            question: "Does the humidity of the air affect the rate of evaporation of water?",
            hypothesis:
              "The higher the humidity of the air, the lower the rate of evaporation of water.",
            manipulated: "Humidity of the air",
            responding: "Rate of evaporation of water",
            controlled:
              "Surrounding temperature, volume of water, air movement and exposed surface area of water",
            materials: "Dry cobalt chloride paper, water, thread and anhydrous calcium chloride",
            apparatus: "Glass bell jars and beakers",
            method: [
              "Dip two pieces of dry cobalt chloride paper into water until each piece is completely damp.",
              "Hang one piece inside a glass bell jar together with a beaker of anhydrous calcium chloride, which absorbs moisture from the air around it.",
              "Hang the second piece inside a glass bell jar without calcium chloride.",
              "Observe and record the colour change of both pieces of cobalt chloride paper.",
            ],
            observation:
              "The paper in the bell jar with calcium chloride turns blue faster, because the air there is drier.",
            conclusion:
              "Lower humidity gives a higher rate of evaporation. The hypothesis is accepted.",
          },
          {
            id: "temperature",
            icon: "🌡️",
            label: "Surrounding temperature",
            question: "Does the surrounding temperature affect the rate of evaporation of water?",
            hypothesis:
              "The higher the surrounding temperature, the higher the rate of evaporation of water.",
            manipulated: "Surrounding temperature",
            responding: "Rate of evaporation of water",
            controlled:
              "Humidity of the air, volume of water, air movement and exposed surface area of water",
            materials: "Dry cobalt chloride paper and water",
            apparatus: "Filament bulb lamp and white tile",
            method: [
              "Label two pieces of dry cobalt chloride paper as J and K.",
              "Dip both pieces into water until each is completely damp.",
              "Place paper J under a filament bulb lamp and paper K away from the lamp.",
              "Observe and record the colour change of both pieces.",
            ],
            observation: "Paper J under the lamp turns blue faster than paper K.",
            conclusion:
              "A higher surrounding temperature gives a higher rate of evaporation. The hypothesis is accepted.",
          },
          {
            id: "surface-area",
            icon: "📐",
            label: "Surface area",
            question:
              "Does the exposed surface area of water affect the rate of evaporation of water?",
            hypothesis:
              "The larger the exposed surface area of water, the higher the rate of evaporation of water.",
            manipulated: "Exposed surface area of water",
            responding: "Rate of evaporation of water",
            controlled:
              "Humidity of the air, volume of water, air movement and surrounding temperature",
            materials: "Filter paper, water and thread",
            apparatus: "Retort stands and clamps",
            method: [
              "Prepare three pieces of filter paper P, Q and R, then dip all three into water.",
              "Leave paper P open, fold paper Q into two and paper R into four.",
              "Hang all three pieces on three separate retort stands.",
              "Record the time taken for each piece to dry.",
            ],
            observation:
              "Paper P, left fully open, dries fastest; paper R, folded into four, dries slowest.",
            conclusion:
              "A larger exposed surface area gives a higher rate of evaporation. The hypothesis is accepted.",
          },
          {
            id: "air-movement",
            icon: "🌬️",
            label: "Air movement",
            question: "Does air movement affect the rate of evaporation of water?",
            hypothesis: "The faster the air movement, the higher the rate of evaporation of water.",
            manipulated: "Air movement",
            responding: "Rate of evaporation of water",
            controlled:
              "Humidity of the air, volume of water, exposed surface area of water and surrounding temperature",
            materials: "Dry cobalt chloride paper, cellophane tape and water",
            apparatus: "Glass slides, a fan and a dropper",
            method: [
              "Tape one piece of dry cobalt chloride paper onto each glass slide, and label the slides M and N.",
              "Drop a few drops of water onto each piece of cobalt chloride paper.",
              "Place slide M under a fan and slide N away from the fan.",
              "Record your observations after 15 minutes.",
            ],
            observation: "The paper on slide M under the fan turns blue faster than the one on slide N.",
            conclusion:
              "Faster air movement gives a higher rate of evaporation. The hypothesis is accepted.",
          },
        ],
      },
      images: [
        {
          src: evaporationFactorsImg,
          alt: "Four factors that speed up evaporation: lower humidity, higher temperature, a larger surface area and greater air movement.",
          size: "wide",
          aspect: "3 / 2",
          legendLabel: "Factors affecting the rate of evaporation",
          caption:
            "All four panels reach the same result — faster evaporation — for four different reasons.",
          annotations: [],
        },
      ],
      checks: [
        {
          question: "Why do we feel cool right after sweating?",
          hint: "Sweat evaporating from the skin absorbs heat from the body in order to do so — that loss of heat is what feels cool.",
        },
        {
          question:
            "In the surface area investigation, which is the manipulated variable and which is the responding variable?",
          hint: "Manipulated: the exposed surface area of water. Responding: the rate of evaporation of water. The rest — humidity, volume of water, air movement and temperature — are controlled.",
        },
      ],
    },

    // ---------------------------------------------------------------- 5.2
    {
      number: "5.2",
      title: "Solute, Solvent and Solution",
      intro:
        "When sugar dissolves in water, sugar is the solute (the substance that dissolves), water is the solvent (the liquid doing the dissolving), and sugar water is the solution they form together. From these three terms comes another one that is often confused — solubility.",
      cards: [
        {
          title: "Solubility",
          body: "The solubility of a substance is the maximum amount of solute that can dissolve in 100 ml of solvent at a specified temperature.",
          detail:
            "It is a quantity — the answer to 'how much?', not to 'how fast?'.",
        },
      ],
      conceptContrast: {
        title: "⚖️ Two terms that sound almost the same",
        instruction:
          "Both use the word 'solubility', but the two answer completely different questions.",
        keyPoint: `Temperature, stirring rate and solute size change the ${RATE_TERM.toUpperCase()} — that is, how fast the solute dissolves. Stirring and particle size do not change the maximum amount that can dissolve.`,
        left: {
          id: "solubility",
          icon: "⚖️",
          term: "Solubility",
          question: "HOW MUCH can dissolve?",
          definition:
            "The maximum amount of solute that can dissolve in 100 ml of solvent at a specified temperature.",
          examples: [
            "Measured in grams per 100 ml of solvent.",
            "Once this limit is reached, the solution is saturated.",
          ],
        },
        right: {
          id: "rate",
          icon: "⏱️",
          term: RATE_TERM_TITLE,
          question: "HOW FAST does it dissolve?",
          definition:
            "How quickly the solute dissolves in the solvent — the time it takes, not the final amount.",
          examples: [
            "Affected by solvent temperature, stirring rate and solute size.",
            "Fine sugar and sugar cubes end up dissolving the same amount — fine sugar just dissolves faster.",
          ],
        },
      },
      checks: [
        {
          question:
            "Aina stirs her sugar faster. Will more sugar dissolve, or does it just dissolve faster?",
          hint: `Just faster. Stirring changes only the ${RATE_TERM} — the maximum amount that can dissolve at that temperature does not change.`,
        },
      ],
    },
    {
      number: "5.2",
      title: "Dilute, Concentrated and Saturated Solutions",
      intro:
        "Add more and more solute to the same solvent, and the solution moves through three stages — dilute, then concentrated, then saturated, where it cannot dissolve any more and the excess solute forms a precipitate.",
      cards: [
        {
          title: "Dilute",
          body: "Only a little solute so far — the solution can still dissolve much more.",
          detail: "Least concentrated",
        },
        {
          title: "Concentrated",
          body: "A lot of solute has dissolved — the solution can still dissolve a little more.",
          detail: "More concentrated",
        },
        {
          title: "Saturated",
          body: "Excess solute has been added — no more will dissolve, and the excess forms a precipitate at the bottom.",
          detail: "Cannot dissolve more",
        },
        {
          title: "Temperature can move the limit itself",
          body: "Notice that solubility is always stated at a specified temperature. Here is why: when the temperature changes, the maximum amount that can dissolve changes too. For most solid solutes such as salt and sugar, more can dissolve at a higher temperature.",
          detail:
            "That is why heating a saturated solution lets it dissolve more solute — it is no longer saturated at the new temperature.",
        },
      ],
      images: [
        {
          src: concentrationTypesImg,
          alt: "Three beakers comparing a dilute solution, a concentrated solution and a saturated solution with excess undissolved solute at the bottom.",
          size: "wide",
          aspect: "3 / 2",
          legendLabel: "Dilute, concentrated and saturated",
          caption:
            "Only the saturated beaker holds solute that will not dissolve — the limit for that temperature has been reached.",
          annotations: [],
        },
      ],
      checks: [
        {
          question:
            "A saturated solution is heated, more salt is added, and the salt dissolves. Does this contradict what 'saturated' means?",
          hint: "No. 'Saturated' only means saturated at that particular temperature. When the temperature is raised, the solubility of salt increases, so the solution is no longer saturated and can dissolve more.",
        },
      ],
    },
    {
      number: "5.2",
      title: "Solution, Suspension and Colloid",
      intro:
        "Not every mixture is a solution. Two simple tests — shining a torch through it, and filtering it through filter paper — are enough to tell these three kinds of mixture apart.",
      mixtureComparison: {
        image: {
          src: mixtureTypesImg,
          alt: "A solution, a suspension and a colloid compared, with a torch beam passing through each one.",
          size: "wide",
          aspect: "3 / 2",
          annotationMode: "regions",
          legendLabel: "Solution, suspension and colloid",
          points: [
            { id: "solution", x: 17, y: 45, w: 31, h: 86 },
            { id: "suspension", x: 49, y: 45, w: 32, h: 86 },
            { id: "colloid", x: 82, y: 45, w: 31, h: 86 },
          ],
        },
        title: "🔦 Test with light and filtration",
        instruction: "Tap any mixture to read its full set of characteristics.",
        appearanceLabel: "Appearance",
        lightLabel: "Light",
        filtrationLabel: "Filtration",
        exampleLabel: "Example",
        hint: "Tap Solution, Suspension or Colloid.",
        kinds: [
          {
            id: "solution",
            name: "Solution",
            lightPasses: "yes",
            appearance: "Clear and transparent",
            filtration: "No residue left behind",
            example: "Copper(II) sulfate in water",
            note: "The solute particles are small enough to spread out evenly — the mixture looks clear and transparent, light passes through, and no residue is left when it is filtered.",
          },
          {
            id: "suspension",
            name: "Suspension",
            lightPasses: "no",
            appearance: "Cloudy, settles over time",
            filtration: "Residue left on the filter paper",
            example: "Chalk powder in water",
            note: "The solute particles are too large to dissolve — the mixture looks cloudy, blocks light, settles over time, and leaves a residue when filtered.",
          },
          {
            id: "colloid",
            name: "Colloid",
            lightPasses: "between",
            appearance: "Not clear, but does not settle",
            filtration: "Does not produce a precipitate",
            example: "Milk and mayonnaise (emulsions)",
            note: "The particles sit in between — spread out evenly, yet the mixture is not clear, and it does not produce a precipitate the way a suspension does. Its position is between a solution and a suspension. Another example: shaving foam (a foam).",
          },
        ],
      },
      checks: [
        {
          question: "Milk looks uniform but is not a true solution. What is it really?",
          hint: "A colloid — a type of emulsion. It does not separate like a suspension, but it is not a clear solution either.",
        },
      ],
    },
    {
      number: "5.2",
      title: RATE_TERM_TITLE,
      intro: `The ${RATE_TERM} means how fast a solute dissolves. Three factors affect it — and all of them speed up the dissolving process rather than adding to the maximum amount that can dissolve.`,
      flipCards: [
        {
          id: "sol-temp",
          icon: "🌡️",
          label: "Temperature",
          fact: "Hotter solvent particles move more rapidly, so the solute dissolves faster.",
        },
        {
          id: "sol-stir",
          icon: "🥄",
          label: "Stirring rate",
          fact: "Faster stirring brings solute and solvent particles together more quickly.",
        },
        {
          id: "sol-size",
          icon: "🔬",
          label: "Solute size",
          fact: "Smaller particles expose more surface area, so they dissolve faster.",
        },
      ],
      miniExperiment: {
        title: `🔬 Investigation: factors affecting the ${RATE_TERM}`,
        aim: `To study the factors that affect the ${RATE_TERM}.`,
        instruction: "Pick one factor to see its full investigation.",
        aimLabel: "Aim",
        hypothesisLabel: "Hypothesis",
        manipulatedLabel: "Manipulated variable",
        respondingLabel: "Responding variable",
        controlledLabel: "Controlled variables",
        materialsLabel: "Materials",
        apparatusLabel: "Apparatus",
        methodLabel: "Method",
        observationLabel: "Observation",
        conclusionLabel: "Conclusion",
        parts: [
          {
            id: "temp",
            icon: "🌡️",
            label: "Solvent temperature",
            question: `Does the temperature of the solvent affect the ${RATE_TERM}?`,
            hypothesis: `The higher the temperature of the solvent, the higher the ${RATE_TERM}.`,
            manipulated: "Temperature of the solvent",
            responding: RATE_TERM_TITLE,
            controlled: "Volume of solvent, stirring rate and size of solute",
            materials: "Distilled water and table salt",
            apparatus:
              "Measuring cylinder, beakers, glass rod, thermometer, tripod stand, wire gauze, Bunsen burner and spatula",
            method: [
              "Pour 100 ml of distilled water into beakers labelled K and L.",
              "Heat beaker L to 50°C, then add table salt to both beakers.",
              "Stir the mixtures in beakers K and L at the same rate until the salt dissolves completely.",
              "Determine which beaker's salt dissolves faster, and record your observations.",
            ],
            observation: "The salt in the hot beaker L dissolves faster.",
            conclusion: `A higher solvent temperature gives a higher ${RATE_TERM} — the salt dissolves faster. The hypothesis is accepted.`,
          },
          {
            id: "stir",
            icon: "🥄",
            label: "Stirring rate",
            question: `Does the stirring rate affect the ${RATE_TERM}?`,
            hypothesis: `The higher the stirring rate, the higher the ${RATE_TERM}.`,
            manipulated: "Stirring rate",
            responding: RATE_TERM_TITLE,
            controlled: "Volume of solvent, temperature of solvent and size of solute",
            materials: "Distilled water and table salt",
            apparatus: "Beakers, glass rod, measuring cylinder and spatula",
            method: [
              "Pour 100 ml of distilled water into beakers labelled K and L, then add the same amount of table salt to both.",
              "Stir the mixture in beaker K slowly, but the mixture in beaker L quickly.",
              "Determine which beaker's salt dissolves faster.",
              "Record your observations.",
            ],
            observation: "The salt in beaker L, stirred quickly, dissolves faster.",
            conclusion: `A higher stirring rate gives a higher ${RATE_TERM} — the salt dissolves faster. The maximum amount that can dissolve does not change. The hypothesis is accepted.`,
          },
          {
            id: "size",
            icon: "🔬",
            label: "Size of solute",
            question: `Does the size of the solute affect the ${RATE_TERM}?`,
            hypothesis: `The smaller the size of the solute, the higher the ${RATE_TERM}.`,
            manipulated: "Size of the solute",
            responding: RATE_TERM_TITLE,
            controlled: "Volume of solvent, temperature of solvent and stirring rate",
            materials: "Distilled water, fine sugar and sugar cubes",
            apparatus: "Beakers, measuring cylinder, glass rod and spatula",
            method: [
              "Pour 100 ml of distilled water into beakers labelled K and L.",
              "Add fine sugar to beaker K and an equal mass of sugar cubes to beaker L.",
              "Stir the mixtures in both beakers at the same stirring rate.",
              "Determine which beaker's sugar dissolves faster, and record your observations.",
            ],
            observation: "The fine sugar in beaker K dissolves faster than the sugar cubes.",
            conclusion: `A smaller solute size exposes more surface area to the solvent, so it dissolves faster. The maximum amount that can dissolve does not change. The hypothesis is accepted.`,
          },
        ],
      },
      checks: [
        {
          question: "Why is hot water better for dissolving coffee than cold water?",
          hint: `Higher temperature gives particles more energy to move and mix faster — increasing the ${RATE_TERM}.`,
        },
        {
          question: "Why does fine sugar dissolve faster than a sugar cube?",
          hint: "The smaller the solute size, the larger the total surface area exposed to solvent particles, so the solute dissolves faster.",
        },
      ],
    },
    {
      number: "5.2",
      title: "Universal Solvent and Non-Water Solvents",
      intro:
        "Water is known as the universal solvent because of its ability to dissolve almost every substance, whether solid, liquid or gas. For substances that will not dissolve in water, carbon-based non-water solvents are used instead.",
      cards: [
        {
          title: "Water as the universal solvent",
          body: "Water is used as a solvent domestically and also as a raw material in the manufacturing, agricultural and medical industries — from fertiliser dissolving and being absorbed by plant roots, to detergent in the cleaning process, to the production of soft drinks.",
        },
        {
          title: "Handle with care",
          body: "Because non-water solvents evaporate readily, they are widely used in preparing spray products such as paint, perfume and insecticide. Non-water solvents must be handled carefully because they are hazardous to human health.",
        },
      ],
      tabs: [
        { title: "Alcohol", body: "Used in making perfume and antiseptic." },
        { title: "Kerosene", body: "Used as lamp oil." },
        { title: "Acetone", body: "Used as nail varnish remover and a solvent for lacquer." },
        { title: "Turpentine", body: "Used as a paint stain remover and paint thinner." },
        { title: "Ether", body: "Used as an oil extractant." },
      ],
      checks: [
        {
          question:
            "Warisan wants to remove dried paint marks from his hands. Water does not work. What should he use, and why?",
          hint: "A non-water solvent such as turpentine — paint does not dissolve in water, but it does dissolve in carbon-based organic solvents. It must be handled carefully because it is hazardous to health.",
        },
      ],
    },

    // ---------------------------------------------------------------- 5.3
    {
      number: "5.3",
      title: "Water Purification Methods",
      intro:
        "Water covers two-thirds of the Earth's surface, but most of it holds impurities, microorganisms and dissolved substances that make it unsafe straight from the source. Purifying water removes smell, taste, colour, microorganisms and dissolved substances so it can be used safely.",
      comparisonMatrix: {
        title: "🧪 Which method does what?",
        instruction: "Tap any method to read its full explanation.",
        columns: [
          "Removes suspended impurities?",
          "Removes dissolved substances?",
          "Kills microorganisms?",
          "Produces pure water?",
        ],
        yesLabel: "Yes",
        noLabel: "No",
        partialLabel: "Partly",
        hint: "Tap Boiling, Filtration, Chlorination or Distillation.",
        rows: [
          {
            id: "boiling",
            icon: "🔥",
            label: "Boiling",
            values: ["no", "no", "yes", "no"],
            note: "Kills microorganisms with heat, but suspended impurities and dissolved substances stay in the water.",
          },
          {
            id: "filtration",
            icon: "🧻",
            label: "Filtration",
            values: ["yes", "no", "no", "no"],
            note: "Separates suspended impurities such as leaves and sediment from the liquid, but does not kill microorganisms and does not remove dissolved substances.",
          },
          {
            id: "chlorination",
            icon: "🧪",
            label: "Chlorination",
            values: ["no", "no", "yes", "no"],
            note: "Chlorine is added to kill microorganisms in the water supply, but suspended impurities and dissolved substances remain.",
          },
          {
            id: "distillation",
            icon: "♨️",
            label: "Distillation",
            values: ["yes", "yes", "yes", "yes"],
            note: "Removes suspended impurities AND dissolved substances, while also killing microorganisms — the most thorough method, and the only one that produces pure water.",
          },
        ],
      },
      cards: [
        {
          title: "What does purification mean?",
          body: "Purification means producing pure water — water free of suspended impurities, dissolved substances and microorganisms all at once. It is the end goal, not a separate step of its own.",
          detail:
            "Look at the last column above: of those four methods, only distillation achieves purification. Boiling, filtration and chlorination clean water, but they do not purify it.",
        },
      ],
      checks: [
        {
          question: "Which purification method removes dissolved substances AND kills microorganisms?",
          hint: "Distillation — it is the only method that does both at once, and the only one that produces pure water.",
        },
      ],
    },
    {
      number: "5.3",
      title: "Water Supply System",
      intro:
        "Water collected from sources such as rivers and rainfall is channelled to a water treatment plant to be treated before it is sent on to consumers. Bacteria, algae and mineral substances are among the things removed in the process.",
      waterTreatmentFlow: {
        image: {
          src: waterTreatmentImg,
          alt: "The seven stages of a water treatment system in order: screening, oxidation, coagulation, sedimentation, filtration, chlorination and fluoridation, ending in treated water.",
          size: "wide",
          aspect: "2 / 1",
          annotationMode: "regions",
          legendLabel: "The seven treatment stages",
          points: [
            { id: "screening", x: 7, y: 48, w: 13, h: 64 },
            { id: "oxidation", x: 19, y: 48, w: 12, h: 64 },
            { id: "coagulation", x: 33, y: 48, w: 14, h: 64 },
            { id: "sedimentation", x: 46, y: 48, w: 13, h: 64 },
            { id: "filtration", x: 59, y: 48, w: 13, h: 64 },
            { id: "chlorination", x: 78, y: 48, w: 24, h: 64 },
            { id: "homes", x: 95, y: 48, w: 10, h: 64 },
          ],
        },
        title: "🚰 The journey of water from river to tap",
        instruction: "Tap any stage to see what it does. The order matters.",
        chemicalLabel: "Substance added",
        hint: "Tap any stage to read what it does.",
        stages: [
          {
            id: "reservoir",
            icon: "🏞️",
            name: "Reservoir",
            fn: "Raw water is collected from rivers or rainfall at a reservoir before treatment.",
          },
          {
            id: "screening",
            icon: "🪵",
            name: "Screening",
            fn: "Removes large impurities such as twigs and leaves.",
          },
          {
            id: "oxidation",
            icon: "🫧",
            name: "Oxidation",
            fn: "Increases the oxygen content of the water to remove unpleasant smell and taste.",
          },
          {
            id: "coagulation",
            icon: "🧷",
            name: "Coagulation",
            fn: "Mud particles are made to clump together and sink, and the acidity of the water is reduced.",
            chemical:
              "Alum — to make mud particles clump together; slaked lime (calcium hydroxide) — to reduce the acidity of the water",
          },
          {
            id: "sedimentation",
            icon: "⬇️",
            name: "Sedimentation",
            fn: "The clumped suspended matter settles at the bottom of the tank.",
          },
          {
            id: "filtration",
            icon: "🏖️",
            name: "Filtration",
            fn: "Removes the remaining impurities using a sand filter.",
          },
          {
            id: "chlorination",
            icon: "🧪",
            name: "Chlorination and fluoridation",
            fn: "Microorganisms in the water are killed, and a substance that protects teeth is added.",
            chemical:
              "Chlorine — to kill microorganisms; sodium fluoride — to prevent tooth decay",
          },
          {
            id: "homes",
            icon: "🏠",
            name: "To homes",
            fn: "Clean water is held in a clean water tank, then pumped through a storage tank out to consumers.",
          },
        ],
      },
      checks: [
        {
          question: "What two substances are added during coagulation, and what does each one do?",
          hint: "Alum makes mud particles clump together so they sink; slaked lime (calcium hydroxide) reduces the acidity of the water.",
        },
      ],
    },
    {
      number: "5.3",
      title: "Alternative Water Supplies and Water Sustainability",
      intro:
        "Some countries short of water resources use alternative ways of obtaining a water supply. At the same time, looking after the water we already have is every individual's responsibility.",
      methodCards: {
        title: "🌍 Three ways of obtaining a water supply",
        instruction: "Each method answers the same three questions, so you can compare them.",
        whatLabel: "What is it?",
        howLabel: "How does it work?",
        whenLabel: "When is it useful?",
        cards: [
          {
            id: "reverse-osmosis",
            icon: "🌊",
            name: "Reverse osmosis",
            what: "A way of obtaining drinking water from seawater by removing the dissolved salt.",
            how: "Seawater is pushed under pressure through a very fine membrane. The membrane lets water molecules through but holds the dissolved salt back on the other side.",
            when: "Suits coastal countries that are short of fresh water but have an unlimited supply of seawater.",
          },
          {
            id: "recycling",
            icon: "♻️",
            name: "Water recycling",
            what: "A way of treating sewage water so that it is safe to use again.",
            how: "Sewage water is treated through several stages of cleaning until it is clean enough to drink or to use in industry. Singapore uses this technology in a project known as NEWater.",
            when: "Suits countries or cities with limited natural water sources that nonetheless produce plenty of sewage water.",
          },
          {
            id: "fog",
            icon: "🌫️",
            name: "Obtaining water from fog",
            what: "A way of collecting water droplets from fog in the air.",
            how: "Large nets are set up in foggy areas. Fine water droplets in the fog cling to the netting, join together into larger drops, and drip into a container below.",
            when: "Suits highland or coastal areas that are often foggy but have no adequate river or rainfall.",
          },
        ],
      },
      cards: [
        {
          title: "Water that is safe to drink",
          body: "Water that is safe to drink must be free of harmful microorganisms, toxic chemicals and impurities. That is why water is treated at a plant before it reaches homes.",
        },
        {
          title: "When water is polluted: Minamata Bay",
          body: "At Minamata Bay in Japan, waste containing mercury was released into the seawater. The mercury built up in fish and shellfish, and residents who ate them suffered severe mercury poisoning — damaging the nervous system and causing permanent disability.",
          detail:
            "The case shows that toxic substances entering water do not simply disappear — they move through the food chain and eventually reach people. Preventing pollution is far easier than cleaning it up afterwards.",
        },
        {
          title: "A water audit at home",
          body: "A water audit means recording how much water is used at home or at school, activity by activity — bathing, washing, watering the garden and so on.",
          detail:
            "Once you know where the water goes, you can identify wastage and suggest ways to save — fixing a leaking pipe, turning off the tap while brushing your teeth, or collecting rainwater for the plants.",
        },
      ],
      matcher: {
        title: "🌊 Match the pollutant to the way it is tackled",
        instruction: "Pick a water pollutant, then pick how it is dealt with.",
        pairs: [
          {
            id: "domestic",
            label: "🏠 Domestic waste",
            match: "Upgrade sewerage systems and improve rural sanitation",
          },
          {
            id: "industrial",
            label: "🏭 Industrial waste",
            match: "Enforce laws so waste is treated before being released into rivers",
          },
          {
            id: "agricultural",
            label: "🌾 Agricultural chemicals",
            match: "Educate farmers to use biodegradable fertilisers and pesticides",
          },
          {
            id: "oil",
            label: "🛢️ Oil spills",
            match: "Contain spills with a national contingency plan and increase aerial surveillance",
          },
        ],
      },
      checks: [
        {
          question:
            "A small island nation is surrounded by sea but is running out of fresh water. Which method suits it best, and why?",
          hint: "Reverse osmosis — seawater is pushed under pressure through a fine membrane that holds back the dissolved salt, producing fresh water from the unlimited source all around it.",
        },
        {
          question: "What can be learned from what happened at Minamata Bay?",
          hint: "Toxic substances released into water build up in aquatic life and pass to the people who eat it. Preventing pollution is far better than trying to clean it up later.",
        },
      ],
    },
  ],
  reflectionItems: [
    "I can describe the physical characteristics of water and the effect of impurities on them.",
    "I can distinguish the cohesive force from the adhesive force in capillary action.",
    "I can explain the electrolysis of water and the volume ratio of hydrogen to oxygen.",
    "I can carry out an investigation into the factors affecting the rate of evaporation of water.",
    `I can explain what solubility means and distinguish it from the ${RATE_TERM}.`,
    "I can distinguish dilute, concentrated and saturated solutions.",
    "I can distinguish solutions, suspensions and colloids with examples.",
    `I can carry out an investigation into the factors affecting the ${RATE_TERM}.`,
    "I can explain the uses of water as the universal solvent and give examples of non-water solvents.",
    "I can compare water purification methods and explain what purification means.",
    "I can explain each stage in the water supply system.",
    "I can suggest alternative ways of obtaining a water supply and justify water sustainability.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: Milk is a true solution because it looks uniform.",
      answer: false,
      explanation:
        "Milk is a colloid (an emulsion) — it looks uniform but its particles neither dissolve completely nor settle the way a suspension does.",
    },
    {
      type: "true-false",
      question:
        "True or false: Stirring a solution faster increases the maximum amount of sugar that can dissolve in it.",
      answer: false,
      explanation: `Stirring only speeds up the dissolving process — it changes the ${RATE_TERM} alone. The maximum amount that can dissolve at that temperature does not change.`,
    },
    {
      type: "multiple-choice",
      question:
        "Which water purification method removes dissolved substances as well as suspended particles?",
      options: ["Boiling", "Filtration", "Distillation", "Chlorination"],
      answerIndex: 2,
      explanation:
        "Distillation evaporates and then re-condenses the water, leaving dissolved substances and suspended particles behind.",
    },
    {
      type: "multiple-choice",
      question: `In the investigation into the effect of stirring rate on the ${RATE_TERM}, which is the responding variable?`,
      options: ["Stirring rate", RATE_TERM_TITLE, "Solvent temperature", "Size of solute"],
      answerIndex: 1,
      explanation: `The stirring rate is the manipulated variable; what is observed and measured as the outcome — the responding variable — is the ${RATE_TERM}.`,
    },
  ],
};
