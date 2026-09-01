// Array of five favorite colors
const colors = ["blue", "red", "green", "purple", "orange"];

// Array of suffixes
const suffixes = ["st", "nd", "rd", "th", "th"];

// Loop through the colors
for (let i = 0; i < colors.length; i++) {
    console.log(`My ${i + 1}${suffixes[i]} choice is ${colors[i]}`);
}