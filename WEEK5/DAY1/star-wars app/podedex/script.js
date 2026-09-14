(function () {
const API_BASE =  be200c94b9eea33ced2c0229
  const MAX_POKE_ID = 1025; // highest numbered species PokeAPI currently supports

  const typeColors = {
    normal: "#A8A77A", fire: "#EE8130", water: "#6390F0", electric: "#F7D02C",
    grass: "#7AC74C", ice: "#96D9D6", fighting: "#C22E28", poison: "#A33EA1",
    ground: "#E2BF65", flying: "#A98FF3", psychic: "#F95587", bug: "#A6B91A",
    rock: "#B6A136", ghost: "#735797", dragon: "#6F35FC", dark: "#705746",
    steel: "#B7B7CE", fairy: "#D685AD"
  };

  const sprite = document.getElementById("pokeSprite");
  const nameEl = document.getElementById("pokeName");
  const idLabel = document.getElementById("pokeIdLabel");
  const idReadout = document.getElementById("idReadout");
  const typeRow = document.getElementById("typeRow");
  const heightEl = document.getElementById("statHeight");
  const weightEl = document.getElementById("statWeight");
  const statusMsg = document.getElementById("statusMsg");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const randomBtn = document.getElementById("randomBtn");

  // Global variable tracking the currently displayed Pokémon's id,
  // used by the prev/next handlers to know what to fetch next.
  let currentId = null;
  let isLoading = false;

  function showLoading() {
    sprite.style.display = "none";
    statusMsg.textContent = "Searching…";
    statusMsg.classList.remove("hidden");
    setNavDisabled(true);
  }

  function showError() {
    sprite.style.display = "none";
    statusMsg.textContent = "Oh no! That Pokémon isn't available…";
    statusMsg.classList.remove("hidden");
    setNavDisabled(false);
  }

  function hideStatus() {
    statusMsg.classList.add("hidden");
  }

  function setNavDisabled(disabled) {
    prevBtn.disabled = disabled || currentId === null || currentId <= 1;
    nextBtn.disabled = disabled || currentId === null || currentId >= MAX_POKE_ID;
    randomBtn.disabled = disabled;
  }

  function formatId(id) {
    return "#" + String(id).padStart(3, "0");
  }

  function renderPokemon(data) {
    currentId = data.id;

    sprite.src =
      data.sprites.front_default ||
      data.sprites.other?.["official-artwork"]?.front_default ||
      "";
    sprite.alt = data.name;
    sprite.style.display = "block";

    nameEl.textContent = data.name;
    idLabel.textContent = formatId(data.id);
    idReadout.textContent = formatId(data.id);

    typeRow.innerHTML = "";
    data.types.forEach(function (t) {
      const badge = document.createElement("span");
      badge.className = "type-badge";
      badge.textContent = t.type.name;
      badge.style.background = typeColors[t.type.name] || "#888";
      typeRow.appendChild(badge);
    });

    heightEl.textContent = (data.height / 10).toFixed(1) + " m";
    weightEl.textContent = (data.weight / 10).toFixed(1) + " kg";

    hideStatus();
    setNavDisabled(false);
  }

  // Core async/await fetch used by all three buttons.
  async function fetchPokemon(idOrName) {
    if (isLoading) return;
    isLoading = true;
    showLoading();
    try {
      const response = await fetch(API_BASE + idOrName);
      if (!response.ok) {
        throw new Error("Pokémon not found");
      }
      const data = await response.json();
      renderPokemon(data);
    } catch (err) {
      console.error(err);
      showError();
    } finally {
      isLoading = false;
    }
  }

  async function fetchRandomPokemon() {
    const randomId = Math.floor(Math.random() * MAX_POKE_ID) + 1;
    await fetchPokemon(randomId);
  }

  async function fetchPreviousPokemon() {
    if (currentId === null || currentId <= 1) return;
    await fetchPokemon(currentId - 1);
  }

  async function fetchNextPokemon() {
    if (currentId === null || currentId >= MAX_POKE_ID) return;
    await fetchPokemon(currentId + 1);
  }

  randomBtn.addEventListener("click", fetchRandomPokemon);
  prevBtn.addEventListener("click", fetchPreviousPokemon);
  nextBtn.addEventListener("click", fetchNextPokemon);

  // Start on a friendly, deterministic first Pokémon instead of blank state.
  setNavDisabled(true);
  fetchPokemon(1);
})();
