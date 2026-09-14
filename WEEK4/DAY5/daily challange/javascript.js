const form = document.getElementById("gifForm");
const searchInput = document.getElementById("searchInput");
const gifsContainer = document.getElementById("gifsContainer");
const deleteAllButton = document.getElementById("deleteAll");

const apiKey = "hpvZycW22qCjn5cRM1xtWB8NKq4dQ2My";

// Listen for form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();
    const category = searchInput.value.trim();

    if (category !== "") {
        getGif(category);
    }
});

// Async function using Try/Catch and Fetch API
async function getGif(category) {
    const url = `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=${encodeURIComponent(category)}&rating=g`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const gifUrl = data.data.images.original.url;

        // Create elements for DOM manipulation
        const gifWrapper = document.createElement("div");
        
        const img = document.createElement("img");
        img.src = gifUrl;
        img.alt = category;
        img.width = 300;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "DELETE";

        // Delete specific GIF functionality
        deleteButton.addEventListener("click", function() {
            gifWrapper.remove();
        });

        // Append image and delete button to wrapper, then to container
        gifWrapper.appendChild(img);
        gifWrapper.appendChild(deleteButton);
        gifsContainer.appendChild(gifWrapper);

        // Clear input field
        searchInput.value = "";

    } catch (error) {
        console.error("Failed to fetch GIF:", error);
    }
}

// Delete all GIFs functionality
deleteAllButton.addEventListener("click", function() {
    gifsContainer.innerHTML = "";
});