import { SectorNode, GoblinAgent } from "../types";

export const DEFAULT_SECTORS: SectorNode[] = [
  {
    id: "sec-core",
    name: "Bedrock Central Core",
    code: "SEC-01",
    depthMeters: 450,
    x: 50,
    y: 48,
    type: "core",
    threatLevel: "LOW",
    signalStrength: 98,
    resources: [
      { name: "Raw Bandwidth", amount: 840, unit: "Tb/s" },
      { name: "Geothermal Watts", amount: 1250, unit: "kW" }
    ],
    description: "The beating cybernetic heart of Goblin territory. Massive optic fibers converge into ancient obsidian monoliths.",
    lore: "Legend holds that the first goblin found a discarded military mainframe here in 2004 and kicked it until it booted into peer-to-peer bedrock mode.",
    connections: ["sec-scrap", "sec-treasury", "sec-bio", "sec-aqueduct", "sec-lab"]
  },
  {
    id: "sec-scrap",
    name: "Scrap-Heap Substation",
    code: "SEC-02",
    depthMeters: 320,
    x: 24,
    y: 32,
    type: "scrap",
    threatLevel: "MODERATE",
    signalStrength: 76,
    resources: [
      { name: "Salvaged Copper", amount: 480, unit: "kg" },
      { name: "Recycled Silicon", amount: 190, unit: "wafers" }
    ],
    description: "Towering junk-pyramids of server chassis, burnt power supplies, and tangle-vines of braided Ethernet.",
    lore: "Every scrap goblin cuts their teeth here learning to identify pure gold-plated connectors by taste.",
    connections: ["sec-core", "sec-lab", "sec-bio"]
  },
  {
    id: "sec-treasury",
    name: "Shinies Treasury & Mint",
    code: "SEC-03",
    depthMeters: 600,
    x: 74,
    y: 28,
    type: "treasury",
    threatLevel: "LOW",
    signalStrength: 92,
    resources: [
      { name: "GoblinCoin Reserve", amount: 94820, unit: "GC" },
      { name: "Shiny Prisms", amount: 310, unit: "crystals" }
    ],
    description: "Guarded by three-ton hydraulic blast gates. Home of the physical press stamping real GoblinCoins into brass and bismuth.",
    lore: "Rule #1 of the treasury: One goblin may look, two goblins may count, but three goblins will definitely try to bite the coins to test density.",
    connections: ["sec-core", "sec-perimeter"]
  },
  {
    id: "sec-bio",
    name: "Luminescent Spore Groves",
    code: "SEC-04",
    depthMeters: 210,
    x: 20,
    y: 72,
    type: "bio",
    threatLevel: "LOW",
    signalStrength: 64,
    resources: [
      { name: "Bioluminescent Spores", amount: 620, unit: "liters" },
      { name: "Fermented Battery-Juice", amount: 140, unit: "casks" }
    ],
    description: "Damp cavern roof festooned with glowing emerald fungi that feed on stray radio frequencies and heat sinks.",
    lore: "The techno-alchemists distill a neon drink from these mushrooms that allows goblins to see Wi-Fi signals in the dark.",
    connections: ["sec-core", "sec-scrap", "sec-aqueduct"]
  },
  {
    id: "sec-aqueduct",
    name: "The Deep Siphon Aqueduct",
    code: "SEC-05",
    depthMeters: 780,
    x: 48,
    y: 84,
    type: "aqueduct",
    threatLevel: "HIGH",
    signalStrength: 52,
    resources: [
      { name: "Sub-Zero Coolant", amount: 9800, unit: "gal" },
      { name: "Heavy Minerals", amount: 340, unit: "kg" }
    ],
    description: "An abyss canal where icy subterranean water rushes over overclocked transformer banks before plunging into the fault.",
    lore: "Echoes here sound like dial-up modem tones. Scouts often drop breadcrumbs and waterproof hydro-phones to map rogue surface leaks.",
    connections: ["sec-core", "sec-bio", "sec-market"]
  },
  {
    id: "sec-perimeter",
    name: "Cyber-Warren Outpost",
    code: "SEC-06",
    depthMeters: 150,
    x: 82,
    y: 68,
    type: "perimeter",
    threatLevel: "CRITICAL",
    signalStrength: 85,
    resources: [
      { name: "Intercepted Feeds", amount: 54, unit: "streams" },
      { name: "Jamming Chaff", amount: 88, unit: "canisters" }
    ],
    description: "High-altitude bunker perched just beneath human storm drains. Armed with parabolic dish arrays and tripwire laser alarms.",
    lore: "When surface humans lose their signal, 90% of the time it's because this outpost tapped the fiber line to pirate high-res cat videos.",
    connections: ["sec-treasury", "sec-market"]
  },
  {
    id: "sec-lab",
    name: "Skunkworks Demolitions Lab",
    code: "SEC-07",
    depthMeters: 510,
    x: 35,
    y: 18,
    type: "lab",
    threatLevel: "HIGH",
    signalStrength: 70,
    resources: [
      { name: "Capacitor Spark Coils", amount: 160, unit: "units" },
      { name: "Mini-Drone Parts", amount: 45, unit: "frames" }
    ],
    description: "Smoky workshop rattling with miniature jet engines, magnetized catapults, and overclocked soldering irons.",
    lore: "No safety goggles here, only welded blast shields and a sign that reads: 'If it doesn't spark, you didn't connect enough 9V batteries.'",
    connections: ["sec-core", "sec-scrap"]
  },
  {
    id: "sec-market",
    name: "Black-Circuit Bazaar",
    code: "SEC-08",
    depthMeters: 390,
    x: 70,
    y: 85,
    type: "market",
    threatLevel: "MODERATE",
    signalStrength: 88,
    resources: [
      { name: "Flash Cartridges", amount: 1250, unit: "carts" },
      { name: "Roasted Grubs", amount: 73, unit: "skewers" }
    ],
    description: "Neon-lit stalls crowded under corrugated aluminum ceilings. Goblins barter memory sticks, copper rings, and hot noodles.",
    lore: "Strictly cash or GoblinCoin. Anyone attempting to pay with fiat paper is forced to wash the community heatsinks.",
    connections: ["sec-perimeter", "sec-aqueduct"]
  }
];

export const INITIAL_AGENTS: GoblinAgent[] = [
  {
    id: "agent-1",
    name: "Glint-Eye",
    callsign: "SHADOW-01",
    role: "scout",
    status: "RECON",
    sectorId: "sec-aqueduct",
    x: 48,
    y: 84,
    energy: 92,
    coins: 430,
    avatarEmoji: "🧌",
    tagline: "I see in total infrared, chief. Even human fiber cables glow like neon licorice.",
    currentTask: "Mapping underwater intake current in Deep Siphon",
    taskProgress: 64,
    logs: [
      { id: "l1", timestamp: "18:42", message: "Deployed hydro-phone probe at Aqueduct Junction C-4.", type: "info" },
      { id: "l2", timestamp: "18:44", message: "Detected unauthorized surface packet ping. Scrambled signature.", type: "warn" },
      { id: "l3", timestamp: "18:47", message: "Found 12 meters of gold-plated coax cable tangled in intake grate.", type: "loot" }
    ],
    stats: {
      stealth: 94,
      scrapPower: 58,
      shinySense: 88,
      glitchMastery: 72
    },
    inventory: ["Thermal Monocle", "Waterproof Fiber Probe", "Signal Jammer Pen"]
  },
  {
    id: "agent-2",
    name: "Bog-Spark",
    callsign: "ALCHEM-09",
    role: "alchemist",
    status: "BREWING",
    sectorId: "sec-bio",
    x: 20,
    y: 72,
    energy: 85,
    coins: 710,
    avatarEmoji: "🧪",
    tagline: "Fermenting 40-weight lithium moonshine. One sip turns your teeth into an antenna!",
    currentTask: "Synthesizing bio-conductive electrolyte sludge",
    taskProgress: 88,
    logs: [
      { id: "l4", timestamp: "18:30", message: "Harvested 4kg of Phosphor-Caps from Sector 4 ceiling.", type: "info" },
      { id: "l5", timestamp: "18:38", message: "Electrolyte bubbling at optimal 82°C. Smells like ozone and honey.", type: "success" }
    ],
    stats: {
      stealth: 65,
      scrapPower: 82,
      shinySense: 75,
      glitchMastery: 89
    },
    inventory: ["Titanium Flask", "Copper Condenser Coil", "Acid-Proof Gloves"]
  },
  {
    id: "agent-3",
    name: "Rust-Tooth",
    callsign: "SCRAP-CHIEF",
    role: "scrapper",
    status: "SALVAGING",
    sectorId: "sec-scrap",
    x: 24,
    y: 32,
    energy: 78,
    coins: 1420,
    avatarEmoji: "⚙️",
    tagline: "One man's trash is another goblin's dual-socket server blade.",
    currentTask: "Stripping heat sinks from decommissioned telecom chassis",
    taskProgress: 42,
    logs: [
      { id: "l6", timestamp: "18:15", message: "Pried open vintage 1998 mainframe panel.", type: "info" },
      { id: "l7", timestamp: "18:22", message: "Recovered 24 intact socket chips with zero bent pins!", type: "loot" }
    ],
    stats: {
      stealth: 45,
      scrapPower: 98,
      shinySense: 95,
      glitchMastery: 60
    },
    inventory: ["Pneumatic Prybar", "Magnetized Teeth", "Flux Solder Torch"]
  },
  {
    id: "agent-4",
    name: "Bit-Goblin",
    callsign: "CIPHER-00",
    role: "hacker",
    status: "HACKING",
    sectorId: "sec-core",
    x: 50,
    y: 48,
    energy: 96,
    coins: 2500,
    avatarEmoji: "👾",
    tagline: "Root shell acquired. Bedrock network encryption level: impenetrable.",
    currentTask: "Bridging neural GLM weights directly to subterranean core relays",
    taskProgress: 79,
    logs: [
      { id: "l8", timestamp: "18:40", message: "Syncing Featherless bedrock frequency with cave nodes.", type: "info" },
      { id: "l9", timestamp: "18:43", message: "Blocked external crawler probing bedrock DNS port.", type: "success" }
    ],
    stats: {
      stealth: 88,
      scrapPower: 60,
      shinySense: 80,
      glitchMastery: 99
    },
    inventory: ["Overclocked Deck", "Custom RJ45 Fangs", "Noise Encryption Key"]
  },
  {
    id: "agent-5",
    name: "Shiny-Paw",
    callsign: "MINT-LORD",
    role: "treasurer",
    status: "HOARDING",
    sectorId: "sec-treasury",
    x: 74,
    y: 28,
    energy: 99,
    coins: 9850,
    avatarEmoji: "💰",
    tagline: "Count the shiny GoblinCoins once. Then count them twice. Then polish them with velvet.",
    currentTask: "Inspecting freshly minted batches of brass GoblinCoins",
    taskProgress: 95,
    logs: [
      { id: "l10", timestamp: "18:20", message: "Vault balance confirmed: 94,820 GoblinCoins.", type: "info" },
      { id: "l11", timestamp: "18:35", message: "Polished Grand Archival Coin #001.", type: "success" }
    ],
    stats: {
      stealth: 70,
      scrapPower: 50,
      shinySense: 100,
      glitchMastery: 75
    },
    inventory: ["Brass Calipers", "Microfiber Polishing Rag", "Master Vault Key"]
  },
  {
    id: "agent-6",
    name: "Grizzle-Jaw",
    callsign: "ENFORCE-44",
    role: "enforcer",
    status: "PATROLLING",
    sectorId: "sec-perimeter",
    x: 82,
    y: 68,
    energy: 88,
    coins: 610,
    avatarEmoji: "🛡️",
    tagline: "No surface corporate spooks past my trench. I speak fluent crowbar.",
    currentTask: "Scanning stormwater access grates for intruder drones",
    taskProgress: 35,
    logs: [
      { id: "l12", timestamp: "18:10", message: "Tightened perimeter razor-mesh at Pipe 12.", type: "info" },
      { id: "l13", timestamp: "18:25", message: "Neutralized surveillance rat with EMP slingshot.", type: "success" }
    ],
    stats: {
      stealth: 60,
      scrapPower: 92,
      shinySense: 55,
      glitchMastery: 68
    },
    inventory: ["EMP Slingshot", "Reinforced Manhole Shield", "Spiked Steel Boots"]
  },
  {
    id: "agent-7",
    name: "Fizzy-Crank",
    callsign: "SPARK-X",
    role: "gadgeteer",
    status: "SALVAGING",
    sectorId: "sec-lab",
    x: 35,
    y: 18,
    energy: 82,
    coins: 890,
    avatarEmoji: "💥",
    tagline: "Why use one capacitor when twenty chained together make that lovely purple hum?",
    currentTask: "Calibrating scrap drone flight stabilization propellers",
    taskProgress: 52,
    logs: [
      { id: "l14", timestamp: "18:18", message: "Test fired micro-thruster. Ceiling is now moderately singed.", type: "warn" },
      { id: "l15", timestamp: "18:32", message: "Drone telemetry linked to central map HUD.", type: "success" }
    ],
    stats: {
      stealth: 50,
      scrapPower: 94,
      shinySense: 78,
      glitchMastery: 91
    },
    inventory: ["Pulse Solder Pen", "Miniature Wind Tunnel", "Assorted 9V Batteries"]
  }
];
