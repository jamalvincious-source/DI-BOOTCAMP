// 1. Create an object called family with a few key value pairs
const family = {
    father: "John",
    mother: "Jane",
    daughter: "Lily",
    son: "Leo"
};

// 2. Using a for in loop, console.log the keys of the object
console.log("Keys:");
for (let key in family) {
    console.log(key);
}

// 3. Using a for in loop, console.log the values of the object
console.log("Values:");
for (let key in family) {
    console.log(family[key]);
}