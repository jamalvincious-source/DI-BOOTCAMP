const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const query = "sun";
const limit = 10;
const offset = 2;

const url = `https://api.giphy.com/v1/gifs/search?q=${query}&rating=g&api_key=${apiKey}&limit=${limit}&offset=${offset}`;

async function fetchGifs() {
  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("An error occurred while fetching the gifs:", error);
  }
}

fetchGifs();