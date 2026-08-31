import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch9-haba.png";

export const scienceF2C9InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 9,
  blogHighlight: {
    title: "Science Blog — The Hidden Polar Bear",
    body: "Infrared cameras detect the heat radiated by animals — but a polar bear traps heat so effectively beneath its fur and fat that it is almost invisible to thermal imaging, even in a freezing habitat.",
    imagePath: chapterImage,
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
      intro:
        "Heat is a form of energy that flows from a region of higher temperature to a region of lower temperature. Temperature is the measure of the degree of hotness or coldness of an object. The two are related, but they are not the same thing — two beakers of water at the same temperature can hold very different quantities of heat, depending on how much water there is.",
      cards: [
        {
          title: "🔥 Heat",
          body: "A form of energy. The quantity of heat depends on the type of substance, the quantity of substance and the temperature.",
          detail: "Measured in joules (J).",
        },
        {
          title: "🌡️ Temperature",
          body: "The degree of hotness or coldness of an object. Temperature depends on the degree of movement of the particles within the substance.",
          detail: "Measured in degrees Celsius (°C) or kelvin (K).",
        },
        {
          title: "⚖️ Thermal equilibrium",
          body: "When two objects are in contact, heat energy is transferred from the object at the higher temperature to the object at the lower temperature. When the heat transfer between them becomes zero, the two objects are in thermal equilibrium and share the same temperature.",
        },
      ],
      checks: [
        { question: "Is touch a reliable way to check whether someone has a fever?", hint: "Not really — touch is subjective and affected by the temperature of your own hand. A thermometer gives an objective temperature reading." },
        { question: "Water in two beakers (100 ml and 200 ml) is boiled. Is the temperature the same? Is the quantity of heat the same?", hint: "The temperature is the same (100 °C), but the 200 ml beaker holds more heat because there is a greater quantity of substance." },
      ],
    },
    {
      number: "9.2",
      title: "Conduction",
      intro:
        "Conduction is the flow of heat from a hot region to a cold region through a solid medium. Particles that receive heat energy vibrate faster and collide with their neighbouring particles more often, transferring that energy throughout the medium.",
      conductionDiagram: {
        title: "🔗 How heat travels through a solid",
        instruction: "Tap each stage to watch the energy travel along the rod.",
        particleCount: 9,
        hotLabel: "Hot end",
        coldLabel: "Cold end",
        mechanismNote:
          "Notice that the particles stay in their positions. What travels along the rod is energy, not particles — each particle simply vibrates in place and passes energy on to its neighbour.",
        stages: [
          { id: "start", label: "Heating begins", note: "Particles at the hot end receive heat energy and begin to vibrate faster." },
          { id: "middle", label: "Energy travels", note: "The faster-vibrating particles collide with their neighbours more often, transferring energy to the middle of the rod." },
          { id: "full", label: "Whole rod is hot", note: "Continuous particle-to-particle collisions carry the heat energy all the way to the cold end." },
        ],
        caption: "The particles stay in place — only the energy travels.",
        hint: "Pick a stage to see what happens.",
      },
      checks: [
        { question: "Why does a metal spoon become hot when left in a bowl of hot soup?", hint: "Particles at the submerged end vibrate faster and collide with neighbouring particles, transferring heat energy along the spoon by conduction." },
        { question: "Do metal particles travel from the hot end to the cold end during conduction?", hint: "No. The particles stay in their positions and simply vibrate; only energy is transferred, through collisions." },
      ],
    },
    {
      number: "9.2",
      title: "Convection and Radiation",
      intro:
        "Heat can also flow without passing through a solid. In fluids, convection carries heat through the movement of the fluid itself. Radiation needs no medium at all — it is the only way heat can travel through empty space.",
      convectionRadiation: {
        title: "🌀 Two ways heat flows without a solid",
        instruction: "Tap each method to see how the heat moves.",
        warmLabel: "Warm",
        coolLabel: "Cool",
        modes: [
          {
            id: "convection",
            label: "Convection",
            note: "Heat is carried by the movement of a fluid — a liquid or a gas — from a hot region to a cold region.",
            detail:
              "The part of the fluid that receives heat expands, becomes less dense, and rises. The cooler, denser part of the fluid sinks to take its place. This continuous rising and sinking circulation is known as a convection current.",
          },
          {
            id: "radiation",
            label: "Radiation",
            note: "The process of heat transfer without needing any medium.",
            detail:
              "Heat can travel through empty space, or a vacuum. That is how heat energy from the Sun reaches the Earth across empty space. The type of surface, the temperature and the surface area of an object all affect the rate of heat transfer by radiation.",
          },
        ],
        caption: "Convection needs a fluid; radiation needs nothing at all.",
        hint: "Pick a method to see its mechanism.",
      },
      checks: [
        { question: "Why is the heating coil in an electric kettle placed at the bottom?", hint: "Water heated at the bottom expands, becomes less dense and rises; cooler, denser water sinks to replace it, creating a convection current that heats the whole kettle." },
        { question: "How does heat energy from the Sun reach the Earth?", hint: "By radiation. Space is a vacuum, so conduction and convection cannot occur — only radiation can travel through empty space." },
      ],
    },
    {
      number: "9.2",
      title: "Sea Breeze and Land Breeze",
      intro:
        "Sea breezes and land breezes are examples of convection happening in nature. The key is that land heats up and cools down faster than the sea.",
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
            timeOfDay: "Daytime",
            note: "During the day, the Sun heats the land faster than the sea. Warm air over the land expands, becomes less dense and rises. Cooler, denser air moves in from the sea surface to replace it — this is the sea breeze.",
          },
          {
            id: "land",
            label: "🌙 Land breeze",
            warmerSide: "sea",
            timeOfDay: "Night",
            note: "At night, the land cools down faster than the sea. The warmer air over the sea surface becomes less dense and rises. Cooler, denser air from the land moves out to the sea — this is the land breeze.",
          },
        ],
        caption: "A breeze is named after where it comes from: a sea breeze comes from the sea, a land breeze from the land.",
        hint: "Pick a breeze to see how the air moves.",
      },
      checks: [
        { question: "Why does a sea breeze blow from the sea toward the land during the day?", hint: "The land heats up faster, so warm air over the land rises and cooler, denser air from the sea moves in to replace it." },
        { question: "At night, which way does a land breeze blow, and why?", hint: "From the land toward the sea. The land cools faster, so the warmer air over the sea rises and cooler air from the land moves in to replace it." },
      ],
    },
    {
      number: "9.2",
      title: "Heat Conductors and Heat Insulators",
      intro:
        "A material that lets heat flow through it easily is known as a heat conductor. A material that prevents or slows down the flow of heat is known as a heat insulator.",
      cards: [
        {
          title: "🔥 Heat conductor",
          body: "A material that allows heat to flow through it easily. Metals such as copper, aluminium and iron are good heat conductors.",
          detail: "Examples: the metal base of a pan, the metal sole plate of an iron.",
        },
        {
          title: "🧊 Heat insulator",
          body: "A material that prevents or slows down the flow of heat. Wood, cotton, felt, fibreglass and polystyrene are good heat insulators.",
          detail: "Examples: oven gloves, the walls of an ice box, wooden handles on kitchen utensils.",
        },
      ],
      matcher: {
        title: "🔌 Match each material to what it does",
        instruction: "Pick the type of material, then pick the everyday item that uses it.",
        pairs: [
          { id: "pan", label: "🔥 Heat conductor — cooks food quickly", match: "Metal pan base" },
          { id: "iron", label: "🔥 Heat conductor — irons clothes quickly", match: "Metal sole plate of an iron" },
          { id: "gloves", label: "🧊 Heat insulator — protects hands", match: "Oven gloves" },
          { id: "icebox", label: "🧊 Heat insulator — keeps things cold", match: "Ice box walls (fibreglass/polystyrene)" },
        ],
      },
      checks: [
        { question: "Why are pot handles often made of wood or plastic?", hint: "Wood and plastic are heat insulators — they stop heat flowing through to your hands while cooking." },
        { question: "A study compares cotton, felt and aluminium foil as wrappings for flasks of hot water. Which makes the best insulator?", hint: "Cotton and felt — both slow the flow of heat, so the water stays hot longer. Aluminium foil is a heat conductor, so heat is lost more quickly." },
      ],
    },
    {
      number: "9.3",
      title: "Expansion and Contraction of Matter",
      intro:
        "When matter is heated, its particles gain energy, move or vibrate faster, and the spacing between the particles increases — so the matter expands. When cooled, the particles move more slowly, the spacing decreases, and the matter contracts. This happens in solids, liquids and gases.",
      expansionParticles: {
        title: "🌡️ Particles during heating and cooling",
        instruction: "Pick a state of matter, then tap heated or cooled.",
        heatedLabel: "Heated",
        cooledLabel: "Cooled",
        misconceptionNote:
          "Notice that the size of each particle never changes. What changes is the spacing between them — matter expands because its particles move further apart, not because the particles themselves get bigger.",
        states: [
          { id: "solid", label: "Solid", note: "Particles vibrate about fixed positions. Heating makes them vibrate faster and push a little further apart, so the solid expands." },
          { id: "liquid", label: "Liquid", note: "Particles are already free to move past one another. Heating makes them move faster and further apart, so the liquid expands." },
          { id: "gas", label: "Gas", note: "Particles move freely and are already far apart. Heating makes them move much faster, so a gas expands the most of the three states." },
        ],
        caption: "Particle size stays the same; only the spacing between particles changes.",
        hint: "Pick a state of matter to see how its particles behave.",
      },
      checks: [
        { question: "A metal bottle cap is stuck tight. How does hot water help to open it?", hint: "Heat makes the metal cap expand slightly, loosening its grip so the cap turns more easily." },
        { question: "A dented ping-pong ball is placed in hot water and returns to shape. Why?", hint: "Heat makes the air trapped inside the ball expand, pushing the dented surface back out." },
      ],
    },
    {
      number: "9.3",
      title: "Uses of Expansion and Contraction",
      intro:
        "The principle of expansion and contraction is used — and must be allowed for — in many everyday situations.",
      bimetallicStrip: {
        title: "🔔 The bimetallic strip in a fire alarm",
        instruction: "Tap each state to see how the strip behaves.",
        fasterMetal: "Copper",
        slowerMetal: "Iron",
        contactLabel: "Contact screw",
        alarmLabel: "Alarm",
        states: [
          { id: "room", label: "Room temperature", note: "At room temperature the strip is straight and does not touch the contact screw. The circuit is incomplete, so the alarm does not sound." },
          { id: "heated", label: "Heated by fire", note: "When exposed to the heat of a fire, copper expands faster than iron. That difference makes the strip bend toward the contact screw, completing the circuit and sounding the alarm." },
        ],
        caption: "The metal that expands faster sits on the outside of the bend.",
        hint: "Pick a state to see how the strip behaves.",
      },
      accordions: [
        {
          title: "🌡️ Mercury thermometers",
          body: "Mercury expands and contracts uniformly as the temperature changes, and it detects changes in temperature quickly. The height of the mercury column in the tube is what is used to measure temperature.",
          detail: "Remember: a thermometer measures temperature, not heat.",
        },
        { title: "🚂 Gaps in railway tracks", body: "Small gaps are left between sections of rail so the track can expand on a hot day without buckling or lifting." },
        { title: "🌉 Rollers on steel bridges", body: "One end of the bridge rests on rollers so the whole structure can expand and contract safely as the temperature changes." },
      ],
      checks: [
        { question: "In a fire-alarm bimetallic strip, which metal expands faster, and which way does the strip bend?", hint: "Copper expands faster than iron, so the strip bends toward the contact screw and completes the circuit." },
        { question: "What does a thermometer measure?", hint: "Temperature. A thermometer measures the degree of hotness or coldness, not the quantity of heat." },
      ],
    },
    {
      number: "9.4",
      title: "Heat Absorption and Emission",
      intro:
        "The ability of an object to absorb and emit heat depends on the type and colour of its surface. When an object absorbs heat, its temperature rises; when an object emits heat, its temperature falls. Dark, dull surfaces are better absorbers and better emitters of heat than light, shiny surfaces.",
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
      },
      cards: [
        {
          title: "Everyday uses",
          body: "Fuel tanker lorries are painted in light colours such as white or silver. Light colours do not absorb much heat, so evaporation of the fuel is reduced.",
          detail: "Conversely, solar water heaters use dark-coloured panels so they absorb as much of the Sun's heat as possible.",
        },
      ],
      checks: [
        { question: "Why do light-coloured clothes feel more comfortable in hot weather?", hint: "Light surfaces absorb less heat from the Sun than dark surfaces, so the body does not get as hot." },
        { question: "What feature of a thermos flask's inner wall helps keep water hot?", hint: "A shiny surface — it is a poor emitter of heat, so heat is lost more slowly from the water inside." },
      ],
    },
    {
      number: "9.4",
      title: "The Green Building Concept",
      intro:
        "The Green Building Concept is an idea developed to reduce the impact of rapid development on the environment and on human health. The heat concepts in this chapter are used directly: a green home is designed so that the energy needed to cool or heat it is reduced.",
      tabs: [
        {
          title: "⚡ Energy efficiency",
          body: "A green building has high energy efficiency, for example through the use of solar energy or other renewable energy. Heat insulation in the walls and roof reduces heat flowing in, so less energy is needed for air conditioning.",
        },
        {
          title: "💧 Water efficiency",
          body: "Good water-flow systems, including rainwater harvesting and water recycling, reduce the use of clean water.",
        },
        {
          title: "🏗️ Site and building materials",
          body: "A sustainable construction site and the use of recycled building materials reduce the impact on the environment. Light-coloured roofs and walls reflect more of the Sun's heat.",
        },
        {
          title: "💡 Air circulation and innovation",
          body: "Good natural air-circulation and lighting systems let convection currents carry warm air out without fans or air conditioning. Design innovations like these make a home comfortable using far less energy.",
        },
      ],
      checks: [
        { question: "How does heat insulation in a roof reduce a home's energy use?", hint: "Insulation slows the flow of heat from the hot roof into the house, so less energy is needed to cool the space inside." },
        { question: "Why do light-coloured roofs and walls help keep a house cool?", hint: "Light, shiny surfaces are poor absorbers of heat, so less of the Sun's heat is absorbed into the building." },
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
      explanation: "Heat is a form of energy measured in joules; temperature is the degree of hotness or coldness measured in °C or K. They are related, but not the same.",
    },
    {
      type: "multiple-choice",
      question: "Which method of heat transfer does not need any medium?",
      options: ["Conduction", "Convection", "Radiation", "All of them"],
      answerIndex: 2,
      explanation: "Radiation is how heat from the Sun crosses empty space to reach the Earth — no medium is required.",
    },
    {
      type: "multiple-choice",
      question: "What does a thermometer measure?",
      options: ["The quantity of heat in an object", "The temperature of an object", "The total kinetic energy of an object", "The rate of heat flow"],
      answerIndex: 1,
      explanation: "A thermometer measures temperature — the degree of hotness or coldness — not the quantity of heat an object contains.",
    },
  ],
};
