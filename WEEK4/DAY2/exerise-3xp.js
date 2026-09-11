const users = { user1: 18273, user2: 92833, user3: 90315 };

// 1. Turn the users object into an array of key-value pairs
const usersArray = Object.entries(users);
console.log(usersArray); 
// Output: [ [ 'user1', 18273 ], [ 'user2', 92833 ], [ 'user3', 90315 ] ]

// 2. Modify the outcome by multiplying each user's ID by 2 using map()
const modifiedUsersArray = Object.entries(users).map(([key, value]) => [key, value * 2]);
console.log(modifiedUsersArray); 
// Output: [ [ 'user1', 36546 ], [ 'user2', 185666 ], [ 'user3', 180630 ] ]