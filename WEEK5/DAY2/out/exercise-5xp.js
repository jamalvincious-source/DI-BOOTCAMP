"use strict";
function getDetails(name, age) {
    const greeting = `Hello, ${name}! You are ${age} years old.`;
    return [name, age, greeting];
}
// Call the function and log the tuple
const details = getDetails("Alice", 25);
console.log(details);
// Output: ['Alice', 25, 'Hello, Alice! You are 25 years old.']
