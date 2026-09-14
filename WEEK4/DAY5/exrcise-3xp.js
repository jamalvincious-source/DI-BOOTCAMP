async function getStarship() {
  try {
    const response = await fetch("https://www.swapi.tech/api/starships/9/");
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const objectStarWars = await response.json();
    console.log(objectStarWars.result);
  } catch (error) {
    console.error("An error occurred while fetching the starship data:", error);
  }
}

getStarship();