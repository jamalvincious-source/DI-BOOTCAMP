const findButton = document.getElementById("find-button");

const loading = document.getElementById("loading");

const errorMessage = document.getElementById("error");

const characterInfo = document.getElementById("character-info");

const nameElement = document.getElementById("name");

const heightElement = document.getElementById("height");

const genderElement = document.getElementById("gender");

const birthYearElement = document.getElementById("birth-year");

const homeWorldElement = document.getElementById("home-world");


function showLoading() {

    loading.classList.remove("hidden");

    errorMessage.classList.add("hidden");

    characterInfo.classList.add("hidden");
}


function hideLoading() {

    loading.classList.add("hidden");
}


function showError() {

    loading.classList.add("hidden");

    characterInfo.classList.add("hidden");

    errorMessage.classList.remove("hidden");
}


function displayCharacter(character) {

    nameElement.textContent = character.name;

    heightElement.textContent = character.height;

    genderElement.textContent = character.gender;

    birthYearElement.textContent = character.birth_year;

    homeWorldElement.textContent = character.homeworld;

    characterInfo.classList.remove("hidden");
}


async function getCharacter() {

    const randomNumber = Math.floor(Math.random() * 83) + 1;

    const url = `https://www.swapi.tech/api/people/${randomNumber}`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to retrieve character");
    }

    const data = await response.json();

    return data.result.properties;
}


async function getHomeWorld(homeWorldUrl) {

    const response = await fetch(homeWorldUrl);

    if (!response.ok) {
        throw new Error("Failed to retrieve home world");
    }

    const data = await response.json();

    return data.result.properties.name;
}


async function findCharacter() {

    showLoading();

    try {

        const character = await getCharacter();

        const homeWorld = await getHomeWorld(character.homeworld);

        character.homeworld = homeWorld;

        hideLoading();

        displayCharacter(character);

    } catch (error) {

        showError();

        console.error(error);
    }
}


findButton.addEventListener("click", findCharacter);