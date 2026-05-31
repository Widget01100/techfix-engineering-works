const servicesData = [
  {
    category: "lathe",
    icon: "fa-cog",
    title: "Lathe Works",
    desc: "Turning, boring, threading, taper turning, knurling, grooving, drilling on lathe, reaming, countersinking, facing, eccentric turning, polygon turning, multi-start threading",
    tags: ["Precision", "All Materials"],
  },
  {
    category: "lathe",
    icon: "fa-microchip",
    title: "CNC Services",
    desc: "CNC turning, CNC milling, 3-axis & 4-axis machining, precision batch production, CAD/CAM integration, complex geometry machining",
    tags: ["High Accuracy", "Repeatability"],
  },
  {
    category: "weld",
    icon: "fa-fire",
    title: "All Welding Types",
    desc: "MIG, TIG, SMAW (arc) welding — aluminum, stainless steel, mild steel, cast iron, bronze, brass. Structural fabrication, custom metalwork, repairs",
    tags: ["MIG/TIG/Arc", "All Metals"],
  },
  {
    category: "weld",
    icon: "fa-car",
    title: "Vehicle & Motorcycle Rim Welding",
    desc: "Cracked alloy/steel wheel repair, straightening, crack welding for cars and motorcycles",
    tags: ["Rims", "Alloy/Steel"],
  },
  {
    category: "precision",
    icon: "fa-brakes",
    title: "Skimming Services",
    desc: "Brake discs (rotors), brake drums, flywheels, clutch pressure plates, cylinder heads, industrial flywheels",
    tags: ["Discs", "Drums", "Flywheels"],
  },
  {
    category: "precision",
    icon: "fa-thread",
    title: "Sleeving & Rethreading",
    desc: "Engine block sleeving, cylinder sleeving, bearing housing repair, thread restoration, Helicoil installation — vehicle engines, motorcycle engines, industrial machinery",
    tags: ["Engines", "Anywhere"],
  },
  {
    category: "precision",
    icon: "fa-press",
    title: "Press Works",
    desc: "Bush pressing, bearing pressing, gear pressing, shaft pressing, axle pressing — hydraulic press up to 100 tons",
    tags: ["Bushes", "Bearings"],
  },
  {
    category: "precision",
    icon: "fa-coil",
    title: "Coil Rewinding",
    desc: "Pump motors, industrial motors, alternators, starters, fan motors — copper winding, insulation, varnishing",
    tags: ["Motors", "Pumps"],
  },
  {
    category: "precision",
    icon: "fa-spring",
    title: "Spring Leaf Tensioning",
    desc: "Leaf spring re-tensioning, re-arching, crack repair, bushing replacement for vehicles",
    tags: ["Re-tensioning"],
  },
  {
    category: "precision",
    icon: "fa-pulley",
    title: "Pulley Making",
    desc: "Custom pulleys (V-belt, timing, flat belt), grooving, balancing, keyway cutting",
    tags: ["Custom"],
  },
  {
    category: "industrial",
    icon: "fa-crane",
    title: "Crane Repair & Modifications",
    desc: "Hydraulic cranes, overhead cranes, jib cranes — structural repair, hydraulic overhaul, modifications, safety inspections",
    tags: ["Repair", "Modification"],
  },
  {
    category: "industrial",
    icon: "fa-dumbbell",
    title: "Gym Equipment Fabrication",
    desc: "Weight plates (jua kali type), leg press machines, squat racks, bench presses, dumbbells, barbells 4ft-7ft, weight racks, cable machines",
    tags: ["Custom", "Heavy Duty"],
  },
];

function renderServices(filter = "all") {
  const grid = document.getElementById("services-grid");
  if (!grid) return;
  const filtered =
    filter === "all"
      ? servicesData
      : servicesData.filter((s) => s.category === filter);
  grid.innerHTML = filtered
    .map(
      (s) => `
    <div class="service-card magnetic">
      <div class="service-icon"><i class="fas ${s.icon}"></i></div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <div class="service-tags">${s.tags.map((t) => `<span>${t}</span>`).join("")}</div>
    </div>
  `,
    )
    .join("");
}
