// ===== 1. CREATE THE GRID (Milestone 1) =====

const grid = document.getElementById("grid");

for (let i = 0; i < 400; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    grid.appendChild(square);
}

// ===== 2. TRACK STATE (Milestone 2) =====

let selectedColor = "black";
let isDrawing = false;

// ===== 3. COLOR SELECTION (Milestone 2) =====

const colors = document.querySelectorAll(".color");

colors.forEach(function (color) {
    color.addEventListener("click", function () {
        selectedColor = color.classList[1];

    // visual feedback: show which color is active
    colors.forEach(function (c) {
        c.classList.remove("selected");
    });
    color.classList.add("selected");

    console.log("Selected color:", selectedColor);
});
});

// ===== 4. CLICK + DRAG TO DRAW (Milestones 3 & 4) =====

const squares = document.querySelectorAll(".square");

squares.forEach(function (square) {
    // user presses the mouse button down on a square: start drawing
    square.addEventListener("mousedown", function () {
        isDrawing = true;
        square.style.backgroundColor = selectedColor;
    });

// user drags over a square while the button is held: keep drawing
square.addEventListener("mouseover", function () {
    if (isDrawing) {
        square.style.backgroundColor = selectedColor;
    }
});
});

// user releases the mouse button anywhere on the page: stop drawing
document.addEventListener("mouseup", function () {
    isDrawing = false;
});

// prevent the browser's native "drag an image/element" behavior,
// which can interrupt mouseover events while dragging fast
grid.addEventListener("dragstart", function (e) {
    e.preventDefault();
});

