const names = ["Jack", "Philip", "Sarah", "Amanda", "Bernard", "Kyle"];

// 1. Extract the first letter of each name, push to an array, sort it, and join into a string
const secretName = names
    .map(name => name[0])
    .sort()
    .join("");

// 2. Console.log the name of their secret society
console.log(secretName); // Output: "ABJKPS"