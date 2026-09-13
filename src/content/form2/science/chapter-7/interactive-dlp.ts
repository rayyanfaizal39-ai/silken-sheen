import type { ScienceF2InteractiveContent } from "../interactive-types";
import { SCIENCE_F2_CH7_IMAGES, SCIENCE_F2_VISUAL_ASPECT } from "../visual-assets";
import chapterImage from "@/assets/science/form2/ch7-keelektrikan-kemagnetan.png";

export const scienceF2C7InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 7,
  blogHighlight: {
    title: "Science Blog — The Electric Eel",
    body: "An electric eel has around 6,000 specialised cells called electrocytes, letting it discharge up to 600 volts — enough to stun a predator, catch prey, and even navigate the murky water where sight barely helps.",
    imagePath: chapterImage,
  },
  keywords: [
    "Energy",
    "Electrostatic charge",
    "Electroscope",
    "Electric current",
    "Voltage",
    "Resistance",
    "Ohm's Law",
    "Series circuit",
    "Parallel circuit",
    "Magnetic field",
    "Neutral point",
    "Electromagnet",
    "Right-hand grip rule",
    "Solenoid",
  ],
  sections: [
    // ---------------------------------------------------------------- 7.1
    {
      number: "7.1",
      title: "Energy",
      intro:
        "Energy means **the ability to do work**, and its S.I. unit is the **joule (J)**. Energy **cannot be created or destroyed** — it only changes from one form into another. Two ideas here are easily confused: a form of energy and a source of energy are not the same thing.",
      cards: [
        {
          title: "Form versus source",
          body: "A source of energy is where the energy comes from. A form of energy describes the type in which the energy exists.",
          detail: "For example: the sun is a source; light and heat are forms.",
        },
        {
          title: "☀️ Sources of energy",
          body: "Energy comes from eight sources.",
          facts: [
            {
              label: "The eight sources",
              value: [
                "The Sun",
                "Wind",
                "Radioactive substances",
                "Fossil fuels",
                "Geothermal energy",
                "Biomass",
                "Waves",
                "Water",
              ],
            },
          ],
          detail: "The Sun, wind, radioactive substances, fossil fuels, geothermal energy, biomass, waves and water — these eight sources supply energy that then changes into various forms.",
        },
      ],
      flipCards: [
        { id: "sound", icon: "🔊", label: "Sound", fact: "Vibrations carrying energy through the air, like a loudspeaker." },
        { id: "kinetic", icon: "🏃", label: "Kinetic", fact: "The energy of movement — a running animal, a moving car." },
        { id: "electrical", icon: "🔌", label: "Electrical", fact: "Energy carried by flowing electric charge." },
        { id: "gravitational", icon: "⛰️", label: "Gravitational potential", fact: "Stored energy due to height — a book on a shelf." },
        { id: "elastic", icon: "🎯", label: "Elastic potential", fact: "Energy stored in a stretched or compressed object, like a spring." },
        { id: "light", icon: "💡", label: "Light", fact: "Energy radiated as visible light, like a bulb." },
        { id: "nuclear", icon: "☢️", label: "Nuclear", fact: "Energy stored in the nucleus of an atom." },
        { id: "heat", icon: "🔥", label: "Heat", fact: "Energy transferred because of a temperature difference." },
        { id: "chemical", icon: "🧪", label: "Chemical", fact: "Energy stored in chemical bonds, as in food or fuel." },
      ],
      checks: [
        {
          question: "Wind turns a turbine that generates electricity. What is the source of energy here, and what are the forms?",
          hint: "Source: the wind. Forms: the kinetic energy of the wind becomes the kinetic energy of the turbine, then electrical energy.",
        },
      ],
    },
    {
      number: "7.1",
      title: "Electrostatic Charges",
      conceptQuestion: "What is Electrostatic Charge?",
      intro:
        "Static electric charges that accumulate on an object are called electrostatic charges. All matter contains positive charges (protons) and negative charges (electrons).",
      contextImages: [
        {
          src: SCIENCE_F2_CH7_IMAGES.chargeTransfer,
          alt: "Two panels. Before rubbing, a balloon and a cloth each carry equal numbers of positive and negative charges. After rubbing, arrows show electrons moving from the cloth to the balloon, leaving the balloon negatively charged and the cloth positively charged.",
          caption:
            "Only electrons move, and they move from the cloth to the balloon. The protons stay where they are.",
          size: "panel",
          aspect: SCIENCE_F2_VISUAL_ASPECT.wide,
          priority: true,
          annotations: [],
        },
      ],
      cards: [
        {
          title: "Attraction and repulsion",
          body: "**Like charges repel each other.** **Unlike charges attract each other.** This is why a comb that has been rubbed can pick up small pieces of paper.",
        },
        {
          title: "Detecting electrostatic charge",
          body: "An electroscope is the **instrument used to detect the presence of electric charge** on an object. Its gold leaf diverges because like charges repel one another.",
          detail: "The further the gold leaf diverges, the greater the quantity of charge collected.",
        },
      ],
      polarityInteraction: {
        title: "⚡ Attraction and repulsion",
        instruction: "Tap a pair of charges to see which way the force acts.",
        attractLabel: "Attract",
        repelLabel: "Repel",
        pairs: [
          {
            id: "attract",
            label: "+ and −",
            leftCharge: "+",
            rightCharge: "-",
            outcome: "attract",
            note: "Unlike charges attract each other.",
          },
          {
            id: "repel-pos",
            label: "+ and +",
            leftCharge: "+",
            rightCharge: "+",
            outcome: "repel",
            note: "Like charges repel each other.",
          },
          {
            id: "repel-neg",
            label: "− and −",
            leftCharge: "-",
            rightCharge: "-",
            outcome: "repel",
            note: "Like charges repel each other. This is why a comb that has been rubbed can pick up small pieces of paper — the comb's charge repels electrons in the paper, leaving the paper's near side with an opposite, attracting charge.",
          },
        ],
      },
      electroscope: {
        title: "🔬 Electroscope",
        instruction:
          "Tap each stage to follow what happens inside the electroscope. The panel you choose stays bright while the other two dim.",
        prompt: "Choose a stage to see what is happening to the gold leaf.",
        image: {
          src: SCIENCE_F2_CH7_IMAGES.electroscope,
          alt: "Three electroscopes side by side under glass jars. In the first, the gold leaf hangs closed against the conducting stem. In the second, a positively charged glass rod touches the metal cap and electrons are shown moving from the cap to the rod, leaving positive charges down the stem and on the leaf. In the third, the electroscope carries positive charges and its gold leaf has swung well away from the stem.",
          caption:
            "One electroscope, three stages: neutral, charge being introduced, and the gold leaf diverged.",
          size: "panel",
          aspect: SCIENCE_F2_VISUAL_ASPECT.wide,
          legendLabel: "Stages of a charged electroscope",
        },
        stages: [
          {
            id: "uncharged",
            label: "Neutral",
            spotlightCaption: "Neutral",
            note: "The electroscope is neutral and the gold leaf stays close to the conducting stem.",
          },
          {
            id: "charged",
            label: "Charge introduced",
            spotlightCaption: "Electrons leave",
            note: "A positively charged rod touches the metal cap. Electrons move from the electroscope towards the positively charged rod.",
          },
          {
            id: "diverged",
            label: "Gold leaf diverges",
            spotlightCaption: "Charges repel",
            note: "The electroscope is left positively charged. Like charges on the conducting stem and gold leaf repel, causing the leaf to diverge. Greater divergence can indicate a greater amount of accumulated electrostatic charge.",
          },
        ],
      },
      checks: [
        {
          question: "A rod is rubbed with a cloth and becomes negatively charged. What has happened to its electrons?",
          hint: "The rod has gained electrons from the cloth. Only electrons transfer during rubbing — the protons stay where they are.",
        },
        {
          question: "Why does the gold leaf of a charged electroscope diverge?",
          hint: "The leaf and the plate it hangs from both end up carrying the same charge, and like charges repel each other.",
        },
      ],
    },
    {
      number: "7.1",
      title: "Electrostatics in Daily Life",
      intro:
        "Electrostatic charge is not just a laboratory effect. It explains lightning, the small shock you feel on a door handle, and several important safety measures.",
      lightningFormation: {
        title: "🌩️ How lightning forms",
        instruction:
          "Step through the four stages. Each one lights up the part of the scene it describes.",
        prompt: "Choose a stage to see where it happens in the scene.",
        image: {
          src: SCIENCE_F2_CH7_IMAGES.lightningFormation,
          alt: "A night scene. Air sweeps past a storm cloud from both sides. Positive charges gather in the upper part of the cloud and negative charges in the lower part. Positive charges sit on the ground directly beneath the cloud, and a branching lightning bolt runs from the base of the cloud down to the ground.",
          caption:
            "Friction with the surrounding air, charge separation inside the cloud, induced charge on the ground, and the discharge itself.",
          size: "panel",
          aspect: SCIENCE_F2_VISUAL_ASPECT.standard,
          legendLabel: "Stages in the formation of lightning",
        },
        stages: [
          {
            id: "friction",
            icon: "💨",
            label: "Friction",
            spotlightCaption: "Cloud and surrounding air",
            note: "Friction between the cloud and the surrounding air causes electric charges to accumulate on the cloud.",
          },
          {
            id: "separation",
            icon: "➕➖",
            label: "Charge separation",
            spotlightCaption: "Positive above, negative below",
            note: "The upper part of the cloud becomes positively charged while the lower part becomes negatively charged.",
          },
          {
            id: "induced",
            icon: "🌍",
            label: "Induced ground charge",
            spotlightCaption: "Positive charge on the ground",
            note: "The negative charge at the lower part of the cloud induces a positive charge on the ground beneath it.",
          },
          {
            id: "discharge",
            icon: "⚡",
            label: "Discharge",
            spotlightCaption: "Sudden discharge",
            note: "A sudden electrostatic discharge between the cloud and the ground then occurs as lightning.",
          },
        ],
        summaryLabel: "The four stages together",
        summary: [
          "Friction between clouds and the surrounding air causes electric charges to accumulate.",
          "The upper part of the cloud becomes positively charged while the lower part becomes negatively charged.",
          "Negative charge at the lower cloud induces positive charge on the ground.",
          "A sudden electrostatic discharge can then occur as lightning.",
        ],
      },
      accordions: [
        {
          title: "⚡ How lightning happens",
          body: "**Friction between clouds and the air** charges the clouds with electric charges. Lightning occurs because of the **attraction between the positive charge on the Earth and the negative charge on the cloud**.",
        },
        {
          title: "🏢 Lightning conductor",
          body: "A lightning conductor is fitted to a building to **provide a path for the electric charge from lightning to pass into the Earth**. This protects the building from being struck.",
        },
        {
          title: "📺 Dusty TV screen",
          body: "Problem: A television screen can become dusty quickly because electrostatic attraction causes charged dust particles to be attracted to the screen.",
          detail: "Solution: Use a microfibre / anti-electrostatic cloth to reduce the accumulation of dust.",
        },
        {
          title: "👕 Dry weather, fabric and static electricity",
          body: "In dry weather, electrostatic charge builds up on objects more easily. Plenty of water vapour in the air during humid weather prevents charge from accumulating. That is why small shocks happen more often in dry conditions.",
          detail: "Some synthetic fabrics accumulate electrostatic charge more easily from rubbing than others. If a nylon carpet causes a small shock when you touch a metal object, wearing rubber-soled shoes is the suggested way to reduce the effect.",
        },
        {
          title: "🚗 Safe shelter during a thunderstorm — the Faraday cage concept",
          body: "A metal box can protect what is inside it because charge travels over the outer surface of the metal and does not pass into the inside. This is why staying inside a metal-bodied vehicle is a safer shelter during a thunderstorm.",
          detail: "The protection comes from the metal body conducting charge around you — not from the rubber tyres.",
        },
        {
          title: "⛽ Extra: safety while refuelling",
          body: "Petrol vapour catches fire easily. A spark from built-up electrostatic charge could ignite that vapour, so charge must be reduced or safely conducted away while refuelling.",
          detail: "That is why the nozzle and tank are connected so charge flows to earth, and why drivers are advised not to keep getting in and out of the vehicle.",
        },
      ],
      dryHumidComparison: {
        title: "💧 Dry weather vs humid weather",
        dryLabel: "Dry",
        humidLabel: "Humid",
        dryCaption: "Little moisture in the air — charge builds up.",
        humidCaption: "Water vapour in the air — charge dissipates.",
        note: "Dry conditions allow electrostatic charge to accumulate more easily. In humid air, moisture helps charges dissipate more easily.",
      },
      checks: [
        {
          question: "Why does a Van de Graaff generator not work well in humid weather?",
          hint: "Plenty of water vapour in the air during humid weather prevents charge from accumulating on an object, so a large charge cannot build up.",
        },
        {
          question: "During a thunderstorm, which is the safer shelter — under a tall tree or inside a metal-bodied car? Why?",
          hint: "Inside the metal-bodied car. The metal body conducts charge around the outside rather than through the space inside it — this is the Faraday cage concept.",
        },
      ],
    },
    {
      number: "7.1",
      title: "Electric Current",
      conceptQuestion: "What is Electric Current?",
      intro:
        "When charge flows through a conductor, that flow produces an electric current. Current is the rate of flow of electric charge through a conductor. There are two ways this direction is described, and they are opposite to one another.",
      cards: [
        {
          title: "➕ ➡️ ➖ Conventional current",
          body: "The direction of conventional current is **from the positive terminal to the negative terminal**.",
          detail: "This is the direction used in every circuit and rule you learn.",
        },
        {
          title: "➖ ➡️ ➕ Electron movement",
          body: "Electrons actually move **from the negative terminal to the positive terminal**.",
          detail: "These two directions are opposite — make sure you know which one is being asked for.",
        },
        {
          title: "Proving that flowing charge makes current",
          body: "Charge from a Van de Graaff generator connected to an earthed galvanometer makes the **galvanometer needle deflect** — showing that **flowing charge produces an electric current**.",
          detail: "A galvanometer is used to detect small electric currents.",
        },
      ],
      currentDirection: {
        title: "🔀 Electron flow vs conventional current",
        instruction: "Tap either direction to compare them.",
        keyPoint: "These two directions are opposite.",
        negativeTerminalLabel: "Negative terminal",
        positiveTerminalLabel: "Positive terminal",
        contrastLabel: "Opposite directions",
        modes: [
          {
            id: "electron",
            label: "Electron Flow",
            note: "Electrons actually move from the negative terminal to the positive terminal.",
            directionSummary: "Negative → Positive",
          },
          {
            id: "conventional",
            label: "Conventional Current",
            note: "Conventional current is defined as flowing from the positive terminal to the negative terminal — the direction used in every circuit and rule you learn.",
            directionSummary: "Positive → Negative",
          },
        ],
      },
      checks: [
        {
          question: "In a simple circuit, which way do the electrons move, and which way is conventional current said to flow?",
          hint: "Electrons move from the negative terminal to the positive. Conventional current is said to flow from the positive terminal to the negative — the opposite direction.",
        },
        {
          question: "Why does a shock from a Van de Graaff generator not feel as dangerous as one from a wall socket?",
          hint: "The current from a Van de Graaff generator is far smaller than the current from a domestic power supply — it is current, not voltage alone, that makes a shock dangerous.",
        },
      ],
    },
    {
      number: "7.1",
      title: "Current, Voltage and Resistance",
      conceptQuestion: "What are Current, Voltage and Resistance?",
      intro:
        "Three electrical quantities to know, each with its own symbol, unit and measuring instrument. What gets tested most is not only what each instrument measures, but how it is connected into the circuit. Every complete circuit is drawn with standard symbols rather than pictures of the real components — learn those first, and the diagram below is easy to read.",
      contextImages: [
        {
          src: SCIENCE_F2_CH7_IMAGES.meterPlacement,
          alt: "Two circuits built from the same cell and lit bulb. In the left circuit an ammeter marked A sits in the main loop, so the same wire runs through it and the bulb. In the right circuit a voltmeter marked V sits on its own branch, connected across the two ends of the bulb.",
          caption:
            "The ammeter sits in the main loop; the voltmeter sits on its own branch across the bulb.",
          size: "panel",
          aspect: SCIENCE_F2_VISUAL_ASPECT.wide,
          priority: true,
          annotations: [],
        },
      ],
      cards: [
        {
          title: "Current, I",
          body: "**The rate of flow of electric charge through a conductor.**",
          detail: "Unit: ampere (A) · Instrument: ammeter · Connection: in series",
        },
        {
          title: "Voltage, V",
          body: "**The potential difference between two points in a circuit.**",
          detail: "Unit: volt (V) · Instrument: voltmeter · Connection: in parallel",
        },
        {
          title: "Resistance, R",
          body: "**Resistance is the ability of a conductor to limit or resist the flow of electric current.**",
          detail: "Unit: ohm (Ω) · A fixed resistor has a resistance that cannot be adjusted. A rheostat (variable resistor) allows resistance to be adjusted.",
        },
      ],
      circuitMeterDiagram: {
        title: "🔌 Where each meter is connected",
        instruction: "Tap any component to see what it does and how it is connected.",
        ruleCaption: "Ammeter — connected IN SERIES · Voltmeter — connected IN PARALLEL",
        hint: "Notice that the voltmeter sits on its own branch across the bulb.",
        labels: [
          {
            id: "cell",
            label: "Cell",
            note: "Supplies the potential difference that drives charge around the circuit.",
          },
          {
            id: "switch",
            label: "Switch",
            note: "Completes or breaks the circuit. When the switch is open, no current flows.",
          },
          {
            id: "bulb",
            label: "Bulb",
            note: "The component whose current and voltage are being measured here.",
          },
          {
            id: "ammeter",
            label: "Ammeter (A)",
            note: "Measures current in amperes. It is connected IN SERIES — the same current must pass through both the ammeter and the bulb, so the ammeter sits in the main loop itself.",
          },
          {
            id: "voltmeter",
            label: "Voltmeter (V)",
            note: "Measures voltage in volts. It is connected IN PARALLEL across the bulb — notice the separate branch that leaves before the bulb and rejoins after it.",
          },
        ],
      },
      checks: [
        {
          question: "Where should an ammeter be connected to measure the current through a bulb?",
          hint: "In series with the bulb — in the same loop, so that the same current flows through both.",
        },
        {
          question: "Where should a voltmeter be connected to measure the voltage across a bulb?",
          hint: "In parallel with the bulb — on its own branch across the two ends of the bulb.",
        },
        {
          question: "Which component has a resistance that can be adjusted?",
          hint: "The variable resistor (rheostat). A fixed resistor's resistance cannot be changed.",
        },
      ],
    },
    {
      number: "7.1",
      title: "Ohm's Law",
      conceptQuestion: "What is Ohm's Law?",
      intro:
        "Ohm's Law states that the electric current flowing through a conductor is directly proportional to the voltage across the two ends of that conductor, provided the temperature and other physical conditions stay constant. The relationship is written as V = IR.",
      remember:
        "**Ohm's Law**: The current flowing through a conductor is directly proportional to the voltage across it, provided the temperature and other physical conditions stay constant. Written as V = IR.",
      cards: [
        {
          title: "V = IR",
          body: "Voltage (V) = Current (I) × Resistance (R). Rearrange to find any one: I = V ÷ R, and R = V ÷ I.",
          detail: "V in volts · I in amperes · R in ohms",
        },
        {
          title: "What happens as resistance increases",
          body: "At a constant voltage, **the current flowing decreases as the resistance increases**. Increasing the length of a wire increases its resistance, which reduces the current.",
        },
      ],
      ohmsTriangle: {
        title: "🔺 The Ohm's Law triangle",
        instruction: "Tap V, I or R to cover it and see its formula.",
        vFormula: "V = I × R",
        iFormula: "I = V ÷ R",
        rFormula: "R = V ÷ I",
      },
      guidedCalculations: [
        {
          title: "✏️ Worked example",
          givenLabel: "Given",
          findLabel: "Find",
          formulaLabel: "Formula",
          substituteLabel: "Substitute",
          answerLabel: "Answer",
          given: ["V = 6 V", "R = 3 Ω"],
          find: "I = ? A",
          formula: "I = V ÷ R",
          substitute: "I = 6 V ÷ 3 Ω",
          answer: "I = 2 A",
        },
      ],
      unitsMemory: {
        title: "📌 Remember the units",
        items: [
          { quantitySymbol: "I", unitName: "ampere", unitSymbol: "A" },
          { quantitySymbol: "V", unitName: "volt", unitSymbol: "V" },
          { quantitySymbol: "R", unitName: "ohm", unitSymbol: "Ω" },
        ],
      },
      calculators: [
        {
          type: "ohms-law",
          title: "🧮 Ohm's Law calculator",
          instruction: "Enter any two values to find the third.",
        },
      ],
      checks: [
        {
          question: "A car bulb carries a current of 0.025 A when connected to a 12 V accumulator. What is its resistance?",
          hint: "R = V ÷ I = 12 ÷ 0.025 = 480 Ω. Try it in the calculator above.",
        },
      ],
    },

    // ---------------------------------------------------------------- 7.2
    {
      number: "7.2",
      title: "Series and Parallel Circuits",
      conceptQuestion: "What are Series and Parallel Circuits?",
      intro:
        "A series circuit connects components one after another in **a single path**. A parallel circuit **splits into separate branches**. That difference changes how current, voltage and resistance behave.",
      circuitSymbols: {
        title: "🔧 Electrical circuit components and their symbols",
        instruction: "Tap a component to see its symbol and purpose highlighted.",
        symbols: [
          { id: "switch", name: "Switch", purpose: "Opens or closes the circuit, stopping or allowing current to flow." },
          { id: "cell", name: "Dry cell", purpose: "A single source of electrical energy that drives current around a circuit." },
          { id: "voltmeter", name: "Voltmeter", purpose: "Measures voltage, in volts. Always connected in parallel." },
          { id: "galvanometer", name: "Galvanometer", purpose: "Detects and measures very small electric currents by deflecting its pointer." },
          { id: "ammeter", name: "Ammeter", purpose: "Measures current, in amperes. Always connected in series." },
          { id: "bulb", name: "Bulb", purpose: "Lights up when current flows through it — often used to show that a circuit is complete." },
          { id: "resistor", name: "Resistor", purpose: "A fixed component that opposes the flow of current by a set amount." },
          { id: "fuse", name: "Fuse", purpose: "A safety component that melts and breaks the circuit if the current becomes too large." },
          { id: "rheostat", name: "Variable resistor", purpose: "A resistor whose resistance can be adjusted, used to change the current in a circuit." },
        ],
      },
      circuitConceptSeries: {
        tag: "ONE PATH",
        title: "SERIES CIRCUIT",
        circuit: {
          kind: "series",
          supplyLabel: "6 V",
          resistors: [
            { id: "r1", label: "R₁" },
            { id: "r2", label: "R₂" },
          ],
          stepLabel: "Step",
        },
        explanation: "A series circuit has only one path for electric current to flow.",
        relationships: [
          {
            label: "Current",
            formula: "I = I₁ = I₂",
            teachingPoint: "The same current flows through every component.",
          },
          {
            label: "Voltage",
            formula: "V = V₁ + V₂",
            teachingPoint: "The supply voltage is shared across the components.",
          },
          {
            label: "Resistance",
            formula: "R = R₁ + R₂",
            teachingPoint: "The total resistance is the sum of all resistances.",
          },
        ],
        advantagesLabel: "Advantages",
        disadvantagesLabel: "Disadvantages",
        advantages: [
          "Every component in the circuit receives the same current.",
          "Components are controlled by the same switch.",
          "Increasing the supply voltage can increase the current.",
        ],
        disadvantages: [
          "If one component is damaged, the circuit is broken and the other components stop working.",
          "Adding more components increases total resistance and reduces current.",
          "Components cannot be switched independently.",
        ],
      },
      circuitConceptParallel: {
        tag: "SEVERAL BRANCHES",
        title: "PARALLEL CIRCUIT",
        circuit: {
          kind: "parallel",
          supplyLabel: "6 V",
          resistors: [
            { id: "r1", label: "R₁" },
            { id: "r2", label: "R₂" },
          ],
          stepLabel: "Step",
        },
        explanation: "A parallel circuit has more than one path for electric current to flow.",
        relationships: [
          {
            label: "Current",
            formula: "I = I₁ + I₂",
            teachingPoint: "The total current splits between the branches.",
          },
          {
            label: "Voltage",
            formula: "V = V₁ = V₂",
            teachingPoint: "Each branch receives the same voltage as the source.",
          },
          {
            label: "Resistance",
            formula: "1/R = 1/R₁ + 1/R₂",
            teachingPoint: "The effective resistance decreases when parallel branches are added.",
          },
        ],
        advantagesLabel: "Advantages",
        disadvantagesLabel: "Disadvantages",
        advantages: [
          "Each appliance can be switched on or off separately.",
          "Adding an appliance does not affect the others in the same circuit.",
          "Each branch receives the full supply voltage.",
        ],
        disadvantages: [
          "The voltage of each appliance cannot be controlled separately, because it is always the same as the supply voltage.",
        ],
      },
      seriesParallel: {
        title: "🔀 Series vs Parallel",
        instruction: "Tap Current, Voltage or Resistance to compare both circuits.",
        currentLabel: "Current",
        voltageLabel: "Voltage",
        resistanceLabel: "Resistance",
        advantageLabel: "Advantage",
        disadvantageLabel: "Disadvantage",
        hint: "Notice how many paths the charge can take in each circuit.",
        propertyExplanations: {
          current:
            "In series, the same current flows through one path. In parallel, the current splits between branches.",
          voltage:
            "In series, the supply voltage is shared. In parallel, each branch has the same voltage as the source.",
          resistance:
            "Series resistances add directly. Parallel branches reduce the effective resistance.",
        },
        circuits: {
          series: {
            kind: "series",
            supplyLabel: "6 V",
            resistors: [
              { id: "r1", label: "R₁" },
              { id: "r2", label: "R₂" },
            ],
            stepLabel: "Step",
          },
          parallel: {
            kind: "parallel",
            supplyLabel: "6 V",
            resistors: [
              { id: "r1", label: "R₁" },
              { id: "r2", label: "R₂" },
            ],
            stepLabel: "Step",
          },
        },
        kinds: [
          {
            id: "series",
            name: "Series circuit",
            pathSummary: "One path only",
            currentRule: "I = I₁ = I₂",
            voltageRule: "V = V₁ + V₂",
            resistanceRule: "R = R₁ + R₂",
            advantages: [
              "Every component in the circuit receives the same current.",
              "Components are controlled by the same switch.",
              "Increasing the supply voltage can increase the current.",
            ],
            disadvantages: [
              "If one component is damaged, the circuit is broken and the other components stop working.",
              "Adding more components increases total resistance and reduces current.",
              "Components cannot be switched independently.",
            ],
            note: "All components sit on the same loop, so charge has only one path to take.",
          },
          {
            id: "parallel",
            name: "Parallel circuit",
            pathSummary: "Several branches",
            currentRule: "I = I₁ + I₂",
            voltageRule: "V = V₁ = V₂",
            resistanceRule: "1/R = 1/R₁ + 1/R₂",
            advantages: [
              "Each appliance can be switched on or off separately.",
              "Adding an appliance does not affect the others in the same circuit.",
              "Each branch receives the full supply voltage.",
            ],
            disadvantages: [
              "The voltage of each appliance cannot be controlled separately, because it is always the same as the supply voltage.",
            ],
            note: "The circuit splits into branches at one point and rejoins at another, so charge has more than one path.",
          },
        ],
      },
      circuitRecognition: {
        title: "❓ Which Circuit Is It?",
        instruction: "Look at each diagram, then answer both questions below.",
        diagramA: {
          kind: "series",
          supplyLabel: "6 V",
          resistors: [
            { id: "r1", label: "R₁" },
            { id: "r2", label: "R₂" },
          ],
          stepLabel: "Step",
        },
        diagramB: {
          kind: "parallel",
          supplyLabel: "6 V",
          resistors: [
            { id: "r1", label: "R₁" },
            { id: "r2", label: "R₂" },
          ],
          stepLabel: "Step",
        },
        options: [
          { id: "a", label: "Diagram A", isSeries: true },
          { id: "b", label: "Diagram B", isSeries: false },
        ],
        seriesPrompt: "Which one is a series circuit?",
        parallelPrompt: "Which one is a parallel circuit?",
        seriesCorrectFeedback: "Correct — there is only one path.",
        parallelCorrectFeedback: "Correct — the current has more than one path.",
        incorrectFeedback: "Not quite — look again at how many paths the current can take.",
        reminderNote: "Identify the circuit before choosing a formula.",
      },
      numericalProblemsIntro: {
        title: "📊 Numerical Problems — Series & Parallel Circuits",
        instruction: "First identify the circuit. Then choose the correct relationship.",
        unitsMemory: {
          title: "📌 Remember the units",
          items: [
            { quantitySymbol: "I", unitName: "ampere", unitSymbol: "A" },
            { quantitySymbol: "V", unitName: "volt", unitSymbol: "V" },
            { quantitySymbol: "R", unitName: "ohm", unitSymbol: "Ω" },
          ],
        },
      },
      workedExamples: [
        {
          figureLabel: "Worked Example 1 — Series Circuit",
          questionIntro:
            "Two resistors, R₁ = 2 Ω and R₂ = 2 Ω, are connected in series to a 6 V supply.",
          circuit: {
            kind: "series",
            supplyLabel: "6 V",
            resistors: [
              { id: "r1", label: "R₁ = 2 Ω" },
              { id: "r2", label: "R₂ = 2 Ω" },
            ],
            stepLabel: "Step",
            showMeters: true,
            size: "large",
          },
          questionsLabel: "Calculate",
          questions: [
            "(a) the effective resistance, R",
            "(b) the current, I in the circuit",
            "(c) the voltage, V₁ and V₂ across the resistors",
          ],
          identifyCircuit: {
            prompt: "What type of circuit is this?",
            options: [
              { label: "Series", isCorrect: true },
              { label: "Parallel", isCorrect: false },
            ],
            correctFeedback: "Correct — the components are connected in one path.",
            incorrectFeedback: "Not quite — look at how many paths the current can take.",
            startSolutionLabel: "Start solution",
          },
          showSolutionLabel: "Start solution",
          solution: {
            title: "Worked Example 1 — solution",
            givenLabel: "Given",
            findLabel: "Find",
            formulaLabel: "Formula",
            substituteLabel: "Substitute",
            answerLabel: "Answer",
            given: ["R₁ = 2 Ω", "R₂ = 2 Ω", "Supply, V = 6 V (series)"],
            find: "Effective resistance R, then current I, then V₁ and V₂",
            formula: "R = R₁ + R₂  ·  I = V ÷ R  ·  V₁ = IR₁, V₂ = IR₂",
            substitute: "R = 2 + 2 = 4 Ω  ·  I = 6 ÷ 4 = 1.5 A  ·  V₁ = 1.5 × 2 = 3 V, V₂ = 1.5 × 2 = 3 V",
            answer: "R = 4 Ω, I = 1.5 A, V₁ = 3 V, V₂ = 3 V",
            circuit: {
              kind: "series",
              supplyLabel: "6 V",
              resistors: [
                { id: "r1", label: "R₁ = 2 Ω" },
                { id: "r2", label: "R₂ = 2 Ω" },
              ],
              stepLabel: "Step",
              showMeters: true,
              size: "large",
            },
            steps: [
              {
                label: "Step 1",
                formula: "R = R₁ + R₂",
                substitute: "R = 2 + 2",
                answer: "R = 4 Ω",
                highlight: ["r1", "r2"],
              },
              {
                label: "Step 2",
                formula: "I = V ÷ R",
                substitute: "I = 6 ÷ 4",
                answer: "I = 1.5 A",
                highlight: ["source", "loop"],
              },
              {
                label: "Step 3",
                formula: "V₁ = IR₁",
                substitute: "V₁ = 1.5 × 2",
                answer: "V₁ = 3 V",
                highlight: ["r1"],
              },
              {
                label: "Step 4",
                formula: "V₂ = IR₂",
                substitute: "V₂ = 1.5 × 2",
                answer: "V₂ = 3 V",
                highlight: ["r2"],
              },
            ],
          },
        },
        {
          figureLabel: "Worked Example 2 — Parallel Circuit",
          questionIntro:
            "Two resistors, R₁ = 2 Ω and R₂ = 2 Ω, are connected in parallel to a 6 V supply.",
          circuit: {
            kind: "parallel",
            supplyLabel: "6 V",
            resistors: [
              { id: "r1", label: "R₁ = 2 Ω" },
              { id: "r2", label: "R₂ = 2 Ω" },
            ],
            stepLabel: "Step",
            showMeters: true,
            size: "large",
          },
          questionsLabel: "Calculate",
          questions: [
            "(a) effective resistance, R",
            "(b) voltage, V across each branch",
            "(c) current, I in the circuit",
          ],
          identifyCircuit: {
            prompt: "What type of circuit is this?",
            options: [
              { label: "Series", isCorrect: false },
              { label: "Parallel", isCorrect: true },
            ],
            correctFeedback: "Correct — current has more than one path.",
            incorrectFeedback: "Not quite — look at how many branches the current can take.",
            startSolutionLabel: "Start solution",
          },
          showSolutionLabel: "Start solution",
          solution: {
            title: "Worked Example 2 — solution",
            givenLabel: "Given",
            findLabel: "Find",
            formulaLabel: "Formula",
            substituteLabel: "Substitute",
            answerLabel: "Answer",
            given: ["R₁ = 2 Ω", "R₂ = 2 Ω", "Supply, V = 6 V (parallel)"],
            find: "Effective resistance R, then branch currents I₁ and I₂, then total current I",
            formula: "1/R = 1/R₁ + 1/R₂  ·  I₁ = V ÷ R₁, I₂ = V ÷ R₂  ·  I = I₁ + I₂",
            substitute: "1/R = 1/2 + 1/2 = 1, so R = 1 Ω  ·  I₁ = 6 ÷ 2 = 3 A, I₂ = 6 ÷ 2 = 3 A  ·  I = 3 + 3",
            answer: "R = 1 Ω, I₁ = 3 A, I₂ = 3 A, total I = 6 A",
            circuit: {
              kind: "parallel",
              supplyLabel: "6 V",
              resistors: [
                { id: "r1", label: "R₁ = 2 Ω" },
                { id: "r2", label: "R₂ = 2 Ω" },
              ],
              stepLabel: "Step",
              showMeters: true,
              size: "large",
            },
            steps: [
              {
                label: "Step 1",
                formula: "1/R = 1/R₁ + 1/R₂",
                substitute: "1/R = 1/2 + 1/2 = 1",
                answer: "R = 1 Ω",
                highlight: ["r1", "r2"],
              },
              {
                label: "Step 2",
                formula: "V = V₁ = V₂",
                substitute: "V = V₁ = V₂ = 6 V",
                answer: "V₁ = V₂ = 6 V",
                highlight: ["source", "r1", "r2"],
              },
              {
                label: "Step 3",
                formula: "I₁ = V₁ ÷ R₁",
                substitute: "I₁ = 6 ÷ 2",
                answer: "I₁ = 3 A",
                highlight: ["r1"],
              },
              {
                label: "Step 4",
                formula: "I₂ = V₂ ÷ R₂",
                substitute: "I₂ = 6 ÷ 2",
                answer: "I₂ = 3 A",
                highlight: ["r2"],
              },
              {
                label: "Step 5",
                formula: "I = I₁ + I₂",
                substitute: "I = 3 + 3",
                answer: "I = 6 A",
                highlight: ["source"],
              },
            ],
          },
        },
      ],
      selfPractice: {
        title: "🎯 Try It Yourself",
        instruction: "Work through each figure yourself before checking the solution.",
        figures: [
          {
            figureLabel: "Circuit 1",
            questionIntro:
              "Three resistors, R₁ = 1 Ω, R₂ = 3 Ω and R₃ = 5 Ω, are connected in series to a 9 V supply.",
            circuit: {
              kind: "series",
              supplyLabel: "9 V",
              resistors: [
                { id: "r1", label: "R₁ = 1 Ω" },
                { id: "r2", label: "R₂ = 3 Ω" },
                { id: "r3", label: "R₃ = 5 Ω" },
              ],
              stepLabel: "Step",
              size: "large",
            },
            questionsLabel: "Calculate",
            questions: [
              "a. the effective resistance",
              "b. the current in the circuit",
              "c. the voltage across each resistor",
            ],
            hintsLabel: "Hint",
            hints: [
              "Identify whether the resistors are connected in series or in parallel.",
              "Calculate the effective resistance first — you will need it for every other part.",
            ],
            showSolutionLabel: "Show solution",
            solution: {
              title: "Circuit 1 — solution",
              givenLabel: "Given",
              findLabel: "Find",
              formulaLabel: "Formula",
              substituteLabel: "Substitute",
              answerLabel: "Answer",
              given: ["V = 9 V", "R₁ = 1 Ω", "R₂ = 3 Ω", "R₃ = 5 Ω"],
              find: "R, then I, then V₁, V₂ and V₃",
              formula: "R = R₁ + R₂ + R₃  ·  I = V ÷ R  ·  V = IR (each resistor)",
              substitute: "R = 1 + 3 + 5 = 9 Ω  ·  I = 9 ÷ 9 = 1 A  ·  V₁ = 1×1, V₂ = 1×3, V₃ = 1×5",
              answer: "R = 9 Ω, I = 1 A, V₁ = 1 V, V₂ = 3 V, V₃ = 5 V",
              circuit: {
                kind: "series",
                supplyLabel: "9 V",
                resistors: [
                  { id: "r1", label: "R₁ = 1 Ω" },
                  { id: "r2", label: "R₂ = 3 Ω" },
                  { id: "r3", label: "R₃ = 5 Ω" },
                ],
                stepLabel: "Step",
                size: "large",
              },
              steps: [
                {
                  label: "Step 1",
                  formula: "R = R₁ + R₂ + R₃",
                  substitute: "R = 1 + 3 + 5",
                  answer: "R = 9 Ω",
                  highlight: ["r1", "r2", "r3"],
                },
                {
                  label: "Step 2",
                  formula: "I = V ÷ R",
                  substitute: "I = 9 ÷ 9",
                  answer: "I = 1 A",
                  highlight: ["source", "loop"],
                },
                {
                  label: "Step 3",
                  formula: "V₁ = IR₁",
                  substitute: "V₁ = 1 × 1",
                  answer: "V₁ = 1 V",
                  highlight: ["r1"],
                },
                {
                  label: "Step 4",
                  formula: "V₂ = IR₂",
                  substitute: "V₂ = 1 × 3",
                  answer: "V₂ = 3 V",
                  highlight: ["r2"],
                },
                {
                  label: "Step 5",
                  formula: "V₃ = IR₃",
                  substitute: "V₃ = 1 × 5",
                  answer: "V₃ = 5 V",
                  highlight: ["r3"],
                },
              ],
            },
          },
          {
            figureLabel: "Circuit 2",
            questionIntro:
              "Two resistors, R₁ = 3 Ω and R₂ = 6 Ω, are connected in parallel to a 4 V supply.",
            circuit: {
              kind: "parallel",
              supplyLabel: "4 V",
              resistors: [
                { id: "r1", label: "R₁ = 3 Ω" },
                { id: "r2", label: "R₂ = 6 Ω" },
              ],
              stepLabel: "Step",
              size: "large",
            },
            questionsLabel: "Calculate",
            questions: [
              "a. the effective resistance",
              "b. the voltage across each resistor",
              "c. the current through each resistor (I₁ and I₂)",
            ],
            hintsLabel: "Hint",
            hints: [
              "Identify whether the resistors are connected in series or in parallel.",
              "Calculate the effective resistance first — you will need it for every other part.",
            ],
            showSolutionLabel: "Show solution",
            solution: {
              title: "Circuit 2 — solution",
              givenLabel: "Given",
              findLabel: "Find",
              formulaLabel: "Formula",
              substituteLabel: "Substitute",
              answerLabel: "Answer",
              given: ["V = 4 V", "R₁ = 3 Ω", "R₂ = 6 Ω"],
              find: "R, then V₁ and V₂, then I₁ and I₂",
              formula: "1/R = 1/R₁ + 1/R₂  ·  V = V₁ = V₂  ·  I = V ÷ R (each branch)",
              substitute: "1/R = 1/3 + 1/6 = 1/2, so R = 2 Ω  ·  V₁ = V₂ = 4 V  ·  I₁ = 4÷3, I₂ = 4÷6",
              answer: "R = 2 Ω, V₁ = V₂ = 4 V, I₁ ≈ 1.33 A, I₂ ≈ 0.67 A",
              circuit: {
                kind: "parallel",
                supplyLabel: "4 V",
                resistors: [
                  { id: "r1", label: "R₁ = 3 Ω" },
                  { id: "r2", label: "R₂ = 6 Ω" },
                ],
                stepLabel: "Step",
                size: "large",
              },
              steps: [
                {
                  label: "Step 1",
                  formula: "1/R = 1/R₁ + 1/R₂",
                  substitute: "1/R = 1/3 + 1/6 = 1/2",
                  answer: "R = 2 Ω",
                  highlight: ["r1", "r2"],
                },
                {
                  label: "Step 2",
                  formula: "V = V₁ = V₂",
                  substitute: "V₁ = V₂ = 4 V",
                  answer: "V₁ = V₂ = 4 V",
                  highlight: ["source", "r1", "r2"],
                },
                {
                  label: "Step 3",
                  formula: "I₁ = V₁ ÷ R₁",
                  substitute: "I₁ = 4 ÷ 3",
                  answer: "I₁ ≈ 1.33 A",
                  highlight: ["r1"],
                },
                {
                  label: "Step 4",
                  formula: "I₂ = V₂ ÷ R₂",
                  substitute: "I₂ = 4 ÷ 6",
                  answer: "I₂ ≈ 0.67 A",
                  highlight: ["r2"],
                },
                {
                  label: "Step 5",
                  formula: "I = I₁ + I₂ (total, optional)",
                  substitute: "I ≈ 1.33 + 0.67",
                  answer: "I ≈ 2.00 A",
                  highlight: ["source"],
                },
              ],
            },
          },
        ],
      },
      calculators: [
        {
          type: "resistance-comparator",
          title: "🔌 Compare effective resistance",
          instruction: "Enter two resistor values and see how series and parallel combine them.",
          defaultR1: 2,
          defaultR2: 2,
        },
      ],
      cards: [
        {
          title: "🏠 Wiring at home",
          body: "Household electrical wiring uses parallel circuits so that every appliance receives **the same voltage from the supply**, and each appliance can be switched on or off without affecting the others.",
        },
      ],
      checks: [
        {
          question: "Why are household electrical appliances connected in parallel?",
          hint: "So that each appliance receives the same voltage from the supply, and so that each can be switched on or off separately without affecting the others.",
        },
        {
          question:
            "A fire alarm system must be able to be triggered by heat detectors in several different locations in one building. Which circuit is suitable?",
          hint: "A parallel circuit — so the alarm can be set off by heat-detector switches from different locations in the building, and one failed detector does not disable the whole system.",
        },
      ],
    },

    // ---------------------------------------------------------------- 7.3
    {
      number: "7.3",
      title: "Properties of Magnets and Magnetic Fields",
      conceptQuestion: "What is a Magnetic Field?",
      intro:
        "Magnets occur naturally as lodestone, but most magnets used today are made from materials such as **iron, steel, cobalt and nickel**. The region around a magnet where its magnetic force can be felt is called the **magnetic field**.",
      flipCards: [
        { id: "attracts", icon: "🧲", label: "Attracts magnetic materials", fact: "Iron, steel, cobalt and nickel are attracted to it." },
        { id: "poles", icon: "🔴🔵", label: "Has poles", fact: "Every magnet has a north pole and a south pole." },
        { id: "like-repel", icon: "↔️", label: "Like poles repel", fact: "Like poles repel; unlike poles attract." },
        { id: "compass", icon: "🧭", label: "Points north-south", fact: "A magnet suspended freely points in the north-south direction." },
      ],
      magnetFieldDiagram: {
        title: "🧲 Magnetic field patterns",
        instruction: "Choose a type of magnet, then tap a property to see what the pattern shows.",
        shapeLabel: "Type of magnet",
        featureLabel: "Properties of magnetic field lines",
        hint: "Start by choosing a type of magnet above.",
        shapes: [
          {
            id: "bar",
            name: "Bar magnet",
            note: "The field lines curve out of the north pole and back into the south pole, forming closed loops outside the magnet.",
          },
          {
            id: "horseshoe",
            name: "Horseshoe magnet",
            note: "Both poles sit close together, so the magnetic field across the gap between them is stronger and more uniform.",
          },
          {
            id: "magnadur",
            name: "Magnadur magnet",
            note: "Its poles are on the wide flat faces. A facing pair of magnadur magnets produces an almost uniform field between them.",
          },
          {
            id: "like-poles",
            name: "Two like poles",
            note: "When two like poles face each other, their magnetic fields oppose one another and produce a neutral point between them.",
          },
        ],
        features: [
          {
            id: "direction",
            label: "Direction",
            note: "Outside the magnet, magnetic field lines run from the north pole to the south pole.",
          },
          {
            id: "density",
            label: "Spacing",
            note: "Magnetic field lines lie closer together where the magnetic field is stronger — that is, near the poles.",
          },
          {
            id: "no-cross",
            label: "Never cross",
            note: "Magnetic field lines never meet or cross one another.",
          },
          {
            id: "neutral",
            label: "Neutral point (X)",
            requiresShape: "like-poles",
            note: "The magnetic field between two like poles produces a point with no magnetic field at all. This is called the neutral point, marked X.",
          },
        ],
      },
      checks: [
        {
          question: "Where on a bar magnet are the field lines closest together, and what does that mean?",
          hint: "Near the two poles. Lines lying closer together mean the magnetic field in that region is stronger.",
        },
        {
          question: "What is produced between two north poles facing each other?",
          hint: "A neutral point (X) — a point with no magnetic field, because the fields from the two poles oppose each other there.",
        },
      ],
    },
    {
      number: "7.3",
      title: "Electromagnets and Field Patterns",
      conceptQuestion: "What is an Electromagnet?",
      intro:
        "An electromagnet is **a temporary magnet** — it only produces a magnetic field while a current flows. The direction of the field produced is **set by the direction of the current**, and the pattern of the field **depends on the shape of the conductor**.",
      currentFieldPatterns: {
        title: "🌀 Magnetic fields from an electric current",
        instruction: "Choose a conductor shape, then reverse the current to see what changes.",
        patternLabel: "Pattern:",
        directionLabel: "Direction:",
        keyPoint:
          "Reverse the current direction. Reversing the current changes the DIRECTION of the magnetic field, but the pattern of the field stays the same.",
        gripRule: {
          title: "Right-hand grip rule",
          steps: [
            "Point the thumb of your RIGHT hand in the direction of the conventional current.",
            "Your curled fingers show the direction of the magnetic field.",
          ],
        },
        hint: "Tap any conductor shape above.",
        noticeLabel: "What should you notice?",
        conductors: [
          {
            id: "straight",
            name: "Straight wire",
            pattern: "concentric circles around the wire, spaced further apart further from the wire",
            direction: "found using the right-hand grip rule.",
            note: "A straight wire produces magnetic field lines in the shape of concentric circles.",
            image: {
              src: SCIENCE_F2_CH7_IMAGES.straightWireApparatus,
              alt: "A vertical copper wire passing through the centre of a horizontal board, with eight plotting compasses arranged in a ring around it.",
              caption: "The apparatus used to show the magnetic field around a straight current-carrying wire.",
            },
            notice: [
              "The field forms circles around the wire.",
              "Reversing the current reverses the field direction.",
              "The field becomes weaker farther from the wire.",
            ],
          },
          {
            id: "loop",
            name: "Loop of wire",
            pattern: "concentric circles around each side of the wire, combining at the centre of the loop",
            direction: "found using the right-hand grip rule on any part of the wire.",
            note: "The fields from the two sides of the loop combine at the centre, making the field there stronger.",
            image: {
              src: SCIENCE_F2_CH7_IMAGES.circularLoopApparatus,
              alt: "A single circular copper loop held upright on a laboratory stand, its two ends clamped to the terminals beneath it.",
              caption: "The apparatus used to show the magnetic field of a current-carrying circular loop.",
            },
            notice: [
              "The magnetic fields from different parts of the loop combine.",
              "The field is stronger near the centre of the loop.",
              "Reversing the current reverses the field direction.",
            ],
          },
          {
            id: "solenoid",
            name: "Solenoid",
            pattern: "resembles the field pattern of a bar magnet, with a pole at each end",
            direction:
              "current flowing anticlockwise at one end makes that end a north pole; current flowing clockwise makes it a south pole.",
            note: "A solenoid is a long coil. Its field outside resembles that of a bar magnet.",
            image: {
              src: SCIENCE_F2_CH7_IMAGES.solenoidApparatus,
              alt: "An air-core solenoid: copper wire wound into about eleven evenly spaced turns, held horizontally on a stand, with its hollow centre visible.",
              caption: "The apparatus used to show the magnetic field of a current-carrying solenoid.",
            },
            notice: [
              "The field resembles that of a bar magnet.",
              "One end acts as a north pole, the other as a south pole.",
              "The field inside the solenoid is relatively strong.",
              "Reversing the current reverses which end is which pole.",
            ],
          },
        ],
      },
      cards: [
        {
          title: "Field strength and distance",
          body: "**The strength of a magnetic field decreases as you move further from the centre of the conductor.** This is different from the factors that change the strength of the electromagnet itself — distance changes the strength you measure, not the strength produced.",
        },
        {
          title: "🧲 Why a coil, and why an iron core",
          body: "A coil concentrates the magnetic field from every turn of wire into the same small space, making the field far stronger than a single straight wire. An iron core placed inside the coil strengthens the electromagnet further.",
        },
      ],
      checks: [
        {
          question: "The direction of the current in a straight wire is reversed. What changes about its magnetic field?",
          hint: "The direction of the field reverses, but the pattern stays the same — still concentric circles around the wire.",
        },
        {
          question: "Using the right-hand grip rule, what does the thumb show and what do the curled fingers show?",
          hint: "The thumb shows the direction of the conventional current; the curled fingers show the direction of the magnetic field.",
        },
      ],
    },
    {
      number: "7.3",
      title: "Electromagnet Strength and Its Uses",
      intro:
        "Two factors change the strength of an electromagnet. Rather than taking the answers on trust, investigate both the way it is done in the laboratory — with a hypothesis, variables and observations.",
      contextImages: [
        {
          src: SCIENCE_F2_CH7_IMAGES.electromagnetUses,
          alt: "Four uses of an electromagnet. An electric bell, where a coil pulls an arm so the striker hits the gong. A magnetic door lock holding a door shut. A scrapyard crane lifting steel beams on a large round electromagnet. An iron nail wrapped in coiled wire and connected to a cell, picking up paper clips.",
          caption:
            "Electric bell, magnetic door lock, scrapyard lifting magnet, and the coil-and-nail electromagnet built in the laboratory.",
          size: "panel",
          aspect: SCIENCE_F2_VISUAL_ASPECT.wide,
          priority: true,
          annotations: [],
        },
      ],
      miniExperiment: {
        title: "🔬 Investigation: factors affecting magnetic field strength",
        aim: "To study the factors that affect the magnetic field strength of an electromagnet.",
        instruction: "Pick one factor to see its full investigation.",
        apparatusImage: {
          src: SCIENCE_F2_CH7_IMAGES.electromagnetInvestigation,
          alt: "The investigation set up on a laboratory bench. A D.C. power supply, a switch, an ammeter and a rheostat are connected in one series loop with copper wire wound around a vertical iron rod. The rod is held by a clamp on a retort stand, with its lower end above a Petri dish of pins.",
          responseLabels: [
            "Weakest field around the iron core — the fewest pins are attracted.",
            "Weak field around the iron core — few pins are attracted.",
            "Stronger field around the iron core — more pins are attracted.",
            "Strong field around the iron core — many pins are attracted.",
            "Strongest field around the iron core — the most pins are attracted.",
          ],
          turnsLabel: "Coil turns",
        },
        aimLabel: "Aim",
        hypothesisLabel: "Hypothesis",
        manipulatedLabel: "Manipulated variable",
        respondingLabel: "Responding variable",
        controlledLabel: "Controlled variable",
        materialsLabel: "Materials",
        apparatusLabel: "Apparatus",
        methodLabel: "Method",
        observationLabel: "Observation",
        conclusionLabel: "Conclusion",
        parts: [
          {
            id: "current",
            icon: "⚡",
            label: "Current",
            question: "Does the current flowing affect the strength of the magnetic field?",
            hypothesis:
              "The greater the current flowing in the conductor, the higher the strength of the magnetic field.",
            manipulated: "Current",
            responding: "Number of pins attracted",
            controlled: "Number of coil turns (10 turns)",
            materials: "Pins, an iron rod and copper wire",
            apparatus:
              "D.C. power supply, switch, ammeter, rheostat, Petri dish, connecting wires, retort stand and clamp",
            method: [
              "Set up the apparatus with 10 turns of copper wire around the iron rod.",
              "Switch on and adjust the rheostat to obtain a current of 0.5 A.",
              "Replace the Petri dish holding the pins with an empty Petri dish.",
              "Switch off so that all the pins attracted by the iron rod fall into the empty Petri dish.",
              "Count the pins attracted, then repeat using currents of 1.0 A, 1.5 A, 2.0 A and 2.5 A.",
            ],
            observation:
              "The greater the current used, the more pins are attracted by the iron rod.",
            conclusion:
              "A greater current produces a higher magnetic field strength. The hypothesis is accepted.",
            values: ["0.5 A", "1.0 A", "1.5 A", "2.0 A", "2.5 A"],
          },
          {
            id: "turns",
            icon: "🌀",
            label: "Number of coil turns",
            question: "Does the number of coil turns affect the strength of the magnetic field?",
            hypothesis:
              "The greater the number of coil turns, the higher the strength of the magnetic field.",
            manipulated: "Number of coil turns",
            responding: "Number of pins attracted",
            controlled: "Current (0.5 A)",
            materials: "Pins, an iron rod and copper wire",
            apparatus:
              "D.C. power supply, switch, ammeter, rheostat, Petri dish, connecting wires, retort stand and clamp",
            method: [
              "Set up the apparatus with 10 turns of copper wire around the iron rod.",
              "Switch on and adjust the rheostat to obtain a current of 0.5 A.",
              "Replace the Petri dish holding the pins with an empty Petri dish.",
              "Switch off so that all the attracted pins fall into the empty Petri dish, then count them.",
              "Repeat the steps above using 20, 30, 40 and 50 turns of copper wire, keeping the current at 0.5 A.",
            ],
            observation:
              "The greater the number of coil turns used, the more pins are attracted by the iron rod.",
            conclusion:
              "A greater number of coil turns produces a higher magnetic field strength. The hypothesis is accepted.",
            values: ["10", "20", "30", "40", "50"],
          },
        ],
      },
      apparatusDiagram: {
        title: "🧪 The investigation set-up",
        instruction: "Tap any part of the apparatus to find out what it does.",
        caption: "Electromagnet strength is measured by the number of pins attracted",
        hint: "Notice that the ammeter and rheostat sit on the same loop as the coil.",
        parts: [
          { id: "supply", label: "D.C. power supply", note: "Supplies the direct current that flows through the coil." },
          { id: "switch", label: "Switch", note: "Turns the circuit on and off. Switching off releases the pins so they can be counted." },
          { id: "ammeter", label: "Ammeter", note: "Measures the current flowing through the coil. It is connected in series in this circuit." },
          { id: "rheostat", label: "Rheostat", note: "A variable resistor used to adjust the current to the value wanted, for example 0.5 A." },
          { id: "coil", label: "Copper wire coil", note: "Copper wire wound around the iron rod. The number of turns is the second factor studied." },
          { id: "rod", label: "Iron rod", note: "The core that becomes magnetised when current flows through the coil around it." },
          { id: "pins", label: "Pins", note: "The number of pins attracted is the measure of magnetic field strength." },
          { id: "stand", label: "Retort stand and clamp", note: "Holds the iron rod in a fixed position above the Petri dish." },
        ],
      },
      cards: [
        {
          title: "🧭 Uses of magnets",
          body: "A compass needle uses a freely suspended magnet to **show the direction of the poles**. Credit and debit cards **store information on a magnetic strip**.",
        },
        {
          title: "🔔 Uses of electromagnets",
          body: "An electric bell uses an **electromagnet to move its striker** repeatedly. A magnetic door lock uses an electromagnet to **lock a door automatically** — and because it is an electromagnet, the lock releases when the current is switched off.",
        },
      ],
      checks: [
        {
          question:
            "In the investigation into the effect of current on magnetic field strength, which is the manipulated variable and which is the responding variable?",
          hint: "Manipulated: the current. Responding: the number of pins attracted. The number of coil turns is kept constant at 10 turns.",
        },
        {
          question:
            "An electromagnet used to lift scrap iron has a coil with many turns. Why?",
          hint: "A greater number of coil turns produces a stronger magnetic field, letting it lift a heavier load.",
        },
      ],
    },
  ],
  reflectionItems: [
    "I can distinguish a form of energy from a source of energy, and name examples of each.",
    "I can explain how electrostatic charge arises through the transfer of electrons.",
    "I can explain lightning, lightning conductors, refuelling safety and the Faraday cage concept.",
    "I can distinguish the direction of conventional current from the direction of electron movement.",
    "I can state the symbol, unit and measuring instrument for current, voltage and resistance.",
    "I can connect an ammeter in series and a voltmeter in parallel.",
    "I can use Ohm's Law, V = IR, to solve problems.",
    "I can compare current, voltage and resistance in series and parallel circuits.",
    "I can explain the properties of magnetic field lines, including the neutral point.",
    "I can use the right-hand grip rule to find the direction of a magnetic field.",
    "I can carry out an investigation into the factors affecting electromagnet strength.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: In a parallel circuit, the voltage across each branch is the same.",
      answer: true,
      explanation: "True — every branch in a parallel circuit gets the same voltage as the supply.",
    },
    {
      type: "multiple-choice",
      question: "How are an ammeter and a voltmeter connected in a circuit?",
      options: [
        "Both in series",
        "Ammeter in series, voltmeter in parallel",
        "Ammeter in parallel, voltmeter in series",
        "Both in parallel",
      ],
      answerIndex: 1,
      explanation:
        "An ammeter is connected in series so the same current passes through it, while a voltmeter is connected in parallel across the component whose voltage is being measured.",
    },
    {
      type: "multiple-choice",
      question: "What determines the direction of the magnetic field around a straight current-carrying wire?",
      options: ["The material of the wire", "The direction of current flow (right-hand grip rule)", "The wire's length", "The number of dry cells"],
      answerIndex: 1,
      explanation:
        "The right-hand grip rule: point your thumb in the direction of the current, and your curled fingers show the direction of the magnetic field.",
    },
    {
      type: "true-false",
      question:
        "True or false: Reversing the current direction in a straight wire changes the pattern of its magnetic field.",
      answer: false,
      explanation:
        "False. Reversing the current changes the DIRECTION of the magnetic field, but the pattern stays the same — still concentric circles around the wire.",
    },
  ],
};
