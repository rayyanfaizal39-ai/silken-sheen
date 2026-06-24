import type { MindNode } from "@/components/MindMap";

export const scienceF2C7MindMapDLP: MindNode = {
  id: "root",
  label: "Electricity and Magnetism",
  children: [
    {
      id: "c1",
      label: "7.1 Electricity",
      children: [
        {
          id: "c1-1",
          label: "Energy",
          children: [
            { id: "c1-1-1", label: "Energy = ability to do work; S.I. unit: joule (J)" },
            {
              id: "c1-1-2",
              label: "Forms of energy",
              children: [
                { id: "c1-1-2-1", label: "Sound energy" },
                { id: "c1-1-2-2", label: "Kinetic energy" },
                { id: "c1-1-2-3", label: "Electrical energy" },
                { id: "c1-1-2-4", label: "Gravitational potential energy" },
                { id: "c1-1-2-5", label: "Elastic potential energy" },
                { id: "c1-1-2-6", label: "Light energy" },
                { id: "c1-1-2-7", label: "Nuclear energy" },
                { id: "c1-1-2-8", label: "Heat energy" },
                { id: "c1-1-2-9", label: "Chemical energy" },
                { id: "c1-1-2-10", label: "Energy cannot be created nor destroyed, only changes form" },
              ],
            },
            {
              id: "c1-1-3",
              label: "Sources of energy",
              children: [
                { id: "c1-1-3-1", label: "The Sun" },
                { id: "c1-1-3-2", label: "Wind" },
                { id: "c1-1-3-3", label: "Geothermal" },
                { id: "c1-1-3-4", label: "Wave" },
                { id: "c1-1-3-5", label: "Water" },
                { id: "c1-1-3-6", label: "Radioactive substance" },
                { id: "c1-1-3-7", label: "Biomass" },
                { id: "c1-1-3-8", label: "Fossil fuel" },
              ],
            },
            {
              id: "c1-1-4",
              label: "Examples of daily energy use",
              children: [
                { id: "c1-1-4-1", label: "People use energy to run" },
                { id: "c1-1-4-2", label: "Plants need energy from the Sun to live" },
                { id: "c1-1-4-3", label: "Cars need energy from fuel to move" },
                { id: "c1-1-4-4", label: "Light from a bulb is produced by energy" },
              ],
            },
          ],
        },
        {
          id: "c1-2",
          label: "Electrostatic Charges",
          children: [
            { id: "c1-2-1", label: "Result from transfer of electrons between two objects when rubbed together" },
            { id: "c1-2-2", label: "Only electrons are transferred; protons do not move" },
            { id: "c1-2-3", label: "Object gains electrons → negatively charged" },
            { id: "c1-2-4", label: "Object loses electrons → positively charged" },
            { id: "c1-2-5", label: "Equal protons and electrons → neutral" },
            {
              id: "c1-2-6",
              label: "Electrostatic forces",
              children: [
                { id: "c1-2-6-1", label: "Same charges repel each other" },
                { id: "c1-2-6-2", label: "Opposite charges attract each other" },
              ],
            },
            {
              id: "c1-2-7",
              label: "Example applications",
              children: [
                { id: "c1-2-7-1", label: "TV screen becomes dusty — negative charges on dust attracted to positive charges on screen" },
                { id: "c1-2-7-2", label: "Microfibre cloth (anti-electrostatic material) prevents quick dusting" },
                { id: "c1-2-7-3", label: "Van de Graaff generator / Wimhurst machine — simulate lightning formation in lab" },
              ],
            },
          ],
        },
        {
          id: "c1-3",
          label: "Electroscope",
          children: [
            { id: "c1-3-1", label: "Device used to detect existence of electric charges on an object" },
            { id: "c1-3-2", label: "Gold leaf does not diverge when positive and negative charges attract one another" },
            { id: "c1-3-3", label: "Gold leaf diverges because same charges repel each other" },
            { id: "c1-3-4", label: "Greater divergence of gold leaf → higher quantity of charges accumulated" },
          ],
        },
        {
          id: "c1-4",
          label: "Lightning",
          children: [
            { id: "c1-4-1", label: "Friction between clouds and air causes clouds to be charged" },
            { id: "c1-4-2", label: "Upper part of cloud positively charged; bottom part negatively charged" },
            { id: "c1-4-3", label: "Lightning results from attraction between positive charges on ground & negative charges in clouds" },
            { id: "c1-4-4", label: "Lightning conductor installed on buildings provides a path for charges to flow into ground, protecting the building" },
          ],
        },
        {
          id: "c1-5",
          label: "Electric Current",
          children: [
            { id: "c1-5-1", label: "Rate of flow of electric charges through a conductor" },
            { id: "c1-5-2", label: "Deflection of galvanometer pointer indicates flow of electric current" },
            { id: "c1-5-3", label: "Measured using an ammeter (S.I. unit: ampere, A)" },
          ],
        },
        {
          id: "c1-6",
          label: "Voltage",
          children: [
            { id: "c1-6-1", label: "Potential difference between two points" },
            { id: "c1-6-2", label: "Measured in volt (V) using a voltmeter" },
          ],
        },
        {
          id: "c1-7",
          label: "Resistance",
          children: [
            { id: "c1-7-1", label: "Ability of a conductor to limit/resist the flow of electric current" },
            { id: "c1-7-2", label: "Unit: ohm (Ω)" },
            { id: "c1-7-3", label: "Fixed resistor — resistance cannot be adjusted" },
            { id: "c1-7-4", label: "Variable resistor (rheostat) — resistance can be adjusted" },
          ],
        },
        {
          id: "c1-8",
          label: "Ohm's Law",
          children: [
            { id: "c1-8-1", label: "Current is directly proportional to voltage, provided temperature & other physical conditions unchanged" },
            { id: "c1-8-2", label: "Formula: V = IR; I = V/R; R = V/I" },
            {
              id: "c1-8-3",
              label: "Experiment 7.1",
              children: [
                { id: "c1-8-3-1", label: "Higher resistance (increasing length of nichrome wire) → smaller current flow" },
                { id: "c1-8-3-2", label: "Higher voltage (increasing number of dry cells) → larger current flow" },
              ],
            },
            {
              id: "c1-8-4",
              label: "Example calculation",
              children: [
                { id: "c1-8-4-1", label: "Car light bulb: I = 0.025 A, V = 12 V (car accumulator)" },
                { id: "c1-8-4-2", label: "R = V/I = 12/0.025 = 480 Ω" },
              ],
            },
          ],
        },
        {
          id: "c1-9",
          label: "Keywords 7.1",
          children: [
            { id: "c1-9-1", label: "Energy, Electrostatic charge, Electroscope" },
            { id: "c1-9-2", label: "Electric current, Ammeter, Voltmeter" },
            { id: "c1-9-3", label: "Resistance, Ohm's Law, Galvanometer" },
          ],
        },
        {
          id: "c1-10",
          label: "Subtopic Summary 7.1",
          children: [
            { id: "c1-10-1", label: "Energy exists in various forms and sources" },
            { id: "c1-10-2", label: "Electrostatic charges result from electron transfer; detected with electroscope; explains lightning" },
            { id: "c1-10-3", label: "Current measured with ammeter (A); voltage measured with voltmeter (V)" },
            { id: "c1-10-4", label: "Ohm's Law (V = IR) relates current, voltage and resistance" },
          ],
        },
      ],
    },
    {
      id: "c2",
      label: "7.2 Flow of Electric Current in a Series Circuit and Parallel Circuit",
      children: [
        {
          id: "c2-1",
          label: "Electric Circuit",
          children: [
            { id: "c2-1-1", label: "Electric current requires a complete path to flow" },
            { id: "c2-1-2", label: "This path is known as an electric circuit" },
            {
              id: "c2-1-3",
              label: "Electrical components and their symbols",
              children: [
                { id: "c2-1-3-1", label: "Switch" },
                { id: "c2-1-3-2", label: "Dry cell" },
                { id: "c2-1-3-3", label: "Voltmeter" },
                { id: "c2-1-3-4", label: "Galvanometer" },
                { id: "c2-1-3-5", label: "Ammeter" },
                { id: "c2-1-3-6", label: "Bulb" },
                { id: "c2-1-3-7", label: "Resistor" },
                { id: "c2-1-3-8", label: "Fuse" },
                { id: "c2-1-3-9", label: "Variable resistor" },
              ],
            },
            {
              id: "c2-1-4",
              label: "Direction of flow",
              children: [
                { id: "c2-1-4-1", label: "Electrons: negative terminal → positive terminal of source" },
                { id: "c2-1-4-2", label: "Current: positive terminal → negative terminal of source" },
              ],
            },
          ],
        },
        {
          id: "c2-2",
          label: "Series Circuit",
          children: [
            { id: "c2-2-1", label: "Components connected one after another; current flows through a single path" },
            {
              id: "c2-2-2",
              label: "Quantity relationships",
              children: [
                { id: "c2-2-2-1", label: "Current, I = I₁ = I₂ (same throughout)" },
                { id: "c2-2-2-2", label: "Voltage, V = V₁ + V₂ (sum of voltages)" },
                { id: "c2-2-2-3", label: "Resistance, R = R₁ + R₂ (sum of resistances)" },
              ],
            },
            {
              id: "c2-2-3",
              label: "Advantages",
              children: [
                { id: "c2-2-3-1", label: "Every component receives the same amount of current" },
                { id: "c2-2-3-2", label: "Every component controlled by the same switch" },
                { id: "c2-2-3-3", label: "Increase in voltage supplies more current" },
              ],
            },
            {
              id: "c2-2-4",
              label: "Disadvantages",
              children: [
                { id: "c2-2-4-1", label: "One appliance damaged → others cease to function" },
                { id: "c2-2-4-2", label: "More appliances → increases resistance, decreases current" },
                { id: "c2-2-4-3", label: "Each appliance cannot be switched off individually" },
              ],
            },
            {
              id: "c2-2-5",
              label: "Series circuit example calculation",
              children: [
                { id: "c2-2-5-1", label: "R₁ = 2 Ω, R₂ = 2 Ω, 6V supply → R = R₁+R₂ = 4 Ω" },
                { id: "c2-2-5-2", label: "I = V/R = 6/4 = 1.5 A" },
                { id: "c2-2-5-3", label: "V₁ = IR₁ = 1.5×2 = 3V; V₂ = IR₂ = 1.5×2 = 3V" },
              ],
            },
          ],
        },
        {
          id: "c2-3",
          label: "Parallel Circuit",
          children: [
            { id: "c2-3-1", label: "Separated into several different paths; each parallel path has electrical components" },
            {
              id: "c2-3-2",
              label: "Quantity relationships",
              children: [
                { id: "c2-3-2-1", label: "Voltage, V = V₁ = V₂ (same across each resistor)" },
                { id: "c2-3-2-2", label: "Current, I = I₁ + I₂ (total current)" },
                { id: "c2-3-2-3", label: "Effective resistance, 1/R = 1/R₁ + 1/R₂" },
              ],
            },
            {
              id: "c2-3-3",
              label: "Advantages",
              children: [
                { id: "c2-3-3-1", label: "Every appliance can be switched on/off separately" },
                { id: "c2-3-3-2", label: "Adding appliances does not affect other appliances' function" },
              ],
            },
            {
              id: "c2-3-4",
              label: "Disadvantages",
              children: [
                { id: "c2-3-4-1", label: "Voltage of each appliance cannot be adjusted (same as voltage source)" },
              ],
            },
            {
              id: "c2-3-5",
              label: "Parallel circuit example calculation",
              children: [
                { id: "c2-3-5-1", label: "R₁ = 2 Ω, R₂ = 2 Ω, 6V supply → 1/R = 1/2+1/2 = 1, R = 1 Ω" },
                { id: "c2-3-5-2", label: "V = 6V (same across both resistors)" },
                { id: "c2-3-5-3", label: "I₁ = V/R₁ = 6/2 = 3A; I₂ = V/R₂ = 6/2 = 3A" },
                { id: "c2-3-5-4", label: "Total current, I = I₁+I₂ = 3+3 = 6A" },
              ],
            },
            {
              id: "c2-3-6",
              label: "Application: home wiring",
              children: [
                { id: "c2-3-6-1", label: "Connected in parallel so every light gets the same voltage from main power supply" },
                { id: "c2-3-6-2", label: "Distribution panel controls current from main power supply to circuit" },
              ],
            },
          ],
        },
        {
          id: "c2-4",
          label: "Activities & Examples",
          children: [
            { id: "c2-4-1", label: "Decorative lights all light up except one → shows parallel circuit" },
            { id: "c2-4-2", label: "Activities 7.7 & 7.8: bulbs M and N — measure current & voltage in series and parallel circuits using ammeter and voltmeter" },
          ],
        },
        {
          id: "c2-5",
          label: "Keywords 7.2",
          children: [
            { id: "c2-5-1", label: "Series circuit, Parallel circuit" },
            { id: "c2-5-2", label: "Effective resistance, Distribution panel" },
          ],
        },
        {
          id: "c2-6",
          label: "Subtopic Summary 7.2",
          children: [
            { id: "c2-6-1", label: "Series circuit: single path, same current, divided voltage, increasing resistance" },
            { id: "c2-6-2", label: "Parallel circuit: several paths, same voltage, divided current, 1/R = 1/R₁+1/R₂" },
            { id: "c2-6-3", label: "Parallel circuits used in home wiring because appliances can be controlled separately" },
          ],
        },
      ],
    },
    {
      id: "c3",
      label: "7.3 Magnetism",
      children: [
        {
          id: "c3-1",
          label: "Introduction to Magnets",
          children: [
            { id: "c3-1-1", label: "Exist naturally as lodestones" },
            { id: "c3-1-2", label: "Man-made magnets made of iron, steel, cobalt, nickel" },
          ],
        },
        {
          id: "c3-2",
          label: "Properties of a Magnet",
          children: [
            { id: "c3-2-1", label: "Attracts magnetic materials" },
            { id: "c3-2-2", label: "Has poles: north pole and south pole" },
            { id: "c3-2-3", label: "Like poles repel; unlike poles attract" },
            { id: "c3-2-4", label: "Freely suspended magnet shows north-south direction" },
            { id: "c3-2-5", label: "Magnet broken into two pieces — each piece still has TWO poles (not just one)" },
          ],
        },
        {
          id: "c3-3",
          label: "Magnetic Field",
          children: [
            { id: "c3-3-1", label: "Area around the magnet with magnetic force" },
            {
              id: "c3-3-2",
              label: "Characteristics of magnetic field lines",
              children: [
                { id: "c3-3-2-1", label: "Begin from north pole and end at south pole" },
                { id: "c3-3-2-2", label: "Never meet or cross" },
                { id: "c3-3-2-3", label: "Closer together where magnetic field is stronger" },
              ],
            },
            { id: "c3-3-3", label: "Strength of magnetic field reduces moving away from centre of conductor" },
          ],
        },
        {
          id: "c3-4",
          label: "Electromagnet",
          children: [
            { id: "c3-4-1", label: "A magnet with temporary magnetic effect when electric current flows through it" },
            { id: "c3-4-2", label: "The electric bell uses an electromagnet" },
            {
              id: "c3-4-3",
              label: "Pattern of magnetic field",
              children: [
                { id: "c3-4-3-1", label: "Depends on shape of conductor used" },
                { id: "c3-4-3-2", label: "Straight wire & coiled wire → magnetic field lines are concentric circles" },
                { id: "c3-4-3-3", label: "Pattern not affected by current direction, but field direction determined by current direction" },
              ],
            },
            { id: "c3-4-4", label: "Right-hand grip rule — determines direction of magnetic field for current in a straight wire" },
            {
              id: "c3-4-5",
              label: "Solenoid",
              children: [
                { id: "c3-4-5-1", label: "Current flows anti-clockwise → north pole" },
                { id: "c3-4-5-2", label: "Current flows clockwise → south pole" },
              ],
            },
          ],
        },
        {
          id: "c3-5",
          label: "Experiment 7.2 — Factors Affecting Magnetic Field Strength",
          children: [
            { id: "c3-5-1", label: "Factor 1 — Current: larger current → stronger magnetic field (measured by number of pins attracted by iron rod)" },
            { id: "c3-5-2", label: "Factor 2 — Number of turns of coil: more turns → stronger magnetic field" },
          ],
        },
        {
          id: "c3-6",
          label: "Example Applications",
          children: [
            { id: "c3-6-1", label: "Compass needle uses a magnet to show direction of poles" },
            { id: "c3-6-2", label: "Credit/debit cards have an electromagnetic strip that stores information" },
            { id: "c3-6-3", label: "Magnetic lock on doors uses an electromagnet to lock doors automatically" },
          ],
        },
        {
          id: "c3-7",
          label: "Keywords 7.3",
          children: [
            { id: "c3-7-1", label: "Magnet, Magnetic field, Electromagnet" },
            { id: "c3-7-2", label: "Solenoid, Right-hand grip rule, North pole and south pole" },
          ],
        },
        {
          id: "c3-8",
          label: "Subtopic Summary 7.3",
          children: [
            { id: "c3-8-1", label: "Magnet attracts magnetic materials, has two poles, field lines go from north to south without crossing" },
            { id: "c3-8-2", label: "Electromagnet — temporary magnetic effect when current flows; strength influenced by current & number of turns" },
            { id: "c3-8-3", label: "Right-hand grip rule determines direction of magnetic field based on current direction" },
            { id: "c3-8-4", label: "Used in compasses, bank cards, door locks" },
          ],
        },
      ],
    },
  ],
};
