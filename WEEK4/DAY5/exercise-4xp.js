const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";
const query = "hilarious";
const rating = "g";

const url = `https://api.giphy.com/v1/gifs/search?q=${query}&rating=${rating}&api_key=${apiKey}`;

async function getHilariousGifs() {
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

getHilariousGifs();