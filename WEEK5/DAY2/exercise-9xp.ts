// Overload signatures
function greet(): string;
function greet(name: string): string;

// Function implementation with a default parameter
function greet(name: string = "Guest"): string {
    return `Hello, ${name}!`;
}

// Testing the function
console.log(greet("Alice")); // Output: Hello, Alice!