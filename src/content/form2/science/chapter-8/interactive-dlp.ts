import type { ScienceF2InteractiveContent } from "../interactive-types";
import chapterImage from "@/assets/science/form2/ch8-daya-gerakan.png";

export const scienceF2C8InteractiveDLP: ScienceF2InteractiveContent = {
  chapter: 8,
  blogHighlight: {
    title: "Science Blog — Force Is All Around Us",
    body: "Walking, chewing, kicking a ball, pulling a rope in tug-of-war — all of these are forces at work. **You cannot see a force**, but you can always **feel what it does**.",
    imagePath: chapterImage,
  },
  keywords: [
    "Force",
    "Gravitational force",
    "Frictional force",
    "Normal force",
    "Elastic force",
    "Buoyant force",
    "Weight",
    "Point of application",
    "Spring balance",
    "Action force",
    "Reaction force",
    "Lever",
    "Fulcrum",
    "Moment of force",
    "Pressure",
    "Atmospheric pressure",
    "Newton (N)",
  ],
  sections: [
    {
      number: "8.1",
      title: "Types of Forces",
      intro:
        "A force is a **push or a pull** acting on an object. A force cannot be seen, but its effects can always be observed. Almost every daily activity involves force — opening a can of food, pressing a switch, opening a door. Tap each type of force below to get to know it.",
      remember:
        "A force is a push or a pull acting on an object — even though it cannot be seen, its effects can always be observed.",
      flipCards: [
        { id: "gravitational", icon: "🌍", label: "Gravitational force", fact: "A force that pulls objects towards the centre of the Earth.", example: "The object falls towards Earth." },
        { id: "weight", icon: "⚖️", label: "Weight", fact: "The gravitational force acting on an object.", example: "The rock experiences a downward gravitational force." },
        { id: "normal", icon: "🧱", label: "Normal force", fact: "A force exerted by a surface on an object in contact with it.", example: "The table pushes upward on the book." },
        { id: "frictional", icon: "🌀", label: "Frictional force", fact: "A force that opposes motion between surfaces in contact.", example: "Friction acts opposite to the motion of the crate." },
        { id: "elastic", icon: "🔗", label: "Elastic force", fact: "A force produced when an elastic material is stretched or compressed.", example: "The stretched elastic tends to return to its original shape." },
        { id: "buoyant", icon: "🛟", label: "Buoyant force", fact: "An upward thrust exerted by a fluid on an object.", example: "Water exerts an upward force on the floating duck." },
      ],
      checks: [
        { question: "A bungee jumper jumps off a platform. Which force pulls them down?", hint: "Gravitational force — the same force that pulls any thrown object back to Earth." },
        { question: "A bicycle moving over a rough surface slows down quickly. Which force is acting?", hint: "Frictional force, which acts opposite to the direction the bicycle is moving." },
      ],
    },
    {
      number: "8.1",
      title: "Characteristics of Force",
      intro:
        "Every force has three characteristics: a **magnitude** (how strong it is), a **direction**, and a **point of application (exactly where the force acts)**. That is why a force is drawn as an arrow — the length of the arrow shows the magnitude, the arrowhead shows the direction, and the tail sits on the point of application.",
      remember:
        "A force has three characteristics: magnitude, direction and point of application. (Enrichment: because a force has both magnitude and direction, it is also known as a vector quantity.)",
      forceDiagram: {
        title: "➡️ Drawing a force as an arrow",
        instruction: "Tap each example to see where the force is applied.",
        magnitudeLabel: "Arrow length = magnitude",
        directionLabel: "Arrowhead = direction",
        applicationLabel: "Arrow tail = point of application",
        examples: [
          {
            id: "box",
            label: "Pushing a box",
            magnitude: "10 N",
            applicationPoint: "at the part of the hand touching the box",
            note: "A pushing force of magnitude 10 N acts on the box, in the direction shown by the arrow.",
          },
          {
            id: "nail",
            label: "Pulling a nail with a hammer",
            magnitude: "15 N",
            applicationPoint: "at the claw of the hammer gripping the nail",
            note: "A force of magnitude 15 N acts upward to remove the nail from the table surface.",
          },
        ],
        caption: "A longer arrow means a larger force.",
        hint: "Pick an example to see its magnitude, direction and point of application.",
      },
      checks: [
        { question: "A man pushes a car. Where is the point of application of the pushing force?", hint: "At the part of his hands in contact with the car — that is where the force is applied." },
        { question: "A book is pulled to the right. Name the three characteristics of this force that the arrow shows.", hint: "Magnitude (arrow length), direction (arrowhead) and point of application (arrow tail)." },
      ],
    },
    {
      number: "8.1",
      title: "Measuring Force",
      intro:
        "Force is measured using a spring balance. The S.I. unit of force is the newton (N).",
      cards: [
        {
          title: "Measuring force",
          body: "Force is measured with a **spring balance**, which works on the **principle of spring extension**. The strength of the force is read from the scale on the balance.",
          detail: "A spring balance is also used to measure the weight of a body and frictional force.",
        },
        {
          title: "Unit of force",
          body: "The S.I. unit of force is the **newton (N)**. On Earth, an object with a mass of 100 g has a weight of 1 N — so an object with a mass of 1 kg has a weight of 10 N.",
        },
        {
          title: "Mass and weight are not the same",
          body: "Mass is the amount of matter in an object — its S.I. unit is the kilogram (kg), and it is measured with a beam/electronic balance. Weight is the gravitational force acting on that object — its S.I. unit is the newton (N), and it is measured with a spring balance.",
        },
      ],
      checks: [
        { question: "A 2 kg object hangs from a spring balance on Earth. What weight does it read?", hint: "20 N, because every 1 kg has a weight of 10 N." },
        { question: "A student says a bag of rice 'weighs 5 kg'. What is actually being described, mass or weight — and what unit should weight use?", hint: "That value is the rice's mass (kg). Its weight would be measured in newtons (N), using a spring balance." },
      ],
    },
    {
      number: "8.1",
      title: "Action–Reaction Force Pair",
      intro:
        "For every action force there is a reaction force of **equal magnitude acting in the opposite direction**. The three situations below show these force pairs clearly.",
      actionReactionPairs: {
        situations: [
          {
            id: "book",
            label: "Book on table",
            note: "The book remains stationary because the downward weight and the upward normal force have the same magnitude and act in opposite directions.",
            forces: [
              { id: "normal", label: "Normal force" },
              { id: "weight", label: "Weight" },
            ],
          },
          {
            id: "floating",
            label: "Floating block",
            note: "The block remains floating at equilibrium because the buoyant force equals its weight and acts in the opposite direction.",
            forces: [
              { id: "buoyant", label: "Buoyant force" },
              { id: "weight", label: "Weight" },
            ],
          },
          {
            id: "trolleys",
            label: "Two trolleys",
            note: "The two trolleys exert forces of the same magnitude on each other in opposite directions.",
            forces: [
              { id: "action", label: "Action force" },
              { id: "reaction", label: "Reaction force" },
            ],
          },
        ],
      },
      accordions: [
        {
          title: "📖 A body resting on a table",
          body: "The weight of the book (action force) pulls downward. At the same time, the **normal force from the table (reaction force)** pushes upward with equal magnitude. The book stays at rest because the two magnitudes are equal.",
        },
        {
          title: "🪵 A body floating on water",
          body: "The weight of the block (action force) pulls downward. The **buoyant force (reaction force)** pushes upward with equal magnitude. The object floats because the two magnitudes are equal.",
        },
        {
          title: "🚃 Two trolleys released",
          body: "The first trolley exerts an elastic force on the second trolley — that is the **action force**. At the same time, the second trolley exerts a force of equal magnitude but in the opposite direction on the first trolley — that is the **reaction force**. Once released, both trolleys move in opposite directions through equal distances.",
        },
      ],
      checks: [
        { question: "A book stays at rest on a table. Name the action and reaction force pair.", hint: "The weight of the book (action) and the normal force from the table (reaction) — equal in magnitude, opposite in direction." },
        { question: "Two touching trolleys are released. Why do both move through the same distance?", hint: "Because each trolley exerts a force of equal magnitude on the other, but in the opposite direction." },
      ],
    },
    {
      number: "8.2",
      title: "Effects of Force",
      intro:
        "A force cannot be seen directly, but its effects can always be detected. There are **five main effects** of a force acting on an object.",
      flipCards: [
        { id: "moves", icon: "▶️", label: "Moves a stationary object", fact: "A force can cause a stationary object to start moving. Example: pushing a crate." },
        { id: "stops", icon: "⏹️", label: "Stops a moving object", fact: "A force acting opposite to motion can slow down and stop a moving object. Example: applying bicycle brakes." },
        { id: "speed", icon: "⚡", label: "Changes speed", fact: "A force can increase or decrease the speed of a moving object. Example: a driving force changes a car's speed." },
        { id: "direction", icon: "↩️", label: "Changes direction of motion", fact: "A force acting from another direction can change an object's direction of motion. Example: a tennis racket redirects a moving ball." },
        { id: "shape", icon: "🔄", label: "Changes shape and size", fact: "A force can change the shape and size of an object. Example: pressing plasticine." },
      ],
      checks: [
        { question: "A goalkeeper stops a ball kicked toward them. Which effect of force is shown?", hint: "The force stops a moving object." },
        { question: "A piece of plasticine is pressed flat. Which effect of force is this?", hint: "The force changes the shape of the object." },
      ],
    },
    {
      number: "8.2",
      title: "Buoyancy and Density",
      intro:
        "Buoyant force is the **upthrust** a liquid exerts on an object in it. Buoyant force can be determined with a spring balance, by comparing the weight of the object in air with its weight while submerged.",
      buoyancySchematic: {
        title: "🌊 Finding buoyant force with a spring balance",
        instruction: "Tap each state to see the forces acting.",
        realWeightLabel: "Actual weight",
        apparentWeightLabel: "Apparent weight",
        buoyantForceLabel: "Measuring buoyant force",
        formula: "Buoyant force = Actual weight − Apparent weight (F = W₁ − W₂). W₁ is the actual weight of the object in air; W₂ is its apparent weight while submerged in a liquid.",
        realWeight: "10 N",
        apparentWeight: "6 N",
        buoyantForce: "Buoyant force = 10 N − 6 N = 4 N",
        floatingNote: "Floating — a floating object is in equilibrium: the upward buoyant force is EQUAL to its downward weight. The object is less dense than the liquid.",
        sinkingNote: "Sinking — the buoyant force is not enough to support the weight of the object, so the buoyant force is LESS than the weight. The object is denser than the liquid.",
        caption: "The difference between the two spring-balance readings is the buoyant force.",
        hint: "Pick a state to see the forces acting.",
        workedExample: {
          title: "Worked example",
          given: "The actual weight of an object in air is 8 N. Its apparent weight in water is 5 N. Find the buoyant force.",
          working: "F = W₁ − W₂ → F = 8 N − 5 N",
          answer: "F = 3 N",
        },
      },
      buoyancy: {
        title: "🪵 Why do some materials float and others sink?",
        instruction: "Compare the density of each material with the density of water (1.0 g/cm³).",
        materials: [
          { id: "cork", label: "Cork", icon: "🪵", density: 0.24 },
          { id: "wood", label: "Wood", icon: "🪑", density: 0.6 },
          { id: "iron", label: "Iron", icon: "⚙️", density: 7.9 },
          { id: "gold", label: "Gold", icon: "🥇", density: 19.3 },
        ],
      },
      cards: [
        {
          title: "Density decides floating or sinking",
          body: "An object **less dense than the liquid floats**; an object **denser than the liquid sinks**. Cork (0.24 g cm⁻³) floats on water (1.0 g cm⁻³), while iron (7.9 g cm⁻³) sinks.",
        },
        {
          title: "The Plimsoll Line",
          body: "Cargo ships are marked with a **Plimsoll line** for safety. The density of sea water differs with temperature and salt concentration in different places, so the safe floating level of the ship differs too.",
          detail: "Marks on the Plimsoll line: TF (tropical fresh water), F (fresh water), T (tropical sea water), S (summer sea), W (winter sea) and WNA (winter North Atlantic).",
        },
      ],
      checks: [
        { question: "An object weighs 12 N in air and 9 N while submerged. What is the buoyant force?", hint: "3 N. Buoyant force = actual weight − apparent weight = 12 N − 9 N." },
        { question: "A wooden block floats at rest on water. Compare the buoyant force with its weight.", hint: "They are equal in magnitude — a floating object is in equilibrium." },
      ],
    },
    {
      number: "8.2",
      title: "Levers",
      intro:
        "A lever is a **bar that turns about one fixed point**. A lever has three parts: the fulcrum (the fixed supporting point), the load (the object to be moved) and the effort (the push or pull applied to the bar). Levers let us do work more easily, often using a smaller force.",
      leverClasses: {
        title: "⚖️ The three classes of lever",
        instruction: "Tap each class to see where the fulcrum, load and effort sit.",
        fulcrumLabel: "Fulcrum",
        loadLabel: "Load",
        effortLabel: "Effort",
        classes: [
          {
            id: "first",
            name: "1st class lever",
            middle: "fulcrum",
            examples: "Examples: scissors, pliers, a can opener.",
            note: "The fulcrum lies between the load and the effort.",
          },
          {
            id: "second",
            name: "2nd class lever",
            middle: "load",
            examples: "Examples: a wheelbarrow, a nutcracker.",
            note: "The load lies between the fulcrum and the effort.",
          },
          {
            id: "third",
            name: "3rd class lever",
            middle: "effort",
            examples: "Examples: ice tongs, a fishing rod, forceps.",
            note: "The effort lies between the fulcrum and the load.",
          },
        ],
        formula: "Load (N) × Distance of load from fulcrum (m) = Effort (N) × Distance of effort from fulcrum (m)",
        workedExample: {
          title: "Worked example",
          given: "A load of 400 N sits 0.5 m from the fulcrum. The effort is applied 2 m from the fulcrum. What effort is needed to balance the lever?",
          working: "Load × load distance = Effort × effort distance → 400 N × 0.5 m = Effort × 2 m → Effort = 200 ÷ 2",
          answer: "Effort = 100 N",
        },
        hint: "Pick a lever class to see how it is arranged.",
      },
      matcher: {
        title: "🔧 Classify each tool by lever class",
        instruction: "Pick a lever class, then pick the tool that matches it.",
        pairs: [
          { id: "first", label: "1st class — fulcrum between load and effort", match: "✂️ Scissors" },
          { id: "second", label: "2nd class — load between fulcrum and effort", match: "🛒 Wheelbarrow" },
          { id: "third", label: "3rd class — effort between fulcrum and load", match: "🎣 Fishing rod" },
        ],
      },
      checks: [
        { question: "Which class of lever is a wheelbarrow, and why?", hint: "2nd class — its load lies between the wheel (fulcrum) and the hands applying the effort." },
        { question: "A 600 N load is 0.4 m from the fulcrum. The effort acts 1.2 m from the fulcrum. What effort is needed?", hint: "200 N. 600 N × 0.4 m = 240; 240 ÷ 1.2 m = 200 N." },
      ],
    },
    {
      number: "8.2",
      title: "Moment of Force",
      intro:
        "A force applied to an object can turn that object about a fixed point called the **pivot or fulcrum**. The turning effect produced is called the **moment of force**.",
      remember:
        "Moment of force allows us to do work more easily. Moment of force depends on the force applied and the perpendicular distance from the pivot to the force.",
      momentDiagram: {
        title: "🔩 Moment of force and perpendicular distance",
        instruction: "Tap each situation to see which distance goes into the calculation.",
        formula: "Moment of force = Force (N) × Perpendicular distance from pivot to force (m)",
        pivotLabel: "Pivot",
        forceLabel: "Force",
        distanceLabel: "Perpendicular distance",
        perpendicularNote: "Handle length is not the perpendicular distance when the force is applied at an angle — the perpendicular distance is measured at right angles to the force, so it becomes shorter.",
        situations: [
          {
            id: "door",
            label: "Opening a door",
            note: "Pushing at the handle, far from the hinges, produces a larger moment of force, so the door opens more easily than when pushing near the hinges.",
          },
          {
            id: "spanner",
            label: "Loosening a nut",
            note: "A spanner with a longer handle produces a larger moment of force for the same force. A force of 50 N at a perpendicular distance of 0.2 m produces a moment of 10 N m.",
          },
          {
            id: "angled",
            label: "Force at an angle",
            note: "When the force is not at right angles to the handle, the perpendicular distance is shorter than the handle length — so the moment produced is smaller even though the force is the same.",
          },
        ],
        caption: "The moment of force increases when the force increases, or when the perpendicular distance increases.",
        hint: "Pick a situation to see its perpendicular distance.",
        senseLabels: { clockwise: "Clockwise moment", anticlockwise: "Anticlockwise moment" },
      },
      calculators: [
        {
          type: "two-field",
          title: "🧮 Moment of force calculator",
          instruction: "Moment of force = Force × perpendicular distance from the pivot. Change the values and watch what happens.",
          fieldA: { label: "Force", unit: "N", default: 50 },
          fieldB: { label: "Perpendicular distance", unit: "m", default: 0.2 },
          operation: "multiply",
          resultLabel: "Moment of force",
          resultUnit: "N m",
        },
      ],
      checks: [
        { question: "Why is it easier to open a door by pushing at the handle rather than near the hinges?", hint: "The perpendicular distance from the pivot is larger at the handle, so the same force produces a larger moment." },
        { question: "A force of 20 N acts at a perpendicular distance of 0.3 m from the pivot. What is the moment of force?", hint: "6 N m. Moment of force = 20 N × 0.3 m." },
      ],
    },
    {
      number: "8.2",
      title: "Pressure",
      intro:
        "You can press a drawing pin into a board, but you cannot press a coin into a board even using the same force. The reason is pressure: pressure is defined as **force per unit surface area**, with the force acting perpendicular to that surface. The S.I. unit of pressure is the pascal (Pa); 1 Pa is equal to 1 newton per square metre (N m⁻²).",
      remember:
        "Pressure is defined as force per unit surface area, with the force acting perpendicular to that surface. The S.I. unit of pressure is the pascal (Pa).",
      pressureApparatus: {
        title: "🧪 The investigation set-up",
        instruction: "Tap each part of the apparatus to see what it is for.",
        parts: [
          { id: "blocks", label: "Metal blocks", note: "Two metal blocks of the same mass but with different base surface areas — so the force acting is the same and only the surface area changes." },
          { id: "plasticine", label: "Plasticine", note: "The plasticine records the effect of pressure: the higher the pressure, the deeper the indentation left behind." },
          { id: "stand", label: "Retort stand and clamp", note: "Holds both metal blocks at the same position above the plasticine." },
          { id: "string", label: "String", note: "Hangs each metal block from the retort stand before it is released." },
          { id: "rule", label: "Metre rule", note: "Measures the depth of the indentation each metal block produces." },
        ],
        caption: "Same mass, different surface area — compare the depth of the indentations.",
        hint: "Pick a part of the apparatus to see what it is for.",
      },
      miniExperiment: {
        title: "🔬 Investigation: surface area and pressure",
        aim: "To study the relationship between surface area and the pressure produced by the same force.",
        instruction: "Tap to see the full investigation.",
        aimLabel: "AIM",
        hypothesisLabel: "HYPOTHESIS",
        manipulatedLabel: "MANIPULATED VARIABLE",
        respondingLabel: "RESPONDING VARIABLE",
        controlledLabel: "CONTROLLED VARIABLE",
        materialsLabel: "MATERIALS",
        apparatusLabel: "APPARATUS",
        methodLabel: "METHOD",
        observationLabel: "OBSERVATION",
        conclusionLabel: "CONCLUSION",
        operationalDefinitionLabel: "OPERATIONAL DEFINITION",
        parts: [
          {
            id: "surface-area",
            label: "Surface area",
            icon: "📐",
            question: "What is the effect of surface area on the pressure produced by the same force?",
            hypothesis: "As the surface area increases, the pressure produced decreases.",
            operationalDefinition:
              "Operationally, pressure can be related to the depth of indentation produced when the same force acts over different surface areas: a deeper indentation means a higher pressure.",
            manipulated: "Surface area over which the force acts",
            responding: "Depth of the indentation in the plasticine",
            controlled: "Metal blocks of the same mass, so the force acting is the same",
            materials: "Metal blocks and plasticine",
            apparatus: "Retort stand and clamp, metre rule and string",
            method: [
              "Prepare two metal blocks of the same mass but with different base surface areas.",
              "Hang both metal blocks from the retort stand and clamp using string.",
              "Place a piece of plasticine beneath both metal blocks.",
              "Release metal block P and measure the depth of the indentation produced using the metre rule.",
              "Repeat the step with metal block Q, then compare the two indentation depths.",
            ],
            observation:
              "The block with the smaller surface area produces a deeper indentation in the plasticine. The block with the larger surface area produces a shallower indentation.",
            conclusion:
              "For the same force, a smaller surface area produces a higher pressure, while a larger surface area produces a lower pressure. The hypothesis is accepted.",
          },
        ],
      },
      calculators: [
        {
          type: "two-field",
          title: "🧮 Pressure calculator",
          instruction: "Pressure = Force ÷ Surface area. Keep the force the same and make the area smaller — watch the pressure rise.",
          fieldA: { label: "Force", unit: "N", default: 10 },
          fieldB: { label: "Surface area", unit: "m²", default: 0.01 },
          operation: "divide",
          resultLabel: "Pressure",
          resultUnit: "Pa",
        },
      ],
      cards: [
        {
          title: "High pressure — small surface area",
          body: "A thin axe blade, the thin metal blade of an ice skate, and the studs on a football boot all concentrate force onto a small surface area to produce high pressure.",
        },
        {
          title: "Low pressure — large surface area",
          body: "A tractor has large, wide tyres so that the pressure on the ground is low and the tractor does not sink. In the same way, the large surface area of an elephant's foot produces a small pressure on the ground despite its great weight.",
        },
      ],
      checks: [
        { question: "A 5 N cuboid has three different faces. Which face gives the highest pressure on the ground?", hint: "The face with the smallest area — a smaller area with the same force always means a higher pressure." },
        { question: "A force of 20 N acts on an area of 0.5 m². What is the pressure?", hint: "40 Pa. Pressure = 20 N ÷ 0.5 m²." },
      ],
    },
    {
      number: "8.2",
      title: "Gas Pressure",
      intro:
        "The **kinetic theory of gases** states that air molecules move randomly at all times and collide with the walls of their container. These collisions produce a force pushing on the container walls — and that force per unit area is what we call **air pressure**.",
      quickExplanation:
        "A balloon expands when blown up because the air pressure inside it pushes outward on its wall, and it deflates when the air is released because that pressure drops.",
      gasParticles: {
        title: "💨 What changes gas pressure",
        instruction: "Tap each state to see the effect on collisions.",
        particleCount: 14,
        states: [
          {
            id: "normal",
            label: "Original state",
            note: "Air molecules move randomly and collide with the container walls. These collisions are what produce gas pressure.",
          },
          {
            id: "compressed",
            label: "Volume decreased",
            note: "When a closed container is compressed, the volume of space inside it decreases. The number of molecules stays the same, but they collide with the container walls more frequently — so the gas pressure increases.",
          },
          {
            id: "heated",
            label: "Temperature raised",
            note: "When the temperature rises, air molecules move faster. The number of molecules stays the same, but they strike the walls more frequently and with greater force — so the gas pressure increases.",
          },
        ],
        caption: "The number of molecules stays the same in all three states — only the volume or the temperature changes.",
        hint: "Pick a state to see its effect.",
      },
      checks: [
        { question: "A closed syringe is pushed in so its volume decreases. What happens to the air pressure inside?", hint: "The pressure increases, because the same number of molecules now collide with the walls more often in a smaller space." },
        { question: "Why can a balloon left in a hot place burst?", hint: "A higher temperature makes the air molecules move faster, striking the balloon walls more often and more forcefully, so the pressure inside increases." },
      ],
    },
    {
      number: "8.2",
      title: "Atmospheric Pressure",
      intro:
        "Atmospheric pressure is **the pressure exerted by the atmosphere on the surface of the Earth and on all bodies on it**. Use the terms correctly: air pressure is the pressure exerted by air in general, while atmospheric pressure refers specifically to the pressure exerted by the Earth's atmosphere.",
      cards: [
        {
          title: "Altitude and atmospheric pressure",
          body: "**Atmospheric pressure decreases as altitude increases.** The higher you are, the less air there is above you, so the weight of the column of air pressing down is smaller and the atmospheric pressure is lower. At the foot of a mountain there are more air molecules above you, so the pressure there is higher.",
          detail: "High mountain peaks such as Mount Everest are places of very low atmospheric pressure.",
        },
      ],
      altitudePressure: {
        title: "🏔️ Why atmospheric pressure falls with altitude",
        instruction: "Tap each position to compare the air above it.",
        particleCount: 46,
        airAboveLabel: "Air above",
        levels: [
          { id: "summit", label: "Mountain summit", note: "At the summit there is only a little air above you. The weight of the air column pressing down is small, so the atmospheric pressure there is low." },
          { id: "foot", label: "Foot of the mountain", note: "At the foot there is much more air above you. The weight of the air column pressing down is greater, so the atmospheric pressure there is higher." },
        ],
        caption: "Air is denser near the Earth's surface and thins out at high altitude.",
        hint: "Pick a position to compare.",
      },
      accordions: [
        {
          title: "🥤 Drinking straw",
          body: "When the air inside the straw is sucked out, the space inside becomes a region of low pressure. The higher air pressure outside — the atmospheric pressure — **pushes the drink up into the straw** and into your mouth. The straw does not 'suck' the drink upward by itself.",
        },
        {
          title: "🔵 Magdeburg hemispheres",
          body: "When the air inside the hemispheres is pumped out so that the space inside becomes a vacuum, the pressure inside becomes zero. The two hemispheres are very hard to pull apart because the **atmospheric pressure outside exerts a very large force** on them.",
        },
        {
          title: "🚿 Sink plunger",
          body: "When the plunger is pressed onto the sink, the air inside is forced out, creating a region of low pressure. When the plunger is pulled up, the higher pressure inside the pipe pushes the blockage along.",
        },
        {
          title: "💧 Siphon",
          body: "One end of the tube is placed lower so that water flows out of it. The water flowing out lowers the pressure inside the tube, and atmospheric pressure pushes water into the tube — making the water **flow out continuously**.",
        },
        {
          title: "💉 Syringe",
          body: "When the piston is pulled up, the space inside the syringe becomes a region of low pressure. The atmospheric pressure outside then pushes the liquid up into the syringe.",
        },
        {
          title: "🧹 Vacuum cleaner",
          body: "The fan of a vacuum cleaner lowers the air pressure inside it. The higher atmospheric pressure outside pushes air in, and that air carries dust and scraps of paper along with it.",
        },
      ],
      checks: [
        { question: "Why is atmospheric pressure lower at a mountain peak than at its foot?", hint: "At the peak there is less air above you, so the weight of the column of air pressing down is smaller." },
        { question: "Explain why a drink rises up a straw when you suck on it.", hint: "Sucking lowers the pressure inside the straw, and the atmospheric pressure outside pushes the drink up into it." },
      ],
    },
    {
      number: "8.2",
      title: "Liquid Pressure",
      intro:
        "**Pressure in a liquid increases as depth increases.** A diver feels pressure because of the weight of the water acting on their body, and that pressure grows the deeper they dive.",
      depthPressure: {
        title: "🌊 Depth and liquid pressure",
        instruction: "Tap each hole position to compare the pressure there.",
        levels: [
          { id: "shallow", label: "Shallow", note: "Near the surface the depth is small, so the liquid pressure is lowest and the jet of water travels the shortest distance." },
          { id: "middle", label: "Middle", note: "The depth is greater, so the liquid pressure is higher and the jet of water travels further." },
          { id: "deep", label: "Deep", note: "The depth is greatest, so the liquid pressure is highest and the jet of water travels the furthest." },
        ],
        applications: [
          { id: "dam", label: "Dam walls", note: "A dam wall is built thicker at the bottom because the water pressure is greatest at the greatest depth." },
          { id: "submarine", label: "Submarines", note: "A submarine hull is designed thick and strong so that it can withstand the high water pressure at depth." },
          {
            id: "diver",
            label: "Divers",
            note: "At greater depth, water pressure is higher. Divers wear suitable protective equipment to withstand the higher pressure.",
            image: {
              key: "diverLiquidPressure",
              alt: "A diver at significant underwater depth wearing protective diving equipment.",
            },
          },
        ],
        caption: "The deeper the hole, the further the water jets out.",
        hint: "Pick a hole position to compare.",
        applicationsLabel: "Where this matters",
      },
      checks: [
        { question: "Why is a dam wall built thicker at the bottom?", hint: "Because liquid pressure increases with depth, so the bottom has to withstand the greatest water pressure." },
        { question: "An air bubble grows larger as it rises to the water surface. Why?", hint: "Liquid pressure decreases as the depth decreases, so the bubble expands as it rises." },
      ],
    },
  ],
  reflectionItems: [
    "I can name the types of force and describe what each one does.",
    "I can draw a force as an arrow showing magnitude, direction and point of application.",
    "I can measure force in newtons using a spring balance.",
    "I can explain action and reaction force pairs with examples.",
    "I can determine buoyant force using actual weight and apparent weight.",
    "I can classify levers and solve problems using the principle of moments.",
    "I can calculate the moment of force using the perpendicular distance from the pivot.",
    "I can explain the relationship between surface area and pressure, and calculate pressure.",
    "I can explain gas pressure, atmospheric pressure and liquid pressure with everyday examples.",
  ],
  miniQuiz: [
    {
      type: "true-false",
      question: "True or false: A drawing pin pierces a board more easily than a coin because it applies more force.",
      answer: false,
      explanation: "Same force, far smaller area — that is what creates the higher pressure, not more force.",
    },
    {
      type: "multiple-choice",
      question: "Which class of lever has the load between the fulcrum and the effort?",
      options: ["First class", "Second class", "Third class", "None of these"],
      answerIndex: 1,
      explanation: "Second class — like a wheelbarrow, where the load sits between the wheel (fulcrum) and your hands (effort).",
    },
    {
      type: "multiple-choice",
      question: "A block floats at rest on water. What is the relationship between the buoyant force and its weight?",
      options: [
        "The buoyant force is greater than the weight",
        "The buoyant force is equal to the weight",
        "The buoyant force is less than the weight",
        "The buoyant force becomes zero",
      ],
      answerIndex: 1,
      explanation: "A floating object is in equilibrium, so the upward buoyant force is equal in magnitude to the downward weight.",
    },
  ],
};
