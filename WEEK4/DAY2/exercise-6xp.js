// 1. Compare arrays and objects

const array1 = [2];
const array2 = [2];
console.log(array1 === array2); // false: these are different array objects
console.log(JSON.stringify({}) === JSON.stringify({})); // true


// 2. Object references

const object1 = { number: 5 };
const object2 = object1;
const object3 = object2;
const object4 = { number: 5 };

object1.number = 4;

console.log(object2.number); // 4
console.log(object3.number); // 4
console.log(object4.number); // 5


// 3. Animal class

class Animal {
    constructor(name, type, color) {
        this.name = name;
        this.type = type;
        this.color = color;
    }
}


// 4. Mammal class extends Animal

class Mammal extends Animal {
    sound(animalSound) {
        return `${animalSound} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
    }
}


// 5. Create the cow

const farmerCow = new Mammal("Lily", "cow", "brown and white");


// 6. Display the cow's information

console.log(farmerCow.sound("Moooo"));