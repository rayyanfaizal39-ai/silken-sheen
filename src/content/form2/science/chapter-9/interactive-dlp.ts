import type { ScienceF2InteractiveContent } from "../interactive-types";
import { SCIENCE_F2_CH9_IMAGES, SCIENCE_F2_VISUAL_ASPECT } from "../visual-assets";

export const scienceF2C9InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 9,
  blogHighlight: {
    title: "Science Blog — Carpet or Marble: Which Feels Warmer?",
    body: "Why does a carpet feel warmer than a marble floor when both are at the same room temperature? **Marble conducts heat away from your feet faster** than carpet does. Carpet is a poorer heat conductor, so heat leaves your feet more slowly — it is not that the carpet is actually at a higher temperature.",
    imagePath: SCIENCE_F2_CH9_IMAGES.polarBear,
    imageAlt:
      "A polar bear standing on sea ice at night, with a thermal-imaging cut-away showing the heat trapped inside its body while its fur stays cold.",
  },
  keywords: [
    "Heat",
    "Temperature",
    "Conduction",
    "Convection",
    "Radiation",
    "Heat conductor",
    "Heat insulator",
    "Thermal equilibrium",
    "Sea breeze",
    "Land breeze",
    "Expansion",
    "Contraction",
    "Bimetallic strip",
    "Green Building",
  ],
  sections: [
    {
      number: "9.1",
      title: "Heat and Temperature",
      conceptQuestion: "What are Heat and Temperature?",
      intro:
        "Heat is **a form of energy** that flows from a hotter region to a colder region. Temperature is **a measure of the degree of hotness or coldness** of an object. The two are related, but they are not the same thing.",
      remember:
        "Heat is a form of energy measured in joules (J); temperature is the degree of hotness or coldness measured in °C or K. The two are related, but they are not the same thing.",
      quickExplanation:
        "Both samples are at the same temperature, but more heat energy is needed to heat the larger amount of water to that temperature.",
      differencesTable: {
        title: "Table 9.1 — Differences Between Heat and Temperature",
        headers: ["Heat", "Temperature"],
        rows: [
          {
            label: "Meaning",
            left: "A form of energy",
            right: "The degree of hotness or coldness of an object",
          },
          {
            label: "Unit",
            left: "joule (J)",
            right: "degree Celsius (°C) or kelvin (K)",
          },
          {
            label: "Depends on",
            left: ["the type of material", "the quantity of material", "the temperature"],
            right: "the degree of movement of particles in the substance",
          },
        ],
      },
      comparison: {
        title: "Same Temperature, Different Quantity",
        columns: [
          {
            title: "Container A",
            body: "100 mL of water at 100 °C.",
            facts: [
              { label: "Volume", value: "100 mL" },
              { label: "Temperature", value: "100 °C" },
            ],
          },
          {
            title: "Container B",
            body: "200 mL of water at 100 °C.",
            facts: [
              { label: "Volume", value: "200 mL" },
              { label: "Temperature", value: "100 °C" },
            ],
          },
        ],
      },
      checks: [
        {
          question: "Is touch a reliable way to check whether someone has a fever?",
          hint: "Not really — touch is subjective and affected by the temperature of your own hand. A thermometer gives an objective temperature reading.",
        },
        {
          question:
            "Water in two beakers (100 ml and 200 ml) is boiled. Is the temperature the same? Is the quantity of heat the same?",
          hint: "The temperature is the same (100 °C), but more heat energy was needed to heat the 200 ml sample, since it is a greater quantity of water.",
        },
      ],
    },
    {
      number: "9.2",
      title: "Three Methods of Heat Transfer",
      conceptQuestion: "How Does Heat Travel?",
      intro:
        "Heat always flows from a hotter region to a colder region. It can do that in three ways. Conduction is **the flow of heat from a hot region to a cold region through a solid medium**. In fluids, convection **carries heat through the movement of the fluid itself**. Radiation needs no medium at all — it is **the only way heat can travel through empty space**.",
      quickExplanation:
        "What travels along a conducting material is energy, not particles — each particle simply vibrates in place and passes energy on to its neighbour.",
      heatFlowDirection: {
        title: "➡️ Which way does heat flow?",
        instruction: "Heat always moves in one direction: from hotter to colder.",
        heatLabel: "heat",
        noNetFlowLabel: "no net heat transfer",
        caption: "Establish the direction first — every method below obeys it.",
        stages: [
          {
            id: "flow",
            label: "Hotter to colder",
            note: "Heat flows from a hotter region or object to a colder region or object. It never flows the other way on its own.",
            leftLabel: "HOT",
            rightLabel: "COLD",
            leftTemperature: "80 °C",
            rightTemperature: "20 °C",
          },
        ],
      },
      ch9SpotlightFigure: {
        title: "🔥 The three methods compared",
        figure: "heat-transfer",
        src: SCIENCE_F2_CH9_IMAGES.heatTransferMethods,
        alt: "Three panels side by side. A metal rod heated by a Bunsen burner at one end, with particles drawn along it. A beaker of water over a burner with arrows circling upward through the middle and down the sides. The Sun on the left sending wavy rays across empty space to the Earth on the right.",
        instruction:
          "Tap each method to see how the heat moves. The panel you choose stays bright while the other two dim.",
        prompt: "Choose a method to compare how the heat travels.",
        caption:
          "One picture, three methods: through a solid, through a moving fluid, and through nothing at all.",
        legendLabel: "The three methods of heat transfer",
        concepts: [
          {
            id: "conduction",
            icon: "🔗",
            label: "Conduction",
            spotlightCaption: "Through a solid",
            note: "Conduction is the transfer of heat through a solid from a hotter region to a colder region. Particles at the hot end gain energy and vibrate faster, then transfer that energy to neighbouring particles through collisions. The particles vibrate around fixed positions — they do not travel from the hot end to the cold end.",
          },
          {
            id: "convection",
            icon: "🌀",
            label: "Convection",
            spotlightCaption: "Through a moving fluid",
            note: "Convection transfers heat through fluids — liquids and gases. When a fluid is heated it expands, becomes less dense and rises. Cooler fluid is denser and sinks. This continuous circulation forms a convection current.",
          },
          {
            id: "radiation",
            icon: "☀️",
            label: "Radiation",
            spotlightCaption: "Through empty space",
            note: "Radiation transfers heat without requiring a material medium, so it can travel through a vacuum. Conduction requires matter and convection requires a fluid; radiation requires neither.",
          },
        ],
      },
      conductionDiagram: {
        title: "🔗 Explore conduction: energy along a solid",
        instruction: "Tap each stage to watch the energy travel along the rod.",
        particleCount: 9,
        hotLabel: "Hot end",
        coldLabel: "Cold end",
        mechanismNote:
          "Notice that the particles stay in their positions. What travels along the rod is energy, not particles — each particle simply vibrates in place and passes energy on to its neighbour.",
        stages: [
          {
            id: "start",
            label: "Heating begins",
            note: "Particles at the hot end receive heat energy and begin to vibrate faster.",
          },
          {
            id: "middle",
            label: "Energy travels",
            note: "The faster-vibrating particles collide with their neighbours more often, transferring energy to the middle of the rod.",
          },
          {
            id: "full",
            label: "Energy reaches the far end",
            note: "Continuous particle-to-particle collisions carry the heat energy all the way to the cold end.",
          },
        ],
        caption: "The particles stay in place — only the energy travels.",
        hint: "Pick a stage to see what happens.",
      },
      checks: [
        {
          question: "Do metal particles travel from the hot end to the cold end during conduction?",
          hint: "No. The particles stay in their positions and simply vibrate; only energy is transferred, through collisions.",
        },
        {
          question:
            "How does heat energy from the Sun reach the Earth, and why can only one method do it?",
          hint: "By radiation. Space is a vacuum, so conduction needs matter it does not have and convection needs a fluid it does not have — only radiation travels without a material medium.",
        },
      ],
    },
    {
      number: "9.2",
      title: "Heat Flow in Natural Phenomena",
      conceptQuestion: "How Does Heat Flow in Nature?",
      intro:
        "Heat from the Sun reaches the Earth by radiation, the one method that needs no medium at all. That heat does not warm land and sea equally, and because **land heats up and cools down faster than the sea**, sea breezes and land breezes form. They are **examples of convection happening in nature**.",
      breezeDiagram: {
        title: "🌬️ Sea breeze and land breeze",
        instruction: "Tap each breeze to see the direction the air moves.",
        landLabel: "Land",
        seaLabel: "Sea",
        risesLabel: "Warm air rises",
        breezes: [
          {
            id: "sea",
            label: "☀️ Sea breeze",
            warmerSide: "land",
            image: {
              src: SCIENCE_F2_CH9_IMAGES.seaBreeze,
              alt: "A coastline in the middle of a bright, sunny day. The sea is on the left, a sandy beach and green land with trees on the right, under a high sun.",
              caption:
                "Daytime — the Sun heats the land faster than the sea, so the air above the land is the warmer air.",
            },
            timeOfDay: "Daytime",
            note: "During the day, the Sun heats the land faster than the sea. Warm air over the land expands, becomes less dense and rises. Cooler, denser air moves in from the sea surface to replace it — this is the sea breeze.",
          },
          {
            id: "land",
            label: "🌙 Land breeze",
            warmerSide: "sea",
            image: {
              src: SCIENCE_F2_CH9_IMAGES.landBreeze,
              alt: "The same coastline at night under a full moon. The sea is on the left, the beach and land on the right, both lit only by moonlight.",
              caption:
                "Night — the land cools faster than the sea, so the air above the sea is now the warmer air.",
            },
            timeOfDay: "Night",
            note: "At night, the land cools down faster than the sea. The warmer air over the sea surface becomes less dense and rises. Cooler, denser air from the land moves out to the sea — this is the land breeze.",
          },
        ],
        caption:
          "A breeze is named after where it comes from: a sea breeze comes from the sea, a land breeze from the land.",
        hint: "Pick a breeze to see how the air moves.",
      },
      ch9SpotlightFigure: {
        title: "☀️ Warming of the Earth by the Sun",
        figure: "sun-earth",
        src: SCIENCE_F2_CH9_IMAGES.sunEarthRadiation,
        alt: "The Sun at the left of the frame sending four wavy rays across the darkness of space to the Earth at the right, whose facing side is lit.",
        instruction: "Tap each part to follow the heat from the Sun to the Earth.",
        prompt: "Choose a part of the journey to see what it contributes.",
        caption:
          "Heat from the Sun reaches the Earth by radiation — the one method that needs no medium.",
        legendLabel: "How the Sun's heat reaches the Earth",
        concepts: [
          {
            id: "sun",
            icon: "☀️",
            label: "Sun",
            spotlightCaption: "The source",
            note: "The Sun is the source of the energy. Because it is extremely hot, it emits heat and light as radiation in every direction.",
          },
          {
            id: "vacuum",
            icon: "🌌",
            label: "Vacuum",
            spotlightCaption: "No medium needed",
            note: "Between the Sun and the Earth there is a vacuum — almost no matter at all. Radiation can still cross it because radiation does not require a material medium, which is why conduction and convection cannot carry the Sun's heat to us.",
          },
          {
            id: "earth",
            icon: "🌍",
            label: "Earth",
            spotlightCaption: "Absorbs the radiation",
            note: "The side of the Earth facing the Sun absorbs the incoming solar radiation, and its surface and atmosphere warm up as a result.",
          },
        ],
      },
      checks: [
        {
          question: "Why does a sea breeze blow from the sea toward the land during the day?",
          hint: "The land heats up faster, so warm air over the land rises and cooler, denser air from the sea moves in to replace it.",
        },
        {
          question: "Why can only radiation carry the Sun's heat to the Earth?",
          hint: "Space is a vacuum. Conduction needs matter and convection needs a fluid, but radiation does not require a material medium at all.",
        },
      ],
    },
    {
      number: "9.2",
      title: "Heat Conductors and Heat Insulators",
      conceptQuestion: "What are Heat Conductors and Heat Insulators?",
      intro:
        "A material that **lets heat flow through it easily** is known as a heat conductor. A material that **prevents or slows down the flow of heat** is known as a heat insulator.",
      ch9SpotlightFigure: {
        title: "🍳 Conductors and insulators around the house",
        figure: "conductor-insulator",
        src: SCIENCE_F2_CH9_IMAGES.conductorsInsulators,
        alt: "Four everyday objects. A metal frying pan on a lit gas hob. An electric iron pressing a shirt, its metal sole plate against the fabric. A close-up of a hand holding the wooden handle of a hot pan. An open polystyrene cooler box with cold drinks and ice inside.",
        instruction:
          "Tap each object to find out whether it works as a conductor or as an insulator.",
        prompt: "Choose an object to see which job its material is doing.",
        caption:
          "Every one of these objects is chosen for how well its material carries heat — or how badly.",
        legendLabel: "Conductors and insulators in everyday objects",
        concepts: [
          {
            id: "pan",
            icon: "🍳",
            label: "Metal pan",
            spotlightCaption: "Conductor",
            note: "The body of the pan is metal because metal is a good heat conductor. Heat from the flame passes quickly through it into the food.",
          },
          {
            id: "iron",
            icon: "👔",
            label: "Iron sole plate",
            spotlightCaption: "Conductor",
            note: "The sole plate of an iron is metal so that heat flows through it easily and reaches the fabric quickly.",
          },
          {
            id: "handle",
            icon: "🪵",
            label: "Wooden handle",
            spotlightCaption: "Insulator",
            note: "The handle is wood because wood is a poor heat conductor — a heat insulator. It slows the flow of heat to the hand, so the pan can be lifted safely.",
          },
          {
            id: "cooler",
            icon: "🧊",
            label: "Polystyrene cooler",
            spotlightCaption: "Insulator",
            note: "The walls of a cooler box are polystyrene, a heat insulator. It slows the flow of heat from the warm air outside into the cold contents, so the drinks stay cold for longer. It slows that flow down — it does not stop it, which is why the ice eventually melts.",
          },
        ],
      },
      cards: [
        {
          title: "🔥 Heat conductor",
          body: "A material that allows heat to flow through it easily. Metals such as **copper, aluminium and iron** are good heat conductors.",
          detail: "Examples: the metal base of a pan, the metal sole plate of an iron.",
        },
        {
          title: "🧊 Heat insulator",
          body: "A material that prevents or slows down the flow of heat. **Wood, cotton, felt, fibreglass and polystyrene** are good heat insulators.",
          detail:
            "Examples: oven gloves, the walls of an ice box, wooden handles on kitchen utensils.",
        },
      ],
      accordions: [
        {
          title: "🧣 Why a thick blanket keeps you warm",
          body: "A thick blanket is made of a loose, fluffy material that traps a great deal of air inside it. Air is a poor heat conductor, so the trapped air slows the flow of heat from the body to the cooler surroundings. That is why the blanket keeps you warm — it does not produce heat itself.",
          detail:
            "Two thin blankets can be warmer than one thick one, because a layer of air is trapped between them as well.",
        },
        {
          title: "🥘 Why food is wrapped in aluminium foil",
          body: "Aluminium is a good heat conductor, but a shiny surface is a poor absorber and a poor emitter of radiation. Wrapping hot food in foil reflects the heat radiated by the food back toward it, so the food stays hot for longer. The same foil around cold food reflects heat radiated from the surroundings away, so the food stays cold for longer.",
          detail:
            "This is a surface effect, not insulation: the foil slows heat loss, it does not stop it.",
        },
      ],
      miniExperiment: {
        title: "🧪 Which wrapping keeps the water hot longest?",
        aim: "To compare how well different materials insulate heat.",
        instruction: "Four identical flasks of hot water, four different wrappings.",
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
        operationalDefinitionLabel: "Operational definition",
        parts: [
          {
            id: "wrapping",
            icon: "🧣",
            label: "Type of insulating material",
            question:
              "Does the type of insulating material affect the final temperature of hot water after the same time?",
            hypothesis:
              "A flask wrapped in a poorer heat conductor has a higher final temperature after 10 minutes than a flask wrapped in a better heat conductor or left uncovered.",
            manipulated: "Type of insulating material",
            responding: "Final temperature of the water after 10 minutes",
            controlled:
              "Volume of hot water, initial temperature of the water, the flasks themselves, the thickness of each wrapping and the surroundings",
            materials: "Hot water, cotton wool, felt cloth and aluminium foil",
            apparatus:
              "Four identical conical flasks, four thermometers, a measuring cylinder and a stopwatch",
            method: [
              "Label four identical flasks K, L, M and N and pour the same volume of hot water into each.",
              "Leave flask K uncovered. Wrap flask L in cotton wool, flask M in felt cloth and flask N in aluminium foil, using the same thickness for each.",
              "Record the initial temperature in every flask — they must be the same.",
              "Leave all four flasks side by side in the same place for 10 minutes, then record the final temperature in each flask.",
              "Compare the final temperature of the water in each flask. A smaller drop in temperature indicates a better insulator.",
            ],
            observation:
              "After 10 minutes, the uncovered flask K has the lowest final temperature. The flasks wrapped in cotton wool and felt cloth have the highest final temperatures. The flask wrapped in aluminium foil has a lower final temperature than those two.",
            conclusion:
              "The type of insulating material affects the final temperature of the water. Cotton wool and felt cloth trap air and conduct heat poorly, so they are the better heat insulators, giving the highest final temperatures. Aluminium is a heat conductor, so flask N has a lower final temperature. Every flask still cools to some extent — an insulator slows the flow of heat, it does not stop it. The hypothesis is accepted.",
            operationalDefinition:
              "How well a material insulates is shown by how high the final temperature of the water remains after the same period of time (10 minutes) — a smaller drop in temperature indicates better insulation.",
          },
        ],
      },
      matcher: {
        title: "🔌 Match each material to what it does",
        instruction: "Pick the type of material, then pick the everyday item that uses it.",
        pairs: [
          { id: "pan", label: "🔥 Heat conductor — cooks food quickly", match: "Metal pan base" },
          {
            id: "iron",
            label: "🔥 Heat conductor — irons clothes quickly",
            match: "Metal sole plate of an iron",
          },
          { id: "gloves", label: "🧊 Heat insulator — protects hands", match: "Oven gloves" },
          {
            id: "icebox",
            label: "🧊 Heat insulator — keeps things cold",
            match: "Ice box walls (fibreglass/polystyrene)",
          },
        ],
      },
      checks: [
        {
          question: "Why are pot handles often made of wood or plastic?",
          hint: "Wood and plastic are heat insulators — they stop heat flowing through to your hands while cooking.",
        },
        {
          question:
            "A study compares cotton, felt and aluminium foil as wrappings for flasks of hot water. Which makes the best insulator?",
          hint: "Cotton and felt — both slow the flow of heat, so the water stays hot longer. Aluminium foil is a heat conductor, so heat is lost more quickly.",
        },
      ],
    },
    {
      number: "9.2",
      title: "Thermal Equilibrium",
      conceptQuestion: "What is Thermal Equilibrium?",
      intro:
        "When two objects at different temperatures are in thermal contact, heat flows from the hotter object to the colder object.",
      heatFlowDirection: {
        title: "⚖️ Reaching thermal equilibrium",
        instruction: "Tap each stage to see what happens to the two temperatures.",
        heatLabel: "heat",
        noNetFlowLabel: "no net heat transfer",
        caption: "Thermal equilibrium is reached once both temperatures are the same.",
        stages: [
          {
            id: "flow",
            label: "Heat flowing",
            note: "The two objects are at different temperatures, so heat flows from the hotter one to the colder one. The hotter object cools and the colder object warms.",
            leftLabel: "HOT",
            rightLabel: "COOL",
            leftTemperature: "80 °C",
            rightTemperature: "20 °C",
          },
          {
            id: "equilibrium",
            label: "Thermal equilibrium",
            note: "Both objects now have the same temperature. There is no net transfer of heat between them.",
            leftLabel: "SAME",
            rightLabel: "SAME",
            leftTemperature: "50 °C",
            rightTemperature: "50 °C",
          },
        ],
      },
      remember:
        "Thermal equilibrium is reached when two objects that were at different temperatures reach the same temperature, and there is no net transfer of heat between them.",
      checks: [
        {
          question:
            "A cold spoon is left in a mug of hot tea. Describe what happens to both temperatures over time.",
          hint: "The tea cools and the spoon warms. Heat flows from the hotter tea to the colder spoon until both reach the same temperature — thermal equilibrium.",
        },
        {
          question: "What two conditions describe thermal equilibrium?",
          hint: "Both objects have the same temperature, and there is no net transfer of heat between them.",
        },
      ],
    },
    {
      number: "9.3",
      title: "Expansion and Contraction of Matter",
      conceptQuestion: "What are Expansion and Contraction?",
      intro:
        "When matter is heated, its particles gain energy, move or vibrate faster, and **the spacing between the particles increases** — so the matter expands. When cooled, the particles move more slowly, **the spacing decreases**, and the matter contracts. This happens in solids, liquids and gases.",
      expansionParticles: {
        title: "🌡️ Particles during heating and cooling",
        instruction: "Pick a state of matter, then tap heated or cooled.",
        heatedLabel: "Heated",
        cooledLabel: "Cooled",
        misconceptionNote:
          "Notice that the size of each particle never changes. What changes is the spacing between them — matter expands because its particles move further apart, not because the particles themselves get bigger.",
        states: [
          {
            id: "solid",
            label: "Solid",
            note: "Particles vibrate about fixed positions. Heating makes them vibrate faster and push a little further apart, so the solid expands.",
          },
          {
            id: "liquid",
            label: "Liquid",
            note: "Particles are already free to move past one another. Heating makes them move faster and further apart, so the liquid expands.",
          },
          {
            id: "gas",
            label: "Gas",
            note: "Particles move freely and are already far apart. Heating makes them move much faster, so a gas expands the most of the three states.",
          },
        ],
        caption: "Particle size stays the same; only the spacing between particles changes.",
        hint: "Pick a state of matter to see how its particles behave.",
      },
      checks: [
        {
          question: "A metal bottle cap is stuck tight. How does hot water help to open it?",
          hint: "Heat makes the metal cap expand slightly, loosening its grip so the cap turns more easily.",
        },
        {
          question: "A dented ping-pong ball is placed in hot water and returns to shape. Why?",
          hint: "Heat makes the air trapped inside the ball expand, pushing the dented surface back out.",
        },
      ],
    },
    {
      number: "9.3",
      title: "Uses of Expansion and Contraction",
      conceptQuestion: "How Is Expansion Used in Daily Life?",
      intro:
        "The principle of expansion and contraction is used — and must be allowed for — in many everyday situations.",
      contextImages: [
        {
          src: SCIENCE_F2_CH9_IMAGES.expansionUses,
          alt: "Three panels. A small gap left between two lengths of railway rail on their sleepers. The end of a steel bridge deck resting on a roller bearing above a concrete pier. A liquid-in-glass thermometer with a red column rising from its bulb.",
          caption:
            "Three everyday allowances for expansion and contraction: the gap in a railway track, the roller under a bridge, and the liquid column in a thermometer.",
          size: "panel",
          aspect: SCIENCE_F2_VISUAL_ASPECT.wide,
          priority: true,
          annotations: [],
        },
      ],

      bimetallicStrip: {
        title: "🔔 The bimetallic strip in a fire alarm",
        instruction: "Tap each state to see how the strip behaves.",
        fasterMetal: "Copper",
        slowerMetal: "Iron",
        contactLabel: "Contact screw",
        alarmLabel: "Alarm",
        circuitClosedLabel: "circuit complete",
        circuitOpenLabel: "circuit open",
        states: [
          {
            id: "room",
            label: "Room temperature",
            note: "At room temperature the strip is straight and does not touch the contact screw. The circuit is incomplete, so the alarm does not sound.",
          },
          {
            id: "heated",
            label: "Heated by fire",
            note: "When exposed to the heat of a fire, copper expands faster than iron. That difference makes the strip bend toward the contact screw, completing the circuit and sounding the alarm.",
          },
        ],
        caption: "The metal that expands faster sits on the outside of the bend.",
        hint: "Pick a state to see how the strip behaves.",
        image: {
          src: SCIENCE_F2_CH9_IMAGES.bimetallicAlarm,
          alt: "A fire-alarm circuit: a cell, a bimetallic strip bolted down at one end with a copper layer above an iron layer, a lit spirit burner under the strip, a contact screw and a bell.",
          caption:
            "The same apparatus in both states — only the strip, the contact and the bell change.",
        },
      },
      comparison: {
        title: "How Can Expansion Solve Everyday Problems?",
        columns: [
          {
            title: "🏓 Dented table-tennis ball",
            body: "Placing the dented ball in hot water heats the air inside. The air expands and pushes the dent outward.",
          },
          {
            title: "🔒 Tight bottle lid",
            body: "Placing the metal lid in hot water causes it to expand slightly, making it easier to open.",
          },
        ],
      },
      accordions: [
        {
          title: "🌡️ Mercury thermometers",
          body: "Mercury **expands and contracts uniformly** as the temperature changes, and it **detects changes in temperature quickly**. The height of the mercury column in the tube is what is used to measure temperature.",
          detail: "Remember: a thermometer measures temperature, not heat.",
        },
        {
          title: "🚂 Gaps in railway tracks",
          body: "Small gaps are left between sections of rail so the track can **expand on a hot day without buckling or lifting**.",
        },
        {
          title: "🌉 Rollers on steel bridges",
          body: "One end of the bridge rests on rollers so the whole structure can **expand and contract safely** as the temperature changes.",
        },
        {
          title: "⚡ Overhead electric cables",
          body: "Overhead electric cables are hung slightly loose. The cables expand when hot and contract when cold. Slack reduces the risk of excessive tension or snapping during contraction.",
        },
      ],
      checks: [
        {
          question:
            "In a fire-alarm bimetallic strip, which metal expands faster, and which way does the strip bend?",
          hint: "Copper expands faster than iron, so the strip bends toward the contact screw and completes the circuit.",
        },
        {
          question: "What does a thermometer measure?",
          hint: "Temperature. A thermometer measures the degree of hotness or coldness, not the quantity of heat.",
        },
      ],
    },
    {
      number: "9.4",
      title: "Heat Absorption and Emission",
      conceptQuestion: "How Do Surfaces Affect Heat Absorption and Emission?",
      intro:
        "The ability of an object to absorb and emit heat depends on the type and colour of its surface. When an object absorbs heat, its temperature rises; when an object emits heat, its temperature falls. **Dark, dull surfaces are good absorbers and good emitters of heat**. **White, shiny surfaces are poor absorbers and poor emitters of heat** — they reflect more radiation instead.",
      surfaceComparison: {
        title: "⬛⬜ Dark surfaces compared with shiny surfaces",
        instruction: "Tap to switch between absorbing heat and emitting heat.",
        darkLabel: "Dark and dull",
        shinyLabel: "Light and shiny",
        betterLabel: "Better",
        poorerLabel: "Poorer",
        modes: [
          {
            id: "absorb",
            label: "Absorbing heat",
            note: "When two identical cans of different colours are placed the same distance from a heat source, the black can shows a greater rise in temperature — dark, dull surfaces absorb heat better.",
          },
          {
            id: "emit",
            label: "Emitting heat",
            note: "When both cans are filled with the same volume of hot water, the black can shows a greater fall in temperature — dark, dull surfaces emit heat better.",
          },
        ],
        caption: "The same surface can be both a good absorber and a good emitter.",
        hint: "Pick absorbing or emitting to compare the two surfaces.",
        image: {
          src: SCIENCE_F2_CH9_IMAGES.absorptionEmission,
          alt: "Two identical cans of water standing the same distance from one heat source between them, each with a thermometer through its lid. The can on the left is matte black; the can on the right is shiny silver.",
          caption:
            "Identical cans, identical distance, one heat source — only the surface is different.",
        },
      },
      cards: [
        {
          title: "Everyday uses",
          body: "Fuel tanker lorries are painted with a **shiny silver or white surface**. A shiny surface reflects more of the Sun's radiation and absorbs less heat, so the fuel inside heats up less and evaporation is reduced.",
          detail:
            "Conversely, solar water heaters use dark-coloured panels so they absorb as much of the Sun's heat as possible.",
        },
      ],
      checks: [
        {
          question: "Why do light-coloured clothes feel more comfortable in hot weather?",
          hint: "Light surfaces absorb less heat from the Sun than dark surfaces, so the body does not get as hot.",
        },
        {
          question: "What feature of a thermos flask's inner wall helps keep water hot?",
          hint: "A shiny surface — it is a poor emitter of heat, so heat is lost more slowly from the water inside.",
        },
      ],
    },
    {
      number: "9.4",
      title: "The Green Building Concept",
      conceptQuestion: "What is a Green Building?",
      intro:
        "The Green Building Concept is an idea developed to **reduce the impact of rapid development on the environment and on human health**. The heat concepts in this chapter are used directly: a green home is designed so that the energy needed to cool or heat it is reduced.",
      contextImages: [
        {
          src: SCIENCE_F2_CH9_IMAGES.greenBuilding,
          alt: "A raised tropical house with a wide overhanging roof, solar panels on one roof slope, insulation packed under the roof, louvred and awning windows on every wall, a ceiling fan inside, and shade trees and plants around it.",
          caption:
            "Roof insulation, shading, natural ventilation and solar panels — the heat ideas of this chapter, built into one home.",
          size: "scene",
          aspect: SCIENCE_F2_VISUAL_ASPECT.wide,
          priority: true,
          annotationMode: "numbers",
          annotations: [
            {
              id: "reflective-roof",
              icon: "☀️",
              label: "Light-coloured roof",
              x: 45.5,
              y: 25.5,
              note: "A light, shiny roof is a poor absorber of heat, so less of the Sun's heat is absorbed into the building.",
            },
            {
              id: "insulation",
              icon: "🧊",
              label: "Roof insulation",
              x: 31.4,
              y: 50.2,
              note: "Insulation packed under the roof is a heat insulator. It slows the flow of heat from the hot roof into the rooms, so less energy is needed to cool them.",
            },
            {
              id: "overhang",
              icon: "🌤️",
              label: "Roof overhang",
              x: 17.9,
              y: 59.5,
              note: "The wide overhang keeps direct sunlight off the walls and windows below it, so less heat is absorbed through them.",
            },
            {
              id: "ventilation",
              icon: "🌬️",
              label: "Louvred windows",
              x: 44.3,
              y: 65.9,
              note: "Louvred windows on opposite walls let convection currents carry warm air out and cooler air in, without a fan or air conditioning.",
            },
            {
              id: "trees",
              icon: "🌳",
              label: "Shade trees",
              x: 86.7,
              y: 21.3,
              note: "Trees planted beside the house shade the roof and walls, so less of the Sun's heat reaches them in the first place.",
            },
          ],
        },
      ],

      tabs: [
        {
          title: "⚡ Energy efficiency",
          body: "A green building has **high energy efficiency**, for example through the use of solar energy or other renewable energy. Heat insulation in the walls and roof reduces heat flowing in, so less energy is needed for air conditioning.",
        },
        {
          title: "💧 Water efficiency",
          body: "**Good water-flow systems**, including rainwater harvesting and water recycling, reduce the use of clean water.",
        },
        {
          title: "🏗️ Site and building materials",
          body: "A sustainable construction site and the use of **recycled building materials** reduce the impact on the environment. Light-coloured roofs and walls reflect more of the Sun's heat.",
        },
        {
          title: "💡 Air circulation and innovation",
          body: "**Good natural air-circulation and lighting systems** let convection currents carry warm air out without fans or air conditioning. Design innovations like these make a home comfortable using far less energy.",
        },
      ],
      checksTitle: "Green Building — quick check",
      checks: [
        {
          question: "How does heat insulation in a roof reduce a home's energy use?",
          hint: "Insulation slows the flow of heat from the hot roof into the house, so less energy is needed to cool the space inside.",
        },
        {
          question: "Why do light-coloured roofs and walls help keep a house cool?",
          hint: "Light, shiny surfaces are poor absorbers of heat, so less of the Sun's heat is absorbed into the building.",
        },
      ],
    },
  ],
  reflectionItems: [
    "I can distinguish heat from temperature, including their units.",
    "I can explain conduction using particle vibration and collision.",
    "I can explain convection using changes in the density of a fluid.",
    "I can explain why radiation does not need a medium.",
    "I can explain how a sea breeze and a land breeze form.",
    "I can define a heat conductor and a heat insulator and give examples.",
    "I can explain the expansion and contraction of solids, liquids and gases.",
    "I can explain everyday uses of expansion and contraction.",
    "I can explain how surface type affects heat absorption and emission.",
    "I can explain how the Green Building Concept applies heat concepts.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: Heat and temperature mean exactly the same thing.",
      answer: false,
      explanation:
        "Heat is a form of energy measured in joules; temperature is the degree of hotness or coldness measured in °C or K. They are related, but not the same.",
    },
    {
      type: "multiple-choice",
      question: "Which method of heat transfer does not need any medium?",
      options: ["Conduction", "Convection", "Radiation", "All of them"],
      answerIndex: 2,
      explanation:
        "Radiation is how heat from the Sun crosses empty space to reach the Earth — no medium is required.",
    },
    {
      type: "multiple-choice",
      question: "What does a thermometer measure?",
      options: [
        "The quantity of heat in an object",
        "The temperature of an object",
        "The total kinetic energy of an object",
        "The rate of heat flow",
      ],
      answerIndex: 1,
      explanation:
        "A thermometer measures temperature — the degree of hotness or coldness — not the quantity of heat an object contains.",
    },
  ],
};
