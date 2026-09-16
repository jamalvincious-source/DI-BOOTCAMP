// Define the Person object type structure
type Person = {
    name: string;
    age: number;
};

// Create the function returning a Person object
function createPerson(name: string, age: number): Person {
    return {
        name,
        age
    };
}

// Test the function
const person = createPerson("Alice", 28);
console.log(person); // Output: { name: 'Alice', age: 28 }