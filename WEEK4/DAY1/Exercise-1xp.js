const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

// 1. Display the choices using a loop or array method
colors.forEach((color, index) => {
    console.log(`${index + 1}# choice is ${color}.`);
});

// 2. Check if at least one element is equal to "Violet" using .some()
if (colors.some(color => color === "Violet")) {
    console.log("Yeah");
} else {
    console.log("No...");
}