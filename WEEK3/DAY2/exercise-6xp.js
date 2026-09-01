// Change the value of the id attribute from navBar to socialNetworkNavigation
let navBarDiv = document.getElementById("navBar");
navBarDiv.setAttribute("id", "socialNetworkNavigation");

// Add a new <li> with text "Logout" to the <ul>
let ulElement = document.querySelector("#socialNetworkNavigation ul");
let newLi = document.createElement("li");
let textNode = document.createTextNode("Logout");
newLi.appendChild(textNode);
ulElement.appendChild(newLi);

// Retrieve and display the text of the first and last <li> elements
let firstLi = ulElement.firstElementChild;
let lastLi = ulElement.lastElementChild;

console.log(firstLi.textContent);
console.log(lastLi.textContent);