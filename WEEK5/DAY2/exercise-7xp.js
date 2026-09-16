"use strict";
// HTML Context: <input type="text" id="username" />
Object.defineProperty(exports, "__esModule", { value: true });
// 1. Get the element from the DOM and apply Type Assertion
const inputElement = document.getElementById("username");
// 2. Safely access and manipulate element-specific properties
if (inputElement) {
    inputElement.value = "JohnDoe";
    inputElement.placeholder = "Enter your username";
    console.log("Updated input value:", inputElement.value);
}
//# sourceMappingURL=exercise-7xp.js.map