"use strict";
// Base class
class Animal {
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        return "Some animal sound";
    }
}
// Subclass
class Dog extends Animal {
    // Override the makeSound method
    makeSound() {
        return "bark";
    }
}
// Create a Dog object
const dog = new Dog("Buddy");
// Display the dog's name
console.log("Name:", dog.name);
// Call the makeSound method
console.log("Sound:", dog.makeSound());
