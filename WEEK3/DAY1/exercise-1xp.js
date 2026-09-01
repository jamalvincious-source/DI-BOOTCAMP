const people = ["Greg", "Mary", "Devon", "James"];

// Part I - Review about arrays

// 1. Remove "Greg" from the people array
people.shift();

console.log(people);


// 2. Replace "James" with "Jason"
people[people.indexOf("James")] = "Jason";

console.log(people);


// 3. Add your name to the end of the people array
people.push("Alex"); // Change Alex to your name

console.log(people);


// 4. Console.log Mary's index
console.log(people.indexOf("Mary"));


// 5. Make a copy excluding "Mary" and your name
const copy = people.slice(1, people.length - 1);

console.log(copy);


// 6. Give the index of "Foo"
console.log(people.indexOf("Foo"));

// It returns -1 because "Foo" is not in the array.


// 7. Create a variable called last
const last = people[people.length - 1];

console.log(last);


// Part II - Loops

// 1. Iterate through the people array
for (let i = 0; i < people.length; i++) {
    console.log(people[i]);
}


// 2. Stop the loop after console.log "Devon"
for (let i = 0; i < people.length; i++) {
    console.log(people[i]);

    if (people[i] === "Devon") {
        break;
    }
}