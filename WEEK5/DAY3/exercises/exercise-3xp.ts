// Base class
class Animal {
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    makeSound(): string {
        return "Some animal sound";
    }
}

// Subclass
class Dog extends Animal {

    // Override the makeSound method
    makeSound(): string {
        return "bark";
    }
}

// Create a Dog object
const dog = new Dog("Buddy");

// Display the dog's name
console.log("Name:", dog.name);

// Call the makeSound method
console.log("Sound:", dog.makeSound());
