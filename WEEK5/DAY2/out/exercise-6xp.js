"use strict";
// Create the function returning a Person object
function createPerson(name, age) {
    return {
        name,
        age
    };
}
// Test the function
const person = createPerson("Alice", 28);
console.log(person); // Output: { name: 'Alice', age: 28 }
