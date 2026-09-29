```javascript
// data.js

const people = [
    {
        name: "John",
        age: 25,
        location: "Nairobi"
    },
    {
        name: "Mary",
        age: 30,
        location: "Mombasa"
    },
    {
        name: "David",
        age: 20,
        location: "Kisumu"
    },
    {
        name: "Sarah",
        age: 35,
        location: "Nakuru"
    }
];

// Export the array
export default people;
```
```javascript
// app.js

// Import the people array
import people from "./data.js";

// Function to calculate average age
function calculateAverageAge(persons) {
    const totalAge = persons.reduce(
        (total, person) => total + person.age,
        0
    );

    const averageAge = totalAge / persons.length;

    console.log("Average age:", averageAge);
}

// Call the function
calculateAverageAge(people);module-exercise/
│
├── data.js
├── app.js
└── package.json