// HTML Context: <input type="text" id="username" />

// 1. Get the element from the DOM and apply Type Assertion
const inputElement = typeof document !== "undefined"
    ? document.getElementById("username") as HTMLInputElement | null
    : null;

// 2. Safely access and manipulate element-specific properties
if (inputElement) {
    inputElement.value = "JohnDoe";
    inputElement.placeholder = "Enter your username";
    console.log("Updated input value:", inputElement.value);
} else {
    console.log("No DOM input element found; running in a non-browser environment.");
}