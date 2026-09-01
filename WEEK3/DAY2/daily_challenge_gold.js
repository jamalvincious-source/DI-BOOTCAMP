const planets = [
  { name: "Mercury", color: "#b8b8b8", moons: 0 },
  { name: "Venus", color: "#d9b77a", moons: 0 },
  { name: "Earth", color: "#3d82f7", moons: 1 },
  { name: "Mars", color: "#d2691e", moons: 2 },
  { name: "Jupiter", color: "#d8a25d", moons: 4 },
  { name: "Saturn", color: "#f0d38c", moons: 3 },
  { name: "Uranus", color: "#82d5d7", moons: 2 },
  { name: "Neptune", color: "#3c5eff", moons: 1 }
];

const solarSystem = document.querySelector(".listPlanets");

if (solarSystem) {
  planets.forEach((planetInfo) => {
    const planet = document.createElement("div");
    planet.classList.add("planet");
    planet.style.backgroundColor = planetInfo.color;
    planet.textContent = planetInfo.name;

    for (let i = 0; i < planetInfo.moons; i++) {
      const moon = document.createElement("div");
      moon.classList.add("moon");

      const angle = (Math.PI * 2 * i) / Math.max(planetInfo.moons, 1);
      const radius = 28 + i * 18;
      const x = 50 + Math.cos(angle) * radius;
      const y = 50 + Math.sin(angle) * radius;

      moon.style.left = `${x}px`;
      moon.style.top = `${y}px`;
      moon.style.transform = "translate(-50%, -50%)";

      planet.appendChild(moon);
    }

    solarSystem.appendChild(planet);
  });
} else {
  console.error("The .listPlanets section was not found in the HTML.");
}
