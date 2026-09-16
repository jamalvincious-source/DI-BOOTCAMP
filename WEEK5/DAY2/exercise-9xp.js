"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Function implementation with a default parameter
function greet(name = "Guest") {
    return `Hello, ${name}!`;
}
// Testing the function
console.log(greet("Alice")); // Output: Hello, Alice!
console.log(greet()); // Output: Hello, Guest!
//# sourceMappingURL=exercise-9xp.js.map