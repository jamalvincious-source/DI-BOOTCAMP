const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th", "st", "nd", "rd"];

colors.forEach((color, index) => {
    let num = index + 1;
    // Use ternary operator to pick the correct suffix from the ordinal array
    let suffix = (num === 1) ? ordinal[1] : 
                 (num === 2) ? ordinal[2] : 
                 (num === 3) ? ordinal[3] : ordinal[0];
                 
    console.log(`${num}${suffix} choice is ${color}.`);
});