// Original JavaScript object
const marioGame = {
    detail: "An amazing game!",
    characters: {
        mario: {
            description: "Small and jumpy. Likes princesses.",
            height: 10,
            weight: 3,
            speed: 12
        },
        bowser: {
            description: "Big and green, Hates princesses.",
            height: 16,
            weight: 6,
            speed: 4
        },
        princessPeach: {
            description: "Beautiful princess.",
            height: 12,
            weight: 2,
            speed: 2
        }
    }
};


// 1. Convert the JavaScript object into JSON
const jsonMarioGame = JSON.stringify(marioGame);

console.log(jsonMarioGame);


// 2. Convert and pretty print the JSON
const prettyJSON = JSON.stringify(marioGame, null, 2);

console.log(prettyJSON);


// 3. Add a breakpoint
debugger;

// Check the values in the debugger
console.log(marioGame);
console.log(jsonMarioGame);
console.log(prettyJSON);


// Check individual characters
console.log(marioGame.characters.mario);
console.log(marioGame.characters.bowser);
console.log(marioGame.characters.princessPeach);