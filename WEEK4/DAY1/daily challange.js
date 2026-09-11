const gameInfo = [
 {
   username: "john",
   team: "red",
   score: 5,
   items: ["ball", "book", "pen"]
 },
 {
   username: "becky",
   team: "blue",
   score: 10,
   items: ["tape", "backpack", "pen"]
 },
 {
   username: "susy",
   team: "red",
   score: 55,
   items: ["ball", "eraser", "pen"]
 },
 {
   username: "tyson",
   team: "green",
   score: 1,
   items: ["book", "pen"]
 },
];

// 1. Array with forEach adding an exclamation point to every username
const usernames = [];
gameInfo.forEach(user => {
  usernames.push(user.username + "!");
});

// 2. Array with forEach containing usernames of players with a score bigger than 5
const winners = [];
gameInfo.forEach(user => {
  if (user.score > 5) {
    winners.push(user.username);
  }
});

// 3. Find and display the total score of the users using reduce
const totalScore = gameInfo.reduce((accumulator, user) => accumulator + user.score, 0);

console.log(usernames); // ["john!", "becky!", "susy!", "tyson!"]
console.log(winners);   // ["becky", "susy"]
console.log(totalScore); // 71