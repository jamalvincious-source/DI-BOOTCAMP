"use strict";
// Function implementation with a default parameter
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}
// Testing the function
console.log(greet("Alice")); // Output: Hello, Alice!
